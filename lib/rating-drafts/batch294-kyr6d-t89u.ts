// DRAFT / not verified / batch 294 KYR6-d (t89u).
// Founder overrides: the cough bag is the current US panel, the kApex government
// label is the other-ingredient line, and Blood Sugar Breakthrough V1 matches
// the written Berberine panel. Magnesium Breakthrough V4 30 is not in this file.
// No brand is closed. The Sprouts section is not edited.
// t89u requires a full honest note on every row.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const S = {
  flavor:
    'Methodology §5 Limited (t54u natural-flavor rule). Organic Flavor is the exact t54u name. Counts toward the t137u stack.',
  riceSyrup: 'Methodology §5 Cleared (rice syrup — Sept 14, 2026 food-state / starch family).',
  cane: 'Methodology §5 Caution (Organic cane syrup — t51u). Does not count toward the t137u stack.',
  honey: 'Methodology §5 Cleared (honey).',
  elmBark:
    'Methodology §5 Cleared (Organic Slippery Elm Bark Powder — t84u). Named plant-part powder. Does not count toward the t137u stack.',
  elm:
    'Methodology §5 Cleared (Organic Slippery Elm Powder — t84u). Named plant-part powder. Does not count toward the t137u stack.',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — Oct 15, 2026).',
  riceExtract:
    'Methodology §5 Limited (unspecified rice extract — hull, bran, or concentrate not named). Counts toward the t137u stack.',
  cellulose: 'Methodology §5 Cleared (cellulose / cellulose family).',
  water: 'Methodology §5 Cleared (water / purified water).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  riceFiber:
    'Methodology §5 Cleared (rice fiber — t42u; same grade as Organic Rice Fiber; rice-hull family).',
  riceBlend:
    'Methodology §5 Limited (rice extract blend — unspecified rice extract). Counts toward the t137u stack. Not named rice hull, bran, or concentrate.',
} as const;

type MethKey = keyof typeof S;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${S[meth]}` };
}

function finish(record: RatingRecord): RatingRecord {
  if (record.honestNote) return record;
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  partial: Omit<RatingRecord, 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
    productType?: RatingRecord['productType'];
  },
): RatingRecord {
  return finish({
    ...partial,
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: partial.productType ?? 'Supplement',
    retailers: [partial.brand],
    barcode: partial.barcode ?? '',
  });
}

const PLEMON =
  'Quantum Health brand page and bag image. https://quantumhealth.com/products/usda-organic-cough-drops. Meyer Lemon and Honey Drug Facts. The founder confirmed this bag is the current US panel. Serving 1 lozenge. 18 lozenges. Menthol is the active and is not graded. t89u brand-page single source.';
const PCHERRY =
  'Quantum Health brand page and bag image. https://quantumhealth.com/products/usda-organic-cough-drops. Bing Cherry Drug Facts. The founder confirmed this bag is the current US panel. Serving 1 lozenge. 18 lozenges. Menthol is the active and is not graded. t89u brand-page single source.';
const PKAPEX =
  'NIH Dietary Supplement Label Database label 334467, the current on-market kApex label. Other ingredients: Rice Extract, Cellulose, Water. Serving 2 capsules. Servings per container 60. Ubiquinol is on the Supplement Facts and is not graded. t89u founder override. The government label is the panel.';
const PBLOOD =
  'NIH Dietary Supplement Label Database label 320981, Blood Sugar Breakthrough, 60 veggie caps. Other ingredients: Hypromellose, Rice Fiber, Rice Extract Blend. Serving 2 capsules. Servings per container 30. This is the same inactive line as the written Berberine Breakthrough 60. t89u founder override.';

const NOTE_LEMON =
  'Caution from one Limited token: organic flavor. That is one, so this is not a 3+ stack. Organic cane syrup is Caution and does not stack. Organic rice syrup, organic honey, and organic slippery elm bark powder are Cleared. The brand bag is the current US panel. DailyMed setid fe780067-5a20-4d55-a108-91237cd9e5f4 still lists organic brown rice syrup, natural Meyer lemon flavor and other natural flavors, and organic turmeric. That older listing was not graded.';
const NOTE_CHERRY =
  'Caution from one Limited token: organic flavor. That is one, so this is not a 3+ stack. Organic cane syrup is Caution and does not stack. Organic fruit and vegetable juice for color, organic rice syrup, organic honey, and organic slippery elm powder are Cleared. The brand bag is the current US panel.';
const NOTE_KAPEX =
  'Caution from one Limited token: rice extract. That is one, so this is not a 3+ stack. Cellulose and water are Cleared. The government label prints Ubiquinol (Coenzyme Q-10) 34 mg on the Supplement Facts. A brand shop ingredient list prints UbiQuinone. Those names differ. Ubiquinol is an active and is not graded. The other-ingredient line graded is the government label: Rice Extract, Cellulose, Water.';
const NOTE_BLOOD =
  'Caution from one Limited token: rice extract blend. That is one, so this is not a 3+ stack. Hypromellose and rice fiber are Cleared. This panel matches the written Berberine Breakthrough 60. Same formula. The V1 brand page itself has no facts image. The government label is the confirmed panel.';

const LEMON_FLAGS: IngredientFlag[] = [
  flag(PLEMON, 'Organic Flavor', 'limited', 'flavor'),
  flag(PLEMON, 'Organic Rice Syrup', 'cleared', 'riceSyrup'),
  flag(PLEMON, 'Organic Cane Syrup', 'moderate', 'cane'),
  flag(PLEMON, 'Organic Honey', 'cleared', 'honey'),
  flag(PLEMON, 'Organic Slippery Elm Bark Powder', 'cleared', 'elmBark'),
];

const CHERRY_FLAGS: IngredientFlag[] = [
  flag(PCHERRY, 'Organic Fruit and Vegetable Juice for color', 'cleared', 'juice'),
  flag(PCHERRY, 'Organic Flavor', 'limited', 'flavor'),
  flag(PCHERRY, 'Organic Rice Syrup', 'cleared', 'riceSyrup'),
  flag(PCHERRY, 'Organic Cane Syrup', 'moderate', 'cane'),
  flag(PCHERRY, 'Organic Honey', 'cleared', 'honey'),
  flag(PCHERRY, 'Organic Slippery Elm Powder', 'cleared', 'elm'),
];

const KAPEX_ACTIVE = [
  { name: 'Tri-Phase Protease (Endopeptidase, Exopeptidase)', strength: '477 mg' },
  { name: 'Lipa4 Lipase', strength: '70 mg' },
  { name: 'L-Carnitine, Powder', strength: '236 mg' },
  { name: 'InnoSlim', strength: '90 mg' },
  { name: 'AstraZyme proprietary blend of Enzymes', strength: '50 mg' },
  { name: 'Betaine HCl', strength: '41.2 mg' },
  { name: 'Dandelion, Powder', strength: '1.4 mg' },
  { name: 'Ubiquinol (Coenzyme Q-10)', strength: '34 mg' },
  { name: 'Trace Minerals', strength: '10.4 mg' },
];

const BLOOD_ACTIVE = [
  { name: 'Biotin', strength: '2 mg' },
  { name: 'Chromium (as chromium picolinate)', strength: '400 mcg' },
  {
    name: 'Proprietary Blend (CyanthOx 30 sea buckthorn fruit extract, Irvingia gabonensis, Naringin, Benfotiamine, R-Alpha Lipoic Acid, Banaba leaf extract, Gymnema sylvestre leaf extract, Fucoxanthin 10%)',
    strength: '638 mg',
  },
  { name: 'Bitter Melon Fruit Extract', strength: '200 mg' },
  { name: 'GlucoVantage Dihydroberberine', strength: '100 mg' },
  { name: 'Cinnulin PF Cinnamon bark extract', strength: '100 mg' },
  { name: 'InnoSlim', strength: '75 mg' },
];

export const BATCH294_KYR6D_T89U: RatingRecord[] = [
  row({
    id: 'quantum-b294-cough-lemon-18',
    productName: 'Quantum Health USDA Organic Cough Relief Drops Meyer Lemon and Honey (18 lozenges)',
    brand: 'Quantum Health',
    category: 'Cold & Flu',
    formulaId: 'quantum-b294-cough-lemon-18',
    form: 'lozenge',
    minAge: 3,
    productType: 'OTC',
    barcode: '046985211918',
    activeIngredients: [{ name: 'Organic Menthol', strength: '5 mg' }],
    inactiveIngredients: LEMON_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_LEMON,
    sourcesGeneral: [
      't89u. Quantum Health brand page is the single source. The founder confirmed the bag over the older DailyMed listing. https://quantumhealth.com/products/usda-organic-cough-drops lists Meyer Lemon at $5.39 and in stock. SKU F-BAGLZ/LEMON. The bag Drug Facts and the brand accordion print the same inactive line: Organic Flavor, Organic Rice Syrup, Organic Cane Syrup, Organic Honey, Organic Slippery Elm Bark Powder. Serving 1 lozenge. 18 lozenges. Adults and children 3 years and over. The printed barcode is 046985211918. The variant field is 00046985211918. The check digit passes. Counted Limited token: organic flavor. DailyMed setid fe780067-5a20-4d55-a108-91237cd9e5f4 was not graded.',
    ],
  }),
  row({
    id: 'quantum-b294-cough-cherry-18',
    productName: 'Quantum Health USDA Organic Cough Relief Drops Bing Cherry (18 lozenges)',
    brand: 'Quantum Health',
    category: 'Cold & Flu',
    formulaId: 'quantum-b294-cough-cherry-18',
    form: 'lozenge',
    minAge: 3,
    productType: 'OTC',
    barcode: '046985211901',
    activeIngredients: [{ name: 'Organic Menthol', strength: '5 mg' }],
    inactiveIngredients: CHERRY_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_CHERRY,
    sourcesGeneral: [
      't89u. Quantum Health brand page is the single source. The founder confirmed the bag. https://quantumhealth.com/products/usda-organic-cough-drops lists Bing Cherry at $5.39 and in stock. SKU F-BAGLZ/CHERY. The variant barcode field is empty. The bag Drug Facts prints Inactive Ingredients: Organic Fruit and Vegetable Juice for color, Organic Flavor, Organic Rice Syrup, Organic Cane Syrup, Organic Honey and Organic Slippery Elm Powder. The printed barcode on that bag is 046985211901. The check digit passes. Serving 1 lozenge. 18 lozenges. Adults and children 3 years and over. Counted Limited token: organic flavor. Not the lemon bag.',
    ],
  }),
  row({
    id: 'bioptimizers-b294-kapex-120',
    productName: 'BiOptimizers kApex (120 capsules)',
    brand: 'BiOptimizers',
    category: 'Digestive',
    formulaId: 'bioptimizers-b294-kapex-120',
    form: 'capsule',
    barcode: '689176916140',
    activeIngredients: KAPEX_ACTIVE,
    inactiveIngredients: [
      flag(PKAPEX, 'Rice Extract', 'limited', 'riceExtract'),
      flag(PKAPEX, 'Cellulose', 'cleared', 'cellulose'),
      flag(PKAPEX, 'Water', 'cleared', 'water'),
    ],
    verdict: 'caution',
    honestNote: NOTE_KAPEX,
    sourcesGeneral: [
      't89u. The founder named the government supplement label as the panel. NIH DSLD label 334467 is the current on-market kApex label, entered July 24, 2025. 120 veggie caps. Serving 2 capsules. Servings per container 60. Other ingredients: Rice Extract, Cellulose, Water. The Supplement Facts active is Ubiquinol (Coenzyme Q-10) 34 mg. A brand shop ingredient list prints UbiQuinone. Those names differ. Ubiquinol was not graded. https://bioptimizers.com/products/kapex lists 120 capsules at $74.99 and in stock. SKU 4202-KAPEXV3X. The variant barcode field is 0689176916140. UPC 689176916140. The check digit passes. The bottle image on that page is not a facts panel. Counted Limited token: rice extract. That is one, so this is not a 3+ stack.',
    ],
  }),
  row({
    id: 'bioptimizers-b294-blood-sugar-v1-60',
    productName: 'BiOptimizers Blood Sugar Breakthrough V1 (60 capsules)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b289-berberine-60',
    form: 'capsule',
    barcode: '723098109713',
    activeIngredients: BLOOD_ACTIVE,
    inactiveIngredients: [
      flag(PBLOOD, 'Hypromellose', 'cleared', 'hpmc'),
      flag(PBLOOD, 'Rice Fiber', 'cleared', 'riceFiber'),
      flag(PBLOOD, 'Rice Extract Blend', 'limited', 'riceBlend'),
    ],
    verdict: 'caution',
    honestNote: NOTE_BLOOD,
    sourcesGeneral: [
      't89u. The founder said to write this pack if the panel matches the written Berberine row. NIH DSLD label 320981 is the current on-market Blood Sugar Breakthrough label, 60 veggie caps, entered January 23, 2025. Serving 2 capsules. Servings per container 30. Other ingredients: Hypromellose, Rice Fiber, Rice Extract Blend. The actives match bioptimizers-b289-berberine-60. Same formula. Bar code 0 723098 109713. UPC 723098109713. The check digit passes. https://bioptimizers.com/products/blood-sugar-breakthrough-v1 lists 60 capsules at $75 and in stock. SKU 2685-BSUGBTV1. That page has no images and an empty barcode field. The UPC is the government label, not an invented code. Counted Limited token: rice extract blend. Not a second Berberine row.',
    ],
  }),
];

const ROWS = BATCH294_KYR6D_T89U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: string; barcode: string }> = {
  'quantum-b294-cough-lemon-18': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Organic Flavor',
    note: NOTE_LEMON,
    barcode: '046985211918',
  },
  'quantum-b294-cough-cherry-18': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Organic Flavor',
    note: NOTE_CHERRY,
    barcode: '046985211901',
  },
  'bioptimizers-b294-kapex-120': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Rice Extract',
    note: NOTE_KAPEX,
    barcode: '689176916140',
  },
  'bioptimizers-b294-blood-sugar-v1-60': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Rice Extract Blend',
    note: NOTE_BLOOD,
    barcode: '723098109713',
  },
};

if (ROWS.length !== 4) throw new Error(`batch294 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch294 unexpected id ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || mapped.verdict !== expected.verdict) {
    throw new Error(`batch294 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${mapped.verdict}`);
  }
  const counted = mapped.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch294 stack ${record.id} ${counted}`);
  if ((mapped.honestNote ?? '') !== expected.note) throw new Error(`batch294 note ${record.id} ${JSON.stringify(mapped.honestNote)}`);
  if ((mapped.barcode ?? '') !== expected.barcode) throw new Error(`batch294 upc ${record.id} ${mapped.barcode}`);
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  if (formNote && !expected.note.startsWith(formNote)) throw new Error(`batch294 form note ${record.id} ${formNote}`);
  if (stackNote && !expected.note.includes(stackNote)) throw new Error(`batch294 stack note ${record.id} ${stackNote}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch294 blank why ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list/i.test(why) || /is on the Limited list/i.test(why)) {
      throw new Error(`batch294 generic why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
