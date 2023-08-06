import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import { useNavigate } from 'react-router-dom';

import backgroundImage from '../img/sunrise-g96940d752_1280.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
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
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: '#FFFFFF', // Cambiar el color a blanco
  },
}));

function TaskListPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const deleteTask = (taskId) => {
    if(window.confirm('¿Estás seguro que deseas eliminar esta tarea?')) {
      fetch(`http://localhost:8000/tarea/${taskId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar la tarea');
        }
        // Actualiza la lista de tareas en el estado del componente
        setTasks(tasks.filter(task => task.id_tarea !== taskId));
      })
      .catch(error => console.error('Hubo un error al eliminar la tarea:', error));
    }
  }


  
  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    fetch(`http://localhost:8000/tareas/${userId}`) // Cambia la URL si es necesario
      .then(response => {
        if (!response.ok) {
          throw new Error('No se encontraron tareas para este usuario');
        }
        return response.json();
      })
      .then(data => setTasks(data))
      .catch(error => console.error('Hubo un error al obtener las tareas:', error));
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.root}>
        <Typography component="h1" variant="h7" className={classes.title}>
          Mis Tareas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className={classes.addButton}
          onClick={() => navigate('/task')}
        >
          Nueva Tarea
        </Button>
        <div className={classes.taskContainer}>
          {tasks.length > 0 ? tasks.map((task) => (
            <Paper key={task.id_tarea} className={classes.paper}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Checkbox
                    checked={task.estado_tarea === 'completado'} // Esto asume que 'completado' es el estado para una tarea terminada.
                    onChange={() => {}}
                  />
                  <Typography variant="h6">{task.titulo_tarea}</Typography>
                  <Typography variant="body1">{task.descripcion_tarea}</Typography>
                </Grid>
                <Grid item>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => deleteTask(task.id_tarea)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper> )) : <Typography variant="h6">No existen tareas</Typography>}
        </div>
      </div>
    </Container>
  );
}

export default TaskListPage;