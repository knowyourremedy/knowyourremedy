// DRAFT / not verified / batch 216 KYR6-c (t111u PR D).
// Schiff Neuriva Ultra 40-count — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  riceBran:
    'Methodology §5 Cleared (organic rice bran / rice bran, unspecified bran). Founder override Oct 17, 2026 t111u.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_ULTRA_40 =
  'https://sites.salsify.com/5fe215a7-aa55-4645-b2f8-b2462790a101/823e622b-16a7-4d01-ab64-4ea29e42ea93/product/4786599793/NEURIVA(r)-Ultra-Capsules-1240-ct-';

const ULTRA_FLAGS: FlagSpec[] = [
  ['capsule (hypromellose)', 'cleared', 'hpmc'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Rice bran', 'cleared', 'riceBran'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
  ['Silicon dioxide', 'limited', 'silica'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

const ULTRA_ACTIVES = [
  { name: 'Vitamin B6', strength: '1.7 mg (pyridoxine hydrochloride)' },
  { name: 'Folate', strength: '680 mcg DFE (400 mcg folic acid)' },
  { name: 'Vitamin B12', strength: '2.4 mcg (cyanocobalamin)' },
  { name: 'Alpinia galanga Extract', strength: '300 mg (rhizome, Cognivive)' },
  { name: 'Coffee Fruit Extract', strength: '200 mg (Coffea arabica, Neurofactor)' },
  { name: 'Phosphatidylserine', strength: '100 mg' },
] as const;

export const BATCH216_KYR6C_SCHIFF_T111U_B: RatingRecord[] = [
  {
    id: 'schiff-b216-neuriva-ultra-40',
    productName: 'Schiff Neuriva Ultra (40 capsules)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b215-neuriva-ultra',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865997931',
    activeIngredients: [...ULTRA_ACTIVES],
    inactiveIngredients: buildOi(PANEL_ULTRA_40, ULTRA_FLAGS),
    verdict: verdictFromFlags(ULTRA_FLAGS),
    retailers: ['Target', 'Walgreens', 'CVS'],
    sourcesGeneral: [
      `Salsify CORE 4786599793 Left panel (©2023 RB Health) at ${PANEL_ULTRA_40} and the CVS 40-ct panel image were read. Serving size 2 capsules, 20 servings. Label notes decaffeinated. Actives ungraded. Other ingredients: capsule (hypromellose, titanium dioxide), microcrystalline cellulose, rice bran, magnesium stearate, silicon dioxide. Contains soy. Target A-93486562 in stock $44.99. Walgreens ID=300464519 in stock $44.99. CVS prodid-687877 in stock $54.99. UPC 647865997931 Salsify CORE catalog plus CVS and Kroger image keys; check digit OK.`,
    ],
  },
];

const ROWS = BATCH216_KYR6C_SCHIFF_T111U_B;

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

if (ROWS.length !== 1) throw new Error(`batch216 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch216 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 0 || verdictTally.caution !== 0 || verdictTally.avoid !== 1) {
  throw new Error(`batch216 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch216 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch216 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch216 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch216 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch216 verdict ${record.id}`);
}
