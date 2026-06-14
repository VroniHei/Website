# /handoff — Claude-Design-Handoff implementieren

Vollständiger Workflow zum sicheren Einspielen eines Claude-Design-Handoffs ins Repo.

## Was du tust

### Schritt 1 — Bundle laden
Frage mich nach der Handoff-URL (Format: `https://api.anthropic.com/v1/design/h/...`).

Lade und extrahiere das Bundle:
```bash
HANDOFF_URL="[URL]"
mkdir -p /tmp/handoff_extracted
curl -sL "$HANDOFF_URL" -o /tmp/handoff.tar.gz
tar -xzf /tmp/handoff.tar.gz -C /tmp/handoff_extracted
```

Lies zuerst `README.md` aus dem `_handoff/`-Ordner — dort steht was geändert wurde und welche Dateien zu kopieren sind.

### Schritt 2 — Encoding-Check (PFLICHT vor allem anderen)
Führe `/encoding-check` auf allen HTML-Dateien aus dem Bundle aus:
```bash
grep -Pln '[\x{201C}\x{201D}]' /tmp/handoff_extracted/**/*.html
```

**Bei Treffern: STOP.** Melde die betroffenen Zeilen. Erst bereinigen, dann weitermachen.

### Schritt 3 — Diff prüfen
Vergleiche die Handoff-Dateien mit dem aktuellen Repo-Stand:
```bash
diff /tmp/handoff_extracted/project/index.html /Users/team-mt25/Website/index.html
```
(für jede relevante Datei)

Berichte: Was hat sich geändert? Gibt es Überraschungen gegenüber dem README?

### Schritt 4 — Dateien übernehmen
Kopiere nur die Dateien die im README als "zu kopieren" genannt sind.
Keine automatischen Overrides — jede Datei bewusst prüfen.

### Schritt 5 — Invarianten-Check
Prüfe nach dem Kopieren:
- Hero-Motion (`.hero-bg` Ken-Burns-Animation vorhanden?)
- Logo NN-Ligatur (Vaelia-Font im Logo sichtbar?)
- Burger-CTA schwarz auf weiß (nicht invertiert?)
- Keine externen Font-CDN-Referenzen eingeschlichen?

### Schritt 6 — Branch + PR
```bash
git switch -c design/[beschreibung]
git add [geänderte Dateien]
# PROTOKOLL.md schreiben (oder /protokoll aufrufen)
git commit -m "design: [was wurde gemacht]"
git push -u origin design/[beschreibung]
gh pr create ...
```

## Häufige Fehler
- Curly Quotes in Attributen → Section unsichtbar im Browser (Lektion aus PR #59/#60)
- `defer` auf script.js vergessen/hinzugefügt → Script-Lade-Reihenfolge bricht
- Externe Font-CDN im `<head>` → Datenschutz-Verstoß
- `@keyframes`-Namen doppelt über Stylesheets → Animation überschreibt andere
