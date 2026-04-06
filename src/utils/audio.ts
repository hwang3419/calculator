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

export function playNumberClickSound() {
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 0.05); 
  
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.05);
}

export function playRandomRewardSound() {
  initAudio();

  const effectIndex = Math.floor(Math.random() * 6);

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
    case 4: // Upward Arpeggio
      playTone(440, 'sine', 0.1, 0); // A4
      playTone(554.37, 'sine', 0.1, 0.1); // C#5
      playTone(659.25, 'sine', 0.1, 0.2); // E5
      playTone(880, 'sine', 0.3, 0.3); // A5
      break;
    case 5: // Laser/Pew
      {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
      }
      break;
  }
}

export function playHugeCelebrationSound() {
  initAudio();
  // Fanfare sequence
  playTone(523.25, 'triangle', 0.2, 0); // C5
  playTone(659.25, 'triangle', 0.2, 0.1); // E5
  playTone(783.99, 'triangle', 0.2, 0.2); // G5
  
  playTone(659.25, 'triangle', 0.2, 0.4); // E5
  playTone(783.99, 'triangle', 0.2, 0.5); // G5
  playTone(1046.5, 'triangle', 0.2, 0.6); // C6

  playTone(783.99, 'square', 0.6, 0.8); // G5
  playTone(1046.5, 'square', 0.6, 0.8); // C6
  playTone(1318.5, 'square', 0.6, 0.8); // E6
}

const ENCOURAGING_PHRASES = [
  "Good job!",
  "Awesome!",
  "Great!",
  "Well done!",
  "You are amazing!",
  "Fantastic!",
  "Super!",
  "Excellent!",
  "Perfect!",
  "You got it!",
  "Way to go!",
  "Brilliant!",
  "You're a star!",
  "Keep it up!",
  "Incredible!",
  "Spectacular!",
  "Outstanding!",
  "Bingo!",
  "Spot on!",
  "You're on fire!",
  "Math genius!",
  "Super duper!",
  "Nailed it!",
  "Terrific!",
  "Magnificent!",
  "Mind-blowing!",
  "You're a genius!",
  "Hooray!",
  "Yippee!",
  "Woohoo!",
  "That's right!",
  "Exactly!",
  "Phenomenal!",
  "Stupendous!",
  "Marvelous!",
  "Rock on!",
  "Unbelievable!",
  "First class!",
  "Top notch!",
  "Out of this world!",
  "Right on target!",
  "A plus work!",
  "You're crushing it!",
  "Lightning fast!",
  "Bravo!"
];

export function playEncouragingVoice() {
  if (!('speechSynthesis' in window)) return;
  
  const phrase = ENCOURAGING_PHRASES[Math.floor(Math.random() * ENCOURAGING_PHRASES.length)];
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.pitch = 1.2; // A bit higher pitch for kids
  utterance.rate = 1.1;  // Slightly faster and energetic
  utterance.volume = 1;
  
  // Try to find an English female or cheerful voice
  const voices = window.speechSynthesis.getVoices();
  const goodVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English')));
  if (goodVoice) {
    utterance.voice = goodVoice;
  }

  window.speechSynthesis.speak(utterance);
}

