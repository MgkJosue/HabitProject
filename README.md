# HabitProject

# Backend 

Para poder correr el backend es necesario tener instalado python 

Una vez instalado python clonarse del repositorio para poder generar el servicio 

El repositorio se clona con el siguiente comando

git clone https://github.com/MgkJosue/HabitProject.git

Una vez hecho esto navegar hasta el contenido de resources.txt para poder instalar las librerias para poder ejecutar el servicio 

Para instalar las librerias se utiliza el siguiente comando 

pip install -r requirements.txt

Una vez hecho esto configurar la base de datos con MySql, copiar el codigo de bdd.txt que esta en resources y configurar la base de datos

NOTA: En el caso de que la base de datos tenga una contraseña y un usuario diferentes a los vistos esta información se debe cambiar en el archivo 'database.py'

Despues de realizar todo este proceso se debe ir a la raiz del archivo "main.py" para poder ejecutar el servicio con FastApi con este comando:

uvicorn main:app --reaload 

Se puede probar el servicion con la siguiente coleccion realizada en Postman 

https://grey-eclipse-316933.postman.co/workspace/New-Team-Workspace~7d5fff89-db4d-42fc-ac08-241173a8ff64/collection/21195311-33c20b8d-1cac-42d2-855c-fd4ba7293447?action=share&creator=21195311


LA DOCUMENTACION COMPLETA DE LOS ENDPOINTS SE ENCUENTRA EN ESTE LINK (TENER EN CUENTA QUE SE NECESITA TENER EL SERVICIO EN MARCHA): http://localhost:8000/docs

