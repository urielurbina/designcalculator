import React, { useState, useRef, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { useCalculator } from '../hooks/useCalculator';
import { Service, VolumeDiscountType, ClientDiscountType, MaintenanceType, SelectedService, CustomPricing } from '../types';
import QuoteForm from './QuoteForm';
import QuotePDF from './QuotePDF';
import ServiceForm from './ServiceForm';
import ServiceList from './ServiceList';
import TermsEditor from './TermsEditor';
import EmailSubscriptionModal from './EmailSubscriptionModal';

export default function PriceCalculator() {
  const servicesListRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [customPricing, setCustomPricing] = useState<CustomPricing | null>(null);
  
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
    category: 'identidad-corporativa',
    id: 'logotipo',
    complexity: 'simple',
    urgency: 'estandar',
    rights: 'pequena',
    scope: 'personal',
    expertise: 'mid',
    quantity: 1
  });

  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [terms, setTerms] = useState([
    'Los precios no incluyen IVA (16%)',
    'Cotización válida por 30 días',
    '50% de anticipo para iniciar el proyecto',
    'El tiempo de entrega comienza después del anticipo',
    'Incluye hasta 2 rondas de revisiones'
  ]);

  const [quoteInfo, setQuoteInfo] = useState({
    designerName: '',
    designerWebsite: '',
    designerEmail: '',
    designerPhone: '',
    designerLogo: '',
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    clientPhone: '',
    quoteNumber: `QT-${Date.now().toString().slice(-6)}`,
    quoteDate: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    if (shouldScroll && servicesListRef.current) {
      const headerOffset = 100;
      const elementPosition = servicesListRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setShouldScroll(false);
    }
  }, [shouldScroll, selectedServices]);

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
      setShouldScroll(true);
    }
  };

  const handleGenerateQuote = () => {
    if (!isSubscribed) {
      setShowEmailModal(true);
    } else {
      setShowQuoteForm(true);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-6 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Header with Instructions */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Calculadora de Precios
            </h1>
          </div>
          
          <div className="mb-6 sm:mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
              ¿Cómo usar la calculadora?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-blue-700">
              <li>Selecciona la categoría y el servicio que deseas cotizar</li>
              <li>Ajusta la complejidad según los requerimientos del proyecto</li>
              <li>Define la urgencia y el alcance del trabajo</li>
              <li>Agrega servicios adicionales si es necesario</li>
              <li>Genera tu cotización profesional en PDF</li>
            </ol>
          </div>
          {/* Service Selection Form */}
          <ServiceForm
            service={currentService}
            onChange={handleServiceChange}
            onAdd={handleAddService}
            customPricing={customPricing}
          />
        </div>

        {/* Selected Services List */}
        {selectedServices.length > 0 && (
          <div ref={servicesListRef} className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
            <ServiceList
              services={selectedServices}
              onRemoveService={removeService}
              onUpdateService={updateService}
              totalPrice={totalPrice}
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

            <div className="mt-6 sm:mt-8">
              <button
                onClick={handleGenerateQuote}
                className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Generar Cotización PDF
              </button>
              <p className="mt-2 text-sm text-gray-500 text-center">
                * Los precios no incluyen IVA
              </p>
            </div>
          </div>
        )}

        {/* Quote Form with Terms Editor */}
        {showQuoteForm && (
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
            <QuoteForm
              quoteInfo={quoteInfo}
              onQuoteInfoChange={setQuoteInfo}
            />

            <div className="mt-6 sm:mt-8">
              <TermsEditor
                terms={terms}
                onChange={setTerms}
              />
            </div>

            {selectedServices.length > 0 && (
              <div className="mt-6">
                <QuotePDF
                  quoteInfo={quoteInfo}
                  services={selectedServices}
                  totalPrice={totalPrice}
                  currency={currency}
                  discounts={{
                    volume: volumeDiscount,
                    client: clientType,
                    maintenance: maintenance
                  }}
                  terms={terms}
                />
              </div>
            )}
          </div>
        )}

        <EmailSubscriptionModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onSubscribe={() => {
            setIsSubscribed(true);
            setShowEmailModal(false);
            setShowQuoteForm(true);
          }}
        />
      </div>
    </div>
  );
}