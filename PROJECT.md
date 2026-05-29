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
| Projektname       | _(noch nicht definiert)_          |
| Vision            | _(noch nicht definiert)_          |
| Zielgruppe        | _(noch nicht definiert)_          |
| Kernanforderungen | _(noch nicht definiert)_          |
| Erfolgskriterien  | _(noch nicht definiert)_          |
| Deadline          | _(noch nicht definiert)_          |
| Verantwortlich    | team-mt25                         |
| Gestartet         | 2026-05-29                        |

### Was soll dieses Projekt leisten?

_Noch nicht definiert. Wird beim nächsten Gespräch ausgefüllt._

### Was soll es ausdrücklich NICHT leisten?

_Noch nicht definiert._

---

## 2. Aktueller Status

**Phase:** `Initialisierung`
**Gesamtfortschritt:** ▓░░░░░░░░░ 10%

| Meilenstein                     | Status        | Datum      |
|---------------------------------|---------------|------------|
| Entwicklungsumgebung aufsetzen  | ✅ Fertig     | 2026-05-29 |
| Skills installieren             | ✅ Fertig     | 2026-05-29 |
| Wissensdatenbank aufbauen       | ✅ Fertig     | 2026-05-29 |
| Projektziel & Anforderungen     | ⏳ Ausstehend | —          |
| Technologie-Stack entscheiden   | ⏳ Ausstehend | —          |
| Erste Projektstruktur aufbauen  | ⏳ Ausstehend | —          |
| Entwicklung starten             | ⏳ Ausstehend | —          |

### Aktuelle Sprint-Aufgaben

- [ ] Projektziel und Vision definieren
- [ ] Framework-Entscheidung treffen (→ siehe ADR-002)
- [ ] Erste Seite / ersten Prototyp bauen

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
| Framework     | _(offen)_         | —          | Assess   | → ADR-002                               |
| Styling       | _(offen)_         | —          | Assess   | → ADR-002                               |
| Deployment    | _(offen)_         | —          | Assess   | Noch nicht entschieden                  |

---

## 4. Projektstruktur

```
Website/
├── PROJECT.md                          ← Diese Datei (Wissensdatenbank)
├── CLAUDE.md                           ← Claude-Konfiguration & Arbeitsprinzipien
├── skills-lock.json                    ← Installierte Skills (versioniert)
├── .agents/
│   └── skills/
│       └── frontend-design/            ← Frontend-Design-Skill (Anthropic)
│           ├── SKILL.md
│           └── LICENSE.txt
└── .claude/
    └── skills/
        └── ui-ux-pro-max/              ← UI/UX Pro Max Skill
            ├── SKILL.md
            ├── data/                   ← Design-Daten (Farben, Fonts, UX-Regeln)
            └── scripts/                ← Python-Generatoren
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

**Status:** `Proposed` — offen

**Kontext:**
Das Projekt hat noch kein Framework. Entscheidung steht aus bis das Projektziel klar ist.

**Betrachtete Optionen:**

| Option        | Ideal für                          | Pro                                    | Contra                                  |
|---------------|------------------------------------|----------------------------------------|-----------------------------------------|
| Next.js       | Fullstack, SEO-kritisch, komplex   | SSR/SSG, großes Ökosystem, Vercel-Fit  | Größerer Overhead für einfache Sites    |
| Astro         | Content-Sites, Portfolios, Blogs   | Extrem schnell, wenig JS by default    | Weniger dynamisch                       |
| React + Vite  | SPAs, interaktive Apps             | Maximale Flexibilität                  | Kein SSR ohne Zusatzaufwand             |
| Plain HTML/CSS| Landing Pages, einfache Websites   | Zero Dependencies, maximale Kontrolle  | Keine Komponenten-Wiederverwendung      |
| Vue / Nuxt    | Ähnlich React/Next, anderer DX     | Sanftere Lernkurve                     | Kleineres Ökosystem als React           |

**Entscheidung:** _(Ausstehend — wird nach Klärung des Projektziels getroffen)_

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

| # | Frage                              | Denkrichtungen / Optionen                           | Priorität | Deadline  |
|---|------------------------------------|-----------------------------------------------------|-----------|-----------|
| 1 | Was ist das Projektziel?           | Website, App, Landing Page, Portfolio, Shop, ...?   | 🔴 Hoch   | Nächste Session |
| 2 | Welches Framework?                 | Next.js, Astro, React, Plain HTML — je nach Ziel   | 🔴 Hoch   | Nach Frage 1 |
| 3 | Deployment-Ziel?                   | Vercel, Netlify, GitHub Pages, eigener Server       | 🟡 Mittel | Nach Framework |
| 4 | Design-Richtung?                   | Corporate, kreativ, minimalistisch, maximalisch     | 🟡 Mittel | Nach Zieldefinition |
| 5 | Brauchen wir ein CMS?              | Kein CMS / Markdown / Contentful / Sanity / Notion  | 🟢 Niedrig | Nach Frage 1 |

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
_Letzte Aktualisierung: 2026-05-29_
