import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Las variables de entorno de Supabase no están configuradas');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
});

export async function subscribeEmail(data: { email: string; name: string }) {
  try {
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('email', data.email)
      .single();

    if (existing) {
      throw new Error('Este email ya está suscrito');
    }

    const { error } = await supabase
      .from('subscriptions')
      .insert([
        { 
          email: data.email,
          name: data.name,
          subscribed_at: new Date().toISOString(),
          status: 'active'
        }
      ]);

    if (error) throw error;
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error al procesar la suscripción');
  }
}

export async function unsubscribeEmail(email: string) {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({ status: 'unsubscribed' })
      .eq('email', email);

    if (error) throw error;
    return true;
  } catch (error) {
    throw new Error('Error al procesar la baja');
  }
}