import React, { useState, useEffect } from 'react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
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
    if (!subscription.isActive) {
      navigate('/pricing');
      return;
    }

    try {
      const quoteData = await getQuoteById(id);
      // Implementar lógica de vista previa
    } catch (error) {
      console.error('Error loading quote:', error);
      toast.error('Error al cargar la cotización');
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
    </div>
  );
}