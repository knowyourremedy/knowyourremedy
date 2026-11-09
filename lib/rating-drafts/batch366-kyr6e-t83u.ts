// DRAFT / not verified / batch 366 KYR6-e (t83u).
// Four North American Herb & Spice oral essence bottles.
// The brand photograph is the formula. Blend rows are actives and are not graded.
// No label prints an Other ingredients heading. None is not stored.

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

export const BATCH366_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b366-elderol-2',
    productName: 'North American Herb & Spice Elderol (2 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b366-elderol-2',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824005506',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Raw, wild, purple elderberry extract', strength: '' },
      { name: 'Oregano juice', strength: '' },
      { name: 'Multiple spice formula', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/elderol/ shows one 2 ounce raw wild extract at $24.49. No stock word was on the page. The front says Dietary Supplement and 2 FL. OZ. (60 ML.). The facts photograph prints Supplement Facts, Serving Size 20 drops, Servings per container 88, and Proprietary blend with no printed total. The three rows have no amounts: Raw, wild, purple elderberry extract, Oregano juice, and Multiple spice formula. Those rows are actives and are not graded. The photograph has no Other ingredients heading. None is not printed. non-GMO, Chemical-free, not standardized is a claim under the table. The page list omits Oregano juice and is not the formula. Directions say 20 or more drops under the tongue. Visual barcode 6 35824 00550 6. UPC 635824005506. The check digit passes. Label code LA8059 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b366-cilantro-8',
    productName: 'North American Herb & Spice Essence of Cilantro (8 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b366-cilantro-8',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006626',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Wild cilantro/coriander essence', strength: '' },
      { name: 'Springwater', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/essence-of-pure-cilantro/ shows one 8 ounce aromatic spice essence. No stock word was on the page. The front says Dietary Supplement, Essence of Cilantro, and 8 FL. OZ. (240 ML.). The facts photograph prints Supplement Facts, Serving Size 2 tablespoons, Serving Per Container 8, and Proprietary blend with no printed total. The two rows have no amounts: Wild cilantro/coriander essence and Springwater. Those rows are actives and are not graded. Springwater stays inside the blend. The photograph has no Other ingredients heading. None is not printed. 100% GMO-free is a claim under the table. The page list spells spring water and is not the formula. Directions say one to two tablespoons in juice or water. Visual barcode 6 35824 00662 6. UPC 635824006626. The check digit passes. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b366-lavender-12',
    productName: 'North American Herb & Spice Essence of Lavender (12 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b366-lavender-12',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824007555',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Wild lavender essence', strength: '' },
      { name: 'Spring water', strength: '' },
      { name: 'Oregano juice', strength: '' },
      { name: 'Lavender oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/essence-of-wild-lavender/ shows one 12 ounce wild Mediterranean essence. No stock word was on the page. The front says Dietary Supplement and 12 FL. OZ. (355 ML.). The facts photograph prints Supplement Facts, Serving Size 2 tablespoon, Servings per container 12, and Proprietary blend with no printed total. The four rows have no amounts: Wild lavender essence, Spring water, Oregano juice, and Lavender oil. Those rows are actives and are not graded. Lavender oil stays inside the blend. The photograph has no Other ingredients heading. None is not printed. Chemical free, non-GMO is a claim under the table. The page list names only wild lavender essence and spring water and is not the formula. Directions say one to two tablespoons in juice or water. The page hydrosol and aromatherapy sentences are not the label. Visual barcode 6 35824 00755 5. UPC 635824007555. The check digit passes. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b366-rosemary-8',
    productName: 'North American Herb & Spice Wild Essence of Rosemary (8 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b366-rosemary-8',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006770',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Wild, organic rosemary essence', strength: '' },
      { name: 'Wild, organic oregano oil', strength: '' },
      { name: 'Spring water', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/essence-of-wild-rosemary/ shows one 8 ounce wild extract. No stock word was on the page. The front says Dietary Supplement and 8 FL. OZ. (240 ML). The facts photograph prints Supplement Facts, Serving Size 1 tablespoon, Servings per container 16, and Proprietary blend with no printed total. The three rows have no amounts: Wild, organic rosemary essence, Wild, organic oregano oil, and Spring water. Those rows are actives and are not graded. The oregano oil stays inside the blend. The photograph has no Other ingredients heading. None is not printed. Guaranteed Non-GMO is a claim under the table. The page list uses different punctuation and is not the formula. Directions say one to two tablespoons in juice or water. A side sentence that says the essence is free of additives is not an Other ingredients line. Visual barcode 6 35824 00677 0. UPC 635824006770. The check digit passes. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH366_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
const IDS = ['nahs-b366-elderol-2', 'nahs-b366-cilantro-8', 'nahs-b366-lavender-12', 'nahs-b366-rosemary-8'];
const CODES = ['635824005506', '635824006626', '635824007555', '635824006770'];
const COUNTS = [4, 3, 5, 4];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 4) throw new Error(`batch366 count ${ROWS.length}`);
ROWS.forEach((record, index) => {
  if (record.id !== IDS[index]) throw new Error(record.id);
  if (record.barcode !== CODES[index] || !record.barcode || !upcCheck(record.barcode)) throw new Error(record.id + ' upc');
  if (record.activeIngredients.length !== COUNTS[index]) throw new Error(record.id + ' actives');
  if (record.activeIngredients[0]?.strength !== '') throw new Error(record.id + ' amount');
  if (record.inactiveIngredients.length !== 0) throw new Error(record.id + ' other');
  if (record.verdict !== 'clean') throw new Error(record.id + ' verdict');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean' || record.honestNote) throw new Error(record.id + ' note');
  if (record.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) throw new Error(record.id + ' stack');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
});
if (!ROWS[2]?.activeIngredients.some((item) => item.name === 'Lavender oil')) throw new Error('batch366 lavender oil');
if (ROWS[2]?.inactiveIngredients.some((item) => /lavender oil/i.test(item.name))) throw new Error('batch366 oil other');
