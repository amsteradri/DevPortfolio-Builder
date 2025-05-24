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

# Variables de entorno para desarrollo
ENV PYTHONPATH=/app
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV PYTHONUNBUFFERED=1

# Expone el puerto de Flask
EXPOSE 5000

# Usar flask run en lugar de python directamente
CMD ["python", "-m", "flask", "--app", "src/main.py", "run", "--host=0.0.0.0", "--port=5000", "--debug"]
