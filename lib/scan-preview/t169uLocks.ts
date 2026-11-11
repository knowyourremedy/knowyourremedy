import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  ingredientCountsTowardLimitedStack,
  isT169uCautionName,
  isT169uClearedName,
  isT169uLimitedName,
} from './limitedStackEligibility';
import { T128U_STACK_NOTE } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const PYRUVATE = 'Sodium pyruvate is a salt used as an inactive.';
const ESSENTIAL = 'This is a named essential oil used as a scent or inactive.';
const LANOLIN = 'Lanolin alcohol is wool wax. It can bother people who are sensitive to wool alcohols.';
const NAMED_FRUIT = 'This is a named fruit flavor. It is not a fully unnamed flavor blend.';
const VANILLYL = 'Vanillyl butyl ether is a warming agent used in creams.';
const IRON =
  'Iron oxide is a mineral color. It is not a synthetic FD&C dye. It is graded Limited and counts toward a 3+ Limited stack.';
const ALCOHOL =
  'Alcohol is the solvent that carries the other ingredients. It is graded Limited and counts toward a 3+ Limited stack.';

const WHY_AT_LOCK: Record<string, string> = {
  'sodium pyruvate': PYRUVATE,
  'cajuput oil': ESSENTIAL,
  'lanolin alcohol': LANOLIN,
  'organic cherry flavor': NAMED_FRUIT,
  'vanillyl butyl ether': VANILLYL,
  'iron oxide ochre': IRON,
  'grain alcohol': ALCOHOL,
};

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t169u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  moderate: 'Methodology §5 Caution (founder lock t169u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  limited: 'Methodology §5 Limited (founder lock t169u). Counts toward the 3+ Limited stack. Prior locks are not binding for this exact token.',
  high: 'Methodology §5 Avoid (founder lock t169u).',
};

function token(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t169uGrade(name: string): RiskLevel | undefined {
  if (isT169uClearedName(name)) return 'cleared';
  if (isT169uCautionName(name)) return 'moderate';
  if (isT169uLimitedName(name)) return 'limited';
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
export function applyT169uRow(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => t169uGrade(ingredient.name))) return record;
  const before = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const grade = t169uGrade(ingredient.name);
    if (!grade) return ingredient;
    const why = WHY_AT_LOCK[token(ingredient.name)];
    const nextWhy = why ?? ingredient.why;
    const exempt = grade !== 'limited';
    if (
      ingredient.riskLevel === grade
      && ingredient.stackCountExempt === exempt
      && (ingredient.source ?? '').includes('founder lock t169u')
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
  ['rebaudioside a', 'limited', true],
  ['beta-carotene', 'limited', true],
  ['beta carotene', 'limited', true],
  ['grain alcohol', 'limited', true],
  ['aloe', 'cleared', false],
  ['vitamin e acetate', 'cleared', false],
  ['sodium pyruvate', 'moderate', false],
  ['lanolin alcohol', 'moderate', false],
];

for (const [name, grade, counts] of STACK_CHECK) {
  if (t169uGrade(name) !== grade) throw new Error(`t169u grade ${name}`);
  const ingredient: IngredientFlag = {
    name,
    riskLevel: grade,
    stackCountExempt: grade !== 'limited',
    source: SOURCE[grade],
  };
  if (ingredientCountsTowardLimitedStack(ingredient) !== counts) throw new Error(`t169u stack ${name}`);
}

if (
  t169uGrade('aloe vera gel')
  || t169uGrade('aloe barbadensis leaf juice')
  || t169uGrade('aloe barbadensis leaf extract')
  || t169uGrade('natural cherry flavor')
  || t169uGrade('beta-carotene (for color)')
  || t169uGrade('beta carotene (for color)')
  || t169uGrade('annatto extract')
  || t169uGrade('annatto extract (color)')
  || t169uGrade('organic annatto extract (color)')
  || t169uGrade('annatto seed extract (color)')
  || t169uGrade('lanolin alcohols')
  || t169uGrade('lanolin')
  || t169uGrade('iron oxide')
  || t169uGrade('iron oxide red')
  || t169uGrade('modified cellulose gum')
  || t169uGrade('grain alcohol (20-30% by volume)')
  || t169uGrade('tocopheryl acetate')
  || t169uGrade('organic natural vanilla flavor')
) {
  throw new Error('t169u over-matched');
}
