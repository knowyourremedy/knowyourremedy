import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHY: Record<string, string> = {
  "flavor": "Flavor is an unnamed blend of flavor compounds. The label does not disclose the solvents or carriers inside the mixture (FDA 21 CFR 101.22 does not require full component disclosure for flavors).",
  "alcohol": "Alcohol is a solvent used to carry other ingredients in liquid products. It is a processed form of ethanol permitted by the FDA as a solvent in certain formulations.",
  "flavors": "Flavors is an unnamed blend of flavor compounds. The label does not disclose the solvents or carriers inside the mixture (FDA 21 CFR 101.22 does not require full component disclosure for flavors).",
  "natural and artificial flavors": "Natural and artificial flavors is a mixture of flavor compounds that may include both plant-derived and synthetic parts. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "medium chain triglycerides": "Medium chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils.",
  "pharmaceutical ink": "Pharmaceutical ink is printing ink applied to tablets or capsules. The label rarely lists every pigment or solvent in the ink (FDA labeling rules for inactive ingredients do not require full ink composition disclosure).",
  "fructose": "Fructose is a simple sugar used as a sweetener. Excess free fructose is associated with metabolic effects; the FDA has noted concerns with high free-fructose intakes in its guidance on added sugars.",
  "dextrin": "Dextrin is a starch breakdown product used as a filler or binder. It is a processed form of starch permitted by the FDA as a food additive.",
  "carob": "Carob is a food ingredient from the carob pod used as a flavor or filler. It is a processed plant material.",
  "menthol": "Menthol is a cooling compound derived from mint or synthesized. On an inactive list it is not the primary drug.",
  "bamboo extract": "Bamboo extract is a plant-derived silica source used as a flow agent. It is a concentrated extract rather than whole bamboo.",
  "natural flavors": "Natural flavors is an unnamed blend of flavor compounds derived from natural sources. The label does not list the carriers or solvents (FDA 21 CFR 101.22 does not require full component disclosure for flavors).",
  "corn syrup": "Corn syrup is a sweetener made by processing corn starch. It is a refined carbohydrate.",
  "fragrance": "Fragrance is an unnamed scent blend. The label does not list the solvents or carriers inside the mixture (FDA labeling rules for fragrances do not require full component disclosure).",
  "simethicone": "Simethicone is a silicone-based anti-gas agent. On an other-ingredients line it is not the labeled active drug.",
  "sorbitol sorbitan solution": "Sorbitol sorbitan solution is an emulsifier blend. It is a processed form of sugar alcohols used to stabilize mixtures.",
  "alcohol denat.": "Alcohol denat. is denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking.",
  "beta carotene (for color)": "Beta carotene here is used as a color, not as a vitamin dose. It is a purified pigment permitted by the FDA as a color additive.",
  "isopropyl alcohol": "Isopropyl alcohol is a solvent used in some formulations. It is a synthetic alcohol.",
  "rice bran wax": "Rice bran wax is a wax extracted from rice bran and used as a coating or flow agent. It is a processed plant wax.",
  "gum base": "Gum base is an unnamed mixture of gums, resins, and waxes used in chewing products. The exact composition is rarely fully disclosed.",
  "sodium polyacrylate": "Sodium polyacrylate is a synthetic gel-forming polymer used as a thickener. It is a highly processed acrylate.",
  "sorbitan": "Sorbitan is an emulsifier derived from sorbitol. It is a processed surfactant, not the sugar alcohol itself.",
  "acrylates/c10-30 alkyl acrylate crosspolymer": "Acrylates/c10-30 alkyl acrylate crosspolymer is a synthetic polymer used as a thickener in creams. It is a highly processed acrylate.",
  "blue spirulina (for color)": "Blue spirulina is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina.",
  "triethanolamine": "Triethanolamine is a synthetic pH adjuster used in creams. It is an amine compound permitted by the FDA in limited concentrations in cosmetics.",
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
  "high fructose corn syrup": "High fructose corn syrup is a sweetener made from corn starch. It is a refined carbohydrate associated with metabolic effects; the FDA has noted concerns with high free-fructose intakes in its guidance on added sugars.",
  "sunflower seed oil": "Sunflower seed oil is a seed oil used in some bases. Seed oils are refined and graded Limited under the current rules.",
  "trolamine": "Trolamine is a synthetic pH adjuster. It is an amine compound, also known as triethanolamine.",
  "dextrates": "Dextrates are a starch sugar used as a filler. They are a processed carbohydrate form.",
  "paraffin": "Paraffin is a mineral-oil-derived wax used as a coating or base. It is a refined petroleum product.",
  "artificial flavor": "Artificial flavor is a synthetic flavor blend. It is not a named fruit flavor (FDA 21 CFR 101.22 does not require full component disclosure).",
  "beta-carotene (for color)": "Beta-carotene here is used as a color, not as a vitamin dose. It is a purified pigment permitted by the FDA as a color additive.",
  "caprylyl glycol": "Caprylyl glycol is a synthetic skin-conditioning agent and preservative booster. It is a glycol.",
  "clove oil": "Clove oil is the essential oil distilled from clove buds, used as a scent or inactive ingredient. It is a concentrated plant oil.",
  "edible ink": "Edible ink is printing ink applied to tablets or capsules. The label rarely lists every pigment or solvent in the ink (FDA labeling rules for inactive ingredients do not require full ink composition disclosure).",
  "hydroxyacetophenone": "Hydroxyacetophenone is a synthetic antioxidant used in creams. It is a processed phenolic compound.",
  "maltodextrin": "Maltodextrin is a starch-based bulk sweetener. It is a highly processed carbohydrate.",
  "sorbitol sorbitan": "Sorbitol sorbitan is an emulsifier blend derived from sugar alcohols. It is a processed surfactant.",
  "caprylic/capric triglyceride": "Caprylic/capric triglyceride is a medium-chain triglyceride used as a softgel fill or carrier. It is a processed fraction of fats.",
  "spirulina extract (color)": "Spirulina extract is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina.",
  "calcium polycarbophil": "Calcium polycarbophil is a synthetic fiber used as an inactive bulk. It is a processed polycarbophil salt.",
  "casein peptones": "Casein peptones are protein fragments derived from milk casein, used as a nutrient or excipient.",
  "chamomilla recutita (matricaria) flower extract": "Chamomilla recutita (matricaria) flower extract is a named plant extract from chamomile flowers, used as a scent or inactive.",
  "cocoyl caprylocaprate": "Cocoyl caprylocaprate is an emollient ester derived from coconut and caprylic/capric acids, used in cream bases.",
  "dextrose excipient": "Dextrose excipient is a simple sugar used as a filler or binder. It is a basic carbohydrate.",
  "erythritol": "Erythritol is a sugar alcohol used as a sweetener. Large amounts can cause bloating or loose stools; the FDA notes the laxative effect of sugar alcohols at higher intakes.",
  "glycerol monostearate": "Glycerol monostearate is a wax-like emulsifier used in creams and coatings. It is a processed fatty acid ester.",
  "hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer": "Hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer is a synthetic polymer used as a thickener in creams. It is a processed acrylate.",
  "isohexadecane": "Isohexadecane is a synthetic hydrocarbon used as an emollient in cream bases.",
  "lanolin": "Lanolin is wool wax used as an emollient. It can bother people who are sensitive to wool alcohols.",
  "light mineral oil": "Light mineral oil is a refined petroleum-derived oil used as a base or coating. It is a processed mineral oil.",
  "molasses": "Molasses is a food sugar or syrup used as a sweetener.",
  "monobasic sodium phosphate": "Monobasic sodium phosphate is a phosphate salt used as a mineral filler or pH adjuster.",
  "natural vanilla flavor": "Natural vanilla flavor is a named flavor derived from vanilla.",
  "soy peptones": "Soy peptones are protein fragments derived from soy, used as a nutrient or excipient.",
  "soybean oil": "Soybean oil is a seed oil used as a base. When it is the base of a gummy you are chewing the oil; seed oils are graded Avoid in that form under the current rules.",
  "strong ammonia solution": "Strong ammonia solution is an ammonia solution used to set pH. It is a processed alkaline compound.",
  "turmeric": "Turmeric is a named plant ingredient from the turmeric root, used as a color or inactive.",
  "zinc oxide": "Zinc oxide is a mineral compound used as a color or protective agent.",
  "aluminum glycinate": "Aluminum glycinate is a synthetic aluminum compound used in cream or coating formulas as a buffering agent.",
  "cetyl palmitate": "Cetyl palmitate is a wax-like ester used as an emollient in cream bases.",
  "dihydroxyaluminum aminoacetate": "Dihydroxyaluminum aminoacetate is a synthetic aluminum compound used in cream or coating formulas as a buffering agent.",
  "glycyrrhiza extract": "Glycyrrhiza extract is licorice root extract. It contains glycyrrhizin; large amounts can raise blood pressure or affect the heart and kidneys in some people (EFSA has set an ADI for glycyrrhizic acid).",
  "iron oxide": "Iron oxide is a mineral pigment used as a color. It is not a synthetic FD&C dye; the FDA permits iron oxides as color additives in limited amounts.",
  "isopropyl palmitate": "Isopropyl palmitate is an ester used as an emollient in cream bases.",
  "polyethylene glycol 3350": "Polyethylene glycol 3350 is a specific molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "polyethylene glycol 600": "Polyethylene glycol 600 is a specific molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "quik-sorb\u00ae (ginger rhizome, alma fruit, capsicum fruit)": "Quik-Sorb\u00ae (ginger rhizome, alma fruit, capsicum fruit) is a named blend of plant extracts used as a delivery system.",
  "rosemary oil": "Rosemary oil is the essential oil distilled from rosemary, used as a scent or inactive ingredient. It is a concentrated plant oil.",
  "spirulina extract": "Spirulina extract is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina.",
  "0.02% w/w benzalkonium chloride": "Benzalkonium chloride is a quaternary ammonium preservative used in eye and nasal products. It is a synthetic antimicrobial; the FDA permits it in limited concentrations.",
  "0.25% w/w phenylethyl alcohol": "Phenylethyl alcohol is a solvent used in small amounts. It is a synthetic alcohol.",
  "aluminum hydroxide": "Aluminum hydroxide is listed as an inactive ingredient, not as a swallowed antacid. It is a mineral compound used as a buffering agent.",
  "aminomethylpropanol": "Aminomethylpropanol is a synthetic pH adjuster used in cream or coating formulas. It is an amine compound.",
  "annatto extract": "Annatto extract is a plant color from the achiote seed. Some people with chronic hives react to it; the EFSA has set an ADI for its pigment.",
  "calendula officinalis flower extract": "Calendula officinalis flower extract is a named plant extract from calendula flowers, used as a scent or inactive.",
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact tokens from the t179u list only. Grades and notes stay as they are. */
export function t179uWhyForName(name: string): string | undefined {
  return WHY[norm(name)];
}

export function applyT179uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t179uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT179uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT179uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (Object.keys(WHY).length !== 100) throw new Error('t179u count');
const MUST_HAVE = [
  "0.02% w/w benzalkonium chloride",
  "aminomethylpropanol",
  "aminomethyl propanol",
  "spirulina extract",
  "spirulina extract (color)",
  "iron oxide",
  "flavor",
  "flavors",
  "natural flavors",
  "alcohol",
  "alcohol denat.",
  "isopropyl alcohol",
];
const MUST_MISS = [
  "benzalkonium chloride",
  "iron oxide red",
  "iron oxide black",
  "iron oxide yellow",
  "red iron oxide",
  "black iron oxide",
  "yellow iron oxide",
  "ferric oxide red",
  "ferric oxide yellow",
  "benzyl alcohol",
];
for (const name of MUST_HAVE) {
  if (!WHY[name]) throw new Error(`t179u missing ${name}`);
}
for (const name of MUST_MISS) {
  if (WHY[name]) throw new Error(`t179u over-matched ${name}`);
}
if (t179uWhyForName('0.02% w/w benzalkonium chloride') !== WHY['0.02% w/w benzalkonium chloride']) throw new Error('t179u bkc');
if (t179uWhyForName('benzalkonium chloride')) throw new Error('t179u bare bkc');
if (t179uWhyForName('aminomethylpropanol') !== WHY.aminomethylpropanol) throw new Error('t179u aminomethylpropanol');
if (t179uWhyForName('aminomethyl propanol') !== WHY['aminomethyl propanol']) throw new Error('t179u aminomethyl propanol');
if (t179uWhyForName('spirulina extract') !== WHY['spirulina extract']) throw new Error('t179u spirulina');
if (t179uWhyForName('spirulina extract (color)') !== WHY['spirulina extract (color)']) throw new Error('t179u spirulina color');
if (t179uWhyForName('iron oxide') !== WHY['iron oxide']) throw new Error('t179u iron oxide');
if (t179uWhyForName('iron oxide red')) throw new Error('t179u iron oxide red');
if (t179uWhyForName('Flavor') !== WHY.flavor) throw new Error('t179u case');
