import React from 'react';

interface FeedbackBannerProps {
  status: 'correct' | 'incorrect' | null;
  correctAnswer?: number;
  onNext: () => void;
  onRetry: () => void;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({ status, correctAnswer, onNext, onRetry }) => {
  if (!status) return <div className="h-0 mb-0 opacity-0 overflow-hidden transition-all duration-300" />; 

  const isCorrect = status === 'correct';

  return (
    <div className={`w-full max-w-sm mx-auto mb-3 md:mb-6 p-4 md:p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 ${
      isCorrect ? 'bg-green-100 text-green-800 border-4 border-green-400 scale-100' : 'bg-red-100 text-red-800 border-4 border-red-400 scale-100'
    }`}>
      <h2 className="text-2xl md:text-3xl font-extrabold mb-2 md:mb-3">
        {isCorrect ? '🎉 Correct!' : 'Oops!'}
      </h2>
      {!isCorrect && correctAnswer !== undefined && (
        <p className="text-lg md:text-xl mb-3 md:mb-4 font-medium">
          The right answer is <span className="font-extrabold text-xl md:text-2xl">{correctAnswer}</span>
        </p>
      )}
      
      {isCorrect ? (
        <button 
          onClick={onNext}
          className="bg-green-500 text-white text-lg md:text-xl font-extrabold py-3 md:py-4 px-6 md:px-8 rounded-2xl active:scale-95 shadow-sm border-b-4 border-green-600 active:border-b-0 active:translate-y-1 w-full transition-all"
        >
          Next Problem
        </button>
      ) : (
        <button 
          onClick={onRetry}
          className="bg-red-500 text-white text-lg md:text-xl font-extrabold py-3 md:py-4 px-6 md:px-8 rounded-2xl active:scale-95 shadow-sm border-b-4 border-red-600 active:border-b-0 active:translate-y-1 w-full transition-all"
        >
          Try Another
        </button>
      )}
    </div>
  );
};
