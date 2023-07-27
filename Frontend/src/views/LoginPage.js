
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert'; 

import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from '../img/logui1.jpg'; // Import your image here


const useStyles = makeStyles((theme) => ({
  root: {
    // Adjustments to cover the whole screen
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`, // Set the background image here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    // Styles for the overlay box
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Adjust the opacity and color as needed
  },
  form: {
    position: 'relative', // Add relative positioning to contain the overlay
    zIndex: 1, // Ensure the form is on top of the overlay
    width: '100%',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    animation: '$fadeIn 1s', // Apply the fadeIn animation to the form
  },
  title: {
    fontSize: '1.8rem', // Adjust the font size as needed
    fontWeight: 'bold', // Add bold font weight if desired
    marginBottom: theme.spacing(2), // Add margin at the bottom for spacing
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  // Keyframe animation definition
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)', // You can adjust the value to control the appearance direction
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));



export default function SignUpPage() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validar que los campos no estén vacíos
    if (username === '' || password === '') {
      setError('Todos los campos son obligatorios');
      return;
    }
  
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      console.log("Token: ", data.access_token);
      navigate('/home'); 
    } else {
      console.log("Error: ", data);
      setError(data.detail || 'Ocurrió un error');  // Modificado para manejar el error de respuesta
    }
  }
  
  return (
    <div className={classes.root}>
    <div className={classes.overlay}></div>
      <Container component="main" maxWidth="xs">
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Typography component="h1" variant="h5" className={classes.title}>
            Iniciar sesión
          </Typography>
          {error && <Alert severity="error">{JSON.stringify(error)}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar Sesión
          </Button>

          <Grid container>
            <Grid item>
              <Link to="/signup" >
                ¿No tienes una cuenta? Crea una!
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}