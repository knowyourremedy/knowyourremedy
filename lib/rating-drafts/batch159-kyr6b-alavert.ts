// DRAFT / not verified / batch 159 KYR6-b Alavert.
// Two counted orally disintegrating packs. Each panel was read on the
// opened Target drug-facts block and matches the DailyMed line for that
// flavor. A Walmart page for that same count had Add enabled and a
// shipping date. Citrus Burst 60 was out of stock on the Target page
// that opened. D-12 24 was not available on the pages that opened.
// Chlor-Trimeton is not in this file. No twin on main.
//
// TALLY: 2 written — Clean 0 / Caution 1 / Avoid 1.
// NEW 2 / REUSE 0. Written-row ungraded tokens: 0.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const ALLERGIES = 'Allergies';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const CITRUS_SET = '1704474a-9b99-de45-e063-6294a90ac59b';
const MINT_SET = '15c3f848-fef6-433b-e063-6394a90abd2b';
const CITRUS_FORMULA = 'alavert-b159-citrus-odt';
const MINT_FORMULA = 'alavert-b159-mint-odt';

const METH = {
  aspartame: 'Methodology §5 High (aspartame). Avoid.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver on the citrus row.',
  flavors: 'Methodology §5 Caution (bare flavors). Exact “Natural flavors” stays Limited. Not the Avoid driver.',
  peppermint: 'Methodology §5 Caution (peppermint flavor → flavor family). Distinct from Limited “Natural flavors”.',
  mannitol: 'Methodology §5 Limited (mannitol).',
  citric: 'Methodology §5 Cleared (anhydrous citric acid → citric acid).',
  pullulan: 'Methodology §5 Cleared (pullulan → organic pullulan, HPMC-family polymer).',
} as const;

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}
function cleared(setid: string, name: string, meth: string): IngredientFlag {
  return flag(name, 'cleared', cite(setid, meth));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ADULT_ALTS: CleanAlternative[] = [
  alt('claritin-allergy-tablets-plain', 'Independently Clean plain loratadine tablets already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];

export const BATCH159_KYR6B_ALAVERT: RatingRecord[] = [
  {
    id: 'alavert-b159-citrus-20',
    productName: 'Alavert Allergy Citrus Burst (20 orally disintegrating tablets)',
    brand: 'Alavert',
    category: ALLERGIES,
    barcode: '850024429086',
    formulaId: CITRUS_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'orally disintegrating tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Loratadine', strength: '10 mg' }],
    inactiveIngredients: [
      flag('Aspartame', 'high', cite(CITRUS_SET, METH.aspartame)),
      flag('Polysorbate 80', 'moderate', cite(CITRUS_SET, METH.ps80)),
      flag('Flavors', 'limited', cite(CITRUS_SET, METH.flavors)),
      flag('Mannitol', 'limited', cite(CITRUS_SET, METH.mannitol)),
      cleared(CITRUS_SET, 'Anhydrous citric acid', METH.citric),
      cleared(CITRUS_SET, 'Pullulan', METH.pullulan),
    ],
    verdict: 'avoid',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 1704474a-9b99-de45-e063-6294a90ac59b (Foundation Consumer Healthcare). Active: loratadine 10 mg. Inactive ingredients: anhydrous citric acid, aspartame, flavors, mannitol, polysorbate 80, pullulan. Package NDC 69536-195-20 is 20 orally disintegrating tablets. The same inactive line is on the opened Target 20-count drug facts (TCIN 1012236058). Target primary barcode 850024429086 is this 20-count. Walmart item 5320096407 opened as Alavert Quick Dissolving Non-Drowsy Allergy Relief Tabs Citrus Burst 20 Count with Add enabled and shipping.',
    ],
  },
  {
    id: 'alavert-b159-mint-60',
    productName: 'Alavert Allergy Fresh Mint (60 orally disintegrating tablets)',
    brand: 'Alavert',
    category: ALLERGIES,
    barcode: '850024429079',
    formulaId: MINT_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'orally disintegrating tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Loratadine', strength: '10 mg' }],
    inactiveIngredients: [
      flag('Polysorbate 80', 'moderate', cite(MINT_SET, METH.ps80)),
      flag('Mannitol', 'limited', cite(MINT_SET, METH.mannitol)),
      flag('Peppermint flavor', 'limited', cite(MINT_SET, METH.peppermint)),
      cleared(MINT_SET, 'Anhydrous citric acid', METH.citric),
      cleared(MINT_SET, 'Pullulan', METH.pullulan),
    ],
    verdict: 'caution',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 15c3f848-fef6-433b-e063-6394a90abd2b (Foundation Consumer Healthcare). Active: loratadine 10 mg. Inactive ingredients: anhydrous citric acid, mannitol, peppermint flavor, polysorbate 80, pullulan. Package NDC 69536-190-60 is 60 orally disintegrating tablets. The same inactive line is on the opened Target 60-count Fresh Mint drug facts (TCIN 1005857919). Target primary barcode 850024429079 is this 60-count. Walmart item 1856625315 opened as the Fresh Mint 60 Count with Add enabled and shipping.',
    ],
  },
];

const ROWS = BATCH159_KYR6B_ALAVERT;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch159 row count ${ROWS.length}`);
const citrus = ROWS[0];
const mint = ROWS[1];
if (citrus.id !== 'alavert-b159-citrus-20' || mint.id !== 'alavert-b159-mint-60') {
  throw new Error('batch159 ids');
}
if (citrus.barcode !== '850024429086' || mint.barcode !== '850024429079') throw new Error('batch159 upc');
if (!upcOk(citrus.barcode ?? '') || !upcOk(mint.barcode ?? '')) throw new Error('batch159 check digit');
if (citrus.formulaId !== CITRUS_FORMULA || mint.formulaId !== MINT_FORMULA) throw new Error('batch159 formula');
if (citrus.minAge !== 6 || mint.minAge !== 6 || citrus.audience !== 'adult' || mint.audience !== 'adult') {
  throw new Error('batch159 age');
}
if (citrus.inactiveIngredients.length !== 6 || mint.inactiveIngredients.length !== 5) {
  throw new Error('batch159 panel');
}
if (citrus.inactiveIngredients.filter((item) => item.riskLevel === 'high').length !== 1) {
  throw new Error('batch159 citrus high');
}
if (mint.inactiveIngredients.some((item) => item.riskLevel === 'high')) throw new Error('batch159 mint high');
