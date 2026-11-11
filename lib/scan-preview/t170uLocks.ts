import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  ingredientCountsTowardLimitedStack,
  isT170uCautionName,
  isT170uClearedName,
  isT170uLimitedName,
} from './limitedStackEligibility';
import { T128U_STACK_NOTE } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const ISOSORBIDE = 'Dimethyl isosorbide is a solvent used in cream formulas.';
const NAMED_FRUIT = 'This is a named fruit flavor. It is not a fully unnamed flavor blend.';
const SORBITAN = 'Sorbitan is an emulsifier. It is not the sugar alcohol sorbitol.';
const EDETATE = 'Edetate disodium is an EDTA salt used as a stabilizer in trace amounts.';
const IRON =
  'Iron oxide is a mineral color. It is not a synthetic FD&C dye. It is graded Limited and counts toward a 3+ Limited stack.';

const WHY_AT_LOCK: Record<string, string> = {
  'dimethyl isosorbide': ISOSORBIDE,
  'organic lemon flavor': NAMED_FRUIT,
  'sorbitan oleate': SORBITAN,
  'sorbitan sesquioleate': SORBITAN,
  'disodium edetate': EDETATE,
  'ferrosoferric oxide': IRON,
};

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t170u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  moderate: 'Methodology §5 Caution (founder lock t170u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  limited: 'Methodology §5 Limited (founder lock t170u). Counts toward the 3+ Limited stack. Prior locks are not binding for this exact token.',
  high: 'Methodology §5 Avoid (founder lock t170u).',
};

function token(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t170uGrade(name: string): RiskLevel | undefined {
  if (isT170uClearedName(name)) return 'cleared';
  if (isT170uCautionName(name)) return 'moderate';
  if (isT170uLimitedName(name)) return 'limited';
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
export function applyT170uRow(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => t170uGrade(ingredient.name))) return record;
  const before = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const grade = t170uGrade(ingredient.name);
    if (!grade) return ingredient;
    const why = WHY_AT_LOCK[token(ingredient.name)];
    const nextWhy = why ?? ingredient.why;
    const exempt = grade !== 'limited';
    if (
      ingredient.riskLevel === grade
      && ingredient.stackCountExempt === exempt
      && (ingredient.source ?? '').includes('founder lock t170u')
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
  ['oleoresin turmeric', 'limited', true],
  ['colloidal silica', 'limited', true],
  ['natural color', 'limited', true],
  ['silica (silicon dioxide)', 'cleared', false],
  ['disodium edetate', 'cleared', false],
  ['dimethyl isosorbide', 'moderate', false],
  ['organic lemon flavor', 'moderate', false],
];

for (const [name, grade, counts] of STACK_CHECK) {
  if (t170uGrade(name) !== grade) throw new Error(`t170u grade ${name}`);
  const ingredient: IngredientFlag = {
    name,
    riskLevel: grade,
    stackCountExempt: grade !== 'limited',
    source: SOURCE[grade],
  };
  if (ingredientCountsTowardLimitedStack(ingredient) !== counts) throw new Error(`t170u stack ${name}`);
}

if (
  t170uGrade('silica')
  || t170uGrade('silicon dioxide')
  || t170uGrade('colloidal silicon dioxide')
  || t170uGrade('silicon dioxide (silica)')
  || t170uGrade('natural colors')
  || t170uGrade('polyvinyl acetate phthalate')
  || t170uGrade('natural lemon flavor')
  || t170uGrade('disodium edta')
  || t170uGrade('sorbitan')
  || t170uGrade('simethicone')
  || t170uGrade('sodium lauryl sulfate')
  || t170uGrade('lemon oil')
  || t170uGrade('sd alcohol 40-b')
) {
  throw new Error('t170u over-matched');
}
