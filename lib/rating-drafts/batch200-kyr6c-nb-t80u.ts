// DRAFT / not verified / batch 200 KYR6-c (t80u WRITE).
// Nature's Bounty Quercetin 500 mg, 60 capsules — founder-confirmed panel (no ladder).

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const IMMUNE = 'Immune Support';

const METH = {
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin / organic maltodextrin).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  silica:
    'Methodology §5 Caution (silicon dioxide / silica, oral — nanoparticle precautionary cap).',
  stearic: 'Methodology §5 Cleared (stearic acid / vegetable stearic acid — stearate-family lubricant).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const PANEL = 'https://naturesbounty.com/products/quercetin-ester-c';

export const BATCH200_KYR6C_NB_T80U: RatingRecord[] = [
  {
    id: 'natures-bounty-b200-quercetin-500-60',
    productName: "Nature's Bounty Quercetin 500 mg (60 capsules)",
    brand: "Nature's Bounty",
    category: IMMUNE,
    formulaId: 'natures-bounty-b200-quercetin-500-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '074312014048',
    activeIngredients: [
      { name: 'Vitamin C (as Ester-C®, Calcium Ascorbate)', strength: '500 mg per 2 capsules' },
      { name: 'Calcium (as Ester-C®, Calcium Ascorbate)', strength: '50 mg per 2 capsules' },
      { name: 'Quercetin', strength: '500 mg per 2 capsules' },
      { name: 'Bromelain (2,000 GDU/g)', strength: '50 mg per 2 capsules' },
      { name: 'Citrus Bioflavonoid Complex', strength: '50 mg per 2 capsules' },
      { name: 'Rose Hips (fruit)', strength: '50 mg per 2 capsules' },
      { name: 'Acerola Extract (berry)', strength: '50 mg per 2 capsules' },
      { name: 'Rutin', strength: '10 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag(PANEL, 'Vegetable Cellulose', 'cleared', METH.cellulose),
      flag(PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(PANEL, 'Silica', 'limited', METH.silica),
      flag(PANEL, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(PANEL, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    ],
    verdict: 'caution',
    retailers: [],
    sourcesGeneral: [
      "Founder-confirmed panel (t80u, Oct 17, 2026). No retailer ladder or search for this write. Pack: Nature's Bounty Quercetin 500 mg, 60 count, UPC 074312014048. Serving size 2 capsules. Supplement Facts actives and other ingredients match founder read for https://naturesbounty.com/products/quercetin-ester-c. Other ingredients: Vegetable Cellulose. Contains <2% of: Maltodextrin, Silica, Vegetable Magnesium Stearate, Vegetable Stearic Acid.",
    ],
  },
];

const ROWS = BATCH200_KYR6C_NB_T80U;

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

if (ROWS.length !== 1) throw new Error(`batch200 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch200 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch200 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch200 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch200 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch200 verdict ${record.id}`);
}
