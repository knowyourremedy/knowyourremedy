// DRAFT / not verified / batch 383 KYR6-e (t83u).
// Purely-C 90 vegi-capsules. The iHerb back photograph supplies the full barcode.
// Blend rows are actives and are not graded. The bare cellulose print is the lock.
// OregaRESP 60, OregaRESP 90, PomaMAX, and Purely-E 60 stay off this file.

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

export const BATCH383_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b383-purely-c-90',
    productName: 'North American Herb & Spice Purely-C (90 vegi caps)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b383-purely-c-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb'],
    barcode: '635824000280',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '2100 mg' },
      { name: 'Wild, organic camu camu powder', strength: '' },
      { name: 'Acerola cherry powder', strength: '' },
      { name: 'Rhus coriaria powder', strength: '' },
      { name: 'Rose hip powder', strength: '' },
      { name: 'Vitamin C (from the above sources)', strength: '150 mg' },
    ],
    inactiveIngredients: [{ ...CELLULOSE }],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/purely-c/ shows the 90 Vegi-Capsules at $37.99. No stock word was on the brand page. The front says Dietary Supplement, Purely-C, Wild & Raw, and 90 (700 mg) vegi caps. The brand facts photograph prints Supplement Facts, Serving Size 3 capsules, and Servings per container 30. Proprietary blend is 2100 mg. The rows with no separate amounts are Wild, organic camu camu powder, Acerola cherry powder, Rhus coriaria powder, and Rose hip powder. Vitamin C (from the above sources) is 150 mg. That line is 250%. Those rows are actives and are not graded. Other ingredients: cellulose. That print is the bare cellulose lock. The next line, (100% GMO free) Contains no animal products, is a claim and is not a second token. Label directions say 3 capsules daily with meals. The brand barcode digits were cut off at the bottoms. A barcode reader returned 0635824000280 from those bars. That brand read was not confirmed. iHerb https://www.iherb.com/pr/north-american-herb-spice-purely-c-700-mg-90-vegicaps/13275 is the same 90 vegi-caps, in stock. Its front reads Purely-C, 90 (700 mg) vegi caps. Its back photograph prints the same facts, the same cellulose line, and the barcode digits 6 35824 00028 0. Those digits were read on the photograph. A barcode reader returned nothing from that photograph. UPC 635824000280. The check digit passes. The iHerb Specifications field repeats 635824000280. That field is retailer text. It is not the printed line, and it is not what confirms the code. LA91743 beside the bars is a lot code. It is not a UPC. The brand lot LA9017 matches page SKU 9017 and is not this UPC. This code is the 90 vegi-caps only. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH383_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch383 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch383 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b383-purely-c-90': { barcode: '635824000280', actives: 6, inactive: 1 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch383 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch383 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch383 grade ${row.id}`);
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
  if (!row.retailers.includes('iHerb')) throw new Error(`${row.id} carrier`);
}

const caps = ROWS[0];
if (caps?.inactiveIngredients[0]?.name !== 'cellulose') throw new Error('batch383 shell');
if (caps?.activeIngredients[0]?.strength !== '2100 mg' || caps.activeIngredients[5]?.strength !== '150 mg') {
  throw new Error('batch383 amounts');
}
if (!caps.sourcesGeneral[0]?.includes('6 35824 00028 0')) throw new Error('batch383 photo');
if (
  ROWS.some((row) =>
    ['335824000951', '635824002079', '635824002666', '635824002734'].includes(row.barcode ?? ''),
  )
) {
  throw new Error('batch383 held upc attached');
}
