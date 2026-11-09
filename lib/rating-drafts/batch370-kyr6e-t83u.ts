// DRAFT / not verified / batch 370 KYR6-e (t83u).
// Three North American Herb & Spice kid-e-kare droppers.
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

export const BATCH370_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b370-ear-eez-1',
    productName: 'North American Herb & Spice kid-e-kare Ear-eeZ (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b370-ear-eez-1',
    form: 'liquid',
    audience: 'kids',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824004097',
    activeIngredients: [
      { name: 'Proprietary blend in extra virgin olive oil', strength: '' },
      { name: 'Cold-pressed garlic oil', strength: '' },
      { name: 'Black seed oil', strength: '' },
      { name: 'Wild sage oil', strength: '' },
      { name: 'Wild bay leaf oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/kid-e-kare-ear-eez/ shows one 1 fl oz bottle. No stock word was on the page. The front says Dietary Supplement, Wild Ear-eeZ, and 1 FL. OZ. (30 ML.). The facts photograph prints Supplement Facts, Serving Size 3 drops, and Servings per container 287. The blend heading is Proprietary blend in extra virgin olive oil. The four rows have no amounts: Cold-pressed garlic oil, Black seed oil, Wild sage oil, and Wild bay leaf oil. Those rows are actives. The olive oil stays inside the blend heading. The photograph has no Other ingredients heading. None is not printed. Label directions say one or more drops into and behind the ear, and also one to five drops internally. The page How to Take uses the same words. The page ingredient list omits Wild sage oil. That omission is not the photograph. Visual barcode 6 35824 00409 7. UPC 635824004097. The check digit passes. Label code LA9005 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b370-elderberry-2',
    productName: 'North American Herb & Spice Kid-e-Kare Elderberry (2 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b370-elderberry-2',
    form: 'liquid',
    audience: 'kids',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824004233',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Organic Purple elderberry extract', strength: '' },
      { name: 'Purified Water', strength: '' },
      { name: 'Pomegranate syrup', strength: '' },
      { name: 'Mycelized cinnamon oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/kid-e-kare-elderberry/ shows one 2 fl oz bottle. No stock word was on the page. The front says Dietary Supplement, Elderberry, and 2 FL. OZ. (60 ML). The facts photograph prints Supplement Facts, Serving Size 1/2 dropperful, Servings per container 70, and Proprietary blend with no blend weight. The four rows have no amounts: Organic Purple elderberry extract, Purified Water, Pomegranate syrup, and Mycelized cinnamon oil. Those rows are actives and are not graded. The photograph has no Other ingredients heading. None is not printed. Label directions say 1/4 dropperful daily for children 1 to 3 years and 1/2 dropperful daily for children 4 years or older. The page How to Take uses the same doses. Page prose calls the cinnamon a water-soluble cinnamon extract. The photograph says Mycelized cinnamon oil. Visual barcode 6 35824 00423 3. UPC 635824004233. The check digit passes. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b370-kids-c-plus-2',
    productName: 'North American Herb & Spice kid-e-kare Kids-C Plus (2 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b370-kids-c-plus-2',
    form: 'liquid',
    audience: 'kids',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824004202',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Organic camu camu berry powder', strength: '' },
      { name: 'Wild acerola cherry powder', strength: '' },
      { name: 'Orange oil', strength: '' },
      { name: 'Clover honey', strength: '' },
      { name: 'Preservatrol', strength: '' },
      { name: 'Beet juice powder', strength: '' },
      { name: 'Purified water', strength: '' },
      { name: 'Vitamin C (from above sources)', strength: '30 mg' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/kid-kare-kids-c-plus/ shows one 2 fl oz bottle. No stock word was on the page. The front says Dietary Supplement, Raw Kids-C Plus, and 2 FL. OZ. (60 ML.). The facts photograph prints Supplement Facts, Serving Size 4 dropperful, Servings per container 20, and Proprietary blend with no blend weight. The rows have no amounts: Organic camu camu berry powder, Wild acerola cherry powder, Orange oil, Clover honey, Preservatrol, Beet juice powder, and Purified water. Vitamin C (from above sources) is 30 mg. Those rows are actives and are not graded. The photograph has no Other ingredients heading. None is not printed. Label directions and the page How to Take say four dropperfuls for the daily requirement. The page ingredient list omits Wild acerola cherry powder and spells preservatrol in lowercase. That list is not the photograph. Visual barcode 6 35824 00420 2. UPC 635824004202. The check digit passes. Label code LA9236 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH370_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch370 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch370 duplicate id');

const expected: Record<string, { barcode: string; actives: string[] }> = {
  'nahs-b370-ear-eez-1': {
    barcode: '635824004097',
    actives: [
      'Proprietary blend in extra virgin olive oil',
      'Cold-pressed garlic oil',
      'Black seed oil',
      'Wild sage oil',
      'Wild bay leaf oil',
    ],
  },
  'nahs-b370-elderberry-2': {
    barcode: '635824004233',
    actives: [
      'Proprietary blend',
      'Organic Purple elderberry extract',
      'Purified Water',
      'Pomegranate syrup',
      'Mycelized cinnamon oil',
    ],
  },
  'nahs-b370-kids-c-plus-2': {
    barcode: '635824004202',
    actives: [
      'Proprietary blend',
      'Organic camu camu berry powder',
      'Wild acerola cherry powder',
      'Orange oil',
      'Clover honey',
      'Preservatrol',
      'Beet juice powder',
      'Purified water',
      'Vitamin C (from above sources)',
    ],
  },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch370 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode ?? '')) throw new Error(`batch370 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'kids' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch370 grade ${row.id}`);
  }
  if (row.inactiveIngredients.length !== 0) throw new Error(`batch370 other ${row.id}`);
  const names = row.activeIngredients.map((ingredient) => ingredient.name);
  if (names.join('|') !== spec.actives.join('|')) throw new Error(`batch370 actives ${row.id}`);
  if (row.id === 'nahs-b370-kids-c-plus-2' && row.activeIngredients[8]?.strength !== '30 mg') {
    throw new Error('batch370 vitamin c');
  }
  const roll = computeVerdictFromInactiveIngredients(row.inactiveIngredients);
  if (roll.verdict !== 'clean') throw new Error(`batch370 rollup ${row.id}`);
  if (row.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) {
    throw new Error(`batch370 stack ${row.id}`);
  }
  for (const ingredient of row.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${ingredient.name}: ${why}`);
  }
  const source = row.sourcesGeneral.join(' ');
  if (banned.test(source) || source.includes('None is printed')) throw new Error(`batch370 source ${row.id}`);
}

const ear = ROWS[0]?.sourcesGeneral.join(' ') ?? '';
if (!ear.includes('6 35824 00409 7') || !ear.includes('Wild sage oil')) throw new Error('batch370 ear photo');
const berry = ROWS[1]?.sourcesGeneral.join(' ') ?? '';
if (!berry.includes('6 35824 00423 3') || !berry.includes('Pomegranate syrup')) throw new Error('batch370 berry photo');
const kids = ROWS[2]?.sourcesGeneral.join(' ') ?? '';
if (!kids.includes('6 35824 00420 2') || !kids.includes('Preservatrol') || !kids.includes('Wild acerola cherry powder')) {
  throw new Error('batch370 kids photo');
}
