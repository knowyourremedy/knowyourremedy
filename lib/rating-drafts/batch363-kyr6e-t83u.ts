// DRAFT / not verified / batch 363 KYR6-e (t83u).
// Eight North American Herb & Spice packs whose remaining other-ingredient
// strings are now the t83u Cleared locks, each with its own confirmed UPC.
// Blend lines are actives and are not graded. The Sprouts section is not edited.

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
const LECITHIN =
  'Methodology §5 Cleared. Sept 22, 2026: organic sunflower lecithin maps to lecithin. It does not stack. It is not sunflower oil.';
const WATER =
  'Methodology §5 Cleared. Sept 22, 2026: bare water is the same row as purified water. It does not stack.';

const TAPIOCA = cleared('tapioca vegetable gelatin (capsule material)', T83);
const SS_TAPIOCA = cleared('tapioca vegetable gelatin (capsule material)', T83);

export const BATCH363_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b363-oreganol-gelcaps-60',
    productName: 'North American Herb & Spice Oreganol P73 Gelcaps (60 softgels)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b363-oreganol-gelcaps',
    form: 'softgel',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'Vitacost'],
    barcode: '635824000501',
    activeIngredients: [
      { name: 'Proprietary blend in certified organic extra virgin olive oil', strength: '140 mg' },
      { name: 'Wild oregano oil P73', strength: '' },
    ],
    inactiveIngredients: [TAPIOCA],
    verdict: 'clean',
    honestNote:
      'A Walmart photograph of this 60-count prints BSE-Free beef gelatin. The current brand label prints tapioca vegetable gelatin (capsule material).',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/oreganol-p73-gelcaps/ shows the 60-count. The brand panel is 1 softgel, 60 per container, proprietary blend in certified organic extra virgin olive oil 140 mg, Wild oregano oil P73. Other ingredients: tapioca vegetable gelatin (capsule material). That string is the t83u Cleared lock. Vitacost https://www.vitacost.com/products/north-american-herb-spice-oreganol-60-gelcaps-7710 repeats that shell and UPC 635824000501. The check digit passes. A Walmart photograph of this count prints BSE-Free beef gelatin. That photograph is not the current brand formula. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b363-oreganol-ss-gelcaps-60',
    productName: 'North American Herb & Spice Super Strength Oreganol P73 Gelcaps (60 softgels)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b363-oreganol-ss-gelcaps',
    form: 'softgel',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'Swanson'],
    barcode: '635824002345',
    activeIngredients: [
      { name: 'Proprietary blend in certified organic extra virgin olive oil', strength: '140 mg' },
      { name: 'Wild, organic oregano oil P73', strength: '' },
    ],
    inactiveIngredients: [SS_TAPIOCA],
    verdict: 'clean',
    honestNote:
      'A Walmart photograph of this 60-count prints softgels made from 100% beef gelatin (BSE free) non-GMO. The current brand label prints tapioca vegetable gelatin (capsule material).',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/super-strength-oreganol-p73-gelcaps/ shows the 60-count. The brand panel is 1 softgel, 60 per container, proprietary blend in certified organic extra virgin olive oil 140 mg, Wild, organic oregano oil P73. Other ingredients: tapioca vegetable gelatin (capsule material). That string is the t83u Cleared lock. UPC 635824002345 is printed on that label. The check digit passes. Swanson’s facts text prints the tapioca line. A Walmart photograph of this count prints a beef-gelatin shell and Wild oregano oil P73. That photograph is not the current brand formula. Counted Limited tokens: none. The 120-count is a separate row.',
    ],
  }),
  finish({
    id: 'nahs-b363-oreganol-ss-gelcaps-120',
    productName: 'North American Herb & Spice Super Strength Oreganol P73 Gelcaps (120 softgels)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b363-oreganol-ss-gelcaps',
    form: 'softgel',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'Walmart'],
    barcode: '635824006947',
    activeIngredients: [
      { name: 'Proprietary blend in certified organic extra virgin olive oil', strength: '140 mg' },
      { name: 'Wild, organic oregano oil P73', strength: '' },
    ],
    inactiveIngredients: [SS_TAPIOCA],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/super-strength-oreganol-p73-gelcaps/ shows the 120-count on the same page. The brand panel is 1 softgel, 120 per container, with the same blend and the same other-ingredient line, tapioca vegetable gelatin (capsule material). UPC 635824006947. The check digit passes. The Walmart 120 photograph prints the same tapioca line and the same code. Counted Limited tokens: none. The 60-count is a separate row.',
    ],
  }),
  finish({
    id: 'nahs-b363-elder-c-60',
    productName: 'North American Herb & Spice Elder-C (60 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b363-elder-c-60',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824007012',
    activeIngredients: [{ name: 'Whole food vitamin C', strength: '50 mg' }],
    inactiveIngredients: [cleared('pullulan (tapioca)', T83)],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/elder-c-capsules/ is the brand page. The panel’s facts row is Whole food vitamin C 50 mg, 65% daily value. Other ingredients: pullulan (tapioca). The parenthesis stays on that one token. It is the t83u Cleared lock. UPC 635824007012. The check digit passes. Counted Limited tokens: none. The page price shown once was $25.49. No stock word was on the page.',
    ],
  }),
  finish({
    id: 'nahs-b363-black-seed-gummies-60',
    productName: 'North American Herb & Spice Black Seed Gummies, Pomegranate (60 gummies)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b363-black-seed-gummies-60',
    form: 'gummy',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824009771',
    activeIngredients: [{ name: 'Proprietary blend', strength: '500 mg' }],
    inactiveIngredients: [
      cleared('Mediterranean-source black seed oil (Nigella sativa)', T83),
      cleared('certified organic fair trade granulated coconut blossom nectar', T83),
      cleared('organic Peruvian yacon syrup', T83),
      cleared('organic apple pectin', T83),
      cleared('organic citric acid (from citrus fruit)', T83),
      cleared('organic sunflower lecithin', LECITHIN),
      cleared('water', WATER),
      cleared('pomegranate concentrate', T83),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/black-seed-gummies/ is the 60-count pomegranate gummy. The 500 mg proprietary blend has no component rows. Other ingredients, in label order: Mediterranean-source black seed oil (Nigella sativa), certified organic fair trade granulated coconut blossom nectar, organic Peruvian yacon syrup, organic apple pectin, organic citric acid (from citrus fruit), organic sunflower lecithin, water, pomegranate concentrate. The six t83u strings are Cleared. Organic sunflower lecithin maps to the Sept 22 lecithin lock. Water is the Sept 22 bare-water lock. The oil stays an other ingredient. UPC 635824009771. The check digit passes. Counted Limited tokens: none. The page price shown once was $37.99.',
    ],
  }),
  finish({
    id: 'nahs-b363-absorb-max-2',
    productName: 'North American Herb & Spice Absorb-Max TQ (2 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b363-absorb-max-2',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006817',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '' },
      { name: 'Freshly cold-pressed Turkish-source black seed oil', strength: '' },
      { name: 'Mycellized, wild, organic Oregano P73', strength: '' },
      { name: 'Certified organic, raw yacon syrup', strength: '' },
    ],
    inactiveIngredients: [
      cleared('Clove bud oil', T83),
      cleared('Cassia oil (cinnamon)', T83),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/black-seed-oil-absorb-max-tq/ shows the 2 oz bottle. Supplement Facts. Serving size 40 drops. 52 servings. The proprietary blend has no printed total. The three rows are actives: Freshly cold-pressed Turkish-source black seed oil, Mycellized, wild, organic Oregano P73, and Certified organic, raw yacon syrup. The yacon syrup is inside the blend. Other ingredients: Clove bud oil, Cassia oil (cinnamon). Both are t83u Cleared locks. non-GMO, chemical-free is outside that line. Barcode 6 35824 00681 7, UPC 635824006817. The check digit passes. Label code LA9152R4 is not a UPC. The page list is not the panel. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b363-black-seed-gelcaps-90',
    productName: 'North American Herb & Spice Oil of Black Seed Gelcaps (90 softgels)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b363-black-seed-gelcaps-90',
    form: 'softgel',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006763',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '2000 mg' },
      { name: 'Extra virgin black seed oil', strength: '' },
      { name: 'Cumin seed essential oil', strength: '' },
      { name: 'Fennel seed essential oil', strength: '' },
      { name: 'Wild, organic oregano oil', strength: '' },
    ],
    inactiveIngredients: [cleared('non-GMO fish gelatin (capsule)', T83)],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/oil-of-black-seed-gelcaps/ is one choice, 90 spice-oil softgels. Supplement Facts. 2 softgels. 45 servings. Proprietary blend 2000 mg. The four rows have no separate amounts: Extra virgin black seed oil, Cumin seed essential oil, Fennel seed essential oil, and Wild, organic oregano oil. Other ingredients: non-GMO fish gelatin (capsule). That string is the t83u Cleared lock. 100% GMO free is the next line. Barcode 6 35824 00676 3, UPC 635824006763. The check digit passes. The page list adds rosemary. Rosemary is not in the photograph. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b363-ceylonpower-90',
    productName: 'North American Herb & Spice CeylonPower (90 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b363-ceylonpower-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'NaturesPick', 'Planet Health STL'],
    barcode: '635824007562',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1100 mg' },
      { name: 'Organic, wild Ceylon cinnamon', strength: '' },
      { name: 'Organic, wild ginger', strength: '' },
    ],
    inactiveIngredients: [cleared('non-GMO pullulan (capsule)', T83)],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/ceylonpower/ is the 90-capsule choice. The brand photograph, NaturesPick, and Planet Health STL agree. 2 capsules, 45 servings, proprietary blend 1100 mg. The blend rows are Organic, wild Ceylon cinnamon and Organic, wild ginger. Other ingredients: non-GMO pullulan (capsule). That string is the t83u Cleared lock. 100% GMO free is a claim. Visual barcode 6 35824 00756 2, UPC 635824007562. The check digit passes. Counted Limited tokens: none. The tea is not this row.',
    ],
  }),
];

const ROWS = BATCH363_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
const IDS = [
  'nahs-b363-oreganol-gelcaps-60',
  'nahs-b363-oreganol-ss-gelcaps-60',
  'nahs-b363-oreganol-ss-gelcaps-120',
  'nahs-b363-elder-c-60',
  'nahs-b363-black-seed-gummies-60',
  'nahs-b363-absorb-max-2',
  'nahs-b363-black-seed-gelcaps-90',
  'nahs-b363-ceylonpower-90',
];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 8) throw new Error(`batch363 count ${ROWS.length}`);
ROWS.forEach((record, index) => {
  if (record.id !== IDS[index]) throw new Error(`batch363 id ${record.id}`);
  if (!record.barcode || !upcCheck(record.barcode)) throw new Error(`batch363 upc ${record.id}`);
  if (record.category !== 'Herbs') throw new Error(record.id + ' tab');
  if (record.verdict !== 'clean') throw new Error(record.id + ' verdict');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== 'clean') throw new Error(record.id + ' rollup');
  if (record.inactiveIngredients.some((ingredient) => ingredient.riskLevel !== 'cleared')) throw new Error(record.id + ' level');
  if (record.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) throw new Error(record.id + ' stack');
  if (record.inactiveIngredients.some((ingredient) => /none/i.test(ingredient.name))) throw new Error(record.id + ' none');
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why) || !/cleared/i.test(why)) {
      throw new Error(`${record.id} ${ingredient.name}: ${why}`);
    }
  }
});
if (!ROWS[0]?.honestNote?.includes('BSE-Free beef gelatin')) throw new Error('batch363 regular note');
if (!ROWS[1]?.honestNote?.includes('beef gelatin')) throw new Error('batch363 ss note');
if (ROWS[2]?.honestNote) throw new Error('batch363 120 note');
if (ROWS[4]?.inactiveIngredients.length !== 8) throw new Error('batch363 gummy count');
if (ROWS[5]?.inactiveIngredients.map((item) => item.name).join('|') !== 'Clove bud oil|Cassia oil (cinnamon)') {
  throw new Error('batch363 absorb');
}
