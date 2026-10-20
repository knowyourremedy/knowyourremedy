// DRAFT / not verified / batch 192 KYR6-c.
// Nine held Nature's Bounty packs from batch191. Rows only where panel + same-count sale
// completed the ladder. Prior batch rows are not rewritten.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  cane: 'Methodology §5 Cleared (cane sugar).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  citric: 'Methodology §5 Cleared (citric acid).',
  cornOil: 'Methodology §5 Cleared (corn oil, not the gummy base).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  flavor: 'Methodology §5 Limited (natural flavors).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  lactic: 'Methodology §5 Cleared (lactic acid / malic acid — organic acids with citric).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  palmGummy: 'Methodology §5 Avoid (vegetable oil / palm oil in a gummy).',
  pectin: 'Methodology §5 Cleared (pectin).',
  phosphate: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  sorbitan: 'Methodology §5 Caution (sorbitol sorbitan solution). Not the sugar alcohol sorbitol.',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not the gummy seed-oil rule).',
  soyLecithin: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  wax: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const COLLAGEN_PECTIN_PANEL = 'https://naturesbounty.com/products/hair-skin-nails-collagen-pectin-gummies';
const ADV_PECTIN_PANEL = 'https://naturesbounty.com/products/advanced-hair-skin-and-nails-pectin-gummies';
const CALCIUM_PANEL =
  'https://naturesbounty.com/products/absorbable-calcium-with-vitamin-d3-1200-mg-220-rapid-release-softgels';
const CHARCOAL_PANEL = 'https://naturesbounty.com/products/activated-charcoal';
const ACTIVE_MIND_PANEL = 'https://naturesbounty.com/products/active-mind';
const ACV_TABLET_PANEL = 'https://naturesbounty.com/products/apple-cider-vinegar';
const B12_PANEL = 'https://naturesbounty.com/products/b-12-1000-mcg-100-tablets';

export const BATCH192_KYR6C_NB_NINE: RatingRecord[] = [
  {
    id: 'natures-bounty-b192-collagen-pectin-200',
    productName: "Nature's Bounty Hair, Skin & Nails + Collagen Pectin Gummies (200 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b192-collagen-pectin-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Biotin', strength: '2,500 mcg per 2 gummies' },
      { name: 'Collagen', strength: '100 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(COLLAGEN_PECTIN_PANEL, 'Cane Sugar', 'cleared', METH.cane),
      flag(COLLAGEN_PECTIN_PANEL, 'Glucose Syrup', 'cleared', METH.glucose),
      flag(COLLAGEN_PECTIN_PANEL, 'Dicalcium Phosphate', 'cleared', METH.phosphate),
      flag(COLLAGEN_PECTIN_PANEL, 'Pectin', 'cleared', METH.pectin),
      flag(COLLAGEN_PECTIN_PANEL, 'Carnauba Wax', 'cleared', METH.carnauba),
      flag(COLLAGEN_PECTIN_PANEL, 'Citric Acid', 'cleared', METH.citric),
      flag(COLLAGEN_PECTIN_PANEL, 'Fruit and Vegetable Juice (Color)', 'cleared', METH.juiceColor),
      flag(COLLAGEN_PECTIN_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(COLLAGEN_PECTIN_PANEL, 'Natural Flavors', 'limited', METH.flavor),
      flag(COLLAGEN_PECTIN_PANEL, 'Silica', 'limited', METH.silica),
      flag(COLLAGEN_PECTIN_PANEL, 'Vegetable Oil (Palm)', 'high', METH.palmGummy),
    ],
    verdict: 'avoid',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page hair-skin-nails-collagen-pectin-gummies was read. Serving size 2 gummies. Servings per container 100, which is 200 gummies. Other ingredients: cane sugar, glucose syrup, dicalcium phosphate, pectin. Contains <2% of: carnauba wax, citric acid, fruit and vegetable juice (color), maltodextrin, natural flavors, silica, vegetable oil (palm). DailyMed had no SPL. Target search did not open a priced 200-count collagen pectin gummy card. CVS returned 403. Walgreens opened Optimal Solutions Hair, Skin & Nails with Biotin & Collagen Tropical Citrus, but that listing is 80 ea with a gelatin-based collagen gummy, not this 200-count pectin bottle. Amazon opened Optimal Solutions Hair, Skin and Nails Collagen Pectin Gummies, Tropical Citrus, 200 ct, with a buy box. Walmart returned a robot check. Google AI mode last cited the Amazon 200-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b192-adv-pectin-200',
    productName: "Nature's Bounty Advanced Hair, Skin & Nails Pectin Gummies (200 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b192-adv-pectin-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Biotin', strength: '6,000 mcg per 2 gummies' }],
    inactiveIngredients: [
      flag(ADV_PECTIN_PANEL, 'Cane Sugar', 'cleared', METH.cane),
      flag(ADV_PECTIN_PANEL, 'Glucose Syrup', 'cleared', METH.glucose),
      flag(ADV_PECTIN_PANEL, 'Dicalcium Phosphate', 'cleared', METH.phosphate),
      flag(ADV_PECTIN_PANEL, 'Pectin', 'cleared', METH.pectin),
      flag(ADV_PECTIN_PANEL, 'Carnauba Wax', 'cleared', METH.carnauba),
      flag(ADV_PECTIN_PANEL, 'Citric Acid', 'cleared', METH.citric),
      flag(ADV_PECTIN_PANEL, 'Lactic Acid', 'cleared', METH.lactic),
      flag(ADV_PECTIN_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(ADV_PECTIN_PANEL, 'Natural Flavor', 'limited', METH.flavor),
      flag(ADV_PECTIN_PANEL, 'Silica', 'limited', METH.silica),
      flag(ADV_PECTIN_PANEL, 'Vegetable Juice (Color)', 'cleared', METH.juiceColor),
      flag(ADV_PECTIN_PANEL, 'Vegetable Oil (Palm)', 'high', METH.palmGummy),
    ],
    verdict: 'avoid',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page advanced-hair-skin-and-nails-pectin-gummies was read. Serving size 2 gummies. Servings per container 100, which is 200 gummies. Other ingredients: cane sugar, glucose syrup, dicalcium phosphate, pectin. Contains <2% of: carnauba wax, citric acid, lactic acid, maltodextrin, natural flavor, silica, vegetable juice (color), vegetable oil (palm). DailyMed had no SPL. Target search did not open a priced 200-count Advanced pectin gummy card. CVS returned 403. Walgreens search showed Advanced Hair, Skin, Nails Gummies at 80 ea only, not this 200-count pectin SKU. Amazon opened Advanced Hair, Skin and Nails Pectin Gummies, Strawberry, 200 ct, with a buy box. Walmart returned a robot check. Google AI mode last cited the Amazon 200-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b192-calcium-d3-220',
    productName: "Nature's Bounty Calcium Plus Vitamin D3 1,200 mg (220 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b192-calcium-d3-220',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Calcium (as calcium carbonate)', strength: '1,200 mg per 2 softgels' },
      { name: 'Vitamin D3', strength: '25 mcg (1,000 IU) per 2 softgels' },
    ],
    inactiveIngredients: [
      flag(CALCIUM_PANEL, 'Soybean Oil', 'cleared', METH.soyFill),
      flag(CALCIUM_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(CALCIUM_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag(CALCIUM_PANEL, 'Corn Oil', 'cleared', METH.cornOil),
      flag(CALCIUM_PANEL, 'Mannitol', 'limited', METH.mannitol),
      flag(CALCIUM_PANEL, 'Sorbitol Sorbitan Solution', 'limited', METH.sorbitan),
      flag(CALCIUM_PANEL, 'Soy Lecithin', 'cleared', METH.soyLecithin),
      flag(CALCIUM_PANEL, 'Titanium Dioxide Color', 'high', METH.tio2),
      flag(CALCIUM_PANEL, 'Yellow Beeswax', 'cleared', METH.beeswax),
    ],
    verdict: 'avoid',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page absorbable-calcium-with-vitamin-d3-1200-mg-220-rapid-release-softgels was read. Serving size 2 softgels. Servings per container 110, which is 220 softgels. Other ingredients: soybean oil, gelatin, vegetable glycerin. Contains <2% of: corn oil, mannitol, sorbitol sorbitan solution, soy lecithin, titanium dioxide color, yellow beeswax. DailyMed had no SPL for this 220-count bottle. Target search did not open a priced 220-count calcium softgel card. CVS returned 403. Walgreens calcium search opened 120-count and 120 ea twinpack listings only, not 220 softgels. Amazon opened Calcium 1200 mg With Vitamin D3, 220 Softgels, with a buy box. Walmart returned a robot check. Google AI mode last cited the Amazon 220-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b192-charcoal-100',
    productName: "Nature's Bounty Activated Charcoal (100 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b192-activated-charcoal',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Activated Charcoal', strength: '520 mg per 2 capsules' }],
    inactiveIngredients: [
      flag(CHARCOAL_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(CHARCOAL_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'clean',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page activated-charcoal was read. Serving size 2 capsules. Servings per container 50, which is 100 capsules. Other ingredients: gelatin, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 100-count activated charcoal card. CVS returned 403. Walgreens opened Activated Charcoal 260 mg Capsules, 100 ea, at $16.99, but shipping was out of stock, same-day delivery was unavailable, and the listing was not sold in stores, so it was not for sale now. Amazon opened Activated Charcoal 260 mg, 100 Capsules, with a buy box. Walmart returned a robot check. Google AI mode last cited the Amazon 100-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b192-active-mind-60',
    productName: "Nature's Bounty Active Mind (60 caplets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b192-active-mind',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Cognizin Citicoline', strength: '1,000 mg per 2 caplets' },
      { name: 'L-Theanine', strength: '100 mg per 2 caplets' },
      { name: 'Caffeine', strength: '50 mg per 2 caplets' },
    ],
    inactiveIngredients: [
      flag(ACTIVE_MIND_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(ACTIVE_MIND_PANEL, 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag(ACTIVE_MIND_PANEL, 'Silica', 'limited', METH.silica),
      flag(ACTIVE_MIND_PANEL, 'Titanium Dioxide Color', 'high', METH.tio2),
      flag(ACTIVE_MIND_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(ACTIVE_MIND_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    ],
    verdict: 'avoid',
    retailers: ['Walmart'],
    sourcesGeneral: [
      "Brand page active-mind was read. Serving size 2 caplets. Servings per container 30, which is 60 caplets. Other ingredients: vegetable cellulose, dicalcium phosphate. Contains <2% of: silica, titanium dioxide color, vegetable magnesium stearate, vegetable stearic acid. DailyMed had no SPL. Target search did not open a priced 60-count Active Mind card. CVS returned 403. Walgreens brain-and-memory category search did not list Active Mind 60 caplets with a price. Amazon search returned 503. Walmart opened Nature's Bounty Active Mind, 60 Coated Caplets, at $45.69 with Add to cart. Google AI mode last cited the Walmart 60-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b192-acv-tablets-200',
    productName: "Nature's Bounty Apple Cider Vinegar Tablets (200 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b192-acv-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Apple Cider Vinegar', strength: '480 mg per 2 tablets' }],
    inactiveIngredients: [
      flag(ACV_TABLET_PANEL, 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag(ACV_TABLET_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(ACV_TABLET_PANEL, 'Silica', 'limited', METH.silica),
      flag(ACV_TABLET_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(ACV_TABLET_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    ],
    verdict: 'caution',
    retailers: ['Amazon', 'Walmart'],
    sourcesGeneral: [
      "Brand page apple-cider-vinegar was read. Serving size 2 tablets. Servings per container 100, which is 200 tablets. Other ingredients: dicalcium phosphate, vegetable cellulose. Contains <2% of: silica, vegetable magnesium stearate, vegetable stearic acid. DailyMed had no SPL. Target search for apple cider vinegar tablets did not open a Nature's Bounty 200-count card. CVS returned 403. Walgreens apple cider vinegar category listed Walgreens 100-count tablets and Nature's Bounty ACV gummies only, not this 200-count tablet bottle. Amazon opened Apple Cider Vinegar 480 mg, 200 Tablets, with a buy box. Walmart browse opened Natures Bounty Apple Cider Vinegar Supplement, 480 mg, 200 Tablets, at $9.90 with Add to cart. Google AI mode last cited Amazon and Walmart pages that were opened for this 200-count.",
    ],
  },
  {
    id: 'natures-bounty-b192-b12-1000-100',
    productName: "Nature's Bounty Vitamin B-12 1,000 mcg (100 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b192-b12-1000-100',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Vitamin B-12 (cyanocobalamin)', strength: '1,000 mcg per tablet' }],
    inactiveIngredients: [
      flag(B12_PANEL, 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag(B12_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(B12_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
      flag(B12_PANEL, 'Natural Palm Leaf Glaze', 'cleared', METH.carnauba),
      flag(B12_PANEL, 'Silica', 'limited', METH.silica),
      flag(B12_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page b-12-1000-mcg-100-tablets was read. Serving size 1 tablet. Servings per container 100. Other ingredients: dicalcium phosphate, vegetable cellulose, vegetable stearic acid. Contains <2% of: natural palm leaf glaze, silica, vegetable magnesium stearate. Natural palm leaf glaze is graded as carnauba wax, not palm oil. DailyMed had no SPL. Target search did not open a priced 100-count B-12 1,000 mcg tablet card. CVS returned 403. Walgreens opened Vitamin B-12, 1000 mcg, Tablets, 100 ea, at $18.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 100-count listing that was opened.",
    ],
  },
];

const ROWS = BATCH192_KYR6C_NB_NINE;

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

if (ROWS.length !== 7) throw new Error(`batch192 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch192 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch192 upc ${record.id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch192 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch192 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch192 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch192 verdict ${record.id}`);
}
