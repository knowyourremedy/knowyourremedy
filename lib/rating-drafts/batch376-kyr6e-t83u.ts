// DRAFT / not verified / batch 376 KYR6-e (t83u).
// Oregulin 1 fl oz oil. Blend rows are actives and are not graded.
// None is not stored. The 180-softgel UPC is not on this row.

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

export const BATCH376_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b376-oregulin-1',
    productName: 'North American Herb & Spice Oregulin (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b376-oregulin-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824001195',
    activeIngredients: [
      { name: 'Proprietary blend in Austrian pumpkin seed and e.v. olive oil', strength: '' },
      { name: 'Wild, organic myrtle oil', strength: '' },
      { name: 'Cumin oil', strength: '' },
      { name: 'Wild, organic oregano oil P73', strength: '' },
      { name: 'Fenugreek oil', strength: '' },
      { name: 'Wild-harvested cinnamon oil', strength: '' },
      { name: 'Wild, organic mountain sage oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/oregulin/?attribute_pa_size=1-ounce-spice-oil-complex shows the 1 Ounce Spice Oil Complex. The page kept the range $29.39–$69.99. The page says 3 Month Supply per Bottle. No stock word was on the page. The front says Dietary Supplement, Aromatic Spice Oils, and Oregulin. The amount is not in that front crop. The facts photograph is the 1 oz gallery image. It prints Supplement Facts, Serving Size 6 drops, Servings per container 110, and Proprietary blend in Austrian pumpkin seed and e.v. olive oil. No blend amount is printed. The rows are Wild, organic myrtle oil, Cumin oil, Wild, organic oregano oil P73, Fenugreek oil, Wild-harvested cinnamon oil, and Wild, organic mountain sage oil. Those rows are actives and are not graded. Austrian pumpkin seed and e.v. olive oil stay inside the blend heading. The photograph has no Other ingredients heading. None is not printed. The 180-softgel gelatin line is a different form. Label directions say for blood sugar support take 10 or more drops with each meal, and take more if needed. The facts serving is 6 drops. The printed digits are 6 35824 00119 5. A barcode read gives 635824001195. The check digit passes. This code is the 1 oz oil only. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH376_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch376 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch376 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b376-oregulin-1': { barcode: '635824001195', actives: 7, inactive: 0 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch376 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch376 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch376 grade ${row.id}`);
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

const oil = ROWS[0];
if (oil?.activeIngredients[0]?.strength !== '' || oil.inactiveIngredients.length !== 0) throw new Error('batch376 oil');
if (!oil.sourcesGeneral[0]?.includes('6 35824 00119 5')) throw new Error('batch376 oil digits');
if (ROWS.some((row) => ['635824007319', '635824009917', '635824009900'].includes(row.barcode ?? ''))) {
  throw new Error('batch376 held upc attached');
}
