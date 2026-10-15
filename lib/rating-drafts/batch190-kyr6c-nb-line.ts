// DRAFT / not verified / batch 190 KYR6-c.
// Nature's Bounty US qualifying counts whose panel was read and whose same count
// was for sale. batch187–batch189 rows are not rewritten.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  agar: 'Methodology §5 Cleared (agar / agar-agar).',
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate antioxidant).',
  cane: 'Methodology §5 Cleared (cane sugar).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  citric: 'Methodology §5 Cleared (citric acid).',
  citrate: 'Methodology §5 Cleared (sodium citrate, citrate salt).',
  flavors: 'Methodology §5 Limited (natural flavors).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  modFoodStarch: 'Methodology §5 Limited (modified food starch).',
  paprika: 'Methodology §5 Cleared (paprika extract as color).',
  pectin: 'Methodology §5 Cleared (pectin).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  sugar: 'Methodology §5 Cleared (sugar).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const MAG_GLY_GUMMY_PANEL = 'https://naturesbounty.com/products/high-absorption-magnesium-glycinate-gummies';
const TARGET_MAG_GLY_GUMMY =
  'https://www.target.com/p/nature-39-s-bounty-magnesium-glycinate-gummies-60ct/-/A-1010605449';
const BERBERINE_PANEL = 'https://naturesbounty.com/products/berberine-1000mg';
const METAB_PANEL = 'https://naturesbounty.com/products/advanced-metabolism-booster-1';
const COLLAGEN_PANEL = 'https://naturesbounty.com/products/ultra-collagen-booster';
const K2D3_PANEL = 'https://naturesbounty.com/products/k2-d3-capsules';
const ADV_MAG_GLY_PANEL = 'https://naturesbounty.com/products/advanced-magnesium-glycinate';

const MAG_GLY_GUMMY_FLAGS: IngredientFlag[] = [
  flag(MAG_GLY_GUMMY_PANEL, 'Sugar', 'cleared', METH.sugar),
  flag(MAG_GLY_GUMMY_PANEL, 'Glucose Syrup', 'cleared', METH.glucose),
  flag(MAG_GLY_GUMMY_PANEL, 'Citric Acid', 'cleared', METH.citric),
  flag(MAG_GLY_GUMMY_PANEL, 'Sodium Citrate', 'cleared', METH.citrate),
  flag(MAG_GLY_GUMMY_PANEL, 'Agar-Agar', 'cleared', METH.agar),
  flag(MAG_GLY_GUMMY_PANEL, 'Natural Flavors', 'limited', METH.flavors),
  flag(MAG_GLY_GUMMY_PANEL, 'Paprika Extract (Color)', 'cleared', METH.paprika),
  flag(MAG_GLY_GUMMY_PANEL, 'Pectin', 'cleared', METH.pectin),
];

const BERBERINE_FLAGS: IngredientFlag[] = [
  flag(BERBERINE_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
  flag(BERBERINE_PANEL, 'Silica', 'limited', METH.silica),
  flag(BERBERINE_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
];

const METAB_FLAGS: IngredientFlag[] = [
  flag(METAB_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
  flag(METAB_PANEL, 'Modified Food Starch', 'limited', METH.modFoodStarch),
  flag(METAB_PANEL, 'Silica', 'limited', METH.silica),
  flag(METAB_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
];

const COLLAGEN_FLAGS: IngredientFlag[] = [
  flag(COLLAGEN_PANEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(COLLAGEN_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
  flag(COLLAGEN_PANEL, 'Silica', 'limited', METH.silica),
  flag(COLLAGEN_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
];

const K2D3_FLAGS: IngredientFlag[] = [flag(K2D3_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose)];

const ADV_MAG_GLY_FLAGS: IngredientFlag[] = [
  flag(ADV_MAG_GLY_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
  flag(ADV_MAG_GLY_PANEL, 'Ascorbyl Palmitate', 'cleared', METH.ascorbyl),
];

export const BATCH190_KYR6C_NB_LINE: RatingRecord[] = [
  {
    id: 'natures-bounty-b190-mag-gly-gummies-60',
    productName: "Nature's Bounty High Absorption Magnesium Glycinate Gummies (60 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    barcode: '074312017841',
    formulaId: 'natures-bounty-b190-mag-gly-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Magnesium (as Magnesium Glycinate)', strength: '100 mg per 2 gummies' }],
    inactiveIngredients: MAG_GLY_GUMMY_FLAGS,
    verdict: 'caution',
    retailers: ['Target', 'Walgreens', 'Amazon'],
    sourcesGeneral: [
      "Brand page high-absorption-magnesium-glycinate-gummies was read. Serving size 2 gummies. Servings per container 30, which is 60 gummies. Other ingredients: sugar, glucose syrup, citric acid, sodium citrate. Contains <2% of: agar-agar, natural flavors, paprika extract (color), pectin. DailyMed had no Nature's Bounty magnesium glycinate gummy SPL. Target opened Nature's Bounty Magnesium Glycinate Gummies, 60 ct, with Add to cart; Target content vault for that SKU printed UPC 074312017841 on the 60-gummy shrink. CVS returned 403. Walgreens opened High Absorption Magnesium Glycinate Gummies, Peach Mango, 60 ea, with Add to cart. Amazon opened Nature's Bounty High Absorption Magnesium Glycinate Gummies, 60 Count, with a buy box. Walmart returned a robot check. Google AI mode last cited Target, Walgreens, and Amazon pages that were opened for this 60-count.",
    ],
  },
  {
    id: 'natures-bounty-b190-berberine-60',
    productName: "Nature's Bounty Berberine (60 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b190-berberine',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Berberine', strength: '1000 mg per 2 capsules' }],
    inactiveIngredients: BERBERINE_FLAGS,
    verdict: 'caution',
    retailers: ['Walgreens', 'Amazon', 'CVS'],
    sourcesGeneral: [
      "Brand page berberine-1000mg was read. The count on the page is 60 capsules. Serving size 2 capsules. Other ingredients: vegetable cellulose. Contains <2% of: silica, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 60-count Berberine card. CVS opened Nature's Bounty Berberine, 60 ct, at $14.99 with Buy 1, get 1 free. Walgreens opened Berberine 1000mg Capsules, 60 ea, with Add to cart. Amazon opened Berberine 1000mg Capsules, 60 Count, with a buy box. Walmart returned a robot check. Google AI mode last cited Walgreens, CVS, and Amazon pages that were opened for this 60-count. No opened named-store page printed a barcode tied only to this 60-count bottle.",
    ],
  },
  {
    id: 'natures-bounty-b190-metabolism-60',
    productName: "Nature's Bounty Advanced Metabolism Booster (60 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b190-sinetrol-metabolism',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Sinetrol citrus fruit blend', strength: '630 mg per 2 capsules' },
      { name: 'Thai black ginger extract', strength: '120 mg per 2 capsules' },
    ],
    inactiveIngredients: METAB_FLAGS,
    verdict: 'caution',
    retailers: ['Walgreens', 'Amazon'],
    sourcesGeneral: [
      "Brand page advanced-metabolism-booster-1 was read. Serving size 2 capsules. Servings per container 30, which is 60 capsules. Other ingredients: vegetable cellulose, modified food starch. Contains <2% of: silica, vegetable magnesium stearate. The metabolism-booster handle on the brand site prints the same inactive line and 60-count serving math. DailyMed had no SPL. Target search did not open a priced 60-count metabolism booster card. CVS returned 403. Walgreens opened Optimal Solutions Metabolism Booster Capsules, 60 ea, with Add to cart. Amazon opened Advanced Metabolism Booster, 60 Capsules, with a buy box. Walmart returned a robot check. Google AI mode last cited Walgreens and Amazon pages that were opened for this 60-count.",
    ],
  },
  {
    id: 'natures-bounty-b190-ultra-collagen-48',
    productName: "Nature's Bounty Optimal Solutions Ultra Collagen Booster (48 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b190-ultra-collagen',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'BioCell Collagen II', strength: '1000 mg per 2 capsules' }],
    inactiveIngredients: COLLAGEN_FLAGS,
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page ultra-collagen-booster was read. Serving size 2 capsules. Servings per container 24, which is 48 capsules. Other ingredients: gelatin, vegetable cellulose. Contains <2% of: silica, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 48-count Ultra Collagen Booster card. CVS returned 403. Walgreens opened Optimal Solutions Ultra Collagen Booster, 48 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 48-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b190-k2-d3-30',
    productName: "Nature's Bounty Vitamin K2 + D3 (30 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b190-k2-d3',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '100 mcg (4000 IU)' },
      { name: 'Vitamin K2 (menaquinone-7)', strength: '100 mcg' },
    ],
    inactiveIngredients: K2D3_FLAGS,
    verdict: 'clean',
    retailers: ['Walgreens', 'CVS'],
    sourcesGeneral: [
      "Brand page k2-d3-capsules was read. Serving size 1 capsule. Servings per container 30. Other ingredients: vegetable cellulose. DailyMed had no SPL. Target search did not open a priced 30-count K2 + D3 card. CVS Product Specifications opened for Nature's Bounty Vitamin K2 + D3, 30 ct, at $14.99 with Buy 1, get 1 free. Walgreens opened Vitamin K2 + D3, 30 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited Walgreens and CVS pages that were opened for this 30-count.",
    ],
  },
  {
    id: 'natures-bounty-b190-advanced-mag-gly-90',
    productName: "Nature's Bounty Advanced Magnesium Glycinate (90 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b187-cellulose-ascorbyl',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Magnesium (as Magnesium Glycinate)', strength: '360 mg per 3 capsules' }],
    inactiveIngredients: ADV_MAG_GLY_FLAGS,
    verdict: 'clean',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page advanced-magnesium-glycinate was read. Serving size 3 capsules. Servings per container 30, which is 90 capsules. Other ingredients: vegetable cellulose, ascorbyl palmitate. Same inactive line as High Absorption Magnesium Glycinate 90 capsules on MAIN but this pack is the 360 mg Advanced line, not the 240 mg capsule SKU. DailyMed had no SPL. Target search did not open a priced 90-count Advanced Magnesium Glycinate card. CVS returned 403. Walgreens opened Advanced Magnesium Glycinate 360 mg Muscle & Bone Support Capsules, 90 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 90-count listing that was opened.",
    ],
  },
];

const ROWS = BATCH190_KYR6C_NB_LINE;

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

if (ROWS.length !== 6) throw new Error(`batch190 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch190 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch190 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch190 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch190 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch190 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch190 verdict ${record.id}`);
}
