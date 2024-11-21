import React from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import { serviceOptions } from '../data/pricing';
import { Service, ServiceCategory, ComplexityLevel, UrgencyLevel, RightsLevel, ScopeLevel, ExpertiseLevel } from '../types';

interface ServiceFormProps {
  service: Partial<Service>;
  onChange: (field: keyof Service, value: string | number) => void;
  onAdd: () => void;
}

interface TooltipLabelProps {
  label: string;
  tooltip: string;
}

const TooltipLabel: React.FC<TooltipLabelProps> = ({ label, tooltip }) => (
  <div className="group relative inline-block">
    <div className="flex items-center gap-1">
      {label}
      <HelpCircle className="w-4 h-4 text-gray-400" />
    </div>
    <div className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-sm rounded-lg 
                  opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-10">
      {tooltip}
      <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
    </div>
  </div>
);

const tooltips = {
  complexity: "Evalúa qué tan complejo es el proyecto en términos de diseño y ejecución",
  urgency: "Define el tiempo de entrega requerido para el proyecto",
  rights: "Tipo de empresa o cliente para el que se realiza el proyecto",
  scope: "Alcance geográfico y comercial del proyecto",
  expertise: "Nivel de experiencia requerido para el proyecto"
};

export default function ServiceForm({ service, onChange, onAdd }: ServiceFormProps) {
  const handleCategoryChange = (category: ServiceCategory) => {
    onChange('category', category);
    // Select the first service of the new category
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
    { value: 'foto-video' as ServiceCategory, label: 'Foto y Video' },
    { value: 'edicion-animacion' as ServiceCategory, label: 'Edición y Animación' },
    { value: 'editorial' as ServiceCategory, label: 'Editorial' },
    { value: 'web' as ServiceCategory, label: 'Diseño Web' },
    { value: 'marketing' as ServiceCategory, label: 'Marketing' },
    { value: 'social-media' as ServiceCategory, label: 'Social Media' },
    { value: 'audiovisual' as ServiceCategory, label: 'Audiovisual' },
    { value: 'fotografia' as ServiceCategory, label: 'Fotografía' },
    { value: 'moda' as ServiceCategory, label: 'Diseño de Moda' }
  ];

  const complexityLevels: { value: ComplexityLevel; label: string }[] = [
    { value: 'simple', label: 'Simple (1x)' },
    { value: 'moderado', label: 'Moderado (1.5x)' },
    { value: 'complejo', label: 'Complejo (2x)' },
    { value: 'premium', label: 'Premium (2.5x)' }
  ];

  const urgencyLevels: { value: UrgencyLevel; label: string }[] = [
    { value: 'estandar', label: 'Estándar (14 días)' },
    { value: 'rapido', label: 'Rápido (7 días, +50%)' },
    { value: 'urgente', label: 'Urgente (3 días, +100%)' },
    { value: 'inmediato', label: 'Inmediato (24h, +150%)' }
  ];

  const rightsLevels: { value: RightsLevel; label: string }[] = [
    { value: 'pequena', label: 'Pequeña Empresa (1x)' },
    { value: 'profesional', label: 'Profesional (1.5x)' },
    { value: 'empresarial', label: 'Empresarial (2x)' },
    { value: 'corporativo', label: 'Corporativo (2.5x)' }
  ];

  const scopeLevels: { value: ScopeLevel; label: string }[] = [
    { value: 'personal', label: 'Personal (1x)' },
    { value: 'comercial-local', label: 'Comercial Local (1.5x)' },
    { value: 'comercial-nacional', label: 'Comercial Nacional (2x)' },
    { value: 'comercial-internacional', label: 'Comercial Internacional (2.5x)' }
  ];

  const expertiseLevels: { value: ExpertiseLevel; label: string }[] = [
    { value: 'junior', label: 'Junior (0.8x)' },
    { value: 'mid', label: 'Mid-Level (1x)' },
    { value: 'senior', label: 'Senior (1.5x)' },
    { value: 'expert', label: 'Expert (2x)' }
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
            {service.category && serviceOptions[service.category]?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TooltipLabel label="Complejidad" tooltip={tooltips.complexity} />
          </label>
          <select
            value={service.complexity || 'simple'}
            onChange={(e) => onChange('complexity', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {complexityLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TooltipLabel label="Urgencia" tooltip={tooltips.urgency} />
          </label>
          <select
            value={service.urgency || 'estandar'}
            onChange={(e) => onChange('urgency', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {urgencyLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TooltipLabel label="Tipo de Empresa" tooltip={tooltips.rights} />
          </label>
          <select
            value={service.rights || 'pequena'}
            onChange={(e) => onChange('rights', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {rightsLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TooltipLabel label="Alcance" tooltip={tooltips.scope} />
          </label>
          <select
            value={service.scope || 'personal'}
            onChange={(e) => onChange('scope', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {scopeLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TooltipLabel label="Experiencia" tooltip={tooltips.expertise} />
          </label>
          <select
            value={service.expertise || 'mid'}
            onChange={(e) => onChange('expertise', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {expertiseLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
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