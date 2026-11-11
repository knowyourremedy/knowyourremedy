import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHY: Record<string, string> = {
  "organic yellow beeswax": "Organic yellow beeswax is a wax produced by bees, used as a coating or base.",
  "palm oil": "Palm oil is an oil pressed from the fruit of the oil palm, used as a base. When it is the base of a gummy you are chewing the oil; oils of this type are graded Avoid in that form under the current rules. The FDA lists palm oil as GRAS.",
  "hydroxyproyl cellulose": "Hydroxyproyl cellulose is the printed misspelling of hydroxypropyl cellulose, a processed cellulose derivative used as a binder or coating. The FDA lists hydroxypropyl cellulose as GRAS.",
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact tokens from the t184u list only. Grades and notes stay as they are. */
export function t184uWhyForName(name: string): string | undefined {
  return WHY[norm(name)];
}

export function applyT184uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t184uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT184uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT184uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (Object.keys(WHY).length !== 3) throw new Error('t184u count');
const MUST_MISS = [
  "beeswax",
  "yellow beeswax",
  "palm",
  "palm kernel oil",
  "fractionated coconut and palm kernel oil",
  "hydroxypropyl cellulose",
  "organic beeswax",
];
for (const name of ["organic yellow beeswax", "palm oil", "hydroxyproyl cellulose"]) {
  if (!WHY[name]) throw new Error(`t184u missing ${name}`);
}
for (const name of MUST_MISS) {
  if (WHY[name]) throw new Error(`t184u over-matched ${name}`);
}
if (t184uWhyForName('Palm Oil') !== WHY['palm oil']) throw new Error('t184u palm oil');
if (t184uWhyForName('palm')) throw new Error('t184u palm');
if (t184uWhyForName('palm kernel oil')) throw new Error('t184u palm kernel');
if (t184uWhyForName('hydroxypropyl cellulose')) throw new Error('t184u hydroxypropyl');
if (t184uWhyForName('hydroxyproyl cellulose') !== WHY['hydroxyproyl cellulose']) throw new Error('t184u hydroxyproyl');
if (!WHY['hydroxyproyl cellulose'].startsWith('Hydroxyproyl cellulose')) throw new Error('t184u hydroxyproyl text');
if (!WHY['palm oil'].includes('FDA')) throw new Error('t184u palm fda');
