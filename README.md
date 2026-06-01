# Vroni · Veronika Heidrich — Klarheit in Bewegung

Ein statisches Portfolio- und Angebots-Template für die Markenwelt von Vroni. Diese Landingpage verbindet strategisches Visual Design mit klarer Inhaltsstruktur, aufmerksamem Scrollverhalten und einem modernen Look & Feel.

## Was dieses Projekt enthält

- `index.html` – statische One-Page-Landingpage mit Sections für Angebote, Ansatz, Yoga und Kontakt
- `style.css` – modernes Designsystem mit CSS-Variablen, responsive Layouts und visuellen Details
- `script.js` – leichte Vanilla-JavaScript-Interaktionen für Sticky Nav, Mobile Menu, Smooth Scroll, Reveal-Effekte und Section-Spy
- `.gitignore` – gängige Entwicklungsartefakte ausgeschlossen

## Highlights

- responsive Navigation mit mobilem Burger-Menü
- sanfte Scrollanimationen und Auffahr-Effekte
- aktive Hervorhebung der Navigation beim Scrollen
- ausklappbare Sektionen für den Ansatz
- saubere statische Struktur ohne Build-Tool

## Tech-Stack

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript
- Google Font: `Syne`

## Lokale Nutzung

1. Repository klonen:
   ```bash
   git clone https://github.com/VroniHei/Website.git
   cd Website
   ```
2. `index.html` direkt im Browser öffnen

Alternativ mit einem lokalen Server:
```bash
python3 -m http.server 8000
```
Öffne dann `http://localhost:8000`.

## Branches

- **`main`** ist die einzige Quelle der Wahrheit und enthält den kompletten, aktuellen Website-Stand.
- Es gibt **keinen `gh-pages`-Branch** und keinen separaten Build-/Deploy-Workflow mehr.

## Deployment

Das Deployment läuft über **GitHub Pages direkt aus dem `main`-Branch**. Jeder Push auf `main` aktualisiert automatisch die Live-Seite (typisch nach ~1–2 Minuten) — kein separater `gh-pages`-Branch, kein Build-Step, keine Pipeline.

GitHub Pages ist dafür in den Repo-Settings auf **Branch `main` / Ordner `/ (root)`** konfiguriert. Da das Projekt aus reinen statischen Dateien besteht, ist keine zusätzliche Build-Pipeline nötig.

Alternativ ist das Projekt auch für andere statische Hosts (Netlify, Vercel) geeignet, falls ein Wechsel gewünscht ist.

## Projektstruktur

- `index.html` – Seitenstruktur, Branding, Angebotsblöcke, Kontaktanker
- `style.css` – Farben, Typografie, responsive Layouts, Hover-States
- `script.js` – Navigation, Menü, Scroll-Logik, Reveal-Animationen

## Hinweise

- Die Seite wurde als leichtgewichtige, wartbare Landingpage umgesetzt
- Bilder und Medien sind als Platzhalter bzw. Inline-Elemente definiert

## Lizenz

Alle Rechte vorbehalten. Dieses Projekt wurde von VroniHei erstellt.
