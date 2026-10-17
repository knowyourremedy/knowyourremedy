// DRAFT / not verified / batch 212 KYR6-c (t107u WRITE).
// Caltrate, Move Free, and Citracal qualifying counts — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  dye: 'Methodology §5 Avoid (synthetic dye / FD&C lake).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral coating).',
  talc: 'Methodology §5 Avoid (talc). Magnesium silicate is that row in a swallowed product.',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  tocopherol: 'Methodology §5 Cleared (tocopherols).',
  xylitol: 'Methodology §5 Limited (xylitol, oral).',
  citric: 'Methodology §5 Cleared (citric acid).',
  cornSyrup: 'Methodology §5 Caution (corn syrup / corn syrup solids).',
  hcoPalm:
    'Methodology §5 Avoid (hydrogenated oils). Hydrogenated Palm Oil maps here (Oct 17, 2026 t107u).',
  hcoCoconut: 'Methodology §5 Avoid (hydrogenated oils).',
  monoDiGlycerides:
    'Methodology §5 Caution (mono- and diglycerides, unspecified blend).',
  naFlavors: 'Methodology §5 Limited (natural and artificial flavors).',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  sucralose: 'Methodology §5 Moderate (sucralose).',
  sugar: 'Methodology §5 Caution (bare sugar).',
  invertSugar:
    'Methodology §5 Caution (bare sugar). Invert Sugar maps here (Oct 17, 2026 t107u).',
  water: 'Methodology §5 Cleared (purified water / bare water).',
  cocoaAlkali:
    'Methodology §5 Cleared (cocoa powder processed with alkali). Cocoa Processed with Alkali maps here (Oct 17, 2026 t107u).',
  nonfatDryMilk: 'Methodology §5 Limited (non-fat dry milk).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  lecithinSoy: 'Methodology §5 Cleared (lecithin / soy lecithin).',
  propyleneGlycol: 'Methodology §5 Moderate (propylene glycol, oral).',
  salt: 'Methodology §5 Cleared (sodium chloride / named salt). Salt maps here (Oct 17, 2026 t107u).',
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  modStarch:
    'Methodology §5 Limited (modified starch). Modified Corn Starch maps here (Oct 17, 2026 t107u).',
  mica:
    'Methodology §5 Caution (mica-based pearlescent pigment). Mica [color] maps here (Oct 17, 2026 t107u).',
  riboflavinColor: 'Methodology §5 Cleared (riboflavin used as color).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  inulin: 'Methodology §5 Cleared (inulin).',
  colorCalciumCarbonate:
    'Methodology §5 Caution (Color (Calcium Carbonate)). Locked Oct 17, 2026 t107u.',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_CALTRATE_PM_CHEW =
  'https://haleon.info/en-us/Caltrate/caltrate-600-plus-d-plus-minerals-chewables v62000000207780';
const PANEL_CALTRATE_SOFT_CHOC =
  'https://haleon.info/en-us/Caltrate/caltrate-soft-chews-chocolate v211216';
const PANEL_CALTRATE_PM_TABLET =
  'https://haleon.info/en-us/Caltrate/caltrate-600-d-plus-minerals-tablets v205609';
const PANEL_MF_UTA =
  'https://www.schiffvitamins.com/collections/move-free/products/move-free-ultra-triple-action';
const PANEL_MF_TAMA =
  'https://www.schiffvitamins.com/collections/move-free/products/move-free-advanced-tamaflex';
const PANEL_MF_ADV_MSM80 =
  'https://www.walmart.com/ip/Schiff-Move-Free-Advanced-Plus-MSM-Vitamin-D3-Joint-Supplement-80-Coated-Tablets/10451740';
const PANEL_CITRACAL_MAX =
  'https://livewell.bayer.com/document/3906 WEB-SF-Citracal Maximum Plus Caplets 10102024 v001';
const PANEL_CITRACAL_PETITES =
  'https://livewell.bayer.com/document/3911 WEB-SF-Citracal Petites Caplets 12112024 v001';
const PANEL_CITRACAL_SR =
  'https://livewell.bayer.com/document/3916 WEB-SF-Citracal Slow Release Caplets 04022025 v001';

const CHEWABLES_HONEST_NOTE =
  'The front panel says SUGAR FREE, but the ingredient list prints Sugar and Corn Syrup Solids with a footnote that they add a dietarily insignificant amount of sugar. That reads as a contradiction to a shopper.';

const HONEST_NOTE_IDS = new Set([
  'caltrate-b212-plus-minerals-chewables-90',
  'caltrate-b212-plus-minerals-chewables-155',
]);

const PM_CHEW_FLAGS: FlagSpec[] = [
  ['Xylitol', 'limited', 'xylitol'],
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Blue 2 Lake', 'high', 'dye'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Corn Syrup Solids', 'limited', 'cornSyrup'],
  ['Hydrogenated Palm Oil', 'high', 'hcoPalm'],
  ['Magnesium Stearate', 'cleared', 'magStearate'],
  ['Mono- and Di-Glycerides', 'limited', 'monoDiGlycerides'],
  ['Natural and Artificial Flavors', 'limited', 'naFlavors'],
  ['Polydextrose', 'limited', 'polydextrose'],
  ['Red 40 Lake', 'high', 'dye'],
  ['Sucralose', 'moderate', 'sucralose'],
  ['Sugar', 'limited', 'sugar'],
  ['Tocopherols (to preserve freshness)', 'cleared', 'tocopherol'],
  ['Yellow 6 Lake', 'high', 'dye'],
];

const SOFT_CHOC_FLAGS: FlagSpec[] = [
  ['Corn Syrup', 'limited', 'cornSyrup'],
  ['Sugar', 'limited', 'sugar'],
  ['Water', 'cleared', 'water'],
  ['Hydrogenated Coconut Oil', 'high', 'hcoCoconut'],
  ['Cocoa Processed with Alkali', 'cleared', 'cocoaAlkali'],
  ['Nonfat Dry Milk', 'limited', 'nonfatDryMilk'],
  ['Corn Syrup Solids', 'limited', 'cornSyrup'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Invert Sugar', 'limited', 'invertSugar'],
  ['Lecithin (Soy)', 'cleared', 'lecithinSoy'],
  ['Natural and Artificial Flavors', 'limited', 'naFlavors'],
  ['Propylene Glycol', 'moderate', 'propyleneGlycol'],
  ['Salt', 'cleared', 'salt'],
];

const PM_TABLET_FLAGS: FlagSpec[] = [
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Blue 2 Lake', 'high', 'dye'],
  ['Croscarmellose Sodium', 'cleared', 'croscarmellose'],
  ['Magnesium Stearate', 'cleared', 'magStearate'],
  ['Polyethylene Glycol', 'moderate', 'peg'],
  ['Polyvinyl Alcohol', 'cleared', 'pva'],
  ['Red 40 Lake', 'high', 'dye'],
  ['Talc', 'high', 'talc'],
  ['Titanium Dioxide', 'high', 'tio2'],
  ['Tocopherols (to preserve freshness)', 'cleared', 'tocopherol'],
  ['Yellow 6 Lake', 'high', 'dye'],
];

const MF_UTA_FLAGS: FlagSpec[] = [
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
  ['Croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['Silicon dioxide', 'limited', 'silica'],
  ['Hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
  ['Modified corn starch', 'limited', 'modStarch'],
  ['Mica [color]', 'limited', 'mica'],
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Magnesium silicate', 'high', 'talc'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
];

const MF_TAMA_FLAGS: FlagSpec[] = [
  ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Riboflavin', 'cleared', 'riboflavinColor'],
  ['Modified corn starch', 'limited', 'modStarch'],
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['Magnesium silicate', 'high', 'talc'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
];

const MF_ADV_MSM80_FLAGS: FlagSpec[] = [
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
  ['Modified corn starch', 'limited', 'modStarch'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['Magnesium silicate', 'high', 'talc'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
];

const CITRACAL_PEG_FLAGS: FlagSpec[] = [
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['Croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
  ['Inulin', 'cleared', 'inulin'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
];

const CITRACAL_SR_FLAGS: FlagSpec[] = [
  ['Hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['Color (Calcium Carbonate)', 'limited', 'colorCalciumCarbonate'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

const PM_CHEW_ACTIVES = [
  { name: 'Calcium', strength: '600 mg' },
  { name: 'Vitamin D3', strength: '20 mcg (800 IU)' },
  { name: 'Magnesium', strength: '40 mg' },
  { name: 'Zinc', strength: '7.5 mg' },
  { name: 'Copper', strength: '0.25 mg' },
  { name: 'Manganese', strength: '1.8 mg' },
] as const;

const PM_TABLET_ACTIVES = [
  { name: 'Calcium', strength: '600 mg' },
  { name: 'Vitamin D3', strength: '20 mcg (800 IU)' },
  { name: 'Magnesium', strength: '50 mg' },
  { name: 'Zinc', strength: '7.5 mg' },
  { name: 'Copper', strength: '1 mg' },
  { name: 'Manganese', strength: '1.8 mg' },
] as const;

export const BATCH212_KYR6C_CAL_MF_CIT_T107U: RatingRecord[] = [
  {
    id: 'caltrate-b212-plus-minerals-chewables-90',
    productName: 'Caltrate 600+D3 Plus Minerals Chewables (90 chewable tablets)',
    brand: 'Caltrate',
    category: VITAMINS,
    formulaId: 'caltrate-b212-plus-minerals-chewables',
    audience: ADULT,
    minAge: 18,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '305735567119',
    activeIngredients: [...PM_CHEW_ACTIVES],
    inactiveIngredients: buildOi(PANEL_CALTRATE_PM_CHEW, PM_CHEW_FLAGS),
    verdict: verdictFromFlags(PM_CHEW_FLAGS),
    honestNote: CHEWABLES_HONEST_NOTE,
    retailers: ['Target', 'Thrifty White', 'Vitacost'],
    sourcesGeneral: [
      `Haleon brand label PDF at ${PANEL_CALTRATE_PM_CHEW} (Oct 2023) was read for Caltrate 600+D3 Plus Minerals Chewables 90 ct. Serving size 1 chewable tablet. Actives are ungraded. Other ingredients: Calcium Carbonate, Xylitol, Maltodextrin, Magnesium Oxide. Contains <2% of: Blue 2 Lake, Cholecalciferol (Vit. D3), Citric Acid, Copper Sulfate, Corn Syrup Solids, Hydrogenated Palm Oil, Magnesium Stearate, Manganese Sulfate, Mono- and Di-Glycerides, Natural and Artificial Flavors, Polydextrose, Red 40 Lake, Sucralose, Sugar, Tocopherols (to preserve freshness), Yellow 6 Lake, Zinc Oxide. Target opened https://www.target.com/p/-/A-1006235197 Chewables 90 ct, $20.98, Add to cart, Oct 17, 2026. Thrifty White listed 90 ct InStock (4) $12.14. Vitacost opened https://www.vitacost.com/products/caltrate-600-d3-plus-minerals-cherry-orange-fruit-punch-90-chewable-tablets-160877 available $10.73 with printed UPC 305735567119.`,
    ],
  },
  {
    id: 'caltrate-b212-plus-minerals-chewables-155',
    productName: 'Caltrate 600+D3 Plus Minerals Chewables (155 chewable tablets)',
    brand: 'Caltrate',
    category: VITAMINS,
    formulaId: 'caltrate-b212-plus-minerals-chewables',
    audience: ADULT,
    minAge: 18,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '305735567645',
    activeIngredients: [...PM_CHEW_ACTIVES],
    inactiveIngredients: buildOi(PANEL_CALTRATE_PM_CHEW, PM_CHEW_FLAGS),
    verdict: verdictFromFlags(PM_CHEW_FLAGS),
    honestNote: CHEWABLES_HONEST_NOTE,
    retailers: ['Meijer', 'Vitacost', 'CVS'],
    sourcesGeneral: [
      `Same OI line as the 90-count brand label at ${PANEL_CALTRATE_PM_CHEW}. Meijer opened https://www.meijer.com/shopping/product/x/30573556764.html 155 Chewable Tablets inStock $15.59 Oct 17, 2026. Vitacost opened caltrate-bone-600-d3-plus-minerals-chewables-cherry-orange-fruit-punch-155-chewable-tablets-160878 available $19.59. CVS prodid-345599 $21.99 browser pass. UPC 305735567645 from Meijer image 0305735567645 and Vitacost printed UPC.`,
    ],
  },
  {
    id: 'caltrate-b212-soft-chews-chocolate-60',
    productName: 'Caltrate Soft Chews Chocolate Truffle (60 soft chews)',
    brand: 'Caltrate',
    category: VITAMINS,
    formulaId: 'caltrate-b212-soft-chews-chocolate',
    audience: ADULT,
    minAge: 13,
    form: 'soft chew',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '305735568192',
    activeIngredients: [
      { name: 'Calcium', strength: '600 mg' },
      { name: 'Vitamin D3', strength: '20 mcg (800 IU)' },
    ],
    inactiveIngredients: buildOi(PANEL_CALTRATE_SOFT_CHOC, SOFT_CHOC_FLAGS),
    verdict: verdictFromFlags(SOFT_CHOC_FLAGS),
    retailers: ['Meijer', 'Thrifty White'],
    sourcesGeneral: [
      `Haleon brand label PDF at ${PANEL_CALTRATE_SOFT_CHOC} (©2024) was read. Serving size 1 soft chew. Ages 13 and up. Actives ungraded. Ingredients: Calcium Carbonate, Corn Syrup, Sugar, Water, Hydrogenated Coconut Oil, Cocoa Processed with Alkali, Nonfat Dry Milk, Corn Syrup Solids, Glycerin. Contains <2%: Cholecalciferol (Vit. D3), Invert Sugar, Lecithin (Soy), Natural and Artificial Flavors, Propylene Glycol, Salt. Contains Milk, Soy. Meijer 30573556819 60 Soft Chews inStock $7.89. Thrifty White 60 ct InStock (19) $8.66. UPC 305735568192 from brand label and Meijer image.`,
    ],
  },
  {
    id: 'caltrate-b212-plus-minerals-120',
    productName: 'Caltrate 600+D3 Plus Minerals (120 tablets)',
    brand: 'Caltrate',
    category: VITAMINS,
    formulaId: 'caltrate-b212-plus-minerals',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '305735556236',
    activeIngredients: [...PM_TABLET_ACTIVES],
    inactiveIngredients: buildOi(PANEL_CALTRATE_PM_TABLET, PM_TABLET_FLAGS),
    verdict: verdictFromFlags(PM_TABLET_FLAGS),
    retailers: ['Target', 'Thrifty White'],
    sourcesGeneral: [
      `Haleon brand label at ${PANEL_CALTRATE_PM_TABLET} (©2023, 120 TABLETS) was read. Serving size 1 tablet. Actives ungraded. Ingredients: Calcium Carbonate, Magnesium Oxide, Maltodextrin. Contains <2%: Blue 2 Lake, Cholecalciferol (Vit. D3), Copper Sulfate, Croscarmellose Sodium, Magnesium Stearate, Manganese Sulfate, Polyethylene Glycol, Polyvinyl Alcohol, Red 40 Lake, Talc, Titanium Dioxide, Tocopherols (to preserve freshness), Yellow 6 Lake, Zinc Oxide. Target opened https://www.target.com/p/caltrate-bone-health-600-d3-plus-minerals-tablet-120-count/-/A-1006235164 $24.91 Add to cart Oct 17, 2026. Thrifty White 120 ct InStock (4) $15.55. UPC 305735556236 brand label 3 0573 5556 23 6; Walmart JSON agrees.`,
    ],
  },
  {
    id: 'caltrate-b212-plus-minerals-60',
    productName: 'Caltrate 600+D3 Plus Minerals (60 tablets)',
    brand: 'Caltrate',
    category: VITAMINS,
    formulaId: 'caltrate-b212-plus-minerals',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [...PM_TABLET_ACTIVES],
    inactiveIngredients: buildOi(PANEL_CALTRATE_PM_TABLET, PM_TABLET_FLAGS),
    verdict: verdictFromFlags(PM_TABLET_FLAGS),
    retailers: ['Target', 'Thrifty White'],
    sourcesGeneral: [
      `Same formula and OI as the 120-count brand label at ${PANEL_CALTRATE_PM_TABLET}; 60 ct uses the same panel per Thrifty White and Target titles. Target opened https://www.target.com/p/caltrate-bone-health-600-d3-plus-minerals-60-ct/-/A-1006235173 $16.49 Add to cart. Thrifty White 60 ct InStock (28) $8.66. No barcode attached: 305735556199 seen only on Thrifty White gtin12; Kroger and CVS image probes for 0030573555619 returned 404.`,
    ],
  },
  {
    id: 'move-free-b212-ultra-triple-action-30',
    productName: 'Move Free Ultra Triple Action (30 coated tablets)',
    brand: 'Move Free',
    category: VITAMINS,
    formulaId: 'move-free-b212-ultra-triple-action',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '020525118417',
    activeIngredients: [
      {
        name: 'Proprietary Cartilage Blend',
        strength: '40 mg (cartilage and potassium chloride, undenatured type II collagen)',
      },
      { name: 'Boron', strength: '5 mg (as boron glycinate)' },
      { name: 'Hyaluronic acid', strength: '3.3 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_MF_UTA, MF_UTA_FLAGS),
    verdict: verdictFromFlags(MF_UTA_FLAGS),
    retailers: ['Meijer', 'Thrifty White', 'Vitacost', 'Walgreens'],
    sourcesGeneral: [
      `Schiff brand supplement-facts image at ${PANEL_MF_UTA} (uta_sf2) was read. Serving size 1 tablet. Actives ungraded. Other ingredients: microcrystalline cellulose, hydroxypropyl cellulose, croscarmellose sodium, silicon dioxide, coating (hydroxypropyl methylcellulose, modified corn starch, mica [color], polyethylene glycol, titanium dioxide, magnesium silicate, glycerin), magnesium stearate. Meijer 2052511841 30 Coated Tablets inStock $20.99. Thrifty White 30 ct InStock (8) $24.63. Vitacost available $30.36. UPC 020525118417 brand 30CT barcode; Meijer and Vitacost agree.`,
    ],
  },
  {
    id: 'move-free-b212-ultra-triple-action-64',
    productName: 'Move Free Ultra Triple Action (64 coated tablets)',
    brand: 'Move Free',
    category: VITAMINS,
    formulaId: 'move-free-b212-ultra-triple-action',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '020525912787',
    activeIngredients: [
      {
        name: 'Proprietary Cartilage Blend',
        strength: '40 mg (cartilage and potassium chloride, undenatured type II collagen)',
      },
      { name: 'Boron', strength: '5 mg (as boron glycinate)' },
      { name: 'Hyaluronic acid', strength: '3.3 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_MF_UTA, MF_UTA_FLAGS),
    verdict: verdictFromFlags(MF_UTA_FLAGS),
    retailers: ['Meijer', 'Vitacost', 'CVS'],
    sourcesGeneral: [
      `Same OI as 30 ct; Kroger back image 0002052591278 matches Meijer and Vitacost. Meijer 2052591278 64 Coated Tablets inStock $34.99. Vitacost opened https://www.vitacost.com/products/schiff-move-free-joint-health-ultra-triple-action-64-coated-tablets-122298 available $48.44. CVS Triple Action Value Pack 64 ct $39.19 browser. UPC 020525912787 Vitacost, Meijer 0020525912787, Kroger 0002052591278.`,
    ],
  },
  {
    id: 'move-free-b212-advanced-tamaflex-90',
    productName: 'Move Free Advanced with TamaFlex, Glucosamine + Vitamin D3 (90 coated tablets)',
    brand: 'Move Free',
    category: VITAMINS,
    formulaId: 'move-free-b212-advanced-tamaflex-90',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '020525996299',
    activeIngredients: [
      { name: 'Vitamin D3', strength: '20 mcg (as cholecalciferol)' },
      { name: 'Glucosamine sulfate', strength: '1500 mg' },
      { name: 'Chondroitin sulfate', strength: '200 mg' },
      {
        name: 'Proprietary TamaFlex Blend',
        strength: '250 mg (tamarind seed extract, turmeric rhizome extract)',
      },
      { name: 'MSM', strength: '750 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_MF_TAMA, MF_TAMA_FLAGS),
    verdict: verdictFromFlags(MF_TAMA_FLAGS),
    retailers: ['Meijer', 'Walmart', 'CVS', 'Target'],
    sourcesGeneral: [
      `Schiff TamaFlex supplement-facts image at ${PANEL_MF_TAMA} was read. Serving size 3 tablets, 30 servings. Vitamin D3 20 mcg with IU not printed on panel. Actives ungraded. Other ingredients: hydroxypropyl cellulose, microcrystalline cellulose, coating (hydroxypropyl methylcellulose, glycerin, riboflavin, modified corn starch, polyethylene glycol, magnesium silicate), magnesium stearate. Contains crustacean shellfish (shrimp and crab). Meijer 2052599629 90 Coated Tablets inStock $20.99. Walmart first-party https://www.walmart.com/ip/13570952278 $20.75 Add to cart sold by Walmart.com. UPC 020525996299 brand 90CT; Walmart and Target agree.`,
    ],
  },
  {
    id: 'move-free-b212-advanced-plus-msm-d3-80',
    productName: 'Move Free Advanced Plus MSM + Vitamin D3 (80 coated tablets)',
    brand: 'Move Free',
    category: VITAMINS,
    formulaId: 'move-free-b212-advanced-plus-msm-d3-80',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '020525118356',
    activeIngredients: [
      { name: 'Vitamin D3', strength: '50 mcg (2000 IU, as cholecalciferol)' },
      { name: 'Glucosamine hydrochloride', strength: '1500 mg' },
      { name: 'Chondroitin sulfate', strength: '200 mg' },
      { name: 'Hyaluronic acid', strength: '3.3 mg' },
      { name: 'Calcium fructoborate', strength: '216 mg' },
      { name: 'MSM', strength: '750 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_MF_ADV_MSM80, MF_ADV_MSM80_FLAGS),
    verdict: verdictFromFlags(MF_ADV_MSM80_FLAGS),
    retailers: ['Walmart', 'Meijer', 'Vitacost'],
    sourcesGeneral: [
      `Walmart first-party back-panel image at ${PANEL_MF_ADV_MSM80} image 3 was read (retailer image, not brand-printed OI). Serving size 2 tablets, 40 servings. Actives ungraded. Other ingredients: microcrystalline cellulose, coating (hydroxypropyl methylcellulose, modified corn starch, titanium dioxide, polyethylene glycol, magnesium silicate, glycerin), magnesium stearate. Contains shellfish (shrimp, crab, lobster, and crayfish). Walmart 10451740 $21.96 Add to cart Low stock. Meijer 2052511835 80 Coated Tablets inStock $20.99. Vitacost available $29.48. UPC 020525118356 Meijer 0020525118356 and Vitacost 80 ct.`,
    ],
  },
  {
    id: 'citracal-b212-maximum-plus-120',
    productName: 'Citracal Maximum Plus (120 coated caplets)',
    brand: 'Citracal',
    category: VITAMINS,
    formulaId: 'citracal-b212-maximum-plus',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '016500535058',
    activeIngredients: [
      { name: 'Calcium', strength: '650 mg' },
      { name: 'Vitamin D', strength: '25 mcg (1,000 IU)' },
      { name: 'Zinc', strength: '5.5 mg' },
      { name: 'Copper', strength: '0.45 mg' },
      { name: 'Manganese', strength: '1.15 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_CITRACAL_MAX, CITRACAL_PEG_FLAGS),
    verdict: verdictFromFlags(CITRACAL_PEG_FLAGS),
    retailers: ['Meijer', 'Thrifty White', 'Vitacost', 'Walmart'],
    sourcesGeneral: [
      `Bayer brand label at ${PANEL_CITRACAL_MAX} (10/10/2024) was read as the current formula. Serving size 2 caplets. Actives ungraded. Ingredients: Calcium Citrate, Polyethylene Glycol, Croscarmellose Sodium; Less than 2% of: Copper Sulfate, Gelatin, Hydroxypropyl Methylcellulose, Inulin, Magnesium Stearate, Manganese Sulfate, Vitamin D3 (Cholecalciferol), Zinc Oxide. Meijer 1650053505 120 Coated Caplets inStock $13.99. Thrifty White 120 ct InStock (9) $11.07. Vitacost available $13.01. Walmart 13448582 $14.99 browser. UPC 016500535058 Meijer id and Vitacost. Important: Meijer and Vitacost 120-count pages still show an older formula on shelf (magnesium silicate, polyvinylpyrrolidone, propylene glycol dicaprylate/dicaprate, titanium dioxide; Vitacost also lists talc and older mineral salts). The brand label and Vitacost 180-count page match the current OI graded here; a shopper bottle may still be the older avoid-grade formula.`,
    ],
  },
  {
    id: 'citracal-b212-maximum-plus-180',
    productName: 'Citracal Maximum Plus (180 coated caplets)',
    brand: 'Citracal',
    category: VITAMINS,
    formulaId: 'citracal-b212-maximum-plus',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '016500535362',
    activeIngredients: [
      { name: 'Calcium', strength: '650 mg' },
      { name: 'Vitamin D', strength: '25 mcg (1,000 IU)' },
      { name: 'Zinc', strength: '5.5 mg' },
      { name: 'Copper', strength: '0.45 mg' },
      { name: 'Manganese', strength: '1.15 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_CITRACAL_MAX, CITRACAL_PEG_FLAGS),
    verdict: verdictFromFlags(CITRACAL_PEG_FLAGS),
    retailers: ['Meijer', 'Vitacost', 'Walgreens'],
    sourcesGeneral: [
      `Same current OI as brand label at ${PANEL_CITRACAL_MAX}. Vitacost 180 page prints current ingredients and panel (Calories 10, Ca 650 mg, D 25 mcg (1,000 IU), Zn 5.5, Cu 0.45, Mn 1.15, Na 5 mg). Meijer 1650053536 180 Coated Caplets inStock $15.49. Vitacost https://www.vitacost.com/products/citracal-maximum-plus-d3-180-coated-caplets-31720 available $16.63. Walgreens 180 ea $19.99 browser. UPC 016500535362 Meijer and Vitacost.`,
    ],
  },
  {
    id: 'citracal-b212-petites-200',
    productName: 'Citracal Petites (200 coated caplets)',
    brand: 'Citracal',
    category: VITAMINS,
    formulaId: 'citracal-b212-petites',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '016500535034',
    activeIngredients: [
      { name: 'Calcium', strength: '400 mg' },
      { name: 'Vitamin D', strength: '12.5 mcg (500 IU)' },
    ],
    inactiveIngredients: buildOi(PANEL_CITRACAL_PETITES, CITRACAL_PEG_FLAGS),
    verdict: verdictFromFlags(CITRACAL_PEG_FLAGS),
    retailers: ['Walmart', 'Meijer', 'Thrifty White', 'Target', 'Vitacost'],
    sourcesGeneral: [
      `Bayer brand label at ${PANEL_CITRACAL_PETITES} (12/11/2024) was read. Serving size 2 caplets, 100 servings. Actives ungraded. Ingredients: Calcium Citrate, Polyethylene Glycol, Croscarmellose Sodium; Less than 2% of: Gelatin, Hydroxypropyl Methylcellulose, Inulin, Magnesium Stearate, Vitamin D3 (Cholecalciferol). Walmart first-party https://www.walmart.com/ip/13448581 $11.47 Add to cart Low stock image matches. Meijer 1650053503 200 Coated Caplets inStock $13.99. Thrifty White InStock (37) $11.07. Target A-11201257 $10.99. UPC 016500535034 Walmart, Meijer, Vitacost.`,
    ],
  },
  {
    id: 'citracal-b212-slow-release-1200-80',
    productName: 'Citracal Slow Release 1200 (80 coated caplets)',
    brand: 'Citracal',
    category: VITAMINS,
    formulaId: 'citracal-b212-slow-release-1200',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '016500540991',
    activeIngredients: [
      { name: 'Calcium', strength: '1200 mg' },
      { name: 'Vitamin D', strength: '25 mcg (1000 IU)' },
      { name: 'Magnesium', strength: '80 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_CITRACAL_SR, CITRACAL_SR_FLAGS),
    verdict: verdictFromFlags(CITRACAL_SR_FLAGS),
    retailers: ['Walmart', 'Meijer', 'Thrifty White', 'Vitacost'],
    sourcesGeneral: [
      `Bayer brand label at ${PANEL_CITRACAL_SR} (04/02/2025) was read. Serving size 2 caplets, 40 servings. Actives ungraded. Ingredients: Calcium Carbonate, Calcium Citrate, Magnesium Oxide, Hydroxypropyl Methylcellulose, Maltodextrin, Croscarmellose Sodium; Less than 2% of: Color (Calcium Carbonate), Gelatin, Magnesium Stearate, Vitamin D3 (Cholecalciferol). Walmart first-party https://www.walmart.com/ip/16816387 $10.92 Add to cart image confirms current formula. Meijer 1650054099 80 Coated Caplets inStock $11.49. Thrifty White InStock (34) $11.07. Vitacost $14.28. UPC 016500540991 Walmart, Meijer, Vitacost. Meijer and Vitacost text still list older SR formula; Walmart image shows current OI.`,
    ],
  },
];

const ROWS = BATCH212_KYR6C_CAL_MF_CIT_T107U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 13) throw new Error(`batch212 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch212 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch212 upc ${record.id}`);
  if (record.honestNote && !HONEST_NOTE_IDS.has(record.id)) {
    throw new Error(`batch212 unexpected note ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch212 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch212 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch212 verdict ${record.id}`);
}
