import { User, Code, Coffee, Heart, MapPin, Calendar, Award, Star, Download, Mail, Phone, Linkedin, Github, Upload, Link } from 'lucide-react';

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
    // Nuevas propiedades para links
    emailLink?: string;
    linkedinLink?: string;
    githubLink?: string;
    phoneLink?: string;
    cvLink?: string;
  };
}

// About Simple - COMPLETAMENTE EDITABLE
export const AboutSimple = ({ preview = false, properties = {} }: AboutProps) => {
  const {
    title = "Sobre Mí",
    description = "Desarrollador Full Stack apasionado por crear experiencias digitales increíbles. Con más de 5 años de experiencia en el desarrollo web, me especializo en crear aplicaciones modernas, escalables y centradas en el usuario. Mi enfoque se basa en escribir código limpio, seguir las mejores prácticas y mantenerme actualizado con las últimas tecnologías del mercado.",
    backgroundColor = "#f0f9ff",
    textColor = "#1f2937",
    primaryColor = "#3b82f6",
    fontSize = "text-xl",
    textAlign = "text-left",
    padding = "p-8",
    borderRadius = "rounded-xl"
  } = properties;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${padding} ${borderRadius} border min-h-[300px] flex flex-col justify-center`}
      style={{ 
        backgroundColor, 
        borderColor: `${primaryColor}33`
      }}
    >
      <h3 className={`${fontSize} font-bold mb-4 ${textAlign}`} style={{ color: textColor }}>
        {properties.title || title}
      </h3>
      <p className={`${textAlign} text-lg leading-relaxed`} style={{ color: textColor, opacity: 0.8 }}>
        {properties.description || description}
      </p>
    </div>
  );
};

// About con Icono - COMPLETAMENTE EDITABLE
export const AboutWithIcon = ({ preview = false, properties = {} }: AboutProps) => {
  const {
    title = "Sobre Mí",
    description = "Desarrollador Full Stack apasionado por crear experiencias digitales increíbles. Me especializo en tecnologías modernas como React, Node.js, y bases de datos tanto SQL como NoSQL. Mi objetivo es crear soluciones que no solo funcionen perfectamente, sino que también proporcionen una experiencia excepcional al usuario final.",
    backgroundColor = "#f0f9ff",
    textColor = "#1f2937",
    primaryColor = "#3b82f6",
    iconColor = "#ffffff",
    fontSize = "text-xl",
    padding = "p-8",
    borderRadius = "rounded-xl",
    showIcon = true
  } = properties;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${padding} ${borderRadius} border min-h-[350px] flex items-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || backgroundColor, 
        borderColor: `${properties.primaryColor || primaryColor}33`
      }}
    >
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        {(properties.showIcon !== undefined ? properties.showIcon : showIcon) && (
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: properties.primaryColor || primaryColor }}
          >
            <User size={32} style={{ color: properties.iconColor || iconColor }} />
          </div>
        )}
        <div className="flex-1 text-center md:text-left">
          <h3 className={`${properties.fontSize || fontSize} font-bold mb-4`} style={{ color: properties.textColor || textColor }}>
            {properties.title || title}
          </h3>
          <p className="text-lg leading-relaxed" style={{ color: properties.textColor || textColor, opacity: 0.8 }}>
            {properties.description || description}
          </p>
        </div>
      </div>
    </div>
  );
};

// About con Foto de Perfil - COMPLETAMENTE EDITABLE
export const AboutWithPhoto = ({ preview = false, properties = {} }: AboutProps) => {
  const {
    title = "Sobre Mí",
    name = "Juan Pérez",
    role = "Desarrollador Full Stack",
    description = "Desarrollador apasionado con 5+ años de experiencia creando aplicaciones web modernas y escalables. Mi experiencia abarca desde el desarrollo frontend con React y Vue.js hasta backend con Node.js y Python. Me encanta resolver problemas complejos y transformar ideas en productos digitales que generen impacto real.",
    backgroundColor = "#ffffff",
    textColor = "#1f2937",
    primaryColor = "#6366f1",
    padding = "p-10",
    borderRadius = "rounded-2xl",
    profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  } = properties;

  const imageToUse = properties.profileImage || profileImage;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || padding} ${properties.borderRadius || borderRadius} shadow-lg border min-h-[400px] flex items-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || backgroundColor, 
        borderColor: `${properties.primaryColor || primaryColor}20` 
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
        <div className="relative flex-shrink-0">
          <img 
            src={imageToUse} 
            alt="Perfil"
            className="w-40 h-40 rounded-full object-cover border-4 shadow-lg"
            style={{ borderColor: properties.primaryColor || primaryColor }}
          />
          <div 
            className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: properties.primaryColor || primaryColor }}
          >
            <Star size={20} className="text-white" />
          </div>
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-3xl font-bold mb-2" style={{ color: properties.textColor || textColor }}>
            {properties.name || name}
          </h3>
          <p className="text-xl font-medium mb-4" style={{ color: properties.primaryColor || role }}>
            {properties.role || role}
          </p>
          <p className="text-lg leading-relaxed" style={{ color: properties.textColor || textColor, opacity: 0.8 }}>
            {properties.description || description}
          </p>
        </div>
      </div>
    </div>
  );
};

// About con Estadísticas - COMPLETAMENTE EDITABLE
export const AboutWithStats = ({ preview = false, properties = {} }: AboutProps) => {
  const {
    title = "Sobre Mí",
    name = "Ana García",
    description = "Especialista en desarrollo frontend con pasión por crear experiencias de usuario excepcionales. Mi enfoque se centra en la accesibilidad, el rendimiento y la usabilidad, asegurando que cada proyecto no solo se vea increíble, sino que también funcione perfectamente en todos los dispositivos y navegadores.",
    backgroundColor = "#f8fafc",
    textColor = "#1e293b",
    primaryColor = "#0ea5e9",
    secondaryColor = "#8b5cf6",
    padding = "p-10",
    borderRadius = "rounded-xl",
    experience = "5+",
    showStats = true
  } = properties;

  const experienceToUse = properties.experience || experience;

  const stats = [
    { label: "Años Experiencia", value: experienceToUse, icon: Calendar },
    { label: "Proyectos", value: "50+", icon: Code },
    { label: "Clientes Felices", value: "30+", icon: Heart },
    { label: "Cafés Bebidos", value: "∞", icon: Coffee }
  ];

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || padding} ${properties.borderRadius || borderRadius} border shadow-sm min-h-[450px] flex flex-col justify-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || backgroundColor, 
        borderColor: `${properties.primaryColor || primaryColor}20` 
      }}
    >
      <div className="text-center mb-10">
        <h3 className="text-4xl font-bold mb-3" style={{ color: properties.textColor || textColor }}>
          {properties.name || name}
        </h3>
        <p className="text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: properties.textColor || textColor, opacity: 0.7 }}>
          {properties.description || description}
        </p>
      </div>

      {(properties.showStats !== undefined ? properties.showStats : showStats) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center p-6 rounded-lg" style={{ backgroundColor: `${properties.primaryColor || primaryColor}10` }}>
                <IconComponent size={32} className="mx-auto mb-3" style={{ color: properties.primaryColor || primaryColor }} />
                <div className="text-3xl font-bold mb-1" style={{ color: properties.textColor || textColor }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: properties.textColor || textColor, opacity: 0.6 }}>
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
  const {
    title = "Sobre Mí",
    description = "Desarrollador con enfoque en crear soluciones elegantes y funcionales. Creo firmemente que el mejor código es aquel que es simple, mantenible y eficiente. Mi filosofía de desarrollo se basa en la premisa de que menos es más, pero sin comprometer la funcionalidad o la experiencia del usuario.",
    backgroundColor = "#ffffff",
    textColor = "#374151",
    primaryColor = "#10b981",
    fontSize = "text-xl",
    padding = "p-8",
    borderRadius = "rounded-none"
  } = properties;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || padding} ${properties.borderRadius || borderRadius} border-l-4 min-h-[320px] flex items-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || backgroundColor,
        borderLeftColor: properties.primaryColor || primaryColor
      }}
    >
      <div className="flex items-start gap-6 w-full">
        <div className="w-1 h-24 rounded-full flex-shrink-0" style={{ backgroundColor: properties.primaryColor || primaryColor }}></div>
        <div className="flex-1">
          <h3 className={`${properties.fontSize || fontSize} font-semibold mb-4`} style={{ color: properties.textColor || textColor }}>
            {properties.title || title}
          </h3>
          <p className="text-lg leading-relaxed" style={{ color: properties.textColor || textColor, opacity: 0.8 }}>
            {properties.description || description}
          </p>
        </div>
      </div>
    </div>
  );
};

// About con Tarjeta de Perfil Completa - COMPLETAMENTE EDITABLE
export const AboutProfileCard = ({ preview = false, properties = {} }: AboutProps) => {
  const {
    name = "Carlos Rodríguez",
    role = "UI/UX Designer & Developer",
    location = "Madrid, España",
    description = "Diseñador y desarrollador con 8 años de experiencia creando productos digitales que las personas aman usar. Mi enfoque combina la creatividad del diseño con la precisión técnica del desarrollo, resultando en experiencias digitales que no solo se ven increíbles, sino que también funcionan a la perfección.",
    backgroundColor = "#1f2937",
    textColor = "#ffffff",
    primaryColor = "#f59e0b",
    borderRadius = "rounded-2xl",
    profileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    showSocial = true,
    buttonText = "Descargar CV",
    showButton = true,
    emailLink = "mailto:carlos@ejemplo.com",
    linkedinLink = "https://linkedin.com/in/carlos-rodriguez",
    githubLink = "https://github.com/carlos-rodriguez",
    cvLink = "/cv-carlos-rodriguez.pdf"
  } = properties;

  const imageToUse = properties.profileImage || profileImage;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.borderRadius || borderRadius} overflow-hidden shadow-2xl min-h-[500px]`}
      style={{ backgroundColor: properties.backgroundColor || backgroundColor }}
    >
      {/* Header con gradiente */}
      <div 
        className="h-40 relative"
        style={{ 
          background: `linear-gradient(135deg, ${properties.primaryColor || primaryColor}, ${properties.primaryColor || primaryColor}80)`
        }}
      >
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
          <img 
            src={imageToUse} 
            alt="Perfil"
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="pt-24 p-8 text-center">
        <h3 className="text-3xl font-bold mb-2" style={{ color: properties.textColor || textColor }}>
          {properties.name || name}
        </h3>
        <p className="text-xl font-medium mb-3" style={{ color: properties.primaryColor || role }}>
          {properties.role || role}
        </p>
        <div className="flex items-center justify-center gap-2 mb-6 text-base" style={{ color: properties.textColor || textColor, opacity: 0.7 }}>
          <MapPin size={18} />
          <span>{properties.location || location}</span>
        </div>
        <p className="mb-8 text-lg leading-relaxed" style={{ color: properties.textColor || textColor, opacity: 0.8 }}>
          {properties.description || description}
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {(properties.showButton !== undefined ? properties.showButton : showButton) && (properties.cvLink || cvLink) && (
            <a 
              href={properties.cvLink || cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 text-lg"
              style={{ backgroundColor: properties.primaryColor || primaryColor, color: '#000000' }}
            >
              <Download size={18} />
              {properties.buttonText || buttonText}
            </a>
          )}
          {(properties.showSocial !== undefined ? properties.showSocial : showSocial) && (
            <div className="flex gap-4 justify-center">
              {(properties.emailLink || emailLink) && (
                <a 
                  href={properties.emailLink || emailLink}
                  className="p-3 rounded-lg border hover:bg-white hover:bg-opacity-10 transition-colors" 
                  style={{ borderColor: `${properties.textColor || textColor}30` }}
                >
                  <Mail size={20} style={{ color: properties.textColor || textColor }} />
                </a>
              )}
              {(properties.linkedinLink || linkedinLink) && (
                <a 
                  href={properties.linkedinLink || linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border hover:bg-white hover:bg-opacity-10 transition-colors" 
                  style={{ borderColor: `${properties.textColor || textColor}30` }}
                >
                  <Linkedin size={20} style={{ color: properties.textColor || textColor }} />
                </a>
              )}
              {(properties.githubLink || githubLink) && (
                <a 
                  href={properties.githubLink || githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border hover:bg-white hover:bg-opacity-10 transition-colors" 
                  style={{ borderColor: `${properties.textColor || textColor}30` }}
                >
                  <Github size={20} style={{ color: properties.textColor || textColor }} />
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
  const {
    title = "Sobre Mí",
    name = "Laura Martín",
    role = "Full Stack Developer",
    description = "Desarrolladora especializada en React, Node.js y tecnologías cloud. Mi pasión por la tecnología me ha llevado a dominar tanto el frontend como el backend, permitiéndome crear aplicaciones completas desde la concepción hasta el despliegue. Me mantengo constantemente actualizada con las últimas tendencias y mejores prácticas del desarrollo web.",
    backgroundColor = "#f1f5f9",
    textColor = "#0f172a",
    primaryColor = "#3b82f6",
    padding = "p-10",
    borderRadius = "rounded-xl",
    skills = ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL", "MongoDB", "GraphQL"],
    profileImage = "https://images.unsplash.com/photo-1494790108755-2616b612b372?w=200&h=200&fit=crop&crop=face"
  } = properties;

  const imageToUse = properties.profileImage || profileImage;
  const skillsToShow = properties.skills || skills;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || padding} ${properties.borderRadius || borderRadius} border shadow-sm min-h-[400px] flex items-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || backgroundColor, 
        borderColor: `${properties.primaryColor || primaryColor}20` 
      }}
    >
      <div className="grid lg:grid-cols-2 gap-10 items-center w-full">
        {/* Info personal */}
        <div>
          <div className="flex items-center gap-6 mb-6">
            <img 
              src={imageToUse} 
              alt="Perfil"
              className="w-20 h-20 rounded-full object-cover border-3"
              style={{ borderColor: properties.primaryColor || primaryColor }}
            />
            <div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: properties.textColor || textColor }}>
                {properties.name || name}
              </h3>
              <p className="text-lg" style={{ color: properties.primaryColor || role }}>
                {properties.role || role}
              </p>
            </div>
          </div>
          <p className="text-lg leading-relaxed" style={{ color: properties.textColor || textColor, opacity: 0.8 }}>
            {properties.description || description}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-xl font-semibold mb-6" style={{ color: properties.textColor || textColor }}>
            Tecnologías & Herramientas
          </h4>
          <div className="flex flex-wrap gap-3">
            {skillsToShow && skillsToShow.length > 0 ? skillsToShow.map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: `${properties.primaryColor || primaryColor}20`,
                  color: properties.primaryColor || primaryColor
                }}
              >
                {skill}
              </span>
            )) : (
              <div className="text-gray-500 italic">
                No se han añadido habilidades aún
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// About con Timeline - COMPLETAMENTE EDITABLE
export const AboutTimeline = ({ preview = false, properties = {} }: AboutProps) => {
  const {
    title = "Mi Trayectoria",
    name = "Roberto Silva",
    description = "Un viaje de crecimiento constante en el mundo del desarrollo. Cada etapa de mi carrera ha sido una oportunidad para aprender, crecer y contribuir a proyectos cada vez más desafiantes e impactantes.",
    backgroundColor = "#ffffff",
    textColor = "#1f2937",
    primaryColor = "#8b5cf6",
    padding = "p-10",
    borderRadius = "rounded-xl"
  } = properties;

  const timeline = [
    { year: "2024", title: "Senior Full Stack Developer", company: "Tech Innovators Inc." },
    { year: "2022", title: "Full Stack Developer", company: "Digital Solutions Ltd." },
    { year: "2020", title: "Frontend Developer", company: "Creative Agency" },
    { year: "2019", title: "Junior Developer", company: "StartUp Ventures" }
  ];

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || padding} ${properties.borderRadius || borderRadius} border shadow-sm min-h-[450px] flex flex-col justify-center`}
      style={{ 
        backgroundColor: properties.backgroundColor || backgroundColor, 
        borderColor: `${properties.primaryColor || primaryColor}20` 
      }}
    >
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold mb-3" style={{ color: properties.textColor || textColor }}>
          {properties.title || title}
        </h3>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: properties.textColor || textColor, opacity: 0.7 }}>
          {properties.description || description}
        </p>
      </div>

      <div className="space-y-8 max-w-2xl mx-auto w-full">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-center gap-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ backgroundColor: properties.primaryColor || primaryColor }}
            >
              {item.year.slice(-2)}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-1" style={{ color: properties.textColor || textColor }}>
                {item.title}
              </h4>
              <p className="text-base" style={{ color: properties.textColor || textColor, opacity: 0.6 }}>
                {item.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};