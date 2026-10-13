const MAX_STIMULATIONS = 4;

export function getPlasticityLevel(stimulations) {
  if (!Number.isInteger(stimulations) || stimulations < 0) {
    throw new RangeError('Stimulations must be a non-negative integer.');
  }

  return Math.min(stimulations, MAX_STIMULATIONS);
}

export { MAX_STIMULATIONS };
