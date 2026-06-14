# /a11y-check — Barrierefreiheits-Audit (WCAG 2.1 AA / BFSG)

Systematischer A11y-Check einer HTML-Datei oder der gesamten Site gegen die Pflichtkriterien aus CLAUDE.md.
Pflichtmaßstab seit 28.06.2025 (BFSG/EAA): **WCAG 2.1 Level AA**.

## Was du tust

Frage mich: **Welche Datei(en) prüfen?** (z.B. `zusammenarbeit.html` oder `alle`)

Dann führe diese Checks durch:

### Check 1 — Semantik & Struktur (Code-Analyse)

Lies die Datei und prüfe:

```bash
# H1-H2-H3 Hierarchie
grep -n "<h[1-6]" DATEI.html

# Bilder ohne oder mit leerem alt-Text
grep -n '<img' DATEI.html | grep -v 'alt='
grep -n 'alt=""' DATEI.html

# Buttons ohne sichtbaren Text (Icon-only ohne aria-label)
grep -n '<button' DATEI.html

# Links ohne Beschreibung
grep -n '<a ' DATEI.html | grep -v 'aria-label\|>[^<]'

# Formular-Labels
grep -n '<label\|<input\|<textarea' DATEI.html
```

Prüfe manuell im Code:
- [ ] H1 genau einmal pro Seite, H2/H3 in logischer Reihenfolge (kein Sprung H1 → H3)
- [ ] Alle `<img>` haben `alt=""` (dekorativ) oder beschreibenden Alt-Text
- [ ] Alle `<button>`-Elemente: entweder sichtbarer Text oder `aria-label`
- [ ] Alle Form-`<input>`: via `for=`/`id` mit `<label>` verknüpft
- [ ] `aria-required="true"` auf Pflichtfeldern
- [ ] `aria-describedby` verweist auf Fehler-Spans
- [ ] `role="alert"` + `aria-live="polite"` auf Formular-Fehler-Containern
- [ ] Nav: `aria-label` auf `<nav>` (z.B. `aria-label="Hauptnavigation"`)
- [ ] Mobile-Menu-Overlay: `role="dialog"` vorhanden?
- [ ] `aria-current="page"` auf dem aktiven Nav-Link
- [ ] `aria-expanded` auf `<button>` die Accordions/Menüs öffnen

### Check 2 — Kontrast (Tabelle mit bekannten Werten)

Bereits bekannte Kontrast-Werte aus dem Projekt:

| Farbe | Auf | Verhältnis | WCAG AA (klein/groß) |
|-------|-----|-----------|----------------------|
| `#2D5A1B` (forest) | Weiß | ~12:1 | ✅ |
| `#6E9B2C` (green-deep) | Weiß | ~3.3:1 | ❌ für Kleintext, ✅ für Großtext ≥24px |
| `#9aa589` (helles Grün) | Forest | grenzwertig | ⚠️ prüfen |
| Weiß | Forest | ~12:1 | ✅ |

**Achtung-Kandidaten im Code suchen:**
```bash
grep -n "green-deep\|#6E9B2C\|#9aa589" DATEI.html DATEI.css
```

Wenn `green-deep` auf weißem Hintergrund bei normalem Fließtext (<24px, nicht bold): **Fehler melden**.

### Check 3 — Touch-Targets & Zoom (manuell/visuell)

- [ ] Alle interaktiven Elemente: Touch-Target ≥ 44px (Buttons, Links, Burger-Icon)
- [ ] Fließtext nicht unter ~16px (`font-size`-Werte im CSS prüfen)
- [ ] Bei 200% Zoom: kein Text abgeschnitten, Horizontal-Scroll vermeiden

### Check 4 — Fokus-Indikatoren (CSS-Check)

```bash
grep -n ":focus\|:focus-visible\|outline" style.css ueber-mich.css zusammenarbeit.css
```

- [ ] Kein globales `outline: none` ohne Alternative
- [ ] Fokus-Indikator auf allen interaktiven Elementen sichtbar

### Check 5 — Motion / Reduced Motion

```bash
grep -n "prefers-reduced-motion" style.css ueber-mich.css zusammenarbeit.css
```

- [ ] Ken-Burns / Drift-Animationen haben `@media (prefers-reduced-motion: reduce)` Fallback
- [ ] Hover-Scale-Animationen (`transition: transform`) ebenfalls

## Ausgabe-Format

```
### A11y-Check — [Dateiname] — [Datum]

**❌ Fehler (WCAG AA verletzt):**
- [Problem] in Zeile X → [Korrektur]

**⚠️ Warnungen (prüfen/verbessern):**
- [Problem] → [Empfehlung]

**✅ OK:**
- [Was in Ordnung ist]

**Nicht automatisch prüfbar (manuell):**
- Zoom 200%: [getestet? / noch offen]
- Touch-Targets: [getestet? / noch offen]
- Screenreader-Test: [getestet? / noch offen]
```

Am Ende: Eintrag in `ACCESSIBILITY_NOTES.md` unter „Datum der letzten Prüfung" ergänzen.

## Aufruf-Varianten

- `/a11y-check` → prüft alle Haupt-HTML-Dateien (index, ueber-mich, zusammenarbeit, tools)
- `/a11y-check index.html` → prüft nur index.html
- `/a11y-check zusammenarbeit.html` → prüft nur zusammenarbeit.html
