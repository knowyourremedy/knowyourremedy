// DRAFT / not verified / batch 235 KYR6-c (t130u Spring Valley WRITE — store-brand exception).
// Two packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';

const METH = {
  gelatinBovine:
    'Methodology §5 Cleared (gelatin / Gelatin (Bovine) — softgel base; family lock L97 covers bovine parenthetical).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin softgel plasticizer row).',
  purifiedWater: 'Methodology §5 Cleared (purified water / water family).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family; EFSA 2017).',
  bamboo:
    'Methodology §5 Caution (bamboo extract — organic bamboo extract row; NatureWise Sept 23, 2026 map L153).',
  calciumStearate: 'Methodology §5 Cleared (calcium stearate / stearate-family lubricant row).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant; EFSA 2018).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

const PANEL_EPO =
  'Walmart ip/5459814756 supplement facts label image (matches eBay 188057089190 r4_18e.png)';
const PANEL_CHROMIUM =
  'Walmart ip/730201398 supplement facts label image (matches eBay 318787684905 r4_11e.png and eBay 224115254899 r5_extra_b_chromium_e.png panel text)';

export const BATCH235_KYR6C_T130U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b235-evening-primrose-75',
    productName:
      "Spring Valley Evening Primrose Oil Women's Dietary Supplement, 1,000 mg (75 softgels)",
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b235-evening-primrose-75',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '194346254002',
    activeIngredients: [
      { name: 'Calories', strength: '10' },
      { name: 'Total Fat', strength: '1 g (1%**)' },
      { name: 'Polyunsaturated Fat', strength: '1 g (DV not established)' },
      {
        name: 'Evening Primrose Oil',
        strength:
          '1 g (1,000 mg) (DV not established), providing Cis-Linoleic Acid (LA) 730 mg and Gamma-Linolenic Acid (GLA) 90 mg (DV not established)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_EPO, 'Gelatin (Bovine)', 'cleared', 'gelatinBovine'),
      flag(PANEL_EPO, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_EPO, 'Purified Water', 'cleared', 'purifiedWater'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_EPO}. Serving 1 softgel; suggested use adults one softgel three times daily. Other ingredients verbatim: GELATIN (BOVINE), GLYCERIN, PURIFIED WATER. Distinct from old pack UPC 681131633116 (out of stock). Walmart ip/5459814756 in stock sold by Walmart.com; eBay 188057089190 Brand New seller shoppers_source (5 available). UPC 194346254002 = Walmart = eBay 267812878351 item specifics; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b235-chromium-1000-100',
    productName: 'Spring Valley Chromium Metabolism Support, 1,000 mcg (100 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b235-chromium-1000-100',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131355179',
    activeIngredients: [{ name: 'Chromium', strength: '1,000 mcg (2,857% DV), as chromium picolinate' }],
    inactiveIngredients: [
      flag(PANEL_CHROMIUM, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PANEL_CHROMIUM, 'Bamboo Extract', 'limited', 'bamboo'),
      flag(PANEL_CHROMIUM, 'Calcium Stearate', 'cleared', 'calciumStearate'),
      flag(PANEL_CHROMIUM, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_CHROMIUM}. Serving 1 tablet. Chromium Picolinate supplies the Chromium active and is not graded as an other ingredient. Ingredients verbatim: Microcrystalline Cellulose, Chromium Picolinate. Contains 2% or less of Bamboo Extract, Calcium Stearate, Stearic Acid. Successor pack distinct from closed UPC 681131312684. Walmart ip/730201398 in stock sold by Walmart.com; eBay 318787684905 Brand New seller fit-flare (expiration 02/2027 or later). UPC 681131355179 = Walmart = eBay 224115254899 item specifics; check digit OK.`,
    ],
  },
];

const ROWS = BATCH235_KYR6C_T130U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  return verdictFromFlags(levels);
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch235 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch235 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 1 || verdictTally.caution !== 1 || verdictTally.avoid !== 0) {
  throw new Error(`batch235 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch235 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch235 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch235 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch235 verdict ${record.id}`);
}
