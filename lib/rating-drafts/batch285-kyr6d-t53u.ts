// DRAFT / not verified / batch 285 KYR6-d (t53u).
// Brand page is the single source when that page shows the 1-pack for sale
// and every other-ingredient token is already locked.
// Not in this file: Magnesium Breakthrough 60 (founder hold). Packs whose
// printed token is still not the t51u lock stay unwritten.

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
  cleared: (name: string) => `Methodology §5 Cleared (${name}).`,
  sugar: 'Methodology §5 Caution (sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  dextrose: 'Methodology §5 Caution (dextrose). Does not count toward the t137u stack.',
  fruc: 'Methodology §5 Limited (fructose). Counts toward the t137u stack.',
  malt:
    'Methodology §5 Limited (Malodextrin — founder lock t51u; the literal misspelling of maltodextrin). Counts toward the t137u stack.',
  stevia:
    'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u Oct 21, 2026; same Limited row as Stevia and rebaudioside a extracted and purified; counts toward the t137u stack). Not Cleared organic Rebaudioside A. Not Cleared high-purity steviol glycosides. Not Cleared Rebaudioside M.',
  alcohol:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol as a VEHICLE). The 20% is the strength of this vehicle, not a new token. Counts toward the t137u stack.',
  peppermint:
    'Methodology §5 Limited (peppermint oil / orange essential oil as flavor). Counts toward the t137u stack. Not gummy High.',
  eucalyptus:
    'Methodology §5 Caution (eucalyptus oil as an inactive — fragrance/EO line, Sept 15, 2026). Does not count toward the t137u stack. Not the parked topical active.',
  thyme: 'Methodology §5 Caution (thyme oil as OI). Does not count toward the t137u stack.',
  myrrh: 'Methodology §5 Caution (myrrh oil — founder lock t51u). Does not count toward the t137u stack.',
  cherry:
    'Methodology §5 Caution (cherry flavor — flavor-family alias of orange flavor and banana flavor, Sept 24/25, 2026). Does not count toward the t137u stack. Not Natural Cherry Flavor. Not Limited natural flavors.',
} as const;

type Tok = [string, RiskLevel, string];

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
  },
): RatingRecord {
  return finish({
    ...partial,
    brand: 'Quantum Health',
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Quantum Health'],
    barcode: partial.barcode ?? '',
  });
}

function flags(panel: string, toks: Tok[]): IngredientFlag[] {
  return toks.map(([name, riskLevel, source]) => ({ name, riskLevel, source: `${panel}; ${source}` }));
}

const C = (name: string): Tok => [name, 'cleared', S.cleared(name)];

const PSYR =
  'Quantum Health brand page. Serving 1 teaspoon (5 mL). About 24 servings in 4 oz. Echinacea, elderberry, and mullein are the actives and are not graded. t53u brand-page single source.';
const PECH14 =
  'Quantum Health brand page. Serving 1 lozenge. Servings per container 14. Zinc, vitamin A, slippery elm, bee propolis, and echinacea are the actives and are not graded. t53u brand-page single source.';
const PECH60 =
  'Quantum Health brand page. Serving 1 lozenge. Servings per container 60. Zinc, vitamin A, slippery elm, bee propolis, and echinacea are the actives and are not graded. t53u brand-page single source.';

const SYRUP: Tok[] = [
  C('Honey'),
  C('Purified Water'),
  ['Alcohol (20%)', 'limited', S.alcohol],
  ['Peppermint Oil', 'limited', S.peppermint],
  ['Eucalyptus Oil', 'moderate', S.eucalyptus],
  ['Thyme Oil', 'moderate', S.thyme],
  ['Myrrh Oil', 'moderate', S.myrrh],
];

function echinaceaToks(): Tok[] {
  return [
    ['Sugar', 'moderate', S.sugar],
    ['Dextrose', 'moderate', S.dextrose],
    ['Fructose', 'limited', S.fruc],
    C('Magnesium Stearate (vegetable source)'),
    ['Malodextrin', 'limited', S.malt],
    ['Peppermint Oil', 'limited', S.peppermint],
    ['Stevia Leaf Extract (Steviol Glycosides)', 'limited', S.stevia],
    ['Cherry Flavor', 'moderate', S.cherry],
  ];
}

const ECHINACEA_ACTIVES = [
  { name: 'Vitamin A (retinyl acetate)', strength: '538 IU' },
  { name: 'Zinc (from zinc gluconate)', strength: '7 mg' },
  { name: 'Slippery elm bark extract', strength: '19 mg' },
  { name: 'Bee propolis extract', strength: '29 mg' },
  { name: 'Echinacea purpurea (herb)', strength: '73 mg' },
];

export const BATCH285_KYR6D_T53U: RatingRecord[] = [
  row({
    id: 'quantum-b285-elderberry-syrup-4',
    productName: 'Quantum Health Elderberry+ Immune Syrup (4 oz)',
    category: 'Immune Support',
    formulaId: 'quantum-b285-elderberry-syrup-4',
    form: 'liquid',
    activeIngredients: [
      { name: 'Echinacea (purpurea)', strength: '200 mg' },
      { name: 'Elderberry (Sambucus nigra)', strength: '200 mg' },
      { name: 'Mullein (Verbascum thapsus)', strength: '10 mg' },
    ],
    inactiveIngredients: flags(PSYR, SYRUP),
    verdict: 'caution',
    sourcesGeneral: [
      't53u. Quantum Health brand page is the single source. https://quantumhealth.com/products/elderberry-syrup lists the 4 oz bottle at $16.19 and Add to cart. No popup. Serving 1 teaspoon (5 mL). About 24 servings. Counted Limited tokens: alcohol (20%) and peppermint oil. The 20% is the vehicle strength, not a new token. Eucalyptus oil, thyme oil, and myrrh oil are Caution and do not stack. Myrrh oil is the t51u lock. That is two, so this is not a 3+ stack. No honest note. Missing UPC. No code was invented. iHerb search did not open this bottle. Amazon returned the AI-agent access wall and is not a source. Not quantum-b280-elderberry-liquid-2 and not the elderberry capsules.',
    ],
  }),
  row({
    id: 'quantum-b285-therazinc-echinacea-14',
    productName: 'Quantum Health TheraZinc Echinacea Cherry-Mint Lozenges (14 lozenges)',
    category: 'Cold & Flu',
    formulaId: 'quantum-b285-therazinc-echinacea',
    form: 'lozenge',
    activeIngredients: ECHINACEA_ACTIVES,
    inactiveIngredients: flags(PECH14, echinaceaToks()),
    verdict: 'avoid',
    sourcesGeneral: [
      't53u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-echinacea-lozenges lists the 14-count at $3.59 and Add to cart. Serving 1 lozenge. Servings per container 14. Counted Limited tokens: fructose, malodextrin, peppermint oil, and stevia leaf extract. Four Limited tokens make Avoid, and the honest note names those four. Sugar, dextrose, and cherry flavor are Caution and do not stack. Cherry flavor is the flavor-family alias of orange flavor and banana flavor. It is not Natural Cherry Flavor. Missing UPC. No code was invented. The 60-count on the same page is a separate 1-pack and is not this row. Not quantum-b284-therazinc-elder-14.',
    ],
  }),
  row({
    id: 'quantum-b285-therazinc-echinacea-60',
    productName: 'Quantum Health TheraZinc Echinacea Cherry-Mint Lozenges (60 lozenges)',
    category: 'Cold & Flu',
    formulaId: 'quantum-b285-therazinc-echinacea',
    form: 'lozenge',
    activeIngredients: ECHINACEA_ACTIVES,
    inactiveIngredients: flags(PECH60, echinaceaToks()),
    verdict: 'avoid',
    sourcesGeneral: [
      't53u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-echinacea-lozenges lists the 60-count at $13.49 and Add to cart. Serving 1 lozenge. Servings per container 60. Same other-ingredient line as the 14-count. Counted Limited tokens: fructose, malodextrin, peppermint oil, and stevia leaf extract. Four Limited tokens make Avoid, and the honest note names those four. Sugar, dextrose, and cherry flavor are Caution and do not stack. Missing UPC. No code was invented. The 14-count is a separate 1-pack and is not this row.',
    ],
  }),
];

const ROWS = BATCH285_KYR6D_T53U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string }> = {
  'quantum-b285-elderberry-syrup-4': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Alcohol (20%)|Peppermint Oil',
  },
  'quantum-b285-therazinc-echinacea-14': {
    verdict: 'avoid',
    cause: 'limited_stack',
    counted: 'Fructose|Malodextrin|Peppermint Oil|Stevia Leaf Extract (Steviol Glycosides)',
  },
  'quantum-b285-therazinc-echinacea-60': {
    verdict: 'avoid',
    cause: 'limited_stack',
    counted: 'Fructose|Malodextrin|Peppermint Oil|Stevia Leaf Extract (Steviol Glycosides)',
  },
};

const NOTE_IDS = new Set(['quantum-b285-therazinc-echinacea-14', 'quantum-b285-therazinc-echinacea-60']);

if (ROWS.length !== 3) throw new Error(`batch285 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch285 unexpected id ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || record.verdict !== expected.verdict) {
    throw new Error(`batch285 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch285 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch285 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch285 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch285 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch285 pending ${ingredient.name}`);
    }
  }
}
