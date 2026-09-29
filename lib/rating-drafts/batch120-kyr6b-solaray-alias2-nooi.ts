// DRAFT / not verified / batch 120 KYR6-b Solaray alias pass 2 + no_OI second look.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades.
// Five founder aliases stamped Sept 28, 2026 (aliases only, grades unchanged):
// Annatto Extract → annatto Caution.
// Softgel (Gelatin and Glycerin) → gelatin + glycerin Cleared.
// Softgel (Gelatin, Glycerin and Beeswax) → gelatin + glycerin + beeswax Cleared.
// Lecithin (soy) → soy lecithin Cleared (soy-allergy note still applies).
// Calcium Phosphate → calcium phosphate Cleared.
// Parsley Leaf is not stamped. No OCR junk stamped. No other new aliases.
// batch70–batch119 were not edited. Nothing restored.
// Oil / MCT / essential-oil pour bottles are not graded.
// recordStatus is 'unverified' on every row. UPC stays empty.
//
// TALLY (unverified drafts in THIS file): 46 rows —
// Clean 17 / Caution 22 / Avoid 7.
// NEW 35 / REUSE 11 / SKIPPED no_OI leftover 32 / SKIPPED OUT 0 / REFUSED 54 in this file.
// 295 of the prior 304 refused rows stay refused in batch117 (aliases did not fully unlock them).
// Pass REFUSED = 295 still + 54 newly read = 349.
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

const BRAND = 'Solaray';
const RETAILERS = ['Amazon', 'solaray.com'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  capsuleCellulose:
    'Methodology §5 Cleared (capsule cellulose / labeled veg cap). Vegetable Cellulose Capsule maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  mcc:
    'Methodology §5 Cleared (cellulose-family / powdered cellulose / MCC / croscarmellose sodium). Cellulose maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  gelatin:
    'Methodology §5 Cleared (gelatin). Gelatin Capsule maps to gelatin (Sept 27, 2026). Softgel (Gelatin and Glycerin) and Softgel (Gelatin, Glycerin and Beeswax) split: the gelatin half maps here (Sept 28, 2026). Same Cleared. Not a new grade.',
  glycerin:
    'Methodology §5 Cleared (glycerin / vegetable glycerin). Softgel (Gelatin and Glycerin) and Softgel (Gelatin, Glycerin and Beeswax) split: the glycerin half maps here (Sept 28, 2026). Same Cleared. Not a new grade.',
  water: 'Methodology §5 Cleared (water / purified water).',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid).',
  sio2: 'Methodology §5 Limited (silica / silicon dioxide). Not Avoid.',
  maltodextrin:
    'Methodology §5 Limited (maltodextrin, organic or non-organic). Not Avoid.',
  acacia: 'Methodology §5 Cleared (acacia gum / gum arabic).',
  riceExtract:
    'Methodology §5 Limited (unspecified rice extract). Organic Rice Extract Blend maps here (Sept 27, 2026). Same Limited / Caution. Not a new grade.',
  riceBran:
    'Methodology §5 Cleared (named rice-bran extract). Rice Bran Extract maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  riceConc:
    'Methodology §5 Cleared (rice concentrate / hull-concentrate). Whole Rice Concentrate maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  riceBranOil:
    'Methodology §5 Cleared (rice bran oil as softgel/capsule fill). NOT gummy High.',
  riceFlour: 'Methodology §5 Caution (rice flour). Not Avoid. Not Cleared rice hull.',
  alginate: 'Methodology §5 Cleared (sodium alginate).',
  peaStarch:
    'Methodology §5 Caution (pea starch, Sept 22, 2026 founder restamp). Was Limited. Not Avoid.',
  modStarch: 'Methodology §5 Limited (modified food starch). Not Avoid.',
  calciumPhosphate:
    'Methodology §5 Cleared (dicalcium / tricalcium phosphate). Calcium Phosphate maps here (Sept 28, 2026). Same Cleared. Not a new grade. Not phosphoric acid.',
  mannitol:
    'Methodology §5 Limited (sugar alcohols). Mannitol maps here (Sept 28, 2026). Same Limited. Verdict stays Caution. Not a new grade.',
  annatto:
    'Methodology §5 Caution (annatto). Annatto Extract maps here (Sept 28, 2026). Same Caution. Not a new grade. Not Avoid.',
  tio2:
    'Methodology §5 High (titanium dioxide). Titanium Dioxide maps here (Sept 28, 2026). Same High/Avoid. Not a new grade.',
  lecithinSoy:
    'Methodology §5 Cleared (lecithin / soy lecithin). Lecithin (soy) maps here (Sept 28, 2026). Same Cleared. Not a new grade. Soy-allergy note still applies. Not bare soy.',
  beeswax:
    'Methodology §5 Cleared (beeswax / yellow beeswax). Softgel (Gelatin, Glycerin and Beeswax) splits: beeswax maps here (Sept 28, 2026). Same Cleared. Not synthetic beeswax.',
  oliveFill:
    'Methodology §5 Cleared (pure olive oil as fill). Panel olive oil / extra virgin olive oil as softgel fill sits here. NOT a pour bottle. NOT gummy High. Not a new alias.',
  sunflower:
    'Methodology §5 Cleared (sunflower oil as non-gummy fill). Softgel fill stays Cleared. Gummy sunflower stays High.',
  rosemary:
    'Methodology §5 Limited (Rosemary Extract (A Natural Preservative) oral). Bare Rosemary Extract is this existing row. Same Caution. Not a new alias.',
  citric: 'Methodology §5 Cleared (citric acid).',
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
    alts.push(
      alt(
        'amazon-elements-vitamin-d3-5000-softgels',
        'Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6).',
      ),
    );
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
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. Adults unless the name says kids. No dosing or medical advice. Draft, not verified.`,
    retailers: [...RETAILERS],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  });
}

const NONE_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Panel prints Other Ingredients: None. Confirmed-empty inactives are not missing-OI. No fillers invented.';
const CLEARED_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Every Other Ingredients token is an existing Cleared §5 lock or a Sept 28, 2026 alias onto an existing Cleared family. No High. No Limited.';

const COMPACT: Compact[] = [
  {
    id: "solaray-b120-076280106152",
    productName: "Solaray Lactase (100ct)",
    formulaId: "solaray-b120-076280106152",
    form: "capsule",
    barcode: "076280106152",
    actives: [
      { name: "Lactase Enzyme Concentrate", strength: "40 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Calcium Phosphate", "cleared", "calciumPhosphate"],
      ["Mannitol", "limited", "mannitol"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Mannitol, Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/lactase other-ingredients: Cellulose, Vegetable Cellulose Capsule, Calcium Phosphate, Mannitol, Magnesium Stearate and Silica. Exact pack Solaray Lactase (100ct). SKU 076280106152. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280090109",
    productName: "Solaray Bio CoQ-10 100mg (30ct)",
    formulaId: "solaray-b120-076280090109",
    form: "softgel",
    barcode: "076280090109",
    actives: [
      { name: "Coenzyme Q-10", strength: "100 mg" },
    ],
    flags: [
      ["Rice Bran Oil", "cleared", "riceBranOil"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Purified Water", "cleared", "water"],
      ["Yellow Beeswax", "cleared", "beeswax"],
      ["Annatto Extract", "limited", "annatto"],
      ["Titanium Dioxide", "high", "tio2"],
    ],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Titanium Dioxide (High).",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bio-coq-10 other-ingredients: Rice Bran Oil, Gelatin, Glycerin, Purified Water, Yellow Beeswax, Annatto Extract and Titanium Dioxide. Exact pack Solaray Bio CoQ-10 100mg (30ct). SKU 076280090109. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280090123",
    productName: "Solaray Bio CoQ-10 100mg (60ct)",
    formulaId: "solaray-b120-076280090109",
    form: "softgel",
    barcode: "076280090123",
    actives: [
      { name: "Coenzyme Q-10", strength: "100 mg" },
    ],
    flags: [
      ["Rice Bran Oil", "cleared", "riceBranOil"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Purified Water", "cleared", "water"],
      ["Yellow Beeswax", "cleared", "beeswax"],
      ["Annatto Extract", "limited", "annatto"],
      ["Titanium Dioxide", "high", "tio2"],
    ],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Titanium Dioxide (High).",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bio-coq-10 other-ingredients: Rice Bran Oil, Gelatin, Glycerin, Purified Water, Yellow Beeswax, Annatto Extract and Titanium Dioxide. Exact pack Solaray Bio CoQ-10 100mg (60ct). SKU 076280090123. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280041101",
    productName: "Solaray Food Carotene, Vitamin A As Beta Carotene 500 mcg (100ct)",
    formulaId: "solaray-b120-076280041101",
    form: "softgel",
    barcode: "076280041101",
    actives: [
      { name: "Vitamin A (as natural beta carotene)", strength: "500 mcg" },
    ],
    flags: [
      ["Olive Oil", "cleared", "oliveFill"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Beeswax", "cleared", "beeswax"],
      ["Lecithin (soy)", "cleared", "lecithinSoy"],
      ["Titanium Dioxide", "high", "tio2"],
    ],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Titanium Dioxide (High).",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/food-carotene-vitamin-a-as-beta-carotene-1 other-ingredients: Olive Oil, Softgel (Gelatin, Glycerin and Beeswax), Lecithin (soy) and Titanium Dioxide. Exact pack Solaray Food Carotene, Vitamin A As Beta Carotene 500 mcg (100ct). SKU 076280041101. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing. Soy lecithin needs a soy-allergy note. Not bare soy.",
  },
  {
    id: "solaray-b120-076280041118",
    productName: "Solaray Food Carotene, Vitamin A As Beta Carotene 500 mcg (200ct)",
    formulaId: "solaray-b120-076280041101",
    form: "softgel",
    barcode: "076280041118",
    actives: [
      { name: "Vitamin A (as natural beta carotene)", strength: "500 mcg" },
    ],
    flags: [
      ["Olive Oil", "cleared", "oliveFill"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Beeswax", "cleared", "beeswax"],
      ["Lecithin (soy)", "cleared", "lecithinSoy"],
      ["Titanium Dioxide", "high", "tio2"],
    ],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Titanium Dioxide (High).",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/food-carotene-vitamin-a-as-beta-carotene-1 other-ingredients: Olive Oil, Softgel (Gelatin, Glycerin and Beeswax), Lecithin (soy) and Titanium Dioxide. Exact pack Solaray Food Carotene, Vitamin A As Beta Carotene 500 mcg (200ct). SKU 076280041118. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing. Soy lecithin needs a soy-allergy note. Not bare soy.",
  },
  {
    id: "solaray-b120-076280041200",
    productName: "Solaray Food Carotene, Vitamin A As Beta Carotene 7500mcg (100ct)",
    formulaId: "solaray-b120-076280041200",
    form: "softgel",
    barcode: "076280041200",
    actives: [
      { name: "Vitamin A (as natural beta carotene)", strength: "7,500 mcg" },
    ],
    flags: [
      ["Olive Oil", "cleared", "oliveFill"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Beeswax", "cleared", "beeswax"],
      ["Lecithin (soy)", "cleared", "lecithinSoy"],
      ["Titanium Dioxide", "high", "tio2"],
    ],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Titanium Dioxide (High).",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/food-carotene-vitamin-a-as-beta-carotene-7500-mcg-25000-iu other-ingredients: Olive Oil, Softgel (Gelatin, Glycerin and Beeswax), Lecithin (soy) and Titanium Dioxide. Exact pack Solaray Food Carotene, Vitamin A As Beta Carotene 7500mcg (100ct). SKU 076280041200. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing. Soy lecithin needs a soy-allergy note. Not bare soy.",
  },
  {
    id: "solaray-b120-076280041156",
    productName: "Solaray Food Carotene, Vitamin A As Beta Carotene 7500mcg (50ct)",
    formulaId: "solaray-b120-076280041200",
    form: "softgel",
    barcode: "076280041156",
    actives: [
      { name: "Vitamin A (as natural beta carotene)", strength: "7,500 mcg" },
    ],
    flags: [
      ["Olive Oil", "cleared", "oliveFill"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Beeswax", "cleared", "beeswax"],
      ["Lecithin (soy)", "cleared", "lecithinSoy"],
      ["Titanium Dioxide", "high", "tio2"],
    ],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Titanium Dioxide (High).",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/food-carotene-vitamin-a-as-beta-carotene-7500-mcg-25000-iu other-ingredients: Olive Oil, Softgel (Gelatin, Glycerin and Beeswax), Lecithin (soy) and Titanium Dioxide. Exact pack Solaray Food Carotene, Vitamin A As Beta Carotene 7500mcg (50ct). SKU 076280041156. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing. Soy lecithin needs a soy-allergy note. Not bare soy.",
  },
  {
    id: "solaray-b120-076280041217",
    productName: "Solaray Food Carotene, Vitamin A As Beta Carotene 7500mcg (200ct)",
    formulaId: "solaray-b120-076280041200",
    form: "softgel",
    barcode: "076280041217",
    actives: [
      { name: "Vitamin A (as natural beta carotene)", strength: "7,500 mcg" },
    ],
    flags: [
      ["Olive Oil", "cleared", "oliveFill"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Beeswax", "cleared", "beeswax"],
      ["Lecithin (soy)", "cleared", "lecithinSoy"],
      ["Titanium Dioxide", "high", "tio2"],
    ],
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Driver is Titanium Dioxide (High).",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/food-carotene-vitamin-a-as-beta-carotene-7500-mcg-25000-iu other-ingredients: Olive Oil, Softgel (Gelatin, Glycerin and Beeswax), Lecithin (soy) and Titanium Dioxide. Exact pack Solaray Food Carotene, Vitamin A As Beta Carotene 7500mcg (200ct). SKU 076280041217. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing. Soy lecithin needs a soy-allergy note. Not bare soy.",
  },
  {
    id: "solaray-b120-076280613575",
    productName: "Solaray Vit E Tocotrienols, Annatto 50mg (60ct)",
    formulaId: "solaray-b120-076280613575",
    form: "softgel",
    barcode: "076280613575",
    actives: [
      { name: "Tocotrienols (from annatto)", strength: "50 mg" },
    ],
    flags: [
      ["Rice Bran Oil", "cleared", "riceBranOil"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Water", "cleared", "water"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vit-e-tocotrienols-annatto other-ingredients: Rice Bran Oil, Softgel (Gelatin and Glycerin) and Water. Exact pack Solaray Vit E Tocotrienols, Annatto 50mg (60ct). SKU 076280613575. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280320640",
    productName: "Solaray Sunflower Vitamin E 268mg (60ct)",
    formulaId: "solaray-b120-076280320640",
    form: "softgel",
    barcode: "076280320640",
    actives: [
      { name: "Vitamin E (as d-alpha tocopherol from sunflower oil)", strength: "268 mg" },
    ],
    flags: [
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Water", "cleared", "water"],
      ["Rosemary Extract", "limited", "rosemary"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rosemary Extract (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/super-bio-vit-e-from-sunflower other-ingredients: Softgel (Gelatin and Glycerin), Water and Rosemary Extract. Exact pack Solaray Sunflower Vitamin E 268mg (60ct). SKU 076280320640. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280042047",
    productName: "Solaray Vitamin E, D-Alpha Tocopherol 670mg (60ct)",
    formulaId: "solaray-b120-076280042047",
    form: "softgel",
    barcode: "076280042047",
    actives: [
      { name: "Vitamin E (as d-alpha tocopherol)", strength: "670 mg" },
    ],
    flags: [
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-e-d-alpha-tocopherol-670-mg-1000-iu other-ingredients: Softgel (Gelatin and Glycerin). Exact pack Solaray Vitamin E, D-Alpha Tocopherol 670mg (60ct). SKU 076280042047. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280041262",
    productName: "Solaray Lycopene 10mg (60 ct)",
    formulaId: "solaray-b120-076280041262",
    form: "softgel",
    barcode: "076280041262",
    actives: [
      { name: "Lycopene", strength: "10 mg" },
    ],
    flags: [
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Sunflower Oil", "cleared", "sunflower"],
      ["Beeswax", "cleared", "beeswax"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/lycopene other-ingredients: Softgel (Gelatin and Glycerin), Sunflower Oil and Beeswax. Exact pack Solaray Lycopene 10mg (60 ct). SKU 076280041262. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280413496",
    productName: "Solaray Oregano Oil 70% Carvacrol, 57mg (60 ct)",
    formulaId: "solaray-b120-076280413496",
    form: "softgel",
    barcode: "076280413496",
    actives: [
      { name: "Oregano Oil (aerial extract)", strength: "57 mg" },
    ],
    flags: [
      ["Extra Virgin Olive Oil", "cleared", "oliveFill"],
      ["Gelatin", "cleared", "gelatin"],
      ["Glycerin", "cleared", "glycerin"],
      ["Purified Water", "cleared", "water"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/oregano-oil-70-carvacrol other-ingredients: Extra Virgin Olive Oil, Softgel (Gelatin and Glycerin) and Purified Water. Exact pack Solaray Oregano Oil 70% Carvacrol, 57mg (60 ct). SKU 076280413496. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280043563",
    productName: "Solaray Inositol Powder 700mg (4oz)",
    formulaId: "solaray-b120-076280043563",
    form: "powder",
    barcode: "076280043563",
    actives: [
      { name: "Inositol", strength: "700 mg" },
    ],
    flags: [
    ],
    verdict: "clean",
    note: NONE_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/inositol other-ingredients: None. Exact pack Solaray Inositol Powder 700mg (4oz). SKU 076280043563. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280043907",
    productName: "Solaray Vitamin C with Rose Hips & Acerola 500mg (100ct)",
    formulaId: "solaray-b120-076280043907",
    form: "capsule",
    barcode: "076280043907",
    actives: [
      { name: "Vitamin C with Rose Hips and Acerola", strength: "500 mg" },
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vit-c-with-rose-hips-acerola other-ingredients: Gelatin Capsule and Magnesium Stearate. Exact pack Solaray Vitamin C with Rose Hips & Acerola 500mg (100ct). SKU 076280043907. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280043945",
    productName: "Solaray Vitamin C & Echinacea (120ct)",
    formulaId: "solaray-b120-076280043945",
    form: "capsule",
    barcode: "076280043945",
    actives: [
      { name: "Vitamin C and Echinacea", strength: "label serving" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-echinacea-root other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Vitamin C & Echinacea (120ct). SKU 076280043945. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280044218",
    productName: "Solaray Vitamin C With Bioflavonoid Complex 500mg (250ct)",
    formulaId: "solaray-b120-076280044218",
    form: "capsule",
    barcode: "076280044218",
    actives: [
      { name: "Vitamin C with Bioflavonoid Complex", strength: "500 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Acacia", "cleared", "acacia"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-with-bioflavonoid-complex-buffered other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Acacia. Exact pack Solaray Vitamin C With Bioflavonoid Complex 500mg (250ct). SKU 076280044218. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280044331",
    productName: "Solaray Vitamin C & Bioflavonoids 1:1 500mg (250ct)",
    formulaId: "solaray-b120-076280044331",
    form: "capsule",
    barcode: "076280044331",
    actives: [
      { name: "Vitamin C and Bioflavonoids 1:1", strength: "500 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-bioflavonoids-1-1 other-ingredients: Vegetable Cellulose Capsule, Cellulose and Magnesium Stearate. Exact pack Solaray Vitamin C & Bioflavonoids 1:1 500mg (250ct). SKU 076280044331. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280045222",
    productName: "Solaray Calcium & Magnesium Asporotate (240ct)",
    formulaId: "solaray-b120-076280045222",
    form: "capsule",
    barcode: "076280045222",
    actives: [
      { name: "Calcium and Magnesium Asporotate", strength: "label serving" },
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/calcium-magnesium-asporotate other-ingredients: Gelatin Capsule, Cellulose and Magnesium Stearate. Exact pack Solaray Calcium & Magnesium Asporotate (240ct). SKU 076280045222. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280045888",
    productName: "Solaray Chromium Picolinate 200mcg (50 ct)",
    formulaId: "solaray-b120-076280045888",
    form: "capsule",
    actives: [
      { name: "Chromium (as chromium picolinate)", strength: "200 mcg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Croscarmellose Sodium", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/chromium-picolinate-200mcg other-ingredients: Cellulose, Stearic Acid, Croscarmellose Sodium and Magnesium Stearate. Exact pack Solaray Chromium Picolinate 200mcg (50 ct). SKU 076280045888. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280045895",
    productName: "Solaray Chromium Picolinate 200mcg (100 ct)",
    formulaId: "solaray-b120-076280045888",
    form: "capsule",
    actives: [
      { name: "Chromium (as chromium picolinate)", strength: "200 mcg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Croscarmellose Sodium", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/chromium-picolinate-200mcg other-ingredients: Cellulose, Stearic Acid, Croscarmellose Sodium and Magnesium Stearate. Exact pack Solaray Chromium Picolinate 200mcg (100 ct). SKU 076280045895. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280013658",
    productName: "Solaray Kelp Seaweed 550mg (100ct)",
    formulaId: "solaray-b120-076280013658",
    form: "capsule",
    barcode: "076280013658",
    actives: [
      { name: "Kelp Seaweed", strength: "550 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Cellulose", "cleared", "mcc"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/kelp-seaweed other-ingredients: Vegetable Cellulose Capsule, Rice Bran Extract and Cellulose. Exact pack Solaray Kelp Seaweed 550mg (100ct). SKU 076280013658. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280049923",
    productName: "Solaray L-Theanine 200mg (45ct)",
    formulaId: "solaray-b120-076280049923",
    form: "capsule",
    barcode: "076280049923",
    actives: [
      { name: "L-Theanine", strength: "200 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Cellulose", "cleared", "mcc"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-theanine other-ingredients: Vegetable Cellulose Capsule, Rice Bran Extract and Cellulose. Exact pack Solaray L-Theanine 200mg (45ct). SKU 076280049923. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280129281",
    productName: "Solaray Turmeric Root Extract 300mg (120ct)",
    formulaId: "solaray-b120-076280129281",
    form: "capsule",
    barcode: "076280129281",
    actives: [
      { name: "Turmeric Root Extract", strength: "300 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/turmeric-root-extract other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Turmeric Root Extract 300mg (120ct). SKU 076280129281. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280366594",
    productName: "Solaray Horse Chestnut Seed Extract 400mg (120ct)",
    formulaId: "solaray-b120-076280366594",
    form: "capsule",
    barcode: "076280366594",
    actives: [
      { name: "Horse Chestnut Seed Extract", strength: "400 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/horse-chestnut-seed-extract other-ingredients: Vegetable Cellulose Capsule, Rice Bran Extract. Exact pack Solaray Horse Chestnut Seed Extract 400mg (120ct). SKU 076280366594. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280366679",
    productName: "Solaray L-5-HTP with Vitamin B-6 & C, 100mg (30ct)",
    formulaId: "solaray-b120-076280366679",
    form: "capsule",
    barcode: "076280366679",
    actives: [
      { name: "L-5-HTP with Vitamin B-6 and C", strength: "100 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-5-htp-with-vitamin-b-6-c other-ingredients: Vegetable Cellulose Capsule, Cellulose and Magnesium Stearate. Exact pack Solaray L-5-HTP with Vitamin B-6 & C, 100mg (30ct). SKU 076280366679. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280008524",
    productName: "Solaray MSM & Glucosamine (90ct)",
    formulaId: "solaray-b120-076280008524",
    form: "capsule",
    barcode: "076280008524",
    actives: [
      { name: "MSM and Glucosamine", strength: "label serving" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/msm-glucosamine other-ingredients: Vegetable Cellulose Capsule, Silica, Magnesium Stearate and Cellulose. Exact pack Solaray MSM & Glucosamine (90ct). SKU 076280008524. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280031010",
    productName: "Solaray Bilberry Extract 42mg (120ct)",
    formulaId: "solaray-b117-076280031003",
    form: "capsule",
    barcode: "076280031010",
    actives: [
      { name: "Bilberry Extract", strength: "42 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bilberry-berry-extract other-ingredients: Cellulose, Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Bilberry Extract 42mg (120ct). SKU 076280031010. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing. Count sibling of Solaray Bilberry Extract 42mg (60ct) already on MAIN. Same Other Ingredients.",
  },
  {
    id: "solaray-b120-076280044416",
    productName: "Solaray Vitamin C with Rose Hips, Acerola & Bioflavonoids 1000mg (250ct)",
    formulaId: "solaray-b120-076280044416",
    form: "capsule",
    barcode: "076280044416",
    actives: [
      { name: "Vitamin C with Rose Hips, Acerola and Bioflavonoids", strength: "1,000 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-with-rose-hips-acerola-bioflavonoids other-ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend. Exact pack Solaray Vitamin C with Rose Hips, Acerola & Bioflavonoids 1000mg (250ct). SKU 076280044416. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280085211",
    productName: "Solaray Grapefruit Seed Extract With Zinc, Betaglucan & Astragalus (60ct)",
    formulaId: "solaray-b120-076280085211",
    form: "capsule",
    barcode: "076280085211",
    actives: [
      { name: "Grapefruit Seed Extract with Zinc, Betaglucan and Astragalus", strength: "label serving" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Glycerin", "cleared", "glycerin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/grapefruit-seed-extract-immunity-formula other-ingredients: Vegetable Cellulose Capsule, Glycerin, Magnesium Stearate, Silica and Cellulose. Exact pack Solaray Grapefruit Seed Extract With Zinc, Betaglucan & Astragalus (60ct). SKU 076280085211. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280375909",
    productName: "Solaray Pomegranate Fruit Extract 200mg (60ct)",
    formulaId: "solaray-b120-076280375909",
    form: "capsule",
    barcode: "076280375909",
    actives: [
      { name: "Pomegranate Fruit Extract", strength: "200 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/pomegranate-fruit-extract other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Whole Rice Concentrate and Silica. Exact pack Solaray Pomegranate Fruit Extract 200mg (60ct). SKU 076280375909. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280512847",
    productName: "Solaray Fulvic Minerals 100mg (30ct)",
    formulaId: "solaray-b120-076280512847",
    form: "capsule",
    barcode: "076280512847",
    actives: [
      { name: "Fulvic Minerals", strength: "100 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/fulvic-minerals other-ingredients: Cellulose, Vegetable Cellulose Capsule, Magnesium Stearate and Silica. Exact pack Solaray Fulvic Minerals 100mg (30ct). SKU 076280512847. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280613605",
    productName: "Solaray BriteSide Mood Support Formula (90 ct)",
    formulaId: "solaray-b120-076280613605",
    form: "capsule",
    barcode: "076280613605",
    actives: [
      { name: "BriteSide Mood Support Formula", strength: "label serving" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/briteside-mood-support-formula other-ingredients: Cellulose, Vegetable Cellulose Capsule, Maltodextrin, Magnesium Stearate and Silica. Exact pack Solaray BriteSide Mood Support Formula (90 ct). SKU 076280613605. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280832167",
    productName: "Solaray Lutein Eyes 18, Triple Strength (60ct)",
    formulaId: "solaray-b120-076280832167",
    form: "capsule",
    barcode: "076280832167",
    actives: [
      { name: "Lutein Eyes 18, Triple Strength", strength: "label serving" },
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Stearic Acid", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/lutein-eyes-18-triple-strength other-ingredients: Maltodextrin, Vegetable Cellulose Capsule and Stearic Acid. Exact pack Solaray Lutein Eyes 18, Triple Strength (60ct). SKU 076280832167. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280832174",
    productName: "Solaray Lutein Eyes 24, Advanced 24mg (30ct)",
    formulaId: "solaray-b120-076280832174",
    form: "capsule",
    barcode: "076280832174",
    actives: [
      { name: "Lutein Eyes 24", strength: "24 mg" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Acacia", "cleared", "acacia"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/lutein-eyes-24-advanced other-ingredients: Cellulose, Vegetable Cellulose Capsule, Acacia, Magnesium Stearate and Silica. Exact pack Solaray Lutein Eyes 24, Advanced 24mg (30ct). SKU 076280832174. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280473049",
    productName: "Solaray Once Daily High Energy Multivitamin, Iron-Free (30ct)",
    formulaId: "solaray-b120-076280473049",
    form: "capsule",
    barcode: "076280473049",
    actives: [
      { name: "Once Daily High Energy Multivitamin, Iron-Free", strength: "label serving" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Lecithin (soy)", "cleared", "lecithinSoy"],
      ["Acacia Gum", "cleared", "acacia"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/once-daily-high-energy-multi-vitamin-iron-free other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Silica, Lecithin (soy) and Acacia Gum. Exact pack Solaray Once Daily High Energy Multivitamin, Iron-Free (30ct). SKU 076280473049. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing. Soy lecithin needs a soy-allergy note. Not bare soy.",
  },
  {
    id: "solaray-b120-076280473056",
    productName: "Solaray Once Daily High Energy Multivitamin, Iron-Free (60ct)",
    formulaId: "solaray-b120-076280473049",
    form: "capsule",
    barcode: "076280473056",
    actives: [
      { name: "Once Daily High Energy Multivitamin, Iron-Free", strength: "label serving" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Lecithin (soy)", "cleared", "lecithinSoy"],
      ["Acacia Gum", "cleared", "acacia"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/once-daily-high-energy-multi-vitamin-iron-free other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Silica, Lecithin (soy) and Acacia Gum. Exact pack Solaray Once Daily High Energy Multivitamin, Iron-Free (60ct). SKU 076280473056. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing. Soy lecithin needs a soy-allergy note. Not bare soy.",
  },
  {
    id: "solaray-b120-076280473063",
    productName: "Solaray Once Daily High Energy Multivitamin, Iron-Free (90ct)",
    formulaId: "solaray-b120-076280473049",
    form: "capsule",
    barcode: "076280473063",
    actives: [
      { name: "Once Daily High Energy Multivitamin, Iron-Free", strength: "label serving" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Lecithin (soy)", "cleared", "lecithinSoy"],
      ["Acacia Gum", "cleared", "acacia"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/once-daily-high-energy-multi-vitamin-iron-free other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Silica, Lecithin (soy) and Acacia Gum. Exact pack Solaray Once Daily High Energy Multivitamin, Iron-Free (90ct). SKU 076280473063. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing. Soy lecithin needs a soy-allergy note. Not bare soy.",
  },
  {
    id: "solaray-b120-076280472950",
    productName: "Solaray Once Daily High Energy Multi (30ct)",
    formulaId: "solaray-b120-076280472950",
    form: "capsule",
    barcode: "076280472950",
    actives: [
      { name: "Once Daily High Energy Multi", strength: "label serving" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Sodium Alginate", "cleared", "alginate"],
      ["Pea Starch", "limited", "peaStarch"],
      ["Modified Food Starch", "limited", "modStarch"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Acacia Gum", "cleared", "acacia"],
      ["Stearic Acid", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Pea Starch, Modified Food Starch, Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/once-daily-high-energy-multi other-ingredients: Vegetable Cellulose Capsule, Sodium Alginate, Pea Starch, Modified Food Starch, Magnesium Stearate, Silica, Acacia Gum, Stearic Acid. Exact pack Solaray Once Daily High Energy Multi (30ct). SKU 076280472950. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280047301",
    productName: "Solaray Once Daily High Energy Multi (60ct)",
    formulaId: "solaray-b120-076280472950",
    form: "capsule",
    barcode: "076280047301",
    actives: [
      { name: "Once Daily High Energy Multi", strength: "label serving" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Sodium Alginate", "cleared", "alginate"],
      ["Pea Starch", "limited", "peaStarch"],
      ["Modified Food Starch", "limited", "modStarch"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Acacia Gum", "cleared", "acacia"],
      ["Stearic Acid", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Pea Starch, Modified Food Starch, Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/once-daily-high-energy-multi other-ingredients: Vegetable Cellulose Capsule, Sodium Alginate, Pea Starch, Modified Food Starch, Magnesium Stearate, Silica, Acacia Gum, Stearic Acid. Exact pack Solaray Once Daily High Energy Multi (60ct). SKU 076280047301. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280047318",
    productName: "Solaray Once Daily High Energy Multi (120ct)",
    formulaId: "solaray-b120-076280472950",
    form: "capsule",
    barcode: "076280047318",
    actives: [
      { name: "Once Daily High Energy Multi", strength: "label serving" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Sodium Alginate", "cleared", "alginate"],
      ["Pea Starch", "limited", "peaStarch"],
      ["Modified Food Starch", "limited", "modStarch"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Acacia Gum", "cleared", "acacia"],
      ["Stearic Acid", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Pea Starch, Modified Food Starch, Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/once-daily-high-energy-multi other-ingredients: Vegetable Cellulose Capsule, Sodium Alginate, Pea Starch, Modified Food Starch, Magnesium Stearate, Silica, Acacia Gum, Stearic Acid. Exact pack Solaray Once Daily High Energy Multi (120ct). SKU 076280047318. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280473124",
    productName: "Solaray Once Daily High Energy Multi (180ct)",
    formulaId: "solaray-b120-076280472950",
    form: "capsule",
    barcode: "076280473124",
    actives: [
      { name: "Once Daily High Energy Multi", strength: "label serving" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Sodium Alginate", "cleared", "alginate"],
      ["Pea Starch", "limited", "peaStarch"],
      ["Modified Food Starch", "limited", "modStarch"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Acacia Gum", "cleared", "acacia"],
      ["Stearic Acid", "cleared", "stearate"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Pea Starch, Modified Food Starch, Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/once-daily-high-energy-multi other-ingredients: Vegetable Cellulose Capsule, Sodium Alginate, Pea Starch, Modified Food Starch, Magnesium Stearate, Silica, Acacia Gum, Stearic Acid. Exact pack Solaray Once Daily High Energy Multi (180ct). SKU 076280473124. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280031157",
    productName: "Solaray Bilberry & Lutein, One Daily (30 ct)",
    formulaId: "solaray-b120-076280031157",
    form: "capsule",
    barcode: "076280031157",
    actives: [
      { name: "Bilberry and Lutein, One Daily", strength: "label serving" },
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Gum Arabic", "cleared", "acacia"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Water", "cleared", "water"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bilberry-lutein-one-daily other-ingredients: Cellulose, Vegetable Cellulose Capsule, Gum Arabic, Magnesium Stearate, Water and Silica. Exact pack Solaray Bilberry & Lutein, One Daily (30 ct). SKU 076280031157. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280404562",
    productName: "Solaray Olive Leaf Extract 22%, 250mg (60ct)",
    formulaId: "solaray-b120-076280404562",
    form: "capsule",
    barcode: "076280404562",
    actives: [
      { name: "Olive Leaf Extract 22%", strength: "250 mg" },
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Organic Rice Extract Blend, Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/olive-leaf-extract-22 other-ingredients: Whole Rice Concentrate, Vegetable Cellulose Capsule, Maltodextrin, Organic Rice Extract Blend, and Silica. Exact pack Solaray Olive Leaf Extract 22%, 250mg (60ct). SKU 076280404562. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280660548",
    productName: "Solaray Caralluma Aerial Extract 500mg (30ct)",
    formulaId: "solaray-b120-076280660548",
    form: "capsule",
    barcode: "076280660548",
    actives: [
      { name: "Caralluma (aerial extract)", strength: "500 mg" },
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/caralluma-aerial-extract other-ingredients: Vegetable Cellulose Capsule, Cellulose, Organic Rice Extract Blend and Silica. Exact pack Solaray Caralluma Aerial Extract 500mg (30ct). SKU 076280660548. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b120-076280566192",
    productName: "Solaray Spectro Woman Multivitamin (120ct)",
    formulaId: "solaray-b120-076280566192",
    form: "capsule",
    barcode: "076280566192",
    actives: [
      { name: "Spectro Woman Multivitamin", strength: "label serving" },
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Rice Flour", "limited", "riceFlour"],
      ["Cellulose", "cleared", "mcc"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Acacia", "cleared", "acacia"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice Flour, Maltodextrin, Silica (Limited/Caution). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/spectro-woman-multi-vitamin other-ingredients: Gelatin Capsule, Rice Flour, Cellulose, Maltodextrin, Acacia, Magnesium Stearate, Silica. Exact pack Solaray Spectro Woman Multivitamin (120ct). SKU 076280566192. Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.",
  },
];

export const BATCH120_KYR6B_SOLARAY_ALIAS2_NOOI: RatingRecord[] = COMPACT.map(expand);

export const BATCH120_SKIPPED_NO_OI: { sku: string; name: string; count: string; url: string }[] = [
  { sku: "076280200553", name: "Once Daily Active Man Multivitamin", count: "90ct", url: "https://www.solaray.com/products/once-daily-active-man-multi-vitamin" },
  { sku: "076280127409", name: "Vitamin B-6, Timed-Release", count: "60ct / 50 mg", url: "https://www.solaray.com/products/vitamin-b-6-timed-release" },
  { sku: "076280047967", name: "Children's Multivitamin", count: "60ct", url: "https://www.solaray.com/products/childrens-multi-vitamin" },
  { sku: "076280174045", name: "Tart Cherry & Celery Seed 620mg", count: "60ct", url: "https://www.solaray.com/products/tart-cherry-celery-seed" },
  { sku: "076280446869", name: "Mega Quercetin 600mg", count: "60ct", url: "https://www.solaray.com/products/mega-quercetin" },
  { sku: "076280850406", name: "Spectro Man Multivitamin", count: "120ct", url: "https://www.solaray.com/products/spectro-man-multi-vitamin" },
  { sku: "076280034004", name: "Echinacea Angustifolia Root Ext 125mg", count: "60ct", url: "https://www.solaray.com/products/echinacea-angustifolia-root-ext" },
  { sku: "076280105056", name: "Mushroom Complete 1175mg", count: "60ct", url: "https://www.solaray.com/products/mushroom-complete" },
  { sku: "076280042405", name: "Mega Vitamin B-Stress, Timed-Release", count: "60ct", url: "https://www.solaray.com/products/mega-vitamin-b-stress-timed-release" },
  { sku: "076280648843", name: "Cal-Mag Citrate w/D-3 & K-2, 2:1 Ratio", count: "180ct", url: "https://www.solaray.com/products/cal-mag-citrate-w-d-3-k-2" },
  { sku: "076280193251", name: "Liposomal Multivitamin Women's", count: "60ct", url: "https://www.solaray.com/products/liposomal-multivitamin-womens" },
  { sku: "076280399134", name: "Holy Basil Aerial Extract 900mg", count: "60ct", url: "https://www.solaray.com/products/holy-basil-aerial-extract" },
  { sku: "076280127423", name: "Vitamin B-6, Timed-Release", count: "60ct / 100 mg", url: "https://www.solaray.com/products/vitamin-b-6-timed-release" },
  { sku: "076280031737", name: "Black Cohosh Root Extract 80mg", count: "30ct", url: "https://www.solaray.com/products/black-cohosh-root-extract" },
  { sku: "076280031119", name: "Bilberry Extract 60mg", count: "120ct", url: "https://www.solaray.com/products/copy-of-bilberry-berry-extract" },
  { sku: "076280047431", name: "Solaray Multi Energy Two Daily, Capsule (Btl-Plastic) | 120ct", count: "", url: "https://www.solaray.com/products/solaray-multi-energy-two-daily-capsule-btl-plastic-120ct" },
  { sku: "076280731767", name: "Bacillus Coagulans", count: "60ct", url: "https://www.solaray.com/products/bacillus-coagulans" },
  { sku: "076280355307", name: "Mycrobiome Prebiotic", count: "5.64oz  (160g) / Citrus", url: "https://www.solaray.com/products/mycrobiome-prebiotic" },
  { sku: "076280874969", name: "Vitamin K-2, MK-7 50mcg", count: "60ct", url: "https://www.solaray.com/products/vitamin-k-2-mk-7-50mcg" },
  { sku: "076280045307", name: "Calcium & Magnesium, AAC 2:1", count: "90ct", url: "https://www.solaray.com/products/calcium-magnesium-amino-acid-chelate-2-1-ratio" },
  { sku: "076280037661", name: "Saw Palmetto & Pygeum with Zinc & Vitamin E", count: "30 ct", url: "https://www.solaray.com/products/pygeum-bark-saw-palmetto-ext" },
  { sku: "076280031102", name: "Bilberry Extract 60mg", count: "60ct", url: "https://www.solaray.com/products/copy-of-bilberry-berry-extract" },
  { sku: "076280385847", name: "Vitamin D3 + K2", count: "60ct", url: "https://www.solaray.com/products/vitamin-d-3-k-2-125-mcg" },
  { sku: "076280012118", name: "Dandelion Root 1040mg", count: "180ct", url: "https://www.solaray.com/products/dandelion-root" },
  { sku: "076280048018", name: "Super Digestaway", count: "90ct", url: "https://www.solaray.com/products/super-digestaway-digestive-enzyme-blend" },
  { sku: "076280048025", name: "Super Digestaway", count: "180ct", url: "https://www.solaray.com/products/super-digestaway-digestive-enzyme-blend" },
  { sku: "076280088922", name: "Red Yeast Rice + CoQ-10", count: "60ct", url: "https://www.solaray.com/products/red-yeast-rice-plus-coq-10" },
  { sku: "076280121551", name: "Red Yeast Rice + CoQ-10", count: "90ct", url: "https://www.solaray.com/products/red-yeast-rice-plus-coq-10" },
  { sku: "076280970500", name: "SharpMind Nootropics Mood", count: "30 ct", url: "https://www.solaray.com/products/sharpmind-nootropics-mood" },
  { sku: "076280830385", name: "Liposomal Multivitamin Universal", count: "60ct", url: "https://www.solaray.com/products/liposomal-multivitamin-universal" },
  { sku: "076280083637", name: "Cleanse - Liver", count: "60 ct / Capsule", url: "https://www.solaray.com/products/cleanse-liver" },
  { sku: "076280083644", name: "Total Cleanse Kidney", count: "60 ct / Veg Cap", url: "https://www.solaray.com/products/total-cleanse-kidney" },
];

export const BATCH120_SKIPPED_OUT: { sku: string; name: string; why: string }[] = [];

export const BATCH120_HUNT_POUR: { name: string; url: string }[] = [];

export const BATCH120_REFUSED: { sku: string; name: string; count: string; url: string; unknown: string[] }[] = [
  { sku: "076280043709", name: "Pantothenic Acid", count: "", url: "https://www.solaray.com/products/pantothenic-acid-1", unknown: ["Whole Food Base (Whole Rice Concentrate including the Kernel, Polishings, and Hull, and Aloe Vera Gel)"] },
  { sku: "076280045840", name: "Calcium Citrate Chewables - Orange 1000mg", count: "Orange / 60ct", url: "https://www.solaray.com/products/calcium-citrate-chewables-orange", unknown: ["Orange Juice Powder", "Natural Orange Flavor with other Natural Flavors", "Stevia"] },
  { sku: "076280223149", name: "Triple Strength Tart Cherry Fruit Extract", count: "90ct", url: "https://www.solaray.com/products/triple-strength-tart-cherry-fruit-extract", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280030204", name: "Arabinogalactan, Larch Tree Extract 300mg", count: "60ct", url: "https://www.solaray.com/products/arabinogalactan-larch-tree-extract", unknown: ["Cassava Flour"] },
  { sku: "076280042412", name: "Mega Vitamin B-Stress, Timed-Release", count: "120ct", url: "https://www.solaray.com/products/mega-vitamin-b-stress-timed-release", unknown: ["Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, and Pure Aloe Vera Gel)"] },
  { sku: "076280012101", name: "Dandelion Root 1040mg", count: "100ct", url: "https://www.solaray.com/products/dandelion-root", unknown: ["Rice Extract Blend"] },
  { sku: "076280042917", name: "Vitamin B-Complex 75, Timed-Release", count: "100 ct", url: "https://www.solaray.com/products/vitamin-b-complex-timed-release", unknown: ["Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, Aloe Vera Gel)", "Magnesium Oxide"] },
  { sku: "076280399080", name: "Forskohlii Root Extract 385mg", count: "60ct", url: "https://www.solaray.com/products/forskohlii-root-extract", unknown: ["Organic Rice Bran Extract"] },
  { sku: "076280037685", name: "Saw Palmetto & Pygeum", count: "120 ct", url: "https://www.solaray.com/products/pygeum-saw-palmetto-extracts", unknown: ["Pumpkin Seed", "L-Alanine", "Glutamic Acid HCl"] },
  { sku: "076280042429", name: "Mega Vitamin B-Stress, Timed-Release", count: "240ct", url: "https://www.solaray.com/products/mega-vitamin-b-stress-timed-release", unknown: ["Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, Pure Aloe Vera Gel)"] },
  { sku: "076280048001", name: "Super Digestaway", count: "60ct", url: "https://www.solaray.com/products/super-digestaway-digestive-enzyme-blend", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280558272", name: "Once Daily Prenatal Multivitamin", count: "90ct", url: "https://www.solaray.com/products/once-daily-prenatal-multi-vitamin", unknown: ["Modified Corn Starch", "Aspartic Acid", "Orotic Acid"] },
  { sku: "076280042313", name: "Vitamin B-Stress PM", count: "120ct", url: "https://www.solaray.com/products/vitamin-b-stress-pm", unknown: ["Chamomile (flowering tops)", "Peppermint Leaves", "Bioflavonoid Concentrate", "Whole Food Base (Whole Rice Concentrate including the bran, germ and polishings and Aloe Vera Gel)"] },
  { sku: "076280043273", name: "Vitamin B-2 (Riboflavin) 100mg", count: "100ct", url: "https://www.solaray.com/products/vitamin-b-2", unknown: ["Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, and Pure Aloe Vera Gel)"] },
  { sku: "076280366693", name: "L-5-hydroxyTryptophan, 5-HTP 50mg", count: "60ct", url: "https://www.solaray.com/products/l-5-hydroxytryptophan-5-htp", unknown: ["Alpha Galactosidase"] },
  { sku: "076280763232", name: "SleepMag", count: "", url: "https://www.solaray.com/products/sleepmag", unknown: ["Tapioca Dextrin"] },
  { sku: "076280110098", name: "HMB + Vitamin D3", count: "Vanilla", url: "https://www.solaray.com/products/hmb-vitamin-d3", unknown: ["Natural Lemon and Lime Flavor with Other Natural Flavors", "Sea Salt", "Steviol Glycoside"] },
  { sku: "076280109344", name: "Nattokinase 100mg", count: "30ct", url: "https://www.solaray.com/products/nattokinase", unknown: ["Enteric Coating"] },
  { sku: "076280045901", name: "GTF Chromium 200mcg", count: "100ct", url: "https://www.solaray.com/products/gtf-chromium", unknown: ["Brewer's Yeast"] },
  { sku: "076280037586", name: "Phytoestrogen", count: "120ct", url: "https://www.solaray.com/products/phytoestrogen", unknown: ["Ginger Root", "Licorice Root", "Saw Palmetto Berry", "Pygeum Bark Extract"] },
  { sku: "076280375831", name: "Phytoestrogen", count: "240ct", url: "https://www.solaray.com/products/phytoestrogen", unknown: ["Ginger Root", "Licorice Root", "Saw Palmetto Berry", "Pygeum Bark Extract"] },
  { sku: "076280043037", name: "Vitamin B-Complex 100", count: "250ct", url: "https://www.solaray.com/products/vitamin-b-complex-100", unknown: ["Whole Food Base (Aloe Vera Gel, Whole Rice Concentrate including Bran, Germ, and Polishings)"] },
  { sku: "076280360448", name: "Her Life Stages Libido", count: "60 ct", url: "https://www.solaray.com/products/her-life-stages-libido", unknown: ["Vegetable Capsule"] },
  { sku: "076280346688", name: "Plant-Sourced GABA", count: "30 ct", url: "https://www.solaray.com/products/plant-sourced-gaba", unknown: ["L-Glutamic Acid"] },
  { sku: "076280082524", name: "Oil Of Oregano 150mg", count: "60ct", url: "https://www.solaray.com/products/oil-of-oregano", unknown: ["Softgel (Non-GMO Tapioca Starch, Non-GMO Glycerin and Water)"] },
  { sku: "076280042153", name: "Vitamin B-Stress", count: "100ct", url: "https://www.solaray.com/products/vitamin-b-stress", unknown: ["Whole Food Base (Whole Rice Concentrate including Bran, Germ and Polishings, and Aloe Vera Gel)"] },
  { sku: "076280042214", name: "Vitamin B-Stress AM, Timed-Release", count: "120 ct", url: "https://www.solaray.com/products/vitamin-b-stress-am-timed-release", unknown: ["Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ and Aloe Vera Gel)"] },
  { sku: "076280262025", name: "Spectro Energy Multivitamin", count: "120 ct", url: "https://www.solaray.com/products/spectro-energy-multi-vitamin", unknown: ["Soy Protein Isolate"] },
  { sku: "076280047813", name: "Spectro Multivitamin", count: "100ct", url: "https://www.solaray.com/products/spectro-multi-vitamin", unknown: ["Eleuthero Root", "Alfalfa Leaf", "Montmorillonite Clay", "Rose Hips", "Acerola Cherry"] },
  { sku: "076280041026", name: "Astaxanthin", count: "Small (1 mg), Medium (4 mg) / Softgel", url: "https://www.solaray.com/products/astaxanthin", unknown: ["d-alpha Tocopherol", "Medium Chain Triglycerides"] },
  { sku: "076280127430", name: "Vitamin B-6, Timed-Release", count: "120ct / 100 mg", url: "https://www.solaray.com/products/vitamin-b-6-timed-release", unknown: ["Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, and Aloe Vera Gel)"] },
  { sku: "076280008029", name: "Flaxseed Oil 1000mg", count: "100 ct", url: "https://www.solaray.com/products/flax", unknown: ["Gelatin (Bovine)", "Carob"] },
  { sku: "076280036039", name: "Ginkgo Biloba Extract, One Daily 120mg", count: "30ct", url: "https://www.solaray.com/products/ginkgo-biloba-extract-one-daily", unknown: ["Organic Agave Inulin"] },
  { sku: "076280037821", name: "Saw Palmetto Berry Extract 160mg", count: "60ct", url: "https://www.solaray.com/products/saw-palmetto-berry-extract", unknown: ["Virgin Olive Oil"] },
  { sku: "076280037838", name: "Saw Palmetto Berry Extract 160mg", count: "120ct", url: "https://www.solaray.com/products/saw-palmetto-berry-extract", unknown: ["Virgin Olive Oil"] },
  { sku: "076280037845", name: "Saw Palmetto Berry Extract 160mg", count: "240ct", url: "https://www.solaray.com/products/saw-palmetto-berry-extract", unknown: ["Virgin Olive Oil"] },
  { sku: "076280045918", name: "GTF Chromium 200mcg", count: "200ct", url: "https://www.solaray.com/products/gtf-chromium", unknown: ["Brewer's Yeast"] },
  { sku: "076280046618", name: "Potassium Asporotate 99mg", count: "200ct", url: "https://www.solaray.com/products/potassium-asporotate", unknown: ["Herb Base (Parsley Leaf, Chamomile, Watercress)"] },
  { sku: "076280130645", name: "Acetyl L-Carnitine 500mg", count: "30ct", url: "https://www.solaray.com/products/acetyl-l-carnitine", unknown: ["Rice Hull Concentrate"] },
  { sku: "X0042AF2L7", name: "Oil Of Oregano 150mg", count: "120ct", url: "https://www.solaray.com/products/oil-of-oregano", unknown: ["Softgel (Non-GMO Tapioca Starch, Non-GMO Glycerin and Water)"] },
  { sku: "076280008418", name: "Cranactin Cranberry Extract 400mg", count: "120ct", url: "https://www.solaray.com/products/cranactin-cranberry-extract-bacterial-antiadherence-formula-1", unknown: ["Maltodextrin (from Non-GMO Corn)", "Magnesium Hydroxide", "Vegetable Juice Concentrate"] },
  { sku: "076280084221", name: "Cranactin Cranberry Extract 400mg", count: "180ct", url: "https://www.solaray.com/products/cranactin-cranberry-extract-bacterial-antiadherence-formula-1", unknown: ["Maltodextrin (from Non-GMO Corn)", "Magnesium Hydroxide", "Vegetable Juice Concentrate"] },
  { sku: "076280041620", name: "Vitamin E, Mixed Tocopherols 268mg", count: "50ct", url: "https://www.solaray.com/products/vitamin-e-d-alpha-tocopherol-268-mg-400-iu", unknown: ["Soybean Oil"] },
  { sku: "076280042702", name: "Vitamin B-Complex 50mg", count: "50ct", url: "https://www.solaray.com/products/vitamin-b-complex-50", unknown: ["Whole Food Base (Whole Rice Concentrate and Aloe Vera Gel)"] },
  { sku: "076280042726", name: "Vitamin B-Complex 50mg", count: "250ct", url: "https://www.solaray.com/products/vitamin-b-complex-50", unknown: ["Whole Food Base (Whole Rice Concentrate and Aloe Vera Gel)"] },
  { sku: "076280043006", name: "Vitamin B-Complex 100", count: "50ct", url: "https://www.solaray.com/products/vitamin-b-complex-100", unknown: ["Whole Food Base (Aloe Vera Gel, Whole Rice Concentrate including Bran, Germ, and Polishings)"] },
  { sku: "076280043013", name: "Vitamin B-Complex 100", count: "100ct", url: "https://www.solaray.com/products/vitamin-b-complex-100", unknown: ["Whole Food Base (Aloe Vera Gel, Whole Rice Concentrate including Bran, Germ, and Polishings)"] },
  { sku: "076280036008", name: "Ginkgo Biloba Leaf Extract 60mg", count: "60ct", url: "https://www.solaray.com/products/ginkgo-biloba-leaf-extract", unknown: ["Organic Agave Inulin", "Rice Hull Concentrate"] },
  { sku: "076280027617", name: "Female Hormone Blend Sp-7c", count: "180ct", url: "https://www.solaray.com/products/female-hormone-blend-sp-7c", unknown: ["Trace Mineral Complex"] },
  { sku: "076280084337", name: "Super CranActin Cranberry Extract 400mg", count: "120ct", url: "https://www.solaray.com/products/super-cranactin-cranberry-extract-bacterial-antiadherence-formula", unknown: ["Maltodextrin (from Non-GMO Corn)", "Magnesium Hydroxide", "Vegetable Juice"] },
  { sku: "076280559620", name: "Reacta-C & Bioflavonoids 500mg", count: "60ct", url: "https://www.solaray.com/products/reacta-c-bioflavonoids", unknown: ["Calcium L-Threonate"] },
  { sku: "076280610741", name: "Reacta-C & Bioflavonoids 500mg", count: "120ct", url: "https://www.solaray.com/products/reacta-c-bioflavonoids", unknown: ["Calcium L-Threonate"] },
  { sku: "076280046717", name: "Potassium 99mg", count: "200ct", url: "https://www.solaray.com/products/potassium-99", unknown: ["Parsley", "Chamomile", "Watercress"] },
  { sku: "076280374025", name: "Magnesium Citrate 400mg", count: "180ct", url: "https://www.solaray.com/products/magnesium-citrate", unknown: ["Arabic Gum", "Watercress Leaf", "Dandelion Root", "Alfalfa Leaf", "Parsley Leaf"] },
];

export const BATCH120_LEFTOVER_REAL_TOKENS: string[] = [
  "Acacia (Gum Arabic)",
  "Acerola (fruit juice)",
  "Acerola Cherry",
  "African Cherry (berry)",
  "Alfalfa Aerial",
  "Alfalfa Leaf",
  "Alfalfa leaf",
  "Aloe Vera Gel",
  "Aloe Vera Gel (200x dry concentrate)",
  "Alpha Galactosidase",
  "Alpha Lipoic Acid",
  "Annatto (seed extract)",
  "Aqueous Coating",
  "Arabic Gum",
  "Ascorbyl Palmitate",
  "Ascorbyl Palmitate (antioxidant)",
  "Aspartic Acid",
  "Beet (Beta vulgaris) (root)",
  "Beet Root",
  "Beet Root Juice (for color)",
  "Beet Root Powder (Color)",
  "Berry Flavors with Other Natural Flavors",
  "Beta Carotene (coloring)",
  "Bilberry (fruit)",
  "Bioflavonoid Concentrate",
  "BioPerine (Black Pepper Extract)",
  "Blueberry (fruit extract)",
  "Brewer's Yeast",
  "Buffering Base (Calcium Carbonate and Magnesium Oxide)",
  "Calcium Ascorbate",
  "Calcium Fluoride 6x",
  "Calcium L-Threonate",
  "Calcium Phosphate 3x",
  "Calcium Silicate",
  "Calcium Threonate",
  "Capric Acid",
  "Caprylic Acid",
  "Caramel (coloring)",
  "Caramel Liquid",
  "Carob",
  "Carrageenan",
  "Carrot",
  "Carrot Juice",
  "Carrot Juice (root)",
  "Carrot Juice Powder",
  "Cassava Flour",
  "Celery Seed",
  "Chamomile",
  "Chamomile (flowering tops)",
  "Chicory Inulin",
  "Chicory Root Inulin",
  "Chlorophyll",
  "Chlorophyllin",
  "Citric Acid (from Non-GMO Cassava)",
  "Citric Acid (from Non-GMO Tapioca)",
  "Coconut Oil",
  "Coconut Oil Powder",
  "Contains Less than 2% of Citric Acid",
  "Corn Starch",
  "Cranberry",
  "d-alpha Tocopherol",
  "D-Limonene Oil",
  "Dandelion Root",
  "Deionized Water",
  "Dextrin",
  "Dextrin (from Non-GMO Maca)",
  "Dextrin (from Non-GMO Tapioca)",
  "Diglycerides",
  "DIM (Diindolyimethane)",
  "Dong Quai Root",
  "Eleuthero Root",
  "Enteric Coating",
  "Fennel Seed",
  "Fenugreek Seeds",
  "Fermented Defatted Chickpea Flour Extract",
  "Food Starch",
  "FOS Blend (Fructooligosaccharides)",
  "FOS Blend (fructooligosaccharides, sprouted mung bean extract)",
  "Fractionated Palm Oil",
  "Fructose",
  "Gelatin (Bovine)",
  "Gelatin Softgel (Gelatin, Glycerin, Carob)",
  "Ginger (root)",
  "Ginger Root",
  "Ginseng (Panax ginseng) (root extract)",
  "Glutamic Acid HCl",
  "Glycerol Monostearate",
  "Glycerol Triacetate",
  "Gotu Kola (Centella asiatica) (extract)",
  "Grain Alcohol (45-55% by volume)",
  "Grape Seed Extract",
  "Grapefruit Juice Concentrate",
  "Gum Acacia",
  "Herb Base (Parsley Leaf, Alfalfa Leaf)",
  "Herb Base (Parsley Leaf, Chamomile, Watercress)",
  "Herb Base (Parsley Leaf, Organic Alfalfa Leaf)",
  "Herbal Base (Parsley, Rice Flour, Yellow Dock Root)",
  "Honey",
  "Horsetail",
  "Horsetail Herb",
  "Hypromellose Capsule",
  "Iron Pyrophosphate",
  "Kelp",
  "L-Alanine",
  "L-Aspartic Acid",
  "L-Glutamic Acid",
  "L-Glycine",
  "Lecithin (Soy)",
  "Lemon Flavors with Other Natural Flavors",
  "Licorice (root)",
  "Licorice Root",
  "Lime Flavors with Other Natural Flavors",
  "Lipid Blend from Sunflower Oil",
  "Magnesium Carbonate",
  "Magnesium Citrate",
  "Magnesium Hydroxide",
  "Magnesium Oxide",
  "Magnesium Phosphate 3x",
  "Maltodextrin (from Non-GMO Corn)",
  "Maltodextrin (from Non-GMO Sweet Potato)",
  "Maltodextrin (from Non-GMO Tapioca)",
  "Mango Flavors with Other Natural Flavors",
  "Medium Chain Triglycerides",
  "Mixed Carotenoids",
  "Modified Corn Starch",
  "Modified Corn Starch (Non-GMO)",
  "Modified Starch",
  "Modified Tapioca Starch",
  "Molasses",
  "Monoglycerides",
  "Montmorillonite Clay",
  "Mycelium/Organic Whole Oat Biomass",
  "Natural Black Cherry Flavor with other Natural Flavors",
  "Natural Cherry Flavor",
  "Natural Cherry Flavor with other Natural Flavors",
  "Natural Cherry Flavor with other natural flavors",
  "Natural Cherry with other Natural Flavors",
  "Natural Flavor",
  "Natural Flavors (Lemon and Raspberry with other Natural Flavors)",
  "Natural Grape Flavor with other Natural Flavors (milk)",
  "Natural Grapefruit Flavor with Other Natural Flavors",
  "Natural Lemon",
  "Natural Lemon and Lime Flavor with Other Natural Flavors",
  "Natural Lemon Flavor with other Natural Flavors",
  "Natural Lemon Lime Flavor",
  "Natural Mango",
  "Natural Mixed Berry Flavor with other Natural Flavors",
  "Natural Orange Flavor with Other Natural Flavors",
  "Natural Orange Flavor with other Natural Flavors",
  "Natural Orange Flavor with Other Natural Flavors (soy)",
  "Natural Orange Juice Flavor with Other Natural Flavors",
  "Natural Peach",
  "Natural Peach Flavor with Other Natural Flavors",
  "Natural Pineapple Flavor with Other Natural Flavors",
  "Natural Raspberry",
  "Natural Raspberry Flavor",
  "Natural Strawberry Flavor with Other Natural Flavors",
  "Natural Strawberry with other natural flavors",
  "Natural Tangerine Flavor with other Natural Flavors",
  "Natural Vanilla Flavor with Other Natural Flavors",
  "Natural Watermelon Flavor with Other Natural Flavors",
  "Neem Leaf",
  "Non-GMO Maltodextrin",
  "Non-GMO Potato Starch",
  "Nutritional Yeast",
  "Oat Fiber",
  "Oat Fiber Blend (Oat Fiber, Gum Arabic, Sunflower Lecithin, Sunflower Oil)",
  "Oat Straw Stem",
  "Orange Juice",
  "Orange Juice Concentrate",
  "Orange Juice Powder",
  "Organic Agave Inulin",
  "Organic Alfalfa",
  "Organic Arabic Gum",
  "Organic Cane Sugar",
  "Organic Inulin",
  "Organic Lemon Flavor with Other Natural Flavors",
  "Organic Natural Lemon",
  "Organic Natural Lemon & Raspberry Flavors with other Natural Flavors",
  "Organic Pullulan Capsule",
  "Organic Pullulan Capsules",
  "Organic Rice Blend Extract",
  "Organic Rice Bran Extract",
  "Organic Rice Bran Extract Blend",
  "Organic Sunflower Oil & Organic Carnauba Wax",
  "Organic Tapioca Syrup",
  "Orotic Acid",
  "other Natural Flavors (milk, soy)",
  "Parsley",
  "Parsley Aerial",
  "Parsley Herb",
  "Parsley Leaf",
  "Pea Protein Isolate",
  "Peach Flavors with other Natural Flavors (Soy)",
  "Pectin",
  "Peppermint Leaves",
  "Potassium Phosphate 3x",
  "Potassium Sorbate",
  "Potato Dextrin",
  "Potato Maltodextrin",
  "Pumpkin Seed",
  "Pumpkin Seeds",
  "Pygeum (bark extract)",
  "Pygeum Bark Extract",
  "Resistant Potato Starch",
  "Rice Bran Concentrate",
  "Rice Bran Oil",
  "Rice Extract Blend",
  "Rice Hull Concentrate",
  "Rice Powder",
  "Rice Protein",
  "Rose Hips",
  "Rose Hips (fruit)",
  "Safflower Oil",
  "Saw Palmetto (berry)",
  "Saw Palmetto Berry",
  "Saw Palmetto Berry Extract",
  "Sea Salt",
  "Silica 6x",
  "Sodium Benzoate",
  "Sodium Chloride 6x",
  "Sodium Citrate",
  "Sodium Crosscarmellose",
  "Softgel (Gelatin, Glycerin, Water)",
  "Softgel (Non-GMO Tapioca Starch, Non-GMO Glycerin and Water)",
  "Soy",
  "Soy Oil",
  "Soy Protein Isolate",
  "Soybean Oil",
  "Starch",
  "Stevia",
  "Stevia (leaf extract)",
  "Stevia (leaf)",
  "Stevia (Stevia rebaudiana) (leaf extract)",
  "Stevia Leaf Extract",
  "Steviol Glycoside",
  "Sucrose",
  "Sunflower Phospholipids",
  "Sustainable Palm Oil",
  "Tapioca Dextrin",
  "Tapioca Starch",
  "Tocopherols (antioxidant)",
  "Trace Mineral Complex",
  "Turmeric Root Extract",
  "Vegetable Capsule",
  "Vegetable Cellulose",
  "Vegetable Fiber",
  "Vegetable Juice",
  "Vegetable Juice Concentrate",
  "Vegetarian Capsule",
  "Virgin Olive Oil",
  "Watercress",
  "Watercress Leaf",
  "Whole Food Base (Aloe Vera Gel, Whole Rice Concentrate including Bran, Germ, and Polishings)",
  "Whole Food Base (Rose Hips, Acerola Cherry and Bioflavonoid Concentrate)",
  "Whole Food Base (Whole Rice Concentrate and Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including Bran, Germ and Polishings)",
  "Whole Food Base (Whole Rice Concentrate including Bran, Germ and Polishings, and Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including Kernel, Polishings, Hull and Pure Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including the bran, germ and polishings and Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ and Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ)",
  "Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, and Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, and Pure Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, Pure Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including the Kernel, Polishings, and Hull, and Aloe Vera Gel)",
  "Whole Rice Concentrate (including bran, polishing and germ)",
  "Whole Rice Concentrate (including Bran, Polishings and Germ)",
  "Whole Rice Concentrate (Including Bran, Polishings, and Germ, and Aloe Vera Gel)",
  "Whole Rice Concentrate (including Kernel, Polishings, and Hull)",
  "Whole Rice Concentrate (including the Bran, Polishings and Germ)",
  "Yellow Dock Root",
  "Yellowdock Root",
  "Zinc Oxide",
];

const _ROWS = BATCH120_KYR6B_SOLARAY_ALIAS2_NOOI;
if (_ROWS.length !== 46) throw new Error('batch120 tally drift: expected 46 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 17) throw new Error('batch120 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 22) throw new Error('batch120 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 7) throw new Error('batch120 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch120 recordStatus must stay unverified');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 35) throw new Error('batch120 NEW tally drift');
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 11) throw new Error('batch120 REUSE tally drift');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch120 writes Solaray only');
{
  const _seenUpc = new Set<string>();
  for (const _r of _ROWS) {
    const _b = _r.barcode ?? '';
    if (!_b) continue;
    if (!/^\d{12}$/.test(_b)) throw new Error('batch120 barcode not GTIN-12 on ' + _r.id);
    const _d = _b.split('').map(Number);
    const _sum = _d.slice(0, 11).reduce((acc, n, i) => acc + n * (i % 2 === 0 ? 3 : 1), 0);
    if ((10 - (_sum % 10)) % 10 !== _d[11]) throw new Error('batch120 barcode check digit ' + _r.id);
    if (_seenUpc.has(_b)) throw new Error('batch120 duplicate barcode ' + _b);
    _seenUpc.add(_b);
  }
}
if (_ROWS.some((r) => r.form === 'gummy' || r.form === 'liquid')) throw new Error('batch120 must not grade gummies or pour bottles');
if (BATCH120_SKIPPED_NO_OI.length !== 32) throw new Error('batch120 no_OI leftover drift');
if (BATCH120_SKIPPED_OUT.length !== 0) throw new Error('batch120 OUT drift');
if (BATCH120_REFUSED.length !== 54) throw new Error('batch120 REFUSED drift');
if (BATCH120_HUNT_POUR.length !== 0) throw new Error('batch120 hunt-list drift');
if (BATCH120_LEFTOVER_REAL_TOKENS.length !== 275) throw new Error('batch120 leftover token drift');
const inositol = _ROWS.find((r) => r.id === 'solaray-b120-076280043563');
if (!inositol || inositol.verdict !== 'clean' || inositol.inactiveIngredients.length !== 0 || inositol.form !== 'powder') {
  throw new Error('batch120 inositol Other Ingredients: None missing');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients.some((i) => i.riskLevel === 'high'))) {
  throw new Error('batch120 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients.some((i) => i.riskLevel !== 'cleared'))) {
  throw new Error('batch120 Clean row has a flag');
}
if (_ROWS.some((r) => r.verdict === 'caution' && !r.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate'))) {
  throw new Error('batch120 Caution without Limited');
}
if (_ROWS.some((r) => r.inactiveIngredients.some((i) => i.name === 'Vegetable Capsule' || i.name === 'Parsley Leaf'))) {
  throw new Error('batch120 must not grade unstamped tokens');
}

