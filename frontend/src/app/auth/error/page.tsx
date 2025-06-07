"use client"

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Error desconocido';

  const handleRetry = () => {
    window.location.href = 'http://localhost:8000/auth/login';
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-4">
          <AlertCircle className="text-white" size={40} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Error de Autenticación
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            No pudimos completar el inicio de sesión
          </p>
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            {error}
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRetry}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Intentar de nuevo
          </motion.button>
          
          <Link href="/login">
            <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
              <ArrowLeft size={18} />
              Volver al login
            </button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}