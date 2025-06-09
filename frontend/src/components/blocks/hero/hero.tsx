import { ReactNode, useEffect } from 'react';
import { Github, Linkedin, Twitter, ArrowRight, ChevronRight, Mail } from 'lucide-react';
import Image from 'next/image';

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
    profileImage?: string;
    // Enlaces sociales
    githubLink?: string;
    linkedinLink?: string;
    twitterLink?: string;
    emailLink?: string;
    phoneLink?: string;
  };
}

// Función universal para hacer scroll a proyectos
const scrollToProjects = () => {
  // 1. Buscar por atributo data-component-type (más específico)
  const projectsSection = document.querySelector('[data-component-type="projects"]');
  if (projectsSection) {
    projectsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
    return;
  }

  // 2. Buscar por ID que contenga "projects"
  const projectsById = document.querySelector('[data-id*="projects"]');
  if (projectsById) {
    projectsById.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
    return;
  }

  // 3. Buscar por contenido de texto (menos confiable pero útil)
  const allSections = document.querySelectorAll('div, section, article');
  for (const section of allSections) {
    const textContent = section.textContent?.toLowerCase() || '';
    const hasProjectText = textContent.includes('proyecto') || 
                          textContent.includes('portfolio') || 
                          textContent.includes('trabajos') ||
                          textContent.includes('mis proyectos');
    
    if (hasProjectText && section.querySelector('img, a[href*="github"], a[href*="demo"]')) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      return;
    }
  }

  // 4. Fallback: buscar elementos que parezcan proyectos
  const projectLikeElements = document.querySelectorAll('div:has(img):has(a[href*="github"]), div:has(img):has(a[href*="demo"])');
  if (projectLikeElements.length > 0) {
    const firstProject = projectLikeElements[0].closest('div[class*="grid"], div[class*="space-y"], section, article') || projectLikeElements[0];
    firstProject.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
    return;
  }

  // 5. Si nada funciona, mostrar un mensaje
  console.log('No se encontró sección de proyectos para hacer scroll');
};

// Hero Minimalista con gradiente - MEJORADO
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
    borderRadius = "rounded-none",
    backgroundImage
  } = properties;

  const hasBackgroundImage = properties.backgroundImage || backgroundImage;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[70vh] flex items-center justify-center ${properties.padding || padding} ${properties.borderRadius || borderRadius} relative`}
      style={{
        background: hasBackgroundImage 
          ? `url("${hasBackgroundImage}") center/cover` 
          : `linear-gradient(to right, ${properties.backgroundColor || backgroundColor}, ${properties.secondaryColor || secondaryColor})`,
        color: properties.textColor || textColor
      }}
    >
      {hasBackgroundImage && <div className="absolute inset-0 bg-black/50"></div>}
      <div className={`${properties.textAlign || textAlign} max-w-3xl mx-auto relative z-10`}>
        <h1 className={`${properties.fontSize || fontSize} font-bold mb-6 leading-tight`} style={{ color: properties.textColor || textColor }}>
          {properties.title || title}
        </h1>
        <p className="text-xl md:text-2xl opacity-90" style={{ color: properties.textColor || textColor }}>
          {properties.subtitle || subtitle}
        </p>
      </div>
    </div>
  );
};

// Hero con CTA y redes sociales - MEJORADO
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
    showSocial = true,
    githubLink = "https://github.com",
    linkedinLink = "https://linkedin.com",
    twitterLink = "https://twitter.com",
    backgroundImage
  } = properties;

  const hasBackgroundImage = properties.backgroundImage || backgroundImage;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[80vh] flex items-center justify-center ${properties.padding || padding} relative`}
      style={{ 
        background: hasBackgroundImage 
          ? `url("${hasBackgroundImage}") center/cover` 
          : (properties.backgroundColor || backgroundColor),
        color: properties.textColor || textColor 
      }}
    >
      {hasBackgroundImage && <div className="absolute inset-0 bg-black/60"></div>}
      <div className={`${properties.textAlign || textAlign} max-w-4xl mx-auto relative z-10`}>
        <div className="inline-block px-6 py-2 rounded-full text-sm mb-6" 
             style={{ 
               backgroundColor: `${properties.primaryColor || primaryColor}33`, 
               color: properties.primaryColor || primaryColor 
             }}>
          {properties.subtitle || subtitle}
        </div>
        
        <h1 className={`${properties.fontSize || fontSize} font-bold mb-6`} style={{ color: properties.primaryColor || primaryColor }}>
          {properties.title || title}
        </h1>
        
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-80" style={{ color: properties.textColor || textColor }}>
          {properties.description || description}
        </p>

        {(properties.showButton !== undefined ? properties.showButton : showButton) && !preview && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <button 
              onClick={scrollToProjects}
              className="px-8 py-3 rounded-lg font-medium flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
              style={{ 
                backgroundColor: properties.primaryColor || primaryColor, 
                color: '#ffffff' 
              }}
            >
              {properties.buttonText || buttonText} <ArrowRight size={16} />
            </button>
          </div>
        )}

        {(properties.showSocial !== undefined ? properties.showSocial : showSocial) && (
          <div className="flex items-center justify-center gap-6">
            {(properties.githubLink || githubLink) && (
              <a 
                href={properties.githubLink || githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Github size={24} style={{ color: properties.textColor || textColor }} />
              </a>
            )}
            {(properties.linkedinLink || linkedinLink) && (
              <a 
                href={properties.linkedinLink || linkedinLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Linkedin size={24} style={{ color: properties.textColor || textColor }} />
              </a>
            )}
            {(properties.twitterLink || twitterLink) && (
              <a 
                href={properties.twitterLink || twitterLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Twitter size={24} style={{ color: properties.textColor || textColor }} />
              </a>
            )}
            {properties.emailLink && (
              <a 
                href={properties.emailLink} 
                className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Mail size={24} style={{ color: properties.textColor || textColor }} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Hero con fondo de imagen - SIMPLIFICADO
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
    buttonText = "Ver Portfolio",
    showButton = true
  } = properties;

  const imageToUse = properties.backgroundImage || backgroundImage;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[85vh] relative bg-cover bg-center flex items-center`}
      style={{ backgroundImage: `url("${imageToUse}")` }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className={`relative z-10 container mx-auto ${properties.padding || padding}`}>
        <div className="max-w-3xl">
          <h2 className="text-xl font-medium mb-4" style={{ color: properties.primaryColor || primaryColor }}>
            {properties.subtitle || subtitle}
          </h2>
          <h1 className={`${properties.fontSize || fontSize} font-bold mb-6 leading-tight`} style={{ color: properties.textColor || textColor }}>
            {properties.title || title}
          </h1>
          <p className="text-xl mb-8 max-w-2xl opacity-90" style={{ color: properties.textColor || textColor }}>
            {properties.description || description}
          </p>
          
          {(properties.showButton !== undefined ? properties.showButton : showButton) && !preview && (
            <div className="flex gap-4 flex-wrap">
              <button 
                onClick={scrollToProjects}
                className="px-8 py-4 rounded-lg font-medium flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                style={{ 
                  backgroundColor: properties.primaryColor || primaryColor, 
                  color: '#ffffff' 
                }}
              >
                {properties.buttonText || buttonText} <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Hero asimétrico - MEJORADO
export const HeroAsymmetric = ({ preview = false, properties = {} }: HeroProps) => {
  const {
    title = "Diseño & Desarrollo Full Stack",
    subtitle = "Desarrollador Web 🚀",
    description = "Creando experiencias web excepcionales con las últimas tecnologías",
    backgroundColor = "#f9fafb",
    textColor = "#111827",
    primaryColor = "#6366f1",
    fontSize = "text-4xl md:text-6xl",
    padding = "p-8",
    backgroundImage
  } = properties;

  const hasBackgroundImage = properties.backgroundImage || backgroundImage;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[80vh] relative`}
      style={{ 
        background: hasBackgroundImage 
          ? `url("${hasBackgroundImage}") center/cover` 
          : (properties.backgroundColor || backgroundColor)
      }}
    >
      {hasBackgroundImage && <div className="absolute inset-0 bg-black/40"></div>}
      <div className={`container mx-auto ${properties.padding || padding} py-20 grid md:grid-cols-2 gap-12 items-center relative z-10`}>
        <div>
          <div className="inline-block px-4 py-1 rounded-full text-sm mb-6"
               style={{ 
                 backgroundColor: `${properties.primaryColor || primaryColor}33`, 
                 color: properties.primaryColor || primaryColor 
               }}>
            {properties.subtitle || subtitle}
          </div>
          <h1 className={`${properties.fontSize || fontSize} font-bold mb-6 leading-tight`} style={{ color: properties.textColor || textColor }}>
            {properties.title || title}
          </h1>
          <p className="text-xl mb-8" style={{ color: properties.textColor || textColor, opacity: 0.7 }}>
            {properties.description || description}
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl rotate-6 opacity-20"
               style={{ backgroundColor: properties.primaryColor || primaryColor }}></div>
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

// Hero con imagen de perfil - MEJORADO
export const HeroWithProfile = ({ preview = false, properties = {} }: HeroProps) => {
  const {
    title = "Juan Pérez",
    subtitle = "Desarrollador Full Stack",
    description = "Creando experiencias digitales excepcionales con tecnologías modernas",
    backgroundColor = "#ffffff",
    textColor = "#1f2937",
    primaryColor = "#3b82f6",
    fontSize = "text-4xl md:text-6xl",
    textAlign = "text-center",
    padding = "p-12",
    profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    buttonText = "Contáctame",
    showButton = true,
    showSocial = true,
    backgroundImage
  } = properties;

  const imageToUse = properties.profileImage || profileImage;
  const hasBackgroundImage = properties.backgroundImage || backgroundImage;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[80vh] flex items-center justify-center ${properties.padding || padding} relative`}
      style={{ 
        background: hasBackgroundImage 
          ? `url("${hasBackgroundImage}") center/cover` 
          : (properties.backgroundColor || backgroundColor)
      }}
    >
      {hasBackgroundImage && <div className="absolute inset-0 bg-black/50"></div>}
      <div className={`${properties.textAlign || textAlign} max-w-4xl mx-auto relative z-10`}>
        <div className="relative flex-shrink-0">
          <Image 
            src={properties.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"} 
            alt="Profile"
            width={160}
            height={160}
            className="rounded-full object-cover border-4 shadow-lg"
            style={{ borderColor: properties.primaryColor || '#6366f1' }}
          />
        </div>
        
        <h1 className={`${properties.fontSize || fontSize} font-bold mb-4`} style={{ color: properties.textColor || textColor }}>
          {properties.title || title}
        </h1>
        
        <p className="text-xl md:text-2xl mb-6" style={{ color: properties.primaryColor || primaryColor }}>
          {properties.subtitle || subtitle}
        </p>
        
        <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: properties.textColor || textColor, opacity: 0.7 }}>
          {properties.description || description}
        </p>

        {(properties.showButton !== undefined ? properties.showButton : showButton) && !preview && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <button 
              onClick={scrollToProjects}
              className="px-8 py-3 rounded-lg font-medium cursor-pointer hover:scale-105 transition-transform"
              style={{ 
                backgroundColor: properties.primaryColor || primaryColor, 
                color: '#ffffff' 
              }}
            >
              {properties.buttonText || buttonText}
            </button>
          </div>
        )}

        {(properties.showSocial !== undefined ? properties.showSocial : showSocial) && (
          <div className="flex items-center justify-center gap-6">
            {properties.githubLink && (
              <a href={properties.githubLink} target="_blank" rel="noopener noreferrer">
                <Github size={24} style={{ color: properties.textColor || textColor, opacity: 0.7 }} />
              </a>
            )}
            {properties.linkedinLink && (
              <a href={properties.linkedinLink} target="_blank" rel="noopener noreferrer">
                <Linkedin size={24} style={{ color: properties.textColor || textColor, opacity: 0.7 }} />
              </a>
            )}
            {properties.emailLink && (
              <a href={properties.emailLink}>
                <Mail size={24} style={{ color: properties.textColor || textColor, opacity: 0.7 }} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Hero Split Screen - MEJORADO
export const HeroSplitScreen = ({ preview = false, properties = {} }: HeroProps) => {
  const {
    title = "Desarrollador Full Stack",
    subtitle = "Especialista en React & Node.js",
    description = "Transformo ideas complejas en aplicaciones web elegantes y funcionales",
    backgroundColor = "#0f172a",
    textColor = "#ffffff",
    primaryColor = "#f59e0b",
    fontSize = "text-4xl md:text-5xl",
    padding = "p-0",
    profileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
    showButton = true,
    buttonText = "Ver Proyectos"
  } = properties;

  const imageToUse = properties.profileImage || profileImage;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} min-h-[100vh] grid md:grid-cols-2`}
    >
      {/* Lado izquierdo - Contenido */}
      <div 
        className="flex items-center justify-center p-12"
        style={{ backgroundColor: properties.backgroundColor || backgroundColor }}
      >
        <div className="max-w-lg">
          <h1 className={`${properties.fontSize || fontSize} font-bold mb-6 leading-tight`} style={{ color: properties.textColor || textColor }}>
            {properties.title || title}
          </h1>
          <p className="text-xl mb-4" style={{ color: properties.primaryColor || primaryColor }}>
            {properties.subtitle || subtitle}
          </p>
          <p className="text-lg mb-8 opacity-80" style={{ color: properties.textColor || textColor }}>
            {properties.description || description}
          </p>
          
          {(properties.showButton !== undefined ? properties.showButton : showButton) && !preview && (
            <button 
              onClick={scrollToProjects}
              className="px-8 py-4 rounded-lg font-medium cursor-pointer hover:scale-105 transition-transform"
              style={{ 
                backgroundColor: properties.primaryColor || primaryColor, 
                color: '#000000' 
              }}
            >
              {properties.buttonText || buttonText}
            </button>
          )}
        </div>
      </div>
      
      {/* Lado derecho - Imagen */}
      <div className="relative">
        <img 
          src={imageToUse} 
          alt="Perfil"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
      </div>
    </div>
  );
};