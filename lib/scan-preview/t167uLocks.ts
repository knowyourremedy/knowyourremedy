import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  ingredientCountsTowardLimitedStack,
  isT167uCautionName,
  isT167uClearedName,
  isT167uLimitedName,
} from './limitedStackEligibility';
import { T128U_STACK_NOTE } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const SUNFLOWER =
  'Sunflower seed oil is a seed oil used in some bases. It is Limited and counts toward a 3+ Limited stack.';
const STEVIOL =
  'Steviol glycoside is a refined form of stevia. It is Limited and counts toward a 3+ Limited stack.';
const CREAM = 'This is a synthetic ingredient used in cream or coating formulas.';
const ALUMINUM = 'Aluminum hydroxide is listed as an inactive ingredient, not as a swallowed antacid.';
const NAMED_FRUIT = 'This is a named fruit flavor. It is not a fully unnamed flavor blend.';
const FORMALDEHYDE = 'This preservative can release formaldehyde.';
const DEXTROSE =
  'Dextrose excipient is a sugar used as a filler. It is graded Limited and counts toward a 3+ Limited stack.';
const IRON =
  'Iron oxide is a mineral color. It is not a synthetic FD&C dye. It is graded Limited and counts toward a 3+ Limited stack.';

const WHY_AT_LOCK: Record<string, string> = {
  'aluminum glycinate': CREAM,
  'dihydroxyaluminum aminoacetate': CREAM,
  aminomethylpropanol: CREAM,
  'aluminum hydroxide': ALUMINUM,
  'natural mixed berry flavor': NAMED_FRUIT,
  'diazolidinyl urea': FORMALDEHYDE,
  'dextrose excipient': DEXTROSE,
  'iron oxide': IRON,
};

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t167u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  moderate: 'Methodology §5 Caution (founder lock t167u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  limited: 'Methodology §5 Limited (founder lock t167u). Counts toward the 3+ Limited stack. Prior locks are not binding for this exact token.',
  high: 'Methodology §5 Avoid (founder lock t167u).',
};

function token(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t167uGrade(name: string): RiskLevel | undefined {
  if (isT167uClearedName(name)) return 'cleared';
  if (isT167uCautionName(name)) return 'moderate';
  if (isT167uLimitedName(name)) return 'limited';
  return undefined;
}

/** Step 1. Exact tokens only. Grades stay as they are. */
export function t167uStep1Why(name: string): string | undefined {
  const key = token(name);
  if (key === 'sunflower seed oil') return SUNFLOWER;
  if (key === 'steviol glycoside') return STEVIOL;
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
export function applyT167uRow(record: RatingRecord): RatingRecord {
  const touches = record.inactiveIngredients.some(
    (ingredient) => t167uGrade(ingredient.name) || t167uStep1Why(ingredient.name),
  );
  if (!touches) return record;
  const before = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  let changed = false;
  let gradeChanged = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const grade = t167uGrade(ingredient.name);
    if (grade) {
      const why = WHY_AT_LOCK[token(ingredient.name)];
      const nextWhy = why ?? ingredient.why;
      const exempt = grade !== 'limited';
      if (
        ingredient.riskLevel === grade
        && ingredient.stackCountExempt === exempt
        && (ingredient.source ?? '').includes('founder lock t167u')
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
    const step1 = t167uStep1Why(ingredient.name);
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
  ['dextrose excipient', 'limited', true],
  ['iron oxide', 'limited', true],
  ['lanolin', 'limited', true],
  ['turmeric', 'cleared', false],
  ['organic tapioca starch', 'cleared', false],
  ['rosemary oil', 'moderate', false],
  ['diazolidinyl urea', 'moderate', false],
];

for (const [name, grade, counts] of STACK_CHECK) {
  if (t167uGrade(name) !== grade) throw new Error(`t167u grade ${name}`);
  const ingredient: IngredientFlag = {
    name,
    riskLevel: grade,
    stackCountExempt: grade !== 'limited',
    source: SOURCE[grade],
  };
  if (ingredientCountsTowardLimitedStack(ingredient) !== counts) throw new Error(`t167u stack ${name}`);
}

if (
  t167uGrade('turmeric root extract')
  || t167uGrade('organic turmeric')
  || t167uGrade('lanolin alcohols')
  || t167uGrade('black iron oxide')
  || t167uGrade('red iron oxide')
  || t167uGrade('yellow iron oxide')
  || t167uGrade('iron oxide red')
  || t167uGrade('spirulina extract (color)')
  || t167uGrade('organic annatto extract (color)')
  || t167uGrade('annatto seed extract (color)')
  || t167uGrade('quik-sorb® (ginger rhizome, amla fruit, capsicum fruit)')
  || t167uGrade('aminomethyl propanol')
  || t167uGrade('dextrose')
  || t167uGrade('tapioca starch')
  || t167uGrade('rosemary extract')
  || t167uGrade('natural and artificial flavors')
  || t167uGrade('polyvinyl acetate phthalates')
  || t167uGrade('polyvinyl acetate pthalate')
) {
  throw new Error('t167u over-matched');
}

if (t167uStep1Why('sunflower seed oil') !== SUNFLOWER) throw new Error('t167u sunflower');
if (t167uStep1Why('organic sunflower seed oil') !== undefined) throw new Error('t167u sunflower boundary');
if (t167uStep1Why('high oleic sunflower oil') !== undefined) throw new Error('t167u sunflower high oleic');
if (t167uStep1Why('steviol glycoside') !== STEVIOL) throw new Error('t167u steviol');
if (t167uStep1Why('steviol glycosides') !== undefined) throw new Error('t167u steviol boundary');
if (t167uGrade('sunflower seed oil') || t167uGrade('steviol glycoside')) throw new Error('t167u step1 grade');
