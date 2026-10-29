// DRAFT / not verified / batch 308 KYR6-d (t117u).
// Brand-page back images are the single source. Named ingredients are actives.
// The graded inactive is the exact word Adhesive. Longer adhesive phrases are not written.
// No brand is closed. The Sprouts section is not edited.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const ADHESIVE =
  'Methodology §5 Cleared (Adhesive — t112u). Does not count toward the t137u stack.';

function adhesive(panel: string): IngredientFlag {
  return { name: 'Adhesive', riskLevel: 'cleared' as RiskLevel, source: `${panel}; ${ADHESIVE}` };
}

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    const n = Number(code[i]);
    sum += i % 2 === 0 ? n * 3 : n;
  }
  const check = (10 - (sum % 10)) % 10;
  return check === Number(code[11]);
}

function row(
  id: string,
  productName: string,
  category: string,
  audience: 'adult' | 'kids',
  barcode: string,
  actives: ActiveIngredient[],
  panel: string,
  honestNote: string,
  source: string,
): RatingRecord {
  const record: RatingRecord = {
    id,
    productName,
    brand: 'The Good Patch',
    category,
    formulaId: id,
    form: 'patch',
    audience,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['The Good Patch'],
    barcode,
    activeIngredients: actives,
    inactiveIngredients: [adhesive(panel)],
    verdict: 'clean',
    honestNote,
    sourcesGeneral: [source],
  };
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let note = record.honestNote ?? '';
  if (stackNote && !note.includes(stackNote)) note = `${stackNote} ${note}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: note };
}

const BASE =
  'The brand page shows this 1-pack for sale and the back image prints the ingredient line. The named ingredients are actives and are not graded. The other ingredient is Adhesive. Adhesive is Cleared and does not stack. Counted Limited tokens: none.';

export const BATCH308_KYR6D_T117U: RatingRecord[] = [
  row(
    'goodpatch-b308-slumber-4',
    'The Good Patch Slumber (4 patches)',
    'Sleep',
    'adult',
    '810109340644',
    [
      { name: 'L-Theanine' },
      { name: 'Magnesium Gluconate' },
      { name: 'Tart Cherry Extract (Prunus Cerasus)' },
      { name: 'Black Pepper Extract (Piper Nigrum)' },
    ],
    'Brand back image. Slumber, 4 patches. Ingredients: L-Theanine, Magnesium Gluconate, Tart Cherry Extract (Prunus Cerasus), Black Pepper Extract (Piper Nigrum), Adhesive. t117u brand page.',
    `${BASE} UPC 810109340644 is printed on the back image and the check digit passes.`,
    't117u. Brand page https://thegoodpatch.com/products/slumber is in stock at $12 for the 4-patch. The back image prints Ingredients: L-Theanine, Magnesium Gluconate, Tart Cherry Extract (Prunus Cerasus), Black Pepper Extract (Piper Nigrum), Adhesive. Those named ingredients are actives and are not graded. Adhesive is the exact word and is Cleared. UPC 810109340644. The check digit passes. Target search did not list Slumber. Walmart search returned Nite Owl, not Slumber. The brand page is the single source.',
  ),
  row(
    'goodpatch-b308-hot-flash-4',
    'The Good Patch Hot Flash (4 patches)',
    'Herbs',
    'adult',
    '850014874667',
    [
      { name: 'Industrial Hemp Extract' },
      { name: 'Menthyl Lactate' },
      { name: 'Black Cohosh (Cimicifuga racemosa)' },
      { name: 'Black Pepper Extract (Piper nigrum)' },
    ],
    'Brand back image. Hot Flash, 4 patches. Ingredients: 15 mg Industrial Hemp Extract, Menthyl Lactate, Black Cohosh (Cimicifuga racemosa), Black Pepper Extract (Piper nigrum), Adhesive. t117u brand page.',
    `${BASE} The back prints 15 mg Industrial Hemp Extract. The page headline says Premium Hemp Extract. The ingredient line was graded, and those named ingredients are actives. UPC 850014874667 is printed on the back image and the check digit passes.`,
    't117u. Brand page https://thegoodpatch.com/products/hot-flash is in stock. The back image prints Ingredients: 15 mg Industrial Hemp Extract, Menthyl Lactate, Black Cohosh (Cimicifuga racemosa), Black Pepper Extract (Piper nigrum), Adhesive. The named ingredients are actives and are not graded. Adhesive is the exact word and is Cleared. UPC 850014874667. The check digit passes. The brand page is the single source.',
  ),
  row(
    'goodpatch-b308-nite-owl-6',
    'The Good Patch Nite Owl (6 patches)',
    'Sleep',
    'kids',
    '850014874421',
    [
      { name: 'L-theanine (plant-derived)' },
      { name: 'Tart Cherry (Prunus cerasus)' },
      { name: 'Chamomile' },
      { name: 'Skullcap (Scutellaria lateriflora)' },
    ],
    'Brand back image. Nite Owl, 6 patches. Ingredients: L-theanine (plant-derived), Tart Cherry (Prunus cerasus), Chamomile, Skullcap (Scutellaria lateriflora), Adhesive. t117u brand page. Not for children under 3.',
    `${BASE} The back says the patches are for children and are not recommended under age 3. UPC 850014874421 is printed on the back image and the check digit passes.`,
    't117u. Brand page https://thegoodpatch.com/products/nite-owl is in stock. The back image prints Ingredients: L-theanine (plant-derived), Tart Cherry (Prunus cerasus), Chamomile, Skullcap (Scutellaria lateriflora), Adhesive. Includes 6 owl patches. Not recommended for children under the age of 3. The named ingredients are actives and are not graded. Adhesive is the exact word and is Cleared. UPC 850014874421. The check digit passes. The brand page is the single source.',
  ),
  row(
    'goodpatch-b308-desire-4',
    'The Good Patch Desire (4 patches)',
    'Herbs',
    'adult',
    '850031068834',
    [
      { name: 'Vitamin B6 (Pyridoxine HCl)' },
      { name: 'Reishi Extract (Ganoderma lucidum)' },
      { name: 'Black Maca Root Powder' },
      { name: 'Panax Ginseng Extract' },
      { name: 'Black Pepper Extract (Piper nigrum)' },
    ],
    'Brand back image. Desire, 4 patches. Ingredients: Vitamin B6 (Pyridoxine HCl), Reishi Extract (Ganoderma lucidum), Black Maca Root Powder, Panax Ginseng Extract, Black Pepper Extract (Piper nigrum), Adhesive. t117u brand page.',
    `${BASE} UPC 850031068834 is printed on the back image and the check digit passes.`,
    't117u. Brand page https://thegoodpatch.com/products/desire is in stock. The back image prints Ingredients: Vitamin B6 (Pyridoxine HCl), Reishi Extract (Ganoderma lucidum), Black Maca Root Powder, Panax Ginseng Extract, Black Pepper Extract (Piper nigrum), Adhesive. The named ingredients are actives and are not graded. Adhesive is the exact word and is Cleared. UPC 850031068834. The check digit passes. The brand page is the single source.',
  ),
  row(
    'goodpatch-b308-hemp-queen-4',
    'The Good Patch Hemp Queen (4 patches)',
    'Herbs',
    'adult',
    '850014874650',
    [
      { name: 'Industrial Hemp Extract' },
      { name: 'Black Pepper Extract (Piper nigrum)' },
    ],
    'Brand back image. Hemp Queen, 4 patches. Ingredients: 20 mg Industrial Hemp Extract, Black Pepper Extract (Piper nigrum), Adhesive. t117u brand page.',
    `${BASE} The back prints 20 mg Industrial Hemp Extract. The page headline says Premium Hemp Extract. The ingredient line was graded, and those named ingredients are actives. UPC 850014874650 is printed on the back image and the check digit passes.`,
    't117u. Brand page https://thegoodpatch.com/products/hemp-queen is in stock. The back image prints Ingredients: 20 mg Industrial Hemp Extract, Black Pepper Extract (Piper nigrum), Adhesive. The named ingredients are actives and are not graded. Adhesive is the exact word and is Cleared. UPC 850014874650. The check digit passes. The brand page is the single source.',
  ),
];

const ROWS = BATCH308_KYR6D_T117U;
if (ROWS.length !== 5) throw new Error(`batch308 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`batch308 dup ${record.id}`);
  ids.add(record.id);
  if (!record.barcode || !upcCheck(record.barcode)) throw new Error(`batch308 upc ${record.id} ${record.barcode}`);
  if (record.verdict !== 'clean') throw new Error(`batch308 verdict ${record.id} ${record.verdict}`);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch308 note ${record.id}`);
  if (!/not graded/i.test(record.honestNote)) throw new Error(`batch308 actives ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch308 stack ${record.id}`);
  if (mapped.inactiveIngredients.length !== 1 || mapped.inactiveIngredients[0].name !== 'Adhesive') {
    throw new Error(`batch308 inactive ${record.id}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch308 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch308 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
