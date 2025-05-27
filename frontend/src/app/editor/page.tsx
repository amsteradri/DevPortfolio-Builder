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
  onSelect: (id: string) => void;
  isSelected: boolean;
  properties?: any;
}> = ({ id, onDelete, onSelect, isSelected, properties = {} }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const [componentType, variantIndex] = id.split('-') as [ComponentType, string];
  const componentData = COMPONENTS_MAP[componentType];
  const Component = componentData?.variants[parseInt(variantIndex)]?.component;

  if (!Component) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id);
  };

  return (
    <div 
      draggable
      onClick={handleClick}
      onDragStart={(e) => {
        setIsDragging(true);
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragEnd={() => setIsDragging(false)}
      className={`group relative cursor-pointer transition-all ${
        isDragging ? 'opacity-50' : ''
      } ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300'
      }`}
    >
      {/* Controles del bloque */}
      <div className={`absolute top-2 right-2 transition-opacity z-10 flex items-center gap-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg px-3 py-2 ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <GripHorizontal size={16} className="text-gray-400 cursor-grab" />
        <span className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
          {`${componentData?.name} - ${componentData?.variants[parseInt(variantIndex)]?.name}`}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="text-red-500 hover:text-red-700 transition-colors ml-2"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      {/* Componente renderizado con propiedades */}
      <Component properties={properties} />
    </div>
  );
};

// Nuevo componente para el panel de propiedades
const PropertiesPanel: React.FC<{
  selectedBlockId: string | null;
  blockProperties: {[key: string]: any};
  onUpdateProperties: (blockId: string, properties: any) => void;
  onClose: () => void;
}> = ({ selectedBlockId, blockProperties, onUpdateProperties, onClose }) => {
  if (!selectedBlockId) return null;

  const [componentType, variantIndex] = selectedBlockId.split('-') as [ComponentType, string];
  const componentData = COMPONENTS_MAP[componentType];
  const currentProperties = blockProperties[selectedBlockId] || {};

  const updateProperty = (key: string, value: any) => {
    onUpdateProperties(selectedBlockId, {
      ...currentProperties,
      [key]: value
    });
  };

  const renderPropertySection = (title: string, children: React.ReactNode) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
      <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 font-medium text-sm text-gray-800 dark:text-white">
        {title}
      </div>
      <div className="p-4 space-y-4">
        {children}
      </div>
    </div>
  );

  const renderTextInput = (label: string, key: string, placeholder: string = "") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={currentProperties[key] || ''}
        onChange={(e) => updateProperty(key, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder={placeholder}
      />
    </div>
  );

  const renderTextarea = (label: string, key: string, placeholder: string = "") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        value={currentProperties[key] || ''}
        onChange={(e) => updateProperty(key, e.target.value)}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        placeholder={placeholder}
      />
    </div>
  );

  const renderColorInput = (label: string, key: string, defaultValue: string = '#ffffff') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={currentProperties[key] || defaultValue}
          onChange={(e) => updateProperty(key, e.target.value)}
          className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
        />
        <input
          type="text"
          value={currentProperties[key] || defaultValue}
          onChange={(e) => updateProperty(key, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );

  const renderSelectInput = (label: string, key: string, options: {value: string, label: string}[], defaultValue: string = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <select
        value={currentProperties[key] || defaultValue}
        onChange={(e) => updateProperty(key, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderCheckbox = (label: string, key: string, defaultValue: boolean = true) => (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={key}
        checked={currentProperties[key] ?? defaultValue}
        onChange={(e) => updateProperty(key, e.target.checked)}
        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={key} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    </div>
  );

  const renderSlider = (label: string, key: string, min: number, max: number, step: number = 1, defaultValue: number = 50, suffix: string = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}: {currentProperties[key] || defaultValue}{suffix}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentProperties[key] || defaultValue}
        onChange={(e) => updateProperty(key, parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );

  return (
    <aside className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Propiedades
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <h4 className="font-medium text-gray-800 dark:text-white text-sm">
            {componentData?.name}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {componentData?.variants[parseInt(variantIndex)]?.name}
          </p>
        </div>
      </div>

      <div className="p-4">
        {/* Contenido */}
        {renderPropertySection("📝 Contenido", (
          <>
            {renderTextInput("Título principal", "title", "Ingresa el título...")}
            {(componentType === 'hero' || componentType === 'about') && 
              renderTextInput("Subtítulo", "subtitle", "Ingresa el subtítulo...")
            }
            {renderTextarea("Descripción", "description", "Describe el contenido...")}
            {componentType === 'hero' && (
              <>
                {renderTextInput("Texto del botón", "buttonText", "Ver más")}
                {renderCheckbox("Mostrar botón", "showButton")}
                {renderCheckbox("Mostrar redes sociales", "showSocial")}
              </>
            )}
            {componentType === 'about' && renderCheckbox("Mostrar icono", "showIcon")}
          </>
        ))}

        {/* Colores */}
        {renderPropertySection("🎨 Colores", (
          <>
            {renderColorInput("Color de fondo", "backgroundColor", "#ffffff")}
            {renderColorInput("Color de texto", "textColor", "#000000")}
            {renderColorInput("Color primario", "primaryColor", "#3b82f6")}
            {componentType === 'hero' && renderColorInput("Color secundario", "secondaryColor", "#8b5cf6")}
            {componentType === 'about' && renderColorInput("Color del icono", "iconColor", "#ffffff")}
          </>
        ))}

        {/* Tipografía */}
        {renderPropertySection("✏️ Tipografía", (
          <>
            {renderSelectInput("Tamaño de fuente", "fontSize", [
              { value: "text-sm", label: "Pequeño" },
              { value: "text-base", label: "Normal" },
              { value: "text-lg", label: "Grande" },
              { value: "text-xl", label: "Extra Grande" },
              { value: "text-2xl", label: "2XL" },
              { value: "text-3xl", label: "3XL" },
              { value: "text-4xl", label: "4XL" },
              { value: "text-4xl md:text-6xl", label: "Hero Grande" },
              { value: "text-5xl md:text-7xl", label: "Hero Extra Grande" }
            ], "text-base")}
            
            {renderSelectInput("Alineación de texto", "textAlign", [
              { value: "text-left", label: "Izquierda" },
              { value: "text-center", label: "Centro" },
              { value: "text-right", label: "Derecha" }
            ], "text-left")}
          </>
        ))}

        {/* Espaciado y dimensiones */}
        {renderPropertySection("📐 Espaciado", (
          <>
            {renderSelectInput("Espaciado interno", "padding", [
              { value: "p-2", label: "Muy pequeño" },
              { value: "p-4", label: "Pequeño" },
              { value: "p-6", label: "Normal" },
              { value: "p-8", label: "Grande" },
              { value: "p-12", label: "Extra grande" }
            ], "p-6")}
            
            {renderSelectInput("Bordes redondeados", "borderRadius", [
              { value: "rounded-none", label: "Sin redondeo" },
              { value: "rounded-sm", label: "Pequeño" },
              { value: "rounded", label: "Normal" },
              { value: "rounded-lg", label: "Grande" },
              { value: "rounded-xl", label: "Extra grande" },
              { value: "rounded-2xl", label: "2XL" },
              { value: "rounded-full", label: "Completo" }
            ], "rounded-none")}
          </>
        ))}

        {/* Fondo (solo para Hero) */}
        {componentType === 'hero' && renderPropertySection("🖼️ Fondo", (
          <>
            {renderTextInput("URL de imagen de fondo", "backgroundImage", "https://example.com/image.jpg")}
            {renderSlider("Opacidad del overlay", "overlayOpacity", 0, 100, 10, 70, "%")}
          </>
        ))}
      </div>
    </aside>
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

  // Añade estos nuevos estados al componente principal
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false);
  const [blockProperties, setBlockProperties] = useState<{[key: string]: any}>({});

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

  // Añade estas funciones al componente principal
  const handleBlockSelect = (blockId: string) => {
    setSelectedBlockId(blockId);
    setIsPropertiesPanelOpen(true);
  };

  const handlePropertiesUpdate = (blockId: string, properties: any) => {
    setBlockProperties(prev => ({
      ...prev,
      [blockId]: properties
    }));
  };

  const handleClosePropertiesPanel = () => {
    setSelectedBlockId(null);
    setIsPropertiesPanelOpen(false);
  };

  // Función para deseleccionar al hacer click en el canvas
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedBlockId(null);
      setIsPropertiesPanelOpen(false);
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
            <div className="flex flex-1">
              <div 
                className="flex-1 p-8 overflow-y-auto bg-gray-100 dark:bg-gray-900"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleCanvasClick}
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
                      maxWidth: isPropertiesPanelOpen ? '900px' : '1200px', // Reducir ancho cuando el panel está abierto
                      margin: '0 auto',
                      minHeight: '100vh',
                      background: 'white',
                      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                    }}
                    className="transition-all duration-200"
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
                      <div className="space-y-0">
                        {blocks.map((blockId) => (
                          <div 
                            key={blockId} 
                            data-id={blockId}
                            className="relative"
                          >
                            <SortableBlock
                              id={blockId}
                              onDelete={deleteBlock}
                              onSelect={handleBlockSelect}
                              isSelected={selectedBlockId === blockId}
                              properties={blockProperties[blockId]}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Panel de propiedades */}
              {isPropertiesPanelOpen && (
                <PropertiesPanel
                  selectedBlockId={selectedBlockId}
                  blockProperties={blockProperties}
                  onUpdateProperties={handlePropertiesUpdate}
                  onClose={handleClosePropertiesPanel}
                />
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
