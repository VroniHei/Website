# /medien-neu — Neues Bild in MEDIEN.md eintragen

Erstellt einen korrekten MEDIEN.md-Eintrag für ein neues Bild. Der CI-Medien-Guard blockiert jeden PR der `images/` ändert ohne MEDIEN.md-Update — dieser Command stellt sicher dass der Eintrag vollständig ist.

## Was du tust

Frage mich:
1. **Dateiname** des Bildes (z.B. `vroni-yoga-terrasse`)
2. **Varianten** vorhanden? (.png + .webp + -960.webp = Standard)
3. **Herkunft**: KI-generiert (ChatGPT/DALL·E, wer hat es erstellt?) oder echtes Foto (Fotograf:in, Lizenz)?
4. **Maße** (Breite × Höhe in px) — ich lese sie mit `sips -g pixelWidth -g pixelHeight images/DATEI.png`
5. **Wo wird es verwendet?** (z.B. "Hero-Bild auf index.html") oder noch nicht (Reserve)
6. **Alt-Text**: Was ist auf dem Bild zu sehen — konkret und für Screenreader nutzbar
7. **Zeigt das Bild eine echte Person?** → Einwilligung/EXIF-Check nötig

Dann schreibe den Eintrag in MEDIEN.md unter dem passenden Abschnitt (3a, 3b, 3c oder neu):

```markdown
### DATEINAME
- **Dateien:** `images/DATEINAME.png` (XXX KB) · `images/DATEINAME.webp` · `images/DATEINAME-960.webp`
- **Maße:** XXXXxXXXX px
- **Herkunft:** KI-generiertes [Typ] (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** YYYY-MM
- **Verwendung:** [wo eingebunden / noch nicht eingebunden (Reserve)]
- **Alt-Text:** [konkreter Alt-Text]
- **Dekorativ:** nein/ja · **KI-Darstellung:** ja/nein
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `DATUM` — Ersterfassung.
```

## Regeln
- Bei echten Fotos: Fotograf:in + Lizenz + Attribution-Pflicht zwingend
- Bei abgebildeten Personen (real): Einwilligung + EXIF-Prüfung vermerken
- Bei `landschaft`-/Natur-Motiven: Immer kurz Provenienz klären (realistisch ≠ immer KI)
- Änderungen immer mit Datum: `2026-06-14 — Ersterfassung`
