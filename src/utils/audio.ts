// Audio Manager using Native Web Audio API

// --- Sound Asset Paths (Placeholders - we will implement synthetic generators for now if assets missing, or use logic)
// ideally you would have /assets/sfx/hover.mp3, click.mp3, ambience.mp3
// For this environment, we can generate simple synth sounds or use placeholder URLs if strictly needed.
// However, Howler works best with files. I will assume we might utilize some public domain urls or setup the structure.
// NOTE: Since I can't generate mp3 files, I will create a component that manages sounds
// and uses some free reliable CDN sounds or strictly minimal browser Oscillator for 'clicks' if preferred,
// BUT standard practice is loading files. 
// I will setup the 'SoundManager' hook and try to use AudioContext for synthesized sounds to ensure it works without external dependencies immediately.

class AudioManager {
    private static instance: AudioManager;
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private ambientOsc: OscillatorNode | null = null;
    private isMuted: boolean = false;

    private constructor() {
        // Initialize Audio Context on user interaction to avoid autoplay policy issues
    }

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    public async init() {
        if (!this.ctx) {
            const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
            this.ctx = new AudioContextClass();
            this.masterGain = this.ctx.createGain();
            this.masterGain.connect(this.ctx.destination);
            this.masterGain.gain.value = 0.15; // Much lower volume (Subtle)
        }

        if (this.ctx.state === 'suspended') {
            try {
                await this.ctx.resume();
            } catch (e) {
                console.warn("Audio resume failed:", e);
            }
        }
    }

    public toggleMute() {
        if (!this.ctx || !this.masterGain) return;
        this.isMuted = !this.isMuted;
        this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime, 0.1);
        return this.isMuted;
    }

    // --- SFX 1: Simple UI Click ---
    public playClick() {
        if (!this.ctx || !this.masterGain) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    // --- SFX 2: Hover (Very subtle tech tick) ---
    public playHover() {
        if (!this.ctx || !this.masterGain) this.init();
        if (!this.ctx || !this.masterGain) return;

        // High frequency chirp
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2000, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime); // Very quiet
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    // --- SFX 3: Enter Experience (Cinematic Deep Impact) - One Shot, No Loop ---
    public playEnter() {
        if (!this.ctx || !this.masterGain) this.init();
        if (!this.ctx || !this.masterGain) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        // Deep sine drop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 2); // Slow drop

        gain.gain.setValueAtTime(0.8, this.ctx.currentTime); // Louder start
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2.5); // Long fade out

        osc.start();
        osc.stop(this.ctx.currentTime + 3);
    }
}

export const audioManager = AudioManager.getInstance();
