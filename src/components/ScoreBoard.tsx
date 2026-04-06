import React from 'react';

interface ScoreBoardProps {
  score: { correct: number; total: number };
  difficultyLevel: number;
  onDifficultyChange: (level: number) => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, difficultyLevel, onDifficultyChange }) => {
  return (
    <div className="flex justify-between items-center w-full px-4 py-2 md:px-5 md:py-4 bg-white shadow-sm rounded-2xl mb-3 md:mb-6">
      <div className="text-lg md:text-xl font-bold text-gray-700 font-sans">
        Score: <span className="text-blue-500 bg-blue-50 px-2 py-1 md:px-3 md:py-1 rounded-lg ml-1">{score.correct} / {score.total}</span>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <label className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wide">Level</label>
        <select 
          value={difficultyLevel} 
          onChange={(e) => onDifficultyChange(Number(e.target.value))}
          className="bg-gray-100 text-gray-800 font-extrabold text-base md:text-lg py-1 px-2 md:py-2 md:px-3 rounded-xl outline-none appearance-none cursor-pointer border-2 border-transparent focus:border-blue-400 focus:bg-white transition-colors"
        >
          {[1, 2, 3, 4, 5].map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
