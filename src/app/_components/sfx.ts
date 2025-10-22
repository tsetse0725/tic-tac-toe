type AudioContextCtor = new () => AudioContext;
interface WindowMaybeWebkit extends Window {
  webkitAudioContext?: AudioContextCtor;
  AudioContext: AudioContextCtor;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as WindowMaybeWebkit;
  const Ctor: AudioContextCtor | undefined = w.AudioContext ?? w.webkitAudioContext;
  return Ctor ? new Ctor() : null;
}


let globalVolume = 0.25;


export function setVolume(v: number) {
  globalVolume = Math.min(Math.max(v, 0), 1);
}


function makeTone(
  type: OscillatorType,
  freq: number | number[],
  duration = 0.3,
  volume = globalVolume
) {
  const audio = getAudioContext();
  if (!audio) return;

  const now = audio.currentTime;
  const freqs = Array.isArray(freq) ? freq : [freq];
  let startTime = now;

  for (const f of freqs) {
    const o = audio.createOscillator();
    const g = audio.createGain();
    o.type = type;
    o.frequency.value = f;
    o.connect(g);
    g.connect(audio.destination);

    g.gain.setValueAtTime(0.0001, startTime);
    g.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    o.start(startTime);
    o.stop(startTime + duration);

    startTime += duration * 0.6;
  }
}


export function clickTone(vol?: number) {
  makeTone("sine", 440, 0.13, vol ?? globalVolume);
}


export function winJingle(vol?: number) {
  makeTone("triangle", [523.25, 659.25, 783.99], 0.22, vol ?? globalVolume);
}


export function drawTone(vol?: number) {
  const audio = getAudioContext();
  if (!audio) return;
  const o = audio.createOscillator();
  const g = audio.createGain();
  o.connect(g);
  g.connect(audio.destination);
  o.type = "sawtooth";
  const now = audio.currentTime;
  o.frequency.setValueAtTime(440, now);
  o.frequency.exponentialRampToValueAtTime(220, now + 0.35);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(vol ?? globalVolume, now + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
  o.start(now);
  o.stop(now + 0.42);
}
