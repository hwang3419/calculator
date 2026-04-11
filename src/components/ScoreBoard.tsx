import React, { useState } from 'react';
import { BadgeGallery } from './BadgeGallery';

interface ScoreBoardProps {
  score: { correct: number; total: number };
  stars: number;
  bestStreak: number;
  unlockedBadgeIds: string[];
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  stars,
  bestStreak,
  unlockedBadgeIds,
}) => {
  const [showBadges, setShowBadges] = useState(false);

  return (
    <div className="w-full rounded-[1.75rem] bg-white px-3 py-3 shadow-sm md:px-4 md:py-3">
      <div className="mb-2 grid gap-2 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 px-3 py-2.5">
          <div className="text-xs font-bold uppercase tracking-wide text-blue-500">Score</div>
          <div className="mt-1 text-lg font-extrabold text-gray-700 md:text-xl">
            {score.correct} / {score.total}
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-50 px-3 py-2.5">
          <div className="text-xs font-bold uppercase tracking-wide text-yellow-600">Stars</div>
          <div className="mt-1 text-lg font-extrabold text-gray-700 md:text-xl">⭐ {stars}</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-3 py-2.5">
          <div className="text-xs font-bold uppercase tracking-wide text-emerald-600">Best Streak</div>
          <div className="mt-1 text-lg font-extrabold text-gray-700 md:text-xl">🔥 {bestStreak}</div>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowBadges((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-50 px-4 py-2.5 text-left shadow-sm ring-1 ring-yellow-200"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-amber-700">Badges</div>
            <div className="mt-1 text-xs font-extrabold text-amber-900 md:text-sm">
              {showBadges ? 'Hide badge collection' : 'Tap to open badge collection'}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white px-3 py-1 text-sm font-extrabold text-amber-700">
              {unlockedBadgeIds.length}
            </span>
            <span className="text-2xl">{showBadges ? '▴' : '▾'}</span>
          </div>
        </button>

        {showBadges && (
          <div className="mt-2 max-h-44 overflow-y-auto">
            <BadgeGallery unlockedBadgeIds={unlockedBadgeIds} />
          </div>
        )}
      </div>
    </div>
  );
};
