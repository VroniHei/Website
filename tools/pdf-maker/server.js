'use strict';

require('dotenv').config({ path: './config/.env.local' });

const express   = require('express');
const session   = require('express-session');
const bcrypt    = require('bcryptjs');
const multer    = require('multer');
const { v4: uuidv4 } = require('uuid');
const path      = require('path');
const fs        = require('fs');
const os        = require('os');

const { convertToPDF, findBin, GS_PATHS, QPDF_PATHS } = require('./pipeline/index.js');
const { buildEditorialHtml } = require('./pipeline/markdown.js');

const app  = express();
const PORT = 3847;

// ── Session ──────────────────────────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET || 'il-pdf-maker-secret-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 Tage
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Auth-Middleware ───────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  if (req.session?.authenticated) return next();
  if (req.headers.accept?.includes('text/event-stream') ||
      req.path.startsWith('/api/download')) {
    return res.status(401).json({ error: 'Nicht eingeloggt.' });
  }
  res.redirect('/login');
}

function requireSetup(req, res, next) {
  // Wenn noch kein Passwort gesetzt → Setup erzwingen (außer auf /setup selbst)
  if (!process.env.PASSWORD_HASH && !req.path.startsWith('/setup')) {
    return res.redirect('/setup');
  }
  next();
}

// ── Static Frontend (login + setup public, rest geschützt) ───────────────────
// Reihenfolge wichtig: erst Login/Setup freigeben, dann Auth prüfen
app.get('/login',  (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/setup',  (req, res) => res.sendFile(path.join(__dirname, 'public', 'setup.html')));

// Login-Assets öffentlich (Bild + Schriften für die Login-Seite selbst)
const LOGIN_ASSETS = ['login-bg.webp', 'figtree.woff2', 'newsreader-italic.woff2'];
LOGIN_ASSETS.forEach(file => {
  app.get('/' + file, (req, res) => res.sendFile(path.join(__dirname, 'public', file)));
});

// Login POST
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!process.env.PASSWORD_HASH) return res.redirect('/setup');
  const adminEmail = process.env.ADMIN_EMAIL || '';
  const emailOk = !adminEmail || (email || '').toLowerCase().trim() === adminEmail.toLowerCase();
  const pwOk = await bcrypt.compare(password || '', process.env.PASSWORD_HASH);
  if (emailOk && pwOk) {
    req.session.authenticated = true;
    res.redirect('/');
  } else {
    res.redirect('/login?error=1');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Setup POST (Passwort setzen)
app.post('/setup', async (req, res) => {
  if (process.env.PASSWORD_HASH) return res.redirect('/'); // bereits gesetzt
  const { password, confirm } = req.body;
  if (!password || password.length < 6) return res.redirect('/setup?error=short');
  if (password !== confirm) return res.redirect('/setup?error=mismatch');

  const hash = await bcrypt.hash(password, 10);
  const cfgDir = path.join(__dirname, 'config');
  if (!fs.existsSync(cfgDir)) fs.mkdirSync(cfgDir);
  const envPath = path.join(cfgDir, '.env.local');
  const existing = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  const withoutOld = existing.split('\n').filter(l => !l.startsWith('PASSWORD_HASH=')).join('\n');
  fs.writeFileSync(envPath, withoutOld.trim() + `\nPASSWORD_HASH=${hash}\n`);
  process.env.PASSWORD_HASH = hash;

  req.session.authenticated = true;
  res.redirect('/');
});

// ── Geschützte statische Dateien ─────────────────────────────────────────────
app.use(requireSetup, requireAuth, express.static(path.join(__dirname, 'public')));

// ── PDF-Maker-Route (HTML-Datei) ─────────────────────────────────────────────
app.get('/pdf-maker', requireSetup, requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pdf-maker.html'));
});

// ── Health-Check (öffentlich, für Website-Statusanzeige) ─────────────────────
app.get('/health', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // erlaubt Cross-Origin-Check von Website
  const gs       = !!findBin(GS_PATHS);
  const qpdf     = !!findBin(QPDF_PATHS);
  let playwright = false;
  try { require('playwright'); playwright = true; } catch {}
  res.json({ ok: gs && playwright, gs, qpdf, playwright });
});

// ── Temp-Storage für fertige PDFs (1h TTL) ───────────────────────────────────
const jobs = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [id, job] of jobs.entries()) {
    if (job.expires < now) {
      try { fs.unlinkSync(job.pdfPath); } catch {}
      jobs.delete(id);
    }
  }
}, 5 * 60 * 1000);

// ── Multer ───────────────────────────────────────────────────────────────────
const upload = multer({
  dest: os.tmpdir(),
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = file.mimetype === 'text/html'
      || /\.(html|md|markdown)$/i.test(file.originalname)
      || file.mimetype === 'text/markdown';
    if (ok) cb(null, true);
    else cb(new Error('Nur HTML- oder Markdown-Dateien erlaubt'));
  },
});

// ── Konvertierung: POST /api/convert ─────────────────────────────────────────
app.post('/api/convert', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  const handleError = (msg, err) => {
    console.error(msg, err);
    send('error', { message: msg + (err ? ': ' + err.message : '') });
    res.end();
  };

  upload.single('file')(req, res, async (uploadErr) => {
    if (uploadErr) return handleError(uploadErr.message);

    let inputPath = null;
    let tempInput = false;
    let outputFilename = 'dokument-interaktiv.pdf';
    let isMarkdown = false;

    try {
      if (req.file && /\.(md|markdown)$/i.test(req.file.originalname)) {
        // Markdown → Editorial-Lese-PDF im Innerline-Designsystem.
        isMarkdown = true;
        const mdText = fs.readFileSync(req.file.path, 'utf8');
        try { fs.unlinkSync(req.file.path); } catch {}
        const base = path.basename(req.file.originalname).replace(/\.(md|markdown)$/i, '');
        const html = buildEditorialHtml(mdText, {
          fontsDir: path.join(__dirname, 'public'),
          title: base,
        });
        const htmlPath = path.join(os.tmpdir(), `md-${uuidv4()}.html`);
        fs.writeFileSync(htmlPath, html, 'utf8');
        inputPath = htmlPath;
        tempInput = true;
        outputFilename = base + '.pdf';
      } else if (req.file) {
        // Multer speichert ohne Endung. Chromium führt den Bundler-JS einer
        // "Bundled Page" aber nur aus, wenn die Datei als text/html erkannt wird
        // (hängt an der .html-Endung). Ohne sie bleibt der rohe Inhalt im DOM
        // → 0 section.page, hunderte Müll-Seiten. Darum mit .html umbenennen.
        const htmlPath = req.file.path + '.html';
        fs.renameSync(req.file.path, htmlPath);
        inputPath = htmlPath;
        tempInput = true;
        outputFilename = path.basename(req.file.originalname, '.html') + '-interaktiv.pdf';
      } else if (req.body?.handoffUrl) {
        const apiKey = req.body.apiKey || process.env.CLAUDE_API_KEY;
        if (!apiKey) return handleError('Kein Claude API-Key. Bitte in den Einstellungen hinterlegen.');

        // URL aus eingefügtem Text extrahieren (z.B. wenn Claude-Instruktion mit URL eingefügt wird)
        const rawInput = req.body.handoffUrl;
        const urlMatch = rawInput.match(/https?:\/\/[^\s]+/);
        const handoffUrl = urlMatch ? urlMatch[0] : rawInput;

        send('progress', { step: 'fetch', msg: 'Handoff wird abgerufen…' });
        try {
          const fetchResp = await fetch(handoffUrl, {
            headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
          });
          if (!fetchResp.ok) throw new Error(`HTTP ${fetchResp.status}`);
          const html = await fetchResp.text();
          if (!html.includes('<html') && !html.includes('<!DOCTYPE')) throw new Error('Kein gültiges HTML');
          const tmpFile = path.join(os.tmpdir(), `handoff-${uuidv4()}.html`);
          fs.writeFileSync(tmpFile, html, 'utf8');
          inputPath = tmpFile;
          tempInput = true;
          outputFilename = 'handoff-interaktiv.pdf';
        } catch (e) {
          return handleError('Handoff konnte nicht abgerufen werden', e);
        }
      } else {
        return handleError('Keine Datei oder Handoff-URL übergeben.');
      }

      let settings = {};
      try { settings = typeof req.body?.settings === 'string' ? JSON.parse(req.body.settings) : (req.body?.settings || {}); } catch {}

      // Markdown-Lese-PDF: keine Formularfelder/Copy-Buttons, dafür Seitenränder
      // und kein Warten auf section.page (das es hier nicht gibt).
      if (isMarkdown) {
        settings = {
          ...settings,
          formFields: false, highlightFields: false, copyButtons: false, links: false,
          skipPageWait: true,
          pageMargin: { top: '20mm', bottom: '20mm', left: '22mm', right: '22mm' },
        };
      }

      const jobId      = uuidv4();
      const outputPath = path.join(os.tmpdir(), `pdf-maker-out-${jobId}.pdf`);
      const onProgress = ({ step, msg, elapsed, ...rest }) => send('progress', { step, msg, elapsed, ...rest });
      const result     = await convertToPDF(inputPath, outputPath, settings, onProgress);

      jobs.set(jobId, { pdfPath: outputPath, filename: outputFilename, expires: Date.now() + 60 * 60 * 1000 });
      send('done', { jobId, filename: outputFilename, ...result });

    } catch (err) {
      handleError('Pipeline-Fehler', err);
    } finally {
      if (tempInput && inputPath) try { fs.unlinkSync(inputPath); } catch {}
      res.end();
    }
  });
});

// ── Download ─────────────────────────────────────────────────────────────────
app.get('/api/download/:jobId', requireAuth, (req, res) => {
  const job = jobs.get(req.params.jobId);
  if (!job || !fs.existsSync(job.pdfPath)) return res.status(404).json({ error: 'PDF nicht mehr verfügbar.' });
  res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(job.filename)}"`);
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(job.pdfPath);
});

// ── API-Key speichern ─────────────────────────────────────────────────────────
app.post('/api/save-key', requireAuth, (req, res) => {
  const key    = req.body?.key || '';
  const cfgDir = path.join(__dirname, 'config');
  if (!fs.existsSync(cfgDir)) fs.mkdirSync(cfgDir);
  const envPath  = path.join(cfgDir, '.env.local');
  const existing = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  const updated  = existing.split('\n').filter(l => !l.startsWith('CLAUDE_API_KEY=')).join('\n');
  fs.writeFileSync(envPath, updated.trim() + `\nCLAUDE_API_KEY=${key}\n`);
  process.env.CLAUDE_API_KEY = key;
  res.json({ ok: true });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  const setupNeeded = !process.env.PASSWORD_HASH;
  console.log(`\n🌿 Innerline PDF Maker läuft auf http://localhost:${PORT}`);
  if (setupNeeded) console.log(`   → Erster Start: Passwort einrichten auf http://localhost:${PORT}/setup\n`);
  else console.log(`   → Bereit. Login unter http://localhost:${PORT}/login\n`);
});
