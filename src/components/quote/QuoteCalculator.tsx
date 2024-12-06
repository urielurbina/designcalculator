import React, { useState, useEffect } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { getUserCustomPricing } from '../../data/pricingcustom';
import { useAuth } from '../../contexts/AuthContext';
import ServiceForm from '../ServiceForm';
import ServiceList from '../ServiceList';
import TermsEditor from '../TermsEditor';
import { Service } from '../../types';
import { FileText, Loader2 } from 'lucide-react';
import { createQuote, generateQuoteNumber } from '../../services/quoteService';
import { CustomPricing } from '../data/pricingcustom';

interface QuoteCalculatorProps {
  freelancerData: {
    name: string;
    website: string;
    email: string;
    phone: string;
    logoUrl: string;
  };
  clientData: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
  };
  onFinish: () => void;
}

export default function QuoteCalculator({ 
  freelancerData, 
  clientData, 
  onFinish 
}: QuoteCalculatorProps) {
  const { user } = useAuth();
  const [customPricing, setCustomPricing] = useState<CustomPricing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
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
  } = useCalculator({ customPricing });

  const [currentService, setCurrentService] = useState<Partial<Service>>({
    category: customPricing?.categories[0]?.id || 'identidad-corporativa',
    id: '',
    complexity: 'simple',
    urgency: 'estandar',
    rights: 'pequena',
    scope: 'personal',
    expertise: 'mid',
    quantity: 1
  });

  const [terms, setTerms] = useState([
    'Los precios no incluyen IVA (16%)',
    'Cotización válida por 30 días',
    '50% de anticipo para iniciar el proyecto',
    'El tiempo de entrega comienza después del anticipo',
    'Incluye hasta 2 rondas de revisiones'
  ]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCustomPricing = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        const data = await getUserCustomPricing(user.id);
        setCustomPricing(data);
        
        // Actualizar el servicio actual con la primera categoría disponible
        if (data?.categories.length > 0) {
          setCurrentService(prev => ({
            ...prev,
            category: data.categories[0].id
          }));
        }
      } catch (error) {
        console.error('Error loading custom pricing:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomPricing();
  }, [user]);

  const handleServiceChange = (field: keyof Service, value: string | number) => {
    setCurrentService(prev => ({ ...prev, [field]: value }));
  };

  const handleAddService = () => {
    if (currentService.category && currentService.id) {
      try {
        const calculatedService = calculateServicePrice(currentService as Service);
        addService(calculatedService);
        setCurrentService({
          category: customPricing?.categories[0]?.id || 'identidad-corporativa',
          id: '',
          complexity: 'simple',
          urgency: 'estandar',
          rights: 'pequena',
          scope: 'personal',
          expertise: 'mid',
          quantity: 1
        });
      } catch (error) {
        console.error('Error calculating service price:', error);
        alert('Error al calcular el precio del servicio');
      }
    }
  };

  const handleGenerateQuote = async () => {
    if (selectedServices.length === 0) {
      setError('Agrega al menos un servicio a la cotización');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const totalPrice = getTotalPrice();
      const quoteNumber = await generateQuoteNumber();

      await createQuote({
        client_id: clientData.id,
        quote_number: quoteNumber,
        total_amount: currency === 'MXN' ? totalPrice.mxn : totalPrice.usd,
        currency,
        status: 'draft',
        services: selectedServices,
        terms,
        volume_discount: volumeDiscount,
        client_type: clientType,
        maintenance: maintenance,
        client: {
          name: clientData.name,
          company: clientData.company,
          email: clientData.email,
          phone: clientData.phone
        }
      });

      onFinish();
    } catch (err) {
      console.error('Error saving quote:', err);
      setError('Error al guardar la cotización');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                Agregar Servicios
              </h1>
            </div>

            <ServiceForm
              service={currentService}
              onChange={handleServiceChange}
              onAdd={handleAddService}
              customPricing={customPricing}
            />
          </div>

          {/* Selected Services List */}
          {selectedServices.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
              <ServiceList
                services={selectedServices}
                onRemoveService={removeService}
                onUpdateService={updateService}
                totalPrice={getTotalPrice()}
                currency={currency}
                onCurrencyChange={setCurrency}
                volumeDiscount={volumeDiscount}
                onVolumeDiscountChange={setVolumeDiscount}
                clientType={clientType}
                onClientTypeChange={setClientType}
                maintenance={maintenance}
                onMaintenanceChange={setMaintenance}
                customPricing={customPricing}
                calculateServicePrice={calculateServicePrice}
              />

              {/* Terms and Conditions */}
              <div className="mt-8 border-t pt-8">
                <TermsEditor
                  terms={terms}
                  onChange={setTerms}
                />
              </div>

              {error && (
                <div className="mt-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="mt-8">
                <button
                  onClick={handleGenerateQuote}
                  disabled={saving || selectedServices.length === 0}
                  className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 
                           transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Guardar Cotización
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}