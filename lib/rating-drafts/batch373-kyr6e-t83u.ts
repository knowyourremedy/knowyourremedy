// DRAFT / not verified / batch 373 KYR6-e (t83u).
// Three North American Herb & Spice oral supplements from packet 8.
// Blend rows are actives and are not graded. None is not stored.

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

export const BATCH373_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b373-nukeprotect-90',
    productName: 'North American Herb & Spice NukeProtect (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b373-nukeprotect-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000655',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1400 mg' },
      { name: 'Wild oregano and rosemary', strength: '' },
      { name: 'Wild Rhus coriaria', strength: '' },
      { name: 'Wild cumin powder', strength: '' },
      { name: 'Wild Atlantic-source kelp', strength: '' },
      { name: 'Wild, raw chaga powder', strength: '' },
      { name: 'Pharmaceutical-grade potassium iodide', strength: '60 mcg' },
      { name: 'Selenium yeast', strength: '60 mcg' },
    ],
    inactiveIngredients: [cleared('pullulan (tapioca)')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/nuke-protect/ shows one 90 vegi-cap bottle. The buy box says Out of stock. The front says Dietary Supplement, NukeProtect, and 90 VEGI CAPS. The facts photograph prints Supplement Facts, Serving Size 2 capsules, Servings Per Container 45, and Proprietary blend 1400 mg. The seven rows are Wild oregano and rosemary, Wild Rhus coriaria, Wild cumin powder, Wild Atlantic-source kelp, Wild, raw chaga powder, Pharmaceutical-grade potassium iodide 60 mcg, and Selenium yeast 60 mcg. Those rows are actives and are not graded. Other ingredients: pullulan (tapioca). That string is the t83u Cleared lock. The next line, (100% GMO free) Contains no animal products, is a claim and is not a second token. Label directions say two capsules daily at 150 pounds or more and one capsule daily under 150 pounds. The page How to Take says two to four and one to two, and it adds a pet dose. The facts serving is 2 capsules. A barcode read gives 6 35824 00065 5. UPC 635824000655. The check digit passes. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b373-o2rega-8',
    productName: 'North American Herb & Spice O2rega (8 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b373-o2rega-8',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824007531',
    activeIngredients: [
      { name: 'Proprietary Blend', strength: '' },
      { name: 'Oregano Juice', strength: '' },
      { name: 'Hydrogen Rich Filtered Water', strength: '' },
      { name: 'Pomegranate Extract', strength: '' },
      { name: 'Mycelized Pine Resin', strength: '' },
      { name: 'Honey-Clover', strength: '' },
      { name: 'Black Seed Oil', strength: '' },
      { name: 'Organic Raspberry Powder', strength: '' },
      { name: 'Extra Virgin Olive Oil Organic', strength: '' },
      { name: 'Yacon Syrup', strength: '' },
      { name: 'Coconut Crème Oil', strength: '' },
      { name: 'Pine Resin', strength: '' },
      { name: 'Cassia Oil (cinnamon)', strength: '' },
      { name: 'Oregano Oil (Wild)', strength: '' },
      { name: 'Cinnamon Water Extract Powder', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/o2rega/ shows one 8 fl oz bottle. A SALE badge is on the page. No stock word was on the page. The front says Dietary Supplement, O2rega, and 8 FL. OZ. (240 ML). The facts photograph prints Supplement Facts, Serving Size 1 tablespoon, Servings Per Container 16, and Proprietary Blend with no printed total. The fourteen rows have no amounts: Oregano Juice, Hydrogen Rich Filtered Water, Pomegranate Extract, Mycelized Pine Resin, Honey-Clover, Black Seed Oil, Organic Raspberry Powder, Extra Virgin Olive Oil Organic, Yacon Syrup, Coconut Crème Oil, Pine Resin, Cassia Oil (cinnamon), Oregano Oil (Wild), and Cinnamon Water Extract Powder. Those rows are actives and are not graded. The oils, powders, and syrups stay inside the blend. Cassia Oil (cinnamon) stays inside the blend. The photograph has no Other ingredients heading. None is not printed. Chemical-free, Natural source of oxygen, and Non-GMO stay claims under the table. The source report quotes the label directions as one tablespoon in juice or water, and shake well. The page How to Take says at least one tablespoon. The photograph says Oregano Oil (Wild). The page list says P73 wild oregano oil. The facts row says Mycelized Pine Resin. The front says Mycellized. A barcode read gives 6 35824 00753 1. UPC 635824007531. The check digit passes. The QR code and label code LA0411 are not UPCs. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b373-bay-leaf-1',
    productName: 'North American Herb & Spice Oil of Wild Bay Leaf (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b373-bay-leaf-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824001157',
    activeIngredients: [
      { name: 'Proprietary blend in extra virgin olive oil', strength: '100 mg' },
      { name: 'Wild bay leaf oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/oil-of-wild-bay-leaf/ shows one 1 fl oz dropper. A SALE badge is on the page. No stock word was on the page. The front says Dietary Supplement, Oil of Wild Bay Leaf, and 1 FL. OZ. (30ML.). The facts photograph prints Supplement Facts, Serving Size 3 drops, Servings per container 286, and Proprietary blend 100 mg in extra virgin olive oil. The row is Wild bay leaf oil, with no amount. That row is an active and is not graded. The olive oil stays inside the blend heading. The photograph has no Other ingredients heading. None is not printed. A steam-extracted oil and Guaranteed wild, Non-GMO stay claims. Label directions say three or more drops under the tongue or in juice or water daily, and also rub topically. The page How to Take omits or more. The printed digits are 6 35824 00115 7. A barcode read of the facts photograph, the directions photograph, and the rotated crop gives 635824001157. The check digit passes. A second read of those photographs returns 635224001757. That string does not match the printed digits and is not this bottle. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH373_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch373 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch373 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b373-nukeprotect-90': { barcode: '635824000655', actives: 8, inactive: 1 },
  'nahs-b373-o2rega-8': { barcode: '635824007531', actives: 15, inactive: 0 },
  'nahs-b373-bay-leaf-1': { barcode: '635824001157', actives: 2, inactive: 0 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch373 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch373 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch373 grade ${row.id}`);
  }
  if (row.activeIngredients.length !== spec.actives) throw new Error(`${row.id} actives`);
  if (row.inactiveIngredients.length !== spec.inactive) throw new Error(`${row.id} other`);
  const roll = computeVerdictFromInactiveIngredients(row.inactiveIngredients);
  if (roll.verdict !== 'clean') throw new Error(`${row.id} rollup`);
  if (row.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) {
    throw new Error(`${row.id} stack`);
  }
  for (const ingredient of row.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why) || !/cleared/i.test(why)) throw new Error(`${row.id} ${ingredient.name}: ${why}`);
  }
  const source = (row.sourcesGeneral ?? []).join(' ');
  if (banned.test(source) || source.includes('None is printed')) throw new Error(`${row.id} source`);
}

const nuke = ROWS[0];
const o2 = ROWS[1];
const bay = ROWS[2];
if (nuke?.inactiveIngredients[0]?.name !== 'pullulan (tapioca)') throw new Error('batch373 shell');
if (nuke.barcode === '635824000655' && !nuke.sourcesGeneral?.[0]?.includes('6 35824 00065 5')) throw new Error('batch373 nuke photo');
if (!o2?.sourcesGeneral?.[0]?.includes('6 35824 00753 1') || o2.inactiveIngredients.length !== 0) throw new Error('batch373 o2 photo');
if (o2.activeIngredients.some((item) => item.name === 'P73 wild oregano oil')) throw new Error('batch373 page oil');
if (bay?.barcode === '635224001757' || bay?.sourcesGeneral?.[0]?.includes('635224001757') !== true) throw new Error('batch373 bay second');
if (!bay.sourcesGeneral?.[0]?.includes('6 35824 00115 7') || !bay.sourcesGeneral?.[0]?.includes('under the tongue')) throw new Error('batch373 bay photo');
if (ROWS.some((row) => row.barcode === '635824002413' || row.barcode === '635824009122' || row.barcode === '635824001000' || row.barcode === '635824001010')) {
  throw new Error('batch373 held upc attached');
}
