// DRAFT / not verified / batch 241 KYR6-c (t132u Spring Valley WRITE — store-brand exception).
// Three packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';

const METH = {
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  starch: 'Methodology §5 Cleared (named starch / bare starch filler row).',
  cmcsodium: 'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose-family row).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium / cellulose-family disintegrant).',
  dlTartaric:
    'Methodology §5 Cleared (DL-Tartaric Acid — founder lock t132u Oct 20, 2026; tartaric acid / organic acid row).',
  hpmc: 'Methodology §5 Cleared (hydroxypropyl methylcellulose / HPMC row).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral tablet film coating).',
  povidone: 'Methodology §5 Cleared (povidone / PVP tablet binder).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide oral nanoparticle data-gap cap).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  tricalcium: 'Methodology §5 Cleared (tricalcium phosphate / dicalcium phosphate mineral filler).',
  soyHighlyRefined:
    'Methodology §5 Cleared (Soybean Oil (Highly Refined) — founder lock t132u Oct 20, 2026; non-gummy softgel fill).',
  gelatin: 'Methodology §5 Cleared (gelatin softgel / capsule base).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin row).',
  purifiedWater: 'Methodology §5 Cleared (purified water / water family).',
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

const PANEL_SUPER_B_100 =
  'Walmart ip/40775779 supplement facts label image (matches eBay 188120694810 b1_2e.png; DSLD 239723)';
const PANEL_SUPER_B_250 =
  'Walmart ip/40775780 supplement facts label image (matches eBay 800792641404 b1_3e.png; DSLD 83056)';
const PANEL_D3_450 =
  'Walmart ip/2358181709 supplement facts label image (matches eBay 127958757974 b1_7e.png; UPC corroborated eBay 267812874829 b2_B7e.png)';

const SUPER_B_COMPLEX_ACTIVES = [
  { name: 'Vitamin C', strength: '150 mg (167% DV), as ascorbic acid' },
  { name: 'Thiamin', strength: '100 mg (8,333% DV), as thiamine mononitrate' },
  { name: 'Riboflavin', strength: '20 mg (1,538% DV)' },
  { name: 'Niacin', strength: '25 mg (156% DV), as nicotinamide' },
  { name: 'Vitamin B6', strength: '2 mg (118% DV), as pyridoxine hydrochloride' },
  { name: 'Folate', strength: '680 mcg DFE (170% DV), as 400 mcg folic acid' },
  { name: 'Vitamin B12', strength: '15 mcg (625% DV), as cyanocobalamin' },
  { name: 'Biotin', strength: '30 mcg (100% DV)' },
  { name: 'Pantothenic Acid', strength: '5.5 mg (110% DV), as d-calcium pantothenate' },
  { name: 'Calcium', strength: '70 mg (5% DV), from calcium carbonate' },
] as const;

function superBComplexInactive(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
    flag(panel, 'Starch', 'cleared', 'starch'),
    flag(panel, 'Carboxymethylcellulose Sodium', 'cleared', 'cmcsodium'),
    flag(panel, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
    flag(panel, 'DL-Tartaric Acid', 'cleared', 'dlTartaric'),
    flag(panel, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
    flag(panel, 'Magnesium Stearate', 'cleared', 'magStearate'),
    flag(panel, 'Maltodextrin', 'limited', 'maltodextrin'),
    flag(panel, 'Polyvinyl Alcohol', 'cleared', 'pva'),
    flag(panel, 'Povidone', 'cleared', 'povidone'),
    flag(panel, 'Silica', 'limited', 'silica'),
    flag(panel, 'Stearic Acid', 'cleared', 'stearic'),
    flag(panel, 'Tricalcium Phosphate', 'cleared', 'tricalcium'),
  ];
}

export const BATCH241_KYR6C_T132U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b241-super-b-complex-100',
    productName: 'Spring Valley Super Vitamin B-Complex (100 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b241-super-b-complex-100',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131086479',
    activeIngredients: [...SUPER_B_COMPLEX_ACTIVES],
    inactiveIngredients: superBComplexInactive(PANEL_SUPER_B_100),
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u/t132u). Panel ${PANEL_SUPER_B_100}. Serving 1 tablet (100 servings). Calcium carbonate, ascorbic acid, thiamine mononitrate, nicotinamide, riboflavin, biotin, cyanocobalamin, d-calcium pantothenate, folic acid, and pyridoxine hydrochloride on the ingredient line supply Supplement Facts actives and are not graded as other ingredients. Other ingredients graded from the <2% portion: Microcrystalline Cellulose, Starch, Carboxymethylcellulose Sodium, Croscarmellose Sodium, DL-Tartaric Acid, Hydroxypropyl Methylcellulose, Magnesium Stearate, Maltodextrin, Polyvinyl Alcohol, Povidone, Silica, Stearic Acid, Tricalcium Phosphate. Walmart ip/40775779 in stock sold by Walmart.com; eBay 188120694810 New seller bbs-market (9 available, no expiry stated). UPC 681131086479 = Walmart = DSLD 239723; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b241-super-b-complex-250',
    productName: 'Spring Valley Super Vitamin B-Complex (250 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b241-super-b-complex-250',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131086615',
    activeIngredients: [...SUPER_B_COMPLEX_ACTIVES],
    inactiveIngredients: superBComplexInactive(PANEL_SUPER_B_250),
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u/t132u). Panel ${PANEL_SUPER_B_250}. Serving 1 tablet (250 servings). Same ingredient list and locks as springvalley-b241-super-b-complex-100. Walmart ip/40775780 in stock sold by Walmart.com; eBay 800792641404 New seller theo_fulfillment (4 available, no expiry stated). UPC 681131086615 = Walmart = DSLD 83056; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b241-d3-1000iu-450',
    productName: 'Spring Valley Vitamin D3 Softgels, 25 mcg (1,000 IU) (450 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b241-d3-1000iu-450',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '194346065332',
    activeIngredients: [
      {
        name: 'Vitamin D',
        strength: '25 mcg (1,000 IU) (125% DV), as D3 (cholecalciferol)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_D3_450, 'Soybean Oil (Highly Refined)', 'cleared', 'soyHighlyRefined'),
      flag(PANEL_D3_450, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_D3_450, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_D3_450, 'Purified Water', 'cleared', 'purifiedWater'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u/t132u). Panel ${PANEL_D3_450}. Serving 1 softgel (450 servings). New pack UPC 194346065332 (replaces closed UPC 605388009241 / DSLD 178720, 62986). Cholecalciferol on the <2% line supplies Supplement Facts Vitamin D and is not graded as an other ingredient. Other ingredients verbatim: SOYBEAN OIL (HIGHLY REFINED), GELATIN, GLYCERIN, PURIFIED WATER. CONTAINS < 2% OF: CHOLECALCIFEROL. Walmart ip/2358181709 in stock sold by Walmart.com; eBay 127958757974 New seller fmoutreachusa (more than 10 available, no expiry stated). UPC 194346065332 = Walmart = eBay 267812874829 item specifics; check digit OK.`,
    ],
  },
];

const ROWS = BATCH241_KYR6C_T132U_SV;

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

if (ROWS.length !== 3) throw new Error(`batch241 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch241 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 1 || verdictTally.caution !== 2 || verdictTally.avoid !== 0) {
  throw new Error(`batch241 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch241 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch241 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch241 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch241 verdict ${record.id}`);
}
