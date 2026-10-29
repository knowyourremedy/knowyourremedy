// DRAFT / not verified / batch 315 KYR6-d (t121u).
// Brand facts image is the single source. The citrus tin UPC is on that image.
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
  'Prepare Your Mind brand facts image. Mood Chews, lemon balm citrus tin, 20 chews. t121u brand page.';

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

function upcACheckPasses(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const digits = code.split('').map((d) => Number(d));
  const sum = digits.slice(0, 11).reduce((total, digit, index) => total + digit * (index % 2 === 0 ? 3 : 1), 0);
  const check = (10 - (sum % 10)) % 10;
  return check === digits[11];
}

export const BATCH315_KYR6D_T121U: RatingRecord[] = [
  finish({
    id: 'pym-b315-mood-chews-citrus-20',
    productName: 'Prepare Your Mind Mood Chews Lemon Balm Citrus (20 chews)',
    brand: 'Prepare Your Mind',
    category: 'Vitamins',
    formulaId: 'pym-b315-mood-chews-citrus-20',
    form: 'chew',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Prepare Your Mind'],
    barcode: '860004555308',
    activeIngredients: [
      { name: 'GABA (Gamma-Aminobutyric Acid)', strength: '130 mg' },
      { name: 'L-Theanine', strength: '90 mg' },
    ],
    inactiveIngredients: [
      flag('Tapioca Syrup', 'cleared', 'Methodology §5 Cleared (tapioca syrup).'),
      flag('Erythritol', 'limited', 'Methodology §5 Caution (erythritol). Does not count toward the t137u stack.'),
      flag('Filtered Water', 'cleared', 'Methodology §5 Cleared (water).'),
      flag('Pectin', 'cleared', 'Methodology §5 Cleared (pectin).'),
      flag(
        'Natural Lemon Balm Citrus Flavor',
        'moderate',
        'Methodology §5 Caution (Natural Lemon Balm Citrus Flavor — t121u). Does not count toward the t137u stack.',
      ),
      flag('Citric Acid', 'cleared', 'Methodology §5 Cleared (citric acid).'),
      flag('Monk Fruit Extract', 'cleared', 'Methodology §5 Cleared (monk fruit extract).'),
      flag('Calcium Citrate', 'cleared', 'Methodology §5 Cleared (calcium citrate, t84u).'),
    ],
    verdict: 'caution',
    honestNote:
      'Natural Lemon Balm Citrus Flavor is Caution and does not stack. Erythritol is a sugar alcohol and does not stack. Counted Limited tokens: none. Tapioca syrup, filtered water, pectin, citric acid, monk fruit extract, and calcium citrate are Cleared. GABA and L-theanine are the supplement-facts actives and are not graded. Serving size is 1 chew (4.5 g) and the tin is 20 servings. UPC 860004555308. The check digit passes. The berry tin is pym-b301-mood-chews-berry-20 and is not this row.',
    sourcesGeneral: [
      't121u. Prepare Your Mind brand page https://youcanpym.com/products/mood-chew-tin lists the citrus tin at $17.99 and in stock. The facts image is the panel. The citrus side prints Other Ingredients: Tapioca Syrup, Erythritol, Filtered Water, Pectin, Natural Lemon Balm Citrus Flavor, Citric Acid, Monk Fruit Extract, Calcium Citrate. Serving size 1 chew (4.5 g). Servings per container 20. GABA 130 mg and L-Theanine 90 mg are the actives. The image prints UPC 860004555308 and the check digit passes. The berry tin on the same image is a different line. The 3-pack and 6-pack are multipacks and are not this row.',
    ],
  }),
];

const ROWS = BATCH315_KYR6D_T121U;
if (ROWS.length !== 1) throw new Error('batch315 count');
for (const record of ROWS) {
  if (record.verdict !== 'caution') throw new Error(`batch315 verdict ${record.verdict}`);
  if (record.barcode !== '860004555308' || !upcACheckPasses(record.barcode)) {
    throw new Error(`batch315 barcode ${record.barcode}`);
  }
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch315 stack ${counted.map((i) => i.name).join(',')}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch315 generic ${ingredient.name}: ${why}`);
    }
  }
}
