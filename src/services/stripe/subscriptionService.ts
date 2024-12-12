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