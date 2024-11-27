import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  LogOut, 
  Plus, 
  Search, 
  Filter,
  FileText,
  MoreVertical,
  Edit2,
  Trash2,
  Download
} from 'lucide-react';

interface Quote {
  id: string;
  clientName: string;
  total: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

const mockQuotes: Quote[] = [
  {
    id: 'QT-001',
    clientName: 'Empresa ABC',
    total: 25000,
    status: 'pending',
    date: '2024-03-20'
  },
  {
    id: 'QT-002',
    clientName: 'Startup XYZ',
    total: 15000,
    status: 'approved',
    date: '2024-03-19'
  },
  {
    id: 'QT-003',
    clientName: 'Consultora 123',
    total: 35000,
    status: 'rejected',
    date: '2024-03-18'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const statusLabels = {
  pending: 'Pendiente',
  approved: 'Aprobada',
  rejected: 'Rechazada'
};

export default function Cotizar() {
  const { user, signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredQuotes = mockQuotes.filter(quote => {
    const matchesSearch = quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || quote.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleActionClick = (quoteId: string, action: 'edit' | 'delete' | 'download') => {
    setActiveDropdown(null);
    // Implementar acciones
    console.log(`${action} quote ${quoteId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Panel de Cotización</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <button
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg 
                     hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nueva Cotización
          </button>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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

            <div className="relative">
              <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none
                         bg-white w-full sm:w-48 focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="approved">Aprobadas</option>
                <option value="rejected">Rechazadas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quotes List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="min-w-full divide-y divide-gray-200">
            <div className="bg-gray-50">
              <div className="grid grid-cols-[1fr,2fr,1fr,1fr,auto] gap-4 px-6 py-3">
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</div>
              </div>
            </div>
            <div className="bg-white divide-y divide-gray-200">
              {filteredQuotes.map((quote) => (
                <div key={quote.id} className="grid grid-cols-[1fr,2fr,1fr,1fr,auto] gap-4 px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{quote.id}</span>
                  </div>
                  <div className="text-sm text-gray-900">{quote.clientName}</div>
                  <div className="text-sm text-gray-900">${quote.total.toLocaleString()}</div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                   ${statusColors[quote.status]}`}>
                      {statusLabels[quote.status]}
                    </span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === quote.id ? null : quote.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                    
                    {activeDropdown === quote.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black 
                                    ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleActionClick(quote.id, 'edit')}
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                                     hover:text-gray-900 w-full"
                          >
                            <Edit2 className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleActionClick(quote.id, 'download')}
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                                     hover:text-gray-900 w-full"
                          >
                            <Download className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                            Descargar PDF
                          </button>
                          <button
                            onClick={() => handleActionClick(quote.id, 'delete')}
                            className="group flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 
                                     hover:text-red-700 w-full"
                          >
                            <Trash2 className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {filteredQuotes.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay cotizaciones</h3>
              <p className="mt-1 text-sm text-gray-500">
                Comienza creando una nueva cotización.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}