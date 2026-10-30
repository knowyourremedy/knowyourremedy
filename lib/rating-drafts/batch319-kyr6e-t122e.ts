// DRAFT / not verified / batch 319 KYR6-e (t122e).
// Brand pages are the single source. No UPC was printed.
// Bach and Cheribundi are closed as Catalog done, missing UPCs only.
// The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, whySource: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${whySource}` };
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const SPRAY =
  'Comvita brand label. Bee Propolis Throat Spray, 20 mL. Ingredients line. t122e brand page.';
const CAPS =
  'Beam brand facts image. Dream capsules, 60 capsules. t122e brand page.';

const GLY = 'Methodology §5 Cleared (glycerin).';
const WATER = 'Methodology §5 Cleared (water).';
const PEPPERMINT =
  'Methodology §5 Limited (peppermint oil as flavor). Counts toward the t137u stack. Not the gummy seed-oil rule.';
const ANISE =
  'Methodology §5 Cleared (Illicium verum (Aniseed) Fruit/Seed Oil — founder lock t122e). Does not count toward the t137u stack.';
const MYRRH =
  'Methodology §5 Cleared (Commiphora myrrha (Myrrh) Oil — founder lock t122e). Does not count toward the t137u stack. Not the t51u Caution token Myrrh oil.';
const MENTHOL =
  'Methodology §5 Cleared (Menthol — founder lock t122e). The exact word. Does not count toward the t137u stack. Not Natural Menthol.';
const RICE = 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.';
const HPMC = 'Methodology §5 Cleared (hypromellose capsule).';
const STEARATE = 'Methodology §5 Cleared (magnesium stearate).';

export const BATCH319_KYR6E_T122E: RatingRecord[] = [
  finish({
    id: 'comvita-b319-propolis-spray-20',
    productName: 'Comvita Bee Propolis Throat Spray (20 mL)',
    brand: 'Comvita',
    category: 'Cold & Flu',
    formulaId: 'comvita-b319-propolis-spray-20',
    form: 'spray',
    audience: ADULT,
    minAge: 1,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Comvita'],
    barcode: '',
    activeIngredients: [{ name: 'Mel (Manuka Honey)' }, { name: 'Propolis Extract' }],
    inactiveIngredients: [
      flag(SPRAY, 'Glycerin', 'cleared', GLY),
      flag(SPRAY, 'Water/Aqua', 'cleared', WATER),
      flag(SPRAY, 'Mentha piperita (Peppermint) Oil', 'limited', PEPPERMINT),
      flag(SPRAY, 'Illicium verum (Aniseed) Fruit/Seed Oil', 'cleared', ANISE),
      flag(SPRAY, 'Commiphora myrrha (Myrrh) Oil', 'cleared', MYRRH),
      flag(SPRAY, 'Menthol', 'cleared', MENTHOL),
    ],
    verdict: 'caution',
    honestNote:
      'Commiphora myrrha (Myrrh) Oil is the exact Cleared token. Myrrh oil is a different Caution row, so this print did not pull the grade down. Menthol printed alone is Cleared. The older inactive-menthol spray row is not this exact token, so it did not pull the grade down. Counted Limited token: Mentha piperita (Peppermint) Oil. That is one, so this is not a 3+ stack. Glycerin and Water/Aqua are Cleared. Mel (Manuka Honey) and Propolis Extract are the throat-spray actives and are not graded. The label heading is Ingredients. Net quantity is 20 mL / 0.7 fl oz. No UPC was readable. Missing UPC.',
    sourcesGeneral: [
      't122e. Comvita brand page https://www.comvita.com/products/propolis-oral-spray lists Bee Propolis Throat Spray at $14.99 and in stock. The label image prints INGREDIENTS: Glycerin, Water/Aqua, Mel (Manuka Honey), Propolis Extract, Mentha piperita (Peppermint) Oil, Illicium verum (Aniseed) Fruit/Seed Oil, Commiphora myrrha (Myrrh) Oil, Menthol. Directions: Spray into mouth by pumping top 2-6 times as required. Net quantity 20 mL / 0.7 fl oz. No UPC was readable. Missing UPC. No code was invented. This is not comvita-b310-propolis-extract.',
    ],
  }),
  finish({
    id: 'beam-b319-dream-capsules-60',
    productName: 'Beam Dream Capsules (60 capsules)',
    brand: 'Beam',
    category: 'Sleep',
    formulaId: 'beam-b319-dream-capsules-60',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Beam'],
    barcode: '',
    activeIngredients: [
      { name: 'Magnesium (As Magnesium Citrate, Dimagnesium Malate)', strength: '60 mg' },
      { name: 'Reishi Mushroom Extract (Ganoderma lucidum)', strength: '350 mg' },
      { name: 'L-Theanine', strength: '300 mg' },
      { name: 'Apigenin', strength: '50 mg' },
      { name: 'Melatonin', strength: '3 mg' },
    ],
    inactiveIngredients: [
      flag(CAPS, 'Rice Flour', 'moderate', RICE),
      flag(CAPS, 'Hypromellose (capsule)', 'cleared', HPMC),
      flag(CAPS, 'Magnesium Stearate', 'cleared', STEARATE),
    ],
    verdict: 'caution',
    honestNote:
      'Rice flour is Caution and does not stack. It is not rice hull and it is not rice powder. Counted Limited tokens: none. Hypromellose and magnesium stearate are Cleared. Magnesium, reishi, L-theanine, apigenin, and melatonin are the supplement-facts actives and are not graded. Serving size is 2 capsules and the bottle is 30 servings, so this is 60 capsules. No UPC was printed. Missing UPC. The Dream powders are not this row.',
    sourcesGeneral: [
      't122e. Beam brand page https://shopbeam.com/products/beam-dream-capsules-2 lists Dream Capsules at $57.99 and in stock. The facts image prints Serving Size 2 capsules and Servings Per Container 30. Other ingredients: Rice Flour, Hypromellose (capsule), Magnesium Stearate. No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: number }> = {
  'comvita-b319-propolis-spray-20': { verdict: 'caution', counted: 1 },
  'beam-b319-dream-capsules-60': { verdict: 'caution', counted: 0 },
};

const ROWS = BATCH319_KYR6E_T122E;
if (ROWS.length !== 2) throw new Error(`batch319 count ${ROWS.length}`);
for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch319 unexpected ${record.id}`);
  if (record.verdict !== expected.verdict) throw new Error(`batch319 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch319 barcode ${record.id}`);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch319 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== expected.counted) {
    throw new Error(`batch319 stack ${record.id} ${counted.map((i) => i.name).join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch319 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch319 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
