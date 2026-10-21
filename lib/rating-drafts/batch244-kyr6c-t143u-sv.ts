// DRAFT / not verified / batch 244 KYR6-c (t143u Spring Valley WRITE — store-brand exception).
// One pack — founder-ordered; t143u waives second sale source and second UPC corroboration.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const HERBS = 'Herbs';

const METH = {
  ricePowder:
    'Methodology §5 Cleared (Rice Powder — LOCKED t132u Oct 20, 2026; §4 prior-lock re-eval; exact token Cleared; distinct from Caution rice flour and organic rice meal; not rice hull/rice bran by alias alone).',
  hpmc:
    'Methodology §5 Cleared (Hydroxypropyl Methylcellulose / hypromellose / HPMC: ADI "not specified"; no genotox/carcinogenicity/repro findings per JECFA/EFSA; maps to Hypromellose row).',
  gellan:
    'Methodology §5 Cleared (gellan gum — LOCKED v1.6; standard food gums; Cleared-by-class with xanthan/guar/acacia/pectin family).',
  stearic:
    'Methodology §5 Cleared (stearic acid — stearate-family lubricant with magnesium stearate; EFSA 2018: no safety concern).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_ST_JOHNS =
  'Walmart ip/206029033 supplement facts label image (founder-confirmed active label; t143u Oct 21, 2026)';

export const BATCH244_KYR6C_T143U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b244-st-johns-wort-300-150',
    productName: "Spring Valley St. John's Wort Extract, 300 mg (150 vegetarian capsules)",
    brand: BRAND,
    category: HERBS,
    formulaId: 'springvalley-b244-st-johns-wort-300-150',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131355216',
    activeIngredients: [
      {
        name: "St. John's Wort Extract (Hypericum perforatum) (aerial parts)",
        strength: '300 mg per capsule (Daily Value not established)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_ST_JOHNS, 'Rice Powder', 'cleared', 'ricePowder'),
      flag(PANEL_ST_JOHNS, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_ST_JOHNS, 'Gellan Gum', 'cleared', 'gellan'),
      flag(PANEL_ST_JOHNS, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'clean',
    retailers: ['Walmart'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u–t143u). **t143u founder override:** founder confirmed this active Walmart label and waived the usual second in-stock US sale source and second agreeing UPC corroboration for this pack. Panel ${PANEL_ST_JOHNS}. Serving 1 vegetarian capsule (150 servings). St. John's Wort Extract on the ingredient line supplies Supplement Facts actives and is not graded as an other ingredient. Other ingredients verbatim: ST. JOHN'S WORT EXTRACT, RICE POWDER, HYDROXYPROPYL METHYLCELLULOSE. CONTAINS 2% OR LESS OF: GELLAN GUM, STEARIC ACID. Walmart ip/206029033 in stock at $12.94, sold and shipped by Walmart.com (read Oct 20, 2026). UPC 681131355216 = Walmart page data; check digit OK.`,
    ],
  },
];

const ROWS = BATCH244_KYR6C_T143U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch244 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch244 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch244 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch244 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch244 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch244 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
