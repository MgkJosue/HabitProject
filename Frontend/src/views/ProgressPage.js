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
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Importando componentes de Recharts
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

// Importar la imagen local
import backgroundImage from '../img/Dispersion-con-regresion.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
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
    borderRadius: '100%',
    overflow: 'hidden',
    height: '100%',
    flex: 1,
  },
  image: {
    width: '80%',
    height: 'auto',
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1,
  },
  contentContainer: {
    marginTop: theme.spacing(8), // Añade un margen superior para mover el contenido hacia abajo
    textAlign: 'center',
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
  ];

  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" style={{ height: '100%' }}>
        <Grid container spacing={3} style={{ height: '100%', display: 'flex' }}>
          <Grid item xs={6}>
            <Paper className={classes.paper} style={{ height: '100%' }}>
              <div className={classes.contentContainer}>
                <Typography variant="h2">Tu Progreso</Typography>
                <Typography variant="body3">
                  Aquí puedes ver tu progreso en tareas y hábitos
                </Typography>
              </div>
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
