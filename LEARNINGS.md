# LEARNINGS — Destillat aus dem Projektverlauf

> Lebende Datei — wird nach jeder Runde geprüft und bei echten Überraschungen ergänzt.
> Nur nicht-offensichtliche Erkenntnisse die konkret etwas ändern. Offensichtliches braucht keinen Eintrag.
> Vollständige Begründungen: **`PROTOKOLL.md`** (append-only Historie).
> Anleitung zum aktiven Nutzen: **`/learnings-review`** — prüft ob wir etwas ändern sollten.

---

## L-01 — Curly-Quote-Korruption macht Sections unsichtbar (HTML-Parser)

**Was:** Typografische Anführungszeichen `"` `"` (U+201C/D) als HTML-Attribut-Delimiter lassen den Browser-Parser den Tag als Text behandeln — die gesamte Section fehlt im DOM ohne Fehlermeldung.

**Warum nicht-offensichtlich:** Im Editor sehen die Anführungszeichen identisch aus. Auch einfaches `diff` zeigt keinen Inhaltsfehler. Browser zeigen keine Konsolenwarnung.

**Wie erkannt:** Byte-Analyse (`python3`, `\xe2\x80\x9c`). DOM-Inspektion: Element fehlte komplett im devtools-Tree.

**Diagnose-Kurzregel:** Section leer + kein JS-Fehler → zuerst: Existiert das Element im DOM? (devtools Elements → ID suchen). Fehlt es → Parser-Problem, nicht CSS/JS.

**Vorbeugen:** `/encoding-check` nach jedem Design-Handoff. Quelle: PROTOKOLL 2026-06-07 (PR #59/#60).

---

## L-02 — CI-Abdeckung muss mit jeder neuen HTML-Datei wachsen

**Was:** HTML-validate und link-check liefen nur auf 5 von 9 HTML-Dateien. Fehler auf den anderen 4 wären unbemerkt auf main gelandet.

**Warum nicht-offensichtlich:** Der CI-Job schlägt nicht fehl wenn eine Datei fehlt — er läuft einfach ohne sie. Keine Warnung.

**Regel:** Jede neue `.html`-Datei → sofort in denselben PR: `html-validate`-Zeile in `.github/workflows/ci.yml` ergänzen (und link-check, außer bei noindex). Command `/neue-seite` macht das automatisch.

**Quelle:** PROTOKOLL 2026-06-14 (PR #68, Audit-Befund).

---

## L-03 — `@keyframes`-Namen sind global über alle geladenen Stylesheets

**Was:** `ueber-mich.css` hatte `@keyframes hbDrift` — identisch mit dem Namen in `style.css`. Auf Seiten die beide laden, überschrieb die Unter-Seite die globale Animation (−9px → −4px Drift-Amplitude).

**Warum nicht-offensichtlich:** Kein Compile-Error, kein Linter-Hinweis. Visuell nur mit direktem Vergleich sichtbar.

**Regel:** Seiten-spezifische Animationen immer mit Seiten-Präfix benennen (`auHbDrift` für ueber-mich, `zaXyz` für zusammenarbeit). Quelle: PROTOKOLL 2026-06-07 (Audit PR #57).

---

## L-04 — Script-Ladereihenfolge ist eine Invariante

**Was:** `script.js` muss vor `count.js` (GoatCounter) geladen werden — ohne `defer`, mit `async` auf count.js. Einmal war die Reihenfolge auf einer Unterseite umgekehrt; bei einer anderen war `defer` auf script.js.

**Warum nicht-offensichtlich:** Funktioniert beim Laden manchmal trotzdem — aber bei langsamem Netz oder Race Condition bricht die Seite stumm.

**Invariante (alle HTML-Seiten):**
```html
<script src="script.js"></script>
<script async src="count.js" data-goatcounter="..."></script>
```

**Quelle:** PROTOKOLL 2026-06-07 (Full-Audit PR #57).

---

## L-05 — Globale vs. seitenspezifische CSS-Selektoren: immer zuerst prüfen

**Was:** Wenn ein Selektor (z. B. `.offer`, `.step`, `.au-fit-list`) auf mehreren Seiten vorkommt, gehört der Patch nach `style.css` oder in die geteilte Datei — nie in die seitenspezifische CSS kopieren.

**Warum nicht-offensichtlich:** Eine Korrektur in `zusammenarbeit.css` die aber Selektoren aus `style.css` übernimmt, hat keinen Effekt auf `index.html` — es entstehen stille Unterschiede zwischen Seiten.

**Kurzprüfung vor jedem CSS-Patch:** `grep -rn ".SELECTOR" *.html *.css` — kommt er auf mehreren Seiten vor? → geteilte Quelle.

**Quelle:** PROTOKOLL 2026-06-07 (Vroni-Feedback zu Icon-Größen).

---

## L-06 — Claude Design ist niemals „neuer" als das Repo

**Was:** Claude Design lebt außerhalb von Git. Der aktuelle Stand im Design-Projekt entspricht dem letzten Handoff-Bundle — nie dem Live-Repo-Stand.

**Warum nicht-offensichtlich:** Claude Design zeigt manchmal Dateien die nicht im Repo sind oder meldet „Archiv ist neuer". Das ist immer eine Projektion aus dem Design-Tool, nicht aus Git.

**Regel:** Bei Widerspruch gewinnt immer `git log`. Handoff-Bundles sind Snapshots zu einem Zeitpunkt. Repo-Stand via `git log --oneline -10` ist die einzige Wahrheit.

**Quelle:** PROTOKOLL 2026-06-14 (Session nach PR #67, Vroni-Frage).

---

## L-07 — Neue HTML-Seite braucht 4 synchrone Aktualisierungen

**Was:** Bei jeder neuen `.html`-Datei müssen im selben PR aktualisiert werden:
1. `.github/workflows/ci.yml` (html-validate + link-check)
2. `sitemap.xml` (wenn indexiert)
3. `robots.txt` (wenn noindex)
4. `WISSEN.md` (Seiten-Aufzählung)

**Warum nicht-offensichtlich:** Jeder der vier Punkte ist für sich nicht-blockierend — der PR geht durch, aber die Website ist in 1–4 Punkten unvollständig.

**Command:** `/neue-seite` macht alle 4 automatisch.

**Quelle:** PROTOKOLL 2026-06-14 (CLAUDE.md neue Invariante, PR #68).

---

## L-08 — Brand Voice: Verboten-Liste ist konkret und lang

**Was:** Viele KI-generierte Texte für Vroni driften automatisch in Coaching/Agency-Sprache ab. Die Verboten-Liste in CLAUDE.md ist nicht abstrakt — sie enthält spezifische Phrasen die sofort disqualifizieren.

**Kern der Verboten-Liste:** „Next Level", „High Vibe", „Soul Business", „Traumkunden magnetisch anziehen", „beste Version deiner selbst", „Signature-Programm", künstliche Verknappung, Feminin-Energy als Hauptschiene, sterile Agenturfloskeln, KI-Floskeln, Claim-Kaskaden (abgehackte Drei-Wort-Sätze).

**Was stattdessen:** Ausformulierte Sätze, Ich-Form, Gedanke → Erklärung → Einordnung → klare Zuspitzung. Wie ein Gespräch mit einer klugen Freundin.

**Command:** `/voice-check` prüft Content-Blöcke systematisch.

**Quelle:** CLAUDE.md „Brand Voice" + PROTOKOLL diverse Voice-Runden.

---

## L-09 — Handoff-Dateien immer diffin vor Override

**Was:** Wenn ein Handoff neue HTML-Blöcke bringt, die Datei nicht blind übernehmen. Handoffs können Hover-States, Script-Reihenfolge oder Encoding-Korrekturen aus dem Repo zurücksetzen.

**Warum nicht-offensichtlich:** Der Handoff sieht vollständig aus. Aber Design-Tool und Code-Repo gehen auseinander wenn zwischenzeitlich Fixes direkt im Repo gemacht wurden.

**Ablauf:** Immer `diff handoff_datei.html repo_datei.html` → Überraschungen identifizieren → erst dann selektiv übernehmen.

**Command:** `/handoff` enthält diesen Schritt explizit.

**Quelle:** PROTOKOLL 2026-06-07 (Hover-States-Regression nach PR-Merge).

---

## L-10 — MEDIEN.md ist CI-erzwungen — nicht nur Vorsatz

**Was:** Der CI-Job `Medien-Register-Check` blockiert jeden PR der `images/` ändert ohne `MEDIEN.md` im selben PR. Das ist keine Empfehlung.

**Warum nicht-offensichtlich:** Man könnte denken „ich trage das später nach". CI verhindert das konkret.

**Praxis:** Bei jedem neuen oder geänderten Bild sofort `/medien-neu` aufrufen — sonst scheitert der PR.

**Quelle:** PROTOKOLL 2026-06-02 (CI-Guard-Einführung) + CLAUDE.md.

---

## Wie diese Datei genutzt wird

**In jeder Session:** `/learnings-review` lädt diese Datei und prüft ob aktuelle Arbeit gegen bekannte Muster läuft.

**Neue Learnings:** Entstehen wenn etwas Unerwartetes passiert → PROTOKOLL-Eintrag (vollständig) → hier ein destillierter L-XX-Eintrag → ggf. neuer Command.

**Veraltete Learnings:** Wenn ein Learning durch ein Tool/Command vollständig automatisiert ist, bleibt der Eintrag — der Verweis auf den Command macht ihn zur Referenz, nicht zur manuellen Checkliste.
