import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t134uWhyForName } from './t134uTokenWhy';
import { t151uWhyForName } from './t151uTokenWhy';
import { T128U_SILICA_WHY } from './t128uTokenWhy';
import { t240uNorm } from './t240uLocks';
import { t259uLock } from './t259uLocks';
import { ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string; mark: string };

function existing(name: string): Lock | undefined {
  const key = t240uNorm(name);
  if (key === 'silicon dioxide' || key === 'silica') {
    return { grade: 'moderate', counts: false, why: T128U_SILICA_WHY, mark: 't160u' };
  }
  const malto = key === 'maltodextrin' ? t259uLock(name) : undefined;
  if (malto) return { grade: malto.grade, counts: malto.counts, why: malto.why, mark: 't259u' };
  if (key === 'tricalcium phosphate') {
    const why = t151uWhyForName(name, 'capsule', 'cleared');
    if (why) return { grade: 'cleared', counts: false, why, mark: 't151u' };
  }
  const why = t134uWhyForName(name) || t134uWhyForName('hypromellose');
  if (key === 'hypromellose' || key === 'calcium carbonate' || key === 'microcrystalline cellulose' || key === 'magnesium stearate') {
    const own = t134uWhyForName(name);
    if (own) return { grade: 'cleared', counts: false, why: own, mark: 't134u' };
  }
  if (why && key === 'hypromellose') return { grade: 'cleared', counts: false, why, mark: 't134u' };
  return undefined;
}

function withGrade(ingredient: IngredientFlag, own: Lock): IngredientFlag {
  const meth = own.grade === 'limited' && own.counts
    ? `Methodology §5 Limited (founder lock ${own.mark}). Counts toward the 3+ Limited stack.`
    : own.grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${own.mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${own.mark}). Does not count toward the t137u stack.`;
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why,
    source: `Panel; ${meth}`,
  };
}

/** MegaRed batch435 only. No 3+ note. Existing locks only. */
export function applyT288uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('megared-b435-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = existing(ingredient.name);
    return own ? withGrade(ingredient, own) : ingredient;
  });
  const counted = inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  const next: RatingRecord = { ...record, inactiveIngredients };
  if (next.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) {
    const avoided: RatingRecord = { ...next, verdict: 'avoid' };
    delete avoided.honestNote;
    delete avoided.founderHonestNote;
    return avoided;
  }
  if (counted >= 3) {
    const held: RatingRecord = { ...next };
    delete held.honestNote;
    delete held.founderHonestNote;
    return held;
  }
  const caution: RatingRecord = { ...next };
  delete caution.honestNote;
  delete caution.founderHonestNote;
  return caution;
}
