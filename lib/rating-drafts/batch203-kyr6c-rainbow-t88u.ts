// DRAFT / not verified / batch 203 KYR6-c (t88u WRITE).
// Rainbow Light three packs — brand label OI; UPC when Target and brand gtin12 agree (t85u).

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMINS = 'Vitamins';
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  celluloseGum: 'Methodology §5 Cleared (cellulose gum / sodium carboxymethyl cellulose family).',
  cellulosePlant:
    'Methodology §5 Cleared (cellulose-family / Cellulose (Plant Origin) — t83u Oct 17, 2026).',
  crospovidone: 'Methodology §5 Cleared (crospovidone / povidone family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  organicPlantCoating:
    'Methodology §5 Cleared (cellulose-family / Organic Plant-Based Coating — t87u Oct 17, 2026).',
  riceProtein:
    'Methodology §5 Cleared (brown rice protein concentrate / rice protein — t87u Oct 17, 2026).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  stearic: 'Methodology §5 Cleared (stearic acid / vegetable stearic acid — stearate-family lubricant).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const RL_TEEN_90 =
  'https://www.rainbowlight.com/products/active-health-teen-with-dermacomplex-real-food-nutrients-90-vegan-caplets-rl11202';
const RL_CALCIUM_120 =
  'https://www.rainbowlight.com/products/calcium-citrate-mini-tablets-real-food-nutrients-120-vegan-mini-tablets-rl20211';
const RL_POSTNATAL_120 =
  'https://www.rainbowlight.com/products/postnatal-multivitamin-superfood-blend-probiotics-120-vegetarian-capsules-rl78161';

const IMG_TEEN_90 = 'RL11202 supplement-facts image (brand panel)';
const IMG_CALCIUM_120 = 'RL20211 supplement-facts image (brand panel)';
const IMG_POSTNATAL_120 = 'RL78161 supplement-facts image (brand panel)';

export const BATCH203_KYR6C_RAINBOW_T88U: RatingRecord[] = [
  {
    id: 'rainbow-b203-active-health-teen-90',
    productName:
      'Rainbow Light Active Health Teen with DermaComplex + Real Food Nutrients, 90 Vegan Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b203-active-health-teen-90',
    audience: ADULT,
    minAge: 13,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888112029',
    activeIngredients: [
      { name: 'Teen multivitamin / DermaComplex blend', strength: '3 caplets (label serving)' },
    ],
    inactiveIngredients: [
      flag(RL_TEEN_90, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
      flag(RL_TEEN_90, 'Cellulose Gum', 'cleared', METH.celluloseGum),
      flag(RL_TEEN_90, 'Crospovidone', 'cleared', METH.crospovidone),
      flag(RL_TEEN_90, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(RL_TEEN_90, 'Silica', 'limited', METH.silica),
      flag(RL_TEEN_90, 'Organic Plant-Based Coating', 'cleared', METH.organicPlantCoating),
    ],
    verdict: 'caution',
    retailers: ['Target', 'Walmart'],
    sourcesGeneral: [
      `Brand page ${RL_TEEN_90} supplement-facts image ${IMG_TEEN_90} was read. Serving size 3 caplets. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Crospovidone, Vegetable Magnesium Stearate, Silica, Organic Plant-Based Coating. Brand gtin12 021888112029. Target opened https://www.target.com/p/-/A-89544349 with UPC 021888112029. Walmart opened https://www.walmart.com/ip/28646405 with sale. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b203-calcium-citrate-120',
    productName:
      'Rainbow Light Calcium Citrate Mini-Tablets + Real Food Nutrients, 120 Vegan Mini-Tablets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b203-calcium-citrate-120',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888202119',
    activeIngredients: [{ name: 'Calcium (as calcium citrate)', strength: '4 mini-tablets (label serving)' }],
    inactiveIngredients: [
      flag(RL_CALCIUM_120, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
      flag(RL_CALCIUM_120, 'Cellulose Gum', 'cleared', METH.celluloseGum),
      flag(RL_CALCIUM_120, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
      flag(RL_CALCIUM_120, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(RL_CALCIUM_120, 'Silica', 'limited', METH.silica),
      flag(RL_CALCIUM_120, 'Organic Plant-Based Coating', 'cleared', METH.organicPlantCoating),
    ],
    verdict: 'caution',
    retailers: ['Target', 'Walmart'],
    sourcesGeneral: [
      `Brand page ${RL_CALCIUM_120} supplement-facts image ${IMG_CALCIUM_120} was read. Serving size 4 mini-tablets. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Vegetable Stearic Acid, Vegetable Magnesium Stearate, Silica, Organic Plant-Based Coating. Brand gtin12 021888202119. Target opened https://www.target.com/p/-/A-1012060668 with UPC 021888202119. Walmart opened https://www.walmart.com/ip/24811013 with sale. Row graded from the brand label only. Tab Vitamins matches batch202 Rainbow multis and Caltrate rows on MAIN.`,
    ],
  },
  {
    id: 'rainbow-b203-postnatal-120',
    productName:
      'Rainbow Light Postnatal Multivitamin + Superfood Blend + Probiotics, 120 Vegetarian Capsules',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b203-postnatal-120',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888781614',
    activeIngredients: [
      { name: 'Postnatal multivitamin / superfood / probiotic blend', strength: '2 capsules (label serving)' },
    ],
    inactiveIngredients: [
      flag(
        RL_POSTNATAL_120,
        'Capsule (hydroxypropyl methylcellulose)',
        'cleared',
        METH.hpmc,
      ),
      flag(RL_POSTNATAL_120, 'Microcrystalline cellulose', 'cleared', METH.cellulose),
      flag(RL_POSTNATAL_120, 'Brown rice protein concentrate', 'cleared', METH.riceProtein),
    ],
    verdict: 'clean',
    retailers: ['Target', 'Walmart'],
    sourcesGeneral: [
      `Brand page ${RL_POSTNATAL_120} supplement-facts image ${IMG_POSTNATAL_120} was read. Serving size 2 capsules. Other ingredients: Capsule (hydroxypropyl methylcellulose), microcrystalline cellulose, brown rice protein concentrate. Label also prints Contains milk, soy, and wheat traces from enzyme fermentation media; that allergen statement is not graded as an other ingredient. Brand gtin12 021888781614. Target opened https://www.target.com/p/-/A-87092424 with UPC 021888781614. Walmart opened https://www.walmart.com/ip/213040052 with sale. Row graded from the brand label only.`,
    ],
  },
];

const ROWS = BATCH203_KYR6C_RAINBOW_T88U;

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

if (ROWS.length !== 3) throw new Error(`batch203 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch203 duplicate id');

for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch203 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch203 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch203 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch203 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch203 verdict ${record.id}`);
}
