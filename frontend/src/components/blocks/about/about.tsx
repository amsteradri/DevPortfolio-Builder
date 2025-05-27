import { User } from 'lucide-react';

interface AboutProps {
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
    showIcon?: boolean;
    iconColor?: string;
  };
}

export const AboutSimple = ({ preview = false, properties = {} }: AboutProps) => {
  const {
    title = "Sobre Mí",
    description = "Desarrollador Full Stack apasionado por crear experiencias digitales increíbles.",
    backgroundColor = "#f0f9ff",
    textColor = "#1f2937",
    primaryColor = "#3b82f6",
    fontSize = "text-xl",
    textAlign = "text-left",
    padding = "p-6",
    borderRadius = "rounded-xl"
  } = properties;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${padding} ${borderRadius} border`}
      style={{ 
        backgroundColor, 
        borderColor: `${primaryColor}33`
      }}
    >
      <h3 className={`${fontSize} font-bold mb-2 ${textAlign}`} style={{ color: textColor }}>
        {title}
      </h3>
      <p className={`${textAlign}`} style={{ color: textColor, opacity: 0.8 }}>
        {description}
      </p>
    </div>
  );
};

export const AboutWithIcon = ({ preview = false, properties = {} }: AboutProps) => {
  const {
    title = "Sobre Mí",
    description = "Desarrollador Full Stack apasionado por crear experiencias digitales increíbles.",
    backgroundColor = "#f0f9ff",
    textColor = "#1f2937",
    primaryColor = "#3b82f6",
    iconColor = "#ffffff",
    fontSize = "text-xl",
    padding = "p-6",
    borderRadius = "rounded-xl",
    showIcon = true
  } = properties;

  return (
    <div 
      className={`${preview ? 'scale-75 pointer-events-none' : ''} ${padding} ${borderRadius} border`}
      style={{ 
        backgroundColor, 
        borderColor: `${primaryColor}33`
      }}
    >
      <div className="flex items-center gap-4">
        {showIcon && (
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: primaryColor }}
          >
            <User size={24} style={{ color: iconColor }} />
          </div>
        )}
        <div>
          <h3 className={`${fontSize} font-bold`} style={{ color: textColor }}>
            {title}
          </h3>
          <p style={{ color: textColor, opacity: 0.8 }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};