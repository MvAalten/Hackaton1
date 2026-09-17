"""
Tests voor de vier kiosk-flows (de "plumbing" die backend/README.md als af
bestempelt). Elke test draait tegen een eigen lege testdatabase (zie conftest.py).
"""
from app.models import Abonnement


def test_status_endpoint(client):
    res = client.get("/")
    assert res.status_code == 200
    assert res.json() == {"status": "ok", "service": "De Kast Kiosk API"}


# --- Flow 1: inchecken ---------------------------------------------------

def test_checkin_bekende_tag_geeft_toegang(client, seed_data):
    res = client.post("/toegang/checkin", json={"tag_uid": "04A1B2C3"})
    assert res.status_code == 200
    data = res.json()
    assert data["toegestaan"] is True
    assert data["lid_naam"] == "Anna de Vries"


def test_checkin_onbekende_tag_wordt_geweigerd(client, seed_data):
    res = client.post("/toegang/checkin", json={"tag_uid": "FFFFFFFF"})
    assert res.status_code == 200
    data = res.json()
    assert data["toegestaan"] is False
    assert data["melding"] == "Onbekende tag."
    assert data["lid_naam"] is None


def test_checkin_logt_iedere_poging(client, db_session, seed_data):
    from app.models import Toegang

    client.post("/toegang/checkin", json={"tag_uid": "04A1B2C3"})
    client.post("/toegang/checkin", json={"tag_uid": "onbekend"})

    logregels = db_session.query(Toegang).all()
    assert len(logregels) == 2


# --- Flow 2: cursus inschrijven -------------------------------------------

def test_cursussen_lijst_bevat_seed_data(client, seed_data):
    res = client.get("/cursussen")
    assert res.status_code == 200
    namen = {c["naam"] for c in res.json()}
    assert namen == {"yoga", "pilates", "paaldansen"}


def test_inschrijven_voor_cursus_lukt(client, db_session, seed_data):
    from app.models import Inschrijving

    lid_id = seed_data["anna"].id
    cursus_id = seed_data["yoga"].id

    res = client.post("/cursussen/inschrijven", json={"lid_id": lid_id, "cursus_id": cursus_id})
    assert res.status_code == 200
    assert res.json() == {"ok": True, "melding": "Inschrijving bevestigd."}

    inschrijvingen = db_session.query(Inschrijving).filter_by(lid_id=lid_id, cursus_id=cursus_id).all()
    assert len(inschrijvingen) == 1


# --- Flow 3: abonnement opzeggen ------------------------------------------

def test_opzeggen_zonder_bevestiging_gebeurt_niet(client, db_session, seed_data):
    lid_id = seed_data["anna"].id

    res = client.post("/abonnementen/opzeggen", json={"lid_id": lid_id, "bevestigd": False})
    assert res.status_code == 200
    assert res.json() == {"ok": False, "melding": "Opzegging niet bevestigd."}

    abonnement = db_session.query(Abonnement).filter_by(lid_id=lid_id).first()
    assert abonnement.status == "actief"


def test_opzeggen_met_bevestiging_zet_status_op_opgezegd(client, db_session, seed_data):
    lid_id = seed_data["anna"].id

    res = client.post("/abonnementen/opzeggen", json={"lid_id": lid_id, "bevestigd": True})
    assert res.status_code == 200
    assert res.json()["ok"] is True

    abonnement = db_session.query(Abonnement).filter_by(lid_id=lid_id).first()
    assert abonnement.status == "opgezegd"


def test_opzeggen_zonder_actief_abonnement_faalt(client, seed_data):
    lid_id = seed_data["anna"].id

    # Eerste keer opzeggen lukt, de tweede keer is er geen actief abonnement meer.
    client.post("/abonnementen/opzeggen", json={"lid_id": lid_id, "bevestigd": True})
    res = client.post("/abonnementen/opzeggen", json={"lid_id": lid_id, "bevestigd": True})

    assert res.status_code == 200
    assert res.json() == {"ok": False, "melding": "Geen actief abonnement gevonden."}


# --- Flow 4: afspraak met coach --------------------------------------------

def test_coaches_lijst_bevat_seed_data(client, seed_data):
    res = client.get("/afspraken/coaches")
    assert res.status_code == 200
    namen = {c["naam"] for c in res.json()}
    assert namen == {"Coach Sanne", "Coach Tom"}


def test_afspraak_plannen_lukt(client, db_session, seed_data):
    from app.models import Afspraak

    lid_id = seed_data["anna"].id
    coach_id = seed_data["sanne"].id

    res = client.post(
        "/afspraken/plannen",
        json={"lid_id": lid_id, "coach_id": coach_id, "datum": "2026-10-01", "tijd": "10:00:00"},
    )
    assert res.status_code == 200
    assert res.json() == {"ok": True, "melding": "Afspraak bevestigd."}

    afspraken = db_session.query(Afspraak).filter_by(lid_id=lid_id, coach_id=coach_id).all()
    assert len(afspraken) == 1
    assert afspraken[0].status == "gepland"


# --- Bekende gaten (business regels, zie TODO's in de routers) ------------
# Deze tests documenteren het HUIDIGE (onvolledige) gedrag zodat het bewust
# blijft: zodra de TODO in de router wordt opgepakt, moeten deze tests worden
# omgedraaid (ze zouden dan juist een weigering moeten verwachten).

def test_dubbele_inschrijving_wordt_nu_nog_niet_voorkomen(client, seed_data):
    lid_id = seed_data["anna"].id
    cursus_id = seed_data["yoga"].id

    eerste = client.post("/cursussen/inschrijven", json={"lid_id": lid_id, "cursus_id": cursus_id})
    tweede = client.post("/cursussen/inschrijven", json={"lid_id": lid_id, "cursus_id": cursus_id})

    assert eerste.json()["ok"] is True
    assert tweede.json()["ok"] is True  # TODO in cursussen.py: dit hoort te weigeren (US-05)


def test_dubbelboeking_coach_wordt_nu_nog_niet_voorkomen(client, seed_data):
    lid_id = seed_data["anna"].id
    coach_id = seed_data["sanne"].id
    payload = {"lid_id": lid_id, "coach_id": coach_id, "datum": "2026-10-01", "tijd": "10:00:00"}

    eerste = client.post("/afspraken/plannen", json=payload)
    tweede = client.post("/afspraken/plannen", json=payload)

    assert eerste.json()["ok"] is True
    assert tweede.json()["ok"] is True  # TODO in afspraken.py: dit hoort te weigeren (US-07)
