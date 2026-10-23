// DRAFT / not verified / batch 261 KYR6-d (t24u).
// Align 24/7 Digestive Support 28, current formula. Brand facts image plus
// Walgreens. The Walmart propyl-gallate line is the older formula and is not this row.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — cellulose-family coating).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function withNotes(flags: IngredientFlag[], form: string): string | undefined {
  const stack = limitedStackHonestNoteIfAny(flags);
  const formNote =
    contradictionHonestNote({
      id: 'note',
      productName: 'note',
      brand: 'note',
      category: 'Digestive',
      form,
      activeIngredients: [],
      inactiveIngredients: flags,
      verdict: 'clean',
      retailers: [],
    }) ?? undefined;
  if (stack && formNote) return `${formNote} ${stack}`;
  return stack ?? formNote;
}

const PANEL =
  'Align 24/7 Digestive Support facts image (t18u; UPC 037000143437). Walgreens prod3447799, in stock, same line: microcrystalline cellulose, HPMC, magnesium stearate, titanium dioxide (founder browser Oct 23, 2026). Walgreens showed 03700014343, 11 digits, not padded.';

const FLAGS: IngredientFlag[] = [
  flag(PANEL, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(PANEL, 'Hypromellose', 'cleared', 'hpmc'),
  flag(PANEL, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(PANEL, 'Titanium dioxide (color)', 'high', 'tio2'),
];

export const BATCH261_KYR6D_T24U: RatingRecord[] = [
  {
    id: 'align-b261-247-28',
    productName: 'Align 24/7 Digestive Support Capsules (28)',
    brand: 'Align',
    category: 'Digestive',
    formulaId: 'align-b261-247',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '037000143437',
    activeIngredients: [{ name: 'Bifidobacterium 35624', strength: 'not graded' }],
    inactiveIngredients: FLAGS,
    verdict: computeVerdictFromInactiveIngredients(FLAGS).verdict,
    honestNote: withNotes(FLAGS, 'capsule'),
    retailers: ['Align', 'Walgreens'],
    sourcesGeneral: [
      'Avoid from titanium dioxide. Not a 3+ Limited stack. This is the current brand formula (microcrystalline cellulose, hypromellose, magnesium stearate, titanium dioxide). Brand facts image and Walgreens prod3447799 agree. UPC 037000143437 check digit OK. Walgreens printed 03700014343 (11 digits) and that code was not padded. Walmart 10977941 and 17325220 print the older propyl-gallate line and are not this row. align-daily-probiotic stays the existing older-formula row.',
    ],
  },
];

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

const ROWS = BATCH261_KYR6D_T24U;
if (ROWS.length !== 1) throw new Error(`batch261 row count ${ROWS.length}`);
for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch261 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.verdict !== rollup.verdict) {
    throw new Error(`batch261 verdict ${record.id}: wrote ${record.verdict}, expected ${rollup.verdict}`);
  }
  if (rollup.verdict !== 'avoid' || rollup.cause === 'limited_stack') {
    throw new Error(`batch261 cause ${record.id} ${rollup.cause}`);
  }
  if (record.honestNote) throw new Error(`batch261 note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch261 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why)) throw new Error(`batch261 pending ${ingredient.name}`);
  }
}
