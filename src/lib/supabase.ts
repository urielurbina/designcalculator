import { createClient } from '@supabase/supabase-js';

// Usar variables de entorno para las credenciales
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las credenciales de Supabase en las variables de entorno');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function subscribeEmail(email: string) {
  // Verificar si el email ya existe
  const { data: existing } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    throw new Error('Este email ya está suscrito');
  }

  // Insertar nueva suscripción
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      { 
        email,
        subscribed_at: new Date().toISOString(),
        status: 'active'
      }
    ])
    .select();

  if (error) throw error;
  return data;
}

export async function unsubscribeEmail(email: string) {
  const { error } = await supabase
    .from('subscriptions')
    .update({ status: 'unsubscribed' })
    .eq('email', email);

  if (error) throw error;
  return true;
}