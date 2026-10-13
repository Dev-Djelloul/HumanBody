import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import fr from './fr.js';
import en from './en.js';

const DICTS = { fr, en };
const Ctx = createContext(null);

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const fill = (s, vars) =>
  typeof s === 'string' ? s.replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] != null ? vars[k] : `{${k}}`)) : s;

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { const v = localStorage.getItem('tc.lang'); if (v === 'fr' || v === 'en') return v; } catch { /* ignore */ }
    return 'fr';
  });
  const setLang = useCallback(l => {
    setLangState(l);
    try { localStorage.setItem('tc.lang', l); } catch { /* ignore */ }
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const value = useMemo(() => {
    const t = (path, vars) => {
      const v = get(DICTS[lang], path);
      return fill(v !== undefined ? v : (get(fr, path) ?? path), vars);
    };
    const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
    const fmt = n => Math.round(n).toLocaleString(locale);
    return { lang, setLang, t, fmt };
  }, [lang, setLang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
