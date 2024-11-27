import React, { useState } from 'react';
import { Palette, Upload, Check, X } from 'lucide-react';

interface PDFDesignConfig {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoPosition: 'left' | 'right' | 'center';
  showHeader: boolean;
  showFooter: boolean;
  headerText: string;
  footerText: string;
  customCSS: string;
}

const defaultConfig: PDFDesignConfig = {
  primaryColor: '#4F46E5',
  accentColor: '#818CF8',
  fontFamily: 'Helvetica',
  logoPosition: 'right',
  showHeader: true,
  showFooter: true,
  headerText: '',
  footerText: '© {year} Todos los derechos reservados',
  customCSS: ''
};

export default function PDFDesignPanel() {
  const [config, setConfig] = useState<PDFDesignConfig>(defaultConfig);
  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (field: keyof PDFDesignConfig, value: string | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would save the configuration
    console.log('Saving configuration:', config);
    setPreviewMode(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Diseño del PDF
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colors */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Colores</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Color Principal
              </label>
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Color Secundario
              </label>
              <input
                type="color"
                value={config.accentColor}
                onChange={(e) => handleChange('accentColor', e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-300"
              />
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Tipografía</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Fuente Principal
              </label>
              <select
                value={config.fontFamily}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Helvetica">Helvetica</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier">Courier</option>
              </select>
            </div>
          </div>

          {/* Logo Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Logotipo</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Posición del Logo
              </label>
              <select
                value={config.logoPosition}
                onChange={(e) => handleChange('logoPosition', e.target.value as 'left' | 'right' | 'center')}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="left">Izquierda</option>
                <option value="center">Centro</option>
                <option value="right">Derecha</option>
              </select>
            </div>
          </div>

          {/* Header & Footer */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Encabezado y Pie</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.showHeader}
                  onChange={(e) => handleChange('showHeader', e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Mostrar Encabezado</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.showFooter}
                  onChange={(e) => handleChange('showFooter', e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Mostrar Pie</span>
              </label>
            </div>
            {config.showHeader && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Texto del Encabezado
                </label>
                <input
                  type="text"
                  value={config.headerText}
                  onChange={(e) => handleChange('headerText', e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Texto del encabezado..."
                />
              </div>
            )}
            {config.showFooter && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Texto del Pie
                </label>
                <input
                  type="text"
                  value={config.footerText}
                  onChange={(e) => handleChange('footerText', e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Texto del pie..."
                />
              </div>
            )}
          </div>

          {/* Custom CSS */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-medium text-gray-700">CSS Personalizado</h3>
            <textarea
              value={config.customCSS}
              onChange={(e) => handleChange('customCSS', e.target.value)}
              className="w-full h-32 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono text-sm"
              placeholder="Agrega estilos CSS personalizados aquí..."
            />
          </div>
        </div>

        {/* Preview & Save */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2"
          >
            {previewMode ? (
              <>
                <X className="w-5 h-5" />
                Cerrar Vista Previa
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Vista Previa
              </>
            )}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                     transition-colors flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Guardar Diseño
          </button>
        </div>
      </div>

      {/* Preview */}
      {previewMode && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h3>
          <div className="border rounded-lg p-4 min-h-[600px] bg-gray-50">
            {/* Here you would render a preview of the PDF with the current configuration */}
            <div className="text-center text-gray-500">
              Vista previa del PDF con la configuración actual
            </div>
          </div>
        </div>
      )}
    </div>
  );
}