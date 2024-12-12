import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSubscriptionStatus, SubscriptionStatus } from '../services/stripeService';
import { useAuth } from './AuthContext';

interface SubscriptionContextType {
  subscription: SubscriptionStatus;
  loading: boolean;
  error: string | null;
  refetchSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  subscription: { isActive: false, planType: null },
  loading: true,
  error: null,
  refetchSubscription: async () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus>({ 
    isActive: false, 
    planType: null 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      const status = await getSubscriptionStatus();
      setSubscription(status);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError('Error al cargar el estado de la suscripción');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSubscription();
    } else {
      setSubscription({ isActive: false, planType: null });
      setLoading(false);
    }
  }, [user]);

  const value = {
    subscription,
    loading,
    error,
    refetchSubscription: fetchSubscription
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}