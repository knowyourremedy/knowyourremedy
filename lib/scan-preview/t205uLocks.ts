import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

export const T205U_TOKEN = 'Vegan Capsule (hydroxypropylmethylcellulose, water)';
export const T205U_WHY =
  'Vegan capsule shell made from hydroxypropyl methylcellulose and water. Hydroxypropyl methylcellulose is a plant-derived cellulose polymer used to make vegan capsules.';

const SOURCE =
  'Methodology §5 Cleared (founder lock t205u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.';

function token(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact print only. Case is not a second token. The spaced hydroxypropyl methylcellulose print is not this lock. */
export function isT205uClearedName(name: string): boolean {
  return token(name) === token(T205U_TOKEN);
}

export function applyT205uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    if (!isT205uClearedName(ingredient.name)) return ingredient;
    const source = (ingredient.source ?? '').includes('founder lock t205u')
      ? ingredient.source
      : ingredient.source
        ? `${ingredient.source}; ${SOURCE}`
        : SOURCE;
    if (
      ingredient.riskLevel === 'cleared'
      && ingredient.stackCountExempt === true
      && ingredient.why === T205U_WHY
      && source === ingredient.source
    ) {
      return ingredient;
    }
    changed = true;
    return {
      ...ingredient,
      riskLevel: 'cleared' as const,
      stackCountExempt: true,
      why: T205U_WHY,
      source,
    };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

/** Cleared, does not stack. Sets the founder why. Does not write an honest note. */
export function applyT205uTokenWhy(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => isT205uClearedName(ingredient.name))) {
    return record;
  }
  const inactiveIngredients = applyT205uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  return {
    ...record,
    inactiveIngredients,
    verdict: rollup.verdict,
  };
}

if (!isT205uClearedName(T205U_TOKEN)) throw new Error('t205u missed the lock');
if (isT205uClearedName('Vegan Capsule (hydroxypropyl methylcellulose, water)')) {
  throw new Error('t205u over-matched the spaced print');
}
if (isT205uClearedName('Vegan Capsule')) throw new Error('t205u over-matched the bare shell');
if (T205U_WHY.includes('Cleared') || T205U_WHY.includes('stack')) {
  throw new Error('t205u why must not mention the grade or the stack');
}
