// DRAFT / not verified / batch 233 KYR6-c (t130u Spring Valley WRITE — store-brand exception).
// Three packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';
const PRENATAL = 'Prenatal';

const METH = {
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate mineral filler and buffer).',
  tricalcium: 'Methodology §5 Cleared (tricalcium phosphate / dicalcium phosphate mineral filler).',
  hpmc: 'Methodology §5 Cleared (hydroxypropyl methylcellulose / hypromellose / HPC; EFSA ADI not specified).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family; EFSA 2017).',
  cmcsodium:
    'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose gum / sodium CMC; EFSA 2017: no ADI needed).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant; EFSA 2018).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral tablet film coating).',
  povidone: 'Methodology §5 Cleared (povidone / PVP tablet binder; EFSA unlikely safety concern).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide oral nanoparticle data-gap cap; EFSA 2018).',
  starch: 'Methodology §5 Cleared (named starch filler row; t130u §4 natural-ingredient tie-break).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  citric: 'Methodology §5 Cleared (citric acid / citrate-salt row).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium / cellulose-family disintegrant).',
  poloxamer:
    'Methodology §5 Caution (poloxamer 182/407/338 family; PEG-style surfactant) + §4 t130u unnamed rule (bare Poloxamer — man-made, same Caution as named poloxamers; family lock L97).',
  polysorbate80: 'Methodology §5 Caution (polysorbate 80 — emerging gut-barrier / inflammation signal, 2023 study).',
  talc: 'Methodology §5 Avoid (talc — IARC Group 2A 2024; asbestos-contamination pathway; §0 override).',
  tio2: 'Methodology §5 Avoid (titanium dioxide as color; EU 2022 food-additive ban; EFSA genotoxicity data gap).',
  triethylCitrate: 'Methodology §5 Cleared (triethyl citrate coating plasticizer; not acetyl tributyl citrate).',
  glucoseSyrup: 'Methodology §5 Cleared (glucose syrup / cane sugar syrup sweetener row).',
  sugar:
    'Methodology §4 t130u unnamed rule + §5 Cleared (cane sugar L456 / sucrose t118u; Sugar takes better named-sugar option for this write).',
  gelatin: 'Methodology §5 Cleared (gelatin gummy base).',
  annatto: 'Methodology §5 Caution (annatto / Annatto Extract (Color) — E160b allergenic potential; EFSA norbixin ADI).',
  lactic: 'Methodology §5 Cleared (lactic acid / malic acid organic-acid lock).',
  naturalFlavors:
    'Methodology §4 t130u unnamed rule + §5 Cleared (named natural flavors do not dock; unnamed Natural Flavors takes better option for this write).',
  juiceColor:
    'Methodology §5 Cleared (fruit/vegetable juice concentrate as color; named juice-concentrate color row).',
  turmericColor: 'Methodology §5 Cleared (turmeric extract (color) / named plant-color row).',
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

const PANEL_B50 =
  'Walmart ip/22027161 supplement facts label image (matches eBay 297837687972 r3_b27e.png and DSLD 271351 ingredient list)';
const PANEL_CALMAG =
  'Walmart ip/10324581 supplement facts label image (matches eBay 147556983319 r3_b33e.png)';
const PANEL_PRENATAL =
  'Walmart ip/590277068 supplement facts label image (matches eBay 298499837391 r3_b35e.png)';

export const BATCH233_KYR6C_T130U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b233-b50-complex-timed-release-60',
    productName: 'Spring Valley Vitamin B-50 Complex Timed-Release (60 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b233-b50-complex-timed-release-60',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '078742009889',
    activeIngredients: [
      { name: 'Thiamin', strength: '50 mg (4,167% DV)' },
      { name: 'Riboflavin', strength: '50 mg (3,846% DV)' },
      { name: 'Niacin', strength: '50 mg (313% DV)' },
      { name: 'Vitamin B6', strength: '50 mg (2,941% DV)' },
      { name: 'Folate', strength: '680 mcg DFE (400 mcg folic acid) (170% DV)' },
      { name: 'Vitamin B12', strength: '50 mcg (2,083% DV)' },
      { name: 'Biotin', strength: '50 mcg (167% DV)' },
      { name: 'Pantothenic Acid', strength: '50 mg (1,000% DV)' },
      { name: 'Calcium', strength: '62 mg (5% DV)' },
    ],
    inactiveIngredients: [
      flag(PANEL_B50, 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag(PANEL_B50, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_B50, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PANEL_B50, 'Carboxymethylcellulose Sodium', 'cleared', 'cmcsodium'),
      flag(PANEL_B50, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_B50, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_B50, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(PANEL_B50, 'Povidone', 'cleared', 'povidone'),
      flag(PANEL_B50, 'Silica', 'limited', 'silica'),
      flag(PANEL_B50, 'Starch', 'cleared', 'starch'),
      flag(PANEL_B50, 'Tricalcium Phosphate', 'cleared', 'tricalcium'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_B50}. Timed-release tablet; serving 1 tablet. Actives on Supplement Facts; Thiamine Mononitrate, Pyridoxine Hydrochloride, D-Calcium Pantothenate, Riboflavin, Nicotinamide, Biotin, Cyanocobalamin and Folic Acid on the mixed ingredient line supply those actives and are not graded as other ingredients. Other ingredients graded: Dicalcium Phosphate, Hydroxypropyl Methylcellulose, Microcrystalline Cellulose, Carboxymethylcellulose Sodium, Magnesium Stearate, Maltodextrin, Polyvinyl Alcohol, Povidone, Silica, Starch, Tricalcium Phosphate. Walmart ip/22027161 in stock sold by Walmart.com; eBay 297837687972 Brand New seller KimbleandMarys. UPC 078742009889 = Walmart page data = DSLD 210332 label; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b233-calcium-magnesium-zinc-d3-250',
    productName: 'Spring Valley Calcium, Magnesium & Zinc plus Vitamin D3 (250 coated caplets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b233-calcium-magnesium-zinc-d3-250',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131742412',
    activeIngredients: [
      { name: 'Vitamin D', strength: '15 mcg (600 IU) (75% DV)' },
      { name: 'Calcium', strength: '1,000 mg (77% DV)' },
      { name: 'Magnesium', strength: '400 mg (95% DV)' },
      { name: 'Zinc', strength: '15 mg (136% DV)' },
    ],
    inactiveIngredients: [
      flag(PANEL_CALMAG, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_CALMAG, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(PANEL_CALMAG, 'Citric Acid', 'cleared', 'citric'),
      flag(PANEL_CALMAG, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_CALMAG, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_CALMAG, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_CALMAG, 'Poloxamer', 'limited', 'poloxamer'),
      flag(PANEL_CALMAG, 'Polysorbate 80', 'moderate', 'polysorbate80'),
      flag(PANEL_CALMAG, 'Talc', 'high', 'talc'),
      flag(PANEL_CALMAG, 'Titanium Dioxide (Color)', 'high', 'tio2'),
      flag(PANEL_CALMAG, 'Triethyl Citrate', 'cleared', 'triethylCitrate'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_CALMAG}. Serving 3 coated caplets (about 83 servings). Actives Calcium Carbonate, Magnesium Oxide, Cholecalciferol and Zinc Sulfate on the ingredient line supply Supplement Facts amounts and are not graded as other ingredients. Other ingredients verbatim (2% or less portion graded): Maltodextrin, Carnauba Wax, Citric Acid, Croscarmellose Sodium, Hydroxypropyl Methylcellulose, Magnesium Stearate, Poloxamer, Polysorbate 80, Talc, Titanium Dioxide (Color), Triethyl Citrate. Walmart ip/10324581 in stock sold by Walmart.com; eBay 147556983319 Brand New seller jamesjo26. UPC 681131742412 = Walmart = DSLD 26295; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b233-prenatal-adult-gummy-190',
    productName: 'Spring Valley Prenatal Multivitamin with DHA & Folic Acid Adult Gummy (190 gummies)',
    brand: BRAND,
    category: PRENATAL,
    formulaId: 'springvalley-b233-prenatal-adult-gummy-190',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131281331',
    activeIngredients: [
      { name: 'Calories', strength: '20' },
      { name: 'Total Carbohydrate', strength: '4 g (1%†)' },
      { name: 'Total Sugars', strength: '3 g' },
      { name: 'Includes Added Sugars', strength: '3 g (6%†)' },
      { name: 'Vitamin A (as Retinyl Palmitate)', strength: '650 mcg (50%)' },
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '20 mg (17%)' },
      { name: 'Vitamin D (as Cholecalciferol)', strength: '20 mcg (133%)' },
      { name: 'Vitamin E (as D-Alpha Tocopheryl Acetate)', strength: '19 mg (100%)' },
      { name: 'Niacin (as Inositol Niacinate)', strength: '18 mg (100%)' },
      { name: 'Vitamin B6 (as Pyridoxine Hydrochloride)', strength: '2 mg (100%)' },
      { name: 'Folate (as Folic Acid)', strength: '600 mcg DFE (360 mcg folic acid) (100%)' },
      { name: 'Vitamin B12 (as Cyanocobalamin)', strength: '2.8 mcg (100%)' },
      { name: 'Biotin', strength: '35 mcg (100%)' },
      { name: 'Iodine (as Potassium Iodide)', strength: '220 mcg (76%)' },
      { name: 'Zinc (as Zinc Chelate)', strength: '3.8 mg (29%)' },
      { name: 'Sodium', strength: '5 mg (<1%)' },
      { name: 'Omega-3 Fatty Acids (from Fish Oil)', strength: '70 mg (DV not established)' },
      { name: 'DHA', strength: '50 mg' },
      { name: 'EPA', strength: '10 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_PRENATAL, 'Glucose Syrup', 'cleared', 'glucoseSyrup'),
      flag(PANEL_PRENATAL, 'Sugar', 'cleared', 'sugar'),
      flag(PANEL_PRENATAL, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_PRENATAL, 'Annatto Extract (Color)', 'limited', 'annatto'),
      flag(PANEL_PRENATAL, 'Citric Acid', 'cleared', 'citric'),
      flag(PANEL_PRENATAL, 'Lactic Acid', 'cleared', 'lactic'),
      flag(PANEL_PRENATAL, 'Natural Flavors', 'cleared', 'naturalFlavors'),
      flag(PANEL_PRENATAL, 'Purple Carrot Juice Concentrate (Color)', 'cleared', 'juiceColor'),
      flag(PANEL_PRENATAL, 'Turmeric Extract (Color)', 'cleared', 'turmericColor'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_PRENATAL}. Serving 2 gummies (95 servings); % DV for pregnant or lactating women. Other ingredients verbatim: GLUCOSE SYRUP, SUGAR, GELATIN; CONTAINS < 2% OF: ANNATTO EXTRACT (COLOR), CITRIC ACID, LACTIC ACID, NATURAL FLAVORS, PURPLE CARROT JUICE CONCENTRATE (COLOR), TURMERIC EXTRACT (COLOR). Contains fish (omega-3 from fish oil). Walmart ip/590277068 in stock sold by Walmart.com; eBay 298499837391 Brand New seller vigorvibe6. UPC 681131281331 = Walmart = DSLD 271350 label barcode; check digit OK.`,
    ],
  },
];

const ROWS = BATCH233_KYR6C_T130U_SV;

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

if (ROWS.length !== 3) throw new Error(`batch233 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch233 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 0 || verdictTally.caution !== 2 || verdictTally.avoid !== 1) {
  throw new Error(`batch233 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch233 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch233 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch233 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch233 verdict ${record.id}`);
}
