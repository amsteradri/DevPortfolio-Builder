"use client"

import React, { useState, useEffect } from 'react';
import { 
  GripHorizontal, Code, Trash2, Eye, ChevronDown,
  ArrowLeft, ArrowRight, Minus, Maximize2, X, Upload 
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
      data-id={id}
      data-component-type={componentType}
      className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isDragging ? 'opacity-50' : ''}`}
      onClick={handleClick}
    >
      {/* Controles del bloque */}
      <div className={`absolute top-2 right-2 transition-opacity z-10 flex items-center gap-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg px-3 py-2 ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <GripHorizontal size={16} className="text-gray-400 cursor-grab" />
        <span className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
          {componentData?.name}
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
      <Component properties={properties} preview={false} />
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

  // Función para manejar la subida de archivos de imagen
  const handleImageUpload = (key: string, file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (selectedBlockId) {
          onUpdateProperties(selectedBlockId, {
            ...currentProperties,
            [key]: imageUrl
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para renderizar input de imagen con opción de subir archivo
  const renderImageInput = (label: string, key: string, placeholder: string = "") => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      
      {/* Input para URL de imagen */}
      <input
        type="url"
        value={currentProperties[key] || ''}
        onChange={(e) => updateProperty(key, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
        placeholder={placeholder || "URL de la imagen..."}
      />
      
      {/* Separador */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        <span className="text-xs text-gray-500 dark:text-gray-400">O</span>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
      </div>

      {/* Input para subir archivo */}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleImageUpload(key, file);
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id={`upload-${key}`}
        />
        <label
          htmlFor={`upload-${key}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:border-blue-400 dark:hover:border-blue-500 transition-colores cursor-pointer bg-gray-50 dark:bg-gray-700"
        >
          <Upload size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Subir desde computadora
          </span>
        </label>
      </div>

      {/* Vista previa de la imagen */}
      {currentProperties[key] && (
        <div className="relative">
          <img 
            src={currentProperties[key]} 
            alt="Vista previa" 
            className="w-full h-32 object-cover rounded-md border border-gray-200 dark:border-gray-600"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <button
            onClick={() => updateProperty(key, '')}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colores"
            title="Eliminar imagen"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );

  // Retornar SOLO el contenido, sin containers adicionales
  return (
    <>
      {/* Contenido básico común a todos los componentes */}
      {renderPropertySection("📝 Contenido", (
        <>
          {renderTextInput("Título principal", "title", "Ingresa el título...")}
          {(componentType === 'hero' || componentType === 'about') && 
            renderTextInput("Subtítulo", "subtitle", "Ingresa el subtítulo...")
          }
          {renderTextarea("Descripción", "description", "Describe el contenido...")}
        </>
      ))}

      {/* Colores */}
      {renderPropertySection("🎨 Colores", (
        <>
          {renderColorInput("Color de fondo", "backgroundColor", "#ffffff")}
          {renderColorInput("Color de texto", "textColor", "#000000")}
          {renderColorInput("Color primario", "primaryColor", "#3b82f6")}
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

      {/* Contenido del Hero */}
      {(componentType === 'hero') && renderPropertySection("📝 Contenido", (
        <>
          {renderTextInput("Título Principal", "title", "Tu nombre o título principal")}
          {renderTextInput("Subtítulo", "subtitle", "Tu rol o especialidad")}
          {renderTextInput("Descripción", "description", "Breve descripción sobre ti")}
          {renderTextInput("Texto del Botón", "buttonText", "Ver Proyectos")}
        </>
      ))}

      {/* Imágenes del Hero - SECCIÓN ÚNICA Y COMPLETA */}
      {(componentType === 'hero') && renderPropertySection("🖼️ Imágenes", (
        <>
          {/* Imagen de Perfil */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Imagen de Perfil
            </label>
            <div className="space-y-2">
              <input
                type="url"
                value={currentProperties.profileImage || ''}
                onChange={(e) => updateProperty('profileImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="https://ejemplo.com/tu-foto.jpg"
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const imageUrl = e.target?.result as string;
                        updateProperty('profileImage', imageUrl);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colores">
                  <Upload size={16} className="mx-auto mb-1 text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Subir foto de perfil
                  </span>
                </div>
              </div>
            </div>
            {currentProperties.profileImage && (
              <div className="mt-2">
                <img 
                  src={currentProperties.profileImage} 
                  alt="Preview perfil" 
                  className="w-16 h-16 object-cover rounded-full border"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}
          </div>

          {/* Imagen de Fondo */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Imagen de Fondo
            </label>
            <div className="space-y-2">
              <input
                type="url"
                value={currentProperties.backgroundImage || ''}
                onChange={(e) => updateProperty('backgroundImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="https://ejemplo.com/fondo.jpg"
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const imageUrl = e.target?.result as string;
                        updateProperty('backgroundImage', imageUrl);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colores">
                  <Upload size={16} className="mx-auto mb-1 text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Subir imagen de fondo
                  </span>
                </div>
              </div>
            </div>
            {currentProperties.backgroundImage && (
              <div className="mt-2">
                <img 
                  src={currentProperties.backgroundImage} 
                  alt="Preview fondo" 
                  className="w-full h-20 object-cover rounded border"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">💡 Consejos:</p>
              <ul className="text-xs space-y-1">
                <li>• Imagen de perfil: Fotos cuadradas (400x400px)</li>
                <li>• Imagen de fondo: Horizontales (1920x1080px)</li>
                <li>• Formatos: JPG, PNG, WebP</li>
                <li>• Las imágenes de fondo añaden overlay automático</li>
              </ul>
            </div>
          </div>
        </>
      ))}

      {/* Enlaces Sociales del Hero */}
      {(componentType === 'hero') && renderPropertySection("🔗 Enlaces Sociales", (
        <>
          {renderTextInput("GitHub", "githubLink", "https://github.com/tu-usuario")}
          {renderTextInput("LinkedIn", "linkedinLink", "https://linkedin.com/in/tu-perfil")}
          {renderTextInput("Twitter", "twitterLink", "https://twitter.com/tu-usuario")}
          {renderTextInput("Email", "emailLink", "mailto:tu@email.com")}
          {renderTextInput("Teléfono", "phoneLink", "tel:+34123456789")}
        </>
      ))}

      {/* Opciones de Visualización del Hero */}
      {(componentType === 'hero') && renderPropertySection("👁️ Mostrar/Ocultar", (
        <>
          {renderCheckbox("Mostrar botón principal", "showButton")}
          {renderCheckbox("Mostrar redes sociales", "showSocial")}
        </>
      ))}

      {/* Proyectos específicos para Projects - NUEVA SECCIÓN */}
      {(componentType === 'projects') && renderPropertySection("🚀 Gestión de Proyectos", (
        <div className="space-y-4">
          {/* Lista de proyectos */}
          {currentProperties.projects && currentProperties.projects.length > 0 ? (
            currentProperties.projects.map((project: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">Proyecto {index + 1}</h4>
                  <button
                    onClick={() => {
                      const newProjects = [...currentProperties.projects];
                      newProjects.splice(index, 1);
                      updateProperty('projects', newProjects);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    value={project.title || ''}
                    onChange={(e) => {
                      const newProjects = [...currentProperties.projects];
                      newProjects[index] = { ...newProjects[index], title: e.target.value };
                      updateProperty('projects', newProjects);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="Título del proyecto"
                  />
                  
                  <textarea
                    value={project.description || ''}
                    onChange={(e) => {
                      const newProjects = [...currentProperties.projects];
                      newProjects[index] = { ...newProjects[index], description: e.target.value };
                      updateProperty('projects', newProjects);
                    }}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="Descripción del proyecto"
                  />
                  
                  <input
                    type="url"
                    value={project.image || ''}
                    onChange={(e) => {
                      const newProjects = [...currentProperties.projects];
                      newProjects[index] = { ...newProjects[index], image: e.target.value };
                      updateProperty('projects', newProjects);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="URL de la imagen"
                  />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="url"
                      value={project.demoLink || ''}
                      onChange={(e) => {
                        const newProjects = [...currentProperties.projects];
                        newProjects[index] = { ...newProjects[index], demoLink: e.target.value };
                        updateProperty('projects', newProjects);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="Link demo"
                    />
                    
                    <input
                      type="url"
                      value={project.githubLink || ''}
                      onChange={(e) => {
                        const newProjects = [...currentProperties.projects];
                        newProjects[index] = { ...newProjects[index], githubLink: e.target.value };
                        updateProperty('projects', newProjects);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="Link GitHub"
                    />
                  </div>
                  
                  <input
                    type="text"
                    value={project.technologies ? project.technologies.join(', ') : ''}
                    onChange={(e) => {
                      const techArray = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0);
                      const newProjects = [...currentProperties.projects];
                      newProjects[index] = { ...newProjects[index], technologies: techArray };
                      updateProperty('projects', newProjects);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="Tecnologías (separadas por comas)"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
              No hay proyectos agregados aún
            </div>
          )}
          
          {/* Botón para añadir proyecto */}
          <button
            onClick={() => {
              const newProject = {
                title: "Nuevo Proyecto",
                description: "Descripción del proyecto",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
                technologies: ["React", "Node.js"],
                demoLink: "https://ejemplo.com",
                githubLink: "https://github.com"
              };
              const currentProjects = currentProperties.projects || [];
              updateProperty('projects', [...currentProjects, newProject]);
            }}
            className="w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colores flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Añadir Proyecto
          </button>
        </div>
      ))}

      {/* Opciones de visualización específicas para Projects - NUEVA SECCIÓN */}
      {(componentType === 'projects') && renderPropertySection("👁️ Opciones de Visualización", (
        <div className="space-y-4">
          {renderCheckbox("Mostrar Tecnologías", "showTechnologies", true)}
          {renderCheckbox("Mostrar Enlaces", "showLinks", true)}
          {renderCheckbox("Mostrar Fechas", "showDate", true)}
        </div>
      ))}

      {/* Imágenes específicas para About - NUEVA SECCIÓN */}
      {(componentType === 'about') && renderPropertySection("🖼️ Imágenes", (
        <div className="space-y-4">
          {renderImageInput("Imagen de Perfil", "profileImage", "https://ejemplo.com/mi-foto.jpg")}
        </div>
      ))}

      {/* Información Personal específica para About - NUEVA SECCIÓN */}
      {(componentType === 'about') && renderPropertySection("👤 Información Personal", (
        <div className="space-y-4">
          {renderTextInput("Nombre", "name", "Tu nombre completo")}
          {renderTextInput("Rol/Posición", "role", "Desarrollador Full Stack")}
          {renderTextInput("Ubicación", "location", "Ciudad, País")}
          {renderTextarea("Descripción", "description", "Cuéntanos sobre ti...")}
        </div>
      ))}

      {/* Experiencia y Estadísticas específicas para About - NUEVA SECCIÓN */}
      {(componentType === 'about') && renderPropertySection("💼 Experiencia", (
        <div className="space-y-4">
          {renderTextInput("Años de Experiencia", "experience", "5+")}
          {renderTextInput("Proyectos Completados", "projectsCount", "50+")}
          {renderTextInput("Clientes Satisfechos", "clientsCount", "30+")}
          {renderTextInput("Cafés Bebidos", "coffeeCount", "∞")}
        </div>
      ))}

      {/* Habilidades específicas para About - NUEVA SECCIÓN */}
      {(componentType === 'about') && renderPropertySection("🛠️ Habilidades", (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tecnologías y Herramientas
          </label>
          <textarea
            value={currentProperties.skills ? currentProperties.skills.join(', ') : ''}
            onChange={(e) => {
              const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
              updateProperty('skills', skillsArray);
            }}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none text-sm"
            placeholder="React, Node.js, TypeScript, AWS (separadas por comas)"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Separa cada habilidad con una coma
          </p>
          {/* Vista previa de habilidades */}
          {currentProperties.skills && currentProperties.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {currentProperties.skills.map((skill: string, index: number) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Enlaces sociales específicos para About - NUEVA SECCIÓN */}
      {(componentType === 'about') && renderPropertySection("🔗 Enlaces", (
        <div className="space-y-4">
          {renderTextInput("Email", "emailLink", "mailto:tu@email.com")}
          {renderTextInput("LinkedIn", "linkedinLink", "https://linkedin.com/in/tu-perfil")}
          {renderTextInput("GitHub", "githubLink", "https://github.com/tu-usuario")}
          {renderTextInput("Teléfono", "phoneLink", "tel:+1234567890")}
          {renderTextInput("CV/Currículum", "cvLink", "https://ejemplo.com/mi-cv.pdf")}
          {renderTextInput("Texto del Botón", "buttonText", "Descargar CV")}
        </div>
      ))}

      {/* Timeline específica para About - NUEVA SECCIÓN */}
      {(componentType === 'about') && renderPropertySection("📅 Timeline", (
        <div className="space-y-4">
          {/* Lista de elementos del timeline */}
          {currentProperties.timeline && currentProperties.timeline.length > 0 ? (
            currentProperties.timeline.map((item: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">Evento {index + 1}</h4>
                  <button
                    onClick={() => {
                      const newTimeline = [...currentProperties.timeline];
                      newTimeline.splice(index, 1);
                      updateProperty('timeline', newTimeline);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Año
                    </label>
                    <input
                      type="text"
                      value={item.year || ''}
                      onChange={(e) => {
                        const newTimeline = [...currentProperties.timeline];
                        newTimeline[index] = { ...newTimeline[index], year: e.target.value };
                        updateProperty('timeline', newTimeline);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => {
                        const newTimeline = [...currentProperties.timeline];
                        newTimeline[index] = { ...newTimeline[index], title: e.target.value };
                        updateProperty('timeline', newTimeline);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="Senior Developer"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={item.company || ''}
                    onChange={(e) => {
                      const newTimeline = [...currentProperties.timeline];
                      newTimeline[index] = { ...newTimeline[index], company: e.target.value };
                      updateProperty('timeline', newTimeline);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="Nombre de la empresa"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
              No hay eventos en el timeline aún
            </div>
          )}
          
          {/* Botón para añadir evento al timeline */}
          <button
            onClick={() => {
              const newEvent = {
                year: "2024",
                title: "Nuevo Puesto",
                company: "Empresa"
              };
              const currentTimeline = currentProperties.timeline || [];
              updateProperty('timeline', [...currentTimeline, newEvent]);
            }}
            className="w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colores flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Añadir Evento
          </button>
        </div>
      ))}

      {/* Opciones de visualización específicas para About - NUEVA SECCIÓN */}
      {(componentType === 'about') && renderPropertySection("👁️ Mostrar/Ocultar", (
        <div className="space-y-4">
          {renderCheckbox("Mostrar Icono", "showIcon", true)}
          {renderCheckbox("Mostrar Estadísticas", "showStats", true)}
          {renderCheckbox("Mostrar Enlaces Sociales", "showSocial", true)}
          {renderCheckbox("Mostrar Botón", "showButton", true)}
        </div>
      ))}

      {/* Información de Contacto específica para Contact - NUEVA SECCIÓN */}
      {(componentType === 'contact') && renderPropertySection("📞 Información de Contacto", (
        <div className="space-y-4">
          {renderTextInput("Email", "email", "contacto@ejemplo.com")}
          {renderTextInput("Teléfono", "phone", "+34 123 456 789")}
          {renderTextInput("Dirección", "address", "Madrid, España")}
          {renderTextInput("Sitio Web", "website", "https://mi-portfolio.com")}
        </div>
      ))}

      {/* Enlaces Sociales específicos para Contact - NUEVA SECCIÓN */}
      {(componentType === 'contact') && renderPropertySection("🔗 Redes Sociales", (
        <div className="space-y-4">
          {renderTextInput("LinkedIn", "linkedinUrl", "https://linkedin.com/in/tu-perfil")}
          {renderTextInput("GitHub", "githubUrl", "https://github.com/tu-usuario")}
          {renderTextInput("Twitter", "twitterUrl", "https://twitter.com/tu-usuario")}
          {renderTextInput("Instagram", "instagramUrl", "https://instagram.com/tu-usuario")}
        </div>
      ))}

      {/* Disponibilidad específica para Contact - NUEVA SECCIÓN */}
      {(componentType === 'contact') && renderPropertySection("⏰ Disponibilidad", (
        <div className="space-y-4">
          {renderTextInput("Estado de Disponibilidad", "availability", "Disponible para nuevos proyectos")}
          {renderTextInput("Zona Horaria", "timezone", "UTC+1 (Madrid)")}
          {renderTextInput("Tiempo de Respuesta", "responseTime", "< 24 horas")}
        </div>
      ))}

      {/* Textos del Botón específicos para Contact - NUEVA SECCIÓN */}
      {(componentType === 'contact') && renderPropertySection("🔘 Configuración de Botones", (
        <div className="space-y-4">
          {renderTextInput("Texto del Botón Principal", "buttonText", "Enviar Mensaje")}
          {renderCheckbox("Mostrar Botón Principal", "showButton", true)}
          {renderCheckbox("Mostrar Enlaces Sociales", "showSocial", true)}
          {renderCheckbox("Mostrar Información de Disponibilidad", "showAvailability", true)}
        </div>
      ))}
    </>
  );
};

export default function VisualWebEditor() {
  const [isOpen, setIsOpen] = useState(true);
  const [projectName, setProjectName] = useState('');
  const [blocks, setBlocks] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<ComponentType | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(600);
  const [isResizing, setIsResizing] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false);
  const [blockProperties, setBlockProperties] = useState<{[key: string]: any}>({});

  // Función para limpiar el estado del proyecto
  const clearProjectState = () => {
    setBlocks([]);
    setBlockProperties({});
    setSelectedBlockId(null);
    setIsPropertiesPanelOpen(false);
    localStorage.removeItem('devportfolio-project');
  };

  // Función para guardar el estado del proyecto
  const saveProjectState = async () => {
    if (!projectName.trim()) {
      console.log('No project name, skipping save');
      return;
    }

    const projectState = {
      name: projectName.trim(),
      content: {
        blocks,
        blockProperties,
        lastUpdated: new Date().toISOString()
      }
    };

    try {
      console.log('Saving project:', projectState);
      
      const response = await fetch('http://localhost:8000/portfolio/save/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectState),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Error al guardar el portfolio: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Portfolio guardado exitosamente:', data);
      
      // También guardamos en localStorage como respaldo
      localStorage.setItem('devportfolio-project', JSON.stringify({
        projectName: projectName,
        blocks,
        blockProperties,
        lastUpdated: new Date().toISOString()
      }));

    } catch (error) {
      console.error('Error al guardar en el servidor:', error);
      
      // Si falla el servidor, al menos guardamos en localStorage
      try {
        localStorage.setItem('devportfolio-project', JSON.stringify({
          projectName: projectName,
          blocks,
          blockProperties,
          lastUpdated: new Date().toISOString()
        }));
        console.log('Guardado en localStorage como respaldo');
      } catch (localError) {
        console.error('Error guardando en localStorage:', localError);
      }
    }
  };

  // Función para cargar el estado del proyecto
  const loadProjectState = async () => {
    if (!projectName.trim()) return;

    try {
      // Intentar cargar desde el servidor primero
      const response = await fetch(`http://localhost:8000/portfolio/${projectName.trim()}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Portfolio cargado desde servidor:', data);
        
        if (data.content) {
          setBlocks(data.content.blocks || []);
          setBlockProperties(data.content.blockProperties || {});
        }
        return;
      }
    } catch (error) {
      console.log('No se pudo cargar desde servidor, intentando localStorage');
    }

    // Fallback a localStorage
    try {
      const savedProject = localStorage.getItem('devportfolio-project');
      if (savedProject) {
        const projectState = JSON.parse(savedProject);
        if (projectState.projectName === projectName) {
          setBlocks(projectState.blocks || []);
          setBlockProperties(projectState.blockProperties || {});
          console.log('Portfolio cargado desde localStorage');
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  };

  // Función para abrir la previsualización (ÚNICA DECLARACIÓN)
  const openPreview = async () => {
    // Asegurarse de que los datos estén guardados antes de abrir
    await saveProjectState();
    
    // Abrir en una nueva pestaña
    const previewUrl = `/preview?project=${encodeURIComponent(projectName)}`;
    window.open(previewUrl, '_blank');
  };

  // Cargar estado del proyecto al inicializar
  useEffect(() => {
    const savedProject = localStorage.getItem('devportfolio-project');
    if (savedProject) {
      try {
        const projectState = JSON.parse(savedProject);
        setProjectName(projectState.projectName || '');
        setBlocks(projectState.blocks || []);
        setBlockProperties(projectState.blockProperties || {});
      } catch (error) {
        console.error('Error loading project state:', error);
      }
    }
  }, []);

  // Guardar automáticamente cuando cambie algún estado
  useEffect(() => {
    if (!isOpen && projectName.trim()) {
      const timeoutId = setTimeout(() => {
        saveProjectState();
      }, 1000); // Debounce de 1 segundo

      return () => clearTimeout(timeoutId);
    }
  }, [projectName, blocks, blockProperties, isOpen]);

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

  // Funciones del panel de propiedades
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
              onClick={async () => {
                clearProjectState();
                setIsOpen(false);
                // Cargar proyecto existente si existe
                await loadProjectState();
              }}
            >
              Comenzar a crear
            </button>
          </div>
        </div>
      )}

      {/* Editor principal */}
      {!isOpen && (
        <div className="flex h-screen">
          
          {/* COLUMNA 1: Sidebar de componentes */}
          <aside 
            style={{ width: sidebarWidth }}
            className="flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col"
          >
            {/* Header fijo de componentes */}
            <div className="flex-shrink-0 p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Code size={20} className="text-blue-600" />
                Componentes
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Arrastra para agregar al diseño
              </p>
            </div>
            
            {/* Área scrolleable SOLO de componentes */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <div className="p-6 space-y-4">
                {(Object.entries(COMPONENTS_MAP) as [ComponentType, ComponentData][]).map(([type, data]) => (
                  <ComponentAccordion
                    key={type}
                    type={type}
                    data={data}
                    onDragStart={handleDragStart}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Divisor arrastrable */}
          <div
            onMouseDown={handleMouseDown}
            className="w-1 cursor-col-resize bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-600 transition-colores flex-shrink-0"
          />

          {/* COLUMNA 2: Área central del editor */}
          <section className="flex-1 h-screen flex flex-col">
            {/* Header del proyecto - FIJO */}
            <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {projectName}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {blocks.length} componentes añadidos
                  </p>
                </div>
                
                {/* Botón de previsualización */}
                <button
                  onClick={openPreview}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colores"
                >
                  <Eye size={18} />
                  Vista Previa
                </button>
              </div>
            </header>

            {/* Canvas del editor con scroll INDEPENDIENTE */}
            <div 
              className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-900"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleCanvasClick}
            >
              <div className="p-8">
                {/* Controles de zoom - posición fija */}
                <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex items-center gap-2 z-40">
                  <button
                    onClick={() => handleZoomChange(zoom - 25)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <Minus size={16} />
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

                {/* Simulador de navegador */}
                <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-10 rounded-t-lg flex items-center justify-between px-4 sticky top-0 z-10">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <ArrowLeft size={16} />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  
                  <div className="flex-1 mx-4">
                    <div className="bg-white dark:bg-gray-700 rounded-md px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Code size={12} className="mr-2" />
                      <span className="truncate">devportfolio.app/{projectName.toLowerCase().replace(/\s+/g, '-')}</span>
                    </div>
                  </div>
                  
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

                {/* Lienzo escalable */}
                <div 
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top center',
                    width: '100%',
                    maxWidth: isPropertiesPanelOpen ? '1200px' : '1800px',
                    margin: '0 auto',
                    minHeight: 'calc(100vh - 120px)',
                    background: 'white',
                    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                  }}
                  className="transition-all duration-200"
                >
                  {blocks.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
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
          </section>

          {/* COLUMNA 3: Panel de propiedades (aparece/desaparece) */}
          {isPropertiesPanelOpen && (
            <aside className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-screen flex flex-col flex-shrink-0">
              {/* Header fijo del panel de propiedades */}
              <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Propiedades
                  </h3>
                  <button
                    onClick={handleClosePropertiesPanel}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
                {selectedBlockId && (
                  <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <h4 className="font-medium text-gray-800 dark:text-white text-sm">
                      {COMPONENTS_MAP[selectedBlockId.split('-')[0] as ComponentType]?.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {COMPONENTS_MAP[selectedBlockId.split('-')[0] as ComponentType]?.variants[parseInt(selectedBlockId.split('-')[1])]?.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Contenido scrolleable SOLO del panel de propiedades */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="p-4">
                  <PropertiesPanel
                    selectedBlockId={selectedBlockId}
                    blockProperties={blockProperties}
                    onUpdateProperties={handlePropertiesUpdate}
                    onClose={handleClosePropertiesPanel}
                  />
                </div>
              </div>
            </aside>
          )}
        </div>
      )}
    </main>
  );
}
