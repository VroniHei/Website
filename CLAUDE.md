# Projekt: Vroni Website

## Dokumentationspflicht / Protokollpflicht (gilt IMMER — egal von wo)
> Diese Regel gilt **überall und für jede Bearbeitung**: Claude Code, VS Code (GitHub Copilot)
> und Claude Design. Sie ist nicht optional und an kein einzelnes Werkzeug gebunden.

- **Nach JEDER Änderung** wird `PROTOKOLL.md` aktualisiert — bevor die Arbeit als erledigt gilt
  (Claude Code: vor dem Commit/Push; Claude Design: vor dem Handoff; VS Code: vor dem Commit).
- Jeder Eintrag muss eine **voll einsehbare Dokumentation aller Arbeitsschritte** sein:
  **Was** geändert wurde, **Warum**, **Wie**, welche **Alternativen/Abwägungen** es gab,
  welche **Learnings** entstanden sind und welche **Konsequenzen** daraus folgen.
- **Ziel:** Man kann jederzeit und von überall auf dem aktuellen Stand weiterarbeiten, und der
  Verlauf ist so lückenlos, dass das Projekt bei Bedarf gedanklich auf einen **bestimmten Moment
  zurückgestellt** werden kann.
- **Ablauf bei jeder Runde:** Invarianten in `PROTOKOLL.md` prüfen → Änderung umsetzen →
  Verlauf (und ggf. Invarianten/Learnings) in `PROTOKOLL.md` ergänzen → committen/pushen bzw. Handoff.
- Nichts wird gelöscht — `PROTOKOLL.md` ist **append-only** (Historie bleibt nachvollziehbar).

## Hygiene-Checkliste — nach jeder größeren Session (Definition of Done)
> Inspiriert von „Boy Scout Rule" (Code sauberer verlassen als vorgefunden) und „Definition of Done" aus Scrum.
> Diese Checkliste läuft **nach jeder Session mit ≥ 1 Bild- oder Seitenänderung**, spätestens am PR-Ende.
> Ziel: kein schleichender Datenmüll, keine veraltete Doku, keine Widersprüche zwischen Dateien.

### Datenmüll / Verwaiste Assets
- [ ] **Bilder in `images/`**: Ist jede Datei in mindestens einer HTML-Datei referenziert? (`grep -r "images/" --include="*.html"` + manueller Abgleich mit `ls images/`)
- [ ] **CSS-Klassen**: Gibt es Klassen in einer `*.css`, die nirgends in HTML vorkommen? (bei großen Änderungen)
- [ ] **Fonts in `fonts/`**: Ist jede Schriftdatei in `@font-face` in `style.css` oder `ueber-mich.css` referenziert?

### Dokumentations-Sync (vier Dateien müssen konsistent sein)
- [ ] **`MEDIEN.md` Schnelltabelle**: Enthält alle aktuell in Produktion genutzten Bilder; entfernte Bilder als „entfernt" markiert.
- [ ] **`PROTOKOLL.md` Section 2 ASSETS**: Stimmt mit den tatsächlichen Dateien im Repo überein (Seiten, Bilder, Fonts)?
- [ ] **`PROTOKOLL.md` Section 1 Invarianten**: Sind alle Invarianten noch korrekt und aktuell (keine veralteten Font- oder Layout-Angaben)?
- [ ] **`PROTOKOLL.md` Section 4 TODOs**: Erledigte Items mit ✅ markieren; neue TODOs ergänzen.
- [ ] **`WISSEN.md`**: Tech-Stack (Seiten, Schriften), Meilensteine und Offene Punkte aktuell?
- [ ] **`PROJECT.md`**: Status-Tabelle (Meilensteine), Projektstruktur (Section 4), Offene Fragen-Tabelle (Section 8) aktuell?
- [ ] **`sitemap.xml`**: Alle Content-Seiten mit korrektem `lastmod` eingetragen?

### Code-Korrektheit
- [ ] **Keine externe Font-CDN** (kein `googleapis`, `jsdelivr`, `fontsource` in HTML/CSS)?
- [ ] **Kein `image-slot.js`** in Produktions-HTML-Dateien (`grep -r "image-slot" --include="*.html"`)?
- [ ] **`<picture>` + WebP-Fallback** für alle Bilder?
- [ ] **CI grün**: HTML-Validierung, interne Links, Lighthouse A11y ≥ 0.9?

> **Wann pflichtmäßig, wann optional?**
> - **Pflicht** (immer): Doku-Sync (MEDIEN, PROTOKOLL, WISSEN) + Datenmüll-Check bei Bild-/Seitenänderungen.
> - **Optional** (bei Bedarf): CSS-Klassen-Audit, vollständiger Projektstruktur-Check.
> Diese Checkliste ersetzt kein A11y-Audit — das ist ein eigener dedizierter Schritt.

## Zusammenarbeit & Sync-Workflow (verbindlich — Details in `WORKFLOW.md`)
> Vollständiger Prozess: **`WORKFLOW.md`** (kanonische Quelle). Kurzfassung:
- **`main`** = einzige dauerhafte Quelle der Wahrheit + Deployment-Ziel. Git ist das Rückgrat;
  **Claude Design steht außerhalb von Git** und ist nie der Live-Stand (erst via Handoff → Code → `main` real).
- **Immer nur an einer Stelle gleichzeitig** dieselbe Datei bearbeiten. **Vor dem Start `git pull`**, danach zeitnah pushen.
- **Jede inhaltliche Änderung läuft über einen kurzlebigen Branch + Pull Request** (nicht direkt auf `main`):
  `git pull` → `git switch -c <feat|fix|design|docs|a11y>/<name>` → ändern → `PROTOKOLL.md` ergänzen →
  commit/push → PR (Diff prüfen) → Squash-Merge → Branch löschen → Auto-Deploy.
- `main` ist auf GitHub geschützt (kein Force-Push/Löschen, PR-Pflicht).

## Arbeitsweise / Sync (WICHTIG)
- Live-Quelle der Wahrheit = GitHub-Repo `vronihei/Website` (veröffentlicht via Claude Code).
- Dieses Projekt = Design-Atelier. Dateinamen sind deckungsgleich mit dem Repo:
  `index.html`, `style.css`, `script.js`, `image-slot.js`, `Designsystem.html`.
- Regel: vor jeder neuen Session ggf. Repo-Änderungen zurück-syncen; nie dieselbe Datei
  parallel in Design und Code bearbeiten. Handoff an Claude Code ist 1:1 Copy-Paste.
- **Änderungsprotokoll & Regression-Schutz: `PROTOKOLL.md`.** Vor JEDER Änderung die dortigen
  **Invarianten** prüfen (z. B. Hero-Motion, Logo-NN-Ligatur, Burger-CTA schwarz/weiß), nach
  JEDER Änderung den Verlauf ergänzen. So fällt Bereits-Gefixtes nicht versehentlich wieder raus.

## Brand Voice (Arbeitsgrundlage für ALLE Texte) — Vroni / Veronika Heidrich
Vollständiges Dokument: `uploads/Vroni_Brand_Voice_2_0.md` (immer als Referenz nutzen).

Vroni ist eine KI-gestützte Brand- & Website-Strategin. Sie verbindet Branding,
Webdesign (WordPress/Elementor), Marketing/Content, KI-Workflows, Yoga/Bewegung und
Nervensystem-Regulation. Keine Agentur, keine reine Yogalehrerin, keine generische KI-Beraterin.

Roter Faden: **Klarheit → Sichtbarkeit → Umsetzung → Energie halten.**
Markenkern: **Sichtbar werden, ohne dich zu verbiegen.**

### Stimme
- klar, ehrlich, menschlich, reflektiert, direkt, warm, fundiert, leicht frech, humorvoll mit Augenzwinkern.
- Wie ein Gespräch mit einer klugen Freundin: piekst liebevoll, beschämt nie, nie von oben herab.
- **Ich-Form**, wenn Vroni spricht. Kein künstliches Agentur-„Wir" (nur wenn Vroni + Kund:in gemeint).

### Sprachrhythmus
- Natürliche, ausformulierte Sätze. Mischung kurz/mittel, Absätze 2–4 Sätze, Listen sparsam.
- NIEMALS abgehackte KI-Claim-Kaskaden („Müde. Überladen. Ausgebrannt.").
- Aufbau: Gedanke → Erklärung → Einordnung → klare Zuspitzung.

### Inhaltliche Haltung
- Branding = stimmige Übersetzung der Person, kein Kostüm/Trendmaske.
- Webdesign = strategisches System (Marke, Inhalt, Struktur, Technik, Vertrauen), nicht nur Optik.
- KI = Werkzeug & Sparringspartner, kein Ersatzhirn.
- Yoga/Bewegung/Nervensystem = Basis für langfristige Leistungsfähigkeit, NICHT Wellness-Deko, nicht esoterisch.
- Verkauf: ruhig, transparent, ehrlich (auch „für wen NICHT"). Keine künstliche Verknappung/Druck.

### Verboten (Wörter & Ton)
„Entfalte dein volles Potenzial", „beste Version deiner selbst", „Traumkunden magnetisch anziehen",
„Next Level", „High Vibe", „Soul Business", „Premium Transformation", „7-stellig/Millionenumsätze",
Signature-Programm-Nebel, künstliche Verknappung, aggressive Sales-Rhetorik, Women-Circle-/
Feminin-Energy als Hauptschiene, sterile Agenturfloskeln, übertriebenes Business-Deutsch, KI-Floskeln.

### SEO/GEO
SEO-Themen (u.a.): Personal Branding, Brand Strategie, Webdesign, WordPress/Elementor,
KI-gestützte Website-Strategie, KI für Marketing/Workflows, Yoga Kurse, Power Yoga,
Nervensystem-Regulation, Holistic Performance. GEO: klare Definitionen, kurze Antwortblöcke,
FAQ-Sections, saubere H2/H3-Struktur — aber nicht keyword-stopfen.

### Marken-Anker-Sätze (gerne nutzen)
- Sichtbar werden, ohne dich zu verbiegen.
- Deine Marke sollte dich zeigen, nicht verkleiden.
- Nicht meine Vielseitigkeit ist das Problem. Sondern der fehlende rote Faden.
- KI soll dir Arbeit erleichtern, nicht deinen Kopf ersetzen.
- Hohe Leistung braucht einen Körper, der mitkommt.
- Du musst noch nicht alles fertig sortiert haben. Genau dafür bin ich ja da.

## Barrierefreiheit (BFSG / EAA — verpflichtend, immer mitdenken)
Seit 28.06.2025 gilt das Barrierefreiheitsstärkungsgesetz (BFSG, Umsetzung der EU-Richtlinie EAA).
Maßstab ist EN 301 549 → faktisch **WCAG 2.1 Level AA**. Bei JEDER Sektion prüfen:
- **Kontrast:** Normaltext ≥ 4.5:1, großer Text (≥24px / ≥18.66px bold) ≥ 3:1, UI/Grafik ≥ 3:1.
  Achtung-Kandidaten: green-deep (#6E9B2C) auf Weiß = nur ~3.3:1 → für kleinen Text/Links zu schwach;
  helle Töne (#9aa589) auf Forest = grenzwertig. Bei kleinem Text dunkler/kräftiger setzen.
- **Schriftgröße:** Fließtext nicht unter ~16px; kleine Labels/Captions nicht unter 12px.
- **Lesbarkeit/Zoom:** bis 200% Zoom nutzbar, keine Textabschneidung; line-height ausreichend.
- **Fokus:** sichtbarer Fokus-Indikator für alle interaktiven Elemente (Tab-Bedienung).
- **Semantik:** saubere H1→H2→H3-Hierarchie, Buttons vs. Links korrekt, `alt`-Texte für Bilder,
  `aria-label` für Icon-Buttons, ausreichende Touch-Targets (≥44px).
- Vorgehen: laufend grob mitprüfen, am Ende ein dedizierter **A11y-Audit** über die fertige Seite.

## Recht & Datenschutz aktuell halten (verpflichtend bei jeder Änderung)
> `impressum.html` und `datenschutz.html` müssen den **tatsächlichen** technischen Stand der Seite widerspiegeln.
> Bei JEDER Änderung prüfen: Verändert sie, **welche Daten verarbeitet** werden oder **welche Dritt-Dienste** eingebunden sind?

**Auslöser, die ein Anpassen der Rechtstexte erzwingen (im selben PR mitdenken):**
- Neue **externe Ressource** (Schrift-/Skript-/Bild-CDN, Embed, iFrame, Map) → Datenschutz: Dienst + Rechtsgrundlage + ggf. Drittland.
- **Analytics/Tracking/Cookies** jeglicher Art → Datenschutz + ggf. Cookie-/Consent-Banner. Aktueller Stand: **cookielose Reichweitenmessung (GoatCounter, `count.js` lokal)** → **kein Banner**. Würde man auf cookie-/US-basiertes Tracking (z. B. GA4) wechseln, wäre ein Consent-Banner zwingend.
- **Formular-Änderung** (z. B. weg von `mailto` hin zu serverseitigem Versand/Formspatz) → Datenschutz „Kontakt".
- **Hosting-/Domain-Wechsel** (z. B. GitHub Pages → Hostinger) → Datenschutz „Hosting" + Impressum-Kontaktdaten/URLs.
- **KI-Tool, das Besucherdaten verarbeitet** (z. B. Chatbot) → Datenschutz. (Reiner KI-Einsatz beim *Bauen* der Seite = nur Transparenz-Hinweis im Impressum, kein Datenschutz-Thema.)
- **Adress-/Rechtsform-/USt-Änderung** → Impressum.

**Regel:** Solche Änderungen und die Anpassung der Rechtstexte gehören in **denselben PR**. Rechtsstand: **DDG** (nicht mehr TMG), **TDDDG** (nicht mehr TTDSG). Im Zweifel mit dem **eRecht24-Generator** gegenprüfen. (Halb-Automatisierung als Option: CI-„Privacy-Guard", der neue externe Hosts meldet.)

## Schriften (Fonts) — IMMER lokal hosten (verbindlich, egal von wo)
> Gilt überall: Claude Code, VS Code, Claude Design. Eine externe Schrift-CDN überträgt die Besucher-IP
> an Dritte → genau das Google-Fonts-/„LG-München"-Abmahnrisiko. Lokal = keine Dritt-Verbindung, consent-frei.

- **Jede Schrift wird lokal aus `fonts/` geladen** (`@font-face` mit lokalem `url('fonts/…')`).
- **NIEMALS** eine externe Font-CDN / Google Fonts einbinden: kein `fonts.googleapis.com`, kein
  `jsdelivr`/`unpkg`/Fontsource-CDN, kein `<link>`/`@import`/`preconnect` auf Dritt-Hosts für Schriften.
- **Neue Schrift (z. B. aus einem Claude-Design-Handoff):** vor dem Live-Gang die Font-Dateien
  herunterladen → nach `fonts/` legen → `@font-face` auf lokale Pfade setzen → externe Referenz entfernen.
  Alles **im selben PR**; Datei + Einbindung in `PROTOKOLL.md` (Assets) dokumentieren.
- Formate: **`.woff2`** bevorzugt, `.woff` als Fallback. Render-kritische Schnitte ggf. `preload` (lokal).
- Folge: Solange ausschließlich lokale Schriften genutzt werden, entsteht durch Fonts **kein** Cookie-/Consent-Bedarf.

## Medien-Dokumentationspflicht (`MEDIEN.md`) — verbindlich, egal von wo
> Gilt überall: Claude Code, VS Code, Claude Design. Ziel: **lückenlose Herkunft & Provenienz** aller Bilder/Medien
> — besonders wichtig im KI-Zeitalter. Kanonisches Register: **`MEDIEN.md`** (aktueller Zustand pro Medium).
> Abgrenzung: `PROTOKOLL.md` = Historie/Begründung, `MEDIEN.md` = Register pro Medium.

- **Jedes** in der Website verwendete Bild/Medium **muss** in `MEDIEN.md` erfasst sein.
- Bei **JEDER** Medien-Änderung wird der Eintrag **im selben PR** aktualisiert — mit **datiertem Vermerk** unter „Änderungen":
  - **Neues Bild/Medium** → neuer Eintrag (alle Felder).
  - **Neue Variante/Größe/Format** (zusätzliche WebP, Thumbnail) → unter „Dateien/Varianten" ergänzen.
  - **Alt-Text geändert** (z. B. A11y-Optimierung) → „Alt-Text" aktualisieren.
  - **Mehrfachnutzung** (Verwendung auf weiterer Seite/Unterseite) → „Verwendung" ergänzen.
  - **Austausch / Optimierung / Entfernung** → Vermerk mit Datum + Grund.
- **Pflichtfelder je Eintrag:** Dateien/Varianten (+Größen), Maße, Herkunft (KI: Tool + Ersteller:in + optional Prompt;
  Dritt-Asset: Quelle + Urheber:in + **Lizenz** + ggf. Attribution), Erstellt am, Verwendung, Alt-Text, Dekorativ (ja/nein),
  Rechte, „Beachten", Änderungen (datiert).
- **Abgebildete Personen:** kennzeichnen, ob reales Foto (→ Einwilligung / Recht am eigenen Bild beachten) oder
  **KI-generierte Darstellung**. Bei echten Fotos vor Upload **EXIF/Standortdaten entfernen**.
- **Nicht-KI-Assets** (Stock, Fotograf:in, CC): Lizenz + Urheber:in + Attributionspflicht zwingend dokumentieren.
- **Durchsetzung (CI):** Der Job **`Medien-Register-Check`** in `.github/workflows/ci.yml` lässt einen PR scheitern,
  wenn `images/` geändert wurde, ohne dass `MEDIEN.md` im selben PR aktualisiert wird. Die Regel ist damit erzwungen, nicht nur Vorsatz.
- **Bildwelt/Prompts:** Reproduktions-Referenz für neue Bilder = `brand/bildwelt-und-prompts.md` (Stil + Prompts).
