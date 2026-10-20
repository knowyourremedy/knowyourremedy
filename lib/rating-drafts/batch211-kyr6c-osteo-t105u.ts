// DRAFT / not verified / batch 211 KYR6-c (t105u WRITE).
// Osteo Bi-Flex Triple Strength 88-count — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
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

const PANEL_TS_88 =
  'https://www.walmart.com/ip/Osteo-Bi-Flex-Triple-Strength-Joint-Health-Dietary-Supplement-with-Glucosamine-Chondroitin-MSM-and-Vitamin-C-88-Count/796949715';

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

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

export const BATCH211_KYR6C_OSTEO_T105U: RatingRecord[] = [
  {
    id: 'osteo-b211-triple-strength-88',
    productName: 'Osteo Bi-Flex Triple Strength (88 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b211-triple-strength-88',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768766047',
    activeIngredients: [
      { name: 'Vitamin C', strength: '60 mg' },
      { name: 'Manganese', strength: '2 mg' },
      { name: 'Glucosamine HCl', strength: '1,500 mg' },
      { name: 'Joint Shield 5-LOXIN Advanced', strength: '100 mg' },
      { name: 'Chondroitin/MSM Complex', strength: '1,103 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_TS_88, TRIPLE_TS_FLAGS),
    verdict: verdictFromFlags(TRIPLE_TS_FLAGS),
    retailers: ['Walmart', 'BuraQ Groups'],
    sourcesGeneral: [
      `Walmart carousel label image was read for Osteo Bi-Flex Triple Strength 88 ct at ${PANEL_TS_88}. Serving size 2 tablets, 44 servings. Supplement Facts: Calories 10; Total Carbohydrate 2 g (1% DV); Vitamin C (as Ascorbic Acid) 60 mg (67%); Manganese (as Manganese Sulfate) 2 mg (87%); Sodium 35 mg (2%); Glucosamine HCl 1,500 mg (1.5 g); Joint Shield 5-LOXIN Advanced Boswellia serrata Extract (resin) 100 mg; Chondroitin/MSM Complex 1,103 mg (1.1 g) (Chondroitin Sulfate, Methylsulfonylmethane (MSM), Collagen (Hydrolyzed Gelatin), Boswellia serrata (resin), Boron (as Bororganic Glycine), Hyaluronic Acid). Contains shellfish (crab, crayfish, lobster, shrimp). Actives are ungraded. Other ingredients: Crospovidone. Contains <2% of: Calcium Carbonate, Carnauba Wax, Cellulose Coating, Cellulose (Plant Origin), Medium Chain Triglycerides, Polydextrose, Silica, Vegetable Magnesium Stearate. Same OI line and grades as osteo-b210-triple-strength-40. Walmart opened ${PANEL_TS_88} in stock, sold and shipped by Walmart.com, Oct 17, 2026. BuraQ Groups (third-party seller; t105u second-source rule) opened https://buraqgroups.com/products/osteo-bi-flex-triple-strength-joint-health-dietary-supplement-with-glucosamine-chondroitin-msm-and-vitamin-c-88-count in stock with single 88-count box image. UPC 030768766047 on Walmart product data; Cooklist and BrickSeek agree.`,
    ],
  },
];

const ROWS = BATCH211_KYR6C_OSTEO_T105U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch211 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch211 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch211 upc ${record.id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch211 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch211 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch211 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch211 verdict ${record.id}`);
}
