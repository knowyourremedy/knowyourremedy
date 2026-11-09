// DRAFT / not verified / batch 384 KYR6-e (t83u).
// NHC ladder. Three holds whose brand panels match and whose package
// photographs now show all 12 digits. Token holds stay off this file.

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

export const BATCH384_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b384-oregaresp-60',
    productName: 'North American Herb & Spice OregaRESP (60 softgels)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b384-oregaresp-60',
    form: 'softgel',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb', 'Natural Healthy Concepts'],
    barcode: '335824000951',
    activeIngredients: [
      { name: 'Proprietary blend in EVOO', strength: '280 mg' },
      { name: 'Wild mountain-grown oregano oil P73', strength: '' },
      { name: 'Cinnamon oleoresin (CO2 extract)', strength: '' },
      { name: 'Wild mountain-grown sage oil', strength: '' },
      { name: 'Mountain-grown cumin oil', strength: '' },
    ],
    inactiveIngredients: [cleared('tapioca vegetable gelatin (capsule material)')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/oregaresp/ kept the range $34.99–$79.99. No stock word was on the brand page. The brand facts photograph prints Supplement Facts, 2 softgels, 30 servings, and proprietary blend in EVOO 280 mg. The rows with no separate amounts are Wild mountain-grown oregano oil P73, Cinnamon oleoresin (CO2 extract), Wild mountain-grown sage oil, and Mountain-grown cumin oil. Those rows are actives and are not graded. Other ingredients: tapioca vegetable gelatin (capsule material). That print is the t83u Cleared lock. Non-GMO is a claim. The brand digits were cut off. A barcode reader returned 0335824000951 from the clipped bars. That brand read was not confirmed. Label directions say one or more softgels twice daily. The brand page says one gelcap twice daily. The facts serving is 2 softgels. iHerb https://www.iherb.com/pr/north-american-herb-spice-oregaresp-60-softgels/7693 is in stock and prints the same facts. Its gallery did not show the 12 digits. Its Specifications field repeats 335824000951. That field is retailer text. It is not the printed line, and it is not what confirms the code. Natural Healthy Concepts https://www.nhc.com/products/oregaresp-gels-by-north-american-herb-spice shows the 60 softgels. One-time purchase $31.99. The $30.39 figure is subscribe and save and is not the shelf price. No explicit stock word was on the screenshot. The page shows Add to Cart. The NHC back photograph prints the same facts, the same tapioca line, and the barcode digits 3 35824 00095 1. Those digits were read on the photograph. A barcode reader returned nothing from that photograph. UPC 335824000951. The check digit passes. LA400181 beside the bars is a lot code. It is not a UPC. This code is the 60 softgels only. The 1 fl oz code 335824000920 is a different row. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b384-purely-c-120',
    productName: 'North American Herb & Spice Purely-C (120 g)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b384-purely-c-120',
    form: 'powder',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'Natural Healthy Concepts'],
    barcode: '635824002550',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '3000 mg' },
      { name: 'Wild, organic camu camu berries', strength: '' },
      { name: 'Acerola cherry', strength: '' },
      { name: 'Rhus coriaria powder', strength: '' },
      { name: 'Rose hip powder', strength: '' },
      { name: 'Vitamin C (from the above sources)', strength: '310 mg' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/purely-c/ shows 120 Grams Bulk Raw Food at $65.99. No stock word was on the brand page. The brand facts photograph prints Supplement Facts, Serving Size 1 teaspoon (3 g), Servings per container 40, and proprietary blend 3000 mg. Vitamin C (from the above sources) is 310 mg. The photograph has no Other ingredients heading. None is not printed. The front image and the bottle directions image returned 404. The page How to Take says one teaspoon daily with meals. The brand digits were cut off. A 6 and the check digit were clipped. A barcode reader returned 0635824002550 from those bars. That brand read was not confirmed. LA077 beside the brand bars matches page SKU 077 and is not this UPC. Natural Healthy Concepts https://www.nhc.com/products/purely-c-powder-by-north-american-herb-spice shows 120 Grams. One-time purchase $56.99. The $54.14 figure is subscribe and save and is not the shelf price. No explicit stock word was on the screenshot. The page shows Add to Cart. The NHC photograph prints the same serving, the same 3000 mg blend, and Vitamin C (from the above sources) 310 mg. That line is 515%. The rows with no separate amounts are Wild, organic camu camu berries, Acerola cherry, Rhus coriaria powder, and Rose hip powder. Those rows are actives and are not graded. The 90 vegi-cap powder names are a different count. The NHC photograph has no Other ingredients heading. None is not printed. The 90 vegi-cap cellulose line is not this powder. The barcode digits are 6 35824 00255 0. Those digits were read on the photograph. A barcode reader returned nothing from that photograph. UPC 635824002550. The check digit passes. A lot code beside the bars is not a UPC. This code is the 120 g powder only. The 90 vegi-cap code 635824000280 is a different row. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b384-thyroset-90',
    productName: 'North American Herb & Spice Thyroset (90 vegi caps)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b384-thyroset-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'Natural Healthy Concepts'],
    barcode: '635824000235',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1000 mg' },
      { name: 'Wild, raw kelp (plant)', strength: '' },
      { name: 'L-tyrosine', strength: '' },
      { name: 'Wild high-mountain oregano (herb)', strength: '' },
      { name: 'Wild rosemary (herb)', strength: '' },
    ],
    inactiveIngredients: [cleared('pullulan')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/thyroset/ shows the 90 vegi-caps at $41.99. No stock word was on the brand page. The page SKU is 103. The brand facts photograph prints Supplement Facts, Serving Size 2 capsules, Servings per container 45, and Proprietary blend 1,000 mg. The four rows have no separate amounts: Wild, raw kelp (plant), L-tyrosine, Wild high-mountain oregano (herb), and Wild rosemary (herb). Those rows are actives and are not graded. Other ingredients: pullulan. That string is the t83u Cleared lock. (100% GMO free) Contains no animal products is a claim and is not a second token. Label directions say take two capsules daily. The page How to Take says two capsules twice daily. The facts serving is 2 capsules. The bottoms of the brand digits were cut off. A barcode reader returned 0635824000235. That brand read was not confirmed. Natural Healthy Concepts https://www.nhc.com/products/thyroset-by-north-american-herb-spice shows the 90 vegi-caps. One-time purchase $35.99. The $34.19 figure is subscribe and save and is not the shelf price. No explicit stock word was on the screenshot. The page shows Add to Cart. The NHC back photograph prints the same facts, the same pullulan line, and the barcode digits 6 35824 00023 5. Those digits were read on the photograph. A barcode reader returned nothing from that photograph. UPC 635824000235. The check digit passes. A mark beside the check digit is not part of the 12 digits. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH384_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch384 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch384 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b384-oregaresp-60': { barcode: '335824000951', actives: 5, inactive: 1 },
  'nahs-b384-purely-c-120': { barcode: '635824002550', actives: 6, inactive: 0 },
  'nahs-b384-thyroset-90': { barcode: '635824000235', actives: 5, inactive: 1 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch384 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch384 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch384 grade ${row.id}`);
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
  if (!row.retailers.includes('Natural Healthy Concepts')) throw new Error(`${row.id} carrier`);
}

const gels = ROWS[0];
if (gels?.inactiveIngredients[0]?.name !== 'tapioca vegetable gelatin (capsule material)') throw new Error('batch384 shell');
if (gels?.activeIngredients[0]?.strength !== '280 mg') throw new Error('batch384 blend');
const powder = ROWS[1];
if (powder?.inactiveIngredients.length !== 0 || powder?.activeIngredients[5]?.strength !== '310 mg') {
  throw new Error('batch384 powder');
}
const thyro = ROWS[2];
if (thyro?.inactiveIngredients[0]?.name !== 'pullulan' || thyro?.activeIngredients.length !== 5) {
  throw new Error('batch384 thyroset');
}
if (
  ROWS.some((row) =>
    [
      '635824009139',
      '635824000136',
      '635824009122',
      '635824002291',
      '635824002079',
      '635824002819',
      '635824002734',
      '635824000495',
      '635824004219',
    ].includes(row.barcode ?? ''),
  )
) {
  throw new Error('batch384 held upc attached');
}
