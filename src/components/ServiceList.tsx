import React, { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { SelectedService } from '../types';

interface ServiceListProps {
  services: SelectedService[];
  onRemoveService: (index: number) => void;
  onUpdateService: (index: number, service: SelectedService) => void;
}

export default function ServiceList({ services, onRemoveService, onUpdateService }: ServiceListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEditing = (index: number) => {
    setEditValue(services[index].description || '');
    setEditingIndex(index);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const saveDescription = (index: number) => {
    const updatedService = {
      ...services[index],
      description: editValue.trim()
    };
    onUpdateService(index, updatedService);
    setEditingIndex(null);
    setEditValue('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Servicios Seleccionados</h3>
      
      <div className="space-y-3">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow p-3 md:p-4"
          >
            <div className="space-y-3">
              {/* Header with name and price */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <h4 className="font-medium text-gray-800">{service.name}</h4>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="font-semibold text-gray-800 text-lg">
                    ${service.finalPrice.toLocaleString('es-MX')}
                  </span>
                  <button
                    onClick={() => onRemoveService(index)}
                    className="text-red-500 hover:text-red-600 transition-colors p-1"
                    title="Eliminar servicio"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Description section */}
              {editingIndex === index ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Describe los detalles específicos del servicio..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[80px]"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => saveDescription(index)}
                      className="text-green-500 hover:text-green-600 p-2 rounded-md hover:bg-green-50"
                      title="Guardar descripción"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-gray-500 hover:text-gray-600 p-2 rounded-md hover:bg-gray-50"
                      title="Cancelar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="group relative bg-gray-50 rounded-md p-3">
                  <div className="pr-10">
                    {service.description ? (
                      <p className="text-sm text-gray-600">{service.description}</p>
                    ) : (
                      <p className="text-sm text-gray-400 italic">
                        Agregar descripción del servicio...
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => startEditing(index)}
                    className="absolute right-2 top-2 p-2 rounded-md text-gray-400 
                             hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Editar descripción"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {services.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="font-medium">Total</span>
            <span className="text-xl sm:text-2xl font-bold">
              ${services.reduce((sum, service) => sum + service.finalPrice, 0).toLocaleString('es-MX')} MXN
            </span>
          </div>
        </div>
      )}
    </div>
  );
}