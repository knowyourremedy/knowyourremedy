// DRAFT / not verified / batch 105 KYR6 HealthA2Z three gummies.
// Methodology v1.6 + MAIN §5 after 0b0a172 (Sept 25, 2026 HealthA2Z gummy
// stamps). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Exactly three founder-opened panels (Brandon, Sept 25 2026,
// 9:27 PM PT). HealthA2Z only. Labeler Allegiant Health, Deer Park, NY.
// No TIME-Cap. No GoodSense. No other brands. No other SKUs. No hunting.
// No web research. recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. None of these Other
// Ingredients lists is already a MAIN formula row, so each formulaId
// equals its own id. Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch104. Oil form split stays as it is on main.
// Do not create or edit any §5 token/alias map.
//
// Unmapped printed strings (kept in the quoted ingredient list; omitted
// from the scored inactiveIngredients array — notes-only, same pattern as
// founder-stamped rows that leave a string with no exact §5 token ungraded):
//   sodium ascorbate
//   natural orange flavor
//   Vitamin C (Other Ingredients on FPHK1128 only)
// No invented riskLevel on those three.
//
// TALLY (unverified drafts in THIS file): 3 rows —
// Clean 0 / Caution 1 / Avoid 2.
// NEW 3 / REUSE-formula 0 /
// SKIPPED 0 (no_OI 0 / OUT 0) /
// REFUSED 0.
// Search grade: Clean 0 / Caution 1 / Avoid 2.
// UPCs attached: 1 (FPHK1128 = 369168779600).
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'HealthA2Z';
const AMAZON = ['Amazon'] as const;
const STAMP = 'founder stamp Sept 25 2026 (batch105 order)';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const AGE =
  'The panel does not print a numbered minimum age. Audience adult and minAge 18 follow the HealthA2Z Apple Cider Vinegar gummy (FPHK1044) when that tile does not print a minimum age.';

const UNMAPPED_NOTE =
  'A printed string with no exact Methodology §5 token stays in this ingredient list and is omitted from the scored inactiveIngredients array (notes-only, same pattern as founder-stamped rows). No invented riskLevel. Not a demerit driver.';

const METH = {
  betaCarotene:
    'Methodology §5 Caution (beta-carotene as a color additive). Bare beta-carotene maps here (Sept 25, 2026). Same Caution lock. Not a new grade. Not Avoid.',
  carnauba:
    'Methodology §5 Caution (carnauba wax — exact token; locked Sept 25, 2026). Not the old Cleared wax row. Carnauba wax inside a vegetable-oil parenthesis is this wax half. The gummy vegetable-oil half is the separate High flag. Not Avoid.',
  citric:
    'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers).',
  coconutGummy:
    'Methodology §5 High (coconut oil in a gummy — same Avoid as gummy vegetable oil; founder restamp Sept 25, 2026). Fractionated coconut oil in a gummy stays the prior exception. This row is plain coconut oil in a gummy. Not an oil-bottle grade.',
  flavor:
    'Methodology §5 Caution (flavor). Natural peach flavor, natural strawberry flavor, natural raspberry flavor, and natural watermelon flavor are exact aliases (Sept 25, 2026). Not Limited natural flavors. Not Avoid.',
  glucose:
    'Methodology §5 Caution (bare glucose — exact token; locked Sept 22, 2026). Distinct from Cleared glucose syrup. Not Avoid.',
  glucoseSyrup:
    'Methodology §5 Cleared (glucose syrup — acceptable sweetener). Distinct from Caution bare glucose.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  isomalt:
    'Methodology §5 Caution (isomalt — exact token; founder restamp Sept 25, 2026). Was Limited. Not the Limited sugar-alcohol row. Not Avoid.',
  maltitolSolution:
    'Methodology §5 Caution (maltitol solution — exact token; locked Sept 25, 2026). Distinct from Limited maltitol powder. Not Avoid.',
  paprika:
    'Methodology §5 Caution (paprika extract (natural color) — exact token; locked Sept 25, 2026). Founder restamp from the Cleared color-only lock. Not Avoid.',
  pectin: 'Methodology §5 Cleared (pectin / gum).',
  purpleCarrot:
    'Methodology §5 Caution (purple carrot juice concentrate — exact token; locked Sept 25, 2026). Purple Carrot (Color) stays Cleared. Not Avoid.',
  sodiumCitrate:
    'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers). Sodium citrate is this citrate-salt lock.',
  sugar:
    'Methodology §5 Caution (bare sugar — exact token; locked Sept 22, 2026). Distinct from Cleared cane sugar and from Limited sucrose. Not Avoid.',
  tricalcium:
    'Methodology §5 Cleared (tricalcium phosphate — mineral filler / buffer).',
  trisodium:
    'Methodology §5 Cleared (trisodium citrate — exact token; locked Sept 22, 2026). Citrate-salt filler/buffer with citric acid.',
  vegOilGummy:
    'Methodology §5 High (seed/industrial oils in gummies — vegetable oil). Seed/industrial oils are flagged in gummies. In a softgel or cream fill they are not that High rule. Not an oil-bottle grade.',
  water: 'Methodology §5 Cleared (purified water / water).',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'recordStatus'> & {
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return { ...opts, recordStatus: opts.recordStatus ?? UNVERIFIED };
}

type Compact = {
  id: string;
  productName: string;
  category: string;
  formulaId: string;
  audience: typeof ADULT;
  minAge: number;
  form: string;
  productType: typeof SUPPLEMENT;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
  barcode?: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Digestive: [
        'megafood-magnesium-300-capsules',
        'Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6).',
      ],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    formulaId: d.formulaId,
    audience: d.audience,
    minAge: d.minAge,
    form: d.form,
    productType: d.productType,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Packs with this OI list share formulaId \`${d.formulaId}\`. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}`],
    ...(d.barcode ? { barcode: d.barcode } : {}),
  });
}

const VC = 'healtha2z-b105-fphk1065-vitamin-c-gummies';
const WM = 'healtha2z-b105-fphk1130-womens-multi-gummies';
const PB = 'healtha2z-b105-fphk1128-probiotics-gummies';

const VC_URL =
  'https://a2z-life.com/healtha2z-vitamin-c-gummies-orange-flavored-250-mg-60-pieces-immune-support-antioxidant-support/';
const VC_TARGET = 'https://www.target.com/p/-/A-1004604237';
const WM_URL =
  'https://a2z-life.com/healtha2z-womens-multivitamin-gummies-peach-orange-strawberry-flavored-60-pieces-for-daily-health-wellness-supports-womens-overall-health/';
const WM_TARGET = 'https://www.target.com/p/-/A-1004604139';
const PB_URL =
  'https://a2z-life.com/healtha2z-sugar-free-probiotics-gummies-raspberry-watermelon-flavored-2-5-billion-cfus-60-pieces-supports-digestive-health-contains-over-2-5-billion-cfus-of-good-bacteria/';
const PB_TARGET = 'https://www.target.com/p/-/A-1004604176';

const OI_VC =
  'Other ingredients: Glucose syrup, sugar, purified water, pectin, sodium ascorbate, trisodium citrate, natural orange flavor, paprika extract (natural color).';
const OI_WM =
  'Other ingredients: Glucose syrup, sugar, glucose, pectin, citric acid, sodium citrate, natural peach flavor, natural orange flavor, natural strawberry flavor, vegetable oil (containing carnauba wax), beta-carotene, purple carrot juice concentrate.';
const OI_PB =
  'Other ingredients: Maltitol Solution, Isomalt, Glycerin, Coconut Oil, Pectin, Citric Acid, Vitamin C, Sodium Citrate, Tricalcium Phosphate, Natural Raspberry Flavor, Vegetable Oil (Contains Carnauba Wax), Purple Carrot Juice Concentrate, Natural Watermelon Flavor.';

const VC_FLAGS: Compact['flags'] = [
  ['glucose syrup', 'cleared', 'glucoseSyrup'],
  ['sugar', 'limited', 'sugar'],
  ['purified water', 'cleared', 'water'],
  ['pectin', 'cleared', 'pectin'],
  ['trisodium citrate', 'cleared', 'trisodium'],
  ['paprika extract (natural color)', 'limited', 'paprika'],
];

const WM_FLAGS: Compact['flags'] = [
  ['glucose syrup', 'cleared', 'glucoseSyrup'],
  ['sugar', 'limited', 'sugar'],
  ['glucose', 'limited', 'glucose'],
  ['pectin', 'cleared', 'pectin'],
  ['citric acid', 'cleared', 'citric'],
  ['sodium citrate', 'cleared', 'sodiumCitrate'],
  ['natural peach flavor', 'limited', 'flavor'],
  ['natural strawberry flavor', 'limited', 'flavor'],
  ['vegetable oil', 'high', 'vegOilGummy'],
  ['carnauba wax', 'limited', 'carnauba'],
  ['beta-carotene', 'limited', 'betaCarotene'],
  ['purple carrot juice concentrate', 'limited', 'purpleCarrot'],
];

const PB_FLAGS: Compact['flags'] = [
  ['maltitol solution', 'limited', 'maltitolSolution'],
  ['isomalt', 'limited', 'isomalt'],
  ['glycerin', 'cleared', 'glycerin'],
  ['coconut oil', 'high', 'coconutGummy'],
  ['pectin', 'cleared', 'pectin'],
  ['citric acid', 'cleared', 'citric'],
  ['sodium citrate', 'cleared', 'sodiumCitrate'],
  ['tricalcium phosphate', 'cleared', 'tricalcium'],
  ['natural raspberry flavor', 'limited', 'flavor'],
  ['vegetable oil', 'high', 'vegOilGummy'],
  ['carnauba wax', 'limited', 'carnauba'],
  ['purple carrot juice concentrate', 'limited', 'purpleCarrot'],
  ['natural watermelon flavor', 'limited', 'flavor'],
];

const VC_NOTE =
  `FOUNDER-LOCK DRAFT: Caution. ${STAMP}. Drivers: bare sugar and paprika extract (natural color). Glucose syrup, purified water, pectin, and trisodium citrate are Cleared. sodium ascorbate is printed on the bottle and is not an exact Methodology §5 token (ascorbyl palmitate is a different lock). ${UNMAPPED_NOTE} The bottle Other Ingredients spell natural orange flavor. Target A-1004604237 Label info prints Nautural Orange Flavor. The OI list uses the bottle spelling. natural orange flavor is not the exact alias orange flavor and is not the exact alias Nautural Orange Flavor, so it stays unscored. The does-not-contain line (soy, wheat, milk, egg, fish, crustacean shellfish, peanuts or tree nuts) is allergen-free copy and is not an inactive grade. 369168766600 is a text-only field on a2z and Target specs and is not a printed barcode. It is not attached. Serving size 2 gummies. Servings per container 30. Vitamin C (as ascorbic acid) 250 mg. Sodium 5 mg. Total sugars 5 g including 5 g added sugars. ${AGE} Labeler Allegiant Health, Deer Park, NY.`;

const WM_NOTE =
  `FOUNDER-LOCK DRAFT: Avoid. ${STAMP}. Driver: vegetable oil in a gummy. The bottle prints vegetable oil (containing carnauba wax). Target A-1004604139 prints Vegetable Oil (Contains Carnauba Wax). The clause splits. vegetable oil is the gummy seed-oil High. carnauba wax is Caution and is not the old Cleared wax row. The combined parenthesis is not its own token. Sugar, glucose, natural peach flavor, natural strawberry flavor, beta-carotene, and purple carrot juice concentrate are Caution and are not the Avoid drivers. Glucose syrup, pectin, citric acid, and sodium citrate are Cleared. natural orange flavor is the bottle spelling and has no exact §5 alias, so it stays unscored. ${UNMAPPED_NOTE} 369168782600 is text-only and is not a printed barcode. It is not attached. Serving size 2 gummies. Servings per container 30. The supplement-facts amounts are labeled nutrients, not extra inactive grades. dl-alpha tocopheryl acetate is the labeled vitamin E form and is not graded as inactive tocopheryl acetate. ${AGE} Labeler Allegiant Health, Deer Park, NY. Not an oil-bottle grade.`;

const PB_NOTE =
  `FOUNDER-LOCK DRAFT: Avoid. ${STAMP}. Drivers: coconut oil in a gummy and vegetable oil in a gummy. Coconut oil in a gummy is the same Avoid as gummy vegetable oil. Fractionated coconut oil is not this row. The bottle prints Vegetable Oil (Contains Carnauba Wax). Target A-1004604176 matches that list. The clause splits. vegetable oil is High. carnauba wax is Caution. The combined parenthesis is not its own token. Maltitol solution, isomalt, natural raspberry flavor, purple carrot juice concentrate, and natural watermelon flavor are Caution and are not the Avoid drivers. Maltitol solution is not Limited maltitol powder. Isomalt is Caution, not the old Limited row. Glycerin, pectin, citric acid, sodium citrate, and tricalcium phosphate are Cleared. Vitamin C is printed in Other Ingredients and is not the exact token ascorbic acid, so it stays unscored. ${UNMAPPED_NOTE} Contains: Tree nut (highly refined coconut oil) is allergen copy and is not a second inactive grade. Serving size 1 gummy. Calories 10. Total carbohydrates 2 g. Total sugar 0 g. Sodium 5 mg. Bacillus coagulans 2.5 Billion. Bifidobacterium lactis 1 Million. UPC-A 369168779600 is printed on the back-label barcode (digits 3 69168 77960 0) and matches Target specs. Directions print Adults. ${AGE} Labeler Allegiant Health, Deer Park, NY. Not an oil-bottle grade.`;

const COMPACT: Compact[] = [
  {
    id: VC,
    productName:
      'HealthA2Z Vitamin C Gummies Orange Flavored 250 mg, 60 pieces (FPHK1065)',
    category: 'Vitamins',
    formulaId: VC,
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '250 mg' },
      { name: 'Sodium', strength: '5 mg' },
    ],
    flags: VC_FLAGS,
    verdict: 'caution',
    note: VC_NOTE,
    cite: `Founder-opened a2z-life.com enlarged bottle label (${VC_URL}) and Target A-1004604237 Label info (${VC_TARGET}). ${OI_VC} Does not contain: soy, wheat, milk, egg, fish, crustacean shellfish, peanuts or tree nuts. Supplement facts: serving size 2 gummies, 30 servings per container, vitamin C (as ascorbic acid) 250 mg, sodium 5 mg, total sugars 5 g including 5 g added sugars. Labeler Allegiant Health, Deer Park, NY. No printed barcode. 369168766600 is text-only and is not attached.`,
  },
  {
    id: WM,
    productName:
      "HealthA2Z Women's Multivitamin Gummies Peach, Orange & Strawberry Flavored, 60 pieces (FPHK1130)",
    category: 'Vitamins',
    formulaId: WM,
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Vitamin A (as acetate)', strength: '450 mcg' },
      { name: 'Vitamin C (as ascorbic acid)', strength: '36 mg' },
      { name: 'Vitamin D3 (as cholecalciferol)', strength: '25 mcg' },
      { name: 'Vitamin E (as dl-alpha tocopheryl acetate)', strength: '15 mg' },
      { name: 'Niacin (as niacinamide)', strength: '8 mg' },
      { name: 'Vitamin B6 (as pyridoxine HCl)', strength: '1.7 mg' },
      { name: 'Folate (as folic acid)', strength: '400 mcg DFE' },
      { name: 'Vitamin B12 (as cyanocobalamin)', strength: '4.8 mcg' },
      { name: 'Biotin', strength: '30 mcg' },
      { name: 'Pantothenic acid (as d-calcium pantothenate)', strength: '3 mg' },
      { name: 'Sodium (as sodium citrate)', strength: '5 mg' },
      { name: 'Inositol', strength: '1.5 mg' },
    ],
    flags: WM_FLAGS,
    verdict: 'avoid',
    note: WM_NOTE,
    cite: `Founder-opened a2z-life.com enlarged label (${WM_URL}) and Target A-1004604139 Label info (${WM_TARGET}). ${OI_WM} Target accordion spelling of the oil clause: Vegetable Oil (Contains Carnauba Wax). Supplement facts: serving size 2 gummies, 30 servings per container, vitamin A (as acetate) 450 mcg, vitamin C (as ascorbic acid) 36 mg, vitamin D3 (as cholecalciferol) 25 mcg, vitamin E (as dl-alpha tocopheryl acetate) 15 mg, niacin (as niacinamide) 8 mg, vitamin B6 (as pyridoxine HCl) 1.7 mg, folate (as folic acid) 400 mcg DFE, vitamin B12 (as cyanocobalamin) 4.8 mcg, biotin 30 mcg, pantothenic acid (as d-calcium pantothenate) 3 mg, sodium (as sodium citrate) 5 mg, inositol 1.5 mg. Labeler Allegiant Health, Deer Park, NY. No printed barcode. 369168782600 is text-only and is not attached.`,
  },
  {
    id: PB,
    productName:
      'HealthA2Z Sugar Free Probiotics Gummies Raspberry & Watermelon Flavored, 2.5 Billion CFUs, 60 pieces (FPHK1128)',
    category: 'Digestive',
    formulaId: PB,
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    barcode: '369168779600',
    actives: [
      { name: 'Bacillus coagulans', strength: '2.5 Billion' },
      { name: 'Bifidobacterium lactis', strength: '1 Million' },
    ],
    flags: PB_FLAGS,
    verdict: 'avoid',
    note: PB_NOTE,
    cite: `Founder-opened a2z-life.com back label (${PB_URL}) and Target A-1004604176 Label info (${PB_TARGET}). ${OI_PB} Contains: Tree nut (highly refined coconut oil). Supplement facts: serving size 1 gummy, calories 10, total carbohydrates 2 g, total sugar 0 g, sodium 5 mg, Bacillus coagulans 2.5 Billion, Bifidobacterium lactis 1 Million. Printed barcode 369168779600 (digits 3 69168 77960 0). Labeler Allegiant Health, Deer Park, NY.`,
  },
];

export const BATCH105_KYR6_HEALTHA2Z_THREE_GUMMIES: RatingRecord[] = COMPACT.map(expand);

export const BATCH105_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH105_SKIPPED_OUT: { sku: string; reason: string }[] = [];

export const BATCH105_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH105_SKIPPED_NO_OI,
  ...BATCH105_SKIPPED_OUT,
];

export const BATCH105_REFUSED: { sku: string; reason: string }[] = [];

const _ROWS = BATCH105_KYR6_HEALTHA2Z_THREE_GUMMIES;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _new = _ROWS.filter((r) => r.formulaId === r.id).length;
const _reuse = _ROWS.filter((r) => r.formulaId !== r.id).length;
if (_ROWS.length !== 3) throw new Error('batch105 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 1 || _grades.avoid !== 2) {
  throw new Error('batch105 Search grade drift');
}
if (_new !== 3 || _reuse !== 0) throw new Error('batch105 NEW/REUSE drift');
if (BATCH105_SKIPPED_NO_OI.length !== 0) throw new Error('batch105 no_OI drift');
if (BATCH105_SKIPPED_OUT.length !== 0) throw new Error('batch105 OUT drift');
if (BATCH105_SKIPPED.length !== 0) throw new Error('batch105 SKIPPED drift');
if (BATCH105_REFUSED.length !== 0) throw new Error('batch105 REFUSED drift');
if (_ROWS.some((r) => r.brand !== 'HealthA2Z')) throw new Error('batch105 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch105 recordStatus must stay unverified');
}
if (_ROWS.some((r) => r.audience !== ADULT || r.minAge !== 18)) {
  throw new Error('batch105 minAge must stay adult 18');
}
if (_ROWS.some((r) => !r.id.startsWith('healtha2z-b105-'))) {
  throw new Error('batch105 ids must use healtha2z-b105-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch105 duplicate id');
if (_ROWS.some((r) => r.formulaId !== r.id)) {
  throw new Error('batch105 formulaId must equal id (NEW 3 / REUSE 0)');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch105 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch105 Clean row has a non-cleared inactive');
}
if (
  _ROWS.some(
    (r) =>
      r.verdict === 'caution' &&
      !r.inactiveIngredients?.some((f) => f.riskLevel === 'limited' || f.riskLevel === 'moderate'),
  )
) {
  throw new Error('batch105 Caution needs Limited or Moderate');
}
const _barcodes = _ROWS.filter((r) => r.barcode);
if (_barcodes.length !== 1) throw new Error('batch105 must attach exactly one barcode');
if (_barcodes[0]?.barcode !== '369168779600' || !_barcodes[0].productName.includes('FPHK1128')) {
  throw new Error('batch105 barcode must be FPHK1128 369168779600');
}
if (_ROWS.some((r) => r.barcode === '369168766600' || r.barcode === '369168782600')) {
  throw new Error('batch105 must not attach a text-only code');
}
if (_ROWS.some((r) => /FPHK1065|FPHK1130/.test(r.productName) && r.barcode)) {
  throw new Error('batch105 FPHK1065 and FPHK1130 must not carry a barcode');
}
if (_barcodes[0]?.barcode && !/^\d{12}$/.test(_barcodes[0].barcode)) {
  throw new Error('batch105 barcode must be a 12-digit UPC-A');
}
{
  const code = _barcodes[0]?.barcode ?? '';
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  if ((10 - (sum % 10)) % 10 !== Number(code[11])) {
    throw new Error('batch105 barcode failed UPC-A check digit');
  }
}
const _flagNames = _ROWS.flatMap((r) => r.inactiveIngredients?.map((f) => f.name) ?? []);
for (const unmapped of ['sodium ascorbate', 'natural orange flavor', 'vitamin c']) {
  if (_flagNames.some((name) => name.toLowerCase() === unmapped)) {
    throw new Error(`batch105 scored an unmapped string: ${unmapped}`);
  }
}
for (const combined of [
  'vegetable oil (containing carnauba wax)',
  'vegetable oil (contains carnauba wax)',
]) {
  if (_flagNames.some((name) => name.toLowerCase() === combined)) {
    throw new Error('batch105 must not grade the oil parenthesis as its own token');
  }
}
const _vc = _ROWS.find((r) => r.id === VC);
const _wm = _ROWS.find((r) => r.id === WM);
const _pb = _ROWS.find((r) => r.id === PB);
if (!_vc || _vc.verdict !== 'caution' || _vc.category !== 'Vitamins') {
  throw new Error('batch105 FPHK1065 must stay Caution Vitamins');
}
if (!_wm || _wm.verdict !== 'avoid' || _wm.category !== 'Vitamins') {
  throw new Error('batch105 FPHK1130 must stay Avoid Vitamins');
}
if (!_pb || _pb.verdict !== 'avoid' || _pb.category !== 'Digestive') {
  throw new Error('batch105 FPHK1128 must stay Avoid Digestive');
}
if (!_vc.honestNote?.includes(STAMP) || !_wm.honestNote?.includes(STAMP) || !_pb.honestNote?.includes(STAMP)) {
  throw new Error('batch105 notes must cite the founder stamp');
}
const _cites = _ROWS.map((r) => (r.sourcesGeneral ?? []).join('\n')).join('\n');
if (!_cites.includes('sodium ascorbate') || !_cites.includes('natural orange flavor')) {
  throw new Error('batch105 cite dropped an unmapped string');
}
if (!_cites.includes(OI_PB) || !OI_PB.includes('Vitamin C')) {
  throw new Error('batch105 cite dropped Vitamin C from the probiotics ingredient list');
}
if (_ROWS.some((r) => !r.retailers.includes('Amazon') || r.retailers.length !== 1)) {
  throw new Error('batch105 retailer must stay Amazon');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH105_SKIPPED.map((s) => s.sku),
  ...BATCH105_REFUSED.map((s) => s.sku),
].join('\n');
if (/\bTIME-Cap\b|GoodSense|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch105 excluded brand leaked');
}
