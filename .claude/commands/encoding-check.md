# /encoding-check — Curly-Quote-Prüfung nach Handoff

Führt den obligatorischen Encoding-Check nach jedem Claude-Design-Handoff durch.

## Was du tust

Führe dieses Bash-Kommando für jede HTML-Datei aus die im Handoff enthalten war:

```bash
grep -Pln '[\x{201C}\x{201D}]' *.html
```

Falls Treffer erscheinen: Liste die betroffenen Zeilen auf mit:

```bash
python3 -c "
import sys
data = open('DATEINAME.html','rb').read()
hits = [i for i,b in enumerate(data) if b == 0xe2 and data[i+1:i+3] in (b'\x80\x9c', b'\x80\x9d')]
for h in hits:
    line = data.count(b'\n', 0, h) + 1
    print(f'L{line}: curly quote at byte {h}')
print('OK' if not hits else f'{len(hits)} curly quotes found!')
"
```

## Was Curly Quotes kaputt machen

Typografische Anführungszeichen `"` `"` (U+201C/201D) als HTML-Attribut-Delimiter machen betroffene Tags für den Browser unsichtbar — stiller Fehler, der im Editor nicht erkennbar ist. Die ganze Section/das ganze Element fehlt dann im DOM.

## Diagnoseregel

Wenn eine Section im Browser leer/unsichtbar ist und kein JS-Fehler vorliegt:
→ DevTools → Elements → suche das Element per ID (`id="kontakt"`)
→ Fehlt es im DOM komplett = Parser-Problem, nicht CSS/JS
→ Dann diesen Check laufen lassen

## Ergebnis

- **Keine Treffer** → "Encoding OK — kein Curly-Quote-Problem gefunden."
- **Treffer** → Betroffene Zeilen anzeigen, manuell oder programmatisch ersetzen, dann nochmal prüfen.
