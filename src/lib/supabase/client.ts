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