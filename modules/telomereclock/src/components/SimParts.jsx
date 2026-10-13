import { useSim, useSimLen } from '../hooks/useSim.js';
import { useI18n } from '../i18n/index.jsx';
import { C, CELL_TYPES, clamp, remainingDivisions } from '../model/model.js';
import { colorFor } from './CellScene.jsx';

/** Zoom sur l'extrémité : 40 cases de 250 pb, les cases perdues restent en pointillés. */
export function Ribbon({ sim }) {
  const len = useSimLen(sim);
  const present = Math.ceil(len / 250);
  const [r, g, b] = colorFor(len, sim.alertMode);
  return (
    <div className="ribbon" aria-hidden="true" style={{ '--tel': `rgb(${r},${g},${b})` }}>
      {Array.from({ length: 40 }, (_, i) => <i key={i} className={i >= present ? 'gone' : ''} />)}
    </div>
  );
}

export function statusOf(sim, rate, type) {
  if (!CELL_TYPES[type].divides) return { cls: 'dead', key: 'postmitotic' };
  if (sim.senescent) return { cls: 'dead', key: 'senescent' };
  if (rate === 0) return { cls: 'bad', key: 'immortal' };
  if (sim.len < 5500) return { cls: 'warn', key: 'short' };
  return { cls: 'ok', key: 'prolif' };
}

export function Readouts({ sim, rate, type }) {
  useSim(sim);
  const len = useSimLen(sim);
  const { t, fmt } = useI18n();
  const st = statusOf(sim, rate, type);
  const ct = CELL_TYPES[type];
  const rem = remainingDivisions(sim.len, rate);
  const total = !ct.divides ? '—' : !isFinite(rem) ? '∞' : sim.n + rem > 200 ? '> 200' : sim.n + rem;
  const f = clamp((len - C.CRITICAL_BP) / 6000, 0, 1);
  const years = ct.divides ? Math.round(sim.n * ct.yearsPerDiv) : null;
  const [r, g, b] = colorFor(len, sim.alertMode);
  return (
    <div className="panel" style={{ display: 'grid', gap: '.9rem' }}>
      <div className="panel-h" style={{ margin: 0 }}>
        <span className="label">{t(ct.divides ? 'read.length' : 'read.lengthStable')}</span>
        <span className={`pill ${st.cls}`} role="status"><i /><span>{t(`status.${st.key}`)}</span></span>
      </div>
      <div className="big" style={{ '--tel-text': `rgb(${r},${g},${b})` }}>{fmt(len)}<small>{t('unit.bp')}</small></div>
      <div>
        <div className="meter" aria-hidden="true"><span style={{ width: `${4 + f * 96}%` }} /><b className="mk" style={{ left: 0 }} /></div>
        <div className="mono note" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.4rem', gap: '.5rem', flexWrap: 'wrap' }}>
          <span>{t('read.critical')}</span><span>{t('read.birth')}</span>
        </div>
      </div>
      <div className="kv">
        <div><div className="label">{t('read.divisions')}</div><div className="v">{sim.n} / {total}</div></div>
        <div><div className="label">{t('read.loss')}</div><div className="v">{fmt(rate)} <small className="mute" style={{ fontSize: '.7rem' }}>{t('unit.bp')}</small></div></div>
        <div style={{ gridColumn: '1 / -1' }}>
          <div className="label">{t('read.lineageAge')}</div>
          <div className="v">{years == null ? '—' : t(years === 1 ? 'read.year' : 'read.years', { n: years })}</div>
        </div>
      </div>
    </div>
  );
}

export function TrajectoryChart({ sim, ctrl, showCtrl, rate }) {
  useSim(sim); useSim(ctrl);
  const { t, fmt } = useI18n();
  const W = 460, H = 250, m = { l: 48, r: 12, t: 12, b: 40 };
  const rem = remainingDivisions(sim.len, rate);
  const projTotal = isFinite(rem) && sim.n + rem <= 200 ? sim.n + rem : Infinity;
  const maxN = Math.max(sim.n, showCtrl ? ctrl.n : 0);
  const xMax = Math.min(160, Math.max(60, maxN + 5, isFinite(projTotal) ? projTotal + 3 : 0));
  const X = n => m.l + n / xMax * (W - m.l - m.r);
  const yMin = 3500, yMax = 10500;
  const Y = v => m.t + (yMax - v) / (yMax - yMin) * (H - m.t - m.b);
  const pts = h => h.map(p => `${X(p.n)},${Y(p.len)}`).join(' ');
  const last = sim.history[sim.history.length - 1];
  const step = xMax > 90 ? 40 : 20;
  const ticks = [];
  for (let n = 0; n <= xMax; n += step) ticks.push(n);
  const endN = isFinite(projTotal) ? projTotal : xMax, endV = isFinite(projTotal) ? 4000 : sim.len;

  return (
    <div className="panel">
      <div className="panel-h">
        <span className="label">{t('traj.title')}</span>
        <span className="label mono">{isFinite(projTotal) ? t('traj.limit', { n: projTotal }) : t('traj.noLimit')}</span>
      </div>
      <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t('traj.aria')} style={{ width: '100%', height: 'auto', display: 'block', maxWidth: '100%' }}>
        {[4000, 6000, 8000, 10000].map(v => (
          <g key={v}>
            <line className="grid" x1={m.l} x2={W - m.r} y1={Y(v)} y2={Y(v)} />
            <text x={m.l - 6} y={Y(v) + 3} textAnchor="end">{fmt(v)}</text>
          </g>
        ))}
        {ticks.map(n => <text key={n} x={X(n)} y={H - 22} textAnchor="middle">{n}</text>)}
        <text x={(m.l + W - m.r) / 2} y={H - 6} textAnchor="middle">{t('traj.xAxis')}</text>
        <line x1={m.l} x2={W - m.r} y1={Y(4000)} y2={Y(4000)} stroke="#ff4568" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x={m.l + 6} y={Y(4000) + 14} style={{ fill: '#ff4568' }}>{t('traj.critical')}</text>
        {showCtrl && (
          <polyline points={pts(ctrl.history)} fill="none" stroke="#93a0cb" strokeWidth="2" strokeDasharray="6 5" strokeLinejoin="round" />
        )}
        <polygon points={`${X(0)},${Y(yMin)} ${pts(sim.history)} ${X(last.n)},${Y(yMin)}`} fill="var(--tel, #35f0d2)" opacity=".12" />
        <polyline points={pts(sim.history)} fill="none" stroke="var(--tel, #35f0d2)" strokeWidth="2.5" strokeLinejoin="round" />
        {!sim.senescent && (
          <line x1={X(last.n)} y1={Y(last.len)} x2={X(endN)} y2={Y(endV)} stroke="#93a0cb" strokeWidth="1.5" strokeDasharray="2 5" />
        )}
        <circle cx={X(last.n)} cy={Y(last.len)} r="5" fill="var(--tel, #35f0d2)" stroke="#050913" strokeWidth="2" />
      </svg>
      {showCtrl && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '.5rem' }}>
          <span className="leg"><i style={{ background: 'var(--tel, #35f0d2)' }} />{t('compare.subject')}</span>
          <span className="leg"><i style={{ background: '#93a0cb' }} />{t('compare.control')}</span>
        </div>
      )}
    </div>
  );
}
