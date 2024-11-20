import React from 'react';
import { ClipboardCheck, ArrowRight } from 'lucide-react';

interface DiagnosticIntroProps {
  onStart: () => void;
}

export default function DiagnosticIntro({ onStart }: DiagnosticIntroProps) {
  return (
    <div className="min-h-screen bg-[#0C0C0C] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#141414] rounded-2xl border border-[#1a1a1a] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <ClipboardCheck className="w-8 h-8 text-white" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Diagnóstico de Marca Gratuito
            </h1>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-lg text-gray-400">
              Descubre el verdadero potencial de tu marca en solo 5 minutos. Este diagnóstico 
              profesional te ayudará a identificar áreas clave de mejora en:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-[#1a1a1a] border border-[#222] p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Diseño Visual</h3>
                <p className="text-gray-400">
                  Evaluamos la efectividad de tu identidad visual y su impacto en el mercado.
                </p>
              </div>
              
              <div className="bg-[#1a1a1a] border border-[#222] p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Comunicación</h3>
                <p className="text-gray-400">
                  Analizamos cómo tu marca conecta y resuena con tu audiencia objetivo.
                </p>
              </div>
              
              <div className="bg-[#1a1a1a] border border-[#222] p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Experiencia</h3>
                <p className="text-gray-400">
                  Medimos la calidad de interacción entre tu marca y tus clientes.
                </p>
              </div>
              
              <div className="bg-[#1a1a1a] border border-[#222] p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Proyección</h3>
                <p className="text-gray-400">
                  Evaluamos la escalabilidad y potencial futuro de tu marca.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-white mb-4">
              Metodología Profesional
            </h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                25 preguntas estratégicas sobre tu marca
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                Evaluación basada en estándares de la industria
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                Resultados y análisis inmediatos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                Recomendaciones personalizadas para tu negocio
              </li>
            </ul>
          </div>

          <button
            onClick={onStart}
            className="w-full md:w-auto bg-white text-black px-8 py-3 rounded-lg 
                     hover:bg-gray-100 transition-colors flex items-center justify-center gap-2
                     font-medium"
          >
            Comenzar Diagnóstico
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}