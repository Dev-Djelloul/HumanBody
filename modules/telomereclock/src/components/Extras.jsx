import { useI18n } from '../i18n/index.jsx';
import { BIBLIO } from '../content/biblio.js';

export function Bibliography() {
  const { t } = useI18n();
  return (
    <section id="biblio" aria-labelledby="t-bib" style={{ display: 'grid', gap: '1.2rem' }}>
      <div style={{ display: 'grid', gap: '.7rem' }}>
        <h2 id="t-bib">{t('biblio.title')}</h2>
        <p className="lede">{t('biblio.lede')}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2" style={{ alignItems: 'start' }}>
        {BIBLIO.map(g => (
          <div key={g.g} className="panel" style={{ display: 'grid', gap: '.6rem' }}>
            <h3>{t(`biblio.g.${g.g}`)}</h3>
            <ul className="refs">
              {g.items.map(it => (
                <li key={it.r}>
                  {it.url ? <a href={it.url} target="_blank" rel="noopener noreferrer">{it.r}</a> : it.r}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Hub() {
  const { t } = useI18n();
  const items = t('hub.items');
  return (
    <section id="hub" aria-labelledby="t-hub" style={{ display: 'grid', gap: '1.2rem' }}>
      <div style={{ display: 'grid', gap: '.7rem' }}>
        <h2 id="t-hub">{t('hub.title')}</h2>
        <p className="lede">{t('hub.lede')}</p>
        <a className="btn btn-ghost" href="https://human-body-hub.pages.dev/" style={{ justifySelf: 'start', textDecoration: 'none' }}>
          {t('hub.portal')}
        </a>
      </div>
      <div className="card-grid">
        {items.map(m => (
          <article key={m.n} className={m.s === 'active' ? 'hub-on' : 'hub-off'}>
            <h3>{m.n}</h3>
            <p className="mute" style={{ fontSize: '.9rem' }}>{m.d}</p>
            <span className={`badge ${m.s === 'active' ? 'g' : 'p'}`} style={{ alignSelf: 'start' }}>{t(`hub.${m.s}`)}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
