// DRAFT / not verified / batch 377 KYR6-e (t83u).
// Pine Power Plus and PolarPower 8 fl oz. Facts-table rows are actives and are not graded.
// None is not stored. The 60-softgel UPC is not on a row.

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

export const BATCH377_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b377-pinepower-1',
    productName: 'North American Herb & Spice Pine Power Plus',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b377-pinepower-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824009184',
    activeIngredients: [
      { name: 'Purified water', strength: '' },
      { name: 'Raw red & white pine needle extract', strength: '' },
      { name: 'Raw, wild spruce needle extract', strength: '' },
      { name: 'Raw, organic apple cider vinegar', strength: '' },
      { name: 'Wild oil of oregano P73', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/pine-power-plus/ is $39.99. A monthly price of $33.99 is also shown. No stock word was on the page. The front says Raw Red & White Pine Needle Extract Plus and PinePower. The front crop does not print a volume. The facts photograph prints Supplement Facts, Serving Size 1 tablespoon, and Servings per container 23. The rows are Purified water, Raw red & white pine needle extract, Raw, wild spruce needle extract, Raw, organic apple cider vinegar, and Wild oil of oregano P73. No amounts are printed. Those rows are actives and are not graded. There is no proprietary blend heading. The photograph has no Other ingredients heading. None is not printed. A 100% raw, wild food extract and Remote-source, non-GMO, solvent-free are claims under the box. Label directions say take one tablespoon daily in juice, water, or smoothies, do not put it in hot water, and shake well before using. The facts serving is 1 tablespoon. The printed digits are 6 35824 00918 4. A barcode read gives 635824009184. The check digit passes. This code is the single bottle only. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b377-polarpower-8',
    productName: 'North American Herb & Spice PolarPower (8 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b377-polarpower-8',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824002802',
    activeIngredients: [
      { name: 'Alaskan sockeye salmon oil', strength: '4700 mg' },
      { name: 'Omega-3s', strength: '1022 mg' },
      { name: 'EPA', strength: '395 mg' },
      { name: 'DHA', strength: '361 mg' },
      { name: 'Omega-6s', strength: '103 mg' },
      { name: 'Omega-9s', strength: '1040 mg' },
      { name: 'Vitamin A', strength: '2000 IU' },
      { name: 'Vitamin D', strength: '500 IU' },
      { name: 'Astaxanthin', strength: '120 mcg' },
      { name: 'Wild rosemary extract', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/polarpower/ Select a Size includes 8 fl oz. at $44.99 and 60 Softgels at $39.99. No stock word was on the page. The page says 1 Month Supply per Bottle. The 8 fl oz front says Dietary Supplement and Alaskan Wild PolarPOWER. The facts photograph prints Supplement Facts, Serving Size 1 teaspoon, and Servings Per Container 48. The rows are Alaskan sockeye salmon oil 4700 mg, Omega-3s 1022 mg, EPA 395 mg, DHA 361 mg, Omega-6s 103 mg, Omega-9s 1040 mg, Vitamin A 2000 IU, Vitamin D 500 IU, Astaxanthin 120 mcg, and Wild rosemary extract. Vitamin A is 67%. Vitamin D is 250%. Wild rosemary extract has no amount. Those rows are actives and are not graded. The page What’s Inside quotes vitamin A at 4,000 IU and vitamin D at 600 IU. The photograph is the formula. The photograph has no Other ingredients heading. None is not printed. The 60-softgel gelatin line is a different form. Label directions say take one or more teaspoons daily and that it may be mixed with smoothies, food, and drinks. The facts serving is 1 teaspoon. The page How to Take says one teaspoon and omits or more. The printed digits are 6 35824 00280 2. A barcode read gives 635824002802. The check digit passes. This code is the 8 fl oz oil only. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH377_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch377 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch377 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b377-pinepower-1': { barcode: '635824009184', actives: 5, inactive: 0 },
  'nahs-b377-polarpower-8': { barcode: '635824002802', actives: 10, inactive: 0 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch377 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch377 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch377 grade ${row.id}`);
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

const pine = ROWS[0];
const oil = ROWS[1];
if (pine?.activeIngredients[0]?.name !== 'Purified water' || pine.inactiveIngredients.length !== 0) throw new Error('batch377 pine');
if (!pine.sourcesGeneral[0]?.includes('6 35824 00918 4')) throw new Error('batch377 pine digits');
if (oil?.activeIngredients.at(-1)?.name !== 'Wild rosemary extract' || oil.activeIngredients.at(-1)?.strength !== '') {
  throw new Error('batch377 oil rosemary');
}
if (oil.inactiveIngredients.length !== 0) throw new Error('batch377 oil other');
if (!oil.sourcesGeneral[0]?.includes('6 35824 00280 2')) throw new Error('batch377 oil digits');
if (ROWS.some((row) => ['635824002819', '635824002666', '635824007418', '635824000679'].includes(row.barcode ?? ''))) {
  throw new Error('batch377 held upc attached');
}
