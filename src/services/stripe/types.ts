export interface SubscriptionStatus {
  isActive: boolean;
  planType: 'monthly' | 'lifetime' | null;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface PortalSession {
  url: string;
}