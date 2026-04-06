import React from 'react';
import { playNumberClickSound } from '../utils/audio';

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, onClear, onSubmit, disabled }) => {
  const buttons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'C', '0', '✓'
  ];

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-sm mx-auto">
      {buttons.map((btn) => {
        let bgColor = "bg-white text-gray-800 shadow-sm border-b-4 border-gray-200 hover:bg-gray-50 active:border-b-0 active:translate-y-1";
        if (btn === 'C') bgColor = "bg-red-100 text-red-600 shadow-sm border-b-4 border-red-200 hover:bg-red-200 active:border-b-0 active:translate-y-1";
        if (btn === '✓') bgColor = "bg-green-500 text-white shadow-sm border-b-4 border-green-600 hover:bg-green-400 active:border-b-0 active:translate-y-1";

        return (
          <button
            key={btn}
            disabled={disabled}
            onClick={() => {
              playNumberClickSound();
              if (btn === 'C') onClear();
              else if (btn === '✓') onSubmit();
              else onNumberClick(btn);
            }}
            className={`${bgColor} transition-all text-3xl md:text-4xl font-extrabold h-14 sm:h-16 landscape:h-12 md:landscape:h-16 lg:landscape:h-24 md:h-24 rounded-xl md:rounded-2xl flex items-center justify-center select-none ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none border-b-0 translate-y-1' : 'cursor-pointer'}`}
          >
            {btn}
          </button>
        );
      })}
    </div>
  );
};
