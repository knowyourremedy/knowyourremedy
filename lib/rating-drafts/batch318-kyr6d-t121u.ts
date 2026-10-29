// DRAFT / not verified / batch 318 KYR6-d (t121u continued).
// Brand facts images are the single source. No UPC was printed.
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

const VESS =
  'Beam brand facts image. V-ssential capsules, 60 capsules. t121u brand page.';
const PRE =
  'Beam brand facts image. Pre-Workout sticks, 20 servings. t121u brand page.';

export const BATCH318_KYR6D_T121U: RatingRecord[] = [
  finish({
    id: 'beam-b318-v-ssential-60',
    productName: 'Beam V-ssential (60 capsules)',
    brand: 'Beam',
    category: 'Herbs',
    formulaId: 'beam-b318-v-ssential-60',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Beet Root Powder (Beta vulgaris)', strength: '500 mg' },
      { name: 'Organic Seabuckthorn (Hippophae rhamnoides) (fruit)', strength: '250 mg' },
      { name: 'Cranberry Extract (Vaccinium macrocarpon) (fruit)', strength: '100 mg' },
      { name: 'Lactobacillus crispatus', strength: '1 Billion CFU' },
      { name: 'Lactobacillus gasseri LG23', strength: '1 Billion CFU' },
    ],
    inactiveIngredients: [
      flag(VESS, 'Hypromellose (cellulose) Capsule', 'cleared', 'Methodology §5 Cleared (hypromellose).'),
      flag(
        VESS,
        'Organic Flow Agent Blend (organic rice hull concentrate, organic sunflower lecithin, organic oat fiber, organic gum arabic)',
        'cleared',
        'Methodology §5 Cleared (named rice hull concentrate). Does not count toward the t137u stack.',
      ),
      flag(VESS, 'Rice Flour', 'moderate', 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.'),
      flag(VESS, 'Calcium Laurate', 'cleared', 'Methodology §5 Cleared (calcium laurate).'),
      flag(VESS, 'Vegetable Magnesium Stearate', 'cleared', 'Methodology §5 Cleared (vegetable magnesium stearate).'),
    ],
    verdict: 'caution',
    honestNote:
      'Rice flour is Caution and does not stack. Counted Limited tokens: none. Hypromellose, the organic flow-agent blend, calcium laurate, and vegetable magnesium stearate are Cleared. The beet, seabuckthorn, cranberry, and the two Lactobacillus strains are the supplement-facts actives and are not graded. Serving size is 2 capsules and the bottle is 30 servings, so this is 60 capsules. No UPC was printed. Missing UPC.',
    sourcesGeneral: [
      't121u. Beam brand page https://shopbeam.com/products/v-ssential-vaginal-health-capsule lists the bottle at $39.99 and in stock. SKU CAP-CVGN30B1. The facts image prints Serving Size 2 Capsules and Servings Per Container 30. Other ingredients: Hypromellose (cellulose) Capsule, Organic Flow Agent Blend (organic rice hull concentrate, organic sunflower lecithin, organic oat fiber, organic gum arabic), Rice Flour, Calcium Laurate, Vegetable Magnesium Stearate. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b318-preworkout-sticks-20',
    productName: 'Beam Pre-Workout (20 sticks)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b318-preworkout-sticks-20',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'L-Citrulline', strength: '3000 mg' },
      { name: 'Beta-Alanine', strength: '1500 mg' },
      { name: 'L-Tyrosine', strength: '500 mg' },
      { name: 'Cognizin Citicoline (CDP-Choline)', strength: '200 mg' },
      { name: 'L-Theanine', strength: '150 mg' },
      { name: 'Theobromine', strength: '100 mg' },
      { name: 'PurCaf Organic Caffeine (from Coffee Bean)', strength: '75 mg' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. The supplement-facts panel does not print an other-ingredients line. The vitamins, minerals, amino acids, theobromine, and caffeine are the supplement-facts actives and are not graded. Serving size is 1 stick (9.7 g) and the pack is 20 servings. No UPC was printed. Missing UPC. The jar on the same page is not this row. The facts image is the stick panel.',
    sourcesGeneral: [
      't121u. Beam brand page https://shopbeam.com/products/pre-workout lists Travel Sticks at $39.99 and in stock. SKU MIX-RPPW20SB1. The facts image prints Serving Size 1 Stick (9.7 g) and Servings Per Container 20. It does not print an other-ingredients line. No UPC was printed. Missing UPC. No code was invented. The jar variant is not this row.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: number }> = {
  'beam-b318-v-ssential-60': { verdict: 'caution', counted: 0 },
  'beam-b318-preworkout-sticks-20': { verdict: 'clean', counted: 0 },
};

const ROWS = BATCH318_KYR6D_T121U;
if (ROWS.length !== 2) throw new Error('batch318 count');
for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch318 unexpected ${record.id}`);
  if (record.verdict !== expected.verdict) throw new Error(`batch318 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch318 barcode ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== expected.counted) throw new Error(`batch318 stack ${record.id} ${counted.map((i) => i.name).join(',')}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch318 generic ${ingredient.name}: ${why}`);
    }
  }
}
