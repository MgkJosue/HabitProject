import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" style={{ backgroundColor: '#00ff40' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Gestor de Tareas y Hábitos
          </Typography>
          <Button variant="contained" color="secondary" component={RouterLink} to="/login">
            Iniciar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Box className="caja2" style={{ textAlign: 'center', opacity: 0, transform: 'translateY(20px)', animation: 'appearAnimation 1s forwards' }}>
          <Container>
            <Typography
              variant="h2"
              gutterBottom
              className="glowing-text"
            >
              Organiza tus tareas y mejora tus hábitos
            </Typography>
            <Typography variant="body1" paragraph>
              Nuestro gestor te permite llevar un control de tus tareas y hábitos de una forma fácil y segura. Olvídate de las listas de papel y únete a nuestra plataforma!
            </Typography>
          </Container>
        </Box>
        <Box className="caja1" style={{ textAlign: 'center' }}>
          <Container>
            <Box className="boxItem" display="flex" flexDirection="column" alignItems="center" mb={1}>
              <ListIcon style={{ fontSize: 60 }} />
              <Typography variant="h6">Gestión de Tareas</Typography>
              <Typography>Administra tus tareas de forma eficiente, sin necesidad de usar papel.</Typography>
            </Box>
            <Box className="boxItem" display="flex" flexDirection="column" alignItems="center" mb={1}>
              <DoneAllIcon style={{ fontSize: 60 }} />
              <Typography variant="h6">Seguimiento de Hábitos</Typography>
              <Typography>Lleva un registro de tus hábitos y ve tu progreso a lo largo del tiempo.</Typography>
            </Box>
            <Box className="boxItem" display="flex" flexDirection="column" alignItems="center" mb={1}>
              <TrendingUpIcon style={{ fontSize: 60 }} />
              <Typography variant="h6">Análisis de Productividad</Typography>
              <Typography>Nuestra aplicación genera análisis para que puedas optimizar tu productividad.</Typography>
            </Box>
          </Container>
        </Box>
      </div>
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
      <style>
        {`
          @keyframes appearAnimation {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .boxItem {
            transition: transform 0.3s, opacity 0.3s;
          }
          .boxItem:hover {
            transform: translateY(-10px);
            opacity: 0.8;
          }

          .glowing-text {
            position: relative;
            display: inline-block;
            cursor: pointer;
          }

          .glowing-text:hover {
            animation: glowAnimation 1.5s infinite;
          }

          @keyframes glowAnimation {
            0%, 100% {
              color: white;
              text-shadow: none;
            }
            50% {
              color: #00ff40;
              text-shadow: 0 0 10px rgba(0, 255, 64, 0.8), 0 0 20px rgba(0, 255, 64, 0.8), 0 0 30px rgba(0, 255, 64, 0.8);
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
