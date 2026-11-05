// DRAFT / not verified / batch 350 KYR6-e (t59u).
// Nature's Answer holds whose other-ingredient lines are locked after the t59u strings.
// Fenugreek 1 oz and Milk Thistle 120 stay held. The Sprouts section is not edited.

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
  malt: 'Methodology §5 Cleared (t130e). Malt extract. Does not count toward the t137u stack.',
  syrup: 'Methodology §5 Cleared (t59u). Orange Syrup is a named food syrup. Does not count toward the t137u stack.',
  honey: 'Methodology §5 Cleared (honey, a food sweetener). Does not count toward the t137u stack.',
  ferm: 'Methodology §5 Cleared (t59u). Alcohol through fermentation: 4.5% v/v alcohol. The full phrase is one token. Does not count toward the t137u stack.',
  water: 'Methodology §5 Cleared (water / purified water).',
  alc: 'Methodology §5 Cleared (t59u). 11-15% Certified Organic Alcohol. Does not count toward the t137u stack.',
  flavors: 'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavors. Counts toward the t137u stack.',
  flavor1: 'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavor. Counts toward the t137u stack.',
  lohan: 'Methodology §5 Cleared (monk fruit / mogrosides, high-purity extract). Lo Han Fruit Extract. FDA GRAS; EFSA positive opinion, 2024. Does not count toward the t137u stack.',
  stevia: 'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u). Counts toward the t137u stack.',
  gly: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  xanthan: 'Methodology §5 Cleared (xanthan gum).',
  citric: 'Methodology §5 Cleared (citric acid).',
  malic: 'Methodology §5 Cleared (malic acid).',
  luo: 'Methodology §5 Cleared (t59u). Luo Han Guo Extract. High-purity monk fruit / mogrosides (FDA GRAS; EFSA positive opinion, 2024). Does not count toward the t137u stack.',
  orange: 'Methodology §5 Cleared (t130e). Orange Oil. Does not count toward the t137u stack.',
  quikAlmaExt: 'Methodology §5 Cleared (t59u). Quik-Sorb® (Ginger Rhizome, Alma Fruit Extract, Capsicum Fruit). The parenthesis is one token. Does not count toward the t137u stack.',
  natOrange: 'Methodology §5 Cleared (t59u). Natural Orange Oil. The word Natural is part of this token. Does not count toward the t137u stack.',
  rosemary: 'Methodology §5 Cleared (t61u). Rosemary Oil (Antioxidant). Named oil used as fill/antioxidant in an oral fish-oil panel, under the named-oil rule (docs/METHODOLOGY.md line 537). Does not count toward the t137u stack. Not Rosemary Oil and not Rosemary Extract.',
  toco: 'Methodology §5 Cleared (tocopherol, a vitamin E antioxidant).',
  quikAlma: 'Methodology §5 Cleared (t48u). Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit). Does not count toward the t137u stack.',
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
      source: `Nature's Answer brand facts image. t59u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

export const BATCH350_KYR6E_T59U: RatingRecord[] = [
  row({
    id: 'naturesanswer-b350-strath-liquid-84',
    productName: 'Nature\'s Answer Strath Original Liquid (8.4 oz)',
    form: 'liquid',
    barcode: '',
    actives: [{ name: 'Plasmolyzed herbal yeast (Saccharomyces cerevisiae, proprietary herbal blend)', strength: '5,400 mg' }],
    ings: [
      ['Malt Extract', 'cleared', 'malt'],
      ['Orange Syrup', 'cleared', 'syrup'],
      ['Raw Honey', 'cleared', 'honey'],
      ['Alcohol through fermentation: 4.5% v/v alcohol', 'cleared', 'ferm'],
    ],
    source: 't59u. https://naturesanswer.com/products/bio-strath-liquid lists the 8.4 oz at $29.99 and in stock. Serving size 1 teaspoonful (5 ml), 50 servings. Other Ingredients: Malt Extract, Orange Syrup, Raw Honey. Alcohol through fermentation: 4.5% v/v alcohol. The panel also says Contains: Gluten and Contains: Bee Product. The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b350-liposomal-c-8',
    productName: 'Nature\'s Answer Liposomal Vitamin C 1000 mg (8 oz)',
    form: 'liquid',
    barcode: '083000269400',
    actives: [{ name: 'Vitamin C (as Sodium Ascorbate)', strength: '1,000 mg' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['11-15% Certified Organic Alcohol', 'cleared', 'alc'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Lo Han Fruit Extract', 'cleared', 'lohan'],
      ['Stevia Leaf Extract', 'limited', 'stevia'],
    ],
    source: 't59u. https://naturesanswer.com/products/liposomal-vitamin-c-natures-answer-epifytosomes-vitamin-c-1000-mg-per-serving lists this pack at $52.99 and in stock. Serving size 6 mL, 40 servings. Other Ingredients: Purified Water, 11-15% Certified Organic Alcohol, Natural Flavors, Lo Han Fruit Extract, Stevia Leaf Extract. Counted Limited tokens: Natural Flavors, Stevia Leaf Extract. The variant barcode field lists 083000269400. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b350-glucosamine-16',
    productName: 'Nature\'s Answer Glucosamine and Chondroitin (16 oz)',
    form: 'liquid',
    barcode: '083000261558',
    actives: [{ name: 'Glucosamine (as Sulfate)', strength: '1,500 mg' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['Natural Flavor', 'limited', 'flavor1'],
      ['Xanthan Gum', 'cleared', 'xanthan'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Malic Acid', 'cleared', 'malic'],
      ['Luo Han Guo Extract', 'cleared', 'luo'],
      ['Orange Oil', 'cleared', 'orange'],
      ['Quik-Sorb® (Ginger Rhizome, Alma Fruit Extract, Capsicum Fruit)', 'cleared', 'quikAlmaExt'],
    ],
    source: 't59u. https://naturesanswer.com/products/liquid-glucosamine-and-chondroitin-16-oz lists this pack at $27.99 and in stock. Serving size 1 tablespoon (15 mL), 32 servings. Other Ingredients: Vegetable Glycerin, Purified Water, Natural Flavor, Xanthan Gum, Citric Acid, Malic Acid, Luo Han Guo Extract, Orange Oil, Quik-Sorb® (Ginger Rhizome, Alma Fruit Extract, Capsicum Fruit). Counted Limited token: Natural Flavor. The variant barcode field lists 083000261558. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b350-omega-3-16',
    productName: 'Nature\'s Answer Omega-3 (16 oz)',
    form: 'liquid',
    barcode: '083000261374',
    actives: [{ name: 'Fish Oil', strength: '4.2 g' }],
    ings: [
      ['Natural Orange Oil', 'cleared', 'natOrange'],
      ['Rosemary Oil (Antioxidant)', 'cleared', 'rosemary'],
      ['Tocopherol (Antioxidant)', 'cleared', 'toco'],
      ['Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit)', 'cleared', 'quikAlma'],
    ],
    source: 't59u. https://naturesanswer.com/products/omega-3-liquid-16oz lists this pack at $42.99 and in stock. Serving size 1 teaspoon (5 mL), 96 servings. Other Ingredients: Natural Orange Oil, Rosemary Oil (Antioxidant), Tocopherol (Antioxidant), Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit). Counted Limited tokens: none. Rosemary Oil (Antioxidant) is Cleared (t61u) and does not stack. The variant barcode field lists 083000261374. The check digit passes.',
  }),
];

const ROWS = BATCH350_KYR6E_T59U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
function upcCheck(code: string): boolean {
  if (!code) return true;
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (ROWS.length !== 4) throw new Error(`batch350 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(record.id);
  ids.add(record.id);
  if (!upcCheck(record.barcode)) throw new Error(record.id + ' upc');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== record.verdict) throw new Error(`${record.id} ${record.verdict} vs ${roll.verdict}`);
  const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length >= 3) {
    if (!(record.honestNote || '').includes('stacking rule (t137u)')) throw new Error(record.id + ' note');
  } else if (record.honestNote) throw new Error(record.id + ' extra ' + record.honestNote);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
