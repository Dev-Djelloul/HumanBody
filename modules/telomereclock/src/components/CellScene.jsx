import { useEffect, useId, useMemo, useRef } from 'react';
import { clamp, mulberry32 } from '../model/model.js';
import { REDUCED } from '../model/CellSim.js';
import { useI18n } from '../i18n/index.jsx';

const ARMS = [[150, 50], [250, 50], [150, 370], [250, 370]];
const CHROMO_SCALE = { skin: 0.62, liver: 0.6, neuron: 0.44 };
const NUCLEUS_R = { skin: 122, liver: 120, neuron: 86 };
const DENDRITES = [
  'M0,0 C-80,-60 -150,-90 -240,-150',
  'M0,0 C-90,40 -170,70 -260,60',
  'M0,0 C60,-80 120,-120 210,-170',
  'M0,0 C80,60 160,100 240,150',
  'M0,0 C0,90 -10,150 -22,200'
];
const T = (x, s) => `translate(${x}px,210px) scale(${s})`;

/* Granules de lipofuscine (neurone), positions déterministes hors du chromosome. */
function granulePoints(n = 30) {
  const r = mulberry32(77), pts = [];
  while (pts.length < n) {
    const a = r() * Math.PI * 2, d = 56 + r() * 46;
    const x = Math.cos(a) * d, y = Math.sin(a) * d;
    if (Math.abs(x) < 40 && Math.abs(y) < 88) continue;
    pts.push([x, y, 3.5 + r() * 2.5]);
  }
  return pts;
}
const GRANULES = granulePoints();

const mix = (c1, c2, t) => c1.map((v, i) => Math.round(v + (c2[i] - v) * t));
export function colorFor(len, alert) {
  if (alert) return [255, 69, 104];
  const f = clamp((len - 4000) / 6000, 0, 1);
  const aqua = [53, 240, 210], amber = [255, 194, 75], grey = [125, 132, 160];
  return f > 0.4 ? mix(amber, aqua, (f - 0.4) / 0.6) : mix(grey, amber, f / 0.4);
}

function Shape({ type, main, fill }) {
  const cls = main ? 'mem-main' : undefined;
  if (type === 'liver') return <rect className={cls} x="-142" y="-142" width="284" height="284" rx="84" fill={fill} />;
  if (type === 'neuron') {
    return (
      <g className={cls}>
        <circle r="112" fill={fill} />
        {DENDRITES.map((d, i) => <path key={i} d={d} fill="none" stroke={fill} strokeWidth={i === 4 ? 22 : 17} strokeLinecap="round" />)}
      </g>
    );
  }
  return <ellipse className={cls} rx="166" ry="142" fill={fill} />;
}

function Chromosome({ grp, scale, uid, telRefs }) {
  return (
    <g transform={`scale(${scale}) translate(-200,-210)`}>
      {ARMS.map((a, i) => <line key={'a' + i} className="arm" stroke={`url(#${uid}body)`} x1={a[0]} y1={a[1]} x2="200" y2="210" />)}
      {ARMS.map((a, i) => <line key={'b' + i} className="band" x1={a[0]} y1={a[1]} x2="200" y2="210" />)}
      <circle cx="200" cy="210" r="17" fill="#4b3ec4" stroke="#c9c2ff" strokeWidth="2" />
      <g className="telg" filter={`url(#${uid}glow)`}>
        {ARMS.map((a, i) => (
          <line key={'t' + i} className="tel" x1={a[0]} y1={a[1]} x2={a[0]} y2={a[1]}
            ref={el => { telRefs.current[grp + i] = el; }} />
        ))}
      </g>
    </g>
  );
}

/**
 * Scène SVG d'une cellule. Les animations de division sont impératives (Web Animations API)
 * car elles se synchronisent à l'image près avec la longueur télomérique ; l'état métier
 * reste dans CellSim. La scène s'y enregistre via sim.scene.
 */
export default function CellScene({ sim, type, senescent, waste = 0, primary = false, label, children }) {
  const { t } = useI18n();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const svgRef = useRef(null), floodRef = useRef(null), burstRef = useRef(null);
  const memA = useRef(null), memB = useRef(null), chrA = useRef(null), chrB = useRef(null);
  const telRefs = useRef({});
  const live = useRef({ sim, primary });
  live.current = { sim, primary };

  const api = useMemo(() => {
    const run = (target, keyframes, end, ms, easing = 'cubic-bezier(.3,.7,.2,1)') => {
      const el = target.current;
      if (!el) return Promise.resolve();
      const a = el.animate(keyframes, { duration: REDUCED ? 0 : ms, easing, fill: 'forwards' });
      return a.finished.then(() => { Object.assign(el.style, end); a.cancel(); }).catch(() => {});
    };
    const sleep = ms => new Promise(r => setTimeout(r, REDUCED ? 0 : ms));

    return {
      setTel(len) {
        const L = 54 * (0.35 + 0.65 * clamp((len - 3500) / 6500, 0, 1));
        for (const key in telRefs.current) {
          const line = telRefs.current[key];
          if (!line) continue;
          const a = ARMS[+key.slice(1)];
          const dx = 200 - a[0], dy = 210 - a[1], d = Math.hypot(dx, dy);
          line.setAttribute('x2', a[0] + dx / d * L);
          line.setAttribute('y2', a[1] + dy / d * L);
        }
        const [r, g, b] = colorFor(len, live.current.sim.alertMode);
        const css = `rgb(${r},${g},${b})`;
        svgRef.current?.style.setProperty('--tel', css);
        floodRef.current?.setAttribute('flood-color', css);
        if (live.current.primary) {
          const root = document.documentElement.style;
          root.setProperty('--tel', css);
          root.setProperty('--tel-text', css);
        }
      },

      async divide(k, tween, from, to) {
        await Promise.all([memA, chrA].map(r => run(r,
          [{ transform: T(320, 1) }, { transform: T(320, 1.04) }, { transform: T(320, 1) }],
          { transform: T(320, 1) }, 420 * k, 'ease-in-out')));
        memB.current.style.opacity = chrB.current.style.opacity = 1;
        const tw = tween(from, to, 700 * k);
        await Promise.all([
          run(memA, [{ transform: T(320, 1) }, { transform: T(185, .66) }], { transform: T(185, .66) }, 700 * k),
          run(chrA, [{ transform: T(320, 1) }, { transform: T(185, .66) }], { transform: T(185, .66) }, 700 * k),
          run(memB, [{ transform: T(320, 1) }, { transform: T(455, .66) }], { transform: T(455, .66) }, 700 * k),
          run(chrB, [{ transform: T(320, 1) }, { transform: T(455, .66) }], { transform: T(455, .66) }, 700 * k),
          tw
        ]);
        await sleep(180 * k);
        await Promise.all([
          run(memB, [{ opacity: 1, transform: T(455, .66) }, { opacity: 0, transform: T(470, .4) }], { opacity: 0, transform: T(320, 1) }, 380 * k),
          run(chrB, [{ opacity: 1, transform: T(455, .66) }, { opacity: 0, transform: T(470, .4) }], { opacity: 0, transform: T(320, 1) }, 380 * k),
          run(memA, [{ transform: T(185, .66) }, { transform: T(320, 1) }], { transform: T(320, 1) }, 600 * k),
          run(chrA, [{ transform: T(185, .66) }, { transform: T(320, 1) }], { transform: T(320, 1) }, 600 * k)
        ]);
      },

      /** Effet sénolytique : la cellule sénescente éclate en particules, puis disparaît. */
      async burst() {
        const g = burstRef.current;
        const parts = [];
        if (g && !REDUCED) {
          const cols = ['#a99eff', '#35f0d2', '#ffffff'];
          for (let i = 0; i < 18; i++) {
            const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c.setAttribute('r', 4 + (i % 3) * 2);
            c.setAttribute('fill', cols[i % 3]);
            g.appendChild(c);
            const ang = (i / 18) * Math.PI * 2, dist = 130 + (i % 4) * 28;
            parts.push(c.animate(
              [{ transform: 'translate(0px,0px) scale(1)', opacity: 1 },
               { transform: `translate(${Math.cos(ang) * dist}px,${Math.sin(ang) * dist}px) scale(.2)`, opacity: 0 }],
              { duration: 720, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }
            ).finished.then(() => c.remove()).catch(() => c.remove()));
          }
        }
        const gone = [{ transform: T(320, 1), opacity: 1 }, { transform: T(320, 1.25), opacity: 0 }];
        const end = { transform: T(320, 1.25), opacity: 0 };
        await Promise.all([run(memA, gone, end, 620), run(chrA, gone, end, 620), ...parts]);
      },

      async fadeIn() {
        const from = [{ opacity: 0, transform: T(320, .8) }, { opacity: 1, transform: T(320, 1) }];
        const end = { opacity: 1, transform: T(320, 1) };
        await Promise.all([run(memA, from, end, 520), run(chrA, from, end, 520)]);
      }
    };
  }, []);

  useEffect(() => {
    sim.scene = api;
    api.setTel(sim.displayLen);
    return () => { if (sim.scene === api) sim.scene = null; };
  }, [sim, api, type]);

  const fill = senescent ? '#1c2036' : '#16234d';
  const scale = CHROMO_SCALE[type];
  const grains = type === 'neuron' ? Math.round(waste / 100 * GRANULES.length) : 0;
  const initA = { transform: 'translate(320px,210px)' };
  const initB = { transform: 'translate(320px,210px)', opacity: 0 };

  return (
    <div className="viewer">
      <div className="viewer-tags">{children}</div>
      <svg ref={svgRef} className={senescent ? 'sen' : ''} viewBox="0 0 640 440" role="img"
        aria-label={t(`scene.aria.${type}`)}>
        <defs>
          <filter id={`${uid}goo`} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo" />
            <feMorphology in="goo" operator="dilate" radius="2.4" result="big" />
            <feFlood ref={floodRef} floodColor="#35f0d2" floodOpacity=".6" result="fc" />
            <feComposite in="fc" in2="big" operator="in" result="ringfull" />
            <feComposite in="ringfull" in2="goo" operator="out" result="ring" />
            <feMerge><feMergeNode in="ring" /><feMergeNode in="goo" /></feMerge>
          </filter>
          <filter id={`${uid}glow`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="g" />
            <feMerge><feMergeNode in="g" /><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id={`${uid}body`} gradientUnits="userSpaceOnUse" x1="150" y1="50" x2="250" y2="370">
            <stop offset="0" stopColor="#a99eff" /><stop offset="1" stopColor="#6d5bf5" />
          </linearGradient>
          <radialGradient id={`${uid}nuc`}>
            <stop offset="0" stopColor="#ffffff" stopOpacity=".07" /><stop offset="1" stopColor="#ffffff" stopOpacity=".01" />
          </radialGradient>
        </defs>

        <g className="scale-bar" aria-hidden="true">
          <line x1="40" y1="408" x2="104" y2="408" stroke="#7e8bb5" strokeWidth="2" />
          <line x1="40" y1="402" x2="40" y2="414" stroke="#7e8bb5" strokeWidth="2" />
          <line x1="104" y1="402" x2="104" y2="414" stroke="#7e8bb5" strokeWidth="2" />
          <text x="40" y="396">{type === 'neuron' ? '20 µm' : '10 µm'}</text>
        </g>

        <g filter={`url(#${uid}goo)`}>
          <g ref={memB} style={initB}><Shape type={type} fill={fill} /></g>
          <g ref={memA} style={initA}><Shape type={type} fill={fill} main /></g>
        </g>

        <g ref={chrB} style={initB}>
          <circle r={NUCLEUS_R[type]} fill={`url(#${uid}nuc)`} stroke="#3a4a85" strokeDasharray="4 6" />
          <Chromosome grp="B" scale={scale} uid={uid} telRefs={telRefs} />
        </g>
        <g ref={chrA} style={initA}>
          <circle r={NUCLEUS_R[type]} fill={`url(#${uid}nuc)`} stroke="#3a4a85" strokeDasharray="4 6" />
          {GRANULES.slice(0, grains).map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={p[2]} fill="#c8913a" opacity=".9" />
          ))}
          <Chromosome grp="A" scale={scale} uid={uid} telRefs={telRefs} />
        </g>
        <g ref={burstRef} transform="translate(320 210)" />
      </svg>
      {label && <span className="viewer-label">{label}</span>}
    </div>
  );
}
