import React from 'react';
import { BADGE_DEFINITIONS } from '../utils/progress';

interface BadgeGalleryProps {
  unlockedBadgeIds: string[];
}

export const BadgeGallery: React.FC<BadgeGalleryProps> = ({ unlockedBadgeIds }) => {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-100 px-4 py-3 shadow-sm ring-1 ring-yellow-200">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-amber-700">Badge Collection</h2>
        <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-amber-700">
          {unlockedBadgeIds.length}/{BADGE_DEFINITIONS.length}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {BADGE_DEFINITIONS.map((badge) => {
          const unlocked = unlockedBadgeIds.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`rounded-2xl border-2 px-2 py-3 text-center transition-all ${
                unlocked
                  ? 'border-yellow-300 bg-white text-amber-700 shadow-sm'
                  : 'border-dashed border-yellow-200 bg-yellow-50 text-yellow-300'
              }`}
            >
              <div className="mb-1 text-3xl">{unlocked ? badge.emoji : '🔒'}</div>
              <div className="text-xs font-extrabold">{badge.name}</div>
              <div className="mt-1 text-[11px] font-semibold">
                {unlocked ? `Streak ${badge.streakRequired}` : `${badge.streakRequired} in a row`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
