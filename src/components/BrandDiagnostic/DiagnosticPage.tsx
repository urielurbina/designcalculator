import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import DiagnosticNavbar from './DiagnosticNavbar';
import DiagnosticFooter from './DiagnosticFooter';
import DiagnosticIntro from './DiagnosticIntro';
import QuestionSlide from './QuestionSlide';
import ResultsView from './ResultsView';
import LeadForm from './LeadForm';
import { questions } from './diagnosticData';

export default function DiagnosticPage() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const handleStart = () => {
    setCurrentStep(0);
  };

  const handleAnswer = (value: number) => {
    setAnswers([...answers, value]);
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setAnswers(answers.slice(0, -1));
      setCurrentStep(prev => prev - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-1);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, value) => sum + value, 0);
  };

  const shouldShowLeadForm = () => {
    const score = calculateScore();
    return score < 75;
  };

  const renderContent = () => {
    if (currentStep === -1) {
      return <DiagnosticIntro onStart={handleStart} />;
    }

    if (currentStep >= questions.length) {
      const score = calculateScore();
      if (shouldShowLeadForm() && !showLeadForm) {
        return (
          <ResultsView 
            score={score} 
            onRequestConsultation={() => setShowLeadForm(true)}
          />
        );
      }
      if (showLeadForm) {
        return <LeadForm score={score} />;
      }
      return <ResultsView score={score} />;
    }

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#0C0C0C] py-4 sm:py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-xl sm:rounded-2xl border border-[#1a1a1a] p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <button
                onClick={handleBack}
                className="text-gray-500 hover:text-white flex items-center gap-1 p-2 -ml-2 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Anterior</span>
              </button>
              <div className="text-sm text-gray-500">
                <span className="hidden sm:inline">Pregunta </span>
                {currentStep + 1}/{questions.length}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuestionSlide
                  question={questions[currentStep]}
                  onAnswer={handleAnswer}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0C0C0C]">
      <DiagnosticNavbar />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <DiagnosticFooter />
    </div>
  );
}