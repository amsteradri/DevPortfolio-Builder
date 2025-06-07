"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { COMPONENTS_MAP } from '@/components/blocks/components';

interface Portfolio {
  id: number;
  name: string;
  content: {
    blocks: string[];
    blockProperties: { [key: string]: any };
    lastUpdated: string;
  };
  user_id: number;
  created_at: string;
  updated_at: string;
}

export default function PortfolioView() {
  const params = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolioName = typeof params.name === 'string' ? params.name : '';
        
        if (!portfolioName) {
          throw new Error('Nombre de portfolio no válido');
        }

        console.log('🔍 Buscando portfolio:', portfolioName);

        // Intentar cargar desde la nueva API
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
      } catch (err) {
        console.error('❌ Error cargando portfolio:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar el portfolio');
      } finally {
        setLoading(false);
      }
    };

    if (params.name) {
      fetchPortfolio();
    }
  }, [params.name]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error al cargar portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return null;
  }

  return (
    <main className="w-full bg-white dark:bg-gray-900">
      {/* Metadatos en el head */}
      <head>
        <title>{portfolio.name} - Portfolio</title>
        <meta name="description" content={`Portfolio de ${portfolio.name}`} />
      </head>

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
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            DevPortfolio Builder
          </a>
        </p>
      </footer>
    </main>
  );
}