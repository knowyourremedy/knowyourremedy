import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';

const COATING = 'This is a vegetarian coating. The label does not name hypromellose or glycerin.';
const CELLULOSE_GUM = 'Cellulose gum is a plant-fiber thickener or coating.';
const COCONUT = 'Coconut oil is a pressed oil from coconut meat used as a carrier or fill.';
const ORGANIC_SUGAR = 'Organic sugar is table sugar from organic cane used as a sweetener.';
const REB_M = 'Rebaudioside M is a high-purity stevia sweetener.';
const COCOA = 'Cocoa butter is the fat from cocoa beans used as a base in creams or coatings.';
const VANILLA = 'Natural vanilla extract is the extract of vanilla beans used as a flavor.';
const CHOCOLATE = 'Unsweetened chocolate is pure chocolate with no added sugar.';
const WATERCRESS = 'Watercress leaf is a named plant-part ingredient used as a filler or inactive.';
const DIMETHICONE = 'Dimethicone is a silicone used as a skin protectant or coating.';
const GLYCERYL = 'Glyceryl stearate is a wax-like emulsifier used in creams and coatings.';
const GUAR = 'Guar gum is a plant fiber used as a thickener.';
const ROSEMARY = 'Rosemary extract is the named extract from rosemary leaves used as an antioxidant or inactive.';
const HYPOCHLORITE = 'Sodium hypochlorite is a residual oxidizer. It is graded Caution.';
const PYRUVATE = 'Sodium pyruvate is a salt used as an inactive.';
const EDTA = 'Tetrasodium EDTA is an EDTA salt used as a stabilizer in trace amounts.';
const VANILLYL = 'Vanillyl butyl ether is a warming agent used in creams.';
const ALUMINUM = 'Aluminum hydroxide is listed as an inactive ingredient, not as a swallowed antacid.';
const BETA = 'Beta-carotene here is used as a color, not as a vitamin dose.';
const CASSIA = 'Cassia oil is a plant essential oil used as a scent or inactive.';
const GRAPEFRUIT = 'This is grapefruit peel oil used as a scent or inactive.';
const CORN_CAUTION = 'Corn syrup solids are a dried sweetener from corn syrup.';
const RIBOSE = 'D-ribose is a sugar used as an inactive. It is graded Caution.';
const ISOSORBIDE = 'Dimethyl isosorbide is a solvent used in cream formulas.';
const EUDRAGIT = 'Eudragit is an enteric coating polymer. It is not plain hypromellose.';
const GRAIN_CAUTION = 'Grain alcohol is the solvent that carries the other ingredients.';
const POLYCARBOPHIL = 'Calcium polycarbophil is a fiber used as an inactive. It is graded Limited and counts toward a 3+ Limited stack.';
const ELEUTHERO = 'Eleuthero root is a named plant root used as an inactive. It is graded Limited and counts toward a 3+ Limited stack.';
const CASEINATE = 'Sodium caseinate is a milk protein used as a filler. It is graded Limited and counts toward a 3+ Limited stack.';
const MEGLUMINE = 'Meglumine is a sugar-derived solvent used as an inactive. It is graded Limited and counts toward a 3+ Limited stack.';
const SORBITOL = 'Sorbitol special is a sugar alcohol. Large amounts can cause bloating or loose stools. It is graded Limited and counts toward a 3+ Limited stack.';
const TAPIOCA = 'Tapioca dextrin is a starch breakdown product used as a filler. It is graded Limited and counts toward a 3+ Limited stack.';
const TROLAMINE = 'Trolamine is a pH adjuster. It is graded Limited and counts toward a 3+ Limited stack.';
const PHENYLETHYL = 'Phenylethyl alcohol is a solvent used in small amounts. It is graded Limited and counts toward a 3+ Limited stack.';
const GRAPE = 'Artificial grape flavor is a synthetic grape flavor. It is graded Limited and counts toward a 3+ Limited stack.';
const CAPRIC = 'Caprylic/capric triglyceride is a medium-chain triglyceride. It is graded Limited and counts toward a 3+ Limited stack.';
const CAPRYLYL = 'Caprylyl glycol is a skin-conditioning agent. It is graded Limited and counts toward a 3+ Limited stack.';
const CORN_LIMITED = 'Corn syrup solids are a dried sweetener from corn syrup. It is graded Limited and counts toward a 3+ Limited stack.';
const DEXTROSE = 'Dextrose excipient is a sugar used as a filler. It is graded Limited and counts toward a 3+ Limited stack.';
const GRAIN_LIMITED = 'Grain alcohol is the solvent that carries the other ingredients. It is graded Limited and counts toward a 3+ Limited stack.';
const MANNITOL = 'Mannitol complex is a sugar alcohol. Large amounts can cause bloating or loose stools. It is graded Limited and counts toward a 3+ Limited stack.';
const DYE = 'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.';
const PARABEN = 'This is a paraben preservative. The European Union has restricted some parabens because they can disrupt hormones.';
const CARAMEL = 'This is caramel color. The label does not name a class free of ammonia. The ammonia process can leave 4-MEI, which is classified as possibly carcinogenic.';
const OIL = 'This oil is Not Clean when it is the base of a gummy. You are chewing the oil.';
const SYNTHETIC = 'Synthetic dye is a synthetic color. European labels warn that this dye family can affect activity and attention in children.';
const TITANIUM = 'Titanium oxide is a white color. In 2022 the European Union stopped allowing it in food after its food-safety agency could not rule out damage to DNA.';

export type T146uGroup =
  | 'vegetarian coating'
  | 'cellulose gum'
  | 'coconut oil'
  | 'organic sugar'
  | 'rebaudioside m'
  | 'cocoa butter'
  | 'vanilla extract'
  | 'unsweetened chocolate'
  | 'watercress leaf'
  | 'dimethicone'
  | 'glyceryl stearate'
  | 'guar gum'
  | 'rosemary extract'
  | 'sodium hypochlorite'
  | 'sodium pyruvate'
  | 'tetrasodium edta'
  | 'vanillyl butyl ether'
  | 'aluminum hydroxide'
  | 'beta carotene'
  | 'cassia oil'
  | 'grapefruit peel oil'
  | 'corn syrup caution'
  | 'd-ribose'
  | 'dimethyl isosorbide'
  | 'eudragit'
  | 'grain alcohol caution'
  | 'calcium polycarbophil'
  | 'eleuthero root'
  | 'sodium caseinate'
  | 'meglumine'
  | 'sorbitol special'
  | 'tapioca dextrin'
  | 'trolamine'
  | 'phenylethyl alcohol'
  | 'artificial grape'
  | 'caprylic triglyceride'
  | 'caprylyl glycol'
  | 'corn syrup limited'
  | 'dextrose excipient'
  | 'grain alcohol limited'
  | 'mannitol complex'
  | 'dye'
  | 'paraben'
  | 'caramel color'
  | 'gummy oil'
  | 'synthetic dye'
  | 'titanium oxide';

const WHY: Record<T146uGroup, string> = {
  'vegetarian coating': COATING,
  'cellulose gum': CELLULOSE_GUM,
  'coconut oil': COCONUT,
  'organic sugar': ORGANIC_SUGAR,
  'rebaudioside m': REB_M,
  'cocoa butter': COCOA,
  'vanilla extract': VANILLA,
  'unsweetened chocolate': CHOCOLATE,
  'watercress leaf': WATERCRESS,
  dimethicone: DIMETHICONE,
  'glyceryl stearate': GLYCERYL,
  'guar gum': GUAR,
  'rosemary extract': ROSEMARY,
  'sodium hypochlorite': HYPOCHLORITE,
  'sodium pyruvate': PYRUVATE,
  'tetrasodium edta': EDTA,
  'vanillyl butyl ether': VANILLYL,
  'aluminum hydroxide': ALUMINUM,
  'beta carotene': BETA,
  'cassia oil': CASSIA,
  'grapefruit peel oil': GRAPEFRUIT,
  'corn syrup caution': CORN_CAUTION,
  'd-ribose': RIBOSE,
  'dimethyl isosorbide': ISOSORBIDE,
  eudragit: EUDRAGIT,
  'grain alcohol caution': GRAIN_CAUTION,
  'calcium polycarbophil': POLYCARBOPHIL,
  'eleuthero root': ELEUTHERO,
  'sodium caseinate': CASEINATE,
  meglumine: MEGLUMINE,
  'sorbitol special': SORBITOL,
  'tapioca dextrin': TAPIOCA,
  trolamine: TROLAMINE,
  'phenylethyl alcohol': PHENYLETHYL,
  'artificial grape': GRAPE,
  'caprylic triglyceride': CAPRIC,
  'caprylyl glycol': CAPRYLYL,
  'corn syrup limited': CORN_LIMITED,
  'dextrose excipient': DEXTROSE,
  'grain alcohol limited': GRAIN_LIMITED,
  'mannitol complex': MANNITOL,
  dye: DYE,
  paraben: PARABEN,
  'caramel color': CARAMEL,
  'gummy oil': OIL,
  'synthetic dye': SYNTHETIC,
  'titanium oxide': TITANIUM,
};

export const T146U_EXPECTED_RISK: Record<T146uGroup, RiskLevel> = {
  'vegetarian coating': 'cleared',
  'cellulose gum': 'cleared',
  'coconut oil': 'cleared',
  'organic sugar': 'cleared',
  'rebaudioside m': 'cleared',
  'cocoa butter': 'cleared',
  'vanilla extract': 'cleared',
  'unsweetened chocolate': 'cleared',
  'watercress leaf': 'cleared',
  dimethicone: 'cleared',
  'glyceryl stearate': 'cleared',
  'guar gum': 'cleared',
  'rosemary extract': 'moderate',
  'sodium hypochlorite': 'moderate',
  'sodium pyruvate': 'moderate',
  'tetrasodium edta': 'moderate',
  'vanillyl butyl ether': 'moderate',
  'aluminum hydroxide': 'moderate',
  'beta carotene': 'moderate',
  'cassia oil': 'moderate',
  'grapefruit peel oil': 'moderate',
  'corn syrup caution': 'moderate',
  'd-ribose': 'moderate',
  'dimethyl isosorbide': 'moderate',
  eudragit: 'moderate',
  'grain alcohol caution': 'moderate',
  'calcium polycarbophil': 'limited',
  'eleuthero root': 'limited',
  'sodium caseinate': 'limited',
  meglumine: 'limited',
  'sorbitol special': 'limited',
  'tapioca dextrin': 'limited',
  trolamine: 'limited',
  'phenylethyl alcohol': 'limited',
  'artificial grape': 'limited',
  'caprylic triglyceride': 'limited',
  'caprylyl glycol': 'limited',
  'corn syrup limited': 'limited',
  'dextrose excipient': 'limited',
  'grain alcohol limited': 'limited',
  'mannitol complex': 'limited',
  dye: 'high',
  paraben: 'high',
  'caramel color': 'high',
  'gummy oil': 'high',
  'synthetic dye': 'high',
  'titanium oxide': 'high',
};

const EXACT: Record<string, T146uGroup> = {
  'vegetarian / vegetable coating (unnamed)': 'vegetarian coating',
  'cellulose gum': 'cellulose gum',
  'hydroxyethyl cellulose': 'cellulose gum',
  'cellulose coating': 'cellulose gum',
  'coconut oil': 'coconut oil',
  'organic sugar': 'organic sugar',
  'rebaudioside m': 'rebaudioside m',
  'cocoa butter': 'cocoa butter',
  'natural vanilla extract': 'vanilla extract',
  'unsweetened chocolate': 'unsweetened chocolate',
  'watercress leaf': 'watercress leaf',
  dimethicone: 'dimethicone',
  'glyceryl stearate': 'glyceryl stearate',
  'guar gum': 'guar gum',
  'rosemary extract': 'rosemary extract',
  'sodium hypochlorite': 'sodium hypochlorite',
  'sodium pyruvate': 'sodium pyruvate',
  'tetrasodium edta': 'tetrasodium edta',
  'vanillyl butyl ether': 'vanillyl butyl ether',
  'aluminum hydroxide': 'aluminum hydroxide',
  'beta carotene': 'beta carotene',
  'cassia oil': 'cassia oil',
  'citrus paradisi (grapefruit) peel oil': 'grapefruit peel oil',
  'd-ribose': 'd-ribose',
  'dimethyl isosorbide': 'dimethyl isosorbide',
  eudragit: 'eudragit',
  'grain alcohol (46\u201356% by volume)': 'grain alcohol caution',
  'calcium polycarbophil': 'calcium polycarbophil',
  'eleuthero root': 'eleuthero root',
  'sodium caseinate': 'sodium caseinate',
  meglumine: 'meglumine',
  'sorbitol special': 'sorbitol special',
  'tapioca dextrin': 'tapioca dextrin',
  trolamine: 'trolamine',
  '0.25% w/w phenylethyl alcohol': 'phenylethyl alcohol',
  'artificial grape flavor': 'artificial grape',
  'caprylic/capric triglyceride': 'caprylic triglyceride',
  'caprylyl glycol': 'caprylyl glycol',
  'dextrose excipient': 'dextrose excipient',
  'grain alcohol (20-30% by volume)': 'grain alcohol limited',
  'mannitol complex': 'mannitol complex',
  'd&c red # 22': 'dye',
  'fd&c dyes (red 40 / blue 1 / yellow 6 on dyed flavors)': 'dye',
  'fd&c dyes on variety-pack sleeves (red 40 / blue 1 / yellow 6)': 'dye',
  methylparaban: 'paraben',
  propylparaban: 'paraben',
  'organic caramel (color)': 'caramel color',
  'organic sunflower seed oil': 'gummy oil',
  'sustainable palm oil': 'gummy oil',
  'vegetable oil (palm) (contains carnauba wax)': 'gummy oil',
  'synthetic dye': 'synthetic dye',
  'titanium oxide': 'titanium oxide',
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t146uIsGummyBase(form: string | undefined): boolean {
  return /\b(gummy|gummies)\b/i.test(form ?? '');
}

/** Whole printed token only. Case and surrounding space are ignored. */
export function t146uGroup(name: string, riskLevel?: RiskLevel): T146uGroup | undefined {
  const key = norm(name);
  if (key === 'corn syrup solids') {
    if (riskLevel === 'moderate') return 'corn syrup caution';
    if (riskLevel === 'limited') return 'corn syrup limited';
    return undefined;
  }
  if (key === 'beta carotene') return 'beta carotene';
  return EXACT[key];
}

export function t146uWhyForName(name: string, riskLevel?: RiskLevel): string | undefined {
  const group = t146uGroup(name, riskLevel);
  return group ? WHY[group] : undefined;
}

export function applyT146uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t146uWhyForName(ingredient.name, ingredient.riskLevel);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

/** Stored why only. Grades, notes, and rows outside the listed tokens stay as they are. */
export function applyT146uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT146uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, RiskLevel | undefined, T146uGroup | undefined]> = [
  ['Coconut oil', 'cleared', 'coconut oil'],
  ['Coconut and canola oil', 'high', undefined],
  ['Caprylic/Capric Triglyceride', 'limited', 'caprylic triglyceride'],
  ['Caprylic/capric triglycerides', 'limited', undefined],
  ['Guar gum', 'cleared', 'guar gum'],
  ['Organic guar gum', 'cleared', undefined],
  ['Xanthan gum', 'cleared', undefined],
  ['Dimethicone', 'cleared', 'dimethicone'],
  ['C30-45 alkyl cetearyl dimethicone crosspolymer', 'moderate', undefined],
  ['Rosemary extract', 'moderate', 'rosemary extract'],
  ['Rosemary Oil', 'cleared', undefined],
  ['Synthetic dye', 'high', 'synthetic dye'],
  ['FD&C dyes (Red 40 / Blue 1 / Yellow 6 on dyed flavors)', 'high', 'dye'],
  ['Red 40', 'high', undefined],
  ['Corn syrup solids', 'moderate', 'corn syrup caution'],
  ['Corn syrup solids', 'limited', 'corn syrup limited'],
  ['Corn syrup solids', 'cleared', undefined],
  ['Corn syrup', 'limited', undefined],
  ['Grain alcohol (46\u201356% by volume)', 'moderate', 'grain alcohol caution'],
  ['grain alcohol (20-30% by volume)', 'limited', 'grain alcohol limited'],
  ['Grain alcohol', 'limited', undefined],
  ['grain alcohol (60-70% by volume)', 'limited', undefined],
  ['Beta carotene', 'moderate', 'beta carotene'],
  ['Beta Carotene', 'moderate', 'beta carotene'],
  ['Beta-carotene', 'limited', undefined],
  ['Beta carotene (for color)', 'moderate', undefined],
  ['Vitamin A (as Beta Carotene)', 'cleared', undefined],
  ['Aluminum hydroxide', 'moderate', 'aluminum hydroxide'],
  ['Cellulose Gum', 'cleared', 'cellulose gum'],
  ['Cellulose', 'cleared', undefined],
  ['Cellulose acetate', 'limited', undefined],
  ['Watercress Leaf', 'cleared', 'watercress leaf'],
  ['Watercress', 'cleared', undefined],
];

for (const [name, risk, group] of MUST) {
  const found = t146uGroup(name, risk);
  if (found !== group) throw new Error(`t146u ${name} ${risk ?? '-'} -> ${found ?? 'none'}`);
  if (group && t146uWhyForName(name, risk) !== WHY[group]) throw new Error(`t146u why ${name}`);
}
