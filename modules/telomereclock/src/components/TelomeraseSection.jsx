import { useMemo } from 'react';
import { useI18n } from '../i18n/index.jsx';
import {
  C, CELL_TYPES, cancerRisk, clamp, lifestyleMultiplier, makeCells, remainingDivisions,
  renewalYears, telomeraseEffect, tissueAt, tissueDecline, wasteAt, zoneOf
} from '../model/model.js';

const CELLS = makeCells(2026, C.CELLS);
const EQ = { W: 520, H: 300, l: 44, r: 14, t: 14, b: 40 };
const eqX = v => EQ.l + v / 100 * (EQ.W - EQ.l - EQ.r);
const eqY = v => EQ.t + (100 - v) / 100 * (EQ.H - EQ.t - EQ.b);

const CURVE_D = [], CURVE_R = [];
for (let v = 0; v <= 100; v++) {
  CURVE_D.push(`${eqX(v).toFixed(1)},${eqY(tissueDecline(v)).toFixed(1)}`);
  CURVE_R.push(`${eqX(v).toFixed(1)},${eqY(cancerRisk(v)).toFixed(1)}`);
}

function EquilibriumChart({ telo }) {
  const { t } = useI18n();
  const x = eqX(telo);
  return (
    <svg className="chart" viewBox={`0 0 ${EQ.W} ${EQ.H}`} role="img" aria-label={t('eq.aria')} style={{ width: '100%', height: 'auto', display: 'block', maxWidth: '100%' }}>
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line className="grid" x1={EQ.l} x2={EQ.W - EQ.r} y1={eqY(v)} y2={eqY(v)} />
          <text x={EQ.l - 7} y={eqY(v) + 3.5} textAnchor="end">{v}</text>
        </g>
      ))}
      {[0, 20, 40, 60, 80, 100].map(v => <text key={v} x={eqX(v)} y={EQ.H - 22} textAnchor="middle">{v} %</text>)}
      <text x={(EQ.l + EQ.W - EQ.r) / 2} y={EQ.H - 6} textAnchor="middle">{t('eq.xAxis')}</text>
      <rect x={eqX(15)} y={EQ.t} width={eqX(30) - eqX(15)} height={eqY(0) - EQ.t} fill="#ffc24b" opacity=".16" />
      <rect x={eqX(80)} y={EQ.t} width={eqX(100) - eqX(80)} height={eqY(0) - EQ.t} fill="#ff4568" opacity=".16" />
      <text x={eqX(22.5)} y={EQ.t + 11} textAnchor="middle" style={{ fill: '#ffc24b' }}>{t('eq.therapy')}</text>
      <text x={eqX(90)} y={EQ.t + 11} textAnchor="middle" style={{ fill: '#ff4568' }}>{t('eq.cancer')}</text>
      <polyline points={CURVE_D.join(' ')} fill="none" stroke="#35f0d2" strokeWidth="2.8" />
      <polyline points={CURVE_R.join(' ')} fill="none" stroke="#ff4568" strokeWidth="2.8" />
      <line x1={x} x2={x} y1={EQ.t} y2={eqY(0)} stroke="#fff" strokeWidth="1.5" strokeDasharray="4 4" opacity=".8" />
      <circle cx={x} cy={eqY(tissueDecline(telo))} r="6" fill="#35f0d2" stroke="#050913" strokeWidth="2" />
      <circle cx={x} cy={eqY(cancerRisk(telo))} r="6" fill="#ff4568" stroke="#050913" strokeWidth="2" />
    </svg>
  );
}

function TissueGrid({ age, setAge, rate, risk, type, wasteMult }) {
  const { t } = useI18n();
  const res = useMemo(() => tissueAt(CELLS, age, rate, risk, type, wasteMult), [age, rate, risk, type, wasteMult]);
  const neuron = type === 'neuron';
  const pos = useMemo(() => CELLS.map((_, i) => {
    const row = Math.floor(i / 15), col = i % 15;
    return [20 + col * 25 + (row % 2 ? 12.5 : 0), 18 + row * 23];
  }), []);
  const colorOf = s => s === 0 ? '#35f0d2' : s === 1 ? (neuron ? '#c8913a' : '#566086') : '#ff4568';
  return (
    <div className="panel">
      <div className="panel-h">
        <span className="label">{t(neuron ? 'tissue.titleNeuron' : 'tissue.title')}</span>
        <label className="label" htmlFor="age">{t('tissue.age')} <b className="mono" style={{ color: 'var(--text)' }}>{age}</b> {t('unit.yearsShort')}</label>
      </div>
      <input id="age" type="range" min="0" max="120" step="1" value={age} onChange={e => setAge(+e.target.value)} style={{ marginBottom: '.4rem' }} />
      <svg viewBox="0 0 400 250" role="img" aria-label={t('tissue.aria')} style={{ width: '100%', height: 'auto', display: 'block', maxWidth: '100%' }}>
        {res.states.map((s, i) => (
          <circle key={i} cx={pos[i][0]} cy={pos[i][1]} r="10.2" className={`cell-t ${s === 2 ? 'tum' : ''}`}
            fill={colorOf(s)} opacity={s === 1 && !neuron ? 0.55 : 1} />
        ))}
      </svg>
      <div style={{ display: 'flex', gap: '1.1rem', flexWrap: 'wrap', marginTop: '.6rem' }}>
        <span className="leg"><i className="dot" style={{ background: '#35f0d2' }} />{t('tissue.healthy')} <b className="mono" style={{ color: 'var(--text)' }}>{res.healthy}</b></span>
        <span className="leg"><i className="dot" style={{ background: colorOf(1) }} />{t(neuron ? 'tissue.burdened' : 'tissue.senescent')} <b className="mono" style={{ color: 'var(--text)' }}>{res.sen}</b></span>
        {!neuron && <span className="leg"><i className="dot" style={{ background: '#ff4568' }} />{t('tissue.transformed')} <b className="mono" style={{ color: 'var(--text)' }}>{res.tum}</b></span>}
      </div>
      <p className="note" style={{ marginTop: '.5rem' }}>{t(neuron ? 'tissue.noteNeuron' : 'tissue.note')}</p>
    </div>
  );
}

export default function TelomeraseSection({ telo, setTelo, active, type, rate, age, setAge }) {
  const { t, fmt } = useI18n();
  const ct = CELL_TYPES[type];
  const zone = zoneOf(telo);
  const risk = cancerRisk(telo);
  const lim = remainingDivisions(C.START_BP, rate);
  const years = renewalYears(rate, ct.yearsPerDiv);
  const info = { pct: Math.round(telomeraseEffect(telo) * 100), rate: fmt(rate), risk: Math.round(risk) };
  const dash = '—';

  return (
    <section id="telomerase" aria-labelledby="t-telo" style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gap: '.7rem' }}>
        <h2 id="t-telo">{t('telo.title')}</h2>
        <p className="lede">{t('telo.lede')}</p>
      </div>

      {zone === 'alert' && ct.divides && (
        <div className="alert-box" role="alert">
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none', marginTop: 2 }}>
            <path d="M12 3 2 21h20L12 3Z" fill="none" stroke="#ff4568" strokeWidth="2" strokeLinejoin="round" />
            <path d="M12 10v5M12 18v.5" stroke="#ff4568" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div><strong style={{ color: 'var(--red)' }}>{t('telo.alertTitle')}</strong> {t('telo.alertBody')}</div>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <div className="panel" style={{ display: 'grid', gap: '1rem', alignContent: 'start' }}>
          <div className="panel-h" style={{ margin: 0 }}>
            <label className="label" htmlFor="telo">{t('telo.slider')}</label>
            <span className="big" style={{ fontSize: '2rem', color: 'var(--zone)', textShadow: '0 0 18px var(--zone)' }}>{telo}<small>%</small></span>
          </div>
          <div className="slider-wrap">
            <div className="zonebar" aria-hidden="true">
              <span style={{ left: 0, width: '15%', background: '#1b2748' }} />
              <span style={{ left: '15%', width: '15%', background: 'var(--amber)' }} />
              <span style={{ left: '30%', width: '50%', background: 'linear-gradient(90deg,#3a2c24,#7a3d2b)' }} />
              <span style={{ left: '80%', width: '20%', background: 'var(--red)' }} />
            </div>
            <input id="telo" type="range" min="0" max="100" step="1" value={telo} aria-describedby="zoneText"
              onChange={e => setTelo(+e.target.value)} />
          </div>
          <div className="mono note" style={{ display: 'grid', gridTemplateColumns: '15fr 15fr 50fr 20fr', textAlign: 'center', gap: 2 }} aria-hidden="true">
            <span>0</span><span style={{ color: 'var(--amber)' }}>15–30</span><span>{t('telo.grey')}</span><span style={{ color: 'var(--red)' }}>80–100</span>
          </div>

          {ct.divides ? (
            <div className="zone-card">
              <h3>{t(`zone.${zone}.title`)}</h3>
              <p id="zoneText" className="mute">{t(`zone.${zone}.text`, info)}</p>
            </div>
          ) : (
            <div className="zone-card">
              <h3>{t('telo.neuronTitle')}</h3>
              <p id="zoneText" className="mute">{t('telo.neuronBody')}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="tile"><div className="label">{t('read.loss')}</div><div className="v">{ct.divides ? fmt(rate) : dash}<small className="mute" style={{ fontSize: '.7rem' }}> {t('unit.bp')}</small></div></div>
            <div className="tile"><div className="label">{t('tiles.limit')}</div><div className="v">{!ct.divides ? dash : !isFinite(lim) ? '∞' : lim > 200 ? '> 200' : '≈ ' + lim}</div></div>
            <div className="tile"><div className="label">{t('tiles.renewal')}</div><div className="v">{!ct.divides ? dash : !isFinite(years) ? t('tiles.unlimited') : years > 150 ? t('tiles.over', { n: 150 }) : '≈ ' + t('read.years', { n: Math.round(years) })}</div></div>
            <div className="tile"><div className="label">{t('tiles.risk')}</div><div className="v">{ct.divides ? Math.round(risk) : dash}</div></div>
          </div>
          <p className="note">{t('telo.model')}</p>
        </div>

        <div style={{ display: 'grid', gap: '1.25rem', alignContent: 'start', minWidth: 0 }}>
          <div className="panel">
            <div className="panel-h">
              <span className="label">{t('eq.title')}</span>
              <span style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span className="leg"><i style={{ background: 'var(--glow)' }} />{t('eq.decline')}</span>
                <span className="leg"><i style={{ background: 'var(--red)' }} />{t('eq.risk')}</span>
              </span>
            </div>
            <EquilibriumChart telo={telo} />
          </div>
          <TissueGrid age={age} setAge={setAge} rate={rate} risk={risk} type={type} wasteMult={lifestyleMultiplier(active)} />
        </div>
      </div>
    </section>
  );
}
