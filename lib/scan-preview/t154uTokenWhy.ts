import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';

const COCOA = 'Cocoa powder is the pure powder from cocoa beans used as a flavor or filler.';
const PHOSPHATE_DIHYDRATE = 'Dibasic calcium phosphate dihydrate is a mineral salt used as a filler so the tablet holds its shape.';
const GELLAN = 'Gellan gum is a fermented polysaccharide used as a thickener or gelling agent.';
const OAT = 'Oat fiber is a plant fiber from oats used as a filler.';
const PSYLLIUM = 'Psyllium husk is a plant fiber used as a bulk filler.';
const SHELLAC = 'Shellac is a natural resin used as a glaze on tablets.';
const TAPIOCA = 'Tapioca starch is a simple starch from cassava used as a filler.';
const ACACIA = 'Acacia is a natural gum from the acacia tree used as a thickener or binder.';
const KAOLIN = 'Kaolin is a clay used as an absorbent or filler.';
const LEUCINE = 'L-leucine is an amino acid used as a tablet filler.';
const COPOLYMER = 'This is a synthetic copolymer used as a coating or adhesive.';
const MILK = 'Milk protein concentrate is a milk protein used as a filler. It is graded Caution.';
const MOLASSES = 'Molasses is a sugar syrup byproduct used as a sweetener.';
const NAMED_FLAVOR = 'This is a named essential-oil flavor blend. It is graded Caution.';
const NONOXYNOL = 'Nonoxynol-30 is a surfactant used in cream formulas.';
const ORANGE = 'Orange juice powder is a dried fruit powder used as a flavor or color.';
const SPIRULINA = 'Organic spirulina extract is an algae color. It is graded Caution.';
const POLYISOBUTYLENE = 'Polyisobutylene is an adhesive used on a patch.';
const DISPERSION = 'This is an enteric coating polymer. It is graded Limited and counts toward a 3+ Limited stack.';
const MINT = 'This is a named mint flavor. It is graded Limited and counts toward a 3+ Limited stack.';
const CLAY = 'Montmorillonite clay is a mineral clay used as an absorbent. It is graded Limited and counts toward a 3+ Limited stack.';
const VANILLA = 'Organic natural vanilla flavor is a named vanilla flavor. It is graded Limited and counts toward a 3+ Limited stack.';
const STEVIA = 'Organic stevia leaf extract is a sweetener from the stevia plant. It is graded Limited and counts toward a 3+ Limited stack.';
const PHOSPHORIC = 'Phosphoric acid is used to set acidity. It is graded Limited and counts toward a 3+ Limited stack.';
const POLOXAMER = 'Poloxamer 407 is a surfactant. It is graded Limited and counts toward a 3+ Limited stack.';

export type T154uGroup =
  | 'cocoa powder'
  | 'phosphate dihydrate'
  | 'gellan gum'
  | 'oat fiber'
  | 'psyllium husk'
  | 'shellac'
  | 'tapioca starch'
  | 'acacia'
  | 'kaolin'
  | 'l-leucine'
  | 'acrylate copolymer'
  | 'milk protein'
  | 'molasses'
  | 'named flavor'
  | 'nonoxynol'
  | 'orange juice powder'
  | 'spirulina'
  | 'polyisobutylene'
  | 'enteric dispersion'
  | 'mint flavor'
  | 'montmorillonite'
  | 'vanilla flavor'
  | 'stevia leaf'
  | 'phosphoric acid'
  | 'poloxamer 407';

const WHY: Record<T154uGroup, string> = {
  'cocoa powder': COCOA,
  'phosphate dihydrate': PHOSPHATE_DIHYDRATE,
  'gellan gum': GELLAN,
  'oat fiber': OAT,
  'psyllium husk': PSYLLIUM,
  shellac: SHELLAC,
  'tapioca starch': TAPIOCA,
  acacia: ACACIA,
  kaolin: KAOLIN,
  'l-leucine': LEUCINE,
  'acrylate copolymer': COPOLYMER,
  'milk protein': MILK,
  molasses: MOLASSES,
  'named flavor': NAMED_FLAVOR,
  nonoxynol: NONOXYNOL,
  'orange juice powder': ORANGE,
  spirulina: SPIRULINA,
  polyisobutylene: POLYISOBUTYLENE,
  'enteric dispersion': DISPERSION,
  'mint flavor': MINT,
  montmorillonite: CLAY,
  'vanilla flavor': VANILLA,
  'stevia leaf': STEVIA,
  'phosphoric acid': PHOSPHORIC,
  'poloxamer 407': POLOXAMER,
};

export const T154U_EXPECTED_RISK: Record<T154uGroup, RiskLevel> = {
  'cocoa powder': 'cleared',
  'phosphate dihydrate': 'cleared',
  'gellan gum': 'cleared',
  'oat fiber': 'cleared',
  'psyllium husk': 'cleared',
  shellac: 'cleared',
  'tapioca starch': 'cleared',
  acacia: 'cleared',
  kaolin: 'cleared',
  'l-leucine': 'cleared',
  'acrylate copolymer': 'moderate',
  'milk protein': 'moderate',
  molasses: 'moderate',
  'named flavor': 'moderate',
  nonoxynol: 'moderate',
  'orange juice powder': 'moderate',
  spirulina: 'moderate',
  polyisobutylene: 'moderate',
  'enteric dispersion': 'limited',
  'mint flavor': 'limited',
  montmorillonite: 'limited',
  'vanilla flavor': 'limited',
  'stevia leaf': 'limited',
  'phosphoric acid': 'limited',
  'poloxamer 407': 'limited',
};

const EXACT: Record<string, T154uGroup> = {
  'cocoa powder': 'cocoa powder',
  'dibasic calcium phosphate dihydrate': 'phosphate dihydrate',
  'gellan gum': 'gellan gum',
  'oat fiber': 'oat fiber',
  'organic oat fiber': 'oat fiber',
  'psyllium husk': 'psyllium husk',
  shellac: 'shellac',
  'tapioca starch': 'tapioca starch',
  acacia: 'acacia',
  kaolin: 'kaolin',
  'l-leucine': 'l-leucine',
  'methyl acrylate/2-ethylhexyl acrylate copolymer': 'acrylate copolymer',
  'milk protein concentrate': 'milk protein',
  'nonfat dry milk powder': 'milk protein',
  molasses: 'molasses',
  'natural flavors (menthol\u00b9, vanilla\u00b9, peppermint\u00b9, and spearmint\u00b9 essential oils, and citral)': 'named flavor',
  'nonoxynol-30': 'nonoxynol',
  'orange juice powder': 'orange juice powder',
  'organic spirulina extract (color)': 'spirulina',
  polyisobutylene: 'polyisobutylene',
  'methacrylic acid and ethyl acrylate copolymer dispersion': 'enteric dispersion',
  'mint flavor': 'mint flavor',
  'peppermint flavor': 'mint flavor',
  'montmorillonite clay': 'montmorillonite',
  'organic natural vanilla flavor': 'vanilla flavor',
  'organic stevia (leaf) extract': 'stevia leaf',
  'phosphoric acid': 'phosphoric acid',
  'poloxamer 407': 'poloxamer 407',
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t154uGroup(name: string, riskLevel?: RiskLevel): T154uGroup | undefined {
  const group = EXACT[norm(name)];
  if (!group || riskLevel !== T154U_EXPECTED_RISK[group]) return undefined;
  return group;
}

export function t154uWhyForName(name: string, riskLevel?: RiskLevel): string | undefined {
  const group = t154uGroup(name, riskLevel);
  return group ? WHY[group] : undefined;
}

export function applyT154uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t154uWhyForName(ingredient.name, ingredient.riskLevel);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT154uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT154uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, RiskLevel | undefined, T154uGroup | undefined]> = [
  ['Cocoa Powder', 'cleared', 'cocoa powder'],
  ['Organic cocoa powder', 'cleared', undefined],
  ['Cocoa powder (processed with alkali)', 'cleared', undefined],
  ['dibasic calcium phosphate dihydrate', 'cleared', 'phosphate dihydrate'],
  ['Gellan gum', 'cleared', 'gellan gum'],
  ['Vegetable capsule (hypromellose, gellan gum)', 'cleared', undefined],
  ['Oat fiber', 'cleared', 'oat fiber'],
  ['Organic oat fiber', 'cleared', 'oat fiber'],
  ['Organic oat fiber', 'limited', undefined],
  ['non-GMO oat fiber', 'cleared', undefined],
  ['Psyllium husk', 'cleared', 'psyllium husk'],
  ['Organic psyllium husk', 'cleared', undefined],
  ['shellac', 'cleared', 'shellac'],
  ['shellac glaze', 'cleared', undefined],
  ['Tapioca starch', 'cleared', 'tapioca starch'],
  ['Modified tapioca starch', 'limited', undefined],
  ['acacia', 'cleared', 'acacia'],
  ['acacia', 'limited', undefined],
  ['Acacia gum', 'cleared', undefined],
  ['Kaolin', 'cleared', 'kaolin'],
  ['calcined kaolin', 'moderate', undefined],
  ['L-leucine', 'cleared', 'l-leucine'],
  ['Leucine', 'cleared', undefined],
  ['Methyl acrylate/2-ethylhexyl acrylate copolymer', 'moderate', 'acrylate copolymer'],
  ['Methyl acrylate/2-ethylhexyl acrylate copolymer', 'cleared', undefined],
  ['Milk Protein Concentrate', 'moderate', 'milk protein'],
  ['Nonfat Dry Milk Powder', 'moderate', 'milk protein'],
  ['Nonfat Dry Milk', 'cleared', undefined],
  ['Molasses', 'moderate', 'molasses'],
  ['Molasses', 'cleared', undefined],
  ['natural flavors (menthol\u00b9, vanilla\u00b9, peppermint\u00b9, and spearmint\u00b9 essential oils, and citral)', 'moderate', 'named flavor'],
  ['Nonoxynol-30', 'moderate', 'nonoxynol'],
  ['Orange Juice Powder', 'moderate', 'orange juice powder'],
  ['Organic Spirulina Extract (color)', 'moderate', 'spirulina'],
  ['Spirulina Extract (color)', 'moderate', undefined],
  ['Polyisobutylene', 'moderate', 'polyisobutylene'],
  ['Polyisobutylene', 'cleared', undefined],
  ['Mint flavor', 'limited', 'mint flavor'],
  ['peppermint flavor', 'limited', 'mint flavor'],
  ['Peppermint flavor', 'moderate', undefined],
  ['Natural peppermint flavor', 'limited', undefined],
  ['organic stevia (leaf) extract', 'limited', 'stevia leaf'],
  ['stevia (leaf) extract', 'limited', undefined],
  ['Phosphoric acid', 'limited', 'phosphoric acid'],
  ['Phosphoric acid', 'cleared', undefined],
  ['Poloxamer 407', 'limited', 'poloxamer 407'],
  ['Coconut oil', 'cleared', undefined],
  ['Sustainable Palm Oil', 'cleared', undefined],
];

for (const [name, risk, group] of MUST) {
  const found = t154uGroup(name, risk);
  if (found !== group) throw new Error(`t154u ${name} ${risk ?? '-'} -> ${found ?? 'none'}`);
  if (group && t154uWhyForName(name, risk) !== WHY[group]) throw new Error(`t154u why ${name}`);
}
