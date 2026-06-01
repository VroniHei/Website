# WORKFLOW · Vroni / InnerLine Website

> **Zweck:** Die verbindliche Arbeitsweise für die Zusammenarbeit zwischen **Claude Code**,
> **VS Code (GitHub Copilot)** und **Claude Design**. Ziel: sicher, professionell, lückenlos
> nachvollziehbar und reproduzierbar — ohne dass etwas versehentlich überschrieben, gelöscht
> oder out-of-sync gerät.
>
> Diese Datei ist die **kanonische Quelle** für den Prozess. `CLAUDE.md`,
> `.github/copilot-instructions.md` und `PROTOKOLL.md` verweisen hierauf.

---

## 1. Grundprinzip

- **`main` ist die einzige dauerhafte Quelle der Wahrheit** und zugleich das Deployment-Ziel
  (GitHub Pages publiziert direkt aus `main`). Kein `gh-pages`, kein Build-Workflow.
- **Git ist das Rückgrat.** Claude Code und VS Code teilen ihren Stand ausschließlich über
  GitHub. Wer arbeitet, synchronisiert über `git pull` / `git push`.
- **Claude Design steht außerhalb von Git.** Es ist das Design-Atelier, kein Repo. Es bekommt
  Code-Änderungen *nicht* automatisch mit. Entwürfe werden erst real, wenn Claude Code sie über
  einen Handoff integriert und nach `main` gebracht hat. → **Claude Design ist nie der Live-Stand.**

---

## 2. Goldene Regeln (gelten immer, überall)

1. **Immer nur an einer Stelle gleichzeitig** dieselbe Datei bearbeiten (Code *oder* VS Code
   *oder* Design — nie parallel). „Staffelstab"-Prinzip.
2. **Vor dem Start: `git pull`.** Nie auf einem alten Stand loslegen.
3. **Nach dem Arbeiten: zeitnah committen + (per Branch/PR) nach `main`.** Nichts ungepusht liegen lassen.
4. **Kleine, fokussierte Commits** statt großer Sammel-Änderungen → weniger Konfliktfläche.
5. **Nach JEDER Änderung `PROTOKOLL.md` führen** (Dokumentationspflicht) — vor Commit/Push bzw. Handoff.

---

## 3. Standard-Ablauf einer Änderung (Branch → PR → Merge → Deploy)

Jede inhaltliche Änderung läuft über einen **kurzlebigen Branch + Pull Request**, nicht direkt
auf `main`. So gibt es vor dem Livegang immer einen sichtbaren Diff und einen Rückgängig-Knopf.

```
1. git pull                         # aktuellen main holen
2. git switch -c <branch>           # kurzlebiger Branch (Namen s. u.)
3. Änderung umsetzen
4. PROTOKOLL.md ergänzen (Was/Warum/Wie/Alternativen/Learnings/Konsequenzen)
5. git commit + git push -u origin <branch>
6. Pull Request öffnen → Diff prüfen (= Vorschau vor Live)
7. Mergen (Squash) → GitHub Pages deployt automatisch (~1–2 min)
8. Branch löschen
```

**Rollenverteilung:**
- **Claude Code** übernimmt die Git-Mechanik (Branch, Commit, Push, PR anlegen).
- **Veronika** liest die PR-Zusammenfassung, prüft den Diff und gibt das „passt" / merged.

**Ausnahme:** Reine Tippfehler-/Doku-Mikrofixes dürfen direkt auf `main` — im Zweifel lieber
trotzdem ein Branch+PR (Konsistenz schlägt Bequemlichkeit).

### Branch-Namens-Konvention
- `feat/<kurzbeschreibung>` — neues Feature/Section (`feat/faq-section`)
- `fix/<kurzbeschreibung>` — Bugfix (`fix/mobile-burger`)
- `design/<kurzbeschreibung>` — Handoff aus Claude Design (`design/update-vii`)
- `docs/<kurzbeschreibung>` — nur Doku (`docs/workflow`)
- `a11y/<kurzbeschreibung>` — Barrierefreiheit

---

## 4. Claude-Design-Handoff (sicher integrieren)

1. **Vor jeder neuen Design-Runde** das Atelier gedanklich aus dem aktuellen `main` neu
   aufsetzen (re-baseline), damit es nicht vom echten Stand wegdriftet.
2. Export → frische Handoff-URL (`api.anthropic.com/v1/design/h/[HASH]`; Share-URL funktioniert nicht, läuft ab).
3. Claude Code integriert in einen `design/*`-Branch und prüft **immer** die Handoff-Checkliste
   in `PROTOKOLL.md` Abschnitt 5 (z. B. kein `image-slot.js`, kein Google-Fonts-Link, Produktions-E-Mail).
4. PR-Diff prüfen — so kann ein Bundle keine bestehenden Code-/A11y-Fixes still überschreiben.
5. Mergen → Deploy.

---

## 5. Schutz von `main` (einmalig auf GitHub einzurichten)

Repo-Settings → **Branches** → Branch-Protection-Rule für `main`:
- ✅ **Require a pull request before merging** (kein Direkt-Push)
- ✅ **Block force pushes**
- ✅ **Restrict deletions** (Branch kann nicht gelöscht werden)
- (optional) **Require linear history** (sauberer Verlauf)

Das ist das Sicherheitsnetz: Die Historie kann nicht überschrieben werden, und jede Änderung
muss durch einen PR.

---

## 6. VS-Code-/Lokales-Git-Setup (einmalig)

```bash
git config pull.rebase false        # klare Merge-Strategie (kein "divergent branches"-Fehler)
git config --global user.name  "Veronika Heidrich"
git config --global user.email "vronal.h@gmail.com"
```
Routine in VS Code: **vor dem Arbeiten** „Pull", **nach dem Arbeiten** committen und über
einen Branch/PR nach `main`.

---

## 7. Reproduzierbarkeit / „auf einen Moment zurückstellen"

- **Git-Historie + `PROTOKOLL.md`** zusammen ergeben die lückenlose Rückführbarkeit.
- **Meilensteine taggen:** bei wichtigen Ständen `git tag -a v1.0 -m "…"` → jederzeit
  exakt wiederherstellbar.
- **Rückgängig machen:** einen gemergten PR über „Revert" zurücknehmen (erzeugt sauberen
  Gegen-Commit, Historie bleibt intakt).
