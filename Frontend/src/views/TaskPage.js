import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage1 from '../img/logui1.jpg';
import backgroundImage2 from '../img/profile.jpg';
import backgroundImage3 from '../img/signup.jpg';
import { useNavigate } from 'react-router-dom';


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
  // New animation class
  slideAnimation: {
    animation: '$slide 30s infinite', // Using the slide animation defined below
  },
  // Keyframe animation definition for sliding
  '@keyframes slide': {
    '0%': {
      backgroundPosition: '0% 0%', // Start position of background
    },
    '100%': {
      backgroundPosition: '100% 100%', // End position of background
    },
  },
}));

export default function TaskPage() {
  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Añade estado para cada campo del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Función para cambiar la imagen cada 5 segundos
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500); // 5000 milisegundos = 5 segundos

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Recuperar userId del SessionStorage
    const userId = sessionStorage.getItem('userId');

    // Configurar la solicitud
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario: Number(userId),
        titulo_tarea: title,
        descripcion_tarea: description,
        fecha_vencimiento_tarea: `${dueDate}T00:00:00Z`,  // Añade la hora manualmente
      }),
    };  

    // Enviar la solicitud
    fetch('http://localhost:8000/tarea/', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Hubo un error al crear la tarea.');
        }
      })
      .then((data) => {
        console.log(data);
        navigate('/task-list');  // Navega a '/task-list' después de crear la tarea
      })
      .catch((error) => console.error('Hubo un error al crear la tarea:', error));
  };

  return (
    <div
      className={`${classes.root} ${classes.slideAnimation}`}
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className={classes.overlay}></div>
      <Container component="main" maxWidth="xs">
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Typography component="h1" variant="h5" className={classes.title}>
        Crear/Editar Tarea
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Título de la tarea"
        name="title"
        autoComplete="title"
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
        label="Descripción de la tarea"
        id="description"
        autoComplete="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="dueDate"
        label="Fecha de vencimiento"
        type="date"
        id="dueDate"
        autoComplete="dueDate"
        InputLabelProps={{
          shrink: true,
        }}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Guardar Tarea
      </Button>
    </form>
      </Container>
    </div>
  );
}