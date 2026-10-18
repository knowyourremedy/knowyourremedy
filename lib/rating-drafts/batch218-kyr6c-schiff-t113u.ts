// DRAFT / not verified / batch 218 KYR6-c (t113u WRITE).
// Schiff Neuriva Brain + Eye 30 — founder-confirmed 2025 panel; grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_BRAIN_EYE_30 =
  'https://sites.salsify.com/5fe215a7-aa55-4645-b2f8-b2462790a101/823e622b-16a7-4d01-ab64-4ea29e42ea93/product/4786519511/NEURIVA(r)-Brain-Performance-Brain-%2B-Eye-1230-ct-';

const BRAIN_EYE_FLAGS: FlagSpec[] = [
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['capsule (hypromellose)', 'cleared', 'hpmc'],
  ['Stearic acid', 'cleared', 'stearic'],
  ['Silicon dioxide', 'limited', 'silica'],
  ['Magnesium stearate', 'cleared', 'magStearate'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

export const BATCH218_KYR6C_SCHIFF_T113U: RatingRecord[] = [
  {
    id: 'schiff-b218-neuriva-brain-eye-30',
    productName: 'Schiff Neuriva Brain + Eye (30 capsules)',
    brand: 'Schiff',
    category: VITAMINS,
    formulaId: 'schiff-b218-neuriva-brain-eye',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '647865195115',
    activeIngredients: [
      { name: 'Vitamin A', strength: '390 mcg (retinyl acetate, 43%)' },
      { name: 'Vitamin C', strength: '90 mg (ascorbic acid, 100%)' },
      { name: 'Vitamin E', strength: '3.6 mg (dl-alpha tocopheryl acetate, 24%)' },
      { name: 'Zinc', strength: '6 mg (zinc sulfate, 54%)' },
      { name: 'Coffee Fruit Extract', strength: '100 mg (Coffea arabica, Neurofactor)' },
      { name: 'Lutein', strength: '10 mg (from marigold flower extract, Tagetes erecta)' },
      { name: 'Zeaxanthin', strength: '2 mg (from marigold flower extract, Tagetes erecta)' },
    ],
    inactiveIngredients: buildOi(PANEL_BRAIN_EYE_30, BRAIN_EYE_FLAGS),
    verdict: verdictFromFlags(BRAIN_EYE_FLAGS),
    retailers: ['Amazon', 'Walgreens', 'Meijer', 'Vitacost'],
    sourcesGeneral: [
      `Founder confirmed the current 2025 panel and Amazon as the second sale source (t113u). Salsify CORE Right panel ${PANEL_BRAIN_EYE_30} (©2025 RB Health) read: serving size 1 capsule; actives ungraded. Other ingredients: microcrystalline cellulose, capsule (hypromellose), stearic acid, silicon dioxide, magnesium stearate. No titanium dioxide. Walgreens ID=300420429 in stock $31.99. Meijer inStock $30.99. Vitacost Add to cart $33.39. UPC 647865195115: Salsify CORE catalog, Vitacost, and Kroger/CVS image keys; check digit OK.`,
    ],
  },
];

const ROWS = BATCH218_KYR6C_SCHIFF_T113U;

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

if (ROWS.length !== 1) throw new Error(`batch218 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch218 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 0 || verdictTally.caution !== 1 || verdictTally.avoid !== 0) {
  throw new Error(`batch218 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch218 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch218 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch218 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch218 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch218 verdict ${record.id}`);
}
