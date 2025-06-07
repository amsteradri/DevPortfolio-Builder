"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useUser();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [hasProcessed, setHasProcessed] = useState(false); // Flag para evitar procesamiento múltiple

  useEffect(() => {
    // Evitar procesamiento múltiple
    if (hasProcessed) return;

    const userId = searchParams.get('user_id');
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const picture = searchParams.get('picture');
    
    console.log('AuthSuccess: Processing params:', { userId, name, email, picture });
    
    if (userId && name && email) {
      const user = {
        id: parseInt(userId),
        name: decodeURIComponent(name),
        email: decodeURIComponent(email),
        picture: picture ? decodeURIComponent(picture) : null
      };
      
      console.log('AuthSuccess: Saving user:', user);
      
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Actualizar el contexto
      setUser(user);
      setUserInfo(user);
      setIsLoading(false);
      setHasProcessed(true); // Marcar como procesado
      
      // Iniciar countdown sin loops
      let countdownValue = 3;
      const countdownInterval = setInterval(() => {
        countdownValue--;
        setCountdown(countdownValue);
        
        if (countdownValue <= 0) {
          clearInterval(countdownInterval);
          console.log('AuthSuccess: Redirecting to portfolios');
          router.replace('/portfolios'); // Usar replace en lugar de push
        }
      }, 1000);

      // Cleanup
      return () => {
        clearInterval(countdownInterval);
      };
      
    } else {
      console.log('AuthSuccess: Missing parameters, redirecting to login');
      setIsLoading(false);
      setHasProcessed(true);
      setTimeout(() => {
        router.replace('/login');
      }, 1000);
    }
  }, [searchParams, router, setUser, hasProcessed]); // Agregar hasProcessed a las dependencias

  // Función para navegar manualmente
  const handleNavigate = () => {
    console.log('AuthSuccess: Manual navigation to portfolios');
    router.replace('/portfolios');
  };

  if (isLoading) {
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

  if (!userInfo) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mx-auto flex items-center justify-center mb-4">
            <User className="text-red-600" size={40} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Error de autenticación
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            No se pudo configurar tu cuenta. Redirigiendo al login...
          </p>
          <Link
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Ir al Login
          </Link>
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
          <div className="flex items-center justify-center gap-3 my-4">
            {userInfo.picture && (
              <img 
                src={userInfo.picture} 
                alt="Profile" 
                className="w-12 h-12 rounded-full border-2 border-blue-200"
              />
            )}
            <div>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                {userInfo.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {userInfo.email}
              </p>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Tu cuenta se ha configurado correctamente
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <button
            onClick={handleNavigate}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            Ver mis portfolios
            <ArrowRight size={18} />
          </button>
          
          <Link
            href="/portfolios"
            className="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-xl font-medium transition-all"
          >
            Comenzar ahora
          </Link>
          
          {countdown > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirigiendo automáticamente en {countdown} segundo{countdown !== 1 ? 's' : ''}...
            </p>
          )}
        </div>
      </motion.div>
    </main>
  );
}