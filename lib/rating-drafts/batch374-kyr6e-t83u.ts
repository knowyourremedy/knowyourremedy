// DRAFT / not verified / batch 374 KYR6-e (t83u).
// Neuroloft Essence, now with a full barcode, and OregaMax 90 capsules.
// Blend rows are actives and are not graded. None is not stored.

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

export const BATCH374_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b374-neuroloft-12',
    productName: 'North American Herb & Spice Neuroloft Essence (12 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b374-neuroloft-12',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824002413',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Wild oregano essence', strength: '' },
      { name: 'Wild rosemary essence', strength: '' },
      { name: 'Rose petal essence', strength: '' },
      { name: 'Orange blossom essence', strength: '' },
      { name: 'Wild sage essence', strength: '' },
      { name: 'Pomegranate syrup', strength: '' },
      { name: 'Sugar (from pomegranate)', strength: '3 g' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/neuroloft-essence/?attribute_pa_size=12-ounce-aromatic-essence-complex shows one 12 fl oz bottle. No stock word was on the page. The front says Dietary Supplement, Neuroloft, and 12 FL. OZ. (355 ML). The facts photograph prints Supplement Facts, Serving Size 2 tablespoons, Servings per container 12, and Proprietary blend with no printed total. The rows are Wild oregano essence, Wild rosemary essence, Rose petal essence, Orange blossom essence, Wild sage essence, Pomegranate syrup, and Sugar (from pomegranate) 3 g. Those rows are actives and are not graded. Pomegranate syrup and Sugar (from pomegranate) stay inside the blend. The photograph has no Other ingredients heading. None is not printed. Label directions say 1/2 ounce or more twice daily in juice or water. The page How to Take omits or more. The packet 8 crops showed the tail 824 00241 and check digit 3. The new photographs print the full digits 6 35824 00241 3. A barcode read of the rotated entire label and the gallery facts photograph gives 635824002413. The check digit passes. This is the same 12 fl oz bottle. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b374-oregamax-90',
    productName: 'North American Herb & Spice OregaMax (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b374-oregamax-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000044',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '550 mg' },
      { name: 'Wild, high-mountain oregano (herb)', strength: '' },
      { name: 'Wild Rhus coriaria (sumac) (fruit)', strength: '' },
      { name: 'Organic garlic (bulb)', strength: '' },
      { name: 'Organic onion (bulb)', strength: '' },
    ],
    inactiveIngredients: [{ ...CELLULOSE }],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/oregamax/?attribute_pa_size=90-vegi-gelcaps shows the 90 vegi-gelcap choice. No stock word was on the page. The front says Dietary Supplement, OregaMax, and 90 VEGI CAPS. The facts photograph prints Supplement Facts, Serving size 1 capsule, Servings per container 90, and Proprietary blend 550 mg. The four rows have no amounts: Wild, high-mountain oregano (herb), Wild Rhus coriaria (sumac) (fruit), Organic garlic (bulb), and Organic onion (bulb). Those rows are actives and are not graded. Other ingredients: cellulose. That print is the bare cellulose lock. The next line, (100% GMO free). Contains no animal products., is a claim and is not a second token. Box-free, save a tree is a claim. Label directions say one capsule daily, and for young children or pets open the capsules and mix with food or drink. The page How to Take uses those doses and omits For best results use daily. The page list spells high-moutain. The photograph says high-mountain. The printed digits are 6 35824 00004 4. UPC 635824000044. The check digit passes. A pointer covers part of the bars, so a barcode reader did not decode this crop. The printed digits are complete. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH374_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch374 count ${ROWS.length}`);
const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b374-neuroloft-12': { barcode: '635824002413', actives: 8, inactive: 0 },
  'nahs-b374-oregamax-90': { barcode: '635824000044', actives: 5, inactive: 1 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch374 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch374 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch374 grade ${row.id}`);
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

const loft = ROWS[0];
const max = ROWS[1];
if (!loft?.sourcesGeneral[0]?.includes('6 35824 00241 3') || loft.inactiveIngredients.length !== 0) throw new Error('batch374 loft');
if (!loft.activeIngredients.some((item) => item.name === 'Sugar (from pomegranate)' && item.strength === '3 g')) {
  throw new Error('batch374 sugar');
}
if (max?.inactiveIngredients[0]?.name !== 'cellulose') throw new Error('batch374 shell');
if (!max.sourcesGeneral[0]?.includes('6 35824 00004 4') || max.sourcesGeneral[0]?.includes('cellulose (100% GMO free)')) {
  throw new Error('batch374 max photo');
}
if (ROWS.some((row) => ['635824002291', '635824005988', '635824002424', '635824002420', '635824006046', '635824006787', '635824006077'].includes(row.barcode ?? ''))) {
  throw new Error('batch374 held upc attached');
}
