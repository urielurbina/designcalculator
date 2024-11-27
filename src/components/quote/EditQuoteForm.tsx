import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, Plus, Trash2, DollarSign, X } from 'lucide-react';
import { getQuote, updateQuote } from '../../services/quoteService';
import { getFreelancerProfile } from '../../services/freelancerService';
import type { QuoteData } from '../../services/quoteService';
import type { FreelancerData } from '../../services/freelancerService';
import type { Service, SelectedService } from '../../types';
import ServiceForm from '../ServiceForm';
import { useCalculator } from '../../hooks/useCalculator';

interface EditQuoteFormProps {
  quoteId: string;
  onClose: () => void;
}

export default function EditQuoteForm({ quoteId, onClose }: EditQuoteFormProps) {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [freelancerData, setFreelancerData] = useState<FreelancerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
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

  const { calculateServicePrice } = useCalculator();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [quoteData, freelancerProfile] = await Promise.all([
          getQuote(quoteId),
          getFreelancerProfile()
        ]);
        setQuote(quoteData);
        setFreelancerData(freelancerProfile);
      } catch (err) {
        console.error('Error loading quote:', err);
        setError('Error al cargar la cotización');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [quoteId]);

  const handleSave = async () => {
    if (!quote) return;

    try {
      setSaving(true);
      await updateQuote(quoteId, quote);
      onClose();
    } catch (err) {
      console.error('Error saving quote:', err);
      setError('Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  const handleServiceChange = (field: keyof Service, value: string | number) => {
    setCurrentService(prev => ({ ...prev, [field]: value }));
  };

  const handleAddService = () => {
    if (!quote || !currentService.category || !currentService.id) return;

    const calculatedService = calculateServicePrice(currentService as Service);
    setQuote({
      ...quote,
      services: [...quote.services, calculatedService],
      total_amount: quote.total_amount + calculatedService.finalPrice
    });
    setShowServiceForm(false);
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
  };

  const handleRemoveService = (index: number) => {
    if (!quote) return;

    const removedService = quote.services[index];
    const newServices = quote.services.filter((_, i) => i !== index);
    setQuote({
      ...quote,
      services: newServices,
      total_amount: quote.total_amount - removedService.finalPrice
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
          <span className="text-gray-600">Cargando cotización...</span>
        </div>
      </div>
    );
  }

  if (error || !quote || !freelancerData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-red-600">
              {error || 'No se pudo cargar la cotización'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <div className="text-sm text-gray-600">
            Cotización: <span className="font-medium">{quote.quote_number}</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Client Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Información del Cliente
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <p className="text-gray-900">{quote.client.name}</p>
              </div>
              {quote.client.company && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa
                  </label>
                  <p className="text-gray-900">{quote.client.company}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{quote.client.email}</p>
              </div>
              {quote.client.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <p className="text-gray-900">{quote.client.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Servicios
              </h2>
              <button
                onClick={() => setShowServiceForm(true)}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="w-5 h-5" />
                Agregar Servicio
              </button>
            </div>

            {showServiceForm && (
              <div className="mb-6 border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Nuevo Servicio
                  </h3>
                  <button
                    onClick={() => setShowServiceForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ServiceForm
                  service={currentService}
                  onChange={handleServiceChange}
                  onAdd={handleAddService}
                />
              </div>
            )}

            <div className="space-y-4">
              {quote.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <div className="mt-1 text-sm text-gray-500 space-y-1">
                      <p>Cantidad: {service.quantity || 1}</p>
                      <p>Complejidad: {service.complexity}</p>
                      <p>Urgencia: {service.urgency}</p>
                      {service.description && (
                        <p className="italic">{service.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ${service.finalPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${service.finalPriceUSD.toLocaleString()} USD
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveService(index)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <div className="text-right">
                  <div className="text-2xl font-bold flex items-center gap-1">
                    <DollarSign className="w-6 h-6" />
                    {quote.total_amount.toLocaleString()} {quote.currency}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 
                       rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}