// DRAFT / not verified / batch 364 KYR6-e (t83u).
// Six North American Herb & Spice capsule packs. Brand photographs are the formula.
// Blend rows are actives and are not graded. The blend total is not split.
// The other-ingredient string on each photo is a t83u Cleared lock.
// Claim lines are not tokens. The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import { applyT83uRow } from '../scan-preview/t83uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT83uRow(applyT54uRow(record));
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

function cleared(name: string): IngredientFlag {
  return {
    name,
    riskLevel: 'cleared',
    source: 'Methodology §5 Cleared (t83u). This exact printed string does not stack.',
  };
}

export const BATCH364_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b364-black-seed-plus-90',
    productName: 'North American Herb & Spice Black Seed-Plus (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b364-black-seed-plus-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000228',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1400 mg' },
      { name: 'Mediterranean-source black seed', strength: '' },
      { name: 'Mediterranean-source brown cumin', strength: '' },
      { name: 'Red sour grape powder', strength: '' },
      { name: 'Rhus coriaria powder', strength: '' },
    ],
    inactiveIngredients: [cleared('cellulose (vegi-capsule)')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/black-seed-plus-capsules/ brand photograph. Supplement Facts. Serving size 2 capsules. Servings per container 45. Proprietary blend 1400 mg. The four rows have no separate amounts: Mediterranean-source black seed, Mediterranean-source brown cumin, Red sour grape powder, and Rhus coriaria powder. Those rows are actives and are not graded. Other ingredients: cellulose (vegi-capsule). That string is the t83u Cleared lock. The next line, (100% GMO free) Contains no animal products, is a claim and is not a second token. Visual barcode 6 35824 00022 8. UPC 635824000228. The check digit passes. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b364-actifem-90',
    productName: 'North American Herb & Spice ActiFem (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b364-actifem-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006435',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '2100 mg' },
      { name: 'Fennel (seed)', strength: '' },
      { name: 'Fennel seed oil powder', strength: '' },
      { name: 'Undiluted 3x wild royal jelly', strength: '' },
      { name: 'Fenugreek (seed)', strength: '' },
      { name: 'Wild, raw kelp (plant)', strength: '' },
      { name: 'Wild sage (herb)', strength: '' },
      { name: 'Wild raspberry leaf (herb)', strength: '' },
      { name: 'Pantothenic acid (B5)', strength: '' },
    ],
    inactiveIngredients: [cleared('pullulan')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/actifem/ brand photograph. Supplement Facts. Serving size 3 capsules. Servings per container 30. Proprietary blend 2100 mg. The eight rows have no separate amounts: Fennel (seed), Fennel seed oil powder, Undiluted 3x wild royal jelly, Fenugreek (seed), Wild, raw kelp (plant), Wild sage (herb), Wild raspberry leaf (herb), and Pantothenic acid (B5). Those rows are actives and are not graded. Other ingredients: pullulan. That string is the t83u Cleared lock. Visual barcode 6 35824 00643 5. UPC 635824006435. The check digit passes. Label code LA9109R3 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b364-actimale-90',
    productName: 'North American Herb & Spice ActiMale (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b364-actimale-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824009894',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '2100 mg' },
      { name: 'Royal Jelly Powder', strength: '' },
      { name: 'Styrian pumpkin seed powder (Seed)', strength: '' },
      { name: 'Organic Ashwagandha Powder (Root)', strength: '' },
      { name: 'Maca powder (Root)', strength: '' },
      { name: 'Shilajit', strength: '' },
      { name: 'Potassium Iodide', strength: '' },
      { name: 'Selenium yeast', strength: '' },
    ],
    inactiveIngredients: [cleared('pullulan')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/actimale/ brand photograph. Supplement Facts. Serving size 3 capsules. Servings per container 30. Proprietary blend 2100 mg. The seven rows have no separate amounts: Royal Jelly Powder, Styrian pumpkin seed powder (Seed), Organic Ashwagandha Powder (Root), Maca powder (Root), Shilajit, Potassium Iodide, and Selenium yeast. Those rows are actives and are not graded. Other ingredients: pullulan. That string is the t83u Cleared lock. Visual barcode 6 35824 00989 4. UPC 635824009894. The check digit passes. Label code LA9115R1 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b364-chagamax-90',
    productName: 'North American Herb & Spice ChagaMax (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b364-chagamax-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824005537',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '400 mg' },
      { name: 'Wild, raw chaga mushroom powder', strength: '' },
      { name: 'Wild, organic desiccated oregano oil', strength: '' },
      { name: 'Wild, organic Mediterranean oregano', strength: '' },
      { name: 'Wild black Siberian chaga powder', strength: '' },
      { name: 'Wild, raw white birch bark powder', strength: '' },
    ],
    inactiveIngredients: [cleared('Pullulan (tapioca)')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/chagamax/ brand photograph. Supplement Facts. Serving size 1 capsule. Servings per container 90. Proprietary blend 400 mg. The five rows have no separate amounts: Wild, raw chaga mushroom powder, Wild, organic desiccated oregano oil, Wild, organic Mediterranean oregano, Wild black Siberian chaga powder, and Wild, raw white birch bark powder. Those rows are actives and are not graded. Other ingredients: Pullulan (tapioca). That string is the t83u Cleared lock. The next line, 100% GMO free, vegan, is a claim and is not a second token. Visual barcode 6 35824 00553 7. UPC 635824005537. The check digit passes. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b364-cholestamin-90',
    productName: 'North American Herb & Spice Cholestamin (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b364-cholestamin-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824002222',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1400 mg' },
      { name: 'Red sour grape powder', strength: '' },
      { name: 'Wild, raw kelp', strength: '' },
      { name: 'Organic garlic concentrate', strength: '' },
      { name: 'Cumin seed powder', strength: '' },
      { name: 'Cumin oil powder', strength: '' },
      { name: 'Cocona powder', strength: '' },
    ],
    inactiveIngredients: [cleared('Pullulan')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/cholestamin/ brand photograph. Supplement Facts. Serving size 2 capsules. Servings per container 45. Proprietary blend 1400 mg. The six rows have no separate amounts: Red sour grape powder, Wild, raw kelp, Organic garlic concentrate, Cumin seed powder, Cumin oil powder, and Cocona powder. Cumin oil powder is on the photograph. Those rows are actives and are not graded. Other ingredients: Pullulan. That string is the t83u Cleared lock. The next line, (100% GMO free) Contains no animal products, is a claim and is not a second token. Visual barcode 6 35824 00222 2. UPC 635824002222. The check digit passes. Label code LA4051R2 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b364-gastronex-90',
    productName: 'North American Herb & Spice Gastronex (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b364-gastronex-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824002239',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1400 mg' },
      { name: 'Ginger powder (root)', strength: '' },
      { name: 'Enzyme blend-protease, amylase, lipase, cellulase, lactase, bromelain, papain', strength: '' },
      { name: 'Crushed fresh coriander (seed)', strength: '' },
      { name: 'Crushed fresh fenugreek (herb)', strength: '' },
      { name: 'Wild high-mountain oregano powder (oil)', strength: '' },
      { name: 'Wild high-mountain oregano (herb)', strength: '' },
      { name: 'Crushed fresh cardamom (seed)', strength: '' },
      { name: 'Crushed sumac (fruit)', strength: '' },
    ],
    inactiveIngredients: [cleared('pullulan (tapioca)')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/gastronex/ brand photograph. Supplement Facts. Serving size 2 capsules. Servings per container 45. Proprietary blend 1400 mg. The eight rows have no separate amounts: Ginger powder (root); Enzyme blend-protease, amylase, lipase, cellulase, lactase, bromelain, papain; Crushed fresh coriander (seed); Crushed fresh fenugreek (herb); Wild high-mountain oregano powder (oil); Wild high-mountain oregano (herb); Crushed fresh cardamom (seed); and Crushed sumac (fruit). The enzyme row names seven enzymes and is one active row. Those rows are actives and are not graded. Other ingredients: pullulan (tapioca). That string is the t83u Cleared lock. The next line, (100% GMO free) Contains no animal products, is a claim and is not a second token. Visual barcode 6 35824 00223 9. UPC 635824002239. The check digit passes. Label code LA4052R1 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH364_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
const IDS = [
  'nahs-b364-black-seed-plus-90',
  'nahs-b364-actifem-90',
  'nahs-b364-actimale-90',
  'nahs-b364-chagamax-90',
  'nahs-b364-cholestamin-90',
  'nahs-b364-gastronex-90',
];
const COUNTS = [5, 9, 8, 6, 7, 9];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 6) throw new Error(`batch364 count ${ROWS.length}`);
ROWS.forEach((record, index) => {
  if (record.id !== IDS[index]) throw new Error(`batch364 id ${record.id}`);
  if (!record.barcode || !upcCheck(record.barcode)) throw new Error(`batch364 upc ${record.id}`);
  if (record.activeIngredients.length !== COUNTS[index]) throw new Error(`${record.id} actives ${record.activeIngredients.length}`);
  if (record.inactiveIngredients.length !== 1) throw new Error(record.id + ' shell');
  if (record.verdict !== 'clean') throw new Error(record.id + ' verdict');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean') throw new Error(record.id + ' rollup');
  if (record.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) {
    throw new Error(record.id + ' stack');
  }
  if (record.honestNote) throw new Error(record.id + ' note');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why) || !/cleared/i.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
});
if (ROWS[3]?.activeIngredients[3]?.name !== 'Wild, organic Mediterranean oregano') throw new Error('batch364 chaga row');
if (!ROWS[4]?.activeIngredients.some((item) => item.name === 'Cumin oil powder')) throw new Error('batch364 cumin oil');
if (!ROWS[5]?.activeIngredients[2]?.name.includes('papain')) throw new Error('batch364 enzymes');
