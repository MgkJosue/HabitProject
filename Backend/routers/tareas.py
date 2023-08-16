from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import schemas, crud
from database import SessionLocal

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/tareas/", response_model=List[schemas.Tarea])
def leer_tareas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tareas = crud.get_tareas(db, skip=skip, limit=limit)
    return tareas

@router.get("/tareas/{user_id}", response_model=List[schemas.Tarea])
def leer_tareas_por_usuario(user_id: int, db: Session = Depends(get_db)):
    tareas = crud.get_tareas_by_user_id(db, user_id=user_id)
    if not tareas:
        raise HTTPException(status_code=404, detail="No se encontraron tareas para este usuario")
    return tareas


@router.post("/tarea/", response_model=schemas.Tarea)
def crear_tarea(tarea: schemas.TareaCreate, db: Session = Depends(get_db)):
    return crud.create_user_tarea(db=db, tarea=tarea, user_id=tarea.id_usuario)

@router.put("/tarea/{id}", response_model=schemas.Tarea)
def actualizar_tarea(id: int, tarea: schemas.TareaCreate, db: Session = Depends(get_db)):
    db_tarea = crud.get_tarea(db, id)
    if db_tarea is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return crud.update_tarea(db=db, tarea=tarea, id=id)

@router.delete("/tarea/{id}", response_model=schemas.Tarea)
def borrar_tarea(id: int, db: Session = Depends(get_db)):
    db_tarea = crud.get_tarea(db, id)
    if db_tarea is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return crud.delete_tarea(db=db, id=id)

@router.patch("/tarea/{id}/estado", response_model=schemas.Tarea)
def actualizar_estado_tarea(id: int, estado: schemas.EstadoTarea, db: Session = Depends(get_db)):
    db_tarea = crud.get_tarea(db, id)
    if db_tarea is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return crud.change_tarea_estado(db=db, tarea=db_tarea, estado=estado)
