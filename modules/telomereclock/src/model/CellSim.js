import { C, clamp } from './model.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));
export const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Moteur d'une cellule suivie. Classe indépendante de React :
 * React s'y abonne avec useSyncExternalStore (voir hooks/useSim.js).
 * - subscribe / getVersion : changements d'état structurels (division, sénescence…)
 * - subscribeLen / getDisplayLen : longueur affichée, mise à jour à chaque image d'animation
 */
export class CellSim {
  constructor(name = 'subject') {
    this.name = name;
    this.listeners = new Set();
    this.lenListeners = new Set();
    this.version = 0;
    this.scene = null;       // poignée impérative fournie par <CellScene>
    this.cfg = { getRate: () => C.BASE_LOSS };
    this.alertMode = false;  // télomérase ≥ 80 % : couleur d'alerte
    this.looping = false;
    this.stop = false;
    this.resetState();
  }

  resetState() {
    this.len = C.START_BP;
    this.n = 0;
    this.senescent = false;
    this.busy = false;
    this.history = [{ n: 0, len: C.START_BP }];
    this.displayLen = C.START_BP;
    this.phase = { key: 'ready' };
    this.shownLimit = false;
  }

  subscribe = cb => { this.listeners.add(cb); return () => this.listeners.delete(cb); };
  getVersion = () => this.version;
  subscribeLen = cb => { this.lenListeners.add(cb); return () => this.lenListeners.delete(cb); };
  getDisplayLen = () => this.displayLen;

  emit() { this.version++; this.listeners.forEach(f => f()); }
  setDisplay(v) { this.displayLen = v; this.lenListeners.forEach(f => f()); }

  tween(from, to, ms) {
    return new Promise(res => {
      if (REDUCED || ms <= 0 || from === to) { this.scene?.setTel(to); this.setDisplay(to); return res(); }
      const t0 = performance.now();
      const step = now => {
        const p = clamp((now - t0) / ms, 0, 1), e = 1 - Math.pow(1 - p, 3), v = from + (to - from) * e;
        this.scene?.setTel(v); this.setDisplay(v);
        p < 1 ? requestAnimationFrame(step) : res();
      };
      requestAnimationFrame(step);
    });
  }

  /** Une division. Renvoie true si la cellule peut encore se diviser. */
  async divideOnce(k = 1) {
    if (this.busy || this.senescent) return false;
    this.busy = true;
    this.phase = { key: 'phaseS' };
    this.emit();
    const rate = this.cfg.getRate();
    const from = this.len;
    const to = rate > 0 ? Math.max(from - rate * (0.9 + Math.random() * 0.2), 3700) : from;
    this.phase = { key: rate > 0 ? 'phaseMitosis' : 'phaseMitosisTelo' };
    this.emit();
    if (this.scene) await this.scene.divide(k, (a, b, ms) => this.tween(a, b, ms), from, to);
    else await this.tween(from, to, 0);
    this.len = to; this.n++;
    this.history.push({ n: this.n, len: to });
    this.busy = false;
    this.cfg.onDivide?.(this);
    if (to <= C.CRITICAL_BP) {
      this.senescent = true;
      this.phase = { key: 'phaseSen' };
      this.emit();
      this.cfg.onSenescent?.(this);
      return false;
    }
    if (rate === 0 && this.n >= 60 && !this.shownLimit) {
      this.shownLimit = true;
      this.cfg.onEscape?.(this);
    }
    this.phase = { key: this.n === 1 ? 'phaseFirst' : 'ready' };
    this.emit();
    return true;
  }

  /** Divisions en boucle jusqu'à la sénescence, au plafond ou à l'arrêt manuel. */
  async loop(k, max = C.MAX_LOOP) {
    if (this.looping) { this.stop = true; return 'stopped'; }
    this.looping = true; this.stop = false; this.emit();
    let result = 'done', count = 0;
    while (!this.stop) {
      if (this.senescent) { result = 'senescent'; break; }
      if (count >= max) { result = 'cap'; break; }
      const ok = await this.divideOnce(k);
      count++;
      if (!ok) { result = this.senescent ? 'senescent' : 'blocked'; break; }
    }
    if (this.stop && !this.senescent) result = 'stopped';
    this.looping = false; this.stop = false; this.emit();
    return result;
  }

  requestStop() { if (this.looping) this.stop = true; }

  reset() {
    if (this.busy) return false;
    this.resetState();
    this.scene?.setTel(this.len);
    this.emit();
    this.setDisplay(this.len);
    return true;
  }
}

export { sleep };
