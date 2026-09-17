"""
Testopzet: elke test krijgt een eigen, lege SQLite in-memory database
(niet het echte de_kast.db-bestand), gevuld met dezelfde soort dummydata
als seed.py. Zo zijn tests onafhankelijk van elkaar en van lokale data.
"""
from datetime import date

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.models import Abonnement, Cursus, Lid, PersonalCoach


@pytest.fixture()
def db_session():
    """Verse in-memory database per test, met dezelfde tabellen als productie."""
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        engine.dispose()


@pytest.fixture()
def client(db_session):
    """TestClient waarvan de get_db-dependency naar de testdatabase wijst."""

    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture()
def seed_data(db_session):
    """Dezelfde soort dummydata als app/seed.py, maar dan in de testdatabase."""
    anna = Lid(tag_uid="04A1B2C3", naam="Anna de Vries", email="anna@example.com", keer_bezocht=0)
    bram = Lid(tag_uid="04D4E5F6", naam="Bram Jansen", email="bram@example.com", keer_bezocht=0)
    db_session.add_all([anna, bram])
    db_session.flush()

    abonnement_anna = Abonnement(
        lid_id=anna.id, type="onbeperkt", heeft_cursus_addendum=True,
        start_datum=date(2026, 1, 1), status="actief",
    )
    abonnement_bram = Abonnement(
        lid_id=bram.id, type="1x_week", heeft_cursus_addendum=False,
        start_datum=date(2026, 1, 1), status="actief",
    )
    db_session.add_all([abonnement_anna, abonnement_bram])

    yoga = Cursus(naam="yoga", beschrijving="Ontspannende yogales", max_deelnemers=10)
    pilates = Cursus(naam="pilates", beschrijving="Core-training", max_deelnemers=8)
    paaldansen = Cursus(naam="paaldansen", beschrijving="Paaldanslessen", max_deelnemers=6)
    db_session.add_all([yoga, pilates, paaldansen])

    sanne = PersonalCoach(naam="Coach Sanne", specialisatie="Kracht", email="sanne@dekast.nl")
    tom = PersonalCoach(naam="Coach Tom", specialisatie="Cardio", email="tom@dekast.nl")
    db_session.add_all([sanne, tom])

    db_session.commit()

    return {
        "anna": anna,
        "bram": bram,
        "abonnement_anna": abonnement_anna,
        "abonnement_bram": abonnement_bram,
        "yoga": yoga,
        "pilates": pilates,
        "paaldansen": paaldansen,
        "sanne": sanne,
        "tom": tom,
    }
