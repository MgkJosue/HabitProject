from fastapi import FastAPI
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from routers.tareas import router as tareas_router
from routers.usuarios import router as usuarios_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite solicitudes de todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todas las cabeceras
)


app.include_router(usuarios_router)
app.include_router(tareas_router)