// DRAFT / not verified / batch 298 KYR6-d (t99u).
// Brand page is the single source. The Mixed Berry barcode field is empty.
// No brand is closed. The Sprouts section is not edited.
// t99u requires a full honest note on every row.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const S = {
  cleared98: 'Methodology §5 Cleared (t98u). Does not count toward the t137u stack.',
  cran:
    'Methodology §5 Cleared (cranberry concentrate — t99u). A named plant concentrate. Does not count toward the t137u stack. Not cranberry (as flavor).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers and buffers).',
  wax: 'Methodology §5 Cleared (carnauba wax — t133u).',
  coconut: 'Methodology §5 Cleared (coconut oil, named, any form — t111u).',
  acacia: 'Methodology §5 Cleared (gum acacia / acacia gum).',
  water: 'Methodology §5 Cleared (water / purified water).',
  polyol: 'Methodology §5 Limited (named sugar alcohol). Does not count toward the t137u stack.',
  stevia: 'Methodology §5 Limited (stevia leaf extract — t159u). Counts toward the t137u stack.',
} as const;

type MethKey = keyof typeof S;

const PANEL =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-pastilles-mixed-berry-1-7oz. Inactive ingredients read on the page. t99u brand-page single source.';

function flag(name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${PANEL}; ${S[meth]}` };
}

const NOTE =
  'Counted Limited token: stevia leaf extract (rebaudioside-A). That is one, so this is not a 3+ stack. Maltitol and sorbitol are named sugar alcohols and do not stack. Bilberry concentrate, blackcurrant concentrate, carnauba wax, citric acid, coconut oil, cranberry concentrate, elderflower extract, gum arabic, purified water, and strawberry concentrate are Cleared.';

function finish(record: RatingRecord): RatingRecord {
  if (record.honestNote) return record;
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

export const BATCH298_KYR6D_T99U: RatingRecord[] = [
  finish({
    id: 'bach-b298-pastilles-mixed-berry-50',
    productName: 'Bach RESCUE Pastilles Mixed Berry (50 g)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b298-pastilles-mixed-berry-50',
    form: 'pastille',
    audience: ADULT,
    minAge: 6,
    recordStatus: UNVERIFIED,
    productType: 'OTC',
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
      flag('Bilberry concentrate', 'cleared', 'cleared98'),
      flag('blackcurrant concentrate', 'cleared', 'cleared98'),
      flag('Carnauba Wax', 'cleared', 'wax'),
      flag('Citric Acid', 'cleared', 'citric'),
      flag('Coconut Oil', 'cleared', 'coconut'),
      flag('cranberry concentrate', 'cleared', 'cran'),
      flag('elderflower extract', 'cleared', 'cleared98'),
      flag('Gum Arabic', 'cleared', 'acacia'),
      flag('Maltitol', 'limited', 'polyol'),
      flag('Purified Water', 'cleared', 'water'),
      flag('Sorbitol', 'limited', 'polyol'),
      flag('stevia leaf extract (rebaudioside-A)', 'limited', 'stevia'),
      flag('strawberry concentrate', 'cleared', 'cleared98'),
    ],
    verdict: 'caution',
    honestNote: NOTE,
    sourcesGeneral: [
      't99u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-pastilles-mixed-berry-1-7oz lists the 50 g tin at $13.99 and in stock. SKU 3005348. The barcode field is empty. Ages 6 and older. Dissolve 1 pastille. About 35 pastilles. Active ingredients are the five Rescue flowers, each 5X HPUS, and are not graded. Inactive ingredients: Bilberry concentrate, blackcurrant concentrate, carnauba wax, citric acid, coconut oil, cranberry concentrate, elderflower extract, gum arabic, maltitol, purified water, sorbitol, stevia leaf extract (rebaudioside-A), strawberry concentrate. cranberry concentrate is the t99u Cleared lock. Counted Limited token: stevia leaf extract (rebaudioside-A). That is one, so this is not a 3+ stack. Maltitol and sorbitol do not stack. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH298_KYR6D_T99U;

if (ROWS.length !== 1) throw new Error(`batch298 row count ${ROWS.length}`);

for (const record of ROWS) {
  if (!record.honestNote || record.honestNote.trim().length < 40) {
    throw new Error(`batch298 missing honest note ${record.id}`);
  }
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== 'caution' || rollup.cause !== 'limited_1_2' || mapped.verdict !== 'caution') {
    throw new Error(`batch298 verdict ${rollup.verdict} ${rollup.cause}`);
  }
  const counted = mapped.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== 'stevia leaf extract (rebaudioside-A)') throw new Error(`batch298 stack ${counted}`);
  if ((mapped.honestNote ?? '') !== NOTE) throw new Error(`batch298 note ${mapped.honestNote}`);
  if ((mapped.barcode ?? '') !== '') throw new Error(`batch298 upc ${mapped.barcode}`);
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  if (formNote && !NOTE.startsWith(formNote)) throw new Error(`batch298 form note ${formNote}`);
  if (stackNote && !NOTE.includes(stackNote)) throw new Error(`batch298 stack note ${stackNote}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch298 blank why ${ingredient.name}`);
    if (/is on the Cleared list/i.test(why) || /is on the Limited list/i.test(why)) {
      throw new Error(`batch298 generic why ${ingredient.name}: ${why}`);
    }
  }
}
