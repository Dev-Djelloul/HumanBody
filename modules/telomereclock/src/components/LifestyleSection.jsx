import { useI18n } from '../i18n/index.jsx';
import { C, CELL_TYPES, FACTORS, clamp, lifestyleMultiplier, remainingDivisions, renewalYears, wasteAt } from '../model/model.js';

function Toggle({ id, on, onToggle }) {
  const { t } = useI18n();
  const kind = FACTORS[id].kind;
  return (
    <button type="button" className={`tog ${kind}`} aria-pressed={on} onClick={onToggle}>
      <span className="name">{t(`factor.${id}.name`)}</span>
      <span style={{ display: 'flex', gap: '.7rem', alignItems: 'center' }}>
        <span className="eff">{t(`factor.${id}.eff`)}</span><span className="switch" aria-hidden="true" />
      </span>
      <span className="why">{t(`factor.${id}.why`)}</span>
      <span className="ref">{t(`factor.${id}.ref`)}</span>
    </button>
  );
}

export default function LifestyleSection({ active, toggle, type, rate, telo }) {
  const { t, fmt } = useI18n();
  const ct = CELL_TYPES[type];
  const m = lifestyleMultiplier(active);
  const lim = remainingDivisions(C.START_BP, rate);
  const years = renewalYears(rate, ct.yearsPerDiv);
  const w80 = wasteAt(80, m);
  const keys = Object.keys(FACTORS);

  let msg;
  if (!ct.divides) msg = t('life.msgNeuron');
  else if (!active.length) msg = t('life.msgNone');
  else if (rate === 0) msg = t('life.msgTelo');
  else if (m > 1.01) msg = t('life.msgMore', { n: Math.round((m - 1) * 100) });
  else if (m < 0.99) msg = t('life.msgLess', { n: Math.round((1 - m) * 100) });
  else msg = t('life.msgMixed');

  return (
    <section id="vie" aria-labelledby="t-vie" style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gap: '.7rem' }}>
        <h2 id="t-vie">{t('life.title')}</h2>
        <p className="lede">{t('life.lede')}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="grid gap-5 md:grid-cols-2" style={{ alignContent: 'start' }}>
          <div style={{ display: 'grid', gap: '.8rem', alignContent: 'start' }}>
            <h3 style={{ color: 'var(--red)' }}>{t('life.neg')}</h3>
            {keys.filter(k => FACTORS[k].kind === 'neg').map(k => <Toggle key={k} id={k} on={active.includes(k)} onToggle={() => toggle(k)} />)}
          </div>
          <div style={{ display: 'grid', gap: '.8rem', alignContent: 'start' }}>
            <h3 style={{ color: 'var(--glow)' }}>{t('life.pos')}</h3>
            {keys.filter(k => FACTORS[k].kind === 'pos').map(k => <Toggle key={k} id={k} on={active.includes(k)} onToggle={() => toggle(k)} />)}
          </div>
        </div>
        <div className="panel stick" style={{ display: 'grid', gap: '1rem', alignContent: 'start' }}>
          <h3>{t('life.effectTitle')}</h3>
          {ct.divides ? (
            <>
              <div style={{ display: 'grid', gap: '.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="label">
                  <span>{t('read.loss')}</span><b className="mono" style={{ color: 'var(--text)' }}>{fmt(rate)} {t('unit.bp')}</b>
                </div>
                <div className="bar2"><span style={{ width: `${clamp(rate / 200 * 100, 2, 100)}%`, background: rate > 105 ? 'var(--red)' : rate < 95 ? 'var(--glow)' : 'var(--mute)' }} /></div>
                <div className="note mono">{t('life.ref100')}</div>
              </div>
              <div className="kv">
                <div><div className="label">{t('tiles.limit')}</div><div className="v">{!isFinite(lim) ? '∞' : lim > 200 ? '> 200' : '≈ ' + lim}</div></div>
                <div><div className="label">{t('tiles.renewal')}</div><div className="v">{!isFinite(years) ? t('tiles.unlimited') : years > 150 ? t('tiles.over', { n: 150 }) : '≈ ' + t('read.years', { n: Math.round(years) })}</div></div>
              </div>
            </>
          ) : (
            <div style={{ display: 'grid', gap: '.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }} className="label">
                <span>{t('life.wasteAt80')}</span><b className="mono" style={{ color: 'var(--text)' }}>{Math.round(w80)} %</b>
              </div>
              <div className="bar2"><span style={{ width: `${w80}%`, background: '#c8913a' }} /></div>
            </div>
          )}
          <p className="mute">{msg}</p>
          <p className="note">{t('life.note')}</p>
        </div>
      </div>
    </section>
  );
}
