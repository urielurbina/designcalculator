import React, { useState } from 'react';
import { 
  LogOut, 
  Plus, 
  Search, 
  Filter,
  FileText,
  MoreVertical,
  Edit2,
  Trash2,
  Download,
  Settings,
  Users,
  Palette,
  List
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NewQuoteForm from '../components/quote/NewQuoteForm';
import FreelancerForm from '../components/quote/FreelancerForm';
import ClientsPanel from '../components/quote/ClientsPanel';
import PDFDesignPanel from '../components/quote/PDFDesignPanel';
import ServicesPanel from '../components/quote/ServicesPanel';

type ActivePanel = 'quotes' | 'freelancer' | 'clients' | 'pdf-design' | 'services';

interface Quote {
  id: string;
  date: string;
  clientName: string;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
}

const mockQuotes: Quote[] = [
  {
    id: '1',
    date: '2024-03-15',
    clientName: 'Juan Pérez',
    total: 15000,
    status: 'sent'
  },
  {
    id: '2',
    date: '2024-03-14',
    clientName: 'María García',
    total: 25000,
    status: 'accepted'
  }
];

export default function Cotizar() {
  const { user, signOut } = useAuth();
  const [activePanel, setActivePanel] = useState<ActivePanel>('quotes');
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Quote['status'] | 'all'>('all');
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [freelancerData, setFreelancerData] = useState({
    name: '',
    website: '',
    email: '',
    phone: '',
    logoUrl: ''
  });

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteQuote = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta cotización?')) {
      setQuotes(quotes.filter(quote => quote.id !== id));
    }
  };

  const renderPanel = () => {
    if (isCreating) {
      return <NewQuoteForm onClose={() => setIsCreating(false)} />;
    }

    switch (activePanel) {
      case 'freelancer':
        return (
          <div className="max-w-3xl mx-auto">
            <FreelancerForm
              data={freelancerData}
              onChange={setFreelancerData}
            />
          </div>
        );
      case 'clients':
        return <ClientsPanel />;
      case 'pdf-design':
        return <PDFDesignPanel />;
      case 'services':
        return <ServicesPanel />;
      default:
        return (
          <div className="space-y-6">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => setIsCreating(true)}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 
                         rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nueva Cotización
              </button>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar cotizaciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64
                             focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Quote['status'] | 'all')}
                  className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg
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
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
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
                        <div className="text-sm text-gray-900">
                          {new Date(quote.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {quote.clientName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${quote.total.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${quote.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
                          ${quote.status === 'sent' ? 'bg-blue-100 text-blue-800' : ''}
                          ${quote.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                          ${quote.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}`}
                        >
                          {quote.status === 'accepted' && 'Aceptada'}
                          {quote.status === 'sent' && 'Enviada'}
                          {quote.status === 'rejected' && 'Rechazada'}
                          {quote.status === 'draft' && 'Borrador'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {/* Handle edit */}}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {/* Handle download */}}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuote(quote.id)}
                            className="text-red-600 hover:text-red-900"
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
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-xl font-semibold text-gray-900">Panel de Cotización</h1>
            
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => setActivePanel('quotes')}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activePanel === 'quotes' 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="hidden sm:inline">Cotizaciones</span>
                </button>
                <button
                  onClick={() => setActivePanel('freelancer')}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activePanel === 'freelancer'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="hidden sm:inline">Mi Información</span>
                </button>
                <button
                  onClick={() => setActivePanel('clients')}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activePanel === 'clients'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span className="hidden sm:inline">Clientes</span>
                </button>
                <button
                  onClick={() => setActivePanel('services')}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activePanel === 'services'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                  <span className="hidden sm:inline">Mis Servicios</span>
                </button>
                <button
                  onClick={() => setActivePanel('pdf-design')}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activePanel === 'pdf-design'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Palette className="w-5 h-5" />
                  <span className="hidden sm:inline">Diseño PDF</span>
                </button>
              </nav>

              <div className="flex items-center gap-4 border-l pl-4">
                <span className="text-sm text-gray-600">{user?.email}</span>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPanel()}
      </main>
    </div>
  );
}