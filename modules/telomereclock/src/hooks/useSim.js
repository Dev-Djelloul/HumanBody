import { useSyncExternalStore } from 'react';

/** S'abonne aux changements structurels d'une CellSim (division, sénescence, boucle…). */
export function useSim(sim) {
  useSyncExternalStore(sim.subscribe, sim.getVersion);
  return sim;
}

/** S'abonne à la longueur affichée, mise à jour à chaque image d'animation. */
export function useSimLen(sim) {
  return useSyncExternalStore(sim.subscribeLen, sim.getDisplayLen);
}
