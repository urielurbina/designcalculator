import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { Toaster } from 'react-hot-toast';
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
import Pricing from './pages/Pricing';
import AuthCallback from './components/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';

// Creamos un componente wrapper para acceder a useLocation
const AppContent = () => {
  const location = useLocation();
  const isQuotePage = location.pathname === '/cotizar';

  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Toaster position="top-right" />
        <div className="flex flex-col min-h-screen">
          {!isQuotePage && <PromoBanner />}
          {!isQuotePage && <Navbar />}
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
              <Route path="/pricing" element={<Pricing />} />
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
          {!isQuotePage && <Footer />}
        </div>
      </SubscriptionProvider>
    </AuthProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;