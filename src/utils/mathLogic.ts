export type Operator = '+' | '-';
export type ProblemMode = 'plus' | 'minus' | 'both' | 'mistakes';

export interface MathProblem {
  a: number;
  b: number;
  operator: Operator;
}

export interface ProblemSettings {
  mode: ProblemMode;
  answerRange: number;
}

export const ANSWER_RANGE_OPTIONS = [5, 10, 20, 50, 100] as const;

function getOperatorsForMode(mode: ProblemMode): Operator[] {
  switch (mode) {
    case 'plus':
      return ['+'];
    case 'minus':
      return ['-'];
    case 'both':
    case 'mistakes':
      return ['+', '-'];
  }
}

export function generateProblem(settings: ProblemSettings, mistakePool: MathProblem[] = []): MathProblem {
  if (settings.mode === 'mistakes' && mistakePool.length > 0) {
    return mistakePool[Math.floor(Math.random() * mistakePool.length)];
  }

  const maxAnswer = Math.max(5, settings.answerRange);
  const operators = getOperatorsForMode(settings.mode);
  const operator = operators[Math.floor(Math.random() * operators.length)];

  if (operator === '+') {
    // Addition: a + b = answer
    // Exclude x+0, 0+x, and 1+1 (sum < 3 or any operand is 0)
    const minSum = 3;
    const answer = Math.floor(Math.random() * (maxAnswer - minSum + 1)) + minSum;
    // b must be at least 1, and a must be at least 1 (so b <= answer - 1)
    const b = Math.floor(Math.random() * (answer - 1)) + 1;
    const a = answer - b;
    return { a, b, operator };
  }

  // Subtraction: a - b = answer
  // Allow a - b = 0 (same numbers) and a - b >= 2, but exclude a - b = 1 and b = 0
  const a = Math.floor(Math.random() * (maxAnswer - 1 + 1)) + 1;
  const bChoices = [a]; // Always allow a - b = 0
  for (let val = 1; val <= a - 2; val++) {
    bChoices.push(val); // Allow a - b >= 2
  }
  const b = bChoices[Math.floor(Math.random() * bChoices.length)];
  return { a, b, operator };
}

export function checkAnswer(problem: MathProblem, userAnswer: string): boolean {
  if (!userAnswer || userAnswer.trim() === '') return false;

  const correct =
    problem.operator === '+' ? problem.a + problem.b : problem.a - problem.b;

  return Number(userAnswer) === correct;
}
