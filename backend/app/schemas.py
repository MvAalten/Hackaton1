"""
Pydantic-schema's: bepalen hoe data de API in- en uitgaat (validatie + documentatie).

Alleen de schema's die de kiosk-flows nodig hebben zijn hier uitgewerkt. Breid uit
zodra je een flow verder bouwt.
"""
from datetime import date, datetime, time

from pydantic import BaseModel


# --- Lid ---------------------------------------------------------------------
class LidUit(BaseModel):
    id: int
    naam: str
    keer_bezocht: int

    class Config:
        from_attributes = True  # laat het schema direct van een SQLAlchemy-object lezen


# --- Toegang / inchecken -----------------------------------------------------
class ScanIn(BaseModel):
    """Wat de kiosk stuurt bij het scannen van een tag."""

    tag_uid: str


class CheckinUit(BaseModel):
    """Antwoord van de backend op een scan."""

    toegestaan: bool
    melding: str
    lid_naam: str | None = None


# --- Cursus ------------------------------------------------------------------
class CursusUit(BaseModel):
    id: int
    naam: str
    beschrijving: str | None = None
    max_deelnemers: int

    class Config:
        from_attributes = True


class InschrijvingIn(BaseModel):
    lid_id: int
    cursus_id: int


# --- Abonnement --------------------------------------------------------------
class OpzeggenIn(BaseModel):
    lid_id: int
    bevestigd: bool  # de sporter moet bevestigen (US-02)


# --- Coach / afspraak --------------------------------------------------------
class CoachUit(BaseModel):
    id: int
    naam: str
    specialisatie: str | None = None

    class Config:
        from_attributes = True


class AfspraakIn(BaseModel):
    lid_id: int
    coach_id: int
    datum: date
    tijd: time
    notitie: str | None = None


class StandaardUit(BaseModel):
    """Generiek antwoord voor acties (gelukt ja/nee + melding)."""

    ok: bool
    melding: str
