// DRAFT / not verified / batch 362 KYR6-e (t75u).
// Two North American Herb & Spice BoneActiv rubbing-oil bottles.
// The blend lines are actives and are not graded. The olive oil is inside the blend line.
// The label does not print Other ingredients. None is not stored. No new locks.

import type { RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const FORMULA = 'nahs-b362-boneactiv-oil';

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const BLEND = {
  name: 'Proprietary blend in organic extra virgin olive oil',
  strength: '125 mg',
} as const;

export const BATCH362_KYR6E_T75U: RatingRecord[] = [
  finish({
    id: 'nahs-b362-boneactiv-oil-1',
    productName: 'North American Herb & Spice BoneActiv Rubbing Oil (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: FORMULA,
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Natural Healthy Concepts', 'Professional Supplement Center', 'HerbsPro'],
    barcode: '',
    activeIngredients: [
      { ...BLEND },
      { name: 'Wild rosemary oil', strength: '' },
      { name: 'Wild sage oil', strength: '' },
      { name: 'Wild oregano oil - P73', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/boneactiv/?attribute_pa_size=1-fl-oz offers 1 fl oz. Its gallery does not show a 1 oz label. Natural Healthy Concepts https://www.nhc.com/products/boneactiv-bone-joint-rubbing-oil-by-north-american-herb-spice sells the 1 oz single. One-time purchase $31.99. Subscribe and save $30.39. No stock word. The facts photo https://www.nhc.com/cdn/shop/files/boneactiv-bone-joint-rubbing-oil-NAHS_1_20Oz_main_2.jpg prints Supplement Facts, Serving Size 5 drops, Servings per container 173, Proprietary blend 125 mg in organic extra virgin olive oil, Wild rosemary oil, Wild sage oil, and Wild oregano oil - P73. No separate oil amounts. The label prints External & internal use. The direction photo says five drops sublingually. The label has no Other ingredients heading. None is not printed on the label. The page Ingredients text says Other Ingredients: none. That page word is not stored. The blend lines are actives and are not graded. The olive oil stays inside the blend line. Counted Limited tokens: none. A vertical strip beside the facts has no readable digits. Professional Supplement Center https://www.professionalsupplementcenter.com/products/boneactiv-bone-joint-rubbing-oil-by-north-american-herb-spice?variant=52420214522223 is the same 1 oz single, one-time $31.99 and subscribe $30.39, with the same four label tiles and the same page wording. HerbsPro https://www.herbspro.com/collections/cat-id-not-equal-to-m/products/boneactiv-124817 is in stock at $31.44, SKU 124817. Its page UPC field is 635824006275. The photo is the front only, so those digits were not visually read and the barcode is omitted. Its HTML table adds Raw hydroxyapatite (MCHA) (powder) and Other Ingredients: Cellulose, 100% GMO Free. The NHC and Professional Supplement Center photographs do not. The photographs are the formula. Instacart lists a 1 fl oz dietary supplement with the 125 mg oil blend and no facts photo. This is the 1 fl oz bottle. The 2 fl oz bottle keeps its own code.',
    ],
  }),
  finish({
    id: 'nahs-b362-boneactiv-oil-2',
    productName: 'North American Herb & Spice BoneActiv Rubbing Oil (2 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: FORMULA,
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'HerbsPro', 'GoSupps'],
    barcode: '635824006350',
    activeIngredients: [
      { ...BLEND },
      { name: 'Wild rosemary oil', strength: '' },
      { name: 'Wild sage oil', strength: '' },
      { name: 'Wild oregano oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't75u. https://www.northamericanherbandspice.com/shop/boneactiv/?attribute_pa_size=2-fl-oz showed the 2 fl oz choice. The price stayed the range $27.74–$50.39. The facts image https://www.northamericanherbandspice.com/wp-content/uploads/2018/10/BoneActiv-2oz_1920x1900_Right.png prints Supplement Facts, Serving Size 5 drops, Servings per container 346, Proprietary blend 125mg in organic extra virgin olive oil, Wild rosemary oil, Wild sage oil, and Wild oregano oil. No separate oil amounts. The label prints External & internal use. Directions say it may be taken internally, 5 or more drops daily. The panel has no Other ingredients heading. None is not printed. The blend lines are actives and are not graded. The olive oil stays inside the blend line. Counted Limited tokens: none. The printed barcode digits were visually read as 6 35824 00635 0; its UPC check digit validates. Healthy Planet https://www.myhealthyplanet.com/en_intl/north-american-herb-spice-bone-activ-2-oz.html photographs the same facts, the same directions, and the same visual barcode. That page is an international USD listing. US shipping was not confirmed, so it is a second label photograph and not a US sale. GoSupps https://www.gosupps.com/north-american-herb-spice-boneactiv-2-fl-oz-bone-joint-rubbing-oil-supports-healthy-bones-non-gmo-vegan-346-servings-2-ounce.html ships United States to United States at $129.99, with no stock word. Its facts graphic repeats 346 servings and the three oils and has no Other line and no barcode. HerbsPro https://www.herbspro.com/products/boneactiv-124840 is in stock at $61.19, SKU 124840. Its page UPC field is 635824006350. The photo is the front only. Its HTML table adds Raw hydroxyapatite (MCHA) (powder) and Other Ingredients: cellulose, 100% GMO free, and it omits 346 servings. The brand photograph and the Healthy Planet photograph are the formula. This is the 2 fl oz bottle.',
    ],
  }),
];

const ROWS = BATCH362_KYR6E_T75U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch362 count ${ROWS.length}`);
if (ROWS[0]?.id !== 'nahs-b362-boneactiv-oil-1' || ROWS[1]?.id !== 'nahs-b362-boneactiv-oil-2') throw new Error('batch362 ids');
if (ROWS[0]?.barcode !== '') throw new Error('batch362 1 oz barcode');
if (ROWS[1]?.barcode !== '635824006350' || !upcCheck(ROWS[1].barcode)) throw new Error('batch362 2 oz upc');
if (ROWS[0]?.sourcesGeneral.join(' ').includes('635824006350')) throw new Error('batch362 borrowed upc');
for (const record of ROWS) {
  if (record.formulaId !== FORMULA) throw new Error(record.id + ' formula');
  if (record.category !== 'Herbs') throw new Error(record.id + ' tab');
  if (record.inactiveIngredients.length !== 0) throw new Error(record.id + ' tokens');
  if (record.inactiveIngredients.some((ingredient) => /none/i.test(ingredient.name))) throw new Error(record.id + ' none');
  if (record.activeIngredients[0]?.strength !== '125 mg') throw new Error(record.id + ' blend');
  if (record.activeIngredients.length !== 4) throw new Error(record.id + ' actives');
  if (record.honestNote) throw new Error(record.id + ' note');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean' || record.verdict !== 'clean') throw new Error(record.id + ' verdict');
  if (record.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) throw new Error(record.id + ' stack');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
if (!ROWS[0]?.sourcesGeneral.join(' ').includes('173')) throw new Error('batch362 173');
if (!ROWS[1]?.sourcesGeneral.join(' ').includes('346')) throw new Error('batch362 346');
if (!ROWS[0]?.sourcesGeneral.join(' ').includes('635824006275')) throw new Error('batch362 page upc');
if (ROWS[0]?.activeIngredients[3]?.name !== 'Wild oregano oil - P73') throw new Error('batch362 p73');
if (ROWS[1]?.activeIngredients[3]?.name !== 'Wild oregano oil') throw new Error('batch362 oregano');
