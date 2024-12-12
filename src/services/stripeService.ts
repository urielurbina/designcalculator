import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export interface SubscriptionStatus {
  isActive: boolean;
  planType: 'monthly' | 'lifetime' | null;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export async function createCheckoutSession(priceId: string): Promise<{ sessionId: string; url?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        successUrl: `${window.location.origin}/cotizar?success=true`,
        cancelUrl: `${window.location.origin}/cotizar?canceled=true`,
        userId: user.id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error en el checkout');
    }

    const data = await response.json();
    
    // Inicializar Stripe
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    if (!stripe) throw new Error('Stripe no pudo ser inicializado');

    // Redirigir a Checkout
    await stripe.redirectToCheckout({
      sessionId: data.sessionId
    });

    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createPortalSession(): Promise<string> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        returnUrl: `${window.location.origin}/cotizar`
      }),
    });

    const data = await response.json();
    if (!data.url) throw new Error('No portal URL returned');

    window.location.href = data.url;
    return data.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { isActive: false, planType: null };
    }

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;

    if (!subscription) {
      return { isActive: false, planType: null };
    }

    const isActive = subscription.status === 'active' || subscription.status === 'trialing';

    return {
      isActive,
      planType: subscription.plan_type,
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: Boolean(subscription.cancel_at)
    };
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return { isActive: false, planType: null };
  }
}