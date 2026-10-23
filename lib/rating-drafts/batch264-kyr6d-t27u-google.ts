// DRAFT / not verified / batch 264 KYR6-d (t27u step 1).
// Founder real-browser Google AI reads. No scripted search URL.
// Align Kids Yogurt Fruit Bites 21 and the current Phillips' Fiber Good 90.
// The Fiber Good fractionated-coconut line is the other formula and is not this file.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  beeswax: 'Methodology §5 Cleared (beeswax — wax coating).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026).',
  citrusFiber: 'Methodology §5 Cleared (Citrus Fiber — inulin / food-fiber family; t90u Oct 17, 2026).',
  gelatin: 'Methodology §5 Cleared (gelatin — gummy base).',
  inulin: 'Methodology §5 Cleared (inulin / inulin powder — food fiber).',
  inulinSyrup: 'Methodology §5 Cleared (Inulin syrup — founder lock t16u Oct 22, 2026). Not inulin. Not inulin powder.',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  lactic: 'Methodology §5 Cleared (lactic acid — organic acid).',
  lecithin: 'Methodology §5 Cleared (soy lecithin — named lecithin).',
  monk:
    'Methodology §5 Cleared (monk fruit (luo han guo) extract — high-purity / lo han sibling).',
  natFlavor: 'Methodology §5 Caution (Natural flavor, singular — unnamed natural flavor; not the Limited natural flavors mixture).',
  palmKernel:
    'Methodology §5 Caution (Palm kernel oil printed alone in a yogurt coating — founder lock t16u Oct 22, 2026; does not count toward the t137u stack).',
  pectin: 'Methodology §5 Cleared (citrus pectin — pectin gum family).',
  skim: 'Methodology §5 Cleared (Skim milk powder — founder lock t16u Oct 22, 2026).',
  solubleCorn: 'Methodology §5 Cleared (soluble corn fiber — fiber family).',
  sugar: 'Methodology §5 Caution (bare sugar — does not count toward the t137u stack).',
  vanilla: 'Methodology §5 Caution (Vanilla printed alone — founder lock t16u Oct 22, 2026; does not count toward the t137u stack).',
  vegOil:
    'Methodology §5 High-risk (vegetable oil (coconut and canola) in a gummy — founder lock t111u Oct 17, 2026; coconut half Cleared, canola half Avoid on the gummy seed-oil row; worst half wins).',
  water: 'Methodology §5 Cleared (water / purified water).',
  whey: 'Methodology §5 Cleared (Whey powder — founder lock t16u Oct 22, 2026).',
  yogurt: 'Methodology §5 Cleared (Yogurt powder — founder lock t16u Oct 22, 2026).',
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

const P_YOG =
  'Founder Google AI reads, Oct 23, 2026. Align Kids Yogurt Fruit Bites 21. H-E-B 11752011 Add to cart and Instacart 74260931 In stock print the full line. Cub Foods 44875147 prints the same line and UPC 030772134054. Giant 365524 prints the line and does not show stock text.';
const P_FIB =
  'Founder Google AI reads, Oct 23, 2026. Phillips\' Fiber Good Gummies 90, current juice-color line. Vitacost 108797 Add to cart and iHerb 108797 In stock, both UPC 312843568013. Hy-Vee 2233749 shows 0312843568010 (13 digits) and Log in to add. That 13-digit code was not attached.';

const YOG_FLAGS: IngredientFlag[] = [
  flag(P_YOG, 'Sugar', 'moderate', 'sugar'),
  flag(P_YOG, 'Palm kernel oil', 'moderate', 'palmKernel'),
  flag(P_YOG, 'Whey powder', 'cleared', 'whey'),
  flag(P_YOG, 'Skim milk powder', 'cleared', 'skim'),
  flag(P_YOG, 'Yogurt powder', 'cleared', 'yogurt'),
  flag(P_YOG, 'Soy lecithin', 'cleared', 'lecithin'),
  flag(P_YOG, 'Vanilla', 'moderate', 'vanilla'),
  flag(P_YOG, 'Apple puree', 'cleared', 'juice'),
  flag(P_YOG, 'Apple juice', 'cleared', 'juice'),
  flag(P_YOG, 'Blueberry puree', 'cleared', 'juice'),
  flag(P_YOG, 'Lemon juice', 'cleared', 'juice'),
  flag(P_YOG, 'Elderberry juice', 'cleared', 'juice'),
  flag(P_YOG, 'Soluble corn fiber', 'cleared', 'solubleCorn'),
  flag(P_YOG, 'Citrus fiber', 'cleared', 'citrusFiber'),
  flag(P_YOG, 'Citrus pectin', 'cleared', 'pectin'),
  flag(P_YOG, 'Natural flavor', 'moderate', 'natFlavor'),
];

const FIB_FLAGS: IngredientFlag[] = [
  flag(P_FIB, 'Inulin syrup', 'cleared', 'inulinSyrup'),
  flag(P_FIB, 'Inulin powder', 'cleared', 'inulin'),
  flag(P_FIB, 'Water', 'cleared', 'water'),
  flag(P_FIB, 'Gelatin', 'cleared', 'gelatin'),
  flag(P_FIB, 'Lactic acid', 'cleared', 'lactic'),
  flag(P_FIB, 'Beeswax', 'cleared', 'beeswax'),
  flag(P_FIB, 'Carnauba wax', 'cleared', 'carnauba'),
  flag(
    P_FIB,
    'Colors (apple, black currant, carrot, cherry, chokeberry, elderberry, and pumpkin juice concentrates)',
    'cleared',
    'juice',
  ),
  flag(P_FIB, 'Monk fruit (luo han guo) extract', 'cleared', 'monk'),
  flag(P_FIB, 'Natural flavor', 'moderate', 'natFlavor'),
  flag(P_FIB, 'Vegetable oil (coconut and canola)', 'high', 'vegOil'),
];

function pack(
  id: string,
  productName: string,
  brand: string,
  formulaId: string,
  audience: typeof ADULT | typeof KIDS,
  minAge: number,
  form: string,
  barcode: string,
  actives: RatingRecord['activeIngredients'],
  flags: IngredientFlag[],
  retailers: string[],
  sources: string,
): RatingRecord {
  const rollup = computeVerdictFromInactiveIngredients(flags);
  return {
    id,
    productName,
    brand,
    category: 'Digestive',
    formulaId,
    audience,
    minAge,
    form,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode,
    activeIngredients: actives,
    inactiveIngredients: flags,
    verdict: rollup.verdict,
    honestNote: withNotes(flags, form),
    retailers,
    sourcesGeneral: [sources],
  };
}

export const BATCH264_KYR6D_T27U_GOOGLE: RatingRecord[] = [
  pack(
    'align-b264-yogurt-bites-21',
    'Align Kids Yogurt Fruit Bites (21)',
    'Align',
    'align-b264-yogurt-bites',
    KIDS,
    1,
    'chew',
    '030772134054',
    [{ name: 'Bacillus coagulans MTCC 5856', strength: 'not graded' }],
    YOG_FLAGS,
    ['H-E-B', 'Instacart', 'Cub Foods'],
    'Caution. Sugar, palm kernel oil in the yogurt coating, vanilla, and natural flavor (singular) are Caution and do not stack. No Limited token. Not a 3+ stack. H-E-B 11752011 is Add to cart and Instacart 74260931 is In stock. Both are the 21-count and print the same full line. Cub Foods 44875147 prints that line and UPC 030772134054. Check digit OK. Rocky Ridge shows Add to cart and the 21 count only in the URL, so it was not the count proof. Giant 365524 prints the line and does not show stock text.',
  ),
  pack(
    'phillips-b264-fiber-gummies-90',
    "Phillips' Fiber Good Gummies (90)",
    "Phillips'",
    'phillips-b264-fiber-gummies',
    ADULT,
    18,
    'gummy',
    '312843568013',
    [{ name: 'Inulin', strength: 'not graded' }],
    FIB_FLAGS,
    ['Vitacost', 'iHerb'],
    'Avoid from vegetable oil (coconut and canola) in the gummy. Natural flavor (singular) is Caution and does not stack. Not a 3+ Limited stack. This is the juice-color line. Vitacost 108797 is Add to cart and iHerb 108797 is In stock. Both print UPC 312843568013. Check digit OK. Hy-Vee 2233749 prints the same line and shows 0312843568010, 13 digits, Log in to add. That code was not attached. Carewell and CVS prodid-509873 print the fractionated-coconut line and are not this row. Walgreens prod6356405 prints Colors bare and is not this row.',
  ),
];

const ROWS = BATCH264_KYR6D_T27U_GOOGLE;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch264 row count ${ROWS.length}`);
const expect: Record<string, { verdict: 'avoid' | 'caution'; cause: string }> = {
  'align-b264-yogurt-bites-21': { verdict: 'caution', cause: 'moderate' },
  'phillips-b264-fiber-gummies-90': { verdict: 'avoid', cause: 'high' },
};

for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch264 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.verdict !== rollup.verdict) {
    throw new Error(`batch264 verdict ${record.id}: wrote ${record.verdict}, expected ${rollup.verdict}`);
  }
  const wanted = expect[record.id];
  if (!wanted || rollup.verdict !== wanted.verdict || rollup.cause !== wanted.cause) {
    throw new Error(`batch264 shape ${record.id} ${rollup.verdict} ${rollup.cause}`);
  }
  const expectedNote = withNotes(record.inactiveIngredients, record.form ?? '');
  if ((record.honestNote ?? '') !== (expectedNote ?? '')) {
    throw new Error(`batch264 note ${record.id}: ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(expectedNote)}`);
  }
  if (record.honestNote) throw new Error(`batch264 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch264 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why)) throw new Error(`batch264 pending ${ingredient.name}`);
  }
}
