import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t162uGrade } from './t162uLocks';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t259uLock } from './t259uLocks';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

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

/** Digestive Advantage batch427 only. No new ingredient locks. Avoid rows keep no 3+ note. */
export function applyT276uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('digestiveadvantage-b427-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const key = t240uNorm(ingredient.name);
    if (key === 'titanium dioxide') {
      const own = t240uLock(ingredient.name, record.form);
      if (own) return withGrade(ingredient, { grade: own.grade, counts: own.counts, why: own.why }, 't240u');
    }
    if (key === 'maltodextrin') {
      const own = t259uLock(ingredient.name, record.form);
      if (own) return withGrade(ingredient, own, 't259u');
    }
    if (key === 'dextrin' && t162uGrade(ingredient.name) === 'limited') {
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
  return next;
}
