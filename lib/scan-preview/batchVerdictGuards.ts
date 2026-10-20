import type { RatingRecord } from '../ratingRecord';
import { ingredientCountsTowardLimitedStack } from './verdictFromFlags';

/** t137u: Avoid is valid with High **or** 3+ Limited (SiO2 excluded from stack). */
export function avoidAllowedWithoutHigh(record: RatingRecord): boolean {
  const limitedStack = record.inactiveIngredients.filter(ingredientCountsTowardLimitedStack);
  return limitedStack.length >= 3;
}

export function assertAvoidHasHighOrLimitedStack(record: RatingRecord, label: string): void {
  if (record.verdict !== 'avoid') return;
  if (record.inactiveIngredients.some((i) => i.riskLevel === 'high')) return;
  if (avoidAllowedWithoutHigh(record)) return;
  throw new Error(`${label} Avoid without High or t137u Limited stack on ${record.id}`);
}
