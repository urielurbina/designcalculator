import Stripe from 'stripe';
import { supabase } from '../../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { priceId, successUrl, cancelUrl, userId } = await req.json();

    if (!userId) {
      return new Response('Usuario no autorizado', { status: 401 });
    }

    // Buscar o crear customer
    let { data: customer } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single();

    let stripeCustomerId;

    if (!customer?.stripe_customer_id) {
      const { data: userData } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', userId)
        .single();

      const stripeCustomer = await stripe.customers.create({
        email: userData?.email,
        name: userData?.full_name,
        metadata: {
          user_id: userId
        }
      });

      stripeCustomerId = stripeCustomer.id;

      // Guardar el customer ID
      await supabase
        .from('customers')
        .insert({
          user_id: userId,
          stripe_customer_id: stripeCustomerId
        });
    } else {
      stripeCustomerId = customer.stripe_customer_id;
    }

    // Crear sesión de checkout
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

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
}