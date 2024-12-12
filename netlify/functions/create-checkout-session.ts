import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Add type declarations
interface RequestBody {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  userId: string;
}

interface CustomerData {
  stripe_customer_id: string | null;
}

interface UserData {
  email: string | null;
  full_name: string | null;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { priceId, successUrl, cancelUrl, userId } = JSON.parse(event.body || '') as RequestBody;

    // Get or create customer
    let { data: customer } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single() as { data: CustomerData | null };

    let stripeCustomerId: string;

    if (!customer?.stripe_customer_id) {
      const { data: userData } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', userId)
        .single() as { data: UserData | null };

      const stripeCustomer = await stripe.customers.create({
        email: userData?.email || undefined,
        name: userData?.full_name || undefined,
        metadata: {
          user_id: userId
        }
      });

      stripeCustomerId = stripeCustomer.id;

      await supabase
        .from('customers')
        .insert({
          user_id: userId,
          stripe_customer_id: stripeCustomerId
        });
    } else {
      stripeCustomerId = customer.stripe_customer_id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: userId,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        sessionId: session.id,
        url: session.url
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
    };
  }
};