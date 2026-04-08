import { useState, useEffect, useCallback } from 'react';
import { ScoreBoard } from './components/ScoreBoard';
import { ProblemDisplay } from './components/ProblemDisplay';
import { AnswerInput } from './components/AnswerInput';
import { NumberPad } from './components/NumberPad';
import { FeedbackBanner } from './components/FeedbackBanner';
import { RewardEffect } from './components/RewardEffect';
import { ANSWER_RANGE_OPTIONS, type MathProblem, type ProblemMode, generateProblem, checkAnswer } from './utils/mathLogic';
import { getRandomEncouragingPhrase, playRandomRewardSound, initAudio, playEncouragingVoice, playHugeCelebrationSound } from './utils/audio';

const AUTO_NEXT_DELAY_MS = 3200;
const ENCOURAGEMENT_TEXT_DURATION_MS = 2200;

function App() {
  const [problemMode, setProblemMode] = useState<ProblemMode>('plus');
  const [answerRange, setAnswerRange] = useState<number>(10);
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [isHugeCelebration, setIsHugeCelebration] = useState<boolean>(false);
  const [encouragementText, setEncouragementText] = useState<string | null>(null);

  const initProblem = useCallback(() => {
    setCurrentProblem(generateProblem({ mode: problemMode, answerRange }));
    setUserAnswer('');
    setFeedback(null);
  }, [answerRange, problemMode]);

  useEffect(() => {
    initProblem();
  }, [initProblem]);

  useEffect(() => {
    if (feedback !== 'correct') return;

    const timer = window.setTimeout(() => {
      initProblem();
    }, AUTO_NEXT_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [feedback, initProblem]);

  useEffect(() => {
    if (!encouragementText) return;

    const timer = window.setTimeout(() => {
      setEncouragementText(null);
    }, ENCOURAGEMENT_TEXT_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [encouragementText]);

  const handleNumberClick = (num: string) => {
    initAudio(); // Unlock audio context on first interaction
    if (feedback) return; // Prevent input while feedback is showing
    if (userAnswer.length >= String(answerRange).length) return;
    setUserAnswer((prev) => prev + num);
  };

  const handleClear = () => {
    initAudio();
    if (feedback) return;
    setUserAnswer('');
  };

  const handleSubmit = () => {
    if (feedback || !currentProblem || userAnswer === '') return;

    const isCorrect = checkAnswer(currentProblem, userAnswer);
    
    if (isCorrect) {
      const newStreak = streak + 1;
      const phrase = getRandomEncouragingPhrase();
      setStreak(newStreak);
      setEncouragementText(phrase);
      
      if (newStreak > 0 && newStreak % 10 === 0) {
        setIsHugeCelebration(true);
        playHugeCelebrationSound();
      } else {
        setIsHugeCelebration(false);
        playRandomRewardSound();
      }
      playEncouragingVoice(phrase);
    } else {
      setStreak(0);
      setIsHugeCelebration(false);
      setEncouragementText(null);
    }

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleProblemModeChange = (newMode: ProblemMode) => {
    setProblemMode(newMode);
  };

  const handleAnswerRangeChange = (newRange: number) => {
    setAnswerRange(newRange);
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
    <div className="min-h-[100dvh] bg-[#f0fdf4] font-sans flex flex-col items-center py-2 md:py-6 px-4 selection:bg-transparent overflow-x-hidden">
      {feedback === 'correct' && <RewardEffect isHuge={isHugeCelebration} />}
      {encouragementText && (
        <div className="pointer-events-none absolute inset-x-0 top-24 md:top-28 z-[110] flex justify-center px-4">
          <div className="animate-encouragement-pop rounded-full border-4 border-yellow-300 bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 px-6 py-3 text-center text-2xl font-extrabold text-orange-700 shadow-[0_16px_40px_rgba(251,191,36,0.45)] md:px-8 md:text-4xl">
            {encouragementText}
          </div>
        </div>
      )}
      
      <div className="w-full max-w-md landscape:max-w-4xl lg:max-w-4xl flex flex-col relative z-10 flex-grow py-2">
        
        {/* Header */}
        <div className="flex justify-center items-center mb-2 md:mb-6 shrink-0">
          <h1 className="text-2xl md:text-4xl font-extrabold text-center text-green-600 drop-shadow-sm tracking-tight bg-white px-4 md:px-6 py-1 md:py-2 rounded-full border-4 border-green-200">
            Kids Math <span className="inline-block hover:animate-spin">🚀</span>
          </h1>
        </div>
        
        {/* ScoreBoard */}
        <div className="shrink-0 max-w-md mx-auto w-full landscape:max-w-lg lg:max-w-lg">
          <ScoreBoard 
            score={score} 
            problemMode={problemMode}
            answerRange={answerRange}
            rangeOptions={ANSWER_RANGE_OPTIONS}
            onProblemModeChange={handleProblemModeChange}
            onAnswerRangeChange={handleAnswerRangeChange}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col landscape:flex-row lg:flex-row w-full gap-2 md:gap-8 flex-grow items-center justify-center">
          
          {/* Left Side: Problem & Input */}
          <div className="w-full landscape:w-1/2 lg:w-1/2 flex flex-col items-center justify-center max-w-md">
            <ProblemDisplay problem={currentProblem} />

            {feedback ? (
              <FeedbackBanner 
                status={feedback} 
                correctAnswer={getCorrectAnswer()} 
                onRetry={initProblem} 
              />
            ) : (
              <AnswerInput value={userAnswer} />
            )}
          </div>

          {/* Right Side: Number Pad */}
          {!feedback && (
            <div className="w-full landscape:w-1/2 lg:w-1/2 flex items-center justify-center max-w-md mt-2 md:mt-0">
              <NumberPad 
                onNumberClick={handleNumberClick} 
                onClear={handleClear} 
                onSubmit={handleSubmit} 
                disabled={!!feedback}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
