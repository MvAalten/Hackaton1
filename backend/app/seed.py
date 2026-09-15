"""
Vult de database met dummydata zodat de flows meteen iets te tonen hebben.

Wordt automatisch aangeroepen bij het opstarten (main.py) als de database leeg is.
De drie cursussen (yoga, pilates, paaldansen) komen uit de casus.
"""
from datetime import date

from .database import SessionLocal
from .models import Abonnement, Cursus, Lid, PersonalCoach


def seed():
    db = SessionLocal()
    try:
        # Niet opnieuw vullen als er al leden zijn.
        if db.query(Lid).first() is not None:
            return

        # --- Leden met NFC-tag ---
        anna = Lid(tag_uid="04A1B2C3", naam="Anna de Vries", email="anna@example.com",
                   keer_bezocht=0)
        bram = Lid(tag_uid="04D4E5F6", naam="Bram Jansen", email="bram@example.com",
                   keer_bezocht=0)
        db.add_all([anna, bram])
        db.flush()  # zorgt dat anna.id / bram.id gevuld zijn

        # --- Abonnementen ---
        db.add_all([
            Abonnement(lid_id=anna.id, type="onbeperkt", heeft_cursus_addendum=True,
                       start_datum=date(2026, 1, 1), status="actief"),
            Abonnement(lid_id=bram.id, type="1x_week", heeft_cursus_addendum=False,
                       start_datum=date(2026, 1, 1), status="actief"),
        ])

        # --- Cursussen (uit de casus) ---
        db.add_all([
            Cursus(naam="yoga", beschrijving="Ontspannende yogales", max_deelnemers=10),
            Cursus(naam="pilates", beschrijving="Core-training", max_deelnemers=8),
            Cursus(naam="paaldansen", beschrijving="Paaldanslessen", max_deelnemers=6),
        ])

        # --- Personal coaches ---
        db.add_all([
            PersonalCoach(naam="Coach Sanne", specialisatie="Kracht", email="sanne@dekast.nl"),
            PersonalCoach(naam="Coach Tom", specialisatie="Cardio", email="tom@dekast.nl"),
        ])

        db.commit()
        print("Dummydata toegevoegd (leden, abonnementen, cursussen, coaches).")
    finally:
        db.close()
