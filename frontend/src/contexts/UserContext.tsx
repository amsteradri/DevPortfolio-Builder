"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  picture?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshUser: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Función para refrescar usuario desde localStorage
  const refreshUser = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        console.log('UserContext: Loaded user:', userData.name);
        setUser(userData);
      } else {
        console.log('UserContext: No user found');
        setUser(null);
      }
    } catch (error) {
      console.error('UserContext: Error loading user:', error);
      setUser(null);
    }
  };

  // Función para hacer logout
  const logout = () => {
    console.log('UserContext: Logging out');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  // Función para setear usuario
  const setUserWithSync = (userData: User | null) => {
    console.log('UserContext: Setting user:', userData?.name || 'null');
    setUser(userData);
    
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  // Inicializar SOLO una vez
  useEffect(() => {
    if (!isInitialized) {
      console.log('UserContext: Initializing...');
      refreshUser();
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Escuchar cambios en storage SOLO si está inicializado
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        console.log('UserContext: Storage changed externally');
        refreshUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isInitialized]);

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser: setUserWithSync, 
      logout, 
      refreshUser, 
      isLoading 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};