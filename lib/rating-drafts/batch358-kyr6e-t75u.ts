// DRAFT / not verified / batch 358 KYR6-e (t75u).
// Five North American Herb & Spice Oreganol oils. No other-ingredients line.
// The blend lines are actives and are not graded. The Sprouts section is not edited.
// No new locks. The four gelcap counts stay unwritten.

import type { RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const REGULAR_ACTIVES = [
  {
    name: 'Proprietary blend (2 drops) in organic extra virgin olive oil',
    strength: '50 mg',
  },
  {
    name: 'Organic, wild Mediterranean oregano oil P73',
    strength: '',
  },
] as const;

const SS_ACTIVES = [
  {
    name: 'Proprietary blend (2 drops) in organic extra virgin olive oil',
    strength: '50 mg',
  },
  {
    name: 'Organic, wild Mediterranean oregano oil P73',
    strength: '',
  },
] as const;

export const BATCH358_KYR6E_T75U: RatingRecord[] = [
  finish({
    id: 'nahs-b358-oreganol-oil-8',
    productName: 'North American Herb & Spice Oreganol P73 Oil (8 ml)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b358-oreganol-oil-8',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '335824000647',
    activeIngredients: [
      { name: 'Proprietary blend in organic extra virgin olive oil', strength: '50 mg' },
      { name: 'Organic, Wild Mediterranean oregano oil P73', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/oreganol-p73-oil-8ml/ showed one-time Add to cart for the 8 ml bottle, SKU 083TS, $18.00. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2020/05/Oreganol-8ml_1920x1900_Right.png prints Serving Size 2 drops and Servings 108. Proprietary blend in organic extra virgin olive oil 50 mg. Organic, Wild Mediterranean oregano oil P73 has no separate amount. The panel has no Other ingredients line. Those blend lines are actives and are not graded. The page ingredient list names extra virgin olive oil and wild, organic oregano oil and is not an other-ingredients line. Counted Limited tokens: none. The side label https://www.northamericanherbandspice.com/wp-content/uploads/2020/05/Oreganol-8ml_1920x1900_Left.png prints 3 35824 00064 7. The bars decode to 335824000647 and the check digit passes. This code is the 8 ml bottle only.',
    ],
  }),
  finish({
    id: 'nahs-b358-oreganol-oil-135',
    productName: 'North American Herb & Spice Oreganol P73 Oil (0.45 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b358-oreganol-oil',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb', 'Walmart', 'Vitacost', 'Sprouts'],
    barcode: '335824000012',
    activeIngredients: REGULAR_ACTIVES.map((active) => ({ ...active })),
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/oreganol-p73-oil/ showed one-time Add to cart for 13.5 mL Wild, Handpicked, SKU 001, $29.99. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/Oreganol-45oz_1920x1900_Right.png prints Amount per serving 2 drops and Servings per container 194. Proprietary blend (2 drops) 50 mg total weight in organic extra virgin olive oil. Organic, wild Mediterranean oregano oil P73 has no separate amount. The panel has no Other ingredients line. Those blend lines are actives and are not graded. Counted Limited tokens: none. The Walmart label prints 3 35824 00001 2. The check digit passes. iHerb product 7704, Vitacost, and Sprouts GTIN 00335824000012 are the same 12-digit code for this 0.45 fl oz bottle. This is not the 1 fl oz row.',
    ],
  }),
  finish({
    id: 'nahs-b358-oreganol-oil-1',
    productName: 'North American Herb & Spice Oreganol P73 Oil (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b358-oreganol-oil',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb', 'Walmart', 'Vitacost'],
    barcode: '',
    activeIngredients: REGULAR_ACTIVES.map((active) => ({ ...active })),
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/oreganol-p73-oil/ showed one-time Add to cart for 1 fl oz, SKU 058, $44.99. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2020/01/Oreganol-1oz-Right-1900x1920-1.png prints Amount per serving 2 drops and Servings per container 432. The blend is the same 50 mg proprietary blend in organic extra virgin olive oil as the 0.45 fl oz, with Organic, wild Mediterranean oregano oil P73 and no separate amount. The panel has no Other ingredients line. Those blend lines are actives and are not graded. Counted Limited tokens: none. iHerb product 13603 lists 335824000531 for this 1 fl oz. No bar photo of that code was read, so the barcode is omitted. No code was invented. This is not the 0.45 fl oz row.',
    ],
  }),
  finish({
    id: 'nahs-b358-oreganol-ss-oil-135',
    productName: 'North American Herb & Spice Super Strength Oreganol P73 (0.45 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b358-oreganol-ss-oil',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb', 'Walmart', 'Vitacost'],
    barcode: '635824002277',
    activeIngredients: SS_ACTIVES.map((active) => ({ ...active })),
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/super-strength-oreganol-p73/ showed one-time Add to cart for 13.5 mL Wild, Handpicked, SKU 9021, $48.99. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/Oreganol-SS-45oz_1920x1900_Right-1.png prints Amount per serving 2 drops and Servings per container 194. Proprietary blend (2 drops) 50 mg total weight in organic extra virgin olive oil. Organic, wild Mediterranean oregano oil P73 has no separate amount. The panel has no Other ingredients line. Those blend lines are actives and are not graded. Counted Limited tokens: none. The side label prints 6 35824 00227 7. The bars decode to 635824002277 and the check digit passes. iHerb product 7700 lists the same code for this 0.45 fl oz. This is not the regular Oreganol oil and not the 1 fl oz.',
    ],
  }),
  finish({
    id: 'nahs-b358-oreganol-ss-oil-1',
    productName: 'North American Herb & Spice Super Strength Oreganol P73 (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b358-oreganol-ss-oil',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb', 'Walmart', 'Vitacost', 'Fresh Thyme'],
    barcode: '335824000203',
    activeIngredients: SS_ACTIVES.map((active) => ({ ...active })),
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/super-strength-oreganol-p73/ showed one-time Add to cart for 1 Ounce Wild, Handpicked, SKU 003, $54.99. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/Oreganol-SS-1oz_1920x1900_Right-1.png prints Amount per serving 2 drops and Servings per container 432. The blend is the same 50 mg proprietary blend in organic extra virgin olive oil, with Organic, wild Mediterranean oregano oil P73 and no separate amount. The panel has no Other ingredients line. Those blend lines are actives and are not graded. Counted Limited tokens: none. The label prints 3 35824 00020 3. The bars decode to 335824000203 and the check digit passes. iHerb product 8582 lists the same code for this 1 fl oz. Fresh Thyme https://shop.freshthyme.com/store/fresh-thyme-farmers-market/products/483399-north-american-herb-spice-oil-of-oregano-dietary-supplement-super-strength-1-g shows the same 432-serving facts and does not print an Other ingredients line. This is not the 0.45 fl oz.',
    ],
  }),
];

const ROWS = BATCH358_KYR6E_T75U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
const EXPECTED_UPC: Record<string, string> = {
  'nahs-b358-oreganol-oil-8': '335824000647',
  'nahs-b358-oreganol-oil-135': '335824000012',
  'nahs-b358-oreganol-oil-1': '',
  'nahs-b358-oreganol-ss-oil-135': '635824002277',
  'nahs-b358-oreganol-ss-oil-1': '335824000203',
};

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 5) throw new Error(`batch358 count ${ROWS.length}`);
const ids = new Set(ROWS.map((record) => record.id));
if (ids.size !== 5) throw new Error('batch358 duplicate id');
for (const record of ROWS) {
  if (record.category !== 'Herbs') throw new Error(record.id + ' tab');
  if (record.inactiveIngredients.length !== 0) throw new Error(record.id + ' tokens');
  if (record.inactiveIngredients.some((ingredient) => /none/i.test(ingredient.name))) throw new Error(record.id + ' none');
  if ((record.barcode ?? '') !== EXPECTED_UPC[record.id]) throw new Error(record.id + ' upc ' + record.barcode);
  if (record.barcode && !upcCheck(record.barcode)) throw new Error(record.id + ' check digit');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean' || record.verdict !== 'clean') throw new Error(record.id + ' ' + record.verdict);
  const counted = record.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient));
  if (counted.length !== 0) throw new Error(record.id + ' stack');
  if (record.honestNote) throw new Error(record.id + ' note ' + record.honestNote);
  if (record.activeIngredients[0]?.strength !== '50 mg') throw new Error(record.id + ' blend');
  if (record.activeIngredients.some((active) => !active.name.trim())) throw new Error(record.id + ' blank active');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
