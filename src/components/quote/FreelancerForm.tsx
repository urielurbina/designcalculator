import React, { useEffect, useState } from 'react';
import { User, Save, Loader2 } from 'lucide-react';
import { getFreelancerProfile, updateFreelancerProfile } from '../../services/freelancerService';

interface FreelancerData {
  name: string;
  website: string;
  email: string;
  phone: string;
  logo_url: string;
}

export default function FreelancerForm() {
  const [data, setData] = useState<FreelancerData>({
    name: '',
    website: '',
    email: '',
    phone: '',
    logo_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const profile = await getFreelancerProfile();
        if (profile) {
          setData(profile);
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      await updateFreelancerProfile(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Información del Freelancer
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Tu nombre completo"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sitio Web
          </label>
          <input
            type="url"
            name="website"
            value={data.website}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="https://tusitio.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="+52 123 456 7890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL del Logotipo
          </label>
          <input
            type="url"
            name="logo_url"
            value={data.logo_url}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="https://ejemplo.com/logo.png"
          />
          {data.logo_url && (
            <div className="mt-2">
              <img
                src={data.logo_url}
                alt="Logo Preview"
                className="h-16 object-contain rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Logo+Error';
                }}
              />
            </div>
          )}
        </div>

        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="text-sm text-green-600">
            Cambios guardados correctamente
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white 
                     px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </form>
  );
}