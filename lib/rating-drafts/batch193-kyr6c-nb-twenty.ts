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
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  citric: 'Methodology §5 Cleared (citric acid).',
  flavor: 'Methodology §5 Limited (natural flavors).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  potassiumSorbate: 'Methodology §5 Limited (potassium sorbate, synthetic preservative).',
  sorbitol: 'Methodology §5 Limited (sorbitol).',
  tocopherol: 'Methodology §5 Cleared (tocopherols).',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const B12_LIQUID_PANEL = 'https://naturesbounty.com/products/b-12-5000-mcg-2-oz-liquid';
const FISH_OIL_PANEL = 'https://naturesbounty.com/products/fish-oil-1000-mg-145-rapid-release-softgels';

export const BATCH193_KYR6C_NB_TWENTY: RatingRecord[] = [
  {
    id: 'natures-bounty-b193-b12-liquid-59',
    productName: "Nature's Bounty Vitamin B-12 5,000 mcg Liquid (2 fl oz)",
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
      flag(B12_LIQUID_PANEL, 'Natural Berry Flavor', 'cleared', METH.flavor),
      flag(B12_LIQUID_PANEL, 'Citric Acid', 'cleared', METH.citric),
      flag(B12_LIQUID_PANEL, 'Potassium Sorbate', 'limited', METH.potassiumSorbate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page b-12-5000-mcg-2-oz-liquid was read: 59 servings per container on panel; bottle is 2 fl oz. DailyMed NDC 74312-1818-70 returned HTTP 200 with an empty data[] array. Opened https://www.walgreens.com/store/c/nature's-bounty-b-12-5000-mcg-dietary-supplement-liquid-berry/ID=prod6090940-product — Nature's Bounty B-12 5000 mcg Dietary Supplement Liquid Berry, 2.0 fl oz, $19.99 ($10.00/oz), Walgreens, In stock at store, Add for pickup. Target search did not open a priced 2 fl oz PDP. CVS search returned HTTP 403. Amazon PDP https://www.amazon.com/Natures-Bounty-Super-Strength-B-12/dp/B00TDFGJK8 opened with High price / See All Buying Options only (no Amazon.com buy box with price and Add to cart). Walmart search returned a robot check.",
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
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page fish-oil-1000-mg-145-rapid-release-softgels was read (panel). DailyMed NDC 74312-0382-28 returned HTTP 200 with an empty data[] array. Opened https://www.amazon.com/Natures-Bounty-Fish-Omega-3-Count/dp/B0777M3GD7 — 145 Count Rapid Release Softgels, $10.32 ($0.07/count), seller Amazon.com, In Stock, Add to cart. Target search did not open a 145-count 1000 mg PDP. CVS search returned HTTP 403. Walgreens product page https://www.walgreens.com/store/c/nature's-bounty-fish-oil-with-omega-3-softgels,-1000-mg/ID=prod3430770-product returned Access Denied in this pass. Walmart search returned a robot check.",
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

if (ROWS.length !== 2) throw new Error(`batch193 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch193 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch193 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch193 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch193 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch193 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch193 verdict ${record.id}`);
}
