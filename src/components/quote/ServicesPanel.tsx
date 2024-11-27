import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { baseRates, serviceOptions } from '../../data/pricing';
import { ServiceCategory } from '../../types';

export default function ServicesPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const categories = Object.keys(baseRates) as ServiceCategory[];

  const filteredCategories = categories.filter(category => {
    const categoryLabel = serviceOptions[category]?.[0]?.label || category;
    const services = serviceOptions[category] || [];
    
    const matchesSearch = 
      categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      services.some(service => 
        service.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar servicios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Services List */}
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {filteredCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category);
          const services = serviceOptions[category] || [];
          const rates = baseRates[category] || {};

          return (
            <div key={category} className="overflow-hidden">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {services[0]?.label.split(' ')[0] || category}
                </h3>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {isExpanded && (
                <div className="px-6 pb-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Servicio
                        </th>
                        <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio Base
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {services.map((service) => (
                        <tr key={service.value} className="hover:bg-gray-50">
                          <td className="py-2 text-sm text-gray-900">
                            {service.label}
                          </td>
                          <td className="py-2 text-sm text-gray-900 text-right">
                            ${rates[service.value]?.toLocaleString() || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No se encontraron servicios
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Intenta con otros términos de búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}