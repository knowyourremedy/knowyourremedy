// DRAFT / not verified / batch 328 KYR6-e (t131e).
// Natural Stacks brand panels are the source. The Sprouts section is not edited.
// Natural Stacks is not closed. Ids: naturalstacks-b328-

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, whySource: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${whySource}` };
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const CITRIC = 'Methodology §5 Cleared (citric acid).';
const MALIC = 'Methodology §5 Cleared (L-malic acid).';
const NF = 'Methodology §5 Limited (natural flavors, t54u natural-flavor rule). Counts toward the t137u stack.';
const SIO2 = 'Methodology §5 Caution (silicon dioxide cap). Does not count toward the t137u stack.';
const MONK = 'Methodology §5 Cleared (monk fruit extract).';
const STEVIA = 'Methodology §5 Limited (stevia — founder lock t158u). Counts toward the t137u stack.';
const STEVIA_EX = 'Methodology §5 Limited (stevia leaf extract — founder lock t159u). Counts toward the t137u stack.';
const STEVIOL_1 = 'Methodology §5 Caution (steviol glycoside, singular — founder lock t106u). Does not count toward the t137u stack.';
const REBA = 'Methodology §5 Cleared (Rebaudioside A (Stevia Leaf Extract) — founder lock t130e). Does not count toward the t137u stack.';
const TURM = 'Methodology §5 Cleared (turmeric for color).';
const HIB = 'Methodology §5 Cleared (Hibiscus Extract & Carrot Extract (for color) — founder lock t131e). Does not count toward the t137u stack.';
const CRYST = 'Methodology §5 Cleared (Crystallized Lemon (Citric Acid, Lemon Oil, Lemon Juice) — founder lock t131e). Does not count toward the t137u stack.';
const MONKF = 'Methodology §5 Cleared (Monkfruit Extract — founder lock t131e). Does not count toward the t137u stack.';
const HYPRO = 'Methodology §5 Cleared (hydroxypropyl cellulose).';
const MAGST = 'Methodology §5 Cleared (magnesium stearate).';
const STEARIC = 'Methodology §5 Caution (stearic acid). Does not count toward the t137u stack.';
const XYL = 'Methodology §5 Caution (xylitol, swallowed sugar alcohol). Does not count toward the t137u stack.';
const PEPPER = 'Methodology §5 Cleared (peppermint oil).';

const LEMON_NOTE =
  'The box-back photo prints Crystallized Lemon (Citric Acid, Lemon Oil, Lemon Juice). The gallery facts graphic on the same page prints Crystallized Lemon alone. This row uses the box-back. Both strings are Cleared, so the grade is Clean either way.';
const STEARIC_NOTE =
  'Stearic acid and magnesium stearate use the same lubricant sentence. A 2018 European review found no safety concern. Magnesium stearate is Cleared. Stearic acid stays Caution and does not count toward the three-or-more Limited stack.';

type Ing = readonly [string, RiskLevel, string];

function pack(args: {
  id: string;
  productName: string;
  form: string;
  barcode: string;
  url: string;
  price: string;
  sku: string;
  serving: string;
  oi: string;
  ings: readonly Ing[];
  note?: string;
  extra?: string;
}): RatingRecord {
  const panel = `Natural Stacks facts image. ${args.productName}.`;
  const upc = args.barcode
    ? `UPC ${args.barcode}.`
    : 'No UPC was printed on the facts image. Missing UPC.';
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Natural Stacks',
    category: 'Vitamins',
    formulaId: args.id,
    form: args.form,
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Natural Stacks'],
    barcode: args.barcode,
    activeIngredients: [{ name: args.productName }],
    inactiveIngredients: args.ings.map(([name, level, src]) => flag(panel, name, level, src)),
    verdict: 'clean',
    honestNote: args.note ?? '',
    sourcesGeneral: [
      `t131e. Natural Stacks brand page ${args.url} lists this pack at $${args.price} and in stock. SKU ${args.sku}. The facts image other ingredients: ${args.oi}. Serving size on the image: ${args.serving}. ${upc} The supplement-facts actives are not graded. ${args.extra ?? ''}No code was invented.`,
    ],
  });
}

export const BATCH328_KYR6E_T131E: RatingRecord[] = [
  pack({
    id: 'naturalstacks-b328-magtech-lemonade',
    productName: 'Natural Stacks MagTech Magnesium Lemonade (20 sticks)',
    form: 'powder',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/magnesium-drink',
    price: '44.95',
    sku: 'MAGDR-20',
    serving: '1 Stick Pack (0.12 oz/3.38 g). Servings per container 20.',
    oi: 'Crystallized Lemon (Citric Acid, Lemon Oil, Lemon Juice), Organic Monk Fruit Extract',
    ings: [
      ['Crystallized Lemon (Citric Acid, Lemon Oil, Lemon Juice)', 'cleared', CRYST],
      ['Organic Monk Fruit Extract', 'cleared', MONK],
    ],
    note: LEMON_NOTE,
    extra:
      'The row is the box-back photo Magtech_Lem_box_Back.png. The gallery graphic Magtech_drink_Supfacts_61022.png prints Crystallized Lemon, Organic Monk Fruit Extract. This is not the sold-out tub. ',
  }),
  pack({
    id: 'naturalstacks-b328-hydrate-drink',
    productName: 'Natural Stacks MagTech Hydrate Drink (14 sticks)',
    form: 'powder',
    barcode: '850038130923',
    url: 'https://www.naturalstacks.com/products/magtech-hydrate-drink',
    price: '29.95',
    sku: 'MAGSP-HYDR-14',
    serving: '1 Stick Pack (7.5 g). Servings per container 14.',
    oi: 'Citric Acid, Natural Flavors, Turmeric Extract (for color), Stevia, Hibiscus Extract & Carrot Extract (for color), Organic Monk Fruit Extract, Silica',
    ings: [
      ['Citric Acid', 'cleared', CITRIC],
      ['Natural Flavors', 'limited', NF],
      ['Turmeric Extract (for color)', 'cleared', TURM],
      ['Stevia', 'limited', STEVIA],
      ['Hibiscus Extract & Carrot Extract (for color)', 'cleared', HIB],
      ['Organic Monk Fruit Extract', 'cleared', MONK],
      ['Silica', 'moderate', SIO2],
    ],
    extra: 'UPC 850038130923 is the code on the pouch photo. This is not MagTech Hydrate + Creatine. ',
  }),
  pack({
    id: 'naturalstacks-b328-hydrate-creatine-watermelon',
    productName: 'Natural Stacks MagTech Hydrate + Creatine, Watermelon Lime (14 sticks)',
    form: 'powder',
    barcode: '850038130992',
    url: 'https://www.naturalstacks.com/products/magtech-hydrate-creatine',
    price: '29.95',
    sku: 'MAGSP-HYDRCREA-14',
    serving: '1 Stick Pack (9.3 g). Servings per container 14.',
    oi: 'L-Malic Acid, Natural Flavors, Citric Acid, Silica, Rebaudioside A (Stevia Leaf Extract), Hibiscus Extract & Carrot Extract (for color), Organic Monk Fruit Extract',
    ings: [
      ['L-Malic Acid', 'cleared', MALIC],
      ['Natural Flavors', 'limited', NF],
      ['Citric Acid', 'cleared', CITRIC],
      ['Silica', 'moderate', SIO2],
      ['Rebaudioside A (Stevia Leaf Extract)', 'cleared', REBA],
      ['Hibiscus Extract & Carrot Extract (for color)', 'cleared', HIB],
      ['Organic Monk Fruit Extract', 'cleared', MONK],
    ],
    extra:
      'UPC 850038130992 is the code on the Watermelon Lime pouch photo. This is not naturalstacks-b327-hydrate-creatine-lemonlime. ',
  }),
  pack({
    id: 'naturalstacks-b328-focus-bites-30',
    productName: 'Natural Stacks Focus Bites, Melon-Mint (30 pieces)',
    form: 'lozenge',
    barcode: '850038130732',
    url: 'https://www.naturalstacks.com/products/focus-bites',
    price: '19.95',
    sku: 'FOCUSBITES-30',
    serving: '1 Piece. Servings per container 30.',
    oi: 'Xylitol, Natural Flavors, Magnesium stearate, Hydroxypropyl cellulose, Stearic acid, Silicon Dioxide, Citric acid, Peppermint Oil Powder, Stevia Leaf Extract, Steviol Glycoside, Monkfruit Extract',
    ings: [
      ['Xylitol', 'moderate', XYL],
      ['Natural Flavors', 'limited', NF],
      ['Magnesium stearate', 'cleared', MAGST],
      ['Hydroxypropyl cellulose', 'cleared', HYPRO],
      ['Stearic acid', 'moderate', STEARIC],
      ['Silicon Dioxide', 'moderate', SIO2],
      ['Citric acid', 'cleared', CITRIC],
      ['Peppermint Oil Powder', 'cleared', PEPPER],
      ['Stevia Leaf Extract', 'limited', STEVIA_EX],
      ['Steviol Glycoside', 'moderate', STEVIOL_1],
      ['Monkfruit Extract', 'cleared', MONKF],
    ],
    note: STEARIC_NOTE,
    extra:
      'UPC 850038130732 is the code on the bottle photo Focus_Bites_3_25_Sups_-_Edited.png, which prints Stevia Leaf Extract. An older gallery image, FocusBites_sups_824.png, prints Stevia Extract. Stevia Extract and Stevia Leaf Extract are the same Limited t159u row, so the grade does not change. This row uses the bottle photo. Steviol Glycoside is the singular token. Monkfruit Extract is not Monk Fruit Extract. ',
  }),
];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const digits = code.split('').map((d) => Number(d));
  const sum = digits.slice(0, 11).reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === digits[11];
}

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: number; barcode: string; note: boolean }> = {
  'naturalstacks-b328-magtech-lemonade': { verdict: 'clean', counted: 0, barcode: '', note: true },
  'naturalstacks-b328-hydrate-drink': { verdict: 'caution', counted: 2, barcode: '850038130923', note: false },
  'naturalstacks-b328-hydrate-creatine-watermelon': { verdict: 'caution', counted: 1, barcode: '850038130992', note: false },
  'naturalstacks-b328-focus-bites-30': { verdict: 'caution', counted: 2, barcode: '850038130732', note: true },
};

const ROWS = BATCH328_KYR6E_T131E;
if (ROWS.length !== Object.keys(EXPECTED).length) throw new Error(`batch328 count ${ROWS.length}`);
const seen = new Set<string>();
for (const record of ROWS) {
  if (seen.has(record.id)) throw new Error(`batch328 duplicate ${record.id}`);
  seen.add(record.id);
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch328 unexpected ${record.id}`);
  if (record.verdict !== expected.verdict) throw new Error(`batch328 verdict ${record.id} ${record.verdict}`);
  if ((record.barcode ?? '') !== expected.barcode) throw new Error(`batch328 barcode ${record.id}`);
  if (record.barcode && !upcCheck(record.barcode)) throw new Error(`batch328 upc ${record.id} ${record.barcode}`);
  if (expected.note && !record.honestNote) throw new Error(`batch328 note ${record.id}`);
  if (!expected.note && record.honestNote) throw new Error(`batch328 extra note ${record.id} ${record.honestNote}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== expected.counted) {
    throw new Error(`batch328 stack ${record.id} ${counted.map((item) => item.name).join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch328 blank ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch328 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
