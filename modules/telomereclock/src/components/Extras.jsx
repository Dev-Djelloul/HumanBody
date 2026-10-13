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
