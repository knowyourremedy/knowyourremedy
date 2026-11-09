// DRAFT / not verified / batch 372 KYR6-e (t83u).
// One North American Herb & Spice LivaClenz dropper.
// Blend rows are actives and are not graded. None is not stored.

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

export const BATCH372_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b372-livaclenz-1',
    productName: 'North American Herb & Spice LivaClenz (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b372-livaclenz-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000686',
    activeIngredients: [
      { name: 'Proprietary blend in a base of extra virgin olive oil', strength: '' },
      { name: 'Coriander/cilantro oil', strength: '' },
      { name: 'Fennel oil', strength: '' },
      { name: 'Wild rosemary oil', strength: '' },
      { name: 'Wild oregano oil', strength: '' },
      { name: 'Cumin oil', strength: '' },
      { name: 'Wild sage oil', strength: '' },
      { name: 'Wild bay leaf oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/livaclenz/?attribute_pa_size=1-fl-oz shows the 1 fl oz dropper. No stock word was on the page. The front says Dietary Supplement, LivaClenz, and 1 FL. OZ. (30ML.). The facts photograph prints Supplement Facts, Serving size 5 drops, and Servings per container 173. The blend heading is Proprietary blend in a base of extra virgin olive oil. The seven rows have no amounts: Coriander/cilantro oil, Fennel oil, Wild rosemary oil, Wild oregano oil, Cumin oil, Wild sage oil, and Wild bay leaf oil. Those rows are actives and are not graded. The olive oil stays inside the blend heading. The photograph has no Other ingredients heading. None is not printed. The line under the panel, A steam-extracted oil certified wild, non-GMO, stays a claim. Label directions say take five or more drops twice daily under the tongue or in juice/water. The page How to Take is the capsule sentence and is not this dropper. A barcode read of the facts photograph, the directions photograph, and the barcode crop gives 635824000686. The human-readable digits are 6 35824 00068 6. The check digit passes. The source report prints 635824006806. That string does not pass the check digit and is not this bottle. The 60 vegi-capsule panel is a separate form. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH372_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch372 count ${ROWS.length}`);
const row = ROWS[0];
if (row?.id !== 'nahs-b372-livaclenz-1') throw new Error('batch372 id');
if (row.barcode !== '635824000686' || !upcCheck(row.barcode)) throw new Error('batch372 upc');
if (String(row.barcode) === '635824006806') throw new Error('batch372 report upc');
if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
  throw new Error('batch372 grade');
}
if (row.inactiveIngredients.length !== 0) throw new Error('batch372 other');
const names = row.activeIngredients.map((ingredient) => ingredient.name);
const expected = [
  'Proprietary blend in a base of extra virgin olive oil',
  'Coriander/cilantro oil',
  'Fennel oil',
  'Wild rosemary oil',
  'Wild oregano oil',
  'Cumin oil',
  'Wild sage oil',
  'Wild bay leaf oil',
];
if (names.join('|') !== expected.join('|')) throw new Error('batch372 actives');
const roll = computeVerdictFromInactiveIngredients(row.inactiveIngredients);
if (roll.verdict !== 'clean') throw new Error('batch372 rollup');
if (row.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) {
  throw new Error('batch372 stack');
}
for (const ingredient of row.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why || banned.test(why)) throw new Error(`${ingredient.name}: ${why}`);
}
const source = (row.sourcesGeneral ?? []).join(' ');
if (banned.test(source) || source.includes('None is printed')) throw new Error('batch372 source');
if (!source.includes('6 35824 00068 6') || !source.includes('under the tongue') || !source.includes('635824000686')) {
  throw new Error('batch372 photo');
}
if (source.includes('pullulan (capsule)')) throw new Error('batch372 capsule string leaked');
