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
import { Service, SelectedService, ServiceCategory, ServiceId } from '../types';

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
      const categoryRates = baseRates[service.category];
      const basePrice = categoryRates[service.id] || 0;
      const complexityMultiplier = complexityMultipliers[service.complexity] || 1;
      const urgencyMultiplier = urgencyMultipliers[service.urgency]?.value || 1;
      const rightsMultiplier = rightsMultipliers[service.rights] || 1;
      const scopeMultiplier = scopeMultipliers[service.scope] || 1;
      const expertiseMultiplier = expertiseMultipliers[service.expertise] || 1;
      const quantity = service.quantity || 1;

      const price = basePrice * complexityMultiplier * urgencyMultiplier * 
                   rightsMultiplier * scopeMultiplier * expertiseMultiplier * quantity;

      const serviceOption = serviceOptions[service.category]?.find(opt => opt.value === service.id);
      const serviceName = serviceOption?.label || service.id;

      const finalPrice = Math.round(price);
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

  // Rest of your code...
  
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