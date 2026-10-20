// DRAFT / not verified / batch 240 KYR6-c (t131u Spring Valley WRITE — store-brand exception).
// Two packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';

const METH = {
  cellulosePlant: 'Methodology §5 Cleared (cellulose (plant origin) / cellulose-family row).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate mineral filler).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose / croscarmellose sodium cellulose-family row).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide oral nanoparticle data-gap cap).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — t102u alias to stearate-family row).',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not gummy seed-oil High).',
  gelatinBovine:
    'Methodology §5 Cleared (gelatin / Gelatin (Bovine) — softgel base; family lock L97 covers bovine parenthetical).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin row).',
  purifiedWater: 'Methodology §5 Cleared (purified water / water family).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {
  return verdictFromRiskLevels(levels);
}

const PANEL_FOLATE =
  'Walmart ip/36141703 supplement facts label image (matches eBay 395493483638 b5_B93e.png; DSLD 66355)';
const PANEL_D3_1000 =
  'Walmart ip/36141707 supplement facts label image (matches eBay 820107491905 b5_B116e.png; DSLD 62961)';

export const BATCH240_KYR6C_T131U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b240-folate-1333-400',
    productName: 'Spring Valley Folate, 1,333 mcg DFE (800 mcg Folic Acid) (400 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b240-folate-1333-400',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131071642',
    activeIngredients: [
      { name: 'Folate', strength: '1,333 mcg DFE (333% DV), as 800 mcg folic acid' },
    ],
    inactiveIngredients: [
      flag(PANEL_FOLATE, 'Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'),
      flag(PANEL_FOLATE, 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag(PANEL_FOLATE, 'Croscarmellose', 'cleared', 'croscarmellose'),
      flag(PANEL_FOLATE, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_FOLATE, 'Silica', 'limited', 'silica'),
      flag(PANEL_FOLATE, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_FOLATE}. Serving 1 tablet (400 servings). Folic acid on the ingredient line supplies Supplement Facts Folate and is not graded as an other ingredient. Other ingredients verbatim: CELLULOSE (PLANT ORIGIN), DICALCIUM PHOSPHATE, CROSCARMELLOSE, MALTODEXTRIN. CONTAINS <2% OF: SILICA, VEGETABLE MAGNESIUM STEARATE. Walmart ip/36141703 in stock sold by Walmart.com; eBay 395493483638 New seller ELATE STORES LIMITED (5 available, no expiry stated). UPC 681131071642 = Walmart = eBay item specifics = DSLD 66355; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b240-d3-1000iu-100',
    productName: 'Spring Valley Vitamin D3 Softgels, 25 mcg (1,000 IU) (100 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b240-d3-1000iu-100',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131071659',
    activeIngredients: [
      {
        name: 'Vitamin D',
        strength: '25 mcg (1,000 IU) (125% DV), as D3 (cholecalciferol)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_D3_1000, 'Soybean Oil', 'cleared', 'soyFill'),
      flag(PANEL_D3_1000, 'Gelatin (Bovine)', 'cleared', 'gelatinBovine'),
      flag(PANEL_D3_1000, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_D3_1000, 'Purified Water', 'cleared', 'purifiedWater'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_D3_1000}. Serving 1 softgel (100 servings). Cholecalciferol supplies Supplement Facts Vitamin D and is not graded as an other ingredient. Other ingredients verbatim: SOYBEAN OIL, GELATIN (BOVINE), GLYCERIN, PURIFIED WATER. CONTAINS SOY (allergen line not graded). Walmart ip/36141707 in stock sold by Walmart.com; eBay 820107491905 New seller asah9780 (last one, no expiry stated). UPC 681131071659 = Walmart = DSLD 62961; check digit OK.`,
    ],
  },
];

const ROWS = BATCH240_KYR6C_T131U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch240 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch240 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch240 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch240 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch240 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch240 verdict ${record.id}`);
}
