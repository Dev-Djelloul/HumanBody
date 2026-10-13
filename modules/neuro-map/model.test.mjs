import assert from 'node:assert/strict';
import { getPlasticityLevel, MAX_STIMULATIONS } from './model.js';

assert.equal(getPlasticityLevel(0), 0);
assert.equal(getPlasticityLevel(1), 1);
assert.equal(getPlasticityLevel(MAX_STIMULATIONS), MAX_STIMULATIONS);
assert.equal(getPlasticityLevel(MAX_STIMULATIONS + 1), MAX_STIMULATIONS);

for (const input of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
  assert.throws(() => getPlasticityLevel(input), RangeError);
}

console.log('model.test : OK');
