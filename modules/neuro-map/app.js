import { getPlasticityLevel, MAX_STIMULATIONS } from './model.js';

const text = {
  fr: {
    parts: {
      dendrites: 'Les dendrites reçoivent des signaux provenant d’autres cellules et les conduisent vers le corps cellulaire.',
      soma: 'Le corps cellulaire intègre des signaux entrants et contient le noyau et les organites de la cellule.',
      axon: 'L’axone conduit le potentiel d’action vers les terminaisons. Sa longueur varie beaucoup selon les neurones.',
      synapse: 'Les terminaisons transmettent le message à une autre cellule, souvent en libérant des neurotransmetteurs.'
    },
    signalReady: 'Prêt à transmettre un signal.',
    signalBusy: 'Le signal parcourt le neurone…',
    signalDone: 'Le signal a atteint la synapse.',
    levels: ['Connexion à explorer', 'Première association illustrée', 'Association illustrée', 'Connexion illustrée renforcée', 'Étape maximale de cette illustration'],
    title: 'Neuro Map — Human Body',
    description: 'Explore le neurone, la transmission synaptique et la plasticité grâce à des expériences interactives.'
  },
  en: {
    parts: {
      dendrites: 'Dendrites receive signals from other cells and carry them toward the cell body.',
      soma: 'The cell body integrates incoming signals and contains the cell nucleus and organelles.',
      axon: 'The axon carries action potentials toward the terminals. Axon length varies widely among neurons.',
      synapse: 'The terminals pass the message to another cell, often by releasing neurotransmitters.'
    },
    signalReady: 'Ready to send a signal.',
    signalBusy: 'The signal is travelling through the neuron…',
    signalDone: 'The signal has reached the synapse.',
    levels: ['Connection to explore', 'First illustrated pairing', 'Illustrated pairing', 'Illustrated connection strengthened', 'Maximum step in this illustration'],
    title: 'Neuro Map — Human Body',
    description: 'Explore neurons, synaptic transmission, and plasticity through interactive experiences.'
  }
};

const byId = id => document.getElementById(id);
const languageToggle = byId('lang-toggle');
const neuron = byId('neuron-svg');
const fireButton = byId('fire-signal');
const signalStatus = byId('signal-status');
const partDescription = byId('part-description');
const connection = byId('connection');
const connectionLabel = byId('connection-label');
const experienceCount = byId('experience-count');
const repeatButton = byId('repeat-stimulation');
const resetButton = byId('reset-stimulation');
let language = 'fr';
let selectedPart = 'dendrites';
let stimulations = 0;
let signalState = 'ready';
let signalTimer;

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.title = text[language].title;
  document.querySelector('meta[name="description"]').content = text[language].description;

  document.querySelectorAll('[data-fr][data-en]').forEach(element => {
    element.textContent = element.dataset[language];
  });
  document.querySelectorAll('[data-fr-aria-label][data-en-aria-label]').forEach(element => {
    element.setAttribute('aria-label', element.dataset[`${language}AriaLabel`]);
  });

  languageToggle.textContent = language === 'fr' ? 'EN' : 'FR';
  languageToggle.setAttribute('aria-label', language === 'fr' ? 'Switch to English' : 'Passer en français');
  partDescription.textContent = text[language].parts[selectedPart];
  signalStatus.textContent = text[language][`signal${signalState[0].toUpperCase()}${signalState.slice(1)}`];
  updatePlasticity();
}

function updatePlasticity() {
  const level = getPlasticityLevel(stimulations);
  connection.dataset.level = String(level);
  connection.setAttribute('aria-label', text[language].levels[level]);
  connectionLabel.textContent = text[language].levels[level];
  experienceCount.textContent = String(stimulations);
  repeatButton.disabled = stimulations >= MAX_STIMULATIONS;
  resetButton.disabled = stimulations === 0;
}

languageToggle.addEventListener('click', () => {
  setLanguage(language === 'fr' ? 'en' : 'fr');
});

document.querySelectorAll('.part-tab').forEach(button => {
  button.addEventListener('click', () => {
    selectedPart = button.dataset.part;
    document.querySelectorAll('.part-tab').forEach(tab => {
      const isSelected = tab === button;
      tab.classList.toggle('is-active', isSelected);
      tab.setAttribute('aria-pressed', String(isSelected));
    });
    neuron.dataset.focus = selectedPart;
    partDescription.textContent = text[language].parts[selectedPart];
  });
});

fireButton.addEventListener('click', () => {
  window.clearTimeout(signalTimer);
  neuron.classList.remove('is-firing');
  void neuron.getBoundingClientRect();
  neuron.classList.add('is-firing');
  signalState = 'busy';
  fireButton.disabled = true;
  signalStatus.textContent = text[language].signalBusy;

  signalTimer = window.setTimeout(() => {
    neuron.classList.remove('is-firing');
    signalState = 'done';
    fireButton.disabled = false;
    signalStatus.textContent = text[language].signalDone;
  }, 2400);
});

repeatButton.addEventListener('click', () => {
  stimulations += 1;
  updatePlasticity();
});

resetButton.addEventListener('click', () => {
  stimulations = 0;
  updatePlasticity();
});

updatePlasticity();
