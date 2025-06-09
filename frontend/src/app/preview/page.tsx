"use client"

import React, { useState, useEffect } from 'react';
import { 
  Code, 
  ArrowLeft, 
  RefreshCw, 
  Monitor, 
  Smartphone, 
  Tablet,
  Eye,
  ExternalLink,
  Download,
  Share2
} from 'lucide-react';
import {
  ComponentType,
  COMPONENTS_MAP
} from '@/components/blocks/components';

interface ProjectState {
  projectName: string;
  blocks: string[];
  blockProperties: { [key: string]: any };
  lastUpdated: string;
}

// Componente para renderizar un bloque en la previsualización
const PreviewBlock: React.FC<{
  id: string;
  properties?: any;
}> = ({ id, properties = {} }) => {
  const [componentType, variantIndex] = id.split('-') as [ComponentType, string];
  const componentData = COMPONENTS_MAP[componentType];
  const Component = componentData?.variants[parseInt(variantIndex)]?.component;

  if (!Component) return null;

  return (
    <div data-component-type={componentType} data-id={id}>
      <Component properties={properties} preview={false} />
    </div>
  );
};

export default function PreviewPage() {
  const [projectState, setProjectState] = useState<ProjectState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Cargar datos del proyecto desde localStorage
  const loadProjectData = () => {
    setIsLoading(true);
    try {
      const savedProject = localStorage.getItem('devportfolio-project');
      if (savedProject) {
        const projectData = JSON.parse(savedProject);
        setProjectState(projectData);
        setLastRefresh(new Date());
      } else {
        setProjectState(null);
      }
    } catch (error) {
      console.error('Error loading project data:', error);
      setProjectState(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadProjectData();
    
    // Escuchar cambios en localStorage (para actualizaciones en tiempo real)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'devportfolio-project') {
        loadProjectData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Auto-refresh cada 2 segundos para capturar cambios del editor
    const interval = setInterval(() => {
      const currentProject = localStorage.getItem('devportfolio-project');
      if (currentProject) {
        const currentData = JSON.parse(currentProject);
        if (projectState?.lastUpdated !== currentData.lastUpdated) {
          loadProjectData();
        }
      }
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [projectState?.lastUpdated]);

  // Función para obtener el ancho según el modo de vista
  const getViewportWidth = () => {
    switch (viewMode) {
      case 'mobile': return 375;
      case 'tablet': return 768;
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  // Función para volver al editor
  const goBackToEditor = () => {
    window.close(); // Si es una ventana popup
    // O redirigir si es una pestaña nueva
    // window.location.href = '/editor';
  };

  // Función para exportar/compartir
  const exportProject = () => {
    if (!projectState) return;
    
    const dataStr = JSON.stringify(projectState, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectState.projectName.toLowerCase().replace(/\s+/g, '-')}-backup.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Cargando previsualización...
          </h2>
        </div>
      </div>
    );
  }

  if (!projectState || projectState.blocks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <Code size={64} className="text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            No hay proyecto para previsualizar
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Crea componentes en el editor para verlos aquí en pantalla completa.
          </p>
          <button
            onClick={goBackToEditor}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Volver al Editor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Barra de herramientas superior */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={goBackToEditor}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              Editor
            </button>
            
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                {projectState.projectName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Última actualización: {new Date(lastRefresh).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Controles de dispositivo */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'desktop' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Vista Escritorio"
              >
                <Monitor size={18} />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'tablet' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Vista Tablet"
              >
                <Tablet size={18} />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'mobile' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Vista Móvil"
              >
                <Smartphone size={18} />
              </button>
            </div>

            {/* Botones de acción */}
            <button
              onClick={loadProjectData}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Actualizar"
            >
              <RefreshCw size={18} />
            </button>

            <button
              onClick={exportProject}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Download size={18} />
              Exportar
            </button>
          </div>
        </div>
      </header>

      {/* Área de previsualización */}
      <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-6">
        <div className="h-full flex items-start justify-center">
          <div 
            style={{
              width: getViewportWidth(),
              maxWidth: viewMode === 'desktop' ? 'none' : getViewportWidth(),
              transition: 'all 0.3s ease',
            }}
            className={`bg-white dark:bg-gray-900 shadow-2xl ${
              viewMode !== 'desktop' ? 'border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden' : ''
            } h-full overflow-y-auto`}
          >
            {/* Indicador de dispositivo */}
            {viewMode !== 'desktop' && (
              <div className="bg-gray-800 text-white text-xs px-3 py-1 text-center">
                {viewMode === 'mobile' ? 'iPhone 12 Pro (375px)' : 'iPad (768px)'}
              </div>
            )}
            
            {/* Contenido del proyecto */}
            <div className="min-h-full">
              {projectState.blocks.map((blockId) => (
                <PreviewBlock
                  key={blockId}
                  id={blockId}
                  properties={projectState.blockProperties[blockId]}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Información del pie */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            {projectState.blocks.length} componente{projectState.blocks.length !== 1 ? 's' : ''} • 
            Modo: {viewMode} •
            Auto-actualización activada
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>En vivo desde el editor</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
