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

- **Frontend:** statisches HTML/CSS/JS (kein Framework). Seiten: `index.html`, `impressum.html`,
  `datenschutz.html`, `barrierefreiheit.html`, `404.html`.
- **Hosting/Deploy:** GitHub Pages, Auto-Deploy von `main` (geschützt, PR-Pflicht).
- **Schriften:** **lokal** in `fonts/` (Figtree, Newsreader, Vaelia) — keine externe Font-CDN (Datenschutz).
- **Analytics:** **GoatCounter** cookielos, `count.js` **lokal** → kein Cookie-Banner (Site-Code `innerline`).
- **SEO/GEO:** Meta/OG/Twitter, JSON-LD (`FAQPage` + `Person`/`ProfessionalService`/`WebSite`), Sitemap, robots.txt.
- **CI (`.github/workflows/ci.yml`):** HTML-Validierung · interner Link-Check · Lighthouse · **Medien-Register-Check**.
- **Bildwelt:** KI-generiert (ChatGPT), als `<picture>` WebP + PNG-Fallback. Reproduktion: `brand/bildwelt-und-prompts.md`.
- **Custom Commands (`.claude/commands/`):** `/protokoll` · `/handoff` · `/encoding-check` · `/neue-seite` · `/medien-neu` · `/voice-check` · `/a11y-check` · `/learnings-review`.

## 4. Wo steht was (Doku-Landkarte)

| Datei | Inhalt |
|---|---|
| `CLAUDE.md` | **Verbindliche Regeln** (Doku-/Font-/Medien-/Recht-Pflichten, Brand Voice, A11y) — zuerst lesen |
| `WORKFLOW.md` | Branch-/PR-/Sync-Prozess (kanonisch) |
| `PROTOKOLL.md` | **Historie & Invarianten** — Begründung jeder Änderung, „darf nicht rausfallen"-Liste |
| `LEARNINGS.md` | **Destillat** — Top-10 nicht-offensichtliche Erkenntnisse; wird aktiv bei `/learnings-review` genutzt |
| `MEDIEN.md` | **Bild-/Medienregister** — Herkunft, Varianten, Verwendung, Rechte, Änderungen pro Bild |
| `brand/bildwelt-und-prompts.md` | **Bildwelt & Prompts** — Masterprompt + Motiv-Prompts für neue Bilder |
| `brand/Vroni_Voice_5.0_KI_Quick_Brief.md` | **Brand Voice KI-Brief** — kompakte Arbeitsanweisung, Human-Edit-Check, Ampelsystem |
| `brand/Vroni_Brand_Voice_Blueprint_5.0_Master.md` | **Brand Voice Master** — vollständiger Blueprint (Voice 5.0) |
| `ACCESSIBILITY_NOTES.md` | A11y-Notizen |
| `PROJECT.md` / `README.md` | Projekt-Notizen / Repo-Readme (PROJECT.md: Stand 2026-06-02, historisch) |

## 5. Was ist gemacht (Meilensteine — Details in `PROTOKOLL.md`)

- Design-System & Hero („Bento"), Typo-System (Figtree/Newsreader), Sektionen.
- Recht: Impressum & Datenschutz (DDG/TDDDG-Stand), Barrierefreiheits-Seite.
- A11y-Grundlagen (Fokus, Labels, Heading-Struktur, reduzierte Motion).
- Analytics (GoatCounter, cookielos) live.
- Datenhygiene (Repo entschlackt), strukturierte Daten, Medienregister + CI-Guard, Bildwelt-Guide.

## 6. Offene Punkte / Roadmap (Stand 2026-06-02)

- **Performance** (Prio): PNG-Optimierung, exakte Core Web Vitals messen, Hero-LCP.
- **Texte** (mit Vroni): Hero schärfen, Proof-Strip, Über-mich als Vertrauensseite, Mini-Cases, Textpolish.
- **Später:** Domain-Umzug; ggf. Blog/Content → dann SEO-Struktur & evtl. leichtgewichtiges RAG erwägen.

## 7. Für KI-Content (Medien/Beiträge generieren)

Beste Grundlage = **diese Datei + `CLAUDE.md` (Brand Voice/Regeln) + `brand/bildwelt-und-prompts.md` (Bildstil)**
anhängen. Damit „weiß" eine KI Kontext, Tonalität, Können und Bildsprache, ohne separates RAG-System.

---

_Stand: 2026-06-02. Bei größeren Änderungen Stand-Datum und betroffene Abschnitte aktualisieren._
