from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import schemas
from crud import get_progreso, create_progreso, get_progreso_by_id, update_progreso, delete_progreso


#so
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/progresos/", response_model=List[schemas.Progreso])
def read_progresos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    progresos = get_progreso(db, skip=skip, limit=limit)
    return progresos

@router.post("/progresos/", response_model=schemas.Progreso)
def create_user_progreso(progreso: schemas.ProgresoCreate, db: Session = Depends(get_db)):
    return create_progreso(db=db, progreso=progreso)

@router.get("/progresos/{id}", response_model=schemas.Progreso)
def read_progreso(id: int, db: Session = Depends(get_db)):
    db_progreso = get_progreso_by_id(db, id=id)
    if db_progreso is None:
        raise HTTPException(status_code=404, detail="Progreso no encontrado")
    return db_progreso

@router.put("/progresos/{id}", response_model=schemas.Progreso)
def actualizar_progreso(id: int, progreso:schemas.ProgresoCreate, db: Session = Depends(get_db)):
    db_progreso = update_progreso(db, progreso, id=id)
    if db_progreso is None:
        raise HTTPException(status_code=404, detail="Progreso no encontrado")
    return db_progreso

@router.delete("/progresos/{id}", response_model=schemas.Progreso)
def borrar_progreso(id: int, db: Session = Depends(get_db)):
    db_progreso = delete_progreso(db, id=id)
    if db_progreso is None:
        raise HTTPException(status_code=404, detail="Progreso no encontrado")
    return db_progreso