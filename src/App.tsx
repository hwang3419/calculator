import { useState, useEffect, useCallback } from 'react';
import { ScoreBoard } from './components/ScoreBoard';
import { ProblemDisplay } from './components/ProblemDisplay';
import { AnswerInput } from './components/AnswerInput';
import { NumberPad } from './components/NumberPad';
import { FeedbackBanner } from './components/FeedbackBanner';
import { RewardEffect } from './components/RewardEffect';
import { type MathProblem, generateProblem, checkAnswer } from './utils/mathLogic';
import { playRandomRewardSound } from './utils/audio';

function App() {
  const [difficultyLevel, setDifficultyLevel] = useState<number>(1);
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const initProblem = useCallback(() => {
    setCurrentProblem(generateProblem(difficultyLevel));
    setUserAnswer('');
    setFeedback(null);
  }, [difficultyLevel]);

  useEffect(() => {
    initProblem();
  }, [initProblem]);

  const handleNumberClick = (num: string) => {
    if (feedback) return; // Prevent input while feedback is showing
    if (userAnswer.length >= 3) return; // Max 3 digits
    setUserAnswer((prev) => prev + num);
  };

  const handleClear = () => {
    if (feedback) return;
    setUserAnswer('');
  };

  const handleSubmit = () => {
    if (feedback || !currentProblem || userAnswer === '') return;

    const isCorrect = checkAnswer(currentProblem, userAnswer);
    
    if (isCorrect) {
      playRandomRewardSound();
    }

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleDifficultyChange = (newLevel: number) => {
    setDifficultyLevel(newLevel);
    // When difficulty changes, we generate a new problem at that level
  };

  const getCorrectAnswer = (): number | undefined => {
    if (!currentProblem) return undefined;
    if (currentProblem.operator === '+') {
      return currentProblem.a + currentProblem.b;
    } else {
      return currentProblem.a - currentProblem.b;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] font-sans flex flex-col items-center py-6 px-4 selection:bg-transparent overflow-hidden">
      {feedback === 'correct' && <RewardEffect />}
      <div className="w-full max-w-md flex flex-col pt-2 md:pt-8 relative z-10">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-4xl font-extrabold text-center text-green-600 drop-shadow-sm tracking-tight bg-white px-6 py-2 rounded-full border-4 border-green-200">
            Kids Math <span className="inline-block hover:animate-spin">🚀</span>
          </h1>
        </div>
        
        <ScoreBoard 
          score={score} 
          difficultyLevel={difficultyLevel} 
          onDifficultyChange={handleDifficultyChange} 
        />

        <ProblemDisplay problem={currentProblem} />

        {feedback ? (
          <FeedbackBanner 
            status={feedback} 
            correctAnswer={getCorrectAnswer()} 
            onNext={initProblem} 
            onRetry={initProblem} 
          />
        ) : (
          <>
            <AnswerInput value={userAnswer} />
            <NumberPad 
              onNumberClick={handleNumberClick} 
              onClear={handleClear} 
              onSubmit={handleSubmit} 
              disabled={!!feedback}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
