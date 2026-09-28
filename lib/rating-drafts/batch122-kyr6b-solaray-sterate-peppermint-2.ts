// DRAFT / not verified / batch 122 KYR6-b Solaray Sterate + Peppermint + last 2 no_OI.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades.
// Five founder aliases stamped Sept 28, 2026 (aliases only, grades unchanged):
// Magnesium Sterate → magnesium stearate Cleared, only as that lubricant.
// Soybean Oil as non-gummy enteric / softgel / capsule fill → named fill Cleared.
// Gummy / lozenge soybean oil stays High / Avoid.
// Chlorophyll → named pigment Cleared. Chlorophyllin stays unstamped.
// Zinc Oxide as an other ingredient → Caution zinc oxide as OI. Not topical Cleared.
// Aqueous Coating unnamed → Caution unnamed coat. Named HPMC+glycerin stays Cleared.
// Parsley Leaf is not stamped. No OCR junk, Italy, LLC, or trademark junk.
// batch70–batch121 were not edited. Solaray only. No new brands.
// Oil / MCT / essential-oil pour bottles are not graded.
// recordStatus is 'unverified' on every row. UPC stays empty.
//
// TALLY (unverified drafts in THIS file): 5 rows —
// Clean 2 / Caution 3 / Avoid 0.
// NEW 3 / REUSE 2 / SKIPPED no_OI leftover 1 / SKIPPED OUT 0 / REFUSED 0.
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

const UPC_BLANK =
  'Shopify variant barcode field echoed the SKU and these 12 digits did not print under the bars, so UPC is blank. No NDC on the listing.';

const METH = {
  capsuleCellulose:
    'Methodology §5 Cleared (capsule cellulose / labeled veg cap). Vegetable Cellulose Capsule maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  mcc:
    'Methodology §5 Cleared (cellulose-family / powdered cellulose / MCC / croscarmellose sodium). Cellulose maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  gelatin:
    'Methodology §5 Cleared (gelatin). Softgel (Gelatin and Glycerin) and Softgel (Gelatin, Glycerin) split: the gelatin half maps here (Sept 28, 2026). Same Cleared. Not a new grade.',
  glycerin:
    'Methodology §5 Cleared (glycerin / vegetable glycerin). Softgel (Gelatin and Glycerin) and Softgel (Gelatin, Glycerin) split: the glycerin half maps here (Sept 28, 2026). Same Cleared. Not a new grade.',
  water: 'Methodology §5 Cleared (water / purified water).',
  stearate:
    'Methodology §5 Cleared (magnesium stearate / stearic acid). Magnesium Sterate maps here only when the panel lists it as that lubricant (Sept 28, 2026). Same rule as Maanesium Stearate. Same Cleared. Not a new grade.',
  sio2: 'Methodology §5 Limited (silica / silicon dioxide). Not Avoid.',
  maltodextrin:
    'Methodology §5 Limited (maltodextrin, organic or non-organic). Not Avoid.',
  riceFlour: 'Methodology §5 Caution (rice flour). Not Avoid. Not Cleared rice hull.',
  beeswax: 'Methodology §5 Cleared (beeswax / yellow beeswax).',
  lecithinSoy:
    'Methodology §5 Cleared (lecithin / soy lecithin). Lecithin (Soy) maps here (Sept 28, 2026). Same Cleared. Not a new grade. Soy-allergy note still applies. Not bare soy.',
  soybeanFill:
    'Methodology §5 Cleared (soybean oil as non-gummy enteric / softgel / capsule fill). Soybean Oil maps here (Sept 28, 2026). Same Cleared. Not a new grade. Gummy / lozenge soybean oil stays High / Avoid.',
  chlorophyll:
    'Methodology §5 Cleared (chlorophyll named pigment). Chlorophyll maps here (Sept 28, 2026). Same Cleared. Not a new grade. Not chlorophyllin.',
  zincOxideOi:
    'Methodology §5 Caution (zinc oxide as an other ingredient). Zinc Oxide maps here (Sept 28, 2026). Same Caution. Not a new grade. Not the topical Cleared row.',
  aqueousCoat:
    'Methodology §5 Caution (unnamed vegetable / tablet coat). Aqueous Coating unnamed maps here (Sept 28, 2026). Same Caution. Not a new grade. Named HPMC+glycerin coat stays Cleared.',
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

const CLEARED_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Every Other Ingredients token is an existing Cleared §5 lock or a Sept 28, 2026 alias onto an existing Cleared family. No High. No Limited.';

const COMPACT: Compact[] = [
  {
    id: 'solaray-b122-076280008685',
    productName: 'Solaray Peppermint Oil, Enteric Coated (60ct)',
    formulaId: 'solaray-b122-076280008685',
    form: 'softgel',
    actives: [
      { name: 'Peppermint Oil', strength: '200 mg' },
      { name: 'Quercetin', strength: '50 mg' },
      { name: 'Rosemary Oil', strength: '20 mg' },
      { name: 'Thyme Oil', strength: '20 mg' },
      { name: 'Chamomile', strength: '20 mg' },
    ],
    flags: [
      ['Soybean Oil', 'cleared', 'soybeanFill'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Aqueous Coating', 'limited', 'aqueousCoat'],
      ['Beeswax', 'cleared', 'beeswax'],
      ['Lecithin (Soy)', 'cleared', 'lecithinSoy'],
      ['Chlorophyll', 'cleared', 'chlorophyll'],
      ['Zinc Oxide', 'limited', 'zincOxideOi'],
      ['Purified Water', 'cleared', 'water'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Zinc Oxide as an other ingredient and unnamed Aqueous Coating (Caution). Soybean oil is enteric softgel fill, Cleared. Chlorophyll is the named pigment, Cleared. Lecithin (Soy) is soy lecithin, Cleared; soy-allergy note applies. Not a pour bottle. Job 1.',
    cite: `solaray.com supplement-facts image https://www.solaray.com/products/peppermint-oil-enteric-coated other-ingredients: Soybean Oil, Gelatin, Glycerin, Aqueous Coating, Beeswax, Lecithin (Soy), Chlorophyll, Zinc Oxide and Purified Water. Serving 1 softgel, 60 servings. Exact pack Solaray Peppermint Oil, Enteric Coated (60ct). SKU 076280008685. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b122-076280083644',
    productName: 'Solaray Total Cleanse Kidney (60ct)',
    formulaId: 'solaray-b122-076280083644',
    form: 'capsule',
    actives: [{ name: 'Total Cleanse Kidney Blend', strength: '2 VegCaps' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Magnesium Sterate', 'cleared', 'stearate'],
      ['Silica', 'limited', 'sio2'],
      ['Cellulose', 'cleared', 'mcc'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). Magnesium Sterate is the lubricant alias onto magnesium stearate, Cleared. It was the last unknown token. Job 1.',
    cite: `solaray.com ingredients accordion https://www.solaray.com/products/total-cleanse-kidney lists Vegetable Cellulose Capsule, Maltodextrin, Magnesium Sterate, Silica and Cellulose after the kidney blend. Exact pack Solaray Total Cleanse Kidney (60 ct / Veg Cap). SKU 076280083644. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b122-076280041637',
    productName: 'Solaray Vitamin E, Mixed Tocopherols 268mg (100ct)',
    formulaId: 'solaray-b122-076280041637',
    form: 'softgel',
    actives: [
      { name: 'Vitamin E (as d-Alpha Tocopherol)', strength: '268 mg' },
      { name: 'Mixed Tocopherols', strength: '67 mg' },
    ],
    flags: [
      ['Soybean Oil', 'cleared', 'soybeanFill'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
    ],
    verdict: 'clean',
    note: `${CLEARED_NOTE} Softgel fill, not a pour bottle. Soy-allergy note applies to soybean oil. Job 1.`,
    cite: `solaray.com supplement-facts image https://www.solaray.com/products/vitamin-e-d-alpha-tocopherol-268-mg-400-iu other-ingredients: Soybean Oil and Softgel (Gelatin and Glycerin). Serving 1 softgel, 100 servings. Exact pack Solaray Vitamin E, Mixed Tocopherols 268mg (100ct). SKU 076280041637. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b122-076280041620',
    productName: 'Solaray Vitamin E, Mixed Tocopherols 268mg (50ct)',
    formulaId: 'solaray-b122-076280041637',
    form: 'softgel',
    actives: [
      { name: 'Vitamin E (as d-Alpha Tocopherol)', strength: '268 mg' },
      { name: 'Mixed Tocopherols', strength: '67 mg' },
    ],
    flags: [
      ['Soybean Oil', 'cleared', 'soybeanFill'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
    ],
    verdict: 'clean',
    note: `${CLEARED_NOTE} Count sibling of the 100ct. Same Other Ingredients. Softgel fill, not a pour bottle. Job 1.`,
    cite: `solaray.com ingredients accordion https://www.solaray.com/products/vitamin-e-d-alpha-tocopherol-268-mg-400-iu (50ct and 100ct on the same PDP): Vitamin E (as d-Alpha Tocopherol), Mixed Tocopherols, Soybean Oil, Softgel (Gelatin and Glycerin). 100ct facts image on that page prints the same Other Ingredients line, 100 servings. 50ct carousel tile is the front (50 softgels) and has no separate facts image. Exact pack Solaray Vitamin E, Mixed Tocopherols 268mg (50ct). SKU 076280041620. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b122-076280121551',
    productName: 'Solaray Red Yeast Rice + CoQ-10 (90ct)',
    formulaId: 'solaray-b121-076280088922',
    form: 'capsule',
    actives: [
      { name: 'Niacin (as Inositol Hexanicotinate)', strength: '50 mg' },
      { name: 'Red Yeast Rice', strength: '600 mg' },
      { name: 'Coenzyme Q-10', strength: '30 mg' },
    ],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Rice Flour', 'limited', 'riceFlour'],
      ['Silica', 'limited', 'sio2'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Rice Flour, Silica (Limited/Caution). No High. Job 2. Same Other Ingredients as Solaray Red Yeast Rice + CoQ-10 (60ct) already on MAIN.',
    cite: `https://www.swansonvitamins.com/p/solaray-red-yeast-rice-plus-coq10-90-vcaps other-ingredients: Vegetable Cellulose Capsule, Rice Flour, Silica and Magnesium Stearate. Serving 1 VegCap, 90 servings. Schema gtin 076280121551 was not read under the bars, so UPC is blank. solaray.com ingredients accordion on https://www.solaray.com/products/red-yeast-rice-plus-coq-10 prints the same line. The PDP facts image is an Amazon 100ct file, not this pack. Exact pack Solaray Red Yeast Rice + CoQ-10 (90ct). SKU 076280121551.`,
  },
];

export const BATCH122_KYR6B_SOLARAY_STERATE_PEPPERMINT_2: RatingRecord[] = COMPACT.map(expand);

export const BATCH122_SKIPPED_NO_OI: { sku: string; name: string; count: string; url: string }[] = [
  {
    sku: '076280830385',
    name: 'Liposomal Multivitamin Universal',
    count: '60ct',
    url: 'https://www.solaray.com/products/liposomal-multivitamin-universal',
  },
];

export const BATCH122_SKIPPED_OUT: { sku: string; name: string; why: string }[] = [];

export const BATCH122_HUNT_POUR: { name: string; url: string }[] = [];

export const BATCH122_REFUSED: { sku: string; name: string; count: string; url: string; unknown: string[] }[] = [];

export const BATCH122_LEFTOVER_REAL_TOKENS: string[] = [
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
  "Glucono Delta Lactone",
  "Glutamic Acid",
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
  "Himalayan Pink Salt",
  "Honey",
  "Horsetail",
  "Horsetail Herb",
  "Hydrogenated Soybean Oil",
  "Hypromellose Capsule",
  "Iron Pyrophosphate",
  "Kelp",
  "L-Alanine",
  "L-Aspartic Acid",
  "L-Glutamic Acid",
  "L-Glycine",
  "Lemon Flavors with Other Natural Flavors",
  "Licorice (root)",
  "Licorice Root",
  "Lime Flavors with Other Natural Flavors",
  "Lipid Blend from Sunflower Oil",
  "Lipid Blend from Sunflower Oil and Sustainable Palm Oil",
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
  "Natural Mandarin Orange Flavor with Other Natural Flavors",
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
  "Nettle Leaf",
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
  "Pumpkin Seed Oil",
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
  "Softgel (Gelatin)",
  "Softgel (Gelatin, Glycerin, Water)",
  "Softgel (Non-GMO Tapioca Starch, Non-GMO Glycerin and Water)",
  "Soy",
  "Soy Oil",
  "Soy Protein Isolate",
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
];

const _ROWS = BATCH122_KYR6B_SOLARAY_STERATE_PEPPERMINT_2;
if (_ROWS.length !== 5) throw new Error('batch122 tally drift: expected 5 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 2) throw new Error('batch122 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 3) throw new Error('batch122 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) throw new Error('batch122 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch122 recordStatus must stay unverified');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 3) throw new Error('batch122 NEW tally drift');
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 2) throw new Error('batch122 REUSE tally drift');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch122 writes Solaray only');
if (_ROWS.some((r) => r.barcode)) throw new Error('batch122 UPC must stay blank');
if (_ROWS.some((r) => r.form === 'gummy' || r.form === 'liquid')) throw new Error('batch122 must not grade gummies or pour bottles');
if (BATCH122_SKIPPED_NO_OI.length !== 1) throw new Error('batch122 no_OI leftover drift');
if (BATCH122_SKIPPED_OUT.length !== 0) throw new Error('batch122 OUT drift');
if (BATCH122_REFUSED.length !== 0) throw new Error('batch122 REFUSED drift');
if (BATCH122_HUNT_POUR.length !== 0) throw new Error('batch122 hunt-list drift');
if (BATCH122_LEFTOVER_REAL_TOKENS.length !== 279) throw new Error('batch122 leftover token drift');
const _DROPPED = ['Magnesium Sterate', 'Soybean Oil', 'Chlorophyll', 'Zinc Oxide', 'Aqueous Coating'];
if (_DROPPED.some((t) => BATCH122_LEFTOVER_REAL_TOKENS.includes(t))) throw new Error('batch122 stamped token still leftover');
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients.some((i) => i.riskLevel !== 'cleared'))) {
  throw new Error('batch122 Clean row has a flag');
}
if (_ROWS.some((r) => r.verdict === 'caution' && !r.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate'))) {
  throw new Error('batch122 Caution without Limited');
}
