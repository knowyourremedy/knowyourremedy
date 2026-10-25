// DRAFT / not verified / batch 270 KYR6-d (t41u Spring Valley).
// House brand sold only through Walmart. The Walmart panel is the single source (t41u).
// Held, not in this file: 3X Glucosamine Chondroitin 60 (panel not readable);
// ALCAR + ALA 50 (Walmart specs add MCT that the panel does not show).

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';

const METH = {
  gelatin: 'Methodology §5 Cleared (gelatin softgel / capsule base, including bovine).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  sunflowerLecithin: 'Methodology §5 Cleared (sunflower lecithin — lecithin family).',
  water: 'Methodology §5 Cleared (water / purified water).',
  soyLecithin: 'Methodology §5 Cleared (lecithin (soy) — lecithin / soy lecithin).',
  caramel:
    'Methodology §5 High (caramel color, undisclosed class — locked v1.6). The label does not name Class I or II.',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  natFlavor:
    'Methodology §5 Caution (Natural Flavor, singular — flavor family row). Not the Limited natural flavors mixture. Does not count toward the t137u stack.',
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent). Counts toward the t137u stack.',
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate — mixed-tocopherols / ascorbyl palmitate antioxidant).',
  silica:
    'Methodology §5 Caution (silicon dioxide / silica — 0-pt Caution cap; does not count toward the t137u stack).',
  potatoStarch: 'Methodology §5 Cleared (potato starch — named simple starch).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC capsule shell).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  ascorbic: 'Methodology §5 Cleared (ascorbic acid — ascorbate family; preservative use stays this row).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium — cellulose disintegrant).',
  hpc:
    'Methodology §5 Cleared (L-hydroxypropyl cellulose — low-substituted hydroxypropyl cellulose / HPC; hyphen and the L- prefix are the low-substituted spelling). Same Cleared HPC / HPMC family. Not a new grade.',
  mct:
    'Methodology §5 Limited (medium-chain triglycerides with no plant named). Not named MCT fill. Not the gummy seed-oil High. Counts toward the t137u stack.',
  caneSugar: 'Methodology §5 Cleared (cane sugar — food sweetener).',
  loHan:
    'Methodology §5 Cleared (monk fruit / Lo Han Fruit Concentrate — mogroside sweetener).',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity, not a known hazard). Counts toward the t137u stack.',
  annatto:
    'Methodology §5 Caution (Organic Annatto Extract (Color) — annatto row). Does not count toward the t137u stack.',
  blackCarrot:
    'Methodology §5 Cleared (organic black carrot juice concentrate (color) — named fruit-or-vegetable juice concentrate as color).',
  carnauba:
    'Methodology §5 Cleared (organic carnauba wax — founder lock t133u Oct 20, 2026).',
  sunflowerGummy:
    'Methodology §5 High (organic sunflower oil in a gummy — seed/industrial oils in gummies / lozenges).',
  turmericColor:
    'Methodology §5 Cleared (Organic Turmeric Extract (Color) — Turmeric Extract Color / Turmeric (Color)).',
  pectin: 'Methodology §5 Cleared (pectin / standard food gums).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate salts).',
  tapiocaSyrup:
    'Methodology §5 Cleared (organic tapioca syrup — cane sugar, glucose syrup, tapioca syrup/dextrose). Not tapioca maltodextrin. Not tapioca dextrose.',
  organicSugar:
    'Methodology §5 Cleared (Organic Sugar — t90u Cleared cane sugar; bare Sugar stays Caution).',
  riceHull: 'Methodology §5 Cleared (Rice Hull — rice hulls / rice hull concentrate family; t119u / t120u).',
  riceBran:
    'Methodology §5 Cleared (rice bran — organic rice bran / rice bran plant-fiber family; t111u).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_BRAIN =
  'Walmart ip/13061843 panel image OTHER INGREDIENTS (new formula). The page Inactive Ingredients block is the older look and was not graded. t41u house-brand single source.';
const PANEL_PROBIOTIC =
  'Walmart ip/15123769910 panel image OTHER INGREDIENTS. Page text typo Hyperomellose was not graded. Zinc oxide is the facts zinc and is not an other ingredient. t41u house-brand single source.';
const PANEL_50 =
  'Walmart ip/19454607251 panel image OTHER INGREDIENTS. The page text matches the panel. t41u house-brand single source.';
const PANEL_FIBER =
  'Walmart ip/19310411370 ingredients line. Spoonful order was not used. t41u house-brand single source.';
const PANEL_ELDER =
  'Walmart ip/240308511 panel image OTHER INGREDIENTS. The ingredients accordion was empty. t41u house-brand single source.';
const PANEL_MULTI =
  'Walmart ip/19411812887 panel image OTHER INGREDIENTS. Page text L_hydroxypropyl is the panel L-hydroxypropyl cellulose. t41u house-brand single source.';
const PANEL_SUGAR =
  'Walmart ip/15083853537 panel image OTHER INGREDIENTS. The page text matches the panel. t41u house-brand single source.';
const PANEL_ENZYME =
  'Walmart ip/770495984 panel image OTHER INGREDIENTS. The page text says Silica and omits the allergen line. The panel was graded. t41u house-brand single source.';

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

const BRAIN_FLAGS: IngredientFlag[] = [
  flag(PANEL_BRAIN, 'Gelatin (Bovine)', 'cleared', 'gelatin'),
  flag(PANEL_BRAIN, 'Glycerin', 'cleared', 'glycerin'),
  flag(PANEL_BRAIN, 'Sunflower Lecithin', 'cleared', 'sunflowerLecithin'),
  flag(PANEL_BRAIN, 'Water', 'cleared', 'water'),
  flag(PANEL_BRAIN, 'Lecithin (Soy)', 'cleared', 'soyLecithin'),
  flag(PANEL_BRAIN, 'Caramel Color', 'high', 'caramel'),
  flag(PANEL_BRAIN, 'Stearic Acid', 'cleared', 'stearic'),
  flag(PANEL_BRAIN, 'Natural Flavor', 'moderate', 'natFlavor'),
  flag(PANEL_BRAIN, 'Yellow Beeswax', 'cleared', 'beeswax'),
  flag(PANEL_BRAIN, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(PANEL_BRAIN, 'Ascorbyl Palmitate', 'cleared', 'ascorbyl'),
  flag(PANEL_BRAIN, 'Silicon Dioxide', 'limited', 'silica'),
];

const PROBIOTIC_FLAGS: IngredientFlag[] = [
  flag(PANEL_PROBIOTIC, 'Potato Starch', 'cleared', 'potatoStarch'),
  flag(PANEL_PROBIOTIC, 'Hypromellose', 'cleared', 'hpmc'),
  flag(PANEL_PROBIOTIC, 'Magnesium Stearate', 'cleared', 'magStearate'),
  flag(PANEL_PROBIOTIC, 'Ascorbic Acid (Preservative)', 'cleared', 'ascorbic'),
];

const MULTI_FLAGS = (panel: string): IngredientFlag[] => [
  flag(panel, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
  flag(panel, 'Hypromellose', 'cleared', 'hpmc'),
  flag(panel, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
  flag(panel, 'L-Hydroxypropyl Cellulose', 'cleared', 'hpc'),
  flag(panel, 'Magnesium Stearate', 'cleared', 'magStearate'),
  flag(panel, 'Stearic Acid', 'cleared', 'stearic'),
  flag(panel, 'Medium-Chain Triglycerides', 'limited', 'mct'),
];

const FIBER_FLAGS: IngredientFlag[] = [
  flag(PANEL_FIBER, 'Cane Sugar', 'cleared', 'caneSugar'),
  flag(PANEL_FIBER, 'Citric Acid', 'cleared', 'citric'),
  flag(PANEL_FIBER, 'Lo Han Fruit Concentrate', 'cleared', 'loHan'),
  flag(PANEL_FIBER, 'Natural Flavors', 'limited', 'naturalFlavors'),
  flag(PANEL_FIBER, 'Organic Annatto Extract (Color)', 'moderate', 'annatto'),
  flag(PANEL_FIBER, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'blackCarrot'),
  flag(PANEL_FIBER, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
  flag(PANEL_FIBER, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
  flag(PANEL_FIBER, 'Organic Turmeric Extract (Color)', 'cleared', 'turmericColor'),
  flag(PANEL_FIBER, 'Pectin', 'cleared', 'pectin'),
  flag(PANEL_FIBER, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
];

const ELDER_FLAGS: IngredientFlag[] = [
  flag(PANEL_ELDER, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
  flag(PANEL_ELDER, 'Organic Sugar', 'cleared', 'organicSugar'),
  flag(PANEL_ELDER, 'Pectin', 'cleared', 'pectin'),
  flag(PANEL_ELDER, 'Citric Acid', 'cleared', 'citric'),
  flag(PANEL_ELDER, 'Natural Flavors', 'limited', 'naturalFlavors'),
  flag(PANEL_ELDER, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
  flag(PANEL_ELDER, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
  flag(PANEL_ELDER, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
];

const SUGAR_FLAGS: IngredientFlag[] = [
  flag(PANEL_SUGAR, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
  flag(PANEL_SUGAR, 'Rice Hull', 'cleared', 'riceHull'),
  flag(PANEL_SUGAR, 'Rice Bran', 'cleared', 'riceBran'),
];

const ENZYME_FLAGS: IngredientFlag[] = [
  flag(PANEL_ENZYME, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
  flag(PANEL_ENZYME, 'Silicon Dioxide', 'limited', 'silica'),
  flag(PANEL_ENZYME, 'Magnesium Stearate', 'cleared', 'magStearate'),
  flag(PANEL_ENZYME, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
];

export const BATCH270_KYR6D_T41U_SV: RatingRecord[] = [
  finish({
    id: 'springvalley-b270-brain-support-60',
    productName: 'Spring Valley 4-Function Brain Support (60 softgels)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'springvalley-b270-brain-support-60',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131000550',
    activeIngredients: [
      { name: 'Calories', strength: '10 per 2 softgels' },
      { name: 'Total Fat', strength: '1 g per 2 softgels' },
      { name: 'Fish Oil', strength: '1,413 mg per 2 softgels' },
      { name: 'Total Omega-3', strength: '705 mg per 2 softgels' },
      { name: 'EPA', strength: '381 mg per 2 softgels' },
      { name: 'DHA', strength: '254 mg per 2 softgels' },
      { name: 'Turmeric Extract (Longvida)', strength: '400 mg per 2 softgels' },
    ],
    inactiveIngredients: BRAIN_FLAGS,
    verdict: 'avoid',
    retailers: ['Walmart'],
    sourcesGeneral: [
      't41u. Spring Valley is sold only through Walmart, so the Walmart panel is the single source. Graded from the panel image, not the older Inactive Ingredients block. Fish oil and turmeric extract are the actives and are not graded. Contains Alaskan walleye pollock is an allergen line, not a token. Avoid from undisclosed caramel color. Counted Limited token: maltodextrin. Natural Flavor singular is Caution and does not stack. Silicon dioxide is the 0-pt Caution cap and does not stack. UPC 681131000550 is on the Walmart back-label image. UPC-A check digit OK.',
    ],
  }),
  finish({
    id: 'springvalley-b270-womens-probiotic-zinc-30',
    productName: "Spring Valley 5-in-1 Women's Probiotic with Zinc (30 vegetable capsules)",
    brand: BRAND,
    category: 'Digestive',
    formulaId: 'springvalley-b270-womens-probiotic-zinc-30',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: [
      { name: 'Zinc (as Zinc Oxide)', strength: '2.1 mg (19% DV) per capsule' },
      {
        name: 'Probiotic Blend (Lactiplantibacillus plantarum Rosella, Lactobacillus helveticus Rosell-52, Bifidobacterium longum Rosell-175)',
        strength: '134 mg (8 Billion CFU) per capsule',
      },
    ],
    inactiveIngredients: PROBIOTIC_FLAGS,
    verdict: 'clean',
    retailers: ['Walmart'],
    sourcesGeneral: [
      't41u. Walmart panel is the single source. Zinc and the probiotic blend are the actives and are not graded. Other ingredients are Potato Starch, Hypromellose, Magnesium Stearate, and Ascorbic Acid (Preservative). All Cleared. Counted Limited tokens: none. Missing UPC. 194346388905 is the Tallow URL only. Tallow is not a sale page and is not the Walmart label image. The code was not attached. No code was invented.',
    ],
  }),
  finish({
    id: 'springvalley-b270-adult-50-plus-365',
    productName: 'Spring Valley Adult 50+ Multivitamin (365 tablets)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'springvalley-b270-adult-50-plus-365',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: [
      { name: 'Vitamin A', strength: '750 mcg per tablet' },
      { name: 'Vitamin C', strength: '90 mg per tablet' },
      { name: 'Vitamin D', strength: '25 mcg per tablet' },
      { name: 'Vitamin E', strength: '22.5 mg per tablet' },
      { name: 'Vitamin K', strength: '30 mcg per tablet' },
      { name: 'Thiamin', strength: '1.5 mg per tablet' },
      { name: 'Riboflavin', strength: '1.7 mg per tablet' },
      { name: 'Niacin', strength: '20 mg per tablet' },
      { name: 'Vitamin B6', strength: '3 mg per tablet' },
      { name: 'Folate', strength: '850 mcg DFE per tablet' },
      { name: 'Vitamin B12', strength: '25 mcg per tablet' },
      { name: 'Biotin', strength: '30 mcg per tablet' },
      { name: 'Pantothenic Acid', strength: '10 mg per tablet' },
      { name: 'Calcium', strength: '220 mg per tablet' },
      { name: 'Phosphorus', strength: '50 mg per tablet' },
      { name: 'Iodine', strength: '150 mcg per tablet' },
      { name: 'Magnesium', strength: '50 mg per tablet' },
      { name: 'Zinc', strength: '11 mg per tablet' },
      { name: 'Selenium', strength: '55 mcg per tablet' },
      { name: 'Copper', strength: '0.9 mg per tablet' },
      { name: 'Manganese', strength: '2.3 mg per tablet' },
      { name: 'Chromium', strength: '45 mcg per tablet' },
      { name: 'Molybdenum', strength: '45 mcg per tablet' },
      { name: 'Chloride', strength: '70 mg per tablet' },
      { name: 'Potassium', strength: '80 mg per tablet' },
      { name: 'Silicon', strength: '2 mg per tablet' },
      { name: 'Lycopene', strength: '300 mcg per tablet' },
      { name: 'Lutein', strength: '250 mcg per tablet' },
      { name: 'Boron', strength: '150 mcg per tablet' },
      { name: 'Vanadium', strength: '10 mcg per tablet' },
    ],
    inactiveIngredients: MULTI_FLAGS(PANEL_50),
    verdict: 'caution',
    retailers: ['Walmart'],
    sourcesGeneral: [
      't41u. Walmart panel is the single source. The facts vitamins and minerals are actives and are not graded. No iron on this panel. Counted Limited token: medium-chain triglycerides with no plant named. That is one, so this is not a 3+ stack. L-hydroxypropyl cellulose is the Cleared low-substituted HPC row. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'springvalley-b270-fiber-gummy-90',
    productName: 'Spring Valley Adult Daily Fiber Gummies (90 gummies)',
    brand: BRAND,
    category: 'Digestive',
    formulaId: 'springvalley-b270-fiber-gummy-90',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: [
      { name: 'Calories', strength: '25 per 3 gummies' },
      { name: 'Total Carbohydrate', strength: '9 g per 3 gummies' },
      { name: 'Dietary Fiber', strength: '6 g per 3 gummies' },
      { name: 'Soluble Fiber', strength: '6 g per 3 gummies' },
      { name: 'Total Sugars', strength: '4 g per 3 gummies' },
      { name: 'Includes Added Sugars', strength: '<1 g per 3 gummies' },
      { name: 'Sodium', strength: '25 mg per 3 gummies' },
      { name: 'Chicory Root Fiber (Inulin)', strength: '6 g inulin per 3 gummies' },
    ],
    inactiveIngredients: FIBER_FLAGS,
    verdict: 'avoid',
    retailers: ['Walmart'],
    sourcesGeneral: [
      't41u. Walmart line is the single source. Chicory root fiber is the fiber active and is not graded. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. That is one, so this is not a 3+ stack. Organic annatto extract (color) is Caution and does not stack. Missing UPC. 681131409230 is the Spoonful URL only. Spoonful is not a sale page and does not show the 90 count. The code was not attached. No code was invented.',
    ],
  }),
  finish({
    id: 'springvalley-b270-elderberry-gummy-120',
    productName: 'Spring Valley Adult Elderberry Gummies 50 mg (120 gummies)',
    brand: BRAND,
    category: 'Immune Support',
    formulaId: 'springvalley-b270-elderberry-gummy-120',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: [
      { name: 'Calories', strength: '10 per gummy' },
      { name: 'Total Carbohydrate', strength: '2 g per gummy' },
      { name: 'Total Sugars', strength: '1 g per gummy' },
      { name: 'Includes Added Sugars', strength: '1 g per gummy' },
      { name: 'Vitamin C', strength: '45 mg per gummy' },
      { name: 'Zinc (as zinc citrate)', strength: '3.8 mg per gummy' },
      { name: 'Sodium', strength: '15 mg per gummy' },
      {
        name: 'Elderberry Complex (maltodextrin, European elder juice concentrate (berry) (dried))',
        strength: '50 mg per gummy',
      },
    ],
    inactiveIngredients: ELDER_FLAGS,
    verdict: 'avoid',
    retailers: ['Walmart'],
    sourcesGeneral: [
      't41u. Walmart panel image is the single source. Vitamin C, zinc, and the elderberry complex are actives and are not graded. Maltodextrin inside the elderberry complex is not an other ingredient. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. That is one, so this is not a 3+ stack. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'springvalley-b270-adult-multi-365',
    productName: 'Spring Valley Adult Multivitamin (365 tablets)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'springvalley-b270-adult-multi-365',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: [
      { name: 'Vitamin A', strength: '1,050 mcg per tablet' },
      { name: 'Vitamin C', strength: '90 mg per tablet' },
      { name: 'Vitamin D', strength: '10 mcg per tablet' },
      { name: 'Vitamin E', strength: '13.5 mg per tablet' },
      { name: 'Vitamin K', strength: '25 mcg per tablet' },
      { name: 'Thiamin', strength: '1.5 mg per tablet' },
      { name: 'Riboflavin', strength: '1.7 mg per tablet' },
      { name: 'Niacin', strength: '20 mg per tablet' },
      { name: 'Vitamin B6', strength: '2 mg per tablet' },
      { name: 'Folate', strength: '850 mcg DFE per tablet' },
      { name: 'Vitamin B12', strength: '6 mcg per tablet' },
      { name: 'Biotin', strength: '30 mcg per tablet' },
      { name: 'Pantothenic Acid', strength: '10 mg per tablet' },
      { name: 'Calcium', strength: '200 mg per tablet' },
      { name: 'Iron', strength: '18 mg per tablet' },
      { name: 'Phosphorus', strength: '109 mg per tablet' },
      { name: 'Iodine', strength: '150 mcg per tablet' },
      { name: 'Magnesium', strength: '100 mg per tablet' },
      { name: 'Zinc', strength: '11 mg per tablet' },
      { name: 'Selenium', strength: '55 mcg per tablet' },
      { name: 'Copper', strength: '0.9 mg per tablet' },
      { name: 'Manganese', strength: '2.3 mg per tablet' },
      { name: 'Chromium', strength: '45 mcg per tablet' },
      { name: 'Molybdenum', strength: '45 mcg per tablet' },
      { name: 'Chloride', strength: '72 mg per tablet' },
      { name: 'Potassium', strength: '80 mg per tablet' },
      { name: 'Silicon', strength: '2 mg per tablet' },
      { name: 'Lycopene', strength: '300 mcg per tablet' },
      { name: 'Lutein', strength: '250 mcg per tablet' },
      { name: 'Boron', strength: '150 mcg per tablet' },
      { name: 'Vanadium', strength: '10 mcg per tablet' },
    ],
    inactiveIngredients: MULTI_FLAGS(PANEL_MULTI),
    verdict: 'caution',
    retailers: ['Walmart'],
    sourcesGeneral: [
      't41u. Walmart panel is the single source. Tallow GTIN 194346603824 shows different actives and no inactive line. That code was not attached. The facts vitamins and minerals, including iron, are actives and are not graded. Counted Limited token: medium-chain triglycerides with no plant named. That is one, so this is not a 3+ stack. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'springvalley-b270-blood-sugar-60',
    productName: 'Spring Valley Advanced Formula Blood Sugar Support 500 mcg Chromium (60 vegetarian capsules)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'springvalley-b270-blood-sugar-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: [
      { name: 'Chromium (as chromium picolinate from Chromax)', strength: '500 mcg per 2 capsules' },
      { name: 'Berberine HCl (Berberis aristata) (bark)', strength: '500 mg per 2 capsules' },
      { name: 'Organic Ceylon Cinnamon (Cinnamomum verum) (bark)', strength: '300 mg per 2 capsules' },
      { name: 'Alpha Lipoic Acid', strength: '200 mg per 2 capsules' },
    ],
    inactiveIngredients: SUGAR_FLAGS,
    verdict: 'clean',
    retailers: ['Walmart'],
    sourcesGeneral: [
      't41u. Walmart panel is the single source. Chromium, berberine, cinnamon, and alpha lipoic acid are the actives and are not graded. Other ingredients are Hypromellose (Capsule), Rice Hull, and Rice Bran. All Cleared. The facility allergen line is not a token. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'springvalley-b270-digestive-enzymes-60',
    productName: 'Spring Valley Advanced Formula Digestive Enzymes with Probiotics + Prebiotics (60 vegetarian capsules)',
    brand: BRAND,
    category: 'Digestive',
    formulaId: 'springvalley-b270-digestive-enzymes-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: [
      {
        name: 'Advanced Enzyme System (glucoamylase, amylase, bromelain, acid protease, cellulase, lactase, fungal protease, papain, lipase, maltase, invertase)',
        strength: '350 mg per capsule',
      },
      { name: 'Papaya fruit powder', strength: '30 mg per capsule' },
      { name: 'Apple pectin', strength: '30 mg per capsule' },
      { name: 'Ginger root powder', strength: '20 mg per capsule' },
      { name: 'Turmeric root powder', strength: '15 mg per capsule' },
      { name: 'Fennel seed powder', strength: '15 mg per capsule' },
      { name: 'Sea Vegetable Complex (nori, wakame, kombu)', strength: '15 mg per capsule' },
      { name: 'Peppermint leaf powder', strength: '10 mg per capsule' },
      {
        name: 'Prebiotic + Probiotic Complex (chicory inulin; B. subtilis, L. plantarum, L. paracasei, B. bifidum, L. acidophilus)',
        strength: '233 mg (1 billion CFU) per capsule',
      },
    ],
    inactiveIngredients: ENZYME_FLAGS,
    verdict: 'caution',
    retailers: ['Walmart'],
    sourcesGeneral: [
      't41u. Walmart panel image is the single source. The enzyme system, botanicals, and the prebiotic plus probiotic complex are actives and are not graded. Apple pectin and chicory inulin inside those blends are not other ingredients. Contains milk and soy is an allergen line, not a token. Silicon dioxide is the 0-pt Caution cap. Counted Limited tokens: none. The 3-pack is not a row. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH270_KYR6D_T41U_SV;

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: string; barcode: string }> = {
  'springvalley-b270-brain-support-60': {
    verdict: 'avoid',
    counted: 'Maltodextrin',
    barcode: '681131000550',
  },
  'springvalley-b270-womens-probiotic-zinc-30': { verdict: 'clean', counted: '', barcode: '' },
  'springvalley-b270-adult-50-plus-365': {
    verdict: 'caution',
    counted: 'Medium-Chain Triglycerides',
    barcode: '',
  },
  'springvalley-b270-fiber-gummy-90': { verdict: 'avoid', counted: 'Natural Flavors', barcode: '' },
  'springvalley-b270-elderberry-gummy-120': { verdict: 'avoid', counted: 'Natural Flavors', barcode: '' },
  'springvalley-b270-adult-multi-365': {
    verdict: 'caution',
    counted: 'Medium-Chain Triglycerides',
    barcode: '',
  },
  'springvalley-b270-blood-sugar-60': { verdict: 'clean', counted: '', barcode: '' },
  'springvalley-b270-digestive-enzymes-60': { verdict: 'caution', counted: '', barcode: '' },
};

if (ROWS.length !== 8) throw new Error(`batch270 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch270 unexpected id ${record.id}`);
  if (record.brand !== BRAND) throw new Error(`batch270 brand ${record.id}`);
  if (record.barcode !== expected.barcode) throw new Error(`batch270 upc ${record.id} ${record.barcode}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || record.verdict !== expected.verdict) {
    throw new Error(`batch270 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch270 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch270 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (stackNote) throw new Error(`batch270 unexpected stack note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch270 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch270 pending ${ingredient.name}`);
    }
  }
}
