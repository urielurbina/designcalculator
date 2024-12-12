import { supabase } from '../../lib/supabase';

export interface SubscriptionStatus {
  isActive: boolean;
  planType: 'monthly' | 'lifetime' | null;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { isActive: false, planType: null };
    }

    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;

    if (!subscriptions) {
      return { isActive: false, planType: null };
    }

    const isActive = subscriptions.status === 'active' || subscriptions.status === 'trialing';

    return {
      isActive,
      planType: subscriptions.plan_type,
      currentPeriodEnd: subscriptions.current_period_end,
      cancelAtPeriodEnd: Boolean(subscriptions.cancel_at)
    };
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return { isActive: false, planType: null };
  }
}