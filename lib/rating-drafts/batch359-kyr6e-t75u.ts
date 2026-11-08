// DRAFT / not verified / batch 359 KYR6-e (t75u).
// Three North American Herb & Spice packs. Current brand panel is the formula.
// Ashadrene 60 and Ashwagandha 60 are different bottles with the same capsule panel.
// The drops are a different form. The blend lines are actives and are not graded.
// Elder-C and Black Seed Gummies stay unwritten. The Sprouts section is not edited.
// No new locks.

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

const CAPSULE_ACTIVES = [
  { name: 'Proprietary blend', strength: '1000 mg' },
  { name: 'Ashwagandha extract powder', strength: '' },
  { name: '3x raw royal jelly powder', strength: '' },
  { name: 'Organic rice bran', strength: '' },
] as const;

const DROPS_ACTIVES = [
  { name: 'Proprietary blend', strength: '' },
  { name: 'Spring water', strength: '' },
  { name: 'Ashwagandha root extract', strength: '' },
  { name: '3x raw royal jelly liquid', strength: '' },
  { name: 'Yacon syrup', strength: '' },
  { name: 'Mycelized wild oregano oil', strength: '' },
] as const;

const CELLULOSE = {
  name: 'cellulose',
  riskLevel: 'cleared' as const,
  source:
    'Methodology §5 Cleared. Sept 27, 2026: Cellulose maps to the cellulose family with powdered cellulose and microcrystalline cellulose. EFSA 2017: no carcinogenicity, no ADI needed. It does not stack. The label prints the bare word cellulose. It is not cellulose (vegi-capsule) and not Vegetable Cellulose Capsule.',
};

export const BATCH359_KYR6E_T75U: RatingRecord[] = [
  finish({
    id: 'nahs-b359-ashadrene-60',
    productName: 'North American Herb & Spice Ashadrene (60 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b359-ashadrene-60',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'PureFormulas', 'The Healthy Place'],
    barcode: '635824009719',
    activeIngredients: CAPSULE_ACTIVES.map((active) => ({ ...active })),
    inactiveIngredients: [{ ...CELLULOSE }],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/ashadrene/ showed the 60 Capsules choice on one bottle. The page price stayed the range $18.19–$22.39 and did not give a variant price or a SKU. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/Ashadrene-60_1920x1900_Right-1.png prints Serving Size 2 capsules, Servings Per Container 30, and Proprietary blend 1000 mg. Ashwagandha extract powder, 3x raw royal jelly powder, and Organic rice bran have no separate amounts. Those blend lines are actives and are not graded. Other ingredients: cellulose. The next line, non-GMO, is not part of that token. Counted Limited tokens: none. The side label prints 6 35824 00971 9. The bars decode to 635824009719 and the check digit passes. Label code LA2009R2 is not a SKU. PureFormulas https://www.pureformulas.com/product/ashadrene-ashwagandha-extract-by-north-american-herb-and-spice/1000001776 showed the 60 Capsules choice, item NAHS1271, MFG 2009, and the same bar. Its label prints the same blend and Other ingredients: cellulose, with non-GMO on the next line. The Healthy Place page puts cellulose, non-GMO on one Other ingredients line. HerbsPro https://www.herbspro.com/products/ashadrene-147732 omits organic rice bran, prints Other Ingredients: Cellulose, non-gmo, and gives tablespoon sweetener directions. That page text is not this bottle. This is not the 2 fl oz drops and not the Ashwagandha Capsules bottle.',
    ],
  }),
  finish({
    id: 'nahs-b359-ashwagandha-60',
    productName: 'North American Herb & Spice Ashwagandha Capsules (60 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b359-ashwagandha-60',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'PureFormulas'],
    barcode: '635824006701',
    activeIngredients: CAPSULE_ACTIVES.map((active) => ({ ...active })),
    inactiveIngredients: [{ ...CELLULOSE }],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/ashwagandha-capsules/ showed one 60 Capsules bottle, one-time $37.99. No SKU field was on the page. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2021/09/Ashwagandha-60-1920x1900_Right-1.png prints Serving Size 2 capsules, Servings Per Container 30, and Proprietary blend 1000 mg. Ashwagandha extract powder, 3x raw royal jelly powder, and Organic rice bran have no separate amounts. Those blend lines are actives and are not graded. Other ingredients: cellulose. The next line, non-GMO, is not part of that token. Counted Limited tokens: none. The side label prints 6 35824 00670 1. The bars decode to 635824006701 and the check digit passes. Label code LA2010R1 is not a SKU. PureFormulas https://www.pureformulas.com/product/ashwagandha-by-north-american-herb-and-spice/1000058206 is the Daytime Formula bottle, item NAHS1287, MFG 2010, and the same bar. Its label prints the same blend and Other ingredients: cellulose, with non-GMO on the next line. HerbsPro https://www.herbspro.com/products/ashwagandha-capsules-334294 slide 2 is a marketing panel with the same blend and no Other ingredients line. Its page text lists filtered water, organic onions, organic carrots, organic celery, organic tomato paste, organic spices, organic expeller pressed canola oil and/or safflower oil and/or sunflower oil, and sea salt. That food list is not this capsule. The matching page UPC does not make it the formula. The empty Other line is not taken from that image. This is a different bottle from Ashadrene 60 capsules.',
    ],
  }),
  finish({
    id: 'nahs-b359-ashadrene-drops',
    productName: 'North American Herb & Spice Ashadrene (2 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b359-ashadrene-drops',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'PureFormulas'],
    barcode: '635824006695',
    activeIngredients: DROPS_ACTIVES.map((active) => ({ ...active })),
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/ashadrene/ showed the 2 fl.oz. choice on one bottle. The page price stayed the range $18.19–$22.39 and did not give a variant price or a SKU. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/Ashadrene-2oz-TEMP-right.png prints Serving Size 20 drops and Servings Per Container 86. The proprietary blend has no printed total. Spring water, Ashwagandha root extract, 3x raw royal jelly liquid, Yacon syrup, and Mycelized wild oregano oil are the blend rows and have no separate amounts. Those rows are actives and are not graded. The complete panel has no Other ingredients heading. None is not printed, so None is not stored. Counted Limited tokens: none. The side label prints 6 35824 00669 5. The bars decode to 635824006695 and the check digit passes. Label code LA2008R2 is not a SKU. PureFormulas https://www.pureformulas.com/product/ashadrene-ashwagandha-extract-by-north-american-herb-and-spice/1000001776 on the 2 fl. oz (60 ml) choice, item NAHS1270, MFG 2008, photographs the same five plain blend rows, no blend total, and no Other ingredients heading. Its page text adds organic qualifiers and is not the photographed label. Holly Hill https://hollyhillvitamins.com/product/north-american-herb-and-spice-ashadrene-raw-drops-2-fluid-ounces/ photographs a different organic-qualified panel with no Other ingredients heading. That panel is not this formula. This is not the 60 capsule row.',
    ],
  }),
];

const ROWS = BATCH359_KYR6E_T75U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
const EXPECTED_UPC: Record<string, string> = {
  'nahs-b359-ashadrene-60': '635824009719',
  'nahs-b359-ashwagandha-60': '635824006701',
  'nahs-b359-ashadrene-drops': '635824006695',
};

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch359 count ${ROWS.length}`);
const ids = new Set(ROWS.map((record) => record.id));
if (ids.size !== 3) throw new Error('batch359 duplicate id');
for (const record of ROWS) {
  if (record.category !== 'Herbs') throw new Error(record.id + ' tab');
  if (record.inactiveIngredients.some((ingredient) => /none/i.test(ingredient.name))) throw new Error(record.id + ' none');
  if ((record.barcode ?? '') !== EXPECTED_UPC[record.id]) throw new Error(record.id + ' upc ' + record.barcode);
  if (record.barcode && !upcCheck(record.barcode)) throw new Error(record.id + ' check digit');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean' || record.verdict !== 'clean') throw new Error(record.id + ' ' + record.verdict);
  const counted = record.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient));
  if (counted.length !== 0) throw new Error(record.id + ' stack');
  if (record.honestNote) throw new Error(record.id + ' note ' + record.honestNote);
  if (record.activeIngredients.some((active) => !active.name.trim())) throw new Error(record.id + ' blank active');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
    if (!/EFSA 2017/.test(ingredient.source ?? '')) throw new Error(record.id + ' agency');
  }
}
const caps = ROWS.filter((record) => record.form === 'capsule');
if (caps.length !== 2) throw new Error('capsule count');
for (const record of caps) {
  if (record.inactiveIngredients.length !== 1 || record.inactiveIngredients[0]?.name !== 'cellulose') throw new Error(record.id + ' cellulose');
  if (record.activeIngredients[0]?.strength !== '1000 mg') throw new Error(record.id + ' blend');
}
const drops = ROWS.find((record) => record.id === 'nahs-b359-ashadrene-drops');
if (!drops || drops.inactiveIngredients.length !== 0 || drops.activeIngredients[0]?.strength !== '') throw new Error('drops');
if (drops.activeIngredients.length !== 6) throw new Error('drops rows');
