import React from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import { serviceOptions, urgencyMultipliers, standardDeliveryTimes } from '../data/pricing';
import { Service } from '../types';

interface ServiceFormProps {
  service: Partial<Service>;
  onChange: (field: keyof Service, value: string | number) => void;
  onAdd: () => void;
}

const tooltips = {
  complexity: {
    title: "Complejidad del Proyecto",
    content: `
      • Simple: Diseños básicos, sin elementos especiales
      • Intermedio: Incluye algunos elementos adicionales o técnicas específicas
      • Complejo: Diseños elaborados, múltiples técnicas o elementos
      • Premium: Alta complejidad técnica y creativa
      • Experto: Máxima complejidad, proyectos únicos o innovadores
    `
  },
  urgency: {
    title: "Tiempo de Entrega",
    content: `
      • Estándar: Tiempo normal según el tipo de proyecto
      • Tiempo Reducido: 25% menos del tiempo estándar
      • Urgente: 50% menos del tiempo estándar
      • Inmediato: 75% menos del tiempo estándar
      
      Nota: Reducir los tiempos puede afectar la calidad o requerir recursos adicionales
    `
  },
  rights: {
    title: "Alcance de Uso",
    content: `
      • Personal: Uso individual o proyecto personal
      • Comercial Local: Uso comercial en una región específica
      • Nacional: Uso comercial en todo el país
      • Internacional: Uso comercial sin restricciones geográficas
      
      Considera el alcance futuro del proyecto para evitar renegociaciones
    `
  },
  scope: {
    title: "Tipo de Empresa",
    content: `
      • Básico: Emprendimientos y pequeños negocios
      • Profesional: Empresas establecidas y profesionales
      • Empresarial: Empresas medianas y grandes
      • Corporativo: Grandes corporaciones y multinacionales
      
      El tipo de empresa influye en la complejidad y alcance requeridos
    `
  },
  expertise: {
    title: "Nivel de Expertise",
    content: `
      • Junior: Diseñador en formación o inicio de carrera (0.7x)
      • Mid-Level: Diseñador con experiencia intermedia (1.0x)
      • Senior: Diseñador experto con amplia experiencia (1.4x)
      
      El nivel afecta directamente al precio base del servicio
    `
  }
};

const TooltipLabel = ({ field, label }: { field: keyof typeof tooltips, label: string }) => (
  <div className="group relative inline-flex items-center gap-1">
    {label}
    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-72 z-10">
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg text-sm">
        <h5 className="font-medium mb-1">{tooltips[field].title}</h5>
        <div className="text-gray-200 whitespace-pre-line text-xs">
          {tooltips[field].content}
        </div>
      </div>
    </div>
  </div>
);

const categories = [
  { value: 'identidad-corporativa', label: 'Identidad Corporativa' },
  { value: 'ilustracion', label: 'Ilustración' },
  { value: 'publicidad-exterior', label: 'Publicidad Exterior' },
  { value: 'impresos', label: 'Impresos' },
  { value: 'foto-video', label: 'Fotografía y Video' },
  { value: 'edicion-animacion', label: 'Edición y Animación' },
  { value: 'direccion', label: 'Dirección' },
  { value: 'social-media', label: 'Social Media' }
];

export default function ServiceForm({ service, onChange, onAdd }: ServiceFormProps) {
  const handleCategoryChange = (category: string) => {
    onChange('category', category);
    // Seleccionar el primer servicio de la nueva categoría
    const firstService = serviceOptions[category]?.[0]?.value;
    if (firstService) {
      onChange('id', firstService);
    }
  };

  const getStandardTime = () => {
    if (service.category && service.id) {
      return standardDeliveryTimes[service.category]?.[service.id] || 0;
    }
    return 0;
  };

  const standardTime = getStandardTime();

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
            onChange={(e) => handleCategoryChange(e.target.value)}
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
            <TooltipLabel field="expertise" label="Nivel de Expertise" />
          </label>
          <select
            value={service.expertise || 'mid'}
            onChange={(e) => onChange('expertise', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="junior">Junior (0.7x)</option>
            <option value="mid">Mid-Level (1.0x)</option>
            <option value="senior">Senior (1.4x)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TooltipLabel field="complexity" label="Complejidad" />
          </label>
          <select
            value={service.complexity || 'simple'}
            onChange={(e) => onChange('complexity', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="simple">Simple (1.0x)</option>
            <option value="intermedio">Intermedio (1.5x)</option>
            <option value="complejo">Complejo (2.0x)</option>
            <option value="premium">Premium (2.5x)</option>
            <option value="experto">Experto (3.0x)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TooltipLabel field="urgency" label="Urgencia" />
            {standardTime > 0 && (
              <span className="text-xs text-gray-500 ml-1">
                (Estándar: {standardTime} días)
              </span>
            )}
          </label>
          <select
            value={service.urgency || 'estandar'}
            onChange={(e) => onChange('urgency', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {Object.entries(urgencyMultipliers).map(([key, data]) => (
              <option key={key} value={key}>
                {data.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TooltipLabel field="rights" label="Alcance" />
          </label>
          <select
            value={service.rights || 'personal'}
            onChange={(e) => onChange('rights', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="personal">Personal</option>
            <option value="comercial-local">Comercial Local</option>
            <option value="nacional">Nacional</option>
            <option value="internacional">Internacional</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TooltipLabel field="scope" label="Tipo de Empresa" />
          </label>
          <select
            value={service.scope || 'basico'}
            onChange={(e) => onChange('scope', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="basico">Básico</option>
            <option value="profesional">Profesional</option>
            <option value="empresarial">Empresarial</option>
            <option value="corporativo">Corporativo</option>
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