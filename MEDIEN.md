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
- **Verwendung:** `index.html` (Hero-Bento, Soft-Grid)
- **Alt-Text:** „Branding-Stillleben: aufgeschlagenes Moodboard mit Materialkarten und Farbflächen im warmen Licht"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

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
- **Verwendung:** `index.html` (Über mich)
- **Alt-Text:** „Ein gewundener Bergpfad im Abendlicht, dem ein feiner roter Faden folgt — Sinnbild für Bewegung und den roten Faden"
- **Dekorativ:** nein
- **Rechte:** siehe Abschnitt 1
- **Beachten:** Größte WebP-Variante (249 KB) — Optimierungskandidat im Performance-Schritt.
- **Änderungen:** `2026-06-02` — Ersterfassung.

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
- **Verwendung:** `index.html` (Zitat-Band, Hintergrund)
- **Alt-Text:** `alt=""` — **dekoratives Hintergrundbild** (bewusst leer, A11y-Invariante)
- **Dekorativ:** **ja**
- **Rechte:** siehe Abschnitt 1
- **Änderungen:** `2026-06-02` — Ersterfassung.

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

---

## 4. Weitere Medien (Nicht-Fotos)

- **Logo/Wortmarke:** `brand/logos/` (SVG/PNG/PDF-Quellen) + `favicon.svg` — Eigenerzeugung InnerLine.
- **Schriften:** lokal in `fonts/` (siehe Font-Regel in `CLAUDE.md`) — keine externe CDN.
- **Icons:** Inline-SVG im Markup (Wellen-Kurve, Monitor, Sparkle, Herz) — Eigenerzeugung.
- (Video/Audio: derzeit keine.)
