'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
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
    <nav className="bg-transparent backdrop-blur-sm border-b border-silver-300/50 dark:border-battleship_gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-white">
                DevPortfolio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-icterine-400 bg-white/10'
                    : 'text-silver-300 hover:text-icterine-400 hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user.picture ? (
                    <img 
                      src={user.picture} 
                      alt="Profile" 
                      className="w-6 h-6 rounded-full border border-silver-400"
                    />
                  ) : (
                    <User size={16} className="text-silver-400" />
                  )}
                  <span className="text-sm text-silver-300">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-silver-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  <LogOut size={16} />
                  <span>Salir</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-silver-300 hover:text-icterine-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-icterine-500 hover:bg-icterine-600 text-black-600 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-silver-300 hover:text-icterine-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/20 backdrop-blur-md border-t border-silver-300/50 dark:border-battleship_gray-700/50">
            {user && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-icterine-400 bg-white/10'
                    : 'text-silver-300 hover:text-icterine-400 hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <div className="border-t border-silver-300/50 dark:border-battleship_gray-700/50 pt-4 mt-4">
                <div className="px-3 py-2 text-sm text-silver-300 flex items-center gap-2">
                  {user.picture && (
                    <img 
                      src={user.picture} 
                      alt="Profile" 
                      className="w-6 h-6 rounded-full border border-silver-400"
                    />
                  )}
                  Hola, {user.name}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-silver-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="border-t border-silver-300/50 dark:border-battleship_gray-700/50 pt-4 mt-4 space-y-1">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-silver-300 hover:text-icterine-400 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 bg-icterine-500 hover:bg-icterine-600 text-black-600 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
