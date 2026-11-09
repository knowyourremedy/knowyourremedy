// DRAFT / not verified / batch 379 KYR6-e (t83u).
// PurelyMin 90 vegi-capsules. Facts-table rows are actives and are not graded.
// The 2-pack, the drink mix, both Resp-Immune sizes, and both Resvital forms stay off this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
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

const CELLULOSE: IngredientFlag = {
  name: 'cellulose',
  riskLevel: 'cleared',
  source:
    'Methodology §5 Cleared. Sept 27, 2026: Cellulose maps to the cellulose family with powdered cellulose and microcrystalline cellulose. EFSA 2017: no carcinogenicity, no ADI needed. It does not stack. The label prints the bare word cellulose. It is not cellulose (vegi-capsule) and not Vegetable Cellulose Capsule.',
};

export const BATCH379_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b379-purelymin-90',
    productName: 'North American Herb & Spice PurelyMin (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b379-purelymin-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824009870',
    activeIngredients: [
      { name: 'Magnesium', strength: '279 mg' },
      { name: 'Magtein Magnesium L-Threonate', strength: '1000 mg' },
      { name: 'Magnesium Glycinate', strength: '414 mg' },
      { name: 'Magnesium Taurate', strength: '414 mg' },
      { name: 'L-Theanine', strength: '414 mg' },
    ],
    inactiveIngredients: [{ ...CELLULOSE }],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/purelymin/ shows one bottle at $44.99. No stock word was on the page. The front says Dietary Supplement, PurelyMIN, 3X MAGNESIUM, L-THEANINE BOOSTED, and 90 (750 mg) vegi caps. The facts photograph prints Supplement Facts, Serving Size 3 capsules, and Servings per container 30. Magnesium is 279 mg. That line is 66%. The next rows are (from 1000 mg Magtein™ Magnesium L-Threonate), (from 414 mg Magnesium Glycinate), and (from 414 mg Magnesium Taurate). L-Theanine is 414 mg. Those rows are actives and are not graded. Footnote 1 is not in the crop. The page list runs the names together. The photograph is the formula. Other ingredients: cellulose. That print is the bare cellulose lock. The next line, (100% GMO free) Contains no animal products, is a claim and is not a second token. Label directions say take one capsule 3 times daily. The page How to Take says three capsules one hour before sleep or as needed during the daytime. The facts serving is 3 capsules. The info sheet viewer was blank. The printed digits are 6 35824 00987 0. A barcode read gives 635824009870. The check digit passes. LA8100R1 beside the bars matches the page SKU 8100. That code is not a UPC. This code is the single bottle only. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH379_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch379 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch379 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b379-purelymin-90': { barcode: '635824009870', actives: 5, inactive: 1 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch379 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch379 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch379 grade ${row.id}`);
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

const min = ROWS[0];
if (min?.inactiveIngredients[0]?.name !== 'cellulose') throw new Error('batch379 shell');
if (min?.activeIngredients[0]?.strength !== '279 mg' || min.activeIngredients[4]?.strength !== '414 mg') {
  throw new Error('batch379 amounts');
}
if (!min.sourcesGeneral[0]?.includes('6 35824 00987 0') || min.sourcesGeneral[0]?.includes('cellulose (100% GMO free)')) {
  throw new Error('batch379 photo');
}
if (
  ROWS.some((row) =>
    ['635824006855', '635824007715', '635824007685', '635824000068', '635824000273'].includes(row.barcode ?? ''),
  )
) {
  throw new Error('batch379 held upc attached');
}
