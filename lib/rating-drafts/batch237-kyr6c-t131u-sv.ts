// DRAFT / not verified / batch 237 KYR6-c (t131u Spring Valley WRITE — store-brand exception).
// Four packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';

const METH = {
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant; EFSA 2018).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant; EFSA 2018).',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not gummy seed-oil High).',
  gelatin: 'Methodology §5 Cleared (gelatin softgel / capsule base).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin row).',
  sunflowerLecithin: 'Methodology §5 Cleared (sunflower lecithin — lecithin family row).',
  whiteBeeswax: 'Methodology §5 Cleared (white beeswax — beeswax / wax row).',
  tio2: 'Methodology §5 Avoid (titanium dioxide as color; EU 2022 food-additive ban; EFSA genotoxicity data gap).',
  ricePowder:
    'Methodology §5 Caution (Rice Powder — exact token; distinct from Cleared rice hull / rice bran).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — t102u alias to stearate-family row).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide oral nanoparticle data-gap cap; EFSA 2018).',
  gelatinBovine:
    'Methodology §5 Cleared (gelatin / Gelatin (Bovine) — softgel base; family lock L97).',
  highOleicSafflower:
    'Methodology §5 Cleared (high oleic safflower oil as softgel fill / coating row).',
  water: 'Methodology §5 Cleared (water / purified water family).',
  oliveOilFill: 'Methodology §5 Cleared (extra virgin olive oil / pure olive oil as softgel fill).',
  mctUnlabeled:
    'Methodology §5 Limited (Medium Chain Triglycerides when no plant source named; t102u founder lock L25 → L414).',
  dAlphaTocopherol:
    'Methodology §5 Cleared (d-alpha tocopherol — mixed tocopherols / vitamin E antioxidant row).',
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

const PANEL_POTASSIUM =
  'Walmart ip/11047723 supplement facts label image (matches eBay 236796436749 b2_B1e.png; DSLD 210621 / 12198)';
const PANEL_CALCIUM =
  'Walmart ip/382004077 supplement facts label image (matches eBay 187146232081 b1_18e.png)';
const PANEL_ACV =
  'Walmart ip/49929248 supplement facts label image (matches eBay 227501916385 b1_19e.png)';
const PANEL_ASTAX =
  'Walmart ip/22027171 supplement facts label image (matches eBay 377519680688 b2_B37e.png; DSLD 211454 label image)';

export const BATCH237_KYR6C_T131U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b237-potassium-99-100',
    productName: 'Spring Valley Potassium Dietary Supplement Caplets, 99 mg (100 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b237-potassium-99-100',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131928878',
    activeIngredients: [{ name: 'Potassium', strength: '99 mg (2% DV), from potassium gluconate' }],
    inactiveIngredients: [
      flag(PANEL_POTASSIUM, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_POTASSIUM, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_POTASSIUM}. Serving 1 caplet. Potassium Gluconate supplies the Potassium active and is not graded as an other ingredient. Other ingredients verbatim: POTASSIUM GLUCONATE. CONTAINS < 2% OF: MAGNESIUM STEARATE, STEARIC ACID (graded). Walmart ip/11047723 in stock sold by Walmart.com; eBay 236796436749 New seller Real Brands Depot (expiration 04/2028). UPC 681131928878 = Walmart = DSLD 210621 / 12198; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b237-calcium-600-d3-150',
    productName:
      'Spring Valley Calcium Plus Vitamin D3, 600 mg / 12.5 mcg (500 IU) (150 mini softgels)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b237-calcium-600-d3-150',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131428262',
    activeIngredients: [
      { name: 'Vitamin D', strength: '12.5 mcg (500 IU) (as D3 Cholecalciferol) (63% DV)' },
      { name: 'Calcium', strength: '600 mg (as Calcium Carbonate) (46% DV)' },
    ],
    inactiveIngredients: [
      flag(PANEL_CALCIUM, 'Soybean Oil', 'cleared', 'soyFill'),
      flag(PANEL_CALCIUM, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_CALCIUM, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_CALCIUM, 'Sunflower Lecithin', 'cleared', 'sunflowerLecithin'),
      flag(PANEL_CALCIUM, 'White Beeswax', 'cleared', 'whiteBeeswax'),
      flag(PANEL_CALCIUM, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_CALCIUM}. Serving 2 mini softgels (75 servings). Actives calcium carbonate and cholecalciferol ungraded. Other ingredients verbatim: SOYBEAN OIL, GELATIN, GLYCERIN, SUNFLOWER LECITHIN, WHITE BEESWAX, TITANIUM DIOXIDE (COLOR). Contains soy (allergen line not graded). Walmart ip/382004077 in stock sold by Walmart.com; eBay 187146232081 New seller shoppers_source (3 available). UPC 681131428262 = Walmart = eBay 389103766031 item specifics; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b237-acv-450-100',
    productName: 'Spring Valley Apple Cider Vinegar Dietary Supplement Capsules, 450 mg (100 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b237-acv-450-100',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131125321',
    activeIngredients: [
      { name: 'Apple Cider Vinegar Powder', strength: '450 mg (DV not established)' },
    ],
    inactiveIngredients: [
      flag(PANEL_ACV, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_ACV, 'Rice Powder', 'limited', 'ricePowder'),
      flag(PANEL_ACV, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
      flag(PANEL_ACV, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_ACV}. Serving 1 capsule (100 servings). Other ingredients verbatim: GELATIN, RICE POWDER, VEGETABLE MAGNESIUM STEARATE, SILICA. Walmart ip/49929248 in stock sold by Walmart.com; eBay 227501916385 New seller si_47981161 (expiration 9/27, in date). UPC 681131125321 = Walmart = eBay 196743685848 / 175394111142 item specifics; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b237-astaxanthin-4mg-30',
    productName: 'Spring Valley Astaxanthin, 4 mg (30 softgels)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b237-astaxanthin-4mg-30',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '605388009319',
    activeIngredients: [
      {
        name: 'Astaxanthin',
        strength: '4 mg (DV not established), extract of Haematococcus pluvialis (algae)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_ASTAX, 'Gelatin (Bovine)', 'cleared', 'gelatinBovine'),
      flag(PANEL_ASTAX, 'High Oleic Safflower Oil', 'cleared', 'highOleicSafflower'),
      flag(PANEL_ASTAX, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_ASTAX, 'Water', 'cleared', 'water'),
      flag(PANEL_ASTAX, 'Extra Virgin Olive Oil', 'cleared', 'oliveOilFill'),
      flag(PANEL_ASTAX, 'Medium Chain Triglycerides', 'limited', 'mctUnlabeled'),
      flag(PANEL_ASTAX, 'D-Alpha Tocopherol', 'cleared', 'dAlphaTocopherol'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_ASTAX}. Serving 1 softgel. Other ingredients verbatim: GELATIN (BOVINE), HIGH OLEIC SAFFLOWER OIL, GLYCERIN, WATER, EXTRA VIRGIN OLIVE OIL, MEDIUM CHAIN TRIGLYCERIDES, D-ALPHA TOCOPHEROL. Walmart ip/22027171 in stock sold by Walmart.com; eBay 377519680688 New seller special_spice (expiration 07/2027 or later). UPC 605388009319 = Walmart = DSLD 211454 label barcode; check digit OK.`,
    ],
  },
];

const ROWS = BATCH237_KYR6C_T131U_SV;

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

if (ROWS.length !== 4) throw new Error(`batch237 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch237 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 1 || verdictTally.caution !== 2 || verdictTally.avoid !== 1) {
  throw new Error(`batch237 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch237 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch237 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch237 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch237 verdict ${record.id}`);
}
