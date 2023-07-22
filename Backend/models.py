from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship

from database import Base

class Usuario(Base):
    __tablename__ = "Usuarios"
    
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre_usuario = Column(String, unique=True, index=True)
    correo = Column(String, unique=True, index=True)
    contrasena_hash = Column(String)
    fecha_creacion = Column(DateTime)
    fecha_ultima_modificacion = Column(DateTime)

    tareas = relationship("Tarea", back_populates="usuario")
    habitos = relationship("Habito", back_populates="usuario")


class Tarea(Base):
    __tablename__ = "Tareas"

    id_tarea = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("Usuarios.id_usuario"))
    titulo_tarea = Column(String)
    descripcion_tarea = Column(String)
    fecha_creacion_tarea = Column(DateTime)
    fecha_vencimiento_tarea = Column(DateTime)
    fecha_completado_tarea = Column(DateTime)
    estado_tarea = Column(Enum('completada', 'pendiente', 'vencida'))

    usuario = relationship("Usuario", back_populates="tareas")
    progreso = relationship("Progreso", back_populates="tarea")


class Habito(Base):
    __tablename__ = "Habitos"

    id_habito = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("Usuarios.id_usuario"))
    titulo_habito = Column(String)
    descripcion_habito = Column(String)
    fecha_creacion_habito = Column(DateTime)
    estado_habito = Column(Enum('en progreso', 'cumplido'))

    usuario = relationship("Usuario", back_populates="habitos")
    progreso = relationship("Progreso", back_populates="habito")


class Progreso(Base):
    __tablename__ = "Progreso"

    id_progreso = Column(Integer, primary_key=True, index=True)
    id_tarea = Column(Integer, ForeignKey("Tareas.id_tarea"))
    id_habito = Column(Integer, ForeignKey("Habitos.id_habito"))
    fecha = Column(DateTime)
    estado = Column(Enum('completado', 'en progreso'))

    tarea = relationship("Tarea", back_populates="progreso")
    habito = relationship("Habito", back_populates="progreso")
