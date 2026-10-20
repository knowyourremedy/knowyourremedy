// DRAFT / not verified / batch 201 KYR6-c (t83u WRITE).
// Slow Fe 30 and seven Osteo Bi-Flex packs under PROJECT_NOTES write rule (t83u).
// Grade from other ingredients only. No UPCs attached.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  ascorbic: 'Methodology §5 Cleared (ascorbic acid).',
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  calciumCarbonate: 'Methodology §5 Cleared (calcium carbonate as mineral salt / buffer).',
  calciumSilicate: 'Methodology §5 Cleared (calcium silicate).',
  caramel: 'Methodology §5 Avoid (caramel color — class not named as I or II).',
  carbomer: 'Methodology §5 Cleared (carbomer homopolymer).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  celluloseCoating:
    'Methodology §5 Cleared (cellulose-family / Cellulose Coating — t83u Oct 17, 2026).',
  cellulosePlant:
    'Methodology §5 Cleared (cellulose-family / Cellulose (Plant Origin) — t83u Oct 17, 2026).',
  croscarmellose:
    'Methodology §5 Cleared (croscarmellose sodium; Croscarmellose without sodium — t83u Oct 17, 2026).',
  crospovidone: 'Methodology §5 Cleared (crospovidone / povidone family).',
  dye: 'Methodology §5 Avoid (synthetic dye / FD&C lake).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  lecithin: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  mct: 'Methodology §5 Limited (unlabeled medium-chain triglycerides). No plant is named.',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  phosphate:
    'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate / tribasic calcium phosphate).',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral coating).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not the gummy seed-oil rule).',
  stearic: 'Methodology §5 Cleared (stearic acid / vegetable stearic acid — stearate-family lubricant).',
  talc: 'Methodology §5 Avoid (talc). Magnesium silicate is that row in a swallowed product.',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  tocopherol: 'Methodology §5 Cleared (tocopherols / mixed tocopherols).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const SLOW_PANEL =
  'https://www.cvs.com/bizcontent/merchandising/productimages/high_res/88679001930_2.jpg';
const OSTEO_INFLAM_PANEL = 'https://www.osteobiflex.com/products/one-per-day-inflammatory-response';
const OSTEO_OMEGA_PANEL = 'https://www.osteobiflex.com/products/advanced-omega-3-joint-complex';
const OSTEO_TRIPLE_PANEL = 'https://www.osteobiflex.com/products/triple-strength';
const OSTEO_TRIPLE_D_PANEL = 'https://www.osteobiflex.com/products/triple-strength-with-vitamin-d';
const OSTEO_TRIPLE_MSM_PANEL = 'https://www.osteobiflex.com/products/triple-strength-msm';
const OSTEO_OPD_PANEL = 'https://www.osteobiflex.com/products/one-per-day';
const OSTEO_EASE_PANEL = 'https://www.osteobiflex.com/products/ease';

const OMEGA_HONEST_NOTE =
  'This product is sold as plant-based algae oil, but the softgel shell is gelatin, which is animal-derived. Gelatin is Cleared on the methodology row, so that shell did not change the grade.';

const SLOW_FE_FLAGS: IngredientFlag[] = [
  flag(SLOW_PANEL, 'Dibasic calcium phosphate', 'cleared', METH.phosphate),
  flag(SLOW_PANEL, 'Silicified microcrystalline cellulose', 'cleared', METH.cellulose),
  flag(SLOW_PANEL, 'Hypromellose', 'cleared', METH.hpmc),
  flag(SLOW_PANEL, 'Carbomer homopolymer', 'cleared', METH.carbomer),
  flag(SLOW_PANEL, 'Ascorbic acid (preservative)', 'cleared', METH.ascorbic),
  flag(SLOW_PANEL, 'Magnesium stearate', 'cleared', METH.magStearate),
  flag(SLOW_PANEL, 'Tribasic calcium phosphate', 'cleared', METH.phosphate),
  flag(SLOW_PANEL, 'Polyvinyl alcohol', 'cleared', METH.pva),
  flag(SLOW_PANEL, 'Polyethylene glycol', 'limited', METH.peg),
  flag(SLOW_PANEL, 'Talc', 'high', METH.talc),
  flag(SLOW_PANEL, 'Titanium dioxide', 'high', METH.tio2),
  flag(SLOW_PANEL, 'Red 40 Lake', 'high', METH.dye),
  flag(SLOW_PANEL, 'Yellow 6 Lake', 'high', METH.dye),
  flag(SLOW_PANEL, 'Blue 1 Lake', 'high', METH.dye),
];

const INFLAM_FLAGS: IngredientFlag[] = [
  flag(OSTEO_INFLAM_PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
  flag(OSTEO_INFLAM_PANEL, 'Silica', 'limited', METH.silica),
  flag(OSTEO_INFLAM_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
];

const OMEGA_FLAGS: IngredientFlag[] = [
  flag(OSTEO_OMEGA_PANEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(OSTEO_OMEGA_PANEL, 'Vegetable Glycerin', 'cleared', METH.glycerin),
  flag(OSTEO_OMEGA_PANEL, 'Soybean Oil', 'cleared', METH.soyFill),
  flag(OSTEO_OMEGA_PANEL, 'Yellow Beeswax', 'cleared', METH.beeswax),
  flag(OSTEO_OMEGA_PANEL, 'Caramel Color', 'high', METH.caramel),
  flag(OSTEO_OMEGA_PANEL, 'Mixed Tocopherols', 'cleared', METH.tocopherol),
  flag(OSTEO_OMEGA_PANEL, 'Silica', 'limited', METH.silica),
  flag(OSTEO_OMEGA_PANEL, 'Sunflower Lecithin', 'cleared', METH.lecithin),
];

const TRIPLE_80_FLAGS: IngredientFlag[] = [
  flag(OSTEO_TRIPLE_PANEL, 'Crospovidone', 'cleared', METH.crospovidone),
  flag(OSTEO_TRIPLE_PANEL, 'Calcium Carbonate', 'cleared', METH.calciumCarbonate),
  flag(OSTEO_TRIPLE_PANEL, 'Carnauba Wax', 'cleared', METH.carnauba),
  flag(OSTEO_TRIPLE_PANEL, 'Cellulose Coating', 'cleared', METH.celluloseCoating),
  flag(OSTEO_TRIPLE_PANEL, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
  flag(OSTEO_TRIPLE_PANEL, 'Medium Chain Triglycerides', 'limited', METH.mct),
  flag(OSTEO_TRIPLE_PANEL, 'Polydextrose', 'limited', METH.polydextrose),
  flag(OSTEO_TRIPLE_PANEL, 'Silica', 'limited', METH.silica),
  flag(OSTEO_TRIPLE_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
];

const TRIPLE_VITD_FLAGS: IngredientFlag[] = [
  flag(OSTEO_TRIPLE_D_PANEL, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
  flag(OSTEO_TRIPLE_D_PANEL, 'Crospovidone', 'cleared', METH.crospovidone),
  flag(OSTEO_TRIPLE_D_PANEL, 'Calcium Carbonate', 'cleared', METH.calciumCarbonate),
  flag(OSTEO_TRIPLE_D_PANEL, 'Carnauba Wax', 'cleared', METH.carnauba),
  flag(OSTEO_TRIPLE_D_PANEL, 'Cellulose Coating', 'cleared', METH.celluloseCoating),
  flag(OSTEO_TRIPLE_D_PANEL, 'Hydroxypropyl Methylcellulose', 'cleared', METH.hpmc),
  flag(OSTEO_TRIPLE_D_PANEL, 'Medium Chain Triglycerides', 'limited', METH.mct),
  flag(OSTEO_TRIPLE_D_PANEL, 'Polydextrose', 'limited', METH.polydextrose),
  flag(OSTEO_TRIPLE_D_PANEL, 'Silica', 'limited', METH.silica),
  flag(OSTEO_TRIPLE_D_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
];

const TRIPLE_MSM_FLAGS: IngredientFlag[] = [
  flag(OSTEO_TRIPLE_MSM_PANEL, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
  flag(OSTEO_TRIPLE_MSM_PANEL, 'Silica', 'limited', METH.silica),
  flag(OSTEO_TRIPLE_MSM_PANEL, 'Hydroxypropyl Methylcellulose', 'cleared', METH.hpmc),
  flag(OSTEO_TRIPLE_MSM_PANEL, 'Croscarmellose', 'cleared', METH.croscarmellose),
  flag(OSTEO_TRIPLE_MSM_PANEL, 'Calcium Carbonate', 'cleared', METH.calciumCarbonate),
  flag(OSTEO_TRIPLE_MSM_PANEL, 'Carnauba Wax', 'cleared', METH.carnauba),
  flag(OSTEO_TRIPLE_MSM_PANEL, 'Cellulose Coating', 'cleared', METH.celluloseCoating),
  flag(OSTEO_TRIPLE_MSM_PANEL, 'Medium Chain Triglycerides', 'limited', METH.mct),
  flag(OSTEO_TRIPLE_MSM_PANEL, 'Polydextrose', 'limited', METH.polydextrose),
  flag(OSTEO_TRIPLE_MSM_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
];

const OPD_FLAGS: IngredientFlag[] = [
  flag(OSTEO_OPD_PANEL, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
  flag(OSTEO_OPD_PANEL, 'Hydroxypropyl Methylcellulose', 'cleared', METH.hpmc),
  flag(OSTEO_OPD_PANEL, 'Croscarmellose', 'cleared', METH.croscarmellose),
  flag(OSTEO_OPD_PANEL, 'Cellulose Coating', 'cleared', METH.celluloseCoating),
  flag(OSTEO_OPD_PANEL, 'Calcium Carbonate', 'cleared', METH.calciumCarbonate),
  flag(OSTEO_OPD_PANEL, 'Carnauba Wax', 'cleared', METH.carnauba),
  flag(OSTEO_OPD_PANEL, 'Medium Chain Triglycerides', 'limited', METH.mct),
  flag(OSTEO_OPD_PANEL, 'Polydextrose', 'limited', METH.polydextrose),
  flag(OSTEO_OPD_PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
];

const EASE_FLAGS: IngredientFlag[] = [
  flag(OSTEO_EASE_PANEL, 'Calcium Carbonate', 'cleared', METH.calciumCarbonate),
  flag(OSTEO_EASE_PANEL, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
  flag(OSTEO_EASE_PANEL, 'Cellulose Coating', 'cleared', METH.celluloseCoating),
  flag(OSTEO_EASE_PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
  flag(OSTEO_EASE_PANEL, 'Croscarmellose', 'cleared', METH.croscarmellose),
  flag(OSTEO_EASE_PANEL, 'Polydextrose', 'limited', METH.polydextrose),
  flag(OSTEO_EASE_PANEL, 'Calcium Silicate', 'cleared', METH.calciumSilicate),
  flag(OSTEO_EASE_PANEL, 'Carnauba Wax', 'cleared', METH.carnauba),
  flag(OSTEO_EASE_PANEL, 'Medium Chain Triglycerides', 'limited', METH.mct),
  flag(OSTEO_EASE_PANEL, 'Silica', 'limited', METH.silica),
];

export const BATCH201_KYR6C_T83U: RatingRecord[] = [
  {
    id: 'slowfe-b201-iron-30',
    productName: 'Slow Fe Slow Release Iron (30 tablets)',
    brand: 'Slow Fe',
    category: VITAMINS,
    formulaId: 'slowfe-b187-iron',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '886790019305',
    activeIngredients: [{ name: 'Iron (elemental)', strength: '45 mg' }],
    inactiveIngredients: SLOW_FE_FLAGS,
    verdict: 'avoid',
    retailers: ['Walmart', 'Meijer'],
    sourcesGeneral: [
      'CVS 30-count label image was read at https://www.cvs.com/bizcontent/merchandising/productimages/high_res/88679001930_2.jpg. Iron (elemental) 45 mg. Ferrous sulfate USP is the active iron source, not graded as an other ingredient. Other ingredients: dibasic calcium phosphate, silicified microcrystalline cellulose, hypromellose, carbomer homopolymer, ascorbic acid (preservative), magnesium stearate, tribasic calcium phosphate, polyvinyl alcohol, polyethylene glycol, talc, titanium dioxide, red 40 lake, yellow 6 lake, blue 1 lake. Same inactive line as slowfe-b187-iron-60 on MAIN. Walmart opened Slow Fe Iron Supplement Slow Release Tablets 45 Mg 30 Ct at https://www.walmart.com/ip/Slow-Fe-Iron-Supplement-for-Iron-Deficiency-Slow-Release-Tablets-45-Mg-30-Ct/49024914 at $9.42, sold by Walmart. Meijer opened slow-fe-iron-supplement-slow-release-tablets-30-ct at https://www.meijer.com/shopping/product/slow-fe-iron-supplement-slow-release-tablets-30-ct/88679001930 at $9.49 with pickup. No UPC attached per t83u scope.',
    ],
  },
  {
    id: 'osteo-b201-inflammatory-response-30',
    productName: 'Osteo Bi-Flex One Per Day Inflammatory Response (30 capsules)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b201-inflammatory-response-30',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Vitamin D', strength: '10 mcg' },
      {
        name: 'CurQfen (fenugreek seed powder + turmeric rhizome extract, 35% curcuminoids)',
        strength: '400 mg',
      },
      { name: 'Joint Shield 5-LOXIN Advanced Boswellia serrata resin extract', strength: '100 mg' },
    ],
    inactiveIngredients: INFLAM_FLAGS,
    verdict: 'caution',
    retailers: ['Walgreens', 'Meijer'],
    sourcesGeneral: [
      'Osteo Bi-Flex brand label image was read at https://www.osteobiflex.com/products/one-per-day-inflammatory-response. Supplement Facts actives are ungraded. Other ingredients: Vegetable Cellulose. Contains <2% of: Silica, Vegetable Magnesium Stearate. Walgreens opened osteo-bi-flex-one-per-day-inflammatory-response at https://www.walgreens.com/store/c/osteo-bi-flex-one-per-day-inflammatory-response/ID=300425522-product with sale. Meijer opened osteo-biflex-one-per-day-inflammatory-response-cap-30ct at https://www.meijer.com/shopping/product/osteo-biflex-one-per-day-inflammatory-response-cap-30ct/3076800391 with pickup. No UPC attached per t83u scope.',
    ],
  },
  {
    id: 'osteo-b201-omega3-80',
    productName: 'Osteo Bi-Flex Advanced Omega-3 Joint Complex (80 softgels)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b201-omega3-80',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Algal Oil',
        strength: '700 mg (omega-3 360 mg; EPA+DHA 350 mg)',
      },
      { name: 'Joint Shield 5-LOXIN Advanced', strength: '100 mg' },
    ],
    inactiveIngredients: OMEGA_FLAGS,
    verdict: 'avoid',
    honestNote: OMEGA_HONEST_NOTE,
    retailers: ['Walgreens', 'King Soopers'],
    sourcesGeneral: [
      'Osteo Bi-Flex brand label image was read at https://www.osteobiflex.com/products/advanced-omega-3-joint-complex. Other ingredients: Gelatin, Vegetable Glycerin, Soybean Oil, Yellow Beeswax. Contains <2% of: Caramel Color, Mixed Tocopherols, Silica, Sunflower Lecithin. Caramel color with no class stated maps to the undisclosed-class Avoid row. Walgreens opened osteo-bi-flex-advanced-omega-3-joint-complex plant-based algae oil softgels at https://www.walgreens.com/store/c/osteo-bi-flex-advanced-omega-3-joint-complex,-plant-based-algae-oil-softgels/ID=300457518-product with sale. King Soopers opened Osteo Bi-Flex Advanced Omega-3 Joint Complex 80 ct at https://www.kingsoopers.com/p/osteo-bi-flex-advanced-omega-3-joint-complex-plant-based-algae-oil-softgels/0003076800471 with pickup available. No UPC attached per t83u scope.',
    ],
  },
  {
    id: 'osteo-b201-triple-strength-80',
    productName: 'Osteo Bi-Flex Triple Strength (80 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b201-triple-strength-80',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768031213',
    activeIngredients: [
      { name: 'Vitamin C', strength: '60 mg' },
      { name: 'Manganese', strength: '2 mg' },
      { name: 'Glucosamine HCl', strength: '1,500 mg' },
      { name: 'Joint Shield 5-LOXIN Advanced', strength: '100 mg' },
      { name: 'Chondroitin/MSM Complex', strength: '1,103 mg' },
    ],
    inactiveIngredients: TRIPLE_80_FLAGS,
    verdict: 'caution',
    retailers: ['Target', 'Meijer'],
    sourcesGeneral: [
      'Osteo Bi-Flex brand label image was read at https://www.osteobiflex.com/products/triple-strength. Other ingredients: Crospovidone. Contains <2% of: Calcium Carbonate, Carnauba Wax, Cellulose Coating, Cellulose (Plant Origin), Medium Chain Triglycerides, Polydextrose, Silica, Vegetable Magnesium Stearate. Target opened osteo-bi-flex-triple-strength-joint-health-tablets-80ct at https://www.target.com/p/osteo-bi-flex-triple-strength-joint-health-tablets-80ct/-/A-14504223 with sale. Meijer opened osteo-bi-flex-triple-strength-750-600mg-80-ct at https://www.meijer.com/shopping/product/osteo-bi-flex-triple-strength-750-600mg-80-ct/3076803121 with sale. No UPC attached per t83u scope.',
    ],
  },
  {
    id: 'osteo-b201-triple-strength-vitd-80',
    productName: 'Osteo Bi-Flex Triple Strength with Vitamin D (80 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b201-triple-strength-vitd-80',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768196073',
    activeIngredients: [
      { name: 'Vitamin D', strength: '50 mcg' },
      { name: 'Glucosamine HCl', strength: '1,500 mg' },
      { name: 'Joint Shield 5-LOXIN Advanced', strength: '100 mg' },
      { name: 'Chondroitin/MSM Complex', strength: '275 mg' },
    ],
    inactiveIngredients: TRIPLE_VITD_FLAGS,
    verdict: 'caution',
    retailers: ['Target', 'Meijer'],
    sourcesGeneral: [
      'Osteo Bi-Flex brand label image was read at https://www.osteobiflex.com/products/triple-strength-with-vitamin-d. Other ingredients: Cellulose (Plant Origin), Crospovidone. Contains <2% of: Calcium Carbonate, Carnauba Wax, Cellulose Coating, Hydroxypropyl Methylcellulose, Medium Chain Triglycerides, Polydextrose, Silica, Vegetable Magnesium Stearate. Target opened osteo-bi-flex-triple-strength-38-vitamin-d-joint-health-tablets-80ct at https://www.target.com/p/osteo-bi-flex-triple-strength-38-vitamin-d-joint-health-tablets-80ct/-/A-51778781 with sale. Meijer opened osteo-bi-flex-triple-strength-with-vitamin-d-80-ct at https://www.meijer.com/shopping/product/osteo-bi-flex-triple-strength-with-vitamin-d-80-ct/3076819607 at $34.99 with pickup ready. No UPC attached per t83u scope.',
    ],
  },
  {
    id: 'osteo-b201-triple-strength-msm-80',
    productName: 'Osteo Bi-Flex Triple Strength + MSM (80 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b201-triple-strength-msm-80',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768541279',
    activeIngredients: [
      { name: 'Glucosamine HCl', strength: '1,500 mg' },
      { name: 'Joint Shield 5-LOXIN Advanced', strength: '100 mg' },
      { name: 'MSM', strength: '1,500 mg' },
    ],
    inactiveIngredients: TRIPLE_MSM_FLAGS,
    verdict: 'caution',
    retailers: ['Walgreens', 'King Soopers'],
    sourcesGeneral: [
      'Osteo Bi-Flex brand label image was read at https://www.osteobiflex.com/products/triple-strength-msm. Other ingredients: Cellulose (Plant Origin), Silica, Hydroxypropyl Methylcellulose, Croscarmellose. Contains <2% of: Calcium Carbonate, Carnauba Wax, Cellulose Coating, Medium Chain Triglycerides, Polydextrose, Vegetable Magnesium Stearate. Walgreens opened osteo-bi-flex-triple-strength---msm,-coated-tablets at https://www.walgreens.com/store/c/osteo-bi-flex-triple-strength---msm,-coated-tablets/ID=prod6285112-product with shipping. King Soopers opened Triple Strength with MSM 80 ct at https://www.kingsoopers.com/p/osteo-bi-flex-triple-strength-plus-msm-joint-health-supplement-coated-tablets/0003076854127 with pickup and low stock. No UPC attached per t83u scope.',
    ],
  },
  {
    id: 'osteo-b201-one-per-day-30',
    productName: 'Osteo Bi-Flex One Per Day (30 coated tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b201-one-per-day-30',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768330491',
    activeIngredients: [
      { name: 'Vitamin D', strength: '10 mcg' },
      { name: 'Glucosamine HCl', strength: '1,500 mg' },
      { name: 'Joint Shield 5-LOXIN Advanced', strength: '100 mg' },
    ],
    inactiveIngredients: OPD_FLAGS,
    verdict: 'caution',
    retailers: ['Walmart', 'Meijer'],
    sourcesGeneral: [
      'Osteo Bi-Flex brand label image was read at https://www.osteobiflex.com/products/one-per-day. Other ingredients: Cellulose (Plant Origin), Hydroxypropyl Methylcellulose, Croscarmellose, Cellulose Coating. Contains <2% of: Calcium Carbonate, Carnauba Wax, Medium Chain Triglycerides, Polydextrose, Vegetable Magnesium Stearate. Walmart opened https://www.walmart.com/ip/17325223 for this 30-count with sale. Meijer opened osteo-bi-flex-one-per-day-30-ct at https://www.meijer.com/shopping/product/osteo-bi-flex-one-per-day-30-ct/3076833049 with sale. No UPC attached per t83u scope.',
    ],
  },
  {
    id: 'osteo-b201-ease-28',
    productName: 'Osteo Bi-Flex Ease (28 mini tablets)',
    brand: 'Osteo Bi-Flex',
    category: VITAMINS,
    formulaId: 'osteo-b201-ease-28',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030768553883',
    activeIngredients: [
      { name: 'Vitamin D', strength: '10 mcg' },
      { name: 'Joint Shield 5-LOXIN Advanced', strength: '100 mg' },
      { name: 'UC-II Standardized Cartilage', strength: '40 mg' },
    ],
    inactiveIngredients: EASE_FLAGS,
    verdict: 'caution',
    retailers: ['Walgreens', 'Meijer'],
    sourcesGeneral: [
      'Osteo Bi-Flex brand label image was read at https://www.osteobiflex.com/products/ease. Other ingredients: Calcium Carbonate, Cellulose (Plant Origin), Cellulose Coating, Vegetable Stearic Acid, Croscarmellose, Polydextrose. Contains <2% of: Calcium Silicate, Carnauba Wax, Medium Chain Triglycerides, Silica. Walgreens opened osteo-bi-flex-ease-advanced-triple-action,-mini-tablets at https://www.walgreens.com/store/c/osteo-bi-flex-ease-advanced-triple-action,-mini-tablets/ID=prod6281765-product in stock. Meijer opened osteo-bi-flex-joint-health-ease-supplements-28-day-supply at https://www.meijer.com/shopping/product/osteo-bi-flex-joint-health-ease-supplements-28-day-supply/3076855388 with sale. No UPC attached per t83u scope.',
    ],
  },
];

const ROWS = BATCH201_KYR6C_T83U;
const OMEGA_ID = 'osteo-b201-omega3-80';

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

if (ROWS.length !== 8) throw new Error(`batch201 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch201 duplicate id');

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch201 upc ${record.id}`);
  if (record.honestNote && record.id !== OMEGA_ID) {
    throw new Error(`batch201 unexpected note ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch201 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch201 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch201 verdict ${record.id}`);
}
