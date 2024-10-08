import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button,IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage1 from '../img/fondo3.jpg';
//import backgroundImage2 from '../img/profile.jpg';
//import backgroundImage3 from '../img/signup.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Alert from '@material-ui/lab/Alert'; 


const images = [backgroundImage1];

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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  spacer: {
    flex: 1,
  }
}));

export default function TaskPage() {
  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { taskId } = useParams();
  const [error, setError] = useState(null); 

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

  useEffect(() => {
    const editTask = JSON.parse(sessionStorage.getItem('editTask'));
    if (editTask) {
      setTitle(editTask.titulo_tarea);
      setDescription(editTask.descripcion_tarea);
      setDueDate(editTask.fecha_vencimiento_tarea.split('T')[0]);  // Solo tomar la fecha, no la hora
      // Luego de obtener los datos, puedes eliminarlos del sessionStorage para no tener datos obsoletos.
      sessionStorage.removeItem('editTask');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
     // Validar que los campos no estén vacíos
    if (!title || !description || !dueDate) {
      setError('Todos los campos son obligatorios');
      return;
    }


    const userId = sessionStorage.getItem('userId');

    const taskData = {
      id_usuario: Number(userId),
      titulo_tarea: title,
      descripcion_tarea: description,
      fecha_vencimiento_tarea: `${dueDate}T00:00:00Z`,
    };

    if (taskId && taskId !== 'new') {
      // Si estamos en modo edición, actualizamos la tarea
      fetch(`http://localhost:8000/tarea/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(data => {
              throw new Error(data.detail || 'Hubo un error al actualizar la tarea.');
            });
          }
          navigate('/task-list');
        })
        .catch(error => {
          console.error('Hubo un error al actualizar la tarea:', error);
          setError(error.message); // Paso 3: actualizar el estado error
        });
    } else if (taskId === 'new') {
      // Si estamos en modo creación, creamos una nueva tarea
      fetch('http://localhost:8000/tarea/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(data => {
              throw new Error(data.detail || 'Hubo un error al actualizar la tarea.');
            });
          }
          navigate('/task-list');
        })
        .catch(error => {
          console.error('Hubo un error al crear la tarea:', error);
          setError(error.message); // Paso 3: actualizar el estado error
        });
    }
    else {
      console.error('No se especificó un taskId válido.');
      setError('No se especificó un taskId válido.'); // Paso 3: actualizar el estado error
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
            navigate('/task-list'); // Vuelve a la página anterior
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
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
      {error && <Alert severity="error">{error}</Alert>} 
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
    </>
  );
}