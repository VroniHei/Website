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

### Rechtliche Seiten (Impressum / Datenschutz)
- [ ] **Rechtsstand: DDG** (nicht TMG), **TDDDG** (nicht TTDSG). Bei neuen Texten beachten.
- [ ] `impressum.html`: Adresse **Seeweg 8, 83126 Flintsbach am Inn**; Kleinunternehmer (§ 19 UStG) → **keine USt-IdNr**; **keine Kammer** (kein reglementierter Beruf); **Telefon bewusst NICHT** sichtbar (E-Mail genügt).
- [ ] **KI-Transparenz-Hinweis** im Impressum behalten (Bilder/Texte KI-gestützt, redaktionell verantwortet; Art. 50 KI-VO ab 02.08.2026). **Nicht** in die Datenschutzerklärung (kein Besucherdaten-Thema).
- [ ] `datenschutz.html`: spiegelt den **realen** Stand — keine Cookies/Tracking, `mailto`-Kontakt, **Schriften lokal gehostet (keine Font-CDN)**, Hosting GitHub Pages. Bei Hostinger-Umzug Abschnitt 2 anpassen.
- [ ] **Bei jeder datenverarbeitungs-/Dritt-Dienst-relevanten Änderung** Rechtstexte im selben PR anpassen (s. `CLAUDE.md`).
- [ ] Vor Livegang final mit **eRecht24-Generator** gegenprüfen.
- [ ] Beide Seiten haben aktuell `<meta name="robots" content="noindex, nofollow">` — entfernen, sobald final.

---

## 2. ASSETS (müssen ins Repo committet sein!)

### Bilder (`images/`) — alle als PNG + WebP
- `images/hero-visual.png` + `.webp` — Hero (900×1200)
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

### Seiten (Root)
- `index.html`, `style.css`, `script.js` — Startseite
- `impressum.html` — Impressum (Platzhalter)
- `datenschutz.html` — Datenschutzerklärung (Platzhalter)

---

## 3. VERLAUF (neueste zuerst)

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
- [ ] **Favicon** fehlt noch (aktuell Browser-Default).
- [ ] **Strukturierte Daten** (Schema.org: Person, LocalBusiness, FAQPage) optional für GEO-Optimierung.

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
