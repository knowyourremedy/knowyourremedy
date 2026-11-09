// DRAFT / not verified / batch 368 KYR6-e (t83u).
// Four North American Herb & Spice oral dietary supplements from the official next eight.
// Blend rows are actives and are not graded. A missing Other heading stays an empty list.
// The GingaMax tea jar is not this batch.

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

function cleared(name: string, source: string): IngredientFlag {
  return { name, riskLevel: 'cleared', source };
}

const T83 = 'Methodology §5 Cleared (t83u). This exact printed string does not stack.';

export const BATCH368_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b368-sage-12',
    productName: 'North American Herb & Spice Essence of Wild Sage (12 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b368-sage-12',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000150',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Wild sage essence', strength: '' },
      { name: 'Spring water', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/essence-of-wild-sage/ shows one 12 ounce bottle. No stock word was on the page. The front says Dietary Supplement, Essence of Wild Sage, and 12 FL. OZ. (355 ML.). The facts photograph prints Supplement Facts, Serving Size 2 tablespoons, Servings per container 12, and Proprietary blend with no printed total. The two rows have no amounts: Wild sage essence and Spring water. Those rows are actives and are not graded. Spring water stays inside the blend. The photograph has no Other ingredients heading. None is not printed. Chemical free, non-GMO is a claim under the table. Label directions say one to two tablespoons in juice or water daily. Visual barcode 6 35824 00015 0. UPC 635824000150. The check digit passes. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b368-fung-e-clenz-1',
    productName: 'North American Herb & Spice Fung-E-Clenz (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b368-fung-e-clenz-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000587',
    activeIngredients: [
      { name: 'Proprietary blend in extra virgin olive oil', strength: '' },
      { name: 'Wild oregano oil P73', strength: '' },
      { name: 'Wild sage oil', strength: '' },
      { name: 'Wild cumin oil', strength: '' },
      { name: 'Wild myrtle oil', strength: '' },
      { name: 'Wild bay leaf oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/fung-e-clenz/ shows one 1 ounce spice oil blend. No stock word was on the page. The front says Dietary Supplement, Fung-E-Clenz, and 1 FL. OZ. (30 ML.). The facts photograph prints Supplement Facts, Serving size 5 drops, Servings per container 173, and Proprietary blend in extra virgin olive oil with no printed total. The five rows have no amounts: Wild oregano oil P73, Wild sage oil, Wild cumin oil, Wild myrtle oil, and Wild bay leaf oil. Those rows are actives and are not graded. The olive oil stays inside the blend heading. The photograph has no Other ingredients heading. None is not printed. Label directions say five drops under the tongue 2 or 3 times daily or in juice or water with meals, and also may be applied topically. The page How to Take omits the topical phrase. Visual barcode 6 35824 00058 7. UPC 635824000587. The check digit passes. Label code LA068 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b368-garlex-1',
    productName: 'North American Herb & Spice Garlex (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b368-garlex-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824002253',
    activeIngredients: [
      { name: 'Proprietary blend in organic extra virgin olive oil', strength: '' },
      { name: 'Cold-pressed garlic oil', strength: '' },
      { name: 'Wild coriander oil', strength: '' },
      { name: 'Basil oil', strength: '' },
      { name: 'Wild oregano oil P73', strength: '' },
      { name: 'Ginger oil', strength: '' },
      { name: 'Wild fennel oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/garlex/ shows one 1 ounce cold-pressed extraction. No stock word was on the page. The front says Dietary Supplement, Oil of Wild Garlic, Garlex, and 1 FL. OZ. (30 ML.). The facts photograph prints Supplement Facts, Serving Size 10 drops, Serving per container 110, and Proprietary blend in organic extra virgin olive oil with no printed total. The six rows have no amounts: Cold-pressed garlic oil, Wild coriander oil, Basil oil, Wild oregano oil P73, Ginger oil, and Wild fennel oil. Those rows are actives and are not graded. The organic extra virgin olive oil stays inside the blend heading. The photograph has no Other ingredients heading. None is not printed. The label directions say ten or more drops under the tongue with juice or water. The page How to Take says 5 drops. The label serving is the formula. Visual barcode on the directions label 6 35824 00225 3. UPC 635824002253. The check digit passes. Label code LA0000 is not a UPC. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b368-gingamax-90',
    productName: 'North American Herb & Spice GingaMax (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b368-gingamax-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824007586',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1100 mg' },
      { name: 'Organic, wild ginger', strength: '' },
      { name: 'Ground fennel seed', strength: '' },
      { name: 'Yacon root powder', strength: '' },
    ],
    inactiveIngredients: [cleared('non-GMO pullulan (capsule)', T83)],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/gingamax/ 90 Vegi-Capsules choice. No stock word was on the page. The matching front says Dietary Supplement, Wild GingaMax, Ceylon Ginger, and 90 (550 mg) capsules. The facts photograph prints Supplement Facts, Serving Size 2 capsules, Servings per container 45, and Proprietary blend 1100 mg. The three rows have no amounts: Organic, wild ginger, Ground fennel seed, and Yacon root powder. Those rows are actives and are not graded. Other ingredients: non-GMO pullulan (capsule). That string is the t83u Cleared lock. 100% GMO free is a claim. Label directions say at least two capsules daily on an empty stomach or with meals, and to open a capsule and make as a tea. Visual barcode 6 35824 00758 6. UPC 635824007586. The check digit passes. Label code LA9233 is not a UPC. The 3.5 oz tea jar is a separate form. Its Product Information panel and UPC 635824007593 are not this row. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH368_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;
const IDS = [
  'nahs-b368-sage-12',
  'nahs-b368-fung-e-clenz-1',
  'nahs-b368-garlex-1',
  'nahs-b368-gingamax-90',
];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 4) throw new Error(`batch368 count ${ROWS.length}`);
ROWS.forEach((record, index) => {
  if (record.id !== IDS[index]) throw new Error(`batch368 id ${record.id}`);
  if (!record.barcode || !upcCheck(record.barcode)) throw new Error(`batch368 upc ${record.id}`);
  if (record.category !== 'Herbs') throw new Error(record.id + ' tab');
  if (record.verdict !== 'clean' || record.honestNote) throw new Error(record.id + ' verdict');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean') throw new Error(record.id + ' rollup');
  if (record.inactiveIngredients.some((ingredient) => ingredient.riskLevel !== 'cleared')) throw new Error(record.id + ' level');
  if (record.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) throw new Error(record.id + ' stack');
  if (record.inactiveIngredients.some((ingredient) => /none/i.test(ingredient.name))) throw new Error(record.id + ' none');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why) || !/cleared/i.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
  if (banned.test(record.sourcesGeneral.join(' '))) throw new Error(record.id + ' source');
  if (record.sourcesGeneral.join(' ').includes('None is printed')) throw new Error(record.id + ' invented none');
});

const sage = ROWS[0];
const fung = ROWS[1];
const garlex = ROWS[2];
const ginga = ROWS[3];
if (!sage || sage.inactiveIngredients.length !== 0 || sage.activeIngredients.length !== 3) throw new Error('batch368 sage');
if (sage.activeIngredients[0]?.strength !== '' || sage.barcode !== '635824000150') throw new Error('batch368 sage panel');
if (!fung || fung.inactiveIngredients.length !== 0 || fung.activeIngredients.length !== 6) throw new Error('batch368 fung');
if (fung.activeIngredients[0]?.name !== 'Proprietary blend in extra virgin olive oil' || fung.barcode !== '635824000587') {
  throw new Error('batch368 fung panel');
}
if (!garlex || garlex.inactiveIngredients.length !== 0 || garlex.activeIngredients.length !== 7) throw new Error('batch368 garlex');
if (!garlex.sourcesGeneral.join(' ').includes('Serving per container 110') || !garlex.sourcesGeneral.join(' ').includes('5 drops')) {
  throw new Error('batch368 garlex dose');
}
if (garlex.barcode !== '635824002253') throw new Error('batch368 garlex upc');
if (!ginga || ginga.inactiveIngredients.length !== 1 || ginga.inactiveIngredients[0]?.name !== 'non-GMO pullulan (capsule)') {
  throw new Error('batch368 ginga other');
}
if (ginga.activeIngredients[0]?.strength !== '1100 mg' || ginga.barcode !== '635824007586') throw new Error('batch368 ginga panel');
if (ginga.sourcesGeneral.join(' ').includes('635824007593') && ginga.barcode === '635824007593') throw new Error('batch368 tea upc');
if (!ginga.sourcesGeneral.join(' ').includes('not this row')) throw new Error('batch368 tea split');
