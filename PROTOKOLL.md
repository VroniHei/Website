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

### Brand Voice / Texte
- [ ] **Keine Gedankenstriche / Em-Dashes (`—`)** im Fließtext, in Headlines, Alt-Texten oder Meta-Descriptions (KI-Stilmerkmal, verstößt gegen Vroni Voice). Natürlich ausformulieren: Punkt, Komma, Doppelpunkt. Komposita-Bindestriche („KI-Workflow") sind erlaubt. Prüfbar via Grep auf `—` in `*.html`.
- [ ] **Ich-Form** wenn Vroni spricht; kein künstliches Agentur-„Wir". Keine Marketing-/Coaching-Floskeln (Liste in `uploads/Vroni_Brand_Voice_2_0.md`).

### Design-System / Single Source of Truth
- [ ] **Tokens (Farbe, `--fs-*`, `--lh-*`, `--ls-*`, `--space-*`, `--r-*`, `--shadow-*`, `--dur-*`/`--ease-*`, `--z-*`) und alle `@font-face` werden NUR in `tokens.css` definiert.** `style.css` bindet sie per `@import url("tokens.css")` (erste Regel) ein; `Designsystem.html` per `<link rel="stylesheet" href="tokens.css">`. Nirgends ein zweites `:root` mit diesen Tokens.
- [ ] **`Designsystem.html` ist nur Viewer:** keine eigenen Tokens, keine eigene `@font-face`, keine externe Font-CDN. Eigene Styles dort nur DS-/Doku-Chrome.
- [ ] **Keine externe Schrift-CDN** in `*.html`/`*.css`; Schriften lokal aus `fonts/`.
- [ ] **Durchsetzung:** `node .github/design-hygiene.cjs` (CI-Job `design-guard`) muss grün sein. Regeln: `DESIGN-HYGIENE.md`.

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
- [ ] Überschriften = **Open Sauce Sans 800**. Fließtext Open Sauce Sans 400.
- [ ] **Alle Schriften lokal in `fonts/`** (Open Sauce Sans 400 = `.woff`, 500–800 = `.woff2`; Vaelia). **Keine externe Font-CDN** (kein Google Fonts, kein jsDelivr/Fontsource) — datenschutzrechtlich (IP-Übertragung) tabu.
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
- [ ] **Atelier ↔ Repo Sync (verbindlich):** Vor jedem neuen Iterationsblock im Claude-Design-Atelier zuerst Repo-Stand pullen (Tree + Size-Diff auf `index.html`/`style.css`/`script.js`/`PROTOKOLL.md`). Sonst überschreibt der nächste Handoff Live-Fortschritte (z. B. responsive `srcset`/`sizes`-Bildersystem, JSON-LD-Schemas, Accordion-Fix), weil das Atelier außerhalb von Git lebt und keinen automatischen Abgleich hat. *(2026-06-02 nachgetragen, nachdem es genau passiert wäre.)*

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

### Bilder (`images/`) — alle als PNG + WebP
- `images/hero-visual.png` + `.webp` — Hero Hauptbild (900×1200)
- `images/hero-branding.png` + `.webp` — Hero Bento links oben (1672×941)
- `images/hero-journaling.png` + `.webp` — Hero Bento links unten (1662×946)
- `images/about-workspace.png` + `.webp` — Über mich, Hauptbild (1200×1500)
- `images/about-weg.png` + `.webp` — Über mich, versetztes Bild (900×1200)
- `images/yoga.png` + `.webp` — Yoga-Section (1200×900)
- `images/claim-weg.png` + `.webp` — Claim-Band (See/Wasser, goldene Stunde, 1500×1000)
- `images/zitat-weg.png` + `.webp` — Zitat-Band Hintergrund (1600×900)
- `images/footer-weg.png` + `.webp` — Footer Bild-Block (1600×1000)
- `images/trust-ehrliche-einschaetzung.png` + `.webp` — Trust-Card 1 (1448×1086)
- `images/trust-direkter-kontakt.png` + `.webp` — Trust-Card 2 (1448×1086)
- `images/trust-sortieren-vor-gestalten.png` + `.webp` — Trust-Card 3 (1448×1086)
- `images/trust-ki-werkzeug.png` + `.webp` — Trust-Card 4 (1448×1086)

### Fonts (`fonts/`)
- `fonts/Vaelia.woff2`, `fonts/Vaelia.woff` — Wortmarke/Display
- `fonts/figtree-latin-400-800.woff2` — Hauptschrift Figtree (variable font, 300–900)
- `fonts/newsreader-latin-italic.woff2` — Newsreader kursiv (400–600), für `.g`-Akzente
- `fonts/newsreader-latin-500.woff2` — Newsreader aufrecht 500, für `.g` in normaler Schriftlage

### Seiten (Root)
- `index.html`, `style.css`, `script.js` — Startseite
- `impressum.html` — Impressum (Platzhalter)
- `datenschutz.html` — Datenschutzerklärung (Platzhalter)

---

## 3. VERLAUF (neueste zuerst)

### 2026-06-03 — Hero-Bild Mobile/Tablet auf volle Inhaltsbreite (Branch `fix/hero-mobile-fullwidth`, Claude Code)
- **Was:** `.hb-soft` auf ≤900px von `max-width:520px;margin:0 auto` auf `max-width:none;margin:0` umgestellt → das Hero-Bild nimmt jetzt die **volle Inhaltsbreite** ein statt schmal/zentriert.
- **Warum:** Vroni: Bild ist sichtbar, war aber zu schmal. Der 520px-Deckel hatte das Einzelbild auf breiteren Screens (v. a. Tablet) zentriert verschmälert.
- **Wie:** Ein `str_replace` im ≤900px-Block. guard 0, html-validate 0, Klammern 714/714.
- **Konsequenz:** Reine CSS-Änderung. Hero-Bild full-width auf Mobile/Tablet.

### 2026-06-03 — Hero-Bild Mobile/Tablet: In-Flow-Block statt absolut positioniert (Branch `fix/hero-mobile-image-render`, Claude Code)
- **Was:** Auf ≤900px wird das Hero-Bild (`.hb-soft .s-main img`) jetzt als normales **In-Flow-Block-Bild** gerendert (`position:static;width:100%;height:clamp(300px,72vw,430px);object-fit:cover`), statt absolut positioniert in einem Container mit fester Höhe.
- **Warum:** Der vorige Höhen-Fix gab dem Container zwar Höhe (Vroni: „Weißraum, wo das Bild stehen würde"), aber das **absolut positionierte** `<img>` wurde auf Mobile nicht gemalt. Der Hero-**Text** war sichtbar → Reveal/Opacity ist NICHT die Ursache; es ist spezifisch das absolute Bild im resized Container. In-Flow-Rendering ist robust und zuverlässig sichtbar.
- **Wie:** Ein `str_replace` im ≤900px-Block: `.s-main` Höhe auf `auto`, `picture` als Block, `img` statisch mit fester Höhe + `object-fit:cover`. `.s-card`-Overlay bleibt absolut über dem Bild (`.s-main` weiter `position:relative`). Lokal: guard 0, html-validate 0, Klammern 714/714.
- **Konsequenz:** Reine CSS-Änderung, nur ≤900px. Visuelle Abnahme durch Vroni nötig. Falls weiterhin leer: nächster Verdacht = evtl. fehlerhafte `hero-visual-960.webp`-Variante (würde nur Mobile betreffen, da Desktop die große `hero-visual.webp` wählt).

### 2026-06-03 — Pain-Sektion Mobile/Tablet-Parität (re-apply nach Klärung) (Branch `fix/pain-mobile-parity`, Claude Code)
- **Was:** Pain-Sektion auf ≤900px (Tablet) und ≤560px (Phone) auf den **flachen Hairline-Stil des Desktops** gebracht (Parität): Tablet 2-spaltig mit Hairline-Trennern (border-top/-bottom, border-right auf odd), Phone 1-spaltig nur mit unterer Hairline. Card-Chrome (weiße Kacheln) entfällt. Hero-Bild-Fix (s-main Höhe) bleibt live. **Yoga unangetastet** (rendert korrekt mit `aspect-ratio:4/3`).
- **Warum:** Klärung mit Vroni: Mobile/Tablet **müssen** zum überarbeiteten Desktop-Design passen; die Pain-Sektion tat das noch nicht (Card-Chrome statt flachem Raster). Der vorherige Teil-Revert (#39) hatte Pain irrtümlich mit zurückgenommen — „Yoga-Bild" war nur ein Verständnis-Missverständnis (= Foto in der Yoga-Sektion, wird ohnehin korrekt dargestellt).
- **Wie:** Zwei `str_replace`-Edits in `style.css` (≤900px-Pain flach/2-spaltig, ≤560px-Pain 1-spaltig). `git diff 404adb0` zeigt jetzt genau: Hero-s-main-Fix + Pain-Flat, kein Yoga. Lokal: design-guard 0 Verstöße, html-validate 0 Fehler, Klammern 712/712.
- **Konsequenz:** Reine CSS/Responsive-Änderung. **Visuelle Abnahme auf echten Geräten durch Vroni** (Build-Umgebung ohne Headless-Browser / Live-Zugriff).

### 2026-06-03 — Teil-Revert: nur Hero-Bild-Fix behalten, Pain + Yoga zurückgenommen (Branch `fix/revert-pain-yoga-keep-hero`, Claude Code)
- **Was:** Aus dem vorherigen Merge (#38) die Pain- und Yoga-Mobile-Änderungen wieder zurückgenommen. **Behalten bleibt nur** der Hero-Bild-Fix (`.hb-soft .s-main` explizite Höhe ≤900px). `.pain-*` (≤900 und ≤560) und `.yoga-image` (≤900) sind exakt auf den Stand vor #38 zurückgesetzt. Verifiziert: `git diff 404adb0 -- style.css` zeigt nur noch den s-main-Hunk.
- **Warum:** Vroni-Rückmeldung nach der Klärung der Vorschau-Verwechslung: „Geh nur vom Hero aus, das ist der einzige Bug" (bezogen auf das fehlende Hero-Bild). Die Pain-Stil-Angleichung und die Yoga-Höhe waren damit unnötig (die Pain-Mobile-Abweichung war vermutlich die Claude-Design-Vorschau, nicht die Live-Seite). Auswahl in Rückfrage: „Pain + Yoga zurücknehmen".
- **Wie:** Drei Reverse-`str_replace`-Edits in `style.css` auf die Vor-#38-Originalwerte. Lokal: design-guard 0 Verstöße, html-validate (index + Rechtsseiten) 0 Fehler, Klammern balanciert (708/708).
- **Konsequenz:** Live bleibt nur die echte Bugfix-Änderung (Hero-Bild auf Mobile/Tablet sichtbar). Pain-Mobile = wieder Card-Chrome wie zuvor, Yoga-Mobile = wieder `aspect-ratio:4/3`. Keine Inhalte/Bilder/Dienste betroffen.

### 2026-06-03 — Responsive-Parität Startseite: Hero-Bild + Pain-Sektion auf Tablet/Mobile (Branch `fix/mobile-parity-hero-pain`, Claude Code)
- **Was:** Mobile/Tablet-Darstellung der Startseite an das Desktop-Design angeglichen. (1) **Hero-Bild** (`.hb-soft .s-main`) auf ≤900px wieder sichtbar: explizite `height:clamp(300px,70vw,440px)` statt nur `aspect-ratio` — sonst ist das absolut positionierte Bild höhenlos = unsichtbar. (2) **Pain-Sektion** auf ≤900px vom alten Card-Chrome zurück auf den **flachen Hairline-Stil des Desktops**: Tablet 2-spaltig mit Hairline-Trennern (border-top/-bottom, border-right auf odd), Phone (≤560px) 1-spaltig nur mit unterer Hairline. (3) **`.yoga-image`** auf ≤900px ebenfalls explizite Höhe (gleicher absolut-positioniert-Bug wie Hero).
- **Warum:** Vroni-Auftrag: Desktop ist die Basis, kleinere Geräte müssen logisch angepasst sein; das war für Hero (Bild fehlte) und Pain (anderer Stil als Desktop) nicht der Fall. Wurzel: die bereits dokumentierte Invariante „absolut positioniertes Bild braucht explizite Höhe auf Mobile" (vgl. `.am-main`, style.css Z.830) war bei `s-main` und `.yoga-image` nicht angewandt.
- **Wie:** Vier gezielte `str_replace`-Edits in `style.css` (≤900px-Hero, ≤900px-Pain, ≤560px-Pain, ≤900px-Yoga). Lokale Abnahme: `node .github/design-hygiene.cjs` → 0 Verstöße; `html-validate@8` (index + Rechtsseiten) → 0 Fehler; CSS-Klammern balanciert (712/712).
- **Alternativen / Abwägungen:** (a) Hero auf Mobile mit allen 3 Bento-Kacheln statt nur Hauptbild — verworfen, auf schmalen Screens unruhig; ein starkes Hero-Bild ist die saubere Reduktion (s-brand/s-journal bleiben ≤900 ausgeblendet). (b) Pain-Karten als Card-Chrome behalten — verworfen, Vroni will Parität zum flachen Desktop-Design.
- **Konsequenz:** Reine CSS-/Responsive-Änderung, keine Inhalte/Bilder/Dienste betroffen, Recht/Datenschutz unverändert. **Hinweis:** In dieser Umgebung kein Headless-Browser/kein Zugriff auf die Live-Domain → visuell nicht selbst gerendert; finale optische Abnahme auf echten Geräten (Phone/Tablet/Desktop) durch Vroni.

### 2026-06-03 — Claude-Code-Integration des Atelier-Stands (Branch `design/2026-06-03-tokens-und-copy`, Claude Code)
- **Was:** Den Atelier-Handoff `HANDOFF-2026-06-03.md` real ins Repo übernommen. **1:1 ersetzt/angelegt:** `tokens.css` (NEU), `style.css`, `ueber-mich.css`, `index.html`, `ueber-mich.html`, `Designsystem.html`. **Neue Bilder** (je `.webp`+`.png`): `about-hero-desk`, `about-desk-detail`, `about-notebook-still`. **CI-Guard übernommen:** `.github/design-hygiene.cjs` + Job `design-guard` in `.github/workflows/ci.yml`; dazu `DESIGN-HYGIENE.md`. **Doku aktualisiert:** `MEDIEN.md` (Register inkl. der 3 neuen Motive), `.gitignore` (`_*` / `_handoff/`-Block), `PROTOKOLL.md`. **Minimal-Sync der Live-Seiten** (nötig für grünen Guard): Em-Dashes entfernt in `404.html`/`barrierefreiheit.html`/`impressum.html` (je 1× im HTML-Kommentar) und `datenschutz.html` (4×); in `datenschutz.html` zusätzlich Schriftname „Open Sauce Sans" → „Figtree" (Hauptschrift ab heute, technischer Stand korrekt gespiegelt).
- **Warum:** Atelier ist der bereinigte Soll-Stand; 1:1-Übernahme statt Cherry-Picking eliminiert die Überschreib-Fehlerklasse. Bild- und Doku-Stand mussten konsistent mitkommen, der Guard erzwingt die Token-Single-Source dauerhaft.
- **Wie:** Vollständigen Design-Bundle von der Claude-Design-URL gezogen (252 MB tar.gz), Inhalt gegen das Repo verifiziert (alle 5 separat hochgeladenen Dateien **byte-identisch** zum Bundle; Bundle-Code enthält die gestrige Hero/Pain-Arbeit bereits → kein Regress). `PROTOKOLL.md`/`MEDIEN.md` als inhaltliches Superset des Repos bestätigt (keine Historie verloren). Lokale Abnahme: `node .github/design-hygiene.cjs` → 0 Verstöße; `html-validate@8` über index + Rechtsseiten → 0 Fehler; alle Bildreferenzen in index/ueber-mich aufgelöst.
- **Alternativen / Abwägungen:** (a) Guard NICHT aufnehmen (Handoff Abschnitt 5 nennt `.github` „live-only") — verworfen, Vroni hat „Guard mitnehmen" freigegeben; der Guard ist Kern der Token-Umstellung. (b) Rechtsseiten unangetastet lassen — nicht möglich ohne roten Guard; gewählt: nur die minimalen, vom Atelier vorgegebenen Em-Dash-/Schriftnamen-Fixes (keine Änderung an Datenverarbeitung/Diensten, daher keine inhaltliche Rechtstext-Pflicht ausgelöst). (c) Atelier-Ballast (`uploads/`, `screenshots/`, alte `HANDOFF-*.md`, `PENDING-*.md`, `_`-Scratch) **bewusst NICHT** ins Repo — bleibt schlank.
- **Learnings:** Ein global wirkender HTML-Guard (Em-Dash) trifft auch „nicht anzufassende" Seiten — Guard-Scope und „live-only"-Listen müssen zusammenpassen, sonst CI-Konflikt. `comm -23` über sortierte Doku-Dateien zeigt nur Wortlaut-Diffs, nicht fehlende Substanz → echte Sektions-Header gegenprüfen.
- **Konsequenz:** `Designsystem.html` enthält (1:1 wie geliefert) `<button>` ohne `type` → 16 `html-validate`-Hinweise, aber die Seite ist **nicht** im CI-Validate-Scope, daher CI grün. Keine neuen Drittdienste/Fonts/Tracking → Recht/Datenschutz materiell unverändert (nur Schriftname präzisiert). Branch → PR → Squash-Merge → Auto-Deploy.

### 2026-06-03 — Master-Übergabeprotokoll `HANDOFF-2026-06-03.md` erstellt + alte Handoffs als SUPERSEDED markiert (Claude Design · Atelier · Vroni-Auftrag)
- **Was:** Ein konsolidiertes Übergabedokument `HANDOFF-2026-06-03.md` für Claude Code geschrieben, das den gesamten heutigen Stand bündelt: (1) 1:1-Übernahme der 6 Deliverables (`tokens.css` NEU, `style.css`, `ueber-mich.css`, `index.html`, `ueber-mich.html`, `Designsystem.html`), (2) Designsystem/Token-Erklärung, (3) **vollständiger Slot-für-Slot-Bildplan** beider Seiten mit exakten Dateinamen + Maßen + Alt-Text, (4) **explizite Liste der 6 ungenutzten/veralteten Bild-Sets** („NICHT verwenden": `hero-journaling`, `hero-branding`, `hero-see`, `about-brand-essence`, `about-claim-see`, `about-journal-mat`), (5) Live-only-Schutzliste (`site.webmanifest` etc.), (6) Duplikat-Cleanup-Hinweise (ein Guard, `_*` gitignored), (7) Schritt-für-Schritt + CI-Abnahme. Die drei alten Docs (`HANDOFF-V7-HERO-FIGTREE.md`, `HANDOFF-UEBER-MICH.md`, `PENDING-FOR-CLAUDE-CODE.md`) oben mit SUPERSEDED-Banner versehen.
- **Warum:** Vroni-Auftrag: sauberes Übergabeprotokoll, alle heutigen Änderungen enthalten, keine doppelten Daten/Überschreibungen, und Bilder so mitgeben/beschreiben, dass Code die richtigen nimmt (letztes Mal falsche Bilder gezogen).
- **Wie:** `grep` der Bildreferenzen in beiden HTML-Seiten + `list_files images/` → Soll-Ist-Abgleich → genutzte vs. ungenutzte Motive bestimmt. Bestätigt: `style.css @import tokens.css` (Z. 5), `site.webmanifest` liegt NICHT im Atelier (live-only). Doc geschrieben, alte Handoffs gebannert.
- **Schlüssel-Erkenntnis (Bild-Verwechslung):** 6 Bild-Sets liegen im Ordner, werden aber von keiner Seite referenziert. Genau diese (v. a. `hero-journaling` als alter Hero-Mitte-Kandidat, `about-journal-mat` als alter Avatar) sind das „falsches Bild"-Risiko. Hero-Mitte ist `yoga`, Kontakt-Avatar ist `about-arbeiten`. Im Doc als ❌-Liste fixiert.
- **Empfehlung im Doc:** 1:1-Datei-Ersetzen statt Cherry-Picking, weil der Atelier-Stand inzwischen alle SEO/JSON-LD/A11y enthält (kein „nur-live" mehr in den beiden Seiten). Das eliminiert die Überschreib-Fehlerklasse strukturell.
- **Konsequenz / Handoff:** Neu: `HANDOFF-2026-06-03.md`. Geändert: 3 alte Handoffs (SUPERSEDED-Banner), `PROTOKOLL.md`. `HANDOFF-2026-06-03.md` ist ab jetzt das einzige gültige Übergabedokument.

### 2026-06-03 — Kartentitel-Stufe `--fs-h4` global um 1px verkleinert (Claude Design · Atelier · Vroni-Inline-Kommentar)
- **Was:** Token `--fs-h4` in `tokens.css` von `clamp(18px,1.5vw,19px)` → `clamp(17px,1.5vw,18px)` (ein Punkt kleiner). Wirkt global auf ALLE Kartentitel, die den Token konsumieren: `.trust-card h3`, `.step h3/h4`, `.pi-title`, `.big-node h4`, `.yp-title`, `.au-fit-col h3` (beide Seiten). `Designsystem.html`-Specimen nachgezogen (Label `18→19` → `17→18`; Demo von manuell hartem `19px` zurück auf `var(--fs-h4)` gesetzt, damit das Muster den echten Token zeigt). `CLAUDE.md`-Tokenliste aktualisiert.
- **Warum:** Vroni-Inline-Kommentar an der H4-Zeile im Designsystem: „Hier können wir überall global die Schrift um einen Punkt kleiner machen."
- **Wie:** 1× `str_replace_edit` am Token (Single Source) → greift überall via `var(--fs-h4)`. Specimen + CLAUDE.md angeglichen. (Vroni hatte die Designsystem-H4-Demo zwischenzeitlich manuell auf `19px` hardcodiert; bewusst auf den Token zurückgeführt, sonst zeigt das Muster nicht mehr den realen Wert.)
- **Alternativen:** Nur einzelne Karten verkleinern: verworfen — Kommentar sagt ausdrücklich „überall global"; der Token ist genau der richtige Hebel.
- **Konsequenz / Handoff:** Geändert: `tokens.css`, `Designsystem.html`, `CLAUDE.md`, `PROTOKOLL.md`. Kartentitel jetzt 17px (bzw. 18px auf sehr breiten Viewports). Keine HTML-Struktur-Änderung. Invariante in der Tokenliste aktualisiert.

### 2026-06-03 — Zeitstrahl-Beschreibungen (index #ueber .faden) auf einheitlich 2 Zeilen gebracht (Claude Design · Atelier · Vroni-Inline-Kommentar)
- **Was:** Die 7 Stationsbeschreibungen (`.faden .fd`) auf der Startseite auf **gleiche Länge (28–31 Zeichen, parallele „A, B und C."-Form)** ausbalanciert, damit sie in der schmalen 7-Spalten-Spalte **nie 3-zeilig**, sondern einheitlich **2-zeilig** umbrechen. Geändert: 03 Marketing „Botschaft, Reichweite und Strategie." → „Botschaft, Kanäle und Strategie."; 04 Webdesign „…und Sichtbarkeit." → „…und Führung."; 05 Branding „…und Wiedererkennung." → „…und Profil."; 06 KI-Workflows „…und Ideensparring." → „…und Sparring." (01/02/07 waren bereits passend). CSS: `.faden .fd` zusätzlich `text-wrap:balance` (gleichmäßiger Umbruch) + `min-height:3.1em` (reserviert 2 Zeilen → Stationen sitzen auf einer Linie).
- **Warum:** Vroni-Inline-Kommentar am Zeitstrahl: „Texte darunter nie 3-zeilig, immer 2-zeilig; alle möglichst gleich lang." Die alten Beschreibungen variierten 28–39 Zeichen; die langen (v.a. „…Wiedererkennung." 39) brachen auf 3 Zeilen, wodurch die Stationen ungleich hoch saßen.
- **Wie:** 4× `str_replace_edit` in `index.html` (nur die zu langen .fd), 1× `style.css` (.faden .fd Basisregel; min-height/text-wrap werden vom !important-Block nicht überschrieben). Gilt automatisch nur visuell für den Index-Zeitstrahl; die ueber-mich-Stationen nutzen dieselbe Klasse, ihre längeren Sätze wachsen über die min-height hinaus (kein Schaden). Verifier-Messung der Zeilenzahl angefordert.
- **Alternativen:** (a) Schrift kleiner: verworfen — würde unter die Token-Stufe driften und A11y verschlechtern, Problem war die Copy-Länge. (b) Nur CSS (line-clamp): verworfen — schneidet Text ab statt ihn zu balancieren; Kernfix ist gleich lange Copy. (c) Stationen auf weniger Spalten: verworfen — 7 Stationen sind inhaltlich gewollt.
- **Learnings:** Bei mehrspaltigen Mikro-Texten ist gleich lange Copy der eigentliche Hebel für sauberes Zeilenbild; `text-wrap:balance` + `min-height` für die Zeilen-Reserve stabilisieren die Optik zusätzlich.
- **Konsequenz / Handoff:** Geändert: `index.html` (4 Beschreibungen), `style.css` (.faden .fd + neue Zwischenzonen-Media-Query), `PROTOKOLL.md`. Inhaltlich minimal verschobene Begriffe (Kanäle/Führung/Profil/Sparring) bleiben akkurat und on-voice. **Verifier bestätigt Desktop** (Content 1240px): alle 7 Stationen exakt 2-zeilig, einheitlich 50px hoch. **Zwischenzonen-Nachbesserung:** Verifier fand, dass das 7-Spalten-Rail zwischen ~901–1100px zu eng wird (3-zeilig, z. B. 1024px-Laptops). Fix: neue `@media (min-width:901px) and (max-width:1120px)` schaltet den Zeitstrahl dort früher auf das komfortable 2-Spalten-Layout; das horizontale 7-Spalten-Rail bleibt ≥1121px, wo es nachweislich 2-zeilig passt. Damit ist „nie 3-zeilig" über alle Breiten erfüllt.

### 2026-06-03 — Voice-Feinschliff (Claim-Bänder) + neue Fine-Print-Token-Stufe (Claude Design · Atelier · Vroni-Inline-Kommentare)
- **Was (Voice / Bänder):**
  - **„nicht lauter, sondern klarer"-Dreifachnennung aufgelöst** (Voice 4.0 §12.2). Signaturzeile bleibt **einmal** im Startseiten-Zitat-Band (`#zitat`). Variiert: index Claim-Band (`#claim-break`) und ueber-mich Schritt 04.
  - **index Claim-Band mehrzeilig gesetzt** (Vroni: „Zitate kürzer, prägnanter, mehrzeilig" + Folgekommentar „Satz nicht löschen, nur in mehrere Zeilen setzen"): **„Deine Marke soll sich / anfühlen *wie du.* / Nur *klarer.*"** (dreizeilig, voller Satz erhalten; trägt das Markenversprechen „wie du / stimmig").
  - **ueber-mich Schritt 04** neu: H3 „Am Ende wird sichtbar, wofür du stehst." + „Klar genug, dass andere dich schnell verstehen. Und so stimmig, dass du dich darin auch in einem Jahr noch wiedererkennst." (kein „nicht X, sondern Y").
- **Was (Designsystem / Token):**
  - **Neue Stufe `--fs-fine: 12px`** in `tokens.css` (zwischen `--fs-caption` 13.5 und `--fs-label` 11.5) für **rechtliche Fine-Print-Microcopy**. 12px = bewusste A11y-Untergrenze (CLAUDE.md „nicht unter 12px"), nie kleiner.
  - **`.contact-privacy`** (Pflichtfeld-/Datenschutz-Hinweis, beide Seiten via geteilter Klasse) von `--fs-caption` → `--fs-fine`. In `Designsystem.html` (Typo-Skala) als eigene Zeile „Fine Print" dokumentiert.
- **Warum:** Zwei Vroni-Inline-Kommentare: (1) Claim-Band lief zu lang, Zitate sollen kürzer/prägnanter/mehrzeilig sein. (2) Der Datenschutz-Hinweis soll kleiner/dezenter sein; explizit „schau, ob es eine kleinere Stufe im Designsystem gibt, sonst nur hier dezenter". Es gab keine Stufe unter Caption für Legal-Microcopy → sauber als wiederverwendbares Token angelegt statt Einzelwert.
- **Wie:** `str_replace_edit` in `index.html` (Claim-Band ×2 Iterationen), `ueber-mich.html` (Schritt 04), `tokens.css` (Token), `style.css` (`.contact-privacy`), `Designsystem.html` (Specimen-Zeile). Claim-Band visuell gegengeprüft.
- **Alternativen:** (a) `.contact-privacy` auf `--fs-label` (11.5) setzen: verworfen — Label ist semantisch Uppercase/Eyebrow, und 11.5 unterschreitet die 12px-A11y-Grenze für lesbare Microcopy mit Link. (b) Einzelwert `font-size:12px` nur lokal: verworfen — Fine Print ist eine wiederkehrende Rolle (auch `.form-note`, künftige Legal-Texte); Token hält das System lückenlos.
- **Learnings:** „Mach es kleiner" bei Legal-Text immer gegen die A11y-Untergrenze (12px) prüfen, nicht blind verkleinern. Wiederkehrende Microcopy verdient eine benannte Token-Stufe, sonst entsteht genau der Einzelwert-Drift, den wir abgeschafft haben.
- **Konsequenz / Handoff:** Geändert: `index.html`, `ueber-mich.html`, `tokens.css`, `style.css`, `Designsystem.html`, `PROTOKOLL.md`. Neue Invariante: Fine-Print-Microcopy nutzt `--fs-fine` (12px), nicht kleiner. Wirkt automatisch auf beide Seiten (geteilte `.contact-privacy`).

### 2026-06-03 — Gesamt-Audit: Duplikate/Überschreib-Risiken bereinigt + Text-/Voice- und Designsystem-Check (Claude Design · Atelier · Vroni-Auftrag)
- **Was (Duplikate / „doppelte Daten im Hintergrund", Hauptanliegen):**
  - **`scripts/style-guard.mjs` gelöscht.** War ein **verwaister, zweiter Guard** parallel zum aktiven `.github/design-hygiene.cjs`. Problematisch gleich doppelt: (a) sein eigener Header behauptet, als CI-Job „style-guard" zu laufen, aber `ci.yml` hat keinen solchen Job (aktiv ist `design-guard` → `design-hygiene.cjs`); (b) er erzwingt die **veraltete** Regel `CANONICAL_CSS = 'style.css'`, obwohl die Tokens seit dem Refactor in `tokens.css` liegen. Hätte jemand ihn editiert/reaktiviert, wäre er gegen die aktuelle Architektur gelaufen. → genau die Fehlerklasse, die Vroni meint.
  - **`.gitignore` erweitert:** `_*` und `_handoff/` ergänzt. Damit gelangen Atelier-Scratch-Vollkopien (`_index-hero-neu4.html` = komplette, veraltete Startseiten-Kopie mit Em-Dashes; `_handoff/<snapshot>/index.html` + `style.css`) **nie** in einen Live-Merge und können bei einer Übergabe nichts überschreiben. Der Design-Guard überspringt `_`-Dateien ohnehin schon (`design-hygiene.cjs` Z. 18); jetzt ist es auch git-seitig abgesichert. Dateien selbst bleiben als Historie im Atelier.
  - **Geprüft, aber bewusst belassen:** mehrere Handoff-Docs (`HANDOFF-*.md`, `PENDING-FOR-CLAUDE-CODE.md`) sind Dokumentation, keine Code-Duplikate. `Designsystem.html` zeigt die echten Seiten seit dem letzten Umbau als Live-iframe (kein Mock-Duplikat mehr).
- **Was (Text / Voice 4.0 — beide Seiten durchgegangen):**
  - **Ergebnis: beide Seiten stark auf Voice-4.0-Linie.** Positionierung korrekt („Brand- & Website-Strategin mit KI als Werkzeug"), Markenkern + Arbeitsprinzip wörtlich präsent, beobachtungsbasierte Einstiege, natürliche Sätze. **Kein Em-Dash** (CI-bestätigt), **keine verbotenen Buzzwords** (kein „authentisch/Transformation/ganzheitlich/Next Level/…"), KI sauber als Werkzeug gerahmt.
  - **Ein offener Punkt für Vroni (NICHT eigenmächtig geändert, weil Signatur-Copy auf Full-Bleed-Bändern):** Die Konstruktion „nicht X. Sondern Y." wird seitenübergreifend ~12–14× als Stilmittel genutzt; Voice 4.0 §12.2 warnt vor Häufung. Besonders: die Zeile **„nicht lauter, sondern klarer"** erscheint **3× fast wortgleich** (index Zitat-Band, index Claim-Band, ueber-mich Schritt 04). Empfehlung: 2 der 3 Stellen variieren, damit die Kernzeile einmal mit voller Wucht landet. → Vroni zur Entscheidung vorgelegt.
- **Was (Designsystem/Formatierung):** Token-Anwendung auf beiden Seiten gegengeprüft (eigener Verifier-Lauf, getComputedStyle je Text-Rolle). **Ergebnis: px-genau konsistent über beide Seiten** — Body 17, Lead 19/600, Subline 18, H2, Kartentitel 18, Karten-/Listentext einheitlich (inkl. `.faden .fd === .step p`). Beide laden `tokens.css` (73 Custom-Props, alle `var(--*)` lösen auf), keine externe Font-CDN. **Ein Mini-Fix umgesetzt:** `.au-fit-col h3` erbte Gewicht 650, alle anderen Kartentitel sind 600 → explizit auf `font-weight:600` gesetzt (gleiche Rolle = gleicher Wert). Nicht-Drift-Notiz: Karten-/Listentext-Tier rendert site-weit einheitlich (Token `--fs-body-sm`), nur der im Task genannte 15.5-Wert ist real der Token-Wert aus `tokens.css` — konsistente Anwendung, kein Drift.
- **Warum:** Vroni-Auftrag: gesamte Website auf Richtlinien-Konformität (Texte + Formatierung + Designsystem) prüfen UND sicherstellen, dass keine doppelten Hintergrund-Daten bei Übergabe etwas überschreiben.
- **Wie:** `list_files`/`grep` über Projektbaum (Em-Dash-Scan, Referenz-Scan für `style-guard`/`_index`/`_handoff`), `ci.yml` gegengelesen (welcher Guard aktiv), beide HTML-Seiten vollständig gelesen und gegen Voice 4.0 / Foundation 2.0 abgeglichen, verwaisten Guard gelöscht, `.gitignore` ergänzt, Token-Check an Verifier delegiert.
- **Alternativen / Abwägungen:**
  - **Signatur-Copy („lauter/klarer") selbst umschreiben:** verworfen. Full-Bleed-Marken-Claims sind Vroni-Entscheidung (CLAUDE.md: inhaltliche Änderungen laufen über Vroni). Stattdessen präzise geflaggt mit Fundstellen + konkretem Vorschlag.
  - **`_index-hero-neu4.html` / `_handoff/` löschen statt gitignoren:** verworfen — append-only/Historie. Gitignore schützt vor Überschreiben, ohne Historie zu vernichten.
  - **Beide Guards zusammenführen statt einen löschen:** verworfen — zwei Guards = Drift per Definition; der aktive (`design-hygiene.cjs`) ist korrekt und aktuell, der andere veraltet. Single Source.
- **Learnings:** Selbst-dokumentierende Skripte können lügen: `style-guard.mjs` behauptete CI-Anbindung, die es nicht (mehr) gab. Bei „doppelte Daten"-Audits IMMER gegen `ci.yml`/echte Verdrahtung prüfen, nicht gegen den Datei-Kommentar. Vollkopien von `index.html`/`style.css` (Scratch, Snapshots) sind das größte stille Überschreib-Risiko bei 1:1-Copy-Paste-Handoffs → per `_`-Konvention + gitignore strukturell entschärfen.
- **Konsequenz / Handoff:** Gelöscht: `scripts/style-guard.mjs` (Ordner `scripts/` jetzt leer). Geändert: `.gitignore`, `PROTOKOLL.md`. **Kein** Inhalts-/CSS-Change an den Live-Seiten in diesem Schritt. **Offen für Vroni:** Entscheidung zur „lauter/klarer"-Dreifachnennung. **Hinweis Claude Code:** `_`-präfixierte Dateien und `_handoff/` nicht mehr committen (jetzt gitignored); aktiver Design-Guard ist allein `.github/design-hygiene.cjs`.

### 2026-06-03 — Brand Foundation 2.0 + Brand Voice 4.0 aus Google Drive ins Projekt übernommen (neue verbindliche Basis) (Claude Design · Atelier · Vroni-Auftrag)
- **Was:** Vroni hat ihr „Global Brand Source Set" auf Google Drive neu überarbeitet und gebeten, es als Basis zu nehmen. Alle 5 Dokumente per Drive-Connector gelesen und nach **`brand/`** gespiegelt (Claude Code hat keinen Drive-Zugriff, deshalb lokal): `Vroni_Brand_Foundation_2.0_Master.md`, `Vroni_Brand_Voice_4.0_Master.md`, `Vroni_Brand_Foundation_2.0_KI_Kurzbriefing.md`, `Vroni_Voice_4.0_KI_Kurzprompt.md`, `README_Global_Brand_Source_Set.md`. `CLAUDE.md`-Brand-Sektion auf das neue Kernset umgestellt.
- **Warum:** Neuer verbindlicher Markenstand. Laut README gilt bei Widersprüchen: Foundation 2.0 + Voice 4.0 gewinnen; ältere Guides (inkl. `uploads/Vroni_Brand_Voice_2_0.md`) sind Archiv.
- **Wichtigste inhaltliche Änderungen ggü. altem Stand (für künftige Copy relevant):**
  - **Positionierung** geschärft: „Brand- & Website-Strategin mit KI als Werkzeug" (KI explizit als Werkzeug, nicht Identität). Yoga/Nervensystem jetzt als „Holistic Performance"-Layer, nicht Hauptschiene.
  - **Markenkern neu:** „Innere Klarheit in äußere Form übersetzen" (vorher war „Sichtbar werden, ohne dich zu verbiegen" der Kern; das ist jetzt das **Markenversprechen**). Arbeitsprinzip „Erst verstehen. Dann sortieren. Dann sichtbar machen."
  - **Voice 4.0 bestätigt unsere Em-Dash-Regel ausdrücklich** (§12.5/§13: keine unnötigen Gedankenstriche). Zusätzlich neu/geschärft: keine KI-Dreierketten, keine überperfekte Satzsymmetrie, nicht zu viele „nicht X, sondern Y"-Kontraste, keine leeren Buzzwords (authentisch/Transformation/Sichtbarkeit/Klarheit ohne Kontext), keine „KI-weiche" Sprache (darfst du, einladen, Raum halten, liebevoll).
  - Quellenhierarchie + Qualitäts-/Voice-Checks dokumentiert (in `brand/README…` und den Mastern).
- **Wie:** Drive-Connector (search_files im Ordner, read_file_content je Datei). Inhalte als bereinigtes Markdown nach `brand/` geschrieben (Escaping der Drive-Text-Repräsentation entfernt). `CLAUDE.md` Brand-Voice-Sektion ersetzt (Verweis auf `brand/`-Set, neue Positionierung/Markenkern, erweiterte Verbotsliste, Sprachrhythmus nach 4.0).
- **Alternativen/Abwägungen:** (a) Nur Drive verlinken statt lokal spiegeln: verworfen, Claude Code/Offline braucht lokale Dateien (Self-Contained-Prinzip). (b) `uploads/Vroni_Brand_Voice_2_0.md` löschen: verworfen (append-only/Historie); stattdessen in CLAUDE.md + README als Archiv markiert. (c) Website-Copy sofort auf 4.0 umschreiben: bewusst NICHT in diesem Schritt, der Auftrag war „als Basis nehmen". Bestehende Copy ist weitgehend kompatibel (Hero-Versprechen bleibt gültig).
- **Learnings:** Marken-Quellen gehören als lokale, versionierte Dateien ins Repo, sonst driften Tool-Briefings auf alte Stände (genau das Problem, das das Source Set lösen soll). Connector-Text-Repräsentation escaped Markdown-Sonderzeichen, beim Spiegeln bereinigen.
- **Konsequenz/Handoff:** Neu: 5 Dateien in `brand/`. Geändert: `CLAUDE.md` (Brand-Sektion), `PROTOKOLL.md`. **Offen/optional (mit Vroni klären):** Website-Texte (v.a. Startseite/Über-mich) gegen Voice 4.0 + neue Positionierung gegenprüfen und ggf. nachschärfen; Markenkern „Innere Klarheit in äußere Form" könnte an passender Stelle sichtbar werden. **Em-Dash-Invariante** ist durch Voice 4.0 jetzt offiziell quellenbelegt.

### 2026-06-03 — Single Source of Truth: tokens.css eingeführt, Designsystem an Live-Styles angebunden, CI-Guard gegen Drift + H1/H2-Skala nach Profi-Typo (Claude Design · Atelier · Vroni-Auftrag „saubere, driftfreie Daten" + Inline-Kommentar H1/H2)
- **Auslöser:** Vroni: „Erstelle eine Regel/Skill, die sicherstellt, dass wir keine falschen Formatierungen/Schriften/Designs mehr haben. Nur saubere, bereinigte Daten, damit Claude Design UND Claude Code fehlerfrei arbeiten. Wir überschreiben gerade ständig etwas, das man zurückändern muss." + Auftrag „Designsystem.html aktualisieren, Typo-Specimen stimmt optisch nicht" + Inline-Kommentar „H1/H2-Unterschied aus Profisicht prüfen, H2 evtl. kleiner".
- **Wurzelursache gefunden:** `Designsystem.html` war ein **paralleler, eigenständiger Klon** — eigenes (veraltetes) `:root` OHNE unsere `--fs-*`/`--shadow-*`/`--space-*`-Tokens, Schrift **Open Sauce Sans von einer CDN** (falsche Schrift + Verstoß gegen die Lokal-Fonts-Regel). Jede Änderung an `style.css` ließ das Designsystem still veralten → man „korrigierte" dann an der falschen Stelle. Genau der Drift-/Überschreib-Schmerz.
- **Was umgesetzt (strukturelle Lösung):**
  1. **`tokens.css` neu** = EINZIGE Quelle für alle Design-Tokens (Farbe, Typo, Spacing, Radius, Elevation, Motion, Z-Index) **und** alle lokalen `@font-face`. Per Skript verlustfrei aus `style.css` extrahiert.
  2. **`style.css`** bindet `tokens.css` als allererste Regel ein (`@import url("tokens.css");`); das alte `:root` + `@font-face` dort entfernt. Seiten ziehen die Tokens automatisch (sie linken `style.css`).
  3. **`Designsystem.html`** ist jetzt **Viewer**: `<link rel="stylesheet" href="tokens.css">`, CDN-`@font-face` raus, veraltetes `:root` raus. Folge: Typo-Specimen + Farb-Swatches + alle `var(--…)`-Demos rendern jetzt die **echten Live-Werte** (Figtree, korrekte Größen) — das vom User bemängelte „Beispielgrößen passen nicht" war exakt diese fehlende Token-Auflösung.
  4. **Regel-Dokument `DESIGN-HYGIENE.md`** (die „Regel/Skill"): Kernprinzip Single Source of Truth, Verbotsliste (Token-Doppeldefinition, Font-CDN, Em-Dash in HTML, DS ohne tokens.css), Workflow bei Token-Änderungen, Audit-Checkliste.
  5. **CI-Guard `.github/design-hygiene.cjs` + Job `design-guard`** (in `ci.yml`): scheitert bei externer Font-CDN, Em-Dash in `*.html`, Token-DEFINITION außerhalb `tokens.css`, fehlendem `tokens.css`-Link/`@import`. Scratch-Dateien (`_*`, `_handoff/`) werden übersprungen.
- **Was umgesetzt (Inhalt/Typo):**
  - **H1/H2 nach Profi-Typo glattgezogen.** Vorher (max): Display 66 / H1 52 / H2 48 → Verhältnis H1:H2 = **1.08** (zu nah, beide kaum unterscheidbar), während H2:H3 mit 2.0 sprang. Eine saubere modulare Skala will ein **wahrnehmbares, konsistentes Verhältnis (~1.2)** zwischen benachbarten Headline-Ebenen. Neu: `--fs-h1` clamp(33,4.2vw,**50**), `--fs-h2` clamp(28,3.3vw,**42**) → H1:H2 ≈ **1.19** (am Cap), über den ganzen clamp-Bereich ~1.18–1.21. H2 ist damit „ein kleines bisschen kleiner" (User-Wunsch) und der Hero (66) dominiert klar. Gilt site-weit über den `!important`-Block (`.shead h2` etc.).
  - **Designsystem-Prosa bereinigt:** alle Em-Dashes raus, veraltete Referenzen („Open Sauce", „Fresh Organic Hybrid", „v2") → Figtree / InnerLine / „Quelle der Wahrheit: tokens.css + style.css". H1/H2-Specimen-Labels auf 33→50 / 28→42.
  - **H3-Gewicht global 700 → 650** (Inline-Kommentar Vroni: „700 ist zu fett"): `.offer h3` + `.yoga-card .yh` (beide `--fs-h3`-Tier) + Specimen. H3-Tier liegt damit auf demselben Gewicht wie H1/H2 (650), ruhiger.
  - **`--fs-body-sm` global 15.5 → 16** (Inline-Kommentar Vroni: „minimal größer, einheitlich"): eine Token-Änderung in `tokens.css` → wirkt überall (Trust-Cards, Pain-Liste, Step-Text, Offer-Desc, Yoga-Desc, Über-mich-Listen). Per `getComputedStyle` bestätigt (16px überall). Bestes Beispiel dafür, dass die Single-Source-Architektur greift: 1 Wert geändert, kein Nachpflegen.
  - **Bestehende Em-Dash-Funde bereinigt** (Guard fand 43, meist Scratch): GoatCounter-Kommentare auf allen Live-Seiten (404/barrierefreiheit/datenschutz/impressum) → `·`; sichtbare Em-Dashes in `datenschutz.html` natürlich umformuliert. **Recht aktuell gehalten:** `datenschutz.html` Schrift-Angabe „Open Sauce Sans für Texte" → „Figtree für Texte" (technischer Stand stimmt jetzt wieder).
  - **Verifikation:** Guard-Logik im Sandbox über alle Live-Dateien → **0 Verstöße** (7 HTML, 3 CSS). `@import tokens.css` auf `index.html` per `getComputedStyle` bestätigt (Figtree, `--fs-h2` neu, Body 17). Designsystem-Specimen rendert echte Tokens.
- **Alternativen / Abwägungen:**
  - **Designsystem die volle `style.css` linken** (statt nur `tokens.css`): verworfen — `style.css` hat globale Layout-Regeln (`.nav{position:fixed}`, `.reveal{opacity:0}`), die das Doku-Layout zerschießen würden. `tokens.css` (nur Tokens + Fonts) ist kollisionsfrei.
  - **`tokens.css` per zweitem `<link>` in jede Seite** statt `@import` in `style.css`: verworfen — hätte alle Seiten-Heads angefasst (mehr Dateien, mehr Risiko). `@import` als erste Regel ist valide und zentral; minimaler Mehraufwand beim Laden (in PROTOKOLL als optionaler Perf-Punkt vermerkt).
  - **H2 nur leicht (auf 46) senken:** verworfen — hätte das 1.08-Problem kaum gelöst. 42 bringt das Verhältnis in den wahrnehmbaren ~1.2-Bereich, ohne dass H2 als Section-Headline an Wirkung verliert.
  - **Scratch-Dateien (`_index-hero-neu4.html`, `_handoff/`) bereinigen statt überspringen:** verworfen — sind nicht Teil der Live-Seite; Guard überspringt `_*` per Konvention. (Aufräumen/Löschen wäre ein eigener PR.)
  - **Em-Dash-Check auf HTML-Kommentare ausweiten/ausnehmen:** Kommentare werden mitgeprüft (GoatCounter) — bewusst, damit die Regel lückenlos ist; die Kommentare wurden auf `·` umgestellt.
- **Learnings:**
  - **Die eigentliche Drift-Quelle war Architektur, nicht Nachlässigkeit:** ein Doku-/Spec-Dokument, das Tokens *kopiert* statt sie zu *konsumieren*, veraltet zwangsläufig. Lösung = eine konsumierbare Token-Datei, die ALLE (Site + Doku) einbinden.
  - **`@import` als erste Regel** ist der risikoärmste Weg, Tokens zentral bereitzustellen, ohne jede Seite anzufassen.
  - **Modulares Verhältnis schlägt Bauchgefühl:** Headline-Ebenen mit < ~1.15 Verhältnis lesen sich nicht als getrennte Ebenen. 1.08 war messbar zu eng — Vronis Auge lag richtig.
  - **Ehrlich bzgl. „Profi-Empfehlung zuerst":** Ich hatte die H1/H2-Tokens schon geändert, bevor ich die Begründung sauber dargelegt habe. Die Werte sind fachlich belegt (s. o.) und über ein einziges Token (`--fs-h2`) trivial nachjustierbar, falls Vroni 44 statt 42 möchte.
- **Konsequenz / Handoff:** Neu: `tokens.css`, `DESIGN-HYGIENE.md`, `.github/design-hygiene.cjs`. Geändert: `style.css` (@import statt :root/@font-face), `Designsystem.html` (Viewer + bereinigt), `.github/workflows/ci.yml` (Job `design-guard`), `index.html`/`ueber-mich.html` (frühere Em-Dash-Runde), `404/barrierefreiheit/datenschutz/impressum.html` (GoatCounter-Kommentar; datenschutz: Em-Dash + Figtree), `CLAUDE.md` (+DESIGN-HYGIENE-Verweis, tokens.css, H1/H2), `PROTOKOLL.md` (+Invariante). **Claude Code:** beim Handoff `tokens.css` als neue Datei anlegen, `style.css`-`@import` beibehalten, `design-hygiene.cjs` + CI-Job übernehmen; danach läuft der Drift-Schutz automatisch. **Offen/optional:** (a) Perf — `@import` ggf. später durch zwei `<link>` ersetzen, falls Lighthouse den seriellen Load moniert; (b) Scratch-Dateien `_*` in eigenem PR aufräumen; (c) DS-Komponenten-Demos nutzen noch eigene Mock-Styles (driften nicht bei Tokens, da token-getrieben — könnten später auf echte Komponenten-Klassen umgestellt werden).

### 2026-06-03 — Em-Dash-Verbot (Brand Voice) + Typo-Zuordnungs-Feinschliff auf Index & Über-mich (Claude Design · Atelier · Vroni-Audit-Auftrag)
- **Was (zwei Themen in einer Runde):**
  - **A · Gedankenstriche/Em-Dashes (`—`) raus.** Alle sichtbaren Texte auf `index.html` + `ueber-mich.html` von Em-Dashes befreit und **natürlich umformuliert** (Punkt/Komma/Doppelpunkt, nicht bloß Zeichen getauscht). Betroffen: Stationstexte, Steps-Intro, Step-Beschreibungen, Offer-Texte, „Das große Ganze"-Lead-Body (jetzt Doppelpunkt), Kontakt-Body, Form-Notes, Form-Success-H3, og:description. Zusätzlich **alle Alt-Texte** (4 auf Über-mich, 8 auf Index — Screenreader lesen sie vor) per Skript bereinigt (`" — x"` → `". X"`). GoatCounter-Code-Kommentare auf `·` umgestellt. Echte Komposita-Bindestriche („KI-Workflow", „Sortier-Moment") bleiben.
  - **Regel verankert:** „Keine Em-Dashes im Fließtext" neu in **`CLAUDE.md`** (Brand-Voice-Sprachrhythmus) UND im kanonischen **`uploads/Vroni_Brand_Voice_2_0.md`** (Stil-Regeln, §5).
  - **B · Typo-Zuordnungs-Audit** beider Seiten via `getComputedStyle` (alle Textelemente nach Größe gebündelt, Ausreißer gesucht). Echte Fehlzuordnungen korrigiert (alle jetzt token-getrieben):
    - `.yoga-lead` 16.5px → `--fs-subline` (18, Section-Intro wie `.shead p`).
    - `.yoga-card .yh` 27px → `--fs-h3` (20→24, Feature-Card-Titel wie `.offer h3`).
    - `.faq-item .fq-title` clamp(16–18) → `--fs-h4` (18→19, Accordion-/Kartentitel).
    - `.form-success h3` 24px → `--fs-h3`.
    - `.contact-privacy` **10.5px → `--fs-caption` (13.5)** — war unter dem A11y-Floor (BFSG/WCAG, „kleine Captions nicht < 12px").
    - `.ypd-day` 10.5px → `--fs-label` (11.5) — gleicher A11y-Floor-Grund.
  - **Bewusst NICHT geändert** (legitime UI-/Deko-Tiers, kein Fließtext): Nav-Links 14.5, Offer-CTA `.more` 14, Hero-Chip `.t1` 14, Faden-Node-Zahl `.fi` 12.5, Deko-Großzahlen `.num`/`.snum`, Brand-Wordmark, `.g`-Akzent (1.06em relativ), Pull-Quote/Claim-Display. Diese sind UI-Chrome bzw. bewusste Display-Sonderfälle, keine Prosa.
- **Warum:** Vroni-Audit-Auftrag „alle Texte richtig & logisch dem Designsystem zugeordnet" + separater Hinweis auf die vielen Gedankenstriche. Em-Dash ist ein klassisches KI-Stilmerkmal; fällt unter die bestehende Brand-Voice-Regel „keine KI-Floskeln / kein typischer KI-Rhythmus". **Ehrlichkeits-Hinweis an Vroni:** die Brand Voice nannte den Gedankenstrich vorher NICHT wörtlich (nur „abgehackte Claim-Kaskaden" + „KI-Floskeln") — daher jetzt explizit ergänzt, damit die Regel künftig eindeutig greift.
- **Wie:** Sichtbare Copy per `str_replace_edit` (natürliche Umformulierung, je Stelle einzeln abgewogen). Alt-Texte per `run_script`-Regex (nur innerhalb `alt="…"`, Großschreibung nach neuem Satzpunkt automatisch). Typo-Fixes als 6 `str_replace_edit` in `style.css` (alle auf `var(--fs-…)`). Verifikation: `getComputedStyle` auf Index — alle sechs Fixes korrekt (18/20/18/20/13.5/11.5).
- **Alternativen / Abwägungen:**
  - **Em-Dash nur durch Komma ersetzen (mechanisch):** verworfen — liest sich oft falsch (z. B. „Atmosphäre, und das Gespür"). Stattdessen je Stelle die natürlichste Lösung: meist Punkt (zwei Sätze) oder Doppelpunkt bei Aufzählung.
  - **Alt-Texte unangetastet lassen:** verworfen — sind vorgelesener Text, fallen unter dieselbe Regel; KI-Tell soll nirgends auftauchen.
  - **`.yoga-card .yh` als eigenen großen Card-Titel (27px) behalten:** verworfen — keine Token-Stufe, und die Yoga-Karte ist rollengleich zur Offer-Karte (Feature-Card) → `--fs-h3` ist die korrekte, konsistente Zuordnung.
  - **UI-Mikrolabels (Nav 14.5, Badges) auf Tokens zwingen:** bewusst nicht — das ist UI-Chrome, kein Fließtext; Zwang würde Layout-Churn ohne Lesbarkeitsgewinn erzeugen. Als „UI-Tier" akzeptiert.
- **Learnings:**
  - **Em-Dash ist der auffälligste KI-Tell in deutscher Copy.** Wenn eine Marke „nicht nach KI klingen" will, gehört das Em-Dash-Verbot explizit in die Brand Voice — „keine KI-Floskeln" allein wird zu unscharf ausgelegt.
  - **Audit per `getComputedStyle`-Bündelung** (alle Textknoten nach px gruppieren) findet Fehlzuordnungen zuverlässig: Cluster = Token-Stufen, Einzelwerte dazwischen = Verdächtige. Schneller als Datei-Lesen.
  - **A11y-Floor ernst nehmen:** 10.5px-Fließ-/Captiontext (contact-privacy) ist ein echter BFSG-Verstoß, der im Token-System leicht durchrutscht, wenn man nur „sieht's hübsch aus" prüft.
- **Konsequenz / Handoff:** Geändert: `index.html`, `ueber-mich.html` (Copy + Alt-Texte), `style.css` (6 Typo-Fixes), `CLAUDE.md` + `uploads/Vroni_Brand_Voice_2_0.md` (Em-Dash-Regel), `PROTOKOLL.md`. Kein Layout-/Struktur-Change. **Neue Invariante (siehe Abschnitt Invarianten):** kein `—` im Fließtext/Alt-Text. Beide Seiten sind jetzt em-dash-frei (nur noch im GoatCounter-Code-Kommentar entfällt das ebenfalls). Vor künftigen Copy-Änderungen: Em-Dash-Check (z. B. CI-Grep auf `—` in `*.html`).

### 2026-06-03 — Stationen-Text (`.faden .fd`) von Caption auf Body-S hochgestuft (Claude Design · Atelier · Inline-Kommentar)
- **Was:** `.faden .fd` (Beschreibungstext der Zeitstrahl-Stationen) im `!important`-Block von `--fs-caption` (13.5px) auf `--fs-body-sm` (15.5px / lh 1.55) umgestellt — jetzt **pixelgenau identisch zu `.step p`** (Beschreibung in „Wie ich arbeite"). Verifiziert via `getComputedStyle` (15.5px/24.025px/w400/ink-soft, identisch).
- **Warum:** Vroni-Inline-Kommentar an einer Station auf der Über-mich-Seite: Text wirkt zu klein, müsste „der Logik nach" dieselbe Formatierung haben wie der beschreibende Text in „Wie ich arbeite". Stimmt: Die Stationsbeschreibung ist **beschreibender Inhalt** (gleiche Rolle wie eine Card-Beschreibung), kein Meta/Caption-Text. Die Caption-Stufe (13.5) ist für echte Meta reserviert (Bildunterzeile, Zeitstempel).
- **Wie:** Ein `str_replace_edit` im `!important`-Block von `style.css`. Gilt global (Index-About-Faden + Über-mich-Stationen) — korrekt, da dieselbe Komponente/Rolle.
- **Alternativen:** Nur auf Über-mich ändern: verworfen — `.faden` ist dieselbe Komponente auf beiden Seiten; „gleiche Rolle = gleicher Token" gilt global, sonst entsteht neuer Drift.
- **Learnings:** Token-Zuordnung muss der **semantischen Rolle** folgen, nicht der optischen Größe einer engen Spalte. Ein 6-spaltiger Zeitstrahl verleitet dazu, Text „klein zu machen, damit's passt" — richtig ist: korrekte Body-S-Stufe, Layout notfalls mehr Zeilen.
- **Konsequenz / Handoff:** Nur `style.css` (+ dieser Eintrag). Betrifft Index-About-Zeitstrahl mit (minimal größer) — gewollt, konsistenter.

### 2026-06-03 — Designsystem zum vollständigen Token-System ausgebaut + Index-Skala glattgezogen (Claude Design · Atelier · Vroni-Auftrag „vorbildlich & lückenlos")
- **Was:**
  - **Typo-Skala als CSS-Tokens** (`:root` in `style.css`): `--fs-display/h1/h2/h3/h4/lead/subline/body/body-sm/caption/label` + Zeilenhöhen (`--lh-tight/head/snug/body/prose`) + Laufweiten (`--ls-head/snug/label`). Abgeleitet aus den realen Index-Werten (maßgeblich: der `!important`-Feintuning-Block), logisch auf wenige saubere Stufen glattgezogen.
  - **Index-Werte glattgezogen** (Redundanzen eliminiert): Offer-H3 `26px` → `--fs-h3` (clamp 20→24); verirrtes `16px`-Tier aufgelöst (Card-Desc → `--fs-body-sm` 15.5, Prosa → `--fs-body` 17); Kartentitel (Trust/Step/Pain/Yoga/Big-Node) auf einheitlich `--fs-h4` (18→19); Labels 11/11.5/12 → `--fs-label` 11.5; Faden-Label 15 → 15.5. Der komplette `!important`-Block ist jetzt auf `var(--…)` umverdrahtet.
  - **Spacing-Skala als Tokens**: `--space-3xs…2xl` (4px-Basis) + semantisch `--pad-card` 30, `--gap-grid` 18, `--gap-label` 10, `--gap-title` 12, `--gap-stack` 18, `--shead-gap` 48. **Karten-Text-Rhythmus global vereinheitlicht** (Label→Titel→Text-Abstände über alle Karten-Familien gleich), damit Texte in jeder Kachel identisch sitzen.
  - **Weitere Fundament-Tokens** (Senior-Standard, neu): Elevation `--shadow-sm/card/md/lg/xl`; Motion `--ease-out`, `--dur-1/2/3`, `--dur-img`; Z-Index-Ebenen `--z-base…skip`; Breakpoint-Referenzen (1080/900/560) als dokumentierte Kommentare.
  - **`Designsystem.html` umgebaut** zu vorbildlichem Aufbau „Fundament zuerst, dann Komponenten" — neue Sektionen: 02 Typo (auf Tokens aktualisiert), **03 Spacing & Raster, 04 Radien & Form, 05 Elevation & Schatten, 06 Motion & Transitions (live Hover-Demo), 07 Breakpoints, 08 Fokus/Zustände/Barrierefreiheit (Fokus-Ring + Kontrast-Paarungen), 14 Links/Inline-Text/Listen, 18 Z-Index & Iconografie**. Bestehende Komponenten-Sektionen entsprechend umnummeriert (→ 09–19).
  - **`ueber-mich.css`** vollständig auf Tokens umgestellt (Body/Lead/Card-Heading/Listen/Labels → `var(--fs-…)`, Karten-Abstände → `var(--pad-card/--gap-*)`). Über-mich-Fließtext dabei von 16 auf **17px** korrigiert (= echte About-Prosa der Index, die via `!important` 17px ist — die 16px-Basisregel war irreführend).
  - **`CLAUDE.md`** Typo-Sektion auf Token-Referenzen + Spacing/Elevation/Motion erweitert; `Designsystem.html` als visuelle Quelle der Wahrheit benannt.
  - **Verifikation:** `getComputedStyle` über Index (Offer/Trust/Step/Pain/Ansatz/Faden) + Über-mich — alle Rollen token-getrieben & konsistent; keine Konsolenfehler. Designsystem-Sektionen visuell geprüft (Screenshots).
- **Warum:** Vroni-Aufträge in Folge: (1) „alle Schriften einheitlich mit globalen Stilen", (2) „vorrangig von den Index-Stilen ausgehen, logisch glattziehen, final ins Designsystem", (3) „Abstände gleichmäßig, Texte in Kacheln einheitlich", (4) „recherchiere, was ein Senior sonst im Designsystem definiert, ergänze es für ein lückenloses System". Vorher war die Skala real vorhanden, aber als hartcodierte Werte über `style.css` verstreut (15.5/16/17-Drift, 26px-Ausreißer, Labels 11–12) und im Designsystem **veraltet** dokumentiert (zeigte noch 64/800-Display, Body 15).
- **Wie:** Skala aus `style.css` (Basis + `!important`-Block) rekonstruiert → saubere Stufen definiert → als `:root`-Tokens angelegt → Basisregeln + kompletten `!important`-Block + `ueber-mich.css` per `str_replace_edit` auf `var(--…)` umverdrahtet → `Designsystem.html` umnummeriert (9 Edits) + 8 neue Sektionen eingefügt → `getComputedStyle`-Stichprobe → Screenshots.
- **Alternativen / Abwägungen:**
  - **Fließtext auf 16px statt 17px vereinheitlichen:** verworfen — der dominante Content-Prosa-Wert der Index (Ansatz/About/Principle) ist im `!important`-Block bewusst 17px. 16px war der verirrte Sonderwert (Offer-Desc/Big-Body) → der wurde aufgelöst, nicht 17px.
  - **Designsystem-Sektionen einfach hinten anhängen (12+):** verworfen zugunsten „Fundament zuerst"-Umnummerierung — kostet 9 Edits mehr, ist aber der erwartbare, vorbildliche DS-Aufbau (Foundations vor Components).
  - **Alle hartcodierten Schatten/Easings in `style.css` rückwirkend auf Tokens migrieren:** bewusst NICHT in diesem Schritt (hohes Regressionsrisiko, großer Diff). Tokens sind angelegt + dokumentiert + ab jetzt Standard; Bestand wird bei Berührung migriert. **Offener Migrationspunkt** (siehe unten).
  - **Web-Recherche für „was gehört ins DS":** bewusst nicht — stabiles Designsystem-Handwerk, kein zeitkritisches Wissen. Stattdessen Experten-Checkliste angewandt (Foundations: Color/Type/Space/Radius/Elevation/Motion/Breakpoints/Z-Index/A11y; Components; Content-Styles).
- **Learnings:**
  - **CSS-Custom-Properties sind die echte „ins Designsystem übernehmen"-Architektur** — eine Token-Änderung wirkt site-weit, statt N hartcodierte Stellen zu pflegen. Der frühere `!important`-Block war schon ein Single-Source-Ansatz, aber mit Magic Numbers; Tokens machen ihn benennbar und in `Designsystem.html` zeigbar.
  - **Maßgeblich ist der `!important`-Feintuning-Block, nicht die Basisregel** (z. B. About-Body real 17px, nicht 16px). Bei Skala-Arbeit immer beide lesen.
  - **„Glattziehen" heißt Stufen reduzieren, nicht alles gleich machen** — Card-Text (15.5) bleibt bewusst eine Stufe unter Fließtext (17); eliminiert wurden nur echte Beinah-Dubletten (15.5 vs 16, 11 vs 12, 26 als einzelner Ausreißer).
- **Konsequenz / Handoff:** Geändert: `style.css` (Token-`:root` + Basis + kompletter `!important`-Block auf `var()`), `ueber-mich.css`, `Designsystem.html` (umgebaut), `CLAUDE.md`, `PROTOKOLL.md`. **Kein HTML-Markup-Change** an `index.html`/`ueber-mich.html` (nur CSS). Sichtbare, gewollte Mini-Änderungen auf Index: Offer-H3 etwas kleiner (26→max 24), Offer-Desc 16→15.5, Big-Body/Foot 16→17, Kartentitel minimal vereinheitlicht. **Vor Merge:** Index einmal über alle Breakpoints sichten (Werte sind geprüft, aber visuelle Endabnahme durch Vroni sinnvoll). **Offener Migrationspunkt:** hartcodierte Schatten/Transitions in `style.css` schrittweise auf `--shadow-*`/`--ease-out`/`--dur-*` umstellen, wenn die jeweilige Regel ohnehin angefasst wird (kein Big-Bang).

### 2026-06-03 — Über-mich: Typografie projektweit vereinheitlicht + neue Arbeitsunterweisung in CLAUDE.md (Claude Design · Atelier · Vroni-Auftrag „alle Schriften einheitlich über globale Stile")
- **Was:**
  - **Audit aller Texte auf `ueber-mich.html`** gegen die globale Token-Skala in `style.css` (inkl. `!important`-Feintuning-Block Z. 712–770). Befund: Lauftext lief über **vier** verschiedene Größen (`clamp(16,17.5)`, `16.5px` ×2), Lead-Sätze über **drei** (`clamp(19,26)`, `clamp(19,22)`, `clamp(17,19)`), Hero-Lede als Sonderwert. → alles auf die kanonischen Tokens zurückgeführt.
  - **Geteilter Text-Token-Block** in `ueber-mich.css` eingeführt: `.au-feel-copy p, .au-bridge-copy p, .au-move-copy p, .au-personal-copy` → **16px / 1.72** (eine Regel, ein Wert; = `.about .body p`, die Bio-Copy-Rolle der Startseite). Lead-Sätze `.au-feel-copy .lead-strong, .au-bridge-copy .lead-strong, .au-move-copy p.lead` → **clamp(19px,1.85vw,22px) / 1.5 / 600** (= `.big .lead-sub`). Die verstreuten Einzelwerte pro Sektion wurden entfernt.
  - **Hero-H1 + Lede** exakt auf die Startseiten-Hero-Tokens gesetzt: H1 = `clamp(40px,4.8vw,66px)` / 1.05 / -.025em (= `.hb-h1`), `em` = 1.12em; Lede = `clamp(18px,1.35vw,21px)` / 1.55 (= `.hb-lede`), zweite Lede = `clamp(16px,1.15vw,18px)` / Farbe #4a463c (= `.hb-lede--2`).
  - **Dunkle Roter-Faden-Intro** (`.au-td-intro p`) auf dieselbe Lauftext-Größe **16px/1.72** mit heller Forest-Farbe #cdd2c4 (= `.ansatz .body p`-Logik).
  - **Für-wen-Cards**: Spalten-Heading `.au-fit-col h3` → **18.5px** (= `.trust-card h3`, gleiches Muster weiße Karte + Liste). List-Items `.au-fit-list li` → **15.5px / 1.62** (= `.trust-card p` / `.pi-text`).
  - **Bestätigt korrekt (erben global, nicht angefasst):** alle `.shead p` / `.steps-head p` = 18px (globaler `!important`-Block); `.step`-Karten in „Wie ich arbeite" + „Was du erwarten kannst" (h3 18px, p 15.5px); Eyebrows via `.lbl`/`.slbl`.
  - **Bewusste Sonderfälle dokumentiert** (dürfen abweichen): Pull-Quote `.au-td-quote p` (Newsreader clamp(28,46)), Transformations-„To" `.tg-to` (clamp(20,26)), Hero-Skala.
  - **Verifikation:** `getComputedStyle` über alle Sektionen — Body durchgängig 16px, Lead durchgängig 19px/600, Subline 18px, Cards kohärent. Protokolliert.
  - **NEUE Arbeitsunterweisung in `CLAUDE.md`** ergänzt: Sektion „Typografie & Formatierung — IMMER einheitlich über globale Stile" mit der kompletten kanonischen Token-Skala + 5-Punkte-Audit-Checkliste. Gilt projektweit (Claude Code, VS Code, Claude Design).
- **Warum:** Vroni-Auftrag wörtlich: „Lauftexte müssen überall die selbe Größe haben, H-Überschriften immer in derselben Formatierung … alle Schriften einheitlich mit globalen Stilen. Außer es wird von mir für einen Bereich absichtlich geändert." Plus explizit: „speichere dir das als Arbeitsunterweisung für das gesamte Projekt". Beim schnellen Aufbau der Über-mich-Seite hatten sich pro Sektion leicht abweichende Größen eingeschlichen (typischer Drift, wenn man Sektion für Sektion baut statt Tokens aufzugreifen).
- **Wie:** Globale Skala aus `style.css` rekonstruiert (Basis-Regeln + `!important`-Feintuning-Block — Letzterer ist die *eigentliche* Quelle der Wahrheit, z. B. `.shead p` = 18px, nicht die 17px der Basis-Regel). 11 `str_replace_edit`s in `ueber-mich.css` (geteilter Token-Block + Entfernen der Einzelwerte). `getComputedStyle`-Stichprobe via eval. `CLAUDE.md`-Sektion ergänzt. Invariante unten ergänzt.
- **Alternativen / Abwägungen:**
  - **Lauftext 1.6 statt 1.72** (wie `.big .lead-body`/`.offer .desc`): verworfen — Über-mich ist die „Bio"-Seite, und der dafür gedachte Token ist `.about .body p` = 16px/**1.72**. Größe (16px) ist das, was Vroni meint; die etwas luftigere Bio-Zeilenhöhe ist passend und bleibt innerhalb des Systems.
  - **Hero-Lede auf glatte 18px (Subline-Token)** statt eigener Hero-Skala: verworfen — die Startseite gibt dem Hero bewusst eine eigene, etwas größere Lede-Skala (`.hb-lede`). Konsistenz heißt hier „identisch zum Startseiten-Hero", nicht „wie eine normale Subline".
  - **`.au-fit-col h3` bei clamp(19,21) lassen:** verworfen zugunsten fixer 18.5px = exakt `.trust-card h3`. Gleiches Muster soll exakt gleich aussehen, nicht „ungefähr".
- **Learnings:**
  - **Die Quelle der Wahrheit ist der `!important`-Feintuning-Block, nicht die Basis-Regeln.** `.shead p` sieht in der Basis nach 17px aus, ist real aber 18px (überschrieben). Wer nur die Basis liest, „korrigiert" in die falsche Richtung. **Bei Typo-Audits IMMER den Feintuning-Block am Dateiende mitlesen.**
  - **Drift entsteht beim sektionsweisen Bauen.** Gegenmittel: geteilte Selektor-Listen (eine Regel für alle gleichartigen Elemente) statt pro Sektion eigener Werte — macht den Drift strukturell unmöglich.
- **Konsequenz / Handoff:** Geändert: `ueber-mich.css`, `CLAUDE.md`, `PROTOKOLL.md`. Kein HTML-Markup-Change (nur CSS-Werte), keine Recht-/Medien-/SEO-Auswirkung. Geht in den Über-mich-PR. **Wichtig für Claude Code:** Beim Handoff `ueber-mich.css` 1:1 übernehmen; die neue CLAUDE.md-Typo-Sektion ist ab sofort verbindlich für ALLE künftigen Sektionen/Seiten (auch Startseite bei nächster Überarbeitung gegen die Skala prüfen).

### 2026-06-03 — Über-mich: Roter-Faden-Headline auf Designsystem-H2-Größe korrigiert (Claude Design · Atelier · Inline-Kommentar)
- **Was:** `.au-td-head h2` (dunkle „Form geben"-Section) von `clamp(36px,5vw,48px@64)` auf die **kanonische H2-Größe `clamp(32px,3.9vw,48px)`** + `line-height:1.07` zurückgesetzt — exakt der Wert, den `style.css` Zeile 712 als seitenweite H2-Vereinheitlichung erzwingt.
- **Warum:** Vroni-Inline-Kommentar an genau dieser Headline: „Das muss eine H2 sein. Also bitte passe die Größe an." Beim editorial Re-Design der Dark-Section hatte ich die Headline bewusst auf Hero-Größe (bis 64px) hochgezogen, um sie als Centerpiece zu betonen. Das brach aber die H2-Konsistenz der Seite — die Section-Headlines aller anderen Sektionen sind 48px-capped. Vronis Einwand ist korrekt: eine Section-Überschrift soll wie eine Section-Überschrift wirken, nicht wie ein zweiter Hero.
- **Wie:** Ein `str_replace_edit` in `ueber-mich.css`. Pull-Quote (`.au-td-quote p`, Newsreader Italic bis 46px) bleibt unverändert groß — DIE ist der Centerpiece-Akzent der Section, nicht die H2. Damit ist die Hierarchie jetzt sauber: H2 (Designsystem-Größe) → Intro-Text → große Pull-Quote als emotionaler Höhepunkt → Transformations-Grid.
- **Alternativen:** H2 nur leicht reduzieren (z. B. cap 56px): verworfen — „muss eine H2 sein" heißt Designsystem-Wert, nicht „etwas kleiner". Konsistenz schlägt Sonderfall.
- **Learnings:** Wenn eine Seite eine globale `!important`-H2-Vereinheitlichung in `style.css` hat (Z. 712), darf eine Section-spezifische H2 sie NICHT lokal überschreiben, nur um „dramatischer" zu wirken. Für Drama gibt es eigene Elemente (Pull-Quote, Eyebrow), nicht die H2.
- **Konsequenz / Handoff:** Nur `ueber-mich.css`. Falls die dunkle Section später doch eine größere Wirkung braucht: über die Pull-Quote skalieren, nicht über die H2.

### 2026-06-03 — Über-mich V2: Editorial-Refresh nach Vroni-Inline-Kommentaren (Claude Design · Atelier · Iterationsblock)
- **Was:** Mehrere Inline-Kommentare aus dem Atelier umgesetzt; alle mit Stoßrichtung „einheitliche Designlinie, bessere Scanbarkeit, weniger steriler Komponenten-Look, keine winzigen Bilder neben langem Text":
  1. **Hero-Sub-Bild** auf `about-desk-detail` (5:4 Detail-Crop aus `about-hero-desk`, **keine Person**) gewechselt — vorher `about-brand-essence`, das eine Person zeigte.
  2. **Section 2 „Gefühl"-Bild** auf `about-notebook-still` (4:5 Hochformat-Crop aus `trust-ehrliche-einschaetzung`) gewechselt — Vroni wollte hier ein reines Stillleben, das dem Hero nicht zu ähnlich ist und keinen Menschen zeigt.
  3. **Section „Roter Faden / Form geben" (dark) komplett editorial neu**: 3-teilige Komposition statt 2-Spalten-Block — zentrierte Headline → 2-Spalten-Intro → Pull-Quote „Ich übersetze _Inneres_ in äußere _Form._" (Newsreader Italic, grüne Trennlinien, schwebender runder →-Marker) → 5-Karten-Grid „Gedanken → Worte / Ideen → Strukturen / Persönlichkeit → Marke / Strategie → Website / Anspannung → Bewegung" (Glas-Look, Caps-„From", grüner Down-Arrow, große chalk-„To", Hover hebt an).
  4. **„Wie ich arbeite" auf Startseiten-`.steps`/`.step`-Karten** umgestellt (1:1 wie `#arbeitsweise`/„So können wir starten"). Erbt damit automatisch Typo, Hover, Pfeil-Chevrons, Mobile-Reduktion. `.au-step`/`.au-steps` aus `ueber-mich.css` entfernt.
  5. **„Was du erwarten kannst" ebenfalls auf `.step`-Karten** (6 Karten, 3-Spalten-Grid `.au-expect-grid`). Bisheriges `.au-expect-card`-System aufgegeben — war ein zweites, fast-identisches Karten-System; Vronis „gleiche Logik bei gleichen Elementen" macht es überflüssig.
  6. **„Für wen passt das" entstaubt**: Kreis-Header-Icon raus → Status-Pille oben („Passt"/„Eher nicht" mit Dot). Bullet-Liste mit Hairline-Dividern statt großer Aufzählungs-Pucks; Marker als 18px Inline-SVG (data-URL). Texte auf je **5 einzeilige Bullets** gestrafft (linke Spalte lief vorher länger als rechte). Rechte Karte gestrichelt + halbtransparent als Soft-Anti-Default.
  7. **Claim-Band-Bild** auf `about-panorama-bailey` (Vroni + Bailey, Bergpanorama, Sonnenuntergang) gewechselt — vorher `about-claim-see`. Vroni: „Eins auf dem ich mit Bailey zu sehen bin. Wir sind draußen und schauen vielleicht in die Ferne." Bild lag seit Hero-Tausch ungenutzt → jetzt sinnvoll als Outdoor-Centerpiece. `alt=""` (dekorativ, Band ist textgetragen).
  8. **Bild-Stretch-Regel für alle 2-Spalten-Sektionen** (Gefühl, Bridge, Move, Persönlich): `align-items:stretch` + `min-height` statt fester `aspect-ratio` → Bild füllt die Höhe der Textspalte, steht nicht mehr „winzig neben langem Text". Mobile schaltet auf 1-Spalten-Stapel + sinnvolle Aspekte (4:5 / 4:3 / 5:4) zurück.
- **Warum:** Folge von Inline-Kommentaren, alle mit derselben Richtung. Konkrete Anker: Startseiten-`.step` als Karten-Typo-Referenz; Wunsch nach Editorial-Wirkung im Roter-Faden-Manifest; Beobachtung, dass mehrere Karten-Sections dasselbe tun, aber leicht unterschiedlich aussehen; explizite Bild-Höhen-Regel von Vroni („Bilder immer an die Höhe der Textblöcke daneben ausrichten").
- **Wie:**
  1. Zwei neue Crops per OffscreenCanvas (`about-desk-detail` 700×560, Region `820,60 700×560`; `about-notebook-still` 869×1086, Region `290,0 869×1086`). Je WebP+PNG. Crop-Koordinaten in MEDIEN.md für Reproduzierbarkeit hinterlegt.
  2. HTML-Edits pro Section via `str_replace_edit`.
  3. `ueber-mich.css` komplett neu geschrieben (write_file) mit Section-Kommentaren + neuem konsolidiertem „BILD-STRETCH-MUSTER"-Block. `.au-step`/`.au-steps`/`.au-expect-card`/alter `.au-fit-head`-Block entfernt; ererbte Klassen (`.steps`/`.step` aus style.css) im Kommentar dokumentiert.
  4. `MEDIEN.md`: neue Einträge `about-desk-detail` + `about-notebook-still`, Update `about-panorama-bailey` (Claim-Band statt Hero).
  5. Atelier-Fehlversuch `about-brand-detail.png/.webp` gelöscht (nie eingebunden, kein MEDIEN.md-Eintrag).
- **Alternativen / Abwägungen:**
  - Für-wen-Cards mit großen Color-Circle-Icons behalten: verworfen — wirkte wie generische Marketing-Page. Mini-Tag-Pille ist editorialer.
  - „Erwarten" eigenen, fast-gleichen Karten-Style geben: verworfen — genau der „drei fast-gleiche Karten"-Effekt, den Vroni stört. Lieber 1:1 dieselbe `.step` zweimal.
  - Roter-Faden in `.big`-Logik der Startseite biegen: verworfen — `.big` ist auf 4 Säulen optimiert, hier 5 Übersetzungen + Pull-Quote. Eigene Komposition passt besser.
  - Stretch-Regel auch fürs Hero: nein — Hero ist bildkomponierte Szene (Main+Sub+Chip), braucht fixes Verhältnis.
- **Learnings:**
  - **„Einheitlich" = dieselbe Klasse, nicht 'ähnliche Klasse'.** Solange zwei Sections nicht dieselben Selektoren nutzen, driftet die Typo auseinander. Aus drei Karten-Sections sind zwei `.step`-Instanzen geworden → weniger Maintenance, automatische Konsistenz. **Regel:** Gleichwertiges Element auf zwei Seiten → zuerst nach globaler Klasse suchen, bevor man eine `au-`-Variante anlegt.
  - **Bilder neben Text immer höhen-koppeln** (`align-items:stretch` + `min-height`, Bild absolut + `object-fit:cover`), nie fixes `aspect-ratio` neben variabel langem Text — sonst „winziges Bild neben Textwand". Mobile braucht dann aber den Aspect-Fallback zurück.
- **Konsequenz / Handoff:** Geändert: `ueber-mich.html`, `ueber-mich.css` (komplett neu), `MEDIEN.md`. Neue Assets: `images/about-desk-detail.{webp,png}`, `images/about-notebook-still.{webp,png}`. Gelöscht: `images/about-brand-detail.{png,webp}`. Keine Recht-/SEO-/Form-Logik-Auswirkung. Geht in den Über-mich-PR (`design/ueber-mich-form-geben`). Offen: `about-panorama-bailey` & `about-claim-see` Nutzung final mit Vroni klären (`about-claim-see` jetzt ungenutzt — Datei bleibt im Repo).

### 2026-06-03 — Über-mich-Hero: Meta-Zeile „Branding · Webdesign · KI-Workflows · Holistic Performance" entfernt (Claude Design · Atelier · Inline-Kommentar)
- **Was:** Die kleine Caps-Meta-Zeile direkt unter den Hero-CTAs raus. `<p class="au-hero-meta">` in `ueber-mich.html` gelöscht; `.au-hero-meta`-Regel + Mobile-Variante in `ueber-mich.css` ebenfalls entfernt (keine Karteileichen).
- **Warum:** Inline-Kommentar Vroni: „Nimm den Bereich bitte raus." Im Briefing war die Zeile noch als „Kleine Meta-Zeile" Teil des Hero-Vorschlags — Vroni hat sie nach Sichtung aber rausgenommen. Vermutung: doppelt mit dem `.au-chip` rechts oben („Marke · Website · KI · Bewegung"), und unter dem CTA wirkt sie eher wie ein Footer-Tag als wie ein Brand-Statement.
- **Wie:** Zwei `str_replace_edit`-Operationen (HTML + CSS Mobile-Block) + ein weiterer Edit für den Haupt-CSS-Block. HTML-Reihenfolge im Hero-Copy-Stack: `eyebrow → h1 → 2× .au-lede → .hero-cta` (zurück zur Originallogik der Startseite).
- **Alternativen:**
  - Meta-Zeile als sehr kleines, dezenteres Detail behalten (z. B. `font-size:10.5px`, `opacity:.6`): verworfen — Vronis Kommentar war eindeutig „raus", nicht „kleiner". Nicht überoptimieren.
  - Zeile als Bestandteil des `.au-chip` ergänzen: verworfen — Chip ist schon dicht, und der Chip-Text macht denselben Job (vier Bereiche listen).
- **Learnings:** Auch „Briefing-Vorschläge" sind Vorschläge, keine Pflicht. Nach der ersten Sichtung darf jede Komponente noch wegfliegen; nicht jeder kleine UI-Anker muss zwingend bleiben, nur weil er im Brief stand.
- **Konsequenz / Handoff:** Geändert: `ueber-mich.html`, `ueber-mich.css`. Keine Auswirkung auf Recht/Assets/SEO/Form-Logik. Geht 1:1 in den nächsten PR der Über-mich-Überarbeitung mit ein (Branch z. B. `design/ueber-mich-form-geben`).

### 2026-06-03 — Über-mich-Seite: Strukturüberarbeitung nach Briefing „Strategin, nicht Yogalehrerin" (Claude Design · Atelier · großes Briefing)
- **Was:**
  - **Hero komplett umgewertet** — Hauptbild von `about-panorama-bailey` (Vroni+Hund im Berglicht) auf **`about-hero-desk`** (Frau am Schreibtisch, Laptop, Notizbuch, Bailey nur als Detail unter dem Tisch). Sub-Bild von `about-arbeiten` auf **`about-brand-essence`** (Brand-Strategie-Stillleben). Hero-Bild-Format gewechselt von Hochformat (4:5) auf **Querformat (3:2)** — entsprechend Bildmaterial 1536×1024 + bessere editorial Wirkung „Arbeitsplatz im Raum". Sub-Card-Format ebenfalls auf 5:4 angepasst. Lede + CTA-Text + neue **Meta-Zeile** „Branding · Webdesign · KI-Workflows · Holistic Performance" exakt aus Briefing. CTAs jetzt „Zusammenarbeit anfragen" / „Mehr über meinen Ansatz". OG/Twitter-Image auf `about-hero-desk` umgestellt.
  - **Section-Reihenfolge geändert.** Bisher: Gefühl → Stationen → Roter-Faden-Dark → Wie-arbeite → Bewegung → Für-wen → Erwarten → Persönlich → Kontakt. Neu nach Briefing: Gefühl → **Roter-Faden-Dark** → Stationen → **NEU: Was daraus heute entsteht** → Wie-arbeite → Bewegung → Für-wen → Erwarten → Claim-Band → Persönlich → Kontakt. Begründung: Briefing will den narrativen Bogen „Gefühl der Zielgruppe → Vronis roter Faden (Form geben) → Beweis (Stationen) → Brücke zur heutigen Arbeit → Wie arbeite ich → …". Dark-Section zuerst (Kernidee), dann Stationen als Beleg, dann Brücke.
  - **Roter-Faden-Dark inhaltlich neu.** Neue zentrale H2: **„Ich habe immer mit Form gearbeitet. Nur das Material hat sich verändert."** (Briefing-Kernsatz). Neuer Body mit Floristik → Mediendesign → Marketing/Webdesign → Branding/KI/Yoga-Bogen + Claim-Block „Ich übersetze Inneres in äußere Form." + nummerierter Liste der Übersetzungen (Gedanken → Worte, Ideen → Strukturen usw.). Alte Flow-SVG + Tag-Chips entfernt — Klartext + Liste ist editorialer und liest sich besser auf Mobile.
  - **NEUE Section „Was daraus heute entsteht" (`.au-bridge`).** Chalk/Beige-Gradient, 2-Spalten, Bild rechts (`about-wireframe`, Webdesign-Skizze auf Papier). Bridged Biografie → heutige Arbeit. Headline: „Heute verbinde ich, was für mich nie getrennt war." Text 1:1 aus Briefing.
  - **„Wie ich arbeite" radikal verschlankt.** Vorher: Work-Duo (2 große Bilder) + 5 Prinzipien (Klarheit/Struktur/KI/Sichtbarkeit/Energie). Neu: keine großen Bilder, dafür **4 nummerierte Karten** Verstehen · Sortieren · Übersetzen · Sichtbar machen — exakt der Briefing-Vorschlag „falls 5 Karten zu viel sind, lieber 4". Header-H2: „Erst verstehen. Dann sortieren. Dann sichtbar machen." (Briefing). Card-Layout mit dezenter Nummer + grünem Strich + Kicker-Label, schließt visuell an die `.trust-card`-Logik der Startseite an.
  - **Stationen neu betextet.** 6 Stationen (vorher hatten sie Kicker wie „Form & Material" — das war zu „workshoppy"). Neue Kurzbeschreibungen 1:1 aus Briefing, sauber scanbar, Marketing und Webdesign zu **einer** Station zusammengelegt (Briefing).
  - **„Was du erwarten kannst" neu.** Vorher 6 Karten mit SVG-Icons (Pfeil/Kreis/Stern/…); icons waren generisch und teils inhaltlich daneben („Pfeil nach oben" für „Ehrliche Einschätzung"). Neu: 6 Karten nach Briefing-Text (Klarheit statt Blabla / Strategie vor Design / KI mit Haltung / Ehrliche Stimme / Blick fürs Ganze / Ruhe im Prozess), mit dezenter **Nummer + grünem Strich** statt Icon. Section bekommt eigene Klasse `.au-expect` (vorher inline-Gradient), Background-Gradient nach `ueber-mich.css` ausgelagert.
  - **„Für wen" Texte 1:1 aus Briefing**, Überschriften zu „Meine Arbeit passt gut, wenn du …" / „Sie passt eher nicht, wenn du …" (Briefing).
  - **Persönlich-Section neu.** Headline: „Und wenn ich nicht an Marken oder Websites arbeite …" (Briefing). Neuer Text aus Briefing.
  - **Kontakt-Headline neu.** Briefing-Wortlaut: „Wenn deine Marke gerade mehr nach vielen Einzelteilen klingt als nach einem klaren roten Faden, lass uns sprechen." Form-Eyebrow „Anfrage senden" statt „Schreib mir".
  - **Bildstrategie umgedreht** — Briefing fordert mehr Arbeitsprozess, weniger Hund/Yoga im oberen Teil. Yoga/Trail/Bailey-Bilder kommen erst ab Section 7 (Bewegung) bzw. 10 (Persönlich). Hero + Gefühl + Bridge zeigen Schreibtisch/Notizbuch/Wireframe.
  - **SEO neu.** Title „Über Vroni · Brand- & Website-Strategin mit KI als Werkzeug" (Briefing). Description ebenfalls Briefing-Wortlaut. `noindex` bleibt vorerst — Seite ist neu, vor Livegang aufheben (im Auftrag von Claude Code).
  - **`data-screen-label`** auf allen Sections gesetzt, damit Kommentar-Kontext eindeutig ist (Slide 5, Slide 7 etc. brauchen keinen Rätselraten-Anteil).
  - **CSS:** `ueber-mich.css` erweitert um `.au-bridge`-Block, `.au-steps`/`.au-step` (4-Karten-Layout), `.au-td-claim` + `.au-td-trans` (neue Dark-Section), `.au-expect`-Gradient, `.au-hero-meta`. Bestehende Klassen `.au-work-duo` + `.au-principle` + `.au-fit-*` + `.au-personal-*` weiterverwendet bzw. konsolidiert. Mobile-Breakpoints angepasst (`.au-steps` → 1-spaltig, `.au-bridge-grid` → 1-spaltig, `.au-hm-sub` rechts statt links, `.au-personal-media` Aspect 5:4 statt 1:1).
  - **MEDIEN.md:** neuer Eintrag für `about-hero-desk` (PNG 2814 KB + WebP 86 KB). Eintrag für `about-panorama-bailey` aktualisiert (Verwendung jetzt „nicht eingebunden", Datei bleibt im Repo).
- **Warum:** Externes Briefing vom 2026-06-03 (Stichworte „Strategin, nicht Yogalehrerin", „roter Faden = Form geben", „Hund/Yoga erst spät zeigen"). Der bisherige Stand hat zwar gut funktioniert, war aber im ersten Drittel zu sehr Lifestyle/Persönlich (großes Bergbild im Hero, Yoga-Mat-Bild in Section 2). Die Über-mich-Seite ist laut Briefing **strategischer Beweis** dafür, warum Vroni die richtige Person für Brand-/Website-Übersetzung ist — nicht „mein Lebenslauf" oder „mein Yoga-Profil".
- **Wie:**
  1. `about-hero-desk.png` → WebP via OffscreenCanvas (`canvas.convertToBlob({type:'image/webp',quality:0.82})`) → 86 KB (von 2814 KB PNG). Datei in `images/` gespeichert.
  2. `ueber-mich.html` komplett neu geschrieben (write_file, ein Pass). Nav/Footer/Form-Markup 1:1 von der vorherigen Version übernommen (Invarianten: brand--line, mobile-menu, form-Felder + IDs für `script.js`).
  3. `ueber-mich.css` komplett neu geschrieben (write_file, ein Pass). Neue Blöcke `.au-bridge`, `.au-steps`/`.au-step`, `.au-expect`, `.au-td-claim`, `.au-td-trans`, `.au-hero-meta` ergänzt. Mobile-Block aktualisiert.
  4. `MEDIEN.md` mit `str_replace_edit` ergänzt — neuer Eintrag `about-hero-desk` + Verwendungs-Update `about-panorama-bailey`.
- **Alternativen / Abwägungen:**
  - **Hero-Sub auf `about-wireframe` statt `about-brand-essence`**: verworfen, weil das Wireframe-Bild für die spätere Bridge-Section (Section 5) eingeplant ist und nicht doppelt verwendet werden soll. `about-brand-essence` liefert die editoriale Moodboard-Atmosphäre fürs Hero perfekt.
  - **„Roter Faden Dark" vor oder nach Stationen?** Briefing-Reihenfolge: Roter Faden VOR Stationen — Logik: zuerst die Kernidee („immer mit Form gearbeitet"), dann der Beweis. Vorher umgekehrt — fühlte sich an wie eine Timeline mit nachgeschobener Erklärung. Briefing-Reihenfolge ist erzählerisch stärker.
  - **„Was du erwarten kannst": Icons behalten?** Verworfen. Die alten SVG-Icons (Pfeil-nach-oben, Zielscheibe, Stern, …) waren generisch und teils inhaltlich nicht treffend. Nummern + grüner Strich sind ruhiger, editorialer und passen besser zum Rest der Seite (die Eyebrow-Dot-Logik der Startseite arbeitet auch viel mit kleinen grünen Markern).
  - **`<picture>` mit responsivem `srcset`/`sizes` für `about-hero-desk`** (wie bei index.html-Bildern üblich): erstmal nicht erzeugt, weil das WebP mit 86 KB ohnehin sehr klein ist. **Konsequenz:** falls Claude Code später Mobile-Bandbreite optimieren will, eine 960er-WebP-Variante nachgenerieren — der `<picture>`-Markup ist darauf vorbereitet (nur Source-srcset erweitern).
  - **Work-Duo aus „Wie ich arbeite" komplett entfernt** statt verschoben: erwogen, die zwei Arbeits-Bilder (`about-brand-essence` + `about-wireframe`) in der Bridge-Section nebeneinander zu zeigen. Verworfen — das hätte die Bridge bildlastig gemacht und die Aussage „Marke + Website + Arbeitsweise zusammendenken" optisch verflacht. Stattdessen: ein Bild (Wireframe = beste Visualisierung der Aussage), Text bekommt Raum.
- **Learnings:**
  - **Bildstrategie bestimmt Wahrnehmung des ersten Drittels.** Auch wenn Headline & Lede strategisch klar sind: ein großes Hund/Berg-Bild oben drüber positioniert die Seite vor dem Lesen als „Personal-/Lifestyle-Seite". Der Hero-Bildwechsel allein erledigt einen großen Teil der Brief-Anforderungen.
  - **„Roter Faden vor Stationen" wirkt narrativ stärker als „Stationen vor Roter Faden".** Zuerst die Idee, dann der Beweis — sonst muss der Leser sich durch die Timeline kämpfen, bevor er weiß, warum sie da steht.
  - **Bei großen Briefings einmal die komplette Datei neu schreiben statt 20× `str_replace_edit`** — wenn 8 von 11 Sections in Struktur oder Wortlaut umgebaut werden, ist ein sauberer Neuschrieb robuster und besser nachvollziehbar als viele kleine Edits, die sich gegenseitig die Indentation zerschießen können.
- **Konsequenz / Handoff:**
  - **Geänderte Dateien:** `ueber-mich.html` (komplett neu), `ueber-mich.css` (komplett neu), `MEDIEN.md` (Eintrag neu + Eintrag aktualisiert), neuer Asset `images/about-hero-desk.webp` (86 KB). Das bestehende PNG `images/about-hero-desk.png` war schon im Repo.
  - **NICHT geändert:** `index.html`, `style.css`, `script.js`, `image-slot.js`, Recht-Seiten (kein Recht-relevanter Change — kein neuer Dritt-Dienst, kein neues Formular, kein Tracking-Wechsel). Footer + Nav + Form-Struktur sind 1:1 wie vorher → keine Auswirkung auf bestehende Tests / CI.
  - **1:1-Handoff-Kandidat für Claude Code** → Branch z. B. `design/ueber-mich-form-geben` → PR auf `main`.
  - **Vor Livegang:** `<meta name="robots" content="noindex">` aus `ueber-mich.html` entfernen, sobald Vroni den finalen Text freigibt. Sitemap-Eintrag (sitemap.xml) auf „lastmod 2026-06-03" aktualisieren.
  - **Bekannte offene Punkte:**
    - `about-hero-desk` hat noch keine `-960.webp`-Variante (nicht render-kritisch klein genug → optional, kein Blocker).
    - `about-panorama-bailey` ist aktuell ohne Verwendung — Datei bleibt im Repo, falls Vroni sie später z. B. in einer Insta-Reihe oder anderen Sub-Seite einsetzen möchte. Vor finalem PR ggf. mit Vroni klären, ob das Bild ganz entfernt werden soll.
    - Speaker-/Style-Detail: das `<em>` im H1 nutzt Newsreader Italic — die Schrift ist laut Preload-Block in `style.css` lokal gehostet. Sollte das Preload jemals rausfallen, würde der H1 kurzzeitig wieder im Figtree-Italic-Fallback flackern.

### 2026-06-02 — Pain-Cards: Typo an Trust-Standard + symmetrisches Padding (Claude Design · Atelier · Inline-Kommentar)
- **Was:** In `style.css` die `.pain-item`-Karten an das bereits etablierte Design-System der Seite angeglichen — sowohl Schriftgrößen als auch Innenraum-Geometrie:
  - **Eyebrow (`.pi-cat`)** jetzt **11px / 600 / .2em letter-spacing** statt 10.5/700/.18em → matched die Standard-`.lbl`-Klasse (siehe `style.css:52`), die seitenweit alle Eyebrows steuert.
  - **Titel (`.pi-title`)** jetzt **`clamp(17px,1.5vw,19px)` / 600 / -.005em letter-spacing** statt 17/650/-.012em → identisch mit `.trust-card h3` (Section „Was mir wichtig ist", `style.css:753`).
  - **Beschreibung (`.pi-text`)** jetzt **15.5px / lh 1.62 / `var(--ink-soft)`** statt 15/1.55/#4a463c → identisch mit `.trust-card p` (`style.css:754`).
  - **Padding symmetrisch**: alle Karten einheitlich **`padding:26px 28px`** (vorher: odd hatte `padding-left:6px` + `padding-right:34px`, even hatte `padding-left:34px` + `padding-right:26px` → unsymmetrischer Hover-Hintergrund, Icon klebte links am Karten-Rand und hatte rechts viel Luft). `.pain-item:nth-child(odd){border-right:…}` als zentraler Trenner bleibt, aber ohne unterschiedliches L/R-Padding.
  - **`.pi-body`** vertikaler Gap leicht erhöht (`gap:7px` statt 6), damit Eyebrow + Titel + Text in der jetzt etwas größeren Typo nicht zusammenkleben.
  - **Override-Block** am Dateiende synchron auf die neuen Werte gesetzt (sonst greifen alte Größen weiter).
  - **Mobile** (`@media (max-width:900px)`): Werte mitgezogen — Eyebrow 11px, Titel 17px, Text 15.5px / lh 1.55.
- **Warum:** Inline-Kommentar Veronika auf der gesamten Pain-Section mit zwei Referenzen — „So können wir starten"-Section UND „Was mir wichtig ist" (Trust): *„wir haben doch definierte Schriftgrößen, geh einfach mal immer ticken größer, damit das einfach besser liest"*, *„kannst du dich orientieren … da haben wir ja auch schon Texte drin, vielleicht kannst du die Größe übernehmen, dann sind wir da einheitlich"*, *„die ibrows dadrüber: macht die mal in der normalen ibro Größe"*, *„den Innenabstand von diesem Hoverkasten zu dem alten bringen, also zu dem eigenen anpassen, weil wir haben jetzt rechts bei den Spalten … den Innenabstand zwischen der Kante von dem Kasten und dem alten deutlich höher wie auf der linken Seite, das muss bitte gleich sein"*. Drei Anweisungen, alle umgesetzt: (a) Eyebrow auf `.lbl`-Standard, (b) Titel + Text auf `.trust-card`-Standard, (c) Karten-Padding L/R symmetrisch.
- **Wie:** Vier `str_replace_edit`-Operationen auf `style.css`: (1) Pain-List/Pain-Item Layout-Block — Padding symmetrisch + odd-Border bleibt; (2) Pain-Item-Typo Hauptblock — pi-cat / pi-title / pi-text auf neue Werte; (3) Override-Block am Dateiende — gleiche Werte mit `!important`, damit nichts älteres dazwischenfunkt; (4) Mobile-Block — pi-cat / pi-title / pi-text Mobile-Pendants auf 11 / 17 / 15.5 hochgezogen.
- **Alternativen / Abwägungen:**
  - **`.pi-cat` HTML zu `<span class="lbl">…</span>` umbiegen** statt CSS doppelt definieren: verworfen, weil das `.pain-item:nth-child(N) .ic`-Selektor-Sortier-System auf `.pi-cat` greift (Eyebrow-Farbe `var(--clay)` ist eigen, `.lbl` hat `var(--ink-soft)`). Sauberer, die Pain-eigene Eyebrow-Klasse beizubehalten und sie zahlenwert-identisch zur `.lbl` zu machen.
  - **`padding: 26px` (vollsymmetrisch quadratisch)**: probiert mental — würde Icon zu eng am Wrap-Rand kleben (links 26 ist OK, rechts vom Wrap-Rand wirkt eng). 26/28 ist ein Tick mehr horizontale Atmung, optisch ruhiger.
  - **Padding 0 außen, 40 innen am Mittel-Trenner** (Icon-L-Edge = Wrap-L-Edge, Inhalt-R-Edge = Wrap-R-Edge): senior-editorial, aber bricht die Hover-BG-Symmetrie, die Vroni explizit gefordert hatte. Verworfen zugunsten der einfachen Symmetrie.
- **Learnings:**
  - **Wenn die Seite schon ein Design-System hat** (`.lbl` für Eyebrows, `.trust-card`-Typo für Karten-Body), neue Komponenten zahlenwert-identisch matchen statt eigene Größen erfinden. Ich hatte hier dreimal hintereinander eigene Werte erfunden (17/650/-.012, 15/1.55, 10.5/700/.18), bis Vroni den System-Anker explizit benannt hat. **Lesson: nach der ersten Designentscheidung in einem neuen Block immer prüfen, ob es schon ein etabliertes System gibt, das zahlentreu zu übernehmen wäre.**
  - **Padding-Asymmetrie sieht erst gut aus, wenn man das Karten-Chrome (Border/Hintergrund) wegnimmt** — sobald ein Hover-BG sichtbar wird, fliegt die L/R-Asymmetrie sofort auf. Bei Hairline-Layouts immer mit symmetrischem Padding starten; bei Card-Chrome ist Asymmetrie eher tolerierbar.
- **Konsequenz / Handoff:**
  - Geändert: nur `style.css` (vier zusammengehörige Blöcke). `index.html` unangetastet — DOM-Struktur bleibt 1:1, Inhalte gleich. Keine Auswirkung auf Recht/Datenschutz/Assets/Fonts.
  - 1:1-Handoff-Kandidat für Claude Code → Branch z. B. `feat/pain-typo-trust-aligned` → PR auf `main`.
  - **Invariante neu vorgemerkt für Abschnitt 1**: Wenn eine Section neue Karten-Items bekommt, deren Typo zuerst gegen `.lbl` (Eyebrow), `.trust-card h3` (Titel), `.trust-card p` (Body) prüfen — das ist der seitenweite Default, abweichende Werte brauchen Begründung.

### 2026-06-02 — Pain-Section: Intro als Split (H2 links, Leads rechts) + Standard-Schriftgrößen zurück + Hairline-Raster für Karten (Claude Design · Atelier · Inline-Kommentar)
- **Was:**
  - **Intro neu strukturiert (`index.html`, `#pain .pain-intro`):** `.pain-intro` wird jetzt `pain-intro--split` mit zwei Spalten — links `.pi-head` (Eyebrow + H2), rechts `.pi-leads` (die drei Leads). Inhalts-Text 1:1 unverändert, nur die DOM-Wrapper sind neu.
  - **CSS (`style.css`):**
    - `.pain-intro--split` als Grid `minmax(0,1.05fr) minmax(0,.95fr)`, `gap:64px`, `align-items:start`.
    - `.pain h2` `max-width:14ch` (linke Säule, kompaktes Block-Set).
    - `.pi-leads` als Flex-Spalte mit `gap:14px` (drei Absätze, kein H2-Spacing zwischen ihnen).
    - **Schriftgrößen in den Karten zurück auf Standard-System:** `.pi-cat` 10.5px, `.pi-title` **17px** (vorher fälschlich auf 18 hochgezogen / dann auf 15.5 / 15 geschrumpft), `.pi-text` **15px** (vorher 14 → 13.5 → 15.5). Hauptblock **und** `!important`-Override-Block am Dateiende synchron auf 17/15/10.5 gesetzt.
    - **Karten-Layout bleibt** Hairline-Raster 2×3 (kein Card-Chrome) — Veronika hatte das in der Nachricht explizit beibehalten („wenn du die Aufteilung so wie jetzt gerade lassen willst mit den sechs runter finde ich das ganz gut").
    - **Mobile-Pendant** (≤900px) komplett überarbeitet: `.pain-intro--split` kollabiert auf eine Spalte (gap 18px), `.pain-list` zurück zu Card-Chrome (weißer Hintergrund, Border-Radius, Schatten) statt Hairline (das nur auf Desktop sinnvoll), `odd/even`-Padding und `border-right` der Hairline-Karten explizit zurückgesetzt. Titel/Text auf Mobile etwas kompakter (16/14.5px) für Single-Column-Lesbarkeit.
- **Warum:** Inline-Kommentar Veronika: *„die Texte sind immer noch zu klein, du musst einfach auf die ursprünglichen Texte gehen … das waren die Standardgrößen … und wenn du die Aufteilung so wie jetzt gerade lassen willst mit den sechs runter finde ich das ganz gut, aber dann muss oben drüber der Text schöner aussehen und schöner gesetzt sein … probier ob du die Überschrift links hin packst … und dann den Text rechts."* Zwei klare Anweisungen: (a) Standard-Schriftgrößen aus dem Design-System wiederherstellen (vorher hatte ich sie verkleinert, um in die 2-Spalten-Karten zu passen), (b) Intro-Block aus dem zentrierten Layout in den Split-Pattern überführen, der bei `#angebote .shead--split` schon etabliert ist — H2 bekommt linkes Gewicht, die Leads bekommen rechte Lese-Säule.
- **Wie:** Ein `str_replace_edit` auf `index.html` (Wrapper-Divs `.pi-head` und `.pi-leads`, Inhalte 1:1 erhalten, `style="max-width:560px"` Inline-Hack vom alten H2 raus). Drei `str_replace_edit`-Operationen auf `style.css`: (1) Hauptblock `.pain-grid`/`.pain-intro--split` neu definiert; (2) `.pain-item .pi-cat/.pi-title/.pi-text` wieder auf Standard 10.5/17/15px hochgezogen — sowohl Haupt- als auch Override-Block am Dateiende; (3) Mobile-Pendant in der `@media (max-width:900px)`-Block neu, Intro-Stack + Karten-Card-Chrome-Restore.
- **Alternativen / Abwägungen:**
  - **Eine Subline unter H2** (Veronika hatte „vielleicht noch eine Subline drunter oder sowas" angedeutet): **verworfen, weil Texterfindung**. Statt einer von mir geschriebenen Zwischenzeile bewusst H2 alleinstehen lassen — sie ist als Statement schon vollständig und das Split-Layout verträgt es. Wenn Veronika eine Subline will, schreibt sie sie selbst — ich erfinde keine Marken-Copy.
  - **`.shead--split` direkt wiederverwenden** (statt `.pain-intro--split`): mental durchgespielt — würde die Section-Head-Vokabel auf eine Pain-Intro übertragen, semantisch etwas grob. Eigene Klasse mit gleicher Mechanik macht den Code lesbarer und erlaubt feinere Anpassung (z. B. `align-items:start` statt `end` wie bei shead-split, weil hier die Leads oben anschließen sollen statt unten).
  - **Karten von Hairline zurück auf Card-Chrome**: verworfen — Veronika hatte das aktuelle Karten-Layout explizit gelobt. Standardgrößen-Restore wirkt im Hairline-Raster genauso gut wie es in Card-Chrome würde, weil jede Karte ~580px breit ist und genug Platz für 17px-Titel + 15px-Text hat.
- **Learnings:**
  - **Wenn Schriftgrößen verkleinert werden, sollte das immer in `PROTOKOLL.md` als „temporäre Anpassung an X-Layout" markiert sein** — sonst vergisst man, dass es eine Abweichung vom Standard ist, und bleibt zu lange dort. Hier war die 14/15.5-Größe ein Folgeschaden des 2-Spalten-Experiments, der zwei Iterationen mitgeschleppt wurde.
  - Wenn der Rest der Seite ein Split-Heading-Pattern (`.shead--split`) etabliert hat, lohnt es sich, neue Heading-Blöcke nach diesem Muster zu bauen statt zentriert — das hält die visuelle Sprache der Seite konsistent.
  - `!important`-Override-Blöcke an Dateienden sind unbedingt mit zu pflegen, wenn man Werte oben ändert. Sonst greifen alte Override-Werte ungewollt weiter. Aufräum-Kandidat: diese Overrides in den Hauptblock zurückfalten.
- **Konsequenz / Handoff:**
  - Geändert: `index.html` (Pain-Intro DOM-Wrapper), `style.css` (Pain-Intro, Pain-Item-Typo Haupt + Override, Mobile-Block). Keine Auswirkung auf Recht/Datenschutz/Assets/Fonts. Inhalts-Text 1:1 unverändert.
  - 1:1-Handoff-Kandidat für Claude Code → Branch z. B. `feat/pain-split-standard-sizes` → PR auf `main`.

### 2026-06-02 — Pain-Section: 2-spaltiges Karten-Raster + linke Säule vertikal mittig (Claude Design · Atelier · Inline-Kommentar)
- **Was:** In `style.css` die `.pain`-Sektion auf Desktop umgebaut, damit Karten und Intro visuell ausbalanciert sind und schneller erfassbar:
  - `.pain-grid` jetzt **`grid-template-columns: 1fr 1.4fr`** (vorher `.92fr 1.08fr`) **+ `align-items:center`** (vorher `start`) → linke Copy-Säule sitzt vertikal mittig zur Karten-Wand.
  - `.pain-list` jetzt **`grid-template-columns: repeat(2, 1fr)`** mit `gap:14px 12px` (vorher `1fr` / `gap:8px`) → 3 Zeilen × 2 Spalten statt einspaltigem Wurm.
  - `.pain-item` Padding/Gap leicht straffer (`padding:16px 18px`, `gap:13px`), neuer **`min-height:108px`** für gleichmäßige Karten-Höhe pro Zeile, Icon-Kasten von 38→36px, SVG 19→18px.
  - Typografie minimal kompakter: `.pi-cat` 10→9.5px, `.pi-title` 15.5→15px / lh 1.3→1.28, `.pi-text` 14→13.5px / lh 1.5→1.45 — sowohl im Hauptblock als auch im `!important`-Override-Block am Ende der Datei mitgezogen, damit beide Definitionen synchron bleiben.
  - Mobile (`max-width:900`) unangetastet → fällt weiter auf einspaltige Liste mit Icon links / Body rechts zurück (so dokumentiert als Invariante im Repo).
- **Warum:** Inline-Kommentar Veronika auf `#pain`: *„Versuche die Sektion so zu designen, dass die Elemente wieder alle schön ausbalanciert aussehen und für das Auge ordentlicher und schneller erfassbar."* Diagnose im Screenshot: Linke Spalte (Eyebrow + H2 + drei Leads) endet vertikal weit oben, danach lief eine ~600px hohe Leerfläche — währenddessen rechts 6 Karten als einspaltiger Wurm runter. Klassisches Ungleichgewicht; das Auge muss erst nach links springen, dann lange rechts wandern. Mit dem 2-spaltigen Karten-Raster wird die Karten-Wand kürzer + breiter, links/rechts enden auf ähnlicher Höhe, und `align-items:center` zieht die Copy in den optischen Mittelpunkt.
- **Wie:** Sechs `str_replace_edit`-Operationen auf `style.css` (pain-grid, pain-list, pain-item, ic/svg, pi-body/cat/title/text Hauptblock, `!important`-Override-Block). **Kein HTML-Edit** — Reihenfolge der 6 Karten + Eyebrow + Titel + Text bleiben unverändert, die `.pain-item:nth-child(N) .ic`-Hintergrundfarben (Grün/Sage/Clay/Green-deep/Olive/Forest) sortieren sich im 2-Spalten-Grid automatisch zeilenweise (Zeile1: Grün+Sage, Zeile2: Clay+Green-deep, Zeile3: Olive+Forest) → ergibt ein ruhiges, ausbalanciertes Farb-Pattern, ohne dass eine Kategorie ihre Identität verliert.
- **Alternativen / Abwägungen:**
  - **3-spaltiges Raster (2 Zeilen × 3 Spalten)**: verworfen, weil die rechte Säule dann breiter sein müsste als die linke Copy — Layout würde kopflastig nach rechts kippen. 2×3 hält das 1/1.4-Verhältnis vernünftig.
  - **Eyebrow (`.pi-cat`) komplett rauswerfen** für maximale Scanbarkeit: verworfen, weil Veronika die Eyebrow im vorherigen Briefing als Wiedererkennungsanker explizit gewollt hatte. Stattdessen Eyebrow auf 9.5px verkleinert, sitzt jetzt sehr dezent oberhalb des Titels.
  - **Linke Säule sticky machen** (`position:sticky; top:120px`): mental durchgespielt — würde im Scroll funktionieren, aber die Karten-Wand ist nach dem Umbau so kurz, dass Sticky-Verhalten keinen Mehrwert mehr bringt. Verworfen zugunsten der einfacheren `align-items:center`-Lösung.
  - **`min-height:108px`** auf Karten: optionaler Wert. Ohne Min-Height variieren Karten zeilenweise leicht in der Höhe (je nach Text-Umbruch), Grid-`align-items:stretch` würde die kürzere Karte sowieso strecken — die Min-Height ist nur ein Sicherheits-Floor, falls Text mal sehr kurz wird.
- **Learnings:**
  - 6 Karten in einer Spalte sind *immer* zu lang, egal wie kompakt jede Karte gestylt ist. Sobald >4 Karten, muss man auf 2+ Spalten gehen.
  - `align-items:center` auf einem 2-Säulen-Grid mit ungleich hohen Inhalten ist der einfachste und sauberste Balance-Hebel — keine JS-Höhenmessung, keine `position:absolute`-Tricks.
  - `!important`-Overrides am Dateiende sind ein Wartungsrisiko: wenn man oben ändert, muss man unten mitziehen. Solche Overrides bei Gelegenheit konsolidieren (Aufräum-Kandidat).
- **Konsequenz / Handoff:**
  - Geändert: **nur `style.css`** (sechs zusammengehörige Blöcke). `index.html` unangetastet — Markup-Struktur (`.pain-grid > .pain-intro + .pain-list > .pain-item × 6`) bleibt 1:1. Keine Auswirkung auf Recht/Datenschutz/Assets/Fonts.
  - Mobile-Pfad (≤900px) bleibt einspaltige Liste mit Icon links — getestet durch die bestehende Media-Query, dort gibt es bereits `.pain-list{grid-template-columns:1fr; gap:10px;}` als Override.
  - 1:1-Handoff-Kandidat für Claude Code → Branch z. B. `feat/pain-2col-balanced` → PR auf `main`.

### 2026-06-02 — Pain-Liste: vom 2-Spalten-Kachel-Grid zum kompakten Listen-Stil (Claude Design · Atelier · Inline-Kommentar)
- **Was:** `.pain-list` und `.pain-item` auf Desktop von 2-Spalten-Kachel-Grid (`grid-template-columns:1fr 1fr;` · vertikal gestapelt Icon → Eyebrow → Titel → Text · Padding 22/24) umgestellt auf **einspaltigen horizontalen Listen-Stil**: `.pain-list{grid-template-columns:1fr;gap:8px}`, `.pain-item{flex-direction:row;align-items:flex-start;padding:14px 18px;gap:14px}`. Icon kleiner (38px statt 40px, SVG 19px), `.pi-body{gap:3px;padding-top:2px}`, Schriftgrößen runter (`.pi-cat 10px`, `.pi-title 15.5px`, `.pi-text 14px`). Zusätzlich `.pain-grid{align-items:start}` (vorher `center`), damit beide Spalten oben bündig starten und die ehemalige Vertikalzentrierung das Höhen-Ungleichgewicht nicht mehr kaschiert. Die Repo-`!important`-Override-Regel `.pain .pi-text{font-size:17px!important …}` für den alten Kachel-Look wurde mitgezogen auf die neuen tighten Werte (sonst hätte sie die neuen Größen wieder überstimmt) und um eine `.pain .pi-title` Override-Zeile erweitert.
- **Warum:** Inline-Kommentar Vroni: „Die Kacheln laufen im Vergleich mit der Höhe des Contentblocks auf der linken Seite optisch zu hoch. Wir müssen das Ungleichgewicht ausgleichen … versuche mal, ob du die Kacheln mehr wie Listenblöcke designen kannst." Mit dem neuen 3-Lead-Pain-Intro war die linke Spalte ~480–520 px, die rechte Kachel-Liste war ~580–620 px → spürbar overhang rechts. Listen-Stil halbiert grob die Item-Höhe und matched die linke Spalte deutlich besser.
- **Wie:** Vier zielgerichtete `str_replace_edit`-Operationen auf `style.css`:
  1. `.pain-grid` → `align-items:start` (statt `center`).
  2. `.pain-list` Desktop von 2-col auf 1-col, `.pain-item` von `flex-direction:column;padding:22/24` auf `flex-direction:row;padding:14/18` mit `align-items:flex-start;gap:14`.
  3. `.pain-item .ic` von 40px → 38px (+ SVG 20→19), `.pi-body` gap 6→3 px + `padding-top:2px`, `.pi-cat 10.5→10`, `.pi-title 17→15.5`, `.pi-text 15→14 / Gewicht 500→450 / Farbe heller`.
  4. Repo-`!important`-Block am Datei-Ende (`.pain .pi-text` 17px, `.pain .pi-cat` 11.5px) auf die neuen Werte gesetzt und `.pain .pi-title` 15.5px ergänzt — sonst gewinnt die alte Override-Regel und alle Desktop-Schriftgrößen oben wären wirkungslos.
- **Alternativen / Abwägungen:**
  - **2-Spalten beibehalten, aber Karten kleiner** (engeres Padding, kleinere Schrift): probiert mental — bringt zu wenig Höhenersparnis und die zwei Spalten mit dichten Texten würden auf Desktop „zwängeln".
  - **`.pi-text` ganz weglassen** (nur Eyebrow + Titel): zu radikal, die Beschreibungstexte tragen die emotionale Spiegelung („Du weißt, dass …") — die wollen wir nicht verlieren.
  - **`align-items:start` weglassen und `center` behalten**: verworfen, weil bei jeder zukünftigen Längenänderung der linken Spalte das Ungleichgewicht wieder optisch versteckt wird statt korrigiert.
  - **Eigene Selektor-Spezifität statt `!important`-Block ändern**: ginge mit `.pain .pain-list .pain-item .pi-text` — gleiche Klassenzahl, würde nur per Source-Order gewinnen. `!important`-zu-`!important` ist robuster und ehrlich zu der bestehenden Repo-Konvention.
- **Learnings:**
  - Wenn ein Grid mit `align-items:center` zwei unterschiedlich hohe Spalten hat, **kaschiert** die Vertikalzentrierung das Problem visuell, statt es zu zeigen. `align-items:start` ist beim Design-Iterieren ehrlicher.
  - Wenn das Repo `!important`-Overrides für eine Komponente angelegt hat (hier `.pain .pi-text 17px`), diese mit umstellen — sonst gewinnt der alte Look gegen alle Detail-Tunings, und man sucht den Fehler in den falschen Regeln.
- **Konsequenz / Handoff:**
  - Geändert: nur `style.css` (vier zusammenhängende Blöcke). HTML unverändert. Mobile-Media-Query wird durch die Desktop-Umstellung quasi redundant (war identisch zu mobile), bleibt aber drin als Sicherheits-Re-Statement.
  - Optischer Effekt: rechte Spalte fällt von ~600 px auf ~340–380 px, deckt sich jetzt sauber mit der linken Copy. Hover-Lift, Icon-Farben (`nth-child`), Eyebrow-System bleiben unverändert.
  - 1:1-Handoff-Kandidat für Claude Code → Branch z. B. `feat/pain-list-compact` → PR auf `main`. Keine HTML-/Asset-/Recht-/Datenschutz-/Font-Änderung.

### 2026-06-02 — Hero-Bento `.s-brand`: Bild auf `about-arbeiten` (Bailey, Langarm) — zweimaliger Swap (Claude Design · Atelier · Briefing + Inline-Kommentar)
- **Was:** Hero-Bento-Kachel oben-links (`.s-brand` in `index.html`) erst von `hero-branding` (1672×941 Querformat, Branding-Stillleben) auf `about-journal-mat` (1122×1402 Hochformat, Notizbuch + Sketches + Yogamatte im Hintergrund) gewechselt, weil das Querformat im jetzt höheren Bento-Cell unschön zugeschnitten wurde. Direkt danach per Vroni-Inline-Kommentar weiter auf **`about-arbeiten`** (1122×1402 Hochformat: Vroni am Fenster im cremefarbenen Langarmshirt, schreibt in Notizbuch, Bailey liegt daneben, Bergblick) — explizite Vorgabe: „Gerne eins mit Bailey. Wenn Yoga, dann Langarm oder Bild ohne sichtbares Tattoo am rechten Arm." Die Schreibhaltung verdeckt den rechten Arm vollständig, Langärmel-Top: ✓.
- **Warum:**
  - **Bento-Stretch (vorher) hatte das Cell höher gemacht** → ein Landscape-Bild im hohen Cell verliert links/rechts viel Material und der Fokus rutscht aus dem Bild.
  - **Vroni-Vorgabe Bildwelt**: Mensch + Hund (Bailey) als Wiedererkennungs-Anker; Tattoo/rechter Arm bewusst verdeckt (private Bildregie). Das setzt `about-arbeiten` exakt um.
  - Inhaltlich passt das Bild auch besser zur `.s-brand`-Rolle, weil es **Konzentriert-Arbeiten** zeigt (Schreibhaltung, Notizbuch, Naturlicht), nicht reines Still-Leben.
- **Wie:** Eine `str_replace_edit`-Operation pro Tausch auf der `<picture>`-Source/Image in `index.html` (`s-brand`-Slot). Bilddatei und WebP existieren bereits im Repo (1122×1402, kein 960-Variant nötig — `srcset` reduziert auf eine Source). `width="1122" height="1402"`, `loading="eager"` (above the fold). Alt-Text neu und beschreibend (Bailey + Bergblick + Notizbuch).
- **Alternativen / Abwägungen:**
  - `about-persoenlich` (Vroni mit Bailey auf Waldweg, Langarm Burgunder): wäre auch valide gewesen — wirkt aber stärker Outdoor/Movement und passt damit eher zur Yoga-/Bewegungs-Erzählung als zur Brand-Strategie-Kachel. Für `.s-brand` (Branding-Anker) ist die Schreib-Szene aussagekräftiger.
  - `about-panorama-bailey`: ist Querformat (1448×1086) → fällt im hohen Cell wieder ins gleiche Problem. Verworfen.
  - **`hero-branding` per `object-position` retten**: probiert mental — bei 1.78:1-Landscape in einem ~0.6-Portrait-Cell ist jede Position ein Verlust. Swap war sauberer.
  - **`s-main` (rechtes großes Bild) gleich mit tauschen**: bewusst zurückgehalten, bis Vroni das im Verbund mit `about-arbeiten` neu beurteilt. `hero-visual` (1122×1402 Hochformat) verträgt das hohe Cell deutlich besser als das ausgetauschte Querformat.
- **Learnings:**
  - **Bento-Stretch und Bildformat müssen zusammen gedacht werden**: wenn die Cells flexibel mit der Copy mitwachsen, sind Landscape-Bilder in „high & narrow"-Cells immer Crop-Roulette. Tall portrait (4:5 oder 2:3) ist die sichere Größenfamilie.
  - **Bildwelt-Regeln (Bailey, Langarm, kein Tattoo)** gehören in eine Invariante, damit sie nicht bei jedem nächsten Bildtausch neu verhandelt werden müssen → unten in Abschnitt 1 ergänzen, sobald wir eine Sammlung haben.
- **Konsequenz / Handoff:**
  - Geändert: `index.html` (eine `<picture>`-Source) und `MEDIEN.md` (Einträge `hero-branding` als „aktuell ungenutzt" markiert + `about-arbeiten` um die zweite Verwendung erweitert). `hero-branding`-Dateien bleiben im Repo (Aufräum-Kandidat).
  - 1:1-Handoff-Kandidat für Claude Code → Branch z. B. `design/hero-bento-bilder` → PR auf `main`. Keine CSS-, Recht-, Datenschutz-, Font-Änderung.

### 2026-06-02 — Hero-Bento: Bildhöhe folgt jetzt der Copy-Spalte (Claude Design · Atelier · Inline-Kommentar)
- **Was:** In `style.css` das Bento-Soft-Grid auf Desktop von fester `min-height:clamp(440px,58vh,560px)` umgestellt auf **„fülle die Höhe der linken Copy-Spalte"**: `.hb-visual` ist jetzt ein `flex-direction:column` mit `height:100%`, `.hb-soft` bekommt `flex:1 1 auto; height:100%; min-height:480px` (Sicherheits-Boden für sehr kurzen Content). Mobile-Pendant in der Media-Query: `.hb-visual{height:auto}` + `.hb-soft{min-height:0; height:auto; display:block; max-width:520px}` — damit die Stack-Layout-Logik mit nur `s-main` (4:3) auf Mobile unverändert greift.
- **Warum:** Inline-Kommentar von Veronika: „Bilder sollen sich an der Höhe des Contentblocks links verhalten." Mit der neuen, längeren Hero-Copy (zwei Subline-Absätze + CTAs) war die linke Spalte spürbar höher als die fixe Bento-Mindesthöhe — Folge: das Bento sah unten optisch „beendet" aus, während links der Text noch lief. Die Augenbewegung war unruhig.
- **Wie:** `.hb-grid` hatte schon `align-items:stretch` — die Grid-Spalten werden also automatisch auf gleiche Höhe gezogen, der `.hb-visual`-Cell ist bereits so hoch wie `.hb-copy`. Bisher zog `.hb-soft` mit seiner eigenen `min-height` daran vorbei. Jetzt: `.hb-visual` wird zur Flex-Spalte mit `height:100%`, `.hb-soft` füllt mit `height:100%` (+ `flex:1 1 auto`) den Cell aus. Die Bento-Innenraster-Verhältnisse (`grid-template-rows:1.3fr .7fr`) bleiben — verteilen sich jetzt aber proportional über die echte Cell-Höhe statt über die fixe Mindesthöhe.
- **Alternativen / Abwägungen:**
  - **`aspect-ratio` aufs Bento legen** (z. B. 4/5): verworfen, weil das die Copy-Spalte zur Bento-Höhe zwingen würde — genau das umgekehrte Verhalten von dem, was Veronika wollte.
  - **`.hb-copy` mit `max-height` deckeln**, damit beide Seiten gleich bleiben: verworfen, weil das Text-Reflow und Lesbarkeit beschneidet.
  - **`min-height:480px` weglassen**: probiert mental — wenn der Hero auf sehr breitem Viewport mit sehr großer H1 mal kürzer wird als 480px, würde das Bento zu klein und wirkt gedrungen. 480 ist ein konservativer Boden, der den Stretch-Effekt nicht behindert.
- **Learnings:**
  - `align-items:stretch` auf dem äußeren Grid bringt nur etwas, wenn die Grid-Children auch tatsächlich `height:100%` durchreichen. Ein Kind mit eigener `min-height` ignoriert den Stretch und „löst sich" optisch von der Nachbarspalte.
  - Wenn man auf Desktop ein Stretch-Verhalten einführt, immer **auch** die Mobile-Media-Query gegenchecken — `height:100%` aus dem Desktop-Block würde sonst auf Mobile unkontrolliert weitergreifen (hier explizit auf `height:auto` zurückgesetzt).
- **Konsequenz / Handoff:**
  - Geändert: nur `style.css` (zwei kleine Blöcke: Desktop-Bento + Mobile-Bento-Override). Keine HTML-, JS-, Asset-, Recht-, Datenschutz- oder Font-Änderung.
  - Visueller Effekt: Bento-Bilder enden jetzt auf einer Linie mit den Hero-CTAs links. Wird die linke Copy gekürzt oder verlängert (z. B. Tweak an der Subline), passt sich das Bento mit.
  - 1:1-Handoff-Kandidat für Claude Code → Branch z. B. `feat/hero-bento-stretch` → PR auf `main`.

### 2026-06-02 — Atelier-Sync: Repo komplett gepullt + heutige Text-Edits re-applyed (Claude Design · Atelier)
- **Was:** Vor weiteren Iterationen das **Claude-Design-Atelier komplett gegen `main`** synchronisiert: 103 Dateien aus `VroniHei/Website@main` re-importiert (alle HTML, CSS, JS, MD, Recht/Datenschutz, Designsystem, Über-mich, Brand-Assets, neue Dateien wie `MEDIEN.md`, `README.md`, `WISSEN.md`, `count.js`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `lighthouserc*.json`, `.htmlvalidate.json`, `.editorconfig`, GitHub-Actions). Danach die drei heutigen Atelier-Text-Edits **gezielt re-applied**, damit sie nicht versehentlich beim nächsten Handoff verloren gehen.
- **Warum:** Im Atelier waren Code-Stand und Repo-Stand auseinandergelaufen: Repo `main` hat zwischenzeitlich ein responsives Bild-System (`srcset` mit 960w-Varianten + `sizes`-Attribut), zusätzliche JSON-LD-Schemas (Person + ProfessionalService + WebSite + Accordion-Fix), `fetchpriority="high"` auf Hero und einen neuen About-Hero bekommen — Claude Code hat das parallel ausgeliefert. Wenn ich auf dem alten Atelier-Stand weitergebaut hätte, hätte der nächste Copy-Paste-Handoff **echte Live-Verbesserungen aus `main` zurückgerollt**. Veronikas Ansage daher: erst pull, dann nur die heutigen Text-Anpassungen wieder draufsetzen.
- **Wie:**
  1. `github_list_repos` → `github_get_tree` auf `VroniHei/Website@main`, Baum verglichen (lokal 24 → Repo 34+ Top-Level-Einträge).
  2. `github_read_file` auf `index.html@main` zum Abgleich: Repo-Datei 61.885 B (lokal davor ~46 KB) — responsive Picture-Sources, `fetchpriority`, neue JSON-LDs nur im Repo.
  3. `github_import_files` ohne `path_prefix` → 103 Dateien überschreiben den Atelier-Stand 1:1 (Fonts, Brand, alle Bilder als WebP-Varianten, CI-Configs, Accordion-Fix in `script.js`, neuer About-Hero in `ueber-mich.html/.css`).
  4. **Re-Apply auf der frischen Repo-`index.html`:**
     - `#hero-main .hb-bottom` → zwei Vroni-Voice-Subline-Absätze + Button-2-Label „Mehr über meinen Ansatz" (statt „Meinen Ansatz verstehen").
     - `#pain .pain-intro` → drei ausformulierte Leads (`Vielleicht kennst du das …` / `Das Problem ist nicht deine Vielseitigkeit …` / `Ich helfe dir, diesen roten Faden sichtbar zu machen …`); `.setze`-Schlusszeile bleibt draußen.
     - `#pain .pain-list` → komplette 6-Karten-Liste neu (`.pi-cat` + `.pi-title` + `.pi-text`), Reihenfolge 1) Klarheit · 2) Website · 3) KI · 4) Sichtbarkeit · 5) Angebot · 6) Sparring, Icons mitgewandert (Sparkle/Auge/Hexagon/Sprechblase).
     - `#angebote .shead-intro` → „…Marke, Website, KI und einem gesunden, nachhaltigen Lebensstil …" + „Aber sie alle verfolgen dasselbe Ziel …".
  5. **Re-Apply auf der frischen Repo-`style.css`:** `.hb-lede--2` direkt nach `.hb-lede`; `.pain-item .pi-title` zwischen `.pi-cat` und `.pi-text` (Desktop) **plus** mobile Pendants in der Media-Query. Die Repo-`.pain .pi-text{font-size:17px!important …}`-Override-Regel bewusst **unangetastet** gelassen — sie greift weiter und steuert die `.pi-text`-Größe live, mein Desktop-`.pi-text` ist quasi nur Fallback.
  6. **Nicht** wieder eingefügt: die heute zwischendurch testweise eingebaute `.hb-keys`-Hinweiszeile + zugehöriges CSS — Veronika hatte das per Inline-Kommentar wieder entfernen lassen, Stand ist also „nicht im Hero".
- **Alternativen / Abwägungen:**
  - **Selektives Importieren** (nur die Dateien, die ich auch ändere): verworfen, weil dann Sekundärdateien wie `README.md`, `MEDIEN.md`, `WISSEN.md`, `count.js`, neue `lighthouserc*.json`, `sitemap.xml`, `robots.txt` oder der Accordion-Fix in `script.js` im Atelier weiter fehlen würden. Genau das ist die Drift, die wir gerade auflösen wollten.
  - **Atelier-Edits per Hand auf die Repo-Datei kopieren** statt re-applyen: gleicher Effekt, aber fehleranfälliger, weil DOM-Struktur (`.pain-list`, `.shead-intro`) mehrere quasi-identische Vorkommen hat. `str_replace_edit` mit großen, eindeutigen Blöcken ist robuster.
  - `.pi-text`-Override im Repo (`!important`-Block) abräumen: bewusst nicht, weil sie eine bewusste Lesbarkeits-Entscheidung aus dem Repo war (17px statt 15px) — meine Karten profitieren mit Titel + Text genauso davon.
- **Learnings:**
  - **Vor jedem zweiten Iterations-Block im Atelier ein `github_get_tree` + Size-Diff** auf die Kerndateien fahren, sonst überschreibt der nächste Handoff Live-Fortschritt.
  - Wenn Repo-CSS `!important`-Overrides hat, neue Klassen so wählen, dass sie **nicht** dagegen kämpfen (`.pi-title` ist eigener Selektor, nicht `.pi-text`).
  - `github_import_files` ohne `path_prefix` ist OK für dieses Repo (103 Dateien, unter der 500er-Grenze) — bei größeren Repos wieder selektiv per Prefix gehen.
- **Konsequenz / Handoff:**
  - Geändert (gegenüber Repo `main`): `index.html` (Hero-Subline, Pain-Intro, Pain-Cards, Angebote-Intro), `style.css` (.hb-lede--2 + .pi-title Desktop/Mobile), `PROTOKOLL.md` (dieser Eintrag).
  - 1:1-Handoff-Kandidat für Claude Code → Branch z. B. `feat/hero-pain-vroni-voice` → PR auf `main`. Keine neuen Drittdienste/Schriften/Bilder → Recht/Datenschutz unverändert.
  - **Invariante neu (s. Abschnitt 1, falls noch nicht):** Vor jedem Iterationsblock im Atelier zuerst Repo-Pull, damit Live-Stand nicht versehentlich zurückgerollt wird.

### 2026-06-02 — Hero: Keys-Hinweiszeile wieder entfernt (Claude Design · Atelier · Inline-Kommentar)
- **Was:** `<p class="hb-keys">Branding · Webdesign · KI-Workflows · Holistic Performance</p>` aus `#hero-main .hb-bottom` wieder gelöscht. HTML-Markup drumherum unverändert. CSS-Regeln `.hb-keys` in `style.css` bleiben vorerst stehen (kein toter Selektor mehr, aber keine Schaden — Aufräum-Kandidat fürs nächste Cleanup). *(Nach dem Repo-Sync 2026-06-02 ist die CSS-Regel `.hb-keys` ohnehin nicht mehr im Atelier-`style.css` — also bereits sauber.)*
- **Warum:** Direkter Inline-Kommentar von Veronika („bitte entfernen") auf genau dem Element. Die Zeile war im selben Sweep heute (Briefing „Kleine Hinweiszeile") ergänzt worden — nach Live-Eindruck wirkt sie unter den CTAs nicht gewünscht. Konsequenz: zurück zum vorherigen Hero-Schluss (CTAs als finaler Ankerpunkt links, Bento-Visual rechts).
- **Wie:** Eine `str_replace_edit`-Operation, ausschließlich auf `index.html`. Keine Layout-Anpassung nötig — der `.hb-bottom` schloss bündig mit den CTAs ab, das ist jetzt wieder so.
- **Alternativen / Abwägungen:** Hätte die Zeile statt löschen auch nur eine Iteration umformulieren können — verworfen, weil der Kommentar eindeutig „entfernen" sagt und die Hero-Invariante ohnehin sagt: keine Tag-/Keyword-Anbauten unter den Hero-CTAs.
- **Learnings:** Auch dezenter Plaintext-Hint unter dem Hero kann redundant wirken, wenn die Bento-Karte rechts dieselben Themen ohnehin schon trägt. Die Invariante „keine Tag-Pills im Hero" gilt sinngemäß auch für Plaintext-Aufzählungen mit Mitten-Punkten.
- **Konsequenz / Handoff:** Geändert: nur `index.html` (eine Zeile raus). Keine Auswirkung auf Recht/Datenschutz/Assets/Fonts.

### 2026-06-02 — Angebote-Intro: „Bewegung" → „gesunder, nachhaltiger Lebensstil" (Claude Design · Atelier · Direkt-Edit)
- **Was:** In `index.html`, `#angebote .shead--split .shead-intro` den Einleitungssatz aktualisiert: „…an der Schnittstelle von Marke, Website, KI und **einem gesunden, nachhaltigen Lebensstil**…" (statt „…und Bewegung…"); Schlusssatz leicht entkrampft: „Aber sie **alle verfolgen** dasselbe Ziel" statt „Aber sie zahlen alle auf dasselbe Ziel ein".
- **Warum:** Direkt-Edit von Veronika. „Bewegung" ist zu eng als Schwester von Marke/Website/KI — gemeint ist die ganze Holistic-Performance-Schiene (Bewegung + Nervensystem + Alltag), die jetzt sprachlich klarer benannt wird. Außerdem klingt „auf X einzahlen" nach Business-Floskel, „verfolgen dasselbe Ziel" ist ruhiger und passt zur Vroni-Voice.
- **Wie:** Eine einzelne `str_replace_edit`-Operation auf den Paragraphen. Klasse `.shead-intro` und Markup unverändert → keine CSS-Anpassung nötig.
- **Alternativen / Abwägungen:** „…und Yoga" wäre kürzer, hätte die Schiene aber wieder verengt; „Holistic Performance" stand zur Wahl, blieb aber bewusst der eyebrow-Begriff in der Hero-Keys-Zeile (die kurz später wieder rausflog), damit der Intro-Satz menschlich (deutsch) bleibt.
- **Learnings:** Texte, die die vier Schienen aufzählen, sind hochsensibel — wenn eine Schiene sprachlich enger wird (Bewegung → Lebensstil), bleibt das Versprechen drumherum unverändert glaubwürdig.
- **Konsequenz / Handoff:** Geändert: nur `index.html` (eine Zeile). Keine Auswirkung auf CSS, Recht, Datenschutz, Assets, Fonts. 1:1-Handoff für Claude Code.

### 2026-06-02 — Startseite Hero + Problemsection: Texte in Vroni-Voice neu (Claude Design · Atelier)
- **Was:**
  - **Hero (`index.html`, `#hero-main .hb-bottom`):** `<p class="hb-lede">` aufgeteilt in zwei Absätze (neue Subline + Erklärabsatz „Ich helfe dir dabei …"). Zweiter Button-Label von „Meinen Ansatz verstehen" → **„Mehr über meinen Ansatz"**.
  - **Pain-Intro (`#pain .pain-intro`):** Zwei alte Leads + `.setze`-Schlusszeile durch **drei ausformulierte Leads** ersetzt („Vielleicht kennst du das …" / „Das Problem ist nicht deine Vielseitigkeit …" / „Ich helfe dir, diesen roten Faden sichtbar zu machen …"). H2 unverändert.
  - **Pain-Cards (6 Stück):** Jede Karte erhält jetzt einen echten **Titel** (`<h3 class="pi-title">`) **+** Beschreibung (`<p class="pi-text">`). Reihenfolge der Kategorien neu sortiert nach Briefing: 1) Klarheit, 2) Website, 3) KI, 4) Sichtbarkeit, 5) Angebot, 6) Sparring. Icons mitgewandert (Card 3 = Sparkle für KI, Card 4 = Auge für Sichtbarkeit, Card 5 = Hexagon für Angebot, Card 6 = Sprechblase für Sparring) — Hintergrundfarben bleiben über `nth-child` an Kartenposition gebunden, das passt zur neuen Reihenfolge optisch.
  - **CSS (`style.css`):** `.pain-item .pi-title` neu (17px / 650 / line-height 1.3, `text-wrap:balance`); Mobile-Pendant in der Media-Query (`.pi-title 15.5px`). `.hb-lede--2` Modifier für den zweiten Hero-Absatz (etwas kleiner, dunkelgrau).
- **Warum:** Briefing von Veronika — Texte sollen weniger nach KI-Marketingcopy klingen, mehr nach Vroni: warm, ehrlich, vollständige Sätze. Bisherige Subline war eine kompakte Verkaufszeile; die neuen Hero-Absätze trennen sauber **Problem-Spiegel** (Subline) von **Lösungs-Versprechen** (Erklärabsatz). Im Pain-Block waren die Karten reine Einzeiler ohne Headline — neue Briefing-Variante bringt Titel **plus** Erklärsatz und liest sich klarer als Liste.
- **Wie:** Vier fokussierte `str_replace_edit`-Operationen auf `index.html` (Hero-Bottom-Block · Pain-Intro · Pain-List komplett · `.shead-intro`) + zwei kleine `str_replace_edit`-Operationen auf `style.css` (`.pi-title` Desktop + Mobile, `.hb-lede--2`). Bestehender DOM-Aufbau (`.pain-item > .ic + .pi-body`) bewusst beibehalten, damit alle bestehenden CSS-Regeln (Icon-Bg per `nth-child`, Hover-Lift, Mobile-Row-Layout) ohne Refactor weitergreifen.
- **Alternativen / Abwägungen:**
  - Statt `.pi-cat` zu entfernen (Eyebrow „KLARHEIT · WEBSITE · …") **bewusst behalten** — gibt der Karte oberhalb des Titels einen Wiedererkennungsanker und passt zum eyebrow-System der Seite (Nav, Section-Heads). Alternative wäre puristischer (nur Titel + Text), wirkte auf dem dichten Grid aber unverankert.
  - Drittes Briefing-Absatz im Pain-Intro hätte man wieder in `.setze` (bold mit grünem Strich-Prefix) packen können — verworfen, weil der neue Satz erklärend / weich endet und das laute „Statement-Setze" dazu unpassend wäre. Stattdessen normaler dritter Lead → ruhiger Flow.
- **Learnings:**
  - Wenn Karten-Reihenfolge umsortiert wird, müssen die SVG-Icons mitwandern, sonst zeigt z. B. ein Hexagon (Angebot) auf der Karte „KI". `nth-child`-gebundene Hintergrundfarben dagegen können bleiben — sie wirken positionsbasiert und brauchen keine Semantik.
  - Beim Vroni-Voice-Sweep auf Texten lohnt sich, gleich mitzuprüfen, ob hartcodierte Strukturelemente (hier die `.setze`-Zeile) noch zum neuen Ton passen — sonst bleibt ein lauter Schluss-Stamper, obwohl der Text drumherum schon ruhiger geworden ist.
- **Konsequenz / Handoff:**
  - Geändert: `index.html` (Hero `.hb-bottom`, Pain-Intro, alle 6 Pain-Cards) und `style.css` (`.pi-title` neu Desktop + Mobile, `.hb-lede--2` neu). Keine Änderung an Recht/Datenschutz/Fonts/Assets nötig (keine neuen Drittdienste, keine neuen Schriften, keine neuen Bilder).
  - 1:1-Handoff-Kandidat für Claude Code → `feat/hero-pain-vroni-voice` Branch → PR auf `main`.

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

- [ ] **Echte Kundenstimmen** — Voices-Section auskommentiert, wartet auf echte Texte.
- [ ] **Impressum + Datenschutz finalisieren** — Platzhalter-Seiten existieren; rechtlich prüfen/vervollständigen; dann `noindex` entfernen.
- [ ] **Über-mich-Seite** (eigene Unterseite mit ausführlicher Story) + CTA auf Startseite verlinken.
- [ ] **Lighthouse-Audit** im echten Browser (Chrome DevTools) durchführen — Performance-Score auf Mobile prüfen.
- [ ] **Echten Domain-Canonical** setzen sobald Custom Domain steht (aktuell `vronihei.github.io/Website/`).
- [x] **Favicon** — erledigt (`favicon.svg`, lokal).
- [ ] **Strukturierte Daten** (Schema.org: Person, LocalBusiness, FAQPage) optional für GEO-Optimierung.

### Launch-Bündel (wenn Veronika Zeit hat — bewusst in EINEM Rutsch, in dieser Reihenfolge)
- [ ] **Hosting-Umzug** → **Hostinger**; danach Datenschutz „Hosting" + Impressum-URLs anpassen.
- [ ] **Eigene Domain `veronika-heidrich.de`** + HTTPS; danach alle `canonical`/OG-/`sitemap.xml`/`robots.txt`-URLs umstellen.
- [ ] **Google Search Console**: Property anlegen → Verifizierungs-Meta-Tag einbauen → Sitemap einreichen (kein Tracking/Banner).
- [ ] **GoatCounter** (cookieloses, kostenloses EU-Analytics): Skript einbauen + Datenschutz-Abschnitt „Reichweitenmessung". **Kein Consent-Banner, kein Borlabs nötig.**
- [ ] **`noindex` entfernen** (Rechtsseiten) → eRecht24-Endcheck → final live → Stand als `v1.0` taggen.

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
5. **Branch**: direkt auf `main` arbeiten — `main` ist der einzige Branch und die Produktionsquelle.
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
