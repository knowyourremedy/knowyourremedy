import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const RICE_FLOUR =
  'Rice flour is a simple flour from rice. It is not the named rice hull or rice bran form. It is graded Limited and counts toward a 3+ Limited stack.';

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Limited rice flour only. Other rice tokens and other grades stay as they are. */
export function t161uWhyForName(name: string, riskLevel?: string): string | undefined {
  if (norm(name) !== 'rice flour' || riskLevel !== 'limited') return undefined;
  return RICE_FLOUR;
}

export function applyT161uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t161uWhyForName(ingredient.name, ingredient.riskLevel);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT161uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT161uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, string | undefined, string | undefined]> = [
  ['Rice flour', 'limited', RICE_FLOUR],
  ['rice flour', 'limited', RICE_FLOUR],
  ['Rice Flour', 'cleared', undefined],
  ['Rice Flour', 'moderate', undefined],
  ['brown rice flour', 'limited', undefined],
  ['white rice flour', 'limited', undefined],
  ['rice hull', 'limited', undefined],
  ['rice bran', 'cleared', undefined],
  ['rice powder', 'cleared', undefined],
];

for (const [name, risk, why] of MUST) {
  const found = t161uWhyForName(name, risk);
  if (found !== why) throw new Error(`t161u ${name} ${risk ?? '-'} -> ${found ?? 'none'}`);
}
