import { Github, Linkedin, User, Star, MapPin, Download } from 'lucide-react';
import Image from 'next/image';

interface AboutProps {
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
    showIcon?: boolean;
    iconColor?: string;
    profileImage?: string;
    name?: string;
    role?: string;
    location?: string;
    experience?: string;
    skills?: string[];
    showStats?: boolean;
    showSocial?: boolean;
    buttonText?: string;
    showButton?: boolean;
    // Enlaces
    emailLink?: string;
    linkedinLink?: string;
    githubLink?: string;
    phoneLink?: string;
    cvLink?: string;
    // Estadísticas personalizables
    projectsCount?: string;
    clientsCount?: string;
    coffeeCount?: string;
    // Timeline personalizable
    timeline?: Array<{
      year: string;
      title: string;
      company: string;
    }>;
  };
}

// About Simple - COMPLETAMENTE EDITABLE
export const AboutSimple = ({ preview = false, properties = {} }: AboutProps) => {
  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-8'} ${properties.borderRadius || 'rounded-xl'} border min-h-[300px] flex flex-col justify-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || '#f0f9ff', 
        borderColor: `${properties.primaryColor || '#3b82f6'}33`
      }}
    >
      <h3 
        className={`${properties.fontSize || 'text-xl'} font-bold mb-4 ${properties.textAlign || 'text-left'}`} 
        style={{ color: properties.textColor || '#1f2937' }}
      >
        {properties.title || "Sobre Mí"}
      </h3>
      <p 
        className={`${properties.textAlign || 'text-left'} text-lg leading-relaxed`} 
        style={{ color: properties.textColor || '#1f2937', opacity: 0.8 }}
      >
        {properties.description || "Desarrollador Full Stack apasionado por crear experiencias digitales increíbles. Con más de 5 años de experiencia en el desarrollo web, me especializo en crear aplicaciones modernas, escalables y centradas en el usuario."}
      </p>
    </div>
  );
};

// About con Icono - COMPLETAMENTE EDITABLE
export const AboutWithIcon = ({ preview = false, properties = {} }: AboutProps) => {
  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-8'} ${properties.borderRadius || 'rounded-xl'} border min-h-[350px] flex items-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || '#f0f9ff', 
        borderColor: `${properties.primaryColor || '#3b82f6'}33`
      }}
    >
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        {(properties.showIcon ?? true) && (
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: properties.primaryColor || '#3b82f6' }}
          >
            <User size={32} style={{ color: properties.iconColor || '#ffffff' }} />
          </div>
        )}
        <div className="flex-1 text-center md:text-left">
          <h3 
            className={`${properties.fontSize || 'text-xl'} font-bold mb-4`} 
            style={{ color: properties.textColor || '#1f2937' }}
          >
            {properties.title || "Sobre Mí"}
          </h3>
          <p 
            className="text-lg leading-relaxed" 
            style={{ color: properties.textColor || '#1f2937', opacity: 0.8 }}
          >
            {properties.description || "Desarrollador Full Stack apasionado por crear experiencias digitales increíbles. Me especializo en tecnologías modernas como React, Node.js, y bases de datos tanto SQL como NoSQL."}
          </p>
        </div>
      </div>
    </div>
  );
};

// About con Foto de Perfil - COMPLETAMENTE EDITABLE
export const AboutWithPhoto = ({ preview = false, properties = {} }: AboutProps) => {
  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-10'} ${properties.borderRadius || 'rounded-2xl'} shadow-lg border min-h-[400px] flex items-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || '#ffffff', 
        borderColor: `${properties.primaryColor || '#6366f1'}20` 
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
        <div className="relative flex-shrink-0">
          <Image 
            src={properties.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"} 
            alt="Perfil"
            width={160}
            height={160}
            className="rounded-full object-cover border-4 shadow-lg"
            style={{ borderColor: properties.primaryColor || '#6366f1' }}
          />
          <div 
            className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: properties.primaryColor || '#6366f1' }}
          >
            <Star size={20} className="text-white" />
          </div>
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h3 
            className="text-3xl font-bold mb-2" 
            style={{ color: properties.textColor || '#1f2937' }}
          >
            {properties.name || "Juan Pérez"}
          </h3>
          <p 
            className="text-xl font-medium mb-4" 
            style={{ color: properties.primaryColor || '#6366f1' }}
          >
            {properties.role || "Desarrollador Full Stack"}
          </p>
          <p 
            className="text-lg leading-relaxed" 
            style={{ color: properties.textColor || '#1f2937', opacity: 0.8 }}
          >
            {properties.description || "Desarrollador apasionado con 5+ años de experiencia creando aplicaciones web modernas y escalables. Mi experiencia abarca desde el desarrollo frontend con React y Vue.js hasta backend con Node.js y Python."}
          </p>
        </div>
      </div>
    </div>
  );
};

// About con Estadísticas - COMPLETAMENTE EDITABLE
export const AboutWithStats = ({ preview = false, properties = {} }: AboutProps) => {
  const stats = [
    { 
      label: "Años Experiencia", 
      value: properties.experience || "5+", 
      icon: Calendar 
    },
    { 
      label: "Proyectos", 
      value: properties.projectsCount || "50+", 
      icon: Code 
    },
    { 
      label: "Clientes Felices", 
      value: properties.clientsCount || "30+", 
      icon: Heart 
    },
    { 
      label: "Cafés Bebidos", 
      value: properties.coffeeCount || "∞", 
      icon: Coffee 
    }
  ];

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-10'} ${properties.borderRadius || 'rounded-xl'} border shadow-sm min-h-[450px] flex flex-col justify-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || '#f8fafc', 
        borderColor: `${properties.primaryColor || '#0ea5e9'}20` 
      }}
    >
      <div className="text-center mb-10">
        <h3 
          className="text-4xl font-bold mb-3" 
          style={{ color: properties.textColor || '#1e293b' }}
        >
          {properties.name || "Ana García"}
        </h3>
        <p 
          className="text-xl leading-relaxed max-w-3xl mx-auto" 
          style={{ color: properties.textColor || '#1e293b', opacity: 0.7 }}
        >
          {properties.description || "Especialista en desarrollo frontend con pasión por crear experiencias de usuario excepcionales. Mi enfoque se centra en la accesibilidad, el rendimiento y la usabilidad."}
        </p>
      </div>

      {(properties.showStats ?? true) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center p-6 rounded-lg" 
                style={{ backgroundColor: `${properties.primaryColor || '#0ea5e9'}10` }}
              >
                <IconComponent 
                  size={32} 
                  className="mx-auto mb-3" 
                  style={{ color: properties.primaryColor || '#0ea5e9' }} 
                />
                <div 
                  className="text-3xl font-bold mb-1" 
                  style={{ color: properties.textColor || '#1e293b' }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-sm" 
                  style={{ color: properties.textColor || '#1e293b', opacity: 0.6 }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// About Minimalista - COMPLETAMENTE EDITABLE
export const AboutMinimal = ({ preview = false, properties = {} }: AboutProps) => {
  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-8'} ${properties.borderRadius || 'rounded-none'} border-l-4 min-h-[320px] flex items-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || '#ffffff',
        borderLeftColor: properties.primaryColor || '#10b981'
      }}
    >
      <div className="flex items-start gap-6 w-full">
        <div 
          className="w-1 h-24 rounded-full flex-shrink-0" 
          style={{ backgroundColor: properties.primaryColor || '#10b981' }}
        ></div>
        <div className="flex-1">
          <h3 
            className={`${properties.fontSize || 'text-xl'} font-semibold mb-4`} 
            style={{ color: properties.textColor || '#374151' }}
          >
            {properties.title || "Sobre Mí"}
          </h3>
          <p 
            className="text-lg leading-relaxed" 
            style={{ color: properties.textColor || '#374151', opacity: 0.8 }}
          >
            {properties.description || "Desarrollador con enfoque en crear soluciones elegantes y funcionales. Creo firmemente que el mejor código es aquel que es simple, mantenible y eficiente."}
          </p>
        </div>
      </div>
    </div>
  );
};

// About con Tarjeta de Perfil Completa - COMPLETAMENTE EDITABLE
export const AboutProfileCard = ({ preview = false, properties = {} }: AboutProps) => {
  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.borderRadius || 'rounded-2xl'} overflow-hidden shadow-2xl min-h-[500px]`}
      style={{ backgroundColor: properties.backgroundColor || '#1f2937' }}
    >
      {/* Header con gradiente */}
      <div 
        className="h-40 relative"
        style={{ 
          background: `linear-gradient(135deg, ${properties.primaryColor || '#f59e0b'}, ${properties.primaryColor || '#f59e0b'}80)`
        }}
      >
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
          <Image 
            src={properties.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"} 
            alt="Perfil"
            width={160}
            height={160}
            className="rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="pt-24 p-8 text-center">
        <h3 
          className="text-3xl font-bold mb-2" 
          style={{ color: properties.textColor || '#ffffff' }}
        >
          {properties.name || "Carlos Rodríguez"}
        </h3>
        <p 
          className="text-xl font-medium mb-3" 
          style={{ color: properties.primaryColor || '#f59e0b' }}
        >
          {properties.role || "UI/UX Designer & Developer"}
        </p>
        <div 
          className="flex items-center justify-center gap-2 mb-6 text-base" 
          style={{ color: properties.textColor || '#ffffff', opacity: 0.7 }}
        >
          <MapPin size={18} />
          <span>{properties.location || "Madrid, España"}</span>
        </div>
        <p 
          className="mb-8 text-lg leading-relaxed" 
          style={{ color: properties.textColor || '#ffffff', opacity: 0.8 }}
        >
          {properties.description || "Diseñador y desarrollador con 8 años de experiencia creando productos digitales que las personas aman usar. Mi enfoque combina la creatividad del diseño con la precisión técnica del desarrollo."}
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {(properties.showButton ?? true) && properties.cvLink && (
            <a 
              href={properties.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 text-lg"
              style={{ backgroundColor: properties.primaryColor || '#f59e0b', color: '#000000' }}
            >
              <Download size={18} />
              {properties.buttonText || "Descargar CV"}
            </a>
          )}
          {(properties.showSocial ?? true) && (
            <div className="flex gap-4 justify-center">
              {properties.emailLink && (
                <a 
                  href={properties.emailLink}
                  className="p-3 rounded-lg border hover:bg-white hover:bg-opacity-10 transition-colors" 
                  style={{ borderColor: `${properties.textColor || '#ffffff'}30` }}
                >
                  <Mail size={20} style={{ color: properties.textColor || '#ffffff' }} />
                </a>
              )}
              {properties.linkedinLink && (
                <a 
                  href={properties.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border hover:bg-white hover:bg-opacity-10 transition-colors" 
                  style={{ borderColor: `${properties.textColor || '#ffffff'}30` }}
                >
                  <Linkedin size={20} style={{ color: properties.textColor || '#ffffff' }} />
                </a>
              )}
              {properties.githubLink && (
                <a 
                  href={properties.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border hover:bg-white hover:bg-opacity-10 transition-colors" 
                  style={{ borderColor: `${properties.textColor || '#ffffff'}30` }}
                >
                  <Github size={20} style={{ color: properties.textColor || '#ffffff' }} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// About con Skills - COMPLETAMENTE EDITABLE
export const AboutWithSkills = ({ preview = false, properties = {} }: AboutProps) => {
  const defaultSkills = ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL", "MongoDB", "GraphQL"];
  const skillsToShow = properties.skills && properties.skills.length > 0 ? properties.skills : defaultSkills;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-10'} ${properties.borderRadius || 'rounded-xl'} border shadow-sm min-h-[400px] flex items-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || '#f1f5f9', 
        borderColor: `${properties.primaryColor || '#3b82f6'}20` 
      }}
    >
      <div className="grid lg:grid-cols-2 gap-10 items-center w-full">
        {/* Info personal */}
        <div>
          <div className="flex items-center gap-6 mb-6">
            <Image 
              src={properties.profileImage || "https://images.unsplash.com/photo-1494790108755-2616b612b372?w=200&h=200&fit=crop&crop=face"} 
              alt="Perfil"
              width={80}
              height={80}
              className="rounded-full object-cover border-3"
              style={{ borderColor: properties.primaryColor || '#3b82f6' }}
            />
            <div>
              <h3 
                className="text-2xl font-bold mb-1" 
                style={{ color: properties.textColor || '#0f172a' }}
              >
                {properties.name || "Laura Martín"}
              </h3>
              <p 
                className="text-lg" 
                style={{ color: properties.primaryColor || '#3b82f6' }}
              >
                {properties.role || "Full Stack Developer"}
              </p>
            </div>
          </div>
          <p 
            className="text-lg leading-relaxed" 
            style={{ color: properties.textColor || '#0f172a', opacity: 0.8 }}
          >
            {properties.description || "Desarrolladora especializada en React, Node.js y tecnologías cloud. Mi pasión por la tecnología me ha llevado a dominar tanto el frontend como el backend, permitiéndome crear aplicaciones completas desde la concepción hasta el despliegue."}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h4 
            className="text-xl font-semibold mb-6" 
            style={{ color: properties.textColor || '#0f172a' }}
          >
            Tecnologías & Herramientas
          </h4>
          <div className="flex flex-wrap gap-3">
            {skillsToShow.map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: `${properties.primaryColor || '#3b82f6'}20`,
                  color: properties.primaryColor || '#3b82f6'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// About con Timeline - COMPLETAMENTE EDITABLE
export const AboutTimeline = ({ preview = false, properties = {} }: AboutProps) => {
  const defaultTimeline = [
    { year: "2024", title: "Senior Full Stack Developer", company: "Tech Innovators Inc." },
    { year: "2022", title: "Full Stack Developer", company: "Digital Solutions Ltd." },
    { year: "2020", title: "Frontend Developer", company: "Creative Agency" },
    { year: "2019", title: "Junior Developer", company: "StartUp Ventures" }
  ];

  const timelineToShow = properties.timeline && properties.timeline.length > 0 ? properties.timeline : defaultTimeline;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-10'} ${properties.borderRadius || 'rounded-xl'} border shadow-sm min-h-[450px] flex flex-col justify-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || '#ffffff', 
        borderColor: `${properties.primaryColor || '#8b5cf6'}20` 
      }}
    >
      <div className="text-center mb-10">
        <h3 
          className="text-3xl font-bold mb-3" 
          style={{ color: properties.textColor || '#1f2937' }}
        >
          {properties.title || "Mi Trayectoria"}
        </h3>
        <p 
          className="text-lg leading-relaxed max-w-2xl mx-auto" 
          style={{ color: properties.textColor || '#1f2937', opacity: 0.7 }}
        >
          {properties.description || "Un viaje de crecimiento constante en el mundo del desarrollo. Cada etapa de mi carrera ha sido una oportunidad para aprender, crecer y contribuir a proyectos cada vez más desafiantes e impactantes."}
        </p>
      </div>

      <div className="space-y-8 max-w-2xl mx-auto w-full">
        {timelineToShow.map((item, index) => (
          <div key={index} className="flex items-center gap-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ backgroundColor: properties.primaryColor || '#8b5cf6' }}
            >
              {item.year.slice(-2)}
            </div>
            <div className="flex-1">
              <h4 
                className="text-xl font-semibold mb-1" 
                style={{ color: properties.textColor || '#1f2937' }}
              >
                {item.title}
              </h4>
              <p 
                className="text-base" 
                style={{ color: properties.textColor || '#1f2937', opacity: 0.6 }}
              >
                {item.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};