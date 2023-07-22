from sqlalchemy.orm import Session
import models, schemas

#Estos son los crud para usuarios 
def get_user_by_email(db: Session, correo: str):
    return db.query(models.Usuario).filter(models.Usuario.correo == correo).first()

def get_user_by_user(db: Session, nombre_usuario: str):
    return db.query(models.Usuario).filter(models.Usuario.nombre_usuario == nombre_usuario).first()


def create_user(db: Session, user: schemas.UsuarioCreate):
    fake_hashed_password = user.contrasena_hash 
    db_user = models.Usuario(nombre_usuario=user.nombre_usuario, correo=user.correo, contrasena_hash=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Obtener un usuario por id
def get_user(db: Session, user_id: int):
    return db.query(models.Usuario).filter(models.Usuario.id_usuario == user_id).first()

# Actualizar un usuario
def update_user(db: Session, user: schemas.UsuarioCreate, user_id: int):
    db_user = db.query(models.Usuario).filter(models.Usuario.id_usuario == user_id).first()
    db_user.nombre_usuario = user.nombre_usuario
    db_user.correo = user.correo
    db_user.contrasena_hash = user.contrasena_hash
    db.commit()
    db.refresh(db_user)
    return db_user

# Borrar un usuario
def delete_user(db: Session, user_id: int):
    db_user = db.query(models.Usuario).filter(models.Usuario.id_usuario == user_id).first()
    if db_user is not None:
        db.delete(db_user)
        db.commit()
    return db_user

#Estos son los crud para tareas
def get_tareas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Tarea).offset(skip).limit(limit).all()


def create_user_tarea(db: Session, tarea: schemas.TareaCreate, user_id: int):
    db_tarea = models.Tarea(**tarea.dict())
    db.add(db_tarea)
    db.commit()
    db.refresh(db_tarea)
    return db_tarea

def get_tarea(db: Session, id: int):
    return db.query(models.Tarea).filter(models.Tarea.id_tarea == id).first()

def update_tarea(db: Session, tarea: schemas.TareaCreate, id: int):
    db_tarea = db.query(models.Tarea).filter(models.Tarea.id_tarea == id).first()
    db_tarea.titulo_tarea = tarea.titulo_tarea
    db_tarea.descripcion_tarea = tarea.descripcion_tarea
    db_tarea.fecha_vencimiento_tarea = tarea.fecha_vencimiento_tarea
    db.commit()
    db.refresh(db_tarea)
    return db_tarea

def delete_tarea(db: Session, id: int):
    db_tarea = db.query(models.Tarea).filter(models.Tarea.id_tarea == id).first()
    db.delete(db_tarea)
    db.commit()
    return db_tarea



#Estos son los crud para habitos
def get_habito(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Habito).offset(skip).limit(limit).all()

def create_habito(db: Session, habito: schemas.HabitoCreate):
    db_habito = models.Habito(**habito.dict())
    db.add(db_habito)
    db.commit()
    db.refresh(db_habito)
    return db_habito


def get_habito_by_id(db: Session, id_habito: int):
    return db.query(models.Habito).filter(models.Habito.id_habito == id_habito).first()

def update_habito(db: Session, habito: schemas.HabitoUpdate, id_habito: int):
    db_habito = db.query(models.Habito).filter(models.Habito.id_habito == id_habito).first()
    if db_habito is None:
        return None
    db_habito.titulo_habito = habito.titulo_habito
    db_habito.descripcion_habito = habito.descripcion_habito
    db.commit()
    db.refresh(db_habito)
    return db_habito

def delete_habito(db: Session, id_habito: int):
    db_habito = db.query(models.Habito).filter(models.Habito.id_habito == id_habito).first()
    if db_habito is None:
        return None
    db.delete(db_habito)
    db.commit()
    return db_habito



#Estos son los crud para progresos
def get_progreso(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Progreso).offset(skip).limit(limit).all()

def create_progreso(db: Session, progreso: schemas.ProgresoCreate):
    db_progreso = models.Progreso(**progreso.dict())
    db.add(db_progreso)
    db.commit()
    db.refresh(db_progreso)
    return db_progreso

def get_progreso_by_id(db: Session, id: int):
    return db.query(models.Progreso).filter(models.Progreso.id_progreso == id).first()

def update_progreso(db: Session, progreso: schemas.ProgresoCreate, id: int):
    db_progreso = db.query(models.Progreso).filter(models.Progreso.id_progreso == id).first()
    db_progreso.id_tarea = progreso.id_tarea
    db_progreso.id_habito = progreso.id_habito
    db.commit()
    db.refresh(db_progreso)
    return db_progreso

def delete_progreso(db: Session, id: int):
    db_progreso = db.query(models.Progreso).filter(models.Progreso.id_progreso == id).first()
    if db_progreso is not None:
        db.delete(db_progreso)
        db.commit()
    return db_progreso
