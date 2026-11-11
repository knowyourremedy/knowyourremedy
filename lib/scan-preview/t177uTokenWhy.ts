import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHY: Record<string, string> = {
  "silica": "Silica is a mineral powder used as an anti-caking agent to keep powders from clumping. Some forms may contain nanoparticles; EFSA and FDA have noted absorption questions for certain nano-silica forms.",
  "silicon dioxide": "Silicon dioxide is a mineral powder used as an anti-caking agent to keep powders from clumping. Some forms may contain nanoparticles; EFSA and FDA have noted absorption questions for certain nano-silica forms.",
  "modified cellulose gum": "Modified cellulose gum is a chemically processed form of cellulose used as a thickener or binder. It differs from unmodified cellulose fiber, which is simply plant fiber.",
  "colloidal silicon dioxide": "Colloidal silicon dioxide is a fine mineral powder used as an anti-caking agent. Some colloidal forms may include nanoparticles; EFSA has flagged absorption questions for nano-forms of silica.",
  "mannitol": "Mannitol is a sugar alcohol used as a sweetener or bulking agent. Large amounts commonly cause bloating or loose stools; clinical reviews document this osmotic effect.",
  "hydroxypropyl cellulose": "Hydroxypropyl cellulose is a chemically modified cellulose derivative used as a binder or coating. It is more processed than simple cellulose fiber.",
  "flavor": "Flavor is an unnamed blend of flavor compounds. The label does not disclose the solvents or carriers inside the mixture.",
  "calcium silicate": "Calcium silicate is a mineral powder used as an anti-caking agent. It is a processed silicate form used in small amounts.",
  "alcohol": "Alcohol is a solvent used to carry other ingredients in liquid products. It is a processed form of ethanol.",
  "flavors": "Flavors is an unnamed blend of flavor compounds. The label does not disclose the solvents or carriers inside the mixture.",
  "xylitol": "Xylitol is a sugar alcohol used as a sweetener. Large amounts commonly cause bloating or loose stools; clinical reviews document this osmotic effect.",
  "natural and artificial flavors": "Natural and artificial flavors is a mixture of flavor compounds that may include both plant-derived and synthetic parts. The label does not list every component.",
  "medium chain triglycerides": "Medium chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils.",
  "polydextrose": "Polydextrose is a synthetic polymer of glucose used as a bulk sweetener and fiber. It is highly processed from starch.",
  "stevia leaf extract": "Stevia leaf extract is a sweetener concentrated from the stevia plant. It is more refined than whole stevia leaf; the high-purity rebaudioside A form is treated differently.",
  "pharmaceutical ink": "Pharmaceutical ink is printing ink applied to tablets or capsules. The label rarely lists every pigment or solvent in the ink.",
  "fructose": "Fructose is a simple sugar used as a sweetener. Excess free fructose is associated with metabolic effects in multiple reviews.",
  "dextrin": "Dextrin is a starch breakdown product used as a filler or binder. It is a processed form of starch.",
  "carob": "Carob is a food ingredient from the carob pod used as a flavor or filler. It is a processed plant material.",
  "benzalkonium chloride": "Benzalkonium chloride is a quaternary ammonium preservative used in eye and nasal products. It is a synthetic antimicrobial.",
  "menthol": "Menthol is a cooling compound derived from mint or synthesized. On an inactive list it is not the primary drug.",
  "bamboo extract": "Bamboo extract is a plant-derived silica source used as a flow agent. It is a concentrated extract rather than whole bamboo.",
  "natural flavors": "Natural flavors is an unnamed blend of flavor compounds derived from natural sources. The label does not list the carriers or solvents.",
  "maltitol": "Maltitol is a sugar alcohol used as a sweetener. Large amounts commonly cause bloating or loose stools; clinical reviews document this osmotic effect.",
  "corn syrup": "Corn syrup is a sweetener made by processing corn starch. It is a refined carbohydrate.",
  "fragrance": "Fragrance is an unnamed scent blend. The label does not list the solvents or carriers inside the mixture.",
  "stevia": "Stevia is a sweetener from the stevia plant. The bare form is more refined than whole leaf; the high-purity rebaudioside A form is treated differently.",
  "isomalt": "Isomalt is a sugar alcohol used as a sweetener. Large amounts commonly cause bloating or loose stools; clinical reviews document this osmotic effect.",
  "iron oxide red": "Iron oxide red is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "simethicone": "Simethicone is a silicone-based anti-gas agent. On an other-ingredients line it is not the labeled active drug.",
  "sorbitol sorbitan solution": "Sorbitol sorbitan solution is an emulsifier blend. It is a processed form of sugar alcohols used to stabilize mixtures.",
  "alcohol denat.": "Alcohol denat. is denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking.",
  "ammonium hydroxide": "Ammonium hydroxide is a pH adjuster used in trace amounts. It is a processed alkaline compound.",
  "beta carotene (for color)": "Beta carotene here is used as a color, not as a vitamin dose. It is a purified pigment.",
  "isopropyl alcohol": "Isopropyl alcohol is a solvent used in some formulations. It is a synthetic alcohol.",
  "polyethylene glycol 400": "Polyethylene glycol 400 is a specific molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "rice bran wax": "Rice bran wax is a wax extracted from rice bran and used as a coating or flow agent. It is a processed plant wax.",
  "gum base": "Gum base is an unnamed mixture of gums, resins, and waxes used in chewing products. The exact composition is rarely fully disclosed.",
  "iron oxide black": "Iron oxide black is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "sodium polyacrylate": "Sodium polyacrylate is a synthetic gel-forming polymer used as a thickener. It is a highly processed acrylate.",
  "phenoxyethanol": "Phenoxyethanol is a synthetic preservative used in topical products. It is a glycol ether.",
  "sorbitan": "Sorbitan is an emulsifier derived from sorbitol. It is a processed surfactant, not the sugar alcohol itself.",
  "acrylates/c10-30 alkyl acrylate crosspolymer": "Acrylates/c10-30 alkyl acrylate crosspolymer is a synthetic polymer used as a thickener in creams. It is a highly processed acrylate.",
  "blue spirulina (for color)": "Blue spirulina is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina.",
  "triethanolamine": "Triethanolamine is a synthetic pH adjuster used in creams. It is an amine compound.",
  "eucalyptus oil": "Eucalyptus oil is the essential oil distilled from eucalyptus leaves, used as a scent or inactive ingredient. It is a concentrated plant oil.",
  "aloe vera gel": "Aloe vera gel is the juice or gel from the aloe plant. It is a processed plant material.",
  "sugar alcohol": "Sugar alcohol is a class name for sweeteners such as xylitol or sorbitol. Large amounts commonly cause bloating or loose stools; clinical reviews document this osmotic effect.",
  "steareth-21": "Steareth-21 is an ethoxylated fatty alcohol used as an emulsifier in cream bases. Ethoxylation can leave residual impurities such as 1,4-dioxane.",
  "iron oxide yellow": "Iron oxide yellow is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "modified corn starch": "Modified corn starch is chemically processed corn starch used as a thickener or filler. It differs from plain corn starch.",
  "organic maltodextrin": "Organic maltodextrin is a starch-based bulk sweetener made from organic starch. It is still a highly processed carbohydrate.",
  "polyacrylic acid": "Polyacrylic acid is a synthetic polymer used as a thickener or gel former. It is a processed acrylate.",
  "modified food starch": "Modified food starch is chemically processed starch used as a thickener or filler. It differs from plain starch.",
  "medium-chain triglycerides": "Medium-chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils.",
  "ethylhexylglycerin": "Ethylhexylglycerin is a synthetic preservative booster and skin-conditioning agent. It is a glycol ether.",
  "red iron oxide": "Red iron oxide is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "steviol glycosides": "Steviol glycosides are the purified sweet compounds from the stevia plant. They are more refined than whole stevia leaf.",
  "yellow iron oxide": "Yellow iron oxide is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "glucose": "Glucose is a simple sugar used as a sweetener or filler. It is a basic carbohydrate.",
  "phosphoric acid": "Phosphoric acid is an acid used to set acidity in formulations. It is a processed mineral acid.",
  "carmine": "Carmine is a red color made from cochineal insects. It can cause allergic reactions in some people.",
  "enteric coating": "Enteric coating is a delayed-release polymer coating applied to tablets so they dissolve later in the gut. It is a processed coating.",
  "methacrylic acid copolymer": "Methacrylic acid copolymer is a synthetic polymer used as an enteric coating. It is a processed acrylate.",
  "sorbitan monooleate": "Sorbitan monooleate is an emulsifier derived from sorbitol and oleic acid. It is a processed surfactant.",
  "aminomethyl propanol": "Aminomethyl propanol is a synthetic pH adjuster used in cream or coating formulas. It is an amine compound.",
  "dicetyl phosphate": "Dicetyl phosphate is a synthetic phosphate used in cream or coating formulas as an emulsifier or stabilizer. It is a processed phosphate ester.",
  "lemon oil": "Lemon oil is the essential oil pressed from lemon peel, used for scent or flavor. It is a concentrated plant oil.",
  "organic pea starch": "Organic pea starch is a starch filler from organic peas. It is not pea protein and is a refined carbohydrate.",
  "stevia extract": "Stevia extract is a concentrated sweetener from the stevia plant. It is more refined than whole leaf; the high-purity rebaudioside A form is treated differently.",
  "vegetable capsule (hypromellose, gellan gum)": "Vegetable capsule (hypromellose, gellan gum) is a plant-based capsule shell made from cellulose and gellan gum.",
  "camphor": "Camphor is a plant-derived compound used as a topical inactive for scent or cooling. It is a concentrated plant extract.",
  "corn syrup solids": "Corn syrup solids are the dried form of corn syrup used as a sweetener. It is a refined carbohydrate.",
  "ferric oxide yellow": "Ferric oxide yellow is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "organic tapioca maltodextrin": "Organic tapioca maltodextrin is a starch-based bulk sweetener made from organic tapioca. It is still a highly processed carbohydrate.",
  "sugar spheres": "Sugar spheres are small sugar cores used as a base in some tablets. They are a refined sugar form.",
  "ceteth-20 phosphate": "Ceteth-20 phosphate is an ethoxylated fatty alcohol phosphate used as an emulsifier in cream bases. Ethoxylation can leave residual impurities.",
  "sd alcohol 40-b": "SD alcohol 40-B is a denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking.",
  "steareth-2": "Steareth-2 is an ethoxylated fatty alcohol used as an emulsifier in cream bases. Ethoxylation can leave residual impurities.",
  "c30-45 alkyl cetearyl dimethicone crosspolymer": "C30-45 alkyl cetearyl dimethicone crosspolymer is a synthetic silicone polymer used in cream or coating formulas.",
  "caprylyl methicone": "Caprylyl methicone is a synthetic silicone used in cream or coating formulas as a conditioning agent.",
  "high fructose corn syrup": "High fructose corn syrup is a sweetener made from corn starch. It is a refined carbohydrate associated with metabolic effects in multiple reviews.",
  "silicon dioxide (silica)": "Silicon dioxide (silica) is a mineral powder used as an anti-caking agent to keep powders from clumping.",
  "stevia (leaf extract)": "Stevia (leaf extract) is a sweetener concentrated from the stevia plant. It is more refined than whole leaf; the high-purity rebaudioside A form is treated differently.",
  "sunflower seed oil": "Sunflower seed oil is a seed oil used in some bases. Seed oils are refined and graded Limited under the current rules.",
  "trolamine": "Trolamine is a synthetic pH adjuster. It is an amine compound.",
  "annatto seed extract (color)": "Annatto seed extract is a plant color from the achiote seed. Some people with chronic hives react to it, and high intakes of its pigment can approach the EFSA acceptable daily intake.",
  "dextrates": "Dextrates are a starch sugar used as a filler. They are a processed carbohydrate form.",
  "paraffin": "Paraffin is a mineral-oil-derived wax used as a coating or base. It is a refined petroleum product.",
  "polyoxyl 20 cetostearyl ether": "Polyoxyl 20 cetostearyl ether is an ethoxylated surfactant used as an emulsifier. Ethoxylation can leave residual impurities.",
  "potassium benzoate": "Potassium benzoate is a synthetic preservative. It is the potassium salt of benzoic acid; when combined with vitamin C it can form trace benzene, noted by the FDA.",
  "artificial flavor": "Artificial flavor is a synthetic flavor blend. It is not a named fruit flavor.",
  "beta-carotene (for color)": "Beta-carotene here is used as a color, not as a vitamin dose. It is a purified pigment.",
  "caprylyl glycol": "Caprylyl glycol is a synthetic skin-conditioning agent and preservative booster. It is a glycol.",
  "clove oil": "Clove oil is the essential oil distilled from clove buds, used as a scent or inactive ingredient. It is a concentrated plant oil.",
  "edible ink": "Edible ink is printing ink applied to tablets or capsules. The label rarely lists every pigment or solvent in the ink.",
  "hydroxyacetophenone": "Hydroxyacetophenone is a synthetic antioxidant used in creams. It is a processed phenolic compound.",
  "maltodextrin": "Maltodextrin is a starch-based bulk sweetener. It is a highly processed carbohydrate.",
  "quik-sorb\u00ae (ginger rhizome, amla fruit, capsicum fruit)": "Quik-Sorb\u00ae (ginger rhizome, amla fruit, capsicum fruit) is a named blend of plant extracts used as a delivery system.",
  "sorbitol sorbitan": "Sorbitol sorbitan is an emulsifier blend derived from sugar alcohols. It is a processed surfactant.",
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact tokens from the t177u list only. Grades and notes stay as they are. */
export function t177uWhyForName(name: string): string | undefined {
  return WHY[norm(name)];
}

export function applyT177uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t177uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT177uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT177uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (Object.keys(WHY).length !== 100) throw new Error('t177u count');
const MUST_HAVE = [
  'silica',
  'silicon dioxide',
  'colloidal silicon dioxide',
  'alcohol',
  'alcohol denat.',
  'flavor',
  'flavors',
  'natural flavors',
  'stevia',
  'stevia extract',
  'stevia leaf extract',
  'sd alcohol 40-b',
  'quik-sorb\u00ae (ginger rhizome, amla fruit, capsicum fruit)',
];
const MUST_MISS = [
  'hydrated silica',
  'colloidal silica',
  'benzyl alcohol',
  'natural lemon flavor',
  'natural lemon flavor with other natural flavors',
  'quik-sorb\u00ae (ginger rhizome, alma fruit, capsicum fruit)',
];
for (const name of MUST_HAVE) {
  if (!WHY[name]) throw new Error(`t177u missing ${name}`);
}
for (const name of MUST_MISS) {
  if (WHY[name]) throw new Error(`t177u over-matched ${name}`);
}
if (WHY.silica === WHY['silicon dioxide']) throw new Error('t177u silica alias');
if (WHY.alcohol === WHY['alcohol denat.']) throw new Error('t177u alcohol alias');
if (WHY.flavor === WHY.flavors || WHY.flavor === WHY['natural flavors']) throw new Error('t177u flavor alias');
if (WHY.stevia === WHY['stevia extract'] || WHY.stevia === WHY['stevia leaf extract']) throw new Error('t177u stevia alias');
if (!WHY['sd alcohol 40-b'].includes('SD alcohol 40-B')) throw new Error('t177u sd alcohol case');
if (!t177uWhyForName('Silica')) throw new Error('t177u case');
if (t177uWhyForName('hydrated silica')) throw new Error('t177u hydrated silica');
if (t177uWhyForName('benzyl alcohol')) throw new Error('t177u benzyl');
if (t177uWhyForName('quik-sorb\u00ae (ginger rhizome, alma fruit, capsicum fruit)')) throw new Error('t177u alma');
