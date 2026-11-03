// DRAFT / not verified / batch 347 KYR6-e (t50u).
// Nattokinase and Strath Koji iron. Bio-Ear stays held.
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
  flour: 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.',
  cell: 'Methodology §5 Cleared (vegetable cellulose capsule).',
  calicium: 'Methodology §5 Caution (t50u). Calicium Silicate is the misspelled print of calcium silicate. Does not count toward the t137u stack.',
  micro: 'Methodology §5 Limited (t50u). Microcrystaline Cellulose (Bulking Agent). Counts toward the t137u stack.',
  phos: 'Methodology §5 Cleared (calcium phosphate). Does not count toward the t137u stack.',
  starch: 'Methodology §5 Cleared (corn starch).',
  hydroxy: 'Methodology §5 Limited (t50u). Hydroxpropyl Methyl Cellulose (Glazing Agent). Counts toward the t137u stack.',
  caramel: 'Methodology §5 Cleared (t50u). Plain Caramel (Color). Does not count toward the t137u stack.',
  fatstab: 'Methodology §5 Limited (t130e). Fatty Acids (Stabilizer). Counts toward the t137u stack.',
  fatcoat: 'Methodology §5 Limited (t130e). Fatty Acids (Coating Agent). Counts toward the t137u stack.',
  rich: 'Methodology §5 Cleared (t50u). Rich Starch. Does not count toward the t137u stack.',
  carbon: 'Methodology §5 Cleared (vegetable carbon color — t130e). Does not count toward the t137u stack.',
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
      source: `Nature's Answer brand facts image. t50u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

export const BATCH347_KYR6E_T50U: RatingRecord[] = [
  row({
    id: 'naturesanswer-b347-nattokinase-60',
    productName: "Nature's Answer Nattokinase NSK-SD (60 capsules)",
    form: 'capsule',
    barcode: '083000165757',
    ings: [
      ['Rice Flour', 'moderate', 'flour'],
      ['Vegetable Cellulose (Capsule)', 'cleared', 'cell'],
      ['Calicium Silicate', 'moderate', 'calicium'],
    ],
    actives: [{ name: 'Nattokinase NSK-SD', strength: '100 mg (2,000 FU)' }],
    source: 't50u. https://naturesanswer.com/products/nattokinase-capsules-with-nsk-sd lists 60 capsules at $49.99 and in stock. The facts image prints Serving Size 1 Capsule, Servings Per Container 60. Other Ingredients: Rice Flour, Vegetable Cellulose (Capsule), and Calicium Silicate. Contains Non-GMO soy is an allergen line and is not graded. The free-from list is not graded. Counted Limited tokens: none. Rice flour and Calicium Silicate are Caution and do not stack. The brand variant barcode field lists 083000165757. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b347-strath-koji-30',
    productName: "Nature's Answer Strath Tablets with Koji Mushroom Iron (30 tablets)",
    form: 'tablet',
    barcode: '',
    ings: [
      ['Microcrystaline Cellulose (Bulking Agent)', 'limited', 'micro'],
      ['Calcium Phosphates (Bulking Agent)', 'cleared', 'phos'],
      ['Corn Starch', 'cleared', 'starch'],
      ['Hydroxpropyl Methyl Cellulose (Glazing Agent)', 'limited', 'hydroxy'],
      ['Plain Caramel (Color)', 'cleared', 'caramel'],
      ['Fatty Acids (Stabilizer)', 'limited', 'fatstab'],
      ['Fatty Acids (Coating Agent)', 'limited', 'fatcoat'],
      ['Rich Starch', 'cleared', 'rich'],
      ['Vegetable Carbon (Color)', 'cleared', 'carbon'],
    ],
    actives: [
      { name: 'Iron (from fermented Koji Culture)', strength: '11 mg' },
      { name: 'Vitamin C (from acerola)', strength: '9 mg' },
      { name: 'Plasmolyzed herbal yeast', strength: '276 mg' },
    ],
    source: 't50u. https://naturesanswer.com/products/strath-tablets-with-koji-mushroom-iron-100-tabs lists 30 tablets at $29.99 and in stock. The facts image prints Serving Size 1 Tablet, Servings Per Container 30. Other Ingredients: Microcrystaline Cellulose (Bulking Agent), Calcium Phosphates (Bulking Agent), Corn Starch, Hydroxpropyl Methyl Cellulose (Glazing Agent), Plain Caramel (Color), Fatty Acids (Stabilizer), Fatty Acids (Coating Agent), Rich Starch, Vegetable Carbon (Color). Counted Limited tokens: Microcrystaline Cellulose (Bulking Agent), Hydroxpropyl Methyl Cellulose (Glazing Agent), Fatty Acids (Stabilizer), and Fatty Acids (Coating Agent). That is four. The variant barcode field is empty. Missing UPC.',
  }),
];

function upcCheck(code: string): boolean {
  if (!code) return true;
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

const ROWS = BATCH347_KYR6E_T50U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
if (ROWS.length !== 2) throw new Error(`batch347 count ${ROWS.length}`);
const expect: Record<string, { verdict: string; limited: string }> = {
  'naturesanswer-b347-nattokinase-60': { verdict: 'caution', limited: '' },
  'naturesanswer-b347-strath-koji-30': {
    verdict: 'avoid',
    limited: 'Microcrystaline Cellulose (Bulking Agent)|Hydroxpropyl Methyl Cellulose (Glazing Agent)|Fatty Acids (Stabilizer)|Fatty Acids (Coating Agent)',
  },
};
for (const record of ROWS) {
  const want = expect[record.id];
  if (!want) throw new Error(record.id);
  if (!upcCheck(record.barcode)) throw new Error(record.id + ' upc');
  if (record.verdict !== want.verdict) throw new Error(`${record.id} ${record.verdict}`);
  const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i)).map((i) => i.name);
  if (counted.join('|') !== want.limited) throw new Error(`${record.id} ${counted.join('|')}`);
  if (want.verdict === 'avoid') {
    const note = record.honestNote ?? '';
    if (!note.startsWith('Avoid: three or more Limited tokens triggered the stacking rule (t137u): ')) throw new Error(note);
    if (!note.includes(counted.join(', '))) throw new Error(note);
  } else if (record.honestNote) throw new Error(record.honestNote);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
