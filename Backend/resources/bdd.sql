-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE,
    correo VARCHAR(100) UNIQUE,
    contrasena_hash VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla Tareas
CREATE TABLE Tareas (
    id_tarea SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuarios(id_usuario),
    titulo_tarea VARCHAR(100),
    descripcion_tarea TEXT,
    fecha_creacion_tarea TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento_tarea TIMESTAMP,
    fecha_completado_tarea TIMESTAMP,
    estado_tarea VARCHAR(10) CHECK (estado_tarea IN ('completada', 'pendiente', 'vencida')) DEFAULT 'pendiente'
);

-- Crear la tabla Habitos
CREATE TABLE Habitos (
    id_habito SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuarios(id_usuario),
    titulo_habito VARCHAR(100),
    descripcion_habito TEXT,
    fecha_creacion_habito TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_habito VARCHAR(11) CHECK (estado_habito IN ('en progreso', 'cumplido')) DEFAULT 'en progreso'
);

-- Crear la tabla Progreso
CREATE TABLE Progreso (
    id_progreso SERIAL PRIMARY KEY,
    id_tarea INT REFERENCES Tareas(id_tarea),
    id_habito INT REFERENCES Habitos(id_habito),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(11) CHECK (estado IN ('completado', 'en progreso')) DEFAULT 'en progreso'
);