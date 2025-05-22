import { User, Briefcase, Mail, Code } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import React from 'react';

// Importar componentes
import { 
  HeroMinimal, 
  HeroWithSocial, 
  HeroWithBackground, 
  HeroAsymmetric 
} from './hero/hero';
import { AboutSimple, AboutWithIcon } from './about/about';
import { ProjectsBlock } from './projects/projects';
import { ContactBlock } from './contact/contact';

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
    icon: Code,
    variants: [
      { 
        component: HeroMinimal, 
        name: 'Minimalista', 
        description: 'Hero con gradiente y diseño centrado' 
      },
      { 
        component: HeroWithSocial, 
        name: 'Social', 
        description: 'Hero oscuro con redes sociales y CTA' 
      },
      { 
        component: HeroWithBackground, 
        name: 'Con Fondo', 
        description: 'Hero con imagen de fondo y overlay' 
      },
      { 
        component: HeroAsymmetric, 
        name: 'Asimétrico', 
        description: 'Hero con diseño de dos columnas' 
      }
    ]
  },
  about: {
    name: 'Sobre Mí',
    icon: User,
    variants: [
      { component: AboutSimple, name: 'Simple', description: 'Sobre mí en formato texto simple' },
      { component: AboutWithIcon, name: 'Con Icono', description: 'Sobre mí con icono destacado' }
    ]
  },
  projects: {
    name: 'Proyectos',
    icon: Briefcase,
    variants: [
      { component: ProjectsBlock, name: 'Grid', description: 'Proyectos en formato cuadrícula' }
    ]
  },
  contact: {
    name: 'Contacto',
    icon: Mail,
    variants: [
      { component: ContactBlock, name: 'Lista', description: 'Contacto en formato lista con iconos' }
    ]
  }
};