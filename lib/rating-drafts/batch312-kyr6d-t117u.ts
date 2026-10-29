// DRAFT / not verified / batch 312 KYR6-d (t117u continue 2).
// Brand-page facts images are the single source.
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

const RICE =
  'Methodology §5 Cleared (Organic Rice Fiber — t84u). Does not count toward the t137u stack.';
const HPMC = 'Methodology §5 Cleared (HPMC / hypromellose capsule).';
const SYRUP = 'Methodology §5 Cleared (tapioca syrup).';
const SUGAR = 'Methodology §5 Cleared (cane sugar).';
const WATER = 'Methodology §5 Cleared (water).';
const PECTIN = 'Methodology §5 Cleared (pectin).';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const CITRATE = 'Methodology §5 Cleared (sodium citrate).';

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

function bestie(
  id: string,
  productName: string,
  caps: number,
  servings: number,
  url: string,
): RatingRecord {
  const count = caps * servings;
  const panel = `Bestie brand bottle back. ${productName}. Other ingredients: Organic Rice Fiber (Nu-FLOW), HPMC (vegetable capsule). t117u brand page.`;
  return finish({
    id,
    productName: `${productName} (${count} capsules)`,
    brand: 'Bestie Supplements',
    category: 'Herbs',
    formulaId: id,
    form: 'capsule',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Bestie Supplements'],
    barcode: '',
    activeIngredients: [{ name: 'Herbal and vitamin blend' }],
    inactiveIngredients: [
      flag(panel, 'Organic Rice Fiber', 'cleared', RICE),
      flag(panel, 'HPMC (vegetable capsule)', 'cleared', HPMC),
    ],
    verdict: 'clean',
    honestNote: `Counted Limited tokens: none. Organic Rice Fiber is the t84u Cleared fiber and does not stack. HPMC is the vegetable capsule and is Cleared. The supplement-facts blend is the active and is not graded. Serving size is ${caps} capsules and the container is ${servings} servings, so this is ${count} capsules. No UPC was readable on the bottle back. Missing UPC.`,
    sourcesGeneral: [
      `t117u. Bestie brand page ${url} is in stock at $39.99. The bottle back prints Other ingredients: Organic Rice Fiber (Nu-FLOW), HPMC (vegetable capsule). Serving size ${caps} capsules, ${servings} servings. No UPC was readable. Missing UPC. No code was invented.`,
    ],
  });
}

const GUM =
  'Cheribundi brand supplement facts. Pure Gummies. Ingredients: Tapioca Syrup, Cane Sugar, Water, Pectin, Citric Acid, Sodium Citrate. Actives are the tart cherry juice concentrate and tart cherry fruit extract. t117u brand page.';

export const BATCH312_KYR6D_T117U: RatingRecord[] = [
  bestie(
    'bestie-b312-brain-flex-80',
    'Bestie Brain Flex',
    4,
    20,
    'https://www.bestiesupplements.com/products/brain-flex',
  ),
  bestie(
    'bestie-b312-glow-up-60',
    'Bestie Glow Up',
    3,
    20,
    'https://www.bestiesupplements.com/products/glow-up',
  ),
  bestie(
    'bestie-b312-hey-ladies-60',
    'Bestie Hey Ladies',
    3,
    20,
    'https://www.bestiesupplements.com/products/hey-ladies',
  ),
  bestie(
    'bestie-b312-vibe-check-60',
    'Bestie Vibe Check',
    3,
    20,
    'https://www.bestiesupplements.com/products/vibe-check',
  ),
  bestie(
    'bestie-b312-baby-dancin-60',
    'Bestie Baby Dancin',
    3,
    20,
    'https://www.bestiesupplements.com/products/baby-dancin',
  ),
  finish({
    id: 'cheribundi-b312-pure-gummies-60',
    productName: 'Cheribundi Pure Gummies (60 gummies)',
    brand: 'Cheribundi',
    category: 'Herbs',
    formulaId: 'cheribundi-b312-pure-gummies-60',
    form: 'gummy',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Cheribundi'],
    barcode: '',
    activeIngredients: [
      { name: 'Tart Cherry Juice Concentrate' },
      { name: 'Tart Cherry Fruit Extract (Prunus cerasus)' },
    ],
    inactiveIngredients: [
      flag(GUM, 'Tapioca Syrup', 'cleared', SYRUP),
      flag(GUM, 'Cane Sugar', 'cleared', SUGAR),
      flag(GUM, 'Water', 'cleared', WATER),
      flag(GUM, 'Pectin', 'cleared', PECTIN),
      flag(GUM, 'Citric Acid', 'cleared', CITRIC),
      flag(GUM, 'Sodium Citrate', 'cleared', CITRATE),
    ],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. Tapioca syrup, cane sugar, water, pectin, citric acid, and sodium citrate are Cleared and do not stack. Tart cherry juice concentrate and tart cherry fruit extract are the supplement-facts actives and are not graded. Serving size is 2 gummies and the container is 30 servings, so this is 60 gummies. No UPC was printed on the facts image. Missing UPC.',
    sourcesGeneral: [
      't117u. Cheribundi brand page https://cheribundi.com/products/pure-gummies is in stock at $60. The supplement facts image prints Ingredients: Tart Cherry Juice Concentrate, Tapioca Syrup, Cane Sugar, Water, Pectin, Citric Acid, Sodium Citrate. Serving size 2 gummies, 30 servings. No UPC was printed. Missing UPC. No code was invented. This is not the written Sleep Gummies.',
    ],
  }),
];

const ROWS = BATCH312_KYR6D_T117U;
if (ROWS.length !== 6) throw new Error(`batch312 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`batch312 dup ${record.id}`);
  ids.add(record.id);
  if (record.verdict !== 'clean') throw new Error(`batch312 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch312 barcode ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch312 stack ${record.id}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch312 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch312 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
