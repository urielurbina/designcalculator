import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Quote } from '../../types/quote';

interface QuoteFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: Quote['status'] | 'all';
  onStatusFilterChange: (value: Quote['status'] | 'all') => void;
}

export default function QuoteFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange
}: QuoteFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar cotizaciones..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as Quote['status'] | 'all')}
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
  );
}