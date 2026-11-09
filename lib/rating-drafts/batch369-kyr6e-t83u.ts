// DRAFT / not verified / batch 369 KYR6-e (t83u).
// One North American Herb & Spice H2Orega dropper.
// The blend row is an active and is not graded. None is not stored.

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

export const BATCH369_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b369-h2orega-1',
    productName: 'North American Herb & Spice H2Orega (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b369-h2orega-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824002468',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '100 mg' },
      { name: 'Mycelized wild oregano oil, P73', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/h2orega/ shows one 1 ounce mycelized oil. No stock word was on the page. The front says Dietary Supplement, H2Orega, and 1 FL. OZ. (30 ML.). The facts photograph prints Supplement Facts, Serving Size 5 drops, Serving per container 173, and Proprietary blend 100mg. The one row has no separate amount: Mycelized wild oregano oil, P73. That row is an active and is not graded. The photograph has no Other ingredients heading. None is not printed. Label directions say five drops in juice, water, milk, or honey daily, and that it may be added to infant formula. The page How to Take uses the same dose. The page ingredient list spells it Micellized wild oregano oil P73. That spelling is not the photograph. Visual barcode on the directions label 6 35824 00246 8. UPC 635824002468. The check digit passes. Label code LA4018 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH369_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch369 count ${ROWS.length}`);
const row = ROWS[0];
if (row?.id !== 'nahs-b369-h2orega-1') throw new Error('batch369 id');
if (row.barcode !== '635824002468' || !upcCheck(row.barcode)) throw new Error('batch369 upc');
if (row.category !== 'Herbs' || row.verdict !== 'clean' || row.honestNote) throw new Error('batch369 grade');
if (row.inactiveIngredients.length !== 0) throw new Error('batch369 other');
if (row.activeIngredients.length !== 2 || row.activeIngredients[0]?.strength !== '100 mg') throw new Error('batch369 blend');
if (row.activeIngredients[1]?.name !== 'Mycelized wild oregano oil, P73') throw new Error('batch369 oil');
const roll = computeVerdictFromInactiveIngredients(row.inactiveIngredients);
if (roll.verdict !== 'clean') throw new Error('batch369 rollup');
if (row.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) throw new Error('batch369 stack');
for (const ingredient of row.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why || banned.test(why)) throw new Error(`${ingredient.name}: ${why}`);
}
const source = row.sourcesGeneral.join(' ');
if (banned.test(source) || source.includes('None is printed')) throw new Error('batch369 source');
if (!source.includes('6 35824 00246 8') || !source.includes('infant formula')) throw new Error('batch369 photo');
if (!source.includes('Micellized')) throw new Error('batch369 page spelling');
