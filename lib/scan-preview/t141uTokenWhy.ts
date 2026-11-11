import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const SODIUM_HYDROXIDE = 'Sodium hydroxide is a pH adjuster used in a trace amount.';
const POLYVINYL = 'Polyvinyl alcohol is a film used to coat a tablet.';
const RICE_PROTEIN = 'Rice protein is a food protein from rice. It is not an unnamed rice extract.';
const CANE_SUGAR = 'Cane sugar is table sugar from sugar cane used as a sweetener.';
const GLUCOSE_SYRUP = 'Glucose syrup is a liquid sweetener made from starch.';
const OLIVE = 'Extra virgin olive oil is a pressed oil from olives used as a carrier or fill.';
const GRAPE = '27% grape alcohol solution is the liquid that carries a Bach flower remedy. It is graded Caution.';
const BRAZZEIN = 'Brazzein is a sweet protein from the oubli fruit. It is graded Caution.';
const SELENIUM = 'L-Selenomethionine is a selenium form. On this panel it is an inactive.';
const QUERCETIN = 'Quercetin dihydrate is a plant flavonoid. On this panel it is an inactive.';
const STEVIOL = 'Steviol glycoside is a sweetener from stevia. It is graded Caution when not the high-purity form.';
const CANE_SYRUP = 'Organic cane syrup is a sweetener from cane sugar. It is graded Caution.';
const HUITO = 'Huito extract is a plant color. It is graded Caution.';
const CAMPHOR = 'Camphor is a plant compound used as a topical inactive.';
const CARAMEL = 'Caramel printed alone is graded Caution. It is not caramel color and it is not caramel sugar syrup.';
const HFCS = 'High fructose corn syrup is a sweetener made from corn. It is graded Limited and counts toward a 3+ Limited stack.';
const GUM_BASE = 'Gum base is an unnamed mix of gum, resin, and wax. It is graded Limited and counts toward a 3+ Limited stack.';
const RICE_WAX = 'Rice bran wax is a wax from rice bran. It is graded Limited and counts toward a 3+ Limited stack.';
const ALOE = 'Aloe vera gel is a plant juice or gel. It is graded Limited and counts toward a 3+ Limited stack.';
const TRACE = 'Trace Mineral Complex is an unnamed mineral blend. It is graded Limited and counts toward a 3+ Limited stack.';
const FRUCTOSE = 'Fructose is a simple sugar used as a sweetener. It is graded Limited and counts toward a 3+ Limited stack.';
const ALGINATE = 'Sodium alginate is a seaweed gum used as a thickener. It is graded Limited and counts toward a 3+ Limited stack.';
const BENZOIC = 'Benzoic acid is a preservative. On its own the risk is low, but it can form a trace of benzene when combined with vitamin C. It is graded Limited and counts toward a 3+ Limited stack.';
const ORGANIC_FLAVORS = 'Organic flavors is an unnamed organic flavor blend. It is graded Limited and counts toward a 3+ Limited stack.';
const PROPYL_GALLATE = 'Propyl gallate is a preservative. A 2018 study found it can disrupt hormones.';
const MIT = 'Methylisothiazolinone is a preservative used in leave-on creams.';
const BUTYL = 'Butylparaben is a paraben preservative. The European Union has restricted some parabens because they can disrupt hormones.';
const HYDROGENATED = 'The panel says hydrogenated. It does not say partial or fully. Partial is the form that contains trans fat, so the grade goes to Not Clean.';
const VEGETABLE = 'Vegetable oil is Not Clean when it is the base of a gummy, lozenge, or chew. You are chewing the oil.';

export type T141uGroup =
  | 'sodium hydroxide'
  | 'polyvinyl alcohol'
  | 'rice protein'
  | 'cane sugar'
  | 'glucose syrup'
  | 'extra virgin olive oil'
  | 'grape alcohol'
  | 'brazzein'
  | 'selenomethionine'
  | 'quercetin'
  | 'steviol glycoside'
  | 'organic cane syrup'
  | 'huito'
  | 'camphor'
  | 'caramel'
  | 'high fructose corn syrup'
  | 'gum base'
  | 'rice bran wax'
  | 'aloe'
  | 'trace mineral'
  | 'fructose'
  | 'sodium alginate'
  | 'benzoic acid'
  | 'organic flavors'
  | 'propyl gallate'
  | 'methylisothiazolinone'
  | 'butylparaben'
  | 'hydrogenated'
  | 'vegetable oil';

const WHY: Record<T141uGroup, string> = {
  'sodium hydroxide': SODIUM_HYDROXIDE,
  'polyvinyl alcohol': POLYVINYL,
  'rice protein': RICE_PROTEIN,
  'cane sugar': CANE_SUGAR,
  'glucose syrup': GLUCOSE_SYRUP,
  'extra virgin olive oil': OLIVE,
  'grape alcohol': GRAPE,
  brazzein: BRAZZEIN,
  selenomethionine: SELENIUM,
  quercetin: QUERCETIN,
  'steviol glycoside': STEVIOL,
  'organic cane syrup': CANE_SYRUP,
  huito: HUITO,
  camphor: CAMPHOR,
  caramel: CARAMEL,
  'high fructose corn syrup': HFCS,
  'gum base': GUM_BASE,
  'rice bran wax': RICE_WAX,
  aloe: ALOE,
  'trace mineral': TRACE,
  fructose: FRUCTOSE,
  'sodium alginate': ALGINATE,
  'benzoic acid': BENZOIC,
  'organic flavors': ORGANIC_FLAVORS,
  'propyl gallate': PROPYL_GALLATE,
  methylisothiazolinone: MIT,
  butylparaben: BUTYL,
  hydrogenated: HYDROGENATED,
  'vegetable oil': VEGETABLE,
};

export const T141U_EXPECTED_RISK: Record<T141uGroup, 'cleared' | 'moderate' | 'limited' | 'high'> = {
  'sodium hydroxide': 'cleared',
  'polyvinyl alcohol': 'cleared',
  'rice protein': 'cleared',
  'cane sugar': 'cleared',
  'glucose syrup': 'cleared',
  'extra virgin olive oil': 'cleared',
  'grape alcohol': 'moderate',
  brazzein: 'moderate',
  selenomethionine: 'moderate',
  quercetin: 'moderate',
  'steviol glycoside': 'moderate',
  'organic cane syrup': 'moderate',
  huito: 'moderate',
  camphor: 'moderate',
  caramel: 'moderate',
  'high fructose corn syrup': 'limited',
  'gum base': 'limited',
  'rice bran wax': 'limited',
  aloe: 'limited',
  'trace mineral': 'limited',
  fructose: 'limited',
  'sodium alginate': 'limited',
  'benzoic acid': 'limited',
  'organic flavors': 'limited',
  'propyl gallate': 'high',
  methylisothiazolinone: 'high',
  butylparaben: 'high',
  hydrogenated: 'high',
  'vegetable oil': 'high',
};

const LISTED = new Set([
  'sodium hydroxide', 'polyvinyl alcohol', 'rice protein', 'organic cane sugar', 'cane sugar',
  'glucose syrup', 'extra virgin olive oil', '27% grape alcohol solution',
  'brazzein (oubli fruit sweet protein)', 'l selenomethionine',
  'quercetin dihydrate (from sophora japonica extract)', 'steviol glycoside', 'organic cane syrup',
  'huito extract', 'camphor', 'caramel', 'high fructose corn syrup', 'gum base', 'rice bran wax',
  'aloe vera gel', 'trace mineral complex', 'fructose', 'sodium alginate', 'benzoic acid',
  'organic flavors', 'propyl gallate', 'methylisothiazolinone', 'butylparaben',
  'hydrogenated coconut oil', 'hydrogenated vegetable oil', 'hydrogenated peanut oil',
  'hydrogenated soybean oil', 'fully hydrogenated palm oil', 'hydrogenated cottonseed oil',
  'vegetable oil',
]);

const VEGETABLE_KEYS = new Set([
  'vegetable oil',
  'vegetable oil (coconut, canola)',
  'vegetable oil (palm and coconut)',
  'blend of oils (coconut and/or palm)',
  'vegetable oil (coconut and canola)',
  'vegetable oil (coconut)',
  'vegetable oil (coconut origin)',
]);

const HYDROGENATED_KEYS = new Set([
  'hydrogenated coconut oil',
  'hydrogenated vegetable oil',
  'hydrogenated peanut oil',
  'hydrogenated soybean oil',
  'hydrogenated soy oil',
  'hydrogenated vegetable oil (soy)',
  'hydrogenated cottonseed oil',
  'hydrogenated vegetable oil (cottonseed)',
  'fully hydrogenated palm oil',
]);

function norm(name: string): string {
  let text = name.trim().toLowerCase().replace(/[®™]/g, '');
  text = text.replace(/[‐‑–—-]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();
  text = text.replace(/[.,;:!?*%]+$/g, '').trim();
  return text;
}

export function t141uOilBase(form: string | undefined): 'gummy' | 'lozenge' | 'chew' | 'other' {
  const text = (form ?? '').toLowerCase();
  if (/\b(gummy|gummies)\b/.test(text)) return 'gummy';
  if (/\blozenge\b/.test(text)) return 'lozenge';
  if (/\bchews?\b/.test(text) && !/chewable/.test(text)) return 'chew';
  return 'other';
}

export function t141uGroup(name: string, form?: string): T141uGroup | undefined {
  const key = norm(name);
  if (HYDROGENATED_KEYS.has(key)) return 'hydrogenated';
  if (/hydrogenat|carnauba/.test(key)) {
    // Hydrogenated vegetable oil and wax blends are not the plain vegetable-oil base.
  } else if (VEGETABLE_KEYS.has(key)) {
    const base = t141uOilBase(form);
    if (base === 'gummy' || base === 'lozenge' || base === 'chew') return 'vegetable oil';
    return undefined;
  }
  if (key === 'high fructose corn syrup') return 'high fructose corn syrup';
  if (key === 'organic cane syrup') return 'organic cane syrup';
  if (key === 'fructose') return 'fructose';
  if (
    key === 'cane sugar'
    || key === 'organic cane sugar'
    || key === 'cane sugar (organic)'
    || key === 'raw cane sugar'
    || key === 'organic raw cane sugar'
    || key === 'non gmo cane sugar'
  ) {
    return 'cane sugar';
  }
  if (key === 'glucose syrup' || key === 'glucose syrup (corn)' || key === 'organic glucose syrup' || key === 'non gmo glucose syrup') {
    return 'glucose syrup';
  }
  if (key === 'caramel') return 'caramel';
  if (key.startsWith('extra virgin olive oil') || key.startsWith('organic extra virgin olive oil')) return 'extra virgin olive oil';
  if (key === 'sodium hydroxide') return 'sodium hydroxide';
  if (key === 'polyvinyl alcohol') return 'polyvinyl alcohol';
  if (key === 'rice protein') return 'rice protein';
  if (key === '27% grape alcohol solution') return 'grape alcohol';
  if (key === 'brazzein' || key === 'brazzein (oubli fruit sweet protein)') return 'brazzein';
  if (key === 'l selenomethionine') return 'selenomethionine';
  if (/quercetin dihydrate/.test(key) && !/phytosome|bromelain|blend/.test(key)) return 'quercetin';
  if (/^steviol glycosides?( from stevia)?$/.test(key) || key === 'organic steviol glycosides') return 'steviol glycoside';
  if (key === 'huito extract' || key === 'huito juice' || key === 'huito juice (color)') return 'huito';
  if (key === 'camphor' || key === 'dl camphor' || key === 'natural camphor usp (for scent)' || key.startsWith('camphor (')) {
    return 'camphor';
  }
  if (key === 'gum base') return 'gum base';
  if (key === 'rice bran wax') return 'rice bran wax';
  if (key === 'aloe vera gel' || key === 'aloe vera gel (powder)' || key === 'aloe vera gel (200x dry concentrate)') return 'aloe';
  if (key === 'trace mineral complex' || key === 'concentrace mineral complex') return 'trace mineral';
  if (key === 'sodium alginate') return 'sodium alginate';
  if (key === 'benzoic acid') return 'benzoic acid';
  if (key === 'organic flavors' || key === 'organic flavor') return 'organic flavors';
  if (key === 'propyl gallate') return 'propyl gallate';
  if (key === 'methylisothiazolinone') return 'methylisothiazolinone';
  if (key === 'butylparaben') return 'butylparaben';
  return undefined;
}

export function t141uWhyForName(name: string, form?: string): string | undefined {
  const group = t141uGroup(name, form);
  return group ? WHY[group] : undefined;
}

export function t141uIsListedSpelling(name: string): boolean {
  return LISTED.has(norm(name));
}

export function applyT141uIngredients(
  ingredients: readonly IngredientFlag[],
  record: Pick<RatingRecord, 'form'>,
): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t141uWhyForName(ingredient.name, record.form);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

/** Stored why only. Grades, notes, and conditional skips stay as they are. */
export function applyT141uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT141uIngredients(record.inactiveIngredients, record);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

const MUST: Array<[string, string | undefined, T141uGroup | undefined]> = [
  ['Sodium hydroxide', undefined, 'sodium hydroxide'],
  ['Hydrochloric acid and/or sodium hydroxide', undefined, undefined],
  ['Polyvinyl alcohol', undefined, 'polyvinyl alcohol'],
  ['Alcohol', undefined, undefined],
  ['Rice protein', undefined, 'rice protein'],
  ['Cane sugar', undefined, 'cane sugar'],
  ['Organic cane sugar', undefined, 'cane sugar'],
  ['Organic cane syrup', undefined, 'organic cane syrup'],
  ['Sucrose', undefined, undefined],
  ['Glucose syrup', undefined, 'glucose syrup'],
  ['High fructose corn syrup', undefined, 'high fructose corn syrup'],
  ['Fructose', undefined, 'fructose'],
  ['Extra Virgin Olive Oil', undefined, 'extra virgin olive oil'],
  ['Olive oil', undefined, undefined],
  ['Virgin Olive Oil', undefined, undefined],
  ['27% grape alcohol solution', undefined, 'grape alcohol'],
  ['Grape Alcohol', undefined, undefined],
  ['Brazzein (Oubli Fruit Sweet Protein)', undefined, 'brazzein'],
  ['L-Selenomethionine', undefined, 'selenomethionine'],
  ['Quercetin Dihydrate (from Sophora japonica Extract)', undefined, 'quercetin'],
  ['Quercetin', undefined, undefined],
  ['Steviol Glycoside', undefined, 'steviol glycoside'],
  ['Stevia Leaf Extract (Steviol Glycosides)', undefined, undefined],
  ['Huito extract', undefined, 'huito'],
  ['Camphor', undefined, 'camphor'],
  ['Caramel', undefined, 'caramel'],
  ['Caramel color', undefined, undefined],
  ['Caramel sugar syrup (color)', undefined, undefined],
  ['Vegetable oil', 'gummy', 'vegetable oil'],
  ['Vegetable oil', 'tablet', undefined],
  ['Hydrogenated Vegetable Oil', 'gummy', 'hydrogenated'],
  ['fully hydrogenated palm oil', undefined, 'hydrogenated'],
  ['Butylparaben', undefined, 'butylparaben'],
  ['Methylparaben', undefined, undefined],
];

for (const [name, form, group] of MUST) {
  const found = t141uGroup(name, form);
  if (found !== group) throw new Error(`t141u ${name} @ ${form ?? '-'} -> ${found ?? 'none'}`);
  if (group && t141uWhyForName(name, form) !== WHY[group]) throw new Error(`t141u why ${name}`);
}
