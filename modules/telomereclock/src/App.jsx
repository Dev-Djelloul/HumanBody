import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from './i18n/index.jsx';
import { CellSim, sleep } from './model/CellSim.js';
import {
  CELL_TYPES, inflammationFrom, lossPerDivision, zoneOf
} from './model/model.js';
import { useProgress, BADGE_IDS } from './hooks/useProgress.js';
import { useSim } from './hooks/useSim.js';
import Header from './components/Header.jsx';
import Modal from './components/Modal.jsx';
import SimulatorSection from './components/SimulatorSection.jsx';
import InflammationPanel from './components/InflammationPanel.jsx';
import TelomeraseSection from './components/TelomeraseSection.jsx';
import LifestyleSection from './components/LifestyleSection.jsx';
import HistorySection from './components/HistorySection.jsx';
import KnowledgeSection from './components/KnowledgeSection.jsx';
import Quiz from './components/Quiz.jsx';
import { Bibliography } from './components/Extras.jsx';

export default function App() {
  const { t } = useI18n();
  const tRef = useRef(t); tRef.current = t;

  /* ---- Réglages de l'expérience ---- */
  const [telo, setTelo] = useState(0);
  const [active, setActive] = useState([]);
  const [type, setType] = useState('skin');
  const [age, setAge] = useState(70);
  const [compare, setCompare] = useState(false);
  const [neuronAge, setNeuronAge] = useState(0);

  /* ---- Inflammaging ---- */
  const [senCount, setSenCount] = useState(0);
  const [clearing, setClearing] = useState(false);
  const gauge = inflammationFrom(senCount);

  /* ---- Interface ---- */
  const [dlg, setDlg] = useState(false);
  const [journal, setJournal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const toastTimer = useRef(0);
  const toast = useCallback(msg => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(''), 4200);
  }, []);
  const progress = useProgress(id => toast(tRef.current('badge.unlocked', { name: tRef.current(`badge.${id}.name`) })));
  const prog = useRef(progress); prog.current = progress;

  /* ---- Moteurs de simulation ---- */
  const sim = useMemo(() => new CellSim('subject'), []);
  const ctrl = useMemo(() => new CellSim('control'), []);
  useSim(sim); useSim(ctrl);

  const ct = CELL_TYPES[type];
  const rate = ct.divides ? lossPerDivision(telo, active, gauge) : 0;
  const ctrlRate = lossPerDivision(0, [], 0);
  const live = useRef({});
  live.current = { rate, ctrlRate };

  useEffect(() => {
    sim.cfg = {
      getRate: () => live.current.rate,
      onDivide: () => prog.current.unlock('first'),
      onSenescent: () => {
        setSenCount(c => c + 1);
        prog.current.unlock('senescent');
        setTimeout(() => setDlg(true), 450);
      },
      onEscape: () => { prog.current.unlock('escape'); toast(tRef.current('toast.escape')); }
    };
    ctrl.cfg = {
      getRate: () => live.current.ctrlRate,
      onSenescent: () => toast(tRef.current('toast.ctrlSen'))
    };
  }, [sim, ctrl, toast]);

  // Couleur d'alerte et badges liés aux réglages
  useEffect(() => {
    sim.alertMode = ct.divides && zoneOf(telo) === 'alert';
    sim.scene?.setTel(sim.displayLen);
    if (ct.divides && zoneOf(telo) === 'therapy') progress.unlock('therapy');
    if (ct.divides && zoneOf(telo) === 'alert') progress.unlock('trap');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [telo, type]);
  useEffect(() => { document.documentElement.dataset.zone = ct.divides ? (['low', 'none'].includes(zoneOf(telo)) ? 'none' : zoneOf(telo)) : 'none'; }, [telo, ct.divides]);
  useEffect(() => { if (active.length >= 3) progress.unlock('life'); /* eslint-disable-next-line */ }, [active]);
  useEffect(() => { progress.trackType('skin'); /* eslint-disable-next-line */ }, []);

  /* ---- Actions ---- */
  const divide = async () => {
    await Promise.all([sim.divideOnce(ct.anim), compare ? ctrl.divideOnce(ct.anim) : null]);
  };
  const ten = async () => {
    for (let i = 0; i < 10; i++) {
      const [a, b] = await Promise.all([sim.divideOnce(0.35), compare ? ctrl.divideOnce(0.35) : false]);
      if (!a && !(compare && b)) break;
    }
  };
  const lifespan = async () => {
    if (sim.looping || ctrl.looping) { sim.requestStop(); ctrl.requestStop(); return; }
    progress.unlock('lifespan');
    const res = await Promise.all([sim.loop(ct.loop), compare ? ctrl.loop(ct.loop) : null]);
    if (res[0] === 'cap') toast(t('toast.cap'));
  };
  const resetCells = () => { sim.reset(); ctrl.reset(); };
  const changeType = id => {
    if (sim.busy || sim.looping) return;
    setType(id); setCompare(false); setNeuronAge(0);
    sim.reset(); ctrl.reset();
    progress.trackType(id);
  };
  const changeCompare = v => {
    if (sim.busy || sim.looping) return;
    setCompare(v);
    if (v) { sim.reset(); ctrl.reset(); progress.unlock('compare'); }
  };
  const toggleHabit = k => setActive(a => (a.includes(k) ? a.filter(x => x !== k) : [...a, k]));

  const senolytics = async () => {
    if (clearing || sim.busy || sim.looping) return;
    const viewerCell = sim.senescent;
    setDlg(false);
    setClearing(true);
    await sleep(1100);
    if (viewerCell) await sim.scene?.burst();
    setSenCount(0);
    if (viewerCell) { sim.reset(); await sim.scene?.fadeIn(); }
    setClearing(false);
    progress.unlock('senolytics');
    toast(t('toast.cleared'));
  };

  const canClear = senCount > 0;

  return (
    <>
      <Header sim={sim} rate={rate} progress={progress} onJournal={() => setJournal(true)} />
      <main className="wrap" style={{ display: 'grid', gap: '5rem', paddingTop: '2.2rem' }}>
        <div style={{ display: 'grid', gap: '2rem' }}>
          <SimulatorSection
            sim={sim} ctrl={ctrl} type={type} compare={compare} rate={rate} ctrlRate={ctrlRate}
            telo={telo} active={active} neuronAge={neuronAge}
            onType={changeType} onCompare={changeCompare} onDivide={divide} onTen={ten}
            onLifespan={lifespan} onReset={resetCells}
            onAgeNeuron={() => setNeuronAge(a => Math.min(100, a + 10))} onResetNeuron={() => setNeuronAge(0)}
          />
          <InflammationPanel senCount={senCount} gauge={gauge} clearing={clearing} canClear={canClear}
            disabled={sim.busy || sim.looping} onClear={senolytics} />
        </div>
        <TelomeraseSection telo={telo} setTelo={setTelo} active={active} type={type} rate={rate} age={age} setAge={setAge} />
        <LifestyleSection active={active} toggle={toggleHabit} type={type} rate={rate} telo={telo} />
        <HistorySection onExplore={() => progress.unlock('myth')} />
        <KnowledgeSection />
        <Quiz onDone={score => { if (score >= 5) progress.unlock('quiz'); }} />
        <Bibliography />
        <footer className="note" style={{ paddingTop: '1rem', borderTop: '1px solid var(--line)' }}>{t('footer.text')}</footer>
      </main>

      {/* Fenêtre de sénescence */}
      <Modal open={dlg} onClose={() => setDlg(false)} labelledBy="dlgTitle">
        <div className="dlg-in">
          <span className="pill dead" style={{ justifySelf: 'start' }}><i /><span>{t('dlg.status')}</span></span>
          <h2 id="dlgTitle" style={{ color: 'var(--red)' }}>{t('dlg.title')}</h2>
          <p>{t('dlg.intro')}</p>
          <ul>{['b1', 'b2', 'b3', 'b4'].map(k => <li key={k}>{t(`dlg.${k}`)}</li>)}</ul>
          <p className="dlg-inflam">{t('dlg.inflam', { n: Math.round(gauge) })}</p>
          <p className="note">{t('dlg.note')}</p>
          <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
            <button className="btn btn-main" type="button" onClick={() => setDlg(false)} style={{ background: 'var(--text)', borderColor: 'var(--text)', boxShadow: 'none' }}>{t('dlg.ok')}</button>
            <button className="btn" type="button" onClick={() => { setDlg(false); resetCells(); }}>{t('dlg.again')}</button>
            {canClear && <button className="btn" type="button" onClick={senolytics}>{t('dlg.clear')}</button>}
            <a className="btn" href="#telomerase" onClick={() => setDlg(false)} style={{ textDecoration: 'none' }}>{t('dlg.go')}</a>
          </div>
        </div>
      </Modal>

      {/* Journal de laboratoire */}
      <Modal open={journal} onClose={() => setJournal(false)} labelledBy="jTitle">
        <div className="dlg-in" style={{ '--zone': 'var(--glow)' }}>
          <h2 id="jTitle">{t('journal.title')}</h2>
          <p className="mute">{t('journal.lede')}</p>
          <div className="bar2" aria-hidden="true"><span style={{ width: `${progress.count / progress.total * 100}%`, background: 'var(--glow)' }} /></div>
          <div className="mono note">{t('journal.progress', { n: progress.count, m: progress.total })}</div>
          <ul className="badge-list">
            {BADGE_IDS.map(id => {
              const on = progress.has(id);
              return (
                <li key={id} className={on ? 'on' : ''}>
                  <span className="medal" aria-hidden="true">{on ? '★' : '·'}</span>
                  <div><b>{t(`badge.${id}.name`)}</b><div className="mute">{on ? t(`badge.${id}.desc`) : `${t('journal.locked')} · ${t(`badge.${id}.desc`)}`}</div></div>
                </li>
              );
            })}
          </ul>
          <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
            <button className="btn btn-main" type="button" onClick={() => setJournal(false)} style={{ boxShadow: 'none' }}>{t('journal.close')}</button>
            <button className="btn btn-ghost" type="button" onClick={progress.reset}>{t('journal.reset')}</button>
          </div>
        </div>
      </Modal>

      <div id="toast" className={toastMsg ? 'show' : ''} role="status" aria-live="polite">{toastMsg}</div>
    </>
  );
}
