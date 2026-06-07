# MEDIEN · Bild- & Medienregister · Vroni / InnerLine

> **Lebendes Register** aller auf der Website verwendeten Bilder & Medien — Herkunft, Varianten,
> Verwendung, Rechte und Änderungen. Ziel: **lückenlose Provenienz**, gerade im KI-Zeitalter.
>
> **Abgrenzung:** `MEDIEN.md` = *aktueller Zustand pro Medium* (Register). `PROTOKOLL.md` = *Historie/Begründung*
> der Projektänderungen. Diese Datei wird **append-/update-pflichtig** gepflegt (siehe Regel in `CLAUDE.md`
> → „Medien-Dokumentationspflicht").

---

## 0. Pflege-Regel (Kurzfassung — Details in `CLAUDE.md`)

Bei **jeder** Medien-Änderung wird der Eintrag hier **im selben PR** aktualisiert, mit **datiertem Vermerk**
unter „Änderungen":
- **Neues Bild/Medium** → neuen Eintrag anlegen (alle Felder).
- **Neue Variante/Größe/Format** (z. B. zusätzliche WebP/Thumbnail) → unter „Dateien/Varianten" ergänzen.
- **Alt-Text geändert** (z. B. A11y-Optimierung) → „Alt-Text" aktualisieren + Vermerk.
- **Mehrfachnutzung** (Bild wird auf weiterer Seite verwendet) → „Verwendung" ergänzen.
- **Austausch/Optimierung/Entfernung** → Vermerk mit Datum und Grund.

**Versionierung bei Bild-Austausch (Konvention):**
- **Gleiches Motiv, nur optimiert** (kleinere WebP, Re-Export) → **Dateinamen behalten, überschreiben**. Git hält die Historie; im Eintrag genügt ein datierter „Änderungen"-Vermerk.
- **Inhaltlich neues Bild** (anderes Motiv) → **neuer, sprechender Dateiname** + neuer Eintrag; alten Eintrag bei Entfernung mit Datum als „entfernt" markieren (nicht löschen).

---

## 1. Globale Herkunft & Rechte (gilt für ALLE aktuell gelisteten Bilder)

- **Quelle:** Alle Bilder sind **KI-generiert mit ChatGPT (DALL·E)** und von **Veronika Heidrich** selbst erstellt.
- **Nutzungsrechte:** Liegen laut OpenAI-Nutzungsbedingungen bei Veronika Heidrich → freie Nutzung auf der Website.
- **Urheberrecht:** Rein KI-generierte Werke genießen in DE/EU/US derzeit **keinen eigenen Urheberrechtsschutz**.
  Für die Eigennutzung unkritisch; relevant nur, falls Dritte ein Bild übernehmen (kein exklusiver Schutz).
- **Abgebildete Personen:** Wo Menschen zu sehen sind (`about-workspace`, `hero-journaling`), handelt es sich um
  **KI-generierte Darstellungen**, **nicht** um reale Fotos von Veronika Heidrich → kein „Recht am eigenen Bild"-Thema.
- **Metadaten-Hygiene:** KI-Bilder enthalten i. d. R. keine personenbezogenen EXIF-Daten (kein GPS/Gerät).
  Bei künftigen **echten Fotos** vor dem Upload EXIF/Standort entfernen.
- **C2PA / Content Credentials:** (Ausblick) KI-Herkunft kann künftig per C2PA in Bild-Metadaten hinterlegt werden.

> **Sobald ein NICHT-KI-Bild dazukommt** (Stock, Fotograf:in, CC-Lizenz): Quelle, Urheber:in, Lizenz und
> ggf. Attributionspflicht **im jeweiligen Eintrag** sauber dokumentieren (überschreibt die globalen Annahmen oben).

**Technik-Standard pro Bild:** Original als `.png` im Repo, ausgeliefert wird die komprimierte `.webp`-Variante
(via `<picture>` mit PNG-Fallback). Maße = Intrinsic-Size im HTML (`width`/`height`, gegen Layout-Shift).

**Responsive Varianten (seit 2026-06-02):** Jedes Listenbild hat zusätzlich eine **`-960.webp`** (max. 960 px breit)
für kleine Screens. Im `<picture><source>` per `srcset`/`sizes` eingebunden, **desktop-sicher**
(`sizes="(max-width: 768px) 100vw, <volle Breite>px"` → großer Screen erhält weiter die volle Auflösung,
nur Mobil lädt die schlanke 960er). Mobile-Bildlast dadurch ~1,55 MB → ~0,7 MB. Bei neuen Bildern die `-960`-Variante
mitgenerieren (oder Verzicht im Eintrag begründen).

**Bildwelt & Prompts (Reproduktion):** Stilrahmen, Masterprompt, Motiv-Prompts und Negativ-Prompts liegen in
**[`brand/bildwelt-und-prompts.md`](brand/bildwelt-und-prompts.md)** — die kanonische Referenz, um neue Bilder
im gleichen Stil zu erzeugen. Laut Quelle sind die **exakten Original-Prompts nicht 1:1 rekonstruierbar**
(ChatGPT speichert den finalen System-Prompt nicht). Die Prompts dort sind reproduzierbare Rekonstruktionen.

🟡 **TODO Vroni:** Pro Bild **Erstellungsdatum** und (wo sicher) die **Motiv-Zuordnung zum Guide** ergänzen
(Felder unten mit `— offen —`).

---

## 2. Überblick (Schnelltabelle)

| Bild | Varianten (PNG → WebP) | Maße | Verwendung | Dekorativ |
|---|---|---|---|---|
| hero-visual | 1848 KB → 96 KB | 900×1200 | index (Hero, OG-Image) | nein |
| hero-branding | 2170 KB → 128 KB | 1672×941 | index (Hero-Bento) | nein |
| hero-journaling | 1909 KB → 97 KB | 1662×946 | index (Hero-Bento) | nein |
| about-workspace | 1866 KB → 84 KB | 1200×1500 | index (Über mich) | nein |
| about-weg | 2522 KB → 249 KB | 900×1200 | index (Über mich) | nein |
| yoga | 2149 KB → 153 KB | 1200×900 | index (Yoga) | nein |
| trust-ehrliche-einschaetzung | 1885 KB → 99 KB | 1448×1086 | index (Werte) | nein |
| trust-direkter-kontakt | 1820 KB → 75 KB | 1448×1086 | index (Werte) | nein |
| trust-sortieren-vor-gestalten | 2237 KB → 130 KB | 1448×1086 | index (Werte) | nein |
| trust-ki-werkzeug | 1809 KB → 86 KB | 1448×1086 | index (Werte) | nein |
| zitat-weg | 1992 KB → 140 KB | 1600×900 | index (Zitat-Band, BG) | **ja** (`alt=""`) |
| claim-weg | 1928 KB → 111 KB | 1500×1000 | index (Claim-Band, BG) | **ja** (`alt=""`) |
| footer-weg | 2388 KB → 132 KB | 1600×1000 | index (Footer, BG) | **ja** (`alt=""`) |

> ⚠️ **Performance-Notiz:** Ausgeliefert wird WebP (Desktop: volle `.webp`, Mobil: `-960.webp` via `srcset`/`sizes`).
> Die PNG-Originale (~25,9 MB) dienen nur als Fallback und werden real kaum geladen (WebP-Support universell) —
> **nicht löschen** (Invariante: WebP+PNG-Fallback). Verbleibendes Potenzial: PNG-Fallbacks sind groß (reines Repo-Gewicht),
> und desktopseitig könnten mit präzisen `sizes` pro Layout noch Bytes gespart werden (bewusst konservativ gehalten).

---

## 3. Einzeleinträge

### hero-visual
- **Dateien:** `images/hero-visual.png` (Original, 1848 KB) · `images/hero-visual.webp` (ausgeliefert, 96 KB)
- **Maße:** 900×1200 px
- **Herkunft:** KI-generiert (ChatGPT/DALL·E), erstellt von Veronika Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Hero) — zugleich **OG-/Twitter-Vorschaubild** (`og:image`)
- **Alt-Text:** „Arbeitsplatz im Naturlicht: Notizbuch, Yogamatte und Laptop vor einem Fenster mit Waldblick"
- **Dekorativ:** nein · **Above-fold:** ja (`loading="eager"`, Preload)
- **Rechte:** siehe Abschnitt 1 (Eigenerzeugung)
- **Beachten:** Wird als Social-Preview genutzt → bei Austausch `og:image`/`twitter:image` in `index.html` mitziehen.
- **Änderungen:** `2026-06-02` — Ersterfassung im Medienregister.

### hero-branding
- **Dateien:** `images/hero-branding.png` (2170 KB) · `images/hero-branding.webp` (128 KB)
- **Maße:** 1672×941 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** *(aktuell nicht eingebunden)* — bis 2026-06-02 in `index.html` (Hero-Bento, Soft-Grid `.s-brand`); ausgetauscht gegen `about-arbeiten` (Vorgabe Vroni: Bild mit Bailey, langärmlig, rechter Arm/Tattoo verdeckt), weil das Querformat zusätzlich im jetzt höheren Bento-Cell stark beschnitten wurde. Datei bleibt vorerst im Repo (Aufräum-Kandidat).
- **Alt-Text:** „Branding-Stillleben: aufgeschlagenes Moodboard mit Materialkarten und Farbflächen im warmen Licht"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Änderungen:**
  - `2026-06-02` — Ersterfassung.
  - `2026-06-02` — Aus Hero-Bento `.s-brand` entfernt (Crop-Probleme nach Bento-Stretch); Datei bleibt im Repo, ungenutzt.

### hero-journaling
- **Dateien:** `images/hero-journaling.png` (1909 KB) · `images/hero-journaling.webp` (97 KB)
- **Maße:** 1662×946 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Hero-Bento, Soft-Grid)
- **Alt-Text:** „Frau schreibt im Naturlicht in ihr Notizbuch, daneben Kaffee und Laptop — Gedanken sortieren"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Zeigt eine **KI-generierte Person** (kein reales Foto) — Transparenz bei späterer Verwendung beachten.
- **Änderungen:** `2026-06-02` — Ersterfassung.

### about-workspace
- **Dateien:** `images/about-workspace.png` (1866 KB) · `images/about-workspace.webp` (84 KB)
- **Maße:** 1200×1500 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Über mich)
- **Alt-Text:** „Vroni am Laptop bei der Website-Strategie, daneben ein Notizbuch mit handschriftlichen Notizen zu Klarheit, Marke und Struktur"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Alt-Text benennt „Vroni", die abgebildete Person ist jedoch **KI-generiert** (kein reales Foto). Bei Bedarf Alt-Text/Transparenz prüfen.
- **Änderungen:** `2026-06-02` — Ersterfassung.

### about-weg
- **Dateien:** `images/about-weg.png` (2522 KB) · `images/about-weg.webp` (249 KB)
- **Maße:** 900×1200 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Über mich) · `ueber-mich.html` (Hero-Sub-Inset `.au-hm-sub`, seit 2026-06-03)
- **Alt-Text:** „Ein gewundener Bergpfad im Abendlicht, dem ein feiner roter Faden folgt — Sinnbild für Bewegung und den roten Faden"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Größte WebP-Variante (249 KB) — Optimierungskandidat im Performance-Schritt.
- **Änderungen:**
  - `2026-06-02` — Ersterfassung.
  - `2026-06-03` — Zusätzliche Verwendung als Hero-Sub-Inset auf `ueber-mich.html` (ersetzt `about-desk-detail`; Vroni-Inline-Kommentar: Hero-Inset soll Bewegung zeigen). Kein neues Asset, nur Wiederverwendung.
  - `2026-06-03` — Im Hero-Bento von `ueber-mich.html` zur **Haupt-Kachel** `.au-hb-main` heraufgestuft (Vroni-Inline-Kommentar: Bento wie auf der Startseite, `about-weg` als Hauptbild).

### yoga
- **Dateien:** `images/yoga.png` (2149 KB) · `images/yoga.webp` (153 KB)
- **Maße:** 1200×900 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Yoga)
- **Alt-Text:** „Ruhiger Yogaraum im Naturlicht: Yogamatte mit Block, Trinkflasche und Laufschuhe nebeneinander — Yoga und Bewegung als Basis im Alltag"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

### trust-ehrliche-einschaetzung
- **Dateien:** `images/trust-ehrliche-einschaetzung.png` (1885 KB) · `images/trust-ehrliche-einschaetzung.webp` (99 KB)
- **Maße:** 1448×1086 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Werte/Trust)
- **Alt-Text:** „Offenes Notizbuch mit Stift, Vase mit Olivenzweig und Tasse im warmen Morgenlicht — Sinnbild für ruhige, ehrliche Einschätzung"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

### trust-direkter-kontakt
- **Dateien:** `images/trust-direkter-kontakt.png` (1820 KB) · `images/trust-direkter-kontakt.webp` (75 KB)
- **Maße:** 1448×1086 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Werte/Trust)
- **Alt-Text:** „Persönliches Gespräch am Holztisch mit Laptop, Notizbuch und Tasse im Naturlicht — direkter Kontakt ohne Zwischenstationen"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

### trust-sortieren-vor-gestalten
- **Dateien:** `images/trust-sortieren-vor-gestalten.png` (2237 KB) · `images/trust-sortieren-vor-gestalten.webp` (130 KB)
- **Maße:** 1448×1086 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Werte/Trust)
- **Alt-Text:** „Hände sortieren Moodboard-Karten mit Naturmaterialien und Stoffmustern auf einem Holztisch — erst sortieren, dann gestalten"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

### trust-ki-werkzeug
- **Dateien:** `images/trust-ki-werkzeug.png` (1809 KB) · `images/trust-ki-werkzeug.webp` (86 KB)
- **Maße:** 1448×1086 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Werte/Trust)
- **Alt-Text:** „Arbeitsplatz mit Laptop, Notizbuch, Materialkarten und einer Karte mit der Aufschrift ‚AI unterstützt, nicht ersetzt' — KI als Werkzeug"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

### zitat-weg
- **Dateien:** `images/zitat-weg.png` (1992 KB) · `images/zitat-weg.webp` (140 KB)
- **Maße:** 1600×900 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Zitat-Band, Hintergrund, dekorativ) · `ueber-mich.html` (Sektion Persönlich, Inhaltsbild, seit 2026-06-03)
- **Alt-Text (index.html):** `alt=""` — dekorativ (Claim-Band trägt eigenen Overlay-Text)
- **Alt-Text (ueber-mich.html):** Schmaler Trailpfad durch die Berge im Abendlicht. Bewegung in der Natur als Ort, an dem Gedanken sich sortieren
- **Dekorativ:** Ja auf `index.html`, nein auf `ueber-mich.html`
- **Rechte:** siehe Abschnitt 1
- **Änderungen:**
  - `2026-06-02` — Ersterfassung.
  - `2026-06-03` — Redesign v2: Zusätzliche Verwendung auf `ueber-mich.html` (Sektion Persönlich als Inhaltsbild, ersetzt `about-persoenlich`); Alt-Text gepflegt. Auf `index.html` weiterhin dekorativ.

### claim-weg
- **Dateien:** `images/claim-weg.png` (1928 KB) · `images/claim-weg.webp` (111 KB)
- **Maße:** 1500×1000 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Claim-Band, Hintergrund)
- **Alt-Text:** `alt=""` — **dekoratives Hintergrundbild**
- **Dekorativ:** **ja**
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

### footer-weg
- **Dateien:** `images/footer-weg.png` (2388 KB) · `images/footer-weg.webp` (132 KB)
- **Maße:** 1600×1000 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** — offen — · **Prompt:** — offen —
- **Verwendung:** `index.html` (Footer, Hintergrund)
- **Alt-Text:** `alt=""` — **dekoratives Hintergrundbild**
- **Dekorativ:** **ja**
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

### about-desk-detail
- **Dateien:** `images/about-desk-detail.png` (664 KB) · `images/about-desk-detail.webp` (22 KB)
- **Maße:** 700×560 px (5:4 Detail-Crop aus `about-hero-desk`)
- **Herkunft:** abgeleitet aus `about-hero-desk` (KI, ChatGPT/DALL·E, V. Heidrich) · **Erstellt am:** 2026-06-03 · **Crop:** OffscreenCanvas im Atelier, Region `820,60 700×560` (rechte obere Bildhälfte, ohne Person/Hand), WebP-Quality 0.86
- **Verwendung:** `ueber-mich.html` (Hero-Bento Zitat-Kachel `.au-hb-quote`, seit 2026-06-03; unter Forest-Overlay, `alt=""` da dekorative Textur für den Marken-Anker)
- **Alt-Text:** „Detail vom Arbeitsplatz: Laptop, Notizbuch, Vase mit Olivenzweig und Tasse im warmen Naturlicht"
- **Dekorativ:** nein · **KI-Darstellung:** nein (zeigt nur Objekte aus dem Hero-Setup)
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Crop wurde gezielt so gesetzt, dass keine Hand/kein Arm sichtbar bleibt. Wenn das Quellbild `about-hero-desk` jemals neu generiert wird, muss dieser Crop nachgezogen werden (Crop-Region steht oben).
- **Änderungen:**
  - `2026-06-03` — Ersterfassung (Vroni-Inline-Kommentar: „tausche das Bild gegen eins wo kein Mensch drauf ist").
  - `2026-06-03` — Aus der Hero-Sub-Inset entfernt (ersetzt durch `about-weg`, Vroni wollte dort Bewegung); Asset bleibt im Repo, aktuell ungenutzt.
  - `2026-06-03` — Wiederverwendung als Hintergrundbild der Hero-Bento Zitat-Kachel `.au-hb-quote` (Vroni-Inline-Kommentar: helles ruhiges Stillleben ohne Mensch statt Yoga-Bild). Unter Forest-Overlay, `alt=""`.
  - `2026-06-04` — Verwendungsstatus unverändert: nur in Hero-Bento Zitat-Kachel (`.au-hb-quote`). Während des QA-Sweeps kurz als Mobile-Alternativbild für Sektion 2 erwogen, aber verworfen. Endgültig: `about-notebook-still` bleibt alleinige Quelle für Sektion 2 (Desktop + Mobile via CSS-Crop 5:4).

### about-notebook-still
- **Dateien:** `images/about-notebook-still.png` (1678 KB) · `images/about-notebook-still.webp` (64 KB)
- **Maße:** 869×1086 px (4:5 Hochformat-Crop aus `trust-ehrliche-einschaetzung`)
- **Herkunft:** abgeleitet aus `trust-ehrliche-einschaetzung` (KI, ChatGPT/DALL·E, V. Heidrich) · **Erstellt am:** 2026-06-03 · **Crop:** OffscreenCanvas im Atelier, zentrierter Hochformat-Ausschnitt `290,0 869×1086`, WebP-Quality 0.86
- **Verwendung:** `ueber-mich.html` (Sektion 2 · „Vielleicht kennst du dieses Gefühl" · seit 2026-06-03; ersetzt `about-arbeiten`, das auf Vroni-Wunsch hier weg sollte, weil es dem Hero-Bild thematisch zu ähnlich war und ebenfalls eine Person zeigte)
- **Alt-Text:** „Offenes Notizbuch mit Stift, dampfender Tasse und einer Vase mit Olivenzweig auf dem Holztisch — ruhiger Sortier-Moment im Morgenlicht"
- **Dekorativ:** nein · **KI-Darstellung:** nein (reines Stillleben)
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Quellbild `trust-ehrliche-einschaetzung` wird zusätzlich auf der Startseite verwendet (Trust-Card). Bei Ersetzung der Quelle muss dieser Crop nachgezogen werden.
- **Änderungen:**
  - `2026-06-03` — Ersterfassung (Vroni-Inline-Kommentar: „hier hätte ich gerne ein Bild dass dem im Hero nicht ganz so ähnlich ist, auch mehr mal ohne Mensch").
  - `2026-06-04` — Mobile/Tablet zeigt jetzt dasselbe Bild wie Desktop (kein Bildtausch per `<picture><source media>` mehr). Crop-Variante für Mobile/Tablet via CSS: `aspect-ratio:5/4; object-position:center 62%` (QA-Feinschliff, Iterationsschleife: notebook-still 4:5 → hero-desk 1.5 landscape → desk-detail 1.25 landscape → zurück zu notebook-still 5:4). Learning: War nicht das Bild, sondern der Crop.

### about-hero-desk
- **Dateien:** `images/about-hero-desk.png` (2814 KB) · `images/about-hero-desk.webp` (86 KB)
- **Maße:** 1536×1024 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-03 · **Prompt:** Frau am Holzschreibtisch am Laptop, schreibt im Notizbuch; Vase mit Olivenzweig, Tasse, Buchstapel; warmes Naturlicht durchs Fenster; schwarzer Labrador (Bailey) liegt entspannt auf einem Kissen unter dem Tisch — editorial, ruhig, Arbeitsprozess
- **Verwendung:** *(aktuell nicht eingebunden)* — war Hero-Hauptbild + OG/Twitter-Card der Über-mich-Seite; am 2026-06-03 durch das Bento-Redesign (`about-weg` als Haupt-Kachel) und später durch die Zitat-Kachel ersetzt. OG/Twitter zeigen jetzt ebenfalls auf `about-weg`. Asset bleibt im Repo.
- **Alt-Text:** „Vroni arbeitet am Schreibtisch am Laptop und schreibt im Notizbuch — im warmen Naturlicht, Bailey liegt ruhig unter dem Tisch"
- **Dekorativ:** nein · **KI-Darstellung:** ja (generierte Person + Hund)
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Ersetzt im Hero das vorherige `about-panorama-bailey` (Briefing 2026-06-03: erster Eindruck soll nach Strategie/Arbeit/Klarheit wirken, Hund/Berge nur als kleines Detail). Auch als `og:image` referenziert — bei Austausch beide Stellen prüfen.
- **Änderungen:**
  - `2026-06-03` — Ersterfassung. WebP im Atelier aus PNG erzeugt (OffscreenCanvas, quality 0.82).
  - `2026-06-03` — Aus Hero (Hauptbild und Bento-Kachel) und OG/Twitter-Card von `ueber-mich.html` entfernt; alles auf `about-weg` umgestellt (Vroni-Inline-Kommentar: Bento + Zitat-Kachel).

### about-panorama-bailey
- **Dateien:** `images/about-panorama-bailey.png` (1800 KB) · `images/about-panorama-bailey.webp` (81 KB)
- **Maße:** 1448×1086 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-02 · **Prompt:** Vroni sitzt mit Hund Bailey, Bergpanorama, Sonnenuntergang
- **Verwendung:** `ueber-mich.html` (Claim-Band als Hintergrundbild · seit 2026-06-03; davor 2026-06-02 bis 2026-06-03 als Hero-Hauptbild)
- **Alt-Text (Claim-Band):** `alt=""` — **dekoratives Hintergrundbild** (Claim-Band trägt eigenen Text-Overlay)
- **Dekorativ:** ja (im Claim-Band) · **KI-Darstellung:** ja (generierte Person + Hund)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:**
  - `2026-06-02` — Ersterfassung.
  - `2026-06-03` — Aus Hero von `ueber-mich.html` entfernt, ersetzt durch `about-hero-desk`.
  - `2026-06-03` — Wiederverwendung im Claim-Band von `ueber-mich.html` (ersetzt `about-claim-see`). Vroni-Inline-Kommentar: „Hier hätte ich gerne ein Bild dass dem im Hero nicht ganz so ähnlich ist. EIns auf de ich mit Bailey zu sehen bin. Wir sind draußen und schauen vielleicht in die Ferne."

### about-arbeiten
- **Dateien:** `images/about-arbeiten.png` (1900 KB) · `images/about-arbeiten.webp` (97 KB)
- **Maße:** 1122×1402 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-02 · **Prompt:** Vroni schreibt in Notizbuch am Fenster, Bailey liegt daneben
- **Verwendung:** `index.html` (Hero-Bento, Soft-Grid `.s-brand`, seit 2026-06-02) · `ueber-mich.html` (Kontakt-Avatar `.au-sign-ava`, seit 2026-06-03)
- **Alt-Text (Hero-Bento `.s-brand`):** „Vroni sitzt im Naturlicht am Fenster und schreibt in ihr Notizbuch, Bailey liegt entspannt neben ihr — konzentriertes Arbeiten mit Hund und Bergblick"
- **Alt-Text (über-mich):** „Vroni schreibt in ihr Notizbuch am Fenster, Bailey liegt entspannt daneben"
- **Dekorativ:** nein · **KI-Darstellung:** ja (generierte Person + Hund)
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Wird jetzt an mehreren Stellen verwendet — bei Änderungen am Bild alle Einbindungen prüfen. Langarm-Schnitt + Schreibhaltung verdecken den rechten Arm / das Tattoo (Vroni-Vorgabe für die Hero-Kachel). Als Avatar rund beschnitten (`object-position:center 28–32%`).
- **Änderungen:**
  - `2026-06-02` — Ersterfassung.
  - `2026-06-02` — Zusätzliche Verwendung in `index.html` Hero-Bento `.s-brand` (ersetzt das Querformat `hero-branding`; Vroni-Vorgabe: Bild mit Bailey und Langarm/verdecktem rechtem Arm).
  - `2026-06-03` — Zusätzliche Verwendung als Avatar in der neuen Kurzprofil-Box (`.au-profile-ava`) auf `ueber-mich.html` (Über-mich-Optimierung; kein neues Asset, nur Wiederverwendung).
  - `2026-06-03` — Redesign v2: Kurzprofil-Sektion aus `ueber-mich.html` entfernt; `about-arbeiten` nicht mehr als `.au-profile-ava` verwendet. Weiterhin als Kontakt-Avatar (`.au-sign-ava`).

### about-journal-mat
- **Dateien:** `images/about-journal-mat.png` (1700 KB) · `images/about-journal-mat.webp` (74 KB)
- **Maße:** 1122×1402 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-02 · **Prompt:** Vroni in Yoga-Haltung auf Matte drinnen, schwarzer Labrador liegt daneben
- **Verwendung:** `ueber-mich.html` (Sektion Gefühl + Avatar im Kontaktformular)
- **Alt-Text:** Vroni auf der Yogamatte — Stille und Klarheit als Grundlage für gute Arbeit
- **Dekorativ:** nein · **KI-Darstellung:** ja (generierte Person + Hund)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

### about-brand-essence
- **Dateien:** `images/about-brand-essence.png` (1900 KB) · `images/about-brand-essence.webp` (102 KB)
- **Maße:** 1402×1122 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-02 · **Prompt:** Brand Strategy Workspace, Laptop mit Moodboard und Notizbuch auf Tisch
- **Verwendung:** `zusammenarbeit.html` Claim-Band (Section 5 „Claim Sortieren", typografischer Claim „Was außen trägt, muss innen sortiert sein.") seit 2026-06-07; bis 2026-06-03 in `ueber-mich.html` (Sektion „Wie ich arbeite", Bild 1), durch das Über-mich-Redesign entfernt.
- **Alt-Text:** `alt=""` — dekoratives Claim-Band-Hintergrundbild (der typografische Claim steht als Overlay über dem Bild)
- **Dekorativ:** ja (im Claim-Band-Kontext) · **KI-Darstellung:** ja (generierte Person)
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Iterations-Pfad (3 Runden bis zur finalen Wahl): siehe PROTOKOLL 2026-06-07 Phase 3 Eintrag B.
- **Änderungen:**
  - `2026-06-02` — Ersterfassung.
  - `2026-06-03` — Aus `ueber-mich.html` entfernt (Über-mich-Redesign; Sektion durch Stationskarten + Fachlich-Band ersetzt).
  - `2026-06-07` — Neue Verwendung als Claim-Band-Bild auf `zusammenarbeit.html` (ersetzt `vroni-stille-holzsteg`). Iterations-Pfad: Round 1 outdoor (zitat-weg) → Round 2 stillleben-gedankenraum (Duplikat mit CTA-Panel) → Round 3 about-brand-essence (final, inhaltlich exakt das Seitenthema).

### about-journal-mat
- **Dateien:** `images/about-journal-mat.png` (1700 KB) · `images/about-journal-mat.webp` (74 KB)
- **Maße:** 1122×1402 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-02 · **Prompt:** Vroni in Yoga-Haltung auf Matte drinnen, schwarzer Labrador liegt daneben
- **Verwendung:** *(aktuell nicht eingebunden)* — bis 2026-06-03 in `ueber-mich.html` (Sektion Gefühl + Avatar im Kontaktformular); durch das Über-mich-Redesign 2026-06-03 durch `about-notebook-still` (Gefühl-Sektion) und `about-arbeiten` (Kontakt-Avatar) ersetzt. Datei bleibt im Repo.
- **Alt-Text:** „Vroni auf der Yogamatte — Stille und Klarheit als Grundlage für gute Arbeit"
- **Dekorativ:** nein · **KI-Darstellung:** ja (generierte Person + Hund)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:**
  - `2026-06-02` — Ersterfassung.
  - `2026-06-03` — Aus `ueber-mich.html` entfernt (Über-mich-Redesign; ersetzt durch `about-notebook-still` + `about-arbeiten`).

### about-wireframe
- **Dateien:** `images/about-wireframe.png` (2100 KB) · `images/about-wireframe.webp` (100 KB)
- **Maße:** 1536×1024 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-02 · **Prompt:** Website-Wireframe-Skizze auf Papier mit Laptop, Struktur-Notizen
- **Verwendung:** `ueber-mich.html` (Sektion „Wie ich arbeite", Bild 2)
- **Alt-Text:** Vroni skizziert die Website-Struktur als Wireframe auf Papier — Homepage, Über mich, Angebote und Blog
- **Dekorativ:** nein · **KI-Darstellung:** ja (generierte Hände)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

### about-bewegung-berge
- **Dateien:** `images/about-bewegung-berge.png` (1800 KB) · `images/about-bewegung-berge.webp` (64 KB)
- **Maße:** 1448×1086 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-02 · **Prompt:** Vroni in Yoga-Haltung auf Holzterrasse, Berge im Hintergrund, Bailey daneben
- **Verwendung:** `ueber-mich.html` (Sektion Bewegung & Nervensystem, Bento-Sub-Kachel `.au-mb-sub`)
- **Alt-Text:** Vroni in einer ruhigen Yoga-Haltung auf einer Holzterrasse im Morgenlicht, mit Blick auf die Berge
- **Dekorativ:** nein · **KI-Darstellung:** ja (generierte Person + Hund)
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Reine Bewegung-Sektion-Verwendung.
- **Änderungen:**
  - `2026-06-02` — Ersterfassung.
  - `2026-06-03` — Zusätzliche Verwendung als Hero-Bento Zitat-Kachel auf `ueber-mich.html` (Forest-Overlay + Claim „Sichtbar werden, ohne dich zu verbiegen."; Vroni-Inline-Kommentar: 4. Bento-Kachel als Zitat im Footer-Stil). Kein neues Asset, nur Wiederverwendung.
  - `2026-06-03` — Aus der Hero-Bento Zitat-Kachel wieder entfernt (Vroni-Inline-Kommentar: „kein zweiter Mensch im Hero, nimm ein helles ruhiges Stillleben oder Landschaft"); ersetzt durch `about-desk-detail`. Verwendung in Bewegung-Sektion bleibt.
  - `2026-06-03` — Redesign v2: Einzelbild durch 2er-Bento in der Bewegung-Sektion ersetzt; jetzt untere Sub-Kachel `.au-mb-sub`, kombiniert mit `about-claim-see` als Bento-Paar.

### about-claim-see
- **Dateien:** `images/about-claim-see.png` (1600 KB) · `images/about-claim-see.webp` (87 KB)
- **Maße:** 1916×821 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-02 · **Prompt:** Stiller See bei Morgendämmerung, Holzsteg, Nebel
- **Verwendung:** `ueber-mich.html` (Sektion Bewegung & Nervensystem, Bento-Hauptkachel `.au-mb-main`)
- **Alt-Text:** Ruhiger Bergsee im Morgenlicht, klare Spiegelung im Wasser
- **Dekorativ:** nein · **KI-Darstellung:** nein (Landschaft)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:**
  - `2026-06-02` — Ersterfassung.
  - `2026-06-03` — Redesign v2: Nicht mehr im Claim-Band; jetzt Bewegung-Bento Hauptkachel (`.au-mb-main`) auf `ueber-mich.html`. Alt-Text hinzugefügt, Dekorativ-Status auf „nein" geändert.

### about-persoenlich
- **Dateien:** `images/about-persoenlich.png` (2000 KB) · `images/about-persoenlich.webp` (97 KB)
- **Maße:** 1672×941 px
- **Herkunft:** KI (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-02 · **Prompt:** Vroni spaziert mit Bailey auf Waldpfad im Gegenlicht
- **Verwendung:** `ueber-mich.html` (Hero-Bento Kachel A `.au-hb-a`)
- **Alt-Text:** Vroni privat in Bewegung in der Natur, ruhiges Naturlicht
- **Dekorativ:** nein · **KI-Darstellung:** ja (generierte Person + Hund)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:**
  - `2026-06-02` — Ersterfassung.
  - `2026-06-03` — Zusätzliche Verwendung im Hero-Bento von `ueber-mich.html` (Kachel B `.au-hb-b`, Vroni-Inline-Kommentar: Bento mit 3 Bildern). Kein neues Asset, nur Wiederverwendung.
  - `2026-06-03` — Innerhalb des Hero-Bentos von Kachel B auf Kachel A `.au-hb-a` getauscht (Vroni-Inline-Kommentar: rechte Kachel wird Zitat-Tile mit `about-bewegung-berge`).
  - `2026-06-03` — Redesign v2: Nicht mehr in Sektion Persönlich (ersetzt durch `zitat-weg`); nur noch Hero-Bento Kachel A `.au-hb-a`. MEDIEN-Eintrag korrigiert (war irrtümlich als Kachel B eingetragen, war aber immer Kachel A).

---

## 3b. Bilder für zusammenarbeit.html (v9 · 2026-06-06)

### rfc-mockups/tablet-leinen-bambus
- **Dateien:** `images/rfc-mockups/tablet-leinen-bambus.webp` · `images/rfc-mockups/tablet-leinen-bambus-960.webp` · `images/rfc-mockups/tablet-leinen-bambus.png`
- **Maße:** 1672×941 px (original), 960er-Variante verfügbar
- **Herkunft:** KI-generiertes Editorial-Mockup (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-06
- **Verwendung:** `zusammenarbeit.html` (Hero-Bento Hauptkachel `.au-hb-main`, Preload im Head)
- **Alt-Text:** Tablet mit dem Rote-Faden-Check geöffnet, daneben Workbook-Karten, Brille und Bambuszweig auf Leinen, Querformat-Editorial-Mockup
- **Dekorativ:** nein · **KI-Darstellung:** nein (Objekte/Stilleben)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-06` — Ersterfassung (Handoff v9).

### rfc-mockups/tablet-cafe-olivenzweig
- **Dateien:** `images/rfc-mockups/tablet-cafe-olivenzweig.webp` · `images/rfc-mockups/tablet-cafe-olivenzweig-960.webp` · `images/rfc-mockups/tablet-cafe-olivenzweig.png`
- **Maße:** 1122×1402 px (original), 960er-Variante verfügbar
- **Herkunft:** KI-generiertes Editorial-Mockup (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-06
- **Verwendung:** `zusammenarbeit.html` (RFC-Section Feature-Karte `.za-rfc-cover-img`)
- **Alt-Text:** Rote-Faden-Check als PDF auf einem Tablet, daneben Tasse Kaffee und Olivenzweig auf Holztisch, ruhiger Editorial-Moment
- **Dekorativ:** nein · **KI-Darstellung:** nein (Objekte/Stilleben)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-06` — Ersterfassung (Handoff v9; ersetzt CSS-Cover-Plate aus v5). `2026-06-07` — Verwendung in der RFC-Feature-Box nach der grossen Layout-Iteration (2-Spalter mit Bild rechts, full-stretch auf Spaltenhoehe) wieder bestaetigt.

### rfc-mockups/tablet-ausfuellen-hand
- **Dateien:** `images/rfc-mockups/tablet-ausfuellen-hand.webp` · `images/rfc-mockups/tablet-ausfuellen-hand-960.webp` · `images/rfc-mockups/tablet-ausfuellen-hand.png`
- **Maße:** 1254×1254 px (original, quadratisch), 960er-Variante verfügbar
- **Herkunft:** KI-generiertes Editorial-Mockup (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-06
- **Verwendung:** `zusammenarbeit.html` (RFC-CTA-Panel `.za-rfc-cta-figure`)
- **Alt-Text:** Rote-Faden-Check als PDF auf einem Tablet in der Hand, daneben Keramiktasse und Olivenzweig auf Holzbank im warmen Morgenlicht
- **Dekorativ:** nein · **KI-Darstellung:** ja (Hand als KI-generierte Darstellung, Tablet/Setting Stillleben)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-07` — Ersterfassung. Wird im CTA-Panel als visueller Anker neben dem Download-Button gezeigt. Hand-Framing setzt es bewusst vom RFC-Feature-Bild oben (tablet-cafe-olivenzweig, ruhendes Tablet) ab. `2026-06-07` — Bild-Dateien ins Repo nachgeliefert (waren im Sweep-PR #54 versehentlich nicht mitgenommen worden; PR #55 behebt das).

### rfc-mockups/tablet-bereich-fenster (Reserve)
- **Dateien:** `images/rfc-mockups/tablet-bereich-fenster.webp` · `images/rfc-mockups/tablet-bereich-fenster-960.webp` · `images/rfc-mockups/tablet-bereich-fenster.png`
- **Maße:** 1672×941 px (Querformat)
- **Herkunft:** KI-generiertes Editorial-Mockup (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-06
- **Verwendung:** aktuell **nicht in der Website eingebunden** (Reserve). War in der RFC-Feature-Box-Iteration vom 07.06.2026 zwischenzeitlich aktiv, wurde aber zugunsten des vertikalen `tablet-cafe-olivenzweig` wieder entfernt, weil das vertikale Format in der schmalen rechten Spalte besser sitzt ohne Crop.
- **Alt-Text-Vorlage:** Rote-Faden-Check auf einem Tablet, daneben ausgefüllte Workbook-Seiten und eine Hand, die gerade die nächste Frage beantwortet, warmes Editorial-Setup
- **Dekorativ:** nein · **KI-Darstellung:** ja (Hand als KI-generierte Darstellung)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-07` — Ersterfassung als Reserve nach Test-Einsatz im RFC-Feature.

### vroni-stillleben-buch-curtain
- **Dateien:** `images/vroni-stillleben-buch-curtain.webp` · `images/vroni-stillleben-buch-curtain-960.webp` · `images/vroni-stillleben-buch-curtain.png`
- **Maße:** 1672×941 px
- **Herkunft:** KI-generiertes Stillleben (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-06
- **Verwendung:** `zusammenarbeit.html` (Hero-Bento kleine Kachel `.au-hb-a`)
- **Alt-Text:** Offenes Notizbuch mit gepresstem Blütenzweig, Tasse und Leinen-Tuch auf dem Holztisch im Morgenlicht, ruhiger Sortier-Moment
- **Dekorativ:** nein · **KI-Darstellung:** nein (Objekte/Stilleben)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-06` — Ersterfassung (Handoff v9).

### vroni-stillleben-ruhe-morgenlicht
- **Dateien:** `images/vroni-stillleben-ruhe-morgenlicht.webp` · `images/vroni-stillleben-ruhe-morgenlicht-960.webp` · `images/vroni-stillleben-ruhe-morgenlicht.png`
- **Maße:** 1672×941 px
- **Herkunft:** KI-generiertes Stillleben (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-06
- **Verwendung:** `zusammenarbeit.html` (Hero-Bento Download-Kachel `.au-hb-b.au-hb-quote`, dekorativer Hintergrund mit Overlay)
- **Alt-Text:** (leer — dekoratives Hintergrundbild unter dem Overlay)
- **Dekorativ:** ja (unter Forest-Overlay, Inhalt ist der Kachel-Text)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-06` — Ersterfassung (Handoff v9).

### vroni-journaling-sortieren
- **Dateien:** `images/vroni-journaling-sortieren.webp` · `images/vroni-journaling-sortieren-960.webp` · `images/vroni-journaling-sortieren.png`
- **Maße:** 1200×683 px
- **Herkunft:** KI-generiertes Editorial-Foto (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-06
- **Verwendung:** `zusammenarbeit.html` (Sektion „Vronis Arbeitsweise" `.za-method-head-figure`)
- **Alt-Text:** Person schreibt in ein Notizbuch, daneben Eukalyptuszweig, Tasse und Laptop, ruhiger Sortier-Moment am Schreibtisch
- **Dekorativ:** nein · **KI-Darstellung:** ja (generierte Person/Hände)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-06` — Ersterfassung (Handoff v9, Arbeitsweise-Section).

### vroni-sortieren-haende-moodboard
- **Dateien:** `images/vroni-sortieren-haende-moodboard.webp` · `images/vroni-sortieren-haende-moodboard-960.webp` · `images/vroni-sortieren-haende-moodboard.png`
- **Maße:** 1100×1100 px
- **Herkunft:** KI-generiertes Editorial-Foto (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-06
- **Verwendung:** `zusammenarbeit.html` (Sektion „Sichtbarkeit & Energie" `.za-energy-head-figure`)
- **Alt-Text:** Hände arrangieren Stoff- und Papierproben mit einem Landschaftsfoto auf einem Holztisch, ruhige Materialprobe
- **Dekorativ:** nein · **KI-Darstellung:** ja (generierte Hände)
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-06` — Ersterfassung (Handoff v9, Energie-Section).

### vroni-stille-holzsteg
- **Dateien:** `images/vroni-stille-holzsteg.webp` · `images/vroni-stille-holzsteg-960.webp` · `images/vroni-stille-holzsteg.png`
- **Maße:** 1200×675 px
- **Herkunft:** KI-generierte Landschaft (ChatGPT/DALL·E), V. Heidrich · **Erstellt am:** 2026-06-06
- **Verwendung:** `zusammenarbeit.html` (Claim-Band `.claim-band .cb-img`, dekoratives Hintergrundbild)
- **Alt-Text:** (leer — rein dekoratives Claim-Band-Hintergrundbild)
- **Dekorativ:** ja
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Ersetzt `claim-weg` als Claim-Band-Hintergrund auf der Zusammenarbeit-Seite. `claim-weg` weiterhin auf anderen Seiten nutzbar.
- **Änderungen:** `2026-06-06` — Ersterfassung (Handoff v9; löst `claim-weg` als Claim-Band-Bild auf `zusammenarbeit.html` ab).

---

## 4. Weitere Medien (Nicht-Fotos)

- **Logo/Wortmarke:** `brand/logos/` (SVG/PNG/PDF-Quellen) + `favicon.svg` — Eigenerzeugung InnerLine.
- **Schriften:** lokal in `fonts/` (siehe Font-Regel in `CLAUDE.md`) — keine externe CDN.
- **Icons:** Inline-SVG im Markup (Wellen-Kurve, Monitor, Sparkle, Herz) — Eigenerzeugung.
- (Video/Audio: derzeit keine.)

### PDFs

#### Der_Rote-Faden-Check.pdf

- **Datei:** `brand/Der_Rote-Faden-Check.pdf` (2.86 MB)
- **Herkunft:** Eigenes Workbook von Vroni Heidrich, KI-gestützt erstellt (Layout + Reinschrift)
- **Erstellt:** 2026 (vor Q2)
- **Verwendung:** `zusammenarbeit.html` Hero-Bento-Quote-Tile (Download-Link, `href="brand/Der_Rote-Faden-Check.pdf" download`)
- **Alt-Text:** n/a (Download-Asset, keine Bild-Einbindung)
- **Dekorativ:** nein
- **Rechte:** Vroni Heidrich, intern erstellt, keine Dritt-Lizenz
- **Beachten:** PDF wird beim Klick heruntergeladen, nicht inline geöffnet. Größe (2.86 MB) sollte beobachtet werden — bei künftigen Updates ggf. komprimieren.
- **Änderungen:**
  - 2026-06-06: Erstmals ins Repo committet (war zuvor nur im Atelier, Live-Link lief auf 404).
