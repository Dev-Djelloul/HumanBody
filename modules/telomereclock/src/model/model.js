/* =========================================================================
   Modèle biologique : fonctions pures, sans React ni DOM (donc testables).
   Tous les chiffres sont des ordres de grandeur pédagogiques.
   ========================================================================= */

export const C = {
  START_BP: 10000,   // longueur à la naissance (≈ 8–12 kb chez l'humain)
  CRITICAL_BP: 4000, // seuil de sénescence réplicative (≈ 4–5 kb)
  BASE_LOSS: 100,    // pb perdues par division (50–200 selon les études)
  CELLS: 150,        // taille du tissu simulé
  MAX_LOOP: 120      // garde-fou pour la boucle « vie entière »
};

/**
 * Types cellulaires.
 * yearsPerDiv : échelle pédagogique entre divisions et temps de vie tissulaire.
 * anim        : multiplicateur de durée de l'animation d'une division manuelle.
 * loop        : multiplicateur de durée pendant la simulation « vie entière ».
 */
export const CELL_TYPES = {
  skin:   { id: 'skin',   divides: true,  yearsPerDiv: 1.0, anim: 0.7, loop: 0.1 },
  liver:  { id: 'liver',  divides: true,  yearsPerDiv: 2.0, anim: 1.0, loop: 0.2 },
  neuron: { id: 'neuron', divides: false, yearsPerDiv: Infinity, anim: 1, loop: 1 }
};

export const FACTORS = {
  stress:   { kind: 'neg', mult: 1.25 },
  smoking:  { kind: 'neg', mult: 1.30 },
  sleep:    { kind: 'neg', mult: 1.15 },
  diet:     { kind: 'pos', mult: 0.90 },
  exercise: { kind: 'pos', mult: 0.85 }
};

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/** Part de la perte annulée par la télomérase (0 à 1), t en %. */
export function telomeraseEffect(t) {
  if (t <= 0) return 0;
  if (t <= 30) return 0.25 * (t / 30);
  if (t < 80) return 0.25 + 0.75 * Math.pow((t - 30) / 50, 1.5);
  return 1;
}

export function lifestyleMultiplier(active) {
  let m = 1;
  for (const k of active) if (FACTORS[k]) m *= FACTORS[k].mult;
  return clamp(m, 0.6, 2);
}

/** Jauge d'inflammation (0–100) selon le nombre de cellules sénescentes accumulées. */
export const inflammationFrom = count => 100 * (1 - Math.exp(-0.22 * count));

/** Effet « pomme pourrie » : le SASP et le stress oxydatif accélèrent l'érosion des voisines. */
export const inflamMultiplier = g => 1 + 0.35 * clamp(g, 0, 100) / 100;

export function lossPerDivision(telo, active, inflam = 0) {
  const r = C.BASE_LOSS * lifestyleMultiplier(active) * inflamMultiplier(inflam) * (1 - telomeraseEffect(telo));
  return r < 0.5 ? 0 : r;
}

export function remainingDivisions(len, rate) {
  if (rate <= 0) return Infinity;
  return Math.max(0, Math.ceil((len - C.CRITICAL_BP) / rate));
}

export function zoneOf(t) {
  if (t >= 80) return 'alert';
  if (t > 30) return 'grey';
  if (t >= 15) return 'therapy';
  if (t > 0) return 'low';
  return 'none';
}

export const cancerRisk = t => 2 + 98 * Math.pow(t / 100, 2.5);
export const tissueDecline = t => 100 * (1 - telomeraseEffect(t));
export const renewalYears = (rate, yearsPerDiv) =>
  rate <= 0 || !isFinite(yearsPerDiv) ? Infinity : (C.START_BP - C.CRITICAL_BP) / rate * yearsPerDiv;

/** Déchets cellulaires (lipofuscine, protéines mal repliées) d'un neurone, en % de charge. */
export const wasteAt = (age, mult = 1) =>
  clamp(100 * Math.pow(clamp(age * mult / 105, 0, 1.5), 1.15), 0, 100);

/* ---------- Tissu simulé ---------- */
export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeCells(seed, n) {
  const r = mulberry32(seed), cells = [];
  for (let i = 0; i < n; i++) {
    const g = Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
    cells.push({ len0: clamp(C.START_BP + g * 600, 8000, 12000), jit: 0.8 + 0.4 * r(), u: r() });
  }
  return cells;
}

/**
 * État de chaque cellule à un âge donné : 0 saine, 1 sénescente (ou chargée de déchets
 * pour un neurone), 2 transformée. Un neurone ne se divise pas : seule la charge compte,
 * et il ne devient quasiment jamais cancéreux (les tumeurs cérébrales naissent de cellules gliales).
 */
export function tissueAt(cells, age, rate, risk, type = 'skin', wasteMult = 1) {
  const ct = CELL_TYPES[type] || CELL_TYPES.skin;
  let states;
  if (!ct.divides) {
    const p = wasteAt(age, wasteMult) / 100;
    states = cells.map(c => (c.u < p ? 1 : 0));
  } else {
    const divs = age / ct.yearsPerDiv;
    const pTum = (risk / 100) * Math.pow(Math.min(1, age / 75), 1.5) * 0.55;
    states = cells.map(c => {
      if (c.u < pTum) return 2;
      return (c.len0 - rate * c.jit * divs) <= C.CRITICAL_BP ? 1 : 0;
    });
  }
  const count = k => states.filter(s => s === k).length;
  return { states, healthy: count(0), sen: count(1), tum: count(2) };
}

/* ---------- Mythe « 35 ans contre 75 ans » ----------
   Répartition illustrative de 100 naissances selon l'âge au décès.
   Tranches : 0–5, 5–20, 20–40, 40–60, 60–80, 80 et plus. */
export const MORTALITY = {
  medieval: [33, 10, 15, 20, 20, 2],
  modern:   [0.4, 0.3, 1.5, 6, 22, 69.8]
};
export const MID_AGES = [2.5, 12.5, 30, 50, 70, 88];

export function meanAgeAtDeath(bins, fromBin = 0) {
  let s = 0, w = 0;
  for (let i = fromBin; i < bins.length; i++) { s += bins[i] * MID_AGES[i]; w += bins[i]; }
  return s / w;
}
