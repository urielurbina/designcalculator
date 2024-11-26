import React, { useState } from 'react';
import { ExternalLink, X, Sparkles } from 'lucide-react';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-4 relative">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Icon and Text */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-base md:text-lg font-semibold text-white leading-tight sm:leading-normal">
                Transforma tus llamadas con clientes
              </h3>
              <p className="text-white/90 text-sm sm:text-sm mt-1 sm:mt-0.5">
                Guía para diseñadores introvertidos · <span className="font-bold">Solo $2 USD</span>
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <a
            href="https://urielurbina.gumroad.com/l/guia-disenadores-introvertidos"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-white/90 transform hover:scale-105 transition-all 
                     text-indigo-600 px-6 py-2.5 rounded-full text-base font-semibold
                     shadow-lg shadow-indigo-900/20 flex items-center gap-2 whitespace-nowrap"
          >
            Obtener Guía
            <ExternalLink className="w-4 h-4" />
          </a>
          
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white 
                     hover:bg-white/10 rounded-full p-1.5 transition-colors"
            aria-label="Cerrar banner"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}