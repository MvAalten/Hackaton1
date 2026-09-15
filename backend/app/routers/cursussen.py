"""
Flow 2 - Cursus inschrijven (US-04, US-05).

Flowchart: kies cursus -> addendum actief en plek vrij? -> inschrijving bevestigd.

Plumbing: cursussen ophalen + inschrijving aanmaken.
Businessregels (addendum-check, dubbele inschrijving, plek vrij) = TODO.
"""
from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Cursus, Inschrijving
from ..schemas import CursusUit, InschrijvingIn, StandaardUit

router = APIRouter(prefix="/cursussen", tags=["cursussen"])


@router.get("", response_model=list[CursusUit])
def lijst_cursussen(db: Session = Depends(get_db)):
    """Alle beschikbare cursussen (yoga, pilates, paaldansen)."""
    return db.query(Cursus).all()


@router.post("/inschrijven", response_model=StandaardUit)
def inschrijven(data: InschrijvingIn, db: Session = Depends(get_db)):
    # TODO (jullie logica) - controleer vóór je inschrijft:
    #   1. Heeft het lid een actief abonnement MET cursus-addendum? (US-04)
    #      Zo niet -> return StandaardUit(ok=False, melding="Geen cursus-addendum.")
    #   2. Is er nog plek? (aantal actieve inschrijvingen < cursus.max_deelnemers)
    #   3. Is het lid niet al ingeschreven voor deze cursus? (voorkom dubbel, US-05)

    inschrijving = Inschrijving(
        lid_id=data.lid_id,
        cursus_id=data.cursus_id,
        inschrijf_datum=date.today(),
        status="actief",
    )
    db.add(inschrijving)
    db.commit()
    return StandaardUit(ok=True, melding="Inschrijving bevestigd.")
