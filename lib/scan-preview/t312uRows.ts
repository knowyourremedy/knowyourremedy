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

function whyFor(name: string, hitWhy: string): string {
  return hitWhy || (t240uNorm(name) === 'water' ? cleanTokenWhyForName(name) : undefined) || t134uWhyForName(name) || cleanTokenWhyForName(name) || '';
}

/** Emerald Labs batch453 only. No generated note is stored. */
export function applyT312uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('emerald-labs-b453-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const hit = t256uResolve(ingredient.name, record.form);
    if (!hit) return ingredient;
    const why = whyFor(ingredient.name, hit.lock.why);
    if (!why) return ingredient;
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
