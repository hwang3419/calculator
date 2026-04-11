import React from 'react';
import { BADGE_DEFINITIONS } from '../utils/progress';

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
  const handleOpenBadgesWindow = () => {
    const popup = window.open('', 'badge-collection', 'width=900,height=700,resizable=yes,scrollbars=yes');
    if (!popup) return;

    const badgeCards = BADGE_DEFINITIONS.map((badge) => {
      const unlocked = unlockedBadgeIds.includes(badge.id);
      return `
        <div class="badge-card ${unlocked ? 'unlocked' : 'locked'}">
          <div class="badge-emoji">${unlocked ? badge.emoji : '🔒'}</div>
          <div class="badge-name">${badge.name}</div>
          <div class="badge-meta">${unlocked ? `Streak ${badge.streakRequired}` : `${badge.streakRequired} in a row`}</div>
        </div>
      `;
    }).join('');

    popup.document.open();
    popup.document.write(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Badge Collection</title>
          <style>
            body {
              margin: 0;
              font-family: Arial, sans-serif;
              background: linear-gradient(180deg, #fef3c7 0%, #fff7ed 100%);
              color: #92400e;
            }
            .page {
              max-width: 980px;
              margin: 0 auto;
              padding: 24px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 16px;
              margin-bottom: 20px;
            }
            .title {
              font-size: 28px;
              font-weight: 800;
            }
            .count {
              background: white;
              border-radius: 999px;
              padding: 8px 14px;
              font-weight: 700;
              box-shadow: 0 4px 12px rgba(146, 64, 14, 0.12);
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 14px;
            }
            .badge-card {
              border-radius: 20px;
              padding: 16px 12px;
              text-align: center;
              border: 2px solid #fde68a;
              background: rgba(255, 255, 255, 0.85);
              box-shadow: 0 8px 24px rgba(146, 64, 14, 0.08);
            }
            .badge-card.locked {
              border-style: dashed;
              color: #d6a95a;
              background: rgba(255, 251, 235, 0.75);
            }
            .badge-emoji {
              font-size: 42px;
              margin-bottom: 8px;
            }
            .badge-name {
              font-size: 14px;
              font-weight: 800;
              margin-bottom: 6px;
            }
            .badge-meta {
              font-size: 12px;
              font-weight: 700;
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="header">
              <div class="title">Badge Collection</div>
              <div class="count">${unlockedBadgeIds.length}/${BADGE_DEFINITIONS.length}</div>
            </div>
            <div class="grid">${badgeCards}</div>
          </div>
        </body>
      </html>
    `);
    popup.document.close();
    popup.focus();
  };

  return (
    <div className="scoreboard-panel w-full rounded-[1.75rem] bg-white px-3 py-2.5 shadow-sm md:px-4 md:py-3">
      <div className="scoreboard-stats mb-2 grid grid-cols-2 gap-2 md:grid-cols-4">
        <div className="scoreboard-card rounded-2xl bg-blue-50 px-3 py-2.5">
          <div className="scoreboard-label text-xs font-bold uppercase tracking-wide text-blue-500">Score</div>
          <div className="scoreboard-value mt-1 text-lg font-extrabold text-gray-700 md:text-xl">
            {score.correct} / {score.total}
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
          onClick={handleOpenBadgesWindow}
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
