import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const HPC =
  'Hydroxypropyl cellulose is a processed cellulose derivative used as a binder or coating. It is graded Caution.';
const RICE_FLOUR =
  'Rice flour is a simple flour from rice. It is graded Caution when it is not the named rice hull or rice bran form.';
const CALCIUM_SILICATE =
  'Calcium silicate is a mineral powder used as an anti-caking agent. It is graded Caution.';
const SODIUM_BENZOATE =
  'Sodium benzoate is a synthetic preservative. On its own the risk is low, but it can form a trace of benzene when combined with vitamin C.';
const MANNITOL = 'Mannitol is a sugar alcohol. Large amounts can cause bloating or loose stools.';
const XYLITOL = 'Xylitol is a sugar alcohol. Large amounts can cause bloating or loose stools.';
const FLAVOR =
  'This is an unnamed flavor blend. The label does not list the solvents or carriers inside the mixture.';
const ENTERIC = 'Enteric coating is a delayed-release coating. It is graded Caution.';
const POTASSIUM_SORBATE =
  'Potassium sorbate is a synthetic preservative. On its own the risk is low, but it can form a trace of benzene when combined with vitamin C.';
const ANNATTO =
  'Annatto is a plant color. Some people with chronic hives react to it, and high intakes can exceed the acceptable daily intake for one of its pigments.';
const PEG =
  'Polyethylene glycol is a synthetic solvent or plasticizer. Manufacturing can leave traces of ethylene oxide and 1,4-dioxane. It is graded Limited and counts toward a 3+ Limited stack.';
const SUCRALOSE =
  'Sucralose is an artificial sweetener. A 2023 study raised questions about DNA and gut bacteria. It is graded Limited and counts toward a 3+ Limited stack.';
const PROPYLENE =
  'Propylene glycol is a synthetic solvent. It is graded Limited and counts toward a 3+ Limited stack.';
const POLYSORBATE =
  'Polysorbate is a synthetic emulsifier. A 2023 study found it can weaken the gut barrier. It is graded Limited and counts toward a 3+ Limited stack.';
const ALCOHOL =
  'Alcohol is the solvent that carries the other ingredients. It is graded Limited and counts toward a 3+ Limited stack.';
const ACESULFAME =
  'Acesulfame potassium is an artificial sweetener. Early studies raised genotoxicity and microbiome questions. It is graded Limited and counts toward a 3+ Limited stack.';
const STEVIA =
  'Stevia leaf extract is a sweetener from the stevia plant. It is graded Limited and counts toward a 3+ Limited stack unless it is the high-purity Rebaudioside A form.';
const CARRAGEENAN =
  'Carrageenan is a seaweed thickener. Researchers disagree about whether it inflames the gut. It is graded Limited and counts toward a 3+ Limited stack.';
const RICE_EXTRACT =
  'Rice extract is an unnamed rice form. It does not name hull, bran, or concentrate. It is graded Limited and counts toward a 3+ Limited stack.';
const TITANIUM =
  'Titanium dioxide is a white color. In 2022 the European Union stopped allowing it in food after its food-safety agency could not rule out damage to DNA.';
const TALC =
  'Talc is a mineral powder. The World Health Organization\u2019s cancer research agency classifies it as probably carcinogenic to humans.';
const DYE =
  'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.';
const PARABEN =
  'This is a paraben preservative. The European Union has restricted or banned some parabens in food because they can disrupt hormones.';
const ASPARTAME =
  'Aspartame is an artificial sweetener. In 2023 the World Health Organization\u2019s cancer research agency classified it as possibly carcinogenic to humans.';
const CARAMEL =
  'This is caramel color. The label does not name a class free of ammonia. The ammonia process can leave 4-MEI, which is classified as possibly carcinogenic.';
const SUNFLOWER_GUMMY = 'Sunflower oil is Not Clean when it is the base of a gummy. You are chewing the oil.';
const PALM_GUMMY = 'Palm oil is Not Clean when it is the base of a gummy. You are chewing the oil.';
const BHT = 'BHT is a preservative. The European Union restricted it in 2022 because it can disrupt hormones.';

export type T135uGroup =
  | 'hydroxypropyl cellulose'
  | 'rice flour'
  | 'calcium silicate'
  | 'sodium benzoate'
  | 'mannitol'
  | 'xylitol'
  | 'flavor'
  | 'enteric coating'
  | 'potassium sorbate'
  | 'annatto'
  | 'polyethylene glycol'
  | 'sucralose'
  | 'propylene glycol'
  | 'polysorbate'
  | 'alcohol'
  | 'acesulfame potassium'
  | 'stevia'
  | 'carrageenan'
  | 'rice extract'
  | 'titanium dioxide'
  | 'talc'
  | 'red 40'
  | 'blue 1'
  | 'paraben'
  | 'aspartame'
  | 'caramel color'
  | 'sunflower oil'
  | 'palm oil'
  | 'bht';

const WHY: Record<T135uGroup, string> = {
  'hydroxypropyl cellulose': HPC,
  'rice flour': RICE_FLOUR,
  'calcium silicate': CALCIUM_SILICATE,
  'sodium benzoate': SODIUM_BENZOATE,
  mannitol: MANNITOL,
  xylitol: XYLITOL,
  flavor: FLAVOR,
  'enteric coating': ENTERIC,
  'potassium sorbate': POTASSIUM_SORBATE,
  annatto: ANNATTO,
  'polyethylene glycol': PEG,
  sucralose: SUCRALOSE,
  'propylene glycol': PROPYLENE,
  polysorbate: POLYSORBATE,
  alcohol: ALCOHOL,
  'acesulfame potassium': ACESULFAME,
  stevia: STEVIA,
  carrageenan: CARRAGEENAN,
  'rice extract': RICE_EXTRACT,
  'titanium dioxide': TITANIUM,
  talc: TALC,
  'red 40': DYE,
  'blue 1': DYE,
  paraben: PARABEN,
  aspartame: ASPARTAME,
  'caramel color': CARAMEL,
  'sunflower oil': SUNFLOWER_GUMMY,
  'palm oil': PALM_GUMMY,
  bht: BHT,
};

export const T135U_EXPECTED_RISK: Record<T135uGroup, 'moderate' | 'limited' | 'high'> = {
  'hydroxypropyl cellulose': 'moderate',
  'rice flour': 'moderate',
  'calcium silicate': 'moderate',
  'sodium benzoate': 'moderate',
  mannitol: 'moderate',
  xylitol: 'moderate',
  flavor: 'moderate',
  'enteric coating': 'moderate',
  'potassium sorbate': 'moderate',
  annatto: 'moderate',
  'polyethylene glycol': 'limited',
  sucralose: 'limited',
  'propylene glycol': 'limited',
  polysorbate: 'limited',
  alcohol: 'limited',
  'acesulfame potassium': 'limited',
  stevia: 'limited',
  carrageenan: 'limited',
  'rice extract': 'limited',
  'titanium dioxide': 'high',
  talc: 'high',
  'red 40': 'high',
  'blue 1': 'high',
  paraben: 'high',
  aspartame: 'high',
  'caramel color': 'high',
  'sunflower oil': 'high',
  'palm oil': 'high',
  bht: 'high',
};

const LISTED: Record<T135uGroup, readonly string[]> = {
  'hydroxypropyl cellulose': ['Hydroxypropyl cellulose'],
  'rice flour': ['Rice Flour'],
  'calcium silicate': ['Calcium Silicate'],
  'sodium benzoate': ['Sodium benzoate'],
  mannitol: ['Mannitol'],
  xylitol: ['Xylitol'],
  flavor: ['Flavor', 'Flavors'],
  'enteric coating': ['Enteric coating', 'enteric coating (cellulose and methacrylate)'],
  'potassium sorbate': ['Potassium Sorbate', 'Potassium Sorbate (preservative)'],
  annatto: [
    'Annatto',
    'Annatto Seed Extract (Color)',
    'Organic Annatto Extract (Color)',
    'Annatto Extract (Color)',
    'Annatto extract',
  ],
  'polyethylene glycol': ['Polyethylene glycol', 'Polyethylene glycol 400'],
  sucralose: ['Sucralose'],
  'propylene glycol': ['Propylene glycol'],
  polysorbate: ['Polysorbate 80', 'Polysorbate 60'],
  alcohol: ['Alcohol', 'Alcohol denat.', 'Alcohol (vehicle)', 'Grain alcohol', 'organic alcohol (as vehicle)'],
  'acesulfame potassium': ['Acesulfame potassium'],
  stevia: ['Stevia', 'Stevia leaf extract', 'Stevia (leaf extract)', 'Stevia Extract'],
  carrageenan: ['Carrageenan'],
  'rice extract': ['Rice extract', 'Organic Rice Extract Blend', 'Rice Extract Blend'],
  'titanium dioxide': ['Titanium dioxide', 'Titanium dioxide (color)'],
  talc: ['Talc', 'Magnesium silicate', 'Magnesium silicate (talc)'],
  'red 40': ['FD&C Red No. 40', 'FD&C red #40', 'FD&C Red No. 40 aluminum lake', 'Red 40 Lake'],
  'blue 1': ['FD&C Blue No. 1', 'FD&C blue #1', 'FD&C Blue No. 1 aluminum lake', 'Blue 1'],
  paraben: ['Methylparaben', 'Propylparaben'],
  aspartame: ['Aspartame'],
  'caramel color': ['Caramel color', 'Caramel (color)'],
  'sunflower oil': ['Sunflower oil', 'Organic sunflower oil'],
  'palm oil': ['Palm oil', 'Vegetable Oil (Palm)'],
  bht: ['Butylated hydroxytoluene', 'BHT'],
};

const EXTRA: Record<string, T135uGroup> = {
  'l hydroxypropyl cellulose': 'hydroxypropyl cellulose',
  'white rice flour': 'rice flour',
  'polyethyleneglycol': 'polyethylene glycol',
  'polyethylene glylcol': 'polyethylene glycol',
  'polyethylene glycol (peg) 400': 'polyethylene glycol',
  'polyethylene glycol 400 usp': 'polyethylene glycol',
  'propylene glycol usp': 'propylene glycol',
  'sucralose powder': 'sucralose',
  'methyl paraben': 'paraben',
  'propyl paraben': 'paraben',
  methyparaben: 'paraben',
  'stevia (leaf) extract': 'stevia',
  'stevia rebaudiana leaf extract': 'stevia',
  'organic rice extract': 'rice extract',
  'grain alcohol / organic alcohol (as vehicle)': 'alcohol',
  'caramel (coloring)': 'caramel color',
  'annatto seed extract': 'annatto',
  'annatto (seed extract)': 'annatto',
  'annatto color': 'annatto',
  'annatto extract color': 'annatto',
  'organic annatto': 'annatto',
  'titanium dioxyde': 'titanium dioxide',
  'titanium dioxide color': 'titanium dioxide',
  'sunflower oil (gummy)': 'sunflower oil',
};

const KEY_GROUP = new Map<string, T135uGroup>();
const LISTED_FOLD = new Set<string>();
const SUNFLOWER = new Set(['sunflower oil', 'organic sunflower oil', 'sunflower oil (gummy)']);
const PALM = new Set(['palm oil', 'vegetable oil (palm)']);
const FUNCTION_PAREN =
  /^(color|colour|coloring|colouring|for color|for colour|capsule coloring agent|preservative|as a preservative|as preservative|for freshness|to preserve freshness|preservative to maintain freshness|to maintain freshness|to retard oxidation|perservative|bht)$/;

function norm(name: string): string {
  let text = name.trim().toLowerCase().replace(/[®™]/g, '');
  text = text.replace(/[‐‑–—-]/g, ' ');
  text = text.replace(/[[\]]/g, ' ');
  text = text.replace(/\(/g, ' (').replace(/\)/g, ') ');
  text = text.replace(/\s+/g, ' ').trim();
  text = text.replace(/[.,;:!?*%]+$/g, '').trim();
  return text;
}

function stripFunctionParen(key: string): string {
  const match = key.match(/^(.*)\s+\(([^)]+)\)\s*$/);
  if (!match) return key;
  return FUNCTION_PAREN.test(match[2].trim()) ? match[1].trim() : key;
}

for (const [group, names] of Object.entries(LISTED) as Array<[T135uGroup, readonly string[]]>) {
  for (const name of names) {
    KEY_GROUP.set(norm(name), group);
    LISTED_FOLD.add(name.trim().toLowerCase().replace(/\s+/g, ' '));
  }
}
for (const [key, group] of Object.entries(EXTRA)) KEY_GROUP.set(key, group);

function dyeWords(name: string): string[] {
  return name
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[#.]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function isRed40(name: string): boolean {
  const words = dyeWords(name);
  const joined = words.join(' ');
  if (!/\bred\s+(no\s+)?40\b/.test(joined)) return false;
  if (/\b(blue|yellow|green|indigo)\b/.test(joined)) return false;
  if (/\bred\s+(no\s+)?(3|7|22|27|28|30|33)\b/.test(joined)) return false;
  const allowed = new Set(['fd', 'c', 'red', 'no', '40', 'lake', 'aluminum', 'aluminium', 'al', 'color', 'colour', 'dye']);
  return words.every((word) => allowed.has(word));
}

function isBlue1(name: string): boolean {
  const words = dyeWords(name);
  const joined = words.join(' ');
  if (/\b(red|yellow|green|indigo)\b/.test(joined) || /\bblue\s+(no\s+)?2\b/.test(joined)) return false;
  if (!/\bblue\s+(no\s+)?1\b/.test(joined)) return false;
  const allowed = new Set(['fd', 'c', 'blue', 'no', '1', 'lake', 'aluminum', 'aluminium', 'al', 'brilliant', 'fcf', 'color', 'colour']);
  return words.every((word) => allowed.has(word));
}

function isStevia(key: string): boolean {
  if (/rebaudioside|\breb\b|steviol/.test(key)) return false;
  return (
    key === 'stevia'
    || key === 'stevia extract'
    || key === 'stevia leaf extract'
    || key === 'stevia (leaf extract)'
    || key === 'stevia (leaf) extract'
    || key === 'stevia rebaudiana leaf extract'
    || key === 'stevia extract (stevia rebaudiana leaf)'
    || key === 'stevia (stevia rebaudiana) (leaf extract)'
  );
}

export function isT135uGummy(form: string | undefined): boolean {
  return /\b(gummy|gummies)\b/i.test(form ?? '');
}

export function t135uGroup(name: string, form?: string): T135uGroup | undefined {
  const key = norm(name);
  if (SUNFLOWER.has(key)) return isT135uGummy(form) ? 'sunflower oil' : undefined;
  if (PALM.has(key)) return isT135uGummy(form) ? 'palm oil' : undefined;
  if (/rebaudioside|\breb\b|steviol/.test(key)) return undefined;
  const direct = KEY_GROUP.get(key);
  if (direct === 'sunflower oil' || direct === 'palm oil') return isT135uGummy(form) ? direct : undefined;
  if (direct) return direct;
  const stripped = stripFunctionParen(key);
  if (stripped !== key) {
    if (/rebaudioside|\breb\b|steviol/.test(stripped)) return undefined;
    const fromParen = KEY_GROUP.get(stripped);
    if (fromParen) return fromParen;
  }
  if (isStevia(key)) return 'stevia';
  if (isRed40(name)) return 'red 40';
  if (isBlue1(name)) return 'blue 1';
  return undefined;
}

export function t135uWhyForName(name: string, form?: string): string | undefined {
  const group = t135uGroup(name, form);
  return group ? WHY[group] : undefined;
}

export function t135uIsListedSpelling(name: string): boolean {
  return LISTED_FOLD.has(name.trim().toLowerCase().replace(/\s+/g, ' '));
}

export function applyT135uIngredients(
  ingredients: readonly IngredientFlag[],
  record: Pick<RatingRecord, 'form'>,
): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t135uWhyForName(ingredient.name, record.form);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

/** Stored why only. Grades, notes, locks, and non-gummy sunflower or palm oil stay as they are. */
export function applyT135uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT135uIngredients(record.inactiveIngredients, record);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, string | undefined, T135uGroup | undefined]> = [
  ['Hydroxypropyl cellulose', undefined, 'hydroxypropyl cellulose'],
  ['Rice Flour', undefined, 'rice flour'],
  ['Calcium Silicate', undefined, 'calcium silicate'],
  ['Sodium benzoate', undefined, 'sodium benzoate'],
  ['Mannitol', undefined, 'mannitol'],
  ['Xylitol', undefined, 'xylitol'],
  ['Flavor', undefined, 'flavor'],
  ['Flavors', undefined, 'flavor'],
  ['Enteric coating', undefined, 'enteric coating'],
  ['enteric coating (cellulose and methacrylate)', undefined, 'enteric coating'],
  ['Potassium Sorbate', undefined, 'potassium sorbate'],
  ['Potassium Sorbate (preservative)', undefined, 'potassium sorbate'],
  ['Annatto', undefined, 'annatto'],
  ['Annatto Seed Extract (Color)', undefined, 'annatto'],
  ['Organic Annatto Extract (Color)', undefined, 'annatto'],
  ['Annatto extract', undefined, 'annatto'],
  ['Polyethylene glycol', undefined, 'polyethylene glycol'],
  ['Polyethylene glycol 400', undefined, 'polyethylene glycol'],
  ['Sucralose', undefined, 'sucralose'],
  ['Propylene glycol', undefined, 'propylene glycol'],
  ['Polysorbate 80', undefined, 'polysorbate'],
  ['Polysorbate 60', undefined, 'polysorbate'],
  ['Alcohol', undefined, 'alcohol'],
  ['Alcohol denat.', undefined, 'alcohol'],
  ['Alcohol (vehicle)', undefined, 'alcohol'],
  ['Grain alcohol', undefined, 'alcohol'],
  ['organic alcohol (as vehicle)', undefined, 'alcohol'],
  ['Acesulfame potassium', undefined, 'acesulfame potassium'],
  ['Stevia', undefined, 'stevia'],
  ['Stevia leaf extract', undefined, 'stevia'],
  ['Stevia (leaf extract)', undefined, 'stevia'],
  ['Stevia Extract', undefined, 'stevia'],
  ['Carrageenan', undefined, 'carrageenan'],
  ['Rice extract', undefined, 'rice extract'],
  ['Organic Rice Extract Blend', undefined, 'rice extract'],
  ['Rice Extract Blend', undefined, 'rice extract'],
  ['Titanium dioxide', undefined, 'titanium dioxide'],
  ['Titanium dioxide (color)', undefined, 'titanium dioxide'],
  ['Talc', undefined, 'talc'],
  ['Magnesium silicate', undefined, 'talc'],
  ['Magnesium silicate (talc)', undefined, 'talc'],
  ['FD&C Red No. 40', undefined, 'red 40'],
  ['FD&C red #40', undefined, 'red 40'],
  ['FD&C Red No. 40 aluminum lake', undefined, 'red 40'],
  ['Red 40 Lake', undefined, 'red 40'],
  ['FD&C Blue No. 1', undefined, 'blue 1'],
  ['FD&C blue #1', undefined, 'blue 1'],
  ['FD&C Blue No. 1 aluminum lake', undefined, 'blue 1'],
  ['Blue 1', undefined, 'blue 1'],
  ['Methylparaben', undefined, 'paraben'],
  ['Propylparaben', undefined, 'paraben'],
  ['Aspartame', undefined, 'aspartame'],
  ['Caramel color', undefined, 'caramel color'],
  ['Caramel (color)', undefined, 'caramel color'],
  ['Sunflower oil', 'gummy', 'sunflower oil'],
  ['Organic sunflower oil', 'gummies', 'sunflower oil'],
  ['Sunflower oil', 'softgel', undefined],
  ['Palm oil', 'gummy', 'palm oil'],
  ['Vegetable Oil (Palm)', 'gummy', 'palm oil'],
  ['Palm oil', 'tablet', undefined],
  ['Butylated hydroxytoluene', undefined, 'bht'],
  ['BHT', undefined, 'bht'],
];

for (const [name, form, group] of MUST) {
  const found = t135uGroup(name, form);
  if (found !== group) throw new Error(`t135u ${name} @ ${form ?? '-'} -> ${found ?? 'none'}`);
  if (group && t135uWhyForName(name, form) !== WHY[group]) throw new Error(`t135u why ${name}`);
}

for (const name of [
  'Natural flavor',
  'Natural flavors',
  'orange flavor',
  'organic alcohol',
  'cetyl alcohol',
  'stearyl alcohol',
  'sugar alcohol',
  'Rebaudioside A',
  'Stevia Extract (Rebaudioside A)',
  'hydroxypropyl methylcellulose',
  'FD&C Blue No. 2',
  'FD&C Red No. 3',
  'Polysorbate 20',
  'Polyethylene glycol 3350',
  'Butylated hydroxyanisole',
  'calcium silicate gel',
  'Xylitol / erythritol',
  'Vegetable Oil (Palm) (Contains Carnauba Wax)',
  'Organic sunflower oil (for coating)',
  'FD&C dyes (Red 40 / Blue 1 / Yellow 6 on dyed flavors)',
]) {
  if (t135uWhyForName(name, 'gummy')) throw new Error(`t135u over-matched ${name}`);
}

if (!TALC.includes('\u2019') || !ASPARTAME.includes('\u2019')) {
  throw new Error('t135u curly apostrophe missing');
}
