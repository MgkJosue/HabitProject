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

@router.post("/usuarios", response_model=schemas.Usuario)
def create_user(user: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, correo=user.correo)
    if db_user:
        raise HTTPException(status_code=400, detail="Correo ya registrado")
    return crud.create_user(db=db, user=user)
