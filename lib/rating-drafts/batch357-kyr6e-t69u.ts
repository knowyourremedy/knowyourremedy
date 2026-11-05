// DRAFT / not verified / batch 357 KYR6-e (t69u).
// Beam Blue Raspberry Pre-Workout, 5 sticks. Facts image preworkout-5s-Link.jpg.
// The Sprouts section is not edited. No new locks.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const PANEL = 'Beam facts image preworkout-5s-Link.jpg. Blue Raspberry Pre-Workout, 5 servings. t69u.';

const SRC: Record<string, string> = {
  citric: 'Methodology §5 Cleared (citric acid).',
  malic: 'Methodology §5 Cleared (L-malic acid).',
  flavors: 'Methodology §5 Limited (natural flavors, t54u natural-flavor rule). Counts toward the t137u stack.',
  monk: 'Methodology §5 Cleared (monk fruit extract).',
  calsil: 'Methodology §5 Caution (calcium silicate). Not the silicon dioxide cap. Does not count toward the t137u stack.',
  sio2: 'Methodology §5 Caution (silicon dioxide cap). Does not count toward the t137u stack.',
  reb: 'Methodology §5 Cleared (Rebaudioside M). It is not Stevia Extract.',
  blue: 'Methodology §5 Cleared (blue spirulina for color).',
};

const NOTE =
  'Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Rebaudioside M (from stevia extract) is the Cleared Rebaudioside M row. It is not Stevia Extract. Silicon dioxide is the cap and does not count. Calcium silicate does not stack. Monk fruit extract is Cleared.';

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH357_KYR6E_T69U: RatingRecord[] = [
  finish({
    id: 'beam-b357-preworkout-blueraspberry-5',
    productName: 'Beam Blue Raspberry Pre-Workout (5 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b357-preworkout-blueraspberry-5',
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Vitamin B6 (as Pyridoxal-5-Phosphate)', strength: '10 mg' },
      { name: 'Vitamin B12 (as Methylcobalamin)', strength: '15 mcg' },
      { name: 'Magnesium (as Magnesium Citrate)', strength: '50 mg' },
      { name: 'Sodium (as Himalayan Rock Salt)', strength: '200 mg' },
      { name: 'Potassium (as Potassium Citrate)', strength: '100 mg' },
      { name: 'L-Citrulline', strength: '3000 mg' },
      { name: 'Beta-Alanine', strength: '1500 mg' },
      { name: 'L-Tyrosine', strength: '500 mg' },
      { name: 'Cognizin Citicoline (CDP-Choline)', strength: '200 mg' },
      { name: 'L-Theanine', strength: '150 mg' },
      { name: 'Theobromine', strength: '100 mg' },
      { name: 'PurCaf Organic Caffeine (from Coffee Bean)', strength: '75 mg' },
    ],
    inactiveIngredients: (
      [
        ['Citric Acid', 'cleared', 'citric'],
        ['L-Malic Acid', 'cleared', 'malic'],
        ['Natural Flavors', 'limited', 'flavors'],
        ['Monk Fruit Extract', 'cleared', 'monk'],
        ['Calcium Silicate', 'moderate', 'calsil'],
        ['Silicon Dioxide', 'moderate', 'sio2'],
        ['Rebaudioside M (from stevia extract)', 'cleared', 'reb'],
        ['Blue Spirulina (for color)', 'cleared', 'blue'],
      ] as const
    ).map(([name, riskLevel, key]) => ({
      name,
      riskLevel: riskLevel as RiskLevel,
      source: `${PANEL} ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'caution',
    honestNote: NOTE,
    sourcesGeneral: [
      't69u. https://shopbeam.com/products/blue-raspberry-pre-workout-5-servings lists the 5-stick pack in stock at $14.99. SKU MIX-RPPW5SB1. The barcode field is empty. The facts image https://shopbeam.com/cdn/shop/files/preworkout-5s-Link.jpg prints Serving Size 1 Stick (9.7g) and Servings Per Container 5. Other ingredients: Citric Acid, L-Malic Acid, Natural Flavors, Monk Fruit Extract, Calcium Silicate, Silicon Dioxide, Rebaudioside M (from stevia extract), Blue Spirulina (for color). Counted Limited token: Natural Flavors. This is not beam-b323-preworkout-jar-20. That row is the 20-serving jar and prints 1 Scoop.',
    ],
  }),
];

const ROWS = BATCH357_KYR6E_T69U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
if (ROWS.length !== 1) throw new Error('count');
const record = ROWS[0];
if (record.id !== 'beam-b357-preworkout-blueraspberry-5') throw new Error(record.id);
if (record.verdict !== 'caution') throw new Error(record.verdict);
if (record.barcode) throw new Error('upc');
if (!record.honestNote?.includes('Natural Flavors') || !record.honestNote.includes('does not count')) {
  throw new Error('note ' + record.honestNote);
}
const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i)).map((i) => i.name);
if (counted.join('|') !== 'Natural Flavors') throw new Error(counted.join('|'));
const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
if (roll.verdict !== 'caution') throw new Error(roll.verdict);
for (const ingredient of record.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why || banned.test(why)) throw new Error(`${ingredient.name}: ${why}`);
}
