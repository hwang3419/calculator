import React from 'react';

interface AnswerInputProps {
  value: string;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({ value }) => {
  return (
    <div className="flex justify-center w-full mb-3 md:mb-8">
      <div 
        className={`w-full max-w-xs h-16 sm:h-20 md:h-24 rounded-3xl flex items-center justify-center text-5xl md:text-6xl font-bold shadow-inner ${
          value ? 'bg-white text-gray-800 border-4 border-blue-400 scale-105' : 'bg-gray-100 text-gray-400 border-4 border-transparent'
        } transition-transform duration-200`}
      >
        {value || '?'}
      </div>
    </div>
  );
};
