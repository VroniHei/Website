# Innerline PDF Maker

Lokales Tool, das HTML- und Markdown-Dateien in hochwertige PDFs umwandelt.

- **HTML** (z.B. ein Design aus Claude Design) wird zu einem **interaktiven, barrierefreien PDF**: ausfüllbare Felder, anklickbare Checkboxen, Links und Copy-Buttons.
- **Markdown** wird zu einem **gesetzten Lese-PDF** im Innerline Editorial-Stil.

Das Tool läuft als lokaler Server auf dem eigenen Rechner. Es kann nicht auf GitHub Pages gehostet werden, weil es lokale Programme braucht (Playwright/Chromium, Ghostscript, qpdf). Auf GitHub liegt der Code, gestartet wird lokal.

## Voraussetzungen

- Node.js 18+
- Ghostscript und qpdf:
  ```bash
  brew install ghostscript qpdf
  ```

## Einrichten

```bash
cd tools/pdf-maker
npm install
npx playwright install chromium
```

## Starten

```bash
node server.js
```

Dann im Browser: http://localhost:3847

Beim ersten Start einmal das Passwort unter `/setup` festlegen. Danach Login unter `/login`. Von der Website aus führt das Login-Icon in der Navigation direkt hierher.

## Konfiguration

Die lokale Konfiguration liegt in `config/.env.local` (Passwort-Hash, optionaler Claude API-Key, Admin-E-Mail). Diese Datei ist absichtlich nicht im Repo (`.gitignore`) und bleibt nur lokal.

## Aufbau

```
server.js            Express-Server: Login, Upload, Pipeline-Stream, Download
pipeline/index.js    HTML -> interaktives PDF (Playwright -> Ghostscript -> pdf-lib -> qpdf)
pipeline/markdown.js Markdown -> Editorial-HTML -> PDF
public/              Oberfläche (Tool, Login, Setup) im Innerline Web-Stil
```
