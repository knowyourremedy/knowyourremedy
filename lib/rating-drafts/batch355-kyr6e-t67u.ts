// DRAFT / not verified / batch 355 KYR6-e (t67u).
// Zand Cherry & Honey 4 oz. Other Ingredients: None. Same active as the 8 oz.
// The Sprouts section is not edited. No new locks.

import type { RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH355_KYR6E_T67U: RatingRecord[] = [
  finish({
    id: 'zand-b355-cherry-honey-4',
    productName: 'Zand Cherry and Honey Soothing Wellness Syrup (4 fl oz)',
    brand: 'Zand',
    category: 'Cold & Flu',
    formulaId: 'zand-b355-cherry-honey-4',
    form: 'syrup',
    audience: 'adult',
    minAge: 1,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '022318730493',
    activeIngredients: [
      {
        name: 'Cherry & Honey Syrup (Organic Raw Honey, Organic Apple Cider Vinegar, Organic Black Cherry Juice Concentrate, Organic Lemon Juice Concentrate, Umckaloabo Root Extract, Black Cherry Bark Extract, Marshmallow Root Extract, Organic Echinacea Purpurea, Peppermint Oil)',
        strength: '5.6 g',
      },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't67u. The user supplied the 4 oz panel: Other Ingredients: None. No other ingredient was added. The active line is the same formula as zand-b301-cherry-honey-syrup-8: Cherry & Honey Syrup 5.6 g. Those syrup parts are the active and are not graded again. https://www.zandimmunity.com/products/cherry-honey-soothing-throat-syrup lists the 4 oz in stock at $16.39. The variant barcode field lists 022318730493. The check digit passes. Counted Limited tokens: none. There is no ingredient tab because the other-ingredients line prints None. This is not the 8 oz row. The 8 oz facts image prints about 48 servings, and that count was not copied onto the 4 oz.',
    ],
  }),
];

const ROWS = BATCH355_KYR6E_T67U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (ROWS.length !== 1) throw new Error(`batch355 count ${ROWS.length}`);
for (const record of ROWS) {
  if (record.id === 'zand-b301-cherry-honey-syrup-8') throw new Error('duplicate 8 oz');
  if (record.inactiveIngredients.length !== 0) throw new Error(record.id + ' tokens');
  if (!upcCheck(record.barcode ?? '')) throw new Error(record.id + ' upc');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean' || record.verdict !== 'clean') throw new Error(record.id + ' ' + record.verdict);
  const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(record.id + ' count');
  if (record.honestNote) throw new Error(record.id + ' note ' + record.honestNote);
  if (record.activeIngredients[0]?.strength !== '5.6 g') throw new Error(record.id + ' active');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
