import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t292uLock } from './t292uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

function withFill(ingredient: IngredientFlag, own: { grade: IngredientFlag['riskLevel']; counts: boolean; why: string }): IngredientFlag {
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why,
    source: 'Panel; Methodology §5 Caution (founder lock t292u). Does not count toward the t137u stack.',
  };
}

/** Formula 101 tablets only. Palm oil uses the existing Caution fill lock. No form note. */
export function applyT293uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('kyolic-b439-')) return record;
  const fill = t292uLock('palm oil', 'capsule');
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    if (!fill || t240uNorm(ingredient.name) !== 'palm oil') return ingredient;
    return withFill(ingredient, fill);
  });
  const verdict = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  return {
    ...record,
    inactiveIngredients,
    verdict,
    honestNote: '',
    founderHonestNote: '',
  };
}
