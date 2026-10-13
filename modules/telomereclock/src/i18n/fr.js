export default {
  nav: { aria: "Sections", sim: "Simulateur", telo: "Télomérase", life: "Mode de vie", history: "Histoire", know: "Savoirs", quiz: "Quiz", journal: "Journal" },
  brand: { aria: "TelomereClock, retour au simulateur" },
  hud: { length: "Longueur", div: "Divisions", loss: "Perte" },
  alertBadge: "ALERTE : cellules immortelles",
  unit: { bp: "pb", yearsShort: "ans" },

  hero: {
    title: "Chaque division raccourcit l’horloge.",
    lede: "Les télomères sont les capuchons répétés TTAGGG qui protègent l’extrémité de vos chromosomes. À chaque division ils perdent environ 100 paires de bases. Choisissez un type de cellule, divisez-la et regardez ce qui se passe quand les télomères deviennent trop courts."
  },

  cell: {
    label: "Type de cellule",
    skin:   { name: "Cellule de peau", tempo: "Division rapide", desc: "Les cellules de la couche basale de l’épiderme se divisent sans cesse : la peau se renouvelle en quelques semaines. Leurs télomères s’usent vite." },
    liver:  { name: "Cellule du foie", tempo: "Division modérée", desc: "Les hépatocytes se renouvellent lentement, en environ un an, mais peuvent se diviser à nouveau après une lésion. Leurs télomères s’usent doucement." },
    neuron: { name: "Neurone adulte", tempo: "Ne se divise pas", desc: "Cellule post-mitotique : elle a quitté le cycle cellulaire et ne se divise plus." }
  },
  tags: { telo: "Télomérase", life: "Mode de vie" },
  scene: { aria: {
    skin: "Cellule de peau contenant un chromosome dont les quatre télomères brillent. Ils raccourcissent à chaque division.",
    liver: "Cellule de foie contenant un chromosome dont les quatre télomères brillent. Ils raccourcissent à chaque division.",
    neuron: "Neurone avec ses dendrites et son axone, contenant un chromosome aux télomères stables."
  } },
  ribbon: { title: "Zoom sur l’extrémité : répétitions TTAGGG (1 case ≈ 250 pb)", ends: "chromosome ← → extrémité 3′" },

  btn: {
    divide: "Diviser la cellule", divideNeuron: "Un neurone ne se divise pas", limit: "Limite de Hayflick atteinte",
    ten: "× 10", lifespan: "Simuler une vie entière", stop: "Arrêter la simulation", reset: "Nouvelle cellule"
  },
  compare: { toggle: "Comparer avec une cellule témoin", subject: "Cellule suivie", control: "Cellule témoin (conditions standard)" },
  phase: {
    ready: "Prête à se diviser.", phaseS: "Phase S : réplication de l’ADN…",
    phaseMitosis: "Mitose : les extrémités ne sont pas recopiées en entier.",
    phaseMitosisTelo: "Mitose : la télomérase rallonge chaque extrémité copiée.",
    phaseSen: "Arrêt du cycle : la cellule est sénescente.", phaseFirst: "Première division terminée.",
    neuron: "Neurone post-mitotique : pas de division, donc pas d’érosion télomérique par la réplication."
  },
  sim: { caption: "Le chromosome est montré en métaphase : deux chromatides sœurs, donc quatre télomères. Seule une cellule fille est suivie, comme dans les cultures de Hayflick. Une division animée dure ≈ 2 s ; « Simuler une vie entière » les enchaîne en accéléré." },

  neuron: {
    title: "Un neurone adulte ne se divise pas",
    body: "Les neurones adultes sont post-mitotiques : sans division, il n’y a pas de problème de réplication terminale, donc pas d’érosion des télomères par la réplication. Un neurone ne vieillit pas par épuisement de ses télomères mais par accumulation de déchets : lipofuscine, protéines mal repliées (bêta-amyloïde, tau) et mitochondries abîmées. Cette charge gêne le recyclage cellulaire et finit par fragiliser le neurone.",
    waste: "Charge en déchets cellulaires", age: "Âge simulé du neurone : {n} ans",
    btnAge: "Faire vieillir de 10 ans", btnReset: "Rajeunir",
    sleep: "Le sommeil profond active le système glymphatique, qui évacue certains déchets du cerveau : un mauvais sommeil augmente la charge ici."
  },

  read: {
    length: "Longueur télomérique", lengthStable: "Longueur télomérique (stable)",
    critical: "Seuil critique 4 000 pb", birth: "Naissance 10 000 pb",
    divisions: "Divisions", loss: "Perte par division", lineageAge: "Âge de la lignée (échelle pédagogique)", year: "{n} an", years: "{n} ans"
  },
  status: { prolif: "Prolifératif", short: "Télomères courts", senescent: "Sénescent (vieilli)", immortal: "Immortalisée", postmitotic: "Post-mitotique" },
  traj: {
    title: "Trajectoire du télomère", limit: "limite estimée : {n} div.", noLimit: "aucune limite",
    aria: "Courbe de la longueur télomérique selon le nombre de divisions", xAxis: "nombre de divisions", critical: "seuil critique"
  },

  inflam: {
    title: "Inflammaging : l’effet « pomme pourrie »",
    lede: "Une cellule qui atteint la limite de Hayflick reste en vie, mais en « zombie » : elle ne se divise plus et diffuse des signaux inflammatoires. Menez des cellules jusqu’à la sénescence, regardez la jauge monter, puis éliminez-les avec des sénolytiques.",
    gauge: "Jauge d’inflammation", count: "Cellules sénescentes accumulées", effect: "Érosion en plus par division",
    tissue: "Tissu voisin", tissueAria: "Mini-tissu : cellules saines, cellules zombies sénescentes et voisines contaminées",
    legHealthy: "Saine", legBystander: "Voisine contaminée", legZombie: "Zombie (sénescente)",
    btn: "Administrer des sénolytiques", clearing: "Élimination des cellules zombies…",
    hintReady: "Les sénolytiques détruisent sélectivement les cellules sénescentes et remettent la jauge à 0 %.",
    hintNone: "Aucune cellule zombie à éliminer. Menez une cellule jusqu’à sa limite de Hayflick (essayez « Simuler une vie entière »).",
    s1t: "1. La cellule sénescente sécrète du SASP",
    s1d: "Elle libère en continu des cytokines (IL-6, IL-8) et des protéases (MMP), même si elle ne se divise plus.",
    s2t: "2. Ses voisines s’abîment",
    s2d: "Ces signaux provoquent stress oxydatif et lésions de l’ADN : les cellules proches raccourcissent plus vite leurs télomères. C’est la sénescence induite par la sénescence (Nelson et al., 2012).",
    s3t: "3. L’inflammation devient chronique",
    s3d: "Avec l’âge, ce bruit de fond inflammatoire s’installe : c’est l’inflammaging (Franceschi et al., 2000). Les sénolytiques visent à éliminer les cellules à l’origine du signal."
  },

  telo: {
    title: "L’équilibre de la télomérase : une arme à double tranchant",
    lede: "La télomérase (hTERT + ARN matrice hTR) rallonge les télomères. Presque absente des cellules somatiques adultes, elle reste active dans les cellules souches et dans environ 85 à 90 % des cancers. Déplacez le curseur : il agit sur le simulateur.",
    alertTitle: "Mode alerte : cellules immortelles.",
    alertBody: "Les télomères ne raccourcissent plus, donc rien ne force la cellule à s’arrêter. Les mutations s’accumulent sans frein et les clones transformés prolifèrent : c’est le point de départ d’une tumeur.",
    slider: "Activation de la télomérase", grey: "zone grise",
    neuronTitle: "Sans division, la télomérase n’a rien à compenser",
    neuronBody: "Un neurone adulte ne se divise pas : ses télomères ne s’érodent pas à la réplication et la télomérase ne change pas son vieillissement. Choisissez la peau ou le foie pour voir son effet.",
    model: "Les indices sont un modèle pédagogique : une seule cause du vieillissement parmi d’autres, des valeurs choisies pour illustrer le compromis, pas une prédiction médicale."
  },
  zone: {
    none:    { title: "Vieillissement humain standard", text: "Les cellules somatiques adultes n’ont presque pas de télomérase. Les télomères perdent environ 100 pb à chaque division et la cellule s’arrête vers la 60e division : c’est la limite de Hayflick." },
    low:     { title: "Activation faible", text: "Un peu de télomérase compense déjà {pct} % de la perte. Le gain est réel mais encore limité." },
    therapy: { title: "Zone thérapeutique (15 à 30 %)", text: "La perte passe à {rate} pb par division : les tissus à fort renouvellement (moelle, intestin, peau) gardent leur capacité plus longtemps. Le risque tumoral modélisé reste faible ({risk}/100). C’est la fenêtre visée par les stratégies d’activation transitoire et contrôlée." },
    grey:    { title: "Zone grise", text: "La perte tombe à {rate} pb par division, mais le risque tumoral monte vite ({risk}/100). Des cellules abîmées échappent à l’arrêt de la sénescence, alors qu’elles auraient dû être éliminées." },
    alert:   { title: "Piège du cancer (80 à 100 %)", text: "Les télomères ne raccourcissent plus du tout : la cellule est immortelle. Sans frein, les mutations s’accumulent et les clones transformés se multiplient. Environ 85 à 90 % des cancers humains réactivent la télomérase, les autres utilisent la voie ALT." }
  },
  tiles: { limit: "Divisions avant sénescence", renewal: "Renouvellement tissulaire", unlimited: "illimité", over: "> {n} ans", risk: "Risque tumoral (indice /100)" },
  eq: {
    aria: "Deux courbes : le déclin des tissus diminue et le risque tumoral augmente quand l’activation de la télomérase monte",
    xAxis: "activation de la télomérase", therapy: "thérapie", cancer: "cancer",
    title: "Le compromis, selon le niveau de télomérase", decline: "Déclin tissulaire", risk: "Risque tumoral"
  },
  tissue: {
    title: "Tissu simulé : 150 cellules souches", titleNeuron: "Tissu simulé : 150 neurones", age: "Âge :",
    aria: "Grille de cellules : saines, sénescentes ou tumorales selon l’âge",
    healthy: "Saines", senescent: "Sénescentes", burdened: "Chargées de déchets", transformed: "Transformées",
    note: "Faites vieillir le tissu : les cellules se mettent à l’arrêt une à une. Une cellule transformée peut réactiver sa propre télomérase, même sans apport extérieur. Le rythme dépend du type cellulaire choisi.",
    noteNeuron: "Les neurones ne deviennent presque jamais cancéreux : les tumeurs du cerveau naissent surtout de cellules gliales. Ici, seule la charge en déchets augmente avec l’âge."
  },

  life: {
    title: "Les accélérateurs du mode de vie",
    lede: "Le stress oxydatif et l’inflammation usent les télomères en dehors même des divisions. Activez des habitudes : le taux de perte du simulateur change immédiatement.",
    neg: "Accélérateurs", pos: "Stabilisateurs", effectTitle: "Effet sur la cellule",
    state: { neutral: "neutre", fast: "accéléré", protect: "protecteur", mixed: "mixte" },
    ref100: "repère : 100 pb = vieillissement standard", wasteAt80: "Charge en déchets à 80 ans",
    msgNeuron: "Pour un neurone, les habitudes jouent sur la vitesse d’accumulation des déchets, pas sur les télomères.",
    msgNone: "Aucune habitude activée : la perte reste au niveau de base.",
    msgTelo: "La télomérase annule toute la perte : les habitudes n’ont plus d’effet sur la longueur.",
    msgMore: "Chaque division coûte {n} % de télomère en plus : la cellule atteint plus tôt sa limite.",
    msgLess: "Chaque division coûte {n} % de télomère en moins : la cellule garde sa capacité plus longtemps.",
    msgMixed: "Les habitudes se compensent : la perte ne change pas.",
    note: "Les associations vues chez l’humain sont modestes et surtout observationnelles. Les facteurs de ±15 à 30 % utilisés ici servent à illustrer le mécanisme."
  },
  factor: {
    stress:   { name: "Stress chronique", eff: "+25 % de perte", why: "Le cortisol et le stress oxydatif attaquent les répétitions TTAGGG, riches en guanine.", ref: "Epel et al., 2004 : mères très stressées, l’équivalent de 9 à 17 ans de vieillissement en plus." },
    smoking:  { name: "Tabac", eff: "+30 % de perte", why: "Les radicaux libres de la fumée oxydent l’ADN et épuisent les défenses des cellules.", ref: "Valdes et al., 2005 : 40 paquets-années ≈ 7 ans de perte télomérique en plus." },
    sleep:    { name: "Sommeil de mauvaise qualité", eff: "+15 % de perte", why: "Moins de sommeil profond, plus d’inflammation et moins de réparation cellulaire.", ref: "Prather et al., 2015 : un mauvais sommeil est associé à des télomères plus courts." },
    diet:     { name: "Alimentation antioxydante", eff: "−10 % de perte", why: "Fruits, légumes, noix et huile d’olive limitent le stress oxydatif qui ronge les extrémités.", ref: "Crous-Bou et al., 2014 : l’alimentation méditerranéenne est associée à des télomères plus longs." },
    exercise: { name: "Activité physique régulière", eff: "−15 % de perte", why: "L’exercice réduit l’inflammation et stimule l’activité télomérase des cellules sanguines et vasculaires.", ref: "Werner et al., 2009 : l’entraînement physique freine la sénescence des leucocytes." }
  },

  myth: {
    title: "Le mythe des « 35 ans » au Moyen Âge",
    lede: "On lit que l’espérance de vie était de 35 ans au Moyen Âge contre environ 75 aujourd’hui, comme si nos ancêtres vieillissaient deux fois plus vite. C’est faux : leurs cellules étaient les mêmes que les nôtres, avec les mêmes télomères et la même limite de Hayflick. Ce qui a changé, c’est la probabilité d’atteindre l’âge adulte.",
    cohort: "100 naissances, 100 destins", eraAria: "Époque",
    era: { medieval: "Moyen Âge", modern: "Aujourd’hui" },
    dotsAria: "Cent personnes, colorées selon leur âge au décès",
    bins: ["0–5 ans", "5–20 ans", "20–40 ans", "40–60 ans", "60–80 ans", "80 ans et plus"],
    dotsNote: "Chaque point est une naissance. Répartition illustrative construite sur des ordres de grandeur de démographie historique : elle varie selon les lieux, les siècles et les épidémies.",
    statMean: "Espérance de vie à la naissance (âge moyen au décès)", yrs: "ans",
    statAdults: "Âge moyen au décès après 20 ans", statInfant: "Morts avant 5 ans",
    ceilingTitle: "Les moyennes bougent, le plafond biologique reste",
    ceilingAria: "Axe des âges de 0 à 125 ans avec les moyennes médiévale et moderne, la zone de la limite de Hayflick et le record de Jeanne Calment",
    years: "ans", mMed: "Moyen Âge ≈ {n} ans", mMedAdult: "adultes médiévaux ≈ {n} ans", mMod: "Aujourd’hui ≈ {n} ans",
    mCalment: "Calment 122 ans", mHayflick: "limite de Hayflick ≈ 85–120 ans",
    ceilingBody: "Avec environ 60 divisions et une érosion de 100 pb par division, le modèle place le plafond biologique d’un tissu entre 85 et 120 ans, ce que confirme le record humain de longévité (Jeanne Calment, 122 ans). Au Moyen Âge, des adultes atteignaient 60, 70 ou 80 ans. La moyenne de 30 à 35 ans résulte des décès d’enfants : un tiers des bébés mourait avant 5 ans, ce qui écrase la moyenne sans rien dire de la vitesse du vieillissement.",
    shieldTitle: "Le bouclier moderne",
    shield: {
      water: { t: "Eau potable et assainissement", d: "En 1854, John Snow relie une épidémie de choléra à la pompe contaminée de Broad Street, à Londres. L’eau propre et les égouts ont fait chuter les maladies diarrhéiques, première cause de mort des enfants.", y: "dès 1854" },
      vaccine: { t: "Vaccins", d: "Le vaccin antivariolique de Jenner (1796) ouvre la voie. La variole est déclarée éradiquée en 1980. Rougeole, diphtérie ou poliomyélite ne tuent plus massivement.", y: "dès 1796" },
      hygiene: { t: "Hygiène et antibiotiques", d: "En 1847, Semmelweis impose le lavage des mains en maternité pour réduire la fièvre puerpérale. La pénicilline (découverte en 1928) a permis de soigner les infections bactériennes.", y: "1847 et 1928" }
    },
    takeTitle: "À retenir",
    takeBody: "Hygiène, eau propre et vaccins n’ont pas ralenti le vieillissement cellulaire : ils protègent les enfants et les adultes jeunes pour que davantage de personnes atteignent leur limite de Hayflick. La médecine moderne laisse donc une plus grande part de la population vivre jusqu’au plafond biologique. Repousser ce plafond, c’est autre chose : c’est l’enjeu de la recherche sur la télomérase et les sénolytiques."
  },

  know: {
    title: "Les savoirs : de la molécule au laboratoire",
    lede: "Trois fiches courtes pour comprendre pourquoi l’ADN ne peut pas se copier jusqu’au bout, qui l’a découvert, et où en sont les traitements.",
    nobel: "Une histoire récompensée par un Nobel", nobelBadge: "Prix Nobel 2009",
    research: "Où en est la recherche ?",
    researchNote: "Sources vérifiées jusqu’en 2025. Pour 2026, consultez ClinicalTrials.gov : aucun résultat clinique humain majeur sur l’allongement de la vie n’y est connu de moi."
  },
  erp: {
    title: "Le problème de la réplication terminale", tabs: "Étapes de la réplication", step: "Étape {n}",
    aria: "Schéma de la réplication des extrémités : le brin avancé est complet, le brin retardé laisse un trou à l’extrémité",
    leading: "Brin avancé (copié en continu)", lagging: "Brin retardé (copié par fragments)", template: "matrice", telomere: "télomère",
    primers: "amorces ARN (rouge)", gap: "trou : 50–200 pb", footer: "5′ ← fragments de ~100–200 nt chez les eucaryotes →  extrémité 3′ de la matrice",
    text1: "Étape 1 : à la fourche de réplication, l’ADN polymérase ne copie que dans le sens 5′→3′. Un des deux brins, le brin avancé, se copie d’une traite jusqu’au bout.",
    text2: "Étape 2 : l’autre brin, le brin retardé, se copie par petits fragments (fragments d’Okazaki, ~100–200 nucléotides). Chacun a besoin d’une amorce d’ARN pour démarrer.",
    text3: "Étape 3 : on retire les amorces et on comble les trous. À la toute extrémité, il n’y a plus de brin en amont pour amorcer le comblement : un trou subsiste. Le nouveau brin est plus court de 50 à 200 pb à chaque division."
  },
  timeline: [
    { y: "1961", t: "Hayflick et Moorhead", d: "Des fibroblastes humains en culture se divisent environ 50 fois puis s’arrêtent. La limite de Hayflick est née." },
    { y: "1971–72", t: "Olovnikov puis Watson", d: "Chacun de leur côté, ils prédisent que l’ADN ne peut pas être copié jusqu’au bout : le problème de la réplication terminale." },
    { y: "1978", t: "Blackburn et Gall", d: "Chez le cilié Tetrahymena, les extrémités de l’ADN sont faites de répétitions courtes (TTGGGG)." },
    { y: "1982", t: "Szostak et Blackburn", d: "Des extrémités de Tetrahymena protègent des mini-chromosomes de levure de la dégradation : les télomères ont un rôle de capuchon." },
    { y: "1984–85", t: "Greider et Blackburn", d: "Découverte de la télomérase, l’enzyme qui ajoute des répétitions aux extrémités. Greider est alors doctorante." },
    { y: "1988", t: "Moyzis et collègues", d: "La séquence télomérique humaine est identifiée : TTAGGG." },
    { y: "1990", t: "Harley et collègues", d: "Les télomères des fibroblastes humains raccourcissent à chaque division, ce qui relie le compteur de Hayflick aux télomères." },
    { y: "1994", t: "Kim et collègues", d: "La télomérase est active dans environ 90 % des tumeurs testées, mais pas dans la plupart des tissus normaux." },
    { y: "1998", t: "Bodnar et collègues", d: "Ajouter hTERT à des cellules humaines normales leur permet de dépasser la sénescence : elles continuent de se diviser." },
    { y: "2009", t: "Blackburn, Greider, Szostak", d: "Prix Nobel de physiologie ou médecine « pour la découverte de la manière dont les chromosomes sont protégés par les télomères et la télomérase ».", nobel: true }
  ],
  research: [
    { name: "Imételstat (Rytelo)", badge: ["g", "Approuvé"], stage: "Inhibiteur de télomérase · Geron", body: "Le premier inhibiteur de télomérase approuvé : FDA le 6 juin 2024, Union européenne en mars 2025. Il traite des syndromes myélodysplasiques de risque faible à intermédiaire dépendants des transfusions. Il illustre le versant « frein » de la télomérase." },
    { name: "EXG-34217", badge: ["a", "Phase 1/2"], stage: "Thérapie génique · Elixirgen", body: "Pour les maladies rares des télomères (dyskératose congénitale). Chez deux premiers patients, les télomères des cellules sanguines se sont allongés durablement, sans toxicité observée à 24 et 5 mois (NEJM Evidence, février 2025). L’essai se poursuit." },
    { name: "Sénolytiques", badge: ["a", "Pilotes"], stage: "Éliminer les cellules sénescentes", body: "Dasatinib + quercétine, fisétine, navitoclax… Chez la souris âgée, éliminer les cellules sénescentes améliore la fonction physique et allonge la durée de vie (Xu et al., 2018). Chez l’humain, seuls de petits essais pilotes existent, et l’UBX0101 (arthrose du genou) a échoué en phase 2 en 2020." },
    { name: "TERT chez la souris", badge: ["p", "Préclinique"], stage: "Thérapie génique AAV · Blasco, 2012", body: "Chez des souris adultes ou âgées, un vecteur AAV portant TERT a retardé le vieillissement et allongé la durée de vie médiane (+24 % à 1 an, +13 % à 2 ans) sans augmentation des cancers." },
    { name: "Libella (AAV-hTERT)", badge: ["r", "Controversé"], stage: "Phase I · Colombie", body: "Essai de sécurité annoncé sur environ 5 participants qui paient pour s’inscrire. Les affirmations sur l’inversion du vieillissement reposent sur des données animales. Aucune preuve d’efficacité chez l’humain n’est publiée à ma connaissance." }
  ],

  quiz: {
    title: "Testez vos connaissances", lede: "Sept questions, une explication après chaque réponse. Cinq bonnes réponses débloquent un badge.",
    count: "Question {i} sur {n}", right: "Exact.", wrong: "Pas tout à fait.", next: "Question suivante", finish: "Voir mon score",
    resultGood: "Bravo : vous maîtrisez l’horloge des télomères.", resultTry: "Relisez les fiches puis réessayez : chaque essai renforce la mémorisation.", restart: "Recommencer",
    items: [
      { q: "Combien de paires de bases un télomère humain perd-il environ à chaque division ?", o: ["≈ 5 pb", "≈ 100 pb", "≈ 10 000 pb", "≈ 1 million de pb"], a: 1, e: "Les cultures de fibroblastes montrent une perte de 50 à 200 pb par division, d’où l’ordre de grandeur de 100 pb utilisé ici." },
      { q: "Que se passe-t-il quand les télomères deviennent critiquement courts ?", o: ["La cellule explose", "Les voies p53/p21 arrêtent le cycle : c’est la sénescence", "La cellule se divise deux fois plus vite", "Rien de particulier"], a: 1, e: "L’extrémité du chromosome est lue comme une cassure de l’ADN. p53 et p21 stoppent le cycle (point de contrôle M1)." },
      { q: "Quelle proportion de cancers humains réactive la télomérase ?", o: ["≈ 5 %", "≈ 25 %", "≈ 85 à 90 %", "100 %"], a: 2, e: "Les autres, environ 10 à 15 %, utilisent la voie ALT, une recombinaison qui allonge les télomères sans télomérase." },
      { q: "Pourquoi un neurone adulte n’use-t-il pas ses télomères en se divisant ?", o: ["Il a une télomérase très active", "Il ne se divise pas : il est post-mitotique", "Il n’a pas de télomères", "Ses télomères sont infinis"], a: 1, e: "Sans division, il n’y a pas de problème de réplication terminale. Le neurone vieillit surtout par accumulation de déchets (lipofuscine, protéines mal repliées)." },
      { q: "Pourquoi l’espérance de vie médiévale (≈ 30–35 ans) ne prouve-t-elle pas un vieillissement cellulaire plus rapide ?", o: ["Les télomères étaient plus courts", "La mortalité infantile élevée a tiré la moyenne vers le bas", "Les gens arrêtaient de se diviser plus tôt", "Les données sont inventées"], a: 1, e: "Un tiers des enfants mourait avant 5 ans. Les adultes qui passaient ce cap vivaient souvent jusqu’à 55-60 ans, avec des cas de 70 ou 80 ans." },
      { q: "Que cherchent à faire les sénolytiques ?", o: ["Allonger les télomères", "Éliminer sélectivement les cellules sénescentes", "Bloquer la télomérase des tumeurs", "Stimuler la division des neurones"], a: 1, e: "Ils détruisent les cellules « zombies » qui diffusent des signaux inflammatoires (SASP), dans l’espoir de réduire l’inflammaging." },
      { q: "Qui a reçu le prix Nobel de physiologie ou médecine 2009 pour les télomères ?", o: ["Hayflick, Watson et Crick", "Blackburn, Greider et Szostak", "Olovnikov, Harley et Kim", "Blasco, Bodnar et Moyzis"], a: 1, e: "Elizabeth Blackburn, Carol Greider et Jack Szostak ont été récompensés pour la découverte du rôle protecteur des télomères et de la télomérase." }
    ]
  },

  biblio: {
    title: "Bibliographie", lede: "Références utilisées dans l’application. Les valeurs du modèle restent des ordres de grandeur pédagogiques.",
    g: { core: "Télomères, Hayflick, télomérase", life: "Mode de vie", aging: "Sénescence et inflammation", hist: "Démographie historique", research: "Recherche clinique" }
  },
  hub: {
    title: "Human Body : les prochains modules", lede: "TelomereClock est le premier module d’une collection d’applications scientifiques et ludiques sur le corps humain.",
    portal: "Découvrir toute la collection",
    active: "Disponible", soon: "Bientôt",
    items: [
      { n: "TelomereClock", d: "Télomères, vieillissement et cancer.", s: "active" },
      { n: "Heartbeat Lab", d: "Le cœur, la circulation et la pression artérielle.", s: "soon" },
      { n: "Neuro Map", d: "Neurones, synapses et mémoire.", s: "soon" },
      { n: "Immune Arena", d: "Défenses innées, anticorps et vaccins.", s: "soon" }
    ]
  },

  dlg: {
    status: "Sénescent (vieilli)", title: "Limite de Hayflick atteinte",
    intro: "Les télomères sont tombés sous 4 000 pb. La protéine-capuchon (complexe shelterin) ne tient plus et l’extrémité du chromosome ressemble à une cassure de l’ADN.",
    b1: "Alarme : la cellule détecte des dommages (foyers γH2AX) et active p53, puis p21 : le cycle cellulaire s’arrête. C’est le point de contrôle M1.",
    b2: "Une cellule vivante mais figée : elle s’étale, devient plus grande, exprime la β-galactosidase associée à la sénescence et p16INK4a.",
    b3: "Un signal inflammatoire : elle sécrète des cytokines et des protéases (SASP : IL-6, IL-8, MMP) qui perturbent les tissus voisins.",
    b4: "L’échappatoire dangereuse : si p53 et Rb sont aussi inactivés, la cellule continue jusqu’à la crise (M2) : fusions de chromosomes, cassures, mort massive. De rares survivantes réactivent la télomérase (≈ 85–90 %) ou la voie ALT (≈ 10–15 %) et deviennent cancéreuses.",
    inflam: "Dans le tissu voisin, la jauge d’inflammation passe à {n} %.",
    note: "La sénescence est un frein anti-cancer. Elle protège, mais l’accumulation de cellules sénescentes contribue au vieillissement des tissus.",
    ok: "Compris", again: "Nouvelle cellule", clear: "Administrer des sénolytiques", go: "Essayer la télomérase"
  },
  journal: {
    title: "Journal de laboratoire", lede: "Vos découvertes sont mémorisées dans ce navigateur, si le stockage est disponible.",
    progress: "{n} badges sur {m}", reset: "Effacer ma progression", locked: "À débloquer", close: "Fermer"
  },
  badge: {
    unlocked: "Badge débloqué : {name}",
    first: { name: "Première division", desc: "Divisez une cellule pour la première fois." },
    senescent: { name: "Limite de Hayflick", desc: "Menez une cellule jusqu’à la sénescence." },
    lifespan: { name: "Une vie en accéléré", desc: "Lancez la simulation de vie entière." },
    types: { name: "Trois tissus", desc: "Essayez la peau, le foie et le neurone." },
    therapy: { name: "Zone thérapeutique", desc: "Réglez la télomérase entre 15 et 30 %." },
    trap: { name: "Piège du cancer", desc: "Poussez la télomérase à 80 % ou plus." },
    life: { name: "Hygiène de vie", desc: "Activez trois habitudes." },
    senolytics: { name: "Chasseur de zombies", desc: "Éliminez des cellules sénescentes." },
    compare: { name: "Expérience témoin", desc: "Comparez avec une cellule témoin." },
    myth: { name: "Mythe démonté", desc: "Découvrez la cohorte moderne." },
    quiz: { name: "Bon élève", desc: "Obtenez au moins 5 sur 7 au quiz." },
    escape: { name: "Cellule immortelle", desc: "Dépassez 60 divisions grâce à la télomérase." }
  },
  toast: {
    escape: "60 divisions franchies : cette cellule a contourné la limite de Hayflick.",
    ctrlSen: "La cellule témoin a atteint sa limite de Hayflick.",
    cap: "Simulation arrêtée à 120 divisions : la cellule est immortelle dans ces conditions.",
    cleared: "Cellules sénescentes éliminées. Inflammation : 0 %."
  },
  footer: { text: "TelomereClock est un outil pédagogique. Les valeurs (10 000 pb à la naissance, seuil critique 4 000 pb, ≈ 100 pb perdues par division, ≈ 60 divisions) sont des ordres de grandeur issus des cultures de fibroblastes humains. Rien ici ne constitue un avis médical." }
};
