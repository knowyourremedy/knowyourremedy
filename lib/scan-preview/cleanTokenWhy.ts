import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const GELATIN = 'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.';
const GLYCERIN = 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix. In plant-based products it is vegetable-derived.';
const WATER = 'This is plain water used as the liquid base. Spring or artesian water is groundwater that rises naturally.';
const CELLULOSE = 'Cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart.';
const STEARIC = 'Stearic acid is a fatty acid used as a lubricant so a tablet presses and releases from the mold cleanly.';
const PHOSPHATE = 'Calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.';
const OLIVE = 'Olive oil is a pressed oil from olives. It is used as a carrier or fill in softgels and liquids.';
const COCONUT = 'Coconut oil is a pressed oil from coconut meat. It is used as a carrier or fill.';
const SUNFLOWER = 'Sunflower oil is a pressed oil from sunflower seeds. It is used as a carrier or fill in softgels.';
const FISH_OIL = 'Fish oil is oil from fish. It is used as the fill in softgels or as a liquid.';
const PEPPERMINT = 'Peppermint oil is the essential oil distilled from peppermint leaves. It is used as a flavor or active in small amounts.';
const LEMON = 'Lemon oil is the essential oil from lemon peel. It is used as a flavor or active in small amounts.';
const HONEY = 'Honey is a natural sweetener made by bees. It is used in small amounts in liquids and gummies.';
const ACACIA = 'Acacia gum is a natural gum from the acacia tree. It is used as a thickener or binder.';
const INULIN = 'Inulin is a plant fiber from chicory or other roots. It is used as a prebiotic filler.';
const PULLULAN = 'Pullulan is a fermented polysaccharide used to make clear vegetarian capsules.';
const HYPROMELLOSE = 'Hypromellose is a plant-based cellulose used to make vegetarian capsules or as a tablet coating.';
const RICE = 'Rice hull or rice flour is a simple starch filler from the rice grain. It is used to bulk a tablet or capsule.';
const ALCOHOL = 'Organic alcohol is a fermented solvent used to extract herbs in tinctures.';
const PREGELATINIZED = 'Pregelatinized starch is a processed starch used as a filler or binder in tablets.';
const SUNFLOWER_LECITHIN = 'Sunflower lecithin is a phospholipid from sunflower seeds used as an emulsifier so oils and water stay mixed.';
const RICE_BRAN = 'Rice bran is the outer layer of the rice grain. It is used as a simple filler or source of oil.';

export type CleanAliasGroup =
  | 'gelatin'
  | 'glycerin'
  | 'water'
  | 'cellulose'
  | 'stearic'
  | 'phosphate'
  | 'olive oil'
  | 'coconut oil'
  | 'sunflower oil'
  | 'fish oil'
  | 'peppermint oil'
  | 'lemon oil'
  | 'honey'
  | 'acacia gum'
  | 'inulin'
  | 'pullulan'
  | 'hypromellose'
  | 'rice'
  | 'organic alcohol'
  | 'pregelatinized starch'
  | 'sunflower lecithin'
  | 'rice bran';

const GROUP_WHY: Record<CleanAliasGroup, string> = {
  gelatin: GELATIN,
  glycerin: GLYCERIN,
  water: WATER,
  cellulose: CELLULOSE,
  stearic: STEARIC,
  phosphate: PHOSPHATE,
  'olive oil': OLIVE,
  'coconut oil': COCONUT,
  'sunflower oil': SUNFLOWER,
  'fish oil': FISH_OIL,
  'peppermint oil': PEPPERMINT,
  'lemon oil': LEMON,
  honey: HONEY,
  'acacia gum': ACACIA,
  inulin: INULIN,
  pullulan: PULLULAN,
  hypromellose: HYPROMELLOSE,
  rice: RICE,
  'organic alcohol': ALCOHOL,
  'pregelatinized starch': PREGELATINIZED,
  'sunflower lecithin': SUNFLOWER_LECITHIN,
  'rice bran': RICE_BRAN,
};

/** Exact printed names. Trailing punctuation is ignored. Other qualifiers are not. */
const EXACT_NAME_GROUP: Record<string, CleanAliasGroup> = {
  water: 'water',
  'deionized water': 'water',
  'usp purified water': 'water',
  'purified water usp': 'water',
  'vegetable cellulose capsule': 'hypromellose',
  'methylcellulose capsule': 'hypromellose',
  'modified vegetable cellulose': 'hypromellose',
  'vegetarian capsule (cellulose, water)': 'hypromellose',
  'hypromellose (cellulose capsule)': 'hypromellose',
  'cellulose capsule': 'hypromellose',
  'vegetable glycerin': 'glycerin',
  'vegetable glycerine': 'glycerin',
  'gelatin capsule': 'gelatin',
  'magnesium stearate (vegetable source)': 'stearic',
  'pregelatinized starch': 'pregelatinized starch',
  'sunflower lecithin': 'sunflower lecithin',
  'rice bran': 'rice bran',
  'rice bran concentrate': 'rice bran',
  'rice bran oil': 'rice bran',
};

function exactNameKey(name: string): string {
  let key = name.trim().toLowerCase().replace(/\s+/g, ' ');
  let previous = '';
  while (key !== previous) {
    previous = key;
    key = key.replace(/[.,;:!?]+$/g, '').trim();
  }
  return key;
}

export function cleanAliasText(name: string): string {
  let text = name.toLowerCase().replace(/[®™]/g, '');
  text = text.replace(/[‐‑–—-]/g, ' ');
  text = text.replace(/[()[\]{}]/g, ' ');
  text = text.replace(/[/,;:+&]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();
  text = text.replace(/[.\-]+$/g, '').trim();
  return text;
}

function wordsLeft(text: string, allowed: string[]): string[] {
  const skip = new Set(allowed);
  return text.split(' ').filter((word) => word.length > 0 && !skip.has(word) && !/^\d+%?$/.test(word));
}

function hardSkip(text: string): boolean {
  if (/hydrogenat|medium chain|\bmct\b|krill|cod liver|natural flavor|pregelatin|\bethylcellulose\b|croscarmellose|cellulose gum/.test(text)) {
    return true;
  }
  if (/\bmethylcellulose\b/.test(text) && !text.includes('hydroxypropyl')) return true;
  if (/^veg(?:etable|gie) capsules?$/.test(text)) return true;
  if (/vegetable cellulose capsules?$/.test(text)) return true;
  if (text === 'capsule vegetable cellulose') return true;
  if (/modified/.test(text) && /cellulose/.test(text)) return true;
  return false;
}

function isHypromellose(text: string): boolean {
  if (!/hypromellose|\bhpmc\b|hydroxypropyl\s*-?\s*methylcellulose/.test(text)) return false;
  if (/gellan|chlorophyll|glycer/.test(text)) return false;
  const replaced = text.replace(/hydroxypropyl\s*-?\s*methylcellulose/g, 'hypromellose');
  const rest = wordsLeft(replaced, [
    'hypromellose', 'hpmc', 'hydroxypropyl', 'methylcellulose', 'cellulose', 'capsule', 'capsules',
    'shell', 'vegan', 'vegetarian', 'vegetable', 'plant', 'plant-derived', 'derived', 'from', 'pine',
    'bark', 'tree', 'water', 'and', 'based', 'a',
  ]);
  return rest.length === 0;
}

function isGelatin(text: string): boolean {
  if (!/\bgelatin\b/.test(text)) return false;
  if (/tapioca|glycer|water|\boil\b/.test(text)) return false;
  const rest = wordsLeft(text, [
    'gelatin', 'bovine', 'beef', 'fish', 'porcine', 'pork', 'non', 'non-gmo', 'gmo', 'kosher', 'halal',
    'capsule', 'capsules', 'shell', 'softgel', 'softgels', '100%', 'certified', 'organic', 'usp', 'nf', 'fcc',
  ]);
  return rest.length === 0;
}

function isGlycerin(text: string): boolean {
  if (!/\bglycer(?:in|ol|ine)\b/.test(text)) return false;
  if (/\bgelatin\b|\boil\b|triglyceride|\bwater\b|alcohol|lecithin/.test(text)) return false;
  const rest = wordsLeft(text, [
    'glycerin', 'glycerol', 'glycerine', 'vegetable', 'organic', 'certified', 'plant', 'derived',
    'non', 'non-gmo', 'gmo', 'usp', 'nf', 'fcc', 'anhydrous', 'source', 'by', 'volume', 'and',
  ]);
  return rest.length === 0;
}

function isWater(text: string): boolean {
  if (!/\bwater\b/.test(text)) return false;
  if (/watercress|seawater|sea water|deionized|de-ionized|filtered|injection|salt|glycer|gelatin|alcohol|\boil\b|capsule|hypromellose|cellulose/.test(text)) {
    return false;
  }
  if (!/\b(purified|distilled|spring|artesian)\b/.test(text)) return false;
  const rest = wordsLeft(text, [
    'water', 'purified', 'distilled', 'spring', 'artesian', 'rocky', 'mountain', 'usp', 'nf', 'fcc',
  ]);
  return rest.length === 0;
}

function isCellulose(text: string): boolean {
  if (!/\bcellulose\b/.test(text)) return false;
  if (/hypromellose|hydroxypropyl|methylcellulose|ethylcellulose|croscarmellose|\bgum\b|modified|water/.test(text)) return false;
  if (/vegetable cellulose capsule/.test(text) || text === 'capsule vegetable cellulose') return false;
  const rest = wordsLeft(text, [
    'cellulose', 'microcrystalline', 'silicified', 'powdered', 'powder', 'vegetable', 'plant', 'based',
    'origin', 'hypoallergenic', 'fiber', 'fibre', 'capsule', 'capsules', 'caps', 'vegi', 'non',
    'non-gmo', 'gmo', 'organic', 'certified', 'usp',
  ]);
  return rest.length === 0;
}

function isStearic(text: string): boolean {
  if (!/\bstearic acid\b|\bmagnesium stearate\b|\bcalcium stearate\b/.test(text)) return false;
  if (/laurate|fumarate|polyglyceryl/.test(text)) return false;
  const rest = wordsLeft(text, [
    'stearic', 'acid', 'magnesium', 'calcium', 'stearate', 'vegetable', 'plant', 'source', 'organic',
    'non', 'non-gmo', 'gmo', 'usp', 'nf',
  ]);
  return rest.length === 0;
}

function isPhosphate(text: string): boolean {
  if (/sodium|buffer/.test(text)) return false;
  if (!/\bphosphate\b/.test(text) || !/\b(calcium|dicalcium|tricalcium)\b/.test(text)) return false;
  const rest = wordsLeft(text, [
    'calcium', 'phosphate', 'dibasic', 'dicalcium', 'tricalcium', 'anhydrous', 'usp', 'nf',
  ]);
  return rest.length === 0;
}

function isOlive(text: string): boolean {
  if (!/\bolive oil\b|\bolive fruit oil\b|\bolea europaea\b/.test(text)) return false;
  if (/sunflower|coconut|fish|peppermint|lemon|hydrogenat/.test(text)) return false;
  const rest = wordsLeft(text, [
    'olive', 'oil', 'fruit', 'extra', 'virgin', 'extra-virgin', 'organic', 'pure', 'softgel', 'fill',
    'capsule', 'base', 'olea', 'europaea', 'cholecalciferol', 'carrier', 'certified',
  ]);
  return rest.length === 0;
}

function isCoconut(text: string): boolean {
  if (/mct|medium chain|hydrogenat|nectar|blossom/.test(text)) return false;
  if (!/\bcoconut oil\b/.test(text)) return false;
  const rest = wordsLeft(text, ['coconut', 'oil', 'organic', 'fractionated', 'virgin', 'certified', 'pure']);
  return rest.length === 0;
}

function isSunflower(text: string): boolean {
  if (/lecithin|phospho|hydrogenat|mct/.test(text)) return false;
  if (!/\bsunflower(?: seed)? oil\b/.test(text)) return false;
  const rest = wordsLeft(text, ['sunflower', 'seed', 'oil', 'high', 'oleic', 'organic', 'non', 'non-gmo', 'gmo', 'certified']);
  return rest.length === 0;
}

function isFishOil(text: string): boolean {
  if (/krill|cod liver|liver oil/.test(text)) return false;
  if (!/\bfish oil\b/.test(text)) return false;
  const rest = wordsLeft(text, [
    'fish', 'oil', 'liquid', 'powder', 'oils', 'cod', 'anchovy', 'jack', 'pompano', 'smelt', 'salmon',
    'sardine', 'mackerel',
  ]);
  return rest.length === 0;
}

function isPeppermint(text: string): boolean {
  if (/leaf|leaves|eucalyptus|cajeput|wintergreen|juniper|clove/.test(text)) return false;
  if (!/peppermint oil|oils of peppermint|oil of peppermint/.test(text)) return false;
  const rest = wordsLeft(text, ['peppermint', 'oil', 'oils', 'of', 'organic', 'essential', 'named', 'certified']);
  return rest.length === 0;
}

function isLemon(text: string): boolean {
  if (/emulsion|juice|citric|crystall/.test(text)) return false;
  if (!/lemon oil|lemon essential oil|essential oil of lemon|named lemon oil/.test(text)) return false;
  const rest = wordsLeft(text, ['lemon', 'oil', 'essential', 'organic', 'named', 'of', 'certified']);
  return rest.length === 0;
}

function isHoney(text: string): boolean {
  if (/wildflower|manuka/.test(text)) return false;
  if (!/\bhoney\b/.test(text)) return false;
  const rest = wordsLeft(text, ['honey', 'organic', 'locally', 'sourced', 'raw', 'certified', 'pure']);
  return rest.length === 0;
}

function isAcacia(text: string): boolean {
  if (/fiber|fibre/.test(text)) return false;
  if (!/acacia gum|gum acacia|gum arabic|arabic gum/.test(text)) return false;
  const rest = wordsLeft(text, ['acacia', 'gum', 'arabic', 'organic', 'certified']);
  return rest.length === 0;
}

function isInulin(text: string): boolean {
  if (/\bfos\b|fructooligosaccharide/.test(text)) return false;
  if (!/\binulin\b/.test(text)) return false;
  const rest = wordsLeft(text, [
    'inulin', 'organic', 'agave', 'chicory', 'root', 'from', 'jerusalem', 'artichoke', 'extract', 'certified',
  ]);
  return rest.length === 0;
}

function isPullulan(text: string): boolean {
  if (!/\bpullulan\b/.test(text)) return false;
  const rest = wordsLeft(text, [
    'pullulan', 'organic', 'non', 'non-gmo', 'gmo', 'vegetable', 'vegetarian', 'capsule', 'capsules',
    'tapioca', 'from', 'naturally', 'fermented', 'starch', 'certified', 'plant',
  ]);
  return rest.length === 0;
}

function isRice(text: string): boolean {
  if (/bran|syrup|protein|mycel|germ|polish|\boil\b|fiber|fibre|husk extract|hull extract|whole rice|rice concentrate|rice powder|malted rice/.test(text)) {
    return false;
  }
  if (/\bextract\b/.test(text) && !/hull concentrate/.test(text)) return false;
  const hull = /rice hull|rice \(hull\)|\brice hulls?\b/.test(text);
  const flour = /rice flour|rice grain flour/.test(text);
  const starch = /rice starch/.test(text);
  if (!hull && !flour && !starch) return false;
  if ([hull, flour, starch].filter(Boolean).length > 1) return false;
  const rest = wordsLeft(text.replace(/nu-flow/g, 'nu flow'), [
    'rice', 'hull', 'hulls', 'concentrate', 'powder', 'ground', 'flour', 'grain', 'starch', 'brown',
    'organic', 'certified', 'nu', 'flow',
  ]);
  return rest.length === 0;
}

function isOrganicAlcohol(text: string): boolean {
  if (/cane|grape|ethyl|\busp\b|denat|lanolin|cetyl|behenyl|arachidyl|stearyl/.test(text)) return false;
  if (text === 'organic alcohol' || text === 'certified organic alcohol') return true;
  return /^(?:<\s*)?\d+(?:\s*[- ]\s*\d+)?\s*%?\s*(?:by volume\s*)?(?:certified\s+)?organic alcohol$/.test(text);
}

const MATCHERS: Array<[CleanAliasGroup, (text: string) => boolean]> = [
  ['hypromellose', isHypromellose],
  ['gelatin', isGelatin],
  ['glycerin', isGlycerin],
  ['water', isWater],
  ['stearic', isStearic],
  ['phosphate', isPhosphate],
  ['olive oil', isOlive],
  ['coconut oil', isCoconut],
  ['sunflower oil', isSunflower],
  ['fish oil', isFishOil],
  ['peppermint oil', isPeppermint],
  ['lemon oil', isLemon],
  ['honey', isHoney],
  ['acacia gum', isAcacia],
  ['inulin', isInulin],
  ['pullulan', isPullulan],
  ['rice', isRice],
  ['organic alcohol', isOrganicAlcohol],
  ['cellulose', isCellulose],
];

export function cleanAliasGroup(name: string): CleanAliasGroup | undefined {
  const exact = EXACT_NAME_GROUP[exactNameKey(name)];
  if (exact) return exact;
  const text = cleanAliasText(name);
  if (!text || hardSkip(text)) return undefined;
  for (const [group, match] of MATCHERS) {
    if (match(text)) return group;
  }
  return undefined;
}

export function cleanTokenKey(name: string): string {
  return cleanAliasText(name);
}

export function cleanTokenWhyForName(name: string): string | undefined {
  const group = cleanAliasGroup(name);
  return group ? GROUP_WHY[group] : undefined;
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

/** Sets stored why on close aliases only when the catalog grade is Clean. */
export function applyCleanTokenWhy(record: RatingRecord): RatingRecord {
  if (record.verdict !== 'clean') return record;
  const inactiveIngredients = stampCleanTokenWhy(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const matched: Array<[string, CleanAliasGroup]> = [
  ['Gelatin', 'gelatin'],
  ['gelatin (capsule)', 'gelatin'],
  ['Gelatin Capsule', 'gelatin'],
  ['Gelatin (Bovine)', 'gelatin'],
  ['Gelatin (Non-Porcine)', 'gelatin'],
  ['cellulose (vegi caps)', 'cellulose'],
  ['fish gelatin', 'gelatin'],
  ['non-GMO fish gelatin (capsule)', 'gelatin'],
  ['Vegetable Glycerin', 'glycerin'],
  ['organic glycerine', 'glycerin'],
  ['glycerin.', 'glycerin'],
  ['USP Purified Water', 'water'],
  ['Rocky Mountain artesian spring water', 'water'],
  ['Rocky Mountain spring water', 'water'],
  ['distilled water,', 'water'],
  ['Cellulose', 'cellulose'],
  ['Vegetable cellulose', 'cellulose'],
  ['microcrystalline cellulose', 'cellulose'],
  ['Powdered cellulose', 'cellulose'],
  ['Magnesium stearate (vegetable source)', 'stearic'],
  ['calcium stearate', 'stearic'],
  ['dibasic calcium phosphate', 'phosphate'],
  ['Dicalcium phosphate', 'phosphate'],
  ['extra virgin olive oil', 'olive oil'],
  ['organic coconut oil', 'coconut oil'],
  ['high oleic sunflower oil', 'sunflower oil'],
  ['fish oil powder', 'fish oil'],
  ['oils of peppermint', 'peppermint oil'],
  ['named lemon oil', 'lemon oil'],
  ['locally sourced honey', 'honey'],
  ['gum arabic', 'acacia gum'],
  ['agave inulin', 'inulin'],
  ['organic pullulan', 'pullulan'],
  ['Water', 'water'],
  ['Deionized water', 'water'],
  ['Vegetable Cellulose Capsule', 'hypromellose'],
  ['Methylcellulose capsule', 'hypromellose'],
  ['Modified vegetable cellulose', 'hypromellose'],
  ['Vegetarian capsule (cellulose, water)', 'hypromellose'],
  ['cellulose capsule', 'hypromellose'],
  ['Hypromellose (cellulose capsule)', 'hypromellose'],
  ['Pregelatinized starch', 'pregelatinized starch'],
  ['Sunflower lecithin', 'sunflower lecithin'],
  ['Rice bran', 'rice bran'],
  ['rice bran concentrate', 'rice bran'],
  ['Rice bran oil', 'rice bran'],
  ['Vegan Capsule (hydroxypropyl methylcellulose, water)', 'hypromellose'],
  ['HPMC', 'hypromellose'],
  ['rice hull concentrate', 'rice'],
  ['rice flour', 'rice'],
  ['<10% organic alcohol', 'organic alcohol'],
  ['certified organic alcohol', 'organic alcohol'],
];
for (const [name, group] of matched) {
  const got = cleanAliasGroup(name);
  if (got !== group) throw new Error(`clean alias missed ${JSON.stringify(name)} -> ${got} text=${JSON.stringify(cleanAliasText(name))}`);
}
const skipped = [
  'vegetable capsule', 'veggie capsule', 'Vegetable cellulose (capsule)', 'methylcellulose',
  'modified vegetable cellulose (capsule)', 'cellulose gum', 'croscarmellose', 'ethylcellulose',
  'Pregelatinized starch (maize)', 'medium chain triglycerides', 'krill oil', 'cod liver oil', 'natural flavor',
  'Vegetable Capsule (Hypromellose, Gellan Gum)', 'Named vegetarian coating (HPMC / glycerin)',
  'Softgel (gelatin, glycerin, water)', 'Inulin / FOS', 'Filtered Water', 'Watercress', 'Rice Bran Extract',
  'organic sunflower lecithin', 'Rice bran oil (softgel fill)', 'Coconut (MCT) oil', 'Organic Cane Alcohol',
  'Wildflower honey', 'Acacia', 'Stabilized Rice Bran',
];
for (const name of skipped) {
  if (cleanAliasGroup(name)) throw new Error(`clean alias over-matched ${name} -> ${cleanAliasGroup(name)}`);
}
