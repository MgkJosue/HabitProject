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
    db_user2 = crud.get_user_by_user(db, nombre_usuario=user.nombre_usuario)
    if db_user:
        raise HTTPException(status_code=400, detail="Correo ya registrado")
    
    if db_user2:
        raise HTTPException(status_code=400, detail="Nombre de usuario ya registrado")
    
    return crud.create_user(db=db, user=user)

# Obtener un usuario por su id
@router.get("/usuarios/{user_id}", response_model=schemas.Usuario)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_user

# Actualizar un usuario
@router.put("/usuarios/{user_id}", response_model=schemas.Usuario)
def update_user(user_id: int, user: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return crud.update_user(db=db, user=user, user_id=user_id)

# Borrar un usuario
@router.delete("/usuarios/{user_id}", response_model=schemas.Usuario)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.delete_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_user
