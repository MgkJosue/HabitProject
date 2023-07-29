import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const HomePage = () => {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Gestor de Tareas y Hábitos
          </Typography>
        </Toolbar>
      </AppBar>
      <Box bgcolor="primary.main" color="primary.contrastText" py={3}>
        <Container maxWidth="md">
          <Typography variant="h2" align="center" gutterBottom>
            Organiza tus tareas y mejora tus hábitos
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Nuestro gestor te permite llevar un control de tus tareas y hábitos de una forma fácil y segura. Olvídate de las listas de papel y únete a nuestra plataforma!
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="secondary" component={RouterLink} to="/login">Iniciar Sesión</Button>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="md" py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
              <ListIcon style={{ fontSize: 60 }} />
              <Typography variant="h6">Gestión de Tareas</Typography>
              <Typography>Administra tus tareas de forma eficiente, sin necesidad de usar papel.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
              <DoneAllIcon style={{ fontSize: 60 }} />
              <Typography variant="h6">Seguimiento de Hábitos</Typography>
              <Typography>Lleva un registro de tus hábitos y ve tu progreso a lo largo del tiempo.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
              <TrendingUpIcon style={{ fontSize: 60 }} />
              <Typography variant="h6">Análisis de Productividad</Typography>
              <Typography>Nuestra aplicación genera análisis para que puedas optimizar tu productividad.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box bgcolor="primary.main" color="primary.contrastText" py={3}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            ¿Listo para organizar tu vida?
          </Typography>
        </Container>
      </Box>
      <Box bgcolor="secondary.main" color="secondary.contrastText" py={3}>
        <Container maxWidth="md">
          <Typography align="center" color="inherit" gutterBottom>
            © 2023 Mi App | Todos los derechos reservados | 
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;
