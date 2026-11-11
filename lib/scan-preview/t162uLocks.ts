import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  ingredientCountsTowardLimitedStack,
  isT162uCautionName,
  isT162uClearedName,
  isT162uLimitedName,
} from './limitedStackEligibility';
import { T128U_MCT_WHY, T128U_STACK_NOTE } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const PHOSPHATE =
  'Dibasic calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.';
const DEXTROSE = 'Dextrose is a simple sugar used as a sweetener or filler.';
const CELLULOSE = 'Cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart.';
const TRIETHYL = 'Triethyl citrate is a plasticizer used in tablet coatings.';
const CALCIUM_CARBONATE = 'Calcium carbonate is a mineral salt used as a filler or to set acidity.';
const MINERAL_OIL = 'Mineral oil is a purified petroleum product used as an ointment base.';
const GLUCOSE = 'Glucose syrup is a liquid sweetener made from starch.';
const SODIUM_CARBONATE = 'Sodium carbonate is a mineral salt used as a filler or to set acidity.';
const POTASSIUM_HYDROXIDE = 'Potassium hydroxide is a pH adjuster used in a trace amount.';
const TARTARIC = 'Tartaric acid is a natural acid used to set the acidity of the product.';
const NATURAL_AND_ARTIFICIAL =
  'This is a natural and artificial flavor mixture. The label does not list every part of the mixture. It is graded Limited and counts toward a 3+ Limited stack.';
const POLYDEXTROSE =
  'Polydextrose is a starch-based bulk sweetener. It is graded Limited and counts toward a 3+ Limited stack.';
const INK =
  'This is printing ink on a tablet or capsule. The label does not name every pigment in the ink. It is graded Limited and counts toward a 3+ Limited stack.';
const FRUCTOSE =
  'Fructose is a simple sugar used as a sweetener. It is graded Limited and counts toward a 3+ Limited stack.';
const MENTHOL =
  'Menthol is a cooling compound. On this label it is an inactive, not the drug. It is graded Limited and counts toward a 3+ Limited stack.';
const BAMBOO =
  'Bamboo extract is a plant silica source used as a flow agent. It is graded Limited and counts toward a 3+ Limited stack.';
const CORN_SYRUP =
  'Corn syrup is a sweetener made from corn. It is graded Limited and counts toward a 3+ Limited stack.';
const FRAGRANCE =
  'This is an unnamed fragrance. The label does not list the solvents or carriers inside the mixture.';

const WHY_AT_LOCK: Record<string, string> = {
  'dicalcium phosphate': PHOSPHATE,
  dextrose: DEXTROSE,
  'carboxymethylcellulose sodium': CELLULOSE,
  'triethyl citrate': TRIETHYL,
  'calcium carbonate': CALCIUM_CARBONATE,
  'mineral oil': MINERAL_OIL,
  'glucose syrup': GLUCOSE,
  'sodium carbonate': SODIUM_CARBONATE,
  'potassium hydroxide': POTASSIUM_HYDROXIDE,
  'tartaric acid': TARTARIC,
  'natural and artificial flavors': NATURAL_AND_ARTIFICIAL,
  'medium chain triglycerides': T128U_MCT_WHY,
  polydextrose: POLYDEXTROSE,
  'pharmaceutical ink': INK,
  fructose: FRUCTOSE,
  menthol: MENTHOL,
  'bamboo extract': BAMBOO,
  'corn syrup': CORN_SYRUP,
  fragrance: FRAGRANCE,
};

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t162u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  moderate: 'Methodology §5 Caution (founder lock t162u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  limited: 'Methodology §5 Limited (founder lock t162u). Counts toward the 3+ Limited stack. Prior locks are not binding for this exact token.',
  high: 'Methodology §5 Avoid (founder lock t162u).',
};

function token(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t162uGrade(name: string): RiskLevel | undefined {
  if (isT162uClearedName(name)) return 'cleared';
  if (isT162uCautionName(name)) return 'moderate';
  if (isT162uLimitedName(name)) return 'limited';
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
export function applyT162uRow(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => t162uGrade(ingredient.name))) return record;
  const before = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const grade = t162uGrade(ingredient.name);
    if (!grade) return ingredient;
    const why = WHY_AT_LOCK[token(ingredient.name)];
    const nextWhy = why ?? ingredient.why;
    const exempt = grade !== 'limited';
    if (
      ingredient.riskLevel === grade
      && ingredient.stackCountExempt === exempt
      && (ingredient.source ?? '').includes('founder lock t162u')
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
  ['xylitol', 'limited', true],
  ['natural and artificial flavors', 'limited', true],
  ['corn syrup', 'limited', true],
  ['benzyl alcohol', 'limited', true],
  ['starch', 'cleared', false],
  ['dextrose', 'cleared', false],
  ['carob', 'moderate', false],
  ['fragrance', 'moderate', false],
];

for (const [name, grade, counts] of STACK_CHECK) {
  if (t162uGrade(name) !== grade) throw new Error(`t162u grade ${name}`);
  const ingredient: IngredientFlag = {
    name,
    riskLevel: grade,
    stackCountExempt: grade !== 'limited',
    source: SOURCE[grade],
  };
  if (ingredientCountsTowardLimitedStack(ingredient) !== counts) throw new Error(`t162u stack ${name}`);
}

if (
  t162uGrade('corn starch')
  || t162uGrade('tapioca starch')
  || t162uGrade('high fructose corn syrup')
  || t162uGrade('dextrose monohydrate')
  || t162uGrade('tapioca dextrin')
  || t162uGrade('maltodextrin')
  || t162uGrade('crystalline fructose')
  || t162uGrade('menthyl lactate')
  || t162uGrade('alcohol')
  || t162uGrade('natural flavor')
) {
  throw new Error('t162u over-matched');
}
