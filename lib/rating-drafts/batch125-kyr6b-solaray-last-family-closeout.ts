// DRAFT / not verified / batch 125 KYR6-b Solaray last family closeout.
// Methodology v1.6 + MAIN section 5. Harm-first. No invented grades.
// Sept 28, 2026 founder family lock. Existing grades were not flipped.
// Bare Natural [fruit] and Organic Natural [fruit] stay the named-flavor Caution row.
// Sucrose stays the Sept 20 Limited sugar row.
// Parsley Leaf was not stamped. No Italy, LLC, trademark, or OCR junk.
// batch70-batch124 were not edited. Solaray only. UPC stays empty.
//
// TALLY: 34 rows — Clean 1 / Caution 32 / Avoid 1.
// NEW 29 / REUSE 5 / SKIPPED no_OI leftover 1 / SKIPPED OUT 0 / REFUSED 132.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';
const BRAND = 'Solaray';
const RETAILERS = ['Amazon', 'solaray.com'] as const;
const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';
const UPC_BLANK =
  'No GTIN-12 was printed under the bars on the panel opened for Other Ingredients, so UPC is blank. Shopify barcodes that echo the SKU are not UPCs.';

const METH = {
  acerola: 'Methodology §5 Cleared (organic acerola). Acerola Cherry and Acerola (fruit juice) map here (Sept 28, 2026).',
  aloe: 'Methodology §5 Caution (aloe as an other ingredient). Aloe Vera Gel, including inside a whole-rice base, maps here (Sept 28, 2026). Not the topical aloe base.',
  annatto: 'Methodology §5 Caution (annatto). Not Avoid.',
  beeswax: 'Methodology §5 Cleared (beeswax / yellow beeswax).',
  beet: 'Methodology §5 Cleared (beet root juice for color).',
  botanical: 'Methodology §5 Cleared (named plant-part food botanical). Case and parenthetical variants map here (Sept 28, 2026). Parsley is not this row.',
  caramel: 'Methodology §5 High (caramel color, undisclosed class). Caramel (coloring) maps here (Sept 28, 2026). Avoid.',
  carotenoid: 'Methodology §5 Caution (beta-carotene as color).',
  carrageenan: 'Methodology §5 Limited (carrageenan). Not a new grade.',
  carob: 'Methodology §5 Caution (carob extract). Plain Carob in a gelatin softgel is this row, not carob powder-as-food (Sept 28, 2026).',
  carrotjuice: 'Methodology §5 Caution (carrot juice powder as color/flavor). Carrot Juice and Carrot Juice (root) map here (Sept 28, 2026).',
  casil: 'Methodology §5 Caution (calcium silicate). Not Avoid.',
  citrate: 'Methodology §5 Cleared (citrate salts). Magnesium Citrate maps here (Sept 28, 2026).',
  citric: 'Methodology §5 Cleared (citric acid).',
  dextrin: 'Methodology §5 Caution (bare dextrin). Dextrin (from Non-GMO Maca) is this row (Sept 28, 2026).',
  eleuthero: 'Methodology §5 Caution (Eleuthero Root on the Other Ingredients line).',
  flavor: 'Methodology §5 Caution (named flavor). Bare Natural [fruit] and Organic Natural [fruit] map here (Sept 28, 2026). The Limited natural-flavors opacity row is not flipped.',
  fructose: 'Methodology §5 Limited (fructose as sweetener). Not High.',
  gelatin: 'Methodology §5 Cleared (gelatin / gelatin capsule).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  gum: 'Methodology §5 Cleared (guar / acacia / gum arabic).',
  lecithin: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  licorice: 'Methodology §5 Cleared (licorice extract / Glycyrrhiza). Licorice (root) and Licorice Root map here (Sept 28, 2026).',
  malic: 'Methodology §5 Cleared (malic acid).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mcc: 'Methodology §5 Cleared (cellulose / MCC / croscarmellose sodium).',
  modstarch: 'Methodology §5 Limited (modified starch / modified corn starch).',
  oatfiber: 'Methodology §5 Cleared (oat fiber). Not organic oat fiber Caution.',
  oilfill: 'Methodology §5 Cleared (named oil as non-gummy capsule / softgel fill). Gummy and lozenge seed oils stay High.',
  ricebran: 'Methodology §5 Cleared (rice bran extract).',
  riceconc: 'Methodology §5 Cleared (whole rice concentrate). A whole-rice string with bran, germ, polishings, kernel, hull, or pure maps here (Sept 28, 2026). Rice Bran Concentrate does not.',
  riceextract: 'Methodology §5 Limited (unspecified rice extract).',
  ricepowder: 'Methodology §5 Caution (rice powder / rice flour). Not Avoid.',
  sio2: 'Methodology §5 Limited (silica / silicon dioxide). Not Avoid.',
  soy: 'Methodology §5 Limited (bare soy). Not soy lecithin. Not High.',
  starch: 'Methodology §5 Cleared (named simple starch / bare starch as filler).',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid).',
  stevia: 'Methodology §5 Caution (stevia extract / stevia leaf extract).',
  sucrose: 'Methodology §5 Limited (sucrose = existing Limited sugar, Sept 20). Not High.',
  sugaralc: 'Methodology §5 Limited (sorbitol / xylitol).',
  toco: 'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate).',
  vegcap: 'Methodology §5 Cleared (capsule cellulose / labeled veg cap).',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}
function row(opts: Omit<RatingRecord, 'recordStatus'> & { recordStatus?: RatingRecord['recordStatus'] }): RatingRecord {
  return { ...opts, recordStatus: opts.recordStatus ?? UNVERIFIED };
}
type Compact = {
  id: string;
  productName: string;
  formulaId: string;
  form: string;
  barcode?: string;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
};
function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    alts.push(alt('amazon-elements-vitamin-d3-5000-softgels', 'Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6).'));
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: 'Vitamins',
    formulaId: d.formulaId,
    audience: ADULT,
    minAge: 18,
    form: d.form,
    ...(d.barcode ? { barcode: d.barcode } : {}),
    productType: SUPPLEMENT,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) => flag(n, risk, labelCite(d.cite, METH[meth]))),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. Adults unless the name says kids. No dosing or medical advice. Draft, not verified.`,
    retailers: [...RETAILERS],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  });
}

const COMPACT: Compact[] = [
  {
    id: "solaray-b125-076280008111",
    productName: "Solaray DHA Neuromins 100mg (60ct)",
    formulaId: "solaray-b125-076280008111",
    form: "softgel",
    barcode: "076280008111",
    actives: [
      { name: "DHA (Docosahexaenoic Acid) (from Algal Oil)", strength: "100 mg" },
    ],
    flags: [
      ["Modified Corn Starch (Non-GMO)", "limited", "modstarch"],
      ["Glycerin", "cleared", "glycerin"],
      ["High Oleic Sunflower Oil", "cleared", "oilfill"],
      ["Water", "cleared", "water"],
      ["Carrageenan", "limited", "carrageenan"],
      ["Sorbitol", "limited", "sugaralc"],
      ["Ascorbyl Palmitate (antioxidant)", "cleared", "toco"],
      ["Tocopherols (antioxidant)", "cleared", "toco"],
      ["Natural Flavor", "limited", "flavor"],
      ["Sunflower Lecithin", "cleared", "lecithin"],
      ["Beta Carotene (coloring)", "limited", "carotenoid"],
      ["Caramel (coloring)", "high", "caramel"],
    ],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Carrageenan = carrageenan Limited. Caramel (coloring) = undisclosed caramel color High. Driver family: caramel. High flag required.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/dha-neuromins other-ingredients: Modified Corn Starch (Non-GMO), Glycerin, High Oleic Sunflower Oil, Water, Carrageenan, Sorbitol, Ascorbyl Palmitate (antioxidant), Tocopherols (antioxidant), Natural Flavor, Sunflower Lecithin, Beta Carotene (coloring) and Caramel (coloring). Token map: Carrageenan = carrageenan Limited. Caramel (coloring) = undisclosed caramel color High. Exact pack Solaray DHA Neuromins 100mg (60ct). SKU 076280008111. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280031577",
    productName: "Solaray GlucoReg, Blood Glucose Support (30ct)",
    formulaId: "solaray-b125-076280031577",
    form: "capsule",
    barcode: "076280031577",
    actives: [
      { name: "Bitter Melon (Momordica charantia) (fruit extract)", strength: "500 mg" },
      { name: "Gymnema (Gymnema sylvestre) (leaf extract)", strength: "150 mg" },
      { name: "Chromium (from Chromium Polynicotinate)", strength: "200 mcg" },
    ],
    flags: [
      ["Fenugreek Seeds", "cleared", "botanical"],
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Fenugreek Seeds = named plant-part botanical Cleared. Driver families: Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/glucoreg-blood-glucose-support other-ingredients: Fenugreek Seeds, Vegetable Cellulose Capsule, Stearic Acid and Silica. Token map: Fenugreek Seeds = named plant-part botanical Cleared. Exact pack Solaray GlucoReg, Blood Glucose Support (30ct). SKU 076280031577. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280036879",
    productName: "Solaray Maca Root Extract 300 mg (60ct)",
    formulaId: "solaray-b125-076280036879",
    form: "capsule",
    barcode: "076280036879",
    actives: [
      { name: "Maca (Lepidium meyenii) (root extract)", strength: "300 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Dextrin (from Non-GMO Maca)", "limited", "dextrin"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceextract"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Dextrin (from Non-GMO Maca) = bare dextrin Caution. Parenthetical source does not change the row. Driver families: Dextrin (from Non-GMO Maca), Organic Rice Extract Blend, Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/maca-root-extract other-ingredients: Vegetable Cellulose Capsule, Dextrin (from Non-GMO Maca), Cellulose, Organic Rice Extract Blend and Silica. Token map: Dextrin (from Non-GMO Maca) = bare dextrin Caution. Parenthetical source does not change the row. Exact pack Solaray Maca Root Extract 300 mg (60ct). SKU 076280036879. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280037586",
    productName: "Solaray Phytoestrogen (120ct)",
    formulaId: "solaray-b125-076280037586",
    form: "capsule",
    barcode: "076280037586",
    actives: [
      { name: "Non-GMO Soy (Glycine max) (bean extract)", strength: "200 mg" },
      { name: "Wild Yam (Dioscorea villosa) (root)", strength: "200 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Ginger Root", "cleared", "botanical"],
      ["Licorice Root", "cleared", "licorice"],
      ["Saw Palmetto Berry", "cleared", "botanical"],
      ["Pygeum Bark Extract", "cleared", "botanical"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Ginger Root = botanical Cleared. Licorice Root = licorice extract Cleared. Saw Palmetto Berry = botanical Cleared. Pygeum Bark Extract = botanical Cleared. Driver families: Maltodextrin. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/phytoestrogen other-ingredients: Vegetable Cellulose Capsule, Maltodextrin, Magnesium Stearate, Ginger Root, Licorice Root, Saw Palmetto Berry and Pygeum Bark Extract. Token map: Ginger Root = botanical Cleared. Licorice Root = licorice extract Cleared. Saw Palmetto Berry = botanical Cleared. Pygeum Bark Extract = botanical Cleared. Exact pack Solaray Phytoestrogen (120ct). SKU 076280037586. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280041309",
    productName: "Solaray Vitamin A, Dry Form 7500mcg (60ct)",
    formulaId: "solaray-b125-076280041309",
    form: "capsule",
    barcode: "076280041309",
    actives: [
      { name: "Vitamin A (as 60% Beta Carotene and 40% Retinyl Palmitate)", strength: "7,500 mcg" },
      { name: "Carrot Powder", strength: "230 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Sucrose", "limited", "sucrose"],
      ["Starch", "cleared", "starch"],
      ["Carrot Juice (root)", "limited", "carrotjuice"],
      ["Maltodextrin", "limited", "maltodextrin"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Carrot Juice (root) = Carrot Juice Powder juice-powder color/flavor Caution. Sucrose stays Limited. Driver families: Sucrose, Carrot Juice (root), Maltodextrin. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-a-dry-form other-ingredients: Vegetable Cellulose Capsule, Sucrose, Starch, Carrot Juice (root), and Maltodextrin. Token map: Carrot Juice (root) = Carrot Juice Powder juice-powder color/flavor Caution. Sucrose stays Limited. Exact pack Solaray Vitamin A, Dry Form 7500mcg (60ct). SKU 076280041309. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280042153",
    productName: "Solaray Vitamin B-Stress (100ct)",
    formulaId: "solaray-b125-076280042153",
    form: "capsule",
    barcode: "076280042153",
    actives: [
      { name: "Vitamin C (as Ascorbic Acid)", strength: "600 mg" },
      { name: "Thiamine (as Thiamine Mononitrate)", strength: "15 mg" },
      { name: "Riboflavin", strength: "17 mg" },
      { name: "Niacin (as Niacinamide)", strength: "200 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Aloe Vera Gel", "limited", "aloe"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Whole Food Base splits to whole rice concentrate Cleared plus aloe as OI Caution. Driver families: Aloe Vera Gel, Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-b-stress other-ingredients: Vegetable Cellulose Capsule, Whole Food Base (Whole Rice Concentrate including Bran, Germ and Polishings, and Aloe Vera Gel), Silica and Magnesium Stearate. Token map: Whole Food Base splits to whole rice concentrate Cleared plus aloe as OI Caution. Exact pack Solaray Vitamin B-Stress (100ct). SKU 076280042153. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280042214",
    productName: "Solaray Vitamin B-Stress AM, Timed-Release (120ct)",
    formulaId: "solaray-b125-076280042214",
    form: "capsule",
    barcode: "076280042214",
    actives: [
      { name: "Vitamin C (as Ascorbic Acid, Rose Hips, Acerola Cherry)", strength: "500 mg" },
      { name: "Thiamine (as Thiamine Mononitrate)", strength: "50 mg" },
      { name: "Riboflavin", strength: "50 mg" },
      { name: "Niacin (as Niacinamide)", strength: "50 mg" },
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Cellulose", "cleared", "mcc"],
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Aloe Vera Gel", "limited", "aloe"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Whole Food Base splits to whole rice concentrate Cleared plus aloe as OI Caution. Driver families: Aloe Vera Gel, Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-b-stress-am-timed-release other-ingredients: Gelatin Capsule, Cellulose, Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ and Aloe Vera Gel), Stearic Acid, Silica and Magnesium Stearate Token map: Whole Food Base splits to whole rice concentrate Cleared plus aloe as OI Caution. Exact pack Solaray Vitamin B-Stress AM, Timed-Release (120ct). SKU 076280042214. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280042429",
    productName: "Solaray Mega Vitamin B-Stress, Timed-Release (240ct)",
    formulaId: "solaray-b125-076280042429",
    form: "capsule",
    barcode: "076280042429",
    actives: [
      { name: "Vitamin C (as Ascorbic Acid from Rose Hips, from Acerola Cherry)", strength: "1,000 mg" },
      { name: "Thiamine (as Thiamine Mononitrate)", strength: "100 mg" },
      { name: "Riboflavin", strength: "100 mg" },
      { name: "Niacin (as Niacinamide)", strength: "100 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Aloe Vera Gel", "limited", "aloe"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Whole Food Base on the 240ct facts image (lb_facts_076280042429) splits to whole rice concentrate Cleared plus aloe as OI Caution. Servings per container 80 x 3 VegCaps = 240ct. Driver families: Aloe Vera Gel, Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mega-vitamin-b-stress-timed-release other-ingredients: Cellulose, Vegetable Cellulose Capsule, Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, Pure Aloe Vera Gel), Stearic Acid, Silica and Magnesium Stearate. Token map: Whole Food Base on the 240ct facts image (lb_facts_076280042429) splits to whole rice concentrate Cleared plus aloe as OI Caution. Servings per container 80 x 3 VegCaps = 240ct. Exact pack Solaray Mega Vitamin B-Stress, Timed-Release (240ct). SKU 076280042429. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280042719",
    productName: "Solaray Vitamin B-Complex 50mg (100ct)",
    formulaId: "solaray-b125-076280042719",
    form: "capsule",
    barcode: "076280042719",
    actives: [
      { name: "Thiamine (as Thiamine Mononitrate)", strength: "50 mg" },
      { name: "Riboflavin", strength: "50 mg" },
      { name: "Niacin (as Niacinamide)", strength: "50 mg" },
      { name: "Vitamin B-6 (as Pyridoxine HCl)", strength: "50 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Aloe Vera Gel", "limited", "aloe"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Whole Food Base (Whole Rice Concentrate and Aloe Vera Gel) splits to whole rice concentrate Cleared plus aloe as OI Caution. Driver families: Aloe Vera Gel, Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-b-complex-50 other-ingredients: Vegetable Cellulose Capsule, Whole Food Base (Whole Rice Concentrate and Aloe Vera Gel), Magnesium Stearate and Silica. Token map: Whole Food Base (Whole Rice Concentrate and Aloe Vera Gel) splits to whole rice concentrate Cleared plus aloe as OI Caution. Exact pack Solaray Vitamin B-Complex 50mg (100ct). SKU 076280042719. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280043037",
    productName: "Solaray Vitamin B-Complex 100 (250ct)",
    formulaId: "solaray-b125-076280043037",
    form: "capsule",
    barcode: "076280043037",
    actives: [
      { name: "Thiamine (as Thiamine Mononitrate)", strength: "100 mg" },
      { name: "Riboflavin", strength: "100 mg" },
      { name: "Niacin (as Niacinamide)", strength: "100 mg" },
      { name: "Vitamin B-6 (as Pyridoxine HCl)", strength: "100 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Aloe Vera Gel", "limited", "aloe"],
      ["Whole Rice Concentrate", "cleared", "riceconc"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Whole Food Base splits to aloe as OI Caution plus whole rice concentrate Cleared. Driver families: Silica, Aloe Vera Gel. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-b-complex-100 other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Silica, and Whole Food Base (Aloe Vera Gel, Whole Rice Concentrate including Bran, Germ, and Polishings). Token map: Whole Food Base splits to aloe as OI Caution plus whole rice concentrate Cleared. Exact pack Solaray Vitamin B-Complex 100 (250ct). SKU 076280043037. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280043259",
    productName: "Solaray Vitamin B-1, 100mg (100ct)",
    formulaId: "solaray-b125-076280043259",
    form: "capsule",
    barcode: "076280043259",
    actives: [
      { name: "Thiamine (as Thiamine Mononitrate)", strength: "100 mg" },
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Organic Rice Extract Blend", "limited", "riceextract"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Whole Food Base is whole rice concentrate only (no aloe) Cleared. Organic Rice Extract Blend stays Limited. Driver families: Organic Rice Extract Blend. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-b-1 other-ingredients: Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ), Vegetable Cellulose Capsule and Organic Rice Extract Blend. Token map: Whole Food Base is whole rice concentrate only (no aloe) Cleared. Organic Rice Extract Blend stays Limited. Exact pack Solaray Vitamin B-1, 100mg (100ct). SKU 076280043259. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280043273",
    productName: "Solaray Vitamin B-2 (Riboflavin) 100mg (100ct)",
    formulaId: "solaray-b125-076280043273",
    form: "capsule",
    barcode: "076280043273",
    actives: [
      { name: "Riboflavin", strength: "100 mg" },
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Aloe Vera Gel", "limited", "aloe"],
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Whole Food Base splits to whole rice concentrate Cleared plus pure aloe vera gel as OI Caution. Driver families: Aloe Vera Gel, Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-b-2 other-ingredients: Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, and Pure Aloe Vera Gel), Vegetable Cellulose Capsule and Silica. Token map: Whole Food Base splits to whole rice concentrate Cleared plus pure aloe vera gel as OI Caution. Exact pack Solaray Vitamin B-2 (Riboflavin) 100mg (100ct). SKU 076280043273. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280043655",
    productName: "Solaray Niacinamide 500mg (100ct)",
    formulaId: "solaray-b125-076280043655",
    form: "capsule",
    barcode: "076280043655",
    actives: [
      { name: "Niacinamide", strength: "500 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Aloe Vera Gel", "limited", "aloe"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Whole Rice Concentrate string including bran, polishings, germ, and aloe vera gel splits to rice concentrate Cleared plus aloe as OI Caution. Driver families: Aloe Vera Gel. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/niacinamide other-ingredients: Vegetable Cellulose Capsule, Whole Rice Concentrate (Including Bran, Polishings, and Germ, and Aloe Vera Gel). Token map: Whole Rice Concentrate string including bran, polishings, germ, and aloe vera gel splits to rice concentrate Cleared plus aloe as OI Caution. Exact pack Solaray Niacinamide 500mg (100ct). SKU 076280043655. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280043815",
    productName: "Solaray Pantothenic Acid 500mg (250ct)",
    formulaId: "solaray-b123-076280043808",
    form: "capsule",
    barcode: "076280043815",
    actives: [
      { name: "Pantothenic Acid (as Calcium d-Pantothenate)", strength: "500 mg" },
      { name: "Calcium (as Calcium d-Pantothenate)", strength: "45 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Rice Extract Blend", "limited", "riceextract"],
      ["Rice Flour", "limited", "ricepowder"],
      ["Aloe Vera Gel", "limited", "aloe"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Aloe Vera Gel = aloe as OI Caution. The discussion sentence after the Other Ingredients line is not an ingredient. Same OI as the 100ct. REUSE formula solaray-b123-076280043808. Driver families: Rice Extract Blend, Rice Flour, Aloe Vera Gel. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/pantothenic-acid other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Rice Extract Blend, Rice Flour, Aloe Vera Gel. Token map: Aloe Vera Gel = aloe as OI Caution. The discussion sentence after the Other Ingredients line is not an ingredient. Same OI as the 100ct. REUSE formula solaray-b123-076280043808. Exact pack Solaray Pantothenic Acid 500mg (250ct). SKU 076280043815. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280044904",
    productName: "Solaray Vitamin C 500mg, Cherry (100ct)",
    formulaId: "solaray-b125-076280044904",
    form: "chewable",
    barcode: "076280044904",
    actives: [
      { name: "Vitamin C (as Ascorbic Acid)", strength: "500 mg" },
    ],
    flags: [
      ["Sorbitol", "limited", "sugaralc"],
      ["Fructose", "limited", "fructose"],
      ["Xylitol", "limited", "sugaralc"],
      ["Cellulose", "cleared", "mcc"],
      ["Natural Cherry Flavor with other Natural Flavors", "limited", "flavor"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Beet Root Juice (for color)", "cleared", "beet"],
      ["Acacia Gum", "cleared", "gum"],
      ["Stevia (leaf extract)", "limited", "stevia"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Rose Hips (fruit)", "cleared", "botanical"],
      ["Calcium Silicate", "limited", "casil"],
      ["Acerola (fruit juice)", "cleared", "acerola"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Rose Hips (fruit) = botanical Cleared. Acerola (fruit juice) = organic acerola Cleared. Panel says chewable tablet. Driver families: Sorbitol, Fructose, Xylitol, Natural Cherry Flavor with other Natural Flavors, Stevia (leaf extract), Silica, Calcium Silicate. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c other-ingredients: Sorbitol, Fructose, Xylitol, Cellulose, Natural Cherry Flavor with  other Natural Flavors, Stearic Acid, Beet Root Juice (for color), Acacia Gum, Stevia (leaf  extract), Magnesium Stearate, Silica, Rose Hips (fruit), Calcium Silicate, Acerola (fruit juice). Token map: Rose Hips (fruit) = botanical Cleared. Acerola (fruit juice) = organic acerola Cleared. Panel says chewable tablet. Exact pack Solaray Vitamin C 500mg, Cherry (100ct). SKU 076280044904. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280045161",
    productName: "Solaray Magnesium Potassium Bromelain (60ct)",
    formulaId: "solaray-b125-076280045161",
    form: "capsule",
    barcode: "076280045161",
    actives: [
      { name: "Magnesium (as Aquamin Marine Magnesium and Magnesium Glycinate)", strength: "300 mg" },
      { name: "Potassium (from Potassium Citrate)", strength: "99 mg" },
      { name: "Bromelain (from Pineapple Stem)", strength: "140 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Arabic Gum", "cleared", "gum"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Cellulose. Aquamin trademark sentence strips to Cellulose = cellulose Cleared. The trademark sentence is not an ingredient. Driver families: Maltodextrin, Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/magnesium-potassium-asporotate other-ingredients: Vegetable Cellulose Capsule, Arabic Gum, Magnesium Stearate, Maltodextrin,  Silica, and Cellulose.  Aquamin® is a registered trademark of Marigot Ltd. of Cork Ireland. Token map: Cellulose. Aquamin trademark sentence strips to Cellulose = cellulose Cleared. The trademark sentence is not an ingredient. Exact pack Solaray Magnesium Potassium Bromelain (60ct). SKU 076280045161. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280045178",
    productName: "Solaray Magnesium Potassium Bromelain (120ct)",
    formulaId: "solaray-b125-076280045161",
    form: "capsule",
    barcode: "076280045178",
    actives: [
      { name: "Magnesium (as Aquamin Marine Magnesium and Magnesium Glycinate)", strength: "300 mg" },
      { name: "Potassium (from Potassium Citrate)", strength: "99 mg" },
      { name: "Bromelain (from Pineapple Stem)", strength: "140 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Arabic Gum", "cleared", "gum"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Same Other Ingredients as the 60ct. REUSE formula solaray-b125-076280045161. Trademark sentence is not an ingredient. Driver families: Maltodextrin, Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/magnesium-potassium-asporotate other-ingredients: Vegetable Cellulose Capsule, Arabic Gum, Magnesium Stearate, Maltodextrin, Silica, and Cellulose. Aquamin® is a registered trademark of Marigot Ltd. of Cork Ireland. Token map: Same Other Ingredients as the 60ct. REUSE formula solaray-b125-076280045161. Trademark sentence is not an ingredient. Exact pack Solaray Magnesium Potassium Bromelain (120ct). SKU 076280045178. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280045963",
    productName: "Solaray Copper Citrate 2mg (60ct)",
    formulaId: "solaray-b125-076280045963",
    form: "capsule",
    barcode: "076280045963",
    actives: [
      { name: "Copper (from Copper Citrate)", strength: "2 mg" },
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Dandelion Root", "cleared", "botanical"],
      ["Watercress Leaf", "cleared", "botanical"],
      ["Horsetail Herb", "cleared", "botanical"],
      ["Yellow Dock Root", "cleared", "botanical"],
      ["Rice Bran Extract", "cleared", "ricebran"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Dandelion Root, Watercress Leaf, Horsetail Herb, and Yellow Dock Root = named plant-part botanical Cleared. Driver families: Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/copper-citrate other-ingredients: Whole Rice Concentrate, Vegetable Cellulose Capsule, Dandelion Root, Watercress Leaf, Horsetail Herb, Yellow Dock Root, Rice Bran Extract and Silica. Token map: Dandelion Root, Watercress Leaf, Horsetail Herb, and Yellow Dock Root = named plant-part botanical Cleared. Exact pack Solaray Copper Citrate 2mg (60ct). SKU 076280045963. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280047721",
    productName: "Solaray Mega-Mineral Multivitamin (120ct)",
    formulaId: "solaray-b125-076280047721",
    form: "capsule",
    barcode: "076280047721",
    actives: [
      { name: "Vitamin A (as Beta Carotene, Retinyl Palmitate)", strength: "7,470 mcg" },
      { name: "Vitamin C (as Ascorbic Acid, Rose Hips, Acerola Cherry)", strength: "300 mg" },
      { name: "Vitamin D (as Cholecalciferol)", strength: "10 mcg" },
      { name: "Vitamin E (as d-Alpha Tocopheryl Succinate)", strength: "130 mg" },
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Eleuthero Root", "limited", "eleuthero"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Silica", "limited", "sio2"],
      ["Carrot Juice", "limited", "carrotjuice"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Carrot Juice = Carrot Juice Powder juice-powder color/flavor Caution. Driver families: Eleuthero Root, Silica, Carrot Juice. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mega-mineral-multi-vitamin other-ingredients: Gelatin Capsule, Eleuthero Root, Cellulose, Magnesium Stearate, Whole Rice  Concentrate (including the Bran, Polishings and Germ), Silica, Carrot Juice. Token map: Carrot Juice = Carrot Juice Powder juice-powder color/flavor Caution. Exact pack Solaray Mega-Mineral Multivitamin (120ct). SKU 076280047721. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280047875",
    productName: "Solaray Baby Me Now Prenatal Multivitamin (150ct)",
    formulaId: "solaray-b125-076280047875",
    form: "tablet",
    barcode: "076280047875",
    actives: [
      { name: "Vitamin A (from Retinyl Palmitate and Beta Carotene)", strength: "3,900 mcg" },
      { name: "Vitamin C (as Calcium Ascorbate, Magnesium Ascorbate, Rose Hips, Acerola Cherry)", strength: "350 mg" },
      { name: "Vitamin D (as Cholecalciferol)", strength: "3.75 mcg" },
      { name: "Vitamin E (as d-Alpha Tocopheryl Succinate)", strength: "100 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Croscarmellose Sodium", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Carrot Juice", "limited", "carrotjuice"],
      ["Acerola Cherry", "cleared", "acerola"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Carrot Juice = Carrot Juice Powder Caution. Acerola Cherry = organic acerola Cleared. Servings per container 30 x 5 tablets = 150ct. Driver families: Carrot Juice. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/baby-me-now-prenatal-multi-vitamin-original-formula other-ingredients: Cellulose, Croscarmellose Sodium, Magnesium Stearate, Carrot Juice and Acerola Cherry. Token map: Carrot Juice = Carrot Juice Powder Caution. Acerola Cherry = organic acerola Cleared. Servings per container 30 x 5 tablets = 150ct. Exact pack Solaray Baby Me Now Prenatal Multivitamin (150ct). SKU 076280047875. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280048605",
    productName: "Solaray L-Lysine 1000mg (90ct)",
    formulaId: "solaray-b125-076280048605",
    form: "tablet",
    barcode: "076280048605",
    actives: [
      { name: "L-Lysine (as L-Lysine HCl)", strength: "1,000 mg" },
      { name: "Vitamin C (as Ascorbic Acid)", strength: "1,000 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Acerola Cherry", "cleared", "acerola"],
      ["Rose Hips", "cleared", "botanical"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Rice Concentrate", "cleared", "riceconc"],
    ],
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Acerola Cherry = organic acerola Cleared. Rose Hips = botanical Cleared. Rice Concentrate = rice concentrate Cleared. Servings per container 30 x 3 tablets = 90ct. No High. No Limited.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-lysine-1000mg other-ingredients: Cellulose, Stearic Acid, Acerola Cherry, Rose Hips, Magnesium Stearate and Rice Concentrate. Token map: Acerola Cherry = organic acerola Cleared. Rose Hips = botanical Cleared. Rice Concentrate = rice concentrate Cleared. Servings per container 30 x 3 tablets = 90ct. Exact pack Solaray L-Lysine 1000mg (90ct). SKU 076280048605. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280081008",
    productName: "Solaray Cool Cayenne Pepper 40,000 Hu (90ct)",
    formulaId: "solaray-b125-076280081008",
    form: "capsule",
    barcode: "076280081008",
    actives: [
      { name: "Cayenne (Capsicum annuum) (pepper)", strength: "600 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Annatto (seed extract)", "limited", "annatto"],
      ["Ginger (root)", "cleared", "botanical"],
      ["Guar Gum", "cleared", "gum"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Ginger (root) = named plant-part botanical Cleared. Servings per container 45 x 2 VegCaps = 90ct. Driver families: Annatto (seed extract). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cool-cayenne-pepper-40-000-hu other-ingredients: Cellulose, Vegetable Cellulose Capsule, Annatto (seed extract), Ginger (root) and Guar Gum. Token map: Ginger (root) = named plant-part botanical Cleared. Servings per container 45 x 2 VegCaps = 90ct. Exact pack Solaray Cool Cayenne Pepper 40,000 Hu (90ct). SKU 076280081008. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280081015",
    productName: "Solaray Cool Cayenne Pepper 40,000 Hu (180ct)",
    formulaId: "solaray-b125-076280081008",
    form: "capsule",
    barcode: "076280081015",
    actives: [
      { name: "Cayenne (Capsicum annuum) (pepper)", strength: "600 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Annatto (seed extract)", "limited", "annatto"],
      ["Ginger (root)", "cleared", "botanical"],
      ["Guar Gum", "cleared", "gum"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Same Other Ingredients as the 90ct. REUSE formula solaray-b125-076280081008. Driver families: Annatto (seed extract). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cool-cayenne-pepper-40-000-hu other-ingredients: Cellulose, Vegetable Cellulose Capsule, Annatto (seed extract), Ginger (root) and Guar Gum. Token map: Same Other Ingredients as the 90ct. REUSE formula solaray-b125-076280081008. Exact pack Solaray Cool Cayenne Pepper 40,000 Hu (180ct). SKU 076280081015. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280081022",
    productName: "Solaray Extra Hot Cool Cayenne Pepper 100,000 Hu (90ct)",
    formulaId: "solaray-b125-076280081022",
    form: "capsule",
    barcode: "076280081022",
    actives: [
      { name: "Cayenne (Capsicum annuum) (fruit)", strength: "600 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Annatto (seed extract)", "limited", "annatto"],
      ["Ginger Root", "cleared", "botanical"],
      ["Guar Gum", "cleared", "gum"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Ginger Root = named plant-part botanical Cleared. Different product URL from the 40,000 Hu formula. Servings per container 45 x 2 VegCaps = 90ct. Driver families: Annatto (seed extract). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/extra-hot-cool-cayenne-pepper-100-000-hu other-ingredients: Cellulose, Vegetable Cellulose Capsule, Annatto (seed extract), Ginger Root and Guar Gum. Token map: Ginger Root = named plant-part botanical Cleared. Different product URL from the 40,000 Hu formula. Servings per container 45 x 2 VegCaps = 90ct. Exact pack Solaray Extra Hot Cool Cayenne Pepper 100,000 Hu (90ct). SKU 076280081022. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280081039",
    productName: "Solaray Cool Cayenne Pepper 40,000 HU (90ct)",
    formulaId: "solaray-b125-076280081039",
    form: "capsule",
    barcode: "076280081039",
    actives: [
      { name: "Cayenne (Capsicum annuum) (pepper)", strength: "320 mg" },
      { name: "Butcher's Broom (Ruscus aculeatus) (root)", strength: "320 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Cellulose", "cleared", "mcc"],
      ["Annatto (seed extract)", "limited", "annatto"],
      ["Ginger Root", "cleared", "botanical"],
      ["Guar Gum", "cleared", "gum"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Ginger Root = named plant-part botanical Cleared. Different product URL from Cool Cayenne 40,000 Hu. Servings per container 45 x 2 VegCaps = 90ct. Driver families: Annatto (seed extract). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cool-cayenne-pepper-40000-hu other-ingredients: Vegetable Cellulose Capsule, Cellulose, Annatto (seed extract), Ginger Root and Guar Gum. Token map: Ginger Root = named plant-part botanical Cleared. Different product URL from Cool Cayenne 40,000 Hu. Servings per container 45 x 2 VegCaps = 90ct. Exact pack Solaray Cool Cayenne Pepper 40,000 HU (90ct). SKU 076280081039. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280081329",
    productName: "Solaray Yeast-Cleanse (90ct)",
    formulaId: "solaray-b125-076280081329",
    form: "capsule",
    barcode: "076280081329",
    actives: [
      { name: "Caprylic Acid (from Calcium Caprylate, Magnesium Caprylate, and Zinc Caprylate)", strength: "2,180 mg" },
      { name: "Calcium (from Calcium Caprylate)", strength: "162 mg" },
      { name: "Vitamin C (as Ascorbic Acid)", strength: "35 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Silica", "limited", "sio2"],
      ["Dong Quai Root", "cleared", "botanical"],
      ["Fennel Seed", "cleared", "botanical"],
      ["Neem Leaf", "cleared", "botanical"],
      ["Glycerin", "cleared", "glycerin"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Dong Quai Root, Fennel Seed, and Neem Leaf = named plant-part botanical Cleared. Servings per container 15 x 6 VegCaps = 90ct. Driver families: Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/yeast-cleanse other-ingredients: Vegetable Cellulose Capsule, Whole Rice Concentrate, Silica, Dong Quai Root, Fennel Seed, Neem Leaf, Glycerin, Magnesium Stearate. Token map: Dong Quai Root, Fennel Seed, and Neem Leaf = named plant-part botanical Cleared. Servings per container 15 x 6 VegCaps = 90ct. Exact pack Solaray Yeast-Cleanse (90ct). SKU 076280081329. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280081381",
    productName: "Solaray Yeast-Cleanse (180ct)",
    formulaId: "solaray-b125-076280081329",
    form: "capsule",
    barcode: "076280081381",
    actives: [
      { name: "Caprylic Acid (from Calcium Caprylate, Magnesium Caprylate, and Zinc Caprylate)", strength: "2,180 mg" },
      { name: "Calcium (from Calcium Caprylate)", strength: "162 mg" },
      { name: "Vitamin C (as Ascorbic Acid)", strength: "35 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Whole Rice Concentrate", "cleared", "riceconc"],
      ["Silica", "limited", "sio2"],
      ["Dong Quai Root", "cleared", "botanical"],
      ["Fennel Seed", "cleared", "botanical"],
      ["Neem Leaf", "cleared", "botanical"],
      ["Glycerin", "cleared", "glycerin"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Same Other Ingredients as the 90ct. REUSE formula solaray-b125-076280081329. Driver families: Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/yeast-cleanse other-ingredients: Vegetable Cellulose Capsule, Whole Rice Concentrate, Silica, Dong Quai Root, Fennel Seed, Neem Leaf, Glycerin, Magnesium Stearate. Token map: Same Other Ingredients as the 90ct. REUSE formula solaray-b125-076280081329. Exact pack Solaray Yeast-Cleanse (180ct). SKU 076280081381. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280083620",
    productName: "Solaray Total Cleanse Colon (60ct)",
    formulaId: "solaray-b125-076280083620",
    form: "capsule",
    barcode: "076280083620",
    actives: [
      { name: "Magnesium (as Magnesium Citrate)", strength: "80 mg" },
      { name: "Total Cleanse Colon Herbal Blend", strength: "825 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Croscarmellose Sodium", "cleared", "mcc"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Citrate", "cleared", "citrate"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Magnesium Citrate = citrate salts Cleared. Driver families: Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/total-cleanse-colon other-ingredients: vegetable Cellulose Capsule, Croscarmellose Sodium, Cellulose, Magnesium Citrate and Silica. Token map: Magnesium Citrate = citrate salts Cleared. Exact pack Solaray Total Cleanse Colon (60ct). SKU 076280083620. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280238396",
    productName: "Solaray Triple Strength Sambuactin (60ct)",
    formulaId: "solaray-b125-076280238396",
    form: "tablet",
    barcode: "076280238396",
    actives: [
      { name: "Black Elderberry (Sambucus nigra) (berry extract)", strength: "1,200 mg" },
      { name: "Vitamin C (as Ascorbic Acid)", strength: "400 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Sodium Crosscarmellose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Bilberry (fruit)", "cleared", "botanical"],
      ["Stevia (leaf)", "limited", "stevia"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Bilberry (fruit) = named plant-part botanical Cleared. Servings per container 30 x 2 tablets = 60ct. Driver families: Maltodextrin, Silica, Stevia (leaf). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/triple-strength-sambuactin other-ingredients: Cellulose, Maltodextrin, Sodium Crosscarmellose, Silica, Magnesium Stearate, Stearic Acid, Bilberry (fruit) and Stevia (leaf). Token map: Bilberry (fruit) = named plant-part botanical Cleared. Servings per container 30 x 2 tablets = 60ct. Exact pack Solaray Triple Strength Sambuactin (60ct). SKU 076280238396. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280375831",
    productName: "Solaray Phytoestrogen (240ct)",
    formulaId: "solaray-b125-076280037586",
    form: "capsule",
    barcode: "076280375831",
    actives: [
      { name: "Non-GMO Soy (Glycine max) (bean extract)", strength: "200 mg" },
      { name: "Wild Yam (Dioscorea villosa) (root)", strength: "200 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Ginger Root", "cleared", "botanical"],
      ["Licorice Root", "cleared", "licorice"],
      ["Saw Palmetto Berry", "cleared", "botanical"],
      ["Pygeum Bark Extract", "cleared", "botanical"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Same Other Ingredients as the 120ct. Facts image lb_facts_076280375831, servings per container 60 x 4 VegCaps = 240ct. REUSE formula solaray-b125-076280037586. Driver families: Maltodextrin. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/phytoestrogen other-ingredients: Vegetable Cellulose Capsule, Maltodextrin, Magnesium Stearate, Ginger Root, Licorice Root, Saw Palmetto Berry and Pygeum Bark Extract. Token map: Same Other Ingredients as the 120ct. Facts image lb_facts_076280375831, servings per container 60 x 4 VegCaps = 240ct. REUSE formula solaray-b125-076280037586. Exact pack Solaray Phytoestrogen (240ct). SKU 076280375831. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280375923",
    productName: "Solaray PhytoEstrogen Plus EFA's (60ct)",
    formulaId: "solaray-b125-076280375923",
    form: "softgel",
    barcode: "076280375923",
    actives: [
      { name: "Non-GMO Soy (Glycine max) (bean extract)", strength: "150 mg" },
      { name: "Wild Yam (Dioscorea villosa) (root)", strength: "200 mg" },
    ],
    flags: [
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Carob", "limited", "carob"],
      ["Lecithin (soy)", "cleared", "lecithin"],
      ["Yellow Beeswax", "cleared", "beeswax"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Gelatin Softgel (Gelatin, Glycerin, Carob) splits to gelatin Cleared, glycerin Cleared, and plain Carob as carob extract Caution. Servings per container 30 x 2 softgels = 60ct. Driver families: Carob. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/phytoestrogen-plus-efas other-ingredients: Gelatin Softgel (Gelatin, Glycerin, Carob), Lecithin (soy) and Yellow Beeswax. Token map: Gelatin Softgel (Gelatin, Glycerin, Carob) splits to gelatin Cleared, glycerin Cleared, and plain Carob as carob extract Caution. Servings per container 30 x 2 softgels = 60ct. Exact pack Solaray PhytoEstrogen Plus EFA's (60ct). SKU 076280375923. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280669671",
    productName: "Solaray Mycrobiome Probiotic Colon Formula, 50bn, 18 Strain Once Daily (30ct)",
    formulaId: "solaray-b125-076280669671",
    form: "capsule",
    barcode: "076280669671",
    actives: [
      { name: "mycrobiome Colon Formula Blend (supplying 50 billion CFU)", strength: "600 mg" },
    ],
    flags: [
      ["Non-GMO Potato Starch", "cleared", "starch"],
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Cellulose", "cleared", "mcc"],
      ["Oat Fiber", "cleared", "oatfiber"],
      ["Gum Arabic", "cleared", "gum"],
      ["Sunflower Lecithin", "cleared", "lecithin"],
      ["Sunflower Oil", "cleared", "oilfill"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Oat Fiber Blend splits to oat fiber Cleared, gum arabic Cleared, sunflower lecithin Cleared, and sunflower oil as non-gummy capsule fill Cleared. Driver families: Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mycrobiome-probiotic-colon-formula-50bn-18-strain-once-daily other-ingredients: Non-GMO Potato Starch, Vegetable Cellulose Capsule, Cellulose, Oat Fiber Blend (Oat Fiber, Gum Arabic, Sunflower Lecithin, Sunflower Oil), Silica. Token map: Oat Fiber Blend splits to oat fiber Cleared, gum arabic Cleared, sunflower lecithin Cleared, and sunflower oil as non-gummy capsule fill Cleared. Exact pack Solaray Mycrobiome Probiotic Colon Formula, 50bn, 18 Strain Once Daily (30ct). SKU 076280669671. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280693034",
    productName: "Solaray Mycrobiome Probiotic Weight Formula, 50 Billion, 18 Strain Once Daily (30ct)",
    formulaId: "solaray-b125-076280693034",
    form: "capsule",
    barcode: "076280693034",
    actives: [
      { name: "mycrobiome Weight Formula Blend (supplying 50 billion CFU)", strength: "600 mg" },
    ],
    flags: [
      ["Non-GMO Potato Starch", "cleared", "starch"],
      ["Vegetable Cellulose Capsule", "cleared", "vegcap"],
      ["Cellulose", "cleared", "mcc"],
      ["Oat Fiber", "cleared", "oatfiber"],
      ["Gum Arabic", "cleared", "gum"],
      ["Sunflower Lecithin", "cleared", "lecithin"],
      ["Sunflower Oil", "cleared", "oilfill"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Same excipient split as the colon formula. Different product. Not a shared formulaId. Driver families: Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mycrobiome-probiotic-weight-formula-50-billion-18-strain-once-daily other-ingredients: Non-GMO Potato Starch, Vegetable Cellulose Capsule, Cellulose, Oat Fiber Blend (Oat Fiber, Gum Arabic, Sunflower Lecithin, Sunflower Oil), Silica. Token map: Same excipient split as the colon formula. Different product. Not a shared formulaId. Exact pack Solaray Mycrobiome Probiotic Weight Formula, 50 Billion, 18 Strain Once Daily (30ct). SKU 076280693034. " + UPC_BLANK,
  },
  {
    id: "solaray-b125-076280975123",
    productName: "Solaray Sugar-Free L-Theanine Chewable, Lemon-Lime Flavor (30ct)",
    formulaId: "solaray-b125-076280975123",
    form: "chewable",
    barcode: "076280975123",
    actives: [
      { name: "L-Theanine", strength: "200 mg" },
      { name: "Vitamin B-6 (as Pyridoxine HCl)", strength: "20 mg" },
    ],
    flags: [
      ["Sorbitol", "limited", "sugaralc"],
      ["Xylitol", "limited", "sugaralc"],
      ["Natural Lemon Lime Flavor and other Natural Flavors", "limited", "flavor"],
      ["Soy", "limited", "soy"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Citric Acid", "cleared", "citric"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Stevia (leaf extract)", "limited", "stevia"],
      ["Malic Acid", "cleared", "malic"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Silica. Contains strips to Silica Limited. The panel prints Contains Allergen: Milk, Soy. Contains is not an ingredient. Soy in the flavor parenthetical is bare soy Limited. Driver families: Sorbitol, Xylitol, Natural Lemon Lime Flavor and other Natural Flavors, Soy, Maltodextrin, Stevia (leaf extract), Silica. No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/solaray-l-theanine-chewable-supplement-200-mg-30-count other-ingredients: Sorbitol, Xylitol, Natural Lemon Lime Flavor and other Natural Flavors (milk, soy), Maltodextrin, Stearic Acid, Citric Acid, Magnesium Stearate, Stevia (leaf extract), Malic Acid and Silica. Token map: Silica. Contains strips to Silica Limited. The panel prints Contains Allergen: Milk, Soy. Contains is not an ingredient. Soy in the flavor parenthetical is bare soy Limited. Exact pack Solaray Sugar-Free L-Theanine Chewable, Lemon-Lime Flavor (30ct). SKU 076280975123. " + UPC_BLANK,
  }
];

export const BATCH125_KYR6B_SOLARAY_LAST_FAMILY_CLOSEOUT: RatingRecord[] = COMPACT.map(expand);

export const BATCH125_SKIPPED_NO_OI: { sku: string; name: string; count: string; why: string }[] = [
  {
    sku: '076280830385',
    name: 'Liposomal Multivitamin Universal',
    count: '60ct',
    why: 'solaray.com variant 076280830385 has an empty barcode and the description has no Other Ingredients line. Every image on that PDP is named 076280640168, including lb_facts_076280640168.png, and was not copied. iHerb search returned 403. Vitacost product search returned 404 and the site search page did not show this SKU. Walmart redirected to /blocked (Robot or human?). Target HTTP 200 was a robot/captcha page. Amazon search returned 503, then a 200 search page that did not show this SKU or an Other Ingredients line. VitaNet and HiLife print an ingredients sentence for 076280640168 and do not print 076280830385. keepbodyhealth prints an ingredients sentence and does not print 076280830385. The Better Health Store returned 403. Best Price Nutrition HTTP 200 names 076280640168 and does not print 076280830385. Fullscript returned 404. The Solaray recall page names 076280830385 and does not print Other Ingredients. Web search synthesis is not OI.',
  },
];

export const BATCH125_SKIPPED_OUT: { sku: string; name: string; why: string }[] = [];

export const BATCH125_HUNT_POUR: { name: string; url: string }[] = [];

export const BATCH125_REFUSED: { sku: string; name: string; count: string; form: string; url: string; oi: string; blockers: string[] }[] = [
  {
    "sku": "076280002102",
    "name": "Hormone Blend SP-1",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/hormone-blend-sp-1",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280002300",
    "name": "Respiration Blend SP-3",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/respiration-blend-sp-3",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280002409",
    "name": "Skin Blend SP-4",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/skin-blend-sp-4",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280002607",
    "name": "Kidney Blend SP-6",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/kidney-blend-sp-6",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280002768",
    "name": "Female Hormone Blend Sp-7c",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/female-hormone-blend-sp-7c",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280002775",
    "name": "Menopause Blend SP-7D",
    "count": "100 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/menopause-blend-sp-7d",
    "oi": "Vegetable Cellulose Capsule, Organic Rice Extract Blend, Calcium Phosphate 3x, Potassium Phosphate 3x, Silica 6x and Silica",
    "blockers": [
      "Calcium Phosphate 3x",
      "Potassium Phosphate 3x",
      "Silica 6x"
    ]
  },
  {
    "sku": "076280002805",
    "name": "Heart Blend SP-8",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/heart-blend-sp-8",
    "oi": "Vegetable Cellulose Capsule, Rice Flour, Calcium Fluoride 6x and Magnesium Phosphate 3x.",
    "blockers": [
      "Calcium Fluoride 6x",
      "Magnesium Phosphate 3x"
    ]
  },
  {
    "sku": "076280008074",
    "name": "Flaxseed Oil 1000mg",
    "count": "140 ct",
    "form": "softgel",
    "url": "https://www.solaray.com/products/flax",
    "oi": "Gelatin (Bovine), Glycerin, Water, Carob, Rosemary Extract, Ascorbic Acid.",
    "blockers": [
      "count conflict: Shopify variant title is 140 ct, but the SKU 076280008074 supplement-facts image is named 240ct and prints 80 servings x 3 softgels"
    ]
  },
  {
    "sku": "076280008401",
    "name": "Cranactin Cranberry Extract 400mg",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/cranactin-cranberry-extract-bacterial-antiadherence-formula-1",
    "oi": "Vegetable Cellulose Capsule, Maltodextrin (from Non-GMO Corn), Tricalcium Phosphate, Magnesium Hydroxide, Rice Bran Extract, Cellulose, Magnesium Oxide, Vegetable Juice Concentrate and Silica.",
    "blockers": [
      "Magnesium Oxide",
      "Vegetable Juice Concentrate"
    ]
  },
  {
    "sku": "076280012101",
    "name": "Dandelion Root 1040mg",
    "count": "100ct",
    "form": "",
    "url": "https://www.solaray.com/products/dandelion-root",
    "oi": "Vegetable Cellulose Capsule, Magensium Stearate, and Rice Extract Blend.",
    "blockers": [
      "Magensium Stearate"
    ]
  },
  {
    "sku": "076280013405",
    "name": "Hawthorn Berry 1050mg",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/hawthorn-berry",
    "oi": "Vegetable Cellulose Capsule and Rice Bran Concentrate.",
    "blockers": [
      "Rice Bran Concentrate"
    ]
  },
  {
    "sku": "076280013412",
    "name": "Hawthorn Berry 1050mg",
    "count": "180ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/hawthorn-berry",
    "oi": "Vegetable Cellulose Capsule and Rice Bran Concentrate.",
    "blockers": [
      "Rice Bran Concentrate"
    ]
  },
  {
    "sku": "076280021158",
    "name": "Circulation Blend SP-11B",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/circulation-blend-sp-11b",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280021400",
    "name": "Nerve Blend SP-14",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/nerve-blend-sp-14",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280021608",
    "name": "Prostate Blend Sp-16",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/prostate-blend-sp-16",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280021707",
    "name": "Sleep Blend Sp-17",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/sleep-blend-sp-17",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280022605",
    "name": "Thyroid Blend SP-31",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/thyroid-blend-sp-26",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280023008",
    "name": "Memory Blend SP-30",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/memory-blend-sp-30",
    "oi": "Vegetable Cellulose Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280030204",
    "name": "Arabinogalactan, Larch Tree Extract 300mg",
    "count": "60ct",
    "form": "",
    "url": "https://www.solaray.com/products/arabinogalactan-larch-tree-extract",
    "oi": "Vegetable Cellulose Capsule, Cassava Flour, Organic Rice Extract Blend and Silica.",
    "blockers": [
      "Cassava Flour"
    ]
  },
  {
    "sku": "076280030693",
    "name": "Asparagus Rhizome Extract 175mg",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/asparagus-rhizome-extract",
    "oi": "Vegetable Cellulose Capsule, Cassava Flour, Organic Rice Extract Blend and Maltodextrin (from Non-GMO Tapioca).",
    "blockers": [
      "Cassava Flour"
    ]
  },
  {
    "sku": "076280034202",
    "name": "Feverfew Leaf Extract 400mg",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/feverfew-leaf-extract",
    "oi": "Vegetable Cellulose Capsule, Maltodextrin (from Non-GMO Corn) and Oraanic Rice Extract Blend.",
    "blockers": [
      "Oraanic Rice Extract Blend"
    ]
  },
  {
    "sku": "076280037692",
    "name": "Pygeum & Saw Palmetto w/CranActin",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/pygeum-saw-palmetto-w-cran",
    "oi": "Vegetable Cellulose Capsule, Pumpkin Seeds, Cellulose, Beet Root, Magnesium Hydroxide, TriCalcium Phosphate, Magnesium Stearate, Glycine, L-Alanine and Glutamic Acid HCl.",
    "blockers": [
      "L-Alanine",
      "Glutamic Acid HCl"
    ]
  },
  {
    "sku": "076280042313",
    "name": "Vitamin B-Stress PM",
    "count": "120ct",
    "form": "",
    "url": "https://www.solaray.com/products/vitamin-b-stress-pm",
    "oi": "Gelatin Capsule, Silica, Magnesium Stearate, Cellulose, Chamomile (flowering tops), Peppermint Leaves, Bioflavonoid Concentrate and Whole Food Base (Whole Rice Concentrate including the bran, germ and polishings and Aloe Vera Gel).",
    "blockers": [
      "Bioflavonoid Concentrate"
    ]
  },
  {
    "sku": "076280042917",
    "name": "Vitamin B-Complex 75, Timed-Release",
    "count": "100 ct",
    "form": "",
    "url": "https://www.solaray.com/products/vitamin-b-complex-timed-release",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, Aloe Vera Gel), Silica, Magnesium Stearate, Stearic Acid and Magnesium Oxide.",
    "blockers": [
      "Magnesium Oxide"
    ]
  },
  {
    "sku": "076280043525",
    "name": "Folic Acid (Vitamin B-9)",
    "count": "",
    "form": "capsule",
    "url": "https://www.solaray.com/products/folic-acid-vitamin-b-9",
    "oi": "Whole Rice Concentrate, Vegetable Cellulose Capsule and Aloe Vera Gel (200x dry concentrate).",
    "blockers": [
      "no pack count or weight on the label opened for this SKU"
    ]
  },
  {
    "sku": "076280043594",
    "name": "Niacin 100mg",
    "count": "",
    "form": "capsule",
    "url": "https://www.solaray.com/products/niacin",
    "oi": "Whole Rice Concentrate (Including Bran, Polishings, and Germ) Vegetable Cellulose Capsule and Aloe Vera Gel.",
    "blockers": [
      "Whole Rice Concentrate (Including Bran, Polishings, and Germ) Vegetable Cellulose Capsule"
    ]
  },
  {
    "sku": "076280043709",
    "name": "Pantothenic Acid",
    "count": "",
    "form": "",
    "url": "https://www.solaray.com/products/pantothenic-acid-1",
    "oi": "Gelatin Capsule, Whole Food Base (Whole Rice Concentrate including the Kernel, Polishings, and Hull, and Aloe Vera Gel) and Magnesium Stearate.",
    "blockers": [
      "no pack count or weight on the label opened for this SKU"
    ]
  },
  {
    "sku": "076280043853",
    "name": "Vitamin C 800mg, Buffered",
    "count": "90 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/vitamin-c-w-rose-hips-buffered",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Whole Food Base (Rose Hips, Acerola Cherry and Bioflavonoid Concentrate).",
    "blockers": [
      "Whole Food Base (Rose Hips, Acerola Cherry and Bioflavonoid Concentrate)"
    ]
  },
  {
    "sku": "076280044607",
    "name": "Super Bio Vitamin C 1000mg",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/super-bio-vitamin-c-buffered-two-stage-timed-release",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Silica, Stearic Acid, Buffering Base (Calcium Carbonate and Magnesium Oxide).",
    "blockers": [
      "Buffering Base (Calcium Carbonate and Magnesium Oxide)"
    ]
  },
  {
    "sku": "076280044614",
    "name": "Super Bio Vitamin C 1000mg",
    "count": "250ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/super-bio-vitamin-c-buffered-two-stage-timed-release",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Silica, Stearic Acid, Buffering Base  (Calcium Carbonate and Magnesium Oxide).  Discussion: Vitamin C is a powerful antioxidant and is intended to support a healthy immune system.t",
    "blockers": [
      "Buffering Base (Calcium Carbonate and Magnesium Oxide)"
    ]
  },
  {
    "sku": "076280044621",
    "name": "Super Bio Vitamin C 1000mg",
    "count": "360ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/super-bio-vitamin-c-buffered-two-stage-timed-release",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Silica, Stearic Acid and Buffering Base (Calcium Carbonate and Magnesium Oxide).",
    "blockers": [
      "Buffering Base (Calcium Carbonate and Magnesium Oxide)"
    ]
  },
  {
    "sku": "076280045109",
    "name": "Mega Multi Mineral",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/multi-mineral",
    "oi": "Gelatin Capsule, Cellulose, Magnesium Stearate, Parsley, Alfalfa Leaf, Horsetail, Watercress, Dandelion Root, Yellow Dock Root and Chamomile.",
    "blockers": [
      "Parsley"
    ]
  },
  {
    "sku": "076280045116",
    "name": "Mega Multi Mineral",
    "count": "200ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/mega-multi-mineral",
    "oi": "Gelatin Capsule, Cellulose, Magnesium Stearate, Parsley, Alfalfa Leaf,  Horsetail, Watercress, Dandelion Root, Yellow Dock Root and Chamomile.",
    "blockers": [
      "Parsley"
    ]
  },
  {
    "sku": "076280045130",
    "name": "Mega Multi Mineral, Iron-Free",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/mega-multi-mineral-iron-free",
    "oi": "Gelatin Capsule, Rice Protein, Citric Acid (from Non-GMO Tapioca),  Cellulose, Magnesium Stearate, Parsley Leaf, Alfalfa Leaf, Horsetail,  Watercress, Dandelion Root, Yellow Dock Root, Chamomile and Kelp.",
    "blockers": [
      "Parsley Leaf",
      "Kelp"
    ]
  },
  {
    "sku": "076280045147",
    "name": "Mega Multi Mineral, Iron-Free",
    "count": "200ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/mega-multi-mineral-iron-free",
    "oi": "Gelatin Capsule, Rice Protein, Citric Acid (from Non-GMO Tapioca), Cellulose, Magnesium Stearate, Parsley Leaf, Alfalfa Leaf, Horsetail, Watercress, Dandelion Root, Yellow Dock Root, Chamomile and Kelp.",
    "blockers": [
      "Parsley Leaf",
      "Kelp"
    ]
  },
  {
    "sku": "076280045239",
    "name": "Calcium & Magnesium Citrate With Vitamin D-2, 1:1",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-magnesium-citrate-with-vitamin-d-2-1-1-ratio",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Parsley Leaf, Watercress, Alfalfa Leaf and Dandelion Root.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280045246",
    "name": "Calcium & Magnesium Citrate, 1:1 Ratio",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-magnesium-citrate-1-1-ratio",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Parsley Leaf, Watercress Leaf, Alfalfa Leaf and Dandelion Root.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280045253",
    "name": "Calcium & Magnesium Citrate",
    "count": "180ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-magnesium-citrate",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Parsley Leaf, Watercress Leaf, Alfalfa Leaf and Dandelion Root.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280045260",
    "name": "Calcium & Magnesium Citrate, With Vitamin D-2, 2:1 Ratio",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-magnesium-citrate-with-vitamin-d-2-2-1-ratio",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate. Parslev Leaf. Alfalfa Leaf. Watercress Leaf and Dandelion Root.",
    "blockers": [
      "Magnesium Stearate. Parslev Leaf. Alfalfa Leaf. Watercress Leaf"
    ]
  },
  {
    "sku": "076280045277",
    "name": "Cal-Mag Citrate w/D-2, 2:1 Ratio",
    "count": "180ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/cal-mag-citrate-w-d-2-2-1-ratio",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Parsley Leaf, Alfalfa Leaf, Watercress Leaf and Dandelion Root.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280045291",
    "name": "Calcium Citrate Supreme, Bone",
    "count": "180ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-citrate-supreme-bone",
    "oi": "Gelatin Capsule, Magnesium Stearate, Whole Rice Concentrate (including Kernel, Polishings, and Hull), Cellulose, Citric Acid, Lysine, Aspartic Acid, Glycine, Alfalfa Leaf, Watercress, Dandelion Root and Parsley Leaf.",
    "blockers": [
      "Lysine",
      "Aspartic Acid",
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280045314",
    "name": "Calcium & Magnesium, AAC 2:1",
    "count": "180ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-magnesium-amino-acid-chelate-2-1-ratio",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Citric Acid (from Non-GMO Tapioca), L-Aspartic Acid, Magnesium Stearate, Whole Rice Concentrate, Rice Protein, Alfalfa Aerial, Dandelion Root, Watercress Leaf and Parsley Aerial.",
    "blockers": [
      "L-Aspartic Acid",
      "Parsley Aerial"
    ]
  },
  {
    "sku": "076280045345",
    "name": "Calcium & Magnesium Amino Acid",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-magnesium-amino-acid",
    "oi": "Gelatin Capsule, Cellulose, Whole Rice Concentrate, Rice Protein, Magnesium Stearate, Silica, Alfalfa Leaf, Watercress Leaf, Dandelion Root and Parsley Herb.",
    "blockers": [
      "Parsley Herb"
    ]
  },
  {
    "sku": "076280045604",
    "name": "Calcium, Magnesium, Zinc",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-magnesium-zinc",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Whole Rice Concentrate (including the Bran, Polishings and Germ), Alfalfa Leaf, Watercress, Dandelion Root and Parsley Leaf.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280045611",
    "name": "Calcium, Magnesium, Zinc",
    "count": "250ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-magnesium-zinc",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Whole Rice Concentrate (including the Bran, Polishings and Germ), Alfalfa leaf, Watercress, Dandelion Root and Parsley Leaf.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280045833",
    "name": "Calcium Citrate With Vitamin D-3 1000mg",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-citrate-with-vitamin-d-3",
    "oi": "Gelatin Capsule, Magnesium Stearate, Watercress Leaf, Dandelion Root and Parsley Leaf.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280045840",
    "name": "Calcium Citrate Chewables - Orange 1000mg",
    "count": "Orange / 60ct",
    "form": "",
    "url": "https://www.solaray.com/products/calcium-citrate-chewables-orange",
    "oi": "Sorbitol, Orange Juice Powder, Cellulose, Citric Acid, Guar Gum, Stearic Acid, Silica, Natural Orange Flavor with other Natural Flavors and Stevia.",
    "blockers": [
      "Orange Juice Powder"
    ]
  },
  {
    "sku": "076280045857",
    "name": "Calcium Citrate 1000mg",
    "count": "120ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-citrate",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Watercress Leaf, Dandelion Root and Parsley Leaf.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280045901",
    "name": "GTF Chromium 200mcg",
    "count": "100ct",
    "form": "",
    "url": "https://www.solaray.com/products/gtf-chromium",
    "oi": "Brewer's Yeast, Vegetable Cellulose Capsule and Magnesium Stearate.",
    "blockers": [
      "Brewer's Yeast"
    ]
  },
  {
    "sku": "076280046007",
    "name": "Iron Asporotate 18mg",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/iron-asporotate",
    "oi": "Yellowdock Root, Parsley Herb, Gelatin Capsule, Whole Rice Concentrate, Magnesium Oxide and Magnesium Stearate.",
    "blockers": [
      "Parsley Herb",
      "Magnesium Oxide"
    ]
  },
  {
    "sku": "076280046205",
    "name": "Magnesium Asporotate 400mg",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/magnesium-asporotate",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Rice Flour and Herb Base (Parsley Leaf, Alfalfa Leaf)",
    "blockers": [
      "Herb Base (Parsley Leaf, Alfalfa Leaf)"
    ]
  },
  {
    "sku": "076280046212",
    "name": "Magnesium Asporotate 400mg",
    "count": "120ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/magnesium-asporotate",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Rice Flour and Herb Base (Parsley Leaf, Organic Alfalfa Leaf).",
    "blockers": [
      "Herb Base (Parsley Leaf, Organic Alfalfa Leaf)"
    ]
  },
  {
    "sku": "076280046304",
    "name": "Magnesium, Amino Acid Chelate 200mg",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/magnesium-amino-acid-chelate",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Organic Alfalfa, Parsley, and Citric Acid.",
    "blockers": [
      "Parsley"
    ]
  },
  {
    "sku": "076280046502",
    "name": "Manganese 50mg",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/manganese",
    "oi": "Whole Food Base (Whole Rice Concentrate including Bran, Germ and Polishings), Vegetable Cellulose Capsule, Magnesium Stearate, Rice Flour, Watercress and Parsley Leaf.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280046601",
    "name": "Potassium Asporotate 99mg",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/potassium-asporotate",
    "oi": "Gelatin Capsule, Herb Base (Parsley Leaf, Chamomile, Watercress) and Magnesium Stearate.",
    "blockers": [
      "Herb Base (Parsley Leaf, Chamomile, Watercress)"
    ]
  },
  {
    "sku": "076280046700",
    "name": "Potassium 99mg",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/potassium-99",
    "oi": "Vegetable Cellulose Capsule, Rice Flour, Citric Acid, Magnesium Stearate, Parsley, Chamomile and Watercress.",
    "blockers": [
      "Parsley"
    ]
  },
  {
    "sku": "076280046809",
    "name": "Selenium 50mcg",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/selenium-50",
    "oi": "Nutritional Yeast, Gelatin Capsule and Magnesium Stearate.",
    "blockers": [
      "Nutritional Yeast"
    ]
  },
  {
    "sku": "076280046908",
    "name": "Selenium 100mcg",
    "count": "100",
    "form": "capsule",
    "url": "https://www.solaray.com/products/selenium-100",
    "oi": "Nutritional Yeast, Vegetable Cellulose Capsule and Silica.",
    "blockers": [
      "Nutritional Yeast"
    ]
  },
  {
    "sku": "076280046953",
    "name": "Selenium 200mcg",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/selenium-200",
    "oi": "Nutritional Yeast, Vegetable Cellulose Capsule and Magnesium Stearate.",
    "blockers": [
      "Nutritional Yeast"
    ]
  },
  {
    "sku": "076280047004",
    "name": "Zinc Asporotate 15mg",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/zinc-asporotate",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Rice Flour, Calcium Silicate, Rice Bran Extract and Magnesium Oxide.",
    "blockers": [
      "Magnesium Oxide"
    ]
  },
  {
    "sku": "076280047813",
    "name": "Spectro Multivitamin",
    "count": "100ct",
    "form": "",
    "url": "https://www.solaray.com/products/spectro-multi-vitamin",
    "oi": "Gelatin Capsule, Eleuthero Root, Magnesium Stearate, Stearic Acid, Cellulose, Maltodextrin, Whole Rice Concentrate, Alfalfa Leaf, Montmorillonite Clay, Rose Hips and Acerola Cherry.",
    "blockers": [
      "Montmorillonite Clay"
    ]
  },
  {
    "sku": "076280047820",
    "name": "Spectro Multivitamin",
    "count": "250ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/spectro-multi-vitamin",
    "oi": "Gelatin Capsule, Eleuthero Root, Magnesium Stearate, Stearic Acid, Cellulose, Maltodextrin, Whole Rice Concentrate, Alfalfa Leaf, Montmorillonite Clay, Rose Hips and Acerola Cherry.",
    "blockers": [
      "Montmorillonite Clay"
    ]
  },
  {
    "sku": "076280047837",
    "name": "Spectro Multivitamin",
    "count": "360ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/spectro-multi-vitamin",
    "oi": "Gelatin Capsule, Eleuthero Root, Magnesium Stearate, Stearic Acid, Cellulose, Maltodextrin, Whole Rice Concentrate, Alfalfa Leaf, Montmorillonite Clay, Rose Hips and Acerola Cherry.",
    "blockers": [
      "Montmorillonite Clay"
    ]
  },
  {
    "sku": "076280047851",
    "name": "Spectro Multivitamin, Iron-Free",
    "count": "250ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/spectro-multi-vitamin-iron-free",
    "oi": "Gelatin Capsule, Eleuthero Root, Magnesium Stearate, Cellulose, Stearic Acid, Maltodextrin, Whole Rice Concentrate, Alfalfa Leaf, Montmorillonite Clay, Rose Hips and Acerola Cherry.",
    "blockers": [
      "Montmorillonite Clay"
    ]
  },
  {
    "sku": "076280047905",
    "name": "Hair Nutrients",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/hair-nutrients",
    "oi": "Vegetable Cellulose Capsule, Rice Flour, Cellulose, Croscarmellose Sodium, Silica, Magnesium Stearate, Alfalfa Leaf, Parsley Leaf and Watercress Leaf.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280051803",
    "name": "Pituitary Caps, Freeze-Dried",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/pituitary-caps-freeze-dried",
    "oi": "Gelatin Capsule and Trace Mineral Complex.",
    "blockers": [
      "Trace Mineral Complex"
    ]
  },
  {
    "sku": "076280081305",
    "name": "Capryl, Caprylic Acid Formula",
    "count": "100ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/capryl-caprylic-acid-formula",
    "oi": "Vegetable Fiber, Vegetable Cellulose Capsule and Magnesium Stearate.",
    "blockers": [
      "Vegetable Fiber"
    ]
  },
  {
    "sku": "076280082074",
    "name": "Ginger Trips",
    "count": "60ct / Ginger Molasses",
    "form": "gummy",
    "url": "https://www.solaray.com/products/ginger-trips",
    "oi": "Molasses, Honey, Cellulose, Stearic Acid, Acacia Gum, Silica and Magnesium Stearate.",
    "blockers": [
      "Molasses"
    ]
  },
  {
    "sku": "076280082524",
    "name": "Oil Of Oregano 150mg",
    "count": "60ct",
    "form": "",
    "url": "https://www.solaray.com/products/oil-of-oregano",
    "oi": "Softgel (Non-GMO Tapioca Starch, Non-GMO Glycerin and Water) and live Oil.",
    "blockers": [
      "live Oil"
    ]
  },
  {
    "sku": "076280083866",
    "name": "Cardio Complete, Cardiovascular",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/cardiocomplete-cardiovascular",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Maltodextrin, Magnesium Carbonate, Magnesium Oxide, Magnesium Stearate, Corn Starch and Silica.",
    "blockers": [
      "Magnesium Carbonate",
      "Magnesium Oxide"
    ]
  },
  {
    "sku": "076280083996",
    "name": "CranActin Cranberry Extract 400mg",
    "count": "30ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/cranactin-cranberry-extract",
    "oi": "Vegetable Cellulose Capsule, Maltodextrin (from Non-GMO Corn), Tricalcium Phosphate, Magnesium Hydroxide, Rice Bran Extract, Cellulose, Magnesium Oxide, Vegetable Juice Concentrate and Silica.",
    "blockers": [
      "Magnesium Oxide",
      "Vegetable Juice Concentrate"
    ]
  },
  {
    "sku": "076280088618",
    "name": "Total Calm, Mood Support",
    "count": "30ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/total-calm-mood-support",
    "oi": "Modified Food and Corn Starch, Vegetable Cellulose Capsule, Cellulose, Silica and Magnesium Stearate.",
    "blockers": [
      "Modified Food"
    ]
  },
  {
    "sku": "076280103489",
    "name": "Resveratrol, Japanese Knotweed 75mg",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/resveratrol-japanese-knotweed",
    "oi": "Cellulose, Vegetable Cellulose Capsule, Organic Rice Extract Blend, Silica and Maltodex- trin (from Non-GMO Corn).",
    "blockers": [
      "Maltodex- trin (from Non-GMO Corn)"
    ]
  },
  {
    "sku": "076280114836",
    "name": "Hyaluronic Acid 60mg",
    "count": "30ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/3x-strength-hyaluronic-acid",
    "oi": "Cellulose, Vegetable Cellulose Capsule, Glycerol Triacetate, Silica and Magnesium Stearate.",
    "blockers": [
      "Glycerol Triacetate"
    ]
  },
  {
    "sku": "076280121094",
    "name": "Biocitrate Potassium 99mg",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/biocitrate-potassium",
    "oi": "Rice Flour, Vegetable Cellulose Capsule, Parsley Leaf, Celery Seed, Dandelion Root, Magnesium Stearate, Watercress Leaf and Oat Straw Stem.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280131758",
    "name": "Cal-Mag Citrate w/D-2, 2:1 Ratio",
    "count": "360ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/cal-mag-citrate-w-d-2-2-1-ratio",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Parsley  Leaf, Alfalfa Leaf, Watercress Leaf and Dandelion Root.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280131765",
    "name": "Calcium Citrate With Vitamin D-3 1000mg",
    "count": "240ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-citrate-with-vitamin-d-3",
    "oi": "Gelatin Capsule, Magnesium Stearate, Watercress Leaf, Dandelion Root and Parsley Leaf. Discussion: Calcium is intended to support healthy bones and teeth. A speical base of herbs has been included for additional nutritive support.*",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280132236",
    "name": "Magnesium Asporotate 400mg",
    "count": "180ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/magnesium-asporotate",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Rice Flour and Herb Base (Parsley Leaf, Organic Alfalfa Leaf).",
    "blockers": [
      "Herb Base (Parsley Leaf, Organic Alfalfa Leaf)"
    ]
  },
  {
    "sku": "076280146714",
    "name": "Immufight Maximum Daily Defense",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/immufight-maximum-daily-defense",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Stearic Acid, Calcium Threonate, Silica and Tapioca Starch.",
    "blockers": [
      "Calcium Threonate"
    ]
  },
  {
    "sku": "076280149074",
    "name": "Vegan Collagen Booster",
    "count": "",
    "form": "powder",
    "url": "https://www.solaray.com/products/vegan-collagen-booster",
    "oi": "Natural Vanilla Flavor with Other Natural Flavors, Sea Salt, Gotu Kola (Centella asiatica) (extract), Steviol Glycoside, Silica, Ginseng (Panax ginseng) (root extract).",
    "blockers": [
      "Sea Salt",
      "Gotu Kola (Centella asiatica) (extract)"
    ]
  },
  {
    "sku": "076280166262",
    "name": "Reacta-C & Bioflavonoids 500mg",
    "count": "180ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/reacta-c-bioflavonoids",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate,  Calcium L-Threonate and Silica.",
    "blockers": [
      "Calcium L-Threonate"
    ]
  },
  {
    "sku": "076280223149",
    "name": "Triple Strength Tart Cherry Fruit Extract",
    "count": "90ct",
    "form": "",
    "url": "https://www.solaray.com/products/triple-strength-tart-cherry-fruit-extract",
    "oi": "Maltodextrin (from Non-GMO Corn), Cellulose, Vegetable Cellulose Capsule. Silica and Oraanic Rice Extract Blend.",
    "blockers": [
      "Oraanic Rice Extract Blend"
    ]
  },
  {
    "sku": "076280228786",
    "name": "Cal-Mag Citrate Vitamin with D-2, 1:3",
    "count": "180ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/cal-mag-citrate-with-d-2-1-3",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Parsley Leaf, Watercress Leaf, Alfalfa Leaf and Dandelion Root.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280229639",
    "name": "ProSorb Turmeric 29x 500mg",
    "count": "30 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/prosorb-turmeric-29x-500mg",
    "oi": "Cellulose, Sunflower Lecithin, Vegetable Capsule, Magnesium Stearate, Silica.",
    "blockers": [
      "Vegetable Capsule"
    ]
  },
  {
    "sku": "076280262025",
    "name": "Spectro Energy Multivitamin",
    "count": "120 ct",
    "form": "",
    "url": "https://www.solaray.com/products/spectro-energy-multi-vitamin",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Silica, Cellulose, Rice Flour and Soy Protein Isolate.",
    "blockers": [
      "Soy Protein Isolate"
    ]
  },
  {
    "sku": "076280278774",
    "name": "Triple Strength Vitamin K-2, Mk-7",
    "count": "30ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/triple-strength-vitamin-k-2-mk-7",
    "oi": "Cellulose, Vegetable Cellulose Capsule, Glycerol Monostearate, Magnesium Stearate, Fermented Defatted Chickpea Flour Extract and Silica.",
    "blockers": [
      "Fermented Defatted Chickpea Flour Extract"
    ]
  },
  {
    "sku": "076280279771",
    "name": "Immufight Immune Response",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/immufight-immune-response",
    "oi": "Cellulose, Vegetable Cellulose Capsule, Stearic Acid, Maltodextrin, Silica, Calcium Threonate and Tapioca Starch.",
    "blockers": [
      "Calcium Threonate"
    ]
  },
  {
    "sku": "076280282467",
    "name": "Activated Broccoli Seed Extract 350mg",
    "count": "30ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/activated-broccoli-seed-extract",
    "oi": "Vegetable Cellulose Capsule and Calcium Ascorbate.",
    "blockers": [
      "Calcium Ascorbate"
    ]
  },
  {
    "sku": "076280321838",
    "name": "Methyl B-12, Mango Peach - 2500mcg",
    "count": "60 ct / Natural Mango Peach",
    "form": "capsule",
    "url": "https://www.solaray.com/products/methyl-b-13",
    "oi": "Xylitol, Cellulose, Natural Mango and Peach Flavors with other Natural Flavors (Soy), Stearic Acid, Maltodextrin, Turmeric Root Extract, Citric Acid (from Non-GMO Tapioca) and Silica.",
    "blockers": [
      "Turmeric Root Extract"
    ]
  },
  {
    "sku": "076280329568",
    "name": "Plant Melatonin",
    "count": "",
    "form": "capsule",
    "url": "https://www.solaray.com/products/plant-melatonin",
    "oi": "Cellulose, Vegetable Cellulose Capsule, Tapioca Dextrin, Stearic Acid, and Silica.  SOMATO® is a trademark of Nutraland USA, Inc.",
    "blockers": [
      "no pack count or weight on the label opened for this SKU"
    ]
  },
  {
    "sku": "076280329575",
    "name": "IbuActin, Comfort Formula",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/ibuactin-comfort-formula",
    "oi": "Maltodextrin, Vegetable Cellulose Capsule, Food Starch, Magnesium Stearate and Silica.",
    "blockers": [
      "Food Starch"
    ]
  },
  {
    "sku": "076280346688",
    "name": "Plant-Sourced GABA",
    "count": "30 ct",
    "form": "",
    "url": "https://www.solaray.com/products/plant-sourced-gaba",
    "oi": "Cellulose, Vegetable Cellulose Capsule, L-Glutamic Acid and Silica. ‘The GABA ingredient is sourced from Fermented Barley.",
    "blockers": [
      "L-Glutamic Acid",
      "Silica. ‘The GABA ingredient is sourced from Fermented Barley"
    ]
  },
  {
    "sku": "076280352740",
    "name": "Akkermansia",
    "count": "30ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/akkermansia",
    "oi": "Resistant Potato Starch, Vegetable Cellulose Capsule, Silica.",
    "blockers": [
      "Resistant Potato Starch"
    ]
  },
  {
    "sku": "076280360448",
    "name": "Her Life Stages Libido",
    "count": "60 ct",
    "form": "",
    "url": "https://www.solaray.com/products/her-life-stages-libido",
    "oi": "Cellulose, Vegetable Capsule, Stearic Acid, and Silica.  KSM-66 Ashwagandha? is a registered trademark of Ixoreal Biomed Inc.",
    "blockers": [
      "Vegetable Capsule"
    ]
  },
  {
    "sku": "076280366693",
    "name": "L-5-hydroxyTryptophan, 5-HTP 50mg",
    "count": "60ct",
    "form": "",
    "url": "https://www.solaray.com/products/l-5-hydroxytryptophan-5-htp",
    "oi": "Cellulose, Vegetable Cellulose Capsule, Alpha Galactosidase and Magnesium Stearate.",
    "blockers": [
      "Alpha Galactosidase"
    ]
  },
  {
    "sku": "076280370201",
    "name": "Immufight Daily Defense",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/immufight-daily-defense",
    "oi": "Cellulose, Vegetable Cellulose Capsule, Stearic Acid, Calcium Threonate, Silica and Tapioca Starch.",
    "blockers": [
      "Calcium Threonate"
    ]
  },
  {
    "sku": "076280375862",
    "name": "PhytoEstrogen, One Daily",
    "count": "30ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/phytoestrogen-one-daily",
    "oi": "Grapefruit Juice Concentrate, Vegetable Cellulose Capsule, Maltodextrin, Cellulose, Pygeum (bark extract), Silica, Magnesium Stearate, African Cherry (berry), Saw Palmetto (berry), Ginger (root), Licorice (root) and Alpha Galactosidase.",
    "blockers": [
      "Grapefruit Juice Concentrate",
      "Alpha Galactosidase"
    ]
  },
  {
    "sku": "076280376814",
    "name": "Pygeum & Saw Palmetto Extracts 420mg",
    "count": "240ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/pygeum-saw-palmetto-extracts-1",
    "oi": "Saw Palmetto Berry Extract, Vegetable Cellulose Capsule, Cellulose, Pumpkin Seed, L-Alanine, Glutamic Acid HCI, and L-Glycine.",
    "blockers": [
      "L-Alanine",
      "Glutamic Acid HCI"
    ]
  },
  {
    "sku": "076280418873",
    "name": "Chromium Picolinate 1000mcg",
    "count": "100ct / Lemon-Raspberry",
    "form": "capsule",
    "url": "https://www.solaray.com/products/chromium-picolinate",
    "oi": "Xylitol, Cellulose, Natural Flavors (Lemon and Raspberry with other Natural Flavors), Magnesium Stearate, FOS Blend (fructooligosaccharides, sprouted mung bean extract), Citric Acid, Silica and Malic Acid.",
    "blockers": [
      "FOS Blend (fructooligosaccharides, sprouted mung bean extract)"
    ]
  },
  {
    "sku": "076280435450",
    "name": "Biotin Lozenge 5000mcg",
    "count": "Tangy Fruit / 60 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/biotin-lozenge-1000mcg-tangy-fruit",
    "oi": "Sorbitol, Xylitol, Natural Peach Flavor with Other Natural Flavors, Stearic Acid, Silica, Orange Juice Powder, Malic Acid and Citric Acid.",
    "blockers": [
      "Orange Juice Powder"
    ]
  },
  {
    "sku": "076280449051",
    "name": "Vitamin C",
    "count": "100ct / Orange",
    "form": "gummy",
    "url": "https://www.solaray.com/products/vitamin-c-buffered",
    "oi": "Fructose, Molasses, Orange Juice Concentrate, Natural Tangerine Flavor with other Natural Flavors, Honey, Silica, Stearic Acid, Maltodextrin, Sodium Citrate  and Cellulose.",
    "blockers": [
      "Molasses",
      "Orange Juice Concentrate"
    ]
  },
  {
    "sku": "076280458350",
    "name": "Calcium Citrate With Vitamin D-3 1000mg",
    "count": "180ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-citrate-with-vitamin-d-3",
    "oi": "Gelatin Capsule, Magnesium Stearate, Watercress Leaf, Dandelion Root and Parsley Leaf.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280458527",
    "name": "Calcium Citrate 1000mg",
    "count": "240ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-citrate",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate,  Watercress Leaf, Dandelion Root and Parsley Leaf.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280461053",
    "name": "Iron 50mg",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/iron",
    "oi": "Herbal Base (Parsley, Rice Flour, Yellow Dock Root), Vegetable Cellulose Capsule and Ascorbyl Palmitate.",
    "blockers": [
      "Herbal Base (Parsley, Rice Flour, Yellow Dock Root)"
    ]
  },
  {
    "sku": "076280463019",
    "name": "Magnesium Citrate 400mg",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/magnesium-citrate",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Arabic  Gum, Watercress Leaf, Dandelion Root, Alfalfa Leaf and Parsley Leaf.  Aquamin® is a registered trademark of Marigot Ltd. of Cork Ireland.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280469363",
    "name": "Her Life Stages Menopause",
    "count": "60 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/her-life-stages-menopause",
    "oi": "Cellulose, Vegetable Capsule, Stearic Acid, Silica.",
    "blockers": [
      "Vegetable Capsule"
    ]
  },
  {
    "sku": "076280474848",
    "name": "Biocitrate Strontium 250mg",
    "count": "60 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/biocitrate-strontium",
    "oi": "Vegetable Cellulose Capsule, Alfalfa Leaf, Parsley Leaf, Magnesium Stearate and Kelp.",
    "blockers": [
      "Parsley Leaf",
      "Kelp"
    ]
  },
  {
    "sku": "076280478556",
    "name": "Spectro Multivitamin, Iron-Free",
    "count": "360ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/spectro-multi-vitamin-iron-free-1",
    "oi": "Gelatin Capsule, Eleuthero Root, Magnesium Stearate, Cellulose, Stearic Acid, Maltodextrin, Whole Rice Concentrate, Alfalfa Leaf, Montmorillonite Clay, Rose Hips and Acerola Cherry.",
    "blockers": [
      "Montmorillonite Clay"
    ]
  },
  {
    "sku": "076280529586",
    "name": "Colostrum+",
    "count": "Unflavored",
    "form": "powder",
    "url": "https://www.solaray.com/products/colostrum",
    "oi": "Acacia Gum and Sea Salt.  Contains: Milk.  Immunell™ is a trademark of Nexira.",
    "blockers": [
      "Sea Salt"
    ]
  },
  {
    "sku": "076280553871",
    "name": "QBC Plex Quercetin & Bromelain",
    "count": "90ct / Orange",
    "form": "gummy",
    "url": "https://www.solaray.com/products/qbc-plex-quercetin-bromelain",
    "oi": "Sorbitol, Xylitol, Orange Juice, Cellulose, Natural Orange Flavor with Other Natural Flavors (soy), Silica, Magnesium Stearate, Maltodextrin, Glycine, Stevia Leaf Extract, Citric Acid (from Non-GMO Cassava) and Malic Acid.",
    "blockers": [
      "Orange Juice"
    ]
  },
  {
    "sku": "076280558272",
    "name": "Once Daily Prenatal Multivitamin",
    "count": "90ct",
    "form": "",
    "url": "https://www.solaray.com/products/once-daily-prenatal-multi-vitamin",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Sodium Alginate, Pea Starch, Tricalcium Phosphate, Magnesium Stearate, Modified Corn Starch, Magnesium Stearate, Aspartic Acid, Citric Acid, Orotic Acid, and Silica. Contains",
    "blockers": [
      "Aspartic Acid",
      "Orotic Acid"
    ]
  },
  {
    "sku": "076280563160",
    "name": "Immufight Respiratory Support",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/immufight-respiratory-support",
    "oi": "Vegetable Cellulose Capsule, Cellulose, Stearic Acid, Maltodextrin, Silica, Calcium Threonate, Acacia Gum and Tapioca Starch.",
    "blockers": [
      "Calcium Threonate"
    ]
  },
  {
    "sku": "076280582505",
    "name": "Colostrum+",
    "count": "Peach Mango",
    "form": "powder",
    "url": "https://www.solaray.com/products/colostrum",
    "oi": "Natural Peach and Mango Flavors with Other Natural Flavors, Citric  Acid, Acacia Gum, and Stevia (leaf extract).  Contains: Milk.  Immunell™ is a trademark of Nexira.",
    "blockers": [
      "no pack count or weight on the label opened for this SKU"
    ]
  },
  {
    "sku": "076280595499",
    "name": "NADH",
    "count": "",
    "form": "capsule",
    "url": "https://www.solaray.com/products/nadh",
    "oi": "Cellulose, Vegetable Cellulose Capsule, Fractionated Palm Oil, Beeswax, Chlorophyllin, Stearic Acid, and Silica. PANMOL?® is a registered trademark of vis vitalis gmbh.",
    "blockers": [
      "Fractionated Palm Oil",
      "Chlorophyllin"
    ]
  },
  {
    "sku": "076280598933",
    "name": "Aged Black Garlic",
    "count": "",
    "form": "capsule",
    "url": "https://www.solaray.com/products/aged-black-garlic",
    "oi": "Vegetable Cellulose Capsule, Acacia Gum, Cellulose, and Silica, Garlzac® is a registered trademark of Olene Life Sciences.",
    "blockers": [
      "no pack count or weight on the label opened for this SKU"
    ]
  },
  {
    "sku": "076280600438",
    "name": "Mushroom Herb Complex",
    "count": "90ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/mushroom-complete-8",
    "oi": "Vegetarian Capsule, Cellulose, Magnesium Stearate and Silica.",
    "blockers": [
      "Vegetarian Capsule"
    ]
  },
  {
    "sku": "076280615470",
    "name": "HMB + Vitamin D3",
    "count": "Lemon Lime, 30 servings",
    "form": "powder",
    "url": "https://www.solaray.com/products/hmb-vitamin-d3",
    "oi": "Citric Acid, Natural Lemon and Lime Flavor with Other Natural Flavors, Sea Salt, Silica, and Steviol Glycoside. myHMB? is a registered trademark of TSI Group Co., Ltd. US Patent #8,815,280 #9,539,224 #9,707,241",
    "blockers": [
      "Sea Salt",
      "Ltd"
    ]
  },
  {
    "sku": "076280646306",
    "name": "Super Bio Vitamin C 1000mg",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/super-bio-vitamin-c-buffered-two-stage-timed-release",
    "oi": "Vegetable Cellulose Capsule, Magnesium Stearate, Silica, Stearic Acid and Buffering Base (Calcium Carbonate and Magnesium Oxide).",
    "blockers": [
      "Buffering Base (Calcium Carbonate and Magnesium Oxide)"
    ]
  },
  {
    "sku": "076280675559",
    "name": "Her Life Stages Postmenopause",
    "count": "60 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/her-life-stages-postmenopause",
    "oi": "Maltodextrin (from Non-GMO Corn), Cellulose, Vegetable Capsule, Stearic Acid, Silica.  Chromax® is a registered trademark of Nutrition 21, LLC. Chromax® is patent protected.  Morosil® is a trademark of BIONAP S.r.l.  Veri-te® is a registered trademark of Lallemand Group.  Affron® and Lepticrosalides® are registered trademarks of Pharmactive Biotech Products, $.L.U.",
    "blockers": [
      "Vegetable Capsule",
      "$"
    ]
  },
  {
    "sku": "076280728507",
    "name": "Liposomal Glutathione",
    "count": "",
    "form": "capsule",
    "url": "https://www.solaray.com/products/liposomal-glutathione",
    "oi": "Cellulose, Vegetable Cellulose Capsule, Sunflower Phospholipids, Stearic Acid, and Silica.",
    "blockers": [
      "Sunflower Phospholipids"
    ]
  },
  {
    "sku": "076280773279",
    "name": "ProSorb Berberine 9x 550mg",
    "count": "30 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/prosorb-berberine-9x",
    "oi": "Cellulose, Pea Protein Isolate, Vegetable Capsule, Sunflower Lecithin, Grape Seed Extract, Stearic Acid, Silica.",
    "blockers": [
      "Vegetable Capsule"
    ]
  },
  {
    "sku": "076280788020",
    "name": "Spermidine",
    "count": "",
    "form": "capsule",
    "url": "https://www.solaray.com/products/spermidine",
    "oi": "Tapioca Dextrin, Cellulose, Vegetable Cellulose Capsule, Citric Acid, and Silica. Miricell™ is a trademark of Nutraland USA, Inc.",
    "blockers": [
      "no pack count or weight on the label opened for this SKU"
    ]
  },
  {
    "sku": "076280814590",
    "name": "D-Mannose with CranActin",
    "count": "226 G",
    "form": "powder",
    "url": "https://www.solaray.com/products/d-mannose-with-cranactin",
    "oi": "Inulin, Organic Natural Lemon, Cranberry and Berry Flavors with Other Natural Flavors, Silica, Acacia Gum, Citric Acid, Malic Acid, Magnesium Hydroxide, Beet (Beta vulgaris) (root), Stevia (Stevia rebaudiana) (leaf extract), and Guar Gum.",
    "blockers": [
      "Cranberry"
    ]
  },
  {
    "sku": "076280824810",
    "name": "CoQ-10, Ubiquinol 100mg",
    "count": "30ct",
    "form": "softgel",
    "url": "https://www.solaray.com/products/coq-10-ubiquinol",
    "oi": "D-Limonene Oil, Gelatin, Glycerin, Purified Water, Caprylic Acid, Capric Acid, Alpha Lipoic Acid and Caramel Liquid.",
    "blockers": [
      "D-Limonene Oil",
      "Caprylic Acid",
      "Capric Acid",
      "Alpha Lipoic Acid",
      "Caramel Liquid"
    ]
  },
  {
    "sku": "076280846638",
    "name": "Reacta-C & Elderberry",
    "count": "120 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/reacta-c-elderberry",
    "oi": "Vegetable Cellulose Capsule, Calcium L-Threonate, Maltodextrin, Maanesium Stearate and Silica.",
    "blockers": [
      "Calcium L-Threonate",
      "Maanesium Stearate"
    ]
  },
  {
    "sku": "076280882896",
    "name": "Liposomal Multivitamin Men's",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/liposomal-multivitamin-mens",
    "oi": "Cellulose, Lipid Blend from Sunflower Oil and Sustainable Palm Oil, Vegetable Cellulose Capsule, Magnesium Stearate, Modified Tapioca Starch, Silica, Sodium Alginate, Pea Starch and Gum rabic.",
    "blockers": [
      "Lipid Blend from Sunflower Oil",
      "Gum rabic"
    ]
  },
  {
    "sku": "076280884500",
    "name": "Calcium & Magnesium Citrate W/ Vitamin D-3, 2:1 Ratio",
    "count": "180ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/calcium-magnesium-citrate-w-vitamin-d-3-2-1-ratio",
    "oi": "Gelatin Capsule, Cellulose, Magnesium Stearate, Parsley Leaf, Alfalfa Leaf, Watercress Leaf and Dandelion Root.",
    "blockers": [
      "Parsley Leaf"
    ]
  },
  {
    "sku": "076280886757",
    "name": "Opti-5 Magnesium",
    "count": "",
    "form": "capsule",
    "url": "https://www.solaray.com/products/opti-5-magnesium",
    "oi": "Vegetable Cellulose Capsule, Arabic Gum, and Cellulose.  Aquamin® is a registered trademark of Marigot Ltd. of Cork Ireland,  GivoMag™ is a trademark of Isaltis.",
    "blockers": [
      "no pack count or weight on the label opened for this SKU"
    ]
  },
  {
    "sku": "076280937145",
    "name": "Nattokinase and Serrapeptase",
    "count": "",
    "form": "capsule",
    "url": "https://www.solaray.com/products/solaray-nattokinase-serrapeptase-supplement-3-000-fu-healthy-circulation-blood-flow-support-30-vegcaps",
    "oi": "Cellulose, Vegetable Cellulose, Silica, Magnesium Stearate, Dextrin and  Enteric Coating.  Contains: Soy",
    "blockers": [
      "no pack count or weight on the label opened for this SKU"
    ]
  },
  {
    "sku": "076280946123",
    "name": "Her Life Stages PMS & Menstrual",
    "count": "24 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/her-life-stages-pms-menstrual",
    "oi": "Cellulose, Vegetable Capsule, Stearic Acid, Silica, Acacia (Gum Arabic), Maltodextrin,  Potato Dextrin.",
    "blockers": [
      "Vegetable Capsule"
    ]
  },
  {
    "sku": "076280953794",
    "name": "Fermented Mushroom Complete 1200mg",
    "count": "60ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/fermented-mushroom-complete",
    "oi": "**Mycelium/Organic Whole Oat Biomass and Vegetable Cellulose Capsule.",
    "blockers": [
      "**Mycelium/Organic Whole Oat Biomass"
    ]
  },
  {
    "sku": "076280955781",
    "name": "Her Life Stages Perimenopause",
    "count": "60 ct",
    "form": "capsule",
    "url": "https://www.solaray.com/products/her-life-stages-perimenopause",
    "oi": "Cellulose, Vegetable Capsule, Dextrin, Stearic Acid, Silica.",
    "blockers": [
      "Vegetable Capsule"
    ]
  }
];

export const BATCH125_LEFTOVER_REAL_TOKENS = [
  "Alpha Galactosidase",
  "Alpha Lipoic Acid",
  "Aspartic Acid",
  "Bioflavonoid Concentrate",
  "BioPerine (Black Pepper Extract)",
  "Brewer's Yeast",
  "Buffering Base (Calcium Carbonate and Magnesium Oxide)",
  "Calcium Ascorbate",
  "Calcium Fluoride 6x",
  "Calcium L-Threonate",
  "Calcium Phosphate 3x",
  "Calcium Threonate",
  "Capric Acid",
  "Caprylic Acid",
  "Caramel Liquid",
  "Cassava Flour",
  "Chlorophyllin",
  "Cranberry",
  "D-Limonene Oil",
  "DIM (Diindolyimethane)",
  "Fermented Defatted Chickpea Flour Extract",
  "Food Starch",
  "FOS Blend (Fructooligosaccharides)",
  "FOS Blend (fructooligosaccharides, sprouted mung bean extract)",
  "Fractionated Palm Oil",
  "Glucono Delta Lactone",
  "Glutamic Acid",
  "Glutamic Acid HCl",
  "Glycerol Triacetate",
  "Gotu Kola (Centella asiatica) (extract)",
  "Grain Alcohol (45-55% by volume)",
  "Grapefruit Juice Concentrate",
  "Herb Base (Parsley Leaf, Alfalfa Leaf)",
  "Herb Base (Parsley Leaf, Chamomile, Watercress)",
  "Herb Base (Parsley Leaf, Organic Alfalfa Leaf)",
  "Herbal Base (Parsley, Rice Flour, Yellow Dock Root)",
  "Iron Pyrophosphate",
  "Kelp",
  "L-Alanine",
  "L-Aspartic Acid",
  "L-Glutamic Acid",
  "Lipid Blend from Sunflower Oil",
  "Lipid Blend from Sunflower Oil and Sustainable Palm Oil",
  "Magnesium Carbonate",
  "Magnesium Oxide",
  "Magnesium Phosphate 3x",
  "Molasses",
  "Montmorillonite Clay",
  "Mycelium/Organic Whole Oat Biomass",
  "Nutritional Yeast",
  "Orange Juice",
  "Orange Juice Concentrate",
  "Orange Juice Powder",
  "Orotic Acid",
  "Parsley",
  "Parsley Aerial",
  "Parsley Herb",
  "Parsley Leaf",
  "Potassium Phosphate 3x",
  "Pumpkin Seed Oil",
  "Resistant Potato Starch",
  "Rice Bran Concentrate",
  "Sea Salt",
  "Silica 6x",
  "Sodium Chloride 6x",
  "Soy Protein Isolate",
  "Sunflower Phospholipids",
  "Trace Mineral Complex",
  "Turmeric Root Extract",
  "Vegetable Capsule",
  "Vegetable Fiber",
  "Vegetable Juice",
  "Vegetable Juice Concentrate",
  "Vegetarian Capsule",
  "Whole Food Base (Rose Hips, Acerola Cherry and Bioflavonoid Concentrate)"
];

const _ROWS = BATCH125_KYR6B_SOLARAY_LAST_FAMILY_CLOSEOUT;
if (_ROWS.length !== 34) throw new Error('batch125 tally drift');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 1) throw new Error('batch125 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 32) throw new Error('batch125 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 1) throw new Error('batch125 Avoid tally drift');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 29) throw new Error('batch125 NEW tally drift');
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 5) throw new Error('batch125 REUSE tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch125 recordStatus');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch125 brand');
{
  const _seenUpc = new Set<string>();
  for (const _r of _ROWS) {
    const _b = _r.barcode ?? '';
    if (!_b) continue;
    if (!/^\d{12}$/.test(_b)) throw new Error('batch125 barcode not GTIN-12 on ' + _r.id);
    const _d = _b.split('').map(Number);
    const _sum = _d.slice(0, 11).reduce((acc, n, i) => acc + n * (i % 2 === 0 ? 3 : 1), 0);
    if ((10 - (_sum % 10)) % 10 !== _d[11]) throw new Error('batch125 barcode check digit ' + _r.id);
    if (_seenUpc.has(_b)) throw new Error('batch125 duplicate barcode ' + _b);
    _seenUpc.add(_b);
  }
}
if (_ROWS.some((r) => r.form === 'liquid')) throw new Error('batch125 must not grade pour bottles');
if (_ROWS.some((r) => !/\(\d/.test(r.productName))) throw new Error('batch125 row missing pack size');
if (BATCH125_SKIPPED_NO_OI.length !== 1) throw new Error('batch125 no_OI');
if (BATCH125_SKIPPED_OUT.length !== 0) throw new Error('batch125 OUT');
if (BATCH125_HUNT_POUR.length !== 0) throw new Error('batch125 hunt');
if (BATCH125_REFUSED.length !== 132) throw new Error('batch125 REFUSED');
if (BATCH125_LEFTOVER_REAL_TOKENS.length !== 75) throw new Error('batch125 leftover');
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients.some((i) => i.riskLevel !== 'cleared'))) throw new Error('batch125 Clean has a flag');
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients.some((i) => i.riskLevel === 'high'))) throw new Error('batch125 Avoid without High');
if (_ROWS.some((r) => r.verdict === 'caution' && !r.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate'))) throw new Error('batch125 Caution without Limited');
if (BATCH125_LEFTOVER_REAL_TOKENS.includes('Parsley Leaf') !== true) throw new Error('parsley must stay leftover');
if (BATCH125_LEFTOVER_REAL_TOKENS.includes('Natural Mango')) throw new Error('natural mango must be mapped');
if (BATCH125_LEFTOVER_REAL_TOKENS.includes('Rice Bran Concentrate') !== true) throw new Error('rice bran concentrate stays');
const _DROPPED = ['Natural Mango','Fenugreek Seeds','Carrageenan','Caramel (coloring)','Ginger Root','Alfalfa Leaf','Acerola Cherry','Dextrin (from Non-GMO Maca)','Magnesium Citrate','Softgel (Gelatin)'];
if (_DROPPED.some((t) => BATCH125_LEFTOVER_REAL_TOKENS.includes(t))) throw new Error('mapped token still leftover');
