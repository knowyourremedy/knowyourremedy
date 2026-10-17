// DRAFT / not verified / batch 202 KYR6-c (t84u/t85u WRITE).
// Rainbow Light seven packs — brand label OI; UPC when Target and brand gtin12 agree (t85u).

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMINS = 'Vitamins';
const IMMUNE = 'Immune Support';
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  calciumCarbonate: 'Methodology §5 Cleared (calcium carbonate as mineral salt / buffer).',
  carnauba: 'Methodology §5 Caution (carnauba wax).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  celluloseCoating:
    'Methodology §5 Cleared (cellulose-family / Cellulose Coating — t83u Oct 17, 2026).',
  celluloseGum: 'Methodology §5 Cleared (cellulose gum / sodium carboxymethyl cellulose family).',
  cellulosePlant:
    'Methodology §5 Cleared (cellulose-family / Cellulose (Plant Origin) — t83u Oct 17, 2026).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  riboflavinColor: 'Methodology §5 Cleared (riboflavin used as color).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  starch: 'Methodology §5 Cleared (starch as filler).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const RL_W50_90 =
  'https://www.rainbowlight.com/products/womens-one-50-plus-real-food-nutrients-90-vegetarian-caplets-rl20423';
const RL_W50_120 =
  'https://www.rainbowlight.com/products/womens-one-50-plus-real-food-nutrients-120-vegetarian-caplets-rl20424';
const RL_M_120 =
  'https://www.rainbowlight.com/products/mens-one-real-food-nutrients-120-vegetarian-caplets-rl20394';
const RL_M_150 =
  'https://www.rainbowlight.com/products/mens-one-real-food-nutrients-150-vegetarian-caplets-rl20395';
const RL_M50_120 =
  'https://www.rainbowlight.com/products/mens-one-50-plus-real-food-nutrients-120-vegetarian-caplets-rl20405';
const RL_PRENATAL_150 =
  'https://www.rainbowlight.com/products/prenatal-one-real-food-nutrients-150-vegan-caplets-rl20432';
const RL_COUNTER_90 =
  'https://www.rainbowlight.com/products/counter-attack-90-vegan-caplets-rl20132';

const IMG_W50_90 =
  'RL20423_WomenOne_205090ct_Rev_20B_Square_20Thumbnail_Supplement_20Facts_75pct_009c278d-....jpg';
const IMG_W50_120 = 'RL20424_Womens-One-50plus_Supplement-Facts_75pct_RevB_....jpg';
const IMG_M_120 = "RL20394_Men_s_20One_Rev_20B_..._Supplement_20Facts_75q_....jpg";
const IMG_M_150 = "RL20395_Men_s_20One_20150ct_Rev_20A_..._Supplement_20Facts_75pct_....jpg";
const IMG_M50_120 =
  'resizedRL20405Mens_20One_2050_20120ctRev_20ASquare_20ThumbnailSupplement_20Facts.jpg';
const IMG_PRENATAL_150 = 'RL20432_Prenatal_20One_20150ct_Rev_20C_Thumbnail_Supplement_20Facts.jpg';
const IMG_COUNTER_90 = 'RL20132_Rev_20B_Counter_20Attack_Thumbnails_Supplement_20Facts_....jpg';

function womens50BaseOi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Cellulose Gum', 'cleared', METH.celluloseGum),
    flag(panel, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    flag(panel, 'Silica', 'limited', METH.silica),
    flag(panel, 'Cellulose Coating', 'cleared', METH.celluloseCoating),
  ];
}

function mens120Oi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Croscarmellose Sodium', 'cleared', METH.croscarmellose),
    flag(panel, 'Hydroxypropyl Cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Carnauba Wax', 'limited', METH.carnauba),
  ];
}

function mens50Plus120Oi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Cellulose Gum', 'cleared', METH.celluloseGum),
    flag(panel, 'Silica', 'limited', METH.silica),
    flag(panel, 'Hydroxypropyl Cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Carnauba Wax', 'limited', METH.carnauba),
  ];
}

function counterAttackOi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Starch', 'cleared', METH.starch),
    flag(panel, 'Cellulose Gum', 'cleared', METH.celluloseGum),
    flag(panel, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    flag(panel, 'Silica', 'limited', METH.silica),
    flag(panel, 'Cellulose Coating', 'cleared', METH.celluloseCoating),
    flag(panel, 'Calcium Carbonate', 'cleared', METH.calciumCarbonate),
    flag(panel, 'Riboflavin (Color)', 'cleared', METH.riboflavinColor),
  ];
}

const W50_ACTIVES = [
  {
    name: 'Multivitamin / multimineral',
    strength:
      '1 caplet (vitamin D3 50 mcg, vitamin B12 10 mcg, iron 6 mg, calcium 100 mg from red algae; Women\'s 50+ Botanical Blend 125 mg — black cohosh, ginkgo, ashwagandha, chlorella)',
  },
];

const MENS_ACTIVES = [
  {
    name: 'Multivitamin / multimineral',
    strength:
      "1 caplet (vitamin D3 50 mcg, chromium 100 mcg, no iron; Men's Botanical Blend 66 mg — ashwagandha, green tea extract, chlorella, lycopene)",
  },
];

const MENS50_ACTIVES = [
  {
    name: 'Multivitamin / multimineral',
    strength:
      "1 caplet (vitamin D3 50 mcg, chromium 100 mcg; Men's 50+ Botanical Blend 51 mg — rhodiola, saw palmetto, chlorella, lycopene)",
  },
];

const PRENATAL_ACTIVES = [
  {
    name: 'Prenatal multivitamin / multimineral',
    strength:
      '1 caplet (folate 600 mcg DFE, iron 27 mg, iodine 290 mcg, vitamin D2 15 mcg; Gentle Prenatal Blend 97 mg — ginger, peppermint, chlorella, B. coagulans)',
  },
];

const COUNTER_ACTIVES = [
  { name: 'Vitamin C', strength: '240 mg per 2 caplets (ascorbic acid, amla)' },
  { name: 'Zinc', strength: '10 mg per 2 caplets' },
  {
    name: 'Support Bolstering Botanical Blend',
    strength: '104 mg per 2 caplets (berberine HCl, Turkish origanum oil)',
  },
  {
    name: 'Mobilizing Herbal Complex',
    strength:
      '840 mg per 2 caplets (elderberry, andrographis, dyer\'s woad, shrubby sophora)',
  },
  {
    name: 'Immune Guard Clear Complex',
    strength:
      '942 mg per 2 caplets (yerba santa, xanthium, polygala, echinacea, coptis, ligusticum, mullein, Chinese licorice, peppermint oil)',
  },
];

export const BATCH202_KYR6C_RAINBOW_T84U: RatingRecord[] = [
  {
    id: 'rainbow-b202-womens-one-50-plus-90',
    productName: "Rainbow Light Women's One 50+ (90 caplets)",
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b202-womens-one-50-plus-90',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888204236',
    activeIngredients: W50_ACTIVES,
    inactiveIngredients: womens50BaseOi(RL_W50_90),
    verdict: 'caution',
    retailers: ['Target', 'Meijer'],
    sourcesGeneral: [
      `Brand page ${RL_W50_90} supplement-facts image ${IMG_W50_90} was read. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Vegetable Magnesium Stearate, Silica, Cellulose Coating. Brand gtin12 021888204236. Target opened https://www.target.com/p/-/A-1012060915 with UPC 021888204236. Meijer opened https://www.meijer.com/shopping/product/rainbow-light-women-s-one-50-high-potency-multivitamin-90-ct/2188820423 in stock. Target and Meijer print older other-ingredient text (microcrystalline cellulose, maltodextrin, hydroxypropyl cellulose / hypromellose coating, croscarmellose sodium); this row is graded from the current brand label only. Walmart 90-count was out of stock and was not used as a source.`,
    ],
  },
  {
    id: 'rainbow-b202-womens-one-50-plus-120',
    productName: "Rainbow Light Women's One 50+ (120 caplets)",
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b202-womens-one-50-plus-120',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888204243',
    activeIngredients: W50_ACTIVES,
    inactiveIngredients: womens50BaseOi(RL_W50_120),
    verdict: 'caution',
    retailers: ['Target', 'Walmart'],
    sourcesGeneral: [
      `Brand page ${RL_W50_120} supplement-facts image ${IMG_W50_120} was read. Other ingredients match the 90-count Women's One 50+ brand label. Brand gtin12 021888204243. Target opened https://www.target.com/p/-/A-93371517 with UPC 021888204243. Walmart opened https://www.walmart.com/ip/5247192805 with sale. Target and Walmart print other-ingredient text with coating (hydroxypropyl cellulose, hypromellose) and carnauba wax instead of the brand Cellulose Coating line; this row is graded from the current brand label only.`,
    ],
  },
  {
    id: 'rainbow-b202-mens-one-120',
    productName: "Rainbow Light Men's One (120 caplets)",
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b202-mens-one-120',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888217151',
    activeIngredients: MENS_ACTIVES,
    inactiveIngredients: mens120Oi(RL_M_120),
    verdict: 'caution',
    retailers: ['Target', 'Walmart'],
    sourcesGeneral: [
      `Brand page ${RL_M_120} supplement-facts image ${IMG_M_120} was read. Other ingredients: Cellulose (Plant Origin), Croscarmellose Sodium, Coating (Hydroxypropyl Cellulose, Hypromellose), Carnauba Wax. Brand gtin12 021888217151. Target opened https://www.target.com/p/-/A-89544356 with UPC 021888217151. Target prints different other-ingredient text (microcrystalline cellulose, coating with hypromellose, medium chain triglycerides, inulin). Walmart opened https://www.walmart.com/ip/509836030; its other-ingredient text matches the brand panel. This row is graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b202-mens-one-150',
    productName: "Rainbow Light Men's One (150 caplets)",
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b202-mens-one-150',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888108930',
    activeIngredients: MENS_ACTIVES,
    inactiveIngredients: womens50BaseOi(RL_M_150),
    verdict: 'caution',
    retailers: ['Target', 'Walmart'],
    sourcesGeneral: [
      `Brand page ${RL_M_150} supplement-facts image ${IMG_M_150} was read. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Vegetable Magnesium Stearate, Silica, Cellulose Coating. Brand gtin12 021888108930. Target opened https://www.target.com/p/-/A-1010549361 with UPC 021888108930. Target prints older other-ingredient text (microcrystalline cellulose, maltodextrin, coating with carnauba wax, croscarmellose sodium). Walmart opened https://www.walmart.com/ip/25524977 with sale; that page did not show an other-ingredient line. This row is graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b202-mens-one-50-plus-120',
    productName: "Rainbow Light Men's One 50+ (120 caplets)",
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b202-mens-one-50-plus-120',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888204052',
    activeIngredients: MENS50_ACTIVES,
    inactiveIngredients: mens50Plus120Oi(RL_M50_120),
    verdict: 'caution',
    retailers: ['Target', 'Walmart'],
    sourcesGeneral: [
      `Brand page ${RL_M50_120} supplement-facts image ${IMG_M50_120} was read. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Silica, Coating (Hydroxypropyl Cellulose, Hypromellose), Carnauba Wax. Brand gtin12 021888204052. Target opened https://www.target.com/p/-/A-93371528 with UPC 021888204052. Target prints older other-ingredient text (microcrystalline cellulose, croscarmellose sodium, maltodextrin, hydroxypropyl methylcellulose coating). Walmart opened https://www.walmart.com/ip/13522873225 with sale; that page did not show an other-ingredient line. This row is graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b202-prenatal-one-150',
    productName: 'Rainbow Light Prenatal One (150 caplets)',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b202-prenatal-one-150',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888109760',
    activeIngredients: PRENATAL_ACTIVES,
    inactiveIngredients: womens50BaseOi(RL_PRENATAL_150),
    verdict: 'caution',
    retailers: ['Target', 'Walmart'],
    sourcesGeneral: [
      `Brand page ${RL_PRENATAL_150} supplement-facts image ${IMG_PRENATAL_150} was read. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Vegetable Magnesium Stearate, Silica, Cellulose Coating. Brand gtin12 021888109760. Target opened https://www.target.com/p/-/A-1010549363 with UPC 021888109760; Target did not print an other-ingredient line. Walmart opened https://www.walmart.com/ip/25524890 with sale. Walmart prints older other-ingredient text (microcrystalline cellulose, croscarmellose sodium, magnesium stearate, hydroxypropyl cellulose coating, silica, stearic acid). This row is graded from the brand label only. Audience adult; no separate prenatal audience row exists on MAIN.`,
    ],
  },
  {
    id: 'rainbow-b202-counter-attack-90',
    productName: 'Rainbow Light Counter Attack (90 caplets)',
    brand: 'Rainbow Light',
    category: IMMUNE,
    formulaId: 'rainbow-b202-counter-attack-90',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '021888201327',
    activeIngredients: COUNTER_ACTIVES,
    inactiveIngredients: counterAttackOi(RL_COUNTER_90),
    verdict: 'caution',
    retailers: ['Target', 'Walmart'],
    sourcesGeneral: [
      `Brand page ${RL_COUNTER_90} supplement-facts image ${IMG_COUNTER_90} was read. Serving size 2 caplets. Other ingredients: Cellulose (Plant Origin), Starch, Cellulose Gum, Vegetable Magnesium Stearate, Silica, Cellulose Coating, Calcium Carbonate, Riboflavin (Color). Brand gtin12 021888201327. Target opened https://www.target.com/p/-/A-87092423 with UPC 021888201327. Target prints other-ingredient text with hypromellose / polydextrose / riboflavin / calcium carbonate / maltodextrin / medium chain triglycerides coating plus hydroxypropyl cellulose and microcrystalline cellulose. Walmart opened https://www.walmart.com/ip/26960147 with sale. This row is graded from the current brand label only. Tab Immune Support matches batch9 herbal immune rows (e.g. Source Naturals Wellness Formula).`,
    ],
  },
];

const ROWS = BATCH202_KYR6C_RAINBOW_T84U;

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

if (ROWS.length !== 7) throw new Error(`batch202 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch202 duplicate id');

for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch202 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch202 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch202 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch202 verdict ${record.id}`);
}
