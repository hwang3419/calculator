// Simple Web Audio API sound synthesizer for reward effects

let audioCtx: AudioContext | any = null;
let unlocked = false;

export function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }

  if (!unlocked) {
    // Play a silent sound to unlock mobile browsers (especially iOS Safari)
    const buffer = audioCtx.createBuffer(1, 1, 22050);
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    unlocked = true;
  }
}

function playTone(freq: number, type: OscillatorType, duration: number, startTime: number) {
  if (!audioCtx) return;

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime + startTime);
  
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime + startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start(audioCtx.currentTime + startTime);
  oscillator.stop(audioCtx.currentTime + startTime + duration);
}

export function playRandomRewardSound() {
  initAudio();

  const effectIndex = Math.floor(Math.random() * 4);

  switch(effectIndex) {
    case 0: // Magic Chime
      playTone(523.25, 'sine', 0.5, 0); // C5
      playTone(659.25, 'sine', 0.5, 0.1); // E5
      playTone(783.99, 'sine', 0.5, 0.2); // G5
      playTone(1046.50, 'sine', 1.0, 0.3); // C6
      break;
    case 1: // Race Car vroom (low ramp up)
      {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(50, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.8);
        
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.0);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 1.0);
      }
      break;
    case 2: // Train Choo Choo
      playTone(300, 'square', 0.2, 0);
      playTone(300, 'square', 0.4, 0.3);
      break;
    case 3: // Happy Beep
      playTone(400, 'square', 0.1, 0);
      playTone(600, 'square', 0.2, 0.15);
      break;
  }
}
