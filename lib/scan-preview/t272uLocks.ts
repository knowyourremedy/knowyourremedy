import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t251uLock } from './t251uLocks';
import { t259uLock } from './t259uLocks';
import { t169uGrade } from './t169uLocks';
import { t160uGrade } from './t160uLocks';
import { T271U_STACK_NOTE, t271uLock } from './t271uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

function withGrade(ingredient: IngredientFlag, own: Lock, mark: string): IngredientFlag {
  const stamped = stamp(ingredient.source, own, mark);
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: stamped.exempt,
    why: own.why || ingredient.why,
    source: stamped.source,
  };
}

function stamp(source: string | undefined, own: Lock, mark: string): { source: string; exempt: boolean } {
  const exempt = !own.counts;
  const meth = own.grade === 'limited'
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : own.grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  const next = (source ?? '').includes(`founder lock ${mark}`)
    ? source ?? meth
    : `${source ?? 'Panel'}; ${meth}`;
  return { source: next, exempt };
}

/** Purely Inspired batch425 only. No new ingredient locks. Keeps the named 3+ note. */
export function applyT272uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('purelyinspired-b425-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const from271 = t271uLock(ingredient.name);
    if (from271) return withGrade(ingredient, from271, 't271u');
    const from259 = t259uLock(ingredient.name, record.form);
    if (from259) return withGrade(ingredient, from259, 't259u');
    const from251 = t251uLock(ingredient.name, record.form);
    if (from251) return withGrade(ingredient, from251, 't251u');
    if (ingredient.name === 'Rebaudioside A' && t169uGrade(ingredient.name) === 'limited') {
      return withGrade(ingredient, { grade: 'limited', counts: true, why: ingredient.why ?? '' }, 't169u');
    }
    if (ingredient.name === 'Silicon Dioxide' && t160uGrade(ingredient.name) === 'moderate') {
      return withGrade(ingredient, { grade: 'moderate', counts: false, why: ingredient.why ?? '' }, 't160u');
    }
    return ingredient;
  });
  const next: RatingRecord = { ...record, inactiveIngredients };
  const hasAvoidIngredient = next.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  if (hasAvoidIngredient) {
    const avoided: RatingRecord = { ...next, verdict: 'avoid' };
    delete avoided.honestNote;
    delete avoided.founderHonestNote;
    return avoided;
  }
  const counted = next.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  if (counted >= 3) {
    return { ...next, verdict: 'avoid', honestNote: T271U_STACK_NOTE, founderHonestNote: T271U_STACK_NOTE };
  }
  const rolled = computeVerdictFromInactiveIngredients(next.inactiveIngredients, next.activeSafetyFlag).verdict;
  const cleared: RatingRecord = { ...next, verdict: rolled };
  delete cleared.honestNote;
  delete cleared.founderHonestNote;
  return cleared;
}
