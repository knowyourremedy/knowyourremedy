// DRAFT / not verified / batch 80 KYR6 Nutricost batch79-refuse backfill.
// Methodology v1.6 + MAIN §5 after the Sept 22, 2026 batch79-refuse stamp
// (0720c08). Harm-first. No invented grades. No invented UPCs. No OCR aliases.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Nutricost only. Unlocks the 9 BATCH79_REFUSED SKUs whose
// blocking tokens are now on MAIN §5 / the founder map. batch76, batch77,
// batch78, and batch79 were not edited. The batch79 no_OI leftover list
// was not reopened (no_OI leftover stays 79). OUT 135 was not reopened.
// No NatureWise / WELMATE / A+Health / HealthA2Z / TIME-Cap / GoodSense.
// No toothpaste. No house Amazon. No Sprouts. No graded oil pour bottles.
// Leftover Amazon 3P stays N=6.
// Gummy sunflower oil and gummy vegetable oil stay Avoid. This file's
// kids fiber gummy does not print either oil.
//
// Pin = current nutricost.com supplement-facts image, re-read this pass
// (every count/strength SFP on each product was opened). Shopify variant
// barcodes are admin data, not a GTIN-12 printed on the PDP — omitted.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Same OI list shares
// formulaId. Search wiring only. Not wired into Clean Picks UI.
//
// Stamps confirmed on MAIN before this write:
// organic lemon juice concentrate (sweetener) Caution;
// annatto extract (for color) → annatto Caution;
// iron oxide as color Caution; glycerol → glycerin Cleared;
// trisodium citrate Cleared; water / bare water → purified water Cleared;
// organic oat fiber Caution (Oat Fiber stays Cleared);
// organic gum arabic → gum arabic Cleared;
// organic sunflower lecithin → lecithin Cleared;
// pea starch Caution (founder restamp; label string organic pea starch);
// sunflower oil as non-gummy fill Cleared (label string organic sunflower
// oil on a capsule or softgel; gummy sunflower stays High).
//
// TALLY (unverified drafts in THIS file): 9 rows —
// Clean 0 / Caution 9 / Avoid 0.
// NEW 8 / REUSE-formula 1 (marshmallow 120 shares batch77
// `nutricost-butcher-s-broom-extract-capsules-120-capsules`) /
// SKIPPED 1 (CoQ10 100 mg 120 softgels already on MAIN in batch76) /
// REFUSED 1 (Ubiquinol 240-count tab: `annatto suspension in sunflower oil`).
// Cordyceps 90 capsules stays the batch79 row. Not rewritten.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'Nutricost';
const AMAZON = ['Amazon', 'nutricost.com'] as const;
const CDN = 'https://cdn.shopify.com/s/files/1/0222/4128/0074/files/';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const SEVEN_STEP =
  '7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row.';

const METH = {
  agar: "Methodology §5 Cleared (agar / agar-agar — seaweed gel; gum/fiber family with pectin).",
  annatto: "Methodology §5 Caution (annatto / annatto extract (for color) — same Caution row; locked Sept 22, 2026). Not Avoid.",
  ascorbyl: "Methodology §5 Cleared (ascorbyl palmitate / mixed tocopherols as antioxidants). Distinct from Caution tocopheryl acetate.",
  bamboo: "Methodology §5 Caution (organic bamboo extract — exact token; extract; not a named-color pass; locked Sept 22, 2026). Not Avoid.",
  beeswax: "Methodology §5 Cleared (beeswax / yellow beeswax).",
  blackCarrot: "Methodology §5 Cleared (black carrot / named fruit-or-vegetable juice concentrate as COLOR; exact restamp Black Carrot (For Color)). Label string: black carrot concentrate (for color). Not a synthetic dye.",
  chicory: "Methodology §5 Cleared (chicory root fiber — inulin family; exact token).",
  citric: "Methodology §5 Cleared (citric acid).",
  cornStarch: "Methodology §5 Cleared (named corn starch / potato starch / pregelatinized starch — not Limited modified starch and not Caution unspecified starch).",
  flavors: "Methodology §5 Limited-risk (natural flavors — undisclosed mixture). Not Avoid.",
  gelatin: "Methodology §5 Cleared (gelatin / gelatin capsule).",
  glycerin: "Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin). Also written glycerol (Sept 22, 2026). Same Cleared row. Distinct from Glycerol Monostearate / GMS.",
  gumArabic: "Methodology §5 Cleared (gum arabic / acacia / organic acacia gum / organic gum arabic). Organic gum arabic sits on this same row (Sept 22, 2026).",
  hpmc: "Methodology §5 Cleared (hypromellose / HPMC / cellulose capsule).",
  ironOxide: "Methodology §5 Caution (iron oxide as color — exact token iron oxide (as color); same family as iron oxides / iron oxide red / iron oxide yellow; locked Sept 22, 2026). Not Avoid.",
  lecithin: "Methodology §5 Cleared (lecithin — soy / sunflower). Sunflower lecithin and organic sunflower lecithin sit on this same row (Sept 22, 2026). Sunflower lecithin is not an allergen flag. Not bare soy.",
  lemonSweetener: "Methodology §5 Caution (lemon juice concentrate / organic lemon juice concentrate as sweetener — exact token; locked Sept 22, 2026). This drop is not labeled for color, so it is not the Cleared lemon-juice-concentrate-as-color row. Not Avoid.",
  mctUnlabeled: "Methodology §5 Limited-risk (unlabeled MCT — medium chain triglycerides when the token does not name coconut or palm kernel). Not an oil-bottle grade. Not gummy High.",
  oatFiber: "Methodology §5 Caution (organic oat fiber — exact token; locked Sept 22, 2026). Distinct from Cleared Oat Fiber. Do not flip that Cleared row. Not Avoid.",
  peaProtein: "Methodology §5 Cleared (pea protein isolate). Distinct from Caution pea starch.",
  peaStarch: "Methodology §5 Caution (pea starch — founder restamp Sept 22, 2026; was Limited). Label string organic pea starch is this row. Distinct from Cleared pea protein isolate and from Limited modified starch. Not Avoid.",
  pectin: "Methodology §5 Cleared (pectin — xanthan/guar/gum family).",
  pullulan: "Methodology §5 Cleared (organic pullulan / pullulan capsule).",
  riceFlour: "Methodology §5 Caution (rice flour — exact token; not Cleared rice hull / rice bran).",
  riceHull: "Methodology §5 Cleared (organic rice hull concentrate — rice-hull family; not rice flour).",
  sio2: "Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). It does not push Avoid.",
  caSilicate: "Methodology §5 Caution (calcium silicate — exact token; not the silicon dioxide cap).",
  soyFill: "Methodology §5 Cleared (soybean oil as capsule or softgel fill — existing form split; fill/cream stays Cleared; gummy/lozenge stays Avoid; restamp Sept 22, 2026, no grade change). Tap: this fill is not the gummy seed-oil rule. Not an oil-bottle grade. Soy on the label is an allergen disclosure, not a grade change.",
  stearate: "Methodology §5 Cleared (magnesium stearate / stearic acid / calcium laurate, including vegetable source).",
  sunflowerFill: "Methodology §5 Cleared as non-gummy fill (sunflower oil as capsule / softgel / tablet fill — locked Sept 22, 2026). Label string organic sunflower oil on a capsule or softgel sits on this named-fill row. Gummy sunflower oil stays High. Tap both sides.",
  tapiocaStarch: "Methodology §5 Cleared (named corn starch / potato starch / pregelatinized starch, and similar simple starches). Label string tapioca starch is a named simple starch on that row. Distinct from Limited tapioca dextrin / tapioca powder and from Caution unspecified starch.",
  trisodium: "Methodology §5 Cleared (trisodium citrate — exact token; citrate-salt filler/buffer with citric acid; locked Sept 22, 2026).",
  water: "Methodology §5 Cleared (purified water). Water / bare water sit on this same row (Sept 22, 2026). Distilled water is the same water row.",
  wax: "Methodology §5 Cleared (beeswax / carnauba wax).",
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
  return `Current nutricost.com supplement-facts panel (https://nutricost.com/products/${productPath}; image ${CDN}${image}) other-ingredients: ${oi}. Brand-site pack image is the pin (every count/strength SFP on this product was opened before this write). Live Amazon US exact pack when this Nutricost name is listed. No 12-digit UPC printed on the PDP — omitted. No DailyMed drug SPL.`;
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
  productType: typeof SUPPLEMENT;
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
        /No 12-digit UPC printed on the PDP — omitted\./,
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

const BROOM = "nutricost-butcher-s-broom-extract-capsules-120-capsules";

const COMPACT: Compact[] = [
  {
    id: "nutricost-b80-organic-cats-claw-liquid-drops",
    productName: "Nutricost Organic Cat's Claw Liquid Drops",
    barcode: "810139576556",
    category: "Immune Support",
    formulaId: "nutricost-b80-organic-cats-claw-liquid-drops",
    audience: ADULT,
    minAge: 18,
    form: "drops",
    productType: SUPPLEMENT,
    actives: [{ name: "Organic Cat's Claw Extract", strength: "150mg" }],
    flags: [
      ["Organic vegetable glycerin", "cleared", "glycerin"],
      ["Distilled water", "cleared", "water"],
      ["Organic lemon juice concentrate", "limited", "lemonSweetener"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic lemon juice concentrate. The drop is not labeled for color, so this is the sweetener Caution row. Organic vegetable glycerin and distilled water stay Cleared.",
    cite: pin(
      "nutricost-organic-cats-claw-liquid-drops",
      "NTC_OrganicCatsClaw_150MG_4OZ_AmberGlassBoston_SFP_Square.jpg",
      "Organic vegetable glycerin, distilled water, organic lemon juice concentrate",
    ),
  },
  {
    id: "nutricost-b80-ubiquinol-120-softgels",
    productName: "Nutricost Ubiquinol Softgels (120 softgels)",
    barcode: "810014678931",
    category: "Vitamins",
    formulaId: "nutricost-b80-ubiquinol-120-softgels",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Ubiquinol (Kaneka Ubiquinol)", strength: "100mg" }],
    flags: [
      ["MCT oil (medium chain triglycerides)", "limited", "mctUnlabeled"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerine", "cleared", "glycerin"],
      ["Ascorbyl palmitate", "cleared", "ascorbyl"],
      ["Purified water", "cleared", "water"],
      ["Beeswax", "cleared", "beeswax"],
      ["Sunflower lecithin", "cleared", "lecithin"],
      ["Sunflower oil", "cleared", "sunflowerFill"],
      ["Annatto extract (for color)", "limited", "annatto"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is MCT oil (medium chain triglycerides) with no coconut or palm kernel named, and Annatto extract (for color). Sunflower oil in this softgel is named-fill Cleared. Gummy sunflower oil stays High. The 240-count tab prints a different color string and is refused, not this row.",
    cite: pin(
      "nutricost-ubiquinol-softgels",
      "NTC_Ubiquinol_100MG_120SFG_SFP.jpg",
      "MCT oil (medium chain triglycerides), gelatin, glycerine, ascorbyl palmitate, purified water, beeswax, sunflower lecithin, sunflower oil, annatto extract (for color)",
    ),
  },
  {
    id: "nutricost-b80-coq10-200mg-120-softgels",
    productName: "Nutricost CoQ10 Softgels (200 mg, 120 softgels)",
    barcode: "857077008275",
    category: "Vitamins",
    formulaId: "nutricost-b80-coq10-200mg-120-softgels",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Coenzyme Q10", strength: "200mg" }],
    flags: [
      ["Beeswax", "cleared", "beeswax"],
      ["Soybean oil", "cleared", "soyFill"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerol", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
      ["Iron oxide", "limited", "ironOxide"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Iron oxide as color in the capsule shell. Glycerol is the glycerin Cleared row. Soybean oil in this softgel is fill Cleared. Gummy and lozenge soybean oil stay Avoid. Soy on the label is an allergen disclosure. The 100 mg 120-softgel panel is already on MAIN and is not this row.",
    cite: pin(
      "nutricost-coq10-softgels-200mg-120-softgels",
      "NTC_CoQ10_Softgels_120SFG_200MG_SFP.jpg",
      "Beeswax, soybean oil, capsule shell (gelatin, glycerol, purified water, iron oxide)",
    ),
  },
  {
    id: "nutricost-b80-kids-fiber-gummies",
    productName: "Nutricost Kids Fiber Gummies (60 gummies)",
    barcode: "810139578185",
    category: "Digestive",
    formulaId: "nutricost-b80-kids-fiber-gummies",
    audience: KIDS,
    minAge: 4,
    form: "gummy",
    productType: SUPPLEMENT,
    actives: [{ name: "Dietary fiber", strength: "6g" }],
    flags: [
      ["Chicory root fiber", "cleared", "chicory"],
      ["Water", "cleared", "water"],
      ["Pectin", "cleared", "pectin"],
      ["Agar agar", "cleared", "agar"],
      ["Tapioca starch", "cleared", "tapiocaStarch"],
      ["Natural flavors", "limited", "flavors"],
      ["Citric acid", "cleared", "citric"],
      ["Black carrot concentrate (for color)", "cleared", "blackCarrot"],
      ["Trisodium citrate", "cleared", "trisodium"],
      ["Carnauba wax", "cleared", "wax"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Natural flavors. Trisodium citrate and water are Cleared. This gummy panel does not print sunflower oil or vegetable oil, so the gummy seed-oil High rule does not fire on this list. Gummy sunflower oil and gummy vegetable oil stay Avoid when a panel prints them. Brand page says ages 4 and up.",
    cite: pin(
      "nutricost-kids-fiber-gummies",
      "NTC_Kids_Fiber_2.7GMX2_60GUM_400CCCLEAR_SFP_Square.jpg",
      "Chicory root fiber, water, pectin, agar agar, tapioca starch, natural flavors, citric acid, black carrot concentrate (for color), trisodium citrate, carnauba wax",
    ),
  },
  {
    id: "nutricost-b80-suntheanine-60-capsules",
    productName: "Nutricost Suntheanine (60 capsules)",
    barcode: "810139578390",
    category: "Sleep",
    formulaId: "nutricost-b80-suntheanine-60-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Suntheanine (L-theanine)", strength: "150mg" }],
    flags: [
      ["Rice flour", "limited", "riceFlour"],
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Organic rice hull concentrate", "cleared", "riceHull"],
      ["Organic sunflower lecithin", "cleared", "lecithin"],
      ["Organic oat fiber", "limited", "oatFiber"],
      ["Organic gum arabic", "cleared", "gumArabic"],
      ["Silica", "limited", "sio2"],
      ["Calcium silicate", "limited", "caSilicate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Organic oat fiber; Silica; Calcium silicate. Organic oat fiber is the Caution token and is distinct from Cleared Oat Fiber. Cleared capsule and flow-agent tokens do not raise Avoid. Silica is the 0-pt nanoparticle cap when present.",
    cite: pin(
      "nutricost-suntheanine",
      "NTC_Suntheanine_150MG_60CAP_150CCCOMPAX_SFP_Square.jpg",
      "Rice flour, hypromellose (cellulose) capsule, organic flow agent blend (organic rice hull concentrate, organic sunflower lecithin, organic oat fiber, organic gum arabic), silica, calcium silicate",
    ),
  },
  {
    id: "nutricost-b80-echinacea-goldenseal-240-capsules",
    productName: "Nutricost Echinacea & Goldenseal Root Capsules (240 capsules)",
    barcode: "810014675022",
    category: "Immune Support",
    formulaId: "nutricost-b80-echinacea-goldenseal-240-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [
      { name: "Echinacea Extract", strength: "250mg" },
      { name: "Goldenseal Powder", strength: "250mg" },
    ],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Organic rice hull concentrate", "cleared", "riceHull"],
      ["Organic sunflower lecithin", "cleared", "lecithin"],
      ["Organic oat fiber", "limited", "oatFiber"],
      ["Organic gum arabic", "cleared", "gumArabic"],
      ["Calcium laurate", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic oat fiber. Organic oat fiber is the Caution token and is distinct from Cleared Oat Fiber. Cleared capsule and flow-agent tokens do not raise Avoid.",
    cite: pin(
      "nutricost-echinacea-goldenseal-root-500mg-240-capsules",
      "NTC_Echinacea_GoldensealRoot_500MG_240CAP_500CC_SFP_Square.jpg",
      "Hypromellose (cellulose) capsule, organic flow agent blend (organic rice hull concentrate, organic sunflower lecithin, organic oat fiber, organic gum arabic), calcium laurate",
    ),
  },
  {
    id: "nutricost-b80-marshmallow-root-120-capsules",
    productName: "Nutricost Marshmallow Root Capsules (120 capsules)",
    barcode: "810014671413",
    category: "Digestive",
    formulaId: BROOM,
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Marshmallow Root Extract", strength: "500mg" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Rice flour", "limited", "riceFlour"],
      ["Organic oat fiber", "limited", "oatFiber"],
      ["Organic pea starch", "limited", "peaStarch"],
      ["Organic bamboo extract", "limited", "bamboo"],
      ["Organic gum arabic", "cleared", "gumArabic"],
      ["Organic sunflower oil", "cleared", "sunflowerFill"],
      ["Organic sunflower lecithin", "cleared", "lecithin"],
      ["Magnesium stearate (vegetable source)", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Organic oat fiber; Organic pea starch; Organic bamboo extract. Organic sunflower oil in this capsule is named-fill Cleared. Gummy sunflower oil stays High. Same other-ingredients list as batch77 Butcher's Broom Extract Capsules, so this row reuses that formulaId. Organic oat fiber on this row uses the Sept 22 Caution stamp.",
    cite: pin(
      "nutricost-marshmallow-root-500mg-120-veggie-capsules-gluten-free-non-gmo",
      "NTC_MarshmallowRoot_500MG_120CAP_300CC_SFP_Square.jpg",
      "Hypromellose (cellulose) capsule, rice flour, organic flow agent blend (organic oat fiber, organic pea starch, organic bamboo extract, organic gum arabic, organic sunflower oil, organic sunflower lecithin), magnesium stearate (vegetable source)",
    ),
  },
  {
    id: "nutricost-b80-l-tryptophan-120-capsules",
    productName: "Nutricost L-Tryptophan Capsules (120 capsules)",
    barcode: "702669933070",
    category: "Sleep",
    formulaId: "nutricost-b80-l-tryptophan-120-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [
      { name: "L-Tryptophan", strength: "500mg" },
      { name: "BioPerine Black Pepper Extract", strength: "5mg" },
    ],
    flags: [
      ["Gelatin capsule", "cleared", "gelatin"],
      ["Pea protein isolate", "cleared", "peaProtein"],
      ["Corn starch", "cleared", "cornStarch"],
      ["Organic oat fiber", "limited", "oatFiber"],
      ["Organic pea starch", "limited", "peaStarch"],
      ["Organic bamboo extract", "limited", "bamboo"],
      ["Organic gum arabic", "cleared", "gumArabic"],
      ["Organic sunflower oil", "cleared", "sunflowerFill"],
      ["Organic sunflower lecithin", "cleared", "lecithin"],
      ["Magnesium stearate (vegetable source)", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic oat fiber; Organic pea starch; Organic bamboo extract. Organic sunflower oil in this capsule is named-fill Cleared. Gummy sunflower oil stays High. Pea protein isolate stays Cleared and is distinct from pea starch.",
    cite: pin(
      "nutricost-l-tryptophan-500mg-120-capsules",
      "NTC_L-Tryptophan_500MG_120CAPS_275CC_SFP_Square.jpg",
      "Gelatin capsule, pea protein isolate, corn starch, organic flow agent blend (organic oat fiber, organic pea starch, organic bamboo extract, organic gum arabic, organic sunflower oil, organic sunflower lecithin), magnesium stearate (vegetable source)",
    ),
  },
  {
    id: "nutricost-b80-cordyceps-180-capsules",
    productName: "Nutricost Made With Organic Cordyceps Capsules (180 capsules)",
    barcode: "810014670812",
    category: "Vitamins",
    formulaId: "nutricost-b80-cordyceps-180-capsules",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Organic Cordyceps Mushroom Powder", strength: "1g" }],
    flags: [
      ["Organic pullulan capsule", "cleared", "pullulan"],
      ["Organic rice hull concentrate", "cleared", "riceHull"],
      ["Organic sunflower lecithin", "cleared", "lecithin"],
      ["Organic oat fiber", "limited", "oatFiber"],
      ["Organic gum arabic", "cleared", "gumArabic"],
      ["Organic bamboo extract", "limited", "bamboo"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic oat fiber; Organic bamboo extract. Organic oat fiber is the Caution token and is distinct from Cleared Oat Fiber. The 90-capsule count is already on MAIN from batch79 and uses a different panel. It is not this row.",
    cite: pin(
      "nutricost-organic-cordyceps-capsules",
      "NTC_OrganicCordyceps_550MGX2_180CAP_400CC_SFP_Square.jpg",
      "Organic pullulan capsule, organic flow agent blend (organic rice hull concentrate, organic sunflower lecithin, organic oat fiber, organic gum arabic), organic bamboo extract",
    ),
  },
];

export const BATCH80_KYR6_NUTRICOST_79_REFUSE: RatingRecord[] = COMPACT.map(expand);

export const BATCH80_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: "Nutricost CoQ10 Softgels (100 mg, 120 softgels)",
    reason: "SKIPPED already on MAIN. batch76 already wrote Nutricost CoQ10 Softgels (120 softgels) from the 100 mg panel (`nutricost-nutricost-coq10-softgels-120-softgels`; softgel gelatin, purified water, glycerin, white beeswax, caramel color, sunflower oil). The current 100 mg image matches that list. The 200 mg panel is a different OI list and is the batch80 row. Not rewritten.",
  },
];

export const BATCH80_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: "Nutricost Ubiquinol Softgels (240 softgels)",
    reason: `REFUSED §5 still-missing exact token(s) \`annatto suspension in sunflower oil\`. The 120-count tab prints the stamped string annatto extract (for color) and is the batch80 row. The 240-count tab prints a different single token and was not split into annatto plus sunflower oil. ${SEVEN_STEP} Panel: https://nutricost.com/products/nutricost-ubiquinol-softgels (image NTC_Ubiquinol_100MG_240SFG_500CC_SFP_Square.jpg). SKU: Nutricost Ubiquinol Softgels (240 softgels).`,
  },
];

const _ROWS = BATCH80_KYR6_NUTRICOST_79_REFUSE;
if (_ROWS.length !== 9) throw new Error('batch80 tally drift: expected 9 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) throw new Error('batch80 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 9) throw new Error('batch80 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) throw new Error('batch80 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch80 recordStatus must stay unverified');
if (_ROWS.some((r) => !r.formulaId)) throw new Error('batch80 every row needs formulaId');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch80 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch80 writes Nutricost only');
if (_ROWS.some((r) => r.barcode && !/^\d{12}$/.test(r.barcode))) {
  throw new Error('batch80 barcode must be a 12-digit UPC-A');
}
if (_ROWS.some((r) => {
  if (!r.barcode) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(r.barcode[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 !== Number(r.barcode[11]);
})) {
  throw new Error('batch80 barcode failed UPC-A check digit');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 1) throw new Error('batch80 REUSE-formula tally drift');
if (_ROWS.filter((r) => r.formulaId === BROOM).length !== 1) throw new Error('batch80 marshmallow must reuse the broom formula');
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|naturewise|welmate|goodsense|healtha2z|time-cap|a\+health/i.test(r.brand + r.productName))) {
  throw new Error('batch80 leftover 3P / Sprouts / toothpaste / NOW must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/powder|softgel|capsule|gumm|tablet|drops/i.test(r.productName))) {
  throw new Error('batch80 must not grade oil pour bottles');
}
if (_ROWS.some((r) => /cordyceps/i.test(r.productName) && /90 capsules/i.test(r.productName))) {
  throw new Error('batch80 must not rewrite the cordyceps 90-capsule row');
}
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch80 Avoid without High on ${record.id}`);
  }
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch80 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch80 Clean row has a non-cleared flag on ${record.id}`);
  }
  if (record.form === 'gummy' && record.inactiveIngredients.some((i) => /vegetable oil|palm oil|sunflower oil|soybean oil/i.test(i.name) && i.riskLevel !== 'high')) {
    throw new Error(`batch80 gummy seed oil must be High on ${record.id}`);
  }
  if (record.form !== 'gummy' && record.inactiveIngredients.some((i) => /sunflower oil/i.test(i.name) && i.riskLevel === 'high')) {
    throw new Error(`batch80 capsule or softgel sunflower oil must stay the named-fill row on ${record.id}`);
  }
}
if (BATCH80_SKIPPED.length !== 1) throw new Error('batch80 skip tally drift');
if (!BATCH80_SKIPPED.every((s) => /already on MAIN/i.test(s.reason))) throw new Error('batch80 skip reason');
if (BATCH80_REFUSED.length !== 1) throw new Error('batch80 refuse tally drift');
if (!BATCH80_REFUSED.every((s) => /annatto suspension in sunflower oil/.test(s.reason) && /7-step packet/.test(s.reason))) {
  throw new Error('batch80 refuse must name the missing token and the 7-step');
}
