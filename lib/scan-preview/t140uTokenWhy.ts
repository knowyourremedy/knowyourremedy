import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const SODIUM_CARBONATE = 'Sodium carbonate is a mineral salt used as a filler or to set acidity.';
const POTASSIUM_HYDROXIDE = 'Potassium hydroxide is a pH adjuster used in a trace amount.';
const POTASSIUM_BICARBONATE = 'Potassium bicarbonate is a mineral salt used as a filler or to set acidity.';
const ORGANIC_CARNAUBA = 'Organic carnauba wax is a plant wax used as a polishing coating on tablets.';
const ORGANIC_LECITHIN = 'Organic sunflower lecithin is a phospholipid from sunflower seeds used as an emulsifier.';
const GLUCOSE = 'Glucose is a simple sugar used as a sweetener or filler.';
const ETHYL = 'Ethyl alcohol is a fermented solvent used to extract herbs in tinctures.';
const SIMETHICONE = 'Simethicone is an anti-gas agent. On an other-ingredients line it is not the labeled active.';
const SORBITAN = 'Sorbitan is an emulsifier. It is not the sugar alcohol sorbitol.';
const BENZYL =
  'Benzyl alcohol has caused gasping syndrome in newborns at high doses. At ordinary doses in older children and adults it is far below that threshold.';
const TOCOPHERYL = 'Tocopheryl acetate is a vitamin E ester used as an antioxidant.';
const DEXTRIN = 'Dextrin is a starch breakdown product used as a filler or sweetener bulk.';
const ARTIFICIAL = 'Artificial flavor is a synthetic flavor blend. It is not a named fruit flavor.';
const NAMED_FRUIT = 'This is a named fruit flavor. It is not a fully unnamed flavor blend.';
const EDIBLE_INK = 'This is printing ink on a tablet or capsule. The label does not name every pigment in the ink.';
const ORGANIC_FLAVORS =
  'Organic flavors is an unnamed organic flavor blend. It is graded Limited and counts toward a 3+ Limited stack.';
const NATURAL_AND_ARTIFICIAL =
  'This is a natural and artificial flavor mixture. The label does not list every part of the mixture. It is graded Limited and counts toward a 3+ Limited stack.';
const POLYPHOSPHATE =
  'Sodium polyphosphate is a phosphate salt used as a stabilizer. It is graded Limited and counts toward a 3+ Limited stack.';
const BENZOIC =
  'Benzoic acid is a preservative. On its own the risk is low, but it can form a trace of benzene when combined with vitamin C. It is graded Limited and counts toward a 3+ Limited stack.';
const PEA =
  'Pea starch is a starch filler. It is not pea protein. It is graded Limited and counts toward a 3+ Limited stack.';
const MODIFIED =
  'This is a modified starch. Plain corn starch and potato starch are a different line. It is graded Limited and counts toward a 3+ Limited stack.';
const MENTHOL =
  'Menthol is a cooling compound. On this label it is an inactive, not the drug. It is graded Limited and counts toward a 3+ Limited stack.';
const DYE =
  'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.';
const MIT = 'Methylisothiazolinone is a preservative used in leave-on creams.';
const BUTYL =
  'Butylparaben is a paraben preservative. The European Union has restricted some parabens because they can disrupt hormones.';
const HYDROGENATED =
  'The panel says hydrogenated. It does not say partial or fully. Partial is the form that contains trans fat, so the grade goes to Not Clean.';

export type T140uGroup =
  | 'sodium carbonate'
  | 'potassium hydroxide'
  | 'potassium bicarbonate'
  | 'organic carnauba wax'
  | 'organic sunflower lecithin'
  | 'glucose'
  | 'ethyl alcohol'
  | 'simethicone'
  | 'sorbitan'
  | 'benzyl alcohol'
  | 'tocopheryl acetate'
  | 'dextrin'
  | 'artificial flavor'
  | 'named fruit flavor'
  | 'edible ink'
  | 'organic flavors'
  | 'natural and artificial flavor'
  | 'sodium polyphosphate'
  | 'benzoic acid'
  | 'pea starch'
  | 'modified starch'
  | 'menthol'
  | 'red 3'
  | 'red 40'
  | 'yellow 5'
  | 'red 7'
  | 'methylisothiazolinone'
  | 'butylparaben'
  | 'hydrogenated';

const WHY: Record<T140uGroup, string> = {
  'sodium carbonate': SODIUM_CARBONATE,
  'potassium hydroxide': POTASSIUM_HYDROXIDE,
  'potassium bicarbonate': POTASSIUM_BICARBONATE,
  'organic carnauba wax': ORGANIC_CARNAUBA,
  'organic sunflower lecithin': ORGANIC_LECITHIN,
  glucose: GLUCOSE,
  'ethyl alcohol': ETHYL,
  simethicone: SIMETHICONE,
  sorbitan: SORBITAN,
  'benzyl alcohol': BENZYL,
  'tocopheryl acetate': TOCOPHERYL,
  dextrin: DEXTRIN,
  'artificial flavor': ARTIFICIAL,
  'named fruit flavor': NAMED_FRUIT,
  'edible ink': EDIBLE_INK,
  'organic flavors': ORGANIC_FLAVORS,
  'natural and artificial flavor': NATURAL_AND_ARTIFICIAL,
  'sodium polyphosphate': POLYPHOSPHATE,
  'benzoic acid': BENZOIC,
  'pea starch': PEA,
  'modified starch': MODIFIED,
  menthol: MENTHOL,
  'red 3': DYE,
  'red 40': DYE,
  'yellow 5': DYE,
  'red 7': DYE,
  methylisothiazolinone: MIT,
  butylparaben: BUTYL,
  hydrogenated: HYDROGENATED,
};

export const T140U_EXPECTED_RISK: Record<T140uGroup, 'cleared' | 'moderate' | 'limited' | 'high'> = {
  'sodium carbonate': 'cleared',
  'potassium hydroxide': 'cleared',
  'potassium bicarbonate': 'cleared',
  'organic carnauba wax': 'cleared',
  'organic sunflower lecithin': 'cleared',
  glucose: 'cleared',
  'ethyl alcohol': 'cleared',
  simethicone: 'moderate',
  sorbitan: 'moderate',
  'benzyl alcohol': 'moderate',
  'tocopheryl acetate': 'moderate',
  dextrin: 'moderate',
  'artificial flavor': 'moderate',
  'named fruit flavor': 'moderate',
  'edible ink': 'moderate',
  'organic flavors': 'limited',
  'natural and artificial flavor': 'limited',
  'sodium polyphosphate': 'limited',
  'benzoic acid': 'limited',
  'pea starch': 'limited',
  'modified starch': 'limited',
  menthol: 'limited',
  'red 3': 'high',
  'red 40': 'high',
  'yellow 5': 'high',
  'red 7': 'high',
  methylisothiazolinone: 'high',
  butylparaben: 'high',
  hydrogenated: 'high',
};

const LISTED = new Set([
  'sodium carbonate',
  'potassium hydroxide',
  'potassium bicarbonate',
  'organic carnauba wax',
  'organic sunflower lecithin',
  'glucose',
  'ethyl alcohol',
  'simethicone',
  'sorbitan',
  'sorbitan monooleate',
  'sorbitol sorbitan',
  'sorbitol sorbitan solution',
  'benzyl alcohol',
  'tocopheryl acetate',
  'dextrin',
  'artificial flavor',
  'artificial flavors',
  'natural mixed berry flavor',
  'organic cherry flavor',
  'natural lemon flavor',
  'natural raspberry flavor',
  'edible ink',
  'white edible ink',
  'organic flavors',
  'natural and artificial flavors',
  'natural and artificial orange flavor',
  'sodium polyphosphate',
  'benzoic acid',
  'pea starch',
  'organic pea starch',
  'modified starch',
  'modified starch / pea starch',
  'menthol',
  'fd&c red no. 3',
  'fd&c red #40',
  'fd&c red no. 40 lake',
  'fd&c yellow no. 5',
  'd&c red no. 7',
  'd&c red no. 7 calcium lake',
  'methylisothiazolinone',
  'butylparaben',
  'fully hydrogenated palm oil',
  'hydrogenated cottonseed oil',
  'hydrogenated vegetable oil (soy)',
  'hydrogenated vegetable oil (cottonseed)',
]);

function norm(name: string): string {
  let text = name.trim().toLowerCase().replace(/[®™¹²³⁴⁵⁶⁷⁸⁹⁰]/g, '');
  text = text.replace(/[‐‑–—-]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();
  text = text.replace(/[.,;:!?*%]+$/g, '').trim();
  return text;
}

function dyeWords(name: string): string[] {
  let text = name.toLowerCase();
  text = text.replace(/fd\s*&+\s*c/g, ' fdc ');
  text = text.replace(/d\s*&+\s*c/g, ' dc ');
  text = text.replace(/&/g, ' ');
  text = text.replace(/[#.]/g, ' ');
  text = text.replace(/[^a-z0-9]+/g, ' ');
  return text.trim().split(/\s+/).filter(Boolean);
}

function oneColor(words: string[]): boolean {
  return words.filter((word) => ['red', 'yellow', 'blue', 'green'].includes(word)).length === 1;
}

function dyeAllowed(words: string[], extra: string[]): boolean {
  const ok = new Set(['fdc', 'fd', 'c', 'dc', 'd', 'no', 'lake', 'aluminum', 'aluminium', 'al', 'calcium', 'tartrazine', 'color', 'colour', ...extra]);
  return words.every((word) => ok.has(word));
}

function isRed3(name: string): boolean {
  const words = dyeWords(name);
  if (!oneColor(words) || !words.includes('red') || !words.includes('3')) return false;
  if (['30', '33', '27', '28', '40', '7'].some((number) => words.includes(number))) return false;
  return dyeAllowed(words, ['red', '3']);
}

function isRed40(name: string): boolean {
  const words = dyeWords(name);
  if (!oneColor(words) || !words.includes('red') || !words.includes('40')) return false;
  return dyeAllowed(words, ['red', '40']);
}

function isYellow5(name: string): boolean {
  const words = dyeWords(name);
  if (!oneColor(words) || !words.includes('yellow') || !words.includes('5')) return false;
  if (words.includes('6') || words.includes('10')) return false;
  return dyeAllowed(words, ['yellow', '5']);
}

function isRed7(name: string): boolean {
  const words = dyeWords(name);
  if (!oneColor(words) || !words.includes('red') || !words.includes('7')) return false;
  if (['27', '28', '30', '33', '40', '3'].some((number) => words.includes(number))) return false;
  return dyeAllowed(words, ['red', '7']);
}

function isEthylAlcohol(key: string): boolean {
  if (/phenyl|phenethyl/.test(key)) return false;
  if (key === 'alcohol') return false;
  if (key === 'ethyl alcohol' || key === 'ethanol' || key === 'ethanol (dehydrated alcohol)' || key === 'alcohol / ethanol') {
    return true;
  }
  const rest = key
    .replace(/\b(ethyl alcohol|ethanol|dehydrated alcohol|certified|organic)\b/g, ' ')
    .replace(/[%/\d-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return rest.length === 0 && /\b(ethyl alcohol|ethanol)\b/.test(key);
}

function isNamedFruitFlavor(key: string): boolean {
  if (/artificial|as flavor|juice|concentrate|blend|\boil\b|extract|with other|and other|& other/.test(key)) return false;
  if (/^natural flavou?rs\b/.test(key)) return false;
  if (!/\bflavou?r\b/.test(key)) return false;
  if (/^(natural flavou?rs?|organic flavou?rs?)$/.test(key)) return false;
  return /\b(berry|berries|lemon|lime|orange|raspberry|strawberry|cherry|grape|pineapple|apple|peach|mango|tangerine|watermelon|cranberry|blueberry|acai|açaí|banana|elderberry|mandarin)\b/.test(key);
}

function isNaturalAndArtificial(key: string): boolean {
  return /natural\s*(?:and|&)\s*artificial/.test(key) && /flavou?r/.test(key);
}

export function t140uGroup(name: string): T140uGroup | undefined {
  const key = norm(name);
  if (key === 'organic carnauba wax' || key === 'carnauba wax (organic)') return 'organic carnauba wax';
  if (key === 'organic sunflower lecithin' || key === 'sunflower lecithin (organic)') return 'organic sunflower lecithin';
  if (key === 'glucose') return 'glucose';
  if (isEthylAlcohol(key)) return 'ethyl alcohol';
  if (key === 'simethicone' || key === 'simethicone emulsion') return 'simethicone';
  if (/\bsorbitan\b/.test(key)) return 'sorbitan';
  if (key === 'benzyl alcohol') return 'benzyl alcohol';
  if (/\btocopher(?:yl|ol) acetate\b/.test(key)) return 'tocopheryl acetate';
  if (key === 'dextrin') return 'dextrin';
  if (key === 'artificial flavor' || key === 'artificial flavors') return 'artificial flavor';
  if (isNaturalAndArtificial(key)) return 'natural and artificial flavor';
  if (key === 'organic flavors' || key === 'organic flavor') return 'organic flavors';
  if (isNamedFruitFlavor(key)) return 'named fruit flavor';
  if (/\bedible ink\b/.test(key)) return 'edible ink';
  if (/modified/.test(key) && /starch/.test(key)) return 'modified starch';
  if (key === 'pea starch' || key === 'organic pea starch' || key === 'pea starch powder') return 'pea starch';
  if (key === 'menthol' || key === 'menthol dl' || key === 'natural menthol') return 'menthol';
  // menthol-dl normalizes to "menthol dl" above.
  if (key === 'sodium carbonate') return 'sodium carbonate';
  if (key === 'potassium hydroxide') return 'potassium hydroxide';
  if (key === 'potassium bicarbonate') return 'potassium bicarbonate';
  if (key === 'sodium polyphosphate') return 'sodium polyphosphate';
  if (key === 'benzoic acid') return 'benzoic acid';
  if (key === 'methylisothiazolinone') return 'methylisothiazolinone';
  if (key === 'butylparaben') return 'butylparaben';
  if (
    key === 'fully hydrogenated palm oil'
    || key === 'hydrogenated cottonseed oil'
    || key === 'hydrogenated vegetable oil (soy)'
    || key === 'hydrogenated vegetable oil (cottonseed)'
  ) {
    return 'hydrogenated';
  }
  if (isRed3(name)) return 'red 3';
  if (isRed40(name)) return 'red 40';
  if (isYellow5(name)) return 'yellow 5';
  if (isRed7(name)) return 'red 7';
  return undefined;
}

export function t140uWhyForName(name: string): string | undefined {
  const group = t140uGroup(name);
  return group ? WHY[group] : undefined;
}

export function t140uIsListedSpelling(name: string): boolean {
  return LISTED.has(norm(name));
}

export function applyT140uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t140uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

/** Stored why only. Grades, notes, plain carnauba, other lecithin, and plain alcohol stay as they are. */
export function applyT140uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT140uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, T140uGroup | undefined]> = [
  ['Sodium carbonate', 'sodium carbonate'],
  ['Potassium hydroxide', 'potassium hydroxide'],
  ['Potassium bicarbonate', 'potassium bicarbonate'],
  ['Organic carnauba wax', 'organic carnauba wax'],
  ['Carnauba wax', undefined],
  ['Carnauba wax (organic)', 'organic carnauba wax'],
  ['Organic sunflower lecithin', 'organic sunflower lecithin'],
  ['Sunflower lecithin', undefined],
  ['Lecithin', undefined],
  ['Sunflower lecithin (organic)', 'organic sunflower lecithin'],
  ['Glucose', 'glucose'],
  ['Glucose syrup', undefined],
  ['Ethyl alcohol', 'ethyl alcohol'],
  ['Ethanol', 'ethyl alcohol'],
  ['Alcohol', undefined],
  ['Phenylethyl alcohol', undefined],
  ['Simethicone', 'simethicone'],
  ['Sorbitan', 'sorbitan'],
  ['sorbitan monooleate', 'sorbitan'],
  ['Sorbitol sorbitan solution', 'sorbitan'],
  ['Sorbitol', undefined],
  ['Benzyl alcohol', 'benzyl alcohol'],
  ['Tocopheryl acetate', 'tocopheryl acetate'],
  ['Dextrin', 'dextrin'],
  ['maltodextrin', undefined],
  ['Artificial flavor', 'artificial flavor'],
  ['Artificial flavors', 'artificial flavor'],
  ['natural and artificial flavors', 'natural and artificial flavor'],
  ['Natural Orange Flavor', 'named fruit flavor'],
  ['Natural Strawberry Flavor', 'named fruit flavor'],
  ['Organic cherry flavor', 'named fruit flavor'],
  ['Natural flavor', undefined],
  ['Organic Flavors', 'organic flavors'],
  ['Edible ink', 'edible ink'],
  ['white edible ink', 'edible ink'],
  ['Pharmaceutical ink', undefined],
  ['Pea Starch', 'pea starch'],
  ['Organic pea starch', 'pea starch'],
  ['Modified starch / pea starch', 'modified starch'],
  ['Modified starch', 'modified starch'],
  ['Corn starch', undefined],
  ['Menthol', 'menthol'],
  ['FD&C Red No. 3', 'red 3'],
  ['FD&C Red #40', 'red 40'],
  ['FD&C Yellow No. 5', 'yellow 5'],
  ['D&C Red No. 7 calcium lake', 'red 7'],
  ['Methylparaben', undefined],
  ['Butylparaben', 'butylparaben'],
  ['Fully hydrogenated palm oil', 'hydrogenated'],
  ['Hydrogenated cottonseed oil', 'hydrogenated'],
  ['Hydrogenated vegetable oil (soy)', 'hydrogenated'],
  ['Hydrogenated Vegetable Oil (Cottonseed)', 'hydrogenated'],
  ['Hydrogenated Palm Oil', undefined],
  ['Methylisothiazolinone', 'methylisothiazolinone'],
];

for (const [name, group] of MUST) {
  const found = t140uGroup(name);
  if (found !== group) throw new Error(`t140u ${name} -> ${found ?? 'none'}`);
  if (group && t140uWhyForName(name) !== WHY[group]) throw new Error(`t140u why ${name}`);
}
