import pandas as pd
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from io import StringIO
import os

# Importer les modules pour la connexion à la base de données
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db, engine
from app.models import Base, GSOD

# Initialiser l'application FastAPI
app = FastAPI()

# Configurer CORS pour autoriser les requêtes du frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Autoriser le frontend React
    allow_credentials=True,
    allow_methods=["*"],  # Autoriser toutes les méthodes HTTP
    allow_headers=["*"],  # Autoriser tous les en-têtes
)

# Définir OAuth2PasswordBearer pour la gestion des tokens JWT
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Configuration JWT
SECRET_KEY = "your_secret_key"  # Remplacez par une clé plus sécurisée
ALGORITHM = "HS256"

# Liste des utilisateurs simulés pour les tests
fake_users_db = {
    "admin": {
        "username": "admin",
        "password": "admin_password",
    },
    "user1": {
        "username": "user1",
        "password": "user1_password",
    }
}

# Liste des tokens invalidés (révocation)
revoked_tokens = set()

# Modèle pour la réponse
class Item(BaseModel):
    name: str
    description: str

# Modèle pour les données de login (username et password)
class LoginRequest(BaseModel):
    username: str
    password: str

# Fonction pour vérifier l'utilisateur et son mot de passe
def authenticate_user(username: str, password: str):
    user = fake_users_db.get(username)
    if user and user["password"] == password:
        expiration = datetime.utcnow() + timedelta(hours=1)
        token = jwt.encode({"sub": username, "exp": expiration}, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# Endpoint racine
@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI with PostgreSQL!"}

# Endpoint pour obtenir un token JWT
@app.post("/token")
def login_for_access_token(request: LoginRequest):
    """
    Endpoint pour effectuer un login et recevoir un JWT.
    """
    username = request.username
    password = request.password
    return authenticate_user(username, password)

# Endpoint pour invalider un token (logout)
@app.post("/logout")
def logout(token: str = Depends(oauth2_scheme)):
    """
    Endpoint pour invalider un token (logout).
    """
    revoked_tokens.add(token)
    return {"message": "Successfully logged out"}

# Endpoint pour récupérer les données météo de la base de données
@app.get("/weather/{year}")
async def get_weather_data(year: int, db: AsyncSession = Depends(get_db)):
    """
    Récupère les données météo pour une année spécifique depuis la base de données.
    """
    # Exécuter une requête asynchrone pour récupérer les données de l'année demandée
    result = await db.execute(select(GSOD).filter(GSOD.date.like(f"{year}%")))
    weather_data = result.scalars().all()
    
    if not weather_data:
        raise HTTPException(status_code=404, detail="Weather data not found for the given year")
    
    # Retourner les résultats sous forme de dictionnaire
    return {
        "year": year,
        "data": [{"date": data.date, "station": data.station, "temperature": data.temp, "humidity": data.temp} for data in weather_data]
    }

# Endpoint pour ajouter des données météo de test dans la base de données
@app.post("/add-weather-test/")
async def add_weather_test(db: AsyncSession = Depends(get_db)):
    # Créer un objet GSOD de test
    weather_data = GSOD(
        date="2023-01-01",  # Exemple de date
        station="Station_X",  # Exemple de station
        latitude=48.8566,     # Exemple de latitude
        longitude=2.3522,     # Exemple de longitude
        elevation=35.0,       # Exemple d'altitude
        temp=22.5,            # Température
        humidity=60.0,        # Humidité
        prcp=5.0,             # Exemple de précipitations
    )
    
    # Ajouter les données et les sauvegarder dans la base de données
    db.add(weather_data)
    await db.commit()  # Commit pour persister dans la base de données
    
    return {"message": "Test weather data added successfully!"}

# Créer les tables dans la base de données si elles n'existent pas déjà
async def create_tables():
    async with engine.begin() as conn:  # Connexion asynchrone pour DDL
        await conn.run_sync(Base.metadata.create_all)  # Créer les tables

# Assurez-vous que la création des tables s'exécute lors de l'initialisation de l'application
@app.on_event("startup")
async def on_startup():
    await create_tables()  # Appel à la fonction asynchrone pour créer les tables

