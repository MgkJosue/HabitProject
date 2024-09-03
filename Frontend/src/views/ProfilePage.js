import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import backgroundImage from '../img/fondo3.jpg'; // Import your image here

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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  spacer: {
    flex: 1,
  }
}));

export default function ProfilePage() {
  const classes = useStyles();
  const navigate = useNavigate();

  // Obtener el id del usuario del sessionStorage
  const id = window.sessionStorage.getItem('userId');

  // Definir el estado inicial de los campos del formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Cargar los datos del usuario cuando el componente se monta
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:8000/usuarios/${id}`);
      const data = await response.json();

      setUsername(data.nombre_usuario);
      setEmail(data.correo);
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userToUpdate = {
      nombre_usuario: username,
      correo: email,
      contrasena_hash: password
    };
    
    const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToUpdate),
    });
    
    if(response.ok) {
      alert("Los datos se han actualizado correctamente");
      navigate('/main');
    } else {
      alert("Ha habido un error al actualizar los datos");
    }
  };

  return (
    <>
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => {
            navigate(-1); // Vuelve a la página anterior
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <div className={classes.root}>
      <div className={classes.overlay}></div>
      <Container component="main" maxWidth="xs">
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        </form>
      </Container>
    </div>
    </>
  );
}