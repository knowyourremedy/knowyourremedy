// DRAFT / not verified / batch 198 KYR6-c (t76u WRITE).
// Nature's Bounty held ladder packs (t76u). Actives listed without grades; row verdict from other ingredients only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax / white beeswax).',
  caramel: 'Methodology §5 Caramel color, UNDISCLOSED CLASS — LOCKED (v1.6). Natural Caramel Color does not state Class I/II.',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  lecithin: 'Methodology §5 Cleared (lecithin / soy lecithin).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin / organic maltodextrin).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  mctUnlabeled:
    'Methodology §5 Unlabeled MCT — LOCKED (Limited). Medium Chain Triglycerides with no plant source named on the panel; not the Sept 16 named-MCT Cleared fill row.',
  palmLeafGlaze: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  riceFlour: 'Methodology §5 Limited (rice flour — exact token; distinct from Cleared rice-hull family).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

export const BATCH198_KYR6C_NB_T76U: RatingRecord[] = [
  {
    id: 'natures-bounty-b198-ginkgo-60-200',
    productName: 'Nature\'s Bounty Ginkgo Biloba 60 mg (200 capsules)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-ginkgo-60-200',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312172434',
    activeIngredients: [
      { name: 'Ginkgo Biloba Extract (Ginkgo biloba) (leaf) (Standardized to contain 24% Ginkgo Flavone Glycosides and 6% Terpene Lactones)', strength: '60 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/ginkgo-biloba-60-mg-200-capsules', 'Rice Flour', 'limited', METH.riceFlour),
      flag('https://naturesbounty.com/products/ginkgo-biloba-60-mg-200-capsules', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/ginkgo-biloba-60-mg-200-capsules', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2172-43 — HTTP 200, data[] empty for NDC 07431-2172-43. Opened https://naturesbounty.com/products/ginkgo-biloba-60-mg-200-capsules — Supplement Facts and other ingredients read for t76u (UPC 074312172434). Other ingredients: Rice Flour, Gelatin, Vegetable Magnesium Stearate. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Walmart 48006435 and Meijer 7431217243 (Add).',
    ],
  },
  {
    id: 'natures-bounty-b198-green-tea-315-100',
    productName: 'Nature\'s Bounty Green Tea Extract 315 mg (100 capsules)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-green-tea-315-100',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312331312',
    activeIngredients: [
      { name: 'Green Tea Extract (Camellia sinensis) (leaf) (Standardized to contain 15% polyphenols)', strength: '630 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/green-tea-extract-315-mg-100-capsules', 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag('https://naturesbounty.com/products/green-tea-extract-315-mg-100-capsules', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/green-tea-extract-315-mg-100-capsules', 'Maltodextrin', 'limited', METH.maltodextrin),
      flag('https://naturesbounty.com/products/green-tea-extract-315-mg-100-capsules', 'Silica', 'limited', METH.silica),
      flag('https://naturesbounty.com/products/green-tea-extract-315-mg-100-capsules', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2331-31 — HTTP 200, data[] empty for NDC 07431-2331-31. Opened https://naturesbounty.com/products/green-tea-extract-315-mg-100-capsules — Supplement Facts and other ingredients read for t76u (UPC 074312331312). Other ingredients: Dicalcium Phosphate, Gelatin, Maltodextrin. Contains <2% of: Silica, Vegetable Magnesium Stearate. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Walmart 17324850 (third-party seller, fulfilled by Walmart) and Meijer 7431233131 (Add).',
    ],
  },
  {
    id: 'natures-bounty-b198-magnesium-400-75',
    productName: 'Nature\'s Bounty Magnesium 400 mg (75 softgels)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-magnesium-400-75',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312594083',
    activeIngredients: [
      { name: 'Saturated Fat', strength: '0.5 g per softgel' },
      { name: 'Magnesium (as Magnesium Oxide)', strength: '400 mg per softgel' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/magnesium-400mg-75-rapid-release-softgels', 'Medium Chain Triglycerides', 'limited', METH.mctUnlabeled),
      flag('https://naturesbounty.com/products/magnesium-400mg-75-rapid-release-softgels', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/magnesium-400mg-75-rapid-release-softgels', 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag('https://naturesbounty.com/products/magnesium-400mg-75-rapid-release-softgels', 'Natural Caramel Color', 'high', METH.caramel),
      flag('https://naturesbounty.com/products/magnesium-400mg-75-rapid-release-softgels', 'Soy Lecithin', 'cleared', METH.lecithin),
      flag('https://naturesbounty.com/products/magnesium-400mg-75-rapid-release-softgels', 'Yellow Beeswax', 'cleared', METH.beeswax),
    ],
    verdict: 'avoid',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2594-08 — HTTP 200, data[] empty for NDC 07431-2594-08. Opened https://naturesbounty.com/products/magnesium-400mg-75-rapid-release-softgels — Supplement Facts and other ingredients read for t76u (UPC 074312594083). Other ingredients: Medium Chain Triglycerides, Gelatin, Vegetable Glycerin. Contains <2% of: Natural Caramel Color, Soy Lecithin, Yellow Beeswax. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Walgreens prod6328008 (in stock), Walmart 48006471 (sold by Walmart), Meijer 7431259408 and ShopRite (ADD).',
    ],
  },
  {
    id: 'natures-bounty-b198-evening-primrose-1000-60',
    productName: 'Nature\'s Bounty Evening Primrose Oil 1000 mg (60 softgels)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-evening-primrose-1000-60',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312073731',
    activeIngredients: [
      { name: 'Polyunsaturated Fat', strength: '1 g per softgel' },
      { name: 'Evening Primrose Oil', strength: '1,000 mg (1 g) per softgel' },
      { name: 'Cis-Linoleic Acid (LA)', strength: '730 mg per softgel' },
      { name: 'Gamma-Linolenic Acid (GLA)', strength: '90 mg per softgel' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/evening-primrose-oil-1000-mg-60-rapid-release-softgels', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/evening-primrose-oil-1000-mg-60-rapid-release-softgels', 'Vegetable Glycerin', 'cleared', METH.glycerin),
    ],
    verdict: 'clean',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2073-73 — HTTP 200, data[] empty for NDC 07431-2073-73. Opened https://naturesbounty.com/products/evening-primrose-oil-1000-mg-60-rapid-release-softgels — Supplement Facts and other ingredients read for t76u (UPC 074312073731). Other ingredients: Gelatin, Vegetable Glycerin. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Walmart 17324851 (sold by Walmart) and Meijer 7431207373 (Add).',
    ],
  },
  {
    id: 'natures-bounty-b198-ginseng-complex-75',
    productName: 'Nature\'s Bounty Ginseng Complex Plus Royal Jelly (75 capsules)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-ginseng-complex-75',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312119323',
    activeIngredients: [
      { name: 'Vitamin B-12 (as Cyanocobalamin)', strength: '30 mcg per 2 capsules' },
      { name: 'Panax Ginseng Extract (Panax ginseng) (root) (Standardized to contain 2% ginsenosides, 6 mg)', strength: '300 mg per 2 capsules' },
      { name: 'American Ginseng Extract (Panax quinquefolius) (root) (Standardized to contain 5% ginsenosides, 2.5 mg)', strength: '50 mg per 2 capsules' },
      { name: 'Chinese Red Ginseng Extract (Panax ginseng) (root) (Standardized to contain 2% ginsenosides, 1 mg)', strength: '50 mg per 2 capsules' },
      { name: 'Royal Jelly Concentrate', strength: '2 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/ginseng-complex-plus-royal-jelly-75-capsules', 'Rice Flour', 'limited', METH.riceFlour),
      flag('https://naturesbounty.com/products/ginseng-complex-plus-royal-jelly-75-capsules', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/ginseng-complex-plus-royal-jelly-75-capsules', 'Mannitol', 'limited', METH.mannitol),
      flag('https://naturesbounty.com/products/ginseng-complex-plus-royal-jelly-75-capsules', 'Silica', 'limited', METH.silica),
      flag('https://naturesbounty.com/products/ginseng-complex-plus-royal-jelly-75-capsules', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2119-32 — HTTP 200, data[] empty for NDC 07431-2119-32. Opened https://naturesbounty.com/products/ginseng-complex-plus-royal-jelly-75-capsules — Supplement Facts and other ingredients read for t76u (UPC 074312119323). Other ingredients: Rice Flour, Gelatin. Contains <2% of: Mannitol, Silica, Vegetable Magnesium Stearate. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Walgreens prod1177961 (75, in stock) and Meijer 7431211932 (Add).',
    ],
  },
  {
    id: 'natures-bounty-b198-hair-growth-30',
    productName: 'Nature\'s Bounty Hair Growth (30 capsules)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-hair-growth-30',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312012518',
    activeIngredients: [
      { name: 'Biotin (from Advanced Hair Complex)', strength: '10,000 mcg per capsule' },
      { name: 'Advanced Hair Complex (Arginine Silicate Inositol (Providing 10 mg Silicon), Magnesium Biotinate)', strength: '160 mg per capsule' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/hair-growth', 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag('https://naturesbounty.com/products/hair-growth', 'Vegetable Stearic Acid', 'cleared', METH.stearic),
      flag('https://naturesbounty.com/products/hair-growth', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag('https://naturesbounty.com/products/hair-growth', 'Silica', 'limited', METH.silica),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2012-51 — HTTP 200, data[] empty for NDC 07431-2012-51. Opened https://naturesbounty.com/products/hair-growth — Supplement Facts and other ingredients read for t76u (UPC 074312012518). Other ingredients: Vegetable Cellulose, Vegetable Stearic Acid, Vegetable Magnesium Stearate, Silica. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Target A-94911189, Meijer, Kroger pickup and ShopRite (ADD).',
    ],
  },
  {
    id: 'natures-bounty-b198-hsn-biotin-3000-60',
    productName: 'Nature\'s Bounty Hair, Skin & Nails 3,000 mcg Biotin (60 coated caplets)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-hsn-biotin-3000-60',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312075803',
    activeIngredients: [
      { name: 'Vitamin A (as Beta Carotene and Vitamin A Acetate)', strength: '1,500 mcg per 3 caplets' },
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '60 mg per 3 caplets' },
      { name: 'Vitamin D (as D3 Cholecalciferol)', strength: '25 mcg (1,000 IU) per 3 caplets' },
      { name: 'Vitamin E (as dl-Alpha Tocopheryl Acetate)', strength: '6.7 mg per 3 caplets' },
      { name: 'Thiamin (Vitamin B-1) (as Thiamin Hydrochloride)', strength: '5 mg per 3 caplets' },
      { name: 'Riboflavin (Vitamin B-2)', strength: '2 mg per 3 caplets' },
      { name: 'Niacin (as Niacinamide)', strength: '25 mg per 3 caplets' },
      { name: 'Vitamin B-6 (as Pyridoxine Hydrochloride)', strength: '5 mg per 3 caplets' },
      { name: 'Folate', strength: '333 mcg DFE (200 mcg folic acid) per 3 caplets' },
      { name: 'Vitamin B-12 (as Cyanocobalamin)', strength: '8 mcg per 3 caplets' },
      { name: 'Biotin (as d-Biotin)', strength: '3,000 mcg per 3 caplets' },
      { name: 'Pantothenic Acid (as d-Calcium Pantothenate)', strength: '15 mg per 3 caplets' },
      { name: 'Calcium (as Dicalcium Phosphate and Calcium Carbonate)', strength: '200 mg per 3 caplets' },
      { name: 'Phosphorus (as Dicalcium Phosphate)', strength: '87 mg per 3 caplets' },
      { name: 'Magnesium (as Magnesium Oxide)', strength: '50 mg per 3 caplets' },
      { name: 'Zinc (as Zinc Gluconate)', strength: '7.5 mg per 3 caplets' },
      { name: 'Manganese (as Manganese Gluconate)', strength: '2 mg per 3 caplets' },
      { name: 'PABA (Para-Aminobenzoic Acid)', strength: '10 mg per 3 caplets' },
      { name: 'Choline Bitartrate', strength: '10 mg per 3 caplets' },
      { name: 'Inositol', strength: '30 mg per 3 caplets' },
      { name: 'Citrus Bioflavonoid / Rutin Complex', strength: '38 mg per 3 caplets' },
      { name: 'Horsetail Powder (Equisetum arvense) (aerial)', strength: '3 mg per 3 caplets' },
      { name: 'Collagen (Hydrolyzed Gelatin)', strength: '50 mg per 3 caplets' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/hair-skin-and-nails-3000-mcg-of-biotin-60-coated-caplets', 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag('https://naturesbounty.com/products/hair-skin-and-nails-3000-mcg-of-biotin-60-coated-caplets', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/hair-skin-and-nails-3000-mcg-of-biotin-60-coated-caplets', 'Mannitol', 'limited', METH.mannitol),
      flag('https://naturesbounty.com/products/hair-skin-and-nails-3000-mcg-of-biotin-60-coated-caplets', 'Natural Palm Leaf Glaze', 'cleared', METH.palmLeafGlaze),
      flag('https://naturesbounty.com/products/hair-skin-and-nails-3000-mcg-of-biotin-60-coated-caplets', 'Silica', 'limited', METH.silica),
      flag('https://naturesbounty.com/products/hair-skin-and-nails-3000-mcg-of-biotin-60-coated-caplets', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2075-80 — HTTP 200, data[] empty for NDC 07431-2075-80. Opened https://naturesbounty.com/products/hair-skin-and-nails-3000-mcg-of-biotin-60-coated-caplets — Supplement Facts and other ingredients read for t76u (UPC 074312075803). Other ingredients: Vegetable Cellulose. Contains <2% of: Gelatin, Mannitol, Natural Palm Leaf Glaze, Silica, Vegetable Magnesium Stearate. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Walgreens prod3209 (in stock), Meijer 7431207580, Kroger pickup and ShopRite (ADD).',
    ],
  },
  {
    id: 'natures-bounty-b198-horny-goat-weed-60',
    productName: 'Nature\'s Bounty Horny Goat Weed with Maca (60 capsules)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-horny-goat-weed-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312073212',
    activeIngredients: [
      { name: 'Horny Goat Weed Extract (Epimedium grandiflorum) (aerial) (Standardized to contain 10% icariin)', strength: '500 mg per 2 capsules' },
      { name: 'Maca Extract (Lepidium meyenii) (root)', strength: '75 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/horny-goat-weed-with-maca-capsules-60-capsules', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/horny-goat-weed-with-maca-capsules-60-capsules', 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag('https://naturesbounty.com/products/horny-goat-weed-with-maca-capsules-60-capsules', 'Silica', 'limited', METH.silica),
      flag('https://naturesbounty.com/products/horny-goat-weed-with-maca-capsules-60-capsules', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2073-21 — HTTP 200, data[] empty for NDC 07431-2073-21. Opened https://naturesbounty.com/products/horny-goat-weed-with-maca-capsules-60-capsules — Supplement Facts and other ingredients read for t76u (UPC 074312073212). Other ingredients: Gelatin, Dicalcium Phosphate. Contains <2% of: Silica, Vegetable Magnesium Stearate. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Walmart 48006431 (third-party seller AmericaRx) and Meijer 7431207321 (Add, pickup).',
    ],
  },
  {
    id: 'natures-bounty-b198-intimacy-booster-60',
    productName: 'Nature\'s Bounty Intimacy Booster (60 capsules)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-intimacy-booster-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312013591',
    activeIngredients: [
      { name: 'Women\'s Passion Blend (KSM-66 Ashwagandha Extract (Withania somnifera) (root), Asian Ginseng Extract (Panax ginseng) (root) (Standardized to contain 8% ginsenosides))', strength: '800 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/intimacy-booster', 'Maltodextrin', 'limited', METH.maltodextrin),
      flag('https://naturesbounty.com/products/intimacy-booster', 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag('https://naturesbounty.com/products/intimacy-booster', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2013-59 — HTTP 200, data[] empty for NDC 07431-2013-59. Opened https://naturesbounty.com/products/intimacy-booster — Supplement Facts and other ingredients read for t76u (UPC 074312013591). Other ingredients: Maltodextrin, Vegetable Cellulose, Vegetable Magnesium Stearate. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Meijer 7431201359 (Add, low stock) and Walgreens 300448071 (ships).',
    ],
  },
  {
    id: 'natures-bounty-b198-probiotic-gx-25',
    productName: 'Nature\'s Bounty Probiotic GX (25 caplets)',
    brand: "Nature's Bounty",
    category: 'Digestive',
    formulaId: 'natures-bounty-b198-probiotic-gx-25',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312552717',
    activeIngredients: [
      { name: 'Lactobacillus plantarum Lp299v (Providing 20 Billion Live Cultures)', strength: '30 mg per caplet' },
      { name: 'Enzyme Blend (Amylase (from Aspergillus oryzae), Lipase (from Aspergillus niger), Protease (from Aspergillus oryzae))', strength: '350 mg per caplet' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/probiotic-gx-caplets-25-caplets', 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag('https://naturesbounty.com/products/probiotic-gx-caplets-25-caplets', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/probiotic-gx-caplets-25-caplets', 'Maltodextrin', 'limited', METH.maltodextrin),
      flag('https://naturesbounty.com/products/probiotic-gx-caplets-25-caplets', 'Silica', 'limited', METH.silica),
      flag('https://naturesbounty.com/products/probiotic-gx-caplets-25-caplets', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2552-71 — HTTP 200, data[] empty for NDC 07431-2552-71. Opened https://naturesbounty.com/products/probiotic-gx-caplets-25-caplets — Supplement Facts and other ingredients read for t76u (UPC 074312552717). Other ingredients: Vegetable Cellulose, Gelatin, Maltodextrin. Contains <2% of: Silica, Vegetable Magnesium Stearate. Label also states: Contains wheat and soy ingredients. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Meijer 7431255271, Kroger pickup and ShopRite (ADD).',
    ],
  },
  {
    id: 'natures-bounty-b198-red-yeast-rice-600-120',
    productName: 'Nature\'s Bounty Red Yeast Rice 600 mg (120 capsules)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-red-yeast-rice-600-120',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312062124',
    activeIngredients: [
      { name: 'Red Yeast Rice Powder (Monascus purpureus)', strength: '1,200 mg (1.2 g) per 2 capsules' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/red-yeast-rice-600-mg-120-capsules', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/red-yeast-rice-600-mg-120-capsules', 'Rice Flour', 'limited', METH.riceFlour),
      flag('https://naturesbounty.com/products/red-yeast-rice-600-mg-120-capsules', 'Silica', 'limited', METH.silica),
      flag('https://naturesbounty.com/products/red-yeast-rice-600-mg-120-capsules', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2062-12 — HTTP 200, data[] empty for NDC 07431-2062-12. Opened https://naturesbounty.com/products/red-yeast-rice-600-mg-120-capsules — Supplement Facts and other ingredients read for t76u (UPC 074312062124). Other ingredients: Gelatin. Contains <2% of: Rice Flour, Silica, Vegetable Magnesium Stearate. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Walgreens prod2497530, Walmart 46108287 (sold by Walmart), Meijer 7431206212 and King Soopers.',
    ],
  },
  {
    id: 'natures-bounty-b198-red-yeast-rice-600-250',
    productName: 'Nature\'s Bounty Red Yeast Rice 600 mg (250 capsules)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-red-yeast-rice-600-250',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312199899',
    activeIngredients: [
      { name: 'Red Yeast Rice Powder (Monascus purpureus)', strength: '1,200 mg (1.2 g) per 2 capsules' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/red-yeast-rice-600-mg-250-capsules', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/red-yeast-rice-600-mg-250-capsules', 'Rice Flour', 'limited', METH.riceFlour),
      flag('https://naturesbounty.com/products/red-yeast-rice-600-mg-250-capsules', 'Silica', 'limited', METH.silica),
      flag('https://naturesbounty.com/products/red-yeast-rice-600-mg-250-capsules', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2199-89 — HTTP 200, data[] empty for NDC 07431-2199-89. Opened https://naturesbounty.com/products/red-yeast-rice-600-mg-250-capsules — Supplement Facts and other ingredients read for t76u (UPC 074312199899). Other ingredients: Gelatin. Contains <2% of: Rice Flour, Silica, Vegetable Magnesium Stearate. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Walgreens prod6000615, Walmart 48006438 and ShopRite.',
    ],
  },
  {
    id: 'natures-bounty-b198-glucosamine-chondroitin-110',
    productName: 'Nature\'s Bounty Glucosamine Chondroitin Complex 1,100 mg (110 capsules)',
    brand: "Nature's Bounty",
    category: 'Vitamins',
    formulaId: 'natures-bounty-b198-glucosamine-chondroitin-110',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312002380',
    activeIngredients: [
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '60 mg per 2 capsules' },
      { name: 'Manganese (as Manganese Sulfate)', strength: '2 mg per 2 capsules' },
      { name: 'Glucosamine Chondroitin Complex (Glucosamine Sulfate 2KCl, Methylsulfonylmethane (MSM), Chondroitin Sulfate)', strength: '1,100 mg (1.1 g) per 2 capsules' },
    ],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/glucosamine-chondroitin-complex-110-capsules', 'Gelatin', 'cleared', METH.gelatin),
      flag('https://naturesbounty.com/products/glucosamine-chondroitin-complex-110-capsules', 'Silica', 'limited', METH.silica),
      flag('https://naturesbounty.com/products/glucosamine-chondroitin-complex-110-capsules', 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=07431-2002-38 — HTTP 200, data[] empty for NDC 07431-2002-38. Opened https://naturesbounty.com/products/glucosamine-chondroitin-complex-110-capsules — Supplement Facts and other ingredients read for t76u (UPC 074312002380). Other ingredients: Gelatin. Contains <2% of: Silica, Vegetable Magnesium Stearate. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder run Oct 16, 2026 (ended 8:25 PM PT).): Target A-1010605454, Walgreens prod6110356, Walmart 48006410 and Meijer.',
    ],
  },
];

const ROWS = BATCH198_KYR6C_NB_T76U;

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

if (ROWS.length !== 13) throw new Error(`batch198 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch198 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch198 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch198 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch198 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch198 verdict ${record.id}`);
}
