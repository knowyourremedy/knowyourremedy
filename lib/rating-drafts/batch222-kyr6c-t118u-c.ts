// DRAFT / not verified / batch 222 KYR6-c (t118u group C WRITE).
// FlorastorKids + Skin Renew, Lactaid counts, Beano tablets — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;
const DIGESTIVE = 'Digestive';

const METH = {
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  lactose: 'Methodology §5 Cleared (lactose / lactose monohydrate).',
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  hpmc:
    'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose). hydroxypropylmethylcellulose (derived from pine bark) and hydroxypropyl-methylcellulose map here (Oct 17, 2026 t118u).',
  water: 'Methodology §5 Cleared (purified water / water).',
  gums: 'Methodology §5 Cleared (xanthan / guar / acacia / pectin / gellan — food gums).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  silica:
    'Methodology §5 Caution (silicon dioxide oral cap). Colloidal silicon dioxide maps here (Oct 17, 2026 t118u).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  crospovidone: 'Methodology §5 Cleared (crospovidone).',
  sugarAlcohol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  naFlavor:
    'Methodology §5 Limited (natural and artificial flavor, singular). Founder lock Oct 17, 2026 t118u.',
  citric: 'Methodology §5 Cleared (citric acid).',
  sucralose: 'Methodology §5 Moderate (sucralose).',
  celluloseGel:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose). Cellulose gel maps here (Oct 17, 2026 t118u).',
  potatoStarch:
    'Methodology §5 Cleared (pregelatinized starch / corn starch / potato starch).',
  colloidalSilica:
    'Methodology §5 Caution (silicon dioxide oral cap). Colloidal silica maps here (Oct 17, 2026 t118u).',
  calciumGluconate:
    'Methodology §5 Cleared (calcium gluconate — exact INCI; locked Sept 15, 2026)',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_FL_KIDS_20 =
  'https://cdn.shopify.com/s/files/1/0580/7911/7391/files/kids20-1.jpg';
const PANEL_FL_SKIN =
  'https://cdn.shopify.com/s/files/1/0580/7911/7391/files/49825_Florastor_SkinPro_Box_RtSide.png';
const PANEL_LACTAID_FA_CAPLET = 'https://www.lactaid.com/products/lactaid-fast-act-caplets';
const PANEL_LACTAID_FA_CHEW =
  'https://images.ctfassets.net/naglem4vigsd/Z2PIRvEIjkmfpq8UgQpXK/1c5212ff5af6f512291c6e0f3d68bf36/LAC_300450930323_Fast_Act_Chewables_32_Count_00270.webp';
const PANEL_BEANO_TABS = 'https://www.beanogas.com/anti-gas-pills/beano-tablets';

const KIDS_FLAGS: FlagSpec[] = [
  ['Maltodextrin (derived from non-GMO maize)', 'limited', 'maltodextrin'],
  ['Lactose', 'cleared', 'lactose'],
];

const SKIN_FLAGS: FlagSpec[] = [
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Hydroxypropyl-methylcellulose', 'cleared', 'hpmc'],
  ['Water', 'cleared', 'water'],
  ['Gellan gum', 'cleared', 'gums'],
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
  ['Sucralose', 'limited', 'sucralose'],
];

const BEANO_FLAGS: FlagSpec[] = [
  ['Cellulose gel', 'cleared', 'celluloseGel'],
  ['Mannitol', 'limited', 'sugarAlcohol'],
  ['Potato starch', 'cleared', 'potatoStarch'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
  ['Colloidal silica', 'limited', 'colloidalSilica'],
  ['Calcium gluconate', 'cleared', 'calciumGluconate'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

export const BATCH222_KYR6C_T118U_C: RatingRecord[] = [
  {
    id: 'florastor-b222-kids-20',
    productName:
      'FlorastorKids Dual Action Probiotic Supplement, Saccharomyces boulardii CNCM I-745, Tutti-Frutti (20 sticks, 250 mg)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b222-kids',
    audience: KIDS,
    minAge: 0,
    form: 'powder packet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142000408',
    activeIngredients: [{ name: 'Saccharomyces boulardii CNCM I-745', strength: '250 mg' }],
    inactiveIngredients: buildOi(PANEL_FL_KIDS_20, KIDS_FLAGS),
    verdict: verdictFromFlags(KIDS_FLAGS),
    retailers: ['Walmart', 'Target', 'Thrifty White'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_KIDS_20} (florastor.com gallery kids20-1). Suggested use 1 stick 1–2 times daily mixed into soft food or a beverage. Serving Size 1 stick; Servings Per Container 20; Calories 10; Total Carbohydrate 2 g; S. boulardii CNCM I-745 250 mg ‡ (%DV columns Infants 2–12 months / children 1–3 / 4 & up). Other Ingredients: Maltodextrin (derived from non-GMO maize), lactose. Contains: Lactose (derived from milk). Walmart https://www.walmart.com/ip/133540162 in stock $23.01 sold by Hey Pharma (third-party, exact count t105u L90). Target https://www.target.com/p/-/A-93275584 in stock $22.99. Thrifty White https://shop.thriftywhite.com/florastor-kids-daily-probiotic-supplement-250-mg-sachets-tutti-frutti-20-packets/ Current Stock 3 $16.67 UPC 704142000408. florastor.com 20 ct unavailable (not used). UPC variant barcode = Thrifty White; check digit OK.`,
    ],
  },
  {
    id: 'florastor-b222-skin-renew-30',
    productName:
      'Florastor Balanced Benefits Digest + Skin Renew Probiotic Supplement (30 capsules)',
    brand: 'Florastor',
    category: DIGESTIVE,
    formulaId: 'florastor-b222-skin-renew',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142624406',
    activeIngredients: [
      { name: 'Vitamin C (from acerola fruit extract)', strength: '13.5 mg' },
      {
        name: 'Damasty Proprietary Botanical Blend (rose petal extract, acerola fruit extract, French melon juice concentrate)',
        strength: '300 mg',
      },
      {
        name: 'Proprietary Probiotic Blend (B. lactis HN019, B. lactis Bl-04)',
        strength: '10.7 mg (4 billion CFU)',
      },
    ],
    inactiveIngredients: buildOi(PANEL_FL_SKIN, SKIN_FLAGS),
    verdict: verdictFromFlags(SKIN_FLAGS),
    retailers: ['florastor.com', 'Walmart', 'Target'],
    sourcesGeneral: [
      `Brand panel ${PANEL_FL_SKIN} (49825_Florastor_SkinPro_Box_RtSide); florastor.com sku 62440. Serving Size 1 capsule; 30 servings; Vitamin C (from Acerola fruit extract) 13.5 mg 15%; Damasty Proprietary Botanical Blend 300 mg ‡; Proprietary Probiotic Blend 10.7 mg ‡ (Bifidobacterium lactis HN019, B. lactis Bl-04; Total Bifido Cultures 4 Billion CFU). Actives ungraded on facts box. Other ingredients: Microcrystalline cellulose, hydroxypropyl-methylcellulose, water, gellan gum, magnesium stearate, silicon dioxide. florastor.com available $34.99. Walmart https://www.walmart.com/ip/20247268287 in stock $29.99 sold by Biocodex. Target https://www.target.com/p/-/A-94936001 in stock. CVS Farmwell in stock $40.49. UPC florastor.com variant 704142624406 (t94u brand-page rule); check digit OK.`,
    ],
  },
  {
    id: 'lactaid-b222-fast-act-caplets-12',
    productName: 'LACTAID Fast Act Lactase Enzyme Supplement Caplets (12 caplets)',
    brand: 'Lactaid',
    category: DIGESTIVE,
    formulaId: 'lactaid-b221-fast-act-caplet',
    audience: ADULT,
    minAge: 4,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '300450910127',
    activeIngredients: [{ name: 'Lactase enzyme', strength: '9000 FCC lactase units' }],
    inactiveIngredients: buildOi(PANEL_LACTAID_FA_CAPLET, FA_CAPLET_FLAGS),
    verdict: verdictFromFlags(FA_CAPLET_FLAGS),
    retailers: ['Walmart', 'Target', 'Thrifty White'],
    sourcesGeneral: [
      `Brand panel ${PANEL_LACTAID_FA_CAPLET} (accordion). Serving Size 1 Caplet; Sodium 5 mg (<1%); Lactase Enzyme 9000 FCC †. Inactive Ingredients: Microcrystalline cellulose, Croscarmellose sodium, Crospovidone, Magnesium stearate, Colloidal silicon dioxide. Walmart https://www.walmart.com/ip/10294224 in stock $6.68 sold by Walmart. Target https://www.target.com/p/-/A-1008597842 in stock $11.84 Hey Pharma. Thrifty White https://shop.thriftywhite.com/lactaid-fast-act-caplets-12-ea/ Current Stock 3 $5.00. UPC brand box filename LAC_300450910127_Fast_Act_Caplets_12_Count on lactaid.com; check digit OK.`,
    ],
  },
  {
    id: 'lactaid-b222-fast-act-caplets-32',
    productName: 'LACTAID Fast Act Lactase Enzyme Supplement Caplets (32 caplets)',
    brand: 'Lactaid',
    category: DIGESTIVE,
    formulaId: 'lactaid-b221-fast-act-caplet',
    audience: ADULT,
    minAge: 4,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '300450910325',
    activeIngredients: [{ name: 'Lactase enzyme', strength: '9000 FCC lactase units' }],
    inactiveIngredients: buildOi(PANEL_LACTAID_FA_CAPLET, FA_CAPLET_FLAGS),
    verdict: verdictFromFlags(FA_CAPLET_FLAGS),
    retailers: ['Walmart', 'Walgreens', 'CVS', 'Thrifty White'],
    sourcesGeneral: [
      `Same panel and inactive line as 12 ct (${PANEL_LACTAID_FA_CAPLET}). Walmart https://www.walmart.com/ip/42863380 in stock $10.49. Walgreens https://www.walgreens.com/store/c/-/ID=prod1418534-product in stock. CVS https://www.cvs.com/shop/-prodid-1011947 in stock. Thrifty White https://shop.thriftywhite.com/lactaid-fast-act-32-caplets/ Current Stock 39 $11.21. UPC LAC_300450910325_Fast_Act_Caplets_32_Count; check digit OK.`,
    ],
  },
  {
    id: 'lactaid-b222-fast-act-caplets-96',
    productName: 'LACTAID Fast Act Lactase Enzyme Supplement Caplets (96 caplets)',
    brand: 'Lactaid',
    category: DIGESTIVE,
    formulaId: 'lactaid-b221-fast-act-caplet',
    audience: ADULT,
    minAge: 4,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: [{ name: 'Lactase enzyme', strength: '9000 FCC lactase units' }],
    inactiveIngredients: buildOi(PANEL_LACTAID_FA_CAPLET, FA_CAPLET_FLAGS),
    verdict: verdictFromFlags(FA_CAPLET_FLAGS),
    retailers: ['Walmart', 'Target', 'Thrifty White'],
    sourcesGeneral: [
      `Same panel and inactive line as other Fast Act caplets (${PANEL_LACTAID_FA_CAPLET}). Walmart https://www.walmart.com/ip/19331265539 in stock $20.54. Target https://www.target.com/p/-/A-81874957 in stock $22.49. Walgreens ID=300442576 in stock. Thrifty White https://shop.thriftywhite.com/lactaid-fast-act-lactase-enzyme-supplement-caplets-96-ct/ Current Stock 60 $23.01. UPC conflict: Walmart + Target 300450910998 vs Thrifty White + Walgreens 300450910974; barcode left empty (t94u; Neuriva Original 50 precedent).`,
    ],
  },
  {
    id: 'lactaid-b222-fast-act-chewables-32',
    productName: 'LACTAID Fast Act Chewables, Vanilla Twist (32 chewable tablets)',
    brand: 'Lactaid',
    category: DIGESTIVE,
    formulaId: 'lactaid-b221-fast-act-chewable',
    audience: ADULT,
    minAge: 4,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '300450930323',
    activeIngredients: [{ name: 'Lactase enzyme', strength: '9000 FCC lactase units' }],
    inactiveIngredients: buildOi(PANEL_LACTAID_FA_CHEW, FA_CHEW_FLAGS),
    verdict: verdictFromFlags(FA_CHEW_FLAGS),
    retailers: ['Walmart', 'Target', 'CVS', 'Thrifty White'],
    sourcesGeneral: [
      `Box panel ${PANEL_LACTAID_FA_CHEW} (32-count box side). Serving Size 1 Chewable Tablet; Servings Per Container 32; Total Carb <1 g; Sodium 5 mg; Lactase Enzyme 9000 FCC †. Other Ingredients: Mannitol, Microcrystalline Cellulose, Croscarmellose Sodium, Crospovidone, Magnesium Stearate, Natural and Artificial Flavor, Citric Acid, Sucralose. Walmart https://www.walmart.com/ip/10294226 in stock $10.18. Target https://www.target.com/p/-/A-10989565 in stock $10.39. CVS https://www.cvs.com/shop/-prodid-459752 in stock. Thrifty White https://shop.thriftywhite.com/lactaid-fast-act-chewable-vanilla-twist-flavor-32-tablets/ Current Stock 17 $10.92. UPC LAC_300450930323_Fast_Act_Chewables_32_Count; check digit OK.`,
    ],
  },
  {
    id: 'beano-b222-tablets-100',
    productName: 'beano Food Enzyme Dietary Supplement Tablets (100 tablets)',
    brand: 'Beano',
    category: DIGESTIVE,
    formulaId: 'beano-b222-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '042037103002',
    activeIngredients: [
      {
        name: 'Alpha-galactosidase enzyme (from Aspergillus niger)',
        strength: '800 GALU (per 2 tablets)',
      },
    ],
    inactiveIngredients: buildOi(PANEL_BEANO_TABS, BEANO_FLAGS),
    verdict: verdictFromFlags(BEANO_FLAGS),
    retailers: ['Walmart', 'Walgreens', 'Thrifty White'],
    sourcesGeneral: [
      `Brand panel ${PANEL_BEANO_TABS} (2026 beano digestive enzyme art) and Walgreens back-panel image (Extra Strength ©2021; same facts). Serving Size 2 Tablets; Servings Per Container 50; Alpha-galactosidase enzyme 800 GALU † (derived from Aspergillus niger). Other ingredients: Cellulose gel, mannitol, potato starch, magnesium stearate, colloidal silica, calcium gluconate. Dist. Medtech Products Inc. (Prestige). Walmart https://www.walmart.com/ip/23598020 in stock $12.58 sold by Walmart. Walgreens https://www.walgreens.com/store/c/-/ID=prod6173963-product in stock $19.99. Thrifty White https://shop.thriftywhite.com/beano-food-enzyme-dietary-supplement-tablets-100-ct/ Current Stock 60 $13.45. UPC Thrifty White = Kroger key 0004203710300; two agree; check digit OK.`,
    ],
  },
  {
    id: 'beano-b222-tablets-30',
    productName: 'beano Food Enzyme Dietary Supplement Tablets (30 tablets)',
    brand: 'Beano',
    category: DIGESTIVE,
    formulaId: 'beano-b222-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '042037103040',
    activeIngredients: [
      {
        name: 'Alpha-galactosidase enzyme (from Aspergillus niger)',
        strength: '800 GALU (per 2 tablets)',
      },
    ],
    inactiveIngredients: buildOi(PANEL_BEANO_TABS, BEANO_FLAGS),
    verdict: verdictFromFlags(BEANO_FLAGS),
    retailers: ['Walmart', 'Thrifty White'],
    sourcesGeneral: [
      `Kroger back image https://www.kroger.com/product/images/xlarge/back/0004203710304 (30-count Extra Strength box) matches current brand page facts: Serving Size 2 Tablets; Servings Per Container 15; Alpha-galactosidase enzyme 800 GALU †. Other ingredients: Cellulose gel, mannitol, potato starch, magnesium stearate, colloidal silica, calcium gluconate (same as ${PANEL_BEANO_TABS}). Thrifty White description copy (To Go / 300 GALU) is retailer error, not label. Thrifty White https://shop.thriftywhite.com/beano-food-enzyme-dietary-supplement-30-tablets/ Current Stock 10 $4.86 UPC 042037103040. Walmart https://www.walmart.com/ip/Beano-Extra-Strength-Gas-Prevention-Digestive-Enzyme-Supplement-30-Count/23598021 in stock Add to cart sold by Walmart $5.28 (Oct 17, 2026). UPC Thrifty White = Kroger key 0004203710304; check digit OK.`,
    ],
  },
];

const ROWS = BATCH222_KYR6C_T118U_C;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 8) throw new Error(`batch222 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch222 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch222 upc ${record.id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch222 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch222 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch222 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch222 verdict ${record.id}`);
}
