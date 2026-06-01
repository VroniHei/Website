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
