import React, { useState } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import ServiceForm from '../ServiceForm';
import ServiceList from '../ServiceList';
import TermsEditor from '../TermsEditor';
import { Service } from '../../types';
import { FileText, Loader2 } from 'lucide-react';
import { createQuote, generateQuoteNumber } from '../../services/quoteService';

interface QuoteCalculatorProps {
  freelancerData: {
    name: string;
    website: string;
    email: string;
    phone: string;
    logoUrl: string;
  };
  clientData: {
    id: string; // Added client ID
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
    getTotalPrice
  } = useCalculator();

  const [currentService, setCurrentService] = useState<Partial<Service>>({
    category: 'identidad-corporativa',
    id: 'logotipo',
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

  const handleServiceChange = (field: keyof Service, value: string | number) => {
    setCurrentService(prev => ({ ...prev, [field]: value }));
  };

  const handleAddService = () => {
    if (currentService.category && currentService.id) {
      addService(currentService as Service);
      setCurrentService({
        category: 'identidad-corporativa',
        id: 'logotipo',
        complexity: 'simple',
        urgency: 'estandar',
        rights: 'pequena',
        scope: 'personal',
        expertise: 'mid',
        quantity: 1
      });
    }
  };

  const handleGenerateQuote = async () => {
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
        maintenance: maintenance
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
      {/* Service Selection Form */}
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
              disabled={saving}
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
                  Generar Cotización
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}