# PROTOKOLL · Vroni / InnerLine Website

> Laufendes Entscheidungs- und Änderungsprotokoll für das Design-Atelier.
> Zweck: Regressionen vermeiden. Vor JEDER neuen Runde zuerst die **Invarianten** unten prüfen,
> nach JEDER Änderung den **Verlauf** ergänzen. Geht 1:1 mit ins Repo `vronihei/Website`.

---

## 1. INVARIANTEN — „Das darf nicht (wieder) rausfallen"

Diese Dinge sind bewusst so gebaut und mehrfach abgestimmt. Bei neuen Änderungen **immer gegenprüfen**,
dass sie noch vorhanden/funktionsfähig sind (besonders, wenn CSS-Blöcke umgeschrieben werden).

### Logo / Wortmarke
- [ ] Wortmarke **„innerline"** in der Schrift **Vaelia** (lokal, `fonts/Vaelia.woff2`/`.woff`).
- [ ] **NN-Ligatur**: erreicht über `text-transform:uppercase` + `font-feature-settings:"dlig" 1`.
      DOM-Text bleibt `innerline` (Screenreader/SEO). Markup: `inn` in `.bl-up` (uppercase), `erline` in `.bl-tail`.
- [ ] **Linie hinter dem Wort** (`.bl-word::before`): läuft über das **ganze Wort**, leicht erhöht (`top:46%`).
      Nav = helles Grün `#B9ED72`, Footer = Clay `#BC7B4C` (Kontrast zu weißer Schrift im Footer).
- [ ] Logo-Größe Nav **21px**, optisch mittig (`.nav .brand{transform:translateY(2px)}`), Footer **21px**.

### Motion / Animation  ⚠️ schon einmal versehentlich rausgefallen
- [ ] **Hero-Bild Hover-Zoom**: `.hero-portrait img{position:absolute;inset:0;object-fit:cover;transition:transform 1.5s …}`
      + `.hero-portrait:hover img{transform:scale(1.06)}`. (Diese Regel NICHT löschen, wenn About-CSS umgebaut wird!)
- [ ] **Über-mich-Bilder Hover-Zoom**: `.about-media .am-main img` + `.am-sub img` (scale beim Hover).
- [ ] **Zitat-Band Ken-Burns-Drift**: `.quote-band .qb-img{animation:qbDrift 24s …}`.
- [ ] Alle Motion-Effekte sind unter `@media (prefers-reduced-motion:reduce)` deaktiviert (a11y) — beibehalten.

### Schrift-System
- [ ] **Vaelia = nur Display/Wortmarke** (organische Versalien). NIEMALS für Fließtext oder normale Überschriften.
- [ ] Überschriften = **Open Sauce Sans**, `font-weight:800`. Fließtext Open Sauce Sans 400.
- [ ] In einzelnen Sektionen nicht mehrere Display-Schriften mischen (führte zu „unruhig").

### Mobile
- [ ] **Burger-CTA „Lass uns reden"** im Overlay = **schwarz (`--ink`) mit weißem Text** (`.mobile-menu .btn`).
- [ ] Hero-Bild auf Mobile als **Banner über** der Headline (`.hero-visual{order:-1}`).
- [ ] Über-mich-Bildkomposition zentriert, `.am-sub` **nicht** über den Viewport-Rand (kein Horizontal-Scroll).
- [ ] Timeline (roter Faden) auf Mobile **vertikal** (Badges links, vertikaler Clay-Faden), letztes ohne Linie.
- [ ] Generell: `document.body.scrollWidth <= window.innerWidth` (kein horizontaler Scroll).

### Icons (Konzept = immer gleiches Icon)
- [ ] **Marke / Branding** = Wellen-Icon (roter-Faden-Welle).
- [ ] **Website / Webdesign** = Monitor-Icon.
- [ ] **KI / Workflows** = **Sparkle** (4-Punkt-Stern) — überall identisch (Pain-Liste, Angebot, „Das große Ganze").
- [ ] **Körper / Energie / Yoga / Bewegung** = Herz-Icon.

### Über-mich-Sektion (Home = Teaser)
- [ ] Kurz halten (Teaser). Ausführliche Story kommt später auf eigene Über-mich-Seite. CTA-Wechsel zu „Mehr über mich" erst, wenn die Seite existiert.
- [ ] Kernsatz (Claim) bleibt: „Es ging immer darum, Dinge in eine stimmige Form zu bringen: visuell, strategisch, digital und körperlich." — als ruhiges Statement, **nicht zu massiv** (≈ 20px max).
- [ ] Byline mit Clay-Strich: „Veronika Heidrich · Brand- & Website-Strategin".
- [ ] **Timeline-Stationen (7):** 01 Floristik · 02 Mediendesign (Desc nennt **Grafik**) · 03 Marketing · 04 Webdesign · 05 Branding · 06 KI-Workflows · 07 Bewegung. Titel **einzeilig** (`.faden .fl{white-space:nowrap}`).

---

## 2. ASSETS (müssen ins Repo committet werden!)
> Beim letzten Handoff fehlten Bilder mobil — Ursache war vermutlich nicht-committete Ordner.
> Sicherstellen, dass `images/` und `fonts/` **nicht** in `.gitignore` stehen.

- `images/hero-visual.png` — Hero (Arbeitsplatz/Naturlicht)
- `images/about-workspace.png` — Über mich, Hauptbild
- `images/about-weg.png` — Über mich, kleines versetztes Bild (Bergweg mit rotem Faden)
- `images/zitat-weg.png` — Zitat-Band Hintergrund
- `images/footer-weg.png` — Footer-Hintergrund (Bergpfad)
- `fonts/Vaelia.woff2`, `fonts/Vaelia.woff` — Wortmarke/Display

---

## 3. VERLAUF (neueste zuerst)

### Runde — Feinschliff Über mich + Regressions-Fixes
- Hero-Bild **Motion wiederhergestellt** (`.hero-portrait img` Transition + Hover-Zoom war beim About-Umbau rausgefallen).
- Timeline: **„Marketing"** als eigene Station ergänzt → 7 Stationen; Reihenfolge Floristik → Mediendesign → Marketing → Webdesign → Branding → KI-Workflows → Bewegung.
- **Grafikdesign** in der Mediendesign-Beschreibung verankert („Grafik, Layout und Bildsprache.") — Titel bleibt „Mediendesign".
- Titel der Timeline **einzeilig** erzwungen (`white-space:nowrap`), v.a. „KI-Workflows".
- **KI-Icon vereinheitlicht** → Sparkle (vorher Sonne/Strahlen, uneinheitlich 4 vs. 8 Strahlen).
- „Mein Ansatz"-Accordion geprüft: in dieser Datei korrekt (gleiche Schrift, schließbar, single-open). Buggy war vmtl. die deployte Version → wird beim Handoff überschrieben.
- Dieses Protokoll angelegt.

### Runde — Über-mich-Redesign (editorial) + Kürzung
- Sektion neu gestaltet: 1 Schrift (Open Sauce Sans), editoriale **2-Bild-Komposition** (Haupt- + versetztes Bild), `align-items:start`.
- Roter-Faden-**Timeline** mit nummerierten Clay-Badges; Titel einzeilig + Beschreibungen als gleich aufgebaute Dreier.
- Text mehrfach gestrafft (Claude-Feedback eingearbeitet): Teaser-Länge, aktiver Abschlusssatz, „erstmal nach viel", Webdesign-Desc „Struktur, Inhalte und Sichtbarkeit". Claim-Statement verkleinert (war zu massiv).
- Byline mit Clay-Strich ergänzt.

### Runde — Logo-Linie + Mobile
- Logo-Variante „Linie hinter dem Schriftzug" final (statt Welle davor). Nav helles Grün, Footer Clay (Lesbarkeit).
- Linie über ganzes Wort, leicht erhöht. Logo verkleinert + vertikal zentriert.
- Burger-CTA mobil **schwarz/weiß** gesetzt (deckungsgleich mit Claude-Code-Fix).
- Hero-Bild mobil als Banner über der Headline.

### Runde — Bilder + Logo + Schrift einbinden
- Eigene Bilder in Hero, Über-mich, Zitat-Band, Footer eingebunden (Platzhalter ersetzt).
- Wortmarke „innerline" in Vaelia mit **NN-Ligatur**; Vaelia nur als Display-Font.
- Hover-/Drift-Motion-Effekte ergänzt (Hero/About Hover-Zoom, Zitat-Band Ken-Burns).

---

## 4. OFFENE TODOS (aus dem Briefing)
- [ ] **FAQ-Section** (Accordion im Stil von „Mein Ansatz"), gut für SEO/GEO.
- [ ] **SEO/GEO-Feinschliff** (H2/H3-Struktur, Definitionen, kurze Antwortblöcke; nicht keyword-stuffen).
- [ ] Optionaler **Nutzen-/Vorher-Nachher-Block** (nur wenn nicht redundant zu Problem-/Ansatz-Section).
- [ ] **Eigene Über-mich-Seite** (ausführliche Story: Floristik, Trailrunning, Bailey, KI, Yoga …) + CTA „Mehr über mich" verlinken.
- [ ] **Roter-Faden-Scroll-Effekt** (dezent, SVG-Pfad, scrollbasiert) — erst wenn Inhalte/FAQ/Über-mich/Bilder/Mobile stehen; bei `prefers-reduced-motion` deaktivieren.
- [ ] **A11y-Audit** über die fertige Seite (Kontraste, Fokus, Semantik, Touch-Targets ≥44px).

---

## 5. ARBEITSREGEL
1. Vor Änderungen: Abschnitt **1 (Invarianten)** lesen.
2. Beim Umschreiben von CSS-Blöcken prüfen, ob gemeinsam genutzte Regeln (z. B. `.hero-portrait img`) mit drinbleiben.
3. Nach Änderungen: **Verlauf** ergänzen, ggf. Invarianten/TODOs aktualisieren.
4. Brand Voice 2.0 & BFSG/WCAG-AA (siehe `CLAUDE.md` / `uploads/Vroni_Brand_Voice_2_0.md`) gelten immer.
