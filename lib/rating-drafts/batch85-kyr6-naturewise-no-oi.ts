// DRAFT / not verified / batch 85 KYR6 NatureWise no_OI second look.
// Methodology v1.6 + MAIN §5 after the Sept 23, 2026 fruit / foam stamp
// (c8e6f5e). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. NatureWise only. Hunt list = batch82 SKIPPED no_OI (28), plus
// Advanced Joint Care and Vegan Vitamin K2 Softgels (batch84 incomplete
// panels). batch70–batch84 were not edited. OUT 15 was not reopened.
// Multivitamin for Men was not hunted. No WELMATE / A+Health / HealthA2Z /
// TIME-Cap / GoodSense. No toothpaste. No house Amazon. No Sprouts.
// No graded oil pour bottles. Leftover Amazon 3P stays N=5.
//
// Ladder this pass: naturewise.com first (every count/strength image and
// every carousel tile on the matched PDP, including right/left bottle
// panels and supplement-facts graphics). HTML bullets were not treated as
// a panel. iHerb search returned 403. Vitacost search HTML was a captcha
// wall and did not return a product PDP. Walmart search returned a robot
// wall. Target search HTML returned no product PDP. Amazon search HTML
// returned an automated-access block, so Amazon image carousels were not
// opened SKU-by-SKU. A row below exists only when a naturewise.com label
// image showed a real Other Ingredients line and every token is an exact
// locked §5 string. UPC-A is attached only when zbar read a GTIN-12 on
// that same PDP. recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Pack sizes of the same
// OI+form share formulaId. Search wiring only.
//
// TALLY (unverified drafts in THIS file): 25 rows —
// Clean 3 / Caution 22 / Avoid 0.
// NEW 22 / REUSE-formula 3 / SKIPPED 4
// (no_OI leftover 4 / OUT 0 / other 0) /
// REFUSED 4.
// Search grade: Clean 3 / Caution 22 / Avoid 0.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'NatureWise';
const AMAZON = ['Amazon', 'naturewise.com'] as const;
const CDN = 'https://www.naturewise.com/cdn/shop/files/';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  annatto: "Methodology §5 Caution (annatto / annatto extract (for color)). Not Avoid.",
  bamboo: "Methodology §5 Limited-risk (bamboo extract / bambusa vulgaris shoot — mapped to organic bamboo extract; Caution; extract; not a named-color pass; locked Sept 22, 2026, bare string mapped Sept 23, 2026). Not Avoid.",
  carrageenan: "Methodology §5 Limited-risk (carrageenan). Not Avoid.",
  coconut: "Methodology §5 Cleared (coconut oil / organic coconut oil / extra virgin coconut oil as softgel fill). Not gummy seed-oil High. Not an oil-bottle grade.",
  croscarmellose: "Methodology §5 Cleared (croscarmellose sodium).",
  flavors: "Methodology §5 Limited-risk (natural flavors / named simple flavors — undisclosed or named flavor mixtures). Label string lemon flavor sits on this row.",
  gelatin: "Methodology §5 Cleared (gelatin / halal gelatin / gelatin capsule).",
  gellan: "Methodology §5 Cleared (gellan gum — xanthan / guar / pectin family).",
  glycerin: "Methodology §5 Cleared (glycerin / vegetable glycerin / organic vegetable glycerin).",
  hpmc: "Methodology §5 Cleared (hypromellose / HPMC / cellulose capsule).",
  lecithin: "Methodology §5 Cleared (sunflower lecithin). Not an allergen flag.",
  leucine: "Methodology §5 Cleared (L-leucine).",
  mcc: "Methodology §5 Cleared (microcrystalline cellulose / cellulose / capsule cellulose).",
  mctUnlabeled: "Methodology §5 Limited-risk (unlabeled MCT — organic MCT oil when the token does not name coconut or palm kernel). Not an oil-bottle grade. Not gummy High.",
  modStarch: "Methodology §5 Limited-risk (modified tapioca starch — Limited modified-starch row). Not Caution modified tapioca starchgel. Do not flip this Limited row.",
  oliveFill: "Methodology §5 Cleared (pure olive oil / extra virgin olive oil / organic extra virgin olive oil as fill — locked Sept 22, 2026). Not an oil-bottle grade.",
  peg: "Methodology §5 Moderate-risk (polyethylene glycol, oral). Not Avoid by itself. Avoid needs High.",
  potassiumAcetate: "Methodology §5 Cleared (potassium acetate — exact token; locked Sept 23, 2026). Do not re-grade.",
  riceBranWax: "Methodology §5 Limited-risk (rice bran wax — exact token; Caution; distinct from Cleared carnauba wax and from Cleared rice bran oil as fill; locked Sept 23, 2026). Not Avoid.",
  riceFlour: "Methodology §5 Caution (rice flour — exact token). Distinct from Cleared rice hull / rice bran.",
  riceHull: "Methodology §5 Cleared (rice hulls / rice hull concentrate / organic rice hull concentrate). Distinct from Caution rice flour.",
  rosemary: "Methodology §5 Caution (rosemary extract as an oral inactive preservative — locked Sept 16, 2026). Not Avoid.",
  salt: "Methodology §5 Cleared (sodium chloride / sea salt). Sea salt sits on the sodium chloride row. Not a grade driver.",
  sio2: "Methodology §5 Limited (silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.",
  starchgel: "Methodology §5 Limited-risk (modified tapioca starchgel / cassava root — maps to Caution cassava dextrin and Caution unspecified starch; locked Sept 23, 2026). Limited modified tapioca starch stays Limited. Not Avoid.",
  stearate: "Methodology §5 Cleared (magnesium stearate / stearic acid).",
  tocopherol: "Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate / d-alpha tocopherol as inactive). Not tocopheryl acetate. Label string d-alpha tocopherols sits on this row.",
  water: "Methodology §5 Cleared (purified water).",
  xanthan: "Methodology §5 Cleared (xanthan gum — xanthan / guar / pectin family).",
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

function img(file: string): string {
  return `${CDN}${file}?width=1200`;
}

type Compact = {
  id: string;
  productName: string;
  category: string;
  barcode?: string;
  formulaId: string;
  audience: typeof ADULT;
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
      "Pain & Fever": ["thorne-glucosamine-chondroitin", "Independently Clean Thorne Glucosamine & Chondroitin already on main. Form labeled, not a hard filter (§6)."],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
  }
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
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. Adults unless the name says kids. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  });
}

const CLEAN_NOTE =
  "FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only. No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Sunflower, olive, or coconut oil on this non-gummy form is not the gummy seed-oil High rule.";

const CALCIUM = "naturewise-b85-calcium-citrate-extra";
const HSN = "naturewise-b85-hair-skin-nails";
const BCOMPLEX = "naturewise-b85-vegan-b-complex";

const COMPACT: Compact[] = [
  {
    id: "naturewise-b85-algae-vegan-omega3",
    productName: "NatureWise Vegan Algae Omega-3 (60 Count)",
    barcode: "810157852830",
    category: "Vitamins",
    formulaId: "naturewise-b85-algae-vegan-omega3",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Vegan Algae Omega-3", strength: "60 Count" }],
    flags: [
      ["Modified tapioca starch", "limited", "modStarch"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Modified tapioca starch. This softgel shell is the Limited modified-starch row. It is not modified tapioca starchgel. Cleared glycerin and water do not raise Avoid.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/algae-vegan-omega3; image ${img("NW_-_Algae_Vegan_Omega-3_-_5_-_Supplement_b27058a2-0227-4a4b-9014-89876a5c412e.jpg")}) other-ingredients: Softgel (modified tapioca starch, vegetable glycerin, purified water). The same Other Ingredients line is on the bottle right panel (${img("NW-AlgaeVeganOmega-3-1b-RightSide_New.jpg")}). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852830 is the GTIN-12 on this offer (60 Count). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-alpha-lipoic-acid",
    productName: "NatureWise Alpha Lipoic Acid (120 Count)",
    barcode: "810157853035",
    category: "Vitamins",
    formulaId: "naturewise-b85-alpha-lipoic-acid",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Alpha Lipoic Acid", strength: "120 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Rice flour", "limited", "riceFlour"],
      ["Rice bran wax", "limited", "riceBranWax"],
      ["Bamboo extract", "limited", "bamboo"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Rice bran wax; Bamboo extract. Bamboo extract maps to the locked organic bamboo extract Caution row. Rice bran wax is the Sept 23 exact token. Cleared capsule does not raise Avoid.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/alpha-lipoic-acid; image ${img("NW_-_Alpha_Lipoic_Acid_-_1b_-_Right_Side.jpg")}) other-ingredients: Capsule (hypromellose), rice flour, rice bran wax, bamboo extract. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157853035 is the GTIN-12 on this offer (120 Count). No DailyMed drug SPL.`,
  },
  {
    id: CALCIUM,
    productName: "NatureWise Calcium Citrate Extra-Strength (500 mg / 90 Count)",
    barcode: "810157851185",
    category: "Vitamins",
    formulaId: CALCIUM,
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Calcium Citrate Extra-Strength", strength: "500 mg / 90 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Ascorbyl palmitate", "cleared", "tocopherol"],
    ],
    verdict: "clean",
    note: CLEAN_NOTE,
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/calcium-extra-strength; image ${img("NW-CalciumCitrate-PDP-Right.jpg")}) other-ingredients: Capsule (hypromellose), ascorbyl palmitate. Serving size 3 capsules and 30 servings on this bottle is the 90 Count. The 180 Count supplement graphic prints the same Other Ingredients line (${img("NW-CalciumCitrate-4-Supplement180.jpg")}). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157851185 is the GTIN-12 on this 90 Count bottle. No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-calcium-citrate-extra-180",
    productName: "NatureWise Calcium Citrate Extra-Strength (500 mg / 180 Count)",
    barcode: "810157852182",
    category: "Vitamins",
    formulaId: CALCIUM,
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Calcium Citrate Extra-Strength", strength: "500 mg / 180 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Ascorbyl palmitate", "cleared", "tocopherol"],
    ],
    verdict: "clean",
    note: CLEAN_NOTE + " UPC-A 810157852182 is the published GTIN-12 for this 180 Count (Target primary barcode, 180 capsules, 60 servings of 500 mg). The 90 Count barcode is not copied onto this count.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/calcium-extra-strength; image ${img("NW-CalciumCitrate-4-Supplement180.jpg")}) other-ingredients: Capsule (hypromellose), ascorbyl palmitate. Serving size 3 capsules and 60 servings on this graphic is the 180 Count. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852182 is the published GTIN-12 for this 180 Count (Target primary barcode, 180 capsules / 60 servings). The supplement graphic itself does not print the bars. The 90 Count barcode is not copied onto this count. No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-green-coffee-bean",
    productName: "NatureWise Green Coffee Bean Extract (60 Count)",
    barcode: "858081006004",
    category: "Vitamins",
    formulaId: "naturewise-b85-green-coffee-bean",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Green Coffee Bean Extract", strength: "60 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Purified water", "cleared", "water"],
      ["Carrageenan", "limited", "carrageenan"],
      ["Potassium acetate", "cleared", "potassiumAcetate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Carrageenan. The capsule parenthetical names hypromellose, purified water, carrageenan, and potassium acetate. Potassium acetate stays the locked Cleared row. Cleared capsule and water do not raise Avoid.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/green-coffee-bean-extract; image ${img("NW-GreenCoffeeBean-5-Supplement.jpg")}) other-ingredients: Vegan capsules (Hypromellose, purified water, carrageenan, potassium acetate). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 858081006004 is the published GTIN-12 for this 60 Count (Target primary barcode and Vitacost UPC field, 800 mg, 60 capsules). No DailyMed drug SPL.`,
  },
  {
    id: HSN,
    productName: "NatureWise Hair, Skin & Nails Softgels (150 Count)",
    barcode: "855724007718",
    category: "Vitamins",
    formulaId: HSN,
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Hair, Skin & Nails Softgels", strength: "150 Count" }],
    flags: [
      ["Gelatin", "cleared", "gelatin"],
      ["Organic coconut oil", "cleared", "coconut"],
      ["Glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
      ["Sunflower lecithin", "cleared", "lecithin"],
      ["Annatto", "limited", "annatto"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Annatto; Silica. Silica is the 0-pt nanoparticle cap. Organic coconut oil on this softgel is Cleared fill, not the gummy seed-oil High rule. Argan oil is a Supplement Facts active, not this Other Ingredients line. The allergen line names tree nuts. It is not an extra inactive.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/hair-skin-nails-softgels; image ${img("NW-Hair_Skin_Nails-5-Supplement150.jpg")}) other-ingredients: Gelatin, organic coconut oil, glycerin, purified water, sunflower lecithin, annatto, silica. The 270 Count graphic prints the same Other Ingredients line (${img("NW-Hair_Skin_Nails-5-Supplement270.jpg")}). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 855724007718 is the published GTIN-12 for this 150 Count (Target primary barcode, 150 softgels / 50 servings). The 270 Count barcode is not copied onto this count. No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-hair-skin-nails-270",
    productName: "NatureWise Hair, Skin & Nails Softgels (270 Count)",
    barcode: "855724007817",
    category: "Vitamins",
    formulaId: HSN,
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Hair, Skin & Nails Softgels", strength: "270 Count" }],
    flags: [
      ["Gelatin", "cleared", "gelatin"],
      ["Organic coconut oil", "cleared", "coconut"],
      ["Glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
      ["Sunflower lecithin", "cleared", "lecithin"],
      ["Annatto", "limited", "annatto"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Annatto; Silica. Silica is the 0-pt nanoparticle cap. Organic coconut oil on this softgel is Cleared fill, not the gummy seed-oil High rule. Same Other Ingredients line as the 150 Count, so they share formulaId.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/hair-skin-nails-softgels; image ${img("NW-Hair_Skin_Nails-5-Supplement270.jpg")}) other-ingredients: Gelatin, organic coconut oil, glycerin, purified water, sunflower lecithin, annatto, silica. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 855724007817 is the published GTIN-12 for this 270 Count (Target primary barcode, 270 softgels / 90 servings). The 150 Count barcode is not copied onto this count. No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-turmeric-ginger",
    productName: "NatureWise Turmeric + Ginger (2400 mg / 90 Count)",
    barcode: "810157851383",
    category: "Vitamins",
    formulaId: "naturewise-b85-turmeric-ginger",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Turmeric + Ginger", strength: "2400 mg / 90 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Organic rice hull concentrate", "cleared", "riceHull"],
      ["Rice flour", "limited", "riceFlour"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour. Organic rice hull concentrate stays Cleared and is distinct from rice flour. Cleared capsule does not raise Avoid.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/organic-turmeric-ginger; image ${img("NW-Turmeric_Ginger2400mg-4-Supplement.jpg")}) other-ingredients: Capsule (hypromellose), organic rice hull concentrate, rice flour. The bottle right panel prints the same line (${img("Turmeric_Ginger2400mg-PDP-Right.jpg")}). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157851383 is the GTIN-12 on this offer (2400 mg / 90 Count). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-fiber-cleanse",
    productName: "NatureWise Total Colon Care - Fiber Cleanse (60 Count)",
    barcode: "858081006639",
    category: "Digestive",
    formulaId: "naturewise-b85-fiber-cleanse",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Total Colon Care - Fiber Cleanse", strength: "60 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Gellan gum", "cleared", "gellan"],
      ["Organic rice hull concentrate", "cleared", "riceHull"],
      ["Rice flour", "limited", "riceFlour"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour. The delayed-release capsule parenthetical names hypromellose and gellan gum. Both are Cleared. Organic rice hull concentrate stays Cleared. Psyllium and the herbal blend are Supplement Facts actives, not this Other Ingredients line.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/total-colon-care-fiber-cleanse; image ${img("NW-FiberCleanse-6-Supplement.jpg")}) other-ingredients: DR capsule (hypromellose, gellan gum), organic rice hull concentrate, rice flour. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 858081006639 is the published GTIN-12 for this 60 Count (Vitacost UPC field, 60 vegan capsules). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-quadruple-omega-3",
    productName: "NatureWise Quadruple Strength Omega-3 (120 Count)",
    barcode: "810157851529",
    category: "Vitamins",
    formulaId: "naturewise-b85-quadruple-omega-3",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Quadruple Strength Omega-3", strength: "120 Count" }],
    flags: [
      ["Halal gelatin", "cleared", "gelatin"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
      ["Lemon flavor", "limited", "flavors"],
      ["Mixed tocopherols", "cleared", "tocopherol"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Lemon flavor. Named lemon flavor sits on the Limited natural-flavors row. Mixed tocopherols are the Cleared inactive antioxidant row, not tocopheryl acetate. Cleared softgel tokens do not raise Avoid. Not an oil-bottle grade.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/quadruple-strength-omega-3; image ${img("NW-Omega-34080mg-9-Supplement.jpg")}) other-ingredients: Softgel (halal gelatin, vegetable glycerin, purified water, lemon flavor), mixed tocopherols. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157851529 is the published GTIN-12 for this 120 Count (Target primary barcode, 120 softgels / 40 servings). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-vegan-vitamin-d3",
    productName: "NatureWise Vegan Vitamin D3 (5000 IU / 60 Count)",
    barcode: "855724007701",
    category: "Vitamins",
    formulaId: "naturewise-b85-vegan-vitamin-d3",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Vegan Vitamin D3", strength: "5000 IU / 60 Count" }],
    flags: [
      ["Organic extra virgin olive oil", "cleared", "oliveFill"],
      ["Modified tapioca starchgel (cassava root)", "limited", "starchgel"],
      ["Glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Modified tapioca starchgel (cassava root). That exact string maps to Caution cassava dextrin and Caution unspecified starch. It is not the Limited modified tapioca starch row. Do not flip that Limited row. Organic extra virgin olive oil on this softgel is Cleared fill. Not an oil-bottle grade.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/vegan-vitamin-d3; image ${img("NW-VeganVitaminD35_000IU-4-Supplement.jpg")}) other-ingredients: Organic extra virgin olive oil, modified tapioca starchgel (cassava root), glycerin, purified water. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 855724007701 is the published GTIN-12 for this 5000 IU / 60 Count (Target primary barcode, 60 softgels). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-sunpine-d3-k2",
    productName: "NatureWise SunPine Vegan Vitamin D3 + K2 (60 Count)",
    barcode: "810157852571",
    category: "Vitamins",
    formulaId: "naturewise-b85-sunpine-d3-k2",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "SunPine Vegan Vitamin D3 + K2", strength: "60 Count" }],
    flags: [
      ["Organic extra virgin olive oil", "cleared", "oliveFill"],
      ["Modified tapioca starch", "limited", "modStarch"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Modified tapioca starch. This shell is the Limited modified-starch row. It is not modified tapioca starchgel. Organic extra virgin olive oil on this softgel is Cleared fill. Not an oil-bottle grade.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/sunpine-vitamin-d3-k2; image ${img("NW-VeganVitaminD3FromPineTree-1b-RightSide.jpg")}) other-ingredients: Organic extra virgin olive oil, softgel (modified tapioca starch, vegetable glycerin, purified water). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852571 is the GTIN-12 on this offer (60 Count). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-vitamin-c-bioflavonoids",
    productName: "NatureWise Vitamin C with Citrus Bioflavonoids (90 Count)",
    barcode: "810157852984",
    category: "Vitamins",
    formulaId: "naturewise-b85-vitamin-c-bioflavonoids",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Vitamin C with Citrus Bioflavonoids", strength: "90 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Microcrystalline cellulose", "cleared", "mcc"],
      ["L-leucine", "cleared", "leucine"],
      ["Bamboo extract", "limited", "bamboo"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Bamboo extract. Bamboo extract maps to the locked organic bamboo extract Caution row. Cleared capsule, cellulose, and L-leucine do not raise Avoid.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/vitamin-c-with-bioflavonoids; image ${img("NW-VitaminC500mg-1b-RightSide.jpg")}) other-ingredients: Capsule (hypromellose), microcrystalline cellulose, L-leucine, bamboo extract. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852984 is the GTIN-12 on this offer (90 Count). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-sleep-complex",
    productName: "NatureWise Sleep Complex (60 Count)",
    barcode: "810157852601",
    category: "Sleep",
    formulaId: "naturewise-b85-sleep-complex",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Sleep Complex", strength: "60 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["L-leucine", "cleared", "leucine"],
      ["Bamboo extract", "limited", "bamboo"],
      ["Rice flour", "limited", "riceFlour"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Bamboo extract; Rice flour. Bamboo extract maps to the locked organic bamboo extract Caution row. Cleared capsule and L-leucine do not raise Avoid.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/sleep-complex; image ${img("NW_-_Sleep_Complex_-_1b_-_Right_Side.jpg")}) other-ingredients: Capsule (hypromellose), L-leucine, bamboo extract, rice flour. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852601 is the GTIN-12 on this offer (60 Count). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-liquid-hair-growth",
    productName: "NatureWise Liquid Hair Growth Plus (Pistachio Caramel / 15.22 oz)",
    barcode: "810157851352",
    category: "Vitamins",
    formulaId: "naturewise-b85-liquid-hair-growth",
    audience: ADULT,
    minAge: 18,
    form: "liquid",
    productType: SUPPLEMENT,
    actives: [{ name: "Liquid Hair Growth Plus", strength: "15.22 oz" }],
    flags: [
      ["Purified water", "cleared", "water"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Flavors (from natural sources)", "limited", "flavors"],
      ["Xanthan gum", "cleared", "xanthan"],
      ["Sea salt", "cleared", "salt"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Flavors (from natural sources). Sea salt sits on Cleared sodium chloride. The 2-pack multipack stays the batch82 OUT row and was not rewritten. The allergen line names tree nut (argan). Argan is not in this Other Ingredients line.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/liquid-hair-growth-plus; image ${img("NW-HairGrowth_-RIGHT.jpg")}) other-ingredients: Purified water, vegetable glycerin, flavors (from natural sources), xanthan gum, sea salt. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157851352 is the published GTIN-12 for this 15.22 oz single bottle (Target primary barcode). The 2-pack is a different pack and is not this code. No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-magnesium-stress-sleep",
    productName: "NatureWise Magnesium Stress & Sleep (60 Tablets)",
    barcode: "810157852823",
    category: "Sleep",
    formulaId: "naturewise-b85-magnesium-stress-sleep",
    audience: ADULT,
    minAge: 18,
    form: "tablet",
    productType: SUPPLEMENT,
    actives: [{ name: "Magnesium Stress & Sleep", strength: "60 Tablets" }],
    flags: [
      ["Microcrystalline cellulose", "cleared", "mcc"],
      ["Croscarmellose sodium", "cleared", "croscarmellose"],
      ["Stearic acid", "cleared", "stearate"],
      ["L-leucine", "cleared", "leucine"],
      ["Hypromellose", "cleared", "hpmc"],
      ["Polyethylene glycol", "moderate", "peg"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Polyethylene glycol. The coating parenthetical names hypromellose and polyethylene glycol. Polyethylene glycol is Moderate and does not make Avoid without High. Cleared tablet tokens do not raise Avoid.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/magnesium-stress-sleep; image ${img("Magnesium_Stress_Sleep_Formula_-_Right_Side.jpg")}) other-ingredients: Microcrystalline cellulose, croscarmellose sodium, stearic acid, L-leucine, and coating (hypromellose, polyethylene glycol). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852823 is the GTIN-12 on this offer (60 Tablets). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-triple-calm-magnesium",
    productName: "NatureWise Triple Calm Magnesium (120 Count)",
    barcode: "810157853271",
    category: "Vitamins",
    formulaId: "naturewise-b85-triple-calm-magnesium",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Triple Calm Magnesium", strength: "120 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["L-leucine", "cleared", "leucine"],
      ["Microcrystalline cellulose", "cleared", "mcc"],
      ["Rice hull concentrate", "cleared", "riceHull"],
      ["Bamboo extract", "limited", "bamboo"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Bamboo extract. Bamboo extract maps to the locked organic bamboo extract Caution row. Rice hull concentrate stays Cleared and is distinct from rice flour. Cleared capsule tokens do not raise Avoid.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/triple-calm-magnesium; image ${img("NW-TripleCalmMagnesium-1b-RightSide.jpg")}) other-ingredients: Capsule (hypromellose), L-leucine, microcrystalline cellulose, rice hull concentrate, bamboo extract. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157853271 is the GTIN-12 on this offer (120 Count). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-omegawise-women",
    productName: "NatureWise OmegaWise for Women (120 Count)",
    barcode: "810157852694",
    category: "Vitamins",
    formulaId: "naturewise-b85-omegawise-women",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "OmegaWise for Women", strength: "120 Count" }],
    flags: [
      ["Halal gelatin", "cleared", "gelatin"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
      ["Lemon flavor", "limited", "flavors"],
      ["Mixed tocopherols", "cleared", "tocopherol"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Lemon flavor. Named lemon flavor sits on the Limited natural-flavors row. Mixed tocopherols are the Cleared inactive antioxidant row. This OI list is not the DHA Boost list's twin product, so it does not share that formulaId. Not an oil-bottle grade.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/omegawise-for-women; image ${img("OmegaWise_Women_-_Right_Side.jpg")}) other-ingredients: Softgel (halal gelatin, vegetable glycerin, purified water, lemon flavor), mixed tocopherols. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852694 is the GTIN-12 on this offer (120 Count). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-omegawise-dha",
    productName: "NatureWise OmegaWise DHA Boost (60 Count)",
    barcode: "810157852700",
    category: "Vitamins",
    formulaId: "naturewise-b85-omegawise-dha",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "OmegaWise DHA Boost", strength: "60 Count" }],
    flags: [
      ["Halal gelatin", "cleared", "gelatin"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
      ["Lemon flavor", "limited", "flavors"],
      ["Mixed tocopherols", "cleared", "tocopherol"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Lemon flavor. The Supplement Facts fish-oil line also says with natural lemon flavor. The Other Ingredients lemon flavor is the inactive. Mixed tocopherols stay Cleared. Not an oil-bottle grade.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/omegawise-dha-boost; image ${img("NW_-_OmegaWise_DHA_Boost_-_1b_-_Right_Side.jpg")}) other-ingredients: Softgel (halal gelatin, vegetable glycerin, purified water, lemon flavor), mixed tocopherols. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852700 is the GTIN-12 on this offer (60 Count). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-sea-moss",
    productName: "NatureWise Sea Moss Multimineral (90 Count)",
    barcode: "810157853493",
    category: "Vitamins",
    formulaId: "naturewise-b85-sea-moss",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Sea Moss Multimineral", strength: "90 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Microcrystalline cellulose", "cleared", "mcc"],
      ["Rice hull concentrate", "cleared", "riceHull"],
      ["Rice flour", "limited", "riceFlour"],
      ["Bamboo extract", "limited", "bamboo"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Bamboo extract. Rice hull concentrate stays Cleared and is distinct from rice flour. Bamboo extract maps to the locked organic bamboo extract Caution row.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/sea-moss-multimineral; image ${img("NW-CompleteMultimineral-1b-RightSide.jpg")}) other-ingredients: Capsule (hypromellose), microcrystalline cellulose, rice hull concentrate, rice flour, bamboo extract. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157853493 is the GTIN-12 on the left panel of this same PDP (${img("NW-CompleteMultimineral-1a-LeftSide.jpg")}) (90 Count). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-glucosamine-chondroitin",
    productName: "NatureWise Glucosamine Chondroitin (90 Count)",
    barcode: "810157852915",
    category: "Pain & Fever",
    formulaId: "naturewise-b85-glucosamine-chondroitin",
    audience: ADULT,
    minAge: 18,
    form: "capsule",
    productType: SUPPLEMENT,
    actives: [{ name: "Glucosamine Chondroitin", strength: "90 Count" }],
    flags: [
      ["Hypromellose (cellulose) capsule", "cleared", "hpmc"],
      ["Microcrystalline cellulose", "cleared", "mcc"],
      ["L-leucine", "cleared", "leucine"],
      ["Rice flour", "limited", "riceFlour"],
      ["Bamboo extract", "limited", "bamboo"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice flour; Bamboo extract. Bamboo extract maps to the locked organic bamboo extract Caution row. Cleared capsule tokens do not raise Avoid.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/glucosamine-chondroitin; image ${img("NW_-_Glucosamine_Chondroitin_-_1b_-_Right_Side.jpg")}) other-ingredients: Capsule (hypromellose), microcrystalline cellulose, L-leucine, rice flour, bamboo extract. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852915 is the GTIN-12 on this offer (90 Count). No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-ultra-omega-3",
    productName: "NatureWise Ultra Omega-3 Fish Oil (2200 mg / 120 Count)",
    barcode: "810157850140",
    category: "Vitamins",
    formulaId: "naturewise-b85-ultra-omega-3",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Ultra Omega-3 Fish Oil", strength: "2200 mg / 120 Count" }],
    flags: [
      ["Halal gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
      ["Lemon flavor", "limited", "flavors"],
      ["d-alpha tocopherols", "cleared", "tocopherol"],
      ["Rosemary extract", "limited", "rosemary"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Lemon flavor; Rosemary extract. d-alpha tocopherols sit on the Cleared d-alpha tocopherol inactive row. They are not tocopheryl acetate. The 60 Count and 180 Count tabs on this PDP do not have their own supplement-facts image, so those counts are not given a separate row and this 120 Count UPC is not copied onto them. Not an oil-bottle grade.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/omega-3-fish-oil; image ${img("NW-Omega-31300mg-9-Supplement120.jpg")}) other-ingredients: Halal gelatin, glycerin, purified water, lemon flavor, d-alpha tocopherols, rosemary extract. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157850140 is the published GTIN-12 for this 2200 mg / 120 Count (Target primary barcode, 120 softgels / 60 servings). The 60 Count and 180 Count barcodes are not copied onto this row. No DailyMed drug SPL.`,
  },
  {
    id: BCOMPLEX,
    productName: "NatureWise Vegan Vitamin B Complex (60 Count)",
    barcode: "810157852625",
    category: "Vitamins",
    formulaId: BCOMPLEX,
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Vegan Vitamin B Complex", strength: "60 Count" }],
    flags: [
      ["Modified tapioca starch", "limited", "modStarch"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
      ["Annatto", "limited", "annatto"],
      ["Organic MCT oil", "limited", "mctUnlabeled"],
      ["Sunflower lecithin", "cleared", "lecithin"],
      ["Rice bran wax", "limited", "riceBranWax"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Modified tapioca starch; Annatto; Organic MCT oil; Rice bran wax. Modified tapioca starch stays the Limited row. It is not starchgel. Organic MCT oil does not name coconut or palm kernel, so it stays Limited unlabeled MCT. Not an oil-bottle grade.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/vegan-vitamin-b-complex; image ${img("NW-VeganB-Complex-1b-RightSide60.jpg")}) other-ingredients: Softgel (modified tapioca starch, vegetable glycerin, purified water, annatto), organic MCT oil, sunflower lecithin, rice bran wax. The 120 Count right panel prints the same Other Ingredients line (${img("NW-VeganB-Complex-1b-RightSide120.jpg")}). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852625 is the published GTIN-12 for this 60 Count (Target primary barcode, 60 softgels). The 120 Count barcode is not copied onto this count. No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-vegan-b-complex-120",
    productName: "NatureWise Vegan Vitamin B Complex (120 Count)",
    barcode: "810157852632",
    category: "Vitamins",
    formulaId: BCOMPLEX,
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Vegan Vitamin B Complex", strength: "120 Count" }],
    flags: [
      ["Modified tapioca starch", "limited", "modStarch"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
      ["Annatto", "limited", "annatto"],
      ["Organic MCT oil", "limited", "mctUnlabeled"],
      ["Sunflower lecithin", "cleared", "lecithin"],
      ["Rice bran wax", "limited", "riceBranWax"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Modified tapioca starch; Annatto; Organic MCT oil; Rice bran wax. Same Other Ingredients line as the 60 Count, so they share formulaId. Organic MCT oil stays Limited unlabeled MCT. Not an oil-bottle grade.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/vegan-vitamin-b-complex; image ${img("NW-VeganB-Complex-1b-RightSide120.jpg")}) other-ingredients: Softgel (modified tapioca starch, vegetable glycerin, purified water, annatto), organic MCT oil, sunflower lecithin, rice bran wax. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852632 is the GTIN-12 zbar read on this 120 Count right panel and the Target primary barcode for 120 softgels. The 60 Count barcode is not copied onto this count. No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b85-vitamin-e-softgels",
    productName: "NatureWise Vitamin E Softgels (60 Count)",
    barcode: "850053810237",
    category: "Vitamins",
    formulaId: "naturewise-b85-vitamin-e-softgels",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Vitamin E Softgels", strength: "60 Count" }],
    flags: [
      ["Halal gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
    ],
    verdict: "clean",
    note: CLEAN_NOTE + " d-alpha tocopheryl acetate is the Supplement Facts vitamin on this bottle, not an Other Ingredient. The 120 Count and 200 Count fronts on this PDP do not include their own Other Ingredients panel, so those counts are not given a row.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/vitamin-e; image ${img("NW-60VitaminERIGHT.jpg")}) other-ingredients: Halal gelatin, glycerin, purified water. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 850053810237 is the GTIN-12 on this 60 Count bottle. No DailyMed drug SPL.`,
  },
];

export const BATCH85_KYR6_NATUREWISE_NO_OI: RatingRecord[] = COMPACT.map(expand);

const LADDER =
  "iHerb search returned 403. Vitacost search was a captcha wall and did not return a product PDP. Walmart search returned a robot wall. Target search returned no product PDP. Amazon search returned an automated-access block, so the Amazon carousel was not opened. OI not invented.";

export const BATCH85_SKIPPED_NO_OI: { sku: string; reason: string }[] = [
  {
    sku: "Creatine Monohydrate",
    reason: `SKIPPED no_OI leftover. naturewise.com gallery https://www.naturewise.com/products/creatine-monohydrate (right panel Creatine-PDP-Right.jpg and the rest of the carousel) did not yield a reliable Other Ingredients line. HTML bullets were not treated as a panel. ${LADDER}`,
  },
  {
    sku: "Women's Multivitamin with Stress Support",
    reason: `SKIPPED no_OI leftover. naturewise.com gallery https://www.naturewise.com/products/womens-multivitamin has marketing tiles and a serving graphic, not an Other Ingredients panel. HTML bullets were not treated as a panel. ${LADDER}`,
  },
  {
    sku: "Vitamin B12",
    reason: `SKIPPED no_OI leftover. naturewise.com gallery https://www.naturewise.com/products/vitamin-b12 has fronts and a serving graphic, not an Other Ingredients panel, on the 1000 mcg / 60 Count, 1000 mcg / 150 Count, 3000 mcg / 60 Count, and 5000 mcg / 60 Count tabs. HTML bullets were not treated as a panel. ${LADDER}`,
  },
  {
    sku: "Flaxseed Oil (3000 mg / 90 Count)",
    reason: `SKIPPED no_OI leftover. The 3000 mg / 90 Count tab on https://www.naturewise.com/products/flaxseed-oil is a front tile only. The readable softgel panel on this PDP is the 30 Count right side, a different strength, and was not copied onto 3000 mg / 90 Count. ${LADDER}`,
  },
];

export const BATCH85_SKIPPED_OUT: { sku: string; reason: string }[] = [];

export const BATCH85_SKIPPED_OTHER: { sku: string; reason: string }[] = [];

export const BATCH85_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH85_SKIPPED_NO_OI,
  ...BATCH85_SKIPPED_OUT,
  ...BATCH85_SKIPPED_OTHER,
];

export const BATCH85_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: "Vegan Vitamin K2 as MK-7",
    reason: "REFUSED exact panel string `turmeric`. The naturewise.com right panel (https://www.naturewise.com/products/vitamin-k2-mk-7; image NW_-_Vitamin_K2_100_mcg_-_1b_-_Right_Side.jpg) prints Other Ingredients: Softgel (modified tapioca starch, vegetable glycerin, purified water, turmeric), organic MCT oil, olive oil. Bare `turmeric` is not the locked turmeric-as-color string and not oleoresin turmeric. No grade invented. NO Search row. SKU: Vegan Vitamin K2 as MK-7.",
  },
  {
    sku: "Oral Probiotics - Chewable Tablets",
    reason: "REFUSED exact panel string(s) `behenoyl polyoxyl-8 glycerides`, `stevia leaf extract`. The naturewise.com supplement graphics for 30 Count and 60 Count (https://www.naturewise.com/products/oral-probiotics-chewable-tablets) print Other Ingredients: Isomalt, inulin, behenoyl polyoxyl-8 glycerides, dicalcium phosphate, natural peppermint flavor, stevia leaf extract. `stevia leaf extract` is not the locked exact token stevia extract and not Reb A. The 3 Pack multipack stays the batch82 OUT row and was not reopened. NO Search row. SKU: Oral Probiotics - Chewable Tablets.",
  },
  {
    sku: "Advanced Joint Care",
    reason: `REFUSED. The current naturewise.com gallery (https://www.naturewise.com/products/advanced-joint-care) still has no complete Other Ingredients panel. Serving, chart, and info tiles are not a supplement-facts panel. Prior incomplete strings \`bamboo extract\` and \`rice bran wax\` were not re-read onto a missing line. OI not invented. ${LADDER} NO Search row. SKU: Advanced Joint Care.`,
  },
  {
    sku: "Vegan Vitamin K2 Softgels",
    reason: `REFUSED. The current naturewise.com gallery (https://www.naturewise.com/products/vegan-vitamin-k2) still has no complete Other Ingredients panel. Front, marketing, and serving tiles only, on the 90 Count, 180 Count, and 360 Count tabs. Prior incomplete string \`modified tapioca starchgel (cassava root)\` was not re-read onto a missing line. OI not invented. ${LADDER} NO Search row. SKU: Vegan Vitamin K2 Softgels.`,
  },
];

const _ROWS = BATCH85_KYR6_NATUREWISE_NO_OI;
if (_ROWS.length !== 25) throw new Error('batch85 tally drift: expected 25 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 3) throw new Error('batch85 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 22) throw new Error('batch85 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) throw new Error('batch85 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch85 recordStatus must stay unverified');
if (_ROWS.some((r) => !r.formulaId)) throw new Error('batch85 every row needs formulaId');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch85 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch85 writes NatureWise only');
if (_ROWS.some((r) => r.barcode && !/^\d{12}$/.test(r.barcode))) {
  throw new Error('batch85 barcode must be a 12-digit UPC-A');
}
if (_ROWS.some((r) => {
  if (!r.barcode) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(r.barcode[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 !== Number(r.barcode[11]);
})) {
  throw new Error('batch85 barcode failed UPC-A check digit');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 3) throw new Error('batch85 REUSE-formula tally drift');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 22) throw new Error('batch85 NEW formula drift');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) throw new Error('batch85 formulaId must point at a row in this file');
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|nutricost|welmate|goodsense|healtha2z|time-cap|a\+health/i.test(r.brand + r.productName))) {
  throw new Error('batch85 leftover 3P / Sprouts / toothpaste / NOW / Nutricost must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/softgel|capsule|gumm|tablet|chew/i.test(r.productName + (r.form ?? '')))) {
  throw new Error('batch85 must not grade oil pour bottles');
}
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch85 Avoid without High on ${record.id}`);
  }
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch85 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch85 Clean row has a non-cleared flag on ${record.id}`);
  }
  if (record.form === 'gummy') throw new Error(`batch85 has no gummy rows: ${record.id}`);
}
if (BATCH85_SKIPPED_NO_OI.length !== 4) throw new Error('batch85 no_OI leftover tally drift');
if (BATCH85_SKIPPED_OUT.length !== 0) throw new Error('batch85 OUT must stay 0');
if (BATCH85_SKIPPED_OTHER.length !== 0) throw new Error('batch85 other skip must stay 0');
if (BATCH85_SKIPPED.length !== 4) throw new Error('batch85 skip tally drift');
if (!BATCH85_SKIPPED_NO_OI.every((s) => /no_OI leftover/i.test(s.reason))) throw new Error('batch85 no_OI reasons');
if (BATCH85_REFUSED.length !== 4) throw new Error('batch85 refuse tally drift');
if (BATCH85_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) throw new Error('batch85 REFUSED must quote an exact panel string');
