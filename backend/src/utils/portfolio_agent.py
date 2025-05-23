from llama_cpp import Llama
import os

# Obtiene la ruta absoluta del directorio actual
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
# Construye la ruta al modelo
MODEL_PATH = os.path.join(CURRENT_DIR, "..", "ia", "model", "deepseek-coder.gguf")

def generate_portfolio(prompt: str) -> str:
    try:
        # Verifica si el archivo existe
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"No se encontró el modelo en: {MODEL_PATH}")
            
        llm = Llama(model_path=MODEL_PATH, n_ctx=2048)
        
        system_prompt = """Eres un experto desarrollador de React y TypeScript especializado en crear portafolios web modernos.
        Cuando recibas una descripción, deberás generar un componente React completo con las siguientes características:

        - Usar TypeScript para tipos y interfaces
        - Implementar Tailwind CSS para estilos
        - Ser completamente responsive
        - Incluir animaciones con Framer Motion si se solicitan
        - Seguir mejores prácticas de React y patrones modernos
        - Incluir comentarios explicativos
        - No usar librerías externas excepto react, framer-motion y heroicons
        - Generar un código listo para copiar y pegar
        - El código debe estar en un solo archivo .tsx
        - Incluir tipos para todas las props y estados
        - Usar componentes funcionales con hooks
        - Implementar lazy loading para imágenes
        - Usar flex y grid para layouts responsivos
        - Implementar dark mode
        - Usar variables CSS nativas para temas
        
        NO generes explicaciones ni preguntas adicionales, solo el código del componente React."""

        full_prompt = f"{system_prompt}\n\nUsuario: {prompt}\n\nRespuesta:"
        
        output = llm(
            full_prompt,
            max_tokens=4096,
            temperature=0.7,
            top_p=0.95,
            repeat_penalty=1.1,
            stop=["Usuario:", "```"]
        )
        
        return output["choices"][0]["text"]
    except Exception as e:
        print(f"Error generando portfolio: {str(e)}")
        return f"Error: {str(e)}"
