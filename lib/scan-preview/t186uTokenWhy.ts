import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHY: Record<string, string> = {
  "nutmeg": "Nutmeg is a spice ground from the seed of the nutmeg tree, used as a flavor.",
  "oat bran": "Oat bran is the outer layer of the oat grain, used as a source of fiber.",
  "rice fiber": "Rice fiber is the indigestible fiber portion of rice, used as a filler or fiber source.",
  "wheat flour": "Wheat flour is the finely ground endosperm of wheat, used as a filler or base.",
  "organic lemon flavor with other natural flavors": "Organic lemon flavor with other natural flavors is a named fruit flavor blend that includes additional natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "organic lemonade flavor powder": "Organic lemonade flavor powder is a named flavor powder from lemonade.",
  "organic myceliated brown rice": "Organic myceliated brown rice is a fermented rice ingredient used as a filler.",
  "organic natural flavor (organic dextrose and natural flavors)": "Organic natural flavor (organic dextrose and natural flavors) is a vague flavor blend. The parenthesis names organic dextrose and natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "organic rebaudioside a": "Organic rebaudioside A is a high-purity steviol glycoside from the stevia plant.",
  "organic stevia extract": "Organic stevia extract is a sweetener concentrated from the stevia plant.",
  "organic stevia extract (reb a)": "Organic stevia extract (REB A) is a stevia extract that names rebaudioside A.",
  "organic vanilla extract": "Organic vanilla extract is a named extract from vanilla.",
  "palm kernel oil": "Palm kernel oil is an oil pressed from the kernel of the oil palm fruit, used as a coating or base. The FDA lists palm kernel oil as GRAS.",
  "paprika extract (natural color)": "Paprika extract (natural color) is a named plant color from paprika.",
  "pea protein isolate": "Pea protein isolate is a food protein concentrated from peas, used as a filler.",
  "peg-12 dimethicone": "PEG-12 dimethicone is a silicone polymer containing polyethylene glycol. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "peg-15 cocamine": "PEG-15 cocamine is a polyethylene glycol derivative used as an emulsifier. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "peg-150 stearate": "PEG-150 stearate is a polyethylene glycol ester used as an emulsifier. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "peg-40 stearate": "PEG-40 stearate is a polyethylene glycol ester used as an emulsifier. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "peg-6 caprylic/capric glycerides (coconut and palm oil based)": "PEG-6 caprylic/capric glycerides (coconut and palm oil based) is a polyethylene glycol derivative used as an emulsifier. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "pegoxol-7 stearate": "Pegoxol-7 stearate is a polyethylene glycol derivative used as an emulsifier. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "pine needle oil (pinus sylvestris)": "Pine needle oil (Pinus sylvestris) is the essential oil distilled from pine needles, used as a scent or inactive ingredient.",
  "pine oil": "Pine oil is the essential oil distilled from pine, used as a scent or inactive ingredient.",
  "pineapple juice concentrate (color)": "Pineapple juice concentrate (color) is a named fruit juice used as a plant color.",
  "pink salt": "Pink salt is a mineral salt used as a flavor or filler.",
  "polyethylene glycol (peg) 8000": "Polyethylene glycol (PEG) 8000 is a high-molecular-weight form of polyethylene glycol used as a binder. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "polyethylene glycol 300": "Polyethylene glycol 300 is a low-molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "polyethylene glycol 8000": "Polyethylene glycol 8000 is a high-molecular-weight form of polyethylene glycol used as a binder. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "polyethylene glycol monostearate 1000": "Polyethylene glycol monostearate 1000 is a polyethylene glycol ester used as an emulsifier. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "polyethylene glycol(peg) 400": "Polyethylene glycol (PEG) 400 is a specific molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "prosweet": "Prosweet is a proprietary sweetener blend used as a flavor. The exact composition is not fully disclosed. The FDA permits proprietary sweetener blends as food additives.",
  "rebaudioside a (extracted and purified from natural stevia leaf)": "Rebaudioside A (extracted and purified from natural stevia leaf) is a stevia extract that names rebaudioside A. It is more refined than whole leaf. High-purity steviol glycosides have FDA GRAS status.",
  "rebaudioside a (stevia leaf extract)": "Rebaudioside A (stevia leaf extract) is a high-purity steviol glycoside from the stevia plant.",
  "rice maltodextrin": "Rice maltodextrin is a starch-based bulk sweetener made from rice. It is a highly processed carbohydrate. The FDA lists maltodextrin as GRAS.",
  "skim milk powder": "Skim milk powder is a dairy powder from skim milk, used as a filler.",
  "sodium coceth sulfate and peg-40 glycerol cocoate (coconut fatty esters & hydrogenated castor oil)": "Sodium coceth sulfate and PEG-40 glycerol cocoate (coconut fatty esters & hydrogenated castor oil) is a surfactant blend containing polyethylene glycol. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "sodium copper chlorophyllin (color)": "Sodium copper chlorophyllin (color) is a copper color complex used as a pigment. The FDA permits sodium copper chlorophyllin as a color additive.",
  "sodium stearate": "Sodium stearate is a stearate lubricant that helps a tablet press and leave the mold.",
  "stevia extract (stevia rebaudiana leaf)": "Stevia extract (stevia rebaudiana leaf) is a sweetener concentrated from the stevia plant. It is more refined than whole leaf. High-purity steviol glycosides have FDA GRAS status.",
  "sucrose esters": "Sucrose esters are emulsifiers derived from sucrose and fatty acids. The FDA lists sucrose esters as GRAS.",
  "sunflower oil (gummy)": "Sunflower oil (gummy) is a seed oil used as the base of a gummy. When it is the base of a gummy you are chewing the oil; seed oils are graded Avoid in that form under the current rules. The FDA lists sunflower oil as GRAS.",
  "trehalose": "Trehalose is a sugar used as a sweetener or filler.",
  "triglycerides": "Triglycerides printed alone does not name the chain length. Medium-chain triglycerides are already Limited, and the unnamed rule applies. The FDA lists triglycerides as GRAS.",
  "vanilla": "Vanilla printed alone is a named flavor from vanilla. FDA 21 CFR 101.22 does not require full component disclosure for named flavors.",
  "vegetable oil (coconut and canola)": "Vegetable oil (coconut and canola) is a seed oil blend used as a base. When it is the base of a gummy, lozenge, or chew you are chewing the oil; seed oils are graded Avoid in that form under the current rules. The FDA lists canola oil as GRAS.",
  "vegetable oil (coconut, canola)": "Vegetable oil (coconut, canola) is a seed oil blend used as a base. When it is the base of a gummy, lozenge, or chew you are chewing the oil; seed oils are graded Avoid in that form under the current rules. The FDA lists canola oil as GRAS.",
  "violet carrot extract (color)": "Violet carrot extract (color) is a named plant color from violet carrots.",
  "whey powder": "Whey powder is a dairy powder from whey, used as a filler.",
  "yellow ochre": "Yellow ochre is a mineral pigment used as a color. The FDA permits iron oxides as color additives in limited amounts.",
  "yogurt powder": "Yogurt powder is a dairy powder from yogurt, used as a filler.",
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact tokens from the t186u list only. Grades and notes stay as they are. */
export function t186uWhyForName(name: string): string | undefined {
  return WHY[norm(name)];
}

export function applyT186uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t186uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT186uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT186uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (Object.keys(WHY).length !== 50) throw new Error('t186u count');
const MUST_HAVE = [
  "vanilla",
  "organic vanilla extract",
  "pine oil",
  "pine needle oil (pinus sylvestris)",
  "triglycerides",
  "organic stevia extract",
  "organic stevia extract (reb a)",
  "stevia extract (stevia rebaudiana leaf)",
  "polyethylene glycol 8000",
  "polyethylene glycol (peg) 8000",
  "polyethylene glycol 300",
  "polyethylene glycol(peg) 400",
  "polyethylene glycol monostearate 1000",
  "sodium copper chlorophyllin (color)",
  "palm kernel oil",
  "nutmeg",
  "oat bran",
  "rice fiber",
  "wheat flour",
  "vegetable oil (coconut and canola)",
  "vegetable oil (coconut, canola)",
  "sunflower oil (gummy)",
  "paprika extract (natural color)",
  "organic rebaudioside a",
  "rebaudioside a (stevia leaf extract)",
  "rebaudioside a (extracted and purified from natural stevia leaf)",
  "pea protein isolate",
  "pink salt",
  "whey powder",
  "skim milk powder",
  "rice maltodextrin",
  "violet carrot extract (color)",
  "organic lemon flavor with other natural flavors",
  "peg-12 dimethicone",
];
const MUST_MISS = [
  "vanilla flavor",
  "medium chain triglycerides",
  "medium-chain triglycerides",
  "medium chain triglyceride oil",
  "stevia extract",
  "polyethylene glycol",
  "sodium copper chlorophyllin",
  "fractionated coconut and palm kernel oil",
  "medium-chain triglycerides from palm kernel oil",
  "nutmeg powder",
  "oat",
  "oats",
  "organic rice fiber",
  "wheat",
  "vegetable oil",
  "sunflower oil",
  "sunflower seed oil",
  "paprika extract (color)",
  "paprika (color)",
  "rebaudioside a",
  "pea protein",
  "himalayan pink salt",
  "whey",
  "maltodextrin",
  "carrot",
  "organic lemon flavor",
  "peg",
  "peg-400",
];
for (const name of MUST_HAVE) {
  if (!WHY[name]) throw new Error(`t186u missing ${name}`);
}
for (const name of MUST_MISS) {
  if (WHY[name]) throw new Error(`t186u over-matched ${name}`);
}
if (t186uWhyForName('vanilla') !== WHY.vanilla) throw new Error('t186u vanilla');
if (t186uWhyForName('vanilla flavor')) throw new Error('t186u vanilla flavor');
if (t186uWhyForName('organic vanilla extract') !== WHY['organic vanilla extract']) throw new Error('t186u organic vanilla extract');
if (t186uWhyForName('pine oil') !== WHY['pine oil']) throw new Error('t186u pine oil');
if (t186uWhyForName('pine needle oil (pinus sylvestris)') !== WHY['pine needle oil (pinus sylvestris)']) throw new Error('t186u pine needle');
if (t186uWhyForName('triglycerides') !== WHY.triglycerides) throw new Error('t186u triglycerides');
if (t186uWhyForName('medium chain triglycerides')) throw new Error('t186u mct');
if (t186uWhyForName('medium-chain triglycerides')) throw new Error('t186u mct hyphen');
if (t186uWhyForName('organic stevia extract') !== WHY['organic stevia extract']) throw new Error('t186u stevia extract');
if (t186uWhyForName('organic stevia extract (reb a)') !== WHY['organic stevia extract (reb a)']) throw new Error('t186u stevia reb a');
if (t186uWhyForName('polyethylene glycol 8000') !== WHY['polyethylene glycol 8000']) throw new Error('t186u peg 8000');
if (t186uWhyForName('polyethylene glycol (peg) 8000') !== WHY['polyethylene glycol (peg) 8000']) throw new Error('t186u peg paren 8000');
if (t186uWhyForName('sodium copper chlorophyllin (color)') !== WHY['sodium copper chlorophyllin (color)']) throw new Error('t186u chlorophyllin color');
if (t186uWhyForName('sodium copper chlorophyllin')) throw new Error('t186u chlorophyllin');
if (t186uWhyForName('palm kernel oil') !== WHY['palm kernel oil']) throw new Error('t186u palm kernel');
if (t186uWhyForName('fractionated coconut and palm kernel oil')) throw new Error('t186u combined palm kernel');
