import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { handleStripeWebhook } from '../../src/services/stripe/webhookHandler';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method not allowed'
    };
  }

  const signature = event.headers['stripe-signature'];
  if (!signature) {
    return {
      statusCode: 400,
      body: 'No signature found'
    };
  }

  try {
    const event = stripe.webhooks.constructEvent(
      event.body || '',
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    await handleStripeWebhook(event);

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (err) {
    console.error('Error handling webhook:', err);
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: err instanceof Error ? err.message : 'Unknown error' 
      })
    };
  }
};