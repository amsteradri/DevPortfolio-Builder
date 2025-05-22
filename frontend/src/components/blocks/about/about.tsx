import { User } from 'lucide-react';

interface AboutProps {
  preview?: boolean;
}

export const AboutSimple = ({ preview = false }: AboutProps) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-200 dark:border-gray-600`}>
    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Sobre Mí</h3>
    <p className="text-gray-600 dark:text-gray-300">Desarrollador Full Stack apasionado por crear experiencias digitales increíbles.</p>
  </div>
);

export const AboutWithIcon = ({ preview = false }: AboutProps) => (
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