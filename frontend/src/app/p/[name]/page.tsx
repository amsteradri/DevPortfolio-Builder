"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { COMPONENTS_MAP } from '@/components/blocks/components';

export default function PortfolioView() {
  const params = useParams();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolioName = typeof params.name === 'string' ? params.name : '';
        
        if (!portfolioName) {
          throw new Error('Nombre de portfolio no válido');
        }

        const response = await fetch(`http://localhost:8000/portfolio/${encodeURIComponent(portfolioName)}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Portfolio no encontrado');
          }
          throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        setPortfolio(data);
      } catch (err) {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h1>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return null;
  }

  return (
    <main className="w-full">
      {portfolio.content.blocks.map((blockId: string) => {
        const [componentType, variantIndex] = blockId.split('-');
        const componentData = COMPONENTS_MAP[componentType as keyof typeof COMPONENTS_MAP];
        const Component = componentData?.variants[parseInt(variantIndex)]?.component;
        const properties = portfolio.content.blockProperties[blockId] || {};

        if (!Component) return null;

        return (
          <div key={blockId} className="w-full">
            <Component properties={properties} preview={false} />
          </div>
        );
      })}
    </main>
  );
} 