import assert from 'node:assert/strict';
import { calculateOutputs, DEFAULTS, STROKE_VOLUME_ML } from './model.js';

const rest = calculateOutputs(DEFAULTS);
assert.equal(rest.strokeVolume, STROKE_VOLUME_ML);
assert.equal(rest.cardiacOutput, 5.25);
assert.equal(rest.meanPressure, 94.5);

const faster = calculateOutputs({ heartRate: 100, resistance: 18 });
assert.equal(faster.cardiacOutput, 7);
assert.equal(faster.meanPressure, 126);

const moreResistance = calculateOutputs({ heartRate: 75, resistance: 20 });
assert.equal(moreResistance.cardiacOutput, rest.cardiacOutput);
assert.equal(moreResistance.meanPressure, 105);

for (const input of [
  { heartRate: 39, resistance: 18 },
  { heartRate: 141, resistance: 18 },
  { heartRate: 75, resistance: 13.9 },
  { heartRate: 75, resistance: 22.1 },
  { heartRate: Number.NaN, resistance: 18 },
  { heartRate: 75, resistance: Number.POSITIVE_INFINITY }
]) {
  assert.throws(() => calculateOutputs(input), RangeError);
}

console.log('model.test : OK');
