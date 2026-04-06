import React, { useEffect, useState } from 'react';

const REWARD_TYPES = ['car', 'train', 'rocket', 'stars'] as const;
type RewardType = typeof REWARD_TYPES[number];

export const RewardEffect: React.FC = () => {
  const [rewardType, setRewardType] = useState<RewardType>('stars');

  useEffect(() => {
    // Pick a random reward animation
    const randomType = REWARD_TYPES[Math.floor(Math.random() * REWARD_TYPES.length)];
    setRewardType(randomType);
  }, []);

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
