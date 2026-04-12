export type Operator = '+' | '-';
export type ProblemMode = 'plus' | 'minus' | 'both';

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
      return ['+', '-'];
  }
}

export function generateProblem(settings: ProblemSettings): MathProblem {
  const maxAnswer = Math.max(1, settings.answerRange);
  const operators = getOperatorsForMode(settings.mode);
  const operator = operators[Math.floor(Math.random() * operators.length)];

  if (operator === '+') {
    const answer = Math.floor(Math.random() * (maxAnswer + 1));
    const b = Math.floor(Math.random() * (answer + 1));
    const a = answer - b;
    return { a, b, operator };
  }

  const answer = Math.floor(Math.random() * (maxAnswer + 1));
  const b = Math.floor(Math.random() * (maxAnswer - answer + 1));
  const a = answer + b;
  return { a, b, operator };
}

export function checkAnswer(problem: MathProblem, userAnswer: string): boolean {
  if (!userAnswer || userAnswer.trim() === '') return false;

  const correct =
    problem.operator === '+' ? problem.a + problem.b : problem.a - problem.b;

  return Number(userAnswer) === correct;
}
