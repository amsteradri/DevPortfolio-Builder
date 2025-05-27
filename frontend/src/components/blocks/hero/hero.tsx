import { ReactNode } from 'react';
import { Github, Linkedin, Twitter, ArrowRight, ChevronRight } from 'lucide-react';

interface HeroProps {
  preview?: boolean;
  properties?: {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundColor?: string;
    textColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fontSize?: string;
    textAlign?: string;
    padding?: string;
    borderRadius?: string;
    buttonText?: string;
    showButton?: boolean;
    showSocial?: boolean;
    backgroundImage?: string;
  };
}

// Hero Minimalista con gradiente
export const HeroMinimal = ({ preview = false, properties = {} }: HeroProps) => {
  const {
    title = "¡Hola, soy Desarrollador!",
    subtitle = "Creando experiencias digitales increíbles",
    backgroundColor = "#6366f1",
    secondaryColor = "#8b5cf6",
    textColor = "#ffffff",
    fontSize = "text-4xl md:text-6xl",
    textAlign = "text-center",
    padding = "p-8",
    borderRadius = "rounded-none"
  } = properties;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[70vh] flex items-center justify-center ${padding} ${borderRadius}`}
      style={{
        background: `linear-gradient(to right, ${backgroundColor}, ${secondaryColor})`,
        color: textColor
      }}
    >
      <div className={`${textAlign} text-white max-w-3xl mx-auto`}>
        <h1 className={`${fontSize} font-bold mb-6 leading-tight`} style={{ color: textColor }}>
          {title}
        </h1>
        <p className="text-xl md:text-2xl opacity-90" style={{ color: textColor }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// Hero con CTA y redes sociales
export const HeroWithSocial = ({ preview = false, properties = {} }: HeroProps) => {
  const {
    title = "Desarrollador Full Stack",
    subtitle = "👋 Bienvenido a mi portfolio",
    description = "Especializado en crear aplicaciones web modernas y experiencias digitales únicas",
    backgroundColor = "#111827",
    textColor = "#ffffff",
    primaryColor = "#6366f1",
    fontSize = "text-4xl md:text-7xl",
    textAlign = "text-center",
    padding = "p-8",
    buttonText = "Ver Proyectos",
    showButton = true,
    showSocial = true
  } = properties;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[80vh] flex items-center justify-center ${padding}`}
      style={{ backgroundColor, color: textColor }}
    >
      <div className={`${textAlign} max-w-4xl mx-auto`}>
        <div className="inline-block px-6 py-2 rounded-full text-sm mb-6" 
             style={{ backgroundColor: `${primaryColor}33`, color: primaryColor }}>
          {subtitle}
        </div>
        <h1 className={`${fontSize} font-bold mb-6 bg-clip-text text-transparent`}
            style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, #8b5cf6)` }}>
          {title}
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-80">
          {description}
        </p>
        {showButton && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <button 
              className="px-8 py-3 rounded-lg font-medium flex items-center gap-2"
              style={{ backgroundColor: primaryColor, color: '#ffffff' }}
            >
              {buttonText} <ArrowRight size={16} />
            </button>
          </div>
        )}
        {showSocial && (
          <div className="flex items-center justify-center gap-6">
            <Github size={24} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
            <Linkedin size={24} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
            <Twitter size={24} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

// Hero con imagen de fondo y overlay
export const HeroWithBackground = ({ preview = false, properties = {} }: HeroProps) => {
  const {
    title = "Transformando ideas en experiencias digitales",
    subtitle = "Full Stack Developer",
    description = "Desarrollador web especializado en crear soluciones modernas y escalables",
    textColor = "#ffffff",
    primaryColor = "#6366f1",
    fontSize = "text-5xl md:text-7xl",
    padding = "p-8",
    backgroundImage = "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3",
    buttonText = "Ver Portfolio"
  } = properties;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[85vh] relative bg-cover bg-center flex items-center`}
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className={`relative z-10 container mx-auto ${padding}`}>
        <div className="max-w-3xl">
          <h2 className="text-xl font-medium mb-4" style={{ color: primaryColor }}>
            {subtitle}
          </h2>
          <h1 className={`${fontSize} font-bold mb-6 leading-tight`} style={{ color: textColor }}>
            {title}
          </h1>
          <p className="text-xl mb-8 max-w-2xl opacity-90" style={{ color: textColor }}>
            {description}
          </p>
          <div className="flex gap-4 flex-wrap">
            <button 
              className="px-8 py-4 rounded-lg font-medium flex items-center gap-2"
              style={{ backgroundColor: primaryColor, color: '#ffffff' }}
            >
              {buttonText} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hero con diseño asimétrico
export const HeroAsymmetric = ({ preview = false, properties = {} }: HeroProps) => {
  const {
    title = "Diseño & Desarrollo Full Stack",
    subtitle = "Desarrollador Web 🚀",
    description = "Creando experiencias web excepcionales con las últimas tecnologías",
    backgroundColor = "#f9fafb",
    textColor = "#111827",
    primaryColor = "#6366f1",
    fontSize = "text-4xl md:text-6xl",
    padding = "p-8"
  } = properties;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[80vh]`}
      style={{ backgroundColor }}
    >
      <div className={`container mx-auto ${padding} py-20 grid md:grid-cols-2 gap-12 items-center`}>
        <div>
          <div className="inline-block px-4 py-1 rounded-full text-sm mb-6"
               style={{ backgroundColor: `${primaryColor}1a`, color: primaryColor }}>
            {subtitle}
          </div>
          <h1 className={`${fontSize} font-bold mb-6 leading-tight`} style={{ color: textColor }}>
            {title}
          </h1>
          <p className="text-xl mb-8" style={{ color: textColor, opacity: 0.7 }}>
            {description}
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl rotate-6 opacity-20"
               style={{ backgroundColor: primaryColor }}></div>
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
};