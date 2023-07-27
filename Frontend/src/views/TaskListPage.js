import React from 'react';
import { Container, Typography, Button, Grid, Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

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
    backgroundColor: '#000000',// Asegura que el fondo cubra toda la pantalla
  },
  taskContainer: {
    maxHeight: '430px',
    overflowY: 'auto',
    width: '50%',
    marginTop: theme.spacing(8),
    borderRadius: '10px', // Agregar el borde redondeado al contenedor
  },
  paper: {
    padding: theme.spacing(2),
    margin: '10px 0',
    backgroundColor: '#d1d0e0', // Color celeste pastel (ajusta según tus preferencias)
  },
  addButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(2),
  },
}));

function TaskListPage() {
  const classes = useStyles();
  // Aquí se supone que las tareas se obtendrían de tu backend
  const tasks = [
    {
      id: 1,
      title: 'Tarea 1',
      description: 'Descripción de la tarea 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Tarea 2',
      description: 'Descripción de la tarea 2',
      completed: true,
    },
    {
      id: 2,
      title: 'Tarea 2',
      description: 'Descripción de la tarea 2',
      completed: true,
    },
    {
      id: 2,
      title: 'Tarea 2',
      description: 'Descripción de la tarea 2',
      completed: true,
    },
    {
      id: 2,
      title: 'Tarea 2',
      description: 'Descripción de la tarea 2',
      completed: true,
    },
    {
      id: 2,
      title: 'Tarea 2',
      description: 'Descripción de la tarea 2',
      completed: true,
    },
    {
      id: 2,
      title: 'Tarea 2',
      description: 'Descripción de la tarea 2',
      completed: true,
    },
    
    // Agrega más tareas aquí si es necesario
  ];

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.root}>
        <Typography component="h1" variant="h7">
          Mis Tareas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className={classes.addButton}
        >
          Nueva Tarea
        </Button>
        <div className={classes.taskContainer}>
          {tasks.map((task) => (
            <Paper key={task.id} className={classes.paper}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => {}}
                  />
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body1">{task.description}</Typography>
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
      </div>
    </Container>
  );
}
export default TaskListPage;