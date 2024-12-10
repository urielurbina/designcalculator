import React, { useState, useEffect, useCallback } from 'react';
import { Palette, Upload, Check, X, Loader2, Settings, Eye, Save, Layout, Type, Image, PaintBucket } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { savePDFDesign, loadPDFDesign } from '../../services/pdfDesignService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { CustomQuotePDFPreview } from './CustomQuotePDF';
import { ServiceId, ServiceCategory, ComplexityLevel, UrgencyLevel, RightsLevel, ScopeLevel, ExpertiseLevel } from '@/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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

interface PDFTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  config: PDFDesignConfig;
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

const pdfTemplates: PDFTemplate[] = [
  {
    id: 'classic-blue',
    name: 'Azul Clásico',
    description: 'Esquema profesional en tonos azules',
    thumbnail: '/templates/classic-blue.png',
    config: {
      ...defaultConfig,
      primaryColor: '#2B4C7E',
      accentColor: '#567EBB',
      backgroundColor: '#FFFFFF',
      textColor: '#1A202C',
      secondaryTextColor: '#4A5568',
      serviceCard: {
        ...defaultConfig.serviceCard,
        backgroundColor: '#F7FAFC',
        borderRadius: 8,
        shadow: true,
        borderColor: '#E2E8F0',
      }
    }
  },
  {
    id: 'modern-purple',
    name: 'Púrpura Moderno',
    description: 'Combinación elegante de púrpuras',
    thumbnail: '/templates/modern-purple.png',
    config: {
      ...defaultConfig,
      primaryColor: '#6B46C1',
      accentColor: '#805AD5',
      backgroundColor: '#FAFAFA',
      textColor: '#2D3748',
      secondaryTextColor: '#4A5568',
      serviceCard: {
        ...defaultConfig.serviceCard,
        backgroundColor: '#F3E8FF',
        borderRadius: 12,
        shadow: true,
        borderColor: '#E9D8FD',
      }
    }
  },
  {
    id: 'forest-green',
    name: 'Verde Bosque',
    description: 'Tonos naturales y equilibrados',
    thumbnail: '/templates/forest-green.png',
    config: {
      ...defaultConfig,
      primaryColor: '#2F855A',
      accentColor: '#48BB78',
      backgroundColor: '#F0FFF4',
      textColor: '#234E52',
      secondaryTextColor: '#2F855A',
      serviceCard: {
        ...defaultConfig.serviceCard,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadow: false,
        borderColor: '#C6F6D5',
      }
    }
  },
  {
    id: 'warm-sunset',
    name: 'Atardecer Cálido',
    description: 'Colores clidos y acogedores',
    thumbnail: '/templates/warm-sunset.png',
    config: {
      ...defaultConfig,
      primaryColor: '#C05621',
      accentColor: '#DD6B20',
      backgroundColor: '#FFFAF0',
      textColor: '#2D3748',
      secondaryTextColor: '#744210',
      serviceCard: {
        ...defaultConfig.serviceCard,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadow: true,
        borderColor: '#FEEBC8',
      }
    }
  },
  {
    id: 'dark-elegance',
    name: 'Elegancia Oscura',
    description: 'Diseño oscuro con acentos claros',
    thumbnail: '/templates/dark-elegance.png',
    config: {
      ...defaultConfig,
      primaryColor: '#A0AEC0',
      accentColor: '#CBD5E0',
      backgroundColor: '#1A202C',
      textColor: '#FFFFFF',
      secondaryTextColor: '#A0AEC0',
      serviceCard: {
        ...defaultConfig.serviceCard,
        backgroundColor: '#2D3748',
        borderRadius: 8,
        shadow: true,
        borderColor: '#4A5568',
      }
    }
  },
  {
    id: 'rose-gold',
    name: 'Rosa Dorado',
    description: 'Combinación moderna de rosa y dorado',
    thumbnail: '/templates/rose-gold.png',
    config: {
      ...defaultConfig,
      primaryColor: '#D53F8C',
      accentColor: '#ED64A6',
      backgroundColor: '#FFF5F7',
      textColor: '#2D3748',
      secondaryTextColor: '#B83280',
      serviceCard: {
        ...defaultConfig.serviceCard,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadow: true,
        borderColor: '#FED7E2',
      }
    }
  },
  {
    id: 'ocean-breeze',
    name: 'Brisa Marina',
    description: 'Refrescantes tonos de azul y turquesa',
    thumbnail: '/templates/ocean-breeze.png',
    config: {
      ...defaultConfig,
      primaryColor: '#0987A0',
      accentColor: '#38B2AC',
      backgroundColor: '#F0FFFF',
      textColor: '#234E52',
      secondaryTextColor: '#086F83',
      serviceCard: {
        ...defaultConfig.serviceCard,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadow: true,
        borderColor: '#B2F5EA',
      }
    }
  },
  {
    id: 'grayscale',
    name: 'Escala de Grises',
    description: 'Diseño monocromático profesional',
    thumbnail: '/templates/grayscale.png',
    config: {
      ...defaultConfig,
      primaryColor: '#1A202C',
      accentColor: '#4A5568',
      backgroundColor: '#FFFFFF',
      textColor: '#2D3748',
      secondaryTextColor: '#718096',
      serviceCard: {
        ...defaultConfig.serviceCard,
        backgroundColor: '#F7FAFC',
        borderRadius: 4,
        shadow: false,
        borderColor: '#E2E8F0',
      }
    }
  },
  {
    id: 'editors-choice',
    name: 'Editor\'s Choice',
    description: 'Diseño minimalista profesional',
    thumbnail: '/templates/editors-choice.png',
    config: {
      borders: {
        color: "#000000",
        style: "solid",
        width: 1
      },
      shadows: {
        blur: 4,
        color: "#000000",
        enabled: false,
        opacity: 0.1
      },
      spacing: {
        page: 50,
        element: 16,
        section: 10
      },
      fontSize: {
        body: 14,
        small: 10,
        title: 16,
        subtitle: 18
      },
      textColor: "#000000",
      fontFamily: "Helvetica",
      footerText: "© {year} Todos los derechos reservados. Uriel Urbina",
      headerText: "",
      showFooter: true,
      showHeader: true,
      accentColor: "#00471b",
      serviceCard: {
        shadow: true,
        padding: 15,
        borderColor: "#ededed",
        borderRadius: 3,
        backgroundColor: "#ededed"
      },
      logoPosition: "right",
      primaryColor: "#000000",
      priceBreakdown: {
        shadow: true,
        padding: 24,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        backgroundColor: "#F3F4F6"
      },
      backgroundColor: "#ffffff",
      secondaryTextColor: "#6B7280",
      secondaryFontFamily: "Arial"
    }
  }
];

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
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('colors');
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    const loadDesign = async () => {
      if (!user?.id) {
        console.log('No hay usuario autenticado');
        return;
      }

      try {
        console.log('Intentando cargar diseño para usuario:', user.id);
        const savedConfig = await loadPDFDesign(user.id);
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
        } else {
          console.log('No se encontró diseño guardado, usando configuración por defecto');
          setConfig(defaultConfig);
        }
      } catch (error) {
        console.error('Error al cargar el diseño:', error);
        toast.error('Error al cargar el diseño guardado');
      }
    };

    loadDesign();
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
    if (!user?.id) {
      toast.error('Debes iniciar sesión para guardar el diseño');
      return;
    }

    setSaving(true);
    try {
      // Validamos que la configuración sea válida
      if (!config) {
        throw new Error('La configuración no es válida');
      }

      console.log('Intentando guardar diseño para usuario:', user.id);
      console.log('Configuración a guardar:', config);
      
      const result = await savePDFDesign(user.id, config);
      
      if (!result) {
        throw new Error('No se pudo confirmar el guardado del diseño');
      }

      console.log('Resultado del guardado:', result);
      toast.success('Diseño guardado correctamente');
    } catch (error) {
      console.error('Error detallado al guardar el diseño:', {
        error,
        userId: user.id,
        configSize: JSON.stringify(config).length
      });
      
      // Manejamos diferentes tipos de errores
      let errorMessage = 'Error al guardar el diseño. Por favor, intenta de nuevo.';
      
      if (error instanceof Error) {
        errorMessage = `Error al guardar el diseño: ${error.message}`;
      } else if (typeof error === 'string') {
        errorMessage = `Error al guardar el diseño: ${error}`;
      }
      
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handlePreviewToggle = () => {
    if (!previewMode) {
      setIsLoadingPreview(true);
      setTimeout(() => {
        setPreviewMode(true);
        requestAnimationFrame(() => {
          setIsLoadingPreview(false);
        });
      }, 100);
    } else {
      setPreviewMode(false);
    }
  };

  const handleTemplateSelect = (template: PDFTemplate) => {
    setConfig(template.config);
    setPreviewMode(true);
    toast.success(`Plantilla "${template.name}" aplicada`);
    
    // Scroll suave hacia la vista previa después de un pequeño delay
    setTimeout(() => {
      const previewElement = document.getElementById('preview-section');
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Plantillas de Diseño
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Elige una plantilla prediseñada o personaliza tu propio diseño
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1 
                     px-3 py-1.5 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            {showAdvancedSettings ? (
              <>
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Ocultar ajustes avanzados</span>
                <span className="sm:hidden">Ocultar ajustes</span>
              </>
            ) : (
              <>
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Mostrar ajustes avanzados</span>
                <span className="sm:hidden">Mostrar ajustes</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {pdfTemplates.map((template) => (
            <div
              key={template.id}
              className="group border rounded-lg overflow-hidden hover:border-indigo-500 transition-all 
                       cursor-pointer bg-white hover:shadow-md"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="relative aspect-[3/2] bg-gray-50">
                {/* Mockup del PDF */}
                <div className="absolute inset-2 sm:inset-3 bg-white rounded-lg shadow-lg 
                              transform group-hover:scale-[1.02] transition-transform duration-200">
                  {/* Header del mockup */}
                  <div className="p-2 border-b" style={{ backgroundColor: template.config.backgroundColor }}>
                    <div className="h-6 w-32 rounded" style={{ backgroundColor: template.config.primaryColor, opacity: 0.2 }} />
                  </div>
                  
                  {/* Content del mockup */}
                  <div className="p-2 space-y-2">
                    {/* Service card mockup */}
                    <div 
                      className="p-1.5 rounded"
                      style={{ 
                        backgroundColor: template.config.serviceCard.backgroundColor,
                        borderRadius: `${template.config.serviceCard.borderRadius}px`,
                        border: `1px solid ${template.config.serviceCard.borderColor}`,
                      }}
                    >
                      <div className="h-3 w-20 rounded" style={{ backgroundColor: template.config.primaryColor, opacity: 0.2 }} />
                      <div className="h-2 w-full mt-1.5 rounded" style={{ backgroundColor: template.config.textColor, opacity: 0.1 }} />
                    </div>
                    
                    {/* Price mockup */}
                    <div className="h-6 w-16 rounded mt-1.5" style={{ backgroundColor: template.config.accentColor, opacity: 0.2 }} />
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">{template.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdvancedSettings && (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          {/* Header del panel */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <Settings className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Ajustes Avanzados
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Personaliza todos los aspectos de tu cotización
              </p>
            </div>
          </div>

          {/* Tabs de navegación - Visible solo en desktop */}
          <div className="hidden sm:flex space-x-4 mb-6 border-b border-gray-200">
            {[
              { id: 'colors', icon: <PaintBucket className="w-4 h-4" />, label: 'Colores' },
              { id: 'typography', icon: <Type className="w-4 h-4" />, label: 'Tipografía' },
              { id: 'layout', icon: <Layout className="w-4 h-4" />, label: 'Diseño' },
              { id: 'header-footer', icon: <Image className="w-4 h-4" />, label: 'Encabezado y Pie' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors
                  ${activeTab === tab.id 
                    ? 'border-indigo-500 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Selector de tabs para móvil */}
          <div className="sm:hidden mb-6">
            <select 
              className="w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none 
                         focus:ring-indigo-500 focus:border-indigo-500"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="colors">🎨 Colores</option>
              <option value="typography">📝 Tipografía</option>
              <option value="layout">📐 Diseño</option>
              <option value="header-footer">🖼️ Encabezado y Pie</option>
            </select>
          </div>

          {/* Contenedor principal de los paneles */}
          <div className="space-y-6">
            {/* Panel de Colores */}
            <div className={activeTab === 'colors' ? 'block' : 'hidden'}>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                  <PaintBucket className="w-4 h-4" />
                  Esquema de Colores
                </h3>
                {/* Contenido del panel de colores */}
                <div className="space-y-4">
                  {/* Color Groups */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wider">Colores Principales</h4>
                    <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Color Principal
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={config.primaryColor}
                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                            className="h-10 w-14 sm:w-20 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.primaryColor}
                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                            className="flex-1 h-10 rounded-lg border border-gray-300 px-2 sm:px-3 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Color de Acento
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={config.accentColor}
                            onChange={(e) => handleChange('accentColor', e.target.value)}
                            className="h-10 w-14 sm:w-20 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.accentColor}
                            onChange={(e) => handleChange('accentColor', e.target.value)}
                            className="flex-1 h-10 rounded-lg border border-gray-300 px-2 sm:px-3 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wider">Colores de Texto</h4>
                    <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Texto Principal
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={config.textColor}
                            onChange={(e) => handleChange('textColor', e.target.value)}
                            className="h-10 w-14 sm:w-20 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.textColor}
                            onChange={(e) => handleChange('textColor', e.target.value)}
                            className="flex-1 h-10 rounded-lg border border-gray-300 px-2 sm:px-3 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Texto Secundario
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={config.secondaryTextColor}
                            onChange={(e) => handleChange('secondaryTextColor', e.target.value)}
                            className="h-10 w-14 sm:w-20 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.secondaryTextColor}
                            onChange={(e) => handleChange('secondaryTextColor', e.target.value)}
                            className="flex-1 h-10 rounded-lg border border-gray-300 px-2 sm:px-3 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wider">Colores de Fondo</h4>
                    <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Fondo Principal
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={config.backgroundColor}
                            onChange={(e) => handleChange('backgroundColor', e.target.value)}
                            className="h-10 w-14 sm:w-20 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.backgroundColor}
                            onChange={(e) => handleChange('backgroundColor', e.target.value)}
                            className="flex-1 h-10 rounded-lg border border-gray-300 px-2 sm:px-3 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Fondo de Tarjetas
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={config.serviceCard.backgroundColor}
                            onChange={(e) => handleChange('serviceCard.backgroundColor', e.target.value)}
                            className="h-10 w-14 sm:w-20 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.serviceCard.backgroundColor}
                            onChange={(e) => handleChange('serviceCard.backgroundColor', e.target.value)}
                            className="flex-1 h-10 rounded-lg border border-gray-300 px-2 sm:px-3 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Color Presets */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wider">Combinaciones Predefinidas</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { name: 'Monocromático', colors: ['#000000', '#404040', '#808080', '#ffffff'] },
                        { name: 'Profesional', colors: ['#1a365d', '#2b6cb0', '#ebf8ff', '#ffffff'] },
                        { name: 'Creativo', colors: ['#744210', '#f6ad55', '#fffaf0', '#ffffff'] },
                        { name: 'Moderno', colors: ['#1a202c', '#4a5568', '#f7fafc', '#ffffff'] },
                      ].map((preset, index) => (
                        <button
                          key={index}
                          className="p-2 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
                          onClick={() => {
                            handleChange('primaryColor', preset.colors[0]);
                            handleChange('accentColor', preset.colors[1]);
                            handleChange('backgroundColor', preset.colors[2]);
                            handleChange('serviceCard.backgroundColor', preset.colors[3]);
                          }}
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                              {preset.colors.map((color, i) => (
                                <div
                                  key={i}
                                  className="w-6 h-6 rounded-full border border-gray-200"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">{preset.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel de Tipografía */}
            <div className={activeTab === 'typography' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                {/* Tamaños de Fuente */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Tipografía
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

                {/* Fuentes */}
                {/* <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Fuentes
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Fuente Principal
                      </label>
                      <input
                        type="text"
                        value={config.fontFamily}
                        onChange={(e) => handleChange('fontFamily', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Ej: Helvetica"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Fuente Secundaria
                      </label>
                      <input
                        type="text"
                        value={config.secondaryFontFamily}
                        onChange={(e) => handleChange('secondaryFontFamily', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Ej: Arial"
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Panel de Diseño */}
            <div className={activeTab === 'layout' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                {/* Diseño y Espaciado */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    Diseño y Espaciado
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

                {/* Líneas Divisoras */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                    ✏️ Líneas Divisoras
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
              </div>
            </div>

            {/* Panel de Encabezado y Pie */}
            <div className={activeTab === 'header-footer' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                {/* Logo y Encabezado */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                    🖼️ Logo y Encabezado
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

                {/* Encabezado y Pie */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                    📄 Encabezado y Pie
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button
          onClick={handlePreviewToggle}
          className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg 
                   hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
        >
          {previewMode ? (
            <>
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">Cerrar Vista Previa</span>
              <span className="sm:hidden">Cerrar</span>
            </>
          ) : (
            <>
              <Eye className="w-5 h-5" />
              <span className="hidden sm:inline">Ver Vista Previa</span>
              <span className="sm:hidden">Vista Previa</span>
            </>
          )}
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg 
                   hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span className="hidden sm:inline">Guardar Diseño</span>
              <span className="sm:hidden">Guardar</span>
            </>
          )}
        </button>
      </div>

      {/* Preview Panel */}
      {previewMode && (
        <div id="preview-section" className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h3>
          <div className="border rounded-lg overflow-hidden" style={{ height: isMobile ? '400px' : '800px' }}>
            {isLoadingPreview ? (
              <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
                <p className="text-gray-600">Generando vista previa...</p>
                <p className="text-sm text-gray-500">Esto puede tomar unos segundos</p>
              </div>
            ) : (
              <div style={{ width: '100%', height: '100%' }} key={Date.now()}>
                <CustomQuotePDFPreview
                  quoteInfo={sampleQuoteInfo}
                  services={sampleServices}
                  totalPrice={{ mxn: 7000, usd: 350 }}
                  currency="MXN"
                  design={config}
                  width="100%"
                  height="100%"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
