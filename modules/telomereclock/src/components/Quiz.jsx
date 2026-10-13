import { useState } from 'react';
import { useI18n } from '../i18n/index.jsx';

export default function Quiz({ onDone }) {
  const { t } = useI18n();
  const items = t('quiz.items');
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = items[idx];
  const answered = picked !== null;

  const choose = i => {
    if (answered) return;
    setPicked(i);
    if (i === q.a) setScore(s => s + 1);
  };
  const next = () => {
    if (idx + 1 >= items.length) {
      setDone(true);
      onDone?.(score);
    } else { setIdx(idx + 1); setPicked(null); }
  };
  const restart = () => { setIdx(0); setPicked(null); setScore(0); setDone(false); };
  const pct = Math.round((done ? items.length : idx + (answered ? 1 : 0)) / items.length * 100);

  return (
    <section id="quiz" aria-labelledby="t-quiz" style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gap: '.7rem' }}>
        <h2 id="t-quiz">{t('quiz.title')}</h2>
        <p className="lede">{t('quiz.lede')}</p>
      </div>
      <div className="panel" style={{ display: 'grid', gap: '1rem', maxWidth: '48rem' }}>
        <div className="bar2" aria-hidden="true"><span style={{ width: `${pct}%`, background: 'var(--glow)' }} /></div>
        {!done ? (
          <>
            <div className="label mono">{t('quiz.count', { i: idx + 1, n: items.length })}</div>
            <h3 style={{ fontFamily: 'var(--f-body)', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.4 }}>{q.q}</h3>
            <div style={{ display: 'grid', gap: '.6rem' }} role="group" aria-label={q.q}>
              {q.o.map((o, i) => {
                const state = !answered ? '' : i === q.a ? 'right' : i === picked ? 'wrong' : 'dim';
                return (
                  <button key={i} type="button" className={`opt ${state}`} onClick={() => choose(i)} aria-pressed={picked === i}>
                    <span className="mono">{String.fromCharCode(65 + i)}</span><span>{o}</span>
                  </button>
                );
              })}
            </div>
            <div aria-live="polite" style={{ minHeight: '1.5rem' }}>
              {answered && (
                <p className={picked === q.a ? 'quiz-ok' : 'quiz-ko'}>
                  <b>{picked === q.a ? t('quiz.right') : t('quiz.wrong')}</b> <span className="mute">{q.e}</span>
                </p>
              )}
            </div>
            <div><button className="btn btn-main" type="button" onClick={next} disabled={!answered}>{idx + 1 >= items.length ? t('quiz.finish') : t('quiz.next')}</button></div>
          </>
        ) : (
          <div style={{ display: 'grid', gap: '.8rem' }} role="status">
            <div className="big" style={{ fontSize: '3rem' }}>{score}<small>/ {items.length}</small></div>
            <p>{score >= 5 ? t('quiz.resultGood') : t('quiz.resultTry')}</p>
            <div><button className="btn" type="button" onClick={restart}>{t('quiz.restart')}</button></div>
          </div>
        )}
      </div>
    </section>
  );
}
