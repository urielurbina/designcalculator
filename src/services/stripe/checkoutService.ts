import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function createCheckoutSession(priceId: string) {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not initialized');

    // Crear sesión de checkout
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        successUrl: `${window.location.origin}/cotizar`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`,
      }),
    });

    const { sessionId } = await response.json();
    if (!sessionId) throw new Error('No session ID returned');

    // Redirigir a Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) throw error;

  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createPortalSession() {
  try {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { url } = await response.json();
    if (!url) throw new Error('No portal URL returned');

    window.location.href = url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}