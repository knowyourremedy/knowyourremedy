// DRAFT / not verified / batch 380 KYR6-e (t83u).
// Rosemanol 1 oz and Royal Oil 2 oz. Facts-table rows are actives and are not graded.
// The olive oil stays inside the Rosemanol blend heading. None is not stored.
// Royal Power, Sagenol, and the hair-care forms stay off this file.

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

export const BATCH380_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b380-rosemanol-1',
    productName: 'North American Herb & Spice Rosemanol (1 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b380-rosemanol-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000020',
    activeIngredients: [
      { name: 'Proprietary blend in extra virgin olive oil', strength: '' },
      { name: 'Wild rosemary oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/rosemanol/ shows the 1 Ounce Spice Oil Complex at $41.99. The page SKU is 005. No stock word was on the page. The front says Dietary Supplement, Oil of wild rosemary, Rosemanol, Potent antioxidant, and Supports healthy nerves. The front crop does not print the amount. The facts photograph prints Supplement Facts, Serving Size 5 drops, and Serving per container 120. Proprietary blend in extra virgin olive oil has no amount. Wild rosemary oil has no amount. That row stays inside the blend and is not graded. The photograph has no Other ingredients heading. None is not printed. A steam-extracted oil, non-GMO guaranteed wild, organic under the box is a claim. Label directions say take five or more drops under the tongue or in juice/water twice daily, and also massage over the spine and mid-back, the face, the hands, and the feet. The page How to Take says five drops and omits or more. The facts serving is 5 drops. The printed digits are 6 35824 00002 0. A barcode read gives 635824000020. The check digit passes. This code is the 1 oz drops only. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b380-royal-oil-2',
    productName: 'North American Herb & Spice Royal Oil (2 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b380-royal-oil-2',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000341',
    activeIngredients: [
      { name: 'Undiluted, fresh royal jelly', strength: '1300 mg' },
      { name: 'Cold-pressed pumpkin seed oil', strength: '' },
      { name: 'Carob molasses', strength: '' },
      { name: 'Multi-spice blend (cinnamon, oregano, clove)', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/royal-oil/ shows the 2 Ounce at $42.99. The page SKU is 070. No stock word was on the page. The front says MAXIMUM STRENGTH, Stabilized, emulsified royal jelly, Royal Oil, and Healthy Adrenal Support. The front crop shows about 60 mL. The facts photograph prints Supplement Facts, Serving Size 1/2 tsp (3 grams), and Servings Per Container 20. There is no proprietary blend heading. Undiluted, fresh royal jelly is 1300 mg. Cold-pressed pumpkin seed oil, Carob molasses, and Multi-spice blend (cinnamon, oregano, clove) have no amounts. Those rows are actives and are not graded. The photograph has no Other ingredients heading. None is not printed. Label directions say take 1/2 tsp as needed under the tongue, use a clean spoon, and stir before use. The page How to Take says 1/2 teaspoon as often as needed. The facts serving is 1/2 tsp. The printed digits are 6 35824 00034 1. A barcode read gives 635824000341. The check digit passes. This code is the 2 oz jar only. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH380_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch380 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch380 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b380-rosemanol-1': { barcode: '635824000020', actives: 2, inactive: 0 },
  'nahs-b380-royal-oil-2': { barcode: '635824000341', actives: 4, inactive: 0 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch380 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch380 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch380 grade ${row.id}`);
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

const rosemanol = ROWS[0];
const royal = ROWS[1];
if (rosemanol?.inactiveIngredients.length !== 0 || rosemanol.activeIngredients[1]?.name !== 'Wild rosemary oil') {
  throw new Error('batch380 rosemanol');
}
if (!rosemanol.sourcesGeneral?.[0]?.includes('6 35824 00002 0')) throw new Error('batch380 rosemanol digits');
if (royal?.activeIngredients[0]?.strength !== '1300 mg' || royal.inactiveIngredients.length !== 0) {
  throw new Error('batch380 royal oil');
}
if (!royal.sourcesGeneral?.[0]?.includes('6 35824 00034 1')) throw new Error('batch380 royal digits');
if (
  ROWS.some((row) => ['635824000495', '635824000174', '635824006428'].includes(row.barcode ?? ''))
) {
  throw new Error('batch380 held upc attached');
}
