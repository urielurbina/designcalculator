import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Plus, 
  Search, 
  Filter,
  FileText,
  Edit2,
  Trash2,
  Download,
  Settings,
  Users,
  Palette,
  List,
  Loader2,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NewQuoteForm from '../components/quote/NewQuoteForm';
import EditQuoteForm from '../components/quote/EditQuoteForm';
import FreelancerForm from '../components/quote/FreelancerForm';
import ClientsPanel from '../components/quote/ClientsPanel';
import PDFDesignPanel from '../components/quote/PDFDesignPanel';
import ServicesPanel from '../components/quote/ServicesPanel';
import { getQuotes, deleteQuote } from '../services/quoteService';
import { CustomQuotePDFPreview } from '../components/quote/CustomQuotePDF';
import { loadPDFDesign } from '../services/pdfDesignService';
import { getQuoteById } from '../services/quoteService';
import { toast } from 'react-hot-toast';
import { useSearchParams, useNavigate } from 'react-router-dom';

type ActivePanel = 'quotes' | 'freelancer' | 'clients' | 'pdf-design' | 'services';

interface Quote {
  id: string;
  quote_number: string;
  created_at: string;
  client: {
    name: string;
    company?: string;
  };
  total_amount: number;
  currency: 'MXN' | 'USD';
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
}

interface QuoteService {
  name?: string;
  description?: string;
  finalPrice?: number;
  finalPriceUSD?: number;
  quantity?: number;
  basePrice?: number;
  breakdown?: Record<string, any>;
  id?: string;
  category?: string;
  complexity?: string;
  urgency?: string;
  rights?: string;
  scope?: string;
  expertise?: string;
}

export default function Cotizar() {
  const { user, signOut } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const activePanel: ActivePanel = (searchParams.get('panel') as ActivePanel) || 'quotes';

  const handlePanelChange = (panel: ActivePanel) => {
    setSearchParams({ panel });
  };

  const [isCreating, setIsCreating] = useState(false);
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Quote['status'] | 'all'>('all');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewingQuoteId, setPreviewingQuoteId] = useState<string | null>(null);
  const [pdfDesign, setPdfDesign] = useState<any>(null);
  const [previewQuoteData, setPreviewQuoteData] = useState<any>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  useEffect(() => {
    if (activePanel === 'quotes') {
      loadQuotes();
    }
  }, [activePanel]);

  async function loadQuotes() {
    try {
      setLoading(true);
      const data = await getQuotes();
      setQuotes(data);
    } catch (err) {
      console.error('Error loading quotes:', err);
      setError('Error al cargar las cotizaciones');
    } finally {
      setLoading(false);
    }
  }

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.quote_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteQuote = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta cotización?')) {
      try {
        await deleteQuote(id);
        await loadQuotes();
      } catch (err) {
        console.error('Error deleting quote:', err);
        setError('Error al eliminar la cotización');
      }
    }
  };

  const handlePreviewPDF = async (quoteId: string) => {
    try {
      console.log('Iniciando preview de PDF para quote:', quoteId);
      setLoadingPreview(true);
      setPreviewingQuoteId(quoteId);

      // Cargar el diseño del PDF
      let design;
      try {
        console.log('Cargando diseño del PDF...');
        design = await loadPDFDesign(user?.id || '');
        console.log('Diseño cargado:', design);
      } catch (error) {
        console.log('No se encontró un diseño guardado, usando diseño por defecto');
        design = {
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
      }
      setPdfDesign(design);

      // Cargar los datos de la cotización
      console.log('Cargando datos de la cotización...');
      const quoteData = await getQuoteById(quoteId);
      console.log('Datos de cotización recibidos:', quoteData);

      if (!quoteData) {
        console.error('No se encontraron datos de la cotización');
        throw new Error('No se encontró la cotización');
      }

      if (!quoteData.services || !Array.isArray(quoteData.services)) {
        console.error('Los servicios no están en el formato esperado:', quoteData.services);
        throw new Error('Formato de servicios inválido');
      }

      // Transformar los servicios al formato esperado
      console.log('Transformando servicios...');
      const transformedServices = quoteData.services.map((serviceData: QuoteService) => {
        console.log(`Transformando servicio:`, serviceData);
        return {
          name: serviceData.name || 'Servicio sin nombre',
          description: serviceData.description || '',
          finalPrice: serviceData.finalPrice || 0,
          finalPriceUSD: serviceData.finalPriceUSD || 0,
          quantity: serviceData.quantity || 1,
          basePrice: serviceData.basePrice || 0,
          breakdown: serviceData.breakdown || {},
          id: serviceData.id || '',
          category: serviceData.category || '',
          complexity: serviceData.complexity || 'simple',
          urgency: serviceData.urgency || 'normal',
          rights: serviceData.rights || 'basic',
          scope: serviceData.scope || 'small',
          expertise: serviceData.expertise || 'junior'
        };
      });

      console.log('Servicios transformados:', transformedServices);

      // Verificar datos del freelancer y cliente
      if (!quoteData.freelancer) {
        console.error('Datos de freelancer faltantes');
      }
      if (!quoteData.client) {
        console.error('Datos de cliente faltantes');
      }

      const transformedData = {
        ...quoteData,
        services: transformedServices,
        freelancer: {
          name: quoteData.freelancer?.name || 'Nombre no disponible',
          email: quoteData.freelancer?.email || 'Email no disponible',
          phone: quoteData.freelancer?.phone || 'Teléfono no disponible',
          website: quoteData.freelancer?.website || '',
          logo_url: quoteData.freelancer?.logo_url || ''
        },
        client: {
          name: quoteData.client?.name || 'Cliente no disponible',
          company: quoteData.client?.company || '',
          email: quoteData.client?.email || '',
          phone: quoteData.client?.phone || ''
        },
        valid_until: quoteData.valid_until || new Date(Date.now() + 30*24*60*60*1000).toISOString()
      };

      console.log('Datos finales transformados:', transformedData);
      
      // Verificar que todos los datos necesarios estén presentes
      const requiredFields = [
        'quote_number',
        'created_at',
        'total_amount',
        'currency'
      ];
      
      const missingFields = requiredFields.filter(field => !transformedData[field]);
      if (missingFields.length > 0) {
        console.error('Campos requeridos faltantes:', missingFields);
        throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
      }

      setPreviewQuoteData(transformedData);
    } catch (error: unknown) {
      console.error('Error detallado al cargar vista previa:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(`Error al cargar la vista previa del PDF: ${errorMessage}`);
      // Limpiar estados en caso de error
      setPreviewingQuoteId(null);
      setPdfDesign(null);
      setPreviewQuoteData(null);
    } finally {
      setLoadingPreview(false);
    }
  };

  const renderQuoteActions = (quote: Quote) => (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => handlePreviewPDF(quote.id)}
        className="text-indigo-600 hover:text-indigo-900"
        title="Descargar PDF"
      >
        <Download className="w-5 h-5" />
      </button>
      <button
        onClick={() => setEditingQuoteId(quote.id)}
        className="text-gray-600 hover:text-gray-900"
        title="Editar"
      >
        <Edit2 className="w-5 h-5" />
      </button>
      <button
        onClick={() => quote.id && handleDeleteQuote(quote.id)}
        className="text-red-600 hover:text-red-900"
        title="Eliminar"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );

  const renderPDFPreviewModal = () => {
    if (!previewingQuoteId || !pdfDesign || !previewQuoteData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Vista Previa de Cotización
            </h3>
            <button
              onClick={() => {
                setPreviewingQuoteId(null);
                setPdfDesign(null);
                setPreviewQuoteData(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            {loadingPreview ? (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
                <p className="text-gray-600">Cargando vista previa...</p>
              </div>
            ) : (
              <CustomQuotePDFPreview
                quoteInfo={{
                  quoteNumber: previewQuoteData.quote_number,
                  quoteDate: new Date(previewQuoteData.created_at).toLocaleDateString(),
                  validUntil: new Date(previewQuoteData.valid_until).toLocaleDateString(),
                  designerName: previewQuoteData.freelancer.name,
                  designerEmail: previewQuoteData.freelancer.email,
                  designerPhone: previewQuoteData.freelancer.phone,
                  designerWebsite: previewQuoteData.freelancer.website,
                  designerLogo: previewQuoteData.freelancer.logo_url,
                  clientName: previewQuoteData.client.name,
                  clientCompany: previewQuoteData.client.company,
                  clientEmail: previewQuoteData.client.email,
                  clientPhone: previewQuoteData.client.phone,
                  notes: previewQuoteData.notes || ''
                }}
                services={previewQuoteData.services}
                totalPrice={{
                  mxn: previewQuoteData.total_amount,
                  usd: previewQuoteData.total_amount_usd
                }}
                currency={previewQuoteData.currency}
                design={pdfDesign}
                width="100%"
                height="100%"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isCreating) {
    return (
      <NewQuoteForm onClose={() => {
        setIsCreating(false);
        loadQuotes();
      }} />
    );
  }

  if (editingQuoteId) {
    return (
      <EditQuoteForm 
        quoteId={editingQuoteId}
        onClose={() => {
          setEditingQuoteId(null);
          loadQuotes();
        }}
      />
    );
  }

  // Rest of the component remains unchanged...
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-semibold text-gray-900">
                Panel de Control
              </h1>
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => handlePanelChange('quotes')}
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
                  onClick={() => handlePanelChange('freelancer')}
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
                  onClick={() => handlePanelChange('clients')}
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
                  onClick={() => handlePanelChange('pdf-design')}
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
                  onClick={() => handlePanelChange('services')}
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
              onClick={() => signOut()}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activePanel === 'quotes' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Mis Cotizaciones
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Gestiona tus cotizaciones y propuestas
                </p>
              </div>
              <button
                onClick={() => setIsCreating(true)}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 
                         rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nueva Cotización
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar cotizaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Quote['status'] | 'all')}
                  className="border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">Todos los estados</option>
                  <option value="draft">Borrador</option>
                  <option value="sent">Enviada</option>
                  <option value="accepted">Aceptada</option>
                  <option value="rejected">Rechazada</option>
                </select>
              </div>
            </div>

            {/* Quotes List */}
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                <p className="mt-2 text-sm text-gray-600">Cargando cotizaciones...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Número
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredQuotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {quote.quote_number}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {quote.client.name}
                          </div>
                          {quote.client.company && (
                            <div className="text-sm text-gray-500">
                              {quote.client.company}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(quote.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${quote.total_amount.toLocaleString()} {quote.currency}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${quote.status === 'draft' && 'bg-gray-100 text-gray-800'}
                            ${quote.status === 'sent' && 'bg-blue-100 text-blue-800'}
                            ${quote.status === 'accepted' && 'bg-green-100 text-green-800'}
                            ${quote.status === 'rejected' && 'bg-red-100 text-red-800'}
                          `}>
                            {quote.status === 'draft' && 'Borrador'}
                            {quote.status === 'sent' && 'Enviada'}
                            {quote.status === 'accepted' && 'Aceptada'}
                            {quote.status === 'rejected' && 'Rechazada'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {renderQuoteActions(quote)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredQuotes.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No hay cotizaciones
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Comienza creando una nueva cotización.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activePanel === 'freelancer' && <FreelancerForm />}
        {activePanel === 'clients' && <ClientsPanel />}
        {activePanel === 'pdf-design' && <PDFDesignPanel />}
        {activePanel === 'services' && <ServicesPanel />}
      </main>

      {renderPDFPreviewModal()}
    </div>
  );
}