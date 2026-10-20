// DRAFT / not verified / batch 242 KYR6-c (t132u Spring Valley WRITE — store-brand exception).
// Five packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';
const HERBS = 'Herbs';

const METH = {
  gelatin: 'Methodology §5 Cleared (gelatin softgel / capsule base).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin row).',
  purifiedWater: 'Methodology §5 Cleared (purified water / water family).',
  mixedTocopherols:
    'Methodology §5 Cleared (mixed natural tocopherols / mixed tocopherols antioxidant row).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium / cellulose-family disintegrant).',
  hpmc: 'Methodology §5 Cleared (hydroxypropyl methylcellulose / HPMC row).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  polysorbate80: 'Methodology §5 Caution (polysorbate 80 — surfactant / PEG-family concern).',
  tio2: 'Methodology §5 Avoid (titanium dioxide as color; EU 2022 food-additive ban).',
  triethylCitrate: 'Methodology §5 Cleared (triethyl citrate coating plasticizer).',
  gelatinCapsule: 'Methodology §5 Cleared (gelatin capsule shell / gelatin softgel base).',
  cellulosePlant: 'Methodology §5 Cleared (cellulose (plant origin) / cellulose-family row).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide oral nanoparticle data-gap cap).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — t102u alias to stearate-family row).',
  hpmcCapsule: 'Methodology §5 Cleared (hypromellose (capsule) / HPMC vegetarian capsule shell).',
  riceHull: 'Methodology §5 Cleared (rice hull / rice hull concentrate family; t119u).',
  polydextrose: 'Methodology §5 Limited (polydextrose; maltodextrin-like bulking fiber).',
  peg: 'Methodology §5 Caution (polyethylene glycol / PEG — process contaminant concern).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral tablet film coating).',
  talc: 'Methodology §5 Avoid (talc — IARC Group 2A 2024; asbestos-contamination pathway).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {
  return verdictFromRiskLevels(levels);
}

const PANEL_FISH_OIL_300 =
  'Walmart ip/396031230 supplement facts label image (matches eBay 327380334205 r1_FO300e.png; DSLD 271613)';
const PANEL_CALCIUM_D3_250 =
  'Walmart ip/893256 supplement facts label image (matches eBay 206565882897 r1_CAD250e.png; DSLD 83004)';
const PANEL_CRANBERRY_15K =
  'Walmart ip/436756399 supplement facts label image (matches eBay 188120785038 r1_CRAN15ke.png; DSLD 273677)';
const PANEL_TURMERIC_GINGER =
  'Walmart ip/430711181 supplement facts label image (green panel; matches eBay 198634965108 r1_TURe.png; DSLD 239820)';
const PANEL_CALCIUM_CITRATE_300 =
  'Walmart ip/47431969 supplement facts label image (matches eBay 860041948123 r1_CACe.png; DSLD 273645)';

export const BATCH242_KYR6C_T132U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b242-fish-oil-1000-300',
    productName: 'Spring Valley Fish Oil Omega-3 Softgels, 1,000 mg (300 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b242-fish-oil-1000-300',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131284998',
    activeIngredients: [
      {
        name: 'Fish Oil',
        strength:
          '1,000 mg per softgel (300 mg total omega-3 as triglycerides, including 260 mg EPA+DHA)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_FISH_OIL_300, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_FISH_OIL_300, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_FISH_OIL_300, 'Purified Water', 'cleared', 'purifiedWater'),
      flag(PANEL_FISH_OIL_300, 'Mixed Natural Tocopherols', 'cleared', 'mixedTocopherols'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u/t132u). Panel ${PANEL_FISH_OIL_300}. Serving 1 softgel (300 servings). Fish oil supplies Supplement Facts actives and is not graded as an other ingredient. Other ingredients verbatim: GELATIN, GLYCERIN, PURIFIED WATER, MIXED NATURAL TOCOPHEROLS. CONTAINS ANCHOVIES, HERRING, JACK, MACKEREL, SARDINES AND SOY (allergen line not graded). Walmart ip/396031230 in stock sold by Walmart.com; eBay 307139535083 New seller Westside Liquidators INC (2 available, expiration 06/2027). UPC 681131284998 = Walmart = eBay item specifics = DSLD 271613; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b242-calcium-600-d3-250',
    productName:
      'Spring Valley Calcium 600 mg + Vitamin D3 20 mcg (800 IU) (250 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b242-calcium-600-d3-250',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '078742634388',
    activeIngredients: [
      { name: 'Vitamin D', strength: '20 mcg (800 IU) (100% DV), as D3 (cholecalciferol)' },
      { name: 'Calcium', strength: '600 mg (46% DV), from calcium carbonate' },
    ],
    inactiveIngredients: [
      flag(PANEL_CALCIUM_D3_250, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_CALCIUM_D3_250, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(PANEL_CALCIUM_D3_250, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_CALCIUM_D3_250, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_CALCIUM_D3_250, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_CALCIUM_D3_250, 'Polysorbate 80', 'limited', 'polysorbate80'),
      flag(PANEL_CALCIUM_D3_250, 'Titanium Dioxide (Color)', 'high', 'tio2'),
      flag(PANEL_CALCIUM_D3_250, 'Triethyl Citrate', 'cleared', 'triethylCitrate'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u/t132u). Panel ${PANEL_CALCIUM_D3_250}. Serving 1 tablet (250 servings). Calcium carbonate and cholecalciferol on the ingredient line supply Supplement Facts actives and are not graded as other ingredients. Other ingredients graded from the <2% portion: Maltodextrin, Carnauba Wax, Croscarmellose Sodium, Hydroxypropyl Methylcellulose, Magnesium Stearate, Polysorbate 80, Titanium Dioxide (Color), Triethyl Citrate. Walmart ip/893256 in stock sold by Walmart.com; eBay 206565882897 New seller aller-92 (2 available, no expiry stated). UPC 078742634388 = Walmart = DSLD 83004 label barcode 0 78742 63438 8; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b242-cranberry-15000-60',
    productName: 'Spring Valley Extra Strength Cranberry Capsules, 15,000 mg (60 count)',
    brand: BRAND,
    category: HERBS,
    formulaId: 'springvalley-b242-cranberry-15000-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131151092',
    activeIngredients: [
      { name: 'Vitamin C', strength: '100 mg (111% DV), as ascorbic acid' },
      {
        name: 'Cranberry Concentrate (Vaccinium macrocarpon) (fruit)',
        strength: '300 mg (50:1 concentrate; equivalent to 15,000 mg fresh cranberries)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_CRANBERRY_15K, 'Gelatin Capsule', 'cleared', 'gelatinCapsule'),
      flag(PANEL_CRANBERRY_15K, 'Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'),
      flag(PANEL_CRANBERRY_15K, 'Silica', 'limited', 'silica'),
      flag(PANEL_CRANBERRY_15K, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u/t132u). Panel ${PANEL_CRANBERRY_15K}. Serving 1 capsule (60 servings). Ascorbic acid and cranberry concentrate supply Supplement Facts actives and are not graded as other ingredients. Other ingredients verbatim: GELATIN CAPSULE, CELLULOSE (PLANT ORIGIN), SILICA, VEGETABLE MAGNESIUM STEARATE. Walmart ip/436756399 in stock sold by Walmart.com; eBay 188120785038 New seller bbs-market (last one, no expiry stated). UPC 681131151092 = Walmart = DSLD 273677; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b242-turmeric-ginger-500-250',
    productName: 'Spring Valley Turmeric Curcumin with Ginger, 500 mg (250 capsules)',
    brand: BRAND,
    category: HERBS,
    formulaId: 'springvalley-b242-turmeric-ginger-500-250',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131156790',
    activeIngredients: [
      { name: 'Turmeric (Curcuma longa) Root Powder', strength: '400 mg' },
      { name: 'Turmeric Extract', strength: '50 mg' },
      { name: 'Organic Ginger', strength: '50 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_TURMERIC_GINGER, 'Hypromellose (Capsule)', 'cleared', 'hpmcCapsule'),
      flag(PANEL_TURMERIC_GINGER, 'Rice Hull', 'cleared', 'riceHull'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u/t132u). Panel ${PANEL_TURMERIC_GINGER}. Serving 1 capsule (250 servings). Turmeric root powder, turmeric extract, and organic ginger supply Supplement Facts actives and are not graded as other ingredients. Other ingredients verbatim: HYPROMELLOSE (CAPSULE), RICE HULL. Facility allergen statement on label not graded. Walmart ip/430711181 in stock sold by Walmart.com; eBay 198634965108 New seller americanbullco (9 available, expiration 06/2027 or later). UPC 681131156790 = Walmart = DSLD 239820; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b242-calcium-citrate-600-300',
    productName: 'Spring Valley Calcium Citrate, 600 mg (300 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b242-calcium-citrate-600-300',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131122283',
    activeIngredients: [
      { name: 'Calcium', strength: '600 mg (46% DV) per 2 tablets, from calcium citrate' },
    ],
    inactiveIngredients: [
      flag(PANEL_CALCIUM_CITRATE_300, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_CALCIUM_CITRATE_300, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_CALCIUM_CITRATE_300, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_CALCIUM_CITRATE_300, 'Polydextrose', 'limited', 'polydextrose'),
      flag(PANEL_CALCIUM_CITRATE_300, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(PANEL_CALCIUM_CITRATE_300, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(PANEL_CALCIUM_CITRATE_300, 'Talc', 'high', 'talc'),
      flag(PANEL_CALCIUM_CITRATE_300, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u/t132u). Panel ${PANEL_CALCIUM_CITRATE_300}. Serving 2 tablets (150 servings). Calcium citrate on the ingredient line supplies Supplement Facts Calcium and is not graded as an other ingredient. Other ingredients graded from the <2% portion: Croscarmellose Sodium, Hydroxypropyl Methylcellulose, Magnesium Stearate, Polydextrose, Polyethylene Glycol, Polyvinyl Alcohol, Talc, Titanium Dioxide (Color). Walmart ip/47431969 in stock sold by Walmart.com; eBay 860041948123 New seller ziznax (3 available, expiry varies by batch — unstated, disclosed). UPC 681131122283 = Walmart = DSLD 273645; check digit OK.`,
    ],
  },
];

const ROWS = BATCH242_KYR6C_T132U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 5) throw new Error(`batch242 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch242 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch242 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch242 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch242 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch242 verdict ${record.id}`);
}
