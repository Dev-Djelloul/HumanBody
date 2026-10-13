import assert from 'node:assert/strict';
import {
  getResponseProfile,
  getResponseStage,
  RESPONSE_STAGE_COUNT
} from './model.js';

assert.equal(RESPONSE_STAGE_COUNT, 5);
assert.match(getResponseStage(0).fr, /rencontre/);
assert.match(getResponseStage(1).en, /Innate/);
assert.match(getResponseStage(2).fr, /adaptative/);
assert.match(getResponseStage(3).en, /Lymphocytes/);
assert.match(getResponseStage(4).fr, /mémoire/);

assert.ok(getResponseProfile('memory').delay < getResponseProfile('first').delay);
assert.ok(getResponseProfile('memory').strength > getResponseProfile('first').strength);
assert.throws(() => getResponseStage(-1), RangeError);
assert.throws(() => getResponseStage(1.5), RangeError);
assert.throws(() => getResponseStage(RESPONSE_STAGE_COUNT), RangeError);
assert.throws(() => getResponseProfile('unknown'), RangeError);

console.log('model.test : OK');
