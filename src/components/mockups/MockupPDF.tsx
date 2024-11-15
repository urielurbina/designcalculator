import React from 'react';

export default function MockupPDF() {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="max-w-[600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-indigo-600">Cotización</h1>
            <p className="text-sm text-gray-600">#COT-2024001</p>
          </div>
          <div className="h-16 w-16 bg-gray-300 rounded"></div>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="font-medium text-gray-800">Información del Diseñador</h2>
            <div className="space-y-2">
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-4 w-44 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-medium text-gray-800">Información del Cliente</h2>
            <div className="space-y-2">
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-4 w-44 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-gray-100 p-4 rounded-lg space-y-4">
          <h2 className="font-medium text-gray-800">Detalles del Servicio</h2>
          <div className="p-3 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Diseño de Logotipo</h3>
              <span className="text-indigo-600 font-semibold">$5,000 MXN</span>
            </div>
            <div className="text-sm text-gray-600">
              Complejidad: Premium
              <br />
              Urgencia: Normal
              <br />
              Alcance: Comercial
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-100 p-4 rounded-lg space-y-4">
          <h2 className="font-medium text-gray-800">Resumen de Precios</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">$5,000 MXN</span>
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="font-bold text-indigo-600">$5,000 MXN</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          Válido hasta: 30 días a partir de la fecha de emisión
        </div>
      </div>
    </div>
  );
}