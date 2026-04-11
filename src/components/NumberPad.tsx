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
    <div className="numberpad mx-auto grid w-full max-w-md grid-cols-3 gap-2">
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
            className={`numberpad-button ${bgColor} flex h-16 select-none items-center justify-center rounded-2xl text-3xl font-extrabold transition-all md:h-20 md:text-4xl ${disabled ? 'pointer-events-none translate-y-1 cursor-not-allowed border-b-0 opacity-50' : 'cursor-pointer'}`}
          >
            {btn}
          </button>
        );
      })}
    </div>
  );
};
