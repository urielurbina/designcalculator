import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Clock, 
  FileDown, 
  Palette, 
  Shield,
  ChevronRight,
  CheckCircle,
  DollarSign,
  Sliders,
  FileText,
  Download
} from 'lucide-react';
import MockupCalculator from './mockups/MockupCalculator';
import MockupPDF from './mockups/MockupPDF';

export default function LandingPage() {
  const features = [
    {
      icon: <Calculator className="w-6 h-6 text-indigo-600" />,
      title: "Cotizador Premium",
      description: "Accede a funciones avanzadas, plantillas personalizadas y seguimiento de cotizaciones."
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: "Versión Gratuita",
      description: "Calcula precios rápidamente con nuestra herramienta básica pero potente."
    },
    {
      icon: <FileDown className="w-6 h-6 text-indigo-600" />,
      title: "Exportación Avanzada",
      description: "Genera PDFs profesionales con tu marca y términos personalizados."
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      title: "Gestión Completa",
      description: "Administra clientes, proyectos y cotizaciones en un solo lugar."
    }
  ];

  const services = [
    "Identidad Corporativa",
    "Ilustración",
    "Publicidad Exterior",
    "Impresos",
    "Fotografía y Video",
    "Edición y Animación",
    "Dirección",
    "Social Media"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-8">
              Cotizadora Profesional para
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {" "}Freelancers
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Elige entre nuestra versión gratuita o accede a todas las funciones premium para gestionar tus cotizaciones como un profesional.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors border-2 border-indigo-600"
              >
                Versión Gratuita
                <Calculator className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/cotizar"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                Cotizador Premium
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mockup Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Gestión Profesional de Cotizaciones
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Con nuestra versión premium, accede a herramientas avanzadas para crear, gestionar y dar seguimiento a tus cotizaciones.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-gray-700">Plantillas personalizadas para cada tipo de proyecto</span>
              </div>
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-gray-700">Panel de control para gestionar clientes y proyectos</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-gray-700">Seguimiento de cotizaciones y estados de proyectos</span>
              </div>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl transform rotate-2"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-4">
              <MockupCalculator />
            </div>
          </div>
        </div>
      </div>

      {/* PDF Preview Section */}
      <div className="bg-gray-50 py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl transform -rotate-2"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-4">
                <MockupPDF />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Cotizaciones Profesionales en PDF
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Genera documentos PDF profesionales con todos los detalles de tu cotización, listos para enviar a tus clientes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span className="text-gray-700">Diseño profesional y personalizable</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span className="text-gray-700">Descarga instantánea en PDF</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span className="text-gray-700">Información detallada y estructurada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Todo lo que Necesitas para Cotizar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Nuestra calculadora incluye todas las herramientas necesarias para generar cotizaciones profesionales y precisas.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Servicios Incluidos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4">
              Calcula precios para una amplia gama de servicios de diseño gráfico y digital.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-indigo-50 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                <span className="text-gray-800">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            ¿Listo para Llevar tus Cotizaciones al Siguiente Nivel?
          </h2>
          <p className="text-white text-lg mb-8">
            Prueba nuestra versión premium y descubre todas las funcionalidades
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
            >
              Ver Planes Premium
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/calculator"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-transparent text-white font-semibold border-2 border-white hover:bg-white/10 transition-colors"
            >
              Probar Versión Gratuita
              <Calculator className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}