import { ReactNode } from 'react';
import { Github, Linkedin, Twitter, ArrowRight, ChevronRight } from 'lucide-react';

interface HeroProps {
  preview?: boolean;
}

// Hero Minimalista con gradiente
export const HeroMinimal = ({ preview = false }: HeroProps) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[70vh] bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center p-8`}>
    <div className="text-center text-white max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        ¡Hola, soy Desarrollador!
      </h1>
      <p className="text-xl md:text-2xl opacity-90">
        Creando experiencias digitales increíbles
      </p>
    </div>
  </div>
);

// Hero con CTA y redes sociales
export const HeroWithSocial = ({ preview = false }: HeroProps) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[80vh] bg-gray-900 flex items-center justify-center p-8`}>
    <div className="text-center text-white max-w-4xl mx-auto">
      <div className="inline-block px-6 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-sm mb-6">
        👋 Bienvenido a mi portfolio
      </div>
      <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
        Desarrollador Full Stack
      </h1>
      <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        Especializado en crear aplicaciones web modernas y experiencias digitales únicas
      </p>
      <div className="flex items-center justify-center gap-4 mb-8">
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium flex items-center gap-2">
          Ver Proyectos <ArrowRight size={16} />
        </button>
        <button className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium">
          Contactar
        </button>
      </div>
      <div className="flex items-center justify-center gap-6">
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Github size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Linkedin size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Twitter size={24} />
        </a>
      </div>
    </div>
  </div>
);

// Hero con imagen de fondo y overlay
export const HeroWithBackground = ({ preview = false }: HeroProps) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[85vh] relative bg-cover bg-center flex items-center`}
    style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3")'
    }}>
    <div className="absolute inset-0 bg-black/70" />
    <div className="relative z-10 container mx-auto px-8">
      <div className="max-w-3xl">
        <h2 className="text-xl text-indigo-400 font-medium mb-4">Full Stack Developer</h2>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Transformando ideas en experiencias digitales
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Desarrollador web especializado en crear soluciones modernas y escalables
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center gap-2">
            Ver Portfolio <ChevronRight size={16} />
          </button>
          <button className="px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-lg font-medium">
            Sobre Mí
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Hero con diseño asimétrico
export const HeroAsymmetric = ({ preview = false }: HeroProps) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[80vh] bg-gray-50`}>
    <div className="container mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm mb-6">
          Desarrollador Web 🚀
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Diseño & Desarrollo <br/>
          <span className="text-indigo-600">Full Stack</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Creando experiencias web excepcionales con las últimas tecnologías
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <button className="w-full md:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium inline-flex items-center justify-center gap-2">
            Iniciar Proyecto <ArrowRight size={16} />
          </button>
          <button className="w-full md:w-auto px-8 py-4 border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 rounded-lg font-medium inline-flex items-center justify-center transition-colors">
            Ver Trabajos
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500 rounded-3xl rotate-6 opacity-20"></div>
        <div className="relative bg-white p-8 rounded-3xl shadow-xl">
          <div className="aspect-[4/3] bg-gray-100 rounded-xl mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded-full"></div>
            <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);