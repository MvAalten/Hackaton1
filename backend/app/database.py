"""
Databaseverbinding (SQLite via SQLAlchemy).

Eenvoudig gehouden: de hele database is een enkel bestand (de_kast.db) dat naast
deze code komt te staan. Geen aparte databaseserver nodig.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Het databasebestand komt in de backend-map te staan.
SQLALCHEMY_DATABASE_URL = "sqlite:///./de_kast.db"

# check_same_thread=False is nodig omdat FastAPI meerdere threads kan gebruiken.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Basisklasse waar alle modellen (models.py) van erven.
Base = declarative_base()


def get_db():
    """FastAPI-dependency: geeft een databasesessie en sluit die na afloop weer."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
