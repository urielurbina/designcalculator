import React from 'react';
import { LogOut, FileText, Settings, Users, Palette, List } from 'lucide-react';
import { ActivePanel } from '../../types/quote';

interface NavigationProps {
  activePanel: ActivePanel;
  onPanelChange: (panel: ActivePanel) => void;
  onSignOut: () => void;
}

export default function Navigation({ activePanel, onPanelChange, onSignOut }: NavigationProps) {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold text-gray-900">
              Panel de Control
            </h1>
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => onPanelChange('quotes')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePanel === 'quotes'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Cotizaciones
                </span>
              </button>
              <button
                onClick={() => onPanelChange('freelancer')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePanel === 'freelancer'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Mi Información
                </span>
              </button>
              <button
                onClick={() => onPanelChange('clients')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePanel === 'clients'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Clientes
                </span>
              </button>
              <button
                onClick={() => onPanelChange('pdf-design')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePanel === 'pdf-design'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Diseño PDF
                </span>
              </button>
              <button
                onClick={() => onPanelChange('services')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePanel === 'services'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <List className="w-4 h-4" />
                  Mis Servicios
                </span>
              </button>
            </div>
          </div>
          <button
            onClick={onSignOut}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </nav>
  );
}