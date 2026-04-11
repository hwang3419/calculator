import React, { useEffect, useState } from 'react';
import bearRescueStages from '../assets/bear-rescue-stages.png';

type SceneReaction = 'idle' | 'sad' | 'success';

interface BearRescueSceneProps {
  stage: number;
  reaction: SceneReaction;
  stageProgress: number;
  answersPerStage: number;
}

const STAGE_COPY = [
  'The bear is locked in the cage. Let’s help.',
  'Good job. The bear is still crying, but we are closer.',
  'Almost there. One more push to rescue the bear.',
  'Success. The bear is smiling now!',
];

const IMAGE_POSITIONS = [
  { x: '100%', y: '100%' },
  { x: '0%', y: '100%' },
  { x: '100%', y: '0%' },
  { x: '0%', y: '0%' },
];

export const BearRescueScene: React.FC<BearRescueSceneProps> = ({ stage, reaction, stageProgress, answersPerStage }) => {
  const safeStage = Math.max(0, Math.min(stage, 3));
  const [displayStage, setDisplayStage] = useState(safeStage);
  const [incomingStage, setIncomingStage] = useState<number | null>(null);
  const progressInCurrentStage = safeStage === 3 ? answersPerStage : stageProgress;

  useEffect(() => {
    if (safeStage === displayStage) return;

    setIncomingStage(safeStage);

    const timer = window.setTimeout(() => {
      setDisplayStage(safeStage);
      setIncomingStage(null);
    }, 420);

    return () => {
      window.clearTimeout(timer);
    };
  }, [displayStage, safeStage]);

  const currentImagePosition = IMAGE_POSITIONS[displayStage];
  const nextImagePosition = incomingStage !== null ? IMAGE_POSITIONS[incomingStage] : null;

  return (
    <div className="mb-2 w-full overflow-hidden rounded-[1.75rem] border-4 border-white bg-gradient-to-br from-emerald-100 via-sky-100 to-lime-100 p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.22em] text-green-700">Rescue The Bear</div>
          <div className="mt-1 text-xs font-extrabold text-green-900 md:text-sm">{STAGE_COPY[safeStage]}</div>
          {safeStage < 3 && (
            <div className="mt-1 text-[11px] font-bold text-green-700">
              {progressInCurrentStage}/{answersPerStage} correct answers to unlock the next picture
            </div>
          )}
        </div>
        <div className="rounded-full bg-white px-3 py-2 text-xs font-black text-green-700 shadow-sm">
          Step {safeStage + 1}/4
        </div>
      </div>

      <div className="mb-3 h-2.5 overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 transition-all duration-700"
          style={{ width: `${(((safeStage * answersPerStage) + progressInCurrentStage) / (4 * answersPerStage)) * 100}%` }}
        />
      </div>

      <div className="relative overflow-hidden rounded-[1.6rem] border-4 border-white/60 bg-white/40">
        <div
          className={`absolute inset-0 aspect-[11/6] w-full bg-cover transition-transform duration-500 ${
            reaction === 'sad' ? 'animate-bear-photo-shake' : reaction === 'success' ? 'animate-bear-photo-pop' : ''
          } ${incomingStage !== null ? 'animate-bear-stage-fade-out' : ''}`}
          style={{
            backgroundImage: `url(${bearRescueStages})`,
            backgroundSize: '200% 200%',
            backgroundPosition: `${currentImagePosition.x} ${currentImagePosition.y}`,
          }}
        />

        {nextImagePosition && (
          <div
            className="absolute inset-0 aspect-[11/6] w-full animate-bear-stage-fade-in bg-cover"
            style={{
              backgroundImage: `url(${bearRescueStages})`,
              backgroundSize: '200% 200%',
              backgroundPosition: `${nextImagePosition.x} ${nextImagePosition.y}`,
            }}
          />
        )}

        <div
          className={`aspect-[11/6] w-full bg-cover transition-transform duration-500 ${
            incomingStage !== null ? 'opacity-0' : reaction === 'sad' ? 'animate-bear-photo-shake' : reaction === 'success' ? 'animate-bear-photo-pop' : ''
          }`}
          style={{
            backgroundImage: `url(${bearRescueStages})`,
            backgroundSize: '200% 200%',
            backgroundPosition: `${currentImagePosition.x} ${currentImagePosition.y}`,
          }}
        />

        {reaction === 'sad' && (
          <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-rose-500 shadow-sm">
            Oops... try again
          </div>
        )}

        {reaction === 'success' && (
          <div className="absolute inset-x-0 top-3 flex justify-center">
            <div className="animate-bear-success-banner rounded-full bg-white/90 px-4 py-2 text-sm font-black text-pink-600 shadow-sm">
              You saved the bear!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
