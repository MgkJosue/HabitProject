from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime

from schemas import EstadoTarea, EstadoHabito
from passlib.context import CryptContext

#Estos son los crud para usuarios 
def get_user_by_email(db: Session, correo: str):
    try:
        return db.query(models.Usuario).filter(models.Usuario.correo == correo).first()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_user_by_user(db: Session, nombre_usuario: str):
    try:
        return db.query(models.Usuario).filter(models.Usuario.nombre_usuario == nombre_usuario).first()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))
    

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(db: Session, user: schemas.UsuarioCreate):
    try:
        hashed_password = pwd_context.hash(user.contrasena_hash)
        db_user = models.Usuario(nombre_usuario=user.nombre_usuario, correo=user.correo, contrasena_hash=hashed_password, fecha_creacion=datetime.now())
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_user(db: Session, user_id: int):
    try:
        return db.query(models.Usuario).filter(models.Usuario.id_usuario == user_id).first()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_user(db: Session, user: schemas.UsuarioCreate, user_id: int):
    try:
        db_user = db.query(models.Usuario).filter(models.Usuario.id_usuario == user_id).first()
        db_user.nombre_usuario = user.nombre_usuario
        db_user.correo = user.correo
        hashed_password = pwd_context.hash(user.contrasena_hash)  # Encripta la nueva contraseña
        db_user.contrasena_hash = hashed_password  # Asigna la contraseña encriptada
        db.commit()
        db.refresh(db_user)
        return db_user
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))


def delete_user(db: Session, user_id: int):
    try:
        db_user = db.query(models.Usuario).filter(models.Usuario.id_usuario == user_id).first()
        if db_user is not None:
            db.delete(db_user)
            db.commit()
        return db_user
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# CRUD functions for tareas

def get_tareas(db: Session, skip: int = 0, limit: int = 100):
    try:
        return db.query(models.Tarea).offset(skip).limit(limit).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))
    

def get_tareas_by_user_id(db: Session, user_id: int):
    try:
        return db.query(models.Tarea).filter(models.Tarea.id_usuario == user_id).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))


def create_user_tarea(db: Session, tarea: schemas.TareaCreate, user_id: int):
    try:
        db_tarea = models.Tarea(**tarea.dict())
        db_tarea.fecha_creacion_tarea = datetime.now()
        db_tarea.estado_tarea = EstadoTarea.pendiente.value  # Use .value to get the string representation
        db.add(db_tarea)
        db.commit()
        db.refresh(db_tarea)
        return db_tarea
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))



def get_tarea(db: Session, id: int):
    try:
        return db.query(models.Tarea).filter(models.Tarea.id_tarea == id).first()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_tarea(db: Session, tarea: schemas.TareaCreate, id: int):
    try:
        db_tarea = db.query(models.Tarea).filter(models.Tarea.id_tarea == id).first()
        if tarea.estado_tarea not in EstadoTarea:
            raise HTTPException(status_code=400, detail="Estado de tarea inválido")
        db_tarea.titulo_tarea = tarea.titulo_tarea
        db_tarea.descripcion_tarea = tarea.descripcion_tarea
        db_tarea.fecha_creacion_tarea = datetime.now()
        db_tarea.fecha_vencimiento_tarea = tarea.fecha_vencimiento_tarea
        db_tarea.estado_tarea = tarea.estado_tarea.value  # Use .value to get the string representation
        db.commit()
        db.refresh(db_tarea)
        return db_tarea
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))



def delete_tarea(db: Session, id: int):
    try:
        db_tarea = db.query(models.Tarea).filter(models.Tarea.id_tarea == id).first()
        db.delete(db_tarea)
        db.commit()
        return db_tarea
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))


#Estos son los crud para habitos
def get_habito(db: Session, skip: int = 0, limit: int = 100):
    try:
        return db.query(models.Habito).offset(skip).limit(limit).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_habito(db: Session, habito: schemas.HabitoCreate):
    try:
        # Set the creation date and habit status when a habit is created
        db_habito = models.Habito(fecha_creacion_habito=datetime.now(), estado_habito=EstadoHabito.en_progreso.value, **habito.dict())
        db.add(db_habito)
        db.commit()
        db.refresh(db_habito)
        return db_habito
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_habito_by_id(db: Session, id_habito: int):
    try:
        return db.query(models.Habito).filter(models.Habito.id_habito == id_habito).first()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_habito(db: Session, habito: schemas.HabitoUpdate, id_habito: int):
    try:
        db_habito = db.query(models.Habito).filter(models.Habito.id_habito == id_habito).first()
        if db_habito is None:
            return None
        # Ensure that the habit status is updated between the two available states
        if db_habito.estado_habito == EstadoHabito.en_progreso.value:
            db_habito.estado_habito = EstadoHabito.cumplido.value
        else:
            db_habito.estado_habito = EstadoHabito.en_progreso.value
        db_habito.titulo_habito = habito.titulo_habito
        db_habito.descripcion_habito = habito.descripcion_habito
        db.commit()
        db.refresh(db_habito)
        return db_habito
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def delete_habito(db: Session, id_habito: int):
    try:
        db_habito = db.query(models.Habito).filter(models.Habito.id_habito == id_habito).first()
        if db_habito is None:
            return None
        db.delete(db_habito)
        db.commit()
        return db_habito
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))


#Estos son los crud para progresos
# CRUD functions for Progresossds

def get_progreso(db: Session, skip: int = 0, limit: int = 100):
    try:
        return db.query(models.Progreso).offset(skip).limit(limit).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_progreso(db: Session, progreso: schemas.ProgresoCreate):
    try:
        db_progreso = models.Progreso(**progreso.dict())
        db.add(db_progreso)
        db.commit()
        db.refresh(db_progreso)
        return db_progreso
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_progreso_by_id(db: Session, id: int):
    try:
        return db.query(models.Progreso).filter(models.Progreso.id_progreso == id).first()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_progreso(db: Session, progreso: schemas.ProgresoCreate, id: int):
    try:
        db_progreso = db.query(models.Progreso).filter(models.Progreso.id_progreso == id).first()
        db_progreso.id_tarea = progreso.id_tarea
        db_progreso.id_habito = progreso.id_habito
        db.commit()
        db.refresh(db_progreso)
        return db_progreso
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))

def delete_progreso(db: Session, id: int):
    try:
        db_progreso = db.query(models.Progreso).filter(models.Progreso.id_progreso == id).first()
        if db_progreso is not None:
            db.delete(db_progreso)
            db.commit()
        return db_progreso
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))
