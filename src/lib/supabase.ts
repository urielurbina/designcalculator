import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Las variables de entorno de Supabase no están configuradas');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
    storage: {
      getItem: (key) => {
        try {
          const storedData = window.localStorage.getItem(key);
          return storedData ? JSON.parse(storedData) : null;
        } catch {
          return null;
        }
      },
      setItem: (key, value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
      },
      removeItem: (key) => {
        window.localStorage.removeItem(key);
      }
    }
  }
});

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      },
      skipBrowserRedirect: false
    }
  });

  if (error) throw error;
  return data;
}

export async function subscribeEmail(data: { email: string; name: string }) {
  try {
    const { data: existing, error: checkError } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('email', data.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

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