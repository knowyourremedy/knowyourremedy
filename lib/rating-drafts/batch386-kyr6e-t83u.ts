// DRAFT / not verified / batch 386 KYR6-e (t83u).
// PureFormulas and HerbsPro ladder. One 90-capsule hold whose brand
// panel matches the HerbsPro panel and whose package photograph now
// shows all 12 digits. Token holds, page-text panels, and the spray stay off this file.

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

export const BATCH386_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b386-resvital-90',
    productName: 'North American Herb & Spice Resvital (90 vegi caps)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b386-resvital-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'HerbsPro'],
    barcode: '635824000068',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1000 mg' },
      { name: 'Red sour grape powder', strength: '' },
      { name: 'Potassium', strength: '31 mg' },
      { name: 'Vitamin C', strength: '3.3 mg' },
      { name: 'Chromium', strength: '' },
    ],
    inactiveIngredients: [{ ...CELLULOSE }],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/resvital/ shows the range $35.69 through $39.99. The 90 capsule shelf on that page is $39.99. The 4.23 oz powder is the $35.69 end and stays its own hold. No stock word was on the brand page. The brand facts photograph prints Supplement Facts, Serving Size 2 capsules, Servings per container 45, and proprietary blend 1000 mg. Red sour grape powder, Potassium 31 mg, Vitamin C 3.3 mg, and Chromium have no amounts inside the blend. Vitamin C is 4%. Those rows are actives and are not graded. Other ingredients: cellulose. That print is the bare cellulose lock. (100% GMO free) Contains no animal products is a claim and is not a second token. The front says 90 VEGI CAPS. Label directions say one capsule daily. The facts serving is 2 capsules. HerbsPro https://www.herbspro.com/products/resvital-63675 prints the same rows. Other Ingredients: cellulose. Our Price is $29.74. M.R.P. $34.99 is not the shelf price. The page says In Stock. SKU 63675. HerbsPro suggestions say take two or more capsules twice daily with meals. The facts serving stays 2 capsules. The package photograph prints 6 35824 00006 8. The check digit passes. UPC 635824000068. This code is the 90 capsules only. The powder code was not borrowed. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH386_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch386 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch386 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b386-resvital-90': { barcode: '635824000068', actives: 5, inactive: 1 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch386 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch386 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch386 grade ${row.id}`);
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
  if (!row.retailers.includes('North American Herb & Spice') || !row.retailers.includes('HerbsPro')) {
    throw new Error(`${row.id} carrier`);
  }
}

const resvital = ROWS[0];
if (resvital?.inactiveIngredients[0]?.name !== 'cellulose' || resvital?.activeIngredients[0]?.strength !== '1000 mg') {
  throw new Error('batch386 resvital');
}
if (
  ROWS.some((row) =>
    [
      '635824000112',
      '635824000679',
      '635824002734',
      '635824004219',
      '635824007654',
      '335824000937',
    ].includes(row.barcode ?? ''),
  )
) {
  throw new Error('batch386 held upc attached');
}
