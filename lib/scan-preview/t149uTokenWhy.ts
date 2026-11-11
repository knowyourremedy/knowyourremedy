import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';

const GUMMY = 'Coconut oil is the base of this gummy. You are chewing the oil.';

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

function isGummy(form: string | undefined): boolean {
  return /\b(gummy|gummies)\b/i.test(form ?? '');
}

/** Cleared Coconut oil only when it is the gummy base. */
export function t149uWhyForName(name: string, form?: string, riskLevel?: RiskLevel): string | undefined {
  if (riskLevel !== 'cleared' || !isGummy(form) || norm(name) !== 'coconut oil') return undefined;
  return GUMMY;
}

export function applyT149uIngredients(
  ingredients: readonly IngredientFlag[],
  record: Pick<RatingRecord, 'form'>,
): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t149uWhyForName(ingredient.name, record.form, ingredient.riskLevel);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT149uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT149uIngredients(record.inactiveIngredients, record);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, string | undefined, RiskLevel | undefined, string | undefined]> = [
  ['Coconut oil', 'gummy', 'cleared', GUMMY],
  ['Coconut Oil', 'gummies', 'cleared', GUMMY],
  ['coconut oil', 'gummy', 'cleared', GUMMY],
  ['Coconut oil', 'softgel', 'cleared', undefined],
  ['Coconut oil', 'cream', 'cleared', undefined],
  ['Coconut oil', 'chew', 'cleared', undefined],
  ['Coconut oil', 'gummy', 'high', undefined],
  ['Coconut and canola oil', 'gummy', 'cleared', undefined],
  ['Organic coconut oil', 'gummy', 'cleared', undefined],
];

for (const [name, form, risk, why] of MUST) {
  const found = t149uWhyForName(name, form, risk);
  if (found !== why) throw new Error(`t149u ${name} @ ${form ?? '-'} ${risk ?? '-'} -> ${found ?? 'none'}`);
}
