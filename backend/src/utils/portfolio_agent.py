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
                elif key == 'proyectos':
                    current_section = 'proyectos'
            elif line.startswith('-') and current_section == 'proyectos':
                # Parseamos la línea del proyecto
                project_line = line[1:].strip()
                if '(' in project_line and ')' in project_line:
                    name = project_line[:project_line.find('(')].strip()
                    url = project_line[project_line.find('(')+1:project_line.find(')')].strip()
                    projects.append({
                        'nombre': name,
                        'imagen': url,
                        'descripcion': 'Proyecto destacado'
                    })

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
                    <a href="#home" class="nav-link">Inicio</a>
                    <a href="#about" class="nav-link">Sobre mí</a>
                    <a href="#projects" class="nav-link">Proyectos</a>
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

    <script>
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        document.getElementById('darkMode').addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
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
            # Aseguramos que tenemos un JSON válido
            response_text = output["choices"][0]["text"].strip() + "}"
            content = eval(response_text)
            
            # Validamos que tenemos todos los campos necesarios
            required_fields = ["nombre", "profesion", "foto", "descripcion", "proyectos"]
            for field in required_fields:
                if field not in content:
                    raise ValueError(f"Falta el campo {field} en la respuesta")
            
            # Aseguramos que los proyectos tienen el formato HTML correcto
            if "<div class='grid grid-cols-1 md:grid-cols-2 gap-8'>" not in content["proyectos"]:
                raise ValueError("Formato de proyectos incorrecto")
            
            # Reemplazamos los placeholders
            html = (base_html
                .replace("[NOMBRE]", content["nombre"])
                .replace("[PROFESION]", content["profesion"])
                .replace("[FOTO]", content["foto"])
                .replace("[DESCRIPCION]", content["descripcion"])
                .replace("[PROYECTOS]", content["proyectos"]))
            
            return html
            
        except Exception as e:
            print(f"Error procesando respuesta: {str(e)}")
            print(f"Respuesta recibida: {output['choices'][0]['text']}")
            
            # Template por defecto usando los datos parseados
            default_projects = """
                <div class='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
                    <p class='text-red-600'>Error generando proyectos</p>
                </div>
            """
            
            return (base_html
                .replace("[NOMBRE]", prompt_data.get('nombre', 'Portfolio'))
                .replace("[PROFESION]", prompt_data.get('profesion', 'Desarrollador'))
                .replace("[FOTO]", prompt_data.get('foto', 'https://via.placeholder.com/300'))
                .replace("[DESCRIPCION]", prompt_data.get('descripcion', 'Descripción pendiente'))
                .replace("[PROYECTOS]", default_projects))

    except Exception as e:
        print(f"Error generando portfolio: {str(e)}")
        return """
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
                    <p>{str(e)}</p>
                </div>
            </div>
        </body>
        </html>
        """


# TEST _PROMPT
# Nombre: Ana García
# Profesión: Diseñadora UX/UI
# Foto: https://img.freepik.com/foto-gratis/mecanico-sonriente-brazos-cruzados-llave-inglesa_1170-1699.jpg
# Descripción: Diseñadora con 5 años de experiencia en interfaces intuitivas
# Proyectos:
# - App de delivery (https://img.freepik.com/foto-gratis/mecanico-sonriente-brazos-cruzados-llave-inglesa_1170-1699.jpg)
# - Dashboard analytics (https://img.freepik.com/foto-gratis/mecanico-sonriente-brazos-cruzados-llave-inglesa_1170-1699.jpg)