// DRAFT / not verified / batch 265 KYR6-d (t28u).
// Six founder-verified panels. The founder label is the single source.
// Women's Wellness chewables 60 is the founder brand-page panel. No UPC was shown.
// Does not repeat align-b260-dualbiotic-60, align-b263-kids-gummies-50,
// culturelle-kids-gummies-coconut, or the written Ultimate Strength / kids multi rows.

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
  annatto: 'Methodology §5 Caution (Annatto — plant color; condition rule; does not count toward the t137u stack).',
  blackCarrot: 'Methodology §5 Cleared (Black carrot extract — founder lock t150u Oct 21, 2026; named plant color).',
  blue1: 'Methodology §5 High-risk (FD&C Blue 1 / Blue 1 — synthetic dye; EU activity-and-attention warning).',
  cane: 'Methodology §5 Cleared (cane sugar / organic cane sugar).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026).',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named starch).',
  fracCoco: 'Methodology §5 Cleared (Fractionated coconut oil — coconut-in-gummy exception; not gummy seed-oil Avoid).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose — HPMC family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — cellulose-family coating).',
  huito: 'Methodology §5 Caution (Huito extract — founder lock t150u Oct 21, 2026; plant color; does not count toward the t137u stack).',
  inulin: 'Methodology §5 Cleared (inulin / inulin powder — food fiber).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  malic: 'Methodology §5 Cleared (malic acid — organic acid).',
  mannitol: 'Methodology §5 Caution (mannitol — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  mctGummy: 'Methodology §5 Limited (MCT in a gummy — founder lock t132u Oct 20, 2026; no plant source named).',
  natFlavor: 'Methodology §5 Caution (Natural flavor, singular — unnamed natural flavor; not the Limited natural flavors mixture).',
  natFlavors: 'Methodology §5 Limited (natural flavors — unnamed mixture; counts toward the t137u stack).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  red40: 'Methodology §5 High-risk (FD&C Red #40 / Red 40 — synthetic dye; EU activity-and-attention warning).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate — citrate-salt buffer).',
  solubleCorn: 'Methodology §5 Cleared (soluble corn fiber — fiber family).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  steviaLeaf:
    'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u Oct 21, 2026; same Limited row as Stevia and rebaudioside a extracted and purified; counts toward the t137u stack). Not Cleared organic Rebaudioside A. Not Cleared high-purity steviol glycosides. Not Cleared Rebaudioside M.',
  sugarAlcohol:
    'Methodology §5 Caution (Sugar alcohol printed as a class name — founder lock t22u Oct 23, 2026). Unnamed polyol class. GI effects at volume, the same finding as the named sugar-alcohol rows. Does not count toward the t137u stack. Not xylitol, mannitol, sorbitol, or isomalt.',
  sucralose: 'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; counts toward the t137u stack).',
  sugar: 'Methodology §5 Caution (bare sugar — does not count toward the t137u stack).',
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  vegMag: 'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant).',
  water: 'Methodology §5 Cleared (water / purified water).',
  watermelonExtract: 'Methodology §5 Cleared (Watermelon extract — founder lock t150u Oct 21, 2026; named plant color).',
  xylitol: 'Methodology §5 Caution (xylitol, oral — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
} as const;

type MethKey = keyof typeof METH;

function flag(
  panel: string,
  name: string,
  riskLevel: RiskLevel,
  meth: MethKey,
  stackCountExempt?: boolean,
): IngredientFlag {
  return {
    name,
    riskLevel,
    source: `${panel}; ${METH[meth]}`,
    ...(stackCountExempt ? { stackCountExempt } : {}),
  };
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

const P_FIB90 =
  'Founder-verified panel, Align Probiotics + Fiber Gummies 90, UPC 030772196908 (t28u). The founder label is the single source.';
const P_FIB60 =
  'Founder-verified panel, Align Probiotics + Fiber Gummies 60, UPC 030772196892 (t28u). The founder label is the single source. Same other line as the 90.';
const P_DUAL =
  'Founder-verified panel, Align DualBiotic Gummies 90, UPC 030772032596 (t28u). The founder label is the single source. Not the written 60 line.';
const P_VEG =
  'Founder-verified panel, Culturelle Kids Probiotic + Veggie Fiber Gummies 60, UPC 049100401416 (t28u). The founder label is the single source.';
const P_BAL =
  'Founder-verified panel, Culturelle Ultimate Balance capsules 20, UPC 049100400693 (t28u). The founder label is the single source.';
const P_K90 =
  'Founder-verified panel, Culturelle Kids Multivitamin + Probiotic Chewable 90, UPC 049100401768 (t28u). The founder label is the single source. Contains wheat.';
const P_WW60 =
  'Founder-verified brand page, Culturelle Women\'s Wellness Probiotic Chewables 60, https://culturelle.com/products/womens-wellness-probiotic-chewables (t28u follow-up). The brand page shows the 60 for sale. UPC not shown.';

const FIBER_FLAGS: IngredientFlag[] = [
  flag(P_FIB90, 'Inulin', 'cleared', 'inulin'),
  flag(P_FIB90, 'Water', 'cleared', 'water'),
  flag(P_FIB90, 'Soluble corn fiber (Fibersol)', 'cleared', 'solubleCorn'),
  flag(P_FIB90, 'Xylitol', 'moderate', 'xylitol'),
  flag(P_FIB90, 'Pectin', 'cleared', 'pectin'),
  flag(P_FIB90, 'Citric acid', 'cleared', 'citric'),
  flag(P_FIB90, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_FIB90, 'Black carrot extract', 'cleared', 'blackCarrot'),
  flag(P_FIB90, 'Watermelon extract', 'cleared', 'watermelonExtract'),
  flag(P_FIB90, 'Huito extract', 'moderate', 'huito'),
  flag(P_FIB90, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_FIB90, 'Carnauba wax', 'cleared', 'carnauba'),
  flag(P_FIB90, 'Corn starch', 'cleared', 'cornStarch'),
  flag(P_FIB90, 'Medium chain triglyceride oil', 'limited', 'mctGummy'),
];

const FIBER60_FLAGS: IngredientFlag[] = FIBER_FLAGS.map((ingredient) => ({
  ...ingredient,
  source: ingredient.source.replace(P_FIB90, P_FIB60),
}));

const DUAL_FLAGS: IngredientFlag[] = [
  flag(P_DUAL, 'Water', 'cleared', 'water'),
  flag(P_DUAL, 'Sugar', 'moderate', 'sugar'),
  flag(P_DUAL, 'Pectin', 'cleared', 'pectin'),
  flag(P_DUAL, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_DUAL, 'Citric acid', 'cleared', 'citric'),
  flag(P_DUAL, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_DUAL, 'Black carrot juice', 'cleared', 'juice'),
  flag(P_DUAL, 'Annatto extract', 'moderate', 'annatto'),
  flag(P_DUAL, 'Huito juice', 'cleared', 'juice'),
  flag(P_DUAL, 'Watermelon juice', 'cleared', 'juice'),
  flag(P_DUAL, 'Carnauba wax', 'cleared', 'carnauba'),
  flag(P_DUAL, 'Medium chain triglyceride oil', 'limited', 'mctGummy'),
  flag(P_DUAL, 'Corn starch', 'cleared', 'cornStarch'),
];

const VEG_FLAGS: IngredientFlag[] = [
  flag(P_VEG, 'Water', 'cleared', 'water'),
  flag(P_VEG, 'Organic cane sugar', 'cleared', 'cane'),
  flag(P_VEG, 'Pectin', 'cleared', 'pectin'),
  flag(P_VEG, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_VEG, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_VEG, 'Citric acid', 'cleared', 'citric'),
  flag(
    P_VEG,
    'Colors from fruits and vegetables (black carrot, genipap juice concentrate, watermelon juice concentrate)',
    'cleared',
    'juice',
  ),
  flag(P_VEG, 'Fractionated coconut oil', 'cleared', 'fracCoco'),
  flag(P_VEG, 'Carnauba wax', 'cleared', 'carnauba'),
  flag(P_VEG, 'Corn starch', 'cleared', 'cornStarch'),
];

const BAL_FLAGS: IngredientFlag[] = [
  flag(P_BAL, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
  flag(P_BAL, 'Vegetable magnesium stearate', 'cleared', 'vegMag'),
  flag(P_BAL, 'Titanium dioxide (color)', 'high', 'tio2'),
  flag(P_BAL, 'FD&C Red #40', 'high', 'red40'),
  flag(P_BAL, 'FD&C Blue #1', 'high', 'blue1'),
];

const WW60_FLAGS: IngredientFlag[] = [
  flag(P_WW60, 'Sugar alcohol', 'moderate', 'sugarAlcohol', true),
  flag(P_WW60, 'Xylitol', 'moderate', 'xylitol'),
  flag(P_WW60, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_WW60, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_WW60, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_WW60, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
  flag(P_WW60, 'Citric acid', 'cleared', 'citric'),
  flag(P_WW60, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_WW60, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_WW60, 'Vegetable juice (color)', 'cleared', 'juice'),
  flag(P_WW60, 'Malic acid', 'cleared', 'malic'),
  flag(P_WW60, 'Stevia leaf extract', 'limited', 'steviaLeaf'),
];

const KIDS90_FLAGS: IngredientFlag[] = [
  flag(P_K90, 'Xylitol', 'moderate', 'xylitol'),
  flag(P_K90, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_K90, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
  flag(P_K90, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_K90, 'Natural flavor', 'moderate', 'natFlavor'),
  flag(P_K90, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_K90, 'Sucralose', 'limited', 'sucralose'),
  flag(P_K90, 'Citric acid', 'cleared', 'citric'),
  flag(P_K90, 'Vegetable juice (color)', 'cleared', 'juice'),
  flag(P_K90, 'Malic acid', 'cleared', 'malic'),
];

function pack(
  id: string,
  productName: string,
  brand: string,
  formulaId: string,
  audience: typeof ADULT | typeof KIDS,
  minAge: number,
  form: string,
  barcode: string | undefined,
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
    ...(barcode ? { barcode } : {}),
    activeIngredients: actives,
    inactiveIngredients: flags,
    verdict: rollup.verdict,
    honestNote: withNotes(flags, form),
    retailers,
    sourcesGeneral: [sources],
  };
}

const PROBIOTIC = [{ name: 'Probiotic', strength: 'not graded' }];
const LGG = [{ name: 'Lactobacillus rhamnosus GG', strength: 'not graded' }];
const BIF = [{ name: 'Bifidobacterium 35624', strength: 'not graded' }];

export const BATCH265_KYR6D_T28U: RatingRecord[] = [
  pack(
    'align-b265-fiber-gummies-90',
    'Align Probiotics + Fiber Gummies (90)',
    'Align',
    'align-b265-fiber-gummies',
    ADULT,
    18,
    'gummy',
    '030772196908',
    PROBIOTIC,
    FIBER_FLAGS,
    ['Align'],
    'Caution. Natural flavors and medium chain triglyceride oil in the gummy are the two Limited tokens. Not a 3+ stack. Xylitol and huito extract are Caution and do not stack. Inulin and soluble corn fiber are Cleared fiber. Founder-verified panel. UPC 030772196908 check digit OK. The 60 is the same formula.',
  ),
  pack(
    'align-b265-fiber-gummies-60',
    'Align Probiotics + Fiber Gummies (60)',
    'Align',
    'align-b265-fiber-gummies',
    ADULT,
    18,
    'gummy',
    '030772196892',
    PROBIOTIC,
    FIBER60_FLAGS,
    ['Align'],
    'Caution. Same other line as the 90. Natural flavors and medium chain triglyceride oil in the gummy are the two Limited tokens. Not a 3+ stack. Xylitol and huito extract are Caution and do not stack. Founder-verified panel. UPC 030772196892 check digit OK.',
  ),
  pack(
    'align-b265-dualbiotic-90',
    'Align DualBiotic Gummies (90)',
    'Align',
    'align-b265-dualbiotic-90',
    ADULT,
    18,
    'gummy',
    '030772032596',
    BIF,
    DUAL_FLAGS,
    ['Align'],
    'Caution. Natural flavors and medium chain triglyceride oil in the gummy are the two Limited tokens. Not a 3+ stack. Sugar and annatto are Caution and do not stack. Huito juice is the juice lock, not huito extract. Founder-verified panel. UPC 030772032596 check digit OK. align-b260-dualbiotic-60 is a different line (coconut oil, no MCT). align-b263-kids-gummies-50 is a different product.',
  ),
  pack(
    'culturelle-b265-veggie-gummies-60',
    'Culturelle Kids Probiotic + Veggie Fiber Gummies (60)',
    'Culturelle',
    'culturelle-b265-veggie-gummies',
    KIDS,
    1,
    'gummy',
    '049100401416',
    LGG,
    VEG_FLAGS,
    ['Culturelle'],
    'Caution. Natural flavors is the one Limited token. Not a 3+ stack. Fractionated coconut oil is Cleared in the gummy and is the self-contradiction note. Carnauba wax is the wax named inside that oil and is its own Cleared row. Founder-verified panel. UPC 049100401416 check digit OK. This is not culturelle-kids-gummies-coconut.',
  ),
  pack(
    'culturelle-b265-ultimate-balance-20',
    'Culturelle Ultimate Balance Capsules (20)',
    'Culturelle',
    'culturelle-b265-ultimate-balance',
    ADULT,
    18,
    'capsule',
    '049100400693',
    LGG,
    BAL_FLAGS,
    ['Culturelle'],
    'Avoid from titanium dioxide, FD&C Red #40, and FD&C Blue #1. Not a 3+ Limited stack. Founder-verified panel. UPC 049100400693 check digit OK. This is not culturelle-b263-ultimate-strength-20 and not the written 30.',
  ),
  pack(
    'culturelle-b265-kids-multi-chew-90',
    'Culturelle Kids Multivitamin + Probiotic Chewables (90)',
    'Culturelle',
    'culturelle-b262-kids-multi-chew',
    KIDS,
    1,
    'chewable',
    '049100401768',
    LGG,
    KIDS90_FLAGS,
    ['Culturelle'],
    'Caution. Sucralose is the one Limited token. Not a 3+ stack. Xylitol, mannitol, and natural flavor are Caution and do not stack. Contains wheat is an allergen line, not a token. Founder-verified panel. UPC 049100401768 check digit OK. The 30 and 50 stay this formula.',
  ),
  pack(
    'culturelle-b265-womens-wellness-60',
    "Culturelle Women's Wellness Probiotic Chewables (60)",
    'Culturelle',
    'culturelle-b265-womens-wellness-60',
    ADULT,
    18,
    'chewable',
    undefined,
    [
      { name: 'Lactobacillus rhamnosus GG', strength: 'part of 120 mg / 12 billion CFU blend, not graded' },
      { name: 'Lactobacillus crispatus LBV 88', strength: 'not graded' },
      { name: 'Lactobacillus rhamnosus LBV 96', strength: 'not graded' },
      { name: 'Lactobacillus gasseri LBV 150N', strength: 'not graded' },
      { name: 'Lactobacillus jensenii LBV 116', strength: 'not graded' },
    ],
    WW60_FLAGS,
    ['Culturelle'],
    'Caution. Natural flavors and stevia leaf extract are the two Limited tokens. Not a 3+ stack. Sugar alcohol, xylitol, and mannitol are Caution and do not stack. No honest note. Founder-verified brand page showing the 60 for sale. UPC not shown. No code was invented. This is not culturelle-b260-womens-wellness-30.',
  ),
];

const ROWS = BATCH265_KYR6D_T28U;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 7) throw new Error(`batch265 row count ${ROWS.length}`);
const expect: Record<string, { verdict: 'avoid' | 'caution'; cause: string; note: boolean }> = {
  'align-b265-fiber-gummies-90': { verdict: 'caution', cause: 'limited_1_2', note: false },
  'align-b265-fiber-gummies-60': { verdict: 'caution', cause: 'limited_1_2', note: false },
  'align-b265-dualbiotic-90': { verdict: 'caution', cause: 'limited_1_2', note: false },
  'culturelle-b265-veggie-gummies-60': { verdict: 'caution', cause: 'limited_1_2', note: true },
  'culturelle-b265-ultimate-balance-20': { verdict: 'avoid', cause: 'high', note: false },
  'culturelle-b265-kids-multi-chew-90': { verdict: 'caution', cause: 'limited_1_2', note: false },
  'culturelle-b265-womens-wellness-60': { verdict: 'caution', cause: 'limited_1_2', note: false },
};

for (const record of ROWS) {
  if (record.id === 'culturelle-b265-womens-wellness-60') {
    if (record.barcode) throw new Error(`batch265 invented upc ${record.id}`);
  } else if (!record.barcode || !upcOk(record.barcode)) {
    throw new Error(`batch265 upc ${record.id}`);
  }
  if (record.category !== 'Digestive') throw new Error(`batch265 tab ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.verdict !== rollup.verdict) {
    throw new Error(`batch265 verdict ${record.id}: wrote ${record.verdict}, expected ${rollup.verdict}`);
  }
  const wanted = expect[record.id];
  if (!wanted || rollup.verdict !== wanted.verdict || rollup.cause !== wanted.cause) {
    throw new Error(`batch265 shape ${record.id} ${rollup.verdict} ${rollup.cause}`);
  }
  const expectedNote = withNotes(record.inactiveIngredients, record.form ?? '');
  if ((record.honestNote ?? '') !== (expectedNote ?? '')) {
    throw new Error(`batch265 note ${record.id}: ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(expectedNote)}`);
  }
  if (Boolean(record.honestNote) !== wanted.note) throw new Error(`batch265 note flag ${record.id}`);
  if (record.honestNote && !/coconut/i.test(record.honestNote)) {
    throw new Error(`batch265 note text ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch265 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source)) {
      throw new Error(`batch265 pending ${ingredient.name}`);
    }
  }
}
