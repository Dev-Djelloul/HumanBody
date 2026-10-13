// Vérifie que chaque clé t('...') / t(`...`) utilisée dans le code existe en FR et en EN,
// et que les deux dictionnaires ont exactement la même structure.
import fs from 'node:fs';
import path from 'node:path';
import fr from '../src/i18n/fr.js';
import en from '../src/i18n/en.js';

const get = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(path.join(d, e.name)) : /\.(jsx?|mjs)$/.test(e.name) ? [path.join(d, e.name)] : []);

const keys = new Set(); const dynamic = [];
for (const f of walk('src')) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/\bt\(\s*(['"`])([^'"`]+)\1/g)) {
    if (m[2].includes('${')) dynamic.push([f, m[2]]); else keys.add(m[2]);
  }
  // t(cond ? 'a.b' : 'c.d')
  for (const m of s.matchAll(/\bt\(\s*[\w.!() ]+\?\s*'([^']+)'\s*:\s*'([^']+)'/g)) { keys.add(m[1]); keys.add(m[2]); }
}
let bad = 0;
keys.add('read.year');
for (const k of keys) for (const [name, d] of [['fr', fr], ['en', en]]) {
  if (get(d, k) === undefined) { console.error(`clé manquante (${name}) : ${k}`); bad++; }
}
// Clés dynamiques : on les développe avec les valeurs connues
const expand = {
  'cell.${id}.name': ['skin', 'liver', 'neuron'].map(x => `cell.${x}.name`),
  'cell.${type}.name': ['skin', 'liver', 'neuron'].map(x => `cell.${x}.name`),
  'cell.${type}.tempo': ['skin', 'liver', 'neuron'].map(x => `cell.${x}.tempo`),
  'cell.${type}.desc': ['skin', 'liver', 'neuron'].map(x => `cell.${x}.desc`),
  'life.state.${lifeKey}': ['neutral', 'fast', 'protect', 'mixed'].map(x => `life.state.${x}`),
  'phase.${phaseKey}': ['ready', 'phaseS', 'phaseMitosis', 'phaseMitosisTelo', 'phaseSen', 'phaseFirst', 'neuron'].map(x => `phase.${x}`),
  'status.${st.key}': ['prolif', 'short', 'senescent', 'immortal', 'postmitotic'].map(x => `status.${x}`),
  'scene.aria.${type}': ['skin', 'liver', 'neuron'].map(x => `scene.aria.${x}`),
  'zone.${zone}.title': ['none', 'low', 'therapy', 'grey', 'alert'].map(x => `zone.${x}.title`),
  'zone.${zone}.text': ['none', 'low', 'therapy', 'grey', 'alert'].map(x => `zone.${x}.text`),
  'factor.${id}.name': ['stress', 'smoking', 'sleep', 'diet', 'exercise'].map(x => `factor.${x}.name`),
  'factor.${id}.eff': ['stress', 'smoking', 'sleep', 'diet', 'exercise'].map(x => `factor.${x}.eff`),
  'factor.${id}.why': ['stress', 'smoking', 'sleep', 'diet', 'exercise'].map(x => `factor.${x}.why`),
  'factor.${id}.ref': ['stress', 'smoking', 'sleep', 'diet', 'exercise'].map(x => `factor.${x}.ref`),
  'myth.era.${id}': ['medieval', 'modern'].map(x => `myth.era.${x}`),
  'myth.shield.${id}.t': ['water', 'vaccine', 'hygiene'].map(x => `myth.shield.${x}.t`),
  'myth.shield.${id}.d': ['water', 'vaccine', 'hygiene'].map(x => `myth.shield.${x}.d`),
  'myth.shield.${id}.y': ['water', 'vaccine', 'hygiene'].map(x => `myth.shield.${x}.y`),
  'erp.text${step}': [1, 2, 3].map(x => `erp.text${x}`),
  'inflam.s${n}t': ['1', '2', '3'].map(x => `inflam.s${x}t`),
  'inflam.s${n}d': ['1', '2', '3'].map(x => `inflam.s${x}d`),
  'nav.${k}': ['sim', 'telo', 'life', 'history', 'know', 'quiz'].map(x => `nav.${x}`),
  'dlg.${k}': ['b1', 'b2', 'b3', 'b4'].map(x => `dlg.${x}`),
  'badge.${id}.name': ['first', 'senescent', 'lifespan', 'types', 'therapy', 'trap', 'life', 'senolytics', 'compare', 'myth', 'quiz', 'escape'].map(x => `badge.${x}.name`),
  'badge.${id}.desc': ['first', 'senescent', 'lifespan', 'types', 'therapy', 'trap', 'life', 'senolytics', 'compare', 'myth', 'quiz', 'escape'].map(x => `badge.${x}.desc`),
  'biblio.g.${g.g}': ['core', 'life', 'aging', 'hist', 'research'].map(x => `biblio.g.${x}`),
  'hub.${m.s}': ['active', 'soon'].map(x => `hub.${x}`),
  'tissue.${neuron}': []
};
for (const [f, k] of dynamic) {
  const list = expand[k];
  if (!list) { console.error(`clé dynamique non couverte : ${k} (${f})`); bad++; continue; }
  for (const kk of list) for (const [name, d] of [['fr', fr], ['en', en]])
    if (get(d, kk) === undefined) { console.error(`clé manquante (${name}) : ${kk}`); bad++; }
}
// Même structure FR / EN
const shape = (o, p = '') => Object.entries(o).flatMap(([k, v]) =>
  Array.isArray(v) ? [`${p}${k}[${v.length}]`] : typeof v === 'object' ? shape(v, `${p}${k}.`) : [`${p}${k}`]);
const a = new Set(shape(fr)), b = new Set(shape(en));
for (const k of a) if (!b.has(k)) { console.error(`absent de en : ${k}`); bad++; }
for (const k of b) if (!a.has(k)) { console.error(`absent de fr : ${k}`); bad++; }
if (bad) { console.error(`${bad} problème(s) i18n`); process.exit(1); }
console.log(`i18n : OK (${keys.size} clés statiques, ${dynamic.length} clés dynamiques)`);
