// DRAFT / not verified / batch 79 KYR6 Nutricost no_OI second look.
// Methodology v1.6 + MAIN §5 after the Sept 22, 2026 stamps.
// Harm-first. No invented grades. No invented UPCs. No OCR aliases.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Nutricost only. Hunt list = batch76 SKIPPED no_OI (140).
// batch76, batch77, and batch78 were not edited. OUT 135 was not reopened.
// No NatureWise / WELMATE / A+Health / HealthA2Z / TIME-Cap / GoodSense.
// No toothpaste. No house Amazon. No Sprouts. No graded oil pour bottles.
// Leftover Amazon 3P stays N=6.
//
// Ladder this pass: nutricost.com first (products.json gallery + every
// SFP image on the matched PDP, then a visual read of the panels below).
// iHerb search returned 403. Walmart search returned a robot wall.
// Vitacost search HTML did not return a product PDP. Amazon search HTML
// loaded, but Amazon image carousels were not opened SKU-by-SKU for the
// leftover set (a later Amazon search probe from this environment returned
// HTTP 503). A row below exists only when a nutricost.com label image
// showed a real Supplement Facts / Other Ingredients line and every token
// is an exact locked §5 string.
//
// Count tabs on a written SKU that still had no confirmed panel, or that
// printed an unstamped token, were not given a Search row. Cordyceps 180
// cap is the refused count tab (organic oat fiber inside the flow-agent
// blend — not an explicit §5 string). Unread flavored EAA / bisglycinate
// tabs and unread magnesium-oxide 400 mg / 750 mg tabs stay off this file.
// Twins already cited in batch76–78 were not rewritten (beef gelatin 2 lb
// included). recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Pack sizes of the same
// product + OI + form share formulaId. Search wiring only.
//
// TALLY (unverified drafts in THIS file): 47 rows —
// Clean 21 / Caution 22 / Avoid 4.
// NEW 42 / REUSE-formula 5 / SKIPPED 91
// (no_OI leftover 79 / already on MAIN 5 / OUT 7) /
// REFUSED 9 (8 hunt-list SKUs + cordyceps 180-cap count tab).
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'Nutricost';
const AMAZON = ['Amazon', 'nutricost.com'] as const;
const CDN = 'https://cdn.shopify.com/s/files/1/0222/4128/0074/files/';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  acacia: "Methodology §5 Cleared (gum arabic / acacia / organic acacia gum)",
  artFlavor: "Methodology §5 Limited-risk (artificial flavors)",
  beetColor: "Methodology §5 Cleared (beet root powder (for color) / beetroot powder (for color) / beet root (for color) — named plant color; locked Sept 22, 2026).",
  citrate: "Methodology §5 Cleared (citrate salts as fillers/buffers)",
  citric: "Methodology §5 Cleared (citric acid)",
  dical: "Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate). Label string on this row: Di-calcium phosphate.",
  flavors: "Methodology §5 Limited-risk (natural flavors / natural flavoring / natural and artificial flavors — undisclosed mixtures)",
  gelatin: "Methodology §5 Cleared (gelatin / gelatin capsule)",
  glucose: "Methodology §5 Limited-risk (bare glucose — exact token; Caution; distinct from Cleared cane sugar / glucose syrup; locked Sept 22, 2026). Not Avoid.",
  glucoseSyrup: "Methodology §5 Cleared (glucose syrup). Distinct from Caution bare glucose.",
  grapeColor: "Methodology §5 Cleared (grape (fruit) powder (for color) — exact token as color; locked Sept 22, 2026).",
  hpmc: "Methodology §5 Cleared (hypromellose / HPMC / cellulose capsule)",
  juiceColor: "Methodology §5 Cleared (named fruit-or-vegetable juice concentrate as color). Label string: fruit and vegetable juice concentrate (for color).",
  malic: "Methodology §5 Cleared (malic acid / L-malic acid)",
  mcc: "Methodology §5 Cleared (microcrystalline cellulose)",
  palmGummy: "Methodology §5 High (palm oil in a gummy — seed/industrial oil gummy row). Not the Cleared non-gummy palm-fill row.",
  pectin: "Methodology §5 Cleared (pectin — xanthan/guar/gum family)",
  polyol: "Methodology §5 Limited-risk (oral sugar alcohols — isomalt). Not Avoid.",
  pullulan: "Methodology §5 Cleared (organic pullulan / pullulan capsule)",
  riceExtract: "Methodology §5 Limited-risk (unspecified rice extract / rice extract blend — the label did not name hull, bran, or concentrate on that token). Named rice hulls stay Cleared.",
  riceFlour: "Methodology §5 Caution (rice flour — exact token; not Cleared rice hull / rice bran)",
  cornStarch: "Methodology §5 Cleared (named corn starch / potato starch / pregelatinized starch — not Limited modified starch and not Caution unspecified starch)",
  caSilicate: "Methodology §5 Caution (calcium silicate — exact token; not the silicon dioxide cap)",
  riceHull: "Methodology §5 Cleared (rice hulls / organic rice hull concentrate — not rice flour)",
  sio2: "Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). It does not push Avoid.",
  stearate: "Methodology §5 Cleared (magnesium stearate / stearic acid / calcium laurate, including vegetable source)",
  stevia: "Methodology §5 Caution (whole-leaf / crude stevia — not Reb A / Reb M). Distinct from Caution stevia extract and from Cleared Reb M.",
  sugar: "Methodology §5 Limited-risk (bare sugar — exact token; Caution; distinct from Cleared cane sugar; locked Sept 22, 2026). Not Avoid.",
  sunflowerFill: "Methodology §5 Cleared as non-gummy fill (sunflower oil on a capsule, softgel, tablet, or powder — not the gummy seed-oil High rule).",
  vegOilGummy: "Methodology §5 High (vegetable oil in a gummy — seed/industrial oil gummy row).",
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
  return `Current nutricost.com supplement-facts panel (https://nutricost.com/products/${productPath}; image ${CDN}${image}) other-ingredients: ${oi}. Brand-site pack image is the pin (the label image was read before this write). Live Amazon US exact pack when this Nutricost name is listed. No 12-digit UPC decoded from the panel — omitted. No DailyMed drug SPL.`;
}

type Compact = {
  id: string;
  productName: string;
  category: string;
  barcode?: string;
  formulaId: string;
  audience: typeof ADULT | typeof KIDS;
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
      "Immune Support": ["natures-way-alive-max6", "Independently Clean Nature's Way Alive! Max6 already on main. Form labeled, not a hard filter (§6)."],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
  }
  const cite = d.barcode
    ? d.cite.replace(
        /No 12-digit UPC decoded[^.]*\./,
        `UPC-A ${d.barcode} attached from nutricost.com variant barcode (exact count tab).`,
      )
    : d.cite;
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    barcode: d.barcode,
    formulaId: d.formulaId,
    audience: d.audience,
    minAge: d.minAge,
    form: d.form,
    productType: d.productType,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. Adults unless the name says kids. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  });
}

const CLEAN_NOTE =
  "FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only, or the panel is a confirmed-empty powder (Other ingredients: None, or a single-ingredient line that names only the powder). No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Sunflower or palm oil on this non-gummy form is not the gummy seed-oil High rule.";

const CINNAMON = "nutricost-b79-cinnamon-ceylon-240-capsules";
const LIVER = "nutricost-b79-beef-liver-240-capsules";
const ALA = "nutricost-b79-ala-120-capsules";

const COMPACT: Compact[] = [
  {
    id: "nutricost-b79-reishi-120-capsules",
    productName: "Nutricost Made With Organic Reishi Mushroom Capsules (120 capsules)",
    barcode: "810014670294",
    category: "Vitamins",
    formulaId: "nutricost-b79-reishi-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Organic Reishi Mushroom", strength: "label serving" }],
    flags: [["Organic pullulan capsule", "cleared", "pullulan"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-organic-reishi-mushroom-120-capsules", "NTC_Reishi_750MG_120CAP_300CC_SFP_Square.jpg", "Organic pullulan capsule, magnesium stearate (vegetable source)"),
  },
  {
    id: CINNAMON,
    productName: "Nutricost Cinnamon Made with Organic Ceylon Capsules (240 capsules)",
    barcode: "810139574453",
    category: "Vitamins",
    formulaId: CINNAMON,
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Organic Ceylon Cinnamon", strength: "label serving" }],
    flags: [["Organic pullulan capsule", "cleared", "pullulan"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-cinnamon-1200mg-150-capsules", "NTC_Organics_Cinnamon_MWO__600MGX2_240CAP_500CC_SFP_Square_1.jpg", "Organic pullulan capsule, magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-cinnamon-ceylon-150-capsules",
    productName: "Nutricost Cinnamon Made with Organic Ceylon Capsules (150 capsules)",
    barcode: "810014670454",
    category: "Vitamins",
    formulaId: CINNAMON,
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Organic Ceylon Cinnamon", strength: "label serving" }],
    flags: [["Organic pullulan capsule", "cleared", "pullulan"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-cinnamon-1200mg-150-capsules", "NTC_Cinnamon_600MG_150CAP_400CC_SFP_Square.jpg", "Organic pullulan capsule, magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-chamomile-240-capsules",
    productName: "Nutricost Chamomile Capsules (240 capsules)",
    barcode: "810014674063",
    category: "Sleep",
    formulaId: "nutricost-b79-chamomile-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Chamomile", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-chamomile-capsules", "NTC_Chamomile_375MGx2_240CAP_500CC_SFP_Square.jpg", "Hypromellose (cellulose) capsule"),
  },
  {
    id: LIVER,
    productName: "Nutricost Grass-Fed Desiccated Beef Liver Capsules (240 capsules)",
    barcode: "810014672304",
    category: "Vitamins",
    formulaId: LIVER,
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Grass-Fed Desiccated Beef Liver", strength: "label serving" }],
    flags: [["Gelatin capsule", "cleared", "gelatin"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-grass-fed-desiccated-beef-liver-capsules", "NTC_Grass-Fed_DesiccatedBeefLiver_3000MG_240CAPS_SFP_Square.jpg", "Gelatin capsule"),
  },
  {
    id: "nutricost-b79-beef-liver-120-capsules",
    productName: "Nutricost Grass-Fed Desiccated Beef Liver Capsules (120 capsules)",
    barcode: "810014678450",
    category: "Vitamins",
    formulaId: LIVER,
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Grass-Fed Desiccated Beef Liver", strength: "label serving" }],
    flags: [["Gelatin capsule", "cleared", "gelatin"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-grass-fed-desiccated-beef-liver-capsules", "NTC_GFDesiccatedBeefLiver_750MG_120CAP_275CC_SFP_Square.jpg", "Gelatin capsule"),
  },
  {
    id: "nutricost-b79-calcium-lactate-180-capsules",
    productName: "Nutricost Calcium Lactate Capsules (180 capsules)",
    barcode: "810014678757",
    category: "Vitamins",
    formulaId: "nutricost-b79-calcium-lactate-180-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Calcium Lactate", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-calcium-lactate", "NTC_CalciumLactate_86.6MGX3_180CAP_400CC_SFP_Square.jpg", "Hypromellose (cellulose) capsule, magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-noni-240-capsules",
    productName: "Nutricost Made With Organic Noni Capsules (240 capsules)",
    barcode: "810014672809",
    category: "Vitamins",
    formulaId: "nutricost-b79-noni-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Organic Noni", strength: "label serving" }],
    flags: [["Pullulan capsule", "cleared", "pullulan"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-noni", "NTC_Noni_MWO__500MG_240CAPS_400CC_SFP_Square_1.jpg", "Pullulan capsule, magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-cordyceps-90-capsules",
    productName: "Nutricost Made With Organic Cordyceps Capsules (90 capsules)",
    barcode: "810014670829",
    category: "Vitamins",
    formulaId: "nutricost-b79-cordyceps-90-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Organic Cordyceps", strength: "label serving" }],
    flags: [["Pullulan capsule", "cleared", "pullulan"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-organic-cordyceps-capsules", "NTC_Cordyceps_MWO__550MG__P0__90CAP_175CC_SFP_Square.jpg", "Pullulan capsule, magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-creatine-hcl-120-capsules",
    productName: "Nutricost Creatine HCl Capsules (120 capsules)",
    barcode: "810139575252",
    category: "Vitamins",
    formulaId: "nutricost-b79-creatine-hcl-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Creatine HCl", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-creatine-hcl-capsules", "NTC_CreatineHCL_ConCret_120CAP_300CC_SFP_Square.jpg", "Hypromellose (cellulose) capsule"),
  },
  {
    id: "nutricost-b79-hmb-powder-250g",
    productName: "Nutricost HMB Powder (250 g)",
    barcode: "857077008916",
    category: "Vitamins",
    formulaId: "nutricost-b79-hmb-powder-250g",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "HMB", strength: "label serving" }],
    flags: [],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-hmb-powder-250-grams", "NTC_HMB_250GM_25OZ_SFP_Square.jpg", "None"),
  },
  {
    id: "nutricost-b79-l-leucine-powder-500g",
    productName: "Nutricost L-Leucine Powder, Unflavored (500 g)",
    barcode: "702669932103",
    category: "Vitamins",
    formulaId: "nutricost-b79-l-leucine-powder-500g",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "L-Leucine", strength: "label serving" }],
    flags: [],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-l-leucine-powder-500-grams-unflavored", "NTC_L-Leucine_UF_500GM_1500CC_SFP_Square_0feaf374-2ad2-4de7-9fd1-f3dd0989c31a.jpg", "None"),
  },
  {
    id: "nutricost-b79-chaga-powder-8oz",
    productName: "Nutricost Organic Chaga Mushroom Powder (8 oz)",
    barcode: "810014670355",
    category: "Vitamins",
    formulaId: "nutricost-b79-chaga-powder-8oz",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Organic Chaga Mushroom", strength: "label serving" }],
    flags: [],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-100-organic-chaga-mushroom-powder-8oz", "NTC_OrganicChagaMushroomPowder_UF_8OZ_25OZ_SFP_Square.jpg", "None"),
  },
  {
    id: "nutricost-b79-magnesium-bisglycinate-unflavored",
    productName: "Nutricost Magnesium Bisglycinate, Unflavored",
    barcode: "810014675961",
    category: "Digestive",
    formulaId: "nutricost-b79-magnesium-bisglycinate-unflavored",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Magnesium Bisglycinate", strength: "label serving" }],
    flags: [],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-magnesium-bisglycinate", "NTC_MagnesiumBisglycinate_UF_250MG_20OZ_SFP.jpg", "None"),
  },
  {
    id: "nutricost-b79-beef-gelatin-powder-1lb",
    productName: "Nutricost Beef Gelatin Powder (1 lb)",
    barcode: "810139571179",
    category: "Vitamins",
    formulaId: "nutricost-b79-beef-gelatin-powder-1lb",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Beef Gelatin", strength: "label serving" }],
    flags: [],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-beef-gelatin-powder-1", "NTC_BeefGelatinPowder__1LB__SFP_1_1.jpg", "None"),
  },
  {
    id: "nutricost-b79-grass-fed-beef-gelatin-powder",
    productName: "Nutricost Grass-Fed Beef Gelatin Powder",
    barcode: "810139576822",
    category: "Vitamins",
    formulaId: "nutricost-b79-grass-fed-beef-gelatin-powder",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Grass-Fed Beef Gelatin", strength: "label serving" }],
    flags: [],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-grass-fed-beef-gelatin-powder", "NTC_GF_BeefGelatinPowder_1LB_25OZ_SFP_Square.jpg", "None separate from the single ingredient line. Ingredients: Grass-fed beef gelatin"),
  },
  {
    id: "nutricost-b79-calcium-hydroxyapatite-120-capsules",
    productName: "Nutricost Calcium Hydroxyapatite Capsules (120 capsules)",
    barcode: "810139576983",
    category: "Vitamins",
    formulaId: "nutricost-b79-calcium-hydroxyapatite-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Calcium Hydroxyapatite", strength: "label serving" }],
    flags: [["Gelatin capsule", "cleared", "gelatin"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-calcium-hydroxyapatite", "NTC_CalciumHydroxyapatite_250MGX4_120CAP_300CC_SFP_Square.jpg", "Gelatin capsule, magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-eaa-unflavored-30-servings",
    productName: "Nutricost EAA Powder, Unflavored (30 servings)",
    barcode: "810014674223",
    category: "Vitamins",
    formulaId: "nutricost-b79-eaa-unflavored-30-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "EAA", strength: "label serving" }],
    flags: [["Silica", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-eaa-powder", "NTC_Performance_EAA_UF_30SERV_20OZ_SFP_Square_1.jpg", "Silica"),
  },
  {
    id: "nutricost-b79-peak-atp-120-capsules",
    productName: "Nutricost ATP Supplement (120 capsules)",
    barcode: "810139576648",
    category: "Vitamins",
    formulaId: "nutricost-b79-peak-atp-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "PeakATP", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Rice flour", "limited", "riceFlour"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Silica", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-atp-supplement", "NTC_PeakATP_200MGX2__V1__120CAP_SFP_Square.jpg", "Hypromellose (cellulose) capsule, rice flour, magnesium stearate (vegetable source), silica"),
  },
  {
    id: "nutricost-b79-tongkat-ali-60-capsules",
    productName: "Nutricost Tongkat Ali Capsules (60 capsules)",
    barcode: "810014679525",
    category: "Vitamins",
    formulaId: "nutricost-b79-tongkat-ali-60-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Tongkat Ali", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Rice flour", "limited", "riceFlour"], ["Microcrystalline cellulose", "cleared", "mcc"], ["Silica", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-tongkat-ali-200-1-500mg-60-capsules", "NTC_TongkatAliComplex_500MGX2_VOE_60CAP_150CC_SFP_Square.jpg", "Hypromellose (cellulose) capsule, rice flour, microcrystalline cellulose, silica"),
  },
  {
    id: "nutricost-b79-tongkat-ali-120-capsules",
    productName: "Nutricost Tongkat Ali Capsules (120 capsules)",
    barcode: "810014678610",
    category: "Vitamins",
    formulaId: "nutricost-b79-tongkat-ali-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Tongkat Ali", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Dicalcium phosphate", "cleared", "dical"], ["Calcium laurate", "cleared", "stearate"], ["Silica", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-tongkat-ali-200-1-500mg-60-capsules", "NTC_TongkatAliComplex_500MGx2_V0E_120CAP_225CC_SFP_Square.jpg", "Hypromellose (cellulose) capsule, dicalcium phosphate, calcium laurate, silica"),
  },
  {
    id: "nutricost-b79-myhmb-120-capsules",
    productName: "Nutricost Performance myHMB Capsules (120 capsules)",
    barcode: "810139571728",
    category: "Vitamins",
    formulaId: "nutricost-b79-myhmb-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "myHMB", strength: "label serving" }],
    flags: [["Gelatin capsule", "cleared", "gelatin"], ["Stearic acid (vegetable source)", "cleared", "stearate"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Silica", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("performance-myhmb-capsules", "NTC_myHMB_500MGX2_120CAP_275CC_SFP_Square.jpg", "Gelatin capsule, stearic acid (vegetable source), magnesium stearate (vegetable source), silica"),
  },
  {
    id: "nutricost-b79-white-willow-120-capsules",
    productName: "Nutricost White Willow Bark Capsules (120 capsules)",
    barcode: "810014679990",
    category: "Vitamins",
    formulaId: "nutricost-b79-white-willow-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "White Willow Bark", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Rice flour", "limited", "riceFlour"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Stearic acid", "cleared", "stearate"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-white-willow-bark", "NTC_WhiteWillowBark_600MG_120CAP_275CC_SFP_Square_fa2b5b30-796b-4800-8723-06b586637323.jpg", "Hypromellose (cellulose) capsule, rice flour, magnesium stearate (vegetable source), stearic acid"),
  },
  {
    id: "nutricost-b79-magnesium-malate-180-capsules",
    productName: "Nutricost Magnesium Malate Capsules (180 capsules)",
    barcode: "810014672960",
    category: "Digestive",
    formulaId: "nutricost-b79-magnesium-malate-180-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Magnesium Malate", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Rice extract", "limited", "riceExtract"], ["Rice hulls", "cleared", "riceHull"], ["Gum arabic", "cleared", "acacia"], ["Sunflower oil", "cleared", "sunflowerFill"], ["Microcrystalline cellulose", "cleared", "mcc"], ["Rice flour", "limited", "riceFlour"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice extract; Rice flour. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-magnesium-malate-capsules", "NTC_MagnesiumMalate_420MG_180CAP_400CC_SFP_Square.jpg", "Hypromellose (cellulose) capsule, rice extract blend (rice extract, rice hulls, gum arabic, sunflower oil), microcrystalline cellulose, rice flour"),
  },
  {
    id: "nutricost-b79-magnesium-oxide-375mg-240-capsules",
    productName: "Nutricost Magnesium Oxide Capsules (375 mg, 240 capsules)",
    barcode: "857077008053",
    category: "Digestive",
    formulaId: "nutricost-b79-magnesium-oxide-375mg-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Magnesium Oxide", strength: "label serving" }],
    flags: [["Rice flour", "limited", "riceFlour"], ["Gelatin capsule", "cleared", "gelatin"], ["Stearic acid (vegetable source)", "cleared", "stearate"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-magnesium-oxide-750mg-240-capsules", "NTC_MagnesiumOxide_375MG_240CAP_400CC_SFP_Square.jpg", "Rice flour, gelatin capsule, stearic acid (vegetable source), magnesium stearate (vegetable source)"),
  },
  {
    id: ALA,
    productName: "Nutricost Alpha Lipoic Acid Capsules (120 capsules)",
    barcode: "810014671666",
    category: "Vitamins",
    formulaId: ALA,
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Alpha Lipoic Acid", strength: "label serving" }],
    flags: [["Di-calcium phosphate", "cleared", "dical"], ["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Microcrystalline cellulose", "cleared", "mcc"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Silica", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-alpha-lipoic-acid-600mg-240-capsules", "NTC_AlphaLipoicAcid_300MG_120CAP_225CC_SFP_Square.jpg", "Di-calcium phosphate, hypromellose (cellulose) capsule, microcrystalline cellulose, magnesium stearate (vegetable source), silica"),
  },
  {
    id: "nutricost-b79-ala-240-capsules",
    productName: "Nutricost Alpha Lipoic Acid Capsules (240 capsules)",
    barcode: "702669931861",
    category: "Vitamins",
    formulaId: ALA,
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Alpha Lipoic Acid", strength: "label serving" }],
    flags: [["Di-calcium phosphate", "cleared", "dical"], ["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Microcrystalline cellulose", "cleared", "mcc"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Silica", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-alpha-lipoic-acid-600mg-240-capsules", "NTC_AlphaLipoicAcid_600MG_240CAP_400CC_SFP_Square_b83321e8-463f-47a4-a247-e85e916dcd39.jpg", "Di-calcium phosphate, hypromellose (cellulose) capsule, microcrystalline cellulose, magnesium stearate (vegetable source), silica"),
  },
  {
    id: "nutricost-b79-magnesium-complex-regular-240-capsules",
    productName: "Nutricost Magnesium+ Regular Strength Capsules (240 capsules)",
    barcode: "810139571308",
    category: "Digestive",
    formulaId: "nutricost-b79-magnesium-complex-regular-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Magnesium Complex", strength: "label serving" }],
    flags: [["Rice flour", "limited", "riceFlour"], ["Gelatin capsule", "cleared", "gelatin"], ["Rice extract", "limited", "riceExtract"], ["Rice hulls", "cleared", "riceHull"], ["Gum arabic", "cleared", "acacia"], ["Sunflower oil", "cleared", "sunflowerFill"], ["Stearic acid (vegetable source)", "cleared", "stearate"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Silica", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Rice extract; Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-magnesium-complex-regular-strength", "NTC_MagnesiumComplexRegularStrength_250MG_240CAP_400CC_SFP_Square.jpg", "Rice flour, gelatin capsule, rice extract blend (rice extract, rice hulls, gum arabic, sunflower oil), stearic acid (vegetable source), magnesium stearate (vegetable source), silica"),
  },
  {
    id: "nutricost-b79-soluble-fiber-berry-30-servings",
    productName: "Nutricost Soluble Fiber, Berry (30 servings)",
    barcode: "810139572633",
    category: "Digestive",
    formulaId: "nutricost-b79-soluble-fiber-berry-30-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Soluble Fiber", strength: "label serving" }],
    flags: [["Natural flavors", "limited", "flavors"], ["L-malic acid", "cleared", "malic"], ["Citric acid", "cleared", "citric"], ["Stevia", "limited", "stevia"], ["Beet root powder (for color)", "cleared", "beetColor"], ["Grape (fruit) powder (for color)", "cleared", "grapeColor"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural flavors; Stevia. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("soluble-fiber", "NTC_SolubleFiber_Berry_30SERV_25OZ_SFP_Square.jpg", "Natural flavors, L-malic acid, citric acid, stevia, beet root powder (for color), grape (fruit) powder (for color)"),
  },
  {
    id: "nutricost-b79-kids-vitamin-d3-gummies",
    productName: "Nutricost Kids Vitamin D3 Gummies",
    barcode: "810014672519",
    category: "Vitamins",
    formulaId: "nutricost-b79-kids-vitamin-d3-gummies",
    audience: KIDS,
    minAge: 4,
    form: "gummy",
    productType: VITAMIN,
    actives: [{ name: "Vitamin D3", strength: "label serving" }],
    flags: [["Glucose syrup", "cleared", "glucoseSyrup"], ["Sugar", "limited", "sugar"], ["Glucose", "limited", "glucose"], ["Pectin", "cleared", "pectin"], ["Citric acid", "cleared", "citric"], ["Sodium citrate", "cleared", "citrate"], ["Natural flavors", "limited", "flavors"], ["Vegetable oil", "high", "vegOilGummy"], ["Carnauba wax", "cleared", "wax"], ["Fruit and vegetable juice concentrate (for color)", "cleared", "juiceColor"]],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Vegetable oil. Vegetable oil in this gummy is the gummy seed-oil High row. Avoid needs High. Limited-only never Avoid. The panel image did not print a minimum age; the kids name is carried as minAge 4.",
    cite: "Current nutricost.com supplement-facts panel (https://nutricost.com/products/nutricost-kids-vitamin-d-gummies; image https://cdn.shopify.com/s/files/1/0222/4128/0074/products/nutricost-kids-vitamin-d3-gummies-173862.jpg) other-ingredients: Glucose syrup, sugar, glucose, pectin, citric acid, sodium citrate, natural flavors, vegetable oil (contains carnauba wax), fruit and vegetable juice concentrate (for color). Brand-site pack image is the pin (the label image was read before this write). Live Amazon US exact pack when this Nutricost name is listed. UPC-A 810014672519 attached from nutricost.com variant barcode (exact count tab). No DailyMed drug SPL.",
  },
  {
    id: "nutricost-b79-elderberry-gummies-vitamin-c-zinc",
    productName: "Nutricost Elderberry Gummies with Vitamin C & Zinc (90 gummies)",
    barcode: "810014670041",
    category: "Immune Support",
    formulaId: "nutricost-b79-elderberry-gummies-vitamin-c-zinc",
    audience: ADULT,
    minAge: 18,
    form: "gummy",
    productType: SUPPLEMENT,
    actives: [{ name: "Elderberry with Vitamin C and Zinc", strength: "label serving" }],
    flags: [["Glucose syrup", "cleared", "glucoseSyrup"], ["Isomalt", "limited", "polyol"], ["Sugar", "limited", "sugar"], ["Glucose", "limited", "glucose"], ["Pectin", "cleared", "pectin"], ["Citric acid", "cleared", "citric"], ["Sodium citrate", "cleared", "citrate"], ["Natural flavors", "limited", "flavors"], ["Vegetable oil", "high", "vegOilGummy"], ["Carnauba wax", "cleared", "wax"]],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Vegetable oil. Vegetable oil in this gummy is the gummy seed-oil High row. Avoid needs High. Limited-only never Avoid.",
    cite: "Current nutricost.com supplement-facts panel (https://nutricost.com/products/nutricost-elderberry-90mg-with-vitamin-c-zinc-90-gummies; image https://cdn.shopify.com/s/files/1/0222/4128/0074/products/nutricost-elderberry-gummies-with-vitamin-c-zinc-940698.jpg) other-ingredients: Glucose syrup, isomalt, sugar, glucose, pectin, citric acid, sodium citrate, natural flavors, vegetable oil (contains carnauba wax). Brand-site pack image is the pin (the label image was read before this write). Live Amazon US exact pack when this Nutricost name is listed. UPC-A 810014670041 attached from nutricost.com variant barcode (exact count tab). No DailyMed drug SPL.",
  },
  {
    id: "nutricost-b79-elderberry-gummies-90",
    productName: "Nutricost Elderberry Gummies (90 gummies)",
    barcode: "810014670041",
    category: "Immune Support",
    formulaId: "nutricost-b79-elderberry-gummies-90",
    audience: ADULT,
    minAge: 18,
    form: "gummy",
    productType: SUPPLEMENT,
    actives: [{ name: "Elderberry", strength: "label serving" }],
    flags: [["Glucose syrup", "cleared", "glucoseSyrup"], ["Sugar", "limited", "sugar"], ["Pectin", "cleared", "pectin"], ["Sodium citrate", "cleared", "citrate"], ["Artificial flavors", "limited", "artFlavor"], ["Palm oil", "high", "palmGummy"], ["Carnauba wax", "cleared", "wax"]],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Palm oil. Palm oil in this gummy is the gummy seed-oil High row, not the Cleared non-gummy palm-fill row. Avoid needs High. Limited-only never Avoid.",
    cite: pin("nutricost-elderberry-gummies", "NTC_Elderberry_Berry_50MG_90GUM_400CCCLEAR_SFP_Square.jpg", "Glucose syrup, sugar, pectin, sodium citrate, artificial flavors, palm oil (contains carnauba wax)"),
  },
  {
    id: "nutricost-b79-elderberry-gummies-60",
    productName: "Nutricost Elderberry Gummies (60 gummies)",
    barcode: "810014672670",
    category: "Immune Support",
    formulaId: "nutricost-b79-elderberry-gummies-60",
    audience: ADULT,
    minAge: 18,
    form: "gummy",
    productType: SUPPLEMENT,
    actives: [{ name: "Elderberry", strength: "label serving" }],
    flags: [["Glucose syrup", "cleared", "glucoseSyrup"], ["Isomalt", "limited", "polyol"], ["Sugar", "limited", "sugar"], ["Glucose", "limited", "glucose"], ["Pectin", "cleared", "pectin"], ["Citric acid", "cleared", "citric"], ["Sodium citrate", "cleared", "citrate"], ["Natural flavor", "limited", "flavors"], ["Vegetable oil", "high", "vegOilGummy"], ["Carnauba wax", "cleared", "wax"]],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Vegetable oil. Vegetable oil in this gummy is the gummy seed-oil High row. Avoid needs High. Limited-only never Avoid.",
    cite: pin("nutricost-elderberry-gummies", "NTC_ElderberryBerry_Gummies_50MG_60GUM_SFP.jpg", "Glucose syrup, isomalt, sugar, glucose, pectin, citric acid, sodium citrate, natural flavor, vegetable oil (contains carnauba wax)"),
  },
  {
    id: "nutricost-b79-mushroom-complex-120-capsules",
    productName: "Nutricost Mushroom Complex Capsules (120 capsules)",
    barcode: "810014674926",
    category: "Vitamins",
    formulaId: "nutricost-b79-mushroom-complex-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Mushroom Complex", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Silica", "limited", "sio2"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-mushroom-complex", "NTC_MushroomComplex_550MG__V00__120CAP_275CC_SFP_Square.jpg", "Hypromellose (cellulose) capsule, silica, magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-ca-mg-citrate-unflavored-30-servings",
    productName: "Nutricost Calcium Citrate + Magnesium Citrate Powder, Unflavored (30 servings)",
    category: "Vitamins",
    formulaId: "nutricost-b79-ca-mg-citrate-unflavored-30-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "Calcium Citrate", strength: "label serving" }, { name: "Magnesium Citrate", strength: "label serving" }],
    flags: [],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-calcium-citrate-magnesium-citrate-powder", "NTC_Ca-Citrate_Mg-Citrate_Powder_Unflavored_30Serv_SFP.jpg", "None"),
  },
  {
    id: "nutricost-b79-magnesium-oxide-750mg-240-capsules",
    productName: "Nutricost Magnesium Oxide Capsules (750 mg, 240 capsules)",
    barcode: "702669934398",
    category: "Digestive",
    formulaId: "nutricost-b79-magnesium-oxide-750mg-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Magnesium Oxide", strength: "label serving" }],
    flags: [["Gelatin capsule", "cleared", "gelatin"], ["Rice extract", "limited", "riceExtract"], ["Rice hulls", "cleared", "riceHull"], ["Gum arabic", "cleared", "acacia"], ["Sunflower oil", "cleared", "sunflowerFill"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Silica", "limited", "sio2"], ["Calcium silicate", "limited", "caSilicate"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice extract; Silica; Calcium silicate. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-magnesium-oxide-750mg-240-capsules", "NTC_MagnesiumOxide_750MG_240CAP_500CC_SFP_Square.jpg", "Gelatin capsule, rice extract blend (rice extract, rice hulls, gum arabic, sunflower oil), magnesium stearate (vegetable source), silica, calcium silicate"),
  },
  {
    id: "nutricost-b79-magnesium-oxide-400mg-240-capsules",
    productName: "Nutricost Magnesium Oxide Capsules (400 mg, 240 capsules)",
    barcode: "810139578116",
    category: "Digestive",
    formulaId: "nutricost-b79-magnesium-oxide-400mg-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Magnesium Oxide", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Rice flour", "limited", "riceFlour"], ["Rice extract", "limited", "riceExtract"], ["Rice hulls", "cleared", "riceHull"], ["Gum arabic", "cleared", "acacia"], ["Sunflower oil", "cleared", "sunflowerFill"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Silica", "limited", "sio2"], ["Calcium silicate", "limited", "caSilicate"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Rice extract; Silica; Calcium silicate. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-magnesium-oxide-750mg-240-capsules", "NTC_ManesiumOxide_400MG_240CAP_400CC_SFP_Square.jpg", "Hypromellose (cellulose) capsule, rice flour, rice extract blend (rice extract, rice hulls, gum arabic, sunflower oil), magnesium stearate (vegetable source), silica, calcium silicate"),
  },
  {
    id: "nutricost-b79-keratin-120-capsules",
    productName: "Nutricost Keratin Capsules (120 capsules)",
    barcode: "810014678740",
    category: "Vitamins",
    formulaId: "nutricost-b79-keratin-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Hydrolyzed Keratin", strength: "label serving" }],
    flags: [["Gelatin capsule", "cleared", "gelatin"], ["Corn starch", "cleared", "cornStarch"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Stearic acid (vegetable source)", "cleared", "stearate"], ["Silica", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-keratin-capsules", "NTC_Keratin_500MG_120CAP_275CC_SFP_Square.jpg", "Gelatin capsule, corn starch, magnesium stearate (vegetable source), stearic acid (vegetable source), silica"),
  },
  {
    id: "nutricost-b79-potassium-magnesium-citrate-240-capsules",
    productName: "Nutricost Potassium + Magnesium Citrate Capsules (240 capsules)",
    barcode: "810014673509",
    category: "Digestive",
    formulaId: "nutricost-b79-potassium-magnesium-citrate-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Potassium Citrate", strength: "label serving" }, { name: "Magnesium Citrate", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Stearic acid (vegetable source)", "cleared", "stearate"], ["Rice extract", "limited", "riceExtract"], ["Rice hulls", "cleared", "riceHull"], ["Gum arabic", "cleared", "acacia"], ["Sunflower oil", "cleared", "sunflowerFill"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice extract. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-potassium-magnesium-citrate-capsules", "NTC_Potassium_99MG_Magnesium_210MG_Citrates_240CAP_500CC_SFP_Square_ab9ed72e-3648-4cda-80a2-8330c0cd3691.jpg", "Hypromellose (cellulose) capsule, stearic acid (vegetable source), rice extract blend (rice extract, rice hulls, gum arabic, sunflower oil), magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-bcaa-unflavored-90-servings",
    productName: "Nutricost BCAA Powder, Unflavored (90 servings)",
    barcode: "702669931618",
    category: "Vitamins",
    formulaId: "nutricost-nutricost-bcaa-powder-30-servings",
    audience: ADULT,
    minAge: 18,
    form: "powder",
    productType: SUPPLEMENT,
    actives: [{ name: "BCAA", strength: "label serving" }],
    flags: [],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-bcaa-powder", "NTC_BCAA_UF_90SERV_43OZ_SFP_Square_338a6512-e2eb-454e-8894-f3462543fe94.jpg", "None"),
  },
  {
    id: "nutricost-b79-niacin-500mg-30-capsules",
    productName: "Nutricost Vitamin B3 Niacin Capsules (500 mg, 30 capsules)",
    barcode: "810014677279",
    category: "Vitamins",
    formulaId: "nutricost-b79-niacin-500mg-30-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: VITAMIN,
    actives: [{ name: "Niacin", strength: "label serving" }],
    flags: [["Gelatin capsule", "cleared", "gelatin"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Silica", "limited", "sio2"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-vitamin-b3-niacin-capsules", "NTC_Niacin_500MG_30CAP_100CC_SFP_Square.jpg", "Gelatin capsule, magnesium stearate (vegetable source), silica"),
  },
  {
    id: "nutricost-b79-psyllium-husk-500-capsules",
    productName: "Nutricost Psyllium Husk Capsules (500 capsules)",
    barcode: "702669932653",
    category: "Digestive",
    formulaId: "nutricost-b79-psyllium-husk-500-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Psyllium Husk", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Rice flour", "limited", "riceFlour"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-psyllium-husk-500mg-500-capsules", "NTC_PsylliumHusk_500MG_500CAP_750CC_SFP_Square.jpg", "Hypromellose (cellulose) capsule, rice flour"),
  },
  {
    id: "nutricost-b79-turmeric-90-capsules",
    productName: "Nutricost Turmeric Capsules (90 capsules)",
    barcode: "810139575757",
    category: "Vitamins",
    formulaId: "nutricost-nutricost-turmeric-capsules-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Turmeric", strength: "label serving" }],
    flags: [["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Rice extract", "limited", "riceExtract"], ["Rice hulls", "cleared", "riceHull"], ["Gum arabic", "cleared", "acacia"], ["Sunflower oil", "cleared", "sunflowerFill"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice extract. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-turmerics-95-curcyminoids-500mg-120-capsules", "NTC_Turmeric_766MGX3_90CAP_225CC_SFP_Square_d4d7fd05-efbc-4ff6-a9cc-8a8d8a6a020c.jpg", "Hypromellose (cellulose) capsule, rice extract blend (rice extract, rice hulls, gum arabic, sunflower oil), magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-vitamin-b-complex-240-capsules",
    productName: "Nutricost Vitamin B Complex Capsules (240 capsules)",
    barcode: "702669937573",
    category: "Vitamins",
    formulaId: "nutricost-b79-vitamin-b-complex-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Vitamin B Complex", strength: "label serving" }],
    flags: [["Dicalcium phosphate", "cleared", "dical"], ["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Rice flour", "limited", "riceFlour"], ["Rice extract", "limited", "riceExtract"], ["Rice hulls", "cleared", "riceHull"], ["Gum arabic", "cleared", "acacia"], ["Sunflower oil", "cleared", "sunflowerFill"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"], ["Citric acid", "cleared", "citric"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Rice extract. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-vitamin-b-complex-747mg-capsules", "NTC_VitaminBComplex_460MG_240CAP_500CC_SFP_Square.jpg", "Dicalcium phosphate, hypromellose (cellulose) capsule, rice flour, rice extract blend (rice extract, rice hulls, gum arabic, sunflower oil), magnesium stearate (vegetable source), citric acid"),
  },
  {
    id: "nutricost-b79-kelp-120-capsules",
    productName: "Nutricost Kelp Capsules (120 capsules)",
    barcode: "810014674896",
    category: "Vitamins",
    formulaId: "nutricost-b79-kelp-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Kelp", strength: "label serving" }],
    flags: [["Rice flour", "limited", "riceFlour"], ["Gelatin capsule", "cleared", "gelatin"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin("nutricost-kelp-capsules", "AMZ_Kelp_325MCG_120CAP_275CC_SuppFacts.jpg", "Rice flour, gelatin capsule, magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-luteolin-rutin-120-capsules",
    productName: "Nutricost Luteolin with Rutin Complex Capsules (120 capsules)",
    barcode: "810014673974",
    category: "Vitamins",
    formulaId: "nutricost-b79-luteolin-rutin-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Luteolin", strength: "label serving" }, { name: "Rutin", strength: "label serving" }],
    flags: [["Microcrystalline cellulose", "cleared", "mcc"], ["Hypromellose (cellulose) capsule", "cleared", "hpmc"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-luteolin-with-rutin-complex-capsules", "AMZ_Luteolin_Rutin_100MG_120CAPS_SuppFacts.jpg", "Microcrystalline cellulose, hypromellose (cellulose) capsule, magnesium stearate (vegetable source)"),
  },
  {
    id: "nutricost-b79-l-isoleucine-240-capsules",
    productName: "Nutricost L-Isoleucine Capsules (240 capsules)",
    barcode: "702669934411",
    category: "Vitamins",
    formulaId: "nutricost-b79-l-isoleucine-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "L-Isoleucine", strength: "label serving" }],
    flags: [["Gelatin capsule", "cleared", "gelatin"], ["Microcrystalline cellulose", "cleared", "mcc"], ["Magnesium stearate (vegetable source)", "cleared", "stearate"]],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: pin("nutricost-l-isoleucine-500mg-240-capsules", "AMZ_L-Isoleucine_2000mg_240_Caps_SuppFacts.jpg", "Gelatin capsule, microcrystalline cellulose, magnesium stearate (vegetable source)"),
  },
];

export const BATCH79_KYR6_NUTRICOST_NO_OI: RatingRecord[] = COMPACT.map(expand);

// no_OI leftover vs OUT bleed found while opening the batch76 no_OI names.
// Original OUT 135 was not reopened.
export const BATCH79_SKIPPED_NO_OI: { sku: string; reason: string }[] = [
  { sku: "Nutricost Organic Super Greens Powder - 10 Servings", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/organic-super-greens-powder-10-servings had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Magnesium Chloride", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-magnesium-chloride-1 had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Organic Turkey Tail Mushroom Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-organic-turkey-tail-mushroom-powder had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Potassium Iodide", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-potassium-iodide had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Black Cohosh for Women", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-black-cohosh-for-women had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Made With Organic Chlorella Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-organic-chlorella-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Luteolin Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-luteolin-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Red Yeast Rice (1200 MG) (120 CAP)", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-red-yeast-rice-1200-mg-120-cap had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Organic Fenugreek Powder (1 LB)", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-organic-fenugreek-powder-1-lb had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Red Yeast Rice with CoQ10", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-red-yeast-rice-with-coq10 had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Cissus Quadrangularis", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-cissus-quadrangularis had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Gymnema Sylvestre", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-gymnema-sylvestre had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Organic Kelp Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-organic-kelp-powder had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Organic MCT Oil Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-organic-mct-oil-powder had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Sceletium Tortuosum (Made with Zembrin) Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-zembrin-25mg-60-capsules-vegetable-capsules-non-gmo-gluten-free had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Guarana Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-guarana-powder had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Guarana Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-guarana-1000mg-150-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Tudca Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-tudca-powder-25-grams had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Methyl Folate Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-methyl-folate-capsules-1000mg-120-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Mood Complex Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-mood-complex-1550mg-90-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Valerian Root Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-valerian-root-500mg-120-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Tribulus Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-tribulus-terrestris-powder had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Coral Calcium", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-coral-calcium had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Creatine Monohydrate Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-creatine-monohydrate-powder-500-grams had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Vitamin C Chewable", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-vitamin-c-chewabl had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Calcium Citrate", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-calcium-citrate-powder-250-grams had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost L-Glutamine Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-l-glutamine-powder had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Ginkgo Biloba Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-ginkgo-biloba-120mg-240-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Saw Palmetto for Women", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-saw-palmetto-for-women had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Trace Mineral Complex", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-trace-mineral-complex had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Stim Free Pre-Workout", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-stim-free-preworkouts-30-servings had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Pre-X Workout Complex Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-pre-workout-complex-powder-30-servings had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Ketone BHB Salt 4-in-1 Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-ketone-bhb-salt-4-in-1-powder-20-servings had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Pre-Workout Complex", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/pre-a had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Organic Ionic Zinc Drops", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-organic-ionic-zinc-drops had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Vitamin C Gummies", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-vitamin-c-gummies had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Methylated Vitamin B Complex", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-methylated-vitamin-b-complex had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Methylated Multivitamin", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-methylated-multivitamin had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Daily Vegetables", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-daily-vegetables had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost D-Mannose with Cranberry Extract for Women", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-d-mannose-with-cranberry-extract-for-women had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Daily Fruits", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-daily-fruits had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Organic Cranberry Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/organic-cranberry had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Pure Epsom Salt", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/ntc-pure-epsom-salt had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Organic Super Greens Stickpacks", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/organic-super-greens-orange-sunrise had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Natural Energy Complex Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/natural-energy-complex-120-cap had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Women Calcium + Vitamin D3", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/ntc-w-calcium had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Ketone BHB Salt Powders (Calcium, Magnesium, Potassium, Sodium)", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-ketone-bhb-salt-powder-250-grams had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Baobab Fruit Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-organic-baobab-fruit-powder had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Organic Super Greens Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-organic-super-greens-powder had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Sodium BHB", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-sodium-bhb had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost AKG Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/akg-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost DIM for Women Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-dim-for-women-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Cranberry for Women Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-cranberry-for-women-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Probiotic for Women Capsule", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-probiotic-for-women had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Turmeric Gummies", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-turmeric-gummies had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Myo & D-Chiro Inositol for Women", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-myo-d-chiro-inositol-for-women had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Chasteberry for Women", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-chasteberry-for-women had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Energy Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-energy-complex had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Biotin for Women", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-biotin-for-women had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Iron for Women", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-iron-for-women had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Folic Acid for Women", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-folic-acid-for-women had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Creatine for Women", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-creatine-for-women had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Kids Multivitamin Gummies", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-kids-multivitamin-gummies-berry-120-gum had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Boric Acid Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-boric-acid-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Apple Cider Vinegar Gummies", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-apple-cider-vinegar-gummies had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Kids Elderberry Gummies", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-kids-elderberry-gummies had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Melatonin Gummies", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-kids-melatonin-gummies had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Intraworkout Powders", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-intraworkout-powders-22-grams had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Psyllium Husk (Whole Husk) Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-psyllium-husk-whole-powder-8-oz had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Psyllium Husk (Ground) Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-psyllium-husk-ground-powder-1-lb had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Multivitamin For Men Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-multivitamin-for-men-120-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Multivitamin Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-multivitamin-for-men-120-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost BCAA Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-bcaa-500mg-500-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Testosterone Complex Capsules", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-testosterone-complex-863mg-90-capsules had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Rhodiola Rosea Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-rhodiola-rosea-powder had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Magnesium Citrate Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-magnesium-citrate-powder-250-grams had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Pre-Workout For Women Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-pre-workout-for-women-powder-60-servings had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost BCAA for Women", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-bcaa-for-women-30-servings had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
  { sku: "Nutricost Creatine Monohydrate Powder", reason: "SKIPPED no_OI leftover. nutricost.com gallery https://nutricost.com/products/nutricost-creatine-monohydrate-powder-500-grams had no visually confirmed Other Ingredients panel this second look. iHerb search returned 403. Walmart search returned a robot wall. Vitacost search did not return a product PDP. Amazon carousel was not opened SKU-by-SKU after those rungs. OI not invented." },
];

export const BATCH79_SKIPPED_OUT: { sku: string; reason: string }[] = [
  { sku: "Nutricost Organic Fenugreek Powder", reason: "SKIPPED OUT pantry. Second look showed a Pantry nutrition-facts / cooking label, not a supplement Other Ingredients panel. Original OUT 135 was not reopened. https://nutricost.com/products/nutricost-organic-fenugreek-powder" },
  { sku: "Nutricost Ground Celery Seed", reason: "SKIPPED OUT pantry. Second look showed a Pantry spice nutrition-facts label. Original OUT 135 was not reopened. https://nutricost.com/products/nutricost-ground-celery-seed" },
  { sku: "Nutricost Organic Pomegranate Powder (1 lb)", reason: "SKIPPED OUT pantry. Nutrition Facts food powder, no supplement Other Ingredients panel. Original OUT 135 was not reopened. https://nutricost.com/products/nutricost-organic-pomegrante-powder-1lb" },
  { sku: "Nutricost Organic Pomegranate Powder (8 oz)", reason: "SKIPPED OUT pantry. Nutrition Facts food powder, no supplement Other Ingredients panel. Original OUT 135 was not reopened. https://nutricost.com/products/nutricost-organic-pomegrante-powder-8oz" },
  { sku: "Nutricost Plant Based Food Coloring", reason: "SKIPPED OUT food coloring. Ingredients line is a food color, not a supplement Other Ingredients panel to grade. Original OUT 135 was not reopened. https://nutricost.com/products/nutricost-plant-based-food-coloring" },
  { sku: "Nutricost Organic Vegan MRP", reason: "SKIPPED OUT protein-aisle. Organic vegan meal-replacement powder. Original OUT 135 was not reopened. https://nutricost.com/products/ntc-organic-vegan-mrp-chocolate" },
  { sku: "Nutricost Mass Gainers", reason: "SKIPPED OUT protein-aisle. Mass gainer label is a protein tub. Original OUT 135 was not reopened. https://nutricost.com/products/nutricost-mass-gainers" },
];


export const BATCH79_SKIPPED_ALREADY: { sku: string; reason: string }[] = [
  { sku: "Nutricost Serrapeptase", reason: "SKIPPED already on MAIN. batch76 already wrote Serrapeptase 120,000 SPU 120 capsules. Not rewritten." },
  { sku: "Nutricost Ferrochel Iron Capsules", reason: "SKIPPED already on MAIN. batch76 already wrote the 240-capsule panel (rice flour, hypromellose, citric acid, magnesium stearate, maltodextrin, silica). Not rewritten." },
  { sku: "Nutricost Magnesium Glycinate Powder", reason: "SKIPPED already on MAIN. batch76 already wrote the unflavored powder panel (Other ingredients: None) from NTC_Magnesium_Glycinate_UF_250_GM_16_OZ_SFP_Square.jpg. Not rewritten." },
  { sku: "Nutricost TMG Capsules", reason: "SKIPPED already on MAIN. batch76 already wrote Betaine Anhydrous (TMG) 120 capsules (gelatin, silica, magnesium stearate, calcium silicate). Not rewritten." },
  { sku: "Nutricost L-Arginine Powder", reason: "SKIPPED already on MAIN. batch76 already wrote L-Arginine Powder 1 kg (Other ingredients: None) at https://nutricost.com/products/nutricost-l-arginine-powder. Not rewritten." },
];

export const BATCH79_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH79_SKIPPED_NO_OI,
  ...BATCH79_SKIPPED_ALREADY,
  ...BATCH79_SKIPPED_OUT,
];

export const BATCH79_REFUSED: { sku: string; reason: string }[] = [
  { sku: "Nutricost Organic Cat's Claw Liquid Drops", reason: "REFUSED §5 still-missing exact token(s) `organic lemon juice concentrate`. 7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row. Panel: https://nutricost.com/products/nutricost-organic-cats-claw-liquid-drops. SKU: Nutricost Organic Cat's Claw Liquid Drops." },
  { sku: "Nutricost Ubiquinol Softgels", reason: "REFUSED §5 still-missing exact token(s) `annatto extract (for color)`. 7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row. Panel: https://nutricost.com/products/nutricost-ubiquinol-softgels. SKU: Nutricost Ubiquinol Softgels." },
  { sku: "Nutricost CoQ10 Softgels", reason: "REFUSED §5 still-missing exact token(s) `iron oxide; glycerol`. 7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row. Panel: https://nutricost.com/products/nutricost-coq10-softgels-200mg-120-softgels. SKU: Nutricost CoQ10 Softgels." },
  { sku: "Nutricost Kids Fiber Gummies", reason: "REFUSED §5 still-missing exact token(s) `trisodium citrate; water`. 7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row. Panel: https://nutricost.com/products/nutricost-kids-fiber-gummies. SKU: Nutricost Kids Fiber Gummies." },
  { sku: "Nutricost Suntheanine", reason: "REFUSED §5 still-missing exact token(s) `organic oat fiber; organic gum arabic; organic sunflower lecithin`. 7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row. Panel: https://nutricost.com/products/nutricost-suntheanine. SKU: Nutricost Suntheanine." },
  { sku: "Nutricost Echinacea & Goldenseal Root Capsules", reason: "REFUSED §5 still-missing exact token(s) `organic oat fiber; organic gum arabic; organic sunflower lecithin`. 7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row. Panel: https://nutricost.com/products/nutricost-echinacea-goldenseal-root-500mg-240-capsules. SKU: Nutricost Echinacea & Goldenseal Root Capsules." },
  { sku: "Nutricost Marshmallow Root Capsules", reason: "REFUSED §5 still-missing exact token(s) `organic pea starch; organic oat fiber; organic sunflower oil`. 7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row. Panel: https://nutricost.com/products/nutricost-marshmallow-root-500mg-120-veggie-capsules-gluten-free-non-gmo. SKU: Nutricost Marshmallow Root Capsules." },
  { sku: "Nutricost L-Tryptophan Capsules", reason: "REFUSED §5 still-missing exact token(s) `organic pea starch; organic oat fiber; organic sunflower oil`. 7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row. Panel: https://nutricost.com/products/nutricost-l-tryptophan-500mg-120-capsules. SKU: Nutricost L-Tryptophan Capsules." },
  { sku: "Nutricost Made With Organic Cordyceps Capsules (180 capsules)", reason: "REFUSED §5 still-missing exact token(s) `organic oat fiber; organic gum arabic; organic sunflower lecithin`. 7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row. Panel: https://nutricost.com/products/nutricost-organic-cordyceps-capsules. SKU: Nutricost Made With Organic Cordyceps Capsules (180 capsules)." },
];

const _ROWS = BATCH79_KYR6_NUTRICOST_NO_OI;
if (_ROWS.length !== 47) throw new Error('batch79 tally drift: expected 47 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 21) throw new Error('batch79 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 22) throw new Error('batch79 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 4) throw new Error('batch79 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch79 recordStatus must stay unverified');
if (_ROWS.some((r) => !r.formulaId)) throw new Error('batch79 every row needs formulaId');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch79 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch79 writes Nutricost only');
if (_ROWS.some((r) => r.barcode && !/^\d{12}$/.test(r.barcode))) {
  throw new Error('batch79 barcode must be a 12-digit UPC-A');
}
if (_ROWS.some((r) => {
  if (!r.barcode) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(r.barcode[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 !== Number(r.barcode[11]);
})) {
  throw new Error('batch79 barcode failed UPC-A check digit');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 5) throw new Error('batch79 REUSE-formula tally drift');
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|naturewise|welmate|goodsense|healtha2z|time-cap|a\+health/i.test(r.brand + r.productName))) {
  throw new Error('batch79 leftover 3P / Sprouts / toothpaste / NOW must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/powder|softgel|capsule|gumm|tablet/i.test(r.productName))) {
  throw new Error('batch79 must not grade oil pour bottles');
}
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch79 Avoid without High on ${record.id}`);
  }
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch79 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch79 Clean row has a non-cleared flag on ${record.id}`);
  }
  if (record.form === 'gummy' && record.inactiveIngredients.some((i) => /vegetable oil|palm oil|sunflower oil|soybean oil/i.test(i.name) && i.riskLevel !== 'high')) {
    throw new Error(`batch79 gummy seed oil must be High on ${record.id}`);
  }
}
if (BATCH79_SKIPPED_NO_OI.length !== 79) throw new Error('batch79 no_OI leftover tally drift');
if (BATCH79_SKIPPED_ALREADY.length !== 5) throw new Error('batch79 already-on-MAIN tally drift');
if (BATCH79_SKIPPED_OUT.length !== 7) throw new Error('batch79 OUT bleed tally drift');
if (BATCH79_SKIPPED.length !== 91) throw new Error('batch79 skip tally drift');
if (BATCH79_REFUSED.length !== 9) throw new Error('batch79 refuse tally drift');
if (!BATCH79_SKIPPED_NO_OI.every((s) => /no_OI leftover/i.test(s.reason))) throw new Error('batch79 no_OI reasons');
if (!BATCH79_SKIPPED_OUT.every((s) => /SKIPPED OUT/i.test(s.reason))) throw new Error('batch79 OUT reasons');
