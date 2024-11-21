import React from 'react';
import { motion } from 'framer-motion';

interface QuestionSlideProps {
  question: {
    category: string;
    text: string;
  };
  onAnswer: (value: number) => void;
}

export default function QuestionSlide({ question, onAnswer }: QuestionSlideProps) {
  const ratings = [
    { value: 1, label: 'No, para nada' },
    { value: 2, label: 'Un poco' },
    { value: 3, label: 'Más o menos' },
    { value: 4, label: 'Sí, bastante' },
    { value: 5, label: '¡Sí, totalmente!' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <span className="inline-block text-sm font-medium text-gray-500 mb-2">
          {question.category}
        </span>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          {question.text}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {ratings.map((rating) => (
          <motion.button
            key={rating.value}
            onClick={() => onAnswer(rating.value)}
            className="group relative bg-[#1a1a1a] border border-[#222] rounded-lg p-4 
                     hover:border-white hover:bg-[#222] transition-all
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                     focus:ring-offset-[#141414]
                     flex items-center justify-between"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full 
                           bg-[#222] group-hover:bg-[#2a2a2a] border border-[#333]
                           group-hover:border-white transition-colors">
                <span className="text-lg font-bold text-gray-400 group-hover:text-white">
                  {rating.value}
                </span>
              </div>
              <span className="text-base text-gray-400 group-hover:text-white">
                {rating.label}
              </span>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-[#333] 
                         group-hover:border-white group-hover:bg-white/10
                         group-hover:ring-2 group-hover:ring-white/20 transition-all" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}