// Procedural SFX via Web Audio — no audio files needed.
let ctx = null;
let muted = false;
const listeners = new Set();

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone({ f = 440, f2 = null, t = 0.08, type = 'square', vol = 0.06, delay = 0 }) {
  const a = ac();
  if (!a || muted) return;
  const o = a.createOscillator();
  const g = a.createGain();
  const now = a.currentTime + delay;
  o.type = type;
  o.frequency.setValueAtTime(f, now);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, now + t);
  g.gain.setValueAtTime(vol, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + t);
  o.connect(g).connect(a.destination);
  o.start(now);
  o.stop(now + t + 0.02);
}

function noise({ t = 0.25, vol = 0.07, from = 3000, to = 300, delay = 0 }) {
  const a = ac();
  if (!a || muted) return;
  const len = Math.floor(a.sampleRate * t);
  const buf = a.createBuffer(1, len, a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = a.createBufferSource();
  src.buffer = buf;
  const filt = a.createBiquadFilter();
  filt.type = 'bandpass';
  const now = a.currentTime + delay;
  filt.frequency.setValueAtTime(from, now);
  filt.frequency.exponentialRampToValueAtTime(to, now + t);
  const g = a.createGain();
  g.gain.value = vol;
  src.connect(filt).connect(g).connect(a.destination);
  src.start(now);
}

export const sfx = {
  hover() { tone({ f: 880, f2: 1320, t: 0.05, type: 'square', vol: 0.035 }); },
  move() { tone({ f: 520, f2: 780, t: 0.06, type: 'triangle', vol: 0.05 }); },
  select() {
    tone({ f: 330, t: 0.07, type: 'square', vol: 0.07 });
    tone({ f: 660, t: 0.09, type: 'square', vol: 0.07, delay: 0.06 });
    tone({ f: 990, t: 0.14, type: 'sawtooth', vol: 0.05, delay: 0.12 });
  },
  back() { tone({ f: 600, f2: 200, t: 0.14, type: 'sawtooth', vol: 0.06 }); },
  whoosh() { noise({ t: 0.32, vol: 0.09, from: 4000, to: 250 }); },
  slash() {
    noise({ t: 0.18, vol: 0.1, from: 7000, to: 900 });
    tone({ f: 1200, f2: 80, t: 0.16, type: 'sawtooth', vol: 0.05 });
  },
  boot() {
    tone({ f: 196, t: 0.18, type: 'square', vol: 0.06 });
    tone({ f: 294, t: 0.18, type: 'square', vol: 0.06, delay: 0.1 });
    tone({ f: 392, t: 0.3, type: 'square', vol: 0.06, delay: 0.2 });
    noise({ t: 0.4, vol: 0.07, from: 800, to: 6000, delay: 0.05 });
  },
  take() {
    noise({ t: 0.1, vol: 0.1, from: 5000, to: 1500 });
    tone({ f: 140, f2: 60, t: 0.2, type: 'sine', vol: 0.18 });
  },
  isMuted: () => muted,
  setMuted(v) { muted = v; listeners.forEach((l) => l(muted)); },
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  unlock() { ac(); },
};
