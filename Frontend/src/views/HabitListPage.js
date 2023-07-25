import React from 'react';
import { Container, Typography, Button, Grid, Paper, IconButton, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  habitList: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: '10px 0',
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
        <Typography component="h1" variant="h5">
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
