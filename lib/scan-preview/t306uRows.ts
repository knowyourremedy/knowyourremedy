import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from './cleanTokenWhy';
import { t134uWhyForName } from './t134uTokenWhy';
import { t240uNorm } from './t240uLocks';
import { t256uResolve } from './t256uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

function withGrade(ingredient: IngredientFlag, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'limited' && counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { ...ingredient, riskLevel: grade, stackCountExempt: !counts, why, source: `Panel; ${meth}` };
}

/** Emerald Labs batch450 only. No 3+ note is stored. */
export function applyT306uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('emerald-labs-b450-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const hit = t256uResolve(ingredient.name, record.form);
    if (!hit) return ingredient;
    const why = hit.lock.why || (t240uNorm(ingredient.name) === 'water' ? cleanTokenWhyForName(ingredient.name) : undefined) || t134uWhyForName(ingredient.name) || cleanTokenWhyForName(ingredient.name);
    if (!why) return ingredient;
    if (t240uNorm(ingredient.name) !== 'hypromellose' && t240uNorm(ingredient.name) !== 'water') return ingredient;
    return withGrade(ingredient, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
  });
  const next: RatingRecord = {
    ...record,
    inactiveIngredients,
    verdict: computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict,
  };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}
