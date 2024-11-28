import os
import requests
from bs4 import BeautifulSoup
import pandas as pd
from io import StringIO

# ==================== Fonction de récupération des liens des fichiers CSV =====================

def fetch_csv_links(url):
    """
    Récupère les liens des fichiers CSV disponibles sur une page web.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Vérifie que la requête a réussi
        soup = BeautifulSoup(response.text, 'html.parser')
        return [
            f"{url}{a['href']}"
            for a in soup.find_all('a', href=True)
            if a['href'].endswith('.csv')
        ]
    except Exception as e:
        print(f"Erreur lors de l'extraction des liens depuis {url}: {e}")
        return []  # Retourner une liste vide en cas d'erreur

# ==================== Fonction de téléchargement et traitement des fichiers CSV =====================

def download_and_process_csv(base_url, years, output_dir="datas"):
    """
    Télécharge et traite les fichiers CSV pour les années spécifiées.
    """
    os.makedirs(output_dir, exist_ok=True)  # Crée le répertoire de sortie s'il n'existe pas
    
    for year in years:
        year_url = f"{base_url}{year}/"
        csv_links = fetch_csv_links(year_url)
        
        if not csv_links:
            print(f"Aucun fichier CSV trouvé pour l'année {year}.")
            continue
        
        for csv_link in csv_links[:5]:  # Limiter à 5 fichiers par an pour l'exemple
            try:
                response = requests.get(csv_link)
                response.raise_for_status()
                
                # Charger les données CSV dans un DataFrame pandas
                csv_data = pd.read_csv(StringIO(response.text))
                print(f"Fichier téléchargé et traité: {csv_link}")
                
                # Sauvegarder le DataFrame en tant que fichier CSV local
                filename = os.path.join(output_dir, f"{year}_{os.path.basename(csv_link)}")
                csv_data.to_csv(filename, index=False)
                print(f"Données sauvegardées dans: {filename}")
            
            except Exception as e:
                print(f"Erreur lors du téléchargement ou du traitement du fichier {csv_link}: {e}")

# ==================== Fonction principale =====================

def main():
    base_url_gsod = "https://www.ncei.noaa.gov/data/global-summary-of-the-day/access/"
    years = [2020, 2021, 2022, 2023]
    
    # Exécution des étapes ETL pour GSOD
    download_and_process_csv(base_url_gsod, years, output_dir="gsod_data")

if __name__ == "__main__":
    main()
