import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Validate environment variables
const requiredEnvVars = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
};

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

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
  console.log('Webhook received');

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  if (!sig) {
    return { statusCode: 400, body: 'Missing stripe signature' };
  }

  try {
    console.log('Webhook processing started');
    console.log('Event headers:', event.headers);
    
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('Missing STRIPE_WEBHOOK_SECRET');
    }

    // Verify the event
    const event_data = stripe.webhooks.constructEvent(
      event.body!,
      sig,
      webhookSecret
    );

    console.log('Event verified:', event_data.type);

    if (event_data.type === 'checkout.session.completed') {
      const session = event_data.data.object as Stripe.Checkout.Session;
      
      console.log('Processing session:', {
        id: session.id,
        customer: session.customer,
        subscription: session.subscription
      });

      // Retrieve subscription details
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      
      // Insert into Supabase
      const { error: supabaseError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: session.client_reference_id,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: subscription.id,
          plan_type: 'monthly', // You might want to determine this from the price
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        });

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw supabaseError;
      }

      console.log('Subscription saved successfully');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
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