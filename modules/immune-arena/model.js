const RESPONSE_STAGES = [
  {
    fr: 'À la rencontre d’un agent infectieux',
    en: 'Encountering an infectious agent',
    descriptionFr: 'Les barrières constituent la première protection. Si un agent infectieux les franchit, d’autres défenses peuvent s’activer.',
    descriptionEn: 'Barriers provide the first line of protection. If an infectious agent crosses them, other defences can activate.'
  },
  {
    fr: 'L’immunité innée donne l’alerte',
    en: 'Innate immunity raises the alarm',
    descriptionFr: 'Des cellules de l’immunité innée reconnaissent des motifs microbiens. Certaines engloutissent des microbes et des signaux inflammatoires coordonnent localement la défense.',
    descriptionEn: 'Innate immune cells recognize microbial patterns. Some engulf microbes, while inflammatory signals coordinate local defences.'
  },
  {
    fr: 'Le message oriente l’immunité adaptative',
    en: 'The signal guides adaptive immunity',
    descriptionFr: 'Des cellules présentatrices d’antigène exposent des fragments microbiens et contribuent à activer des lymphocytes spécifiques.',
    descriptionEn: 'Antigen-presenting cells display microbial fragments and help activate specific lymphocytes.'
  },
  {
    fr: 'Des lymphocytes ciblent l’agent',
    en: 'Lymphocytes target the agent',
    descriptionFr: 'Des lymphocytes B activés peuvent produire des anticorps. Certains lymphocytes T coordonnent la réponse ou ciblent des cellules infectées.',
    descriptionEn: 'Activated B lymphocytes can produce antibodies. Some T lymphocytes coordinate the response or target infected cells.'
  },
  {
    fr: 'La réponse s’apaise, des cellules mémoire peuvent persister',
    en: 'The response settles; memory cells may persist',
    descriptionFr: 'Après la réponse, certaines cellules mémoire peuvent persister. Leur présence peut permettre une réponse ultérieure plus rapide contre une cible reconnue.',
    descriptionEn: 'After the response, some memory cells may persist. Their presence can enable a faster later response to a recognized target.'
  }
];

const RESPONSE_PROFILES = {
  first: {
    delay: 3,
    strength: 2,
    delayFr: 'La réponse adaptative primaire se met en place progressivement.',
    delayEn: 'A primary adaptive response develops progressively.',
    strengthFr: 'Des lymphocytes spécifiques doivent être activés et se multiplier.',
    strengthEn: 'Specific lymphocytes need to activate and multiply.'
  },
  memory: {
    delay: 1,
    strength: 4,
    delayFr: 'Des cellules mémoire pertinentes peuvent accélérer la réponse.',
    delayEn: 'Relevant memory cells can help accelerate the response.',
    strengthFr: 'La réponse peut être plus rapide et plus importante, sans garantie identique pour tous.',
    strengthEn: 'The response can be faster and stronger, though it is not identical for everyone.'
  }
};

export function getResponseStage(stageIndex) {
  if (!Number.isInteger(stageIndex) || stageIndex < 0 || stageIndex >= RESPONSE_STAGES.length) {
    throw new RangeError('Stage index is outside the response sequence.');
  }

  return RESPONSE_STAGES[stageIndex];
}

export function getResponseProfile(scenario) {
  if (!Object.hasOwn(RESPONSE_PROFILES, scenario)) {
    throw new RangeError('Unknown immune response scenario.');
  }

  return RESPONSE_PROFILES[scenario];
}

export const RESPONSE_STAGE_COUNT = RESPONSE_STAGES.length;
