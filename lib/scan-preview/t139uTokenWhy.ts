import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const ADHESIVE = 'Adhesive is the material that holds a patch on the skin.';
const FERMENT = 'This is a yeast ferment medium used as a food-state base for the nutrients.';
const BEET = 'Beet root powder is a plant color from beets. It is not a synthetic dye.';
const LECITHIN =
  'Lecithin is a phospholipid used as an emulsifier so oils and water stay mixed. Sunflower lecithin is the sunflower form.';
const TOCOPHEROL =
  'Mixed tocopherols are vitamin E compounds used as an antioxidant to keep oils from going rancid.';
const RICE_BRAN =
  'Rice bran or rice hull is the outer layer of the rice grain used as a simple filler or flow agent.';
const GRAPE =
  '27% grape alcohol solution is the liquid that carries a Bach flower remedy. It is graded Caution.';
const POLYACRYLATE = 'Sodium polyacrylate is a gel-forming polymer used as a thickener.';
const LICORICE =
  'Licorice root extract contains glycyrrhizin. Large amounts can raise blood pressure or affect the heart and kidneys in some people.';
const HYDROXY = 'Hydroxyacetophenone is a synthetic antioxidant used in creams.';
const TEA = 'Triethanolamine is a pH adjuster used in creams.';
const AMMONIA = 'Ammonium hydroxide is a pH adjuster used in trace amounts.';
const STEARETH = 'Steareth is a fatty-alcohol ether used as an emulsifier in cream bases.';
const CARMINE = 'Carmine is a red color made from insects. It can cause allergic reactions in some people.';
const FORMALDEHYDE = 'This preservative can release formaldehyde.';
const ERYTHRITOL = 'Erythritol is a sugar alcohol. Large amounts can cause bloating or loose stools.';
const BETA = 'Beta-carotene here is used as a color, not as a vitamin dose.';
const RICE_EXTRACT =
  'Rice extract is an unnamed rice form. It does not name hull, bran, or concentrate. It is graded Limited and counts toward a 3+ Limited stack.';
const BAMBOO =
  'Bamboo extract is a plant silica source used as a flow agent. It is graded Limited and counts toward a 3+ Limited stack.';
const RICE_WAX =
  'Rice bran wax is a wax from rice bran. It is graded Limited and counts toward a 3+ Limited stack.';
const ALOE = 'Aloe vera gel is a plant juice or gel. It is graded Limited and counts toward a 3+ Limited stack.';
const TRACE =
  'Trace Mineral Complex is an unnamed mineral blend. It is graded Limited and counts toward a 3+ Limited stack.';
const IRON =
  'Iron oxide is a mineral color. It is not a synthetic FD&C dye. It is graded Limited and counts toward a 3+ Limited stack.';
const ISOPROPYL =
  'Isopropyl alcohol is a solvent. It is graded Limited and counts toward a 3+ Limited stack.';
const CORN_SYRUP =
  'Corn syrup is a sweetener made from corn. It is graded Limited and counts toward a 3+ Limited stack.';
const ALGINATE =
  'Sodium alginate is a seaweed gum used as a thickener. It is graded Limited and counts toward a 3+ Limited stack.';
const FRUCTOSE =
  'Fructose is a simple sugar used as a sweetener. It is graded Limited and counts toward a 3+ Limited stack.';
const DYE =
  'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.';
const BHT = 'BHT is a preservative. The European Union restricted it in 2022 because it can disrupt hormones.';
const VEGETABLE =
  'Vegetable oil is Not Clean when it is the base of a gummy, lozenge, or chew. You are chewing the oil.';
const SOY = 'Soybean oil is Not Clean when it is the base of a gummy. You are chewing the oil.';
const RICE_OIL = 'Rice bran oil is Not Clean when it is the base of a gummy. You are chewing the oil.';
const CANOLA = 'Canola oil is Not Clean when it is the base of a gummy. You are chewing the oil.';

export const T139U_PREVIOUS_WHY = {
  iron: 'Iron oxide is a mineral color. It is not a synthetic FD&C dye.',
  lecithin: 'Sunflower lecithin is a phospholipid from sunflower seeds used as an emulsifier so oils and water stay mixed.',
  riceBran: RICE_BRAN,
  tocopherol: TOCOPHEROL,
  riceExtract: RICE_EXTRACT,
  bht: BHT,
} as const;

export type T139uGroup =
  | 'adhesive'
  | 'ferment'
  | 'beet'
  | 'lecithin'
  | 'tocopherol'
  | 'rice bran'
  | 'grape alcohol'
  | 'polyacrylate'
  | 'licorice'
  | 'hydroxyacetophenone'
  | 'triethanolamine'
  | 'ammonium hydroxide'
  | 'steareth'
  | 'carmine'
  | 'formaldehyde'
  | 'erythritol'
  | 'beta carotene'
  | 'rice extract'
  | 'bamboo'
  | 'rice bran wax'
  | 'aloe'
  | 'trace mineral'
  | 'iron oxide'
  | 'isopropyl alcohol'
  | 'corn syrup'
  | 'sodium alginate'
  | 'fructose'
  | 'green 3'
  | 'red 28'
  | 'red 30'
  | 'red 7'
  | 'bht'
  | 'vegetable oil'
  | 'soybean oil'
  | 'rice bran oil'
  | 'canola oil';

const WHY: Record<T139uGroup, string> = {
  adhesive: ADHESIVE,
  ferment: FERMENT,
  beet: BEET,
  lecithin: LECITHIN,
  tocopherol: TOCOPHEROL,
  'rice bran': RICE_BRAN,
  'grape alcohol': GRAPE,
  polyacrylate: POLYACRYLATE,
  licorice: LICORICE,
  hydroxyacetophenone: HYDROXY,
  triethanolamine: TEA,
  'ammonium hydroxide': AMMONIA,
  steareth: STEARETH,
  carmine: CARMINE,
  formaldehyde: FORMALDEHYDE,
  erythritol: ERYTHRITOL,
  'beta carotene': BETA,
  'rice extract': RICE_EXTRACT,
  bamboo: BAMBOO,
  'rice bran wax': RICE_WAX,
  aloe: ALOE,
  'trace mineral': TRACE,
  'iron oxide': IRON,
  'isopropyl alcohol': ISOPROPYL,
  'corn syrup': CORN_SYRUP,
  'sodium alginate': ALGINATE,
  fructose: FRUCTOSE,
  'green 3': DYE,
  'red 28': DYE,
  'red 30': DYE,
  'red 7': DYE,
  bht: BHT,
  'vegetable oil': VEGETABLE,
  'soybean oil': SOY,
  'rice bran oil': RICE_OIL,
  'canola oil': CANOLA,
};

export const T139U_EXPECTED_RISK: Record<T139uGroup, 'cleared' | 'moderate' | 'limited' | 'high'> = {
  adhesive: 'cleared',
  ferment: 'cleared',
  beet: 'cleared',
  lecithin: 'cleared',
  tocopherol: 'cleared',
  'rice bran': 'cleared',
  'grape alcohol': 'moderate',
  polyacrylate: 'moderate',
  licorice: 'moderate',
  hydroxyacetophenone: 'moderate',
  triethanolamine: 'moderate',
  'ammonium hydroxide': 'moderate',
  steareth: 'moderate',
  carmine: 'moderate',
  formaldehyde: 'moderate',
  erythritol: 'moderate',
  'beta carotene': 'moderate',
  'rice extract': 'limited',
  bamboo: 'limited',
  'rice bran wax': 'limited',
  aloe: 'limited',
  'trace mineral': 'limited',
  'iron oxide': 'limited',
  'isopropyl alcohol': 'limited',
  'corn syrup': 'limited',
  'sodium alginate': 'limited',
  fructose: 'limited',
  'green 3': 'high',
  'red 28': 'high',
  'red 30': 'high',
  'red 7': 'high',
  bht: 'high',
  'vegetable oil': 'high',
  'soybean oil': 'high',
  'rice bran oil': 'high',
  'canola oil': 'high',
};

const LISTED: Record<T139uGroup, readonly string[]> = {
  adhesive: ['Adhesive'],
  ferment: ['Ferment media (organic brown rice, autolyzed yeast extract, rice protein, yeast [inactive])'],
  beet: ['Beet root powder (for color)'],
  lecithin: ['Organic sunflower lecithin', 'Sunflower Lecithin', 'Lecithin'],
  tocopherol: ['Mixed tocopherols', 'd-alpha tocopherol', 'Mixed tocopherols / d-alpha tocopherol'],
  'rice bran': ['Whole Rice Concentrate', 'Rice Bran', 'Rice hulls'],
  'grape alcohol': ['27% grape alcohol solution'],
  polyacrylate: ['Sodium polyacrylate', 'Polyacrylic acid'],
  licorice: ['Glycyrrhiza extract', 'Licorice Root Powder'],
  hydroxyacetophenone: ['Hydroxyacetophenone'],
  triethanolamine: ['Triethanolamine'],
  'ammonium hydroxide': ['Ammonium hydroxide'],
  steareth: ['Steareth-21', 'Steareth-2', 'Ceteth-20 phosphate'],
  carmine: ['Carmine'],
  formaldehyde: ['DMDM hydantoin', 'Diazolidinyl urea'],
  erythritol: ['Erythritol'],
  'beta carotene': ['Beta Carotene (for color)'],
  'rice extract': ['Organic Rice Extract Blend', 'Rice extract', 'Rice Extract Blend'],
  bamboo: ['Bamboo extract', 'Organic bamboo extract', 'Bamboo Leaf Extract (Silica)', 'Silica (from Bamboo Shoot Extract)'],
  'rice bran wax': ['Rice bran wax'],
  aloe: ['Aloe Vera Gel'],
  'trace mineral': ['Trace Mineral Complex'],
  'iron oxide': ['Iron oxide red', 'iron oxide yellow', 'iron oxide black', 'Iron oxide blends', 'Red iron oxide'],
  'isopropyl alcohol': ['Isopropyl Alcohol'],
  'corn syrup': ['Corn syrup'],
  'sodium alginate': ['Sodium alginate'],
  fructose: ['Fructose'],
  'green 3': ['FD&C Green No. 3'],
  'red 28': ['D&C Red No. 28'],
  'red 30': ['D&C Red No. 30 aluminum lake'],
  'red 7': ['D&C Red No. 7 calcium lake'],
  bht: ['Butylated hydroxytoluene', 'BHT', 'BHT (Preservative)', 'BHT (to retard oxidation)'],
  'vegetable oil': [
    'Vegetable oil',
    'Vegetable oil (coconut, canola)',
    'Vegetable oil (palm and coconut)',
    'Blend of oils (coconut and/or palm)',
  ],
  'soybean oil': ['Soybean oil'],
  'rice bran oil': ['Rice Bran Oil'],
  'canola oil': ['Canola oil'],
};

const EXTRA: Record<string, T139uGroup> = {
  'ferment media': 'ferment',
  'ferment media (organic brown rice, autolyzed yeast extract, rice protein, inactive yeast)': 'ferment',
  'beet powder (color)': 'beet',
  'beet root powder (color)': 'beet',
  'beet powder (for color)': 'beet',
  'beet juice (color)': 'beet',
  'beet juice color': 'beet',
  'beet juice concentrate (color)': 'beet',
  'beet root (color)': 'beet',
  'beet root extract (color)': 'beet',
  'beet root color': 'beet',
  'beet root (for color)': 'beet',
  'beet root juice (for color)': 'beet',
  'organic beet root (color)': 'beet',
  'organic beetroot juice powder (color)': 'beet',
  'beet juice powder (for color)': 'beet',
  'soy lecithin': 'lecithin',
  'lecithin (soy)': 'lecithin',
  'lecithin (soybean)': 'lecithin',
  'non gmo soy lecithin': 'lecithin',
  'sunflower lecithin (organic)': 'lecithin',
  'd alpha tocopherols': 'tocopherol',
  'mixed natural tocopherols': 'tocopherol',
  'natural mixed tocopherols': 'tocopherol',
  'rice hull': 'rice bran',
  'polyacrylic acid solution': 'polyacrylate',
  'sodium polyacrylate (2500000 mw)': 'polyacrylate',
  'steareth 20': 'steareth',
  steareth: 'steareth',
  'ceteth 20': 'steareth',
  'ceteth 10 phosphate': 'steareth',
  'ceteth phosphate': 'steareth',
  'carmine (color)': 'carmine',
  'organic erythritol': 'erythritol',
  'beta carotene (color)': 'beta carotene',
  'beta carotene (coloring)': 'beta carotene',
  'organic rice extract': 'rice extract',
  'bamboo extract (bambusa vulgaris, shoot)': 'bamboo',
  'aloe vera gel (powder)': 'aloe',
  'aloe vera gel (200x dry concentrate)': 'aloe',
  'concentrace mineral complex': 'trace mineral',
  'isopropyl alcohol usp': 'isopropyl alcohol',
  'non gmo corn syrup': 'corn syrup',
  'organic corn syrup': 'corn syrup',
  'vegetable oil (coconut and canola)': 'vegetable oil',
  'vegetable oil (coconut)': 'vegetable oil',
  'vegetable oil (coconut origin)': 'vegetable oil',
  'soy oil': 'soybean oil',
  'adhesive crafted with 25 mg caffeine per patch': 'adhesive',
  'adhesive crafted with 3 mg melatonin per patch': 'adhesive',
  'adhesive crafted with 10 mg caffeine per patch': 'adhesive',
  'adhesive crafted with 10 mg melatonin per patch': 'adhesive',
  'adhesive crafted with 15 mg of caffeine per patch': 'adhesive',
};

const KEY_GROUP = new Map<string, T139uGroup>();
const LISTED_FOLD = new Set<string>();
const VEGETABLE_KEYS = new Set([
  'vegetable oil',
  'vegetable oil (coconut, canola)',
  'vegetable oil (palm and coconut)',
  'blend of oils (coconut and/or palm)',
  'vegetable oil (coconut and canola)',
  'vegetable oil (coconut)',
  'vegetable oil (coconut origin)',
]);
const SOYBEAN = new Set(['soybean oil', 'soy oil']);
const RICE_BRAN_OIL = new Set(['rice bran oil']);
const CANOLA_OIL = new Set(['canola oil']);

function norm(name: string): string {
  let text = name.trim().toLowerCase().replace(/[®™¹²³⁴⁵⁶⁷⁸⁹⁰]/g, '');
  text = text.replace(/[‐‑–—-]/g, ' ');
  text = text.replace(/[[\]]/g, ' ');
  text = text.replace(/\(/g, ' (').replace(/\)/g, ') ');
  text = text.replace(/\s+/g, ' ').trim();
  text = text.replace(/[.,;:!?*%]+$/g, '').trim();
  return text;
}

for (const [group, names] of Object.entries(LISTED) as Array<[T139uGroup, readonly string[]]>) {
  for (const name of names) {
    KEY_GROUP.set(norm(name), group);
    LISTED_FOLD.add(name.trim().toLowerCase().replace(/\s+/g, ' '));
  }
}
for (const [key, group] of Object.entries(EXTRA)) KEY_GROUP.set(norm(key), group);

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
  const ok = new Set(['fdc', 'fd', 'c', 'dc', 'd', 'no', 'lake', 'aluminum', 'aluminium', 'al', 'calcium', 'color', 'colour', ...extra]);
  return words.every((word) => ok.has(word));
}

function isGreen3(name: string): boolean {
  const words = dyeWords(name);
  if (!oneColor(words) || !words.includes('green') || !words.includes('3')) return false;
  return dyeAllowed(words, ['green', '3']);
}

function isRedNumber(name: string, number: string): boolean {
  const words = dyeWords(name);
  if (!oneColor(words) || !words.includes('red') || !words.includes(number)) return false;
  const blocked = ['40', '27', '28', '30', '33', '3', '7', '22'].filter((item) => item !== number);
  if (blocked.some((item) => words.includes(item))) return false;
  return dyeAllowed(words, ['red', number]);
}

function isIronOxide(name: string): boolean {
  const text = norm(name).replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!/\b(iron|ferric|ferrosoferric)\b/.test(text)) return false;
  if (!/\boxides?\b/.test(text)) return false;
  const allowed = new Set([
    'iron', 'oxide', 'oxides', 'ferric', 'ferrous', 'ferrosoferric', 'black', 'red', 'yellow',
    'ochre', 'ocher', 'brown', 'blend', 'blends', 'color', 'colour', 'and',
  ]);
  return text.split(' ').every((word) => allowed.has(word));
}

function stripFunctionParen(key: string): string {
  const match = key.match(/^(.*)\s+\(([^)]+)\)\s*$/);
  if (!match) return key;
  const inner = match[2].trim();
  if (/^(color|colour|coloring|for color|preservative|to preserve freshness|to retard oxidation|bht|antioxidant|as an antioxidant)$/.test(inner)) {
    return match[1].trim();
  }
  return key;
}

export type T139uOilBase = 'gummy' | 'lozenge' | 'chew' | 'other';

export function t139uOilBase(form: string | undefined): T139uOilBase {
  const text = (form ?? '').toLowerCase();
  if (/\b(gummy|gummies)\b/.test(text)) return 'gummy';
  if (/\blozenge\b/.test(text)) return 'lozenge';
  if (/\bchews?\b/.test(text) && !/chewable/.test(text)) return 'chew';
  return 'other';
}

export function t139uOilKind(name: string): 'vegetable oil' | 'soybean oil' | 'rice bran oil' | 'canola oil' | undefined {
  const key = norm(name);
  if (VEGETABLE_KEYS.has(key)) return 'vegetable oil';
  if (SOYBEAN.has(key)) return 'soybean oil';
  if (RICE_BRAN_OIL.has(key)) return 'rice bran oil';
  if (CANOLA_OIL.has(key)) return 'canola oil';
  return undefined;
}

function oilApplies(kind: T139uGroup, form: string | undefined): boolean {
  const base = t139uOilBase(form);
  if (kind === 'vegetable oil') return base === 'gummy' || base === 'lozenge' || base === 'chew';
  return base === 'gummy';
}

export function t139uGroup(name: string, form?: string): T139uGroup | undefined {
  const key = norm(name);
  const oil = t139uOilKind(name);
  if (oil) return oilApplies(oil, form) ? oil : undefined;
  if (/high fructose|corn syrup solids|maltodextrin|hydrogenated lecithin|xylitol/.test(key)) return undefined;
  if (key === 'beta carotene' || key === 'beta carotene (for color)' || /\bbeta carotene\b/.test(key)) {
    if (/\b(for color|coloring|color)\b/.test(key)) return 'beta carotene';
    return undefined;
  }
  const direct = KEY_GROUP.get(key) ?? KEY_GROUP.get(stripFunctionParen(key));
  if (direct === 'vegetable oil' || direct === 'soybean oil' || direct === 'rice bran oil' || direct === 'canola oil') {
    return oilApplies(direct, form) ? direct : undefined;
  }
  if (direct) return direct;
  if (key.startsWith('adhesive crafted with')) return 'adhesive';
  if (key.startsWith('ferment media')) return 'ferment';
  if (isIronOxide(name)) return 'iron oxide';
  if (isGreen3(name)) return 'green 3';
  if (isRedNumber(name, '28')) return 'red 28';
  if (isRedNumber(name, '30')) return 'red 30';
  if (isRedNumber(name, '7')) return 'red 7';
  return undefined;
}

export function t139uWhyForName(name: string, form?: string): string | undefined {
  const group = t139uGroup(name, form);
  return group ? WHY[group] : undefined;
}

export function t139uIsListedSpelling(name: string): boolean {
  return LISTED_FOLD.has(name.trim().toLowerCase().replace(/\s+/g, ' '));
}

export function applyT139uIngredients(
  ingredients: readonly IngredientFlag[],
  record: Pick<RatingRecord, 'form'>,
): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t139uWhyForName(ingredient.name, record.form);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

/** Stored why only. Grades, notes, and oils outside the base-form rule stay as they are. */
export function applyT139uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT139uIngredients(record.inactiveIngredients, record);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, string | undefined, T139uGroup | undefined]> = [
  ['Adhesive', undefined, 'adhesive'],
  ['Ferment media', undefined, 'ferment'],
  ['Beet root powder (for color)', undefined, 'beet'],
  ['Beet Root Powder', undefined, undefined],
  ['Lecithin', undefined, 'lecithin'],
  ['Sunflower Lecithin', undefined, 'lecithin'],
  ['Organic sunflower lecithin', undefined, 'lecithin'],
  ['Mixed tocopherols', undefined, 'tocopherol'],
  ['d-alpha tocopherol', undefined, 'tocopherol'],
  ['Whole Rice Concentrate', undefined, 'rice bran'],
  ['Rice Bran', undefined, 'rice bran'],
  ['Rice hulls', undefined, 'rice bran'],
  ['27% grape alcohol solution', undefined, 'grape alcohol'],
  ['Grape Alcohol', undefined, undefined],
  ['Sodium polyacrylate', undefined, 'polyacrylate'],
  ['Polyacrylic acid', undefined, 'polyacrylate'],
  ['Glycyrrhiza extract', undefined, 'licorice'],
  ['Licorice Root Powder', undefined, 'licorice'],
  ['Hydroxyacetophenone', undefined, 'hydroxyacetophenone'],
  ['Triethanolamine', undefined, 'triethanolamine'],
  ['Ammonium hydroxide', undefined, 'ammonium hydroxide'],
  ['Steareth-21', undefined, 'steareth'],
  ['Steareth-2', undefined, 'steareth'],
  ['Ceteth-20 phosphate', undefined, 'steareth'],
  ['Carmine', undefined, 'carmine'],
  ['DMDM hydantoin', undefined, 'formaldehyde'],
  ['Diazolidinyl urea', undefined, 'formaldehyde'],
  ['Erythritol', undefined, 'erythritol'],
  ['Xylitol / erythritol', undefined, undefined],
  ['Beta carotene (for color)', undefined, 'beta carotene'],
  ['Beta-carotene (for color)', undefined, 'beta carotene'],
  ['Beta carotene', undefined, undefined],
  ['Organic Rice Extract Blend', undefined, 'rice extract'],
  ['Rice extract', undefined, 'rice extract'],
  ['Bamboo extract', undefined, 'bamboo'],
  ['Silica (from Bamboo Shoot Extract)', undefined, 'bamboo'],
  ['Rice bran wax', undefined, 'rice bran wax'],
  ['Rice bran oil', 'softgel', undefined],
  ['Aloe Vera Gel', undefined, 'aloe'],
  ['Aloe barbadensis leaf juice', undefined, undefined],
  ['Trace Mineral Complex', undefined, 'trace mineral'],
  ['iron oxide red', undefined, 'iron oxide'],
  ['Red iron oxide', undefined, 'iron oxide'],
  ['Isopropyl Alcohol', undefined, 'isopropyl alcohol'],
  ['Corn syrup', undefined, 'corn syrup'],
  ['Corn syrup solids', undefined, undefined],
  ['High fructose corn syrup', undefined, undefined],
  ['Sodium alginate', undefined, 'sodium alginate'],
  ['Fructose', undefined, 'fructose'],
  ['FD&C Green No. 3', undefined, 'green 3'],
  ['D&C Red No. 28', undefined, 'red 28'],
  ['D&C Red No. 30 aluminum lake', undefined, 'red 30'],
  ['D&C Red No. 7 calcium lake', undefined, 'red 7'],
  ['FD&C Red No. 40', undefined, undefined],
  ['BHT', undefined, 'bht'],
  ['Butylated hydroxytoluene', undefined, 'bht'],
  ['Vegetable oil', 'gummy', 'vegetable oil'],
  ['Vegetable oil', 'lozenge', 'vegetable oil'],
  ['Vegetable oil', 'chew', 'vegetable oil'],
  ['Vegetable oil', 'softgel', undefined],
  ['Vegetable oil', 'chewable tablet', undefined],
  ['Vegetable oil (coconut, canola)', 'gummy', 'vegetable oil'],
  ['Blend of oils (coconut and/or palm)', 'gummy', 'vegetable oil'],
  ['Soybean oil', 'gummy', 'soybean oil'],
  ['Soybean oil', 'softgel', undefined],
  ['Rice Bran Oil', 'gummy', 'rice bran oil'],
  ['Rice bran oil', 'softgel', undefined],
  ['Canola oil', 'gummy', 'canola oil'],
  ['Canola oil', 'capsule', undefined],
  ['Hydrogenated lecithin', undefined, undefined],
];

for (const [name, form, group] of MUST) {
  const found = t139uGroup(name, form);
  if (found !== group) throw new Error(`t139u ${name} @ ${form ?? '-'} -> ${found ?? 'none'}`);
  if (group && t139uWhyForName(name, form) !== WHY[group]) throw new Error(`t139u why ${name}`);
}
