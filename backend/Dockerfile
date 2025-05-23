# Usa una imagen oficial de Python
FROM python:3.10-slim

# Instala dependencias básicas del sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libopenblas-dev \
    liblapack-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo
WORKDIR /app

# Crear directorio para modelos
RUN mkdir -p /app/models

# Copiar primero solo los requirements para aprovechar la caché
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código
COPY . .

# Variable de entorno para Python path
ENV PYTHONPATH=/app

# Expone el puerto de Flask
EXPOSE 5000

# Comando para correr la app
CMD ["python", "src/main.py"]
