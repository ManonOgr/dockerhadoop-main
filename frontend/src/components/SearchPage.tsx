// src/pages/SearchPage.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState(''); // Mot-clé de recherche
  const [filters, setFilters] = useState({
    date: '', // Date de l'événement
    location: '', // Localisation de l'événement
    eventType: '', // Type d'événement (par exemple : précipitations)
  });
  const [data, setData] = useState<any>(null); // Données récupérées depuis l'API
  const [loading, setLoading] = useState<boolean>(false); // État de chargement

  const handleSearch = async () => {
    console.log('Rechercher:', query, filters);

    setLoading(true);  // Démarre le chargement

    try {
        console.log("chocolat")
      // Envoie une requête GET à l'API FastAPI pour récupérer les données de l'année spécifiée
      const response = await axios.get(`http://localhost:8000/wdsp/${filters.date}`);
      console.log('Données reçues:', response.data);  // Affiche les données reçues dans la console

      // Stocke les données reçues
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      setLoading(false);  // Arrête le chargement
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recherche d'Événements Météorologiques
      </Typography>
      <TextField
        label="Mot-clé"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Localisation"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Type d'événement"
            value={filters.eventType}
            onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleSearch} sx={{ marginTop: 2 }}>
        Rechercher
      </Button>
      {loading && <Typography variant="h6" sx={{ marginTop: 2 }}>Chargement...</Typography>}
      <Box sx={{ marginTop: 4, width: '80%', height: '40vh' }}>
        {data && data.labels && data.data ? (
          <>
            <Typography variant="h6" gutterBottom>
              Résultats des Précipitations
            </Typography>
            <Line
              data={{
                labels: data.labels, // Utilise les labels de la réponse API
                datasets: [
                  {
                    label: 'Précipitations (mm)',
                    data: data.data, // Utilise les données de la réponse API
                    borderColor: 'rgba(0,123,255,1)',
                    fill: false,
                  },
                ],
              }}
            />
          </>
        ) : (
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Aucun résultat disponible
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
