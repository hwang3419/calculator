import React from 'react';
import type { BadgeDefinition } from '../utils/progress';

interface BadgeUnlockEffectProps {
  badges: BadgeDefinition[];
}

export const BadgeUnlockEffect: React.FC<BadgeUnlockEffectProps> = ({ badges }) => {
  if (badges.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-40 z-[120] flex justify-center px-4">
      <div className="animate-badge-burst w-full max-w-md rounded-[2rem] border-4 border-amber-300 bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 px-5 py-4 text-center shadow-[0_20px_60px_rgba(251,191,36,0.45)]">
        <div className="mb-2 text-sm font-black uppercase tracking-[0.24em] text-amber-700">
          New Badge Unlocked
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge) => (
            <div key={badge.id} className="rounded-2xl bg-white/85 px-4 py-3 shadow-sm ring-2 ring-amber-200">
              <div className="text-4xl">{badge.emoji}</div>
              <div className="mt-1 text-sm font-extrabold text-amber-800">{badge.name}</div>
              <div className="text-xs font-bold text-amber-600">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
