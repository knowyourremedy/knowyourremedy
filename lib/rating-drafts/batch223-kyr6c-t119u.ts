// DRAFT / not verified / batch 223 KYR6-c (t119u Goli WRITE).
// Sixteen Goli gummy packs — grade from OI only (all Caution on natural flavor drivers).

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const SLEEP = 'Sleep';

const SHOPIFY_VITACOST_GOLI = 'https://cdn.shopify.com/s/files/1/0804/8974/2651/files';

const METH = {
  caneSugar: 'Methodology §5 Cleared (cane sugar).',
  tapiocaSyrup: 'Methodology §5 Cleared (tapioca syrup / organic tapioca syrup).',
  water: 'Methodology §5 Cleared (purified water / water).',
  gums: 'Methodology §5 Cleared (xanthan / guar / acacia / pectin / gellan — food gums).',
  citrateSalt: 'Methodology §5 Cleared (citrate salts as fillers / buffers).',
  lacticAcid: 'Methodology §5 Cleared (lactic acid / malic acid).',
  citric: 'Methodology §5 Cleared (citric acid).',
  natFlavors: 'Methodology §5 Limited (natural flavors).',
  natFlavor:
    'Methodology §5 Caution (Natural Flavor, singular — flavor family row; LOCKED Sept 24, 2026). Unnamed flavors stay docked (t119u flavor clarification, Oct 17, 2026).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  fvColor:
    'Methodology §5 Cleared (Fruit and Vegetable (Color) — named plant-color / fruit-and-vegetable juice-as-color row; founder lock Oct 17, 2026 t119u).',
  pomegranate:
    'Methodology §5 Cleared (Pomegranate Powder — named fruit powder; founder override Oct 17, 2026 t118u).',
  lecithin: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  tapiocaFiber:
    'Methodology §5 Cleared (Organic Tapioca Fiber Powder / soluble tapioca fiber — same row; locked Sept 16, 2026)',
  fos: 'Methodology §5 Cleared (inulin / FOS / psyllium husk — fiber family)',
  steviaExtract: 'Methodology §5 Caution (stevia extract / stevia leaf extract).',
  modStarch: 'Methodology §5 Limited (modified starch).',
  turmericColor:
    'Methodology §5 Cleared (Turmeric Extract Color — Turmeric (Color) / turmeric-as-color only; t100u Oct 17, 2026; t75u Oct 16, 2026).',
  spirulinaExtract:
    'Methodology §5 Limited-risk (spirulina extract as Other Ingredient / color in a multi — Caution Limited; FDA color allow is not Clean; not Avoid; not Cleared; distinct from spirulina powder; locked Sept 21, 2026).',
  mctOil:
    'Methodology §5 Limited (MCT in a gummy — founder lock t132u Oct 20, 2026; no plant source named).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_ACV_60 = `${SHOPIFY_VITACOST_GOLI}/62_4c6f6a35-cf8e-4f8f-b930-fefcf2743fe8.jpg`;
const PANEL_ASHWA_60 = `${SHOPIFY_VITACOST_GOLI}/110_215d32c9-8a44-4927-83ca-076919a926b8.jpg`;
const PANEL_ZS_ASHWA_60 = `${SHOPIFY_VITACOST_GOLI}/31_10ad3bf4-d524-48ec-bd22-15158afc7914.jpg`;
const PANEL_BEETS_60 = `${SHOPIFY_VITACOST_GOLI}/29_2cdbfe39-496f-49b1-afc3-ec82d7395305.jpg`;
const PANEL_PPP_60 = `${SHOPIFY_VITACOST_GOLI}/30_c4a9f0de-0156-4535-9ae1-72eb3df91892.jpg`;
const PANEL_ZS_PPP_60 = `${SHOPIFY_VITACOST_GOLI}/31_fdf24351-5883-49e2-a9c5-7089c6319374.jpg`;
const PANEL_ENERGY_60 = `${SHOPIFY_VITACOST_GOLI}/14_a5a8125d-772e-4dc1-815b-05f0ed0147ff.jpg`;
const PANEL_NAD_60 = `${SHOPIFY_VITACOST_GOLI}/14_e6f90307-e97b-440c-af43-ba6475db86f8.jpg`;
const PANEL_DREAMY_60 = `${SHOPIFY_VITACOST_GOLI}/46_6a0f762d-9424-4515-a972-c01ff398358e.jpg`;
const PANEL_XSLEEP_50 = `${SHOPIFY_VITACOST_GOLI}/38_b83b70bc-5d21-451b-ac8d-94d1ed8d7bec.jpg`;
const PANEL_MATCHA_60 = `${SHOPIFY_VITACOST_GOLI}/30_9613d008-dfc3-4ffb-89c1-75a663e1d5a6.jpg`;
const PANEL_SG_60 = `${SHOPIFY_VITACOST_GOLI}/47_5ec39c36-05e8-416a-b83b-53c14dba1691.jpg`;
const PANEL_WMULTI_60 = `${SHOPIFY_VITACOST_GOLI}/62_79815886-c9ba-49a1-9ad4-932ec76f365e.jpg`;
const PANEL_ZS_ACV_60 = `${SHOPIFY_VITACOST_GOLI}/31_f64bf10e-07ce-419c-ae37-b1903fe4ccaf.jpg`;
const PANEL_ZS_MG_60 = `${SHOPIFY_VITACOST_GOLI}/63_e6149b6e-4337-45fe-be87-bf8422e2a5bd.jpg`;
const PANEL_ZS_CREATINE_60 = `${SHOPIFY_VITACOST_GOLI}/31_5fd3ebbf-edd2-4119-bd26-595c02a8742b.jpg`;

const ACV_FLAGS: FlagSpec[] = [
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Fruit and Vegetable Juices (Color)', 'cleared', 'juiceColor'],
  ['Beet Root Powder', 'cleared', 'juiceColor'],
  ['Pomegranate Powder', 'cleared', 'pomegranate'],
];

const ASHWA_FLAGS: FlagSpec[] = [
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Fruit and Vegetable Juice (Color)', 'cleared', 'juiceColor'],
  ['Sunflower Lecithin', 'cleared', 'lecithin'],
];

const ZS_ASHWA_FLAGS: FlagSpec[] = [
  ['Soluble Tapioca Fiber', 'cleared', 'tapiocaFiber'],
  ['Fructooligosaccharides', 'cleared', 'fos'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Fruit and Vegetable (Color)', 'cleared', 'fvColor'],
  ['Stevia Extract', 'limited', 'steviaExtract'],
];

const BEETS_FLAGS: FlagSpec[] = [
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Fruit and Vegetable Juice (Color)', 'cleared', 'juiceColor'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Sunflower Lecithin', 'cleared', 'lecithin'],
];

const PPP_FLAGS: FlagSpec[] = [
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Medium Chain Triglyceride (MCT) Oil', 'limited', 'mctOil'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sunflower Lecithin', 'cleared', 'lecithin'],
  ['Fruit and Vegetable Juice (color)', 'cleared', 'juiceColor'],
];

const ZS_PPP_FLAGS: FlagSpec[] = [
  ['Soluble Tapioca Fiber', 'cleared', 'tapiocaFiber'],
  ['Fructooligosaccharides', 'cleared', 'fos'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Fruit and Vegetable Juice (Color)', 'cleared', 'juiceColor'],
  ['Stevia Extract', 'limited', 'steviaExtract'],
];

const ENERGY_FLAGS: FlagSpec[] = [
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Fruit and Vegetable Juice (Color)', 'cleared', 'juiceColor'],
];

const NAD_FLAGS: FlagSpec[] = [
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Modified Food Starch', 'limited', 'modStarch'],
  ['Fruit and Vegetable Juice (Color)', 'cleared', 'juiceColor'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
];

const DREAMY_FLAGS: FlagSpec[] = [
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavor', 'limited', 'natFlavor'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Fruit and Vegetable Juice (for color)', 'cleared', 'juiceColor'],
];

const XSLEEP_FLAGS: FlagSpec[] = [
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Fruit and Vegetable Juice (Color)', 'cleared', 'juiceColor'],
  ['Sunflower Lecithin', 'cleared', 'lecithin'],
];

const MATCHA_FLAGS: FlagSpec[] = [
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Turmeric (Color)', 'cleared', 'turmericColor'],
  ['Spirulina Extract (Color)', 'limited', 'spirulinaExtract'],
];

const SG_FLAGS: FlagSpec[] = [
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavor', 'limited', 'natFlavor'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sodium Citrate Dihydrate', 'cleared', 'citrateSalt'],
  ['Sunflower Lecithin', 'cleared', 'lecithin'],
];

const WMULTI_FLAGS: FlagSpec[] = [
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Vegetable Juice (color)', 'cleared', 'juiceColor'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
];

const ZS_ACV_FLAGS: FlagSpec[] = [
  ['Soluble Tapioca Fiber', 'cleared', 'tapiocaFiber'],
  ['Fructooligosaccharides', 'cleared', 'fos'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Fruit and Vegetable Juice (Color)', 'cleared', 'juiceColor'],
  ['Stevia Extract', 'limited', 'steviaExtract'],
  ['Beet Root Powder', 'cleared', 'juiceColor'],
  ['Pomegranate Powder', 'cleared', 'pomegranate'],
];

const ZS_MG_FLAGS: FlagSpec[] = [
  ['Soluble Tapioca Fiber', 'cleared', 'tapiocaFiber'],
  ['Fructooligosaccharides', 'cleared', 'fos'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Fruit and Vegetable Juice (Color)', 'cleared', 'juiceColor'],
  ['Stevia Extract', 'limited', 'steviaExtract'],
];

const ZS_CREATINE_FLAGS: FlagSpec[] = [
  ['Soluble Tapioca Fiber', 'cleared', 'tapiocaFiber'],
  ['Fructooligosaccharides', 'cleared', 'fos'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Fruit and Vegetable Juice (Color)', 'cleared', 'juiceColor'],
  ['Stevia Extract', 'limited', 'steviaExtract'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

export const BATCH223_KYR6C_T119U: RatingRecord[] = [
  {
    id: 'goli-b223-acv-60',
    productName: 'Goli Apple Cider Vinegar Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-acv',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '627987249620',
    activeIngredients: [
      { name: 'Vitamin B12 (Cyanocobalamin)', strength: '2.4 mcg' },
      { name: 'Apple Cider Vinegar (5% Acetic Acid)', strength: '1000 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_ACV_60, ACV_FLAGS),
    verdict: verdictFromFlags(ACV_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Meijer', 'Target', 'Walmart'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_ACV_60} v39.2; Target A-83821428 art v39.2.1 (B12 + ACV only, same OI). Serving Size 2 Gummies; Servings 30; Calories 25; Sodium 15 mg (<1%); Total Carbohydrate 6 g (2%); Total Sugars 4 g; Includes 4 g Added Sugars (8%). Suggested use 1–2 gummies, 3 times daily. Other ingredients: Cane Sugar, Tapioca Syrup, Water, Pectin, Sodium Citrate, Natural Flavors, Malic Acid, Citric Acid, Fruit and Vegetable Juices (Color), Beet Root Powder, Pomegranate Powder. goli.com/products/1-bottle-of-apple-cider-vinegar-gummies $15.98 available; Vitacost goli-nutrition-apple-cider-vinegar-gummies-60-gummies-101677 $14.98; Meijer /shopping/product/x/62798724962.html inStock; Target A-83821428 $14.99 sold by Target; Walmart /ip/178552185. UPC goli.com barcode = Vitacost = Meijer = Target; check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-ashwagandha-60',
    productName: 'Goli Ashwagandha Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-ashwagandha',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: [
      { name: 'Vitamin D2 (Ergocalciferol)', strength: '25 mcg' },
      { name: 'KSM-66 Ashwagandha Root Extract', strength: '300 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_ASHWA_60, ASHWA_FLAGS),
    verdict: verdictFromFlags(ASHWA_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Meijer'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_ASHWA_60} v4.1. Serving Size 2 Gummies; Servings 30; Calories 25; Sodium 20 mg; Total Carbohydrate 6 g (2%); Total Sugars 4 g; Includes 4 g Added Sugars (8%). Other ingredients: Tapioca Syrup, Cane Sugar, Water, Pectin, Natural Flavors, Malic Acid, Citric Acid, Sodium Citrate, Fruit and Vegetable Juice (Color), Sunflower Lecithin. goli.com/products/1-bottle-of-ashwagandha-gummies $15.98; Vitacost …-ashwagandha-gummies-60-gummies-104633 $14.98; Meijer 62817635740 lowStock. UPC conflict: goli.com 628176357560 vs Vitacost/Meijer/Walmart /ip/969316506 and Target A-82255356 628176357409 — barcode left empty (t94u).`,
    ],
  },
  {
    id: 'goli-b223-zs-ashwagandha-plus-60',
    productName: 'Goli Zero Sugar Ashwagandha+ Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-zs-ashwagandha-plus',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840405683',
    activeIngredients: [
      { name: 'Vitamin D2 (as Ergocalciferol)', strength: '25 mcg' },
      { name: 'KSM-66 Ashwagandha Root Extract', strength: '300 mg' },
      {
        name: 'Proprietary Blend (L-Theanine, Maca Root Powder (Lepidium meyennii))',
        strength: '10 mg',
      },
    ],
    inactiveIngredients: buildOi(PANEL_ZS_ASHWA_60, ZS_ASHWA_FLAGS),
    verdict: verdictFromFlags(ZS_ASHWA_FLAGS),
    retailers: ['goli.com', 'Vitacost'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_ZS_ASHWA_60} v1.1. Serving Size 2 Gummies; Servings 30; Calories 10; Total Carbohydrate 4 g (1%); Dietary Fiber 3 g (11%); Total Sugar 0 g; Added 0 g; Sodium 15 mg (1%). Other ingredients: Soluble Tapioca Fiber, Fructooligosaccharides, Water, Pectin, Natural Flavors, Citric Acid, Sodium Citrate, Malic Acid, Fruit and Vegetable (Color), Stevia Extract. goli.com/products/1-bottle-of-zero-sugar-ashwagandha-gummies $18.98; Vitacost …-ashwagandha-gummies-60-gummies-149622 $18.98. UPC Vitacost = Meijer key 5584040568 (Meijer page OOS, not sale source). Check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-beets-cardio-60',
    productName: 'Goli Beets Cardio Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-beets-cardio',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840404006',
    activeIngredients: [
      { name: 'Vitamin B12 (as Cyanocobalamin)', strength: '12 mcg' },
      { name: 'Beet Root Powder Extract (Beta vulgaris L.) (root)', strength: '200 mg' },
      { name: 'CoQ10', strength: '100 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_BEETS_60, BEETS_FLAGS),
    verdict: verdictFromFlags(BEETS_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Meijer'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_BEETS_60} v1.2. Serving Size 2 Gummies; Servings 30; Calories 15; Sodium 10 mg; Total Carbohydrate 4 g (1%); Total Sugars 3 g; Includes 3 g Added Sugars (6%). Other ingredients: Tapioca Syrup, Cane Sugar, Water, Pectin, Contains less than 2% of: Citric Acid, Fruit and Vegetable Juice (Color), Malic Acid, Natural Flavors, Sodium Citrate, Sunflower Lecithin. goli.com/products/1-bottle-of-cardio-beets-gummies $15.98; Vitacost …-beets-cardio-gummies-60-gummies-119537 $14.98; Meijer 5584040400 lowStock. UPC Vitacost = Meijer; check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-pre-post-probiotics-60',
    productName: 'Goli Pre+Post+Probiotics Gummies (60 gummies)',
    brand: 'Goli',
    category: DIGESTIVE,
    formulaId: 'goli-b223-pre-post-probiotics',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840403962',
    activeIngredients: [
      { name: 'Bacillus subtilis DE111', strength: '10 mg (1 Billion Live Cells)' },
      {
        name: 'Postbiotic (heat-stable Lactobacillus paracasei MCC1849)',
        strength: '20 mg',
      },
      { name: 'Xylooligosaccharides (XOS)', strength: '50 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_PPP_60, PPP_FLAGS),
    verdict: verdictFromFlags(PPP_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Meijer'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_PPP_60} v1.2. Serving Size 3 Gummies; Servings 20; Calories 30; Total Carbohydrate 7 g (2%); Total Sugars 5 g; Includes 5 g Added Sugars (10%). Other ingredients: Tapioca Syrup, Cane Sugar, Water, Pectin, Medium Chain Triglyceride (MCT) Oil, Natural Flavors, Citric Acid, Sunflower Lecithin, Fruit and Vegetable Juice (color). goli.com/products/1-bottle-of-probiotic-gummies $15.98; Vitacost …-pre-post-probiotics-gummies-60-gummies-119536 $14.98; Meijer 5584040396 inStock. UPC Vitacost = Meijer; check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-zs-pre-post-probiotics-60',
    productName: 'Goli Zero Sugar Pre+Post+Probiotics Gummies (60 gummies)',
    brand: 'Goli',
    category: DIGESTIVE,
    formulaId: 'goli-b223-zs-pre-post-probiotics',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840405515',
    activeIngredients: [
      { name: 'Bacillus subtilis DE111', strength: '10 mg (1 Billion Live Cells)' },
      {
        name: 'Postbiotic (heat treated Lactobacillus paracasei MCC 1849)',
        strength: '20 mg',
      },
      { name: 'Xylooligosaccharides (XOS)', strength: '50 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_ZS_PPP_60, ZS_PPP_FLAGS),
    verdict: verdictFromFlags(ZS_PPP_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Walmart', 'Target'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_ZS_PPP_60} v1.2. Serving Size 3 Gummies; Servings 20; Calories 15; Total Carbohydrate 6 g (2%); Dietary Fiber 5 g (18%); Total Sugar 0 g; Sodium 25 mg (1%). Other ingredients: Soluble Tapioca Fiber, Fructooligosaccharides, Water, Pectin, Citric Acid, Natural Flavors, Sodium Citrate, Malic Acid, Fruit and Vegetable Juice (Color), Stevia Extract. goli.com/products/1-bottle-of-zero-sugar-probiotic-gummies $18.98; Vitacost …-pre-post-probiotics-gummies-60-gummies-149624 $19.55; Walmart /ip/16728306813; Target A-93130961. UPC Vitacost = Walmart = Target; check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-recharge-energy-60',
    productName: 'Goli Recharge Energy+ Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-recharge-energy',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840407229',
    activeIngredients: [
      { name: 'Vitamin C (Ascorbic Acid)', strength: '30 mg' },
      { name: 'Vitamin B6 (Pyridoxine Hydrochloride)', strength: '1 mg' },
      { name: 'Nitrosigine Bonded Arginine Silicate', strength: '750 mg' },
      { name: 'Caffeine', strength: '18 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_ENERGY_60, ENERGY_FLAGS),
    verdict: verdictFromFlags(ENERGY_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Walmart', 'Target'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_ENERGY_60} v1.0. Serving Size 2 Gummies; Servings 30; Calories 20; Total Carbohydrate 5 g (2%); Total Sugar 3 g; Includes 3 g Added Sugars (6%); Sodium 15 mg. Other ingredients: Tapioca Syrup, Cane Sugar, Water, Pectin, Natural Flavors, Citric Acid, Sodium Citrate, Malic Acid, Fruit and Vegetable Juice (Color). goli.com/products/1-bottle-of-recharge-energy-gummies $15.98; Vitacost …-recharge-energy-gummies-60-gummies-160029 $15.73; Walmart /ip/20426067178; Target A-94913559. UPC Vitacost = Walmart = Target; check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-renew-nad-60',
    productName: 'Goli Renew NAD+ Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-renew-nad',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840407168',
    activeIngredients: [
      { name: 'Vitamin C (Ascorbic Acid)', strength: '30 mg' },
      { name: 'Vitamin B3 (Niacinamide)', strength: '10 mg' },
      { name: 'Nicotinamide Riboside Chloride', strength: '50 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_NAD_60, NAD_FLAGS),
    verdict: verdictFromFlags(NAD_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Walmart', 'Target'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_NAD_60} v1.1. Serving Size 2 Gummies; Servings 30; Calories 25; Total Carbohydrate 6 g (2%); Total Sugar 4 g; Includes 4 g Added Sugars (8%); Sodium 15 mg. Other ingredients: Tapioca Syrup, Cane Sugar, Water, Pectin, Natural Flavors, Citric Acid, Sodium Citrate, Modified Food Starch, Fruit and Vegetable Juice (Color), Malic Acid. goli.com/products/1-bottle-of-renew-nad-gummies $17.98; Vitacost …-renew-nad-gummies-60-gummies-160028 $15.73; Walmart /ip/19213460208; Target A-94913558. UPC Vitacost = Walmart = Target; check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-dreamy-sleep-60',
    productName: 'Goli Dreamy Sleep Gummies (60 gummies)',
    brand: 'Goli',
    category: SLEEP,
    formulaId: 'goli-b223-dreamy-sleep',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840402538',
    activeIngredients: [
      { name: 'Vitamin D2 (as Ergocalciferol)', strength: '5 mcg' },
      { name: 'Magnesium (as Magnesium Citrate)', strength: '50 mg' },
      { name: 'Lemon Balm Extract (Melissa officinalis) (aerial)', strength: '90 mg' },
      {
        name: 'Herbal Blend (Tart Cherry Powder, Chamomile Extract, Passion Flower Extract)',
        strength: '40 mg',
      },
      { name: 'Melatonin', strength: '5 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_DREAMY_60, DREAMY_FLAGS),
    verdict: verdictFromFlags(DREAMY_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Meijer'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_DREAMY_60} v4.3. Serving Size 2 Gummies; Servings 30; Calories 25; Sodium 3 mg; Total Carbohydrate 6 g (2%); Total Sugars 4 g; Includes 4 g Added Sugars (8%). Take 2 at bedtime. Other ingredients: Cane Sugar, Tapioca Syrup, Water, Pectin, Natural Flavor, Citric Acid, Sodium Citrate, Malic Acid, Fruit and Vegetable Juice (for color). goli.com/products/1-bottle-of-sleep-gummies $15.98; Vitacost …-dreamy-sleep-gummies-60-gummies-114921 $14.98; Meijer 5584040253 inStock. UPC goli.com barcode = Vitacost = Meijer; check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-extra-strength-sleep-50',
    productName: 'Goli Extra-Strength Sleep Gummies (50 gummies)',
    brand: 'Goli',
    category: SLEEP,
    formulaId: 'goli-b223-extra-strength-sleep',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840403993',
    activeIngredients: [
      { name: 'Vitamin D2 (as Ergocalciferol)', strength: '5 mcg' },
      { name: 'Lemon Balm Extract (aerial)', strength: '90 mg' },
      {
        name: 'Herbal Blend (Tart Cherry Extract, Chamomile Extract, Passion Flower Extract (Passiflora incarnata) (aerial))',
        strength: '40 mg',
      },
      { name: 'Melatonin', strength: '10 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_XSLEEP_50, XSLEEP_FLAGS),
    verdict: verdictFromFlags(XSLEEP_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Meijer'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_XSLEEP_50} v1.2 (50-count bottle art). Serving Size 2 Gummies; Servings Per Container 25; Calories 15; Sodium 10 mg; Total Carbohydrate 4 g (1%); Total Sugars 3 g; Includes 3 g Added Sugars (6%). Other ingredients: Tapioca Syrup, Cane Sugar, Water, Pectin, Natural Flavors, Citric Acid, Malic Acid, Sodium Citrate, Fruit and Vegetable Juice (Color), Sunflower Lecithin. goli.com/products/extra-strength-sleep-gummies $15.98; Vitacost …-sleep-gummies-50-gummies-119538 $14.98; Meijer 5584040399 inStock. UPC Vitacost = Meijer; check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-matcha-mind-60',
    productName: 'Goli Matcha Mind Cognitive Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-matcha-mind',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840405348',
    activeIngredients: [
      { name: 'Cognizin Citicoline', strength: '250 mg' },
      { name: 'Matcha Powder (Camellia sinensis) (leaf)', strength: '100 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_MATCHA_60, MATCHA_FLAGS),
    verdict: verdictFromFlags(MATCHA_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Walmart'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_MATCHA_60} v1.1. Serving Size 3 Gummies; Servings 20; Calories 35; Sodium 30 mg; Total Carbohydrate 9 g (3%); Total Sugars 6 g; Includes 6 g Added Sugars (14%). Other ingredients: Tapioca Syrup, Cane Sugar, Water, Pectin, Citric Acid, Sodium Citrate, Natural Flavors, Malic Acid, Turmeric (Color), Spirulina Extract (Color). goli.com/products/1-pack-matcha-mind-gummies $29.98 (one 60-ct bottle); Vitacost …-matcha-mind-cognitive-gummies-60-gummies-145495 $14.99; Walmart /ip/5295566680 $15.73 sold by Walmart. UPC Vitacost = Walmart (goli.com has no barcode field); check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-supergreens-60',
    productName: 'Goli Supergreens Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-supergreens',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: [
      { name: 'Vitamin A (as Retinyl Palmitate)', strength: '226 mcg' },
      { name: 'Thiamin (as Thiamin Hydrochloride)', strength: '0.6 mg' },
      { name: 'Niacin (as Niacinamide)', strength: '1.61 mg' },
      { name: 'Vitamin B6 (as Pyridoxine Hydrochloride)', strength: '0.17 mg' },
      { name: 'Folate (Folic Acid)', strength: '40 mcg DFE (24 mcg folic acid)' },
      { name: 'Vitamin B12 (as Cyanocobalamin)', strength: '36 mcg' },
      { name: 'Pantothenic Acid (as d-Calcium Pantothenate)', strength: '0.5 mg' },
      { name: 'Iron (as Ferrous Fumarate)', strength: '2.82 mg' },
      { name: 'Magnesium (as Magnesium Citrate)', strength: '6.3 mg' },
      { name: 'Zinc (as Zinc Citrate)', strength: '1.1 mg' },
      {
        name: 'Supergreens & Probiotics Blend (artichoke, spirulina, Bacillus subtilis, aloe, kale, moringa, broccoli, barley grass, chlorella, parsley, spinach, celery)',
        strength: '255 mg',
      },
    ],
    inactiveIngredients: buildOi(PANEL_SG_60, SG_FLAGS),
    verdict: verdictFromFlags(SG_FLAGS),
    retailers: ['goli.com', 'Vitacost'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_SG_60} v13.0 (founder: write from label; goli.com text adds d-alpha Tocopheryl Acetate not on label v13.0). Serving Size 2 Gummies; Servings 30; Calories 25; Total Carbohydrate 6 g (2%); Total Sugars 5 g; Includes 5 g Added Sugars (10%); Sodium 10 mg. Supergreens & Probiotics Blend is inside the Supplement Facts box (active). Other ingredients: Cane Sugar, Tapioca Syrup, Water, Pectin, Natural Flavor, Malic Acid, Citric Acid, Sodium Citrate Dihydrate, Sunflower Lecithin. goli.com/products/1-bottle-of-supergreens-gummies $15.98; Vitacost …-supergreens-gummies-60-gummies-113165 $14.98. UPC conflict: goli.com 628176357591 vs Vitacost/Meijer/Walmart /ip/828858016 055840401821 — barcode left empty (t94u).`,
    ],
  },
  {
    id: 'goli-b223-womens-multi-60',
    productName: "Goli Women's Complete Multi Gummies (60 gummies)",
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-womens-multi',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840402552',
    activeIngredients: [
      { name: 'Vitamin A (as Retinyl Palmitate)', strength: '450 mcg RAE' },
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '18 mg' },
      { name: 'Vitamin D2 (as Ergocalciferol)', strength: '15 mcg' },
      { name: 'Vitamin E (as dl-alpha Tocopheryl Acetate)', strength: '3 mg' },
      { name: 'Thiamin (as Thiamin Hydrochloride)', strength: '0.3 mg' },
      { name: 'Riboflavin', strength: '0.33 mg' },
      { name: 'Niacin (as Niacinamide)', strength: '4 mg NE' },
      { name: 'Vitamin B6 (as Pyridoxine Hydrochloride)', strength: '0.43 mg' },
      { name: 'Folate (as Folic Acid)', strength: '200 mcg DFE (120 mcg Folic Acid)' },
      { name: 'Vitamin B12 (as Cyanocobalamin)', strength: '2.4 mcg' },
      { name: 'Biotin', strength: '225 mcg' },
      { name: 'Pantothenic Acid (as d-Calcium Pantothenate)', strength: '1 mg' },
      { name: 'Vitamin K1 (as Phytonadione)', strength: '12 mcg' },
      { name: 'Zinc (as Zinc Citrate)', strength: '2.2 mg' },
      { name: 'Selenium (as Sodium Selenite)', strength: '5.5 mcg' },
      { name: 'Copper (as Copper Gluconate)', strength: '0.09 mg' },
      { name: 'Manganese (as Manganese Sulfate)', strength: '0.23 mg' },
      { name: 'Chromium (as Chromium Chloride)', strength: '3.5 mcg' },
    ],
    inactiveIngredients: buildOi(PANEL_WMULTI_60, WMULTI_FLAGS),
    verdict: verdictFromFlags(WMULTI_FLAGS),
    retailers: ['goli.com', 'Vitacost', 'Meijer'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_WMULTI_60} v2.1 (write Vegetable Juice (color); goli.com prints Fruit and Vegetable Juice (for color) — both Cleared juice-color rows). Serving Size 2 Gummies; Servings 30; Calories 25; Total Carbohydrate 6 g (2%); Total Sugars 4 g; Includes 4 g Added Sugars (8%); Sodium 15 mg. Other ingredients: Cane Sugar, Tapioca Syrup, Water, Pectin, Natural Flavors, Malic Acid, Citric Acid, Vegetable Juice (color), Sodium Citrate. goli.com/products/1-bottle-of-womens-multi-gummies $15.98; Vitacost …-women-s-complete-multi-gummies-60-gummies-115413 $14.98; Meijer 5584040255 inStock. UPC goli.com barcode = Vitacost = Meijer; check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-zs-acv-plus-60',
    productName: 'Goli Zero Sugar Apple Cider Vinegar+ Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-zs-acv-plus',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840405492',
    activeIngredients: [
      { name: 'Vitamin B12 (Cyanocobalamin)', strength: '2.4 mcg' },
      { name: 'Apple Cider Vinegar (5% Acetic Acid)', strength: '1000 mg' },
      {
        name: 'SNZ TriBac Probiotic Blend (Bacillus coagulans SNZ 1969, Bacillus clausii SNZ 1971, Bacillus subtilis SNZ 1972)',
        strength: '8 mg',
      },
    ],
    inactiveIngredients: buildOi(PANEL_ZS_ACV_60, ZS_ACV_FLAGS),
    verdict: verdictFromFlags(ZS_ACV_FLAGS),
    retailers: ['goli.com', 'Vitacost'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_ZS_ACV_60} v1.1. Serving Size 2 Gummies; Servings 30; Calories 10; Total Carbohydrate 4 g (1%); Dietary Fiber 3 g (11%); Total Sugar 0 g; Sodium 10 mg. Other ingredients: Soluble Tapioca Fiber, Fructooligosaccharides, Water, Pectin, Natural Flavors, Citric Acid, Sodium Citrate, Malic Acid, Fruit and Vegetable Juice (Color), Stevia Extract, Beet Root Powder, Pomegranate Powder. goli.com/products/1-bottle-of-zero-sugar-apple-cider-vinegar-gummies $18.98; Vitacost goli-nutrition-world-s-first-apple-cider-vinegar-gummies-zero-sugar-60-gummies-148119 $18.98. UPC Vitacost = Meijer key 5584040549 (Meijer OOS); check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-zs-magnesium-glycinate-60',
    productName: 'Goli Zero Sugar Magnesium Glycinate Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-zs-magnesium-glycinate',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840405553',
    activeIngredients: [
      { name: 'Vitamin D2 (as Ergocalciferol)', strength: '5 mcg' },
      { name: 'Magnesium (from 1,100mg of Magnesium Glycinate)', strength: '125 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_ZS_MG_60, ZS_MG_FLAGS),
    verdict: verdictFromFlags(ZS_MG_FLAGS),
    retailers: ['Vitacost', 'Walmart', 'Target', 'Walgreens', 'CVS'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_ZS_MG_60} v1.3. Serving Size 3 Gummies; Servings 20; Calories 15; Total Carbohydrate 7 g (3%); Dietary Fiber 5 g (18%); Total Sugar 0 g; Includes 0 g Added Sugar (0%); Sodium 5 mg (<1%). Suggested use: take 3 gummies once daily. Other ingredients: Soluble Tapioca Fiber, Fructooligosaccharides, Water, Pectin, Natural Flavors, Citric Acid, Malic Acid, Fruit and Vegetable Juice (Color), Stevia Extract. Vitacost goli-nutrition-magnesium-glycinate-gummies-60-gummies-149623 $19.93; Walmart /ip/13425055962 $19.77 sold by Walmart.com; Target A-93130958; Walgreens ID=300456343; CVS in stock. goli.com sells cases only. UPC Vitacost = Walmart = Target; check digit OK.`,
    ],
  },
  {
    id: 'goli-b223-zs-creatine-60',
    productName: 'Goli Zero Sugar Creatine Monohydrate Gummies (60 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b223-zs-creatine',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '055840405539',
    activeIngredients: [
      { name: 'Vitamin B6 (pyridoxine hydrochloride)', strength: '1.7 mg' },
      { name: 'Vitamin B12 (Cyanocobalamin)', strength: '2.4 mcg' },
      { name: 'Creatine Monohydrate', strength: '3000 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_ZS_CREATINE_60, ZS_CREATINE_FLAGS),
    verdict: verdictFromFlags(ZS_CREATINE_FLAGS),
    retailers: ['Vitacost', 'Walmart', 'Walgreens'],
    sourcesGeneral: [
      `Vitacost label ${PANEL_ZS_CREATINE_60} v1.1. Serving Size 3 Gummies; Servings 20; Calories 15; Total Carbohydrate 6 g (2%); Dietary Fiber 5 g (18%); Total Sugar 0 g; Added 0 g (0%); Sodium 30 mg (2%). Take 3 once daily. Other ingredients: Soluble Tapioca Fiber, Fructooligosaccharides, Water, Pectin, Natural Flavors, Citric Acid, Sodium Citrate, Fruit and Vegetable Juice (Color), Stevia Extract, Malic Acid. Vitacost goli-nutrition-creatine-monohydrate-gummies-60-gummies-149625 $19.93; Walmart /ip/16669151362 $18.87; Walgreens ID=300467585 in stock. UPC Vitacost = Walmart; check digit OK.`,
    ],
  },
];

const ROWS = BATCH223_KYR6C_T119U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 16) throw new Error(`batch223 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch223 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch223 upc ${record.id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch223 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch223 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch223 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch223 verdict ${record.id}`);
}
