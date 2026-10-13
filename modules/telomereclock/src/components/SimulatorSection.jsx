import { useSim } from '../hooks/useSim.js';
import { useI18n } from '../i18n/index.jsx';
import { CELL_TYPES, wasteAt, lifestyleMultiplier } from '../model/model.js';
import CellScene from './CellScene.jsx';
import { Readouts, Ribbon, TrajectoryChart } from './SimParts.jsx';

function Viewer({ sim, type, telo, lifeKey, waste, label, primary, tags = true }) {
  const { t } = useI18n();
  useSim(sim);
  return (
    <div style={{ display: 'grid', gap: '.8rem', minWidth: 0 }}>
      <CellScene sim={sim} type={type} senescent={sim.senescent} waste={waste} primary={primary} label={label}>
        <span className="tag">{t(`cell.${type}.name`)}</span>
        {tags && <a className="tag" href="#telomerase">{t('tags.telo')} <b>{telo} %</b></a>}
        {tags && <a className="tag" href="#vie">{t('tags.life')} <b>{t(`life.state.${lifeKey}`)}</b></a>}
      </CellScene>
      {CELL_TYPES[type].divides && (
        <div style={{ display: 'grid', gap: '.4rem' }}>
          <div className="panel-h" style={{ margin: 0 }}>
            <span className="label">{t('ribbon.title')}</span>
            <span className="label mono">{t('ribbon.ends')}</span>
          </div>
          <Ribbon sim={sim} />
        </div>
      )}
    </div>
  );
}

export default function SimulatorSection(p) {
  const { t } = useI18n();
  const { sim, ctrl, type, compare, rate, ctrlRate, telo, active, neuronAge } = p;
  useSim(sim); useSim(ctrl);
  const ct = CELL_TYPES[type];
  const busy = sim.busy || ctrl.busy;
  const looping = sim.looping || ctrl.looping;
  const locked = ct.divides && (sim.senescent && (!compare || ctrl.senescent));
  const lifeKey = !active.length ? 'neutral' : lifestyleMultiplier(active) > 1.01 ? 'fast' : lifestyleMultiplier(active) < 0.99 ? 'protect' : 'mixed';
  const waste = wasteAt(neuronAge, lifestyleMultiplier(active));
  const phaseKey = !ct.divides ? 'neuron' : sim.phase.key;

  return (
    <section id="sim" aria-labelledby="t-sim" style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gap: '.8rem' }}>
        <p className="eyebrow" style={{ margin: 0 }}>
          <span className="pulse" aria-hidden="true" />
          <span>{t('hero.eyebrow')}</span>
        </p>
        <h1 id="t-sim" style={{ fontSize: 'clamp(1.7rem,4.4vw,3rem)', lineHeight: 1.1, maxWidth: '20ch' }}>{t('hero.title')}</h1>
        <p className="lede">{t('hero.lede')}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        <div className="panel" style={{ display: 'grid', gap: '1rem', alignContent: 'start' }}>
          <div className="type-row">
            <div style={{ display: 'grid', gap: '.3rem', minWidth: 0 }}>
              <label className="label" htmlFor="cellType">{t('cell.label')}</label>
              <select id="cellType" className="select" value={type} disabled={busy || looping}
                onChange={e => p.onType(e.target.value)}>
                {Object.keys(CELL_TYPES).map(id => <option key={id} value={id}>{t(`cell.${id}.name`)}</option>)}
              </select>
            </div>
            <span className={`pill ${ct.divides ? (type === 'skin' ? 'ok' : 'warn') : 'dead'}`}>
              <i /><span>{t(`cell.${type}.tempo`)}</span>
            </span>
          </div>
          <p className="note" style={{ marginTop: '-.4rem' }}>{t(`cell.${type}.desc`)}</p>

          <div className={compare && ct.divides ? 'grid gap-4 md:grid-cols-2' : ''} style={compare && ct.divides ? undefined : { display: 'grid' }}>
            <Viewer sim={sim} type={type} telo={telo} lifeKey={lifeKey} waste={waste} primary
              label={compare && ct.divides ? t('compare.subject') : null} tags={!(compare && ct.divides)} />
            {compare && ct.divides && (
              <Viewer sim={ctrl} type={type} telo={0} lifeKey="neutral" waste={0} tags={false} label={t('compare.control')} />
            )}
          </div>

          {!ct.divides && (
            <div className="neuron-note" role="note">
              <h3>{t('neuron.title')}</h3>
              <p>{t('neuron.body')}</p>
              <div style={{ display: 'grid', gap: '.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }} className="label">
                  <span>{t('neuron.waste')}</span><b className="mono" style={{ color: 'var(--text)' }}>{Math.round(waste)} %</b>
                </div>
                <div className="bar2"><span style={{ width: `${waste}%`, background: '#c8913a' }} /></div>
                <div className="mono note">{t('neuron.age', { n: neuronAge })}</div>
              </div>
              <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
                <button className="btn" type="button" onClick={p.onAgeNeuron} disabled={neuronAge >= 100}>{t('neuron.btnAge')}</button>
                <button className="btn btn-ghost" type="button" onClick={p.onResetNeuron} disabled={neuronAge === 0}>{t('neuron.btnReset')}</button>
              </div>
              <p className="note">{t('neuron.sleep')}</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn btn-main" type="button" disabled={!ct.divides || busy || looping || locked} onClick={p.onDivide}>
              {!ct.divides ? t('btn.divideNeuron') : locked ? t('btn.limit') : t('btn.divide')}
            </button>
            <button className="btn" type="button" disabled={!ct.divides || busy || looping || locked} onClick={p.onTen}>{t('btn.ten')}</button>
            <button className={`btn ${looping ? 'btn-stop' : 'btn-life'}`} type="button" disabled={!ct.divides || (!looping && (busy || locked))} onClick={p.onLifespan} aria-pressed={looping}>
              {looping ? t('btn.stop') : t('btn.lifespan')}
            </button>
            <button className="btn btn-ghost" type="button" disabled={busy || looping || !ct.divides} onClick={p.onReset}>{t('btn.reset')}</button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <label className="check">
              <input type="checkbox" checked={compare && ct.divides} disabled={!ct.divides || busy || looping} onChange={e => p.onCompare(e.target.checked)} />
              <span>{t('compare.toggle')}</span>
            </label>
            <span className="note" role="status" aria-live="polite">{t(`phase.${phaseKey}`)}</span>
          </div>
          <p className="note">{t('sim.caption')}</p>
        </div>

        <div style={{ display: 'grid', gap: '1.25rem', alignContent: 'start', minWidth: 0 }}>
          <Readouts sim={sim} rate={rate} type={type} />
          <TrajectoryChart sim={sim} ctrl={ctrl} showCtrl={compare && ct.divides} rate={rate} />
        </div>
      </div>
    </section>
  );
}
