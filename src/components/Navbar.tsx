import React from 'react';
import { Calculator, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-semibold text-xl text-indigo-600">
            DesignCalc
          </Link>
          
          <div className="flex space-x-4">
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
          </div>
        </div>
      </div>
    </nav>
  );
}