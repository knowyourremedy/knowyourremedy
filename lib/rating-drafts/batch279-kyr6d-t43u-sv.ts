// DRAFT / not verified / batch 279 KYR6-d (t43u Spring Valley holds).
// House brand sold only through Walmart. The Walmart panel image is the single source.
// Extra Strength B12 cherry 5,000 mcg fast-dissolve, item 787374421, 300 tablets.
// Extra Strength D3 5,000 IU value size, item 302287205, 400 softgels.
// Cyanocobalamin in the B12 under-2% line is the vitamin B12 active and is not graded.
// Not springvalley-b272-b12-fastdissolve-5000-45 (Mixed Berry, 45 tablets).
// Not springvalley-b272-d3-5000-100 and not springvalley-b236-d3-5000iu-250.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';

const METH = {
  mannitol:
    'Methodology §5 Caution (mannitol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  crospovidone: 'Methodology §5 Cleared (crospovidone — povidone family).',
  hvo:
    'Methodology §5 High (hydrogenated vegetable oil, including hydrogenated vegetable oil (cottonseed) — Oct 15, 2026). The panel says hydrogenated. It does not say partial or fully.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  namedFruitFlavor:
    'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u). Not the Limited natural flavors mixture.',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  sucralose:
    'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  soybeanSoftgel:
    'Methodology §5 Cleared (soybean oil as softgel fill — non-gummy fill Cleared; gummy / lozenge soybean oil stays High).',
  gelatin: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  cornSoftgel:
    'Methodology §5 Cleared (corn oil as softgel fill — non-gummy fill Cleared; gummy corn oil stays High).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PB12 =
  'Walmart panel image. Item 787374421. Serving 1 tablet. The bottle is 300 tablets. Vitamin B12 is the active and is not graded. Cyanocobalamin in the under-2% line is that active. t43u house-brand single source.';
const PD3 =
  'Walmart panel image. Item 302287205. Serving 1 softgel. The bottle is 400 softgels. The page Ingredients tab says Glycerin. The panel says Vegetable Glycerin. The panel was graded. Vitamin D is the active and is not graded. t43u house-brand single source.';

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
  },
): RatingRecord {
  const audience = partial.audience ?? ADULT;
  const minAge = partial.minAge ?? (audience === 'kids' ? undefined : 18);
  const next: RatingRecord = {
    ...partial,
    brand: BRAND,
    audience,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Walmart'],
    barcode: partial.barcode ?? '',
  };
  if (minAge === undefined) delete next.minAge;
  else next.minAge = minAge;
  return finish(next);
}

export const BATCH279_KYR6D_T43U_SV: RatingRecord[] = [
  row({
    id: 'springvalley-b279-b12-cherry-5000-300',
    productName: 'Spring Valley Extra Strength Vitamin B12 5,000 mcg Fast-Dissolve, Cherry (300 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b279-b12-cherry-5000-300',
    form: 'tablet',
    activeIngredients: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '5,000 mcg per tablet' }],
    inactiveIngredients: [
      flag(PB12, 'Mannitol', 'moderate', 'mannitol'),
      flag(PB12, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PB12, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(PB12, 'Hydrogenated Vegetable Oil', 'high', 'hvo'),
      flag(PB12, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PB12, 'Natural Cherry Flavor', 'cleared', 'namedFruitFlavor'),
      flag(PB12, 'Stearic Acid', 'cleared', 'stearic'),
      flag(PB12, 'Sucralose', 'limited', 'sucralose'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't43u. Walmart panel image is the single source. Item 787374421 is in stock. Serving 1 tablet. Count 300 is on the title, the specifications, and the bottle image. No 60-count page exists for this cherry 5,000 mcg fast-dissolve. Not springvalley-b272-b12-fastdissolve-5000-45 (Mixed Berry, 45 tablets). Cyanocobalamin in the under-2% line is the vitamin B12 active and is not graded. Avoid from hydrogenated vegetable oil. Counted Limited token: sucralose. That is one, so this is not a 3+ stack. Mannitol is Caution and does not stack. Natural cherry flavor is the named fruit flavor and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b279-d3-5000-400',
    productName: 'Spring Valley Extra Strength Vitamin D3, 5,000 IU (400 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b279-d3-5000-400',
    form: 'softgel',
    activeIngredients: [{ name: 'Vitamin D (as D3 cholecalciferol)', strength: '125 mcg (5,000 IU) per softgel' }],
    inactiveIngredients: [
      flag(PD3, 'Soybean Oil', 'cleared', 'soybeanSoftgel'),
      flag(PD3, 'Gelatin', 'cleared', 'gelatin'),
      flag(PD3, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(PD3, 'Corn Oil', 'cleared', 'cornSoftgel'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't43u. Walmart panel image is the single source. Item 302287205 is in stock. Serving 1 softgel. Count 400 is on the title, the specifications, and the bottle image. Not springvalley-b272-d3-5000-100 and not springvalley-b236-d3-5000iu-250. Vitamin D is the active and is not graded. The page Ingredients tab says Glycerin. The panel says Vegetable Glycerin. The panel was graded. Soybean oil and corn oil are Cleared softgel fill, and that form is the honest note. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH279_KYR6D_T43U_SV;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string }> = {
  'springvalley-b279-b12-cherry-5000-300': { verdict: 'avoid', cause: 'high', counted: 'Sucralose' },
  'springvalley-b279-d3-5000-400': { verdict: 'clean', cause: 'clean', counted: '' },
};

const NOTE_IDS = new Set(['springvalley-b279-d3-5000-400']);

if (ROWS.length !== 2) throw new Error(`batch279 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch279 unexpected id ${record.id}`);
  if (record.brand !== BRAND) throw new Error(`batch279 brand ${record.id}`);
  if ((record.barcode ?? '') !== '') throw new Error(`batch279 upc ${record.id}`);
  if (record.audience !== 'adult' || record.minAge !== 18) {
    throw new Error(`batch279 adult ${record.id}`);
  }
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (
    rollup.verdict !== expected.verdict ||
    rollup.cause !== expected.cause ||
    record.verdict !== expected.verdict
  ) {
    throw new Error(`batch279 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch279 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch279 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch279 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  if (stackNote && rollup.cause !== 'limited_stack') {
    throw new Error(`batch279 stack note without stack cause ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch279 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch279 pending ${ingredient.name}`);
    }
  }
}
