// DRAFT / not verified / batch 310 KYR6-d (t117u continue).
// Brand-page supplement-facts images are the single source.
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

const GLY =
  'Methodology §5 Cleared (vegetable glycerin).';
const PG =
  'Methodology §5 Limited (propylene glycol, oral, founder lock t138u). Counts toward the t137u stack.';
const RICE =
  'Methodology §5 Cleared (Organic Rice Fiber — t84u). Does not count toward the t137u stack.';
const HPMC =
  'Methodology §5 Cleared (HPMC / hypromellose capsule).';

const OLIVE =
  'Comvita brand facts image. Olive Leaf Extract. Other ingredients: Vegetable glycerin. Active: Olive (Olea europaea) Leaf Extract. t117u brand page.';
const PROP =
  'Comvita brand facts image. Bee Propolis Extract. Other ingredients: Propylene glycol. Active: Propolis Extract. Oral drops. t117u brand page.';
const FIN =
  'Bestie brand bottle back. Finesse. Other ingredients: Organic Rice Fiber (NU-FLOW), HPMC (vegetable capsule). t117u brand page.';

export const BATCH310_KYR6D_T117U: RatingRecord[] = [
  finish({
    id: 'comvita-b310-olive-leaf',
    productName: 'Comvita Olive Leaf Extract',
    brand: 'Comvita',
    category: 'Herbs',
    formulaId: 'comvita-b310-olive-leaf',
    form: 'liquid',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Comvita'],
    barcode: '',
    activeIngredients: [{ name: 'Olive (Olea europaea) Leaf Extract' }],
    inactiveIngredients: [flag(OLIVE, 'Vegetable glycerin', 'cleared', GLY)],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. Vegetable glycerin is Cleared and does not stack. Olive leaf extract is the active and is not graded. Serving size is 1 tablespoon (15 mL), 33 servings. No UPC was printed on the facts image. Missing UPC.',
    sourcesGeneral: [
      't117u. Comvita brand page https://www.comvita.com/products/olive-leaf-extract-natural is in stock at $24.99. The supplement-facts image prints Other ingredients: Vegetable glycerin. The active is Olive (Olea europaea) Leaf Extract 7.5 mL. Manufactured for Comvita USA. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'comvita-b310-propolis-extract',
    productName: 'Comvita Bee Propolis Extract PFL 30',
    brand: 'Comvita',
    category: 'Herbs',
    formulaId: 'comvita-b310-propolis-extract',
    form: 'drops',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Comvita'],
    barcode: '',
    activeIngredients: [{ name: 'Propolis Extract' }],
    inactiveIngredients: [flag(PROP, 'Propylene glycol', 'limited', PG)],
    verdict: 'caution',
    honestNote:
      'Counted Limited token: Propylene glycol. That is one, so this is not a 3+ stack. Propylene glycol is the oral solvent on this dropper, not the topical form. Propolis extract is the active and is not graded. Serving size is 1 mL (1/4 tsp), 25 servings. No UPC was printed on the facts image. Missing UPC.',
    sourcesGeneral: [
      't117u. Comvita brand page https://www.comvita.com/products/propolis-extract is in stock at $23.99. The supplement-facts image prints Other ingredients: Propylene glycol. The active is Propolis Extract 214 mg. The directions are oral drops. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'bestie-b310-finesse-120',
    productName: 'Bestie Finesse (120 capsules)',
    brand: 'Bestie Supplements',
    category: 'Herbs',
    formulaId: 'bestie-b310-finesse-120',
    form: 'capsule',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Bestie Supplements'],
    barcode: '',
    activeIngredients: [{ name: 'Herbal and vitamin blend' }],
    inactiveIngredients: [
      flag(FIN, 'Organic Rice Fiber', 'cleared', RICE),
      flag(FIN, 'HPMC (vegetable capsule)', 'cleared', HPMC),
    ],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. Organic Rice Fiber is the t84u Cleared fiber and does not stack. HPMC is the vegetable capsule and is Cleared. The supplement-facts blend is the active and is not graded. Serving size is 4 capsules and the container is 30 servings, so this is 120 capsules. No UPC was readable on the bottle back. Missing UPC.',
    sourcesGeneral: [
      't117u. Bestie brand page https://www.bestiesupplements.com/products/finesse is in stock at $39.99. The bottle back prints Other ingredients: Organic Rice Fiber (NU-FLOW), HPMC (vegetable capsule). Serving size 4 capsules, 30 servings. No UPC was readable. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'bestie-b310-creatine-30',
    productName: 'Bestie Creatine (30 servings)',
    brand: 'Bestie Supplements',
    category: 'Vitamins',
    formulaId: 'bestie-b310-creatine-30',
    form: 'powder',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Bestie Supplements'],
    barcode: '',
    activeIngredients: [{ name: 'Creatine Monohydrate' }],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. The supplement-facts panel lists only Creatine Monohydrate, 5 g per scoop, 30 servings. It does not print an other-ingredients line. Creatine monohydrate is the active and is not graded. A barcode is printed on the pouch and the digits were not readable. Missing UPC.',
    sourcesGeneral: [
      't117u. Bestie brand page https://www.bestiesupplements.com/products/creatine is in stock at $24.99. The pouch panel lists Creatine Monohydrate 5 g and does not print other ingredients. 30 servings. The barcode digits were not readable. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH310_KYR6D_T117U;
if (ROWS.length !== 4) throw new Error(`batch310 count ${ROWS.length}`);
const expect: Record<string, string> = {
  'comvita-b310-olive-leaf': 'clean',
  'comvita-b310-propolis-extract': 'caution',
  'bestie-b310-finesse-120': 'clean',
  'bestie-b310-creatine-30': 'clean',
};
for (const record of ROWS) {
  if (record.verdict !== expect[record.id]) throw new Error(`batch310 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch310 barcode ${record.id}`);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch310 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (record.id === 'comvita-b310-propolis-extract') {
    if (counted.length !== 1) throw new Error(`batch310 stack ${record.id} ${counted.map((i) => i.name).join(',')}`);
  } else if (counted.length !== 0) {
    throw new Error(`batch310 stack ${record.id}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch310 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch310 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
