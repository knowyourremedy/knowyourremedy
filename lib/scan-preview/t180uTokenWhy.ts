import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHY: Record<string, string> = {
  "medium chain triglycerides": "Medium chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils.",
  "carob": "Carob is a food ingredient from the carob pod used as a flavor or filler. It is a processed plant material.",
  "menthol": "Menthol is a cooling compound derived from mint or synthesized. On an inactive list it is not the primary drug.",
  "bamboo extract": "Bamboo extract is a plant-derived silica source used as a flow agent. It is a concentrated extract rather than whole bamboo.",
  "corn syrup": "Corn syrup is a sweetener made by processing corn starch. It is a refined carbohydrate permitted by the FDA as a food additive.",
  "simethicone": "Simethicone is a silicone-based anti-gas agent. On an other-ingredients line it is not the labeled active drug.",
  "sorbitol sorbitan solution": "Sorbitol sorbitan solution is an emulsifier blend. It is a processed form of sugar alcohols used to stabilize mixtures.",
  "alcohol denat.": "Alcohol denat. is denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking.",
  "isopropyl alcohol": "Isopropyl alcohol is a solvent used in some formulations. It is a synthetic alcohol.",
  "rice bran wax": "Rice bran wax is a wax extracted from rice bran and used as a coating or flow agent. It is a processed plant wax.",
  "gum base": "Gum base is an unnamed mixture of gums, resins, and waxes used in chewing products. The exact composition is rarely fully disclosed.",
  "sodium polyacrylate": "Sodium polyacrylate is a synthetic gel-forming polymer used as a thickener. It is a highly processed acrylate.",
  "sorbitan": "Sorbitan is an emulsifier derived from sorbitol. It is a processed surfactant, not the sugar alcohol itself.",
  "acrylates/c10-30 alkyl acrylate crosspolymer": "Acrylates/c10-30 alkyl acrylate crosspolymer is a synthetic polymer used as a thickener in creams. It is a highly processed acrylate.",
  "blue spirulina (for color)": "Blue spirulina is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina.",
  "eucalyptus oil": "Eucalyptus oil is the essential oil distilled from eucalyptus leaves, used as a scent or inactive ingredient. It is a concentrated plant oil.",
  "aloe vera gel": "Aloe vera gel is the juice or gel from the aloe plant. It is a processed plant material.",
  "modified corn starch": "Modified corn starch is chemically processed corn starch used as a thickener or filler. It differs from plain corn starch.",
  "organic maltodextrin": "Organic maltodextrin is a starch-based bulk sweetener made from organic starch. It is still a highly processed carbohydrate.",
  "polyacrylic acid": "Polyacrylic acid is a synthetic polymer used as a thickener or gel former. It is a processed acrylate.",
  "modified food starch": "Modified food starch is chemically processed starch used as a thickener or filler. It differs from plain starch.",
  "medium-chain triglycerides": "Medium-chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils.",
  "ethylhexylglycerin": "Ethylhexylglycerin is a synthetic preservative booster and skin-conditioning agent. It is a glycol ether.",
  "glucose": "Glucose is a simple sugar used as a sweetener or filler. It is a basic carbohydrate.",
  "enteric coating": "Enteric coating is a delayed-release polymer coating applied to tablets so they dissolve later in the gut. It is a processed coating.",
  "methacrylic acid copolymer": "Methacrylic acid copolymer is a synthetic polymer used as an enteric coating. It is a processed acrylate.",
  "sorbitan monooleate": "Sorbitan monooleate is an emulsifier derived from sorbitol and oleic acid. It is a processed surfactant.",
  "aminomethyl propanol": "Aminomethyl propanol is a synthetic pH adjuster used in cream or coating formulas. It is an amine compound.",
  "dicetyl phosphate": "Dicetyl phosphate is a synthetic phosphate used in cream or coating formulas as an emulsifier or stabilizer. It is a processed phosphate ester.",
  "lemon oil": "Lemon oil is the essential oil pressed from lemon peel, used for scent or flavor. It is a concentrated plant oil.",
  "organic pea starch": "Organic pea starch is a starch filler from organic peas. It is not pea protein and is a refined carbohydrate.",
  "camphor": "Camphor is a plant-derived compound used as a topical inactive for scent or cooling. It is a concentrated plant extract.",
  "corn syrup solids": "Corn syrup solids are the dried form of corn syrup used as a sweetener. It is a refined carbohydrate.",
  "organic tapioca maltodextrin": "Organic tapioca maltodextrin is a starch-based bulk sweetener made from organic tapioca. It is still a highly processed carbohydrate.",
  "sugar spheres": "Sugar spheres are small sugar cores used as a base in some tablets. They are a refined sugar form.",
  "sd alcohol 40-b": "SD alcohol 40-B is a denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking.",
  "c30-45 alkyl cetearyl dimethicone crosspolymer": "C30-45 alkyl cetearyl dimethicone crosspolymer is a synthetic silicone polymer used in cream or coating formulas. It is a processed dimethicone derivative.",
  "caprylyl methicone": "Caprylyl methicone is a synthetic silicone used in cream or coating formulas as a conditioning agent. It is a processed silicone.",
  "sunflower seed oil": "Sunflower seed oil is a seed oil used in some bases. Seed oils are refined and graded Limited under the current rules.",
  "trolamine": "Trolamine is a synthetic pH adjuster. It is an amine compound, also known as triethanolamine.",
  "dextrates": "Dextrates are a starch sugar used as a filler. They are a processed carbohydrate form.",
  "paraffin": "Paraffin is a mineral-oil-derived wax used as a coating or base. It is a refined petroleum product.",
  "caprylyl glycol": "Caprylyl glycol is a synthetic skin-conditioning agent and preservative booster. It is a glycol.",
  "clove oil": "Clove oil is the essential oil distilled from clove buds, used as a scent or inactive ingredient. It is a concentrated plant oil.",
  "hydroxyacetophenone": "Hydroxyacetophenone is a synthetic antioxidant used in creams. It is a processed phenolic compound.",
  "maltodextrin": "Maltodextrin is a starch-based bulk sweetener. It is a highly processed carbohydrate.",
  "sorbitol sorbitan": "Sorbitol sorbitan is an emulsifier blend derived from sugar alcohols. It is a processed surfactant.",
  "caprylic/capric triglyceride": "Caprylic/capric triglyceride is a medium-chain triglyceride used as a softgel fill or carrier. It is a processed fraction of fats.",
  "spirulina extract (color)": "Spirulina extract is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina.",
  "calcium polycarbophil": "Calcium polycarbophil is a synthetic fiber used as an inactive bulk. It is a processed polycarbophil salt.",
  "dextrose excipient": "Dextrose excipient is a simple sugar used as a filler or binder. It is a basic carbohydrate.",
  "hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer": "Hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer is a synthetic polymer used as a thickener in creams. It is a processed acrylate.",
  "light mineral oil": "Light mineral oil is a refined petroleum-derived oil used as a base or coating. It is a processed mineral oil.",
  "soybean oil": "Soybean oil is a seed oil used as a base. When it is the base of a gummy you are chewing the oil; seed oils are graded Avoid in that form under the current rules.",
  "strong ammonia solution": "Strong ammonia solution is an ammonia solution used to set pH. It is a processed alkaline compound permitted by the FDA as a pH adjuster.",
  "aluminum glycinate": "Aluminum glycinate is a synthetic aluminum compound used in cream or coating formulas as a buffering agent. It is a processed aluminum salt.",
  "dihydroxyaluminum aminoacetate": "Dihydroxyaluminum aminoacetate is a synthetic aluminum compound used in cream or coating formulas as a buffering agent. It is a processed aluminum salt.",
  "rosemary oil": "Rosemary oil is the essential oil distilled from rosemary, used as a scent or inactive ingredient. It is a concentrated plant oil.",
  "spirulina extract": "Spirulina extract is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina.",
  "0.25% w/w phenylethyl alcohol": "Phenylethyl alcohol is a solvent used in small amounts. It is a synthetic alcohol.",
  "aluminum hydroxide": "Aluminum hydroxide is listed as an inactive ingredient, not as a swallowed antacid. It is a mineral compound used as a buffering agent.",
  "aminomethylpropanol": "Aminomethylpropanol is a synthetic pH adjuster used in cream or coating formulas. It is an amine compound.",
  "diazolidinyl urea": "Diazolidinyl urea is a preservative that can release formaldehyde. Formaldehyde release is noted by the FDA as a concern in certain preservatives.",
  "medium chain triglyceride oil": "Medium chain triglyceride oil is a processed fraction of fats used as a softgel or liquid fill. It is more refined than whole oils.",
  "methyl acrylate/2-ethylhexyl acrylate copolymer": "Methyl acrylate/2-ethylhexyl acrylate copolymer is a synthetic polymer used as a film former or thickener.",
  "natural and artificial peppermint flavor": "Natural and artificial peppermint flavor is a mixture of flavor compounds. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural flavor": "Natural flavor is an unnamed blend of flavor compounds. The label does not list the carriers or solvents (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural mixed berry flavor": "Natural mixed berry flavor is a named fruit flavor blend. It is not a fully unnamed flavor mixture.",
  "natural palm leaf glaze": "Natural palm leaf glaze is a plant-derived coating from palm leaves.",
  "organic stevia (leaf) extract": "Organic stevia (leaf) extract is a sweetener concentrated from the stevia plant. It is more refined than whole leaf.",
  "organic tapioca starch": "Organic tapioca starch is a simple starch filler from organic tapioca.",
  "peppermint flavor": "Peppermint flavor is a named mint flavor.",
  "polyvinyl acetate phthalate": "Polyvinyl acetate phthalate is a synthetic polymer used as an enteric coating. It is a processed acrylate.",
  "rebaudioside a": "Rebaudioside A is a purified steviol glycoside from the stevia plant. High-purity forms have FDA GRAS status, but the bare form is graded Limited.",
  "sodium pyruvate": "Sodium pyruvate is a salt used as an inactive ingredient. It is the sodium salt of pyruvic acid.",
  "sodium saccharin": "Sodium saccharin is an artificial sweetener. Later reviews walked back the older cancer signal; the FDA continues to permit it as a food additive.",
  "4-t-butylcyclohexanol": "4-t-butylcyclohexanol is a synthetic alcohol used as a fragrance ingredient.",
  "aloe": "Aloe is a plant juice or gel from the aloe plant, used according to how the label lists it.",
  "ammonium glycyrrhizin": "Ammonium glycyrrhizin is a licorice salt used as a sweetener or flavor. It contains glycyrrhizin; EFSA has set an ADI for glycyrrhizic acid.",
  "artificial mixed berry flavor": "Artificial mixed berry flavor is a synthetic flavor blend. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "cajuput oil": "Cajuput oil is the essential oil distilled from cajuput leaves, used as a scent or inactive ingredient. It is a concentrated plant oil.",
  "dextrose anhydrous": "Dextrose anhydrous is a simple sugar used as a filler. It is a basic carbohydrate.",
  "ethyl acetate": "Ethyl acetate is a flavor solvent. It is a synthetic ester used in small amounts.",
  "farnesol": "Farnesol is a fragrance ingredient derived from plants or synthesized.",
  "himalayan rock salt": "Himalayan rock salt is a mineral salt used as a base or electrolyte.",
  "iron oxide ochre": "Iron oxide ochre is a mineral pigment used as a color. It is not a synthetic FD&C dye; the FDA permits iron oxides as color additives in limited amounts.",
  "lemon essential oil": "Lemon essential oil is the essential oil pressed from lemon peel, used for scent or flavor. It is a concentrated plant oil.",
  "macrogol": "Macrogol is a polyethylene glycol used as a solvent or plasticizer. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "mica-based pearlescent pigment": "Mica-based pearlescent pigment is a mineral pigment used for shine. It is a processed mica form.",
  "modified cellulose": "Modified cellulose is a chemically processed form of cellulose used as a binder or thickener. It differs from unmodified cellulose fiber.",
  "natural and artificial cherry flavor": "Natural and artificial cherry flavor is a mixture of flavor compounds. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "non-gmo citric acid": "Non-GMO citric acid is citric acid used to set acidity. It is a processed acid.",
  "nonoxynol-30": "Nonoxynol-30 is an ethoxylated surfactant used as an emulsifier. Ethoxylation can leave residual impurities.",
  "olive oil": "Olive oil is a plant oil used as a softgel fill. It is not the gummy seed-oil form.",
  "organic cherry flavor": "Organic cherry flavor is a named fruit flavor.",
  "organic rice fiber (nu-flow®)": "Organic rice fiber (Nu-FLOW®) is a rice-derived fiber used as a flow agent.",
  "organic vanilla flavor": "Organic vanilla flavor is a named flavor derived from vanilla.",
  "polyethyleneglycol": "Polyethylene glycol is a synthetic solvent or plasticizer. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "styrene-isoprene-styrene block copolymer": "Styrene-isoprene-styrene block copolymer is a synthetic polymer used as a film former or adhesive.",
  "tapioca dextrose": "Tapioca dextrose is a simple sugar derived from tapioca, used as a filler. It is a basic carbohydrate.",
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact tokens from the t180u list only. Grades and notes stay as they are. */
export function t180uWhyForName(name: string): string | undefined {
  return WHY[norm(name)];
}

export function applyT180uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t180uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT180uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT180uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (Object.keys(WHY).length !== 100) throw new Error('t180u count');
const MUST_HAVE = [
  "aloe",
  "aloe vera gel",
  "natural flavor",
  "modified cellulose",
  "medium chain triglyceride oil",
  "medium chain triglycerides",
  "medium-chain triglycerides",
  "sd alcohol 40-b",
  "organic rice fiber (nu-flow®)",
  "alcohol denat.",
];
const MUST_MISS = [
  "natural flavors",
  "modified cellulose gum",
  "organic rice fiber",
  "flavor",
  "flavors",
  "alcohol",
  "benzyl alcohol",
];
for (const name of MUST_HAVE) {
  if (!WHY[name]) throw new Error(`t180u missing ${name}`);
}
for (const name of MUST_MISS) {
  if (WHY[name]) throw new Error(`t180u over-matched ${name}`);
}
if (t180uWhyForName('Aloe') !== WHY.aloe) throw new Error('t180u aloe');
if (t180uWhyForName('aloe vera gel') !== WHY['aloe vera gel']) throw new Error('t180u aloe vera gel');
if (t180uWhyForName('natural flavor') !== WHY['natural flavor']) throw new Error('t180u natural flavor');
if (t180uWhyForName('natural flavors')) throw new Error('t180u natural flavors');
if (t180uWhyForName('modified cellulose') !== WHY['modified cellulose']) throw new Error('t180u modified cellulose');
if (t180uWhyForName('modified cellulose gum')) throw new Error('t180u modified cellulose gum');
if (t180uWhyForName('medium chain triglyceride oil') !== WHY['medium chain triglyceride oil']) throw new Error('t180u mct oil');
if (t180uWhyForName('medium chain triglycerides') !== WHY['medium chain triglycerides']) throw new Error('t180u mct');
if (t180uWhyForName('medium-chain triglycerides') !== WHY['medium-chain triglycerides']) throw new Error('t180u mct hyphen');
if (!WHY['sd alcohol 40-b'].includes('SD alcohol 40-B')) throw new Error('t180u sd alcohol case');
if (!WHY['non-gmo citric acid'].includes('Non-GMO')) throw new Error('t180u non-gmo case');
if (!WHY['organic rice fiber (nu-flow®)'].includes('Nu-FLOW®')) throw new Error('t180u nu-flow');
