import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { createCheckoutSession } from '../../services/stripeService';
import { toast } from 'react-hot-toast';

const features = [
  'Cotizaciones ilimitadas',
  'Diseño de PDF personalizable',
  'Gestión de clientes',
  'Panel de control completo',
  'Exportación a PDF',
  'Soporte prioritario'
];

export default function PricingPlans() {
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(priceId);
      console.log('Iniciando proceso de checkout para priceId:', priceId);
      
      const response = await createCheckoutSession(priceId);
      console.log('Respuesta del checkout:', response);
      
      if (!response) {
        throw new Error('No se recibió respuesta del servidor');
      }
      
      const checkoutUrl = response.url || response;
      
      if (typeof checkoutUrl !== 'string') {
        throw new Error('URL de checkout inválida');
      }
      
      console.log('Redirigiendo a:', checkoutUrl);
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error('Error detallado del checkout:', error);
      let errorMessage = 'Error al procesar el pago. Por favor intenta de nuevo.';
      
      if (error instanceof Error) {
        errorMessage += ` (${error.message})`;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Planes y Precios
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Plan Mensual */}
          <div className="bg-white rounded-2xl shadow-xl divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">Plan Mensual</h3>
              <p className="mt-2 text-sm text-gray-500">
                Perfecto para empezar
              </p>
              <p className="mt-4">
                <span className="text-4xl font-bold text-gray-900">$149</span>
                <span className="text-base font-medium text-gray-500">/mes</span>
              </p>
              <p className="mt-1">
                <span className="text-sm text-gray-500 line-through">$199/mes</span>
                <span className="ml-2 text-sm text-green-600">Ahorra $50</span>
              </p>
              <button
                onClick={() => handleSubscribe(import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID)}
                disabled={loading !== null}
                className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent 
                         rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 
                         hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading === import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Suscribirse'
                )}
              </button>
            </div>
            <div className="px-6 pt-6 pb-8">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide">
                Incluye:
              </h4>
              <ul className="mt-4 space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Plan Vitalicio */}
          <div className="bg-white rounded-2xl shadow-xl divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">Plan Vitalicio</h3>
              <p className="mt-2 text-sm text-gray-500">
                Acceso de por vida, un solo pago
              </p>
              <p className="mt-4">
                <span className="text-4xl font-bold text-gray-900">$999</span>
                <span className="text-base font-medium text-gray-500"> una vez</span>
              </p>
              <p className="mt-1">
                <span className="text-sm text-gray-500 line-through">$1,499</span>
                <span className="ml-2 text-sm text-green-600">Ahorra $500</span>
              </p>
              <button
                onClick={() => handleSubscribe(import.meta.env.VITE_STRIPE_LIFETIME_PRICE_ID)}
                disabled={loading !== null}
                className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent 
                         rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r 
                         from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                         disabled:opacity-50"
              >
                {loading === import.meta.env.VITE_STRIPE_LIFETIME_PRICE_ID ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Comprar Acceso Vitalicio'
                )}
              </button>
            </div>
            <div className="px-6 pt-6 pb-8">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide">
                Incluye:
              </h4>
              <ul className="mt-4 space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
                <li className="flex items-start">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-700">
                    Acceso de por vida a todas las funciones
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-700">
                    Sin pagos recurrentes
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}