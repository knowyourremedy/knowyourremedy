// DRAFT / not verified / batch 194 KYR6-c.
// Nature's Bounty Biotin 10,000 mcg softgels (90) — skipped pack from batch193 window.
// Row only where panel + same-count sale completed the ladder. batch193 rows are not rewritten.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not the gummy seed-oil rule).',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const BIOTIN_10K_90_PANEL = 'https://naturesbounty.com/products/biotin-10000-mcg-softgels';

export const BATCH194_KYR6C_NB_BIOTIN_90: RatingRecord[] = [
  {
    id: 'natures-bounty-b194-biotin-10000-90',
    productName: "Nature's Bounty Optimal Solutions Biotin 10,000 mcg (90 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b194-biotin-10000-90',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312588655',
    activeIngredients: [{ name: 'Biotin (d-biotin)', strength: '10,000 mcg per softgel' }],
    inactiveIngredients: [
      flag(BIOTIN_10K_90_PANEL, 'Soybean Oil', 'cleared', METH.soyFill),
      flag(BIOTIN_10K_90_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(BIOTIN_10K_90_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
      flag(BIOTIN_10K_90_PANEL, 'Yellow Beeswax', 'cleared', METH.beeswax),
      flag(BIOTIN_10K_90_PANEL, 'Titanium Dioxide Color', 'high', METH.tio2),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Opened https://naturesbounty.com/products/biotin-10000-mcg-softgels — Serving size 1 Softgel. Servings per container 90. Other ingredients: soybean oil, gelatin, vegetable glycerin, yellow beeswax, titanium dioxide color. Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-5886-55 — HTTP 200, data[] empty (no SPL for NDC 74312-5886-55). Opened https://www.target.com/s?searchTerm=nature%27s+bounty+biotin+10000+90 — no 90-count PDP with price in fetch. Opened https://www.cvs.com/search?searchTerm=074312588655 — BLOCKED HTTP 403 Access Denied. Opened https://www.walgreens.com/store/c/productlist/nature's-bounty-optimal-solutions-hair,-skin-&-nails-supplements/N=361599-367668 — Optimal Solutions Biotin 10,000 mcg Softgels - 90 ea at $16.99 with Add to cart. Opened https://www.amazon.com/s?k=074312588655 — HTTP 200 search; no parsed buy box. Opened https://www.walmart.com/search?q=074312588655 — BLOCKED HTTP 200 (robot check / forbidden). Opened https://www.google.com/search?q=074312588655+biotin+10000+90 — minimal content; corroborating page: https://www.walgreens.com/store/c/productlist/nature's-bounty-optimal-solutions-hair,-skin-&-nails-supplements/N=361599-367668.",
    ],
  },
];

const ROWS = BATCH194_KYR6C_NB_BIOTIN_90;

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

if (ROWS.length !== 1) throw new Error(`batch194 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch194 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch194 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch194 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch194 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch194 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch194 verdict ${record.id}`);
}
