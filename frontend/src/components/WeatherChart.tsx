import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants nécessaires dans ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart: React.FC = () => {
  // Simuler des données météo
  const weatherData = [
    { time: '00:00', temperature: 12 },
    { time: '06:00', temperature: 14 },
    { time: '12:00', temperature: 18 },
    { time: '18:00', temperature: 16 },
    { time: '24:00', temperature: 13 },
  ];

  // Données pour le graphique
  const data = {
    labels: weatherData.map((data) => data.time),
    datasets: [
      {
        label: 'Température (°C)',
        data: weatherData.map((data) => data.temperature),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h2>Graphique des températures</h2>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default WeatherChart;
