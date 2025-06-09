'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Alert, { AlertType } from '@/components/Alert';

interface AlertContextType {
  showAlert: (type: AlertType, message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alertState, setAlertState] = useState<{
    type: AlertType;
    message: string;
    isOpen: boolean;
  }>({
    type: 'info',
    message: '',
    isOpen: false,
  });

  const showAlert = useCallback((type: AlertType, message: string) => {
    setAlertState({ type, message, isOpen: true });
    
    // Auto cerrar después de 5 segundos
    setTimeout(() => {
      setAlertState(prev => ({ ...prev, isOpen: false }));
    }, 5000);
  }, []);

  const closeAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert
        type={alertState.type}
        message={alertState.message}
        isOpen={alertState.isOpen}
        onClose={closeAlert}
      />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
} 