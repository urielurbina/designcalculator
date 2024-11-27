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
  Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NewQuoteForm from '../components/quote/NewQuoteForm';
import EditQuoteForm from '../components/quote/EditQuoteForm';
import FreelancerForm from '../components/quote/FreelancerForm';
import ClientsPanel from '../components/quote/ClientsPanel';
import PDFDesignPanel from '../components/quote/PDFDesignPanel';
import ServicesPanel from '../components/quote/ServicesPanel';
import { getQuotes, deleteQuote } from '../services/quoteService';

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

export default function Cotizar() {
  const { user, signOut } = useAuth();
  const [activePanel, setActivePanel] = useState<ActivePanel>('quotes');
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Quote['status'] | 'all'>('all');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                  onClick={() => setActivePanel('quotes')}
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
                  onClick={() => setActivePanel('freelancer')}
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
                  onClick={() => setActivePanel('clients')}
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
                  onClick={() => setActivePanel('pdf-design')}
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
                  onClick={() => setActivePanel('services')}
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
                          <div className="flex justify-end gap-2">
                            <button
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
    </div>
  );
}