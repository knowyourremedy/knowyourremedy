// DRAFT / not verified / batch 262 KYR6-d (t26u step 2).
// Culturelle and Phillips' singles that now have two full-line sources.
// Google pages are the founder's real-browser google.com reads. No scripted search URL.
// Does not repeat batch258–261, align-daily-probiotic, or culturelle-kids-gummies-coconut.
// Phillips' Laxative Caplets 24 has no UPC on either page. The barcode is omitted.

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
  ascorbate: 'Methodology §5 Cleared (sodium ascorbate — ascorbate family).',
  cane: 'Methodology §5 Cleared (cane sugar / organic cane sugar).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026). Carnauba leaf wax maps here.',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  cornSyrup: 'Methodology §5 Caution (corn syrup — sweetener; does not count toward the t137u stack).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium — cellulose-family disintegrant).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose — HPMC family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — cellulose-family coating).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  malic: 'Methodology §5 Cleared (malic acid — organic acid).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin — generic starch sweetener; counts toward the t137u stack).',
  mannitol: 'Methodology §5 Caution (mannitol — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  natFlavor: 'Methodology §5 Caution (Natural flavor, singular — unnamed natural flavor; not the Limited natural flavors mixture).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  peg: 'Methodology §5 Limited (PEGs / polyethylene glycol — founder lock t138u Oct 20, 2026; counts toward the t137u stack).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch — named starch).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol — oral coating).',
  silica: 'Methodology §5 Caution (silicon dioxide — zero-point Caution cap; does not count toward the Limited stack).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  sucralose: 'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; counts toward the t137u stack).',
  sucrose: 'Methodology §5 Cleared (sucrose). Founder override Oct 17, 2026 t118u.',
  talc: 'Methodology §5 High-risk (talc — IARC Group 2A, 2024; Avoid in oral products).',
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  vegOil:
    'Methodology §5 High-risk (vegetable oil (coconut, canola) in a gummy — founder lock t111u Oct 17, 2026; coconut half Cleared, canola half Avoid on the gummy seed-oil row; worst half wins).',
  water: 'Methodology §5 Cleared (water / purified water).',
  xylitol: 'Methodology §5 Caution (xylitol, oral — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
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

const P_CAP24 =
  'Walmart https://www.walmart.com/ip/10316188, Add to cart, no UPC, same other line as the written 55 (t23u). CVS prodid-1011847, 24 ct, in stock $9.49, same line (founder Google search Oct 23, 2026). UPC not shown on either page.';
const P_CH45 =
  'Walmart https://www.walmart.com/ip/17179648, current LGG line (t24u). Vitacost 108795, Add to cart, UPC 312843543508, same line: maltodextrin, hydroxypropyl methylcellulose, microcrystalline cellulose, sucrose, magnesium stearate, sodium ascorbate (founder Google search Oct 23, 2026).';
const P_CH60 =
  'Target A-14232841, UPC 312843541207, current LGG line (t24u). Vitacost 108796, Add to cart, same UPC, same line as the 45 (founder Google search Oct 23, 2026).';
const P_K30 =
  'Target A-75666556 (t23u). Vitacost, Add to cart, UPC 049100400761, same line (founder Google search Oct 23, 2026). Brand catalog title for this sku is Kids Probiotic + Multivitamin Chewables.';
const P_K50 =
  'Walmart https://www.walmart.com/ip/569392034, Add to cart (t23u). ShopRite 50 ct, Add to cart, GTIN 00049100400709, and iHerb 50 ct, Add to cart, UPC 049100400709, same line (founder Google search Oct 23, 2026).';
const P_WG =
  'Vitacost and iHerb, 60 ct, Add to cart, UPC 049100402024, same full line (founder Google search Oct 23, 2026). Brand sku 049100402024.';

const CAP24_FLAGS: IngredientFlag[] = [
  flag(P_CAP24, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_CAP24, 'Croscarmellose sodium', 'cleared', 'croscarmellose'),
  flag(P_CAP24, 'Pregelatinized starch', 'cleared', 'pregel'),
  flag(P_CAP24, 'Polyethylene glycol', 'limited', 'peg'),
  flag(P_CAP24, 'Polyvinyl alcohol', 'cleared', 'pva'),
  flag(P_CAP24, 'Silicon dioxide', 'moderate', 'silica'),
  flag(P_CAP24, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_CAP24, 'Talc', 'high', 'talc'),
  flag(P_CAP24, 'Titanium dioxide (color)', 'high', 'tio2'),
];

const CH_FLAGS: IngredientFlag[] = [
  flag(P_CH45, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(P_CH45, 'Hypromellose', 'cleared', 'hpmc'),
  flag(P_CH45, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_CH45, 'Sucrose', 'cleared', 'sucrose'),
  flag(P_CH45, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_CH45, 'Sodium ascorbate', 'cleared', 'ascorbate'),
];

const CH60_FLAGS: IngredientFlag[] = CH_FLAGS.map((ingredient) => ({
  ...ingredient,
  source: ingredient.source.replace(P_CH45, P_CH60),
}));

const KIDS_FLAGS: IngredientFlag[] = [
  flag(P_K30, 'Xylitol', 'moderate', 'xylitol'),
  flag(P_K30, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_K30, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
  flag(P_K30, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_K30, 'Natural flavor', 'moderate', 'natFlavor'),
  flag(P_K30, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_K30, 'Sucralose', 'limited', 'sucralose'),
  flag(P_K30, 'Citric acid', 'cleared', 'citric'),
  flag(P_K30, 'Vegetable juice (color)', 'cleared', 'juice'),
  flag(P_K30, 'Malic acid', 'cleared', 'malic'),
];

const K50_FLAGS: IngredientFlag[] = KIDS_FLAGS.map((ingredient) => ({
  ...ingredient,
  source: ingredient.source.replace(P_K30, P_K50),
}));

const WG_FLAGS: IngredientFlag[] = [
  flag(P_WG, 'Corn syrup', 'moderate', 'cornSyrup'),
  flag(P_WG, 'Cane sugar', 'cleared', 'cane'),
  flag(P_WG, 'Water', 'cleared', 'water'),
  flag(P_WG, 'Natural flavor', 'moderate', 'natFlavor'),
  flag(P_WG, 'Pectin', 'cleared', 'pectin'),
  flag(P_WG, 'Citric acid', 'cleared', 'citric'),
  flag(P_WG, 'Colors (fruit and vegetable juice)', 'cleared', 'juice'),
  flag(P_WG, 'Vegetable oil (coconut, canola)', 'high', 'vegOil'),
  flag(P_WG, 'Carnauba leaf wax', 'cleared', 'carnauba'),
];

const LGG = [{ name: 'Lactobacillus rhamnosus GG', strength: 'not graded' }];
const BB = [
  { name: 'Lactobacillus rhamnosus GG', strength: 'not graded' },
  { name: 'Bifidobacterium animalis subsp. lactis BB-12', strength: 'not graded' },
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
    productType,
    ...(barcode ? { barcode } : {}),
    activeIngredients: actives,
    inactiveIngredients: flags,
    verdict: rollup.verdict,
    honestNote: withNotes(flags, form),
    retailers,
    sourcesGeneral: [sources],
  };
}

export const BATCH262_KYR6D_T26U: RatingRecord[] = [
  pack(
    'phillips-b262-caplets-24',
    "Phillips' Laxative Caplets (24)",
    "Phillips'",
    'phillips-b260-caplets',
    ADULT,
    18,
    'tablet',
    OTC,
    undefined,
    [{ name: 'Magnesium oxide', strength: 'active laxative, not graded' }],
    CAP24_FLAGS,
    ['Walmart', 'CVS'],
    'Avoid from talc and titanium dioxide. Polyethylene glycol is the only Limited token, so this is not a 3+ stack. Magnesium oxide is the active and is not graded. Same other line as the written 55. Walmart 10316188 and CVS prodid-1011847 agree. UPC was not on either page. Missing UPC. No code was invented.',
  ),
  pack(
    'phillips-b262-colon-health-45',
    "Phillips' Colon Health Probiotic Capsules (45)",
    "Phillips'",
    'phillips-b260-colon-health-lgg',
    ADULT,
    18,
    'capsule',
    SUPPLEMENT,
    '312843543508',
    BB,
    CH_FLAGS,
    ['Walmart', 'Vitacost'],
    'Caution. Maltodextrin is the one Limited token. Not a 3+ stack. This is the current LGG + BB-12 formula, the same other line as the written 30. Walmart 17179648 and Vitacost 108795 agree. UPC 312843543508 check digit OK. H-E-B 1530707 is the older gasseri formula and is not this row.',
  ),
  pack(
    'phillips-b262-colon-health-60',
    "Phillips' Colon Health Probiotic Capsules (60)",
    "Phillips'",
    'phillips-b260-colon-health-lgg',
    ADULT,
    18,
    'capsule',
    SUPPLEMENT,
    '312843541207',
    BB,
    CH60_FLAGS,
    ['Target', 'Vitacost'],
    'Caution. Maltodextrin is the one Limited token. Not a 3+ stack. Same current LGG + BB-12 line as the 45 and the written 30. Target A-14232841 and Vitacost 108796 agree. UPC 312843541207 check digit OK. Foods Co UPC 0031284355802 is the older gasseri formula and is not this row.',
  ),
  pack(
    'culturelle-b262-kids-multi-chew-30',
    'Culturelle Kids Probiotic + Multivitamin Chewables (30)',
    'Culturelle',
    'culturelle-b262-kids-multi-chew',
    KIDS,
    1,
    'chewable',
    SUPPLEMENT,
    '049100400761',
    LGG,
    KIDS_FLAGS,
    ['Target', 'Vitacost'],
    'Caution. Sucralose is the one Limited token. Xylitol, mannitol, and natural flavor (singular) are Caution and do not stack. Not a 3+ stack. Vitamin actives are not graded. Target A-75666556 and Vitacost agree. UPC 049100400761 check digit OK. Contains wheat is an allergen disclosure, not a token. Stop & Shop and Hannaford 50-count lines were truncated and are not this row.',
  ),
  pack(
    'culturelle-b262-kids-multi-chew-50',
    'Culturelle Kids Multivitamin + Probiotic Chewables (50)',
    'Culturelle',
    'culturelle-b262-kids-multi-chew',
    KIDS,
    1,
    'chewable',
    SUPPLEMENT,
    '049100400709',
    LGG,
    K50_FLAGS,
    ['Walmart', 'ShopRite', 'iHerb'],
    'Caution. Sucralose is the one Limited token. Xylitol, mannitol, and natural flavor (singular) are Caution and do not stack. Not a 3+ stack. Vitamin actives are not graded. Same other line as the 30. A different count is not a source for the 30. Walmart 569392034, ShopRite, and iHerb agree. UPC 049100400709 check digit OK. The ShopRite code 00049100400709 is the 14-digit GTIN and was not used as the barcode. Stop & Shop and Hannaford lines were truncated and are not this row.',
  ),
  pack(
    'culturelle-b262-womens-gummies-60',
    "Culturelle Women's Probiotics + Multivitamin Gummies (60)",
    'Culturelle',
    'culturelle-b262-womens-gummies',
    ADULT,
    18,
    'gummy',
    SUPPLEMENT,
    '049100402024',
    LGG,
    WG_FLAGS,
    ['Vitacost', 'iHerb'],
    'Avoid from vegetable oil (coconut, canola) in the gummy. The canola half is the gummy seed-oil Avoid. Not a 3+ Limited stack. Natural flavor (singular) and corn syrup are Caution and do not stack. Vitacost and iHerb agree. UPC 049100402024 check digit OK. Walgreens 300470234 is a different name and is not this row.',
  ),
];

const ROWS = BATCH262_KYR6D_T26U;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 6) throw new Error(`batch262 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch262 duplicate id');
const codes = ROWS.map((record) => record.barcode).filter((code): code is string => Boolean(code));
if (codes.length !== 5) throw new Error('batch262 upc count');
if (new Set(codes).size !== codes.length) throw new Error('batch262 duplicate upc');
if (ROWS[0]?.barcode) throw new Error('batch262 caplets 24 should omit the UPC');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch262 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.verdict !== rollup.verdict) {
    throw new Error(`batch262 verdict ${record.id}: wrote ${record.verdict}, expected ${rollup.verdict}`);
  }
  const expectedNote = withNotes(record.inactiveIngredients, record.form ?? '');
  if ((record.honestNote ?? '') !== (expectedNote ?? '')) {
    throw new Error(`batch262 note ${record.id}`);
  }
  if (record.honestNote && rollup.cause !== 'limited_stack' && !contradictionHonestNote(record)) {
    throw new Error(`batch262 unexpected note ${record.id}`);
  }
  if (record.id === 'phillips-b262-caplets-24' || record.id === 'culturelle-b262-womens-gummies-60') {
    if (rollup.verdict !== 'avoid' || rollup.cause === 'limited_stack' || record.honestNote) {
      throw new Error(`batch262 avoid shape ${record.id} ${rollup.cause}`);
    }
  }
  if (record.id !== 'phillips-b262-caplets-24' && record.id !== 'culturelle-b262-womens-gummies-60') {
    if (rollup.verdict !== 'caution' || rollup.cause === 'limited_stack' || record.honestNote) {
      throw new Error(`batch262 caution shape ${record.id} ${rollup.verdict} ${rollup.cause}`);
    }
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch262 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why)) throw new Error(`batch262 pending ${ingredient.name}`);
  }
}
