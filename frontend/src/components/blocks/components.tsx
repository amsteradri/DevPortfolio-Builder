import { User, Briefcase, Mail, Code, Zap } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import React from 'react';

// Importar componentes
import { 
  HeroMinimal, 
  HeroWithSocial, 
  HeroWithBackground, 
  HeroAsymmetric,
  HeroWithProfile,
  HeroSplitScreen 
} from './hero/hero';
import { 
  AboutSimple, 
  AboutWithIcon, 
  AboutWithPhoto, 
  AboutWithStats, 
  AboutMinimal, 
  AboutProfileCard, 
  AboutWithSkills, 
  AboutTimeline 
} from './about/about';
import { 
  ProjectsGrid, 
  ProjectsMasonry, 
  ProjectsTimeline, 
  ProjectsHorizontal, 
  ProjectsMinimal,
  ProjectsBlock 
} from './projects/projects';
import { 
  ContactSimple,
  ContactCards,
  ContactMinimal,
  ContactAvailability,
  ContactGradient,
  ContactBlock 
} from './contact/contact';

// Interfaces y tipos
export interface ComponentData {
  name: string;
  icon: LucideIcon;
  variants: ComponentVariant[];
}

export interface ComponentVariant {
  component: React.ComponentType<{ preview?: boolean }>;
  name: string;
  description: string;
}

export type ComponentType = 'hero' | 'about' | 'projects' | 'contact';

// Mapa de componentes
export const COMPONENTS_MAP: Record<ComponentType, ComponentData> = {
  hero: {
    name: 'Hero',
    icon: Zap,
    variants: [
      {
        name: 'Minimalista',
        component: HeroMinimal,
        description: 'Hero simple con gradiente'
      },
      {
        name: 'Con Redes Sociales',
        component: HeroWithSocial,
        description: 'Incluye botones y redes sociales'
      },
      {
        name: 'Con Fondo',
        component: HeroWithBackground,
        description: 'Hero con imagen de fondo'
      },
      {
        name: 'Asimétrico',
        component: HeroAsymmetric,
        description: 'Layout asimétrico con mockup'
      },
      {
        name: 'Con Perfil',
        component: HeroWithProfile,
        description: 'Hero centrado con foto de perfil'
      },
      {
        name: 'Split Screen',
        component: HeroSplitScreen,
        description: 'Pantalla dividida con imagen lateral'
      }
    ]
  },
  about: {
    name: 'Sobre Mí',
    icon: User,
    variants: [
      {
        name: 'Simple',
        component: AboutSimple,
        description: 'Texto simple con borde'
      },
      {
        name: 'Con Icono',
        component: AboutWithIcon,
        description: 'Incluye icono de usuario'
      },
      {
        name: 'Con Foto',
        component: AboutWithPhoto,
        description: 'Foto de perfil con información'
      },
      {
        name: 'Con Estadísticas',
        component: AboutWithStats,
        description: 'Incluye métricas y números'
      },
      {
        name: 'Minimalista',
        component: AboutMinimal,
        description: 'Diseño limpio con línea'
      },
      {
        name: 'Tarjeta Perfil',
        component: AboutProfileCard,
        description: 'Tarjeta completa con gradiente'
      },
      {
        name: 'Con Skills',
        component: AboutWithSkills,
        description: 'Incluye tecnologías y habilidades'
      },
      {
        name: 'Timeline',
        component: AboutTimeline,
        description: 'Línea de tiempo de experiencia'
      }
    ]
  },
  projects: {
    name: 'Proyectos',
    icon: Briefcase,
    variants: [
      {
        name: 'Grid Clásico',
        component: ProjectsGrid,
        description: 'Grid de 3 columnas con hover effects'
      },
      {
        name: 'Masonry',
        component: ProjectsMasonry,
        description: 'Distribución irregular tipo Pinterest'
      },
      {
        name: 'Timeline',
        component: ProjectsTimeline,
        description: 'Línea de tiempo cronológica'
      },
      {
        name: 'Horizontal',
        component: ProjectsHorizontal,
        description: 'Cards grandes horizontales'
      },
      {
        name: 'Minimalista',
        component: ProjectsMinimal,
        description: 'Lista limpia y elegante'
      }
    ]
  },
  contact: {
    name: 'Contacto',
    icon: Mail,
    variants: [
      {
        name: 'Simple',
        component: ContactSimple,
        description: 'Contacto centrado con call-to-action'
      },
      {
        name: 'Tarjetas',
        component: ContactCards,
        description: 'Múltiples métodos en tarjetas'
      },
      {
        name: 'Minimalista',
        component: ContactMinimal,
        description: 'Diseño limpio con botón destacado'
      },
      {
        name: 'Con Disponibilidad',
        component: ContactAvailability,
        description: 'Muestra estado y disponibilidad'
      },
      {
        name: 'Gradiente',
        component: ContactGradient,
        description: 'Diseño visual con gradientes'
      },
      {
        name: 'Clásico',
        component: ContactBlock,
        description: 'Contacto tradicional en lista'
      }
    ]
  }
};