import React from 'react';
import type { MathProblem } from '../utils/mathLogic';

interface ProblemDisplayProps {
  problem: MathProblem | null;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem }) => {
  if (!problem) return null;

  return (
    <div className="flex justify-center items-center w-full min-h-[120px] md:min-h-[180px] bg-white rounded-3xl shadow-sm mb-3 md:mb-6 border-4 border-white">
      <div className="text-6xl md:text-8xl font-extrabold text-gray-800 tracking-wider flex gap-3 md:gap-4 items-center">
        <span>{problem.a}</span>
        <span className={problem.operator === '+' ? "text-blue-500" : "text-purple-500"}>{problem.operator}</span>
        <span>{problem.b}</span>
        <span className="text-gray-300">=</span>
      </div>
    </div>
  );
};
