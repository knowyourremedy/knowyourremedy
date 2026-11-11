import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const WHY: Record<string, string> = {
  "vanilla flavor": "Vanilla flavor is a named flavor derived from vanilla. FDA 21 CFR 101.22 does not require full component disclosure for named flavors.",
  "peanut flour": "Peanut flour is a named food flour from peanuts.",
  "peg": "PEG is polyethylene glycol used as a solvent or plasticizer. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "peg-120 methyl glucose dioleate": "PEG-120 methyl glucose dioleate is a polyethylene glycol ester used as an emulsifier. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "peg-4 laurate": "PEG-4 laurate is a polyethylene glycol ester used as an emulsifier. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "propane": "Propane is a propellant used in spray formulations. It is a hydrocarbon gas. The FDA permits propane as a propellant in limited applications.",
  "retinyl palmitate": "Retinyl palmitate is a vitamin A ester used as a nutrient.",
  "rice fiber": "Rice fiber is a food fiber from rice.",
  "saccharin": "Saccharin is an artificial sweetener. Later reviews walked back the older cancer signal; the FDA continues to permit it as a food additive.",
  "silicon": "Silicon is a mineral element used in some formulations.",
  "sodium polystyrene sulfonate": "Sodium polystyrene sulfonate is a synthetic polymer used as an ion-exchange resin. The FDA permits sodium polystyrene sulfonate as a pharmaceutical agent.",
  "spearmint oil": "Spearmint oil is the essential oil distilled from spearmint, used as a scent or inactive ingredient.",
  "spirulina extract (for color)": "Spirulina extract (for color) is an algae-derived pigment used as a color.",
  "stearyl heptanoate": "Stearyl heptanoate is an emollient ester used in cream bases.",
  "stevia (leaf) extract": "Stevia (leaf) extract is a sweetener concentrated from the stevia plant. It is more refined than whole leaf. High-purity steviol glycosides have FDA GRAS status.",
  "tragacanth gum": "Tragacanth gum is a food gum used to thicken.",
  "wheat flour": "Wheat flour is a food flour from wheat.",
  "wintergreen oil": "Wintergreen oil is the essential oil distilled from wintergreen, used as a scent or inactive ingredient.",
  "acacia hydrolysate": "Acacia hydrolysate is a fiber derived from acacia.",
  "artificial flavors": "Artificial flavors is a synthetic flavor blend. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "beet root extract": "Beet root extract is a plant extract used as a color.",
  "bis-peg-10 dimethicone": "Bis-PEG-10 dimethicone is a silicone polymer containing polyethylene glycol. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "black/purple carrot juice concentrate (color)": "Black/purple carrot juice concentrate (color) is a named plant juice used as a color.",
  "blueberry juice concentrate": "Blueberry juice concentrate is a named fruit juice used as a color.",
  "brown sugar": "Brown sugar is a sugar that contains molasses. The FDA lists brown sugar as GRAS.",
  "cajeput": "Cajeput is a plant ingredient used as a scent or inactive.",
  "cajeput oil": "Cajeput oil is the essential oil distilled from cajeput, used as a scent or inactive ingredient.",
  "carrot": "Carrot is a plant ingredient used as a color or filler. The FDA lists carrot as GRAS.",
  "cholesterol": "Cholesterol is a lipid used as an inactive ingredient in some formulations. The FDA permits cholesterol as a food additive.",
  "cinnamon": "Cinnamon is a named spice from cinnamon bark.",
  "citronella oil": "Citronella oil is the essential oil distilled from citronella, used as a scent or inactive ingredient.",
  "cocamidopropyl betaine (coconut based foaming agent)": "Cocamidopropyl betaine (coconut based foaming agent) is a surfactant used as a foaming agent. The FDA permits cocamidopropyl betaine in cosmetic formulations.",
  "commiphora myrrha (myrrh) oil": "Commiphora myrrha (myrrh) oil is a named myrrh oil used as a scent or inactive ingredient.",
  "copernicia cerifera (carnauba) wax": "Copernicia cerifera (carnauba) wax is a plant wax used as a coating.",
  "crystallized lemon (citric acid, lemon oil, lemon juice)": "Crystallized lemon (citric acid, lemon oil, lemon juice) is a named lemon blend used as a flavor.",
  "d-ribose": "D-ribose is a sugar used as an inactive ingredient. The FDA lists D-ribose as GRAS.",
  "decyl polyglucoside (from glucose)": "Decyl polyglucoside (from glucose) is a mild surfactant derived from glucose. The FDA permits alkyl polyglucosides in cosmetic formulations.",
  "dextrose (organic)": "Dextrose (organic) is a simple sugar used as a filler.",
  "digestion-resistant maltodextrin": "Digestion-resistant maltodextrin is a starch-based fiber. It is a highly processed carbohydrate. The FDA lists maltodextrin as GRAS.",
  "dipropylene glycol": "Dipropylene glycol is a synthetic solvent used in formulations. The FDA permits dipropylene glycol in cosmetic formulations.",
  "docusate sodium": "Docusate sodium is a surfactant used as an inactive ingredient. The FDA permits docusate sodium as a pharmaceutical excipient.",
  "ethyl butyrate": "Ethyl butyrate is a flavor ester used in small amounts. The FDA permits ethyl butyrate as a flavoring substance.",
  "fish oil powder": "Fish oil powder is a named marine oil used as a carrier.",
  "flavor (natural)": "Flavor (natural) is an unnamed natural flavor blend. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "flavors (natural)": "Flavors (natural) is an unnamed natural flavor blend. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "fractionated coconut and palm kernel oil": "Fractionated coconut and palm kernel oil is a processed oil blend used as a carrier. It is more refined than whole oils. The FDA lists fractionated coconut oil as GRAS.",
  "fruit and vegetable (color)": "Fruit and vegetable (color) is a plant-derived color blend.",
  "garlic oil extract": "Garlic oil extract is a concentrated extract from garlic used as a scent or inactive ingredient. The FDA permits garlic oil as a flavoring substance.",
  "glycine": "Glycine is an amino acid used as a filler.",
  "grape sugar": "Grape sugar is a sugar derived from grapes.",
  "hydrogenated lecithin": "Hydrogenated lecithin is a processed form of lecithin used as an emulsifier. The FDA lists lecithin as GRAS.",
  "hydroxypropyl starch": "Hydroxypropyl starch is a chemically modified starch used as a thickener. The FDA lists hydroxypropyl starch as GRAS.",
  "hypromellose acetate succinate": "Hypromellose acetate succinate is a synthetic polymer used as an enteric coating. The FDA permits hypromellose acetate succinate for enteric coatings.",
  "illicium verum (aniseed) fruit/seed oil": "Illicium verum (aniseed) fruit/seed oil is a named aniseed oil used as a scent or inactive ingredient.",
  "inulin syrup": "Inulin syrup is a fiber syrup derived from plants.",
  "isoeugenol": "Isoeugenol is a fragrance ingredient derived from plants or synthesized.",
  "isomalto-oligosaccharides": "Isomalto-oligosaccharides are a starch-derived fiber. The FDA lists isomalto-oligosaccharides as GRAS.",
  "jojoba oil": "Jojoba oil is a plant oil used as a scent or inactive ingredient.",
  "larch arabinogalactan": "Larch arabinogalactan is a fiber derived from larch.",
  "lauroyl macrogolglycerides": "Lauroyl macrogolglycerides is a polyethylene glycol derivative used as an emulsifier. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "limonene": "Limonene is a fragrance compound derived from citrus or synthesized.",
  "linalool": "Linalool is a fragrance compound derived from plants or synthesized.",
  "macrogol / peg 400": "Macrogol / PEG 400 is a specific molecular-weight form of polyethylene glycol used as a solvent. Manufacturing can leave residual ethylene oxide and 1,4-dioxane, impurities noted by the FDA.",
  "malted rice": "Malted rice is a processed rice ingredient used as a filler.",
  "maltitol solution": "Maltitol solution is a sugar alcohol used as a sweetener. Large amounts can cause bloating or loose stools. The FDA lists maltitol as GRAS.",
  "medium chain triglyceride (mct) oil": "Medium chain triglyceride (MCT) oil is a processed fraction of fats used as a softgel or liquid fill. They are more refined than whole oils. The FDA lists medium-chain triglycerides as GRAS.",
  "medium chain triglycerides (from coconut)": "Medium chain triglycerides (from coconut) is a named source of medium-chain triglycerides used as a carrier.",
  "medium chain triglycerides (source unlabeled)": "Medium chain triglycerides (source unlabeled) is a processed fraction of fats used as a softgel or liquid fill. They are more refined than whole oils. The FDA lists medium-chain triglycerides as GRAS.",
  "mixed berry and strawberry flavor": "Mixed berry and strawberry flavor is a named fruit flavor blend. FDA 21 CFR 101.22 does not require full component disclosure for named flavors.",
  "monkfruit extract": "Monkfruit extract is a sweetener from monk fruit.",
  "monoethanolamine": "Monoethanolamine is a synthetic pH adjuster. It is an amine compound. The FDA permits monoethanolamine in cosmetic formulations.",
  "myrrh oil": "Myrrh oil is the essential oil distilled from myrrh, used as a scent or inactive ingredient. The FDA lists it as a flavoring agent under 21 CFR 172.510.",
  "natural & artificial flavors": "Natural & artificial flavors is a mixture of flavor compounds. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural and artificial cinnamon and peppermint flavors": "Natural and artificial cinnamon and peppermint flavors is a mixture of flavor compounds. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural and artificial tropical flavor": "Natural and artificial tropical flavor is a mixture of flavor compounds. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural berry flavoring": "Natural berry flavoring is a named fruit flavor. FDA 21 CFR 101.22 does not require full component disclosure for named flavors.",
  "natural black cherry flavor with other natural flavors": "Natural black cherry flavor with other natural flavors is a named fruit flavor blend that includes additional natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural cherry flavor with other natural flavors": "Natural cherry flavor with other natural flavors is a named fruit flavor blend that includes additional natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural cherry with other natural flavors": "Natural cherry with other natural flavors is a named fruit flavor blend that includes additional natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural honey flavor": "Natural honey flavor is a named flavor derived from honey.",
  "natural mandarin orange flavor": "Natural mandarin orange flavor is a named fruit flavor. FDA 21 CFR 101.22 does not require full component disclosure for named flavors.",
  "natural menthol": "Natural menthol is a cooling compound derived from mint. On an inactive list it is not the primary drug. The FDA permits menthol as a flavoring substance.",
  "natural mixed berry flavor with other natural flavors": "Natural mixed berry flavor with other natural flavors is a named fruit flavor blend that includes additional natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural orange juice flavor with other natural flavors": "Natural orange juice flavor with other natural flavors is a named fruit flavor blend that includes additional natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural passionfruit flavor": "Natural passionfruit flavor is a named fruit flavor.",
  "natural strawberry flavor with other natural flavors": "Natural strawberry flavor with other natural flavors is a named fruit flavor blend that includes additional natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural strawberry with other natural flavors": "Natural strawberry with other natural flavors is a named fruit flavor blend that includes additional natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "natural watermelon flavor with other natural flavors": "Natural watermelon flavor with other natural flavors is a named fruit flavor blend that includes additional natural flavors. The label does not list every component (FDA 21 CFR 101.22 does not require full component disclosure).",
  "nutmeg": "Nutmeg is a named spice from nutmeg.",
  "oat bran": "Oat bran is a food bran from oats.",
  "oats": "Oats are a named grain ingredient used as a fiber or filler.",
  "organic apple cider": "Organic apple cider is a named fruit product from apples.",
  "organic blue spirulina": "Organic blue spirulina is a named algae extract used as a color.",
  "organic cane alcohol": "Organic cane alcohol is a solvent derived from organic cane.",
  "organic cane alcohol (45-55% by volume)": "Organic cane alcohol (45-55% by volume) is a solvent derived from organic cane.",
  "organic cane syrup": "Organic cane syrup is a sweetener from organic cane sugar. The FDA lists cane syrup as GRAS.",
  "organic cashew milk powder (organic cashew kernel, organic tapioca maltodextrin)": "Organic cashew milk powder (organic cashew kernel, organic tapioca maltodextrin) is a named milk powder that contains organic tapioca maltodextrin. The FDA lists maltodextrin as GRAS.",
  "organic cashew nut milk powder (organic cashew kernel, organic tapioca maltodextrin)": "Organic cashew nut milk powder (organic cashew kernel, organic tapioca maltodextrin) is a named milk powder that contains organic tapioca maltodextrin. The FDA lists maltodextrin as GRAS.",
  "organic cocoa powder": "Organic cocoa powder is a named cocoa powder.",
  "organic coconut milk powder (organic: coconut milk, organic cassava dextrin)": "Organic coconut milk powder (organic: coconut milk, organic cassava dextrin) is a named coconut milk powder with organic cassava dextrin.",
};

function norm(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Exact tokens from the t185u list only. Grades and notes stay as they are. */
export function t185uWhyForName(name: string): string | undefined {
  return WHY[norm(name)];
}

export function applyT185uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const why = t185uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT185uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT185uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  return { ...record, inactiveIngredients };
}

if (Object.keys(WHY).length !== 100) throw new Error('t185u count');
const MUST_HAVE = [
  "peg",
  "peg-120 methyl glucose dioleate",
  "peg-4 laurate",
  "bis-peg-10 dimethicone",
  "macrogol / peg 400",
  "cajeput",
  "cajeput oil",
  "oats",
  "oat bran",
  "nutmeg",
  "cinnamon",
  "carrot",
  "black/purple carrot juice concentrate (color)",
  "organic cane alcohol",
  "organic cane alcohol (45-55% by volume)",
  "vanilla flavor",
  "peanut flour",
  "rice fiber",
  "spirulina extract (for color)",
  "stevia (leaf) extract",
  "medium chain triglyceride (mct) oil",
  "medium chain triglycerides (from coconut)",
  "medium chain triglycerides (source unlabeled)",
  "natural & artificial flavors",
  "flavor (natural)",
  "flavors (natural)",
  "artificial flavors",
  "monkfruit extract",
  "myrrh oil",
  "commiphora myrrha (myrrh) oil",
  "organic apple cider",
  "organic blue spirulina",
  "organic cocoa powder",
  "maltitol solution",
  "malted rice",
  "inulin syrup",
  "dipropylene glycol",
  "dextrose (organic)",
  "digestion-resistant maltodextrin",
  "fractionated coconut and palm kernel oil",
  "natural menthol",
  "wheat flour",
  "hydroxypropyl starch",
  "organic cashew milk powder (organic cashew kernel, organic tapioca maltodextrin)",
  "organic cashew nut milk powder (organic cashew kernel, organic tapioca maltodextrin)",
  "organic coconut milk powder (organic: coconut milk, organic cassava dextrin)",
  "saccharin",
  "silicon",
  "brown sugar",
];
const MUST_MISS = [
  "peg-400",
  "peg 400",
  "polyethylene glycol",
  "peg-100 stearate",
  "oat",
  "oat hull fiber",
  "oat fiber",
  "nutmeg powder",
  "cinnamon powder",
  "organic cinnamon powder",
  "carrot juice",
  "carrot extract",
  "vanilla",
  "peanut oil",
  "organic rice fiber",
  "spirulina extract",
  "spirulina extract (color)",
  "blue spirulina",
  "organic stevia (leaf) extract",
  "medium chain triglycerides",
  "natural flavors",
  "monk fruit extract",
  "organic apple cider vinegar",
  "cocoa powder",
  "maltitol",
  "inulin",
  "propylene glycol",
  "dextrose",
  "maltodextrin",
  "palm oil",
  "palm kernel oil",
  "menthol",
  "wheat",
  "hydroxyproyl cellulose",
  "hydroxypropyl cellulose",
  "organic coconut milk powder (organic: coconut milk, cassava dextrin)",
  "sodium saccharin",
  "silica",
  "sugar",
];
for (const name of MUST_HAVE) {
  if (!WHY[name]) throw new Error(`t185u missing ${name}`);
}
for (const name of MUST_MISS) {
  if (WHY[name]) throw new Error(`t185u over-matched ${name}`);
}
if (t185uWhyForName('PEG') !== WHY.peg) throw new Error('t185u peg');
if (t185uWhyForName('peg-400')) throw new Error('t185u peg-400');
if (t185uWhyForName('peg 400')) throw new Error('t185u peg 400');
if (t185uWhyForName('cajeput') !== WHY.cajeput) throw new Error('t185u cajeput');
if (t185uWhyForName('cajeput oil') !== WHY['cajeput oil']) throw new Error('t185u cajeput oil');
if (t185uWhyForName('oat')) throw new Error('t185u oat');
if (t185uWhyForName('oats') !== WHY.oats) throw new Error('t185u oats');
if (t185uWhyForName('nutmeg') !== WHY.nutmeg) throw new Error('t185u nutmeg');
if (t185uWhyForName('nutmeg powder')) throw new Error('t185u nutmeg powder');
if (t185uWhyForName('cinnamon') !== WHY.cinnamon) throw new Error('t185u cinnamon');
if (t185uWhyForName('cinnamon powder')) throw new Error('t185u cinnamon powder');
if (t185uWhyForName('carrot') !== WHY.carrot) throw new Error('t185u carrot');
if (t185uWhyForName('black/purple carrot juice concentrate (color)') !== WHY['black/purple carrot juice concentrate (color)']) throw new Error('t185u carrot juice');
if (t185uWhyForName('organic cane alcohol') !== WHY['organic cane alcohol']) throw new Error('t185u cane alcohol');
if (t185uWhyForName('organic cane alcohol (45-55% by volume)') !== WHY['organic cane alcohol (45-55% by volume)']) throw new Error('t185u cane alcohol volume');
