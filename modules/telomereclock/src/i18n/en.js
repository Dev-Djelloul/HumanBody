export default {
  nav: { aria: "Sections", sim: "Simulator", telo: "Telomerase", life: "Lifestyle", history: "History", know: "Knowledge", quiz: "Quiz", journal: "Journal" },
  brand: { homeAria: "Human Body, back to the collection", collection: "← Collection" },
  hud: { length: "Length", div: "Divisions", loss: "Loss" },
  alertBadge: "ALERT: immortal cells",
  unit: { bp: "bp", yearsShort: "yrs" },

  hero: {
    eyebrow: "TELOMERES · MODULE 01",
    titleLine1: "Every division",
    titleLine2: "shortens the clock.",
    lede: "Telomeres are the TTAGGG repeat caps that protect the ends of your chromosomes. With each division they lose about 100 base pairs. Pick a cell type, divide it and watch what happens when the telomeres get too short."
  },

  cell: {
    label: "Cell type",
    skin:   { name: "Skin cell", tempo: "Fast division", desc: "Cells in the basal layer of the epidermis divide constantly: skin renews itself within weeks. Their telomeres wear down quickly." },
    liver:  { name: "Liver cell", tempo: "Moderate division", desc: "Hepatocytes renew slowly, in about a year, but can divide again after an injury. Their telomeres wear down gently." },
    neuron: { name: "Adult neuron", tempo: "Does not divide", desc: "A post-mitotic cell: it has left the cell cycle and no longer divides." }
  },
  tags: { telo: "Telomerase", life: "Lifestyle" },
  scene: { aria: {
    skin: "Skin cell containing a chromosome whose four telomeres glow. They shorten with each division.",
    liver: "Liver cell containing a chromosome whose four telomeres glow. They shorten with each division.",
    neuron: "Neuron with dendrites and an axon, containing a chromosome with stable telomeres."
  } },
  ribbon: { title: "Zoom on the end: TTAGGG repeats (1 block ≈ 250 bp)", ends: "chromosome ← → 3′ end" },

  btn: {
    divide: "Divide cell", divideNeuron: "A neuron does not divide", limit: "Hayflick limit reached",
    ten: "× 10", lifespan: "Simulate full lifespan", stop: "Stop simulation", reset: "New cell"
  },
  compare: { toggle: "Compare with a control cell", subject: "Tracked cell", control: "Control cell (standard conditions)" },
  phase: {
    ready: "Ready to divide.", phaseS: "S phase: copying the DNA…",
    phaseMitosis: "Mitosis: the ends are not copied all the way.",
    phaseMitosisTelo: "Mitosis: telomerase extends every copied end.",
    phaseSen: "Cell cycle arrest: the cell is senescent.", phaseFirst: "First division complete.",
    neuron: "Post-mitotic neuron: no division, so no telomere erosion from replication."
  },
  sim: { caption: "The chromosome is shown in metaphase: two sister chromatids, hence four telomeres. Only one daughter cell is followed, as in Hayflick’s cultures. An animated division lasts about 2 s; “Simulate full lifespan” chains them at high speed." },

  neuron: {
    title: "An adult neuron does not divide",
    body: "Adult neurons are post-mitotic: with no division there is no end-replication problem, so replication does not erode their telomeres. A neuron ages not by running out of telomere but by accumulating waste: lipofuscin, misfolded proteins (amyloid-beta, tau) and damaged mitochondria. This load hampers cellular recycling and eventually weakens the neuron.",
    waste: "Cellular waste load", age: "Simulated neuron age: {n} years",
    btnAge: "Age by 10 years", btnReset: "Rejuvenate",
    sleep: "Deep sleep switches on the glymphatic system, which clears some waste from the brain: poor sleep raises the load here."
  },

  read: {
    length: "Telomere length", lengthStable: "Telomere length (stable)",
    critical: "Critical threshold 4,000 bp", birth: "Birth 10,000 bp",
    divisions: "Divisions", loss: "Loss per division", lineageAge: "Lineage age (teaching scale)", year: "{n} year", years: "{n} years"
  },
  status: { prolif: "Proliferating", short: "Short telomeres", senescent: "Senescent (aged)", immortal: "Immortalized", postmitotic: "Post-mitotic" },
  traj: {
    title: "Telomere trajectory", limit: "estimated limit: {n} div.", noLimit: "no limit",
    aria: "Telomere length plotted against the number of divisions", xAxis: "number of divisions", critical: "critical threshold"
  },

  inflam: {
    title: "Inflammaging: the “bad apple” effect",
    lede: "A cell that reaches the Hayflick limit stays alive, but as a “zombie”: it stops dividing and broadcasts inflammatory signals. Take cells to senescence, watch the gauge rise, then clear them with senolytics.",
    gauge: "Inflammation gauge", count: "Accumulated senescent cells", effect: "Extra erosion per division",
    tissue: "Neighbouring tissue", tissueAria: "Mini tissue: healthy cells, senescent zombie cells and contaminated neighbours",
    legHealthy: "Healthy", legBystander: "Contaminated neighbour", legZombie: "Zombie (senescent)",
    btn: "Administer senolytics", clearing: "Clearing zombie cells…",
    hintReady: "Senolytics selectively destroy senescent cells and reset the gauge to 0%.",
    hintNone: "No zombie cell to clear. Take a cell to its Hayflick limit (try “Simulate full lifespan”).",
    s1t: "1. The senescent cell secretes SASP",
    s1d: "It continuously releases cytokines (IL-6, IL-8) and proteases (MMPs), even though it no longer divides.",
    s2t: "2. Its neighbours get damaged",
    s2d: "These signals cause oxidative stress and DNA damage: nearby cells lose telomere faster. This is senescence-induced senescence (Nelson et al., 2012).",
    s3t: "3. Inflammation becomes chronic",
    s3d: "With age this inflammatory background noise settles in: inflammaging (Franceschi et al., 2000). Senolytics aim to remove the cells that cause the signal."
  },

  telo: {
    title: "The telomerase balance: a double-edged sword",
    lede: "Telomerase (hTERT + hTR template RNA) extends telomeres. Nearly absent from adult somatic cells, it stays active in stem cells and in about 85 to 90% of cancers. Move the slider: it acts on the simulator.",
    alertTitle: "Alert mode: immortal cells.",
    alertBody: "Telomeres no longer shorten, so nothing forces the cell to stop. Mutations pile up unchecked and transformed clones proliferate: the starting point of a tumour.",
    slider: "Telomerase activation", grey: "grey zone",
    neuronTitle: "Without division, telomerase has nothing to compensate",
    neuronBody: "An adult neuron does not divide: its telomeres do not erode from replication and telomerase does not change how it ages. Pick skin or liver to see its effect.",
    model: "The indices come from a teaching model: one cause of ageing among many, with values chosen to illustrate the trade-off, not a medical prediction."
  },
  zone: {
    none:    { title: "Standard human ageing", text: "Adult somatic cells have almost no telomerase. Telomeres lose about 100 bp per division and the cell stops around the 60th division: the Hayflick limit." },
    low:     { title: "Low activation", text: "A little telomerase already offsets {pct}% of the loss. The gain is real but still limited." },
    therapy: { title: "Therapeutic zone (15 to 30%)", text: "Loss drops to {rate} bp per division: fast-renewing tissues (marrow, gut, skin) keep their capacity longer. The modelled tumour risk stays low ({risk}/100). This is the window targeted by transient, controlled activation strategies." },
    grey:    { title: "Grey zone", text: "Loss falls to {rate} bp per division, but the tumour risk climbs fast ({risk}/100). Damaged cells escape senescence arrest when they should have been removed." },
    alert:   { title: "The cancer trap (80 to 100%)", text: "Telomeres no longer shorten at all: the cell is immortal. With no brake, mutations accumulate and transformed clones multiply. About 85 to 90% of human cancers reactivate telomerase; the rest use the ALT pathway." }
  },
  tiles: { limit: "Divisions before senescence", renewal: "Tissue renewal", unlimited: "unlimited", over: "> {n} years", risk: "Tumour risk (index /100)" },
  eq: {
    aria: "Two curves: tissue decline falls and tumour risk rises as telomerase activation increases",
    xAxis: "telomerase activation", therapy: "therapy", cancer: "cancer",
    title: "The trade-off, by telomerase level", decline: "Tissue decline", risk: "Tumour risk"
  },
  tissue: {
    title: "Simulated tissue: 150 stem cells", titleNeuron: "Simulated tissue: 150 neurons", age: "Age:",
    aria: "Grid of cells: healthy, senescent or tumour cells depending on age",
    healthy: "Healthy", senescent: "Senescent", burdened: "Waste-laden", transformed: "Transformed",
    note: "Age the tissue: cells stop one by one. A transformed cell can reactivate its own telomerase, even with no outside supply. The pace depends on the cell type you chose.",
    noteNeuron: "Neurons almost never become cancerous: brain tumours mostly arise from glial cells. Here only the waste load grows with age."
  },

  life: {
    title: "Lifestyle accelerators",
    lede: "Oxidative stress and inflammation wear telomeres down even outside divisions. Switch habits on: the simulator’s loss rate changes immediately.",
    neg: "Accelerators", pos: "Stabilizers", effectTitle: "Effect on the cell",
    state: { neutral: "neutral", fast: "accelerated", protect: "protective", mixed: "mixed" },
    ref100: "reference: 100 bp = standard ageing", wasteAt80: "Waste load at age 80",
    msgNeuron: "For a neuron, habits change how fast waste builds up, not the telomeres.",
    msgNone: "No habit switched on: the loss stays at baseline.",
    msgTelo: "Telomerase cancels the whole loss: habits no longer affect length.",
    msgMore: "Each division costs {n}% more telomere: the cell reaches its limit sooner.",
    msgLess: "Each division costs {n}% less telomere: the cell keeps its capacity longer.",
    msgMixed: "The habits offset each other: the loss does not change.",
    note: "Associations seen in humans are modest and mostly observational. The ±15 to 30% factors used here serve to illustrate the mechanism."
  },
  factor: {
    stress:   { name: "Chronic stress", eff: "+25% loss", why: "Cortisol and oxidative stress attack the guanine-rich TTAGGG repeats.", ref: "Epel et al., 2004: highly stressed mothers, the equivalent of 9 to 17 extra years of ageing." },
    smoking:  { name: "Smoking", eff: "+30% loss", why: "Free radicals from smoke oxidise DNA and exhaust the cells’ defences.", ref: "Valdes et al., 2005: 40 pack-years ≈ 7 extra years of telomere loss." },
    sleep:    { name: "Poor-quality sleep", eff: "+15% loss", why: "Less deep sleep, more inflammation and less cellular repair.", ref: "Prather et al., 2015: poor sleep is associated with shorter telomeres." },
    diet:     { name: "Antioxidant diet", eff: "−10% loss", why: "Fruit, vegetables, nuts and olive oil limit the oxidative stress that gnaws at the ends.", ref: "Crous-Bou et al., 2014: the Mediterranean diet is associated with longer telomeres." },
    exercise: { name: "Regular physical activity", eff: "−15% loss", why: "Exercise lowers inflammation and boosts telomerase activity in blood and vascular cells.", ref: "Werner et al., 2009: physical training slows senescence of leukocytes." }
  },

  myth: {
    title: "The “35 years” medieval myth",
    lede: "We read that life expectancy was 35 in the Middle Ages versus about 75 today, as if our ancestors aged twice as fast. That is wrong: their cells were the same as ours, with the same telomeres and the same Hayflick limit. What changed is the odds of reaching adulthood.",
    cohort: "100 births, 100 destinies", eraAria: "Era",
    era: { medieval: "Middle Ages", modern: "Today" },
    dotsAria: "One hundred people, coloured by age at death",
    bins: ["0–5 yrs", "5–20 yrs", "20–40 yrs", "40–60 yrs", "60–80 yrs", "80+ yrs"],
    dotsNote: "Each dot is one birth. Illustrative distribution built from orders of magnitude in historical demography: it varies by place, century and epidemic.",
    statMean: "Life expectancy at birth (mean age at death)", yrs: "yrs",
    statAdults: "Mean age at death after 20", statInfant: "Deaths before age 5",
    ceilingTitle: "Averages move, the biological ceiling stays",
    ceilingAria: "Age axis from 0 to 125 years with the medieval and modern means, the Hayflick limit zone and Jeanne Calment’s record",
    years: "years", mMed: "Middle Ages ≈ {n} yrs", mMedAdult: "medieval adults ≈ {n} yrs", mMod: "Today ≈ {n} yrs",
    mCalment: "Calment 122 yrs", mHayflick: "Hayflick limit ≈ 85–120 yrs",
    ceilingBody: "With about 60 divisions and 100 bp lost per division, the model puts a tissue’s biological ceiling between 85 and 120 years, which the human longevity record (Jeanne Calment, 122 years) bears out. In the Middle Ages, adults did reach 60, 70 or 80. The average of 30 to 35 comes from child deaths: a third of babies died before age 5, which crushes the average and says nothing about how fast people aged.",
    shieldTitle: "The modern shield",
    shield: {
      water: { t: "Clean water and sanitation", d: "In 1854, John Snow linked a cholera outbreak to the contaminated Broad Street pump in London. Clean water and sewers cut diarrhoeal disease, the leading killer of children.", y: "from 1854" },
      vaccine: { t: "Vaccines", d: "Jenner’s smallpox vaccine (1796) paved the way. Smallpox was declared eradicated in 1980. Measles, diphtheria and polio no longer kill on a massive scale.", y: "from 1796" },
      hygiene: { t: "Hygiene and antibiotics", d: "In 1847, Semmelweis enforced handwashing in maternity wards to cut puerperal fever. Penicillin (discovered in 1928) made bacterial infections treatable.", y: "1847 and 1928" }
    },
    takeTitle: "Takeaway",
    takeBody: "Hygiene, clean water and vaccines did not slow cellular ageing: they protect children and young adults so that more people reach their Hayflick limit. Modern medicine lets a larger share of the population live up to the biological ceiling. Raising that ceiling is another matter: it is the aim of research on telomerase and senolytics."
  },

  know: {
    title: "Knowledge: from molecule to lab",
    lede: "Three short sheets to understand why DNA cannot be copied to the very end, who discovered it, and where treatments stand.",
    nobel: "A Nobel-winning story", nobelBadge: "Nobel Prize 2009",
    research: "Where does research stand?",
    researchNote: "Sources checked through 2025. For 2026, check ClinicalTrials.gov: I know of no major human clinical result on life extension there."
  },
  erp: {
    title: "The end-replication problem", tabs: "Replication steps", step: "Step {n}",
    aria: "Diagram of end replication: the leading strand is complete, the lagging strand leaves a gap at the end",
    leading: "Leading strand (copied continuously)", lagging: "Lagging strand (copied in fragments)", template: "template", telomere: "telomere",
    primers: "RNA primers (red)", gap: "gap: 50–200 bp", footer: "5′ ← fragments of ~100–200 nt in eukaryotes →  3′ end of the template",
    text1: "Step 1: at the replication fork, DNA polymerase only copies in the 5′→3′ direction. One of the two strands, the leading strand, is copied in one go to the end.",
    text2: "Step 2: the other strand, the lagging strand, is copied in short pieces (Okazaki fragments, ~100–200 nucleotides). Each needs an RNA primer to get started.",
    text3: "Step 3: the primers are removed and the gaps filled. At the very end there is no upstream strand to prime the filling: a gap remains. The new strand is 50 to 200 bp shorter at every division."
  },
  timeline: [
    { y: "1961", t: "Hayflick and Moorhead", d: "Cultured human fibroblasts divide about 50 times and then stop. The Hayflick limit is born." },
    { y: "1971–72", t: "Olovnikov, then Watson", d: "Independently, they predict that DNA cannot be copied to the very end: the end-replication problem." },
    { y: "1978", t: "Blackburn and Gall", d: "In the ciliate Tetrahymena, the ends of DNA are made of short repeats (TTGGGG)." },
    { y: "1982", t: "Szostak and Blackburn", d: "Tetrahymena ends protect yeast mini-chromosomes from degradation: telomeres act as caps." },
    { y: "1984–85", t: "Greider and Blackburn", d: "Discovery of telomerase, the enzyme that adds repeats to chromosome ends. Greider was then a graduate student." },
    { y: "1988", t: "Moyzis and colleagues", d: "The human telomere sequence is identified: TTAGGG." },
    { y: "1990", t: "Harley and colleagues", d: "Human fibroblast telomeres shorten at every division, linking the Hayflick counter to telomeres." },
    { y: "1994", t: "Kim and colleagues", d: "Telomerase is active in about 90% of tumours tested, but not in most normal tissues." },
    { y: "1998", t: "Bodnar and colleagues", d: "Adding hTERT to normal human cells lets them bypass senescence: they keep dividing." },
    { y: "2009", t: "Blackburn, Greider, Szostak", d: "Nobel Prize in Physiology or Medicine “for the discovery of how chromosomes are protected by telomeres and the enzyme telomerase”.", nobel: true }
  ],
  research: [
    { name: "Imetelstat (Rytelo)", badge: ["g", "Approved"], stage: "Telomerase inhibitor · Geron", body: "The first approved telomerase inhibitor: FDA on 6 June 2024, European Union in March 2025. It treats transfusion-dependent low- to intermediate-1-risk myelodysplastic syndromes. It illustrates the “brake” side of telomerase." },
    { name: "EXG-34217", badge: ["a", "Phase 1/2"], stage: "Gene therapy · Elixirgen", body: "For rare telomere diseases (dyskeratosis congenita). In the first two patients, blood-cell telomeres lengthened durably, with no toxicity observed at 24 and 5 months (NEJM Evidence, February 2025). The trial continues." },
    { name: "Senolytics", badge: ["a", "Pilot"], stage: "Clearing senescent cells", body: "Dasatinib + quercetin, fisetin, navitoclax… In old mice, clearing senescent cells improves physical function and extends lifespan (Xu et al., 2018). In humans only small pilot trials exist, and UBX0101 (knee osteoarthritis) failed in phase 2 in 2020." },
    { name: "TERT in mice", badge: ["p", "Preclinical"], stage: "AAV gene therapy · Blasco, 2012", body: "In adult or old mice, an AAV vector carrying TERT delayed ageing and extended median lifespan (+24% at 1 year, +13% at 2 years) with no increase in cancer." },
    { name: "Libella (AAV-hTERT)", badge: ["r", "Controversial"], stage: "Phase I · Colombia", body: "A safety trial announced on about 5 participants who pay to enrol. Claims of reversing ageing rest on animal data. To my knowledge no evidence of efficacy in humans has been published." }
  ],

  quiz: {
    title: "Test your knowledge", lede: "Seven questions, with an explanation after each answer. Five correct answers unlock a badge.",
    count: "Question {i} of {n}", right: "Correct.", wrong: "Not quite.", next: "Next question", finish: "See my score",
    resultGood: "Well done: you have mastered the telomere clock.", resultTry: "Reread the sheets and try again: each attempt strengthens memory.", restart: "Start over",
    items: [
      { q: "About how many base pairs does a human telomere lose at each division?", o: ["≈ 5 bp", "≈ 100 bp", "≈ 10,000 bp", "≈ 1 million bp"], a: 1, e: "Fibroblast cultures show a loss of 50 to 200 bp per division, hence the order of magnitude of 100 bp used here." },
      { q: "What happens when telomeres become critically short?", o: ["The cell explodes", "The p53/p21 pathways arrest the cycle: senescence", "The cell divides twice as fast", "Nothing in particular"], a: 1, e: "The chromosome end is read as a DNA break. p53 and p21 halt the cycle (M1 checkpoint)." },
      { q: "What share of human cancers reactivate telomerase?", o: ["≈ 5%", "≈ 25%", "≈ 85 to 90%", "100%"], a: 2, e: "The rest, about 10 to 15%, use the ALT pathway, a recombination that lengthens telomeres without telomerase." },
      { q: "Why does an adult neuron not wear down its telomeres by dividing?", o: ["It has very active telomerase", "It does not divide: it is post-mitotic", "It has no telomeres", "Its telomeres are infinite"], a: 1, e: "Without division there is no end-replication problem. A neuron ages mainly through waste accumulation (lipofuscin, misfolded proteins)." },
      { q: "Why does medieval life expectancy (≈ 30–35 years) not prove faster cellular ageing?", o: ["Telomeres were shorter", "High child mortality pulled the average down", "People stopped dividing earlier", "The data are invented"], a: 1, e: "A third of children died before age 5. Adults who passed that hurdle often lived to 55–60, with cases of 70 or 80." },
      { q: "What do senolytics aim to do?", o: ["Lengthen telomeres", "Selectively eliminate senescent cells", "Block telomerase in tumours", "Stimulate neuron division"], a: 1, e: "They destroy the “zombie” cells that broadcast inflammatory signals (SASP), hoping to reduce inflammaging." },
      { q: "Who won the 2009 Nobel Prize in Physiology or Medicine for telomere work?", o: ["Hayflick, Watson and Crick", "Blackburn, Greider and Szostak", "Olovnikov, Harley and Kim", "Blasco, Bodnar and Moyzis"], a: 1, e: "Elizabeth Blackburn, Carol Greider and Jack Szostak were honoured for discovering the protective role of telomeres and telomerase." }
    ]
  },

  biblio: {
    title: "Bibliography", lede: "References used in the app. The model’s values remain teaching-scale orders of magnitude.",
    g: { core: "Telomeres, Hayflick, telomerase", life: "Lifestyle", aging: "Senescence and inflammation", hist: "Historical demography", research: "Clinical research" }
  },
  dlg: {
    status: "Senescent (aged)", title: "Hayflick limit reached",
    intro: "Telomeres have dropped below 4,000 bp. The cap protein complex (shelterin) can no longer hold and the chromosome end looks like a DNA break.",
    b1: "Alarm: the cell detects damage (γH2AX foci) and activates p53, then p21: the cell cycle stops. This is the M1 checkpoint.",
    b2: "A living but frozen cell: it spreads out, grows larger, and expresses senescence-associated β-galactosidase and p16INK4a.",
    b3: "An inflammatory signal: it secretes cytokines and proteases (SASP: IL-6, IL-8, MMPs) that disturb neighbouring tissue.",
    b4: "The dangerous escape route: if p53 and Rb are also inactivated, the cell carries on to crisis (M2): chromosome fusions, breaks, mass death. Rare survivors reactivate telomerase (≈ 85–90%) or the ALT pathway (≈ 10–15%) and become cancerous.",
    inflam: "In the neighbouring tissue, the inflammation gauge rises to {n}%.",
    note: "Senescence is an anti-cancer brake. It protects, but the build-up of senescent cells contributes to tissue ageing.",
    ok: "Got it", again: "New cell", clear: "Administer senolytics", go: "Try telomerase"
  },
  journal: {
    title: "Lab journal", lede: "Your discoveries are saved in this browser, when storage is available.",
    progress: "{n} of {m} badges", reset: "Clear my progress", locked: "Locked", close: "Close"
  },
  badge: {
    unlocked: "Badge unlocked: {name}",
    first: { name: "First division", desc: "Divide a cell for the first time." },
    senescent: { name: "Hayflick limit", desc: "Take a cell all the way to senescence." },
    lifespan: { name: "A life in fast-forward", desc: "Run the full lifespan simulation." },
    types: { name: "Three tissues", desc: "Try skin, liver and neuron." },
    therapy: { name: "Therapeutic zone", desc: "Set telomerase between 15 and 30%." },
    trap: { name: "Cancer trap", desc: "Push telomerase to 80% or more." },
    life: { name: "Healthy habits", desc: "Switch on three habits." },
    senolytics: { name: "Zombie hunter", desc: "Clear senescent cells." },
    compare: { name: "Control experiment", desc: "Compare with a control cell." },
    myth: { name: "Myth busted", desc: "Discover the modern cohort." },
    quiz: { name: "Top of the class", desc: "Score at least 5 out of 7 on the quiz." },
    escape: { name: "Immortal cell", desc: "Pass 60 divisions thanks to telomerase." }
  },
  toast: {
    escape: "60 divisions passed: this cell has bypassed the Hayflick limit.",
    ctrlSen: "The control cell has reached its Hayflick limit.",
    cap: "Simulation stopped at 120 divisions: the cell is immortal under these conditions.",
    cleared: "Senescent cells cleared. Inflammation: 0%."
  },
  footer: { text: "TelomereClock is a teaching tool. The values (10,000 bp at birth, critical threshold 4,000 bp, ≈ 100 bp lost per division, ≈ 60 divisions) are orders of magnitude drawn from human fibroblast cultures. Nothing here is medical advice." }
};
