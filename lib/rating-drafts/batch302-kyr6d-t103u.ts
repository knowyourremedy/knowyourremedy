// DRAFT / not verified / batch 302 KYR6-d (t103u continued).
// Brand page is the single source. Barcode fields were empty.
// No brand is closed. The Sprouts section is not edited.

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
  cellulose: 'Methodology §5 Cleared (vegetable cellulose capsule).',
  flour: 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.',
  honey: 'Methodology §5 Cleared (honey).',
} as const;

type MethKey = keyof typeof S;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${S[meth]}` };
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const formNote = contradictionHonestNote(mapped);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  if (formNote && !honestNote.includes(formNote)) honestNote = `${honestNote} ${formNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const PBEE =
  'Zand brand page facts image. Bee Complete 90 capsules. Other ingredients: Vegetable Cellulose (capsule) and Rice Flour. t103u brand-page single source.';
const PHONEY =
  'Zand brand page facts image. Royal Jelly in Honey. Other ingredients: Organic Raw Honey. t103u brand-page single source.';

const NOTE_BEE =
  'Rice flour is Caution and does not stack. Counted Limited tokens: none. Vegetable cellulose is Cleared. Bee pollen, propolis extract, and royal jelly concentrate are actives and are not graded.';
const NOTE_HONEY =
  'Counted Limited tokens: none. Organic raw honey is Cleared. Royal jelly is the active and is not graded.';

export const BATCH302_KYR6D_T103U: RatingRecord[] = [
  finish({
    id: 'zand-b302-bee-complete-90',
    productName: 'Zand Bee Complete (90 capsules)',
    brand: 'Zand',
    category: 'Herbs',
    formulaId: 'zand-b302-bee-complete-90',
    form: 'capsule',
    audience: ADULT,
    minAge: 1,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: [
      { name: 'Bee Pollen', strength: '1,140 mg' },
      { name: 'Propolis Extract 5:1', strength: '150 mg' },
      { name: 'Royal Jelly Concentrate', strength: '90 mg' },
    ],
    inactiveIngredients: [
      flag(PBEE, 'Vegetable Cellulose (capsule)', 'cleared', 'cellulose'),
      flag(PBEE, 'Rice Flour', 'moderate', 'flour'),
    ],
    verdict: 'caution',
    honestNote: NOTE_BEE,
    sourcesGeneral: [
      't103u. Zand brand page is the single source. https://zand.com/products/pollen-royal-jelly-propolis lists 90 ct capsules at $21.79 and in stock. The facts image says serving size 3 capsules and 30 servings. Other ingredients: Vegetable Cellulose (capsule) and Rice Flour. The barcode field is empty. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'zand-b302-royal-jelly-honey-11',
    productName: 'Zand Royal Jelly in Honey (11 oz)',
    brand: 'Zand',
    category: 'Herbs',
    formulaId: 'zand-b302-royal-jelly-honey-11',
    form: 'honey',
    audience: ADULT,
    minAge: 1,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: [{ name: 'Royal Jelly', strength: '673 mg' }],
    inactiveIngredients: [flag(PHONEY, 'Organic Raw Honey', 'cleared', 'honey')],
    verdict: 'clean',
    honestNote: NOTE_HONEY,
    sourcesGeneral: [
      't103u. Zand brand page is the single source. https://zand.com/products/royal-jelly-in-honey lists 11 oz at $27.99 and in stock. The facts image says serving size 1 teaspoon (7 g) and 44 servings. Other ingredients: Organic Raw Honey. The barcode field is empty. Missing UPC. No code was invented.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; note: string }> = {
  'zand-b302-bee-complete-90': { verdict: 'caution', note: NOTE_BEE },
  'zand-b302-royal-jelly-honey-11': { verdict: 'clean', note: NOTE_HONEY },
};

const ROWS = BATCH302_KYR6D_T103U;
if (ROWS.length !== 2) throw new Error(`batch302 count ${ROWS.length}`);
for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch302 unexpected ${record.id}`);
  if ((record.honestNote ?? '') !== expected.note) throw new Error(`batch302 honest ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== expected.verdict) {
    throw new Error(`batch302 verdict ${record.id} ${rollup.verdict} ${rollup.cause}`);
  }
  if (ingredientCountsTowardLimitedStack(mapped.inactiveIngredients[0] ?? { name: '', riskLevel: 'cleared' })) {
    throw new Error(`batch302 unexpected stack ${record.id}`);
  }
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch302 counted ${record.id}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch302 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line/i.test(why)) {
      throw new Error(`batch302 generic ${ingredient.name}: ${why}`);
    }
  }
}
