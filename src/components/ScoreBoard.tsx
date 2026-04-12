import React from 'react';

interface ScoreBoardProps {
  stars: number;
  bestStreak: number;
  unlockedBadgeIds: string[];
  bearsRescued: number;
  onOpenBadges?: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  stars,
  bestStreak,
  unlockedBadgeIds,
  bearsRescued,
  onOpenBadges,
}) => {
  return (
    <div className="scoreboard-panel w-full rounded-[1.75rem] bg-white px-3 py-2.5 shadow-sm md:px-4 md:py-3">
      <div className="scoreboard-stats mb-2 grid grid-cols-2 gap-2 md:grid-cols-4">
        <div className="scoreboard-card rounded-2xl bg-orange-50 px-3 py-2.5">
          <div className="scoreboard-label text-xs font-bold uppercase tracking-wide text-orange-600">Rescued Bears</div>
          <div className="scoreboard-value mt-1 text-lg font-extrabold text-orange-900 md:text-xl">
            🐻 {bearsRescued}
          </div>
        </div>
        <div className="scoreboard-card rounded-2xl bg-yellow-50 px-3 py-2.5">
          <div className="scoreboard-label text-xs font-bold uppercase tracking-wide text-yellow-600">Stars</div>
          <div className="scoreboard-value mt-1 text-lg font-extrabold text-gray-700 md:text-xl">⭐ {stars}</div>
        </div>
        <div className="scoreboard-card rounded-2xl bg-emerald-50 px-3 py-2.5">
          <div className="scoreboard-label text-xs font-bold uppercase tracking-wide text-emerald-600">Best Streak</div>
          <div className="scoreboard-value mt-1 text-lg font-extrabold text-gray-700 md:text-xl">🔥 {bestStreak}</div>
        </div>
        <button
          type="button"
          onClick={() => onOpenBadges?.()}
          className="scoreboard-badge-toggle flex min-h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-50 px-3 py-2 text-center shadow-sm ring-1 ring-yellow-200"
        >
          <div className="scoreboard-label text-xs font-bold uppercase tracking-wide text-amber-700">Badges</div>
          <div className="mt-1 rounded-full bg-white px-3 py-1 text-sm font-extrabold text-amber-700">
            🏅 {unlockedBadgeIds.length}
          </div>
          <div className="scoreboard-badge-copy mt-1 text-[11px] font-extrabold text-amber-900">Open</div>
        </button>
      </div>
    </div>
  );
};
