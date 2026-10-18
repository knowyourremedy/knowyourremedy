// DRAFT / not verified / batch 214 KYR6-c (t109u WRITE).
// Move Free Advanced Plus MSM & D3 120-count — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const T109U_SOURCE =
  'Founder-confirmed panel and second sale source (Amazon), t109u.';

const METH = {
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  modStarch:
    'Methodology §5 Limited (modified starch). Modified Corn Starch maps here (Oct 17, 2026 t107u).',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  talc: 'Methodology §5 Avoid (talc). Magnesium silicate is that row in a swallowed product.',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_MF_ADV_MSM120 =
  'https://www.kroger.com/p/move-free-advanced-plus-msm-vitamin-d3-joint-supplement-120-coated-tablets/0002052595069';

const MF_ADV_MSM_FLAGS: FlagSpec[] = [
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
  ['Modified corn starch', 'limited', 'modStarch'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['Magnesium silicate', 'high', 'talc'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

export const BATCH214_KYR6C_MF_T109U: RatingRecord[] = [
  {
    id: 'move-free-b214-advanced-plus-msm-d3-120',
    productName: 'Move Free Advanced Plus MSM & D3 (120 coated tablets)',
    brand: 'Move Free',
    category: VITAMINS,
    formulaId: 'move-free-b214-advanced-plus-msm-d3-120',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '020525950697',
    activeIngredients: [
      { name: 'Vitamin D3', strength: '50 mcg (2000 IU, as cholecalciferol)' },
      { name: 'Glucosamine hydrochloride', strength: '1500 mg' },
      { name: 'Chondroitin sulfate', strength: '200 mg' },
      { name: 'Hyaluronic acid', strength: '3.3 mg' },
      { name: 'Calcium fructoborate', strength: '216 mg' },
      { name: 'MSM', strength: '750 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_MF_ADV_MSM120, MF_ADV_MSM_FLAGS),
    verdict: verdictFromFlags(MF_ADV_MSM_FLAGS),
    retailers: ['Amazon', 'Vitacost', 'Kroger'],
    sourcesGeneral: [
      `${T109U_SOURCE} Founder-confirmed other ingredients: microcrystalline cellulose, coating (hydroxypropyl methylcellulose, modified corn starch, titanium dioxide, polyethylene glycol, magnesium silicate, glycerin), magnesium stearate. Kroger 120-ct label image at ${PANEL_MF_ADV_MSM120} (Advanced PLUS MSM & Vitamin D3, 120 COATED TABLETS, 2 PILLS PER DAY) was read for supplement facts and sale context; serving size 2 tablets, 60 servings; Calories 10; Total Carbohydrate 2 g; Sodium 15 mg. Actives ungraded. The Kroger image prints the misspelling hydroxypropyl methylcellullose in the coating line; the founder-confirmed panel spells hydroxypropyl methylcellulose (graded here). Contains shellfish (shrimp, crab, lobster, and crayfish). Vitacost available $38.20, UPC 020525950697. Amazon second sale source confirmed t109u.`,
    ],
  },
];

const ROWS = BATCH214_KYR6C_MF_T109U;

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

if (ROWS.length !== 1) throw new Error(`batch214 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch214 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch214 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch214 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch214 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch214 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch214 verdict ${record.id}`);
}
