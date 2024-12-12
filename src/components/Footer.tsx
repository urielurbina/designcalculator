import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Crown, User, Palette, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Referencia Creativa</h3>
            <p className="text-gray-400">
              Herramientas profesionales para diseñadores y freelancers. Calcula precios, genera cotizaciones y gestiona tus proyectos.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/calculator"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculadora Gratuita</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/freelance"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  <span>Calculadora por Horas</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/cotizar"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  <span>Cotizador Premium</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/colors"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Palette className="w-4 h-4" />
                  <span>Convertidor de Colores</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Planes y Precios
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Términos de Servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Creador */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Creador</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.urielurbina.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Uriel Urbina</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Referencia Creativa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}