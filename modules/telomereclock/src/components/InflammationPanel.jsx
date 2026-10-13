import { useMemo } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { inflamMultiplier } from '../model/model.js';

const COLS = 6, ROWS = 4;
/* Ordre fixe dans lequel les cellules deviennent « zombies », puis « contaminées ». */
const ORDER = [8, 15, 3, 20, 11, 1, 18, 6, 22, 13, 4, 17, 9, 0, 23, 12, 5, 19, 2, 14, 10, 21, 7, 16];

function Gauge({ value }) {
  const R = 80, L = Math.PI * R;
  const color = value < 34 ? 'var(--glow)' : value < 67 ? 'var(--amber)' : 'var(--red)';
  return (
    <svg viewBox="0 0 200 118" role="img" aria-label={`${Math.round(value)} %`} style={{ width: '100%', maxWidth: '16rem', height: 'auto', display: 'block' }}>
      <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#0a1022" strokeWidth="16" strokeLinecap="round" />
      <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="var(--line)" strokeWidth="16" strokeLinecap="round" opacity=".5" />
      <path className="gauge-arc" d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth="16" strokeLinecap="round"
        strokeDasharray={`${L * value / 100} ${L}`} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      <text x="100" y="90" textAnchor="middle" className="gauge-num" style={{ fill: color }}>{Math.round(value)}%</text>
    </svg>
  );
}

export default function InflammationPanel({ senCount, gauge, clearing, canClear, onClear, disabled }) {
  const { t } = useI18n();
  const cells = useMemo(() => Array.from({ length: COLS * ROWS }, (_, i) => {
    const col = i % COLS, row = Math.floor(i / COLS);
    return { x: 22 + col * 32 + (row % 2 ? 16 : 0), y: 20 + row * 28 };
  }), []);

  const nSen = Math.min(senCount, 12);
  const nBy = Math.round(gauge / 100 * 8);
  const state = new Array(cells.length).fill(0);
  ORDER.forEach((idx, k) => { state[idx] = k < nSen ? 2 : k < nSen + nBy ? 1 : 0; });
  const mult = Math.round((inflamMultiplier(gauge) - 1) * 100);

  return (
    <section id="inflammaging" aria-labelledby="t-inflam" className="panel" style={{ display: 'grid', gap: '1.2rem' }}>
      <div style={{ display: 'grid', gap: '.5rem' }}>
        <h2 id="t-inflam" style={{ fontSize: 'clamp(1.15rem,2.2vw,1.5rem)' }}>{t('inflam.title')}</h2>
        <p className="lede">{t('inflam.lede')}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-[1fr_1.1fr]" style={{ alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: '.9rem', justifyItems: 'center' }}>
          <div className="label">{t('inflam.gauge')}</div>
          <Gauge value={gauge} />
          <div className="kv" style={{ width: '100%' }}>
            <div><div className="label">{t('inflam.count')}</div><div className="v">{senCount}</div></div>
            <div><div className="label">{t('inflam.effect')}</div><div className="v">{mult > 0 ? `+${mult} %` : '0 %'}</div></div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '.8rem' }}>
          <div className="label">{t('inflam.tissue')}</div>
          <div className={`mini-tissue ${clearing ? 'clearing' : ''}`}>
            <svg viewBox="0 0 210 124" role="img" aria-label={t('inflam.tissueAria')} style={{ width: '100%', height: 'auto', display: 'block' }}>
              {cells.map((c, i) => (
                <g key={i} transform={`translate(${c.x} ${c.y})`}>
                  <circle r="11" className={`mt mt-${state[i]}`} />
                  {state[i] === 2 && <circle r="15" className="mt-halo" />}
                </g>
              ))}
            </svg>
            <div className="sweep" aria-hidden="true" />
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span className="leg"><i className="dot" style={{ background: 'var(--glow)' }} />{t('inflam.legHealthy')}</span>
            <span className="leg"><i className="dot" style={{ background: 'var(--amber)' }} />{t('inflam.legBystander')}</span>
            <span className="leg"><i className="dot" style={{ background: '#7d84a8', outline: '2px solid #b3a9ff' }} />{t('inflam.legZombie')}</span>
          </div>
          <button type="button" className="btn-premium" onClick={onClear} disabled={disabled || clearing || !canClear}>
            <span>{clearing ? t('inflam.clearing') : t('inflam.btn')}</span>
          </button>
          <p className="note" aria-live="polite">{canClear ? t('inflam.hintReady') : t('inflam.hintNone')}</p>
        </div>
      </div>

      <ul className="steps-list">
        {['1', '2', '3'].map(n => (
          <li key={n}><b>{t(`inflam.s${n}t`)}</b><span className="mute">{t(`inflam.s${n}d`)}</span></li>
        ))}
      </ul>
    </section>
  );
}
