from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from authenticate import *
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
     
    
    user_email = crud.get_user_by_email(db, correo=user.correo)
    user_user = crud.get_user_by_user(db, nombre_usuario=user.nombre_usuario)
    if user_email:
        raise HTTPException(status_code=400, detail="Correo ya registrado")

    if user_user:
        raise HTTPException(status_code=400, detail="Nombre de usuario ya registrado")
    
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

@router.post("/login", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # If correct, create a new token and return it
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.nombre_usuario, "user_id": user.id_usuario}, 
        expires_delta=access_token_expires
        )
    
    return {"access_token": access_token, "token_type": "bearer",  "user_id": user.id_usuario}
