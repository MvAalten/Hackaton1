# Backend - De Kast Kiosk API

FastAPI + SQLite. Levert de REST-endpoints voor de vier kiosk-flows.

## Opstarten

Vanuit de map `backend/`:

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows (PowerShell/CMD)
# source .venv/bin/activate     # macOS / Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

- API draait op: `http://127.0.0.1:8000`
- **Interactieve documentatie (uitproberen in de browser):** `http://127.0.0.1:8000/docs`

Bij de eerste start wordt `de_kast.db` aangemaakt en gevuld met dummydata
(2 leden, abonnementen, 3 cursussen, 2 coaches). Verwijder dat bestand om
opnieuw te seeden.

## Structuur

```
backend/app/
  main.py         # start de app, koppelt de routers, seedt bij opstarten
  database.py     # SQLite-verbinding
  models.py       # tabellen (uit het ERD/klassendiagram)
  schemas.py      # in-/uitvoer-formaten van de API
  seed.py         # dummydata
  routers/
    toegang.py       # Flow 1: inchecken        POST /toegang/checkin
    cursussen.py     # Flow 2: cursussen        GET /cursussen, POST /cursussen/inschrijven
    abonnementen.py  # Flow 3: opzeggen         POST /abonnementen/opzeggen
    afspraken.py     # Flow 4: coach-afspraak   GET /afspraken/coaches, POST /afspraken/plannen
```

## Wat is af en wat bouwen jullie zelf

**Af (de plumbing):** database, tabellen, seed-data, alle endpoints werken en
geven een antwoord terug, automatische API-docs.

**Zelf bouwen (met `TODO` gemarkeerd in de routers):** de businessregels.
- `toegang.py` — bezoeklimiet per abonnementstype controleren
- `cursussen.py` — cursus-addendum verplicht, plek vrij, dubbele inschrijving voorkomen
- `abonnementen.py` — einddatum volgens opzegtermijn berekenen
- `afspraken.py` — dubbelboeking van een coach voorkomen

## Testtags (uit de seed-data)

| Tag UID    | Lid           | Abonnement            |
|------------|---------------|-----------------------|
| `04A1B2C3` | Anna de Vries | onbeperkt + addendum  |
| `04D4E5F6` | Bram Jansen   | 1x per week           |

## Tests draaien

```bash
pip install -r requirements.txt -r requirements-dev.txt
pytest
```

De tests in `tests/` draaien tegen een losse in-memory testdatabase (niet
`de_kast.db`) en dekken de vier endpoints/flows. Twee tests documenteren
bewust het huidige (onvolledige) gedrag van de nog-niet-gebouwde
businessregels (dubbele inschrijving / dubbelboeking) - zie de `TODO`'s
hierboven.
