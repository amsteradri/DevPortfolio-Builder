'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const GoogleIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-16 bg-black text-white overflow-hidden">
      {/* Imagen de fondo en blanco y negro */}
      <Image
        src="/fondo3.jpg"
        alt="Background"
        fill
        className="object-cover z-0 grayscale contrast-105 brightness-100"
        priority
      />

      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 z-10" />

      {/* Contenido central */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 max-w-3xl w-full text-center space-y-8"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
          Bienvenido a{' '}
          <motion.span
            whileHover={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            DevPortfolio Builder
          </motion.span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
          Crea, personaliza y despliega tu portafolio como desarrollador en minutos.
          <br />
          Editor visual, temas limpios y despliegue automático.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          <motion.a
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            href="/editor"
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-base font-medium transition-all text-white bg-blue-600 hover:bg-blue-700 border border-blue-500 shadow-lg flex items-center justify-center gap-2"
          >
            Empezar a construir
            <ArrowRight size={18} />
          </motion.a>

          <motion.a
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            href="/login"
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-base font-medium transition-all text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 shadow-lg flex items-center justify-center gap-2"
          >
            <GoogleIcon size={20} />
            Iniciar sesión con Google
          </motion.a>
        </div>
      </motion.div>
    </main>
  );
}
