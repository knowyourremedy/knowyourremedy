// DRAFT / not verified / batch 130 KYR6-b Solaray last-4 no_OI hunt.
// Only packs whose exact panel was opened. Sibling facts images were not copied.
// batch70-batch129 were not edited. UPC stays empty.
//
// TALLY: 2 rows — Clean 1 / Caution 1 / Avoid 0.
// NEW 1 / REUSE 1 / SKIPPED no_OI leftover 3 / SKIPPED OUT 0 / REFUSED 0.

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
  gelatin: "Methodology §5 Cleared (gelatin / gelatin capsule).",
  oilfill: "Methodology §5 Cleared (named oil as non-gummy capsule / softgel fill). Gummy and lozenge seed oils stay High.",
  rosemary: "Methodology §5 Caution (rosemary extract, oral).",
  ascorbic: "Methodology §5 Cleared (ascorbic acid).",
  glycerin: "Methodology §5 Cleared (glycerin).",
  water: "Methodology §5 Cleared (water / purified water).",
  starch: "Methodology §5 Cleared (named simple starch / bare starch / food starch / resistant potato starch).",
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
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. Adults. No dosing or medical advice. Draft, not verified.`,
    retailers: [...RETAILERS],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  });
}

const COMPACT: Compact[] = [
  {
    id: "solaray-b130-076280008029",
    productName: "Solaray Flaxseed Oil 1000mg (100ct)",
    formulaId: "solaray-b130-076280008029",
    form: "softgel",
    barcode: "076280008029",
    actives: [
      { name: "Organic Flaxseed Oil", strength: "3 g" },
    ],
    flags: [
      ["Gelatin", "cleared", "gelatin"],
      ["Sunflower Oil", "cleared", "oilfill"],
      ["Rosemary Extract", "limited", "rosemary"],
      ["Ascorbic Acid", "cleared", "ascorbic"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver family: Rosemary Extract. No High. This 100ct panel is not the 240ct gelatin/glycerin/carob list.",
    cite: "vitacost.com opened listing UPC field 076280008029 https://www.vitacost.com/products/solaray-flaxseed-oil-100-softgels-1-g-per-softgel-124386 other-ingredients: Gelatin softgel, sunflower oil, rosemary extract, ascorbic acid. Serving size 3 softgels, about 33 servings, 100 softgels. Exact pack Solaray Flaxseed Oil 1000mg (100ct). SKU 076280008029. " + UPC_BLANK,
  },
  {
    id: "solaray-b130-X0042AF2L7",
    productName: "Solaray Oil Of Oregano 150mg (120ct)",
    formulaId: "solaray-b129-076280082524",
    form: "softgel",
    actives: [
      { name: "Oil of Oregano", strength: "150 mg" },
    ],
    flags: [
      ["Glycerin", "cleared", "glycerin"],
      ["Water", "cleared", "water"],
      ["Tapioca Starch", "cleared", "starch"],
      ["Olive Oil", "cleared", "oilfill"],
    ],
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Every other ingredient on this panel maps to a Cleared family. No Limited or High flag. Same OI as the 60ct already on MAIN. REUSE formula solaray-b129-076280082524.",
    cite: "solaray.com facts image named for the 120ct variant barcode 076280126709 (not the 60ct SKU 076280082524) https://www.solaray.com/products/oil-of-oregano other-ingredients: Softgel (Non-GMO Tapioca Starch, Non-GMO Glycerin and Water) and Olive Oil. Variant title 120ct. Exact pack Solaray Oil Of Oregano 150mg (120ct). SKU X0042AF2L7. " + UPC_BLANK,
  },
];

export const BATCH130_KYR6B_SOLARAY_LAST_4_NO_OI: RatingRecord[] = COMPACT.map(expand);

export const BATCH130_SKIPPED_NO_OI: { sku: string; name: string; count: string; why: string }[] = [
  {
    sku: "076280041026",
    name: "Astaxanthin",
    count: "",
    why: "solaray.com facts image is the other variant 076280325966 (4 mg). The 076280041026 listing that opened (1 mg, 60 softgels) says see the product label and does not print Other Ingredients. That 4 mg panel was not copied.",
  },
  {
    sku: "076280008074",
    name: "Flaxseed Oil 1000mg",
    count: "140 ct",
    why: "Shopify variant title is 140 ct. The SKU facts image and HiLife/VitaNet listings are 240 softgels (80 x 3). No opened page printed a 140ct panel for this SKU. The 240ct panel was not copied.",
  },
  {
    sku: "076280830385",
    name: "Liposomal Multivitamin Universal",
    count: "60ct",
    why: "solaray.com facts image is named 076280640168. The Better Health Store page that says Universal 60 prints barcode 00076280640168, which is that other SKU. Fullscript prints an Other Ingredients line but not this SKU. 076280640168 was not copied.",
  },
];

export const BATCH130_SKIPPED_OUT: { sku: string; name: string; why: string }[] = [];

export const BATCH130_LEFTOVER_REAL_TOKENS: string[] = [];
