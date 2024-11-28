from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)


class GSOD(Base):
    __tablename__ = "gsod"

    id = Column(Integer, primary_key=True, autoincrement=True)  
    station = Column(String, nullable=False) 
    date = Column(Date, nullable=False)  
    latitude = Column(Float, nullable=True)  
    longitude = Column(Float, nullable=True)  
    elevation = Column(Float, nullable=True) 
    name = Column(String, nullable=True)  
    temp = Column(Float, nullable=True)  
    temp_attributes = Column(String, nullable=True)  # TEMP_ATTRIBUTES
    dewp = Column(Float, nullable=True)  # DEWP
    dewp_attributes = Column(String, nullable=True)  # DEWP_ATTRIBUTES
    slp = Column(Float, nullable=True)  # SLP
    slp_attributes = Column(String, nullable=True)  # SLP_ATTRIBUTES
    stp = Column(Float, nullable=True)  # STP
    stp_attributes = Column(String, nullable=True)  # STP_ATTRIBUTES
    visib = Column(Float, nullable=True)  # VISIB
    visib_attributes = Column(String, nullable=True)  # VISIB_ATTRIBUTES
    wdsp = Column(Float, nullable=True)  # WDSP
    wdsp_attributes = Column(String, nullable=True)  # WDSP_ATTRIBUTES
    mxspd = Column(Float, nullable=True)  # MXSPD
    gust = Column(Float, nullable=True)  # GUST
    max = Column(Float, nullable=True)  # MAX
    max_attributes = Column(String, nullable=True)  # MAX_ATTRIBUTES
    min = Column(Float, nullable=True)  # MIN
    min_attributes = Column(String, nullable=True)  # MIN_ATTRIBUTES
    prcp = Column(Float, nullable=True)  # PRCP
    prcp_attributes = Column(String, nullable=True)  # PRCP_ATTRIBUTES
    sndp = Column(Float, nullable=True)  # SNDP
    frshtt = Column(String, nullable=True)  # FRSHTT

    # Lien vers la table Year
    year_id = Column(Integer, ForeignKey('year.id'))
    year = relationship("Year", back_populates="gsods")


class Year(Base):
    __tablename__ = "year"

    id = Column(Integer, primary_key=True, autoincrement=True)
    year = Column(Integer, unique=True, nullable=False)

    # Relation avec la table GSOD
    gsods = relationship("GSOD", back_populates="year")
