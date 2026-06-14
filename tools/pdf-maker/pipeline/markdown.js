'use strict';

const { marked } = require('marked');
const path = require('path');

// Editorial-Stylesheet für aus Markdown gesetzte Lese-PDFs.
// Übernimmt die Innerline-Designsystem-Typografie (Figtree + Newsreader,
// warmes Papier, Ink-Töne, ruhige Maße). Print-getunt in mm/px.
function editorialCss(fontsDir) {
  const f = name => `file://${path.join(fontsDir, name)}`;
  return `
@font-face{font-family:'Figtree';font-weight:300 900;font-style:normal;src:url('${f('figtree.woff2')}') format('woff2');}
@font-face{font-family:'Newsreader';font-weight:400 600;font-style:normal;src:url('${f('newsreader.woff2')}') format('woff2');}
@font-face{font-family:'Newsreader';font-weight:400 600;font-style:italic;src:url('${f('newsreader-italic.woff2')}') format('woff2');}

:root{
  --chalk:#F8F5EE; --paper:#E8E3D5; --sand:#EFEADD; --ink:#23221A; --forest:#2C3522;
  --green:#A8E84F; --green-deep:#6E9B2C; --green-text:#447510; --sage:#9BA383;
  --clay:#CD8A5B; --ink-soft:#5d564a; --body-c:#4b463a; --white:#FFFFFF;
  --hair:rgba(35,34,26,.14); --measure:34em;
  --ff:'Figtree',system-ui,-apple-system,sans-serif;
  --serif:'Newsreader',Georgia,serif;
}
*{box-sizing:border-box;margin:0;padding:0;}
html{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
body{font-family:var(--ff);color:var(--body-c);background:var(--white);font-size:10.5pt;line-height:1.6;}

.md{max-width:var(--measure);}

/* Überschriften — Figtree, Ink, ruhig und zurückhaltend gestaffelt */
.md h1,.md h2,.md h3,.md h4,.md h5,.md h6{
  color:var(--ink);font-weight:700;letter-spacing:-.015em;line-height:1.18;
  text-wrap:balance;margin:0 0 .4em;
}
.md h1{font-size:20pt;letter-spacing:-.02em;line-height:1.1;margin-bottom:.55em;}
.md h2{font-size:14.5pt;margin-top:1.6em;padding-bottom:.3em;border-bottom:1px solid var(--hair);}
.md h3{font-size:12pt;margin-top:1.4em;}
.md h4{font-size:10.5pt;margin-top:1.2em;letter-spacing:0;}
.md h5{font-size:9.5pt;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-soft);margin-top:1.2em;}
.md h6{font-size:9pt;text-transform:uppercase;letter-spacing:.1em;color:var(--sage);margin-top:1.2em;}

/* erste Zeile nach H1 als Lead */
.md h1 + p{font-size:12pt;line-height:1.5;color:var(--ink);font-weight:500;margin-bottom:1.1em;}

.md p{margin:0 0 .85em;}
.md strong{color:var(--ink);font-weight:650;}
.md em{font-family:var(--serif);font-style:italic;font-size:1.06em;letter-spacing:-.005em;}
.md a{color:var(--green-text);text-decoration:none;border-bottom:1px solid rgba(68,117,16,.35);}

/* Listen */
.md ul,.md ol{margin:0 0 .9em 1.3em;}
.md li{margin-bottom:.34em;padding-left:.2em;}
.md ul li::marker{color:var(--green-deep);}
.md ol li::marker{color:var(--ink-soft);font-weight:600;}
.md li > ul,.md li > ol{margin-top:.34em;margin-bottom:.2em;}

/* Zitat — Newsreader-Kursiv, grüne Kante */
.md blockquote{
  margin:1.1em 0;padding:.2em 0 .2em 18px;border-left:3px solid var(--green);
  font-family:var(--serif);font-style:italic;font-size:1.12em;line-height:1.5;color:var(--ink);
}
.md blockquote p{margin-bottom:.4em;}
.md blockquote p:last-child{margin-bottom:0;}

/* Code */
.md code{font-family:'Menlo','Monaco',monospace;font-size:.86em;background:var(--sand);
  padding:.12em .4em;border-radius:5px;color:var(--ink);}
.md pre{background:var(--forest);color:var(--chalk);border-radius:12px;padding:16px 18px;
  margin:1.1em 0;overflow-x:auto;font-size:9.5pt;line-height:1.5;}
.md pre code{background:none;color:inherit;padding:0;font-size:1em;}

/* Trenner */
.md hr{border:none;height:1px;background:var(--hair);margin:1.8em 0;}

/* Tabellen */
.md table{width:100%;border-collapse:collapse;margin:1.1em 0;font-size:9.5pt;}
.md th,.md td{text-align:left;padding:8px 12px;border-bottom:1px solid var(--hair);}
.md th{font-weight:700;color:var(--ink);background:var(--sand);}
.md tr:last-child td{border-bottom:none;}

/* Bilder */
.md img{max-width:100%;height:auto;border-radius:12px;margin:1.1em 0;display:block;}

/* Umbrüche schöner verteilen */
.md h1,.md h2,.md h3,.md h4{break-after:avoid;}
.md blockquote,.md pre,.md table,.md img{break-inside:avoid;}
`;
}

// Markdown-Text → vollständiges, eigenständiges HTML-Dokument im Editorial-Stil.
function buildEditorialHtml(mdText, { fontsDir, title } = {}) {
  marked.setOptions({ gfm: true, breaks: false });
  const content = marked.parse(mdText || '');
  const safeTitle = (title || 'Dokument').replace(/[<>&]/g, '');
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>${safeTitle}</title>
<style>${editorialCss(fontsDir)}</style>
</head>
<body>
<article class="md">
${content}
</article>
</body>
</html>`;
}

module.exports = { buildEditorialHtml };
