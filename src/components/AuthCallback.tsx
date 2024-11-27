import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          throw error;
        }
        
        if (session) {
          console.log('Session found, redirecting to /cotizar');
          navigate('/cotizar', { replace: true });
        } else {
          console.log('No session found, redirecting to /login');
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/login', { replace: true });
      }
    };

    // Add a small delay to ensure the session is properly processed
    setTimeout(handleAuthCallback, 100);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Autenticando...</p>
      </div>
    </div>
  );
}