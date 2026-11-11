import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';

const CARRIER = 'This oil is used as a carrier or fill. It is not the base of a gummy.';

const TOKENS = new Set(['sustainable palm oil', 'organic sunflower seed oil']);

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

function isGummy(form: string | undefined): boolean {
  return /\b(gummy|gummies)\b/i.test(form ?? '');
}

/** Cleared non-gummy uses of the two tokens only. */
export function t147uWhyForName(name: string, form?: string, riskLevel?: RiskLevel): string | undefined {
  if (riskLevel !== 'cleared' || isGummy(form) || !TOKENS.has(norm(name))) return undefined;
  return CARRIER;
}

export function applyT147uIngredients(
  ingredients: readonly IngredientFlag[],
  record: Pick<RatingRecord, 'form'>,
): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t147uWhyForName(ingredient.name, record.form, ingredient.riskLevel);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT147uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT147uIngredients(record.inactiveIngredients, record);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, string | undefined, RiskLevel | undefined, string | undefined]> = [
  ['Sustainable Palm Oil', 'capsule', 'cleared', CARRIER],
  ['Organic sunflower seed oil', 'drops', 'cleared', CARRIER],
  ['Sustainable Palm Oil', 'chew', 'high', undefined],
  ['Sustainable Palm Oil', 'gummy', 'cleared', undefined],
  ['Organic sunflower seed oil', 'gummy', 'high', undefined],
  ['Vegetable oil (palm) (contains carnauba wax)', 'gummy', 'high', undefined],
  ['Coconut oil', 'capsule', 'cleared', undefined],
];

for (const [name, form, risk, why] of MUST) {
  const found = t147uWhyForName(name, form, risk);
  if (found !== why) throw new Error(`t147u ${name} @ ${form ?? '-'} ${risk ?? '-'} -> ${found ?? 'none'}`);
}
