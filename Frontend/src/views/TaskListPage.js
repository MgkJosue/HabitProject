import React from 'react';
import { Container, Typography, Button, Grid, Paper, IconButton, AppBar, Toolbar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    background: '#1a222d',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  },
  taskList: {
    marginTop: theme.spacing(6),
  },
  paper: {
    padding: theme.spacing(3),
    margin: '10px 0',
    background: 'rgba(52, 179, 179, 0.2)', // Cambia el color de fondo a transparente verdoso
    color: '#fff',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0px 0px 10px rgba(0, 255, 64, 0.8)',
      border: '2px solid #00ff40',
    },
  },
  appBar: {
    background: '#34b3b3',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  taskContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
  },
  gridContainer: {
    marginTop: theme.spacing(3),
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
    
  ];

  return (
    <div className={classes.root}>
      <Container component="main" className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">Mis Tareas</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              className={classes.taskList}
            >
              Nueva Tarea
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} className={classes.gridContainer}>
          {tasks.map((task) => (
            <Grid key={task.id} item xs={12} sm={6} md={4}>
              <Paper className={classes.paper}>
                <div className={classes.taskContainer}>
                  <Checkbox
                    checked={task.completed}
                    // Aquí se gestionaría el cambio de estado de la tarea
                    onChange={() => {}}
                  />
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body1">{task.description}</Typography>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box bgcolor="secondary.main" color="secondary.contrastText" py={3}>
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