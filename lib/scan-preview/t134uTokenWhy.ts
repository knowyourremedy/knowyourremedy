import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { isT125uBareShellName } from './t125uBareShell';

const MAGNESIUM_STEARATE =
  'Magnesium stearate is a salt of a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const MICROCRYSTALLINE =
  'Microcrystalline cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart in the gut.';
const PURIFIED_WATER =
  'Purified water is plain water with the minerals removed. It is the liquid base of the product.';
const SUCROSE = 'Sucrose is table sugar used as a sweetener or filler.';
const GLYCERIN =
  'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.';
const LACTOSE = 'Lactose is a milk sugar used as a filler in tablets and capsules.';
const STEARIC =
  'Stearic acid is a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const CITRIC = 'Citric acid is a natural acid used to set the acidity of the product.';
const HYPROMELLOSE =
  'Hypromellose is a plant-based cellulose used to make vegetarian capsules or as a tablet coating.';
const GELATIN =
  'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.';
const SILICA =
  'Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption.';
const PECTIN = 'Pectin is a plant fiber used as a thickener or gelling agent.';
const CROSCARMELLOSE =
  'Croscarmellose sodium is a cellulose derivative that helps a tablet break apart in the gut.';
const CARNAUBA = 'Carnauba wax is a plant wax used as a polishing coating on tablets.';
const PHOSPHATE =
  'Dibasic calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.';
const CORN_STARCH = 'Corn starch is a simple starch filler used to bulk a tablet or capsule.';
const POVIDONE = 'Povidone is a synthetic polymer used as a tablet binder.';
const SODIUM_CITRATE = 'Sodium citrate is a salt of citric acid used to set acidity.';
const BEESWAX = 'Beeswax is a natural wax used as a coating or softgel plasticizer.';
const ASCORBYL =
  'Ascorbyl palmitate is a vitamin C derivative used as an antioxidant to keep oils from going rancid.';
const SUNFLOWER =
  'Sunflower oil is a pressed oil from sunflower seeds. It is used as a carrier or fill in softgels.';
const MALIC = 'Malic acid is a natural acid used to set the acidity of the product.';
const GLYCOLATE =
  'Sodium starch glycolate is a starch derivative that helps a tablet break apart in the gut.';
const ACACIA = 'Acacia gum is a natural gum from the acacia tree used as a thickener or binder.';
const XANTHAN = 'Xanthan gum is a fermented polysaccharide used as a thickener.';
const RICE =
  'Rice bran or rice hull is the outer layer of the rice grain used as a simple filler or flow agent.';
const TOCOPHEROL =
  'Mixed tocopherols are vitamin E compounds used as an antioxidant to keep oils from going rancid.';
const DEXTROSE = 'Dextrose is a simple sugar used as a sweetener or filler.';
const TAPIOCA = 'Tapioca syrup is a sweetener made from cassava starch.';
const CALCIUM_CARBONATE = 'Calcium carbonate is a mineral salt used as a filler or to set acidity.';
const TRIETHYL = 'Triethyl citrate is a plasticizer used in tablet coatings.';
const BICARB = 'Sodium bicarbonate is a salt used to adjust pH or as an electrolyte.';
const MONK = 'Monk fruit extract is a high-purity sweetener from the monk fruit.';
const OLIVE = 'Extra virgin olive oil is a pressed oil from olives used as a carrier or fill.';
const GLUCOSE = 'Glucose syrup is a liquid sweetener made from starch.';
const CHLOROPHYLL = 'Chlorophyll is a green plant pigment used as a natural color.';
const MINERAL_OIL = 'Mineral oil is a purified petroleum product used as an ointment base.';

export type T134uGroup =
  | 'magnesium stearate'
  | 'microcrystalline cellulose'
  | 'purified water'
  | 'sucrose'
  | 'glycerin'
  | 'lactose'
  | 'stearic acid'
  | 'citric acid'
  | 'hypromellose'
  | 'gelatin'
  | 'silica'
  | 'pectin'
  | 'croscarmellose sodium'
  | 'carnauba wax'
  | 'dibasic calcium phosphate'
  | 'corn starch'
  | 'povidone'
  | 'sodium citrate'
  | 'beeswax'
  | 'ascorbyl palmitate'
  | 'sunflower oil'
  | 'malic acid'
  | 'sodium starch glycolate'
  | 'acacia gum'
  | 'xanthan gum'
  | 'rice bran'
  | 'mixed tocopherols'
  | 'dextrose'
  | 'tapioca syrup'
  | 'calcium carbonate'
  | 'triethyl citrate'
  | 'sodium bicarbonate'
  | 'monk fruit extract'
  | 'extra virgin olive oil'
  | 'glucose syrup'
  | 'chlorophyll'
  | 'mineral oil';

const WHY: Record<T134uGroup, string> = {
  'magnesium stearate': MAGNESIUM_STEARATE,
  'microcrystalline cellulose': MICROCRYSTALLINE,
  'purified water': PURIFIED_WATER,
  sucrose: SUCROSE,
  glycerin: GLYCERIN,
  lactose: LACTOSE,
  'stearic acid': STEARIC,
  'citric acid': CITRIC,
  hypromellose: HYPROMELLOSE,
  gelatin: GELATIN,
  silica: SILICA,
  pectin: PECTIN,
  'croscarmellose sodium': CROSCARMELLOSE,
  'carnauba wax': CARNAUBA,
  'dibasic calcium phosphate': PHOSPHATE,
  'corn starch': CORN_STARCH,
  povidone: POVIDONE,
  'sodium citrate': SODIUM_CITRATE,
  beeswax: BEESWAX,
  'ascorbyl palmitate': ASCORBYL,
  'sunflower oil': SUNFLOWER,
  'malic acid': MALIC,
  'sodium starch glycolate': GLYCOLATE,
  'acacia gum': ACACIA,
  'xanthan gum': XANTHAN,
  'rice bran': RICE,
  'mixed tocopherols': TOCOPHEROL,
  dextrose: DEXTROSE,
  'tapioca syrup': TAPIOCA,
  'calcium carbonate': CALCIUM_CARBONATE,
  'triethyl citrate': TRIETHYL,
  'sodium bicarbonate': BICARB,
  'monk fruit extract': MONK,
  'extra virgin olive oil': OLIVE,
  'glucose syrup': GLUCOSE,
  chlorophyll: CHLOROPHYLL,
  'mineral oil': MINERAL_OIL,
};

/** Printed names from the founder list. Case and surrounding space are not a second token. */
const LISTED: Record<T134uGroup, readonly string[]> = {
  'magnesium stearate': [
    'Magnesium stearate',
    'Vegetable Magnesium Stearate',
    'Magnesium stearate (vegetable source)',
  ],
  'microcrystalline cellulose': [
    'Microcrystalline cellulose',
    'silicified microcrystalline cellulose',
  ],
  'purified water': ['Purified water', 'Water', 'deionized water'],
  sucrose: ['Sucrose', 'Sugar', 'Cane Sugar', 'Organic cane sugar'],
  glycerin: ['Glycerin', 'Vegetable Glycerine', 'Vegetable Glycerin'],
  lactose: ['Lactose', 'Lactose monohydrate'],
  'stearic acid': ['Stearic acid', 'Vegetable Stearic Acid'],
  'citric acid': ['Citric acid', 'Anhydrous citric acid'],
  hypromellose: [
    'Hypromellose',
    'Hypromellose (cellulose) capsule',
    'Hypromellose (cellulose capsule)',
    'Hydroxypropyl Methylcellulose',
    'Hypromellose (Vegetable Cellulose)',
    'plant-derived capsule (hypromellose)',
    'Vegetable Cellulose Capsule',
    'Vegetable Cellulose (capsule)',
    'Vegetable Cellulose',
  ],
  gelatin: ['Gelatin', 'Bovine Gelatin', 'Gelatin Capsule'],
  silica: ['Silicon dioxide', 'silica'],
  pectin: ['Pectin'],
  'croscarmellose sodium': ['Croscarmellose sodium'],
  'carnauba wax': ['Carnauba wax', 'Organic carnauba wax'],
  'dibasic calcium phosphate': ['Dibasic calcium phosphate', 'Dicalcium phosphate'],
  'corn starch': ['Corn starch', 'Starch'],
  povidone: ['Povidone', 'Crospovidone'],
  'sodium citrate': ['Sodium citrate'],
  beeswax: ['Beeswax'],
  'ascorbyl palmitate': ['Ascorbyl palmitate'],
  'sunflower oil': ['Sunflower oil'],
  'malic acid': ['Malic acid'],
  'sodium starch glycolate': ['Sodium starch glycolate'],
  'acacia gum': ['Gum arabic', 'acacia gum'],
  'xanthan gum': ['Xanthan gum'],
  'rice bran': ['Rice Bran', 'Rice hulls', 'Whole Rice Concentrate', 'Rice Bran Extract'],
  'mixed tocopherols': ['Mixed tocopherols', 'd-alpha tocopherol', 'Mixed tocopherols / d-alpha tocopherol'],
  dextrose: ['Dextrose'],
  'tapioca syrup': ['Tapioca Syrup', 'Organic tapioca syrup'],
  'calcium carbonate': ['Calcium carbonate'],
  'triethyl citrate': ['Triethyl citrate'],
  'sodium bicarbonate': ['Sodium bicarbonate'],
  'monk fruit extract': ['Monk Fruit Extract'],
  'extra virgin olive oil': ['Extra Virgin Olive Oil'],
  'glucose syrup': ['Glucose syrup'],
  chlorophyll: ['Chlorophyll'],
  'mineral oil': ['Mineral oil'],
};

/** Same ingredient, not written on the founder list. */
const EXTRA: Record<string, T134uGroup> = {
  'stearic acid (vegetable source)': 'stearic acid',
  'citric acid anhydrous': 'citric acid',
  'vegetable cellulose (capsules)': 'hypromellose',
  'hypromellose (capsule)': 'hypromellose',
  'hypromellose capsule': 'hypromellose',
  'hypromellose (cellulose)': 'hypromellose',
  hypromelloses: 'hypromellose',
  'gelatin (capsule)': 'gelatin',
  'gelatin (capsules)': 'gelatin',
  'gelatin (bovine)': 'gelatin',
  'glycerin vegetable': 'glycerin',
  'sodium croscarmellose': 'croscarmellose sodium',
  'carnauba wax (organic)': 'carnauba wax',
  'di calcium phosphate': 'dibasic calcium phosphate',
  'dicalcium phosphate (dcp)': 'dibasic calcium phosphate',
  cornstarch: 'corn starch',
  'zea mays (corn) starch': 'corn starch',
  'maize (corn) starch': 'corn starch',
  'l malic acid': 'malic acid',
  'gum acacia': 'acacia gum',
  'acacia (gum arabic)': 'acacia gum',
  'acacia / gum arabic': 'acacia gum',
  'gum arabic (acacia senegal)': 'acacia gum',
  'cane sugar (organic)': 'sucrose',
  'water (purified)': 'purified water',
  'rice hull': 'rice bran',
  'd alpha tocopherols': 'mixed tocopherols',
  'silica / silicon dioxide': 'silica',
  'silicon dioxide / silica': 'silica',
};

const KEY_GROUP = new Map<string, T134uGroup>();
const LISTED_FOLD = new Set<string>();

export function t134uTokenKey(name: string): string {
  let text = name.trim().toLowerCase().replace(/[®™]/g, '');
  text = text.replace(/[‐‑–—-]/g, ' ');
  text = text.replace(/[[\]]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();
  text = text.replace(/[.,;:!?*%]+$/g, '').trim();
  text = text.replace(/\bglycerine\b/g, 'glycerin');
  return text;
}

for (const [group, names] of Object.entries(LISTED) as Array<[T134uGroup, readonly string[]]>) {
  for (const name of names) {
    KEY_GROUP.set(t134uTokenKey(name), group);
    LISTED_FOLD.add(name.trim().toLowerCase().replace(/\s+/g, ' '));
  }
}
for (const [key, group] of Object.entries(EXTRA)) KEY_GROUP.set(key, group);

export function t134uGroup(name: string): T134uGroup | undefined {
  if (isT125uBareShellName(name)) return undefined;
  return KEY_GROUP.get(t134uTokenKey(name));
}

export function t134uWhyForName(name: string): string | undefined {
  const group = t134uGroup(name);
  return group ? WHY[group] : undefined;
}

export function t134uIsListedSpelling(name: string): boolean {
  return LISTED_FOLD.has(name.trim().toLowerCase().replace(/\s+/g, ' '));
}

export function applyT134uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t134uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

/** Stored why only. Grades, notes, locks, and bare shells stay as they are. */
export function applyT134uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT134uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, T134uGroup]> = [
  ['Magnesium stearate', 'magnesium stearate'],
  ['Vegetable Magnesium Stearate', 'magnesium stearate'],
  ['Magnesium stearate (vegetable source)', 'magnesium stearate'],
  ['Microcrystalline cellulose', 'microcrystalline cellulose'],
  ['silicified microcrystalline cellulose', 'microcrystalline cellulose'],
  ['Purified water', 'purified water'],
  ['Water', 'purified water'],
  ['deionized water', 'purified water'],
  ['Sucrose', 'sucrose'],
  ['Sugar', 'sucrose'],
  ['Cane Sugar', 'sucrose'],
  ['Organic cane sugar', 'sucrose'],
  ['Glycerin', 'glycerin'],
  ['Glycerine', 'glycerin'],
  ['Vegetable Glycerine', 'glycerin'],
  ['Vegetable Glycerin', 'glycerin'],
  ['Lactose', 'lactose'],
  ['Lactose monohydrate', 'lactose'],
  ['Stearic acid', 'stearic acid'],
  ['Vegetable Stearic Acid', 'stearic acid'],
  ['Citric acid', 'citric acid'],
  ['Anhydrous citric acid', 'citric acid'],
  ['Hypromellose', 'hypromellose'],
  ['Hypromellose (cellulose) capsule', 'hypromellose'],
  ['Hypromellose (cellulose capsule)', 'hypromellose'],
  ['Hydroxypropyl Methylcellulose', 'hypromellose'],
  ['Hydroxypropyl-methylcellulose', 'hypromellose'],
  ['Hypromellose (Vegetable Cellulose)', 'hypromellose'],
  ['plant-derived capsule (hypromellose)', 'hypromellose'],
  ['Vegetable Cellulose Capsule', 'hypromellose'],
  ['Vegetable Cellulose (capsule)', 'hypromellose'],
  ['Vegetable Cellulose', 'hypromellose'],
  ['Gelatin', 'gelatin'],
  ['Bovine Gelatin', 'gelatin'],
  ['Gelatin Capsule', 'gelatin'],
  ['Silicon dioxide', 'silica'],
  ['silica', 'silica'],
  ['Pectin', 'pectin'],
  ['Croscarmellose sodium', 'croscarmellose sodium'],
  ['Carnauba wax', 'carnauba wax'],
  ['Organic carnauba wax', 'carnauba wax'],
  ['Dibasic calcium phosphate', 'dibasic calcium phosphate'],
  ['Dicalcium phosphate', 'dibasic calcium phosphate'],
  ['Corn starch', 'corn starch'],
  ['Starch', 'corn starch'],
  ['Povidone', 'povidone'],
  ['Crospovidone', 'povidone'],
  ['Sodium citrate', 'sodium citrate'],
  ['Beeswax', 'beeswax'],
  ['Ascorbyl palmitate', 'ascorbyl palmitate'],
  ['Sunflower oil', 'sunflower oil'],
  ['Malic acid', 'malic acid'],
  ['Sodium starch glycolate', 'sodium starch glycolate'],
  ['Gum arabic', 'acacia gum'],
  ['acacia gum', 'acacia gum'],
  ['Xanthan gum', 'xanthan gum'],
  ['Rice Bran', 'rice bran'],
  ['Rice hulls', 'rice bran'],
  ['Whole Rice Concentrate', 'rice bran'],
  ['Rice Bran Extract', 'rice bran'],
  ['Mixed tocopherols', 'mixed tocopherols'],
  ['d-alpha tocopherol', 'mixed tocopherols'],
  ['Mixed tocopherols / d-alpha tocopherol', 'mixed tocopherols'],
  ['Dextrose', 'dextrose'],
  ['Tapioca Syrup', 'tapioca syrup'],
  ['Organic tapioca syrup', 'tapioca syrup'],
  ['Calcium carbonate', 'calcium carbonate'],
  ['Triethyl citrate', 'triethyl citrate'],
  ['Sodium bicarbonate', 'sodium bicarbonate'],
  ['Monk Fruit Extract', 'monk fruit extract'],
  ['Extra Virgin Olive Oil', 'extra virgin olive oil'],
  ['Extra-virgin olive oil', 'extra virgin olive oil'],
  ['Glucose syrup', 'glucose syrup'],
  ['Chlorophyll', 'chlorophyll'],
  ['Mineral oil', 'mineral oil'],
  ['Mineral oil*', 'mineral oil'],
];

for (const [name, group] of MUST) {
  if (t134uGroup(name) !== group || t134uWhyForName(name) !== WHY[group]) {
    throw new Error(`t134u missed ${name}`);
  }
}

for (const name of [
  'Vegetable Capsule',
  'Vegetarian Capsule',
  'Vegan Capsule',
  'Veggie Softgel',
  'modified cellulose gum',
  'colloidal silicon dioxide',
  'Modified vegetable cellulose',
  'organic glycerin',
  'distilled water',
  'sucrose stearate',
  'sugar spheres',
  'Croscarmellose',
  'pregelatinized starch',
  'calcium silicate',
  'silica gel',
  'fish gelatin',
  'copovidone',
  'Yellow Beeswax',
  'Light mineral oil',
  'Organic sunflower oil',
  'Olive oil',
  'Monk Fruit',
  'Chlorophyllin',
  'Polydextrose',
  'Lactose anhydrous',
  'HPMC (vegetable capsule)',
  'Vegan Capsule (hydroxypropyl methylcellulose, water)',
]) {
  if (t134uWhyForName(name)) throw new Error(`t134u over-matched ${name}`);
}
