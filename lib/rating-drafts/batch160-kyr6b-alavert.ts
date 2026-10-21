// DRAFT / not verified / batch 160 KYR6-b Alavert.
// Citrus Burst 60 reuses the pullulan line read on the Target 60-count
// drug facts (same inactives as alavert-b159-citrus-20). Wiser Merchant
// opened that single 60-count in stock. D-12 12 is a new formula. USA
// Central Wholesale opened the 12-tablet box in stock. No barcode was on
// that page. Fresh Mint 18, the February 2026 long inactive line, and
// branded Chlor-Trimeton are not in this file.
//
// TALLY: 2 written — Clean 0 / Caution 0 / Avoid 2.
// NEW 1 / REUSE 1. Written-row ungraded tokens: 0.

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
const D12_SET = '1a669f3c-36a6-439e-843d-47638fa217e8';
const CITRUS_FORMULA = 'alavert-b159-citrus-odt';
const D12_FORMULA = 'alavert-b160-d12';

const METH = {
  aspartame: 'Methodology §5 High (aspartame). Avoid.',
  ps80: 'Methodology §5 Limited (Polysorbate 80 — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
  flavors: 'Methodology §5 Caution (bare flavors). Exact “Natural flavors” stays Limited. Not the Avoid driver.',
  mannitol: 'Methodology §5 Limited (mannitol).',
  citric: 'Methodology §5 Cleared (anhydrous citric acid → citric acid).',
  pullulan: 'Methodology §5 Cleared (pullulan → organic pullulan, HPMC-family polymer).',
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
  ink: 'Methodology §5 Caution (pharmaceutical ink). Sept 24 lock. Not the Avoid driver.',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium, MCC / cellulose-family disintegrant).',
  phosphate: 'Methodology §5 Cleared (dibasic calcium phosphate → calcium phosphate).',
  hpmc: 'Methodology §5 Cleared (hypromellose, HPMC family).',
  lactose: 'Methodology §5 Cleared (lactose monohydrate → lactose).',
  stearate: 'Methodology §5 Cleared (magnesium stearate).',
  povidone: 'Methodology §5 Cleared (povidone).',
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

export const BATCH160_KYR6B_ALAVERT: RatingRecord[] = [
  {
    id: 'alavert-b160-citrus-60',
    productName: 'Alavert Allergy Citrus Burst (60 orally disintegrating tablets)',
    brand: 'Alavert',
    category: ALLERGIES,
    barcode: '850024429062',
    formulaId: CITRUS_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'orally disintegrating tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Loratadine', strength: '10 mg' }],
    inactiveIngredients: [
      flag('Aspartame', 'high', cite(CITRUS_SET, METH.aspartame)),
      flag('Polysorbate 80', 'limited', cite(CITRUS_SET, METH.ps80)),
      flag('Flavors', 'moderate', cite(CITRUS_SET, METH.flavors)),
      flag('Mannitol', 'moderate', cite(CITRUS_SET, METH.mannitol)),
      cleared(CITRUS_SET, 'Anhydrous citric acid', METH.citric),
      cleared(CITRUS_SET, 'Pullulan', METH.pullulan),
    ],
    verdict: 'avoid',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 1704474a-9b99-de45-e063-6294a90ac59b (Foundation Consumer Healthcare). Active: loratadine 10 mg. Inactive ingredients: anhydrous citric acid, aspartame, flavors, mannitol, polysorbate 80, pullulan. Package NDC 69536-195-60 is 60 orally disintegrating tablets. The same inactive line is on the opened Target 60-count drug facts (TCIN 1012236079), including phenylalanine 0.56 mg per tablet. Target primary barcode 850024429062 is this 60-count. The Add to cart button on that Target HTML was disabled. Wiser Merchant product 22916 opened as Alavert Allergy Orally Disintegrating Tablets Citrus Burst - 60 Ct, UPC 850024429062, $30.15, purchasable, 30 on hand. Instacart Stop & Shop opened the 60 ct as out of stock. Not a 2-pack.',
    ],
  },
  {
    id: 'alavert-b160-d12-12',
    productName: 'Alavert D-12 Hour Allergy & Congestion (12 extended-release tablets)',
    brand: 'Alavert',
    category: ALLERGIES,
    formulaId: D12_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'extended-release tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Loratadine', strength: '5 mg' },
      { name: 'Pseudoephedrine sulfate', strength: '120 mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', cite(D12_SET, METH.tio2)),
      flag('Pharmaceutical ink', 'moderate', cite(D12_SET, METH.ink)),
      cleared(D12_SET, 'Croscarmellose sodium', METH.croscarmellose),
      cleared(D12_SET, 'Dibasic calcium phosphate', METH.phosphate),
      cleared(D12_SET, 'Hypromellose', METH.hpmc),
      cleared(D12_SET, 'Lactose monohydrate', METH.lactose),
      cleared(D12_SET, 'Magnesium stearate', METH.stearate),
      cleared(D12_SET, 'Povidone', METH.povidone),
    ],
    verdict: 'avoid',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 1a669f3c-36a6-439e-843d-47638fa217e8. Actives: loratadine 5 mg and pseudoephedrine sulfate 120 mg. Inactive ingredients: croscarmellose sodium, dibasic calcium phosphate, hypromellose, lactose monohydrate, magnesium stearate, pharmaceutical ink, povidone, titanium dioxide. Package NDC 80070-100-12 is 12 tablets (2 blisters of 6). USA Central Wholesale opened Alavert D 12 Hour Allergy & Sinus Extended Release Tablets - 12 TB as In Stock, with Add to cart and a schema price of $7.66. SKU MCNAN60127N00. That page lists the same inactive line. It does not print a barcode. The brand D-12 page count tab is 24 ct and says the product is not sold online. That 24-count GTIN was not copied onto this 12-count.',
    ],
  },
];

const ROWS = BATCH160_KYR6B_ALAVERT;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch160 row count ${ROWS.length}`);
const citrus = ROWS[0];
const d12 = ROWS[1];
if (citrus.id !== 'alavert-b160-citrus-60' || d12.id !== 'alavert-b160-d12-12') {
  throw new Error('batch160 ids');
}
if (citrus.barcode !== '850024429062' || !upcOk(citrus.barcode ?? '')) throw new Error('batch160 citrus upc');
if (d12.barcode !== undefined) throw new Error('batch160 d12 upc');
if (citrus.formulaId !== CITRUS_FORMULA || d12.formulaId !== D12_FORMULA) throw new Error('batch160 formula');
if (citrus.minAge !== 6 || d12.minAge !== 12 || citrus.audience !== 'adult' || d12.audience !== 'adult') {
  throw new Error('batch160 age');
}
if (citrus.inactiveIngredients.length !== 6 || d12.inactiveIngredients.length !== 8) {
  throw new Error('batch160 panel');
}
if (citrus.inactiveIngredients.filter((item) => item.riskLevel === 'high').length !== 1) {
  throw new Error('batch160 citrus high');
}
if (d12.inactiveIngredients.filter((item) => item.riskLevel === 'high').length !== 1) {
  throw new Error('batch160 d12 high');
}
