# /learnings-review — Aktive Lernüberprüfung & Verbesserungsvorschläge

Liest `LEARNINGS.md`, prüft den aktuellen Projektstand und schlägt konkret vor was wir anders machen oder neu bauen sollten.

## Was du tust

### Schritt 1 — Aktuelle Datei-Situation lesen

```bash
# Welche Dateien wurden zuletzt geändert?
git log --oneline -10
git diff --name-only HEAD~5..HEAD

# Gibt es offene Issues oder Warnungen im letzten CI-Run?
gh pr list --state open
```

Lies außerdem:
- `LEARNINGS.md` (alle L-Einträge)
- Letzten 3 PROTOKOLL-Einträge (Ende von `PROTOKOLL.md`)
- `ACCESSIBILITY_NOTES.md` Abschnitt „Noch offen"

### Schritt 2 — Bekannte Muster gegen aktuellen Stand prüfen

Für jedes Learning in LEARNINGS.md: Gibt es Anzeichen dass wir gerade in diese Falle tappen?

**Konkrete Checks:**

**L-01 (Curly Quotes):**
```bash
grep -Pln '[\x{201C}\x{201D}]' *.html
```
→ Wenn Treffer: sofort melden.

**L-02 (CI-Abdeckung):**
```bash
# Alle HTML-Dateien im Root
ls *.html
# Alle in CI yml gelisteten Dateien
grep -A2 "html-validate" .github/workflows/ci.yml
```
→ Diff: Gibt es HTML-Dateien die nicht in CI sind?

**L-03 (@keyframes-Namen):**
```bash
grep -n "@keyframes" style.css ueber-mich.css zusammenarbeit.css
```
→ Doppelte Namen = Problem.

**L-04 (Script-Reihenfolge):**
```bash
grep -n "script.js\|count.js\|defer\|async" *.html
```
→ Ist script.js immer vor count.js? Kein defer auf script.js?

**L-05 (CSS-Scope):**
```bash
# Globale Selektoren in seitenspezifischen Dateien
grep -n "\.offer\|\.step\|\.btn\|\.form\|\.shead" zusammenarbeit.css ueber-mich.css
```
→ Falls vorhanden: sollte das nicht in style.css?

**L-07 (Neue Seiten vollständig):**
```bash
ls *.html
grep "html" sitemap.xml | grep -v "http"
grep "Disallow" robots.txt
```
→ Sind alle Seiten korrekt registriert?

**L-10 (MEDIEN.md Vollständigkeit):**
```bash
ls images/ | wc -l
grep -c "^###" MEDIEN.md
```
→ Grobe Plausibilitätsprüfung.

### Schritt 3 — Lücken-Analyse: Was fehlt noch?

Überprüfe die vorhandenen Commands:
```bash
ls .claude/commands/
```

Und frage: Gibt es wiederkehrende manuelle Aufgaben die noch kein Command haben? Typische Kandidaten:
- Dinge die ich in diesem Gespräch manuell gemacht habe und beim nächsten Mal wieder machen müsste
- Dinge die im PROTOKOLL mehrfach als "nicht-offensichtlich" aufgetaucht sind
- Dinge die ich im LEARNINGS.md ohne Command-Verweis gelassen habe

### Schritt 4 — Konkrete Vorschläge ausgeben

Format:

```
### Learnings-Review — [Datum]

**🔴 Sofortige Probleme (bekanntes Muster aktiv verletzt):**
- [Problem] → [Was sofort tun]

**🟡 Offene Risiken (könnte passieren):**
- [Risiko] → [Präventiv-Maßnahme]

**🟢 Alles OK in diesen Bereichen:**
- [Was sauber ist]

**💡 Neue Command-/Workflow-Vorschläge:**
- [Aufgabe] kommt immer wieder vor → Vorschlag: `/neuer-command-name` der [was macht]
- [Lücke im Prozess] → Vorschlag: [konkrete Maßnahme]

**📚 LEARNINGS.md Update-Vorschläge:**
- [Neues nicht-offensichtliches Muster] → sollte als L-XX dokumentiert werden
```

Wenn kein Problem gefunden: „Learnings-Review OK — alle bekannten Muster geprüft, keine Lücken."

## Wann aufrufen

- Am Anfang einer neuen Session wenn größere Arbeit geplant ist
- Nach einem größeren Handoff oder Merge
- Wenn etwas Unerwartetes passiert ist (als Post-mortem-Trigger)
- Einmal pro Monat als Routine-Gesundheitscheck
