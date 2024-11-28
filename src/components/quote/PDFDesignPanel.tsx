import React, { useState, useEffect } from 'react';
import { Palette, Upload, Check, X, Loader2 } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { savePDFDesign, loadPDFDesign } from '../../services/pdfDesignService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { CustomQuotePDFPreview } from './CustomQuotePDF';
import { ServiceId, ServiceCategory, ComplexityLevel, UrgencyLevel, RightsLevel, ScopeLevel, ExpertiseLevel } from '@/types';

interface PDFDesignConfig {
  primaryColor: string;
  accentColor: string;
  textColor: string;
  secondaryTextColor: string;
  backgroundColor: string;
  fontFamily: string;
  secondaryFontFamily: string;
  fontSize: {
    title: number;
    subtitle: number;
    body: number;
    small: number;
  };
  logoPosition: 'left' | 'right' | 'center';
  showHeader: boolean;
  showFooter: boolean;
  headerText: string;
  footerText: string;
  spacing: {
    section: number;
    element: number;
    page: number;
  };
  borders: {
    width: number;
    color: string;
    style: 'solid' | 'dashed' | 'dotted';
  };
  serviceCard: {
    backgroundColor: string;
    borderRadius: number;
    shadow: boolean;
    borderColor: string;
    padding: number;
  };
  priceBreakdown: {
    backgroundColor: string;
    borderRadius: number;
    shadow: boolean;
    borderColor: string;
    padding: number;
  };
  shadows: {
    enabled: boolean;
    color: string;
    blur: number;
    opacity: number;
  };
}

const defaultConfig: PDFDesignConfig = {
  primaryColor: '#4F46E5',
  accentColor: '#818CF8',
  textColor: '#1F2937',
  secondaryTextColor: '#6B7280',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Helvetica',
  secondaryFontFamily: 'Arial',
  fontSize: {
    title: 24,
    subtitle: 18,
    body: 12,
    small: 10
  },
  logoPosition: 'right',
  showHeader: true,
  showFooter: true,
  headerText: '',
  footerText: '© {year} Todos los derechos reservados',
  spacing: {
    section: 20,
    element: 12,
    page: 30
  },
  borders: {
    width: 1,
    color: '#E5E7EB',
    style: 'solid'
  },
  serviceCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 4,
    shadow: true,
    borderColor: '#E5E7EB',
    padding: 12
  },
  priceBreakdown: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    shadow: true,
    borderColor: '#E5E7EB',
    padding: 24
  },
  shadows: {
    enabled: true,
    color: '#000000',
    blur: 4,
    opacity: 0.1
  }
};

const sampleQuoteInfo = {
  quoteNumber: '12345',
  quoteDate: new Date().toLocaleDateString(),
  validUntil: new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString(),
  designerName: 'Diseñador Demo',
  designerEmail: 'demo@ejemplo.com',
  designerPhone: '123-456-7890',
  designerWebsite: 'www.ejemplo.com',
  designerLogo: 'https://via.placeholder.com/150',
  clientName: 'Cliente Demo',
  clientCompany: 'Empresa Demo',
  clientEmail: 'cliente@ejemplo.com',
  clientPhone: '098-765-4321',
  notes: 'Notas de ejemplo'
};

const sampleServices = [
  {
    name: 'Diseño de Logotipo',
    description: 'Diseño profesional de logotipo con múltiples revisiones',
    finalPrice: 5000,
    finalPriceUSD: 250,
    quantity: 1,
    basePrice: 5000,
    breakdown: {
      basePrice: 5000,
      complexity: 1,
      urgency: 1,
      rights: 1,
      scope: 1,
      expertise: 1,
      finalPrice: 5000,
      adjustments: {},
      quantity: 1,
      total: 5000,
      totalUSD: 250,
      exchangeRate: 20,
      volumeDiscount: 0,
      clientDiscount: 0,
      maintenance: 0,
      finalPriceUSD: 250,
      subtotal: 5000,
      subtotalUSD: 250,
      clientMultiplier: 1,
      urgencyMultiplier: 1
    },
    id: 'logotipo-completo' as ServiceId,
    category: 'identidad-corporativa' as ServiceCategory,
    complexity: 'simple' as ComplexityLevel,
    urgency: 'estandar' as UrgencyLevel,
    rights: 'pequena' as RightsLevel,
    scope: 'personal' as ScopeLevel,
    expertise: 'senior' as ExpertiseLevel
  },
  {
    name: 'Diseño de Tarjetas',
    description: 'Diseño de tarjetas de presentación',
    finalPrice: 2000,
    finalPriceUSD: 100,
    quantity: 1,
    basePrice: 2000,
    breakdown: {
      basePrice: 2000,
      complexity: 1,
      urgency: 1,
      rights: 1,
      scope: 1,
      expertise: 1,
      finalPrice: 2000,
      adjustments: {},
      quantity: 1,
      total: 2000,
      totalUSD: 100,
      exchangeRate: 20,
      volumeDiscount: 0,
      clientDiscount: 0,
      maintenance: 0,
      finalPriceUSD: 100,
      subtotal: 2000,
      subtotalUSD: 100,
      clientMultiplier: 1,
      urgencyMultiplier: 1
    },
    id: 'papeleria' as ServiceId,
    category: 'identidad-corporativa' as ServiceCategory,
    complexity: 'simple' as ComplexityLevel,
    urgency: 'estandar' as UrgencyLevel,
    rights: 'pequena' as RightsLevel,
    scope: 'personal' as ScopeLevel,
    expertise: 'senior' as ExpertiseLevel
  }
];

export default function PDFDesignPanel() {
  const { user, loading } = useAuth();
  const [config, setConfig] = useState<PDFDesignConfig>(defaultConfig);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  useEffect(() => {
    if (user) {
      console.log('ID de usuario actual:', user.id);
      loadPDFDesign(user.id)
        .then((savedConfig) => {
          console.log('Diseño cargado:', savedConfig);
          if (savedConfig) {
            const completeConfig: PDFDesignConfig = {
              ...defaultConfig,
              ...savedConfig,
              fontSize: {
                ...defaultConfig.fontSize,
                ...(savedConfig.fontSize || {})
              },
              spacing: {
                ...defaultConfig.spacing,
                ...(savedConfig.spacing || {})
              },
              borders: {
                ...defaultConfig.borders,
                ...(savedConfig.borders || {})
              },
              serviceCard: {
                ...defaultConfig.serviceCard,
                ...(savedConfig.serviceCard || {})
              },
              priceBreakdown: {
                ...defaultConfig.priceBreakdown,
                ...(savedConfig.priceBreakdown || {})
              },
              shadows: {
                ...defaultConfig.shadows,
                ...(savedConfig.shadows || {})
              }
            };
            console.log('Config completa:', completeConfig);
            setConfig(completeConfig);
          }
        })
        .catch((error) => {
          console.error('Error loading PDF design:', error);
          toast.error('Error al cargar el diseño guardado');
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const handleChange = (path: string, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const parts = path.split('.');
      let current: any = newConfig;
      
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      
      current[parts[parts.length - 1]] = value;
      return newConfig;
    });
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      await savePDFDesign(user.id, config);
      toast.success('Diseño guardado correctamente');
    } catch (error) {
      console.error('Error saving PDF design:', error);
      toast.error('Error al guardar el diseño');
    } finally {
      setSaving(false);
    }
  };

  const handlePreviewToggle = () => {
    if (!previewMode) {
      setIsLoadingPreview(true);
      setPreviewMode(true);
      setTimeout(() => {
        setIsLoadingPreview(false);
      }, 100);
    } else {
      setPreviewMode(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Diseño del PDF
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Personaliza el aspecto de tus cotizaciones PDF. Los cambios se verán reflejados en la vista previa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel Izquierdo: Colores y Tipografía */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                🎨 Esquema de Colores
                <span className="text-xs text-gray-500 font-normal">(Define la paleta de colores)</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Color de Fondo de Página
                  </label>
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => handleChange('backgroundColor', e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Color Principal (Títulos y Acentos)
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
                    Color Secundario (Subtítulos)
                  </label>
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) => handleChange('accentColor', e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Color de Texto Principal
                  </label>
                  <input
                    type="color"
                    value={config.textColor}
                    onChange={(e) => handleChange('textColor', e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Color de Fondo de Tarjetas
                  </label>
                  <input
                    type="color"
                    value={config.serviceCard.backgroundColor}
                    onChange={(e) => handleChange('serviceCard.backgroundColor', e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Color de Borde de Tarjetas
                  </label>
                  <input
                    type="color"
                    value={config.serviceCard.borderColor}
                    onChange={(e) => handleChange('serviceCard.borderColor', e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                📝 Tipografía
                <span className="text-xs text-gray-500 font-normal">(Tamaños de texto)</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Tamaño de Títulos
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="16"
                      max="32"
                      value={config.fontSize.title}
                      onChange={(e) => handleChange('fontSize.title', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 w-8">{config.fontSize.title}px</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Tamaño de Texto Normal
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="8"
                      max="14"
                      value={config.fontSize.body}
                      onChange={(e) => handleChange('fontSize.body', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 w-8">{config.fontSize.body}px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Central: Diseño y Espaciado */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                 Diseño y Espaciado
                <span className="text-xs text-gray-500 font-normal">(Ajusta la disposición)</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Espaciado entre Secciones
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="10"
                      max="40"
                      value={config.spacing.section}
                      onChange={(e) => handleChange('spacing.section', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 w-8">{config.spacing.section}px</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Radio de Bordes
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="8"
                      value={config.serviceCard.borderRadius}
                      onChange={(e) => handleChange('serviceCard.borderRadius', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 w-8">{config.serviceCard.borderRadius}px</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Padding de Tarjetas
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="8"
                      max="24"
                      value={config.serviceCard.padding}
                      onChange={(e) => handleChange('serviceCard.padding', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 w-8">{config.serviceCard.padding}px</span>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={config.shadows.enabled}
                      onChange={(e) => handleChange('shadows.enabled', e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Activar Sombras
                  </label>
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Agrega profundidad a las tarjetas y secciones
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                ✏️ Líneas Divisoras
                <span className="text-xs text-gray-500 font-normal">(Separadores)</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Color de Líneas
                  </label>
                  <input
                    type="color"
                    value={config.borders.color}
                    onChange={(e) => handleChange('borders.color', e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Grosor de Líneas
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.5"
                      value={config.borders.width}
                      onChange={(e) => handleChange('borders.width', parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 w-8">{config.borders.width}px</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Estilo de Líneas
                  </label>
                  <select
                    value={config.borders.style}
                    onChange={(e) => handleChange('borders.style', e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="solid">Sólida</option>
                    <option value="dashed">Guiones</option>
                    <option value="dotted">Puntos</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                🖼️ Logo y Encabezado
                <span className="text-xs text-gray-500 font-normal">(Configura la parte superior)</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Posición del Logo
                  </label>
                  <select
                    value={config.logoPosition}
                    onChange={(e) => handleChange('logoPosition', e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="left">Izquierda</option>
                    <option value="center">Centro</option>
                    <option value="right">Derecha</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Derecho: Encabezado, Pie y Vista Previa */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                📄 Encabezado y Pie
                <span className="text-xs text-gray-500 font-normal">(Textos adicionales)</span>
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
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
                    <span className="text-sm text-gray-600">Mostrar Pie de Página</span>
                  </label>
                </div>
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
                      placeholder="Ej: © {year} Todos los derechos reservados"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Usa {'{year}'} para insertar el año actual
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Vista Previa y Guardado</h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handlePreviewToggle}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50
                           text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  {previewMode ? (
                    <>
                      <X className="w-5 h-5" />
                      Cerrar Vista Previa
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Ver Vista Previa
                    </>
                  )}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                           transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Guardar Diseño
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Panel - Se mantiene igual */}
      {previewMode && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h3>
          <div className="border rounded-lg overflow-hidden" style={{ height: '800px' }}>
            {isLoadingPreview ? (
              <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
                <p className="text-gray-600">Generando vista previa...</p>
                <p className="text-sm text-gray-500">Esto puede tomar unos segundos</p>
              </div>
            ) : (
              <CustomQuotePDFPreview
                quoteInfo={sampleQuoteInfo}
                services={sampleServices}
                totalPrice={{ mxn: 7000, usd: 350 }}
                currency="MXN"
                design={config}
                width="100%"
                height="100%"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}