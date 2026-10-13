import { calculateOutputs, DEFAULTS } from './model.js';

const translations = {
  fr: {
    backToCollection: '← Collection',
    eyebrow: 'LABORATOIRE CARDIAQUE · MODULE 02',
    titleLine1: 'Chaque battement',
    titleLine2: 'propulse la vie.',
    intro: 'Explore le cycle cardiaque, puis ajuste le rythme et la résistance des vaisseaux pour comprendre comment le cœur met le sang en mouvement.',
    chapter1: '01 / LE CYCLE CARDIAQUE',
    cycleTitle: 'Un cœur, quatre temps',
    liveCycle: 'CYCLE PÉDAGOGIQUE',
    play: 'Animer',
    pause: 'Pause',
    playAria: 'Lancer l’animation du cycle',
    pauseAria: 'Mettre en pause l’animation du cycle',
    phaseNav: 'Phases du cycle cardiaque',
    flowLegend: 'Légende des flux sanguins',
    svgTitle: 'Schéma simplifié de la circulation à travers le cœur',
    svgDesc: 'Le sang pauvre en oxygène passe du corps par l’oreillette droite (OD) et le ventricule droit (VD) vers les poumons. Le sang oxygéné revient par l’oreillette gauche (OG) et le ventricule gauche (VG), qui le propulse dans l’aorte vers le corps.',
    lungs: 'POUMONS',
    body: 'CORPS',
    ra: 'OREILLETTE D.',
    rv: 'VENTRICULE D.',
    la: 'OREILLETTE G.',
    lv: 'VENTRICULE G.',
    fromBody: 'du corps',
    toBody: 'vers le corps',
    rightToLungs: 'CŒUR DROIT → POUMONS → CŒUR GAUCHE',
    lowOxygen: '● pauvre en O₂',
    highOxygen: '● riche en O₂',
    venousBlood: 'Sang pauvre en O₂',
    arterialBlood: 'Sang riche en O₂',
    currentPhase: 'PHASE EN COURS',
    phaseFillTitle: 'Remplissage',
    phaseFillBody: 'Les ventricules se relâchent. Le sang passe des oreillettes vers les ventricules à travers les valves auriculo-ventriculaires ouvertes.',
    phaseAtrialTitle: 'Systole auriculaire',
    phaseAtrialBody: 'Les oreillettes se contractent et complètent le remplissage des ventricules. Les valves auriculo-ventriculaires restent ouvertes.',
    phaseVentricularTitle: 'Systole ventriculaire',
    phaseVentricularBody: 'Les ventricules se contractent. Les valves auriculo-ventriculaires se ferment et les valves de sortie s’ouvrent : le sang est éjecté vers les poumons et l’aorte.',
    phaseRelaxTitle: 'Relaxation',
    phaseRelaxBody: 'Les ventricules se relâchent après l’éjection. Les valves de sortie se ferment ; lorsque la pression baisse, le remplissage recommence.',
    phaseTabFill: 'Remplissage',
    phaseTabAtrial: 'Systole auriculaire',
    phaseTabVentricular: 'Systole ventriculaire',
    phaseTabRelax: 'Relaxation',
    valveFill: 'Valves AV ouvertes · valves de sortie fermées',
    valveAtrial: 'Valves AV ouvertes · valves de sortie fermées',
    valveVentricular: 'Valves AV fermées · valves de sortie ouvertes',
    valveRelax: 'Valves de sortie fermées · remplissage qui reprend',
    valves: 'ÉTAT DES VALVES',
    animationNote: 'Animation schématique : les durées ne sont pas à l’échelle.',
    chapter2: '02 / LE LABORATOIRE',
    labTitle: 'Ajuste le modèle',
    reset: 'Réinitialiser',
    labIntro: 'Modifie un paramètre à la fois et observe les conséquences dans ce modèle simplifié.',
    heartRate: 'Fréquence cardiaque',
    bpm: 'battements/min',
    bpmShort: 'bpm',
    rateHint: 'Une hausse du rythme augmente le nombre de battements par minute.',
    vascularResistance: 'Résistance des vaisseaux',
    resistanceUnit: 'mmHg·min/L',
    resistanceShort: 'unités',
    resistanceHint: 'Dans cette approximation, une résistance plus élevée augmente la pression moyenne calculée.',
    tryPreset: 'ESSAYER UN RÉGLAGE',
    presetRest: 'Repos illustratif',
    presetActive: 'Rythme plus élevé',
    modelOutputs: 'SORTIES DU MODÈLE',
    strokeVolume: 'Volume d’éjection',
    fixedIllustration: 'valeur illustrative fixe',
    cardiacOutput: 'Débit cardiaque',
    meanPressure: 'Pression artérielle moyenne',
    approximate: 'approximation du modèle',
    modelEquations: 'RELATIONS ILLUSTRÉES',
    equationCO: 'débit cardiaque',
    equationMAP: 'résistance périphérique simplifiée',
    modelLimitTitle: 'Un modèle pour apprendre, pas pour prédire.',
    modelLimitBody: 'Le volume d’éjection est fixé à 70 mL pour isoler l’effet de la fréquence dans l’équation. La résistance choisie est une variable pédagogique, pas une mesure clinique. Le modèle ne représente pas les adaptations physiologiques et ses résultats ne décrivent pas la santé d’une personne.',
    chapter3: '03 / LES REPÈRES',
    learnTitle: 'Trois idées à retenir',
    learn1Title: 'Deux pompes en série',
    learn1Body: 'Le côté droit envoie le sang vers les poumons. Le côté gauche propulse le sang oxygéné vers le reste du corps.',
    learn2Title: 'Le cycle alterne',
    learn2Body: 'En diastole, les cavités se remplissent. En systole, elles se contractent : les oreillettes puis les ventricules.',
    learn3Title: 'Débit et pression, pas synonymes',
    learn3Body: 'Le débit décrit un volume éjecté par minute. La pression dépend aussi de la résistance rencontrée par le flux.',
    sourcesTitle: 'Sources et transparence scientifique',
    sourcesIntro: 'Les explications s’appuient sur des ressources ouvertes d’anatomie et de physiologie. Les commandes et valeurs interactives constituent un modèle didactique simplifié, pas une simulation clinique.',
    footerCollection: '← Retour à Human Body',
    footerDisclaimer: 'Expérience éducative — ne remplace pas un avis médical.',
    interpretation: (hr, co) => `À ${hr} battements/min, le débit calculé par le modèle est de ${co.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} L/min.`
  },
  en: {
    backToCollection: '← Collection',
    eyebrow: 'CARDIAC LAB · MODULE 02',
    titleLine1: 'Every heartbeat',
    titleLine2: 'moves life forward.',
    intro: 'Explore the cardiac cycle, then adjust heart rate and vessel resistance to see how the heart moves blood through this simplified model.',
    chapter1: '01 / THE CARDIAC CYCLE',
    cycleTitle: 'One heart, four phases',
    liveCycle: 'EDUCATIONAL CYCLE',
    play: 'Animate',
    pause: 'Pause',
    playAria: 'Play the cardiac cycle animation',
    pauseAria: 'Pause the cardiac cycle animation',
    phaseNav: 'Cardiac cycle phases',
    flowLegend: 'Blood flow legend',
    svgTitle: 'Simplified diagram of blood flow through the heart',
    svgDesc: 'Oxygen-poor blood flows from the body through the right atrium (RA) and right ventricle (RV) to the lungs. Oxygen-rich blood returns through the left atrium (LA) and left ventricle (LV), which pumps it through the aorta to the body.',
    lungs: 'LUNGS',
    body: 'BODY',
    ra: 'RIGHT ATRIUM',
    rv: 'RIGHT VENTRICLE',
    la: 'LEFT ATRIUM',
    lv: 'LEFT VENTRICLE',
    fromBody: 'from body',
    toBody: 'to body',
    rightToLungs: 'RIGHT HEART → LUNGS → LEFT HEART',
    lowOxygen: '● low O₂',
    highOxygen: '● high O₂',
    venousBlood: 'Oxygen-poor blood',
    arterialBlood: 'Oxygen-rich blood',
    currentPhase: 'CURRENT PHASE',
    phaseFillTitle: 'Ventricular filling',
    phaseFillBody: 'The ventricles relax. Blood flows from the atria into the ventricles through the open atrioventricular valves.',
    phaseAtrialTitle: 'Atrial systole',
    phaseAtrialBody: 'The atria contract and complete ventricular filling. The atrioventricular valves remain open.',
    phaseVentricularTitle: 'Ventricular systole',
    phaseVentricularBody: 'The ventricles contract. The atrioventricular valves close and the outflow valves open, ejecting blood toward the lungs and aorta.',
    phaseRelaxTitle: 'Relaxation',
    phaseRelaxBody: 'The ventricles relax after ejection. The outflow valves close; as pressure falls, filling begins again.',
    phaseTabFill: 'Filling',
    phaseTabAtrial: 'Atrial systole',
    phaseTabVentricular: 'Ventricular systole',
    phaseTabRelax: 'Relaxation',
    valveFill: 'AV valves open · outflow valves closed',
    valveAtrial: 'AV valves open · outflow valves closed',
    valveVentricular: 'AV valves closed · outflow valves open',
    valveRelax: 'Outflow valves closed · filling resumes',
    valves: 'VALVE STATE',
    animationNote: 'Schematic animation: timings are not to scale.',
    chapter2: '02 / THE LAB',
    labTitle: 'Adjust the model',
    reset: 'Reset',
    labIntro: 'Change one parameter at a time and observe the result in this simplified model.',
    heartRate: 'Heart rate',
    bpm: 'beats/min',
    bpmShort: 'bpm',
    rateHint: 'A higher rate means more heartbeats each minute.',
    vascularResistance: 'Vessel resistance',
    resistanceUnit: 'mmHg·min/L',
    resistanceShort: 'units',
    resistanceHint: 'In this approximation, higher resistance increases the calculated mean pressure.',
    tryPreset: 'TRY A PRESET',
    presetRest: 'Illustrative rest',
    presetActive: 'Higher rate',
    modelOutputs: 'MODEL OUTPUTS',
    strokeVolume: 'Stroke volume',
    fixedIllustration: 'fixed illustrative value',
    cardiacOutput: 'Cardiac output',
    meanPressure: 'Mean arterial pressure',
    approximate: 'model approximation',
    modelEquations: 'RELATIONSHIPS SHOWN',
    equationCO: 'cardiac output',
    equationMAP: 'simplified peripheral resistance',
    modelLimitTitle: 'A model for learning, not prediction.',
    modelLimitBody: 'Stroke volume is fixed at 70 mL to isolate the effect of heart rate in the equation. The selected resistance is an educational variable, not a clinical measurement. The model does not represent physiological adaptations, and its outputs do not describe anyone’s health.',
    chapter3: '03 / KEY IDEAS',
    learnTitle: 'Three ideas to remember',
    learn1Title: 'Two pumps in series',
    learn1Body: 'The right side sends blood to the lungs. The left side pumps oxygen-rich blood to the rest of the body.',
    learn2Title: 'The cycle alternates',
    learn2Body: 'During diastole, the chambers fill. During systole, they contract: first the atria, then the ventricles.',
    learn3Title: 'Flow and pressure differ',
    learn3Body: 'Flow describes a volume pumped per minute. Pressure also depends on the resistance the flow encounters.',
    sourcesTitle: 'Sources and scientific transparency',
    sourcesIntro: 'The explanations draw on open anatomy and physiology resources. Interactive controls and values form a simplified educational model, not a clinical simulation.',
    footerCollection: '← Back to Human Body',
    footerDisclaimer: 'Educational experience — not a substitute for medical advice.',
    interpretation: (hr, co) => `At ${hr} beats/min, the model calculates a cardiac output of ${co.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} L/min.`
  }
};

const phases = [
  { id: 'fill', title: 'phaseFillTitle', body: 'phaseFillBody', valve: 'valveFill' },
  { id: 'atrial', title: 'phaseAtrialTitle', body: 'phaseAtrialBody', valve: 'valveAtrial' },
  { id: 'ventricular', title: 'phaseVentricularTitle', body: 'phaseVentricularBody', valve: 'valveVentricular' },
  { id: 'relax', title: 'phaseRelaxTitle', body: 'phaseRelaxBody', valve: 'valveRelax' }
];

const byId = id => document.getElementById(id);
const heartPanel = byId('heart-panel');
const langToggle = byId('lang-toggle');
const rateSlider = byId('rate-slider');
const resistanceSlider = byId('resistance-slider');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let language = 'fr';
let phaseIndex = 0;
let playTimer = 0;
let isPlaying = false;

function t(key) {
  return translations[language][key];
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.title = language === 'fr' ? 'Heartbeat Lab — Human Body' : 'Heartbeat Lab — Human Body';
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = t(element.dataset.i18n);
    if (typeof value === 'string') element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
    element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
  });
  byId('heart-svg-title').textContent = t('svgTitle');
  byId('heart-svg-desc').textContent = t('svgDesc');
  langToggle.textContent = language === 'fr' ? 'EN' : 'FR';
  langToggle.setAttribute('aria-label', language === 'fr' ? 'Switch to English' : 'Passer en français');
  if (isPlaying) {
    byId('play-label').textContent = t('pause');
    byId('play-cycle').setAttribute('aria-label', t('pauseAria'));
  }
  renderPhase();
  renderModel();
}

function renderPhase() {
  const phase = phases[phaseIndex];
  heartPanel.dataset.phase = phase.id;
  byId('phase-counter').textContent = `${String(phaseIndex + 1).padStart(2, '0')} / 04`;
  byId('phase-number').textContent = String(phaseIndex + 1).padStart(2, '0');
  byId('phase-title').textContent = t(phase.title);
  byId('phase-description').textContent = t(phase.body);
  byId('valve-text').textContent = t(phase.valve);
  document.querySelectorAll('.phase-tab').forEach((tab, index) => {
    if (index === phaseIndex) {
      tab.classList.add('active');
      tab.setAttribute('aria-current', 'step');
    } else {
      tab.classList.remove('active');
      tab.removeAttribute('aria-current');
    }
  });
}

function stopAnimation() {
  window.clearTimeout(playTimer);
  playTimer = 0;
  isPlaying = false;
  heartPanel.dataset.playing = 'false';
  byId('play-cycle').setAttribute('aria-pressed', 'false');
  byId('play-cycle').setAttribute('aria-label', t('playAria'));
  byId('play-icon').textContent = '▶';
  byId('play-label').textContent = t('play');
}

function advanceAnimation() {
  if (!isPlaying) return;
  phaseIndex = (phaseIndex + 1) % phases.length;
  renderPhase();
  playTimer = window.setTimeout(advanceAnimation, 1800);
}

function toggleAnimation() {
  if (isPlaying) {
    stopAnimation();
    return;
  }
  if (prefersReducedMotion.matches) {
    phaseIndex = (phaseIndex + 1) % phases.length;
    renderPhase();
    return;
  }
  isPlaying = true;
  heartPanel.dataset.playing = 'true';
  byId('play-cycle').setAttribute('aria-pressed', 'true');
  byId('play-cycle').setAttribute('aria-label', t('pauseAria'));
  byId('play-icon').textContent = 'Ⅱ';
  byId('play-label').textContent = t('pause');
  advanceAnimation();
}

function updateRange(input) {
  const min = Number(input.min);
  const max = Number(input.max);
  const progress = ((Number(input.value) - min) / (max - min)) * 100;
  input.style.setProperty('--range-progress', `${progress}%`);
}

function renderModel() {
  const heartRate = Number(rateSlider.value);
  const resistance = Number(resistanceSlider.value);
  const output = calculateOutputs({ heartRate, resistance });
  const cardiacOutput = output.cardiacOutput.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  byId('rate-value').value = String(heartRate);
  byId('resistance-value').value = resistance.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', { maximumFractionDigits: 1 });
  byId('cardiac-output').textContent = cardiacOutput;
  byId('mean-pressure').textContent = String(Math.round(output.meanPressure));
  updateRange(rateSlider);
  updateRange(resistanceSlider);
  byId('interpretation').textContent = t('interpretation')(heartRate, output.cardiacOutput);
  heartPanel.style.setProperty('--beat-period', `${60 / heartRate}s`);
}

function setPreset(name) {
  if (name === 'rest') {
    rateSlider.value = String(DEFAULTS.heartRate);
    resistanceSlider.value = String(DEFAULTS.resistance);
  } else {
    rateSlider.value = '110';
    resistanceSlider.value = '18';
  }
  document.querySelectorAll('.preset-button').forEach(button => {
    button.classList.toggle('active', button.dataset.preset === name);
  });
  renderModel();
}

langToggle.addEventListener('click', () => setLanguage(language === 'fr' ? 'en' : 'fr'));
byId('play-cycle').addEventListener('click', toggleAnimation);
document.querySelectorAll('.phase-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    stopAnimation();
    phaseIndex = Number(tab.dataset.phaseIndex);
    renderPhase();
  });
});
rateSlider.addEventListener('input', () => {
  document.querySelectorAll('.preset-button').forEach(button => button.classList.remove('active'));
  renderModel();
});
resistanceSlider.addEventListener('input', () => {
  document.querySelectorAll('.preset-button').forEach(button => button.classList.remove('active'));
  renderModel();
});
document.querySelectorAll('.preset-button').forEach(button => {
  button.addEventListener('click', () => setPreset(button.dataset.preset));
});
byId('reset-model').addEventListener('click', () => setPreset('rest'));
prefersReducedMotion.addEventListener?.('change', event => {
  if (event.matches) stopAnimation();
});

setLanguage(language);
