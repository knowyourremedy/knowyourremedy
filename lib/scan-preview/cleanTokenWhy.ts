import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const GELATIN = 'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.';
const GLYCERIN = 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.';
const WATER = 'Purified water is plain water with minerals removed. It is the liquid base.';
const CELLULOSE = 'Cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart.';
const STEARIC = 'Stearic acid is a fatty acid used as a lubricant so a tablet presses and releases from the mold cleanly.';
const PHOSPHATE = 'Calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.';
const RICE = 'Rice flour is a simple starch filler used to bulk a tablet or capsule.';

/** Exact printed tokens on Clean rows. Longer names are not keys. */
const CLEAN_TOKEN_WHY: Record<string, string> = {
  gelatin: GELATIN,
  glycerin: GLYCERIN,
  glycerol: GLYCERIN,
  glycerine: GLYCERIN,
  'purified water': WATER,
  'distilled water': WATER,
  cellulose: CELLULOSE,
  'microcrystalline cellulose': CELLULOSE,
  'silicified microcrystalline cellulose': CELLULOSE,
  'stearic acid': STEARIC,
  'magnesium stearate': STEARIC,
  'dibasic calcium phosphate': PHOSPHATE,
  'calcium phosphate': PHOSPHATE,
  'rice flour': RICE,
  'rice starch': RICE,
};

/** Case-insensitive, trimmed, trailing punctuation ignored. Extra words do not match. */
export function cleanTokenKey(name: string): string {
  let key = name.trim().toLowerCase();
  let previous = '';
  while (key !== previous) {
    previous = key;
    key = key.replace(/\p{P}+$/u, '').trim();
  }
  return key;
}

export function cleanTokenWhyForName(name: string): string | undefined {
  return CLEAN_TOKEN_WHY[cleanTokenKey(name)];
}

export function stampCleanTokenWhy(ingredients: IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = cleanTokenWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients;
}

/** Sets stored why on exact tokens only when the catalog grade is Clean. */
export function applyCleanTokenWhy(record: RatingRecord): RatingRecord {
  if (record.verdict !== 'clean') return record;
  const inactiveIngredients = stampCleanTokenWhy(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const exact = ['Gelatin', 'glycerin.', ' Glycerol ', 'glycerine', 'Purified water', 'distilled water,', 'Cellulose', 'microcrystalline cellulose', 'silicified microcrystalline cellulose', 'stearic acid', 'magnesium stearate', 'dibasic calcium phosphate', 'calcium phosphate', 'rice flour', 'rice starch'];
for (const name of exact) {
  if (!cleanTokenWhyForName(name)) throw new Error(`clean token why missed ${name}`);
}
const longer = ['vegetable glycerin', 'organic glycerine', 'hydroxypropyl methylcellulose', 'cellulose capsule', 'Vegetable glycerine', 'organic glycerin', 'gelatin (bovine)', 'rice flour powder'];
for (const name of longer) {
  if (cleanTokenWhyForName(name)) throw new Error(`clean token why over-matched ${name}`);
}
