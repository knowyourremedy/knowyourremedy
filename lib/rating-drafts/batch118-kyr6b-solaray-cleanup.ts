// DRAFT / not verified / batch 118 KYR6-b Solaray cleanup.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades.
// Four founder aliases stamped Sept 27, 2026 (aliases only, grades unchanged):
// High Oleic Sunflower Oil in a dropper / non-gummy → named sunflower fill (Cleared).
// Vegetable Oil in a dropper / non-gummy → non-gummy fill (Cleared).
// Gummy vegetable oil stays High/Avoid.
// Mono & Diglycerides → unspecified mono- and diglycerides (Caution).
// Maanesium Stearate → stearate family (Cleared) only where the panel image
// is actually magnesium stearate.
// Natural Rosemary Extract is the existing oral rosemary-preservative Caution
// row. No new alias. Bare Vegetable Capsule stays ungraded.
// batch70–batch115 were not edited. batch116 lost only the sizeless maca row.
// batch117 changed only the 7 formerly sizeless counts and the nettle twin.
// No 123 no_OI pass. No new brands. No oil pour bottles.
// recordStatus is 'unverified' on every row. UPC stays empty.
//
// TALLY (unverified drafts in THIS file): 18 rows —
// Clean 2 / Caution 16 / Avoid 0.
// NEW 18 / REUSE 0 / SKIPPED 0 / REFUSED 0 in this file.
// The other batch117 refusals stay refused there.
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

const UPC =
  'Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.';

const METH = {
  capsuleCellulose:
    'Methodology §5 Cleared (capsule cellulose / labeled veg cap). Vegetable Cellulose Capsule maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  mcc:
    'Methodology §5 Cleared (cellulose-family / powdered cellulose / MCC). Cellulose maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  stearate:
    'Methodology §5 Cleared (magnesium stearate / stearic acid).',
  sio2: 'Methodology §5 Limited (silica / silicon dioxide). Not Avoid.',
  maltodextrin:
    'Methodology §5 Limited (maltodextrin, organic or non-organic). Not Avoid.',
  acacia: 'Methodology §5 Cleared (acacia gum / gum arabic).',
  riceExtract:
    'Methodology §5 Limited (unspecified rice extract). Organic Rice Extract Blend maps here (Sept 27, 2026). Same Limited / Caution. Not a new grade.',
  riceConc:
    'Methodology §5 Cleared (rice concentrate / hull-concentrate). Whole Rice Concentrate maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  citric: 'Methodology §5 Cleared (citric acid).',
  sunflower:
    'Methodology §5 Cleared (sunflower oil as non-gummy fill). High Oleic Sunflower Oil in a dropper maps here (Sept 27, 2026). Same Cleared. Not a new grade. Gummy sunflower stays High.',
  vegetableOil:
    'Methodology §5 Cleared (non-gummy vegetable-oil fill). Vegetable Oil in a dropper maps here (Sept 27, 2026). Same Cleared. Not a new grade. Gummy vegetable oil stays High/Avoid.',
  monoDiglycerides:
    'Methodology §5 Limited (mono- and diglycerides, unspecified blend). Mono & Diglycerides maps here (Sept 27, 2026). Same Caution. Not a new grade. Not Cleared GMS.',
  tocopherol:
    'Methodology §5 Cleared (mixed tocopherols as antioxidant).',
  rosemary:
    'Methodology §5 Limited (Rosemary Extract (A Natural Preservative) oral). Natural Rosemary Extract is this existing row. Same Caution. Not a new alias.',
  mica:
    'Methodology §5 Limited (mica-based pearlescent pigment). Bare mica maps here (Sept 26, 2026). Same Caution. Not a new grade.',
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
    id: 'solaray-b118-076280731613',
    productName: 'Solaray Vitamin D3 Liquid Unflavored (0.5 fl oz)',
    formulaId: 'solaray-b118-076280731613',
    form: 'liquid',
    barcode: '076280731613',
    actives: [
      { name: 'Vitamin D (as Cholecalciferol) (D-3)', strength: '25 mcg' },
    ],
    flags: [
      ['High Oleic Sunflower Oil', 'cleared', 'sunflower'],
      ['Vegetable Oil', 'cleared', 'vegetableOil'],
      ['Mixed Tocopherols', 'cleared', 'tocopherol'],
      ['Mono & Diglycerides', 'limited', 'monoDiglycerides'],
      ['Natural Rosemary Extract', 'limited', 'rosemary'],
      ['Citric Acid', 'cleared', 'citric'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Mono & Diglycerides and Natural Rosemary Extract (Limited). No High. Dropper, not a gummy and not an oil pour bottle.',
    cite: `solaray.com https://www.solaray.com/products/vitamin-d3-liquid-unflavored supplement-facts image 076280731613-Solaray-VitaminD-325mcg0.5floz-SFP.png other-ingredients: High Oleic Sunflower Oil, Vegetable Oil, Mixed Tocopherols, Mono & Diglycerides, Natural Rosemary Extract and Citric Acid. Form liquid dropper. Serving 1 drop (.03 mL), about 500 drops. Exact pack Solaray Vitamin D3 Liquid Unflavored (0.5 fl oz). SKU 076280731613. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280316247',
    productName: 'Solaray Berberine & Curcumin (60ct)',
    formulaId: 'solaray-b118-076280316247',
    form: 'capsule',
    barcode: '076280316247',
    actives: [{ name: 'Berberine & Curcumin', strength: 'label serving' }],
    flags: [
      ['Acacia Gum', 'cleared', 'acacia'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
    ],
    verdict: 'clean',
    note: CLEARED_NOTE,
    cite: `solaray.com https://www.solaray.com/products/berberine-curcumin-root-extracts supplement-facts image other-ingredients: Acacia Gum, Vegetable Cellulose Capsule. The following AquaTurm trademark sentence is not an ingredient. Exact pack Solaray Berberine & Curcumin (60ct). SKU 076280316247. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280749748',
    productName: 'Solaray AHCC + NAC & Beta Glucan (30ct)',
    formulaId: 'solaray-b118-076280749748',
    form: 'capsule',
    barcode: '076280749748',
    actives: [{ name: 'AHCC + NAC & Beta Glucan', strength: 'label serving' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
      ['Cellulose', 'cleared', 'mcc'],
    ],
    verdict: 'clean',
    note: CLEARED_NOTE,
    cite: `solaray.com https://www.solaray.com/products/ahcc-plus-nac-beta-glucan supplement-facts image other-ingredients: Vegetable Cellulose Capsule, Magnesium Stearate and Cellulose. The AHCC trademark sentence is not an ingredient. Exact pack Solaray AHCC + NAC & Beta Glucan (30ct). SKU 076280749748. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280011609',
    productName: 'Solaray Chamomile Flowering Top 350mg (100 ct)',
    formulaId: 'solaray-b118-076280011609',
    form: 'capsule',
    barcode: '076280011609',
    actives: [
      { name: 'Chamomile (Matricaria recutita) (flowering tops)', strength: '350 mg' },
    ],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Organic Rice Extract Blend', 'limited', 'riceExtract'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/chamomile-flowering-top supplement-facts image lb_facts_076280011609.png other-ingredients: Vegetable Cellulose Capsule and Organic Rice Extract Blend. OCR had split the rice blend across a line break. Exact pack Solaray Chamomile Flowering Top 350mg (100 ct). SKU 076280011609. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280402490',
    productName: 'Solaray Olive Leaf Extract 22%, 250mg (120ct)',
    formulaId: 'solaray-b118-076280402490',
    form: 'capsule',
    barcode: '076280402490',
    actives: [{ name: 'Olive (Olea europaea) (leaf extract)', strength: '250 mg' }],
    flags: [
      ['Whole Rice Concentrate', 'cleared', 'riceConc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Organic Rice Extract Blend', 'limited', 'riceExtract'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Organic Rice Extract Blend, Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/olive-leaf-extract-22 supplement-facts image 076280402490_lbl_facts.jpg other-ingredients: Whole Rice Concentrate, Vegetable Cellulose Capsule, Maltodextrin, Organic Rice Extract Blend and Silica. Image reads Organic; OCR had printed Oraanic. Exact pack Solaray Olive Leaf Extract 22%, 250mg (120ct). SKU 076280402490. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280107463',
    productName: 'Solaray Green Tea Leaf Extract, Double 500mg (30ct)',
    formulaId: 'solaray-b118-076280107463',
    form: 'capsule',
    barcode: '076280107463',
    actives: [{ name: 'Green Tea (Camellia sinensis) (leaf extract)', strength: '500 mg' }],
    flags: [
      ['Whole Rice Concentrate', 'cleared', 'riceConc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Organic Rice Extract Blend', 'limited', 'riceExtract'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Organic Rice Extract Blend, Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/green-tea-leaf-extract-double supplement-facts image lbl_facts_076280107463.jpg other-ingredients: Whole Rice Concentrate, Vegetable Cellulose Capsule, Organic Rice Extract Blend and Silica. Image reads Organic; OCR had printed Oraanic. Exact pack Solaray Green Tea Leaf Extract, Double 500mg (30ct). SKU 076280107463. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280924008',
    productName: 'Solaray Hyaluronic Acid 20mg (30ct)',
    formulaId: 'solaray-b118-076280924008',
    form: 'capsule',
    barcode: '076280924008',
    actives: [{ name: 'Hyaluronic Acid (Microbial Fermentation)', strength: '20 mg' }],
    flags: [
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Silica', 'limited', 'sio2'],
      ['Magnesium Stearate', 'cleared', 'stearate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/hyaluronic-acid supplement-facts image 076280924008_lbl_facts.jpg other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica and Magnesium Stearate. Image reads Magnesium Stearate; OCR had printed Maqnesium. That typo is not the Maanesium alias. Exact pack Solaray Hyaluronic Acid 20mg (30ct). SKU 076280924008. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280477986',
    productName: 'Solaray ActiveMag (60ct)',
    formulaId: 'solaray-b118-076280477986',
    form: 'capsule',
    barcode: '076280477986',
    actives: [{ name: 'Magnesium (Magnesium Malate)', strength: '210 mg' }],
    flags: [
      ['Citric Acid', 'cleared', 'citric'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Stearic Acid', 'cleared', 'stearate'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Mica', 'limited', 'mica'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Mica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/activemag-magnesium-potassium supplement-facts image ActiveMag60ct SFP other-ingredients: Citric Acid, Vegetable Cellulose Capsule, Stearic Acid, Cellulose, and Mica. Serving 2 VegCaps, 30 servings (60 ct) matches the carton filename. Exact pack Solaray ActiveMag (60ct). SKU 076280477986. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280524420',
    productName: 'Solaray Testosterone Support (60ct)',
    formulaId: 'solaray-b118-076280524420',
    form: 'capsule',
    barcode: '076280524420',
    actives: [{ name: 'Testosterone Support', strength: 'label serving' }],
    flags: [
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/testosterone-support supplement-facts image Testosterone Support 60ct SFP other-ingredients: Cellulose, Vegetable Cellulose Capsule, Maltodextrin, and Silica. The Tesnor trademark sentence is not an ingredient. Serving 2 VegCaps, 30 servings (60 ct). Exact pack Solaray Testosterone Support (60ct). SKU 076280524420. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280648065',
    productName: 'Solaray SharpMind Nootropics Energy (30 ct)',
    formulaId: 'solaray-b118-076280648065',
    form: 'capsule',
    barcode: '076280648065',
    actives: [{ name: 'SharpMind Nootropics Energy', strength: 'label serving' }],
    flags: [
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Stearic Acid', 'cleared', 'stearate'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/sharpmind-nootropics-energy supplement-facts image SharpMindEnergy30ct SFP other-ingredients: Cellulose, Vegetable Cellulose Capsule, Stearic Acid, Maltodextrin, Silica. The enXtra trademark sentence is not an ingredient. Exact pack Solaray SharpMind Nootropics Energy (30 ct). SKU 076280648065. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280507874',
    productName: 'Solaray SharpMind Nootropics Sleep (30 ct)',
    formulaId: 'solaray-b118-076280507874',
    form: 'capsule',
    barcode: '076280507874',
    actives: [{ name: 'SharpMind Nootropics Sleep', strength: 'label serving' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Stearic Acid', 'cleared', 'stearate'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/sharpmind-nootropics-sleep supplement-facts image SharpMindSleep30ct SFP other-ingredients: Vegetable Cellulose Capsule, Cellulose, Stearic Acid, and Silica. The Shoden trademark sentence is not an ingredient. Exact pack Solaray SharpMind Nootropics Sleep (30 ct). SKU 076280507874. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280615579',
    productName: 'Solaray StressMag (60ct)',
    formulaId: 'solaray-b118-076280615579',
    form: 'capsule',
    barcode: '076280615579',
    actives: [{ name: 'StressMag', strength: 'label serving' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Stearic Acid', 'cleared', 'stearate'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/stressmag supplement-facts image StressMag60ct SFP other-ingredients: Vegetable Cellulose Capsule, Citric Acid, Cellulose, Stearic Acid, and Silica. The Shoden trademark sentence is not an ingredient. Serving 2 VegCaps, 30 servings (60 ct). Exact pack Solaray StressMag (60ct). SKU 076280615579. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280400120',
    productName: 'Solaray AMPK Activator+Dihydroberberine (60ct)',
    formulaId: 'solaray-b118-076280400120',
    form: 'capsule',
    barcode: '076280400120',
    actives: [{ name: 'AMPK Activator+Dihydroberberine', strength: 'label serving' }],
    flags: [
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Stearic Acid', 'cleared', 'stearate'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/ampk-activator-dihydroberberine supplement-facts image AMPK Activator 60ct SFP other-ingredients: Cellulose, Vegetable Cellulose Capsule, Stearic Acid, and Silica. The ActivAMP trademark sentence is not an ingredient. Serving 1 VegCap, 60 servings. Exact pack Solaray AMPK Activator+Dihydroberberine (60ct). SKU 076280400120. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280517149',
    productName: 'Solaray Shilajit (60ct)',
    formulaId: 'solaray-b118-076280517149',
    form: 'capsule',
    barcode: '076280517149',
    actives: [{ name: 'Shilajit', strength: 'label serving' }],
    flags: [
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Stearic Acid', 'cleared', 'stearate'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/shilajit supplement-facts image Shilajit 60ct SFP other-ingredients: Maltodextrin, Cellulose, Vegetable Cellulose Capsule, Stearic Acid, and Silica. The PrimaVie trademark sentence is not an ingredient. Serving 2 VegCaps, 30 servings (60 ct). Exact pack Solaray Shilajit (60ct). SKU 076280517149. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280489453',
    productName: 'Solaray Mycrobiome Complete Probiotic Active (30ct)',
    formulaId: 'solaray-b118-076280489453',
    form: 'capsule',
    barcode: '076280489453',
    actives: [{ name: 'Mycrobiome Complete Probiotic Active', strength: 'label serving' }],
    flags: [
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/mycrobiome-complete-probiotic-active supplement-facts image mycobiomeCompleteProbioticActive30ct SFP other-ingredients: Cellulose, Vegetable Cellulose Capsule, Silica. The Solnul trademark sentence is not an ingredient. Serving 1 Enteric VegCap, 30 servings. Exact pack Solaray Mycrobiome Complete Probiotic Active (30ct). SKU 076280489453. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280955002',
    productName: 'Solaray PEAK ATP (30ct)',
    formulaId: 'solaray-b118-076280955002',
    form: 'capsule',
    barcode: '076280955002',
    actives: [{ name: 'PEAK ATP', strength: 'label serving' }],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Stearic Acid', 'cleared', 'stearate'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/peak-atp supplement-facts image PeakATP30ct SFP other-ingredients: Vegetable Cellulose Capsule, Cellulose, Stearic Acid, and Silica. The PEAK ATP trademark sentence is not an ingredient. Serving 1 VegCap, 30 servings. Exact pack Solaray PEAK ATP (30ct). SKU 076280955002. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280903966',
    productName: 'Solaray Moro Red Orange Extract Morosil (30 ct)',
    formulaId: 'solaray-b118-076280903966',
    form: 'capsule',
    barcode: '076280903966',
    actives: [{ name: 'Moro Red Orange Extract Morosil', strength: 'label serving' }],
    flags: [
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Maltodextrin, Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/moro-red-orange-extract-morosil supplement-facts image MoroRedOrangeMorosil30ct SFP other-ingredients: Maltodextrin, Cellulose, Vegetable Cellulose Capsule and Silica. The Morosil trademark sentence is not an ingredient. Exact pack Solaray Moro Red Orange Extract Morosil (30 ct). SKU 076280903966. ${UPC}`,
  },
  {
    id: 'solaray-b118-076280417463',
    productName: 'Solaray ProSorb Ashwagandha 18x 240mg (30ct)',
    formulaId: 'solaray-b118-076280417463',
    form: 'capsule',
    barcode: '076280417463',
    actives: [{ name: 'ProSorb Ashwagandha 18x 240mg', strength: '240 mg' }],
    flags: [
      ['Cellulose', 'cleared', 'mcc'],
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
      ['Silica', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is Silica (Limited). No High.',
    cite: `solaray.com https://www.solaray.com/products/prosorb-ashwaganda supplement-facts image ProSorb Ashwagandha 30ct SFP other-ingredients: Cellulose, Vegetable Cellulose Capsule and Silica. The Shoden trademark sentence is not an ingredient. Serving 1 VegCap, 30 servings. Exact pack Solaray ProSorb Ashwagandha 18x 240mg (30ct). SKU 076280417463. ${UPC}`,
  },
];

export const BATCH118_KYR6B_SOLARAY_CLEANUP: RatingRecord[] = COMPACT.map(expand);

const _ROWS = BATCH118_KYR6B_SOLARAY_CLEANUP;
if (_ROWS.length !== 18) throw new Error('batch118 tally drift: expected 18 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 2) {
  throw new Error('batch118 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 16) {
  throw new Error('batch118 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch118 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch118 recordStatus must stay unverified');
}
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 18) {
  throw new Error('batch118 NEW tally drift');
}
if (_ROWS.some((r) => r.formulaId !== r.id)) {
  throw new Error('batch118 REUSE tally drift');
}
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch118 writes Solaray only');
{
  const _seenUpc = new Set<string>();
  for (const _r of _ROWS) {
    const _b = _r.barcode ?? '';
    if (!_b) continue;
    if (!/^\d{12}$/.test(_b)) throw new Error('batch118 barcode not GTIN-12 on ' + _r.id);
    const _d = _b.split('').map(Number);
    const _sum = _d.slice(0, 11).reduce((acc, n, i) => acc + n * (i % 2 === 0 ? 3 : 1), 0);
    if ((10 - (_sum % 10)) % 10 !== _d[11]) throw new Error('batch118 barcode check digit ' + _r.id);
    if (_seenUpc.has(_b)) throw new Error('batch118 duplicate barcode ' + _b);
    _seenUpc.add(_b);
  }
}
if (_ROWS.some((r) => r.form === 'gummy')) throw new Error('batch118 has no gummy rows');
const d3 = _ROWS.find((r) => r.id === 'solaray-b118-076280731613');
if (!d3 || d3.form !== 'liquid' || d3.verdict !== 'caution') {
  throw new Error('batch118 D3 dropper must be Caution liquid');
}
if (!d3.inactiveIngredients.some((i) => i.name === 'Mono & Diglycerides' && i.riskLevel === 'limited')) {
  throw new Error('batch118 D3 glycerides must stay Caution');
}
if (d3.productName.includes('0.5 fl oz') === false) {
  throw new Error('batch118 D3 pack size missing');
}
