import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { cleanTokenWhyForName } from './cleanTokenWhy';
import { t240uNorm } from './t240uLocks';
import { t299uLock } from './t299uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const USP =
  'Ethyl alcohol USP at the printed strength. It is the liquid that extracts and carries the plant ingredients. Alcohol with a printed strength is graded Cleared as a vehicle (alcohol-with-strength rule; FDA and EFSA treat strength-printed alcohol differently from bare residual alcohol).';

/** Exact string. Bare ethyl alcohol stays the t300 Limited lock. */
export function t301uLock(name: string): Lock | undefined {
  if (t240uNorm(name) !== 'ethyl alcohol usp') return undefined;
  return { grade: 'cleared', counts: false, why: USP };
}

function withGrade(ingredient: IngredientFlag, own: Lock, mark: string): IngredientFlag {
  const meth = own.grade === 'limited' && own.counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : own.grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why,
    source: `Panel; ${meth}`,
  };
}

function restamp(ingredient: IngredientFlag): IngredientFlag {
  const own = t301uLock(ingredient.name);
  if (own) return withGrade(ingredient, own, 't301u');
  const shell = t299uLock(ingredient.name);
  if (shell) return withGrade(ingredient, shell, 't299u');
  if (t240uNorm(ingredient.name) === 'filtered water') {
    const why = cleanTokenWhyForName(ingredient.name);
    if (why) return withGrade(ingredient, { grade: 'cleared', counts: false, why }, 't160u');
  }
  return ingredient;
}

/** Renew Life batch446 only. Cleared rows do not get a 3+ note. */
export function applyT301uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('renew-life-b446-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => restamp(ingredient));
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const verdict = high
    ? 'avoid'
    : computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  const next: RatingRecord = { ...record, inactiveIngredients, verdict };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t301uLock('ethyl alcohol USP')?.why !== USP) throw new Error('t301u why');
if (t301uLock('ethyl alcohol USP')?.grade !== 'cleared' || t301uLock('ethyl alcohol USP')?.counts !== false) {
  throw new Error('t301u grade');
}
if (t301uLock('ethyl alcohol')) throw new Error('t301u bare');
