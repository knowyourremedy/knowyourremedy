// DRAFT / not verified / batch 321 KYR6-e (t124e).
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

const COCOA =
  'Methodology §5 Cleared (Organic Cocoa Powder — founder lock t124e). Does not count toward the t137u stack.';
const ORG_CASSAVA =
  'Methodology §5 Cleared (Organic Coconut Milk Powder (Organic: Coconut Milk, Organic Cassava Dextrin) — founder lock t124e). The parenthesis is one token. Does not count toward the t137u stack.';
const ORG_MILK =
  'Methodology §5 Cleared (Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin) — founder lock t123e). The parenthesis is one token. Does not count toward the t137u stack.';
const CINN =
  'Methodology §5 Cleared (Organic Cinnamon Powder — founder lock t123e). Does not count toward the t137u stack.';
const PLAIN_COCOA = 'Methodology §5 Cleared (cocoa powder, t56u).';
const FIBER = 'Methodology §5 Cleared (organic tapioca fiber).';
const MONK = 'Methodology §5 Cleared (monk fruit extract).';
const FLAVOR =
  'Methodology §5 Limited (natural flavors, t54u natural-flavor rule). Counts toward the t137u stack.';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const MALIC = 'Methodology §5 Cleared (L-malic acid).';
const CALSIL = 'Methodology §5 Caution (calcium silicate). Not the silicon dioxide cap. Does not count toward the t137u stack.';
const SILICA = 'Methodology §5 Caution (silica — silicon dioxide cap). Does not count toward the t137u stack.';
const REB = 'Methodology §5 Cleared (Reb M).';
const STEVIA =
  'Methodology §5 Limited (stevia leaf extract — founder lock t159u). Counts toward the t137u stack.';
const BETA = 'Methodology §5 Caution (beta-carotene as color). Does not count toward the t137u stack.';
const BEET = 'Methodology §5 Cleared (beet root powder for color).';

const CINNAMON =
  'Beam facts image. Cinnamon Cocoa Dream Powder, 10 servings. t124e brand page.';
const BROWNIE =
  'Beam facts image. Brownie Batter Dream Powder, 10 servings. t124e brand page.';
const GLOW = 'Beam facts image. Glow Peach Mango, 30 servings. t124e brand page.';

export const BATCH321_KYR6E_T124E: RatingRecord[] = [
  finish({
    id: 'beam-b321-dream-cinnamon-10',
    productName: 'Beam Dream Cinnamon Cocoa (10 servings)',
    brand: 'Beam',
    category: 'Sleep',
    formulaId: 'beam-b321-dream-cinnamon-10',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Magnesium (from Magnesium Citrate and Magnesium Malate)', strength: '60 mg' },
      { name: 'Sodium (as Himalayan Rock Salt)', strength: '60 mg' },
      { name: 'Reishi Mushroom Extract (Ganoderma lucidum)', strength: '350 mg' },
      { name: 'L-Theanine', strength: '300 mg' },
      { name: 'Apigenin', strength: '50 mg' },
      { name: 'Melatonin', strength: '3 mg' },
    ],
    inactiveIngredients: [
      flag(CINNAMON, 'Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin)', 'cleared', ORG_MILK),
      flag(CINNAMON, 'Organic Cocoa Powder', 'cleared', COCOA),
      flag(CINNAMON, 'Natural Flavors', 'limited', FLAVOR),
      flag(CINNAMON, 'Monk Fruit Extract', 'cleared', MONK),
      flag(CINNAMON, 'Organic Cinnamon Powder', 'cleared', CINN),
    ],
    verdict: 'caution',
    honestNote:
      'Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin) is one printed token. The Organic: prefix does not make a separate Organic Cassava Dextrin row. Organic Cocoa Powder is the exact Cleared token. It is not cocoa powder. Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Serving size is 1 packet (6 g) and the pack is 10 servings. No UPC was printed. Missing UPC. This is not the 20-serving or 30-serving Original row.',
    sourcesGeneral: [
      't124e. Beam brand page https://shopbeam.com/products/cinnamon-cocoa-dream-powder-10-servings lists the 10-serving pack at $29.99 and in stock. The facts image prints Serving Size 1 Packet (6 g) and Servings Per Container 10. Other ingredients: Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin), Organic Cocoa Powder, Natural Flavors, Monk Fruit Extract, Organic Cinnamon Powder. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b321-dream-brownie-10',
    productName: 'Beam Dream Brownie Batter (10 servings)',
    brand: 'Beam',
    category: 'Sleep',
    formulaId: 'beam-b321-dream-brownie-10',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Magnesium (from Magnesium Citrate and Magnesium Malate)', strength: '60 mg' },
      { name: 'Sodium (as Himalayan Rock Salt)', strength: '150 mg' },
      { name: 'Reishi Mushroom Extract (Ganoderma lucidum)', strength: '350 mg' },
      { name: 'L-Theanine', strength: '300 mg' },
      { name: 'Apigenin', strength: '50 mg' },
      { name: 'Melatonin', strength: '3 mg' },
    ],
    inactiveIngredients: [
      flag(BROWNIE, 'Cocoa Powder', 'cleared', PLAIN_COCOA),
      flag(BROWNIE, 'Organic Coconut Milk Powder (Organic: Coconut Milk, Organic Cassava Dextrin)', 'cleared', ORG_CASSAVA),
      flag(BROWNIE, 'Organic Tapioca Fiber', 'cleared', FIBER),
      flag(BROWNIE, 'Natural Flavors', 'limited', FLAVOR),
      flag(BROWNIE, 'Monk Fruit Extract', 'cleared', MONK),
    ],
    verdict: 'caution',
    honestNote:
      'Organic Coconut Milk Powder (Organic: Coconut Milk, Organic Cassava Dextrin) is one printed token. Organic Cassava Dextrin inside that parenthesis is not graded again. Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Serving size is 1 packet (6.9 g) and the pack is 10 servings. No UPC was printed. Missing UPC. This is not the 20-serving or 30-serving Brownie Batter row.',
    sourcesGeneral: [
      't124e. Beam brand page https://shopbeam.com/products/brownie-batter-dream-powder-10-servings lists the 10-serving pack at $29.99 and in stock. The facts image prints Serving Size 1 Packet (6.9 g) and Servings Per Container 10. Other ingredients: Cocoa Powder, Organic Coconut Milk Powder (Organic: Coconut Milk, Organic Cassava Dextrin), Organic Tapioca Fiber, Natural Flavors, Monk Fruit Extract. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b321-glow-peach-30',
    productName: 'Beam Glow Peach Mango (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b321-glow-peach-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Glow vitamin and mineral blend' }],
    inactiveIngredients: [
      flag(GLOW, 'Citric Acid', 'cleared', CITRIC),
      flag(GLOW, 'L-Malic Acid', 'cleared', MALIC),
      flag(GLOW, 'Natural Flavors', 'limited', FLAVOR),
      flag(GLOW, 'Calcium Silicate', 'moderate', CALSIL),
      flag(GLOW, 'Silica', 'moderate', SILICA),
      flag(GLOW, 'Reb M (as Rebaudioside)', 'cleared', REB),
      flag(GLOW, 'Stevia Leaf Extract', 'limited', STEVIA),
      flag(GLOW, 'Beta Carotene', 'moderate', BETA),
      flag(GLOW, 'Beet Root Powder (for color)', 'cleared', BEET),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited tokens: Natural Flavors and Stevia Leaf Extract. That is two, so this is not a 3+ stack. Silica is the silicon dioxide cap and does not count. Calcium silicate is a silicate flow agent, not that cap, so it did not get the silica flag. Stevia Leaf Extract is not Rebaudioside M. Serving size is 1 stick (7.1 g) and the pouch is 30 servings. The vitamins, minerals, and the named plant extracts on the supplement facts are actives and are not graded. No UPC was printed. Missing UPC. The duo pack is a multipack and is not this row.',
    sourcesGeneral: [
      't124e. Beam brand page https://shopbeam.com/products/glow-by-jenn-todryk lists Peach Mango, 30 servings, at $64.99 and in stock. The facts image prints Serving Size 1 Stick (7.1 g) and Servings Per Container 30. Other ingredients: Citric Acid, L-Malic Acid, Natural Flavors, Calcium Silicate, Silica, Reb M (as Rebaudioside), Stevia Leaf Extract, Beta Carotene, Beet Root Powder (for color). No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
];

const EXPECTED: Record<string, number> = {
  'beam-b321-dream-cinnamon-10': 1,
  'beam-b321-dream-brownie-10': 1,
  'beam-b321-glow-peach-30': 2,
};
const ROWS = BATCH321_KYR6E_T124E;
if (ROWS.length !== 3) throw new Error(`batch321 count ${ROWS.length}`);
for (const record of ROWS) {
  if (record.verdict !== 'caution') throw new Error(`batch321 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch321 barcode ${record.id}`);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch321 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== EXPECTED[record.id]) {
    throw new Error(`batch321 stack ${record.id} ${counted.map((item) => item.name).join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch321 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch321 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
