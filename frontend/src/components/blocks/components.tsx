import { User, Briefcase, Mail, Code } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import React from 'react';

// Tipos TypeScript
export interface ComponentData {
  component: React.ComponentType<{ preview?: boolean }>;
  name: string;
  icon: LucideIcon;
}

export interface ComponentsMap {
  hero: ComponentData;
  about: ComponentData;
  projects: ComponentData;
  contact: ComponentData;
}

export type ComponentType = keyof ComponentsMap;

// Componentes de ejemplo mejorados
export const AboutBlock = ({ preview = false }) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-200 dark:border-gray-600`}>
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
        <User className="text-white" size={24} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Sobre Mí</h3>
        <p className="text-gray-600 dark:text-gray-300">Desarrollador Full Stack apasionado por crear experiencias digitales increíbles.</p>
      </div>
    </div>
  </div>
);

export const ProjectsBlock = ({ preview = false }) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-purple-200 dark:border-gray-600`}>
    <div className="flex items-center gap-3 mb-4">
      <Briefcase className="text-purple-600" size={24} />
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">Proyectos</h3>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm">
        <div className="h-3 bg-purple-300 rounded mb-2"></div>
        <div className="h-2 bg-gray-300 rounded"></div>
      </div>
      <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm">
        <div className="h-3 bg-blue-300 rounded mb-2"></div>
        <div className="h-2 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

export const ContactBlock = ({ preview = false }) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-green-200 dark:border-gray-600`}>
    <div className="flex items-center gap-3 mb-4">
      <Mail className="text-green-600" size={24} />
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">Contacto</h3>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
          <Mail size={16} className="text-green-600" />
        </div>
        <span className="text-gray-700 dark:text-gray-300">ejemplo@email.com</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
          <Code size={16} className="text-blue-600" />
        </div>
        <span className="text-gray-700 dark:text-gray-300">github.com/usuario</span>
      </div>
    </div>
  </div>
);

export const HeroBlock = ({ preview = false }) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-xl text-white`}>
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">¡Hola, soy Desarrollador!</h1>
      <p className="text-lg opacity-90 mb-6">Creando experiencias digitales increíbles</p>
      <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
        Ver mi trabajo
      </button>
    </div>
  </div>
);

// Mapa de componentes disponibles
export const COMPONENTS_MAP: ComponentsMap = {
  hero: { component: HeroBlock, name: 'Hero', icon: Code },
  about: { component: AboutBlock, name: 'Sobre Mí', icon: User },
  projects: { component: ProjectsBlock, name: 'Proyectos', icon: Briefcase },
  contact: { component: ContactBlock, name: 'Contacto', icon: Mail },
};