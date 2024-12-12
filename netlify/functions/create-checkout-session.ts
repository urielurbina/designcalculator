import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { priceId, userId, isLifetime } = JSON.parse(event.body || '{}');

    if (!priceId || !userId) {
      throw new Error('Missing required parameters');
    }

    const session = await stripe.checkout.sessions.create({
      mode: isLifetime ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${process.env.URL}/cotizar`,
      cancel_url: `${process.env.URL}/pricing`,
      client_reference_id: userId,
      metadata: {
        userId,
        planType: isLifetime ? 'lifetime' : 'monthly'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id, url: session.url }),
    };
  } catch (error) {
    console.error('Checkout session creation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error creating checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
}