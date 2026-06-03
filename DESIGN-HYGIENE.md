# DESIGN-HYGIENE.md — Saubere, driftfreie Daten (verbindlich, egal von wo)

> Gilt überall: Claude Code, VS Code, Claude Design. Zweck: Schluss mit „wir haben es gefixt,
> aber es ist wieder zurückgedriftet". Es darf nur **eine** Stelle geben, an der ein Wert definiert
> ist. Alles andere liest diesen Wert nur. So kann es keine widersprüchlichen/falschen Formatierungen,
> Schriften oder Größen mehr geben, und Design ↔ Code bleiben automatisch synchron.

## Kernprinzip: EINE Quelle der Wahrheit

```
tokens.css   ← HIER (und nur hier) werden Design-Tokens + Schriften definiert
   ▲   ▲
   │   └──< Designsystem.html  (per <link>): zeigt nur, was in tokens.css steht
   │
style.css    (per @import "tokens.css"): definiert Komponenten/Layout über var(--…)
   ▲
index.html · ueber-mich.html · ueber-mich.css · … (nutzen var(--…))
```

- **`tokens.css`** = einzige Definition von Farben, Typo-Skala (`--fs-*`), Zeilenhöhen (`--lh-*`),
  Laufweiten (`--ls-*`), Spacing (`--space-*` + `--pad-card`/`--gap-*`/`--shead-gap`), Radien (`--r-*`),
  Elevation (`--shadow-*`), Motion (`--dur-*`/`--ease-*`), Z-Index (`--z-*`) **und** aller lokalen
  `@font-face`-Schriften.
- **`style.css`** importiert `tokens.css` als allererste Regel (`@import url("tokens.css");`) und baut
  daraus Komponenten/Layout. Es definiert **keine** Tokens neu.
- **Seiten & Seiten-CSS** (`index.html`, `ueber-mich.html`, `ueber-mich.css`, …) greifen Werte **nur**
  per `var(--…)` auf. Keine seitenspezifischen `px`/Hex-Werte für eine Rolle, die ein Token hat.
- **`Designsystem.html`** ist ein **Viewer**: bindet `tokens.css` per `<link>` ein und zeigt die echten
  Werte. Es definiert **keine** Tokens, **keine** Schriften und **keine** Komponenten neu. Eigene Styles
  dort ausschließlich als `ds-`/Doku-Chrome (Layout der Doku-Seite selbst).

## Verboten (erzeugt Drift, wird vom CI-Guard blockiert)

1. **Token an zweiter Stelle definieren.** `--fs-* / --shadow-* / --dur-* / --ease-* / --space-* / --lh-* / --ls-* : wert`
   darf nur in `tokens.css` stehen. Überall sonst nur `var(--…)`.
2. **Externe Schrift-CDN.** Kein `fonts.googleapis.com`, `fonts.gstatic.com`, `jsdelivr`/`unpkg`/`@fontsource`,
   `typekit`. Auch kein `@font-face` mit `url(https://…)`. Schriften **immer** lokal aus `fonts/` (Abmahnrisiko + Konsistenz).
3. **Em-Dash (`—`) in `*.html`.** Brand Voice: natürlich ausformulieren (Punkt, Komma, Doppelpunkt).
   Gilt auch für Alt-Texte/Meta. Echte Komposita-Bindestriche („KI-Workflow") sind erlaubt.
4. **`Designsystem.html` ohne `tokens.css`-Einbindung** oder mit eigenem `:root`/eigener `@font-face`.
5. **`style.css` ohne `@import "tokens.css"`.**
6. (Review, nicht automatisiert) **Hardcodierte Rollen-Werte** (`font-size`/Hex) dort, wo ein Token existiert.

## Workflow bei Token-/Schrift-Änderungen

- **Größe/Farbe/Abstand ändern:** ausschließlich `tokens.css` anfassen. Website **und** Designsystem ziehen
  automatisch nach. Nirgends nachpflegen.
- **Neue Schrift** (z. B. aus einem Claude-Design-Handoff): Datei nach `fonts/`, `@font-face` (lokal) in
  `tokens.css`, externe Referenz entfernen. Recht-/Medientexte im selben PR prüfen (siehe CLAUDE.md).
- **Bewusste Abweichung** von der Skala nur auf ausdrücklichen Wunsch → CSS-Kommentar „bewusster Sonderfall"
  + Eintrag in `PROTOKOLL.md`.

## Vor jedem Handoff / PR

1. `node .github/design-hygiene.cjs` lokal laufen lassen — muss grün sein.
2. Stichprobe `getComputedStyle`: gleiche Rolle = gleicher px-Wert über alle Sektionen.
3. `Designsystem.html` öffnen — zeigt es die aktuellen Werte? (Muss, weil es `tokens.css` liest.)

## Durchsetzung (automatisch)

CI-Job **`design-guard`** in `.github/workflows/ci.yml` ruft `.github/design-hygiene.cjs` bei jedem Push/PR.
Bei einem Verstoß scheitert der Lauf mit klarer Meldung (Datei:Zeile). Die Regel ist damit erzwungen, nicht nur Vorsatz.
