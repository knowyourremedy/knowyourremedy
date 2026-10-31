// DRAFT / not verified / batch 325 KYR6-e (t128e).
// Founder-verified panels and UPCs are the source. No brand is closed.
// The Sprouts section is not edited. No new locks.
// Ids follow the MAIN beam-b325- prefix:
// beam-biotic-lemonade-15 -> beam-b325-biotic-lemonade-15
// beam-biotic-crispapple-15 -> beam-b325-biotic-crispapple-15
// beam-kids-strawberrymilk-20 -> beam-b325-kids-strawberrymilk-20

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
const KIDS = 'kids' as const;

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

const CITRIC = 'Methodology §5 Cleared (citric acid).';
const MALIC = 'Methodology §5 Cleared (L-malic acid).';
const FLAVOR =
  'Methodology §5 Limited (natural flavors, t54u natural-flavor rule). Counts toward the t137u stack.';
const STEVIOL =
  'Methodology §5 Limited (steviol glycosides — founder lock t16u). Counts toward the t137u stack.';
const BETA =
  'Methodology §5 Caution (beta-carotene as a color). Does not count toward the t137u stack.';
const CINN =
  'Methodology §5 Cleared (Cinnamon Powder — founder lock t127e). Does not count toward the t137u stack.';
const NUT =
  'Methodology §5 Cleared (Nutmeg Powder — founder lock t127e). Does not count toward the t137u stack.';
const CLOVE =
  'Methodology §5 Cleared (Clove Powder — founder lock t127e). Does not count toward the t137u stack.';
const REB = 'Methodology §5 Cleared (Rebaudioside M).';
const BEET_ROOT = 'Methodology §5 Cleared (beet root powder for color).';
const MONK = 'Methodology §5 Cleared (monk fruit extract).';
const MILK =
  'Methodology §5 Cleared (Coconut Milk Powder (Coconut Milk, Cassava Dextrin) — founder lock t123e). Does not count toward the t137u stack.';

const BIOTIC_ACTIVES = [
  { name: 'Organic Inulin (from Chicory Root)', strength: '300 mg' },
  { name: 'Keystone Postbiotic', strength: '300 mg' },
  { name: 'Setria Glutathione Reduced', strength: '75 mg' },
  { name: 'Lactobacillus plantarum', strength: '12.5 mg' },
  { name: 'Lactobacillus rhamnosus', strength: '10 mg' },
  { name: 'Bifidobacterium lactis', strength: '5 mg' },
];

const TWO_LIMITED =
  'Counted Limited tokens: Natural Flavors and Steviol Glycosides. That is two, so this is not a 3+ stack. Steviol Glycosides is not Rebaudioside M. Inulin, the postbiotic, glutathione, and the three live strains are the supplement-facts actives from the matching 30-serving row and are not graded.';

export const BATCH325_KYR6E_T128E: RatingRecord[] = [
  finish({
    id: 'beam-b325-biotic-lemonade-15',
    productName: 'Beam Biotic Lemonade (15 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b325-biotic-lemonade-15',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '850063763936',
    activeIngredients: BIOTIC_ACTIVES,
    inactiveIngredients: [
      flag('Founder-verified panel. Biotic Lemonade, 15 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Founder-verified panel. Biotic Lemonade, 15 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Founder-verified panel. Biotic Lemonade, 15 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Founder-verified panel. Biotic Lemonade, 15 servings.', 'Steviol Glycosides', 'limited', STEVIOL),
      flag('Founder-verified panel. Biotic Lemonade, 15 servings.', 'Beta Carotene (for color)', 'moderate', BETA),
    ],
    verdict: 'caution',
    honestNote: `${TWO_LIMITED} Beta Carotene (for color) is a color and does not count. Serving size is 1 stick (2.4 g), the same as beam-b323-biotic-lemonade-30, and this pack is 15 servings. UPC 850063763936. This is not beam-b323-biotic-lemonade-30.`,
    sourcesGeneral: [
      't128e. Founder-verified panel and UPC. Beam Biotic Lemonade, 15 servings. Other ingredients: Citric Acid, Natural Flavors, L-Malic Acid, Steviol Glycosides, Beta Carotene (for color). UPC 850063763936. The other-ingredients line matches beam-b323-biotic-lemonade-30, so the supplement-facts actives and the 2.4 g stick size are taken from that row. The count is 15 servings. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b325-biotic-crispapple-15',
    productName: 'Beam Biotic Crisp Apple (15 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b325-biotic-crispapple-15',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '850077725746',
    activeIngredients: BIOTIC_ACTIVES,
    inactiveIngredients: [
      flag('Founder-verified panel. Biotic Crisp Apple, 15 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Founder-verified panel. Biotic Crisp Apple, 15 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Founder-verified panel. Biotic Crisp Apple, 15 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Founder-verified panel. Biotic Crisp Apple, 15 servings.', 'Steviol Glycosides', 'limited', STEVIOL),
      flag('Founder-verified panel. Biotic Crisp Apple, 15 servings.', 'Cinnamon Powder', 'cleared', CINN),
      flag('Founder-verified panel. Biotic Crisp Apple, 15 servings.', 'Nutmeg Powder', 'cleared', NUT),
      flag('Founder-verified panel. Biotic Crisp Apple, 15 servings.', 'Rebaudioside M', 'cleared', REB),
      flag('Founder-verified panel. Biotic Crisp Apple, 15 servings.', 'Clove Powder', 'cleared', CLOVE),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited tokens: Natural Flavors and Steviol Glycosides. That is two, so this is not a 3+ stack. Cinnamon Powder, Nutmeg Powder, and Clove Powder are the Cleared t127e powder tokens. Cinnamon Powder is not Organic Cinnamon Powder and it is not the exact token Cinnamon. Nutmeg Powder is not the exact token Nutmeg. Clove Powder is not clove oil. Rebaudioside M is Cleared. Steviol Glycosides is not Rebaudioside M. Inulin, the postbiotic, glutathione, and the three live strains are the supplement-facts actives from beam-b324-biotic-apple-30 and are not graded. Serving size is 1 stick (2.6 g) and this pack is 15 servings. UPC 850077725746. This is not beam-b324-biotic-apple-30.',
    sourcesGeneral: [
      't128e. Founder-verified panel and UPC. Beam Biotic Crisp Apple, 15 servings. Other ingredients: L-Malic Acid, Citric Acid, Natural Flavors, Steviol Glycosides, Cinnamon Powder, Nutmeg Powder, Rebaudioside M, Clove Powder. UPC 850077725746. The other-ingredients line matches beam-b324-biotic-apple-30, so the supplement-facts actives and the 2.6 g stick size are taken from that row. The count is 15 servings. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b325-kids-strawberrymilk-20',
    productName: 'Beam Kids Strawberry Milk Superpowder (20 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b325-kids-strawberrymilk-20',
    form: 'powder',
    audience: KIDS,
    minAge: 2,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '850063763356',
    activeIngredients: [
      { name: 'Organic Greens Blend' },
      { name: 'Organic Fruit Blend' },
      { name: 'Probiotic Blend' },
    ],
    inactiveIngredients: [
      flag('Founder-verified panel. Kids Strawberry Milk, 20 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag(
        'Founder-verified panel. Kids Strawberry Milk, 20 servings.',
        'Coconut Milk Powder (coconut milk, cassava dextrin)',
        'cleared',
        MILK,
      ),
      flag(
        'Founder-verified panel. Kids Strawberry Milk, 20 servings.',
        'Beet Root Powder (for color)',
        'cleared',
        BEET_ROOT,
      ),
      flag(
        'Founder-verified panel. Kids Strawberry Milk, 20 servings.',
        'Rebaudioside M (from stevia extract)',
        'cleared',
        REB,
      ),
      flag('Founder-verified panel. Kids Strawberry Milk, 20 servings.', 'Monk Fruit Extract', 'cleared', MONK),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Coconut Milk Powder (coconut milk, cassava dextrin) is the Cleared t123e coconut-milk-powder token. The lowercase letters inside the parenthesis do not make a second ingredient, and cassava dextrin inside it is not graded again. Rebaudioside M (from stevia extract) is the Cleared Rebaudioside M row. It is not Stevia Extract. Beet root powder is a plant color and does not stack. Monk fruit extract is Cleared. The greens blend, fruit blend, and probiotic blend are the Kids All-In-One supplement-facts actives used on the other 20-serving kids rows and are not graded. Serving size is 1 scoop (6 g) and the tub is 20 servings. UPC 850063763356. This is not beam-b323-kids-berryvanilla-20.',
    sourcesGeneral: [
      't128e. Founder-verified panel and UPC. Beam Kids Strawberry Milk, 20 servings. Other ingredients: Natural Flavors, Coconut Milk Powder (coconut milk, cassava dextrin), Beet Root Powder (for color), Rebaudioside M (from stevia extract), Monk Fruit Extract. UPC 850063763356. The supplement-facts actives follow the other Kids All-In-One 20-serving rows. No code was invented.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: number; barcode: string }> = {
  'beam-b325-biotic-lemonade-15': { verdict: 'caution', counted: 2, barcode: '850063763936' },
  'beam-b325-biotic-crispapple-15': { verdict: 'caution', counted: 2, barcode: '850077725746' },
  'beam-b325-kids-strawberrymilk-20': { verdict: 'caution', counted: 1, barcode: '850063763356' },
};
const ROWS = BATCH325_KYR6E_T128E;
if (ROWS.length !== 3) throw new Error(`batch325 count ${ROWS.length}`);
for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch325 unexpected ${record.id}`);
  if (record.verdict !== expected.verdict) throw new Error(`batch325 verdict ${record.id} ${record.verdict}`);
  if (record.barcode !== expected.barcode) throw new Error(`batch325 barcode ${record.id}`);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch325 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== expected.counted) {
    throw new Error(`batch325 stack ${record.id} ${counted.map((item) => item.name).join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch325 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch325 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
