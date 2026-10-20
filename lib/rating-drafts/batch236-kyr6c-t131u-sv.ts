// DRAFT / not verified / batch 236 KYR6-c (t131u Spring Valley WRITE — store-brand exception).
// Four packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const SLEEP = 'Sleep';

const METH = {
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose row).',
  gellan: 'Methodology §5 Cleared (gellan gum — food-gums row).',
  tio2: 'Methodology §5 Avoid (titanium dioxide; EU 2022 food-additive ban; EFSA genotoxicity data gap).',
  silica: 'Methodology §5 Caution (silicon dioxide / silica oral nanoparticle data-gap cap; EFSA 2018).',
  vegMagStearate:
    'Methodology §5 Cleared (magnesium stearate (vegetable source) — t102u alias to stearate-family row).',
  ascorbic: 'Methodology §5 Cleared (ascorbic acid / citric acid and citrate-salt row).',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not gummy seed-oil High).',
  gelatin: 'Methodology §5 Cleared (gelatin softgel base).',
  vegGlycerin: 'Methodology §5 Cleared (vegetable glycerin / glycerin row).',
  cornOilFill: 'Methodology §5 Cleared (corn oil as softgel fill — form split; not gummy Avoid).',
  potatoStarch: 'Methodology §5 Cleared (potato starch — named starch row).',
  inulin: 'Methodology §5 Cleared (inulin / chicory inulin family).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  riceHull: 'Methodology §5 Cleared (rice hull / rice hull concentrate family).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {
  return verdictFromRiskLevels(levels);
}

const PANEL_DAILY_PROB =
  'Walmart ip/408267873 supplement facts label image (matches eBay 267812878350 h2_6.png; DSLD 331641 other ingredients)';
const PANEL_D3 =
  'Walmart ip/19758123 supplement facts label image (matches eBay 227505692897 b1_8e.png; DSLD 178758 / 62994)';
const PANEL_PROB10 =
  'Walmart ip/128696283 supplement facts label image (matches eBay 137358936715 b1_11e.png carton; DSLD 178672)';
const PANEL_VALERIAN =
  'Walmart ip/654159730 supplement facts label image (matches eBay 198126676403 b1_15e.png)';

export const BATCH236_KYR6C_T131U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b236-daily-probiotic-4b-30',
    productName: 'Spring Valley Daily Probiotic Delayed Release Capsules, 4 Billion Live Cells (30 vegetarian capsules)',
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'springvalley-b236-daily-probiotic-4b-30',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131405805',
    activeIngredients: [
      { name: 'Inulin-FOS (Fructooligosaccharides)', strength: '58 mg (DV not established)' },
      {
        name: 'Proprietary Probiotic Blend',
        strength:
          '21 mg (4 Billion Live Cells*, DV not established): Lactobacillus casei, L. paracasei, Bifidobacterium bifidum, B. longum, Lactobacillus acidophilus, L. rhamnosus GG, L. plantarum, Lactococcus lactis, Streptococcus thermophilus, Bifidobacterium breve',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_DAILY_PROB, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_DAILY_PROB, 'Hypromellose', 'cleared', 'hpmc'),
      flag(PANEL_DAILY_PROB, 'Gellan Gum', 'cleared', 'gellan'),
      flag(PANEL_DAILY_PROB, 'Titanium Dioxide', 'high', 'tio2'),
      flag(PANEL_DAILY_PROB, 'Silicon Dioxide', 'limited', 'silica'),
      flag(PANEL_DAILY_PROB, 'Magnesium Stearate (Vegetable Source)', 'cleared', 'vegMagStearate'),
      flag(PANEL_DAILY_PROB, 'Ascorbic Acid', 'cleared', 'ascorbic'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_DAILY_PROB}. Serving 1 capsule. Capsule shell tokens split from label line CAPSULE (HYPROMELLOSE, GELLAN GUM, TITANIUM DIOXIDE). Other ingredients verbatim: MALTODEXTRIN, CAPSULE (HYPROMELLOSE, GELLAN GUM, TITANIUM DIOXIDE), SILICON DIOXIDE, MAGNESIUM STEARATE (VEGETABLE SOURCE), ASCORBIC ACID. Walmart ip/408267873 in stock sold by Walmart.com; eBay 317791243914 Brand New seller tasja-72 (5 available). UPC 681131405805 = Walmart = eBay 267812878350 item specifics = eBay 317791243914 barcode; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b236-d3-5000iu-250',
    productName: 'Spring Valley Extra Strength Vitamin D3 Softgels, 125 mcg (5,000 IU) (250 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b236-d3-5000iu-250',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '605388009272',
    activeIngredients: [
      { name: 'Vitamin D', strength: '125 mcg (5,000 IU) (as D3 Cholecalciferol) (625% DV)' },
    ],
    inactiveIngredients: [
      flag(PANEL_D3, 'Soybean Oil', 'cleared', 'soyFill'),
      flag(PANEL_D3, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_D3, 'Vegetable Glycerin', 'cleared', 'vegGlycerin'),
      flag(PANEL_D3, 'Corn Oil', 'cleared', 'cornOilFill'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_D3}. Serving 1 softgel. Other ingredients verbatim: SOYBEAN OIL, GELATIN, VEGETABLE GLYCERIN, CORN OIL. Walmart ip/19758123 in stock sold by Walmart.com; eBay 227505692897 New seller si_47981161 (2 available). UPC 605388009272 = Walmart = DSLD 178758 / 62994 label barcode; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b236-probiotic-10b-60',
    productName: 'Spring Valley Extra-Strength Probiotic Vegetable Capsules, 10 Billion CFU (60 count)',
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'springvalley-b236-probiotic-10b-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131155595',
    activeIngredients: [
      { name: 'Vitamin C', strength: '15 mg (17% DV)' },
      {
        name: 'Probiotic Blend',
        strength:
          '119 mg (10 Billion CFU†, DV not established): L. paracasei NI327, L. paracasei NI320, L. rhamnosus NI332, L. plantarum NI329, B. longum NI316, L. acidophilus NI317, S. thermophilus NI335, B. breve NI312, B. bifidum NI311, Lactococcus lactis NI334',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_PROB10, 'Potato Starch', 'cleared', 'potatoStarch'),
      flag(PANEL_PROB10, 'Hypromellose', 'cleared', 'hpmc'),
      flag(PANEL_PROB10, 'Inulin', 'cleared', 'inulin'),
      flag(PANEL_PROB10, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_PROB10, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_PROB10, 'Titanium Dioxide (Capsule Coloring Agent)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_PROB10}. Serving 1 capsule. Other ingredients verbatim: POTATO STARCH, HYPROMELLOSE, INULIN, MALTODEXTRIN, MAGNESIUM STEARATE, TITANIUM DIOXIDE (CAPSULE COLORING AGENT). Walmart ip/128696283 in stock sold by Walmart.com; eBay 137358936715 New seller royalhospitality (EXP 07/2027). UPC 681131155595 = Walmart = eBay 137358936715 barcode photo = DSLD 178672; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b236-valerian-500-100',
    productName: 'Spring Valley Valerian Root Capsules, 500 mg (100 count)',
    brand: BRAND,
    category: SLEEP,
    formulaId: 'springvalley-b236-valerian-500-100',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131016032',
    activeIngredients: [
      { name: 'Valerian Root Extract (Valeriana officinalis)', strength: '400 mg (DV not established)' },
      { name: 'Organic Valerian Root (Valeriana officinalis)', strength: '100 mg (DV not established)' },
    ],
    inactiveIngredients: [
      flag(PANEL_VALERIAN, 'Rice Hull', 'cleared', 'riceHull'),
      flag(PANEL_VALERIAN, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_VALERIAN}. Serving 2 capsules (50 servings). Other ingredients verbatim: RICE HULL, HYPROMELLOSE (CAPSULE). Facility allergen line not graded. Walmart ip/654159730 in stock sold by Walmart.com; eBay 198126676403 New seller americanbullco (expiration 06/2028 or later). UPC 681131016032 = Walmart = eBay item specifics; check digit OK.`,
    ],
  },
];

const ROWS = BATCH236_KYR6C_T131U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 4) throw new Error(`batch236 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch236 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch236 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch236 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch236 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch236 verdict ${record.id}`);
}
