import { useCallback, useRef, useState } from 'react';

const KEY = 'tc.progress.v1';
export const BADGE_IDS = [
  'first', 'senescent', 'lifespan', 'types', 'therapy', 'trap',
  'life', 'senolytics', 'compare', 'myth', 'quiz', 'escape'
];

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { badges: Array.isArray(raw.badges) ? raw.badges : [], types: Array.isArray(raw.types) ? raw.types : [] };
  } catch { return { badges: [], types: [] }; }
}
function save(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* stockage indisponible : on continue sans */ } }

/** Progression du « journal de laboratoire », mémorisée dans le navigateur (facultatif). */
export function useProgress(onUnlock) {
  const [p, setP] = useState(load);
  const ref = useRef(p);
  ref.current = p;
  const cb = useRef(onUnlock);
  cb.current = onUnlock;

  const unlock = useCallback(id => {
    if (ref.current.badges.includes(id)) return;
    const next = { ...ref.current, badges: [...ref.current.badges, id] };
    ref.current = next; setP(next); save(next);
    cb.current?.(id);
  }, []);

  const trackType = useCallback(type => {
    if (ref.current.types.includes(type)) return;
    const next = { ...ref.current, types: [...ref.current.types, type] };
    ref.current = next; setP(next); save(next);
    if (next.types.length >= 3) unlock('types');
  }, [unlock]);

  const reset = useCallback(() => { const e = { badges: [], types: [] }; ref.current = e; setP(e); save(e); }, []);

  return { badges: p.badges, has: id => p.badges.includes(id), unlock, trackType, reset, count: p.badges.length, total: BADGE_IDS.length };
}
