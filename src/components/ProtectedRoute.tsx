import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Guardar la ubicación actual para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
}