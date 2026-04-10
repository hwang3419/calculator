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
    <div className="w-full rounded-2xl bg-white px-4 py-3 shadow-sm md:px-5 md:py-4">
      <div className="mb-3 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 px-4 py-3">
          <div className="text-xs font-bold uppercase tracking-wide text-blue-500">Score</div>
          <div className="mt-1 text-xl font-extrabold text-gray-700">
            {score.correct} / {score.total}
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-50 px-4 py-3">
          <div className="text-xs font-bold uppercase tracking-wide text-yellow-600">Stars</div>
          <div className="mt-1 text-xl font-extrabold text-gray-700">⭐ {stars}</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-4 py-3">
          <div className="text-xs font-bold uppercase tracking-wide text-emerald-600">Best Streak</div>
          <div className="mt-1 text-xl font-extrabold text-gray-700">🔥 {bestStreak}</div>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowBadges((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-50 px-4 py-3 text-left shadow-sm ring-1 ring-yellow-200"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-amber-700">Badges</div>
            <div className="mt-1 text-sm font-extrabold text-amber-900">
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
          <div className="mt-3">
            <BadgeGallery unlockedBadgeIds={unlockedBadgeIds} />
          </div>
        )}
      </div>
    </div>
  );
};
