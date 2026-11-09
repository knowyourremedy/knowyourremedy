// DRAFT / not verified / batch 381 KYR6-e (t83u).
// TOTAL DAILY Purge+ 120 capsules. Facts-table rows are actives and are not graded.
// Thyroset, Total Body Purge, the bundles, the 2-pack, and both repellents stay off this file.

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

export const BATCH381_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b381-purge-plus-120',
    productName: 'North American Herb & Spice TOTAL DAILY Purge+ (120 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b381-purge-plus-120',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824005704',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '2800 mg' },
      { name: 'Raw, pulverized psyllium husks', strength: '' },
      { name: 'Raw, plant-based probiotics', strength: '' },
      { name: 'Raw, wild dandelion leaf extract', strength: '' },
      { name: 'Raw, wild burdock leaf extract', strength: '' },
      { name: 'Raw, pulverized organic fennel', strength: '' },
      { name: "Wild cat's claw powder", strength: '' },
      { name: 'Raw inulin', strength: '' },
      { name: 'Raw ginger root', strength: '' },
      { name: 'Raw enzyme mix (bromelain, papain, protease)', strength: '' },
      { name: 'Peppermint leaf', strength: '' },
      { name: 'Betaine HCL', strength: '' },
      { name: 'Organic slippery elm powder', strength: '' },
    ],
    inactiveIngredients: [{ ...CELLULOSE }],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/total-daily-purge/ shows one bottle at $45.99. The $39.09 figure is the subscribe 15% price, not the shelf price. The page SKU is 0432. No stock word was on the page. The front says Digestive Formula-Plus, TOTAL DAILY Purge+, and Healthy intestinal & colon support. The front crop shows 120 VEGI at the lower edge. The facts photograph prints Supplement Facts, Serving Size 4 capsules, and Servings Per Container 30. Proprietary blend is 2800 mg. The twelve rows have no separate amounts: Raw, pulverized psyllium husks, Raw, plant-based probiotics, Raw, wild dandelion leaf extract, Raw, wild burdock leaf extract, Raw, pulverized organic fennel, Wild cat\'s claw powder, Raw inulin, Raw ginger root, Raw enzyme mix (bromelain, papain, protease), Peppermint leaf, Betaine HCL, and Organic slippery elm powder. Those rows are actives and are not graded. Other ingredients: cellulose. That print is the bare cellulose lock. Label directions say take 2 or more capsules ten minutes before meals twice daily with water or diluted fruit juice, and during a cleanse take 4 capsules twice daily with plenty of fluids. The page How to Take repeats that dose and misspells fruit and capsules. The facts serving is 4 capsules. The printed digits are 6 35824 00570 4. A barcode read gives 635824005704. The check digit passes. This code is the 120 capsule bottle only. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH381_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch381 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch381 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b381-purge-plus-120': { barcode: '635824005704', actives: 13, inactive: 1 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch381 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch381 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch381 grade ${row.id}`);
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

const purge = ROWS[0];
if (purge?.inactiveIngredients[0]?.name !== 'cellulose') throw new Error('batch381 shell');
if (purge?.activeIngredients[0]?.strength !== '2800 mg' || purge.activeIngredients.length !== 13) {
  throw new Error('batch381 amounts');
}
if (!purge.sourcesGeneral[0]?.includes('6 35824 00570 4')) throw new Error('batch381 photo');
if (ROWS.some((row) => ['635824000235'].includes(row.barcode ?? ''))) {
  throw new Error('batch381 held upc attached');
}
