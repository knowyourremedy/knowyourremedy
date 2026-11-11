import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

/** Founder t207u. Cleared, do not stack. Pure water and Pure Water stay separate prints. */
export const T207U_WHY: Record<string, string> = {
  'Cellulose Vegetarian Capsule':
    'Vegetarian capsule shell made from cellulose. Cellulose is a plant fiber used to form the capsule that holds the ingredients.',
  'Organic Pullulan Capsule':
    'Organic capsule shell made from pullulan. Pullulan is a plant-derived starch polymer used to form vegan capsules.',
  'Organic Vegetable Glycerin':
    'Organic glycerin from vegetable sources. It keeps the liquid soft and helps ingredients stay mixed.',
  'Pure water':
    'Purified water. It is the liquid base that dissolves and carries the other ingredients.',
  'Pure Water':
    'Purified water. It is the liquid base that dissolves and carries the other ingredients.',
  'Organic Raspberry Flavor':
    'Organic raspberry flavoring. It adds raspberry taste to the product.',
  'Organic Apple Flavor':
    'Organic apple flavoring. It adds apple taste to the product.',
  'Plantcaps™ (pullulan) Capsules':
    'Capsule shell made from pullulan. Pullulan is a plant-derived starch polymer used to form vegan capsules.',
  'Organic Vegetable Capsules (pullulan)':
    'Organic vegetable capsule shell made from pullulan. Pullulan is a plant-derived starch polymer used to form vegan capsules.',
  'Organic Gum Acacia':
    'Organic gum from the acacia tree. It thickens and stabilizes the mixture so the ingredients stay evenly mixed.',
};

const CASE_SPLIT = new Set(['Pure water', 'Pure Water']);

const LOWER = new Map<string, string>();
for (const [name, why] of Object.entries(T207U_WHY)) {
  if (CASE_SPLIT.has(name)) continue;
  LOWER.set(name.toLowerCase().replace(/\s+/g, ' '), why);
}

const SOURCE =
  'Methodology §5 Cleared (founder lock t207u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.';

function spaced(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

export function t207uWhyForName(name: string): string | undefined {
  const trimmed = spaced(name);
  if (CASE_SPLIT.has(trimmed)) return T207U_WHY[trimmed];
  return LOWER.get(trimmed.toLowerCase());
}

export function isT207uClearedName(name: string): boolean {
  return t207uWhyForName(name) !== undefined;
}

export function applyT207uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t207uWhyForName(ingredient.name);
    if (!why) return ingredient;
    const source = (ingredient.source ?? '').includes('founder lock t207u')
      ? ingredient.source
      : ingredient.source
        ? `${ingredient.source}; ${SOURCE}`
        : SOURCE;
    if (
      ingredient.riskLevel === 'cleared'
      && ingredient.stackCountExempt === true
      && ingredient.why === why
      && source === ingredient.source
    ) {
      return ingredient;
    }
    changed = true;
    return {
      ...ingredient,
      riskLevel: 'cleared' as const,
      stackCountExempt: true,
      why,
      source,
    };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

/** Cleared, does not stack. Does not write an honest note. */
export function applyT207uTokenWhy(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => isT207uClearedName(ingredient.name))) {
    return record;
  }
  const inactiveIngredients = applyT207uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  return { ...record, inactiveIngredients, verdict: rollup.verdict };
}

if (t207uWhyForName('Pure water') !== t207uWhyForName('Pure Water')) {
  throw new Error('t207u water whys must match');
}
if (t207uWhyForName('pure water') !== undefined) throw new Error('t207u collapsed the water casings');
if (!t207uWhyForName('Plantcaps™ (pullulan) Capsules')?.startsWith('Capsule shell made from pullulan.')) {
  throw new Error('t207u missed Plantcaps');
}
for (const why of Object.values(T207U_WHY)) {
  if (/cleared|limited|caution|avoid|stack/i.test(why)) throw new Error('t207u why mentions a grade');
}
