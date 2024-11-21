import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, Minus, Plus } from 'lucide-react';
import { SelectedService } from '../types';
import { Currency } from '../hooks/useCalculator';

interface ServiceListProps {
  services: SelectedService[];
  onRemoveService: (index: number) => void;
  onUpdateService: (index: number, service: SelectedService) => void;
  totalPrice: { mxn: number; usd: number };
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export default function ServiceList({ 
  services, 
  onRemoveService, 
  onUpdateService, 
  totalPrice,
  currency,
  onCurrencyChange
}: ServiceListProps) {
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

  const updateQuantity = (index: number, delta: number) => {
    const service = services[index];
    const newQuantity = Math.max(1, (service.quantity || 1) + delta);
    
    // Calculate new prices based on quantity
    const baseUnitPrice = service.finalPrice / (service.quantity || 1);
    const baseUnitPriceUSD = service.finalPriceUSD / (service.quantity || 1);
    
    const updatedService = {
      ...service,
      quantity: newQuantity,
      finalPrice: baseUnitPrice * newQuantity,
      finalPriceUSD: baseUnitPriceUSD * newQuantity
    };
    
    onUpdateService(index, updatedService);
  };

  const getDisplayPrice = (service: SelectedService) => {
    const price = currency === 'MXN' ? service.finalPrice : service.finalPriceUSD;
    return price.toLocaleString(currency === 'MXN' ? 'es-MX' : 'en-US');
  };

  const getTotalDisplayPrice = () => {
    const price = currency === 'MXN' ? totalPrice.mxn : totalPrice.usd;
    return price.toLocaleString(currency === 'MXN' ? 'es-MX' : 'en-US');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Servicios Seleccionados</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Moneda:</span>
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="MXN">MXN</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow p-3 md:p-4"
          >
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <h4 className="font-medium text-gray-800">
                    {service.name}
                  </h4>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      className="p-1 hover:bg-gray-200 rounded"
                      disabled={service.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {service.quantity || 1}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800 text-lg">
                      ${getDisplayPrice(service)} {currency}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveService(index)}
                    className="text-red-500 hover:text-red-600 transition-colors p-1"
                    title="Eliminar servicio"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="group relative bg-gray-50 rounded-md p-3">
                <div className="pr-10">
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
                    <>
                      {service.description ? (
                        <p className="text-sm text-gray-600">{service.description}</p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          Agregar descripción del servicio...
                        </p>
                      )}
                      <button
                        onClick={() => startEditing(index)}
                        className="absolute right-2 top-2 p-2 rounded-md text-gray-400 
                                 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="Editar descripción"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="font-medium">Total</span>
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-bold">
                ${getTotalDisplayPrice()} {currency}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}