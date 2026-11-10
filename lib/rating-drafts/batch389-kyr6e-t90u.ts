// DRAFT / not verified / batch 389 KYR6-e (t90u).
// Traditional Medicinals Smooth Move capsules, 50 count.
// Teas and the 6 x 50 multipack stay off this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import { applyT83DecisionRow, applyT83uRow } from '../scan-preview/t83uLocks';
import { applyT86uRow } from '../scan-preview/t86uLocks';
import { applyT87uRow } from '../scan-preview/t87uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const HONEST =
  'The label notice says this product contains senna leaf extract. Read and follow directions carefully. Do not use it if you have or develop diarrhea, loose stools, or abdominal pain, because senna leaf extract may worsen those conditions and be harmful to your health. Consult a physician if you have frequent diarrhea or if you are pregnant, nursing, taking medication, or have a medical condition. Organic senna leaf dry extract, organic ginger rhizome, and organic licorice root sit inside Proprietary Herbal Blend 1275 mg. Those rows are actives and are not graded. Other ingredients print Vegetable capsule. That exact bare shell is Limited and counts. One Limited token makes this Caution. It is not a three-or-more stack. The brand FAQ says the vegan capsules are made from pullulan. That sentence is page text. It is not the printed Other ingredients line. A printed pullulan capsule would be a different string. The printed line stays Vegetable capsule, so the grade stays Caution.';

function finish(record: RatingRecord): RatingRecord {
  return applyT83DecisionRow(applyT87uRow(applyT86uRow(applyT83uRow(applyT54uRow(record)))));
}

const SHELL: IngredientFlag = {
  name: 'Vegetable capsule',
  riskLevel: 'limited',
  source:
    'Traditional Medicinals Smooth Move capsules Supplement Facts. Methodology §5 Limited (t83 decision). This exact bare shell counts toward the t137u stack. It is not a named polymer capsule.',
  why: 'This is a bare capsule shell. The label does not name the material (such as pullulan, HPMC, cellulose, or tapioca), so it is treated as Limited and counts toward a 3+ Limited stack.',
};

export const BATCH389_KYR6E_T90U: RatingRecord[] = [
  finish({
    id: 'tm-b389-smooth-move-50',
    productName: 'Traditional Medicinals Smooth Move Capsules (50 capsules)',
    brand: 'Traditional Medicinals',
    category: 'Herbs',
    formulaId: 'tm-b389-smooth-move-50',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Traditional Medicinals', 'iHerb'],
    barcode: '032917002969',
    activeIngredients: [
      { name: 'Proprietary Herbal Blend', strength: '1275 mg' },
      { name: 'Organic senna leaf dry extract', strength: '' },
      { name: 'Organic ginger rhizome', strength: '' },
      { name: 'Organic licorice root', strength: '' },
    ],
    inactiveIngredients: [SHELL],
    verdict: 'caution',
    honestNote: HONEST,
    sourcesGeneral: [
      't90u. https://www.traditionalmedicinals.com/products/smooth-move-capsules shows 50 capsules at $19.99 for one purchase. The $17.99 figure is subscribe and save and is not the shelf price. The 6-pack of 6 x 50 capsules is a multipack and is not this row. No stock word was on the brand page. The brand Supplement Facts panel prints Serving Size 3 Capsules, Servings per container 16, and Proprietary Herbal Blend 1275 mg. The blend line is organic senna leaf dry extract, organic ginger rhizome, organic licorice root. Those rows are actives and are not graded. Daily Value Not Established is the dagger mark. Other Ingredients: Vegetable capsule. The package photograph prints Vegetable capsule. with a final period. The period is not a second token. That print is the bare Vegetable Capsule lock. It is Limited and it counts. The brand FAQ says the vegan capsules are made from pullulan. That sentence is page text and is not the printed Other ingredients line. The label notice says this product contains senna leaf extract, says to read and follow directions, and says not to use it with diarrhea, loose stools, or abdominal pain. It says to consult a physician if you are pregnant, nursing, taking medication, or have a medical condition. The facts serving is 3 capsules. iHerb https://www.iherb.com/pr/traditional-medicinals-smooth-move-capsules-senna-50-capsules/101299 lists the 50-capsule pack. Its page text UPC is a lead. The package photograph prints 0 32917 00296 9. The check digit passes. UPC 032917002969. This code is the 50 capsules only. Teas from this brand are beverages and are not rows. Counted Limited tokens: Vegetable capsule.',
    ],
  }),
];

const ROWS = BATCH389_KYR6E_T90U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch389 count ${ROWS.length}`);
const row = ROWS[0];
if (row.id !== 'tm-b389-smooth-move-50' || row.barcode !== '032917002969' || !upcCheck(row.barcode ?? '')) {
  throw new Error('batch389 upc');
}
if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'caution' || !row.honestNote) {
  throw new Error('batch389 grade');
}
if (!row.honestNote.includes('senna leaf extract') || !row.honestNote.includes('Vegetable capsule') || !row.honestNote.includes('pullulan')) {
  throw new Error('batch389 note');
}
if (row.activeIngredients.length !== 4 || row.inactiveIngredients.length !== 1) throw new Error('batch389 lines');
const counted = row.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient));
if (counted.length !== 1 || counted[0]?.name !== 'Vegetable capsule') throw new Error('batch389 stack');
const roll = computeVerdictFromInactiveIngredients(row.inactiveIngredients);
if (roll.verdict !== 'caution' || roll.cause !== 'limited_1_2') throw new Error('batch389 rollup');
for (const ingredient of row.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why || banned.test(why) || !/limited/i.test(why)) throw new Error(`batch389 ${ingredient.name}: ${why}`);
}
const source = (row.sourcesGeneral ?? []).join(' ');
if (banned.test(source) || banned.test(row.honestNote) || source.includes('None is printed')) throw new Error('batch389 source');
if (!row.retailers.includes('Traditional Medicinals') || !row.retailers.includes('iHerb')) throw new Error('batch389 carrier');
