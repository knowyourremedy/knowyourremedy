// DRAFT / not verified / batch 195 KYR6-c.
// Nature's Bounty packs from products.json catalog indices 161–121 (forty looked-at handles).
// Rows only where the brand panel was read and a named store showed the same count for sale.
// Part 1 rose hips / gummies packs and Part 3 slice share this file.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  cane: 'Methodology §5 Cleared (cane sugar).',
  citric: 'Methodology §5 Cleared (citric acid).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  flavor: 'Methodology §5 Limited (natural flavors).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, methKey: keyof typeof METH): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[methKey]}` };
}

export const BATCH195_KYR6C_NB_FORTY: RatingRecord[] = [
  {
    id: 'natures-bounty-b195-calcium-d-gummies-70',
    productName: "Nature's Bounty Calcium + Vitamin D3 + Zinc Gummies (70 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b195-calcium-d-gummies-70',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312679414',
    activeIngredients: [{ name: 'Calcium (as tricalcium phosphate)', strength: '500 mg per 2 gummies' }, { name: 'Vitamin D3 (cholecalciferol)', strength: '25 mcg (1,000 IU) per 2 gummies' }, { name: 'Zinc (as zinc citrate)', strength: '7.5 mg per 2 gummies' }],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/calcium-plus-vitamin-d-gummies', 'Glucose Syrup', 'cleared', 'glucose'),
      flag('https://naturesbounty.com/products/calcium-plus-vitamin-d-gummies', 'Cane Sugar', 'cleared', 'cane'),
      flag('https://naturesbounty.com/products/calcium-plus-vitamin-d-gummies', 'Modified Food Starch', 'limited', 'maltodextrin'),
      flag('https://naturesbounty.com/products/calcium-plus-vitamin-d-gummies', 'Gelatin', 'cleared', 'gelatin'),
      flag('https://naturesbounty.com/products/calcium-plus-vitamin-d-gummies', 'Citric Acid', 'cleared', 'citric'),
      flag('https://naturesbounty.com/products/calcium-plus-vitamin-d-gummies', 'Fruit and Vegetable Juice Concentrate (Color)', 'cleared', 'juiceColor'),
      flag('https://naturesbounty.com/products/calcium-plus-vitamin-d-gummies', 'Lactic Acid', 'cleared', 'citric'),
      flag('https://naturesbounty.com/products/calcium-plus-vitamin-d-gummies', 'Maltodextrin', 'limited', 'maltodextrin'),
      flag('https://naturesbounty.com/products/calcium-plus-vitamin-d-gummies', 'Natural Flavors', 'limited', 'flavor'),
    ],
    verdict: 'avoid',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page calcium-plus-vitamin-d-gummies was read. Serving size 2 gummies. Bottle copy states 70 gummies per bottle (35 servings). DailyMed NDC 74312-6794-14 returned HTTP 200 with an empty data[] array. Opened https://www.amazon.com/Natures-Bounty-Calcium-Supports-Flavored/dp/B0DJG338TD — 70ct Orange & Cherry gummies, $11.62 ($0.17/count), seller Amazon.com, In Stock, Add to cart. Target search did not open a priced 70-gummy PDP. CVS search returned HTTP 403. Walgreens calcium gummies search showed 70 ea on a list page only (not an opened /ID=prod PDP). Walmart search returned a robot check.",
    ],
  },
  {
    id: 'natures-bounty-b195-folic-acid-250',
    productName: "Nature's Bounty Folic Acid 800 mcg (250 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b195-folic-acid-250',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312028434',
    activeIngredients: [{ name: 'Folic Acid', strength: '800 mcg per tablet' }],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/folic-acid-800-mcg-250-tablets', 'Vegetable Cellulose', 'cleared', 'cellulose'),
      flag('https://naturesbounty.com/products/folic-acid-800-mcg-250-tablets', 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag('https://naturesbounty.com/products/folic-acid-800-mcg-250-tablets', 'Silica', 'limited', 'silica'),
      flag('https://naturesbounty.com/products/folic-acid-800-mcg-250-tablets', 'Vegetable Magnesium Stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page folic-acid-800-mcg-250-tablets was read. Serving size 1 tablet. Servings per container 250. DailyMed NDC 74312-0284-34 returned HTTP 200 with an empty data[] array. Opened https://www.amazon.com/Natures-Bounty-Tablets-Maximum-Strength/dp/B000HRVSP2 — 250 Tablets, $6.75 ($0.03/count), seller Amazon.com, In Stock, Add to cart. Target search did not open a priced 250-tablet PDP. CVS search returned HTTP 403. Walgreens folic acid search did not open a Nature's Bounty 800 mcg 250-tablet /ID=prod PDP. Walmart search returned a robot check.",
    ],
  },
  {
    id: 'natures-bounty-b195-melatonin-1-180',
    productName: "Nature's Bounty Melatonin 1 mg (180 tablets)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b195-melatonin-1-180',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312028328',
    activeIngredients: [{ name: 'Melatonin', strength: '1 mg per tablet' }],
    inactiveIngredients: [
      flag('https://naturesbounty.com/products/melatonin-1-mg-180-tablets', 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag('https://naturesbounty.com/products/melatonin-1-mg-180-tablets', 'Vegetable Cellulose', 'cleared', 'cellulose'),
      flag('https://naturesbounty.com/products/melatonin-1-mg-180-tablets', 'Vegetable Magnesium Stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'clean',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page melatonin-1-mg-180-tablets was read. Serving size 1 tablet. Servings per container 180. DailyMed NDC 74312-0283-28 returned HTTP 200 with an empty data[] array. Opened https://www.amazon.com/Natures-Bounty-Melatonin-180-Tablets/dp/B0013NB6ZQ — 180 Count (Pack of 1), $9.29 ($0.05/count), seller Amazon.com, In Stock, Add to cart. Target search did not open a priced 180-tablet PDP. CVS search returned HTTP 403. Walgreens melatonin search did not open a Nature's Bounty 1 mg 180-tablet /ID=prod PDP. Walmart search returned a robot check.",
    ],
  },
];

const ROWS = BATCH195_KYR6C_NB_FORTY;

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

if (ROWS.length !== 3) throw new Error(`batch195 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch195 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch195 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch195 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch195 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch195 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch195 verdict ${record.id}`);
}
