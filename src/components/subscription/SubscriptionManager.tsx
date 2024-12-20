import React from 'react';
import { Calendar, CreditCard, CheckCircle, Loader2 } from 'lucide-react';

interface SubscriptionManagerProps {
  planType: 'monthly' | 'lifetime';
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export default function SubscriptionManager({ 
  planType,
  currentPeriodEnd,
  cancelAtPeriodEnd
}: SubscriptionManagerProps) {

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Tu Suscripción
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="font-medium text-gray-900">
              {planType === 'monthly' ? 'Plan Mensual' : 'Plan Vitalicio'}
            </p>
            <p className="text-sm text-gray-500">
              {planType === 'monthly' ? 'Facturación mensual' : 'Acceso de por vida'}
            </p>
          </div>
        </div>

        {planType === 'monthly' && currentPeriodEnd && (
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">
                Próxima facturación
              </p>
              <p className="text-sm text-gray-500">
                {new Date(currentPeriodEnd).toLocaleDateString()}
                {cancelAtPeriodEnd && ' (Se cancelará al final del período)'}
              </p>
            </div>
          </div>
        )}

        {planType === 'monthly' && (
          <a
            href="https://billing.stripe.com/p/login/dR69BF4oFbx06woaEE"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 
                     shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Gestionar Suscripción
          </a>
        )}
      </div>
    </div>
  );
}