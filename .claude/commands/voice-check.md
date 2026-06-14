# /voice-check — Brand-Voice-Prüfung für Texte

Prüft einen Text-Block gegen Vronis Brand-Voice-Regeln.
Quellen: `brand/Vroni_Voice_5.0_KI_Quick_Brief.md` + `brand/Vroni_Brand_Voice_Blueprint_5.0_Master.md` + CLAUDE.md Verboten-Liste.

## Was du tust

Wenn mir Text übergeben wird (als Argument oder letzter Block im Chat), führe alle drei Stufen durch.

**Bei Übergabe einer HTML-Datei:** Lies erst alle sichtbaren Texte (Fließtext, Headings, CTAs, Labels — keine aria-labels, keine Kommentare):
```bash
# Text-Inhalte aus HTML extrahieren (grobe Ansicht)
python3 -c "
import re, sys
html = open('DATEI.html').read()
text = re.sub(r'<[^>]+>', ' ', html)
text = re.sub(r'\s+', ' ', text).strip()
print(text[:5000])
"
```

---

### Stufe 1 — Verboten-Check (sofort disqualifizierend)

Jeder Treffer = Fehler melden + Verbesserungsvorschlag.

**Direkte Phrasen (CLAUDE.md Verboten-Liste):**
- „entfalte dein volles Potenzial" / „volles Potenzial"
- „beste Version deiner selbst"
- „Traumkunden magnetisch anziehen"
- „Next Level"
- „High Vibe" / „High Vibe Energy"
- „Soul Business"
- „Premium Transformation"
- „Signature-Programm" (als vager Begriff)
- „7-stellig" / „Millionenumsätze"
- „manifestieren" (in Business-Kontext)
- „Feminin" / „weibliche Energie" als Hauptschiene
- „ganzheitlicher Ansatz" (leer)
- „maßgeschneiderte Lösungen"
- „nachhaltiger Mehrwert"
- „in der heutigen schnelllebigen Welt"

**Sprachmuster (KI-Brief Abschnitt 10 + 11):**
- Claim-Kaskaden: ≥3 aufeinanderfolgende Ein-/Zwei-Wort-Sätze
- Überperfekte „nicht X, sondern Y"-Kontraste (3+ im selben Text)
- Generische Nähe-Einstiege: „In einer Welt, in der…", „Mehr denn je…", „Wir leben in einer Zeit…"
- Zu viele Gedankenstriche (—) als Stilmittel (Ausnahme: technische Wortverbindungen)
- Künstliche Verknappung: „Nur noch X Plätze", „Jetzt oder nie"
- Beschämende Formulierungen: „Das wäre ein Fehler", „Du musst endlich…"
- KI-Floskeln: „Mehr denn je", „nahtlos", „maßgeschneidert" ohne Kontext

---

### Stufe 2 — KI-Muster-Check (aus KI-Brief Abschnitt 10)

Prüfe ob diese KI-typischen Muster vorkommen:
- Zu glatte Satzsymmetrie (jeder Satz gleich lang, gleich strukturiert)
- Unnötige Dreierketten: „klar, strukturiert, zielführend" — wenn das Adjektiv alleine reicht
- Falsche Hochwertigkeit durch unnötig komplizierte Begriffe
- Coaching-Weichheit: „Du darfst…", „Du darf erlauben…", „liebevoll sichtbar machen"
- KI-Hype: „revolutionäre KI", „Power of AI", Neologismen ohne Substanz
- Spirituelle Floskeln: „deine Essenz", „dein Herzensthema", „inneres Wissen"

**Vroni sagt eher (KI-Brief Abschnitt 12 — Ersetzungstabelle):**
| Nicht so | Stattdessen |
|---|---|
| authentische Sichtbarkeit | sichtbar werden, ohne dich zu verbiegen |
| strategische Markenentwicklung | erstmal sortieren, was eigentlich alles da ist |
| ganzheitlicher Ansatz | ich denke Marke, Website und Arbeitsweise zusammen |
| KI-gestützte Effizienzsteigerung | KI hilft beim Sortieren und Weiterdenken |
| Transformation | Veränderung, Entwicklung, nächster sinnvoller Schritt |
| holistisch | nicht getrennt gedacht |
| Personal Brand skalieren | deine Marke klarer aufbauen |
| Positionierung schärfen | klarer benennen, wofür du stehst |
| Content erstellen | Gedanken in gute Inhalte bringen |
| AI-Powered Workflow | KI als Werkzeug im Prozess nutzen |
| High Performance | leistungsfähig bleiben, ohne dich dauerhaft zu überfordern |

---

### Stufe 3 — Human-Edit-Schnellcheck (KI-Brief Abschnitt 20)

Beantworte diese 10 Fragen für den Text:

1. Was soll der Text tun? (Aufgabe klar?)
2. Ist die Zielgruppe konkret abgeholt?
3. Führt der Text einen Gedanken?
4. Sind große Begriffe konkret genug? (Klarheit, Sichtbarkeit, Energie = nicht leer lassen)
5. Klingt es nach Vroni? (kluge Freundin-Ton — ehrlich, direkt, warm, leicht frech)
6. Gibt es unnötige Gedankenstriche?
7. Gibt es typische KI-Muster (Stufe 2)?
8. Ist der Satzrhythmus natürlich? (Mischung kurz/mittel, nicht abgehackt)
9. Passt der Ton zum Medium? (Website: verdichtet / Über-mich: erzählerischer / Angebot: ruhig-konkret)
10. Ist der nächste Schritt klar?

**Wenn 3+ Antworten unsicher sind: Text ist noch nicht fertig.**

---

### Ausgabe — Ampelsystem (KI-Brief Abschnitt 21)

```
### Voice-Check — [Titel/Abschnitt] — [Datum]

**Ampel: 🟢 GRÜN / 🟡 GELB / 🔴 ROT**

---
**❌ Verboten-Treffer (Stufe 1):**
- „[Phrase]" → Vorschlag: [Alternative]

**⚠️ KI-Muster (Stufe 2):**
- [Muster] in Satz/Absatz: [Problem + Alternativformulierung]

**Human-Edit (Stufe 3 — 10 Fragen):**
1. Aufgabe: [klar / unklar — Diagnose]
2. Zielgruppe: [abgeholt / nicht]
3. Gedankenführung: [geführt / springt]
4. Große Begriffe: [konkret / leer]
5. Vroni-Ton: [passt / passt nicht]
6. Gedankenstriche: [keine / X gefunden]
7. KI-Muster: [keine / welche]
8. Rhythmus: [natürlich / abgehackt]
9. Medium-Ton: [passt / passt nicht]
10. Nächster Schritt: [sichtbar / fehlt]

**✅ Gut:**
- [Was funktioniert + warum]

**Empfehlung:**
- 🟢 Grün: Leicht finalisieren
- 🟡 Gelb: Human Edit (konkrete Stellen unten)
- 🔴 Rot: Erst Aufgabe + Zielgruppe neu klären, dann neu schreiben
```

---

## Aufruf-Varianten

- `/voice-check` → prüft den letzten Text-Block im Chat
- `/voice-check zusammenarbeit.html` → extrahiert und prüft alle sichtbaren Texte
- `/voice-check [Text direkt einfügen]` → prüft den übergebenen Text

## Marken-Anker (optional stärkend)

Falls einer dieser Sätze noch nicht enthalten ist und passen würde, als Vorschlag nennen:
- „Sichtbar werden, ohne dich zu verbiegen."
- „Deine Marke sollte dich zeigen, nicht verkleiden."
- „Nicht meine Vielseitigkeit ist das Problem. Sondern der fehlende rote Faden."
- „KI soll dir Arbeit erleichtern, nicht deinen Kopf ersetzen."
- „Hohe Leistung braucht einen Körper, der mitkommt."
- „Du musst noch nicht alles fertig sortiert haben. Genau dafür bin ich ja da."
