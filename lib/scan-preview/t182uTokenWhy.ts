import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHY: Record<string, string> = {
  "medium chain triglycerides": "Medium chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils. The FDA lists medium-chain triglycerides as GRAS.",
  "carob": "Carob is a food ingredient from the carob pod used as a flavor or filler. It is a processed plant material. The FDA lists carob bean gum as GRAS.",
  "menthol": "Menthol is a cooling compound derived from mint or synthesized. On an inactive list it is not the primary drug. The FDA permits menthol as a flavoring substance.",
  "bamboo extract": "Bamboo extract is a plant-derived silica source used as a flow agent. It is a concentrated extract rather than whole bamboo. The FDA lists silica from bamboo as GRAS for anti-caking use.",
  "simethicone": "Simethicone is a silicone-based anti-gas agent. On an other-ingredients line it is not the labeled active drug. The FDA permits simethicone as an anti-foaming agent.",
  "sorbitol sorbitan solution": "Sorbitol sorbitan solution is an emulsifier blend. It is a processed form of sugar alcohols used to stabilize mixtures. The FDA lists sorbitan esters as GRAS.",
  "alcohol denat.": "Alcohol denat. is denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking. The FDA permits denatured alcohol as a solvent in certain formulations.",
  "isopropyl alcohol": "Isopropyl alcohol is a solvent used in some formulations. It is a synthetic alcohol. The FDA permits isopropyl alcohol as a solvent in limited applications.",
  "rice bran wax": "Rice bran wax is a wax extracted from rice bran and used as a coating or flow agent. It is a processed plant wax. The FDA lists rice bran wax as GRAS.",
  "gum base": "Gum base is an unnamed mixture of gums, resins, and waxes used in chewing products. The exact composition is rarely fully disclosed. The FDA regulates gum base under 21 CFR 172.615.",
  "sodium polyacrylate": "Sodium polyacrylate is a synthetic gel-forming polymer used as a thickener. It is a highly processed acrylate. The FDA permits sodium polyacrylate as an indirect food additive.",
  "sorbitan": "Sorbitan is an emulsifier derived from sorbitol. It is a processed surfactant, not the sugar alcohol itself. The FDA lists sorbitan esters as GRAS.",
  "acrylates/c10-30 alkyl acrylate crosspolymer": "Acrylates/c10-30 alkyl acrylate crosspolymer is a synthetic polymer used as a thickener in creams. It is a highly processed acrylate. The FDA permits acrylate copolymers as indirect food additives.",
  "blue spirulina (for color)": "Blue spirulina is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina. The FDA lists spirulina extract as a color additive.",
  "eucalyptus oil": "Eucalyptus oil is the essential oil distilled from eucalyptus leaves, used as a scent or inactive ingredient. It is a concentrated plant oil. The FDA permits eucalyptus oil as a flavoring substance.",
  "aloe vera gel": "Aloe vera gel is the juice or gel from the aloe plant. It is a processed plant material. The FDA lists aloe vera as GRAS.",
  "modified corn starch": "Modified corn starch is chemically processed corn starch used as a thickener or filler. It differs from plain corn starch. The FDA permits modified food starch as a food additive.",
  "organic maltodextrin": "Organic maltodextrin is a starch-based bulk sweetener made from organic starch. It is still a highly processed carbohydrate. The FDA lists maltodextrin as GRAS.",
  "polyacrylic acid": "Polyacrylic acid is a synthetic polymer used as a thickener or gel former. It is a processed acrylate. The FDA permits polyacrylic acid as an indirect food additive.",
  "modified food starch": "Modified food starch is chemically processed starch used as a thickener or filler. It differs from plain starch. The FDA permits modified food starch as a food additive.",
  "medium-chain triglycerides": "Medium-chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils. The FDA lists medium-chain triglycerides as GRAS.",
  "ethylhexylglycerin": "Ethylhexylglycerin is a synthetic preservative booster and skin-conditioning agent. It is a glycol ether. The FDA permits ethylhexylglycerin in cosmetic formulations.",
  "glucose": "Glucose is a simple sugar used as a sweetener or filler. It is a basic carbohydrate. The FDA lists glucose as GRAS.",
  "enteric coating": "Enteric coating is a delayed-release polymer coating applied to tablets so they dissolve later in the gut. It is a processed coating. The FDA permits methacrylic acid copolymers for enteric coatings.",
  "methacrylic acid copolymer": "Methacrylic acid copolymer is a synthetic polymer used as an enteric coating. It is a processed acrylate. The FDA permits methacrylic acid copolymers for enteric coatings.",
  "sorbitan monooleate": "Sorbitan monooleate is an emulsifier derived from sorbitol and oleic acid. It is a processed surfactant. The FDA lists sorbitan monooleate as GRAS.",
  "aminomethyl propanol": "Aminomethyl propanol is a synthetic pH adjuster used in cream or coating formulas. It is an amine compound. The FDA permits aminomethyl propanol in cosmetic formulations.",
  "dicetyl phosphate": "Dicetyl phosphate is a synthetic phosphate used in cream or coating formulas as an emulsifier or stabilizer. It is a processed phosphate ester. The FDA permits dicetyl phosphate as an emulsifier.",
  "lemon oil": "Lemon oil is the essential oil pressed from lemon peel, used for scent or flavor. It is a concentrated plant oil. The FDA permits lemon oil as a flavoring substance.",
  "organic pea starch": "Organic pea starch is a starch filler from organic peas. It is not pea protein and is a refined carbohydrate. The FDA lists pea starch as GRAS.",
  "camphor": "Camphor is a plant-derived compound used as a topical inactive for scent or cooling. It is a concentrated plant extract. The FDA permits camphor as a topical agent.",
  "corn syrup solids": "Corn syrup solids are the dried form of corn syrup used as a sweetener. It is a refined carbohydrate. The FDA lists corn syrup solids as GRAS.",
  "organic tapioca maltodextrin": "Organic tapioca maltodextrin is a starch-based bulk sweetener made from organic tapioca. It is still a highly processed carbohydrate. The FDA lists maltodextrin as GRAS.",
  "sugar spheres": "Sugar spheres are small sugar cores used as a base in some tablets. They are a refined sugar form. The FDA lists sucrose as GRAS.",
  "sd alcohol 40-b": "SD alcohol 40-B is a denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking. The FDA permits SD alcohol 40-B as a solvent.",
  "c30-45 alkyl cetearyl dimethicone crosspolymer": "C30-45 alkyl cetearyl dimethicone crosspolymer is a synthetic silicone polymer used in cream or coating formulas. It is a processed dimethicone derivative. The FDA permits dimethicone crosspolymers in cosmetic formulations.",
  "caprylyl methicone": "Caprylyl methicone is a synthetic silicone used in cream or coating formulas as a conditioning agent. It is a processed silicone. The FDA permits methicones in cosmetic formulations.",
  "sunflower seed oil": "Sunflower seed oil is a seed oil used in some bases. Seed oils are refined and graded Limited under the current rules. The FDA lists sunflower oil as GRAS.",
  "trolamine": "Trolamine is a synthetic pH adjuster. It is an amine compound, also known as triethanolamine. The FDA permits triethanolamine in cosmetic formulations.",
  "dextrates": "Dextrates are a starch sugar used as a filler. They are a processed carbohydrate form. The FDA lists dextrates as GRAS.",
  "paraffin": "Paraffin is a mineral-oil-derived wax used as a coating or base. It is a refined petroleum product. The FDA permits paraffin as a coating agent.",
  "caprylyl glycol": "Caprylyl glycol is a synthetic skin-conditioning agent and preservative booster. It is a glycol. The FDA permits caprylyl glycol in cosmetic formulations.",
  "clove oil": "Clove oil is the essential oil distilled from clove buds, used as a scent or inactive ingredient. It is a concentrated plant oil. The FDA permits clove oil as a flavoring substance.",
  "hydroxyacetophenone": "Hydroxyacetophenone is a synthetic antioxidant used in creams. It is a processed phenolic compound. The FDA permits hydroxyacetophenone in cosmetic formulations.",
  "maltodextrin": "Maltodextrin is a starch-based bulk sweetener. It is a highly processed carbohydrate. The FDA lists maltodextrin as GRAS.",
  "sorbitol sorbitan": "Sorbitol sorbitan is an emulsifier blend derived from sugar alcohols. It is a processed surfactant. The FDA lists sorbitan esters as GRAS.",
  "caprylic/capric triglyceride": "Caprylic/capric triglyceride is a medium-chain triglyceride used as a softgel fill or carrier. It is a processed fraction of fats. The FDA lists medium-chain triglycerides as GRAS.",
  "spirulina extract (color)": "Spirulina extract is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina. The FDA lists spirulina extract as a color additive.",
  "calcium polycarbophil": "Calcium polycarbophil is a synthetic fiber used as an inactive bulk. It is a processed polycarbophil salt. The FDA permits calcium polycarbophil as a bulk-forming agent.",
  "dextrose excipient": "Dextrose excipient is a simple sugar used as a filler or binder. It is a basic carbohydrate. The FDA lists dextrose as GRAS.",
  "hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer": "Hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer is a synthetic polymer used as a thickener in creams. It is a processed acrylate. The FDA permits acrylate copolymers as indirect food additives.",
  "light mineral oil": "Light mineral oil is a refined petroleum-derived oil used as a base or coating. It is a processed mineral oil. The FDA permits light mineral oil as a food additive.",
  "soybean oil": "Soybean oil is a seed oil used as a base. When it is the base of a gummy you are chewing the oil; seed oils are graded Avoid in that form under the current rules. The FDA lists soybean oil as GRAS.",
  "aluminum glycinate": "Aluminum glycinate is a synthetic aluminum compound used in cream or coating formulas as a buffering agent. It is a processed aluminum salt. The FDA permits aluminum compounds as indirect food additives.",
  "dihydroxyaluminum aminoacetate": "Dihydroxyaluminum aminoacetate is a synthetic aluminum compound used in cream or coating formulas as a buffering agent. It is a processed aluminum salt. The FDA permits aluminum compounds as indirect food additives.",
  "rosemary oil": "Rosemary oil is the essential oil distilled from rosemary, used as a scent or inactive ingredient. It is a concentrated plant oil. The FDA permits rosemary oil as a flavoring substance.",
  "spirulina extract": "Spirulina extract is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina. The FDA lists spirulina extract as a color additive.",
  "0.25% w/w phenylethyl alcohol": "Phenylethyl alcohol is a solvent used in small amounts. It is a synthetic alcohol. The FDA permits phenylethyl alcohol as a flavoring substance.",
  "aluminum hydroxide": "Aluminum hydroxide is listed as an inactive ingredient, not as a swallowed antacid. It is a mineral compound used as a buffering agent. The FDA permits aluminum hydroxide as an indirect food additive.",
  "aminomethylpropanol": "Aminomethylpropanol is a synthetic pH adjuster used in cream or coating formulas. It is an amine compound. The FDA permits aminomethylpropanol in cosmetic formulations.",
  "medium chain triglyceride oil": "Medium chain triglyceride oil is a processed fraction of fats used as a softgel or liquid fill. It is more refined than whole oils. The FDA lists medium-chain triglycerides as GRAS.",
  "natural mixed berry flavor": "Natural mixed berry flavor is a named fruit flavor blend. It is not a fully unnamed flavor mixture. FDA 21 CFR 101.22 does not require full component disclosure for named flavors.",
  "organic stevia (leaf) extract": "Organic stevia (leaf) extract is a sweetener concentrated from the stevia plant. It is more refined than whole leaf. High-purity steviol glycosides have FDA GRAS status.",
  "peppermint flavor": "Peppermint flavor is a named mint flavor. FDA 21 CFR 101.22 does not require full component disclosure for named flavors.",
  "polyvinyl acetate phthalate": "Polyvinyl acetate phthalate is a synthetic polymer used as an enteric coating. It is a processed acrylate. The FDA permits polyvinyl acetate phthalate for enteric coatings.",
  "sodium pyruvate": "Sodium pyruvate is a salt used as an inactive ingredient. It is the sodium salt of pyruvic acid. The FDA permits sodium pyruvate as a food additive.",
  "cajuput oil": "Cajuput oil is the essential oil distilled from cajuput leaves, used as a scent or inactive ingredient. It is a concentrated plant oil. The FDA permits cajuput oil as a flavoring substance.",
  "dextrose anhydrous": "Dextrose anhydrous is a simple sugar used as a filler. It is a basic carbohydrate. The FDA lists dextrose as GRAS.",
  "ethyl acetate": "Ethyl acetate is a flavor solvent. It is a synthetic ester used in small amounts. The FDA permits ethyl acetate as a flavoring solvent.",
  "mica-based pearlescent pigment": "Mica-based pearlescent pigment is a mineral pigment used for shine. It is a processed mica form. The FDA permits mica as a color additive.",
  "modified cellulose": "Modified cellulose is a chemically processed form of cellulose used as a binder or thickener. It differs from unmodified cellulose fiber. The FDA lists modified cellulose as GRAS.",
  "organic cherry flavor": "Organic cherry flavor is a named fruit flavor. FDA 21 CFR 101.22 does not require full component disclosure for named flavors.",
  "tapioca dextrose": "Tapioca dextrose is a simple sugar derived from tapioca, used as a filler. It is a basic carbohydrate. The FDA lists dextrose as GRAS.",
  "tapioca maltodextrin": "Tapioca maltodextrin is a starch-based bulk sweetener. It is a highly processed carbohydrate. The FDA lists maltodextrin as GRAS.",
  "thymol": "Thymol is a plant-derived phenolic compound used as a scent or inactive ingredient. It is a concentrated plant extract. The FDA permits thymol as a flavoring substance.",
  "vanillyl butyl ether": "Vanillyl butyl ether is a warming agent used in creams. It is a synthetic phenolic ether. The FDA permits vanillyl butyl ether in cosmetic formulations.",
  "vitamin e acetate": "Vitamin E acetate is a vitamin E ester used as an antioxidant. It is the acetate form of tocopherol. The FDA lists tocopheryl acetate as GRAS.",
  "acetone": "Acetone is a solvent used in some formulations. It is a synthetic ketone. The FDA permits acetone as a solvent in limited applications.",
  "agar agar": "Agar agar is a food gum or seaweed gel used to thicken. The FDA lists agar as GRAS.",
  "aluminum silicate": "Aluminum silicate is a mineral compound used as an anti-caking or thickening agent. The FDA lists aluminum silicate as GRAS.",
  "anhydrous lactose": "Anhydrous lactose is a milk sugar used as a filler. The FDA lists lactose as GRAS.",
  "annatto (color)": "Annatto (color) is a plant color from the achiote seed. Some people with chronic hives react to it; the EFSA has set an ADI for its pigment.",
  "beeswax and/or carnauba wax": "Beeswax and/or carnauba wax is a plant wax used as a coating. The FDA lists beeswax and carnauba wax as GRAS.",
  "beta carotene": "Beta carotene here is used as a color, not as a vitamin dose. It is a purified pigment. The FDA lists beta-carotene as a color additive.",
  "carnauba leaf wax": "Carnauba leaf wax is a plant wax used as a coating. The FDA lists carnauba wax as GRAS.",
  "cherry flavor": "Cherry flavor is a named fruit flavor. FDA 21 CFR 101.22 does not require full component disclosure for named flavors.",
  "grain alcohol": "Grain alcohol is a solvent used to carry other ingredients. It is a processed form of ethanol. The FDA permits grain alcohol as a solvent.",
  "huito extract": "Huito extract is a plant color from the huito fruit. The FDA lists huito extract as a color additive.",
  "mentha oil": "Mentha oil is the essential oil from mint, used as a scent or inactive ingredient. It is a concentrated plant oil. The FDA permits mentha oil as a flavoring substance.",
  "mono- and diglycerides": "Mono- and diglycerides are emulsifiers derived from fats. They are processed partial glycerides. The FDA lists mono- and diglycerides as GRAS.",
  "natural and artificial flavor": "Natural and artificial flavor is a mixture of flavor compounds. The label does not list every component. FDA 21 CFR 101.22 does not require full component disclosure.",
  "natural and artificial icy mint cooling flavor": "Natural and artificial icy mint cooling flavor is a mixture of flavor compounds. The label does not list every component. FDA 21 CFR 101.22 does not require full component disclosure.",
  "natural and artificial icy mint flavor": "Natural and artificial icy mint flavor is a mixture of flavor compounds. The label does not list every component. FDA 21 CFR 101.22 does not require full component disclosure.",
  "natural and artificial mint flavor": "Natural and artificial mint flavor is a mixture of flavor compounds. The label does not list every component. FDA 21 CFR 101.22 does not require full component disclosure.",
  "natural and artificial orange flavor": "Natural and artificial orange flavor is a mixture of flavor compounds. The label does not list every component. FDA 21 CFR 101.22 does not require full component disclosure.",
  "octyldodecanol": "Octyldodecanol is a synthetic alcohol used as an emollient. The Cosmetic Ingredient Review has found it safe as used.",
  "oleoresin turmeric": "Oleoresin turmeric is a plant color from turmeric. It is a concentrated extract rather than whole turmeric. The FDA lists turmeric oleoresin as a color additive.",
  "organic cinnamon powder": "Organic cinnamon powder is a named spice powder from cinnamon. The FDA lists cinnamon as GRAS.",
  "organic lemon oil": "Organic lemon oil is the essential oil pressed from organic lemon peel. It is a concentrated plant oil. The FDA permits lemon oil as a flavoring substance.",
  "peg 400": "PEG 400 is a specific molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact tokens from the t182u list only. Grades and notes stay as they are. */
export function t182uWhyForName(name: string): string | undefined {
  return WHY[norm(name)];
}

export function applyT182uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t182uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT182uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT182uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (Object.keys(WHY).length !== 100) throw new Error('t182u count');
const MUST_HAVE = [
  "medium chain triglycerides",
  "medium-chain triglycerides",
  "medium chain triglyceride oil",
  "aloe vera gel",
  "sorbitan",
  "sorbitan monooleate",
  "sorbitol sorbitan",
  "sorbitol sorbitan solution",
  "spirulina extract",
  "spirulina extract (color)",
  "blue spirulina (for color)",
  "aminomethyl propanol",
  "aminomethylpropanol",
  "maltodextrin",
  "organic maltodextrin",
  "organic tapioca maltodextrin",
  "tapioca maltodextrin",
  "alcohol denat.",
  "isopropyl alcohol",
  "grain alcohol",
  "sd alcohol 40-b",
  "modified cellulose",
  "lemon oil",
  "organic lemon oil",
  "natural and artificial flavor",
  "carnauba leaf wax",
  "beeswax and/or carnauba wax",
  "light mineral oil",
  "dextrose anhydrous",
  "dextrose excipient",
  "tapioca dextrose",
  "modified corn starch",
  "modified food starch",
  "peppermint flavor",
  "cherry flavor",
  "organic cherry flavor",
  "peg 400",
  "vitamin e acetate",
  "beta carotene",
  "annatto (color)",
  "menthol",
  "mentha oil",
  "0.25% w/w phenylethyl alcohol",
  "agar agar",
  "anhydrous lactose",
  "sunflower seed oil",
  "soybean oil",
  "rice bran wax",
  "organic cinnamon powder",
  "natural mixed berry flavor",
  "organic stevia (leaf) extract",
  "mono- and diglycerides",
  "enteric coating",
  "caprylyl glycol",
  "caprylyl methicone",
  "mica-based pearlescent pigment",
];
const MUST_MISS = [
  "aloe",
  "alcohol",
  "modified cellulose gum",
  "natural flavor",
  "natural flavors",
  "carnauba wax",
  "mineral oil",
  "dextrose",
  "corn starch",
  "food starch",
  "peg",
  "polyethylene glycol",
  "vitamin e",
  "beta-carotene",
  "annatto",
  "phenylethyl alcohol",
  "agar",
  "lactose",
  "sunflower oil",
  "soy oil",
  "rice bran",
  "cellulose",
  "organic cinnamon",
  "mixed berry flavor",
  "organic stevia extract",
  "monoglycerides",
  "beeswax",
  "mica",
];
for (const name of MUST_HAVE) {
  if (!WHY[name]) throw new Error(`t182u missing ${name}`);
}
for (const name of MUST_MISS) {
  if (WHY[name]) throw new Error(`t182u over-matched ${name}`);
}
if (t182uWhyForName('medium chain triglycerides') !== WHY['medium chain triglycerides']) throw new Error('t182u mct');
if (t182uWhyForName('medium-chain triglycerides') !== WHY['medium-chain triglycerides']) throw new Error('t182u mct hyphen');
if (t182uWhyForName('medium chain triglyceride oil') !== WHY['medium chain triglyceride oil']) throw new Error('t182u mct oil');
if (t182uWhyForName('aloe')) throw new Error('t182u aloe');
if (t182uWhyForName('aloe vera gel') !== WHY['aloe vera gel']) throw new Error('t182u aloe vera gel');
if (t182uWhyForName('spirulina extract') !== WHY['spirulina extract']) throw new Error('t182u spirulina');
if (t182uWhyForName('spirulina extract (color)') !== WHY['spirulina extract (color)']) throw new Error('t182u spirulina color');
if (t182uWhyForName('aminomethyl propanol') !== WHY['aminomethyl propanol']) throw new Error('t182u aminomethyl propanol');
if (t182uWhyForName('aminomethylpropanol') !== WHY.aminomethylpropanol) throw new Error('t182u aminomethylpropanol');
if (t182uWhyForName('maltodextrin') !== WHY.maltodextrin) throw new Error('t182u maltodextrin');
if (t182uWhyForName('organic maltodextrin') !== WHY['organic maltodextrin']) throw new Error('t182u organic maltodextrin');
if (t182uWhyForName('natural flavors')) throw new Error('t182u natural flavors');
if (t182uWhyForName('modified cellulose gum')) throw new Error('t182u modified cellulose gum');
if (t182uWhyForName('phenylethyl alcohol')) throw new Error('t182u phenylethyl alcohol');
if (t182uWhyForName('0.25% w/w phenylethyl alcohol') !== WHY['0.25% w/w phenylethyl alcohol']) throw new Error('t182u phenylethyl pct');
