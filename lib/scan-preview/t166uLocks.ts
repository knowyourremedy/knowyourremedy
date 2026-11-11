import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  ingredientCountsTowardLimitedStack,
  isT166uCautionName,
  isT166uClearedName,
  isT166uLimitedName,
} from './limitedStackEligibility';
import { T128U_STACK_NOTE } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const STEARETH = 'Steareth is a fatty-alcohol ether used as an emulsifier in cream bases.';
const CREAM = 'This is a synthetic ingredient used in cream or coating formulas.';
const ESSENTIAL = 'This is a named essential oil used as a scent or inactive.';
const HYDROXY = 'Hydroxyacetophenone is a synthetic antioxidant used in creams.';
const SD_ALCOHOL =
  'SD alcohol 40-B is a denatured alcohol used as a solvent. It is graded Limited and counts toward a 3+ Limited stack.';
const TROLAMINE = 'Trolamine is a pH adjuster. It is graded Limited and counts toward a 3+ Limited stack.';
const DEXTRATES =
  'Dextrates are a starch sugar used as a filler. They are graded Limited and counts toward a 3+ Limited stack.';
const CAPRYLYL =
  'Caprylyl glycol is a skin-conditioning agent. It is graded Limited and counts toward a 3+ Limited stack.';
const INK =
  'This is printing ink on a tablet or capsule. The label does not name every pigment in the ink. It is graded Limited and counts toward a 3+ Limited stack.';
const IRON =
  'Iron oxide is a mineral color. It is not a synthetic FD&C dye. It is graded Limited and counts toward a 3+ Limited stack.';
const CAPRIC =
  'Caprylic/capric triglyceride is a medium-chain triglyceride. It is graded Limited and counts toward a 3+ Limited stack.';

const WHY_AT_LOCK: Record<string, string> = {
  'ceteth-20 phosphate': STEARETH,
  'steareth-2': STEARETH,
  'c30-45 alkyl cetearyl dimethicone crosspolymer': CREAM,
  'caprylyl methicone': CREAM,
  'clove oil': ESSENTIAL,
  hydroxyacetophenone: HYDROXY,
  'sd alcohol 40-b': SD_ALCOHOL,
  trolamine: TROLAMINE,
  dextrates: DEXTRATES,
  'caprylyl glycol': CAPRYLYL,
  'edible ink': INK,
  'black iron oxide': IRON,
  'caprylic/capric triglyceride': CAPRIC,
  'ferric oxide red': IRON,
};

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t166u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  moderate: 'Methodology §5 Caution (founder lock t166u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  limited: 'Methodology §5 Limited (founder lock t166u). Counts toward the 3+ Limited stack. Prior locks are not binding for this exact token.',
  high: 'Methodology §5 Avoid (founder lock t166u).',
};

function token(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t166uGrade(name: string): RiskLevel | undefined {
  if (isT166uClearedName(name)) return 'cleared';
  if (isT166uCautionName(name)) return 'moderate';
  if (isT166uLimitedName(name)) return 'limited';
  return undefined;
}

/** Sunflower gummy-base contradiction note. Leave it in place on that row. */
export function isSunflowerGummyContradictionNote(note: string | undefined): boolean {
  if (!note) return false;
  return /sunflower/i.test(note) && /base of a gummy/i.test(note) && /did not pull this grade down/i.test(note);
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
export function applyT166uRow(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => t166uGrade(ingredient.name))) return record;
  const before = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const grade = t166uGrade(ingredient.name);
    if (!grade) return ingredient;
    const why = WHY_AT_LOCK[token(ingredient.name)];
    const nextWhy = why ?? ingredient.why;
    const exempt = grade !== 'limited';
    if (
      ingredient.riskLevel === grade
      && ingredient.stackCountExempt === exempt
      && (ingredient.source ?? '').includes('founder lock t166u')
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
  const hasSunflower = record.inactiveIngredients.some((ingredient) => token(ingredient.name) === 'sunflower seed oil');
  const keepGummyNote = hasSunflower && (
    isSunflowerGummyContradictionNote(record.honestNote)
    || isSunflowerGummyContradictionNote(record.founderHonestNote)
  );
  let honestNote = record.honestNote;
  let founderHonestNote = record.founderHonestNote;
  let founderChanged = false;
  if (!hadStack && hasStack && before.verdict !== 'avoid' && !keepGummyNote) {
    honestNote = T128U_STACK_NOTE;
    founderHonestNote = T128U_STACK_NOTE;
    founderChanged = founderHonestNote !== record.founderHonestNote;
  } else if (hadStack && !hasStack && !keepGummyNote) {
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
  ['sunflower seed oil', 'limited', true],
  ['sd alcohol 40-b', 'limited', true],
  ['artificial flavor', 'limited', true],
  ['silicon dioxide (silica)', 'cleared', false],
  ['organic rice flour', 'cleared', false],
  ['clove oil', 'moderate', false],
  ['steareth-2', 'moderate', false],
];

for (const [name, grade, counts] of STACK_CHECK) {
  if (t166uGrade(name) !== grade) throw new Error(`t166u grade ${name}`);
  const ingredient: IngredientFlag = {
    name,
    riskLevel: grade,
    stackCountExempt: grade !== 'limited',
    source: SOURCE[grade],
  };
  if (ingredientCountsTowardLimitedStack(ingredient) !== counts) throw new Error(`t166u stack ${name}`);
}

if (
  t166uGrade('paraffin wax')
  || t166uGrade('artificial mixed berry flavor')
  || t166uGrade('natural and artificial flavors')
  || t166uGrade('sorbitol sorbitan solution')
  || t166uGrade('high oleic sunflower oil')
  || t166uGrade('organic sunflower seed oil')
  || t166uGrade('beta carotene (for color)')
  || t166uGrade('iron oxide black')
  || t166uGrade('ferric oxide yellow')
  || t166uGrade('steareth-21')
  || t166uGrade('ceteth-20')
  || t166uGrade('sd alcohol 40')
  || t166uGrade('annatto extract (color)')
) {
  throw new Error('t166u over-matched');
}
