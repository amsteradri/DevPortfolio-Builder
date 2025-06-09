# frontend/Dockerfile

FROM node:18-alpine

# Activar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar package.json y pnpm-lock.yaml para instalar dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile --prefer-offline

# Copiar todo el código
COPY . .

# Construir la app para producción
RUN pnpm build

# Exponer puerto 3000
EXPOSE 3000

# Comando para iniciar la app en producción
CMD ["pnpm", "start"]
