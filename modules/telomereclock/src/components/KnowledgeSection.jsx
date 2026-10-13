import { useState } from 'react';
import { useI18n } from '../i18n/index.jsx';

function ReplicationProblem() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const on = list => ({ className: `stp ${list.includes(step) ? 'on' : ''}` });
  const mono = { fontFamily: 'JetBrains Mono, monospace' };
  return (
    <div className="panel" style={{ display: 'grid', gap: '1rem' }}>
      <div className="panel-h" style={{ margin: 0 }}>
        <h3>{t('erp.title')}</h3>
        <div className="tabs" role="tablist" aria-label={t('erp.tabs')}>
          {[1, 2, 3].map(n => (
            <button key={n} type="button" role="tab" aria-selected={step === n} onClick={() => setStep(n)}>{t('erp.step', { n })}</button>
          ))}
        </div>
      </div>
      <div className="viewer">
        <svg viewBox="0 0 640 230" role="img" aria-label={t('erp.aria')} style={{ padding: '8px 8px 4px' }}>
          <g {...mono} fontSize="11" fill="#8793bd">
            <text x="40" y="26">{t('erp.leading')}</text>
            <text x="40" y="116">{t('erp.lagging')}</text>
          </g>
          <rect x="40" y="36" width="560" height="14" rx="7" fill="#6d5bf5" />
          <rect x="40" y="126" width="560" height="14" rx="7" fill="#6d5bf5" />
          <text x="46" y="48" fontSize="9" fill="#fff" {...mono}>{t('erp.template')}</text>
          <text x="46" y="138" fontSize="9" fill="#fff" {...mono}>{t('erp.template')}</text>
          <rect x="560" y="30" width="46" height="26" rx="13" fill="none" stroke="#35f0d2" strokeWidth="2" opacity=".9" />
          <rect x="560" y="120" width="46" height="26" rx="13" fill="none" stroke="#35f0d2" strokeWidth="2" opacity=".9" />
          <text x="470" y="86" fontSize="11" fill="#35f0d2" {...mono}>{t('erp.telomere')}</text>
          <rect {...on([1, 2, 3])} x="40" y="54" width="560" height="12" rx="6" fill="#35f0d2" />
          <g {...on([2])}>
            <rect x="60" y="144" width="122" height="12" rx="3" fill="#35f0d2" />
            <rect x="190" y="144" width="122" height="12" rx="3" fill="#35f0d2" />
            <rect x="320" y="144" width="122" height="12" rx="3" fill="#35f0d2" />
            <rect x="450" y="144" width="100" height="12" rx="3" fill="#35f0d2" />
            <rect x="172" y="144" width="12" height="12" fill="#ff4568" />
            <rect x="302" y="144" width="12" height="12" fill="#ff4568" />
            <rect x="432" y="144" width="12" height="12" fill="#ff4568" />
            <rect x="540" y="144" width="12" height="12" fill="#ff4568" />
            <rect x="572" y="144" width="26" height="12" rx="3" fill="none" stroke="#ff4568" strokeDasharray="3 3" />
            <text x="64" y="178" fontSize="11" fill="#ff4568" {...mono}>{t('erp.primers')}</text>
          </g>
          <g {...on([3])}>
            <rect x="60" y="144" width="494" height="12" rx="3" fill="#35f0d2" />
            <rect x="554" y="144" width="46" height="12" rx="3" fill="none" stroke="#ff4568" strokeWidth="2" strokeDasharray="4 4" />
            <text x="470" y="178" fontSize="11" fill="#ff4568" {...mono}>{t('erp.gap')}</text>
          </g>
          <text x="40" y="214" fontSize="11" fill="#8793bd" {...mono}>{t('erp.footer')}</text>
        </svg>
      </div>
      <p className="mute" style={{ maxWidth: '72ch', minHeight: '3.2em' }}>{t(`erp.text${step}`)}</p>
    </div>
  );
}

export default function KnowledgeSection() {
  const { t } = useI18n();
  const timeline = t('timeline');
  const research = t('research');
  return (
    <section id="savoirs" aria-labelledby="t-sav" style={{ display: 'grid', gap: '2rem' }}>
      <div style={{ display: 'grid', gap: '.7rem' }}>
        <h2 id="t-sav">{t('know.title')}</h2>
        <p className="lede">{t('know.lede')}</p>
      </div>
      <ReplicationProblem />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]" style={{ alignItems: 'start' }}>
        <div className="panel">
          <div className="panel-h"><h3>{t('know.nobel')}</h3><span className="badge a">{t('know.nobelBadge')}</span></div>
          <ol className="tl">
            {timeline.map(e => (
              <li key={e.y + e.t} className={e.nobel ? 'nobel' : ''}>
                <span className="yr">{e.y}</span>
                <div><b>{e.t}</b><div className="mute">{e.d}</div></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="panel" style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <h3>{t('know.research')}</h3>
            <p className="note" style={{ marginTop: '.4rem' }}>{t('know.researchNote')}</p>
          </div>
          <div className="card-grid">
            {research.map(r => (
              <article key={r.name}>
                <div>
                  <h3>{r.name}<span className={`badge ${r.badge[0]}`}>{r.badge[1]}</span></h3>
                  <div className="stage">{r.stage}</div>
                </div>
                <p className="mute" style={{ fontSize: '.9rem' }}>{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
