import React from 'react';
import { DollarSign } from 'lucide-react';

export default function MockupCalculator() {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Categoría
          </label>
          <div className="relative">
            <select
              disabled
              className="w-full h-10 bg-white rounded-lg border border-gray-200 px-3 text-gray-600"
            >
              <option>Identidad Corporativa</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Servicio
          </label>
          <div className="relative">
            <select
              disabled
              className="w-full h-10 bg-white rounded-lg border border-gray-200 px-3 text-gray-600"
            >
              <option>Logotipo Básico</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Complejidad
          </label>
          <div className="relative">
            <select
              disabled
              className="w-full h-10 bg-white rounded-lg border border-gray-200 px-3 text-gray-600"
            >
              <option>Premium (2.5x)</option>
            </select>
          </div>
        </div>
        
        <div className="mt-8 bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
          <h3 className="text-sm font-medium text-indigo-100 mb-3">
            Precio Estimado
          </h3>
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-6 h-6 text-white/80" />
            <span className="text-3xl font-bold">12,500 MXN</span>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-indigo-100">
              <span>Precio Base</span>
              <span>$5,000</span>
            </div>
            <div className="flex justify-between text-indigo-100">
              <span>Multiplicador</span>
              <span>x2.5</span>
            </div>
            <div className="h-px bg-white/20 my-2"></div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>$12,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}