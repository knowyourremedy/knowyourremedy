// DRAFT / not verified / batch 288 KYR6-d (t60u).
// Brand page is the single source. The 60-count facts graphic is the panel.
// iHerb and Vitacost opened a 50-count, not this bottle.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const S = {
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate / mixed-tocopherols antioxidant).',
  gomct:
    'Methodology §5 Limited (goMCT® — branded medium-chain triglyceride, t49u). Same grade as unlabeled MCT / medium-chain triglycerides. Counts toward the t137u stack. Dock rule does not dock it. The parenthesis “medium chain triglycerides” is this same ingredient, not a second Limited token.',
  acacia: 'Methodology §5 Cleared (gum acacia / acacia gum).',
} as const;

type MethKey = keyof typeof S;

const PANEL =
  'BiOptimizers brand page. The 60-capsule facts graphic. Serving 2 capsules. Servings per container 30. Vitamin B6, elemental magnesium, the magnesium blend, manganese, and the humic/fulvic blend are the actives and are not graded. Other ingredients: Hypromellose (capsule), Microcrystalline Cellulose, Ascorbyl Palmitate (preservative), goMCT® (medium chain triglycerides, gum acacia). “(preservative)” is the role of ascorbyl palmitate, not a second token. t60u brand-page single source.';

function flag(name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${PANEL}; ${S[meth]}` };
}

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

export const BATCH288_KYR6D_T60U: RatingRecord[] = [
  finish({
    id: 'bioptimizers-b288-mag-breakthrough-60',
    productName: 'BiOptimizers Magnesium Breakthrough (60 capsules)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b288-mag-breakthrough-60',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['BiOptimizers'],
    barcode: '689176916492',
    activeIngredients: [
      { name: 'Vitamin B6 (as Pyridoxal-5-Phosphate)', strength: '2 mg' },
      { name: 'Elemental Magnesium', strength: '500 mg' },
      {
        name: 'Magnesium Proprietary Blend (Magnesium Chelate, Magnesium Bisglycinate, Sucrosomial® Magnesium (as Magnesium Oxide), Magnesium Malate, Magnesium Orotate, Magnesium Taurate, Magnesium Citrate)',
        strength: '1710 mg',
      },
      { name: 'Manganese (as Manganese Citrate)', strength: '1 mg' },
      { name: 'Humic/Fulvic Monoatomic Blend', strength: '10 mg' },
    ],
    inactiveIngredients: [
      flag('Hypromellose (capsule)', 'cleared', 'hpmc'),
      flag('Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag('Ascorbyl Palmitate', 'cleared', 'ascorbyl'),
      flag('goMCT®', 'limited', 'gomct'),
      flag('Gum Acacia', 'cleared', 'acacia'),
    ],
    verdict: 'caution',
    honestNote:
      'goMCT® (medium chain triglycerides, gum acacia) is the Limited token that produces the Caution grade.',
    sourcesGeneral: [
      't60u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/magnesium-breakthrough lists the 60 capsules at $39.99 and in stock. The carousel facts graphic is the panel. Serving 2 capsules. Servings per container 30. Take 2 capsules daily. Other ingredients: Hypromellose (capsule), Microcrystalline Cellulose, Ascorbyl Palmitate (preservative), goMCT® (medium chain triglycerides, gum acacia). goMCT® is the t49u Limited lock. The parenthesis medium chain triglycerides is that same ingredient, not a second Limited token. Gum acacia is Cleared. “(preservative)” is the role of ascorbyl palmitate, not a second token. Counted Limited token: goMCT®. That is one, so this is not a 3+ stack. No honest note. UPC 689176916492 is on the 60-count label image. The variant GTIN is 0689176916492. iHerb and Vitacost opened a 50-count, not this 60. Not bioptimizers-b281-mag-advanced-10. Not the drink.',
    ],
  }),
];

const ROWS = BATCH288_KYR6D_T60U;

if (ROWS.length !== 1) throw new Error(`batch288 row count ${ROWS.length}`);

const record = ROWS[0];
if (record.id !== 'bioptimizers-b288-mag-breakthrough-60') throw new Error(`batch288 id ${record.id}`);
const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
if (rollup.verdict !== 'caution' || rollup.cause !== 'limited_1_2' || record.verdict !== 'caution') {
  throw new Error(`batch288 verdict ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
}
const counted = record.inactiveIngredients
  .filter((item) => ingredientCountsTowardLimitedStack(item))
  .map((item) => item.name)
  .join('|');
if (counted !== 'goMCT®') throw new Error(`batch288 stack ${counted}`);
const formNote = contradictionHonestNote(record) ?? '';
const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
if (formNote || stackNote) throw new Error(`batch288 auto note ${formNote} ${stackNote}`);
const founderNote =
  'goMCT® (medium chain triglycerides, gum acacia) is the Limited token that produces the Caution grade.';
if (record.honestNote !== founderNote) {
  throw new Error(`batch288 note ${JSON.stringify(record.honestNote)}`);
}
if (record.barcode !== '689176916492') throw new Error(`batch288 upc ${record.barcode}`);
for (const ingredient of record.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why) throw new Error(`batch288 blank why ${ingredient.name}`);
  if (/has its own line in the ingredient rules/i.test(why) || /is on the Cleared list/i.test(why)) {
    throw new Error(`batch288 generic why ${ingredient.name}: ${why}`);
  }
}
