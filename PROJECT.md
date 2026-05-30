# PROJECT.md — Zentrale Wissensdatenbank

> **Zweck:** Dieses Dokument ist das lebendige Gedächtnis des Projekts.
> Es dokumentiert nicht nur Was und Wie — sondern immer auch Warum, Welche Alternativen es gab, Was funktioniert hat und Was nicht.
> Jede Entscheidung, jede Erkenntnis, jede Denkrichtung wird hier festgehalten.
> Ziel: Mit diesem Wissen jederzeit das bestmögliche Ergebnis erzielen.

---

## Inhaltsverzeichnis

1. [Projektvision & Ziele](#1-projektvision--ziele)
2. [Aktueller Status](#2-aktueller-status)
3. [Technologie-Stack](#3-technologie-stack)
4. [Projektstruktur](#4-projektstruktur)
5. [Architekturentscheidungen (ADRs)](#5-architekturentscheidungen-adrs)
6. [Projektverlauf & Changelog](#6-projektverlauf--changelog)
7. [Learnings & Retrospektiven](#7-learnings--retrospektiven)
8. [Offene Fragen & Abwägungen](#8-offene-fragen--abwägungen)
9. [Bekannte Probleme & Lösungen](#9-bekannte-probleme--lösungen)
10. [Wissen, Konventionen & Muster](#10-wissen-konventionen--muster)
11. [Referenzen & Ressourcen](#11-referenzen--ressourcen)

---

## 1. Projektvision & Ziele

> Der Nordstern: Wofür bauen wir das? Was soll am Ende existieren?

| Feld              | Wert                              |
|-------------------|-----------------------------------|
| Projektname       | Website Veronika Heidrich         |
| Vision            | Professionelle Personal-Website als Yoga-Lehrerin & Coach |
| Zielgruppe        | Interessierte an Yoga / Coaching (Kund:innen von veronika-heidrich.de) |
| Kernanforderungen | Ansprechendes Design, Mobile-First, Kontaktformular, GitHub Pages Hosting |
| Erfolgskriterien  | Responsive auf allen Geräten, professioneller Auftritt, funktionierender Kontaktweg |
| Deadline          | _(laufend)_                       |
| Verantwortlich    | Veronika Heidrich (VroniHei)      |
| Gestartet         | 2026-05-29                        |

### Was soll dieses Projekt leisten?

Eine professionelle persönliche Website für Veronika Heidrich als Yoga-Lehrerin und Coach. Die Seite präsentiert Angebote, weckt Vertrauen durch Stimmen/Testimonials und ermöglicht direkten Kontakt per E-Mail (info@veronika-heidrich.de).

### Was soll es ausdrücklich NICHT leisten?

Kein Online-Shop, kein CMS, keine Backend-Logik — bewusst schlank gehalten (Plain HTML/CSS/JS + GitHub Pages).

---

## 2. Aktueller Status

**Phase:** `Aktive Entwicklung / Feinschliff`
**Gesamtfortschritt:** ▓▓▓▓▓▓▓░░░ 70%

| Meilenstein                     | Status        | Datum      |
|---------------------------------|---------------|------------|
| Entwicklungsumgebung aufsetzen  | ✅ Fertig     | 2026-05-29 |
| Skills installieren             | ✅ Fertig     | 2026-05-29 |
| Wissensdatenbank aufbauen       | ✅ Fertig     | 2026-05-29 |
| Projektziel & Anforderungen     | ✅ Fertig     | 2026-05-29 |
| Technologie-Stack entscheiden   | ✅ Fertig     | 2026-05-29 |
| Website-Grundstruktur (HTML/CSS)| ✅ Fertig     | 2026-05-29 |
| Kontaktformular (mailto)        | ✅ Fertig     | 2026-05-29 |
| Hero-Blur-Hintergrundanimation  | ✅ Fertig     | 2026-05-29 |
| Mobile-Optimierung              | ✅ Fertig     | 2026-05-29 |
| Voices-Swipe-Slider (mobil)     | ✅ Fertig     | 2026-05-29 |
| Deployment auf GitHub Pages     | ✅ Fertig     | 2026-05-29 |
| Letzter Feinschliff / QA        | ⏳ Ausstehend | —          |

### Aktuelle Sprint-Aufgaben

- [ ] Abschließende QA auf verschiedenen Geräten / Browsern
- [ ] Ggf. SEO-Meta-Tags prüfen

---

## 3. Technologie-Stack

> Status-Legende (nach ThoughtWorks Tech Radar Methode):
> - **Adopt** — Bewährt, einsetzen
> - **Trial** — Vielversprechend, ausprobieren
> - **Assess** — Beobachten, noch nicht einsetzen
> - **Hold** — Vorerst nicht nutzen

| Bereich       | Technologie       | Version    | Status   | Begründung                              |
|---------------|-------------------|------------|----------|-----------------------------------------|
| Runtime       | Node.js (nvm)     | v24.16.0   | Adopt    | Stabil, LTS, via nvm flexibel verwaltbar |
| Package Mgr   | npm               | 11.13.0    | Adopt    | Standard, mit Node.js mitgeliefert      |
| Framework     | Plain HTML/CSS/JS | —          | Adopt    | Kein Framework nötig für statische Personal-Site → ADR-002 |
| Styling       | Plain CSS         | —          | Adopt    | Volle Kontrolle, keine Build-Pipeline nötig |
| Deployment    | GitHub Pages      | —          | Adopt    | Kostenlos, einfach, direkt via `gh-pages` Branch |
| Kontakt       | mailto-Link       | —          | Adopt    | Serverlos — Kontaktformular öffnet Mail-Client (info@veronika-heidrich.de) |

---

## 4. Projektstruktur

```
Website/
├── index.html                          ← Haupt-HTML-Datei (One-Page-Website)
├── style.css                           ← Alle Styles inkl. Mobile-Responsive-Rules
├── script.js                           ← Interaktivität (Slider, Menü, Blur-Anim.)
├── image-slot.js                       ← Bild-Slot-Verwaltung
├── PROJECT.md                          ← Diese Datei (Wissensdatenbank)
├── CLAUDE.md                           ← Claude-Konfiguration & Arbeitsprinzipien
├── README.md                           ← Projektbeschreibung
├── skills-lock.json                    ← Installierte Skills (versioniert)
├── Screenshots Arbeitsdateien/         ← Design-Referenzmaterial
├── .agents/
│   └── skills/
│       └── frontend-design/            ← Frontend-Design-Skill (Anthropic)
└── .claude/
    └── skills/
        └── ui-ux-pro-max/              ← UI/UX Pro Max Skill
```

_Wird bei jeder Strukturänderung aktualisiert._

---

## 5. Architekturentscheidungen (ADRs)

> Jede wichtige Entscheidung wird hier festgehalten — mit Kontext, Optionen, Abwägung und Konsequenzen.
> ADRs werden **nie gelöscht**, nur als `Superseded` markiert und durch neue ersetzt.
> Format basiert auf dem Standard von Michael Nygard (empfohlen von AWS, Google, Microsoft).

---

### ADR-001 — Node.js via nvm installieren

**Status:** `Accepted` — 2026-05-29

**Kontext:**
`npx` war nicht verfügbar. Node.js musste installiert werden. Mehrere Installationswege standen zur Auswahl.

**Betrachtete Optionen:**

| Option               | Pro                                      | Contra                                      |
|----------------------|------------------------------------------|---------------------------------------------|
| nvm (gewählt)        | Versionswechsel einfach, kein sudo nötig | Manuelle PATH-Konfiguration in `.zshrc`     |
| Homebrew + Node      | Einfache Installation                    | Homebrew nicht installiert, extra Schritt   |
| Direktinstallation   | Simpel                                   | Keine Versionsverwaltung, schwer zu updaten |
| Volta                | Automatisches Versions-Switching         | Weniger verbreitet, extra Tool              |

**Entscheidung:**
nvm v0.39.7 + Node.js v24.16.0 (LTS)

**Konsequenzen:**
- ✅ Flexibel: Jederzeit andere Node-Version aktivierbar
- ✅ Kein Root-Zugriff nötig
- ⚠️ Jede neue Shell-Session braucht nvm im PATH (gelöst via `.zshrc`)
- ⚠️ Neue Terminal-Sessions müssen einmal neu gestartet werden nach Installation

---

### ADR-002 — Framework-Entscheidung

**Status:** `Accepted` — 2026-05-29

**Kontext:**
Die Website ist eine Personal-Site für eine Yoga-Lehrerin. Keine komplexe Daten-Logik, kein CMS, keine dynamischen Routen. Die Entscheidung fiel früh auf das einfachste mögliche Setup.

**Betrachtete Optionen:**

| Option        | Ideal für                          | Pro                                    | Contra                                  |
|---------------|------------------------------------|----------------------------------------|-----------------------------------------|
| Next.js       | Fullstack, SEO-kritisch, komplex   | SSR/SSG, großes Ökosystem, Vercel-Fit  | Größerer Overhead für eine einfache Site |
| Astro         | Content-Sites, Portfolios, Blogs   | Extrem schnell, wenig JS by default    | Noch ein Build-Tool für eine HTML-Seite |
| React + Vite  | SPAs, interaktive Apps             | Maximale Flexibilität                  | Zu viel Overhead, keine SSR nötig      |
| **Plain HTML/CSS** | Landing Pages, Personal Sites | Zero Dependencies, maximale Kontrolle, direkt auf GitHub Pages deployen | Keine Komponenten-Wiederverwendung |
| Vue / Nuxt    | Ähnlich React/Next, anderer DX     | Sanftere Lernkurve                     | Kleineres Ökosystem als React           |

**Entscheidung:** Plain HTML + CSS + Vanilla JS. Die Seite ist eine One-Page-Website ohne Backend-Anforderungen. Jedes Framework wäre Over-Engineering.

**Konsequenzen:**
- ✅ Zero Dependencies, kein Build-Step, kein Node-Server nötig
- ✅ Direkt auf GitHub Pages deploybar (statische Dateien)
- ✅ Maximale Kontrolle über jeden CSS-Pixel
- ⚠️ Kein Komponenten-System — CSS und JS manuell strukturieren

---

### ADR-003 — Skills als Design-Intelligenz

**Status:** `Accepted` — 2026-05-29

**Kontext:**
Für professionelle UI/UX-Ergebnisse braucht Claude strukturiertes Design-Wissen. Zwei Skills wurden evaluiert.

**Betrachtete Optionen:**

| Option                     | Pro                                           | Contra                              |
|---------------------------|-----------------------------------------------|-------------------------------------|
| frontend-design (Anthropic) | Etabliert, starke ästhetische Prinzipien    | Weniger datengetrieben              |
| ui-ux-pro-max              | 161 Regeln, 67 Styles, 15 Stacks, Datenbank  | Drittanbieter, neueres Tool         |
| Kein Skill                 | Keine Abhängigkeit                            | Generischere Ergebnisse             |

**Entscheidung:**
Beide Skills installiert. Sie ergänzen sich: `frontend-design` für kreative Richtung, `ui-ux-pro-max` für datenbasierte Design-Systeme.

**Konsequenzen:**
- ✅ Maximale Design-Intelligenz durch Kombination
- ✅ 161 Industry-Reasoning-Regeln, 161 Farbpaletten, 57 Schriftpaarungen verfügbar
- ⚠️ Python 3.x Abhängigkeit für `ui-ux-pro-max` Scripts (vorhanden: Python 3.9.6)

---

_Neue ADRs werden mit aufsteigender Nummer hinzugefügt._

---

## 6. Projektverlauf & Changelog

> Chronologisches Log aller relevanten Ereignisse. Append-only — nichts wird gelöscht.

---

### 2026-05-29 — Session 1: Umgebung aufsetzen

**Ziel der Session:** Entwicklungsumgebung einrichten, Skills installieren, Wissensbasis aufbauen.

**Durchgeführt:**
1. Problem `npx: command not found` diagnostiziert → Node.js nicht installiert
2. nvm v0.39.7 via curl installiert
3. `.zshrc` mit nvm-Initialisierung angelegt
4. Node.js v24.16.0 (LTS) + npm 11.13.0 + npx installiert
5. `uipro-cli` global installiert (`npm install -g uipro-cli`)
6. Skill `ui-ux-pro-max` installiert (`uipro init --ai claude`)
7. Skill `frontend-design` war bereits vorhanden
8. `CLAUDE.md` erstellt — Claude liest `PROJECT.md` automatisch
9. `PROJECT.md` v1 erstellt — grundlegende Struktur
10. `PROJECT.md` v2 erstellt — erweitert um ADRs, Learnings, Retrospektiven (dieses Dokument)

---

### 2026-05-29 — Session 2: Mobile-Optimierung (3 Commits, direkt auf GitHub gepushed)

**Ziel der Session:** Responsive-Probleme in der mobilen Ansicht beheben.

**Commit 1 — `9acad10`: Fix mobile navigation and layout issues**
- CTA-Button in `nav-right` auf Mobile ausgeblendet → Burger-Menü bleibt sichtbar
- Brand-Schriftgröße auf 17 px reduziert (Overflow auf kleinen Screens verhindert)
- Pain-List: Cards auf Mobilgeräten in eine Spalte gestapelt
- Abstände reduziert: `yoga-card`, `big-panel`, Formular-Padding auf Mobile angepasst
- Hero-Top-Padding und `nav-inner`-Padding für Mobile justiert
- **Dateien:** `style.css` (+9 Zeilen, −1)

**Commit 2 — `67dfce9`: Fix mobile menu button + add voices swipe slider**
- Mobile-Menü-CTA: Spezifitätsproblem gelöst (`.mobile-menu a` überschrieb `.btn`) → dunkler Ink-Hintergrund gesetzt
- Voices-Bereich: horizontaler Snap-Scroll-Slider auf Mobile mit Dot-Navigation
- Dots sind klickbar und springen direkt zum jeweiligen Slide
- **Dateien:** `style.css` (+9 Zeilen, −2), `script.js` (+29 Zeilen)

**Commit 3 — `7e76f25`: Improve mobile layout: horizontal icon+text rows for steps, nodes, pain**
- Steps: Nummernkreis links (52 px), Titel + Beschreibung rechts gestapelt
- „Das große Ganze"-Nodes: Icon links, Titel + Beschreibung rechts
- Pain-Items: Icon links, Text rechts (konsistentes Row-Pattern)
- Desktop-Layout vollständig unverändert — alle Regeln auf `max-width: 560px` begrenzt
- **Dateien:** `style.css` (+12 Zeilen)

---

## 7. Learnings & Retrospektiven

> Das Herzstück der Wissensdatenbank. Hier wächst das "wie wir arbeiten" über Zeit.
> Format: Was hat funktioniert? Was nicht? Was würden wir anders machen? Welche Erkenntnisse haben wir gewonnen?

---

### Retrospektive 1 — 2026-05-29 (Session 1)

#### ✅ Was hat funktioniert

- **nvm-Installation via curl** — reibungslos, schnell, keine Abhängigkeiten nötig
- **uipro-cli** — installiert ohne Fehler, hat sofort die richtige Zielstruktur (`.claude/skills/`) erkannt
- **Kombination beider Skills** — `frontend-design` + `ui-ux-pro-max` deckt kreative und datengetriebene Design-Intelligenz ab

#### ❌ Was nicht funktioniert hat / Stolpersteine

- **Homebrew nicht vorhanden** — Annahme dass Homebrew installiert ist war falsch. Auf frischen Macs ist es nicht automatisch dabei → immer zuerst prüfen
- **nvm findet kein `.zshrc`** — Auf einem frischen System ohne `.zshrc` muss die Datei erst angelegt werden. nvm's install.sh warnt davor aber macht es nicht automatisch
- **PATH nicht sofort aktiv** — Nach nvm-Installation muss das Terminal neu gestartet werden. Im gleichen Terminal-Prozess muss nvm manuell geladen werden (`source ~/.zshrc` oder Export-Befehl)

#### 💡 Erkenntnisse & Einsichten

- **Systemzustand immer zuerst prüfen** — Vor dem Installieren von Tools: `which node`, `which brew`, `which npx` ausführen. Spart Umwege.
- **Frische macOS-Umgebungen haben wenig vorinstalliert** — Kein Node, kein Homebrew, manchmal kein `.zshrc`. Immer von Null ausgehen.
- **nvm > direkte Installation** — Für jedes Entwicklungsprojekt lohnt sich nvm. Der Overhead von ~2 Minuten zahlt sich aus sobald Node-Versionen unterschiedlich sind.

#### 🔁 Was wir beim nächsten Mal anders machen würden

- Zu Beginn einer Session immer einen "Environment Check" durchführen: Node? Python? Git? Homebrew?
- `.zshrc` Existenz prüfen bevor nvm installiert wird

---

_Neue Retrospektiven werden nach jeder bedeutenden Session oder am Ende eines Meilensteins hinzugefügt._

---

## 8. Offene Fragen & Abwägungen

> Dinge die noch nicht entschieden sind, aber durchdacht werden müssen. Mit allen Denkrichtungen.

| # | Frage                              | Denkrichtungen / Optionen                           | Priorität | Status    |
|---|------------------------------------|-----------------------------------------------------|-----------|-----------|
| 1 | Was ist das Projektziel?           | Personal-Website Yoga-Lehrerin Veronika Heidrich    | 🔴 Hoch   | ✅ Geklärt |
| 2 | Welches Framework?                 | Plain HTML/CSS/JS — → ADR-002                       | 🔴 Hoch   | ✅ Geklärt |
| 3 | Deployment-Ziel?                   | GitHub Pages (Branch `gh-pages`)                   | 🟡 Mittel | ✅ Geklärt |
| 4 | Design-Richtung?                   | Ruhig, professionell, warm — passend zu Yoga/Coaching | 🟡 Mittel | ✅ Umgesetzt |
| 5 | Brauchen wir ein CMS?              | Nein — statisch, direkt im HTML pflegbar            | 🟢 Niedrig | ✅ Geklärt |
| 6 | SEO-Meta-Tags vollständig?         | title, description, og:* Tags prüfen               | 🟡 Mittel | ⏳ Offen  |

---

## 9. Bekannte Probleme & Lösungen

| # | Problem                          | Ursache                         | Lösung                                                    | Status    | Datum      |
|---|----------------------------------|---------------------------------|-----------------------------------------------------------|-----------|------------|
| 1 | `npx: command not found`         | Node.js nicht installiert       | nvm + Node.js v24.16.0 installiert                        | ✅ Behoben | 2026-05-29 |
| 2 | nvm warnt: kein Profil gefunden  | `.zshrc` nicht vorhanden        | `.zshrc` angelegt, nvm-Export eingetragen                 | ✅ Behoben | 2026-05-29 |
| 3 | nvm nach Install nicht aktiv     | Shell neu starten nötig         | `export NVM_DIR...` manuell ausführen oder Terminal neu  | ✅ Behoben | 2026-05-29 |

---

## 10. Wissen, Konventionen & Muster

> Alles was nicht offensichtlich ist. Implizites Wissen explizit machen.

### Umgebung

- **nvm aktivieren (in Skripten/Claude):**
  ```bash
  export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  ```
- **Node-Version prüfen:** `node --version` → sollte `v24.16.0` zeigen
- **Neue Terminal-Session:** nvm wird automatisch via `.zshrc` geladen

### Skills

- **Installierte Skills** werden in `skills-lock.json` versioniert
- **frontend-design:** Für kreative, unverwechselbare UI-Richtung
- **ui-ux-pro-max:** Für datenbasierte Design-Systeme (Farben, Fonts, UX-Regeln)
- **Skills updaten:** `uipro update`
- **Skill deinstallieren:** `uipro uninstall`

### Arbeitsweise mit Claude

- Claude liest `PROJECT.md` zu Beginn jeder Session
- Claude aktualisiert `PROJECT.md` nach jeder relevanten Änderung
- Bei neuen Entscheidungen: ADR anlegen (ADR-XXX Muster verwenden)
- Bei Problemen: Lösung in Sektion 9 dokumentieren
- Bei Erkenntnissen: Retrospektive in Sektion 7 ergänzen

---

## 11. Referenzen & Ressourcen

### Projekt-Tools & Skills

| Ressource              | Pfad / URL                                              |
|------------------------|---------------------------------------------------------|
| frontend-design Skill  | `.agents/skills/frontend-design/SKILL.md`               |
| ui-ux-pro-max Skill    | `.claude/skills/ui-ux-pro-max/SKILL.md`                 |
| ui-ux-pro-max GitHub   | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| nvm                    | https://github.com/nvm-sh/nvm                           |

### Methodik & Best Practices

| Methode                        | Quelle                                     |
|--------------------------------|--------------------------------------------|
| ADR (Architecture Decision Records) | Michael Nygard — martinfowler.com     |
| ADR Best Practices             | AWS Architecture Blog                      |
| Lessons Learned Framework      | PMI Knowledge Management                   |
| Tech Radar Methode             | ThoughtWorks Technology Radar              |
| Living Documentation           | Cyrille Martraire                          |
| Retrospektiven (Start/Stop/Continue) | Agile Alliance                       |

---

_Dieses Dokument ist lebendig — es wächst mit dem Projekt._
_Jede Session hinterlässt Spuren. Jede Entscheidung wird begründet. Jedes Learning wird gesichert._
_Letzte Aktualisierung: 2026-05-30_
