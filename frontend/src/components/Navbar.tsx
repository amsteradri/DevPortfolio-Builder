'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/editor', label: 'Editor' },
  { href: '/preview', label: 'Previsualización' },
  { href: '/profile', label: 'Perfil' },
  { href: '/login', label: 'Login' },
];

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/p")) return null;

  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (href: string) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
      pathname === href
        ? 'bg-[#23194F] text-[#DDFEF8]'
        : 'text-[#23194F] hover:bg-[#DDFEF8] dark:text-[#DDFEF8] dark:hover:bg-[#23194F]'
    }`;

  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 dark:bg-[#0f0e20]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-[#23194F] dark:text-[#DDFEF8] tracking-tight"
          >
            DevPortfolio
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-3">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-[#23194F] dark:text-[#DDFEF8] hover:bg-[#DDFEF8]/30 dark:hover:bg-[#23194F]/30"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[500px] mt-2' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col space-y-2 pb-4">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(href)}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
