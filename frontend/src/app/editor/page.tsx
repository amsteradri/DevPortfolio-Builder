"use client"

import React, { useState, useEffect } from 'react';
import { 
  GripHorizontal, Code, Trash2, Eye, ChevronDown,
  ArrowLeft, ArrowRight, Minus, Maximize2, X 
} from 'lucide-react';
import {
  ComponentType,
  ComponentData,
  COMPONENTS_MAP
} from '@/components/blocks/components';

// Componente draggable para el sidebar
const DraggableComponent: React.FC<{
  type: ComponentType;
  data: ComponentData;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, type: ComponentType) => void;
}> = ({ type, data, onDragStart }) => {
  const { name, icon: Icon, variants } = data;
  const DefaultComponent = variants[0].component; // Usar el primer componente como predeterminado
  
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className="group cursor-grab active:cursor-grabbing bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all hover:shadow-lg"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} className="text-blue-600" />
        <span className="font-medium text-gray-800 dark:text-white text-sm">{name}</span>
        <Eye size={14} className="text-gray-400 group-hover:text-blue-500 ml-auto" />
      </div>
      <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
        <DefaultComponent preview={true} />
      </div>
    </div>
  );
};

// Componente Accordion para las secciones
const ComponentAccordion: React.FC<{
  type: ComponentType;
  data: ComponentData;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, type: ComponentType) => void;
}> = ({ type, data, onDragStart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, icon: Icon, variants } = data;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Cabecera del acordeón */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon size={20} className="text-blue-600" />
          <span className="font-medium text-gray-800 dark:text-white">{name}</span>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Contenido del acordeón */}
      {isOpen && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 space-y-4">
          {variants.map((variant, index) => (
            <div
              key={`${type}-${index}`}
              draggable
              onDragStart={(e) => {
                // Pasamos el tipo y el índice de la variante
                const variantData = JSON.stringify({ type, variantIndex: index });
                e.dataTransfer.setData('text/plain', variantData);
                onDragStart(e, type);
              }}
              className="group cursor-grab active:cursor-grabbing bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-sm text-gray-800 dark:text-white">
                  {variant.name}
                </span>
                <Eye size={14} className="text-gray-400 group-hover:text-blue-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {variant.description}
              </p>
              <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
                <variant.component preview={true} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente sortable para la zona central
const SortableBlock: React.FC<{
  id: string;
  onDelete: (id: string) => void;
}> = ({ id, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const [componentType, variantIndex] = id.split('-') as [ComponentType, string];
  const componentData = COMPONENTS_MAP[componentType];
  const Component = componentData?.variants[parseInt(variantIndex)]?.component;

  if (!Component) return null;

  return (
    <div 
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragEnd={() => setIsDragging(false)}
      className={`group relative ${isDragging ? 'opacity-50' : ''}`}
    >
      {/* Controles del bloque - ahora flotantes */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg px-3 py-2">
        <GripHorizontal size={16} className="text-gray-400 cursor-grab" />
        <span className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
          {`${componentData?.name} - ${componentData?.variants[parseInt(variantIndex)]?.name}`}
        </span>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 transition-colors ml-2"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      {/* Componente renderizado a tamaño real */}
      <Component />
    </div>
  );
};

export default function VisualWebEditor() {
  const [isOpen, setIsOpen] = useState(true);
  const [projectName, setProjectName] = useState('');
  const [blocks, setBlocks] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<ComponentType | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(600); // ancho inicial en px
  const [isResizing, setIsResizing] = useState(false);
  const [zoom, setZoom] = useState(100); // zoom en porcentaje

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: ComponentType) => {
    setDraggedItem(type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (draggedItem) {
      try {
        const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
        // Crear el ID incluyendo el tipo y la variante
        const newBlock = `${dragData.type}-${dragData.variantIndex}-${Date.now()}`;
        setBlocks(prev => [...prev, newBlock]);
      } catch {
        // Fallback por si no hay datos de variante
        const newBlock = `${draggedItem}-0-${Date.now()}`;
        setBlocks(prev => [...prev, newBlock]);
      }
      setDraggedItem(null);
    } else {
      // Reordenar componentes existentes
      const draggedId = e.dataTransfer.getData('text/plain');
      const dropZone = e.currentTarget;
      const afterElement = getDragAfterElement(dropZone, e.clientY);
      
      if (afterElement == null) {
        setBlocks(prev => {
          const filtered = prev.filter(id => id !== draggedId);
          return [...filtered, draggedId];
        });
      } else {
        const afterId = afterElement.dataset.id;
        setBlocks(prev => {
          const filtered = prev.filter(id => id !== draggedId);
          const afterIndex = filtered.findIndex(id => id === afterId);
          filtered.splice(afterIndex, 0, draggedId);
          return filtered;
        });
      }
    }
  };

  const getDragAfterElement = (container: HTMLElement, y: number) => {
    const draggableElements = [...container.querySelectorAll('[data-id]:not(.dragging)')] as HTMLElement[];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY, element: null as HTMLElement | null }).element;
  };

  const deleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(blockId => blockId !== id));
  };

  const handleMouseDown = () => {
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth >= 300 && newWidth <= 800) { // límites mín y máx
        setSidebarWidth(newWidth);
      }
    }
  };

  // Añadir los event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleZoomChange = (newZoom: number) => {
    if (newZoom >= 25 && newZoom <= 200) { // limitamos el zoom entre 25% y 200%
      setZoom(newZoom);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Modal inicial */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <Code className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Editor Visual
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Crea tu página web arrastrando y soltando componentes
            </p>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre de tu proyecto..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button
              disabled={!projectName.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl w-full font-semibold transition-all transform hover:scale-105 disabled:scale-100"
              onClick={() => setIsOpen(false)}
            >
              Comenzar a crear
            </button>
          </div>
        </div>
      )}

      {/* Editor principal */}
      {!isOpen && (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar de componentes */}
          <aside 
            style={{ width: sidebarWidth }}
            className="flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Code size={20} className="text-blue-600" />
                Componentes
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Arrastra para agregar al diseño
              </p>
            </div>
            
            <div className="space-y-4">
              {(Object.entries(COMPONENTS_MAP) as [ComponentType, ComponentData][]).map(([type, data]) => (
                <ComponentAccordion
                  key={type}
                  type={type}
                  data={data}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </aside>

          {/* Divisor arrastrable */}
          <div
            onMouseDown={handleMouseDown}
            className="w-1 cursor-col-resize bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          />

          {/* Área central del editor */}
          <section className="flex-1 flex flex-col">
            {/* Header del proyecto */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {projectName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {blocks.length} componentes añadidos
              </p>
            </header>

            {/* Canvas del editor */}
            <div 
              className="flex-1 p-8 overflow-y-auto bg-gray-100 dark:bg-gray-900"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {/* Controles de zoom */}
              <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex items-center gap-2">
                <button
                  onClick={() => handleZoomChange(zoom - 25)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  -
                </button>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[4rem] text-center">
                  {zoom}%
                </span>
                <button
                  onClick={() => handleZoomChange(zoom + 25)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  +
                </button>
              </div>

              {/* Lienzo con tamaño real */}
              <div className="relative min-h-[calc(100vh-8rem)]">
                {/* Barra de navegador simulada */}
                <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-10 rounded-t-lg flex items-center justify-between px-4">
                  {/* Botones de navegación */}
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <ArrowLeft size={16} />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  
                  {/* URL simulada */}
                  <div className="flex-1 mx-4">
                    <div className="bg-white dark:bg-gray-700 rounded-md px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Code size={12} className="mr-2" />
                      <span className="truncate">devportfolio.app/{projectName.toLowerCase().replace(/\s+/g, '-')}</span>
                    </div>
                  </div>
                  
                  {/* Botones de ventana */}
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <Minus size={16} />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <Maximize2 size={16} />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-red-500 hover:text-red-600">
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div 
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top center',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    minHeight: '100vh',
                    background: 'white',
                    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                  }}
                  className="transition-transform duration-200"
                >
                  {blocks.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center">
                      <Code size={48} className="text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        Tu lienzo está vacío
                      </h3>
                      <p className="text-gray-500 dark:text-gray-500">
                        Arrastra componentes desde el panel lateral para comenzar a diseñar
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-0"> {/* Eliminamos el espacio entre componentes */}
                      {blocks.map((blockId) => (
                        <div 
                          key={blockId} 
                          data-id={blockId}
                          className="relative" // Para posicionamiento de controles
                        >
                          <SortableBlock
                            id={blockId}
                            onDelete={deleteBlock}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
