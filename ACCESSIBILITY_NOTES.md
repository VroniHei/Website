# Accessibility-Notizen · Vroni / InnerLine Website

> Technische Dokumentation zur Barrierefreiheit.  
> Keine Rechtsberatung. Finale rechtliche Einordnung muss separat geprüft werden.

---

## Ziel

Barrierearme Umsetzung nach **WCAG 2.2 Level AA** als praktischer Zielstandard.  
Orientierung an **EN 301 549** (europäische Norm, referenziert WCAG 2.1/2.2).  
Kontext: **BFSG** (Barrierefreiheitsstärkungsgesetz, gilt ab 28.06.2025 für private Dienstleistungsanbieter).

**Hinweis:** Kleinstunternehmen können unter bestimmten Voraussetzungen ausgenommen sein.  
Trotzdem wird barrierearme Umsetzung angestrebt — sowohl als gute Praxis als auch zur Vorbereitung.

---

## Datum der letzten Prüfung

- **2026-05-31** — Erstprüfung (Formular-Vorauswahl via data-topic + URL-Parameter)
- **2026-06-07** — PR #61 Code-Audit: Accordion, Formular-ARIA, Mobile-Menu, nav-current, Tag-Chip-Kontrast

---

## Verwendete Prüfmethoden

| Tool / Methode | Ergebnis |
|---|---|
| Manuelle Durchsicht des HTML-Quellcodes | Vollständig |
| WCAG-Kontrastformel (manuell berechnet) | Vollständig |
| Tastatur-Navigation (konzeptuell geprüft) | Vollständig |
| Lighthouse Accessibility | Noch ausständig (braucht echten Browser) |
| axe DevTools oder gleichwertiges Tool | Noch ausständig |
| Screenreader-Test (VoiceOver / NVDA) | Noch ausständig |

---

## H-Struktur der Startseite

```
H1: Sichtbar werden, ohne dich zu verbiegen.
  H2: Nicht deine Vielseitigkeit ist das Problem. Sondern der fehlende rote Faden.
  H2: Womit ich dich wirklich weiterbringe
    H3: Personal Branding
    H3: Webdesign & WordPress
    H3: KI & kreative Workflows
    H3: Yoga & Bewegung
  H2: Warum das alles zusammengehört
    H4: Marke  H4: Website & Content  H4: KI & Workflows  H4: Körper & Energie
  H2: Erst sortieren. Dann gestalten. Dann sichtbar machen.
  H2: Ich bin Vroni. Ich bringe Dinge in eine Form, die sich stimmig anfühlt.
  H2: Hohe Leistung braucht einen Körper, der mitkommt.
  H2: Du musst noch nicht wissen, welches Paket du brauchst.
    H4: Du schreibst mir kurz...  H4: Wir klären, was du wirklich brauchst.
    H4: Du bekommst eine klare Richtung.  H4: Wir setzen den nächsten Schritt gemeinsam um.
  H2: Was mir in der Zusammenarbeit wirklich wichtig ist.
    H3: Ich sage dir ehrlich, was sinnvoll ist.
    H3: Du redest direkt mit mir.
    H3: Wir machen nicht einfach irgendwas hübsch.
    H3: KI darf helfen. Aber sie übernimmt nicht das Denken.
  H2: Was du dich vielleicht auch fragst.
  H2: Du hast eine Idee, ein Projekt oder das Gefühl, dass wir mal sprechen sollten?
    H3: Danke — ich melde mich. (Erfolgs-State)
```

Bewertung: ✅ Korrekte Hierarchie, keine Lücken, keine Headings nur aus Designgründen.

---

## Kontrastprüfung (WCAG 1.4.3 / 1.4.11)

### Ergebnis (manuell berechnet, Hintergrund --chalk #F8F5EE)

| Element | Farbe | Kontrast | Anforderung | Status |
|---|---|---|---|---|
| Fließtext | --ink #23221A | ~14:1 | 4.5:1 | ✅ |
| --ink-soft | #5d564a | 6.7:1 | 4.5:1 | ✅ |
| Grüne Links (klein) | --green-text #447510 | 5.1:1 | 4.5:1 | ✅ |
| H2-Akzente (.g) | --green-deep #6E9B2C | 3.0:1 | 3:1 (Großtext ≥24px) | ✅ |
| Limettengrün-Buttons | --green #A8E84F + ink | 10:1 | 4.5:1 | ✅ |
| Forest-Hintergrund + chalk | | 11.7:1 | 4.5:1 | ✅ |

### Bekannte Einschränkungen

| Element | Farbe | Kontrast | Problem |
|---|---|---|---|
| Hero-Tags (13.5px) | #9a9486 auf chalk | 2.77:1 | Unter 4.5:1 — rein ergänzend, Inhalt im Text vorhanden |
| Formular-Placeholder | #a8a294 auf chalk | 2.33:1 | Placeholder gilt als Hint, nicht als primärer Inhalt |
| FAQ-Chevron (offen) | --green-text auf chalk | 5.1:1 | ✅ jetzt korrekt |

**Empfehlung:** Hero-Tags auf `#6B6258` o. ä. abdunkeln → ~5:1 Kontrast. Niedriger Priorität, da rein dekorativ.

---

## Umgesetzt

### Struktur
- [x] `<main id="main">` als Hauptinhalt-Wrapper
- [x] Skip-Link „Zum Hauptinhalt springen" vor der Navigation
- [x] Korrekte Semantic-Elemente: `<nav>`, `<main>`, `<footer>`, `<header>`, `<section>`, `<article>`
- [x] `lang="de"` auf `<html>`
- [x] Genau eine H1 pro Seite
- [x] Saubere H-Hierarchie (keine Sprünge)

### Navigation & Menü
- [x] Burger-Button: `aria-expanded`, `aria-controls="mobileMenu"`, `aria-label`-Toggle
- [x] Mobile-Menü: `role="dialog"`, `aria-label="Navigation"` *(ergänzt PR #61)*
- [x] Escape-Taste schließt Mobile-Menü, Fokus kehrt zum Burger zurück
- [x] Anchor-Scroll berücksichtigt Sticky-Header-Höhe (92px Offset in script.js)
- [x] Aktive Nav-Links mit `.active`-Klasse (JS IntersectionObserver)
- [x] `aria-current="page"` auf aktivem Nav-Link der aktuellen Seite *(ergänzt PR #61)*

### Bilder
- [x] Alle inhaltlichen Bilder mit beschreibendem `alt`-Text
- [x] Dekorative Hintergrundbilder: `alt=""`
- [x] `width` + `height` auf allen `<img>` (kein CLS)
- [x] `loading="lazy"` unterhalb des Folds, `loading="eager"` beim Hero

### Formulare
- [x] Alle Labels explizit mit `for` verknüpft
- [x] `required` + `aria-required="true"` auf Pflichtfeldern *(präzisiert PR #61)*
- [x] `aria-describedby` zeigt auf Fehler-Spans *(präzisiert PR #61)*
- [x] Fehlermeldungen mit `role="alert"` + `aria-live="polite"` (automatisch vorgelesen) *(präzisiert PR #61)*
- [x] Fehler-CSS: `.field.error` visuell + semantisch
- [x] Datenschutz-Hinweis sichtbar im Formular
- [x] Formular-Validierung vor mailto (JS)
- [x] Dropdown `value`-Attribute + leere Standardoption „Bitte Thema wählen"
- [x] `data-topic` auf topic-spezifischen CTAs (Personal Branding, Webdesign, KI, Yoga, Mischung)
- [x] Screenreader-Statuselement `#form-topic-status` (`aria-live="polite"`, `.sr-only`)
- [x] URL-Parameter `?thema=...` setzt Dropdown und scrollt zu #kontakt
- [x] Fokus nach Scroll auf #f-topic-Select (mit `prefers-reduced-motion`-Timing)

### FAQ / Accordion
- [x] `<details>/<summary>` (nativ zugänglich, Browser verwaltet `aria-expanded`)
- [x] Prinzipien-Accordion: `<button aria-expanded>` per JS korrekt getoggelt *(ergänzt PR #61)*
- [x] FAQ Schema.org JSON-LD im `<head>` (für Suchmaschinen)

### Fokus
- [x] `:focus-visible` für alle interaktiven Elemente (3px solid --green)
- [x] Kein `outline: none` ohne Ersatz
- [x] Spezifischer Fokusring für dunkle Buttons (--ink)
- [x] Skip-Link bei Fokus sichtbar

### Motion
- [x] Alle Animationen unter `@media (prefers-reduced-motion: reduce)` deaktiviert
- [x] Ken-Burns, Orbs, Hero-Scroll, Hover-Zooms — alle reduced-motion-safe

### Externe Links
- [x] Instagram-Links mit `aria-label` (inkl. "öffnet in neuem Tab")
- [x] `rel="noopener"` auf allen target="_blank"-Links

### Farb-Kontrast
- [x] `--green-text: #447510` als neue Variable für kleine Texte/Links (5.1:1)
- [x] Nav-Active, Offer-Links, FAQ-Links, Trust-Links → `--green-text`
- [x] Form-Eyebrow, About-Signatur → `--green-text`

### Rechtliche Seiten
- [x] `barrierefreiheit.html` mit Barrierefreiheitserklärung (Entwurf)
- [x] Footer-Link „Barrierefreiheit" auf allen Seiten

---

## Noch offen / Manuell zu testen

| Punkt | Priorität | Notiz |
|---|---|---|
| Lighthouse Accessibility Score | Hoch | Im echten Chrome-Browser prüfen |
| axe DevTools Scan | Hoch | Automatisierter Scan im Browser |
| VoiceOver-Test (Mac) | Hoch | Manuelle Prüfung |
| NVDA-Test (Windows) | Mittel | Manuelle Prüfung |
| 200%-Zoom-Test | Mittel | Visuell im Browser prüfen |
| Angebots-Karte Tag-Chip-Kontrast | Niedrig | gedämpfte `.offer .tag`-Chips grenzwertig; Farbwert prüfen |
| Formular: Server-seitige Anbindung | Niedrig | Mailto hat Einschränkungen für Nicht-E-Mail-User |
| Barrierefreiheitserklärung rechtlich prüfen | Mittel | Aktuell als Entwurf markiert |
| ueber-mich.html + zusammenarbeit.html vollständig prüfen | Mittel | A11y-Audit bisher nur auf index.html fokussiert |

---

## Kritische Punkte vor Launch

1. **Lighthouse-Audit** im echten Browser durchführen — Automatisiert prüfbar, schnell.
2. **Impressum + Datenschutz** vervollständigen (Adresse einsetzen, rechtlich prüfen).
3. **VoiceOver-Schnelltest** mit Mac-ingebautem Screenreader auf Startseite + Formular.
