import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHY: Record<string, string> = {
  "peg-100 stearate": "PEG-100 stearate is a polyethylene glycol ester used as an emulsifier. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "polyethylene glycol (peg) 400": "Polyethylene glycol (PEG) 400 is a specific molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "polyethylene glycol 6000": "Polyethylene glycol 6000 is a high-molecular-weight form of polyethylene glycol used as a binder or plasticizer. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "polyethylene glycol-400 usp": "Polyethylene glycol-400 USP is a specific molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "propylene glycol usp": "Propylene glycol USP is a synthetic solvent used in formulations. The FDA lists propylene glycol as GRAS.",
  "riboflavin": "Riboflavin is a B vitamin used as a nutrient or color.",
  "silica (silicon dioxide)": "Silica (silicon dioxide) is an anti-caking powder that keeps ingredients from clumping.",
  "silicon dioxide (colloidal)": "Silicon dioxide (colloidal) is an anti-caking powder that keeps ingredients from clumping.",
  "simethicone emulsion": "Simethicone emulsion is a silicone-based anti-gas agent. On an other-ingredients line it is not the labeled active drug. The FDA permits simethicone as an anti-foaming agent.",
  "sodium copper chlorophyllin": "Sodium copper chlorophyllin is a copper color complex used as a pigment.",
  "sodium stearyl fumarate": "Sodium stearyl fumarate is a lubricant in the stearate family used in tablet manufacturing.",
  "sunflower seed wax": "Sunflower seed wax is a plant wax used as a coating or flow agent.",
  "watermelon extract": "Watermelon extract is a named plant extract used as a color.",
  "3-((l-menthyl)oxy)propane-1,2-diol (menthoxypropanediol)": "3-((L-menthyl)oxy)propane-1,2-diol (menthoxypropanediol) is a cooling agent derived from menthol.",
  "carbomer interpolymer type a": "Carbomer interpolymer type A is a synthetic polymer used as a thickener. The Cosmetic Ingredient Review has found carbomers safe as used.",
  "ceteth-20": "Ceteth-20 is a fatty-alcohol ether used as an emulsifier. Ethoxylation can leave residual impurities; the FDA notes residual concerns with ethoxylated ingredients.",
  "chlorocresol": "Chlorocresol is a preservative used in topical formulations. The FDA permits chlorocresol in limited concentrations.",
  "citrate salt": "Citrate salt is a citric acid salt used to set acidity or as a filler.",
  "colloidal silica": "Colloidal silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption; the FDA notes particle-size considerations for silica.",
  "colors from fruits and vegetables": "Colors from fruits and vegetables is a plant-derived color blend.",
  "cyclomethicone": "Cyclomethicone is a silicone solvent used in cream formulations. The Cosmetic Ingredient Review has found it safe as used.",
  "dimethyl isosorbide": "Dimethyl isosorbide is a solvent used in cream formulas. It is a synthetic isosorbide derivative. The FDA permits dimethyl isosorbide in cosmetic formulations.",
  "dl-tartaric acid": "DL-tartaric acid is an organic acid used to set acidity.",
  "enteric coating (cellulose and methacrylate)": "Enteric coating (cellulose and methacrylate) is a delayed-release polymer coating applied to tablets. It is a processed coating. The FDA permits methacrylic acid copolymers for enteric coatings.",
  "essential oil of lemon grass": "Essential oil of lemon grass is the essential oil distilled from lemongrass, used as a scent or inactive ingredient.",
  "ferrosoferric oxide": "Ferrosoferric oxide is a mineral pigment used as a color. The FDA permits iron oxides as color additives in limited amounts.",
  "frankincense / boswellia oil": "Frankincense / boswellia oil is a plant oil used as a scent or inactive ingredient.",
  "glyceryl monostearate": "Glyceryl monostearate is a wax-like emulsifier used in creams and coatings.",
  "grape juice concentrate": "Grape juice concentrate is a named fruit juice used as a plant color.",
  "isopropyl myristate": "Isopropyl myristate is an emollient ester used in cream bases.",
  "isopulegol": "Isopulegol is a fragrance ingredient derived from plants or synthesized.",
  "lime oil": "Lime oil is the essential oil pressed from lime peel, used for scent or flavor. It is a concentrated plant oil. The FDA permits lime oil as a flavoring substance.",
  "menthyl ethylamido oxalate": "Menthyl ethylamido oxalate is a cooling agent used in formulations.",
  "natural and artificial bubblegum flavors": "Natural and artificial bubblegum flavors is a mixture of flavor compounds. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural and artificial mint and peppermint flavors": "Natural and artificial mint and peppermint flavors is a mixture of flavor compounds. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural color": "Natural color is an unnamed plant color. The label does not name the specific plant source. FDA 21 CFR 101.22 does not require full component disclosure for colors.",
  "natural pineapple flavor with other natural flavors": "Natural pineapple flavor with other natural flavors is a named fruit flavor blend that includes additional natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "organic lemon flavor": "Organic lemon flavor is a named fruit flavor. FDA 21 CFR 101.22 does not require full component disclosure for named flavors.",
  "paprika extract (color)": "Paprika extract (color) is a named plant color from paprika.",
  "peg-400": "PEG-400 is a specific molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "pentaerythrityl tetra-di-t-butyl hydroxyhydrocinnamate": "Pentaerythrityl tetra-di-t-butyl hydroxyhydrocinnamate is an antioxidant used in formulations.",
  "polyvinyl acetate": "Polyvinyl acetate is a synthetic polymer used as a film former or coating. The FDA permits polyvinyl acetate as an indirect food additive.",
  "reb m (from stevia extract)": "Reb M (from stevia extract) is a high-purity steviol glycoside from the stevia plant.",
  "sd alcohol 38-b": "SD alcohol 38-B is a denatured alcohol used as a solvent. It is processed ethanol with additives that make it unfit for drinking. The FDA permits SD alcohol 38-B as a solvent.",
  "sodium cetearyl sulfate": "Sodium cetearyl sulfate is a surfactant used as an emulsifier in cream bases.",
  "sodium hypochlorite": "Sodium hypochlorite is a residual oxidizer used in some formulations. It is a chlorine-based compound. The FDA permits sodium hypochlorite in limited concentrations.",
  "sodium lauroyl sarcosinate": "Sodium lauroyl sarcosinate is a surfactant used as a cleansing or foaming agent. The FDA permits sodium lauroyl sarcosinate in cosmetic formulations.",
  "sorbitan oleate": "Sorbitan oleate is an emulsifier derived from sorbitol and oleic acid. It is a processed surfactant. The FDA lists sorbitan esters as GRAS.",
  "sorbitan sesquioleate": "Sorbitan sesquioleate is an emulsifier derived from sorbitol and oleic acid. It is a processed surfactant. The FDA lists sorbitan esters as GRAS.",
  "succinic acid": "Succinic acid is an organic acid used as a pH adjuster or flavor.",
  "terpene resin": "Terpene resin is a plant-derived resin used as a film former.",
  "tert-butyl alcohol": "Tert-butyl alcohol is a synthetic alcohol used as a solvent.",
  "thyme oil": "Thyme oil is the essential oil distilled from thyme, used as a scent or inactive ingredient. The FDA permits thyme oil as a flavoring substance.",
  "thymus mastichina flowering-top oil": "Thymus mastichina flowering-top oil is a plant oil used as a scent or inactive ingredient.",
  "vanilla flavor": "Vanilla flavor is a named flavor derived from vanilla.",
  "witch hazel": "Witch hazel is a plant extract used as a toner or inactive ingredient.",
  "artificial berry flavor": "Artificial berry flavor is a synthetic flavor blend. FDA 21 CFR 101.22 does not require full component disclosure for flavors.",
  "ascorbic acid": "Ascorbic acid is vitamin C used as a nutrient or antioxidant.",
  "benzaldehyde": "Benzaldehyde is a flavor compound with a cherry-almond scent. It is a synthetic aldehyde. The FDA permits benzaldehyde as a flavoring substance.",
  "bitter orange peel (citrus aurantium) essential oil": "Bitter orange peel (citrus aurantium) essential oil is the essential oil pressed from bitter orange peel.",
  "black carrot extract": "Black carrot extract is a named plant extract used as a color.",
  "capsaicin": "Capsaicin is a compound from chili peppers used for warming sensation. The FDA permits capsaicin as a topical agent.",
  "ceteareth-20": "Ceteareth-20 is a fatty-alcohol ether used as an emulsifier. Ethoxylation can leave residual impurities; the FDA notes residual concerns with ethoxylated ingredients.",
  "cinnamon powder": "Cinnamon powder is a named spice powder from cinnamon.",
  "clove powder": "Clove powder is a named spice powder from clove.",
  "coconut and canola oil": "Coconut and canola oil is a seed oil blend used as a base. When it is the base of a gummy you are chewing the oil; seed oils are graded Avoid in that form under the current rules. The FDA lists canola oil as GRAS.",
  "copovidone": "Copovidone is a tablet binder made from polyvinylpyrrolidone and vinyl acetate.",
  "corn oil": "Corn oil is a seed oil used in a fiber wafer form. It is not the gummy base form. The FDA lists corn oil as GRAS.",
  "decyl glucoside": "Decyl glucoside is a mild surfactant derived from glucose and coconut.",
  "glyceryl stearate citrate": "Glyceryl stearate citrate is an emulsifier used in cream bases.",
  "glycol stearate": "Glycol stearate is an emulsifier used in cream bases.",
  "grape powder (for color)": "Grape powder (for color) is a named grape color.",
  "hibiscus extract & carrot extract (for color)": "Hibiscus extract & carrot extract (for color) is a named plant color blend.",
  "hydroxyproyl cellulose": "Hydroxypropyl cellulose is a processed cellulose derivative used as a binder or coating. The FDA lists hydroxypropyl cellulose as GRAS.",
  "hypromellose phthalate": "Hypromellose phthalate is a synthetic polymer used as an enteric coating. The FDA permits hypromellose phthalate for enteric coatings.",
  "juniper oil": "Juniper oil is the essential oil distilled from juniper, used as a scent or inactive ingredient.",
  "lavandula angustifolia (lavender) oil": "Lavandula angustifolia (lavender) oil is the essential oil distilled from lavender.",
  "maize maltodextrin": "Maize maltodextrin is a starch-based bulk sweetener. It is a highly processed carbohydrate. The FDA lists maltodextrin as GRAS.",
  "malodextrin": "Malodextrin is the literal misspelling of maltodextrin. It is a starch-based bulk sweetener. The FDA lists maltodextrin as GRAS.",
  "meglumine": "Meglumine is a sugar-derived solvent used as an inactive ingredient. The FDA permits meglumine as a pharmaceutical excipient.",
  "menthol-dl": "Menthol-dl is a cooling compound derived from mint or synthesized. On an inactive list it is not the primary drug. The FDA permits menthol as a flavoring substance.",
  "menthoxypropanediol": "Menthoxypropanediol is a cooling agent derived from menthol.",
  "menthyl lactate": "Menthyl lactate is a cooling ester derived from menthol.",
  "methacrylic acid copolymer type c": "Methacrylic acid copolymer type C is a synthetic polymer used as an enteric coating. The FDA permits methacrylic acid copolymers for enteric coatings.",
  "middle chain triglycerides": "Middle chain triglycerides are a processed fraction of fats used as a softgel or liquid fill. They are more refined than whole oils. The FDA lists medium-chain triglycerides as GRAS.",
  "natural and artificial berry flavor": "Natural and artificial berry flavor is a mixture of flavor compounds. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural and artificial citrus flavor": "Natural and artificial citrus flavor is a mixture of flavor compounds. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural and artificial grape flavor": "Natural and artificial grape flavor is a mixture of flavor compounds. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural citrus extract": "Natural citrus extract is a plant extract from citrus.",
  "non-silicone foam control agent": "Non-silicone foam control agent is an anti-foaming agent used in formulations. The FDA permits non-silicone foam control agents as food additives.",
  "nutmeg powder": "Nutmeg powder is a named spice powder from nutmeg.",
  "oat": "Oat is a named grain ingredient used as a fiber or filler.",
  "oat hull fiber": "Oat hull fiber is a food fiber from oat hulls.",
  "organic beet sugar": "Organic beet sugar is a sugar from organic beets used as a sweetener. The FDA lists beet sugar as GRAS.",
  "organic coconut milk powder (organic: coconut milk, cassava dextrin)": "Organic coconut milk powder (organic: coconut milk, cassava dextrin) is a named coconut milk powder with cassava dextrin.",
  "organic rice meal": "Organic rice meal is a rice-derived ingredient used as a filler.",
  "organic stevia leaf extract (rebaudioside a)": "Organic stevia leaf extract (rebaudioside A) is a stevia extract containing rebaudioside A. High-purity steviol glycosides have FDA GRAS status.",
  "organic yellow beeswax": "Organic yellow beeswax is a plant wax used as a coating or base.",
  "palm oil": "Palm oil is a seed oil used as a base. When it is the base of a gummy you are chewing the oil; seed oils are graded Avoid in that form under the current rules. The FDA lists palm oil as GRAS.",
  "paprika (color)": "Paprika (color) is a named plant color from paprika.",
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact tokens from the t183u list only. Grades and notes stay as they are. */
export function t183uWhyForName(name: string): string | undefined {
  return WHY[norm(name)];
}

export function applyT183uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t183uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT183uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT183uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (Object.keys(WHY).length !== 100) throw new Error('t183u count');
const MUST_HAVE = [
  "menthoxypropanediol",
  "3-((l-menthyl)oxy)propane-1,2-diol (menthoxypropanediol)",
  "paprika (color)",
  "paprika extract (color)",
  "oat",
  "oat hull fiber",
  "peg-400",
  "peg-100 stearate",
  "polyethylene glycol (peg) 400",
  "polyethylene glycol-400 usp",
  "polyethylene glycol 6000",
  "hydroxyproyl cellulose",
  "simethicone emulsion",
  "silicon dioxide (colloidal)",
  "silica (silicon dioxide)",
  "colloidal silica",
  "cinnamon powder",
  "clove powder",
  "corn oil",
  "coconut and canola oil",
  "menthol-dl",
  "middle chain triglycerides",
  "maize maltodextrin",
  "malodextrin",
  "sorbitan oleate",
  "sorbitan sesquioleate",
  "sd alcohol 38-b",
  "lime oil",
  "thyme oil",
  "thymus mastichina flowering-top oil",
  "glyceryl monostearate",
  "glyceryl stearate citrate",
  "menthyl lactate",
  "menthyl ethylamido oxalate",
  "ceteth-20",
  "ceteareth-20",
  "enteric coating (cellulose and methacrylate)",
  "palm oil",
  "vanilla flavor",
  "organic lemon flavor",
  "organic yellow beeswax",
  "sunflower seed wax",
  "riboflavin",
  "ascorbic acid",
  "juniper oil",
  "natural color",
  "natural citrus extract",
  "organic beet sugar",
  "organic rice meal",
  "organic stevia leaf extract (rebaudioside a)",
  "reb m (from stevia extract)",
  "propylene glycol usp",
];
const MUST_MISS = [
  "paprika",
  "oat fiber",
  "peg 400",
  "peg",
  "polyethylene glycol",
  "hydroxypropyl cellulose",
  "simethicone",
  "silicon dioxide",
  "organic cinnamon powder",
  "clove oil",
  "canola oil",
  "menthol",
  "medium chain triglycerides",
  "maltodextrin",
  "sorbitan",
  "sd alcohol 40-b",
  "lemon oil",
  "glyceryl stearate",
  "enteric coating",
  "palm",
  "natural flavors",
  "beeswax",
  "sunflower seed oil",
  "citric acid",
  "propylene glycol",
];
for (const name of MUST_HAVE) {
  if (!WHY[name]) throw new Error(`t183u missing ${name}`);
}
for (const name of MUST_MISS) {
  if (WHY[name]) throw new Error(`t183u over-matched ${name}`);
}
if (t183uWhyForName('menthoxypropanediol') !== WHY.menthoxypropanediol) throw new Error('t183u menthoxypropanediol');
if (t183uWhyForName('3-((l-menthyl)oxy)propane-1,2-diol (menthoxypropanediol)') !== WHY['3-((l-menthyl)oxy)propane-1,2-diol (menthoxypropanediol)']) throw new Error('t183u l-menthyl');
if (WHY.menthoxypropanediol === WHY['3-((l-menthyl)oxy)propane-1,2-diol (menthoxypropanediol)']) throw new Error('t183u menthoxy alias');
if (t183uWhyForName('paprika (color)') !== WHY['paprika (color)']) throw new Error('t183u paprika color');
if (t183uWhyForName('paprika extract (color)') !== WHY['paprika extract (color)']) throw new Error('t183u paprika extract');
if (t183uWhyForName('paprika')) throw new Error('t183u paprika');
if (t183uWhyForName('oat') !== WHY.oat) throw new Error('t183u oat');
if (t183uWhyForName('oat hull fiber') !== WHY['oat hull fiber']) throw new Error('t183u oat hull');
if (t183uWhyForName('oat fiber')) throw new Error('t183u oat fiber');
if (t183uWhyForName('peg-400') !== WHY['peg-400']) throw new Error('t183u peg-400');
if (t183uWhyForName('peg 400')) throw new Error('t183u peg 400');
if (t183uWhyForName('hydroxyproyl cellulose') !== WHY['hydroxyproyl cellulose']) throw new Error('t183u hydroxyproyl');
if (t183uWhyForName('hydroxypropyl cellulose')) throw new Error('t183u hydroxypropyl');
if (!WHY['hydroxyproyl cellulose'].includes('Hydroxypropyl')) throw new Error('t183u hydroxypropyl text');
if (!WHY['3-((l-menthyl)oxy)propane-1,2-diol (menthoxypropanediol)'].includes('L-menthyl')) throw new Error('t183u L-menthyl case');
if (!WHY['polyethylene glycol-400 usp'].includes('USP')) throw new Error('t183u usp');
if (!WHY['reb m (from stevia extract)'].includes('Reb M')) throw new Error('t183u reb m');
if (!WHY['sd alcohol 38-b'].includes('SD alcohol 38-B')) throw new Error('t183u sd alcohol');
