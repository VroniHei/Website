'use strict';

const { chromium } = require('playwright');
const { PDFDocument, PDFName, PDFString, StandardFonts, rgb } = require('pdf-lib');
const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const GS_PATHS  = ['/opt/homebrew/bin/gs',  '/usr/local/bin/gs',  'gs'];
const QPDF_PATHS = ['/opt/homebrew/bin/qpdf', '/usr/local/bin/qpdf', 'qpdf'];

function findBin(candidates) {
  return candidates.find(p => {
    try { execSync(`"${p}" --version`, { stdio: 'ignore' }); return true; } catch { return false; }
  }) || null;
}

// Schriftgröße der ausfüllbaren Formularfelder (Punkt). Fest, damit der Text
// nicht auf die Feldhöhe hochskaliert.
const FIELD_FONT_SIZE = 9.5;

// Innenabstand der Felder (Punkt). Das Widget-Rechteck wird vom erkannten
// Kasten nach innen versetzt, damit eingetippter Text nicht direkt am Rand
// klebt. AcroForm-Textfelder haben keine native Padding-Eigenschaft.
const FIELD_PAD_X = 4;
const FIELD_PAD_Y = 2;

// Füllfarbe der Eingabefelder (leerer Zustand): sehr helles Flieder, abgeleitet
// vom CI-Token --lilac (#CBBEF4). Hebt Felder dezent ab, ohne mit dem Grün zu
// konkurrieren. Wird beim Ausfüllen ausgeblendet.
const FIELD_FILL   = rgb(0.957, 0.945, 0.988);
const FIELD_BORDER = rgb(0.720, 0.660, 0.865); // dezenter, etwas dunklerer Flieder-Rand
const FIELD_FILL_JS   = '0.957,0.945,0.988';
const FIELD_BORDER_JS = '0.720,0.660,0.865';

const GS_QUALITY = {
  web:     { setting: '/screen',  dpi: 96  },
  print:   { setting: '/printer', dpi: 120 },
  archive: { setting: '/prepress',dpi: 300 },
};

async function convertToPDF(inputHtmlPath, outputPdfPath, settings = {}, onProgress = () => {}) {
  const {
    quality         = 'print',
    formFields      = true,
    highlightFields = true,
    links           = true,
    copyButtons     = true,
    linearize       = true,
    accessible      = true,
    metadata        = {},
    pageSize        = 'A4',
    customWidth,
    customHeight,
    fieldFontSize,
    pageMargin,        // { top,right,bottom,left } — z.B. für Lese-PDFs aus Markdown
    skipPageWait    = false, // true bei Markdown (kein section.page-Layout)
  } = settings;

  // PDF-Seitengröße bestimmen:
  //  - 'original' → Format des Mediums (CSS @page / Quellgröße) beibehalten
  //  - 'custom'   → individuelle Maße in mm
  //  - sonst      → Normformat (A4, A5, …)
  function pdfSizeOptions() {
    if (pageSize === 'original') return { preferCSSPageSize: true };
    const w = Number(customWidth), h = Number(customHeight);
    if (pageSize === 'custom' && w > 0 && h > 0) return { width: `${w}mm`, height: `${h}mm` };
    const known = ['A3', 'A4', 'A5', 'A6', 'Letter', 'Legal', 'Tabloid'];
    return { format: known.includes(pageSize) ? pageSize : 'A4' };
  }

  // Schriftgröße der Felder: aus Einstellungen oder Standard.
  const fieldSize = Number(fieldFontSize) > 0 ? Number(fieldFontSize) : FIELD_FONT_SIZE;

  const tmpDir  = fs.mkdtempSync(path.join(os.tmpdir(), 'pdf-maker-'));
  const rawPath = path.join(tmpDir, 'raw.pdf');
  const gsPath  = path.join(tmpDir, 'gs.pdf');
  const linPath = path.join(tmpDir, 'lin.pdf');

  const cleanup = () => { try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {} };

  try {
    // ── 1. Playwright ──────────────────────────────────────────────────────────
    onProgress({ step: 'browser', msg: 'Browser startet…' });
    const t0 = Date.now();

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1240, height: 900 } });
    const page    = await context.newPage();

    await page.goto(`file://${inputHtmlPath}`, { waitUntil: 'networkidle', timeout: 90000 });

    // "Bundled Page"-Handoffs injizieren ihren Inhalt per JS verzögert. Aktiv
    // auf die echten Seiten warten statt fix zu pausieren — sonst rendert man
    // den noch nicht entpackten Rohzustand (hunderte Müll-Seiten).
    if (!skipPageWait) {
      try {
        await page.waitForFunction(
          () => document.querySelectorAll('section.page').length > 0,
          { timeout: 30000 }
        );
      } catch {
        // Kein section.page-Layout (andere HTML-Quelle) → normaler Fixed-Wait
      }
    }
    await page.waitForTimeout(skipPageWait ? 400 : 1500);

    // CSS-Overrides: Mix-Blend-Mode-Overlays → Rasterisierung verhindern
    await page.addStyleTag({ content: `
      .grain-soft::after, .cover-photo::after, .cta-card::after { display: none !important; }
      *::before, *::after { mix-blend-mode: normal !important; }
      * { mix-blend-mode: normal !important; }
      /* Dekorative, vollflächige Ambient-Verläufe der Seiten flach machen.
         Auf dem Bildschirm wirken sie als zarte Atmosphäre, im gedruckten PDF
         aber wie ungleichmäßige Flecken im Hintergrund (mehrere überlagerte
         halbtransparente Radial-Verläufe). Die Seite behält ihre Grundfarbe.
         Allgemeine Optimierung: gilt für jedes erzeugte PDF. */
      section.page::before, section.page::after,
      .page::before, .page::after { background: none !important; box-shadow: none !important; }
      input[type="button"], input[type="submit"], input[type="reset"] { display: none !important; }
      /* Checkboxen/Radios: bei interaktiven PDFs nur unsichtbar schalten (Layout
         bleibt, damit wir die Position erfassen) — darüber legen wir eine
         anklickbare AcroForm-Checkbox. Ohne Formularfelder bleiben sie als
         sichtbare, gedruckte Kästchen erhalten. */
      ${formFields ? 'input[type="checkbox"], input[type="radio"] { visibility: hidden !important; }' : ''}
      .toolbar, .toolbar button { display: none !important; }
      .page { box-shadow: none !important; }
      /* Eigenen Text/Platzhalter der Eingabefelder NICHT mitrendern — sonst
         bäckt er sich in die Seite und überlagert später den getippten Text
         im AcroForm-Feld (zwei Wörter übereinander). Das echte Feld ersetzt ihn. */
      input.line, textarea, input[type="text"], input[type="email"],
      input[type="tel"], input[type="number"], input[type="date"], input[type="url"] {
        color: transparent !important;
        -webkit-text-fill-color: transparent !important;
        caret-color: transparent !important;
      }
      input.line::placeholder, textarea::placeholder, input::placeholder {
        color: transparent !important; opacity: 0 !important;
      }
      /* Notizbuch-Linien (repeating-linear-gradient) entfernen. Ausfüllbare
         Felder werden einheitlich als helle Box gesetzt; kleine Schrift auf
         weiten Linien lässt sich in AcroForm-Feldern nicht sauber ausrichten. */
      textarea { background-image: none !important; }
    `});

    // Plain-Text-E-Mails → Mailto-Links
    await page.evaluate(() => {
      const re = /([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        if (!re.test(node.textContent)) return;
        re.lastIndex = 0;
        if (node.parentNode?.tagName === 'A') return;
        const parts = node.textContent.split(re);
        if (parts.length <= 1) return;
        re.lastIndex = 0;
        const frag = document.createDocumentFragment();
        parts.forEach((p, i) => {
          if (i % 2 === 1) {
            const a = document.createElement('a');
            a.href = `mailto:${p}`; a.textContent = p;
            a.style.cssText = 'color:inherit;text-decoration:none;';
            frag.appendChild(a);
          } else if (p) frag.appendChild(document.createTextNode(p));
        });
        node.parentNode.replaceChild(frag, node);
      });
    });

    // ── 2. DOM-Extraktion ──────────────────────────────────────────────────────
    const extractT = Date.now();
    const fieldData = formFields ? await page.evaluate(() => {
      const pages = document.querySelectorAll('section.page');
      const result = [];
      pages.forEach((pageEl, pageIndex) => {
        const pr = pageEl.getBoundingClientRect();
        if (!pr.width || !pr.height) return;
        pageEl.querySelectorAll('input.line, textarea').forEach(field => {
          const fr = field.getBoundingClientRect();
          if (fr.width < 2 || fr.height < 2) return;
          const isTextarea = field.tagName.toLowerCase() === 'textarea';
          // Notizbuch-Felder: Linien via repeating-linear-gradient. Zeilenhöhe
          // (= Linienabstand) und Top-Padding erfassen, damit der getippte Text
          // exakt auf den Linien sitzt.
          const cs = getComputedStyle(field);
          const ruled = (cs.backgroundImage || '').includes('repeating-linear-gradient');
          const lineHeightPx = parseFloat(cs.lineHeight) || 0;
          const padTopPx = parseFloat(cs.paddingTop) || 0;
          result.push({
            pageIndex,
            relX: (fr.left - pr.left) / pr.width, relY: (fr.top - pr.top) / pr.height,
            relW: fr.width / pr.width,             relH: fr.height / pr.height,
            isTextarea,
            ruled, lineHeightPx, padTopPx,
            pageHpx: pr.height,
            label: field.getAttribute('aria-label') || field.getAttribute('placeholder') || `feld_${pageIndex}_${result.length}`,
          });
        });
      });
      return result;
    }) : [];

    // Checkboxen: Positionen erfassen → anklickbare AcroForm-Checkboxen.
    const checkboxData = formFields ? await page.evaluate(() => {
      const pages = document.querySelectorAll('section.page');
      const result = [];
      pages.forEach((pageEl, pageIndex) => {
        const pr = pageEl.getBoundingClientRect();
        if (!pr.width || !pr.height) return;
        pageEl.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(box => {
          const br = box.getBoundingClientRect();
          if (br.width < 2 || br.height < 2) return;
          const lbl = box.closest('label') || box.parentElement;
          result.push({
            pageIndex,
            relX: (br.left - pr.left) / pr.width, relY: (br.top - pr.top) / pr.height,
            relW: br.width / pr.width,             relH: br.height / pr.height,
            checked: box.checked,
            label: box.getAttribute('aria-label') || (lbl && lbl.textContent ? lbl.textContent.trim().slice(0, 80) : `check_${pageIndex}_${result.length}`),
          });
        });
      });
      return result;
    }) : [];

    const linkData = links ? await page.evaluate(() => {
      const pages = document.querySelectorAll('section.page');
      const result = [];
      pages.forEach((pageEl, pageIndex) => {
        const pr = pageEl.getBoundingClientRect();
        if (!pr.width || !pr.height) return;
        pageEl.querySelectorAll('a[href]').forEach(link => {
          const href = link.getAttribute('href');
          if (!href || href.startsWith('#')) return;
          const lr = link.getBoundingClientRect();
          if (lr.width < 2 || lr.height < 2) return;
          result.push({ pageIndex,
            relX: (lr.left - pr.left) / pr.width, relY: (lr.top - pr.top) / pr.height,
            relW: lr.width / pr.width,             relH: lr.height / pr.height, href });
        });
      });
      return result;
    }) : [];

    const copyBtnData = copyButtons ? await page.evaluate(() => {
      const pages = document.querySelectorAll('section.page');
      const result = [];
      pages.forEach((pageEl, pageIndex) => {
        const pr = pageEl.getBoundingClientRect();
        if (!pr.width || !pr.height) return;
        pageEl.querySelectorAll('button.copy-btn[data-copy]').forEach(btn => {
          const br = btn.getBoundingClientRect();
          if (br.width < 2 || br.height < 2) return;
          const targetEl = document.querySelector(btn.getAttribute('data-copy'));
          const text = targetEl?.textContent?.trim() || '';
          if (!text) return;
          result.push({ pageIndex,
            relX: (br.left - pr.left) / pr.width, relY: (br.top - pr.top) / pr.height,
            relW: br.width / pr.width,             relH: br.height / pr.height,
            text: text.substring(0, 30000) });
        });
      });
      return result;
    }) : [];

    const pageCount = await page.evaluate(() => document.querySelectorAll('section.page').length);
    onProgress({ step: 'extract', msg: `${pageCount} Seiten · ${fieldData.length} Felder · ${checkboxData.length} Checkboxen · ${linkData.length} Links · ${copyBtnData.length} Copy-Buttons`, elapsed: Date.now() - extractT });

    // ── 3. PDF rendern ─────────────────────────────────────────────────────────
    const renderT = Date.now();
    onProgress({ step: 'render', msg: 'PDF wird gerendert…' });
    const margin = pageMargin || { top: '0', bottom: '0', left: '0', right: '0' };
    const pdfBuffer = await page.pdf({
      ...pdfSizeOptions(), printBackground: true, margin,
    });
    await browser.close();
    onProgress({ step: 'render', msg: `Roh: ${(pdfBuffer.length / 1024 / 1024).toFixed(1)} MB`, elapsed: Date.now() - renderT });

    // ── 4. Ghostscript ─────────────────────────────────────────────────────────
    const compressT = Date.now();
    onProgress({ step: 'compress', msg: 'Ghostscript komprimiert…' });
    const gs = findBin(GS_PATHS);
    fs.writeFileSync(rawPath, pdfBuffer);
    let compressedBuf = pdfBuffer;

    if (gs) {
      const q = GS_QUALITY[quality] || GS_QUALITY.print;
      execSync(`"${gs}" -sDEVICE=pdfwrite -dNOPAUSE -dBATCH -dQUIET \
        -dPDFSETTINGS=${q.setting} \
        -dColorConversionStrategy=/LeaveColorUnchanged \
        -dEncodeColorImages=true \
        -dDownsampleColorImages=true -dColorImageResolution=${q.dpi} \
        -dDownsampleGrayImages=true  -dGrayImageResolution=${q.dpi} \
        -dDownsampleMonoImages=false \
        -dEmbedAllFonts=true -dSubsetFonts=true \
        -dCompatibilityLevel=1.7 \
        -o "${gsPath}" "${rawPath}"`, { stdio: 'inherit' });
      compressedBuf = fs.readFileSync(gsPath);
      onProgress({ step: 'compress', msg: `Komprimiert: ${(compressedBuf.length / 1024 / 1024).toFixed(1)} MB`, elapsed: Date.now() - compressT });
    } else {
      onProgress({ step: 'compress', msg: 'Ghostscript nicht gefunden — Schritt übersprungen', elapsed: 0 });
    }

    // ── 5. pdf-lib: Formularfelder + Links + Copy-Buttons ─────────────────────
    const acroT = Date.now();
    onProgress({ step: 'acroform', msg: 'Formularfelder werden eingefügt…' });

    const pdfDoc   = await PDFDocument.load(compressedBuf, { ignoreEncryption: true });
    const pdfPages = pdfDoc.getPages();
    const form     = pdfDoc.getForm();
    const nameCount = {};

    function uniqueName(base) {
      const s = (base || 'feld').replace(/[^\w\-äöüÄÖÜß ]/g, '_').substring(0, 100);
      nameCount[s] = (nameCount[s] || 0) + 1;
      return nameCount[s] === 1 ? s : `${s}_${nameCount[s]}`;
    }

    // Textfelder
    let fieldOk = 0;
    for (const f of fieldData) {
      if (f.pageIndex >= pdfPages.length) continue;
      const pp = pdfPages[f.pageIndex];
      const { width: pw, height: ph } = pp.getSize();
      const x = f.relX * pw, h = f.relH * ph, w = f.relW * pw;
      const y = ph - f.relY * ph - h;
      if (w < 5 || h < 3 || x < 0 || y < 0) continue;

      // Innenabstand: Rechteck nach innen versetzen, aber nur soweit das Feld
      // groß genug bleibt. So bekommt der Text Luft zum Rand.
      const padX = Math.min(FIELD_PAD_X, (w - 5) / 2);
      const padY = Math.min(FIELD_PAD_Y, (h - 3) / 2);
      const fx = x + Math.max(0, padX);
      const fy = y + Math.max(0, padY);
      const fw = Math.min(w - 2 * Math.max(0, padX), pw - fx);
      const fh = Math.min(h - 2 * Math.max(0, padY), ph - fy);
      try {
        const tf = form.createTextField(uniqueName(f.label));
        if (f.isTextarea) tf.enableMultiline();
        // Einheitliche helle Flieder-Box mit dünnem, dezentem Rand, damit der
        // Kasten auf hellem Grund sichtbar ist. Die Innenabstände (fx/fy/fw/fh)
        // geben dem Text Luft zum Rand.
        tf.addToPage(pp, {
          x: fx, y: fy, width: fw, height: fh,
          borderWidth:     highlightFields ? 0.5 : 0,
          backgroundColor: highlightFields ? FIELD_FILL : undefined,
          borderColor:     highlightFields ? FIELD_BORDER : undefined,
          textColor: rgb(0.137, 0.133, 0.102),
        });
        // Tooltip / alternativer Feldname (TU) für Screenreader.
        try {
          if (f.label) tf.acroField.dict.set(PDFName.of('TU'), PDFString.of(String(f.label).substring(0, 200)));
        } catch {}
        try { tf.setFontSize(fieldSize); } catch {}
        const widgets = tf.acroField.getWidgets();
        const lastWidget = widgets[widgets.length - 1];
        if (lastWidget) lastWidget.setDefaultAppearance(`/Helvetica ${fieldSize} Tf 0 g`);

        // Die helle Fläche soll verschwinden, sobald das Feld ausgefüllt ist.
        // Ein Acrobat-Skript setzt bei Fokus/Verlassen Hintergrund + Rahmen auf
        // transparent, wenn ein Wert vorhanden ist (Acrobats eigener Overlay ist
        // per Dokument-JS ausgeschaltet — siehe app.runtimeHighlight=false).
        if (lastWidget && highlightFields) {
          const toggleJS = 'var f=event.target;if(f){var e=(f.value=="");'
            + `f.fillColor=e?[${FIELD_FILL_JS}]:color.transparent;`
            + `f.strokeColor=e?[${FIELD_BORDER_JS}]:color.transparent;}`;
          lastWidget.dict.set(PDFName.of('AA'), pdfDoc.context.obj({
            Bl: pdfDoc.context.obj({ Type: PDFName.of('Action'), S: PDFName.of('JavaScript'), JS: PDFString.of(toggleJS) }),
            Fo: pdfDoc.context.obj({ Type: PDFName.of('Action'), S: PDFName.of('JavaScript'), JS: PDFString.of(toggleJS) }),
          }));
        }
        fieldOk++;
      } catch {}
    }

    // Checkboxen: anklickbare AcroForm-Checkboxen an den erkannten Positionen.
    let checkOk = 0;
    for (const c of checkboxData) {
      if (c.pageIndex >= pdfPages.length) continue;
      const pp = pdfPages[c.pageIndex];
      const { width: pw, height: ph } = pp.getSize();
      const x = c.relX * pw, h = c.relH * ph, w = c.relW * pw;
      const y = ph - c.relY * ph - h;
      if (w < 4 || h < 4 || x < 0 || y < 0) continue;
      // Quadratisch halten (kleinere Kante), damit das Häkchen mittig sitzt.
      const side = Math.min(w, h);
      try {
        const cb = form.createCheckBox(uniqueName('check_' + c.label));
        cb.addToPage(pp, {
          x, y: y + (h - side), width: side, height: side,
          // Einheitlich zur Eingabe-Box: dieselbe helle Flieder-Fläche mit
          // dünnem, dezentem Rand. So ist klar, dass hier etwas angehakt werden
          // kann. Grünes Häkchen beim Anhaken.
          borderWidth: 0.5,
          borderColor: highlightFields ? FIELD_BORDER : rgb(0.66, 0.65, 0.63),
          backgroundColor: highlightFields ? FIELD_FILL : rgb(1, 1, 1),
          textColor: rgb(0.431, 0.608, 0.173),
        });
        if (c.checked) cb.check();
        checkOk++;
      } catch {}
    }

    // Link-Annotationen
    let linkOk = 0;
    for (const l of linkData) {
      if (l.pageIndex >= pdfPages.length) continue;
      const pp = pdfPages[l.pageIndex];
      const { width: pw, height: ph } = pp.getSize();
      const x = l.relX * pw, h = l.relH * ph, w = l.relW * pw;
      const y = ph - l.relY * ph - h;
      let url = l.href;
      if (!url.startsWith('mailto:') && !url.startsWith('http')) url = 'https://' + url;
      try {
        const ref = pdfDoc.context.register(pdfDoc.context.obj({
          Type: PDFName.of('Annot'), Subtype: PDFName.of('Link'),
          Rect: [Math.max(0,x), Math.max(0,y), Math.min(pw,x+w), Math.min(ph,y+h)],
          Border: [0,0,0],
          A: { Type: PDFName.of('Action'), S: PDFName.of('URI'), URI: PDFString.of(url) },
        }));
        pp.node.addAnnot(ref);
        linkOk++;
      } catch {}
    }

    // Copy-Buttons: transparente AcroForm-Pushbuttons mit JS-Aktion
    let copyOk = 0;
    for (let i = 0; i < copyBtnData.length; i++) {
      const btn = copyBtnData[i];
      if (btn.pageIndex >= pdfPages.length) continue;
      const pp = pdfPages[btn.pageIndex];
      const { width: pw, height: ph } = pp.getSize();
      const x = btn.relX * pw, h = btn.relH * ph, w = btn.relW * pw;
      const y = ph - btn.relY * ph - h;
      if (w < 5 || h < 3 || x < 0 || y < 0) continue;
      // Selbsterklärender Button: In Acrobat Pro kopiert er in die Zwischenablage.
      // In Readern ohne Zwischenablage-Recht (kostenloser Adobe Reader u.a.)
      // schlägt setClipboardContents fehl → der Klick zeigt dann eine kurze
      // Anleitung zum manuellen Kopieren, statt wirkungslos zu sein.
      const hintMsg = 'Zum Kopieren bitte den Text markieren und mit Cmd+C (Mac) '
        + 'oder Strg+C (Windows) kopieren. Der Ein-Klick-Button funktioniert nur in Adobe Acrobat Pro.';
      const jsCode = `try{app.setClipboardContents(${JSON.stringify(btn.text)});}`
        + `catch(e){app.alert({cMsg:${JSON.stringify(hintMsg)},cTitle:"Text kopieren",nIcon:1});}`;
      try {
        const pdfBtn = form.createButton(uniqueName(`copy_prompt_${i + 1}`));
        pdfBtn.addToPage('', pp, {
          x, y, width: Math.min(w, pw - x), height: Math.min(h, ph - y),
          borderWidth: 0, backgroundColor: undefined,
        });
        const btnWidget = pdfBtn.acroField.getWidgets()[pdfBtn.acroField.getWidgets().length - 1];
        if (btnWidget) {
          // Hintergrundfarbe aus MK entfernen → Button transparent
          const mkDict = btnWidget.dict.get(PDFName.of('MK'));
          if (mkDict?.delete) mkDict.delete(PDFName.of('BG'));
          // Appearance-Streams leeren → kein grauer Kasten über dem Design
          const apDict = btnWidget.dict.get(PDFName.of('AP'));
          if (apDict) {
            for (const key of ['N', 'D']) {
              const ref = apDict.get?.(PDFName.of(key));
              if (!ref) continue;
              const stream = pdfDoc.context.lookup(ref);
              if (stream && Array.isArray(stream.operators)) stream.operators = [];
              else if (stream?.contents !== undefined) stream.contents = new Uint8Array(0);
            }
          }
          // JavaScript-Aktion auf MouseUp
          btnWidget.dict.set(PDFName.of('AA'), pdfDoc.context.obj({
            U: pdfDoc.context.obj({
              Type: PDFName.of('Action'), S: PDFName.of('JavaScript'), JS: PDFString.of(jsCode),
            }),
          }));
          // Hover-Tooltip mit Erklärung (sichtbar beim Drüberfahren).
          try {
            pdfBtn.acroField.dict.set(PDFName.of('TU'), PDFString.of(
              'Kopiert den Text in Adobe Acrobat Pro. In anderen Programmen Text markieren und mit Cmd+C / Strg+C kopieren.'
            ));
          } catch {}
        }
        copyOk++;
      } catch {}
    }

    // Metadaten setzen
    if (metadata.title)       pdfDoc.setTitle(metadata.title);
    if (metadata.author)      pdfDoc.setAuthor(metadata.author);
    if (metadata.description) pdfDoc.setSubject(metadata.description); // PDF-Betreff
    if (metadata.lang)        pdfDoc.setLanguage?.(metadata.lang);
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());

    // Copyright im Dokument hinterlegen (Info-Dict + Keywords für Sichtbarkeit)
    if (metadata.copyright) {
      try {
        pdfDoc.setKeywords([metadata.copyright]);
        const infoRef = pdfDoc.context.trailerInfo.Info;
        const info = infoRef && pdfDoc.context.lookup(infoRef);
        if (info?.set) info.set(PDFName.of('Copyright'), PDFString.of(metadata.copyright));
      } catch {}
    }

    // Barrierefreiheit: Dokumenttitel in der Fensterleiste anzeigen (statt
    // Dateiname) — wichtig für Screenreader. Sprache ist oben gesetzt, Felder
    // haben TU-Tooltips. So wird das PDF deutlich barriereärmer.
    if (accessible) {
      try {
        pdfDoc.catalog.set(
          PDFName.of('ViewerPreferences'),
          pdfDoc.context.obj({ DisplayDocTitle: true })
        );
      } catch {}
    }

    // Acrobats eigenen Feld-Hervorhebungs-Overlay (blau, liegt über jedem Feld)
    // beim Öffnen abschalten. Sonst bleibt unter dem getippten Text der blaue
    // Kasten sichtbar. Danach steuert nur noch unser MK/BG die Optik:
    // grün solange leer, neutral sobald ausgefüllt.
    if (highlightFields) {
      try {
        const jsRef = pdfDoc.context.register(pdfDoc.context.obj({
          S: PDFName.of('JavaScript'),
          JS: PDFString.of('try{app.runtimeHighlight=false;}catch(e){}'),
        }));
        pdfDoc.catalog.set(PDFName.of('Names'), pdfDoc.context.obj({
          JavaScript: pdfDoc.context.obj({
            Names: [PDFString.of('IL_NoFieldHighlight'), jsRef],
          }),
        }));
      } catch {}
    }

    // Erscheinungsbilder vorab generieren → kein Acrobat-NeedAppearances-Rerender beim Öffnen
    try {
      const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
      form.updateFieldAppearances(helv);
    } catch {}

    onProgress({ step: 'acroform', msg: `${fieldOk} Felder · ${checkOk} Checkboxen · ${linkOk} Links · ${copyOk} Buttons`, elapsed: Date.now() - acroT });

    // Zwischendatei speichern
    const finalBytes = await pdfDoc.save({ useObjectStreams: true, addDefaultPage: false });
    const intermediateOut = linearize ? linPath.replace('.pdf', '_pre.pdf') : outputPdfPath;
    fs.writeFileSync(intermediateOut, finalBytes);

    // ── 6. qpdf linearisieren ──────────────────────────────────────────────────
    if (linearize) {
      const linT = Date.now();
      onProgress({ step: 'linearize', msg: 'Fast Web View (qpdf)…' });
      const qpdf = findBin(QPDF_PATHS);
      if (qpdf) {
        execSync(`"${qpdf}" --linearize --newline-before-endstream "${intermediateOut}" "${outputPdfPath}"`, { stdio: 'inherit' });
        try { fs.unlinkSync(intermediateOut); } catch {}
      } else {
        fs.renameSync(intermediateOut, outputPdfPath);
      }
      onProgress({ step: 'linearize', msg: 'Linearisiert', elapsed: Date.now() - linT });
    }

    const finalSize = fs.statSync(outputPdfPath).size;
    onProgress({
      step: 'done',
      size:    `${(finalSize / 1024 / 1024).toFixed(2)} MB`,
      pages:   pdfPages.length,
      fields:  fieldOk,
      checkboxes: checkOk,
      links:   linkOk,
      buttons: copyOk,
    });

    return { ok: true, outputPath: outputPdfPath, size: finalSize, pages: pdfPages.length, fields: fieldOk, checkboxes: checkOk, links: linkOk, buttons: copyOk };

  } catch (err) {
    cleanup();
    throw err;
  } finally {
    cleanup();
  }
}

module.exports = { convertToPDF, findBin, GS_PATHS, QPDF_PATHS };
