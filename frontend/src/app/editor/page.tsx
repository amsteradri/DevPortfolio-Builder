"use client"

import React, { useState } from 'react';
import { GripHorizontal, Code, Trash2, Eye } from 'lucide-react';
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
  const { component: Component, name, icon: Icon } = data;
  
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
        <Component preview={true} />
      </div>
    </div>
  );
};

// Componente sortable para la zona central
const SortableBlock: React.FC<{
  id: string;
  onDelete: (id: string) => void;
}> = ({ id, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const componentType = id.split('-')[0] as ComponentType;
  const ComponentToRender = COMPONENTS_MAP[componentType]?.component;

  if (!ComponentToRender) return null;

  return (
    <div 
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragEnd={() => setIsDragging(false)}
      className={`group relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-all ${isDragging ? 'opacity-50' : ''}`}
    >
      {/* Controles del bloque */}
      <div className="flex justify-between items-center mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <GripHorizontal size={16} className="text-gray-400 cursor-grab" />
          <span className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
            {COMPONENTS_MAP[componentType]?.name}
          </span>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      {/* Componente renderizado */}
      <ComponentToRender />
    </div>
  );
};

export default function VisualWebEditor() {
  const [isOpen, setIsOpen] = useState(true);
  const [projectName, setProjectName] = useState('');
  const [blocks, setBlocks] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<ComponentType | null>(null);

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
      // Agregar nuevo componente desde el sidebar
      const newBlock = `${draggedItem}-${Date.now()}`;
      setBlocks(prev => [...prev, newBlock]);
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
          <aside className="w-[600px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
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
                <DraggableComponent
                  key={type}
                  type={type}
                  data={data}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </aside>

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
              <div className="max-w-4xl mx-auto">
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
                  <div className="space-y-6">
                    {blocks.map((blockId) => (
                      <div key={blockId} data-id={blockId}>
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
          </section>
        </div>
      )}
    </main>
  );
}
