'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-black text-white overflow-hidden">
      {/* Imagen de fondo en blanco y negro */}
      <Image
        src="/fondo3.jpg"
        alt="Background"
        fill
        className="object-cover z-0 grayscale contrast-115 brightness-100"
        priority
      />

      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Contenido central */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 max-w-4xl w-full text-center space-y-10"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
          Bienvenido a{' '}
          <motion.span
            whileHover={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-gradient-to-r from-icterine-500 to-silver-500 bg-clip-text text-transparent"
          >
            DevPortfolio Builder
          </motion.span>
        </h1>

        <p className="text-lg sm:text-xl text-silver-300 max-w-2xl mx-auto leading-relaxed">
          Crea, personaliza y despliega tu portafolio como desarrollador en minutos.<br />
          Editor visual, temas limpios y despliegue automático.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 15px rgba(255,255,255,0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            href="/editor"
            className="rounded-full bg-white text-black hover:bg-gray-100 font-semibold px-6 py-3 text-base shadow-lg transition-all"
          >
            Empezar a construir →
          </motion.a>

          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: 'inset 0 0 0 2px white',
            }}
            whileTap={{ scale: 0.98 }}
            href="/login"
            className="rounded-full border border-white hover:bg-white hover:text-black transition-all px-6 py-3 text-base font-medium"
          >
            Iniciar sesión
          </motion.a>
        </div>
      </motion.div>
    </main>
  );
}
