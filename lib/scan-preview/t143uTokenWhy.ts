import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';

const CELLULOSE = 'Cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart.';
const STARCH = 'Pregelatinized starch is a processed starch used as a filler or binder in tablets.';
const COATING = 'This is a vegetarian coating made from hypromellose and glycerin.';
const CARRIER = 'This oil is used as a carrier or fill in softgels. It is not the base of a gummy.';
const PLANT = 'This is a named plant-part ingredient used as a filler or inactive.';
const GUAR = 'Guar gum is a plant fiber used as a thickener.';
const PETROLATUM = 'Petrolatum is a purified petroleum jelly used as an ointment base.';
const ALOE = 'Aloe barbadensis leaf juice is the juice from the aloe plant used as a plant ingredient.';
const CARBOMER = 'Carbomer is a gel thickener used in creams and gels.';
const TARTARIC = 'Tartaric acid is a natural acid used to set the acidity of the product.';
const SALT = 'Sodium chloride is table salt used as an electrolyte or filler.';
const CETEARYL = 'Cetearyl alcohol is a fatty alcohol used as an emulsifier in cream bases.';
const INULIN = 'Inulin is a plant fiber from chicory or other roots used as a prebiotic filler.';
const SUGAR_ALCOHOL = 'Sugar alcohol is a class name for sweeteners like xylitol or sorbitol. Large amounts can cause bloating or loose stools.';
const ACRYLATES = 'This is a synthetic polymer used as a thickener in creams.';
const ETHYLHEXYL = 'Ethylhexylglycerin is a preservative booster and skin-conditioning agent.';
const CREAM = 'This is a synthetic ingredient used in cream or coating formulas.';
const ESSENTIAL = 'This is a named essential oil used as a scent or inactive.';
const MINT = 'Dementholised mint oil is a plant scent used as an inactive.';
const ENTERIC = 'This is an enteric coating polymer. It is not plain hypromellose.';
const LANOLIN = 'Lanolin alcohol is wool wax. It can bother people who are sensitive to wool alcohols.';
const OAT = 'Organic oat hull fiber is a plant fiber from oats used as a filler.';
const PPG = 'PPG-12-Buteth-16 is a synthetic ingredient used in cream formulas.';
const XYLITOL_ERYTHRITOL = 'Xylitol and erythritol are sugar alcohols. Large amounts can cause bloating or loose stools. They are graded Limited and count toward a 3+ Limited stack.';
const SPIRULINA = 'Blue spirulina is an algae color. It is graded Limited and counts toward a 3+ Limited stack.';
const SORBATE_BENZOATE = 'Potassium sorbate and sodium benzoate are synthetic preservatives. On their own the risk is low, but they can form a trace of benzene when combined with vitamin C. They are graded Limited and count toward a 3+ Limited stack.';
const LEMON = 'Lemon oil is a named essential oil from lemon peel. It is graded Limited and counts toward a 3+ Limited stack.';
const DEXTRATES = 'Dextrates are a starch sugar used as a filler. They are graded Limited and count toward a 3+ Limited stack.';
const MAGNESIUM_OXIDE = 'Magnesium oxide is a mineral filler. It is graded Limited and counts toward a 3+ Limited stack.';
const ENTERIC_LIMITED = 'This is an enteric coating polymer. It is graded Limited and counts toward a 3+ Limited stack.';
const SD_ALCOHOL = 'SD alcohol 40-B is a denatured alcohol used as a solvent. It is graded Limited and counts toward a 3+ Limited stack.';
const CELLULOSE_ACETATE = 'Cellulose acetate is a coating polymer. It is graded Limited and counts toward a 3+ Limited stack.';
const HCL = 'Hydrochloric acid is a pH adjuster used in a finished spray. It is graded Limited and counts toward a 3+ Limited stack.';
const MICA = 'Mica is a mineral pigment used for shine. It is graded Limited and counts toward a 3+ Limited stack.';
const SUGAR_SPHERES = 'Sugar spheres are a sugar core used in some tablets. They are graded Limited and count toward a 3+ Limited stack.';
const GOMCT = 'goMCT is a branded medium-chain triglyceride. It is graded Limited and counts toward a 3+ Limited stack.';
const PEG_600 = 'Polyethylene glycol 600 is a synthetic solvent or plasticizer. It is graded Limited and counts toward a 3+ Limited stack.';
const SOY = 'Soybean oil is Not Clean when it is the base of a gummy. You are chewing the oil.';
const PALM = 'Palm oil is Not Clean when it is the base of a gummy. You are chewing the oil.';
const SUNFLOWER = 'Sunflower oil is Not Clean when it is the base of a gummy. You are chewing the oil.';
const CARAMEL = 'This is caramel color. The label does not name a class free of ammonia. The ammonia process can leave 4-MEI, which is classified as possibly carcinogenic.';
const CANOLA = 'Canola oil is Not Clean when it is the base of a gummy. You are chewing the oil.';
const DYE = 'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.';
const ETHYLPARABEN = 'Ethylparaben is a paraben preservative. The European Union has restricted some parabens because they can disrupt hormones.';
const DIAZOLIDNYL = 'Diazolidnyl urea is a preservative that can release formaldehyde.';

export type T143uGroup =
  | 'cellulose'
  | 'pregelatinized starch'
  | 'vegetarian coating'
  | 'carrier oil'
  | 'plant part'
  | 'guar gum'
  | 'petrolatum'
  | 'aloe juice'
  | 'carbomer'
  | 'tartaric acid'
  | 'sodium chloride'
  | 'cetearyl alcohol'
  | 'inulin'
  | 'sugar alcohol'
  | 'acrylates'
  | 'ethylhexylglycerin'
  | 'cream synthetic'
  | 'essential oil'
  | 'mint oil'
  | 'enteric'
  | 'lanolin alcohol'
  | 'oat hull'
  | 'ppg'
  | 'xylitol erythritol'
  | 'blue spirulina'
  | 'sorbate benzoate'
  | 'lemon oil'
  | 'dextrates'
  | 'magnesium oxide'
  | 'enteric limited'
  | 'sd alcohol'
  | 'cellulose acetate'
  | 'hydrochloric acid'
  | 'mica'
  | 'sugar spheres'
  | 'gomct'
  | 'peg 600'
  | 'soybean oil'
  | 'palm oil'
  | 'sunflower oil'
  | 'caramel color'
  | 'canola oil'
  | 'dye'
  | 'ethylparaben'
  | 'diazolidnyl urea';

const WHY: Record<T143uGroup, string> = {
  cellulose: CELLULOSE,
  'pregelatinized starch': STARCH,
  'vegetarian coating': COATING,
  'carrier oil': CARRIER,
  'plant part': PLANT,
  'guar gum': GUAR,
  petrolatum: PETROLATUM,
  'aloe juice': ALOE,
  carbomer: CARBOMER,
  'tartaric acid': TARTARIC,
  'sodium chloride': SALT,
  'cetearyl alcohol': CETEARYL,
  inulin: INULIN,
  'sugar alcohol': SUGAR_ALCOHOL,
  acrylates: ACRYLATES,
  ethylhexylglycerin: ETHYLHEXYL,
  'cream synthetic': CREAM,
  'essential oil': ESSENTIAL,
  'mint oil': MINT,
  enteric: ENTERIC,
  'lanolin alcohol': LANOLIN,
  'oat hull': OAT,
  ppg: PPG,
  'xylitol erythritol': XYLITOL_ERYTHRITOL,
  'blue spirulina': SPIRULINA,
  'sorbate benzoate': SORBATE_BENZOATE,
  'lemon oil': LEMON,
  dextrates: DEXTRATES,
  'magnesium oxide': MAGNESIUM_OXIDE,
  'enteric limited': ENTERIC_LIMITED,
  'sd alcohol': SD_ALCOHOL,
  'cellulose acetate': CELLULOSE_ACETATE,
  'hydrochloric acid': HCL,
  mica: MICA,
  'sugar spheres': SUGAR_SPHERES,
  gomct: GOMCT,
  'peg 600': PEG_600,
  'soybean oil': SOY,
  'palm oil': PALM,
  'sunflower oil': SUNFLOWER,
  'caramel color': CARAMEL,
  'canola oil': CANOLA,
  dye: DYE,
  ethylparaben: ETHYLPARABEN,
  'diazolidnyl urea': DIAZOLIDNYL,
};

export const T143U_EXPECTED_RISK: Record<T143uGroup, RiskLevel> = {
  cellulose: 'cleared',
  'pregelatinized starch': 'cleared',
  'vegetarian coating': 'cleared',
  'carrier oil': 'cleared',
  'plant part': 'cleared',
  'guar gum': 'cleared',
  petrolatum: 'cleared',
  'aloe juice': 'cleared',
  carbomer: 'cleared',
  'tartaric acid': 'cleared',
  'sodium chloride': 'cleared',
  'cetearyl alcohol': 'cleared',
  inulin: 'cleared',
  'sugar alcohol': 'moderate',
  acrylates: 'moderate',
  ethylhexylglycerin: 'moderate',
  'cream synthetic': 'moderate',
  'essential oil': 'moderate',
  'mint oil': 'moderate',
  enteric: 'moderate',
  'lanolin alcohol': 'moderate',
  'oat hull': 'moderate',
  ppg: 'moderate',
  'xylitol erythritol': 'limited',
  'blue spirulina': 'limited',
  'sorbate benzoate': 'limited',
  'lemon oil': 'limited',
  dextrates: 'limited',
  'magnesium oxide': 'limited',
  'enteric limited': 'limited',
  'sd alcohol': 'limited',
  'cellulose acetate': 'limited',
  'hydrochloric acid': 'limited',
  mica: 'limited',
  'sugar spheres': 'limited',
  gomct: 'limited',
  'peg 600': 'limited',
  'soybean oil': 'high',
  'palm oil': 'high',
  'sunflower oil': 'high',
  'caramel color': 'high',
  'canola oil': 'high',
  dye: 'high',
  ethylparaben: 'high',
  'diazolidnyl urea': 'high',
};

const EXACT: Record<string, T143uGroup> = {
  cellulose: 'cellulose',
  'cellulose (plant origin)': 'cellulose',
  'carboxymethylcellulose sodium': 'cellulose',
  'pregelatinized starch': 'pregelatinized starch',
  'named vegetarian coating (hpmc / glycerin)': 'vegetarian coating',
  'dandelion root': 'plant part',
  'alfalfa leaf': 'plant part',
  'parsley leaf': 'plant part',
  'organic guar gum': 'guar gum',
  petrolatum: 'petrolatum',
  'aloe barbadensis leaf juice': 'aloe juice',
  carbomer: 'carbomer',
  'tartaric acid': 'tartaric acid',
  'sodium chloride': 'sodium chloride',
  'cetearyl alcohol': 'cetearyl alcohol',
  inulin: 'inulin',
  'sugar alcohol': 'sugar alcohol',
  'acrylates/c10-30 alkyl acrylate crosspolymer': 'acrylates',
  ethylhexylglycerin: 'ethylhexylglycerin',
  'dicetyl phosphate': 'cream synthetic',
  'aminomethyl propanol': 'cream synthetic',
  'c30-45 alkyl cetearyl dimethicone crosspolymer': 'cream synthetic',
  'caprylyl methicone': 'cream synthetic',
  'iodopropynyl butylcarbamate': 'cream synthetic',
  'aluminum glycinate': 'cream synthetic',
  aminomethylpropanol: 'cream synthetic',
  'dihydroxyaluminum aminoacetate': 'cream synthetic',
  ethoxydiglycol: 'cream synthetic',
  'clove oil': 'essential oil',
  'cajuput oil': 'essential oil',
  'dementholised mint oil': 'mint oil',
  'methacrylic acid and ethyl acrylate copolymer': 'enteric',
  'polyvinyl acetate phthalates': 'enteric',
  'lanolin alcohol': 'lanolin alcohol',
  'organic oat hull fiber': 'oat hull',
  'ppg-12-buteth-16': 'ppg',
  'xylitol / erythritol': 'xylitol erythritol',
  'blue spirulina (for color)': 'blue spirulina',
  'potassium sorbate / benzoate': 'sorbate benzoate',
  'lemon oil': 'lemon oil',
  dextrates: 'dextrates',
  'magnesium oxide': 'magnesium oxide',
  'methacrylic acid copolymer': 'enteric limited',
  'polyvinyl acetate pthalate': 'enteric limited',
  'sd alcohol 40-b': 'sd alcohol',
  'cellulose acetate': 'cellulose acetate',
  'hydrochloric acid': 'hydrochloric acid',
  'mica-based pearlescent pigment': 'mica',
  'sugar spheres': 'sugar spheres',
  'gomct\u00ae': 'gomct',
  'polyethylene glycol 600': 'peg 600',
  'sunflower seed oil': 'sunflower oil',
  'organic sunflower oil (for coating)': 'sunflower oil',
  'organic sunflower oil (containing carnauba wax)': 'sunflower oil',
  'caramel color (undisclosed class)': 'caramel color',
  'natural caramel color': 'caramel color',
  'plain caramel powder': 'caramel color',
  'caramel liquid': 'caramel color',
  'caramel color (class not stated)': 'caramel color',
  'coconut and canola oil': 'canola oil',
  'd&c red no. 22': 'dye',
  'fd and c blue # 1': 'dye',
  'fd and c yellow # 5': 'dye',
  ethylparaben: 'ethylparaben',
  'diazolidnyl urea': 'diazolidnyl urea',
};

const SOYBEAN = 'soybean oil';
const SAFFLOWER = 'safflower oil';
const AVOID_PALM = new Set(['palm oil', 'non-gmo palm oil', 'hydrogenated palm oil']);
const AVOID_SUNFLOWER = new Set([
  'sunflower seed oil',
  'organic sunflower oil (for coating)',
  'organic sunflower oil (containing carnauba wax)',
]);

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t143uOilBase(form: string | undefined): 'gummy' | 'lozenge' | 'chew' | 'other' {
  const text = (form ?? '').toLowerCase();
  if (/\b(gummy|gummies)\b/.test(text)) return 'gummy';
  if (/\blozenge\b/.test(text)) return 'lozenge';
  if (/\bchews?\b/.test(text) && !/chewable/.test(text)) return 'chew';
  return 'other';
}

export function t143uIsOilBase(form: string | undefined): boolean {
  return t143uOilBase(form) !== 'other';
}

/** Whole printed token only. Case and surrounding space are ignored. */
export function t143uGroup(name: string, form?: string, riskLevel?: RiskLevel): T143uGroup | undefined {
  const key = norm(name);
  if (key === SOYBEAN) {
    if (t143uIsOilBase(form)) return 'soybean oil';
    if (riskLevel === 'high') return 'soybean oil';
    if (riskLevel === 'cleared') return 'carrier oil';
    return undefined;
  }
  if (key === SAFFLOWER) {
    if (t143uIsOilBase(form)) return undefined;
    return 'carrier oil';
  }
  if (AVOID_PALM.has(key)) return riskLevel === 'high' ? 'palm oil' : undefined;
  if (key === 'coconut and canola oil' || AVOID_SUNFLOWER.has(key)) {
    if (riskLevel !== 'high') return undefined;
  }
  return EXACT[key];
}

export function t143uWhyForName(name: string, form?: string, riskLevel?: RiskLevel): string | undefined {
  const group = t143uGroup(name, form, riskLevel);
  return group ? WHY[group] : undefined;
}

export function applyT143uIngredients(
  ingredients: readonly IngredientFlag[],
  record: Pick<RatingRecord, 'form'>,
): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t143uWhyForName(ingredient.name, record.form, ingredient.riskLevel);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

/** Stored why only. Grades, notes, and rows outside the listed tokens stay as they are. */
export function applyT143uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT143uIngredients(record.inactiveIngredients, record);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, string | undefined, RiskLevel | undefined, T143uGroup | undefined]> = [
  ['Cellulose', undefined, 'cleared', 'cellulose'],
  ['cellulose', undefined, 'cleared', 'cellulose'],
  ['Cellulose (Plant Origin)', undefined, 'cleared', 'cellulose'],
  ['Carboxymethylcellulose sodium', undefined, 'cleared', 'cellulose'],
  ['Microcrystalline cellulose', undefined, 'cleared', undefined],
  ['Cellulose acetate', undefined, 'limited', 'cellulose acetate'],
  ['Hydroxypropyl cellulose', undefined, 'cleared', undefined],
  ['Cellulose Gum', undefined, 'cleared', undefined],
  ['Pregelatinized starch', undefined, 'cleared', 'pregelatinized starch'],
  ['Pregelatinized starch (maize)', undefined, 'cleared', undefined],
  ['Palm oil', 'gummy', 'high', 'palm oil'],
  ['palm oil', 'softgel', 'cleared', undefined],
  ['fully hydrogenated palm oil', 'chewable', 'high', undefined],
  ['Hydrogenated Palm Oil', 'gummy', 'high', 'palm oil'],
  ['Organic palm oil', 'softgel', 'cleared', undefined],
  ['Sustainable Palm Oil', 'gummy', 'high', undefined],
  ['Sugar alcohol', undefined, 'moderate', 'sugar alcohol'],
  ['Xylitol', undefined, 'limited', undefined],
  ['Sorbitol', undefined, 'limited', undefined],
  ['Soybean Oil', 'softgel', 'cleared', 'carrier oil'],
  ['Soybean Oil', 'gummy', 'cleared', 'soybean oil'],
  ['soybean oil', 'tablet', 'high', 'soybean oil'],
  ['Safflower oil', 'softgel', 'cleared', 'carrier oil'],
  ['Safflower oil', 'gummy', 'cleared', undefined],
  ['Safflower oil (softgel fill)', 'softgel', 'cleared', undefined],
  ['Sunflower Seed Oil', 'gummy', 'high', 'sunflower oil'],
  ['Organic sunflower oil', 'gummy', 'high', undefined],
  ['Coconut and canola oil', 'tablet', 'high', 'canola oil'],
  ['Coconut and canola oil', 'softgel', 'cleared', undefined],
  ['D&C Red No. 22', undefined, 'high', 'dye'],
  ['d&c red # 22', undefined, 'high', undefined],
  ['FD and C blue # 1', undefined, 'high', 'dye'],
  ['FD and C yellow # 5', undefined, 'high', 'dye'],
  ['FD&C Yellow No. 5', undefined, 'high', undefined],
  ['goMCT\u00ae', undefined, 'limited', 'gomct'],
  ['Inulin / FOS', undefined, 'cleared', undefined],
  ['Carbomer homopolymer type B', undefined, 'cleared', undefined],
  ['Acrylates/C10-30 Alkyl Acrylate Crosspolyer', undefined, 'moderate', undefined],
  ['SD alcohol 38-B', undefined, 'cleared', undefined],
  ['Natural lemon oil', undefined, 'limited', undefined],
  ['Lemon Oil', undefined, 'limited', 'lemon oil'],
  ['Lemon Oil (lemon peel extract)', undefined, 'limited', undefined],
  ['Dextrates hydrated', undefined, 'cleared', undefined],
  ['Blue spirulina (for color)', undefined, 'cleared', 'blue spirulina'],
];

for (const [name, form, risk, group] of MUST) {
  const found = t143uGroup(name, form, risk);
  if (found !== group) throw new Error(`t143u ${name} @ ${form ?? '-'} ${risk ?? '-'} -> ${found ?? 'none'}`);
  if (group && t143uWhyForName(name, form, risk) !== WHY[group]) throw new Error(`t143u why ${name}`);
}
