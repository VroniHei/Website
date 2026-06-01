# Copilot-Instruktionen · Vroni / InnerLine Website

Diese Datei wird von GitHub Copilot in VS Code automatisch gelesen. Sie stellt sicher, dass
dieselben Projektregeln gelten wie für Claude Code und Claude Design — egal, von wo aus
gearbeitet wird.

## Dokumentationspflicht / Protokollpflicht (gilt IMMER)

**Nach JEDER Änderung muss `PROTOKOLL.md` aktualisiert werden — bevor committet/gepusht wird.**
Diese Regel ist verbindlich und gilt überall (Claude Code, VS Code, Claude Design).

Jeder Protokoll-Eintrag dokumentiert **voll einsehbar alle Arbeitsschritte**:

- **Was** wurde geändert
- **Warum** (Kontext, Ziel)
- **Wie** (Umsetzung)
- **Alternativen / Abwägungen**, die betrachtet wurden
- **Learnings**, die entstanden sind
- **Konsequenzen**, die daraus folgen

**Ziel:** Man kann jederzeit und von überall auf dem aktuellen Stand weiterarbeiten, und der
Verlauf ist so lückenlos, dass sich der Projektstand bei Bedarf auf einen **bestimmten Moment
zurückführen** lässt.

**Ablauf bei jeder Runde:**
1. Invarianten in `PROTOKOLL.md` (Abschnitt 1) prüfen — nichts versehentlich rausfallen lassen.
2. Änderung umsetzen.
3. Verlauf (und ggf. Invarianten/Learnings) in `PROTOKOLL.md` ergänzen — **append-only**, nichts löschen.
4. Erst dann committen/pushen.

## Weitere maßgebliche Dokumente

- `CLAUDE.md` — Brand Voice, Barrierefreiheit (BFSG/WCAG 2.1 AA), Arbeitsweise/Sync.
- `PROTOKOLL.md` — Invarianten (Regressions-Schutz) + vollständiger Änderungsverlauf.
- `PROJECT.md` — Wissensdatenbank: Architekturentscheidungen (ADRs), Changelog, Learnings.

Bei Texten immer die **Brand Voice** aus `CLAUDE.md` beachten. Bei jeder Sektion die
**Barrierefreiheit** (Kontrast, Fokus, Semantik, Touch-Targets) mitdenken.

## Deployment

`main` ist die einzige Quelle der Wahrheit. GitHub Pages publiziert direkt aus `main`
(kein `gh-pages`-Branch, kein Build-Workflow). Jeder Push auf `main` geht live.
