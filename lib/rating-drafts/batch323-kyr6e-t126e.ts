// DRAFT / not verified / batch 323 KYR6-e (t126e).
// Beam brand facts images are the single source. No UPC was printed.
// No brand is closed. The Sprouts section is not edited. No new locks.
// Amazon was not opened (t68u).

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
const MONK = 'Methodology §5 Cleared (monk fruit extract).';
const CALSIL =
  'Methodology §5 Caution (calcium silicate). Not the silicon dioxide cap. Does not count toward the t137u stack.';
const SIO2 = 'Methodology §5 Caution (silicon dioxide cap). Does not count toward the t137u stack.';
const REB = 'Methodology §5 Cleared (Rebaudioside M).';
const STEVIOL =
  'Methodology §5 Limited (steviol glycosides — founder lock t16u). Counts toward the t137u stack.';
const BEET = 'Methodology §5 Cleared (beet powder for color).';
const BEET_ROOT = 'Methodology §5 Cleared (beet root powder for color).';
const BLUE = 'Methodology §5 Cleared (blue spirulina for color).';
const COCOA = 'Methodology §5 Cleared (cocoa powder, t56u).';
const STEVIA =
  'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u). Counts toward the t137u stack. Not Cleared Rebaudioside M.';
const BETA =
  'Methodology §5 Caution (beta-carotene as a color). Does not count toward the t137u stack.';
const MILK =
  'Methodology §5 Cleared (Coconut Milk Powder (Coconut Milk, Cassava Dextrin) — founder lock t123e). Does not count toward the t137u stack.';

const GREENS_NOTE =
  'Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Monk fruit extract, citric acid, and L-malic acid are Cleared and do not stack. The vitamins, minerals, organic greens blend, mushroom extracts, ashwagandha, and elderberry extract are the supplement-facts actives and are not graded. No UPC was printed. Missing UPC.';

const CREATINE_FLAVOR_NOTE =
  'Counted Limited tokens: Natural Flavors and Stevia Extract. That is two, so this is not a 3+ stack. Stevia Extract is not Rebaudioside M. Silicon dioxide is the cap and does not count. Calcium silicate is a silicate flow agent, not that cap, so it did not get the silica flag. Creatine monohydrate is the supplement-facts active and is not graded. No UPC was printed. Missing UPC. This is not beam-b316-creatine-unflavored-5 or beam-b316-creatine-unflavored-100.';

const BIOTIC_NOTE =
  'Counted Limited tokens: Natural Flavors and Steviol Glycosides. That is two, so this is not a 3+ stack. Steviol Glycosides is not Rebaudioside M. Inulin, the postbiotic, glutathione, and the three live strains are the supplement-facts actives and are not graded. No UPC was printed. Missing UPC. Duo packs and the variety pack are multipacks and are not this row.';

function greensFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Natural Flavors', 'limited', FLAVOR),
    flag(panel, 'Monk Fruit Extract', 'cleared', MONK),
    flag(panel, 'Citric Acid', 'cleared', CITRIC),
    flag(panel, 'L-Malic Acid', 'cleared', MALIC),
  ];
}

function bioticBase(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'L-Malic Acid', 'cleared', MALIC),
    flag(panel, 'Citric Acid', 'cleared', CITRIC),
    flag(panel, 'Natural Flavors', 'limited', FLAVOR),
    flag(panel, 'Steviol Glycosides', 'limited', STEVIOL),
  ];
}

const BIOTIC_ACTIVES = [
  { name: 'Organic Inulin (from Chicory Root)', strength: '300 mg' },
  { name: 'Keystone Postbiotic', strength: '300 mg' },
  { name: 'Setria Glutathione Reduced', strength: '75 mg' },
  { name: 'Lactobacillus plantarum', strength: '12.5 mg' },
  { name: 'Lactobacillus rhamnosus', strength: '10 mg' },
  { name: 'Bifidobacterium lactis', strength: '5 mg' },
];

export const BATCH323_KYR6E_T126E: RatingRecord[] = [
  finish({
    id: 'beam-b323-greens-strawberrykiwi-5',
    productName: 'Beam Greens Strawberry Kiwi (5 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-greens-strawberrykiwi-5',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Greens vitamin, mineral, and plant blend' }],
    inactiveIngredients: greensFlags('Beam facts image. Greens Strawberry Kiwi, 5 servings.'),
    verdict: 'caution',
    honestNote: `${GREENS_NOTE} Serving size is 1 stick (5 g) and the pack is 5 servings.`,
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-greens-5-servings lists Strawberry Kiwi at $14.99 and in stock. SKU MIX-GSKW5B1. The facts image prints Serving Size 1 Stick (5 g) and Servings Per Container 5. Other ingredients: Natural Flavors, Monk Fruit Extract, Citric Acid, L-Malic Acid. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-greens-strawberrykiwi-15',
    productName: 'Beam Greens Strawberry Kiwi (15 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-greens-strawberrykiwi-15',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Greens vitamin, mineral, and plant blend' }],
    inactiveIngredients: greensFlags('Beam facts image. Greens Strawberry Kiwi, 15 servings.'),
    verdict: 'caution',
    honestNote: `${GREENS_NOTE} Serving size is 1 stick (5 g) and the pack is 15 servings.`,
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-greens-15-servings lists Strawberry Kiwi at $34.99 and in stock. SKU MIX-GSKW15B1. The facts image prints Serving Size 1 stick (5 g) and Servings Per Container 15. Other ingredients: Natural Flavors, Monk Fruit Extract, Citric Acid, L-Malic Acid. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-greens-strawberrykiwi-30',
    productName: 'Beam Greens Strawberry Kiwi (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-greens-strawberrykiwi-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Greens vitamin, mineral, and plant blend' }],
    inactiveIngredients: greensFlags('Beam facts image. Greens Strawberry Kiwi, 30 servings.'),
    verdict: 'caution',
    honestNote: `${GREENS_NOTE} Serving size is 1 scoop (5 g) and the tub is 30 servings.`,
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-green-powder lists the Strawberry Kiwi tub at $59.99 and in stock. SKU MIX-GSKW30SB1. The facts image prints Serving Size 1 scoop (5 g) and Servings Per Container 30. Other ingredients: Natural Flavors, Monk Fruit Extract, Citric Acid, L-Malic Acid. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-creatine-unflavored-30',
    productName: 'Beam Creatine Unflavored (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-creatine-unflavored-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Creatine Monohydrate', strength: '5 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. The supplement-facts panel does not print an other-ingredients line. Creatine monohydrate is the supplement-facts active and is not graded. Serving size is 1 scoop (5 g) and the tub is 30 servings. No UPC was printed. Missing UPC. This is not beam-b316-creatine-unflavored-5 or beam-b316-creatine-unflavored-100.',
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-creatine lists Unflavored at $35.99 and in stock. SKU MIX-CRTN30B1. The facts image prints Serving Size 1 Scoop (5 g) and Servings Per Container 30. The only supplement-facts line is Creatine Monohydrate 5 g. No other-ingredients line. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-creatine-blueraspberry-30',
    productName: 'Beam Creatine Blue Raspberry (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-creatine-blueraspberry-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Creatine Monohydrate', strength: '5 g' }],
    inactiveIngredients: [
      flag('Beam facts image. Creatine Blue Raspberry, 30 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Beam facts image. Creatine Blue Raspberry, 30 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Creatine Blue Raspberry, 30 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Beam facts image. Creatine Blue Raspberry, 30 servings.', 'Stevia Extract', 'limited', STEVIA),
      flag('Beam facts image. Creatine Blue Raspberry, 30 servings.', 'Calcium Silicate', 'moderate', CALSIL),
      flag('Beam facts image. Creatine Blue Raspberry, 30 servings.', 'Silicon Dioxide', 'moderate', SIO2),
      flag('Beam facts image. Creatine Blue Raspberry, 30 servings.', 'Blue Spirulina (for color)', 'cleared', BLUE),
    ],
    verdict: 'caution',
    honestNote: `${CREATINE_FLAVOR_NOTE} Serving size is 1 scoop (6.6 g) and the tub is 30 servings.`,
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-creatine lists Blue Raspberry at $35.99 and in stock. SKU MIX-CRBR30B1. The facts image prints Serving Size 1 Scoop (6.6 g) and Servings Per Container 30. Other ingredients: L-Malic Acid, Natural Flavors, Citric Acid, Stevia Extract, Calcium Silicate, Silicon Dioxide, Blue Spirulina (for color). No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-creatine-watermelon-30',
    productName: 'Beam Creatine Watermelon (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-creatine-watermelon-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Creatine Monohydrate', strength: '5 g' }],
    inactiveIngredients: [
      flag('Beam facts image. Creatine Watermelon, 30 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Beam facts image. Creatine Watermelon, 30 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Creatine Watermelon, 30 servings.', 'Stevia Extract', 'limited', STEVIA),
      flag('Beam facts image. Creatine Watermelon, 30 servings.', 'Calcium Silicate', 'moderate', CALSIL),
      flag('Beam facts image. Creatine Watermelon, 30 servings.', 'Silicon Dioxide', 'moderate', SIO2),
      flag('Beam facts image. Creatine Watermelon, 30 servings.', 'Beet Root Powder (for color)', 'cleared', BEET_ROOT),
    ],
    verdict: 'caution',
    honestNote: `${CREATINE_FLAVOR_NOTE} Serving size is 1 scoop (6.7 g) and the tub is 30 servings.`,
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-creatine lists Watermelon at $35.99 and in stock. SKU MIX-CRWM30B1. The facts image prints Serving Size 1 Scoop (6.7 g) and Servings Per Container 30. Other ingredients: L-Malic Acid, Natural Flavors, Stevia Extract, Calcium Silicate, Silicon Dioxide, Beet Root Powder (for color). No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-creatine-raspberrylemon-30',
    productName: 'Beam Creatine Raspberry Lemon (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-creatine-raspberrylemon-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Creatine Monohydrate', strength: '5 g' }],
    inactiveIngredients: [
      flag('Beam facts image. Creatine Raspberry Lemon, 30 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Beam facts image. Creatine Raspberry Lemon, 30 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Creatine Raspberry Lemon, 30 servings.', 'Stevia Extract', 'limited', STEVIA),
      flag('Beam facts image. Creatine Raspberry Lemon, 30 servings.', 'Calcium Silicate', 'moderate', CALSIL),
      flag('Beam facts image. Creatine Raspberry Lemon, 30 servings.', 'Silicon Dioxide', 'moderate', SIO2),
      flag('Beam facts image. Creatine Raspberry Lemon, 30 servings.', 'Beet Root Powder (for color)', 'cleared', BEET_ROOT),
    ],
    verdict: 'caution',
    honestNote: `${CREATINE_FLAVOR_NOTE} Serving size is 1 scoop (7 g) and the tub is 30 servings.`,
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-creatine lists Raspberry Lemon at $35.99 and in stock. SKU MIX-CRRL30B1. The facts image prints Serving Size 1 Scoop (7 g) and Servings Per Container 30. Other ingredients: Citric Acid, Natural Flavors, Stevia Extract, Calcium Silicate, Silicon Dioxide, Beet Root Powder (for color). No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-preworkout-jar-20',
    productName: 'Beam Pre-Workout Jar (20 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-preworkout-jar-20',
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
    inactiveIngredients: [
      flag('Beam facts image. Pre-Workout jar, 20 servings.', 'Citric Acid', 'cleared', CITRIC),
      flag('Beam facts image. Pre-Workout jar, 20 servings.', 'L-Malic Acid', 'cleared', MALIC),
      flag('Beam facts image. Pre-Workout jar, 20 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Pre-Workout jar, 20 servings.', 'Monk Fruit Extract', 'cleared', MONK),
      flag('Beam facts image. Pre-Workout jar, 20 servings.', 'Calcium Silicate', 'moderate', CALSIL),
      flag('Beam facts image. Pre-Workout jar, 20 servings.', 'Silicon Dioxide', 'moderate', SIO2),
      flag('Beam facts image. Pre-Workout jar, 20 servings.', 'Rebaudioside M (from stevia extract)', 'cleared', REB),
      flag('Beam facts image. Pre-Workout jar, 20 servings.', 'Blue Spirulina (for color)', 'cleared', BLUE),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Rebaudioside M (from stevia extract) is the Cleared Rebaudioside M row. It is not Stevia Extract. Silicon dioxide is the cap and does not count. Calcium silicate does not stack. Monk fruit extract is Cleared. The vitamins, minerals, amino acids, theobromine, and caffeine are the supplement-facts actives and are not graded. Serving size is 1 scoop (9.7 g) and the jar is 20 servings. No UPC was printed. Missing UPC. This is not beam-b318-preworkout-sticks-20.',
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/pre-workout lists the Jar at $39.99 and in stock. SKU MIX-RPPW20B1. The jar facts image prints Serving Size 1 Scoop (9.7 g) and Servings Per Container 20. Other ingredients: Citric Acid, L-Malic Acid, Natural Flavors, Monk Fruit Extract, Calcium Silicate, Silicon Dioxide, Rebaudioside M (from stevia extract), Blue Spirulina (for color). No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-biotic-watermelon-30',
    productName: 'Beam Biotic Watermelon (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-biotic-watermelon-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: BIOTIC_ACTIVES,
    inactiveIngredients: [
      ...bioticBase('Beam facts image. Biotic Watermelon, 30 servings.'),
      flag('Beam facts image. Biotic Watermelon, 30 servings.', 'Beet Powder (for color)', 'cleared', BEET),
      flag('Beam facts image. Biotic Watermelon, 30 servings.', 'Rebaudioside M', 'cleared', REB),
    ],
    verdict: 'caution',
    honestNote: `${BIOTIC_NOTE} Serving size is 1 stick (2.7 g) and the pouch is 30 servings.`,
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/biotic lists Watermelon, 30 servings, at $64.99 and in stock. SKU MIX-GUWTR30B1. The facts image prints Serving Size 1 Stick (2.7 g) and Servings Per Container 30. Other ingredients: L-Malic Acid, Citric Acid, Natural Flavors, Steviol Glycosides, Beet Powder (for color), Rebaudioside M. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-biotic-lemonade-30',
    productName: 'Beam Biotic Lemonade (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-biotic-lemonade-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: BIOTIC_ACTIVES,
    inactiveIngredients: [
      ...bioticBase('Beam facts image. Biotic Lemonade, 30 servings.'),
      flag('Beam facts image. Biotic Lemonade, 30 servings.', 'Beta Carotene (for color)', 'moderate', BETA),
    ],
    verdict: 'caution',
    honestNote: `${BIOTIC_NOTE} Beta Carotene (for color) is a color and does not count. Serving size is 1 stick (2.4 g) and the pouch is 30 servings.`,
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/biotic lists Lemonade, 30 servings, at $64.99 and in stock. SKU MIX-GUCS30B1. The facts image prints Serving Size 1 Stick (2.4 g) and Servings Per Container 30. Other ingredients: Citric Acid, Natural Flavors, L-Malic Acid, Steviol Glycosides, Beta Carotene (for color). No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-biotic-blueraspberry-30',
    productName: 'Beam Biotic Blue Raspberry (30 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-biotic-blueraspberry-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: BIOTIC_ACTIVES,
    inactiveIngredients: [
      ...bioticBase('Beam facts image. Biotic Blue Raspberry, 30 servings.'),
      flag('Beam facts image. Biotic Blue Raspberry, 30 servings.', 'Blue Spirulina (for color)', 'cleared', BLUE),
    ],
    verdict: 'caution',
    honestNote: `${BIOTIC_NOTE} Serving size is 1 stick (2.6 g) and the pouch is 30 servings.`,
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/biotic lists Blue Raspberry, 30 servings, at $64.99 and in stock. SKU MIX-GUBR30B1. The facts image prints Serving Size 1 Stick (2.6 g) and Servings Per Container 30. Other ingredients: Natural Flavors, L-Malic Acid, Citric Acid, Steviol Glycosides, Blue Spirulina (for color). No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-kids-cookie-5',
    productName: 'Beam Kids Chocolate Chip Cookie Superpowder (5 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-kids-cookie-5',
    form: 'powder',
    audience: KIDS,
    minAge: 2,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Organic Greens Blend' },
      { name: 'Organic Fruit Blend' },
      { name: 'Probiotic Blend' },
      { name: 'Vitamin K2 (as Menatetrenone) (MK-4)', strength: '5 mcg' },
    ],
    inactiveIngredients: [
      flag('Beam facts image. Kids Chocolate Chip Cookie, 5 servings.', 'Cocoa Powder', 'cleared', COCOA),
      flag('Beam facts image. Kids Chocolate Chip Cookie, 5 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Kids Chocolate Chip Cookie, 5 servings.', 'Monk Fruit Extract', 'cleared', MONK),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Cocoa powder and monk fruit extract are Cleared and do not stack. The greens blend, fruit blend, probiotic blend, vitamins, and minerals are the supplement-facts actives and are not graded. Serving size is 1 packet (6.5 g) and the pack is 5 servings. The facts panel prints a daily value column for children 2 through 3 years. No UPC was printed. Missing UPC. This is not beam-b316-kids-chocolate-5.',
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-kids-chocolate-chip-cookie-travel-pack-5-servings lists Chocolate Chip Cookie at $14.99 and in stock. SKU MIX-KGCC5B1. The facts image prints Serving Size 1 Packet (6.5 g) and Servings Per Container 5. Other ingredients: Cocoa Powder, Natural Flavors, Monk Fruit Extract. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-kids-chocolate-20',
    productName: 'Beam Kids Chocolate Superpowder (20 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-kids-chocolate-20',
    form: 'powder',
    audience: KIDS,
    minAge: 2,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Organic Greens Blend' },
      { name: 'Organic Fruit Blend' },
      { name: 'Probiotic Blend' },
      { name: 'Vitamin K2 (as Menatetrenone) (MK-4)', strength: '5 mcg' },
    ],
    inactiveIngredients: [
      flag('Beam facts image. Kids Chocolate, 20 servings.', 'Cocoa Powder', 'cleared', COCOA),
      flag('Beam facts image. Kids Chocolate, 20 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Kids Chocolate, 20 servings.', 'Monk Fruit Extract', 'cleared', MONK),
      flag('Beam facts image. Kids Chocolate, 20 servings.', 'Rebaudioside M', 'cleared', REB),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Cocoa powder, monk fruit extract, and Rebaudioside M are Cleared and do not stack. The greens blend, fruit blend, probiotic blend, vitamins, and minerals are the supplement-facts actives and are not graded. Serving size is 1 scoop (7.6 g) and the tub is 20 servings. The facts panel prints a daily value column for children 2 through 3 years. No UPC was printed. Missing UPC. The 2-kid, 3-kid, and 4-kid offers are multipacks and are not this row. This is not beam-b316-kids-chocolate-5.',
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-kids-greens-superpowder lists Chocolate, 1 kid, at $54.99 and in stock. SKU MIX-KGCM20B1. The facts image prints Serving Size 1 Scoop (7.6 g) and Servings Per Container 20. Other ingredients: Cocoa Powder, Natural Flavors, Monk Fruit Extract, Rebaudioside M. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-kids-cookie-20',
    productName: 'Beam Kids Chocolate Chip Cookie Superpowder (20 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-kids-cookie-20',
    form: 'powder',
    audience: KIDS,
    minAge: 2,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Organic Greens Blend' },
      { name: 'Organic Fruit Blend' },
      { name: 'Probiotic Blend' },
      { name: 'Vitamin K2 (as Menatetrenone) (MK-4)', strength: '5 mcg' },
    ],
    inactiveIngredients: [
      flag('Beam facts image. Kids Chocolate Chip Cookie, 20 servings.', 'Cocoa Powder', 'cleared', COCOA),
      flag('Beam facts image. Kids Chocolate Chip Cookie, 20 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Kids Chocolate Chip Cookie, 20 servings.', 'Rebaudioside M', 'cleared', REB),
      flag('Beam facts image. Kids Chocolate Chip Cookie, 20 servings.', 'Monk Fruit Extract', 'cleared', MONK),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Cocoa powder, Rebaudioside M, and monk fruit extract are Cleared and do not stack. The greens blend, fruit blend, probiotic blend, vitamins, and minerals are the supplement-facts actives and are not graded. Serving size is 1 scoop (6 g) and the tub is 20 servings. The facts panel prints a daily value column for children 2 through 3 years. No UPC was printed. Missing UPC. The multi-kid offers and the chocolate plus cookie duo are multipacks and are not this row.',
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-kids-greens-superpowder lists Chocolate Chip Cookie, 1 kid, at $54.99 and in stock. SKU MIX-KGCC20B1. The facts image prints Serving Size 1 Scoop (6 g) and Servings Per Container 20. Other ingredients: Cocoa Powder, Natural Flavors, Rebaudioside M, Monk Fruit Extract. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b323-kids-berryvanilla-20',
    productName: 'Beam Kids Berry Vanilla Superpowder (20 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b323-kids-berryvanilla-20',
    form: 'powder',
    audience: KIDS,
    minAge: 2,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Organic Greens Blend' },
      { name: 'Organic Fruit Blend' },
      { name: 'Probiotic Blend' },
    ],
    inactiveIngredients: [
      flag(
        'Beam facts image. Kids Berry Vanilla, 20 servings.',
        'Coconut Milk Powder (Coconut milk, Cassava dextrin)',
        'cleared',
        MILK,
      ),
      flag('Beam facts image. Kids Berry Vanilla, 20 servings.', 'Natural Flavors', 'limited', FLAVOR),
      flag('Beam facts image. Kids Berry Vanilla, 20 servings.', 'Rebaudioside M', 'cleared', REB),
      flag('Beam facts image. Kids Berry Vanilla, 20 servings.', 'Monk Fruit Extract', 'cleared', MONK),
      flag('Beam facts image. Kids Berry Vanilla, 20 servings.', 'Blue Spirulina (for color)', 'cleared', BLUE),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Coconut Milk Powder (Coconut milk, Cassava dextrin) is the Cleared t123e coconut-milk-powder token. The lowercase letters inside the parenthesis do not make a second ingredient, and Cassava dextrin inside it is not graded again. Rebaudioside M and monk fruit extract are Cleared. Blue spirulina is a color and does not count. The greens blend, fruit blend, probiotic blend, vitamins, and minerals are the supplement-facts actives and are not graded. Serving size is 1 scoop (6 g) and the tub is 20 servings. No UPC was printed. Missing UPC. The 2-kid offer is a multipack and is not this row.',
    sourcesGeneral: [
      't126e. Beam brand page https://shopbeam.com/products/beam-kids-greens-superpowder lists Berry Vanilla, 1 kid, at $54.99 and in stock. SKU MIX-KGBV20B1. The facts image prints Serving Size 1 Scoop (6 g) and Servings Per Container 20. Other ingredients: Coconut Milk Powder (Coconut milk, Cassava dextrin), Natural Flavors, Rebaudioside M, Monk Fruit Extract, Blue Spirulina (for color). No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: number }> = {
  'beam-b323-greens-strawberrykiwi-5': { verdict: 'caution', counted: 1 },
  'beam-b323-greens-strawberrykiwi-15': { verdict: 'caution', counted: 1 },
  'beam-b323-greens-strawberrykiwi-30': { verdict: 'caution', counted: 1 },
  'beam-b323-creatine-unflavored-30': { verdict: 'clean', counted: 0 },
  'beam-b323-creatine-blueraspberry-30': { verdict: 'caution', counted: 2 },
  'beam-b323-creatine-watermelon-30': { verdict: 'caution', counted: 2 },
  'beam-b323-creatine-raspberrylemon-30': { verdict: 'caution', counted: 2 },
  'beam-b323-preworkout-jar-20': { verdict: 'caution', counted: 1 },
  'beam-b323-biotic-watermelon-30': { verdict: 'caution', counted: 2 },
  'beam-b323-biotic-lemonade-30': { verdict: 'caution', counted: 2 },
  'beam-b323-biotic-blueraspberry-30': { verdict: 'caution', counted: 2 },
  'beam-b323-kids-cookie-5': { verdict: 'caution', counted: 1 },
  'beam-b323-kids-chocolate-20': { verdict: 'caution', counted: 1 },
  'beam-b323-kids-cookie-20': { verdict: 'caution', counted: 1 },
  'beam-b323-kids-berryvanilla-20': { verdict: 'caution', counted: 1 },
};
const ROWS = BATCH323_KYR6E_T126E;
if (ROWS.length !== 15) throw new Error(`batch323 count ${ROWS.length}`);
for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch323 unexpected ${record.id}`);
  if (record.verdict !== expected.verdict) throw new Error(`batch323 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch323 barcode ${record.id}`);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch323 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== expected.counted) {
    throw new Error(`batch323 stack ${record.id} ${counted.map((item) => item.name).join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch323 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch323 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
