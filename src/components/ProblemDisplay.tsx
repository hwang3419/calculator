import React from 'react';
import type { MathProblem } from '../utils/mathLogic';

interface ProblemDisplayProps {
  problem: MathProblem | null;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem }) => {
  if (!problem) return null;

  return (
    <div className="mb-2 flex min-h-[88px] w-full items-center justify-center rounded-[1.75rem] border-4 border-white bg-white shadow-sm md:min-h-[118px]">
      <div className="flex items-center gap-2 text-4xl font-extrabold tracking-wider text-gray-800 md:gap-3 md:text-6xl">
        <span>{problem.a}</span>
        <span className={problem.operator === '+' ? "text-blue-500" : "text-purple-500"}>{problem.operator}</span>
        <span>{problem.b}</span>
        <span className="text-gray-300">=</span>
      </div>
    </div>
  );
};
