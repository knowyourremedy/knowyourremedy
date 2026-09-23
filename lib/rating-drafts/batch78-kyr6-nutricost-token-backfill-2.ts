// DRAFT / not verified / batch 78 KYR6 Nutricost leftover-token backfill.
// Methodology v1.6 + MAIN §5 after the Sept 22, 2026 leftover-token stamp.
// Harm-first. No invented grades. No invented UPCs. No OCR aliases
// except titanium oxide → existing titanium dioxide Avoid.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Nutricost only. Unlocks batch77 REFUSED rows whose
// blocking tokens are now stamped on MAIN, plus batch76 refuses
// still blocked only by those same tokens (multi-collagen hot cocoa;
// vitamin D3 gummies). Every count/strength supplement-facts image
// on each candidate product was opened. The Pre-X "maltodextrin grape"
// string was a line wrap of maltodextrin + grape (fruit) powder (for color).
// Gummy hydrogenated vegetable oil stays Avoid; this file has no gummy HVO.
// The D3 gummy prints vegetable oil, which is the existing gummy High row.
// OCR-garbage strings from batch76 were not aliased. no_OI hunt list
// was not opened. recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Pack sizes of the same
// OI+form share formulaId. Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch77. No NatureWise. No WELMATE.
// No A+Health / HealthA2Z / TIME-Cap / GoodSense. No toothpaste.
// No house Amazon. No Sprouts. No graded oil pour bottles.
// Leftover Amazon 3P stays N=6.
//
// TALLY (unverified drafts in THIS file): 21 rows —
// Clean 0 / Caution 18 / Avoid 3.
// NEW 18 / REUSE-formula 3 / SKIPPED 1 (no_OI 0 / OUT 0 / other 1 —
// C8 unflavored 1 lb has no supplement-facts image) / REFUSED 0.
// Batch76 no_OI 140 was not hunted. Batch76 OUT 135 was not reopened.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'Nutricost';
const AMAZON = ['Amazon', 'nutricost.com'] as const;
const CDN = 'https://cdn.shopify.com/s/files/1/0222/4128/0074/files/';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  acek: "Methodology §5 Moderate-risk (acesulfame potassium / Ace-K)",
  bareStarch: "Methodology §5 Limited-risk (unspecified starch — exact token when the label prints bare starch; Caution; distinct from Limited modified starch / modified food starch and from Cleared named corn starch / potato starch / pregelatinized starch; locked Sept 22, 2026). Not Avoid.",
  beetColor: "Methodology §5 Cleared (beet root powder (for color) / beetroot powder (for color) / beet root (for color) — named plant color; same Cleared row as organic beet root; not a synthetic dye; locked Sept 22, 2026).",
  betaCarotene: "Methodology §5 Caution (beta-carotene as a color additive — Beta Carotene (For Color); not Avoid)",
  caCarb: "Methodology §5 Cleared (calcium carbonate as Other Ingredient filler — distinct from calcium as a labeled active)",
  caSilicate: "Methodology §5 Caution (calcium silicate — exact token; not the silicon dioxide cap)",
  caseinate: "Methodology §5 Limited-risk (sodium caseinate — exact token, including the milk-derivative parenthetical when that is the same token; Caution; milk-protein allergen neighborhood with non-fat dry milk; not High; locked Sept 22, 2026).",
  cassavaDextrin: "Methodology §5 Limited-risk (cassava dextrin — exact token; Caution; distinct from Cleared organic cassava syrup, from Caution bare dextrin, and from Limited tapioca dextrin; locked Sept 22, 2026). Not Avoid.",
  cholineCl: "Methodology §5 Cleared (choline chloride as Other Ingredient — exact token; distinct from Cleared choline bitartrate; locked Sept 22, 2026).",
  citrate: "Methodology §5 Cleared (citrate salts as fillers/buffers)",
  citric: "Methodology §5 Cleared (citric acid)",
  cocoaAlkali: "Methodology §5 Cleared (cocoa powder alkali / cocoa powder (processed with alkali) — both strings; distinct from Cleared cocoa powder and from Cleared cocoa seed butter; distinct from extract; locked Sept 22, 2026).",
  dextrin: "Methodology §5 Limited-risk (bare dextrin — exact token; Caution; distinct from Limited tapioca dextrin / tapioca powder and from Caution cassava dextrin; locked Sept 22, 2026). Not Avoid.",
  dical: "Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate)",
  flavors: "Methodology §5 Limited-risk (natural flavors / natural and artificial flavors — undisclosed mixtures)",
  glucose: "Methodology §5 Limited-risk (bare glucose — exact token when the label prints glucose; Caution; distinct from Cleared cane sugar / glucose syrup / tapioca syrup-dextrose; locked Sept 22, 2026). Not Avoid. Do not flip the Cleared syrup row.",
  glucoseSyrup: "Methodology §5 Cleared (glucose syrup — acceptable sweetener with cane sugar). Distinct from Caution bare glucose.",
  grapeColor: "Methodology §5 Cleared (grape (fruit) powder (for color) — exact token as color; named plant color; distinct from Cleared grape seed extract and from Cleared grape seed oil as cream fill; not a synthetic dye; locked Sept 22, 2026).",
  himalayan: "Methodology §5 Cleared (Himalayan rock salt — exact token; salt / saline neighborhood with sodium chloride; not a grade driver; locked Sept 22, 2026).",
  hpmc: "Methodology §5 Cleared (hypromellose / HPMC / cellulose capsule)",
  hvoOi: "Methodology §5 Limited-risk (hydrogenated vegetable oil as an Other Ingredient — exact token; Caution; cream fill stays Cleared; gummy fat blend stays Avoid; locked Sept 22, 2026). This row is not a gummy. Not Avoid.",
  juiceColor: "Methodology §5 Cleared (named fruit-or-vegetable juice concentrate as color — black carrot / named fruit-or-vegetable juice concentrate as COLOR; not a synthetic dye; locked Sept 14, 2026). Label string: fruit and vegetable juice concentrate (for color).",
  lactose: "Methodology §5 Cleared (lactose)",
  lecithin: "Methodology §5 Cleared (lecithin — soy / sunflower). Soy lecithin is an allergen disclosure, not a grade change. Not bare soy.",
  malic: "Methodology §5 Cleared (malic acid / L-malic acid)",
  maltodextrin: "Methodology §5 Limited-risk (maltodextrin, organic or not)",
  mcc: "Methodology §5 Cleared (microcrystalline cellulose)",
  mctUnlabeled: "Methodology §5 Limited-risk (unlabeled MCT — medium chain triglycerides when the token does not name coconut or palm kernel). Not an oil-bottle grade. Not gummy High.",
  pectin: "Methodology §5 Cleared (pectin — xanthan/guar/gum family)",
  peg: "Methodology §5 Moderate-risk (PEGs)",
  polyol: "Methodology §5 Limited-risk (oral sugar alcohols — mannitol)",
  riceFlour: "Methodology §5 Caution (rice flour — exact token; not Cleared rice hull / rice bran)",
  sio2: "Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). It does not push Avoid.",
  spirulinaColor: "Methodology §5 Limited-risk (bare spirulina (for color) — exact token as color without the word blue; Caution; FDA color allow is not Clean; distinct from blue spirulina (for color), spirulina powder, and spirulina extract; locked Sept 22, 2026). Not Avoid.",
  ssg: "Methodology §5 Cleared (sodium starch glycolate)",
  stearate: "Methodology §5 Cleared (magnesium stearate / stearic acid / calcium laurate, including vegetable source)",
  stevia: "Methodology §5 Caution (whole-leaf / crude stevia — not Reb A / Reb M). Distinct from Caution stevia extract.",
  steviaExtract: "Methodology §5 Limited-risk (stevia extract — exact token; unspecified extract; Caution; distinct from Cleared high-purity steviol glycosides / Reb M and from Caution whole-leaf / crude stevia; locked Sept 22, 2026). Not Avoid. Do not flip the high-purity Cleared row.",
  sucralose: "Methodology §5 Moderate-risk (sucralose)",
  sugar: "Methodology §5 Limited-risk (bare sugar — exact token when the label prints sugar; Caution; distinct from Cleared cane sugar and from Limited beet sugar / sucrose; locked Sept 22, 2026). Not Avoid.",
  sunflowerFill: "Methodology §5 Cleared as non-gummy fill (sunflower oil / sunflower seed oil on a capsule, softgel, tablet, or powder — not the gummy seed-oil High rule). Gummy sunflower oil stays High.",
  talc: "Methodology §5 High (talc in an oral swallow product — IARC 2A; no pharma-grade exception)",
  tapiocaFiber: "Methodology §5 Cleared (soluble tapioca fiber / Organic Tapioca Fiber Powder)",
  tartaric: "Methodology §5 Cleared (tartaric acid)",
  tio2: "Methodology §5 High (titanium dioxide / E171 / titanium oxide). Titanium oxide, when it is titanium dioxide, sits on this same High/Avoid row (Sept 22, 2026). Do not invent a second class. FDA allow is not Clean.",
  vegOilGummy: "Methodology §5 High (vegetable oil in a gummy — seed/industrial oil gummy row). Not the Caution hydrogenated-vegetable-oil Other Ingredient row. Gummy hydrogenated vegetable oil fat blend stays Avoid.",
  wax: "Methodology §5 Cleared (beeswax / carnauba wax)",
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'recordStatus'> & {
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return { ...opts, recordStatus: opts.recordStatus ?? UNVERIFIED };
}

function pin(productPath: string, image: string, oi: string): string {
  return `Current nutricost.com supplement-facts panel (https://nutricost.com/products/${productPath}; image ${CDN}${image}) other-ingredients: ${oi}. Brand-site pack image is the pin (every count/strength SFP on this product was opened before this write). Live Amazon US exact pack when this Nutricost name is listed. No 12-digit UPC decoded from the panel or the brand page — omitted. No DailyMed drug SPL.`;
}

type Compact = {
  id: string;
  productName: string;
  category: string;
  formulaId: string;
  audience: typeof ADULT;
  minAge: number;
  form: string;
  productType: typeof VITAMIN | typeof SUPPLEMENT;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Vitamins: ["amazon-elements-vitamin-d3-5000-softgels", "Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6)."],
      Digestive: ["megafood-magnesium-300-capsules", "Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6)."],
      Sleep: ["pure-encapsulations-melatonin-sr-3mg", "Independently Clean Pure Encapsulations Melatonin-SR 3 mg already on main. Form labeled, not a hard filter (§6)."],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    formulaId: d.formulaId,
    audience: d.audience,
    minAge: d.minAge,
    form: d.form,
    productType: d.productType,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. Adults unless the name says kids. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  });
}

const BCAA_GRAPE = "nutricost-bcaa-powder-grape-30-servings";
const BCAA_GRAPE_OI =
  "Tartaric acid, natural and artificial flavors, citric acid, malic acid, sucralose, acesulfame potassium, silica, grape (fruit) powder (for color)";
const BCAA_GRAPE_FLAGS: Compact['flags'] = [
  ["Tartaric acid", "cleared", "tartaric"],
  ["Natural and artificial flavors", "limited", "flavors"],
  ["Citric acid", "cleared", "citric"],
  ["Malic acid", "cleared", "malic"],
  ["Sucralose", "moderate", "sucralose"],
  ["Acesulfame potassium", "moderate", "acek"],
  ["Silica", "limited", "sio2"],
  ["Grape (fruit) powder (for color)", "cleared", "grapeColor"],
];
const BCAA_GRAPE_NOTE =
  "FOUNDER-LOCK DRAFT: Caution. Driver is Natural and artificial flavors; Sucralose; Acesulfame potassium; Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.";

const COMPACT: Compact[] = [
  {
    id: BCAA_GRAPE,
    productName: "Nutricost BCAA Powder, Grape (30 servings)",
    category: "Vitamins",
    formulaId: BCAA_GRAPE,
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "BCAA Powder", strength: "label serving" }],
    flags: BCAA_GRAPE_FLAGS,
    verdict: "caution",
    note: BCAA_GRAPE_NOTE,
    cite: pin("nutricost-bcaa-powder", "NTC_BCAA_Grape_30SERV_20OZ_SFP_Square_0a467a36-fe7f-48b2-98d5-e408d818075b.jpg", BCAA_GRAPE_OI),
  },
  {
    id: "nutricost-bcaa-powder-grape-60-servings",
    productName: "Nutricost BCAA Powder, Grape (60 servings)",
    category: "Vitamins",
    formulaId: BCAA_GRAPE,
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "BCAA Powder", strength: "label serving" }],
    flags: BCAA_GRAPE_FLAGS,
    verdict: "caution",
    note: BCAA_GRAPE_NOTE,
    cite: pin("nutricost-bcaa-powder", "NTC_BCAA_Grape_60SERV_43OZ_SFP_Square_abd1cdb2-b94e-4cac-9501-795b68945734.jpg", BCAA_GRAPE_OI),
  },
  {
    id: "nutricost-bcaa-powder-grape-90-servings",
    productName: "Nutricost BCAA Powder, Grape (90 servings)",
    category: "Vitamins",
    formulaId: BCAA_GRAPE,
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "BCAA Powder", strength: "label serving" }],
    flags: BCAA_GRAPE_FLAGS,
    verdict: "caution",
    note: BCAA_GRAPE_NOTE,
    cite: pin("nutricost-bcaa-powder", "NTC_BCAA_Grape_90SERV_1500CC_SFP_Square_5bfc590b-4b5a-43d4-bb5b-61c47631eb2c.jpg", BCAA_GRAPE_OI),
  },
  {
    id: "nutricost-bcaa-powder-grape-120-servings",
    productName: "Nutricost BCAA Powder, Grape (120 servings)",
    category: "Vitamins",
    formulaId: BCAA_GRAPE,
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "BCAA Powder", strength: "label serving" }],
    flags: BCAA_GRAPE_FLAGS,
    verdict: "caution",
    note: BCAA_GRAPE_NOTE,
    cite: pin("nutricost-bcaa-powder", "NTC_BCAA_Grape_120SERV_2000CC_SFP_Square.jpg", BCAA_GRAPE_OI),
  },
  {
    id: "nutricost-bcaa-powder-pomegranate-guava-30-servings",
    productName: "Nutricost BCAA Powder, Pomegranate Guava (30 servings)",
    category: "Vitamins",
    formulaId: "nutricost-bcaa-powder-pomegranate-guava-30-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "BCAA Powder", strength: "label serving" }],
    flags: [["L-malic acid", "cleared", "malic"], ["Citric acid", "cleared", "citric"], ["Natural flavors", "limited", "flavors"], ["Sucralose", "moderate", "sucralose"], ["Acesulfame potassium", "moderate", "acek"], ["Silica", "limited", "sio2"], ["Grape (fruit) powder (for color)", "cleared", "grapeColor"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural flavors; Sucralose; Acesulfame potassium; Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-bcaa-powder", "NTC_BCAA_PomegranateGuava_30SERV_20OZ_SFP_Square_f22495c6-8f50-4b6e-b50f-82d804d86479.jpg", "L-malic acid, citric acid, natural flavors, sucralose, acesulfame potassium, silica, grape (fruit) powder (for color)"),
  },
  {
    id: "nutricost-creatine-monohydrate-powder-grape-45-servings",
    productName: "Nutricost Creatine Monohydrate Powder, Grape (45 servings)",
    category: "Vitamins",
    formulaId: "nutricost-creatine-monohydrate-powder-grape-45-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Creatine Monohydrate Powder", strength: "label serving" }],
    flags: [["L-malic acid", "cleared", "malic"], ["Natural flavors", "limited", "flavors"], ["Sucralose", "moderate", "sucralose"], ["Grape (fruit) powder (for color)", "cleared", "grapeColor"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural flavors; Sucralose. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.",
    cite: pin("nutricost-creatine-monohydrate-powder-500-grams", "NTC_CreatineMonohydrate_Grape_300GM_20OZ_SFP.jpg", "L-malic acid, natural flavors, sucralose, grape (fruit) powder (for color)"),
  },
  {
    id: "nutricost-creatine-energy-powder-grape-30-servings",
    productName: "Nutricost Creatine + Energy Powder, Grape (30 servings)",
    category: "Vitamins",
    formulaId: "nutricost-creatine-energy-powder-grape-30-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Creatine + Energy Powder", strength: "label serving" }],
    flags: [["Citric acid", "cleared", "citric"], ["Natural flavors", "limited", "flavors"], ["Sucralose", "moderate", "sucralose"], ["Sunflower seed oil", "cleared", "sunflowerFill"], ["Mannitol", "limited", "polyol"], ["Grape (fruit) powder (for color)", "cleared", "grapeColor"], ["Dextrin", "limited", "dextrin"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural flavors; Sucralose; Mannitol; Dextrin. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.",
    cite: pin("nutricost-creatine-energy-powder", "NTC_CreatineMonohydrate_EnergyGrape_30SERV_20OZ_SFP_Square_2f283b80-8b77-4157-9308-9b0040189d94.jpg", "Citric acid, natural flavors, sucralose, sunflower seed oil, mannitol, grape (fruit) powder (for color), dextrin"),
  },
  {
    id: "nutricost-l-glutamine-powder-blackberry-lemonade-78-servings",
    productName: "Nutricost L-Glutamine Powder, Blackberry Lemonade (78 servings)",
    category: "Vitamins",
    formulaId: "nutricost-l-glutamine-powder-blackberry-lemonade-78-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "L-Glutamine Powder", strength: "label serving" }],
    flags: [["Citric acid", "cleared", "citric"], ["Natural flavors", "limited", "flavors"], ["L-malic acid", "cleared", "malic"], ["Stevia", "limited", "stevia"], ["Grape (fruit) powder (for color)", "cleared", "grapeColor"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural flavors; Stevia. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.",
    cite: pin("nutricost-l-glutamine-powder", "NTC_L-GlutamineBlackberryLemonade_500GM_43OZ_SFP_Square.jpg", "Citric acid, natural flavors, L-malic acid, stevia, grape (fruit) powder (for color)"),
  },
  {
    id: "nutricost-l-glutamine-powder-green-apple-83-servings",
    productName: "Nutricost L-Glutamine Powder, Green Apple (83 servings)",
    category: "Vitamins",
    formulaId: "nutricost-l-glutamine-powder-green-apple-83-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "L-Glutamine Powder", strength: "label serving" }],
    flags: [["L-malic acid", "cleared", "malic"], ["Natural flavors", "limited", "flavors"], ["Citric acid", "cleared", "citric"], ["Stevia", "limited", "stevia"], ["Spirulina (for color)", "limited", "spirulinaColor"], ["Beta carotene (for color)", "limited", "betaCarotene"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural flavors; Stevia; Spirulina (for color); Beta carotene (for color). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.",
    cite: pin("nutricost-l-glutamine-powder", "NTC_L-Glutamine_GreenApple_STEVIA_500GM_43OZ_SFP.jpg", "L-malic acid, natural flavors, citric acid, stevia, spirulina (for color), beta carotene (for color)"),
  },
  {
    id: "nutricost-d-aspartic-acid-powder-green-apple-75-servings",
    productName: "Nutricost D-Aspartic Acid Powder, Green Apple (75 servings)",
    category: "Vitamins",
    formulaId: "nutricost-d-aspartic-acid-powder-green-apple-75-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "D-Aspartic Acid Powder", strength: "label serving" }],
    flags: [["Malic acid", "cleared", "malic"], ["Natural flavor", "limited", "flavors"], ["Sucralose", "moderate", "sucralose"], ["Spirulina (for color)", "limited", "spirulinaColor"], ["Beta carotene (for color)", "limited", "betaCarotene"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural flavor; Sucralose; Spirulina (for color); Beta carotene (for color). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.",
    cite: pin("nutricost-d-aspartic-acid-powder-300-grams", "NTC_D-AsparticAcidPowder_GreenApple_75serv_25oz_SFP_cb336578-5abb-4c2c-bbac-d8b659764b63.jpg", "Malic acid, natural flavor, sucralose, spirulina (for color), beta carotene (for color)"),
  },
  {
    id: "nutricost-calcium-magnesium-zinc-citrates-d3-raspberry-30-servings",
    productName: "Nutricost Calcium + Magnesium + Zinc Citrates with Vitamin D3 Powder, Raspberry Lemonade (30 servings)",
    category: "Vitamins",
    formulaId: "nutricost-calcium-magnesium-zinc-citrates-d3-raspberry-30-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Calcium + Magnesium + Zinc Citrates with Vitamin D3 Powder", strength: "label serving" }],
    flags: [["Citric acid", "cleared", "citric"], ["Natural flavors", "limited", "flavors"], ["Malic acid", "cleared", "malic"], ["Beet root powder (for color)", "cleared", "beetColor"], ["Stevia extract", "limited", "steviaExtract"], ["Silicon dioxide", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural flavors; Stevia extract; Silicon dioxide. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-calcium-magnesium-zinc-citrates-with-vitamin-d3", "NTC_Ca_Mg_Zn_D3_Ras-Lemonade_30Serv_SFP.jpg", "Citric acid, natural flavors, malic acid‡, beet root powder (for color), stevia extract, silicon dioxide"),
  },
  {
    id: "nutricost-melatonin-tablets-5mg-240-tablets",
    productName: "Nutricost Melatonin Tablets 5 mg (240 tablets)",
    category: "Sleep",
    formulaId: "nutricost-melatonin-tablets-5mg-240-tablets",
    audience: ADULT,
    minAge: 18,
    form: "tablet",
    productType: SUPPLEMENT,
    actives: [{ name: "Melatonin", strength: "5 mg" }],
    flags: [["Microcrystalline cellulose", "cleared", "mcc"], ["Glucose", "limited", "glucose"], ["Dextrin", "limited", "dextrin"], ["Lactose", "cleared", "lactose"], ["Starch", "limited", "bareStarch"], ["Hypromellose", "cleared", "hpmc"], ["Calcium carbonate", "cleared", "caCarb"], ["Talc", "high", "talc"], ["Sodium starch glycolate", "cleared", "ssg"], ["Magnesium stearate", "cleared", "stearate"], ["Silica", "limited", "sio2"]],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Talc. Avoid needs High. Limited-only never Avoid.",
    cite: pin("nutricost-melatonin-3mg-240-caps", "NTC_Melatonin_5MG_240TAB_150CC_SFP_Square_1.jpg", "Microcrystalline cellulose, glucose, dextrin, lactose, starch, coating (hypromellose, calcium carbonate, talc), sodium starch glycolate, magnesium stearate, silica"),
  },
  {
    id: "nutricost-melatonin-tablets-3mg-240-tablets",
    productName: "Nutricost Melatonin Tablets 3 mg (240 tablets)",
    category: "Sleep",
    formulaId: "nutricost-melatonin-tablets-3mg-240-tablets",
    audience: ADULT,
    minAge: 18,
    form: "tablet",
    productType: SUPPLEMENT,
    actives: [{ name: "Melatonin", strength: "3 mg" }],
    flags: [["Microcrystalline cellulose", "cleared", "mcc"], ["Dextrin", "limited", "dextrin"], ["Starch", "limited", "bareStarch"], ["Sodium starch glycolate", "cleared", "ssg"], ["Hypromellose", "cleared", "hpmc"], ["Titanium oxide", "high", "tio2"], ["Talc", "high", "talc"], ["Polyethylene glycol", "moderate", "peg"], ["Silica", "limited", "sio2"], ["Magnesium stearate", "cleared", "stearate"]],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Titanium oxide; Talc. Titanium oxide maps to the existing titanium dioxide High row. Avoid needs High. Limited-only never Avoid.",
    cite: pin("nutricost-melatonin-3mg-240-caps", "NTC_Melatonin_3MG_240TBL_150CCCOMPAX_SFP_Square.jpg", "Microcrystalline cellulose, dextrin, starch, sodium starch glycolate, coating powder (hydroxypropyl methylcellulose, titanium oxide, talc, polyethylene glycol), silica, magnesium stearate"),
  },
  {
    id: "nutricost-mct-oil-powder-salted-caramel-36-servings",
    productName: "Nutricost MCT Oil Powder, Salted Caramel (36 servings)",
    category: "Vitamins",
    formulaId: "nutricost-mct-oil-powder-salted-caramel-36-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "MCT Oil Powder", strength: "label serving" }],
    flags: [["Medium chain triglycerides", "limited", "mctUnlabeled"], ["Soluble tapioca fiber", "cleared", "tapiocaFiber"], ["Sodium caseinate", "limited", "caseinate"], ["Cocoa powder (processed with alkali)", "cleared", "cocoaAlkali"], ["Himalayan rock salt", "cleared", "himalayan"], ["Natural flavors", "limited", "flavors"], ["Stevia", "limited", "stevia"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Medium chain triglycerides; Sodium caseinate; Natural flavors; Stevia. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.",
    cite: pin("nutricost-mct-oil-powder", "NTC_MCTOilPowder_SaltedCaramel_1LB_46OZ_SFP_Square.jpg", "MCT oil powder (medium chain triglycerides, soluble tapioca fiber, sodium caseinate), cocoa powder (processed with alkali), Himalayan rock salt, natural flavors, stevia"),
  },
  {
    id: "nutricost-c8-mct-oil-powder-23-servings",
    productName: "Nutricost C8 MCT Oil Powder, Unflavored (23 servings)",
    category: "Vitamins",
    formulaId: "nutricost-c8-mct-oil-powder-23-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "C8 MCT Oil Powder", strength: "label serving" }],
    flags: [["Medium chain triglycerides", "limited", "mctUnlabeled"], ["Soluble tapioca fiber", "cleared", "tapiocaFiber"], ["Sodium caseinate", "limited", "caseinate"], ["Sunflower lecithin", "cleared", "lecithin"], ["Silica", "limited", "sio2"], ["Choline chloride", "cleared", "cholineCl"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Medium chain triglycerides; Sodium caseinate; Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-c8-mct-oil-unflavored-powder", "NTC_C8MCTOilPowderUF_8OZ_20OZ_SFP_Square.jpg", "C8 medium chain triglycerides oil powder (medium chain triglycerides, soluble tapioca fiber, sodium caseinate (a milk derivative), contains 2% or less of each of the following: sunflower lecithin, silica, choline chloride)"),
  },
  {
    id: "nutricost-c8-mct-oil-powder-90-servings",
    productName: "Nutricost C8 MCT Oil Powder, Unflavored (90 servings)",
    category: "Vitamins",
    formulaId: "nutricost-c8-mct-oil-powder-90-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "C8 MCT Oil Powder", strength: "label serving" }],
    flags: [["Medium chain triglycerides", "limited", "mctUnlabeled"], ["Cassava dextrin", "limited", "cassavaDextrin"], ["Sodium caseinate", "limited", "caseinate"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Medium chain triglycerides; Cassava dextrin; Sodium caseinate. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.",
    cite: pin("nutricost-c8-mct-oil-unflavored-powder", "NTC_C8MCT_OilPowder_UF_2LB_2750CC_SFP_Square.jpg", "C8 medium chain triglycerides oil powder (medium chain triglycerides, cassava dextrin, sodium caseinate (a milk derivative))"),
  },
  {
    id: "nutricost-melatonin-extended-release-capsules-5mg-240-capsules",
    productName: "Nutricost Melatonin Extended Release Capsules 5 mg (240 capsules)",
    category: "Sleep",
    formulaId: "nutricost-melatonin-extended-release-capsules-5mg-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Slow Release Melatonin", strength: "5 mg" }],
    flags: [["Rice flour", "limited", "riceFlour"], ["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Hydrogenated vegetable oil", "limited", "hvoOi"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Hydrogenated vegetable oil. Hydrogenated vegetable oil on this capsule is the Other Ingredient Caution row. Gummy hydrogenated-vegetable-oil fat blend stays Avoid. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.",
    cite: pin("nutricost-melatonin-5mg-240-capsules", "NTC_Extended-ReleaseMelatonin_5MG_240CAP_275CC_SFP_Square_35686ab6-774b-4f42-82ae-032c58eb9246.jpg", "Rice flour, hypromellose (cellulose) capsule, magnesium stearate (vegetable source), hydrogenated vegetable oil"),
  },
  {
    id: "nutricost-pre-x-workout-complex-powder-grape-30-servings",
    productName: "Nutricost Pre-X Workout Complex Powder, Grape (30 servings)",
    category: "Vitamins",
    formulaId: "nutricost-pre-x-workout-complex-powder-grape-30-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Pre-X Workout Complex Powder", strength: "label serving" }],
    flags: [["Tartaric acid", "cleared", "tartaric"], ["Citric acid", "cleared", "citric"], ["Natural and artificial flavors", "limited", "flavors"], ["Sucralose", "moderate", "sucralose"], ["Sodium citrate", "cleared", "citrate"], ["Calcium silicate", "limited", "caSilicate"], ["Silica", "limited", "sio2"], ["Maltodextrin", "limited", "maltodextrin"], ["Grape (fruit) powder (for color)", "cleared", "grapeColor"], ["Dicalcium phosphate", "cleared", "dical"], ["Dextrin", "limited", "dextrin"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural and artificial flavors; Sucralose; Calcium silicate; Silica; Maltodextrin; Dextrin. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-pre-workout-complex-powder-30-servings", "NTC_PRE-X_Grape_30SERV_25OZ_SFP_Square_1.jpg", "Tartaric acid, citric acid, natural and artificial flavors, sucralose, sodium citrate, calcium silicate, silica, maltodextrin, grape (fruit) powder (for color), dicalcium phosphate, dextrin"),
  },
  {
    id: "nutricost-pre-x-workout-complex-powder-grape-60-servings",
    productName: "Nutricost Pre-X Workout Complex Powder, Grape (60 servings)",
    category: "Vitamins",
    formulaId: "nutricost-pre-x-workout-complex-powder-grape-60-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Pre-X Workout Complex Powder", strength: "label serving" }],
    flags: [["Tartaric acid", "cleared", "tartaric"], ["Citric acid", "cleared", "citric"], ["Natural and artificial flavors", "limited", "flavors"], ["Sucralose", "moderate", "sucralose"], ["Sodium citrate", "cleared", "citrate"], ["Calcium silicate", "limited", "caSilicate"], ["Silica", "limited", "sio2"], ["Mannitol", "limited", "polyol"], ["Grape (fruit) powder (for color)", "cleared", "grapeColor"], ["Dicalcium phosphate", "cleared", "dical"], ["Dextrin", "limited", "dextrin"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural and artificial flavors; Sucralose; Calcium silicate; Silica; Mannitol; Dextrin. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-pre-workout-complex-powder-30-servings", "NTC_PRE-X_Grape_60SERV_46OZ_SFP_Square.jpg", "Tartaric acid, citric acid, natural and artificial flavors, sucralose, sodium citrate, calcium silicate, silica, mannitol, grape (fruit) powder (for color), dicalcium phosphate, dextrin"),
  },
  {
    id: "nutricost-multi-collagen-hair-skin-nails-hot-cocoa-30-servings",
    productName: "Nutricost Multi Collagen (Hair, Skin, Nails Formula), Hot Cocoa (30 servings)",
    category: "Vitamins",
    formulaId: "nutricost-multi-collagen-hair-skin-nails-hot-cocoa-30-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Multi Collagen (Hair, Skin, Nails Formula)", strength: "label serving" }],
    flags: [["Cocoa powder (processed with alkali)", "cleared", "cocoaAlkali"], ["Natural flavors", "limited", "flavors"], ["Dicalcium phosphate", "cleared", "dical"], ["Himalayan rock salt", "cleared", "himalayan"], ["Stevia", "limited", "stevia"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural flavors; Stevia. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.",
    cite: pin("nutricost-multi-collagen-hair-skin-nails-formula", "NTC_MultiCollagenProtein_Beauty_Chocolate_30SERV_46OZ_SFP_Square_1.jpg", "Cocoa powder (processed with alkali), natural flavors, dicalcium phosphate, Himalayan rock salt, stevia"),
  },
  {
    id: "nutricost-vitamin-d3-gummies-5000-iu-120-gummies",
    productName: "Nutricost Vitamin D3 Gummies 5,000 IU (120 gummies)",
    category: "Vitamins",
    formulaId: "nutricost-vitamin-d3-gummies-5000-iu-120-gummies",
    audience: ADULT,
    minAge: 18,
    form: "gummy",
    productType: SUPPLEMENT,
    actives: [{ name: "Vitamin D3 Gummies", strength: "label serving" }],
    flags: [["Glucose syrup", "cleared", "glucoseSyrup"], ["Sugar", "limited", "sugar"], ["Glucose", "limited", "glucose"], ["Pectin", "cleared", "pectin"], ["Citric acid", "cleared", "citric"], ["Sodium citrate", "cleared", "citrate"], ["Natural flavors", "limited", "flavors"], ["Vegetable oil", "high", "vegOilGummy"], ["Carnauba wax", "cleared", "wax"], ["Fruit and vegetable juice concentrate (for color)", "cleared", "juiceColor"]],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Vegetable oil. Vegetable oil in this gummy is the gummy seed-oil High row. Gummy hydrogenated-vegetable-oil fat blend stays Avoid and is not this string. Avoid needs High. Limited-only never Avoid.",
    cite: pin("nutricost-vitamin-d3-gummies-5-000iu", "NTC_VitaminD3_5000IU__120GUM__MixedBerry__300CCCLEAR_SFP_Square.jpg", "Glucose syrup, sugar, glucose, pectin, citric acid, sodium citrate, natural flavors, vegetable oil (contains carnauba wax), fruit and vegetable juice concentrate (for color)"),
  },
];

export const BATCH78_KYR6_NUTRICOST_TOKEN_BACKFILL_2: RatingRecord[] = COMPACT.map(expand);

export const BATCH78_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: "Nutricost C8 MCT Oil Powder",
    reason: "SKIPPED other. Unflavored 1 lb count tab has no supplement-facts image on the nutricost.com product page. Not a no_OI hunt and not an OUT category. OI not invented.",
  },
];

export const BATCH78_REFUSED: { sku: string; reason: string }[] = [];

const _ROWS = BATCH78_KYR6_NUTRICOST_TOKEN_BACKFILL_2;
if (_ROWS.length !== 21) throw new Error('batch78 tally drift: expected 21 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch78 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 18) {
  throw new Error('batch78 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 3) {
  throw new Error('batch78 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch78 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch78 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch78 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) {
  throw new Error('batch78 writes Nutricost only');
}
if (_ROWS.some((r) => r.barcode)) {
  throw new Error('batch78 must not attach an invented UPC');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 3) {
  throw new Error('batch78 REUSE-formula tally drift');
}
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|naturewise|welmate|goodsense|healtha2z|time-cap|a\+health/i.test(r.brand + r.productName))) {
  throw new Error('batch78 leftover 3P / Sprouts / toothpaste / NOW must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/powder|softgel|capsule|gumm|tablet/i.test(r.productName))) {
  throw new Error('batch78 must not grade oil pour bottles');
}
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch78 Avoid without High on ${record.id}`);
  }
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch78 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch78 Clean row has a non-cleared flag on ${record.id}`);
  }
  if (record.form === 'gummy' && record.inactiveIngredients.some((i) => /vegetable oil|sunflower oil|palm oil|soybean oil|hydrogenated vegetable oil/i.test(i.name) && i.riskLevel !== 'high')) {
    throw new Error(`batch78 gummy seed oil must be High on ${record.id}`);
  }
  if (record.form !== 'gummy' && record.inactiveIngredients.some((i) => i.name === 'Hydrogenated vegetable oil' && i.riskLevel === 'high')) {
    throw new Error(`batch78 non-gummy HVO must stay the OI Caution row on ${record.id}`);
  }
}
if (BATCH78_SKIPPED.length !== 1) {
  throw new Error('batch78 skip tally drift');
}
if (!BATCH78_SKIPPED.every((s) => /no supplement-facts image/i.test(s.reason) && /not a no_OI hunt/i.test(s.reason) && /not an OUT/i.test(s.reason))) {
  throw new Error('batch78 skip is the missing-image tab only');
}
if (BATCH78_REFUSED.length !== 0) {
  throw new Error('batch78 refuse tally drift');
}
