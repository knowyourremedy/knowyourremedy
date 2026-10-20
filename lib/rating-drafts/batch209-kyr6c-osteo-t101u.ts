// DRAFT / not verified / batch 209 KYR6-c (t101u WRITE).
// Osteo Bi-Flex Triple Strength + Turmeric and + Magnesium 80-count — grade from OI only.

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
  crospovidone: 'Methodology §5 Cleared (crospovidone / povidone family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  mct: 'Methodology §5 Limited (unlabeled medium-chain triglycerides). No plant is named.',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  stearic: 'Methodology §5 Cleared (stearic acid / vegetable stearic acid — stearate-family lubricant).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_TURMERIC = 'https://www.osteobiflex.com/products/triple-strength-plus-turmeric';
const PANEL_MAGNESIUM = 'https://www.osteobiflex.com/products/triple-strength-plus-magnesium';

const TURMERIC_OI_FLAGS: FlagSpec[] = [
  ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
  ['Crospovidone', 'cleared', 'crospovidone'],
  ['Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'],
  ['Vegetable Stearic Acid', 'cleared', 'stearic'],
  ['Cellulose Coating', 'cleared', 'celluloseCoating'],
  ['Calcium Carbonate', 'cleared', 'calciumCarbonate'],
  ['Carnauba Wax', 'cleared', 'carnauba'],
  ['Medium Chain Triglycerides', 'limited', 'mct'],
  ['Polydextrose', 'limited', 'polydextrose'],
  ['Silica', 'limited', 'silica'],
  ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
];

const MAGNESIUM_OI_FLAGS: FlagSpec[] = [
  ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
  ['Crospovidone', 'cleared', 'crospovidone'],
  ['Vegetable Stearic Acid', 'cleared', 'stearic'],
  ['Calcium Carbonate', 'cleared', 'calciumCarbonate'],
  ['Carnauba Wax', 'cleared', 'carnauba'],
  ['Cellulose Coating', 'cleared', 'celluloseCoating'],
  ['Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'],
  ['Medium Chain Triglycerides', 'limited', 'mct'],
  ['Polydextrose', 'limited', 'polydextrose'],
  ['Silica', 'limited', 'silica'],
  ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

export const BATCH209_KYR6C_OSTEO_T101U: RatingRecord[] = [
  {
    id: 'osteo-b209-triple-strength-turmeric-80',
    productName: 'Osteo Bi-Flex Triple Strength + Turmeric (80 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b209-triple-strength-turmeric-80',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768679309',
    activeIngredients: [
      { name: 'Glucosamine HCl', strength: '1,500 mg' },
      {
        name: 'Joint Shield 5-LOXIN Advanced Boswellia serrata extract (resin)',
        strength: '100 mg',
      },
      {
        name: 'Turmeric Extract (Curcuma longa) (root) (standardized to 95% curcuminoids)',
        strength: '450 mg',
      },
    ],
    inactiveIngredients: buildOi(PANEL_TURMERIC, TURMERIC_OI_FLAGS),
    verdict: verdictFromFlags(TURMERIC_OI_FLAGS),
    retailers: ['Kroger', 'iHerb', 'Meijer'],
    sourcesGeneral: [
      `Osteo Bi-Flex brand carton label was read at ${PANEL_TURMERIC}. Serving size 2 tablets, 40 servings. Supplement Facts actives are ungraded. Other ingredients: Cellulose (Plant Origin), Crospovidone, Hydroxypropyl Methylcellulose, Vegetable Stearic Acid, Cellulose Coating. Contains <2% of: Calcium Carbonate, Carnauba Wax, Medium Chain Triglycerides, Polydextrose, Silica, Vegetable Magnesium Stearate. Current brand label has no FD&C Yellow 5/6 lakes; iHerb and Vitacost text agree; Walmart, Walgreens, and Nestle Medical Hub still show the older dyed other-ingredient line — this row is graded from the current brand carton only. Kroger opened https://www.kroger.com/p/osteo-bi-flex-glucosamine-with-turmeric-joint-health-supplement-coated-tablets/0003076867930 in stock for pickup Oct 17, 2026. iHerb opened https://www.iherb.com/pr/osteo-bi-flex-joint-health-triple-strength-turmeric-80-coated-tablets/74362 in stock. Meijer opened https://www.meijer.com/shopping/product/osteo-bi-flex-triple-strength-turmeric-80-tablets/3076867930.html in stock. UPC 030768679309.`,
    ],
  },
  {
    id: 'osteo-b209-triple-strength-magnesium-80',
    productName: 'Osteo Bi-Flex Triple Strength + Magnesium (80 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b209-triple-strength-magnesium-80',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768002275',
    activeIngredients: [
      { name: 'Magnesium (as Magnesium Oxide)', strength: '420 mg (100% DV)' },
      { name: 'Glucosamine HCl', strength: '1,500 mg' },
      {
        name: 'Joint Shield 5-LOXIN Advanced Boswellia serrata extract (resin)',
        strength: '100 mg',
      },
    ],
    inactiveIngredients: buildOi(PANEL_MAGNESIUM, MAGNESIUM_OI_FLAGS),
    verdict: verdictFromFlags(MAGNESIUM_OI_FLAGS),
    retailers: ['iHerb', 'Vitacost', 'Meijer'],
    sourcesGeneral: [
      `Osteo Bi-Flex brand carton label was read at ${PANEL_MAGNESIUM}. Serving size 2 tablets, 40 servings. Supplement Facts actives are ungraded. Other ingredients: Cellulose (Plant Origin), Crospovidone, Vegetable Stearic Acid. Contains <2% of: Calcium Carbonate, Carnauba Wax, Cellulose Coating, Hydroxypropyl Methylcellulose, Medium Chain Triglycerides, Polydextrose, Silica, Vegetable Magnesium Stearate. iHerb opened https://www.iherb.com/pr/osteo-bi-flex-joint-health-triple-strength-magnesium-80-coated-tablets/89435 in stock. Vitacost opened https://www.vitacost.com/products/osteo-bi-flex-joint-health-triple-strength-magnesium-80-coated-tablets-89435 with add to cart. Meijer opened https://www.meijer.com/shopping/product/coated-tablets/3076800227.html in stock. UPC 030768002275 printed in full on iHerb and Vitacost and matches the brand image.`,
    ],
  },
];

const ROWS = BATCH209_KYR6C_OSTEO_T101U;

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

if (ROWS.length !== 2) throw new Error(`batch209 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch209 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch209 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch209 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch209 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch209 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch209 verdict ${record.id}`);
}
