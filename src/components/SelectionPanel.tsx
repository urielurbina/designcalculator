import React from 'react';
import { Trophy, Building2, Palette, Clock } from 'lucide-react';
import { Touchpoint } from '../types';

interface SelectionPanelProps {
  designerLevel: string;
  clientType: string;
  projectType: string;
  urgency: string;
  selectedTouchpoints: string[];
  touchpoints: Touchpoint[];
  onDesignerLevelChange: (value: string) => void;
  onClientTypeChange: (value: string) => void;
  onProjectTypeChange: (value: string) => void;
  onUrgencyChange: (value: string) => void;
  onTouchpointToggle: (id: string) => void;
}

export default function SelectionPanel({
  designerLevel,
  clientType,
  projectType,
  urgency,
  selectedTouchpoints,
  touchpoints,
  onDesignerLevelChange,
  onClientTypeChange,
  onProjectTypeChange,
  onUrgencyChange,
  onTouchpointToggle,
}: SelectionPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Nivel del Diseñador
          </div>
        </label>
        <select
          value={designerLevel}
          onChange={(e) => onDesignerLevelChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="junior">Junior Designer</option>
          <option value="mid">Mid-Level Designer</option>
          <option value="senior">Senior Designer</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Tipo de Cliente
          </div>
        </label>
        <select
          value={clientType}
          onChange={(e) => onClientTypeChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="small">Pequeña Empresa</option>
          <option value="medium">Mediana Empresa</option>
          <option value="enterprise">Empresa Grande</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Tipo de Proyecto
          </div>
        </label>
        <select
          value={projectType}
          onChange={(e) => onProjectTypeChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="logo">Logo Design</option>
          <option value="branding">Branding Complete</option>
          <option value="web">Web Design</option>
          <option value="social">Social Media Pack</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Urgencia
          </div>
        </label>
        <select
          value={urgency}
          onChange={(e) => onUrgencyChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="relaxed">Relajado (2-3 semanas)</option>
          <option value="normal">Normal (1-2 semanas)</option>
          <option value="urgent">Urgente (2-3 días)</option>
        </select>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Touchpoints Adicionales</h3>
        <div className="space-y-2">
          {touchpoints.map((touchpoint) => (
            <label key={touchpoint.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedTouchpoints.includes(touchpoint.id)}
                onChange={() => onTouchpointToggle(touchpoint.id)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{touchpoint.name} (+${touchpoint.price})</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}