// DRAFT / not verified / batch 356 KYR6-e (t68u).
// Beam Sea Salt Caramel Dream 10 and Glow Lemon Ginger 15.
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

const SRC: Record<string, string> = {
  milk: 'Methodology §5 Cleared (Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin) — t123e). The parenthesis is one token. Does not count toward the t137u stack.',
  cocoa: 'Methodology §5 Cleared (cocoa powder, t56u).',
  fiber: 'Methodology §5 Cleared (organic tapioca fiber).',
  flavors: 'Methodology §5 Limited (natural flavors, t54u natural-flavor rule). Counts toward the t137u stack.',
  monk: 'Methodology §5 Cleared (monk fruit extract).',
};

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const DREAM_PANEL = 'Beam facts image SSC-10S-SFP.jpg. Sea Salt Caramel Dream, 10 servings. t68u.';

export const BATCH356_KYR6E_T68U: RatingRecord[] = [
  finish({
    id: 'beam-b356-dream-seasalt-10',
    productName: 'Beam Dream Sea Salt Caramel (10 servings)',
    brand: 'Beam',
    category: 'Sleep',
    formulaId: 'beam-b356-dream-seasalt-10',
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Magnesium (from 250 mg Magnesium Citrate and 150 mg Magnesium Malate)', strength: '60 mg' },
      { name: 'Sodium (as Himalayan Rock Salt)', strength: '170 mg' },
      { name: 'Reishi Mushroom Extract (Ganoderma lucidum)', strength: '350 mg' },
      { name: 'L-Theanine', strength: '300 mg' },
      { name: 'Apigenin', strength: '50 mg' },
      { name: 'Melatonin', strength: '3 mg' },
    ],
    inactiveIngredients: (
      [
        ['Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin)', 'cleared', 'milk'],
        ['Natural Flavors', 'limited', 'flavors'],
        ['Organic Tapioca Fiber', 'cleared', 'fiber'],
        ['Monk Fruit Extract', 'cleared', 'monk'],
        ['Cocoa Powder', 'cleared', 'cocoa'],
      ] as const
    ).map(([name, riskLevel, key]) => ({
      name,
      riskLevel: riskLevel as RiskLevel,
      source: `${DREAM_PANEL} ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'caution',
    honestNote: '',
    sourcesGeneral: [
      't68u. https://shopbeam.com/products/sea-salt-caramel-dream-powder-10-servings-1 lists the 10-serving pack in stock at $29.99. The facts image SSC-10S-SFP.jpg prints Serving Size 1 Packet (6 g) and Servings Per Container 10. Other ingredients: Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin), Natural Flavors, Organic Tapioca Fiber, Monk Fruit Extract, Cocoa Powder. Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. The barcode field is empty. Missing UPC. No code was invented. This is not beam-b320-dream-seasalt-20 or beam-b320-dream-seasalt-30. Those rows print Rebaudioside M.',
    ],
  }),
  finish({
    id: 'beam-b356-glow-lemon-15',
    productName: 'Beam Glow Lemon Ginger (15 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b356-glow-lemon-15',
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Vitamin A (as Acetate)', strength: '700 mcg' },
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '450 mg' },
      { name: 'Vitamin D (as Cholecalciferol)', strength: '40 mcg' },
      { name: 'Vitamin K (as Menatetrenone)', strength: '33 mcg' },
      { name: 'Niacin (as Niacinamide)', strength: '16 mg' },
      { name: 'Vitamin B6 (as Pyridoxine HCl)', strength: '8.5 mg' },
      { name: 'Vitamin B12 (as Methylcobalamin)', strength: '12 mcg' },
      { name: 'Magnesium (as Magnesium Bisglycinate)', strength: '60 mg' },
      { name: 'Zinc (as Zinc Citrate)', strength: '10 mg' },
      { name: 'Selenium (as L-Selenomethionine)', strength: '50 mcg' },
      { name: 'Manganese (as Manganese AAC)', strength: '2 mg' },
      { name: 'Sodium (as Himalayan Rock Salt)', strength: '180 mg' },
      { name: 'Potassium (as Potassium Chloride & Coconut Water Powder)', strength: '200 mg' },
      { name: 'Organic Coconut Water Powder', strength: '1000 mg' },
      { name: 'Theobromine', strength: '100 mg' },
      { name: 'Bromelain (Ananas comosus) (stem) (240 GDU)', strength: '100 mg' },
      { name: 'Ashwagandha Extract (KSM-66) (Withania somnifera) (root)', strength: '50 mg' },
      { name: 'Chaste Berry Extract (10:1) (Vitex agnus-castus) (fruit)', strength: '30 mg' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't68u. https://shopbeam.com/products/glow-hormone-balance-15-servings-copy lists Lemon Ginger, 15 servings, in stock at $34.99. The facts image Lemon-SFP.jpg prints Serving Size 1 Stick (7.4 g) and Servings Per Container 15. The panel has no other-ingredients line. The vitamins, minerals, and named extracts are actives and are not graded. Counted Limited tokens: none. The barcode field is empty. Missing UPC. No code was invented. This is not a Glow 30-serving row.',
    ],
  }),
];

const ROWS = BATCH356_KYR6E_T68U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
if (ROWS.length !== 2) throw new Error(`batch356 count ${ROWS.length}`);
const expect: Record<string, string> = {
  'beam-b356-dream-seasalt-10': 'caution',
  'beam-b356-glow-lemon-15': 'clean',
};
for (const record of ROWS) {
  if (record.verdict !== expect[record.id]) throw new Error(record.id + ' ' + record.verdict);
  if (record.barcode) throw new Error(record.id + ' upc');
  if (record.honestNote) throw new Error(record.id + ' note');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== record.verdict) throw new Error(record.id + ' roll ' + roll.verdict);
  const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i)).map((i) => i.name);
  if (record.id.endsWith('seasalt-10') && counted.join('|') !== 'Natural Flavors') throw new Error(counted.join('|'));
  if (record.id.endsWith('lemon-15') && counted.length !== 0) throw new Error('lemon tokens');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
