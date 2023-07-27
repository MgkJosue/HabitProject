import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'; // Importa useState
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Alert from '@material-ui/lab/Alert'; // Importa Alert para most

import backgroundImage from '../img/signup.jpg'; // Import your image here

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  form: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: '$fadeIn 1s',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: 'black', 
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [error, setError] = useState(null); // Es

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Limpiar los errores antiguos

    // Validar que los campos no estén vacíos
    if (username === '' || password === '' || email === '') {
      setError('Todos los campos son obligatorios');
      return;
    }

    const response = await fetch('http://localhost:8000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre_usuario: username,
        correo: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate('/login'); // Redirecciona al usuario a la página de inicio de sesión después de registrarse con éxito
    } else {
      setError(data.detail || 'Ocurrió un error'); // Muestra el error recibido del servidor o un error genérico
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.overlay}></div>
      <Container component="main" maxWidth="xs">
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Typography component="h1" variant="h5" className={classes.title}>
            Crear una cuenta
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
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            Registrarse
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login">
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );

}