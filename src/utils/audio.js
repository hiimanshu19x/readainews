// Web Audio API Synthesizer for Magnifier Searching Animation & Card Dealing
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Futuristic magnifier radar / search sweep sound
  playMagnifierScan() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Primary radar sweep: Frequency modulated bandpass filter
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 0.6);
      filter.frequency.exponentialRampToValueAtTime(700, now + 1.2);
      filter.Q.setValueAtTime(4.5, now);

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.exponentialRampToValueAtTime(950, now + 0.5);
      osc1.frequency.exponentialRampToValueAtTime(320, now + 1.1);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.15, now + 0.12);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

      osc1.connect(filter);
      filter.connect(gain1);
      gain1.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 1.25);

      // Sci-fi sonar ping pulses during the scan
      const blipOffsets = [0.15, 0.42, 0.72, 0.98];
      blipOffsets.forEach((offset, idx) => {
        const pingOsc = this.ctx.createOscillator();
        const pingGain = this.ctx.createGain();
        const pingTime = now + offset;

        pingOsc.type = 'sine';
        pingOsc.frequency.setValueAtTime(1200 + idx * 220, pingTime);
        pingOsc.frequency.exponentialRampToValueAtTime(700, pingTime + 0.09);

        pingGain.gain.setValueAtTime(0.08, pingTime);
        pingGain.gain.exponentialRampToValueAtTime(0.001, pingTime + 0.09);

        pingOsc.connect(pingGain);
        pingGain.connect(this.ctx.destination);

        pingOsc.start(pingTime);
        pingOsc.stop(pingTime + 0.1);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Crisp card deal / flip snap sound
  playCardDeal(index = 0) {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520 + index * 45, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // Subtle UI click sound
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.04);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }
}

export const sound = new SoundEngine();
