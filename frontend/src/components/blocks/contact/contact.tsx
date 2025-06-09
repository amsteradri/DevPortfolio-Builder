import { Mail, Phone, MapPin, MessageCircle, Calendar, Globe, Linkedin, Github, Twitter, Instagram, Send, ArrowRight, Star, Clock, Users, Award } from 'lucide-react';

interface ContactProps {
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
    // Información de contacto
    email?: string;
    phone?: string;
    address?: string;
    website?: string;
    // Enlaces sociales
    linkedinUrl?: string;
    githubUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    // Disponibilidad
    availability?: string;
    timezone?: string;
    responseTime?: string;
    // Texto del botón
    buttonText?: string;
    showButton?: boolean;
    showSocial?: boolean;
    showAvailability?: boolean;
  };
}

// Contacto Simple - COMPLETAMENTE EDITABLE
export const ContactSimple = ({ preview = false, properties = {} }: ContactProps) => {
  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-12'} ${properties.borderRadius || 'rounded-2xl'} min-h-[400px] flex items-center justify-center`}
      style={{ backgroundColor: properties.backgroundColor || '#f8fafc' }}
    >
      <div className="text-center max-w-2xl">
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
          style={{ backgroundColor: properties.primaryColor || '#3b82f6' }}
        >
          <Mail size={32} className="text-white" />
        </div>
        
        <h2 
          className={`${properties.fontSize || 'text-4xl'} font-bold mb-4 ${properties.textAlign || 'text-center'}`}
          style={{ color: properties.textColor || '#1f2937' }}
        >
          {properties.title || "¡Hablemos!"}
        </h2>
        
        <p 
          className={`text-xl mb-8 leading-relaxed ${properties.textAlign || 'text-center'}`}
          style={{ color: properties.textColor || '#1f2937', opacity: 0.7 }}
        >
          {properties.description || "¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ayudarte a convertirlas en realidad."}
        </p>
        
        {(properties.showButton ?? true) && (
          <a
            href={`mailto:${properties.email || 'contacto@ejemplo.com'}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:scale-105"
            style={{ 
              backgroundColor: properties.primaryColor || '#3b82f6',
              color: '#ffffff'
            }}
          >
            <Mail size={20} />
            {properties.buttonText || "Enviar Mensaje"}
          </a>
        )}
      </div>
    </div>
  );
};

// Contacto con Tarjetas de Información - COMPLETAMENTE EDITABLE
export const ContactCards = ({ preview = false, properties = {} }: ContactProps) => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: properties.email || "contacto@ejemplo.com",
      href: `mailto:${properties.email || 'contacto@ejemplo.com'}`,
      description: properties.responseTime || "Respuesta en 24h"
    },
    {
      icon: Phone,
      title: "Teléfono",
      value: properties.phone || "+34 123 456 789",
      href: `tel:${properties.phone?.replace(/\s/g, '') || '+34123456789'}`,
      description: "Lun - Vie, 9:00-18:00"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      value: properties.address || "Madrid, España",
      href: "#",
      description: "Disponible remotamente"
    }
  ];

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-10'} ${properties.borderRadius || 'rounded-xl'} min-h-[500px]`}
      style={{ backgroundColor: properties.backgroundColor || '#ffffff' }}
    >
      <div className={`text-center mb-12 ${properties.textAlign || 'text-center'}`}>
        <h2 
          className={`${properties.fontSize || 'text-3xl'} font-bold mb-4`}
          style={{ color: properties.textColor || '#1f2937' }}
        >
          {properties.title || "Conectemos"}
        </h2>
        <p 
          className="text-lg max-w-2xl mx-auto"
          style={{ color: properties.textColor || '#1f2937', opacity: 0.7 }}
        >
          {properties.description || "Elige la forma que prefieras para ponerte en contacto conmigo"}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {contactMethods.map((method, index) => {
          const IconComponent = method.icon;
          return (
            <a
              key={index}
              href={method.href}
              className="group p-6 border-2 border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ 
                borderColor: `${properties.primaryColor || '#3b82f6'}20`,
                '--hover-border': properties.primaryColor || '#3b82f6'
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = properties.primaryColor || '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${properties.primaryColor || '#3b82f6'}20`;
              }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto"
                style={{ backgroundColor: `${properties.primaryColor || '#3b82f6'}15` }}
              >
                <IconComponent size={24} style={{ color: properties.primaryColor || '#3b82f6' }} />
              </div>
              <h3 
                className="font-semibold text-lg mb-2 text-center"
                style={{ color: properties.textColor || '#1f2937' }}
              >
                {method.title}
              </h3>
              <p 
                className="font-medium text-center mb-1"
                style={{ color: properties.primaryColor || '#3b82f6' }}
              >
                {method.value}
              </p>
              <p 
                className="text-sm text-center"
                style={{ color: properties.textColor || '#1f2937', opacity: 0.6 }}
              >
                {method.description}
              </p>
            </a>
          );
        })}
      </div>

      {(properties.showSocial ?? true) && (
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: properties.textColor || '#1f2937', opacity: 0.6 }}>
            También puedes encontrarme en:
          </p>
          <div className="flex justify-center gap-4">
            {properties.linkedinUrl && (
              <a
                href={properties.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border hover:shadow-lg transition-all"
                style={{ borderColor: `${properties.primaryColor || '#3b82f6'}30` }}
              >
                <Linkedin size={20} style={{ color: properties.primaryColor || '#3b82f6' }} />
              </a>
            )}
            {properties.githubUrl && (
              <a
                href={properties.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border hover:shadow-lg transition-all"
                style={{ borderColor: `${properties.primaryColor || '#3b82f6'}30` }}
              >
                <Github size={20} style={{ color: properties.primaryColor || '#3b82f6' }} />
              </a>
            )}
            {properties.twitterUrl && (
              <a
                href={properties.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border hover:shadow-lg transition-all"
                style={{ borderColor: `${properties.primaryColor || '#3b82f6'}30` }}
              >
                <Twitter size={20} style={{ color: properties.primaryColor || '#3b82f6' }} />
              </a>
            )}
            {properties.instagramUrl && (
              <a
                href={properties.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border hover:shadow-lg transition-all"
                style={{ borderColor: `${properties.primaryColor || '#3b82f6'}30` }}
              >
                <Instagram size={20} style={{ color: properties.primaryColor || '#3b82f6' }} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Contacto Minimalista - COMPLETAMENTE EDITABLE
export const ContactMinimal = ({ preview = false, properties = {} }: ContactProps) => {
  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-16'} min-h-[400px] flex items-center justify-center`}
      style={{ backgroundColor: properties.backgroundColor || '#f1f5f9' }}
    >
      <div className={`max-w-4xl mx-auto ${properties.textAlign || 'text-center'}`}>
        <h2 
          className={`${properties.fontSize || 'text-5xl'} font-bold mb-6`}
          style={{ color: properties.textColor || '#0f172a' }}
        >
          {properties.title || "¿Listo para empezar?"}
        </h2>
        
        <p 
          className="text-2xl mb-12 font-light max-w-3xl mx-auto"
          style={{ color: properties.textColor || '#0f172a', opacity: 0.7 }}
        >
          {properties.description || "Transformemos tu visión digital en una realidad extraordinaria"}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {(properties.showButton ?? true) && (
            <a
              href={`mailto:${properties.email || 'contacto@ejemplo.com'}`}
              className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-2xl hover:scale-105"
              style={{ 
                backgroundColor: properties.primaryColor || '#3b82f6',
                color: '#ffffff'
              }}
            >
              <Mail size={20} />
              {properties.buttonText || "Hablemos"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          )}
          
          <div className="flex items-center gap-2 text-sm" style={{ color: properties.textColor || '#0f172a', opacity: 0.6 }}>
            <Clock size={16} />
            <span>{properties.responseTime || "Respuesta en 24h"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contacto con Disponibilidad - COMPLETAMENTE EDITABLE
export const ContactAvailability = ({ preview = false, properties = {} }: ContactProps) => {
  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.padding || 'p-10'} ${properties.borderRadius || 'rounded-2xl'} min-h-[450px] flex items-center`}
      style={{ backgroundColor: properties.backgroundColor || '#ffffff' }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Información principal */}
          <div className={properties.textAlign || 'text-left'}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium" style={{ color: properties.primaryColor || '#22c55e' }}>
                {properties.availability || "Disponible para nuevos proyectos"}
              </span>
            </div>
            
            <h2 
              className={`${properties.fontSize || 'text-4xl'} font-bold mb-6`}
              style={{ color: properties.textColor || '#1f2937' }}
            >
              {properties.title || "Trabajemos Juntos"}
            </h2>
            
            <p 
              className="text-lg mb-8 leading-relaxed"
              style={{ color: properties.textColor || '#1f2937', opacity: 0.7 }}
            >
              {properties.description || "Especializado en crear experiencias digitales que destacan. Con más de 50 proyectos exitosos, estoy listo para tu próximo desafío."}
            </p>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Users size={16} style={{ color: properties.primaryColor || '#3b82f6' }} />
                <span className="text-sm" style={{ color: properties.textColor || '#1f2937', opacity: 0.6 }}>
                  +50 Clientes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} style={{ color: properties.primaryColor || '#3b82f6' }} />
                <span className="text-sm" style={{ color: properties.textColor || '#1f2937', opacity: 0.6 }}>
                  5.0 Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} style={{ color: properties.primaryColor || '#3b82f6' }} />
                <span className="text-sm" style={{ color: properties.textColor || '#1f2937', opacity: 0.6 }}>
                  Certificado
                </span>
              </div>
            </div>
            
            {(properties.showButton ?? true) && (
              <a
                href={`mailto:${properties.email || 'contacto@ejemplo.com'}`}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
                style={{ 
                  backgroundColor: properties.primaryColor || '#3b82f6',
                  color: '#ffffff'
                }}
              >
                <Send size={18} />
                {properties.buttonText || "Iniciar Conversación"}
              </a>
            )}
          </div>
          
          {/* Panel de información */}
          <div className="space-y-6">
            <div 
              className="p-6 rounded-xl border-l-4"
              style={{ 
                backgroundColor: `${properties.primaryColor || '#3b82f6'}05`,
                borderLeftColor: properties.primaryColor || '#3b82f6'
              }}
            >
              <h3 className="font-semibold mb-3" style={{ color: properties.textColor || '#1f2937' }}>
                Información de Contacto
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} style={{ color: properties.primaryColor || '#3b82f6' }} />
                  <span className="text-sm" style={{ color: properties.textColor || '#1f2937' }}>
                    {properties.email || "contacto@ejemplo.com"}
                  </span>
                </div>
                {properties.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={16} style={{ color: properties.primaryColor || '#3b82f6' }} />
                    <span className="text-sm" style={{ color: properties.textColor || '#1f2937' }}>
                      {properties.phone}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Globe size={16} style={{ color: properties.primaryColor || '#3b82f6' }} />
                  <span className="text-sm" style={{ color: properties.textColor || '#1f2937' }}>
                    {properties.timezone || "UTC+1 (Madrid)"}
                  </span>
                </div>
              </div>
            </div>
            
            {(properties.showAvailability ?? true) && (
              <div 
                className="p-6 rounded-xl"
                style={{ backgroundColor: `${properties.secondaryColor || '#10b981'}10` }}
              >
                <h3 className="font-semibold mb-3" style={{ color: properties.textColor || '#1f2937' }}>
                  Disponibilidad
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: properties.textColor || '#1f2937', opacity: 0.7 }}>Estado:</span>
                    <span className="font-medium" style={{ color: properties.secondaryColor || '#10b981' }}>
                      Aceptando proyectos
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: properties.textColor || '#1f2937', opacity: 0.7 }}>Respuesta:</span>
                    <span style={{ color: properties.textColor || '#1f2937' }}>
                      {properties.responseTime || "< 24 horas"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: properties.textColor || '#1f2937', opacity: 0.7 }}>Próximo slot:</span>
                    <span style={{ color: properties.textColor || '#1f2937' }}>
                      Febrero 2024
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Contacto con Gradiente - COMPLETAMENTE EDITABLE
export const ContactGradient = ({ preview = false, properties = {} }: ContactProps) => {
  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${properties.borderRadius || 'rounded-3xl'} overflow-hidden min-h-[500px] relative`}
      style={{ 
        background: `linear-gradient(135deg, ${properties.primaryColor || '#3b82f6'}, ${properties.secondaryColor || '#8b5cf6'})`
      }}
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className={`${properties.padding || 'p-12'} relative z-10 flex items-center justify-center min-h-[500px]`}>
        <div className={`max-w-3xl text-white ${properties.textAlign || 'text-center'}`}>
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto mb-8 flex items-center justify-center backdrop-blur-sm">
            <MessageCircle size={32} className="text-white" />
          </div>
          
          <h2 className={`${properties.fontSize || 'text-5xl'} font-bold mb-6 text-white`}>
            {properties.title || "¡Hola! 👋"}
          </h2>
          
          <p className="text-xl mb-10 text-white text-opacity-90 leading-relaxed">
            {properties.description || "¿Tienes una idea increíble? Me encantaría ser parte de ella. Conversemos sobre cómo podemos hacer realidad tu visión digital."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {(properties.showButton ?? true) && (
              <a
                href={`mailto:${properties.email || 'contacto@ejemplo.com'}`}
                className="px-8 py-4 bg-white rounded-full font-semibold text-lg transition-all hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                style={{ color: properties.primaryColor || '#3b82f6' }}
              >
                <Mail size={20} />
                {properties.buttonText || "Enviar Email"}
              </a>
            )}
            
            {properties.website && (
              <a
                href={properties.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-white border-opacity-30 rounded-full font-semibold text-lg text-white transition-all hover:bg-white hover:bg-opacity-10 backdrop-blur-sm flex items-center justify-center gap-3"
              >
                <Globe size={20} />
                Ver Portfolio
              </a>
            )}
          </div>
          
          {(properties.showSocial ?? true) && (
            <div className="mt-10 pt-8 border-t border-white border-opacity-20">
              <p className="text-white text-opacity-70 mb-4">Sígueme en:</p>
              <div className="flex justify-center gap-4">
                {properties.linkedinUrl && (
                  <a
                    href={properties.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all backdrop-blur-sm"
                  >
                    <Linkedin size={20} className="text-white" />
                  </a>
                )}
                {properties.githubUrl && (
                  <a
                    href={properties.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all backdrop-blur-sm"
                  >
                    <Github size={20} className="text-white" />
                  </a>
                )}
                {properties.twitterUrl && (
                  <a
                    href={properties.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all backdrop-blur-sm"
                  >
                    <Twitter size={20} className="text-white" />
                  </a>
                )}
                {properties.instagramUrl && (
                  <a
                    href={properties.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all backdrop-blur-sm"
                  >
                    <Instagram size={20} className="text-white" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mantener el componente original como alternativa - COMPLETAMENTE EDITABLE
export const ContactBlock = ({ preview = false, properties = {} }: ContactProps) => {
  return <ContactSimple preview={preview} properties={properties} />;
};