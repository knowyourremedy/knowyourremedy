// DRAFT / not verified / batch 278 KYR6-d (t42u Spring Valley holds unlocked by the new tokens).
// House brand sold only through Walmart. The Walmart panel image is the single source (t41u).
// Not in this file:
// - Extra Strength Vitamin B12 cherry 5,000 mcg fast-dissolve. Count not known. Held.
// - Vitamin D3 5,000 IU value-size softgels. Count not on the panel. Held.
// Panel-unreadable, page-conflict, and not-for-sale packs are closed in PROJECT_NOTES. No rows.

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
  dextrose:
    'Methodology §5 Caution (dextrose — glucose / dextrose sweetener). Does not count toward the t137u stack.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  celluloseGum: 'Methodology §5 Cleared (cellulose gum — cellulose family).',
  crospovidone: 'Methodology §5 Cleared (crospovidone — povidone disintegrant).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent). Counts toward the t137u stack.',
  artificialFlavor:
    'Methodology §5 Limited (Artificial Flavor — singular; founder lock t42u. The same substance as the plural Artificial flavors lock. Counts toward the t137u stack).',
  beet:
    'Methodology §5 Cleared (Beet Root Extract — founder lock t42u. Named plant color. Not a synthetic dye).',
  glycerylBehenate: 'Methodology §5 Cleared (glyceryl behenate — glyceryl dibehenate tablet lubricant).',
  gumArabic: 'Methodology §5 Cleared (gum arabic / gum acacia).',
  menthol:
    'Methodology §5 Limited (Menthol in a fast-dissolve tablet — founder lock t42u. Counts toward the t137u stack).',
  naturalMenthol:
    'Methodology §5 Limited (Natural Menthol — founder lock t42u. The same grade as Menthol in a fast-dissolve tablet. Counts toward the t137u stack).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  sucralose:
    'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  sucroseEstersFa:
    'Methodology §5 Caution (Sucrose Esters of Fatty Acids — sucrose fatty acid esters). Does not count toward the t137u stack.',
  sucroseEsters:
    'Methodology §5 Caution (Sucrose Esters — founder lock t42u. The same substance as sucrose fatty acid esters. Not Cleared sucrose. Does not count toward the t137u stack).',
  glucose:
    'Methodology §5 Caution (glucose — bare glucose sweetener). Does not count toward the t137u stack.',
  croscarmellose:
    'Methodology §5 Cleared (croscarmellose sodium — cellulose disintegrant; t83u).',
  artificialStrawberry:
    'Methodology §5 Caution (Artificial Strawberry Flavor — named artificial fruit flavor). Not the exact Artificial Flavor lock. Does not count toward the t137u stack.',
  ricePowder: 'Methodology §5 Cleared (Rice Powder — founder lock t132u).',
  vegCapsule:
    'Methodology §5 Cleared (Vegetarian Capsule — t130u unnamed rule. Named hypromellose, pullulan, and tapioca shells are Cleared, so the unnamed shell is Cleared).',
  riceExtract:
    'Methodology §5 Limited (rice extract blend — unspecified rice extract). Counts toward the t137u stack.',
  riceFiber:
    'Methodology §5 Cleared (Rice Fiber — founder lock t42u. The same grade as Organic Rice Fiber on the Cleared rice-hull family).',
  soybeanFill:
    'Methodology §5 Cleared (Soybean Oil (Highly Refined) as softgel fill — not the gummy seed-oil High).',
  gelatin: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  water: 'Methodology §5 Cleared (purified water).',
  garlicOil:
    'Methodology §5 Caution (Garlic Oil Extract — founder lock t42u. Named garlic oil as an inactive. Not the Supplement Facts garlic extract. Does not count toward the t137u stack).',
  cellulose: 'Methodology §5 Cleared (cellulose — cellulose family).',
  methacrylic:
    'Methodology §5 Caution (methacrylic acid copolymer — enteric coating polymer). Does not count toward the t137u stack.',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  triacetin: 'Methodology §5 Cleared (triacetin).',
  tio2: 'Methodology §5 High (titanium dioxide (color)).',
  mannitol:
    'Methodology §5 Caution (mannitol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  modifiedCelluloseGum:
    'Methodology §5 Caution (Modified Cellulose Gum — founder lock t42u. Not Cleared cellulose gum. Not Limited unlabeled modified cellulose. Does not count toward the t137u stack).',
  yellowOchre:
    'Methodology §5 Caution (Yellow Ochre — founder lock t42u. Mineral color. Not iron oxide ochre. Does not count toward the t137u stack).',
  riceBranPowder:
    'Methodology §5 Cleared (Rice Bran Powder — founder lock t42u. Not rice bran oil. Not the exact rice bran token).',
  riceHulls: 'Methodology §5 Cleared (organic rice hulls — rice-hull family; t120u).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const P10 =
  'Walmart panel image. Serving 1 tablet. The index title is 120 tablets. Melatonin is the active and is not graded. A second page ingredients list differs from the panel. The panel was graded. t42u house-brand single source.';
const P3 =
  'Walmart panel image. Serving 1 tablet. The index title is 120 tablets. Melatonin is the active and is not graded. t42u house-brand single source.';
const P12 =
  'Walmart panel image. Serving 1 tablet. The bottle is 60 vegetarian tablets. Melatonin is the active and is not graded. t42u house-brand single source.';
const PNAC =
  'Walmart panel image. Serving 2 capsules, 50 servings. The bottle is 100 vegetarian capsules. NAC, selenium, and molybdenum are the actives and are not graded. Page Inactive says N/A. The page ingredients list matches the panel. t42u house-brand single source.';
const PQUE =
  'Walmart panel image. Serving 1 capsule, 60 servings. The bottle is 60 vegetarian capsules. Quercetin and zinc oxide are the actives and are not graded. The page spells Zink. The panel was graded. Page Inactive says N/A. t42u house-brand single source.';
const PGAR =
  'Walmart panel image. Serving 1 softgel. Servings per container are not on the panel. The bottle is 120 softgels. The facts garlic extract is the active and is not graded. Page text adds silicon dioxide and garlic oil concentrate. Those lines were not graded. t42u house-brand single source.';
const PSAME =
  'Walmart panel image. Low resolution and legible. Serving 1 caplet. The front shows 40 enteric-coated caplets. S-adenosylmethionine tosylate disulfate is the active and is not graded. The enteric coating parenthesis was split so each named part is graded. Page text adds hydroxypropyl methylcellulose phthalate. That line was not graded. t42u house-brand single source.';
const PTEA =
  'Walmart panel image. Serving 1 capsule. The count is not on any image. The opened listing title is 60 capsules and matches the index, so the row uses that listing count. Green tea extract is the active and is not graded. Page inactive text differs from the panel. The panel was graded. t42u house-brand single source.';

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

export const BATCH278_KYR6D_T42U_SV: RatingRecord[] = [
  row({
    id: 'springvalley-b278-melatonin-fd-10-120',
    productName: 'Spring Valley Fast-Dissolve Melatonin 10 mg (120 tablets)',
    category: 'Sleep',
    formulaId: 'springvalley-b278-melatonin-fd-10-120',
    form: 'tablet',
    activeIngredients: [{ name: 'Melatonin', strength: '10 mg per tablet' }],
    inactiveIngredients: [
      flag(P10, 'Dextrose', 'moderate', 'dextrose'),
      flag(P10, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P10, 'Cellulose Gum', 'cleared', 'celluloseGum'),
      flag(P10, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P10, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P10, 'Artificial Flavor', 'limited', 'artificialFlavor'),
      flag(P10, 'Beet Root Extract (Color)', 'cleared', 'beet'),
      flag(P10, 'Glyceryl Behenate', 'cleared', 'glycerylBehenate'),
      flag(P10, 'Gum Arabic', 'cleared', 'gumArabic'),
      flag(P10, 'Menthol', 'limited', 'menthol'),
      flag(P10, 'Silicon Dioxide', 'limited', 'silica'),
      flag(P10, 'Sucralose', 'limited', 'sucralose'),
      flag(P10, 'Sucrose Esters of Fatty Acids', 'moderate', 'sucroseEstersFa'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't42u. Walmart panel image is the single source. Fast-dissolve tablets. The index title is 120 tablets. Avoid from four Limited tokens. Dextrose is Caution and does not stack. Sucrose esters of fatty acids are Caution and do not stack. Silicon dioxide is the 0-pt cap. Beet root extract (color) is Cleared. A second page ingredients list differs from the panel and was not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b278-melatonin-fd-3-120',
    productName: 'Spring Valley Fast-Dissolve Melatonin 3 mg (120 tablets)',
    category: 'Sleep',
    formulaId: 'springvalley-b278-melatonin-fd-3-120',
    form: 'tablet',
    activeIngredients: [{ name: 'Melatonin', strength: '3 mg per tablet' }],
    inactiveIngredients: [
      flag(P3, 'Dextrose', 'moderate', 'dextrose'),
      flag(P3, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P3, 'Cellulose Gum', 'cleared', 'celluloseGum'),
      flag(P3, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P3, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P3, 'Artificial Flavor', 'limited', 'artificialFlavor'),
      flag(P3, 'Beet Root Extract (Color)', 'cleared', 'beet'),
      flag(P3, 'Menthol', 'limited', 'menthol'),
      flag(P3, 'Glyceryl Behenate', 'cleared', 'glycerylBehenate'),
      flag(P3, 'Gum Arabic', 'cleared', 'gumArabic'),
      flag(P3, 'Silicon Dioxide', 'limited', 'silica'),
      flag(P3, 'Sucrose Esters of Fatty Acids', 'moderate', 'sucroseEstersFa'),
      flag(P3, 'Sucralose', 'limited', 'sucralose'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't42u. Walmart panel image is the single source. Fast-dissolve tablets. The index title is 120 tablets. Not the 10 mg. Avoid from four Limited tokens. Dextrose is Caution and does not stack. Sucrose esters of fatty acids are Caution and do not stack. Silicon dioxide is the 0-pt cap. Beet root extract (color) is Cleared. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b278-melatonin-fd-12-60',
    productName: 'Spring Valley Melatonin Fast-Dissolve 12 mg (60 tablets)',
    category: 'Sleep',
    formulaId: 'springvalley-b278-melatonin-fd-12-60',
    form: 'tablet',
    activeIngredients: [{ name: 'Melatonin', strength: '12 mg per tablet' }],
    inactiveIngredients: [
      flag(P12, 'Glucose', 'moderate', 'glucose'),
      flag(P12, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P12, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P12, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P12, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P12, 'Glyceryl Behenate', 'cleared', 'glycerylBehenate'),
      flag(P12, 'Artificial Strawberry Flavor', 'moderate', 'artificialStrawberry'),
      flag(P12, 'Beet Root Extract', 'cleared', 'beet'),
      flag(P12, 'Gum Acacia', 'cleared', 'gumArabic'),
      flag(P12, 'Natural Menthol', 'limited', 'naturalMenthol'),
      flag(P12, 'Silica', 'limited', 'silica'),
      flag(P12, 'Sucralose', 'limited', 'sucralose'),
      flag(P12, 'Sucrose Esters', 'moderate', 'sucroseEsters'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't42u. Walmart panel image is the single source. Fast-dissolve vegetarian tablets. The front shows 60 tablets. Avoid from three Limited tokens. Artificial strawberry flavor is the named fruit flavor and does not stack. Sucrose esters are Caution and do not stack. Glucose is Caution and does not stack. Beet root extract is Cleared. Silica is the 0-pt cap. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b278-nac-1000-100',
    productName: 'Spring Valley NAC 1,000 mg (100 capsules)',
    category: 'Immune Support',
    formulaId: 'springvalley-b278-nac-1000-100',
    form: 'capsule',
    activeIngredients: [
      { name: 'N-Acetyl Cysteine', strength: '1,000 mg per 2 capsules' },
      { name: 'Selenium', strength: '50 mcg per 2 capsules' },
      { name: 'Molybdenum', strength: '100 mcg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag(PNAC, 'Rice Powder', 'cleared', 'ricePowder'),
      flag(PNAC, 'Vegetarian Capsule', 'cleared', 'vegCapsule'),
      flag(PNAC, 'Rice Extract Blend', 'limited', 'riceExtract'),
      flag(PNAC, 'Rice Fiber', 'cleared', 'riceFiber'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't42u. Walmart panel image is the single source. 50 servings of 2 capsules. The bottle is 100 vegetarian capsules. Counted Limited token: rice extract blend. Rice fiber is Cleared, the same grade as organic rice fiber. Rice powder is Cleared. The unnamed vegetarian capsule is Cleared under the t130u rule. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b278-quercetin-zinc-60',
    productName: 'Spring Valley Quercetin 500 mg with Zinc (60 capsules)',
    category: 'Immune Support',
    formulaId: 'springvalley-b278-quercetin-zinc-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Quercetin', strength: '500 mg per capsule' },
      { name: 'Zinc (as zinc oxide)', strength: '50 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(PQUE, 'Vegetarian Capsule', 'cleared', 'vegCapsule'),
      flag(PQUE, 'Rice Extract Blend', 'limited', 'riceExtract'),
      flag(PQUE, 'Rice Powder', 'cleared', 'ricePowder'),
      flag(PQUE, 'Rice Fiber', 'cleared', 'riceFiber'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't42u. Walmart panel image is the single source. Serving 1 capsule. The bottle is 60 vegetarian capsules. Counted Limited token: rice extract blend. Rice fiber is Cleared, the same grade as organic rice fiber. Rice powder is Cleared. The unnamed vegetarian capsule is Cleared under the t130u rule. No honest note. The page spells Zink. The panel was graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b278-garlic-1000-120',
    productName: 'Spring Valley Odor-Controlled Garlic 1,000 mg (120 softgels)',
    category: 'Herbs',
    formulaId: 'springvalley-b278-garlic-1000-120',
    form: 'softgel',
    activeIngredients: [
      { name: 'Odor Controlled Garlic (bulb) 100:1 extract', strength: '10 mg per softgel' },
    ],
    inactiveIngredients: [
      flag(PGAR, 'Soybean Oil (Highly Refined)', 'cleared', 'soybeanFill'),
      flag(PGAR, 'Gelatin', 'cleared', 'gelatin'),
      flag(PGAR, 'Glycerin', 'cleared', 'glycerin'),
      flag(PGAR, 'Purified Water USP', 'cleared', 'water'),
      flag(PGAR, 'Garlic Oil Extract', 'moderate', 'garlicOil'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't42u. Walmart panel image is the single source. Serving 1 softgel. The bottle is 120 softgels. Caution from garlic oil extract. Counted Limited tokens: none. Soybean oil is Cleared softgel fill, and that form is the honest note. Gelatin, glycerin, and water are Cleared. The facts garlic extract is the active. Page text adds silicon dioxide and garlic oil concentrate. Those lines were not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b278-same-400-40',
    productName: 'Spring Valley SAMe 400 mg (40 caplets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b278-same-400-40',
    form: 'tablet',
    activeIngredients: [{ name: 'S-Adenosylmethionine', strength: '400 mg per caplet' }],
    inactiveIngredients: [
      flag(PSAME, 'Cellulose', 'cleared', 'cellulose'),
      flag(PSAME, 'Methacrylic Acid Copolymer', 'moderate', 'methacrylic'),
      flag(PSAME, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PSAME, 'Triacetin', 'cleared', 'triacetin'),
      flag(PSAME, 'Titanium Dioxide', 'high', 'tio2'),
      flag(PSAME, 'Mannitol', 'moderate', 'mannitol'),
      flag(PSAME, 'Citric Acid', 'cleared', 'citric'),
      flag(PSAME, 'Stearic Acid', 'cleared', 'stearic'),
      flag(PSAME, 'Silica', 'limited', 'silica'),
      flag(PSAME, 'Sodium Starch Glycolate', 'cleared', 'ssg'),
      flag(PSAME, 'Modified Cellulose Gum', 'moderate', 'modifiedCelluloseGum'),
      flag(PSAME, 'Yellow Ochre', 'moderate', 'yellowOchre'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't42u. Walmart panel image is the single source. The panel is low resolution and legible. Serving 1 caplet. The front shows 40 enteric-coated caplets. Avoid from titanium dioxide inside the enteric coating. Counted Limited tokens: none. Yellow ochre and modified cellulose gum are Caution and do not stack. Mannitol is Caution and does not stack. Methacrylic acid copolymer is Caution and does not stack. Silica is the 0-pt cap. No honest note. Page text adds hydroxypropyl methylcellulose phthalate. That line was not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b278-green-tea-500-60',
    productName: 'Spring Valley Green Tea Extract 500 mg (60 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b278-green-tea-500-60',
    form: 'capsule',
    activeIngredients: [{ name: 'Green Tea Extract (leaf)', strength: '500 mg per capsule' }],
    inactiveIngredients: [
      flag(PTEA, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PTEA, 'Rice Bran Powder', 'cleared', 'riceBranPowder'),
      flag(PTEA, 'Organic Rice Hulls', 'cleared', 'riceHulls'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't42u. Walmart panel image is the single source. Serving 1 capsule. The count is not on any image. The opened listing title is 60 capsules and matches the index, so the row uses that listing count. Clean. Counted Limited tokens: none. Rice bran powder is Cleared. Organic rice hulls are Cleared, and that named form is the honest note. Hydroxypropyl methylcellulose is the capsule. Page inactive text differs from the panel and was not graded. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH278_KYR6D_T42U_SV;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; counted: string }> = {
  'springvalley-b278-melatonin-fd-10-120': {
    verdict: 'avoid',
    counted: 'Maltodextrin|Artificial Flavor|Menthol|Sucralose',
  },
  'springvalley-b278-melatonin-fd-3-120': {
    verdict: 'avoid',
    counted: 'Maltodextrin|Artificial Flavor|Menthol|Sucralose',
  },
  'springvalley-b278-melatonin-fd-12-60': {
    verdict: 'avoid',
    counted: 'Maltodextrin|Natural Menthol|Sucralose',
  },
  'springvalley-b278-nac-1000-100': { verdict: 'caution', counted: 'Rice Extract Blend' },
  'springvalley-b278-quercetin-zinc-60': { verdict: 'caution', counted: 'Rice Extract Blend' },
  'springvalley-b278-garlic-1000-120': { verdict: 'caution', counted: '' },
  'springvalley-b278-same-400-40': { verdict: 'avoid', counted: '' },
  'springvalley-b278-green-tea-500-60': { verdict: 'clean', counted: '' },
};

const NOTE_IDS = new Set([
  'springvalley-b278-melatonin-fd-10-120',
  'springvalley-b278-melatonin-fd-3-120',
  'springvalley-b278-melatonin-fd-12-60',
  'springvalley-b278-garlic-1000-120',
  'springvalley-b278-green-tea-500-60',
]);

if (ROWS.length !== 8) throw new Error(`batch278 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch278 unexpected id ${record.id}`);
  if (record.brand !== BRAND) throw new Error(`batch278 brand ${record.id}`);
  if ((record.barcode ?? '') !== '') throw new Error(`batch278 upc ${record.id}`);
  if (record.audience !== 'adult' || record.minAge !== 18) {
    throw new Error(`batch278 adult ${record.id}`);
  }
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || record.verdict !== expected.verdict) {
    throw new Error(`batch278 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch278 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch278 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch278 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  if (stackNote && rollup.cause !== 'limited_stack') {
    throw new Error(`batch278 stack note without stack cause ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch278 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch278 pending ${ingredient.name}`);
    }
  }
}
