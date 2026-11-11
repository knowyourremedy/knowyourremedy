import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  ingredientCountsTowardLimitedStack,
  isT171uCautionName,
  isT171uClearedName,
  isT171uLimitedName,
} from './limitedStackEligibility';
import { T128U_STACK_NOTE } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const LEMON =
  'Natural lemon flavor with other natural flavors is a blend of flavor compounds. It is Cleared.';
const ORANGE =
  'Natural orange flavor with other natural flavors is a blend of flavor compounds. It is Cleared.';

const WHY_AT_LOCK: Record<string, string> = {};

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t171u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  moderate: 'Methodology §5 Caution (founder lock t171u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  limited: 'Methodology §5 Limited (founder lock t171u). Counts toward the 3+ Limited stack. Prior locks are not binding for this exact token.',
  high: 'Methodology §5 Avoid (founder lock t171u).',
};

function token(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t171uGrade(name: string): RiskLevel | undefined {
  if (isT171uClearedName(name)) return 'cleared';
  if (isT171uCautionName(name)) return 'moderate';
  if (isT171uLimitedName(name)) return 'limited';
  return undefined;
}

/** Step 1. Exact tokens only. Grades stay as they are. */
export function t171uStep1Why(name: string): string | undefined {
  const key = token(name);
  if (key === 'natural lemon flavor with other natural flavors') return LEMON;
  if (key === 'natural orange flavor with other natural flavors') return ORANGE;
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

/** Step 1 why text, then Step 2 grades. Step 1 does not change grades or notes. */
export function applyT171uRow(record: RatingRecord): RatingRecord {
  const touches = record.inactiveIngredients.some(
    (ingredient) => t171uGrade(ingredient.name) || t171uStep1Why(ingredient.name),
  );
  if (!touches) return record;
  const before = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  let changed = false;
  let gradeChanged = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const grade = t171uGrade(ingredient.name);
    if (grade) {
      const why = WHY_AT_LOCK[token(ingredient.name)];
      const nextWhy = why ?? ingredient.why;
      const exempt = grade !== 'limited';
      if (
        ingredient.riskLevel === grade
        && ingredient.stackCountExempt === exempt
        && (ingredient.source ?? '').includes('founder lock t171u')
        && ingredient.why === nextWhy
      ) {
        return ingredient;
      }
      changed = true;
      gradeChanged = true;
      return {
        ...ingredient,
        riskLevel: grade,
        stackCountExempt: exempt,
        source: withLockSource(ingredient.source, grade),
        ...(why ? { why } : {}),
      };
    }
    const step1 = t171uStep1Why(ingredient.name);
    if (!step1 || ingredient.why === step1) return ingredient;
    changed = true;
    return { ...ingredient, why: step1 };
  });
  const after = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  const hadStack = before.cause === 'limited_stack';
  const hasStack = after.cause === 'limited_stack';
  let honestNote = record.honestNote;
  let founderHonestNote = record.founderHonestNote;
  let founderChanged = false;
  if (gradeChanged && !hadStack && hasStack && before.verdict !== 'avoid') {
    honestNote = T128U_STACK_NOTE;
    founderHonestNote = T128U_STACK_NOTE;
    founderChanged = founderHonestNote !== record.founderHonestNote;
  } else if (gradeChanged && hadStack && !hasStack) {
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
    verdict: gradeChanged ? after.verdict : record.verdict,
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
  ['vanilla flavor', 'limited', true],
  ['propane', 'limited', true],
  ['silicon', 'cleared', false],
  ['white rice flour', 'cleared', false],
  ['thyme oil', 'moderate', false],
  ['ceteareth-20', 'moderate', false],
];

for (const [name, grade, counts] of STACK_CHECK) {
  if (t171uGrade(name) !== grade) throw new Error(`t171u grade ${name}`);
  const ingredient: IngredientFlag = {
    name,
    riskLevel: grade,
    stackCountExempt: grade !== 'limited',
    source: SOURCE[grade],
  };
  if (ingredientCountsTowardLimitedStack(ingredient) !== counts) throw new Error(`t171u stack ${name}`);
}

if (
  t171uGrade('silicon dioxide')
  || t171uGrade('silica')
  || t171uGrade('isobutane')
  || t171uGrade('propanediol')
  || t171uGrade('natural vanilla flavor')
  || t171uGrade('organic vanilla flavor')
  || t171uGrade('3-((l-menthyl)oxy)propane-1,2-diol (menthoxypropanediol)')
  || t171uGrade('rice flour')
  || t171uGrade('organic natural vanilla flavor')
) {
  throw new Error('t171u over-matched');
}

if (t171uGrade('thyme oil') !== 'moderate' || t171uGrade('thymus mastichina flowering-top oil') !== 'cleared') {
  throw new Error('t171u thyme boundary');
}
if (t171uStep1Why('natural lemon flavor with other natural flavors') !== LEMON) throw new Error('t171u lemon');
if (t171uStep1Why('natural orange flavor with other natural flavors') !== ORANGE) throw new Error('t171u orange');
if (t171uStep1Why('natural lemon flavor') !== undefined) throw new Error('t171u lemon boundary');
if (t171uStep1Why('organic lemon flavor') !== undefined) throw new Error('t171u lemon organic');
if (t171uGrade('natural lemon flavor with other natural flavors') || t171uGrade('natural orange flavor with other natural flavors')) {
  throw new Error('t171u step1 grade');
}
