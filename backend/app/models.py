"""
Datamodellen (tabellen) - één op één afgeleid van het ERD / klassendiagram van De Kast.

Let op: veldnaam `tag_uid` op Lid staat niet in het originele ERD, maar is toegevoegd
omdat de kiosk een lid opzoekt via het unieke nummer van de NFC-tag. Zonder dit veld
kan de kern-flow (inchecken) niet werken. Pas het ERD hierop aan.
"""
from sqlalchemy import (
    Boolean,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Time,
)
from sqlalchemy.orm import relationship

from .database import Base


class Lid(Base):
    __tablename__ = "lid"

    id = Column(Integer, primary_key=True, index=True)
    tag_uid = Column(String, unique=True, index=True)  # uniek NFC-tagnummer
    naam = Column(String, nullable=False)
    email = Column(String)
    telefoonnummer = Column(String)
    geboorte_datum = Column(Date)
    keer_bezocht = Column(Integer, default=0)

    abonnementen = relationship("Abonnement", back_populates="lid")
    inschrijvingen = relationship("Inschrijving", back_populates="lid")
    toegangen = relationship("Toegang", back_populates="lid")
    afspraken = relationship("Afspraak", back_populates="lid")


class Abonnement(Base):
    __tablename__ = "abonnement"

    id = Column(Integer, primary_key=True, index=True)
    lid_id = Column(Integer, ForeignKey("lid.id"), nullable=False)
    type = Column(String, nullable=False)  # "1x_week" | "2x_week" | "onbeperkt"
    heeft_cursus_addendum = Column(Boolean, default=False)  # cursus-addendum ja/nee
    start_datum = Column(Date)
    eind_datum = Column(Date)
    status = Column(String, default="actief")  # "actief" | "opgezegd"

    lid = relationship("Lid", back_populates="abonnementen")


class Cursus(Base):
    __tablename__ = "cursus"

    id = Column(Integer, primary_key=True, index=True)
    naam = Column(String, nullable=False)  # yoga | pilates | paaldansen
    beschrijving = Column(String)
    max_deelnemers = Column(Integer, default=10)

    inschrijvingen = relationship("Inschrijving", back_populates="cursus")


class Inschrijving(Base):
    __tablename__ = "inschrijving"

    id = Column(Integer, primary_key=True, index=True)
    lid_id = Column(Integer, ForeignKey("lid.id"), nullable=False)
    cursus_id = Column(Integer, ForeignKey("cursus.id"), nullable=False)
    inschrijf_datum = Column(Date)
    status = Column(String, default="actief")  # "actief" | "geannuleerd"

    lid = relationship("Lid", back_populates="inschrijvingen")
    cursus = relationship("Cursus", back_populates="inschrijvingen")


class Toegang(Base):
    """Logregel van elke toegangspoging (US-01: pogingen worden vastgelegd)."""

    __tablename__ = "toegang"

    id = Column(Integer, primary_key=True, index=True)
    lid_id = Column(Integer, ForeignKey("lid.id"))  # kan leeg zijn bij onbekende tag
    datum_tijd = Column(DateTime)
    toegestaan = Column(Boolean, default=False)

    lid = relationship("Lid", back_populates="toegangen")


class PersonalCoach(Base):
    __tablename__ = "personal_coach"

    id = Column(Integer, primary_key=True, index=True)
    naam = Column(String, nullable=False)
    specialisatie = Column(String)
    email = Column(String)

    afspraken = relationship("Afspraak", back_populates="coach")


class Afspraak(Base):
    __tablename__ = "afspraak"

    id = Column(Integer, primary_key=True, index=True)
    lid_id = Column(Integer, ForeignKey("lid.id"), nullable=False)
    coach_id = Column(Integer, ForeignKey("personal_coach.id"), nullable=False)
    datum = Column(Date)
    tijd = Column(Time)
    status = Column(String, default="gepland")  # "gepland" | "geannuleerd"
    notitie = Column(String)

    lid = relationship("Lid", back_populates="afspraken")
    coach = relationship("PersonalCoach", back_populates="afspraken")


class Admin(Base):
    __tablename__ = "admin"

    id = Column(Integer, primary_key=True, index=True)
    naam = Column(String, nullable=False)
    email = Column(String, unique=True)
    wachtwoord_hash = Column(String)  # nooit een wachtwoord in platte tekst opslaan
