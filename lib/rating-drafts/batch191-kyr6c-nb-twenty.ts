// DRAFT / not verified / batch 191 KYR6-c.
// Next twenty open Nature's Bounty handles (batch190 order). Rows only where panel +
// same-count sale completed the ladder. batch187–batch190 rows are not rewritten.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  agar: 'Methodology §5 Cleared (agar / agar-agar).',
  alginate: 'Methodology §5 Cleared (sodium alginate). Alginic family.',
  ammonium: 'Methodology §5 Caution (ammonium hydroxide).',
  cane: 'Methodology §5 Cleared (cane sugar).',
  carnauba: 'Methodology §5 Caution (carnauba wax).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  citric: 'Methodology §5 Cleared (citric acid).',
  citrate: 'Methodology §5 Cleared (sodium citrate, citrate salt).',
  crospovidone: 'Methodology §5 Cleared (crospovidone / povidone family).',
  dextrin: 'Methodology §5 Limited (bare dextrin).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  flavors: 'Methodology §5 Limited (natural flavors).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  lactic: 'Methodology §5 Cleared (lactic acid / malic acid — organic acids with citric).',
  lecithin: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  magCitrate: 'Methodology §5 Cleared (magnesium citrate, citrate salt).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mct: 'Methodology §5 Limited (unlabeled medium-chain triglycerides). No plant is named.',
  modCorn: 'Methodology §5 Limited (modified corn starch).',
  oleic: 'Methodology §5 Cleared (oleic acid — fatty-acid / stearate cousin).',
  palmGummy: 'Methodology §5 Avoid (vegetable oil / palm oil in a gummy).',
  pectin: 'Methodology §5 Cleared (pectin).',
  phosphate: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  riceFlour: 'Methodology §5 Limited (rice flour — exact token; distinct from Cleared rice-hull family).',
  riceHulls: 'Methodology §5 Cleared (rice hulls / rice hull extract family).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  sugar: 'Methodology §5 Cleared (sugar).',
  sunflowerGummy:
    'Methodology §5 Avoid (rice bran oil in a gummy base). Same call as sunflower oil in a gummy. Softgel or capsule fill stays Cleared. Locked Oct 15, 2026.',
  tapioca: 'Methodology §5 Cleared (tapioca starch / tapioca syrup).',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  tocopherol: 'Methodology §5 Cleared (tocopherols).',
  wax: 'Methodology §5 Caution (carnauba wax).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const SLEEP_PANEL = 'https://naturesbounty.com/products/10mg-sleep-gummies';
const HTP_PANEL = 'https://naturesbounty.com/products/5-htp-100-mg-60-capsules';
const ACIDOPH_PANEL = 'https://naturesbounty.com/products/acidophilus-probiotic-100-tablets';
const ADV_HS_PANEL = 'https://naturesbounty.com/products/advanced-hair-skin-and-nails';
const D3MAG_PANEL = 'https://naturesbounty.com/products/advanced-vitamin-d3-with-magnesium-citrate';
const ANXIETY_PANEL = 'https://naturesbounty.com/products/anxiety-and-stress-relief';
const ASHWA_PANEL = 'https://naturesbounty.com/products/ashwagandha-gummies';
const MENO_PANEL = 'https://naturesbounty.com/products/advanced-menopause-relief';
const PMS_PANEL = 'https://naturesbounty.com/products/advanced-pms-relief';
const AGE_PANEL = 'https://naturesbounty.com/products/age-defying-skin-renewal';
const CVS_AGE_PANEL =
  'https://www.cvs.com/shop/nature-s-bounty-age-defying-skin-renew-capsules-30-ct-prodid-840673';
const ACV_GUMMY_PANEL = 'https://naturesbounty.com/products/apple-cider-vinegar-gummies';

export const BATCH191_KYR6C_NB_TWENTY: RatingRecord[] = [
  {
    id: 'natures-bounty-b191-sleep-gummies-140',
    productName: "Nature's Bounty 10 mg Sleep Gummies (140 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-sleep-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Melatonin', strength: '10 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(SLEEP_PANEL, 'Cane Sugar', 'cleared', METH.cane),
      flag(SLEEP_PANEL, 'Tapioca Syrup', 'cleared', METH.tapioca),
      flag(SLEEP_PANEL, 'Pectin', 'cleared', METH.pectin),
      flag(SLEEP_PANEL, 'Citric Acid', 'cleared', METH.citric),
      flag(SLEEP_PANEL, 'Fruit Juice Color', 'cleared', METH.juiceColor),
      flag(SLEEP_PANEL, 'Natural Flavors', 'limited', METH.flavors),
      flag(SLEEP_PANEL, 'Sodium Citrate', 'cleared', METH.citrate),
      flag(SLEEP_PANEL, 'Vegetable Oil (Palm)', 'high', METH.palmGummy),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page 10mg-sleep-gummies was read. Serving size 2 gummies. Servings per container 70, which is 140 gummies. Other ingredients: cane sugar, tapioca syrup, pectin. Contains <2% of: citric acid, fruit juice color, natural flavors, sodium citrate, vegetable oil (palm) (contains carnauba wax). DailyMed had no SPL. Target search did not open a priced 140-count melatonin gummy card. CVS returned 403. Walgreens opened 10 mg Melatonin Gummies Blueberry, 140 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 140-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b191-5htp-60',
    productName: "Nature's Bounty 5-HTP (60 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-5htp',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: '5-HTP', strength: '100 mg per capsule' }],
    inactiveIngredients: [
      flag(HTP_PANEL, 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag(HTP_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(HTP_PANEL, 'Silica', 'limited', METH.silica),
      flag(HTP_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(HTP_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page 5-htp-100-mg-60-capsules was read. Serving size 1 capsule. Servings per container 60. Other ingredients: dicalcium phosphate, gelatin. Contains <2% of: silica, vegetable cellulose, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 60-count 5-HTP card. CVS returned 403. Walgreens Nature's Bounty 5-HTP search returned no product card for this 60-count. Amazon opened 5-HTP 100 mg Capsules, 60 Count, with a buy box. Walmart returned a robot check. Google AI mode last cited the Amazon 60-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b191-acidophilus-120',
    productName: "Nature's Bounty Acidophilus Probiotic (120 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-acidophilus',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Lactobacillus acidophilus', strength: 'per tablet' }],
    inactiveIngredients: [
      flag(ACIDOPH_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(ACIDOPH_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
      flag(ACIDOPH_PANEL, 'Silica', 'limited', METH.silica),
      flag(ACIDOPH_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page acidophilus-probiotic-100-tablets was read. Serving size 1 tablet. Servings per container 120. Other ingredients: vegetable cellulose, vegetable stearic acid, silica, vegetable magnesium stearate. The Shopify handle still says 100-tablets, but the panel on that page is 120 tablets. DailyMed had no SPL. Target search did not open a priced 120-count acidophilus card. CVS returned 403. Walgreens opened Acidophilus Probiotic Tablets, 120 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 120-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b191-adv-hair-skin-80',
    productName: "Nature's Bounty Advanced Hair, Skin & Nails Gummies (80 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-adv-hair-skin-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Biotin', strength: '6000 mcg per 2 gummies' }],
    inactiveIngredients: [
      flag(ADV_HS_PANEL, 'Sugar', 'cleared', METH.sugar),
      flag(ADV_HS_PANEL, 'Corn Syrup', 'cleared', METH.glucose),
      flag(ADV_HS_PANEL, 'Dicalcium Phosphate', 'cleared', METH.phosphate),
      flag(ADV_HS_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(ADV_HS_PANEL, 'Citric Acid', 'cleared', METH.citric),
      flag(ADV_HS_PANEL, 'Fruit and Vegetable Juice (color)', 'cleared', METH.juiceColor),
      flag(ADV_HS_PANEL, 'Lactic Acid', 'cleared', METH.lactic),
      flag(ADV_HS_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(ADV_HS_PANEL, 'Natural Strawberry Flavor', 'limited', METH.flavors),
      flag(ADV_HS_PANEL, 'Pectin', 'cleared', METH.pectin),
      flag(ADV_HS_PANEL, 'Silica', 'limited', METH.silica),
      flag(ADV_HS_PANEL, 'Vegetable Oil (Palm)', 'high', METH.palmGummy),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page advanced-hair-skin-and-nails was read. Serving size 2 gummies. Servings per container 40, which is 80 gummies. Other ingredients: sugar, corn syrup, dicalcium phosphate, gelatin. Contains <2% of: citric acid, fruit and vegetable juice (color), lactic acid, maltodextrin, natural strawberry flavor, pectin, silica, vegetable oil (palm) (contains carnauba wax). DailyMed had no SPL. Target search did not open a priced 80-count Advanced Hair Skin Nails gummy card. CVS returned 403. Walgreens opened Optimal Solutions Advanced Hair, Skin, Nails Gummies, 80 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 80-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b191-adv-d3-mag-90',
    productName: "Nature's Bounty Advanced Vitamin D3 with Magnesium Citrate (90 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-adv-d3-mag-citrate',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Vitamin D3', strength: '157.5 mcg (6300 IU) per tablet' },
      { name: 'Magnesium (as magnesium citrate)', strength: '100 mg per tablet' },
    ],
    inactiveIngredients: [
      flag(D3MAG_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(D3MAG_PANEL, 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag(D3MAG_PANEL, 'Glycerin', 'cleared', METH.glycerin),
      flag(D3MAG_PANEL, 'Silica', 'limited', METH.silica),
      flag(D3MAG_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page advanced-vitamin-d3-with-magnesium-citrate was read. Serving size 1 tablet. Servings per container 90. Other ingredients: vegetable cellulose. Contains <2% of: dicalcium phosphate, glycerin, silica, vegetable stearic acid. DailyMed had no SPL. Target search did not open a priced 90-count Advanced D3 + Magnesium Citrate card. CVS returned 403. Walgreens opened Advanced Vitamin D3 + Magnesium Citrate, 90 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 90-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b191-anxiety-50',
    productName: "Nature's Bounty Anxiety & Stress Relief (50 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-anxiety-stress',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Ashwagandha KSM-66', strength: '600 mg per 2 tablets' },
      { name: 'L-Theanine', strength: '200 mg per 2 tablets' },
    ],
    inactiveIngredients: [
      flag(ANXIETY_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(ANXIETY_PANEL, 'Crospovidone', 'cleared', METH.crospovidone),
      flag(ANXIETY_PANEL, 'Silica', 'limited', METH.silica),
      flag(ANXIETY_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
      flag(ANXIETY_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(ANXIETY_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page anxiety-and-stress-relief was read. Serving size 2 tablets. Servings per container 25, which is 50 tablets. Other ingredients: vegetable cellulose, crospovidone, silica, vegetable stearic acid, vegetable magnesium stearate, vegetable glycerin. DailyMed had no SPL. Target search did not open a priced 50-count Anxiety & Stress Relief card. CVS returned 403. Walgreens opened Anxiety & Stress Relief, Ashwagandha KSM-66, 50 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 50-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b191-ashwagandha-gummies-60',
    productName: "Nature's Bounty Ashwagandha Gummies (60 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-ashwagandha-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'KSM-66 Ashwagandha', strength: '300 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(ASHWA_PANEL, 'Organic Cane Sugar', 'cleared', METH.cane),
      flag(ASHWA_PANEL, 'Tapioca Syrup', 'cleared', METH.tapioca),
      flag(ASHWA_PANEL, 'Pectin', 'cleared', METH.pectin),
      flag(ASHWA_PANEL, 'Citric Acid', 'cleared', METH.citric),
      flag(ASHWA_PANEL, 'Fruit and Vegetable Concentrate (Color)', 'cleared', METH.juiceColor),
      flag(ASHWA_PANEL, 'Medium Chain Triglycerides', 'limited', METH.mct),
      flag(ASHWA_PANEL, 'Natural Flavors', 'limited', METH.flavors),
      flag(ASHWA_PANEL, 'Sodium Citrate', 'cleared', METH.citrate),
      flag(ASHWA_PANEL, 'Sunflower Lecithin', 'cleared', METH.lecithin),
      flag(ASHWA_PANEL, 'Tapioca Starch', 'cleared', METH.tapioca),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page ashwagandha-gummies was read. Serving size 2 gummies. Servings per container 30, which is 60 gummies. Other ingredients: organic cane sugar, tapioca syrup, pectin. Contains <2% of: citric acid, fruit and vegetable concentrate (color), medium chain triglycerides, natural flavors, sodium citrate, sunflower lecithin, tapioca starch. DailyMed had no SPL. Target search did not open a priced 60-count ashwagandha gummy card. CVS returned 403. Walgreens opened Ashwagandha Gummies Mixed Berry, 60 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 60-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b191-menopause-30',
    productName: "Nature's Bounty Advanced Menopause Relief (30 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-menopause',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Siberian rhubarb extract', strength: 'per tablet' }],
    inactiveIngredients: [
      flag(MENO_PANEL, 'Dicalcium Phosphate', 'cleared', METH.dicalcium),
      flag(MENO_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(MENO_PANEL, 'Ammonium Hydroxide', 'limited', METH.ammonium),
      flag(MENO_PANEL, 'Medium Chain Triglycerides', 'limited', METH.mct),
      flag(MENO_PANEL, 'Oleic Acid', 'cleared', METH.oleic),
      flag(MENO_PANEL, 'Silica', 'limited', METH.silica),
      flag(MENO_PANEL, 'Sodium Alginate', 'cleared', METH.alginate),
      flag(MENO_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(MENO_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page advanced-menopause-relief was read. Serving size 1 tablet. Servings per container 30. Other ingredients: dicalcium phosphate, vegetable cellulose. Contains <2% of: ammonium hydroxide, medium chain triglycerides, oleic acid, silica, sodium alginate, vegetable magnesium stearate, vegetable stearic acid. DailyMed had no SPL. Target search did not open a priced 30-count Advanced Menopause Relief card. CVS returned 403. Walgreens opened Optimal Solutions Advanced Menopause Relief Tablets, 30 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 30-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b191-pms-60',
    productName: "Nature's Bounty Advanced PMS Relief (60 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-pms',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Chasteberry and curcumin blend', strength: 'per 2 capsules' }],
    inactiveIngredients: [
      flag(PMS_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(PMS_PANEL, 'Dextrin', 'limited', METH.dextrin),
      flag(PMS_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(PMS_PANEL, 'Rice Hulls', 'cleared', METH.riceHulls),
      flag(PMS_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page advanced-pms-relief was read. Serving size 2 capsules. Servings per container 30, which is 60 capsules. Other ingredients: vegetable cellulose. Contains <2% of: dextrin, maltodextrin, rice hulls, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open a priced 60-count Advanced PMS Relief card. CVS returned 403. Walgreens opened Optimal Solutions Advanced PMS Relief for Menstrual Cycle Support, 60 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 60-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b191-age-defying-30',
    productName: "Nature's Bounty Optimal Solutions Age-Defying Skin Renewal (30 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-age-defying',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Ceramosides wheat seed extract', strength: '30 mg per capsule' }],
    inactiveIngredients: [
      flag(AGE_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(AGE_PANEL, 'Rice Flour', 'limited', METH.riceFlour),
      flag(AGE_PANEL, 'Magnesium Citrate', 'cleared', METH.magCitrate),
      flag(AGE_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(AGE_PANEL, 'Silica', 'limited', METH.silica),
    ],
    verdict: 'caution',
    retailers: ['CVS'],
    sourcesGeneral: [
      "Brand page age-defying-skin-renewal was read. Serving size 1 capsule. Servings per container 30. Other ingredients: vegetable cellulose, rice flour, magnesium citrate, vegetable magnesium stearate, silica. Contains wheat ingredients. DailyMed had no SPL. Target search did not open a priced 30-count Age-Defying Skin Renewal card. CVS Product Specifications opened for Age-Defying Skin Renew Capsules, 30 ct, at $14.99 with Buy 1, get 1 free. Walgreens search did not open this 30-count SKU with a price. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the CVS 30-count listing that was opened.",
    ],
  },
  {
    id: 'natures-bounty-b191-acv-gummies-60',
    productName: "Nature's Bounty Apple Cider Vinegar Gummies (60 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b191-acv-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Organic apple cider vinegar', strength: '500 mg per gummy' }],
    inactiveIngredients: [
      flag(ACV_GUMMY_PANEL, 'Organic Tapioca Syrup', 'cleared', METH.tapioca),
      flag(ACV_GUMMY_PANEL, 'Organic Cane Sugar', 'cleared', METH.cane),
      flag(ACV_GUMMY_PANEL, 'Pectin', 'cleared', METH.pectin),
      flag(ACV_GUMMY_PANEL, 'Citric Acid', 'cleared', METH.citric),
      flag(ACV_GUMMY_PANEL, 'Fruit and Vegetable Juice (Color)', 'cleared', METH.juiceColor),
      flag(ACV_GUMMY_PANEL, 'Natural Flavors', 'limited', METH.flavors),
      flag(ACV_GUMMY_PANEL, 'Natural Palm Leaf Glaze', 'high', METH.palmGummy),
      flag(ACV_GUMMY_PANEL, 'Natural Tocopherols', 'cleared', METH.tocopherol),
      flag(ACV_GUMMY_PANEL, 'Sodium Citrate', 'cleared', METH.citrate),
      flag(ACV_GUMMY_PANEL, 'Sunflower Oil', 'high', METH.sunflowerGummy),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page apple-cider-vinegar-gummies was read. The page lists 60 or 120 gummies; this row is the 60-gummy pack. Serving size 1 gummy. Other ingredients: organic tapioca syrup, organic cane sugar, pectin. Contains <2% of: citric acid, fruit and vegetable juice (color), natural flavors, natural palm leaf glaze, natural tocopherols, sodium citrate, sunflower oil. DailyMed had no SPL. Target search did not open a priced 60-count ACV gummy card. CVS returned 403. Walgreens opened Apple Cider Vinegar Gummies, 60 ea, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 60-count listing that was opened.",
    ],
  },
];

const ROWS = BATCH191_KYR6C_NB_TWENTY;

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

if (ROWS.length !== 11) throw new Error(`batch191 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch191 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch191 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch191 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch191 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch191 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch191 verdict ${record.id}`);
}
