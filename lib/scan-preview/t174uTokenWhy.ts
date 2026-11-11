import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHY: Record<string, string> = {
  "silica": "Silica is a mineral powder used as an anti-caking agent to keep powders from clumping. Some forms may contain nanoparticles that raise questions about absorption.",
  "silicon dioxide": "Silicon dioxide is a mineral powder used as an anti-caking agent to keep powders from clumping. Some forms may contain nanoparticles that raise questions about absorption.",
  "rice flour": "Rice flour is a simple milled flour from rice used as a filler. It is not the named rice hull or rice bran form. EFSA notes that highly processed starches can contribute to glycemic load.",
  "polyethylene glycol": "Polyethylene glycol is a synthetic polymer used as a solvent or plasticizer. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, which are recognized impurities of concern by the FDA and IARC.",
  "propylene glycol": "Propylene glycol is a synthetic solvent used to dissolve ingredients. The FDA lists it as GRAS for food use, but it is graded Limited in this system because it is a processed petrochemical derivative.",
  "modified cellulose gum": "Modified cellulose gum is a chemically processed form of cellulose used as a thickener or binder. It differs from unmodified cellulose fiber.",
  "sodium benzoate": "Sodium benzoate is a synthetic preservative. On its own it is low-risk, but when combined with vitamin C it can form trace benzene, a known carcinogen noted by the FDA.",
  "colloidal silicon dioxide": "Colloidal silicon dioxide is a fine mineral powder used as an anti-caking agent. Some colloidal forms may include nanoparticles that raise absorption questions.",
  "mannitol": "Mannitol is a sugar alcohol used as a sweetener or bulking agent. Large amounts commonly cause bloating or loose stools, as documented in clinical reviews.",
  "hydroxypropyl cellulose": "Hydroxypropyl cellulose is a chemically modified cellulose derivative used as a binder or coating. It is more processed than simple cellulose.",
  "flavor": "Flavor is an unnamed blend of flavor compounds. The label does not disclose the solvents or carriers inside the mixture.",
  "calcium silicate": "Calcium silicate is a mineral powder used as an anti-caking agent. It is a processed silicate form.",
  "alcohol": "Alcohol is a solvent used to carry other ingredients in liquid products. It is a processed form of ethanol.",
  "flavors": "Flavors is an unnamed blend of flavor compounds. The label does not disclose the solvents or carriers inside the mixture.",
  "xylitol": "Xylitol is a sugar alcohol used as a sweetener. Large amounts commonly cause bloating or loose stools, as documented in clinical reviews.",
  "natural and artificial flavors": "Natural and artificial flavors is a mixture of flavor compounds that may include both plant-derived and synthetic parts. The label does not list every component.",
  "medium chain triglycerides": "Medium chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils.",
  "edetate disodium": "Edetate disodium is an EDTA salt used in trace amounts as a stabilizer to bind metals. The FDA permits it in limited quantities.",
  "saccharin sodium": "Saccharin sodium is an artificial sweetener. Older studies linked high doses to bladder tumors in rats, though later reviews reduced the concern for humans; it remains a synthetic sweetener.",
  "polydextrose": "Polydextrose is a synthetic polymer of glucose used as a bulk sweetener and fiber. It is highly processed.",
  "stevia leaf extract": "Stevia leaf extract is a sweetener concentrated from the stevia plant. It is more refined than whole stevia leaf and is graded Limited unless it is the high-purity rebaudioside A form.",
  "potassium sorbate": "Potassium sorbate is a synthetic preservative. On its own it is low-risk, but when combined with vitamin C it can form trace benzene, a known carcinogen noted by the FDA.",
  "pharmaceutical ink": "Pharmaceutical ink is printing ink applied to tablets or capsules. The label rarely lists every pigment or solvent in the ink.",
  "fructose": "Fructose is a simple sugar used as a sweetener. Excess free fructose is associated with metabolic effects in multiple reviews.",
  "dextrin": "Dextrin is a starch breakdown product used as a filler or binder. It is a processed form of starch.",
  "carob": "Carob is a food ingredient from the carob pod used as a flavor or filler. It is a processed plant material.",
  "benzalkonium chloride": "Benzalkonium chloride is a quaternary ammonium preservative used in eye and nasal products. It is a synthetic antimicrobial.",
  "menthol": "Menthol is a cooling compound derived from mint or synthesized. On an inactive list it is not the primary drug.",
  "bamboo extract": "Bamboo extract is a plant-derived silica source used as a flow agent. It is a concentrated extract rather than whole bamboo.",
  "natural flavors": "Natural flavors is an unnamed blend of flavor compounds derived from natural sources. The label does not list the carriers or solvents.",
  "peppermint oil": "Peppermint oil is the essential oil distilled from peppermint leaves, used for scent or flavor.",
  "maltitol": "Maltitol is a sugar alcohol used as a sweetener. Large amounts commonly cause bloating or loose stools, as documented in clinical reviews.",
  "benzyl alcohol": "Benzyl alcohol is a preservative. High doses have caused gasping syndrome in newborns, though ordinary amounts in older children and adults are far below that threshold, per FDA notes.",
  "corn syrup": "Corn syrup is a sweetener made by processing corn starch. It is a refined carbohydrate.",
  "fragrance": "Fragrance is an unnamed scent blend. The label does not list the solvents or carriers inside the mixture.",
  "stevia": "Stevia is a sweetener from the stevia plant. The bare form is more refined than whole leaf and is graded Limited unless specified as high-purity rebaudioside A.",
  "isomalt": "Isomalt is a sugar alcohol used as a sweetener. Large amounts commonly cause bloating or loose stools, as documented in clinical reviews.",
  "iron oxide red": "Iron oxide red is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "simethicone": "Simethicone is a silicone-based anti-gas agent. On an other-ingredients line it is not the labeled active drug.",
  "sorbitol sorbitan solution": "Sorbitol sorbitan solution is an emulsifier blend. It is a processed form of sugar alcohols used to stabilize mixtures.",
  "alcohol denat.": "Alcohol denat. is denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking.",
  "ammonium hydroxide": "Ammonium hydroxide is a pH adjuster used in trace amounts. It is a processed alkaline compound.",
  "beta carotene (for color)": "Beta carotene here is used as a color, not as a vitamin dose. It is a purified pigment.",
  "isopropyl alcohol": "Isopropyl alcohol is a solvent used in some formulations. It is a synthetic alcohol.",
  "polyethylene glycol 400": "Polyethylene glycol 400 is a specific molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane.",
  "rice bran wax": "Rice bran wax is a wax extracted from rice bran and used as a coating or flow agent. It is a processed plant wax.",
  "gum base": "Gum base is an unnamed mixture of gums, resins, and waxes used in chewing products. The exact composition is rarely fully disclosed.",
  "annatto": "Annatto is a plant color from the achiote seed. Some people with chronic hives react to it, and high intakes of its pigment can approach the EFSA acceptable daily intake.",
  "iron oxide black": "Iron oxide black is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "sodium polyacrylate": "Sodium polyacrylate is a synthetic gel-forming polymer used as a thickener. It is a highly processed acrylate.",
  "phenoxyethanol": "Phenoxyethanol is a synthetic preservative used in topical products. It is a glycol ether.",
  "sorbitan": "Sorbitan is an emulsifier derived from sorbitol. It is a processed surfactant, not the sugar alcohol itself.",
  "acrylates/c10-30 alkyl acrylate crosspolymer": "Acrylates/c10-30 alkyl acrylate crosspolymer is a synthetic polymer used as a thickener in creams. It is a highly processed acrylate.",
  "blue spirulina (for color)": "Blue spirulina is an algae-derived pigment used as a color. It is a concentrated extract rather than whole spirulina.",
  "triethanolamine": "Triethanolamine is a synthetic pH adjuster used in creams. It is an amine compound.",
  "eucalyptus oil": "Eucalyptus oil is the essential oil distilled from eucalyptus leaves, used as a scent or inactive ingredient.",
  "aloe vera gel": "Aloe vera gel is the juice or gel from the aloe plant. It is a processed plant material.",
  "sugar alcohol": "Sugar alcohol is a class name for sweeteners such as xylitol or sorbitol. Large amounts commonly cause bloating or loose stools.",
  "steareth-21": "Steareth-21 is an ethoxylated fatty alcohol used as an emulsifier in cream bases. Ethoxylation can leave residual impurities.",
  "iron oxide yellow": "Iron oxide yellow is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "modified corn starch": "Modified corn starch is chemically processed corn starch used as a thickener or filler. It differs from plain corn starch.",
  "organic maltodextrin": "Organic maltodextrin is a starch-based bulk sweetener made from organic starch. It is still a highly processed carbohydrate.",
  "polyacrylic acid": "Polyacrylic acid is a synthetic polymer used as a thickener or gel former. It is a processed acrylate.",
  "aloe barbadensis leaf extract": "Aloe barbadensis leaf extract is a concentrated extract from the aloe plant used in topical or oral products.",
  "modified food starch": "Modified food starch is chemically processed starch used as a thickener or filler. It differs from plain starch.",
  "medium-chain triglycerides": "Medium-chain triglycerides are a processed fraction of fats, often from coconut or palm, used as a softgel fill or carrier. They are more refined than whole oils.",
  "ethylhexylglycerin": "Ethylhexylglycerin is a synthetic preservative booster and skin-conditioning agent. It is a glycol ether.",
  "hydrated silica": "Hydrated silica is a form of silica used as an anti-caking or abrasive agent. It is a mineral powder.",
  "red iron oxide": "Red iron oxide is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "steviol glycosides": "Steviol glycosides are the purified sweet compounds from the stevia plant. They are more refined than whole stevia leaf.",
  "yellow iron oxide": "Yellow iron oxide is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "glucose": "Glucose is a simple sugar used as a sweetener or filler. It is a basic carbohydrate.",
  "nonfat dry milk": "Nonfat dry milk is the dried skim milk powder used as a filler or allergen disclosure. It is a processed dairy ingredient.",
  "phosphoric acid": "Phosphoric acid is an acid used to set acidity in formulations. It is a processed mineral acid.",
  "calcium sulfate": "Calcium sulfate is a mineral salt used as a filler or to set acidity. It is a common food-grade mineral.",
  "honey": "Honey is a natural sweetener produced by bees. It is not recommended for infants under one year due to botulism risk.",
  "carmine": "Carmine is a red color made from cochineal insects. It can cause allergic reactions in some people.",
  "enteric coating": "Enteric coating is a delayed-release polymer coating applied to tablets so they dissolve later in the gut. It is a processed coating.",
  "methacrylic acid copolymer": "Methacrylic acid copolymer is a synthetic polymer used as an enteric coating. It is a processed acrylate.",
  "sorbitan monooleate": "Sorbitan monooleate is an emulsifier derived from sorbitol and oleic acid. It is a processed surfactant.",
  "tribasic sodium phosphate": "Tribasic sodium phosphate is a phosphate salt used as a mineral filler or buffering agent. It is not phosphoric acid.",
  "aminomethyl propanol": "Aminomethyl propanol is a synthetic pH adjuster used in cream or coating formulas. It is an amine compound.",
  "benzoic acid": "Benzoic acid is a preservative. On its own it is low-risk, but when combined with vitamin C it can form trace benzene, a known carcinogen noted by the FDA.",
  "carbomer homopolymer type c": "Carbomer homopolymer type c is a synthetic gel thickener. Current grades are not the older benzene-residue carbomers.",
  "dicetyl phosphate": "Dicetyl phosphate is a synthetic phosphate used in cream or coating formulas as an emulsifier or stabilizer.",
  "lemon oil": "Lemon oil is the essential oil pressed from lemon peel, used for scent or flavor.",
  "organic pea starch": "Organic pea starch is a starch filler from organic peas. It is not pea protein and is a refined carbohydrate.",
  "stevia extract": "Stevia extract is a concentrated sweetener from the stevia plant. It is more refined than whole leaf and is graded Limited unless it is the high-purity rebaudioside A form.",
  "vegetable capsule (hypromellose, gellan gum)": "Vegetable capsule (hypromellose, gellan gum) is a plant-based capsule shell made from cellulose and gellan. Reviews have found no genotoxicity or carcinogenicity.",
  "annatto extract (color)": "Annatto extract is a plant color from the achiote seed. Some people with chronic hives react to it, and high intakes of its pigment can approach the EFSA acceptable daily intake.",
  "camphor": "Camphor is a plant-derived compound used as a topical inactive for scent or cooling.",
  "corn syrup solids": "Corn syrup solids are the dried form of corn syrup used as a sweetener. It is a refined carbohydrate.",
  "ferric oxide yellow": "Ferric oxide yellow is a mineral pigment used as a color. It is not a synthetic FD&C dye, but mineral colors are still processed for use as colorants.",
  "organic tapioca maltodextrin": "Organic tapioca maltodextrin is a starch-based bulk sweetener made from organic tapioca. It is still a highly processed carbohydrate.",
  "sugar spheres": "Sugar spheres are small sugar cores used as a base in some tablets. They are a refined sugar form.",
  "ceteth-20 phosphate": "Ceteth-20 phosphate is an ethoxylated fatty alcohol phosphate used as an emulsifier in cream bases. Ethoxylation can leave residual impurities.",
  "coconut milk powder (coconut milk, cassava dextrin)": "Coconut milk powder (coconut milk, cassava dextrin) is a dried coconut milk blend that includes a starch carrier.",
  "organic annatto extract (color)": "Organic annatto extract is a plant color from the achiote seed. Some people with chronic hives react to it, and high intakes of its pigment can approach the EFSA acceptable daily intake.",
  "polyisobutylene": "Polyisobutylene is a synthetic polymer used in some formulations as a film former or adhesive.",
  "sd alcohol 40-b": "SD alcohol 40-B is a denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking.",
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact tokens from the t174u list only. Grades and notes stay as they are. */
export function t174uWhyForName(name: string): string | undefined {
  return WHY[norm(name)];
}

export function applyT174uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t174uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT174uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT174uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (Object.keys(WHY).length !== 100) throw new Error('t174u count');
const MUST_HAVE = [
  'silica',
  'hydrated silica',
  'silicon dioxide',
  'colloidal silicon dioxide',
  'alcohol',
  'alcohol denat.',
  'benzyl alcohol',
  'isopropyl alcohol',
  'flavor',
  'flavors',
  'natural flavors',
  'stevia',
  'stevia extract',
  'stevia leaf extract',
  'annatto',
  'annatto extract (color)',
];
const MUST_MISS = [
  'colloidal silica',
  'natural lemon flavor',
  'organic annatto',
];
for (const name of MUST_HAVE) {
  if (!WHY[name]) throw new Error(`t174u missing ${name}`);
}
for (const name of MUST_MISS) {
  if (WHY[name]) throw new Error(`t174u over-matched ${name}`);
}
if (WHY.silica === WHY['hydrated silica'] || WHY.silica === WHY['colloidal silicon dioxide']) throw new Error('t174u silica alias');
if (WHY.alcohol === WHY['benzyl alcohol'] || WHY.alcohol === WHY['alcohol denat.']) throw new Error('t174u alcohol alias');
if (WHY.flavor === WHY.flavors || WHY.flavor === WHY['natural flavors']) throw new Error('t174u flavor alias');
if (WHY.stevia === WHY['stevia extract'] || WHY.stevia === WHY['stevia leaf extract']) throw new Error('t174u stevia alias');
if (WHY.annatto === WHY['annatto extract (color)']) throw new Error('t174u annatto alias');
if (t174uWhyForName('Silica') !== WHY.silica) throw new Error('t174u case');
if (t174uWhyForName('hydrated silica') !== WHY['hydrated silica']) throw new Error('t174u hydrated silica');
if (t174uWhyForName('benzyl alcohol') !== WHY['benzyl alcohol']) throw new Error('t174u benzyl');
if (t174uWhyForName('natural flavors') !== WHY['natural flavors']) throw new Error('t174u natural flavors');
if (t174uWhyForName('colloidal silica')) throw new Error('t174u colloidal silica');
