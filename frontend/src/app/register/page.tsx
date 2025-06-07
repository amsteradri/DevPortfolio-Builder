"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Chrome, Shield, Zap, Users } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      // Mismo flujo que login, ya que Google OAuth maneja tanto login como registro
      window.location.href = 'http://localhost:8000/auth/login';
    } catch (error) {
      console.error('Error al registrarse:', error);
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Zap className="text-yellow-500" size={24} />,
      title: "Editor Visual",
      description: "Crea tu portfolio arrastrando y soltando componentes"
    },
    {
      icon: <Shield className="text-green-500" size={24} />,
      title: "Datos Seguros",
      description: "Tu información está protegida con OAuth de Google"
    },
    {
      icon: <Users className="text-blue-500" size={24} />,
      title: "Compartir Fácil",
      description: "Comparte tu portfolio con un enlace único"
    }
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        
        {/* Columna izquierda - Información */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Únete a <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">DevPortfolio</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Crea portfolios profesionales en minutos, no en días.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Columna derecha - Formulario */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <UserPlus className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Crear Cuenta
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Comienza tu viaje como desarrollador
            </p>
          </div>

          <div className="space-y-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 px-6 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
              ) : (
                <Chrome size={20} className="text-red-500" />
              )}
              {isLoading ? 'Creando cuenta...' : 'Registrarse con Google'}
            </motion.button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
              <p>
                Al registrarte, aceptas nuestros{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Términos de Servicio
                </a>{' '}
                y{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Política de Privacidad
                </a>
              </p>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Inicia sesión
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}