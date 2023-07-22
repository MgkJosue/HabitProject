from sqlalchemy.orm import Session
import models, schemas



#Estos son los crud para usuarios 
def get_user_by_email(db: Session, correo: str):
    return db.query(models.Usuario).filter(models.Usuario.correo == correo).first()


def create_user(db: Session, user: schemas.UsuarioCreate):
    fake_hashed_password = user.contrasena_hash 
    db_user = models.Usuario(nombre_usuario=user.nombre_usuario, correo=user.correo, contrasena_hash=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

#Estos son los crud para tareas
def get_tareas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Tarea).offset(skip).limit(limit).all()


def create_user_tarea(db: Session, tarea: schemas.TareaCreate, user_id: int):
    db_tarea = models.Tarea(**tarea.dict(), owner_id=user_id)
    db.add(db_tarea)
    db.commit()
    db.refresh(db_tarea)
    return db_tarea
