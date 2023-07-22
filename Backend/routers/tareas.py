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
def read_tareas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tareas = crud.get_tareas(db, skip=skip, limit=limit)
    return tareas

@router.post("/tarea/", response_model=schemas.Tarea)
def create_tarea(tarea: schemas.TareaCreate, db: Session = Depends(get_db)):
    return crud.create_user_tarea(db=db, tarea=tarea, user_id=tarea.id_usuario)

@router.put("/tarea/{id}", response_model=schemas.Tarea)
def update_tarea(id: int, tarea: schemas.TareaCreate, db: Session = Depends(get_db)):
    db_tarea = crud.get_tarea(db, id)
    if db_tarea is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return crud.update_tarea(db=db, tarea=tarea, id=id)

@router.delete("/tarea/{id}", response_model=schemas.Tarea)
def delete_tarea(id: int, db: Session = Depends(get_db)):
    db_tarea = crud.get_tarea(db, id)
    if db_tarea is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return crud.delete_tarea(db=db, id=id)