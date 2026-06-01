# PROJECT.md — Zentrale Wissensdatenbank

> **Zweck:** Dieses Dokument ist das lebendige Gedächtnis des Projekts.
> Es dokumentiert nicht nur Was und Wie — sondern immer auch Warum, Welche Alternativen es gab, Was funktioniert hat und Was nicht.
> Jede Entscheidung, jede Erkenntnis, jede Denkrichtung wird hier festgehalten.
> Ziel: Mit diesem Wissen jederzeit das bestmögliche Ergebnis erzielen.

---

## Inhaltsverzeichnis

1. [Projektvision & Ziele](#1-projektvision--ziele)
2. [Aktueller Status](#2-aktueller-status)
3. [Technologie-Stack](#3-technologie-stack)
4. [Projektstruktur](#4-projektstruktur)
5. [Architekturentscheidungen (ADRs)](#5-architekturentscheidungen-adrs)
6. [Projektverlauf & Changelog](#6-projektverlauf--changelog)
7. [Learnings & Retrospektiven](#7-learnings--retrospektiven)
8. [Offene Fragen & Abwägungen](#8-offene-fragen--abwägungen)
9. [Bekannte Probleme & Lösungen](#9-bekannte-probleme--lösungen)
10. [Wissen, Konventionen & Muster](#10-wissen-konventionen--muster)
11. [Referenzen & Ressourcen](#11-referenzen--ressourcen)

---

## 1. Projektvision & Ziele

> Der Nordstern: Wofür bauen wir das? Was soll am Ende existieren?

| Feld              | Wert                              |
|-------------------|-----------------------------------|
| Projektname       | Website InnerLine / Veronika Heidrich |
| Vision            | Professionelle Personal-Website als Brand- & Website-Strategin, Yoga-Lehrerin und KI-Expertin |
| Zielgruppe        | Selbstständige, Kreative, Coaches — Menschen mit vielen Themen und fehlendem roten Faden |
| Kernanforderungen | Fresh Organic Hybrid Design, Mobile-First, Kontaktformular, GitHub Pages, Vaelia-Wortmarke |
| Erfolgskriterien  | Responsive auf allen Geräten, professioneller Auftritt, funktionierender Kontaktweg, WCAG 2.1 AA |
| Deadline          | _(laufend)_                       |
| Verantwortlich    | Veronika Heidrich (VroniHei)      |
| Gestartet         | 2026-05-29                        |

### Was soll dieses Projekt leisten?

Eine professionelle Personal-Website für Veronika Heidrich als Brand- & Website-Strategin, KI-Expertin und Yoga-Lehrerin. Markenkern: „Sichtbar werden, ohne dich zu verbiegen." Die Seite präsentiert vier Angebotsbereiche (Personal Branding, Webdesign, KI-Workflows, Yoga & Bewegung), weckt Vertrauen durch Kundenstimmen und ermöglicht direkten Kontakt per E-Mail (info@veronika-heidrich.de).

### Was soll es ausdrücklich NICHT leisten?

Kein Online-Shop, kein CMS, keine Backend-Logik — bewusst schlank gehalten (Plain HTML/CSS/JS + GitHub Pages).

---

## 2. Aktueller Status

**Phase:** `Aktive Entwicklung / Iterativer Feinschliff via Claude Design`
**Gesamtfortschritt:** ▓▓▓▓▓▓▓▓░░ 82%

| Meilenstein                           | Status        | Datum      |
|---------------------------------------|---------------|------------|
| Entwicklungsumgebung aufsetzen        | ✅ Fertig     | 2026-05-29 |
| Skills installieren                   | ✅ Fertig     | 2026-05-29 |
| Wissensdatenbank aufbauen             | ✅ Fertig     | 2026-05-29 |
| Projektziel & Anforderungen           | ✅ Fertig     | 2026-05-29 |
| Technologie-Stack entscheiden         | ✅ Fertig     | 2026-05-29 |
| Website-Grundstruktur (HTML/CSS)      | ✅ Fertig     | 2026-05-29 |
| Kontaktformular (mailto)              | ✅ Fertig     | 2026-05-29 |
| Design-System (Fresh Organic Hybrid)  | ✅ Fertig     | 2026-05-30 |
| Echte Bilder & Vaelia-Font eingebunden| ✅ Fertig     | 2026-05-30 |
| Logo-System (Vaelia + NN-Ligatur)     | ✅ Fertig     | 2026-05-31 |
| Über-mich-Redesign + Timeline         | ✅ Fertig     | 2026-05-31 |
| Mobile-Optimierung (order:-1, Burger) | ✅ Fertig     | 2026-05-31 |
| PROTOKOLL.md (Regressions-Schutz)     | ✅ Fertig     | 2026-05-31 |
| Deployment auf GitHub Pages           | ✅ Fertig     | laufend    |
| FAQ-Section (SEO/GEO)                 | ⏳ Ausstehend | —          |
| Eigene Über-mich-Unterseite           | ⏳ Ausstehend | —          |
| SEO-Meta-Tags (og:*, description)     | ⏳ Ausstehend | —          |
| A11y-Audit (WCAG 2.1 AA)              | ⏳ Ausstehend | —          |

### Aktuelle Sprint-Aufgaben

- [ ] FAQ-Section (Accordion, gut für SEO/GEO)
- [ ] SEO-Meta-Tags prüfen (title, description, og:*)
- [ ] A11y-Audit: Kontraste, Fokus, Touch-Targets ≥44px
- [ ] Über-mich-Unterseite ausbauen (ausführliche Story)

---

## 3. Technologie-Stack

> Status-Legende (nach ThoughtWorks Tech Radar Methode):
> - **Adopt** — Bewährt, einsetzen
> - **Trial** — Vielversprechend, ausprobieren
> - **Assess** — Beobachten, noch nicht einsetzen
> - **Hold** — Vorerst nicht nutzen

| Bereich         | Technologie           | Version    | Status   | Begründung                              |
|-----------------|-----------------------|------------|----------|-----------------------------------------|
| Runtime         | Node.js (nvm)         | v24.16.0   | Adopt    | Stabil, LTS, via nvm flexibel verwaltbar |
| Package Mgr     | npm                   | 11.13.0    | Adopt    | Standard, mit Node.js mitgeliefert      |
| Framework       | Plain HTML/CSS/JS     | —          | Adopt    | Kein Framework nötig → ADR-002          |
| Styling         | Plain CSS             | —          | Adopt    | Volle Kontrolle, keine Build-Pipeline   |
| Deployment      | GitHub Pages          | —          | Adopt    | Kostenlos, direkt aus Branch `main`     |
| Kontakt         | mailto-Link           | —          | Adopt    | Serverlos, öffnet Mail-Client           |
| Schrift (Text)  | Open Sauce Sans       | via CDN    | Adopt    | Humanistisch-rund, ruhige Wirkung       |
| Schrift (Logo)  | Vaelia (lokal)        | —          | Adopt    | Organische Versalien, NN-Ligatur, nur Display |
| Design-Atelier  | Claude Design         | —          | Adopt    | Visuelle Iterationen, Export via Handoff → ADR-004 |
| Design-System   | Fresh Organic Hybrid  | —          | Adopt    | Chalk/Sand/Green/Sage/Clay Palette → ADR-005 |

---

## 4. Projektstruktur

```
Website/
├── index.html                          ← One-Page-Website (Haupt-Deliverable)
├── style.css                           ← Alle Styles inkl. Mobile/Responsive
├── script.js                           ← Interaktivität (Menü, Scroll-Reveal, mailto)
├── image-slot.js                       ← Bild-Slot-Verwaltung (Claude Design Kompatibilität)
├── Designsystem.html                   ← Lebendiges Komponenten-Board (aus Claude Design)
├── PROJECT.md                          ← Diese Wissensdatenbank (Claude Code)
├── PROTOKOLL.md                        ← Regressions-Schutz & Änderungsprotokoll (Claude Design)
├── CLAUDE.md                           ← Arbeitsregeln für Claude (Brand Voice, A11y, Sync)
├── README.md                           ← Projektbeschreibung
├── skills-lock.json                    ← Installierte Skills (versioniert)
├── images/
│   ├── hero-visual.png                 ← Hero-Bild (Arbeitsplatz/Naturlicht)
│   ├── about-workspace.png             ← Über-mich Hauptbild
│   ├── about-weg.png                   ← Über-mich versetztes Bild (Bergweg)
│   ├── zitat-weg.png                   ← Zitat-Band Hintergrund
│   └── footer-weg.png                  ← Footer-Hintergrund
├── fonts/
│   ├── Vaelia.woff2                    ← Wortmarke-Font (primär)
│   └── Vaelia.woff                     ← Wortmarke-Font (Fallback)
├── Screenshots Arbeitsdateien/         ← Design-Referenzmaterial
├── .agents/
│   └── skills/
│       └── frontend-design/            ← Frontend-Design-Skill (Anthropic)
└── .claude/
    └── skills/
        └── ui-ux-pro-max/              ← UI/UX Pro Max Skill
```

_Wird bei jeder Strukturänderung aktualisiert._

---

## 5. Architekturentscheidungen (ADRs)

> Jede wichtige Entscheidung wird hier festgehalten — mit Kontext, Optionen, Abwägung und Konsequenzen.
> ADRs werden **nie gelöscht**, nur als `Superseded` markiert und durch neue ersetzt.
> Format basiert auf dem Standard von Michael Nygard (empfohlen von AWS, Google, Microsoft).

---

### ADR-001 — Node.js via nvm installieren

**Status:** `Accepted` — 2026-05-29

**Kontext:**
`npx` war nicht verfügbar. Node.js musste installiert werden. Mehrere Installationswege standen zur Auswahl.

**Betrachtete Optionen:**

| Option               | Pro                                      | Contra                                      |
|----------------------|------------------------------------------|---------------------------------------------|
| nvm (gewählt)        | Versionswechsel einfach, kein sudo nötig | Manuelle PATH-Konfiguration in `.zshrc`     |
| Homebrew + Node      | Einfache Installation                    | Homebrew nicht installiert, extra Schritt   |
| Direktinstallation   | Simpel                                   | Keine Versionsverwaltung, schwer zu updaten |
| Volta                | Automatisches Versions-Switching         | Weniger verbreitet, extra Tool              |

**Entscheidung:**
nvm v0.39.7 + Node.js v24.16.0 (LTS)

**Konsequenzen:**
- ✅ Flexibel: Jederzeit andere Node-Version aktivierbar
- ✅ Kein Root-Zugriff nötig
- ⚠️ Jede neue Shell-Session braucht nvm im PATH (gelöst via `.zshrc`)
- ⚠️ Neue Terminal-Sessions müssen einmal neu gestartet werden nach Installation

---

### ADR-002 — Framework-Entscheidung

**Status:** `Accepted` — 2026-05-29

**Kontext:**
Die Website ist eine Personal-Site für eine Yoga-Lehrerin. Keine komplexe Daten-Logik, kein CMS, keine dynamischen Routen. Die Entscheidung fiel früh auf das einfachste mögliche Setup.

**Betrachtete Optionen:**

| Option        | Ideal für                          | Pro                                    | Contra                                  |
|---------------|------------------------------------|----------------------------------------|-----------------------------------------|
| Next.js       | Fullstack, SEO-kritisch, komplex   | SSR/SSG, großes Ökosystem, Vercel-Fit  | Größerer Overhead für eine einfache Site |
| Astro         | Content-Sites, Portfolios, Blogs   | Extrem schnell, wenig JS by default    | Noch ein Build-Tool für eine HTML-Seite |
| React + Vite  | SPAs, interaktive Apps             | Maximale Flexibilität                  | Zu viel Overhead, keine SSR nötig      |
| **Plain HTML/CSS** | Landing Pages, Personal Sites | Zero Dependencies, maximale Kontrolle, direkt auf GitHub Pages deployen | Keine Komponenten-Wiederverwendung |
| Vue / Nuxt    | Ähnlich React/Next, anderer DX     | Sanftere Lernkurve                     | Kleineres Ökosystem als React           |

**Entscheidung:** Plain HTML + CSS + Vanilla JS. Die Seite ist eine One-Page-Website ohne Backend-Anforderungen. Jedes Framework wäre Over-Engineering.

**Konsequenzen:**
- ✅ Zero Dependencies, kein Build-Step, kein Node-Server nötig
- ✅ Direkt auf GitHub Pages deploybar (statische Dateien)
- ✅ Maximale Kontrolle über jeden CSS-Pixel
- ⚠️ Kein Komponenten-System — CSS und JS manuell strukturieren

---

### ADR-003 — Skills als Design-Intelligenz

**Status:** `Accepted` — 2026-05-29

**Kontext:**
Für professionelle UI/UX-Ergebnisse braucht Claude strukturiertes Design-Wissen. Zwei Skills wurden evaluiert.

**Betrachtete Optionen:**

| Option                     | Pro                                           | Contra                              |
|---------------------------|-----------------------------------------------|-------------------------------------|
| frontend-design (Anthropic) | Etabliert, starke ästhetische Prinzipien    | Weniger datengetrieben              |
| ui-ux-pro-max              | 161 Regeln, 67 Styles, 15 Stacks, Datenbank  | Drittanbieter, neueres Tool         |
| Kein Skill                 | Keine Abhängigkeit                            | Generischere Ergebnisse             |

**Entscheidung:**
Beide Skills installiert. Sie ergänzen sich: `frontend-design` für kreative Richtung, `ui-ux-pro-max` für datenbasierte Design-Systeme.

**Konsequenzen:**
- ✅ Maximale Design-Intelligenz durch Kombination
- ✅ 161 Industry-Reasoning-Regeln, 161 Farbpaletten, 57 Schriftpaarungen verfügbar
- ⚠️ Python 3.x Abhängigkeit für `ui-ux-pro-max` Scripts (vorhanden: Python 3.9.6)

---

### ADR-004 — Claude Design als paralleles Design-Atelier

**Status:** `Accepted` — 2026-05-30

**Kontext:**
Das visuelle Design der Website sollte iterativ und ohne Build-Pipeline weiterentwickelt werden. Claude Design (claude.ai/design) bietet einen visuellen Prototyping-Workspace, der nahtlos mit Claude Code integriert werden kann.

**Betrachtete Optionen:**

| Option                 | Pro                                             | Contra                                       |
|------------------------|--------------------------------------------------|----------------------------------------------|
| Claude Design (gewählt)| Visuell iterativ, Handoff-Export, kein Setup     | Export-URL läuft ab, Share-Link ≠ Export-URL |
| Figma + Handoff        | Professionell, Versionskontrolle                 | Overhead für eine One-Person-Site             |
| Direkt in Code         | Schnell für kleine Änderungen                    | Kein visuelles Preview ohne Browser           |

**Entscheidung:**
Claude Design als Design-Atelier, Claude Code als Produktions-Repo. Änderungsfluss: Design-Iteration → Export → Handoff-Bundle (API-URL) → Claude Code implementiert.

**Konsequenzen:**
- ✅ Schnelle visuelle Iteration ohne Build-Pipeline
- ✅ Handoff-Bundle enthält alle Assets (HTML, CSS, Bilder, Fonts)
- ⚠️ Export-URL (`api.anthropic.com/v1/design/h/[HASH]`) läuft ab — immer neu exportieren
- ⚠️ Share-URL (`claude.ai/design/p/[UUID]`) funktioniert NICHT für Handoff — braucht Auth
- ⚠️ Zwei parallele Dokumente: `PROJECT.md` (Claude Code) + `PROTOKOLL.md` (Claude Design)

---

### ADR-005 — Design-System „Fresh Organic Hybrid"

**Status:** `Accepted` — 2026-05-30

**Kontext:**
Nach mehreren Designrichtungen (Editorial, Calm Modernism, Bold Signal) und Farbvarianten (Frisch, Erdig, Hybrid) wurde eine finale Palette definiert.

**Entscheidung:**
Fresh Organic Hybrid — hell, frisch, organisch, strategisch.

**Farbpalette:**
| Rolle            | Variable         | Hex       | Einsatz                          |
|------------------|------------------|-----------|----------------------------------|
| Hintergrund      | `--chalk`        | `#F8F5EE` | Dominant (~60%)                  |
| Surface          | `--sand`         | `#EFEADD` | Karten, Sektionen                |
| Text             | `--ink`          | `#23221A` | Fließtext, Headlines             |
| Dunkel-Kontrast  | `--forest`       | `#2C3522` | Ansatz, Kontakt, Footer          |
| Hauptakzent      | `--green`        | `#A8E84F` | CTAs, Dots, Highlights           |
| Organische Erdung| `--sage`         | `#9BA383` | Webdesign-Karte, Sekundär        |
| Wärme            | `--clay`         | `#CD8A5B` | Yoga-Karte, Byline, Timeline     |
| Tertiär (sparsam)| `--lilac`        | `#CBBEF4` | Nur punktuelle Akzente           |

**Typografie:** Open Sauce Sans (Text) + Vaelia (nur Wortmarke „innerline")

**Konsequenzen:**
- ✅ Konsistente Markensprache über alle Sektionen
- ✅ Barrierefreiheits-Kandidaten dokumentiert (`green-deep` auf Weiß = 3.3:1 → nicht für Kleintext)
- ⚠️ Vaelia = nur Display/Wortmarke, NIEMALS für Fließtext oder Überschriften

---

### ADR-006 — Branch-Konsolidierung: `main` als einzige Quelle der Wahrheit

**Status:** `Accepted` — 2026-06-01

**Kontext:**
Bisher liefen mehrere Branches parallel: Produktion auf `gh-pages`, Features auf eigenen Branches (`technical-polish`, `accessibility` u. a.). Das erzeugte Sync-Aufwand, Risiko für Divergenz und Unklarheit, welcher Stand „der echte" ist. GitHub Pages publizierte aus `gh-pages`, was einen zusätzlichen Merge-Schritt erforderte.

**Betrachtete Optionen:**

| Option                          | Pro                                              | Contra                                       |
|---------------------------------|--------------------------------------------------|----------------------------------------------|
| **`main` als einzige Quelle** (gewählt) | Ein Stand, kein Merge-Overhead, Pages direkt aus `main` | Direkter Push auf `main` braucht Disziplin   |
| `gh-pages` als Produktion behalten | Trennung Quelle/Veröffentlichung               | Doppelte Pflege, ständiger Sync, Divergenzrisiko |
| GitHub Actions Build-Workflow   | Automatisierbar, Checks vor Deploy               | Over-Engineering für reine statische Dateien |

**Entscheidung:**
Alle Branches in `main` konsolidiert. `main` enthält den kompletten aktuellen Website-Stand und ist die einzige Quelle der Wahrheit. GitHub Pages publiziert **direkt aus `main`** (Settings: Branch `main`, Ordner `/root`). Der `gh-pages`-Branch und der separate Deploy-/Build-Workflow entfallen.

**Konsequenzen:**
- ✅ Ein einziger maßgeblicher Stand — kein „welcher Branch gilt?" mehr
- ✅ Push auf `main` = automatisches Deployment (~1–2 min), kein Merge-Schritt
- ✅ Kein `gh-pages`-Branch, keine Build-Pipeline zu warten
- ⚠️ Änderungen landen direkt live — vor jedem Push Invarianten (`PROTOKOLL.md`) prüfen
- ⚠️ Supersedes die frühere Annahme „Produktion = `gh-pages`" (ADR-003-Kontext, ADR-002-Konsequenzen)

---

### ADR-007 — Trunk-Based-Workflow mit kurzlebigen Branches & Pull Requests

**Status:** `Accepted` — 2026-06-01

**Kontext:**
Drei Bearbeitungswege (Claude Code, VS Code/Copilot, Claude Design) greifen auf dieselben
Dateien zu. Push auf `main` = sofort live (GitHub Pages). Veronika arbeitet primär nicht-technisch
und wünscht maximale Sicherheit, Nachvollziehbarkeit und Reproduzierbarkeit, ohne selbst Git-Mechanik
beherrschen zu müssen. Risiken: gegenseitiges Überschreiben, veralteter Stand, still überschriebene
Code-Fixes durch Design-Handoffs, versehentlicher Force-Push auf `main`.

**Betrachtete Optionen:**

| Option | Pro | Contra |
|--------|-----|--------|
| Direkt-Commits auf `main` (bisher) | Maximal einfach, kein Overhead | Push = ungeprüft live; kein Diff-Gate; kein einfacher Revert; Force-Push-Risiko |
| **Trunk-Based + kurzlebige Branches + PRs** (gewählt) | Diff-Vorschau vor Live, 1-Klick-Revert, PR = dokumentierte Einheit, `main` schützbar; Git-Aufwand trägt Claude Code | Minimal mehr Schritte (von Claude automatisiert) |
| GitFlow (develop/release/hotfix) | Sehr strukturiert | Schwergewichtig, Overkill für Solo + statische Site |

**Entscheidung:**
Leichtgewichtiger **Trunk-Based-Workflow**: `main` bleibt die einzige dauerhafte Quelle der
Wahrheit (ADR-006), aber jede inhaltliche Änderung läuft über einen **kurzlebigen Branch + Pull
Request** und wird per Squash-Merge in `main` integriert. `main` wird auf GitHub geschützt
(PR-Pflicht, kein Force-Push, keine Löschung). Prozess kanonisch in **`WORKFLOW.md`**, referenziert
aus `CLAUDE.md`, `.github/copilot-instructions.md` und `PROTOKOLL.md`.

**Konsequenzen:**
- ✅ Jede Änderung ist vor dem Livegang als Diff sichtbar → kein stilles Überschreiben/Löschen
- ✅ Atomare, reversible Einheiten (Revert je PR); lückenlose Nachvollziehbarkeit (PR + `PROTOKOLL.md`)
- ✅ Git-Komplexität liegt bei Claude Code; Veronikas Part = PR prüfen + mergen
- ✅ Design-Handoffs laufen über `design/*`-Branch → Handoff-Checkliste schützt Code-Fixes
- ⚠️ Branch-Protection muss einmalig in den GitHub-Repo-Settings aktiviert werden (manueller Schritt)
- ⚠️ Verfeinert ADR-006 (Single-`main`), widerspricht ihm nicht: Feature-Branches sind temporär

---

_Neue ADRs werden mit aufsteigender Nummer hinzugefügt._

---

## 6. Projektverlauf & Changelog

> Chronologisches Log aller relevanten Ereignisse. Append-only — nichts wird gelöscht.

---

### 2026-06-01 — Professioneller Zusammenarbeits-Workflow etabliert

**Ziel:** Sicheres, reproduzierbares Arbeiten über Claude Code, VS Code und Claude Design.

**Durchgeführt:**
1. **ADR-007** angelegt: Trunk-Based-Workflow mit kurzlebigen Branches + Pull Requests.
2. **`WORKFLOW.md`** als kanonische Prozess-Quelle erstellt (Grundprinzip, goldene Regeln,
   Branch→PR→Merge-Ablauf, Design-Handoff, `main`-Schutz, VS-Code-Setup, Reproduzierbarkeit).
3. Kurzfassung + Verweis in `CLAUDE.md` und `.github/copilot-instructions.md` verankert.
4. Empfehlung an Veronika: GitHub-Branch-Protection für `main` aktivieren (manueller Schritt).

**Learning:** Bei „Push = sofort live" ist ein PR-Diff-Gate der entscheidende Sicherheitsgewinn —
der Git-Mehraufwand liegt bei Claude Code, nicht bei der nicht-technischen Nutzerin.

---

### 2026-06-01 — Branch-Konsolidierung & Doku-Aufräumen

**Ziel:** Branch-Wildwuchs beenden, einen klaren Produktionsstand etablieren.

**Durchgeführt:**
1. Alle Branches in `main` konsolidiert — `main` ist jetzt die einzige Quelle der Wahrheit mit dem kompletten aktuellen Website-Stand.
2. GitHub Pages auf **Deployment direkt aus `main`** umgestellt; `gh-pages`-Branch und separater Deploy-Workflow entfallen.
3. **ADR-006** angelegt (Branch-Konsolidierung dokumentiert).
4. `README.md` und `PROJECT.md` bereinigt: alle `gh-pages`-Referenzen auf `main` aktualisiert, neue Branch-/Deployment-Beschreibung.
5. `PROTOKOLL.md`: Git-/Deployment-Regeln auf den `main`-only-Workflow angepasst.

---

### 2026-05-29 — Session 1: Umgebung aufsetzen

**Ziel der Session:** Entwicklungsumgebung einrichten, Skills installieren, Wissensbasis aufbauen.

**Durchgeführt:**
1. Problem `npx: command not found` diagnostiziert → Node.js nicht installiert
2. nvm v0.39.7 via curl installiert
3. `.zshrc` mit nvm-Initialisierung angelegt
4. Node.js v24.16.0 (LTS) + npm 11.13.0 + npx installiert
5. `uipro-cli` global installiert (`npm install -g uipro-cli`)
6. Skill `ui-ux-pro-max` installiert (`uipro init --ai claude`)
7. Skill `frontend-design` war bereits vorhanden
8. `CLAUDE.md` erstellt — Claude liest `PROJECT.md` automatisch
9. `PROJECT.md` v1 erstellt — grundlegende Struktur
10. `PROJECT.md` v2 erstellt — erweitert um ADRs, Learnings, Retrospektiven (dieses Dokument)

---

### 2026-05-29 — Session 2: Mobile-Optimierung (3 Commits, direkt auf GitHub gepushed)

**Ziel der Session:** Responsive-Probleme in der mobilen Ansicht beheben.

**Commit 1 — `9acad10`: Fix mobile navigation and layout issues**
- CTA-Button in `nav-right` auf Mobile ausgeblendet → Burger-Menü bleibt sichtbar
- Brand-Schriftgröße auf 17 px reduziert (Overflow auf kleinen Screens verhindert)
- Pain-List: Cards auf Mobilgeräten in eine Spalte gestapelt
- Abstände reduziert: `yoga-card`, `big-panel`, Formular-Padding auf Mobile angepasst
- Hero-Top-Padding und `nav-inner`-Padding für Mobile justiert
- **Dateien:** `style.css` (+9 Zeilen, −1)

**Commit 2 — `67dfce9`: Fix mobile menu button + add voices swipe slider**
- Mobile-Menü-CTA: Spezifitätsproblem gelöst (`.mobile-menu a` überschrieb `.btn`) → dunkler Ink-Hintergrund gesetzt
- Voices-Bereich: horizontaler Snap-Scroll-Slider auf Mobile mit Dot-Navigation
- Dots sind klickbar und springen direkt zum jeweiligen Slide
- **Dateien:** `style.css` (+9 Zeilen, −2), `script.js` (+29 Zeilen)

**Commit 3 — `7e76f25`: Improve mobile layout: horizontal icon+text rows for steps, nodes, pain**
- Steps: Nummernkreis links (52 px), Titel + Beschreibung rechts gestapelt
- „Das große Ganze"-Nodes: Icon links, Titel + Beschreibung rechts
- Pain-Items: Icon links, Text rechts (konsistentes Row-Pattern)
- Desktop-Layout vollständig unverändert — alle Regeln auf `max-width: 560px` begrenzt
- **Dateien:** `style.css` (+12 Zeilen)

---

### 2026-05-30 — Session 3: Erstes Design-Update aus Claude Design

**Ziel:** Designsystem von Claude Design in die Produktions-Website übertragen.
**Design-Bundle:** `api.anthropic.com/v1/design/h/fOkqvcLocp3TDlWw_YuvhA`

**Durchgeführt:**
- Hero: Eyebrow-Text, Subline, CTA-Buttons überarbeitet (`Projekt anfragen`, `Meinen Ansatz verstehen`)
- Painpoints: Überschrift und Texte auf Kernbotschaft geschärft
- Angebotskarten: `--cardc` CSS-Variable für farbige Akzente pro Karte, neue Texte
- Offer `.more`-Button: grün hinterlegt statt grau-sand
- Offer `.acc`-Leiste: entfernt, statt dessen `.offer::before` Radial-Gradient
- Ansatz-Fragen: von Pill-Buttons zu einfacher Bullet-Liste (ruhiger)
- Über-mich Überschrift und Texte überarbeitet
- Prinzipien 3 & 4 getauscht (Reihenfolge: Umsetzung → Energie)
- Das große Ganze: Texte geschärft, SVG-Gradient und u-tag aktualisiert
- style.css: `text-wrap:balance/pretty`, Hero-Blur-Animation entfernt, neue Offer-Styles, Ansatz-Background-Gradient
- Voices-Swipe-Slider bewusst entfernt (Design-Entscheidung, nicht mehr benötigt)

---

### 2026-05-30 — Session 4: Echte Bilder + Vaelia-Font + Logo

**Ziel:** Platzhalter durch echte Assets ersetzen.
**Design-Bundle:** `api.anthropic.com/v1/design/h/Ze6RHdpJqagJdrt_eJAJOQ`

**Durchgeführt:**
- Bilder eingebunden: `hero-visual.png`, `about-workspace.png`, `zitat-weg.png`, `footer-weg.png`
- Vaelia-Font lokal eingebunden (`fonts/Vaelia.woff2` / `.woff`)
- Logo: Wortmarke „innerline" in Vaelia (Text-Logo, ohne SVG-Icon in Nav)
- Hero/About Hover-Zoom: `.hero-portrait img{transition:transform 1.5s…}` + `scale(1.06)`
- Zitat-Band: Ken-Burns-Drift-Animation (`qbDrift` 24s)
- Footer: Hintergrundbild mit 18% Opacity + Gradient-Overlay
- Footer Brand: auf 21px korrigiert
- `@media (prefers-reduced-motion:reduce)` für alle Animationen
- Commit `c0eb09a` gepusht

---

### 2026-05-31 — Session 5: Mobile-Fixes

**Ziel:** Zwei konkrete mobile Probleme beheben.

**Problem 1 — Hero-Bild nicht sichtbar auf Mobile:**
- Ursache: `.hero-portrait` hatte keine explizite Höhe bei ≤560px → Container kollabierte
- Lösung: `display:block; min-height:260px` in `@media (max-width:560px)`
- Commit `57c1aed`

**Problem 2 — Mobile-Menü-Button falsch gestylt:**
- Ursache: `.mobile-menu a` (Spezifität 0,1,1) überschrieb `.mobile-menu .btn` (0,2,0) für `font-size` und `padding`, da background/color nicht explizit gesetzt waren
- Lösung: Vollständige Deklaration in `.mobile-menu .btn` (background:var(--ink), color:var(--chalk), font-size:16px, padding:15px 36px)
- Das gleiche Problem trat schon in `67dfce9` (2026-05-29) auf und wurde wieder raus-refactored — jetzt dauerhaft fixiert

---

### 2026-05-31 — Session 6: Vollständiger Handoff — Logo-System, Über-mich-Redesign, Timeline

**Ziel:** Großes Design-Update aus neuem Claude Design Handoff-Bundle vollständig implementieren.
**Design-Bundle:** `api.anthropic.com/v1/design/h/5weQGsqcFmKAqMbCX3Bl1A`
**Besonderheit:** Dieses Bundle enthält erstmals einen `handoff/`-Ordner mit produktionsfertigen Dateien + `PROTOKOLL.md`.

**Durchgeführt:**
1. **Logo-System komplett neu** — Vaelia-Wortmarke „innerline" mit NN-Ligatur:
   - Markup: `<span class="bl-up">inn</span><span class="bl-tail">erline</span>` (DOM-Text bleibt `innerline`)
   - NN-Ligatur: `text-transform:uppercase` + `font-feature-settings:"dlig" 1` auf `.bl-up`
   - Linie hinter dem Wort: `.bl-word::before` (Nav: `#B9ED72`, Footer: `#BC7B4C`)
   - Kein SVG-Icon mehr in Nav/Footer
2. **KI-Icon vereinheitlicht** → Sparkle (4-Punkt-Stern) in Painpoints, Angeboten, Das große Ganze
3. **Über-mich komplett neu gestaltet:**
   - Editoriale 2-Bild-Komposition: `.am-main` (Hauptbild) + `.am-sub` (versetztes kleineres Bild `about-weg.png`)
   - Hover-Zoom auf beiden Bildern
   - Neuer Text (gekürzt, aktiver): Claim-Statement, aktiver Abschlusssatz
   - `.about-sign` Byline mit Clay-Strich: „Veronika Heidrich · Brand- & Website-Strategin"
   - Alte `.about-skills`-Grid entfernt
4. **Roter-Faden-Timeline** (`.faden`) mit 7 Stationen: Floristik → Mediendesign → Marketing → Webdesign → Branding → KI-Workflows → Bewegung
   - Horizontal mit Clay-Verbindungslinie bei ≥900px
   - 2-spaltig bei 900px
   - Vertikal mit vertikaler Clay-Linie bei ≤560px
5. **Mobile Hero-Bild** via `order:-1` als Banner über der Headline (sauberer als min-height-Hack)
6. **PROTOKOLL.md** + **Designsystem.html** ins Repo aufgenommen
7. **Neues Bild** `images/about-weg.png` hinzugefügt
8. Produktionswerte beibehalten: form-note mit mailto, `info@veronika-heidrich.de`
9. Commit `76f0bd4` gepusht

---

## 7. Learnings & Retrospektiven

> Das Herzstück der Wissensdatenbank. Hier wächst das "wie wir arbeiten" über Zeit.
> Format: Was hat funktioniert? Was nicht? Was würden wir anders machen? Welche Erkenntnisse haben wir gewonnen?

---

### Retrospektive 1 — 2026-05-29 (Session 1)

#### ✅ Was hat funktioniert

- **nvm-Installation via curl** — reibungslos, schnell, keine Abhängigkeiten nötig
- **uipro-cli** — installiert ohne Fehler, hat sofort die richtige Zielstruktur (`.claude/skills/`) erkannt
- **Kombination beider Skills** — `frontend-design` + `ui-ux-pro-max` deckt kreative und datengetriebene Design-Intelligenz ab

#### ❌ Was nicht funktioniert hat / Stolpersteine

- **Homebrew nicht vorhanden** — Annahme dass Homebrew installiert ist war falsch. Auf frischen Macs ist es nicht automatisch dabei → immer zuerst prüfen
- **nvm findet kein `.zshrc`** — Auf einem frischen System ohne `.zshrc` muss die Datei erst angelegt werden. nvm's install.sh warnt davor aber macht es nicht automatisch
- **PATH nicht sofort aktiv** — Nach nvm-Installation muss das Terminal neu gestartet werden. Im gleichen Terminal-Prozess muss nvm manuell geladen werden (`source ~/.zshrc` oder Export-Befehl)

#### 💡 Erkenntnisse & Einsichten

- **Systemzustand immer zuerst prüfen** — Vor dem Installieren von Tools: `which node`, `which brew`, `which npx` ausführen. Spart Umwege.
- **Frische macOS-Umgebungen haben wenig vorinstalliert** — Kein Node, kein Homebrew, manchmal kein `.zshrc`. Immer von Null ausgehen.
- **nvm > direkte Installation** — Für jedes Entwicklungsprojekt lohnt sich nvm. Der Overhead von ~2 Minuten zahlt sich aus sobald Node-Versionen unterschiedlich sind.

#### 🔁 Was wir beim nächsten Mal anders machen würden

- Zu Beginn einer Session immer einen "Environment Check" durchführen: Node? Python? Git? Homebrew?
- `.zshrc` Existenz prüfen bevor nvm installiert wird

---

### Retrospektive 2 — 2026-05-30/31 (Sessions 3–6)

#### ✅ Was gut funktioniert hat

- **Claude Design → Claude Code Workflow** — Export-Bundle enthält alle Assets inkl. Fonts/Bilder; 1:1-Copy-Paste aus `handoff/` funktioniert zuverlässig
- **PROTOKOLL.md als Regressions-Schutz** — die Invarianten-Liste verhindert, dass bereits gefixter Code versehentlich wieder rausfällt. Hero-Motion und Mobile-Button sind explizit dokumentiert
- **Selektives git add** — nur die in CLAUDE.md gelisteten Dateien committen; Font-Zips und Uploads-Ordner bleiben draußen
- **CSS-Variablen `--cardc`** — ermöglichen farbige Akzente pro Angebotskarte ohne Code-Duplikation

#### ❌ Was nicht funktioniert hat / Stolpersteine

- **Claude Design Share-URL vs. Export-URL** — `claude.ai/design/p/[UUID]` braucht Auth und ist NICHT nutzbar. Nur `api.anthropic.com/v1/design/h/[HASH]` (frischer Export) funktioniert
- **Export-URL läuft ab** — Erste URL (`fOkqvcLocp3TDlWw_YuvhA`) war beim zweiten Versuch abgelaufen → immer neu exportieren
- **Spezifitätsproblem `.mobile-menu a` vs `.btn`** — ist zweimal aufgetreten (Sessions 2 und 5). Dauerhaft gelöst durch vollständige Deklaration in `.mobile-menu .btn`
- **Hero-Bild mobil nicht sichtbar** — `position:absolute` + `inset:0` braucht definierten Container. `min-height` fehlte bei ≤560px → explizit gesetzt
- **Curly Quotes in Editoren** — beim Kopieren von Design-Inhalten gelegentlich `"` statt `"` eingefügt → HTML-Attribute kaputtgemacht

#### 💡 Erkenntnisse & Einsichten

- **`order:-1` > `display:block` für Hero-Bild mobil** — Order-Lösung bewegt das Bild tatsächlich über den Text, ohne Layout-Hacks
- **Vaelia nur als Display-Font** — organische Versalien wirken auf Überschriften „unruhig"; funktioniert ausschließlich als Wortmarke
- **NN-Ligatur via `font-feature-settings:"dlig" 1`** — DOM-Text bleibt lesbar für Screenreader; visuelle Ligatur nur via CSS
- **Zwei Protokoll-Dokumente** — `PROJECT.md` (technisch/strategisch, Claude Code) und `PROTOKOLL.md` (Design-Invarianten, Claude Design) ergänzen sich

_Neue Retrospektiven werden nach jeder bedeutenden Session oder am Ende eines Meilensteins hinzugefügt._

---

## 8. Offene Fragen & Abwägungen

> Dinge die noch nicht entschieden sind, aber durchdacht werden müssen. Mit allen Denkrichtungen.

| # | Frage                                    | Denkrichtungen / Optionen                              | Priorität | Status      |
|---|------------------------------------------|-------------------------------------------------------|-----------|-------------|
| 1 | Was ist das Projektziel?                 | Personal-Website Brand-Strategin Veronika Heidrich    | 🔴 Hoch   | ✅ Geklärt  |
| 2 | Welches Framework?                       | Plain HTML/CSS/JS → ADR-002                           | 🔴 Hoch   | ✅ Geklärt  |
| 3 | Deployment-Ziel?                         | GitHub Pages (direkt aus `main`)                      | 🟡 Mittel | ✅ Geklärt  |
| 4 | Design-Richtung?                         | Fresh Organic Hybrid → ADR-005                        | 🟡 Mittel | ✅ Umgesetzt|
| 5 | Brauchen wir ein CMS?                    | Nein — statisch, direkt im HTML pflegbar              | 🟢 Niedrig| ✅ Geklärt  |
| 6 | SEO-Meta-Tags vollständig?               | title, description, og:* Tags fehlen noch             | 🟡 Mittel | ⏳ Offen   |
| 7 | Über-mich-Unterseite nötig?              | Ja — CTA „Mehr über mich" erst verlinken wenn existiert| 🟡 Mittel | ⏳ Offen   |
| 8 | FAQ-Section für SEO?                     | Accordion-Style wie „Mein Ansatz" — gut für GEO       | 🟡 Mittel | ⏳ Offen   |
| 9 | Voices: echte Kundenstimmen?             | Aktuell Platzhalter — Vroni muss echte liefern        | 🟡 Mittel | ⏳ Offen   |
| 10| A11y-Audit nötig (BFSG)?                | WCAG 2.1 AA verpflichtend seit 28.06.2025             | 🔴 Hoch   | ⏳ Offen   |

---

## 9. Bekannte Probleme & Lösungen

| # | Problem                               | Ursache                                          | Lösung                                                                | Status     | Datum      |
|---|---------------------------------------|--------------------------------------------------|-----------------------------------------------------------------------|------------|------------|
| 1 | `npx: command not found`              | Node.js nicht installiert                        | nvm + Node.js v24.16.0 installiert                                    | ✅ Behoben | 2026-05-29 |
| 2 | nvm warnt: kein Profil gefunden       | `.zshrc` nicht vorhanden                         | `.zshrc` angelegt, nvm-Export eingetragen                             | ✅ Behoben | 2026-05-29 |
| 3 | nvm nach Install nicht aktiv          | Shell neu starten nötig                          | `export NVM_DIR...` manuell ausführen oder Terminal neu               | ✅ Behoben | 2026-05-29 |
| 4 | Mobile-Menü-Button falsch gestylt     | `.mobile-menu a` überschrieb `.btn` (Spezifität) | Volldeklaration in `.mobile-menu .btn` (ink bg, weiß, 16px)           | ✅ Behoben | 2026-05-31 |
| 5 | Hero-Bild mobil nicht sichtbar        | `.hero-portrait` ohne Höhe bei ≤560px kollabiert | `display:block; min-height:260px` in 560px-Block → jetzt `order:-1`   | ✅ Behoben | 2026-05-31 |
| 6 | Claude Design Share-URL funktioniert nicht | Share-URL braucht Auth-Cookie                | Nur API-Export-URL `api.anthropic.com/v1/design/h/[HASH]` verwenden  | ✅ Bekannt | 2026-05-31 |
| 7 | Design-Bundle URL abgelaufen          | Export-URLs haben TTL                            | Neu aus Claude Design exportieren → neue Hash-URL                     | ✅ Bekannt | 2026-05-31 |

---

## 10. Wissen, Konventionen & Muster

> Alles was nicht offensichtlich ist. Implizites Wissen explizit machen.

### Umgebung

- **nvm aktivieren (in Skripten/Claude):**
  ```bash
  export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  ```
- **Node-Version prüfen:** `node --version` → sollte `v24.16.0` zeigen
- **Neue Terminal-Session:** nvm wird automatisch via `.zshrc` geladen

### Skills

- **Installierte Skills** werden in `skills-lock.json` versioniert
- **frontend-design:** Für kreative, unverwechselbare UI-Richtung
- **ui-ux-pro-max:** Für datenbasierte Design-Systeme (Farben, Fonts, UX-Regeln)
- **Skills updaten:** `uipro update`
- **Skill deinstallieren:** `uipro uninstall`

### Arbeitsweise mit Claude

- Claude liest `PROJECT.md` zu Beginn jeder Session
- Claude aktualisiert `PROJECT.md` nach jeder relevanten Änderung
- Bei neuen Entscheidungen: ADR anlegen (ADR-XXX Muster verwenden)
- Bei Problemen: Lösung in Sektion 9 dokumentieren
- Bei Erkenntnissen: Retrospektive in Sektion 7 ergänzen

### Claude Design ↔ Claude Code Workflow

```
Claude Design (Iteration)
    ↓  Export → "Hand off to Claude Code"
    ↓  URL: https://api.anthropic.com/v1/design/h/[HASH]
Claude Code (Implementierung)
    ↓  curl → tar → handoff/ Ordner
    ↓  nur CLAUDE.md-Dateien übernehmen
    ↓  git add selektiv (keine Uploads/, Font-Zips)
    ↓  git push origin main
GitHub Pages (Deployment direkt aus main, ~1-2 min)
```

**Wichtig:** Export-URL neu generieren bei jeder Session. Share-URL (`/design/p/[UUID]`) NICHT verwenden.

### Invarianten (PROTOKOLL.md)

Diese Dinge nie vergessen (vollständige Liste in `PROTOKOLL.md`):
- Logo: `innerline` in Vaelia, NN-Ligatur, Linie dahinter (Nav grün, Footer Clay)
- Hero-Hover-Zoom: `.hero-portrait img{transition:transform 1.5s…}`
- Mobile-Burger-Button: `background:var(--ink);color:var(--chalk)` explizit
- Hero-Bild mobil: `.hero-visual{order:-1}` (Banner über Headline)
- Icons: Welle=Marke, Monitor=Web, Sparkle=KI, Herz=Yoga/Körper

---

## 11. Referenzen & Ressourcen

### Projekt-Tools & Skills

| Ressource              | Pfad / URL                                              |
|------------------------|---------------------------------------------------------|
| frontend-design Skill  | `.agents/skills/frontend-design/SKILL.md`               |
| ui-ux-pro-max Skill    | `.claude/skills/ui-ux-pro-max/SKILL.md`                 |
| ui-ux-pro-max GitHub   | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| nvm                    | https://github.com/nvm-sh/nvm                           |

### Methodik & Best Practices

| Methode                        | Quelle                                     |
|--------------------------------|--------------------------------------------|
| ADR (Architecture Decision Records) | Michael Nygard — martinfowler.com     |
| ADR Best Practices             | AWS Architecture Blog                      |
| Lessons Learned Framework      | PMI Knowledge Management                   |
| Tech Radar Methode             | ThoughtWorks Technology Radar              |
| Living Documentation           | Cyrille Martraire                          |
| Retrospektiven (Start/Stop/Continue) | Agile Alliance                       |

---

_Dieses Dokument ist lebendig — es wächst mit dem Projekt._
_Jede Session hinterlässt Spuren. Jede Entscheidung wird begründet. Jedes Learning wird gesichert._
_Letzte Aktualisierung: 2026-06-01_
