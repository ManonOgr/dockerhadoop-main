import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException
from dotenv import load_dotenv
import os

# Charger les variables d'environnement
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def authenticate_user(username: str, password: str):
    # Implémentez ici la logique d'authentification des utilisateurs
    if username == "admin" and password == "admin":
        # Créez un JWT valide
        expiration = datetime.utcnow() + timedelta(hours=1)
        token = jwt.encode({"sub": username, "exp": expiration}, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")
