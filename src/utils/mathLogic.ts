export type Operator = '+' | '-';

export interface MathProblem {
  a: number;
  b: number;
  operator: Operator;
}

export interface LevelConfig {
  min: number;
  max: number;
  ops: Operator[];
}

export function getConfigByLevel(level: number): LevelConfig {
  switch (level) {
    case 1:
      return { min: 0, max: 5, ops: ['+'] };
    case 2:
      return { min: 0, max: 10, ops: ['+'] };
    case 3:
      return { min: 0, max: 10, ops: ['+', '-'] };
    case 4:
      return { min: 0, max: 20, ops: ['+', '-'] };
    case 5:
      return { min: 0, max: 50, ops: ['+', '-'] };
    default:
      return { min: 0, max: 5, ops: ['+'] };
  }
}

export function generateProblem(level: number): MathProblem {
  const config = getConfigByLevel(level);
  const operator = config.ops[Math.floor(Math.random() * config.ops.length)];
  
  let a = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
  let b = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;

  if (operator === '-' && a < b) {
    [a, b] = [b, a];
  }

  return { a, b, operator };
}

export function checkAnswer(problem: MathProblem, userAnswer: string): boolean {
  if (!userAnswer || userAnswer.trim() === '') return false;
  
  const correct =
    problem.operator === '+' ? problem.a + problem.b : problem.a - problem.b;

  return Number(userAnswer) === correct;
}
