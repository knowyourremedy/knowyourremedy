// DRAFT / not verified / batch 385 KYR6-e (t83u).
// PSC ladder plus the NHC follow-up. Three holds whose panels match
// across two retailers, or match the brand panel, and whose package
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

export const BATCH385_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b385-herbal-zzzs-60',
    productName: 'North American Herb & Spice Herbal-zzZs Melatonin-Free (60 softgels)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b385-herbal-zzzs-60',
    form: 'softgel',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Natural Healthy Concepts', 'Professional Supplement Center'],
    barcode: '635824009139',
    activeIngredients: [
      { name: 'Proprietary blend in extra virgin black seed oil', strength: '140 mg' },
      { name: 'Organic ashwagandha extract', strength: '' },
      { name: 'Raw, organic CO2-extracted hops', strength: '' },
      { name: 'Raw, organic CO2-extracted chamomile', strength: '' },
      { name: 'Magnolia root extract', strength: '' },
    ],
    inactiveIngredients: [cleared('tapioca vegetable gelatin (capsule material)')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. The brand PDF is a marketing sheet with no facts panel. Natural Healthy Concepts https://www.nhc.com/products/herbal-zzzs-melatonin-free-by-north-american-herb-spice and Professional Supplement Center https://www.professionalsupplementcenter.com/products/herbal-zzzs-melatonin-free-by-north-american-herb-spice print the same Supplement Facts. One-time purchase is $29.99 at each retailer. The $28.49 figure is subscribe and save and is not the shelf price. No explicit stock word was on the screenshots. Each page shows Add to Cart. The photograph prints Supplement Facts, Serving Size 1 softgel, per container 60, and proprietary blend in extra virgin black seed oil 140 mg. The rows with no separate amounts are Organic ashwagandha extract, Raw, organic CO2-extracted hops, Raw, organic CO2-extracted chamomile, and Magnolia root extract. Those rows are actives and are not graded. Other ingredients: tapioca vegetable gelatin (capsule material). That print is the t83u Cleared lock. Non-GMO, soy-free is a claim and is not a second token. The barcode digits are 6 35824 00913 9. Those digits were read on the photograph. A barcode reader returned 0635824009139 from that photograph. The human digits are what confirm the code. UPC 635824009139. The check digit passes. LA9259 beside the bars is a lot code. It is not a UPC. This code is the 60 softgels only. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b385-royal-power-120',
    productName: 'North American Herb & Spice Royal Power (120 vegi caps)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b385-royal-power-120',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'Natural Healthy Concepts', 'Professional Supplement Center'],
    barcode: '635824000495',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1100 mg' },
      { name: 'Wild rosemary', strength: '' },
      { name: 'Wild sage', strength: '' },
      { name: 'Royal jelly (4-6% 10-HDA)', strength: '' },
      { name: 'Camu camu', strength: '' },
    ],
    inactiveIngredients: [cleared('cellulose (vegi-capsule)')],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. The brand panel on record is Supplement Facts, 2 capsules, 60 servings, and proprietary blend 1100 mg. Royal Power 120 vegi-capsules is $49.99. No stock word was on the brand page. The page SKU is 0132. The rows with no separate amounts are Wild rosemary, Wild sage, Royal jelly (4-6% 10-HDA), and Camu camu. Those rows are actives and are not graded. Natural vitamin C (from camu camu) 60% stays in the facts table. Other ingredients: cellulose (vegi-capsule). That print is the t83u Cleared lock. (100% GMO free) Contains no animal products is a claim and is not a second token. Label directions say two or more capsules with breakfast or as needed. Natural Healthy Concepts https://www.nhc.com/products/royal-power-by-north-american-herb-spice and Professional Supplement Center https://www.professionalsupplementcenter.com/products/royal-power-by-north-american-herb-spice show the 120 vegi-caps. One-time purchase is $42.99. The $40.84 figure is subscribe and save and is not the shelf price. No explicit stock word was on the screenshots. Each page shows Add to Cart. The retailer facts match the brand panel, including the 1100 mg blend and the cellulose (vegi-capsule) line. The closer barcode crop starts at 35824 and does not show the leading 6. A barcode reader returned 0635824000495 from that crop. That reader lead was not the confirmation. The back photograph prints the digits 6 35824 00049 5. Those digits were read on the photograph. UPC 635824000495. The check digit passes. LA0132R2 beside the bars matches page SKU 0132 and is not a UPC. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b385-total-body-purge-12',
    productName: 'North American Herb & Spice Total Body Purge (12 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b385-total-body-purge-12',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'Natural Healthy Concepts', 'Professional Supplement Center'],
    barcode: '635824002581',
    activeIngredients: [
      { name: 'Proprietary blend in cold-pressed organic extra virgin olive oil & raw apple cider vinegar', strength: '' },
      { name: 'Cold-pressed black seed oil', strength: '' },
      { name: 'Wild raw high bush cranberry extract', strength: '' },
      { name: 'Wild raw dandelion leaf/root extract', strength: '' },
      { name: 'Wild raw burdock leaf extract', strength: '' },
      { name: 'Wild raw nettles extract', strength: '' },
      { name: 'Wild raw fireweed/clintonia extract', strength: '' },
      { name: 'Wild sage oil', strength: '' },
      { name: 'Wild rosemary oil', strength: '' },
      { name: 'Wild oregano oil P73', strength: '' },
      { name: 'Cumin oil', strength: '' },
      { name: 'Fennel oil', strength: '' },
      { name: 'Cilantro oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. The brand panel on record is Supplement Facts, Serving size 1 ounce, Servings per container 12. Total Body Purge 12 ounce is $69.99. The $59.49 figure is the subscribe 15% price, not the shelf price. No stock word was on the brand page. The page SKU is 043. The blend heading is Proprietary blend in cold-pressed organic extra virgin olive oil & raw apple cider vinegar and has no amount. The twelve rows have no separate amounts: Cold-pressed black seed oil, Wild raw high bush cranberry extract, Wild raw dandelion leaf/root extract, Wild raw burdock leaf extract, Wild raw nettles extract, Wild raw fireweed/clintonia extract, Wild sage oil, Wild rosemary oil, Wild oregano oil P73, Cumin oil, Fennel oil, and Cilantro oil. Those rows stay inside the blend and are not graded. The brand photograph has no Other ingredients heading. None is not printed. Wild, non-GMO under the box is a claim. Label directions say take one ounce with breakfast for twelve days and may add to food or juice. Natural Healthy Concepts https://www.nhc.com/products/total-body-purge-liquid-by-north-american-herb-spice and Professional Supplement Center https://www.professionalsupplementcenter.com/products/total-body-purge-liquid-by-north-american-herb-spice show the 12 fl oz bottle. One-time purchase is $59.99. The $56.99 figure is subscribe and save and is not the shelf price. No explicit stock word was on the screenshots. Each page shows Add to Cart. The retailer photograph prints Fennel oil and Cilantro oil at the bottom of the same facts table, then Wild, non-GMO, and no Other ingredients heading. The Professional Supplement Center page text says Other Ingredients: None. That page word is not a label token and is not stored. None was not invented. The barcode digits are 6 35824 00258 1. Those digits were read on the photograph. A barcode reader returned nothing from that photograph. UPC 635824002581. The check digit passes. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH385_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch385 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch385 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b385-herbal-zzzs-60': { barcode: '635824009139', actives: 5, inactive: 1 },
  'nahs-b385-royal-power-120': { barcode: '635824000495', actives: 5, inactive: 1 },
  'nahs-b385-total-body-purge-12': { barcode: '635824002581', actives: 13, inactive: 0 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch385 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch385 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch385 grade ${row.id}`);
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
  if (!row.retailers.includes('Natural Healthy Concepts') || !row.retailers.includes('Professional Supplement Center')) {
    throw new Error(`${row.id} carrier`);
  }
}

const herbal = ROWS[0];
if (herbal?.inactiveIngredients[0]?.name !== 'tapioca vegetable gelatin (capsule material)') throw new Error('batch385 shell');
if (herbal?.activeIngredients[0]?.strength !== '140 mg') throw new Error('batch385 herbal blend');
const royal = ROWS[1];
if (royal?.inactiveIngredients[0]?.name !== 'cellulose (vegi-capsule)' || royal?.activeIngredients[0]?.strength !== '1100 mg') {
  throw new Error('batch385 royal');
}
const purge = ROWS[2];
if (purge?.inactiveIngredients.length !== 0 || purge?.activeIngredients.length !== 13) throw new Error('batch385 purge');
if (
  ROWS.some((row) =>
    [
      '635824000136',
      '635824009122',
      '635824002291',
      '635824002079',
      '635824002819',
      '635824002734',
      '635824004219',
    ].includes(row.barcode ?? ''),
  )
) {
  throw new Error('batch385 held upc attached');
}
