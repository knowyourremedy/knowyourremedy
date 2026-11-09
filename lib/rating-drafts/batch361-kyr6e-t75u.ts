// DRAFT / not verified / batch 361 KYR6-e (t75u).
// One North American Herb & Spice black cumin seed oil bottle, 32 fl oz.
// PureFormulas sells this single. The brand file is the second complete label.
// The facts-table oil is the active and is not graded. No other material is named.
// None is not printed. The Sprouts section is not edited. No new locks.

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
const ID = 'nahs-b361-black-seed-oil-32';
const UPC = '635824009153';

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH361_KYR6E_T75U: RatingRecord[] = [
  finish({
    id: ID,
    productName: 'North American Herb & Spice Black Seed Oil (32 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: FORMULA,
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['PureFormulas'],
    barcode: UPC,
    activeIngredients: [{ name: 'Black Cumin (seed) Oil', strength: '5 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. PureFormulas https://www.pureformulas.com/product/oil-of-black-seed-by-north-american-herb-and-spice/1000055598 is the US page that sells this 32 fl oz (960 ml) single. Buy once $63.74. The page says 1 In Stock. Item NAHS1282 and MFG 9141 are separate page codes. The photographed label is headed Supplements Facts. Serving Size 1 tsp. (5g). Servings Per Container 192. Calories 45. Calories from fat 45. Total Fat 5g, 7.5%. Saturated Fat 1g, 5%. Trans Fat 0g, 0%. Black Cumin (seed) Oil 5g. Thymoquinone 40mg, with no percent printed on that row. Omega-6 2.75g, 55%. Omega-9 1.3g, 26%. Those table rows are not other ingredients. Ingredients: 100% cold-pressed extra virgin black cumin seed oil (Nigella sativa). Guaranteed Non-GMO is a separate claim. The panel names no material besides that oil and has no Other ingredients heading. None is not printed. The oil is the active and is not graded. Counted Limited tokens: none. The printed barcode digits were visually read as 6 35824 00915 3; its UPC check digit validates. The PureFormulas UPC text is the same 635824009153. The bottle is amber. The label does not name the bottle material. The second complete label is the brand file https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/BlackSeed-32oz-1920x1900_Right.png, gallery image 3 on https://www.northamericanherbandspice.com/shop/black-seed-oil-2-pack/. That file prints the same 192 servings, the same facts rows including Thymoquinone 40mg and both omega lines, the same Ingredients sentence, and the same visual barcode. https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/BlackSeed-32oz-1920x1900_Left.png prints 32 FL OZ on that bottle and the direction Take one teaspoon daily. This photograph is the 32 fl oz label. The 16 oz 2-pack listing stays its own unresolved pack. The written 16 oz single keeps UPC 635824009146. Twelve retailer searches were completed and did not open another exact 32 fl oz page. The Walgreens query for this 32 fl oz bottle was not attempted.',
    ],
  }),
];

const ROWS = BATCH361_KYR6E_T75U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
const OTHER_OIL_UPCS = new Set(['635824006725', '635824009160', '635824009146']);

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch361 count ${ROWS.length}`);
if (ROWS[0]?.id !== ID) throw new Error('batch361 id');
if (ROWS[0]?.formulaId !== FORMULA) throw new Error('batch361 formula');
if (ROWS[0]?.category !== 'Herbs') throw new Error('batch361 tab');
if (ROWS[0]?.retailers.join('|') !== 'PureFormulas') throw new Error('batch361 retailer');
if ((ROWS[0]?.barcode ?? '') !== UPC || OTHER_OIL_UPCS.has(ROWS[0]?.barcode ?? '')) throw new Error('batch361 upc');
if (!upcCheck(UPC)) throw new Error('batch361 check digit');
if (ROWS[0]?.inactiveIngredients.length !== 0) throw new Error('batch361 tokens');
if (ROWS[0]?.inactiveIngredients.some((ingredient) => /none/i.test(ingredient.name))) throw new Error('batch361 none');
if (ROWS[0]?.activeIngredients.length !== 1 || ROWS[0]?.activeIngredients[0]?.strength !== '5 g') throw new Error('batch361 oil');
const source = (ROWS[0]?.sourcesGeneral ?? []).join('\n') ?? '';
for (const needle of [
  '192',
  'Thymoquinone 40mg',
  'Omega-6 2.75g',
  'Omega-9 1.3g',
  '100% cold-pressed extra virgin black cumin seed oil (Nigella sativa)',
  'https://www.pureformulas.com/product/oil-of-black-seed-by-north-american-herb-and-spice/1000055598',
  'https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/BlackSeed-32oz-1920x1900_Right.png',
  '635824009146',
  'Walgreens',
]) {
  if (!source.includes(needle)) throw new Error('batch361 source ' + needle);
}
if (/brand selector|for sale exception|Select a Size includes 32/i.test(source)) throw new Error('batch361 sale wording');
const roll = computeVerdictFromInactiveIngredients(ROWS[0]!.inactiveIngredients);
if (roll.verdict !== 'clean' || ROWS[0]?.verdict !== 'clean') throw new Error('batch361 verdict');
if (ROWS[0]?.honestNote) throw new Error('batch361 note');
if (ROWS[0]?.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) throw new Error('batch361 stack');
for (const ingredient of ROWS[0]?.inactiveIngredients ?? []) {
  const why = plainIngredientWhy(ingredient);
  if (!why || banned.test(why)) throw new Error(`${ID} ${ingredient.name}: ${why}`);
}
