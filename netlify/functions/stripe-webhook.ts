import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Validate environment variables first
if (!process.env.SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL');
}
if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_KEY');
}

console.log('Supabase URL prefix:', process.env.SUPABASE_URL.substring(0, 20));
console.log('Supabase key prefix:', process.env.SUPABASE_SERVICE_KEY.substring(0, 20));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export const handler: Handler = async (event) => {
  console.log('Webhook received');

  // Test Supabase connection first
  try {
    const { data: test, error: testError } = await supabase
      .from('subscriptions')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('Supabase connection test failed:', testError);
      throw new Error(`Supabase connection failed: ${testError.message}`);
    }
    console.log('Supabase connection test successful');
  } catch (e) {
    console.error('Error testing Supabase connection:', e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Database connection failed',
        details: e instanceof Error ? e.message : 'Unknown error'
      })
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  if (!sig) {
    return { statusCode: 400, body: 'Missing stripe signature' };
  }

  try {
    console.log('Webhook processing started');
    
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('Missing STRIPE_WEBHOOK_SECRET');
    }

    const rawBody = event.body;
    if (!rawBody) {
      throw new Error('No body received');
    }

    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      webhookSecret
    );

    console.log('Event type:', stripeEvent.type);

    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      
      console.log('Processing checkout session:', {
        sessionId: session.id,
        customerId: session.customer,
        clientReferenceId: session.client_reference_id,
        subscriptionId: session.subscription
      });

      if (!session.subscription) {
        throw new Error('No subscription ID in session');
      }

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      console.log('Retrieved subscription:', subscription.id);

      const subscriptionData = {
        user_id: session.client_reference_id,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscription.id,
        plan_type: 'monthly',
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Attempting to save subscription data:', subscriptionData);

      const { error } = await supabase
        .from('subscriptions')
        .upsert(subscriptionData);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to save subscription: ${error.message}`);
      }

      console.log('Subscription saved successfully');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        received: true,
        type: stripeEvent.type
      })
    };
  } catch (err) {
    console.error('Webhook error:', err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Webhook handler failed',
        message: err instanceof Error ? err.message : 'Unknown error',
        details: err instanceof Error ? {
          name: err.name,
          message: err.message,
          stack: err.stack
        } : err
      })
    };
  }
};