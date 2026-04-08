import React from 'react';
import type { ProblemMode } from '../utils/mathLogic';

interface ScoreBoardProps {
  score: { correct: number; total: number };
  problemMode: ProblemMode;
  answerRange: number;
  rangeOptions: readonly number[];
  onProblemModeChange: (mode: ProblemMode) => void;
  onAnswerRangeChange: (range: number) => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  problemMode,
  answerRange,
  rangeOptions,
  onProblemModeChange,
  onAnswerRangeChange,
}) => {
  return (
    <div className="w-full px-4 py-3 md:px-5 md:py-4 bg-white shadow-sm rounded-2xl mb-3 md:mb-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
      <div className="text-lg md:text-xl font-bold text-gray-700 font-sans">
        Score: <span className="text-blue-500 bg-blue-50 px-2 py-1 md:px-3 md:py-1 rounded-lg ml-1">{score.correct} / {score.total}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wide">Problem</label>
          <select 
            value={problemMode}
            onChange={(e) => onProblemModeChange(e.target.value as ProblemMode)}
            className="bg-gray-100 text-gray-800 font-extrabold text-sm md:text-base py-2 px-3 rounded-xl outline-none appearance-none cursor-pointer border-2 border-transparent focus:border-blue-400 focus:bg-white transition-colors"
          >
            <option value="plus">Plus</option>
            <option value="minus">Minus</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wide">Answer Range</label>
          <select 
            value={answerRange}
            onChange={(e) => onAnswerRangeChange(Number(e.target.value))}
            className="bg-gray-100 text-gray-800 font-extrabold text-sm md:text-base py-2 px-3 rounded-xl outline-none appearance-none cursor-pointer border-2 border-transparent focus:border-blue-400 focus:bg-white transition-colors"
          >
            {rangeOptions.map((range) => (
              <option key={range} value={range}>
                0 - {range}
              </option>
            ))}
          </select>
        </div>
      </div>
      </div>
    </div>
  );
};
