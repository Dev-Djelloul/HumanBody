import {
  getResponseProfile,
  getResponseStage,
  RESPONSE_STAGE_COUNT
} from './model.js';

const translations = {
  fr: {
    stages: Array.from({ length: RESPONSE_STAGE_COUNT }, (_, index) => {
      const stage = getResponseStage(index);
      return { name: stage.fr, description: stage.descriptionFr };
    }),
    stageCounter: index => `${String(index).padStart(2, '0')} / 04`,
    start: 'Lancer la réponse',
    next: 'Étape suivante',
    complete: 'Réponse illustrée terminée',
    ready: 'À la rencontre d’un agent infectieux',
    firstDelay: getResponseProfile('first').delayFr,
    firstStrength: getResponseProfile('first').strengthFr,
    memoryDelay: getResponseProfile('memory').delayFr,
    memoryStrength: getResponseProfile('memory').strengthFr,
    title: 'Immune Arena — Human Body',
    description: 'Explore les défenses immunitaires, les anticorps et la mémoire immunitaire avec des modèles interactifs.'
  },
  en: {
    stages: Array.from({ length: RESPONSE_STAGE_COUNT }, (_, index) => {
      const stage = getResponseStage(index);
      return { name: stage.en, description: stage.descriptionEn };
    }),
    stageCounter: index => `${String(index).padStart(2, '0')} / 04`,
    start: 'Start the response',
    next: 'Next step',
    complete: 'Illustrated response complete',
    ready: 'Encountering an infectious agent',
    firstDelay: getResponseProfile('first').delayEn,
    firstStrength: getResponseProfile('first').strengthEn,
    memoryDelay: getResponseProfile('memory').delayEn,
    memoryStrength: getResponseProfile('memory').strengthEn,
    title: 'Immune Arena — Human Body',
    description: 'Explore immune defences, antibodies, and immune memory with interactive models.'
  }
};

const byId = id => document.getElementById(id);
const languageToggle = byId('lang-toggle');
const advanceButton = byId('advance-response');
const resetButton = byId('reset-response');
const arena = byId('arena');
const stageCounter = byId('stage-counter');
const stageName = byId('stage-name');
const stageDescription = byId('stage-description');
const comparison = byId('comparison');
const delayCaption = byId('delay-caption');
const strengthCaption = byId('strength-caption');
let language = 'fr';
let stageIndex = 0;
let scenario = 'first';

function updateResponse() {
  const copy = translations[language];
  const stage = copy.stages[stageIndex];
  arena.dataset.stage = String(stageIndex);
  stageCounter.textContent = copy.stageCounter(stageIndex);
  stageName.textContent = stage.name;
  stageDescription.textContent = stage.description;
  advanceButton.textContent = stageIndex === 0 ? copy.start : copy.next;
  advanceButton.disabled = stageIndex === RESPONSE_STAGE_COUNT - 1;
  if (stageIndex === RESPONSE_STAGE_COUNT - 1) advanceButton.textContent = copy.complete;
  resetButton.disabled = stageIndex === 0;
  document.querySelectorAll('[data-stage-dot]').forEach(dot => {
    const index = Number(dot.dataset.stageDot);
    dot.classList.toggle('is-current', index === stageIndex);
    dot.classList.toggle('is-complete', index < stageIndex);
    if (index === stageIndex) dot.setAttribute('aria-current', 'step');
    else dot.removeAttribute('aria-current');
  });
}

function updateComparison() {
  const profile = getResponseProfile(scenario);
  comparison.dataset.scenario = scenario;
  comparison.querySelector('.delay-bar').style.setProperty('--bar-level', `${profile.delay * 20}%`);
  comparison.querySelector('.strength-bar').style.setProperty('--bar-level', `${profile.strength * 20}%`);
  delayCaption.textContent = translations[language][scenario === 'first' ? 'firstDelay' : 'memoryDelay'];
  strengthCaption.textContent = translations[language][scenario === 'first' ? 'firstStrength' : 'memoryStrength'];
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.title = translations[language].title;
  document.querySelector('meta[name="description"]').content = translations[language].description;

  document.querySelectorAll('[data-fr][data-en]').forEach(element => {
    element.textContent = element.dataset[language];
  });
  document.querySelectorAll('[data-fr-aria-label][data-en-aria-label]').forEach(element => {
    element.setAttribute('aria-label', element.dataset[`${language}AriaLabel`]);
  });

  languageToggle.textContent = language === 'fr' ? 'EN' : 'FR';
  languageToggle.setAttribute('aria-label', language === 'fr' ? 'Switch to English' : 'Passer en français');
  updateResponse();
  updateComparison();
}

languageToggle.addEventListener('click', () => {
  setLanguage(language === 'fr' ? 'en' : 'fr');
});

advanceButton.addEventListener('click', () => {
  if (stageIndex < RESPONSE_STAGE_COUNT - 1) {
    stageIndex += 1;
    updateResponse();
  }
});

resetButton.addEventListener('click', () => {
  stageIndex = 0;
  updateResponse();
});

document.querySelectorAll('.scenario-button').forEach(button => {
  button.addEventListener('click', () => {
    scenario = button.dataset.scenario;
    document.querySelectorAll('.scenario-button').forEach(option => {
      const isSelected = option === button;
      option.classList.toggle('is-active', isSelected);
      option.setAttribute('aria-pressed', String(isSelected));
    });
    updateComparison();
  });
});

updateResponse();
updateComparison();
