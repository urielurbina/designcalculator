import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) {
      return {
        user: null,
        session: null,
        error: {
          message: error.message,
          status: error.status
        }
      };
    }

    return {
      user: data?.user || null,
      session: data?.session || null,
      error: null
    };
  } catch (error) {
    return {
      user: null,
      session: null,
      error: {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 500
      }
    };
  }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return {
        error: {
          message: error.message,
          status: error.status
        }
      };
    }
    return { error: null };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 500
      }
    };
  }
}

export async function getCurrentSession(): Promise<AuthResponse> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      return {
        user: null,
        session: null,
        error: {
          message: error.message,
          status: error.status
        }
      };
    }

    return {
      user: session?.user || null,
      session: session || null,
      error: null
    };
  } catch (error) {
    return {
      user: null,
      session: null,
      error: {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 500
      }
    };
  }
}

export function onAuthStateChange(callback: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}