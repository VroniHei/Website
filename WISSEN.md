# WISSEN · Projekt-Überblick & Wissens-Index · Vroni / InnerLine

> **Eine Datei, die auf alles zeigt.** Zweck: schneller Einstieg in den aktuellen Stand — und die Datei,
> die man einer KI **anhängt**, wenn neue Inhalte, Medien oder Beiträge im Stil/Kontext von InnerLine entstehen sollen.
> Schlanker, versionierter „RAG-Ersatz": kein eigenes System, sondern kuratierte Markdown-Doku.
>
> Pflege: bei größeren Änderungen kurz hier nachziehen (Stand-Datum unten). Details immer in den verlinkten Dateien.

---

## 1. Steckbrief

- **Wer:** Veronika Heidrich („Vroni"), Marke **InnerLine**. KI-gestützte **Brand- & Website-Strategin**.
- **Was ist die Seite:** One-Pager (Personal-Brand-Website) + Rechtsseiten. Deutschsprachig.
- **Markenkern:** „Sichtbar werden, ohne dich zu verbiegen." Roter Faden: Klarheit → Sichtbarkeit → Umsetzung → Energie halten.
- **Live:** GitHub Pages → `https://vronihei.github.io/Website/` (Domain-Umzug später möglich).

## 2. Was Vroni anbietet (Leistungen / „was wir können")

- **Personal Branding & Markenstrategie** — stimmige Übersetzung der Person, kein Kostüm.
- **Webdesign** (WordPress/Elementor) — strategisches System aus Marke, Inhalt, Struktur, Technik, Vertrauen.
- **KI-gestützte Website-Strategie & KI-Workflows** für Marketing/Content — KI als Werkzeug, nicht Ersatzhirn.
- **Yoga / Power Yoga / Nervensystem-Regulation / Holistic Performance** — Basis für nachhaltige Leistungsfähigkeit
  (Yoga-Kurse vor Ort über die VHS Brannenburg).

## 3. Tech-Stack & Infrastruktur

- **Frontend:** statisches HTML/CSS/JS (kein Framework). Seiten: `index.html`, `ueber-mich.html` (eigene CSS: `ueber-mich.css`), `impressum.html`, `datenschutz.html`, `barrierefreiheit.html`, `404.html`.
- **Hosting/Deploy:** GitHub Pages, Auto-Deploy von `main` (geschützt, PR-Pflicht).
- **Schriften:** **lokal** in `fonts/` (Figtree = Hauptschrift, Newsreader = `.g`-Akzente, Vaelia = nur Logo) — keine externe Font-CDN (Datenschutz).
- **Analytics:** **GoatCounter** cookielos, `count.js` **lokal** → kein Cookie-Banner (Site-Code `innerline`).
- **SEO/GEO:** Meta/OG/Twitter, JSON-LD (`FAQPage` + `Person`/`ProfessionalService`/`WebSite`), Sitemap, robots.txt.
- **CI (`.github/workflows/ci.yml`):** HTML-Validierung · interner Link-Check · Lighthouse · **Medien-Register-Check**.
- **Bildwelt:** KI-generiert (ChatGPT), als `<picture>` WebP + PNG-Fallback. Reproduktion: `brand/bildwelt-und-prompts.md`.

## 4. Wo steht was (Doku-Landkarte)

| Datei | Inhalt |
|---|---|
| `CLAUDE.md` | **Verbindliche Regeln** (Doku-/Font-/Medien-/Recht-Pflichten, Brand Voice, A11y) — zuerst lesen |
| `WORKFLOW.md` | Branch-/PR-/Sync-Prozess (kanonisch) |
| `PROTOKOLL.md` | **Historie & Invarianten** — Begründung jeder Änderung, „darf nicht rausfallen"-Liste |
| `MEDIEN.md` | **Bild-/Medienregister** — Herkunft, Varianten, Verwendung, Rechte, Änderungen pro Bild |
| `brand/bildwelt-und-prompts.md` | **Bildwelt & Prompts** — Masterprompt + Motiv-Prompts für neue Bilder |
| `ACCESSIBILITY_NOTES.md` | A11y-Notizen |
| `PROJECT.md` / `README.md` | Projekt-Notizen / Repo-Readme |
| `uploads/Vroni_Brand_Voice_2_0.md` | **Brand Voice** (Tonalität, Verbote, Anker-Sätze) — Basis für ALLE Texte |

## 5. Was ist gemacht (Meilensteine — Details in `PROTOKOLL.md`)

- Design-System & Hero („Bento"), Typo-System (Figtree/Newsreader), Sektionen auf Startseite.
- **Über-mich-Unterseite** (`ueber-mich.html` + `ueber-mich.css`, `.au-`-Klassen, 10 Sektionen, 8 neue Bilder) — PR #34, 2026-06-02.
- Recht: Impressum & Datenschutz (DDG/TDDDG-Stand), Barrierefreiheits-Seite.
- A11y-Grundlagen (Fokus, Labels, Heading-Struktur, reduzierte Motion).
- Analytics (GoatCounter, cookielos) live; kein Cookie-Banner nötig.
- Strukturierte Daten (Person/ProfessionalService/WebSite/FAQPage, JSON-LD).
- Datenhygiene (Repo entschlackt), Medienregister + CI-Guard, Bildwelt-Guide, Responsive Bilder (srcset 960px).
- Hygiene-Checkliste als feste Regel verankert — läuft nach jeder größeren Session.

## 6. Offene Punkte / Roadmap (Stand 2026-06-02)

- **Nav-Link** auf index.html: „Über mich" noch auf `#ueber` (Startseiten-Sektion) statt auf `ueber-mich.html` — kleines TODO.
- **Performance**: Core Web Vitals auf Live-URL messen (PageSpeed Insights), Lighthouse-Audit im Browser.
- **Echte Kundenstimmen** (Voices-Section auskommentiert) — wenn Vroni die Texte hat.
- **Texte**: Hero schärfen, Mini-Cases, Textpolish auf Startseite.
- **Später:** Domain-Umzug (Hostinger); ggf. Blog/Content → dann SEO-Struktur & evtl. leichtgewichtiges RAG erwägen.

## 7. Für KI-Content (Medien/Beiträge generieren)

Beste Grundlage = **diese Datei + `CLAUDE.md` (Brand Voice/Regeln) + `brand/bildwelt-und-prompts.md` (Bildstil)**
anhängen. Damit „weiß" eine KI Kontext, Tonalität, Können und Bildsprache, ohne separates RAG-System.

---

_Stand: 2026-06-02 (Hygiene-Update). Bei größeren Änderungen Stand-Datum und betroffene Abschnitte aktualisieren._
