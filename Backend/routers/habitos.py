# routers/habitos.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import schemas
from crud import get_habito, create_habito, get_habitos_by_user_id, update_habito, delete_habito, change_habito_estado
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/habitos/", response_model=List[schemas.Habito])
def read_habitos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    habitos = get_habito(db, skip=skip, limit=limit)
    return habitos


@router.post("/habitos/", response_model=schemas.Habito)
def create_habitos(habito: schemas.HabitoCreate, db: Session = Depends(get_db)):
    try:
        return create_habito(db=db, habito=habito)
    except SQLAlchemyError as e:
        # Aquí puedes agregar el código para manejar los errores de base de datos
        # Tal vez quieras hacer logging de e.orig o e.statement para más detalles
        raise HTTPException(status_code=400, detail="Error en la base de datos al crear el habito") from e
    except ValidationError as e:
        # Aquí puedes manejar los errores de validación de datos
        raise HTTPException(status_code=400, detail="Invalid data") from e
    except Exception as e:
        # Este es un capturador genérico de excepciones, es útil, pero es mejor manejar los errores específicos en sus propios bloques except
        raise HTTPException(status_code=500, detail="Unexpected error") from e


# Obtener un hábito por su ID
@router.get("/habitos/{user_id}", response_model=List[schemas.Habito])
def leer_habitos_por_usuario(user_id: int, db: Session = Depends(get_db)):
    habitos = get_habitos_by_user_id(db, user_id=user_id)
    if not habitos:
        raise HTTPException(status_code=404, detail="No se encontraron habitos para este usuario")
    return habitos



# Actualizar un hábito
@router.put("/habitos/{id_habito}", response_model=schemas.Habito)
def actualizar_habito(id_habito: int, habito: schemas.HabitoUpdate, db: Session = Depends(get_db)):
    updated_habito = update_habito(db, habito=habito, id_habito=id_habito)
    if updated_habito is None:
        raise HTTPException(status_code=404, detail="Habito no encontrado")
    return updated_habito


# Borrar un hábito
@router.delete("/habitos/{id_habito}", response_model=schemas.Habito)
def borrar_habito(id_habito: int, db: Session = Depends(get_db)):
    deleted_habito = delete_habito(db, id_habito=id_habito)
    if deleted_habito is None:
        raise HTTPException(status_code=404, detail="Habito no encontrado")
    return deleted_habito


@router.patch("/habito/{id}/estado", response_model=schemas.Habito)
def actualizar_estado_habito(id: int, estado: schemas.EstadoHabito, db: Session = Depends(get_db)):
    db_habito = get_habito(db, id)
    if db_habito is None:
        raise HTTPException(status_code=404, detail="Habito no encontrado")
    return change_habito_estado(db=db, habito=db_habito, estado=estado)