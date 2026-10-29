// DRAFT / not verified / batch 314 KYR6-d (t119u continue).
// Brand facts image is the single source. No UPC was printed.
// No brand is closed. The Sprouts section is not edited.

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

const PANEL =
  'Elevate Organic brand facts image. Ashwagandha Gummies, 75 gummies. t119u brand page.';

function flag(name: string, riskLevel: RiskLevel, whySource: string): IngredientFlag {
  return { name, riskLevel, source: `${PANEL}; ${whySource}` };
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH314_KYR6D_T119U: RatingRecord[] = [
  finish({
    id: 'elevate-b314-ashwagandha-gummies-75',
    productName: 'Elevate Organic Ashwagandha Gummies (75 gummies)',
    brand: 'Elevate Organic',
    category: 'Herbs',
    formulaId: 'elevate-b314-ashwagandha-gummies-75',
    form: 'gummy',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Elevate Organic'],
    barcode: '',
    activeIngredients: [
      { name: 'Ashwagandha Root Extract (KSM-66)' },
      { name: 'Organic Acti Veda Proprietary Blend' },
    ],
    inactiveIngredients: [
      flag('Organic Tapioca Syrup', 'cleared', 'Methodology §5 Cleared (tapioca syrup).'),
      flag('Organic Cane Sugar', 'cleared', 'Methodology §5 Cleared (cane sugar).'),
      flag('Water', 'cleared', 'Methodology §5 Cleared (water).'),
      flag('Organic Pectin', 'cleared', 'Methodology §5 Cleared (pectin).'),
      flag(
        'Organic Natural Flavor',
        'limited',
        'Methodology §5 Limited (organic natural flavor, t54u). Counts toward the t137u stack.',
      ),
      flag('Citric Acid', 'cleared', 'Methodology §5 Cleared (citric acid).'),
      flag('Sodium Citrate', 'cleared', 'Methodology §5 Cleared (sodium citrate).'),
      flag('Malic Acid', 'cleared', 'Methodology §5 Cleared (malic acid).'),
      flag(
        'Organic Natural Color',
        'cleared',
        'Methodology §5 Cleared (Organic Natural Color — t106u). Does not count toward the t137u stack.',
      ),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited token: Organic Natural Flavor. That is one, so this is not a 3+ stack. Organic tapioca syrup, organic cane sugar, water, organic pectin, citric acid, sodium citrate, malic acid, and organic natural color are Cleared and do not stack. Ashwagandha root extract and the Acti Veda blend are the supplement-facts actives and are not graded. Serving size is 3 gummies and the container is 25 servings, so this is 75 gummies. No UPC was printed on the facts image. Missing UPC.',
    sourcesGeneral: [
      't119u. Elevate Organic brand page https://www.elevateorganic.com/products/organic-regenerative-ashwagandha-75ct-gummy is in stock at $24.95. The facts image prints Other Ingredients: Organic Tapioca Syrup, Organic Cane Sugar, Water, Organic Pectin, Organic Natural Flavor, Citric Acid, Sodium Citrate, Malic Acid, Organic Natural Color. Mixed berry flavor. 75 vegan gummies. No UPC was printed. Missing UPC. No code was invented. A barcode field was empty on the product feed.',
    ],
  }),
];

const ROWS = BATCH314_KYR6D_T119U;
if (ROWS.length !== 1) throw new Error('batch314 count');
for (const record of ROWS) {
  if (record.verdict !== 'caution') throw new Error(`batch314 verdict ${record.verdict}`);
  if (record.barcode) throw new Error('batch314 barcode');
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 1 || counted[0].name !== 'Organic Natural Flavor') {
    throw new Error(`batch314 stack ${counted.map((i) => i.name).join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch314 generic ${ingredient.name}: ${why}`);
    }
  }
}
