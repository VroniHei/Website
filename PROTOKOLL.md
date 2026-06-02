# PROTOKOLL · Vroni / InnerLine Website

> Laufendes Entscheidungs- und Änderungsprotokoll.
> Zweck: Regressionen vermeiden. Vor JEDER neuen Runde zuerst die **Invarianten** unten prüfen,
> nach JEDER Änderung den **Verlauf** ergänzen. Geht 1:1 mit ins Repo `vronihei/Website`.

---

## 0. DOKUMENTATIONSPFLICHT — gilt IMMER, egal von wo bearbeitet wird

**Diese Regel gilt überall: Claude Code, VS Code (GitHub Copilot) und Claude Design.**
Sie ist verbindlich und nicht an ein einzelnes Werkzeug gebunden.

- **Nach JEDER Änderung** wird dieses Protokoll aktualisiert — bevor die Arbeit als erledigt gilt
  (Claude Code: vor dem Commit/Push · Claude Design: vor dem Handoff · VS Code: vor dem Commit).
- Jeder Eintrag dokumentiert **voll einsehbar alle Arbeitsschritte**: **Was**, **Warum**, **Wie**,
  welche **Alternativen/Abwägungen**, welche **Learnings** und welche **Konsequenzen** daraus folgen.
- **Ziel:** Jederzeit und von überall auf dem aktuellen Stand weiterarbeiten können — und der
  Verlauf so lückenlos halten, dass sich der Stand bei Bedarf auf einen **bestimmten Moment
  zurückführen** lässt.
- **Append-only:** Nichts wird gelöscht; bestehende Einträge bleiben als Historie erhalten.
- **Ablauf:** Invarianten prüfen → Änderung → Verlauf (+ ggf. Invarianten/Learnings) ergänzen → committen/pushen bzw. Handoff.

---

## 1. INVARIANTEN — „Das darf nicht (wieder) rausfallen"

### Logo / Wortmarke
- [ ] Wortmarke **„innerline"** in der Schrift **Vaelia** (lokal, `fonts/Vaelia.woff2`/`.woff`).
- [ ] **NN-Ligatur**: `text-transform:uppercase` + `font-feature-settings:"dlig" 1` auf `.bl-up`. DOM-Text bleibt `inn` + `erline`.
- [ ] **Linie hinter dem Wort** (`.bl-word::before`): Nav = `#B9ED72`, Footer = `#BC7B4C`.
- [ ] Logo-Größe Nav + Footer **21px**, Nav mit `translateY(2px)`.
- [ ] **Footer-Tagline**: Wortmarke in `.footer-mark` gewrappt + `<span class="footer-meaning">Die innere Linie, die sich durch alles zieht.</span>` darunter (kursiv, gedämpft).

### Motion / Animation ⚠️ schon einmal versehentlich rausgefallen
- [ ] **Hero-Bild Hover-Zoom**: `.hero-portrait img{position:absolute;inset:0;transition:transform 1.5s …}` + `.hero-portrait:hover img{transform:scale(1.06)}`.
- [ ] **Über-mich-Bilder Hover-Zoom**: `.am-main img` + `.am-sub img` je scale(1.05/1.06).
- [ ] **Yoga-Bild Hover-Zoom**: `.yoga-image img{transition:transform 1.6s …}` + hover scale(1.05).
- [ ] **Zitat-Band Ken-Burns**: `.quote-band .qb-img{animation:qbDrift 24s …}`.
- [ ] **Claim-Band Ken-Burns**: `.claim-band .cb-img{animation:cbDrift 28s …}`.
- [ ] Alle Motion unter `@media (prefers-reduced-motion:reduce)` deaktiviert.

### Schrift-System
- [ ] **Vaelia = nur Display/Wortmarke** (Logo + `about-sign .as-brand`). NIEMALS für Fließtext.
- [ ] Überschriften + Fließtext = **Figtree** (variable font 300–900, lokal in `fonts/figtree-latin-400-800.woff2`). Open Sauce Sans bleibt in `fonts/` als CSS-Fallback, wird aber nicht mehr primär eingesetzt.
- [ ] **`.g`-Akzente** = Newsreader italic (`fonts/newsreader-latin-italic.woff2`). Für dieselbe Klasse aufrecht: `newsreader-latin-500.woff2`.
- [ ] **Alle Schriften lokal in `fonts/`** (Figtree, Newsreader, Open Sauce Sans, Vaelia). **Keine externe Font-CDN** (kein Google Fonts, kein jsDelivr/Fontsource) — datenschutzrechtlich (IP-Übertragung) tabu.
- [ ] **Kein `image-slot.js`** in der Produktionsdatei — stammt aus dem Design-Atelier, hat in Produktion nichts verloren.

### Bilder / Performance ⚠️ neu seit Design-Update V
- [ ] **Alle Bilder als `<picture>` mit WebP-Source + PNG-Fallback**:
  `<picture><source srcset="images/name.webp" type="image/webp"><img src="images/name.png" …></picture>`
- [ ] **Alle `<img>` brauchen `width` und `height`** (Intrinsic-Size → kein Cumulative Layout Shift).
- [ ] **Dekorative Bilder** (Hintergründe): `alt=""` (zitat-weg, claim-weg, footer-weg).
- [ ] **`loading="eager"` nur beim Hero-Bild** (above fold), alles andere `loading="lazy"`.
- [ ] **Preload im `<head>`**: Vaelia-Font + Hero-WebP, da above-fold und render-kritisch.
- [ ] **Preload (lokal)**: `open-sauce-sans-latin-400-normal.woff` zusätzlich zu Vaelia/Hero. **Kein Preconnect/dns-prefetch zu Dritt-CDNs** (Schriften sind lokal).

### Mobile — Bild-Anzeige ⚠️ mehrfach repariert
- [ ] **hero-portrait braucht `width:100%`** im 900px-Breakpoint (flex:none allein → Kollaps, da Inhalt absolut positioniert).
- [ ] **about-media .am-main braucht explizite Höhe** im 900px-Breakpoint (`height:clamp(320px,70vw,520px)`), da `aspect-ratio` allein den Containing-Block nicht zuverlässig aufbaut für absolut positionierte Kinder.

### Mobile — Layout
- [ ] **Burger-CTA** im Overlay = `background:var(--ink); color:var(--chalk)` (schwarz/weiß).
- [ ] **Burger-Button** hat `aria-expanded`, `aria-controls="mobileMenu"` + toggled `aria-label` zwischen „Menü öffnen" / „Menü schließen" (in script.js).
- [ ] Hero-Bild Mobile als **Banner über** der Headline (`.hero-visual{order:-1}`).
- [ ] **Pain-Items** auf Mobile: `flex-direction:row` (Icon links, Text rechts). Invariante dokumentiert im CSS.
- [ ] **Big-Nodes** auf Mobile: `display:grid; grid-template-areas:"icon title" "icon desc"` — Icon bündig neben Titel UND Beschreibung. Invariante dokumentiert im CSS.
- [ ] Timeline auf Mobile vertikal (Badges links, Clay-Faden), letztes ohne Linie.
- [ ] Kein horizontaler Scroll.

### Accessibility / BFSG (ab 28.06.2025 verpflichtend)
- [ ] **`:focus-visible`** — sichtbarer Fokusring (3px solid `var(--green)`) für alle interaktiven Elemente; kein Ring bei Mausklick (`:focus{outline:none}` + `:focus-visible{outline:…}`).
- [ ] **Formular-Validierung**: E-Mail + Nachricht sind Pflicht — JS prüft vor mailto, `.field.error` zeigt visuellen Fehler + `.field-error` Span wird sichtbar.
- [ ] **Formular-Labels**: alle explizit `for=` verknüpft; `aria-describedby` zeigt auf Fehler-Spans; `aria-required="true"` auf Pflichtfeldern.
- [ ] **FAQ**: `<details><summary>` — semantisch zugänglich, kein JS nötig.
- [ ] **Ansatz-Accordion**: `aria-expanded` wird per JS korrekt getoggelt.
- [ ] **H-Struktur**: genau eine H1, saubere H2/H3/H4-Hierarchie, keine Heading-Hierarchie-Lücken.

### Kontaktformular (Option A: Mailto)
- [ ] Button-Text: **„Nachricht abschicken"**
- [ ] Form-Note: *„Deine Nachricht landet direkt bei mir — das Formular öffnet dein Mailprogramm. Ich melde mich in der Regel innerhalb von ein bis zwei Werktagen."*
- [ ] Datenschutz-Hinweis: *„Pflichtfelder mit * · Mit dem Absenden erklärst du dich einverstanden, dass deine Angaben zur Bearbeitung deiner Anfrage verwendet werden. Mehr Infos in der Datenschutzerklärung."*
- [ ] E-Mail-Empfänger: **`info@veronika-heidrich.de`** (nie Platzhalter-Adressen).

### SEO — aktuelle finale Werte
- [ ] **Title**: `Vroni · Brand- & Website-Strategin mit KI als Werkzeug`
- [ ] **Description**: `Personal Branding, Webdesign, KI-Workflows und Bewegung für Selbstständige mit vielen Ideen. Vroni hilft dir, Klarheit zu finden und stimmig sichtbar zu werden.`
- [ ] **OG-Title + Twitter-Title**: identisch mit Meta-Title.
- [ ] **Canonical**: `https://vronihei.github.io/Website/`
- [ ] **Jahr**: `© 2026` im Footer (beim Jahreswechsel anpassen).

### Icons (System — überall identisch halten)
- [ ] **Marke/Branding** = Wellen-Kurve.
- [ ] **Website/Webdesign** = Monitor-Icon.
- [ ] **KI/Workflows** = **Sparkle** (4-Punkt-Stern) — überall identisch.
- [ ] **Körper/Energie/Yoga** = Herz-Icon.

### Über-mich-Signatur
- [ ] Neue Signatur-Struktur: `.about-sign` mit `as-name-row` (grüner Strich + „VRONI HEIDRICH" in Caps) + `as-brand` (Vaelia „INNERLINE" mit grünem Durchstrich).
- [ ] Zitat-Band-Autorenzeile: nur **„Vroni Heidrich"** (kein „Veronika Heidrich", kein Mittelpunkt).
- [ ] Zitat-Band-Anführungszeichen: **`&ldquo;`** (HTML-Entität, nicht ASCII `"`).

### Trust-Section
- [ ] 4 Karten (`trust-ehrliche-einschaetzung`, `trust-direkter-kontakt`, `trust-sortieren-vor-gestalten`, `trust-ki-werkzeug`), alle 1448×1086px.
- [ ] Nav-Link „Werte" → `#trust` (Desktop + Mobile).

### Kundenstimmen
- [ ] **Auskommentiert** (HTML-Kommentar) bis echte Testimonials vorliegen — Platzhalter-Inhalte (Lena M., Tobias R., Sandra K.) dürfen nie öffentlich sichtbar sein.

### Footer
- [ ] 4-Spalten-Layout: `.footer-quote` (Bild-Block mit Claim) + 2 Link-Spalten + `.footer-col--about`.
- [ ] `.footer-quote` nutzt `images/footer-weg.png` + `.webp`.
- [ ] Footer-Links zeigen auf echte Seiten: `impressum.html`, `datenschutz.html`.

### Farb-System (Lilac als wiederkehrender Akzent)
- [ ] **Lilac (`#CBBEF4`)** erscheint als dezenter Background-Blob in mehreren Sections (Arbeitsweise, FAQ, Kontakt u. a.). Konsistent halten.

### FAQ
- [ ] Semantisch `<details><summary>` (Google erkennt FAQ-Schema automatisch).
- [ ] Alle 7 Fragen geschlossen beim Start (kein `open`-Attribut).
- [ ] `.fq-chev` = nur Pfeil, kein Kreis — konsistent mit Ansatz-Accordion.

### Git / Deployment (Workflow-Details: `WORKFLOW.md`)
- [ ] **Branch für Produktion**: `main` — einzige Quelle der Wahrheit. GitHub Pages publiziert direkt aus `main` (kein `gh-pages`-Branch, kein Build-Workflow).
- [ ] **Kein Direkt-Push auf `main`** — jede Änderung über kurzlebigen Branch + Pull Request, Squash-Merge. `main` ist per Branch-Protection geschützt.
- [ ] **Merge nach `main` = Livegang** (~1–2 min). Vor jedem PR Invarianten prüfen.
- [ ] **`pics/` und `uploads/`**: immer in `.gitignore` — Atelier-Rohmaterial gehört nie ins Repo.
- [ ] **Echte Brand-Assets** (Logos etc.) liegen versioniert in **`brand/`** — nicht in `pics/`.
- [ ] **`.nojekyll`** muss im Repo bleiben (sonst verarbeitet GitHub Pages die Seite via Jekyll).
- [ ] **CI grün halten**: `.github/workflows/ci.yml` (HTML, interne Links, Lighthouse-A11y ≥ 0.9). Nicht abschwächen, um „durchzukommen".
- [ ] **Neue Seiten**: `robots: noindex` bis Inhalte final und rechtsgeprüft; in `sitemap.xml` + `robots.txt` berücksichtigen.

### Rechtliche Seiten (Impressum / Datenschutz)
- [ ] **Rechtsstand: DDG** (nicht TMG), **TDDDG** (nicht TTDSG). Bei neuen Texten beachten.
- [ ] `impressum.html`: Adresse **Seeweg 8, 83126 Flintsbach am Inn**; Kleinunternehmer (§ 19 UStG) → **keine USt-IdNr**; **keine Kammer** (kein reglementierter Beruf); **Telefon bewusst NICHT** sichtbar (E-Mail genügt).
- [ ] **KI-Transparenz-Hinweis** im Impressum behalten (Bilder/Texte KI-gestützt, redaktionell verantwortet; Art. 50 KI-VO ab 02.08.2026). **Nicht** in die Datenschutzerklärung (kein Besucherdaten-Thema).
- [ ] `datenschutz.html`: spiegelt den **realen** Stand — **keine Cookies**, `mailto`-Kontakt, **Schriften lokal (keine Font-CDN)**, **cookielose Reichweitenmessung GoatCounter (count.js lokal)**, Hosting GitHub Pages. Bei Hostinger-Umzug Abschnitt 2 anpassen.
- [ ] **Analytics = GoatCounter, cookielos, `count.js` LOKAL** (`data-goatcounter="https://innerline.goatcounter.com/count"`). Kein Cookie-Banner nötig. Datenschutz Abschnitt 6 muss dazu passen.
- [ ] **Bei jeder datenverarbeitungs-/Dritt-Dienst-relevanten Änderung** Rechtstexte im selben PR anpassen (s. `CLAUDE.md`).
- [ ] Vor Livegang final mit **eRecht24-Generator** gegenprüfen.
- [ ] Beide Seiten haben aktuell `<meta name="robots" content="noindex, nofollow">` — entfernen, sobald final.

---

## 2. ASSETS (müssen ins Repo committet sein!)

### Bilder (`images/`) — alle als PNG + WebP (+ optionale `-960.webp` Responsive-Variante)

**Startseite (`index.html`):**
- `images/hero-visual.png/.webp/-960.webp` — Hero Hauptbild (900×1200)
- `images/hero-branding.png/.webp/-960.webp` — Hero Bento oben (1672×941)
- `images/yoga.png/.webp/-960.webp` — Hero Bento unten + Yoga-Section (1200×900) *(ersetzt hero-journaling seit 2026-06-02)*
- `images/about-workspace.png/.webp/-960.webp` — Über-mich-Sektion Startseite, Hauptbild (1200×1500)
- `images/about-weg.png/.webp/-960.webp` — Über-mich-Sektion Startseite, versetztes Bild (900×1200)
- `images/claim-weg.png/.webp/-960.webp` — Claim-Band Hintergrund (1500×1000)
- `images/zitat-weg.png/.webp/-960.webp` — Zitat-Band Hintergrund (1600×900)
- `images/footer-weg.png/.webp/-960.webp` — Footer Bild-Block (1600×1000)
- `images/trust-ehrliche-einschaetzung.png/.webp/-960.webp` — Trust-Card 1 (1448×1086)
- `images/trust-direkter-kontakt.png/.webp/-960.webp` — Trust-Card 2 (1448×1086)
- `images/trust-sortieren-vor-gestalten.png/.webp/-960.webp` — Trust-Card 3 (1448×1086)
- `images/trust-ki-werkzeug.png/.webp/-960.webp` — Trust-Card 4 (1448×1086)

**Über-mich-Seite (`ueber-mich.html`):**
- `images/about-panorama-bailey.png/.webp` — Hero Hauptbild (1448×1086)
- `images/about-arbeiten.png/.webp` — Hero Sub-Bild (1122×1402)
- `images/about-journal-mat.png/.webp` — Gefühl-Sektion + Kontakt-Avatar (1122×1402)
- `images/about-brand-essence.png/.webp` — Wie ich arbeite, Bild 1 (1402×1122)
- `images/about-wireframe.png/.webp` — Wie ich arbeite, Bild 2 (1536×1024)
- `images/about-bewegung-berge.png/.webp` — Bewegung-Sektion (1448×1086)
- `images/about-claim-see.png/.webp` — Claim-Band Hintergrund (1916×821)
- `images/about-persoenlich.png/.webp` — Persönlich-Sektion (1672×941)

> ⚠️ `hero-journaling.png/.webp/-960.webp` wurde 2026-06-02 entfernt — war durch `yoga` ersetzt und nicht mehr referenziert. Eintrag in `MEDIEN.md` als entfernt markiert.

### Fonts (`fonts/`)
- `fonts/Vaelia.woff2`, `fonts/Vaelia.woff` — Wortmarke/Display (nur Logo)
- `fonts/figtree-latin-400-800.woff2` — **Hauptschrift Figtree** (variable font, 300–900) — Überschriften + Fließtext
- `fonts/newsreader-latin-italic.woff2` — Newsreader kursiv (400–600), für `.g`-Akzente
- `fonts/newsreader-latin-500.woff2` — Newsreader aufrecht 500, für `.g` in normaler Schriftlage
- `fonts/open-sauce-sans-latin-400-normal.woff` + `fonts/open-sauce-sans-latin-{500,600,700,800}-normal.woff2` — **CSS-Fallback** (bleibt in `@font-face`, wird nicht mehr primär geladen)

### Seiten (Root)
- `index.html`, `style.css`, `script.js` — Startseite (One-Pager)
- `ueber-mich.html`, `ueber-mich.css` — Über-mich-Unterseite (`.au-`-Klassen, eigene CSS-Datei)
- `impressum.html`, `datenschutz.html`, `barrierefreiheit.html`, `404.html` — Rechts-/Hilfsseiten

---

## 3. VERLAUF (neueste zuerst)

### 2026-06-02 — Vollständige Hygiene-Runde: Datenmüll, Doku-Sync, Cleanup-Regel (Claude Code)

**Was:**
1. **`images/hero-journaling.{png,webp,-960.webp}` entfernt** — 3 Dateien waren vollständig verwaist (kein HTML referenziert sie mehr, seit `yoga` den Slot `.s-journal` im Hero-Bento ersetzt hat). MEDIEN.md-Eintrag als „entfernt" markiert.
2. **`PROTOKOLL.md` Invarianten (Section 1) korrigiert:**
   - Schrift-Invariante: „Open Sauce Sans 800" → **Figtree** als Hauptschrift (war seit der Hero-v4-Session überholt, aber in den Invarianten nicht nachgezogen worden).
   - Fonts-Preload-Invariante: ergänzt um Figtree als render-kritischen Preload.
3. **`PROTOKOLL.md` Section 2 ASSETS** vollständig aktualisiert:
   - Fonts: Open Sauce Sans nun klar als „CSS-Fallback, nicht mehr primär"; Figtree, Newsreader ergänzt.
   - Bilder: Startseiten-Bilder mit `-960.webp`-Varianten; `hero-journaling` als entfernt dokumentiert; 8 neue Über-mich-Bilder eingetragen; Seiten `ueber-mich.html` + `ueber-mich.css` ergänzt.
4. **`PROTOKOLL.md` Section 4 TODOs** auf aktuellen Stand gebracht: Über-mich-Seite ✅, Strukturierte Daten ✅, GoatCounter ✅; neues TODO: Nav-Link `#ueber` → `ueber-mich.html`.
5. **`PROTOKOLL.md` Section 5 Handoff-Checkliste Punkt 5** korrigiert: stand fälschlicherweise „direkt auf `main` arbeiten" — jetzt korrekt: „kurzlebiger Branch + PR".
6. **`MEDIEN.md` Schnelltabelle** (Section 2): 8 neue about-*-Bilder eingetragen; hero-journaling als entfernt markiert; yoga-Verwendung präzisiert (Hero-Bento + Yoga-Sektion).
7. **`WISSEN.md`** aktualisiert: ueber-mich.html + ueber-mich.css in Tech-Stack; Meilensteine + Offene Punkte aktuell.
8. **`PROJECT.md`** auf aktuellen Stand gebracht: Status-Tabelle (91 % Fortschritt), Projektstruktur vollständig neu (alle echten Dateien), Offene Fragen (#6/#7/#8 erledigt), Font-Tabelle korrigiert (Figtree/Newsreader/Open-Sauce-Fallback/Vaelia), `_Letzte Aktualisierung_` auf 2026-06-02.
9. **`sitemap.xml`**: `ueber-mich.html` mit `lastmod:2026-06-02` + priority 0.8 ergänzt; `index.html` lastmod auf 2026-06-02 gesetzt.
10. **`CLAUDE.md`**: Neue Sektion **„Hygiene-Checkliste — nach jeder größeren Session (Definition of Done)"** eingefügt — strukturierte Checkliste für Datenmüll, Dokumentations-Sync und Code-Korrektheit, als feste Regel verankert.

- **Warum:** Vronis Wunsch: „nichts in den Daten, das nicht gebraucht wird" + vollständige, widerspruchsfreie Dokumentation. Typischer Effekt mehrerer Handoff-/Implementierungs-Runden: Doku bleibt an einzelnen Stellen hinter dem Code zurück; ein dedizierter Hygiene-PR schließt diese Lücken.
- **Wie:** Systematische Durchsicht aller Dokus (PROTOKOLL, MEDIEN, WISSEN, PROJECT), Abgleich mit tatsächlichem Repo-Stand (`git ls-files`, HTML-Grep), gezielter Edit pro Fundstelle.
- **Abwägungen:** `hero-journaling`-Bilder gelöscht statt nur als „ungenutzt" markiert — User-Vorgabe war explizit „nichts Unnötiges". Die Bilder sind KI-generiert und können bei Bedarf über `brand/bildwelt-und-prompts.md` reproduziert werden.
- **Konsequenz:** Repo ist jetzt konsistent: Dateien, MEDIEN.md, PROTOKOLL.md Invarianten und alle Wissensdokumente stimmen überein. Die neue Hygiene-Checkliste in `CLAUDE.md` stellt sicher, dass dieser Sync-Aufwand künftig nach jeder größeren Session anfällt — nicht erst wenn er sich angehäuft hat. Keine Änderung an der Live-Seite, keine neuen Dritt-Dienste.

### 2026-06-02 — Accordion-Fix + Über-mich-Seite v2 mit neuen Bildern (Claude Code)
**Was:**
1. **`style.css`**: `.principle.is-open .pbody{max-height:280px→500px}` — Mobile-Fix: Text in den Accordion-Boxen des grünen „Mein Ansatz"-Bereichs wurde unten abgeschnitten, da 280px auf schmalen Viewports (≤390px) für den umbrochenen Text bei 17px/1.6 nicht reicht.
2. **Neue Bilder** (`images/about-*.png + .webp`, 8 neue Motive): Kopiert aus `pics/` (ChatGPT-generierte KI-Fotos vom 2026-06-02) und in `images/` mit den kanonischen `about-*`-Namen abgelegt; WebP via `sharp-cli` (Qualität 82) konvertiert. Zuordnung: `about-panorama-bailey` (Vroni + Bailey, Berge sitzend), `about-arbeiten` (Vroni schreibt am Fenster, Bailey), `about-journal-mat` (Yoga indoor, schwarzer Lab), `about-brand-essence` (Brand Strategy Workspace), `about-wireframe` (Website-Wireframe-Skizze), `about-bewegung-berge` (Yoga Terrasse, Berge, Hund), `about-claim-see` (See-Panorama, dekorativ), `about-persoenlich` (Spaziergang Wald, Hund).
3. **`ueber-mich.css`** (neue Datei, 190 Zeilen): Seitenspezifische Styles mit `.au-`-Präfix aus Claude Design Handoff übernommen. Ersetzt das bisherige Inline-`<style>`-Block-Muster.
4. **`ueber-mich.html`** (komplett neu): Von `.um-`-Klassen (Inline-Style) auf `.au-`-Klassen (externe `ueber-mich.css`) umgestellt. 10 Sektionen: Hero mit Bildkomposition (Haupt + Sub-Bild + Chip), Gefühl, Stationen-Timeline (6), Roter-Faden-Dark, Wie-ich-arbeite (Bild-Duo + 5 Prinzipien), Bewegung, Für-wen, Erwartungen (6 Cards), Claim-Band, Persönlich, Kontaktformular (gleiche IDs wie Startseite → script.js funktioniert ohne Anpassung; Dropdown auf „Mischung" vorbelegt). Produktion: `noindex`, Favicon, Manifest, Font-Preloads, GoatCounter, kein `image-slot.js`.
- **Warum:** User-Request: neues Claude Design (`.au-`-Version) live bringen + Mobile-Accordion-Bug fixen. Neue Bilder aus KI-Session (2026-06-02) existierten im `pics/`-Ordner, waren aber noch nicht in `images/` überführt.
- **Abwägungen:** max-height 500px (statt `none`) — ermöglicht CSS-Transition; 500px ist deutlich über dem realen Maximalinhalt (~200px). Bilder als PNG+WebP statt WebP+JPG — Quelle ist PNG (ChatGPT-Export), Konvertierung PNG→JPG→WebP wäre ein unnötiger Schritt ohne Qualitätsvorteil.
- **Recht/Datenschutz/Fonts:** Neue Bilder sind KI-generiert (ChatGPT, Vroni als Auftraggeberin) — MEDIEN.md muss aktualisiert werden (separater Schritt, CI-Gate). Keine neuen externen Ressourcen, kein neuer Dritt-Dienst, keine CDN.
- **Konsequenz:** MEDIEN.md: 8 neue Einträge anlegen (CI-Gate `Medien-Register-Check` wird PR ansonsten blockieren). Bilder im `pics/`-Ordner bleiben dort (gitignoriert), nur die optimierten Varianten in `images/` sind im Repo.

### 2026-06-02 — Fix: CLS auf Rechtsseiten (Font-Preload) (Branch `fix/legal-cls-fontpreload`)
- **Was:** Auf `datenschutz.html`, `impressum.html`, `barrierefreiheit.html`, `404.html` die zwei Font-Preloads
  (`figtree-latin-400-800.woff2`, `Vaelia.woff2`) im `<head>` ergänzt — analog zur Startseite.
- **Warum:** Mobile-Diagnose zeigte CLS 0,137 auf `datenschutz.html` (Ziel ≤0,1). Ursache (lokal verifiziert):
  Rechtsseiten preloadeten die Schrift **nicht** → langer Textblock rendert erst in Fallback und rückt beim
  Figtree-Swap nach. Startseite (mit Preload) hatte CLS 0,001.
- **Wie:** Preload lädt die Schrift früh → Wechsel passiert vor dem ersten Zeichnen → kein Nachrücken.
  **Optik bleibt 1:1 gleich** (kein Designeingriff, nur Stabilität beim Laden). HTML validiert (exit 0), Font-Dateien existieren.
- **Konsequenz:** CLS auf allen Rechtsseiten stabilisiert; rein technischer, unsichtbarer Fix. Schließt die Performance-Runde ab.

### 2026-06-02 — CI: Performance-Diagnose (Main-Thread + CLS) (Branch `ci/perf-diagnostics`)
- **Was:** Mobile-Lighthouse-Job um eine Diagnose-Ausgabe erweitert (`.github/lh-diagnose.cjs`): liest die
  `.lighthouseci/`-Reports und druckt pro Seite Performance, TBT, **JS-Ausführung (bootup-time)**, die
  **Main-Thread-Aufschlüsselung** (Scripting vs. Rendering/Paint) sowie **CLS + verursachende Layout-Shift-Elemente**.
- **Warum:** TBT lag mobil bei ~404 ms — unklar, ob das **`script.js`** oder das **Rendering der Blur-Effekte** treibt.
  Vor dem Fix erst die Ursache messen (kein Blindflug). Liefert zugleich den CLS-Verursacher auf `datenschutz.html`.
- **Wie:** `lhci autorun … || true` (nicht blockierend) + Node-Skript, das die LHR-JSONs auswertet. Reine Diagnose.
- **Konsequenz:** Keine Live-Änderung. Nächster Schritt: gezielter Fix (TBT-Quelle + Datenschutz-CLS) auf Basis dieser Ausgabe.

### 2026-06-02 — Performance: Hintergrund auf Mobil statisch (Branch `perf/mobile-static-bg`)
- **Was:** `@media (max-width:900px)`-Block in `style.css`, der die dekorativen Hintergrund-Animationen abschaltet
  (`.hb-blob`, `.hb-soft .s-img`, `.quote-band .qb-img`, `.claim-band .cb-img`, `.steps-orb-*`). **Desktop bleibt animiert.**
- **Warum:** Mobile-Lighthouse (#27) zeigte TBT 436 ms (Ziel ≤200). Die 4 großen `filter:blur(70px)`-Blobs sind teuer,
  weil der Weichzeichner pro Animations-Frame neu gerastert wird. Auf schwacher Mobil-GPU (4×-Drossel) kostet das spürbar.
  Vronis Idee: am Desktop animiert, mobil statisch — Akku/Flüssigkeit schonen.
- **Wie:** Animationen mobil auf `none` (statisch = einmal zeichnen). Look/Blur bleibt erhalten, nur ohne Bewegung.
  `prefers-reduced-motion`-Block bleibt zusätzlich bestehen (additive Ergänzung, keine Invariante verletzt).
- **Ehrlichkeit/Messung:** TBT kommt teils aus diesem Render-Aufwand, teils evtl. aus `script.js`. Ob diese Änderung
  allein 82→90+ schiebt, zeigt der Mobile-CI-Lauf — falls nicht, ist der nächste Hebel `script.js`. (Daten/Netzwerk
  unberührt — CSS-Animation kostet CPU/GPU, keine Bytes.)
- **Konsequenz:** Desktop-Erlebnis unverändert; Mobil weniger GPU/Akku-Last. Reine CSS-Änderung.

### 2026-06-02 — CI: Mobile-Lighthouse (informativ) (Branch `ci/lighthouse-mobile`)
- **Was:** Neuer CI-Job `lighthouse-mobile` + `lighthouserc.mobile.json`. Fährt Lighthouse mit **mobiler Emulation**
  (lhci-Default: Moto G4 / Slow-4G, kein `preset:desktop`). Zusätzliche `largest-contentful-paint`/`cumulative-layout-shift`/
  `total-blocking-time`-Asserts → die echten CWV-Zahlen erscheinen im Log.
- **Warum:** Bisher maß die CI nur Desktop; der Mobil-Gewinn aus den responsiven Bildern (#26) war unsichtbar.
  Jetzt dauerhaft messbar.
- **Wie:** Bewusst **nicht blockierend** — alle Asserts auf `warn` (schwankende Mobil-Scores sollen `main` nicht rot machen).
  Eigene Config-Datei, parallel zum bestehenden Desktop-Job.
- **Alternativen:** Mobil als harte Gates (`error`) — verworfen (zu fragil); erst Baseline sammeln, später ggf. verschärfen.
- **Konsequenz:** Reiner CI-/Mess-Zuwachs, keine Live-Änderung. Liefert ab jetzt echte mobile LCP/CLS/TBT-Werte.

### 2026-06-02 — Performance: Responsive Bilder (srcset) + Hero-fetchpriority (Branch `perf/responsive-images`)
- **Was:** Für alle 13 Listenbilder eine `-960.webp`-Variante (max. 960 px) generiert und im `<picture><source>` per
  `srcset`/`sizes` eingebunden. `fetchpriority="high"` auf das Hero-LCP-Bild (`hero-visual`) gesetzt. `MEDIEN.md` aktualisiert.
- **Warum:** Datenbasierte Messung (sharp) zeigte: gleich-große WebP-Neukodierung bringt fast nichts (1,55→1,42 MB),
  aber **responsive Größen sparen mobil ~57 %** (1,55 MB → ~0,7 MB). Klassische „properly size images"-Chance.
- **Wie:** Varianten aus den PNG-Originalen (verlustfrei als Quelle, q78). Markup **desktop-sicher**:
  `sizes="(max-width: 768px) 100vw, <volle Breite>px"` → großer Screen lädt weiter die volle `.webp` (keine Qualitätseinbuße),
  nur Mobil die 960er. PNG-Fallback unverändert → **Invariante „WebP-Source + PNG-Fallback" bleibt erfüllt**.
- **Messung/Grenzen:** Exakte Lighthouse-CWV ließen sich hier **nicht** abnehmen (kein lokales Chrome; PSI-API ohne Key = 429).
  Byte-Ersparnis ist aber deterministisch gemessen. Verifikation der Live-Scores: PageSpeed Insights auf der Live-URL nach Deploy.
- **Alternativen/Abwägungen:** (a) WebP gleich groß neu kodieren — verworfen (kaum Effekt, Qualitätsrisiko).
  (b) Mehrere Breiten (480/960/1440) — vorerst nur 960er (ein File je Bild, klarer Gewinn, wenig Komplexität);
  feinere Breiten + präzise `sizes` als spätere Optimierung offen. (c) PNG-Fallbacks verkleinern — separates Thema (Repo-Gewicht).
- **Konsequenz:** Mobile Bildlast ~halbiert; Desktop unverändert. +916 KB Repo (13 Varianten). HTML lokal validiert.

### 2026-06-02 — Wissens-Index `WISSEN.md` angelegt (Branch `docs/wissen-uebersicht`)
- **Was:** Neue Übersichtsdatei `WISSEN.md` — Steckbrief, Leistungen, Tech-Stack, Doku-Landkarte, Meilensteine,
  Roadmap und „was einer KI anhängen" für Content-Generierung.
- **Warum:** Vronis Wunsch nach einer abrufbaren Wissensbasis. Bewusst als **schlanker, versionierter „RAG-Ersatz"**
  (kuratierte Markdown-Doku) statt eines echten RAG-Systems — passt zur Projektgröße und zum „schlank halten"-Ziel.
- **Wie:** Verdichtet vorhandene Doku und verlinkt sie; kein Duplizieren von Details (die bleiben in den Quell-Dateien).
- **Learning/Empfehlung:** RAG-Infrastruktur erst sinnvoll, wenn Wissensvolumen das KI-Kontextfenster sprengt
  (viele Beiträge/Jahre Historie). Bis dahin: kuratierte Docs + diese Index-Datei.
- **Konsequenz:** Reine Doku, keine Live-Änderung.

### 2026-06-02 — CI „Media-Guard": Medienregister erzwingen (Branch `ci/medien-guard`)
- **Was:** Neuer Job `medien-guard` in `.github/workflows/ci.yml` (nur bei Pull Requests). Schlägt fehl, wenn im PR
  `images/` geändert wurde, ohne dass `MEDIEN.md` im selben PR aktualisiert wird. Hinweis darauf in `CLAUDE.md` ergänzt.
- **Warum:** Macht die Medien-Dokumentationspflicht **erzwingbar** statt „guter Vorsatz" — Antwort auf Empfehlung
  „CI-Media-Guard" und auf Vronis Wunsch, die Datenstruktur dauerhaft sauber/lückenlos zu halten.
- **Wie:** `git diff --name-only base...head` ermittelt die PR-Änderungen; greift nur, wenn `^images/` betroffen ist.
  Kljuge Fehlermeldung verweist auf die Regel. YAML gegen Parser validiert.
- **Alternativen:** Separates Workflow-File — verworfen zugunsten eines Jobs in der bestehenden `ci.yml` (weniger Dateien, übersichtlicher).
- **Konsequenz:** Reiner CI-Guard, keine Live-Änderung. Ab jetzt erzwingt die Pipeline die Medien-Doku.

### 2026-06-02 — Bildwelt-/Prompt-Guide gesichert + Versionierungs-Konvention (Branch `docs/bildwelt-prompts`)
- **Was:** Von Vroni gelieferten Reproduktionsguide als `brand/bildwelt-und-prompts.md` ins Repo aufgenommen
  (Masterprompt, 17 Motiv-Prompts, Negativ-Prompts, Stilformel, Kurzbriefing). In `MEDIEN.md` verlinkt;
  zusätzlich **Versionierungs-Konvention** bei Bild-Austausch und präzisierter Prompt-Hinweis ergänzt.
- **Warum:** „Rezeptbuch" für konsistente neue Bilder dauerhaft sichern (lag bisher nur im ChatGPT-Verlauf →
  Verlustrisiko). Antwort auf Empfehlung „Master-Originale & Prompts sichern".
- **Wie:** Guide als eigene Brand-Referenz in `brand/` (statt Register zu überladen). `MEDIEN.md` bleibt das
  schlanke Register und verweist auf den Guide.
- **Wichtige Ehrlichkeit:** Exakte 1:1-Original-Prompts sind laut Quelle **nicht** rekonstruierbar; die Prompts im
  Guide sind reproduzierbare Rekonstruktionen. Eine erzwungene Bild↔Prompt-Zuordnung wurde **bewusst vermieden**
  (keine falsche Provenienz) — Zuordnung trägt Vroni je Bild nach.
- **Rechtstexte:** Bewusst **nicht** geändert — siehe Learning unten (kein öffentliches Bildquellenverzeichnis nötig,
  da alle Bilder Eigenerzeugung ohne Dritt-Lizenz/Attributionspflicht).
- **Konsequenz:** Reine Doku/Brand-Referenz, keine Live-Änderung, keine neuen Dienste/Datenflüsse.

### 2026-06-02 — Medienregister `MEDIEN.md` + Dokumentationspflicht (Branch `docs/medien-doku`)
- **Was:** Neues lebendes Register `MEDIEN.md` für alle Bilder/Medien angelegt (13 Bilder, je PNG-Original + WebP-Variante,
  mit Maßen, Verwendung, Alt-Text, Dekorativ-Flag, Rechten, Änderungs-Log). Neue **verbindliche Regel** in `CLAUDE.md`
  („Medien-Dokumentationspflicht"): jede Medien-Änderung aktualisiert den Eintrag im selben PR mit datiertem Vermerk.
- **Warum:** Vronis Wunsch nach lückenloser Herkunft/Provenienz — gerade im KI-Zeitalter (woher kommt welcher Inhalt).
  Verhindert „Datenwüste" und macht Varianten/Rechte jederzeit nachvollziehbar.
- **Wie:** Dateinamen, Größen, Maße, Verwendung (welche Seiten) und Alt-Texte **automatisch aus Repo + HTML extrahiert**.
  Erstellungsdatum & Prompt als „— offen —" markiert (ergänzt Vroni). Abgrenzung dokumentiert: `MEDIEN.md` = Register,
  `PROTOKOLL.md` = Historie.
- **Wichtige Provenienz-Befunde:** Alle Bilder KI-generiert (ChatGPT/DALL·E) von V. Heidrich → Nutzungsrechte bei ihr,
  rein KI-Werke ohne eigenen Urheberschutz. Personen auf `about-workspace`/`hero-journaling` sind **KI-Darstellungen**,
  keine realen Fotos → kein „Recht am eigenen Bild". Hinweise zu EXIF-Hygiene (echte Fotos) und C2PA als Ausblick ergänzt.
- **Alternativen/Abwägungen:** Register in `PROTOKOLL.md` integrieren — verworfen (vermischt Historie mit Zustand).
  Optionaler CI-„Media-Guard" (PR scheitert, wenn `images/` ohne `MEDIEN.md`-Update geändert wird) als spätere
  Härtung vorgeschlagen, hier bewusst noch nicht gebaut (Scope/Workflow-Entscheidung).
- **Learning:** Alt-Texte sind zugleich Content & A11y → gehören ins Register und müssen synchron zum HTML bleiben.
- **Konsequenz:** Reine Doku — keine Änderung an der Live-Seite, keine neuen Dienste/Datenflüsse. Rechtstexte unberührt.

### 2026-06-02 — SEO/GEO: Strukturierte Daten auf Startseite (Branch `feat/structured-data`)
- **Was:** Zweiten JSON-LD-Block in `index.html` (`<head>`) ergänzt — ein `@graph` mit **Person** (Veronika Heidrich / „Vroni"), **ProfessionalService** („InnerLine · Veronika Heidrich") und **WebSite**. Der bestehende `FAQPage`-Block bleibt unverändert daneben.
- **Warum:** Prio-6-Empfehlung der Markenrecherche. Echter GEO/SEO-Nutzen (Google Knowledge, KI-Antworten) — und zwar nur auf der **indexierbaren** Startseite (die Rechtsseiten sind bewusst `noindex`).
- **Wie:** Daten 1:1 aus belastbaren Quellen gezogen — Adresse aus `impressum.html` (Seeweg 8, 83126 Flintsbach am Inn), Instagram `vronihei` als einziges `sameAs`, Leistungen aus Brand-Voice/CLAUDE.md. Verknüpfung via `@id` (Person `worksFor` → ProfessionalService; WebSite `publisher` → ProfessionalService). Beide JSON-LD-Blöcke gegen JSON-Parser validiert.
- **Bewusst WEGGELASSEN (kein Cargo-Cult):**
  - **BreadcrumbList** — für einen One-Pager ohne Hierarchie ohne Mehrwert (und potenziell als irreführend wertbar). Erst sinnvoll, wenn echte Unterseiten mit Struktur existieren.
  - **Offer/Preise** — Vroni arbeitet bewusst ohne fixe Paketpreise; erfundene Preise im Schema wären falsch.
  - **Korrektur zu „SEO-Baustelle Unterseiten" aus dem Baseline-Audit:** Die niedrigen SEO-Scores (58–66) von impressum/datenschutz/barrierefreiheit/404 sind **kein Mangel**, sondern Folge des gewollten `noindex` (Lighthouse-Audit „blocked from indexing"). Meta-Descriptions dort = Kennzahlen-Kosmetik ohne Realnutzen → bewusst nicht gemacht.
- **Learning:** Nur Schema einsetzen, das die echte Seitenstruktur abbildet; keine Werte erfinden (Adresse/Links aus echten Quellen).
- **Konsequenz:** Reine `<head>`-Ergänzung, **keine** sichtbare Änderung, kein neuer Dritt-Dienst/Datenfluss → Rechtstexte unberührt.

### 2026-06-02 — Hygiene-Runde 1: Repo entschlacken (Branch `chore/hygiene-cleanup`)
- **Was:** Eindeutig sichere Ballast-/Tooling-Dateien aus dem Repo entfernt und per `.gitignore` dauerhaft ausgeschlossen:
  `Screenshots Arbeitsdateien/` (~15,5 MB Arbeits-Screenshots), `skills/` (Dublette von `.claude/skills/`),
  `skills-lock.json`, `.claude/skills/`, `.agents/skills/` (Claude-Tooling-Caches, kein Website-Inhalt).
- **Warum:** Baseline-Audit (2026-06-02) zeigte ~42 MB von 44,8 MB Repo als Ballast. Ziel: „schlank & sauber",
  und mit `.nojekyll` wurde all das bisher auch noch **öffentlich mitdeployed**.
- **Wie:** `git rm -r` der Kandidaten + neue `.gitignore`-Abschnitte (Screenshots, Tooling-Skill-Caches).
  Alle entfernten Pfade vorher geprüft: **nirgends** in HTML/CSS/JS referenziert.
- **Bewusst NICHT angefasst (Grenzfälle / Invarianten):**
  - `brand/` — laut `.gitignore`-Kommentar **absichtlich versioniert** (Quelle der Wahrheit für Logos).
  - `images/*.png` — sind die **Pflicht-WebP-Fallbacks** (Invariante „Bilder/Performance"); Optimierung = eigener Performance-Schritt, kein Löschen.
  - `image-slot.js`, `Designsystem.html` — in `CLAUDE.md` als Projektdateien gelistet → zur Klärung an Vroni offen.
- **Alternativen:** PNG-Fallbacks gleich mit-optimieren — verworfen, gehört in den dedizierten Performance-PR (Trennung sauber halten).
- **Learning:** `.gitignore` dokumentierte bereits die Absicht zu `brand/` — vor dem Löschen lohnt der Blick in vorhandene Regeln.
- **Konsequenz:** Repo deutlich schlanker; keine Funktions-/Designänderung an der Live-Seite. Rechtstexte unberührt (kein Dritt-Dienst/Datenfluss verändert).

### 2026-06-01 — Design-Feinschliff: Typo-System, Hero, Sektionen (Branch `main`)

**Typografie-System (alle Änderungen in `style.css`):**
- **Globale Heading-Regeln** als einzige Quelle der Wahrheit (Prinzip jetzt etabliert):
  - `h1,h2`: `font-weight:650`, `font-size:clamp(32px,3.9vw,48px)`, `letter-spacing:-.025em`, `line-height:1.07`
  - `h3,h4`: `font-weight:650`
  - Section-spezifische `font-weight`/`font-size`/`letter-spacing`/`line-height` aus allen H2/H3-Regeln entfernt
- **Display-Texte**: `quote-band q`, `cb-claim`, `footer-quote .fq-text` → `font-weight:650` (war 800)
- **Eyebrow `.lbl`**: Uppercase + 11px — bewusst beibehalten (Mixed-Case-Versuch war falsch und wurde revertiert)
- **Ansatz-Prinzipien**: `.principle .pn` → 700/14.5px, `.pt` → 18px, `.pbody .ptxt` → 17px, `.body p` → 17px

**Hero v4 Bento — Korrekturen:**
- Grid: `.9fr 1.1fr` → `1fr 1fr` (symmetrische Spalten)
- `padding-top`: 148px → 176px (optischer Nav-Ausgleich)
- Text linksbündig (`.hb-copy` kein `text-align:center`)
- Mobile: `.s-brand` + `.s-journal` ausgeblendet, `.s-main` auf `aspect-ratio:4/3` erhöht

**Sektions-Fixes:**
- **Über mich**: `.as-line{display:none}` (Strich vor Name weg), `.as-brand{margin-left:0}` (Logo linksbündig ohne Einrückung)
- **Zitat-Band**: `blockquote{max-width:520px}` → 2–3-zeiliger Umbruch
- **H2 Ansatz**: Section-Regel bereinigt, globale Regel greift

### 2026-06-01 — Hero v4 Bento + Figtree/Newsreader (Branch `main`)
- **Hero v4 Bento**: altes `hero-grid`-Layout ersetzt durch `hero--bento` mit animiertem Blob-BG + 3-Bild-Soft-Grid (`.hb-soft`).
- **Neue Bilder**: `hero-branding.png/webp` + `hero-journaling.png/webp` von Desktop in `images/` übernommen.
- **Neue Fonts lokal gehostet**: `figtree-latin-400-800.woff2` (variable), `newsreader-latin-italic.woff2`, `newsreader-latin-500.woff2`.
- **`--ff` auf Figtree** umgestellt (Open Sauce Sans bleibt als Fallback in `@font-face`).
- **`.g` global**: jetzt `Newsreader italic` (nicht mehr reine Farbe). Dunkle Sektionen (quote-band, cb-claim, ansatz h2, contact h2, footer-quote) behalten `color:var(--green)` via globalem Override.
- **Pain-Section**: `.hl` → `.g` (Newsreader italic statt grün-deep).
- **`data-topic="mischung"`** auf Hero-CTA erhalten.
- **Kein Google Fonts CDN**, kein `image-slot.js`, korrekte Rechtseiten-Links.

### 2026-06-01 — Analytics: GoatCounter (cookielos, count.js lokal) (Branch `feat/analytics-goatcounter`)
- **Was:** Cookielose Reichweitenmessung via GoatCounter (`innerline.goatcounter.com`) auf allen 5 Seiten.
- **Warum:** Veronika will belastbare Besucherzahlen zur Optimierung — ohne Cookie-Banner/DSGVO-Aufwand.
- **Wie:** GoatCounter-Snippet vor `</body>` (index, impressum, datenschutz, barrierefreiheit, 404);
  **`count.js` lokal gehostet** (aus GoatCounter-GitHub-Repo, ISC-Lizenz) → einzige externe Verbindung ist
  der anonyme Zählaufruf. `datenschutz.html`: neuer Abschnitt 6 „Reichweitenmessung (GoatCounter)",
  Abschnitt 5 (Cookies) präzisiert, Abschnitt 4 (Exception) ergänzt, „Deine Rechte" → 7.
- **Alternativen:** GA4 verworfen (Cookie-Banner + US-Transfer); Plausible verworfen (9 €/Mo zu teuer);
  externes `count.js` von `gc.zgo.at` zugunsten lokaler Auslieferung verworfen (konsistent zur Font-Regel).
- **Learning:** `count.js` honoriert **kein** DNT automatisch (daher kein DNT-Versprechen im Datenschutz);
  Opt-out via JS-Blockieren / `skipgc`-Flag. Funktioniert schon auf der `github.io`-URL, läuft nach
  Domain-Umzug weiter (Domain dann in GoatCounter-Settings ergänzen).
- **Konsequenz:** Kein Consent-Banner nötig; bei Wechsel auf cookie-/US-Tracking wäre einer Pflicht.

### 2026-06-01 — Roadmap & Editor-Idee dokumentiert (Branch `docs/roadmap-launch-und-ideen`)
- **Was:** Das gebündelte **Launch-Vorhaben** (Hosting→Hostinger, Domain, Search Console, GoatCounter-Analytics,
  noindex entfernen, v1.0) als TODO-Gruppe in Abschnitt 4 festgehalten; veraltete TODOs (Favicon) abgehakt.
- **Außerdem:** Veronikas Vision eines **KI-Admin-Editors** (Region markieren → beschreiben → KI setzt um) als
  offene Frage 11 in `PROJECT.md` mit ehrlicher Einschätzung/Optionen dokumentiert.
- **Warum:** Sessions/Container sind vergänglich — die **Doku ist das Gedächtnis**. So nimmt jede künftige
  Session den Faden hier zuverlässig wieder auf, wenn Veronika Zeit hat.

### 2026-06-01 — Font-Regel „immer lokal" werkzeugübergreifend verankert (Branch `docs/font-regel-lokal`)
- **Was:** Verbindliche Regel etabliert: Schriften werden IMMER lokal gehostet, nie über externe Font-CDN.
- **Warum:** Damit künftige neue Schriften (z. B. aus einem Claude-Design-Handoff) nicht versehentlich
  wieder eine externe CDN einschleppen und das IP-/Abmahnrisiko zurückbringen.
- **Wie:** Neue Regel-Sektion in `CLAUDE.md`; Kurzfassung in `.github/copilot-instructions.md`; Handoff-
  Checkliste (Abschnitt 5) erweitert; `WORKFLOW.md` Abschnitt 4 ergänzt. (Invariante in Abschnitt 1 existierte schon.)
- **Konsequenz:** Gilt für Claude Code, VS Code und Claude Design gleichermaßen — wie die Dokumentationspflicht.

### 2026-06-01 — Schriften lokal hosten (Branch `privacy/fonts-lokal`)
- **Was:** Open Sauce Sans nicht mehr von jsDelivr (CDN), sondern lokal aus `fonts/`.
- **Warum:** Eine externe Schrift-CDN überträgt die Besucher-IP an den Anbieter (hier jsDelivr/ProspectOne, Polen)
  — datenschutzrechtlich dasselbe Risiko wie Google Fonts (LG-München-Urteil). Lokal = keine Dritt-Verbindung.
- **Wie:** 5 Schnitte heruntergeladen (400 = `.woff`, 500–800 = `.woff2`) nach `fonts/`; `@font-face` in
  `style.css` auf lokale Pfade; jsDelivr-`preconnect`/`dns-prefetch` aus `index.html` entfernt + 400er-Font
  preloaded; `datenschutz.html` Abschnitt 4 umgeschrieben (Schriften lokal, keine externen Ressourcen).
- **Alternativen/Abwägung:** CDN behalten + im Datenschutz nennen (rechtlich riskanter, Banner-Diskussion)
  verworfen. Quelle der woff2: `fontsource/font-files` (GitHub raw), da jsDelivr/npm in der Build-Umgebung
  geblockt waren. **Learning:** Das fontsource-„other"-Paket hatte eine fehlerhafte 400-`.woff2` (war Type-1)
  → für 400 die valide `.woff` genommen.
- **Konsequenz:** Seite lädt **keine** externen Ressourcen mehr → kein Cookie-/Consent-Thema durch Schriften.
  Neue Invariante: Schriften bleiben lokal (s. Abschnitt 1).

### 2026-06-01 — Quick Wins: 404-Seite + Dependabot (Branch `chore/404-dependabot`)
- **Was:** Eigene `404.html` im Markenlook + Dependabot für die GitHub-Actions.
- **Warum:** Polierter Fehlerfall statt GitHub-Standard; CI-Actions automatisch aktuell/sicher halten.
- **Wie:** `404.html` (Nav/Footer wie Rechtsseiten, Brand-Voice-Text, `noindex`); `.github/dependabot.yml`
  (`github-actions`, wöchentlich); `404.html` zusätzlich in die HTML-Validierung der CI aufgenommen.
- **Konsequenz:** Dependabot wird künftig PRs für Action-Updates öffnen (Label `dependencies`).

### 2026-06-01 — Rechtstexte finalisiert + Recht/Datenschutz-Update-Regel (Branch `legal/impressum-datenschutz`)
- **Was:** Impressum & Datenschutz an die echte neue Seite angepasst; Prozessregel zum Aktuell-Halten ergänzt.
- **Warum:** Platzhalter raus (Abmahnrisiko); alter Text listete viel Nicht-Zutreffendes (reCAPTCHA, Newsletter, Kommentare, Font Awesome, Strato-Hosting).
- **Wie:**
  - **Impressum:** neue Adresse (Seeweg 8, 83126 Flintsbach am Inn), Firmierung „Veronika Heidrich Media Design",
    **§ 5 / §§ 7–10 DDG** (statt TMG), E-Mail-only (kein Telefon), EU-OS-Plattform, Verbraucherstreitbeilegung,
    Haftung Inhalte/Links, Urheberrecht. **USt- und Kammer-Abschnitt entfernt** (Kleinunternehmer, kein reglem. Beruf).
  - **KI-Transparenz-Hinweis** im Impressum ergänzt (Bilder/Texte KI-gestützt, redaktionell verantwortet; Art. 50 KI-VO ab 02.08.2026).
  - **Datenschutz:** Adresse ergänzt; Inhalt war bereits realitätsnah (keine Cookies, mailto, jsDelivr, GitHub Pages). Hosting-Umzug-Marker gesetzt.
  - **Update-Regel** in `CLAUDE.md` (+ PR-Template-Punkt + Invariante): datenverarbeitungs-/Dritt-Dienst-relevante Änderungen ziehen Rechtstext-Anpassung im selben PR nach sich.
- **Recherche/Learning:** KI-Kennzeichnung ist **2026 noch nicht** Pflicht (Art. 50 KI-VO ab 02.08.2026; Text-Ausnahme bei redaktioneller Verantwortung) → freiwilliger Transparenz-Hinweis, gehört ins **Impressum**, nicht in den Datenschutz. TMG→**DDG** seit 14.05.2024, TTDSG→**TDDDG**. Telefon laut EuGH nicht zwingend, wenn schnelle E-Mail-Kontaktaufnahme besteht.
- **Konsequenz:** Finale rechtliche Verbindlichkeit weiterhin via **eRecht24** gegenprüfen. Bei Hostinger-Umzug Hosting-Abschnitt anpassen. Optional: CI-„Privacy-Guard" für neue externe Hosts.

### 2026-06-01 — A11y: Überschriften-Hierarchie (Branch `a11y/ueberschriften-hierarchie`)
- **Was:** PageSpeed/Lighthouse meldete „Überschriften nicht in fortlaufend absteigender Reihenfolge".
- **Warum:** Zwei Abschnitte sprangen von `<h2>` direkt auf `<h4>` (übersprungen: `<h3>`):
  „Warum das alles zusammengehört" (4 Big-Nodes) und der Prozess-Steps-Block (4 Schritte).
- **Wie:** Alle 8 `<h4>` → `<h3>` in `index.html`; CSS-Selektoren `.step h4`/`.big-node h4` (inkl. Mobile)
  → `h3`. Optik unverändert (Styling lief schon über Klassen). Plus `heading-order` als hartes
  Lighthouse-Kriterium in `lighthouserc.json` (Dauer-Schutz gegen Rückfall).
- **Learning:** Reine Stil-Klassen entkoppeln Optik von der Semantik → Heading-Level korrigierbar ohne Design-Risiko.
- **CI-Gate seniormäßig geschärft** (`lighthouserc.json`): hart = A11y- & Best-Practices-Kategorie (≥ 0.9)
  + deterministische Schlüssel-Audits (`heading-order`, `html-has-lang`, `document-title`, `image-alt`,
  `link-name`, `button-name`); Warnung = SEO (Rechtsseiten `noindex`) + Performance (CI-Lab schwankt).
  Bewusst **nicht** alles hart auf 100 → keine Fehlalarme. `color-contrast` folgt nach dem Kontrast-Fix.
- **Konsequenz:** Überschriften-Regressionen lassen künftig die CI rot werden. Kontrast-Punkt noch offen (separat).

### 2026-06-01 — Tier 2: CI-Qualitäts-Gates (Branch `ci/quality-gates`)
- **Was:** Automatische Checks auf jedem PR via GitHub Actions.
- **Warum:** Merge = sofort live → braucht ein automatisches Netz, v. a. für Barrierefreiheit (BFSG).
- **Wie:** `.github/workflows/ci.yml` mit 3 Jobs: `html-validate`, `lychee --offline` (interne Links),
  `@lhci/cli` (Lighthouse). A11y ≥ 0.9 = hart; SEO/Best-Practices/Performance = Warnung. Plus
  `.htmlvalidate.json`, `lighthouserc.json`, PR-Template. Doku: ADR-008, `WORKFLOW.md` Abschnitt 8.
- **Alternativen:** Schwergewichtiges E2E-CI verworfen (flaky/Overkill für statische Site).
- **Learning:** Performance kann erst hartes Gate werden, wenn die Bilder optimiert sind (Issue #3).
- **CI grün gezogen (echte Bugs gefunden!):** (1) `index.html` `<button id="burger">` fehlte `type="button"`;
  (2) `alt`-Text bei `trust-ki-werkzeug` hatte ein **gerades `"`**, das das Attribut/`<picture>` zerschoss
  → auf `&ldquo;` korrigiert (Quote-Invariante); (3) 4× ungültiges `<p>` in `<span class="pbody">`
  → zu `<span class="ptxt">` (display:block) umgebaut, CSS `.pbody p` → `.pbody .ptxt`. Regel
  `no-inline-style` aus (Stil-Präferenz, kein Validitäts-/A11y-Problem auf den Rechtsseiten).
- **Konsequenz:** Erste Läufe ggf. rot auf Bestandscode → auf dem Branch iterativ grün ziehen, dann mergen.

### 2026-06-01 — Tier 1: Fundament & Hygiene (Branch `chore/fundament-hygiene`)
- **Was:** Repo-Hygiene + SEO-/Profi-Grundbausteine.
- **Warum:** Stabileres Fundament; eigene Invariante (`pics/` nicht ins Repo) war verletzt.
- **Wie:**
  - `pics/` enttrackt (15 Roh-PNGs, ~30 MB) — bleiben lokal auf Disk, sind via `.gitignore` ignoriert.
  - Echte **Brand-Logos** nach `brand/logos/` verschoben (versioniert, weil echte Assets — kein Rohmaterial).
  - Neu: `.nojekyll`, `robots.txt`, `sitemap.xml`, `.editorconfig`, `favicon.svg`, `site.webmanifest`.
  - Favicon + `theme-color` in alle 4 öffentlichen Seiten verlinkt; Manifest auf der Startseite.
- **Alternativen/Abwägung:** Git-History-Rewrite (BFG/filter-repo) erwogen, um die 56 MB `.git`
  wirklich zu schrumpfen — **verworfen** (destruktiv, schreibt alle Hashes um). Untracking reicht
  als Hygiene; History-Cleanup bleibt optionaler Sonderschritt.
- **Offen (braucht Bild-Tooling, hier nicht verfügbar):** PNG-Originale → optimierte Web-Größen,
  dediziertes `og:image` (1200×630) statt 1,8-MB-PNG. Für Tier 2 / lokal vorgemerkt.
- **Learning:** Logos ≠ Rohmaterial — „echte" Assets gehören versioniert (`brand/`), Explorations nicht.
- **Konsequenz:** Neue Invariante (s. Abschnitt 1 „Git / Deployment"): Brand-Assets liegen in `brand/`.

### 2026-06-01 — Zusammenarbeits-Workflow (Branch + PR) etabliert
- **Was:** Verbindliche Arbeitsweise für Claude Code + VS Code + Claude Design definiert.
- **Warum:** Sicheres, nachvollziehbares, reproduzierbares Arbeiten; kein versehentliches
  Überschreiben/Löschen; sauberer Sync. Push auf `main` = sofort live → braucht ein Diff-Gate.
- **Wie:** `WORKFLOW.md` als kanonische Quelle erstellt; Kurzfassung in `CLAUDE.md` und
  `.github/copilot-instructions.md`; ADR-007 in `PROJECT.md`. Kern: jede Änderung über
  kurzlebigen Branch + Pull Request, Squash-Merge in `main`, `main` per Branch-Protection geschützt.
- **Alternativen:** Direkt-Commits auf `main` (zu riskant, kein Gate) und GitFlow (Overkill) verworfen;
  Trunk-Based ist der moderne Standard für kleine Teams/Solo.
- **Learning:** Git-Aufwand trägt Claude Code; Nutzerin prüft nur den PR-Diff und merged.
- **Konsequenz:** Künftig **kein Direkt-Push auf `main`** mehr — alles über Branch + PR.
  Branch-Protection muss Veronika einmalig in den GitHub-Settings aktivieren.

### 2026-06-01 — Dokumentationspflicht werkzeugübergreifend verankert
- **Was:** Die Regel „nach jeder Änderung das Protokoll führen" gilt jetzt verbindlich überall,
  nicht nur in VS Code.
- **Warum:** Bisher war die Regel nur in der persönlichen VS-Code-Konfiguration hinterlegt → galt
  nicht repo-weit und nicht in Claude Code / Claude Design. Ziel: ein einziger, lückenloser,
  voll einsehbarer Arbeitsverlauf, von überall nutzbar und auf jeden Moment zurückführbar.
- **Wie:** Kanonische Regel an drei Stellen verankert, die das jeweilige Werkzeug automatisch liest:
  `CLAUDE.md` (neuer Abschnitt „Dokumentationspflicht", Claude Code), `PROTOKOLL.md` (neuer
  Abschnitt 0, Basis für Claude Design) und `.github/copilot-instructions.md` (neu, GitHub Copilot
  in VS Code, repo-weit statt nur lokal).
- **Alternativen/Abwägung:** Erwogen: Claude-Code-Hook (settings.json), der nach Edits erinnert —
  verworfen, weil ein Shell-Hook keine inhaltliche Doku schreiben kann und bei reinen Lese-/Frage-Runden
  nur nervt. Instruktionsdateien sind das robuste, werkzeugübergreifende Mittel. (Hook kann auf Wunsch
  als zusätzlicher Reminder nachgerüstet werden.)
- **Learning:** „Über VS Code hinterlegte" Regeln liegen meist in der User-Config, nicht im Repo →
  reisen nicht mit. Regeln gehören ins Repo (`CLAUDE.md`, `.github/copilot-instructions.md`, `PROTOKOLL.md`).
- **Konsequenz:** Jede künftige Bearbeitung — egal von wo — ist verpflichtet, hier einen Eintrag
  mit Was/Warum/Wie/Alternativen/Learnings/Konsequenzen zu hinterlassen (append-only).

### 2026-05-31 — Formular-Vorauswahl + SR-Status (Branch `gh-pages`)
- **`data-topic`** auf topic-spezifischen CTAs: `personal-branding`, `webdesign-wordpress`, `ki-workflows`, `yoga-bewegung`, `mischung` (Hero CTA).
- **Dropdown** `#f-topic`: `value`-Attribute ergänzt + leere Standardoption „Bitte Thema wählen".
- **`.sr-only`** CSS-Klasse in `style.css` ergänzt (Accessibility Utility).
- **`#form-topic-status`** (`aria-live="polite"`) fürs Screenreader-Feedback beim Vorauswählen.
- **Fokus** nach Scroll zu #kontakt auf `#f-topic`-Select gesetzt (timing per `prefers-reduced-motion`).
- **URL-Parameter** `?thema=...#kontakt` → setzt Dropdown + scrollt zur Section + fokussiert Select.
- **Formular-Submission-Fix**: `options[selectedIndex].text` statt `.value` → menschlich lesbares Thema im Mailto.
- **ACCESSIBILITY_NOTES.md** aktualisiert.

### 2026-05-31 — Technical Polish (Branch `technical-polish`)
- **SEO-Title** finalisiert: `Vroni · Brand- & Website-Strategin mit KI als Werkzeug`
- **SEO-Description** finalisiert: `Personal Branding, Webdesign, KI-Workflows und Bewegung für Selbstständige mit vielen Ideen. Vroni hilft dir, Klarheit zu finden und stimmig sichtbar zu werden.`
- **OG-Title + Twitter-Title** synchronisiert.
- **Preload** für `Vaelia.woff2` und `hero-visual.webp` im `<head>` ergänzt.
- **Schriften lokal** in `fonts/` (Open Sauce Sans 400 woff + 500–800 woff2, Vaelia) — keine externe Font-CDN.
- **`:focus-visible`** CSS-Styles für alle interaktiven Elemente (BFSG/WCAG 2.1 AA).
- **Burger-Button**: `aria-expanded`, `aria-controls`, `aria-label`-Toggle in script.js.
- **Mobile-Menü**: `role="dialog"` + `aria-label`.
- **Trust-Bilder**: `width="1448" height="1086"` → kein Layout-Shift.
- **Formular-Validierung**: E-Mail + Nachricht clientseitig geprüft vor mailto; `.field.error` + `.field-error`-Spans mit `role="alert"`.
- **Formular aria**: `aria-describedby` + `aria-required` auf Pflichtfeldern.
- **Form-Note** und **Datenschutz-Hinweis** auf finale Texte gebracht.
- **`impressum.html`** erstellt (Platzhalter-Struktur, `noindex`).
- **`datenschutz.html`** erstellt (Platzhalter, Hosting/Kontaktformular/Cookies dokumentiert, `noindex`).
- **Footer-Links** auf `impressum.html` / `datenschutz.html` aktualisiert (vorher `#`).
- **`.gitignore`**: `pics/` und `uploads/` dauerhaft ignoriert.

### 2026-05-31 — Fix: Zitat-Band Anführungszeichen
- `"` (ASCII 0x22) → `&ldquo;` (HTML-Entität U+201C) — rendert bei 110px/800-Weight korrekt als typografisches Anführungszeichen.

### 2026-05-31 — Design-Update VI: Footer-Tagline, Big-Nodes Mobile-Grid
- **Footer-Tagline**: Wortmarke in `.footer-mark` gewrappt + Tagline „Die innere Linie, die sich durch alles zieht." (kursiv, gedämpft).
- **Big-Nodes Mobile**: `grid-template-areas:"icon title" "icon desc"` statt `flex-direction:row` — Icon bündig neben Titel UND Beschreibung.

### 2026-05-31 — Kundenstimmen ausgeblendet + contact-privacy
- **Voices-Section** vollständig auskommentiert (Platzhalter-Inhalte nie öffentlich sichtbar).
- **contact-privacy** HTML-Paragraph eingefügt (war nur in CSS vorbereitet).

### 2026-05-31 — Design-Update V: Trust-Section, Footer-Redesign, WebP, SEO-Meta
- **Trust-Section** neu zwischen Claim-Band und FAQ: 4 Bild-Karten mit echten Fotos.
- **Footer** komplett redesigned: 4-Spalten-Layout mit `.footer-quote`-Bild-Block.
- **SEO-Meta** vollständig: title, description, keywords, canonical, Open Graph, Twitter-Card.
- **`<picture>` + WebP** für alle Bilder (hero, about, zitat, yoga, claim, footer, trust × 4).
- **Nav**: „Werte" + „FAQ" Links, „Stimmen" entfernt.
- **Kontaktformular**: `required`, `aria-required`, `.req`-Markierung.

### 2026-05-31 — Design-Update IV: Claim-Band, Voices-Bereinigung
- **Claim-Band-Section** zwischen Arbeitsweise und Voices: `claim-weg.png` mit Ken-Burns (28s), Statement „Gute Sichtbarkeit fühlt sich nicht lauter an. Sondern klarer."
- **Voices**: sichtbarer Platzhalter-Text entfernt (war live sichtbar).
- **Footer-Claim** finalisiert.

### 2026-05-31 — Design-Update III: Arbeitsweise, FAQ, Kontakt, Lilac-System
- Arbeitsweise: editoriale Step-Cards (01–04), Lime-Nummern, Pfeil-Indikatoren, Orbs.
- FAQ: 7 Fragen, WordPress-Frage ergänzt.
- Kontakt: neues H2, direkte Kontakt-Pills.
- Lilac als Akzent-System in 5 Sections.

### 2026-05-31 — Design-Update II: FAQ, Yoga, Pain-Items, About-Signatur
- FAQ, Yoga-Bento, Pain-Items, Angebote-Cards, About-Signatur neu gestaltet.
- Voices-Slider (scroll-snap + dot-navigation) in script.js.

### 2026-05-31 — Mobile-Fix: Pain-Items + Big-Nodes
- Pain-Items: `flex-direction:row` auf Mobile.
- Big-Nodes: `flex-direction:row` auf Mobile.
- am-main explizite Höhe, hero-portrait width:100%.

### Frühere Runden (im Atelier, vor GitHub-Sync)
- Hero-Motion, Timeline 7 Stationen, KI-Icon (Sparkle), About-Layout, Logo-Linie, Burger-CTA.

---

## 4. OFFENE TODOS

- [ ] **Echte Kundenstimmen** — Voices-Section auskommentiert, wartet auf echte Texte von Vroni.
- [ ] **Impressum + Datenschutz finalisieren** — Inhalt existiert; finaler eRecht24-Endcheck; dann `noindex` entfernen.
- [x] **Über-mich-Seite** (eigene Unterseite mit ausführlicher Story) — ✅ erledigt PR #34 (2026-06-02, `.au-`-Version). Hinweis: Nav-Link auf `index.html` zeigt noch auf `#ueber` (Startseiten-Sektion) statt auf `ueber-mich.html` — separates TODO.
- [ ] **Nav „Über mich" auf index.html** auf `ueber-mich.html` umstellen (statt `#ueber`).
- [ ] **Lighthouse-Audit** im echten Browser (Chrome DevTools) — Performance-Score auf Mobile; Core Web Vitals auf Live-URL.
- [ ] **Echten Domain-Canonical** setzen sobald Custom Domain steht (aktuell `vronihei.github.io/Website/`).
- [x] **Favicon** — erledigt (`favicon.svg`, lokal).
- [x] **Strukturierte Daten** (Schema.org: Person, ProfessionalService, WebSite, FAQPage) — ✅ erledigt PR #21 (2026-06-02).
- [x] **GoatCounter** — ✅ erledigt (cookielos, `count.js` lokal, kein Banner).

### Launch-Bündel (wenn Veronika Zeit hat — bewusst in EINEM Rutsch, in dieser Reihenfolge)
- [ ] **Hosting-Umzug** → **Hostinger**; danach Datenschutz „Hosting" + Impressum-URLs anpassen.
- [ ] **Eigene Domain `veronika-heidrich.de`** + HTTPS; danach alle `canonical`/OG-/`sitemap.xml`/`robots.txt`-URLs umstellen.
- [ ] **Google Search Console**: Property anlegen → Verifizierungs-Meta-Tag einbauen → Sitemap einreichen (kein Tracking/Banner).
- [ ] **`noindex` entfernen** (Rechts- und Über-mich-Seiten) → eRecht24-Endcheck → final live → Stand als `v1.0` taggen.

### Ideen / größere Vorhaben (eigenes Projekt, später sauber scopen)
- [ ] **KI-Admin-Editor**: eigener Login-Bereich, in dem man einen Bereich der Seite markiert, die Änderung in Worten beschreibt und die KI sie umsetzt (kein Drag&Drop). Auch für Kundenseiten gedacht. Braucht Backend/Auth + LLM-API + sichere Persistenz (Git-Commit + Preview). Details als offene Frage in `PROJECT.md`.

---

## 5. PRODUKTIONS-REGELN (neue Handoff-Checkliste)

Beim nächsten Design-Handoff von Claude Design → Claude Code immer prüfen:

1. **Nie übernehmen** aus Design-Bundle: Google Fonts / externe Font-CDN (`<link>`/`@import`/`preconnect`), `image-slot.js`, `© 2025`, Platzhalter-E-Mail `hallo@vronihei.de`.
   → **Neue Schriften IMMER lokalisieren:** Datei nach `fonts/`, `@font-face` auf lokalen Pfad, externe Referenz entfernen (s. `CLAUDE.md` „Schriften lokal hosten").
2. **Immer ersetzen**: `<img>` → `<picture>` mit WebP; fehlende `width`/`height` ergänzen.
3. **Immer prüfen**: Hat jedes neue Bild eine `.webp`-Variante? Ist es im Assets-Abschnitt dokumentiert?
4. **Produktions-E-Mail**: immer `info@veronika-heidrich.de`.
5. **Branch**: **immer über kurzlebigen Branch + Pull Request** arbeiten, nie direkt auf `main` pushen. Namensschema: `feat/`, `fix/`, `design/`, `docs/`, `a11y/`. Squash-Merge nach Diff-Prüfung.
6. **Protokoll**: nach jeder Runde Verlauf + Invarianten aktualisieren.
7. **Zitat-Anführungszeichen**: `&ldquo;` (nicht ASCII `"`).
8. **Jahr**: `© 2026` beibehalten bis Jahreswechsel.

---

## VERLAUF — Session 2026-06-02 (Teil 2)

### Handoff-Merge: Figtree-Feintuning-Block + `.hb-meta` + Yoga-Bild + Über-mich-Seite

**Quellen:**
- `HANDOFF-V7-HERO-FIGTREE.md` aus `Vroni Website (2)` Ordner — vollständiges Handoff-Dokument für Claude Code
- `ueber-mich.html` aus `Vroni Website (2)` Ordner

**Was:** Vollständige Implementierung des Handoff-Dokuments (was beim ersten Merge-Versuch noch fehlte):

1. **`style.css` — `.hb-meta` Block (neu):**
   - `.hb-meta`: flex, gap, padding-top, border-top-Trennlinie
   - `.hb-meta span`: gedämpfte Keyword-Farbe (`rgba(35,34,26,.24)`), Punkt-Separator via `::after`

2. **`style.css` — Figtree-Feintuning-Block (neu, ca. 60 Zeilen):**
   - Seitenweite H2-Vereinheitlichung via `!important`
   - Subline-Größen: `.pain .lead`, `.shead p`, `.contact .body` etc. → 18px/1.6
   - „Das große Ganze"-Subline: `clamp(19px,1.85vw,22px)` / 600 / 1.5
   - Display-Texte: `.cb-claim`, `.quote-band q`, `.footer-quote .fq-text` → `font-weight:650!important`
   - Quote-Breite: `max-width:560px!important`
   - Angebote, Big-Nodes, Trust-Cards, Yoga, Ansatz, Über-mich, Steps, Pain-Items, Footer — je mit design-spezifischen Werten
   - Faden-Zeitstrahl: `fl` 650/15px, `fd` 13.5px
   - Über-mich-Signatur: `.as-line{display:none!important}`, `.as-brand{margin-left:0!important}`

3. **`style.css` — `@media (min-width:1600px)` (neu):**
   - Hero H1: `clamp(60px,3.4vw,68px)`; `.hb-lede`: 21px

4. **`index.html` — `.hb-meta` Keywords im Hero:**
   - 4 Spans: Personal Branding · Webdesign & WordPress · KI-Workflows · Yoga & Bewegung
   - Visuell als gedämpfte Punkt-getrennte Liste unter den CTAs

5. **`index.html` + `ueber-mich.html` — Yoga-Bild im Bento:**
   - `s-journal`: hero-journaling → yoga (srcset, src, Dimensionen, alt)

6. **`ueber-mich.html` — neue Unterseite (vollständig):**
   - Vorlage aus Claude Design, produktionsbereit
   - noindex, Preloads, Favicon, Twitter-Meta
   - font-weight:800 aus allen h1/h2/h3/h4-Regeln entfernt
   - picture/960w-Srcset für alle Bilder
   - image-slot.js entfernt, © 2026, echte Legal-Links

**Warum:** HANDOFF-V7-HERO-FIGTREE.md (Section 3+4 u.a.) war beim ersten Merge (PR #31) noch nicht implementiert.

**Abwägungen:**
- `.lbl`-Eyebrow: Handoff sagt 12px, aber User hat in der letzten Session explizit 11px bestätigt → 11px beibehalten (User-Feedback > Handoff-Spec)
- `h3,h4` global: Handoff sagt 700, aber User hat 650 explizit bestätigt → 650 bleibt global; feine Overrides (`.step h3`, `.big-node h4`) auf 600/700 per `!important` im Feintuning-Block
- Display-Texte: Handoff sagt 700, aber User hat 650 nach langer Iteration bestätigt → 650!important

**Dieser PR ersetzt PR #31** (falls noch offen) — schließ #31, merge diesen.
