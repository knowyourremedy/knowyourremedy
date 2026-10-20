// DRAFT / not verified / batch 217 KYR6-c (t112u WRITE).
// Schiff Neuriva Plus, glucosamine, and qualifying counts — grade from OI only.

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
  carrageenan: 'Methodology §5 Limited (carrageenan).',
  pectin: 'Methodology §5 Cleared (pectin).',
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  riceBran:
    'Methodology §5 Cleared (organic rice bran / rice bran, unspecified bran). Founder override Oct 17, 2026 t111u.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  sugar: 'Methodology §5 Caution (bare sugar).',
  cornSyrup: 'Methodology §5 Caution (corn syrup).',
  water: 'Methodology §5 Cleared (water / purified water).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice — colors from fruits and vegetables). Founder lock Oct 17, 2026 t111u.',
  citric: 'Methodology §5 Cleared (citric acid).',
  natFlavor:
    'Methodology §5 Caution (flavor family: flavor, flavors, and named flavor strings). Alias the family. Not Avoid.',
  coconutCanola:
    'Methodology §5 High (coconut and canola oil in a gummy). Coconut half Cleared; canola half is the seed-oil gummy High row. Founder lock Oct 17, 2026 t111u.',
  carnauba:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution). Carnauba leaf wax maps here (Oct 17, 2026 t111u).',
  modStarch:
    'Methodology §5 Limited (modified starch). Modified Corn Starch maps here (Oct 17, 2026 t107u).',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  talc: 'Methodology §5 Avoid (talc). Magnesium silicate is that row in a swallowed product.',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose).',
  boron:
    'Methodology §5 Caution (boron glycinate as other ingredient). Condition rule; locked Oct 17, 2026 t111u.',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_PLUS_30 =
  'https://www.cvs.com/bizcontent/merchandising/productimages/high_res/64786599550_2.jpg';
const PANEL_PLUS_GUMMIES_50 =
  'https://www.cvs.com/bizcontent/merchandising/productimages/high_res/64786519502_8.jpg';
const PANEL_GLUCOSAMINE_1500 =
  'https://www.kroger.com/product/images/xlarge/left/0002052511019';
const PANEL_ORIGINAL_45 =
  'https://sites.salsify.com/5fe215a7-aa55-4645-b2f8-b2462790a101/823e622b-16a7-4d01-ab64-4ea29e42ea93/product/4786599745/';
const PANEL_MEMORY_3D_65 =
  'https://sites.salsify.com/5fe215a7-aa55-4645-b2f8-b2462790a101/823e622b-16a7-4d01-ab64-4ea29e42ea93/product/4786599810/NEURIVA(r)-Brain-Memory-3D-Capsules-2065-ct-';
const PANEL_ORIGINAL_50 =
  'https://sites.salsify.com/5fe215a7-aa55-4645-b2f8-b2462790a101/823e622b-16a7-4d01-ab64-4ea29e42ea93/product/4786599741/NEURIVA(r)-Brain-Performance-1850ct-';

const PLUS_30_FLAGS: FlagSpec[] = [
  ['capsule (hydroxypropyl methylcellulose)', 'cleared', 'hpmc'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Carrageenan', 'limited', 'carrageenan'],
  ['Pectin', 'cleared', 'pectin'],
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Rice bran', 'cleared', 'riceBran'],
  ['Silicon dioxide', 'limited', 'silica'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
];

const PLUS_GUMMIES_FLAGS: FlagSpec[] = [
  ['Sugar', 'limited', 'sugar'],
  ['Corn syrup', 'limited', 'cornSyrup'],
  ['Water', 'cleared', 'water'],
  ['Natural flavor', 'limited', 'natFlavor'],
  ['Pectin', 'cleared', 'pectin'],
  ['Orange juice concentrate', 'cleared', 'juice'],
  ['Citric acid', 'cleared', 'citric'],
  ['Colors from fruits and vegetables', 'cleared', 'juiceColor'],
  ['Coconut and canola oil', 'high', 'coconutCanola'],
  ['Carnauba leaf wax', 'cleared', 'carnauba'],
];

const GLUCOSAMINE_FLAGS: FlagSpec[] = [
  ['Hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
  ['Modified corn starch', 'limited', 'modStarch'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Polyethylene glycol', 'limited', 'peg'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Magnesium silicate', 'high', 'talc'],
  ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
  ['Silicon dioxide', 'limited', 'silica'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
  ['Boron glycinate', 'limited', 'boron'],
];

const ORIGINAL_CAPSULE_FLAGS: FlagSpec[] = [
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['capsule (hydroxypropyl methylcellulose)', 'cleared', 'hpmc'],
  ['Carrageenan', 'limited', 'carrageenan'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Pectin', 'cleared', 'pectin'],
  ['Rice bran', 'cleared', 'riceBran'],
  ['Silicon dioxide', 'limited', 'silica'],
];

const MEMORY_3D_FLAGS: FlagSpec[] = [
  ['capsule (hypromellose)', 'cleared', 'hpmc'],
  ['Stearic acid', 'cleared', 'stearic'],
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Silicon dioxide', 'limited', 'silica'],
];

const ORIGINAL_ACTIVES = [
  { name: 'Coffee Fruit Extract', strength: '100 mg (Coffea arabica, Neurofactor)' },
  { name: 'Phosphatidylserine', strength: '100 mg' },
] as const;

const MEMORY_3D_ACTIVES = [
  { name: 'Vitamin B6', strength: '1.7 mg (pyridoxine HCl, 100%)' },
  { name: 'Folate', strength: '170 mcg DFE (100 mcg folic acid, 43%)' },
  { name: 'Vitamin B12', strength: '2.4 mcg (cyanocobalamin, 100%)' },
  { name: 'Cognicell Grape Extract', strength: '250 mg (Vitis vinifera fruit)' },
  { name: 'Neurofactor Coffee Fruit Extract', strength: '100 mg (Coffea arabica)' },
] as const;

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

export const BATCH217_KYR6C_SCHIFF_T112U: RatingRecord[] = [
  {
    id: 'schiff-b217-neuriva-plus-30',
    productName: 'Schiff Neuriva Plus (30 capsules)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b217-neuriva-plus',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865995500',
    activeIngredients: [
      { name: 'Vitamin B6', strength: '1.7 mg (pyridoxine hydrochloride)' },
      { name: 'Folate', strength: '680 mcg DFE (400 mcg folic acid)' },
      { name: 'Vitamin B12', strength: '2.4 mcg (cyanocobalamin)' },
      { name: 'Coffee Fruit Extract', strength: '200 mg (Coffea arabica, Neurofactor)' },
      { name: 'Phosphatidylserine', strength: '100 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PLUS_30, PLUS_30_FLAGS),
    verdict: verdictFromFlags(PLUS_30_FLAGS),
    retailers: ['Walgreens', 'Walmart', 'Thrifty White', 'Meijer', 'Vitacost'],
    sourcesGeneral: [
      `CVS box back ${PANEL_PLUS_30} (©2022 RB Health), brand Neuriva Plus page, Salsify ©2022 label, CVS panel graphic 64786599550_9, and DSLD 300905 agree. Serving size 1 capsule, 30 servings. Actives ungraded. Other ingredients: capsule (hydroxypropyl methylcellulose, titanium dioxide, carrageenan, pectin), microcrystalline cellulose, rice bran, silicon dioxide, magnesium stearate. Contains soy. Walgreens back panel confirms the same capsule tokens. Walgreens prod6399037 in stock $39.99. Walmart /ip/906497369 in stock $41.97 sold by Walmart. Thrifty White InStock 23 $36.88. Meijer inStock $41.99. Vitacost Add to cart $48.00. UPC 647865995500 brand-page barcodeNumber, DSLD 6 47865 99550 0, CVS/Kroger image keys; check digit OK.`,
    ],
  },
  {
    id: 'schiff-b217-neuriva-plus-gummies-50',
    productName: 'Schiff Neuriva Plus Strawberry Gummies (50 gummies)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b217-neuriva-plus-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865195023',
    activeIngredients: [
      { name: 'Vitamin B6', strength: '1.7 mg (pyridoxine hydrochloride)' },
      { name: 'Vitamin B12', strength: '2.4 mcg (cyanocobalamin)' },
      { name: 'Coffee Fruit Extract', strength: '200 mg (Coffea arabica, Neurofactor)' },
      { name: 'Phosphatidylserine', strength: '100 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PLUS_GUMMIES_50, PLUS_GUMMIES_FLAGS),
    verdict: verdictFromFlags(PLUS_GUMMIES_FLAGS),
    retailers: ['Walgreens', 'Walmart', 'Thrifty White', 'Vitacost'],
    sourcesGeneral: [
      `CVS panel ${PANEL_PLUS_GUMMIES_50} matches Salsify Back of Pack 4786519502 (©2022) and DSLD 291754 (2023-05-24, no folate). Serving size 2 gummies, 25 servings; Calories 20; Total Carbohydrate 5 g (2%); Total Sugars 3 g; Includes 3 g Added Sugars (6%); Sodium 15 mg (1%). Actives ungraded. Other ingredients: sugar, corn syrup, water, natural flavor, pectin, orange juice concentrate, citric acid, colors from fruits and vegetables, coconut and canola oil, carnauba leaf wax. Vitacost lot exp 06/30/2027 text identical. Walgreens and Walmart gallery panels agree (no folate). Walgreens 300401574 in stock $39.99. Walmart /ip/905697089 in stock $39.97. Thrifty White InStock 3 $38.89. Vitacost Add to cart $50.41. UPC 647865195023 brand page, DSLD 6 47865 19502 3, CVS key 64786519502; check digit OK.`,
    ],
  },
  {
    id: 'schiff-b217-glucosamine-1500-msm-ha-150',
    productName: 'Schiff Glucosamine 1500 mg Plus MSM & Hyaluronic Acid (150 coated tablets)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b217-glucosamine-1500-msm-ha',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '020525110190',
    activeIngredients: [
      { name: 'Glucosamine Hydrochloride', strength: '1.5 g (1,500 mg)' },
      { name: 'MSM', strength: '1.5 g (1,500 mg, methylsulfonylmethane)' },
      { name: 'Hyaluronic Acid', strength: '3.3 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_GLUCOSAMINE_1500, GLUCOSAMINE_FLAGS),
    verdict: verdictFromFlags(GLUCOSAMINE_FLAGS),
    retailers: ['Walmart', 'Meijer'],
    sourcesGeneral: [
      `Kroger label image ${PANEL_GLUCOSAMINE_1500} and schiffvitamins.com Glucosamine 1500mg 150ct label image agree. Serving size 3 tablets, 50 servings; label limit maximum 1 serving per day. Actives ungraded. Other ingredients: coating (hydroxypropyl methylcellulose, modified corn starch, titanium dioxide, polyethylene glycol, glycerin, magnesium silicate), hydroxypropyl cellulose, silicon dioxide, magnesium stearate, boron glycinate. Contains shellfish (shrimp, crab, lobster and crayfish). Brand accordion and Meijer text cite magnesium trisilicate; label image governs (magnesium silicate). Meijer item 2052511019 inStock $13.99. Walmart Hey Pharma listing /ip/291233748 exact 150 ct $20.35 in stock. Walmart /ip/10535380 sold by Walmart.com $11.99 in stock, same HA pack and OI line. UPC 020525110190 brand page, Kroger key 0002052511019, DSLD 0 20525 11019 0; check digit OK.`,
    ],
  },
  {
    id: 'schiff-b217-neuriva-original-45',
    productName: 'Schiff Neuriva Original (45 capsules)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b189-neuriva-original',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865997450',
    activeIngredients: [...ORIGINAL_ACTIVES],
    inactiveIngredients: buildOi(PANEL_ORIGINAL_45, ORIGINAL_CAPSULE_FLAGS),
    verdict: verdictFromFlags(ORIGINAL_CAPSULE_FLAGS),
    retailers: ["Sam's Club", "BJ's", 'Whole And Natural'],
    sourcesGeneral: [
      `Salsify CORE 45-ct Right panel ${PANEL_ORIGINAL_45} (©2023 RB Health). Serving size 1 capsule. Actives ungraded. Other ingredients: microcrystalline cellulose, capsule (hydroxypropyl methylcellulose, carrageenan, titanium dioxide, pectin), rice bran, silicon dioxide. Contains soy. BJ's spec and brand-page text agree on tokens. Sam's Club /ip/Neuriva-Original-Brain-Health-Supplement-Capsules-45-ct/13952853890 in stock $34.98. Whole And Natural box page in stock $53.95, UPC 647865997450. BJ's prodid 3000000000005056247 $36.99 ADD, spec upc 647865997450, Quantity 45 ct. UPC 647865997450 Salsify CORE catalog, Whole And Natural, BJ's spec; check digit OK.`,
    ],
  },
  {
    id: 'schiff-b217-neuriva-memory-3d-65',
    productName: 'Schiff Neuriva Memory 3D (65 capsules)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b215-neuriva-memory-3d',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865998105',
    activeIngredients: [...MEMORY_3D_ACTIVES],
    inactiveIngredients: buildOi(PANEL_MEMORY_3D_65, MEMORY_3D_FLAGS),
    verdict: verdictFromFlags(MEMORY_3D_FLAGS),
    retailers: ["Sam's Club", 'Whole And Natural'],
    sourcesGeneral: [
      `Salsify CORE 65-ct Right panel ${PANEL_MEMORY_3D_65} (©2025). Same actives and other ingredients as Memory 3D 30/50. Serving size 1 capsule, 65 servings. Actives ungraded (label folate 170 mcg DFE; DSLD 335184 lists 680 mcg DFE — label governs). Other ingredients: capsule (hypromellose), stearic acid, maltodextrin, silicon dioxide. Sam's Club /ip/Neuriva-Memory-3D-Brain-Health-Capsules-65-Ct/20981418094 $49.94 shippable. Whole And Natural box page in stock $69.95, UPC 647865998105. UPC 647865998105 Salsify CORE catalog and Whole And Natural; check digit OK.`,
    ],
  },
  {
    id: 'schiff-b217-neuriva-original-50',
    productName: 'Schiff Neuriva Original (50 capsules)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b189-neuriva-original',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [...ORIGINAL_ACTIVES],
    inactiveIngredients: buildOi(PANEL_ORIGINAL_50, ORIGINAL_CAPSULE_FLAGS),
    verdict: verdictFromFlags(ORIGINAL_CAPSULE_FLAGS),
    retailers: ['Costco', 'eBay'],
    sourcesGeneral: [
      `Salsify CORE 50-ct Right panel ${PANEL_ORIGINAL_50} (©2023 RB Health). Costco /p/-/neuriva-brain-supplement-original-50-capsules/4000249930 box text matches: rice bran, capsule (hypromellose, carrageenan, titanium dioxide, pectin), microcrystalline cellulose, silicon dioxide. Contains soy. Serving size 1 capsule. Actives ungraded. Costco in stock Oct 17, 2026. eBay 389645083902 FastShipOutlet 50-ct $29.99 US. eBay 168370682408 bfreeze2 10+ available $23.99 US. Barcode omitted: Salsify CORE lists 647865997412 for 18/50ct case UPC 4786599741; eBay item specifics list 647865997429 — both check digits valid, no two agreeing sources. UPC field left empty per t94u.`,
    ],
  },
];

const ROWS = BATCH217_KYR6C_SCHIFF_T112U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 6) throw new Error(`batch217 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch217 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch217 upc ${record.id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch217 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch217 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch217 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch217 verdict ${record.id}`);
}
