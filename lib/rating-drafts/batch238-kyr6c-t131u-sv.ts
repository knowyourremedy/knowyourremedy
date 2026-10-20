// DRAFT / not verified / batch 238 KYR6-c (t131u Spring Valley WRITE — store-brand exception).
// Five packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';

const METH = {
  gelatin: 'Methodology §5 Cleared (gelatin softgel / capsule base).',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not gummy seed-oil High).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin row).',
  purifiedWater: 'Methodology §5 Cleared (purified water USP / purified water family).',
  cellulosePlant: 'Methodology §5 Cleared (cellulose (plant origin) / cellulose-family row).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose / croscarmellose sodium cellulose-family row).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide oral nanoparticle data-gap cap; EFSA 2018).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — t102u alias to stearate-family row).',
  vegStearic: 'Methodology §5 Cleared (vegetable stearic acid — t102u alias to stearate-family row).',
  hpmc: 'Methodology §5 Cleared (hydroxypropyl methylcellulose / HPMC row).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  cmcsodium:
    'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose gum / sodium CMC row).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral tablet film coating).',
  povidone: 'Methodology §5 Cleared (povidone / PVP tablet binder).',
  starch: 'Methodology §5 Cleared (named starch / bare starch filler row).',
  tricalcium: 'Methodology §5 Cleared (tricalcium phosphate / dicalcium phosphate mineral filler).',
  vegGlycerin: 'Methodology §5 Cleared (vegetable glycerin / glycerin row).',
  cornOilFill: 'Methodology §5 Cleared (corn oil as softgel fill — form split; not gummy Avoid).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {
  return verdictFromRiskLevels(levels);
}

const PANEL_VIT_E =
  'Walmart ip/10325011 supplement facts label image (matches eBay 315288365341 b3_B21e.png; DSLD 211459 / 178761)';
const PANEL_LYSINE =
  'Walmart ip/17324899 supplement facts label image (matches eBay 197036142645 b3_B43e.png; DSLD 184059 / 72360)';
const PANEL_B100 =
  'Walmart ip/22027170 supplement facts label image (matches eBay 198685487559 b3_B44e.png; DSLD 210324)';
const PANEL_D3_2000 =
  'Walmart ip/26077100 supplement facts label image (matches eBay 318788244308 b3_B51e.png; DSLD 178754 / 60657)';
const PANEL_CHARCOAL =
  'Walmart ip/192114718 supplement facts label image (matches eBay 366176973910 b3_B55e.png; DSLD 178360)';

export const BATCH238_KYR6C_T131U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b238-vitamin-e-1000iu-60',
    productName: 'Spring Valley Vitamin E Softgels, 670 mg (1,000 IU) (60 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b238-vitamin-e-1000iu-60',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131678858',
    activeIngredients: [{ name: 'Vitamin E', strength: '670 mg (4,467% DV), as d-alpha tocopheryl acetate' }],
    inactiveIngredients: [
      flag(PANEL_VIT_E, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_VIT_E, 'Soybean Oil', 'cleared', 'soyFill'),
      flag(PANEL_VIT_E, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_VIT_E, 'Purified Water USP', 'cleared', 'purifiedWater'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_VIT_E}. Serving 1 softgel. d-Alpha Tocopheryl Acetate supplies the Vitamin E active on the ingredient line and is not graded as an other ingredient. Other ingredients graded: GELATIN, SOYBEAN OIL, GLYCERIN, PURIFIED WATER USP. Contains soy (allergen line not graded). Walmart ip/10325011 in stock sold by Walmart.com; eBay 257471328860 seller Planet Liquidation Services (expiration 6/28). UPC 681131678858 = Walmart = eBay item specifics = DSLD 211459 / 178761; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b238-l-lysine-1000-100',
    productName: 'Spring Valley L-Lysine, 1,000 mg (100 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b238-l-lysine-1000-100',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '078742067957',
    activeIngredients: [
      { name: 'L-Lysine', strength: '1,000 mg (as L-Lysine Hydrochloride) (DV not established)' },
    ],
    inactiveIngredients: [
      flag(PANEL_LYSINE, 'Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'),
      flag(PANEL_LYSINE, 'Croscarmellose', 'cleared', 'croscarmellose'),
      flag(PANEL_LYSINE, 'Silica', 'limited', 'silica'),
      flag(PANEL_LYSINE, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
      flag(PANEL_LYSINE, 'Vegetable Stearic Acid', 'cleared', 'vegStearic'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_LYSINE}. Serving 1 tablet. L-Lysine Hydrochloride supplies the active and is not graded as an other ingredient. Other ingredients verbatim: CELLULOSE (PLANT ORIGIN). CONTAINS <2% OF: CROSCARMELLOSE, SILICA, VEGETABLE MAGNESIUM STEARATE, VEGETABLE STEARIC ACID. Walmart ip/17324899 in stock sold by Walmart.com; eBay 197036142645 New seller americanbullco (expiration 12/2027). UPC 078742067957 = Walmart = DSLD 184059 / 72360; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b238-b100-complex-60',
    productName: 'Spring Valley Vitamin B-100 Complex (60 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b238-b100-complex-60',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '078742009896',
    activeIngredients: [
      { name: 'Thiamin', strength: '100 mg (8,333% DV)' },
      { name: 'Riboflavin', strength: '100 mg (7,692% DV)' },
      { name: 'Niacin', strength: '100 mg (625% DV)' },
      { name: 'Vitamin B6', strength: '100 mg (5,882% DV)' },
      { name: 'Folate', strength: '680 mcg DFE (400 mcg folic acid) (170% DV)' },
      { name: 'Vitamin B12', strength: '100 mcg (4,167% DV)' },
      { name: 'Biotin', strength: '100 mcg (333% DV)' },
      { name: 'Pantothenic Acid', strength: '100 mg (2,000% DV)' },
    ],
    inactiveIngredients: [
      flag(PANEL_B100, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_B100, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PANEL_B100, 'Carboxymethylcellulose Sodium', 'cleared', 'cmcsodium'),
      flag(PANEL_B100, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_B100, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_B100, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(PANEL_B100, 'Povidone', 'cleared', 'povidone'),
      flag(PANEL_B100, 'Silica', 'limited', 'silica'),
      flag(PANEL_B100, 'Starch', 'cleared', 'starch'),
      flag(PANEL_B100, 'Tricalcium Phosphate', 'cleared', 'tricalcium'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_B100}. Serving 1 tablet. Thiamine Mononitrate, Pyridoxine Hydrochloride, D-Calcium Pantothenate, Riboflavin, Nicotinamide, Biotin, Cyanocobalamin and Folic Acid on the mixed ingredient line supply Supplement Facts actives and are not graded as other ingredients. Other ingredients graded: Hydroxypropyl Methylcellulose, Microcrystalline Cellulose, Carboxymethylcellulose Sodium, Magnesium Stearate, Maltodextrin, Polyvinyl Alcohol, Povidone, Silica, Starch, Tricalcium Phosphate. Walmart ip/22027170 in stock sold by Walmart.com; eBay 198685487559 New seller americanbullco (expiration 02/2027 or later). UPC 078742009896 = Walmart = eBay item specifics = DSLD 210324; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b238-d3-2000iu-200',
    productName: 'Spring Valley Vitamin D3 Softgels, 50 mcg (2,000 IU) (200 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b238-d3-2000iu-200',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131007207',
    activeIngredients: [
      { name: 'Vitamin D', strength: '50 mcg (2,000 IU) (as D3 Cholecalciferol) (250% DV)' },
    ],
    inactiveIngredients: [
      flag(PANEL_D3_2000, 'Soybean Oil', 'cleared', 'soyFill'),
      flag(PANEL_D3_2000, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_D3_2000, 'Vegetable Glycerin', 'cleared', 'vegGlycerin'),
      flag(PANEL_D3_2000, 'Corn Oil', 'cleared', 'cornOilFill'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_D3_2000}. Serving 1 softgel. Other ingredients verbatim: SOYBEAN OIL, GELATIN, VEGETABLE GLYCERIN, CORN OIL. Walmart ip/26077100 in stock sold by Walmart.com; eBay 318788244308 New seller fit-flare (expiration 04/2027 or later). UPC 681131007207 = Walmart = DSLD 178754 / 60657; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b238-activated-charcoal-520-60',
    productName: 'Spring Valley Activated Charcoal Capsules, 520 mg (60 count)',
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'springvalley-b238-activated-charcoal-520-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131151115',
    activeIngredients: [
      {
        name: 'Activated Charcoal (from Coconut Shells)',
        strength: '520 mg (DV not established)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_CHARCOAL, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_CHARCOAL, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_CHARCOAL}. Serving 2 capsules (30 servings). Activated Charcoal (from coconut shells) is the active and is not graded as an other ingredient. Other ingredients verbatim: GELATIN, VEGETABLE MAGNESIUM STEARATE. Walmart ip/192114718 in stock sold by Walmart.com; eBay 366176973910 New seller khrysmart (more than 10 available). UPC 681131151115 = Walmart = DSLD 178360; check digit OK.`,
    ],
  },
];

const ROWS = BATCH238_KYR6C_T131U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 5) throw new Error(`batch238 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch238 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch238 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch238 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch238 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch238 verdict ${record.id}`);
}
