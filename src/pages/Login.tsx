import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';

export default function Login() {
  const { user, signInWithGoogle, loading } = useAuth();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/cotizar';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h1>
          <p className="text-gray-600">
            Accede a tu cuenta para continuar
          </p>
        </div>

        <button
          onClick={() => signInWithGoogle()}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 
                   rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 
                   hover:border-gray-400 transition-colors"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5"
          />
          Continuar con Google
        </button>
      </div>
    </div>
  );
}