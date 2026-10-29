// DRAFT / not verified / batch 311 KYR6-d (t117u continue).
// Brand pages are the single source. No UPC was printed.
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

const BLEND =
  'Methodology §5 Cleared (Essential oils of peppermint, eucalyptus, cajeput, wintergreen, juniper and clove — t108u). Does not count toward the t137u stack.';
const HONEY = 'Methodology §5 Cleared (honey).';
const WATER = 'Methodology §5 Cleared (water).';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const FLAVOR =
  'Methodology §5 Limited (natural flavor singular, t54u). Counts toward the t137u stack.';

const OIL_NAME =
  'Essential oils of Peppermint, Eucalyptus, Cajeput, Wintergreen, Juniper and Clove';

function oil(id: string, size: string, url: string, price: string): RatingRecord {
  const panel = `Olbas brand page. Olbas Oil ${size}. Ingredients sentence. t117u brand-page single source.`;
  return finish({
    id,
    productName: `Olbas Oil (${size})`,
    brand: 'Olbas',
    category: 'Cold & Flu',
    formulaId: 'olbas-b304-oil-032',
    form: 'oil',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Olbas'],
    barcode: '',
    activeIngredients: [],
    inactiveIngredients: [flag(panel, OIL_NAME, 'cleared', BLEND)],
    verdict: 'clean',
    honestNote:
      `Counted Limited tokens: none. The ingredient sentence is the whole formula. It is the t108u Cleared lock and does not stack. This row is the ${size}. It is not the written 0.32 fl oz. No UPC was printed. Missing UPC.`,
    sourcesGeneral: [
      `t117u. Brand page ${url} is in stock at ${price} with Add to cart. Ingredients: ${OIL_NAME}. That sentence is the t108u Cleared lock. No UPC was printed. Missing UPC. No code was invented.`,
    ],
  });
}

const SYRUP =
  'Olbas brand supplement facts. Herbal Cough Syrup 4 fl oz. Other ingredients: Wildflower Honey, Water, Citric Acid, Natural Flavor. t117u brand page.';

export const BATCH311_KYR6D_T117U: RatingRecord[] = [
  oil(
    'olbas-b311-oil-101',
    '1.01 fl oz',
    'https://olbas.com/product/olbas-oil-1-01-fl-oz-30ml/',
    '$23.95',
  ),
  oil(
    'olbas-b311-oil-165',
    '1.65 fl oz',
    'https://olbas.com/product/olbas-oil-1-65-fl-oz-50ml/',
    '$37.95',
  ),
  finish({
    id: 'olbas-b311-cough-syrup-4',
    productName: 'Olbas Herbal Cough Syrup (4 fl oz)',
    brand: 'Olbas',
    category: 'Cold & Flu',
    formulaId: 'olbas-b311-cough-syrup-4',
    form: 'liquid',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Olbas'],
    barcode: '',
    activeIngredients: [
      { name: 'Thyme Extract' },
      { name: 'Licorice Extract' },
      { name: 'Plantain Extract' },
      { name: 'Pine Extract' },
      { name: 'Horse Chestnut Seed Extract' },
      { name: 'Olbas proprietary essential oil' },
    ],
    inactiveIngredients: [
      flag(SYRUP, 'Wildflower Honey', 'cleared', HONEY),
      flag(SYRUP, 'Water', 'cleared', WATER),
      flag(SYRUP, 'Citric Acid', 'cleared', CITRIC),
      flag(SYRUP, 'Natural Flavor', 'limited', FLAVOR),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited token: Natural Flavor. That is one, so this is not a 3+ stack. Wildflower honey, water, and citric acid are Cleared and do not stack. The herb extracts and the Olbas proprietary essential oil are the supplement-facts actives and are not graded. Serving size is 2 teaspoons, 12 servings. The page says the syrup is for children and adults. No UPC was printed. Missing UPC.',
    sourcesGeneral: [
      't117u. Brand page https://olbas.com/product/olbas-herbal-cough-syrup-4-fl-oz-118ml/ is in stock at $12.95 with Add to cart. The supplement facts list Thyme Extract, Licorice Extract, Plantain Extract, Pine Extract, Horse Chestnut Seed Extract, and Olbas proprietary essential oil. Other ingredients: Wildflower Honey, Water, Citric Acid, Natural Flavor. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH311_KYR6D_T117U;
if (ROWS.length !== 3) throw new Error(`batch311 count ${ROWS.length}`);
for (const record of ROWS) {
  const want = record.id.includes('syrup') ? 'caution' : 'clean';
  if (record.verdict !== want) throw new Error(`batch311 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch311 barcode ${record.id}`);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch311 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (record.id.includes('syrup')) {
    if (counted.length !== 1 || counted[0].name !== 'Natural Flavor') {
      throw new Error(`batch311 stack ${counted.map((i) => i.name).join(',')}`);
    }
  } else if (counted.length !== 0) {
    throw new Error(`batch311 oil stack ${record.id}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch311 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch311 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
