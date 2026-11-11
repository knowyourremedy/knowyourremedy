import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';

const LAURATE = 'Calcium laurate is a fatty-acid salt used as a lubricant so the tablet presses and releases from the mold cleanly.';
const INULIN = 'Inulin is a plant fiber from chicory or other roots used as a prebiotic filler.';
const PETROLATUM = 'White petrolatum is a purified petroleum jelly used as an ointment base.';
const PLANT = 'This is a named plant extract used as an inactive or scent in a cream.';
const JUICE = 'Fruit and vegetable juice is used as a plant color. It is not a synthetic dye.';
const PALM = 'Organic palm oil is a pressed oil used as a carrier or fill. It is not the base of a gummy.';
const RICE = 'Rice powder is a simple rice filler. It is not rice flour or an unnamed rice extract.';
const PHOSPHATE = 'Tricalcium phosphate is a mineral salt used as a filler so the tablet holds its shape.';
const CARBOMER = 'Carbomer is a gel thickener used in creams and gels.';
const PROPELLANT = 'This is a propellant used in a spray.';
const GREEN_TEA = 'Green tea extract is a plant extract used for freshness.';
const HPC = 'Hydroxypropyl cellulose is a processed cellulose derivative used as a binder or coating.';
const LANOLIN = 'Lanolin alcohols are wool wax components. They can bother people who are sensitive to wool alcohols.';
const LAURALKONIUM = 'Lauralkonium chloride is a quaternary ammonium compound used as a preservative or conditioner.';
const LICORICE = 'Licorice root contains glycyrrhizin. Large amounts can raise blood pressure or affect the heart and kidneys in some people.';
const MINT = 'This is a named mint essential oil used as a scent or inactive.';
const ENTERIC = 'This is an enteric coating polymer. It is not plain hypromellose.';
const POLYSORBATE = 'Polysorbate 20 is a synthetic emulsifier. A 2023 study found it can weaken the gut barrier. It is graded Limited and counts toward a 3+ Limited stack.';
const HEXANEDIOL = '1,2-Hexanediol is a skin-conditioning solvent. It is graded Limited and counts toward a 3+ Limited stack.';
const ALLULOSE = 'Allulose is a rare sugar used as a sweetener. It is graded Limited and counts toward a 3+ Limited stack.';
const BERRY = 'Artificial mixed berry flavor is a synthetic flavor blend. It is graded Limited and counts toward a 3+ Limited stack.';
const THREONATE = 'Calcium threonate is a calcium salt used as a mineral source. It is graded Limited and counts toward a 3+ Limited stack.';
const EUCALYPTOL = 'Eucalyptol is a named compound from eucalyptus used as a scent or inactive. It is graded Limited and counts toward a 3+ Limited stack.';
const ISOBUTANE = 'Isobutane is a propellant used in a spray. It is graded Limited and counts toward a 3+ Limited stack.';
const KELP = 'Kelp is a seaweed used as a mineral source or inactive. It is graded Limited and counts toward a 3+ Limited stack.';
const MACROGOL = 'Macrogol is a polyethylene glycol used as a solvent or plasticizer. It is graded Limited and counts toward a 3+ Limited stack.';
const SILICATE = 'Magnesium aluminum silicate is a mineral powder used as an anti-caking agent. It is graded Limited and counts toward a 3+ Limited stack.';

export type T151uGroup =
  | 'calcium laurate'
  | 'inulin fos'
  | 'white petrolatum'
  | 'plant extract'
  | 'juice color'
  | 'organic palm oil'
  | 'rice powder'
  | 'tricalcium phosphate'
  | 'carbomer type b'
  | 'propellant'
  | 'green tea'
  | 'hydroxyproyl cellulose'
  | 'lanolin alcohols'
  | 'lauralkonium chloride'
  | 'licorice root'
  | 'mint oil'
  | 'enteric'
  | 'polysorbate 20'
  | 'hexanediol'
  | 'allulose'
  | 'mixed berry'
  | 'calcium threonate'
  | 'eucalyptol'
  | 'isobutane'
  | 'kelp'
  | 'macrogol'
  | 'magnesium aluminum silicate';

const WHY: Record<T151uGroup, string> = {
  'calcium laurate': LAURATE,
  'inulin fos': INULIN,
  'white petrolatum': PETROLATUM,
  'plant extract': PLANT,
  'juice color': JUICE,
  'organic palm oil': PALM,
  'rice powder': RICE,
  'tricalcium phosphate': PHOSPHATE,
  'carbomer type b': CARBOMER,
  propellant: PROPELLANT,
  'green tea': GREEN_TEA,
  'hydroxyproyl cellulose': HPC,
  'lanolin alcohols': LANOLIN,
  'lauralkonium chloride': LAURALKONIUM,
  'licorice root': LICORICE,
  'mint oil': MINT,
  enteric: ENTERIC,
  'polysorbate 20': POLYSORBATE,
  hexanediol: HEXANEDIOL,
  allulose: ALLULOSE,
  'mixed berry': BERRY,
  'calcium threonate': THREONATE,
  eucalyptol: EUCALYPTOL,
  isobutane: ISOBUTANE,
  kelp: KELP,
  macrogol: MACROGOL,
  'magnesium aluminum silicate': SILICATE,
};

export const T151U_EXPECTED_RISK: Record<T151uGroup, RiskLevel> = {
  'calcium laurate': 'cleared',
  'inulin fos': 'cleared',
  'white petrolatum': 'cleared',
  'plant extract': 'cleared',
  'juice color': 'cleared',
  'organic palm oil': 'cleared',
  'rice powder': 'cleared',
  'tricalcium phosphate': 'cleared',
  'carbomer type b': 'cleared',
  propellant: 'moderate',
  'green tea': 'moderate',
  'hydroxyproyl cellulose': 'moderate',
  'lanolin alcohols': 'moderate',
  'lauralkonium chloride': 'moderate',
  'licorice root': 'moderate',
  'mint oil': 'moderate',
  enteric: 'moderate',
  'polysorbate 20': 'limited',
  hexanediol: 'limited',
  allulose: 'limited',
  'mixed berry': 'limited',
  'calcium threonate': 'limited',
  eucalyptol: 'limited',
  isobutane: 'limited',
  kelp: 'limited',
  macrogol: 'limited',
  'magnesium aluminum silicate': 'limited',
};

const EXACT: Record<string, T151uGroup> = {
  'calcium laurate': 'calcium laurate',
  'inulin / fos': 'inulin fos',
  'white petrolatum': 'white petrolatum',
  'arnica montana flower extract': 'plant extract',
  'ilex paraguariensis leaf extract': 'plant extract',
  'fruit and vegetable juice (color)': 'juice color',
  'organic palm oil': 'organic palm oil',
  'rice powder': 'rice powder',
  'tricalcium phosphate': 'tricalcium phosphate',
  'carbomer homopolymer type b': 'carbomer type b',
  '3-(2-ethylhexyloxy)propane-1,2-diol': 'propellant',
  'green tea extract (for freshness)': 'green tea',
  'hydroxyproyl cellulose': 'hydroxyproyl cellulose',
  'lanolin alcohols': 'lanolin alcohols',
  'lauralkonium chloride': 'lauralkonium chloride',
  'licorice root': 'licorice root',
  'mentha arvensis leaf oil': 'mint oil',
  'mentha oil': 'mint oil',
  'mentha viridis (spearmint) leaf oil': 'mint oil',
  'methacrylic acid-ethyl acrylate copolymer': 'enteric',
  'polysorbate 20': 'polysorbate 20',
  '1,2-hexanediol': 'hexanediol',
  allulose: 'allulose',
  'artificial mixed berry flavor': 'mixed berry',
  'calcium threonate': 'calcium threonate',
  eucalyptol: 'eucalyptol',
  isobutane: 'isobutane',
  kelp: 'kelp',
  macrogol: 'macrogol',
  'magnesium aluminum silicate': 'magnesium aluminum silicate',
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t151uIsGummyBase(form: string | undefined): boolean {
  return /\b(gummy|gummies)\b/i.test(form ?? '');
}

/** Whole printed token only, and only when the current grade matches the heading. */
export function t151uGroup(name: string, form?: string, riskLevel?: RiskLevel): T151uGroup | undefined {
  const key = norm(name);
  const group = EXACT[key];
  if (!group) return undefined;
  if (group === 'organic palm oil' && t151uIsGummyBase(form)) return undefined;
  if (riskLevel !== T151U_EXPECTED_RISK[group]) return undefined;
  return group;
}

export function t151uWhyForName(name: string, form?: string, riskLevel?: RiskLevel): string | undefined {
  const group = t151uGroup(name, form, riskLevel);
  return group ? WHY[group] : undefined;
}

export function applyT151uIngredients(
  ingredients: readonly IngredientFlag[],
  record: Pick<RatingRecord, 'form'>,
): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t151uWhyForName(ingredient.name, record.form, ingredient.riskLevel);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT151uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT151uIngredients(record.inactiveIngredients, record);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, string | undefined, RiskLevel | undefined, T151uGroup | undefined]> = [
  ['Calcium laurate', undefined, 'cleared', 'calcium laurate'],
  ['Calcium laurate / stearate', undefined, 'cleared', undefined],
  ['Inulin / FOS', undefined, 'cleared', 'inulin fos'],
  ['Inulin', undefined, 'cleared', undefined],
  ['White petrolatum', undefined, 'cleared', 'white petrolatum'],
  ['White petrolatum USP', undefined, 'cleared', undefined],
  ['Fruit and Vegetable Juice (Color)', 'gummy', 'cleared', 'juice color'],
  ['Fruit and Vegetable Juice Color', 'gummy', 'cleared', undefined],
  ['Organic palm oil', 'tablet', 'cleared', 'organic palm oil'],
  ['Organic palm oil', 'gummy', 'cleared', undefined],
  ['Organic palm oil (coating)', 'tablet', 'cleared', undefined],
  ['Carbomer homopolymer type B', undefined, 'cleared', 'carbomer type b'],
  ['Carbomer homopolymer type C', undefined, 'cleared', undefined],
  ['Carbomer', undefined, 'cleared', undefined],
  ['hydroxyproyl cellulose', undefined, 'moderate', 'hydroxyproyl cellulose'],
  ['Hydroxypropyl cellulose', undefined, 'moderate', undefined],
  ['Lanolin alcohols', undefined, 'moderate', 'lanolin alcohols'],
  ['Lanolin alcohol', undefined, 'moderate', undefined],
  ['Licorice Root', undefined, 'moderate', 'licorice root'],
  ['Licorice Root Powder', undefined, 'moderate', undefined],
  ['Mentha Oil', undefined, 'moderate', 'mint oil'],
  ['Mentha oil', undefined, 'cleared', undefined],
  ['Allulose', 'gummy', 'limited', 'allulose'],
  ['Allulose', 'gummy', 'cleared', undefined],
  ['Organic Allulose', 'gummy', 'cleared', undefined],
  ['Polysorbate 20', undefined, 'limited', 'polysorbate 20'],
  ['Polysorbate 80', undefined, 'limited', undefined],
  ['macrogol', undefined, 'limited', 'macrogol'],
  ['Macrogol / PEG 400', undefined, 'limited', undefined],
  ['Coconut oil', 'gummy', 'cleared', undefined],
  ['Sustainable Palm Oil', 'capsule', 'cleared', undefined],
];

for (const [name, form, risk, group] of MUST) {
  const found = t151uGroup(name, form, risk);
  if (found !== group) throw new Error(`t151u ${name} @ ${form ?? '-'} ${risk ?? '-'} -> ${found ?? 'none'}`);
  if (group && t151uWhyForName(name, form, risk) !== WHY[group]) throw new Error(`t151u why ${name}`);
}
