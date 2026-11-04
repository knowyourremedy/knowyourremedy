// DRAFT / not verified / batch 352 KYR6-e (t64u).
// Zand singles whose brand facts images are already locked.
// The Sprouts section is not edited. No new locks.

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
  grain: 'Methodology §5 Limited (pure grain alcohol — alcohol vehicle). Counts toward the t137u stack.',
  water: 'Methodology §5 Cleared (water / purified water).',
  cell: 'Methodology §5 Cleared (cellulose).',
  malt: 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.',
  stearic: 'Methodology §5 Cleared (stearic acid). EFSA 2018, no safety concern.',
  citrus: 'Methodology §5 Cleared (t106u). Citrus (Orange) Bioflavonoids. Does not count toward the t137u stack.',
  bran: 'Methodology §5 Cleared (rice bran — t111u). Does not count toward the t137u stack.',
  silica: 'Methodology §5 Caution (silica — 0-pt Caution cap). Does not count toward the t137u stack.',
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
    brand: 'Zand',
    category: 'Herbs',
    formulaId: args.id,
    form: args.form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: args.barcode,
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, key]) => ({
      name,
      riskLevel,
      source: `Zand brand facts image. t64u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

export const BATCH352_KYR6E_T64U: RatingRecord[] = [
  row({
    id: 'zand-b352-ginger-honey-syrup-8',
    productName: 'Zand Ginger and Honey Syrup (8 oz)',
    form: 'liquid',
    barcode: '022318871820',
    actives: [{ name: 'Honey & Ginger Apitherapy Formula', strength: '6.2 g' }],
    ings: [
      ['Pure Grain Alcohol', 'limited', 'grain'],
      ['Purified Water', 'cleared', 'water'],
    ],
    source: 't64u. https://zand.com/products/ginger-and-honey-syrup-with-organic-apple-cider-vinegar-and-propolis-ginger-root-and-ginger-root-extract-apitherapy-digestive-support-supplement-8-fl-oz-48-servings lists this pack at $23.39 and in stock. The facts image lb_facts_022318871820 prints Serving Size 1 tsp (5 mL), about 48 servings. Other Ingredients: Pure Grain Alcohol and Purified Water. Counted Limited token: Pure Grain Alcohol. Do not give to children under 1 year of age. The variant barcode field lists 022318871820. The check digit passes.',
  }),
  row({
    id: 'zand-b352-super-c-pm-60',
    productName: 'Zand Super C+ PM (60 tablets)',
    form: 'tablet',
    barcode: '041954142088',
    actives: [
      { name: 'Vitamin C (as PUREWAY-C)', strength: '1000 mg' },
      { name: 'Vitamin D-3 (as Cholecalciferol)', strength: '125 mcg' },
      { name: 'Zinc (from Zinc Citrate)', strength: '20 mg' },
      { name: 'Melatonin', strength: '3 mg' },
      { name: 'Elderberry (Sambucus nigra) (berry extract)', strength: '300 mg' },
    ],
    ings: [
      ['Cellulose', 'cleared', 'cell'],
      ['Maltodextrin', 'limited', 'malt'],
      ['Stearic Acid', 'cleared', 'stearic'],
      ['Citrus (Orange) Bioflavonoids', 'cleared', 'citrus'],
      ['Rice Bran', 'cleared', 'bran'],
      ['Silica', 'moderate', 'silica'],
    ],
    source: 't64u. https://zand.com/products/super-c-pm-tablets lists the 60-count at $12.59 and in stock. The facts image lb_facts_041954142088 prints Serving Size 2 Tablets, 30 servings. Other ingredients: Cellulose, Maltodextrin, Stearic Acid, Citrus (Orange) Bioflavonoids, Rice Bran and Silica. Counted Limited token: Maltodextrin. Silica is a Caution cap and does not stack. The label says this product is for adults. The variant barcode field lists 041954142088. The check digit passes.',
  }),
  row({
    id: 'zand-b352-super-c-elderberry-60',
    productName: 'Zand Super C+ Elderberry (60 tablets)',
    form: 'tablet',
    barcode: '041954358182',
    actives: [
      { name: 'Vitamin C (as PUREWAY-C)', strength: '1000 mg' },
      { name: 'Vitamin D-3 (as Cholecalciferol)', strength: '125 mcg' },
      { name: 'Zinc (from Zinc Citrate)', strength: '20 mg' },
      { name: 'Elderberry (Sambucus nigra) (berry extract)', strength: '300 mg' },
    ],
    ings: [
      ['Cellulose', 'cleared', 'cell'],
      ['Maltodextrin', 'limited', 'malt'],
      ['Stearic Acid', 'cleared', 'stearic'],
      ['Citrus (Orange) Bioflavonoids', 'cleared', 'citrus'],
      ['Rice Bran', 'cleared', 'bran'],
      ['Silica', 'moderate', 'silica'],
    ],
    source: 't64u. https://zand.com/products/super-c-elderberry-tablets lists the 60-count at $13.69 and in stock. The facts image lb_facts_041954358182 prints Serving Size 2 Tablets, 30 servings. Other Ingredients: Cellulose, Maltodextrin, Stearic Acid, Citrus (Orange) Bioflavonoids, Rice Bran and Silica. Counted Limited token: Maltodextrin. Silica is a Caution cap and does not stack. The variant barcode field lists 041954358182. The check digit passes.',
  }),
];

const ROWS = BATCH352_KYR6E_T64U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
function upcCheck(code: string): boolean {
  if (!code) return true;
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (ROWS.length !== 3) throw new Error(`batch352 count ${ROWS.length}`);
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
