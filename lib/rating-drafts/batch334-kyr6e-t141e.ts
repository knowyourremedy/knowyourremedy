// DRAFT / not verified / batch 334 KYR6-e (t141e).
// Olbas brand panels. The 3-pack is not a row. Salve and bath stay held.
// The Sprouts section is not edited. Olbas is not closed.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const T141C = 'Methodology §5 Cleared (founder lock t141e). Does not count toward the t137u stack.';
const T141L = 'Methodology §5 Limited (founder lock t141e). Counts toward the t137u stack.';
const MENTHOL = 'Methodology §5 Cleared (Menthol — t122e). Does not count toward the t137u stack.';
const PEPPER = 'Methodology §5 Cleared (peppermint oil).';
const ROSE = 'Methodology §5 Cleared (rosemary oil).';
const CITRAL = 'Methodology §5 Cleared (Citral (Lemon Oil)).';
const SUGAR = 'Methodology §5 Cleared (sugar).';
const PECTIN = 'Methodology §5 Cleared (fruit pectin).';
const EUC = 'Methodology §5 Cleared (eucalyptus oil).';
const AMAZON =
  'Amazon US was opened and blocked before a product page: Continued access by an unauthorized AI agent violates Amazon\'s Conditions of Use, to which our customers have agreed.';

type Ing = readonly [string, RiskLevel, string];

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

function flag(panel: string, [name, riskLevel, whySource]: Ing): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${whySource}` };
}

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function row(args: {
  id: string;
  productName: string;
  category: string;
  form: string;
  audience?: 'adult' | 'kids';
  minAge?: number;
  barcode?: string;
  actives: ActiveIngredient[];
  panel: string;
  ings: Ing[];
  source: string;
  expect: 'clean' | 'caution';
  limited: number;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Olbas',
    category: args.category,
    formulaId: args.id,
    form: args.form,
    audience: args.audience ?? 'adult',
    minAge: args.minAge ?? (args.audience === 'kids' ? 3 : 18),
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Olbas'],
    barcode: args.barcode ?? '',
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map((ing) => flag(args.panel, ing)),
    verdict: args.expect,
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

const INHALER: Ing[] = [
  ['Menthol', 'cleared', MENTHOL],
  ['Oils of Peppermint', 'cleared', T141C],
  ['Cajeput', 'cleared', T141C],
  ['Eucalyptol', 'cleared', T141C],
];

const PATCHES: Ing[] = [
  ['Peppermint Oil', 'cleared', PEPPER],
  ['Eucalyptus Globulus Oil', 'cleared', T141C],
  ['Pine Oil', 'cleared', T141C],
  ['Rosemary Oil', 'cleared', ROSE],
  ['Eucalyptol', 'cleared', T141C],
  ['Limonene', 'cleared', T141C],
  ['Linalool', 'cleared', T141C],
  ['Citral (Lemon Oil)', 'cleared', CITRAL],
  ['Isoeugenol', 'cleared', T141C],
  ['Dipropylene Glycol', 'limited', T141L],
];

const TEA: Ing[] = [
  ['Grape Sugar', 'cleared', T141C],
  ['Sugar', 'cleared', SUGAR],
  ['Fruit Pectin', 'cleared', PECTIN],
  ['Menthol', 'cleared', MENTHOL],
  ['Peppermint Oil', 'cleared', PEPPER],
  ['Eucalyptus Oil', 'cleared', EUC],
];

export const BATCH334_KYR6E_T141E: RatingRecord[] = [
  row({
    id: 'olbas-b334-inhaler',
    productName: 'Olbas Inhaler (0.01 oz)',
    category: 'Cold & Flu',
    form: 'inhaler',
    barcode: '715486505108',
    actives: [],
    panel: 'Olbas inhaler card. 0.01 oz.',
    ings: INHALER,
    expect: 'clean',
    limited: 0,
    source:
      `t141e. Brand page https://olbas.com/product/olbas-inhaler0-01-oz-285mg/ is in stock at $7.95. The card prints A favorite Swiss formula: Menthol, Oils of Peppermint, Cajeput and Eucalyptol. UPC 715486505108 is printed on that card and the check digit passes. The 3-pack is a same-formula multipack and the single is in stock, so the 3-pack is not a row. ${AMAZON} Walmart previously showed the 1-unit inhaler in stock. The brand card is the row. No code was invented.`,
  }),
  row({
    id: 'olbas-b334-patches-6',
    productName: 'Olbas Breathe Easy Patches (6 patches)',
    category: 'Cold & Flu',
    form: 'patch',
    audience: 'kids',
    minAge: 3,
    actives: [],
    panel: 'Olbas Breathe Easy Patches listing. 6 ct.',
    ings: PATCHES,
    expect: 'caution',
    limited: 1,
    source:
      `t141e. Brand page https://olbas.com/product/olbas-breathe-easy-patches-6-ct-box/ is in stock at $8.95. The gallery image is the front. The listing prints Ingredients: Peppermint Oil, Eucalyptus Globulus Oil, Pine Oil, Rosemary Oil, Eucalyptol, Limonene, Linalool, Citral (Lemon Oil), Isoeugenol. Adhesive: Dipropylene Glycol. Fabric: 100% Polyester is the patch fabric and is not graded. Suitable for children 3 years and older. Counted Limited token: Dipropylene Glycol. No UPC was printed. Missing UPC. ${AMAZON} The brand listing is the row. No code was invented.`,
  }),
  row({
    id: 'olbas-b334-tea-7',
    productName: 'Olbas Instant Herbal Tea (7 oz)',
    category: 'Herbs',
    form: 'powder',
    actives: [{ name: 'Olbas Proprietary 20 Herb Blend' }],
    panel: 'Olbas Instant Herbal Tea can. 7 oz.',
    ings: TEA,
    expect: 'clean',
    limited: 0,
    source:
      `t141e. Brand page https://olbas.com/product/olbas-herbal-tea-7-oz-can-200g/ is in stock at $24.95. The can prints a supplement facts panel. Other ingredients: Grape Sugar, Sugar, Fruit Pectin, Menthol, Peppermint Oil, and Eucalyptus Oil. Serving size 1 teaspoon (3 g), 60 servings. The herb blend is the active and is not graded. No UPC was printed. Missing UPC. ${AMAZON} The brand can is the row. No code was invented.`,
  }),
];

const ROWS = BATCH334_KYR6E_T141E;
const EXPECT = new Map([
  ['olbas-b334-inhaler', { verdict: 'clean', limited: 0, upc: '715486505108' }],
  ['olbas-b334-patches-6', { verdict: 'caution', limited: 1, upc: '' }],
  ['olbas-b334-tea-7', { verdict: 'clean', limited: 0, upc: '' }],
]);
if (ROWS.length !== 3) throw new Error(`batch334 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`batch334 dup ${record.id}`);
  ids.add(record.id);
  const spec = EXPECT.get(record.id);
  if (!spec) throw new Error(`batch334 id ${record.id}`);
  if (record.verdict !== spec.verdict) throw new Error(`batch334 verdict ${record.id} ${record.verdict}`);
  if ((record.barcode ?? '') !== spec.upc) throw new Error(`batch334 upc ${record.id}`);
  if (spec.upc && !upcCheck(spec.upc)) throw new Error(`batch334 check ${record.id}`);
  if (record.honestNote) throw new Error(`batch334 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== spec.limited) throw new Error(`batch334 stack ${record.id} ${counted.map((i) => i.name).join(',')}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch334 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch334 generic ${record.id} ${ingredient.name}: ${why}`);
    }
    if (!/t141e|t122e|peppermint oil|rosemary oil|lemon oil|sugar|gum|plant extract|scent/i.test(why)) {
      throw new Error(`batch334 why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
