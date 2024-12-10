import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, Plus, Trash2, DollarSign, X, Edit2 } from 'lucide-react';
import { getQuote, updateQuote } from '../../services/quoteService';
import { getFreelancerProfile } from '../../services/freelancerService';
import type { QuoteData } from '../../services/quoteService';
import type { FreelancerData } from '../../services/freelancerService';
import type { Service, SelectedService } from '../../types';
import ServiceForm from '../ServiceForm';
import { useCalculator } from '../../hooks/useCalculator';
import { getUserCustomPricing } from '../../data/pricingcustom';
import { useAuth } from '../../contexts/AuthContext';
import { CustomPricing } from '../../data/pricingcustom';

interface EditQuoteFormProps {
  quoteId: string;
  onClose: () => void;
}

export default function EditQuoteForm({ quoteId, onClose }: EditQuoteFormProps) {
  const { user } = useAuth();
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
  const [customPricing, setCustomPricing] = useState<CustomPricing | null>(null);
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);

  const { calculateServicePrice } = useCalculator({ customPricing });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [quoteData, freelancerProfile, userPricing] = await Promise.all([
          getQuote(quoteId),
          getFreelancerProfile(),
          user?.id ? getUserCustomPricing(user.id) : null
        ]);
        setQuote(quoteData);
        setFreelancerData(freelancerProfile);
        setCustomPricing(userPricing);
      } catch (err) {
        console.error('Error loading quote:', err);
        setError('Error al cargar la cotización');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [quoteId, user]);

  const handleSave = async () => {
    if (!quote || !user?.id) return;

    try {
      setSaving(true);
      setError(null);

      // Calcular el total actualizado
      const newTotal = quote.services.reduce((sum, service) => sum + service.finalPrice, 0);

      // Preparar los datos actualizados
      const updatedQuote: QuoteData = {
        client_id: quote.client_id,
        client: quote.client,
        quote_number: quote.quote_number,
        total_amount: newTotal,
        currency: quote.currency,
        status: quote.status,
        services: quote.services.map(service => ({
          ...service,
          description: service.description?.trim() // Asegurar que las descripciones estén limpias
        })),
        terms: quote.terms || [],
        volume_discount: quote.volume_discount || 'none',
        client_type: quote.client_type || 'normal',
        maintenance: quote.maintenance || 'none',
        freelancer_id: user.id
      };

      console.log('Saving quote with data:', updatedQuote);

      // Guardar en Supabase
      await updateQuote(quoteId, updatedQuote);

      // Mostrar confirmación
      alert('Cotización actualizada correctamente');
      onClose();
    } catch (err) {
      console.error('Error saving quote:', err);
      setError(err instanceof Error ? err.message : 'Error al guardar los cambios');
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

  const handleServiceUpdate = (index: number, field: keyof Service, value: string | number) => {
    if (!quote) return;

    const service = quote.services[index];
    const updatedService = {
      ...service,
      [field]: value
    };

    // Recalcular precios con los nuevos parámetros
    const recalculatedService = calculateServicePrice(updatedService);
    const newServices = [...quote.services];
    newServices[index] = recalculatedService;

    // Recalcular total
    const newTotal = newServices.reduce((sum, s) => sum + s.finalPrice, 0);

    setQuote({
      ...quote,
      services: newServices,
      total_amount: newTotal
    });
  };

  const handleDescriptionUpdate = (index: number, description: string) => {
    if (!quote) return;

    const newServices = quote.services.map((service, i) => 
      i === index ? { 
        ...service, 
        description: description
      } : service
    );

    setQuote({
      ...quote,
      services: newServices
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
                  customPricing={customPricing}
                />
              </div>
            )}

            <div className="space-y-4">
              {quote.services.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">
                        Complejidad: {service.complexity} • 
                        Urgencia: {service.urgency} • 
                        Alcance: {service.scope}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingServiceIndex(index)}
                        className="p-1 text-gray-400 hover:text-indigo-600 rounded-full
                                 hover:bg-indigo-50 transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleRemoveService(index)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded-full
                                 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {editingServiceIndex === index && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Categoría */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Categoría
                          </label>
                          <select
                            value={service.category}
                            onChange={(e) => handleServiceUpdate(index, 'category', e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            {customPricing?.categories.map((cat: { id: string; label: string }) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Servicio */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Servicio
                          </label>
                          <select
                            value={service.id}
                            onChange={(e) => handleServiceUpdate(index, 'id', e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            {customPricing?.service_options[service.category]?.map((svc: { value: string; label: string }) => (
                              <option key={svc.value} value={svc.value}>
                                {svc.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Complejidad */}
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

                        {/* ... otros campos similares ... */}

                        {/* Descripción */}
                        <div className="col-span-full">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                          </label>
                          <textarea
                            value={service.description || ''}
                            onChange={(e) => handleDescriptionUpdate(index, e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            style={{ 
                              whiteSpace: 'pre-wrap',
                              minHeight: '100px'
                            }}
                            rows={5}
                            placeholder="Agregar detalles específicos del servicio...
                            
Usa doble Enter para separar párrafos"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => setEditingServiceIndex(null)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  )}
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