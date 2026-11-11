import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  isT157uCautionName,
  isT157uClearedName,
  isT157uLimitedName,
  ingredientCountsTowardLimitedStack,
} from './limitedStackEligibility';
import { T128U_STACK_NOTE } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const OAT = 'Oat fiber is a plant fiber from oats used as a filler.';
const ACACIA = 'Acacia is a natural gum from the acacia tree used as a thickener or binder.';
const RICE = 'Rice powder is a simple rice filler. It is not rice flour or an unnamed rice extract.';
const PHOSPHORIC = 'Phosphoric acid is used to set acidity. It is graded Limited and counts toward a 3+ Limited stack.';
const PEPPERMINT = 'This is a named mint flavor. It is graded Limited and counts toward a 3+ Limited stack.';
const LANOLIN = 'Lanolin alcohols are wool wax components. They can bother people who are sensitive to wool alcohols.';

const WHY_AT_LOCK: Record<string, string> = {
  'organic oat fiber': OAT,
  acacia: ACACIA,
  'rice powder': RICE,
  'phosphoric acid': PHOSPHORIC,
  'peppermint flavor': PEPPERMINT,
  'lanolin alcohols': LANOLIN,
};

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t157u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  moderate: 'Methodology §5 Caution (founder lock t157u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  limited: 'Methodology §5 Limited (founder lock t157u). Counts toward the 3+ Limited stack. Prior locks are not binding for this exact token.',
  high: 'Methodology §5 Avoid (founder lock t157u).',
};

export function t157uGrade(name: string): RiskLevel | undefined {
  if (isT157uClearedName(name)) return 'cleared';
  if (isT157uCautionName(name)) return 'moderate';
  if (isT157uLimitedName(name)) return 'limited';
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

/** Prior locks are not binding. Grades, stack flags, and the founder stack note only. */
export function applyT157uRow(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => t157uGrade(ingredient.name))) return record;
  const before = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const grade = t157uGrade(ingredient.name);
    if (!grade) return ingredient;
    const why = WHY_AT_LOCK[ingredient.name.trim().toLowerCase().replace(/\s+/g, ' ')];
    const nextWhy = why ?? ingredient.why;
    const exempt = grade !== 'limited';
    if (
      ingredient.riskLevel === grade
      && ingredient.stackCountExempt === exempt
      && (ingredient.source ?? '').includes('founder lock t157u')
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
  ['Phosphoric acid', 'limited', true],
  ['peppermint flavor', 'limited', true],
  ['Organic oat fiber', 'cleared', false],
  ['Acacia', 'cleared', false],
  ['Molasses', 'cleared', false],
  ['Allulose', 'cleared', false],
  ['Lanolin alcohols', 'moderate', false],
  ['Eucalyptol', 'cleared', false],
  ['Mentha Oil', 'cleared', false],
  ['Rice Powder', 'cleared', false],
];

for (const [name, grade, counts] of STACK_CHECK) {
  if (t157uGrade(name) !== grade) throw new Error(`t157u grade ${name}`);
  const ingredient: IngredientFlag = {
    name,
    riskLevel: grade,
    stackCountExempt: grade !== 'limited',
    source: SOURCE[grade],
  };
  if (ingredientCountsTowardLimitedStack(ingredient) !== counts) {
    throw new Error(`t157u stack ${name}`);
  }
}

if (t157uGrade('Acacia gum') || t157uGrade('Oat fiber') || t157uGrade('Natural peppermint flavor')) {
  throw new Error('t157u over-matched a different token');
}
