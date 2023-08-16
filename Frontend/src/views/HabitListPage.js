import React from 'react';
import { Container, Typography, Button, Grid, Paper, IconButton, AppBar, Toolbar, Box, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    background: '#1a222d',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  },
  habitList: {
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
  habitContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
  },
  gridContainer: {
    marginTop: theme.spacing(3),
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
    <div className={classes.root}>
      <Container component="main" className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">Mis Hábitos</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              className={classes.habitList}
            >
              Nuevo Hábito
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} className={classes.gridContainer}>
          {habits.map((habit) => (
            <Grid key={habit.id} item xs={12} sm={6} md={4}>
              <Paper className={classes.paper}>
                <div className={classes.habitContainer}>
                  <Checkbox
                    checked={habit.completed}
                    // Aquí se gestionaría el cambio de estado del hábito
                    onChange={() => {}}
                  />
                  <Typography variant="h6">{habit.name}</Typography>
                  <Typography variant="body1">{habit.description}</Typography>
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

export default HabitListPage;
