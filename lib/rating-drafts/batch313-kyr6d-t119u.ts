// DRAFT / not verified / batch 313 KYR6-d (t119u).
// Brand facts image is the single source.
// No brand is closed. The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const PANEL =
  'Wooden Spoon Herbs brand facts image. Oregano Daily Wellness. Other ingredients: Vegetable cellulose. t119u brand page.';
const CELL =
  'Methodology §5 Cleared (vegetable cellulose).';

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH313_KYR6D_T119U: RatingRecord[] = [
  finish({
    id: 'woodenspoon-b313-oregano-90',
    productName: 'Wooden Spoon Herbs Oregano Daily Wellness (about 90 capsules)',
    brand: 'Wooden Spoon Herbs',
    category: 'Herbs',
    formulaId: 'woodenspoon-b313-oregano-90',
    form: 'capsule',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Wooden Spoon Herbs'],
    barcode: '',
    activeIngredients: [
      { name: 'Oregano Leaf' },
      { name: 'Garlic Bulb' },
      { name: 'Onion Bulb' },
      { name: 'Ginger Root' },
      { name: 'Cayenne Fruit' },
    ],
    inactiveIngredients: [
      {
        name: 'Vegetable cellulose',
        riskLevel: 'cleared' as RiskLevel,
        source: `${PANEL}; ${CELL}`,
      } satisfies IngredientFlag,
    ],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. Vegetable cellulose is Cleared and does not stack. Oregano leaf, garlic bulb, onion bulb, ginger root, and cayenne fruit are the supplement-facts blend and are not graded. Serving size is 3 capsules and the container is about 30 servings, so this is about 90 capsules. The directions say 1 capsule 3 times daily. No UPC was printed on the facts image. Missing UPC.',
    sourcesGeneral: [
      't119u. Wooden Spoon Herbs brand page https://woodenspoonherbs.com/products/oregano-daily-wellness is in stock at $34. The facts image prints Other ingredients: Vegetable cellulose. The blend is Oregano Leaf, Garlic Bulb, Onion Bulb, Ginger Root, Cayenne Fruit, 452 mg. Serving size 3 capsules, about 30 servings. No UPC was printed. Missing UPC. No code was invented. The Daily Defense kit was not written.',
    ],
  }),
];

const ROWS = BATCH313_KYR6D_T119U;
if (ROWS.length !== 1) throw new Error(`batch313 count ${ROWS.length}`);
for (const record of ROWS) {
  if (record.verdict !== 'clean') throw new Error(`batch313 verdict ${record.verdict}`);
  if (record.barcode) throw new Error('batch313 barcode');
  const mapped = applyT54uRow(record);
  if (mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i)).length !== 0) {
    throw new Error('batch313 stack');
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch313 generic ${ingredient.name}: ${why}`);
    }
  }
}
