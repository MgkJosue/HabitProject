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
    background: '#121212',
  },
  appBar: {
    background: '#009688',
    height: '9%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: '2.5rem',
    marginTop: theme.spacing(10),
  },
  addButton: {
    marginRight: theme.spacing(2),
    color: '#FFFFFF',
  },
  taskContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(3),
    background: '#263238',
    color: '#FFFFFF',
    borderRadius: '8px',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0px 4px 20px rgba(0, 150, 136, 0.8)',
    },
  },
  iconButton: {
    color: '#FFFFFF',
    '&:hover': {
      color: '#009688',
    },
  },
  spacer: {
    flex: 1,
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: '#263238',
    padding: theme.spacing(2, 0),
    color: '#FFFFFF',
  },
}));

function TaskListPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);

  const deleteTask = (taskId) => {
    if (window.confirm('¿Estás seguro que deseas eliminar esta tarea?')) {
      fetch(`http://localhost:8000/tarea/${taskId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
          }
          setTasks(tasks.filter(task => task.id_tarea !== taskId));
        })
        .catch(error => console.error('Hubo un error al eliminar la tarea:', error));
    }
  }

  const toggleTaskStatus = (task) => {
    const newStatus = task.estado_tarea === 'completada' ? 'pendiente' : 'completada';
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
    fetch(`http://localhost:8000/tareas/${userId}`)
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
            onClick={() => navigate('/main')}
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
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Checkbox
                      checked={task.estado_tarea === 'completada'}
                      onChange={() => toggleTaskStatus(task)}
                      color="primary"
                    />
                    <Typography variant="h6">{task.titulo_tarea}</Typography>
                    <Typography variant="body2">{task.descripcion_tarea}</Typography>
                    <Typography variant="caption">{task.estado_tarea}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditTask(task)}
                      className={classes.iconButton}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteTask(task.id_tarea)}
                      className={classes.iconButton}
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
      <Box className={classes.footer}>
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
