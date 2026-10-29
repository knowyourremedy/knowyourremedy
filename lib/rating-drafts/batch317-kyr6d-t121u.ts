// DRAFT / not verified / batch 317 KYR6-d (t121u).
// Nelsons US brand page is the single source. The barcode field is empty.
// No brand is closed. The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const KIDS = 'kids' as const;

const PANEL =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-remedy-r-kids. RESCUE Kids dropper 10 mL. Inactive ingredients: Glycerin [vegetable], purified water. The five flowers are the actives. t121u brand-page single source.';

function flag(name: string, riskLevel: RiskLevel, whySource: string): IngredientFlag {
  return { name, riskLevel, source: `${PANEL}; ${whySource}` };
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH317_KYR6D_T121U: RatingRecord[] = [
  finish({
    id: 'bach-b317-rescue-kids-dropper-10',
    productName: 'Bach RESCUE Kids Dropper (10 mL)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b317-rescue-kids-dropper-10',
    form: 'liquid drops',
    audience: KIDS,
    minAge: 2,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    retailers: ['Bach'],
    barcode: '',
    activeIngredients: [
      { name: 'Cherry Plum (Prunus cerasifera)', strength: '5X HPUS' },
      { name: 'Clematis (Clematis vitalba)', strength: '5X HPUS' },
      { name: 'Impatiens (Impatiens glandulifera)', strength: '5X HPUS' },
      { name: 'Rock Rose (Helianthemum nummularium)', strength: '5X HPUS' },
      { name: 'Star of Bethlehem (Ornithogalum umbellatum)', strength: '5X HPUS' },
    ],
    inactiveIngredients: [
      flag('Glycerin [vegetable]', 'cleared', 'Methodology §5 Cleared (glycerin).'),
      flag('Purified Water', 'cleared', 'Methodology §5 Cleared (water).'),
    ],
    verdict: 'clean',
    honestNote:
      'Glycerin [vegetable] and purified water are Cleared. Counted Limited tokens: none. The five flowers are the actives, each 5X HPUS, and are not graded. This dropper does not include White Chestnut. It is not bach-b295-rescue-sleep-kids-dropper-10 and it is not bach-b296-rescue-kids-spray-20. Ages 2 and up. Add 4 drops. About 65 doses. The carton back that opened shows the actives and a lift tab. The inactive line is the line printed on the US product page. No UPC was printed. Missing UPC.',
    sourcesGeneral: [
      't121u. Nelsons US brand page https://www.nelsons.com/en-us/products/rescue-remedy-r-kids is in stock at $16.99. SKU BF00104. 10 mL. The page prints Inactive ingredients: Glycerin [vegetable], purified water. Active ingredients, each 5X HPUS: Cherry Plum (Prunus cerasifera), Clematis (Clematis vitalba), Impatiens (Impatiens glandulifera), Rock Rose (Helianthemum nummularium), Star of Bethlehem (Ornithogalum umbellatum). Suitable for kids ages 2 and up. Add 4 drops. About 65 doses. The barcode field is empty. Missing UPC. No code was invented. Not the Sleep Kids dropper. Not the Kids spray. Not the UK glycerine listing.',
    ],
  }),
];

const ROWS = BATCH317_KYR6D_T121U;
if (ROWS.length !== 1) throw new Error('batch317 count');
for (const record of ROWS) {
  if (record.verdict !== 'clean') throw new Error(`batch317 verdict ${record.verdict}`);
  if (record.barcode) throw new Error('batch317 barcode');
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch317 stack ${counted.map((i) => i.name).join(',')}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch317 generic ${ingredient.name}: ${why}`);
    }
  }
}
