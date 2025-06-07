"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, User, Mail, ArrowRight, Chrome } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

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
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-4">
            <User className="text-white" size={32} />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            ¡Bienvenido de nuevo!
          </h1>

          {user.picture && (
            <img
              src={user.picture}
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto border-4 border-blue-200"
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
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            ) : (
              <Chrome size={20} className="text-red-500" />
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
