import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { isT157uClearedName } from './limitedStackEligibility';

const ALLULOSE = 'Allulose is a rare sugar used as a sweetener. It is Cleared.';
const EUCALYPTOL = 'Eucalyptol is a named compound from eucalyptus used as a scent or inactive. It is Cleared.';
const ISOBUTANE = 'Isobutane is a propellant used in a spray. It is not an oil you swallow. It is Cleared.';

const WHY: Record<string, string> = {
  allulose: ALLULOSE,
  eucalyptol: EUCALYPTOL,
  isobutane: ISOBUTANE,
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Cleared rows only. A token that is not Cleared is left unchanged. */
export function t158uWhyForName(name: string, riskLevel?: string): string | undefined {
  const key = norm(name);
  if (!WHY[key] || !isT157uClearedName(name) || riskLevel !== 'cleared') return undefined;
  return WHY[key];
}

export function applyT158uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t158uWhyForName(ingredient.name, ingredient.riskLevel);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT158uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT158uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, string | undefined, string | undefined]> = [
  ['Allulose', 'cleared', ALLULOSE],
  ['allulose', 'cleared', ALLULOSE],
  ['Eucalyptol', 'cleared', EUCALYPTOL],
  ['Isobutane', 'cleared', ISOBUTANE],
  ['Allulose', 'limited', undefined],
  ['Organic Allulose', 'cleared', undefined],
  ['peppermint flavor', 'limited', undefined],
];

for (const [name, risk, why] of MUST) {
  const found = t158uWhyForName(name, risk);
  if (found !== why) throw new Error(`t158u ${name} ${risk ?? '-'} -> ${found ?? 'none'}`);
}
