import React from 'react';
import { Container, Typography, Button, Grid, Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  taskList: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: '10px 0',
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
  ];

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Mis Tareas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className={classes.taskList}
        >
          Nueva Tarea
        </Button>
        {tasks.map((task) => (
          <Paper key={task.id} className={classes.paper}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Checkbox
                  checked={task.completed}
                  // Aquí se gestionaría el cambio de estado de la tarea
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
    </Container>
  );
}

export default TaskListPage;
