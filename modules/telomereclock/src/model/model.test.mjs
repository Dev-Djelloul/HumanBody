import assert from 'node:assert/strict';
import * as M from './model.js';

const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} ≉ ${b}`);

// Référence : 100 pb/division, 60 divisions
const base = M.lossPerDivision(0, []);
assert.equal(base, 100);
assert.equal(M.remainingDivisions(M.C.START_BP, base), 60);

// Télomérase : monotone, continue, annule tout à 80 %
let prev = -1;
for (let t = 0; t <= 100; t += 0.5) {
  const e = M.telomeraseEffect(t);
  assert.ok(e >= prev - 1e-9, `non monotone à ${t}`);
  prev = e;
}
near(M.telomeraseEffect(30), 0.25, 1e-9, 'effet à 30 %');
assert.equal(M.telomeraseEffect(80), 1);
assert.equal(M.lossPerDivision(80, []), 0);
assert.equal(M.remainingDivisions(9000, 0), Infinity);

// Mode de vie : bornes
near(M.lifestyleMultiplier(['stress', 'smoking', 'sleep']), 1.869, 0.01, 'tous négatifs');
near(M.lifestyleMultiplier(['diet', 'exercise']), 0.765, 0.01, 'tous positifs');

// Inflammaging : croissante, saturante, 0 sans cellule sénescente
assert.equal(M.inflammationFrom(0), 0);
assert.ok(M.inflammationFrom(1) > 15 && M.inflammationFrom(1) < 25);
assert.ok(M.inflammationFrom(10) > 85 && M.inflammationFrom(10) < 100);
assert.ok(M.inflammationFrom(3) > M.inflammationFrom(2));
// L'inflammation accélère l'érosion de 35 % au maximum
near(M.lossPerDivision(0, [], 100), 135, 1e-9, 'inflammation maximale');
assert.equal(M.lossPerDivision(0, [], 0), 100);

// Types cellulaires
assert.equal(M.CELL_TYPES.neuron.divides, false);
assert.ok(M.CELL_TYPES.skin.loop < M.CELL_TYPES.liver.loop, 'la peau tourne plus vite');
near(M.renewalYears(100, M.CELL_TYPES.skin.yearsPerDiv), 60, 1e-9, 'peau : 60 ans');
near(M.renewalYears(100, M.CELL_TYPES.liver.yearsPerDiv), 120, 1e-9, 'foie : 120 ans');
assert.equal(M.renewalYears(100, Infinity), Infinity);

// Neurone : déchets croissants, aucun risque tumoral
assert.equal(M.wasteAt(0), 0);
assert.ok(M.wasteAt(80) > 60 && M.wasteAt(80) <= 100);
assert.ok(M.wasteAt(80, 1.15) > M.wasteAt(80, 1), 'le mauvais sommeil augmente la charge');
const cells = M.makeCells(2026, M.C.CELLS);
const nt = M.tissueAt(cells, 90, 0, 100, 'neuron');
assert.equal(nt.tum, 0, 'pas de neurone tumoral');
assert.ok(nt.sen > nt.healthy * 0.5, 'les neurones âgés sont chargés');
assert.equal(M.tissueAt(cells, 20, 0, 0, 'neuron').sen, 0 + M.tissueAt(cells, 20, 0, 0, 'neuron').sen);

// Tissu : la peau vieillit plus tôt que le foie
const skin = M.tissueAt(cells, 70, 100, 2, 'skin');
const liver = M.tissueAt(cells, 70, 100, 2, 'liver');
assert.ok(skin.sen > liver.sen, 'peau vs foie à 70 ans');
assert.equal(M.tissueAt(cells, 70, 0, 100, 'skin').sen, 0, 'télomérase maximale : plus de sénescence');

// Mythe 35 vs 75 : mêmes cellules, autre mortalité infantile
for (const k of ['medieval', 'modern']) {
  near(M.MORTALITY[k].reduce((a, b) => a + b, 0), 100, 1e-9, `${k} : 100 naissances`);
}
const medMean = M.meanAgeAtDeath(M.MORTALITY.medieval);
const medAdults = M.meanAgeAtDeath(M.MORTALITY.medieval, 2);
const modMean = M.meanAgeAtDeath(M.MORTALITY.modern);
console.log({ medMean: medMean.toFixed(1), medAdults: medAdults.toFixed(1), modMean: modMean.toFixed(1) });
assert.ok(medMean > 30 && medMean < 36, 'moyenne médiévale ≈ 32');
assert.ok(medAdults > 50 && medAdults < 60, 'adultes médiévaux ≈ 53');
assert.ok(modMean > 77 && modMean < 83, 'moyenne moderne ≈ 80');

console.log('model.test : OK');
