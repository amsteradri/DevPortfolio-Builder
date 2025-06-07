'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, User, LogOut, Code } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/portfolios', label: 'Mis Portfolios' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const pathname = usePathname();

  // Ocultar navbar en páginas públicas de portfolios
  const isPublicPortfolio = pathname.startsWith('/p/');
  
  // Si es una página pública de portfolio, no renderizar la navbar
  if (isPublicPortfolio) {
    return null;
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <Code className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                DevPortfolio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {user && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  {user.picture ? (
                    <img 
                      src={user.picture} 
                      alt="Profile" 
                      className="w-6 h-6 rounded-full ring-2 ring-blue-500/20"
                    />
                  ) : (
                    <User size={16} className="text-gray-600 dark:text-gray-400" />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                  <LogOut size={16} />
                  <span>Salir</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all"
              >
                <User size={16} />
                <span>Iniciar sesión</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            {user && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center px-3 py-2">
                  {user.picture ? (
                    <img 
                      src={user.picture} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full ring-2 ring-blue-500/20"
                    />
                  ) : (
                    <User size={20} className="text-gray-600 dark:text-gray-400" />
                  )}
                  <span className="ml-3 text-base font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="mt-1 block w-full text-left px-3 py-2 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut size={20} />
                    <span>Salir</span>
                  </div>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <User size={20} />
                  <span>Iniciar sesión</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
