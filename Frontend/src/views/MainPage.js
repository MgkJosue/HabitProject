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
  Container,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#d1d0e0',
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
  menu: {
    marginTop: '50px',
    width: '200px',
    background: theme.palette.primary.main,
  },
  menuItem: {
    color: theme.palette.common.white,
  },
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footer: {
    marginTop: 'auto',
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
      <AppBar position="static">
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
            classes={{ paper: classes.menu }}
          >
            <MenuItem
              className={classes.menuItem}
              onClick={() => navigate('/profile')}
            >
              Perfil
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => navigate('/progress')}
            >
              Progresos
            </MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            Gestor de Hábitos y Tareas
          </Typography>
          <Button color="inherit" onClick={logout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.pageWrapper}>
        <Container class="cont1">
        <h1>Hola Mndo</h1>
        </Container>
        <Container class="cont2">
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h4">
                    Bienvenido a tu Gestor de Hábitos y Tareas, {username}
                  </Typography>
                  <Typography variant="body1">
                    Organiza tu vida y mejora tus hábitos con nuestro gestor
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h5">Tus Tareas</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/task-list')}
                  >
                    Ver Tareas
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h5">Tus Hábitos</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/habit-list')}
                  >
                    Ver Hábitos
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h5">Tus Hábitos</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/habit-list')}
                  >
                    Ver Hábitos
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h5">Tus Hábitos</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/habit-list')}
                  >
                    Ver Hábitos
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </div>
      <footer>
        <Container
          className={classes.footer}
          bgcolor="secondary.main"
          color="secondary.contrastText"
        >
          <Container maxWidth="md">
            <Typography align="center" color="inherit" gutterBottom>
              © 2023 Mi App | Todos los derechos reservados |
            </Typography>
          </Container>
        </Container>
      </footer>
    </div>
  );
}