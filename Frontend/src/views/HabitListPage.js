import React from 'react';
import { Container, Typography, Button, Grid, Paper, IconButton, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
}));

function HabitListPage() {
  const classes = useStyles();
  // Aquí se supone que los hábitos se obtendrían de tu backend
  const habits = [
    {
      id: 1,
      name: 'Hábito 1',
      description: 'Descripción del hábito 1',
      completed: false,
    },
    {
      id: 2,
      name: 'Hábito 2',
      description: 'Descripción del hábito 2',
      completed: true,
    },
  ];

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.root}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Mis Hábitos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className={classes.habitList}
        >
          Nuevo Hábito
        </Button>
        {habits.map((habit) => (
          <Paper key={habit.id} className={classes.paper}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Checkbox
                  checked={habit.completed}
                  // Aquí se gestionaría el cambio de estado del hábito
                  onChange={() => {}}
                />
                <Typography variant="h6">{habit.name}</Typography>
                <Typography variant="body1">{habit.description}</Typography>
              </Grid>
              <Grid item>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
    </Container>
  );
}

export default HabitListPage;