from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("URLDB", "postgresql://postgres:postgres@postgres:5432/weather_data")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()  # Base pour vos modèles


def get_db(): 
    db = SessionLocal()
    try : 
        yield db
    finally: 
        db.close()