import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  Box,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5", // Fondo claro
  },
  title: {
    color: "black", // Título en negro
    fontSize: "2.5rem",
    fontFamily: "'Roboto', sans-serif",
    marginTop: theme.spacing(10),
  },
  paper: {
    padding: theme.spacing(3),
    margin: "10px 0",
    background: "#263238", // Fondo de tarjeta oscuro
    color: "#ffffff",
    borderRadius: "8px", // Bordes redondeados
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.3)", // Sombra
    border: "1px solid #00695c", // Borde similar al borde de la imagen
  },
  appBar: {
    background: "#00695c", // Fondo verde para la barra superior
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  gridContainer: {
    width: "100%",
    padding: theme.spacing(2),
  },
  centerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "#263238", // Fondo del footer oscuro
    color: "#ffffff", // Texto en blanco
    padding: theme.spacing(2),
    textAlign: "center",
  },
  spacer: {
    flex: 1,
  },
}));

function HabitListPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    fetch(`http://localhost:8000/habitos/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se encontraron hábitos para este usuario");
        }
        return response.json();
      })
      .then((data) => setHabits(data))
      .catch((error) =>
        console.error("Hubo un error al obtener los hábitos:", error)
      );
  }, []);

  const toggleHabitStatus = (habit) => {
    const newStatus =
      habit.estado_habito === "cumplido" ? "en progreso" : "cumplido";
    const url = `http://localhost:8000/habito/${habit.id_habito}/estado?estado=${newStatus}`;

    fetch(url, {
      method: "PATCH",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el estado del hábito");
        }
        return response.json();
      })
      .then((updatedHabit) => {
        setHabits(
          habits.map((t) =>
            t.id_habito === updatedHabit.id_habito ? updatedHabit : t
          )
        );
      })
      .catch((error) =>
        console.error("Hubo un error al actualizar el estado:", error)
      );
  };

  const deleteHabit = (habitId) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este hábito?")) {
      fetch(`http://localhost:8000/habitos/${habitId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el hábito");
          }
          setHabits(habits.filter((habit) => habit.id_habito !== habitId));
        })
        .catch((error) =>
          console.error("Hubo un error al eliminar el hábito:", error)
        );
    }
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/main")}
          >
            <ArrowBackIcon />
          </IconButton>
          <div className={classes.spacer}></div>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => {
              sessionStorage.removeItem("editHabit");
              navigate("/habit/new");
            }}
          >
            Nuevo Hábito
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Mis Hábitos
        </Typography>

        <Grid container spacing={3} className={classes.gridContainer}>
          {habits.map((habit) => (
            <Grid key={habit.id_habito} item xs={12} sm={6} md={4}>
              <Paper className={classes.paper}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Checkbox
                      checked={habit.estado_habito === "cumplido"}
                      onChange={() => toggleHabitStatus(habit)}
                    />
                    <Typography variant="h6" style={{ color: "#ffffff" }}>
                      {habit.titulo_habito}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#b0bec5" }}>
                      {habit.descripcion_habito}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#b0bec5" }}>
                      {habit.estado_habito}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="edit"
                      onClick={() => navigate(`/habit/${habit.id_habito}`)}
                      style={{ color: "#ffffff" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteHabit(habit.id_habito)}
                      style={{ color: "#ffffff" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>

      <Box className={classes.footer}>
        <Typography variant="body2">
          © 2023 Mi App | Todos los derechos reservados |
        </Typography>
      </Box>
    </>
  );
}

export default HabitListPage;
