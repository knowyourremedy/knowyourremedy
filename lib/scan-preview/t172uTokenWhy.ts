import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHITE_RICE_FLOUR = 'White rice flour is a milled form of white rice. It is Cleared.';

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact white rice flour only. Grade, other tokens, and notes stay as they are. */
export function t172uWhyForName(name: string): string | undefined {
  if (norm(name) !== 'white rice flour') return undefined;
  return WHITE_RICE_FLOUR;
}

export function applyT172uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t172uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT172uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT172uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, string | undefined]> = [
  ['White rice flour', WHITE_RICE_FLOUR],
  ['white rice flour', WHITE_RICE_FLOUR],
  ['WHITE RICE FLOUR', WHITE_RICE_FLOUR],
  ['rice flour', undefined],
  ['organic brown rice flour', undefined],
  ['white rice', undefined],
  ['rice meal', undefined],
];

for (const [name, why] of MUST) {
  if (t172uWhyForName(name) !== why) throw new Error(`t172u ${name}`);
}
