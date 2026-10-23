// DRAFT / not verified / batch 263 KYR6-d (t27u step 2).
// Five founder-verified Amazon panels. The founder label waives the second source.
// Phillips' Cherry 26 oz: 031284339325 fails the check digit, so the barcode is omitted.
// Align Kids gummies 50: no UPC on this order, so the barcode is omitted.

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
const OTC = 'OTC' as const;

const METH = {
  annatto: 'Methodology §5 Caution (annatto — plant color; does not count toward the t137u stack).',
  ascorbate: 'Methodology §5 Cleared (sodium ascorbate — ascorbate family).',
  blue1: 'Methodology §5 High-risk (FD&C Blue 1 / Blue 1 — synthetic dye; EU activity-and-attention warning).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026).',
  citric: 'Methodology §5 Cleared (citric acid / anhydrous citric acid — organic acid; hydration).',
  cmcNa:
    'Methodology §5 Cleared (carboxymethylcellulose sodium — sodium carboxymethyl cellulose). Not the calcium Caution row.',
  cornStarch: 'Methodology §5 Cleared (corn starch — named starch).',
  flavor: 'Methodology §5 Caution (Flavor printed bare — unnamed flavor; does not count toward the t137u stack).',
  gellan: 'Methodology §5 Cleared (gellan gum — xanthan/guar gum family).',
  glycerin: 'Methodology §5 Cleared (glycerin — glycerin family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — cellulose-family coating).',
  hypochlorite:
    'Methodology §5 Caution (sodium hypochlorite — founder lock t16u Oct 22, 2026; residual oxidizer; does not count toward the t137u stack). Not Sodium Hypochlorite (Trace).',
  inulin: 'Methodology §5 Cleared (inulin — food fiber).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin — generic starch sweetener; counts toward the t137u stack).',
  mannitol: 'Methodology §5 Caution (mannitol — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  mctGummy:
    'Methodology §5 Limited (MCT in a gummy — founder lock t132u Oct 20, 2026; medium chain triglyceride oil; no plant source named; counts toward the t137u stack).',
  natFlavors: 'Methodology §5 Limited (natural flavors — unnamed mixture; counts toward the t137u stack).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  red28: 'Methodology §5 High-risk (D&C Red #28 — synthetic dye; EU activity-and-attention warning).',
  red40: 'Methodology §5 High-risk (FD&C Red #40 / Red 40 — synthetic dye; EU activity-and-attention warning).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate — citrate-salt buffer).',
  sucrose: 'Methodology §5 Cleared (sucrose). Founder override Oct 17, 2026 t118u.',
  sugar: 'Methodology §5 Caution (bare sugar — does not count toward the t137u stack).',
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  vegMag: 'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant).',
  water: 'Methodology §5 Cleared (water / purified water).',
  xanthan: 'Methodology §5 Cleared (xanthan gum — gum family).',
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

const P_CHERRY =
  'Founder-verified Amazon panel, Phillips\' Cherry Milk of Magnesia 26 oz (t27u). The founder label waives the second source. Inactive line: anhydrous citric acid, carboxymethylcellulose sodium, D&C red #28, flavor, glycerin, microcrystalline cellulose, purified water, sodium citrate, sodium hypochlorite, sucrose, xanthan gum.';
const P_KIDS =
  'Founder-verified Amazon panel, Align Kids gummies 50 (t27u). The founder label waives the second source. Other line: water, sugar; less than 2% of pectin, natural flavors, citric acid, sodium citrate, color (black carrot juice, annatto extract, huito juice, watermelon juice), carnauba wax, medium chain triglyceride oil, corn starch.';
const P_IMM =
  'Founder-verified Amazon panel, Align Gut Health & Immunity Support 28 capsules, UPC 037000772811 (t27u). The founder label waives the second source.';
const P_PKT =
  'Founder-verified Amazon panel, Culturelle Kids Purely Packets 50, UPC 049100400266 (t27u). The founder label waives the second source. Other line: mannitol, inulin.';
const P_US =
  'Founder-verified Amazon panel, Culturelle Ultimate Strength Probiotic 20, UPC 049100400358 (t27u). The founder label waives the second source. Other line: hydroxypropyl methylcellulose, vegetable magnesium stearate, colors (titanium dioxide, FD&C Red #40, FD&C Blue #1).';

const CHERRY_FLAGS: IngredientFlag[] = [
  flag(P_CHERRY, 'Anhydrous citric acid', 'cleared', 'citric'),
  flag(P_CHERRY, 'Carboxymethylcellulose sodium', 'cleared', 'cmcNa'),
  flag(P_CHERRY, 'D&C Red #28', 'high', 'red28'),
  flag(P_CHERRY, 'Flavor', 'moderate', 'flavor'),
  flag(P_CHERRY, 'Glycerin', 'cleared', 'glycerin'),
  flag(P_CHERRY, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_CHERRY, 'Purified water', 'cleared', 'water'),
  flag(P_CHERRY, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_CHERRY, 'Sodium hypochlorite', 'moderate', 'hypochlorite'),
  flag(P_CHERRY, 'Sucrose', 'cleared', 'sucrose'),
  flag(P_CHERRY, 'Xanthan gum', 'cleared', 'xanthan'),
];

const KIDS_FLAGS: IngredientFlag[] = [
  flag(P_KIDS, 'Water', 'cleared', 'water'),
  flag(P_KIDS, 'Sugar', 'moderate', 'sugar'),
  flag(P_KIDS, 'Pectin', 'cleared', 'pectin'),
  flag(P_KIDS, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_KIDS, 'Citric acid', 'cleared', 'citric'),
  flag(P_KIDS, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_KIDS, 'Black carrot juice (color)', 'cleared', 'juice'),
  flag(P_KIDS, 'Annatto extract (color)', 'moderate', 'annatto'),
  flag(P_KIDS, 'Huito juice (color)', 'cleared', 'juice'),
  flag(P_KIDS, 'Watermelon juice (color)', 'cleared', 'juice'),
  flag(P_KIDS, 'Carnauba wax', 'cleared', 'carnauba'),
  flag(P_KIDS, 'Medium chain triglyceride oil', 'limited', 'mctGummy'),
  flag(P_KIDS, 'Corn starch', 'cleared', 'cornStarch'),
];

const IMM_FLAGS: IngredientFlag[] = [
  flag(P_IMM, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(P_IMM, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_IMM, 'Hypromellose', 'cleared', 'hpmc'),
  flag(P_IMM, 'Sucrose', 'cleared', 'sucrose'),
  flag(P_IMM, 'Water', 'cleared', 'water'),
  flag(P_IMM, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_IMM, 'Sodium ascorbate', 'cleared', 'ascorbate'),
  flag(P_IMM, 'Titanium dioxide (color)', 'high', 'tio2'),
  flag(P_IMM, 'Gellan gum', 'cleared', 'gellan'),
];

const PKT_FLAGS: IngredientFlag[] = [
  flag(P_PKT, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_PKT, 'Inulin', 'cleared', 'inulin'),
];

const US_FLAGS: IngredientFlag[] = [
  flag(P_US, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
  flag(P_US, 'Vegetable magnesium stearate', 'cleared', 'vegMag'),
  flag(P_US, 'Titanium dioxide (color)', 'high', 'tio2'),
  flag(P_US, 'FD&C Red #40', 'high', 'red40'),
  flag(P_US, 'FD&C Blue #1', 'high', 'blue1'),
];

function pack(
  id: string,
  productName: string,
  brand: string,
  formulaId: string,
  audience: typeof ADULT | typeof KIDS,
  minAge: number,
  form: string,
  productType: typeof SUPPLEMENT | typeof OTC,
  barcode: string | undefined,
  actives: RatingRecord['activeIngredients'],
  flags: IngredientFlag[],
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
    productType,
    ...(barcode ? { barcode } : {}),
    activeIngredients: actives,
    inactiveIngredients: flags,
    verdict: rollup.verdict,
    honestNote: withNotes(flags, form),
    retailers: ['Amazon'],
    sourcesGeneral: [sources],
  };
}

export const BATCH263_KYR6D_T27U: RatingRecord[] = [
  pack(
    'phillips-b263-cherry-mom-26',
    "Phillips' Cherry Milk of Magnesia (26 oz)",
    "Phillips'",
    'phillips-b263-cherry-mom-26',
    ADULT,
    12,
    'liquid',
    OTC,
    undefined,
    [{ name: 'Magnesium hydroxide', strength: 'active laxative, not graded' }],
    CHERRY_FLAGS,
    'Avoid from D&C Red #28. Flavor and sodium hypochlorite are Caution and do not stack. Not a 3+ Limited stack. Founder-verified Amazon panel. UPC 031284339325 fails the check digit and was not attached. Walgreens 31284339325 is 11 digits and was not padded. phillips-mom-cherry stays the existing row for 312843393240 and 312843393257. The mineral-oil field on Walmart 10316169 is not this row.',
  ),
  pack(
    'align-b263-kids-gummies-50',
    'Align Kids Gummies (50)',
    'Align',
    'align-b263-kids-gummies',
    KIDS,
    1,
    'gummy',
    SUPPLEMENT,
    undefined,
    [{ name: 'Probiotic', strength: 'not graded' }],
    KIDS_FLAGS,
    'Caution. Natural flavors and medium chain triglyceride oil in the gummy are the two Limited tokens. Not a 3+ stack. Sugar and annatto are Caution and do not stack. Huito juice is the juice lock, not huito extract. Founder-verified Amazon panel. UPC missing. No code was invented. The Target A-81875292 line is not this row.',
  ),
  pack(
    'align-b263-immunity-28',
    'Align Gut Health & Immunity Support Capsules (28)',
    'Align',
    'align-b263-immunity',
    ADULT,
    18,
    'capsule',
    SUPPLEMENT,
    '037000772811',
    [{ name: 'Bifidobacterium 35624', strength: 'not graded' }],
    IMM_FLAGS,
    'Avoid from titanium dioxide. Maltodextrin is the only Limited token, so this is not a 3+ stack. Sodium ascorbate is the antioxidant preservative on the other line, not a graded active. Founder-verified Amazon panel. UPC 037000772811 check digit OK. The Target A-81875295 line is not this row.',
  ),
  pack(
    'culturelle-b263-purely-packets-50',
    'Culturelle Kids Purely Probiotic Packets (50)',
    'Culturelle',
    'culturelle-b260-purely-packets',
    KIDS,
    1,
    'packet',
    SUPPLEMENT,
    '049100400266',
    [{ name: 'Lactobacillus rhamnosus GG', strength: 'not graded' }],
    PKT_FLAGS,
    'Caution. Mannitol is a sugar alcohol and does not stack. Inulin is Cleared. Not a 3+ stack. Founder-verified Amazon panel. UPC 049100400266 check digit OK. The 30-count stays culturelle-b260-purely-packets-30. The CVS prodid-1011774 line is not this row.',
  ),
  pack(
    'culturelle-b263-ultimate-strength-20',
    'Culturelle Ultimate Strength Probiotic Capsules (20)',
    'Culturelle',
    'culturelle-b263-ultimate-strength-20',
    ADULT,
    18,
    'capsule',
    SUPPLEMENT,
    '049100400358',
    [{ name: 'Lactobacillus rhamnosus GG', strength: 'not graded' }],
    US_FLAGS,
    'Avoid from titanium dioxide, FD&C Red #40, and FD&C Blue #1. Not a 3+ Limited stack. Founder-verified Amazon panel. UPC 049100400358 check digit OK. The 14-digit brand sku 04910040035800 was not used. The 30-count stays culturelle-b258-ultimate-strength-30. The CVS prodid-286569 fuller dye line is not this row.',
  ),
];

const ROWS = BATCH263_KYR6D_T27U;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 5) throw new Error(`batch263 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch263 duplicate id');
const codes = ROWS.map((record) => record.barcode).filter((code): code is string => Boolean(code));
if (codes.length !== 3) throw new Error('batch263 upc count');
if (new Set(codes).size !== codes.length) throw new Error('batch263 duplicate upc');
if (ROWS[0]?.barcode || ROWS[1]?.barcode) throw new Error('batch263 missing upc rows should omit the barcode');

const expect: Record<string, { verdict: 'avoid' | 'caution'; cause: string }> = {
  'phillips-b263-cherry-mom-26': { verdict: 'avoid', cause: 'high' },
  'align-b263-kids-gummies-50': { verdict: 'caution', cause: 'limited_1_2' },
  'align-b263-immunity-28': { verdict: 'avoid', cause: 'high' },
  'culturelle-b263-purely-packets-50': { verdict: 'caution', cause: 'moderate' },
  'culturelle-b263-ultimate-strength-20': { verdict: 'avoid', cause: 'high' },
};

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch263 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.verdict !== rollup.verdict) {
    throw new Error(`batch263 verdict ${record.id}: wrote ${record.verdict}, expected ${rollup.verdict}`);
  }
  const wanted = expect[record.id];
  if (!wanted || rollup.verdict !== wanted.verdict || rollup.cause !== wanted.cause) {
    throw new Error(`batch263 shape ${record.id} ${rollup.verdict} ${rollup.cause}`);
  }
  const expectedNote = withNotes(record.inactiveIngredients, record.form ?? '');
  if ((record.honestNote ?? '') !== (expectedNote ?? '')) {
    throw new Error(`batch263 note ${record.id}: ${record.honestNote} vs ${expectedNote}`);
  }
  if (record.honestNote) throw new Error(`batch263 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch263 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why)) throw new Error(`batch263 pending ${ingredient.name}`);
  }
}
