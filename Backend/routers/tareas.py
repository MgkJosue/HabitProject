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

@router.get("/", response_model=List[schemas.Tarea])
def read_tareas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tareas = crud.get_tareas(db, skip=skip, limit=limit)
    return tareas
