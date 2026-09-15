"""
Flow 4 - Afspraak met personal coach (US-07).

Flowchart: kies coach -> beschikbaar moment kiezen -> afspraak bevestigd.

Plumbing: coaches ophalen + afspraak aanmaken.
Businessregel (dubbelboeking voorkomen, beschikbaarheid) = TODO.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Afspraak, PersonalCoach
from ..schemas import AfspraakIn, CoachUit, StandaardUit

router = APIRouter(prefix="/afspraken", tags=["afspraken"])


@router.get("/coaches", response_model=list[CoachUit])
def lijst_coaches(db: Session = Depends(get_db)):
    """Alle personal coaches waaruit de sporter kan kiezen."""
    return db.query(PersonalCoach).all()


@router.post("/plannen", response_model=StandaardUit)
def plan_afspraak(data: AfspraakIn, db: Session = Depends(get_db)):
    # TODO (jullie logica): voorkom dubbelboeking (US-07).
    #   Bestaat er al een afspraak voor deze coach op deze datum + tijd
    #   met status "gepland"? Zo ja -> return ok=False met een melding.

    afspraak = Afspraak(
        lid_id=data.lid_id,
        coach_id=data.coach_id,
        datum=data.datum,
        tijd=data.tijd,
        notitie=data.notitie,
        status="gepland",
    )
    db.add(afspraak)
    db.commit()
    return StandaardUit(ok=True, melding="Afspraak bevestigd.")
