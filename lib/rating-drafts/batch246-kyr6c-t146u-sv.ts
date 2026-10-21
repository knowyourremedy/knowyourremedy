// DRAFT / not verified / batch 246 KYR6-c (t146u Spring Valley WRITE — store-brand exception; founder second-source waiver).
// One pack — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';

const METH = {
  glucoseSyrup:
    'Methodology §5 Cleared (cane sugar, glucose syrup, tapioca syrup/dextrose — acceptable sweeteners; distinct from Caution bare glucose).',
  sucrose:
    'Methodology §5 Cleared (Sucrose — LOCKED Oct 17, 2026 t118u; founder override; distinct from Limited beet sugar and Caution bare sugar).',
  gelatin: 'Methodology §5 Cleared (gelatin — gummy / capsule base).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers/buffers).',
  lactic: 'Methodology §5 Cleared (lactic acid / malic acid — organic acids with citric).',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity, not a known hazard).',
  purpleCarrotColor:
    'Methodology §5 Cleared (Purple Carrot Juice Concentrate (color) — t132u Black/Purple Carrot Juice Concentrate (Color); Oct 15 fruit/vegetable juice-as-color lock; named plant color).',
  annatto:
    'Methodology §5 Caution (annatto (bixin/norbixin, E160b) — documented allergenic potential in chronic urticaria patients; EFSA review; Caution cap, not stacked per t141u).',
  turmericColor:
    'Methodology §5 Cleared (Turmeric (color) — trace color-additive use levels only; E100; distinct from Caution oleoresin turmeric).',
  fractionatedCoconut:
    'Methodology §5 Cleared (Fractionated Coconut Oil in a gummy — coconut-in-gummy exception; NOT seed-oil High; LOCKED Sept 16, 2026).',
  carnauba:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  beeswax: 'Methodology §5 Cleared (beeswax / yellow beeswax — wax row).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_PRENATAL_DHA =
  'Amazon ASIN B0DPVQ8MRD supplement facts label image (founder-verified label and UPC t146u Oct 21, 2026)';

export const BATCH246_KYR6C_T146U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b246-prenatal-dha-gummy-90',
    productName: 'Spring Valley Prenatal Multivitamin Gummies with DHA (90 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b246-prenatal-dha-gummy-90',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '198715860870',
    activeIngredients: [
      { name: 'Calories', strength: '20' },
      { name: 'Total Carbohydrate', strength: '4 g (1%†)' },
      { name: 'Total Sugars', strength: '3 g' },
      { name: 'Includes Added Sugars', strength: '3 g (6%†)' },
      { name: 'Vitamin A (as Retinyl Palmitate)', strength: '650 mcg (50%)' },
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '20 mg (17%)' },
      { name: 'Vitamin D (as Cholecalciferol)', strength: '20 mcg (133%)' },
      { name: 'Vitamin E (as D-Alpha Tocopheryl Acetate)', strength: '19 mg (100%)' },
      { name: 'Niacin (as Inositol Niacinate)', strength: '18 mg (100%)' },
      { name: 'Vitamin B6 (as Pyridoxine Hydrochloride)', strength: '2 mg (100%)' },
      {
        name: 'Folate (as Folic Acid)',
        strength: '600 mcg DFE (360 mcg folic acid) (100%)',
      },
      { name: 'Vitamin B12 (as Cyanocobalamin)', strength: '2.8 mcg (100%)' },
      { name: 'Biotin', strength: '35 mcg (100%)' },
      { name: 'Iodine (as Potassium Iodide)', strength: '220 mcg (76%)' },
      { name: 'Zinc (as Zinc Chelate)', strength: '3.8 mg (29%)' },
      { name: 'Sodium', strength: '5 mg (<1%)' },
      { name: 'Omega-3 Fatty Acids (from Fish Oil)', strength: '70 mg (DV not established)' },
      { name: 'DHA', strength: '50 mg' },
      { name: 'EPA', strength: '10 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_PRENATAL_DHA, 'Glucose Syrup', 'cleared', 'glucoseSyrup'),
      flag(PANEL_PRENATAL_DHA, 'Sucrose', 'cleared', 'sucrose'),
      flag(PANEL_PRENATAL_DHA, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_PRENATAL_DHA, 'Citric Acid', 'cleared', 'citric'),
      flag(PANEL_PRENATAL_DHA, 'Lactic Acid', 'cleared', 'lactic'),
      flag(PANEL_PRENATAL_DHA, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(
        PANEL_PRENATAL_DHA,
        'Purple Carrot Juice Concentrate (Color)',
        'cleared',
        'purpleCarrotColor',
      ),
      flag(PANEL_PRENATAL_DHA, 'Annatto', 'moderate', 'annatto'),
      flag(PANEL_PRENATAL_DHA, 'Turmeric (Color)', 'cleared', 'turmericColor'),
      flag(PANEL_PRENATAL_DHA, 'Fractionated Coconut Oil', 'cleared', 'fractionatedCoconut'),
      flag(PANEL_PRENATAL_DHA, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(PANEL_PRENATAL_DHA, 'Beeswax', 'cleared', 'beeswax'),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u–t146u). **Founder t146u override:** founder personally verified this label and UPC on Amazon ASIN B0DPVQ8MRD and waived the usual second in-stock US sale source and second agreeing UPC corroboration for this pack. Panel ${PANEL_PRENATAL_DHA}. Serving 2 gummies (45 servings); % DV for pregnant or lactating women. Fish-oil omega-3, DHA, EPA, and Supplement Facts vitamins/minerals supply actives and are not graded as other ingredients. Other ingredients verbatim: GLUCOSE SYRUP, SUCROSE, GELATIN, CITRIC ACID, LACTIC ACID, NATURAL FLAVORS, COLORS ADDED (PURPLE CARROT JUICE CONCENTRATE, ANNATTO, TURMERIC), FRACTIONATED COCONUT OIL (CONTAINING ONE OR MORE OF: CARNAUBA WAX, BEESWAX). Colors Added is a heading only — named colors graded separately. Amazon https://www.amazon.com/dp/B0DPVQ8MRD in stock at t146u read (sold by third-party listing; UPC 198715860870 on product detail). UPC 198715860870 = founder-verified = Amazon product data; check digit OK. Distinct from Walmart ip/873641 (681131056861) and ip/590277068 (681131281331) formulas. No DSLD record under this UPC.`,
    ],
  },
];

const ROWS = BATCH246_KYR6C_T146U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch246 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch246 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch246 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch246 unexpected honestNote ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch246 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch246 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch246 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
