import React from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from '../img/profile.jpg'; // Import your image here

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
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  form: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: '$fadeIn 1s',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: 'black', // Cambiar el color a negro
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

export default function ProfilePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.overlay}></div>
      <Container component="main" maxWidth="xs">
        <form className={classes.form} noValidate>
          <Typography component="h1" variant="h5" className={classes.title}>
            Perfil de Usuario
          </Typography>
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Correo Electrónico"
            type="email"
            id="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Guardar Cambios
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button variant="contained" color="secondary">
                Cambiar Contraseña
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}