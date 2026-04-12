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
}

interface ExportedProgressFile {
  version: 1;
  exportedAt: string;
  progress: GameProgress;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // Streak Badges (Fire)
  { id: 'streak-2', name: 'Spark Start', emoji: '✨', description: 'Streak 2', checkUnlock: p => p.bestStreak >= 2 },
  { id: 'streak-5', name: 'Rocket Run', emoji: '🚀', description: 'Streak 5', checkUnlock: p => p.bestStreak >= 5 },
  { id: 'streak-10', name: 'Math Champion', emoji: '🏆', description: 'Streak 10', checkUnlock: p => p.bestStreak >= 10 },
  { id: 'streak-20', name: 'Galaxy Hero', emoji: '🪐', description: 'Streak 20', checkUnlock: p => p.bestStreak >= 20 },
  { id: 'streak-50', name: 'Legend Mode', emoji: '🐉', description: 'Streak 50', checkUnlock: p => p.bestStreak >= 50 },

  // Total Score / Accumulation (Stars)
  { id: 'total-50', name: 'Half Century', emoji: '🎯', description: '50 Correct', checkUnlock: p => p.stars >= 50 },
  { id: 'total-100', name: 'Century Club', emoji: '💯', description: '100 Correct', checkUnlock: p => p.stars >= 100 },
  { id: 'total-500', name: 'Star Catcher', emoji: '🌟', description: '500 Correct', checkUnlock: p => p.stars >= 500 },

  // Bears Rescued!
  { id: 'bear-hero-1', name: 'Bear Helper', emoji: '🐻', description: 'Rescue 1 Bear', checkUnlock: p => p.bearsRescued >= 1 },
  { id: 'bear-hero-5', name: 'Bear Savior', emoji: '🍯', description: 'Rescue 5 Bears', checkUnlock: p => p.bearsRescued >= 5 },
  { id: 'bear-hero-10', name: 'Forest King', emoji: '🌲', description: 'Rescue 10 Bears', checkUnlock: p => p.bearsRescued >= 10 },

  // Subtraction 
  { id: 'minus-10', name: 'Minus Novice', emoji: '➖', description: '10 Subtractions', checkUnlock: p => p.subtractionCorrect >= 10 },
  { id: 'minus-50', name: 'Minus Master', emoji: '🥷', description: '50 Subtractions', checkUnlock: p => p.subtractionCorrect >= 50 },

  // Speed / Fast Answers
  { id: 'fast-1', name: 'Lightning Flash', emoji: '⚡', description: 'Fast Answer!', checkUnlock: p => p.fastAnswers >= 1 },
  { id: 'fast-10', name: 'Time Ninja', emoji: '⏱️', description: '10 Fast Answers', checkUnlock: p => p.fastAnswers >= 10 },
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
