// DRAFT / not verified / batch 3 adult cough-cold
// Cold & Flu · audience 'adult' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see header notes below. Do NOT invent Clean.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never graded.
// Not wired into Clean Picks UI. Do not convert coldFluPicks.ts from this file.
//
// SKIPPED (unclear / do not invent Clean):
// - Umcka ColdCare 5-inactive Clean syrup (aronia / citric acid / glycerin /
//   fructose / water): no current DailyMed or Nature's Way label matches that
//   Clean Picks list. Live website + kit SPLs add sorbate / flavors /
//   maltodextrin / alcohol. Clean Umcka row NOT created.
// - Equate Mucus Relief IR Clean (carbomer / hypromellose / MCC / povidone):
//   no Equate IR guaifenesin SPL. That inactive list is Equate 1200 mg ER
//   (setid 516c76ac), not IR. Mixed/unclear — Clean grade SKIPPED.
// - Club-store mucus ER (Kirkland / Member's Mark): no guaifenesin-only
//   Blue #1 lake Mucinex-ER match. Hits are Mucus DM (Yellow #10 or Blue #1
//   DM combo). SKIPPED per founder "only if Blue #1 lake Mucinex-ER pattern".
// - Amazon-only, Sprouts house, Save Mart house: skipped.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const COLD_FLU = 'Cold & Flu';
const ADULT = 'adult' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const HERBAL = 'herbal' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  parabens: 'Methodology §5 High-tier (parabens)',
  aspartame:
    'Methodology §5 High-tier (aspartame — IARC 2B; locked Avoid, §0 override)',
  acek: 'Methodology §5 Moderate-risk (acesulfame potassium)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  saccharin: 'Methodology §5 Moderate-risk (saccharin)',
  propylGallate: 'Methodology §5 High-tier (propyl gallate — locked v1.6)',
  bha: 'Methodology §5 High-tier (BHA)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  sorbate: 'Methodology §5 Limited-risk (synthetic preservatives — potassium sorbate)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  xylitol: 'Methodology §5 Limited-risk (xylitol, oral)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  cleared: 'Methodology §5 Cleared',
  castor: 'Methodology §5 Cleared (castor oil, oral/topical)',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function dailymed(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

// ── Clean alternatives (independently Clean rows in this batch only) ──
// No Clean Umcka syrup and no Clean Equate IR mucus in this draft.
// Form is labeled, not a hard filter (§6). Age/audience: adult.

const COLD_ORAL_ALTS: CleanAlternative[] = [
  {
    productId: 'coldcalm-meltaways',
    rankReason:
      'Closest independently Clean adult Cold & Flu analog in this batch (homeopathic meltaway tablets). Form: meltaway tablet — labeled, not a hard filter (§6).',
  },
];

const FLU_ORAL_ALTS: CleanAlternative[] = [
  {
    productId: 'coldcalm-meltaways',
    rankReason:
      'Closest independently Clean adult Cold & Flu analog (homeopathic meltaway tablets). Form: meltaway tablet — labeled, not a hard filter (§6).',
  },
  {
    productId: 'oscillococcinum',
    rankReason:
      'Homeopathic flu-like peer (200CK pellets) — appropriate only because the scanned product is positioned for flu / multi-symptom cold-flu. Form: meltaway pellets.',
  },
];

const HOMEOPATHIC_COLD_ALTS: CleanAlternative[] = [
  {
    productId: 'coldcalm-meltaways',
    rankReason:
      'Closest independently Clean homeopathic Cold & Flu peer (meltaway tablets). Form: meltaway tablet vs the scanned form — labeled, not a hard filter (§6).',
  },
];

const HOMEOPATHIC_FLU_ALTS: CleanAlternative[] = [
  {
    productId: 'coldcalm-meltaways',
    rankReason:
      'Closest independently Clean homeopathic Cold & Flu peer (meltaway tablets). Form: meltaway tablet — labeled, not a hard filter (§6).',
  },
  {
    productId: 'oscillococcinum',
    rankReason:
      'Homeopathic flu-like peer (200CK pellets) for this cold-and-flu formula. Form: meltaway pellets.',
  },
];

const THROAT_ALTS: CleanAlternative[] = [
  {
    productId: 'beekeepers-propolis-throat-spray',
    rankReason:
      'Closest independently Clean adult throat-spray analog. Form: spray.',
  },
  {
    productId: 'wedderspoon-manuka-honey-drops',
    rankReason:
      'Clean adult honey throat drop in this batch. Form: lozenge / drop — labeled, not a hard filter (§6).',
  },
];

function homeopathicFields() {
  return {
    productType: 'OTC' as const,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

export const BATCH3_ADULT_COUGH_COLD: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: 'coldcalm-meltaways',
    productName: 'Boiron Coldcalm Meltaway Tablets',
    brand: 'Boiron',
    category: COLD_FLU,
    formulaId: 'boiron-coldcalm-meltaways',
    audience: ADULT,
    minAge: 4,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '3C HPUS' },
      { name: 'Apis mellifica', strength: '6C HPUS' },
      { name: 'Belladonna', strength: '6C HPUS' },
      { name: 'Eupatorium perfoliatum', strength: '3C HPUS' },
      { name: 'Gelsemium sempervirens', strength: '6C HPUS' },
      { name: 'Kali bichromicum', strength: '6C HPUS' },
      { name: 'Nux vomica', strength: '3C HPUS' },
      { name: 'Phytolacca decandra', strength: '6C HPUS' },
      { name: 'Pulsatilla', strength: '6C HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Croscarmellose sodium',
        'cleared',
        dailymed('af4a4765-8255-44fb-821c-4345a2a45e2a', METH.cleared),
      ),
      flag(
        'Lactose',
        'cleared',
        dailymed('af4a4765-8255-44fb-821c-4345a2a45e2a', METH.cleared),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        dailymed('af4a4765-8255-44fb-821c-4345a2a45e2a', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'Draft Clean on inactives (croscarmellose sodium, lactose, magnesium stearate). Homeopathic meltaways — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Current adult-only 18+ meltaway SPL (setid 4ae2f15e) shares the same inactives; this row uses the 4+ / 6+ meltaway SPL. Audience stays adult (standard drugstore SKU).',
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      'DailyMed setid af4a4765-8255-44fb-821c-4345a2a45e2a (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'oscillococcinum',
    productName: 'Boiron Oscillococcinum',
    brand: 'Boiron',
    category: COLD_FLU,
    barcode: '306969998342 306969998519 306962878245',
    formulaId: 'boiron-oscillococcinum-200ck',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      {
        name: 'Anas barbariae hepatis et cordis extractum',
        strength: '200CK HPUS',
      },
    ],
    inactiveIngredients: [
      flag(
        'Lactose',
        'cleared',
        dailymed('209c4ec1-e06c-5679-e063-6394a90a793a', METH.cleared),
      ),
      flag(
        'Sucrose',
        'cleared',
        dailymed('209c4ec1-e06c-5679-e063-6394a90a793a', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'Draft Clean on inactives only (lactose, sucrose). STRONG HONEST NOTE: 200CK is far beyond Avogadro\'s number — no measurable active remains. ' +
      CARLSTON +
      ' Current DailyMed adult directions are 12+ (ask a doctor under 12). No efficacy claim.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Whole Foods'],
    sourcesGeneral: [
      'DailyMed setid 209c4ec1-e06c-5679-e063-6394a90a793a (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'badger-aromatic-chest-rub',
    barcode: '634084135794 634084242010',
    productName: 'Badger Aromatic Chest Rub',
    brand: 'Badger',
    category: COLD_FLU,
    formulaId: 'badger-aromatic-chest-rub',
    audience: ADULT,
    minAge: 12,
    form: 'topical rub',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Organic eucalyptus oil', strength: 'aromatic blend' },
      { name: 'Organic rosemary oil', strength: 'aromatic blend' },
      { name: 'Organic ravintsara oil', strength: 'aromatic blend' },
      { name: 'Organic tea tree oil', strength: 'aromatic blend' },
    ],
    inactiveIngredients: [
      flag(
        'Castor oil (organic)',
        'cleared',
        `Badger / Clean Picks label; ${METH.castor}`,
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Clean topical. Petroleum-free olive-oil / castor-oil base. Olive oil is not in Methodology §5 — present on the label, not graded on the spot (v1.6 intake). Menthol / camphor / eucalyptol as topical actives stay parked (Methodology §5). Essential-oil balm — patch test; not a Vicks analog on actives. No DailyMed SPL (not an OTC drug).',
    retailers: ['Walmart', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      'Clean Picks coldFluPicks.ts + Badger label (draft, not verified; no DailyMed SPL)',
    ],
  },
  {
    id: 'beekeepers-propolis-throat-spray',
    barcode: '628055142010',
    productName: "Beekeeper's Naturals Propolis Throat Spray",
    brand: "Beekeeper's Naturals",
    category: COLD_FLU,
    formulaId: 'beekeepers-propolis-throat-spray',
    audience: ADULT,
    minAge: 12,
    form: 'throat spray',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [{ name: 'Bee propolis extract', strength: '85mg' }],
    inactiveIngredients: [
      flag(
        'Vegetable glycerin',
        'cleared',
        `Beekeeper's / Clean Picks label; ${METH.cleared}`,
      ),
      flag(
        'Purified water',
        'cleared',
        `Beekeeper's / Clean Picks label; ${METH.cleared}`,
      ),
      flag(
        'Wildflower honey',
        'cleared',
        `Beekeeper's / Clean Picks label; ${METH.cleared}`,
      ),
    ],
    verdict: 'clean',
    honestNote:
      'Included because Clean Picks already lists CVS / Walmart / Whole Foods / Sprouts — batch-1 store cough/sore-throat, not a lozenge-aisle expansion. Four-ingredient label. Bee-product allergy disclaimer (bees, poplar, balsam of Peru). Honey — not for infants. No DailyMed SPL (dietary supplement).',
    retailers: ['CVS', 'Whole Foods', 'Walmart', 'Sprouts'],
    sourcesGeneral: [
      'Clean Picks coldFluPicks.ts + Beekeeper\'s label (draft, not verified; no DailyMed SPL)',
    ],
  },
  {
    id: 'wedderspoon-manuka-honey-drops',
    productName: 'Wedderspoon Organic Manuka Honey Drops',
    brand: 'Wedderspoon',
    category: COLD_FLU,
    barcode: '814422022874 814422024809 814422020375 814422020368 814422020382',
    formulaId: 'wedderspoon-manuka-honey-drops',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Manuka honey', strength: 'varies by drop' },
      { name: 'Echinacea (flavor variants may use propolis)', strength: 'varies' },
    ],
    inactiveIngredients: [
      flag(
        'Cane sugar (organic)',
        'cleared',
        `Wedderspoon / Clean Picks label; ${METH.cleared}`,
      ),
      flag(
        'Brown rice syrup',
        'cleared',
        `Wedderspoon / Clean Picks label; ${METH.cleared}`,
      ),
    ],
    verdict: 'clean',
    honestNote:
      'Included because Clean Picks already lists CVS / Walmart / Walgreens / Whole Foods / Kroger — batch-1 store cough/sore-throat, not a full lozenge aisle. Organic cane sugar + manuka honey + brown rice syrup + ginger / echinacea. Real sugar — moderate intake if managing blood sugar. Honey — not for infants. No DailyMed SPL (dietary supplement / candy-style drop).',
    retailers: ['CVS', 'Whole Foods', 'Walmart', 'Walgreens', 'Kroger'],
    sourcesGeneral: [
      'Clean Picks coldFluPicks.ts + Wedderspoon label (draft, not verified; no DailyMed SPL)',
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'umcka-coldcare-alcohol-free',
    productName: "Umcka ColdCare Alcohol-Free",
    brand: "Nature's Way",
    category: COLD_FLU,
    barcode: '033674152713',
    formulaId: 'umcka-coldcare-alcohol-free-sorbate',
    audience: ADULT,
    minAge: 13,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Pelargonium sidoides', strength: '1X' }],
    inactiveIngredients: [
      flag(
        'Potassium sorbate',
        'limited',
        dailymed('5c647ae9-6c14-4661-aba3-53e9e4756edc', METH.sorbate),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('5c647ae9-6c14-4661-aba3-53e9e4756edc', METH.maltodextrin),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('5c647ae9-6c14-4661-aba3-53e9e4756edc', METH.sorbitol),
      ),
      flag(
        'Citric acid',
        'cleared',
        dailymed('5c647ae9-6c14-4661-aba3-53e9e4756edc', METH.cleared),
      ),
      flag(
        'Glycerin',
        'cleared',
        dailymed('5c647ae9-6c14-4661-aba3-53e9e4756edc', METH.cleared),
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('5c647ae9-6c14-4661-aba3-53e9e4756edc', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Alcohol-Free SPL with potassium sorbate = Caution homeopathic. Separate formulaId from Menthol and FastActives. DailyMed also lists maltodextrin and sorbitol (each Limited) plus ethyl alcohol on this "Alcohol-Free" SPL — alcohol is not in Methodology §5 (ungraded; v1.6 intake). Draft follows the locked Caution call, not a 3-pt Avoid stack. 1X pelargonium — softer homeopathic note than 200CK. ' +
      CARLSTON +
      ' Adult dose on this SPL starts at 13; a kids chart exists down to age 1 — this row is the adult SKU. No Clean Umcka syrup row exists in this batch (current labels do not match the 5-inactive Clean Picks list).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Sprouts', 'Whole Foods'],
    cleanAlternatives: HOMEOPATHIC_COLD_ALTS,
    sourcesGeneral: [
      'DailyMed setid 5c647ae9-6c14-4661-aba3-53e9e4756edc (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'umcka-menthol-syrup',
    productName: 'Umcka Menthol Syrup',
    brand: "Nature's Way",
    category: COLD_FLU,
    barcode: '033674152720',
    formulaId: 'umcka-menthol-syrup',
    audience: ADULT,
    minAge: 12,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Pelargonium sidoides', strength: '1X' }],
    inactiveIngredients: [
      flag(
        'Natural flavor',
        'limited',
        dailymed('a3d94c70-3d62-44a8-bdae-39b07e8e0e36', METH.flavors),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('a3d94c70-3d62-44a8-bdae-39b07e8e0e36', METH.maltodextrin),
      ),
      flag(
        'Fructose',
        'cleared',
        dailymed('a3d94c70-3d62-44a8-bdae-39b07e8e0e36', METH.cleared),
      ),
      flag(
        'Glycerin',
        'cleared',
        dailymed('a3d94c70-3d62-44a8-bdae-39b07e8e0e36', METH.cleared),
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('a3d94c70-3d62-44a8-bdae-39b07e8e0e36', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Menthol syrup is a SEPARATE formulaId — Caution for natural flavor. Maltodextrin is also Limited (1+1 → Caution). Ethyl alcohol and menthol appear on the SPL and are not graded here (alcohol ungraded; menthol parked as a topical-active pending review). Do not merge with Alcohol-Free or FastActives. ' +
      CARLSTON,
    retailers: ['CVS', 'Walgreens', 'Walmart'],
    cleanAlternatives: HOMEOPATHIC_COLD_ALTS,
    sourcesGeneral: [
      'DailyMed setid a3d94c70-3d62-44a8-bdae-39b07e8e0e36 (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'umcka-fastactives-berry',
    productName: 'Umcka FastActives Berry',
    brand: "Nature's Way",
    category: COLD_FLU,
    barcode: '033674153499',
    formulaId: 'umcka-fastactives-berry',
    audience: ADULT,
    minAge: 13,
    form: 'powder packet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Pelargonium sidoides', strength: '1X' },
      { name: 'Aconitum napellus', strength: '4X' },
      { name: 'Eucalyptus globulus', strength: '2X' },
      { name: 'Bryonia', strength: '4X' },
      { name: 'Eupatorium perfoliatum', strength: '6X' },
      { name: 'Gelsemium sempervirens', strength: '4X' },
      { name: 'Phosphorus', strength: '6X' },
      { name: 'Ipecacuanha', strength: '3X' },
    ],
    inactiveIngredients: [
      flag(
        'Natural flavors',
        'limited',
        dailymed('149941fb-9b5f-42f2-bf0c-e5980f7daad6', METH.flavors),
      ),
      flag(
        'Silica',
        'cleared',
        dailymed('149941fb-9b5f-42f2-bf0c-e5980f7daad6', METH.sio2),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('149941fb-9b5f-42f2-bf0c-e5980f7daad6', METH.maltodextrin),
      ),
      flag(
        'Xylitol',
        'limited',
        dailymed('149941fb-9b5f-42f2-bf0c-e5980f7daad6', METH.xylitol),
      ),
      flag(
        'Citric acid',
        'cleared',
        dailymed('149941fb-9b5f-42f2-bf0c-e5980f7daad6', METH.cleared),
      ),
      flag(
        'Lactose monohydrate',
        'cleared',
        dailymed('149941fb-9b5f-42f2-bf0c-e5980f7daad6', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: FastActives Berry is a SEPARATE formulaId — Caution for natural flavor / silica. Silica is the nanoparticle Caution cap (0 demerit points). Maltodextrin and xylitol are also Limited; draft follows the locked Caution call rather than a 3-pt Avoid stack. Malic acid is on the SPL and is not in Methodology §5 (ungraded). Do not merge with ColdCare liquids. Adult dose 13+; 6–12 chart exists. ' +
      CARLSTON,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Whole Foods'],
    cleanAlternatives: HOMEOPATHIC_FLU_ALTS,
    sourcesGeneral: [
      'DailyMed setid 149941fb-9b5f-42f2-bf0c-e5980f7daad6 (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'sambucol-original-syrup',
    productName: 'Sambucol Black Elderberry Original Syrup',
    brand: 'Sambucol',
    category: COLD_FLU,
    barcode: '896116001112',
    formulaId: 'sambucol-original-syrup',
    audience: ADULT,
    minAge: 12,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      {
        name: 'Black elderberry extract',
        strength: '16,720mg per max serving (label)',
      },
    ],
    inactiveIngredients: [
      flag(
        'Potassium sorbate',
        'limited',
        `Sambucol / Clean Picks label; ${METH.sorbate}`,
      ),
      flag(
        'Glucose syrup',
        'cleared',
        `Sambucol / Clean Picks label; ${METH.cleared}`,
      ),
      flag(
        'Purified water',
        'cleared',
        `Sambucol / Clean Picks label; ${METH.cleared}`,
      ),
      flag(
        'Citric acid',
        'cleared',
        `Sambucol / Clean Picks label; ${METH.cleared}`,
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Sambucol Original Syrup = Caution (potassium sorbate). Glucose syrup is Cleared. Gummies with vegetable oil are a different formula and are not this row. No DailyMed SPL (dietary supplement).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Whole Foods', 'Sprouts'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'Clean Picks coldFluPicks.ts + Sambucol Original Syrup label (draft, not verified; no DailyMed SPL)',
    ],
  },
  {
    id: 'chestal-adult-honey',
    productName: 'Boiron Chestal Honey Cough Syrup (Adult)',
    brand: 'Boiron',
    category: COLD_FLU,
    barcode: '306969032282',
    formulaId: 'boiron-chestal-adult-honey',
    audience: ADULT,
    minAge: 12,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Antimonium tartaricum', strength: '6C HPUS' },
      { name: 'Bryonia', strength: '3C HPUS' },
      { name: 'Coccus cacti', strength: '3C HPUS' },
      { name: 'Drosera', strength: '3C HPUS' },
      { name: 'Ipecacuanha', strength: '3C HPUS' },
      { name: 'Pulsatilla', strength: '6C HPUS' },
      { name: 'Rumex crispus', strength: '6C HPUS' },
      { name: 'Spongia tosta', strength: '3C HPUS' },
      { name: 'Sticta pulmonaria', strength: '3C HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('76589f60-0f09-4d7a-8aaa-f1965df1fe9d', METH.benzoate),
      ),
      flag(
        'Citric acid',
        'cleared',
        dailymed('76589f60-0f09-4d7a-8aaa-f1965df1fe9d', METH.cleared),
      ),
      flag(
        'Honey',
        'cleared',
        dailymed('76589f60-0f09-4d7a-8aaa-f1965df1fe9d', METH.cleared),
      ),
      flag(
        'Sucrose',
        'cleared',
        dailymed('76589f60-0f09-4d7a-8aaa-f1965df1fe9d', METH.cleared),
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('76589f60-0f09-4d7a-8aaa-f1965df1fe9d', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: confirm exact adult SPL — sodium benzoate only and no High flags → Caution (like kids Chestal). Do not invent Clean. Trace alcohol is listed (~0.00007%) and is not in Methodology §5 (ungraded). Honey — not for infants. Chestal Cold and Cough Honey (setid 4ecd2dcf) shares the same inactive list on a different active blend — same Caution family if the bottle matches benzoate / honey / sucrose. ' +
      CARLSTON,
    retailers: ['CVS', 'Walgreens', 'Walmart'],
    cleanAlternatives: HOMEOPATHIC_COLD_ALTS,
    sourcesGeneral: [
      'DailyMed setid 76589f60-0f09-4d7a-8aaa-f1965df1fe9d (draft, not verified)',
      CARLSTON,
    ],
  },

  // ── Avoid nationals ──────────────────────────────────────
  {
    id: 'mucinex-er-600',
    productName: 'Mucinex 12-Hour Chest Congestion Expectorant (600 mg)',
    brand: 'Mucinex',
    category: COLD_FLU,
    barcode: '363824008202 363824008400 363824008868 363824008158 363824008509',
    formulaId: 'mucinex-er-600-blue1',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Guaifenesin', strength: '600mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('dd379cdd-90ab-42e0-ad89-f50d3220f611', METH.dyes),
      ),
      flag(
        'Carbomer homopolymer type B',
        'cleared',
        dailymed('dd379cdd-90ab-42e0-ad89-f50d3220f611', METH.cleared),
      ),
      flag(
        'Hypromellose',
        'cleared',
        dailymed('dd379cdd-90ab-42e0-ad89-f50d3220f611', METH.cleared),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        dailymed('dd379cdd-90ab-42e0-ad89-f50d3220f611', METH.cleared),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        dailymed('dd379cdd-90ab-42e0-ad89-f50d3220f611', METH.cleared),
      ),
      flag(
        'Sodium starch glycolate',
        'cleared',
        dailymed('dd379cdd-90ab-42e0-ad89-f50d3220f611', METH.cleared),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Mucinex ER Blue #1 aluminum lake is High-tier. No Clean guaifenesin analog in this batch (Equate IR Clean was skipped — no proven IR SPL). Closest Clean swap is a Cold & Flu homeopathic meltaway, not a 12-hour expectorant replacement.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens', 'Costco', "Sam's Club"],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid dd379cdd-90ab-42e0-ad89-f50d3220f611 (Reckitt NDC 63824-008; draft, not verified)',
    ],
  },
  {
    id: 'mucinex-dm-er',
    productName: 'Mucinex DM 12-Hour (600 mg / 30 mg)',
    brand: 'Mucinex',
    category: COLD_FLU,
    barcode: '363824056203 363824056401 363824011653 363824050195 363824050126',
    formulaId: 'mucinex-dm-er-yellow10',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Guaifenesin', strength: '600mg' },
      { name: 'Dextromethorphan HBr', strength: '30mg' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed('70987d06-d206-445f-bd0d-5e1345b8465c', METH.dyes),
      ),
      flag(
        'Carbomer homopolymer type B',
        'cleared',
        dailymed('70987d06-d206-445f-bd0d-5e1345b8465c', METH.cleared),
      ),
      flag(
        'Hypromellose',
        'cleared',
        dailymed('70987d06-d206-445f-bd0d-5e1345b8465c', METH.cleared),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        dailymed('70987d06-d206-445f-bd0d-5e1345b8465c', METH.cleared),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Mucinex DM Yellow #10 aluminum lake is High-tier. Separate formula from guaifenesin-only ER Blue #1. No Clean DM expectorant in this batch.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 70987d06-d206-445f-bd0d-5e1345b8465c (draft, not verified)',
    ],
  },
  {
    id: 'mucinex-fastmax-cold-flu-gels',
    productName: 'Mucinex Fast-Max Cold & Flu Maximum Strength Liquid Gels',
    brand: 'Mucinex',
    category: COLD_FLU,
    barcode: '363824595160',
    formulaId: 'mucinex-fastmax-cold-flu-gels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg' },
      { name: 'Dextromethorphan HBr', strength: '10mg' },
      { name: 'Guaifenesin', strength: '200mg' },
      { name: 'Phenylephrine HCl', strength: '5mg' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Yellow No. 6',
        'high',
        dailymed('27312ee4-d1f4-4a95-9c45-91fa5a01f5ba', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('27312ee4-d1f4-4a95-9c45-91fa5a01f5ba', METH.tio2),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('27312ee4-d1f4-4a95-9c45-91fa5a01f5ba', METH.peg),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('27312ee4-d1f4-4a95-9c45-91fa5a01f5ba', METH.pg),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Fast-Max / Sinus-Max dyed family — representative liquid-gel SKU, not every flavor. Yellow 6 and titanium dioxide are each High-tier.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: FLU_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 27312ee4-d1f4-4a95-9c45-91fa5a01f5ba (draft, not verified)',
    ],
  },
  {
    id: 'mucinex-fastmax-dm-max',
    productName: 'Mucinex Fast-Max DM Max',
    brand: 'Mucinex',
    category: COLD_FLU,
    barcode: '363824018669',
    formulaId: 'mucinex-fastmax-dm-max-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '20mg / 20mL' },
      { name: 'Guaifenesin', strength: '400mg / 20mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('6a8cdcad-4881-49b8-a3f1-2c1574300d18', METH.dyes),
      ),
      flag(
        'Propyl gallate',
        'high',
        dailymed('6a8cdcad-4881-49b8-a3f1-2c1574300d18', METH.propylGallate),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('6a8cdcad-4881-49b8-a3f1-2c1574300d18', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('6a8cdcad-4881-49b8-a3f1-2c1574300d18', METH.sucralose),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('6a8cdcad-4881-49b8-a3f1-2c1574300d18', METH.benzoate),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Fast-Max dyed liquid representative (Red 40 + propyl gallate). Not every Fast-Max SKU.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 6a8cdcad-4881-49b8-a3f1-2c1574300d18 (draft, not verified)',
    ],
  },
  {
    id: 'mucinex-sinusmax-severe-cong-pain',
    productName: 'Mucinex Sinus-Max Severe Congestion & Pain Maximum Strength',
    brand: 'Mucinex',
    category: COLD_FLU,
    barcode: '363824261669',
    formulaId: 'mucinex-sinusmax-severe-cong-pain-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '650mg / 20mL' },
      { name: 'Guaifenesin', strength: '400mg / 20mL' },
      { name: 'Phenylephrine HCl', strength: '10mg / 20mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('cea08797-1d53-4434-be1a-144f2ded5f9d', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('cea08797-1d53-4434-be1a-144f2ded5f9d', METH.dyes),
      ),
      flag(
        'Propyl gallate',
        'high',
        dailymed('cea08797-1d53-4434-be1a-144f2ded5f9d', METH.propylGallate),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('cea08797-1d53-4434-be1a-144f2ded5f9d', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('cea08797-1d53-4434-be1a-144f2ded5f9d', METH.sucralose),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Sinus-Max dyed family representative (Blue 1 + Red 40). Not every Sinus-Max SKU.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: FLU_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid cea08797-1d53-4434-be1a-144f2ded5f9d (draft, not verified)',
    ],
  },
  {
    id: 'dayquil-cold-flu-liquid',
    productName: 'Vicks DayQuil Cold & Flu',
    brand: 'Vicks',
    category: COLD_FLU,
    barcode: '323900014367 323900014350',
    formulaId: 'vicks-dayquil-cold-flu-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 15mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 15mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 15mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Yellow No. 6',
        'high',
        dailymed('fc9a43d8-0359-9def-e053-6294a90a7e91', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('fc9a43d8-0359-9def-e053-6294a90a7e91', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('fc9a43d8-0359-9def-e053-6294a90a7e91', METH.sucralose),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('fc9a43d8-0359-9def-e053-6294a90a7e91', METH.saccharin),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('fc9a43d8-0359-9def-e053-6294a90a7e91', METH.benzoate),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('fc9a43d8-0359-9def-e053-6294a90a7e91', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'DayQuil liquid — Yellow 6 is High-tier. LiquiCap DayQuil is a separate dyed / TiO2 formula (not every SKU is this row). Stay under 4 g/day acetaminophen.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: FLU_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid fc9a43d8-0359-9def-e053-6294a90a7e91 (draft, not verified)',
    ],
  },
  {
    id: 'nyquil-cold-flu-liquid',
    productName: 'Vicks NyQuil Cold & Flu Nighttime Relief',
    brand: 'Vicks',
    category: COLD_FLU,
    barcode: '323900045149',
    formulaId: 'vicks-nyquil-cold-flu-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '650mg / 30mL' },
      { name: 'Dextromethorphan HBr', strength: '30mg / 30mL' },
      { name: 'Doxylamine succinate', strength: '12.5mg / 30mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('1d5e9cd9-0d76-19e0-e063-6294a90a78fd', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('1d5e9cd9-0d76-19e0-e063-6294a90a78fd', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('1d5e9cd9-0d76-19e0-e063-6294a90a78fd', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('1d5e9cd9-0d76-19e0-e063-6294a90a78fd', METH.sucralose),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('1d5e9cd9-0d76-19e0-e063-6294a90a78fd', METH.saccharin),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('1d5e9cd9-0d76-19e0-e063-6294a90a78fd', METH.benzoate),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'NyQuil berry liquid — Blue 1 + Red 40 are High-tier. Original green NyQuil liquids use Yellow 10 / Green 3 / Yellow 6 and are the same Avoid family, not a separate Clean path.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: FLU_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 1d5e9cd9-0d76-19e0-e063-6294a90a78fd (draft, not verified)',
    ],
  },
  {
    id: 'robitussin-dm-liquid',
    productName: 'Robitussin Cough + Chest Congestion DM',
    brand: 'Robitussin',
    category: COLD_FLU,
    barcode: '300318757123 300318757185',
    formulaId: 'robitussin-dm-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '20mg / 20mL' },
      { name: 'Guaifenesin', strength: '200mg / 20mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('4908b326-e1da-44ca-8087-7e41a16c27b0', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('4908b326-e1da-44ca-8087-7e41a16c27b0', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('4908b326-e1da-44ca-8087-7e41a16c27b0', METH.pg),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('4908b326-e1da-44ca-8087-7e41a16c27b0', METH.peg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('4908b326-e1da-44ca-8087-7e41a16c27b0', METH.sucralose),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('4908b326-e1da-44ca-8087-7e41a16c27b0', METH.benzoate),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Robitussin DM liquid — Blue 1 + Red 40. Sugar-free dye-free Robitussin DM is a different formula (sucralose + PG + benzoate) and would still Avoid; not merged here.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 4908b326-e1da-44ca-8087-7e41a16c27b0 (draft, not verified)',
    ],
  },
  {
    id: 'robitussin-dm-max-liquid',
    productName: 'Robitussin Maximum Strength Cough + Chest Congestion DM',
    brand: 'Robitussin',
    category: COLD_FLU,
    barcode: '300318739181 300318739129',
    formulaId: 'robitussin-dm-max-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '20mg / 20mL' },
      { name: 'Guaifenesin', strength: '400mg / 20mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('f1d022dd-c2ca-497f-87d5-9ef3e20e8ea7', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('f1d022dd-c2ca-497f-87d5-9ef3e20e8ea7', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('f1d022dd-c2ca-497f-87d5-9ef3e20e8ea7', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('f1d022dd-c2ca-497f-87d5-9ef3e20e8ea7', METH.sucralose),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Max-strength Robitussin DM liquid — same dyed family as the 200 mg guaifenesin DM liquid, separate formulaId because the guaifenesin strength differs.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid f1d022dd-c2ca-497f-87d5-9ef3e20e8ea7 (draft, not verified)',
    ],
  },
  {
    id: 'robitussin-coughgels',
    productName: 'Robitussin Long-Acting CoughGels',
    brand: 'Robitussin',
    category: COLD_FLU,
    barcode: '300318741207',
    formulaId: 'robitussin-coughgels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid-filled capsule',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Dextromethorphan HBr', strength: '15mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('472c5c1f-eb5a-444b-a17e-f0d71007fb15', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('472c5c1f-eb5a-444b-a17e-f0d71007fb15', METH.dyes),
      ),
      flag(
        'Propyl gallate',
        'high',
        dailymed('472c5c1f-eb5a-444b-a17e-f0d71007fb15', METH.propylGallate),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('472c5c1f-eb5a-444b-a17e-f0d71007fb15', METH.peg),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('472c5c1f-eb5a-444b-a17e-f0d71007fb15', METH.pg),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'CoughGels — Blue 1 + Red 40 + propyl gallate. Separate from Robitussin DM liquids.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 472c5c1f-eb5a-444b-a17e-f0d71007fb15 (draft, not verified)',
    ],
  },
  {
    id: 'delsym-12hr-grape',
    productName: 'Delsym 12-Hour Cough Relief (grape)',
    brand: 'Delsym',
    category: COLD_FLU,
    barcode: '363824171654 363824171630',
    formulaId: 'delsym-12hr-grape',
    audience: ADULT,
    minAge: 12,
    form: 'ER suspension',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      {
        name: 'Dextromethorphan polistirex',
        strength: '30mg / 5mL (as HBr equivalent)',
      },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 33',
        'high',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.dyes),
      ),
      flag(
        'Methylparaben',
        'high',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.parabens),
      ),
      flag(
        'Propylparaben',
        'high',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.parabens),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.ps80),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.pg),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-confirmed 12-hour grape Delsym (Red 33 + Blue 1) plus parabens. Orange 12-hour SPLs use Yellow 6 and are the same Avoid family. HFCS appears on this label and is parked / ungraded (Methodology §5) — Avoid already stands on dyes + parabens. Adult row; the same suspension is also labeled for younger ages on some cartons.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 234e6a2c-a280-4a39-8777-9316e9d681fb (draft, not verified)',
    ],
  },
  {
    id: 'sudafed-pe-sinus-congestion',
    productName: 'Sudafed PE Sinus Congestion',
    brand: 'Sudafed',
    category: COLD_FLU,
    barcode: '300450581365 300450581181',
    formulaId: 'sudafed-pe-sinus-congestion',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Phenylephrine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed('2ca08917-1a75-4365-8520-c083e6a4225a', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed('2ca08917-1a75-4365-8520-c083e6a4225a', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed('2ca08917-1a75-4365-8520-c083e6a4225a', METH.dyes),
      ),
      flag(
        'Talc',
        'high',
        dailymed('2ca08917-1a75-4365-8520-c083e6a4225a', METH.talc),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('2ca08917-1a75-4365-8520-c083e6a4225a', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Sudafed PE — lake dyes + talc + titanium dioxide. Not a Clean decongestant analog in this batch; listed swap is the Clean Cold & Flu meltaway, different active.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 2ca08917-1a75-4365-8520-c083e6a4225a (draft, not verified)',
    ],
  },
  {
    id: 'sudafed-12hr',
    productName: 'Sudafed Sinus Congestion 12 Hour',
    brand: 'Sudafed',
    category: COLD_FLU,
    barcode: '300810670135',
    formulaId: 'sudafed-12hr-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Pseudoephedrine HCl', strength: '120mg' }],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('0e4717a1-914b-466d-8bf0-d37ebc32fdb3', METH.tio2),
      ),
      flag(
        'Silicon dioxide (colloidal)',
        'cleared',
        dailymed('0e4717a1-914b-466d-8bf0-d37ebc32fdb3', METH.sio2),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('0e4717a1-914b-466d-8bf0-d37ebc32fdb3', METH.peg),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('0e4717a1-914b-466d-8bf0-d37ebc32fdb3', METH.ps80),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Sudafed 12-hour — titanium dioxide is High-tier. Behind-the-counter PSE. Silicon dioxide is a Caution cap only and does not soften Avoid.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 0e4717a1-914b-466d-8bf0-d37ebc32fdb3 (draft, not verified)',
    ],
  },
  {
    id: 'theraflu-severe-cold-day-powder',
    productName: 'Theraflu Severe Cold Relief Daytime Powder',
    brand: 'Theraflu',
    category: COLD_FLU,
    formulaId: 'theraflu-severe-cold-day-powder',
    audience: ADULT,
    minAge: 12,
    form: 'powder packet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg' },
      { name: 'Dextromethorphan HBr', strength: '20mg' },
    ],
    inactiveIngredients: [
      flag(
        'Aspartame',
        'high',
        dailymed('2b962d87-6ff5-4c0f-8504-e5b61c940612', METH.aspartame),
      ),
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed('2b962d87-6ff5-4c0f-8504-e5b61c940612', METH.acek),
      ),
      flag(
        'D&C Yellow No. 10',
        'high',
        dailymed('2b962d87-6ff5-4c0f-8504-e5b61c940612', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('2b962d87-6ff5-4c0f-8504-e5b61c940612', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('2b962d87-6ff5-4c0f-8504-e5b61c940612', METH.dyes),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed('2b962d87-6ff5-4c0f-8504-e5b61c940612', METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Theraflu powder family — aspartame is locked Avoid; Ace-K is Moderate; dyes are High-tier. Nighttime powders in this line also use aspartame / Ace-K. Contains phenylalanine (aspartame).',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: FLU_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 2b962d87-6ff5-4c0f-8504-e5b61c940612 (draft, not verified)',
    ],
  },
  {
    id: 'vicks-formula-44-dm',
    productName: 'Vicks Formula 44 DM Painful Cough & Sore Throat',
    brand: 'Vicks',
    category: COLD_FLU,
    barcode: '323900047877',
    formulaId: 'vicks-formula-44-dm',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '650mg / 30mL' },
      { name: 'Dextromethorphan HBr', strength: '30mg / 30mL' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10',
        'high',
        dailymed('d536f159-304f-4759-be14-0e4895777c97', METH.dyes),
      ),
      flag(
        'FD&C Green No. 3',
        'high',
        dailymed('d536f159-304f-4759-be14-0e4895777c97', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('d536f159-304f-4759-be14-0e4895777c97', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6',
        'high',
        dailymed('d536f159-304f-4759-be14-0e4895777c97', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('d536f159-304f-4759-be14-0e4895777c97', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('d536f159-304f-4759-be14-0e4895777c97', METH.sucralose),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Vicks 44 included as the current Formula 44 DM cough/sore-throat liquid — multiple synthetic dyes. Formula 44 cough drops (Red 40) are a separate candy SKU and are not this row.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: [...COLD_ORAL_ALTS, ...THROAT_ALTS],
    sourcesGeneral: [
      'DailyMed setid d536f159-304f-4759-be14-0e4895777c97 (draft, not verified)',
    ],
  },

  // ── Avoid store brands ───────────────────────────────────
  {
    id: 'equate-mucus-er-600',
    productName: 'Equate Mucus-ER (600 mg)',
    brand: 'Equate',
    category: COLD_FLU,
    barcode: '194346536276',
    formulaId: 'equate-mucus-er-600-blue1',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Guaifenesin', strength: '600mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('a2cc6dec-388a-46bd-9cbc-1ffb6fd1aea3', METH.dyes),
      ),
      flag(
        'Carbomer homopolymer type B',
        'cleared',
        dailymed('a2cc6dec-388a-46bd-9cbc-1ffb6fd1aea3', METH.cleared),
      ),
      flag(
        'Hypromellose',
        'cleared',
        dailymed('a2cc6dec-388a-46bd-9cbc-1ffb6fd1aea3', METH.cleared),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        dailymed('a2cc6dec-388a-46bd-9cbc-1ffb6fd1aea3', METH.cleared),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Equate Mucus-ER is totally separate from any immediate-release mucus tablet. Blue #1 aluminum lake — same family as Mucinex ER. PROJECT_NOTES Aug 8 correction stands. No Clean Equate IR row in this batch (IR SKU not proven on DailyMed).',
    retailers: ['Walmart'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid a2cc6dec-388a-46bd-9cbc-1ffb6fd1aea3 (draft, not verified)',
    ],
  },
  {
    id: 'upup-mucus-relief-600-blue',
    productName: 'up&up Mucus Relief (600 mg)',
    brand: 'up&up',
    category: COLD_FLU,
    barcode: '370030118120',
    formulaId: 'upup-mucus-er-600-blue1',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Guaifenesin', strength: '600mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('7c1598f1-1236-48d2-861b-de4715e3f3d2', METH.dyes),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'up&up mucus blue — Blue #1 aluminum lake, Mucinex-ER family. 1200 mg up&up ER SPLs also carry Blue #1 lake (separate pack / strength, same Avoid family).',
    retailers: ['Target'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 7c1598f1-1236-48d2-861b-de4715e3f3d2 (draft, not verified)',
    ],
  },
  {
    id: 'upup-mucus-relief-dm-yellow',
    productName: 'up&up Mucus Relief DM (600 mg / 30 mg)',
    brand: 'up&up',
    category: COLD_FLU,
    barcode: '370030275663',
    formulaId: 'upup-mucus-dm-er-yellow10',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Guaifenesin', strength: '600mg' },
      { name: 'Dextromethorphan HBr', strength: '30mg' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed('9cb3719b-44bc-4ad1-a9c5-e6cc047f4d0e', METH.dyes),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed('9cb3719b-44bc-4ad1-a9c5-e6cc047f4d0e', METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'up&up mucus yellow — Yellow #10 aluminum lake, Mucinex-DM family.',
    retailers: ['Target'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 9cb3719b-44bc-4ad1-a9c5-e6cc047f4d0e (draft, not verified)',
    ],
  },
  {
    id: 'cvs-adult-cough-chest-dm-dyefree',
    productName: 'CVS Adult Cough + Chest Congestion DM Dye-Free',
    brand: 'CVS Health',
    category: COLD_FLU,
    barcode: '050428267493',
    formulaId: 'cvs-adult-cough-chest-dm-dyefree',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '20mg / 20mL' },
      { name: 'Guaifenesin', strength: '200mg / 20mL' },
    ],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('4490a7e1-d5b9-459c-8751-c24486807981', METH.sucralose),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('4490a7e1-d5b9-459c-8751-c24486807981', METH.pg),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('4490a7e1-d5b9-459c-8751-c24486807981', METH.benzoate),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('4490a7e1-d5b9-459c-8751-c24486807981', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: CVS Adult Cough + Chest Congestion DM dye-free = Avoid (sucralose + PG + benzoate). Dye-free is not Clean. 2+2+1 demerit points.',
    retailers: ['CVS'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 4490a7e1-d5b9-459c-8751-c24486807981 (draft, not verified)',
    ],
  },
  {
    id: 'cvs-cough-chest-dm-liquid',
    productName: 'CVS Cough and Chest Congestion DM Adult',
    brand: 'CVS Health',
    category: COLD_FLU,
    barcode: '050428137468',
    formulaId: 'cvs-cough-chest-dm-liquid-red40',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '20mg / 20mL' },
      { name: 'Guaifenesin', strength: '400mg / 20mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('4444c05a-eba6-4633-b86f-34f455699fa9', METH.dyes),
      ),
      flag(
        'Propyl gallate',
        'high',
        dailymed('4444c05a-eba6-4633-b86f-34f455699fa9', METH.propylGallate),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('4444c05a-eba6-4633-b86f-34f455699fa9', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('4444c05a-eba6-4633-b86f-34f455699fa9', METH.sucralose),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('4444c05a-eba6-4633-b86f-34f455699fa9', METH.benzoate),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'CVS mucus / tussin-style DM liquid (dyed). Separate formulaId from the dye-free Avoid row. Red 40 + propyl gallate.',
    retailers: ['CVS'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 4444c05a-eba6-4633-b86f-34f455699fa9 (draft, not verified)',
    ],
  },
  {
    id: 'signature-care-daytime-severe',
    productName: 'Signature Care Daytime Severe Cold & Flu Relief',
    brand: 'Signature Care',
    category: COLD_FLU,
    barcode: '321130788911',
    formulaId: 'signature-care-daytime-severe',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 15mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 15mL' },
      { name: 'Guaifenesin', strength: '200mg / 15mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 15mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Yellow No. 6',
        'high',
        dailymed('25a26577-a9f8-49cb-9d75-d8c471e4aaf6', METH.dyes),
      ),
      flag(
        'Butylated hydroxyanisole (BHA)',
        'high',
        dailymed('25a26577-a9f8-49cb-9d75-d8c471e4aaf6', METH.bha),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('25a26577-a9f8-49cb-9d75-d8c471e4aaf6', METH.pg),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('25a26577-a9f8-49cb-9d75-d8c471e4aaf6', METH.saccharin),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Signature Care daytime severe — Yellow 6 + BHA. DayQuil-style store liquid.',
    retailers: ['Safeway'],
    cleanAlternatives: FLU_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 25a26577-a9f8-49cb-9d75-d8c471e4aaf6 (draft, not verified)',
    ],
  },
  {
    id: 'equate-daytime-cold-flu',
    productName: 'Equate Daytime Cold & Flu',
    brand: 'Equate',
    category: COLD_FLU,
    formulaId: 'equate-daytime-cold-flu-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 15mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 15mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 15mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Yellow No. 6',
        'high',
        dailymed('2ac53cc7-000f-41fd-b799-4e6d6886fe62', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('2ac53cc7-000f-41fd-b799-4e6d6886fe62', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('2ac53cc7-000f-41fd-b799-4e6d6886fe62', METH.sucralose),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('2ac53cc7-000f-41fd-b799-4e6d6886fe62', METH.saccharin),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('2ac53cc7-000f-41fd-b799-4e6d6886fe62', METH.benzoate),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('2ac53cc7-000f-41fd-b799-4e6d6886fe62', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Equate daytime cold-flu dyed liquid representative (Yellow 6). Equate daytime severe (guaifenesin added, setid 69b24c67) is the same dyed family — not a separate Clean path.',
    retailers: ['Walmart'],
    cleanAlternatives: FLU_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 2ac53cc7-000f-41fd-b799-4e6d6886fe62 (draft, not verified)',
    ],
  },
  {
    id: 'upup-daytime-honey-cold-flu',
    productName: 'up&up Daytime Honey Cold & Flu',
    brand: 'up&up',
    category: COLD_FLU,
    formulaId: 'upup-daytime-honey-cold-flu',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 15mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 15mL' },
      { name: 'Guaifenesin', strength: '200mg / 15mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 15mL' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10',
        'high',
        dailymed('29da4b94-8f8e-48e8-909f-8476e3b39d78', METH.dyes),
      ),
      flag(
        'FD&C Green No. 3',
        'high',
        dailymed('29da4b94-8f8e-48e8-909f-8476e3b39d78', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('29da4b94-8f8e-48e8-909f-8476e3b39d78', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6',
        'high',
        dailymed('29da4b94-8f8e-48e8-909f-8476e3b39d78', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('29da4b94-8f8e-48e8-909f-8476e3b39d78', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('29da4b94-8f8e-48e8-909f-8476e3b39d78', METH.sucralose),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'up&up daytime cold-flu dyed liquid representative (Yellow 10 / Green 3 / Red 40 / Yellow 6). Honey on the name does not clear the dyes.',
    retailers: ['Target'],
    cleanAlternatives: FLU_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 29da4b94-8f8e-48e8-909f-8476e3b39d78 (draft, not verified)',
    ],
  },
];

// Verdict tally (33 records): Clean 5 · Caution 5 · Avoid 23
// Skipped-unclear: Umcka Clean ColdCare 5-inactive syrup; Equate IR mucus Clean;
// club-store guaifenesin-only ER (Kirkland / Member's Mark).