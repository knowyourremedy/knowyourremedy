// DRAFT / not verified / batch 382 KYR6-e (t83u).
// Wild Oil of Myrtle 1 oz. The facts-table row is an active and is not graded.
// The olive oil stays inside the blend heading. None is not stored.
// The latte, the three Turmeric Power Plus sizes, and the food and bundle forms stay off this file.

import type { RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import { applyT83uRow } from '../scan-preview/t83uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT83uRow(applyT54uRow(record));
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH382_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b382-myrtle-1',
    productName: 'North American Herb & Spice Wild Oil of Myrtle (1 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b382-myrtle-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000099',
    activeIngredients: [
      { name: 'Proprietary blend in extra virgin olive oil', strength: '110 mg' },
      { name: 'Wild myrtle oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/wild-oil-of-myrtle/ shows the 1 ounce at a sale price, $29.39 from $41.99. The page SKU is 006. No stock word was on the page. The front says Oil of Wild Myrtle, Skin/Hair support-plus, and Wild, Handpicked. The front crop does not print the amount. The facts photograph prints Supplement Facts, Serving Size 5 drops, and Servings per container 172. Proprietary blend in extra virgin olive oil is 110 mg. Wild myrtle oil has no amount. That row stays inside the blend and is not graded. The photograph has no Other ingredients heading. None is not printed. A steam-extracted oil guaranteed wild, non-GMO under the box is a claim. Label directions say take five or more drops under the tongue or in juice/water as often as needed, and also rub on the face and hands and add to shampoo. The page How to Take says five drops and omits or more. The facts serving is 5 drops. The printed digits are 6 35824 00009 9. A barcode read gives 635824000099. The check digit passes. This code is the 1 oz drops only. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH382_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch382 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch382 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b382-myrtle-1': { barcode: '635824000099', actives: 2, inactive: 0 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch382 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch382 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch382 grade ${row.id}`);
  }
  if (row.activeIngredients.length !== spec.actives) throw new Error(`${row.id} actives`);
  if (row.inactiveIngredients.length !== spec.inactive) throw new Error(`${row.id} other`);
  const roll = computeVerdictFromInactiveIngredients(row.inactiveIngredients);
  if (roll.verdict !== 'clean') throw new Error(`${row.id} rollup`);
  if (row.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) {
    throw new Error(`${row.id} stack`);
  }
  for (const ingredient of row.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why) || !/cleared/i.test(why)) throw new Error(`${row.id} ${ingredient.name}: ${why}`);
  }
  const source = row.sourcesGeneral.join(' ');
  if (banned.test(source) || source.includes('None is printed')) throw new Error(`${row.id} source`);
}

const myrtle = ROWS[0];
if (myrtle?.inactiveIngredients.length !== 0 || myrtle.activeIngredients[0]?.strength !== '110 mg') {
  throw new Error('batch382 myrtle');
}
if (myrtle.activeIngredients[1]?.name !== 'Wild myrtle oil') throw new Error('batch382 myrtle oil');
if (!myrtle.sourcesGeneral[0]?.includes('6 35824 00009 9')) throw new Error('batch382 photo');
if (
  ROWS.some((row) => ['635824006732', '635824006671'].includes(row.barcode ?? ''))
) {
  throw new Error('batch382 held upc attached');
}
