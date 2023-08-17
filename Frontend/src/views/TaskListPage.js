import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper, IconButton, AppBar, Toolbar, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#1a222d',
  },
  appBar: {
    background: '#34b3b3',
    height: '9%',
  },
  title: {
    color: '#00ff40',
    fontSize: '2.5rem',
    marginTop: theme.spacing(8),
  },
  addButton: {
    marginRight: theme.spacing(2),
  },
  taskContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(3),
    marginTop: theme.spacing(10),
  },
  paper: {
    padding: theme.spacing(3),
    background: 'rgba(52, 179, 179, 0.2)',
    color: '#fff',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0px 0px 10px rgba(0, 255, 64, 0.8)',
      border: '2px solid #00ff40',
    },
  },
  spacer: {
    flex: 1,
  },
  footer: {
    
    position: 'fixed',  // Fija la posición del footer
    bottom: 0,          // Lo coloca en la parte inferior
    width: '100%',      // Ancho completo
    py: theme.spacing(3),
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

  const toggleTaskStatus = (task) => {
    const newStatus = task.estado_tarea === 'completada' ? 'pendiente' : 'completada';

    // Construyendo la URL con el parámetro de consulta
    const url = `http://localhost:8000/tarea/${task.id_tarea}/estado?estado=${newStatus}`;

    fetch(url, {
        method: 'PATCH'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el estado de la tarea');
        }
        return response.json();
    })
    .then(updatedTask => {
        setTasks(tasks.map(t => t.id_tarea === updatedTask.id_tarea ? updatedTask : t));
    })
    .catch(error => console.error('Hubo un error al actualizar el estado:', error));
}


  const handleEditTask = (task) => {
    navigate(`/task/${task.id_tarea}`);
    sessionStorage.setItem('editTask', JSON.stringify(task));
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
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              navigate('/main');
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.spacer}></Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            className={classes.addButton}
            onClick={() => {
              sessionStorage.removeItem('editTask');
              navigate('/task/new');
            }}
          >
            Nueva Tarea
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main">
        <Typography variant="h1" className={classes.title}>
          Mis Tareas
        </Typography>
        <div className={classes.taskContainer}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              
              <Paper key={task.id_tarea} className={classes.paper}>
                
                <Grid container alignItems="center">
                  <Grid item>
                    <Checkbox
                      checked={task.estado_tarea === 'completada'}
                      onChange={() => toggleTaskStatus(task)}
                    />
                    <Typography variant="h6">{task.titulo_tarea}</Typography>
                    <Typography variant="body1">{task.descripcion_tarea}</Typography>
                    <Typography variant="body1">{task.estado_tarea}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditTask(task)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteTask(task.id_tarea)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))
          ) : (
            <Typography variant="h6">No existen tareas</Typography>
          )}
        </div>
      </Container>
      <Box className={classes.footer} py={3}>
  <Container maxWidth="md">
    <Typography align="center" color="inherit" gutterBottom>
      © 2023 Mi App | Todos los derechos reservados |
    </Typography>
  </Container>
</Box>
    </div>
  );
}

export default TaskListPage;
