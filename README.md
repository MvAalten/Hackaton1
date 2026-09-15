# Sportschool De Kast - Kiosk-systeem (MVP-basis)

Barebones startpunt voor het toegangssysteem van sportschool De Kast, gebouwd op
basis van de casus, het ERD/klassendiagram en de vier flowcharts. Bedoeld om
zelf verder op te bouwen richting de MVP.

## Architectuur

```
   ┌─────────────────────────┐        REST / HTTP(S)        ┌──────────────────────────┐
   │  Kiosk-app               │  ──────────────────────────>│  Backend                 │
   │  React Native (Android)  │        JSON-verzoeken        │  Python + FastAPI        │
   │  + NFC-lezer             │  <──────────────────────────│                          │
   └─────────────────────────┘        JSON-antwoorden        └───────────┬──────────────┘
                                                                          │
                                                                   ┌──────┴───────┐
                                                                   │  SQLite      │
                                                                   │  de_kast.db  │
                                                                   └──────────────┘
```

- **`backend/`** — FastAPI + SQLite. Data, endpoints en dummydata. **Werkt en draait.**
- **`frontend/`** — React Native. Menu, NFC-lezer en API-client. Broncode klaar
  om in een React Native-project te zetten.

## De vier flows (uit de flowcharts)

| # | Flow                    | Endpoint(s)                                             | Scherm             |
|---|-------------------------|---------------------------------------------------------|--------------------|
| 1 | Inchecken (toegang)     | `POST /toegang/checkin`                                 | CheckinScreen      |
| 2 | Cursus inschrijven      | `GET /cursussen`, `POST /cursussen/inschrijven`         | CursusScreen       |
| 3 | Abonnement opzeggen     | `POST /abonnementen/opzeggen`                           | OpzeggenScreen     |
| 4 | Afspraak met coach      | `GET /afspraken/coaches`, `POST /afspraken/plannen`     | CoachScreen        |

## Snel starten

1. **Backend** (zie [backend/README.md](backend/README.md)):
   ```bash
   cd backend
   python -m venv .venv && .venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```
   Test de flows direct in de browser via `http://127.0.0.1:8000/docs`.

2. **Frontend** (zie [frontend/README.md](frontend/README.md)) — de app-broncode
   in een gegenereerd React Native-project zetten en op een Android-emulator draaien.

## Wat is bewust nog leeg (de "eigen functionaliteit")

De **plumbing** is af zodat alles meteen draait; de **businessregels** zijn
overal met `TODO` gemarkeerd en laten jullie zelf bouwen:

- Bezoeklimiet per abonnementstype (1x / 2x per week / onbeperkt) — `backend/app/routers/toegang.py`
- Cursus-addendum verplicht + dubbele inschrijving voorkomen — `backend/app/routers/cursussen.py`
- Opzegtermijn / einddatum — `backend/app/routers/abonnementen.py`
- Dubbelboeking coach voorkomen — `backend/app/routers/afspraken.py`
- Gescand lid onthouden en meegeven aan de andere schermen — `frontend/src/screens/`

## Afwijking t.o.v. het ERD

Het lid heeft in de code een extra veld `tag_uid` (het unieke NFC-tagnummer).
Dat staat niet in het originele ERD, maar is noodzakelijk omdat de kiosk een lid
opzoekt via zijn tag. **Werk dit terug in het ERD** voor de ontwerpdocumentatie.

## Versiebeheer

Nog geen git-repo. Initialiseer met:

```bash
git init && git add . && git commit -m "Initiele MVP-basis De Kast"
```

De `.gitignore` (venv, node_modules, database, native buildmappen) staat al klaar.
