import type { IngredientFlag, RatingRecord } from '../ratingRecord';

export const T222U_ORGANIC_CANE_ALCOHOL_WHY =
  'Organic cane alcohol. It is the liquid that extracts and carries the plant ingredients. The panel does not print the strength, so the exact concentration is not shown. Alcohol used as a vehicle is graded Limited when the strength is not printed (PROJECT_NOTES alcohol-with-strength rule).';

function isOrganicCaneAlcohol(name: string): boolean {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() === 'organic cane alcohol';
}

/** Why text only. Stored grades on other rows stay as they are. */
export function applyT222uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    if (!isOrganicCaneAlcohol(ingredient.name) || ingredient.why === T222U_ORGANIC_CANE_ALCOHOL_WHY) {
      return ingredient;
    }
    changed = true;
    return { ...ingredient, why: T222U_ORGANIC_CANE_ALCOHOL_WHY };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT222uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT222uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (!isOrganicCaneAlcohol('Organic Cane Alcohol')) throw new Error('t222u name');
if (isOrganicCaneAlcohol('certified organic cane alcohol (61-71%)')) throw new Error('t222u strength');
if (isOrganicCaneAlcohol('Certified Organic cane alcohol')) throw new Error('t222u certified');
