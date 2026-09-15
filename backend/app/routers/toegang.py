"""
Flow 1 - Toegang verlenen (US-01).

Flowchart: scan tag -> tag geldig? -> binnen abonnementslimiet? -> log + toegang.

De PLUMBING is klaar (tag opzoeken, poging loggen). De BUSINESSREGEL
(bezoeklimiet per abonnementstype) is bewust als TODO opengelaten - dat is
de logica die jullie zelf bouwen.
"""
from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Lid, Toegang
from ..schemas import CheckinUit, ScanIn

router = APIRouter(prefix="/toegang", tags=["toegang"])


@router.post("/checkin", response_model=CheckinUit)
def checkin(scan: ScanIn, db: Session = Depends(get_db)):
    # 1. Tag opzoeken in de database.
    lid = db.query(Lid).filter(Lid.tag_uid == scan.tag_uid).first()

    # 2. Onbekende tag -> toegang geweigerd, wel loggen.
    if lid is None:
        db.add(Toegang(lid_id=None, datum_tijd=datetime.now(), toegestaan=False))
        db.commit()
        return CheckinUit(toegestaan=False, melding="Onbekende tag.")

    # 3. Beslissing: mag dit lid naar binnen?
    # TODO (jullie logica): controleer het abonnementstype en het bezoeklimiet.
    #   - "1x_week"  -> max 1 bezoek deze week
    #   - "2x_week"  -> max 2 bezoeken deze week
    #   - "onbeperkt"-> altijd toegestaan
    #   - abonnement moet status "actief" hebben en binnen start/eind-datum vallen
    # Tip: tel Toegang-rijen van dit lid in de huidige week met toegestaan == True.
    toegestaan = True  # <-- voorlopige placeholder: laat iedereen binnen
    melding = "Welkom!" if toegestaan else "Bezoeklimiet bereikt."

    # 4. Poging loggen (US-01: toegangspogingen worden vastgelegd).
    db.add(Toegang(lid_id=lid.id, datum_tijd=datetime.now(), toegestaan=toegestaan))
    if toegestaan:
        lid.keer_bezocht = (lid.keer_bezocht or 0) + 1
    db.commit()

    return CheckinUit(toegestaan=toegestaan, melding=melding, lid_naam=lid.naam)
