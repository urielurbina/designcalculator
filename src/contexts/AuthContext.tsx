import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { signInWithGoogle, signOut, getCurrentSession, onAuthStateChange } from '../services/authService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const { session, error } = await getCurrentSession();
        if (error) {
          setError(error.message);
        } else {
          setUser(session?.user || null);
          setSession(session);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize auth');
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();

    const subscription = onAuthStateChange((session) => {
      setUser(session?.user || null);
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      setError(null);
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    }
  };

  const handleSignOut = async () => {
    try {
      setError(null);
      const { error } = await signOut();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    }
  };

  const value = {
    user,
    session,
    loading,
    error,
    signInWithGoogle: handleSignInWithGoogle,
    signOut: handleSignOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}