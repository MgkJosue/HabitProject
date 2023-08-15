import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, Paper, IconButton, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { AppBar, Toolbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import backgroundImage from '../img/sunrise-g96940d752_1280.jpg'; // Ruta de la imagen local

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${backgroundImage})`, // Ruta de la imagen de fondo
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '70vh', // Asegura que el fondo cubra toda la pantalla
    backgroundColor: '#000000', // Asegura que el fondo cubra toda la pantalla
  },
  habitList: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    margin: '10px 0',
    backgroundColor: '#d1d0e0', // Color celeste pastel (ajusta según tus preferencias)
    borderRadius: '10px', // Agregar el borde redondeado al contenedor
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: '#FFFFFF', // Cambiar el color a blanco
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  spacer: {
    flex: 1,
  }
}));

function HabitListPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [habits, setHabits] = useState([]);

  const deleteHabit = (habitId) => {
    if (window.confirm('¿Estás seguro que deseas eliminar este hábito?')) {
      fetch(`http://localhost:8000/habitos/${habitId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el hábito');
        }
        setHabits(habits.filter(habit => habit.id_habito !== habitId));
      })
      .catch(error => console.error('Hubo un error al eliminar el hábito:', error));
    }
  }

  const handleEditHabit = (habit) => {
    navigate(`/habit/${habit.id_habito}`);
    sessionStorage.setItem('editHabit', JSON.stringify(habit));
  }

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    fetch(`http://localhost:8000/habitos/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se encontraron hábitos para este usuario');
        }
        return response.json();
      })
      .then(data => setHabits(data))
      .catch(error => console.error('Hubo un error al obtener los hábitos:', error));
  }, []);

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
        <Typography variant="h6" className={classes.spacer}></Typography>
        <Button
          color="inherit"
          startIcon={<AddIcon />}
          onClick={() => {
            sessionStorage.removeItem('editHabit');
            navigate('/habit/new');
          }}
        >
          Nuevo Hábito
        </Button>
      </Toolbar>
    </AppBar>
    <Container component="main" maxWidth="md">
      <div className={classes.root}>
        
        <Typography component="h1" variant="h5" className={classes.title}>
          Mis Hábitos
        </Typography>

        {habits.map((habit) => (
          <Paper key={habit.id_habito} className={classes.paper}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Checkbox
                  checked={habit.completed}
                  onChange={() => {}}
                />
                <Typography variant="h6">{habit.titulo_habito}</Typography>
                <Typography variant="body1">{habit.descripcion_habito}</Typography>
              </Grid>
              <Grid item>
                <IconButton aria-label="edit" onClick={() => handleEditHabit(habit)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteHabit(habit.id_habito)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
    </Container>
    </>
  );
}

export default HabitListPage;