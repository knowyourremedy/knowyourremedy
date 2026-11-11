import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  ingredientCountsTowardLimitedStack,
  isT165uCautionName,
  isT165uClearedName,
  isT165uLimitedName,
} from './limitedStackEligibility';
import { T128U_MCT_WHY, T128U_SORBITOL_WHY, T128U_STACK_NOTE } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const TAPIOCA = 'Tapioca dextrin is a starch form from tapioca. It is Cleared.';
const EDETATE = 'Edetate disodium is an EDTA salt used as a stabilizer in trace amounts.';
const POTASSIUM_BICARBONATE = 'Potassium bicarbonate is a mineral salt used as a filler or to set acidity.';
const POLYSORBATE =
  'Polysorbate is a synthetic emulsifier. A 2023 study found it can weaken the gut barrier. It is graded Limited and counts toward a 3+ Limited stack.';
const MODIFIED =
  'This is a modified starch. Plain corn starch and potato starch are a different line. It is graded Limited and counts toward a 3+ Limited stack.';
const IRON =
  'Iron oxide is a mineral color. It is not a synthetic FD&C dye. It is graded Limited and counts toward a 3+ Limited stack.';
const ENTERIC =
  'This is an enteric coating polymer. It is graded Limited and counts toward a 3+ Limited stack.';
const BENZOIC =
  'Benzoic acid is a preservative. On its own the risk is low, but it can form a trace of benzene when combined with vitamin C. It is graded Limited and counts toward a 3+ Limited stack.';
const LEMON =
  'Lemon oil is a named essential oil from lemon peel. It is graded Limited and counts toward a 3+ Limited stack.';
const PEA =
  'Pea starch is a starch filler. It is not pea protein. It is graded Limited and counts toward a 3+ Limited stack.';
const CORN_SOLIDS =
  'Corn syrup solids are a dried sweetener from corn syrup. It is graded Limited and counts toward a 3+ Limited stack.';
const SUGAR_SPHERES =
  'Sugar spheres are a sugar core used in some tablets. They are graded Limited and counts toward a 3+ Limited stack.';
const ETHYLHEXYL = 'Ethylhexylglycerin is a preservative booster and skin-conditioning agent.';
const SORBITAN = 'Sorbitan is an emulsifier. It is not the sugar alcohol sorbitol.';
const CREAM = 'This is a synthetic ingredient used in cream or coating formulas.';
const CAMPHOR = 'Camphor is a plant compound used as a topical inactive.';

const WHY_AT_LOCK: Record<string, string> = {
  'disodium edta': EDETATE,
  'potassium bicarbonate': POTASSIUM_BICARBONATE,
  'polysorbate 60': POLYSORBATE,
  'modified food starch': MODIFIED,
  'medium-chain triglycerides': T128U_MCT_WHY,
  'red iron oxide': IRON,
  'yellow iron oxide': IRON,
  'methacrylic acid copolymer': ENTERIC,
  'benzoic acid': BENZOIC,
  'lemon oil': LEMON,
  'organic pea starch': PEA,
  'corn syrup solids': CORN_SOLIDS,
  'ferric oxide yellow': IRON,
  'sorbitol solution': T128U_SORBITOL_WHY,
  'sugar spheres': SUGAR_SPHERES,
  ethylhexylglycerin: ETHYLHEXYL,
  'sorbitan monooleate': SORBITAN,
  'aminomethyl propanol': CREAM,
  'dicetyl phosphate': CREAM,
  camphor: CAMPHOR,
};

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t165u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  moderate: 'Methodology §5 Caution (founder lock t165u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  limited: 'Methodology §5 Limited (founder lock t165u). Counts toward the 3+ Limited stack. Prior locks are not binding for this exact token.',
  high: 'Methodology §5 Avoid (founder lock t165u).',
};

function token(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t165uGrade(name: string): RiskLevel | undefined {
  if (isT165uClearedName(name)) return 'cleared';
  if (isT165uCautionName(name)) return 'moderate';
  if (isT165uLimitedName(name)) return 'limited';
  return undefined;
}

/** Part A. Exact token only, and only when the row is already Cleared. */
export function t165uPartAWhy(name: string, riskLevel: string | undefined): string | undefined {
  if (token(name) === 'tapioca dextrin' && riskLevel === 'cleared') return TAPIOCA;
  return undefined;
}

function withLockSource(existing: string | undefined, grade: RiskLevel): string {
  const next = SOURCE[grade];
  if (!existing) return next;
  const idx = existing.search(/Methodology §5/i);
  if (idx === -1) return `${existing}; ${next}`;
  const prefix = existing.slice(0, idx).replace(/[;\s]+$/, '');
  return prefix ? `${prefix}; ${next}` : next;
}

function stripStackNote(note: string | undefined): string {
  if (!note) return '';
  if (note.trim() === T128U_STACK_NOTE) return '';
  return note.replace(T128U_STACK_NOTE, '').replace(/\s{2,}/g, ' ').trim();
}

/** Part B grades. Part A why text only. Prior locks are not binding for Part B. */
export function applyT165uRow(record: RatingRecord): RatingRecord {
  const touches = record.inactiveIngredients.some(
    (ingredient) => t165uGrade(ingredient.name) || token(ingredient.name) === 'tapioca dextrin',
  );
  if (!touches) return record;
  const before = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const grade = t165uGrade(ingredient.name);
    if (grade) {
      const why = WHY_AT_LOCK[token(ingredient.name)];
      const nextWhy = why ?? ingredient.why;
      const exempt = grade !== 'limited';
      if (
        ingredient.riskLevel === grade
        && ingredient.stackCountExempt === exempt
        && (ingredient.source ?? '').includes('founder lock t165u')
        && ingredient.why === nextWhy
      ) {
        return ingredient;
      }
      changed = true;
      return {
        ...ingredient,
        riskLevel: grade,
        stackCountExempt: exempt,
        source: withLockSource(ingredient.source, grade),
        ...(why ? { why } : {}),
      };
    }
    const partA = t165uPartAWhy(ingredient.name, ingredient.riskLevel);
    if (!partA || ingredient.why === partA) return ingredient;
    changed = true;
    return { ...ingredient, why: partA };
  });
  const after = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  const hadStack = before.cause === 'limited_stack';
  const hasStack = after.cause === 'limited_stack';
  let honestNote = record.honestNote;
  let founderHonestNote = record.founderHonestNote;
  let founderChanged = false;
  if (!hadStack && hasStack && before.verdict !== 'avoid') {
    honestNote = T128U_STACK_NOTE;
    founderHonestNote = T128U_STACK_NOTE;
    founderChanged = founderHonestNote !== record.founderHonestNote;
  } else if (hadStack && !hasStack) {
    const nextHonest = stripStackNote(record.honestNote);
    if (nextHonest !== (record.honestNote ?? '')) honestNote = nextHonest;
    if (record.founderHonestNote === T128U_STACK_NOTE) {
      founderHonestNote = undefined;
      founderChanged = true;
    }
  }
  if (
    !changed
    && after.verdict === record.verdict
    && honestNote === record.honestNote
    && !founderChanged
  ) {
    return record;
  }
  const next: RatingRecord = {
    ...record,
    inactiveIngredients: changed ? inactiveIngredients : record.inactiveIngredients,
    verdict: after.verdict,
    honestNote,
  };
  if (founderChanged && founderHonestNote === undefined) {
    delete next.founderHonestNote;
  } else if (founderHonestNote !== undefined) {
    next.founderHonestNote = founderHonestNote;
  }
  return next;
}

const STACK_CHECK: Array<[string, RiskLevel, boolean]> = [
  ['polysorbate 60', 'limited', true],
  ['glucose', 'limited', true],
  ['medium-chain triglycerides', 'limited', true],
  ['disodium edta', 'cleared', false],
  ['rosemary extract', 'cleared', false],
  ['ethylhexylglycerin', 'moderate', false],
  ['camphor', 'moderate', false],
];

for (const [name, grade, counts] of STACK_CHECK) {
  if (t165uGrade(name) !== grade) throw new Error(`t165u grade ${name}`);
  const ingredient: IngredientFlag = {
    name,
    riskLevel: grade,
    stackCountExempt: grade !== 'limited',
    source: SOURCE[grade],
  };
  if (ingredientCountsTowardLimitedStack(ingredient) !== counts) throw new Error(`t165u stack ${name}`);
}

if (
  t165uGrade('glucose syrup')
  || t165uGrade('dextrose')
  || t165uGrade('rosemary oil')
  || t165uGrade('carmine (color)')
  || t165uGrade('polysorbate 80')
  || t165uGrade('sorbitol')
  || t165uGrade('medium chain triglycerides')
  || t165uGrade('iron oxide red')
  || t165uGrade('iron oxide yellow')
  || t165uGrade('modified corn starch')
  || t165uGrade('modified starch')
  || t165uGrade('annatto')
  || t165uGrade('corn syrup')
  || t165uGrade('sorbitan')
  || t165uGrade('natural lemon oil')
  || t165uGrade('carbomer')
  || t165uGrade('carbomer homopolymer type b')
  || t165uGrade('edetate disodium')
  || t165uGrade('aloe barbadensis leaf juice')
  || t165uGrade('pea starch')
) {
  throw new Error('t165u over-matched');
}

if (t165uPartAWhy('tapioca dextrin', 'cleared') !== TAPIOCA) throw new Error('t165u tapioca');
if (t165uPartAWhy('tapioca dextrin', 'limited') !== undefined) throw new Error('t165u tapioca grade');
if (t165uPartAWhy('tapioca starch', 'cleared') !== undefined) throw new Error('t165u tapioca boundary');
