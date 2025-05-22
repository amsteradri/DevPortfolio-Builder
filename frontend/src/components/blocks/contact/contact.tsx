import { Mail, User } from 'lucide-react';

interface ContactProps {
  preview?: boolean;
}

export const ContactBlock = ({ preview = false }: ContactProps) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-200 dark:border-gray-600`}>
    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Contacto</h3>
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Mail className="text-blue-500" size={20} />
        <span className="text-gray-600 dark:text-gray-300">email@ejemplo.com</span>
      </div>
      <div className="flex items-center gap-3">
        <User className="text-blue-500" size={20} />
        <span className="text-gray-600 dark:text-gray-300">@usuario</span>
      </div>
    </div>
  </div>
);