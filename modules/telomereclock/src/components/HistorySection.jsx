import { useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { MORTALITY, meanAgeAtDeath } from '../model/model.js';

const BIN_COLORS = ['#ff4568', '#ff8a4c', '#ffc24b', '#9be37a', '#35f0d2', '#8b7cff'];

/** Arrondit 100 naissances en 100 points entiers (méthode du plus fort reste). */
function toDots(bins) {
  const base = bins.map(Math.floor);
  let rest = 100 - base.reduce((a, b) => a + b, 0);
  const order = bins.map((v, i) => [v - Math.floor(v), i]).sort((a, b) => b[0] - a[0]);
  for (let k = 0; rest > 0; k = (k + 1) % order.length, rest--) base[order[k][1]]++;
  const dots = [];
  base.forEach((n, bin) => { for (let i = 0; i < n; i++) dots.push(bin); });
  return dots;
}

function Ceiling({ t }) {
  const X = a => 30 + a / 125 * 580;
  const med = meanAgeAtDeath(MORTALITY.medieval), medAd = meanAgeAtDeath(MORTALITY.medieval, 2), mod = meanAgeAtDeath(MORTALITY.modern);
  const mark = (age, label, row, color, anchor = 'middle') => (
    <g key={label}>
      <line x1={X(age)} x2={X(age)} y1={row === 'up' ? 56 : 84} y2="90" stroke={color} strokeWidth="1.5" />
      <circle cx={X(age)} cy="90" r="6" fill={color} stroke="#050913" strokeWidth="2" />
      <text x={X(age)} y={row === 'up' ? 48 : 106} textAnchor={anchor} style={{ fill: color }}>{label}</text>
    </g>
  );
  return (
    <svg className="chart" viewBox="0 0 640 170" role="img" aria-label={t('myth.ceilingAria')} style={{ width: '100%', height: 'auto', display: 'block', maxWidth: '100%' }}>
      <rect x={X(85)} y="80" width={X(120) - X(85)} height="20" rx="4" fill="#8b7cff" opacity=".28" />
      <line x1="30" x2="610" y1="90" y2="90" stroke="#3a4a85" strokeWidth="2" />
      {[0, 25, 50, 75, 100, 125].map(a => (
        <g key={a}>
          <line x1={X(a)} x2={X(a)} y1="86" y2="94" stroke="#3a4a85" />
          <text x={X(a)} y="156" textAnchor="middle">{a}</text>
        </g>
      ))}
      <text x="610" y="168" textAnchor="end">{t('myth.years')}</text>
      {mark(med, t('myth.mMed', { n: Math.round(med) }), 'up', '#ffc24b')}
      {mark(medAd, t('myth.mMedAdult', { n: Math.round(medAd) }), 'down', '#ff8a4c')}
      {mark(mod, t('myth.mMod', { n: Math.round(mod) }), 'up', '#35f0d2')}
      {mark(122, t('myth.mCalment'), 'up', '#c9c2ff', 'end')}
      <text x={(X(85) + X(120)) / 2} y="126" textAnchor="middle" style={{ fill: '#b3a9ff' }}>{t('myth.mHayflick')}</text>
    </svg>
  );
}

export default function HistorySection({ onExplore }) {
  const { t } = useI18n();
  const [era, setEra] = useState('medieval');
  const bins = MORTALITY[era];
  const dots = useMemo(() => toDots(bins), [bins]);
  const mean = meanAgeAtDeath(bins);
  const adults = meanAgeAtDeath(bins, 2);
  const under5 = bins[0];
  const labels = t('myth.bins');
  const pick = id => { setEra(id); if (id === 'modern') onExplore?.(); };
  const shields = ['water', 'vaccine', 'hygiene'];

  return (
    <section id="histoire" aria-labelledby="t-myth" style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gap: '.7rem' }}>
        <h2 id="t-myth">{t('myth.title')}</h2>
        <p className="lede">{t('myth.lede')}</p>
      </div>

      <div className="panel" style={{ display: 'grid', gap: '1.2rem' }}>
        <div className="panel-h" style={{ margin: 0 }}>
          <h3>{t('myth.cohort')}</h3>
          <div className="tabs" role="tablist" aria-label={t('myth.eraAria')}>
            {['medieval', 'modern'].map(id => (
              <button key={id} type="button" role="tab" aria-selected={era === id} onClick={() => pick(id)}>{t(`myth.era.${id}`)}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]" style={{ alignItems: 'center' }}>
          <div style={{ display: 'grid', gap: '.7rem', minWidth: 0 }}>
            <svg viewBox="0 0 420 110" role="img" aria-label={t('myth.dotsAria')} style={{ width: '100%', height: 'auto', display: 'block', maxWidth: '100%' }}>
              {dots.map((bin, i) => (
                <circle key={i} className="dot-person" cx={12 + (i % 20) * 20.5} cy={12 + Math.floor(i / 20) * 21.5} r="7.4" fill={BIN_COLORS[bin]} />
              ))}
            </svg>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem 1rem' }}>
              {labels.map((l, i) => (
                <span key={i} className="leg"><i className="dot" style={{ background: BIN_COLORS[i] }} />{l}: <b className="mono" style={{ color: 'var(--text)' }}>{Math.round(bins[i])}</b></span>
              ))}
            </div>
            <p className="note">{t('myth.dotsNote')}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="tile" style={{ gridColumn: '1 / -1' }}>
              <div className="label">{t('myth.statMean')}</div>
              <div className="v" style={{ color: era === 'medieval' ? 'var(--amber)' : 'var(--glow)' }}>≈ {Math.round(mean)} {t('myth.yrs')}</div>
            </div>
            <div className="tile"><div className="label">{t('myth.statAdults')}</div><div className="v">≈ {Math.round(adults)} {t('myth.yrs')}</div></div>
            <div className="tile"><div className="label">{t('myth.statInfant')}</div><div className="v" style={{ color: under5 > 10 ? 'var(--red)' : 'var(--glow)' }}>{under5 < 1 ? '< 1' : Math.round(under5)} %</div></div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ display: 'grid', gap: '.8rem' }}>
        <h3>{t('myth.ceilingTitle')}</h3>
        <Ceiling t={t} />
        <p className="mute" style={{ maxWidth: '78ch' }}>{t('myth.ceilingBody')}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]" style={{ alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: '.8rem' }}>
          <h3>{t('myth.shieldTitle')}</h3>
          <div className="card-grid">
            {shields.map(id => (
              <article key={id}>
                <h3>{t(`myth.shield.${id}.t`)}</h3>
                <p className="mute" style={{ fontSize: '.9rem' }}>{t(`myth.shield.${id}.d`)}</p>
                <span className="badge g">{t(`myth.shield.${id}.y`)}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="zone-card" style={{ '--zone': 'var(--glow)' }}>
          <h3>{t('myth.takeTitle')}</h3>
          <p className="mute">{t('myth.takeBody')}</p>
        </div>
      </div>
    </section>
  );
}
