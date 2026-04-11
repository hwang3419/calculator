import React from 'react';

interface FeedbackBannerProps {
  status: 'correct' | 'incorrect' | null;
  correctAnswer?: number;
  onRetry: () => void;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({ status, correctAnswer, onRetry }) => {
  if (!status) return <div className="h-0 mb-0 opacity-0 overflow-hidden transition-all duration-300" />; 

  const isCorrect = status === 'correct';

  return (
    <div className={`mx-auto mb-2 flex w-full max-w-sm flex-col items-center justify-center rounded-[1.75rem] p-3 md:p-4 shadow-lg transition-all duration-300 ${
      isCorrect ? 'bg-green-100 text-green-800 border-4 border-green-400 scale-100' : 'bg-red-100 text-red-800 border-4 border-red-400 scale-100'
    }`}>
      <h2 className="mb-1 text-xl font-extrabold md:mb-2 md:text-2xl">
        {isCorrect ? '🎉 Correct!' : 'Oops!'}
      </h2>
      {!isCorrect && correctAnswer !== undefined && (
        <p className="mb-2 text-base font-medium md:text-lg">
          The right answer is <span className="font-extrabold text-xl md:text-2xl">{correctAnswer}</span>
        </p>
      )}
      
      {isCorrect ? (
        <p className="text-base md:text-lg font-bold text-center">
          Get ready for the next problem...
        </p>
      ) : (
        <button 
          onClick={onRetry}
          className="w-full rounded-2xl border-b-4 border-red-600 bg-red-500 px-5 py-2.5 text-base font-extrabold text-white shadow-sm transition-all active:translate-y-1 active:scale-95 active:border-b-0 md:text-lg"
        >
          Try Another
        </button>
      )}
    </div>
  );
};
