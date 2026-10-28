// DRAFT / not verified / batch 300 KYR6-d (t103u).
// Brand-page facts images are the single source. Barcode fields were empty.
// No brand is closed. The Sprouts section is not edited.
// t103u requires a full honest note on every row and a specific why on every tab.

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
  grain:
    'Methodology §5 Limited (pure grain alcohol — alcohol vehicle). Counts toward the t137u stack. Not Grape Alcohol.',
  ethanol:
    'Methodology §5 Limited (ethanol — alcohol vehicle). Counts toward the t137u stack. Not Grape Alcohol.',
  water: 'Methodology §5 Cleared (water / purified water).',
  filtered: 'Methodology §5 Cleared (filtered water).',
  cane: 'Methodology §5 Cleared (non-GMO cane sugar / cane sugar).',
  tapioca: 'Methodology §5 Cleared (gluten-free tapioca syrup / tapioca syrup).',
  pectin: 'Methodology §5 Cleared (pectin from citrus peel / pectin).',
  lemon:
    'Methodology §5 Limited (t54u natural-flavor rule). Natural Lemon Flavor is the exact t54u name. Counts toward the t137u stack.',
  malic: 'Methodology §5 Cleared (malic acid).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers and buffers).',
  wax: 'Methodology §5 Cleared (carnauba wax — t133u).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
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

const PELD =
  'Zand brand page facts image. Elderberry Honey Syrup. Other ingredients: Pure Grain Alcohol and Purified Water. The elderberry honey syrup blend is the active. t103u brand-page single source.';
const PPROP =
  'Zand brand page facts image. Bee Propolis Throat Spray. Other ingredients: Ethanol and Water. The proprietary blend is the active. t103u brand-page single source.';
const PSLEEP =
  'Reprise Health brand page facts image. Restful Sleep Gummies. Other ingredients read on the image. The herbal extracts are the actives. t103u brand-page single source.';
const PCHERI =
  'Cheribundi brand page facts image. Sleep Gummies 60 count. Ingredients read on the image. Tart cherry, melatonin, niacin, and folate are the actives. t103u brand-page single source.';

const NOTE_ELD =
  'Counted Limited token: Pure Grain Alcohol. That is one, so this is not a 3+ stack. Purified Water is Cleared. The elderberry honey syrup blend is the active and is not graded.';
const NOTE_PROP =
  'Counted Limited token: Ethanol. That is one, so this is not a 3+ stack. Water is Cleared. The proprietary blend of honey, propolis, licorice root, and usnea is the active and is not graded.';
const NOTE_SLEEP =
  'Counted Limited token: Natural Lemon Flavor. That is one, so this is not a 3+ stack. Filtered water, non-GMO cane sugar, gluten-free tapioca syrup, pectin from citrus peel, malic acid, citric acid, sodium citrate, carnauba wax, and glycerin are Cleared. The jujube, chamomile, and lemon balm extracts are actives and are not graded.';
const NOTE_CHERI =
  'Counted Limited tokens: none. Tapioca syrup, cane sugar, water, pectin, citric acid, and sodium citrate are Cleared. Tart cherry juice concentrate, tart cherry fruit extract, melatonin, niacin, and folate are actives and are not graded.';

const ELD_FLAGS: IngredientFlag[] = [
  flag(PELD, 'Pure Grain Alcohol', 'limited', 'grain'),
  flag(PELD, 'Purified Water', 'cleared', 'water'),
];

export const BATCH300_KYR6D_T103U: RatingRecord[] = [
  finish({
    id: 'zand-b300-elderberry-honey-4',
    productName: 'Zand Elderberry Honey Syrup (4 oz)',
    brand: 'Zand',
    category: 'Cold & Flu',
    formulaId: 'zand-b300-elderberry-honey',
    form: 'syrup',
    audience: ADULT,
    minAge: 1,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: [
      {
        name: 'Elderberry Honey Syrup (Organic Raw Honey, Elderberry Juice, Organic Apple Cider Vinegar, Propolis, Echinacea Purpurea)',
        strength: '6.2 g',
      },
    ],
    inactiveIngredients: ELD_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_ELD,
    sourcesGeneral: [
      't103u. Zand brand page is the single source. https://zand.com/products/elderberry-syrup-with-grade-a-honey lists the 4 oz at $13.69 and in stock. The barcode field is empty. The facts image says serving size 1 tsp (5 mL) and about 24 servings. Do not give to children under 1 year of age. Other ingredients: Pure Grain Alcohol and Purified Water. Counted Limited token: Pure Grain Alcohol. That is one, so this is not a 3+ stack. Missing UPC. No code was invented. The 8 oz is a separate row.',
    ],
  }),
  finish({
    id: 'zand-b300-elderberry-honey-8',
    productName: 'Zand Elderberry Honey Syrup (8 oz)',
    brand: 'Zand',
    category: 'Cold & Flu',
    formulaId: 'zand-b300-elderberry-honey',
    form: 'syrup',
    audience: ADULT,
    minAge: 1,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: [
      {
        name: 'Elderberry Honey Syrup (Organic Raw Honey, Elderberry Juice, Organic Apple Cider Vinegar, Propolis, Echinacea Purpurea)',
        strength: '6.2 g',
      },
    ],
    inactiveIngredients: ELD_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_ELD,
    sourcesGeneral: [
      't103u. Zand brand page is the single source. https://zand.com/products/elderberry-syrup-with-grade-a-honey lists the 8 oz at $23.39 and in stock. The barcode field is empty. The facts image says serving size 1 tsp (5 mL) and about 48 servings. Same other-ingredient line as the 4 oz: Pure Grain Alcohol and Purified Water. Counted Limited token: Pure Grain Alcohol. That is one, so this is not a 3+ stack. Missing UPC. No code was invented. Not the 4 oz row.',
    ],
  }),
  finish({
    id: 'zand-b300-propolis-spray-1',
    productName: 'Zand Bee Propolis Throat Spray (1 fl oz)',
    brand: 'Zand',
    category: 'Cold & Flu',
    formulaId: 'zand-b300-propolis-spray-1',
    form: 'spray',
    audience: ADULT,
    minAge: 1,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: [
      {
        name: 'Proprietary Blend (Raw Honey, Propolis Extract, Licorice Root, Usnea Lichen)',
        strength: '244 mg',
      },
    ],
    inactiveIngredients: [
      flag(PPROP, 'Ethanol', 'limited', 'ethanol'),
      flag(PPROP, 'Water', 'cleared', 'water'),
    ],
    verdict: 'caution',
    honestNote: NOTE_PROP,
    sourcesGeneral: [
      't103u. Zand brand page is the single source. https://zand.com/products/bee-propolis-throat-spray-with-apitherapy-raw-honey-licorice-root-and-usnea-50-servings-1-fl-oz lists the spray at $13.69 and in stock. The barcode field is empty. Serving size 3 sprays (0.6 mL). Servings per container 50. Do not give to children under 1 year of age. Other ingredients: Ethanol and Water. Counted Limited token: Ethanol. That is one, so this is not a 3+ stack. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'reprise-b300-restful-sleep-60',
    productName: 'Reprise Health Restful Sleep Gummies (60 gummies)',
    brand: 'Reprise Health',
    category: 'Sleep',
    formulaId: 'reprise-b300-restful-sleep-60',
    form: 'gummy',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Reprise Health'],
    barcode: '',
    activeIngredients: [
      { name: 'Jujube (seed) Extract' },
      { name: 'Chamomile (flower) Extract' },
      { name: 'Lemon Balm (leaf) Extract' },
    ],
    inactiveIngredients: [
      flag(PSLEEP, 'Filtered Water', 'cleared', 'filtered'),
      flag(PSLEEP, 'Non-GMO Cane Sugar', 'cleared', 'cane'),
      flag(PSLEEP, 'Gluten-Free Tapioca Syrup', 'cleared', 'tapioca'),
      flag(PSLEEP, 'Pectin from Citrus Peel', 'cleared', 'pectin'),
      flag(PSLEEP, 'Natural Lemon Flavor', 'limited', 'lemon'),
      flag(PSLEEP, 'Malic Acid', 'cleared', 'malic'),
      flag(PSLEEP, 'Citric Acid', 'cleared', 'citric'),
      flag(PSLEEP, 'Sodium Citrate', 'cleared', 'citric'),
      flag(PSLEEP, 'Carnauba Wax', 'cleared', 'wax'),
      flag(PSLEEP, 'Glycerin', 'cleared', 'glycerin'),
    ],
    verdict: 'caution',
    honestNote: NOTE_SLEEP,
    sourcesGeneral: [
      't103u. Reprise Health brand page is the single source. https://reprisehealth.com/products/restful-sleep-gummies lists 1-Month Supply / Just Me at $45.00 and in stock. The barcode field is empty. Serving size 2 gummies. Servings per pouch 30. That is 60 gummies. Other ingredients: Filtered Water, Non-GMO Cane Sugar, Gluten-Free Tapioca Syrup, Pectin from Citrus Peel, Natural Lemon Flavor, Malic Acid, Citric Acid, Sodium Citrate, Carnauba Wax, Glycerin. Counted Limited token: Natural Lemon Flavor. That is one, so this is not a 3+ stack. The Two of Us and 3-Month options are multipacks and are not this row. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'cheribundi-b300-sleep-gummies-60',
    productName: 'Cheribundi Sleep Gummies (60 gummies)',
    brand: 'Cheribundi',
    category: 'Sleep',
    formulaId: 'cheribundi-b300-sleep-gummies-60',
    form: 'gummy',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Cheribundi'],
    barcode: '',
    activeIngredients: [
      { name: 'Niacin (nicotinic acid)', strength: '16 mg' },
      { name: 'Folate', strength: '680 mcg DFE' },
      { name: 'Cheribundi Tart Cherry Juice Concentrate', strength: '2.1 g' },
      { name: 'Tart Cherry Fruit Extract (Prunus cerasus)', strength: '534 mg' },
      { name: 'Melatonin', strength: '3 mg' },
    ],
    inactiveIngredients: [
      flag(PCHERI, 'Tapioca Syrup', 'cleared', 'tapioca'),
      flag(PCHERI, 'Cane Sugar', 'cleared', 'cane'),
      flag(PCHERI, 'Water', 'cleared', 'water'),
      flag(PCHERI, 'Pectin', 'cleared', 'pectin'),
      flag(PCHERI, 'Citric Acid', 'cleared', 'citric'),
      flag(PCHERI, 'Sodium Citrate', 'cleared', 'citric'),
    ],
    verdict: 'clean',
    honestNote: NOTE_CHERI,
    sourcesGeneral: [
      't103u. Cheribundi brand page is the single source. https://cheribundi.com/products/sleep-gummies lists 60 Count / 1 tub at $60.00 and in stock. The barcode field is empty. Serving size 2 gummies. Servings per container 30. Ingredients: tart cherry juice concentrate, tapioca syrup, cane sugar, water, pectin, citric acid, sodium citrate. Tart cherry juice concentrate is also in the supplement facts and is an active, so it is not graded again. Counted Limited tokens: none. Missing UPC. No code was invented. The 12-pack and 24-pack juices are not this row.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: string }> = {
  'zand-b300-elderberry-honey-4': { verdict: 'caution', cause: 'limited_1_2', counted: 'Pure Grain Alcohol', note: NOTE_ELD },
  'zand-b300-elderberry-honey-8': { verdict: 'caution', cause: 'limited_1_2', counted: 'Pure Grain Alcohol', note: NOTE_ELD },
  'zand-b300-propolis-spray-1': { verdict: 'caution', cause: 'limited_1_2', counted: 'Ethanol', note: NOTE_PROP },
  'reprise-b300-restful-sleep-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Lemon Flavor', note: NOTE_SLEEP },
  'cheribundi-b300-sleep-gummies-60': { verdict: 'clean', cause: 'clean', counted: '', note: NOTE_CHERI },
};

const ROWS = BATCH300_KYR6D_T103U;
if (ROWS.length !== 5) throw new Error(`batch300 row count ${ROWS.length}`);
for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch300 unexpected ${record.id}`);
  if (!record.honestNote || record.honestNote.trim().length < 40) throw new Error(`batch300 note missing ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || mapped.verdict !== expected.verdict) {
    throw new Error(`batch300 verdict ${record.id} ${rollup.verdict} ${rollup.cause}`);
  }
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item)).map((item) => item.name).join('|');
  if (counted !== expected.counted) throw new Error(`batch300 stack ${record.id} ${counted}`);
  if ((mapped.honestNote ?? '') !== expected.note) throw new Error(`batch300 note ${record.id}`);
  if ((mapped.barcode ?? '') !== '') throw new Error(`batch300 upc ${record.id}`);
  const formNote = contradictionHonestNote(record);
  if (formNote && !expected.note.startsWith(formNote)) throw new Error(`batch300 form ${record.id} ${formNote}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch300 blank ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list/i.test(why) || /is on the Limited list/i.test(why)) {
      throw new Error(`batch300 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
