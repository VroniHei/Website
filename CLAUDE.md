# Claude Projektkonfiguration

## Pflichtlektüre bei jeder Session

Lies zu Beginn **jeder Session** zuerst `PROJECT.md` vollständig durch.
`PROJECT.md` ist die zentrale Wissensdatenbank — sie enthält Projektverlauf, alle Entscheidungen, Learnings, offene Fragen und den aktuellen Status.

## Arbeitsprinzipien

### Vor jeder Aufgabe
- `PROJECT.md` vollständig lesen
- Offene Fragen (Sektion 8) prüfen — sind relevante Fragen noch offen?
- Bekannte Probleme (Sektion 9) prüfen — gibt es Zusammenhänge?
- Alle Alternativen und Denkrichtungen bedenken, nicht nur den ersten Lösungsweg

### Während der Arbeit
- Bei jeder Technologie-/Architekturentscheidung: Alle Optionen mit Pro/Contra abwägen
- Nicht nur implementieren — auch begründen, warum dieser Weg der beste ist
- Stolpersteine und Erkenntnisse sofort notieren (für die Retrospektive)

### Nach jeder relevanten Aktion `PROJECT.md` aktualisieren:

| Was passiert ist          | Wo eintragen                              |
|---------------------------|-------------------------------------------|
| Neue Entscheidung          | Sektion 5 — neues ADR anlegen (ADR-XXX)  |
| Aufgabe erledigt           | Sektion 2 — Status aktualisieren         |
| Neues Tool / Framework     | Sektion 3 — Tech-Stack ergänzen          |
| Neue Datei / Ordner        | Sektion 4 — Projektstruktur aktualisieren |
| Problem aufgetreten        | Sektion 9 — Problem + Lösung eintragen   |
| Erkenntnis / Learning      | Sektion 7 — Retrospektive ergänzen       |
| Offene Frage geklärt       | Sektion 8 — Frage schließen              |
| Neue offene Frage          | Sektion 8 — Frage hinzufügen             |
| Projektverlauf (Ereignis)  | Sektion 6 — Changelog-Eintrag hinzufügen |

## ADR-Format (bei Entscheidungen)

```markdown
### ADR-XXX — Titel

**Status:** Proposed / Accepted / Deprecated / Superseded

**Kontext:** Warum musste diese Entscheidung getroffen werden?

**Betrachtete Optionen:**
| Option | Pro | Contra |
|--------|-----|--------|
| ...    | ... | ...    |

**Entscheidung:** Was wurde gewählt und warum?

**Konsequenzen:** Was folgt daraus (positiv und negativ)?
```

## Ziel

`PROJECT.md` soll zu jedem Zeitpunkt so vollständig sein, dass eine neue Session ohne jeglichen Kontextverlust nahtlos weiterarbeiten kann — und immer das bestmögliche Ergebnis erzielt wird.
