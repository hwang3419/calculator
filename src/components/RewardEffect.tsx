import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const REWARD_TYPES = ['car', 'train', 'rocket', 'stars'] as const;
type RewardType = typeof REWARD_TYPES[number];

interface RewardEffectProps {
  isHuge?: boolean;
}

export const RewardEffect: React.FC<RewardEffectProps> = ({ isHuge }) => {
  const [rewardType, setRewardType] = useState<RewardType>('stars');

  useEffect(() => {
    if (isHuge) {
      // Huge Confetti Celebration
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else {
      const randomType = REWARD_TYPES[Math.floor(Math.random() * REWARD_TYPES.length)];
      setRewardType(randomType);
    }
  }, [isHuge]);

  if (isHuge) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none flex items-center justify-center z-[100] overflow-hidden">
        <div className="text-9xl animate-bounce drop-shadow-2xl">
          🏆🎉🎊
        </div>
      </div>
    );
  }

  if (rewardType === 'car') {
    return (
      <div className="absolute top-1/2 left-0 w-full pointer-events-none overflow-hidden h-32 -translate-y-1/2 z-50">
        <div className="text-7xl animate-drive-across w-fit">
          🏎️💨
        </div>
      </div>
    );
  }

  if (rewardType === 'train') {
    return (
      <div className="absolute top-1/2 left-0 w-full pointer-events-none overflow-hidden h-32 -translate-y-1/2 z-50">
        <div className="text-7xl animate-drive-across-slow w-fit">
          🚂🚋🚋💨
        </div>
      </div>
    );
  }

  if (rewardType === 'rocket') {
    return (
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
        <div className="text-8xl animate-fly-up w-fit absolute bottom-0 left-1/4">
          🚀
        </div>
      </div>
    );
  }

  // stars default
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-around z-50 overflow-hidden">
      <div className="text-6xl animate-bounce">⭐</div>
      <div className="text-7xl animate-bounce delay-100">🌟</div>
      <div className="text-6xl animate-bounce delay-200">⭐</div>
    </div>
  );
};
