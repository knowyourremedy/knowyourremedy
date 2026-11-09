// DRAFT / not verified / batch 387 KYR6-e (t86u).
// Six North American Herb & Spice holds whose Other lines are now exact
// t86u or earlier Cleared locks, with a readable panel and a confirmed
// own-count package UPC. Holds that still lack a UPC, a matching panel,
// or a stored facts line stay off this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import { applyT83uRow } from '../scan-preview/t83uLocks';
import { applyT86uRow } from '../scan-preview/t86uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT86uRow(applyT83uRow(applyT54uRow(record)));
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

function cleared83(name: string): IngredientFlag {
  return {
    name,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: 'Methodology §5 Cleared (t83u). This exact printed string is Cleared and does not stack.',
  };
}

function cleared86(name: string): IngredientFlag {
  return {
    name,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: 'Methodology §5 Cleared (t86u). This exact printed string is Cleared and does not stack.',
  };
}

const BEESWAX: IngredientFlag = {
  name: 'beeswax',
  riskLevel: 'cleared',
  stackCountExempt: true,
  source: 'Methodology §5 Cleared (t98u). This exact printed string is Cleared and does not stack.',
};

const SUNFLOWER_LECITHIN: IngredientFlag = {
  name: 'sunflower lecithin',
  riskLevel: 'cleared',
  stackCountExempt: true,
  source: 'Methodology §5 Cleared. Sunflower lecithin is the lecithin lock. It does not stack.',
};

export const BATCH387_KYR6E_T86U: RatingRecord[] = [
  finish({
    id: 'nahs-b387-purely-e-60',
    productName: 'North American Herb & Spice Purely-E (60 gelcaps)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-purely-e-60',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb'],
    barcode: '635824002734',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '750 mg' },
      { name: 'Sunflower seed vitamin E complex (alpha, beta, delta, gamma tocopherols)', strength: '' },
      { name: 'Cold-pressed Austrian pumpkin seed oil', strength: '' },
      { name: 'Cold-pressed red palm oil', strength: '' },
      { name: 'Wild rosemary oil', strength: '' },
      { name: 'Vitamin E complex', strength: '110 mg' },
    ],
    inactiveIngredients: [cleared86('fish gelatin capsules (100% Non-GMO)')],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. https://www.northamericanherbandspice.com/shop/purely-e/ Select a Size includes 60 Gelcaps at $36.99. No stock word was on the brand page. The facts photograph prints Supplement Facts, Serving Size 1 capsule, Servings per container 60, and Proprietary blend 750 mg. The rows with no separate amounts are Sunflower seed vitamin E complex (alpha, beta, delta, gamma tocopherols), Cold-pressed Austrian pumpkin seed oil, Cold-pressed red palm oil, and Wild rosemary oil. Vitamin E complex is 110 mg and is 700%. Those rows are actives and are not graded. The 700% stays in the facts table. Other ingredients: fish gelatin capsules (100% Non-GMO). That print is the t86u Cleared lock. It is not non-GMO fish gelatin (capsule). Contains: Fish (Tilapia) is an allergen line and is not a second token. Label directions say one capsule daily with meals. iHerb https://www.iherb.com/pr/north-american-herb-spice-purely-e-60-caps/14881 is in stock and prints the same facts, the same 110 mg at 700%, and the same shell. The iHerb gallery does not show barcode digits. The brand photograph prints 6 35824 00273 4. The check digit passes. UPC 635824002734. This code is the 60 gelcaps only. The 1 oz code stays on nahs-b378-purely-e-1. Natural Healthy Concepts and Professional Supplement Center print Vitamin E complex 165 IU at 550% and were not copied. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-cherry-bears-60',
    productName: 'North American Herb & Spice kid-e-kare Yummy Gummy Cherry Bears (60 gummies)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-cherry-bears-60',
    form: 'gummy',
    audience: 'kids',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824004219',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '60 mg' },
      { name: 'Extra virgin black seed oil', strength: '' },
      { name: 'wild oregano oil P73', strength: '' },
    ],
    inactiveIngredients: [
      cleared83('certified organic fair trade granulated coconut blossom nectar'),
      cleared83('organic Peruvian yacon syrup'),
      cleared83('organic apple pectin'),
      cleared83('organic citric acid (from citrus fruit)'),
      cleared86('organic tart cherry concentrate'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. The brand page shelf for Yummy Gummy Cherry Bears is $34.99. The $29.74 figure is the subscribe 15% price and is not the shelf price. The front says kid-e-kare, Dietary Supplement, and daily immune support for children. Serving size 2 gummies. Servings per container 30. Calories, total carbohydrate, and total sugars stay in the facts box and are not graded actives. Proprietary blend 60 mg. Extra virgin black seed oil and wild oregano oil P73 sit inside that blend and are not graded. Other ingredients, in label order: certified organic fair trade granulated coconut blossom nectar, organic Peruvian yacon syrup, organic apple pectin, organic citric acid (from citrus fruit), organic tart cherry concentrate. The first four strings are the t83u Cleared locks. organic tart cherry concentrate is the t86u Cleared lock. It is not organic tart cherry flavor. Label directions say take two P73 Yummy Gummy Cherry Bears daily. The page How to Take says the same two gummies. The package photographs print Proprietary blend 60 mg and the digits 6 35824 00421 9. The check digit passes. UPC 635824004219. The page SKU is 9268. Natural Healthy Concepts and Professional Supplement Center print Proprietary Blend 40 mg and were not copied. The sample code was not used. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-oregaresp-90',
    productName: 'North American Herb & Spice OregaRESP (90 vegi-capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-oregaresp-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb', 'Natural Healthy Concepts'],
    barcode: '635824002079',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '450 mg' },
      { name: 'Wild, mountain-grown oregano herb', strength: '' },
      { name: 'Wild, mountain-grown oregano oil powder', strength: '' },
      { name: 'Mountain-grown cumin oil extract powder', strength: '' },
      { name: 'Wild, high-mountain, organic sage oil powder', strength: '' },
      { name: 'Cinnamon oil powder', strength: '' },
      { name: 'Ginger herb powder', strength: '' },
    ],
    inactiveIngredients: [
      cleared83('pullulan'),
      cleared86('non-GMO oat fiber'),
      cleared86('silica mineral'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. https://www.northamericanherbandspice.com/shop/oregaresp/ kept the range $34.99–$79.99. iHerb https://www.iherb.com/pr/north-american-herb-spice-oregaresp-multiple-spice-extract-90-capsules/11951 is in stock. The back prints Supplement Facts, 1 capsule, 90 servings, and proprietary blend 450 mg. The six rows are Wild, mountain-grown oregano herb, Wild, mountain-grown oregano oil powder, Mountain-grown cumin oil extract powder, Wild, high-mountain, organic sage oil powder, Cinnamon oil powder, and Ginger herb powder. Those rows are actives and are not graded. Other ingredients: pullulan, non-GMO oat fiber, silica mineral. pullulan is the t83u Cleared lock. non-GMO oat fiber and silica mineral are the t86u Cleared locks. non-GMO oat fiber is not bare oat fiber. silica mineral is not silicon dioxide and it is not bare silica. Contains no animal products is a claim. The iHerb package image shows no barcode digits. The Natural Healthy Concepts directions photograph prints 6 35824 00207 9. The check digit passes. UPC 635824002079. Natural Healthy Concepts one-time purchase is $67.99. The $64.59 figure is subscribe and save and is not the shelf price. This code is the 90 vegi-capsules only. The 60 softgel code and the 1 fl oz code stay on their own rows. The 30-count page text was not attached. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-purelyliver-150',
    productName: 'North American Herb & Spice PurelyLIVER (150 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-purelyliver-150',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824009733',
    activeIngredients: [{ name: 'Freeze dried beef liver', strength: '3.75 g' }],
    inactiveIngredients: [
      cleared86('hypromellose chlorophyll capsules'),
      cleared86('oregano oil P73 powder'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. The brand page lists PurelyLIVER Capsules at $44.99. No stock word was on the page. The front says 150 CAPSULES (750 mg) and 3.75 g per serving. Supplement Facts, 5 capsules, 30 servings. Freeze dried beef liver 3.75 g stays inside the facts table and is not graded. Other Ingredients: hypromellose chlorophyll capsules, oregano oil P73 powder. Both prints are t86u Cleared locks. Label directions say five capsules daily. The printed digits are 6 35824 00973 3. A barcode read gives 635824009733. The check digit passes. UPC 635824009733. This code is the 150 capsules only. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-turmeric-60',
    productName: 'North American Herb & Spice Turmeric Power Plus (60 gelcaps)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-turmeric-60',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006671',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1000 mg' },
      { name: 'Black seed oil (Nigella sativa)', strength: '' },
      { name: 'CO2-extracted wild, organic turmeric (turmerones 100 mg)', strength: '' },
      { name: 'Wild, organic oregano oil', strength: '' },
      { name: 'Wild organic turmeric extract (curcuminoids 22 mg)', strength: '' },
      { name: 'Coconut crème oil', strength: '' },
      { name: 'Organic ginger oleoresin', strength: '' },
      { name: 'Wild rosemary oil', strength: '' },
      { name: 'Mycellized wild, organic oregano oil', strength: '' },
    ],
    inactiveIngredients: [cleared86('fish gelatin'), { ...BEESWAX }, { ...SUNFLOWER_LECITHIN }],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. The brand page lists Turmeric Power Plus at $34.99 for 60 gelcaps. No stock word was on the page. Serving size 2 capsules. Servings per container 30. Proprietary blend 1000 mg. The eight rows have no separate amounts: Black seed oil (Nigella sativa), CO2-extracted wild, organic turmeric (turmerones 100 mg), Wild, organic oregano oil, Wild organic turmeric extract (curcuminoids 22 mg), Coconut crème oil, Organic ginger oleoresin, Wild rosemary oil, and Mycellized wild, organic oregano oil. Those rows are actives and are not graded. Other ingredients: fish gelatin, beeswax, sunflower lecithin. fish gelatin is the t86u Cleared lock. It is not non-GMO fish gelatin (capsule). beeswax is the t98u Cleared lock. sunflower lecithin is the lecithin lock. This product is 100% non-GMO is a claim. Contains: Fish (Tilapia), Tree Nuts (Coconut) is an allergen line. Label directions say two or more capsules daily. The page How to Take says two capsules daily. The package photograph prints 6 35824 00667 1. The check digit passes. UPC 635824006671. LA9121R1 beside the bars matches the page SKU 9121. That code is not a UPC. This code is the 60 gelcaps only. The 120 gelcap panel and the 2 oz panel stay their own holds. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-dlenolate-30',
    productName: 'North American Herb & Spice P73 Wild Oregano + d-Lenolate Olive Leaf Blend (30 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-dlenolate-30',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824009917',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '2000 mg' },
      { name: 'Olive leaf d-Lenolate extract', strength: '' },
      { name: 'Wild high-mountain oregano P73 herb', strength: '' },
      { name: 'Wild high-mountain oregano P73 oil powder', strength: '' },
      { name: 'Organic garlic (bulb)', strength: '' },
    ],
    inactiveIngredients: [
      cleared83('pullulan'),
      cleared86('non-GMO oat fiber'),
      cleared86('silica mineral'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. The brand page kept the olive-leaf blend range $42.99–$109.99 across the two counts. No stock word was on the page. The 30-capsule facts photograph prints Supplement Facts, Serving Size 1 capsule, Servings per container 30, and Proprietary blend 2000 mg. The four blend rows are Olive leaf d-Lenolate extract, Wild high-mountain oregano P73 herb, Wild high-mountain oregano P73 oil powder, and Organic garlic (bulb). Those rows are actives and are not graded. Other ingredients: pullulan, non-GMO oat fiber, silica mineral. pullulan is the t83u Cleared lock. non-GMO oat fiber and silica mineral are the t86u Cleared locks. Contains no animal products is a claim. Label directions say take one capsule twice daily and increase as needed. The facts serving is 1 capsule. The package photograph prints 6 35824 00991 7. The check digit passes. UPC 635824009917. LA9117R1 beside the bars is a lot code and is not a UPC. This code is the 30 capsules only. The 90-capsule panel prints proprietary blend 550 mg and the blend row d-Lenolate olive leaf extract. That panel was not copied, and its barcode digits are cut off. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH387_KYR6E_T86U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 6) throw new Error(`batch387 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch387 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number; audience: 'adult' | 'kids' }> = {
  'nahs-b387-purely-e-60': { barcode: '635824002734', actives: 6, inactive: 1, audience: 'adult' },
  'nahs-b387-cherry-bears-60': { barcode: '635824004219', actives: 3, inactive: 5, audience: 'kids' },
  'nahs-b387-oregaresp-90': { barcode: '635824002079', actives: 7, inactive: 3, audience: 'adult' },
  'nahs-b387-purelyliver-150': { barcode: '635824009733', actives: 1, inactive: 2, audience: 'adult' },
  'nahs-b387-turmeric-60': { barcode: '635824006671', actives: 9, inactive: 3, audience: 'adult' },
  'nahs-b387-dlenolate-30': { barcode: '635824009917', actives: 5, inactive: 3, audience: 'adult' },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch387 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch387 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== spec.audience || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch387 grade ${row.id}`);
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
  const source = row.sourcesGeneral.join(' ');
  if (banned.test(source) || source.includes('None is printed')) throw new Error(`${row.id} source`);
  if (!row.retailers.includes('North American Herb & Spice')) throw new Error(`${row.id} carrier`);
}

const held = [
  '635824000112',
  '635824000679',
  '635824002819',
  '635824004172',
  '635824005933',
  '635824006305',
  '635824007692',
  '635824009900',
  '335824000937',
];
if (ROWS.some((row) => held.includes(row.barcode ?? ''))) throw new Error('batch387 held upc attached');
