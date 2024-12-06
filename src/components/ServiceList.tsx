import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, Minus, Plus } from 'lucide-react';
import { SelectedService, Service, CustomPricing } from '../types';
import { Currency } from '../hooks/useCalculator';
import { VolumeDiscountType, ClientDiscountType, MaintenanceType } from '../types';

interface ServiceListProps {
  services: SelectedService[];
  onRemoveService: (index: number) => void;
  onUpdateService: (index: number, service: SelectedService) => void;
  totalPrice: { mxn: number; usd: number };
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  volumeDiscount: VolumeDiscountType;
  onVolumeDiscountChange: (discount: VolumeDiscountType) => void;
  clientType: ClientDiscountType;
  onClientTypeChange: (type: ClientDiscountType) => void;
  maintenance: MaintenanceType;
  onMaintenanceChange: (maintenance: MaintenanceType) => void;
  customPricing: CustomPricing | null;
  calculateServicePrice: (service: Service) => SelectedService;
}

export default function ServiceList({ 
  services, 
  onRemoveService, 
  onUpdateService, 
  totalPrice,
  currency,
  onCurrencyChange,
  volumeDiscount,
  onVolumeDiscountChange,
  clientType,
  onClientTypeChange,
  maintenance,
  onMaintenanceChange,
  customPricing,
  calculateServicePrice
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

  const handleServiceUpdate = (index: number, field: keyof Service, value: string | number) => {
    const service = services[index];
    const updatedService = {
      ...service,
      [field]: value
    };
    
    // Recalcular precios con los nuevos parámetros
    const recalculatedService = calculateServicePrice(updatedService);
    onUpdateService(index, recalculatedService);
  };

  // Agregar la función de ordenamiento
  const sortAlphabetically = <T extends { label: string }>(items: T[]): T[] => {
    return [...items].sort((a, b) => a.label.localeCompare(b.label));
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
          <div key={index} className="bg-white rounded-lg shadow p-3 md:p-4">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <h4 className="font-medium text-gray-800">
                    {service.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Complejidad: {service.complexity} • 
                    Urgencia: {service.urgency} • 
                    Alcance: {service.scope}
                  </p>
                </div>
                <div className="flex items-center gap-4">
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

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="p-1 text-gray-400 hover:text-indigo-600 rounded-full
                               hover:bg-indigo-50 transition-colors"
                      title="Editar servicio"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onRemoveService(index)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded-full
                               hover:bg-red-50 transition-colors"
                      title="Eliminar servicio"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {editingIndex === index && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Complejidad
                      </label>
                      <select
                        value={service.complexity}
                        onChange={(e) => handleServiceUpdate(index, 'complexity', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="simple">Simple (1x)</option>
                        <option value="moderado">Moderado (1.5x)</option>
                        <option value="complejo">Complejo (2x)</option>
                        <option value="premium">Premium (2.5x)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Urgencia
                      </label>
                      <select
                        value={service.urgency}
                        onChange={(e) => handleServiceUpdate(index, 'urgency', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="estandar">Estándar (14 días)</option>
                        <option value="rapido">Rápido (7 días, +50%)</option>
                        <option value="urgente">Urgente (3 días, +100%)</option>
                        <option value="inmediato">Inmediato (24h, +150%)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alcance
                      </label>
                      <select
                        value={service.scope}
                        onChange={(e) => handleServiceUpdate(index, 'scope', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="personal">Personal (1x)</option>
                        <option value="comercial-local">Comercial Local (1.5x)</option>
                        <option value="comercial-nacional">Comercial Nacional (2x)</option>
                        <option value="comercial-internacional">Comercial Internacional (2.5x)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Empresa
                      </label>
                      <select
                        value={service.rights}
                        onChange={(e) => handleServiceUpdate(index, 'rights', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="pequena">Pequeña Empresa (1x)</option>
                        <option value="profesional">Profesional (1.5x)</option>
                        <option value="empresarial">Empresarial (2x)</option>
                        <option value="corporativo">Corporativo (2.5x)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Experiencia
                      </label>
                      <select
                        value={service.expertise}
                        onChange={(e) => handleServiceUpdate(index, 'expertise', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="junior">Junior (0.8x)</option>
                        <option value="mid">Mid-Level (1x)</option>
                        <option value="senior">Senior (1.5x)</option>
                        <option value="expert">Expert (2x)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría
                      </label>
                      <select
                        value={service.category}
                        onChange={(e) => handleServiceUpdate(index, 'category', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        {sortAlphabetically(customPricing?.categories || []).map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Servicio
                      </label>
                      <select
                        value={service.id}
                        onChange={(e) => handleServiceUpdate(index, 'id', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        {sortAlphabetically(customPricing?.service_options[service.category] || []).map(svc => (
                          <option key={svc.value} value={svc.value}>
                            {svc.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={service.description}
                      onChange={(e) => handleServiceUpdate(index, 'description', e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      rows={3}
                      placeholder="Agregar detalles específicos del servicio..."
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {services.length > 0 && (
        <div>
          {/* Global Options */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descuento por Volumen
                <span className="ml-1 text-gray-500 text-xs">
                  (Aplicado al total)
                </span>
              </label>
              <select
                value={volumeDiscount}
                onChange={(e) => onVolumeDiscountChange(e.target.value as VolumeDiscountType)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="none">Sin descuento</option>
                <option value="2-3">2-3 servicios (-10%)</option>
                <option value="4-5">4-5 servicios (-15%)</option>
                <option value="6+">6+ servicios (-20%)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Cliente
                <span className="ml-1 text-gray-500 text-xs">
                  (Descuento adicional)
                </span>
              </label>
              <select
                value={clientType}
                onChange={(e) => onClientTypeChange(e.target.value as ClientDiscountType)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="normal">Cliente Nuevo</option>
                <option value="recurrente">Cliente Recurrente (-5%)</option>
                <option value="vip">Cliente VIP (-10%)</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mantenimiento
                <span className="ml-1 text-gray-500 text-xs">
                  (Opcional)
                </span>
              </label>
              <select
                value={maintenance}
                onChange={(e) => onMaintenanceChange(e.target.value as MaintenanceType)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="none">Sin mantenimiento</option>
                <option value="mensual">Mensual (+20%)</option>
                <option value="trimestral">Trimestral (+15%)</option>
                <option value="anual">Anual (+10%)</option>
              </select>
            </div>
          </div>

          {/* Total */}
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
        </div>
      )}
    </div>
  );
}