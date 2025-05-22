# 🚀 DevPortfolio Builder

Generador de portafolios para developers con editor visual, temas personalizables y exportación a GitHub Pages o ZIP.

---

## 🗺️ Roadmap de Desarrollo

### 📦 Etapa 1: Setup Inicial

- [x] Crear repositorio en GitHub (frontend y backend)
- [x] Crear estructura de carpetas
- [x] Inicializar proyectos con `npm init -y`
- [x] Crear archivos base: `docker-compose.yml`, `.dockerignore`, `.gitignore`
- [x] Inicializar frontend con `create-next-app`
- [x] Configurar TypeScript y Tailwind CSS
- [x] Dockerfile para frontend

### 🎨 Etapa 2: Frontend (Next.js + Tailwind)

- [x] Crear app con `create-next-app` en carpeta `frontend`
- [x] Configurar Tailwind CSS manualmente
- [x] Añadir rutas: login, editor, perfil, preview usando App Router
- [x] Crear componentes principales:
  - [x] **EditorPage** - Interfaz de edición del portafolio
  - [x] **LoginPage** - Autenticación de usuarios
  - [x] **PreviewPage** - Vista previa del portafolio
  - [x] **ProfilePage** - Gestión de cuenta de usuario
  - [x] **Footer** - Pie de página consistente con copyright
- [ ] Implementar sistema de temas (dark/light + paletas)
- [ ] Implementar componentes base:
  - [x] Navbar, Sidebar
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

- [x] Dockerfile frontend (Next.js)
- [ ] Dockerfile backend
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

## 📦 Estructura del Proyecto

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
│   │   │   └── Footer.jsx           # ✅ Footer component
│   │   ├── pages/
│   │   │   ├── EditorPage.jsx       # ✅ Portfolio editor
│   │   │   ├── LoginPage.jsx        # ✅ User authentication
│   │   │   ├── PreviewPage.jsx      # ✅ Portfolio preview
│   │   │   └── ProfilePage.jsx      # ✅ Account management
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

## 📝 Último Commit

**Add main application pages and footer component**
- ✅ Created EditorPage component for portfolio editing interface
- ✅ Created LoginPage component for user authentication  
- ✅ Created PreviewPage component for portfolio preview functionality
- ✅ Created ProfilePage component for user account management
- ✅ Added Footer component for consistent site-wide footer with copyright information

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

1. ✅ ~~Terminar setup de frontend con rutas y componentes base~~
2. Implementar navegación entre páginas y estado global
3. Dockerizar backend y conectar con PostgreSQL
4. Implementar login y gestión de usuario
5. Conectar editor visual con backend
6. Añadir exportación a ZIP y GitHub
7. Automatizar el despliegue y CI/CD