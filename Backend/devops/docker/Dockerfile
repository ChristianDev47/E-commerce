# Usa una imagen base oficial de Python
FROM python:3.11-slim

# Configura el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY requirements.txt requirements.txt

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto en el que Django estará ejecutándose
EXPOSE 8000

# Ejecuta las migraciones y el servidor de desarrollo de Django
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
