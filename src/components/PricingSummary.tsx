import React from 'react';
import { PriceBreakdown, Touchpoint } from '../types';

interface PricingSummaryProps {
  totalPrice: string;
  breakdown: PriceBreakdown;
  selectedTouchpoints: string[];
  touchpoints: Touchpoint[];
}

export default function PricingSummary({
  totalPrice,
  breakdown,
  selectedTouchpoints,
  touchpoints,
}: PricingSummaryProps) {
  const selectedTouchpointsDetails = touchpoints.filter(t => 
    selectedTouchpoints.includes(t.id)
  );

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 h-fit">
      <h2 className="text-xl font-semibold text-white mb-4">Precio Estimado</h2>
      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <div className="text-4xl font-bold text-white">
          ${totalPrice}
        </div>
        <p className="text-indigo-100 mt-2">Precio base + multiplicadores y touchpoints</p>
      </div>
      
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm text-indigo-100">
          <span>Precio Base</span>
          <span>${breakdown.basePrice}</span>
        </div>
        <div className="flex justify-between text-sm text-indigo-100">
          <span>Multiplicador Cliente</span>
          <span>x{breakdown.clientMultiplier}</span>
        </div>
        <div className="flex justify-between text-sm text-indigo-100">
          <span>Multiplicador Urgencia</span>
          <span>x{breakdown.urgencyMultiplier}</span>
        </div>

        {selectedTouchpointsDetails.length > 0 && (
          <>
            <div className="h-px bg-white/20 my-3"></div>
            <div className="space-y-2">
              <p className="text-sm text-indigo-100 font-medium">Touchpoints Adicionales:</p>
              {selectedTouchpointsDetails.map(touchpoint => (
                <div key={touchpoint.id} className="flex justify-between text-sm text-indigo-100">
                  <span>{touchpoint.name}</span>
                  <span>+${touchpoint.price}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}