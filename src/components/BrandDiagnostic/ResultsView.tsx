import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, ArrowRight, Download } from 'lucide-react';

interface ResultsViewProps {
  score: number;
  onRequestConsultation?: () => void;
}

export default function ResultsView({ score, onRequestConsultation }: ResultsViewProps) {
  const getScoreCategory = () => {
    if (score >= 100) return {
      title: '¡Excelente!',
      description: 'Tu marca está muy bien posicionada. Sigue así y mantén la consistencia.',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    };
    if (score >= 75) return {
      title: 'Buen Trabajo',
      description: 'Tu marca va por buen camino, pero hay aspectos que podrías mejorar.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    };
    if (score >= 50) return {
      title: 'Necesita Atención',
      description: 'Tu marca necesita varios cambios importantes para alcanzar su potencial.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    };
    return {
      title: 'Requiere Renovación',
      description: 'Es momento de repensar tu marca desde cero para mejorar su efectividad.',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    };
  };

  const category = getScoreCategory();

  return (
    <div className="min-h-screen bg-[#0C0C0C] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="bg-[#141414] rounded-2xl border border-[#1a1a1a] p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <BarChart className="w-12 h-12 mx-auto text-white mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Resultados de tu Diagnóstico
            </h1>
            <p className="text-gray-400">
              Basado en tus respuestas, hemos analizado la efectividad de tu marca.
            </p>
          </div>

          <div className={`${category.bgColor} rounded-xl p-6 mb-8 border border-[#2a2a2a]`}>
            <div className="text-center">
              <h2 className={`text-4xl font-bold ${category.color} mb-2`}>
                {score} / 125
              </h2>
              <h3 className="text-xl font-semibold text-white mb-2">
                {category.title}
              </h3>
              <p className="text-gray-300">
                {category.description}
              </p>
            </div>
          </div>

          {score < 75 && onRequestConsultation && (
            <div className="bg-[#1a1a1a] rounded-xl p-6 mb-8 border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Quieres mejorar tu marca?
              </h3>
              <p className="text-gray-400 mb-4">
                Podemos ayudarte a fortalecer tu marca y mejorar su efectividad en el mercado.
              </p>
              <button
                onClick={onRequestConsultation}
                className="w-full bg-white text-black px-6 py-3 rounded-lg 
                         hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Solicitar Consultoría Gratuita
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="border-t border-[#2a2a2a] pt-6">
            <button className="w-full flex items-center justify-center gap-2 text-gray-400 
                           hover:text-white transition-colors">
              <Download className="w-5 h-5" />
              Descargar Resultados PDF
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}