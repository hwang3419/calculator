import type { MathProblem } from './mathLogic';

export interface BadgeDefinition {
  id: string;
  name: string;
  emoji: string;
  description: string;
  checkUnlock: (progress: GameProgress) => boolean;
}

export interface GameProgress {
  stars: number;
  bestStreak: number;
  unlockedBadgeIds: string[];
  bearsRescued: number;
  subtractionCorrect: number;
  fastAnswers: number;
  totalAnswers: number;
  wrongProblems: MathProblem[];
}

interface ExportedProgressFile {
  version: 1;
  exportedAt: string;
  progress: GameProgress;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // Total Attempts / Effort (New Category)
  { id: 'attempts-1', name: 'First Step', emoji: '🐣', description: '1st Attempt', checkUnlock: p => p.totalAnswers >= 1 },
  { id: 'attempts-50', name: 'Growing Sprout', emoji: '🌱', description: '50 Attempts', checkUnlock: p => p.totalAnswers >= 50 },
  { id: 'attempts-200', name: 'Mighty Oak', emoji: '🌳', description: '200 Attempts', checkUnlock: p => p.totalAnswers >= 200 },
  { id: 'attempts-500', name: 'Iron Will', emoji: '🦾', description: '500 Attempts', checkUnlock: p => p.totalAnswers >= 500 },
  { id: 'attempts-1000', name: 'Big Brain', emoji: '🧠', description: '1000 Attempts', checkUnlock: p => p.totalAnswers >= 1000 },

  // Streak Badges (Fire)
  { id: 'streak-2', name: 'Spark Start', emoji: '✨', description: 'Streak 2', checkUnlock: p => p.bestStreak >= 2 },
  { id: 'streak-3', name: 'Firecracker', emoji: '🧨', description: 'Streak 3', checkUnlock: p => p.bestStreak >= 3 },
  { id: 'streak-5', name: 'Rocket Run', emoji: '🚀', description: 'Streak 5', checkUnlock: p => p.bestStreak >= 5 },
  { id: 'streak-10', name: 'Math Champion', emoji: '🏆', description: 'Streak 10', checkUnlock: p => p.bestStreak >= 10 },
  { id: 'streak-15', name: 'Comet Dash', emoji: '☄️', description: 'Streak 15', checkUnlock: p => p.bestStreak >= 15 },
  { id: 'streak-20', name: 'Galaxy Hero', emoji: '🪐', description: 'Streak 20', checkUnlock: p => p.bestStreak >= 20 },
  { id: 'streak-30', name: 'Mega Wizard', emoji: '🧙', description: 'Streak 30', checkUnlock: p => p.bestStreak >= 30 },
  { id: 'streak-50', name: 'Legend Mode', emoji: '🐉', description: 'Streak 50', checkUnlock: p => p.bestStreak >= 50 },
  { id: 'streak-75', name: 'Mythic Dragon', emoji: '🐲', description: 'Streak 75', checkUnlock: p => p.bestStreak >= 75 },
  { id: 'streak-100', name: 'Universe Master', emoji: '🌌', description: 'Streak 100', checkUnlock: p => p.bestStreak >= 100 },

  // Total Score / Accumulation (Stars)
  { id: 'total-5', name: 'High Five', emoji: '🖐️', description: '5 Correct', checkUnlock: p => p.stars >= 5 },
  { id: 'total-10', name: 'Bronze Coin', emoji: '🪙', description: '10 Correct', checkUnlock: p => p.stars >= 10 },
  { id: 'total-25', name: 'Silver Medal', emoji: '🥈', description: '25 Correct', checkUnlock: p => p.stars >= 25 },
  { id: 'total-50', name: 'Half Century', emoji: '🎯', description: '50 Correct', checkUnlock: p => p.stars >= 50 },
  { id: 'total-100', name: 'Century Club', emoji: '💯', description: '100 Correct', checkUnlock: p => p.stars >= 100 },
  { id: 'total-200', name: 'Diamond Hands', emoji: '💎', description: '200 Correct', checkUnlock: p => p.stars >= 200 },
  { id: 'total-500', name: 'Star Catcher', emoji: '🌟', description: '500 Correct', checkUnlock: p => p.stars >= 500 },
  { id: 'total-1000', name: 'Math Royalty', emoji: '👑', description: '1000 Correct', checkUnlock: p => p.stars >= 1000 },
  { id: 'total-9999', name: 'Unstoppable', emoji: '🤯', description: '9999 Correct', checkUnlock: p => p.stars >= 9999 },

  // Bears Rescued!
  { id: 'bear-hero-1', name: 'Bear Helper', emoji: '🐻', description: 'Rescue 1 Bear', checkUnlock: p => p.bearsRescued >= 1 },
  { id: 'bear-hero-2', name: 'Camp Scout', emoji: '🏕️', description: 'Rescue 2 Bears', checkUnlock: p => p.bearsRescued >= 2 },
  { id: 'bear-hero-5', name: 'Bear Savior', emoji: '🍯', description: 'Rescue 5 Bears', checkUnlock: p => p.bearsRescued >= 5 },
  { id: 'bear-hero-10', name: 'Forest King', emoji: '🌲', description: 'Rescue 10 Bears', checkUnlock: p => p.bearsRescued >= 10 },
  { id: 'bear-hero-15', name: 'Honey Finder', emoji: '🐝', description: 'Rescue 15 Bears', checkUnlock: p => p.bearsRescued >= 15 },
  { id: 'bear-hero-25', name: 'Circus Star', emoji: '🎪', description: 'Rescue 25 Bears', checkUnlock: p => p.bearsRescued >= 25 },
  { id: 'bear-hero-50', name: 'Bear Castle', emoji: '🏰', description: 'Rescue 50 Bears', checkUnlock: p => p.bearsRescued >= 50 },
  { id: 'bear-hero-100', name: 'Super Rescuer', emoji: '🦸', description: 'Rescue 100 Bears', checkUnlock: p => p.bearsRescued >= 100 },

  // Subtraction 
  { id: 'minus-1', name: 'Slice It', emoji: '🔪', description: '1 Subtraction', checkUnlock: p => p.subtractionCorrect >= 1 },
  { id: 'minus-10', name: 'Minus Novice', emoji: '➖', description: '10 Subtractions', checkUnlock: p => p.subtractionCorrect >= 10 },
  { id: 'minus-25', name: 'Scissor Hands', emoji: '✂️', description: '25 Subtractions', checkUnlock: p => p.subtractionCorrect >= 25 },
  { id: 'minus-50', name: 'Minus Master', emoji: '🥷', description: '50 Subtractions', checkUnlock: p => p.subtractionCorrect >= 50 },
  { id: 'minus-100', name: 'Ice Cold', emoji: '❄️', description: '100 Subtractions', checkUnlock: p => p.subtractionCorrect >= 100 },
  { id: 'minus-250', name: 'Downhill Skier', emoji: '📉', description: '250 Subtractions', checkUnlock: p => p.subtractionCorrect >= 250 },
  { id: 'minus-500', name: 'Black Hole', emoji: '🕳️', description: '500 Subtractions', checkUnlock: p => p.subtractionCorrect >= 500 },

  // Speed / Fast Answers
  { id: 'fast-1', name: 'Lightning Flash', emoji: '⚡', description: '1 Fast Answer', checkUnlock: p => p.fastAnswers >= 1 },
  { id: 'fast-5', name: 'Race Car', emoji: '🏎️', description: '5 Fast Answers', checkUnlock: p => p.fastAnswers >= 5 },
  { id: 'fast-10', name: 'Time Ninja', emoji: '⏱️', description: '10 Fast Answers', checkUnlock: p => p.fastAnswers >= 10 },
  { id: 'fast-25', name: 'Space Shuttle', emoji: '🛸', description: '25 Fast Answers', checkUnlock: p => p.fastAnswers >= 25 },
  { id: 'fast-50', name: 'Falling Star', emoji: '🌠', description: '50 Fast Answers', checkUnlock: p => p.fastAnswers >= 50 },
  { id: 'fast-100', name: 'Cheetah Sprint', emoji: '🐆', description: '100 Fast Answers', checkUnlock: p => p.fastAnswers >= 100 },
  { id: 'fast-500', name: 'Time Traveler', emoji: '⏳', description: '500 Fast Answers', checkUnlock: p => p.fastAnswers >= 500 },
];

const STORAGE_KEY = 'kids-math-progress-v1';

const DEFAULT_PROGRESS: GameProgress = {
  stars: 0,
  bestStreak: 0,
  unlockedBadgeIds: [],
  bearsRescued: 0,
  subtractionCorrect: 0,
  fastAnswers: 0,
  totalAnswers: 0,
  wrongProblems: [],
};

export function loadProgress(): GameProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;

    const parsed = JSON.parse(raw) as Partial<GameProgress>;
    return normalizeProgress(parsed);
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: GameProgress) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getUnlockedBadges(progress: GameProgress) {
  return BADGE_DEFINITIONS.filter((badge) => badge.checkUnlock(progress));
}

export function normalizeProgress(progress: Partial<GameProgress>): GameProgress {
  return {
    stars: Number.isFinite(progress.stars) ? Math.max(0, progress.stars as number) : 0,
    bestStreak: Number.isFinite(progress.bestStreak) ? Math.max(0, progress.bestStreak as number) : 0,
    unlockedBadgeIds: Array.isArray(progress.unlockedBadgeIds)
      ? progress.unlockedBadgeIds.filter((value): value is string => typeof value === 'string')
      : [],
    bearsRescued: Number.isFinite(progress.bearsRescued) ? Math.max(0, progress.bearsRescued as number) : 0,
    subtractionCorrect: Number.isFinite(progress.subtractionCorrect) ? Math.max(0, progress.subtractionCorrect as number) : 0,
    fastAnswers: Number.isFinite(progress.fastAnswers) ? Math.max(0, progress.fastAnswers as number) : 0,
    totalAnswers: Number.isFinite(progress.totalAnswers) ? Math.max(0, progress.totalAnswers as number) : 0,
    wrongProblems: Array.isArray(progress.wrongProblems) ? progress.wrongProblems : [],
  };
}

export function exportProgress(progress: GameProgress) {
  if (typeof window === 'undefined') return;

  const payload: ExportedProgressFile = {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  const stamp = payload.exportedAt.slice(0, 10);
  link.href = url;
  link.download = `kids-math-progress-${stamp}.json`;
  link.click();
  window.URL.revokeObjectURL(url);
}

export async function importProgressFile(file: File): Promise<GameProgress> {
  const text = await file.text();
  const parsed = JSON.parse(text) as Partial<ExportedProgressFile> | Partial<GameProgress>;

  if ('progress' in parsed && parsed.progress) {
    return normalizeProgress(parsed.progress);
  }

  return normalizeProgress(parsed as Partial<GameProgress>);
}
