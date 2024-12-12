import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export interface SubscriptionStatus {
  isActive: boolean;
  planType: 'monthly' | 'lifetime' | null;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export async function createCheckoutSession(priceId: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data: session, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { 
        priceId,
        userId: user.id,
        returnUrl: `${window.location.origin}/cotizar`
      }
    });

    if (error) throw error;
    if (!session?.url) throw new Error('No checkout URL returned');

    return session.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createPortalSession() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data: session, error } = await supabase.functions.invoke('create-portal-session', {
      body: { 
        userId: user.id,
        returnUrl: `${window.location.origin}/cotizar`
      }
    });

    if (error) throw error;
    if (!session?.url) throw new Error('No portal URL returned');

    return session.url;
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