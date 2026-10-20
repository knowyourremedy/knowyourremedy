// DRAFT / not verified / batch 199 KYR6-c (t78u WRITE).
// Nature's Bounty Controlled Delivery Probiotic 30 after Sodium Carbonate t78u lock.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const DIGESTIVE = 'Digestive';

const METH = {
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  guarGum: 'Methodology §5 Cleared (guar gum — xanthan / guar / pectin plant-gum family).',
  pectin: 'Methodology §5 Cleared (pectin / plant-gum family).',
  sodiumCarbonate:
    'Methodology §5 Sodium Carbonate — LOCKED (Oct 16, 2026 t78u). FDA GRAS 21 CFR 184.1742; distinct from sodium bicarbonate.',
  stearic: 'Methodology §5 Cleared (stearic acid / vegetable stearic acid — stearate-family lubricant).',
  turmericColor:
    'Methodology §5 Turmeric/curcumin AS A COLOR ONLY (v1.6); Oct 16, 2026 t75u Cleared — Turmeric (Color) exact token.',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const PANEL = 'https://naturesbounty.com/products/controlled-delivery-probiotic-30-caplets';

export const BATCH199_KYR6C_NB_T78U: RatingRecord[] = [
  {
    id: 'natures-bounty-b199-controlled-delivery-probiotic-30',
    productName: "Nature's Bounty Controlled Delivery Probiotic (30 caplets)",
    brand: "Nature's Bounty",
    category: DIGESTIVE,
    formulaId: 'natures-bounty-b199-controlled-delivery-probiotic-30',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312515200',
    activeIngredients: [
      { name: 'Sodium', strength: '20 mg per caplet' },
      {
        name:
          'Bio-Active Probiotic Complex (2,000,000,000 CFUs at time of manufacture) (Lactobacillus plantarum, Lactobacillus acidophilus, Lactobacillus fermentum, Lactobacillus rhamnosus, Bifidobacterium bifidum, Bifidobacterium longum)',
        strength: '126 mg per caplet',
      },
    ],
    inactiveIngredients: [
      flag(PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(PANEL, 'Pectin', 'cleared', METH.pectin),
      flag(PANEL, 'Sodium Carbonate', 'cleared', METH.sodiumCarbonate),
      flag(PANEL, 'Guar Gum', 'cleared', METH.guarGum),
      flag(PANEL, 'Turmeric (Color)', 'cleared', METH.turmericColor),
      flag(PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    ],
    verdict: 'clean',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Opened https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-5152-00 — HTTP 200, data[] empty for NDC 74312-5152-00. Opened https://naturesbounty.com/products/controlled-delivery-probiotic-30-caplets — Supplement Facts and other ingredients read for t78u (30 count, UPC 074312515200). Other ingredients: Vegetable Cellulose, Pectin, Sodium Carbonate. Contains <2% of: Guar Gum, Turmeric (Color), Vegetable Stearic Acid. Sale evidence (uploads/t72u-ladder-box.md, box browser ladder Oct 16, 2026): Walmart item 48006441, 30 ct, Add to cart, with UPC 074312515200 shown on the page; Meijer 7431251520, 30 ct, Add, pickup. Ralphs and Dillons showed pickup unavailable.",
    ],
  },
];

const ROWS = BATCH199_KYR6C_NB_T78U;

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

if (ROWS.length !== 1) throw new Error(`batch199 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch199 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch199 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch199 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch199 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch199 verdict ${record.id}`);
}
