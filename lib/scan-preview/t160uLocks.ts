import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  ingredientCountsTowardLimitedStack,
  isT160uCautionName,
  isT160uClearedName,
  isT160uLimitedName,
} from './limitedStackEligibility';
import { T128U_STACK_NOTE, T128U_SILICA_WHY, T128U_SORBITOL_WHY } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const MAGNESIUM_STEARATE =
  'Magnesium stearate is a salt of a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const MICROCRYSTALLINE =
  'Microcrystalline cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart in the gut.';
const PURIFIED_WATER =
  'Purified water is plain water with the minerals removed. It is the liquid base of the product.';
const GLYCERIN =
  'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.';
const STEARIC =
  'Stearic acid is a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const CITRIC = 'Citric acid is a natural acid used to set the acidity of the product.';
const HYPROMELLOSE =
  'Hypromellose is a plant-based cellulose used to make vegetarian capsules or as a tablet coating.';
const GELATIN =
  'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.';
const CROSCARMELLOSE =
  'Croscarmellose sodium is a cellulose derivative that helps a tablet break apart in the gut.';
const PHOSPHATE =
  'Dibasic calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.';
const POVIDONE = 'Povidone is a synthetic polymer used as a tablet binder.';
const SODIUM_CITRATE = 'Sodium citrate is a salt of citric acid used to set acidity.';
const MALIC = 'Malic acid is a natural acid used to set the acidity of the product.';
const XANTHAN = 'Xanthan gum is a fermented polysaccharide used as a thickener.';
const MODIFIED_CELLULOSE =
  'Modified cellulose gum is a processed form of cellulose used as a binder or thickener. It is not the simple fiber form.';
const CALCIUM_SILICATE =
  'Calcium silicate is a mineral powder used as an anti-caking agent. It is graded Caution.';
const PROPYLENE =
  'Propylene glycol is a synthetic solvent. It is graded Limited and counts toward a 3+ Limited stack.';
const POLYSORBATE =
  'Polysorbate is a synthetic emulsifier. A 2023 study found it can weaken the gut barrier. It is graded Limited and counts toward a 3+ Limited stack.';
const ALCOHOL =
  'Alcohol is the solvent that carries the other ingredients. It is graded Limited and counts toward a 3+ Limited stack.';

const WHY_AT_LOCK: Record<string, string> = {
  'magnesium stearate': MAGNESIUM_STEARATE,
  'microcrystalline cellulose': MICROCRYSTALLINE,
  'stearic acid': STEARIC,
  'purified water': PURIFIED_WATER,
  glycerin: GLYCERIN,
  'citric acid': CITRIC,
  gelatin: GELATIN,
  hypromellose: HYPROMELLOSE,
  'hypromellose (cellulose) capsule': HYPROMELLOSE,
  'croscarmellose sodium': CROSCARMELLOSE,
  'sodium citrate': SODIUM_CITRATE,
  povidone: POVIDONE,
  'dibasic calcium phosphate': PHOSPHATE,
  'malic acid': MALIC,
  'xanthan gum': XANTHAN,
  silica: T128U_SILICA_WHY,
  'silicon dioxide': T128U_SILICA_WHY,
  'modified cellulose gum': MODIFIED_CELLULOSE,
  'calcium silicate': CALCIUM_SILICATE,
  sorbitol: T128U_SORBITOL_WHY,
  'propylene glycol': PROPYLENE,
  'polysorbate 80': POLYSORBATE,
  alcohol: ALCOHOL,
};

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t160u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  moderate: 'Methodology §5 Caution (founder lock t160u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  limited: 'Methodology §5 Limited (founder lock t160u). Counts toward the 3+ Limited stack. Prior locks are not binding for this exact token.',
  high: 'Methodology §5 Avoid (founder lock t160u).',
};

function token(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t160uGrade(name: string): RiskLevel | undefined {
  if (isT160uClearedName(name)) return 'cleared';
  if (isT160uCautionName(name)) return 'moderate';
  if (isT160uLimitedName(name)) return 'limited';
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
export function applyT160uRow(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => t160uGrade(ingredient.name))) return record;
  const before = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const grade = t160uGrade(ingredient.name);
    if (!grade) return ingredient;
    const why = WHY_AT_LOCK[token(ingredient.name)];
    const nextWhy = why ?? ingredient.why;
    const exempt = grade !== 'limited';
    if (
      ingredient.riskLevel === grade
      && ingredient.stackCountExempt === exempt
      && (ingredient.source ?? '').includes('founder lock t160u')
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
  ['rice flour', 'limited', true],
  ['Flavor', 'limited', true],
  ['Flavors', 'limited', true],
  ['Alcohol', 'limited', true],
  ['polysorbate 80', 'limited', true],
  ['magnesium stearate', 'cleared', false],
  ['hypromellose (cellulose) capsule', 'cleared', false],
  ['silicon dioxide', 'moderate', false],
  ['colloidal silicon dioxide', 'moderate', false],
  ['sugar', 'cleared', false],
];

for (const [name, grade, counts] of STACK_CHECK) {
  if (t160uGrade(name) !== grade) throw new Error(`t160u grade ${name}`);
  const ingredient: IngredientFlag = {
    name,
    riskLevel: grade,
    stackCountExempt: grade !== 'limited',
    source: SOURCE[grade],
  };
  if (ingredientCountsTowardLimitedStack(ingredient) !== counts) {
    throw new Error(`t160u stack ${name}`);
  }
}

if (
  t160uGrade('natural flavor')
  || t160uGrade('mint flavor')
  || t160uGrade('benzyl alcohol')
  || t160uGrade('cane sugar')
  || t160uGrade('colloidal silicon dioxide') === 'cleared'
  || t160uGrade('hypromellose (cellulose) capsule') !== 'cleared'
  || t160uGrade('hypromellose') !== 'cleared'
) {
  throw new Error('t160u token boundary');
}
