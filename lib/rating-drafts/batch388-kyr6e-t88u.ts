// DRAFT / not verified / batch 388 KYR6-e (t88u).
// Turmeric Power Plus 120 gelcaps uses the readable 60-gelcap panel.
// The 120-count package digits are its own UPC. No other hold is written.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import { applyT83uRow } from '../scan-preview/t83uLocks';
import { applyT86uRow } from '../scan-preview/t86uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT86uRow(applyT83uRow(applyT54uRow(record)));
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

function cleared86(name: string): IngredientFlag {
  return {
    name,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: 'Methodology §5 Cleared (t86u). This exact printed string is Cleared and does not stack.',
  };
}

const BEESWAX: IngredientFlag = {
  name: 'beeswax',
  riskLevel: 'cleared',
  stackCountExempt: true,
  source: 'Methodology §5 Cleared (t98u). This exact printed string is Cleared and does not stack.',
};

const SUNFLOWER_LECITHIN: IngredientFlag = {
  name: 'sunflower lecithin',
  riskLevel: 'cleared',
  stackCountExempt: true,
  source: 'Methodology §5 Cleared. Sunflower lecithin is the lecithin lock. It does not stack.',
};

export const BATCH388_KYR6E_T88U: RatingRecord[] = [
  finish({
    id: 'nahs-b388-turmeric-120',
    productName: 'North American Herb & Spice Turmeric Power Plus (120 gelcaps)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b388-turmeric-120',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'HerbsPro'],
    barcode: '635824006664',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1000 mg' },
      { name: 'Black seed oil (Nigella sativa)', strength: '' },
      { name: 'CO2-extracted wild, organic turmeric (turmerones 100 mg)', strength: '' },
      { name: 'Wild, organic oregano oil', strength: '' },
      { name: 'Wild organic turmeric extract (curcuminoids 22 mg)', strength: '' },
      { name: 'Coconut crème oil', strength: '' },
      { name: 'Organic ginger oleoresin', strength: '' },
      { name: 'Wild rosemary oil', strength: '' },
      { name: 'Mycellized wild, organic oregano oil', strength: '' },
    ],
    inactiveIngredients: [cleared86('fish gelatin'), { ...BEESWAX }, { ...SUNFLOWER_LECITHIN }],
    verdict: 'clean',
    sourcesGeneral: [
      't88u. The same Turmeric Power Plus gelcap formula already has a readable panel on nahs-b387-turmeric-60. That panel is the shared panel for this count. Serving size 2 capsules. The 120-count crop shows Servings per container 60. Proprietary blend 1000 mg. The eight rows have no separate amounts: Black seed oil (Nigella sativa), CO2-extracted wild, organic turmeric (turmerones 100 mg), Wild, organic oregano oil, Wild organic turmeric extract (curcuminoids 22 mg), Coconut crème oil, Organic ginger oleoresin, Wild rosemary oil, and Mycellized wild, organic oregano oil. Those rows are actives and are not graded. Other ingredients: fish gelatin, beeswax, sunflower lecithin. fish gelatin is the t86u Cleared lock. beeswax is the t98u Cleared lock. sunflower lecithin is the lecithin lock. This product is 100% non-GMO is a claim. Contains: Fish (Tilapia), Tree Nuts (Coconut) is an allergen line. Label directions say two or more capsules daily. The brand page lists 120 gelcaps at $57.99. HerbsPro is In Stock. Our Price is $49.29. M.R.P. $57.99 is not the shelf price on that page. The package photograph prints 6 35824 00666 4. The check digit passes. UPC 635824006664. This code is the 120 gelcaps only. The 60-count code 635824006671 stays on its own row. The 2 oz drops have no confirmed package UPC and are not this row. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH388_KYR6E_T88U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch388 count ${ROWS.length}`);
const row = ROWS[0];
if (row.id !== 'nahs-b388-turmeric-120' || row.barcode !== '635824006664' || !upcCheck(row.barcode ?? '')) {
  throw new Error('batch388 upc');
}
if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
  throw new Error('batch388 grade');
}
if (row.activeIngredients.length !== 9 || row.inactiveIngredients.length !== 3) throw new Error('batch388 lines');
const roll = computeVerdictFromInactiveIngredients(row.inactiveIngredients);
if (roll.verdict !== 'clean') throw new Error('batch388 rollup');
if (row.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) {
  throw new Error('batch388 stack');
}
for (const ingredient of row.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why || banned.test(why) || !/cleared/i.test(why)) throw new Error(`batch388 ${ingredient.name}: ${why}`);
}
const source = (row.sourcesGeneral ?? []).join(' ');
if (banned.test(source) || source.includes('None is printed')) throw new Error('batch388 source');
if (!row.retailers.includes('North American Herb & Spice')) throw new Error('batch388 carrier');
