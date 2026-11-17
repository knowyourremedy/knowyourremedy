import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from './cleanTokenWhy';
import { t134uWhyForName } from './t134uTokenWhy';
import { T128U_SILICA_WHY } from './t128uTokenWhy';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t252uLock } from './t252uLocks';
import { t256uResolve } from './t256uLocks';
import { t259uLock } from './t259uLocks';
import { t292uLock } from './t292uLocks';
import { t295uLock } from './t295uLocks';
import { t299uLock } from './t299uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

function withGrade(ingredient: IngredientFlag, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited' && counts
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { ...ingredient, riskLevel: grade, stackCountExempt: !counts, why, source: `Panel; ${meth}` };
}

/** NeoCell batch447 only. No 3+ note is stored. */
export function applyT302uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('neocell-b447-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    if (t240uNorm(ingredient.name) === 'silica' || t240uNorm(ingredient.name) === 'silicon dioxide') {
      return withGrade(ingredient, 'moderate', false, T128U_SILICA_WHY, 't160u');
    }
    const own = t299uLock(ingredient.name, record.form) ?? t295uLock(ingredient.name, record.form) ?? t292uLock(ingredient.name, record.form) ?? t252uLock(ingredient.name, record.form);
    if (own?.why) {
      const mark = t299uLock(ingredient.name, record.form) ? 't299u' : t295uLock(ingredient.name, record.form) ? 't295u' : t292uLock(ingredient.name, record.form) ? 't292u' : 't252u';
      return withGrade(ingredient, own.grade, own.counts, own.why, mark);
    }
    const malto = t259uLock(ingredient.name);
    if (malto?.why && /maltodextrin|organic flavors|natural flavors/i.test(ingredient.name)) {
      return withGrade(ingredient, malto.grade, malto.counts, malto.why, 't259u');
    }
    const oil = t240uLock(ingredient.name, record.form);
    if (oil?.why && /natural flavor|palm oil|lactic acid/i.test(ingredient.name)) {
      return withGrade(ingredient, oil.grade, oil.counts, oil.why, 't240u');
    }
    const hit = t256uResolve(ingredient.name, record.form);
    if (hit) {
      const why = hit.lock.why || t134uWhyForName(ingredient.name) || cleanTokenWhyForName(ingredient.name) || (t240uNorm(ingredient.name) === 'silica' ? T128U_SILICA_WHY : undefined);
      if (why) return withGrade(ingredient, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
    }
    return ingredient;
  });
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const next: RatingRecord = {
    ...record,
    inactiveIngredients,
    verdict: high ? 'avoid' : computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict,
  };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}
