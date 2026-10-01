/**
 * ============================================================================
 * Sarangi Audio Engine
 * Background audio loop providing a soft, ambient instrumental Sarangi melody
 * with sympathetic Tanpura drone, authentic bowed meend (slides), and seamless looping.
 *
 * Supports playing local audio tracks as well as an authentic procedural
 * Web Audio Sarangi synthesizer fallback that loops indefinitely without gaps.
 * ============================================================================
 */

class SarangiAudioEngine {
  private ctx: AudioContext | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private isSynthesizing = false;
  private synthInterval: number | null = null;
  private droneOscillators: Array<{ osc: OscillatorNode; gain: GainNode }> = [];
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.65;
  private src = `${import.meta.env.BASE_URL}assets/music/Alfaaz.mp3`;

  // Listeners
  private onStateChangeCallbacks: Array<
    (playing: boolean, progress: number, duration: number, muted: boolean) => void
  > = [];

  constructor() {
    // Initialized on demand
  }

  public init(src?: string) {
    if (src) this.src = src;
    if (typeof window === 'undefined') return;

    if (!this.audioEl) {
      this.audioEl = new Audio(this.src);
      this.audioEl.loop = true;
      this.audioEl.volume = this.isMuted ? 0 : this.volume;

      this.audioEl.addEventListener('timeupdate', () => {
        if (!this.isSynthesizing && this.audioEl) {
          const cur = this.audioEl.currentTime || 0;
          const dur = this.audioEl.duration || 180;
          this.notify(true, cur, dur);
        }
      });

      this.audioEl.addEventListener('ended', () => {
        // Continuous background loop
        if (this.isPlaying && this.audioEl) {
          this.audioEl.currentTime = 0;
          this.audioEl.play().catch(() => this.startSarangiSynthesizer());
        }
      });

      this.audioEl.addEventListener('error', () => {
        if (this.isPlaying) {
          this.startSarangiSynthesizer();
        }
      });
    }
  }

  public subscribe(
    cb: (playing: boolean, progress: number, duration: number, muted: boolean) => void
  ) {
    this.onStateChangeCallbacks.push(cb);
    // Notify immediately with current state
    cb(this.isPlaying, 0, 180, this.isMuted);
    return () => {
      this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter((c) => c !== cb);
    };
  }

  private notify(playing: boolean, progress: number, duration: number) {
    this.isPlaying = playing;
    this.onStateChangeCallbacks.forEach((cb) => cb(playing, progress, duration, this.isMuted));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public async togglePlay(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      await this.play();
      return true;
    }
  }

  public async toggleMute(): Promise<boolean> {
    if (!this.isPlaying) {
      // If stopped, unmuting starts playback
      await this.play();
      return true;
    }

    if (this.isMuted) {
      this.unmute();
      return true;
    } else {
      this.mute();
      return false;
    }
  }

  public mute() {
    this.isMuted = true;
    if (this.audioEl) {
      this.audioEl.volume = 0;
    }
    if (this.isSynthesizing) {
      this.pause();
    }
    this.notify(false, 0, 180);
  }

  public async unmute() {
    this.isMuted = false;
    if (this.audioEl) {
      this.audioEl.volume = this.volume;
    }
    await this.play();
  }

  public async play() {
    this.isMuted = false;
    if (!this.audioEl && this.src) {
      this.init(this.src);
    }

    try {
      if (this.audioEl) {
        this.audioEl.volume = this.volume;
        await this.audioEl.play();
        this.isSynthesizing = false;
        this.isPlaying = true;
        this.notify(true, this.audioEl.currentTime, this.audioEl.duration || 180);
      }
    } catch {
      // If audio file playback is blocked or fails, start our soft ambient Sarangi synthesis
      this.startSarangiSynthesizer();
    }
  }

  public pause() {
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.isSynthesizing) {
      this.stopSarangiSynthesizer();
    }
    this.isPlaying = false;
    this.notify(false, 0, 180);
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioEl && !this.isMuted) {
      this.audioEl.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public seek(ratio: number) {
    if (this.audioEl && this.audioEl.duration) {
      this.audioEl.currentTime = ratio * this.audioEl.duration;
    }
  }

  // =========================================================================
  // Authentic Soft Instrumental Sarangi & Tanpura Synthesis
  // =========================================================================
  private startSarangiSynthesizer() {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.stopSarangiSynthesizer();
      this.isSynthesizing = true;
      this.isPlaying = true;

      // 1. Sympathetic Tanpura Drone Foundation (Sa: C3 130.81Hz, Pa: G3 196Hz, Sa': C4 261.63Hz)
      this.startTanpuraDrone();

      // 2. Soft Bowed Sarangi Melody in Raag Yaman / Bhairavi
      // Rich classical frequencies: Sa, Re, Ga, Ma(t), Pa, Dha, Ni, Sa'
      const swaras = [
        261.63, // Sa  (C4)
        293.66, // Re  (D4)
        329.63, // Ga  (E4)
        369.99, // Ma' (F#4)
        392.0,  // Pa  (G4)
        440.0,  // Dha (A4)
        493.88, // Ni  (B4)
        523.25, // Sa' (C5)
        587.33, // Re' (D5)
        659.25, // Ga' (E5)
      ];

      // A gentle, poetic nocturnal bandish phrase with melodic slides
      const phrase = [
        { swarIdx: 0, dur: 2.2, slideTo: 1 },
        { swarIdx: 2, dur: 2.8, slideTo: 3 },
        { swarIdx: 4, dur: 3.2, slideTo: 4 },
        { swarIdx: 3, dur: 2.0, slideTo: 2 },
        { swarIdx: 1, dur: 2.4, slideTo: 0 },
        { swarIdx: 0, dur: 3.5, slideTo: 0 },
        { swarIdx: 4, dur: 2.6, slideTo: 5 },
        { swarIdx: 6, dur: 2.8, slideTo: 7 },
        { swarIdx: 7, dur: 3.6, slideTo: 6 },
        { swarIdx: 4, dur: 2.5, slideTo: 2 },
        { swarIdx: 2, dur: 2.8, slideTo: 1 },
        { swarIdx: 0, dur: 4.2, slideTo: 0 },
      ];

      let phraseStep = 0;
      let synthTimerSec = 0;

      const playBowedSarangiNote = () => {
        if (!this.isSynthesizing || !this.ctx) return;
        const now = this.ctx.currentTime;
        const currentItem = phrase[phraseStep % phrase.length];
        const freq = swaras[currentItem.swarIdx % swaras.length];
        const nextFreq = swaras[currentItem.slideTo % swaras.length];
        const noteDuration = currentItem.dur;
        phraseStep++;

        // Primary bowed string oscillator (softened sawtooth for gut string harmonics)
        const bowOsc = this.ctx.createOscillator();
        bowOsc.type = 'sawtooth';
        bowOsc.frequency.setValueAtTime(freq, now);

        // Vocal warmth undertone (sine body resonance)
        const bodyOsc = this.ctx.createOscillator();
        bodyOsc.type = 'sine';
        bodyOsc.frequency.setValueAtTime(freq, now);

        // Subtle singing vibrato (Gamak LFO at 5.2Hz)
        const vibratoLfo = this.ctx.createOscillator();
        const vibratoGain = this.ctx.createGain();
        vibratoLfo.frequency.setValueAtTime(5.2, now);
        vibratoGain.gain.setValueAtTime(0, now);
        // Vibrato gently swells on sustained notes after initial bow stroke
        vibratoGain.gain.linearRampToValueAtTime(3.8, now + 0.6);
        vibratoLfo.connect(bowOsc.frequency);
        vibratoLfo.connect(bodyOsc.frequency);
        vibratoLfo.start(now);
        vibratoLfo.stop(now + noteDuration + 0.5);

        // Authentic Meend (Continuous Glissando / Bowed Slide)
        if (freq !== nextFreq) {
          const slideStart = now + noteDuration * 0.45;
          const slideEnd = now + noteDuration * 0.9;
          bowOsc.frequency.exponentialRampToValueAtTime(freq, slideStart);
          bowOsc.frequency.exponentialRampToValueAtTime(nextFreq, slideEnd);
          bodyOsc.frequency.exponentialRampToValueAtTime(freq, slideStart);
          bodyOsc.frequency.exponentialRampToValueAtTime(nextFreq, slideEnd);
        }

        // Formant filter mimicking the hollow wooden resonator covered with parchment skin
        const skinFilter = this.ctx.createBiquadFilter();
        skinFilter.type = 'lowpass';
        skinFilter.frequency.setValueAtTime(850, now);
        skinFilter.Q.setValueAtTime(1.8, now);
        skinFilter.frequency.exponentialRampToValueAtTime(620, now + noteDuration);

        // Bow envelope: gentle curved attack (0.25s) and tender release
        const bowGain = this.ctx.createGain();
        bowGain.gain.setValueAtTime(0.0001, now);
        // Soft bow bite
        bowGain.gain.linearRampToValueAtTime(0.08 * this.volume, now + 0.28);
        bowGain.gain.exponentialRampToValueAtTime(0.05 * this.volume, now + noteDuration * 0.85);
        bowGain.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration + 0.35);

        // Routing
        bowOsc.connect(skinFilter);
        bodyOsc.connect(skinFilter);
        skinFilter.connect(bowGain);
        bowGain.connect(this.ctx.destination);

        bowOsc.start(now);
        bodyOsc.start(now);
        bowOsc.stop(now + noteDuration + 0.4);
        bodyOsc.stop(now + noteDuration + 0.4);

        synthTimerSec += Math.round(noteDuration);
        this.notify(true, synthTimerSec % 180, 180);
      };

      playBowedSarangiNote();
      this.synthInterval = window.setInterval(playBowedSarangiNote, 2700);
    } catch {
      this.isSynthesizing = false;
      this.isPlaying = false;
      this.notify(false, 0, 0);
    }
  }

  // Soft continuous Tanpura background drone for authentic classical warmth
  private startTanpuraDrone() {
    if (!this.ctx) return;
    this.stopDrone();

    const droneFreqs = [130.81, 196.0, 261.63]; // C3, G3, C4
    droneFreqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.018 * this.volume, this.ctx.currentTime + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      this.droneOscillators.push({ osc, gain });
    });
  }

  private stopDrone() {
    this.droneOscillators.forEach(({ osc, gain }) => {
      try {
        if (this.ctx) {
          gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
        }
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        }, 450);
      } catch {
        // ignore
      }
    });
    this.droneOscillators = [];
  }

  private stopSarangiSynthesizer() {
    this.isSynthesizing = false;
    if (this.synthInterval !== null) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.stopDrone();
  }
}

export const ghazalAudio = new SarangiAudioEngine();
export const sarangiAudio = ghazalAudio; // Alias for semantic clarity
