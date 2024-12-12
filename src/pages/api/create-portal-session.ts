import Stripe from 'stripe';
import { supabase } from '../../lib/supabase';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Obtener el ID de cliente de Stripe
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (!subscription?.stripe_customer_id) {
      return new Response('No subscription found', { status: 404 });
    }

    // Crear sesión del portal
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${req.headers.get('origin')}/cotizar`,
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 400 }
    );
  }
}