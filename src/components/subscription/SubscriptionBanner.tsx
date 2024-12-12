import React from 'react';
import { Lock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SubscriptionStatus } from '../../services/stripeService';

interface SubscriptionBannerProps {
  subscription: SubscriptionStatus;
}

export default function SubscriptionBanner({ subscription }: SubscriptionBannerProps) {
  if (subscription.isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
            <Lock className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Funciones Bloqueadas
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Para acceder a todas las funciones, necesitas una suscripción activa.
            Elige entre nuestro plan mensual o vitalicio.
          </p>
          <div className="mt-6">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent 
                       rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 
                       hover:bg-indigo-700"
            >
              Ver Planes
              <ExternalLink className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}