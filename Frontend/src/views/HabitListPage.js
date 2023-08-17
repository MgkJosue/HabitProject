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
    background: "#1a222d",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
  },
  title: {
    color: "#00ff40",
    fontSize: "2.5rem", // Ajusta el tamaño del título
    marginTop: theme.spacing(1), // Agrega un margen superior
  },
  
  
  habitList: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    margin: "10px 0",
    background: "rgba(52, 179, 179, 0.2)", // Cambia el color de fondo a transparente verdoso
    color: "#fff",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0px 0px 10px rgba(0, 255, 64, 0.8)",
      border: "2px solid #00ff40",
    },
  },
  appBar: {
    background: "#34b3b3",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  habitContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexGrow: 1,
  },
  gridContainer: {
    marginTop: theme.spacing(2),
  },
  centerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  footer: {
    
    position: 'fixed',  // Fija la posición del footer
    bottom: 0,          // Lo coloca en la parte inferior
    width: '100%',      // Ancho completo
    py: theme.spacing(3),
  },
  spacer: {
    flex: 1,
  },
}));

function HabitListPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [habits, setHabits] = useState([]);

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

  const handleEditHabit = (habit) => {
    navigate(`/habit/${habit.id_habito}`);
    sessionStorage.setItem("editHabit", JSON.stringify(habit));
  };

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

    // Construyendo la URL con el parámetro de consulta
    const url = `http://localhost:8000/habito/${habit.id_habito}/estado?estado=${newStatus}`;

    fetch(url, {
      method: "PATCH",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el estado del habito");
        }
        return response.json();
      })
      .then((updatedhabit) => {
        setHabits(
          habits.map((t) =>
            t.id_habito === updatedhabit.id_habito ? updatedhabit : t
          )
        );
      })
      .catch((error) =>
        console.error("Hubo un error al actualizar el estado:", error)
      );
  };

  return (
    <>

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
      
      
        <div className={`${classes.root} ${classes.centerContent}`}>
        <Typography variant="h3" className={classes.title} style={{ marginLeft: '-150vh' }}>
          Mis Hábitos
        </Typography>

        <Grid container  spacing={3}>
          {habits.map((habit) => (
            <Grid key={habit.id_habito} item xs={6} sm={6} md={4}>
              <Paper className={classes.paper}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Checkbox
                      checked={habit.estado_habito === "cumplido"}
                      onChange={() => toggleHabitStatus(habit)}
                    />
                    <Typography variant="h6">{habit.titulo_habito}</Typography>
                    <Typography variant="body1">
                      {habit.descripcion_habito}
                    </Typography>
                    <Typography variant="body1">{habit.estado_habito}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditHabit(habit)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteHabit(habit.id_habito)}
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
      
      <Box className={classes.footer} py={3}>
  <Container maxWidth="md">
    <Typography align="center" color="inherit" gutterBottom>
      © 2023 Mi App | Todos los derechos reservados |
    </Typography>
  </Container>
</Box>
    </>
  );
}
export default HabitListPage;
