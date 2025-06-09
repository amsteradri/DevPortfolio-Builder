import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProjectsProps {
  preview?: boolean;
  properties?: {
    title?: string;
    description?: string;
    backgroundColor?: string;
    textColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fontSize?: string;
    textAlign?: string;
    padding?: string;
    borderRadius?: string;
    projects?: Array<{
      title: string;
      description: string;
      image: string;
      technologies: string[];
      demoLink?: string;
      githubLink?: string;
      date?: string;
      featured?: boolean;
    }>;
    showTechnologies?: boolean;
    showLinks?: boolean;
    showDate?: boolean;
    layout?: 'grid' | 'masonry' | 'carousel';
    columns?: number;
  };
}

// Proyectos Grid Clásico (3 columnas)
export const ProjectsGrid = ({ preview = false, properties = {} }: ProjectsProps) => {
  const {
    title = "Mis Proyectos",
    description = "Algunos trabajos destacados que demuestran mis habilidades",
    backgroundColor = "#ffffff",
    textColor = "#1f2937",
    primaryColor = "#3b82f6",
    fontSize = "text-3xl",
    textAlign = "text-center",
    padding = "p-12",
    borderRadius = "rounded-xl",
    showTechnologies = true,
    showLinks = true,
    projects = [
      {
        title: "E-commerce Platform",
        description: "Plataforma completa de comercio electrónico con React y Node.js",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
        technologies: ["React", "Node.js", "MongoDB"],
        demoLink: "https://demo.com",
        githubLink: "https://github.com"
      },
      {
        title: "Task Management App",
        description: "Aplicación de gestión de tareas con funcionalidades avanzadas",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
        technologies: ["Vue.js", "Firebase", "Tailwind"],
        demoLink: "https://demo.com",
        githubLink: "https://github.com"
      },
      {
        title: "Portfolio Website",
        description: "Sitio web personal con diseño moderno y responsivo",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        technologies: ["Next.js", "TypeScript", "Vercel"],
        demoLink: "https://demo.com",
        githubLink: "https://github.com"
      }
    ]
  } = properties;

  // IMPORTANTE: Usar las propiedades personalizadas
  const projectsToShow = properties.projects || projects;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || padding} min-h-[600px]`}
      style={{ backgroundColor: properties.backgroundColor || backgroundColor }}
    >
      <div className={`${properties.textAlign || textAlign} mb-12`}>
        <h2 className={`${properties.fontSize || fontSize} font-bold mb-4`} style={{ color: properties.textColor || textColor }}>
          {properties.title || title}
        </h2>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: properties.textColor || textColor, opacity: 0.7 }}>
          {properties.description || description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsToShow.map((project, index) => (
          <div key={index} className={`group ${properties.borderRadius || borderRadius} overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`} style={{ backgroundColor: '#ffffff' }}>
            <div className="relative overflow-hidden">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image 
                  src={project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop"} 
                  alt={project.title}
                  width={800}
                  height={450}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                {(properties.showLinks !== undefined ? properties.showLinks : showLinks) && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3">
                    {project.demoLink && (
                      <a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} style={{ color: properties.primaryColor || primaryColor }} />
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} style={{ color: properties.textColor || textColor }} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3" style={{ color: properties.textColor || textColor }}>
                {project.title}
              </h3>
              <p className="text-sm mb-4" style={{ color: properties.textColor || textColor, opacity: 0.7 }}>
                {project.description}
              </p>
              {(properties.showTechnologies !== undefined ? properties.showTechnologies : showTechnologies) && project.technologies && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{ 
                        backgroundColor: `${properties.primaryColor || primaryColor}15`,
                        color: properties.primaryColor || primaryColor
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Proyectos Masonry (distribución irregular)
export const ProjectsMasonry = ({ preview = false, properties = {} }: ProjectsProps) => {
  const {
    title = "Portfolio de Proyectos",
    description = "Una colección de mis trabajos más destacados",
    backgroundColor = "#f8fafc",
    textColor = "#1e293b",
    primaryColor = "#8b5cf6",
    padding = "p-12",
    showTechnologies = true,
    showLinks = true,
    projects = [
      {
        title: "App Móvil de Fitness",
        description: "Aplicación móvil para seguimiento de ejercicios y nutrición con integración de wearables",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        technologies: ["React Native", "Firebase", "Redux"],
        featured: true
      },
      {
        title: "Dashboard Analytics",
        description: "Panel de control para análisis de datos en tiempo real",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
        technologies: ["D3.js", "React", "Node.js"]
      },
      {
        title: "Sistema de Reservas",
        description: "Plataforma completa para gestión de reservas hoteleras con múltiples integraciones",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=280&fit=crop",
        technologies: ["Laravel", "Vue.js", "MySQL"],
        featured: true
      }
    ]
  } = properties;

  const projectsToShow = properties.projects || projects;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${padding} min-h-[700px]`}
      style={{ backgroundColor }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4" style={{ color: textColor }}>
          {title}
        </h2>
        <p className="text-xl max-w-3xl mx-auto" style={{ color: textColor, opacity: 0.7 }}>
          {description}
        </p>
      </div>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {projectsToShow.map((project, index) => (
          <div key={index} className="break-inside-avoid mb-8">
            <div className={`group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${project.featured ? 'ring-2' : ''}`} 
                 style={{ 
                   backgroundColor: '#ffffff',
                   ...(project.featured && { ringColor: primaryColor })
                 }}>
              {project.featured && (
                <div className="relative">
                  <div 
                    className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    ⭐ Destacado
                  </div>
                </div>
              )}
              <div className="relative overflow-hidden">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image 
                    src={project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop"} 
                    alt={project.title}
                    width={800}
                    height={450}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: textColor }}>
                  {project.title}
                </h3>
                <p className="mb-4" style={{ color: textColor, opacity: 0.7 }}>
                  {project.description}
                </p>
                {showTechnologies && project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 text-xs rounded-md"
                        style={{ 
                          backgroundColor: `${primaryColor}20`,
                          color: primaryColor
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {showLinks && (
                  <div className="flex gap-3">
                    {project.demoLink && (
                      <a 
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 rounded-lg font-medium text-white flex items-center justify-center gap-2 text-center"
                        style={{ backgroundColor: primaryColor }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                        Ver Proyecto
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={16} style={{ color: textColor }} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Proyectos con Línea de Tiempo
export const ProjectsTimeline = ({ preview = false, properties = {} }: ProjectsProps) => {
  const {
    title = "Mi Trayectoria de Proyectos",
    description = "Un viaje a través de mis proyectos más significativos",
    backgroundColor = "#ffffff",
    textColor = "#1f2937",
    primaryColor = "#10b981",
    padding = "p-12",
    showDate = true,
    projects = [
      {
        title: "Plataforma de E-learning",
        description: "Sistema completo de gestión de aprendizaje con video streaming y evaluaciones automáticas",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
        technologies: ["React", "Node.js", "WebRTC", "MongoDB"],
        date: "2024"
      },
      {
        title: "App de Delivery",
        description: "Aplicación móvil y web para delivery de comida con tracking en tiempo real",
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=200&fit=crop",
        technologies: ["React Native", "Express", "Socket.io", "PostgreSQL"],
        date: "2023"
      },
      {
        title: "CRM Empresarial",
        description: "Sistema de gestión de relaciones con clientes para pequeñas y medianas empresas",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
        technologies: ["Vue.js", "Laravel", "MySQL", "Redis"],
        date: "2022"
      }
    ]
  } = properties;

  const projectsToShow = properties.projects || projects;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${padding} min-h-[800px]`}
      style={{ backgroundColor }}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4" style={{ color: textColor }}>
          {title}
        </h2>
        <p className="text-xl max-w-3xl mx-auto" style={{ color: textColor, opacity: 0.7 }}>
          {description}
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {projectsToShow.map((project, index) => (
          <div key={index} className="relative">
            {/* Línea vertical */}
            {index < projectsToShow.length - 1 && (
              <div 
                className="absolute left-8 top-16 w-0.5 h-32 z-0"
                style={{ backgroundColor: `${primaryColor}40` }}
              ></div>
            )}
            
            <div className={`flex items-start gap-8 mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              {/* Año */}
              <div className="flex-shrink-0">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 relative"
                  style={{ backgroundColor: primaryColor }}
                >
                  {showDate && project.date ? project.date.slice(-2) : (index + 1)}
                </div>
              </div>
              
              {/* Contenido del proyecto */}
              <div className="flex-1 max-w-lg">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image 
                      src={project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop"} 
                      alt={project.title}
                      width={800}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold" style={{ color: textColor }}>
                        {project.title}
                      </h3>
                      {showDate && project.date && (
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: `${primaryColor}20`,
                            color: primaryColor
                          }}
                        >
                          {project.date}
                        </span>
                      )}
                    </div>
                    <p className="mb-4" style={{ color: textColor, opacity: 0.7 }}>
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 text-xs rounded-md border"
                            style={{ 
                              borderColor: `${primaryColor}30`,
                              color: primaryColor
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Proyectos Horizontales (Cards grandes)
export const ProjectsHorizontal = ({ preview = false, properties = {} }: ProjectsProps) => {
  const {
    title = "Proyectos Destacados",
    description = "Mis trabajos más importantes en detalle",
    backgroundColor = "#0f172a",
    textColor = "#ffffff",
    primaryColor = "#f59e0b",
    padding = "p-12",
    projects = [
      {
        title: "Plataforma de Streaming",
        description: "Desarrollo completo de una plataforma de streaming de video con funcionalidades avanzadas de reproducción, subscripciones y análisis de audiencia. Implementación de CDN global para optimal performance.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=300&fit=crop",
        technologies: ["Next.js", "AWS", "Redis", "GraphQL", "Docker"],
        demoLink: "https://demo.com",
        githubLink: "https://github.com"
      },
      {
        title: "Marketplace B2B",
        description: "Marketplace para empresas con sistema de facturación automática, gestión de inventario en tiempo real y panel de analytics avanzado. Integración con múltiples pasarelas de pago.",
        image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=300&fit=crop",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Kubernetes"],
        demoLink: "https://demo.com",
        githubLink: "https://github.com"
      }
    ]
  } = properties;

  const projectsToShow = properties.projects || projects;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${padding} min-h-[600px]`}
      style={{ backgroundColor }}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4" style={{ color: textColor }}>
          {title}
        </h2>
        <p className="text-xl max-w-3xl mx-auto" style={{ color: textColor, opacity: 0.7 }}>
          {description}
        </p>
      </div>
      
      <div className="space-y-16 max-w-6xl mx-auto">
        {projectsToShow.map((project, index) => (
          <div key={index} className={`flex items-center gap-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
            {/* Imagen */}
            <div className="flex-1">
              <div className="relative group overflow-hidden rounded-2xl">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image 
                    src={project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop"} 
                    alt={project.title}
                    width={800}
                    height={450}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
            
            {/* Contenido */}
            <div className="flex-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold mb-4" style={{ color: textColor }}>
                    {project.title}
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
                    {project.description}
                  </p>
                </div>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: `${primaryColor}20`,
                          color: primaryColor,
                          border: `1px solid ${primaryColor}40`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4">
                  {project.demoLink && (
                    <a 
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
                      style={{ 
                        backgroundColor: primaryColor,
                        color: '#000000'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={18} />
                      Ver Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors"
                      style={{ color: textColor }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={18} />
                      Ver Código
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Proyectos Minimalista
export const ProjectsMinimal = ({ preview = false, properties = {} }: ProjectsProps) => {
  const {
    title = "Trabajos Seleccionados",
    backgroundColor = "#ffffff",
    textColor = "#374151",
    primaryColor = "#6366f1",
    padding = "p-12",
    projects = [
      {
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution",
        technologies: ["React", "Node.js", "Stripe"],
        demoLink: "https://demo.com"
      },
      {
        title: "Task Management",
        description: "Collaborative project management tool",
        technologies: ["Vue.js", "Firebase"],
        demoLink: "https://demo.com"
      },
      {
        title: "Analytics Dashboard",
        description: "Real-time data visualization platform",
        technologies: ["D3.js", "Python", "FastAPI"],
        demoLink: "https://demo.com"
      }
    ]
  } = properties;

  const projectsToShow = properties.projects || projects;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${padding} min-h-[400px]`}
      style={{ backgroundColor }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center" style={{ color: textColor }}>
          {title}
        </h2>
        
        <div className="space-y-12">
          {projectsToShow.map((project, index) => (
            <div key={index} className="group py-8 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-baseline gap-6 mb-3">
                    <h3 className="text-2xl font-bold group-hover:translate-x-2 transition-transform" style={{ color: textColor }}>
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {project.technologies && project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-sm"
                          style={{ color: primaryColor }}
                        >
                          {tech}{techIndex < Math.min(project.technologies.length, 3) - 1 && ' ·'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-lg" style={{ color: textColor, opacity: 0.7 }}>
                    {project.description}
                  </p>
                </div>
                
                {project.demoLink && (
                  <a 
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-8 p-3 rounded-full border border-gray-300 hover:border-gray-400 transition-colors group-hover:translate-x-2 group-hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} style={{ color: primaryColor }} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Exportar el componente original para compatibilidad
export const ProjectsBlock = ProjectsGrid;