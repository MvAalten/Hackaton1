"""
Startpunt van de backend.

Start met:  uvicorn app.main:app --reload   (vanuit de map backend/)
Bekijk de automatische API-documentatie op:  http://127.0.0.1:8000/docs
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import abonnementen, afspraken, cursussen, toegang
from .seed import seed

# Maak alle tabellen aan (op basis van models.py) als ze nog niet bestaan.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="De Kast - Kiosk API",
    description="Backend voor het toegangssysteem van sportschool De Kast (MVP-basis).",
    version="0.1.0",
)

# CORS: zodat de React Native-app (andere origin) de API mag aanroepen.
# TODO: zet dit voor productie strakker (alleen de kiosk-origin toestaan).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Elke flow heeft een eigen router.
app.include_router(toegang.router)
app.include_router(cursussen.router)
app.include_router(abonnementen.router)
app.include_router(afspraken.router)


@app.on_event("startup")
def bij_opstarten():
    """Vul de database met dummydata bij de eerste start."""
    seed()


@app.get("/", tags=["status"])
def status():
    """Simpele check of de backend draait."""
    return {"status": "ok", "service": "De Kast Kiosk API"}
