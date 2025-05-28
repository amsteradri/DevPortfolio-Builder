import { Mail, User } from 'lucide-react';

interface ContactProps {
  preview?: boolean;
  properties?: {
    title?: string;
    description?: string;
    backgroundColor?: string;
    textColor?: string;
    primaryColor?: string;
    fontSize?: string;
    textAlign?: string;
    padding?: string;
    borderRadius?: string;
  };
}

export const ContactBlock = ({ preview = false, properties = {} }: ContactProps) => {
  const {
    title = "Contacto",
    description = "¿Tienes un proyecto en mente?",
    backgroundColor = "#ffffff",
    textColor = "#1f2937",
    primaryColor = "#3b82f6",
    fontSize = "text-2xl",
    textAlign = "text-center",
    padding = "p-8"
  } = properties;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${padding}`}
      style={{ backgroundColor }}
    >
      <div className={`${textAlign} mb-8`}>
        <h2 className={`${fontSize} font-bold mb-4`} style={{ color: textColor }}>
          {title}
        </h2>
        <p style={{ color: textColor, opacity: 0.7 }}>
          {description}
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <button 
          className="w-full py-3 px-6 rounded-lg font-medium"
          style={{ backgroundColor: primaryColor, color: '#ffffff' }}
        >
          Contactar
        </button>
      </div>
    </div>
  );
};