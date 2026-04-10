import { useState, useEffect, useCallback } from 'react';
import { ScoreBoard } from './components/ScoreBoard';
import { ProblemDisplay } from './components/ProblemDisplay';
import { AnswerInput } from './components/AnswerInput';
import { NumberPad } from './components/NumberPad';
import { FeedbackBanner } from './components/FeedbackBanner';
import { RewardEffect } from './components/RewardEffect';
import { BadgeUnlockEffect } from './components/BadgeUnlockEffect';
import { BearRescueScene } from './components/BearRescueScene';
import { ANSWER_RANGE_OPTIONS, type MathProblem, type ProblemMode, generateProblem, checkAnswer } from './utils/mathLogic';
import { getRandomEncouragingPhrase, playRandomRewardSound, initAudio, playEncouragingVoice, playHugeCelebrationSound } from './utils/audio';
import { exportProgress, getUnlockedBadges, importProgressFile, loadProgress, saveProgress, type BadgeDefinition, type GameProgress } from './utils/progress';

const AUTO_NEXT_DELAY_MS = 500;
const ENCOURAGEMENT_TEXT_DURATION_MS = 2200;
const REWARD_EFFECT_DURATION_MS = 3000;
const BADGE_UNLOCK_EFFECT_DURATION_MS = 2800;
const STORAGE_MESSAGE_DURATION_MS = 2800;
const BEAR_REACTION_DURATION_MS = 900;
const BEAR_SUCCESS_DURATION_MS = 2200;
const CORRECT_ANSWERS_PER_BEAR_STAGE = 3;

function App() {
  const [progress, setProgress] = useState<GameProgress>(() => loadProgress());
  const [problemMode, setProblemMode] = useState<ProblemMode>('plus');
  const [answerRange, setAnswerRange] = useState<number>(10);
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [isHugeCelebration, setIsHugeCelebration] = useState<boolean>(false);
  const [encouragementText, setEncouragementText] = useState<string | null>(null);
  const [showRewardEffect, setShowRewardEffect] = useState<boolean>(false);
  const [rewardEffectKey, setRewardEffectKey] = useState<number>(0);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<BadgeDefinition[]>([]);
  const [badgeEffectKey, setBadgeEffectKey] = useState<number>(0);
  const [storageMessage, setStorageMessage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [bearRescueStage, setBearRescueStage] = useState<number>(0);
  const [bearReaction, setBearReaction] = useState<'idle' | 'sad' | 'success'>('idle');
  const [bearStageProgress, setBearStageProgress] = useState<number>(0);

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

  useEffect(() => {
    if (!showRewardEffect) return;

    const timer = window.setTimeout(() => {
      setShowRewardEffect(false);
    }, REWARD_EFFECT_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [showRewardEffect, rewardEffectKey]);

  useEffect(() => {
    if (newlyUnlockedBadges.length === 0) return;

    const timer = window.setTimeout(() => {
      setNewlyUnlockedBadges([]);
    }, BADGE_UNLOCK_EFFECT_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [newlyUnlockedBadges, badgeEffectKey]);

  useEffect(() => {
    if (!storageMessage) return;

    const timer = window.setTimeout(() => {
      setStorageMessage(null);
    }, STORAGE_MESSAGE_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [storageMessage]);

  useEffect(() => {
    if (bearReaction === 'idle') return;

    const timer = window.setTimeout(() => {
      if (bearReaction === 'success') {
        setBearRescueStage(0);
        setBearStageProgress(0);
      }
      setBearReaction('idle');
    }, bearReaction === 'success' ? BEAR_SUCCESS_DURATION_MS : BEAR_REACTION_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [bearReaction]);

  useEffect(() => {
    const disableContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', disableContextMenu);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

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
      const shouldShowHugeCelebration = newStreak > 0 && newStreak % 10 === 0;
      const unlockedBadges = getUnlockedBadges(newStreak);
      const badgesToCelebrate = unlockedBadges.filter((badge) => !progress.unlockedBadgeIds.includes(badge.id));
      const nextBearStageProgress = bearStageProgress + 1;
      const shouldAdvanceBearStage = nextBearStageProgress >= CORRECT_ANSWERS_PER_BEAR_STAGE;
      const nextBearStage = shouldAdvanceBearStage ? Math.min(bearRescueStage + 1, 3) : bearRescueStage;
      const didRescueBear = nextBearStage === 3;
      setStreak(newStreak);
      setBearStageProgress(shouldAdvanceBearStage ? 0 : nextBearStageProgress);
      if (shouldAdvanceBearStage) {
        setBearRescueStage(nextBearStage);
      }
      setBearReaction(didRescueBear ? 'success' : 'idle');
      if (badgesToCelebrate.length > 0) {
        setNewlyUnlockedBadges(badgesToCelebrate);
        setBadgeEffectKey((prev) => prev + 1);
      }
      setProgress((prev) => ({
        stars: prev.stars + 1,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        unlockedBadgeIds: Array.from(new Set([...prev.unlockedBadgeIds, ...unlockedBadges.map((badge) => badge.id)])),
      }));

      if (didRescueBear) {
        const phrase = getRandomEncouragingPhrase();
        setEncouragementText(phrase);
        setIsHugeCelebration(shouldShowHugeCelebration);
        setShowRewardEffect(true);
        setRewardEffectKey((prev) => prev + 1);

        if (shouldShowHugeCelebration) {
          playHugeCelebrationSound();
        } else {
          playRandomRewardSound();
        }
        playEncouragingVoice(phrase);
      }
    } else {
      setStreak(0);
      setIsHugeCelebration(false);
      setEncouragementText(null);
      setShowRewardEffect(false);
      setBearReaction('sad');
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

  const handleExportProgress = () => {
    exportProgress(progress);
    setStorageMessage('Progress exported.');
  };

  const handleImportProgress = async (file: File) => {
    try {
      const importedProgress = await importProgressFile(file);
      setProgress(importedProgress);
      setStorageMessage('Progress imported.');
    } catch {
      setStorageMessage('Import failed. Please choose a valid progress file.');
    }
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
      {showRewardEffect && <RewardEffect key={rewardEffectKey} isHuge={isHugeCelebration} />}
      {newlyUnlockedBadges.length > 0 && <BadgeUnlockEffect key={badgeEffectKey} badges={newlyUnlockedBadges} />}
      {encouragementText && (
        <div className="pointer-events-none absolute inset-x-0 top-24 md:top-28 z-[110] flex justify-center px-4">
          <div className="animate-encouragement-pop rounded-full border-4 border-yellow-300 bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 px-6 py-3 text-center text-2xl font-extrabold text-orange-700 shadow-[0_16px_40px_rgba(251,191,36,0.45)] md:px-8 md:text-4xl">
            {encouragementText}
          </div>
        </div>
      )}

      <div className="w-full max-w-md landscape:max-w-4xl lg:max-w-4xl flex flex-col relative z-10 flex-grow py-2">
        <div className="absolute right-0 top-0 z-[130]">
          <button
            type="button"
            onClick={() => setShowSettings((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-200 bg-white text-lg shadow-sm transition-transform active:scale-95"
            aria-label="Open settings"
          >
            ⚙️
          </button>

          {showSettings && (
            <div className="absolute right-0 mt-2 w-72 rounded-3xl border-4 border-green-100 bg-white p-4 shadow-[0_20px_50px_rgba(34,197,94,0.18)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-extrabold uppercase tracking-wide text-green-700">Settings</div>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs font-extrabold text-gray-600"
                >
                  Close
                </button>
              </div>

              <div className="mb-3 flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Problem</label>
                <select
                  value={problemMode}
                  onChange={(e) => handleProblemModeChange(e.target.value as ProblemMode)}
                  className="cursor-pointer appearance-none rounded-xl border-2 border-transparent bg-gray-100 px-3 py-2 text-sm font-extrabold text-gray-800 outline-none transition-colors focus:border-blue-400 focus:bg-white"
                >
                  <option value="plus">Plus</option>
                  <option value="minus">Minus</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div className="mb-3 flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Answer Range</label>
                <select
                  value={answerRange}
                  onChange={(e) => handleAnswerRangeChange(Number(e.target.value))}
                  className="cursor-pointer appearance-none rounded-xl border-2 border-transparent bg-gray-100 px-3 py-2 text-sm font-extrabold text-gray-800 outline-none transition-colors focus:border-blue-400 focus:bg-white"
                >
                  {ANSWER_RANGE_OPTIONS.map((range) => (
                    <option key={range} value={range}>
                      0 - {range}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleExportProgress}
                  className="rounded-2xl bg-sky-100 px-4 py-3 text-sm font-extrabold text-sky-800 shadow-sm ring-1 ring-sky-200 transition-transform active:scale-[0.98]"
                >
                  Export
                </button>
                <label className="flex cursor-pointer items-center justify-center rounded-2xl bg-lime-100 px-4 py-3 text-sm font-extrabold text-lime-800 shadow-sm ring-1 ring-lime-200 transition-transform active:scale-[0.98]">
                  Import
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        void handleImportProgress(file);
                      }
                      event.target.value = '';
                    }}
                  />
                </label>
              </div>

              {storageMessage && (
                <div className="mt-3 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700">
                  {storageMessage}
                </div>
              )}
            </div>
          )}
        </div>

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
            stars={progress.stars}
            bestStreak={progress.bestStreak}
            unlockedBadgeIds={progress.unlockedBadgeIds}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col landscape:flex-row lg:flex-row w-full gap-2 md:gap-8 flex-grow items-center justify-center">

          {/* Left Side: Problem & Input */}
          <div className="w-full landscape:w-1/2 lg:w-1/2 flex flex-col items-center justify-center max-w-md">
            <BearRescueScene
              stage={bearRescueStage}
              reaction={bearReaction}
              stageProgress={bearStageProgress}
              answersPerStage={CORRECT_ANSWERS_PER_BEAR_STAGE}
            />
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
