import React from 'react';

interface AnswerInputProps {
  value: string;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({ value }) => {
  return (
    <div className="mb-2 flex w-full justify-center">
      <div 
        className={`flex h-14 w-full max-w-xs items-center justify-center rounded-[1.5rem] text-4xl font-bold shadow-inner md:h-16 md:text-5xl ${
          value ? 'bg-white text-gray-800 border-4 border-blue-400 scale-105' : 'bg-gray-100 text-gray-400 border-4 border-transparent'
        } transition-transform duration-200`}
      >
        {value || '?'}
      </div>
    </div>
  );
};
