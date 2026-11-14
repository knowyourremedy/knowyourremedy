import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { ingredientCountsTowardLimitedStack } from './verdictFromFlags';
import { t162uGrade } from './t162uLocks';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t259uLock } from './t259uLocks';

export const T277U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const CALCIUM = 'Calcium gluconate, a calcium salt. It is added as a calcium source.';
const LIMESTONE = 'Ground limestone, a natural calcium carbonate. It is added as a calcium source.';
const SALT = 'Sodium chloride, table salt. It is added for mineral content.';

const LOCKS = new Map<string, Lock>([
  [t240uNorm('calcium gluconate'), { grade: 'cleared', counts: false, why: CALCIUM }],
  [t240uNorm('ground limestone'), { grade: 'cleared', counts: false, why: LIMESTONE }],
  [t240uNorm('sodium chloride'), { grade: 'cleared', counts: false, why: SALT }],
]);

/** Exact strings. Cleared, and they do not count. */
export function t277uLock(name: string): Lock | undefined {
  return LOCKS.get(t240uNorm(name));
}

function withGrade(ingredient: IngredientFlag, own: Lock, mark: string): IngredientFlag {
  const meth = own.grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : own.grade === 'limited'
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : own.grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  const source = (ingredient.source ?? '').includes(`founder lock ${mark}`)
    ? ingredient.source
    : `${ingredient.source ?? 'Panel'}; ${meth}`;
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why || ingredient.why,
    source,
  };
}

/** Digestive Advantage batch428 only. Gummies keep the 3+ note. Titanium dioxide rows do not. */
export function applyT277uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('digestiveadvantage-b428-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t277uLock(ingredient.name);
    if (own) return withGrade(ingredient, own, 't277u');
    const key = t240uNorm(ingredient.name);
    if (key === 'titanium dioxide' || key === 'lactic acid' || key === 'natural flavors') {
      const prior = t240uLock(ingredient.name, record.form);
      if (prior) return withGrade(ingredient, { grade: prior.grade, counts: prior.counts, why: prior.why }, 't240u');
    }
    if (key === 'maltodextrin') {
      const prior = t259uLock(ingredient.name, record.form);
      if (prior) return withGrade(ingredient, prior, 't259u');
    }
    if ((key === 'corn syrup' || key === 'dextrin') && t162uGrade(ingredient.name) === 'limited') {
      return withGrade(ingredient, { grade: 'limited', counts: true, why: ingredient.why ?? '' }, 't162u');
    }
    return ingredient;
  });
  const next: RatingRecord = { ...record, inactiveIngredients };
  if (next.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) {
    const avoided: RatingRecord = { ...next, verdict: 'avoid' };
    delete avoided.honestNote;
    delete avoided.founderHonestNote;
    return avoided;
  }
  const counted = next.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  if (counted >= 3) {
    return { ...next, verdict: 'avoid', honestNote: T277U_STACK_NOTE, founderHonestNote: T277U_STACK_NOTE };
  }
  const cleared: RatingRecord = { ...next };
  delete cleared.honestNote;
  delete cleared.founderHonestNote;
  return cleared;
}

if (t277uLock('calcium gluconate')?.why !== CALCIUM) throw new Error('t277u calcium');
if (t277uLock('ground limestone')?.why !== LIMESTONE) throw new Error('t277u limestone');
if (t277uLock('sodium chloride')?.why !== SALT) throw new Error('t277u salt');
if (t277uLock('calcium gluconate')?.counts !== false) throw new Error('t277u calcium count');
if (t277uLock('ground limestone')?.grade !== 'cleared') throw new Error('t277u limestone grade');
if (t277uLock('sodium chloride')?.counts !== false) throw new Error('t277u salt count');
