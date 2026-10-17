// Enhanced synthetic audio & haptic feedback for CraveMatch
class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft haptic feedback
  public vibrate(pattern: number | number[] = 25) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // ignore on unsupported devices
      }
    }
  }

  // Soft button tap
  public playTap() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.vibrate(12);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio fallback silent
    }
  }

  // Swipe or pass sound
  public playSwipe(direction: 'like' | 'pass' | 'super') {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.vibrate(direction === 'like' ? [15, 30, 20] : 18);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (direction === 'like') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(680, this.ctx.currentTime + 0.14);
      } else if (direction === 'pass') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.12);
      } else {
        // Super
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.2);
      }

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch {
      // Audio fallback silent
    }
  }

  // Dice rolling clatter
  public playDiceRoll() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.vibrate([20, 20, 30, 20, 40]);

      const now = this.ctx.currentTime;
      for (let i = 0; i < 7; i++) {
        const time = now + i * 0.07 + Math.random() * 0.02;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240 + Math.random() * 260, time);
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.05);
      }
    } catch {
      // Audio fallback silent
    }
  }

  // Winning / Match fanfare chime
  public playSuccess() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.vibrate([30, 40, 50, 40, 80]);

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.16, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.32);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.32);
      });
    } catch {
      // Audio fallback silent
    }
  }

  // Notification chime (iOS style friendly ding)
  public playNotification() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.vibrate([25, 50, 25]);

      const now = this.ctx.currentTime;
      const f1 = 880; // A5
      const f2 = 1174.66; // D6

      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(f1, now);
      gain1.gain.setValueAtTime(0.14, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.18);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(f2, now + 0.09);
      gain2.gain.setValueAtTime(0.16, now + 0.09);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.09);
      osc2.stop(now + 0.28);
    } catch {
      // Silent fallback
    }
  }

  // Realistic Cookie / Ice-Cream Crunchy Bite ("Hırt!" Chomp)
  public playCrunchBite() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.vibrate([50, 25, 45]);

      const now = this.ctx.currentTime;

      // 1. Initial sharp crispy crack (chocolate coating / crisp cookie snap)
      const snapOsc = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snapOsc.type = 'sawtooth';
      snapOsc.frequency.setValueAtTime(1900, now);
      snapOsc.frequency.exponentialRampToValueAtTime(140, now + 0.045);
      snapGain.gain.setValueAtTime(0.42, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      snapOsc.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snapOsc.start(now);
      snapOsc.stop(now + 0.045);

      // 2. Granular crunch noise (crumbs & texture fractures)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const fracture = (i % 70 < 18) ? 2.2 : 0.7;
        data[i] = (Math.random() * 2 - 1) * fracture * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(2.8, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.48, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      // 3. Low resonant chew body ("hırt chomp thud")
      const thudOsc = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thudOsc.type = 'triangle';
      thudOsc.frequency.setValueAtTime(340, now);
      thudOsc.frequency.exponentialRampToValueAtTime(65, now + 0.12);
      thudGain.gain.setValueAtTime(0.38, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      thudOsc.connect(thudGain);
      thudGain.connect(this.ctx.destination);
      thudOsc.start(now);
      thudOsc.stop(now + 0.12);

      // 4. Secondary micro-crunch crumb follow-up (35ms delay)
      const crumbOsc = this.ctx.createOscillator();
      const crumbGain = this.ctx.createGain();
      crumbOsc.type = 'sine';
      crumbOsc.frequency.setValueAtTime(1100, now + 0.035);
      crumbOsc.frequency.exponentialRampToValueAtTime(280, now + 0.11);
      crumbGain.gain.setValueAtTime(0.22, now + 0.035);
      crumbGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      crumbOsc.connect(crumbGain);
      crumbGain.connect(this.ctx.destination);
      crumbOsc.start(now + 0.035);
      crumbOsc.stop(now + 0.11);
    } catch {
      // Audio fallback silent
    }
  }
}

export const sound = new SoundManager();
