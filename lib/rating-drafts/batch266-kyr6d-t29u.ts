// DRAFT / not verified / batch 266 KYR6-d (t29u).
// Three founder-verified panels. The founder label is the single source.
// Kids Ultimate Balance chewables 20 is closed not for sale and is not a row.
// Does not repeat culturelle-b260-kids-immune-30 or align-b260-womens-dual-28.

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
  canolaFill:
    'Methodology §5 Cleared (canola oil as capsule fill — seed oil is Avoid in a gummy; a capsule is not that form).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026).',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  coconut:
    'Methodology §5 Cleared (coconut oil, named, any form). Founder override Oct 17, 2026 t111u; the Sept 25, 2026 gummy-Avoid restamp is struck. Hydrogenated coconut oil stays Avoid.',
  fishOil:
    'Methodology §5 Cleared (Fish oil powder — founder lock t24u Oct 23, 2026; named marine oil used as a carrier; does not count toward the t137u stack). Fish oil as the Supplement Facts active stays ungraded.',
  gelatin: 'Methodology §5 Cleared (gelatin — capsule base).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose — HPMC family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — cellulose-family coating).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  mannitol:
    'Methodology §5 Caution (mannitol — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
  natFlavor:
    'Methodology §5 Caution (Natural flavor, singular — unnamed natural flavor; not the Limited natural flavors mixture).',
  natFlavors: 'Methodology §5 Limited (natural flavors — unnamed mixture; counts toward the t137u stack).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  rosemary:
    'Methodology §5 Caution (Rosemary Extract, oral — locked Sept 16, 2026 as Rosemary Extract (A Natural Preservative); bare Rosemary Extract stays on this row, Sept 28, 2026). Not rosemary oil. Does not count toward the t137u stack.',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate — citrate-salt buffer).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  steviaLeaf:
    'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u Oct 21, 2026; same Limited row as Stevia and rebaudioside a extracted and purified; counts toward the t137u stack). Not Cleared organic Rebaudioside A. Not Cleared high-purity steviol glycosides. Not Cleared Rebaudioside M.',
  sugar: 'Methodology §5 Caution (bare sugar — does not count toward the t137u stack).',
  sunflowerFill:
    'Methodology §5 Cleared (sunflower oil as non-gummy fill — named-fill Cleared Sept 22, 2026; gummy sunflower stays High).',
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols — vitamin E antioxidant; not tocopheryl acetate).',
  water: 'Methodology §5 Cleared (water / purified water).',
  xylitol:
    'Methodology §5 Caution (xylitol, oral — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
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

const P_IMM =
  'Founder-verified panel, Culturelle Kids Daily Immune Defense Probiotic Chewables 60, UPC 049100401775 (t29u). The founder label is the single source.';
const P_3IN1 =
  'Founder-verified panel, Culturelle 3-in-1 Complete 30, UPC 049100400389 (t29u). The founder label is the single source. Contains Fish (Tuna) is an allergen line, not a token. Walmart 50274882 is not this row.';
const P_WMN =
  'Founder-verified panel, Align Women\'s Health Prebiotic + Probiotic Gummies 50, UPC 037000919957 (t29u). The founder label is the single source. Walmart 315316510 is not this row.';

const IMM_FLAGS: IngredientFlag[] = [
  flag(P_IMM, 'Xylitol', 'moderate', 'xylitol'),
  flag(P_IMM, 'Mannitol (Corn or Wheat)', 'moderate', 'mannitol'),
  flag(P_IMM, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
  flag(P_IMM, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_IMM, 'Natural flavor', 'moderate', 'natFlavor'),
  flag(P_IMM, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_IMM, 'Vegetable juice (color)', 'cleared', 'juice'),
  flag(P_IMM, 'Stevia leaf extract', 'limited', 'steviaLeaf'),
];

const COMPLETE_FLAGS: IngredientFlag[] = [
  flag(P_3IN1, 'Fish oil powder', 'cleared', 'fishOil'),
  flag(P_3IN1, 'Gelatin', 'cleared', 'gelatin'),
  flag(P_3IN1, 'Canola oil', 'cleared', 'canolaFill'),
  flag(P_3IN1, 'Rosemary extract', 'moderate', 'rosemary'),
  flag(P_3IN1, 'Mixed natural tocopherols', 'cleared', 'tocopherols'),
  flag(P_3IN1, 'Sunflower oil', 'cleared', 'sunflowerFill'),
  flag(P_3IN1, 'Citric acid', 'cleared', 'citric'),
  flag(P_3IN1, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
  flag(P_3IN1, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_3IN1, 'Titanium dioxide (color)', 'high', 'tio2'),
];

const WMN_FLAGS: IngredientFlag[] = [
  flag(P_WMN, 'Water', 'cleared', 'water'),
  flag(P_WMN, 'Sugar', 'moderate', 'sugar'),
  flag(P_WMN, 'Pectin', 'cleared', 'pectin'),
  flag(P_WMN, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_WMN, 'Citric acid', 'cleared', 'citric'),
  flag(P_WMN, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_WMN, 'Purple carrot juice concentrate', 'cleared', 'juice'),
  flag(P_WMN, 'Coconut oil', 'cleared', 'coconut'),
  flag(P_WMN, 'Carnauba wax', 'cleared', 'carnauba'),
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
    productType: SUPPLEMENT,
    barcode,
    activeIngredients: [{ name: 'Probiotic', strength: 'not graded' }],
    inactiveIngredients: flags,
    verdict: rollup.verdict,
    honestNote: withNotes(flags, form),
    retailers: [brand],
    sourcesGeneral: [sources],
  };
}

export const BATCH266_KYR6D_T29U: RatingRecord[] = [
  pack(
    'culturelle-b266-kids-immune-60',
    'Culturelle Kids Daily Immune Defense Probiotic Chewables (60)',
    'Culturelle',
    'culturelle-b266-kids-immune-60',
    KIDS,
    1,
    'chewable',
    '049100401775',
    IMM_FLAGS,
    'Caution. Stevia leaf extract is the one Limited token. Xylitol, mannitol, and natural flavor (singular) are Caution and do not stack. Not a 3+ stack. Corn or wheat is the source printed on the mannitol, not a separate token and not a Contains line. Founder-verified panel. UPC 049100401775 check digit OK. The 30 stays culturelle-b260-kids-immune-30.',
  ),
  pack(
    'culturelle-b266-3in1-complete-30',
    'Culturelle 3-in-1 Complete Capsules (30)',
    'Culturelle',
    'culturelle-b266-3in1-complete-30',
    ADULT,
    18,
    'capsule',
    '049100400389',
    COMPLETE_FLAGS,
    'Avoid from titanium dioxide. Not a 3+ Limited stack. Fish oil powder is Cleared (t24u) and does not stack. The carriers inside the parenthesis are their own rows. Canola oil and sunflower oil are Cleared capsule fill, not gummy Avoid, and that form split is the honest note. Rosemary extract is Caution and does not stack. Contains Fish (Tuna) is an allergen line, not a token. Founder-verified panel. UPC 049100400389 check digit OK. Walmart 50274882 is not this row.',
  ),
  pack(
    'align-b266-womens-gummies-50',
    "Align Women's Health Prebiotic + Probiotic Gummies (50)",
    'Align',
    'align-b266-womens-gummies-50',
    ADULT,
    18,
    'gummy',
    '037000919957',
    WMN_FLAGS,
    'Caution. Natural flavors is the one Limited token. Sugar is Caution and does not stack. Coconut oil is Cleared in a gummy (t111u). Purple carrot juice concentrate is the juice lock. Not a 3+ stack. Founder-verified panel. UPC 037000919957 check digit OK. This is not align-b260-womens-dual-28. Walmart 315316510 is not this row.',
  ),
];

const ROWS = BATCH266_KYR6D_T29U;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch266 row count ${ROWS.length}`);
const expect: Record<string, { verdict: 'avoid' | 'caution'; cause: string; note: boolean }> = {
  'culturelle-b266-kids-immune-60': { verdict: 'caution', cause: 'limited_1_2', note: false },
  'culturelle-b266-3in1-complete-30': { verdict: 'avoid', cause: 'high', note: true },
  'align-b266-womens-gummies-50': { verdict: 'caution', cause: 'limited_1_2', note: false },
};

for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch266 upc ${record.id}`);
  if (record.category !== 'Digestive') throw new Error(`batch266 tab ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.verdict !== rollup.verdict) {
    throw new Error(`batch266 verdict ${record.id}: wrote ${record.verdict}, expected ${rollup.verdict}`);
  }
  const wanted = expect[record.id];
  if (!wanted || rollup.verdict !== wanted.verdict || rollup.cause !== wanted.cause) {
    throw new Error(`batch266 shape ${record.id} ${rollup.verdict} ${rollup.cause}`);
  }
  const expectedNote = withNotes(record.inactiveIngredients, record.form ?? '');
  if ((record.honestNote ?? '') !== (expectedNote ?? '')) {
    throw new Error(`batch266 note ${record.id}: ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(expectedNote)}`);
  }
  if (Boolean(record.honestNote) !== wanted.note) throw new Error(`batch266 note flag ${record.id}`);
  if (record.id === 'culturelle-b266-3in1-complete-30') {
    if (!record.honestNote || !/canola/i.test(record.honestNote) || !/sunflower/i.test(record.honestNote)) {
      throw new Error(`batch266 oil note ${record.honestNote}`);
    }
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch266 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source)) {
      throw new Error(`batch266 pending ${ingredient.name}`);
    }
  }
}
