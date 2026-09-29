// DRAFT / not verified / batch 121 KYR6-b Solaray Lecithin (Soy) + the 32 no_OI.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades.
// Job 1 founder lock (alias only, grade unchanged, Sept 28, 2026):
// Lecithin (Soy) = Lecithin (soy) = locked lecithin / soy lecithin Cleared.
// Case is not a new token. Soy-allergy note still applies. Not bare soy.
// Bare Rosemary Extract stays on locked Rosemary Extract (A Natural Preservative) oral (Caution).
// Same Caution. Not a new grade. Not a new token. Sunflower Vitamin E (batch120) is unchanged.
// Parsley Leaf is not stamped. No OCR junk, Italy, LLC, or trademark junk stamped.
// No other new aliases.
// The capital-S alias does not fully unlock any refused row. Peppermint Oil,
// Enteric Coated 076280008685 still has Soybean Oil, Aqueous Coating, Chlorophyll,
// and Zinc Oxide. Job 1 writes = 0.
// Job 2 is the 32 no_OI SKUs from batch120 only.
// batch70–batch120 were not edited. Solaray only. No new brands.
// Oil / MCT / essential-oil pour bottles are not graded.
// recordStatus is 'unverified' on every row. UPC stays empty.
//
// TALLY (unverified drafts in THIS file): 13 rows —
// Clean 2 / Caution 11 / Avoid 0.
// NEW 13 / REUSE 0 / SKIPPED no_OI leftover 2 / SKIPPED OUT 0 / REFUSED 17.
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
  'Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the listing.';

const METH = {
  capsuleCellulose:
    'Methodology §5 Cleared (capsule cellulose / labeled veg cap). Vegetable Cellulose Capsule maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  mcc:
    'Methodology §5 Cleared (cellulose-family / powdered cellulose / MCC / croscarmellose sodium). Cellulose maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid).',
  sio2: 'Methodology §5 Limited (silica / silicon dioxide). Not Avoid.',
  maltodextrin:
    'Methodology §5 Limited (maltodextrin, organic or non-organic). Not Avoid.',
  acacia: 'Methodology §5 Cleared (acacia gum / gum arabic).',
  riceExtract:
    'Methodology §5 Limited (unspecified rice extract). Organic Rice Extract Blend maps here (Sept 27, 2026). Same Limited / Caution. Not a new grade.',
  riceFlour: 'Methodology §5 Caution (rice flour). Not Avoid. Not Cleared rice hull.',
  modStarch: 'Methodology §5 Limited (modified food starch). Not Avoid.',
  gms:
    'Methodology §5 Cleared (Glycerol Monostearate / glyceryl monostearate / GMS). Same Cleared. Not unspecified mono- and diglycerides.',
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

const CLEARED_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Every Other Ingredients token is an existing Cleared §5 lock. No High. No Limited.';

const COMPACT: Compact[] = [
  {
    id: 'solaray-b121-076280174045',
    productName: 'Solaray Tart Cherry & Celery Seed 620mg (60ct)',
    formulaId: 'solaray-b121-076280174045',
    form: 'capsule',
    barcode: '076280174045',
    actives: [{ name: 'Tart Cherry & Celery Seed', strength: '620 mg' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High. Job 2.',
    cite: `solaray.com supplement-facts image https://www.solaray.com/products/tart-cherry-celery-seed other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate and Silica. Serving 1 VegCap, 60 servings. Exact pack Solaray Tart Cherry & Celery Seed 620mg (60ct). SKU 076280174045. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b121-076280446869',
    productName: 'Solaray Mega Quercetin 600mg (60ct)',
    formulaId: 'solaray-b121-076280446869',
    form: 'capsule',
    barcode: '076280446869',
    actives: [{ name: 'Mega Quercetin', strength: '600 mg' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High. Job 2. Different product from Tart Cherry; own formulaId.',
    cite: `solaray.com supplement-facts image https://www.solaray.com/products/mega-quercetin other-ingredients: Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate and Silica. Serving 1, 60 servings. Exact pack Solaray Mega Quercetin 600mg (60ct). SKU 076280446869. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b121-076280850406',
    productName: 'Solaray Spectro Man Multivitamin (120ct)',
    formulaId: 'solaray-b121-076280850406',
    form: 'capsule',
    barcode: '076280850406',
    actives: [{ name: 'Spectro Man Multivitamin', strength: '4 VegCaps' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Rice Flour', 'limited', 'riceFlour'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Acacia', 'cleared', 'acacia'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Rice Flour, Maltodextrin, Silica (Limited/Caution). No High. Job 2.',
    cite: `solaray.com supplement-facts image https://www.solaray.com/products/spectro-man-multi-vitamin other-ingredients: Vegetable Cellulose Capsule, Rice Flour, Cellulose, Maltodextrin, Acacia, Magnesium Stearate, Silica. Serving 4 VegCaps, 30 servings. Exact pack Solaray Spectro Man Multivitamin (120ct). SKU 076280850406. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b121-076280399134',
    productName: 'Solaray Holy Basil Aerial Extract 900mg (60ct)',
    formulaId: 'solaray-b121-076280399134',
    form: 'capsule',
    actives: [{ name: 'Holy Basil Aerial Extract', strength: '900 mg' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
    ],
    verdict: 'clean',
    note: `${CLEARED_NOTE} Job 2.`,
    cite: `solaray.com supplement-facts image https://www.solaray.com/products/holy-basil-aerial-extract other-ingredients: Vegetable Cellulose Capsule, Cellulose and Magnesium Stearate. Serving 2 VegCaps, 30 servings. Exact pack Solaray Holy Basil Aerial Extract 900mg (60ct). SKU 076280399134. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b121-076280731767',
    productName: 'Solaray Bacillus Coagulans (60ct)',
    formulaId: 'solaray-b121-076280731767',
    form: 'capsule',
    barcode: '076280731767',
    actives: [{ name: 'Bacillus coagulans', strength: '1 VegCap' }],
    flags: [
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin (Limited). Bare maltodextrin. No High. Job 2.',
    cite: `solaray.com supplement-facts image https://www.solaray.com/products/bacillus-coagulans other-ingredients: Maltodextrin, Vegetable Cellulose Capsule and Magnesium Stearate. Serving 1, 60 servings. Exact pack Solaray Bacillus Coagulans (60ct). SKU 076280731767. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b121-076280105056',
    productName: 'Solaray Mushroom Complete 1175mg (60ct)',
    formulaId: 'solaray-b121-076280105056',
    form: 'capsule',
    actives: [{ name: 'Mushroom Complete', strength: '1,175 mg' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
    ],
    verdict: 'clean',
    note: `${CLEARED_NOTE} Job 2.`,
    cite: `solaray.com supplement-facts image https://www.solaray.com/products/mushroom-complete other-ingredients: Vegetable Cellulose Capsule and Magnesium Stearate. Serving 2, 30 servings. Exact pack Solaray Mushroom Complete 1175mg (60ct). SKU 076280105056. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b121-076280031737',
    productName: 'Solaray Black Cohosh Root Extract 80mg (30ct)',
    formulaId: 'solaray-b121-076280031737',
    form: 'capsule',
    barcode: '076280031737',
    actives: [{ name: 'Black Cohosh Root Extract', strength: '80 mg' }],
    flags: [
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Organic Rice Extract Blend', 'limited', 'riceExtract'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited/Caution). No High. Job 2.',
    cite: `solaray.com supplement-facts image https://www.solaray.com/products/black-cohosh-root-extract other-ingredients: Cellulose, Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Serving 1, 30 servings. Exact pack Solaray Black Cohosh Root Extract 80mg (30ct). SKU 076280031737. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b121-076280031119',
    productName: 'Solaray Bilberry Extract 60mg (120ct)',
    formulaId: 'solaray-b121-076280031119',
    form: 'capsule',
    barcode: '076280031119',
    actives: [{ name: 'Bilberry Extract', strength: '60 mg' }],
    flags: [
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Organic Rice Extract Blend', 'limited', 'riceExtract'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High. Job 2. Not the 42mg formula already on MAIN.',
    cite: `solaray.com supplement-facts image https://www.solaray.com/products/copy-of-bilberry-berry-extract other-ingredients: Cellulose, Vegetable Cellulose Capsule and Organic Rice Extract Blend. Serving 1 VegCap, 120 servings. Exact pack Solaray Bilberry Extract 60mg (120ct). SKU 076280031119. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b121-076280031102',
    productName: 'Solaray Bilberry Extract 60mg (60ct)',
    formulaId: 'solaray-b121-076280031102',
    form: 'capsule',
    barcode: '076280031102',
    actives: [{ name: 'Bilberry Extract', strength: '60 mg' }],
    flags: [
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Organic Rice Extract Blend', 'limited', 'riceExtract'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited/Caution). No High. Job 2. Own formulaId: the 120ct panel on the same PDP has no Silica.',
    cite: `https://www.swansonvitamins.com/p/solaray-bilberry-extract-60-mg-60-veg-caps other-ingredients: Cellulose, Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Serving 1 VegCap, 60 servings. Exact pack Solaray Bilberry Extract 60mg (60ct). SKU 076280031102. Schema gtin on that page equals the SKU and was not read under the bars, so UPC is blank. Solaray PDP facts image is the 120ct sibling 076280031119, not this pack.`,
  },
  {
    id: 'solaray-b121-076280385847',
    productName: 'Solaray Vitamin D3 + K2 (60ct)',
    formulaId: 'solaray-b121-076280385847',
    form: 'capsule',
    barcode: '076280385847',
    actives: [{ name: 'Vitamin D3 + K2', strength: '125 mcg D3' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Glycerol Monostearate', 'cleared', 'gms'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
      ['Silica', 'limited', 'sio2'],
      ['Modified Food Starch', 'limited', 'modStarch'],
      ['Cellulose', 'cleared', 'mcc'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica, Modified Food Starch (Limited). No High. Job 2. Cited Vitacost panel only. Other US pages that add Rice Bran Extract were not merged.',
    cite: `https://www.vitacost.com/products/solaray-vitamin-d3-k2-60-vegcaps-70098 ingredients: Vegetable cellulose capsule, glycerol monostearate, magnesium stearate, silica, modified food starch, and cellulose. Page UPC field 076280385847. 60 count. Exact pack Solaray Vitamin D3 + K2 (60ct). SKU 076280385847. Digits were not read under the bars, so UPC is blank. Solaray carousel SFP on the PDP is the 120ct sibling, not this pack.`,
  },
  {
    id: 'solaray-b121-076280088922',
    productName: 'Solaray Red Yeast Rice + CoQ-10 (60ct)',
    formulaId: 'solaray-b121-076280088922',
    form: 'capsule',
    barcode: '076280088922',
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
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Rice Flour, Silica (Limited/Caution). No High. Job 2. Not a twin of the Red Yeast Rice 600mg rows already on MAIN.',
    cite: `https://www.nhc.com/products/red-yeast-rice-coq10-by-solaray other-ingredients: vegetable cellulose capsule, rice flour, silica and magnesium stearate. 60 veg caps, servings 60. solaray.com ingredients accordion on https://www.solaray.com/products/red-yeast-rice-plus-coq-10 prints the same line. Exact pack Solaray Red Yeast Rice + CoQ-10 (60ct). SKU 076280088922. ${UPC_BLANK} The Amazon 100ct SFP on the PDP is not this pack.`,
  },
  {
    id: 'solaray-b121-076280970500',
    productName: 'Solaray SharpMind Nootropics Mood (30ct)',
    formulaId: 'solaray-b121-076280970500',
    form: 'capsule',
    barcode: '076280970500',
    actives: [{ name: 'SharpMind Nootropics Mood', strength: '30 VegCaps' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Stearic Acid', 'cleared', 'stearate'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High. Job 2.',
    cite: `https://www.pureformulas.com/product/sharpmind-mood/1000062266 other-ingredients: Vegetable Cellulose Capsule, Cellulose, Stearic Acid, Maltodextrin, and Silica. 30 VegCaps. Exact pack Solaray SharpMind Nootropics Mood (30ct). SKU 076280970500. ${UPC_BLANK} Solaray carousel tiles have no Supplement Facts.`,
  },
  {
    id: 'solaray-b121-076280083637',
    productName: 'Solaray Cleanse - Liver (60ct)',
    formulaId: 'solaray-b121-076280083637',
    form: 'capsule',
    barcode: '076280083637',
    actives: [
      { name: 'Vitamin C (as Natural Ascorbic Acid)', strength: '120 mg' },
      { name: 'Selenium (as Selenomethionine)', strength: '100 mcg' },
      { name: 'Total Cleanse Liver Blend', strength: '635 mg' },
      { name: 'N-Acetyl Cysteine', strength: '200 mg' },
      { name: 'L-Glutathione', strength: '25 mg' },
    ],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Silica', 'limited', 'sio2'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High. Job 2.',
    cite: `https://www.vitacost.com/products/solaray-total-cleanse-liver-60-vegetarian-capsules-25557 ingredients: Vegetable cellulose capsule, cellulose, silica and magnesium stearate. Serving 2 VegCaps, 30 servings. Page UPC field 076280083637. Exact pack Solaray Cleanse - Liver (60ct). Digits were not read under the bars, so UPC is blank. https://www.nhc.com/products/total-cleanse-liver-formula-by-solaray prints the same Other Ingredients line and does not print a UPC.`,
  },
];

export const BATCH121_KYR6B_SOLARAY_SOY_32: RatingRecord[] = COMPACT.map(expand);

export const BATCH121_SKIPPED_NO_OI: { sku: string; name: string; count: string; url: string }[] = [
  {
    sku: '076280121551',
    name: 'Red Yeast Rice + CoQ-10',
    count: '90ct',
    url: 'https://www.solaray.com/products/red-yeast-rice-plus-coq-10',
  },
  {
    sku: '076280830385',
    name: 'Liposomal Multivitamin Universal',
    count: '60ct',
    url: 'https://www.solaray.com/products/liposomal-multivitamin-universal',
  },
];

export const BATCH121_SKIPPED_OUT: { sku: string; name: string; why: string }[] = [];

export const BATCH121_HUNT_POUR: { name: string; url: string }[] = [];

export const BATCH121_REFUSED: { sku: string; name: string; count: string; url: string; unknown: string[] }[] = [
  {
    sku: '076280200553',
    name: 'Once Daily Active Man Multivitamin',
    count: '90ct',
    url: 'https://www.solaray.com/products/once-daily-active-man-multi-vitamin',
    unknown: ['Gum Acacia'],
  },
  {
    sku: '076280127409',
    name: 'Vitamin B-6, Timed-Release',
    count: '60ct / 50 mg',
    url: 'https://www.solaray.com/products/vitamin-b-6-timed-release',
    unknown: ['Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, and Aloe Vera Gel)'],
  },
  {
    sku: '076280127423',
    name: 'Vitamin B-6, Timed-Release',
    count: '60ct / 100 mg',
    url: 'https://www.solaray.com/products/vitamin-b-6-timed-release',
    unknown: ['Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, and Aloe Vera Gel)'],
  },
  {
    sku: '076280034004',
    name: 'Echinacea Angustifolia Root Ext 125mg',
    count: '60ct',
    url: 'https://www.solaray.com/products/echinacea-angustifolia-root-ext',
    unknown: ['Maltodextrin (from Non-GMO Corn)'],
  },
  {
    sku: '076280042405',
    name: 'Mega Vitamin B-Stress, Timed-Release',
    count: '60ct',
    url: 'https://www.solaray.com/products/mega-vitamin-b-stress-timed-release',
    unknown: ['Whole Food Base (Whole Rice Concentrate including the Bran, Polishings and Germ, and Pure Aloe Vera Gel)'],
  },
  {
    sku: '076280648843',
    name: 'Cal-Mag Citrate w/D-3 & K-2, 2:1 Ratio',
    count: '180ct',
    url: 'https://www.solaray.com/products/cal-mag-citrate-w-d-3-k-2',
    unknown: ['Alfalfa Leaf', 'Watercress Leaf', 'Dandelion Root'],
  },
  {
    sku: '076280193251',
    name: "Liposomal Multivitamin Women's",
    count: '60ct',
    url: 'https://www.solaray.com/products/liposomal-multivitamin-womens',
    unknown: ['Lipid Blend from Sunflower Oil and Sustainable Palm Oil', 'Modified Tapioca Starch'],
  },
  {
    sku: '076280047431',
    name: 'Solaray Multi Energy Two Daily, Capsule (Btl-Plastic) | 120ct',
    count: '',
    url: 'https://www.solaray.com/products/solaray-multi-energy-two-daily-capsule-btl-plastic-120ct',
    unknown: ['Eleuthero Root', 'Sucrose', 'Carrot Juice Powder', 'Soybean Oil'],
  },
  {
    sku: '076280355307',
    name: 'Mycrobiome Prebiotic',
    count: '5.64oz  (160g) / Citrus',
    url: 'https://www.solaray.com/products/mycrobiome-prebiotic',
    unknown: ['Natural Mandarin Orange Flavor with Other Natural Flavors', 'Himalayan Pink Salt'],
  },
  {
    sku: '076280874969',
    name: 'Vitamin K-2, MK-7 50mcg',
    count: '60ct',
    url: 'https://www.solaray.com/products/vitamin-k-2-mk-7-50mcg',
    unknown: ['Fermented Defatted Chickpea Flour Extract'],
  },
  {
    sku: '076280045307',
    name: 'Calcium & Magnesium, AAC 2:1',
    count: '90ct',
    url: 'https://www.solaray.com/products/calcium-magnesium-amino-acid-chelate-2-1-ratio',
    unknown: [
      'Citric Acid (from Non-GMO Tapioca)',
      'L-Aspartic Acid',
      'Rice Protein',
      'Alfalfa Aerial',
      'Dandelion Root',
      'Watercress Leaf',
      'Parsley Aerial',
    ],
  },
  {
    sku: '076280047967',
    name: "Children's Multivitamin",
    count: '60ct',
    url: 'https://www.solaray.com/products/childrens-multi-vitamin',
    unknown: [
      'Fructose',
      'Natural Cherry Flavor with other Natural Flavors',
      'Hydrogenated Soybean Oil',
      'Glucono Delta Lactone',
      'Rose Hips',
      'Acerola Cherry',
    ],
  },
  {
    sku: '076280012118',
    name: 'Dandelion Root 1040mg',
    count: '180ct',
    url: 'https://www.solaray.com/products/dandelion-root',
    unknown: ['Rice Extract Blend'],
  },
  {
    sku: '076280037661',
    name: 'Saw Palmetto & Pygeum with Zinc & Vitamin E',
    count: '30 ct',
    url: 'https://www.solaray.com/products/pygeum-bark-saw-palmetto-ext',
    unknown: ['Softgel (Gelatin)', 'Pumpkin Seed Oil', 'Nettle Leaf', 'L-Alanine', 'Glutamic Acid'],
  },
  {
    sku: '076280048018',
    name: 'Super Digestaway',
    count: '90ct',
    url: 'https://www.solaray.com/products/super-digestaway-digestive-enzyme-blend',
    unknown: ['Maltodextrin (from Non-GMO Corn)'],
  },
  {
    sku: '076280048025',
    name: 'Super Digestaway',
    count: '180ct',
    url: 'https://www.solaray.com/products/super-digestaway-digestive-enzyme-blend',
    unknown: ['Maltodextrin (from Non-GMO Corn)'],
  },
  {
    sku: '076280083644',
    name: 'Total Cleanse Kidney',
    count: '60 ct / Veg Cap',
    url: 'https://www.solaray.com/products/total-cleanse-kidney',
    unknown: ['Magnesium Sterate'],
  },
];

export const BATCH121_LEFTOVER_REAL_TOKENS: string[] = [
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
  "Magnesium Sterate",
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

const NEW_EXACT_UNKNOWNS = [
  "Natural Mandarin Orange Flavor with Other Natural Flavors",
  "Himalayan Pink Salt",
  "Lipid Blend from Sunflower Oil and Sustainable Palm Oil",
  "Hydrogenated Soybean Oil",
  "Glucono Delta Lactone",
  "Softgel (Gelatin)",
  "Pumpkin Seed Oil",
  "Nettle Leaf",
  "Glutamic Acid",
  "Magnesium Sterate",
];

const _ROWS = BATCH121_KYR6B_SOLARAY_SOY_32;
if (_ROWS.length !== 13) throw new Error('batch121 tally drift: expected 13 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 2) throw new Error('batch121 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 11) throw new Error('batch121 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) throw new Error('batch121 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch121 recordStatus must stay unverified');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 13) throw new Error('batch121 NEW tally drift');
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 0) throw new Error('batch121 REUSE tally drift');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch121 writes Solaray only');
{
  const _seenUpc = new Set<string>();
  for (const _r of _ROWS) {
    const _b = _r.barcode ?? '';
    if (!_b) continue;
    if (!/^\d{12}$/.test(_b)) throw new Error('batch121 barcode not GTIN-12 on ' + _r.id);
    const _d = _b.split('').map(Number);
    const _sum = _d.slice(0, 11).reduce((acc, n, i) => acc + n * (i % 2 === 0 ? 3 : 1), 0);
    if ((10 - (_sum % 10)) % 10 !== _d[11]) throw new Error('batch121 barcode check digit ' + _r.id);
    if (_seenUpc.has(_b)) throw new Error('batch121 duplicate barcode ' + _b);
    _seenUpc.add(_b);
  }
}
if (_ROWS.some((r) => r.form === 'gummy' || r.form === 'liquid')) throw new Error('batch121 must not grade gummies or pour bottles');
if (BATCH121_SKIPPED_NO_OI.length !== 2) throw new Error('batch121 no_OI leftover drift');
if (BATCH121_SKIPPED_OUT.length !== 0) throw new Error('batch121 OUT drift');
if (BATCH121_REFUSED.length !== 17) throw new Error('batch121 REFUSED drift');
if (BATCH121_HUNT_POUR.length !== 0) throw new Error('batch121 hunt-list drift');
if (BATCH121_LEFTOVER_REAL_TOKENS.length !== 284) throw new Error('batch121 leftover token drift');
if (BATCH121_LEFTOVER_REAL_TOKENS.includes('Lecithin (Soy)')) throw new Error('batch121 must drop Lecithin (Soy)');
if (NEW_EXACT_UNKNOWNS.some((t) => !BATCH121_LEFTOVER_REAL_TOKENS.includes(t))) {
  throw new Error('batch121 missing a new exact token');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients.some((i) => i.riskLevel === 'high'))) {
  throw new Error('batch121 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients.some((i) => i.riskLevel !== 'cleared'))) {
  throw new Error('batch121 Clean row has a flag');
}
if (_ROWS.some((r) => r.verdict === 'caution' && !r.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate'))) {
  throw new Error('batch121 Caution without Limited');
}
const _bucket = new Set<string>([
  ..._ROWS.map((r) => r.id.replace('solaray-b121-', '')),
  ...BATCH121_REFUSED.map((r) => r.sku),
  ...BATCH121_SKIPPED_NO_OI.map((r) => r.sku),
]);
if (_bucket.size !== 32) throw new Error('batch121 32-SKU partition overlap');
const _FROM120 = [
  "076280200553","076280127409","076280047967","076280174045","076280446869","076280850406","076280034004","076280105056","076280042405","076280648843","076280193251","076280399134","076280127423","076280031737","076280031119","076280047431","076280731767","076280355307","076280874969","076280045307","076280037661","076280031102","076280385847","076280012118","076280048018","076280048025","076280088922","076280121551","076280970500","076280830385","076280083637","076280083644",
];
if (_FROM120.some((s) => !_bucket.has(s))) throw new Error('batch121 missed a batch120 no_OI SKU');
