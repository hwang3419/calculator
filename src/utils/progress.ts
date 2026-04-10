export interface BadgeDefinition {
  id: string;
  name: string;
  emoji: string;
  streakRequired: number;
}

export interface GameProgress {
  stars: number;
  bestStreak: number;
  unlockedBadgeIds: string[];
}

interface ExportedProgressFile {
  version: 1;
  exportedAt: string;
  progress: GameProgress;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  { id: 'streak-2', name: 'Spark Start', emoji: '✨', streakRequired: 2 },
  { id: 'streak-3', name: 'Hot Streak', emoji: '🔥', streakRequired: 3 },
  { id: 'streak-4', name: 'Speedy Paws', emoji: '🐾', streakRequired: 4 },
  { id: 'streak-5', name: 'Rocket Run', emoji: '🚀', streakRequired: 5 },
  { id: 'streak-6', name: 'Sunny Solver', emoji: '🌞', streakRequired: 6 },
  { id: 'streak-7', name: 'Rainbow Rush', emoji: '🌈', streakRequired: 7 },
  { id: 'streak-8', name: 'Star Rider', emoji: '🌟', streakRequired: 8 },
  { id: 'streak-10', name: 'Math Champion', emoji: '🏆', streakRequired: 10 },
  { id: 'streak-12', name: 'Treasure Mind', emoji: '💎', streakRequired: 12 },
  { id: 'streak-15', name: 'Thunder Brain', emoji: '⚡', streakRequired: 15 },
  { id: 'streak-20', name: 'Galaxy Hero', emoji: '🪐', streakRequired: 20 },
  { id: 'streak-25', name: 'Golden Crown', emoji: '👑', streakRequired: 25 },
  { id: 'streak-30', name: 'Mega Wizard', emoji: '🧙', streakRequired: 30 },
  { id: 'streak-50', name: 'Legend Mode', emoji: '🐉', streakRequired: 50 },
];

const STORAGE_KEY = 'kids-math-progress-v1';

const DEFAULT_PROGRESS: GameProgress = {
  stars: 0,
  bestStreak: 0,
  unlockedBadgeIds: [],
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

export function getUnlockedBadges(bestStreak: number) {
  return BADGE_DEFINITIONS.filter((badge) => bestStreak >= badge.streakRequired);
}

export function normalizeProgress(progress: Partial<GameProgress>): GameProgress {
  return {
    stars: Number.isFinite(progress.stars) ? Math.max(0, progress.stars as number) : 0,
    bestStreak: Number.isFinite(progress.bestStreak) ? Math.max(0, progress.bestStreak as number) : 0,
    unlockedBadgeIds: Array.isArray(progress.unlockedBadgeIds)
      ? progress.unlockedBadgeIds.filter((value): value is string => typeof value === 'string')
      : [],
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
