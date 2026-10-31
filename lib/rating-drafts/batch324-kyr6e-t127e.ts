// DRAFT / not verified / batch 324 KYR6-e (t127e).
// Beam brand facts images are the single source for these three packs.
// No UPC was printed. No brand is closed. The Sprouts section is not edited.
// t127e locks Cinnamon Powder, Nutmeg Powder, Clove Powder,
// Grape Powder (for color), and Grape (fruit) Powder (for color) as Cleared.
// They do not stack.

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

const CITRIC = 'Methodology §5 Cleared (citric acid).';
const MALIC = 'Methodology §5 Cleared (L-malic acid).';
const FLAVOR =
  'Methodology §5 Limited (natural flavors, t54u natural-flavor rule). Counts toward the t137u stack.';
const STEVIOL =
  'Methodology §5 Limited (steviol glycosides — founder lock t16u). Counts toward the t137u stack.';
const BEET = 'Methodology §5 Cleared (beet powder for color).';
const REB = 'Methodology §5 Cleared (Rebaudioside M).';
const CINN =
  'Methodology §5 Cleared (Cinnamon Powder — founder lock t127e). Does not count toward the t137u stack.';
const NUT =
  'Methodology §5 Cleared (Nutmeg Powder — founder lock t127e). Does not count toward the t137u stack.';
const CLOVE =
  'Methodology §5 Cleared (Clove Powder — founder lock t127e). Does not count toward the t137u stack.';
const GRAPE =
  'Methodology §5 Cleared (Grape Powder (for color) — founder lock t127e). Does not count toward the t137u stack.';

const BIOTIC_ACTIVES = [
  { name: 'Organic Inulin (from Chicory Root)', strength: '300 mg' },
  { name: 'Keystone Postbiotic', strength: '300 mg' },
  { name: 'Setria Glutathione Reduced', strength: '75 mg' },
  { name: 'Lactobacillus plantarum', strength: '12.5 mg' },
  { name: 'Lactobacillus rhamnosus', strength: '10 mg' },
  { name: 'Bifidobacterium lactis', strength: '5 mg' },
];

const BERRY_NOTE =
  'Counted Limited tokens: Natural Flavors and Steviol Glycosides. That is two, so this is not a 3+ stack. Grape Powder (for color) is the Cleared t127e color token. It is not Grape (fruit) Powder (for color). Beet powder is Cleared. Steviol Glycosides is not Rebaudioside M. Inulin, the postbiotic, glutathione, and the three live strains are the supplement-facts actives and are not graded. No UPC was printed. Missing UPC. Duo packs and the variety pack are multipacks and are not this row.';

export const BATCH324_KYR6E_T127E: RatingRecord[] = [
  finish({
    id: 'beam-b324-biotic-apple-30',
    productName: 'Beam Biotic Crisp Apple (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b324-biotic-apple-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: BIOTIC_ACTIVES,
    inactiveIngredients: [
      flag('Beam facts image. Biotic Crisp Apple, 30 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Beam facts image. Biotic Crisp Apple, 30 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Beam facts image. Biotic Crisp Apple, 30 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Biotic Crisp Apple, 30 servings.', 'Steviol Glycosides', 'limited', STEVIOL),
      flag('Beam facts image. Biotic Crisp Apple, 30 servings.', 'Cinnamon Powder', 'cleared', CINN),
      flag('Beam facts image. Biotic Crisp Apple, 30 servings.', 'Nutmeg Powder', 'cleared', NUT),
      flag('Beam facts image. Biotic Crisp Apple, 30 servings.', 'Rebaudioside M', 'cleared', REB),
      flag('Beam facts image. Biotic Crisp Apple, 30 servings.', 'Clove Powder', 'cleared', CLOVE),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited tokens: Natural Flavors and Steviol Glycosides. That is two, so this is not a 3+ stack. Cinnamon Powder, Nutmeg Powder, and Clove Powder are the Cleared t127e powder tokens. Cinnamon Powder is not Organic Cinnamon Powder and it is not the exact token Cinnamon. Nutmeg Powder is not the exact token Nutmeg. Clove Powder is not clove oil. Rebaudioside M is Cleared. Steviol Glycosides is not Rebaudioside M. Inulin, the postbiotic, glutathione, and the three live strains are the supplement-facts actives and are not graded. Serving size is 1 stick (2.6 g) and the pouch is 30 servings. No UPC was printed. Missing UPC.',
    sourcesGeneral: [
      't127e. Beam brand page https://shopbeam.com/products/biotic lists Crisp Apple, 30 servings, at $64.99 and in stock. SKU MIX-GUCA30SB1. The facts image prints Serving Size 1 Stick (2.6 g) and Servings Per Container 30. Other ingredients: L-Malic Acid, Citric Acid, Natural Flavors, Steviol Glycosides, Cinnamon Powder, Nutmeg Powder, Rebaudioside M, Clove Powder. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b324-biotic-mb-30',
    productName: 'Beam Biotic Mixed Berry (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b324-biotic-mb-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: BIOTIC_ACTIVES,
    inactiveIngredients: [
      flag('Beam facts image. Biotic Mixed Berry, 30 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Beam facts image. Biotic Mixed Berry, 30 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Beam facts image. Biotic Mixed Berry, 30 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Biotic Mixed Berry, 30 servings.', 'Steviol Glycosides', 'limited', STEVIOL),
      flag('Beam facts image. Biotic Mixed Berry, 30 servings.', 'Beet Powder (for color)', 'cleared', BEET),
      flag('Beam facts image. Biotic Mixed Berry, 30 servings.', 'Grape Powder (for color)', 'cleared', GRAPE),
    ],
    verdict: 'caution',
    honestNote: `${BERRY_NOTE} Serving size is 1 stick (2.6 g) and the pouch is 30 servings.`,
    sourcesGeneral: [
      't127e. Beam brand page https://shopbeam.com/products/biotic lists Mixed Berry, 30 servings, at $64.99 and in stock. SKU MIX-GUAB30B1. The facts image prints Serving Size 1 Stick (2.6 g) and Servings Per Container 30. Other ingredients: L-Malic Acid, Citric Acid, Natural Flavors, Steviol Glycosides, Beet Powder (for color), Grape Powder (for color). No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b324-biotic-mb-15',
    productName: 'Beam Biotic Mixed Berry (15 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b324-biotic-mb-15',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: BIOTIC_ACTIVES,
    inactiveIngredients: [
      flag('Beam facts image. Biotic Mixed Berry, 15 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Beam facts image. Biotic Mixed Berry, 15 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Beam facts image. Biotic Mixed Berry, 15 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Biotic Mixed Berry, 15 servings.', 'Steviol Glycosides', 'limited', STEVIOL),
      flag('Beam facts image. Biotic Mixed Berry, 15 servings.', 'Beet Powder (for color)', 'cleared', BEET),
      flag('Beam facts image. Biotic Mixed Berry, 15 servings.', 'Grape Powder (for color)', 'cleared', GRAPE),
    ],
    verdict: 'caution',
    honestNote: `${BERRY_NOTE} Serving size is 1 stick (2.6 g) and the pack is 15 servings. This is not beam-b324-biotic-mb-30.`,
    sourcesGeneral: [
      't127e. Beam brand page https://shopbeam.com/products/biotic-mixed-berry lists Mixed Berry, 15 servings, at $35.00 and in stock. SKU MIX-GUAB15B1. The facts image prints Serving Size 1 Stick (2.6 g) and Servings Per Container 15. Other ingredients: L-Malic Acid, Citric Acid, Natural Flavors, Steviol Glycosides, Beet Powder (for color), Grape Powder (for color). No UPC was printed. Missing UPC. No code was invented. The Feed and PricePlow print a different Mixed Berry 15 line (Stevia Extract, Beet Root Powder (for color), Grape (fruit) Powder (for color), Rice Maltodextrin, Gluten-free Oat Flour). That line is not the brand facts image on the current sale page, so it is not this row.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: number }> = {
  'beam-b324-biotic-apple-30': { verdict: 'caution', counted: 2 },
  'beam-b324-biotic-mb-30': { verdict: 'caution', counted: 2 },
  'beam-b324-biotic-mb-15': { verdict: 'caution', counted: 2 },
};
const ROWS = BATCH324_KYR6E_T127E;
if (ROWS.length !== 3) throw new Error(`batch324 count ${ROWS.length}`);
for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch324 unexpected ${record.id}`);
  if (record.verdict !== expected.verdict) throw new Error(`batch324 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch324 barcode ${record.id}`);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch324 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== expected.counted) {
    throw new Error(`batch324 stack ${record.id} ${counted.map((item) => item.name).join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch324 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch324 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
