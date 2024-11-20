import React from 'react';
import { Mail, Instagram, Globe } from 'lucide-react';

export default function DiagnosticFooter() {
  return (
    <footer className="bg-[#0C0C0C] border-t border-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
              ¿Necesitas ayuda con tu marca?
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Agenda una consultoría gratuita y descubre cómo podemos ayudarte.
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="mailto:hola@urielurbina.com"
              className="text-gray-400 hover:text-white transition-colors p-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/urielurbina.design"
              className="text-gray-400 hover:text-white transition-colors p-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.urielurbina.com"
              className="text-gray-400 hover:text-white transition-colors p-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} Uriel Urbina. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}