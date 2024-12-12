import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { sessionId } = JSON.parse(event.body || '{}');
    
    if (!sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing sessionId' }),
      };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: session.status,
        customerId: session.customer,
        subscriptionId: session.subscription,
      }),
    };
  } catch (error) {
    console.error('Verification error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Verification failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
}; 