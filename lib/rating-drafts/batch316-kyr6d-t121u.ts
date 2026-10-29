// DRAFT / not verified / batch 316 KYR6-d (t121u ladder).
// Brand facts images are the single source. No UPC was printed.
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
const KIDS = 'kids' as const;

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

const PANEL_KIDS =
  'Beam brand facts image. Kids Chocolate Superpowder travel pack, 5 servings. t121u brand page.';

export const BATCH316_KYR6D_T121U: RatingRecord[] = [
  finish({
    id: 'beam-b316-creatine-unflavored-5',
    productName: 'Beam Creatine Unflavored (5 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b316-creatine-unflavored',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Creatine Monohydrate', strength: '5 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. The supplement-facts panel lists only Creatine Monohydrate, 5 g per stick, 5 servings. It does not print an other-ingredients line. Creatine monohydrate is the active and is not graded. No UPC was printed. Missing UPC. The flavored 30-serving tubs are not this row. The 100-serving tub is not this row.',
    sourcesGeneral: [
      't121u. Beam brand page https://shopbeam.com/products/creatine-5-servings lists Unflavored at $11.99 and in stock. SKU MIX-CRTN5B1. The facts image prints Serving Size 1 Stick (5 g) and Servings Per Container 5. The only supplement-facts line is Creatine Monohydrate 5 g. No other-ingredients line. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b316-creatine-unflavored-100',
    productName: 'Beam Creatine Unflavored (100 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b316-creatine-unflavored',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [{ name: 'Creatine Monohydrate', strength: '5 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. The supplement-facts panel lists only Creatine Monohydrate, 5 g per scoop, 100 servings. It does not print an other-ingredients line. Creatine monohydrate is the active and is not graded. No UPC was printed. Missing UPC. Not the 5-serving sticks. Not the flavored tubs.',
    sourcesGeneral: [
      't121u. Beam brand page https://shopbeam.com/products/creatine-100-servings lists Unflavored at $54.99 and in stock. SKU MIX-CRTN100B1. The facts image prints Serving Size 1 Scoop (5 g) and Servings Per Container 100. The only supplement-facts line is Creatine Monohydrate 5 g. No other-ingredients line. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
  finish({
    id: 'beam-b316-collagen-unflavored-5',
    productName: 'Beam Collagen Unflavored (5 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b316-collagen-unflavored',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Grass-Fed Bovine Peptides (Types I + III)', strength: '10 g' },
      { name: 'Hyaluronic Acid', strength: '100 mg' },
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '90 mg' },
      { name: 'Biotin', strength: '5000 mcg' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. The supplement-facts panel does not print an other-ingredients line. Grass-fed bovine peptides, hyaluronic acid, vitamin C, and biotin are the supplement-facts actives and are not graded. Serving size is 1 stick (10.3 g) and the pack is 5 servings. No UPC was printed. Missing UPC. The 30-serving jar page did not show this facts image and is not this row.',
    sourcesGeneral: [
      't121u. Beam brand page https://shopbeam.com/products/collagen-5-servings lists Unflavored at $9.99 and in stock. SKU MIX-CLGN5B1. The facts image prints Serving Size 1 Stick (10.3 g) and Servings Per Container 5. Lines on the facts panel: Protein 9 g, Vitamin C (as Ascorbic Acid) 90 mg, Biotin 5000 mcg, Sodium 50 mg, Grass-Fed Bovine Peptides (Types I + III) 10 g, Hyaluronic Acid 100 mg. No other-ingredients line. No UPC was printed. Missing UPC. No code was invented. A second listing of the same SKU is not a second row.',
    ],
  }),
  finish({
    id: 'beam-b316-kids-chocolate-5',
    productName: 'Beam Kids Chocolate Superpowder (5 servings)',
    brand: 'Beam',
    category: 'Vitamins',
    formulaId: 'beam-b316-kids-chocolate',
    form: 'powder',
    audience: KIDS,
    minAge: 2,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Organic Greens Blend' },
      { name: 'Organic Fruit Blend' },
      { name: 'Probiotic Blend' },
      { name: 'Vitamin K2 (as Menatetrenone) (MK-4)', strength: '5 mcg' },
    ],
    inactiveIngredients: [
      flag(PANEL_KIDS, 'Cocoa Powder', 'cleared', 'Methodology §5 Cleared (cocoa powder, t56u).'),
      flag(
        PANEL_KIDS,
        'Natural Flavors',
        'limited',
        'Methodology §5 Limited (natural flavors, t54u natural-flavor rule). Counts toward the t137u stack.',
      ),
      flag(PANEL_KIDS, 'Monk Fruit Extract', 'cleared', 'Methodology §5 Cleared (monk fruit extract).'),
    ],
    verdict: 'caution',
    honestNote:
      'Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. Cocoa powder and monk fruit extract are Cleared and do not stack. The greens blend, fruit blend, probiotic blend, vitamins, and minerals are the supplement-facts actives and are not graded. Serving size is 1 packet (7 g) and the pack is 5 servings. The facts panel prints a daily value column for children 2 through 3 years. No UPC was printed. Missing UPC. The chocolate chip cookie travel pack is a different flavor and is not this row.',
    sourcesGeneral: [
      't121u. Beam brand page https://shopbeam.com/products/beam-kids-all-in-one-superpowder-5-servings lists the chocolate travel pack at $14.99 and in stock. The facts image prints Serving Size 1 Packet (7 g) and Servings Per Container 5. Other ingredients: Cocoa Powder, Natural Flavors, Monk Fruit Extract. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: string[] }> = {
  'beam-b316-creatine-unflavored-5': { verdict: 'clean', counted: [] },
  'beam-b316-creatine-unflavored-100': { verdict: 'clean', counted: [] },
  'beam-b316-collagen-unflavored-5': { verdict: 'clean', counted: [] },
  'beam-b316-kids-chocolate-5': { verdict: 'caution', counted: ['Natural Flavors'] },
};

const ROWS = BATCH316_KYR6D_T121U;
if (ROWS.length !== 4) throw new Error('batch316 count');
for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch316 unexpected ${record.id}`);
  if (record.verdict !== expected.verdict) throw new Error(`batch316 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch316 barcode ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i)).map((i) => i.name);
  if (counted.join('|') !== expected.counted.join('|')) {
    throw new Error(`batch316 stack ${record.id} ${counted.join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch316 generic ${ingredient.name}: ${why}`);
    }
  }
}
