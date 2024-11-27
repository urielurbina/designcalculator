import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Building2 } from 'lucide-react';
import QuoteCalculator from './QuoteCalculator';
import { getClients } from '../../services/clientService';
import { getFreelancerProfile } from '../../services/freelancerService';
import type { ClientData } from '../../services/clientService';
import type { FreelancerData } from '../../services/freelancerService';

interface NewQuoteFormProps {
  onClose: () => void;
}

export default function NewQuoteForm({ onClose }: NewQuoteFormProps) {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [freelancerData, setFreelancerData] = useState<FreelancerData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [clientsData, freelancerProfile] = await Promise.all([
          getClients(),
          getFreelancerProfile()
        ]);
        setClients(clientsData);
        setFreelancerData(freelancerProfile);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!selectedClient) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Seleccionar Cliente
              </h2>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Cargando clientes...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className="text-left p-4 border border-gray-200 rounded-lg hover:border-indigo-500 
                             hover:shadow-sm transition-all"
                  >
                    <h3 className="font-medium text-gray-900">{client.name}</h3>
                    {client.company && (
                      <p className="text-sm text-gray-600">{client.company}</p>
                    )}
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </button>
                ))}

                {filteredClients.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-sm font-medium text-gray-900">
                      No se encontraron clientes
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Agrega un nuevo cliente desde el panel de clientes.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!freelancerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => setSelectedClient(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Cambiar Cliente
          </button>
          <div className="text-sm text-gray-600">
            Cliente: <span className="font-medium">{selectedClient.name}</span>
            {selectedClient.company && (
              <span className="text-gray-400"> • {selectedClient.company}</span>
            )}
          </div>
        </div>

        <QuoteCalculator
          freelancerData={{
            name: freelancerData.name,
            website: freelancerData.website || '',
            email: freelancerData.email,
            phone: freelancerData.phone || '',
            logoUrl: freelancerData.logo_url || ''
          }}
          clientData={{
            id: selectedClient.id || '',
            name: selectedClient.name,
            company: selectedClient.company || '',
            email: selectedClient.email,
            phone: selectedClient.phone || ''
          }}
          onFinish={onClose}
        />
      </div>
    </div>
  );
}