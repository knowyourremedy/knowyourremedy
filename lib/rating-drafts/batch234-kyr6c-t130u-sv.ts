// DRAFT / not verified / batch 234 KYR6-c (t130u Spring Valley WRITE — store-brand exception).
// Five packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';

const METH = {
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family; EFSA 2017).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium / cellulose-family disintegrant).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant; EFSA 2018).',
  carnauba: 'Methodology §5 Caution (carnauba wax lock; founder Sept 25, 2026).',
  crospovidone: 'Methodology §5 Cleared (crospovidone / copovidone family; oral disintegrant).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant; EFSA 2018).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — t102u alias to magnesium stearate / stearate-family row).',
  vegStearic:
    'Methodology §5 Cleared (vegetable stearic acid — t102u alias to stearic acid / stearate-family row).',
  peg: 'Methodology §5 Caution (polyethylene glycol / PEG — ethylene-oxide / 1,4-dioxane process contaminant concern).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral tablet film coating).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide oral nanoparticle data-gap cap; EFSA 2018).',
  talc: 'Methodology §5 Avoid (talc — IARC Group 2A 2024; asbestos-contamination pathway; §0 override).',
  tio2: 'Methodology §5 Avoid (titanium dioxide as color; EU 2022 food-additive ban; EFSA genotoxicity data gap).',
  gelatin: 'Methodology §5 Cleared (gelatin capsule / softgel base).',
  vegGlycerin: 'Methodology §5 Cleared (vegetable glycerin / glycerin softgel plasticizer row).',
  mixedTocopherols:
    'Methodology §5 Cleared (mixed natural tocopherols / mixed tocopherols antioxidant row; family lock L97).',
  povidone: 'Methodology §5 Cleared (povidone / PVP tablet binder; EFSA unlikely safety concern).',
  hpmc: 'Methodology §5 Cleared (hydroxypropyl methylcellulose / HPMC — t102u alias to hypromellose row).',
  mctUnlabeled:
    'Methodology §5 Limited (unlabeled MCT — Medium Chain Triglycerides when no plant source named; t102u founder lock L25 → L414).',
  fdcBlue: 'Methodology §5 Avoid (FD&C Blue No. 1 Lake — synthetic dyes row L354; aluminum lake).',
  fdcYellow: 'Methodology §5 Avoid (FD&C Yellow No. 6 Lake — synthetic dyes row L354; azo dye).',
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

const PANEL_COLLAGEN =
  'Walmart ip/865121446 supplement facts label image (matches eBay 236790111827 r4_4e.png)';
const PANEL_NIACIN =
  'Walmart ip/10325001 supplement facts label image (matches eBay 188898411475 r4_5e.png and DSLD 240009)';
const PANEL_SALMON =
  'Walmart ip/11997235 supplement facts label image (matches eBay 398435104196 r4_17e.png)';
const PANEL_IRON =
  'Walmart ip/512235494 supplement facts label image (matches eBay 286976498578 r3_b34e.png and eBay 278214993658 r4_iron_label_e.png; DSLD 332691 ingredient list)';
const PANEL_COD =
  'Walmart ip/10533301 supplement facts label image (matches eBay 198555215347 panel r2_b17e.png; DSLD 62188 other ingredients)';

export const BATCH234_KYR6C_T130U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b234-collagen-c-90',
    productName: 'Spring Valley Highly Absorbable Collagen + C, 2,500 mg (90 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b234-collagen-c-90',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131151146',
    activeIngredients: [
      { name: 'Calories', strength: '15' },
      { name: 'Total Carbohydrate', strength: '<1 g (<1%**)' },
      { name: 'Protein', strength: '2 g' },
      { name: 'Vitamin C', strength: '60 mg (67% DV)' },
      { name: 'Sodium', strength: '25 mg (1% DV)' },
      {
        name: 'Verisol® Bioactive Collagen',
        strength: '2,500 mg (2.5 g), Type I and III Collagen (DV not established)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_COLLAGEN, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PANEL_COLLAGEN, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_COLLAGEN, 'Stearic Acid', 'cleared', 'stearic'),
      flag(PANEL_COLLAGEN, 'Carnauba Wax', 'limited', 'carnauba'),
      flag(PANEL_COLLAGEN, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(PANEL_COLLAGEN, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_COLLAGEN, 'Polyethylene Glycol', 'moderate', 'peg'),
      flag(PANEL_COLLAGEN, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(PANEL_COLLAGEN, 'Silica', 'limited', 'silica'),
      flag(PANEL_COLLAGEN, 'Talc', 'high', 'talc'),
      flag(PANEL_COLLAGEN, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_COLLAGEN}. Serving 3 tablets (30 servings). Collagen and Calcium Ascorbate on the ingredient line supply Supplement Facts actives and are not graded as other ingredients. Other ingredients graded: Microcrystalline Cellulose, Croscarmellose Sodium, Stearic Acid, Carnauba Wax, Crospovidone, Magnesium Stearate, Polyethylene Glycol, Polyvinyl Alcohol, Silica, Talc, Titanium Dioxide (Color). Walmart ip/865121446 in stock sold by Walmart.com; eBay 236790111827 Brand New seller Real Brands Depot. UPC 681131151146 = Walmart = DSLD 239842; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b234-flush-free-niacin-60',
    productName: 'Spring Valley Flush Free Niacin (Inositol Hexanicotinate), 500 mg (60 capsules)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b234-flush-free-niacin-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131633253',
    activeIngredients: [
      { name: 'Niacin (as Inositol Hexanicotinate)', strength: '400 mg (2,500% DV)' },
      { name: 'Inositol (as Inositol Hexanicotinate)', strength: '100 mg (DV not established)' },
    ],
    inactiveIngredients: [
      flag(PANEL_NIACIN, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_NIACIN, 'Vegetable Stearic Acid', 'cleared', 'vegStearic'),
      flag(PANEL_NIACIN, 'Silica', 'limited', 'silica'),
      flag(PANEL_NIACIN, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_NIACIN}. Serving 1 capsule. Other ingredients verbatim: GELATIN, VEGETABLE STEARIC ACID. CONTAINS <2% OF: SILICA, VEGETABLE MAGNESIUM STEARATE. Walmart ip/10325001 in stock sold by Walmart.com; eBay 188898411475 Brand New seller shoppers_source. UPC 681131633253 = Walmart = DSLD 240009 / 62953; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b234-norwegian-salmon-oil-120',
    productName: 'Spring Valley Norwegian Salmon Oil, 1,000 mg (120 softgels)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b234-norwegian-salmon-oil-120',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131312646',
    activeIngredients: [
      { name: 'Calories', strength: '20' },
      { name: 'Total Fat', strength: '2 g (3%††)' },
      { name: 'Saturated Fat', strength: '0.5 g (3%††)' },
      { name: 'Polyunsaturated Fat', strength: '1 g' },
      { name: 'Monounsaturated Fat', strength: '0.5 g' },
      { name: 'Cholesterol', strength: '10 mg (3%)' },
      {
        name: 'Salmon Oil',
        strength:
          '2 g (2,000 mg), 420 mg Total Omega-3 Fatty Acids† (EPA 150 mg, DHA 180 mg; other fatty acids DV not established). †As Natural Triglycerides',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_SALMON, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_SALMON, 'Vegetable Glycerin', 'cleared', 'vegGlycerin'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_SALMON}. Serving 2 softgels (60 servings). Other ingredients verbatim: GELATIN, VEGETABLE GLYCERIN. Contains fish (salmon). Older eBay yellow label (224100928072) prints Gelatin, Glycerin — same locked glycerin family (L526, L97); grade unchanged Clean. Walmart ip/11997235 in stock sold by Walmart.com; eBay 398435104196 Brand New seller jad-6793. UPC 681131312646 = Walmart = DSLD 72351 / 62980 / 60838 = eBay item specifics; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b234-iron-65-200',
    productName: 'Spring Valley Iron 65 mg (200 tablets, Value Size)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b234-iron-65-200',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131093712',
    activeIngredients: [
      {
        name: 'Iron',
        strength:
          '65 mg (361% DV); 200 mg Dried Ferrous Sulfate (65 mg elemental iron) equivalent to 325 mg Ferrous Sulfate per tablet',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_IRON, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PANEL_IRON, 'Povidone', 'cleared', 'povidone'),
      flag(PANEL_IRON, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(PANEL_IRON, 'FD&C Blue No. 1 Lake', 'high', 'fdcBlue'),
      flag(PANEL_IRON, 'FD&C Yellow No. 6 Lake', 'high', 'fdcYellow'),
      flag(PANEL_IRON, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_IRON, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_IRON, 'Medium Chain Triglycerides', 'limited', 'mctUnlabeled'),
      flag(PANEL_IRON, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(PANEL_IRON, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_IRON}. Serving 1 coated tablet. Ferrous Sulfate supplies the Iron active and is not graded as an other ingredient. Other ingredients graded: Microcrystalline Cellulose, Povidone, Crospovidone, FD&C Blue No. 1 Lake, FD&C Yellow No. 6 Lake, Hydroxypropyl Methylcellulose, Magnesium Stearate, Medium Chain Triglycerides (t102u unlabeled MCT Limited), Polyvinyl Alcohol, Titanium Dioxide (Color). Walmart ip/512235494 in stock sold by Walmart.com; eBay 286976498578 Brand New seller therel5kings. UPC 681131093712 = Walmart = eBay 278214993658 barcode photo; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b234-cod-liver-oil-ad-100',
    productName: 'Spring Valley Cod Liver Oil Plus Vitamins A & D3 (100 softgels)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b234-cod-liver-oil-ad-100',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '078742499086',
    activeIngredients: [
      { name: 'Cholesterol', strength: '<5 mg (<1%)' },
      { name: 'Vitamin A (as Retinyl Palmitate)', strength: '375 mcg (42% DV)' },
      { name: 'Vitamin D (as D3 Cholecalciferol)', strength: '3.37 mcg (135 IU) (17% DV)' },
      {
        name: 'Cod Liver Oil',
        strength:
          '415 mg, 90 mg Total Omega-3 Fatty Acids† (EPA 37 mg, DHA 36 mg; other fatty acids DV not established). †As Natural Triglycerides',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_COD, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_COD, 'Vegetable Glycerin', 'cleared', 'vegGlycerin'),
      flag(PANEL_COD, 'Mixed Natural Tocopherols', 'cleared', 'mixedTocopherols'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_COD}. Serving 1 softgel. Other ingredients verbatim: GELATIN, VEGETABLE GLYCERIN, MIXED NATURAL TOCOPHEROLS. Contains fish (cod). Walmart ip/10533301 in stock sold by Walmart.com; eBay 267812874854 Condition New single bottle seller 4lesscell1 (sale source). UPC 078742499086 = Walmart = DSLD 62188 / 12195 = eBay item specifics; check digit OK.`,
    ],
  },
];

const ROWS = BATCH234_KYR6C_T130U_SV;

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

if (ROWS.length !== 5) throw new Error(`batch234 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch234 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 2 || verdictTally.caution !== 1 || verdictTally.avoid !== 2) {
  throw new Error(`batch234 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch234 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch234 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch234 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch234 verdict ${record.id}`);
}
