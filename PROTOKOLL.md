# PROTOKOLL · Vroni / InnerLine Website

> Laufendes Entscheidungs- und Änderungsprotokoll.
> Zweck: Regressionen vermeiden. Vor JEDER neuen Runde zuerst die **Invarianten** unten prüfen,
> nach JEDER Änderung den **Verlauf** ergänzen. Geht 1:1 mit ins Repo `vronihei/Website`.

---

## 1. INVARIANTEN — „Das darf nicht (wieder) rausfallen"

### Logo / Wortmarke
- [ ] Wortmarke **„innerline"** in der Schrift **Vaelia** (lokal, `fonts/Vaelia.woff2`/`.woff`).
- [ ] **NN-Ligatur**: `text-transform:uppercase` + `font-feature-settings:"dlig" 1` auf `.bl-up`. DOM-Text bleibt `inn` + `erline`.
- [ ] **Linie hinter dem Wort** (`.bl-word::before`): Nav = `#B9ED72`, Footer = `#BC7B4C`.
- [ ] Logo-Größe Nav + Footer **21px**, Nav mit `translateY(2px)`.

### Motion / Animation ⚠️ schon einmal versehentlich rausgefallen
- [ ] **Hero-Bild Hover-Zoom**: `.hero-portrait img{position:absolute;inset:0;transition:transform 1.5s …}` + `.hero-portrait:hover img{transform:scale(1.06)}`.
- [ ] **Über-mich-Bilder Hover-Zoom**: `.am-main img` + `.am-sub img` je scale(1.05/1.06).
- [ ] **Yoga-Bild Hover-Zoom**: `.yoga-image img{transition:transform 1.6s …}` + hover scale(1.05).
- [ ] **Zitat-Band Ken-Burns**: `.quote-band .qb-img{animation:qbDrift 24s …}`.
- [ ] Alle Motion unter `@media (prefers-reduced-motion:reduce)` deaktiviert.

### Schrift-System
- [ ] **Vaelia = nur Display/Wortmarke** (Logo + `about-sign .as-brand`). NIEMALS für Fließtext.
- [ ] Überschriften = **Open Sauce Sans 800**. Fließtext Open Sauce Sans 400.

### Mobile — Bild-Anzeige ⚠️ mehrfach repariert
- [ ] **hero-portrait braucht `width:100%`** im 900px-Breakpoint (flex:none allein → Kollaps, da Inhalt absolut positioniert).
- [ ] **about-media .am-main braucht explizite Höhe** im 900px-Breakpoint (`height:clamp(320px,70vw,520px)`), da `aspect-ratio` allein den Containing-Block nicht zuverlässig aufbaut für absolut positionierte Kinder.

### Mobile — Layout
- [ ] **Burger-CTA** im Overlay = `background:var(--ink); color:var(--chalk)` (schwarz/weiß).
- [ ] Hero-Bild Mobile als **Banner über** der Headline (`.hero-visual{order:-1}`).
- [ ] **Pain-Items** auf Mobile: `flex-direction:row` (Icon links, Text rechts). Invariante dokumentiert im CSS.
- [ ] **Big-Nodes** auf Mobile: `flex-direction:row` (Icon links, Text rechts). Invariante dokumentiert im CSS.
- [ ] **Voices-Grid** auf Mobile/Tablet: scroll-snap horizontal, 1 Card sichtbar, Dots klickbar.
- [ ] Timeline auf Mobile vertikal (Badges links, Clay-Faden), letztes ohne Linie.
- [ ] Kein horizontaler Scroll.

### Icons (System — überall identisch halten)
- [ ] **Marke/Branding** = Wellen-Kurve.
- [ ] **Website/Webdesign** = Monitor-Icon.
- [ ] **KI/Workflows** = **Sparkle** (4-Punkt-Stern) — überall identisch.
- [ ] **Körper/Energie/Yoga** = Herz-Icon.

### Über-mich-Signatur
- [ ] Neue Signatur-Struktur: `.about-sign` mit `as-name-row` (grüner Strich + „VRONI HEIDRICH" in Caps) + `as-brand` (Vaelia „INNERLINE" mit grünem Durchstrich).
- [ ] Zitat-Band-Autorenzeile: nur **„Vroni Heidrich"** (kein „Veronika Heidrich", kein Mittelpunkt).

### Trust-Section (neu, Design-Update V)
- [ ] 4 Karten mit echten Bildern: `trust-ehrliche-einschaetzung`, `trust-direkter-kontakt`, `trust-sortieren-vor-gestalten`, `trust-ki-werkzeug`.
- [ ] Nav-Link „Werte" → `#trust`, mobiles Menü ebenso.
- [ ] Footer: 4-Spalten-Layout mit `.footer-quote`-Bild-Block. `.footer-brand` (Vaelia-Wortmarke) im Footer-Bottom.

### Farb-System (Lilac als wiederkehrender Akzent)
- [ ] **Lilac (`#CBBEF4`)** erscheint als dezenter Background-Blob in 5 Sections: Das große Ganze, Arbeitsweise, FAQ, Kundenstimmen, Kontakt. Konsistent halten — keine neue Section ohne Abgleich mit dem Gesamtbild.

### FAQ
- [ ] Semantisch `<details><summary>` (Google erkennt FAQ-Schema automatisch).
- [ ] Alle 7 Fragen geschlossen beim Start (kein `open`-Attribut).
- [ ] `.fq-chev` = nur Pfeil, kein Kreis — konsistent mit Ansatz-Accordion.

---

### 2026-05-31 — Design-Update IV: Claim-Band, Footer-Claim, Platzhalter-Bereinigung
- **Neue Claim-Band-Section** zwischen Arbeitsweise und Kundenstimmen: atmosphärisches See-Bild (`claim-weg.png`) mit Ken-Burns-Drift (28s), dunklem Overlay, Statement „Gute Sichtbarkeit fühlt sich nicht *lauter* an. Sondern *klarer.*" (grüne Akzente).
- **Voices**: sichtbarer „Platzhalter-Stimmen"-Text raus (war öffentlich sichtbar — jetzt nur noch HTML-Kommentar mit TODO).
- **Footer-Claim** auf finalen Stand: „Veronika Heidrich · Brand- & Website-Strategin mit KI als Werkzeug. *Klarheit in Bewegung.*"
- **Personal Branding Karte**: Beschreibung geglättet: „…damit deine Marke klarer wird und sich trotzdem nach dir anfühlt."
- **Gedankenstriche**: 2 em-Dashes in Voices-Zitaten zu Punkten geändert (natürlicherer Vroni-Ton).

---

### 2026-05-31 — Design-Update V: Trust-Section, Footer-Redesign, WebP, SEO-Meta
- **Neue Trust-Section** „Was mir wichtig ist" (4 Bild-Karten): ehrliche Einschätzung, direkter Kontakt, Sortieren vor Gestalten, KI als Werkzeug — positioniert zwischen Claim-Band und Kundenstimmen.
- **Footer komplett neu**: editoriales 4-Spalten-Layout mit Zitat-Bild-Block (`.footer-quote`, `footer-weg.png` mit Overlay + Claim-Text), 3 Link-Spalten (Navigation, Kontakt, Über Veronika Heidrich) statt bisherigem Full-Bleed-Hintergrund-Footer.
- **SEO-Meta vollständig**: `<title>`, `<meta description>`, `<meta keywords>`, `<meta author>`, `<link rel=canonical>`, Open Graph (og:type, locale, title, description, url, image, site_name), Twitter-Card — alles neu.
- **`<picture>` + WebP für alle Bilder**: hero-visual, about-workspace, about-weg, zitat-weg, yoga, claim-weg, footer-weg, alle trust-* Bilder. Fallback PNG bleibt.
- **Nav-Update**: „Werte" (→ #trust) und „FAQ" (→ #faq) hinzugefügt; „Stimmen" aus Nav entfernt (Section bleibt im DOM als Platzhalter).
- **Kontaktformular A11y**: `required`, `aria-required="true"`, `.req`-Markierung auf Pflichtfeldern (BFSG-Anforderung).
- **contact-privacy** Zeile vorbereitet in CSS (Datenschutz-Hinweis-Styling, bereit für Texteintrag).

---

## 2. ASSETS (müssen ins Repo committet sein!)

- `images/hero-visual.png` — Hero
- `images/about-workspace.png` — Über mich, Hauptbild
- `images/about-weg.png` — Über mich, versetztes Bild (Bergweg)
- `images/yoga.png` — Yoga-Section Bild (seit 2026-05-31 drin)
- `images/claim-weg.png` + `.webp` — Claim-Band (See/Wasser, goldene Stunde)
- `images/zitat-weg.png` + `.webp` — Zitat-Band Hintergrund
- `images/footer-weg.png` + `.webp` — Footer (jetzt als `.footer-quote`-Bild-Block)
- `images/trust-ehrliche-einschaetzung.png` + `.webp` — Trust-Card 1 (Notizbuch, Morgenlicht)
- `images/trust-direkter-kontakt.png` + `.webp` — Trust-Card 2 (Gespräch am Holztisch)
- `images/trust-sortieren-vor-gestalten.png` + `.webp` — Trust-Card 3 (Moodboard-Karten)
- `images/trust-ki-werkzeug.png` + `.webp` — Trust-Card 4 (Laptop, AI-Karte)
- Alle Bilder haben `.webp`-Variante (seit 2026-05-31 drin, via `<picture>`-Element)
- `fonts/Vaelia.woff2`, `fonts/Vaelia.woff` — Wortmarke/Display

---

## 3. VERLAUF (neueste zuerst)

### 2026-05-31 — Design-Update III: Arbeitsweise-Cards, FAQ, Kontakt, Lilac-System
- **Arbeitsweise** komplett neu: editorial Step-Cards (weiß, Border, Hover-Lift), große Lime-Nummern (01–04, werden beim Hover grüner), Clay-Labels, Pfeil-Indikatoren zwischen Cards, Lime- + Lilac-Orbs mit Drift-Animation.
- **FAQ-Headline**: „Was du dich vielleicht auch fragst." (statt „Was Menschen mich vorher oft fragen").
- **FAQ 7 Fragen**: Neue Frage „Arbeitest du mit WordPress und Elementor?" ergänzt (wichtig für SEO). Alle Antworten natürlicher (Vroni-Voice), Punkte statt Gedankenstriche in Frage 1.
- **Voices-Headline**: „Was nach der Zusammenarbeit zurückkommt" (kein „Menschen" mehr, doppelte Verwendung vermieden).
- **Kontakt** neu: H2 umgestellt (Idee/Projekt zuerst), kompakterer Body ohne Aufzählung, zwei direkte Kontakt-Pills (E-Mail + Instagram-Icon), Formular mit natürlicherem Label („Worum geht's?"), neue Optionen, Button „Nachricht abschicken".
- **H2 überall** einheitlich auf `clamp(28px,3.2vw,40px)` reduziert.
- **shead p** max-width: 620 → 760px (FAQ-Intro hatte zu frühen Zeilenumbruch).
- **Lilac** jetzt in 5 Sections als kohärentes Akzent-System verteilt (statt nur in Arbeitsweise/FAQ).
- **Big-Section**: Lilac-Blob unten rechts ergänzt (5. Akzentpunkt).

### 2026-05-31 — Design-Update II: FAQ, Yoga, Pain-Items, Angebote, About-Signatur
- **FAQ-Section** neu eingebaut: `<details><summary>`, Glaseffekt-Cards, 6→7 Fragen, vor Kontakt.
- **Yoga-Section** komplett neu: `yoga-bento` mit Foto links / Forest-Card rechts, 3-Wege-Struktur (ypaths/ypath), VHS-Kurs-Tags Mi/Do.
- **Pain-Items** neue Struktur: `pi-body/pi-cat/pi-text` mit Kategorie-Label (Klarheit, Website, KI …) + Icon-Farbschema nach Position.
- **Angebote**: `offer-for` (Zielgruppe, fett, mit Trennlinie) + `desc` (Beschreibung) aufgeteilt.
- **About-Signatur** neu: `as-name-row` (grüner Strich + „VRONI HEIDRICH" Caps) + `as-brand` (Vaelia Innerline-Wordmark mit grünem Durchstrich).
- **Zitat**: Autorenzeile vereinheitlicht zu „Vroni Heidrich".
- **Big-Section**: „zusammengehört" grün, big-foot-Text kompakter.
- **script.js**: Voices-Slider mit scroll-snap + dot-navigation ergänzt.
- **images/yoga.png** hinzugefügt.

### 2026-05-31 — Mobile-Fix: Pain-Items + Big-Nodes row-Layout
- Pain-Items auf Mobile/Tablet: `flex-direction:row` (Icon links, Text rechts).
- Big-Nodes auf Mobile/Tablet: `flex-direction:row` als horizontale Cards.
- `about-media .am-main`: explizite Höhe in Mobile-Breakpoint.
- `hero-portrait`: `width:100%` in Mobile-Breakpoint.

### Frühere Runden (im Atelier, vor GitHub-Sync)
- Hero-Bild Motion wiederhergestellt (war beim About-Umbau rausgefallen).
- Timeline 7 Stationen, KI-Icon vereinheitlicht (Sparkle).
- Über-mich editoriales Layout, 2-Bild-Komposition.
- Logo-Linie final (Nav grün, Footer clay). Burger-CTA schwarz/weiß.
- Bilder eingebunden, Vaelia-Wortmarke mit NN-Ligatur, Motion-Effekte.

---

## 4. OFFENE TODOS

- [ ] **Echte Kundenstimmen** eintragen (aktuell Platzhalter — sichtbarer Hinweis entfernt, nur noch HTML-Kommentar im Code).
- [x] **SEO/GEO-Meta** ergänzt (Design-Update V): title, description, keywords, canonical, OG, Twitter-Card.
- [ ] **SEO/GEO-Feinschliff**: H2/H3-Struktur prüfen, strukturierte Daten.
- [ ] **Eigene Über-mich-Seite** (ausführliche Story) + CTA „Mehr über mich" auf der Startseite verlinken.
- [ ] **A11y-Audit** über die fertige Seite (Kontraste, Fokus, Semantik, Touch-Targets ≥44px). BFSG gilt ab 28.06.2025.
- [ ] **Footer** noch nicht final überarbeitet (Kontakt-Sektion im Atelier war letzter Stand, Footer noch auf Platzhalter-Links).
- [ ] **Impressum / Datenschutz** Seiten müssen noch gebaut werden (aktuell Anker ohne Ziel).

---

## 5. ARBEITSREGEL
1. Vor Änderungen: Abschnitt **1 (Invarianten)** lesen.
2. Beim Umschreiben von CSS-Blöcken prüfen, ob geteilte Regeln (z. B. `.hero-portrait img`) erhalten bleiben.
3. Nach Änderungen: **Verlauf** ergänzen, Invarianten/TODOs aktualisieren.
4. Brand Voice 2.0 & BFSG/WCAG-AA (siehe `CLAUDE.md`) gelten immer.
