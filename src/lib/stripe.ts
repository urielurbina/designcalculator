import { loadStripe } from '@stripe/stripe-js';

// Asegurarse de que la clave de Stripe esté disponible
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!stripePublicKey) {
  throw new Error('Missing Stripe publishable key');
}

// Crear una única instancia de Stripe
export const stripe = await loadStripe(stripePublicKey);