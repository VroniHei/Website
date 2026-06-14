# /wissen-update — WISSEN.md aktuell halten

Prüft und aktualisiert `WISSEN.md` damit es immer den echten Projektstand widerspiegelt.
WISSEN.md ist die Datei, die man einer neuen KI-Session anhängt — sie muss verlässlich und aktuell sein.

## Was du tust

### Schritt 1 — Aktuellen Stand ermitteln

Lese diese Quellen ohne Rückfragen:

```bash
# Alle HTML-Seiten
ls *.html

# Custom Commands
ls .claude/commands/

# Offene PRs
gh pr list --state open

# Letzte 5 Commits (für Meilensteine)
git log --oneline -5

# Offene Punkte aus PROTOKOLL (Launch-Bündel / Roadmap)
grep -A20 "OFFENE TODOS\|Roadmap\|Launch-Bündel" PROTOKOLL.md | head -30

# Stand-Datum aktuell?
tail -3 WISSEN.md
```

### Schritt 2 — Abschnitte prüfen und aktualisieren

Gehe jeden Abschnitt in WISSEN.md durch und prüfe ob er noch stimmt:

**Abschnitt 1 — Steckbrief:**
- Stimmt „Live"-URL?
- Ist die Seiten-Beschreibung noch korrekt? (One-Pager vs. Multi-Page)

**Abschnitt 2 — Leistungen:**
- Hat Vroni neue Angebote hinzugefügt oder entfernt?
- Passen die genannten Themen noch?

**Abschnitt 3 — Tech-Stack:**
- Alle aktuellen HTML-Seiten aufgelistet? (indexiert + nicht-indexiert korrekt?)
- Alle Custom Commands in der Liste?
- Neue Tools, Fonts, Infrastruktur-Änderungen?

**Abschnitt 4 — Doku-Landkarte:**
- Alle verlinkten Dateien existieren noch? (`ls brand/ .claude/commands/ *.md`)
- Neue Dokumente die fehlen?

**Abschnitt 5 — Meilensteine:**
- Letzte Einträge korrekt? Neues hinzufügen wenn größere Features deployt wurden.

**Abschnitt 6 — Offene Punkte:**
- Erledigte Punkte entfernen
- Neue offene Punkte hinzufügen
- Prio-Reihenfolge aktuell?

**Abschnitt 7 — Für KI-Content:**
- Stimmen die empfohlenen Anhänge noch?

**Stand-Datum:** Immer auf heute aktualisieren: `_Stand: YYYY-MM-DD — aktuell. Update via /wissen-update._`

### Schritt 3 — Änderungen vornehmen

Nimm alle nötigen Änderungen in `WISSEN.md` vor. Dann kurz melden:

```
WISSEN.md aktualisiert:
- [Was geändert] in Abschnitt X
- Stand-Datum auf YYYY-MM-DD gesetzt

Keine Änderung nötig in: [Abschnitte die schon stimmen]
```

## Wann aufrufen

- Nach jedem Merge der eine neue Seite, ein neues Tool oder größere Feature-Änderung bringt
- Wenn `/neue-seite` eine Seite angelegt hat (dort ist WISSEN.md schon im Pflicht-Update)
- Am Anfang einer neuen Session wenn unklar ist ob WISSEN.md noch aktuell ist
- Monatlich als Routine — sonst veraltet die Datei und ist als KI-Kontext wertlos

## Was WISSEN.md leisten soll

WISSEN.md ist der „Einstieg für eine KI die das Projekt noch nicht kennt". Wenn jemand WISSEN.md + CLAUDE.md + den KI-Brief anhängt, soll sie sofort produktiv arbeiten können — ohne lange Erklärungen.

Konsequenz: Jede Aussage in WISSEN.md muss stimmen. Lieber etwas weglassen als etwas Falsches stehenlassen.
