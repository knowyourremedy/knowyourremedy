// DRAFT / not verified / batch 354 KYR6-e (t66u).
// Zand Insure Immune Support 4 oz. The two t66u strings are already locked.
// The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const SRC: Record<string, string> = {
  water: 'Methodology §5 Cleared (purified water).',
  glycerine: 'Methodology §5 Cleared (glycerine — the glycerin lock).',
  alcohol:
    'Methodology §5 Cleared (t66u). USP Alcohol 18–20% by Volume is a named alcohol vehicle with a printed strength, under the alcohol-with-strength rule (docs/METHODOLOGY.md line 29). It does not count toward the t137u stack. It is not USP Alcohol.',
};

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH354_KYR6E_T66U: RatingRecord[] = [
  finish({
    id: 'zand-b354-insure-liquid-4',
    productName: 'Zand Insure Immune Support (4 oz)',
    brand: 'Zand',
    category: 'Herbs',
    formulaId: 'zand-b354-insure-liquid-4',
    form: 'liquid',
    audience: 'adult',
    minAge: 12,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '041954010059',
    activeIngredients: [{ name: 'Herbal Formula Extract', strength: '120 mg' }],
    inactiveIngredients: (
      [
        ['Purified Water', 'cleared', 'water'],
        ['Glycerine', 'cleared', 'glycerine'],
        ['USP Alcohol 18–20% by Volume', 'cleared', 'alcohol'],
      ] as const
    ).map(([name, riskLevel, key]) => ({
      name,
      riskLevel: riskLevel as RiskLevel,
      source: `Zand Ingredients accordion. t66u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't66u. https://www.zandimmunity.com/products/insure-immune-support lists the 4 oz in stock at $33.39. The variant barcode field lists 041954010059. The check digit passes. The 4 oz image 041954010059_4.png is the front only. The Ingredients accordion prints Echinacea Augustifolia Root, Echinacea Purpurea Herb, Elderberry Fruit, Red Clover Herb, Sage Leaf, Burdock Root, Peppermint Leaf, Parsley Leaf, Fennel Seed, Ginger Root, Elecampane Root, Chamomile Flower, Valerian Root, Bayberry Root Bark, Blessed Thistle Herb, Barberry Bark, Cayenne Fruit, Purified Water, Glycerine, USP Alcohol 18–20% by Volume. The herbs are the formula and are not graded. The product description says the blend delivers 120 mg. Directions say adults and children over 12. Counted Limited tokens: none. This is not zand-b341-insure-liquid-8. That row is the 8 oz facts image, which prints Glycerin and USP Alcohol with no percent.',
    ],
  }),
];

const ROWS = BATCH354_KYR6E_T66U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (ROWS.length !== 1) throw new Error(`batch354 count ${ROWS.length}`);
for (const record of ROWS) {
  if (!upcCheck(record.barcode ?? '')) throw new Error(record.id + ' upc');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean' || record.verdict !== 'clean') throw new Error(record.id + ' ' + record.verdict);
  const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(record.id + ' count');
  if (record.honestNote) throw new Error(record.id + ' note');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
    if (ingredient.name.includes('USP Alcohol') && !why.includes('docs/METHODOLOGY.md line 29')) {
      throw new Error(record.id + ' alcohol cite');
    }
  }
}
