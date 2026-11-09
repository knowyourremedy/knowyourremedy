// DRAFT / not verified / batch 378 KYR6-e (t83u).
// Purely-E 1 oz drops. Blend rows are actives and are not graded.
// None is not stored. The 60-gelcap UPC is not on this row.

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

export const BATCH378_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b378-purely-e-1',
    productName: 'North American Herb & Spice Purely-E (1 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b378-purely-e-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824005070',
    activeIngredients: [
      { name: 'Proprietary blend sunflower seed, vitamin E complex', strength: '60 IU' },
      { name: 'Pumpkin seed oil', strength: '' },
      { name: 'Red palm oil', strength: '' },
      { name: 'Wild rosemary oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/purely-e/ Select a Size includes 1 ounce at $29.99 and 60 Gelcaps at $36.99. No stock word was on the page. The 1 oz front says Dietary Supplement, Purely-E, and Sunflower seed vitamin E. The front crop does not print the amount. The facts photograph prints Supplement Facts, Serving Size 3 drops, and Serving per container 286. Proprietary blend sunflower seed, vitamin E complex is 60 IU. That line is 200%. The other rows are Pumpkin seed oil, Red palm oil, and Wild rosemary oil. No amounts are printed on those three rows. Those rows are actives and are not graded. Wild rosemary oil stays inside the blend. The photograph has no Other ingredients heading. None is not printed. The 60-gelcap gelatin line is a different form. Label directions say take three drops under the tongue or in juice/water once daily, add them to smoothies, and that the oil may also be used topically for skin health support. The facts serving is 3 drops. The page How to Take matches the oral dose and also allows topical use. The printed digits are 6 35824 00507 0. A barcode read gives 635824005070. The check digit passes. This code is the 1 oz drops only. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH378_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch378 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch378 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b378-purely-e-1': { barcode: '635824005070', actives: 4, inactive: 0 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch378 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch378 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch378 grade ${row.id}`);
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
  const source = (row.sourcesGeneral ?? []).join(' ');
  if (banned.test(source) || source.includes('None is printed')) throw new Error(`${row.id} source`);
}

const drops = ROWS[0];
if (drops?.activeIngredients[0]?.strength !== '60 IU' || drops.inactiveIngredients.length !== 0) throw new Error('batch378 drops');
if (!drops.sourcesGeneral?.[0]?.includes('6 35824 00507 0')) throw new Error('batch378 drops digits');
if (
  ROWS.some((row) =>
    [
      '635824006305',
      '635824005933',
      '635824002550',
      '635824000280',
      '635824002734',
      '635824007692',
      '635824007722',
      '635824009733',
    ].includes(row.barcode ?? ''),
  )
) {
  throw new Error('batch378 held upc attached');
}
