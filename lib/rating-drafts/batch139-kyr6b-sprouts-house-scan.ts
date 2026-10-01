// DRAFT / not verified / batch 139 KYR6-b Sprouts house scan.
// Founder override for this batch only: the Sprouts-house stash is open.
// A Search row is added only when that exact pack has both a real
// other-ingredients panel and a 12-digit UPC. batch70–138 were not edited.
// Already-on-MAIN Sprouts rows were not rewritten.
//
// TALLY: 4 written — Clean 2 / Caution 2 / Avoid 0.
// NEW 4 / REUSE 0.
// Held, no row: grain alcohol (Garlic 1 fl oz, Parasite Cleanse 1 fl oz, Detox 1 fl oz).
// Held, no row: Chlorophyll Glycerite — deionized water is still unstamped.

import type { CleanAlternative, IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';
const RETAILERS = ['Sprouts'] as const;

const METH = {
  riceFlour: 'Methodology §5 Caution (rice flour). Distinct from Cleared rice hull / rice bran. Not Avoid.',
  sio2: 'Methodology §5 Caution (silicon dioxide, 0-point nanoparticle cap). Not Avoid.',
  vegCell:
    'Methodology §5 Cleared (Vegetable Cellulose Capsule / capsule cellulose).',
  pullulan: 'Methodology §5 Cleared (organic pullulan, HPMC-family vegan cap).',
  cleared: 'Methodology §5 Cleared.',
} as const;

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cleared(name: string, source: string): IngredientFlag {
  return flag(name, 'cleared', source);
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const CLEAN_PEER = alt(
  'sprouts-inflacalm-powder-cap',
  'Independently Clean Sprouts Inflacalm Powder Cap already on main (modified vegetable cellulose). Form: capsule — labeled, not a hard filter (§6).',
);
const CLEAN_SLEEP = alt(
  'sprouts-sleep-powder-cap',
  'Independently Clean Sprouts Sleep Powder Cap already on main (modified vegetable cellulose). Form: capsule — labeled, not a hard filter (§6).',
);

const SHOP = 'https://shop.sprouts.com/store/sprouts/products/';

function upcSource(slug: string, gtin14: string, upc: string): string {
  return `${SHOP}${slug} official UPC field ${gtin14} (GTIN-14 with two leading zeros). Check digit verified; UPC-A ${upc}. DailyMed spls.json returned no Sprouts SPL for this house supplement. Other ingredients are the opened gallery panel on that same PDP, not a sibling pack.`;
}

export const BATCH139_KYR6B_SPROUTS_HOUSE_SCAN: RatingRecord[] = [
  {
    id: 'sprouts-b139-nac-600-60',
    productName: 'Sprouts N-Acetyl Cysteine 600 mg (60 ct)',
    brand: 'Sprouts',
    category: VITAMINS,
    barcode: '646670671616',
    formulaId: 'sprouts-b139-nac-600',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'N-Acetyl Cysteine', strength: '600 mg' }],
    inactiveIngredients: [
      cleared('Vegetable cellulose (capsule)', METH.vegCell),
      flag('Rice flour', 'limited', METH.riceFlour),
      cleared('Magnesium stearate (vegetable source)', METH.cleared),
      flag('Silicon dioxide', 'limited', METH.sio2),
    ],
    verdict: 'caution',
    honestNote:
      'Caution. Rice flour is Caution and silicon dioxide is the 0-point nanoparticle Caution cap. Neither is an Avoid driver. Vegetable cellulose and magnesium stearate are Cleared. 60 capsules. Draft, not verified.',
    retailers: [...RETAILERS],
    cleanAlternatives: [CLEAN_PEER, CLEAN_SLEEP],
    sourcesGeneral: [
      upcSource(
        '17858823-sprouts-600-mg-n-acetylcysteine-60-ct',
        '00646670671616',
        '646670671616',
      ) +
        ' Gallery image 2 of 2 other ingredients: Vegetable Cellulose (capsule), Rice Flour, Magnesium Stearate (vegetable source), Silicon Dioxide.',
    ],
  },
  {
    id: 'sprouts-b139-mag-glycinate-400-90',
    productName: 'Sprouts Magnesium Glycinate 400 mg (90 ct)',
    brand: 'Sprouts',
    category: VITAMINS,
    barcode: '646670673368',
    formulaId: 'sprouts-b139-mag-glycinate-400',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Magnesium (as magnesium glycinate)', strength: '400 mg' },
    ],
    inactiveIngredients: [
      cleared('Microcrystalline cellulose', METH.cleared),
      cleared('Vegetable stearic acid', METH.cleared),
      cleared('Croscarmellose sodium', METH.cleared),
      cleared('Hypromellose', METH.cleared),
      cleared('Magnesium stearate', METH.cleared),
      cleared('Vegetable cellulose', METH.vegCell),
      cleared('Glycerin', METH.cleared),
      flag('Silicon dioxide', 'limited', METH.sio2),
    ],
    verdict: 'caution',
    honestNote:
      'Caution. Silicon dioxide is the 0-point nanoparticle Caution cap and is not an Avoid driver. The tablet core and the clear vegetable-cellulose / glycerin coat are Cleared. This 90 ct panel was not copied onto the 180 ct. Draft, not verified.',
    retailers: [...RETAILERS],
    cleanAlternatives: [CLEAN_PEER, CLEAN_SLEEP],
    sourcesGeneral: [
      upcSource(
        '17858965-sprouts-400-mg-magnesium-glycinate-90-ct',
        '00646670673368',
        '646670673368',
      ) +
        ' Gallery image 2 of 2 other ingredients: microcrystalline cellulose, vegetable stearic acid, croscarmellose sodium, hypromellose, magnesium stearate, vegetable cellulose, glycerin, and silicon dioxide.',
    ],
  },
  {
    id: 'sprouts-b139-neem-90',
    productName: 'Sprouts Neem Powder Cap (90 ct)',
    brand: 'Sprouts',
    category: VITAMINS,
    barcode: '646670621291',
    formulaId: 'sprouts-b139-neem',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Organic neem leaf', strength: '500 mg' }],
    inactiveIngredients: [cleared('Organic pullulan capsule', METH.pullulan)],
    verdict: 'clean',
    honestNote:
      'Clean. The only other ingredient is an organic pullulan capsule, the locked Cleared HPMC-family vegan cap. 90 capsules. Draft, not verified.',
    retailers: [...RETAILERS],
    cleanAlternatives: [CLEAN_PEER, CLEAN_SLEEP],
    sourcesGeneral: [
      upcSource(
        '17858591-sprouts-neem-powder-cap-90-ct',
        '00646670621291',
        '646670621291',
      ) +
        ' Gallery image 2 of 2 other ingredients: organic capsule (organic pullulan).',
    ],
  },
  {
    id: 'sprouts-b139-blood-sugar-harmony-90',
    productName: 'Sprouts Blood Sugar Harmony Powder Cap (90 ct)',
    brand: 'Sprouts',
    category: VITAMINS,
    barcode: '646670620164',
    formulaId: 'sprouts-b139-blood-sugar-harmony',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Organic blood sugar harmony herbal blend',
        strength: '500 mg',
      },
    ],
    inactiveIngredients: [cleared('Organic pullulan capsule', METH.pullulan)],
    verdict: 'clean',
    honestNote:
      'Clean. The only other ingredient is an organic pullulan capsule, the locked Cleared HPMC-family vegan cap. 90 capsules. Draft, not verified.',
    retailers: [...RETAILERS],
    cleanAlternatives: [CLEAN_PEER, CLEAN_SLEEP],
    sourcesGeneral: [
      upcSource(
        '17858451-sprouts-blood-sugar-harmony-powder-capsules-90-ct',
        '00646670620164',
        '646670620164',
      ) +
        ' Gallery image 2 of 2 other ingredients: organic capsule (organic pullulan).',
    ],
  },
];

function upcCheck(upc: string): boolean {
  if (!/^\d{12}$/.test(upc)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += Number(upc[i]) * (i % 2 === 0 ? 3 : 1);
  }
  return (10 - (sum % 10)) % 10 === Number(upc[11]);
}

const ROWS = BATCH139_KYR6B_SPROUTS_HOUSE_SCAN;
if (ROWS.length !== 4) throw new Error('batch139 row count');
if (new Set(ROWS.map((r) => r.id)).size !== 4) throw new Error('batch139 duplicate id');
if (new Set(ROWS.map((r) => r.barcode)).size !== 4) throw new Error('batch139 duplicate barcode');
if (ROWS.some((r) => !r.barcode || !upcCheck(r.barcode))) throw new Error('batch139 bad upc');
const ALREADY = new Set([
  '646670681882',
  '646670121401',
  '646670631405',
  '646670116513',
  '646670549199',
]);
if (ROWS.some((r) => r.barcode && ALREADY.has(r.barcode))) throw new Error('batch139 reused a held or existing upc');
if (ROWS.filter((r) => r.verdict === 'clean').length !== 2) throw new Error('batch139 clean count');
if (ROWS.filter((r) => r.verdict === 'caution').length !== 2) throw new Error('batch139 caution count');
if (ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients.some((i) => i.riskLevel !== 'cleared'))) {
  throw new Error('batch139 clean row has a flag');
}
if (ROWS.some((r) => r.verdict === 'caution' && r.inactiveIngredients.some((i) => i.riskLevel === 'high'))) {
  throw new Error('batch139 caution has High');
}
if (ROWS.some((r) => r.verdict === 'caution' && !r.inactiveIngredients.some((i) => i.riskLevel !== 'cleared'))) {
  throw new Error('batch139 caution with no flag');
}
if (ROWS.some((r) => !/\d/.test(r.productName) || !r.form)) throw new Error('batch139 missing count or form');
