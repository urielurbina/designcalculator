import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Edit2, Save, Plus, Trash2 } from 'lucide-react';
import { baseRates, serviceOptions } from '../../data/pricing';
import { getUserCustomPricing, saveUserCustomPricing } from '../../data/pricingcustom';
import { ServiceCategory, ServiceOption, CategoryInfo } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface ServiceItemProps {
  service: ServiceOption;
  price: number;
  category: ServiceCategory;
  onUpdate: (value: string, label: string, price: number) => void;
  onDelete: () => void;
}

const ServiceItem = ({ service, price, category, onUpdate, onDelete }: ServiceItemProps) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(service.value);
  const [tempLabel, setTempLabel] = useState(service.label);
  const [tempPrice, setTempPrice] = useState(price);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user?.id) return;
    
    setIsSaving(true);
    try {
      await onUpdate(tempValue, tempLabel, tempPrice);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar los cambios');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempValue(service.value);
    setTempLabel(service.label);
    setTempPrice(price);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-gray-50 space-y-3">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">ID del servicio</label>
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="web-app-basica"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Nombre del servicio</label>
            <input
              type="text"
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="Web App Básica"
            />
          </div>
          <div className="w-48">
            <label className="block text-xs text-gray-500 mb-1">Precio base</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
              <input
                type="number"
                value={tempPrice}
                onChange={(e) => setTempPrice(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         text-sm text-right"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !tempValue.trim() || !tempLabel.trim()}
            className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md
                     hover:bg-indigo-700 transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="animate-spin">⏳</span>
                Guardando...
              </>
            ) : (
              'Guardar cambios'
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 hover:bg-gray-50 flex items-center justify-between group">
      <span className="text-sm text-gray-900">{service.label}</span>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-900">
          ${price.toLocaleString()}
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-indigo-600 rounded-full
                     hover:bg-indigo-50 transition-colors duration-200"
            title="Editar servicio"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600 rounded-full
                     hover:bg-red-50 transition-colors duration-200"
            title="Eliminar servicio"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Nuevo componente para editar categoría
interface CategoryHeaderProps {
  category: ServiceCategory;
  label: string;
  isExpanded: boolean;
  onToggle: () => void;
  onRename: (newId: string, newLabel: string) => Promise<void>;
  onDelete: () => Promise<void>;
}

const CategoryHeader = ({ 
  category, 
  label, 
  isExpanded, 
  onToggle, 
  onRename,
  onDelete 
}: CategoryHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempId, setTempId] = useState(category);
  const [tempLabel, setTempLabel] = useState(label);
  const [isSaving, setIsSaving] = useState(false);

  if (isEditing) {
    return (
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <div className="flex-1 flex items-center gap-4">
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">ID de la categoría</label>
              <input
                type="text"
                value={tempId}
                onChange={(e) => {
                  const newId = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9-]/g, '');
                  setTempId(newId);
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="identidad-corporativa"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Nombre de la categoría</label>
              <input
                type="text"
                value={tempLabel}
                onChange={(e) => setTempLabel(e.target.value)}
                className="w-full px-3 py-2 text-lg font-medium border border-gray-300 rounded-md
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Identidad Corporativa"
                autoFocus
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setTempId(category);
                setTempLabel(label);
                setIsEditing(false);
              }}
              disabled={isSaving}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                setIsSaving(true);
                try {
                  await onRename(tempId, tempLabel);
                  setIsEditing(false);
                } catch (error) {
                  console.error('Error al renombrar:', error);
                } finally {
                  setIsSaving(false);
                }
              }}
              disabled={isSaving || !tempId.trim() || !tempLabel.trim()}
              className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md
                       hover:bg-indigo-700 transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Guardando...
                </>
              ) : (
                'Guardar'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-4 flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-medium text-gray-900">{label}</h3>
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1 text-gray-400 hover:text-indigo-600 rounded-full
                     hover:bg-indigo-50 transition-all duration-200"
            title="Editar categoría"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={async (e) => {
              e.stopPropagation();
              if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría? Esta acción no se puede deshacer.')) {
                await onDelete();
              }
            }}
            className="p-1 text-gray-400 hover:text-red-600 rounded-full
                     hover:bg-red-50 transition-all duration-200"
            title="Eliminar categoría"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button onClick={onToggle}>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
    </div>
  );
};

// Función auxiliar para ordenar alfabéticamente
const sortAlphabetically = <T extends { label: string }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.label.localeCompare(b.label));
};

export default function ServicesPanel() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [customRates, setCustomRates] = useState({ ...baseRates });
  const [customServices, setCustomServices] = useState({ ...serviceOptions });
  const [isLoading, setIsLoading] = useState(true);
  const [customCategories, setCustomCategories] = useState<CategoryInfo[]>(
    Object.keys(baseRates).map(categoryId => ({
      id: categoryId,
      label: serviceOptions[categoryId]?.[0]?.label.split(' ')[0] || categoryId
    }))
  );

  useEffect(() => {
    const loadPricing = async () => {
      if (!user?.id) return;
      
      setIsLoading(true);
      try {
        const userPricing = await getUserCustomPricing(user.id);
        
        if (userPricing) {
          console.log('Datos cargados de Supabase:', userPricing);
          
          // Usar los datos de Supabase
          setCustomRates(userPricing.base_rates);
          setCustomServices(userPricing.service_options);
          
          // Si hay categorías personalizadas, usarlas
          if (userPricing.categories && userPricing.categories.length > 0) {
            setCustomCategories(userPricing.categories.map(category => ({
              id: category.id,
              label: category.label
            })));
          } else {
            // Si no hay categorías personalizadas, crear desde los datos existentes
            const initialCategories = Object.keys(userPricing.base_rates).map(categoryId => ({
              id: categoryId,
              label: userPricing.service_options[categoryId]?.[0]?.label.split(' ')[0] || categoryId
            }));
            setCustomCategories(initialCategories);
          }
        } else {
          // Usar datos por defecto si no hay datos en Supabase
          const initialCategories = Object.keys(baseRates).map(categoryId => ({
            id: categoryId,
            label: serviceOptions[categoryId]?.[0]?.label.split(' ')[0] || categoryId
          }));
          
          setCustomRates({ ...baseRates });
          setCustomServices({ ...serviceOptions });
          setCustomCategories(initialCategories);
        }
      } catch (error) {
        console.error('Error loading custom pricing:', error);
        alert('Error al cargar los precios personalizados');
      } finally {
        setIsLoading(false);
      }
    };

    loadPricing();
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user?.id) return;
    
    try {
      await saveUserCustomPricing(
        user.id, 
        customRates, 
        customServices,
        customCategories
      );
      alert('Cambios guardados correctamente');
    } catch (error) {
      console.error('Error saving custom pricing:', error);
      alert('Error al guardar los cambios');
    }
  };

  const handleServiceUpdate = async (
    category: ServiceCategory,
    serviceId: string,
    newValue: string,
    newLabel: string,
    newPrice: number
  ) => {
    if (!user?.id) return;

    const updatedServices = {
      ...customServices,
      [category]: customServices[category].map(s => 
        s.value === serviceId 
          ? { value: newValue, label: newLabel }
          : s
      )
    };

    const updatedRates = {
      ...customRates,
      [category]: {
        ...customRates[category],
        [newValue]: newPrice
      }
    };

    // Si el ID cambió, eliminar el antiguo
    if (serviceId !== newValue) {
      delete updatedRates[category][serviceId];
    }

    try {
      await saveUserCustomPricing(
        user.id,
        updatedRates,
        updatedServices,
        customCategories
      );

      setCustomServices(updatedServices);
      setCustomRates(updatedRates);
    } catch (error) {
      console.error('Error al actualizar servicio:', error);
      alert('Error al guardar los cambios');
    }
  };

  const handleServiceDelete = async (
    category: ServiceCategory,
    serviceId: string
  ) => {
    setCustomServices(prev => ({
      ...prev,
      [category]: prev[category].filter(s => s.value !== serviceId)
    }));

    const newRates = { ...customRates };
    const { [serviceId]: removed, ...rest } = newRates[category];
    newRates[category] = rest;
    setCustomRates(newRates);

    if (user?.id) {
      await saveUserCustomPricing(
        user.id, 
        newRates, 
        {
          ...customServices,
          [category]: customServices[category].filter(s => s.value !== serviceId)
        },
        customCategories
      );
    }
  };

  const handleAddService = (category: ServiceCategory) => {
    const newServiceId = `nuevo-servicio-${Date.now()}`;
    setCustomServices(prev => ({
      ...prev,
      [category]: [
        ...prev[category],
        { value: newServiceId, label: 'Nuevo Servicio' }
      ]
    }));
    setCustomRates(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [newServiceId]: 0
      }
    }));
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredCategories = sortAlphabetically(
    customCategories.filter(category => {
      const categoryLabel = category.label;
      const services = customServices[category.id] || [];
      
      const matchesSearch = 
        categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        services.some(service => 
          service.label.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesSearch;
    })
  );

  // Función para renombrar categoría
  const handleCategoryRename = async (category: string, newId: string, newLabel: string) => {
    if (!user?.id) return;

    try {
      // Verificar si el nuevo ID ya existe
      if (customCategories.some(c => c.id === newId && c.id !== category)) {
        alert('Ya existe una categoría con este ID');
        return;
      }

      // Crear nuevos objetos con la categoría renombrada
      const newRates = { ...customRates };
      const newServices = { ...customServices };
      const newCategories = customCategories.map(c => 
        c.id === category ? { id: newId, label: newLabel } : c
      );

      // Mover los datos de la categoría antigua a la nueva
      if (category !== newId) {
        newRates[newId] = newRates[category];
        delete newRates[category];

        newServices[newId] = newServices[category];
        delete newServices[category];
      }

      await saveUserCustomPricing(user.id, newRates, newServices, newCategories);
      
      // Actualizar estado local
      setCustomRates(newRates);
      setCustomServices(newServices);
      setCustomCategories(newCategories);

      // Actualizar categorías expandidas si cambió el ID
      if (category !== newId) {
        setExpandedCategories(prev => 
          prev.map(c => c === category ? newId : c)
        );
      }
    } catch (error) {
      console.error('Error al renombrar categoría:', error);
      throw error;
    }
  };

  // Función para agregar nueva categoría
  const handleAddCategory = async () => {
    if (!user?.id) return;

    const newCategoryId = `categoria-${Date.now()}`;
    const newLabel = 'Nueva Categoría';
    const newCategory: CategoryInfo = {
      id: newCategoryId,
      label: newLabel
    };

    const newCategories = [...customCategories, newCategory];
    const newServices = {
      ...customServices,
      [newCategoryId]: [{ value: `${newCategoryId}-principal`, label: `${newLabel} Principal` }]
    };
    const newRates = {
      ...customRates,
      [newCategoryId]: { [`${newCategoryId}-principal`]: 0 }
    };

    try {
      await saveUserCustomPricing(user.id, newRates, newServices, newCategories);
      
      setCustomCategories(newCategories);
      setCustomServices(newServices);
      setCustomRates(newRates);
      setExpandedCategories(prev => [...prev, newCategoryId]);
    } catch (error) {
      console.error('Error al agregar categoría:', error);
      alert('Error al crear la nueva categoría');
    }
  };

  // Agregar esta función en el componente principal
  const handleCategoryDelete = async (categoryId: string) => {
    if (!user?.id) return;

    try {
      // Crear nuevos objetos sin la categoría eliminada
      const newRates = { ...customRates };
      const newServices = { ...customServices };
      const newCategories = customCategories.filter(c => c.id !== categoryId);

      // Eliminar la categoría y sus datos
      delete newRates[categoryId];
      delete newServices[categoryId];

      // Guardar en Supabase
      await saveUserCustomPricing(user.id, newRates, newServices, newCategories);
      
      // Actualizar estado local
      setCustomRates(newRates);
      setCustomServices(newServices);
      setCustomCategories(newCategories);
      
      // Remover de categorías expandidas si estaba expandida
      setExpandedCategories(prev => prev.filter(c => c !== categoryId));
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      alert('Error al eliminar la categoría');
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando servicios...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg 
                         hover:bg-indigo-100 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nueva Categoría
              </button>
              {user && (
                <button
                  onClick={() => editMode ? handleSaveChanges() : setEditMode(true)}
                  className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700
                           flex items-center gap-2"
                >
                  {editMode ? (
                    <>
                      <Save className="w-4 h-4" />
                      Guardar
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
            {filteredCategories.map((category) => {
              const isExpanded = expandedCategories.includes(category.id);
              // Ordenar los servicios alfabéticamente
              const sortedServices = sortAlphabetically(customServices[category.id] || []);

              return (
                <div key={category.id} className="overflow-hidden">
                  <CategoryHeader
                    category={category.id}
                    label={category.label}
                    isExpanded={isExpanded}
                    onToggle={() => toggleCategory(category.id)}
                    onRename={(newId, newLabel) => handleCategoryRename(category.id, newId, newLabel)}
                    onDelete={() => handleCategoryDelete(category.id)}
                  />
                  {isExpanded && (
                    <div className="px-6 pb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Lista de Servicios</h4>
                        <button
                          onClick={() => handleAddService(category.id)}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium 
                                   text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100
                                   transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Nuevo Servicio
                        </button>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                        {sortedServices.map((service) => (
                          <ServiceItem
                            key={service.value}
                            service={service}
                            price={customRates[category.id]?.[service.value] || 0}
                            category={category.id}
                            onUpdate={async (newValue, newLabel, newPrice) => {
                              await handleServiceUpdate(category.id, service.value, newValue, newLabel, newPrice);
                            }}
                            onDelete={async () => {
                              await handleServiceDelete(category.id, service.value);
                            }}
                          />
                        ))}
                        {(customServices[category.id] || []).length === 0 && (
                          <div className="p-8 text-center text-gray-500">
                            <p>No hay servicios en esta categoría.</p>
                            <button
                              onClick={() => handleAddService(category.id)}
                              className="mt-2 text-indigo-600 hover:text-indigo-800"
                            >
                              Agregar el primer servicio
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}