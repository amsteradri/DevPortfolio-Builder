import { ReactNode } from 'react';

interface HeroProps {
  preview?: boolean;
}

export const HeroMinimal = ({ preview = false }: HeroProps) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-xl text-white`}>
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">¡Hola, soy Desarrollador!</h1>
      <p className="text-lg opacity-90">Creando experiencias digitales increíbles</p>
    </div>
  </div>
);

export const HeroWithCTA = ({ preview = false }: HeroProps) => (
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