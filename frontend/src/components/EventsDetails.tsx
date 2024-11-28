// src/pages/EventDetails.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const EventDetails: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Détails de l'Événement
      </Typography>
      <Typography variant="body1" paragraph>
        Localisation: Paris, France
      </Typography>
      <Typography variant="body1" paragraph>
        Date: 2023-05-01
      </Typography>
      <Typography variant="body1" paragraph>
        Description: Un événement météorologique majeur avec des vents violents et des pluies abondantes.
      </Typography>
    </Box>
  );
};

export default EventDetails;
