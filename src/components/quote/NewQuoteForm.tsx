import React from 'react';
import { ArrowLeft } from 'lucide-react';
import QuoteCalculator from './QuoteCalculator';

interface NewQuoteFormProps {
  onClose: () => void;
}

export default function NewQuoteForm({ onClose }: NewQuoteFormProps) {
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

        <QuoteCalculator
          freelancerData={{
            name: '',
            website: '',
            email: '',
            phone: '',
            logoUrl: ''
          }}
          clientData={{
            name: '',
            company: '',
            email: '',
            phone: ''
          }}
          onFinish={onClose}
        />
      </div>
    </div>
  );
}