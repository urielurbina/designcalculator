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
  serviceOptions,
  expertiseMultipliers
} from '../data/pricing';
import { Service, SelectedService } from '../types';

const MXN_TO_USD = 20; // Exchange rate: 20 MXN = 1 USD

export type Currency = 'MXN' | 'USD';

export function useCalculator() {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [volumeDiscount, setVolumeDiscount] = useState('none');
  const [clientType, setClientType] = useState('normal');
  const [maintenance, setMaintenance] = useState('none');
  const [currency, setCurrency] = useState<Currency>('MXN');

  const calculateServicePrice = useCallback((service: Service): SelectedService => {
    try {
      if (!baseRates[service.category] || !baseRates[service.category][service.id]) {
        throw new Error(`Servicio no encontrado: ${service.category}.${service.id}`);
      }

      const basePrice = baseRates[service.category][service.id];
      const complexityMultiplier = complexityMultipliers[service.complexity] || 1;
      const urgencyMultiplier = urgencyMultipliers[service.urgency]?.value || 1;
      const rightsMultiplier = rightsMultipliers[service.rights] || 1;
      const scopeMultiplier = scopeMultipliers[service.scope] || 1;
      const expertiseMultiplier = expertiseMultipliers[service.expertise] || 1;
      const quantity = service.quantity || 1;

      const unitPrice = basePrice * complexityMultiplier * urgencyMultiplier * 
                     rightsMultiplier * scopeMultiplier * expertiseMultiplier;
      
      const totalPrice = unitPrice * quantity;

      const serviceOption = serviceOptions[service.category]?.find(opt => opt.value === service.id);
      const serviceName = serviceOption?.label || service.id;

      const finalPrice = Math.round(totalPrice);
      const finalPriceUSD = Math.round(finalPrice / MXN_TO_USD);

      return {
        ...service,
        name: serviceName,
        basePrice,
        description: '',
        finalPrice,
        finalPriceUSD,
        breakdown: {
          basePrice,
          complexity: complexityMultiplier,
          urgency: urgencyMultiplier,
          rights: rightsMultiplier,
          scope: scopeMultiplier,
          expertise: expertiseMultiplier,
          volumeDiscount: 0,
          clientDiscount: 0,
          maintenance: 0,
          finalPrice,
          finalPriceUSD
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
        finalPriceUSD: 0,
        breakdown: {
          basePrice: 0,
          complexity: 1,
          urgency: 1,
          rights: 1,
          scope: 1,
          expertise: 1,
          volumeDiscount: 0,
          clientDiscount: 0,
          maintenance: 0,
          finalPrice: 0,
          finalPriceUSD: 0
        }
      };
    }
  }, []);

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

  const getTotalPrice = useCallback(() => {
    if (selectedServices.length === 0) return { mxn: 0, usd: 0 };

    let totalMXN = selectedServices.reduce((sum, service) => 
      sum + service.finalPrice, 0);
    
    // Apply global discounts
    const volumeDiscountRate = volumeDiscounts[volumeDiscount] || 0;
    const clientDiscountRate = clientDiscounts[clientType] || 0;
    const totalDiscount = volumeDiscountRate + clientDiscountRate;
    
    if (totalDiscount > 0) {
      totalMXN = totalMXN * (1 - totalDiscount);
    }
    
    // Apply maintenance
    const maintenanceFee = maintenanceFees[maintenance] || 0;
    if (maintenanceFee > 0) {
      totalMXN = totalMXN * (1 + maintenanceFee);
    }
    
    const totalUSD = Math.round(totalMXN / MXN_TO_USD);
    return { 
      mxn: Math.round(totalMXN),
      usd: totalUSD
    };
  }, [selectedServices, volumeDiscount, clientType, maintenance]);

  return {
    selectedServices,
    volumeDiscount,
    clientType,
    maintenance,
    currency,
    setVolumeDiscount,
    setClientType,
    setMaintenance,
    setCurrency,
    addService,
    removeService,
    updateService,
    getTotalPrice
  };
}