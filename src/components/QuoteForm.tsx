import React from 'react';
import { QuoteInfo } from '../types';

interface QuoteFormProps {
  quoteInfo: QuoteInfo;
  onQuoteInfoChange: (info: QuoteInfo) => void;
}

export default function QuoteForm({ quoteInfo, onQuoteInfoChange }: QuoteFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onQuoteInfoChange({
      ...quoteInfo,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Cotización</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Información del Diseñador</h4>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nombre</label>
            <input
              type="text"
              name="designerName"
              value={quoteInfo.designerName}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Sitio Web</label>
            <input
              type="url"
              name="designerWebsite"
              value={quoteInfo.designerWebsite}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="designerEmail"
              value={quoteInfo.designerEmail}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
            <input
              type="tel"
              name="designerPhone"
              value={quoteInfo.designerPhone}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">URL del Logo (opcional)</label>
            <input
              type="url"
              name="designerLogo"
              value={quoteInfo.designerLogo}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Información del Cliente</h4>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nombre</label>
            <input
              type="text"
              name="clientName"
              value={quoteInfo.clientName}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Empresa</label>
            <input
              type="text"
              name="clientCompany"
              value={quoteInfo.clientCompany}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="clientEmail"
              value={quoteInfo.clientEmail}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
            <input
              type="tel"
              name="clientPhone"
              value={quoteInfo.clientPhone}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h4 className="font-medium text-gray-700">Detalles de la Cotización</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Número de Cotización</label>
              <input
                type="text"
                name="quoteNumber"
                value={quoteInfo.quoteNumber}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Fecha</label>
              <input
                type="date"
                name="quoteDate"
                value={quoteInfo.quoteDate}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Válido Hasta</label>
              <input
                type="date"
                name="validUntil"
                value={quoteInfo.validUntil}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Notas Adicionales</label>
            <textarea
              name="notes"
              value={quoteInfo.notes}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}