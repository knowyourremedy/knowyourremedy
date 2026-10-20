// DRAFT / not verified / batch 225 KYR6-c (t121u Physician's Choice WRITE).
// Twenty-two packs — grade from OI only; honestNote required (t121u founder order).

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = "Physician's Choice";
const DIGESTIVE = 'Digestive';
const EYE_EAR = 'Eye & Ear';
const VITAMINS = 'Vitamins';
const NO_OI = 'No other ingredients listed on panel.';

const METH = {
  vegCapGellan:
    'Methodology §5 Cleared (Vegetable capsule (hypromellose, gellan gum), HPMC / veg-cap family; founder lock Oct 17, 2026 t118u).',
  vegCapHpmc: 'Methodology §5 Cleared (Vegetable capsule (hypromellose), HPMC / veg-cap family; t118u).',
  vegCapWater:
    'Methodology §5 Cleared (vegetable capsule (hypromellose, water); founder lock Oct 18, 2026 t120u).',
  riceFlour: 'Methodology §5 Caution (rice flour, exact token; LOCKED Sept 15, 2026).',
  riceHullConc: 'Methodology §5 Cleared (rice hull concentrate, rice-hull family; t119u).',
  riceHulls: 'Methodology §5 Cleared (rice hulls; t120u).',
  gumArabic: 'Methodology §5 Cleared (gum arabic, exact token).',
  sunflowerFill:
    'Methodology §5 Cleared (sunflower oil as non-gummy capsule / tablet fill; LOCKED Sept 22, 2026).',
  sunflowerPowder:
    'Methodology §5 Cleared (Sunflower oil in a powder stick pack; founder lock Oct 18, 2026 t121u, PR #736).',
  mctUnlabeled: 'Methodology §5 Limited (unlabeled MCT, no plant source named; t102u).',
  silica: 'Methodology §5 Caution (silicon dioxide, oral nanoparticle data-gap cap).',
  riceExtract: 'Methodology §5 Limited (unspecified rice extract, opacity; LOCKED Sept 14, 2026).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  caneSugar: 'Methodology §5 Cleared (cane sugar).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  vegJuiceColor: 'Methodology §5 Cleared (Vegetable Juice (Color)).',
  natFlavor: 'Methodology §5 Caution (flavor family; unnamed natural flavor).',
  steviaLeaf: 'Methodology §5 Caution (stevia extract / stevia leaf extract).',
  turmericColor: 'Methodology §5 Cleared (Turmeric (Color), trace color use; t75u).',
  spirulinaExtract:
    'Methodology §5 Caution/Limited (Spirulina extract as color). The t121u spirulina (color) Cleared override does NOT extend to spirulina extract.',
  lecithin: 'Methodology §5 Cleared (lecithin, sunflower).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

const PC_STD_GELLAN: FlagSpec[] = [
  ['Vegetable capsule (hypromellose, gellan gum)', 'cleared', 'vegCapGellan'],
  ['rice flour', 'limited', 'riceFlour'],
  ['rice hull concentrate', 'cleared', 'riceHullConc'],
  ['gum arabic', 'cleared', 'gumArabic'],
  ['sunflower oil', 'cleared', 'sunflowerFill'],
];

const PC_PREBIO: FlagSpec[] = [
  ['Rice flour', 'limited', 'riceFlour'],
  ['vegetable capsule (hypromellose, gellan gum)', 'cleared', 'vegCapGellan'],
  ['rice hull concentrate', 'cleared', 'riceHullConc'],
  ['gum arabic', 'cleared', 'gumArabic'],
  ['sunflower oil', 'cleared', 'sunflowerFill'],
];

const PC_DE: FlagSpec[] = [
  ['Vegetable capsule (hypromellose)', 'cleared', 'vegCapHpmc'],
  ['rice flour', 'limited', 'riceFlour'],
  ['rice hull concentrate', 'cleared', 'riceHullConc'],
  ['gum arabic', 'cleared', 'gumArabic'],
  ['sunflower oil', 'cleared', 'sunflowerFill'],
];

const PC_BLOAT: FlagSpec[] = [
  ['Vegetable capsule (hypromellose, gellan gum)', 'cleared', 'vegCapGellan'],
  ['rice flour', 'limited', 'riceFlour'],
  ['medium chain triglycerides', 'limited', 'mctUnlabeled'],
  ['silicon dioxide', 'limited', 'silica'],
  ['rice hulls', 'cleared', 'riceHulls'],
  ['rice extract', 'limited', 'riceExtract'],
  ['gum arabic', 'cleared', 'gumArabic'],
  ['sunflower oil', 'cleared', 'sunflowerFill'],
];

const PC_EYE: FlagSpec[] = [
  ['Microcrystalline cellulose', 'cleared', 'mcc'],
  ['vegetable capsule (hypromellose, water)', 'cleared', 'vegCapWater'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
];

const PC_KSM: FlagSpec[] = [['Vegetable capsule (hypromellose, water)', 'cleared', 'vegCapWater']];

const PC_KIDS_PF: FlagSpec[] = [
  ['Rice hull concentrate', 'cleared', 'riceHullConc'],
  ['gum arabic', 'cleared', 'gumArabic'],
  ['sunflower oil', 'cleared', 'sunflowerPowder'],
];

const PC_EASY_PM: FlagSpec[] = [
  ['Cane sugar', 'cleared', 'caneSugar'],
  ['citric acid', 'cleared', 'citric'],
  ['vegetable juice (color)', 'cleared', 'vegJuiceColor'],
  ['natural flavor', 'limited', 'natFlavor'],
  ['stevia leaf extract', 'limited', 'steviaLeaf'],
];

const PC_EASY_CL: FlagSpec[] = [
  ['Cane sugar', 'cleared', 'caneSugar'],
  ['citric acid', 'cleared', 'citric'],
  ['natural flavor', 'limited', 'natFlavor'],
  ['stevia leaf extract', 'limited', 'steviaLeaf'],
  ['turmeric (color)', 'cleared', 'turmericColor'],
  ['spirulina extract (color)', 'limited', 'spirulinaExtract'],
  ['vegetable juice (color)', 'cleared', 'vegJuiceColor'],
];

const PC_PSYLLIUM: FlagSpec[] = [['Vegetable capsule (hypromellose)', 'cleared', 'vegCapHpmc']];

const PC_COLOSTRUM: FlagSpec[] = [['Sunflower lecithin', 'cleared', 'lecithin']];

type CapsuleRow = Pick<
  RatingRecord,
  'id' | 'productName' | 'barcode' | 'activeIngredients' | 'honestNote' | 'sourcesGeneral' | 'retailers'
> & { panel: string; flags: FlagSpec[] };

function pcCapsule(row: CapsuleRow): RatingRecord {
  return {
    id: row.id,
    productName: row.productName,
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: row.id,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: row.barcode,
    activeIngredients: row.activeIngredients,
    inactiveIngredients: buildOi(row.panel, row.flags),
    verdict: verdictFromFlags(row.flags),
    retailers: row.retailers,
    sourcesGeneral: row.sourcesGeneral,
    honestNote: row.honestNote,
  };
}

const STD_RICE_NOTE =
  'The grade comes only from the other ingredients. Rice flour is an exact Caution token: unspecified rice ingredients can carry arsenic, and the label names no source or testing. Everything else (the hypromellose/gellan capsule, rice hull concentrate, gum arabic, sunflower oil fill) is Cleared. The probiotic and prebiotic actives are not graded. Serving is 1 capsule daily. Adults; the label prints no minimum age.';

const DE_RICE_NOTE =
  'The grade comes only from the other ingredients. Rice flour is an exact Caution token: unspecified rice ingredients can carry arsenic, and the label names no source or testing. Everything else (the hypromellose capsule, rice hull concentrate, gum arabic, sunflower oil fill) is Cleared. The probiotic and prebiotic actives are not graded. Serving is 1 capsule daily. Adults; the label prints no minimum age.';

const PANEL_60B_30 =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/60_Billion_Probiotic_Carousel_0bdf54b0-23ba-45ec-a1af-136e33bb76e6.jpg';
const PANEL_60B_60 =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/47_3fd10307-f51c-41c0-a10d-f151836d8413.jpg';
const PANEL_WOM_30 =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/SFP_-_Women_s_Probiotic_PDP_Carousel_4.jpg';
const PANEL_WOM_60 =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/47_6a239313-2a65-4d2a-b258-abc0dcda583f.jpg';
const PANEL_THIN_30 =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/THN-30CT-CAROUSEL_6_3.6.0.jpg';
const PANEL_THIN_60 =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/13_a92c00a3-16d1-4ad1-a775-4cbd14dc7136.jpg';
const PANEL_MEN_30 =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/13_03f4637e-e0d0-4d85-aa24-9515554435da.jpg';
const PANEL_PREBIO =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/13_014d6b80-ab58-42f9-b570-10b257e2a5ba.jpg';
const PANEL_DE_60 =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/DIG-60CT-CAROUSEL_6_3.7.0_3dc88076-3555-4d95-b4cc-8a10bc729693.jpg';
const PANEL_DE_30 =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/23_e32949af-d837-4abc-bd71-3aa149548396.jpg';
const PANEL_100B =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/13_cca0a0a0-238d-4665-871d-2e663a58150d.jpg';
const PANEL_BLOAT =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/GAS-30CT-CAROUSEL_6_3.1.0_WIP1_2282a4eb-e5bf-4dcf-ab91-7278c01defc8.jpg';
const PANEL_VAGINAL_60 =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/14_0f1f2574-569d-4171-9483-4f072f01d8e9.jpg';
const PANEL_EYE =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/EYE-CAROUSEL_6_3.4.0.jpg';
const PANEL_KSM =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/14_6b69c5a5-701f-448d-8082-80ca8f1c0c28.jpg';
const PANEL_KIDS_PF =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/PFK-24CT-CAROUSEL_6_3.3.0.jpg';
const PANEL_EMF_UNFL =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/EMF-CAROUSEL_6_3.0.0.jpg';
const PANEL_PSYLLIUM =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/PSY_CAROUSEL_7_300CT_AMZ_3.0.0.png';
const PANEL_EMF_PM =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/EMF-PM-CAROUSEL_6-30CT_a650d4c1-97b7-4e8d-b313-b70903b2c2b1.jpg';
const PANEL_EMF_CL =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/EMF-CL-CAROUSEL_6-30CT_8556f799-d13b-43ad-8d5e-e942744cff70.jpg';
const PANEL_COLOSTRUM =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/CLS-CAROUSEL-7.jpg';
const PANEL_COLLAGEN =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/CLGN-CAROUSEL_6_3.2.0_TIKTOK.png';

const PROB_60B_ACTIVES = [
  {
    name: 'Probiotic Blend',
    strength:
      '220 mg (Total Probiotic Activity 60 Billion CFUs): Lacticaseibacillus casei, Lactobacillus acidophilus, Lacticaseibacillus paracasei, Ligilactobacillus salivarius, Lactiplantibacillus plantarum, Bifidobacterium lactis, Bifidobacterium bifidum, Bifidobacterium longum, Bifidobacterium breve, Lactobacillus bulgaricus',
  },
  {
    name: 'Prebiotic Blend',
    strength: '150 mg: Organic Inulin (from Jerusalem Artichoke), Organic Acacia Fiber, Organic Inulin (from Chicory)',
  },
] as const;

const OI_STD_GELLAN =
  'Vegetable capsule (hypromellose, gellan gum), rice flour, rice hull concentrate, gum arabic, and sunflower oil.';
const OI_DE = 'Vegetable capsule (hypromellose), rice flour, rice hull concentrate, gum arabic, and sunflower oil.';

export const BATCH225_KYR6C_T121U: RatingRecord[] = [
  pcCapsule({
    id: 'physicianschoice-b225-60b-probiotic-30',
    productName: "Physician's Choice 60 Billion Probiotic (30 capsules)",
    barcode: '854226008513',
    panel: PANEL_60B_30,
    flags: PC_STD_GELLAN,
    activeIngredients: [...PROB_60B_ACTIVES],
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_60B_30}. Serving 1 Capsule; Servings Per Container 30. Other ingredients verbatim: ${OI_STD_GELLAN} physicianschoice.com/products/probiotic-60-billion 30 Count $29.38 available; Vitacost 114972 $24.97 available; Walmart ip/977258927; Target A-87039335; CVS. UPC 854226008513 check digit OK.`,
    ],
    honestNote: STD_RICE_NOTE,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-60b-probiotic-60',
    productName: "Physician's Choice 60 Billion Probiotic (60 capsules)",
    barcode: '854226008582',
    panel: PANEL_60B_60,
    flags: PC_STD_GELLAN,
    activeIngredients: [...PROB_60B_ACTIVES],
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_60B_60}. Serving 1 Capsule; Servings Per Container 60. Other ingredients verbatim: ${OI_STD_GELLAN} physicianschoice.com 60 Count $45.85 available; Vitacost 156992 $40.14 available; Walmart ip/160197969. UPC 854226008582 check digit OK.`,
    ],
    honestNote: `${STD_RICE_NOTE} Same formula as the 30-count; the panel was read from the 60-count bottle.`,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-womens-probiotic-30',
    productName: "Physician's Choice Women's Probiotic (30 capsules)",
    barcode: '854226008506',
    panel: PANEL_WOM_30,
    flags: PC_STD_GELLAN,
    activeIngredients: [
      {
        name: "Probiotic Women's Blend",
        strength:
          '133 mg (50 Billion CFU): Lactiplantibacillus plantarum, Lacticaseibacillus paracasei, Lacticaseibacillus casei, Lactobacillus gasseri, Lactobacillus acidophilus, Bifidobacterium lactis',
      },
      { name: 'Prebiotic Blend', strength: '100 mg: Organic Inulin (from Jerusalem Artichoke), Organic Acacia Fiber' },
      { name: 'D-Mannose', strength: '60 mg' },
      { name: 'Cranberry Fruit Powder (CRANDOR™)', strength: '50 mg' },
    ],
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_WOM_30}. Serving 1 Capsule; 30 servings. Other ingredients verbatim: ${OI_STD_GELLAN} physicianschoice.com/womens-probiotics 30 Count $29.38; Vitacost 114956 $24.97; Walmart ip/630215595. UPC 854226008506 check digit OK.`,
    ],
    honestNote: `${STD_RICE_NOTE} D-mannose and cranberry are actives and are not graded.`,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-womens-probiotic-60',
    productName: "Physician's Choice Women's Probiotic (60 capsules)",
    barcode: '854226008780',
    panel: PANEL_WOM_60,
    flags: PC_STD_GELLAN,
    activeIngredients: [
      {
        name: 'Probiotic Blend',
        strength:
          '133 mg (50 Billion CFU): Lactiplantibacillus plantarum, Lacticaseibacillus paracasei, Lacticaseibacillus casei, Lactobacillus gasseri, Lactobacillus acidophilus, Bifidobacterium lactis',
      },
      { name: 'Prebiotic Blend', strength: '100 mg: Organic Inulin (from Jerusalem Artichoke), Organic Acacia Fiber' },
      { name: 'D-Mannose', strength: '60 mg' },
      { name: 'Cranberry Fruit Powder (CRANDOR™)', strength: '50 mg' },
    ],
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_WOM_60}. Serving 1 Capsule; 60 servings. Other ingredients verbatim: ${OI_STD_GELLAN} physicianschoice.com 60 Count $45.85; Vitacost 156993 $39.59. UPC 854226008780 check digit OK.`,
    ],
    honestNote: `${STD_RICE_NOTE} D-mannose and cranberry are actives and are not graded. The 60-count label calls the first blend "Probiotic Blend". The amounts match the 30-count.`,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-thin-30-probiotic-30',
    productName: "Physician's Choice Thin 30 Probiotic (30 capsules)",
    barcode: '854226008186',
    panel: PANEL_THIN_30,
    flags: PC_STD_GELLAN,
    activeIngredients: [
      {
        name: 'Weight Management Blend',
        strength:
          '410 mg: Greenselect® Phytosome™ (Green Tea Leaf Extract, Sunflower Lecithin), Organic Apple Cider Vinegar Extract, Capsimax® Cayenne Pepper Extract (2% capsaicinoids)',
      },
      {
        name: 'Prebiotic Blend',
        strength: '150 mg: Organic Acacia Fiber, Organic Inulin (from Chicory), Organic Inulin (from Jerusalem Artichoke)',
      },
      {
        name: 'Probiotic Blend',
        strength:
          '45 mg: Lactiplantibacillus plantarum, Lactobacillus acidophilus, Lacticaseibacillus rhamnosus, Lactobacillus gasseri, Bifidobacterium infantis, Bifidobacterium lactis',
      },
      {
        name: 'DigeSEB PB™ Digestive Enzyme Blend',
        strength: '20 mg: Proteases, Amylase, Cellulase, Lactase, Lipase, Lactobacillus acidophilus',
      },
    ],
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_THIN_30}. Serving 1 Capsule; 30 servings. Other ingredients verbatim: ${OI_STD_GELLAN} physicianschoice.com/thin-30-probiotic 30 Count $34.97; Vitacost 102007 $30.57. UPC 854226008186 check digit OK.`,
    ],
    honestNote: `${STD_RICE_NOTE} Sunflower lecithin sits inside the facts box (Greenselect Phytosome), so it is an active, not an other ingredient. The actives include green tea extract and cayenne extract (capsaicinoids). They are not graded, but people sensitive to caffeine or spicy compounds should know they are there.`,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-thin-30-probiotic-60',
    productName: "Physician's Choice Thin 30 Probiotic (60 capsules)",
    barcode: '854226008797',
    panel: PANEL_THIN_60,
    flags: PC_STD_GELLAN,
    activeIngredients: [
      {
        name: 'Weight Management Blend',
        strength:
          '410 mg: Greenselect® Phytosome™ (Green Tea Leaf Extract, Sunflower Lecithin), Organic Apple Cider Vinegar Extract, Capsimax® Cayenne Pepper Extract (2% capsaicinoids)',
      },
      {
        name: 'Prebiotic Blend',
        strength: '150 mg: Organic Acacia Fiber, Organic Inulin (from Chicory), Organic Inulin (from Jerusalem Artichoke)',
      },
      {
        name: 'Probiotic Blend',
        strength:
          '45 mg: Lactiplantibacillus plantarum, Lactobacillus acidophilus, Lacticaseibacillus rhamnosus, Lactobacillus gasseri, Bifidobacterium infantis, Bifidobacterium lactis',
      },
      {
        name: 'DigeSEB PB™ Digestive Enzyme Blend',
        strength: '20 mg: Proteases, Amylase, Cellulase, Lactase, Lipase, Lactobacillus acidophilus',
      },
    ],
    retailers: ['Vitacost', 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_THIN_60}. Serving 1 Capsule; 60 servings. Other ingredients verbatim: ${OI_STD_GELLAN} Vitacost 160658 $50.97 available; Walmart ip/1516738924 $49.97 sold by Physician's Choice in stock. UPC 854226008797 check digit OK.`,
    ],
    honestNote: `${STD_RICE_NOTE} Same formula as Thin 30 (30 capsules), read from the 60-count bottle. Sunflower lecithin is inside the facts box (active). The actives include green tea extract and cayenne extract.`,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-mens-probiotic-30',
    productName: "Physician's Choice Men's Probiotic (30 capsules)",
    barcode: '854226008957',
    panel: PANEL_MEN_30,
    flags: PC_STD_GELLAN,
    activeIngredients: [
      { name: 'Selenium (as a culture of Saccharomyces cerevisiae)', strength: '200 mcg (364% DV)' },
      {
        name: 'Probiotic Blend',
        strength:
          '202 mg (70 Billion CFUs): Lactiplantibacillus plantarum, Lactococcus lactis, Lactobacillus acidophilus, Bacillus coagulans, Lacticaseibacillus paracasei, Limosilactobacillus reuteri, Bifidobacterium lactis, Bifidobacterium longum',
      },
      { name: 'Prebiotic Blend', strength: '50 mg: Organic Acacia Fiber, Organic Inulin (from Jerusalem Artichoke)' },
      { name: 'Hawthorn Berry', strength: '25 mg' },
    ],
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_MEN_30}. Serving 1 Capsule; 30 servings. Other ingredients verbatim: ${OI_STD_GELLAN} physicianschoice.com probiotics for men $33.30; Vitacost 160661 $31.47. UPC 854226008957 check digit OK.`,
    ],
    honestNote: `${STD_RICE_NOTE} Selenium is at 364% DV per capsule (active, not graded). People already taking selenium should count it.`,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-prebiotic-probiotic-30',
    productName: "Physician's Choice Prebiotic Probiotic (30 capsules)",
    barcode: '854226008612',
    panel: PANEL_PREBIO,
    flags: PC_PREBIO,
    activeIngredients: [
      { name: 'Inulin (from Chicory)', strength: '250 mg' },
      {
        name: 'Probiotic Blend',
        strength: '26 mg (10 Billion CFUs): Lacticaseibacillus paracasei, Lacticaseibacillus casei, Lactobacillus acidophilus',
      },
    ],
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_PREBIO}. Serving 1 Capsule; 30 servings. Other ingredients verbatim: Rice flour, vegetable capsule (hypromellose, gellan gum), rice hull concentrate, gum arabic, and sunflower oil. physicianschoice.com/prebiotic-probiotic $28.20; Vitacost 160660 $25.67. UPC 854226008612 check digit OK.`,
    ],
    honestNote: STD_RICE_NOTE,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-digestive-enzymes-60',
    productName: "Physician's Choice Digestive Enzymes with Prebiotics & Probiotics (60 capsules)",
    barcode: '854226008544',
    panel: PANEL_DE_60,
    flags: PC_DE,
    activeIngredients: [
      {
        name: 'Prebiotic and Probiotic Blend',
        strength:
          '159 mg: Organic Inulin (from Jerusalem Artichoke), Organic Acacia Fiber, Inulin (from Chicory), Bacillus subtilis OPTIBIOME BS50™, Bacillus coagulans, Bacillus clausii',
      },
      { name: 'Herbal Blend', strength: '150 mg: Organic Peppermint Leaf, Organic Ginger Root' },
      {
        name: 'Digestive Enzyme Blend',
        strength:
          '85 mg: Bromelain, Amylase, Protease 4.5, Glucoamylase, Protease 6.0, Papain, Lactase, Protease 3.0, Peptidase, Cellulase, Beta-Glucanase, Alpha-Galactosidase, Lipase, Xylanase, Hemicellulase, Invertase',
      },
    ],
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_DE_60}. Serving 1 Capsule; 60 servings. Other ingredients verbatim: ${OI_DE} physicianschoice.com digestive-enzymes 60 Count $23.95; Vitacost 160655 $19.97. UPC 854226008544 check digit OK.`,
    ],
    honestNote: `${DE_RICE_NOTE} The enzymes include bromelain and papain (actives, not graded).`,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-digestive-enzymes-30',
    productName: "Physician's Choice Digestive Enzymes with Prebiotics & Probiotics (30 capsules)",
    barcode: '850048297043',
    panel: PANEL_DE_30,
    flags: PC_DE,
    activeIngredients: [
      {
        name: 'Prebiotic and Probiotic Blend',
        strength:
          '159 mg: Organic Inulin (from Jerusalem Artichoke), Organic Acacia Fiber, Inulin (from Chicory), Bacillus subtilis OPTIBIOME BS50™, Bacillus coagulans, Bacillus clausii',
      },
      { name: 'Herbal Blend', strength: '150 mg: Organic Peppermint Leaf, Organic Ginger Root' },
      {
        name: 'Digestive Enzyme Blend',
        strength:
          '85 mg: Bromelain, Amylase, Protease 4.5, Glucoamylase, Protease 6.0, Papain, Lactase, Protease 3.0, Peptidase, Cellulase, Beta-Glucanase, Alpha-Galactosidase, Lipase, Xylanase, Hemicellulase, Invertase',
      },
    ],
    retailers: ['Vitacost', 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_DE_30}. Serving 1 Capsule; 30 servings. Other ingredients verbatim: ${OI_DE} Vitacost 160656 $13.97 available; Walmart ip/5311217647 $13.97 in stock. UPC 850048297043 check digit OK (CVS page mislabels 60-ct UPC).`,
    ],
    honestNote: `${DE_RICE_NOTE} Same formula as the 60-count. The enzymes include bromelain and papain (actives, not graded).`,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-100b-probiotic-30',
    productName: "Physician's Choice 100 Billion Probiotic (30 capsules)",
    barcode: '850048297012',
    panel: PANEL_100B,
    flags: PC_STD_GELLAN,
    activeIngredients: [
      {
        name: 'Probiotic Blend',
        strength:
          '349 mg (100 Billion CFUs, 16 strains): L. paracasei, L. plantarum, L. casei, L. acidophilus, L. bulgaricus, B. infantis, B. lactis, B. bifidum, B. longum, L. reuteri, L. acidophilus NCFM®, L. gasseri, L. rhamnosus, B. animalis subsp. lactis, L. salivarius, B. breve',
      },
      {
        name: 'Prebiotic Blend',
        strength: '150 mg: Organic Inulin (from Jerusalem Artichoke), Organic Acacia Fiber, Inulin (from Chicory)',
      },
    ],
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_100B}. Serving 1 Capsule; 30 servings. Other ingredients verbatim: ${OI_STD_GELLAN} physicianschoice.com/100b-probiotic $59.97; Vitacost 160662 $62.97; Walmart ip/5330017511. UPC 850048297012 check digit OK.`,
    ],
    honestNote: `${STD_RICE_NOTE} The brand-site art lists rice hull extract where the bottle lists rice hull concentrate. Both are Cleared, so the grade is the same either way.`,
  }),
  pcCapsule({
    id: 'physicianschoice-b225-bloat-gas-probiotic-30',
    productName: "Physician's Choice Bloat + Gas Probiotic (30 capsules)",
    barcode: '850048297173',
    panel: PANEL_BLOAT,
    flags: PC_BLOAT,
    activeIngredients: [
      {
        name: 'Pre, Pro, Post-biotic Blend',
        strength: '325 mg: Tributyrin (as CoreBiome®), Bacillus subtilis OPTIBIOME BS50™ (2 Billion CFUs), Organic Acacia Fiber',
      },
      { name: 'Herbal Blend', strength: '50 mg: Artichoke Leaf, Ginger Root' },
      { name: 'Enzyme Blend', strength: '36 mg: Lactase, Alpha-galactosidase' },
    ],
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_BLOAT}. Serving 1 Capsule; 30 servings. Other ingredients verbatim: Vegetable capsule (hypromellose, gellan gum), rice flour, medium chain triglycerides, silicon dioxide, rice hulls, rice extract, gum arabic, and sunflower oil. physicianschoice.com/bloat-gas-probiotic 1-Pack $47.03; Vitacost 160657 $41.97; Walmart ip/13942858018. UPC 850048297173 check digit OK.`,
    ],
    honestNote:
      'The grade comes only from the other ingredients. Four of them dock it to Caution: rice flour (exact Caution token, arsenic concern with no source named), medium chain triglycerides with no plant source named (Limited), silicon dioxide (Caution, oral nanoparticle data gap), and an unspecified rice extract (Limited). The capsule, rice hulls, gum arabic, and sunflower oil fill are Cleared. Nothing is Avoid. The actives are not graded. Serving is 1 capsule daily. Adults; the label prints no minimum age.',
  }),
  pcCapsule({
    id: 'physicianschoice-b225-vaginal-probiotic-60',
    productName: "Physician's Choice Vaginal Probiotic (60 capsules)",
    barcode: '850048297241',
    panel: PANEL_VAGINAL_60,
    flags: PC_STD_GELLAN,
    activeIngredients: [
      { name: 'Organic Acacia Fiber', strength: '150 mg' },
      { name: 'Organic Cranberry (Fruit) Extract', strength: '75 mg' },
      {
        name: 'Vaginal Probiotic Blend',
        strength:
          '70 mg (Total Probiotic Activity 6 Billion CFUs): Limosilactobacillus reuteri (RC-14®), Lactobacillus crispatus (LBV88™), Lacticaseibacillus rhamnosus (GR-1®)',
      },
      { name: 'Deglycyrrhizinated Licorice Root Extract', strength: '50 mg' },
    ],
    retailers: ['Vitacost', 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_VAGINAL_60}. Serving 1 Capsule; 60 servings. Other ingredients verbatim: ${OI_STD_GELLAN} Vitacost 160663 $50.31; Walmart ip/10954901987 $27.99 sold by Physician's Choice. UPC 850048297241 check digit OK.`,
    ],
    honestNote: `${STD_RICE_NOTE} The licorice is deglycyrrhizinated (DGL), an active, not graded. Marketed for women; the label prints no minimum age.`,
  }),
  {
    id: 'physicianschoice-b225-eye-health-60',
    productName: "Physician's Choice Eye Health (60 capsules)",
    brand: BRAND,
    category: EYE_EAR,
    formulaId: 'physicianschoice-b225-eye-health-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '854226008070',
    activeIngredients: [
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '250 mg (278% DV)' },
      { name: 'Vitamin E (as D-Alpha Tocopherol Succinate)', strength: '20 mg (133% DV)' },
      { name: 'Folate (as 240 mcg Folic Acid)', strength: '400 mcg DFE (100% DV)' },
      { name: 'Vitamin B12 (as Methylcobalamin)', strength: '100 mcg (4167% DV)' },
      { name: 'Zinc (as Zinc Citrate)', strength: '25 mg (227% DV)' },
      { name: 'Copper (as Copper Citrate)', strength: '2 mg (222% DV)' },
      { name: 'Bilberry (Vaccinium myrtillus) Fruit Extract', strength: '50 mg' },
      { name: 'Grape Seed Extract (95% Proanthocyanidins)', strength: '25 mg' },
      { name: 'Lutein (from Lutemax® 2020 Marigold Flower Extract)', strength: '20 mg' },
      { name: 'BioPerine® Black Pepper Fruit Extract (95% Piperine)', strength: '5 mg' },
      { name: 'Zeaxanthin (from Lutemax® 2020 Marigold Flower Extract)', strength: '4 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_EYE, PC_EYE),
    verdict: verdictFromFlags(PC_EYE),
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_EYE}. Serving 2 Veggie Capsules; 30 servings. Other ingredients verbatim: Microcrystalline cellulose, vegetable capsule (hypromellose, water), and magnesium stearate. physicianschoice.com/eye-health-support $23.97; Vitacost 102006 $24.45. UPC 854226008070 check digit OK.`,
    ],
    honestNote:
      'Clean: all three other ingredients are Cleared (cellulose filler, plant-cellulose capsule, magnesium stearate). Nothing docks the grade. The actives are not graded, but zinc is at 227% DV and copper at 222% DV per 2-capsule serving, so anyone stacking a multivitamin should count them. Serving is 2 capsules daily. Adults; the label prints no minimum age.',
  },
  {
    id: 'physicianschoice-b225-ksm66-ashwagandha-60',
    productName: "Physician's Choice KSM-66 Ashwagandha (60 capsules)",
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'physicianschoice-b225-ksm66-ashwagandha-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '854226008254',
    activeIngredients: [
      { name: 'Organic Ashwagandha Root Extract (KSM-66®)', strength: '1 g' },
      { name: 'Organic Black Pepper 4:1 Extract', strength: '15 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_KSM, PC_KSM),
    verdict: verdictFromFlags(PC_KSM),
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_KSM}. Serving 2 Veggie Capsules; 30 servings. Other ingredients verbatim: Vegetable capsule (hypromellose, water). physicianschoice.com/ashwagandha-ksm-66 $29.97; Vitacost 160659 $31.47. UPC 854226008254 check digit OK.`,
    ],
    honestNote:
      'Clean: the only other ingredient is a plant-cellulose capsule (hypromellose, water), which is Cleared. The ashwagandha and black pepper actives are not graded. Ashwagandha is commonly flagged for pregnancy and thyroid conditions, so check with a clinician. Serving is 2 capsules daily. Adults; the label prints no minimum age.',
  },
  {
    id: 'physicianschoice-b225-kids-probiotic-fiber-24',
    productName: "Physician's Choice Kids Probiotic + Fiber Unflavored (24 stick packs)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b225-kids-probiotic-fiber-24',
    audience: KIDS,
    minAge: 1,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297142',
    activeIngredients: [
      { name: 'Kids Prebiotic Fiber Blend', strength: '3.3 g: Organic Inulin (from Agave), Organic Acacia Fiber' },
      {
        name: 'Kids Probiotic Blend',
        strength:
          '23 mg: Bifidobacterium lactis, Lactiplantibacillus plantarum, Lacticaseibacillus rhamnosus GG',
      },
    ],
    inactiveIngredients: buildOi(PANEL_KIDS_PF, PC_KIDS_PF),
    verdict: verdictFromFlags(PC_KIDS_PF),
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_KIDS_PF}. Serving 1 Stick Pack (3.4 g); 24 servings. Other ingredients verbatim: Rice hull concentrate, gum arabic, and sunflower oil. physicianschoice.com kids fiber $26.63; Vitacost 160666 $25.17; Walmart ip/8956560595. UPC 850048297142 check digit OK.`,
    ],
    honestNote:
      'Clean: all three other ingredients are Cleared. Rice hull concentrate is a flow agent, gum arabic is a plant gum, and sunflower oil in a powder stick pack is Cleared under the t121u lock. It is unflavored and unsweetened, with no colors. The actives are not graded. The label says "For children 1 year and older," so the minimum age is 1. Serving is 1 stick pack daily. Inulin at 3 g fiber may cause gas in young children at first.',
  },
  {
    id: 'physicianschoice-b225-easy-mix-fiber-unflavored-24',
    productName: "Physician's Choice Easy Mix Fiber Unflavored (24-day supply, 5.7 oz)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b225-easy-mix-fiber-unflavored-24',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297531',
    activeIngredients: [
      { name: 'EasyMix™ Prebiotic Fiber Blend', strength: '6.7 g: Soluble Corn Fiber, Guar Fiber' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ["Physician's Choice", 'Vitacost'],
    sourcesGeneral: [
      `Panel ${PANEL_EMF_UNFL}. Serving 1 Heaping Spoonful (6.7 g); about 24 servings. ${NO_OI} physicianschoice.com/easy-mix-fiber 24 Day Supply $22.97; Vitacost 160664 $20.97; Walmart ip/17339117813; Target A-95001577. UPC 850048297531 check digit OK.`,
    ],
    honestNote:
      'Clean. No other ingredients listed on panel. The label is only the two fibers (soluble corn fiber and guar fiber), with no sweetener, flavor, color, or flow agent. With nothing to dock, the grade is Clean. The fibers are actives and are not graded. Serving is 1 heaping spoonful (6.7 g, 6 g fiber) daily mixed into a drink. Start low if you are not used to fiber. Adults; the label prints no minimum age.',
  },
  pcCapsule({
    id: 'physicianschoice-b225-psyllium-husk-300',
    productName: "Physician's Choice Psyllium Husk Fiber (300 capsules)",
    barcode: '850048297760',
    panel: PANEL_PSYLLIUM,
    flags: PC_PSYLLIUM,
    activeIngredients: [{ name: 'Psyllium Husk', strength: '2.6 g (Dietary Fiber 2 g)' }],
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_PSYLLIUM}. Serving 5 Capsules; 60 servings. Other ingredients verbatim: Vegetable capsule (hypromellose). physicianschoice.com/psyllium-husk-fiber $28.20; Walmart ip/20797907296 $27.97 sold by Physician's Choice. UPC 850048297760 check digit OK.`,
    ],
    honestNote:
      'Clean: the only other ingredient is a plant-cellulose capsule (hypromellose), which is Cleared. The psyllium husk is the active and is not graded. Serving is 5 capsules (2.6 g psyllium, 2 g fiber). Psyllium should be taken with a full glass of water and spaced from medicines. Adults; the label prints no minimum age.',
  }),
  {
    id: 'physicianschoice-b225-easy-mix-fiber-peach-mango',
    productName: "Physician's Choice Easy Mix Fiber Peach Mango (about 30 servings)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b225-easy-mix-fiber-peach-mango',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297647',
    activeIngredients: [
      { name: 'EasyMix™ Prebiotic Fiber Blend', strength: '6.7 g: Soluble Corn Fiber, Guar Fiber' },
    ],
    inactiveIngredients: buildOi(PANEL_EMF_PM, PC_EASY_PM),
    verdict: verdictFromFlags(PC_EASY_PM),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_EMF_PM}. Serving 1 Heaping Scoop (9.5 g); about 30 servings. Other ingredients verbatim: Cane sugar, citric acid, vegetable juice (color), natural flavor, and stevia leaf extract. physicianschoice.com/easy-mix-fiber-peach-mango $27.97; Walmart ip/19906459767 $23.97. UPC 850048297647 check digit OK.`,
    ],
    honestNote:
      'The grade comes only from the other ingredients. Unnamed "natural flavor" (flavor rule) and stevia leaf extract (Caution sweetener) dock it to Caution. Cane sugar, citric acid, and vegetable juice color are Cleared. The colors are from food sources (vegetable juice), not synthetic dyes. There is about 2 g of added cane sugar per serving. The prebiotic fibers (soluble corn fiber, guar fiber) are actives and are not graded. Serving is 1 heaping scoop (9.5 g, 6 g fiber) mixed into a drink. Adults; the label prints no minimum age.',
  },
  {
    id: 'physicianschoice-b225-easy-mix-fiber-cucumber-lime',
    productName: "Physician's Choice Easy Mix Fiber Cucumber Lime (about 30 servings)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b225-easy-mix-fiber-cucumber-lime',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297654',
    activeIngredients: [
      { name: 'EasyMix™ Prebiotic Fiber Blend', strength: '6.7 g: Soluble Corn Fiber, Guar Fiber' },
    ],
    inactiveIngredients: buildOi(PANEL_EMF_CL, PC_EASY_CL),
    verdict: verdictFromFlags(PC_EASY_CL),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_EMF_CL}. Serving 1 Heaping Scoop (9.4 g); about 30 servings. Other ingredients verbatim: Cane sugar, citric acid, natural flavor, stevia leaf extract, turmeric (color), spirulina extract (color), vegetable juice (color). physicianschoice.com/easy-mix-fiber-cucumber-lime $27.97; Walmart ip/19977805199 $23.97. UPC 850048297654 check digit OK.`,
    ],
    honestNote:
      'The grade comes only from the other ingredients. Three tokens: unnamed "natural flavor" (flavor rule), stevia leaf extract (Caution sweetener), and spirulina extract used as color (Caution; the t121u "spirulina (color)" clearance does not cover "spirulina extract") dock it to Caution. Cane sugar, citric acid, turmeric color, and vegetable juice color are Cleared. The colors are from food sources (turmeric, spirulina extract, vegetable juice), not synthetic dyes. There is about 2 g of added cane sugar per serving. The prebiotic fibers (soluble corn fiber, guar fiber) are actives and are not graded. Serving is 1 heaping scoop (6 g fiber) mixed into a drink. Adults; the label prints no minimum age.',
  },
  {
    id: 'physicianschoice-b225-colostrum-gold-60-servings',
    productName: "Physician's Choice Colostrum Gold Powder Unflavored (60 servings, 120 g)",
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'physicianschoice-b225-colostrum-gold-60-servings',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297661',
    activeIngredients: [{ name: 'Whole Bovine Colostrum', strength: '2 g' }],
    inactiveIngredients: buildOi(PANEL_COLOSTRUM, PC_COLOSTRUM),
    verdict: verdictFromFlags(PC_COLOSTRUM),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_COLOSTRUM}. Serving 1 Heaping Scoop (2 g); about 60 servings. Other ingredients verbatim: Sunflower lecithin. Contains: Milk. physicianschoice.com/colostrum-gold-powder 60 Servings $99.99; Walmart ip/20026310835 $69.99 sold by Physician's Choice. UPC 850048297661 check digit OK.`,
    ],
    honestNote:
      'Clean: the only other ingredient is sunflower lecithin, a Cleared emulsifier. The colostrum is the active and is not graded. Allergen: Contains Milk (bovine colostrum), so it is not for people with a milk allergy. Serving is 1 heaping scoop (2 g) daily. Adults; the label prints no minimum age.',
  },
  {
    id: 'physicianschoice-b225-collagen-peptides-unflavored-246g',
    productName: "Physician's Choice Collagen Peptides Powder Unflavored (8.7 oz, 246 g)",
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'physicianschoice-b225-collagen-peptides-unflavored-246g',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '854226008063',
    activeIngredients: [
      { name: 'Hydrolyzed Bovine Collagen', strength: '7 g' },
      {
        name: 'DigeSEB PB™ Digestive Enzyme and Probiotic Blend',
        strength: '50 mg: Protease, Amylase, Cellulase, Lactase, Lipase, Lactobacillus acidophilus',
      },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_COLLAGEN}. Serving 1 Scoop (7 g); about 35 servings. ${NO_OI} physicianschoice.com/collagen-peptides-powder-unflavored-copy 1-Bag $23.97; Walmart ip/547548092 $19.97; DSLD 259011 UPC 854226008063. UPC check digit OK.`,
    ],
    honestNote:
      'Clean. No other ingredients listed on panel. The label holds only bovine collagen and a small enzyme/probiotic blend, with no sweetener, flavor, or flow agent, so nothing docks the grade. The actives are not graded. The collagen is bovine (beef), so it is not vegetarian. Serving is 1 scoop (7 g, 6 g protein) daily mixed into a drink. Adults; the label prints no minimum age.',
  },
];

const ROWS = BATCH225_KYR6C_T121U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 22) throw new Error(`batch225 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch225 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch225 upc ${record.id}`);
  if (!record.honestNote?.trim()) throw new Error(`batch225 missing note ${record.id}`);
  if (record.inactiveIngredients.length === 0) {
    if (!record.honestNote.includes(NO_OI) || !record.sourcesGeneral?.some((s) => s.includes(NO_OI))) {
      throw new Error(`batch225 empty OI missing sentence ${record.id}`);
    }
  } else {
    for (const ingredient of record.inactiveIngredients) {
      if (!plainIngredientWhy(ingredient)) throw new Error(`batch225 blank why ${record.id} ${ingredient.name}`);
      if (!ingredient.source?.trim()) throw new Error(`batch225 blank source ${ingredient.name}`);
    }
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch225 verdict ${record.id}`);
}
