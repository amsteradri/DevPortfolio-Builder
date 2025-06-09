# frontend/Dockerfile
FROM node:18-alpine

# Instalar pnpm de manera más eficiente
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias con cache y offline mirror
RUN pnpm install --frozen-lockfile --prefer-offline

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para desarrollo
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