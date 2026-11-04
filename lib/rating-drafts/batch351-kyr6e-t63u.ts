// DRAFT / not verified / batch 351 KYR6-e (t63u).
// Nature's Answer Milk Thistle 120. Same other-ingredient line as the 60.
// Fenugreek 1 oz is not for sale. The Sprouts section is not edited. No new locks.

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
  rice: 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.',
  cell: 'Methodology §5 Cleared (vegetable cellulose capsule).',
  casil: 'Methodology §5 Caution (calcium silicate). Zero-point Caution cap. Does not count toward the t137u stack.',
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
      source: `Nature's Answer Milk Thistle standardized formula. t63u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

export const BATCH351_KYR6E_T63U: RatingRecord[] = [
  row({
    id: 'naturesanswer-b351-milk-thistle-120',
    productName: 'Nature\'s Answer Milk Thistle (120 capsules)',
    form: 'capsule',
    barcode: '083000164163',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Rice Flour', 'moderate', 'rice'],
      ['Vegetable Cellulose (capsule)', 'cleared', 'cell'],
      ['Calcium Silicate', 'moderate', 'casil'],
    ],
    source: 't63u. https://naturesanswer.com/products/milk-thistle-standardized lists the 120 capsules at $37.99 and in stock, SKU 16416. The user supplied the Amazon other-ingredients line for this count: Rice Flour, Vegetable Cellulose (capsule), Calcium Silicate. That is the same line as naturesanswer-b348-milk-thistle-60. Actives are the same as that row. Counted Limited tokens: none. Rice Flour and Calcium Silicate are Caution caps and do not stack. The variant barcode field lists 083000164163. The check digit passes.',
  }),
];

const ROWS = BATCH351_KYR6E_T63U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
function upcCheck(code: string): boolean {
  if (!code) return true;
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (ROWS.length !== 1) throw new Error(`batch351 count ${ROWS.length}`);
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
