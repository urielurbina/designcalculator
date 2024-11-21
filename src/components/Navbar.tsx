import React, { useState } from 'react';
import { Calculator, Clock, Menu, X, Palette } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-semibold text-xl text-indigo-600 shrink-0">
            Referencia Creativa
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/calculator"
              className={`flex items-center px-4 py-2 rounded-md ${
                location.pathname === '/calculator' 
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calculator className="w-5 h-5 mr-2" />
              <span>Calculadora de Diseño</span>
            </Link>
            <Link
              to="/freelance"
              className={`flex items-center px-4 py-2 rounded-md ${
                location.pathname === '/freelance'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-5 h-5 mr-2" />
              <span>Calculadora Freelance</span>
            </Link>
            <Link
              to="/colors"
              className={`flex items-center px-4 py-2 rounded-md ${
                location.pathname === '/colors'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Palette className="w-5 h-5 mr-2" />
              <span>Convertidor de Colores</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } border-t border-gray-200 py-2`}
        >
          <div className="space-y-1 pb-3 pt-2">
            <Link
              to="/calculator"
              className={`flex items-center px-4 py-3 rounded-md ${
                location.pathname === '/calculator'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Calculator className="w-5 h-5 mr-3" />
              <span>Calculadora de Diseño</span>
            </Link>
            <Link
              to="/freelance"
              className={`flex items-center px-4 py-3 rounded-md ${
                location.pathname === '/freelance'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Clock className="w-5 h-5 mr-3" />
              <span>Calculadora Freelance</span>
            </Link>
            <Link
              to="/colors"
              className={`flex items-center px-4 py-3 rounded-md ${
                location.pathname === '/colors'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Palette className="w-5 h-5 mr-3" />
              <span>Convertidor de Colores</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}