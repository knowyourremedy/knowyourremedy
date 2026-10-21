// DRAFT / not verified / batch 255 KYR6-d. Does not repeat rows from 796, 805, 806, 811, 812, 813, 814, or 815.

import type { RatingRecord } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

export const BATCH255_KYR6D_T159U: RatingRecord[] = [
  {
    id: 'benefiber-b255-powder-124',
    productName: 'Benefiber Original Powder, Unflavored (124 teaspoons / 8.7 oz)',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b248-powder-wheat-dextrin',
    audience: ADULT,
    minAge: 6,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '886790216209',
    activeIngredients: [{ name: 'Wheat dextrin', strength: '3 g fiber per 2 teaspoons' }],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['Amazon', 'Meijer', 'Laketown Pharmacy'],
    sourcesGeneral: [
      'Wheat dextrin is the only ingredient and it is the fiber active, so there is no other-ingredient token and the row is Clean. Amazon is in stock, sold by Amazon.com, 8.7 oz pack of 1, 124 teaspoons, and prints UPC 886790216209 with wheat dextrin. Meijer is in stock at Alpine for the 8.7 oz / 62-serving bottle and prints wheat dextrin. Laketown Pharmacy lists the same 8.7 oz bottle as available and prints UPC 886790216209 and wheat dextrin. This is not the 125-serving / 17.6 oz row. The 410-teaspoon club pack is not a row. Ages 6 to 11 use a smaller teaspoon dose. UPC check digit OK.',
    ],
  },
];

const ROWS = BATCH255_KYR6D_T159U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch255 row count ${ROWS.length}`);
for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch255 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch255 unexpected honest note ${record.id}`);
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch255 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
