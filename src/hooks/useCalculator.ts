import { useState, useCallback } from 'react';
import {
  baseRates,
  complexityMultipliers,
  urgencyMultipliers,
  rightsMultipliers,
  scopeMultipliers,
  volumeDiscounts,
  clientDiscounts,
  maintenanceFees,
  serviceOptions
} from '../data/pricing';
import { Service, SelectedService } from '../types';

export function useCalculator() {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [volumeDiscount, setVolumeDiscount] = useState('none');
  const [clientType, setClientType] = useState('normal');
  const [maintenance, setMaintenance] = useState('none');

  const calculateServicePrice = useCallback((service: Service): SelectedService => {
    try {
      // Validar que la categoría y el servicio existan
      if (!baseRates[service.category] || !baseRates[service.category][service.id]) {
        throw new Error(`Servicio no encontrado: ${service.category}.${service.id}`);
      }

      // Obtener el precio base del servicio
      const basePrice = baseRates[service.category][service.id];

      // Validar multiplicadores
      const complexityMultiplier = complexityMultipliers[service.complexity] || 1;
      const urgencyMultiplier = urgencyMultipliers[service.urgency]?.value || 1;
      const rightsMultiplier = rightsMultipliers[service.rights] || 1;
      const scopeMultiplier = scopeMultipliers[service.scope] || 1;

      // Calcular precio con multiplicadores
      const price = basePrice * complexityMultiplier * urgencyMultiplier * rightsMultiplier * scopeMultiplier;

      // Obtener nombre del servicio
      const serviceOption = serviceOptions[service.category]?.find(opt => opt.value === service.id);
      const serviceName = serviceOption?.label || service.id;

      return {
        ...service,
        name: serviceName,
        basePrice,
        description: '',
        finalPrice: Math.round(price),
        breakdown: {
          basePrice,
          complexity: complexityMultiplier,
          urgency: urgencyMultiplier,
          rights: rightsMultiplier,
          scope: scopeMultiplier,
          volumeDiscount: 0,
          clientDiscount: 0,
          maintenance: 0,
          finalPrice: Math.round(price)
        }
      };
    } catch (error) {
      console.error('Error calculando precio:', error);
      return {
        ...service,
        name: 'Error en el servicio',
        basePrice: 0,
        description: '',
        finalPrice: 0,
        breakdown: {
          basePrice: 0,
          complexity: 1,
          urgency: 1,
          rights: 1,
          scope: 1,
          volumeDiscount: 0,
          clientDiscount: 0,
          maintenance: 0,
          finalPrice: 0
        }
      };
    }
  }, []);

  const getTotalPrice = useCallback(() => {
    if (selectedServices.length === 0) return 0;

    let total = selectedServices.reduce((sum, service) => sum + service.finalPrice, 0);
    
    // Aplicar descuentos globales
    const volumeDiscountRate = volumeDiscounts[volumeDiscount] || 0;
    const clientDiscountRate = clientDiscounts[clientType] || 0;
    const totalDiscount = volumeDiscountRate + clientDiscountRate;
    
    if (totalDiscount > 0) {
      total = total * (1 - totalDiscount);
    }
    
    // Aplicar mantenimiento
    const maintenanceFee = maintenanceFees[maintenance] || 0;
    if (maintenanceFee > 0) {
      total = total * (1 + maintenanceFee);
    }
    
    return Math.round(total);
  }, [selectedServices, volumeDiscount, clientType, maintenance]);

  const addService = useCallback((service: Service) => {
    const calculatedService = calculateServicePrice(service);
    if (calculatedService.finalPrice > 0) {
      setSelectedServices(prev => [...prev, calculatedService]);
    }
  }, [calculateServicePrice]);

  const removeService = useCallback((index: number) => {
    setSelectedServices(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateService = useCallback((index: number, service: SelectedService) => {
    setSelectedServices(prev => {
      const newServices = [...prev];
      newServices[index] = service;
      return newServices;
    });
  }, []);

  return {
    selectedServices,
    volumeDiscount,
    clientType,
    maintenance,
    setVolumeDiscount,
    setClientType,
    setMaintenance,
    addService,
    removeService,
    updateService,
    getTotalPrice
  };
}