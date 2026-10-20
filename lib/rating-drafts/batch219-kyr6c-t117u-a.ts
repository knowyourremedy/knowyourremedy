// DRAFT / not verified / batch 219 KYR6-c (t117u group A WRITE).
// Viactiv soft chews + Feosol iron — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  cornSyrup: 'Methodology §5 Caution (corn syrup / corn syrup solids).',
  sugar: 'Methodology §5 Caution (bare sugar).',
  hcoCoconut: 'Methodology §5 Avoid (hydrogenated oils).',
  cocoaAlkali: 'Methodology §5 Cleared (cocoa powder processed with alkali).',
  nonfatDryMilk: 'Methodology §5 Limited (non-fat dry milk).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  cornStarch: 'Methodology §5 Cleared (corn starch).',
  salt: 'Methodology §5 Cleared (sodium chloride / named salt). Salt maps here (Oct 17, 2026 t107u).',
  lecithinSoy: 'Methodology §5 Cleared (lecithin / soy lecithin).',
  naFlavors: 'Methodology §5 Limited (natural and artificial flavors).',
  caramelColor: 'Methodology §5 High (undisclosed caramel color / plain caramel powder).',
  lactose: 'Methodology §5 Cleared (lactose / lactose monohydrate).',
  sorbitol: 'Methodology §5 Limited (sorbitol).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  crospovidone: 'Methodology §5 Cleared (crospovidone).',
  dye: 'Methodology §5 Avoid (synthetic dye / FD&C lake).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  triacetin: 'Methodology §5 Cleared (triacetin).',
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  phosphate: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral coating).',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  talc: 'Methodology §5 Avoid (talc). Magnesium silicate is that row in a swallowed product.',
  tapiocaSyrup: 'Methodology §5 Cleared (tapioca syrup / organic tapioca syrup).',
  caneSugar: 'Methodology §5 Cleared (cane sugar).',
  palmChew:
    'Methodology §5 High-tier (seed/industrial oils in gummies / chews — soybean, canola, palm, sunflower, vegetable oil).',
  acacia: 'Methodology §5 Cleared (acacia / gum arabic).',
  natFlavors: 'Methodology §5 Limited (natural flavors).',
  lecithinSunflower: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — sweetener or color).',
  citric: 'Methodology §5 Cleared (citric acid).',
  seaSalt: 'Methodology §5 Cleared (sodium chloride / sea salt).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_VIACTIV_CHOC_100 =
  'https://cdn.shopify.com/s/files/1/0609/4723/5063/products/chocolatecalcium.png';
const PANEL_VIACTIV_CARAMEL_100 =
  'https://cdn.shopify.com/s/files/1/0609/4723/5063/products/caramelcalciumcopy.png';
const PANEL_VIACTIV_CHOC_60 =
  'https://cdn.shopify.com/s/files/1/0609/4723/5063/files/Milk_Choco_Calcium_60ct.jpg';
const PANEL_VIACTIV_CARAMEL_60 =
  'https://cdn.shopify.com/s/files/1/0609/4723/5063/files/Caramel_Calcium60ct.jpg';
const PANEL_VIACTIV_CHOC_180 =
  'https://cdn.shopify.com/s/files/1/0609/4723/5063/files/Milk_Choco_Calcium_180ct.jpg';
const PANEL_VIACTIV_COQ10_30 =
  'https://cdn.shopify.com/s/files/1/0609/4723/5063/files/2_SFB.jpg';
const PANEL_FEOSOL_ORIGINAL = 'https://feosol.com/products/feosol-original';
const PANEL_FEOSOL_COMPLETE = 'https://feosol.com/products/feosol-complete';

const VIACTIV_CALCIUM_ACTIVES = [
  { name: 'Calcium', strength: '650 mg' },
  { name: 'Vitamin D3', strength: '12.5 mcg (500 IU)' },
  { name: 'Vitamin K1', strength: '40 mcg' },
] as const;

const CHOC_FLAGS: FlagSpec[] = [
  ['Corn Syrup', 'limited', 'cornSyrup'],
  ['Sugar', 'limited', 'sugar'],
  ['Hydrogenated Coconut Oil', 'high', 'hcoCoconut'],
  ['Cocoa Powder (Processed with Alkali)', 'cleared', 'cocoaAlkali'],
  ['Non-Fat Dry Milk Powder', 'limited', 'nonfatDryMilk'],
  ['Corn Syrup Solids', 'limited', 'cornSyrup'],
  ['Glycerine', 'cleared', 'glycerin'],
  ['Cornstarch', 'cleared', 'cornStarch'],
  ['Salt', 'cleared', 'salt'],
  ['Soy Lecithin', 'cleared', 'lecithinSoy'],
  ['Natural And Artificial Flavors', 'limited', 'naFlavors'],
];

const CARAMEL_FLAGS: FlagSpec[] = [
  ['Corn Syrup', 'limited', 'cornSyrup'],
  ['Sugar', 'limited', 'sugar'],
  ['Hydrogenated Coconut Oil', 'high', 'hcoCoconut'],
  ['Non-Fat Dry Milk Powder', 'limited', 'nonfatDryMilk'],
  ['Corn Syrup Solids', 'limited', 'cornSyrup'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Cornstarch', 'cleared', 'cornStarch'],
  ['Caramel Color', 'high', 'caramelColor'],
  ['Salt', 'cleared', 'salt'],
  ['Soy Lecithin', 'cleared', 'lecithinSoy'],
  ['Natural And Artificial Flavors', 'limited', 'naFlavors'],
];

const CHOC60_FLAGS: FlagSpec[] = [
  ['Corn syrup', 'limited', 'cornSyrup'],
  ['Sugar', 'limited', 'sugar'],
  ['Hydrogenated coconut oil', 'high', 'hcoCoconut'],
  ['Cocoa powder (processed with alkali)', 'cleared', 'cocoaAlkali'],
  ['Non-fat dry milk powder', 'limited', 'nonfatDryMilk'],
  ['Glycerine', 'cleared', 'glycerin'],
  ['Corn syrup solids', 'limited', 'cornSyrup'],
  ['Corn starch', 'cleared', 'cornStarch'],
  ['Soy lecithin', 'cleared', 'lecithinSoy'],
  ['Natural and artificial flavor', 'limited', 'naFlavors'],
  ['Salt', 'cleared', 'salt'],
];

const CARAMEL60_FLAGS: FlagSpec[] = [
  ['Corn syrup', 'limited', 'cornSyrup'],
  ['Sugar', 'limited', 'sugar'],
  ['Hydrogenated coconut oil', 'high', 'hcoCoconut'],
  ['Non-fat dry milk powder', 'limited', 'nonfatDryMilk'],
  ['Glycerine', 'cleared', 'glycerin'],
  ['Corn syrup solids', 'limited', 'cornSyrup'],
  ['Corn starch', 'cleared', 'cornStarch'],
  ['Caramel color', 'high', 'caramelColor'],
  ['Salt', 'cleared', 'salt'],
  ['Soy lecithin', 'cleared', 'lecithinSoy'],
  ['Natural and artificial flavor', 'limited', 'naFlavors'],
];

const FEOSOL_ORIG_FLAGS: FlagSpec[] = [
  ['Lactose', 'cleared', 'lactose'],
  ['Sorbitol', 'limited', 'sorbitol'],
  ['Carnauba Wax', 'cleared', 'carnauba'],
  ['Crospovidone', 'cleared', 'crospovidone'],
  ['FD&C Blue #1 Al Lake', 'high', 'dye'],
  ['FD&C Yellow #6 Al Lake', 'high', 'dye'],
  ['Hypromellose', 'cleared', 'hpmc'],
  ['Magnesium Stearate', 'cleared', 'magStearate'],
  ['Polydextrose', 'limited', 'polydextrose'],
  ['Polyethylene Glycol', 'moderate', 'peg'],
  ['Titanium Dioxide', 'high', 'tio2'],
  ['Triacetin', 'cleared', 'triacetin'],
];

const FEOSOL_COMPLETE_FLAGS: FlagSpec[] = [
  ['Microcrystalline Cellulose', 'cleared', 'cellulose'],
  ['Dibasic Calcium Phosphate', 'cleared', 'phosphate'],
  ['Croscarmellose Sodium', 'cleared', 'croscarmellose'],
  ['Polyvinyl Alcohol', 'cleared', 'pva'],
  ['FD&C Red #40 Al Lake', 'high', 'dye'],
  ['FD&C Yellow #6 Al Lake', 'high', 'dye'],
  ['Magnesium Stearate', 'cleared', 'magStearate'],
  ['Polyethylene Glycol', 'moderate', 'peg'],
  ['Stearic Acid', 'cleared', 'stearic'],
  ['Talc', 'high', 'talc'],
  ['Titanium Dioxide', 'high', 'tio2'],
];

const COQ10_FLAGS: FlagSpec[] = [
  ['Tapioca syrup', 'cleared', 'tapiocaSyrup'],
  ['Raw cane sugar', 'cleared', 'caneSugar'],
  ['Palm oil', 'high', 'palmChew'],
  ['Gum acacia', 'cleared', 'acacia'],
  ['Natural flavors', 'limited', 'natFlavors'],
  ['Sunflower lecithin', 'cleared', 'lecithinSunflower'],
  ['Vegetable juice (color)', 'cleared', 'juiceColor'],
  ['Citric acid', 'cleared', 'citric'],
  ['Sea salt', 'cleared', 'seaSalt'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

export const BATCH219_KYR6C_T117U_A: RatingRecord[] = [
  {
    id: 'viactiv-b219-calcium-chocolate-100',
    productName: 'Viactiv Calcium + Bone Strengthening Max Formula, Milk Chocolate (100 soft chews)',
    brand: 'Viactiv',
    category: VITAMINS,
    formulaId: 'viactiv-b219-calcium-chocolate',
    audience: ADULT,
    minAge: 18,
    form: 'soft chew',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '857141004998',
    activeIngredients: [...VIACTIV_CALCIUM_ACTIVES],
    inactiveIngredients: buildOi(PANEL_VIACTIV_CHOC_100, CHOC_FLAGS),
    verdict: verdictFromFlags(CHOC_FLAGS),
    retailers: ['Thrifty White', 'Meijer'],
    sourcesGeneral: [
      `Brand panel ${PANEL_VIACTIV_CHOC_100} and viactiv.com calcium-plus-bone-strengthening-chocolate (sku 00499A). Serving size 1 chew; Calories 15; Total Carbohydrate 2 g (1%); Total Sugars 1 g, Includes 1 g Added Sugars (2%); Vitamin D 12.5 mcg (500 IU) 63%; Vitamin K 40 mcg 33%; Calcium 650 mg 50%; Sodium 10 mg 0%. Actives ungraded. Other ingredients: calcium carbonate, corn syrup, sugar, hydrogenated coconut oil, cocoa powder (processed with alkali), non-fat dry milk powder, corn syrup solids, glycerine, contains 2% or less of cornstarch, salt, soy lecithin, natural and artificial flavors, cholecalciferol (vitamin D3), phylloquinone (vitamin K1). Contains milk and soy. Thrifty White shop.thriftywhite.com Current Stock 51 $10.90 UPC 857141004998. Meijer 85714100499 inStock. UPC brand JSON-LD gtin12, Thrifty White, DSLD 287128, Meijer/Kroger key; check digit OK.`,
    ],
  },
  {
    id: 'viactiv-b219-calcium-caramel-100',
    productName: 'Viactiv Calcium + Bone Strengthening Max Formula, Rich Caramel (100 soft chews)',
    brand: 'Viactiv',
    category: VITAMINS,
    formulaId: 'viactiv-b219-calcium-caramel',
    audience: ADULT,
    minAge: 18,
    form: 'soft chew',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '857141004981',
    activeIngredients: [...VIACTIV_CALCIUM_ACTIVES],
    inactiveIngredients: buildOi(PANEL_VIACTIV_CARAMEL_100, CARAMEL_FLAGS),
    verdict: verdictFromFlags(CARAMEL_FLAGS),
    retailers: ['Thrifty White', 'Meijer'],
    sourcesGeneral: [
      `Brand panel ${PANEL_VIACTIV_CARAMEL_100} and viactiv.com calcium-plus-bone-strengthening-caramel (sku 00498A). Same calcium/D/K actives as chocolate 100; Total Sugars 2 g, Includes 2 g Added Sugars (4%). Other ingredients: calcium carbonate, corn syrup, sugar, hydrogenated coconut oil, non-fat dry milk powder, corn syrup solids, glycerin, contains 2% or less of cornstarch, caramel color, salt, soy lecithin, natural and artificial flavors, cholecalciferol, phylloquinone. Contains milk and soy. Thrifty White caramel 100 Current Stock 43 $10.90 UPC 857141004981. Meijer 85714100498 lowStock. UPC brand gtin12, Thrifty White, DSLD 287127; check digit OK.`,
    ],
  },
  {
    id: 'viactiv-b219-calcium-chocolate-60',
    productName: 'Viactiv Calcium + Bone Strengthening Max Formula, Milk Chocolate (60 soft chews)',
    brand: 'Viactiv',
    category: VITAMINS,
    formulaId: 'viactiv-b219-calcium-chocolate',
    audience: ADULT,
    minAge: 18,
    form: 'soft chew',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '857141004974',
    activeIngredients: [...VIACTIV_CALCIUM_ACTIVES],
    inactiveIngredients: buildOi(PANEL_VIACTIV_CHOC_60, CHOC60_FLAGS),
    verdict: verdictFromFlags(CHOC60_FLAGS),
    retailers: ['Thrifty White', 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_VIACTIV_CHOC_60}; viactiv.com chocolate-calcium-60-chews. Vitacost lot exp 08/30/2027 text matches brand image and DSLD 337358 (2025-09-25). Same supplement facts as chocolate 100. Other ingredients: calcium carbonate, corn syrup, sugar, hydrogenated coconut oil, cocoa powder (processed with alkali), non-fat dry milk powder, glycerine, corn syrup solids, contains 2% or less of corn starch, soy lecithin, natural and artificial flavor, salt, cholecalciferol, phylloquinone. Contains milk and soy. Thrifty White 60 ct Current Stock 26 $7.78 UPC 857141004974. Vitacost 139284 InStock Add to cart $10.31. UPC brand gtin12, Thrifty White, Vitacost, DSLD 337358; check digit OK.`,
    ],
  },
  {
    id: 'viactiv-b219-calcium-caramel-60',
    productName: 'Viactiv Calcium + Bone Strengthening Max Formula, Rich Caramel (60 soft chews)',
    brand: 'Viactiv',
    category: VITAMINS,
    formulaId: 'viactiv-b219-calcium-caramel',
    audience: ADULT,
    minAge: 18,
    form: 'soft chew',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '857141004967',
    activeIngredients: [...VIACTIV_CALCIUM_ACTIVES],
    inactiveIngredients: buildOi(PANEL_VIACTIV_CARAMEL_60, CARAMEL60_FLAGS),
    verdict: verdictFromFlags(CARAMEL60_FLAGS),
    retailers: ['Thrifty White', 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_VIACTIV_CARAMEL_60}; viactiv.com caramel-chewable-calcium-60-chews. Vitacost lot exp 10/31/2027 = brand image = Thrifty White. Same supplement facts as caramel 100. Other ingredients: calcium carbonate, corn syrup, sugar, hydrogenated coconut oil, non-fat dry milk powder, glycerine, corn syrup solids, contains 2% or less of corn starch, caramel color, salt, soy lecithin, natural and artificial flavor, cholecalciferol, phylloquinone. Contains milk and soy. Meijer older caramel 60 text not used (t105u). Thrifty White Current Stock 14 $7.78 UPC 857141004967. Vitacost 139283 InStock $10.31. UPC brand gtin12, Thrifty White, Vitacost; check digit OK.`,
    ],
  },
  {
    id: 'feosol-b219-original-120',
    productName: 'Feosol Original Ferrous Sulfate Iron (120 tablets)',
    brand: 'Feosol',
    category: VITAMINS,
    formulaId: 'feosol-b219-original',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '346017097122',
    activeIngredients: [{ name: 'Iron (as ferrous sulfate)', strength: '65 mg' }],
    inactiveIngredients: buildOi(PANEL_FEOSOL_ORIGINAL, FEOSOL_ORIG_FLAGS),
    verdict: verdictFromFlags(FEOSOL_ORIG_FLAGS),
    retailers: ['Thrifty White', 'Meijer'],
    sourcesGeneral: [
      `Brand page ${PANEL_FEOSOL_ORIGINAL} and Kroger image 0034601709712. Serving size 1 tablet; Iron 65 mg (361%); dried ferrous sulfate 200 mg (65 mg elemental), equivalent to 325 mg ferrous sulfate per tablet. Actives ungraded. Other ingredients: lactose, sorbitol, contains 2% or less of carnauba wax, crospovidone, FD&C Blue #1 Al Lake, FD&C Yellow #6 Al Lake, hypromellose, magnesium stearate, polydextrose, polyethylene glycol, titanium dioxide, triacetin. Contains milk. Meijer label text; brand and Thrifty White same tokens. Thrifty White original 120 Current Stock 28 $9.29 UPC 346017097122. Meijer 34601709712 inStock. UPC feosol.com variant barcode, Thrifty White, Meijer/Kroger key; check digit OK.`,
    ],
  },
  {
    id: 'feosol-b219-complete-30',
    productName: 'Feosol Complete Dual Iron (30 caplets)',
    brand: 'Feosol',
    category: VITAMINS,
    formulaId: 'feosol-b219-complete',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '346017095302',
    activeIngredients: [
      {
        name: 'Iron (as polysaccharide iron complex and heme iron polypeptide)',
        strength: '28 mg',
      },
    ],
    inactiveIngredients: buildOi(PANEL_FEOSOL_COMPLETE, FEOSOL_COMPLETE_FLAGS),
    verdict: verdictFromFlags(FEOSOL_COMPLETE_FLAGS),
    retailers: ['Thrifty White', 'Drug Supply Store'],
    sourcesGeneral: [
      `Brand page ${PANEL_FEOSOL_COMPLETE}. Serving size 1 caplet; Iron 28 mg as PIC and HIP (Proferrin), 156% DV on brand panel. Actives ungraded. Other ingredients: microcrystalline cellulose, dibasic calcium phosphate, croscarmellose sodium, polyvinyl alcohol, contains 2% or less of FD&C Red #40 Al Lake, FD&C Yellow #6 Al Lake, magnesium stearate, polyethylene glycol, stearic acid, talc, titanium dioxide. Thrifty White label text matches brand. Thrifty White complete 30 Current Stock 51 $17.76 UPC 346017095302. Drug Supply Store third-party exact 30 ct InStock (t105u L86). Meijer 34601709530 outOfStock. UPC brand variant barcode, Thrifty White, Drug Supply Store; check digit OK.`,
    ],
  },
  {
    id: 'viactiv-b219-calcium-chocolate-180',
    productName: 'Viactiv Calcium + Bone Strengthening Max Formula, Milk Chocolate (180 soft chews)',
    brand: 'Viactiv',
    category: VITAMINS,
    formulaId: 'viactiv-b219-calcium-chocolate',
    audience: ADULT,
    minAge: 18,
    form: 'soft chew',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '857141004950',
    activeIngredients: [...VIACTIV_CALCIUM_ACTIVES],
    inactiveIngredients: buildOi(PANEL_VIACTIV_CHOC_180, CHOC60_FLAGS),
    verdict: verdictFromFlags(CHOC60_FLAGS),
    retailers: ['Vitacost', 'Target', 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_VIACTIV_CHOC_180}; viactiv.com chocolate-calcium-180-chews. Same supplement facts and OI as chocolate 60 (Vitacost lot exp 04/30/2027). Other ingredients: calcium carbonate, corn syrup, sugar, hydrogenated coconut oil, cocoa powder (processed with alkali), non-fat dry milk powder, glycerine, corn syrup solids, contains 2% or less of corn starch, soy lecithin, natural and artificial flavor, salt, cholecalciferol, phylloquinone. Vitacost 145142 InStock Add to cart $21.83 UPC 857141004950. Target A-1002184384 in stock $25.99 sold by iHerb (third party). Walmart /ip/152935190 in stock $25.82 sold by iHerb (third party). Second source per t105u L86. UPC brand gtin12, Vitacost, Office Depot; check digit OK.`,
    ],
  },
  {
    id: 'viactiv-b219-coq10-cardio-complete-30',
    productName: 'Viactiv CoQ10 Cardio Complete with Vitamins D3 + K2, Fruit Fusion (30 soft chews)',
    brand: 'Viactiv',
    category: VITAMINS,
    formulaId: 'viactiv-b219-coq10-cardio-complete',
    audience: ADULT,
    minAge: 18,
    form: 'soft chew',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '857141004677',
    activeIngredients: [
      { name: 'Coenzyme Q10', strength: '100 mg (as ubiquinone)' },
      { name: 'Vitamin D3', strength: '25 mcg (1000 IU)' },
      { name: 'Vitamin K2', strength: '50 mcg (as menaquinone-7)' },
    ],
    inactiveIngredients: buildOi(PANEL_VIACTIV_COQ10_30, COQ10_FLAGS),
    verdict: verdictFromFlags(COQ10_FLAGS),
    retailers: ['Vitacost', 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_VIACTIV_COQ10_30}; viactiv.com coq10-tropical-fusion-chews (brand name Tropical Fusion; box Fruit Fusion). Serving size 1 chew; Calories 20; Total Carbohydrate 4 g (2%); Total Sugars 2 g, Includes 2 g Added Sugars (4%); Vitamin D3 25 mcg (1000 IU) 125%; Vitamin K2 50 mcg 42%; CoQ10 100 mg. Actives ungraded. Other ingredients: tapioca syrup, raw cane sugar, palm oil, gum acacia, natural flavors, sunflower lecithin, vegetable juice (color), citric acid, sea salt. Vitacost 161049 InStock Add to cart $20.99 UPC 857141004677 best by 02/24/2028. Walmart /ip/20440264755 in stock $22.67 sold by iHerb (third party). Target A-1012831131 OOS not used. UPC brand gtin12, Vitacost; check digit OK.`,
    ],
  },
];

const ROWS = BATCH219_KYR6C_T117U_A;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 8) throw new Error(`batch219 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch219 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 0 || verdictTally.caution !== 0 || verdictTally.avoid !== 8) {
  throw new Error(`batch219 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch219 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch219 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch219 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch219 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch219 verdict ${record.id}`);
}
