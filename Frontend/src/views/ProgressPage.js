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

// Importar la imagen local
import backgroundImage from '../img/gif1.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh', // Ajustar el contenedor principal al 100% del alto de la pantalla
    display: 'flex',
    flexDirection: 'column', // Alinear los elementos en columna
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
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%', // Agrega bordes redondeados al contenedor
    overflow: 'hidden',
    height: '100%', // Para que la imagen no se salga de los bordes redondeados
    flex: 1, // Ocupar todo el espacio vertical disponible
  },
  image: {
    width: '80%', // Ajustar el ancho de la imagen al 100% del contenedor
    height: 'auto', // Ajustar la altura de la imagen automáticamente
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // El gráfico ocupará toda la altura del contenedor
    flex: 1, // Ocupar todo el espacio vertical disponible
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

      <Container maxWidth="xl" style={{ height: '100%' }}>
        <Grid container spacing={3} style={{ height: '100%', display: 'flex' }}>
          <Grid item xs={6}>
            <Paper className={classes.paper} style={{ height: '100%' }}>
              <Typography variant="h4">Tu Progreso</Typography>
              <Typography variant="body1">
                Aquí puedes ver tu progreso en tareas y hábitos
              </Typography>
              <div className={classes.chartContainer}>
                <LineChart width={550} height={550} data={data}>
                  <Line type="monotone" dataKey="Tareas" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Hábitos" stroke="#82ca9d" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </LineChart>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} style={{ height: '100%' }}>
              <Typography variant="h4">Mejora tus hábitos</Typography>
              {/* Mostrar la imagen aquí */}
              <div className={classes.imageContainer}>
                <img src={backgroundImage} alt="Mejora tus hábitos" className={classes.image} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}