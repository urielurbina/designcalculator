import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface LeadFormProps {
  score: number;
}

export default function LeadForm({ score }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    brand_name: '',
    whatsapp: '',
    email: '',
    state: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('brand_leads')
        .insert([
          {
            ...formData,
            diagnostic_score: score,
            submitted_at: new Date().toISOString(),
          },
        ]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
    } catch (err) {
      setError('Error al enviar el formulario. Por favor intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="bg-[#141414] rounded-2xl border border-[#1a1a1a] p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              ¡Gracias por tu interés!
            </h2>
            <p className="text-gray-400">
              Nos pondremos en contacto contigo pronto para discutir cómo podemos ayudarte 
              a mejorar tu marca.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="bg-[#141414] rounded-2xl border border-[#1a1a1a] p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Solicita tu Consultoría Gratuita
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-lg bg-[#1a1a1a] border-[#2a2a2a] text-white
                         placeholder-gray-500 focus:border-white focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nombre de tu Marca
              </label>
              <input
                type="text"
                required
                value={formData.brand_name}
                onChange={(e) => setFormData(prev => ({ ...prev, brand_name: e.target.value }))}
                className="w-full rounded-lg bg-[#1a1a1a] border-[#2a2a2a] text-white
                         placeholder-gray-500 focus:border-white focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                className="w-full rounded-lg bg-[#1a1a1a] border-[#2a2a2a] text-white
                         placeholder-gray-500 focus:border-white focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-lg bg-[#1a1a1a] border-[#2a2a2a] text-white
                         placeholder-gray-500 focus:border-white focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Estado en México
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                className="w-full rounded-lg bg-[#1a1a1a] border-[#2a2a2a] text-white
                         placeholder-gray-500 focus:border-white focus:ring-white"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black px-6 py-3 rounded-lg 
                       hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Enviar Solicitud
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}