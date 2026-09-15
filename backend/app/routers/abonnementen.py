"""
Flow 3 - Abonnement opzeggen (US-02).

Flowchart: kies opzeggen -> bevestiging gevraagd -> opgezegd per einde periode.

Plumbing: abonnement op status "opgezegd" zetten.
Businessregel (opzegtermijn / einddatum berekenen) = TODO.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Abonnement
from ..schemas import OpzeggenIn, StandaardUit

router = APIRouter(prefix="/abonnementen", tags=["abonnementen"])


@router.post("/opzeggen", response_model=StandaardUit)
def opzeggen(data: OpzeggenIn, db: Session = Depends(get_db)):
    # De sporter moet eerst bevestigen (US-02: annulering vraagt om bevestiging).
    if not data.bevestigd:
        return StandaardUit(ok=False, melding="Opzegging niet bevestigd.")

    abonnement = (
        db.query(Abonnement)
        .filter(Abonnement.lid_id == data.lid_id, Abonnement.status == "actief")
        .first()
    )
    if abonnement is None:
        return StandaardUit(ok=False, melding="Geen actief abonnement gevonden.")

    # TODO (jullie logica): bepaal de einddatum volgens de opzegtermijn
    #   in plaats van meteen te stoppen. Nu wordt alleen de status gezet.
    abonnement.status = "opgezegd"
    db.commit()

    return StandaardUit(ok=True, melding="Abonnement opgezegd per einde van de periode.")
