// DRAFT / not verified / batch 360 KYR6-e (t75u).
// Four North American Herb & Spice black cumin seed oil bottles.
// The facts-table oil is the active and is not graded. No other material is named.
// None is not printed. The Sprouts section is not edited. No new locks.
// Absorb-Max, Cardio Plus, and the gelcaps stay unwritten.

import type { RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const FORMULA = 'nahs-b360-black-seed-oil';

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const OIL = [{ name: 'Black Cumin (seed) Oil', strength: '5 g' }] as const;

export const BATCH360_KYR6E_T75U: RatingRecord[] = [
  finish({
    id: 'nahs-b360-black-seed-oil-8',
    productName: 'North American Herb & Spice Black Seed Oil (8 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: FORMULA,
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006725',
    activeIngredients: OIL.map((active) => ({ ...active })),
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/oil-of-black-seed/ Select a Size includes 8 Ounce Cold-Pressed. That choice is its own single. The page price range was $39.99–$69.99. The selected subscription price shown for this 8 oz was $33.99. No SKU field was on the page. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/BlackSeed-8oz_1920x1900_Right.png is headed Supplements Facts. Serving Size 1 tsp. (5g). Servings Per Container 48. Black Cumin (seed) Oil 5g. Thymoquinone 40mg. Omega-6 2.75g. Omega-9 1.3g. Calories 45. Those table rows are not other ingredients. Ingredients: 100% cold-pressed extra virgin black cumin seed oil (Nigella sativa). Guaranteed Non-GMO is a separate claim. The panel names no material besides that oil and has no Other ingredients heading. None is not printed. The oil is the active and is not graded. Counted Limited tokens: none. The facts label prints 6 35824 00672 5. The printed barcode digits were visually read as 6 35824 00672 5; its UPC check digit validates. The page list says black nigella. The photograph says black cumin. The photograph is the formula. This is the regular 8 oz selector choice, not the 100% glass bottle, not the 12 oz, and not the 16 oz.',
    ],
  }),
  finish({
    id: 'nahs-b360-black-seed-oil-8-glass',
    productName: 'North American Herb & Spice Black Seed Oil, 100% Glass Bottle (8 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: FORMULA,
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006725',
    activeIngredients: OIL.map((active) => ({ ...active })),
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/oil-of-black-seed/ Select a Size includes 8 Ounce Cold-Pressed 100% Glass Bottle. https://www.northamericanherbandspice.com/shop/black-seed-oil-glass-bottle/ is that same glass single, one-time $37.99, not a second pack. The glass facts image https://www.northamericanherbandspice.com/wp-content/uploads/2025/03/BlackSeed-8oz-GLASS-1920x1900_Right.png is headed Supplements Facts. Serving Size 1 tsp. (5g). Servings Per Container 48. Black Cumin (seed) Oil 5g. Thymoquinone 40mg. Omega-6 2.75g. Omega-9 1.3g. Ingredients: 100% cold-pressed extra virgin black cumin seed oil (Nigella sativa). No Other ingredients heading. None is not printed. The oil is the active and is not graded. Counted Limited tokens: none. The glass directions image https://www.northamericanherbandspice.com/wp-content/uploads/2025/03/BlackSeed-8oz-GLASS-1920x1900_Left.png prints 6 35824 00672 5 and label code LA9138R1. The printed barcode digits were visually read as 6 35824 00672 5; its UPC check digit validates. That code was read on this bottle. It matches the regular 8 oz code. Both inactive lists are empty, so this is not the same-UPC conflict that holds a pack when the inactive lines differ. Methodology §4 says a multipack is not a row. Each of these selector choices is a single the brand page shows for sale, with its own panel. No retailer page identified the glass bottle. That does not replace this brand panel.',
    ],
  }),
  finish({
    id: 'nahs-b360-black-seed-oil-12',
    productName: 'North American Herb & Spice Black Seed Oil (12 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: FORMULA,
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'PureFormulas'],
    barcode: '635824009160',
    activeIngredients: OIL.map((active) => ({ ...active })),
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/oil-of-black-seed/ Select a Size includes 12 Ounce Cold-Pressed. The selected subscription price shown was $40.79. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/Black-Seed-12oz-PURE-1920x1900-Right.png is headed Supplements Facts. Serving Size 1 tsp. (5g). Servings Per Container 72. Black Cumin (seed) Oil 5g. Thymoquinone 40mg. Omega-6 2.75g. Omega-9 1.3g. Ingredients: 100% cold-pressed extra virgin black cumin seed oil (Nigella sativa). No Other ingredients heading. None is not printed. The oil is the active and is not graded. Counted Limited tokens: none. The facts label prints 6 35824 00916 0. The printed barcode digits were visually read as 6 35824 00916 0; its UPC check digit validates. PureFormulas https://www.pureformulas.com/product/oil-of-black-seed-by-north-american-herb-and-spice/1000055598 on the 12 fl oz choice lists the same UPC text, 72 servings, and the same oil line. Its page puts that oil under Ingredients and not under an Other ingredients heading. This is not the 8 oz and not the 16 oz.',
    ],
  }),
  finish({
    id: 'nahs-b360-black-seed-oil-16',
    productName: 'North American Herb & Spice Black Seed Oil (16 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: FORMULA,
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'PureFormulas'],
    barcode: '635824009146',
    activeIngredients: OIL.map((active) => ({ ...active })),
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/oil-of-black-seed/ Select a Size includes 16 Ounce Cold-Pressed. The selected subscription price shown was $59.49. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/BlackSeed-16oz-1920x1900_Right-1.png is headed Supplements Facts. Serving Size 1 tsp. (5g). Servings Per Container 96. Black Cumin (seed) Oil 5g. Thymoquinone 40mg. Omega-6 2.75g. Omega-9 1.3g. Ingredients: 100% cold-pressed extra virgin black cumin seed oil (Nigella sativa). No Other ingredients heading. None is not printed. The oil is the active and is not graded. Counted Limited tokens: none. The directions image https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/BlackSeed-16oz-1920x1900_Left-1.png prints 6 35824 00914 6 and label code LA9139R1. The printed barcode digits were visually read as 6 35824 00914 6; its UPC check digit validates. PureFormulas https://www.pureformulas.com/product/oil-of-black-seed-by-north-american-herb-and-spice/1000055598 on the 16 fl oz choice lists the same UPC text, 96 servings, and the same oil line. This is the 16 oz single. The same PureFormulas selector also shows 32 fl oz. That 32 fl oz choice is the separate single nahs-b361-black-seed-oil-32, UPC 635824009153.',
    ],
  }),
];

const ROWS = BATCH360_KYR6E_T75U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
const EXPECTED_UPC: Record<string, string> = {
  'nahs-b360-black-seed-oil-8': '635824006725',
  'nahs-b360-black-seed-oil-8-glass': '635824006725',
  'nahs-b360-black-seed-oil-12': '635824009160',
  'nahs-b360-black-seed-oil-16': '635824009146',
};
const EXPECTED_SERVINGS = ['48', '48', '72', '96'];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 4) throw new Error(`batch360 count ${ROWS.length}`);
const ids = new Set(ROWS.map((record) => record.id));
if (ids.size !== 4) throw new Error('batch360 duplicate id');
ROWS.forEach((record, index) => {
  if (record.category !== 'Herbs') throw new Error(record.id + ' tab');
  if (record.formulaId !== FORMULA) throw new Error(record.id + ' formula');
  if (record.inactiveIngredients.length !== 0) throw new Error(record.id + ' tokens');
  if (record.inactiveIngredients.some((ingredient) => /none/i.test(ingredient.name))) throw new Error(record.id + ' none');
  if ((record.barcode ?? '') !== EXPECTED_UPC[record.id]) throw new Error(record.id + ' upc ' + record.barcode);
  if (!record.barcode || !upcCheck(record.barcode)) throw new Error(record.id + ' check digit');
  if (!record.sourcesGeneral.some((source) => source.includes(EXPECTED_SERVINGS[index]))) throw new Error(record.id + ' servings');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean' || record.verdict !== 'clean') throw new Error(record.id + ' ' + record.verdict);
  const counted = record.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient));
  if (counted.length !== 0) throw new Error(record.id + ' stack');
  if (record.honestNote) throw new Error(record.id + ' note ' + record.honestNote);
  if (record.activeIngredients.length !== 1 || record.activeIngredients[0]?.strength !== '5 g') throw new Error(record.id + ' oil');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
});
if (ROWS[0]?.barcode !== ROWS[1]?.barcode) throw new Error('8 oz codes differ');
