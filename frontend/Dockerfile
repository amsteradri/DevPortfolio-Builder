# frontend/Dockerfile
FROM node:18-alpine

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Crear directorio de la app
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml para instalar dependencias
COPY package.json pnpm-lock.yaml* ./

# Instalar dependencias con pnpm
RUN pnpm install

# Copiar todo el código fuente
COPY . .

# Exponer el puerto (Next.js usa 3000 por defecto)
EXPOSE 3000

# Comando para correr el servidor de desarrollo
CMD ["pnpm", "dev"]


#DOCKERFILE DE PRODUCCIÓN
# # Etapa 1: Build
# FROM node:18-alpine AS builder

# WORKDIR /app

# RUN npm install -g pnpm

# COPY package.json pnpm-lock.yaml* ./

# RUN pnpm install

# COPY . .

# RUN pnpm build

# # Etapa 2: Producción
# FROM node:18-alpine

# WORKDIR /app

# RUN npm install -g pnpm

# # Copiamos solo lo necesario de la etapa build para producción
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# EXPOSE 3000

# CMD ["pnpm", "start"]
