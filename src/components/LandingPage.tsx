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
      title: "Cálculo Preciso",
      description: "Obtén cotizaciones precisas basadas en múltiples factores y variables del proyecto."
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: "Ahorra Tiempo",
      description: "Genera cotizaciones profesionales en minutos, no en horas."
    },
    {
      icon: <FileDown className="w-6 h-6 text-indigo-600" />,
      title: "PDF Profesional",
      description: "Exporta cotizaciones en PDF con diseño profesional y personalizado."
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      title: "Precios Justos",
      description: "Asegura una compensación justa basada en tu experiencia y el alcance del proyecto."
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              Calcula tus Precios de
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {" "}Diseño Gráfico
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Genera cotizaciones profesionales en minutos con nuestra calculadora especializada para diseñadores gráficos.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/calculator"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                Comenzar Ahora
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/freelance"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
              >
                Calculadora Freelance
                <Clock className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mockup Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Calcula Precios en Segundos
            </h2>
            <p className="text-lg text-gray-600">
              Nuestra interfaz intuitiva te permite calcular precios precisos para tus servicios de diseño en cuestión de segundos.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Precios base actualizados al mercado</span>
              </div>
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Ajusta multiplicadores según el proyecto</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Cotizaciones detalladas y profesionales</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl transform rotate-2"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-4">
              <MockupCalculator />
            </div>
          </div>
        </div>
      </div>

      {/* PDF Preview Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl transform -rotate-2"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-4">
                <MockupPDF />
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900">
                Cotizaciones Profesionales en PDF
              </h2>
              <p className="text-lg text-gray-600">
                Genera documentos PDF profesionales con todos los detalles de tu cotización, listos para enviar a tus clientes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700">Diseño profesional y personalizable</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700">Descarga instantánea en PDF</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700">Información detallada y estructurada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Todo lo que Necesitas para Cotizar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra calculadora incluye todas las herramientas necesarias para generar cotizaciones profesionales y precisas.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Servicios Incluidos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Calcula precios para una amplia gama de servicios de diseño gráfico y digital.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-indigo-50 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-indigo-600 mr-3" />
                <span className="text-gray-800">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-in digo-600 to-purple-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            ¿Listo para Comenzar?
          </h2>
          <Link
            to="/calculator"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
          >
            Crear mi Primera Cotización
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}