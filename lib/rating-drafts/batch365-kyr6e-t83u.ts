// DRAFT / not verified / batch 365 KYR6-e (t83u).
// Two North American Herb & Spice drop bottles. The brand photograph is the formula.
// The blend lines are actives and are not graded. The olive oil stays inside the blend heading.
// Neither label prints an Other ingredients heading. None is not stored.

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

export const BATCH365_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b365-chag-o-power-2',
    productName: 'North American Herb & Spice Chag-o-Power Drops (2 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b365-chag-o-power-2',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824005247',
    activeIngredients: [
      { name: 'Proprietary blend in certified organic extra virgin olive oil', strength: '' },
      { name: 'Spring water', strength: '' },
      { name: 'Wild, raw chaga mushroom', strength: '' },
      { name: 'Oil of wild oregano (P73)', strength: '' },
      { name: 'Siberian black chaga', strength: '' },
      { name: 'Mycellized oregano oil', strength: '' },
      { name: 'Spice oil emulsion', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/chag-o-power-drops/ shows one 2 fl oz choice at $39.99. No stock word was on the page. The front says 2 FL. OZ. (60 ML.) and Dietary Supplement. The facts photograph prints Supplement Facts, Serving Size 20 drops, Servings Per Container 88, and Proprietary blend in certified organic extra virgin olive oil. The six rows have no amounts: Spring water, Wild, raw chaga mushroom, Oil of wild oregano (P73), Siberian black chaga, Mycellized oregano oil, and Spice oil emulsion. The asterisk is the daily-value mark. Those rows are actives and are not graded. The olive oil stays inside the blend heading. The photograph has no Other ingredients heading. None is not printed. The page ingredient list puts extra virgin olive oil at the end and is not the formula. Visual barcode 6 35824 00524 7. UPC 635824005247. The check digit passes. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b365-cranflush-2',
    productName: 'North American Herb & Spice CranFlush (2 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b365-cranflush-2',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006107',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Wild high bush cranberry', strength: '' },
      { name: 'Preservatol (all-natural spice oils)', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/cranflush/ shows one 2 ounce raw wild emulsion at $44.99. No stock word was on the page. The front says Dietary Supplement and 2 FL. OZ. (60 ML.). The facts photograph prints Supplement Facts, Serving Size 20 drops, Servings Per Container 88, and Proprietary blend with no printed total. The two rows have no amounts: Wild high bush cranberry and Preservatol (all-natural spice oils). Those rows are actives and are not graded. The photograph has no Other ingredients heading. None is not printed. The page sentence that calls the drops a natural food is not the label. Directions on the label say 20 or more drops under the tongue or in juice or water. Visual barcode 6 35824 00610 7. UPC 635824006107. The check digit passes. Label code LA8015 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH365_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch365 count ${ROWS.length}`);
if (ROWS[0]?.id !== 'nahs-b365-chag-o-power-2' || ROWS[1]?.id !== 'nahs-b365-cranflush-2') throw new Error('batch365 ids');
if (ROWS[0]?.barcode !== '635824005247' || !upcCheck(ROWS[0].barcode)) throw new Error('batch365 chaga upc');
if (ROWS[1]?.barcode !== '635824006107' || !upcCheck(ROWS[1].barcode)) throw new Error('batch365 cran upc');
if (ROWS[0]?.activeIngredients.length !== 7 || ROWS[1]?.activeIngredients.length !== 3) throw new Error('batch365 actives');
if (ROWS[0]?.activeIngredients[0]?.strength !== '' || ROWS[1]?.activeIngredients[0]?.strength !== '') throw new Error('batch365 amount');
for (const record of ROWS) {
  if (record.category !== 'Herbs') throw new Error(record.id + ' tab');
  if (record.inactiveIngredients.length !== 0) throw new Error(record.id + ' other');
  if (record.verdict !== 'clean') throw new Error(record.id + ' verdict');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean') throw new Error(record.id + ' rollup');
  if (record.honestNote) throw new Error(record.id + ' note');
  if (record.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) throw new Error(record.id + ' stack');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
if ((ROWS[0]?.sourcesGeneral ?? []).join(' ').includes('None is printed')) throw new Error('batch365 invented none');
if (!ROWS[1]?.activeIngredients.some((item) => item.name === 'Preservatol (all-natural spice oils)')) throw new Error('batch365 preservatol');
