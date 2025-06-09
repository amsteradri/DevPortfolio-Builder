"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { COMPONENTS_MAP } from '@/components/blocks/components';

interface Portfolio {
  id: number;
  name: string;
  content: {
    blocks: string[];
    blockProperties: Record<string, Record<string, unknown>>;
  };
  created_at: string;
  updated_at: string;
}

interface PortfolioData {
  blocks: Array<{
    type: string;
    variant: number;
    properties: Record<string, string | number | boolean>;
  }>;
}

export default function PortfolioView() {
  const params = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolioName = typeof params.name === 'string' ? params.name : '';
        
        if (!portfolioName) {
          throw new Error('Nombre de portfolio no válido');
        }

        console.log('🔍 Buscando portfolio:', portfolioName);

        const response = await fetch(`http://localhost:8000/portfolio/${encodeURIComponent(portfolioName)}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Portfolio no encontrado. Verifica que el nombre sea correcto.');
          }
          throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Portfolio cargado:', data);
        
        // Validar que tenga la estructura correcta
        if (!data.content || !Array.isArray(data.content.blocks)) {
          throw new Error('Portfolio con formato inválido');
        }
        
        setPortfolio(data);
      } catch (error) {
        console.error('❌ Error cargando portfolio:', error);
        setError(error instanceof Error ? error.message : 'Error al cargar el portfolio');
      }
    };

    if (params.name) {
      fetchPortfolio();
    }
  }, [params.name]);

  if (error) {
    return (
      <main className="w-full bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error al cargar portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link 
            href="/"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  if (!portfolio) {
    return (
      <main className="w-full bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando portfolio...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-white dark:bg-gray-900">
      {portfolio.content.blocks.map((blockId: string) => {
        const [componentType, variantIndex] = blockId.split('-');
        const componentData = COMPONENTS_MAP[componentType as keyof typeof COMPONENTS_MAP];
        
        if (!componentData) {
          console.warn(`Componente no encontrado: ${componentType}`);
          return null;
        }

        const Component = componentData.variants[parseInt(variantIndex)]?.component;
        const properties = portfolio.content.blockProperties[blockId] || {};

        if (!Component) {
          console.warn(`Variante no encontrada: ${componentType}-${variantIndex}`);
          return null;
        }

        return (
          <div key={blockId} className="w-full">
            <Component properties={properties} preview={false} />
          </div>
        );
      })}
      
      {/* Footer con info del portfolio */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          Creado con{' '}
          <Link 
            href="/"
            className="text-indigo-600 hover:text-indigo-500"
          >
            DevPortfolio Builder
          </Link>
        </p>
      </footer>
    </main>
  );
}