import { useSim, useSimLen } from '../hooks/useSim.js';
import { useI18n } from '../i18n/index.jsx';

export default function Header({ sim, rate, progress, onJournal }) {
  const { t, fmt, lang, setLang } = useI18n();
  useSim(sim);
  const len = useSimLen(sim);
  const links = [['sim', 'sim'], ['telomerase', 'telo'], ['vie', 'life'], ['histoire', 'history'], ['savoirs', 'know'], ['quiz', 'quiz']];
  return (
    <header className="top">
      <div className="wrap top-in">
        <a className="brand" href="#sim" aria-label={t('brand.aria')}>
          <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
            <g stroke="#8b7cff" strokeWidth="5" strokeLinecap="round"><line x1="9" y1="5" x2="21" y2="25" /><line x1="21" y1="5" x2="9" y2="25" /></g>
            <g stroke="#35f0d2" strokeWidth="5" strokeLinecap="round"><line x1="9" y1="5" x2="10" y2="6.7" /><line x1="21" y1="5" x2="20" y2="6.7" /><line x1="9" y1="25" x2="10" y2="23.3" /><line x1="21" y1="25" x2="20" y2="23.3" /></g>
          </svg>
          TelomereClock
        </a>
        <div className="hud mono" aria-hidden="true">
          <span>{t('hud.length')} <b>{fmt(len)}</b> {t('unit.bp')}</span>
          <span>{t('hud.div')} <b>{sim.n}</b></span>
          <span>{t('hud.loss')} <b>{fmt(rate)}</b> {t('unit.bp')}/div</span>
        </div>
        <span className="alert-badge" role="status">{t('alertBadge')}</span>
        <nav className="nav" aria-label={t('nav.aria')}>
          {links.map(([id, k]) => <a key={id} href={`#${id}`}>{t(`nav.${k}`)}</a>)}
        </nav>
        <div className="top-tools">
          <button type="button" className="chip" onClick={onJournal} aria-label={t('journal.title')}>
            <span aria-hidden="true">★</span> {t('nav.journal')} <b className="mono">{progress.count}/{progress.total}</b>
          </button>
          <div className="lang" role="group" aria-label="Langue / Language">
            {['fr', 'en'].map(l => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
