import React from 'react';
import { Download, Edit2, Trash2 } from 'lucide-react';
import { Quote } from '../../types/quote';

interface QuoteListProps {
  quotes: Quote[];
  onPreview: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function QuoteList({ quotes, onPreview, onEdit, onDelete }: QuoteListProps) {
  const renderQuoteActions = (quote: Quote) => (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => onPreview(quote.id)}
        className="text-indigo-600 hover:text-indigo-900"
        title="Descargar PDF"
      >
        <Download className="w-5 h-5" />
      </button>
      <button
        onClick={() => onEdit(quote.id)}
        className="text-gray-600 hover:text-gray-900"
        title="Editar"
      >
        <Edit2 className="w-5 h-5" />
      </button>
      <button
        onClick={() => quote.id && onDelete(quote.id)}
        className="text-red-600 hover:text-red-900"
        title="Eliminar"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );

  return (
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
          {quotes.map((quote) => (
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

      {quotes.length === 0 && (
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
  );
}