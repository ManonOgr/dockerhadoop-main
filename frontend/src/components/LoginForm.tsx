import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card,
} from '@mui/material';

const LoginForm: React.FC<{ onLogin?: (email: string, password: string) => void }> = ({
  onLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateInputs = () => {
    let valid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Veuillez entrer un email valide.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs() && onLogin) {
      onLogin(email, password);
    }
  };

  return (
    <Card
      sx={{
        padding: 4,
        width: '100%',
        maxWidth: 400,
        background: 'rgba(255, 255, 255, 0.4)', 
        backdropFilter: 'blur(10px)', 
        borderRadius: 4, 
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)', 
      }}
    >
      <Typography component="h1" variant="h5" textAlign="center" mb={2}>
        Connexion
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            placeholder="votre@email.com"
            variant="outlined"
            fullWidth
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="password">Mot de passe</FormLabel>
          <TextField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            placeholder="••••••"
            variant="outlined"
            fullWidth
            required
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#0077b6',
            '&:hover': { backgroundColor: '#023e8a' },
          }}
        >
          Se connecter
        </Button>
      </Box>
    </Card>
  );
};

export default LoginForm;
