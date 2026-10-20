// DRAFT / not verified / batch 215 KYR6-c (t111u WRITE).
// Schiff Neuriva qualifying counts — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  riceBran:
    'Methodology §5 Cleared (organic rice bran / rice bran, unspecified bran). Founder override Oct 17, 2026 t111u.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  sugar: 'Methodology §5 Caution (bare sugar).',
  cornSyrup: 'Methodology §5 Caution (corn syrup).',
  water: 'Methodology §5 Cleared (water / purified water).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice — colors from fruits and vegetables). Founder lock Oct 17, 2026 t111u.',
  pectin: 'Methodology §5 Cleared (pectin).',
  citric: 'Methodology §5 Cleared (citric acid).',
  natFlavors: 'Methodology §5 Limited (natural flavors).',
  natFlavor:
    'Methodology §5 Caution (flavor family: flavor, flavors, and named flavor strings). Alias the family. Not Avoid.',
  coconutCanola:
    'Methodology §5 High (coconut and canola oil in a gummy). Coconut half Cleared; canola half is the seed-oil gummy High row. Founder lock Oct 17, 2026 t111u.',
  carnauba:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution). Carnauba leaf wax maps here (Oct 17, 2026 t111u).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_ULTRA_60 =
  'https://www.schiffvitamins.com/collections/neuriva/products/neuriva-ultra-brain-supplement/';
const PANEL_ORIG_GUMMIES_50 =
  'https://www.schiffvitamins.com/collections/neuriva/products/neuriva-brain-health-original-gummies-50-ct/';
const PANEL_MEMORY_3D =
  'https://www.schiffvitamins.com/collections/neuriva/products/neuriva-brain-memory-3d/';
const PANEL_BRAIN_ENERGY =
  'https://sites.salsify.com/5fe215a7-aa55-4645-b2f8-b2462790a101/823e622b-16a7-4d01-ab64-4ea29e42ea93/product/4786599627/NEURIVA(r)-Brain-%2B-Energy-Mixed-Berry-Gummies-1275-ct-';

const ULTRA_60_FLAGS: FlagSpec[] = [
  ['capsule (hypromellose)', 'cleared', 'hpmc'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Rice bran', 'cleared', 'riceBran'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
  ['Silicon dioxide', 'limited', 'silica'],
];

const ORIG_GUMMIES_FLAGS: FlagSpec[] = [
  ['Sugar', 'limited', 'sugar'],
  ['Corn syrup', 'limited', 'cornSyrup'],
  ['Water', 'cleared', 'water'],
  ['Orange juice concentrate', 'cleared', 'juice'],
  ['Natural flavors', 'limited', 'natFlavors'],
  ['Pectin', 'cleared', 'pectin'],
  ['Citric acid', 'cleared', 'citric'],
  ['Colors from fruits and vegetables', 'cleared', 'juiceColor'],
  ['Coconut and canola oil', 'high', 'coconutCanola'],
  ['Carnauba leaf wax', 'cleared', 'carnauba'],
];

const MEMORY_3D_FLAGS: FlagSpec[] = [
  ['capsule (hypromellose)', 'cleared', 'hpmc'],
  ['Stearic acid', 'cleared', 'stearic'],
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Silicon dioxide', 'limited', 'silica'],
];

const BRAIN_ENERGY_FLAGS: FlagSpec[] = [
  ['Sugar', 'limited', 'sugar'],
  ['Corn syrup', 'limited', 'cornSyrup'],
  ['Water', 'cleared', 'water'],
  ['Orange juice concentrate', 'cleared', 'juice'],
  ['Pectin', 'cleared', 'pectin'],
  ['Natural flavor', 'limited', 'natFlavor'],
  ['Citric acid', 'cleared', 'citric'],
  ['Colors from fruits and vegetables', 'cleared', 'juiceColor'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

export const BATCH215_KYR6C_SCHIFF_T111U: RatingRecord[] = [
  {
    id: 'schiff-b215-neuriva-ultra-60',
    productName: 'Schiff Neuriva Ultra (60 capsules)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b215-neuriva-ultra',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865996262',
    activeIngredients: [
      { name: 'Vitamin B6', strength: '1.7 mg (pyridoxine HCl)' },
      { name: 'Folate', strength: '680 mcg DFE (400 mcg folic acid)' },
      { name: 'Vitamin B12', strength: '2.4 mcg (cyanocobalamin)' },
      { name: 'Alpinia galanga Extract', strength: '300 mg (rhizome, Cognivive)' },
      { name: 'Coffee Fruit Extract', strength: '200 mg (Coffea arabica, Neurofactor)' },
      { name: 'Phosphatidylserine', strength: '100 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_ULTRA_60, ULTRA_60_FLAGS),
    verdict: verdictFromFlags(ULTRA_60_FLAGS),
    retailers: ['Meijer', 'Vitacost'],
    sourcesGeneral: [
      `Salsify CORE Back of Pack (©2023, March 2026 packshot) and schiffvitamins.com Neuriva Ultra product page were read. Serving size 2 capsules, 30 servings. Label notes decaffeinated. Actives ungraded. Other ingredients: capsule (hypromellose, titanium dioxide), microcrystalline cellulose, rice bran, magnesium stearate, silicon dioxide. Contains soy. Meijer inStock $59.99. Vitacost Add to cart $77.71 (lot exp 09/01/2027). UPC 647865996262 brand page and Salsify CORE catalog; check digit OK.`,
    ],
  },
  {
    id: 'schiff-b215-neuriva-original-gummies-50',
    productName: 'Schiff Neuriva Original Strawberry Gummies (50 gummies)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b215-neuriva-original-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865195009',
    activeIngredients: [
      { name: 'Coffee Fruit Extract', strength: '100 mg (Coffea arabica, Neurofactor)' },
      { name: 'Phosphatidylserine', strength: '100 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_ORIG_GUMMIES_50, ORIG_GUMMIES_FLAGS),
    verdict: verdictFromFlags(ORIG_GUMMIES_FLAGS),
    retailers: ['Thrifty White', 'Meijer', 'Vitacost', 'Pick n Save'],
    sourcesGeneral: [
      `Salsify Back of Pack 4786519500 (©2022 Haleon/Reckitt label) was read; identical to Kroger image and Vitacost text for lot exp 06/01/2027. Serving size 2 gummies, 25 servings; Calories 20; Total Carbohydrate 5 g (2%); Total Sugars 3 g; Includes 3 g Added Sugars (6%); Sodium 15 mg (1%). Actives ungraded. Other ingredients: sugar, corn syrup, water, orange juice concentrate, natural flavors, pectin, citric acid, colors from fruits and vegetables, coconut and canola oil, carnauba leaf wax. Thrifty White InStock (3) $32.58. Meijer inStock $30.99. Vitacost Add to cart $41.36. Pick n Save (Kroger) $60.99 Low Stock. UPC 647865195009 brand page plus Salsify, Kroger image key 0064786519500.`,
    ],
  },
  {
    id: 'schiff-b215-neuriva-memory-3d-30',
    productName: 'Schiff Neuriva Memory 3D (30 capsules)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b215-neuriva-memory-3d',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865997627',
    activeIngredients: [
      { name: 'Vitamin B6', strength: '1.7 mg (pyridoxine HCl, 100%)' },
      { name: 'Folate', strength: '170 mcg DFE (100 mcg folic acid, 43%)' },
      { name: 'Vitamin B12', strength: '2.4 mcg (cyanocobalamin, 100%)' },
      { name: 'Cognicell Grape Extract', strength: '250 mg (Vitis vinifera fruit)' },
      { name: 'Neurofactor Coffee Fruit Extract', strength: '100 mg (Coffea arabica)' },
    ],
    inactiveIngredients: buildOi(PANEL_MEMORY_3D, MEMORY_3D_FLAGS),
    verdict: verdictFromFlags(MEMORY_3D_FLAGS),
    retailers: ['Meijer', 'Pick n Save'],
    sourcesGeneral: [
      `Salsify ©2025 Back of Pack 4786599762 and schiffvitamins.com Memory 3D page were read; CVS label image agrees. Serving size 1 capsule. Actives ungraded. Other ingredients: capsule (hypromellose), stearic acid, maltodextrin, silicon dioxide. Meijer inStock $41.99. Pick n Save https://www.picknsave.com/p/neuriva-memory-3d-brain-health/0064786599762 $41.99 Pickup Available. GNC 565565 panel text (different folate DV) not used. UPC 647865997627 brand page, Salsify, Kroger key 0064786599762.`,
    ],
  },
  {
    id: 'schiff-b215-neuriva-memory-3d-50',
    productName: 'Schiff Neuriva Memory 3D (50 capsules)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b215-neuriva-memory-3d',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865997795',
    activeIngredients: [
      { name: 'Vitamin B6', strength: '1.7 mg (pyridoxine HCl, 100%)' },
      { name: 'Folate', strength: '170 mcg DFE (100 mcg folic acid, 43%)' },
      { name: 'Vitamin B12', strength: '2.4 mcg (cyanocobalamin, 100%)' },
      { name: 'Cognicell Grape Extract', strength: '250 mg (Vitis vinifera fruit)' },
      { name: 'Neurofactor Coffee Fruit Extract', strength: '100 mg (Coffea arabica)' },
    ],
    inactiveIngredients: buildOi(PANEL_MEMORY_3D, MEMORY_3D_FLAGS),
    verdict: verdictFromFlags(MEMORY_3D_FLAGS),
    retailers: ['Meijer', 'Pick n Save'],
    sourcesGeneral: [
      `Same actives and other ingredients as Memory 3D 30; Salsify ©2025 Back of Pack 4786599779. Serving size 1 capsule, 50 servings. Meijer inStock $60.99. Pick n Save https://www.picknsave.com/p/neuriva-brain-health-memory-3d-capsules/0064786599779 $79.99 Low Stock Pickup Available. UPC 647865997795 brand page, Salsify, Kroger key.`,
    ],
  },
  {
    id: 'schiff-b215-neuriva-brain-energy-gummies-75',
    productName: 'Schiff Neuriva Brain + Energy Natural Blackberry Gummies (75 gummies)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b215-neuriva-brain-energy-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865996279',
    activeIngredients: [
      { name: 'Vitamin B12', strength: '10 mcg (cyanocobalamin, 417%)' },
      { name: 'Coffee Fruit Extract', strength: '100 mg (Coffea arabica, Neurofactor)' },
      { name: 'Caffeine', strength: '66 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_BRAIN_ENERGY, BRAIN_ENERGY_FLAGS),
    verdict: verdictFromFlags(BRAIN_ENERGY_FLAGS),
    retailers: ['iHerb', 'Vitacost'],
    sourcesGeneral: [
      `Salsify ©2022 Back of Pack 4786599627 was read; iHerb and Vitacost text match. Serving size 3 gummies, 25 servings; Calories 50; Total Carbohydrate 12 g (4%); Total Sugars 9 g; Includes 9 g Added Sugars (18%); Sodium 30 mg (1%). Label: adults 18+; not recommended for children or those sensitive to caffeine. Actives ungraded (caffeine 66 mg; no activeSafetyFlag). Other ingredients: sugar, corn syrup, water, orange juice concentrate, pectin, natural flavor, citric acid, colors from fruits and vegetables. Pack not on schiffvitamins.com; Salsify manufacturer catalog is brand-listed per L77. iHerb https://www.iherb.com/pr/schiff-neuriva-brain-energy-natural-blackberry-75-gummies/122300 In Stock. Vitacost Add to cart $29.86 (exp 02/01/2027). UPC 647865996279 Salsify, Vitacost barcode, iHerb UPC field.`,
    ],
  },
];

const ROWS = BATCH215_KYR6C_SCHIFF_T111U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 5) throw new Error(`batch215 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch215 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch215 upc ${record.id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch215 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch215 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch215 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch215 verdict ${record.id}`);
}
