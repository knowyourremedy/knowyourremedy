// DRAFT / not verified / batch 259 KYR6-d (t18u).
// FlorastorKids 30 sticks. Same other-ingredient line as florastor-b222-kids-20.
// Brand page is out of stock. Vitacost is the in-stock sale page.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;

const PANEL =
  'florastor.com FlorastorKids Dual Action product page (30 ct out of stock; other ingredients viewed). Vitacost Florastor Kids Probiotic Supplement Powder 30 sticks, in stock';

const METH = {
  maltodextrin:
    'Methodology §5 Limited (maltodextrin — organic or non-organic; non-GMO maize source is still this row, not tapioca maltodextrin). Counts toward the t137u stack.',
  lactose: 'Methodology §5 Cleared (lactose / lactose monohydrate).',
} as const;

type MethKey = keyof typeof METH;

function flag(name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${PANEL}; ${METH[meth]}` };
}

const FLAGS: IngredientFlag[] = [
  flag('Maltodextrin (derived from non-GMO maize)', 'limited', 'maltodextrin'),
  flag('Lactose', 'cleared', 'lactose'),
];

export const BATCH259_KYR6D_T18U: RatingRecord[] = [
  {
    id: 'florastor-b259-kids-30',
    productName: 'FlorastorKids Dual Action Probiotic Supplement (30 sticks, 250 mg)',
    brand: 'Florastor',
    category: 'Digestive',
    formulaId: 'florastor-b222-kids',
    audience: KIDS,
    minAge: 0,
    form: 'powder packet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '704142000378',
    activeIngredients: [{ name: 'Saccharomyces boulardii CNCM I-745', strength: '250 mg' }],
    inactiveIngredients: FLAGS,
    verdict: 'caution',
    retailers: ['Vitacost', 'Florastor'],
    sourcesGeneral: [
      'Saccharomyces boulardii CNCM I-745 is the probiotic active and is not graded. Maltodextrin (derived from non-GMO maize) is the one stack-eligible Limited token, so the row is Caution. Lactose is Cleared. This is not a 3+ Limited stack. florastor.com FlorastorKids Dual Action page opened and printed Other ingredients: Maltodextrin (derived from non-GMO maize), lactose (derived from milk). The 30 ct control on that page is Out of stock (listed $28.99). Vitacost https://www.vitacost.com/products/florastor-kids-probiotic-supplement-powder-30-sticks-157610 opened in stock at $30.44 with Add to cart, UPC 704142000378, and the same maltodextrin and lactose line. UPC check digit OK. Not the 20-stick row florastor-b222-kids-20.',
    ],
  },
];

const ROWS = BATCH259_KYR6D_T18U;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch259 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch259 duplicate id');

for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch259 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.verdict !== rollup.verdict) {
    throw new Error(`batch259 verdict ${record.id}: wrote ${record.verdict}, expected ${rollup.verdict}`);
  }
  if (record.honestNote) throw new Error(`batch259 unexpected note ${record.id}`);
  if (rollup.cause === 'limited_stack') throw new Error(`batch259 unexpected stack ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch259 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why)) throw new Error(`batch259 pending ${ingredient.name}`);
  }
}
