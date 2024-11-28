// src/pages/HomePage.tsx
import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const HomePage: React.FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Température moyenne (°C)',
        data: [15, 18, 20, 22, 25, 30],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenue dans l'application d'analyse climatique
      </Typography>
      <Typography variant="body1" gutterBottom>
        Analyser les tendances climatiques et aider les agriculteurs grâce aux données météorologiques.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            component={Link}
            to="/search"
            variant="contained"
            fullWidth
          >
            Recherche et Analyse
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            component={Link}
            to="/advanced-visualization"
            variant="contained"
            fullWidth
          >
            Visualisation Avancée
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4, width: '80%', height: '40vh' }}>
        <Typography variant="h6" gutterBottom>
          Aperçu des températures
        </Typography>
        <Line data={data} />
      </Box>
    </Box>
  );
};

export default HomePage;
