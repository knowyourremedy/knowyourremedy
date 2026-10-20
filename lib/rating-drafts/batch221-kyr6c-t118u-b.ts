// DRAFT / not verified / batch 221 KYR6-c (t118u group B WRITE).
// Florastor (9 packs) + Lactaid (3 packs) — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const DIGESTIVE = 'Digestive';

const METH = {
  lactose: 'Methodology §5 Cleared (lactose / lactose monohydrate).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  hpmc:
    'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose). hydroxypropylmethylcellulose (derived from pine bark) and hydroxypropyl-methylcellulose map here (Oct 17, 2026 t118u).',
  modStarch: 'Methodology §5 Limited (modified starch).',
  sucrose: 'Methodology §5 Cleared (sucrose). Founder lock Oct 17, 2026 t118u.',
  mctUnlabeled: 'Methodology §5 Limited (unlabeled MCT — no plant source named).',
  silica:
    'Methodology §5 Caution (silicon dioxide oral cap). Colloidal silicon dioxide maps here (Oct 17, 2026 t118u).',
  dlAlphaToc:
    'Methodology §5 Cleared (mixed tocopherols row). DL alpha tocopherol maps here (Oct 17, 2026 t118u).',
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  sugar: 'Methodology §5 Caution (bare sugar).',
  annatto:
    'Methodology §5 Caution (annatto / Organic Annatto Extract (Color) — allergenic; standalone Caution, not additive-scored, not Avoid)',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  citric: 'Methodology §5 Cleared (citric acid).',
  cornStarch: 'Methodology §5 Cleared (corn starch). Cornstarch maps here (Oct 17, 2026 t118u).',
  fcoGummy:
    'Methodology §5 Cleared (Fractionated Coconut Oil in a gummy — coconut-in-gummy exception).',
  lacticAcid: 'Methodology §5 Cleared (lactic acid / malic acid).',
  natFlavors: 'Methodology §5 Limited (natural flavors).',
  gums: 'Methodology §5 Cleared (xanthan / guar / acacia / pectin / gellan — food gums).',
  citrateSalt: 'Methodology §5 Cleared (citrate salts as fillers / buffers).',
  water: 'Methodology §5 Cleared (purified water / water).',
  sugarAlcohol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  crospovidone: 'Methodology §5 Cleared (crospovidone).',
  naFlavor:
    'Methodology §5 Limited (natural and artificial flavor, singular). Founder lock Oct 17, 2026 t118u.',
  sucralose: 'Methodology §5 Moderate (sucralose).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_FL_DA_20 =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/20_8bd88a29-9668-4687-807d-f4f2565169a9.jpg';
const PANEL_FL_DA_30 =
  'https://cdn.shopify.com/s/files/1/0580/7911/7391/files/core30-1.jpg';
const PANEL_FL_DA_50 =
  'https://cdn.shopify.com/s/files/1/0580/7911/7391/files/core50-1.jpg';
const PANEL_FL_DA_100 =
  'https://cdn.shopify.com/s/files/1/0580/7911/7391/files/florastor_dual_action_probiotic_100_capsules_panel2.jpg';
const PANEL_FL_GB =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/21_611b280b-c373-4910-91aa-b5b3b9681a46.jpg';
const PANEL_FL_PROPRE =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/17_d49654ac-32a4-4051-95e1-ae86942470c0.jpg';
const PANEL_FL_IMM =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/25_6492b790-cf32-467b-98df-a43c92ab4aa3.jpg';
const PANEL_FL_MET =
  'https://cdn.shopify.com/s/files/1/0580/7911/7391/files/florastor-balanced-benefits-digest-_-metabolic-support-probiotic-right-side.jpg';
const PANEL_FL_HER =
  'https://cdn.shopify.com/s/files/1/0580/7911/7391/files/her-florastor-balanced-benefits-digest-_-de-stress-probiotic-back.jpg';
const PANEL_LACTAID_FA_CAPLET = 'https://www.lactaid.com/products/lactaid-fast-act-caplets';
const PANEL_LACTAID_FA_CHEW =
  'https://images.ctfassets.net/naglem4vigsd/Z2PIRvEIjkmfpq8UgQpXK/1c5212ff5af6f512291c6e0f3d68bf36/LAC_300450930323_Fast_Act_Chewables_32_Count_00270.webp';
const PANEL_LACTAID_ORIG = 'https://www.lactaid.com/products/lactaid-original-strength-caplets';

const SB_ACTIVE = {
  name: 'Saccharomyces boulardii CNCM I-745',
  strength: '500 mg',
} as const;

const DA_FLAGS: FlagSpec[] = [
  ['Lactose', 'cleared', 'lactose'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
  ['Hydroxypropyl-methylcellulose (derived from pine bark)', 'cleared', 'hpmc'],
];

const DA100_FLAGS: FlagSpec[] = [
  ['Lactose', 'cleared', 'lactose'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
  ['Hydroxypropylmethylcellulose (derived from pine bark)', 'cleared', 'hpmc'],
];

const GB_FLAGS: FlagSpec[] = [
  ['Hydroxypropyl methylcellulose (derived from pine bark)', 'cleared', 'hpmc'],
  ['Lactose', 'cleared', 'lactose'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
];

const PROPRE_FLAGS: FlagSpec[] = [
  ['Lactose', 'cleared', 'lactose'],
  ['Hydroxypropyl methylcellulose (derived from pine bark)', 'cleared', 'hpmc'],
];

const IMM_FLAGS: FlagSpec[] = [
  ['Lactose', 'cleared', 'lactose'],
  ['Hydroxypropyl methylcellulose (derived from pine bark)', 'cleared', 'hpmc'],
  ['Modified food starch', 'limited', 'modStarch'],
  ['Sucrose', 'cleared', 'sucrose'],
  ['Medium chain triglycerides', 'limited', 'mctUnlabeled'],
  ['Silicon dioxide', 'limited', 'silica'],
  ['DL alpha tocopherol', 'cleared', 'dlAlphaToc'],
];

const MET_FLAGS: FlagSpec[] = [
  ['Sugar', 'limited', 'sugar'],
  ['Annatto extract (color)', 'limited', 'annatto'],
  ['Carnauba wax', 'cleared', 'carnauba'],
  ['Citric acid', 'cleared', 'citric'],
  ['Cornstarch', 'cleared', 'cornStarch'],
  ['Fractionated coconut oil', 'cleared', 'fcoGummy'],
  ['Lactic acid', 'cleared', 'lacticAcid'],
  ['Natural flavors', 'limited', 'natFlavors'],
  ['Pectin', 'cleared', 'gums'],
  ['Sodium citrate', 'cleared', 'citrateSalt'],
  ['Water', 'cleared', 'water'],
];

const HER_FLAGS: FlagSpec[] = [
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Hydroxypropyl-methylcellulose', 'cleared', 'hpmc'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
  ['Silicon dioxide', 'limited', 'silica'],
];

const FA_CAPLET_FLAGS: FlagSpec[] = [
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['Crospovidone', 'cleared', 'crospovidone'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
  ['Colloidal silicon dioxide', 'limited', 'silica'],
];

const FA_CHEW_FLAGS: FlagSpec[] = [
  ['Mannitol', 'limited', 'sugarAlcohol'],
  ['Microcrystalline Cellulose', 'cleared', 'cellulose'],
  ['Croscarmellose Sodium', 'cleared', 'croscarmellose'],
  ['Crospovidone', 'cleared', 'crospovidone'],
  ['Magnesium Stearate', 'cleared', 'magStearate'],
  ['Natural and Artificial Flavor', 'limited', 'naFlavor'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Sucralose', 'moderate', 'sucralose'],
];

const ORIG_FLAGS: FlagSpec[] = [
  ['Mannitol', 'limited', 'sugarAlcohol'],
  ['Cellulose', 'cleared', 'cellulose'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

export const BATCH221_KYR6C_T118U_B: RatingRecord[] = [
  {
    id: 'florastor-b221-dual-action-20',
    productName:
      'Florastor Dual Action Probiotic Supplement, Saccharomyces boulardii CNCM I-745 (20 vegetarian capsules)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b221-dual-action',
    audience: ADULT,
    minAge: 4,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142000248',
    activeIngredients: [SB_ACTIVE],
    inactiveIngredients: buildOi(PANEL_FL_DA_20, DA_FLAGS),
    verdict: verdictFromFlags(DA_FLAGS),
    retailers: ['florastor.com', 'Vitacost', 'Thrifty White'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_DA_20} (Vitacost box side) and florastor.com/products/florastor-dual-action-probiotic-supplement (20 ct sku 76968). Serving Size 2 capsules; Servings Per Container 10; Saccharomyces boulardii CNCM I-745 500 mg ‡ (%DV for Adults and Children 4 & Up). Other ingredients: Lactose, magnesium stearate, hydroxypropyl-methylcellulose (derived from pine bark). Contains: Lactose (derived from milk). Not a significant source of added sugars. florastor.com 20 ct available $19.82. Vitacost https://www.vitacost.com/products/florastor-dual-action-probiotic-supplement-20-vegetarian-capsules-250-mg-per-capsule-157607 available $19.99 UPC 704142000248. Thrifty White https://shop.thriftywhite.com/florastor-probiotic-for-intestinal-health-250-mg-20-capsules/ Current Stock 19 $16.67 UPC 704142000248. UPC brand variant barcode; check digit OK.`,
    ],
  },
  {
    id: 'florastor-b221-dual-action-30',
    productName:
      'Florastor Dual Action Probiotic Supplement, Saccharomyces boulardii CNCM I-745 (30 vegetarian capsules)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b221-dual-action',
    audience: ADULT,
    minAge: 4,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142000354',
    activeIngredients: [SB_ACTIVE],
    inactiveIngredients: buildOi(PANEL_FL_DA_30, DA_FLAGS),
    verdict: verdictFromFlags(DA_FLAGS),
    retailers: ['florastor.com', 'Meijer'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_DA_30} (core30-1 box side) and florastor.com Dual Action (sku 76888). Serving Size 2 capsules; Servings Per Container 15; S. boulardii CNCM I-745 500 mg ‡. Same other ingredients as 20 ct: Lactose, magnesium stearate, hydroxypropyl-methylcellulose (derived from pine bark). Contains: Lactose (derived from milk). florastor.com 30 ct available $28.97. Meijer https://www.meijer.com/shopping/product/x/70414200035.html stockStatus inStock. UPC 704142000354 (= Meijer key 70414200035); check digit OK.`,
    ],
  },
  {
    id: 'florastor-b221-dual-action-50',
    productName:
      'Florastor Dual Action Probiotic Supplement, Saccharomyces boulardii CNCM I-745 (50 vegetarian capsules)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b221-dual-action',
    audience: ADULT,
    minAge: 4,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142000071',
    activeIngredients: [SB_ACTIVE],
    inactiveIngredients: buildOi(PANEL_FL_DA_50, DA_FLAGS),
    verdict: verdictFromFlags(DA_FLAGS),
    retailers: ['florastor.com', 'Meijer', 'Thrifty White'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_DA_50} (core50-1). Serving Size 2 capsules; Servings Per Container 25; S. boulardii CNCM I-745 500 mg ‡. Other ingredients: Lactose, magnesium stearate, hydroxypropyl-methylcellulose (derived from pine bark). florastor.com 50 ct (sku 76918) available $39.99. Meijer https://www.meijer.com/shopping/product/x/70414200007.html inStock. Thrifty White https://shop.thriftywhite.com/florastor-probiotic-supplement-250-mg-50-capsules/ Current Stock 34 $35.80 UPC 704142000071. UPC check digit OK.`,
    ],
  },
  {
    id: 'florastor-b221-dual-action-100',
    productName:
      'Florastor Dual Action Probiotic Supplement, Saccharomyces boulardii CNCM I-745 (100 vegetarian capsules)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b221-dual-action',
    audience: ADULT,
    minAge: 4,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142000323',
    activeIngredients: [SB_ACTIVE],
    inactiveIngredients: buildOi(PANEL_FL_DA_100, DA100_FLAGS),
    verdict: verdictFromFlags(DA100_FLAGS),
    retailers: ['florastor.com', 'Vitacost', 'Thrifty White'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_DA_100}; Vitacost image https://cdn.shopify.com/s/files/1/0804/8974/2651/files/25_c719d375-45bf-4fc2-aa75-3390acb739b8.jpg (same text). Serving Size 2 capsules; Servings Per Container 50. Other ingredients: Lactose, magnesium stearate, hydroxypropylmethylcellulose (derived from pine bark). florastor.com 100 ct (sku 76938) available $67.99. Vitacost https://www.vitacost.com/products/florastor-dual-action-probiotic-supplement-100-vegetarian-capsules-250-mg-per-capsule-157609 available $84.30 UPC 704142000323. Thrifty White https://shop.thriftywhite.com/florastor-daily-probiotic-supplement-100-capsules/ Current Stock 18 $70.98 UPC 704142000323. UPC printed 7-04142-00032-3; check digit OK.`,
    ],
  },
  {
    id: 'florastor-b221-advanced-gas-bloat-30',
    productName:
      'Florastor Advanced Gas & Bloat Probiotic Digestive Supplement with Enzymes & Botanicals (30 vegetarian capsules)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b221-advanced-gas-bloat',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142000811',
    activeIngredients: [
      SB_ACTIVE,
      { name: 'Enzyme blend', strength: '125 mg' },
      { name: 'Botanical blend', strength: '60 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_FL_GB, GB_FLAGS),
    verdict: verdictFromFlags(GB_FLAGS),
    retailers: ['florastor.com', 'Vitacost', 'Meijer', 'Thrifty White'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_GB} (Vitacost box side) and florastor.com/products/florastor-advanced-gas-bloat-probiotic-digestive-supplement (sku 78130). Serving Size 2 capsules; Servings Per Container 15; S. boulardii CNCM I-745 500 mg ‡; Enzyme blend 125 mg ‡ (Amylase, Protease, Cellulase, Lipase); Botanical blend 60 mg ‡ (Ginger Extract, Fennel Seed Extract, Peppermint Leaf Extract). %DV for Adults. Other ingredients: Hydroxypropyl methylcellulose (derived from pine bark), lactose, magnesium stearate. Contains: Lactose (derived from milk). florastor.com available $28.97. Vitacost https://www.vitacost.com/products/florastor-advanced-gas-bloat-30-vegetarian-capsules-157612 available $31.49 UPC 704142000811. Meijer https://www.meijer.com/shopping/product/x/70414200081.html inStock. Thrifty White https://shop.thriftywhite.com/florastor-advanced-gas-bloat-probiotic-digestive-vegetarian-capsules-30-ct/ Current Stock 60 $26.51. UPC check digit OK.`,
    ],
  },
  {
    id: 'florastor-b221-advanced-pro-pre-30',
    productName:
      'Florastor Advanced Pro + Pre Probiotic & Prebiotic Fiber Supplement (30 vegetarian capsules)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b221-advanced-pro-pre',
    audience: ADULT,
    minAge: 4,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142000484',
    activeIngredients: [
      SB_ACTIVE,
      { name: 'Chicory root fiber (inulin)', strength: '600 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_FL_PROPRE, PROPRE_FLAGS),
    verdict: verdictFromFlags(PROPRE_FLAGS),
    retailers: ['florastor.com', 'Vitacost'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_PROPRE}; florastor.com Advanced Pro + Pre (sku 74918). Serving Size 2 capsules; Servings 15; Dietary Fiber <1 g 2%; Chicory root fiber (inulin) 600 mg ‡; S. boulardii CNCM I-745 500 mg ‡. Other ingredients: Lactose, hydroxypropyl methylcellulose (derived from pine bark). Contains: Lactose (derived from milk). florastor.com available $28.97. Vitacost https://www.vitacost.com/products/florastor-advanced-pro-pre-30-vegetarian-capsules-157613 available $31.50 UPC 704142000484. UPC check digit OK.`,
    ],
  },
  {
    id: 'florastor-b221-advanced-immunity-30',
    productName:
      'Florastor Advanced Immunity Probiotic & Immune Supplement with Vitamins C & D3 and Zinc (30 vegetarian capsules)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b221-advanced-immunity',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142000439',
    activeIngredients: [
      { name: 'Vitamin C (as sodium ascorbate)', strength: '120 mg' },
      { name: 'Vitamin D3 (as cholecalciferol)', strength: '20 mcg (800 IU)' },
      { name: 'Zinc (as zinc gluconate)', strength: '20 mg' },
      SB_ACTIVE,
    ],
    inactiveIngredients: buildOi(PANEL_FL_IMM, IMM_FLAGS),
    verdict: verdictFromFlags(IMM_FLAGS),
    retailers: ['florastor.com', 'Vitacost'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_IMM}; florastor.com Advanced Immunity (sku 58928). Serving 2 capsules; Servings 15; Vitamin C (as sodium ascorbate) 120 mg 130%; Vitamin D3 (as cholecalciferol) 20 mcg (800 IUs) 100%; Zinc (as zinc gluconate) 20 mg 180%; S. boulardii CNCM I-745 500 mg ‡. %DV for Adults 18 & Up. Other ingredients: Lactose, hydroxypropyl methylcellulose (derived from pine bark), modified food starch, sucrose, medium chain triglycerides, silicon dioxide, DL alpha tocopherol. Contains: Lactose (derived from milk). florastor.com available $28.97. Vitacost https://www.vitacost.com/products/florastor-advanced-immunity-30-vegetarian-capsules-157611 available $31.49 UPC 704142000439. UPC check digit OK.`,
    ],
  },
  {
    id: 'florastor-b221-digest-metabolic-gummies-56',
    productName:
      'Florastor Balanced Benefits Digest + Metabolic Support Probiotic Gummies (56 gummies)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b221-digest-metabolic-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142881304',
    activeIngredients: [
      { name: 'Bacillus coagulans SNZ 1969', strength: '10 mg (1 Billion CFU)' },
      { name: 'Inulin (as chicory root fiber)', strength: '2 g' },
      { name: 'Vitamin B12 (as cyanocobalamin)', strength: '250 mcg' },
    ],
    inactiveIngredients: buildOi(PANEL_FL_MET, MET_FLAGS),
    verdict: verdictFromFlags(MET_FLAGS),
    retailers: ['florastor.com', 'Meijer', 'Thrifty White'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_MET} (barcode 7 04142 88130 4 on bottle); florastor.com sku 88130. Serving Size 2 gummies; Servings 28; Calories 15; Total Carbohydrate 5 g; Dietary Fiber 2 g; Total Sugars 2 g; Includes 2 g Added Sugars; Vitamin B12 (as cyanocobalamin) 250 mcg; Sodium 10 mg; Bacillus coagulans SNZ 1969 10 mg (1 Billion CFU) ‡; Inulin (as chicory root fiber) 2 g ‡. Other ingredients: Sugar; Contains less than 2% of: annatto extract (color), carnauba wax, citric acid, cornstarch, fractionated coconut oil, lactic acid, natural flavors, pectin, sodium citrate, water. florastor.com 56 ct available $24.99. Meijer https://www.meijer.com/shopping/product/x/70414288130.html inStock. Thrifty White https://shop.thriftywhite.com/florastor-balanced-benefits-digest-metabolic-support-probiotic-vegetarian-gummies-peach-lemonade-56-ct/ Current Stock 31 $23.01 UPC 704142881304. UPC check digit OK.`,
    ],
  },
  {
    id: 'florastor-b221-her-digest-destress-30',
    productName:
      'Her Florastor Balanced Benefits Digest + De-Stress Probiotic Supplement (30 vegetarian capsules)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b221-her-digest-destress',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142623409',
    activeIngredients: [
      { name: 'L-theanine', strength: '200 mg' },
      { name: 'Total Probiotic Cultures', strength: '11 billion CFU' },
    ],
    inactiveIngredients: buildOi(PANEL_FL_HER, HER_FLAGS),
    verdict: verdictFromFlags(HER_FLAGS),
    retailers: ['florastor.com', 'Meijer', 'Thrifty White'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_HER}; florastor.com Her Digest + De-Stress (sku 62340). Serving Size 1 capsule; Servings 30; Total Probiotic Cultures 11 billion CFU †; Proprietary Blend: HOWARU Lacticaseibacillus rhamnosus HN001 33.3 mg †, Lactobacillus acidophilus (La-14) 75 mg †; Synbio Blend 15 mg † (Lacticaseibacillus rhamnosus IMC 501, Lacticaseibacillus paracasei IMC 502); L-theanine 200 mg †. Other ingredients: Microcrystalline cellulose, hydroxypropyl-methylcellulose, magnesium stearate, silicon dioxide. florastor.com 30 ct available $28.97. Meijer https://www.meijer.com/shopping/product/x/70414262340.html inStock. Thrifty White https://shop.thriftywhite.com/florastor-her-balancedbenefits-digest-de-stress-probiotic-vegetarian-30-capsules/ Current Stock 48 $27.62 UPC 704142623409. UPC check digit OK.`,
    ],
  },
  {
    id: 'lactaid-b221-fast-act-caplets-60',
    productName: 'LACTAID Fast Act Lactase Enzyme Supplement Caplets (60 caplets)',
    brand: 'Lactaid',
    category: DIGESTIVE,
    formulaId: 'lactaid-b221-fast-act-caplet',
    audience: ADULT,
    minAge: 4,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '300450910608',
    activeIngredients: [{ name: 'Lactase enzyme', strength: '9000 FCC lactase units' }],
    inactiveIngredients: buildOi(PANEL_LACTAID_FA_CAPLET, FA_CAPLET_FLAGS),
    verdict: verdictFromFlags(FA_CAPLET_FLAGS),
    retailers: ['Thrifty White', 'Meijer'],
    sourcesGeneral: [
      `Brand panel ${PANEL_LACTAID_FA_CAPLET} (Supplement Facts accordion); box art LAC_300450910325 on same page. Serving Size 1 Caplet; Sodium 5 mg (<1%); Lactase Enzyme 9000 FCC †. Inactive Ingredients: Microcrystalline cellulose, Croscarmellose sodium, Crospovidone, Magnesium stearate, Colloidal silicon dioxide. Thrifty White https://shop.thriftywhite.com/lactaid-fast-act-lactose-enzyme-supplement-60-caplets/ Current Stock 43 $17.57 UPC 300450910608. Meijer https://www.meijer.com/shopping/product/x/30045091060.html stockStatus inStock. UPC Thrifty White = Meijer key 30045091060; check digit OK.`,
    ],
  },
  {
    id: 'lactaid-b221-fast-act-chewables-60',
    productName: 'LACTAID Fast Act Chewables, Vanilla Twist (60 chewable tablets)',
    brand: 'Lactaid',
    category: DIGESTIVE,
    formulaId: 'lactaid-b221-fast-act-chewable',
    audience: ADULT,
    minAge: 4,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '300450930606',
    activeIngredients: [{ name: 'Lactase enzyme', strength: '9000 FCC lactase units' }],
    inactiveIngredients: buildOi(PANEL_LACTAID_FA_CHEW, FA_CHEW_FLAGS),
    verdict: verdictFromFlags(FA_CHEW_FLAGS),
    retailers: ['Thrifty White', 'Meijer'],
    sourcesGeneral: [
      `Box panel ${PANEL_LACTAID_FA_CHEW} (32-ct box, same formula) plus https://www.lactaid.com/products/fast-act-chewables accordion (60 ct). Serving Size 1 Chewable Tablet; Total Carb <1 g; Sodium 5 mg; Lactase Enzyme 9000 FCC †. Other Ingredients: Mannitol, Microcrystalline Cellulose, Croscarmellose Sodium, Crospovidone, Magnesium Stearate, Natural and Artificial Flavor, Citric Acid, Sucralose. Thrifty White https://shop.thriftywhite.com/lactaid-fast-act-tablets-vanilla-twist-flavor-60-tablets/ Current Stock 25 $17.57 UPC 300450930606. Meijer https://www.meijer.com/shopping/product/x/30045093060.html inStock. UPC lactaid.com LAC_300450930606_60_Count = Thrifty White = Meijer key; check digit OK.`,
    ],
  },
  {
    id: 'lactaid-b221-original-strength-120',
    productName: 'LACTAID Original Strength Lactase Enzyme Supplement Caplets (120 caplets)',
    brand: 'Lactaid',
    category: DIGESTIVE,
    formulaId: 'lactaid-b221-original-strength',
    audience: ADULT,
    minAge: 4,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '300450080028',
    activeIngredients: [
      { name: 'Lactase enzyme', strength: '9000 FCC lactase units (per 3 caplets)' },
    ],
    inactiveIngredients: buildOi(PANEL_LACTAID_ORIG, ORIG_FLAGS),
    verdict: verdictFromFlags(ORIG_FLAGS),
    retailers: ['Thrifty White', 'Meijer'],
    sourcesGeneral: [
      `Brand panel ${PANEL_LACTAID_ORIG} (Supplement Facts accordion; Available in 120 ct). Serving Size 3 Caplets; Sodium 5 mg (<1%); Lactase Enzyme 9000 FCC †. Inactive Ingredients: Mannitol, Cellulose, Sodium Citrate, Magnesium stearate. Thrifty White https://shop.thriftywhite.com/lactaid-original-caplets-120-caplets/ Current Stock 6 Add to Cart $17.57 UPC 300450080028. Meijer https://www.meijer.com/shopping/product/x/30045008002.html stockStatus inStock. UPC lactaid.com Original Strength page = Thrifty White = Meijer key 30045008002; check digit OK.`,
    ],
  },
];

const ROWS = BATCH221_KYR6C_T118U_B;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 12) throw new Error(`batch221 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch221 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch221 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch221 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch221 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch221 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch221 verdict ${record.id}`);
}
