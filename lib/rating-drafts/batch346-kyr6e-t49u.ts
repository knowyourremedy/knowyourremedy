// DRAFT / not verified / batch 346 KYR6-e (t49u).
// Nature's Answer holds opened by the t49u locks, plus two panels that are now clear.
// The Sprouts section is not edited. No other locks.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const SRC: Record<string, string> = {
  sugar: 'Methodology §5 Cleared (Non-GMO Sugar — t130e). Does not count toward the t137u stack.',
  syrup: 'Methodology §5 Caution (corn syrup). Does not count toward the t137u stack.',
  pectin: 'Methodology §5 Cleared (pectin).',
  water: 'Methodology §5 Cleared (water / purified water).',
  citric: 'Methodology §5 Cleared (citric acid).',
  quik: 'Methodology §5 Cleared (t49u). The word and is part of this Quik-Sorb token. Does not count toward the t137u stack.',
  starch: 'Methodology §5 Cleared (corn starch).',
  flavors: 'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavors is the exact t54u name. Counts toward the t137u stack.',
  pge: 'Methodology §5 Limited (t49u). Polyglycerol esters of fatty acid (PGE). 21 CFR 172.854. Counts toward the t137u stack.',
  xanth: 'Methodology §5 Cleared (xanthan gum — t98u). Does not count toward the t137u stack.',
  sorb48: 'Methodology §5 Caution (t48u). Parenthetical potassium sorbate. Zero-point Caution cap. Does not count toward the t137u stack.',
  monk: 'Methodology §5 Cleared (monk fruit extract). Does not count toward the t137u stack.',
  quik48: 'Methodology §5 Cleared (t48u). Quik-Sorb named ginger, alma, and capsicum token. Does not count toward the t137u stack.',
  acacia: 'Methodology §5 Cleared (acacia gum).',
  malto: 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.',
  sorb49: 'Methodology §5 Caution (t49u). Potassium Sorbate (perservative) is the misspelled print. Zero-point Caution cap. Does not count toward the t137u stack.',
  sodium: 'Methodology §5 Cleared (sodium citrate).',
  gly: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  orange: 'Methodology §5 Limited (t54u natural-flavor rule). Natural Orange Flavor is the exact t54u name. Counts toward the t137u stack.',
  vanilla: 'Methodology §5 Cleared (t49u). Natural Vanilla Flavor names vanilla. Does not count toward the t137u stack.',
  gum: 'Methodology §5 Cleared (gum arabic / arabic gum).',
  olive: 'Methodology §5 Cleared (olive oil).',
  rosemary: 'Methodology §5 Cleared (t49u). Rosemary Extract is the named oral rosemary plant. Does not count toward the t137u stack.',
  lemon: 'Methodology §5 Limited (t54u natural-flavor rule). Natural Lemon Flavor is the exact t54u name. Counts toward the t137u stack.',
  fruit: 'Methodology §5 Cleared (Olea Europaea (Olive) Fruit Oil — t130e). Does not count toward the t137u stack.',
};

type Ing = readonly [string, RiskLevel, string];

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

function row(args: {
  id: string;
  productName: string;
  form: string;
  barcode: string;
  ings: Ing[];
  actives: ActiveIngredient[];
  source: string;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: "Nature's Answer",
    category: 'Herbs',
    formulaId: args.id,
    form: args.form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ["Nature's Answer"],
    barcode: args.barcode,
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, key]) => ({
      name,
      riskLevel,
      source: `Nature's Answer brand facts image. t49u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

export const BATCH346_KYR6E_T49U: RatingRecord[] = [
  row({
    id: 'naturesanswer-b346-acv-ginger-45',
    productName: "Nature's Answer Apple Cider Vinegar and Ginger Gummies (45 gummies)",
    form: 'gummy',
    barcode: '083000262883',
    ings: [
      ['Non-GMO Sugar', 'cleared', 'sugar'],
      ['Non-GMO Corn Syrup', 'moderate', 'syrup'],
      ['Pectin', 'cleared', 'pectin'],
      ['Purified water', 'cleared', 'water'],
      ['Non-GMO Citric Acid', 'cleared', 'citric'],
      ['Quik -Sorb® (Ginger Root, Amla Extract, and Capsicum Fruit)', 'cleared', 'quik'],
      ['Non-GMO Corn Starch', 'cleared', 'starch'],
    ],
    actives: [{ name: 'Apple Cider Vinegar and Ginger', strength: 'as printed on the facts image' }],
    source: 't49u. https://naturesanswer.com/products/apple-cider-vinegar-and-ginger-gummies lists 45 gummies at $14.99 and in stock. Other Ingredients: Non-GMO Sugar, Non-GMO Corn Syrup, Pectin, Purified water, Non-GMO Citric Acid, Quik -Sorb® (Ginger Root, Amla Extract, and Capsicum Fruit), Non-GMO Corn Starch. Counted Limited tokens: none. Non-GMO Corn Syrup is Caution and does not stack. The brand variant barcode field lists 083000262883. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b346-coq10-8',
    productName: "Nature's Answer CoQ10 100 mg Liquid (8 oz)",
    form: 'liquid',
    barcode: '083000271489',
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Polyglycerol esters of fatty acid (PGE)', 'limited', 'pge'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Xanthan Gum', 'cleared', 'xanth'],
      ['Potassium Sorbate (as Preservative)', 'moderate', 'sorb48'],
      ['Monk Fruit Extract', 'cleared', 'monk'],
      ['Quik-Sorb® (Ginger Rhizome, Alma Fruit, Capsicum Fruit)', 'cleared', 'quik48'],
    ],
    actives: [{ name: 'CoQ10', strength: '100 mg' }],
    source: 't49u. https://naturesanswer.com/products/liquid-coq10-100mg-8oz lists 8 oz at $24.99 and in stock. Other Ingredients: Purified Water, Natural Flavors, Polyglycerol esters of fatty acid (PGE), Citric Acid, Xanthan Gum, Potassium Sorbate (as Preservative), Monk Fruit Extract, Quik-Sorb® (Ginger Rhizome, Alma Fruit, Capsicum Fruit). Counted Limited tokens: Natural Flavors and Polyglycerol esters of fatty acid (PGE). That is two, so this is not a 3+ stack. The brand variant barcode field lists 083000271489. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b346-fiber-16',
    productName: "Nature's Answer Fiber Liquid (16 oz)",
    form: 'liquid',
    barcode: '083000261749',
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Acacia Gum', 'cleared', 'acacia'],
      ['Maltodextrin', 'limited', 'malto'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Potassium Sorbate (perservative)', 'moderate', 'sorb49'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Sodium Citrate', 'cleared', 'sodium'],
    ],
    actives: [{ name: 'Fiber', strength: 'as printed on the facts image' }],
    source: 't49u. https://naturesanswer.com/products/liquid-fiber-16oz lists 16 oz at $24.99 and in stock. Other Ingredients: Purified Water, Acacia Gum, Maltodextrin, Natural Flavors, Potassium Sorbate (perservative), Citric Acid, Sodium Citrate. Counted Limited tokens: Maltodextrin and Natural Flavors. That is two, so this is not a 3+ stack. Potassium Sorbate (perservative) is the zero-point Caution cap. The brand variant barcode field lists 083000261749. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b346-melatonin-2',
    productName: "Nature's Answer Melatonin Plus (2 oz)",
    form: 'liquid',
    barcode: '083000261367',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['USP Purified Water', 'cleared', 'water'],
      ['Natural Orange Flavor', 'limited', 'orange'],
      ['Natural Vanilla Flavor', 'cleared', 'vanilla'],
      ['Arabic Gum', 'cleared', 'gum'],
      ['Citric Acid', 'cleared', 'citric'],
    ],
    actives: [{ name: 'Melatonin', strength: 'as printed on the facts image' }],
    source: 't49u. https://naturesanswer.com/products/melatonin-plus-2-oz lists 2 oz at $12.99 and in stock. Other Ingredients: Vegetable Glycerin, USP Purified Water, Natural Orange Flavor, Natural Vanilla Flavor, Arabic Gum, Citric Acid. Counted Limited token: Natural Orange Flavor. The brand variant barcode field lists 083000261367. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b346-vitamin-d3-k2',
    productName: "Nature's Answer Vitamin D3 and K2 Liquid (0.5 oz)",
    form: 'liquid',
    barcode: '083000261398',
    ings: [
      ['Olive Oil', 'cleared', 'olive'],
      ['Rosemary Extract', 'cleared', 'rosemary'],
      ['Natural Lemon Flavor', 'limited', 'lemon'],
    ],
    actives: [{ name: 'Vitamin D3 and K2', strength: 'as printed on the facts image' }],
    source: 't49u. https://naturesanswer.com/products/liquid-vitamin-d3 lists 0.5 oz at $24.99 and in stock. Other Ingredients: Olive Oil, Rosemary Extract, Natural Lemon Flavor. Counted Limited token: Natural Lemon Flavor. The brand variant barcode field lists 083000261398. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b346-marine-collagen',
    productName: "Nature's Answer Marine Collagen (4.8 oz)",
    form: 'powder',
    barcode: '083000269202',
    ings: [],
    actives: [
      { name: 'Collagen peptides from hydrolysed fish skin', strength: '5,000 mg' },
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '45 mg' },
    ],
    source: 't49u. https://naturesanswer.com/products/marine-collagen-4-8-oz-powder lists 4.8 oz at $38.99 and in stock. The facts image prints Serving Size 1 scoop (5.5 g), Servings Per Container 24. It prints no other-ingredients line. The amounts are actives. Allergen: Contains Fish (Cod) is not graded. Counted Limited tokens: none. The brand variant barcode field lists 083000269202. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b346-mullein-ear-oil-1',
    productName: "Nature's Answer Mullein Flower Ear Oil (1 oz)",
    form: 'liquid',
    barcode: '083000008641',
    ings: [
      ['Olea Europaea (Olive) Fruit Oil', 'cleared', 'fruit'],
    ],
    actives: [{ name: 'Verbascum Thapsus (Mullein) Flower Extract', strength: 'as printed on the facts image' }],
    source: 't49u. https://naturesanswer.com/products/mullein-flower-ear-oil-1-oz lists 1 fl oz at $14.99 and in stock. The label is for external use. Ingredients: Verbascum Thapsus (Mullein) Flower Extract, Olea Europaea (Olive) Fruit Oil. The mullein extract is the active and is not graded. Counted Limited tokens: none. The brand variant barcode field lists 083000008641. The check digit passes.',
  }),
];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

const ROWS = BATCH346_KYR6E_T49U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
if (ROWS.length !== 7) throw new Error(`batch346 count ${ROWS.length}`);
const expectLimited: Record<string, number> = {
  'naturesanswer-b346-acv-ginger-45': 0,
  'naturesanswer-b346-coq10-8': 2,
  'naturesanswer-b346-fiber-16': 2,
  'naturesanswer-b346-melatonin-2': 1,
  'naturesanswer-b346-vitamin-d3-k2': 1,
  'naturesanswer-b346-marine-collagen': 0,
  'naturesanswer-b346-mullein-ear-oil-1': 0,
};
for (const record of ROWS) {
  if (expectLimited[record.id] === undefined) throw new Error(record.id);
  if (!upcCheck(record.barcode)) throw new Error(record.id + ' upc');
  const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== expectLimited[record.id]) throw new Error(`${record.id} ${counted.map((i) => i.name).join('|')}`);
  if (counted.length >= 3) {
    if (!(record.honestNote || '').includes('stacking rule (t137u)')) throw new Error(record.id + ' note');
  } else if (record.honestNote) throw new Error(record.id + ' extra');
  const cap = record.inactiveIngredients.some((i) => i.riskLevel === 'moderate');
  const want = counted.length >= 3 ? 'avoid' : counted.length > 0 || cap ? 'caution' : 'clean';
  if (record.verdict !== want) throw new Error(`${record.id} ${record.verdict} != ${want}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
