// DRAFT / not verified / batch 292 KYR6-d (t86u).
// Brand page is the single source when that page shows the 1-pack and the panel.
// Missing UPCs stay empty. No brand is closed. The Sprouts section is not edited.
// t86u requires a full honest note on every row.

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
const KIDS = 'kids' as const;

const S = {
  color: 'Methodology §5 Cleared (Blackcurrant and carrot extract (as color) — t84u). Named plant color. Does not count toward the t137u stack.',
  wax: 'Methodology §5 Cleared (carnauba wax — t133u).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers and buffers).',
  coconut: 'Methodology §5 Cleared (coconut oil, named, any form — t111u).',
  gum: 'Methodology §5 Cleared (gum arabic).',
  maltitol: 'Methodology §5 Limited (maltitol). Named sugar alcohol. Does not count toward the t137u stack.',
  flavor:
    'Methodology §5 Limited (t54u natural-flavor rule). The panel prints natural flavor and does not name the flavor. Counts toward the t137u stack.',
  water: 'Methodology §5 Cleared (water / purified water).',
  sorbitol: 'Methodology §5 Limited (sorbitol). Named sugar alcohol. Does not count toward the t137u stack.',
  stevia: 'Methodology §5 Limited (stevia leaf extract — t159u). Counts toward the t137u stack.',
  juice: 'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — Oct 15, 2026).',
  kgluc: 'Methodology §5 Cleared (Potassium Gluconate — t84u). Named mineral salt.',
  malic: 'Methodology §5 Cleared (malic acid).',
  calcium: 'Methodology §5 Cleared (Calcium Citrate — t84u). Named mineral salt.',
  berry: 'Methodology §5 Cleared (Organic Mixed Berry Powder — t84u). Named fruit powder.',
  monk: 'Methodology §5 Cleared (organic monk fruit extract).',
  thaumatin: 'Methodology §5 Cleared (thaumatin powder — t55u). Same sweetener as thaumatin.',
  spirulina: 'Methodology §5 Cleared (Blue Spirulina (Phycocyanin) (color)). Named algae color.',
  orgFlavor:
    'Methodology §5 Limited (t54u natural-flavor rule). The panel prints Organic Natural Flavor and does not name the flavor. Counts toward the t137u stack.',
  riceFlour: 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  riceFiber: 'Methodology §5 Cleared (Organic Rice Fiber — t84u). Exact named fiber. Rice-hull / rice-fiber family.',
  sugar: 'Methodology §5 Caution (sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  dextrose: 'Methodology §5 Caution (dextrose). Does not count toward the t137u stack.',
  fructose: 'Methodology §5 Limited (fructose). Counts toward the t137u stack.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate, vegetable source).',
  rasp:
    'Methodology §5 Limited (t54u natural-flavor rule). Natural Raspberry Flavor is the exact t54u name. Counts toward the t137u stack.',
  steviaLeaf:
    'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u). Counts toward the t137u stack.',
} as const;

type MethKey = keyof typeof S;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${S[meth]}` };
}

function finish(record: RatingRecord): RatingRecord {
  if (record.honestNote) return record;
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  partial: Omit<RatingRecord, 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
    productType?: RatingRecord['productType'];
  },
): RatingRecord {
  return finish({
    ...partial,
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: partial.productType ?? 'Supplement',
    retailers: [partial.brand],
    barcode: partial.barcode ?? '',
  });
}

const PSTRAW =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-kids-pastilles-strawberry. The tin is 50 g. Drug Facts. Ages 6 and older. Dissolve 1 pastille. The flower essences are the actives and are not graded. The panel prints strawberry concentrate (as flavor). That token is stored as Strawberry Concentrate. t86u brand-page single source.';
const PDEEP =
  'BiOptimizers brand page. https://bioptimizers.com/products/sleep-breakthrough-drink. The facts image is prod-sleep-breakthrough-blue-berry-sp. The media alt says flavor-Deep Sleep Formula. Serving 2 scoops (8.24 g). Servings per container 25. t86u brand-page single source.';
const PEXT =
  'BiOptimizers brand page. https://bioptimizers.com/products/sleep-breakthrough-drink. The facts image is prod-sleep-breakthrough-tropical-spf. The media alt says flavor-Extended Sleep Formula. Serving 2 scoops (8.78 g). Servings per container 25. t86u brand-page single source.';
const PMASS =
  'BiOptimizers brand shop page. https://bioptimizers.com/shop/products/masszymes. Other ingredients: Rice flour, Hypromellose (capsule), Organic Rice Fiber. The comparison header is a 3-capsule serving. The page says take 3 capsules with the largest meal. The enzyme amounts are not printed on that page. t86u brand-page single source.';

const NOTE_STRAW =
  'Caution from two Limited tokens: natural flavor and stevia leaf extract (rebaudioside-A). That is two, so this is not a 3+ stack. Sorbitol and maltitol are named sugar alcohols and do not stack. Blackcurrant and carrot extract (as color), carnauba wax, citric acid, coconut oil, gum arabic, purified water, and strawberry concentrate are Cleared. The panel prints strawberry concentrate (as flavor). The clean crop of the sweetener reads maltitol.';
const NOTE_DEEP =
  'Every other ingredient is Cleared. Potassium gluconate, malic acid, organic grape juice powder, blue spirulina (phycocyanin) (color), calcium citrate, organic mixed berry powder, organic monk fruit extract, thaumatin powder, and organic beetroot juice powder (color) do not pull the grade down. Counted Limited tokens: none.';
const NOTE_EXT =
  'Caution from one Limited token: organic natural flavor. That is one, so this is not a 3+ stack. Potassium gluconate, malic acid, calcium citrate, and thaumatin powder are Cleared. The shop list also names strawberry juice powder and pineapple juice powder. They are not on the facts image. The image was graded.';
const NOTE_MASS =
  'Rice flour is Caution and does not stack. Hypromellose (capsule) and organic rice fiber are Cleared. Counted Limited tokens: none. A FAQ on the same brand page names rice bran. The other-ingredient line was graded.';
const NOTE_ELDER =
  'Sugar and dextrose are Caution and do not stack. Magnesium stearate (vegetable source) is Cleared. Avoid: three or more Limited tokens triggered the stacking rule (t137u): Fructose, Maltodextrin, Natural Raspberry Flavor, Stevia Leaf Extract (Steviol Glycosides).';
const PELD =
  'Quantum Health brand page. https://quantumhealth.com/products/therazinc-elderberry-lozenges. The ingredients block is the panel for the 14-count and the 60-count. Serving 1 lozenge. The 60-count is 60 servings. t86u brand-page single source.';

const MASS_ACTIVE = [
  { name: 'Vitamin D3', strength: 'amount not printed' },
  {
    name: 'Protease / Peptidase Blend (Protease, Peptidase)',
    strength: 'amount not printed',
  },
  {
    name: 'Enzyme Blend (Fungal Amylase, Bromelain, Aplha Galactosidase, Glucoamylase, Lactase, Fungal Lipase, Lipase (Yeast), Lipase (Food Grade), Lipase, Invertase, Phytase, Pectinase, Hemicellulase, Cellulase, Beta Glucanase)',
    strength: 'amount not printed',
  },
];

const MASS_FLAGS: IngredientFlag[] = [
  flag(PMASS, 'Rice Flour', 'moderate', 'riceFlour'),
  flag(PMASS, 'Hypromellose (capsule)', 'cleared', 'hpmc'),
  flag(PMASS, 'Organic Rice Fiber', 'cleared', 'riceFiber'),
];

const STRAW: IngredientFlag[] = [
  flag(PSTRAW, 'Blackcurrant and carrot extract (as color)', 'cleared', 'color'),
  flag(PSTRAW, 'Carnauba Wax', 'cleared', 'wax'),
  flag(PSTRAW, 'Citric Acid', 'cleared', 'citric'),
  flag(PSTRAW, 'Coconut Oil', 'cleared', 'coconut'),
  flag(PSTRAW, 'Gum Arabic', 'cleared', 'gum'),
  flag(PSTRAW, 'Maltitol', 'limited', 'maltitol'),
  flag(PSTRAW, 'Natural Flavor', 'limited', 'flavor'),
  flag(PSTRAW, 'Purified Water', 'cleared', 'water'),
  flag(PSTRAW, 'Sorbitol', 'limited', 'sorbitol'),
  flag(PSTRAW, 'Stevia Leaf Extract (Rebaudioside-A)', 'limited', 'stevia'),
  flag(PSTRAW, 'Strawberry Concentrate', 'cleared', 'juice'),
];

export const BATCH292_KYR6D_T86U: RatingRecord[] = [
  row({
    id: 'bach-b292-kids-pastilles-strawberry-50',
    productName: 'Bach RESCUE Kids Pastilles Strawberry (50 g)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b292-kids-pastilles-strawberry-50',
    form: 'pastille',
    audience: KIDS,
    minAge: 6,
    productType: 'OTC',
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: [
      { name: 'Cherry Plum', strength: '5X HPUS' },
      { name: 'Clematis', strength: '5X HPUS' },
      { name: 'Impatiens', strength: '5X HPUS' },
      { name: 'Rock Rose', strength: '5X HPUS' },
      { name: 'Star of Bethlehem', strength: '5X HPUS' },
    ],
    inactiveIngredients: STRAW,
    verdict: 'caution',
    honestNote: NOTE_STRAW,
    sourcesGeneral: [
      't86u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-kids-pastilles-strawberry lists the 50 g tin at $13.99 and in stock. SKU 3005951. Drug Facts. Ages 6 and older. Dissolve 1 pastille. Not for children under 6. Inactive ingredients: Blackcurrant and carrot extract (as color), carnauba wax, citric acid, coconut oil, gum arabic, maltitol, natural flavor, purified water, sorbitol, stevia leaf extract (rebaudioside-A), strawberry concentrate (as flavor). The zoomed word on the sweetener reads maltitol. Tesseract on the same line drops a t and prints malitol. The crop was graded. Counted Limited tokens: natural flavor and stevia leaf extract (rebaudioside-A). That is two, so this is not a 3+ stack. Sorbitol and maltitol do not stack. The variant barcode field is empty. Missing UPC. No code was invented. The $0 foreign strawberry pastilles are not this row.',
    ],
  }),
  row({
    id: 'bioptimizers-b292-sleep-drink-deep-25',
    productName: 'BiOptimizers Sleep Breakthrough Drink Deep Sleep (25 servings)',
    brand: 'BiOptimizers',
    category: 'Sleep',
    formulaId: 'bioptimizers-b292-sleep-drink-deep',
    form: 'powder',
    activeIngredients: [
      { name: 'Vitamin B6 (as Pyridoxal-5-Phosphate)', strength: '6 mg' },
      { name: 'Magnesium (from Magnesium Bisglycinate Chelate)', strength: '22 mg' },
      { name: 'Zinc (from Zinc Picolinate)', strength: '6 mg' },
      { name: 'Glycine', strength: '2.9 g' },
      { name: 'Taurine', strength: '2.4 g' },
      { name: 'Bamboo Extract (Phyllostachys viridis) (leaf)', strength: '350 mg' },
      { name: 'L-Theanine', strength: '200 mg' },
      { name: 'Gamma-Aminobutyric Acid (GABA)', strength: '75 mg' },
      { name: 'Magnolia Bark Extract', strength: '30 mg' },
    ],
    inactiveIngredients: [
      flag(PDEEP, 'Potassium Gluconate', 'cleared', 'kgluc'),
      flag(PDEEP, 'Malic Acid', 'cleared', 'malic'),
      flag(PDEEP, 'Organic Grape Juice Powder', 'cleared', 'juice'),
      flag(PDEEP, 'Blue Spirulina (Phycocyanin) (color)', 'cleared', 'spirulina'),
      flag(PDEEP, 'Calcium Citrate', 'cleared', 'calcium'),
      flag(PDEEP, 'Organic Mixed Berry Powder', 'cleared', 'berry'),
      flag(PDEEP, 'Organic Monk Fruit Extract', 'cleared', 'monk'),
      flag(PDEEP, 'Thaumatin Powder', 'cleared', 'thaumatin'),
      flag(PDEEP, 'Organic Beetroot Juice Powder (color)', 'cleared', 'juice'),
    ],
    verdict: 'clean',
    honestNote: NOTE_DEEP,
    barcode: '723098109751',
    sourcesGeneral: [
      't86u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/sleep-breakthrough-drink lists 25 servings / Deep Sleep Formula at $39.99 and in stock. SKU 2925-SPBRBDV2. The facts image prod-sleep-breakthrough-blue-berry-sp is tagged flavor-Deep Sleep Formula. Serving 2 scoops (8.24 g). Servings per container 25. Other ingredients: Potassium Gluconate, Malic Acid, Organic Grape Juice Powder, Blue Spirulina (Phycocyanin) (color), Calcium Citrate, Organic Mixed Berry Powder, Organic Monk Fruit Extract, Thaumatin Powder, Organic Beetroot Juice Powder (color). Counted Limited tokens: none. The variant barcode field prints 0723098109751. The last 12 digits pass the UPC-A check digit. UPC 723098109751. Not bioptimizers-b289-sleep-breakthrough-60. Not the Extended Sleep formula.',
    ],
  }),
  row({
    id: 'bioptimizers-b292-sleep-drink-extended-25',
    productName: 'BiOptimizers Sleep Breakthrough Drink Extended Sleep (25 servings)',
    brand: 'BiOptimizers',
    category: 'Sleep',
    formulaId: 'bioptimizers-b292-sleep-drink-extended',
    form: 'powder',
    activeIngredients: [
      { name: 'Vitamin B6 (as Pyridoxal-5-Phosphate)', strength: '6 mg' },
      { name: 'Magnesium (from Magnesium Bisglycinate Chelate)', strength: '22 mg' },
      { name: 'Zinc (from Zinc Picolinate)', strength: '6 mg' },
      { name: 'Glycine', strength: '2.9 g' },
      { name: 'Taurine', strength: '2.4 g' },
      { name: 'Bamboo Extract (Phyllostachys viridis) (leaf)', strength: '350 mg' },
      { name: 'L-Theanine', strength: '200 mg' },
      { name: 'Magnolia Bark Extract', strength: '30 mg' },
    ],
    inactiveIngredients: [
      flag(PEXT, 'Potassium Gluconate', 'cleared', 'kgluc'),
      flag(PEXT, 'Organic Natural Flavor', 'limited', 'orgFlavor'),
      flag(PEXT, 'Malic Acid', 'cleared', 'malic'),
      flag(PEXT, 'Calcium Citrate', 'cleared', 'calcium'),
      flag(PEXT, 'Thaumatin Powder', 'cleared', 'thaumatin'),
    ],
    verdict: 'caution',
    honestNote: NOTE_EXT,
    barcode: '723098109676',
    sourcesGeneral: [
      't86u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/sleep-breakthrough-drink lists 25 servings / Extended Sleep Formula at $39.99 and in stock. SKU 3725-SPBRBDV1. The facts image prod-sleep-breakthrough-tropical-spf is tagged flavor-Extended Sleep Formula. Serving 2 scoops (8.78 g). Servings per container 25. The image has no GABA. Other ingredients: Potassium Gluconate, Organic Natural Flavor, Malic Acid, Calcium Citrate, Thaumatin Powder. Counted Limited token: organic natural flavor. That is one, so this is not a 3+ stack. A shop ingredient list also names strawberry juice powder and pineapple juice powder. They are not on this facts image. The image was graded. The variant barcode field prints 0723098109676. The last 12 digits pass the UPC-A check digit. UPC 723098109676. Not the Deep Sleep formula. Not the capsule.',
    ],
  }),
  row({
    id: 'bioptimizers-b292-masszymes-30',
    productName: 'BiOptimizers MassZymes (30 capsules)',
    brand: 'BiOptimizers',
    category: 'Digestive',
    formulaId: 'bioptimizers-b292-masszymes',
    form: 'capsule',
    activeIngredients: MASS_ACTIVE,
    inactiveIngredients: MASS_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_MASS,
    barcode: '753359810454',
    sourcesGeneral: [
      't86u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/masszymes lists 30 capsules at $18.99 and in stock. SKU 1783-30CTMATRE. The shop page https://bioptimizers.com/shop/products/masszymes prints Other Ingredients: Rice flour, Hypromellose (capsule), Organic Rice Fiber. Serving 3 capsules. The 30-count is 10 servings. The page names the enzymes and does not print their amounts. A FAQ on the same page names rice bran. That sentence was not graded. Counted Limited tokens: none. Rice flour is Caution and does not stack. The variant barcode field prints 0753359810454. The last 12 digits pass the UPC-A check digit. UPC 753359810454. Not the 90-count. Not the 120-count. Not the 250-count.',
    ],
  }),
  row({
    id: 'bioptimizers-b292-masszymes-120',
    productName: 'BiOptimizers MassZymes (120 capsules)',
    brand: 'BiOptimizers',
    category: 'Digestive',
    formulaId: 'bioptimizers-b292-masszymes',
    form: 'capsule',
    activeIngredients: MASS_ACTIVE,
    inactiveIngredients: MASS_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_MASS,
    barcode: '641753965620',
    sourcesGeneral: [
      't86u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/masszymes lists 120 capsules at $34.99 and in stock. SKU 897-120MATRE. Same other-ingredient line as the 30-count. Serving 3 capsules. The 120-count is 40 servings. Counted Limited tokens: none. Rice flour is Caution and does not stack. The variant barcode field prints 0641753965620. The last 12 digits pass the UPC-A check digit. UPC 641753965620. Not the 90-count UPC 850018116770.',
    ],
  }),
  row({
    id: 'bioptimizers-b292-masszymes-250',
    productName: 'BiOptimizers MassZymes (250 capsules)',
    brand: 'BiOptimizers',
    category: 'Digestive',
    formulaId: 'bioptimizers-b292-masszymes',
    form: 'capsule',
    activeIngredients: MASS_ACTIVE,
    inactiveIngredients: MASS_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_MASS,
    sourcesGeneral: [
      't86u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/masszymes lists 250 capsules at $59.99 and in stock. SKU 768-MATHREE. Same other-ingredient line as the 30-count. Serving 3 capsules. The page does not print servings per container for the 250-count. Counted Limited tokens: none. Rice flour is Caution and does not stack. The variant barcode field prints 0617539555029. That check digit does not validate as a GTIN-13 or as a UPC-A. Missing UPC. No code was invented. Not the 90-count. The UK 250-count carrageenan line is not this US panel.',
    ],
  }),
  row({
    id: 'quantum-b292-therazinc-elder-60',
    productName: 'Quantum Health TheraZinc Elderberry Raspberry Lozenges (60 lozenges)',
    brand: 'Quantum Health',
    category: 'Cold & Flu',
    formulaId: 'quantum-b284-therazinc-elder-14',
    form: 'lozenge',
    minAge: 12,
    activeIngredients: [
      { name: 'Zinc (from Zinc Gluconate)', strength: '7 mg' },
      { name: 'European Elder Fruit', strength: '36 mg' },
    ],
    inactiveIngredients: [
      flag(PELD, 'Sugar', 'moderate', 'sugar'),
      flag(PELD, 'Dextrose', 'moderate', 'dextrose'),
      flag(PELD, 'Fructose', 'limited', 'fructose'),
      flag(PELD, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PELD, 'Magnesium Stearate (vegetable source)', 'cleared', 'magStearate'),
      flag(PELD, 'Natural Raspberry Flavor', 'limited', 'rasp'),
      flag(PELD, 'Stevia Leaf Extract (Steviol Glycosides)', 'limited', 'steviaLeaf'),
    ],
    verdict: 'avoid',
    honestNote: NOTE_ELDER,
    sourcesGeneral: [
      't86u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-elderberry-lozenges lists the 60-count at $13.49 and in stock. SKU F-ZINCELD60. The ingredients block on that page is the panel for both counts. Serving 1 lozenge. Servings per container 60. Other ingredients: Sugar, Dextrose, Fructose, Maltodextrin, Magnesium Stearate (vegetable source), Natural Raspberry Flavor, Stevia Leaf Extract (Steviol Glycosides). Counted Limited tokens: fructose, maltodextrin, natural raspberry flavor, and stevia leaf extract (steviol glycosides). That is four, so the 3+ stack is Avoid and the honest note names them. Sugar and dextrose are Caution and do not stack. iHerb and PureFormulas print the same line. The variant barcode field is empty. A retailer page prints 046985017060 and the bottle image fragment was 046985017069. Those do not agree, so neither was attached. Missing UPC. No code was invented. Same formula as quantum-b284-therazinc-elder-14. Not the USDA Organic elderberry lozenges.',
    ],
  }),
];

const ROWS = BATCH292_KYR6D_T86U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: string; barcode: string }> = {
  'bach-b292-kids-pastilles-strawberry-50': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavor|Stevia Leaf Extract (Rebaudioside-A)',
    note: NOTE_STRAW,
    barcode: '',
  },
  'bioptimizers-b292-sleep-drink-deep-25': {
    verdict: 'clean',
    cause: 'clean',
    counted: '',
    note: NOTE_DEEP,
    barcode: '723098109751',
  },
  'bioptimizers-b292-sleep-drink-extended-25': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Organic Natural Flavor',
    note: NOTE_EXT,
    barcode: '723098109676',
  },
  'bioptimizers-b292-masszymes-30': {
    verdict: 'caution',
    cause: 'moderate',
    counted: '',
    note: NOTE_MASS,
    barcode: '753359810454',
  },
  'bioptimizers-b292-masszymes-120': {
    verdict: 'caution',
    cause: 'moderate',
    counted: '',
    note: NOTE_MASS,
    barcode: '641753965620',
  },
  'bioptimizers-b292-masszymes-250': {
    verdict: 'caution',
    cause: 'moderate',
    counted: '',
    note: NOTE_MASS,
    barcode: '',
  },
  'quantum-b292-therazinc-elder-60': {
    verdict: 'avoid',
    cause: 'limited_stack',
    counted: 'Fructose|Maltodextrin|Natural Raspberry Flavor|Stevia Leaf Extract (Steviol Glycosides)',
    note: NOTE_ELDER,
    barcode: '',
  },
};

if (ROWS.length !== 7) throw new Error(`batch292 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch292 unexpected id ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || mapped.verdict !== expected.verdict) {
    throw new Error(`batch292 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${mapped.verdict}`);
  }
  const counted = mapped.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch292 stack ${record.id} ${counted}`);
  if ((mapped.honestNote ?? '') !== expected.note) throw new Error(`batch292 note ${record.id} ${JSON.stringify(mapped.honestNote)}`);
  if ((mapped.barcode ?? '') !== expected.barcode) throw new Error(`batch292 upc ${record.id} ${mapped.barcode}`);
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  if (formNote && !expected.note.startsWith(formNote)) throw new Error(`batch292 form note ${record.id} ${formNote}`);
  if (stackNote && !expected.note.includes(stackNote)) throw new Error(`batch292 stack note ${record.id} ${stackNote}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch292 blank why ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list/i.test(why) || /is on the Limited list/i.test(why)) {
      throw new Error(`batch292 generic why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
