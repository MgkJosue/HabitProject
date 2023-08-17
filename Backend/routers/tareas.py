from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import schemas, crud
from database import SessionLocal
from datetime import datetime, timedelta
import pytz

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
    validate_fecha_vencimiento(tarea.fecha_vencimiento_tarea)
    return crud.create_user_tarea(db=db, tarea=tarea, user_id=tarea.id_usuario)


@router.put("/tarea/{id}", response_model=schemas.Tarea)
def actualizar_tarea(id: int, tarea: schemas.TareaCreate, db: Session = Depends(get_db)):
    db_tarea = crud.get_tarea(db, id)
    if db_tarea is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    
    validate_fecha_vencimiento(tarea.fecha_vencimiento_tarea)
    
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

#   Algunas validaciones

def validate_fecha_vencimiento(fecha_vencimiento: datetime):
    fecha_vencimiento = make_aware(fecha_vencimiento)
    now = make_aware(datetime.now())
    max_allowed_date = now + timedelta(days=180)

    if fecha_vencimiento < now:
        raise HTTPException(status_code=400, detail="La fecha de vencimiento no puede ser anterior a la fecha actual")
    elif fecha_vencimiento > max_allowed_date:
        raise HTTPException(status_code=400, detail="La fecha de vencimiento no puede ser mayor a 6 meses desde ahora")


def make_aware(dt):
    eastern = pytz.timezone('US/Eastern')
    if dt.tzinfo is None:
        return eastern.localize(dt)
    return dt
