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
import { Service, SelectedService, VolumeDiscountType, ClientDiscountType, MaintenanceType } from '../types';
import { CustomPricing } from '../data/pricingcustom';

const MXN_TO_USD = 20; // Exchange rate: 20 MXN = 1 USD

export type Currency = 'MXN' | 'USD';

interface UseCalculatorProps {
  customPricing?: CustomPricing | null;
}

export function useCalculator({ customPricing }: UseCalculatorProps = {}) {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [volumeDiscount, setVolumeDiscount] = useState<VolumeDiscountType>('none');
  const [clientType, setClientType] = useState<ClientDiscountType>('normal');
  const [maintenance, setMaintenance] = useState<MaintenanceType>('none');
  const [currency, setCurrency] = useState<Currency>('MXN');

  const calculateServicePrice = useCallback((service: Service): SelectedService => {
    try {
      const rates = customPricing?.base_rates || baseRates;
      
      const categoryKey = service.category
        .toLowerCase()
        .replace(/ y /g, '-')
        .replace(/ /g, '-')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      
      const basePrice = rates[categoryKey]?.[service.id] || 0;
      
      const services = customPricing?.service_options || serviceOptions;
      const serviceOption = services[service.category]?.find(opt => opt.value === service.id);
      const serviceName = serviceOption?.label || service.id;

      const complexityMultiplier = complexityMultipliers[service.complexity] || 1;
      const urgencyMultiplier = urgencyMultipliers[service.urgency]?.value || 1;
      const rightsMultiplier = rightsMultipliers[service.rights] || 1;
      const scopeMultiplier = scopeMultipliers[service.scope] || 1;
      const expertiseMultiplier = expertiseMultipliers[service.expertise] || 1;
      const quantity = service.quantity || 1;

      const price = basePrice * complexityMultiplier * urgencyMultiplier * 
                   rightsMultiplier * scopeMultiplier * expertiseMultiplier * quantity;

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
          finalPriceUSD,
          clientMultiplier: rightsMultiplier,
          urgencyMultiplier: urgencyMultiplier
        }
      };
    } catch (error) {
      console.error('Error calculating price:', error);
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
          finalPriceUSD: 0,
          clientMultiplier: 1,
          urgencyMultiplier: 1
        }
      };
    }
  }, [customPricing]);

  const addService = useCallback((service: Service) => {
    const calculatedService = calculateServicePrice(service);
    setSelectedServices(prev => [...prev, calculatedService]);
  }, [calculateServicePrice]);

  const removeService = useCallback((index: number) => {
    setSelectedServices(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateService = useCallback((index: number, service: SelectedService) => {
    setSelectedServices(prev => prev.map((s, i) => i === index ? service : s));
  }, []);

  const getTotalPrice = useCallback(() => {
    const subtotal = selectedServices.reduce((sum, service) => sum + service.finalPrice, 0);
    const volumeDiscountMultiplier = 1 - (volumeDiscounts[volumeDiscount] || 0);
    const clientDiscountMultiplier = 1 - (clientDiscounts[clientType] || 0);
    const maintenanceMultiplier = 1 + (maintenanceFees[maintenance] || 0);

    const total = subtotal * volumeDiscountMultiplier * clientDiscountMultiplier * maintenanceMultiplier;
    
    return {
      mxn: Math.round(total),
      usd: Math.round(total / MXN_TO_USD)
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
    getTotalPrice,
    calculateServicePrice
  };
}