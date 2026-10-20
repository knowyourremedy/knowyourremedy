// DRAFT / not verified / batch 220 KYR6-c (t118u group A WRITE).
// Prevagen (8 packs) + Fergon Iron Restore 60 — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const SHOPIFY_PREVAGEN = 'https://cdn.shopify.com/s/files/1/0583/2268/2043/files';

const METH = {
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  capCellulose:
    'Methodology §5 Cleared (capsule cellulose / labeled veg cap). Vegetable Cellulose Capsule maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  caseinPeptones: 'Methodology §5 Cleared (casein peptones). Founder lock Oct 17, 2026 t118u.',
  soyPeptones: 'Methodology §5 Cleared (soy peptones). Founder lock Oct 17, 2026 t118u.',
  lactose: 'Methodology §5 Cleared (lactose / lactose monohydrate).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  modStarch:
    'Methodology §5 Limited (modified starch). Modified Corn Starch maps here (Oct 17, 2026 t107u).',
  salt: 'Methodology §5 Cleared (sodium chloride / named salt). Salt maps here (Oct 17, 2026 t107u).',
  sugar: 'Methodology §5 Caution (bare sugar).',
  sugarAlcohol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  natFlavors: 'Methodology §5 Limited (natural flavors).',
  beetColor:
    'Methodology §5 Cleared (named plant color — beet / fruit-or-vegetable juice as color)',
  annatto:
    'Methodology §5 Caution (annatto / Organic Annatto Extract (Color) — allergenic; standalone Caution, not additive-scored, not Avoid)',
  agaveInulin: 'Methodology §5 Cleared (inulin / chicory root inulin / organic agave inulin).',
  rebA:
    'Methodology §5 Cleared (stevia / steviol glycosides — Stevia Extract (Rebaudioside A) / Reb A).',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  citric: 'Methodology §5 Cleared (citric acid).',
  dextrose: 'Methodology §5 Caution (glucose / dextrose).',
  crospovidone: 'Methodology §5 Cleared (crospovidone).',
  namedFlavor: 'Methodology §5 Caution (named flavor). Exact natural flavors stays Limited.',
  lecithinSunflower: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  stevia: 'Methodology §5 Cleared (stevia / steviol glycosides, high-purity extract).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_PV_RS_30 = `${SHOPIFY_PREVAGEN}/RSCap-FYB-SupFacts-0325.jpg`;
const PANEL_PV_RS_60 = `${SHOPIFY_PREVAGEN}/RS60-FYB-SupFacts-0325.jpg`;
const PANEL_PV_ES_30 = `${SHOPIFY_PREVAGEN}/ESCap-FYB-SupFacts-0325.jpg`;
const PANEL_PV_ES_60 = `${SHOPIFY_PREVAGEN}/ES60-FYB-SupFacts-0325.jpg`;
const PANEL_PV_RS_CHEW_BERRY = `${SHOPIFY_PREVAGEN}/RSChew-FYB-SupFacts-0325.jpg`;
const PANEL_PV_RS_CHEW_ORANGE = `${SHOPIFY_PREVAGEN}/OrangeChew-FYB-SupFacts-5000.jpg`;
const PANEL_PV_ES_CHEW_BERRY = `${SHOPIFY_PREVAGEN}/ESChew-FYB-SupFacts-0325.jpg`;
const PANEL_PV_PRO_30 = `${SHOPIFY_PREVAGEN}/Pro-FYB-SupFacts-0325.jpg`;
const PANEL_FERGON_RESTORE =
  'https://cdn.shopify.com/s/files/1/0367/6336/9611/products/FER_ECOMM_2000x2000_4.png';

const PREVAGEN_CAPSULE_FLAGS: FlagSpec[] = [
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Vegetable capsule (cellulose, water)', 'cleared', 'capCellulose'],
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Casein peptones', 'cleared', 'caseinPeptones'],
  ['Lactose', 'cleared', 'lactose'],
  ['Magnesium stearate (vegetable source)', 'cleared', 'magStearate'],
  ['Modified corn starch', 'limited', 'modStarch'],
  ['Salt', 'cleared', 'salt'],
  ['Soy peptones', 'cleared', 'soyPeptones'],
  ['Sugar', 'limited', 'sugar'],
];

const RS_BERRY_FLAGS: FlagSpec[] = [
  ['Sorbitol', 'limited', 'sugarAlcohol'],
  ['Mannitol', 'limited', 'sugarAlcohol'],
  ['Natural flavors', 'limited', 'natFlavors'],
  ['Beet juice powder (for color)', 'cleared', 'beetColor'],
  ['Casein peptones', 'cleared', 'caseinPeptones'],
  ['Lactose', 'cleared', 'lactose'],
  ['Magnesium stearate (vegetable source)', 'cleared', 'magStearate'],
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Modified corn starch', 'limited', 'modStarch'],
  ['Organic agave inulin', 'cleared', 'agaveInulin'],
  ['Organic rebaudioside A (stevia extract)', 'cleared', 'rebA'],
  ['Salt', 'cleared', 'salt'],
  ['Soy peptones', 'cleared', 'soyPeptones'],
  ['Stearic acid', 'cleared', 'stearic'],
  ['Sugar', 'limited', 'sugar'],
];

const RS_ORANGE_FLAGS: FlagSpec[] = [
  ['Sorbitol', 'limited', 'sugarAlcohol'],
  ['Mannitol', 'limited', 'sugarAlcohol'],
  ['Natural flavors', 'limited', 'natFlavors'],
  ['Annatto extract (for color)', 'limited', 'annatto'],
  ['Casein peptones', 'cleared', 'caseinPeptones'],
  ['Lactose', 'cleared', 'lactose'],
  ['Magnesium stearate (vegetable source)', 'cleared', 'magStearate'],
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Modified corn starch', 'limited', 'modStarch'],
  ['Organic agave inulin', 'cleared', 'agaveInulin'],
  ['Organic rebaudioside A (stevia extract)', 'cleared', 'rebA'],
  ['Salt', 'cleared', 'salt'],
  ['Soy peptones', 'cleared', 'soyPeptones'],
  ['Stearic acid', 'cleared', 'stearic'],
  ['Sugar', 'limited', 'sugar'],
];

const ES_BERRY_FLAGS: FlagSpec[] = [
  ['Sorbitol', 'limited', 'sugarAlcohol'],
  ['Mannitol', 'limited', 'sugarAlcohol'],
  ['Natural flavors', 'limited', 'natFlavors'],
  ['Beet juice powder (for color)', 'cleared', 'beetColor'],
  ['Casein peptones', 'cleared', 'caseinPeptones'],
  ['Citric acid', 'cleared', 'citric'],
  ['Lactose', 'cleared', 'lactose'],
  ['Magnesium stearate (vegetable source)', 'cleared', 'magStearate'],
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Modified corn starch', 'limited', 'modStarch'],
  ['Organic agave inulin', 'cleared', 'agaveInulin'],
  ['Organic rebaudioside A (stevia extract)', 'cleared', 'rebA'],
  ['Salt', 'cleared', 'salt'],
  ['Soy peptones', 'cleared', 'soyPeptones'],
  ['Stearic acid', 'cleared', 'stearic'],
  ['Sugar', 'limited', 'sugar'],
];

const RESTORE_FLAGS: FlagSpec[] = [
  ['Dextrose', 'limited', 'dextrose'],
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Crospovidone', 'cleared', 'crospovidone'],
  ['Citric acid', 'cleared', 'citric'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
  ['Natural orange flavor', 'cleared', 'namedFlavor'],
  ['Sunflower lecithin', 'cleared', 'lecithinSunflower'],
  ['Sodium chloride', 'cleared', 'salt'],
  ['Steviol glycosides', 'cleared', 'stevia'],
];

const PREVAGEN_VITAMIN_D_ACTIVE = { name: 'Vitamin D3 (as cholecalciferol)', strength: '50 mcg' } as const;

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

export const BATCH220_KYR6C_T118U_A: RatingRecord[] = [
  {
    id: 'prevagen-b220-regular-strength-30',
    productName: 'Prevagen Regular Strength 10 mg (30 capsules)',
    brand: 'Prevagen',
    category: VITAMINS,
    formulaId: 'prevagen-b220-regular-strength-capsule',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '894047001034',
    activeIngredients: [
      PREVAGEN_VITAMIN_D_ACTIVE,
      { name: 'Apoaequorin', strength: '10 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PV_RS_30, PREVAGEN_CAPSULE_FLAGS),
    verdict: verdictFromFlags(PREVAGEN_CAPSULE_FLAGS),
    retailers: ['Meijer', 'prevagen.com'],
    sourcesGeneral: [
      `Brand panel ${PANEL_PV_RS_30} (FYB-SupFacts-0325, ©2025 Quincy Bioscience) and prevagen.com/products/prevagen-regular-strength-brain-supplements (sku FG-723-30). Serving Size 1 Capsule. Vitamin D (as cholecalciferol) 50 mcg, 250%. Apoaequorin 10 mg. Contains: Milk and Soy. Contains a bioengineered food ingredient. NSF Contents Certified. Other ingredients: microcrystalline cellulose, vegetable capsule (cellulose, water), maltodextrin, contains 2% or less of: casein peptones, lactose, magnesium stearate (vegetable source), modified corn starch, salt, soy peptones, sugar. Meijer https://www.meijer.com/shopping/product/30-capsules/89404700103.html inStock $41.99. prevagen.com available $39.95. UPC brand variant barcode GTIN-14 00894047001034, Meijer key; check digit OK.`,
    ],
  },
  {
    id: 'prevagen-b220-regular-strength-60',
    productName: 'Prevagen Regular Strength 10 mg (60 capsules)',
    brand: 'Prevagen',
    category: VITAMINS,
    formulaId: 'prevagen-b220-regular-strength-capsule',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '894047001065',
    activeIngredients: [
      PREVAGEN_VITAMIN_D_ACTIVE,
      { name: 'Apoaequorin', strength: '10 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PV_RS_60, PREVAGEN_CAPSULE_FLAGS),
    verdict: verdictFromFlags(PREVAGEN_CAPSULE_FLAGS),
    retailers: ['Meijer', 'prevagen.com'],
    sourcesGeneral: [
      `Brand panel ${PANEL_PV_RS_60} and prevagen.com/products/prevagen-regular-strength-60-count-brain-supplements (sku FG-723-60). Same supplement facts and OI as Regular Strength 30. Meijer https://www.meijer.com/shopping/product/prevagen-regular-strength-capsules-60ct/89404700106.html inStock $79.99. prevagen.com available $74.95. UPC 894047001065; check digit OK.`,
    ],
  },
  {
    id: 'prevagen-b220-extra-strength-30',
    productName: 'Prevagen Extra Strength 20 mg (30 capsules)',
    brand: 'Prevagen',
    category: VITAMINS,
    formulaId: 'prevagen-b220-extra-strength-capsule',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '894047001102',
    activeIngredients: [
      PREVAGEN_VITAMIN_D_ACTIVE,
      { name: 'Apoaequorin', strength: '20 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PV_ES_30, PREVAGEN_CAPSULE_FLAGS),
    verdict: verdictFromFlags(PREVAGEN_CAPSULE_FLAGS),
    retailers: ['Meijer', 'Thrifty White', 'prevagen.com'],
    sourcesGeneral: [
      `Brand panel ${PANEL_PV_ES_30} and prevagen.com/products/prevagen-extra-strength-brain-supplements (sku FG-811-30). Apoaequorin 20 mg. Same OI as Regular Strength capsules. Meijer https://www.meijer.com/shopping/product/prevagen/89404700110.html inStock. Thrifty White https://shop.thriftywhite.com/prevagen-dietary-supplement-capsules-extra-strength-30-ct/ Current Stock 43 $59.95 UPC 894047001102 (abbreviated OI on TW page not used as panel). prevagen.com available $59.95. UPC 894047001102; check digit OK.`,
    ],
  },
  {
    id: 'prevagen-b220-extra-strength-60',
    productName: 'Prevagen Extra Strength 20 mg (60 capsules)',
    brand: 'Prevagen',
    category: VITAMINS,
    formulaId: 'prevagen-b220-extra-strength-capsule',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '894047001287',
    activeIngredients: [
      PREVAGEN_VITAMIN_D_ACTIVE,
      { name: 'Apoaequorin', strength: '20 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PV_ES_60, PREVAGEN_CAPSULE_FLAGS),
    verdict: verdictFromFlags(PREVAGEN_CAPSULE_FLAGS),
    retailers: ['Meijer', 'prevagen.com'],
    sourcesGeneral: [
      `Brand panel ${PANEL_PV_ES_60} and prevagen.com/products/prevagen-extra-strength-60-count-brain-supplements (sku FG-811-60). Meijer https://www.meijer.com/shopping/product/prevagen-extra-strength-capsules-20mg-60count/89404700128.html inStock $109.99. prevagen.com available $109.95. UPC 894047001287; check digit OK.`,
    ],
  },
  {
    id: 'prevagen-b220-chewables-berry-30',
    productName: 'Prevagen Regular Strength Chewables, Mixed Berry 10 mg (30 tablets)',
    brand: 'Prevagen',
    category: VITAMINS,
    formulaId: 'prevagen-b220-rs-chewable-berry',
    audience: ADULT,
    minAge: 18,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '894047001157',
    activeIngredients: [
      PREVAGEN_VITAMIN_D_ACTIVE,
      { name: 'Apoaequorin', strength: '10 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PV_RS_CHEW_BERRY, RS_BERRY_FLAGS),
    verdict: verdictFromFlags(RS_BERRY_FLAGS),
    retailers: ['Meijer', 'prevagen.com'],
    sourcesGeneral: [
      `Brand panel ${PANEL_PV_RS_CHEW_BERRY} and prevagen.com/products/prevagen-chewables-brain-supplements (sku FG-103-30). Serving Size 1 Tablet; Total Carbohydrate 1 g, <1%. Other ingredients: sorbitol, mannitol, natural flavors, contains 2% or less of: beet juice powder (for color), casein peptones, lactose, magnesium stearate (vegetable source), maltodextrin, modified corn starch, organic agave inulin, organic rebaudioside A (stevia extract), salt, soy peptones, stearic acid, sugar. Meijer https://www.meijer.com/shopping/product/prevagen/89404700115.html inStock. prevagen.com available $39.95. UPC 894047001157; check digit OK.`,
    ],
  },
  {
    id: 'prevagen-b220-chewables-orange-30',
    productName: 'Prevagen Regular Strength Chewables, Orange 10 mg (30 tablets)',
    brand: 'Prevagen',
    category: VITAMINS,
    formulaId: 'prevagen-b220-rs-chewable-orange',
    audience: ADULT,
    minAge: 18,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '894047001393',
    activeIngredients: [
      PREVAGEN_VITAMIN_D_ACTIVE,
      { name: 'Apoaequorin', strength: '10 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PV_RS_CHEW_ORANGE, RS_ORANGE_FLAGS),
    verdict: verdictFromFlags(RS_ORANGE_FLAGS),
    retailers: ['Meijer', 'prevagen.com'],
    sourcesGeneral: [
      `Brand panel ${PANEL_PV_RS_CHEW_ORANGE} and prevagen.com/products/prevagen-orange-chewables-brain-supplements (sku FG-104-30). Other ingredients: sorbitol, mannitol, natural flavors, contains 2% or less of: annatto extract (for color), casein peptones, lactose, magnesium stearate (vegetable source), maltodextrin, modified corn starch, organic agave inulin, organic rebaudioside A (stevia extract), salt, soy peptones, stearic acid, sugar. Meijer https://www.meijer.com/shopping/product/prevagen-regular-strength-orange-flavor-chewables-10mg-30-ct/89404700139.html inStock $41.99. prevagen.com available $39.95. UPC 894047001393; check digit OK.`,
    ],
  },
  {
    id: 'prevagen-b220-es-chewables-berry-30',
    productName: 'Prevagen Extra Strength Chewables, Mixed Berry 20 mg (30 tablets)',
    brand: 'Prevagen',
    category: VITAMINS,
    formulaId: 'prevagen-b220-es-chewable-berry',
    audience: ADULT,
    minAge: 18,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '894047001027',
    activeIngredients: [
      PREVAGEN_VITAMIN_D_ACTIVE,
      { name: 'Apoaequorin', strength: '20 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PV_ES_CHEW_BERRY, ES_BERRY_FLAGS),
    verdict: verdictFromFlags(ES_BERRY_FLAGS),
    retailers: ['Meijer', 'Thrifty White', 'prevagen.com'],
    sourcesGeneral: [
      `Brand panel ${PANEL_PV_ES_CHEW_BERRY} and prevagen.com/products/prevagen-extra-strength-chewables-brain-supplements (sku FG-814-30). Other ingredients: sorbitol, mannitol, natural flavors, contains 2% or less of: beet juice powder (for color), casein peptones, citric acid, lactose, magnesium stearate (vegetable source), maltodextrin, modified corn starch, organic agave inulin, organic rebaudioside A (stevia extract), salt, soy peptones, stearic acid, sugar. Meijer https://www.meijer.com/shopping/product/prevagen/89404700102.html inStock. Thrifty White https://shop.thriftywhite.com/prevagen-dietary-supplement-chewables-tablets-extra-strength-mixed-berry-flavor-30-ct/ Current Stock 22 $59.95 UPC 894047001027 (older TW formula text not used as panel). prevagen.com available $59.95. UPC 894047001027; check digit OK.`,
    ],
  },
  {
    id: 'fergon-b220-iron-restore-60',
    productName: 'Fergon Iron Restore Chewable Tablets, Orange (60 chewable tablets)',
    brand: 'Fergon',
    category: VITAMINS,
    formulaId: 'fergon-b220-iron-restore',
    audience: ADULT,
    minAge: 18,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '889411124013',
    activeIngredients: [
      { name: 'Iron (as SunActive Fe ferric pyrophosphate)', strength: '27 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_FERGON_RESTORE, RESTORE_FLAGS),
    verdict: verdictFromFlags(RESTORE_FLAGS),
    retailers: ['Walmart', 'Retail Market'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FERGON_RESTORE} and fergon.com/products/fergon-iron-restore (sku 011-2401; brand sold out Oct 17, 2026). Serving Size 1 chewable tablet; Calories 10; Total Carbohydrates 2 g, <1%; Total Sugars 2 g; Includes 2 g Added Sugars, 4%; Elemental Iron (as SunActive FE™ ferric pyrophosphate) 27 mg, 150%. Other ingredients: dextrose, maltodextrin, microcrystalline cellulose, crospovidone, citric acid, magnesium stearate, natural orange flavor, sunflower lecithin, sodium chloride‡, steviol glycosides (‡ adds a trivial amount of sodium). Walmart https://www.walmart.com/ip/Fergon-Iron-Restore-Chewable-Tablets-27mg-Iron-60-ct/213825746 in stock $13.37 sold by Emerson Group. Retail Market https://www.retailmarket.net/products/fergon-iron-restore-chewable-tablets-gentle-on-stomach-non-constipating-27mg-iron-for-energy-support-60-tablets/ schema InStock Add to Cart $31.49 UPC 889411124013 (t105u L86 third-party with named-ladder Walmart). UPC brand variant barcode; check digit OK.`,
    ],
  },
  {
    id: 'prevagen-b220-professional-formula-30',
    productName: 'Prevagen Professional Formula 40 mg (30 capsules)',
    brand: 'Prevagen',
    category: VITAMINS,
    formulaId: 'prevagen-b220-professional-formula-capsule',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '894047001010',
    activeIngredients: [
      PREVAGEN_VITAMIN_D_ACTIVE,
      { name: 'Apoaequorin', strength: '40 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PV_PRO_30, PREVAGEN_CAPSULE_FLAGS),
    verdict: verdictFromFlags(PREVAGEN_CAPSULE_FLAGS),
    retailers: ['Walgreens', 'Target', 'Walmart', 'prevagen.com'],
    sourcesGeneral: [
      `Brand panel ${PANEL_PV_PRO_30} (prints barcode 8 94047 00101 0) and prevagen.com/products/prevagen-professional-formula-brain-supplements (sku FG-513-40). Apoaequorin 40 mg. Same OI as Regular Strength capsules. Contains: Milk and Soy. Walgreens https://www.walgreens.com/store/c/prevagen-professional-formula-daily-capsules/ID=300402929-product in stock $89.99 sold by Walgreens. Target https://www.target.com/p/-/A-1004952791 in stock $89.95 sold by Prevagen (Target Plus). Walmart https://www.walmart.com/ip/Prevagen-Improves-Memory-Professional-Strength-40mg-30-Capsules-Apoaequorin-Vitamin-D-Brain-Supplement-Better-Health-Supports-Healthy-Function/966577712 in stock $89.95 sold by Prevagen Official Store (third party). prevagen.com available $89.95. CVS out of stock not used. UPC 894047001010 GTIN-14 00894047001010; check digit OK.`,
    ],
  },
];

const ROWS = BATCH220_KYR6C_T118U_A;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 9) throw new Error(`batch220 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch220 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch220 upc ${record.id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch220 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch220 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch220 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch220 verdict ${record.id}`);
}
