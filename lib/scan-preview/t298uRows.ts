import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from './cleanTokenWhy';
import { t134uWhyForName } from './t134uTokenWhy';
import { T128U_SILICA_WHY } from './t128uTokenWhy';
import { t240uNorm } from './t240uLocks';
import { t256uResolve } from './t256uLocks';
import { t295uLock } from './t295uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

function withGrade(ingredient: IngredientFlag, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'limited' && counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { ...ingredient, riskLevel: grade, stackCountExempt: !counts, why, source: `Panel; ${meth}` };
}

/** Renew Life batch443 only. No 3+ note is stored. */
export function applyT298uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('renew-life-b443-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    if (t240uNorm(ingredient.name) === 'silica' || t240uNorm(ingredient.name) === 'silicon dioxide') {
      return withGrade(ingredient, 'moderate', false, T128U_SILICA_WHY, 't160u');
    }
    const gellan = t295uLock(ingredient.name);
    if (gellan?.why && t240uNorm(ingredient.name) === 'gellan gum') {
      return withGrade(ingredient, gellan.grade, gellan.counts, gellan.why, 't295u');
    }
    const hit = t256uResolve(ingredient.name, record.form);
    if (hit) {
      const why = hit.lock.why || t134uWhyForName(ingredient.name) || cleanTokenWhyForName(ingredient.name);
      if (why) return withGrade(ingredient, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
    }
    return ingredient;
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
