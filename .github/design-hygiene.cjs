#!/usr/bin/env node
'use strict';
/*
 * design-hygiene.cjs — erzwingt DESIGN-HYGIENE.md (Single Source of Truth).
 * Keine Abhängigkeiten (Node >= 18). Bei Verstoß: Exit 1 mit Datei:Zeile.
 * Lokal:  node .github/design-hygiene.cjs
 * CI:     Job „design-guard" in .github/workflows/ci.yml
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['node_modules', '.git', 'fonts', 'images', 'export', 'scraps', 'uploads', 'tools']);
const errors = [];

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('_')) continue; // _handoff/, _drafts: Scratch, nicht Teil der Live-Seite
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), acc); }
    else acc.push(path.join(dir, e.name));
  }
  return acc;
}
const files = walk(ROOT, []);
const rel = (f) => path.relative(ROOT, f);
const read = (f) => fs.readFileSync(f, 'utf8');
const lines = (t) => t.split(/\r?\n/);
const html = files.filter((f) => f.endsWith('.html'));
const css = files.filter((f) => f.endsWith('.css'));

/* A) Externe Schrift-CDN ------------------------------------------------ */
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'use.typekit.net', 'p.typekit.net'];
for (const f of [...html, ...css]) {
  const txt = read(f);
  lines(txt).forEach((ln, i) => {
    for (const host of FONT_HOSTS) {
      if (ln.includes(host)) errors.push(`${rel(f)}:${i + 1} externe Font-CDN „${host}". Schriften IMMER lokal aus fonts/ (tokens.css).`);
    }
  });
  let m; const ffRe = /@font-face\s*{[^}]*}/gi;
  while ((m = ffRe.exec(txt))) {
    if (/url\(\s*['"]?(?:https?:)?\/\//i.test(m[0])) {
      const lineNo = txt.slice(0, m.index).split(/\r?\n/).length;
      errors.push(`${rel(f)}:${lineNo} @font-face lädt eine externe URL. Schrift nach fonts/ holen und lokal referenzieren.`);
    }
  }
  if (/cdn\.jsdelivr\.net\/[^"')\s]*font/i.test(txt) || /unpkg\.com\/[^"')\s]*font/i.test(txt) || /@fontsource/i.test(txt)) {
    errors.push(`${rel(f)} referenziert ein Font-CDN-Paket (jsdelivr/unpkg/fontsource). Schriften lokal hosten.`);
  }
}

/* B) Em-Dash (—) in *.html --------------------------------------------- */
for (const f of html) {
  lines(read(f)).forEach((ln, i) => {
    if (ln.includes('\u2014')) errors.push(`${rel(f)}:${i + 1} Em-Dash (—) gefunden. Brand Voice: natürlich ausformulieren (Punkt/Komma/Doppelpunkt).`);
  });
}

/* C) Token-DEFINITION außerhalb tokens.css ------------------------------ */
const DEF_RE = /(?:^|[^-\w])(--(?:fs|shadow|dur|ease|space|lh|ls)[\w-]*)\s*:/;
for (const f of [...css, ...html]) {
  if (path.basename(f) === 'tokens.css') continue;
  lines(read(f)).forEach((ln, i) => {
    const m = ln.match(DEF_RE);
    if (m) errors.push(`${rel(f)}:${i + 1} Token „${m[1]}" wird hier DEFINIERT. Skala-Tokens nur in tokens.css; sonst nur var(${m[1]}) nutzen.`);
  });
}

/* D) Designsystem.html bindet tokens.css ein ---------------------------- */
const ds = files.find((f) => path.basename(f) === 'Designsystem.html');
if (ds && !read(ds).includes('tokens.css')) errors.push('Designsystem.html bindet tokens.css nicht ein (Single Source of Truth).');

/* E) style.css importiert tokens.css ------------------------------------ */
const sc = files.find((f) => path.basename(f) === 'style.css');
if (sc && !/@import[^;]*tokens\.css/.test(read(sc))) errors.push('style.css importiert tokens.css nicht (@import url("tokens.css")).');

/* Ausgabe --------------------------------------------------------------- */
if (errors.length) {
  console.error(`\n✗ Design-Hygiene: ${errors.length} Verstoß/Verstöße (siehe DESIGN-HYGIENE.md):`);
  errors.forEach((e) => console.error('  ::error::' + e));
  process.exit(1);
}
console.log('✓ Design-Hygiene: keine Verstöße. Tokens single-sourced, Schriften lokal, kein Em-Dash im HTML.');
