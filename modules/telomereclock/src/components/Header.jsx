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
        <a className="brand" href="https://human-body-hub.pages.dev/" aria-label={t('brand.homeAria')}>
          <span className="brand-mark" aria-hidden="true">HB</span>
          <span>Human Body <span className="brand-divider">/</span> <span className="brand-module">TelomereClock</span></span>
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
          <a className="collection-link" href="https://human-body-hub.pages.dev/">{t('brand.collection')}</a>
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
