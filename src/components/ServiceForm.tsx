import React from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import { serviceOptions } from '../data/pricing';
import { Service, ServiceCategory } from '../types';

interface ServiceFormProps {
  service: Partial<Service>;
  onChange: (field: keyof Service, value: string | number) => void;
  onAdd: () => void;
}

// ... rest of your tooltips and TooltipLabel component ...

export default function ServiceForm({ service, onChange, onAdd }: ServiceFormProps) {
  const handleCategoryChange = (category: ServiceCategory) => {
    onChange('category', category);
    // Seleccionar el primer servicio de la nueva categoría
    const firstService = serviceOptions[category]?.[0]?.value;
    if (firstService) {
      onChange('id', firstService);
    }
  };

  const categories = [
    { value: 'identidad-corporativa' as ServiceCategory, label: 'Identidad Corporativa' },
    { value: 'ilustracion' as ServiceCategory, label: 'Ilustración' },
    { value: 'publicidad-exterior' as ServiceCategory, label: 'Publicidad Exterior' },
    { value: 'impresos' as ServiceCategory, label: 'Impresos' },
    { value: 'foto-video' as ServiceCategory, label: 'Fotografía y Video' },
    { value: 'edicion-animacion' as ServiceCategory, label: 'Edición y Animación' },
    { value: 'direccion' as ServiceCategory, label: 'Dirección' },
    { value: 'social-media' as ServiceCategory, label: 'Social Media' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Agregar Servicio</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={service.category || ''}
            onChange={(e) => handleCategoryChange(e.target.value as ServiceCategory)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Servicio
          </label>
          <select
            value={service.id || ''}
            onChange={(e) => onChange('id', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {service.category && serviceOptions[service.category as ServiceCategory]?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rest of your form fields... */}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onAdd}
          className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar Servicio</span>
        </button>
      </div>
    </div>
  );
}