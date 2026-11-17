import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from './cleanTokenWhy';
import { t134uWhyForName } from './t134uTokenWhy';
import { T128U_SILICA_WHY } from './t128uTokenWhy';
import { t240uNorm } from './t240uLocks';
import { t256uResolve } from './t256uLocks';
import { t259uLock } from './t259uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

function alias(name: string): string {
  const key = name.toLowerCase().replace(/[^a-z]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (key === 'organic flax seed oil') return 'organic flaxseed oil';
  return name;
}

function restamp(ingredient: IngredientFlag, form?: string): IngredientFlag {
  const name = alias(ingredient.name);
  if (t240uNorm(name) === 'silicon dioxide') {
    return {
      ...ingredient,
      riskLevel: 'moderate',
      stackCountExempt: true,
      why: T128U_SILICA_WHY,
      source: 'Panel; Methodology §5 Caution (founder lock t160u). Does not count toward the t137u stack.',
    };
  }
  const malto = t259uLock(name);
  if (malto?.why && t240uNorm(name) === 'maltodextrin') {
    return {
      ...ingredient,
      riskLevel: malto.grade,
      stackCountExempt: !malto.counts,
      why: malto.why,
      source: 'Panel; Methodology §5 Limited (founder lock t259u). Counts toward the 3+ Limited stack.',
    };
  }
  const hit = t256uResolve(name, form);
  if (!hit) return ingredient;
  const why = hit.lock.why || t134uWhyForName(name) || cleanTokenWhyForName(name) || ingredient.why;
  if (!why) return ingredient;
  const mark = hit.mark === 'stored' ? 't160u' : hit.mark;
  const meth = hit.lock.grade === 'limited' && hit.lock.counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : hit.lock.grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return {
    ...ingredient,
    riskLevel: hit.lock.grade,
    stackCountExempt: !hit.lock.counts,
    why,
    source: `Panel; ${meth}`,
  };
}

/** Flora batch440 only. No 3+ note is stored. */
export function applyT294uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('flora-b440-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => restamp(ingredient, record.form));
  const counted = inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const verdict = high || counted >= 3
    ? 'avoid'
    : computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  const next: RatingRecord = { ...record, inactiveIngredients, verdict };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}
