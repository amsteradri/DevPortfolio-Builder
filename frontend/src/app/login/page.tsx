"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";

// Componente del ícono de Google
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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout } = useUser();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      window.location.href = "http://localhost:8000/auth/login";
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6"
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <Image
              src="/logo.png"
              alt="DevPortfolio Builder"
              width={96}
              height={96}
              className="rounded-full"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            ¡Bienvenido de nuevo!
          </h1>

          {user.picture && (
            <Image
              src={user.picture}
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full mx-auto border-4 border-blue-200"
            />
          )}

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {user.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
              <Mail size={16} />
              {user.email}
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <Link href="/portfolios">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                Ir a Mis Portfolios
                <ArrowRight size={18} />
              </motion.button>
            </Link>

            <button
              onClick={logout}
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-xl font-medium transition-all"
            >
              Cerrar Sesión
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
          <LogIn className="text-white" size={32} />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Iniciar Sesión
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Accede a tu cuenta para gestionar tus portfolios
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            ) : (
              <GoogleIcon size={20} />
            )}
            {isLoading ? "Iniciando sesión..." : "Continuar con Google"}
          </motion.button>
        </div>

        <div className="pt-4 text-sm text-gray-500 dark:text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Regístrate aquí
          </Link>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ← Volver al inicio
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
