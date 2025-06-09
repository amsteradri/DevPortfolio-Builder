"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  Calendar,
  User,
  Search,
  MoreVertical
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { useAlert } from '@/contexts/AlertContext';
import Image from 'next/image';

interface Portfolio {
  id: string;
  name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const hasLoaded = useRef(false);
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { showAlert } = useAlert();

  // Función para fetch portfolios
  const fetchPortfolios = async (userId: number) => {
    if (hasLoaded.current) return;
    
    console.log('PortfoliosPage: Fetching portfolios for user:', userId);
    setIsLoading(true);
    
    try {
      const response = await fetch(`http://localhost:8000/api/portfolios/user/${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('PortfoliosPage: Loaded', data.length, 'portfolios');
        setPortfolios(data);
        setError(null);
        hasLoaded.current = true;
      } else {
        console.error('PortfoliosPage: Error response:', response.status);
        setError('Error al cargar portfolios');
      }
    } catch (error) {
      console.error('PortfoliosPage: Fetch error:', error);
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  // Effect para cargar portfolios
  useEffect(() => {
    if (userLoading) {
      console.log('PortfoliosPage: User still loading...');
      return;
    }

    if (!user) {
      console.log('PortfoliosPage: No user, redirecting to login');
      router.replace('/login');
      return;
    }

    if (user.id && !hasLoaded.current) {
      console.log('PortfoliosPage: Loading portfolios for user:', user.id);
      fetchPortfolios(user.id);
    }
  }, [user, userLoading, router]);

  const createPortfolio = async () => {
    if (!newPortfolioName.trim() || !user) return;

    try {
      const response = await fetch('http://localhost:8000/api/portfolios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newPortfolioName.trim(),
          content: {
            blocks: [],
            blockProperties: {},
            lastUpdated: new Date().toISOString()
          },
          user_id: user.id
        }),
      });

      if (response.ok) {
        const newPortfolio = await response.json();
        setPortfolios(prev => [newPortfolio, ...prev]);
        setNewPortfolioName('');
        setShowCreateModal(false);
        showAlert('success', 'Portfolio creado exitosamente');
        router.push(`/editor?portfolio=${newPortfolio.id}`);
      } else {
        const errorData = await response.json();
        showAlert('error', errorData.detail || 'Error al crear portfolio');
      }
    } catch (error) {
      console.error('Error creating portfolio:', error);
      showAlert('error', 'Error al crear portfolio');
    }
  };

  const duplicatePortfolio = async (portfolioId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/portfolios/${portfolioId}/duplicate`, {
        method: 'POST',
      });

      if (response.ok) {
        const duplicatedPortfolio = await response.json();
        setPortfolios(prev => [duplicatedPortfolio, ...prev]);
        setActiveDropdown(null);
        showAlert('success', 'Portfolio duplicado exitosamente');
      } else {
        showAlert('error', 'Error al duplicar portfolio');
      }
    } catch (error) {
      console.error('Error duplicating portfolio:', error);
      showAlert('error', 'Error al duplicar portfolio');
    }
  };

  const deletePortfolio = async (portfolioId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este portfolio?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/portfolios/${portfolioId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPortfolios(prev => prev.filter(p => p.id !== portfolioId));
        setActiveDropdown(null);
        showAlert('success', 'Portfolio eliminado exitosamente');
      } else {
        showAlert('error', 'Error al eliminar portfolio');
      }
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      showAlert('error', 'Error al eliminar portfolio');
    }
  };

  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getComponentCount = (portfolio: Portfolio) => {
    return portfolio.content?.blocks?.length || 0;
  };

  const generatePortfolioSlug = (portfolioName: string) => {
    return portfolioName.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Loading state
  if (userLoading || (isLoading && !hasLoaded.current)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Cargando...
          </h2>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            {error}
          </h2>
          <button
            onClick={() => {
              setError(null);
              hasLoaded.current = false;
              if (user?.id) fetchPortfolios(user.id);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Mis Portfolios
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gestiona y edita tus portfolios
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {user?.picture && (
                  <Image
                    src={user.picture}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-blue-200"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus size={18} />
                Nuevo Portfolio
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de búsqueda */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar portfolios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Grid de portfolios */}
        {filteredPortfolios.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
              <User size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {searchTerm ? 'No se encontraron portfolios' : 'No tienes portfolios aún'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm 
                ? 'Intenta con otros términos de búsqueda' 
                : 'Crea tu primer portfolio para empezar'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mx-auto"
              >
                <Plus size={18} />
                Crear Portfolio
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 overflow-hidden group"
              >
                {/* Preview real del portfolio */}
                <div className="p-4">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={portfolio.image || "/placeholder.png"}
                      alt={portfolio.name}
                      width={800}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="p-6 pt-2">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {portfolio.name}
                    </h3>
                    
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === portfolio.id ? null : portfolio.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeDropdown === portfolio.id && (
                        <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => duplicatePortfolio(portfolio.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Copy size={16} />
                            Duplicar
                          </button>
                          <button
                            onClick={() => deletePortfolio(portfolio.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 size={16} />
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} className="mr-2" />
                      Actualizado {formatDate(portfolio.updated_at)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {getComponentCount(portfolio)} componente{getComponentCount(portfolio) !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3">
                    <Link 
                      href={`/editor?portfolio=${portfolio.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Edit3 size={16} />
                      Editar
                    </Link>
                    
                    <Link
                      href={`/p/${generatePortfolioSlug(portfolio.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
                    >
                      <Eye size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para crear portfolio */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Crear Nuevo Portfolio
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre del Portfolio
                </label>
                <input
                  type="text"
                  value={newPortfolioName}
                  onChange={(e) => setNewPortfolioName(e.target.value)}
                  placeholder="Mi Portfolio Increíble"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewPortfolioName('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={createPortfolio}
                  disabled={!newPortfolioName.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                >
                  <Plus size={16} />
                  Crear
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Click fuera para cerrar dropdown */}
      {activeDropdown !== null && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </main>
  );
}