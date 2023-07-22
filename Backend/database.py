from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Aquí es donde especificarías la conexión a tu base de datos.
# Por supuesto, reemplazarías "mysql_username", "mysql_password", "mysql_host", "mysql_database" con tus propios valores.
DATABASE_URL = "mysql+mysqlconnector://root:admin@localhost/AplicacionHabitos"

engine = create_engine(
    DATABASE_URL
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
