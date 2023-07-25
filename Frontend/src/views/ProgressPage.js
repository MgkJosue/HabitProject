import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Paper,
  Container,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
// Importando componentes de Recharts
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ProgressPage() {
  const classes = useStyles();
  // Datos de ejemplo para los gráficos
  const data = [
    { name: 'Lunes', Tareas: 5, Hábitos: 3 },
    { name: 'Martes', Tareas: 4, Hábitos: 2 },
    { name: 'Miércoles', Tareas: 2, Hábitos: 2 },
    { name: 'Jueves', Tareas: 2, Hábitos: 7 },
    { name: 'Viernes', Tareas: 3, Hábitos: 2 },
    { name: 'Sabado', Tareas: 5, Hábitos: 5 },
    { name: 'Domingo', Tareas: 4, Hábitos: 6 },
    // Añade más datos aquí...
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Gestor de Hábitos y Tareas
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4">Tu Progreso</Typography>
              <Typography variant="body1">
                Aquí puedes ver tu progreso en tareas y hábitos
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Progreso de Tareas y Hábitos</Typography>
              <LineChart width={500} height={300} data={data}>
                <Line type="monotone" dataKey="Tareas" stroke="#8884d8" />
                <Line type="monotone" dataKey="Hábitos" stroke="#82ca9d" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
