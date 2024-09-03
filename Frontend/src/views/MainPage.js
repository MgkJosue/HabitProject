import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f4f5f7',
    minHeight: '100vh',
  },
  appBar: {
    backgroundColor: '#3f51b5',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainContent: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    marginTop: theme.spacing(12), // Ajuste para bajar el contenido
  },
  card: {
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    textAlign: 'center',
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      fetch(`/usuarios/${userId}`)
        .then((response) => response.json())
        .then((data) => setUsername(data.nombre))
        .catch((error) => console.error('Error:', error));
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate('/profile')}>Perfil</MenuItem>
            <MenuItem onClick={() => navigate('/progress')}>Progresos</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            Gestor de Hábitos y Tareas
          </Typography>
          <Button color="inherit" onClick={logout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.mainContent}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper className={classes.card}>
              <Typography variant="h4">
                Bienvenido a tu Gestor de Hábitos y Tareas, {username}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Organiza tu vida y mejora tus hábitos con nuestro gestor.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.card}>
              <Typography variant="h5">Tus Tareas</Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => navigate('/task-list')}
              >
                Ver Tareas
              </Button>
              <img
                src={require('../img/Login12.jpeg')}
                alt="Imagen Tareas"
                style={{ marginTop: '20px', width: '100%', borderRadius: '8px' }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.card}>
              <Typography variant="h5">Tus Hábitos</Typography>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => navigate('/habit-list')}
              >
                Ver Hábitos
              </Button>
              <img
                src={require('../img/Habito.jpeg')}
                alt="Imagen Habitos"
                style={{ marginTop: '20px', width: '100%', borderRadius: '4px' }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
