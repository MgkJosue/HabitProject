import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button,IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import backgroundImage1 from '../img/logui1.jpg';
import backgroundImage2 from '../img/profile.jpg';
import backgroundImage3 from '../img/signup.jpg';
import Alert from '@material-ui/lab/Alert'; 

const images = [backgroundImage1, backgroundImage2, backgroundImage3];

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animation: '$fadeIn 1s', // Using the fadeIn animation
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
    animation: '$slideIn 1s', // Using the slideIn animation
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
  '@keyframes slideIn': {
    from: {
      transform: 'translateY(-20px)',
    },
    to: {
      transform: 'translateY(0)',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    animation: '$pulse 3s infinite', // Using the pulse animation
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  spacer: {
    flex: 1,
  }
}));

export default function HabitEditPage() {
  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { habitId } = useParams();
  const [error, setError] = useState(null); 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const editHabit = JSON.parse(sessionStorage.getItem('editHabit'));
    if (editHabit) {
      setTitle(editHabit.titulo_habito);
      setDescription(editHabit.descripcion_habito);
      sessionStorage.removeItem('editHabit');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!title || !description) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const userId = sessionStorage.getItem('userId');
    const habitData = {
      id_usuario: Number(userId),
      titulo_habito: title,
      descripcion_habito: description,
    };

    if (habitId && habitId !== 'new') {
      fetch(`http://localhost:8000/habitos/${habitId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(habitData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error( 'Hubo un error al actualizar el habito.');
          }
          navigate('/habit-list');
        })
        .catch(error => console.error('Hubo un error al actualizar el hábito:', error));
        setError(error);
      } else if (habitId === 'new') {
      fetch('http://localhost:8000/habitos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(habitData),
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(data => {
              throw new Error(data.detail || 'Hubo un error al actualizar la tarea.');
            });
          }
          navigate('/habit-list');
        })
        .catch(error => console.error('Hubo un error al crear el hábito:', error));
        setError(error.message);
    } else {
      console.error('No se especificó un id de habito válido.');
      setError('No se especificó un id de habito válido.');
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
    <div
      className={classes.root}
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className={classes.overlay}></div>
      <Container component="main" maxWidth="xs">
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Editar Hábito
          </Typography>
          {error && <Alert severity="error">{error}</Alert>} 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Título del Hábito"
            name="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Descripción del Hábito"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Guardar Hábito
          </Button>
        </form>
      </Container>
    </div>
    </>
  );
}
