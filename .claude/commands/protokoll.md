# /protokoll — Protokoll-Eintrag anlegen

Dieser Befehl hilft beim korrekten Dokumentieren einer Änderung in PROTOKOLL.md.

## Was du tust

1. Lies die **Invarianten** in PROTOKOLL.md (suche nach dem Abschnitt "Invarianten" — dort steht was in jeder Runde geprüft werden muss, z.B. Hero-Motion, Logo-NN-Ligatur, Burger-CTA).

2. Frage mich: **Was wurde in dieser Runde geändert?** (falls ich es nicht schon weiss)

3. Schreibe einen neuen Abschnitt ans Ende von PROTOKOLL.md mit folgendem Format:

```
### DATUM — TITEL (Claude Code / Claude Design / VS Code)

**Was:** [Was wurde geändert — konkret, welche Dateien, welche Zeilen]

**Warum:** [Warum war die Änderung nötig — Auslöser, Problem, Ziel]

**Wie:** [Wie wurde es umgesetzt — Ansatz, Werkzeuge]

**Alternativen/Abwägungen:** [Was wurde verworfen und warum]

**Learnings:** [Was wurde gelernt — nur wenn wirklich nicht-offensichtlich]

**Konsequenzen / Invariante:** [Was darf künftig nicht mehr verändert werden / was muss mitgedacht werden]
- MEDIEN.md: [geändert / keine Änderung]
- Rechtstexte: [geändert / keine Änderung — und warum]
```

4. Bestätige mir: "Protokoll-Eintrag geschrieben. Bitte prüfen und dann committen."

## Regeln
- Datum immer als `YYYY-MM-DD`
- Append-only: Nichts löschen, nur ans Ende anfügen
- Invarianten-Check: Immer kurz vermerken ob Hero-Motion, Logo-NN-Ligatur, Burger-Farbe etc. geprüft wurden
