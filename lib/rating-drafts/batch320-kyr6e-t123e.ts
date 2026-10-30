// DRAFT / not verified / batch 320 KYR6-e (t123e).
// Beam brand facts images are the single source. No UPC was printed.
// No brand is closed. The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, whySource: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${whySource}` };
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const PAGE = 'https://shopbeam.com/products/dream-powder-8';

const MILK =
  'Methodology §5 Cleared (Coconut Milk Powder (Coconut Milk, Cassava Dextrin) — founder lock t123e). The parenthesis is one token. Does not count toward the t137u stack.';
const ORG_MILK =
  'Methodology §5 Cleared (Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin) — founder lock t123e). The parenthesis is one token. Does not count toward the t137u stack.';
const CINN =
  'Methodology §5 Cleared (Organic Cinnamon Powder — founder lock t123e). Does not count toward the t137u stack.';
const PEANUT =
  'Methodology §5 Cleared (Peanut Flour — founder lock t123e). Does not count toward the t137u stack.';
const COCOA = 'Methodology §5 Cleared (cocoa powder, t56u).';
const FLAVOR =
  'Methodology §5 Limited (natural flavors, t54u natural-flavor rule). Counts toward the t137u stack.';
const REB = 'Methodology §5 Cleared (Rebaudioside M).';
const MONK = 'Methodology §5 Cleared (monk fruit extract).';
const FIBER = 'Methodology §5 Cleared (organic tapioca fiber).';

const NOTE_PLAIN =
  'Coconut Milk Powder (Coconut Milk, Cassava Dextrin) is one printed token. Cassava Dextrin inside that parenthesis is not graded again. Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack.';
const NOTE_ORG =
  'Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin) is one printed token. The Organic: prefix does not make a separate Organic Cassava Dextrin row. Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack.';

const CORE = [
  { name: 'Magnesium (As Magnesium Citrate, Dimagnesium Malate)', strength: '60 mg' },
  { name: 'Reishi Mushroom Extract (Ganoderma lucidum) (fruiting body)', strength: '350 mg' },
  { name: 'L-Theanine', strength: '300 mg' },
  { name: 'Apigenin', strength: '50 mg' },
  { name: 'Melatonin', strength: '3 mg' },
];

const PLAIN_MILK = 'Coconut Milk Powder (Coconut Milk, Cassava Dextrin)';
const ORGANIC_MILK = 'Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin)';

function powder(input: {
  id: string;
  productName: string;
  panel: string;
  other: IngredientFlag[];
  honestNote: string;
  source: string;
  melatonin: boolean;
}): RatingRecord {
  if (!input.panel) throw new Error('batch320 panel');
  return finish({
    id: input.id,
    productName: input.productName,
    brand: 'Beam',
    category: 'Sleep',
    formulaId: input.id,
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: input.melatonin ? CORE : CORE.filter((item) => item.name !== 'Melatonin'),
    inactiveIngredients: input.other,
    verdict: 'caution',
    honestNote: input.honestNote,
    sourcesGeneral: [input.source],
  });
}

function plainOther(panel: string, names: string[]): IngredientFlag[] {
  const source: Record<string, { level: RiskLevel; why: string }> = {
    [PLAIN_MILK]: { level: 'cleared', why: MILK },
    'Cocoa Powder': { level: 'cleared', why: COCOA },
    'Natural Flavors': { level: 'limited', why: FLAVOR },
    'Rebaudioside M': { level: 'cleared', why: REB },
    'Organic Cinnamon Powder': { level: 'cleared', why: CINN },
    'Monk Fruit Extract': { level: 'cleared', why: MONK },
    'Organic Tapioca Fiber': { level: 'cleared', why: FIBER },
    'Peanut Flour': { level: 'cleared', why: PEANUT },
    [ORGANIC_MILK]: { level: 'cleared', why: ORG_MILK },
  };
  return names.map((name) => {
    const item = source[name];
    if (!item) throw new Error(`batch320 unknown token ${name}`);
    return flag(panel, name, item.level, item.why);
  });
}

const ORIGINAL = [
  PLAIN_MILK,
  'Cocoa Powder',
  'Natural Flavors',
  'Rebaudioside M',
  'Organic Cinnamon Powder',
  'Monk Fruit Extract',
];
const CARAMEL = [
  PLAIN_MILK,
  'Natural Flavors',
  'Organic Tapioca Fiber',
  'Rebaudioside M',
  'Cocoa Powder',
  'Monk Fruit Extract',
];
const BROWNIE = [
  'Cocoa Powder',
  PLAIN_MILK,
  'Natural Flavors',
  'Organic Tapioca Fiber',
  'Rebaudioside M',
  'Monk Fruit Extract',
];
const COOKIE = [
  PLAIN_MILK,
  'Cocoa Powder',
  'Organic Tapioca Fiber',
  'Natural Flavors',
  'Rebaudioside M',
  'Monk Fruit Extract',
];
const PEANUT_LINE = [
  'Peanut Flour',
  'Cocoa Powder',
  'Natural Flavors',
  'Organic Tapioca Fiber',
  PLAIN_MILK,
  'Rebaudioside M',
  'Monk Fruit Extract',
];
const SALTY = [
  'Cocoa Powder',
  ORGANIC_MILK,
  'Organic Tapioca Fiber',
  'Monk Fruit Extract',
  'Natural Flavors',
];

export const BATCH320_KYR6E_T123E: RatingRecord[] = [
  powder({
    id: 'beam-b320-dream-original-30',
    productName: 'Beam Dream Original Cinnamon Cocoa (30 servings)',
    panel: 'Beam facts image. Dream Original Cinnamon Cocoa, 30 servings.',
    other: plainOther('Beam facts image. Dream Original Cinnamon Cocoa, 30 servings.', ORIGINAL),
    honestNote: `${NOTE_PLAIN} Serving size is 1 scoop (6 g) and the pouch is 30 servings. Melatonin is on the supplement facts and is not graded. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Original Cinnamon Cocoa, 30 servings, at $64.99 and in stock. The facts image prints Serving Size 1 Scoop (6 g) and Servings Per Container 30. Other ingredients: Coconut Milk Powder (Coconut Milk, Cassava Dextrin), Cocoa Powder, Natural Flavors, Rebaudioside M, Organic Cinnamon Powder, Monk Fruit Extract. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-original-20',
    productName: 'Beam Dream Original Cinnamon Cocoa (20 servings)',
    panel: 'Beam facts image. Dream Original Cinnamon Cocoa, 20 servings.',
    other: plainOther('Beam facts image. Dream Original Cinnamon Cocoa, 20 servings.', ORIGINAL),
    honestNote: `${NOTE_PLAIN} Serving size is 1 scoop (6 g) and the pouch is 20 servings. This is not the 30-serving row. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Original Cinnamon Cocoa, 20 servings, at $49.99 and in stock. The facts image prints Servings Per Container 20. Other ingredients match the 30-serving Original line. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-seasalt-30',
    productName: 'Beam Dream Sea Salt Caramel (30 servings)',
    panel: 'Beam facts image. Dream Sea Salt Caramel, 30 servings.',
    other: plainOther('Beam facts image. Dream Sea Salt Caramel, 30 servings.', CARAMEL),
    honestNote: `${NOTE_PLAIN} The pouch is 30 servings. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Sea Salt Caramel, 30 servings, at $64.99 and in stock. The facts image prints Servings Per Container 30. Other ingredients: Coconut Milk Powder (Coconut Milk, Cassava Dextrin), Natural Flavors, Organic Tapioca Fiber, Rebaudioside M, Cocoa Powder, Monk Fruit Extract. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-seasalt-20',
    productName: 'Beam Dream Sea Salt Caramel (20 servings)',
    panel: 'Beam facts image. Dream Sea Salt Caramel, 20 servings.',
    other: plainOther('Beam facts image. Dream Sea Salt Caramel, 20 servings.', CARAMEL),
    honestNote: `${NOTE_PLAIN} The pouch is 20 servings. This is not the 30-serving row. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Sea Salt Caramel, 20 servings, in stock. The facts image prints Servings Per Container 20. Other ingredients match the 30-serving Sea Salt Caramel line. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-brownie-30',
    productName: 'Beam Dream Brownie Batter (30 servings)',
    panel: 'Beam facts image. Dream Brownie Batter, 30 servings.',
    other: plainOther('Beam facts image. Dream Brownie Batter, 30 servings.', BROWNIE),
    honestNote: `${NOTE_PLAIN} The pouch is 30 servings. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Brownie Batter, 30 servings, at $64.99 and in stock. The facts image prints Servings Per Container 30. Other ingredients: Cocoa Powder, Coconut Milk Powder (Coconut Milk, Cassava Dextrin), Natural Flavors, Organic Tapioca Fiber, Rebaudioside M, Monk Fruit Extract. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-brownie-20',
    productName: 'Beam Dream Brownie Batter (20 servings)',
    panel: 'Beam facts image. Dream Brownie Batter, 20 servings.',
    other: plainOther('Beam facts image. Dream Brownie Batter, 20 servings.', BROWNIE),
    honestNote: `${NOTE_PLAIN} The pouch is 20 servings. This is not the 30-serving row and it is not the 10-serving stick pack. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Brownie Batter, 20 servings, in stock. The facts image prints Servings Per Container 20. Other ingredients match the 30-serving Brownie Batter line. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-cookie-30',
    productName: 'Beam Dream Chocolate Chip Cookie (30 servings)',
    panel: 'Beam facts image. Dream Chocolate Chip Cookie, 30 servings.',
    other: plainOther('Beam facts image. Dream Chocolate Chip Cookie, 30 servings.', COOKIE),
    honestNote: `${NOTE_PLAIN} The pouch is 30 servings. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Chocolate Chip Cookie, 30 servings, at $64.99 and in stock. The facts image prints Servings Per Container 30. Other ingredients: Coconut Milk Powder (Coconut Milk, Cassava Dextrin), Cocoa Powder, Organic Tapioca Fiber, Natural Flavors, Rebaudioside M, Monk Fruit Extract. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-cookie-20',
    productName: 'Beam Dream Chocolate Chip Cookie (20 servings)',
    panel: 'Beam facts image. Dream Chocolate Chip Cookie, 20 servings.',
    other: plainOther('Beam facts image. Dream Chocolate Chip Cookie, 20 servings.', COOKIE),
    honestNote: `${NOTE_PLAIN} The pouch is 20 servings. This is not the 30-serving row. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Chocolate Chip Cookie, 20 servings, in stock. The facts image prints Servings Per Container 20. Other ingredients match the 30-serving Chocolate Chip Cookie line. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-melatoninfree-30',
    productName: 'Beam Dream Melatonin Free Cinnamon Cocoa (30 servings)',
    panel: 'Beam facts image. Dream Melatonin Free Cinnamon Cocoa, 30 servings.',
    other: plainOther('Beam facts image. Dream Melatonin Free Cinnamon Cocoa, 30 servings.', ORIGINAL),
    honestNote: `${NOTE_PLAIN} The supplement-facts panel does not print melatonin. The pouch is 30 servings. The 20-serving button is not available. No UPC was printed. Missing UPC.`,
    melatonin: false,
    source:
      `t123e. Beam brand page ${PAGE} lists Melatonin Free Cinnamon Cocoa, 30 servings, at $64.99 and in stock. The facts image prints Servings Per Container 30 and does not print melatonin. Other ingredients: Coconut Milk Powder (Coconut Milk, Cassava Dextrin), Cocoa Powder, Natural Flavors, Rebaudioside M, Organic Cinnamon Powder, Monk Fruit Extract. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-peanut-30',
    productName: 'Beam Dream Chocolate Peanut Butter (30 servings)',
    panel: 'Beam facts image. Dream Chocolate Peanut Butter, 30 servings.',
    other: plainOther('Beam facts image. Dream Chocolate Peanut Butter, 30 servings.', PEANUT_LINE),
    honestNote: `${NOTE_PLAIN} The pouch is 30 servings. The panel says it contains peanut. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Chocolate Peanut Butter, 30 servings, at $64.99 and in stock. The facts image prints Servings Per Container 30. Other ingredients: Peanut Flour, Cocoa Powder, Natural Flavors, Organic Tapioca Fiber, Coconut Milk Powder (Coconut Milk, Cassava Dextrin), Rebaudioside M, Monk Fruit Extract. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-peanut-20',
    productName: 'Beam Dream Chocolate Peanut Butter (20 servings)',
    panel: 'Beam facts image. Dream Chocolate Peanut Butter, 20 servings.',
    other: plainOther('Beam facts image. Dream Chocolate Peanut Butter, 20 servings.', PEANUT_LINE),
    honestNote: `${NOTE_PLAIN} Serving size is 1 scoop (7.2 g) and the pouch is 20 servings. This is not the 30-serving row. The panel says it contains peanut. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Chocolate Peanut Butter, 20 servings, at $49.99 and in stock. The facts image prints Serving Size 1 Scoop (7.2 g) and Servings Per Container 20. Other ingredients: Peanut Flour, Cocoa Powder, Natural Flavors, Organic Tapioca Fiber, Coconut Milk Powder (Coconut Milk, Cassava Dextrin), Rebaudioside M, Monk Fruit Extract. Sodium is 120 mg from Himalayan rock salt and is a supplement-facts nutrient, not an other ingredient. No UPC was printed. Missing UPC. No code was invented.`,
  }),
  powder({
    id: 'beam-b320-dream-salty-20',
    productName: 'Beam Dream Salty Dark Chocolate (20 servings)',
    panel: 'Beam facts image. Dream Salty Dark Chocolate, 20 servings.',
    other: plainOther('Beam facts image. Dream Salty Dark Chocolate, 20 servings.', SALTY),
    honestNote: `${NOTE_ORG} The facts image prints 20 servings. No UPC was printed. Missing UPC.`,
    melatonin: true,
    source:
      `t123e. Beam brand page ${PAGE} lists Salty Dark Chocolate in stock. The facts image prints Servings Per Container 20. Other ingredients: Cocoa Powder, Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin), Organic Tapioca Fiber, Monk Fruit Extract, Natural Flavors. No UPC was printed. Missing UPC. No code was invented.`,
  }),
];

const ROWS = BATCH320_KYR6E_T123E;
if (ROWS.length !== 12) throw new Error(`batch320 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`batch320 duplicate ${record.id}`);
  ids.add(record.id);
  if (record.verdict !== 'caution') throw new Error(`batch320 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch320 barcode ${record.id}`);
  if (!record.honestNote || !record.honestNote.includes('one printed token')) {
    throw new Error(`batch320 note ${record.id}`);
  }
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== 1 || counted[0]?.name !== 'Natural Flavors') {
    throw new Error(`batch320 stack ${record.id} ${counted.map((item) => item.name).join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch320 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch320 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
