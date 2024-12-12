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
    console.log('Verifying Stripe signature...');
    
    // Log the first few characters of the signature and secret for debugging
    console.log('Signature prefix:', sig.substring(0, 10));
    console.log('Webhook secret prefix:', process.env.STRIPE_WEBHOOK_SECRET!.substring(0, 10));
    
    const rawBody = event.body;
    console.log('Raw body length:', rawBody?.length);

    const event_data = stripe.webhooks.constructEvent(
      rawBody!,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log('Webhook event verified:', event_data.type);

    // Handle the event
    switch (event_data.type) {
      case 'checkout.session.completed': {
        const session = event_data.data.object as Stripe.Checkout.Session;
        console.log('Processing checkout session:', {
          id: session.id,
          customerId: session.customer,
          clientReferenceId: session.client_reference_id,
          subscriptionId: session.subscription
        });
        
        try {
          // Retrieve the subscription details
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          console.log('Retrieved subscription:', subscription.id);
          
          const price = await stripe.prices.retrieve(subscription.items.data[0].price.id);
          console.log('Retrieved price:', price.id);
          
          // Determine plan type from price metadata or ID
          const planType = price.nickname?.toLowerCase().includes('lifetime') ? 'lifetime' : 'monthly';
          console.log('Plan type:', planType);

          // Insert or update subscription in Supabase
          const { error: supabaseError } = await supabase
            .from('subscriptions')
            .upsert({
              user_id: session.client_reference_id,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: subscription.id,
              plan_type: planType,
              status: subscription.status,
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              trial_start: subscription.trial_start 
                ? new Date(subscription.trial_start * 1000).toISOString()
                : null,
              trial_end: subscription.trial_end
                ? new Date(subscription.trial_end * 1000).toISOString()
                : null
            });

          if (supabaseError) {
            console.error('Supabase error:', supabaseError);
            throw supabaseError;
          }
          
          console.log('Successfully processed checkout session');
        } catch (innerError) {
          console.error('Error processing checkout session:', innerError);
          throw innerError;
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event_data.data.object as Stripe.Subscription;
        console.log('Processing subscription update:', subscription.id);
        
        try {
          const { error: supabaseError } = await supabase
            .from('subscriptions')
            .update({
              status: subscription.status,
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at: subscription.cancel_at 
                ? new Date(subscription.cancel_at * 1000).toISOString()
                : null,
              canceled_at: subscription.canceled_at
                ? new Date(subscription.canceled_at * 1000).toISOString()
                : null
            })
            .eq('stripe_subscription_id', subscription.id);

          if (supabaseError) {
            console.error('Supabase error:', supabaseError);
            throw supabaseError;
          }
          
          console.log('Successfully processed subscription update');
        } catch (innerError) {
          console.error('Error processing subscription update:', innerError);
          throw innerError;
        }
        break;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook error:', error);
    let errorMessage = 'Unknown error';
    let errorDetails = {};
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }
    
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Webhook handler failed',
        message: errorMessage,
        details: errorDetails,
      }),
    };
  }
}; 