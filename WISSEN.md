# WISSEN · Projekt-Überblick & Wissens-Index · Vroni / InnerLine

> **Eine Datei, die auf alles zeigt.** Zweck: schneller Einstieg in den aktuellen Stand — und die Datei,
> die man einer KI **anhängt**, wenn neue Inhalte, Medien oder Beiträge im Stil/Kontext von InnerLine entstehen sollen.
> Schlanker, versionierter „RAG-Ersatz": kein eigenes System, sondern kuratierte Markdown-Doku.
>
> Pflege: bei jeder größeren Änderung `/wissen-update` aufrufen — oder Stand-Datum und betroffene Abschnitte manuell nachziehen.

---

## 1. Steckbrief

- **Wer:** Veronika Heidrich („Vroni"), Marke **InnerLine**. KI-gestützte **Brand- & Website-Strategin**.
- **Was ist die Seite:** Multi-Page Personal-Brand-Website. Deutschsprachig.
- **Markenkern:** „Sichtbar werden, ohne dich zu verbiegen." Roter Faden: Klarheit → Sichtbarkeit → Umsetzung → Energie halten.
- **Live:** GitHub Pages → `https://vronihei.github.io/Website/` (Domain-Umzug geplant).

## 2. Was Vroni anbietet (Leistungen)

- **Personal Branding & Markenstrategie** — stimmige Übersetzung der Person, kein Kostüm.
- **Webdesign** (WordPress/Elementor) — strategisches System aus Marke, Inhalt, Struktur, Technik, Vertrauen.
- **KI-gestützte Website-Strategie & KI-Workflows** für Marketing/Content — KI als Werkzeug, nicht Ersatzhirn.
- **Yoga / Power Yoga / Nervensystem-Regulation / Holistic Performance** — Basis für nachhaltige Leistungsfähigkeit (Kurse vor Ort über VHS Brannenburg).

## 3. Tech-Stack & Infrastruktur

- **Frontend:** statisches HTML/CSS/JS (kein Framework).
- **Seiten (indexiert):** `index.html` · `ueber-mich.html` · `zusammenarbeit.html` · `impressum.html` · `datenschutz.html` · `barrierefreiheit.html` · `404.html`
- **Seiten (nicht indexiert):** `Designsystem.html` (internes Komponenten-Board) · `tools.html` (lokaler Tools-Hub, noindex + robots Disallow)
- **Hosting/Deploy:** GitHub Pages, Auto-Deploy von `main` (geschützt, PR-Pflicht, ~1–2 min).
- **Designsystem:** Innerline Design System (Claude-Design-Projekt `5de8ecc5-5aa3-4530-bf46-37a0e7a1ddda`). Tokens/Komponenten im Repo (`tokens.css`, `style.css`); Strategie/Voice/Bildwelt aus dem Master.
- **Schriften:** **lokal** in `fonts/` — Figtree (Variable, 300–700), Newsreader (Italic), Open Sauce Sans, Vaelia (Logo-NN-Ligatur). Keine externe Font-CDN.
- **Analytics:** GoatCounter cookielos, `count.js` lokal → kein Cookie-Banner (Site-Code `innerline`).
- **SEO/GEO:** Meta/OG/Twitter, JSON-LD (`FAQPage` + `Person`/`ProfessionalService`/`WebSite`), `sitemap.xml`, `robots.txt`.
- **CI (`.github/workflows/ci.yml`):** HTML-Validierung (alle 8 Seiten) · interner Link-Check · Lighthouse (Desktop + Mobile) · Design-Hygiene · **Medien-Register-Check**.
- **Lokale Tools:** PDF Maker (`tools/pdf-maker/`, Port 3847) — nie auf GitHub Pages. Nav-Login-Icon verlinkt auf `localhost:3847/login` (live absichtlich tot).
- **Bildwelt:** KI-generiert (ChatGPT/DALL·E, V. Heidrich), als `<picture>` WebP + PNG-Fallback. 19 Reserve-Bilder in `images/` (noch nicht eingebunden). Stil-Guide: `brand/bildwelt-und-prompts.md`.
- **Custom Commands (`.claude/commands/`):** `/protokoll` · `/handoff` · `/encoding-check` · `/neue-seite` · `/medien-neu` · `/voice-check` · `/a11y-check` · `/learnings-review` · `/wissen-update`.

## 4. Wo steht was (Doku-Landkarte)

| Datei | Inhalt |
|---|---|
| `CLAUDE.md` | **Verbindliche Regeln** (Doku-/Font-/Medien-/Recht-Pflichten, Brand Voice, A11y) — zuerst lesen |
| `WORKFLOW.md` | Branch-/PR-/Sync-Prozess (kanonisch) |
| `PROTOKOLL.md` | **Historie & Invarianten** — Begründung jeder Änderung, „darf nicht rausfallen"-Liste |
| `LEARNINGS.md` | **Destillat** — 10 nicht-offensichtliche Erkenntnisse; aktiv nutzbar via `/learnings-review` |
| `MEDIEN.md` | **Bild-/Medienregister** — Herkunft, Varianten, Verwendung, Rechte, Änderungen pro Bild |
| `brand/Vroni_Voice_5.0_KI_Quick_Brief.md` | **Brand Voice KI-Brief** — kompakte Arbeitsanweisung, Human-Edit-Check, Ampelsystem |
| `brand/Vroni_Brand_Voice_Blueprint_5.0_Master.md` | **Brand Voice Master** — vollständiger Blueprint (Voice 5.0) |
| `brand/Vroni_Brand_Foundation_2.1_Master.md` | **Brand Foundation** — Positionierung, Zielgruppe, Kern-Anker |
| `brand/bildwelt-und-prompts.md` | **Bildwelt & Prompts** — Masterprompt + Motiv-Prompts für neue Bilder |
| `ACCESSIBILITY_NOTES.md` | A11y-Prüfprotokoll + offene Punkte |
| `PROJECT.md` | Historisch (Stand 2026-06-02, nicht mehr aktiv gepflegt) |

## 5. Meilensteine (Details in `PROTOKOLL.md`)

| Stand | Was |
|---|---|
| 2026-05-31 | Projekt-Start: Hero, Typo-System (Figtree/Newsreader), erste Sektionen |
| 2026-06-01 | Fundament: Rechtstexte, A11y-Grundlagen, GoatCounter, CI-Gates, Fonts lokal |
| 2026-06-02 | Medienregister + CI-Guard, Bildwelt-Guide, Strukturierte Daten, Über-mich v2 |
| 2026-06-03 | Designsystem + Tokens, Brand Foundation 2.1 + Voice 4→5.0 |
| 2026-06-05 | Zusammenarbeit-Seite neu, Nav-Update |
| 2026-06-06 | Zusammenarbeit v9: vollständiges Redesign + Voice-Refresh |
| 2026-06-07 | Briefing-Gesamtcheck (alle 3 Seiten), A11y-Audit, kritischer Encoding-Fix (PR #60), Full-Audit-Cleanup (PR #61) |
| 2026-06-14 | Designsystem-Anbindung Innerline-Master, PDF-Maker, Tools-Hub, 19 Reserve-Bilder, Learnings-System (LEARNINGS.md + 8 Commands) |

## 6. Offene Punkte / Roadmap

- **Kundenstimmen** (Prio): Echte Testimonials eintragen — Section in `index.html` ist auskommentiert (Platzhalter entfernt).
- **Reserve-Bilder einbinden**: 19 KI-generierte Bilder in `images/` bereit, noch in keiner HTML-Seite eingesetzt.
- **Performance**: PNG-Optimierung, exakte Core Web Vitals, Hero-LCP messen.
- **Content-Pass**: Hero-Text schärfen, Proof-Strip, Mini-Cases.
- **Domain**: Umzug von GitHub Pages auf eigene Domain (Hostinger oder ähnlich) geplant.
- **PDF-Maker Deployment**: Entscheidung ob/wie auf echtem Server deployen (Render.com, Railway, VPS).

## 7. Für KI-Content-Arbeit

Anhängen für eine neue KI-Session:
1. **Diese Datei** (Kontext + Überblick)
2. **`CLAUDE.md`** (Regeln, Brand Voice, Pflichten)
3. **`brand/Vroni_Voice_5.0_KI_Quick_Brief.md`** (Ton, Verboten-Liste, Human-Edit-Check)
4. **`brand/bildwelt-und-prompts.md`** (Bildstil + Prompts) — nur wenn Bilder Thema sind
5. **`LEARNINGS.md`** (nicht-offensichtliche Fallstricke) — empfohlen

Damit „weiß" eine KI Kontext, Tonalität, Können und Bildsprache ohne separates RAG-System.

---

_Stand: 2026-06-14 — aktuell. Update via `/wissen-update`._
