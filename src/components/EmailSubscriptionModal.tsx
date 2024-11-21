import React, { useState } from 'react';
import { Mail, X, Loader2, AlertCircle } from 'lucide-react';
import { subscribeEmail } from '../lib/supabase';

interface EmailSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function EmailSubscriptionModal({ 
  isOpen, 
  onClose,
  onSubscribe 
}: EmailSubscriptionModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.name.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await subscribeEmail(formData);
      setSuccess(true);
      // Esperar un momento antes de cerrar para mostrar el mensaje de éxito
      setTimeout(() => {
        onSubscribe();
      }, 1500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message === 'Este email ya está suscrito' 
          ? 'Este email ya está suscrito. Puedes continuar.'
          : 'Error al suscribirse. Por favor intenta de nuevo.');
        
        // Si el email ya está suscrito, permitir continuar
        if (err.message === 'Este email ya está suscrito') {
          setTimeout(() => {
            onSubscribe();
          }, 1500);
        }
      } else {
        setError('Error al suscribirse. Por favor intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              ¡Obtén tu Cotización PDF Gratis!
            </h3>
            <p className="text-gray-600 mt-2">
              Suscríbete para recibir actualizaciones y noticias sobre nuestra herramienta.
              Es completamente gratis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full rounded-lg border shadow-sm focus:ring-indigo-500 
                  ${error ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full rounded-lg border shadow-sm focus:ring-indigo-500 
                  ${error ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="tu@email.com"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg 
                text-white font-medium transition-colors
                ${success 
                  ? 'bg-green-500' 
                  : loading
                    ? 'bg-indigo-400'
                    : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : success ? (
                '¡Suscrito con éxito!'
              ) : (
                'Suscribirse y Generar PDF'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              No compartiremos tu información con terceros. Puedes darte de baja en cualquier momento.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}