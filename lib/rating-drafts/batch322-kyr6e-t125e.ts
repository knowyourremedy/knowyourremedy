// DRAFT / not verified / batch 322 KYR6-e (t125e).
// Beam brand facts images are the single source. No UPC was printed.
// No brand is closed. The Sprouts section is not edited. No new locks.

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
const CALSIL =
  'Methodology §5 Caution (calcium silicate). Not the silicon dioxide cap. Does not count toward the t137u stack.';
const SIO2 =
  'Methodology §5 Caution (silicon dioxide cap). Does not count toward the t137u stack.';
const REB = 'Methodology §5 Cleared (Rebaudioside M).';
const STEVIOL =
  'Methodology §5 Limited (steviol glycosides — founder lock t16u). Counts toward the t137u stack.';
const BEET = 'Methodology §5 Cleared (beet powder for color).';
const BEET_ROOT = 'Methodology §5 Cleared (beet root powder for color).';
const BLUE = 'Methodology §5 Cleared (blue spirulina for color).';

const GLOW_NOTE =
  'Counted Limited tokens: Natural Flavors and Steviol Glycosides. That is two, so this is not a 3+ stack. Silicon dioxide is the cap and does not count. Calcium silicate is a silicate flow agent, not that cap, so it did not get the silica flag. Steviol Glycosides is not Rebaudioside M. Serving size is 1 stick (6.7 g) and the pouch is 30 servings. The vitamins, minerals, and named plant extracts on the supplement facts are actives and are not graded. No UPC was printed. Missing UPC. Duo packs and the variety pack are multipacks and are not this row.';

const GLOW_URL = 'https://shopbeam.com/products/glow-by-jenn-todryk';

export const BATCH322_KYR6E_T125E: RatingRecord[] = [
  finish({
    id: 'beam-b322-glow-watermelon-30',
    productName: 'Beam Glow Watermelon (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b322-glow-watermelon-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Glow vitamin and mineral blend' }],
    inactiveIngredients: [
      flag('Beam facts image. Glow Watermelon, 30 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Beam facts image. Glow Watermelon, 30 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Beam facts image. Glow Watermelon, 30 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Glow Watermelon, 30 servings.', 'Calcium Silicate', 'moderate', CALSIL),
      flag('Beam facts image. Glow Watermelon, 30 servings.', 'Silicon Dioxide', 'moderate', SIO2),
      flag('Beam facts image. Glow Watermelon, 30 servings.', 'Rebaudioside M', 'cleared', REB),
      flag('Beam facts image. Glow Watermelon, 30 servings.', 'Beet Powder (for color)', 'cleared', BEET),
      flag('Beam facts image. Glow Watermelon, 30 servings.', 'Steviol Glycosides', 'limited', STEVIOL),
    ],
    verdict: 'caution',
    honestNote: GLOW_NOTE,
    sourcesGeneral: [
      `t125e. Beam brand page ${GLOW_URL} lists Watermelon, 30 servings, at $64.99 and in stock. The facts image prints Serving Size 1 Stick (6.7 g) and Servings Per Container 30. Other ingredients: Citric Acid, L-Malic Acid, Natural Flavors, Calcium Silicate, Silicon Dioxide, Rebaudioside M, Beet Powder (for color), Steviol Glycosides. No UPC was printed. Missing UPC. No code was invented. This is not beam-b321-glow-peach-30.`,
    ],
  }),
  finish({
    id: 'beam-b322-glow-raspberry-30',
    productName: 'Beam Glow Raspberry (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b322-glow-raspberry-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Glow vitamin and mineral blend' }],
    inactiveIngredients: [
      flag('Beam facts image. Glow Raspberry, 30 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Beam facts image. Glow Raspberry, 30 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Beam facts image. Glow Raspberry, 30 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Glow Raspberry, 30 servings.', 'Calcium Silicate', 'moderate', CALSIL),
      flag('Beam facts image. Glow Raspberry, 30 servings.', 'Silicon Dioxide', 'moderate', SIO2),
      flag('Beam facts image. Glow Raspberry, 30 servings.', 'Beet Root Powder (for color)', 'cleared', BEET_ROOT),
      flag('Beam facts image. Glow Raspberry, 30 servings.', 'Rebaudioside M', 'cleared', REB),
      flag('Beam facts image. Glow Raspberry, 30 servings.', 'Steviol Glycosides', 'limited', STEVIOL),
    ],
    verdict: 'caution',
    honestNote: GLOW_NOTE,
    sourcesGeneral: [
      `t125e. Beam brand page ${GLOW_URL} lists Raspberry, 30 servings, at $64.99 and in stock. The facts image prints Serving Size 1 Stick (6.7 g) and Servings Per Container 30. Other ingredients: L-Malic Acid, Citric Acid, Natural Flavors, Calcium Silicate, Silicon Dioxide, Beet Root Powder (for color), Rebaudioside M, Steviol Glycosides. No UPC was printed. Missing UPC. No code was invented.`,
    ],
  }),
  finish({
    id: 'beam-b322-glow-blueraspberry-30',
    productName: 'Beam Glow Blue Raspberry (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b322-glow-blueraspberry-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Glow vitamin and mineral blend' }],
    inactiveIngredients: [
      flag('Beam facts image. Glow Blue Raspberry, 30 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Beam facts image. Glow Blue Raspberry, 30 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Beam facts image. Glow Blue Raspberry, 30 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Glow Blue Raspberry, 30 servings.', 'Calcium Silicate', 'moderate', CALSIL),
      flag('Beam facts image. Glow Blue Raspberry, 30 servings.', 'Silicon Dioxide', 'moderate', SIO2),
      flag('Beam facts image. Glow Blue Raspberry, 30 servings.', 'Rebaudioside M', 'cleared', REB),
      flag('Beam facts image. Glow Blue Raspberry, 30 servings.', 'Steviol Glycosides', 'limited', STEVIOL),
      flag('Beam facts image. Glow Blue Raspberry, 30 servings.', 'Blue Spirulina (for color)', 'cleared', BLUE),
    ],
    verdict: 'caution',
    honestNote: GLOW_NOTE,
    sourcesGeneral: [
      `t125e. Beam brand page ${GLOW_URL} lists Blue Raspberry, 30 servings, at $64.99 and in stock. The facts image prints Serving Size 1 Stick (6.7 g) and Servings Per Container 30. Other ingredients: Citric Acid, L-Malic Acid, Natural Flavors, Calcium Silicate, Silicon Dioxide, Rebaudioside M, Steviol Glycosides, Blue Spirulina (for color). No UPC was printed. Missing UPC. No code was invented.`,
    ],
  }),
  finish({
    id: 'beam-b322-collagen-unflavored-30',
    productName: 'Beam Collagen Unflavored (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b322-collagen-unflavored-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Grass-Fed Bovine Collagen Peptides (Types I + III)', strength: '10 g' },
      { name: 'Hyaluronic Acid', strength: '100 mg' },
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '90 mg' },
      { name: 'Biotin', strength: '5000 mcg' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. The supplement-facts panel does not print an other-ingredients line. Grass-fed bovine collagen peptides, hyaluronic acid, vitamin C, and biotin are the supplement-facts actives and are not graded. Serving size is 1 scoop (10.3 g) and the tub is 30 servings. Sodium on the facts panel is a nutrient line and is not graded. No UPC was printed. Missing UPC. This is not beam-b316-collagen-unflavored-5.',
    sourcesGeneral: [
      't125e. Beam brand page https://shopbeam.com/products/collagen lists the unflavored tub at $39.99 and in stock. The facts image prints Serving Size 1 scoop (10.3 g) and Servings Per Container 30. Lines: Protein 9 g, Vitamin C (as Ascorbic Acid) 90 mg, Biotin 5000 mcg, Sodium 30 mg, Grass-Fed Bovine Collagen Peptides (Types I + III) 10 g, Hyaluronic Acid 100 mg. No other-ingredients line. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: number }> = {
  'beam-b322-glow-watermelon-30': { verdict: 'caution', counted: 2 },
  'beam-b322-glow-raspberry-30': { verdict: 'caution', counted: 2 },
  'beam-b322-glow-blueraspberry-30': { verdict: 'caution', counted: 2 },
  'beam-b322-collagen-unflavored-30': { verdict: 'clean', counted: 0 },
};
const ROWS = BATCH322_KYR6E_T125E;
if (ROWS.length !== 4) throw new Error(`batch322 count ${ROWS.length}`);
for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch322 unexpected ${record.id}`);
  if (record.verdict !== expected.verdict) throw new Error(`batch322 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch322 barcode ${record.id}`);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch322 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== expected.counted) {
    throw new Error(`batch322 stack ${record.id} ${counted.map((item) => item.name).join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch322 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch322 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
