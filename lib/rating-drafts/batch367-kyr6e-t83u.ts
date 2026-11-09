// DRAFT / not verified / batch 367 KYR6-e (t83u).
// One North American Herb & Spice Essence of Rose Petals bottle.
// The brand photograph is the formula. The iHerb back photograph supplies the full barcode.
// Blend rows are actives and are not graded. None is not stored.

import type { RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH367_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b367-rose-petals-12',
    productName: 'North American Herb & Spice Essence of Rose Petals (12 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b367-rose-petals-12',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb'],
    barcode: '635824000198',
    activeIngredients: [
      { name: 'Proprietary Blend', strength: '' },
      { name: 'Rose petal essence', strength: '' },
      { name: 'Spring water', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/essence-of-pure-rose-petals/ shows one 12 ounce bottle. The front says Dietary Supplement, Essence of Rose Petals, and 12 FL. OZ. (355 ML.). The facts photograph prints Supplement Facts, Serving Size 2 tablespoons, Servings Per Container 12, and Proprietary Blend with no printed total. The two rows have no amounts: Rose petal essence and Spring water. Those rows are actives and are not graded. Spring water stays inside the blend. The photograph has no Other ingredients heading. None is not printed. Non-GMO is a claim under the table. Brand directions say one to two tablespoons in juice or water. The page eyewash sentence is not the label. The brand barcode showed 6 35824 00019 and the last digit was not on that crop. iHerb https://www.iherb.com/pr/north-american-herb-spice-essence-of-rose-petals-12-fl-oz-355-ml/11437 is the same 12 fl oz single, in stock. Its front reads Essence of Rose Petals. Its back photograph prints the same facts and the barcode digits 6 35824 00019 8. Those digits were read on the photograph. UPC 635824000198. The iHerb page also prints that UPC. Product code NHS-00019 is not the UPC. iHerb suggested use says two tablespoons. That wording is separate from the brand directions and does not change the facts serving. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH367_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch367 count ${ROWS.length}`);
const row = ROWS[0];
if (row?.id !== 'nahs-b367-rose-petals-12') throw new Error('batch367 id');
if (row?.barcode !== '635824000198' || !upcCheck(row.barcode)) throw new Error('batch367 upc');
if (row?.activeIngredients.length !== 3 || row.activeIngredients[0]?.strength !== '') throw new Error('batch367 actives');
if (row?.inactiveIngredients.length !== 0 || row.verdict !== 'clean' || row.honestNote) throw new Error('batch367 grade');
if (row.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) throw new Error('batch367 stack');
for (const ingredient of row.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why || banned.test(why)) throw new Error(`${ingredient.name}: ${why}`);
}
if (banned.test(row.sourcesGeneral.join(' '))) throw new Error('batch367 source');
if (!row.sourcesGeneral.join(' ').includes('6 35824 00019 8')) throw new Error('batch367 photo digits');
