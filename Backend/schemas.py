from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class EstadoTarea(Enum):
    completada = 'completada'
    pendiente = 'pendiente'
    vencida = 'vencida'


class EstadoHabito(Enum):
    en_progreso = 'en progreso'
    cumplido = 'cumplido'


class EstadoProgreso(Enum):
    completado = 'completado'
    en_progreso = 'en progreso'

class Token(BaseModel):
    access_token: str
    token_type: str

class UsuarioBase(BaseModel):
    nombre_usuario: str
    correo: str


class UsuarioCreate(UsuarioBase):
    contrasena_hash: str


class Usuario(UsuarioBase):
    id_usuario: int
    fecha_creacion: Optional[datetime] = None
    fecha_ultima_modificacion: Optional[datetime] = None

    class Config:
        orm_mode = True


class TareaBase(BaseModel):
    id_usuario: int
    titulo_tarea: str
    descripcion_tarea: str
    fecha_vencimiento_tarea: datetime


class TareaCreate(TareaBase):
    fecha_creacion_tarea: datetime = datetime.now()
    estado_tarea: EstadoTarea = EstadoTarea.pendiente


class Tarea(TareaBase):
    id_tarea: int
    fecha_creacion_tarea: Optional[datetime] = None
    estado_tarea: Optional[EstadoTarea] = None

    class Config:
        orm_mode = True


class HabitoBase(BaseModel):
    id_usuario: int
    titulo_habito: str
    descripcion_habito: str


class HabitoCreate(HabitoBase):
    pass


class Habito(HabitoBase):
    id_habito: int
    fecha_creacion_habito: Optional[datetime] = None
    estado_habito: Optional[EstadoHabito] = None

    class Config:
        orm_mode = True


class HabitoUpdate(BaseModel):
    id_usuario: int
    titulo_habito: str
    descripcion_habito: str

    class Config:
        orm_mode = True


class ProgresoBase(BaseModel):
    id_tarea: Optional[int] = None
    id_habito: Optional[int] = None


class ProgresoCreate(ProgresoBase):
    pass


class Progreso(ProgresoBase):
    id_progreso: int
    fecha: Optional[datetime] = None
    estado: Optional[EstadoProgreso] = None

    class Config:
        orm_mode = True
