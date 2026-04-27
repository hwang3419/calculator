import React, { useEffect, useState } from 'react';
import bearRescueStages1 from '../assets/bear-rescue-stages.png';
import bearRescueStages2 from '../assets/bear-rescue-stages-2.png';
import bearRescueStages3 from '../assets/bear-rescue-stages-3.png';
import bearRescueStages4 from '../assets/bear-rescue-stages-4.png';
import bearRescueStages5 from '../assets/bear-rescue-stages-5.png';
// import bearRescueStages3 from '../assets/bear-rescue-stages-3.png';

// 将所有你想随机出现的图片放进这个数组里
const ALL_IMAGES = [
  bearRescueStages1,
  bearRescueStages2,
  bearRescueStages3,
  bearRescueStages4,
  bearRescueStages5,
];

type SceneReaction = 'idle' | 'sad' | 'success';

interface BearRescueSceneProps {
  stage: number;
  reaction: SceneReaction;
  stageProgress: number;
  answersPerStage: number;
}

const STAGE_COPY = [
  'Let’s help.',
  'Good job. We are closer.',
  'Almost there. One more push to rescue the bear.',
  'Success. The bear is smiling now!',
];

const IMAGE_POSITIONS = [
  { x: '0%', y: '0%' },
  { x: '-50%', y: '0%' },
  { x: '0%', y: '-50%' },
  { x: '-50%', y: '-50%' },
];

export const BearRescueScene: React.FC<BearRescueSceneProps> = ({ stage, reaction, stageProgress, answersPerStage }) => {
  const safeStage = Math.max(0, Math.min(stage, 3));
  const [displayStage, setDisplayStage] = useState(safeStage);
  const [incomingStage, setIncomingStage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const progressInCurrentStage = safeStage === 3 ? answersPerStage : stageProgress;

  useEffect(() => {
    // 每次重新开始（进度重置）时，随机抽取一张图片
    if (stage === 0 && stageProgress === 0) {
      setCurrentImageIndex(Math.floor(Math.random() * ALL_IMAGES.length));
    }
  }, [stage, stageProgress]);

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

  const currentImageUrl = ALL_IMAGES[currentImageIndex] || ALL_IMAGES[0];

  return (
    <div className="bear-scene mb-1 w-full overflow-hidden rounded-[1.5rem] md:rounded-[1.75rem] border-4 border-white bg-gradient-to-br from-emerald-100 via-sky-100 to-lime-100 p-2 md:p-3 shadow-sm">
      <div className="bear-scene-header mb-1 flex items-center justify-between gap-3">
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

      <div className="bear-scene-progress mb-2 h-2 overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 transition-all duration-700"
          style={{ width: `${(((safeStage * answersPerStage) + progressInCurrentStage) / (4 * answersPerStage)) * 100}%` }}
        />
      </div>

      <div className="bear-scene-image relative overflow-hidden rounded-[1.6rem] border-4 border-white/60 bg-white/40">
        <div className="aspect-[11/6] w-full" />

        <div
          className={`absolute inset-0 overflow-hidden transition-transform duration-500 ${reaction === 'sad' ? 'animate-bear-photo-shake' : reaction === 'success' ? 'animate-bear-photo-pop' : ''
            } ${incomingStage !== null ? 'animate-bear-stage-fade-out' : ''}`}
        >
          <img
            src={currentImageUrl}
            alt=""
            aria-hidden="true"
            className="pointer-events-none h-[200%] w-[200%] max-w-none select-none object-contain"
            draggable="false"
            style={{ transform: `translate(${currentImagePosition.x}, ${currentImagePosition.y})` }}
          />
        </div>

        {nextImagePosition && (
          <div className="absolute inset-0 overflow-hidden animate-bear-stage-fade-in">
            <img
              src={currentImageUrl}
              alt=""
              aria-hidden="true"
              className="pointer-events-none h-[200%] w-[200%] max-w-none select-none object-contain"
              draggable="false"
              style={{ transform: `translate(${nextImagePosition.x}, ${nextImagePosition.y})` }}
            />
          </div>
        )}

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
