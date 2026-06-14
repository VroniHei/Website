# /neue-seite — Neue HTML-Seite mit vollständiger Infrastruktur anlegen

Legt eine neue HTML-Seite korrekt an — alle Pflicht-Updates inklusive, damit kein CI-Check fehlt.

## Was du tust

Frage mich zuerst:
1. **Dateiname** der neuen Seite (z.B. `blog.html`)
2. **Titel** der Seite (für `<title>` und `<h1>`)
3. **Soll die Seite indexiert werden?** (ja = normale Seite; nein = noindex wie tools.html)

Dann:

### Schritt 1 — HTML-Datei erstellen
Kopiere das Grundgerüst von einer bestehenden Seite (`ueber-mich.html` als Vorlage):
- Gleiche `<head>`-Struktur (meta, og, tokens.css, style.css, seitenspezifisches CSS)
- Gleiche Navigation mit `.nav-user-icon` (Login-Icon, `href="http://localhost:3847/login"`)
- Gleicher Footer
- `aria-current="page"` auf dem Nav-Link der neuen Seite
- `<script src="count.js">` + `<script src="script.js">` in korrekter Reihenfolge

### Schritt 2 — CI-Yml aktualisieren (`.github/workflows/ci.yml`)
Füge den Dateinamen hinzu in:
- `html-validate` Job: `run: npx --yes html-validate@8 ... NEUE-SEITE.html`
- `links` Job: `args: "--offline --no-progress ... NEUE-SEITE.html"` (außer bei noindex)

### Schritt 3 — sitemap.xml (nur wenn indexiert)
Füge einen neuen `<url>`-Block hinzu mit aktuellem `lastmod`.

### Schritt 4 — robots.txt (nur wenn noindex)
Füge `Disallow: /neue-seite.html` hinzu.

### Schritt 5 — WISSEN.md
Ergänze die Seite in Abschnitt "3. Tech-Stack & Infrastruktur" unter den Seiten-Aufzählungen.

### Schritt 6 — PROTOKOLL.md
Schreibe einen Eintrag mit Was/Warum/Wie für die neue Seite.

## Abschluss
"Neue Seite `DATEINAME.html` angelegt. CI, sitemap, robots.txt und WISSEN.md aktualisiert. Bitte Inhalt ergänzen und als PR öffnen."
