import React, { useState, useEffect } from 'react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plus, Loader2, Download, Edit2, Trash2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Components
import Navigation from '../components/quote/Navigation';
import QuoteList from '../components/quote/QuoteList';
import QuoteFilters from '../components/quote/QuoteFilters';
import SubscriptionBanner from '../components/subscription/SubscriptionBanner';
import SubscriptionManager from '../components/subscription/SubscriptionManager';
import FreelancerForm from '../components/quote/FreelancerForm';
import ClientsPanel from '../components/quote/ClientsPanel';
import PDFDesignPanel from '../components/quote/PDFDesignPanel';
import ServicesPanel from '../components/quote/ServicesPanel';
import NewQuoteForm from '../components/quote/NewQuoteForm';
import EditQuoteForm from '../components/quote/EditQuoteForm';
import { CustomQuotePDFPreview } from '../components/quote/CustomQuotePDF';

// Services
import { getQuotes, deleteQuote, getQuoteById } from '../services/quoteService';
import { loadPDFDesign } from '../services/pdfDesignService';

// Types
import { ActivePanel, Quote } from '../types/quote';

export default function Cotizar() {
  const { subscription, loading: subscriptionLoading } = useSubscription();
  const { user, signOut } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // States
  const [activePanel, setActivePanel] = useState<ActivePanel>(
    (searchParams.get('panel') as ActivePanel) || 'quotes'
  );
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

  // Load quotes when panel changes
  useEffect(() => {
    if (activePanel === 'quotes') {
      loadQuotes();
    }
  }, [activePanel]);

  // Handle panel change
  const handlePanelChange = (panel: ActivePanel) => {
    setActivePanel(panel);
    setSearchParams({ panel });
  };

  // Load quotes
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

  // Filter quotes
  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.quote_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle quote actions
  const handleDeleteQuote = async (id: string) => {
    if (!subscription.isActive) {
      navigate('/pricing');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar esta cotización?')) {
      try {
        await deleteQuote(id);
        await loadQuotes();
        toast.success('Cotización eliminada correctamente');
      } catch (err) {
        console.error('Error deleting quote:', err);
        toast.error('Error al eliminar la cotización');
      }
    }
  };

  const handlePreviewQuote = async (id: string) => {
    try {
      console.log('Iniciando preview de PDF para quote:', id);
      setLoadingPreview(true);
      setPreviewingQuoteId(id);

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
          // ... resto de la configuración por defecto
        };
      }
      setPdfDesign(design);

      // Cargar los datos de la cotización
      console.log('Cargando datos de la cotización...');
      const quoteData = await getQuoteById(id);
      console.log('Datos de cotización recibidos:', quoteData);

      if (!quoteData) {
        throw new Error('No se encontró la cotización');
      }

      setPreviewQuoteData(quoteData);
    } catch (error) {
      console.error('Error detallado al cargar vista previa:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(`Error al cargar la vista previa del PDF: ${errorMessage}`);
      setPreviewingQuoteId(null);
      setPdfDesign(null);
      setPreviewQuoteData(null);
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleEditQuote = (id: string) => {
    if (!subscription.isActive) {
      navigate('/pricing');
      return;
    }
    setEditingQuoteId(id);
  };

  // Render different states
  if (isCreating) {
    return (
      <NewQuoteForm 
        onClose={() => {
          setIsCreating(false);
          loadQuotes();
        }} 
      />
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

  return (
    <div className="min-h-screen bg-gray-50">
      {!subscriptionLoading && <SubscriptionBanner subscription={subscription} />}
      
      <Navigation 
        activePanel={activePanel}
        onPanelChange={handlePanelChange}
        onSignOut={signOut}
      />

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
                onClick={() => subscription.isActive ? setIsCreating(true) : navigate('/pricing')}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 
                         rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nueva Cotización
              </button>
            </div>

            {/* Filters */}
            <QuoteFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />

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
              <QuoteList
                quotes={filteredQuotes}
                onPreview={handlePreviewQuote}
                onEdit={handleEditQuote}
                onDelete={handleDeleteQuote}
              />
            )}
          </div>
        )}

        {activePanel === 'freelancer' && (
          <>
            {subscription.isActive && subscription.planType === 'monthly' && (
              <SubscriptionManager
                planType={subscription.planType}
                currentPeriodEnd={subscription.currentPeriodEnd}
                cancelAtPeriodEnd={subscription.cancelAtPeriodEnd}
              />
            )}
            <FreelancerForm />
          </>
        )}
        
        {activePanel === 'clients' && <ClientsPanel />}
        {activePanel === 'pdf-design' && <PDFDesignPanel />}
        {activePanel === 'services' && <ServicesPanel />}
      </main>
      {renderPDFPreviewModal()}
    </div>
  );
}