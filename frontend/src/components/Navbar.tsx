// src/components/Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Météo App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Deconnexion
        </Button>
        <Button color="inherit" component={Link} to="/weather">
          Graphiques
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
