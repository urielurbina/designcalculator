import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import LandingPage from './components/LandingPage';
import PriceCalculator from './components/PriceCalculator';
import FreelanceCalculator from './components/FreelanceCalculator';
import ColorConverter from './components/ColorConverter';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Footer from './components/Footer';
import DiagnosticPage from './components/BrandDiagnostic/DiagnosticPage';
import Cotizar from './pages/Cotizar';
import Login from './pages/Login';
import AuthCallback from './components/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const location = useLocation();
  const isDiagnosticPage = location.pathname === '/diagnostic';
  const isAuthPage = ['/cotizar', '/login', '/auth/callback'].includes(location.pathname);

  if (isAuthPage) {
    if (location.pathname === '/auth/callback') {
      return <AuthCallback />;
    }
    if (location.pathname === '/cotizar') {
      return (
        <ProtectedRoute>
          <Cotizar />
        </ProtectedRoute>
      );
    }
    return <Login />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!isDiagnosticPage && <PromoBanner />}
      {!isDiagnosticPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/calculator" element={<PriceCalculator />} />
          <Route path="/freelance" element={<FreelanceCalculator />} />
          <Route path="/colors" element={<ColorConverter />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route 
            path="/cotizar" 
            element={
              <ProtectedRoute>
                <Cotizar />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!isDiagnosticPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;