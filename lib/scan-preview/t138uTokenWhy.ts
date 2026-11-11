import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const SODIUM_HYDROXIDE = 'Sodium hydroxide is a pH adjuster used in a trace amount.';
const POLYVINYL = 'Polyvinyl alcohol is a film used to coat a tablet.';
const EDETATE = 'Edetate disodium is an EDTA salt used as a stabilizer in trace amounts.';
const CETYL = 'Cetyl alcohol is a fatty alcohol used in cream bases.';
const TRIACETIN = 'Triacetin is a plasticizer used in tablet coatings.';
const CALCIUM_CARBONATE = 'Calcium carbonate is a mineral salt used as a filler or to set acidity.';
const MONK = 'Monk fruit extract is a high-purity sweetener from the monk fruit.';
const CHLOROPHYLL = 'Chlorophyll is a green plant pigment used as a natural color.';
const RICE_PROTEIN = 'Rice protein is a food protein from rice. It is not an unnamed rice extract.';
const CAROB = 'Carob is a food ingredient from the carob pod used as a flavor or filler.';
const SLS =
  'Sodium lauryl sulfate is a foaming agent. Skin studies use it as a standard irritant. It can irritate skin or the mouth.';
const PHENOXY = 'Phenoxyethanol is a preservative used on the skin.';
const FRAGRANCE =
  'This is an unnamed fragrance. The label does not list the solvents or carriers inside the mixture.';
const BKC = 'Benzalkonium chloride can damage cilia in lab tests. Studies in people do not all agree, so it stays Caution.';
const IRON = 'Iron oxide is a mineral color. It is not a synthetic FD&C dye.';
const EUCALYPTUS = 'Eucalyptus oil is a plant essential oil used as a scent or inactive.';
const ISOMALT = 'Isomalt is a sugar alcohol. Large amounts can cause bloating or loose stools.';
const MALTITOL = 'Maltitol is a sugar alcohol. Large amounts can cause bloating or loose stools.';
const INK =
  'This is printing ink on a tablet or capsule. The label does not name every pigment in the ink. It is graded Limited and counts toward a 3+ Limited stack.';
const SACCHARIN =
  'Saccharin is an artificial sweetener. Later reviews walked back the older cancer signal. It is graded Limited and counts toward a 3+ Limited stack.';
const DEXTRIN =
  'Dextrin is a starch breakdown product used as a filler or sweetener bulk. It is graded Limited and counts toward a 3+ Limited stack.';
const POLYDEXTROSE =
  'Polydextrose is a starch-based bulk sweetener. It is graded Limited and counts toward a 3+ Limited stack.';
const HFCS =
  'High fructose corn syrup is a sweetener made from corn. It is graded Limited and counts toward a 3+ Limited stack.';
const GUM_BASE =
  'Gum base is an unnamed mix of gum, resin, and wax. It is graded Limited and counts toward a 3+ Limited stack.';
const MODIFIED_STARCH =
  'This is a modified starch. Plain corn starch and potato starch are a different line. It is graded Limited and counts toward a 3+ Limited stack.';
const MENTHOL = 'Menthol is a cooling compound. On this label it is an inactive, not the drug.';
const DYE =
  'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.';
const PROPYL_GALLATE = 'Propyl gallate is a preservative. A 2018 study found it can disrupt hormones.';
const BHA =
  'BHA is a preservative. The U.S. National Toxicology Program lists it as reasonably anticipated to be a human carcinogen.';
const HYDROGENATED =
  'The panel says hydrogenated. It does not say partial or fully. Partial is the form that contains trans fat, so the grade goes to Not Clean.';

export type T138uGroup =
  | 'sodium hydroxide'
  | 'polyvinyl alcohol'
  | 'edetate disodium'
  | 'cetyl alcohol'
  | 'triacetin'
  | 'calcium carbonate'
  | 'monk fruit extract'
  | 'chlorophyll'
  | 'rice protein'
  | 'carob'
  | 'sodium lauryl sulfate'
  | 'phenoxyethanol'
  | 'fragrance'
  | 'benzalkonium chloride'
  | 'iron oxide'
  | 'eucalyptus oil'
  | 'isomalt'
  | 'maltitol'
  | 'ink'
  | 'saccharin sodium'
  | 'dextrin'
  | 'polydextrose'
  | 'high fructose corn syrup'
  | 'gum base'
  | 'modified starch'
  | 'menthol'
  | 'yellow 6'
  | 'blue 2'
  | 'yellow 10'
  | 'red 27'
  | 'red 33'
  | 'propyl gallate'
  | 'bha'
  | 'hydrogenated';

const WHY: Record<T138uGroup, string> = {
  'sodium hydroxide': SODIUM_HYDROXIDE,
  'polyvinyl alcohol': POLYVINYL,
  'edetate disodium': EDETATE,
  'cetyl alcohol': CETYL,
  triacetin: TRIACETIN,
  'calcium carbonate': CALCIUM_CARBONATE,
  'monk fruit extract': MONK,
  chlorophyll: CHLOROPHYLL,
  'rice protein': RICE_PROTEIN,
  carob: CAROB,
  'sodium lauryl sulfate': SLS,
  phenoxyethanol: PHENOXY,
  fragrance: FRAGRANCE,
  'benzalkonium chloride': BKC,
  'iron oxide': IRON,
  'eucalyptus oil': EUCALYPTUS,
  isomalt: ISOMALT,
  maltitol: MALTITOL,
  ink: INK,
  'saccharin sodium': SACCHARIN,
  dextrin: DEXTRIN,
  polydextrose: POLYDEXTROSE,
  'high fructose corn syrup': HFCS,
  'gum base': GUM_BASE,
  'modified starch': MODIFIED_STARCH,
  menthol: MENTHOL,
  'yellow 6': DYE,
  'blue 2': DYE,
  'yellow 10': DYE,
  'red 27': DYE,
  'red 33': DYE,
  'propyl gallate': PROPYL_GALLATE,
  bha: BHA,
  hydrogenated: HYDROGENATED,
};

export const T138U_EXPECTED_RISK: Record<T138uGroup, 'cleared' | 'moderate' | 'limited' | 'high'> = {
  'sodium hydroxide': 'cleared',
  'polyvinyl alcohol': 'cleared',
  'edetate disodium': 'cleared',
  'cetyl alcohol': 'cleared',
  triacetin: 'cleared',
  'calcium carbonate': 'cleared',
  'monk fruit extract': 'cleared',
  chlorophyll: 'cleared',
  'rice protein': 'cleared',
  carob: 'cleared',
  'sodium lauryl sulfate': 'moderate',
  phenoxyethanol: 'moderate',
  fragrance: 'moderate',
  'benzalkonium chloride': 'moderate',
  'iron oxide': 'moderate',
  'eucalyptus oil': 'moderate',
  isomalt: 'moderate',
  maltitol: 'moderate',
  ink: 'limited',
  'saccharin sodium': 'limited',
  dextrin: 'limited',
  polydextrose: 'limited',
  'high fructose corn syrup': 'limited',
  'gum base': 'limited',
  'modified starch': 'limited',
  menthol: 'limited',
  'yellow 6': 'high',
  'blue 2': 'high',
  'yellow 10': 'high',
  'red 27': 'high',
  'red 33': 'high',
  'propyl gallate': 'high',
  bha: 'high',
  hydrogenated: 'high',
};

const LISTED: Record<T138uGroup, readonly string[]> = {
  'sodium hydroxide': ['Sodium hydroxide'],
  'polyvinyl alcohol': ['Polyvinyl alcohol'],
  'edetate disodium': ['Edetate disodium'],
  'cetyl alcohol': ['Cetyl alcohol'],
  triacetin: ['Triacetin'],
  'calcium carbonate': ['Calcium carbonate'],
  'monk fruit extract': ['Monk Fruit Extract'],
  chlorophyll: ['Chlorophyll'],
  'rice protein': ['Rice protein'],
  carob: ['Carob', 'carob extract', 'Carob (plain) / carob extract'],
  'sodium lauryl sulfate': ['Sodium lauryl sulfate'],
  phenoxyethanol: ['Phenoxyethanol'],
  fragrance: ['Fragrance'],
  'benzalkonium chloride': ['Benzalkonium chloride'],
  'iron oxide': ['iron oxide black', 'iron oxide red', 'iron oxide ochre', 'Ferric oxide yellow'],
  'eucalyptus oil': ['Eucalyptus oil'],
  isomalt: ['Isomalt'],
  maltitol: ['Maltitol', 'Maltitol Syrup'],
  ink: ['Pharmaceutical ink', 'white edible ink', 'Edible ink'],
  'saccharin sodium': ['Saccharin sodium'],
  dextrin: ['Dextrin'],
  polydextrose: ['Polydextrose'],
  'high fructose corn syrup': ['High fructose corn syrup'],
  'gum base': ['Gum base'],
  'modified starch': [
    'Modified corn starch',
    'Modified Food Starch',
    'Modified tapioca starch',
    'Modified starch',
    'pea starch',
  ],
  menthol: ['Menthol'],
  'yellow 6': ['FD&C Yellow No. 6', 'Yellow 6', 'Yellow 6 Lake'],
  'blue 2': ['FD&C Blue No. 2', 'Blue 2 Lake'],
  'yellow 10': ['D&C Yellow No. 10'],
  'red 27': ['D&C Red No. 27'],
  'red 33': ['D&C Red No. 33'],
  'propyl gallate': ['Propyl gallate'],
  bha: ['Butylated hydroxyanisole', 'BHA'],
  hydrogenated: [
    'Hydrogenated coconut oil',
    'Hydrogenated Vegetable Oil',
    'hydrogenated peanut oil',
    'Hydrogenated Soybean Oil',
  ],
};

const EXTRA: Record<string, T138uGroup> = {
  'disodium edta': 'edetate disodium',
  'disodium edetate': 'edetate disodium',
  'edetate disodium dihydrate': 'edetate disodium',
  'sodium lauryl sulphate': 'sodium lauryl sulfate',
  fragrances: 'fragrance',
  'fragrance (parfum)': 'fragrance',
  'benzalkonium chloride solution': 'benzalkonium chloride',
  '0.02% w/w benzalkonium chloride': 'benzalkonium chloride',
  'maltitol solution': 'maltitol',
  'carob powder': 'carob',
  'carob color': 'carob',
  'black edible ink': 'ink',
  'sodium saccharin': 'saccharin sodium',
  saccharin: 'saccharin sodium',
  'organic pea starch': 'modified starch',
  'pea starch powder': 'modified starch',
  'modified starch / pea starch': 'modified starch',
  'modified corn starch (non gmo)': 'modified starch',
  'modified food starch (non gmo)': 'modified starch',
  'modified tapioca starchgel': 'modified starch',
  'modified tapioca starchgel (cassava root)': 'modified starch',
  'natural menthol': 'menthol',
  'menthol dl': 'menthol',
  'eucalyptus globulus leaf oil': 'eucalyptus oil',
  'eucalyptus globulus oil': 'eucalyptus oil',
  'organic eucalyptus oil': 'eucalyptus oil',
  'hydrogenated vegetable oil (soy)': 'hydrogenated',
};

const KEY_GROUP = new Map<string, T138uGroup>();
const LISTED_FOLD = new Set<string>();

function norm(name: string): string {
  let text = name.trim().toLowerCase().replace(/[®™]/g, '');
  text = text.replace(/[‐‑–—-]/g, ' ');
  text = text.replace(/[[\]]/g, ' ');
  text = text.replace(/\(/g, ' (').replace(/\)/g, ') ');
  text = text.replace(/\s+/g, ' ').trim();
  text = text.replace(/[.,;:!?*%]+$/g, '').trim();
  return text;
}

for (const [group, names] of Object.entries(LISTED) as Array<[T138uGroup, readonly string[]]>) {
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

function allowed(words: string[], ok: Set<string>): boolean {
  return words.every((word) => ok.has(word));
}

const DYE_OK = new Set(['fdc', 'fd', 'c', 'dc', 'd', 'no', 'lake', 'aluminum', 'aluminium', 'al', 'color', 'colour']);

function isYellow6(name: string): boolean {
  const words = dyeWords(name);
  if (!oneColor(words) || !words.includes('yellow') || !words.includes('6')) return false;
  if (words.includes('5') || words.includes('10') || words.includes('tartrazine')) return false;
  return allowed(words, new Set([...DYE_OK, 'yellow', '6']));
}

function isBlue2(name: string): boolean {
  const words = dyeWords(name);
  const joined = words.join(' ');
  if (!oneColor(words) || !/\bblue\s+(no\s+)?2\b/.test(joined)) return false;
  if (/\bblue\s+(no\s+)?1\b/.test(joined)) return false;
  return allowed(words, new Set([...DYE_OK, 'blue', '2', 'indigo', 'carmine']));
}

function isYellow10(name: string): boolean {
  const words = dyeWords(name);
  if (!oneColor(words) || !words.includes('yellow') || !words.includes('10')) return false;
  if (words.includes('5') || words.includes('6') || words.includes('tartrazine')) return false;
  return allowed(words, new Set([...DYE_OK, 'yellow', '10']));
}

function isRed27(name: string): boolean {
  const words = dyeWords(name);
  if (!oneColor(words) || !words.includes('red') || !words.includes('27')) return false;
  if (['40', '33', '3', '28', '30'].some((number) => words.includes(number))) return false;
  return allowed(words, new Set([...DYE_OK, 'red', '27']));
}

function isRed33(name: string): boolean {
  const words = dyeWords(name);
  if (!oneColor(words) || !words.includes('red') || !words.includes('33')) return false;
  if (['40', '27', '3', '28', '30'].some((number) => words.includes(number))) return false;
  return allowed(words, new Set([...DYE_OK, 'red', '33']));
}

function isIronOxide(name: string): boolean {
  const text = norm(name).replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!/\b(iron|ferric|ferrosoferric)\b/.test(text)) return false;
  if (!/\boxides?\b/.test(text) && !/\bferrosoferric\b/.test(text)) return false;
  const allowedWords = new Set([
    'iron', 'oxide', 'oxides', 'ferric', 'ferrous', 'ferrosoferric', 'black', 'red', 'yellow',
    'ochre', 'ocher', 'brown', 'blend', 'blends', 'color', 'colour', 'and',
  ]);
  return text.split(' ').every((word) => allowedWords.has(word));
}

function isPlainHydrogenated(name: string): boolean {
  const key = norm(name);
  if (/partial|fully|lecithin|castor|rosinate|polyoxyl|palm|cottonseed/.test(key)) return false;
  return (
    key === 'hydrogenated coconut oil'
    || key === 'hydrogenated vegetable oil'
    || key === 'hydrogenated peanut oil'
    || key === 'hydrogenated soybean oil'
    || key === 'hydrogenated soy oil'
    || key === 'hydrogenated vegetable oil (soy)'
  );
}

function stripFunctionParen(key: string): string {
  const match = key.match(/^(.*)\s+\(([^)]+)\)\s*$/);
  if (!match) return key;
  return /^(bha|color|colour|for color|for colour)$/.test(match[2].trim()) ? match[1].trim() : key;
}

export function t138uGroup(name: string): T138uGroup | undefined {
  const key = norm(name);
  if (isPlainHydrogenated(name)) return 'hydrogenated';
  const direct = KEY_GROUP.get(key) ?? KEY_GROUP.get(stripFunctionParen(key));
  if (direct) return direct;
  if (isIronOxide(name)) return 'iron oxide';
  if (isYellow6(name)) return 'yellow 6';
  if (isBlue2(name)) return 'blue 2';
  if (isYellow10(name)) return 'yellow 10';
  if (isRed27(name)) return 'red 27';
  if (isRed33(name)) return 'red 33';
  return undefined;
}

export function t138uWhyForName(name: string): string | undefined {
  const group = t138uGroup(name);
  return group ? WHY[group] : undefined;
}

export function t138uIsListedSpelling(name: string): boolean {
  return LISTED_FOLD.has(name.trim().toLowerCase().replace(/\s+/g, ' '));
}

export function applyT138uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t138uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

/** Stored why only. Grades, notes, active menthol, and partial or fully hydrogenated oils stay as they are. */
export function applyT138uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT138uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, T138uGroup]> = [
  ['Sodium hydroxide', 'sodium hydroxide'],
  ['Polyvinyl alcohol', 'polyvinyl alcohol'],
  ['Edetate disodium', 'edetate disodium'],
  ['Disodium EDTA', 'edetate disodium'],
  ['Cetyl alcohol', 'cetyl alcohol'],
  ['Triacetin', 'triacetin'],
  ['Calcium carbonate', 'calcium carbonate'],
  ['Monk Fruit Extract', 'monk fruit extract'],
  ['Chlorophyll', 'chlorophyll'],
  ['Rice protein', 'rice protein'],
  ['Carob', 'carob'],
  ['carob extract', 'carob'],
  ['Carob (plain) / carob extract', 'carob'],
  ['Sodium lauryl sulfate', 'sodium lauryl sulfate'],
  ['Sodium lauryl sulphate', 'sodium lauryl sulfate'],
  ['Phenoxyethanol', 'phenoxyethanol'],
  ['Fragrance', 'fragrance'],
  ['Benzalkonium chloride', 'benzalkonium chloride'],
  ['iron oxide black', 'iron oxide'],
  ['iron oxide red', 'iron oxide'],
  ['iron oxide ochre', 'iron oxide'],
  ['Ferric oxide yellow', 'iron oxide'],
  ['Red iron oxide', 'iron oxide'],
  ['Eucalyptus oil', 'eucalyptus oil'],
  ['Isomalt', 'isomalt'],
  ['Maltitol', 'maltitol'],
  ['Maltitol Syrup', 'maltitol'],
  ['Pharmaceutical ink', 'ink'],
  ['white edible ink', 'ink'],
  ['Edible ink', 'ink'],
  ['Saccharin sodium', 'saccharin sodium'],
  ['Dextrin', 'dextrin'],
  ['Polydextrose', 'polydextrose'],
  ['High fructose corn syrup', 'high fructose corn syrup'],
  ['Gum base', 'gum base'],
  ['Modified corn starch', 'modified starch'],
  ['Modified Food Starch', 'modified starch'],
  ['Modified tapioca starch', 'modified starch'],
  ['Modified starch', 'modified starch'],
  ['pea starch', 'modified starch'],
  ['Menthol', 'menthol'],
  ['FD&C Yellow No. 6', 'yellow 6'],
  ['Yellow 6', 'yellow 6'],
  ['Yellow 6 Lake', 'yellow 6'],
  ['FD&C Yellow No. 6 aluminum lake', 'yellow 6'],
  ['FD&C Blue No. 2', 'blue 2'],
  ['Blue 2 Lake', 'blue 2'],
  ['FD&C Blue No. 2 aluminum lake', 'blue 2'],
  ['D&C Yellow No. 10', 'yellow 10'],
  ['D&C Yellow No. 10 aluminum lake', 'yellow 10'],
  ['D&C Red No. 27', 'red 27'],
  ['D&C Red No. 27 aluminum lake', 'red 27'],
  ['D&C Red No. 33', 'red 33'],
  ['D&C Red No. 33 aluminum lake', 'red 33'],
  ['Propyl gallate', 'propyl gallate'],
  ['Butylated hydroxyanisole', 'bha'],
  ['BHA', 'bha'],
  ['Butylated hydroxyanisole (BHA)', 'bha'],
  ['Hydrogenated coconut oil', 'hydrogenated'],
  ['Hydrogenated Vegetable Oil', 'hydrogenated'],
  ['hydrogenated peanut oil', 'hydrogenated'],
  ['Hydrogenated Soybean Oil', 'hydrogenated'],
];

for (const [name, group] of MUST) {
  if (t138uGroup(name) !== group || t138uWhyForName(name) !== WHY[group]) {
    throw new Error(`t138u missed ${name} -> ${t138uGroup(name) ?? 'none'}`);
  }
}

for (const name of [
  'Cetyl alcohol',
  'Polyvinyl alcohol',
  'maltodextrin',
  'Tapioca Dextrin',
  'Corn starch',
  'Potato starch',
  'partially hydrogenated soybean oil',
  'fully hydrogenated palm oil',
  'Hydrogenated castor oil',
  'Hydrogenated Palm Oil',
  'Hydrogenated lecithin',
  'isomaltooligosaccharides',
  'Fructose',
  'Monk Fruit',
  'Chlorophyllin',
  'FD&C Red No. 40',
  'FD&C Blue No. 1',
  'FD&C Yellow No. 5',
  'BHT',
  'natural flavors (menthol, vanilla)',
  'Dementholised mint oil',
  'Calcium carbonate (OI filler)',
  'Hydrochloric acid and/or sodium hydroxide',
  'Modified starch is not this',
]) {
  if (name === 'Cetyl alcohol' || name === 'Polyvinyl alcohol') continue;
  if (t138uWhyForName(name)) throw new Error(`t138u over-matched ${name}`);
}
