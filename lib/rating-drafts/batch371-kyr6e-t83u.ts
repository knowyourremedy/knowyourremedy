// DRAFT / not verified / batch 371 KYR6-e (t83u).
// Two North American Herb & Spice kid-e-kare droppers.
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

export const BATCH371_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b371-kidscalm-1',
    productName: 'North American Herb & Spice kid-e-kare KidsCalm (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b371-kidscalm-1',
    form: 'liquid',
    audience: 'kids',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824004158',
    activeIngredients: [
      { name: 'Proprietary blend in extra virgin olive oil', strength: '' },
      { name: 'CO₂-extracted hops', strength: '' },
      { name: 'Oregano oil', strength: '' },
      { name: 'Organic CO₂-extracted chamomile', strength: '' },
      { name: 'Cinnamon oil', strength: '' },
      { name: 'Yacon syrup', strength: '' },
      { name: 'Mint oil', strength: '' },
      { name: 'Orange oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/kid-e-kare-kidscalm/ shows one 1 fl oz bottle. A SALE badge is on the page. No stock word was on the page. The front says Dietary Supplement, KidsCalm, and 1 FL. OZ. (30 ML.). The facts photograph prints Supplement Facts, Serving Size 5 drops, and Servings per container 172. The blend heading is Proprietary blend in extra virgin olive oil. The seven rows have no amounts: CO₂-extracted hops, Oregano oil, Organic CO₂-extracted chamomile, Cinnamon oil, Yacon syrup, Mint oil, and Orange oil. Those rows are actives and are not graded. Yacon syrup stays inside the blend. The olive oil stays inside the blend heading. The photograph has no Other ingredients heading. None is not printed. Label directions say take 5 or more drops in milk, juice, or smoothies, and the drops may also be used as a rub. The page How to Take uses the same words. The page ingredient list spells Cinnanom oil. The photograph says Cinnamon oil. Visual barcode 6 35824 00415 8. UPC 635824004158. The check digit passes. Label code LA9027 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b371-orega-cinn-2',
    productName: 'North American Herb & Spice kid-e-kare Orega-cinn (2 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b371-orega-cinn-2',
    form: 'liquid',
    audience: 'kids',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824004141',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Spring water', strength: '' },
      { name: 'Yacon syrup', strength: '' },
      { name: 'Goldenberry syrup', strength: '' },
      { name: 'Wild oregano extract', strength: '' },
      { name: 'Oil of cinnamon', strength: '' },
      { name: 'Wild, raw raspberry extract', strength: '' },
      { name: 'Raspberry powder', strength: '' },
      { name: 'Beet juice powder', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/kid-e-kare-orega-cinn-oil/ shows one 2 fl oz dropper. No stock word was on the page. The front says Dietary Supplement, Orega-cinn, Cinnamon-flavored oregano oil, and 2 FL. OZ. (60 ML.). The facts photograph prints Supplement Facts, Serving Size 10 drops, and Servings per container 120. The blend heading is Proprietary blend with no blend weight. The eight rows have no amounts: Spring water, Yacon syrup, Goldenberry syrup, Wild oregano extract, Oil of cinnamon, Wild, raw raspberry extract, Raspberry powder, and Beet juice powder. Those rows are actives and are not graded. Yacon syrup and Goldenberry syrup stay inside the blend. The photograph has no Other ingredients heading. None is not printed. non-GMO is printed outside the facts panel and stays a claim. Label directions say take 10 or more drops daily or as needed, mixed in milk, juice, water, or food. The page How to Take uses the same words. The page ingredient list says cinnamon oil. The photograph says Oil of cinnamon. Visual barcode 6 35824 00414 1. UPC 635824004141. The check digit passes. Label code LA9009R1 is not a UPC. This code belongs to the dropper. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH371_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch371 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch371 duplicate id');

const expected: Record<string, { barcode: string; actives: string[] }> = {
  'nahs-b371-kidscalm-1': {
    barcode: '635824004158',
    actives: [
      'Proprietary blend in extra virgin olive oil',
      'CO₂-extracted hops',
      'Oregano oil',
      'Organic CO₂-extracted chamomile',
      'Cinnamon oil',
      'Yacon syrup',
      'Mint oil',
      'Orange oil',
    ],
  },
  'nahs-b371-orega-cinn-2': {
    barcode: '635824004141',
    actives: [
      'Proprietary blend',
      'Spring water',
      'Yacon syrup',
      'Goldenberry syrup',
      'Wild oregano extract',
      'Oil of cinnamon',
      'Wild, raw raspberry extract',
      'Raspberry powder',
      'Beet juice powder',
    ],
  },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch371 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode ?? '')) throw new Error(`batch371 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'kids' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch371 grade ${row.id}`);
  }
  if (row.inactiveIngredients.length !== 0) throw new Error(`batch371 other ${row.id}`);
  const names = row.activeIngredients.map((ingredient) => ingredient.name);
  if (names.join('|') !== spec.actives.join('|')) throw new Error(`batch371 actives ${row.id}`);
  const roll = computeVerdictFromInactiveIngredients(row.inactiveIngredients);
  if (roll.verdict !== 'clean') throw new Error(`batch371 rollup ${row.id}`);
  if (row.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) {
    throw new Error(`batch371 stack ${row.id}`);
  }
  for (const ingredient of row.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${ingredient.name}: ${why}`);
  }
  const source = row.sourcesGeneral.join(' ');
  if (banned.test(source) || source.includes('None is printed')) throw new Error(`batch371 source ${row.id}`);
}

const calm = ROWS[0]?.sourcesGeneral.join(' ') ?? '';
if (!calm.includes('6 35824 00415 8') || !calm.includes('Yacon syrup') || !calm.includes('used as a rub')) {
  throw new Error('batch371 kidscalm photo');
}
const cinn = ROWS[1]?.sourcesGeneral.join(' ') ?? '';
if (!cinn.includes('6 35824 00414 1') || !cinn.includes('Goldenberry syrup') || !cinn.includes('Oil of cinnamon')) {
  throw new Error('batch371 orega-cinn photo');
}
if (cinn.includes('635824004722') || calm.includes('BSE-free beef gelatin capsules')) {
  throw new Error('batch371 held strings leaked');
}
