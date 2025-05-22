# 🚀 DevPortfolio Builder

Generador de portafolios para developers con editor visual, temas personalizables y exportación a GitHub Pages o ZIP.

---

## 🗺️ Roadmap de Desarrollo

### 📦 Etapa 1: Setup Inicial

- [ ] Crear repositorio en GitHub (frontend y backend)
- [ ] Crear estructura de carpetas
- [ ] Inicializar proyectos con `npm init -y`
- [ ] Crear archivos base: `docker-compose.yml`, `.dockerignore`, `.gitignore`

### 🎨 Etapa 2: Frontend (React + Tailwind)

- [ ] Crear SPA con Vite o Create React App
- [ ] Configurar Tailwind CSS
- [ ] Añadir `React Router` para rutas: login, editor, perfil, preview
- [ ] Implementar sistema de temas (dark/light + paletas)
- [ ] Implementar componentes base:
  - [ ] Navbar, Sidebar
  - [ ] Editor de bloques (nombre, proyectos, redes)
  - [ ] Previsualización en tiempo real
- [ ] Implementar editor visual con `react-beautiful-dnd` o `dnd-kit`
- [ ] Guardar configuraciones del portafolio en el estado global
- [ ] Conectar con backend para guardar/recuperar la configuración

### 🔐 Etapa 3: Autenticación

- [ ] Crear sistema de login/register con JWT
- [ ] Proteger rutas privadas
- [ ] Guardar token en `localStorage` o `cookie`
- [ ] Middleware de autenticación en backend

### ⚙️ Etapa 4: Backend (Node.js + Express + PostgreSQL)

- [ ] Conectar a PostgreSQL con `pg` o `Prisma`
- [ ] Endpoints API REST:
  - `POST /register`
  - `POST /login`
  - `GET /user/config`
  - `PUT /user/config`
  - `POST /export/zip`
  - `POST /export/github`
- [ ] Configurar Redis para cachear configuraciones
- [ ] Validación con `Joi` o `Zod`

### 💾 Etapa 5: Exportación y Publicación

- [ ] Generar HTML + CSS desde la configuración (usando templates y ejs/pug)
- [ ] Comprimir como ZIP (`archiver`, `adm-zip`)
- [ ] Conectar con GitHub API para crear repos y subir código
- [ ] Opción de exportar directamente a GitHub Pages
- [ ] Subir archivos ZIP a S3 (opcional)

### 📚 Etapa 6: Base de Datos

- [ ] Crear tablas:
  - `users`
  - `portfolios`
  - `themes`
- [ ] Relaciones usuario ↔ portafolios

### 🐳 Etapa 7: Dockerización

- [ ] Dockerfile frontend y backend
- [ ] Docker Compose con PostgreSQL, Redis, Nginx (opcional)
- [ ] Volúmenes persistentes para PostgreSQL
- [ ] Variables de entorno con `.env`

### ☁️ Etapa 8: DevOps y Despliegue

- [ ] Desplegar en EC2 con Terraform
- [ ] Crear CI/CD con GitHub Actions:
  - Lint + Test
  - Build
  - Deploy automático
- [ ] Subir frontend al bucket S3 con `static hosting`
- [ ] Backend expuesto vía EC2 + Nginx

### 📈 Etapa 9: Optimización y Bonus

- [ ] Añadir analíticas (Google Analytics o Plausible)
- [ ] Añadir login con GitHub OAuth
- [ ] Panel de administrador para ver actividad
- [ ] Soporte para varios idiomas (i18n)

---

# 📦 Estructura del Proyecto

```
dev-portfolio-builder/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
├── docker/
│   ├── frontend.Dockerfile
│   ├── backend.Dockerfile
│   └── docker-compose.yml
├── terraform/
│   └── main.tf
├── .github/workflows/
│   └── ci.yml
└── README.md
```


---

## 🧪 Checkpoints Clave

- [ ] CRUD de portafolio funcionando
- [ ] Editor drag & drop estable
- [ ] Exportación en ZIP sin errores
- [ ] Deploy automático funcionando
- [ ] Seguridad JWT validada
- [ ] Interfaz atractiva y usable

---

## 🎓 Habilidades que vas a reforzar

- Diseño de UI con Tailwind
- Arquitectura cliente-servidor
- Gestión de estado avanzado en React
- Seguridad con JWT
- CI/CD con GitHub Actions
- Infraestructura como código (Terraform)
- Dockerización profesional

---

## 🚀 Próximos pasos

1. Crea el repositorio y dockeriza base
2. Trabaja en frontend y exportación básica
3. Añade backend con usuarios
4. Implementa la exportación avanzada
5. Automatiza el despliegue

