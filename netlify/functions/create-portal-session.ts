import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  }

  try {
    const { userId } = JSON.parse(event.body || '{}');

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing userId' })
      };
    }

    // First, get the stripe_customer_id
    const { data: customer } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single();

    if (!customer?.stripe_customer_id) {
      throw new Error('Customer not found');
    }

    // Create a simple portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.stripe_customer_id,
      return_url: `${process.env.URL}/pricing`
    });

    console.log('Created portal session:', portalSession.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: portalSession.url })
    };
  } catch (error) {
    console.error('Portal session error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: 'Failed to create portal session',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}; 