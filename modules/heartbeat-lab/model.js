export const DEFAULTS = Object.freeze({ heartRate: 75, resistance: 18 });
export const STROKE_VOLUME_ML = 70;

export function calculateOutputs({ heartRate, resistance }) {
  if (!Number.isFinite(heartRate) || heartRate < 40 || heartRate > 140) {
    throw new RangeError('heartRate must be between 40 and 140 bpm');
  }
  if (!Number.isFinite(resistance) || resistance < 14 || resistance > 22) {
    throw new RangeError('resistance must be between 14 and 22 mmHg·min/L');
  }

  const cardiacOutput = heartRate * STROKE_VOLUME_ML / 1000;
  return {
    strokeVolume: STROKE_VOLUME_ML,
    cardiacOutput,
    meanPressure: cardiacOutput * resistance
  };
}
