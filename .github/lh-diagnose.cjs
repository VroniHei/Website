// CI-Diagnose: liest die Lighthouse-Reports aus .lighthouseci/ und gibt pro Seite
// Performance, TBT, JS-Ausführung und die Main-Thread-Aufschlüsselung (Scripting vs.
// Rendering/Paint) sowie CLS + die verursachenden Layout-Shift-Elemente aus.
// Reine Diagnose, beeinflusst die Live-Seite nicht.
const fs = require('fs');
const dir = '.lighthouseci';
const ms = (x) => Math.round(x || 0) + ' ms';
const urlOf = (lhr) =>
  (lhr.finalDisplayedUrl || lhr.finalUrl || lhr.mainDocumentUrl || lhr.requestedUrl || '')
    .replace(/^https?:\/\/[^/]+/, '');

if (!fs.existsSync(dir)) { console.log('Keine .lighthouseci/-Reports gefunden.'); process.exit(0); }
const reps = fs.readdirSync(dir)
  .filter((f) => /^lhr-.*\.json$/.test(f))
  .map((f) => JSON.parse(fs.readFileSync(dir + '/' + f, 'utf8')))
  .sort((a, b) => urlOf(a).localeCompare(urlOf(b)));

for (const lhr of reps) {
  const a = lhr.audits || {};
  console.log('\n=== ' + (urlOf(lhr) || '(unbekannt)') + ' ===');
  console.log('Performance:', Math.round(((lhr.categories.performance || {}).score || 0) * 100));
  if (a['total-blocking-time']) console.log('TBT:', ms(a['total-blocking-time'].numericValue));
  if (a['bootup-time']) console.log('JS-Ausfuehrung (bootup-time):', ms(a['bootup-time'].numericValue));
  if (a['mainthread-work-breakdown']) {
    console.log('Main-thread gesamt:', ms(a['mainthread-work-breakdown'].numericValue));
    ((a['mainthread-work-breakdown'].details || {}).items || [])
      .sort((x, y) => (y.duration || 0) - (x.duration || 0))
      .forEach((i) => console.log('   - ' + (i.groupLabel || i.group) + ': ' + ms(i.duration)));
  }
  if (a['cumulative-layout-shift'])
    console.log('CLS:', ((a['cumulative-layout-shift'].numericValue) || 0).toFixed(3));
  const lse = a['layout-shift-elements'];
  if (lse && lse.details && (lse.details.items || []).length) {
    console.log('Layout-Shift-Elemente:');
    lse.details.items.slice(0, 5).forEach((i) => {
      const n = i.node || {};
      console.log('   - ' + String(n.snippet || n.selector || '?').slice(0, 100));
    });
  }
}
