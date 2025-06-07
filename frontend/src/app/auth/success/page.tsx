"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, User, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const userId = searchParams.get('user_id');
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    
    if (userId && name && email) {
      const user = {
        id: userId,
        name: decodeURIComponent(name),
        email: decodeURIComponent(email)
      };
      
      // Guardar en localStorage para mantener la sesión
      localStorage.setItem('user', JSON.stringify(user));
      setUserInfo(user);
      setIsLoading(false);
      
      // Countdown y redirección
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            router.push('/editor');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else {
      // Si no hay parámetros, redirigir a login
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  }, [searchParams, router]);

  if (isLoading || !userInfo) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Configurando tu cuenta...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-4">
          <CheckCircle className="text-white" size={40} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            ¡Bienvenido!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Hola, {userInfo.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo.email}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Tu cuenta se ha configurado correctamente
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Link href="/editor">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              Comenzar a crear
              <ArrowRight size={18} />
            </motion.button>
          </Link>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Redirigiendo automáticamente en {countdown} segundo{countdown !== 1 ? 's' : ''}...
          </p>
        </div>
      </motion.div>
    </main>
  );
}