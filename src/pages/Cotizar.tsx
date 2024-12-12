import React, { useState, useEffect } from 'react';
import { useSubscription } from '../contexts/SubscriptionContext';
import SubscriptionBanner from '../components/subscription/SubscriptionBanner';
import SubscriptionManager from '../components/subscription/SubscriptionManager';
// ... resto de las importaciones existentes ...

export default function Cotizar() {
  const { subscription, loading: subscriptionLoading } = useSubscription();
  // ... resto del código existente ...

  // Agregar el panel de gestión de suscripción al panel de control
  const renderSubscriptionPanel = () => {
    if (!subscription.isActive) return null;

    return (
      <div className="mb-6">
        <SubscriptionManager
          planType={subscription.planType as 'monthly' | 'lifetime'}
          currentPeriodEnd={subscription.currentPeriodEnd}
          cancelAtPeriodEnd={subscription.cancelAtPeriodEnd}
        />
      </div>
    );
  };

  // Modificar el renderizado principal para incluir el banner y el panel
  return (
    <div className="min-h-screen bg-gray-50">
      {!subscriptionLoading && <SubscriptionBanner subscription={subscription} />}
      
      {/* Navigation */}
      <nav className="bg-white border-b">
        {/* ... código existente del nav ... */}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activePanel === 'freelancer' && (
          <>
            {renderSubscriptionPanel()}
            <FreelancerForm />
          </>
        )}
        
        {/* ... resto del código existente ... */}
      </main>

      {renderPDFPreviewModal()}
    </div>
  );
}