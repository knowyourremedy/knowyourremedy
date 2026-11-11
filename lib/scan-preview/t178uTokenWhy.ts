import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHY: Record<string, string> = {
  "modified cellulose gum": "Modified cellulose gum is a chemically processed form of cellulose used as a thickener or binder. It differs from unmodified cellulose fiber; the FDA lists carboxymethyl cellulose as GRAS but the modified form is more processed.",
  "mannitol": "Mannitol is a sugar alcohol used as a sweetener or bulking agent. Large amounts commonly cause bloating or loose stools; the FDA notes the laxative effect of sugar alcohols at higher intakes.",
  "hydroxypropyl cellulose": "Hydroxypropyl cellulose is a chemically modified cellulose derivative used as a binder or coating. It is more processed than simple cellulose; the FDA permits it as an indirect food additive.",
  "flavor": "Flavor is an unnamed blend of flavor compounds. The label does not disclose the solvents or carriers inside the mixture.",
  "calcium silicate": "Calcium silicate is a mineral powder used as an anti-caking agent. It is a processed silicate form; the FDA lists it as GRAS for anti-caking use.",
  "alcohol": "Alcohol is a solvent used to carry other ingredients in liquid products. It is a processed form of ethanol.",
  "flavors": "Flavors is an unnamed blend of flavor compounds. The label does not disclose the solvents or carriers inside the mixture.",
  "xylitol": "Xylitol is a sugar alcohol used as a sweetener. Large amounts commonly cause bloating or loose stools; the FDA notes the laxative effect of sugar alcohols at higher intakes.",
  "natural and artificial flavors": "Natural and artificial flavors is a mixture of flavor compounds that may include both plant-derived and synthetic parts. The label does not list every component.",
  "medium chain triglycerides": "Medium chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils.",
  "polydextrose": "Polydextrose is a synthetic polymer of glucose used as a bulk sweetener and fiber. It is highly processed from starch; the FDA lists it as GRAS.",
  "stevia leaf extract": "Stevia leaf extract is a sweetener concentrated from the stevia plant. It is more refined than whole stevia leaf; the high-purity rebaudioside A form is treated differently under FDA GRAS notices.",
  "pharmaceutical ink": "Pharmaceutical ink is printing ink applied to tablets or capsules. The label rarely lists every pigment or solvent in the ink.",
  "fructose": "Fructose is a simple sugar used as a sweetener. Excess free fructose is associated with metabolic effects; multiple reviews including those from the American Heart Association note this.",
  "dextrin": "Dextrin is a starch breakdown product used as a filler or binder. It is a processed form of starch.",
  "carob": "Carob is a food ingredient from the carob pod used as a flavor or filler. It is a processed plant material.",
  "benzalkonium chloride": "Benzalkonium chloride is a quaternary ammonium preservative used in eye and nasal products. It is a synthetic antimicrobial permitted by the FDA in limited concentrations.",
  "menthol": "Menthol is a cooling compound derived from mint or synthesized. On an inactive list it is not the primary drug.",
  "bamboo extract": "Bamboo extract is a plant-derived silica source used as a flow agent. It is a concentrated extract rather than whole bamboo.",
  "natural flavors": "Natural flavors is an unnamed blend of flavor compounds derived from natural sources. The label does not list the carriers or solvents.",
  "maltitol": "Maltitol is a sugar alcohol used as a sweetener. Large amounts commonly cause bloating or loose stools; the FDA notes the laxative effect of sugar alcohols at higher intakes.",
  "corn syrup": "Corn syrup is a sweetener made by processing corn starch. It is a refined carbohydrate.",
  "fragrance": "Fragrance is an unnamed scent blend. The label does not list the solvents or carriers inside the mixture.",
  "stevia": "Stevia is a sweetener from the stevia plant. The bare form is more refined than whole leaf; the high-purity rebaudioside A form is treated differently under FDA GRAS notices.",
  "isomalt": "Isomalt is a sugar alcohol used as a sweetener. Large amounts commonly cause bloating or loose stools; the FDA notes the laxative effect of sugar alcohols at higher intakes.",
  "iron oxide red": "Iron oxide red is a mineral pigment used as a color. It is not a synthetic FD&C dye; the FDA permits iron oxides as color additives in limited amounts.",
  "simethicone": "Simethicone is a silicone-based anti-gas agent. On an other-ingredients line it is not the labeled active drug.",
  "sorbitol sorbitan solution": "Sorbitol sorbitan solution is an emulsifier blend. It is a processed form of sugar alcohols used to stabilize mixtures.",
  "alcohol denat.": "Alcohol denat. is denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking.",
  "ammonium hydroxide": "Ammonium hydroxide is a pH adjuster used in trace amounts. It is a processed alkaline compound permitted by the FDA as a food additive.",
  "beta carotene (for color)": "Beta carotene here is used as a color, not as a vitamin dose. It is a purified pigment.",
  "isopropyl alcohol": "Isopropyl alcohol is a solvent used in some formulations. It is a synthetic alcohol.",
  "rice bran wax": "Rice bran wax is a wax extracted from rice bran and used as a coating or flow agent. It is a processed plant wax.",
  "gum base": "Gum base is an unnamed mixture of gums, resins, and waxes used in chewing products. The exact composition is rarely fully disclosed.",
  "iron oxide black": "Iron oxide black is a mineral pigment used as a color. It is not a synthetic FD&C dye; the FDA permits iron oxides as color additives in limited amounts.",
  "sodium polyacrylate": "Sodium polyacrylate is a synthetic gel-forming polymer used as a thickener. It is a highly processed acrylate.",
  "phenoxyethanol": "Phenoxyethanol is a synthetic preservative used in topical products. It is a glycol ether permitted by the FDA in limited concentrations in cosmetics.",
  "sorbitan": "Sorbitan is an emulsifier derived from sorbitol. It is a processed surfactant, not the sugar alcohol itself.",
  "acrylates/c10-30 alkyl acrylate crosspolymer": "Acrylates/c10-30 alkyl acrylate crosspolymer is a synthetic polymer used as a thickener in creams. It is a highly processed acrylate.",
  "blue spirulina (for color)": "Blue spirulina is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina.",
  "triethanolamine": "Triethanolamine is a synthetic pH adjuster used in creams. It is an amine compound.",
  "eucalyptus oil": "Eucalyptus oil is the essential oil distilled from eucalyptus leaves, used as a scent or inactive ingredient. It is a concentrated plant oil.",
  "aloe vera gel": "Aloe vera gel is the juice or gel from the aloe plant. It is a processed plant material.",
  "sugar alcohol": "Sugar alcohol is a class name for sweeteners such as xylitol or sorbitol. Large amounts commonly cause bloating or loose stools; the FDA notes the laxative effect of sugar alcohols at higher intakes.",
  "steareth-21": "Steareth-21 is an ethoxylated fatty alcohol used as an emulsifier in cream bases. Ethoxylation can leave residual 1,4-dioxane, an impurity noted by the FDA.",
  "iron oxide yellow": "Iron oxide yellow is a mineral pigment used as a color. It is not a synthetic FD&C dye; the FDA permits iron oxides as color additives in limited amounts.",
  "modified corn starch": "Modified corn starch is chemically processed corn starch used as a thickener or filler. It differs from plain corn starch.",
  "organic maltodextrin": "Organic maltodextrin is a starch-based bulk sweetener made from organic starch. It is still a highly processed carbohydrate.",
  "polyacrylic acid": "Polyacrylic acid is a synthetic polymer used as a thickener or gel former. It is a processed acrylate.",
  "modified food starch": "Modified food starch is chemically processed starch used as a thickener or filler. It differs from plain starch.",
  "medium-chain triglycerides": "Medium-chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils.",
  "ethylhexylglycerin": "Ethylhexylglycerin is a synthetic preservative booster and skin-conditioning agent. It is a glycol ether.",
  "red iron oxide": "Red iron oxide is a mineral pigment used as a color. It is not a synthetic FD&C dye; the FDA permits iron oxides as color additives in limited amounts.",
  "steviol glycosides": "Steviol glycosides are the purified sweet compounds from the stevia plant. They are more refined than whole stevia leaf; the high-purity forms have FDA GRAS status.",
  "yellow iron oxide": "Yellow iron oxide is a mineral pigment used as a color. It is not a synthetic FD&C dye; the FDA permits iron oxides as color additives in limited amounts.",
  "glucose": "Glucose is a simple sugar used as a sweetener or filler. It is a basic carbohydrate.",
  "phosphoric acid": "Phosphoric acid is an acid used to set acidity in formulations. It is a processed mineral acid permitted by the FDA as a food additive.",
  "carmine": "Carmine is a red color made from cochineal insects. It can cause allergic reactions in some people; the FDA requires labeling for carmine in foods.",
  "enteric coating": "Enteric coating is a delayed-release polymer coating applied to tablets so they dissolve later in the gut. It is a processed coating.",
  "methacrylic acid copolymer": "Methacrylic acid copolymer is a synthetic polymer used as an enteric coating. It is a processed acrylate.",
  "sorbitan monooleate": "Sorbitan monooleate is an emulsifier derived from sorbitol and oleic acid. It is a processed surfactant.",
  "aminomethyl propanol": "Aminomethyl propanol is a synthetic pH adjuster used in cream or coating formulas. It is an amine compound.",
  "dicetyl phosphate": "Dicetyl phosphate is a synthetic phosphate used in cream or coating formulas as an emulsifier or stabilizer. It is a processed phosphate ester.",
  "lemon oil": "Lemon oil is the essential oil pressed from lemon peel, used for scent or flavor. It is a concentrated plant oil.",
  "organic pea starch": "Organic pea starch is a starch filler from organic peas. It is not pea protein and is a refined carbohydrate.",
  "stevia extract": "Stevia extract is a concentrated sweetener from the stevia plant. It is more refined than whole leaf; the high-purity rebaudioside A form has FDA GRAS status.",
  "camphor": "Camphor is a plant-derived compound used as a topical inactive for scent or cooling. It is a concentrated plant extract.",
  "corn syrup solids": "Corn syrup solids are the dried form of corn syrup used as a sweetener. It is a refined carbohydrate.",
  "ferric oxide yellow": "Ferric oxide yellow is a mineral pigment used as a color. It is not a synthetic FD&C dye; the FDA permits iron oxides as color additives in limited amounts.",
  "organic tapioca maltodextrin": "Organic tapioca maltodextrin is a starch-based bulk sweetener made from organic tapioca. It is still a highly processed carbohydrate.",
  "sugar spheres": "Sugar spheres are small sugar cores used as a base in some tablets. They are a refined sugar form.",
  "ceteth-20 phosphate": "Ceteth-20 phosphate is an ethoxylated fatty alcohol phosphate used as an emulsifier in cream bases. Ethoxylation can leave residual 1,4-dioxane, an impurity noted by the FDA.",
  "sd alcohol 40-b": "SD alcohol 40-B is a denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking.",
  "steareth-2": "Steareth-2 is an ethoxylated fatty alcohol used as an emulsifier in cream bases. Ethoxylation can leave residual 1,4-dioxane, an impurity noted by the FDA.",
  "c30-45 alkyl cetearyl dimethicone crosspolymer": "C30-45 alkyl cetearyl dimethicone crosspolymer is a synthetic silicone polymer used in cream or coating formulas. It is a processed dimethicone derivative.",
  "caprylyl methicone": "Caprylyl methicone is a synthetic silicone used in cream or coating formulas as a conditioning agent. It is a processed silicone.",
  "high fructose corn syrup": "High fructose corn syrup is a sweetener made from corn starch. It is a refined carbohydrate associated with metabolic effects; the American Heart Association has noted concerns with excess free fructose.",
  "stevia (leaf extract)": "Stevia (leaf extract) is a sweetener concentrated from the stevia plant. It is more refined than whole leaf; the high-purity rebaudioside A form has FDA GRAS status.",
  "sunflower seed oil": "Sunflower seed oil is a seed oil used in some bases. Seed oils are refined and graded Limited under the current rules.",
  "trolamine": "Trolamine is a synthetic pH adjuster. It is an amine compound, also known as triethanolamine.",
  "dextrates": "Dextrates are a starch sugar used as a filler. They are a processed carbohydrate form.",
  "paraffin": "Paraffin is a mineral-oil-derived wax used as a coating or base. It is a refined petroleum product.",
  "polyoxyl 20 cetostearyl ether": "Polyoxyl 20 cetostearyl ether is an ethoxylated surfactant used as an emulsifier. Ethoxylation can leave residual 1,4-dioxane, an impurity noted by the FDA.",
  "artificial flavor": "Artificial flavor is a synthetic flavor blend. It is not a named fruit flavor.",
  "beta-carotene (for color)": "Beta-carotene here is used as a color, not as a vitamin dose. It is a purified pigment.",
  "caprylyl glycol": "Caprylyl glycol is a synthetic skin-conditioning agent and preservative booster. It is a glycol.",
  "clove oil": "Clove oil is the essential oil distilled from clove buds, used as a scent or inactive ingredient. It is a concentrated plant oil.",
  "edible ink": "Edible ink is printing ink applied to tablets or capsules. The label rarely lists every pigment or solvent in the ink.",
  "hydroxyacetophenone": "Hydroxyacetophenone is a synthetic antioxidant used in creams. It is a processed phenolic compound.",
  "maltodextrin": "Maltodextrin is a starch-based bulk sweetener. It is a highly processed carbohydrate.",
  "sorbitol sorbitan": "Sorbitol sorbitan is an emulsifier blend derived from sugar alcohols. It is a processed surfactant.",
  "trisodium citrate": "Trisodium citrate is a citrate salt used to set acidity. It is the sodium salt of citric acid.",
  "black iron oxide": "Black iron oxide is a mineral pigment used as a color. It is not a synthetic FD&C dye; the FDA permits iron oxides as color additives in limited amounts.",
  "boric acid": "Boric acid here is used in eye-drop formulations as a buffering agent. It is not the swallowed dose form.",
  "caprylic/capric triglyceride": "Caprylic/capric triglyceride is a medium-chain triglyceride used as a softgel fill or carrier. It is a processed fraction of fats.",
  "ferric oxide red": "Ferric oxide red is a mineral pigment used as a color. It is not a synthetic FD&C dye; the FDA permits iron oxides as color additives in limited amounts.",
  "orange juice concentrate": "Orange juice concentrate is a named fruit juice used as a plant color or flavor. It is not a synthetic dye.",
  "spirulina extract (color)": "Spirulina extract is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina.",
  "steviol glycoside": "Steviol glycoside is a refined form of stevia. It is more processed than whole leaf; high-purity forms have FDA GRAS status.",
  "calcium polycarbophil": "Calcium polycarbophil is a synthetic fiber used as an inactive bulk. It is a processed polycarbophil salt.",
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact tokens from the t178u list only. Grades and notes stay as they are. */
export function t178uWhyForName(name: string): string | undefined {
  return WHY[norm(name)];
}

export function applyT178uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t178uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT178uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT178uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (Object.keys(WHY).length !== 100) throw new Error('t178u count');
const MUST_HAVE = [
  "modified cellulose gum",
  "mannitol",
  "alcohol",
  "alcohol denat.",
  "flavor",
  "flavors",
  "natural flavors",
  "stevia",
  "stevia extract",
  "stevia leaf extract",
  "sd alcohol 40-b",
];
const MUST_MISS = [
  "modified cellulose",
  "hydrated silica",
  "colloidal silica",
  "silicon dioxide (silica)",
  "benzyl alcohol",
  "natural lemon flavor",
  "natural lemon flavor with other natural flavors",
  "stevia leaf",
  "organic stevia leaf extract",
  "annatto extract",
  "iron oxide",
];
for (const name of MUST_HAVE) {
  if (!WHY[name]) throw new Error(`t178u missing ${name}`);
}
for (const name of MUST_MISS) {
  if (WHY[name]) throw new Error(`t178u over-matched ${name}`);
}
if (WHY.flavor && WHY.flavors && WHY.flavor === WHY.flavors) throw new Error('t178u flavor alias');
if (WHY.alcohol && WHY['alcohol denat.'] && WHY.alcohol === WHY['alcohol denat.']) throw new Error('t178u alcohol alias');
if (WHY.stevia && WHY['stevia extract'] && WHY.stevia === WHY['stevia extract']) throw new Error('t178u stevia alias');
if (t178uWhyForName('Modified cellulose gum') !== WHY['modified cellulose gum']) throw new Error('t178u case');
if (t178uWhyForName('modified cellulose')) throw new Error('t178u modified cellulose');
if (t178uWhyForName('benzyl alcohol')) throw new Error('t178u benzyl');
