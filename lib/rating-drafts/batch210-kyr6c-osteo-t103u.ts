// DRAFT / not verified / batch 210 KYR6-c (t103u WRITE).
// Osteo Bi-Flex store-only Triple Strength and One Per Day counts — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  calciumCarbonate: 'Methodology §5 Cleared (calcium carbonate as mineral salt / buffer).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  celluloseCoating:
    'Methodology §5 Cleared (cellulose-family / Cellulose Coating — t83u Oct 17, 2026).',
  cellulosePlant:
    'Methodology §5 Cleared (cellulose-family / Cellulose (Plant Origin) — t83u Oct 17, 2026).',
  croscarmellose:
    'Methodology §5 Cleared (croscarmellose sodium; Croscarmellose without sodium — t83u Oct 17, 2026).',
  crospovidone: 'Methodology §5 Cleared (crospovidone / povidone family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  mct: 'Methodology §5 Limited (unlabeled medium-chain triglycerides). No plant is named.',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_TS_40 =
  'https://www.cvs.com/bizcontent/merchandising/productimages/high_res/3076803120_6.jpg';
const PANEL_TS_120 =
  'https://www.walmart.com/ip/Osteo-Bi-Flex-Triple-Strength-Joint-Health-Supplements-with-Glucosamine-Chondroitin-Tablets-120-Ct/10312328';
const PANEL_TS_VITD_120 =
  'https://www.cvs.com/bizcontent/merchandising/productimages/high_res/3076819608_5.jpg';
const PANEL_OPD_60 =
  'https://www.walmart.com/ip/Osteo-Bi-Flex-One-Per-Day-Joint-Health-Dietary-Supplement-with-Glucosamine-Chondroitin-MSM-60-Count/43924653';

const TRIPLE_TS_FLAGS: FlagSpec[] = [
  ['Crospovidone', 'cleared', 'crospovidone'],
  ['Calcium Carbonate', 'cleared', 'calciumCarbonate'],
  ['Carnauba Wax', 'cleared', 'carnauba'],
  ['Cellulose Coating', 'cleared', 'celluloseCoating'],
  ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
  ['Medium Chain Triglycerides', 'limited', 'mct'],
  ['Polydextrose', 'limited', 'polydextrose'],
  ['Silica', 'limited', 'silica'],
  ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
];

const TRIPLE_VITD_FLAGS: FlagSpec[] = [
  ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
  ['Crospovidone', 'cleared', 'crospovidone'],
  ['Calcium Carbonate', 'cleared', 'calciumCarbonate'],
  ['Carnauba Wax', 'cleared', 'carnauba'],
  ['Cellulose Coating', 'cleared', 'celluloseCoating'],
  ['Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'],
  ['Medium Chain Triglycerides', 'limited', 'mct'],
  ['Polydextrose', 'limited', 'polydextrose'],
  ['Silica', 'limited', 'silica'],
  ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
];

const OPD_FLAGS: FlagSpec[] = [
  ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
  ['Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'],
  ['Croscarmellose', 'cleared', 'croscarmellose'],
  ['Cellulose Coating', 'cleared', 'celluloseCoating'],
  ['Calcium Carbonate', 'cleared', 'calciumCarbonate'],
  ['Carnauba Wax', 'cleared', 'carnauba'],
  ['Medium Chain Triglycerides', 'limited', 'mct'],
  ['Polydextrose', 'limited', 'polydextrose'],
  ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

const TRIPLE_STRENGTH_ACTIVES = [
  { name: 'Vitamin C', strength: '60 mg' },
  { name: 'Manganese', strength: '2 mg' },
  { name: 'Glucosamine HCl', strength: '1,500 mg' },
  { name: 'Joint Shield 5-LOXIN Advanced', strength: '100 mg' },
  { name: 'Chondroitin/MSM Complex', strength: '1,103 mg' },
] as const;

const TRIPLE_VITD_ACTIVES = [
  { name: 'Vitamin D', strength: '50 mcg' },
  { name: 'Glucosamine HCl', strength: '1,500 mg' },
  { name: 'Joint Shield 5-LOXIN Advanced', strength: '100 mg' },
  { name: 'Chondroitin/MSM Complex', strength: '275 mg' },
] as const;

const OPD_ACTIVES = [
  { name: 'Vitamin D', strength: '10 mcg' },
  { name: 'Glucosamine HCl', strength: '1,500 mg' },
  { name: 'Joint Shield 5-LOXIN Advanced', strength: '100 mg' },
] as const;

export const BATCH210_KYR6C_OSTEO_T103U: RatingRecord[] = [
  {
    id: 'osteo-b210-triple-strength-40',
    productName: 'Osteo Bi-Flex Triple Strength (40 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b210-triple-strength-40',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768031206',
    activeIngredients: [...TRIPLE_STRENGTH_ACTIVES],
    inactiveIngredients: buildOi(PANEL_TS_40, TRIPLE_TS_FLAGS),
    verdict: verdictFromFlags(TRIPLE_TS_FLAGS),
    retailers: ['Walmart', 'Thrifty White', 'Meijer'],
    sourcesGeneral: [
      `Store label images were read: Walmart carousel for Osteo Bi-Flex Triple Strength 40 ct and CVS high_res/3076803120_6. Serving size 2 tablets, 20 servings. Supplement Facts actives match osteo-b201-triple-strength-80 and are ungraded. Other ingredients: Crospovidone. Contains <2% of: Calcium Carbonate, Carnauba Wax, Cellulose Coating, Cellulose (Plant Origin), Medium Chain Triglycerides, Polydextrose, Silica, Vegetable Magnesium Stearate. Same OI line as osteo-b201-triple-strength-80. Walmart opened https://www.walmart.com/ip/Osteo-Bi-Flex-Triple-Strength-Joint-Health-Supplement-Glucosamine-Chondroitin-Coated-Tablets-40-Count/10312324 in stock, sold by Walmart.com. Thrifty White opened https://shop.thriftywhite.com/osteo-bi-flex-joint-health-coated-tablets-triple-strength-40-ct/ in stock. Meijer opened https://www.meijer.com/shopping/product/osteo-bi-flex/3076803120.html in stock. UPC 030768031206. Older Meijer, DSLD, and Walgreens box photos for the same UPCs may still show titanium dioxide and magnesium silicate; this row is graded from the current store-label line only.`,
    ],
  },
  {
    id: 'osteo-b210-triple-strength-120',
    productName: 'Osteo Bi-Flex Triple Strength (120 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b210-triple-strength-120',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768035785',
    activeIngredients: [...TRIPLE_STRENGTH_ACTIVES],
    inactiveIngredients: buildOi(PANEL_TS_120, TRIPLE_TS_FLAGS),
    verdict: verdictFromFlags(TRIPLE_TS_FLAGS),
    retailers: ['Walmart', 'Kroger', 'Thrifty White'],
    sourcesGeneral: [
      `Store label images were read: Kroger back panel and Walmart carousel for Osteo Bi-Flex Triple Strength 120 ct. Serving size 2 tablets, 60 servings. Supplement Facts actives match osteo-b201-triple-strength-80 and are ungraded. Other ingredients: Crospovidone. Contains <2% of: Calcium Carbonate, Carnauba Wax, Cellulose Coating, Cellulose (Plant Origin), Medium Chain Triglycerides, Polydextrose, Silica, Vegetable Magnesium Stearate. Same OI line as osteo-b201-triple-strength-80. Walmart opened https://www.walmart.com/ip/Osteo-Bi-Flex-Triple-Strength-Joint-Health-Supplements-with-Glucosamine-Chondroitin-Tablets-120-Ct/10312328 in stock. Kroger opened https://www.kroger.com/p/osteo-bi-flex-triple-strength-joint-health-supplement-glucosamine-chondroitin-coated-tablets/0003076803578 pickup available. Thrifty White opened https://shop.thriftywhite.com/osteo-bi-flex-triple-strength-caplets-120-ct/ in stock. UPC 030768035785.`,
    ],
  },
  {
    id: 'osteo-b210-triple-strength-vitd-120',
    productName: 'Osteo Bi-Flex Triple Strength with Vitamin D (120 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b210-triple-strength-vitd-120',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768196080',
    activeIngredients: [...TRIPLE_VITD_ACTIVES],
    inactiveIngredients: buildOi(PANEL_TS_VITD_120, TRIPLE_VITD_FLAGS),
    verdict: verdictFromFlags(TRIPLE_VITD_FLAGS),
    retailers: ['Walmart', 'Meijer'],
    sourcesGeneral: [
      `Store label images were read: Walmart carousel for Osteo Bi-Flex Triple Strength with Vitamin D 120 ct and CVS high_res/3076819608_5. Serving size 2 tablets, 60 servings. Supplement Facts actives match osteo-b201-triple-strength-vitd-80 and are ungraded. Other ingredients: Cellulose (Plant Origin), Crospovidone. Contains <2% of: Calcium Carbonate, Carnauba Wax, Cellulose Coating, Hydroxypropyl Methylcellulose, Medium Chain Triglycerides, Polydextrose, Silica, Vegetable Magnesium Stearate. Same OI line as osteo-b201-triple-strength-vitd-80. Walmart opened https://www.walmart.com/ip/Osteo-Bi-Flex-Glucosamine-Chondroitin-with-Vitamin-D-Joint-Health-Supplement-120-Coated-Tablets/43924652 in stock. Meijer opened https://www.meijer.com/shopping/product/osteo-bi-flex/3076819608.html in stock. UPC 030768196080.`,
    ],
  },
  {
    id: 'osteo-b210-one-per-day-60',
    productName: 'Osteo Bi-Flex One Per Day (60 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b210-one-per-day-60',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768330439',
    activeIngredients: [...OPD_ACTIVES],
    inactiveIngredients: buildOi(PANEL_OPD_60, OPD_FLAGS),
    verdict: verdictFromFlags(OPD_FLAGS),
    retailers: ['Walmart', 'Kroger'],
    sourcesGeneral: [
      `Store label images were read: Walmart carousel and Kroger/CVS images for Osteo Bi-Flex One Per Day 60 ct. Serving size 1 tablet, 60 servings. Supplement Facts actives match osteo-b201-one-per-day-30 and are ungraded. Other ingredients: Cellulose (Plant Origin), Hydroxypropyl Methylcellulose, Croscarmellose, Cellulose Coating. Contains <2% of: Calcium Carbonate, Carnauba Wax, Medium Chain Triglycerides, Polydextrose, Vegetable Magnesium Stearate. Same OI line as osteo-b201-one-per-day-30. Walmart opened https://www.walmart.com/ip/Osteo-Bi-Flex-One-Per-Day-Joint-Health-Dietary-Supplement-with-Glucosamine-Chondroitin-MSM-60-Count/43924653 in stock. Kroger opened https://www.kroger.com/p/osteo-bi-flex-one-per-day-glucosamine-joint-health-supplement-coated-tablets/0003076833043 pickup available. UPC 030768330439.`,
    ],
  },
];

const ROWS = BATCH210_KYR6C_OSTEO_T103U;

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

if (ROWS.length !== 4) throw new Error(`batch210 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch210 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch210 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch210 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch210 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch210 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch210 verdict ${record.id}`);
}
