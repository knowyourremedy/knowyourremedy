// DRAFT / not verified / batch 193 KYR6-c.
// Twenty Nature's Bounty packs from products.json indices 181–162 plus held Advanced
// Triple Absorb CoQ10 90. Rows only where panel + same-count sale completed the ladder.
// batch187–batch192 rows are not rewritten.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  annatto: 'Methodology §5 Limited (annatto extract / annatto color).',
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  calciumCarbonate: 'Methodology §5 Cleared (calcium carbonate as an other ingredient).',
  caramel: 'Methodology §5 Avoid (caramel color — class not named as I or II).',
  carnauba: 'Methodology §5 Caution (carnauba wax).',
  castor: 'Methodology §5 Cleared (castor oil / polyoxyl castor oil derivatives — oral).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  citric: 'Methodology §5 Cleared (citric acid).',
  coconutFill: 'Methodology §5 Cleared (coconut oil as softgel fill — not the gummy seed-oil rule).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  flavor: 'Methodology §5 Limited (natural flavors).',
  fructose: 'Methodology §5 Limited (fructose).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  guar: 'Methodology §5 Cleared (guar gum).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  lecithin: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  limeOil: 'Methodology §5 Cleared (lime oil flavor in a softgel fill).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  oatOil: 'Methodology §5 Cleared (oat oil as softgel fill).',
  oliveFill: 'Methodology §5 Cleared (olive oil as softgel fill).',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  pectin: 'Methodology §5 Cleared (pectin).',
  potassiumSorbate: 'Methodology §5 Limited (potassium sorbate, synthetic preservative).',
  riceBranFill: 'Methodology §5 Cleared (rice bran oil as softgel fill — not the gummy base).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  sodiumCarbonate: 'Methodology §5 Cleared (sodium carbonate).',
  sorbitol: 'Methodology §5 Limited (sorbitol / sorbitol solution).',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not the gummy seed-oil rule).',
  soyLecithin: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  sucrose: 'Methodology §5 Limited (sucrose).',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  tocopherol: 'Methodology §5 Cleared (tocopherols).',
  triacetin: 'Methodology §5 Cleared (triacetin).',
  turmeric: 'Methodology §5 Cleared (turmeric extract / turmeric color).',
  vitEAcetate: 'Methodology §5 Cleared (vitamin E acetate antioxidant).',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}


const B12_200_PANEL = 'https://naturesbounty.com/products/b-12-1000-mcg-200-tablets';
const B12_LIQUID_PANEL = 'https://naturesbounty.com/products/b-12-5000-mcg-2-oz-liquid';
const B2_PANEL = 'https://naturesbounty.com/products/b-2-100-mg-100-tablets';
const B6_PANEL = 'https://naturesbounty.com/products/b-6-100-mg-100-tablets';
const MELATONIN_PANEL = 'https://naturesbounty.com/products/bi-layer-melatonin-5-mg-60-bi-layer-tablets';
const BIOTIN_SOFTGEL_PANEL = 'https://naturesbounty.com/products/biotin-10000-mcg-120-rapid-release-softgels';
const BIOTIN_1000_PANEL = 'https://naturesbounty.com/products/biotin-1000-mcg-100-tablets';
const BIOTIN_5000_150_PANEL = 'https://naturesbounty.com/products/biotin-5000-mcg-150-rapid-release-softgels';
const BIOTIN_5000_72_PANEL = 'https://naturesbounty.com/products/biotin-5000-mcg-72-capsules';
const BLACK_COHOSH_PANEL = 'https://naturesbounty.com/products/black-cohosh-450-mg-100-capsules';
const CAL_MAG_ZINC_PANEL = 'https://naturesbounty.com/products/calcium-magnesium-zinc-100-coated-tablets';
const CALCIUM_D3_PANEL = 'https://naturesbounty.com/products/calcium-plus-vitamin-d3-500-mg-300-tablets';
const ACIDOPHILUS_PANEL = 'https://naturesbounty.com/products/chewable-acidophilus-with-bifidus-100-wafer';
const FISH_OIL_PANEL = 'https://naturesbounty.com/products/fish-oil-1000-mg-145-rapid-release-softgels';
const CINNAMON_100_PANEL = 'https://naturesbounty.com/products/cinnamon-1000-mg-100-capsules';
const CINNAMON_CHROMIUM_PANEL = 'https://naturesbounty.com/products/cinnamon-2000-plus-chromium-400-mcg-60-capsules';
const CLA_PANEL = 'https://naturesbounty.com/products/cla-1000-mg-50-rapid-release-softgels';
const PROBIOTIC_CD_PANEL = 'https://naturesbounty.com/products/controlled-delivery-probiotic-30-caplets';
const PROBIOTIC_CD30_PANEL = 'https://naturesbounty.com/products/controlled-delivery-probiotic-cd-30-caplets';
const COQ10_45_PANEL = 'https://naturesbounty.com/products/co-q-10-100-mg-45-rapid-release-softgels';
const TRIPLE_COQ10_PANEL = 'https://naturesbounty.com/products/advanced-triple-absorb-coq10';

export const BATCH193_KYR6C_NB_TWENTY: RatingRecord[] = [
  {
    id: 'natures-bounty-b193-b12-200',
    productName: "Nature's Bounty Vitamin B-12 1,000 mcg (200 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b192-b12-1000-100',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312528057',
    activeIngredients: [{ name: 'Vitamin B-12 (cyanocobalamin)', strength: '1,000 mcg per tablet' }],
    inactiveIngredients: [
flag(B12_200_PANEL, 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag(B12_200_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(B12_200_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
      flag(B12_200_PANEL, 'Natural Palm Leaf Glaze', 'limited', METH.carnauba),
      flag(B12_200_PANEL, 'Silica', 'limited', METH.silica),
      flag(B12_200_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page b-12-1000-mcg-200-tablets was read. Serving size 1 tablet. Servings per container 200. Other ingredients: dicalcium phosphate, vegetable cellulose, vegetable stearic acid. Contains <2% of: natural palm leaf glaze, silica, vegetable magnesium stearate. Natural palm leaf glaze is graded as carnauba wax, not palm oil. DailyMed had no SPL. Target search did not open a priced 200-count B-12 1,000 mcg tablet card. CVS returned 403. Walgreens opened Vitamin B-12, 1000 mcg, Tablets, 200 ea, at $31.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 200-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-b12-liquid-59',
    productName: "Nature's Bounty Vitamin B-12 5,000 mcg Liquid (59 doses)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-b12-liquid',
    audience: ADULT,
    minAge: 18,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312181870',
    activeIngredients: [{ name: 'Vitamin B-12 (cyanocobalamin)', strength: '5,000 mcg per 1 mL' }],
    inactiveIngredients: [
flag(B12_LIQUID_PANEL, 'Purified Water', 'cleared', METH.water),
      flag(B12_LIQUID_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
      flag(B12_LIQUID_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag(B12_LIQUID_PANEL, 'Natural Berry Flavor', 'limited', METH.flavor),
      flag(B12_LIQUID_PANEL, 'Citric Acid', 'cleared', METH.citric),
      flag(B12_LIQUID_PANEL, 'Potassium Sorbate', 'limited', METH.potassiumSorbate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page b-12-5000-mcg-2-oz-liquid was read. Serving size 1 mL. Servings per container 59. Other ingredients: purified water, sorbitol, vegetable glycerin, natural berry flavor, citric acid, potassium sorbate (preservative). DailyMed had no SPL. Target search did not open a priced 59-dose B-12 liquid card. CVS returned 403. Walgreens opened Vitamin B-12 5000 mcg, Liquid, 2 oz, 59 doses, at $21.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 59-dose listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-b2-100',
    productName: "Nature's Bounty Vitamin B-2 (Riboflavin) 100 mg (100 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-b2-100',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312006401',
    activeIngredients: [{ name: 'Riboflavin (Vitamin B-2)', strength: '100 mg per tablet' }],
    inactiveIngredients: [
flag(B2_PANEL, 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag(B2_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(B2_PANEL, 'Silica', 'limited', METH.silica),
      flag(B2_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page b-2-100-mg-100-tablets was read. Serving size 1 tablet. Servings per container 100. Other ingredients: dicalcium phosphate, vegetable cellulose. Contains <2% of: silica, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 100-count B-2 tablet card. CVS returned 403. Walgreens opened Vitamin B-2 (Riboflavin), 100 mg, Tablets, 100 ea, at $11.49 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 100-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-b6-100',
    productName: "Nature's Bounty Vitamin B-6 100 mg (100 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-b6-100',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312006500',
    activeIngredients: [{ name: 'Vitamin B-6 (pyridoxine hydrochloride)', strength: '100 mg per tablet' }],
    inactiveIngredients: [
flag(B6_PANEL, 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag(B6_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(B6_PANEL, 'Silica', 'limited', METH.silica),
      flag(B6_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(B6_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page b-6-100-mg-100-tablets was read. Serving size 1 tablet. Servings per container 100. Other ingredients: dicalcium phosphate, vegetable cellulose, silica. Contains <2% of: vegetable magnesium stearate, vegetable stearic acid. DailyMed had no SPL. Target search did not open a priced 100-count B-6 tablet card. CVS returned 403. Walgreens opened Vitamin B-6, 100 mg, Tablets, 100 ea, at $11.49 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 100-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-melatonin-bilayer-60',
    productName: "Nature's Bounty Dual Spectrum Melatonin 5 mg (60 bi-layer tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-melatonin-bilayer',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312530982',
    activeIngredients: [{ name: 'Melatonin', strength: '5 mg per tablet' }],
    inactiveIngredients: [
flag(MELATONIN_PANEL, 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag(MELATONIN_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(MELATONIN_PANEL, 'Silica', 'limited', METH.silica),
      flag(MELATONIN_PANEL, 'Triacetin', 'cleared', METH.triacetin),
      flag(MELATONIN_PANEL, 'Vegetable Juice Color', 'cleared', METH.juiceColor),
      flag(MELATONIN_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(MELATONIN_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page bi-layer-melatonin-5-mg-60-bi-layer-tablets was read. Serving size 1 tablet. Servings per container 60. Other ingredients: dicalcium phosphate, vegetable cellulose. Contains <2% of: silica, triacetin, vegetable juice color, vegetable magnesium stearate, vegetable stearic acid. DailyMed had no SPL. Target search did not open a priced 60-count Dual Spectrum Melatonin card. CVS returned 403. Walgreens opened Dual Spectrum Melatonin Bi-Layer Tablets, 5 mg, 60 ea, at $14.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 60-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-biotin-10000-120',
    productName: "Nature's Bounty Biotin 10,000 mcg (120 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-biotin-softgel-tio2',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312516979',
    activeIngredients: [{ name: 'Biotin (d-biotin)', strength: '10,000 mcg per softgel' }],
    inactiveIngredients: [
flag(BIOTIN_SOFTGEL_PANEL, 'Soybean Oil', 'cleared', METH.soyFill),
      flag(BIOTIN_SOFTGEL_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(BIOTIN_SOFTGEL_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag(BIOTIN_SOFTGEL_PANEL, 'Yellow Beeswax', 'cleared', METH.beeswax),
      flag(BIOTIN_SOFTGEL_PANEL, 'Titanium Dioxide Color', 'high', METH.tio2),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page biotin-10000-mcg-120-rapid-release-softgels was read. Serving size 1 softgel. Servings per container 120. Other ingredients: soybean oil, gelatin, vegetable glycerin, yellow beeswax, titanium dioxide color. DailyMed had no SPL. Target search did not open a priced 120-count 10,000 mcg biotin softgel card. CVS returned 403. Walgreens opened Biotin 10,000 mcg Rapid Release Softgels, 120 ea, at $24.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 120-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-biotin-1000-100',
    productName: "Nature's Bounty Biotin 1,000 mcg (100 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-biotin-1000-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312079610',
    activeIngredients: [{ name: 'Biotin (d-biotin)', strength: '1,000 mcg per tablet' }],
    inactiveIngredients: [
flag(BIOTIN_1000_PANEL, 'Calcium Carbonate', 'cleared', METH.calciumCarbonate),
      flag(BIOTIN_1000_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(BIOTIN_1000_PANEL, 'Silica', 'limited', METH.silica),
      flag(BIOTIN_1000_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page biotin-1000-mcg-100-tablets was read. Serving size 1 tablet. Servings per container 100. Other ingredients: calcium carbonate, vegetable cellulose, silica, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 100-count 1,000 mcg biotin tablet card. CVS returned 403. Walgreens opened Biotin, 1000 mcg, Tablets, 100 ea, at $9.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 100-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-biotin-5000-150',
    productName: "Nature's Bounty Biotin 5,000 mcg (150 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-biotin-softgel-tio2',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312296192',
    activeIngredients: [{ name: 'Biotin (d-biotin)', strength: '5,000 mcg per softgel' }],
    inactiveIngredients: [
flag(BIOTIN_5000_150_PANEL, 'Soybean Oil', 'cleared', METH.soyFill),
      flag(BIOTIN_5000_150_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(BIOTIN_5000_150_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag(BIOTIN_5000_150_PANEL, 'Yellow Beeswax', 'cleared', METH.beeswax),
      flag(BIOTIN_5000_150_PANEL, 'Titanium Dioxide Color', 'high', METH.tio2),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page biotin-5000-mcg-150-rapid-release-softgels was read. Serving size 1 softgel. Servings per container 150. Other ingredients: soybean oil, gelatin, vegetable glycerin, yellow beeswax, titanium dioxide color. Same inactive line as the 10,000 mcg and 72-count biotin softgels on this batch. DailyMed had no SPL. Target search did not open a priced 150-count 5,000 mcg biotin softgel card. CVS returned 403. Walgreens opened Biotin 5000 mcg Rapid Release Softgels, 150 ea, at $24.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 150-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-biotin-5000-72',
    productName: "Nature's Bounty Biotin 5,000 mcg (72 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-biotin-softgel-tio2',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312134302',
    activeIngredients: [{ name: 'Biotin (d-biotin)', strength: '5,000 mcg per softgel' }],
    inactiveIngredients: [
flag(BIOTIN_5000_72_PANEL, 'Soybean Oil', 'cleared', METH.soyFill),
      flag(BIOTIN_5000_72_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(BIOTIN_5000_72_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag(BIOTIN_5000_72_PANEL, 'Yellow Beeswax', 'cleared', METH.beeswax),
      flag(BIOTIN_5000_72_PANEL, 'Titanium Dioxide Color', 'high', METH.tio2),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page biotin-5000-mcg-72-capsules was read. Serving size 1 softgel. Servings per container 72. Other ingredients: soybean oil, gelatin, vegetable glycerin, yellow beeswax, titanium dioxide color. Same inactive line as the other biotin softgels on this batch. DailyMed had no SPL. Target search did not open a priced 72-count 5,000 mcg biotin softgel card. CVS returned 403. Walgreens opened Biotin 5000 mcg Rapid Release Softgels, 72 ea, at $14.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 72-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-black-cohosh-100',
    productName: "Nature's Bounty Black Cohosh 450 mg (100 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-black-cohosh',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312335112',
    activeIngredients: [{ name: 'Black Cohosh (Actaea racemosa) (root)', strength: '450 mg per capsule' }],
    inactiveIngredients: [
flag(BLACK_COHOSH_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(BLACK_COHOSH_PANEL, 'Silica', 'limited', METH.silica),
      flag(BLACK_COHOSH_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page black-cohosh-450-mg-100-capsules was read. Serving size 1 capsule. Servings per container 100. Other ingredients: gelatin. Contains <2% of: silica, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 100-count black cohosh card. CVS returned 403. Walgreens opened Black Cohosh 450 mg, Capsules, 100 ea, at $14.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 100-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-calcium-mag-zinc-100',
    productName: "Nature's Bounty Calcium Magnesium Zinc (100 coated caplets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-calcium-mag-zinc',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312042904',
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '600 IU per 3 caplets' },
      { name: 'Calcium', strength: '1,000 mg per 3 caplets' },
      { name: 'Magnesium', strength: '400 mg per 3 caplets' },
      { name: 'Zinc', strength: '25 mg per 3 caplets' },
    ],
    inactiveIngredients: [
flag(CAL_MAG_ZINC_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(CAL_MAG_ZINC_PANEL, 'Titanium Dioxide Color', 'high', METH.tio2),
      flag(CAL_MAG_ZINC_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page calcium-magnesium-zinc-100-coated-tablets was read. Serving size 3 caplets. Servings per container 33, which is 100 coated caplets. Other ingredients: vegetable cellulose. Contains <2% of: titanium dioxide color, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 100-count calcium magnesium zinc caplet card. CVS returned 403. Walgreens opened Calcium Magnesium Zinc Coated Caplets, 100 ea, at $9.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 100-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-calcium-d3-300',
    productName: "Nature's Bounty Calcium Plus Vitamin D3 500 mg (300 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-calcium-d3-300',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312070877',
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '400 IU per tablet' },
      { name: 'Calcium (from oyster shell)', strength: '500 mg per tablet' },
    ],
    inactiveIngredients: [
flag(CALCIUM_D3_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(CALCIUM_D3_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'clean',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page calcium-plus-vitamin-d3-500-mg-300-tablets was read. Serving size 1 tablet. Servings per container 300. Other ingredients: vegetable cellulose, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 300-count calcium 500 mg plus D3 tablet card. CVS returned 403. Walgreens opened Calcium 500 mg Plus Vitamin D3, Tablets, 300 ea, at $18.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 300-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-acidophilus-wafer-100',
    productName: "Nature's Bounty Chewable Acidophilus with Bifidus (100 wafers)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-acidophilus-wafer',
    audience: ADULT,
    minAge: 18,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312057212',
    activeIngredients: [{ name: 'Lactobacillus acidophilus and Bifidobacterium lactis blend', strength: '5 mg per wafer (1 billion active cultures at time of manufacture)' }],
    inactiveIngredients: [
flag(ACIDOPHILUS_PANEL, 'Sucrose', 'limited', METH.sucrose),
      flag(ACIDOPHILUS_PANEL, 'Fructose', 'limited', METH.fructose),
      flag(ACIDOPHILUS_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(ACIDOPHILUS_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
      flag(ACIDOPHILUS_PANEL, 'Citric Acid', 'cleared', METH.citric),
      flag(ACIDOPHILUS_PANEL, 'Natural Flavors', 'limited', METH.flavor),
      flag(ACIDOPHILUS_PANEL, 'Silica', 'limited', METH.silica),
      flag(ACIDOPHILUS_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page chewable-acidophilus-with-bifidus-100-wafer was read. Serving size 1 wafer. Servings per container 100. Other ingredients: sucrose, fructose, vegetable cellulose, vegetable stearic acid. Contains <2% of: citric acid, natural flavors, silica, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 100-count acidophilus wafer card. CVS returned 403. Walgreens opened Acidophilus Probiotic Strawberry Chewable Wafers, 100 ea, at $14.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 100-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-fish-oil-145',
    productName: "Nature's Bounty Fish Oil 1,000 mg (145 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-fish-oil-145',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312038228',
    activeIngredients: [{ name: 'Fish Oil', strength: '1,000 mg (1 g) per softgel (300 mg total omega-3 fatty acids)' }],
    inactiveIngredients: [
flag(FISH_OIL_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(FISH_OIL_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag(FISH_OIL_PANEL, 'Mixed Natural Tocopherols', 'cleared', METH.tocopherol),
    ],
    verdict: 'clean',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page fish-oil-1000-mg-145-rapid-release-softgels was read. Serving size 1 softgel. Servings per container 145. Other ingredients: gelatin, vegetable glycerin, mixed natural tocopherols. DailyMed had no SPL. Target search did not open a priced 145-count fish oil 1,000 mg softgel card. CVS returned 403. Walgreens opened Fish Oil 1000 mg Rapid Release Softgels, 145 ea, at $16.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 145-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-cinnamon-100',
    productName: "Nature's Bounty Cinnamon 1,000 mg (100 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-cinnamon-100',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312140204',
    activeIngredients: [{ name: 'Cinnamon (Cinnamomum burmannii) (bark)', strength: '1,000 mg per 2 capsules' }],
    inactiveIngredients: [
flag(CINNAMON_100_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(CINNAMON_100_PANEL, 'Silica', 'limited', METH.silica),
      flag(CINNAMON_100_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page cinnamon-1000-mg-100-capsules was read. Serving size 2 capsules. Servings per container 50, which is 100 capsules. Other ingredients: gelatin. Contains <2% of: silica, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 100-count cinnamon capsule card. CVS returned 403. Walgreens opened Cinnamon 1000 mg, Capsules, 100 ea, at $9.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 100-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-cinnamon-chromium-60',
    productName: "Nature's Bounty Cinnamon Plus Chromium (60 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-cinnamon-chromium',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312150616',
    activeIngredients: [
      { name: 'Chromium (chromium picolinate)', strength: '400 mcg per 2 capsules' },
      { name: 'Cinnamon (bark) plus cinnamon extract', strength: '2,000 mg cinnamon activity per 2 capsules' },
    ],
    inactiveIngredients: [
flag(CINNAMON_CHROMIUM_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(CINNAMON_CHROMIUM_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(CINNAMON_CHROMIUM_PANEL, 'Silica', 'limited', METH.silica),
      flag(CINNAMON_CHROMIUM_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page cinnamon-2000-plus-chromium-400-mcg-60-capsules was read. Serving size 2 capsules. Servings per container 30, which is 60 capsules. Other ingredients: gelatin, vegetable cellulose. Contains <2% of: silica, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 60-count cinnamon plus chromium card. CVS returned 403. Walgreens opened Cinnamon 2000 mg Plus Chromium, Capsules, 60 ea, at $9.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 60-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-cla-50',
    productName: "Nature's Bounty CLA Tonalin 1,000 mg (50 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-cla-50',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312051630',
    activeIngredients: [{ name: 'Tonalin CLA (from safflower oil)', strength: '2,000 mg (2 g) per 2 softgels' }],
    inactiveIngredients: [
flag(CLA_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(CLA_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag(CLA_PANEL, 'Natural Caramel Color', 'high', METH.caramel),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page cla-1000-mg-50-rapid-release-softgels was read. Serving size 2 softgels. Servings per container 25, which is 50 softgels. Other ingredients: gelatin, vegetable glycerin, natural caramel color. DailyMed had no SPL. Target search did not open a priced 50-count CLA softgel card. CVS returned 403. Walgreens opened CLA Tonalin 1000 mg Rapid Release Softgels, 50 ea, at $19.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 50-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-probiotic-cd-30',
    productName: "Nature's Bounty Optimal Solutions Controlled Delivery Probiotic (30 caplets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-controlled-delivery-probiotic',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312515200',
    activeIngredients: [{ name: 'Bio-Active Probiotic Complex', strength: '2 billion CFUs per caplet' }],
    inactiveIngredients: [
flag(PROBIOTIC_CD_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(PROBIOTIC_CD_PANEL, 'Pectin', 'cleared', METH.pectin),
      flag(PROBIOTIC_CD_PANEL, 'Sodium Carbonate', 'cleared', METH.sodiumCarbonate),
      flag(PROBIOTIC_CD_PANEL, 'Guar Gum', 'cleared', METH.guar),
      flag(PROBIOTIC_CD_PANEL, 'Turmeric (Color)', 'cleared', METH.turmeric),
      flag(PROBIOTIC_CD_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    ],
    verdict: 'clean',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page controlled-delivery-probiotic-30-caplets was read. Serving size 1 caplet. Servings per container 30. Other ingredients: vegetable cellulose, pectin, sodium carbonate. Contains <2% of: guar gum, turmeric (color), vegetable stearic acid. DailyMed had no SPL. Target search did not open a priced 30-count Controlled Delivery Probiotic card. CVS returned 403. Walgreens opened Optimal Solutions Controlled Delivery Probiotic, 30 ea, at $19.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 30-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-probiotic-cd30',
    productName: "Nature's Bounty Controlled Delivery Probiotic CD (30 caplets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-probiotic-cd',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312549984',
    activeIngredients: [{ name: 'Bio-Active Probiotic Complex', strength: '2 billion CFUs per caplet' }],
    inactiveIngredients: [
flag(PROBIOTIC_CD30_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(PROBIOTIC_CD30_PANEL, 'Pectin', 'cleared', METH.pectin),
      flag(PROBIOTIC_CD30_PANEL, 'Sodium Carbonate', 'cleared', METH.sodiumCarbonate),
      flag(PROBIOTIC_CD30_PANEL, 'Guar Gum', 'cleared', METH.guar),
      flag(PROBIOTIC_CD30_PANEL, 'Turmeric (Color)', 'cleared', METH.turmeric),
      flag(PROBIOTIC_CD30_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    ],
    verdict: 'clean',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page controlled-delivery-probiotic-cd-30-caplets was read. Serving size 1 caplet. Servings per container 30. Other ingredients: vegetable cellulose, pectin, sodium carbonate. Contains <2% of: guar gum, turmeric (color), vegetable stearic acid. Same inactive line as the Optimal Solutions Controlled Delivery Probiotic 30-count just read; this row uses a separate formulaId for the Probiotic CD handle. DailyMed had no SPL. Target search did not open a priced 30-count Probiotic CD card. CVS returned 403. Walgreens opened Controlled Delivery Probiotic CD, 30 ea, at $19.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 30-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-coq10-100-45',
    productName: "Nature's Bounty Co Q-10 100 mg (45 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-coq10-100-45',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312048869',
    activeIngredients: [{ name: 'Coenzyme Q-10 (Q-Sorb)', strength: '100 mg per softgel' }],
    inactiveIngredients: [
flag(COQ10_45_PANEL, 'Rice Bran Oil', 'cleared', METH.riceBranFill),
      flag(COQ10_45_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(COQ10_45_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag(COQ10_45_PANEL, 'Soy Lecithin', 'cleared', METH.soyLecithin),
      flag(COQ10_45_PANEL, 'Titanium Dioxide Color', 'high', METH.tio2),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page co-q-10-100-mg-45-rapid-release-softgels was read. Serving size 1 softgel. Servings per container 45. Other ingredients: rice bran oil, gelatin, vegetable glycerin. Contains <2% of: soy lecithin, titanium dioxide color. DailyMed had no SPL. Target search did not open a priced 45-count Co Q-10 100 mg softgel card. CVS returned 403. Walgreens opened Co Q-10 100 mg Rapid Release Softgels, 45 ea, at $19.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 45-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b193-triple-absorb-coq10-90',
    productName: "Nature's Bounty Advanced Triple Absorb Co Q-10 (90 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b193-triple-absorb-coq10-90',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312011269',
    activeIngredients: [{ name: 'Coenzyme Q-10', strength: '100 mg per softgel' }],
    inactiveIngredients: [
flag(TRIPLE_COQ10_PANEL, 'Lime Oil', 'cleared', METH.limeOil),
      flag(TRIPLE_COQ10_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(TRIPLE_COQ10_PANEL, 'Castor Oil', 'cleared', METH.castor),
      flag(TRIPLE_COQ10_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag(TRIPLE_COQ10_PANEL, 'Polyethylene Glycol', 'moderate', METH.peg),
      flag(TRIPLE_COQ10_PANEL, 'Coconut Oil', 'cleared', METH.coconutFill),
      flag(TRIPLE_COQ10_PANEL, 'Olive Oil', 'cleared', METH.oliveFill),
      flag(TRIPLE_COQ10_PANEL, 'Annatto (Color)', 'limited', METH.annatto),
      flag(TRIPLE_COQ10_PANEL, 'Lecithin', 'cleared', METH.lecithin),
      flag(TRIPLE_COQ10_PANEL, 'Oat Oil', 'cleared', METH.oatOil),
      flag(TRIPLE_COQ10_PANEL, 'Vitamin E Acetate', 'cleared', METH.vitEAcetate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page advanced-triple-absorb-coq10 was read. Serving size 1 softgel. Servings per container 90. The supplement facts header on the page still says Gummies, but the pack is 90 softgels. Other ingredients: lime oil, gelatin, castor oil, vegetable glycerin, polyethylene glycol, coconut oil, olive oil. Contains <2% of: annatto (color), lecithin, oat oil, vitamin E acetate. DailyMed had no SPL. Target search did not open a priced 90-count Advanced Triple Absorb Co Q-10 card. CVS returned 403. Walgreens opened Advanced Triple Absorb Co Q-10 100 mg Softgels, 90 ea, at $39.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 90-count listing that was opened.",
    ],
  },
];

const ROWS = BATCH193_KYR6C_NB_TWENTY;

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

if (ROWS.length !== 21) throw new Error(`batch193 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch193 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch193 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch193 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch193 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch193 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch193 verdict ${record.id}`);
}
