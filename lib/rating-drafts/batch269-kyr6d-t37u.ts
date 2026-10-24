// DRAFT / not verified / batch 269 KYR6-d (t37u).
// One Os-Cal chewable. Founder-verified panel from t35u/t36u. Not re-searched.
// Avoid from three Limited tokens. UPC 030088118713 fails the check digit and stays empty.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  acacia: 'Methodology §5 Cleared (acacia / gum arabic).',
  adipic: 'Methodology §5 Cleared (Adipic Acid — organic acid; locked Sept 16, 2026).',
  calciumStearate: 'Methodology §5 Cleared (calcium stearate — stearate-family lubricant).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named simple starch).',
  dlTocopherol:
    'Methodology §5 Cleared (DL-Alpha Tocopherol / DL alpha tocopherol — mixed-tocopherols row). Founder override Oct 17, 2026 t118u.',
  flavors:
    'Methodology §5 Limited (natural and artificial flavors — plural; locked Sept 16, 2026). Same Limited natural-flavors opacity row. Counts toward the t137u stack.',
  sorbitol:
    'Methodology §5 Caution (sorbitol — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
  sucralose:
    'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  sucrose: 'Methodology §5 Cleared (sucrose). Founder override Oct 17, 2026 t118u.',
  triglycerides:
    'Methodology §5 Limited (Triglycerides printed alone — founder lock t36u Oct 24, 2026). The bare class name does not identify the chain length. Medium chain triglycerides is already Limited. The unnamed rule applies. Counts toward the t137u stack.',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const P_CHEW =
  'Founder-verified panel (t35u/t36u/t37u). Os-Cal Calcium + D3 chewable 60. Not re-searched. UPC 030088118713 fails the UPC-A check digit and is not attached.';

const FLAGS: IngredientFlag[] = [
  flag(P_CHEW, 'Sorbitol', 'moderate', 'sorbitol'),
  flag(P_CHEW, 'Corn starch', 'cleared', 'cornStarch'),
  flag(P_CHEW, 'Adipic Acid', 'cleared', 'adipic'),
  flag(P_CHEW, 'Calcium stearate', 'cleared', 'calciumStearate'),
  flag(P_CHEW, 'Natural and Artificial Flavors', 'limited', 'flavors'),
  flag(P_CHEW, 'Acacia', 'cleared', 'acacia'),
  flag(P_CHEW, 'Sucrose', 'cleared', 'sucrose'),
  flag(P_CHEW, 'Sucralose', 'limited', 'sucralose'),
  flag(P_CHEW, 'Triglycerides', 'limited', 'triglycerides'),
  flag(P_CHEW, 'DL-Alpha-Tocopherol', 'cleared', 'dlTocopherol'),
];

const ACTIVES: RatingRecord['activeIngredients'] = [
  { name: 'Calcium carbonate', strength: 'not graded' },
  { name: 'Cholecalciferol (Vitamin D3)', strength: 'not graded' },
];

const STACK_NOTE =
  'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Natural and Artificial Flavors, Sucralose, Triglycerides.';

export const BATCH269_KYR6D_T37U: RatingRecord[] = [
  {
    id: 'oscal-b269-calcium-d3-chew-60',
    productName: 'Os-Cal Calcium + D3 Chewable (60)',
    brand: 'Os-Cal',
    category: 'Vitamins',
    formulaId: 'oscal-b269-calcium-d3-chew-60',
    audience: ADULT,
    minAge: 18,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: ACTIVES,
    inactiveIngredients: FLAGS,
    verdict: 'avoid',
    honestNote: STACK_NOTE,
    retailers: ['founder-verified'],
    sourcesGeneral: [
      'Avoid from the 3+ Limited stack: natural and artificial flavors, sucralose, and triglycerides. Sorbitol is Caution and does not stack. Corn starch, adipic acid, calcium stearate, acacia, sucrose, and DL-alpha-tocopherol are Cleared. Calcium carbonate and cholecalciferol are the actives and are not graded. Founder-verified panel. Missing UPC. 030088118713 fails the UPC-A check digit (expected 7). No code was invented. Not the caplet 75 or 160.',
    ],
  },
];

const ROWS = BATCH269_KYR6D_T37U;

if (ROWS.length !== 1) throw new Error(`batch269 row count ${ROWS.length}`);

for (const record of ROWS) {
  if (record.id !== 'oscal-b269-calcium-d3-chew-60') throw new Error(`batch269 id ${record.id}`);
  if (record.barcode) throw new Error('batch269 upc must stay empty');
  if (record.brand !== 'Os-Cal' || record.category !== 'Vitamins') throw new Error('batch269 brand or tab');
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== 'avoid' || rollup.cause !== 'limited_stack' || record.verdict !== 'avoid') {
    throw new Error(`batch269 shape ${rollup.verdict} ${rollup.cause} ${rollup.driver}`);
  }
  const counted = record.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  const countedNames = counted.map((item) => item.name);
  if (countedNames.join('|') !== 'Natural and Artificial Flavors|Sucralose|Triglycerides') {
    throw new Error(`batch269 stack ${countedNames.join(',')}`);
  }
  const note = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  if (note !== STACK_NOTE || record.honestNote !== STACK_NOTE) {
    throw new Error(`batch269 note ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  const formNote = contradictionHonestNote(record);
  if (formNote) throw new Error(`batch269 form note ${formNote}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch269 blank why ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch269 pending ${ingredient.name}`);
    }
  }
}
