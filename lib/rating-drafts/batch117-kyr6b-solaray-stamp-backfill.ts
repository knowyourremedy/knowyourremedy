// DRAFT / not verified / batch 117 KYR6-b Solaray stamp + backfill.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades.
// Six founder aliases stamped Sept 27, 2026 (aliases only, grades unchanged):
// Vegetable Cellulose Capsule → capsule cellulose / labeled veg cap (Cleared).
// Cellulose → cellulose-family / powdered cellulose / MCC (Cleared).
// Gelatin Capsule → gelatin (Cleared).
// Organic Rice Extract Blend → unspecified rice extract (Limited / Caution).
// Rice Bran Extract → named rice-bran extract (Cleared).
// Whole Rice Concentrate → rice concentrate / hull-concentrate (Cleared).
// Bare Vegetable Capsule stays ungraded. It is not mapped.
// No aliases beyond those six. batch70–batch115 were not edited.
// No NatureWise / NOW / Nutricost / WELMATE / GoodSense / TIME-Cap reopen.
// No oil pour bottles. Vitamin D3 Liquid Unflavored is a dropper and is REFUSED.
// recordStatus is 'unverified' on every row. UPC stays empty.
//
// TALLY (unverified drafts in THIS file): 299 rows —
// Clean 120 / Caution 179 / Avoid 0.
// NEW 267 / REUSE 32 / SKIPPED no_OI 123 / SKIPPED OUT 0 / REFUSED 326.
// Cleanup edited only the 7 formerly sizeless rows (count added) and
// removed the organic Nettle Leaf 900mg 100 ct twin (076280194104).
// Kept the conventional 100ct Caution panel (076280014105).
// Distinct leftover unknown tokens: 322.
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
    'Methodology §5 Cleared (capsule cellulose / labeled veg cap). Vegetable Cellulose Capsule maps here (Sept 27, 2026). Same Cleared. Not a new grade. Bare Vegetable Capsule stays ungraded.',
  mcc:
    'Methodology §5 Cleared (cellulose-family / powdered cellulose / MCC / croscarmellose sodium). Cellulose maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  gelatin:
    'Methodology §5 Cleared (gelatin). Gelatin Capsule maps to gelatin (Sept 27, 2026). Same Cleared. Not a new grade.',
  riceExtract:
    'Methodology §5 Limited (unspecified rice extract). Organic Rice Extract Blend maps here (Sept 27, 2026). Same Limited / Caution. Not a new grade.',
  riceBran:
    'Methodology §5 Cleared (named rice-bran extract). Rice Bran Extract maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  riceConc:
    'Methodology §5 Cleared (rice concentrate / hull-concentrate). Whole Rice Concentrate maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid).',
  sio2: 'Methodology §5 Limited (silica / silicon dioxide). Not Avoid.',
  maltodextrin:
    'Methodology §5 Limited (maltodextrin, organic or non-organic). Not Avoid.',
  acacia: 'Methodology §5 Cleared (acacia gum / gum arabic).',
  riceFlour: 'Methodology §5 Limited (rice flour). Not Avoid.',
  alginate: 'Methodology §5 Cleared (sodium alginate).',
  peaStarch: 'Methodology §5 Limited (pea starch). Not Avoid.',
  dical: 'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate as filler).',
  glycine: 'Methodology §5 Cleared (glycine as an amino-acid filler).',
  inulin: 'Methodology §5 Cleared (inulin / chicory root fiber).',
  modStarch: 'Methodology §5 Limited (modified food starch). Not Avoid.',
  lecithin: 'Methodology §5 Cleared (sunflower lecithin).',
  citric: 'Methodology §5 Cleared (citric acid / ascorbic acid as fillers/buffers).',
  water: 'Methodology §5 Cleared (water / purified water).',
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
  'FOUNDER-LOCK DRAFT: Clean. Panel prints Other Ingredients: None. Confirmed-empty inactives are not missing-OI (docs/PROJECT_NOTES.md). No fillers invented.';
const CLEARED_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Every Other Ingredients token is an existing Cleared §5 lock or a Sept 27, 2026 alias onto an existing Cleared family. No High. No Limited.';
const COMPACT: Compact[] = [
  {
    id: "solaray-b117-076280118087",
    productName: "Solaray Mangosteen Fruit 475mg (100ct)",
    formulaId: "solaray-b117-076280118087",
    form: "capsule",
    actives: [
      { name: "Mangosteen Fruit 475mg", strength: "475 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mangosteen-fruit other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Mangosteen Fruit 475mg (100ct). SKU 076280118087. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011845",
    productName: "Solaray Chlorella Broken Cell 410mg (100ct)",
    formulaId: "solaray-b117-076280011845",
    form: "capsule",
    actives: [
      { name: "Chlorella Broken Cell 410mg", strength: "410 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/chlorella-broken-cell other-ingredients: Veaetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray Chlorella Broken Cell 410mg (100ct). SKU 076280011845. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing. OCR read Veaetable Cellulose Capsule; established misread mapped to Vegetable Cellulose Capsule before matching.",
  },
  {
    id: "solaray-b117-076280083330",
    productName: "Solaray Total Cleanse Lymph (60 ct / Veg Cap)",
    formulaId: "solaray-b117-076280083330",
    form: "capsule",
    actives: [
      { name: "Total Cleanse Lymph", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/total-cleanse-lymph other-ingredients: Vegetable Cellulose Capsule, Maltodextrin, Silica, Magnesium Stearate and Cellulose. Exact pack Solaray Total Cleanse Lymph (60 ct / Veg Cap). SKU 076280083330. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280274752",
    productName: "Solaray Super Digestaway + Probiotics (60ct)",
    formulaId: "solaray-b117-076280274752",
    form: "capsule",
    actives: [
      { name: "Super Digestaway + Probiotics", strength: "label serving" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/super-digestaway-probiotics other-ingredients: Maltodextrin, Vegetable Cellulose Capsule, Cellulose and Silica. Exact pack Solaray Super Digestaway + Probiotics (60ct). SKU 076280274752. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280083194",
    productName: "Solaray Alpha Lipoic Acid 250mg (60ct)",
    formulaId: "solaray-b117-076280083194",
    form: "capsule",
    actives: [
      { name: "Alpha Lipoic Acid 250mg", strength: "250 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/alpha-lipoic-acid other-ingredients: Vegetable Cellulose Capsule, Whole Rice Concentrate, Silica and Magnesium Stearate. Exact pack Solaray Alpha Lipoic Acid 250mg (60ct). SKU 076280083194. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280544336",
    productName: "Solaray Tongkat Ali 400mg (60ct)",
    formulaId: "solaray-b117-076280544336",
    form: "capsule",
    actives: [
      { name: "Tongkat Ali 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/tongkat-ali-root other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Rice Bran Extract, and Silica. Exact pack Solaray Tongkat Ali 400mg (60ct). SKU 076280544336. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280571141",
    productName: "Solaray SharpMind Nootropics Stress (30 ct)",
    formulaId: "solaray-b117-076280571141",
    form: "capsule",
    actives: [
      { name: "SharpMind Nootropics Stress", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/sharpmind-nootropics-stress other-ingredients: Vegetable Cellulose Capsule, Cellulose, Stearic Acid, Silica. Exact pack Solaray SharpMind Nootropics Stress (30 ct). SKU 076280571141. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048261",
    productName: "Solaray Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice (60ct)",
    formulaId: "solaray-b117-076280048261",
    form: "capsule",
    actives: [
      { name: "Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice", strength: "label serving" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Stearic Acid", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/acidophilus-3-strain-probiotic-prebiotic-carrot-juice other-ingredients: Maltodextrin, Vegetable Cellulose Capsule, Silica and Stearic Acid. Exact pack Solaray Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice (60ct). SKU 076280048261. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280001709",
    productName: "Solaray Black Cohosh Root 540mg (100ct)",
    formulaId: "solaray-b117-076280001709",
    form: "capsule",
    actives: [
      { name: "Black Cohosh Root 540mg", strength: "540 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/black-cohosh-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Black Cohosh Root 540mg (100ct). SKU 076280001709. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011548",
    productName: "Solaray Celery Seed 1010mg (100ct)",
    formulaId: "solaray-b117-076280011548",
    form: "capsule",
    actives: [
      { name: "Celery Seed 1010mg", strength: "1010 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/celery-seed other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Celery Seed 1010mg (100ct). SKU 076280011548. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015805",
    productName: "Solaray Shiitake Mushroom 600mg (100ct)",
    formulaId: "solaray-b117-076280015805",
    form: "capsule",
    actives: [
      { name: "Shiitake Mushroom 600mg", strength: "600 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/shiitake-mushroom other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Shiitake Mushroom 600mg (100ct). SKU 076280015805. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280116632",
    productName: "Solaray Cinnamon Bark 1000mg (60ct)",
    formulaId: "solaray-b117-076280116632",
    form: "capsule",
    actives: [
      { name: "Cinnamon Bark 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cinnamon-bark other-ingredients: Vegetable Cellulose Capsule and Cellulose. Exact pack Solaray Cinnamon Bark 1000mg (60ct). SKU 076280116632. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280717556",
    productName: "Solaray DIM Complex (60ct)",
    formulaId: "solaray-b117-076280717556",
    form: "capsule",
    actives: [
      { name: "DIM Complex", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/dim-complex other-ingredients: Cellulose, Vegetable Cellulose Capsule, Maltodextrin, and Silica. Exact pack Solaray DIM Complex (60ct). SKU 076280717556. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015102",
    productName: "Solaray Rose Hips Fruit 550mg (100ct)",
    formulaId: "solaray-b117-076280015102",
    form: "capsule",
    actives: [
      { name: "Rose Hips Fruit 550mg", strength: "550 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/rose-hips-fruit other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Rose Hips Fruit 550mg (100ct). SKU 076280015102. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280042122",
    productName: "Solaray Vitamin K-1, 100mcg (100 ct)",
    formulaId: "solaray-b117-076280042122",
    form: "tablet",
    actives: [
      { name: "Vitamin K-1, 100mcg", strength: "100 mcg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-k-1 other-ingredients: Cellulose, Stearic Acid, Silica and Magnesium Stearate. Exact pack Solaray Vitamin K-1, 100mcg (100 ct). SKU 076280042122. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280081459",
    productName: "Solaray Glucosamine Sulfate 500mg (120ct)",
    formulaId: "solaray-b117-076280081459",
    form: "capsule",
    actives: [
      { name: "Glucosamine Sulfate 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/glucosamine-sulfate other-ingredients: Gelatin Capsule, Cellulose and Magnesium Stearate. Exact pack Solaray Glucosamine Sulfate 500mg (120ct). SKU 076280081459. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280008791",
    productName: "Solaray Beta Glucan With Vitamin C 10mg (60ct)",
    formulaId: "solaray-b117-076280008791",
    form: "capsule",
    actives: [
      { name: "Beta Glucan With Vitamin C 10mg", strength: "10 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Flour", "limited", "riceFlour"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice Flour (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/beta-glucan-with-vitamin-c other-ingredients: Vegetable Cellulose Capsule, Rice Flour and Magnesium Stearate. Exact pack Solaray Beta Glucan With Vitamin C 10mg (60ct). SKU 076280008791. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280186628",
    productName: "Solaray Turmeric Root Extract 600mg (60ct)",
    formulaId: "solaray-b117-076280186628",
    form: "capsule",
    actives: [
      { name: "Turmeric Root Extract 600mg", strength: "600 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/turmeric-root-extract-one-daily other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Turmeric Root Extract 600mg (60ct). SKU 076280186628. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280043938",
    productName: "Solaray Vitamin C & Echinacea (60ct)",
    formulaId: "solaray-b117-076280043938",
    form: "capsule",
    actives: [
      { name: "Vitamin C & Echinacea", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-echinacea-root other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Vitamin C & Echinacea (60ct). SKU 076280043938. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280001105",
    productName: "Solaray Alfalfa Leaf 860mg (100ct)",
    formulaId: "solaray-b117-076280001105",
    form: "capsule",
    actives: [
      { name: "Alfalfa Leaf 860mg", strength: "860 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/alfalfa-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Alfalfa Leaf 860mg (100ct). SKU 076280001105. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280457940",
    productName: "Solaray Calcium Bisglycinate w/D-3 1000mg (120ct)",
    formulaId: "solaray-b117-076280457940",
    form: "capsule",
    actives: [
      { name: "Calcium Bisglycinate w/D-3 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/calcium-bisglycinate-w-d-3 other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Calcium Bisglycinate w/D-3 1000mg (120ct). SKU 076280457940. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280493009",
    productName: "Solaray Multidophilus 12 Strain Probiotic, 20 Billion Cfu (100ct)",
    formulaId: "solaray-b117-076280493009",
    form: "capsule",
    actives: [
      { name: "Multidophilus 12 Strain Probiotic, 20 Billion Cfu", strength: "label serving" }
    ],
    flags: [
      ["Inulin", "cleared", "inulin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/multidophilus-12-strain-probiotic-20-billion-cfu other-ingredients: Inulin, Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray Multidophilus 12 Strain Probiotic, 20 Billion Cfu (100ct). SKU 076280493009. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280941388",
    productName: "Solaray Neem Leaf 400mg (100ct)",
    formulaId: "solaray-b117-076280941388",
    form: "capsule",
    actives: [
      { name: "Neem Leaf 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/organically-grown-neem-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Neem Leaf 400mg (100ct). SKU 076280941388. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280016154",
    productName: "Solaray Suma Root 500mg (100ct)",
    formulaId: "solaray-b117-076280016154",
    form: "capsule",
    actives: [
      { name: "Suma Root 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/suma-root other-ingredients: Vegetable Cellulose Capsule, Rice Bran Extract and Silica. Exact pack Solaray Suma Root 500mg (100ct). SKU 076280016154. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280549010",
    productName: "Solaray Magnesium Glycinate 350mg (120ct)",
    formulaId: "solaray-b117-076280549010",
    form: "capsule",
    actives: [
      { name: "Magnesium Glycinate 350mg", strength: "350 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/magnesium-glycinate other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Cellulose and Silica. Exact pack Solaray Magnesium Glycinate 350mg (120ct). SKU 076280549010. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280329896",
    productName: "Solaray Rutin 500mg (90ct)",
    formulaId: "solaray-b117-076280329896",
    form: "capsule",
    actives: [
      { name: "Rutin 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/rutin other-ingredients: Vegetable Cellulose Capsule and Rice Bran Extract. Exact pack Solaray Rutin 500mg (90ct). SKU 076280329896. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280037784",
    productName: "Solaray St. John's Wort Mood Support (60ct)",
    formulaId: "solaray-b117-076280037784",
    form: "capsule",
    actives: [
      { name: "St. John's Wort Mood Support", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/st-johns-wort-mood-support other-ingredients: Vegetable Cellulose Capsule, Maltodextrin, Silica, Cellulose and Magnesium Stearate. Exact pack Solaray St. John's Wort Mood Support (60ct). SKU 076280037784. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280038002",
    productName: "Solaray Turmeric Root Extract 300mg (60ct)",
    formulaId: "solaray-b117-076280038002",
    form: "capsule",
    actives: [
      { name: "Turmeric Root Extract 300mg", strength: "300 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/turmeric-root-extract other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Turmeric Root Extract 300mg (60ct). SKU 076280038002. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280017007",
    productName: "Solaray Yellow Dock Root 500mg (100ct)",
    formulaId: "solaray-b117-076280017007",
    form: "capsule",
    actives: [
      { name: "Yellow Dock Root 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/yellow-dock-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Yellow Dock Root 500mg (100ct). SKU 076280017007. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012729",
    productName: "Solaray Fenugreek Seed & Thyme Leaf 950mg (100ct)",
    formulaId: "solaray-b117-076280012729",
    form: "capsule",
    actives: [
      { name: "Fenugreek Seed & Thyme Leaf 950mg", strength: "950 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/fenugreek-seed-thyme-leaf other-ingredients: Vegetable Cellulose Capsule, Cellulose, Organic Rice Extract Blend and Silica. Exact pack Solaray Fenugreek Seed & Thyme Leaf 950mg (100ct). SKU 076280012729. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280001853",
    productName: "Solaray Bladderwrack Seaweed 580mg (100ct)",
    formulaId: "solaray-b117-076280001853",
    form: "capsule",
    actives: [
      { name: "Bladderwrack Seaweed 580mg", strength: "580 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bladderwrack-seaweed other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Bladderwrack Seaweed 580mg (100ct). SKU 076280001853. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011807",
    productName: "Solaray Chickweed Aerial 385mg (100ct)",
    formulaId: "solaray-b117-076280011807",
    form: "capsule",
    actives: [
      { name: "Chickweed Aerial 385mg", strength: "385 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/chickweed-aerial other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Chickweed Aerial 385mg (100ct). SKU 076280011807. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011203",
    productName: "Solaray Cascara Sagrada Bark 450mg (100ct)",
    formulaId: "solaray-b117-076280011203",
    form: "capsule",
    actives: [
      { name: "Cascara Sagrada Bark 450mg", strength: "450 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cascara-sagrada-bark other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Cascara Sagrada Bark 450mg (100ct). SKU 076280011203. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280363180",
    productName: "Solaray DAO Enzyme (30ct)",
    formulaId: "solaray-b117-076280363180",
    form: "capsule",
    actives: [
      { name: "DAO Enzyme", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/dao-enzyme other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica. Exact pack Solaray DAO Enzyme (30ct). SKU 076280363180. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280106794",
    productName: "Solaray Milk Thistle Seed Extract 350mg (60ct)",
    formulaId: "solaray-b117-076280037036",
    form: "capsule",
    actives: [
      { name: "Milk Thistle Seed Extract 350mg", strength: "350 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/milk-thistle-seed-extract-one-daily other-ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend, Whole Rice Concentrate and Silica. Exact pack Solaray Milk Thistle Seed Extract 350mg (60ct). SKU 076280106794. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280001235",
    productName: "Solaray Super Aloe Vera (100 ct)",
    formulaId: "solaray-b117-076280001235",
    form: "capsule",
    actives: [
      { name: "Super Aloe Vera", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/super-aloe-vera other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Super Aloe Vera (100 ct). SKU 076280001235. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280046762",
    productName: "Solaray Selenium 100mcg, Yeast-Free (90ct)",
    formulaId: "solaray-b117-076280046762",
    form: "capsule",
    actives: [
      { name: "Selenium 100mcg, Yeast-Free", strength: "100 mcg" }
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/selenium-100-yeast-free other-ingredients: Whole Rice Concentrate, Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Selenium 100mcg, Yeast-Free (90ct). SKU 076280046762. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280044003",
    productName: "Solaray Vitamin C With Rose Hips & Acerola 500mg (100ct)",
    formulaId: "solaray-b117-076280044003",
    form: "capsule",
    actives: [
      { name: "Vitamin C With Rose Hips & Acerola 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-with-rose-hips-acerola-timed-release-vegcap other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Stearic Acid, and Silica. Exact pack Solaray Vitamin C With Rose Hips & Acerola 500mg (100ct). SKU 076280044003. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280041712",
    productName: "Solaray Vitamin E, Dry 165 Mg (200 Iu) (100ct)",
    formulaId: "solaray-b117-076280041712",
    form: "capsule",
    actives: [
      { name: "Vitamin E, Dry 165 Mg (200 Iu)", strength: "165 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-e-dry-165-mg-200-iu other-ingredients: Cellulose, Gelatin Capsule, Silica and Magnesium Stearate. Exact pack Solaray Vitamin E, Dry 165 Mg (200 Iu) (100ct). SKU 076280041712. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280008562",
    productName: "Solaray MSM & Glucosamine (180ct)",
    formulaId: "solaray-b117-076280008562",
    form: "capsule",
    actives: [
      { name: "MSM & Glucosamine", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/msm-glucosamine other-ingredients: Vegetable Cellulose Capsule, Silica, Magnesium Stearate and Cellulose. Exact pack Solaray MSM & Glucosamine (180ct). SKU 076280008562. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013801",
    productName: "Solaray Marshmallow 480mg (100ct)",
    formulaId: "solaray-b117-076280013801",
    form: "capsule",
    actives: [
      { name: "Marshmallow 480mg", strength: "480 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/marshmallow other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Marshmallow 480mg (100ct). SKU 076280013801. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280192766",
    productName: "Solaray Feverfew Leaf 455mg (100ct)",
    formulaId: "solaray-b117-076280192766",
    form: "capsule",
    actives: [
      { name: "Feverfew Leaf 455mg", strength: "455 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/organically-gro-feverfew-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Feverfew Leaf 455mg (100ct). SKU 076280192766. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280016314",
    productName: "Solaray Valerian Root 470mg (180ct)",
    formulaId: "solaray-b117-076280016307",
    form: "capsule",
    actives: [
      { name: "Valerian Root 470mg", strength: "470 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/valerian-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Valerian Root 470mg (180ct). SKU 076280016314. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280001808",
    productName: "Solaray Black Walnut Hull 500mg (100 ct)",
    formulaId: "solaray-b117-076280001808",
    form: "capsule",
    actives: [
      { name: "Black Walnut Hull 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/black-walnut-hull other-ingredients: Vegetable Cellulose Capsule and Rice Bran Extract. Exact pack Solaray Black Walnut Hull 500mg (100 ct). SKU 076280001808. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280791433",
    productName: "Solaray Org Grwn Frmtd Beet Root 500mg (100ct)",
    formulaId: "solaray-b117-076280791433",
    form: "capsule",
    actives: [
      { name: "Org Grwn Frmtd Beet Root 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/org-grwn-frmtd-beet-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Org Grwn Frmtd Beet Root 500mg (100ct). SKU 076280791433. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280103694",
    productName: "Solaray Celery Seed Extract 100mg (30ct)",
    formulaId: "solaray-b117-076280103694",
    form: "capsule",
    actives: [
      { name: "Celery Seed Extract 100mg", strength: "100 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/celery-seed-extract other-ingredients: Vegetable Cellulose Capsule, Cellulose, Silica and Rice Bran Extract. Exact pack Solaray Celery Seed Extract 100mg (30ct). SKU 076280103694. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280131734",
    productName: "Solaray L-Theanine 200mg (90ct)",
    formulaId: "solaray-b117-076280131734",
    form: "capsule",
    actives: [
      { name: "L-Theanine 200mg", strength: "200 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-theanine other-ingredients: Vegetable Cellulose Capsule, Rice Bran Extract and Cellulose. Exact pack Solaray L-Theanine 200mg (90ct). SKU 076280131734. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012446",
    productName: "Solaray Echinacea Root & Goldenseal Root 500mg (100ct)",
    formulaId: "solaray-b117-076280012446",
    form: "capsule",
    actives: [
      { name: "Echinacea Root & Goldenseal Root 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/echinacea-root-goldenseal-root other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, and Rice Bran Extract. Exact pack Solaray Echinacea Root & Goldenseal Root 500mg (100ct). SKU 076280012446. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280016703",
    productName: "Solaray Wild Yam Root 400mg (100ct)",
    formulaId: "solaray-b117-076280016703",
    form: "capsule",
    actives: [
      { name: "Wild Yam Root 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/wild-yam-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Wild Yam Root 400mg (100ct). SKU 076280016703. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280206777",
    productName: "Solaray Berberine Root Extract 250mg (60ct)",
    formulaId: "solaray-b117-076280206777",
    form: "capsule",
    actives: [
      { name: "Berberine Root Extract 250mg", strength: "250 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/berberine-root-extract-advanced-formula other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate. Exact pack Solaray Berberine Root Extract 250mg (60ct). SKU 076280206777. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280261691",
    productName: "Solaray CoQ-10 (30ct / 200 mg)",
    formulaId: "solaray-b117-076280261691",
    form: "capsule",
    actives: [
      { name: "CoQ-10", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/coq-10 other-ingredients: Vegetable Cellulose Capsule, Silica, Cellulose, and Magnesium Stearate. Exact pack Solaray CoQ-10 (30ct / 200 mg). SKU 076280261691. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012804",
    productName: "Solaray Fo-Ti Root 610mg (100ct)",
    formulaId: "solaray-b117-076280012804",
    form: "capsule",
    actives: [
      { name: "Fo-Ti Root 610mg", strength: "610 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/fo-ti-root other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, and Organic Rice Extract Blend. Exact pack Solaray Fo-Ti Root 610mg (100ct). SKU 076280012804. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280884616",
    productName: "Solaray DHEA (60ct)",
    formulaId: "solaray-b117-076280884616",
    form: "capsule",
    actives: [
      { name: "DHEA", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/dhea other-ingredients: Cellulose, Gelatin Capsule, Silica, and Magnesium Stearate. Exact pack Solaray DHEA (60ct). SKU 076280884616. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012712",
    productName: "Solaray Fenugreek Seed 1240mg (180ct)",
    formulaId: "solaray-b117-076280012705",
    form: "capsule",
    actives: [
      { name: "Fenugreek Seed 1240mg", strength: "1240 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/fenugreek-seed other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Fenugreek Seed 1240mg (180ct). SKU 076280012712. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013900",
    productName: "Solaray Mullein Leaf 330mg (100ct)",
    formulaId: "solaray-b117-076280013900",
    form: "capsule",
    actives: [
      { name: "Mullein Leaf 330mg", strength: "330 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mullein-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Mullein Leaf 330mg (100ct). SKU 076280013900. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280193701",
    productName: "Solaray Licorice Root 900mg (100ct)",
    formulaId: "solaray-b117-076280193701",
    form: "capsule",
    actives: [
      { name: "Licorice Root 900mg", strength: "900 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/organically-grow-licorice-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Licorice Root 900mg (100ct). SKU 076280193701. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280037975",
    productName: "Solaray Tribulus Fruit Extract 450mg (60ct)",
    formulaId: "solaray-b117-076280037975",
    form: "capsule",
    actives: [
      { name: "Tribulus Fruit Extract 450mg", strength: "450 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/tribulus-fruit-extract other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Tribulus Fruit Extract 450mg (60ct). SKU 076280037975. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280494167",
    productName: "Solaray Bergamot Extract 500mg (60ct)",
    formulaId: "solaray-b117-076280494167",
    form: "capsule",
    actives: [
      { name: "Bergamot Extract 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bergamot-advanced-formula-cardiovasular-support other-ingredients: Vegetable Cellulose Capsule and Maltodextrin. Exact pack Solaray Bergamot Extract 500mg (60ct). SKU 076280494167. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015522",
    productName: "Solaray Saw Palmetto Berry 580mg (360ct)",
    formulaId: "solaray-b117-076280015492",
    form: "capsule",
    actives: [
      { name: "Saw Palmetto Berry 580mg", strength: "580 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/saw-palmetto-berry other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Saw Palmetto Berry 580mg (360ct). SKU 076280015522. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049404",
    productName: "Solaray L-Lysine, Free Form 500mg (60ct)",
    formulaId: "solaray-b117-076280049404",
    form: "capsule",
    actives: [
      { name: "L-Lysine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-lysine-free-form other-ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend and Cellulose. Exact pack Solaray L-Lysine, Free Form 500mg (60ct). SKU 076280049404. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280895049",
    productName: "Solaray Magnesium Glycinate 350mg (240ct)",
    formulaId: "solaray-b117-076280549010",
    form: "capsule",
    actives: [
      { name: "Magnesium Glycinate 350mg", strength: "350 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/magnesium-glycinate other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Cellulose and Silica. Exact pack Solaray Magnesium Glycinate 350mg (240ct). SKU 076280895049. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013764",
    productName: "Solaray Maca Root 525mg (100ct)",
    formulaId: "solaray-b117-076280013764",
    form: "capsule",
    actives: [
      { name: "Maca Root 525mg", strength: "525 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/maca-root-525mg other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Maca Root 525mg (100ct). SKU 076280013764. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280367386",
    productName: "Solaray Org Grown Fermented Turkey Tail 1000mg (60ct)",
    formulaId: "solaray-b117-076280367386",
    form: "capsule",
    actives: [
      { name: "Org Grown Fermented Turkey Tail 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/org-grown-fermented-turkey-tail other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Org Grown Fermented Turkey Tail 1000mg (60ct). SKU 076280367386. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049718",
    productName: "Solaray L-Phenylalanine, Free Form 500mg (60ct)",
    formulaId: "solaray-b117-076280049718",
    form: "capsule",
    actives: [
      { name: "L-Phenylalanine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-phenylalanine-free-form other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray L-Phenylalanine, Free Form 500mg (60ct). SKU 076280049718. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012439",
    productName: "Solaray Echinacea Purpurea & Angustifo 460mg (100ct)",
    formulaId: "solaray-b117-076280012439",
    form: "capsule",
    actives: [
      { name: "Echinacea Purpurea & Angustifo 460mg", strength: "460 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/echinacea-purpurea-angustifo other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Rice Bran Extract. Exact pack Solaray Echinacea Purpurea & Angustifo 460mg (100ct). SKU 076280012439. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280134179",
    productName: "Solaray Astragalus Root 400mg (180ct)",
    formulaId: "solaray-b117-076280001303",
    form: "capsule",
    actives: [
      { name: "Astragalus Root 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/astragalus-root other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Astragalus Root 400mg (180ct). SKU 076280134179. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280381696",
    productName: "Solaray DIM Supreme 100mg (60ct)",
    formulaId: "solaray-b117-076280381696",
    form: "capsule",
    actives: [
      { name: "DIM Supreme 100mg", strength: "100 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/dim-supreme other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate and Silica. Exact pack Solaray DIM Supreme 100mg (60ct). SKU 076280381696. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280016901",
    productName: "Solaray Yarrow Aerial 320mg (100ct)",
    formulaId: "solaray-b117-076280016901",
    form: "capsule",
    actives: [
      { name: "Yarrow Aerial 320mg", strength: "320 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/yarrow-aerial other-ingredients: Vegetable Cellulose Capsule, Cellulose. Exact pack Solaray Yarrow Aerial 320mg (100ct). SKU 076280016901. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280512519",
    productName: "Solaray Libido Support (30ct)",
    formulaId: "solaray-b117-076280512519",
    form: "capsule",
    actives: [
      { name: "Libido Support", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/libido-support other-ingredients: Vegetable Cellulose Capsule, Maltodextrin, Cellulose, and Silica. Exact pack Solaray Libido Support (30ct). SKU 076280512519. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280446852",
    productName: "Solaray Quercetin 500mg (90ct)",
    formulaId: "solaray-b117-076280446852",
    form: "capsule",
    actives: [
      { name: "Quercetin 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/quercetin other-ingredients: Vegetable Cellulose Capsule, Silica, Stearic Acid and Cellulose. Exact pack Solaray Quercetin 500mg (90ct). SKU 076280446852. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280366686",
    productName: "Solaray L-5-HTP with Vitamin B-6 & C, 100mg (60ct)",
    formulaId: "solaray-b117-076280366686",
    form: "capsule",
    actives: [
      { name: "L-5-HTP with Vitamin B-6 & C, 100mg", strength: "100 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-5-htp-with-vitamin-b-6-c other-ingredients: Vegetable Cellulose Capsule, Cellulose and Magnesium Stearate. Exact pack Solaray L-5-HTP with Vitamin B-6 & C, 100mg (60ct). SKU 076280366686. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280031126",
    productName: "Solaray Bilberry Extract 160mg (30ct)",
    formulaId: "solaray-b117-076280031126",
    form: "capsule",
    actives: [
      { name: "Bilberry Extract 160mg", strength: "160 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bilberry-extract-one-daily other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Bilberry Extract 160mg (30ct). SKU 076280031126. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280837643",
    productName: "Solaray Matcha Green Tea 300mg (100ct)",
    formulaId: "solaray-b117-076280837643",
    form: "capsule",
    actives: [
      { name: "Matcha Green Tea 300mg", strength: "300 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/org-grwn-matcha-green-tea other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Matcha Green Tea 300mg (100ct). SKU 076280837643. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280905786",
    productName: "Solaray Super Multidophilus 24 Strain Probiotic, 30 Billion Cfu (60ct)",
    formulaId: "solaray-b117-076280905786",
    form: "capsule",
    actives: [
      { name: "Super Multidophilus 24 Strain Probiotic, 30 Billion Cfu", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/super-multidophilus-24-strain-probiotic-30-billion-cfu other-ingredients: Vegetable Cellulose Capsule, Cellulose, Organic Rice Extract Blend and Silica. Exact pack Solaray Super Multidophilus 24 Strain Probiotic, 30 Billion Cfu (60ct). SKU 076280905786. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280045789",
    productName: "Solaray Tetra-Boron 3mg (100ct)",
    formulaId: "solaray-b117-076280045789",
    form: "tablet",
    actives: [
      { name: "Tetra-Boron 3mg", strength: "3 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/tetra-boron other-ingredients: Cellulose, Stearic Acid and Magnesium Stearate. Exact pack Solaray Tetra-Boron 3mg (100ct). SKU 076280045789. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280118360",
    productName: "Solaray Cinnamon Bark Extract 300mg (60ct)",
    formulaId: "solaray-b117-076280118360",
    form: "capsule",
    actives: [
      { name: "Cinnamon Bark Extract 300mg", strength: "300 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cinnamon-bark-extract other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Silica. Exact pack Solaray Cinnamon Bark Extract 300mg (60ct). SKU 076280118360. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011272",
    productName: "Solaray Catuaba Bark 930mg (100ct)",
    formulaId: "solaray-b117-076280011272",
    form: "capsule",
    actives: [
      { name: "Catuaba Bark 930mg", strength: "930 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/catuaba-bark other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Catuaba Bark 930mg (100ct). SKU 076280011272. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280044201",
    productName: "Solaray Vitamin C With Bioflavonoid Complex 500mg (100ct)",
    formulaId: "solaray-b117-076280044201",
    form: "capsule",
    actives: [
      { name: "Vitamin C With Bioflavonoid Complex 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Acacia", "cleared", "acacia"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-with-bioflavonoid-complex-buffered other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Acacia. Exact pack Solaray Vitamin C With Bioflavonoid Complex 500mg (100ct). SKU 076280044201. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014303",
    productName: "Solaray Passion Flower Aerial 700mg (100ct)",
    formulaId: "solaray-b117-076280014303",
    form: "capsule",
    actives: [
      { name: "Passion Flower Aerial 700mg", strength: "700 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/passion-flower-aerial other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Passion Flower Aerial 700mg (100ct). SKU 076280014303. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014600",
    productName: "Solaray Psyllium Husk 525mg (100ct)",
    formulaId: "solaray-b117-076280014600",
    form: "capsule",
    actives: [
      { name: "Psyllium Husk 525mg", strength: "525 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/psyllium-husk other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Psyllium Husk 525mg (100ct). SKU 076280014600. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012361",
    productName: "Solaray Dong Quai Root 550mg (180ct)",
    formulaId: "solaray-b117-076280012354",
    form: "capsule",
    actives: [
      { name: "Dong Quai Root 550mg", strength: "550 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/dong-quai-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Dong Quai Root 550mg (180ct). SKU 076280012361. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280043211",
    productName: "Solaray Lipotropic + 1000 (100ct)",
    formulaId: "solaray-b117-076280043211",
    form: "capsule",
    actives: [
      { name: "Lipotropic + 1000", strength: "label serving" }
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/lipotropic-1000 other-ingredients: Whole Rice Concentrate, Gelatin Capsule, Magnesium Stearate and Silica. Exact pack Solaray Lipotropic + 1000 (100ct). SKU 076280043211. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280683073",
    productName: "Solaray Mycrobiome Complete Probiotic Women's (30ct)",
    formulaId: "solaray-b117-076280683073",
    form: "capsule",
    actives: [
      { name: "Mycrobiome Complete Probiotic Women's", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mycrobiome-complete-womens other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica. Exact pack Solaray Mycrobiome Complete Probiotic Women's (30ct). SKU 076280683073. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280136517",
    productName: "Solaray Kelp Seaweed 550mg (180ct)",
    formulaId: "solaray-b117-076280136517",
    form: "capsule",
    actives: [
      { name: "Kelp Seaweed 550mg", strength: "550 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/kelp-seaweed other-ingredients: Vegetable Cellulose Capsule, Rice Bran Extract and Cellulose. Exact pack Solaray Kelp Seaweed 550mg (180ct). SKU 076280136517. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280036886",
    productName: "Solaray Mastic Gum Extract 1000mg (45ct)",
    formulaId: "solaray-b117-076280036886",
    form: "capsule",
    actives: [
      { name: "Mastic Gum Extract 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mastic-gum-extract other-ingredients: Maltodextrin, Vegetable Cellulose Capsule, Silica, Magnesium Stearate and Cellulose. Exact pack Solaray Mastic Gum Extract 1000mg (45ct). SKU 076280036886. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015058",
    productName: "Solaray Reishi Mushroom 600mg (100ct)",
    formulaId: "solaray-b117-076280015058",
    form: "capsule",
    actives: [
      { name: "Reishi Mushroom 600mg", strength: "600 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/reishi-mushroom other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Reishi Mushroom 600mg (100ct). SKU 076280015058. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280109054",
    productName: "Solaray Once Daily High Energy Multivitamin, Iron-Free (120ct)",
    formulaId: "solaray-b117-076280109054",
    form: "capsule",
    actives: [
      { name: "Once Daily High Energy Multivitamin, Iron-Free", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/once-daily-high-energy-multi-vitamin-iron-free-two-stage-timed-release other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Silica. Exact pack Solaray Once Daily High Energy Multivitamin, Iron-Free (120ct). SKU 076280109054. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280044324",
    productName: "Solaray Vitamin C & Bioflavonoids 1:1 500mg (100ct)",
    formulaId: "solaray-b117-076280044324",
    form: "capsule",
    actives: [
      { name: "Vitamin C & Bioflavonoids 1:1 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-bioflavonoids-1-1 other-ingredients: Vegetable Cellulose Capsule, Cellulose and Magnesium Stearate. Exact pack Solaray Vitamin C & Bioflavonoids 1:1 500mg (100ct). SKU 076280044324. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280016208",
    productName: "Solaray Uva Ursi Leaf 460mg (100ct)",
    formulaId: "solaray-b117-076280016208",
    form: "capsule",
    actives: [
      { name: "Uva Ursi Leaf 460mg", strength: "460 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/uva-ursi-leaf other-ingredients: Vegetable Cellulose Capsule and Rice Bran Extract. Exact pack Solaray Uva Ursi Leaf 460mg (100ct). SKU 076280016208. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280398120",
    productName: "Solaray Blood Glucose Success (90 ct)",
    formulaId: "solaray-b117-076280398120",
    form: "capsule",
    actives: [
      { name: "Blood Glucose Success", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/blood-glucose-success other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate and Silica. Exact pack Solaray Blood Glucose Success (90 ct). SKU 076280398120. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014105",
    productName: "Solaray Nettle Leaf 900mg (100ct)",
    formulaId: "solaray-b117-076280014105",
    form: "capsule",
    actives: [
      { name: "Nettle Leaf 900mg", strength: "900 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/nettle-leaf other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Nettle Leaf 900mg (100ct). SKU 076280014105. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012002",
    productName: "Solaray Damiana Leaf 370mg (100ct)",
    formulaId: "solaray-b117-076280012002",
    form: "capsule",
    actives: [
      { name: "Damiana Leaf 370mg", strength: "370 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/damiana-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Damiana Leaf 370mg (100ct). SKU 076280012002. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014204",
    productName: "Solaray Parsley Leaf 860mg (100ct)",
    formulaId: "solaray-b117-076280014204",
    form: "capsule",
    actives: [
      { name: "Parsley Leaf 860mg", strength: "860 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/parsley-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Parsley Leaf 860mg (100ct). SKU 076280014204. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280737998",
    productName: "Solaray Collagen Keratin (60ct)",
    formulaId: "solaray-b117-076280737998",
    form: "capsule",
    actives: [
      { name: "Collagen Keratin", strength: "label serving" }
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/collagen-keratin other-ingredients: Gelatin Capsule, Magnesium Stearate, Silica and Cellulose. Exact pack Solaray Collagen Keratin (60ct). SKU 076280737998. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280350074",
    productName: "Solaray Total Cleanse Uric Acid (60)",
    formulaId: "solaray-b117-076280350074",
    form: "capsule",
    actives: [
      { name: "Total Cleanse Uric Acid", strength: "label serving" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/total-cleanse-uric-acid other-ingredients: Maltodextrin, Vegetable Cellulose Capsule, Cellulose, Silica and Magnesium Stearate. Exact pack Solaray Total Cleanse Uric Acid (60). SKU 076280350074. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015539",
    productName: "Solaray St. John's Wort Aerial 325mg (100ct)",
    formulaId: "solaray-b117-076280015539",
    form: "capsule",
    actives: [
      { name: "St. John's Wort Aerial 325mg", strength: "325 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/st-johns-wort-aerial other-ingredients: Vegetable Cellulose Capsule and Silica. Exact pack Solaray St. John's Wort Aerial 325mg (100ct). SKU 076280015539. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280832433",
    productName: "Solaray Phosphatidylserine Plus (60ct)",
    formulaId: "solaray-b117-076280832433",
    form: "capsule",
    actives: [
      { name: "Phosphatidylserine Plus", strength: "label serving" }
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Modified Food Starch", "limited", "modStarch"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Modified Food Starch, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/phosphatidylserine-plus other-ingredients: Whole Rice Concentrate, Gelatin Capsule, Modified Food Starch, Magnesium Stearate and Silica. Exact pack Solaray Phosphatidylserine Plus (60ct). SKU 076280832433. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280036589",
    productName: "Solaray Green Tea Leaf Extract 250mg (30ct)",
    formulaId: "solaray-b117-076280036589",
    form: "capsule",
    actives: [
      { name: "Green Tea Leaf Extract 250mg", strength: "250 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/green-tea-leaf-extract other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Green Tea Leaf Extract 250mg (30ct). SKU 076280036589. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280366624",
    productName: "Solaray Huperzine A - 50mcg (60ct)",
    formulaId: "solaray-b117-076280366624",
    form: "capsule",
    actives: [
      { name: "Huperzine A - 50mcg", strength: "50 mcg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/huperzine-a other-ingredients: Vegetable Cellulose Capsule, Cellulose, Maltodextrin, Silica, and Magnesium Stearate. Exact pack Solaray Huperzine A - 50mcg (60ct). SKU 076280366624. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014136",
    productName: "Solaray Olive Leaf 410mg (100ct)",
    formulaId: "solaray-b117-076280014136",
    form: "capsule",
    actives: [
      { name: "Olive Leaf 410mg", strength: "410 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/olive-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Olive Leaf 410mg (100ct). SKU 076280014136. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280137996",
    productName: "Solaray Sea Buckthorn Berry 600mg (100ct)",
    formulaId: "solaray-b117-076280137996",
    form: "capsule",
    actives: [
      { name: "Sea Buckthorn Berry 600mg", strength: "600 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/sea-buckthorn-berry other-ingredients: Vegetable Cellulose Capsule, Cellulose, Organic Rice Extract Blend and Silica. Exact pack Solaray Sea Buckthorn Berry 600mg (100ct). SKU 076280137996. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280008623",
    productName: "Solaray MSM 750mg (90 ct)",
    formulaId: "solaray-b117-076280008623",
    form: "capsule",
    actives: [
      { name: "MSM 750mg", strength: "750 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/msm other-ingredients: Vegetable Cellulose Capsule, Silica and Magnesium Stearate. Exact pack Solaray MSM 750mg (90 ct). SKU 076280008623. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280085204",
    productName: "Solaray Grapefruit Seed Extract 250mg (60ct)",
    formulaId: "solaray-b117-076280085204",
    form: "capsule",
    actives: [
      { name: "Grapefruit Seed Extract 250mg", strength: "250 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/grapefruit-seed-extract other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Silica and Cellulose. Exact pack Solaray Grapefruit Seed Extract 250mg (60ct). SKU 076280085204. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280366655",
    productName: "Solaray 5-HTP 100mg (30ct)",
    formulaId: "solaray-b117-076280366655",
    form: "capsule",
    actives: [
      { name: "5-HTP 100mg", strength: "100 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/5-htp other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray 5-HTP 100mg (30ct). SKU 076280366655. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011210",
    productName: "Solaray Cascara Sagrada Bark 450mg (180ct)",
    formulaId: "solaray-b117-076280011203",
    form: "capsule",
    actives: [
      { name: "Cascara Sagrada Bark 450mg", strength: "450 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cascara-sagrada-bark other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Cascara Sagrada Bark 450mg (180ct). SKU 076280011210. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280577013",
    productName: "Solaray Irish Sea Moss (100 ct)",
    formulaId: "solaray-b117-076280577013",
    form: "capsule",
    actives: [
      { name: "Irish Sea Moss", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/irish-sea-moss other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Irish Sea Moss (100 ct). SKU 076280577013. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280386875",
    productName: "Solaray Fermented Ginger Root 400mg (100ct)",
    formulaId: "solaray-b117-076280386875",
    form: "capsule",
    actives: [
      { name: "Fermented Ginger Root 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/org-grwn-frmtd-ginger-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Fermented Ginger Root 400mg (100ct). SKU 076280386875. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280387353",
    productName: "Solaray Fermented Chaga Mushroom 1000mg (60ct)",
    formulaId: "solaray-b117-076280387353",
    form: "capsule",
    actives: [
      { name: "Fermented Chaga Mushroom 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/fermented-chaga-mushroom other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Fermented Chaga Mushroom 1000mg (60ct). SKU 076280387353. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014181",
    productName: "Solaray Avena Sativa 350mg (100ct)",
    formulaId: "solaray-b117-076280014181",
    form: "capsule",
    actives: [
      { name: "Avena Sativa 350mg", strength: "350 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/avena-sativa-stem other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Cellulose and Silica. Exact pack Solaray Avena Sativa 350mg (100ct). SKU 076280014181. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280499674",
    productName: "Solaray SharpMind Nootropics Focus (30 ct)",
    formulaId: "solaray-b117-076280499674",
    form: "capsule",
    actives: [
      { name: "SharpMind Nootropics Focus", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/sharpmind-nootropics-focus other-ingredients: Vegetable Cellulose Capsule, Cellulose, Stearic Acid and Silica. Exact pack Solaray SharpMind Nootropics Focus (30 ct). SKU 076280499674. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280081589",
    productName: "Solaray Glucosamine, Chondroitin w/ Hyaluronic Acid (90ct)",
    formulaId: "solaray-b117-076280081589",
    form: "capsule",
    actives: [
      { name: "Glucosamine, Chondroitin w/ Hyaluronic Acid", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/glucosamine-chondroitin-w-hyaluronic-acid other-ingredients: Vegetable Cellulose Capsule, Silica and Magnesium Stearate. Exact pack Solaray Glucosamine, Chondroitin w/ Hyaluronic Acid (90ct). SKU 076280081589. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280008609",
    productName: "Solaray Activated Charcoal 280mg (90ct)",
    formulaId: "solaray-b117-076280008609",
    form: "capsule",
    actives: [
      { name: "Activated Charcoal 280mg", strength: "280 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/activated-charcoal-coconut-source other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Activated Charcoal 280mg (90ct). SKU 076280008609. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048162",
    productName: "Solaray Betaine HCl with Pepsin 250mg (180ct)",
    formulaId: "solaray-b117-076280048162",
    form: "capsule",
    actives: [
      { name: "Betaine HCl with Pepsin 250mg", strength: "250 mg" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/betaine-hcl-with-pepsin other-ingredients: Maltodextrin, Vegetable Cellulose Capsule, and Magnesium Stearate. Exact pack Solaray Betaine HCl with Pepsin 250mg (180ct). SKU 076280048162. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280574197",
    productName: "Solaray Liposomal Vitamin C (100ct)",
    formulaId: "solaray-b117-076280574197",
    form: "capsule",
    actives: [
      { name: "Liposomal Vitamin C", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/liposomal-vitamin-c other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate and Silica. Exact pack Solaray Liposomal Vitamin C (100ct). SKU 076280574197. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280553307",
    productName: "Solaray Liposomal NAD+ (60ct)",
    formulaId: "solaray-b117-076280553307",
    form: "capsule",
    actives: [
      { name: "Liposomal NAD+", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Sunflower Lecithin", "cleared", "lecithin"],
      ["Acacia Gum", "cleared", "acacia"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/liposomal-nad other-ingredients: Cellulose, Vegetable Cellulose Capsule, Sunflower Lecithin, Acacia Gum, Stearic Acid, and Silica. Exact pack Solaray Liposomal NAD+ (60ct). SKU 076280553307. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280429077",
    productName: "Solaray Fucoxanthin, Kombu Seaweed Ext 200mg (30ct)",
    formulaId: "solaray-b117-076280429077",
    form: "capsule",
    actives: [
      { name: "Fucoxanthin, Kombu Seaweed Ext 200mg", strength: "200 mg" }
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/fucoxanthin-kombu-seaweed-ext other-ingredients: Whole Rice Concentrate, Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray Fucoxanthin, Kombu Seaweed Ext 200mg (30ct). SKU 076280429077. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014051",
    productName: "Solaray Neem Leaf 460mg (100ct)",
    formulaId: "solaray-b117-076280014051",
    form: "capsule",
    actives: [
      { name: "Neem Leaf 460mg", strength: "460 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/neem-leaf other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Neem Leaf 460mg (100ct). SKU 076280014051. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280352818",
    productName: "Solaray L-Lysine Monolaurin 1:1 Ratio (60ct)",
    formulaId: "solaray-b117-076280352818",
    form: "capsule",
    actives: [
      { name: "L-Lysine Monolaurin 1:1 Ratio", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-lysine-monolaurin-1-1-ratio other-ingredients: Vegetable Cellulose Capsule, Cellulose, Silica and Magnesium Stearate. Exact pack Solaray L-Lysine Monolaurin 1:1 Ratio (60ct). SKU 076280352818. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280846522",
    productName: "Solaray Super Resveratrol with Pterostilbene, 255mg (30ct)",
    formulaId: "solaray-b117-076280846522",
    form: "capsule",
    actives: [
      { name: "Super Resveratrol with Pterostilbene, 255mg", strength: "255 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/super-resveratrol-with-pterostilbene other-ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray Super Resveratrol with Pterostilbene, 255mg (30ct). SKU 076280846522. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280044515",
    productName: "Solaray Vitamin C with Rose Hips & Acerola 1000mg (250 ct)",
    formulaId: "solaray-b117-076280044508",
    form: "capsule",
    actives: [
      { name: "Vitamin C with Rose Hips & Acerola 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-with-rose-hips-acerola-timed-release-1000mg-vegcap other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Stearic Acid and Silica. Exact pack Solaray Vitamin C with Rose Hips & Acerola 1000mg (250 ct). SKU 076280044515. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280458954",
    productName: "Solaray Chromium Picolinate 500mcg (60ct)",
    formulaId: "solaray-b117-076280458954",
    form: "tablet",
    actives: [
      { name: "Chromium Picolinate 500mcg", strength: "500 mcg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Croscarmellose Sodium", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/chromium-picolinate-500mcg other-ingredients: Cellulose, Stearic Acid, Croscarmellose Sodium and Magnesium Stearate. Exact pack Solaray Chromium Picolinate 500mcg (60ct). SKU 076280458954. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280034707",
    productName: "Solaray Garlic Bulb Extract, Odor-Free 500mg (60ct)",
    formulaId: "solaray-b117-076280034707",
    form: "capsule",
    actives: [
      { name: "Garlic Bulb Extract, Odor-Free 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/garlic-bulb-extract-odor-free other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Garlic Bulb Extract, Odor-Free 500mg (60ct). SKU 076280034707. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014150",
    productName: "Solaray Oregon Grape Root 400mg (100ct)",
    formulaId: "solaray-b117-076280014150",
    form: "capsule",
    actives: [
      { name: "Oregon Grape Root 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/oregon-grape-root other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Oregon Grape Root 400mg (100ct). SKU 076280014150. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013504",
    productName: "Solaray Horsetail Aerial 880mg (100ct)",
    formulaId: "solaray-b117-076280013504",
    form: "capsule",
    actives: [
      { name: "Horsetail Aerial 880mg", strength: "880 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/horsetail-aerial other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Horsetail Aerial 880mg (100ct). SKU 076280013504. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280043693",
    productName: "Solaray PABA, Timed-Release 700mg (100ct)",
    formulaId: "solaray-b117-076280043693",
    form: "capsule",
    actives: [
      { name: "PABA, Timed-Release 700mg", strength: "700 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/paba-timed-release other-ingredients: Vegetable Cellulose Capsule, Stearic Acid, Silica and Magnesium Stearate. Exact pack Solaray PABA, Timed-Release 700mg (100ct). SKU 076280043693. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012422",
    productName: "Solaray Echinacea Purpurea Root 440mg (100 ct)",
    formulaId: "solaray-b117-076280012422",
    form: "capsule",
    actives: [
      { name: "Echinacea Purpurea Root 440mg", strength: "440 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/echinacea-purpurea-root other-ingredients: Vegetable Cellulose Capsule and Silica. Exact pack Solaray Echinacea Purpurea Root 440mg (100 ct). SKU 076280012422. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280397260",
    productName: "Solaray DAO Enzyme (90ct)",
    formulaId: "solaray-b117-076280363180",
    form: "capsule",
    actives: [
      { name: "DAO Enzyme", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/dao-enzyme other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica. Exact pack Solaray DAO Enzyme (90ct). SKU 076280397260. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013122",
    productName: "Solaray Korean Ginseng Root 550mg (50 ct)",
    formulaId: "solaray-b117-076280013122",
    form: "capsule",
    actives: [
      { name: "Korean Ginseng Root 550mg", strength: "550 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/korean-ginseng-root other-ingredients: Vegetable Cellulose Capsule and Rice Bran Extract. Exact pack Solaray Korean Ginseng Root 550mg (50 ct). SKU 076280013122. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280572322",
    productName: "Solaray NAC N-Acetyl-L-Cysteine Supplement, 600 mg | 60 Count",
    formulaId: "solaray-b117-076280572322",
    form: "capsule",
    actives: [
      { name: "NAC N-Acetyl-L-Cysteine Supplement, 600 mg | 60 Count", strength: "600 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/solaray-nac-n-acetyl-l-cysteine-supplement-600-mg-60-count other-ingredients: Cellulose, Vegetable Cellulose Capsule, Organic Rice Extract Blend, Stearic Acid, Magnesium Stearate and Silica. Exact pack Solaray NAC N-Acetyl-L-Cysteine Supplement, 600 mg | 60 Count. SKU 076280572322. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280366600",
    productName: "Solaray CircuLegs, Circulation Support (120ct)",
    formulaId: "solaray-b117-076280366600",
    form: "capsule",
    actives: [
      { name: "CircuLegs, Circulation Support", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/circulegs-circulation-support other-ingredients: Vegetable Cellulose Capsule, Cellulose, Maltodextrin, Magnesium Stearate, and Silica. Exact pack Solaray CircuLegs, Circulation Support (120ct). SKU 076280366600. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048988",
    productName: "Solaray L-Arginine, Free Form 500mg (100ct)",
    formulaId: "solaray-b117-076280048988",
    form: "capsule",
    actives: [
      { name: "L-Arginine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-arginine-free-form other-ingredients: Vegetable Cellulose Capsule, Cellulose, Organic Rice Extract Blend and Silica. Exact pack Solaray L-Arginine, Free Form 500mg (100ct). SKU 076280048988. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280044539",
    productName: "Solaray Vitamin C With Rose Hips & Acerola 1000mg (100ct)",
    formulaId: "solaray-b117-076280044539",
    form: "tablet",
    actives: [
      { name: "Vitamin C With Rose Hips & Acerola 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-with-rose-hips-acerola-timed-release-1000mg-tablet other-ingredients: Cellulose, Stearic Acid, Magnesium Stearate and Silica. Exact pack Solaray Vitamin C With Rose Hips & Acerola 1000mg (100ct). SKU 076280044539. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280398571",
    productName: "Solaray NMN (60ct)",
    formulaId: "solaray-b117-076280398571",
    form: "capsule",
    actives: [
      { name: "NMN", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/nmn other-ingredients: Vegetable Cellulose Capsule, Cellulose, Stearic Acid, and Silica. Exact pack Solaray NMN (60ct). SKU 076280398571. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280252439",
    productName: "Solaray SmartMag Magtein ® Magnesium L-Threonate (90ct)",
    formulaId: "solaray-b117-076280252439",
    form: "capsule",
    actives: [
      { name: "SmartMag Magtein ® Magnesium L-Threonate", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/smartmag-magtein-®-magnesium-l-threonate-90ct other-ingredients: Vegetable Cellulose Capsule, Stearic Acid, Cellulose, Silica. Exact pack Solaray SmartMag Magtein ® Magnesium L-Threonate (90ct). SKU 076280252439. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280083798",
    productName: "Solaray Focus for Adults (60ct)",
    formulaId: "solaray-b117-076280083798",
    form: "capsule",
    actives: [
      { name: "Focus for Adults", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/focus-for-adults other-ingredients: Vegetable Cellulose Capsule, Cellulose and Magnesium Stearate. Exact pack Solaray Focus for Adults (60ct). SKU 076280083798. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280117523",
    productName: "Solaray Deep Vein Support (60ct)",
    formulaId: "solaray-b117-076280117523",
    form: "capsule",
    actives: [
      { name: "Deep Vein Support", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/deep-vein-support other-ingredients: Vegetable Cellulose Capsule, Maltodextrin, Magnesium Stearate, and Cellulose. Exact pack Solaray Deep Vein Support (60ct). SKU 076280117523. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280375916",
    productName: "Solaray Prostate Defense (90ct)",
    formulaId: "solaray-b117-076280375916",
    form: "capsule",
    actives: [
      { name: "Prostate Defense", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/prostate-defense other-ingredients: Vegetable Cellulose Capsule, Maltodextrin, Magnesium Stearate and Cellulose. Contains: Soy. Exact pack Solaray Prostate Defense (90ct). SKU 076280375916. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011104",
    productName: "Solaray Burdock 425mg (100 ct)",
    formulaId: "solaray-b117-076280011104",
    form: "capsule",
    actives: [
      { name: "Burdock 425mg", strength: "425 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/burdock other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Rice Bran Extract. Exact pack Solaray Burdock 425mg (100 ct). SKU 076280011104. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280463552",
    productName: "Solaray Malic Acid + Magnesium (90ct)",
    formulaId: "solaray-b117-076280463552",
    form: "capsule",
    actives: [
      { name: "Malic Acid + Magnesium", strength: "label serving" }
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/malic-acid-magnesium other-ingredients: Gelatin Capsule, Cellulose and Magnesium Stearate. Exact pack Solaray Malic Acid + Magnesium (90ct). SKU 076280463552. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012897",
    productName: "Solaray Garlic Bulb 500mg (100ct)",
    formulaId: "solaray-b117-076280012897",
    form: "capsule",
    actives: [
      { name: "Garlic Bulb 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/garlic-bulb other-ingredients: Vegetable Cellulose Capsule, Rice Bran Extract, Cellulose and Silica. Exact pack Solaray Garlic Bulb 500mg (100ct). SKU 076280012897. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280399011",
    productName: "Solaray Arjuna Bark Extract (60ct)",
    formulaId: "solaray-b117-076280399011",
    form: "capsule",
    actives: [
      { name: "Arjuna Bark Extract", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/arjuna-bark-extract other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate and Silica. Exact pack Solaray Arjuna Bark Extract (60ct). SKU 076280399011. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014808",
    productName: "Solaray Red Clover Blossom 375mg (100ct)",
    formulaId: "solaray-b117-076280014808",
    form: "capsule",
    actives: [
      { name: "Red Clover Blossom 375mg", strength: "375 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/red-clover-blossom other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Red Clover Blossom 375mg (100ct). SKU 076280014808. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013788",
    productName: "Solaray Mushroom Immune Complex (100ct)",
    formulaId: "solaray-b117-076280013788",
    form: "capsule",
    actives: [
      { name: "Mushroom Immune Complex", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mushroom-immune-complex other-ingredients: Vegetable Cellulose Capsule, Silica and Magnesium Stearate. Exact pack Solaray Mushroom Immune Complex (100ct). SKU 076280013788. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280037500",
    productName: "Solaray Siliverin, Liver Cleanse (90ct)",
    formulaId: "solaray-b117-076280037500",
    form: "capsule",
    actives: [
      { name: "Siliverin, Liver Cleanse", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/siliverin-liver-cleanse other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Siliverin, Liver Cleanse (90ct). SKU 076280037500. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280497960",
    productName: "Solaray Mycrobiome Complete Probiotic Men's (30ct)",
    formulaId: "solaray-b117-076280497960",
    form: "capsule",
    actives: [
      { name: "Mycrobiome Complete Probiotic Men's", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mycrobiome-complete-probiotic-mens other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica. Exact pack Solaray Mycrobiome Complete Probiotic Men's (30ct). SKU 076280497960. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280983944",
    productName: "Solaray White Willow Bark Extract 600mg (60ct)",
    formulaId: "solaray-b117-076280983944",
    form: "capsule",
    actives: [
      { name: "White Willow Bark Extract 600mg", strength: "600 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/white-willow-bark-extract other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Cellulose. Exact pack Solaray White Willow Bark Extract 600mg (60ct). SKU 076280983944. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049312",
    productName: "Solaray L-Glutathione, Free Form 50mg (60ct)",
    formulaId: "solaray-b117-076280049312",
    form: "capsule",
    actives: [
      { name: "L-Glutathione, Free Form 50mg", strength: "50 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-glutathione-free-form other-ingredients: Vegetable Cellulose Capsule, Cellulose and Organic Rice Extract Blend. Exact pack Solaray L-Glutathione, Free Form 50mg (60ct). SKU 076280049312. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049107",
    productName: "Solaray L-Cysteine, Free Form 500mg (30 ct)",
    formulaId: "solaray-b117-076280049107",
    form: "capsule",
    actives: [
      { name: "L-Cysteine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-cysteine-free-form other-ingredients: Whole Rice Concentrate, Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray L-Cysteine, Free Form 500mg (30 ct). SKU 076280049107. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048438",
    productName: "Solaray Bromelain 1000mg (60ct)",
    formulaId: "solaray-b117-076280048438",
    form: "capsule",
    actives: [
      { name: "Bromelain 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bromelain other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica and Magnesium Stearate. Exact pack Solaray Bromelain 1000mg (60ct). SKU 076280048438. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280357547",
    productName: "Solaray Vegan Digestaway, Plant Enzyme (60ct)",
    formulaId: "solaray-b117-076280357547",
    form: "capsule",
    actives: [
      { name: "Vegan Digestaway, Plant Enzyme", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vegan-digestaway-plant-enzyme other-ingredients: Vegetable Cellulose Capsule, Maltodextrin, Magnesium Stearate and Silica. Exact pack Solaray Vegan Digestaway, Plant Enzyme (60ct). SKU 076280357547. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280113587",
    productName: "Solaray Tongkat Ali Extract (30ct)",
    formulaId: "solaray-b117-076280113587",
    form: "capsule",
    actives: [
      { name: "Tongkat Ali Extract", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/tongkat-ali-extract other-ingredients: Vegetable Cellulose Capsule, Cellulose, Stearic Acid, and Silica. Exact pack Solaray Tongkat Ali Extract (30ct). SKU 076280113587. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012408",
    productName: "Solaray Echinacea Angustifolia 450mg (100ct)",
    formulaId: "solaray-b117-076280012408",
    form: "capsule",
    actives: [
      { name: "Echinacea Angustifolia 450mg", strength: "450 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/echinacea-angustifolia other-ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray Echinacea Angustifolia 450mg (100ct). SKU 076280012408. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280031553",
    productName: "Solaray Bitter Melon Fruit Extract 10%, 500mg (30ct)",
    formulaId: "solaray-b117-076280031553",
    form: "capsule",
    actives: [
      { name: "Bitter Melon Fruit Extract 10%, 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bitter-melon-fruit-extract-10 other-ingredients: Vegetable Cellulose Capsule, Cellulose and Silica. Exact pack Solaray Bitter Melon Fruit Extract 10%, 500mg (30ct). SKU 076280031553. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280142600",
    productName: "Solaray Iodine (as Potassium Iodine) 500mcg (30 ct)",
    formulaId: "solaray-b117-076280142600",
    form: "capsule",
    actives: [
      { name: "Iodine (as Potassium Iodine) 500mcg", strength: "500 mcg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/iodine other-ingredients: Cellulose, Vegetable Cellulose Capsule, Rice Bran Extract and Silica. Exact pack Solaray Iodine (as Potassium Iodine) 500mcg (30 ct). SKU 076280142600. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015904",
    productName: "Solaray Slippery Elm Bark 400mg (100ct)",
    formulaId: "solaray-b117-076280015904",
    form: "capsule",
    actives: [
      { name: "Slippery Elm Bark 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/slippery-elm-bark other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Slippery Elm Bark 400mg (100ct). SKU 076280015904. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280625622",
    productName: "Solaray Bitter Melon Extract 5% 500mg (60ct)",
    formulaId: "solaray-b117-076280625622",
    form: "capsule",
    actives: [
      { name: "Bitter Melon Extract 5% 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bitter-melon-fruit-extract-5 other-ingredients: Vegetable Cellulose Capsule, Cellulose, Organic Rice Extract Blend and Silica. Exact pack Solaray Bitter Melon Extract 5% 500mg (60ct). SKU 076280625622. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049503",
    productName: "Solaray L-Methionine, Free Form 500mg (30ct)",
    formulaId: "solaray-b117-076280049503",
    form: "capsule",
    actives: [
      { name: "L-Methionine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-methionine-free-form other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray L-Methionine, Free Form 500mg (30ct). SKU 076280049503. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280107098",
    productName: "Solaray Indole-3 Supreme 200mg (30 ct)",
    formulaId: "solaray-b117-076280107098",
    form: "capsule",
    actives: [
      { name: "Indole-3 Supreme 200mg", strength: "200 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/indole-3-supreme other-ingredients: Vegetable Cellulose Capsule, Silica and Magnesium Stearate. Exact pack Solaray Indole-3 Supreme 200mg (30 ct). SKU 076280107098. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280082104",
    productName: "Solaray Propolis Plus, Immune System Support (90ct)",
    formulaId: "solaray-b117-076280082104",
    form: "capsule",
    actives: [
      { name: "Propolis Plus, Immune System Support", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/propolis-plus-immune-system other-ingredients: Vegetable Cellulose Capsule, Maltodextrin, Magnesium Stearate, Cellulose and Silica. Exact pack Solaray Propolis Plus, Immune System Support (90ct). SKU 076280082104. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280119923",
    productName: "Solaray Cranberry Berry 850mg (100ct)",
    formulaId: "solaray-b117-076280119923",
    form: "capsule",
    actives: [
      { name: "Cranberry Berry 850mg", strength: "850 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cranberry-berry other-ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend, Silica and Cellulose. Exact pack Solaray Cranberry Berry 850mg (100ct). SKU 076280119923. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280081510",
    productName: "Solaray Glucosamine Sulfate, Two Daily 1500mg (60ct)",
    formulaId: "solaray-b117-076280081510",
    form: "capsule",
    actives: [
      { name: "Glucosamine Sulfate, Two Daily 1500mg", strength: "1500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/glucosamine-sulfate-two-daily other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Glucosamine Sulfate, Two Daily 1500mg (60ct). SKU 076280081510. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048612",
    productName: "Solaray L-Lysine with Beta Glucan 1000mg (60ct)",
    formulaId: "solaray-b117-076280048612",
    form: "capsule",
    actives: [
      { name: "L-Lysine with Beta Glucan 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-lysine-with-beta-glucan other-ingredients: Vegetable Cellulose Capsule, Cellulose and Organic Rice Extract Blend. Exact pack Solaray L-Lysine with Beta Glucan 1000mg (60ct). SKU 076280048612. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280033625",
    productName: "Solaray Cordyceps Mushroom Extract 1000mg (60 ct)",
    formulaId: "solaray-b117-076280033625",
    form: "capsule",
    actives: [
      { name: "Cordyceps Mushroom Extract 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cordyceps-mushroom-extract other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate and Silica. Exact pack Solaray Cordyceps Mushroom Extract 1000mg (60 ct). SKU 076280033625. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280139280",
    productName: "Solaray Bean Enzyme (Alpha Galactosidase) (60 ct)",
    formulaId: "solaray-b117-076280139280",
    form: "capsule",
    actives: [
      { name: "Bean Enzyme (Alpha Galactosidase)", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bean-enzyme other-ingredients: Cellulose, Vegetable Cellulose Capsule, Maltodextrin, Stearic Acid, and Silica. Exact pack Solaray Bean Enzyme (Alpha Galactosidase) (60 ct). SKU 076280139280. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280004465",
    productName: "Solaray Red Yeast Rice 600mg (45ct)",
    formulaId: "solaray-b117-076280004465",
    form: "capsule",
    actives: [
      { name: "Red Yeast Rice 600mg", strength: "600 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/red-yeast-rice other-ingredients: Vegetable Cellulose Capsule, Silica and Magnesium Stearate. Exact pack Solaray Red Yeast Rice 600mg (45ct). SKU 076280004465. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280001303",
    productName: "Solaray Astragalus Root 400mg (100ct)",
    formulaId: "solaray-b117-076280001303",
    form: "capsule",
    actives: [
      { name: "Astragalus Root 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/astragalus-root other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Astragalus Root 400mg (100ct). SKU 076280001303. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280535754",
    productName: "Solaray Chamomile Extract (30ct)",
    formulaId: "solaray-b117-076280535754",
    form: "capsule",
    actives: [
      { name: "Chamomile Extract", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/chamomile-extract other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica. Exact pack Solaray Chamomile Extract (30ct). SKU 076280535754. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011999",
    productName: "Solaray Cordyceps Mushroom 520mg (100ct)",
    formulaId: "solaray-b117-076280011999",
    form: "capsule",
    actives: [
      { name: "Cordyceps Mushroom 520mg", strength: "520 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cordyceps-mushroom other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate and Silica. Exact pack Solaray Cordyceps Mushroom 520mg (100ct). SKU 076280011999. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280381702",
    productName: "Solaray Sage Leaf 570mg (100ct)",
    formulaId: "solaray-b117-076280381702",
    form: "capsule",
    actives: [
      { name: "Sage Leaf 570mg", strength: "570 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/organically-grown-sage-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Sage Leaf 570mg (100ct). SKU 076280381702. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280774474",
    productName: "Solaray Lycopene (30ct)",
    formulaId: "solaray-b117-076280774474",
    form: "capsule",
    actives: [
      { name: "Lycopene", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Sodium Alginate", "cleared", "alginate"],
      ["Acacia Gum", "cleared", "acacia"],
      ["Pea Starch", "limited", "peaStarch"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Pea Starch, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/lycopene-1 other-ingredients: Cellulose, Vegetable Cellulose Capsule, Sodium Alginate, Acacia Gum, Pea Starch, and Silica. Exact pack Solaray Lycopene (30ct). SKU 076280774474. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280001204",
    productName: "Solaray Aloe Vera Gel 10mg (100ct)",
    formulaId: "solaray-b117-076280001204",
    form: "capsule",
    actives: [
      { name: "Aloe Vera Gel 10mg", strength: "10 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/aloe-vera-gel other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Aloe Vera Gel 10mg (100ct). SKU 076280001204. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280846966",
    productName: "Solaray Moringa Leaf Extract 900mg (60ct)",
    formulaId: "solaray-b117-076280846966",
    form: "capsule",
    actives: [
      { name: "Moringa Leaf Extract 900mg", strength: "900 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/moringa-leaf-extract other-ingredients: Vegetable Cellulose Capsule, Cellulose, Organic Rice Extract Blend and Silica. Exact pack Solaray Moringa Leaf Extract 900mg (60ct). SKU 076280846966. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012705",
    productName: "Solaray Fenugreek Seed 1240mg (100ct)",
    formulaId: "solaray-b117-076280012705",
    form: "capsule",
    actives: [
      { name: "Fenugreek Seed 1240mg", strength: "1240 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/fenugreek-seed other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Fenugreek Seed 1240mg (100ct). SKU 076280012705. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280039504",
    productName: "Solaray EuroCalm, Mood Support Formula (60ct)",
    formulaId: "solaray-b117-076280039504",
    form: "capsule",
    actives: [
      { name: "EuroCalm, Mood Support Formula", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/eurocalm-mood-support-formula other-ingredients: Vegetable Cellulose Capsule and Maltodextrin. Exact pack Solaray EuroCalm, Mood Support Formula (60ct). SKU 076280039504. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280045215",
    productName: "Solaray Calcium & Magnesium Asporotate (120ct)",
    formulaId: "solaray-b117-076280045215",
    form: "capsule",
    actives: [
      { name: "Calcium & Magnesium Asporotate", strength: "label serving" }
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/calcium-magnesium-asporotate other-ingredients: Gelatin Capsule, Cellulose and Magnesium Stearate. Exact pack Solaray Calcium & Magnesium Asporotate (120ct). SKU 076280045215. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014907",
    productName: "Solaray Red Raspberry Leaf 400mg (100ct)",
    formulaId: "solaray-b117-076280014907",
    form: "capsule",
    actives: [
      { name: "Red Raspberry Leaf 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/red-raspberry-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Red Raspberry Leaf 400mg (100ct). SKU 076280014907. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280458916",
    productName: "Solaray Chromium Picolinate 200mcg (200 ct)",
    formulaId: "solaray-b117-076280458916",
    form: "tablet",
    actives: [
      { name: "Chromium Picolinate 200mcg", strength: "200 mcg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Croscarmellose Sodium", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/chromium-picolinate-200mcg other-ingredients: Cellulose, Stearic Acid, Croscarmellose Sodium and Magnesium Stearate. Exact pack Solaray Chromium Picolinate 200mcg (200 ct). SKU 076280458916. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280041804",
    productName: "Solaray Vitamin E, Dry 268 Mg (50ct)",
    formulaId: "solaray-b117-076280041804",
    form: "capsule",
    actives: [
      { name: "Vitamin E, Dry 268 Mg", strength: "268 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-e-dry-268-mg-400-iu other-ingredients: Cellulose, Gelatin Capsule, Silica and Magnesium Stearate. Exact pack Solaray Vitamin E, Dry 268 Mg (50ct). SKU 076280041804. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280366617",
    productName: "Solaray CircuLegs, Circulation Support (60ct)",
    formulaId: "solaray-b117-076280366600",
    form: "capsule",
    actives: [
      { name: "CircuLegs, Circulation Support", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/circulegs-circulation-support other-ingredients: Vegetable Cellulose Capsule, Cellulose, Maltodextrin, Magnesium Stearate, and Silica. Exact pack Solaray CircuLegs, Circulation Support (60ct). SKU 076280366617. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280041811",
    productName: "Solaray Vitamin E, Dry 268 Mg (100ct)",
    formulaId: "solaray-b117-076280041811",
    form: "capsule",
    actives: [
      { name: "Vitamin E, Dry 268 Mg", strength: "268 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-e-dry-268-mg-400-iu other-ingredients: Cellulose, Gelatin Capsule, Magnesium Stearate and Silica. Exact pack Solaray Vitamin E, Dry 268 Mg (100ct). SKU 076280041811. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280505139",
    productName: "Solaray Extended-Release Melatonin with L-Glycine (30 ct)",
    formulaId: "solaray-b117-076280505139",
    form: "capsule",
    actives: [
      { name: "Extended-Release Melatonin with L-Glycine", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/extended-release-melatonin other-ingredients: Vegetable Cellulose Capsule, Cellulose, Stearic Acid, and Silica. Exact pack Solaray Extended-Release Melatonin with L-Glycine (30 ct). SKU 076280505139. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280599121",
    productName: "Solaray Methyl B-Complex (60ct)",
    formulaId: "solaray-b117-076280599121",
    form: "capsule",
    actives: [
      { name: "Methyl B-Complex", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/methyl-b-complex other-ingredients: Vegetable Cellulose Capsule, Cellulose, Silica and Magnesium Stearate. Exact pack Solaray Methyl B-Complex (60ct). SKU 076280599121. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048155",
    productName: "Solaray High Potency Betaine HCl with Pepsin (250ct)",
    formulaId: "solaray-b117-076280048148",
    form: "capsule",
    actives: [
      { name: "High Potency Betaine HCl with Pepsin", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Flour", "limited", "riceFlour"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Maltodextrin", "limited", "maltodextrin"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice Flour, Maltodextrin (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/high-potency-betaine-hcl-with-pepsin other-ingredients: Vegetable Cellulose Capsule, Rice Flour, Magnesium Stearate and Maltodextrin. Exact pack Solaray High Potency Betaine HCl with Pepsin (250ct). SKU 076280048155. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280045796",
    productName: "Solaray Calcium Hydroxyapatite 1000mg (120ct)",
    formulaId: "solaray-b117-076280045796",
    form: "capsule",
    actives: [
      { name: "Calcium Hydroxyapatite 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Whole Rice Concentrate", "cleared", "riceConc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/calcium-hydroxyapatite other-ingredients: Gelatin Capsule, Magnesium Stearate and Whole Rice Concentrate. Exact pack Solaray Calcium Hydroxyapatite 1000mg (120ct). SKU 076280045796. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280832181",
    productName: "Solaray Lutein Eyes 24, Advanced 24mg (60ct)",
    formulaId: "solaray-b117-076280832181",
    form: "capsule",
    actives: [
      { name: "Lutein Eyes 24, Advanced 24mg", strength: "24 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Acacia", "cleared", "acacia"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/lutein-eyes-24-advanced other-ingredients: Cellulose, Vegetable Cellulose Capsule, Acacia, Magnesium Stearate and Silica. Exact pack Solaray Lutein Eyes 24, Advanced 24mg (60ct). SKU 076280832181. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280037036",
    productName: "Solaray Milk Thistle Seed Extract 350mg (30ct)",
    formulaId: "solaray-b117-076280037036",
    form: "capsule",
    actives: [
      { name: "Milk Thistle Seed Extract 350mg", strength: "350 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/milk-thistle-seed-extract-one-daily other-ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend, Whole Rice Concentrate and Silica. Exact pack Solaray Milk Thistle Seed Extract 350mg (30ct). SKU 076280037036. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280043570",
    productName: "Solaray Choline, Timed-Release 300mg (100ct)",
    formulaId: "solaray-b117-076280043570",
    form: "capsule",
    actives: [
      { name: "Choline, Timed-Release 300mg", strength: "300 mg" }
    ],
    flags: [
      ["Gelatin Capsule", "cleared", "gelatin"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/choline-timed-release other-ingredients: Gelatin Capsule, Stearic Acid, Silica and Magnesium Stearate. Exact pack Solaray Choline, Timed-Release 300mg (100ct). SKU 076280043570. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280192100",
    productName: "Solaray Dandelion Root 1040mg (100ct)",
    formulaId: "solaray-b117-076280192100",
    form: "capsule",
    actives: [
      { name: "Dandelion Root 1040mg", strength: "1040 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/100ct-dandelion-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Dandelion Root 1040mg (100ct). SKU 076280192100. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280627541",
    productName: "Solaray Monolaurin (60ct)",
    formulaId: "solaray-b117-076280627541",
    form: "capsule",
    actives: [
      { name: "Monolaurin", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/monolaurin-immune-system-support other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Silica. Exact pack Solaray Monolaurin (60ct). SKU 076280627541. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280221503",
    productName: "Solaray Fisetin (30ct)",
    formulaId: "solaray-b117-076280221503",
    form: "capsule",
    actives: [
      { name: "Fisetin", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/fisetin other-ingredients: Cellulose, Vegetable Cellulose Capsule, Stearic Acid, and Silica. Exact pack Solaray Fisetin (30ct). SKU 076280221503. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280032055",
    productName: "Solaray Cat's Claw Bark Extract 200mg (30ct)",
    formulaId: "solaray-b117-076280032055",
    form: "capsule",
    actives: [
      { name: "Cat's Claw Bark Extract 200mg", strength: "200 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cats-claw-bark-extract other-ingredients: Vegetable Cellulose Capsule, Whole Rice Concentrate, Organic Rice Extract Blend and Silica. Exact pack Solaray Cat's Claw Bark Extract 200mg (30ct). SKU 076280032055. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013603",
    productName: "Solaray Juniper Berry 450mg (100ct)",
    formulaId: "solaray-b117-076280013603",
    form: "capsule",
    actives: [
      { name: "Juniper Berry 450mg", strength: "450 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/juniper-berry other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Juniper Berry 450mg (100ct). SKU 076280013603. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280365108",
    productName: "Solaray PQQ + CoQ-10 (30 ct)",
    formulaId: "solaray-b117-076280365108",
    form: "capsule",
    actives: [
      { name: "PQQ + CoQ-10", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/pqq-coq-10-with-glutathione-and-nac other-ingredients: Vegetable Cellulose Capsule, Cellulose and Silica. Exact pack Solaray PQQ + CoQ-10 (30 ct). SKU 076280365108. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011340",
    productName: "Solaray Cayenne Pepper 100,000 HU - 450mg (100 ct)",
    formulaId: "solaray-b117-076280011340",
    form: "capsule",
    actives: [
      { name: "Cayenne Pepper 100,000 HU - 450mg", strength: "450 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cayenne-pepper-100000-hu other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Cayenne Pepper 100,000 HU - 450mg (100 ct). SKU 076280011340. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280036664",
    productName: "Solaray Horse Chestnut Seed Extract 400mg (60ct)",
    formulaId: "solaray-b117-076280036664",
    form: "capsule",
    actives: [
      { name: "Horse Chestnut Seed Extract 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/horse-chestnut-seed-extract other-ingredients: Vegetable Cellulose Capsule, Rice Bran Extract. Exact pack Solaray Horse Chestnut Seed Extract 400mg (60ct). SKU 076280036664. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280030846",
    productName: "Solaray Gallbladder Support Formula (90 ct)",
    formulaId: "solaray-b117-076280030846",
    form: "capsule",
    actives: [
      { name: "Gallbladder Support Formula", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Acacia Gum", "cleared", "acacia"],
      ["Silica", "limited", "sio2"],
      ["Tricalcium Phosphate", "cleared", "dical"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Maltodextrin", "limited", "maltodextrin"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica, Maltodextrin (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/gallbladder-support-formula other-ingredients: Vegetable Cellulose Capsule, Cellulose, Acacia Gum, Silica, Tricalcium Phosphate, Magnesium Stearate and Maltodextrin. Exact pack Solaray Gallbladder Support Formula (90 ct). SKU 076280030846. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280043181",
    productName: "Solaray Choline & Inositol 250mg (100ct)",
    formulaId: "solaray-b117-076280043181",
    form: "capsule",
    actives: [
      { name: "Choline & Inositol 250mg", strength: "250 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/choline-inositol other-ingredients: Cellulose, Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Choline & Inositol 250mg (100ct). SKU 076280043181. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049213",
    productName: "Solaray L-Glutamine, Free Form 500mg (100ct)",
    formulaId: "solaray-b117-076280049206",
    form: "capsule",
    actives: [
      { name: "L-Glutamine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-glutamine-free-form other-ingredients: Whole Rice Concentrate, Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray L-Glutamine, Free Form 500mg (100ct). SKU 076280049213. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280001600",
    productName: "Solaray Beet Root 605mg (100 ct)",
    formulaId: "solaray-b117-076280001600",
    form: "capsule",
    actives: [
      { name: "Beet Root 605mg", strength: "605 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/beet-root other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, Cellulose. Exact pack Solaray Beet Root 605mg (100 ct). SKU 076280001600. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280471052",
    productName: "Solaray Zinc Copper (100 ct)",
    formulaId: "solaray-b117-076280471052",
    form: "capsule",
    actives: [
      { name: "Zinc Copper", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/zinc-copper other-ingredients: Cellulose, Vegetable Cellulose Capsule, Magnesium Stearate, and Silica. Exact pack Solaray Zinc Copper (100 ct). SKU 076280471052. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280183481",
    productName: "Solaray Glycine, Free Form 1000mg (60ct)",
    formulaId: "solaray-b117-076280183481",
    form: "capsule",
    actives: [
      { name: "Glycine, Free Form 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/glycine-free-form other-ingredients: Vegetable Cellulose Capsule, Silica, and Magnesium Stearate. Exact pack Solaray Glycine, Free Form 1000mg (60ct). SKU 076280183481. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280366648",
    productName: "Solaray Indole 3 Carbinol 100mg (30 ct)",
    formulaId: "solaray-b117-076280366648",
    form: "capsule",
    actives: [
      { name: "Indole 3 Carbinol 100mg", strength: "100 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/indole-3-carbinol other-ingredients: Vegetable Cellulose Capsule and Cellulose. Exact pack Solaray Indole 3 Carbinol 100mg (30 ct). SKU 076280366648. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280550580",
    productName: "Solaray Fermented Shiitake Mushroom 1000mg (60ct)",
    formulaId: "solaray-b117-076280550580",
    form: "capsule",
    actives: [
      { name: "Fermented Shiitake Mushroom 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/fermented-shiitake-mushroom other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Fermented Shiitake Mushroom 1000mg (60ct). SKU 076280550580. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280046786",
    productName: "Solaray Selenium 200mcg, Yeast-Free (90ct)",
    formulaId: "solaray-b117-076280046786",
    form: "capsule",
    actives: [
      { name: "Selenium 200mcg, Yeast-Free", strength: "200 mcg" }
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/selenium-200-yeast-free other-ingredients: Whole Rice Concentrate, Cellulose, Vegetable Cellulose Capsule and Rice Bran Extract. Exact pack Solaray Selenium 200mcg, Yeast-Free (90ct). SKU 076280046786. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280942705",
    productName: "Solaray Zinc Picolinate (60ct)",
    formulaId: "solaray-b117-076280942705",
    form: "tablet",
    actives: [
      { name: "Zinc Picolinate", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Croscarmellose Sodium", "cleared", "mcc"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/zinc-picolinate other-ingredients: Cellulose, Croscarmellose Sodium, Stearic Acid, and Silica. Exact pack Solaray Zinc Picolinate (60ct). SKU 076280942705. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014006",
    productName: "Solaray Myrrh Gum 620mg (100ct)",
    formulaId: "solaray-b117-076280014006",
    form: "capsule",
    actives: [
      { name: "Myrrh Gum 620mg", strength: "620 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/myrrh-gum other-ingredients: Vegetable Cellulose Capsule, and Magnesium Stearate. Exact pack Solaray Myrrh Gum 620mg (100ct). SKU 076280014006. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015607",
    productName: "Solaray Blue Skullcap Aerial 425mg (100ct)",
    formulaId: "solaray-b117-076280015607",
    form: "capsule",
    actives: [
      { name: "Blue Skullcap Aerial 425mg", strength: "425 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/blue-skullcap-aerial other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Blue Skullcap Aerial 425mg (100ct). SKU 076280015607. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280014129",
    productName: "Solaray Nettle Leaf 900mg (180ct)",
    formulaId: "solaray-b117-076280014105",
    form: "capsule",
    actives: [
      { name: "Nettle Leaf 900mg", strength: "900 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/nettle-leaf other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Nettle Leaf 900mg (180ct). SKU 076280014129. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280655674",
    productName: "Solaray Cal-Mag Strontium w/D-3 & K-2 (120ct)",
    formulaId: "solaray-b117-076280655674",
    form: "capsule",
    actives: [
      { name: "Cal-Mag Strontium w/D-3 & K-2", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Citric Acid", "cleared", "citric"],
      ["Glycine", "cleared", "glycine"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cal-mag-strontium-w-d-3-k-2 other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Citric Acid, Glycine and Silica. Exact pack Solaray Cal-Mag Strontium w/D-3 & K-2 (120ct). SKU 076280655674. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280213799",
    productName: "Solaray Mycrobiome Complete Probiotic Ultimate Potency (60ct)",
    formulaId: "solaray-b117-076280213799",
    form: "capsule",
    actives: [
      { name: "Mycrobiome Complete Probiotic Ultimate Potency", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mycrobiome-complete-probiotic-urgent-care other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica. Exact pack Solaray Mycrobiome Complete Probiotic Ultimate Potency (60ct). SKU 076280213799. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011401",
    productName: "Solaray Cayenne Pepper & Garlic Bulb 540mg (100ct)",
    formulaId: "solaray-b117-076280011401",
    form: "capsule",
    actives: [
      { name: "Cayenne Pepper & Garlic Bulb 540mg", strength: "540 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cayenne-pepper-garlic-bulb other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Cayenne Pepper & Garlic Bulb 540mg (100ct). SKU 076280011401. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280302288",
    productName: "Solaray Myo + D-Chiro Inositol 40:1 (120ct)",
    formulaId: "solaray-b117-076280302288",
    form: "capsule",
    actives: [
      { name: "Myo + D-Chiro Inositol 40:1", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/myo-d-chiro-inositol-40-1 other-ingredients: Vegetable Cellulose Capsule, Cellulose, and Silica. Exact pack Solaray Myo + D-Chiro Inositol 40:1 (120ct). SKU 076280302288. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280037609",
    productName: "Solaray Pygeum Bark Extract 50mg (60ct)",
    formulaId: "solaray-b117-076280037609",
    form: "capsule",
    actives: [
      { name: "Pygeum Bark Extract 50mg", strength: "50 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/pygeum-bark-extract other-ingredients: Cellulose and Vegetable Cellulose Capsule. Exact pack Solaray Pygeum Bark Extract 50mg (60ct). SKU 076280037609. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280124446",
    productName: "Solaray Echinacea Root & Elderberry 440mg (100ct)",
    formulaId: "solaray-b117-076280124446",
    form: "capsule",
    actives: [
      { name: "Echinacea Root & Elderberry 440mg", strength: "440 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/echinacea-root-elderberry other-ingredients: Vegetable Cellulose Capsule, Rice Bran Extract, Silica and Cellulose. Exact pack Solaray Echinacea Root & Elderberry 440mg (100ct). SKU 076280124446. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280044409",
    productName: "Solaray Vitamin C with Rose Hips, Acerola & Bioflavonoids 1000mg (100ct)",
    formulaId: "solaray-b117-076280044409",
    form: "capsule",
    actives: [
      { name: "Vitamin C with Rose Hips, Acerola & Bioflavonoids 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitamin-c-with-rose-hips-acerola-bioflavonoids other-ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend. Exact pack Solaray Vitamin C with Rose Hips, Acerola & Bioflavonoids 1000mg (100ct). SKU 076280044409. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280435467",
    productName: "Solaray Biotin, Timed-Release 5,000mcg (60ct)",
    formulaId: "solaray-b117-076280435467",
    form: "capsule",
    actives: [
      { name: "Biotin, Timed-Release 5,000mcg", strength: "5,000 mcg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/biotin-timed-release other-ingredients: Cellulose, Vegetable Cellulose Capsule, Stearic Acid, Silica and Magnesium Stearate. Exact pack Solaray Biotin, Timed-Release 5,000mcg (60ct). SKU 076280435467. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049909",
    productName: "Solaray L-Tyrosine, Free Form 500mg (50ct)",
    formulaId: "solaray-b117-076280049909",
    form: "capsule",
    actives: [
      { name: "L-Tyrosine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-tyrosine-free-form other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Cellulose. Exact pack Solaray L-Tyrosine, Free Form 500mg (50ct). SKU 076280049909. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012750",
    productName: "Solaray Feverfew Leaf 380mg (100ct)",
    formulaId: "solaray-b117-076280012750",
    form: "capsule",
    actives: [
      { name: "Feverfew Leaf 380mg", strength: "380 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/feverfew-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Feverfew Leaf 380mg (100ct). SKU 076280012750. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280771930",
    productName: "Solaray Org Grown Fermented Cordycep 1000mg (60ct)",
    formulaId: "solaray-b117-076280771930",
    form: "capsule",
    actives: [
      { name: "Org Grown Fermented Cordycep 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/org-grown-fermented-cordycep other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Org Grown Fermented Cordycep 1000mg (60ct). SKU 076280771930. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280031003",
    productName: "Solaray Bilberry Extract 42mg (60ct)",
    formulaId: "solaray-b117-076280031003",
    form: "capsule",
    actives: [
      { name: "Bilberry Extract 42mg", strength: "42 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/bilberry-berry-extract other-ingredients: Cellulose, Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Bilberry Extract 42mg (60ct). SKU 076280031003. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012606",
    productName: "Solaray Fennel Seed 450mg (100ct)",
    formulaId: "solaray-b117-076280012606",
    form: "capsule",
    actives: [
      { name: "Fennel Seed 450mg", strength: "450 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/fennel-seed other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Fennel Seed 450mg (100ct). SKU 076280012606. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015409",
    productName: "Solaray Sarsaparilla Root 450mg (100ct)",
    formulaId: "solaray-b117-076280015409",
    form: "capsule",
    actives: [
      { name: "Sarsaparilla Root 450mg", strength: "450 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/sarsaparilla-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Sarsaparilla Root 450mg (100ct). SKU 076280015409. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049039",
    productName: "Solaray L-Carnitine, Free Form 500mg (30ct)",
    formulaId: "solaray-b117-076280049039",
    form: "capsule",
    actives: [
      { name: "L-Carnitine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/l-carnitine-free-form other-ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray L-Carnitine, Free Form 500mg (30ct). SKU 076280049039. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280045994",
    productName: "Solaray Lithium Aspartate 5mg (100 ct)",
    formulaId: "solaray-b117-076280045994",
    form: "capsule",
    actives: [
      { name: "Lithium Aspartate 5mg", strength: "5 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/lithium-aspartate other-ingredients: Cellulose, Vegetable Cellulose Capsule and Magnesium Stearate. Exact pack Solaray Lithium Aspartate 5mg (100 ct). SKU 076280045994. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280527476",
    productName: "Solaray PQQ 10mg (30ct)",
    formulaId: "solaray-b117-076280527476",
    form: "capsule",
    actives: [
      { name: "PQQ 10mg", strength: "10 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/pqq other-ingredients: Cellulose, Vegetable Cellulose Capsule, Magnesium Stearate and Silica. Exact pack Solaray PQQ 10mg (30ct). SKU 076280527476. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280489477",
    productName: "Solaray Triple Strength Resveratrol 225mg (60ct)",
    formulaId: "solaray-b117-076280489477",
    form: "capsule",
    actives: [
      { name: "Triple Strength Resveratrol 225mg", strength: "225 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/triple-strength-resveratrol other-ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray Triple Strength Resveratrol 225mg (60ct). SKU 076280489477. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048742",
    productName: "Solaray Multidophilus 3 Strain (180ct)",
    formulaId: "solaray-b117-076280048308",
    form: "capsule",
    actives: [
      { name: "Multidophilus 3 Strain", strength: "label serving" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/multidophilus-3-strain other-ingredients: Maltodextrin, Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Stearic Acid and Silica. Exact pack Solaray Multidophilus 3 Strain (180ct). SKU 076280048742. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280904086",
    productName: "Solaray Mycrobiome Complete Probiotic Adult 50+ (30ct)",
    formulaId: "solaray-b117-076280904086",
    form: "capsule",
    actives: [
      { name: "Mycrobiome Complete Probiotic Adult 50+", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mycrobiome-complete-probiotic-adult-50 other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica. Exact pack Solaray Mycrobiome Complete Probiotic Adult 50+ (30ct). SKU 076280904086. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280016000",
    productName: "Solaray Spirulina Algae 410mg (100ct)",
    formulaId: "solaray-b117-076280016000",
    form: "capsule",
    actives: [
      { name: "Spirulina Algae 410mg", strength: "410 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/spirulina-algae other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Spirulina Algae 410mg (100ct). SKU 076280016000. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048186",
    productName: "Solaray Pancreatin 1300, Digestive Enzyme (90ct)",
    formulaId: "solaray-b117-076280048186",
    form: "capsule",
    actives: [
      { name: "Pancreatin 1300, Digestive Enzyme", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/pancreatin-1300-digestive-enzyme other-ingredients: Vegetable Cellulose Capsule, Maltodextrin, and Cellulose. Exact pack Solaray Pancreatin 1300, Digestive Enzyme (90ct). SKU 076280048186. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280192421",
    productName: "Solaray Echinacea Purpurea 900mg (100ct)",
    formulaId: "solaray-b117-076280192421",
    form: "capsule",
    actives: [
      { name: "Echinacea Purpurea 900mg", strength: "900 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/org-grn-echinacea-purpurea other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Echinacea Purpurea 900mg (100ct). SKU 076280192421. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280278583",
    productName: "Solaray Grape Seed Extract 100mg (60 ct)",
    formulaId: "solaray-b117-076280278583",
    form: "capsule",
    actives: [
      { name: "Grape Seed Extract 100mg", strength: "100 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/grape-seed-extract other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Grape Seed Extract 100mg (60 ct). SKU 076280278583. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280399059",
    productName: "Solaray Boswellia Resin Extract 450mg (60ct)",
    formulaId: "solaray-b117-076280399059",
    form: "capsule",
    actives: [
      { name: "Boswellia Resin Extract 450mg", strength: "450 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/boswellia-resin-extract other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate, and Silica. Exact pack Solaray Boswellia Resin Extract 450mg (60ct). SKU 076280399059. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280682670",
    productName: "Solaray Total Calm Advanced, Mood (60 ct)",
    formulaId: "solaray-b117-076280682670",
    form: "capsule",
    actives: [
      { name: "Total Calm Advanced, Mood", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/total-calm-advanced-mood other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Silica. Exact pack Solaray Total Calm Advanced, Mood (60 ct). SKU 076280682670. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280036657",
    productName: "Solaray Hawthorn Cardio Support Blend (90ct)",
    formulaId: "solaray-b117-076280036657",
    form: "capsule",
    actives: [
      { name: "Hawthorn Cardio Support Blend", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica, Maltodextrin (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/hawthorn-berry-extract other-ingredients: Vegetable Cellulose Capsule, Cellulose, Silica, Maltodextrin and Magnesium Stearate. Exact pack Solaray Hawthorn Cardio Support Blend (90ct). SKU 076280036657. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011319",
    productName: "Solaray Cayenne Pepper 40,000 HU - 515mg (180ct)",
    formulaId: "solaray-b117-076280011319",
    form: "capsule",
    actives: [
      { name: "Cayenne Pepper 40,000 HU - 515mg", strength: "515 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/cayenne-pepper-40000-hu other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Cayenne Pepper 40,000 HU - 515mg (180ct). SKU 076280011319. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280561548",
    productName: "Solaray Mycrobiome Complete Probiotic Mood (30ct)",
    formulaId: "solaray-b117-076280561548",
    form: "capsule",
    actives: [
      { name: "Mycrobiome Complete Probiotic Mood", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/complete-probiotic-mood other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica. Exact pack Solaray Mycrobiome Complete Probiotic Mood (30ct). SKU 076280561548. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013009",
    productName: "Solaray Ginger Root 1100mg (100ct)",
    formulaId: "solaray-b117-076280013009",
    form: "capsule",
    actives: [
      { name: "Ginger Root 1100mg", strength: "1100 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/ginger-root other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Ginger Root 1100mg (100ct). SKU 076280013009. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013856",
    productName: "Solaray Muira Puama 600mg (100ct)",
    formulaId: "solaray-b117-076280013856",
    form: "capsule",
    actives: [
      { name: "Muira Puama 600mg", strength: "600 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/muira-puama other-ingredients: Vegetable Cellulose Capsule and Cellulose. Exact pack Solaray Muira Puama 600mg (100ct). SKU 076280013856. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280887457",
    productName: "Solaray Astragalus 550mg (100ct)",
    formulaId: "solaray-b117-076280887457",
    form: "capsule",
    actives: [
      { name: "Astragalus 550mg", strength: "550 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/organically-grown-astragalus other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Astragalus 550mg (100ct). SKU 076280887457. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280862133",
    productName: "Solaray Affron Saffron Extract (30 ct)",
    formulaId: "solaray-b117-076280862133",
    form: "capsule",
    actives: [
      { name: "Affron Saffron Extract", strength: "label serving" }
    ],
    flags: [
      ["Glycine", "cleared", "glycine"],
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/affron-saffron-extract other-ingredients: Glycine, Cellulose, Vegetable Cellulose Capsule, Silica. Exact pack Solaray Affron Saffron Extract (30 ct). SKU 076280862133. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280366662",
    productName: "Solaray Horsetail Aerial Extract 400mg (60ct)",
    formulaId: "solaray-b117-076280366662",
    form: "capsule",
    actives: [
      { name: "Horsetail Aerial Extract 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/horsetail-aerial-extract other-ingredients: Vegetable Cellulose Capsule, Cellulose and Magnesium Stearate. Exact pack Solaray Horsetail Aerial Extract 400mg (60ct). SKU 076280366662. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280016451",
    productName: "Solaray Vitex Berry 400mg (100ct)",
    formulaId: "solaray-b117-076280016451",
    form: "capsule",
    actives: [
      { name: "Vitex Berry 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitex-berry other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Vitex Berry 400mg (100ct). SKU 076280016451. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013702",
    productName: "Solaray Licorice Root 450mg (100ct)",
    formulaId: "solaray-b117-076280013702",
    form: "capsule",
    actives: [
      { name: "Licorice Root 450mg", strength: "450 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/licorice-root other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Licorice Root 450mg (100ct). SKU 076280013702. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280918052",
    productName: "Solaray Eyes Complete (60ct)",
    formulaId: "solaray-b117-076280918052",
    form: "capsule",
    actives: [
      { name: "Eyes Complete", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Sodium Alginate", "cleared", "alginate"],
      ["Gum Arabic", "cleared", "acacia"],
      ["Pea Starch", "limited", "peaStarch"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Tricalcium Phosphate", "cleared", "dical"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica, Pea Starch (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/eyes-complete other-ingredients: Vegetable Cellulose Capsule, Silica, Sodium Alginate, Gum Arabic, Pea Starch, Magnesium Stearate, Tricalcium Phosphate, Cellulose. Exact pack Solaray Eyes Complete (60ct). SKU 076280918052. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280124354",
    productName: "Solaray Echinacea Purpurea & Angustifo 460mg (180ct)",
    formulaId: "solaray-b117-076280012439",
    form: "capsule",
    actives: [
      { name: "Echinacea Purpurea & Angustifo 460mg", strength: "460 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/echinacea-purpurea-angustifo other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Rice Bran Extract. Exact pack Solaray Echinacea Purpurea & Angustifo 460mg (180ct). SKU 076280124354. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280832150",
    productName: "Solaray Lutein Eyes 18, Triple Strength (30ct)",
    formulaId: "solaray-b117-076280832150",
    form: "capsule",
    actives: [
      { name: "Lutein Eyes 18, Triple Strength", strength: "label serving" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Stearic Acid", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/lutein-eyes-18-triple-strength other-ingredients: Maltodextrin, Vegetable Cellulose Capsule and Stearic Acid. Exact pack Solaray Lutein Eyes 18, Triple Strength (30ct). SKU 076280832150. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013757",
    productName: "Solaray Lobelia Aerial 50mg (100ct)",
    formulaId: "solaray-b117-076280013757",
    form: "capsule",
    actives: [
      { name: "Lobelia Aerial 50mg", strength: "50 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/lobelia-aerial other-ingredients: Vegetable Cellulose Capsule and Rice Bran Extract. Exact pack Solaray Lobelia Aerial 50mg (100ct). SKU 076280013757. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280277371",
    productName: "Solaray Hawthorn 425mg (100ct)",
    formulaId: "solaray-b117-076280277371",
    form: "capsule",
    actives: [
      { name: "Hawthorn 425mg", strength: "425 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/organically-grown-hawthorn other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Hawthorn 425mg (100ct). SKU 076280277371. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280039566",
    productName: "Solaray Vitex Chasteberry Extract (60 ct)",
    formulaId: "solaray-b117-076280039566",
    form: "capsule",
    actives: [
      { name: "Vitex Chasteberry Extract", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/vitex-chaste-berry-extract other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Vitex Chasteberry Extract (60 ct). SKU 076280039566. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280263916",
    productName: "Solaray Mycrobiome Complete Probiotic Postnatal (30ct)",
    formulaId: "solaray-b117-076280263916",
    form: "capsule",
    actives: [
      { name: "Mycrobiome Complete Probiotic Postnatal", strength: "label serving" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mycrobiome-complete-probiotic-postnatal other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica. Exact pack Solaray Mycrobiome Complete Probiotic Postnatal (30ct). SKU 076280263916. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280375756",
    productName: "Solaray Olive Leaf Ext Double Strength 500mg (30ct)",
    formulaId: "solaray-b117-076280375756",
    form: "capsule",
    actives: [
      { name: "Olive Leaf Ext Double Strength 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/olive-leaf-ext-double-strength other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate and Silica. Exact pack Solaray Olive Leaf Ext Double Strength 500mg (30ct). SKU 076280375756. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-X0042AEJKH",
    productName: "Solaray Mullein Leaf 330mg (200ct)",
    formulaId: "solaray-b117-076280013900",
    form: "capsule",
    actives: [
      { name: "Mullein Leaf 330mg", strength: "330 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/mullein-leaf other-ingredients: Vegetable Cellulose Capsule. Exact pack Solaray Mullein Leaf 330mg (200ct). SKU X0042AEJKH. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280109016",
    productName: "Solaray Once Daily High Energy Multivitamin (120ct)",
    formulaId: "solaray-b117-076280109016",
    form: "capsule",
    actives: [
      { name: "Once Daily High Energy Multivitamin", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Sodium Alginate", "cleared", "alginate"],
      ["Pea Starch", "limited", "peaStarch"],
      ["Modified Food Starch", "limited", "modStarch"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Acacia Gum", "cleared", "acacia"],
      ["Stearic Acid", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Pea Starch, Modified Food Starch, Silica (Limited). No High.",
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/once-daily-high-energy-multi-vitamin-two-stage-timed-release other-ingredients: Vegetable Cellulose Capsule, Sodium Alginate, Pea Starch, Modified Food Starch, Magnesium Stearate, Silica, Acacia Gum, Stearic Acid. Exact pack Solaray Once Daily High Energy Multivitamin (120ct). SKU 076280109016. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280399028",
    productName: "Solaray Ashwagandha Root Extract 470mg (60ct)",
    formulaId: "solaray-b117-076280399028",
    form: "capsule",
    actives: [
      { name: "Ashwagandha Root Extract 470mg", strength: "470 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image https://www.solaray.com/products/ashwagandha-root-extract other-ingredients: Vegetable Cellulose Capsule, Rice Bran Extract and Cellulose. Exact pack Solaray Ashwagandha Root Extract 470mg (60ct). SKU 076280399028. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280539318",
    productName: "Solaray Beet Root Juice Organic (16 fl oz)",
    formulaId: "solaray-b117-076280539318",
    form: "liquid",
    actives: [
      { name: "Certified organic beetroot (Beta vulgaris) juice", strength: "label serving" }
    ],
    flags: [
      ["Water", "cleared", "water"],
      ["Citric Acid", "cleared", "citric"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com supplement-facts image; net wt 16 fl oz on the front panel https://www.solaray.com/products/beet-root-juice-organic other-ingredients: Water and Citric Acid. Exact pack Solaray Beet Root Juice Organic (16 fl oz). SKU 076280539318. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280661668",
    productName: "Solaray Maca Root Powder (7.4 oz / 210 g)",
    formulaId: "solaray-b117-076280661668",
    form: "powder",
    actives: [
      { name: "Organic maca (Lepidium meyenii) (root)", strength: "3,500 mg" }
    ],
    flags: [],
    verdict: "clean",
    note: NONE_NOTE,
    cite: "solaray.com supplement-facts image Other Ingredients: None; net wt 7.4 oz / 210 g on the front panel https://www.solaray.com/products/maca-root-powder other-ingredients: None. Exact pack Solaray Maca Root Powder (7.4 oz / 210 g). SKU 076280661668. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing. Net wt 7.4 oz / 210 g is printed on the front panel. Sized row. The sizeless solaray-b116-maca-root-powder row stays on MAIN because a later batch cannot retract an earlier id.",
  },
  {
    id: "solaray-b117-076280330922",
    productName: "Solaray Turmeric Root Extract Super Bio (30 ct)",
    formulaId: "solaray-b117-076280330922",
    form: "capsule",
    actives: [
      { name: "Turmeric Root Extract Super Bio", strength: "label serving" }
    ],
    flags: [
      ["Acacia Gum", "cleared", "acacia"],
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/turmeric-root-extract-super-bio other-ingredients: AquaTurm® Micronized Turmeric (Curcuma longa) (root extract), Acacia Gum, Whole Rice Concentrate and Vegetable Cellulose Capsule. Exact pack Solaray Turmeric Root Extract Super Bio (30 ct). SKU 076280330922. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048803",
    productName: "Solaray L-Arginine & L-Ornithine, 500mg (50ct)",
    formulaId: "solaray-b117-076280048803",
    form: "capsule",
    actives: [
      { name: "L-Arginine & L-Ornithine, 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/l-arginine-l-ornithine-free other-ingredients: L-Arginine (as L-Arginine HCI), L-Ornithine (as I-Ornithine HCI), Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray L-Arginine & L-Ornithine, 500mg (50ct). SKU 076280048803. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280658095",
    productName: "Solaray Sweet Wormwood Aerial 300mg (100 ct)",
    formulaId: "solaray-b117-076280658095",
    form: "capsule",
    actives: [
      { name: "Sweet Wormwood Aerial 300mg", strength: "300 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/sweet-wormwood-aerial other-ingredients: Sweet Wormwood (aerial), Vegetable Cellulose Capsule, Cellulose, Organic Rice Extract Blend and Silica. Exact pack Solaray Sweet Wormwood Aerial 300mg (100 ct). SKU 076280658095. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280039702",
    productName: "Solaray Yohimbe Bark Extract 135mg (60ct)",
    formulaId: "solaray-b117-076280039702",
    form: "capsule",
    actives: [
      { name: "Yohimbe Bark Extract 135mg", strength: "135 mg" }
    ],
    flags: [
      ["Rice Flour", "limited", "riceFlour"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice Flour, Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/yohimbe-bark-extract other-ingredients: Yohimbe (Pausinystalia johimbe) (bark extract), Rice Flour, Organic Rice Extract Blend, Vegetable Cellulose Capsule and Silica. Exact pack Solaray Yohimbe Bark Extract 135mg (60ct). SKU 076280039702. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280138979",
    productName: "Solaray Mangosteen Fruit Extract 500mg (60ct)",
    formulaId: "solaray-b117-076280138979",
    form: "capsule",
    actives: [
      { name: "Mangosteen Fruit Extract 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/mangosteen-fruit-extract other-ingredients: Mangosteen, Vegetable Cellulose Capsule, Magnesium Stearate, Cellulose, and Silica. Exact pack Solaray Mangosteen Fruit Extract 500mg (60ct). SKU 076280138979. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013207",
    productName: "Solaray Goldenseal Root 550mg (50ct)",
    formulaId: "solaray-b117-076280013207",
    form: "capsule",
    actives: [
      { name: "Goldenseal Root 550mg", strength: "550 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/goldenseal-root other-ingredients: Goldenseal (root), Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Goldenseal Root 550mg (50ct). SKU 076280013207. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280376975",
    productName: "Solaray Rosemary Leaf Extract 275mg (45ct)",
    formulaId: "solaray-b117-076280376975",
    form: "capsule",
    actives: [
      { name: "Rosemary Leaf Extract 275mg", strength: "275 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/rosemary-leaf-extract other-ingredients: Rosemary (leaf extract), Rosemary (leaf extract), Rosemary (leaf), Vegetable Cellulose Capsule, Whole Rice Concentrate, Organic Rice Extract Blend, and Silica. Exact pack Solaray Rosemary Leaf Extract 275mg (45ct). SKU 076280376975. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280036619",
    productName: "Solaray Hawthorn Berry Ext & CoQ-10 (60ct)",
    formulaId: "solaray-b117-076280036619",
    form: "capsule",
    actives: [
      { name: "Hawthorn Berry Ext & CoQ-10", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/hawthorn-berry-ext-coq-10 other-ingredients: Hawthorn (Crataegus oxyacantha) (top branches with flower extract), (Guaranteed to contain 10.8 mg [1.8%] Vitexin- 2-Rhamnoside), Hawthorn (Crataequs oxvacantha) (berrv), Coenzyme Q-10, Vegetable Cellulose Capsule, Maltodextrin, Magnesium Stearate, Silica and Cellulose. Exact pack Solaray Hawthorn Berry Ext & CoQ-10 (60ct). SKU 076280036619. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048209",
    productName: "Solaray Acidophilus 3 Strain Probiotic & Prebiotic Goat's Milk (50ct)",
    formulaId: "solaray-b117-076280048209",
    form: "capsule",
    actives: [
      { name: "Acidophilus 3 Strain Probiotic & Prebiotic Goat's Milk", strength: "label serving" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Stearic Acid", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/acidophilus-3-strain-probiotic-prebiotic-goats-milk other-ingredients: Triple Strain Prebiotic Blend, Powdered Goats Milk, Maltodextrin, Vegetable Cellulose Capsule and Stearic Acid. Exact pack Solaray Acidophilus 3 Strain Probiotic & Prebiotic Goat's Milk (50ct). SKU 076280048209. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013214",
    productName: "Solaray Glucomannan, Rhizome Extract (100 ct)",
    formulaId: "solaray-b117-076280013214",
    form: "capsule",
    actives: [
      { name: "Glucomannan, Rhizome Extract", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Silica", "limited", "sio2"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/glucomannan-rhizome-extract other-ingredients: Glucomannan (from Konjac) (Amorphophallus konjac) (rhizome extract), Vegetable Cellulose Capsule, Rice Bran Extract, Silica and Cellulose. Exact pack Solaray Glucomannan, Rhizome Extract (100 ct). SKU 076280013214. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048308",
    productName: "Solaray Multidophilus 3 Strain (100ct)",
    formulaId: "solaray-b117-076280048308",
    form: "capsule",
    actives: [
      { name: "Multidophilus 3 Strain", strength: "label serving" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/multidophilus-3-strain other-ingredients: Triple Strain Probiotic Blend, Maltodextrin, Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Stearic Acid and Silica. Exact pack Solaray Multidophilus 3 Strain (100ct). SKU 076280048308. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280037005",
    productName: "Solaray Milk Thistle Seed Extract 175mg (60ct)",
    formulaId: "solaray-b117-076280037005",
    form: "capsule",
    actives: [
      { name: "Milk Thistle Seed Extract 175mg", strength: "175 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/milk-thistle-seed-extract other-ingredients: Mangosteen (fruit extract), Vegetable Cellulose Capsule, Rice Bran Extract, Cellulose and Silica. Exact pack Solaray Milk Thistle Seed Extract 175mg (60ct). SKU 076280037005. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280037012",
    productName: "Solaray Milk Thistle Seed Extract 175mg (120ct)",
    formulaId: "solaray-b117-076280037005",
    form: "capsule",
    actives: [
      { name: "Milk Thistle Seed Extract 175mg", strength: "175 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Cellulose", "cleared", "mcc"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/milk-thistle-seed-extract other-ingredients: Mangosteen (fruit extract), Vegetable Cellulose Capsule, Rice Bran Extract, Cellulose and Silica. Exact pack Solaray Milk Thistle Seed Extract 175mg (120ct). SKU 076280037012. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011258",
    productName: "Solaray Cat's Claw Bark 500mg (100ct)",
    formulaId: "solaray-b117-076280011258",
    form: "capsule",
    actives: [
      { name: "Cat's Claw Bark 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/cats-claw-bark other-ingredients: Cat's Claw, Vegetable Cellulose Capsule, Cellulose and Organic Rice Extract Blend. Exact pack Solaray Cat's Claw Bark 500mg (100ct). SKU 076280011258. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015553",
    productName: "Solaray Schizandra Berry 580mg (100ct)",
    formulaId: "solaray-b117-076280015553",
    form: "capsule",
    actives: [
      { name: "Schizandra Berry 580mg", strength: "580 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/schizandra-berry other-ingredients: Schizandra (berry), Vegetable Cellulose Capsule. Exact pack Solaray Schizandra Berry 580mg (100ct). SKU 076280015553. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280011302",
    productName: "Solaray Cayenne Pepper 40,000 HU - 515mg (100ct)",
    formulaId: "solaray-b117-076280011302",
    form: "capsule",
    actives: [
      { name: "Cayenne Pepper 40,000 HU - 515mg", strength: "515 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/cayenne-pepper-40000-hu other-ingredients: Cayenne (pepper) (Supplying 100,000 Heat Units), Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Cayenne Pepper 40,000 HU - 515mg (100ct). SKU 076280011302. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280012354",
    productName: "Solaray Dong Quai Root 550mg (100ct)",
    formulaId: "solaray-b117-076280012354",
    form: "capsule",
    actives: [
      { name: "Dong Quai Root 550mg", strength: "550 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/dong-quai-root other-ingredients: Dong Quai (root), Vegetable Cellulose Capsule. Exact pack Solaray Dong Quai Root 550mg (100ct). SKU 076280012354. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048148",
    productName: "Solaray High Potency Betaine HCl with Pepsin (100ct)",
    formulaId: "solaray-b117-076280048148",
    form: "capsule",
    actives: [
      { name: "High Potency Betaine HCl with Pepsin", strength: "label serving" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Flour", "limited", "riceFlour"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Maltodextrin", "limited", "maltodextrin"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Rice Flour, Maltodextrin (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/high-potency-betaine-hcl-with-pepsin other-ingredients: Betaine HCI, Pepsin, Vegetable Cellulose Capsule, Rice Flour, Magnesium Stearate and Maltodextrin. Exact pack Solaray High Potency Betaine HCl with Pepsin (100ct). SKU 076280048148. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280131253",
    productName: "Solaray Korean Ginseng Root 550mg (100 ct)",
    formulaId: "solaray-b117-076280131253",
    form: "capsule",
    actives: [
      { name: "Korean Ginseng Root 550mg", strength: "550 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/korean-ginseng-root other-ingredients: Korean Ginseng (root), Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Korean Ginseng Root 550mg (100 ct). SKU 076280131253. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280126259",
    productName: "Solaray Nopal, Prickly Pear Cactus 500mg (100ct)",
    formulaId: "solaray-b117-076280126259",
    form: "capsule",
    actives: [
      { name: "Nopal, Prickly Pear Cactus 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/nopal-prickly-pear-cactus other-ingredients: Nopal (cladode), Vegetable Cellulose Capsule, Rice Bran Extract and Cellulose. Exact pack Solaray Nopal, Prickly Pear Cactus 500mg (100ct). SKU 076280126259. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015546",
    productName: "Solaray St. John's Wort Aerial 325mg (180ct)",
    formulaId: "solaray-b117-076280015539",
    form: "capsule",
    actives: [
      { name: "St. John's Wort Aerial 325mg", strength: "325 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/st-johns-wort-aerial other-ingredients: St. John's Wort (aerial), Vegetable Cellulose Capsule and Silica. Exact pack Solaray St. John's Wort Aerial 325mg (180ct). SKU 076280015546. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049046",
    productName: "Solaray L-Carnitine, Free Form 500mg (60ct)",
    formulaId: "solaray-b117-076280049039",
    form: "capsule",
    actives: [
      { name: "L-Carnitine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/l-carnitine-free-form other-ingredients: L-Carnitine (as L-Carnitine L-Tartrate), Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray L-Carnitine, Free Form 500mg (60ct). SKU 076280049046. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049206",
    productName: "Solaray L-Glutamine, Free Form 500mg (50ct)",
    formulaId: "solaray-b117-076280049206",
    form: "capsule",
    actives: [
      { name: "L-Glutamine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Whole Rice Concentrate", "cleared", "riceConc"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/l-glutamine-free-form other-ingredients: L-Glutamine, Whole Rice Concentrate, Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray L-Glutamine, Free Form 500mg (50ct). SKU 076280049206. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049916",
    productName: "Solaray L-Tyrosine, Free Form 500mg (100ct)",
    formulaId: "solaray-b117-076280049909",
    form: "capsule",
    actives: [
      { name: "L-Tyrosine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/l-tyrosine-free-form other-ingredients: L-Tyrosine, Vegetable Cellulose Capsule, Magnesium Stearate and Cellulose. Exact pack Solaray L-Tyrosine, Free Form 500mg (100ct). SKU 076280049916. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280037760",
    productName: "Solaray St. John's Wort Aerial Extract 300mg (120ct)",
    formulaId: "solaray-b117-076280037760",
    form: "capsule",
    actives: [
      { name: "St. John's Wort Aerial Extract 300mg", strength: "300 mg" }
    ],
    flags: [
      ["Cellulose", "cleared", "mcc"],
      ["Croscarmellose Sodium", "cleared", "mcc"],
      ["Silica", "limited", "sio2"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/st-johns-wort-aerial-extract other-ingredients: St. John's Wort, Cellulose, Croscarmellose Sodium, Silica, Stearic Acid, and Magnesium Stearate. Exact pack Solaray St. John's Wort Aerial Extract 300mg (120ct). SKU 076280037760. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-X003KT6RIN",
    productName: "Solaray Tongkat Ali 400mg (180ct)",
    formulaId: "solaray-b117-076280544336",
    form: "capsule",
    actives: [
      { name: "Tongkat Ali 400mg", strength: "400 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Rice Bran Extract", "cleared", "riceBran"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/tongkat-ali-root other-ingredients: Tongkat Ali (root), Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Rice Bran Extract, and Silica. Exact pack Solaray Tongkat Ali 400mg (180ct). SKU X003KT6RIN. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280017038",
    productName: "Solaray Black Cohosh Root 540mg (180ct)",
    formulaId: "solaray-b117-076280001709",
    form: "capsule",
    actives: [
      { name: "Black Cohosh Root 540mg", strength: "540 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/black-cohosh-root other-ingredients: Black Cohosh, Vegetable Cellulose Capsule. Exact pack Solaray Black Cohosh Root 540mg (180ct). SKU 076280017038. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280044508",
    productName: "Solaray Vitamin C with Rose Hips & Acerola 1000mg (100 ct)",
    formulaId: "solaray-b117-076280044508",
    form: "capsule",
    actives: [
      { name: "Vitamin C with Rose Hips & Acerola 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/vitamin-c-with-rose-hips-acerola-timed-release-1000mg-vegcap other-ingredients: Vitamin C (as Ascorbic Acid, Acerola Cherry, Rose Hips), Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Stearic Acid and Silica. Exact pack Solaray Vitamin C with Rose Hips & Acerola 1000mg (100 ct). SKU 076280044508. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280044546",
    productName: "Solaray Vitamin C With Rose Hips & Acerola 1000mg (250ct)",
    formulaId: "solaray-b117-076280044546",
    form: "capsule",
    actives: [
      { name: "Vitamin C With Rose Hips & Acerola 1000mg", strength: "1000 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/vitamin-c-with-rose-hips-acerola-timed-release-1000mg-tablet other-ingredients: Vitamin C (as Ascorbic Acid, Acerola Cherry, Rose Hips), Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Stearic Acid and Silica. Exact pack Solaray Vitamin C With Rose Hips & Acerola 1000mg (250ct). SKU 076280044546. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280044010",
    productName: "Solaray Vitamin C With Rose Hips & Acerola 500mg (250ct)",
    formulaId: "solaray-b117-076280044003",
    form: "capsule",
    actives: [
      { name: "Vitamin C With Rose Hips & Acerola 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Cellulose", "cleared", "mcc"],
      ["Magnesium Stearate", "cleared", "stearate"],
      ["Stearic Acid", "cleared", "stearate"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/vitamin-c-with-rose-hips-acerola-timed-release-vegcap other-ingredients: Vitamin C (as Ascorbic Acid), Proprietary Support Base (Rose Hips, Acerola Cherry), Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Stearic Acid and Silica. Exact pack Solaray Vitamin C With Rose Hips & Acerola 500mg (250ct). SKU 076280044010. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280137477",
    productName: "Solaray Turmeric Root Extract 600mg (30ct)",
    formulaId: "solaray-b117-076280137477",
    form: "capsule",
    actives: [
      { name: "Turmeric Root Extract 600mg", strength: "600 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/turmeric-root-extract-one-daily other-ingredients: Turmeric (Root Extract), Vegetable Cellulose Capsule and Organic Rice Extract Blend. Exact pack Solaray Turmeric Root Extract 600mg (30ct). SKU 076280137477. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280013016",
    productName: "Solaray Ginger Root 1100mg (180ct)",
    formulaId: "solaray-b117-076280013009",
    form: "capsule",
    actives: [
      { name: "Ginger Root 1100mg", strength: "1100 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/ginger-root other-ingredients: Ginger (root), Vegetable Cellulose Capsule. Exact pack Solaray Ginger Root 1100mg (180ct). SKU 076280013016. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048254",
    productName: "Solaray Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice (30ct)",
    formulaId: "solaray-b117-076280048254",
    form: "capsule",
    actives: [
      { name: "Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice", strength: "label serving" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Stearic Acid", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/acidophilus-3-strain-probiotic-prebiotic-carrot-juice other-ingredients: Triple Strain Prebiotic Blend, Carrot Juice Powder, Maltodextrin, Vegetable Cellulose Capsule, Silica and Stearic Acid. Exact pack Solaray Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice (30ct). SKU 076280048254. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280048278",
    productName: "Solaray Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice (120ct)",
    formulaId: "solaray-b117-076280048254",
    form: "capsule",
    actives: [
      { name: "Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice", strength: "label serving" }
    ],
    flags: [
      ["Maltodextrin", "limited", "maltodextrin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Stearic Acid", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/acidophilus-3-strain-probiotic-prebiotic-carrot-juice other-ingredients: Triple Strain Prebiotic Blend, Carrot Juice Powder, Maltodextrin, Vegetable Cellulose Capsule, Silica and Stearic Acid. Exact pack Solaray Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice (120ct). SKU 076280048278. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280016307",
    productName: "Solaray Valerian Root 470mg (100ct)",
    formulaId: "solaray-b117-076280016307",
    form: "capsule",
    actives: [
      { name: "Valerian Root 470mg", strength: "470 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/valerian-root other-ingredients: Valerian (root), Vegetable Cellulose Capsule. Exact pack Solaray Valerian Root 470mg (100ct). SKU 076280016307. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280049411",
    productName: "Solaray L-Lysine, Free Form 500mg (120ct)",
    formulaId: "solaray-b117-076280049404",
    form: "capsule",
    actives: [
      { name: "L-Lysine, Free Form 500mg", strength: "500 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Cellulose", "cleared", "mcc"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/l-lysine-free-form other-ingredients: L-Lysine (L-Lysine HCI), Vegetable Cellulose Capsule, Organic Rice Extract Blend and Cellulose. Exact pack Solaray L-Lysine, Free Form 500mg (120ct). SKU 076280049411. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015492",
    productName: "Solaray Saw Palmetto Berry 580mg (50ct)",
    formulaId: "solaray-b117-076280015492",
    form: "capsule",
    actives: [
      { name: "Saw Palmetto Berry 580mg", strength: "580 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/saw-palmetto-berry other-ingredients: Saw Palmetto (berry), Vegetable Cellulose Capsule. Exact pack Solaray Saw Palmetto Berry 580mg (50ct). SKU 076280015492. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015508",
    productName: "Solaray Saw Palmetto Berry 580mg (100ct)",
    formulaId: "solaray-b117-076280015492",
    form: "capsule",
    actives: [
      { name: "Saw Palmetto Berry 580mg", strength: "580 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/saw-palmetto-berry other-ingredients: Saw Palmetto (berry), Vegetable Cellulose Capsule. Exact pack Solaray Saw Palmetto Berry 580mg (100ct). SKU 076280015508. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280015515",
    productName: "Solaray Saw Palmetto Berry 580mg (180ct)",
    formulaId: "solaray-b117-076280015492",
    form: "capsule",
    actives: [
      { name: "Saw Palmetto Berry 580mg", strength: "580 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"]
    ],
    verdict: "clean",
    note: CLEARED_NOTE,
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/saw-palmetto-berry other-ingredients: Saw Palmetto (berry), Vegetable Cellulose Capsule. Exact pack Solaray Saw Palmetto Berry 580mg (180ct). SKU 076280015515. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280004472",
    productName: "Solaray Red Yeast Rice 600mg (90ct)",
    formulaId: "solaray-b117-076280004465",
    form: "capsule",
    actives: [
      { name: "Red Yeast Rice 600mg", strength: "600 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/red-yeast-rice other-ingredients: Red Yeast Rice (Monascus purpureus) (extract), Vegetable Cellulose Capsule, Silica and Magnesium Stearate. Exact pack Solaray Red Yeast Rice 600mg (90ct). SKU 076280004472. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280004489",
    productName: "Solaray Red Yeast Rice 600mg (120ct)",
    formulaId: "solaray-b117-076280004465",
    form: "capsule",
    actives: [
      { name: "Red Yeast Rice 600mg", strength: "600 mg" }
    ],
    flags: [
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Silica", "limited", "sio2"],
      ["Magnesium Stearate", "cleared", "stearate"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/red-yeast-rice other-ingredients: Red Yeast Rice (Monascus purpureus) (extract), Vegetable Cellulose Capsule, Silica and Magnesium Stearate. Exact pack Solaray Red Yeast Rice 600mg (120ct). SKU 076280004489. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
  {
    id: "solaray-b117-076280493016",
    productName: "Solaray Multidophilus 12 Strain Probiotic, 20 Billion Cfu (50ct)",
    formulaId: "solaray-b117-076280493009",
    form: "capsule",
    actives: [
      { name: "Multidophilus 12 Strain Probiotic, 20 Billion Cfu", strength: "label serving" }
    ],
    flags: [
      ["Inulin", "cleared", "inulin"],
      ["Vegetable Cellulose Capsule", "cleared", "capsuleCellulose"],
      ["Organic Rice Extract Blend", "limited", "riceExtract"],
      ["Silica", "limited", "sio2"]
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.",
    cite: "solaray.com Ingredients accordion https://www.solaray.com/products/multidophilus-12-strain-probiotic-20-billion-cfu other-ingredients: 12 Strain Probiotic Blend, Inulin, Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Exact pack Solaray Multidophilus 12 Strain Probiotic, 20 Billion Cfu (50ct). SKU 076280493016. Shopify variant barcode field was empty and these 12 digits did not print contiguous in the facts OCR, so UPC is blank. No NDC on the solaray.com listing.",
  },
];

export const BATCH117_KYR6B_SOLARAY_STAMP_BACKFILL: RatingRecord[] = COMPACT.map(expand);

export const BATCH117_SKIPPED_NO_OI: { sku: string; name: string; count: string; url: string; why: string }[] = [
  { sku: "076280043709", name: "Pantothenic Acid", count: "", url: "https://www.solaray.com/products/pantothenic-acid-1", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280613605", name: "BriteSide Mood Support Formula", count: "90 ct", url: "https://www.solaray.com/products/briteside-mood-support-formula", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280200553", name: "Once Daily Active Man Multivitamin", count: "90ct", url: "https://www.solaray.com/products/once-daily-active-man-multi-vitamin", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280127409", name: "Vitamin B-6, Timed-Release", count: "60ct / 50 mg", url: "https://www.solaray.com/products/vitamin-b-6-timed-release", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280045840", name: "Calcium Citrate Chewables - Orange 1000mg", count: "Orange / 60ct", url: "https://www.solaray.com/products/calcium-citrate-chewables-orange", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280085211", name: "Grapefruit Seed Extract With Zinc, Betaglucan & Astragalus", count: "60ct", url: "https://www.solaray.com/products/grapefruit-seed-extract-immunity-formula", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280030204", name: "Arabinogalactan, Larch Tree Extract 300mg", count: "60ct", url: "https://www.solaray.com/products/arabinogalactan-larch-tree-extract", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280042412", name: "Mega Vitamin B-Stress, Timed-Release", count: "120ct", url: "https://www.solaray.com/products/mega-vitamin-b-stress-timed-release", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280047967", name: "Children's Multivitamin", count: "60ct", url: "https://www.solaray.com/products/childrens-multi-vitamin", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280012101", name: "Dandelion Root 1040mg", count: "100ct", url: "https://www.solaray.com/products/dandelion-root", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280042917", name: "Vitamin B-Complex 75, Timed-Release", count: "100 ct", url: "https://www.solaray.com/products/vitamin-b-complex-timed-release", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280399080", name: "Forskohlii Root Extract 385mg", count: "60ct", url: "https://www.solaray.com/products/forskohlii-root-extract", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280174045", name: "Tart Cherry & Celery Seed 620mg", count: "60ct", url: "https://www.solaray.com/products/tart-cherry-celery-seed", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280446869", name: "Mega Quercetin 600mg", count: "60ct", url: "https://www.solaray.com/products/mega-quercetin", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280850406", name: "Spectro Man Multivitamin", count: "120ct", url: "https://www.solaray.com/products/spectro-man-multi-vitamin", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280037685", name: "Saw Palmetto & Pygeum", count: "120 ct", url: "https://www.solaray.com/products/pygeum-saw-palmetto-extracts", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280034004", name: "Echinacea Angustifolia Root Ext 125mg", count: "60ct", url: "https://www.solaray.com/products/echinacea-angustifolia-root-ext", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280105056", name: "Mushroom Complete 1175mg", count: "60ct", url: "https://www.solaray.com/products/mushroom-complete", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280042429", name: "Mega Vitamin B-Stress, Timed-Release", count: "240ct", url: "https://www.solaray.com/products/mega-vitamin-b-stress-timed-release", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280042405", name: "Mega Vitamin B-Stress, Timed-Release", count: "60ct", url: "https://www.solaray.com/products/mega-vitamin-b-stress-timed-release", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280048001", name: "Super Digestaway", count: "60ct", url: "https://www.solaray.com/products/super-digestaway-digestive-enzyme-blend", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280558272", name: "Once Daily Prenatal Multivitamin", count: "90ct", url: "https://www.solaray.com/products/once-daily-prenatal-multi-vitamin", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280042313", name: "Vitamin B-Stress PM", count: "120ct", url: "https://www.solaray.com/products/vitamin-b-stress-pm", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280043273", name: "Vitamin B-2 (Riboflavin) 100mg", count: "100ct", url: "https://www.solaray.com/products/vitamin-b-2", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280031157", name: "Bilberry & Lutein, One Daily", count: "30 ct", url: "https://www.solaray.com/products/bilberry-lutein-one-daily", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280366693", name: "L-5-hydroxyTryptophan, 5-HTP 50mg", count: "60ct", url: "https://www.solaray.com/products/l-5-hydroxytryptophan-5-htp", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280763232", name: "SleepMag", count: "", url: "https://www.solaray.com/products/sleepmag", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280648843", name: "Cal-Mag Citrate w/D-3 & K-2, 2:1 Ratio", count: "180ct", url: "https://www.solaray.com/products/cal-mag-citrate-w-d-3-k-2", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280193251", name: "Liposomal Multivitamin Women's", count: "60ct", url: "https://www.solaray.com/products/liposomal-multivitamin-womens", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280110098", name: "HMB + Vitamin D3", count: "Vanilla", url: "https://www.solaray.com/products/hmb-vitamin-d3", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280109344", name: "Nattokinase 100mg", count: "30ct", url: "https://www.solaray.com/products/nattokinase", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280399134", name: "Holy Basil Aerial Extract 900mg", count: "60ct", url: "https://www.solaray.com/products/holy-basil-aerial-extract", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280127423", name: "Vitamin B-6, Timed-Release", count: "60ct / 100 mg", url: "https://www.solaray.com/products/vitamin-b-6-timed-release", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280045901", name: "GTF Chromium 200mcg", count: "100ct", url: "https://www.solaray.com/products/gtf-chromium", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280375909", name: "Pomegranate Fruit Extract 200mg", count: "60ct", url: "https://www.solaray.com/products/pomegranate-fruit-extract", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280037586", name: "Phytoestrogen", count: "120ct", url: "https://www.solaray.com/products/phytoestrogen", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280031737", name: "Black Cohosh Root Extract 80mg", count: "30ct", url: "https://www.solaray.com/products/black-cohosh-root-extract", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280375831", name: "Phytoestrogen", count: "240ct", url: "https://www.solaray.com/products/phytoestrogen", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280031119", name: "Bilberry Extract 60mg", count: "120ct", url: "https://www.solaray.com/products/copy-of-bilberry-berry-extract", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280566192", name: "Spectro Woman Multivitamin", count: "120ct", url: "https://www.solaray.com/products/spectro-woman-multi-vitamin", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280047431", name: "Solaray Multi Energy Two Daily, Capsule (Btl-Plastic) | 120ct", count: "", url: "https://www.solaray.com/products/solaray-multi-energy-two-daily-capsule-btl-plastic-120ct", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280660548", name: "Caralluma Aerial Extract 500mg", count: "30ct", url: "https://www.solaray.com/products/caralluma-aerial-extract", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280731767", name: "Bacillus Coagulans", count: "60ct", url: "https://www.solaray.com/products/bacillus-coagulans", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280355307", name: "Mycrobiome Prebiotic", count: "5.64oz  (160g) / Citrus", url: "https://www.solaray.com/products/mycrobiome-prebiotic", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280043037", name: "Vitamin B-Complex 100", count: "250ct", url: "https://www.solaray.com/products/vitamin-b-complex-100", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280360448", name: "Her Life Stages Libido", count: "60 ct", url: "https://www.solaray.com/products/her-life-stages-libido", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280346688", name: "Plant-Sourced GABA", count: "30 ct", url: "https://www.solaray.com/products/plant-sourced-gaba", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280082524", name: "Oil Of Oregano 150mg", count: "60ct", url: "https://www.solaray.com/products/oil-of-oregano", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280874969", name: "Vitamin K-2, MK-7 50mcg", count: "60ct", url: "https://www.solaray.com/products/vitamin-k-2-mk-7-50mcg", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280045307", name: "Calcium & Magnesium, AAC 2:1", count: "90ct", url: "https://www.solaray.com/products/calcium-magnesium-amino-acid-chelate-2-1-ratio", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280042153", name: "Vitamin B-Stress", count: "100ct", url: "https://www.solaray.com/products/vitamin-b-stress", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280042214", name: "Vitamin B-Stress AM, Timed-Release", count: "120 ct", url: "https://www.solaray.com/products/vitamin-b-stress-am-timed-release", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280262025", name: "Spectro Energy Multivitamin", count: "120 ct", url: "https://www.solaray.com/products/spectro-energy-multi-vitamin", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280047813", name: "Spectro Multivitamin", count: "100ct", url: "https://www.solaray.com/products/spectro-multi-vitamin", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280473049", name: "Once Daily High Energy Multivitamin, Iron-Free", count: "30ct", url: "https://www.solaray.com/products/once-daily-high-energy-multi-vitamin-iron-free", why: "facts image OCR did not yield a reliable Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280223149", name: "Triple Strength Tart Cherry Fruit Extract", count: "90ct", url: "https://www.solaray.com/products/triple-strength-tart-cherry-fruit-extract", why: "facts image had no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280970500", name: "SharpMind Nootropics Mood", count: "30 ct", url: "https://www.solaray.com/products/sharpmind-nootropics-mood", why: "solaray.com label image is the front panel and has no Other Ingredients line Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280041026", name: "Astaxanthin", count: "Small (1 mg), Medium (4 mg) / Softgel", url: "https://www.solaray.com/products/astaxanthin", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280830385", name: "Liposomal Multivitamin Universal", count: "60ct", url: "https://www.solaray.com/products/liposomal-multivitamin-universal", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280083637", name: "Cleanse - Liver", count: "60 ct / Capsule", url: "https://www.solaray.com/products/cleanse-liver", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280404562", name: "Olive Leaf Extract 22%, 250mg", count: "60ct", url: "https://www.solaray.com/products/olive-leaf-extract-22", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280083644", name: "Total Cleanse Kidney", count: "60 ct / Veg Cap", url: "https://www.solaray.com/products/total-cleanse-kidney", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280045895", name: "Chromium Picolinate 200mcg", count: "100 ct", url: "https://www.solaray.com/products/chromium-picolinate-200mcg", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280045888", name: "Chromium Picolinate 200mcg", count: "50 ct", url: "https://www.solaray.com/products/chromium-picolinate-200mcg", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280043945", name: "Vitamin C & Echinacea", count: "120ct", url: "https://www.solaray.com/products/vitamin-c-echinacea-root", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280127430", name: "Vitamin B-6, Timed-Release", count: "120ct / 100 mg", url: "https://www.solaray.com/products/vitamin-b-6-timed-release", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280008524", name: "MSM & Glucosamine", count: "90ct", url: "https://www.solaray.com/products/msm-glucosamine", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280043907", name: "Vitamin C with Rose Hips & Acerola 500mg", count: "100ct", url: "https://www.solaray.com/products/vit-c-with-rose-hips-acerola", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280045222", name: "Calcium & Magnesium Asporotate", count: "240ct", url: "https://www.solaray.com/products/calcium-magnesium-asporotate", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280008029", name: "Flaxseed Oil 1000mg", count: "100 ct", url: "https://www.solaray.com/products/flax", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280036039", name: "Ginkgo Biloba Extract, One Daily 120mg", count: "30ct", url: "https://www.solaray.com/products/ginkgo-biloba-extract-one-daily", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280031010", name: "Bilberry Extract 42mg", count: "120ct", url: "https://www.solaray.com/products/bilberry-berry-extract", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280366594", name: "Horse Chestnut Seed Extract 400mg", count: "120ct", url: "https://www.solaray.com/products/horse-chestnut-seed-extract", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280037661", name: "Saw Palmetto & Pygeum with Zinc & Vitamin E", count: "30 ct", url: "https://www.solaray.com/products/pygeum-bark-saw-palmetto-ext", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280037821", name: "Saw Palmetto Berry Extract 160mg", count: "60ct", url: "https://www.solaray.com/products/saw-palmetto-berry-extract", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280037838", name: "Saw Palmetto Berry Extract 160mg", count: "120ct", url: "https://www.solaray.com/products/saw-palmetto-berry-extract", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280037845", name: "Saw Palmetto Berry Extract 160mg", count: "240ct", url: "https://www.solaray.com/products/saw-palmetto-berry-extract", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280512847", name: "Fulvic Minerals 100mg", count: "30ct", url: "https://www.solaray.com/products/fulvic-minerals", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280045918", name: "GTF Chromium 200mcg", count: "200ct", url: "https://www.solaray.com/products/gtf-chromium", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280046618", name: "Potassium Asporotate 99mg", count: "200ct", url: "https://www.solaray.com/products/potassium-asporotate", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280049923", name: "L-Theanine 200mg", count: "45ct", url: "https://www.solaray.com/products/l-theanine", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280366679", name: "L-5-HTP with Vitamin B-6 & C, 100mg", count: "30ct", url: "https://www.solaray.com/products/l-5-htp-with-vitamin-b-6-c", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280472950", name: "Once Daily High Energy Multi", count: "30ct", url: "https://www.solaray.com/products/once-daily-high-energy-multi", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280047301", name: "Once Daily High Energy Multi", count: "60ct", url: "https://www.solaray.com/products/once-daily-high-energy-multi", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280047318", name: "Once Daily High Energy Multi", count: "120ct", url: "https://www.solaray.com/products/once-daily-high-energy-multi", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280473124", name: "Once Daily High Energy Multi", count: "180ct", url: "https://www.solaray.com/products/once-daily-high-energy-multi", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280031102", name: "Bilberry Extract 60mg", count: "60ct", url: "https://www.solaray.com/products/copy-of-bilberry-berry-extract", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280130645", name: "Acetyl L-Carnitine 500mg", count: "30ct", url: "https://www.solaray.com/products/acetyl-l-carnitine", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280013658", name: "Kelp Seaweed 550mg", count: "100ct", url: "https://www.solaray.com/products/kelp-seaweed", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280041156", name: "Food Carotene, Vitamin A As Beta Carotene 7500mcg", count: "50ct", url: "https://www.solaray.com/products/food-carotene-vitamin-a-as-beta-carotene-7500-mcg-25000-iu", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280041217", name: "Food Carotene, Vitamin A As Beta Carotene 7500mcg", count: "200ct", url: "https://www.solaray.com/products/food-carotene-vitamin-a-as-beta-carotene-7500-mcg-25000-iu", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "X0042AF2L7", name: "Oil Of Oregano 150mg", count: "120ct", url: "https://www.solaray.com/products/oil-of-oregano", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280832167", name: "Lutein Eyes 18, Triple Strength", count: "60ct", url: "https://www.solaray.com/products/lutein-eyes-18-triple-strength", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280832174", name: "Lutein Eyes 24, Advanced 24mg", count: "30ct", url: "https://www.solaray.com/products/lutein-eyes-24-advanced", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280043563", name: "Inositol Powder 700mg", count: "4oz", url: "https://www.solaray.com/products/inositol", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280044416", name: "Vitamin C with Rose Hips, Acerola & Bioflavonoids 1000mg", count: "250ct", url: "https://www.solaray.com/products/vitamin-c-with-rose-hips-acerola-bioflavonoids", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280008418", name: "Cranactin Cranberry Extract 400mg", count: "120ct", url: "https://www.solaray.com/products/cranactin-cranberry-extract-bacterial-antiadherence-formula-1", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280084221", name: "Cranactin Cranberry Extract 400mg", count: "180ct", url: "https://www.solaray.com/products/cranactin-cranberry-extract-bacterial-antiadherence-formula-1", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280041620", name: "Vitamin E, Mixed Tocopherols 268mg", count: "50ct", url: "https://www.solaray.com/products/vitamin-e-d-alpha-tocopherol-268-mg-400-iu", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280385847", name: "Vitamin D3 + K2", count: "60ct", url: "https://www.solaray.com/products/vitamin-d-3-k-2-125-mcg", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280044218", name: "Vitamin C With Bioflavonoid Complex 500mg", count: "250ct", url: "https://www.solaray.com/products/vitamin-c-with-bioflavonoid-complex-buffered", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280044331", name: "Vitamin C & Bioflavonoids 1:1 500mg", count: "250ct", url: "https://www.solaray.com/products/vitamin-c-bioflavonoids-1-1", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280042702", name: "Vitamin B-Complex 50mg", count: "50ct", url: "https://www.solaray.com/products/vitamin-b-complex-50", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280042726", name: "Vitamin B-Complex 50mg", count: "250ct", url: "https://www.solaray.com/products/vitamin-b-complex-50", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280043006", name: "Vitamin B-Complex 100", count: "50ct", url: "https://www.solaray.com/products/vitamin-b-complex-100", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280043013", name: "Vitamin B-Complex 100", count: "100ct", url: "https://www.solaray.com/products/vitamin-b-complex-100", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280129281", name: "Turmeric Root Extract 300mg", count: "120ct", url: "https://www.solaray.com/products/turmeric-root-extract", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280041118", name: "Food Carotene, Vitamin A As Beta Carotene 500 mcg", count: "200ct", url: "https://www.solaray.com/products/food-carotene-vitamin-a-as-beta-carotene-1", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280090123", name: "Bio CoQ-10 100mg", count: "60ct", url: "https://www.solaray.com/products/bio-coq-10", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280036008", name: "Ginkgo Biloba Leaf Extract 60mg", count: "60ct", url: "https://www.solaray.com/products/ginkgo-biloba-leaf-extract", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280012118", name: "Dandelion Root 1040mg", count: "180ct", url: "https://www.solaray.com/products/dandelion-root", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280027617", name: "Female Hormone Blend Sp-7c", count: "180ct", url: "https://www.solaray.com/products/female-hormone-blend-sp-7c", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280048018", name: "Super Digestaway", count: "90ct", url: "https://www.solaray.com/products/super-digestaway-digestive-enzyme-blend", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280048025", name: "Super Digestaway", count: "180ct", url: "https://www.solaray.com/products/super-digestaway-digestive-enzyme-blend", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280084337", name: "Super CranActin Cranberry Extract 400mg", count: "120ct", url: "https://www.solaray.com/products/super-cranactin-cranberry-extract-bacterial-antiadherence-formula", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280088922", name: "Red Yeast Rice + CoQ-10", count: "60ct", url: "https://www.solaray.com/products/red-yeast-rice-plus-coq-10", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280121551", name: "Red Yeast Rice + CoQ-10", count: "90ct", url: "https://www.solaray.com/products/red-yeast-rice-plus-coq-10", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280559620", name: "Reacta-C & Bioflavonoids 500mg", count: "60ct", url: "https://www.solaray.com/products/reacta-c-bioflavonoids", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280610741", name: "Reacta-C & Bioflavonoids 500mg", count: "120ct", url: "https://www.solaray.com/products/reacta-c-bioflavonoids", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280046717", name: "Potassium 99mg", count: "200ct", url: "https://www.solaray.com/products/potassium-99", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280473056", name: "Once Daily High Energy Multivitamin, Iron-Free", count: "60ct", url: "https://www.solaray.com/products/once-daily-high-energy-multi-vitamin-iron-free", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280473063", name: "Once Daily High Energy Multivitamin, Iron-Free", count: "90ct", url: "https://www.solaray.com/products/once-daily-high-energy-multi-vitamin-iron-free", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
  { sku: "076280374025", name: "Magnesium Citrate 400mg", count: "180ct", url: "https://www.solaray.com/products/magnesium-citrate", why: "solaray.com product page had no supplement-facts image for this SKU Full ladder this pass: solaray.com facts image and Ingredients accordion opened; iHerb returned 403; Vitacost search returned no product; Walmart was blocked; Target showed a captcha; Amazon returned 503. No cited US page supplied a complete Other Ingredients line for this SKU." },
];

export const BATCH117_SKIPPED_OUT: { sku: string; name: string; count: string; url: string; why: string }[] = [];

export const BATCH117_REFUSED: { sku: string; name: string; count: string; form: string; url: string; unknown: string[] }[] = [
  { sku: "076280428896", name: "Acetyl L-Carnitine + ALA", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/acetyl-l-carnitine-ala", unknown: ["BioPerine (Black Pepper Extract)"] },
  { sku: "076280884500", name: "Calcium & Magnesium Citrate W/ Vitamin D-3, 2:1 Ratio", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/calcium-magnesium-citrate-w-vitamin-d-3-2-1-ratio", unknown: ["Parsley Leaf", "Alfalfa Leaf", "Watercress Leaf", "Dandelion Root"] },
  { sku: "076280529586", name: "Colostrum+", count: "Unflavored", form: "powder", url: "https://www.solaray.com/products/colostrum", unknown: ["Sea Salt"] },
  { sku: "076280045291", name: "Calcium Citrate Supreme, Bone", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/calcium-citrate-supreme-bone", unknown: ["Whole Rice Concentrate (including Kernel, Polishings, and Hull)", "Aspartic Acid", "Alfalfa Leaf", "Watercress", "Dandelion Root", "Parsley Leaf"] },
  { sku: "076280471021", name: "Zinc Citrate 50mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/zinc-citrate", unknown: ["Calcium Silicate"] },
  { sku: "076280946123", name: "Her Life Stages PMS & Menstrual", count: "24 ct", form: "capsule", url: "https://www.solaray.com/products/her-life-stages-pms-menstrual", unknown: ["Vegetable Capsule", "Acacia (Gum Arabic)", "Potato Dextrin"] },
  { sku: "076280773279", name: "ProSorb Berberine 9x 550mg", count: "30 ct", form: "capsule", url: "https://www.solaray.com/products/prosorb-berberine-9x", unknown: ["Pea Protein Isolate", "Vegetable Capsule", "Grape Seed Extract"] },
  { sku: "076280047455", name: "Twice Daily Multi Vitamin", count: "", form: "capsule", url: "https://www.solaray.com/products/twice-daily-multi-vitamin", unknown: ["Eleuthero Root", "ope Lid Rice Concentrate (including Bran, Polishings and Germ)", "Carrot Juice Powder", "oybean Oil"] },
  { sku: "076280043501", name: "Vitamin B-12 2000mcg", count: "90 ct / Cherry", form: "capsule", url: "https://www.solaray.com/products/copy-of-vitamin-b-13", unknown: ["Natural Cherry Flavor"] },
  { sku: "076280043853", name: "Vitamin C 800mg, Buffered", count: "90 ct", form: "capsule", url: "https://www.solaray.com/products/vitamin-c-w-rose-hips-buffered", unknown: ["Whole Food Base (Rose Hips, Acerola Cherry and Bioflavonoid Concentrate)"] },
  { sku: "076280021400", name: "Nerve Blend SP-14", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/nerve-blend-sp-14", unknown: ["Trace Mineral Complex"] },
  { sku: "076280321838", name: "Methyl B-12, Mango Peach - 2500mcg", count: "60 ct / Natural Mango Peach", form: "capsule", url: "https://www.solaray.com/products/methyl-b-13", unknown: ["Natural Mango", "Peach Flavors with other Natural Flavors (Soy)", "Turmeric Root Extract", "Citric Acid (from Non-GMO Tapioca)"] },
  { sku: "076280044621", name: "Super Bio Vitamin C 1000mg", count: "360ct", form: "capsule", url: "https://www.solaray.com/products/super-bio-vitamin-c-buffered-two-stage-timed-release", unknown: ["Buffering Base (Calcium Carbonate and Magnesium Oxide)"] },
  { sku: "076280402490", name: "Olive Leaf Extract 22%, 250mg", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/olive-leaf-extract-22", unknown: ["Oraanic Rice Extract Blend"] },
  { sku: "076280117776", name: "D-Mannose With Cranactin Cranberry Extract 1000mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/d-mannose-with-cranactin-cranberry-extract", unknown: ["Organic Rice Bran Extract"] },
  { sku: "076280045611", name: "Calcium, Magnesium, Zinc", count: "250ct", form: "capsule", url: "https://www.solaray.com/products/calcium-magnesium-zinc", unknown: ["Whole Rice Concentrate (including the Bran, Polishings and Germ)", "Alfalfa leaf", "Watercress", "Dandelion Root", "Parsley Leaf"] },
  { sku: "076280166262", name: "Reacta-C & Bioflavonoids 500mg", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/reacta-c-bioflavonoids", unknown: ["Calcium L-Threonate"] },
  { sku: "076280002409", name: "Skin Blend SP-4", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/skin-blend-sp-4", unknown: ["Trace Mineral Complex"] },
  { sku: "076280227703", name: "Garcinia Cambogia Fruit Ext 500mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/garcinia-cambogia-fruit-ext", unknown: ["Rice Hull Concentrate"] },
  { sku: "076280292572", name: "Cold Pressed Black Seed 3% Thymoquinone 500mg", count: "60ct", form: "softgel", url: "https://www.solaray.com/products/cold-pressed-black-seed-3-thymoquinone", unknown: ["Modified Tapioca Starch"] },
  { sku: "076280882896", name: "Liposomal Multivitamin Men's", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/liposomal-multivitamin-mens", unknown: ["Lipid Blend from Sunflower Oil", "Sustainable Palm Oil", "Modified Tapioca Starch"] },
  { sku: "076280153798", name: "Org Grown Fermented Royal Agaricus", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/org-grown-fermented-royal-agaricus", unknown: ["Organic Pullulan Capsule"] },
  { sku: "076280112665", name: "Vitamin D-2, Dry - 25mcg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/vitamin-d-2-dry", unknown: ["Organic Rice Blend Extract"] },
  { sku: "076280563160", name: "Immufight Respiratory Support", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/immufight-respiratory-support", unknown: ["Calcium Threonate", "Tapioca Starch"] },
  { sku: "076280045109", name: "Mega Multi Mineral", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/multi-mineral", unknown: ["Parsley", "Alfalfa Leaf", "Horsetail", "Watercress", "Dandelion Root", "Yellow Dock Root", "Chamomile"] },
  { sku: "076280103489", name: "Resveratrol, Japanese Knotweed 75mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/resveratrol-japanese-knotweed", unknown: ["Maltodex- trin (from Non-GMO Corn)"] },
  { sku: "076280033809", name: "DopaBean, Velvet Bean Extract 333mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/dopabean-velvet-bean-extract", unknown: ["Enteric Coating"] },
  { sku: "076280036626", name: "Hawthorn Aerial Ext, Two Daily 600mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/hawthorn-aerial-ext-two-daily", unknown: ["Maltodextrin (from Non-GMO Corn)", "Chicory Root Inulin"] },
  { sku: "076280044676", name: "QBC Plex | Quercetin & Bromelain + Vitamin C", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/qbc-plex-quercetin-bromelain-plus-vitamin-c", unknown: ["Non-GMO Maltodextrin"] },
  { sku: "076280080063", name: "Calcium D-Glucarate 400mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/calcium-d-glucarate", unknown: ["Rice Powder"] },
  { sku: "076280030808", name: "Artichoke Leaf Extract 600mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/artichoke-leaf-extract", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280578959", name: "Methyl Folate 1000mcg", count: "60ct / Lemon", form: "capsule", url: "https://www.solaray.com/products/methyl-folate", unknown: ["Organic Inulin", "Natural Lemon Flavor with other Natural Flavors", "Citric Acid (from Non-GMO Tapioca)", "Rice Hull Concentrate", "Stevia Leaf Extract"] },
  { sku: "076280132236", name: "Magnesium Asporotate 400mg", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/magnesium-asporotate", unknown: ["Herb Base (Parsley Leaf, Organic Alfalfa Leaf)"] },
  { sku: "076280002102", name: "Hormone Blend SP-1", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/hormone-blend-sp-1", unknown: ["Trace Mineral Complex"] },
  { sku: "076280043655", name: "Niacinamide 500mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/niacinamide", unknown: ["Whole Rice Concentrate (Including Bran, Polishings, and Germ, and Aloe Vera Gel)"] },
  { sku: "076280042719", name: "Vitamin B-Complex 50mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/vitamin-b-complex-50", unknown: ["Whole Food Base (Whole Rice Concentrate and Aloe Vera Gel)"] },
  { sku: "076280011609", name: "Chamomile Flowering Top 350mg", count: "100 ct", form: "capsule", url: "https://www.solaray.com/products/chamomile-flowering-top", unknown: ["Organic Rice Ex- tract Blend"] },
  { sku: "076280111040", name: "Passion Flower Aerial Extract 250mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/passion-flower-aerial-extract", unknown: ["Maltodextrin (from Non-GMO Tapioca)"] },
  { sku: "076280036565", name: "Guarana Seed Extract 200mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/guarana-seed-extract", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280986792", name: "Once Daily Adult 50+ Multivitamin", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/once-daily-adult-50-multi-vitamin", unknown: ["Modified Starch", "Rose Hips", "Acerola Cherry"] },
  { sku: "076280276855", name: "Organic Maca Root 500mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/organic-maca-root", unknown: ["Organic Pullulan Capsule"] },
  { sku: "076280903522", name: "Curcumin Root Extract 250mg", count: "30 ct", form: "softgel", url: "https://www.solaray.com/products/curcumin-root-extract", unknown: ["Medium Chain iabycendes (coconut)", "Softgel (Gelatin and Glycerin)", "Lecithin (soy)"] },
  { sku: "076280752502", name: "Super Strength Vitamin D-3 250mcg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/super-strength-vitamin-d-3", unknown: ["Medium Chain Triglycerides", "Sucrose"] },
  { sku: "076280002805", name: "Heart Blend SP-8", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/heart-blend-sp-8", unknown: ["Calcium Fluoride 6x", "Magnesium Phosphate 3x"] },
  { sku: "076280047820", name: "Spectro Multivitamin", count: "250ct", form: "capsule", url: "https://www.solaray.com/products/spectro-multi-vitamin", unknown: ["Eleuthero Root", "Alfalfa Leaf", "Montmorillonite Clay", "Rose Hips", "Acerola Cherry"] },
  { sku: "076280045246", name: "Calcium & Magnesium Citrate, 1:1 Ratio", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/calcium-magnesium-citrate-1-1-ratio", unknown: ["Parsley Leaf", "Watercress Leaf", "Alfalfa Leaf", "Dandelion Root"] },
  { sku: "076280849202", name: "Creatine with Shilajit", count: "Pineapple", form: "powder", url: "https://www.solaray.com/products/creatine-with-shilajit-pineapple", unknown: ["Natural Pineapple Flavor with Other Natural Flavors", "Steviol Glycoside"] },
  { sku: "076280265354", name: "Papaya Enzyme", count: "90 ct", form: "gummy", url: "https://www.solaray.com/products/papaya-enzyme", unknown: ["Natural Pineapple Flavor with Other Natural Flavors", "Stevia (leaf extract)"] },
  { sku: "076280457933", name: "D-Mannose With Cranactin Cranberry Extract Liquid", count: "8oz", form: "liquid", url: "https://www.solaray.com/products/d-mannose-with-cranactin-cranberry-extract-liquid", unknown: ["Calcium Phosphate", "Potassium Sorbate", "Sodium Benzoate"] },
  { sku: "076280037579", name: "Olive Leaf Extract 17% - 250mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/olive-leaf-extract-17", unknown: ["Dextrin"] },
  { sku: "076280329575", name: "IbuActin, Comfort Formula", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/ibuactin-comfort-formula", unknown: ["Food Starch"] },
  { sku: "076280043594", name: "Niacin 100mg", count: "", form: "capsule", url: "https://www.solaray.com/products/niacin", unknown: ["Whole Rice Concentrate (Including Bran, Polishings, and Germ) Vegetable Cellulose Capsule", "Aloe Vera Gel"] },
  { sku: "076280106152", name: "Lactase", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/lactase", unknown: ["Calcium Phosphate", "Mannitol"] },
  { sku: "076280664560", name: "Collagen Bone Complete", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/collagen-bone-complete", unknown: ["Glycerol Monostearate"] },
  { sku: "076280045277", name: "Cal-Mag Citrate w/D-2, 2:1 Ratio", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/cal-mag-citrate-w-d-2-2-1-ratio", unknown: ["Parsley Leaf", "Alfalfa Leaf", "Watercress Leaf", "Dandelion Root"] },
  { sku: "076280121094", name: "Biocitrate Potassium 99mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/biocitrate-potassium", unknown: ["Parsley Leaf", "Celery Seed", "Dandelion Root", "Watercress Leaf", "Oat Straw Stem"] },
  { sku: "076280031508", name: "Vizion, Eye Support Formula", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/vizion-eye-support-formula", unknown: ["Carrot"] },
  { sku: "076280052107", name: "Thyroid Caps", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/thyroid-caps-freeze-dried-raw-gland-concentrate", unknown: ["Vepemble Cellulose Capsule", "Trace Mineral Complex"] },
  { sku: "076280796452", name: "Vitamin D-3, 50mcg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/vitamin-d-3-50-mg", unknown: ["Natural Lemon Flavor with other Natural Flavors", "Starch"] },
  { sku: "076280030709", name: "Astragalus Root Extract 200mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/astragalus-root-extract", unknown: ["Chicory Root Inulin"] },
  { sku: "076280489453", name: "Mycrobiome Complete Probiotic Active", count: "", form: "capsule", url: "https://www.solaray.com/products/mycrobiome-complete-probiotic-active", unknown: ["Silica. Solnul"] },
  { sku: "076280051803", name: "Pituitary Caps, Freeze-Dried", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/pituitary-caps-freeze-dried", unknown: ["Trace Mineral Complex"] },
  { sku: "076280039054", name: "Valerian Root Extract 300mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/valerian-root-extract-one-daily", unknown: ["Maltodextrin (from Non-GMO Corn)", "Chicory Root Inulin"] },
  { sku: "076280084245", name: "CranActin Chewables", count: "60ct", form: "gummy", url: "https://www.solaray.com/products/cranactin-cranberry-extract-bacterial-antiadherence-formula", unknown: ["Chicory Inulin", "Natural Strawberry Flavor with Other Natural Flavors", "Coconut Oil Powder", "Stevia (leaf extract)"] },
  { sku: "076280517149", name: "Shilajit", count: "", form: "capsule", url: "https://www.solaray.com/products/shilajit", unknown: ["Silica. PrimaVie"] },
  { sku: "076280717051", name: "Organic Frmtd Turmeric Root 425mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/org-grwn-frmtd-turmeric-root", unknown: ["Organic Pullulan Capsule"] },
  { sku: "076280400120", name: "AMPK Activator+Dihydroberberine", count: "", form: "capsule", url: "https://www.solaray.com/products/ampk-activator-dihydroberberine", unknown: ["Silica. ActivAMP"] },
  { sku: "076280081305", name: "Capryl, Caprylic Acid Formula", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/capryl-caprylic-acid-formula", unknown: ["Vegetable Fiber"] },
  { sku: "076280041132", name: "Food Carotene, Vit A as Beta C", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/food-carotene-vit-a-as-beta-c", unknown: ["Soybean Oil", "Mixed Carotenoids", "Ascorbyl Palmitate"] },
  { sku: "076280047943", name: "Men's Golden Multivitamin", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/mens-golden-multi-vitamin", unknown: ["Soy", "Sucrose"] },
  { sku: "076280082074", name: "Ginger Trips", count: "60ct / Ginger Molasses", form: "gummy", url: "https://www.solaray.com/products/ginger-trips", unknown: ["Molasses", "Honey"] },
  { sku: "076280047059", name: "Bio Zinc 15mg", count: "100 ct", form: "capsule", url: "https://www.solaray.com/products/bio-zinc", unknown: ["Whole Rice Concentrate (including Bran, Polishings and Germ)"] },
  { sku: "076280023008", name: "Memory Blend SP-30", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/memory-blend-sp-30", unknown: ["Trace Mineral Complex"] },
  { sku: "076280044607", name: "Super Bio Vitamin C 1000mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/super-bio-vitamin-c-buffered-two-stage-timed-release", unknown: ["Buffering Base (Calcium Carbonate and Magnesium Oxide)"] },
  { sku: "076280034202", name: "Feverfew Leaf Extract 400mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/feverfew-leaf-extract", unknown: ["Maltodextrin (from Non-GMO Corn)", "Oraanic Rice Extract Blend"] },
  { sku: "076280081381", name: "Yeast-Cleanse", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/yeast-cleanse", unknown: ["Dong Quai Root", "Fennel Seed", "Neem Leaf"] },
  { sku: "076280045963", name: "Copper Citrate 2mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/copper-citrate", unknown: ["Dandelion Root", "Watercress Leaf", "Horsetail Herb", "Yellow Dock Root"] },
  { sku: "076280045345", name: "Calcium & Magnesium Amino Acid", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/calcium-magnesium-amino-acid", unknown: ["Rice Protein", "Alfalfa Leaf", "Watercress Leaf", "Dandelion Root", "Parsley Herb"] },
  { sku: "076280370201", name: "Immufight Daily Defense", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/immufight-daily-defense", unknown: ["Calcium Threonate", "Tapioca Starch"] },
  { sku: "076280081039", name: "Cool Cayenne Pepper 40,000 HU", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/cool-cayenne-pepper-40000-hu", unknown: ["Annatto (seed extract)", "Ginger Root"] },
  { sku: "076280254921", name: "Immufight Ultimate Immune Support", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/immufight-ultimate-immune-support", unknown: ["Mal- todextrin", "Calcium Threonate", "Acacia Cum", "Tapioca Starch"] },
  { sku: "076280089301", name: "SOD 2000 Plus", count: "100 ct", form: "capsule", url: "https://www.solaray.com/products/sod-2000-plus", unknown: ["Rice Extract Blend"] },
  { sku: "076280045772", name: "Boron Citrate 3mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/boron-citrate", unknown: ["Organic Alfalfa", "Parsley Leaf", "Kelp"] },
  { sku: "076280790030", name: "White Peony Root Extract 500mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/white-peony-root-extract", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280021301", name: "Liver Blend Sp-13", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/liver-blend-sp-13", unknown: ["Trace Mineral Complex"] },
  { sku: "076280090109", name: "Bio CoQ-10 100mg", count: "30ct", form: "softgel", url: "https://www.solaray.com/products/bio-coq-10", unknown: ["Rice Bran Oil", "Annatto Extract", "Titanium Dioxide"] },
  { sku: "076280013405", name: "Hawthorn Berry 1050mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/hawthorn-berry", unknown: ["Rice Bran Concentrate"] },
  { sku: "076280047851", name: "Spectro Multivitamin, Iron-Free", count: "250ct", form: "capsule", url: "https://www.solaray.com/products/spectro-multi-vitamin-iron-free", unknown: ["Eleuthero Root", "Alfalfa Leaf", "Montmorillonite Clay", "Rose Hips", "Acerola Cherry"] },
  { sku: "076280082005", name: "GarliCare, Cardiovascular", count: "60ct", form: "tablet", url: "https://www.solaray.com/products/garlicare-cardiovascular", unknown: ["Enteric Coating"] },
  { sku: "076280030754", name: "Bamboo Extract 600mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/bamboo-stem-extract", unknown: ["Rice Extract Blend"] },
  { sku: "076280008111", name: "DHA Neuromins 100mg", count: "60ct", form: "softgel", url: "https://www.solaray.com/products/dha-neuromins", unknown: ["Modified Corn Starch (Non-GMO)", "High Oleic Sunflower Oil", "Carrageenan", "Ascorbyl Palmitate (antioxidant)", "Tocopherols (antioxidant)", "Natural Flavor", "Beta Carotene (coloring)", "Caramel (coloring)"] },
  { sku: "076280037814", name: "Saw Palmetto Berry Extract 160mg", count: "30ct", form: "softgel", url: "https://www.solaray.com/products/saw-palmetto-berry-extract", unknown: ["Softgel (Gelatin and Glycerin)", "Virgin Olive Oil"] },
  { sku: "076280846638", name: "Reacta-C & Elderberry", count: "120 ct", form: "capsule", url: "https://www.solaray.com/products/reacta-c-elderberry", unknown: ["Calcium L-Threonate", "Maanesium Stearate"] },
  { sku: "076280022605", name: "Thyroid Blend SP-31", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/thyroid-blend-sp-26", unknown: ["Trace Mineral Complex"] },
  { sku: "076280036015", name: "Ginkgo Biloba Leaf Extract 60mg", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/ginkgo-biloba-leaf-extract", unknown: ["Organic Agave Inulin", "Rice Hull Concentrate"] },
  { sku: "076280814590", name: "D-Mannose with CranActin", count: "226 G", form: "powder", url: "https://www.solaray.com/products/d-mannose-with-cranactin", unknown: ["Organic Natural Lemon", "Cranberry", "Berry Flavors with Other Natural Flavors", "Beet (Beta vulgaris) (root)", "Stevia (Stevia rebaudiana) (leaf extract)"] },
  { sku: "076280036046", name: "Ginkgo Biloba Extract, One Daily 120mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/ginkgo-biloba-extract-one-daily", unknown: ["Organic Agave Inulin"] },
  { sku: "076280518122", name: "Once Daily Woman Multivitamin", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/once-daily-woman-multi-vitamin", unknown: ["Nepetaie Cellulose Capsule", "DIM (Diindolyimethane)", "Tricalcium Phosphate. ChromeMate is a Lonza trademark", "registered in the USA"] },
  { sku: "076280719833", name: "Fermented Lion's Mane Mushroom 1000mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/fermented-lions-mane-mushroom", unknown: ["Organic Pullulan Capsule"] },
  { sku: "076280316247", name: "Berberine & Curcumin", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/berberine-curcumin-root-extracts", unknown: ["Vegetable Cellulose Capsule. AquaTurm is a licensed registered trademark of LODAAT", "LLC"] },
  { sku: "076280449051", name: "Vitamin C", count: "100ct / Orange", form: "gummy", url: "https://www.solaray.com/products/vitamin-c-buffered", unknown: ["Fructose", "Molasses", "Orange Juice Concentrate", "Natural Tangerine Flavor with other Natural Flavors", "Honey", "Sodium Citrate"] },
  { sku: "076280041101", name: "Food Carotene, Vitamin A As Beta Carotene 500 mcg", count: "100ct", form: "softgel", url: "https://www.solaray.com/products/food-carotene-vitamin-a-as-beta-carotene-1", unknown: ["Softgel (Gelatin, Glycerin and Beeswax)", "Lecithin (soy)", "Titanium Dioxide"] },
  { sku: "076280045130", name: "Mega Multi Mineral, Iron-Free", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/mega-multi-mineral-iron-free", unknown: ["Rice Protein", "Citric Acid (from Non-GMO Tapioca)", "Parsley Leaf", "Alfalfa Leaf", "Horsetail", "Watercress", "Dandelion Root", "Yellow Dock Root", "Chamomile", "Kelp"] },
  { sku: "076280046007", name: "Iron Asporotate 18mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/iron-asporotate", unknown: ["Yellowdock Root", "Parsley Herb", "Magnesium Oxide"] },
  { sku: "076280146714", name: "Immufight Maximum Daily Defense", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/immufight-maximum-daily-defense", unknown: ["Calcium Threonate", "Tapioca Starch"] },
  { sku: "076280646306", name: "Super Bio Vitamin C 1000mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/super-bio-vitamin-c-buffered-two-stage-timed-release", unknown: ["Buffering Base (Calcium Carbonate and Magnesium Oxide)"] },
  { sku: "076280046502", name: "Manganese 50mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/manganese", unknown: ["Whole Food Base (Whole Rice Concentrate including Bran, Germ and Polishings)", "Watercress", "Parsley Leaf"] },
  { sku: "076280047721", name: "Mega-Mineral Multivitamin", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/mega-mineral-multi-vitamin", unknown: ["Eleuthero Root", "Whole Rice Concentrate (including the Bran, Polishings and Germ)", "Carrot Juice"] },
  { sku: "076280043518", name: "Vitamin B-12, (5000mcg)", count: "30ct / Black Cherry", form: "capsule", url: "https://www.solaray.com/products/vitamin-b-12", unknown: ["Natural Black Cherry Flavor with other Natural Flavors"] },
  { sku: "076280613575", name: "Vit E Tocotrienols, Annatto 50mg", count: "60ct", form: "softgel", url: "https://www.solaray.com/products/vit-e-tocotrienols-annatto", unknown: ["Rice Bran Oil", "Softgel (Gelatin and Glycerin)"] },
  { sku: "076280320640", name: "Sunflower Vitamin E 268mg", count: "60ct", form: "softgel", url: "https://www.solaray.com/products/super-bio-vit-e-from-sunflower", unknown: ["Softgel (Gelatin and Glycerin)"] },
  { sku: "076280222548", name: "Electrolyte Recovery", count: "Pink Lemonade", form: "powder", url: "https://www.solaray.com/products/electrolyte-recovery", unknown: ["Natural Raspberry", "Lemon Flavors with Other Natural Flavors", "Stevia (leaf extract)"] },
  { sku: "076280013306", name: "Gotu Kola Aerial 450mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/gotu-kola-aerial", unknown: ["Rice Extract Blend"] },
  { sku: "076280669671", name: "Mycrobiome Probiotic Colon Formula, 50bn, 18 Strain Once Daily", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/mycrobiome-probiotic-colon-formula-50bn-18-strain-once-daily", unknown: ["Non-GMO Potato Starch", "Oat Fiber Blend (Oat Fiber, Gum Arabic, Sunflower Lecithin, Sunflower Oil)"] },
  { sku: "076280728507", name: "Liposomal Glutathione", count: "", form: "capsule", url: "https://www.solaray.com/products/liposomal-glutathione", unknown: ["Sunflower Phospholipids"] },
  { sku: "076280046601", name: "Potassium Asporotate 99mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/potassium-asporotate", unknown: ["Herb Base (Parsley Leaf, Chamomile, Watercress)"] },
  { sku: "076280043525", name: "Folic Acid (Vitamin B-9)", count: "", form: "capsule", url: "https://www.solaray.com/products/folic-acid-vitamin-b-9", unknown: ["Aloe Vera Gel (200x dry concentrate)"] },
  { sku: "076280375923", name: "PhytoEstrogen Plus EFA's", count: "60ct", form: "softgel", url: "https://www.solaray.com/products/phytoestrogen-plus-efas", unknown: ["Gelatin Softgel (Gelatin, Glycerin, Carob)", "Lecithin (soy)"] },
  { sku: "076280635003", name: "Organic Elderberry Gummies", count: "", form: "gummy", url: "https://www.solaray.com/products/organic-elderberry-gummies", unknown: ["Organic Tapioca Syrup", "Organic Cane Sugar", "Contains Less than 2% of Citric Acid", "Organic Natural Lemon & Raspberry Flavors with other Natural Flavors", "Organic Sunflower Oil & Organic Carnauba Wax", "Pectin", "Sodium Citrate"] },
  { sku: "076280633498", name: "D-Mannose With Cranactin Cranberry Extract 1000mg", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/d-mannose-with-cranactin-cranberry-extract", unknown: ["Maltodextrin (from Non-GMO Corn)", "Organic Rice Bran Extract"] },
  { sku: "076280477986", name: "ActiveMag", count: "", form: "capsule", url: "https://www.solaray.com/products/activemag-magnesium-potassium", unknown: ["Mica"] },
  { sku: "076280229639", name: "ProSorb Turmeric 29x 500mg", count: "30 ct", form: "capsule", url: "https://www.solaray.com/products/prosorb-turmeric-29x-500mg", unknown: ["Vegetable Capsule"] },
  { sku: "076280282467", name: "Activated Broccoli Seed Extract 350mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/activated-broccoli-seed-extract", unknown: ["Calcium Ascorbate"] },
  { sku: "076280191103", name: "Organic Burdock Root 970mg", count: "100 ct", form: "capsule", url: "https://www.solaray.com/products/organically-grown-burdock-root", unknown: ["Organic Pullulan Capsule"] },
  { sku: "076280459319", name: "Copper 2mg", count: "100 ct", form: "capsule", url: "https://www.solaray.com/products/copper", unknown: ["Rice Extract Blend"] },
  { sku: "076280417463", name: "ProSorb Ashwagandha 18x 240mg", count: "", form: "capsule", url: "https://www.solaray.com/products/prosorb-ashwaganda", unknown: ["Silica. Shoden"] },
  { sku: "076280675559", name: "Her Life Stages Postmenopause", count: "60 ct", form: "capsule", url: "https://www.solaray.com/products/her-life-stages-postmenopause", unknown: ["Maltodextrin (from Non-GMO Corn)", "Vegetable Capsule", "Silica. Chromax"] },
  { sku: "076280034165", name: "Fenugreek Seed Extract 700mg", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/fenugreek-seed-extract", unknown: ["Rice Extract Blend"] },
  { sku: "076280399110", name: "Gymnema Leaf Extract 385mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/gymnema-leaf-extract", unknown: ["Organic Rice Bran Extract Blend"] },
  { sku: "076280149074", name: "Vegan Collagen Booster", count: "", form: "powder", url: "https://www.solaray.com/products/vegan-collagen-booster", unknown: ["Natural Vanilla Flavor with Other Natural Flavors", "Sea Salt", "Gotu Kola (Centella asiatica) (extract)", "Steviol Glycoside", "Ginseng (Panax ginseng) (root extract)"] },
  { sku: "076280013672", name: "Lemon Balm Aerial 475mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/lemon-balm-aerial", unknown: ["Rice Extract Blend"] },
  { sku: "076280615579", name: "StressMag", count: "", form: "capsule", url: "https://www.solaray.com/products/stressmag", unknown: ["Silica. Shoden"] },
  { sku: "076280293371", name: "Methyl B-12 - Lemon-Raspberry", count: "60ct / Natural Lemon-Raspberry", form: "capsule", url: "https://www.solaray.com/products/methyl-b-12", unknown: ["Organic Inulin", "Organic Lemon Flavor with Other Natural Flavors", "Citric Acid (from Non-GMO Tapioca)", "Natural Raspberry Flavor"] },
  { sku: "076280399042", name: "Bacopa Leaf Extract 100mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/bacopa-leaf-extract", unknown: ["Organic Rice Bran Extract Blend"] },
  { sku: "076280693034", name: "Mycrobiome Probiotic Weight Formula, 50 Billion, 18 Strain Once Daily", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/mycrobiome-probiotic-weight-formula-50-billion-18-strain-once-daily", unknown: ["Non-GMO Potato Starch", "Oat Fiber Blend (Oat Fiber, Gum Arabic, Sunflower Lecithin, Sunflower Oil)"] },
  { sku: "076280035001", name: "Korean Ginseng Root Extract 535mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/korean-ginseng-root-extract", unknown: ["Maltodextrin (from Non-GMO Tapioca)"] },
  { sku: "076280036640", name: "Hawthorn Aerial Ext, One Daily 600mg", count: "30 ct", form: "capsule", url: "https://www.solaray.com/products/hawthorn-aerial-ext-one-daily", unknown: ["Maltodextrin (from Non-GMO Corn)", "Vegetable Celluose Capsule"] },
  { sku: "076280013108", name: "American Ginseng Root 480mg", count: "50 ct", form: "capsule", url: "https://www.solaray.com/products/american-ginseng-root", unknown: ["Organic Rice Bran Extract Blend"] },
  { sku: "076280376951", name: "Rhodiola Root Extract 100mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/rhodiola-root-extract", unknown: ["Organic Agave Inulin", "Chicory Root Inulin"] },
  { sku: "076280375862", name: "PhytoEstrogen, One Daily", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/phytoestrogen-one-daily", unknown: ["Grapefruit Juice Concentrate", "Pygeum (bark extract)", "African Cherry (berry)", "Saw Palmetto (berry)", "Ginger (root)", "Licorice (root)", "Alpha Galactosidase"] },
  { sku: "076280169324", name: "SharpMind Memory", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/sharpmind-memory", unknown: ["Organic Arabic Gum", "Non-GMO Maltodextrin"] },
  { sku: "076280012392", name: "Echinacea Root with Vitamin C 850mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/echinacea-root-with-vitamin-c", unknown: ["Chicory Root Inulin"] },
  { sku: "076280083781", name: "Focus For Children", count: "Grape / 60ct", form: "gummy", url: "https://www.solaray.com/products/focus-for-children", unknown: ["Croan Inulin", "FOS Blend (Fructooligosaccharides)", "Blueberry (fruit extract)", "Natural Grape Flavor with other Natural Flavors (milk)", "Stevia (leaf extract)"] },
  { sku: "076280955002", name: "PEAK ATP®", count: "", form: "capsule", url: "https://www.solaray.com/products/peak-atp", unknown: ["Silica. PEAK ATP"] },
  { sku: "076280083866", name: "Cardio Complete, Cardiovascular", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/cardiocomplete-cardiovascular", unknown: ["Magnesium Carbonate", "Magnesium Oxide", "Corn Starch"] },
  { sku: "076280352740", name: "Akkermansia", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/akkermansia", unknown: ["Resistant Potato Starch"] },
  { sku: "076280610093", name: "Super Omega 3-7-9", count: "120 ct", form: "softgel", url: "https://www.solaray.com/products/super-omega-3-7-9", unknown: ["Softgel (Gelatin, Glycerin)", "Safflower Oil"] },
  { sku: "076280824810", name: "CoQ-10, Ubiquinol 100mg", count: "30ct", form: "softgel", url: "https://www.solaray.com/products/coq-10-ubiquinol", unknown: ["D-Limonene Oil", "Caprylic Acid", "Capric Acid", "Alpha Lipoic Acid", "Caramel Liquid"] },
  { sku: "076280788020", name: "Spermidine", count: "", form: "capsule", url: "https://www.solaray.com/products/spermidine", unknown: ["Tapioca Dextrin", "Silica. Miricell"] },
  { sku: "076280036602", name: "Hawthorn Aerial Extract 100mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/hawthorn-aerial-extract", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280045833", name: "Calcium Citrate With Vitamin D-3 1000mg", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/calcium-citrate-with-vitamin-d-3", unknown: ["Watercress Leaf", "Dandelion Root", "Parsley Leaf"] },
  { sku: "076280938449", name: "Choline", count: "", form: "capsule", url: "https://www.solaray.com/products/choline", unknown: ["Hypromellose Capsule"] },
  { sku: "076280039009", name: "Valerian Root Extract 50mg", count: "", form: "capsule", url: "https://www.solaray.com/products/valerian-root-extract", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280041200", name: "Food Carotene, Vitamin A As Beta Carotene 7500mcg", count: "100ct", form: "softgel", url: "https://www.solaray.com/products/food-carotene-vitamin-a-as-beta-carotene-7500-mcg-25000-iu", unknown: ["Softgel (Gelatin, Glycerin and Beeswax)", "Lecithin (soy)", "Titanium Dioxide"] },
  { sku: "076280886757", name: "Opti-5 Magnesium", count: "", form: "capsule", url: "https://www.solaray.com/products/opti-5-magnesium", unknown: ["Arabic Gum", "Cellulose. Aquamin"] },
  { sku: "076280045178", name: "Magnesium Potassium Bromelain", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/magnesium-potassium-asporotate", unknown: ["Arabic Gum", "Cellulose. Aquamin"] },
  { sku: "076280037753", name: "St. John's Wort Aerial Extract 300mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/st-johns-wort-aerial-extract", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280033755", name: "Dong Quai Root Ext 250mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/dong-quai-root-ext", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280047004", name: "Zinc Asporotate 15mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/zinc-asporotate", unknown: ["Calcium Silicate", "Magnesium Oxide"] },
  { sku: "076280051001", name: "Adrenal Caps", count: "60 ct", form: "capsule", url: "https://www.solaray.com/products/adrenal-caps-freeze-dried-raw-gland-concentrate", unknown: ["Vegetable Cellulose Cpa", "Calcium Phosphate 3x", "Iron Pyrophosphate", "Potassium Phosphate 3x", "Sodium Chloride 6x"] },
  { sku: "076280045253", name: "Calcium & Magnesium Citrate", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/calcium-magnesium-citrate", unknown: ["Parsley Leaf", "Watercress Leaf", "Alfalfa Leaf", "Dandelion Root"] },
  { sku: "076280355888", name: "Vegan Betaine HCL & Pepsin", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/vegan-betaine-hcl-pepsin", unknown: ["Tapioca Dextrin"] },
  { sku: "076280458350", name: "Calcium Citrate With Vitamin D-3 1000mg", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/calcium-citrate-with-vitamin-d-3", unknown: ["Watercress Leaf", "Dandelion Root", "Parsley Leaf"] },
  { sku: "076280041309", name: "Vitamin A, Dry Form 7500mcg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/vitamin-a-dry-form", unknown: ["Sucrose", "Starch", "Carrot Juice (root)"] },
  { sku: "076280903966", name: "Moro Red Orange Extract Morosil", count: "30 ct", form: "capsule", url: "https://www.solaray.com/products/moro-red-orange-extract-morosil", unknown: ["Silica. Morosil"] },
  { sku: "076280045116", name: "Mega Multi Mineral", count: "200ct", form: "capsule", url: "https://www.solaray.com/products/mega-multi-mineral", unknown: ["Parsley", "Alfalfa Leaf", "Horsetail", "Watercress", "Dandelion Root", "Yellow Dock Root", "Chamomile"] },
  { sku: "076280008340", name: "Borage Seed Oil GLA 1000mg", count: "50ct", form: "softgel", url: "https://www.solaray.com/products/borage-seed-oil-gla", unknown: ["Softgel (Gelatin, Glycerin)"] },
  { sku: "076280435450", name: "Biotin Lozenge 5000mcg", count: "Tangy Fruit / 60 ct", form: "capsule", url: "https://www.solaray.com/products/biotin-lozenge-1000mcg-tangy-fruit", unknown: ["Natural Peach Flavor with Other Natural Flavors", "Orange Juice Powder"] },
  { sku: "076280045314", name: "Calcium & Magnesium, AAC 2:1", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/calcium-magnesium-amino-acid-chelate-2-1-ratio", unknown: ["Citric Acid (from Non-GMO Tapioca)", "L-Aspartic Acid", "Rice Protein", "Alfalfa Aerial", "Dandelion Root", "Watercress Leaf", "Parsley Aerial"] },
  { sku: "076280083996", name: "CranActin Cranberry Extract 400mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/cranactin-cranberry-extract", unknown: ["Maltodextrin (from Non-GMO Corn)", "Magnesium Oxide", "Vegetable Juice Concentrate"] },
  { sku: "076280021608", name: "Prostate Blend Sp-16", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/prostate-blend-sp-16", unknown: ["Trace Mineral Complex"] },
  { sku: "076280042658", name: "Vitamin B-Complex - Strawberry", count: "50ct / Strawberry", form: "gummy", url: "https://www.solaray.com/products/vitamin-b-complex", unknown: ["Natural Strawberry with other natural flavors", "Soybean Oil", "Monoglycerides", "Diglycerides", "Stevia Leaf Extract", "Citric Acid (from Non-GMO Tapioca)"] },
  { sku: "076280046700", name: "Potassium 99mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/potassium-99", unknown: ["Parsley", "Chamomile", "Watercress"] },
  { sku: "076280045239", name: "Calcium & Magnesium Citrate With Vitamin D-2, 1:1", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/calcium-magnesium-citrate-with-vitamin-d-2-1-1-ratio", unknown: ["Parsley Leaf", "Watercress", "Alfalfa Leaf", "Dandelion Root"] },
  { sku: "076280083620", name: "Total Cleanse Colon", count: "60 ct / Veg Cap", form: "capsule", url: "https://www.solaray.com/products/total-cleanse-colon", unknown: ["Magnesium Citrate"] },
  { sku: "076280021158", name: "Circulation Blend SP-11B", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/circulation-blend-sp-11b", unknown: ["Trace Mineral Complex"] },
  { sku: "076280002768", name: "Female Hormone Blend Sp-7c", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/female-hormone-blend-sp-7c", unknown: ["Trace Mineral Complex"] },
  { sku: "076280837162", name: "EMIQ 50mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/emiq", unknown: ["Dextrin"] },
  { sku: "076280598933", name: "Aged Black Garlic", count: "", form: "capsule", url: "https://www.solaray.com/products/aged-black-garlic", unknown: ["Garlzac"] },
  { sku: "076280008401", name: "Cranactin Cranberry Extract 400mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/cranactin-cranberry-extract-bacterial-antiadherence-formula-1", unknown: ["Maltodextrin (from Non-GMO Corn)", "Magnesium Oxide", "Vegetable Juice Concentrate"] },
  { sku: "076280377644", name: "St. John's Wort Extract 2 Daily, 900mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/st-johns-wort-extract-2-daily", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280924008", name: "Hyaluronic Acid 20mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/hyaluronic-acid", unknown: ["Maqnesium Stearate"] },
  { sku: "076280008685", name: "Peppermint Oil, Enteric Coated", count: "60ct", form: "softgel", url: "https://www.solaray.com/products/peppermint-oil-enteric-coated", unknown: ["Soybean Oil", "Aqueous Coating", "Lecithin (Soy)", "Chlorophyll", "Zinc Oxide"] },
  { sku: "076280114836", name: "Hyaluronic Acid 60mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/3x-strength-hyaluronic-acid", unknown: ["Glycerol Triacetate"] },
  { sku: "076280033557", name: "Tart Cherry Fruit Extract 850mg", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/tart-cherry-fruit-extract", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280106190", name: "Ultra Zeaxanthin 6mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/ultra-zeaxanthin", unknown: ["Sucrose", "Tapioca Starch"] },
  { sku: "076280042047", name: "Vitamin E, D-Alpha Tocopherol 670mg", count: "60ct", form: "softgel", url: "https://www.solaray.com/products/vitamin-e-d-alpha-tocopherol-670-mg-1000-iu", unknown: ["Softgel (Gelatin and Glycerin)"] },
  { sku: "076280047912", name: "Hair Nutrients", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/hair-nutrients", unknown: ["Rice Flours Magnesium Stearate", "Alfalfa Leaf", "Parsley Leaf", "Watercress Leaf"] },
  { sku: "076280124453", name: "Elderberry Berry & Flower 450mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/elderberry-berry-flower", unknown: ["Oat Fiber"] },
  { sku: "076280577860", name: "ProSorb Quercetin 20x 250mg", count: "30 ct", form: "capsule", url: "https://www.solaray.com/products/prosorb-quercetin-20x-250mg", unknown: ["Potato Maltodextrin", "Magnesium Stearate. Quercefit", "Phytosome are trademarks of Indena S.p.A", "Italy"] },
  { sku: "076280697551", name: "Super Bio Vitamin D-3 - 125mcg", count: "120ct", form: "softgel", url: "https://www.solaray.com/products/super-bio-vitamin-d-3-in-coconut-oil", unknown: ["Coconut Oil", "Softgel (Gelatin and Glycerin)"] },
  { sku: "076280507874", name: "SharpMind Nootropics Sleep", count: "30 ct", form: "capsule", url: "https://www.solaray.com/products/sharpmind-nootropics-sleep", unknown: ["Silica. Shoden"] },
  { sku: "076280083965", name: "Liquid Cranactin Cranberry Extract 315mg", count: "Cranberry / 315mg", form: "liquid", url: "https://www.solaray.com/products/liquid-cranactin-cranberry-extract-bacterial-antiadherence-formula", unknown: ["Stevia (leaf extract)"] },
  { sku: "076280043549", name: "Biotin Lozenge 1000mcg", count: "60ct / Orange", form: "capsule", url: "https://www.solaray.com/products/biotin", unknown: ["Natural Orange Juice Flavor with Other Natural Flavors"] },
  { sku: "076280046953", name: "Selenium 200mcg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/selenium-200", unknown: ["Nutritional Yeast"] },
  { sku: "076280127195", name: "Serrapeptase 10mg", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/serrapeptase", unknown: ["Enteric Coating"] },
  { sku: "076280474848", name: "Biocitrate Strontium 250mg", count: "60 ct", form: "capsule", url: "https://www.solaray.com/products/biocitrate-strontium", unknown: ["Alfalfa Leaf", "Parsley Leaf", "Kelp"] },
  { sku: "076280081527", name: "Glucosamine Sulfate, Two Daily 1500mg", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/glucosamine-sulfate-two-daily", unknown: ["Maanesitum Stearate"] },
  { sku: "076280014402", name: "Pau D'Arco 550mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/pau-darco-inner-bark", unknown: ["Organic Agave Inulin", "Coconut Oil", "Dextrin (from Non-GMO Tapioca)"] },
  { sku: "076280084269", name: "Continence with Flowtrol", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/continence-with-flowtrol", unknown: ["Vegetable Cellulose peste Maltodextrin", "Calcium Phosphate", "Magensium Stearate"] },
  { sku: "076280461053", name: "Iron 50mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/iron", unknown: ["Herbal Base (Parsley, Rice Flour, Yellow Dock Root)", "Ascorbyl Palmitate"] },
  { sku: "076280361537", name: "Vitamin K-2, MK-7 50mcg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/vitamin-k-2-mk-7", unknown: ["Glycerol Monostearate", "Magnesium tear", "Fermented Defatted Chickpea Flour Extract", "Organic Rice Extract lend"] },
  { sku: "076280616903", name: "Liposomal Multivitamin Women's 50+", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/liposomal-multivitamin-womens-50", unknown: ["Lipld Blend from Sunflower Oil", "Sus- tainable Palm Oil", "Modified Tapioca Starch", "Glycerol Monostearate", "Tapioca Starch"] },
  { sku: "076280406207", name: "Vitamin B-Complex - Orange", count: "50ct / Orange", form: "gummy", url: "https://www.solaray.com/products/vitamin-b-complex-1", unknown: ["Natural Orange Flavor with Other Natural Flavors", "Soybean Oil", "Monoglycerides", "Diglycerides", "Stevia Leaf Extract"] },
  { sku: "076280644753", name: "Super Forskohlii Root Extract 400mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/super-forskohlii-root-exract", unknown: ["Vegetarian Capsule"] },
  { sku: "076280041262", name: "Lycopene 10mg", count: "60 ct", form: "softgel", url: "https://www.solaray.com/products/lycopene", unknown: ["Softgel (Gelatin and Glycerin)"] },
  { sku: "076280036596", name: "Guggul Ext & Red Yeast Rice", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/guggul-ext-red-yeast-rice", unknown: ["Megs Carbonate", "Magnesium Oxide", "Starch"] },
  { sku: "076280008364", name: "Evening Primrose 500mg", count: "90ct", form: "softgel", url: "https://www.solaray.com/products/high-potency-evening-primrose", unknown: ["Softgel (Gelatin, Glycerin)"] },
  { sku: "076280047929", name: "Women's Golden Multivitamin", count: "90 ct", form: "capsule", url: "https://www.solaray.com/products/womens-golden-multi-vitamin", unknown: ["Soy", "Sucrose"] },
  { sku: "076280013412", name: "Hawthorn Berry 1050mg", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/hawthorn-berry", unknown: ["Rice Bran Concentrate"] },
  { sku: "076280937145", name: "Nattokinase and Serrapeptase", count: "", form: "capsule", url: "https://www.solaray.com/products/solaray-nattokinase-serrapeptase-supplement-3-000-fu-healthy-circulation-blood-flow-support-30-vegcaps", unknown: ["Vegetable Cellulose", "Dextrin", "Enteric Coating"] },
  { sku: "076280002300", name: "Respiration Blend SP-3", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/respiration-blend-sp-3", unknown: ["Trace Mineral Complex"] },
  { sku: "076280031577", name: "GlucoReg, Blood Glucose Support", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/glucoreg-blood-glucose-support", unknown: ["Fenugreek Seeds"] },
  { sku: "076280582505", name: "Colostrum+", count: "Peach Mango", form: "powder", url: "https://www.solaray.com/products/colostrum", unknown: ["Natural Peach", "Mango Flavors with Other Natural Flavors", "Stevia (leaf extract)"] },
  { sku: "076280043808", name: "Pantothenic Acid 500mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/pantothenic-acid", unknown: ["Rice Extract Blend", "Aloe Vera Gel"] },
  { sku: "076280463019", name: "Magnesium Citrate 400mg", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/magnesium-citrate", unknown: ["Arabic Gum", "Watercress Leaf", "Dandelion Root", "Alfalfa Leaf", "Parsley Leaf. Aquamin"] },
  { sku: "076280749748", name: "AHCC + NAC & Beta Glucan", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/ahcc-plus-nac-beta-glucan", unknown: ["Cellulose. AHCC"] },
  { sku: "076280041408", name: "Vitamin D-3 - 10mcg", count: "120ct", form: "softgel", url: "https://www.solaray.com/products/vitamin-d-3", unknown: ["Safflower Oil"] },
  { sku: "076280553871", name: "QBC Plex Quercetin & Bromelain", count: "90ct / Orange", form: "gummy", url: "https://www.solaray.com/products/qbc-plex-quercetin-bromelain", unknown: ["Orange Juice", "Natural Orange Flavor with Other Natural Flavors (soy)", "Stevia Leaf Extract", "Citric Acid (from Non-GMO Cassava)"] },
  { sku: "076280986372", name: "Black Garlic Bulb", count: "50", form: "capsule", url: "https://www.solaray.com/products/fermented-black-garlic-bulb", unknown: ["Rice Extract Blend"] },
  { sku: "076280342987", name: "Methyl B-12 - Cherry", count: "60ct / Natural Cherry", form: "capsule", url: "https://www.solaray.com/products/methyl-b-14", unknown: ["pea Organic Inulin", "Citric Acid (from Non-GMO Tapioca)", "Natural Cherry Flavor with other Natural Flavors"] },
  { sku: "076280011159", name: "Butcher's Broom Root 440mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/butchers-broom-root", unknown: ["Rice Extract Blend"] },
  { sku: "076280812244", name: "Continence Max with Flowtrol", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/continence-max-with-flowtrol", unknown: ["Rice Hull Concentrate", "Calcium Phosphate"] },
  { sku: "076280418873", name: "Chromium Picolinate 1000mcg", count: "100ct / Lemon-Raspberry", form: "capsule", url: "https://www.solaray.com/products/chromium-picolinate", unknown: ["Natural Flavors (Lemon and Raspberry with other Natural Flavors)", "FOS Blend (fructooligosaccharides, sprouted mung bean extract)"] },
  { sku: "076280036909", name: "Wild Yam Root Extract 275mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/wild-yam-root-extract", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280968682", name: "Liposomal Multivitamin Prenatal", count: "", form: "capsule", url: "https://www.solaray.com/products/liposomal-prenatal", unknown: ["Lipid Blend from Sunflower Oil", "Sustainable Palm Oil", "Vegetable Cellulose peru. Coles", "Modified Tapioca Starch", "ea i"] },
  { sku: "076280278774", name: "Triple Strength Vitamin K-2, Mk-7", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/triple-strength-vitamin-k-2-mk-7", unknown: ["Glycerol Monostearate", "Fermented Defatted Chickpea Flour Extract"] },
  { sku: "076280044904", name: "Vitamin C 500mg", count: "100ct / Cherry", form: "gummy", url: "https://www.solaray.com/products/vitamin-c", unknown: ["Fructose", "Natural Cherry Flavor with other Natural Flavors", "Beet Root Juice (for color)", "Stevia (leaf extract)", "Rose Hips (fruit)", "Calcium Silicate", "Acerola (fruit juice)"] },
  { sku: "076280045147", name: "Mega Multi Mineral, Iron-Free", count: "200ct", form: "capsule", url: "https://www.solaray.com/products/mega-multi-mineral-iron-free", unknown: ["Rice Protein", "Citric Acid (from Non-GMO Tapioca)", "Parsley Leaf", "Alfalfa Leaf", "Horsetail", "Watercress", "Dandelion Root", "Yellow Dock Root", "Chamomile", "Kelp"] },
  { sku: "076280008326", name: "Black Currant Seed Hexane-Free 600mg", count: "90ct", form: "softgel", url: "https://www.solaray.com/products/black-currant-seed-hexane-free", unknown: ["Softgel (Gelatin, Glycerin, Water)"] },
  { sku: "076280600438", name: "Mushroom Herb Complex", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/mushroom-complete-8", unknown: ["Vegetarian Capsule"] },
  { sku: "076280038026", name: "Turmeric Root Ext, Formula", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/turmeric-root-ext-formula", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280046212", name: "Magnesium Asporotate 400mg", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/magnesium-asporotate", unknown: ["Herb Base (Parsley Leaf, Organic Alfalfa Leaf)"] },
  { sku: "076280047875", name: "Baby Me Now Prenatal Multivitamin", count: "150ct", form: "tablet", url: "https://www.solaray.com/products/baby-me-now-prenatal-multi-vitamin-original-formula", unknown: ["Carrot Juice", "Acerola Cherry"] },
  { sku: "076280955781", name: "Her Life Stages Perimenopause", count: "60 ct", form: "capsule", url: "https://www.solaray.com/products/her-life-stages-perimenopause", unknown: ["Vegetable Capsule", "Dextrin"] },
  { sku: "076280160857", name: "Turmeric Liquid Extract", count: "", form: "liquid", url: "https://www.solaray.com/products/turmeric-liquid-extract", unknown: ["Grain Alcohol (45-55% by volume)", "Deionized Water"] },
  { sku: "076280462128", name: "Papaya Enzyme", count: "180 ct", form: "gummy", url: "https://www.solaray.com/products/papaya-enzyme", unknown: ["Natural Pineapple Flavor with Other Natural Flavors", "Stevia (leaf extract)"] },
  { sku: "076280413496", name: "Oregano Oil 70% Carvacrol, 57mg", count: "60 ct", form: "softgel", url: "https://www.solaray.com/products/oregano-oil-70-carvacrol", unknown: ["Softgel (Gelatin and Glycerin)"] },
  { sku: "076280021707", name: "Sleep Blend Sp-17", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/sleep-blend-sp-17", unknown: ["Trace Mineral Complex"] },
  { sku: "076280041682", name: "Bio Vitamin E + Selenium 268mg", count: "60ct", form: "softgel", url: "https://www.solaray.com/products/bio-vitamin-e-with-selenium", unknown: ["Softgel (Gelatin and Glycerin)", "Soy Oil"] },
  { sku: "076280116649", name: "Butterbur Root Extract 50mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/butterbur-root-extract", unknown: ["Organic Agave Inulin", "Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280081015", name: "Cool Cayenne Pepper 40,000 Hu", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/cool-cayenne-pepper-40-000-hu", unknown: ["Annatto (seed extract)", "Ginger (root)"] },
  { sku: "076280195538", name: "Organic St. John's Wort 900mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/organically-gr-st-johns-wort", unknown: ["Organic Pullulan Capsules"] },
  { sku: "076280016604", name: "White Willow Bark 400mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/white-willow-bark", unknown: ["Rice Extract Blend"] },
  { sku: "076280089127", name: "CoQ-10", count: "30ct / 100 mg", form: "capsule", url: "https://www.solaray.com/products/coq-10", unknown: ["Calcium Silicate"] },
  { sku: "076280034073", name: "Sambuactin Elderberry Extract | 60 Lozenges", count: "", form: "capsule", url: "https://www.solaray.com/products/sambuactin-elderberry-extract-60-lozenges", unknown: ["Natural Mixed Berry Flavor with other Natural Flavors"] },
  { sku: "076280238877", name: "Okra Fruit 1600mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/okra-fruit", unknown: ["Maltodextrin (from Non-GMO Sweet Potato)", "Rice Extract Blend"] },
  { sku: "076280045857", name: "Calcium Citrate 1000mg", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/calcium-citrate", unknown: ["Watercress Leaf", "Dandelion Root", "Parsley Leaf"] },
  { sku: "076280008074", name: "Flaxseed Oil 1000mg", count: "140 ct", form: "softgel", url: "https://www.solaray.com/products/flax", unknown: ["Gelatin (Bovine)", "Carob"] },
  { sku: "076280046304", name: "Magnesium, Amino Acid Chelate 200mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/magnesium-amino-acid-chelate", unknown: ["Organic Alfalfa", "Parsley"] },
  { sku: "076280733495", name: "Oregano + Black Seed Oil", count: "", form: "softgel", url: "https://www.solaray.com/products/oregano-black-seed-oil", unknown: ["Hypromellose Capsule"] },
  { sku: "076280043631", name: "Niacin 500mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/niacin-1", unknown: ["Aloe Vera Gel"] },
  { sku: "076280043457", name: "Vitamin B-12 1000mcg", count: "90ct / Cherry", form: "capsule", url: "https://www.solaray.com/products/copy-of-vitamin-b-12", unknown: ["Natural Cherry with other Natural Flavors"] },
  { sku: "076280002607", name: "Kidney Blend SP-6", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/kidney-blend-sp-6", unknown: ["Trace Mineral Complex"] },
  { sku: "076280107272", name: "Pumpkin Seed Oil 1000mg", count: "90ct", form: "softgel", url: "https://www.solaray.com/products/pumpkin-seed-oil", unknown: ["Softgel (Gelatin, Glycerin)"] },
  { sku: "076280107463", name: "Green Tea Leaf Extract, Double 500mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/green-tea-leaf-extract-double", unknown: ["Oraanic Rice Extract Blend"] },
  { sku: "076280046908", name: "Selenium 100mcg", count: "100", form: "capsule", url: "https://www.solaray.com/products/selenium-100", unknown: ["Nutritional Yeast"] },
  { sku: "076280111071", name: "Super Rhodiola Root Extract 500mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/super-rhodiola-root-extract", unknown: ["Rice Extract Blend"] },
  { sku: "076280030693", name: "Asparagus Rhizome Extract 175mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/asparagus-rhizome-extract", unknown: ["Cassava Flour", "Maltodextrin (from Non-GMO Tapioca)"] },
  { sku: "076280083323", name: "MigraGard 400mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/migragard", unknown: ["Feverfew (Tanacetum panama) (aerial)", "Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280002775", name: "Menopause Blend SP-7D", count: "100 ct", form: "capsule", url: "https://www.solaray.com/products/menopause-blend-sp-7d", unknown: ["Calcium Phosphate 3x", "Potassium Phosphate 3x", "Silica 6x"] },
  { sku: "076280015706", name: "Senna Leaf 470mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/senna-leaf", unknown: ["Rice Extract Blend"] },
  { sku: "076280739503", name: "Extra-Strength Magnesium Glycinate Powder 500 mg", count: "Lemon Lime", form: "powder", url: "https://www.solaray.com/products/extra-strength-magnesium-glycinate-powder-unflavored-500-mg", unknown: ["Natural Lemon", "Lime Flavors with Other Natural Flavors", "Stevia (leaf extract)"] },
  { sku: "076280173987", name: "Hibiscus Flower Extract 250mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/hibiscus-flower-extract", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280037623", name: "Pygeum Bark Extract, 100mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/pygeum-bark-extract-one-daily", unknown: ["Organic Agave Inulin"] },
  { sku: "076280464795", name: "Fermented Korean Ginseng Root 150mg", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/fermented-korean-ginseng-root", unknown: ["Gum Acacia"] },
  { sku: "076280545753", name: "Electrolyte Recovery", count: "Watermelon", form: "powder", url: "https://www.solaray.com/products/electrolyte-recovery", unknown: ["Natural Watermelon Flavor with Other Natural Flavors", "Stevia (leaf extract)"] },
  { sku: "076280111019", name: "Guggul Ext & Red Yeast Rice", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/guggul-ext-red-yeast-rice", unknown: ["Moqnesum Carbonate", "Magnesium Oxide", "Starch"] },
  { sku: "076280030181", name: "Andrographis Extract 600mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/andrographis-aerial-extract", unknown: ["Chicory Root Inulin"] },
  { sku: "076280329568", name: "Plant Melatonin", count: "", form: "capsule", url: "https://www.solaray.com/products/plant-melatonin", unknown: ["Tapioca Dextrin", "Silica. SOMATO"] },
  { sku: "076280046205", name: "Magnesium Asporotate 400mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/magnesium-asporotate", unknown: ["Herb Base (Parsley Leaf, Alfalfa Leaf)"] },
  { sku: "076280376814", name: "Pygeum & Saw Palmetto Extracts 420mg", count: "240ct", form: "capsule", url: "https://www.solaray.com/products/pygeum-saw-palmetto-extracts-1", unknown: ["Saw Palmetto Berry Extract", "Pumpkin Seed", "L-Alanine", "Glutamic Acid HCI", "L-Glycine"] },
  { sku: "076280037524", name: "Nettle Root Extract 300mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/nettle-root-extract", unknown: ["Organic Agave Inulin", "Rice Extract Blend"] },
  { sku: "076280279771", name: "Immufight Immune Response", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/immufight-immune-response", unknown: ["Calcium Threonate", "Tapioca Starch"] },
  { sku: "076280041699", name: "Bio Vitamin E + Selenium 268mg", count: "120ct", form: "softgel", url: "https://www.solaray.com/products/bio-vitamin-e-with-selenium", unknown: ["Softgel (Gelatin and Glycerin)", "Soy Oil"] },
  { sku: "076280047073", name: "OptiZinc 30mg", count: "60 ct", form: "capsule", url: "https://www.solaray.com/products/optizinc", unknown: ["Whole Rice Concentrate (including bran, polishing and germ)", "Kelp", "Magnesium Stearate. sos a ae QOptiZinc OptiZinc is a Lonza trademark", "registered in the USA"] },
  { sku: "076280012200", name: "Devil's Claw Root 525mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/devils-claw-root", unknown: ["Rice Extract Blend"] },
  { sku: "076280088618", name: "Total Calm, Mood Support", count: "30ct", form: "capsule", url: "https://www.solaray.com/products/total-calm-mood-support", unknown: ["Modified Food", "Corn Starch"] },
  { sku: "076280041637", name: "Vitamin E, Mixed Tocopherols 268mg", count: "100ct", form: "softgel", url: "https://www.solaray.com/products/vitamin-e-d-alpha-tocopherol-268-mg-400-iu", unknown: ["Soybean Oil", "Softgel (Gelatin and Glycerin)"] },
  { sku: "076280524420", name: "Testosterone Support*", count: "", form: "capsule", url: "https://www.solaray.com/products/testosterone-support", unknown: ["Silica. Tesnor"] },
  { sku: "076280046809", name: "Selenium 50mcg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/selenium-50", unknown: ["Nutritional Yeast"] },
  { sku: "076280045161", name: "Magnesium Potassium Bromelain", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/magnesium-potassium-asporotate", unknown: ["Arabic Gum", "Cellulose. Aquamin"] },
  { sku: "076280023305", name: "Histamine Blend SP-33", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/histamine-blend-sp-33", unknown: ["Mean Stereate", "Trace Mineral Complex"] },
  { sku: "076280037692", name: "Pygeum & Saw Palmetto w/CranActin", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/pygeum-saw-palmetto-w-cran", unknown: ["Pumpkin Seeds", "Beet Root", "L-Alanine", "Glutamic Acid HCl"] },
  { sku: "076280238396", name: "Triple Strength Sambuactin", count: "60ct", form: "tablet", url: "https://www.solaray.com/products/triple-strength-sambuactin", unknown: ["Sodium Crosscarmellose", "Bilberry (fruit)", "Stevia (leaf)"] },
  { sku: "076280047837", name: "Spectro Multivitamin", count: "360ct", form: "capsule", url: "https://www.solaray.com/products/spectro-multi-vitamin", unknown: ["Eleuthero Root", "Alfalfa Leaf", "Montmorillonite Clay", "Rose Hips", "Acerola Cherry"] },
  { sku: "076280047103", name: "Zinc 50mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/zinc-50", unknown: ["Citric Acid (from Non-GMO Tapioca)"] },
  { sku: "076280325966", name: "Astaxanthin", count: "4 mg / Softgel", form: "softgel", url: "https://www.solaray.com/products/astaxanthin", unknown: ["Safflower Oil", "d-alpha Tocopherol", "Medium Chain Triglycerides"] },
  { sku: "076280192858", name: "Organic Garlic Bulb 560mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/garlic-bulb-1", unknown: ["Organic Pullulan Capsule"] },
  { sku: "076280081008", name: "Cool Cayenne Pepper 40,000 Hu", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/cool-cayenne-pepper-40-000-hu", unknown: ["Annatto (seed extract)", "Ginger (root)"] },
  { sku: "076280761382", name: "Super IbuActin, Maximum", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/super-ibuactin-maximum", unknown: ["Medium Chain Triglycerides"] },
  { sku: "076280045260", name: "Calcium & Magnesium Citrate, With Vitamin D-2, 2:1 Ratio", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/calcium-magnesium-citrate-with-vitamin-d-2-2-1-ratio", unknown: ["Magnesium Stearate. Parslev Leaf. Alfalfa Leaf. Watercress Leaf", "Dandelion Root"] },
  { sku: "076280648065", name: "SharpMind Nootropics Energy", count: "30 ct", form: "capsule", url: "https://www.solaray.com/products/sharpmind-nootropics-energy", unknown: ["Silica. enXtra is a licensed trademark of OmniActive Health Technologies Ltd"] },
  { sku: "076280458527", name: "Calcium Citrate 1000mg", count: "240ct", form: "capsule", url: "https://www.solaray.com/products/calcium-citrate", unknown: ["Watercress Leaf", "Dandelion Root", "Parsley Leaf"] },
  { sku: "076280081022", name: "Extra Hot Cool Cayenne Pepper 100,000 Hu", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/extra-hot-cool-cayenne-pepper-100-000-hu", unknown: ["Annatto (seed extract)", "Ginger Root"] },
  { sku: "076280036879", name: "Maca Root Extract 300 mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/maca-root-extract", unknown: ["Dextrin (from Non-GMO Maca)"] },
  { sku: "076280043259", name: "Vitamin B-1, 100mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/vitamin-b-1", unknown: ["Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ)"] },
  { sku: "076280845815", name: "Rhodiola Root & Schizandra", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/rhodiola-root-schizandra", unknown: ["Maltodextrin (from Non-GMO Corn)"] },
  { sku: "076280048605", name: "L-Lysine 1000mg", count: "90ct", form: "tablet", url: "https://www.solaray.com/products/l-lysine-1000mg", unknown: ["Acerola Cherry", "Rose Hips"] },
  { sku: "076280084238", name: "Super CranActin Cranberry Extract 400mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/super-cranactin-cranberry-extract-bacterial-antiadherence-formula", unknown: ["Maltodextrin (from Non-GMO Corn)", "Tricalcium pnpepiate", "Vegetable Juice"] },
  { sku: "076280131758", name: "Cal-Mag Citrate w/D-2, 2:1 Ratio", count: "360ct", form: "capsule", url: "https://www.solaray.com/products/cal-mag-citrate-w-d-2-2-1-ratio", unknown: ["Parsley Leaf", "Alfalfa Leaf", "Watercress Leaf", "Dandelion Root"] },
  { sku: "076280008449", name: "CranDophilus, CranActin 400mg", count: "120ct", form: "capsule", url: "https://www.solaray.com/products/crandophilus-cranactin-probio", unknown: ["Beet Root Powder (Color)"] },
  { sku: "076280116076", name: "Grapefruit Seed Extract 100mng", count: "1oz", form: "liquid", url: "https://www.solaray.com/products/copy-of-grapefruit-seed-extract-250mng", unknown: ["Natural Grapefruit Flavor with Other Natural Flavors"] },
  { sku: "076280228786", name: "Cal-Mag Citrate Vitamin with D-2, 1:3", count: "180ct", form: "capsule", url: "https://www.solaray.com/products/cal-mag-citrate-with-d-2-1-3", unknown: ["Parsley Leaf", "Watercress Leaf", "Alfalfa Leaf", "Dandelion Root"] },
  { sku: "076280478556", name: "Spectro Multivitamin, Iron-Free", count: "360ct", form: "capsule", url: "https://www.solaray.com/products/spectro-multi-vitamin-iron-free-1", unknown: ["Eleuthero Root", "Alfalfa Leaf", "Montmorillonite Clay", "Rose Hips", "Acerola Cherry"] },
  { sku: "076280044669", name: "QBC Plex | Quercetin & Bromelain + Vitamin C", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/qbc-plex-quercetin-bromelain-plus-vitamin-c", unknown: ["Non-GMO Maltodextrin"] },
  { sku: "076280081329", name: "Yeast-Cleanse", count: "90ct", form: "capsule", url: "https://www.solaray.com/products/yeast-cleanse", unknown: ["Dong Quai Root", "Fennel Seed", "Neem Leaf"] },
  { sku: "076280685206", name: "Methyl B-12 & Methyl Folate", count: "60 ct / Cherry", form: "capsule", url: "https://www.solaray.com/products/methyl-b-12-methyl-folate", unknown: ["Organic Inulin", "Natural Cherry Flavor with other natural flavors", "Stevia (leaf extract)"] },
  { sku: "076280193008", name: "Organic Ginger Root 1080mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/organically-gro-ginger-root", unknown: ["Organic Pullulan Capsule"] },
  { sku: "076280598407", name: "Fermented Reishi Mushroom 1000mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/fermented-reishi-mushroom", unknown: ["Organic Pullulan Capsule"] },
  { sku: "076280931471", name: "ProSorb CoQ10 9x 200mg", count: "30 ct", form: "capsule", url: "https://www.solaray.com/products/prosorb-coq10-9x", unknown: ["Potato Maltodextrin", "Magnesium Stearate. Ubiqsome", "Phytosome are trademarks of Indena S.p.A", "Italy"] },
  { sku: "076280366730", name: "Jiaogulan Root Extract 820mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/jiaogulan-root-extract", unknown: ["Rice Hull Concentrate"] },
  { sku: "076280469363", name: "Her Life Stages Menopause", count: "60 ct", form: "capsule", url: "https://www.solaray.com/products/her-life-stages-menopause", unknown: ["Vegetable Capsule"] },
  { sku: "076280047905", name: "Hair Nutrients", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/hair-nutrients", unknown: ["Alfalfa Leaf", "Parsley Leaf", "Watercress Leaf"] },
  { sku: "076280045604", name: "Calcium, Magnesium, Zinc", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/calcium-magnesium-zinc", unknown: ["Whole Rice Concentrate (including the Bran, Polishings and Germ)", "Alfalfa Leaf", "Watercress", "Dandelion Root", "Parsley Leaf"] },
  { sku: "076280908473", name: "Org Grown Fermented Maitake", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/org-grown-fermented-maitake", unknown: ["Organic Pullulan Capsule"] },
  { sku: "X003KT6VTD", name: "Sugar-Free L-Theanine Chewable, Lemon-Lime Flavor", count: "75 CT", form: "chewable", url: "https://www.solaray.com/products/solaray-l-theanine-chewable-supplement-200-mg-30-count", unknown: ["Natural Lemon Lime Flavor", "other Natural Flavors (milk, soy)", "Stevia (leaf extract)"] },
  { sku: "076280953794", name: "Fermented Mushroom Complete 1200mg", count: "60ct", form: "capsule", url: "https://www.solaray.com/products/fermented-mushroom-complete", unknown: ["Mycelium/Organic Whole Oat Biomass"] },
  { sku: "076280595499", name: "NADH", count: "", form: "capsule", url: "https://www.solaray.com/products/nadh", unknown: ["Fractionated Palm Oil", "Chlorophyllin"] },
  { sku: "076280043648", name: "Niacin, No Flush 500mg", count: "100ct", form: "capsule", url: "https://www.solaray.com/products/niacin-no-flush", unknown: ["Whole Food Base (Whole Rice Concentrate including Kernel, Polishings, Hull and Pure Aloe Vera Gel)"] },
  { sku: "076280975123", name: "Sugar-Free L-Theanine Chewable, Lemon-Lime Flavor", count: "30 CT", form: "chewable", url: "https://www.solaray.com/products/solaray-l-theanine-chewable-supplement-200-mg-30-count", unknown: ["Natural Lemon Lime Flavor", "other Natural Flavors (milk, soy)", "Stevia (leaf extract)"] },
  { sku: "076280731613", name: "Vitamin D3, Liquid, Unflavored", count: "dropper", form: "liquid", url: "https://www.solaray.com/products/vitamin-d3-liquid-unflavored", unknown: ["High Oleic Sunflower Oil", "Vegetable Oil", "Mono & Diglycerides"] },
  { sku: "076280043815", name: "Pantothenic Acid 500mg", count: "250ct", form: "capsule", url: "https://www.solaray.com/products/pantothenic-acid", unknown: ["Rice Extract Blend", "Aloe Vera Gel"] },
  { sku: "076280131765", name: "Calcium Citrate With Vitamin D-3 1000mg", count: "240ct", form: "capsule", url: "https://www.solaray.com/products/calcium-citrate-with-vitamin-d-3", unknown: ["Watercress Leaf", "Dandelion Root", "Parsley Leaf"] },
  { sku: "076280615470", name: "HMB + Vitamin D3", count: "Lemon Lime, 30 servings", form: "powder", url: "https://www.solaray.com/products/hmb-vitamin-d3", unknown: ["Natural Lemon and Lime Flavor with Other Natural Flavors", "Sea Salt", "Steviol Glycoside"] },
  { sku: "076280044614", name: "Super Bio Vitamin C 1000mg", count: "250ct", form: "capsule", url: "https://www.solaray.com/products/super-bio-vitamin-c-buffered-two-stage-timed-release", unknown: ["Buffering Base (Calcium Carbonate and Magnesium Oxide)"] },
];

export const BATCH117_LEFTOVER_TOKENS: string[] = [
  "Acacia (Gum Arabic)",
  "Acacia Cum",
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
  "Annatto Extract",
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
  "BioPerine (Black Pepper Extract)",
  "Blueberry (fruit extract)",
  "Buffering Base (Calcium Carbonate and Magnesium Oxide)",
  "Calcium Ascorbate",
  "Calcium Fluoride 6x",
  "Calcium L-Threonate",
  "Calcium Phosphate",
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
  "Cellulose. AHCC",
  "Cellulose. Aquamin",
  "Chamomile",
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
  "Croan Inulin",
  "D-Limonene Oil",
  "DIM (Diindolyimethane)",
  "Dandelion Root",
  "Deionized Water",
  "Dextrin",
  "Dextrin (from Non-GMO Maca)",
  "Dextrin (from Non-GMO Tapioca)",
  "Diglycerides",
  "Dong Quai Root",
  "Eleuthero Root",
  "Enteric Coating",
  "FOS Blend (Fructooligosaccharides)",
  "FOS Blend (fructooligosaccharides, sprouted mung bean extract)",
  "Fennel Seed",
  "Fenugreek Seeds",
  "Fermented Defatted Chickpea Flour Extract",
  "Feverfew (Tanacetum panama) (aerial)",
  "Food Starch",
  "Fractionated Palm Oil",
  "Fructose",
  "Garlzac",
  "Gelatin (Bovine)",
  "Gelatin Softgel (Gelatin, Glycerin, Carob)",
  "Ginger (root)",
  "Ginger Root",
  "Ginseng (Panax ginseng) (root extract)",
  "Glutamic Acid HCI",
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
  "High Oleic Sunflower Oil",
  "Honey",
  "Horsetail",
  "Horsetail Herb",
  "Hypromellose Capsule",
  "Iron Pyrophosphate",
  "Italy",
  "Kelp",
  "L-Alanine",
  "L-Aspartic Acid",
  "L-Glycine",
  "LLC",
  "Lecithin (Soy)",
  "Lecithin (soy)",
  "Lemon Flavors with Other Natural Flavors",
  "Licorice (root)",
  "Lime Flavors with Other Natural Flavors",
  "Lipid Blend from Sunflower Oil",
  "Lipld Blend from Sunflower Oil",
  "Maanesitum Stearate",
  "Maanesium Stearate",
  "Magensium Stearate",
  "Magnesium Carbonate",
  "Magnesium Citrate",
  "Magnesium Oxide",
  "Magnesium Phosphate 3x",
  "Magnesium Stearate. Parslev Leaf. Alfalfa Leaf. Watercress Leaf",
  "Magnesium Stearate. Quercefit",
  "Magnesium Stearate. Ubiqsome",
  "Magnesium Stearate. sos a ae QOptiZinc OptiZinc is a Lonza trademark",
  "Magnesium tear",
  "Mal- todextrin",
  "Maltodex- trin (from Non-GMO Corn)",
  "Maltodextrin (from Non-GMO Corn)",
  "Maltodextrin (from Non-GMO Sweet Potato)",
  "Maltodextrin (from Non-GMO Tapioca)",
  "Mango Flavors with Other Natural Flavors",
  "Mannitol",
  "Maqnesium Stearate",
  "Mean Stereate",
  "Medium Chain Triglycerides",
  "Medium Chain iabycendes (coconut)",
  "Megs Carbonate",
  "Mica",
  "Mixed Carotenoids",
  "Modified Corn Starch (Non-GMO)",
  "Modified Food",
  "Modified Starch",
  "Modified Tapioca Starch",
  "Molasses",
  "Mono & Diglycerides",
  "Monoglycerides",
  "Montmorillonite Clay",
  "Moqnesum Carbonate",
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
  "Natural Lemon Flavor with other Natural Flavors",
  "Natural Lemon Lime Flavor",
  "Natural Lemon and Lime Flavor with Other Natural Flavors",
  "Natural Mango",
  "Natural Mixed Berry Flavor with other Natural Flavors",
  "Natural Orange Flavor with Other Natural Flavors",
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
  "Nepetaie Cellulose Capsule",
  "Non-GMO Maltodextrin",
  "Non-GMO Potato Starch",
  "Nutritional Yeast",
  "Oat Fiber",
  "Oat Fiber Blend (Oat Fiber, Gum Arabic, Sunflower Lecithin, Sunflower Oil)",
  "Oat Straw Stem",
  "Oraanic Rice Extract Blend",
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
  "Organic Rice Ex- tract Blend",
  "Organic Rice Extract lend",
  "Organic Sunflower Oil & Organic Carnauba Wax",
  "Organic Tapioca Syrup",
  "Parsley",
  "Parsley Aerial",
  "Parsley Herb",
  "Parsley Leaf",
  "Parsley Leaf. Aquamin",
  "Pea Protein Isolate",
  "Peach Flavors with other Natural Flavors (Soy)",
  "Pectin",
  "Phytosome are trademarks of Indena S.p.A",
  "Potassium Phosphate 3x",
  "Potassium Sorbate",
  "Potato Dextrin",
  "Potato Maltodextrin",
  "Pumpkin Seed",
  "Pumpkin Seeds",
  "Pygeum (bark extract)",
  "Resistant Potato Starch",
  "Rice Bran Concentrate",
  "Rice Bran Oil",
  "Rice Extract Blend",
  "Rice Flours Magnesium Stearate",
  "Rice Hull Concentrate",
  "Rice Powder",
  "Rice Protein",
  "Rose Hips",
  "Rose Hips (fruit)",
  "Safflower Oil",
  "Saw Palmetto (berry)",
  "Saw Palmetto Berry Extract",
  "Sea Salt",
  "Silica 6x",
  "Silica. ActivAMP",
  "Silica. Chromax",
  "Silica. Miricell",
  "Silica. Morosil",
  "Silica. PEAK ATP",
  "Silica. PrimaVie",
  "Silica. SOMATO",
  "Silica. Shoden",
  "Silica. Solnul",
  "Silica. Tesnor",
  "Silica. enXtra is a licensed trademark of OmniActive Health Technologies Ltd",
  "Sodium Benzoate",
  "Sodium Chloride 6x",
  "Sodium Citrate",
  "Sodium Crosscarmellose",
  "Softgel (Gelatin and Glycerin)",
  "Softgel (Gelatin, Glycerin and Beeswax)",
  "Softgel (Gelatin, Glycerin)",
  "Softgel (Gelatin, Glycerin, Water)",
  "Soy",
  "Soy Oil",
  "Soybean Oil",
  "Starch",
  "Stevia (Stevia rebaudiana) (leaf extract)",
  "Stevia (leaf extract)",
  "Stevia (leaf)",
  "Stevia Leaf Extract",
  "Steviol Glycoside",
  "Sucrose",
  "Sunflower Phospholipids",
  "Sus- tainable Palm Oil",
  "Sustainable Palm Oil",
  "Tapioca Dextrin",
  "Tapioca Starch",
  "Titanium Dioxide",
  "Tocopherols (antioxidant)",
  "Trace Mineral Complex",
  "Tricalcium Phosphate. ChromeMate is a Lonza trademark",
  "Tricalcium pnpepiate",
  "Turmeric Root Extract",
  "Vegetable Capsule",
  "Vegetable Cellulose",
  "Vegetable Cellulose Capsule. AquaTurm is a licensed registered trademark of LODAAT",
  "Vegetable Cellulose Cpa",
  "Vegetable Cellulose peru. Coles",
  "Vegetable Cellulose peste Maltodextrin",
  "Vegetable Celluose Capsule",
  "Vegetable Fiber",
  "Vegetable Juice",
  "Vegetable Juice Concentrate",
  "Vegetable Oil",
  "Vegetarian Capsule",
  "Vepemble Cellulose Capsule",
  "Virgin Olive Oil",
  "Watercress",
  "Watercress Leaf",
  "Whole Food Base (Rose Hips, Acerola Cherry and Bioflavonoid Concentrate)",
  "Whole Food Base (Whole Rice Concentrate and Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including Bran, Germ and Polishings)",
  "Whole Food Base (Whole Rice Concentrate including Kernel, Polishings, Hull and Pure Aloe Vera Gel)",
  "Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ)",
  "Whole Rice Concentrate (Including Bran, Polishings, and Germ) Vegetable Cellulose Capsule",
  "Whole Rice Concentrate (Including Bran, Polishings, and Germ, and Aloe Vera Gel)",
  "Whole Rice Concentrate (including Bran, Polishings and Germ)",
  "Whole Rice Concentrate (including Kernel, Polishings, and Hull)",
  "Whole Rice Concentrate (including bran, polishing and germ)",
  "Whole Rice Concentrate (including the Bran, Polishings and Germ)",
  "Yellow Dock Root",
  "Yellowdock Root",
  "Zinc Oxide",
  "d-alpha Tocopherol",
  "ea i",
  "ope Lid Rice Concentrate (including Bran, Polishings and Germ)",
  "other Natural Flavors (milk, soy)",
  "oybean Oil",
  "pea Organic Inulin",
  "registered in the USA",
];


const _ROWS = BATCH117_KYR6B_SOLARAY_STAMP_BACKFILL;
if (_ROWS.length !== 299) throw new Error('batch117 tally drift: expected 299 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 120) {
  throw new Error('batch117 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 179) {
  throw new Error('batch117 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch117 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch117 recordStatus must stay unverified');
}
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 267) {
  throw new Error('batch117 NEW tally drift');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 32) {
  throw new Error('batch117 REUSE tally drift');
}
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch117 writes Solaray only');
if (_ROWS.some((r) => r.barcode)) throw new Error('batch117 UPC must stay empty');
if (
  _ROWS.some((r) =>
    /naturewise|nutricost|welmate|goodsense|time-cap|healtha2z|micro ingredients|mama bear|sprouts|toothpaste|now foods/i.test(
      r.productName,
    ),
  )
) {
  throw new Error('batch117 must not reopen out-of-scope brands');
}
if (_ROWS.some((r) => /black seed|oregano complete|vitamin d3, liquid/i.test(r.productName))) {
  throw new Error('batch117 must not grade oil pour bottles or the D3 dropper');
}
if (_ROWS.some((r) => r.inactiveIngredients.some((i) => i.name === 'Vegetable Capsule'))) {
  throw new Error('batch117 must not map bare Vegetable Capsule');
}
if (!BATCH117_REFUSED.some((r) => r.sku === '076280731613' && r.unknown.includes('High Oleic Sunflower Oil'))) {
  throw new Error('batch117 D3 liquid must stay refused');
}
if (!BATCH117_KYR6B_SOLARAY_STAMP_BACKFILL.some((r) => r.id === 'solaray-b117-076280661668' && r.productName.includes('7.4 oz'))) {
  throw new Error('batch117 sized maca row missing');
}
if (BATCH117_SKIPPED_NO_OI.length !== 123) throw new Error('batch117 no_OI tally drift');
if (BATCH117_SKIPPED_OUT.length !== 0) throw new Error('batch117 OUT tally drift');
if (BATCH117_REFUSED.length !== 326) throw new Error('batch117 REFUSED tally drift');
if (BATCH117_LEFTOVER_TOKENS.length !== 322) throw new Error('batch117 token tally drift');
if (BATCH117_REFUSED.some((r) => r.unknown.length === 0)) {
  throw new Error('batch117 refuse row missing the exact unknown string');
}
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch117 Avoid without High on ${record.id}`);
  }
  if (
    record.verdict === 'caution' &&
    !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')
  ) {
    throw new Error(`batch117 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch117 Clean row has a non-cleared flag on ${record.id}`);
  }
  if (record.form === 'gummy') throw new Error(`batch117 has no gummy rows: ${record.id}`);
}
