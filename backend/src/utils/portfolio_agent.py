from llama_cpp import Llama
import os

# Obtiene la ruta absoluta del directorio actual
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, "..", "ia", "model", "deepseek-coder.gguf")

def generate_portfolio(prompt: str) -> str:
    try:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"No se encontró el modelo en: {MODEL_PATH}")
            
        llm = Llama(model_path=MODEL_PATH, n_ctx=2048)

        # Parseamos el prompt de string a diccionario
        prompt_data = {}
        current_section = None
        projects = []
        
        # Añadimos soporte para estilos
        styles = {
            'primary_color': '#6366f1',
            'secondary_color': '#3b82f6',
            'text_color': '#1f2937',
            'bg_color': '#ffffff',
            'accent_color': '#4f46e5',
            'font_heading': 'Poppins',
            'font_body': 'Inter',
            'hero_bg': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
        }

        for line in prompt.split('\n'):
            line = line.strip()
            if not line:
                continue
                
            if ':' in line and not line.startswith('-'):
                key, value = line.split(':', 1)
                key = key.lower().strip()
                value = value.strip()
                
                if key == 'nombre':
                    prompt_data['nombre'] = value
                elif key == 'profesión' or key == 'profesion':
                    prompt_data['profesion'] = value
                elif key == 'foto':
                    prompt_data['foto'] = value
                elif key == 'descripción' or key == 'descripcion':
                    prompt_data['descripcion'] = value
                elif key == 'email':
                    prompt_data['email'] = value
                elif key == 'linkedin':
                    prompt_data['linkedin'] = value
                elif key == 'proyectos':
                    current_section = 'proyectos'
                # Añadimos el parsing de estilos
                elif key == 'color primario':
                    styles['primary_color'] = value
                elif key == 'color secundario':
                    styles['secondary_color'] = value
                elif key == 'color texto':
                    styles['text_color'] = value
                elif key == 'color fondo':
                    styles['bg_color'] = value
                elif key == 'color acento':
                    styles['accent_color'] = value
                elif key == 'fuente títulos':
                    styles['font_heading'] = value
                elif key == 'fuente texto':
                    styles['font_body'] = value
                elif key == 'imagen fondo':
                    styles['hero_bg'] = value
            elif line.startswith('-') and current_section == 'proyectos':
                try:
                    # Parseamos la línea del proyecto
                    project_line = line[1:].strip()
                    if '(' in project_line and ')' in project_line:
                        name = project_line[:project_line.find('(')].strip()
                        url = project_line[project_line.find('(')+1:project_line.find(')')].strip()
                        desc = ""
                        
                        # Extraer descripción si existe
                        if ':' in project_line:
                            desc = project_line[project_line.find(':')+1:].strip()
                        
                        project = {
                            'nombre': name,
                            'imagen': url,
                            'descripcion': desc or "Proyecto destacado"
                        }
                        projects.append(project)
                        print(f"Proyecto añadido: {project}")  # Debug
                except Exception as e:
                    print(f"Error procesando proyecto: {str(e)}")

        prompt_data['proyectos'] = projects

        # Template HTML base que siempre se usará
        base_html = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        h1, h2, h3 {
            font-family: 'Poppins', sans-serif;
        }
        .glass { 
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .gradient-bg { 
            background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
            position: relative;
        }
        .gradient-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80');
            background-size: cover;
            background-position: center;
            opacity: 0.1;
            z-index: 0;
        }
        .section-height {
            min-height: 100vh;
            padding: 8rem 0;
        }
        .nav-link {
            position: relative;
            padding: 0.5rem 1rem;
            color: #ffffff;
            transition: all 0.3s ease;
        }
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: #ffffff;
            transition: width 0.3s ease;
        }
        .nav-link:hover::after {
            width: 100%;
        }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 glass">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold text-white">[NOMBRE]</h1>
                <div class="hidden md:flex items-center space-x-8">
                    <span class="nav-link" onclick="scrollToSection('home')">Inicio</span>
                    <span class="nav-link" onclick="scrollToSection('about')">Sobre mí</span>
                    <span class="nav-link" onclick="scrollToSection('projects')">Proyectos</span>
                    <span class="nav-link" onclick="scrollToSection('contact')">Contacto</span>
                    <button id="darkMode" class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        🌙
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section id="home" class="section-height gradient-bg relative">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
        <div class="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center h-full text-white">
            <div class="text-center" data-aos="fade-up">
                <h1 class="text-6xl font-bold mb-6">[NOMBRE]</h1>
                <p class="text-2xl mb-8">[PROFESION]</p>
                <a href="#projects" class="inline-block px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:-translate-y-1">
                    Ver Proyectos
                </a>
            </div>
        </div>
    </section>

    <!-- About -->
    <section id="about" class="section-height bg-white dark:bg-gray-800">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row items-center gap-16">
                <div class="md:w-1/2" data-aos="fade-right">
                    <img src="[FOTO]" alt="Perfil" class="w-80 h-80 rounded-2xl object-cover shadow-2xl"/>
                </div>
                <div class="md:w-1/2" data-aos="fade-left">
                    <h2 class="text-4xl font-bold mb-6">Sobre mí</h2>
                    <p class="text-xl leading-relaxed text-gray-600 dark:text-gray-300">[DESCRIPCION]</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="section-height bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold text-center mb-16">Proyectos Destacados</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                [PROYECTOS]
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section-height bg-white dark:bg-gray-800">
        <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold text-center mb-16">Contacto</h2>
            <div class="max-w-3xl mx-auto">
                <div class="flex flex-col items-center gap-8" data-aos="fade-up">
                    <div class="flex items-center gap-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <a href="mailto:[EMAIL]" class="text-xl hover:text-indigo-500 transition-colors">[EMAIL]</a>
                    </div>
                    <div class="flex items-center gap-4">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <a href="[LINKEDIN]" target="_blank" class="text-xl hover:text-indigo-500 transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto px-6 text-center">
            <p class="text-gray-400">Creado con ❤️ usando <a href="https://github.com/tu-usuario/DevPortfolio-Builder" class="text-indigo-400 hover:text-indigo-300 transition-colors">DevPortfolio-Builder</a></p>
        </div>
    </footer>

    <script>
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Fix para el dark mode
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        document.getElementById('darkMode').addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark')
                localStorage.theme = 'light'
            } else {
                document.documentElement.classList.add('dark')
                localStorage.theme = 'dark'
            }
        });
        
        // Navegación suave mejorada
        document.addEventListener('DOMContentLoaded', function() {
            // Prevenir navegación por defecto y manejar scroll suave
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offset = 80; // Altura del navbar
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // Actualizar URL sin recargar la página
                        history.pushState(null, '', `#${targetId}`);
                    }
                });
            });

            // Manejar navegación inicial si hay hash en la URL
            if (window.location.hash) {
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    setTimeout(() => {
                        const offset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        });

        function scrollToSection(sectionId) {
            try {
                const targetElement = document.getElementById(sectionId);
                if (targetElement) {
                    const navbarHeight = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Actualizar clases activas
                    updateActiveNavLink(sectionId);
                }
            } catch (error) {
                console.error('Error en scrollToSection:', error);
            }
        }

        function updateActiveNavLink(activeSection) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.textContent.toLowerCase().includes(activeSection)) {
                    link.classList.add('active');
                }
            });
        }
    </script>
</body>
</html>"""

        # Mejoramos el prompt del sistema con ejemplos concretos
        system_prompt = """
        Genera el contenido exacto para un portfolio web profesional. Debes devolver un JSON con este formato:
        {
            "nombre": "El nombre proporcionado",
            "profesion": "La profesión indicada",
            "foto": "La URL de la foto proporcionada",
            "descripcion": "La descripción proporcionada",
            "proyectos": "<div class='grid grid-cols-1 md:grid-cols-2 gap-8'>[CARDS DE PROYECTO]</div>"
        }

        Para cada proyecto, genera una card con este formato:
        <div class='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2' data-aos='fade-up'>
            <img src='URL_PROYECTO' alt='Nombre Proyecto' class='w-full h-64 object-cover'/>
            <div class='p-8'>
                <h3 class='text-2xl font-bold mb-4'>NOMBRE_PROYECTO</h3>
                <p class='text-lg text-gray-600 dark:text-gray-300'>DESCRIPCION_PROYECTO</p>
            </div>
        </div>

        IMPORTANTE:
        1. Usa exactamente los datos proporcionados
        2. No inventes información adicional
        3. Mantén el formato HTML/CSS exacto
        4. Asegúrate de incluir todos los elementos
        """

        # Estructuramos la información para el prompt
        info_prompt = f"""
        DATOS DEL PORTFOLIO:
        Nombre: {prompt_data.get('nombre', '')}
        Profesión: {prompt_data.get('profesion', '')}
        Foto: {prompt_data.get('foto', '')}
        Descripción: {prompt_data.get('descripcion', '')}
        
        PROYECTOS:
        {[f"- {p['nombre']} ({p['imagen']})" for p in prompt_data.get('proyectos', [])]}
        """

        full_prompt = f"{system_prompt}\n\nINFORMACIÓN A USAR:\n{info_prompt}\n\nGENERA EL JSON:"
        
        output = llm(
            full_prompt,
            max_tokens=2048,
            temperature=0.7,
            top_p=0.95,
            repeat_penalty=1.1,
            stop=["}"]
        )
        
        try:
            # Limpiamos la respuesta de la IA
            response_text = output["choices"][0]["text"].strip()
            # Eliminamos marcadores de código y otros elementos no JSON
            response_text = response_text.replace("```python", "").replace("```", "")
            response_text = response_text.replace("portfolio = ", "")
            # Aseguramos que tenemos un JSON válido
            if not response_text.endswith("}"):
                response_text += "}"
            
            # Usamos los datos del prompt directamente
            html = (base_html
                .replace("[NOMBRE]", prompt_data.get('nombre', 'Portfolio'))
                .replace("[PROFESION]", prompt_data.get('profesion', 'Desarrollador'))
                .replace("[FOTO]", prompt_data.get('foto', 'https://via.placeholder.com/300'))
                .replace("[DESCRIPCION]", prompt_data.get('descripcion', 'Descripción pendiente'))
                .replace("[EMAIL]", prompt_data.get('email', 'contacto@email.com'))
                .replace("[LINKEDIN]", prompt_data.get('linkedin', '#'))
                .replace("[PROYECTOS]", generate_projects_html(projects)))
            
            return html
            
        except Exception as inner_error:
            print(f"Error procesando respuesta: {str(inner_error)}")
            print(f"Respuesta recibida: {output['choices'][0]['text']}")
            
            # Usamos los datos del prompt directamente
            projects_html = generate_projects_html(projects)
    
            html = (base_html
                .replace("[NOMBRE]", prompt_data.get('nombre', 'Portfolio'))
                .replace("[PROFESION]", prompt_data.get('profesion', 'Desarrollador'))
                .replace("[FOTO]", prompt_data.get('foto', 'https://via.placeholder.com/300'))
                .replace("[DESCRIPCION]", prompt_data.get('descripcion', 'Descripción pendiente'))
                .replace("[EMAIL]", prompt_data.get('email', 'contacto@email.com'))
                .replace("[LINKEDIN]", prompt_data.get('linkedin', '#'))
                .replace("[PROYECTOS]", projects_html))
    
            return html

    except Exception as outer_error:
        print(f"Error generando portfolio: {str(outer_error)}")
        return f"""
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50">
            <div class="container mx-auto px-4 py-8">
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p class="font-bold">Error:</p>
                    <p>{str(outer_error)}</p>
                </div>
            </div>
        </body>
        </html>
        """


def generate_projects_html(projects):
    """Genera el HTML para las cards de proyectos"""
    if not projects or len(projects) == 0:
        return "<p class='text-center text-gray-500'>No hay proyectos disponibles</p>"
    
    projects_html = "<div class='grid grid-cols-1 md:grid-cols-2 gap-8'>"
    for project in projects:
        projects_html += f"""
            <div class='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2' data-aos='fade-up'>
                <img src='{project["imagen"]}' alt='{project["nombre"]}' class='w-full h-64 object-cover'/>
                <div class='p-8'>
                    <h3 class='text-2xl font-bold mb-4'>{project["nombre"]}</h3>
                    <p class='text-lg text-gray-600 dark:text-gray-300'>{project.get("descripcion", "Proyecto destacado")}</p>
                </div>
            </div>
        """
    projects_html += "</div>"
    return projects_html


# TEST _PROMPT
# Nombre: Ana García
# Profesión: Diseñadora UX/UI
# Foto: https://img.freepik.com/foto-gratis/mecanico-sonriente-brazos-cruzados-llave-inglesa_1170-1699.jpg
# Descripción: Diseñadora con 5 años de experiencia en interfaces intuitivas
# Proyectos:
# - App de delivery (https://img.freepik.com/foto-gratis/mecanico-sonriente-brazos-cruzados-llave-inglesa_1170-1699.jpg)
# - Dashboard analytics (https://img.freepik.com/foto-gratis/mecanico-sonriente-brazos-cruzados-llave-inglesa_1170-1699.jpg)