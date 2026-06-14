# WISSEN · Projekt-Überblick & Wissens-Index · Vroni / InnerLine

> **Eine Datei, die auf alles zeigt.** Zweck: schneller Einstieg in den aktuellen Stand — und die Datei,
> die man einer KI **anhängt**, wenn neue Inhalte, Medien oder Beiträge im Stil/Kontext von InnerLine entstehen sollen.
> Schlanker, versionierter „RAG-Ersatz": kein eigenes System, sondern kuratierte Markdown-Doku.
>
> Pflege: bei größeren Änderungen kurz hier nachziehen (Stand-Datum unten). Details immer in den verlinkten Dateien.

---

## 1. Steckbrief

- **Wer:** Veronika Heidrich („Vroni"), Marke **InnerLine**. KI-gestützte **Brand- & Website-Strategin**.
- **Was ist die Seite:** Multi-Page Personal-Brand-Website + Rechtsseiten. Deutschsprachig.
- **Markenkern:** „Sichtbar werden, ohne dich zu verbiegen." Roter Faden: Klarheit → Sichtbarkeit → Umsetzung → Energie halten.
- **Live:** GitHub Pages → `https://vronihei.github.io/Website/` (Domain-Umzug später möglich).

## 2. Was Vroni anbietet (Leistungen)

- **Personal Branding & Markenstrategie** — stimmige Übersetzung der Person, kein Kostüm.
- **Webdesign** (WordPress/Elementor) — strategisches System aus Marke, Inhalt, Struktur, Technik, Vertrauen.
- **KI-gestützte Website-Strategie & KI-Workflows** für Marketing/Content — KI als Werkzeug, nicht Ersatzhirn.
- **Yoga / Power Yoga / Nervensystem-Regulation / Holistic Performance** — Basis für nachhaltige Leistungsfähigkeit
  (Yoga-Kurse vor Ort über die VHS Brannenburg).

## 3. Tech-Stack & Infrastruktur

- **Frontend:** statisches HTML/CSS/JS (kein Framework). Seiten:
  - `index.html` (Startseite / One-Pager-Hub)
  - `ueber-mich.html` (Über-mich-Unterseite)
  - `zusammenarbeit.html` (Angebots-/Zusammenarbeits-Seite)
  - `tools.html` (lokaler Tools-Hub, `noindex`)
  - `impressum.html`, `datenschutz.html`, `barrierefreiheit.html`, `404.html`
- **Hosting/Deploy:** GitHub Pages, Auto-Deploy von `main` (geschützt, PR-Pflicht).
- **Design-System:** Innerline Design System (globaler Master, Claude-Design-Projekt `5de8ecc5-5aa3-4530-bf46-37a0e7a1ddda`).
  Web-Optik (`tokens.css` + `style.css`) lebt im Repo; Strategie/Voice/Bildwelt kommen aus dem Master.
- **Schriften:** **lokal** in `fonts/` (Figtree, Newsreader, Vaelia, Open Sauce Sans) — keine externe Font-CDN.
- **Analytics:** **GoatCounter** cookielos, `count.js` **lokal** → kein Cookie-Banner (Site-Code `innerline`).
- **SEO/GEO:** Meta/OG/Twitter, JSON-LD (`FAQPage` + `Person`/`ProfessionalService`/`WebSite`), Sitemap, robots.txt.
- **CI (`.github/workflows/ci.yml`):** HTML-Validierung · interner Link-Check · Lighthouse Desktop + Mobile ·
  Design-Hygiene-Guard · **Medien-Register-Check** (blockiert PR wenn `images/` geändert ohne `MEDIEN.md`-Update).
- **Bildwelt:** KI-generiert (ChatGPT/DALL·E, V. Heidrich), als `<picture>` WebP + PNG-Fallback.
  Reproduktion: `brand/bildwelt-und-prompts.md`.
- **Lokales Tool:** `tools/pdf-maker/` — Express-Server (Port 3847), HTML/Markdown → PDF via Playwright +
  Ghostscript. Nur lokal, nie auf GitHub Pages deployed.

## 4. Wo steht was (Doku-Landkarte)

| Datei | Inhalt |
|---|---|
| `CLAUDE.md` | **Verbindliche Regeln** (Doku-/Font-/Medien-/Recht-Pflichten, Brand Voice, A11y, CSS-Regeln, Tools-Invarianten) — zuerst lesen |
| `WORKFLOW.md` | Branch-/PR-/Sync-Prozess (kanonisch) |
| `PROTOKOLL.md` | **Historie & Invarianten** — Begründung jeder Änderung, „darf nicht rausfallen"-Liste |
| `MEDIEN.md` | **Bild-/Medienregister** — Herkunft, Varianten, Verwendung, Rechte, Änderungen pro Bild |
| `brand/Vroni_Voice_5.0_KI_Quick_Brief.md` | **Brand Voice Quick Brief** — Basis für ALLE Texte (KI-freundlich kompakt) |
| `brand/Vroni_Brand_Voice_Blueprint_5.0_Master.md` | **Brand Voice Master 5.0** — vollständige Stimm-Referenz |
| `brand/Vroni_Brand_Foundation_2.1_Master.md` | **Strategie-Fundament 2.1** — Zielgruppe, Positionierung, Angebotsstrategie |
| `brand/bildwelt-und-prompts.md` | **Bildwelt & Prompts** — Masterprompt + Motiv-Prompts für neue Bilder |
| `brand/Vroni_Global_Brand_Source_Set_2.3.md` | Vollständiges Marken-Quell-Set 2.3 |
| `brand/archiv/` | Überholte Brand-Stände (Foundation 2.0, Voice 4.x) — nie als Arbeitsgrundlage |
| `WISSEN.md` | Diese Datei — schneller Einstieg, KI-Kontext |
| `PROJECT.md` | Ausführliche historische Wissensdatenbank (ADRs, Entscheidungsverläufe) |
| `ACCESSIBILITY_NOTES.md` | Technische A11y-Notizen (ergänzt `barrierefreiheit.html`) |
| `DESIGN-HYGIENE.md` | Erklärung der CSS-Single-Source-of-Truth-Architektur |

## 5. Was ist gemacht (Meilensteine)

Details in `PROTOKOLL.md`. Kurzübersicht:

| Meilenstein | Status | Ca. Datum |
|---|---|---|
| Grundstruktur HTML/CSS/JS, Design-System | ✅ | 2026-05-29 |
| Logo (Vaelia + NN-Ligatur), Hero, Typo | ✅ | 2026-05-30 |
| Über-mich-Unterseite + Timeline | ✅ | 2026-05-31 |
| PROTOKOLL.md, CI-Pipeline, Medien-Guard | ✅ | 2026-06-01 |
| Rechtstexte (DDG/TDDDG), Datenschutz, Impressum | ✅ | 2026-06-02 |
| Zusammenarbeit-Seite (Angebote, Ablauf, Kontakt) | ✅ | 2026-06-03 |
| JSON-LD, Sitemap, robots.txt, SEO/GEO-Struktur | ✅ | 2026-06-03 |
| GoatCounter-Analytics (cookielos, lokal) | ✅ | 2026-06-03 |
| Finaler Designschliff (PR #59 + Encoding-Fix #60) | ✅ | 2026-06-07 |
| Code-Audit, A11y-Audit, CSS-Cleanup (PR #61) | ✅ | 2026-06-07 |
| Designsystem-Anbindung an Innerline-Master (PR #64) | ✅ | 2026-06-14 |
| Brand-Dokumente auf Master-Stand (PR #65) | ✅ | 2026-06-14 |
| Tools-Hub + Login-Icon in Nav | ✅ | 2026-06-14 |
| PDF-Maker Tool lokal (PR #66) | ✅ | 2026-06-14 |
| 19 Reserve-Bilder in MEDIEN.md erfasst (PR #67) | ✅ | 2026-06-14 |

## 6. Offene Punkte / Roadmap (Stand 2026-06-14)

- **Texte / Content** (Prio): Hero schärfen, Proof-Strip, Mini-Cases/Referenzen, echte Kundenstimmen einpflegen.
- **Bilder** einbinden: 19 Reserve-Bildgruppen in `images/` liegen bereit (`MEDIEN.md` Abschnitt 3c) — bei Bedarf in HTML einbauen.
- **Performance**: Hero-LCP messen, ggf. `<link rel="preload">` für Hero-Bild.
- **Domain-Umzug**: GitHub Pages → eigene Domain (Datenschutz: Hosting-Abschnitt dann anpassen).
- **Favicon**: aktuell nur `favicon.svg` — ggf. `.ico` + `apple-touch-icon` ergänzen.
- **Kundenstimmen**: `.voices`-Block im HTML/CSS auskommentiert bis echter Content vorliegt.

## 7. Für KI-Content (Medien/Beiträge/Texte generieren)

Beste Grundlage = **diese Datei** + `brand/Vroni_Voice_5.0_KI_Quick_Brief.md` (Stimme) +
`brand/Vroni_Brand_Foundation_2.1_KI_Kurzbriefing.md` (Strategie) + `brand/bildwelt-und-prompts.md` (Bildstil)
anhängen. Damit „weiß" eine KI Kontext, Tonalität, Können und Bildsprache ohne separates RAG-System.

---

_Stand: 2026-06-14. Bei größeren Änderungen Stand-Datum und betroffene Abschnitte aktualisieren._
