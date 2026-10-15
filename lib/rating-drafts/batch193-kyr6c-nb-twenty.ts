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
  oatOil:
    'Methodology §5 Cleared (oat oil as softgel or capsule fill). Same form split as sunflower oil and rice bran oil. Locked Oct 15, 2026.',
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
    retailers: ['Walgreens', 'Target', 'Amazon'],
    sourcesGeneral: [
      "Opened https://naturesbounty.com/products/b-12-1000-mcg-200-tablets — Serving size 1 Tablet. Servings per container / count: 200 (servings per container on panel). Other ingredients quote: Dicalcium Phosphate, Vegetable Cellulose, Vegetable Stearic Acid. Contains <2% of: Natural Palm Leaf Glaze, Silica, Vegetable Magnesium Stearate.. Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-5280-57 — HTTP 200, data[] empty (no SPL for NDC 74312-5280-57). Opened https://www.target.com/p/nature-39-s-bounty-vitamin-b-12-1000mcg-tablets-200ct/-/A-94911192 — title Nature's Bounty Vitamin B-12 1000mcg Tablets - 200ct; Pickup/Delivery shown (price not in fetch extract). Opened https://www.cvs.com/search?searchTerm=074312528057 — BLOCKED HTTP 403 Access Denied. Opened https://www.walgreens.com/store/c/productlist/nature's-bounty-vitamin-b/N=361637-2712 — Nature's Bounty Vitamin B-12 1000mcg Tablets, Value Size - 200 ea at $24.99 with Add to cart, Shipping Available. Opened https://www.amazon.com/Natures-Bounty-Supplement-Supports-Metabolism/dp/B00DYSUQR2 — 200 Count, UPC 074312528057, $9.97, In Stock, sold by Amazon.com. Opened https://www.walmart.com/search?q=074312528057 — BLOCKED HTTP 200 (robot check / forbidden). Opened https://www.google.com/search?q=074312528057+Nature%27s+Bounty+B-12+200 — Google Search (minimal body); corroborating sale page opened: https://www.amazon.com/Natures-Bounty-Supplement-Supports-Metabolism/dp/B00DYSUQR2.",
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
      "Opened https://naturesbounty.com/products/b-12-5000-mcg-2-oz-liquid — Serving size 1 mL. Servings per container / count: 59 (servings per container on panel). Other ingredients quote: Purified Water, Sorbitol, Vegetable Glycerin, Natural Berry Flavor, Citric Acid, Potassium Sorbate (preservative).. Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-1818-70 — HTTP 200, data[] empty (no SPL for NDC 74312-1818-70). Opened https://www.target.com/s?searchTerm=nature%27s+bounty+b12+5000+liquid — search results did not surface a priced 59-dose / 2 fl oz PDP. Opened https://www.cvs.com/search?searchTerm=074312181870 — BLOCKED HTTP 403 Access Denied. Opened https://www.walgreens.com/store/c/productlist/nature's-bounty-vitamin-b/N=361637-2712 — Nature's Bounty B-12 5000 mcg Dietary Supplement Liquid Berry - 2 fl oz at $19.99 with Add to cart and Shipping Available (59 doses per brand panel). Opened https://www.amazon.com/Natures-Bounty-Super-Strength-B-12/dp/B00TDFGJK8 — UPC 074312181870, 2 Fluid Ounces; fetch showed no featured offer price / buy box. Opened https://www.walmart.com/search?q=074312181870 — BLOCKED HTTP 200 (robot check / forbidden). Opened https://www.google.com/search?q=074312181870+Nature%27s+Bounty+B-12+liquid — minimal content; corroborating page: https://www.amazon.com/Natures-Bounty-Super-Strength-B-12/dp/B00TDFGJK8.",
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
    retailers: ['Walgreens', 'Target'],
    sourcesGeneral: [
      "Opened https://naturesbounty.com/products/biotin-10000-mcg-120-rapid-release-softgels — Serving size 1 Softgel. Servings per container / count: 120 (servings per container on panel). Other ingredients quote: Soybean Oil, Gelatin, Vegetable Glycerin, Yellow Beeswax, Titanium Dioxide Color.. Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-5169-79 — HTTP 200, data[] empty (no SPL for NDC 74312-5169-79). Opened https://www.target.com/p/nature-39-s-bounty-biotin-10000mcg-dietary-supplement-softgels-120ct/-/A-94911185 — 120ct title, Pickup/Delivery (price not in fetch extract). Opened https://www.cvs.com/search?searchTerm=074312516979 — BLOCKED HTTP 403 Access Denied. Opened https://www.walgreens.com/store/c/productlist/nature's-bounty-vitamin-b/N=361637-2712 — Ultra Strength Biotin 10,000mcg Softgels - 120 ea at $19.99 with Add to cart. Opened https://www.amazon.com/s?k=074312516979 — HTTP 200 search page via curl; no product card parsed in automated fetch. Opened https://www.walmart.com/search?q=074312516979 — BLOCKED HTTP 200 (robot check / forbidden). Opened https://www.google.com/search?q=074312516979+biotin+120 — minimal content; corroborating page: https://www.target.com/p/nature-39-s-bounty-biotin-10000mcg-dietary-supplement-softgels-120ct/-/A-94911185.",
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
      "Opened https://naturesbounty.com/products/biotin-5000-mcg-150-rapid-release-softgels — Serving size 1 Softgel. Servings per container / count: 150 (servings per container on panel). Other ingredients quote: Soybean Oil, Gelatin, Vegetable Glycerin, Yellow Beeswax, Titanium Dioxide Color.. Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-2961-92 — HTTP 200, data[] empty (no SPL for NDC 74312-2961-92). Opened https://www.target.com/s?searchTerm=nature%27s+bounty+biotin+5000+150 — no 150-count PDP with price in fetch. Opened https://www.cvs.com/search?searchTerm=074312296192 — BLOCKED HTTP 403 Access Denied. Opened https://www.walgreens.com/store/c/productlist/nature's-bounty-biotin/N=20001151-2712 — Biotin Softgels, 5000 mcg Value Size - 150 ea at $29.99 with Add to cart and Shipping Available. Opened https://www.amazon.com/s?k=074312296192 — HTTP 200 search; no parsed buy box this pass. Opened https://www.walmart.com/search?q=074312296192 — BLOCKED HTTP 200 (robot check / forbidden). Opened https://www.google.com/search?q=074312296192+biotin+150 — minimal content; corroborating page: https://www.walgreens.com/store/c/productlist/nature's-bounty-biotin/N=20001151-2712.",
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
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Opened https://naturesbounty.com/products/biotin-5000-mcg-72-capsules — Serving size 1 softgel. Servings per container / count: 72 (servings per container on panel). Other ingredients quote: Soybean Oil, Gelatin, Vegetable Glycerin, Yellow Beeswax, Titanium Dioxide Color.. Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-1343-02 — HTTP 200, data[] empty (no SPL for NDC 74312-1343-02). Opened https://www.target.com/s?searchTerm=nature%27s+bounty+biotin+5000+72 — no 72-count PDP with price in fetch. Opened https://www.cvs.com/search?searchTerm=074312134302 — BLOCKED HTTP 403 Access Denied. Opened https://www.walgreens.com/store/c/productlist/vitamin-b7-biotin-hair,-skin-&-nails-supplements/N=361599-100079501 — no 72-count Biotin 5000 mcg card; 60 ea and 120 ea biotin lines only. Opened https://www.amazon.com/Natures-Bounty-Biotin-000-Caps/dp/B00DU7G2WK — 72 ct, $7.89, In Stock (3P seller My Great Goods). Opened https://www.walmart.com/search?q=074312134302 — BLOCKED HTTP 200 (robot check / forbidden). Opened https://www.google.com/search?q=074312134302+biotin+72 — minimal content; corroborating page: https://www.amazon.com/Natures-Bounty-Biotin-000-Caps/dp/B00DU7G2WK.",
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
      "Opened https://naturesbounty.com/products/calcium-plus-vitamin-d3-500-mg-300-tablets — Serving size 1 Tablet. Servings per container / count: 300 (servings per container on panel). Other ingredients quote: Vegetable Cellulose, Vegetable Magnesium Stearate. Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-0708-77 — HTTP 200, data[] empty (no SPL for NDC 74312-0708-77). Opened https://www.target.com/s?searchTerm=nature%27s+bounty+calcium+500+d3+300 — no Nature's Bounty 300-tablet PDP (Nature Made/other brands only). Opened https://www.cvs.com/search?searchTerm=074312070877 — BLOCKED HTTP 403 Access Denied. Opened https://www.walgreens.com/search/tier3/productlist/N=2712-2000012663-2000011156 — Calcium 500mg with Vitamin D3, Tablets - 300 ea at $16.99 with Add for delivery. Opened https://www.amazon.com/s?k=074312070877 — HTTP 200 search; no parsed buy box. Opened https://www.walmart.com/search?q=074312070877 — BLOCKED HTTP 200 (robot check / forbidden). Opened https://www.google.com/search?q=074312070877+calcium+300 — minimal content; corroborating page: https://www.walgreens.com/search/tier3/productlist/N=2712-2000012663-2000011156.",
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
    retailers: ['Walgreens', 'Amazon'],
    sourcesGeneral: [
      "Opened https://naturesbounty.com/products/fish-oil-1000-mg-145-rapid-release-softgels — Serving size 1 Softgel. Servings per container / count: 145 (servings per container on panel). Other ingredients quote: Gelatin, Vegetable Glycerin, Mixed Natural Tocopherols.. Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-0382-28 — HTTP 200, data[] empty (no SPL for NDC 74312-0382-28). Opened https://www.target.com/s?searchTerm=nature%27s+bounty+fish+oil+145 — no 145-count 1000 mg PDP (2400 mg 90ct only). Opened https://www.cvs.com/search?searchTerm=074312038228 — BLOCKED HTTP 403 Access Denied. Opened https://www.walgreens.com/store/c/productlist/nature's-bounty-fish-oil/N=361759-2712 — Fish Oil With Omega 3 Softgels, 1000 mg - 145 ea at $22.99 with Add to cart and Shipping Available. Opened https://www.amazon.com/Natures-Bounty-Fish-Omega-3-Count/dp/B0777M3GD7 — 145 Count, UPC 074312038228, $10.32, In Stock. Opened https://www.walmart.com/search?q=074312038228 — BLOCKED HTTP 200 (robot check / forbidden). Opened https://www.google.com/search?q=074312038228+fish+oil+145 — minimal content; corroborating page: https://www.amazon.com/Natures-Bounty-Fish-Omega-3-Count/dp/B0777M3GD7.",
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
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Opened https://naturesbounty.com/products/co-q-10-100-mg-45-rapid-release-softgels — Serving size 1 Softgel. Servings per container / count: 45 (servings per container on panel). Other ingredients quote: Rice Bran Oil, Gelatin, Vegetable Glycerin. Contains <2% of: Soy Lecithin, Titanium Dioxide Color.. Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-0488-69 — HTTP 200, data[] empty (no SPL for NDC 74312-0488-69). Opened https://www.target.com/s?searchTerm=nature%27s+bounty+coq10+45 — no 45-count Co Q-10 PDP with price in fetch. Opened https://www.cvs.com/search?searchTerm=074312048869 — BLOCKED HTTP 403 Access Denied. Opened https://www.walgreens.com/store/c/productlist/nature's-bounty-coq10/N=361731-2712 — CoQ10 Softgels 100 mg - 75 ea only; no 45 ea card. Opened https://www.amazon.com/dp/B01GQCR13O — 45 Count, UPC 074312048869, $14.09, Only 16 left in stock - order soon. Opened https://www.walmart.com/search?q=074312048869 — BLOCKED HTTP 200 (robot check / forbidden). Opened https://www.google.com/search?q=074312048869+coq10+45 — minimal content; corroborating page: https://www.amazon.com/dp/B01GQCR13O.",
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

if (ROWS.length !== 8) throw new Error(`batch193 row count ${ROWS.length}`);
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
