import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import LoginForm from './components/LoginForm';
import WeatherChart from './components/WeatherChart';
import Navbar from './components/Navbar';
import EventDetails from './components/EventsDetails';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import earthImage from './assets/earth.jpg';

const App: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log('Email:', email);
    console.log('Mot de passe:', password);
  };

  return (
    <Router>
      <Routes>
        {/* Page de connexion */}
        <Route
          path="/"
          element={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${earthImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <LoginForm onLogin={handleLogin} />
            </Box>
          }
        />
        
        {/* Autres pages après connexion */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
              }}
            >
                <HomePage />
              </Box>
            </>
          }
        />

        <Route
          path="/weather"
          element={
            <>
              <Navbar />
              <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
              }}
            >
                <WeatherChart />
              </Box>
            </>
          }
        />

        <Route
          path="/event-details"
          element={
            <>
              <Navbar />
              <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
              }}
            >
                <EventDetails />
              </Box>
            </>
          }
        />

        <Route
          path="/search"
          element={
            <>
              <Navbar />
              <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
              }}
            >
                <SearchPage />
              </Box>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
