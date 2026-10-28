// DRAFT / not verified / batch 296 KYR6-d (t97u).
// Brand page is the single source when that page shows the 1-pack and the panel.
// Missing UPCs stay empty. The barcode string 5.00E+12 is not a UPC.
// No brand is closed. The Sprouts section is not edited.
// t97u requires a full honest note on every row.

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
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  water: 'Methodology §5 Cleared (water / purified water).',
  alcohol:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol as a VEHICLE — oral homeopathic liquid or topical first-aid). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  rice:
    'Methodology §5 Limited (rice extract — unspecified form). The label does not name hull, bran, or concentrate. Counts toward the t137u stack.',
  capsule:
    'Methodology §5 Cleared (vegetable cellulose capsule — t130u). Named plant cellulose. Does not count toward the t137u stack.',
  gomct:
    'Methodology §5 Limited (goMCT® — branded medium-chain triglyceride, t49u). Same grade as unlabeled MCT / medium-chain triglycerides. Counts toward the t137u stack. Dock rule does not dock it. The parenthesis “medium chain triglycerides” is this same ingredient, not a second Limited token.',
  acacia: 'Methodology §5 Cleared (gum acacia / acacia gum).',
  lactone:
    'Methodology §5 Cleared (Glucono Delta Lactone — t51u). Same substance as gluconolactone. 21 CFR 184.1318. Does not count toward the t137u stack.',
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
    productType: partial.productType ?? 'OTC',
    retailers: [partial.brand],
    barcode: partial.barcode ?? '',
  });
}

const FLOWERS = [
  { name: 'Cherry Plum (Prunus cerasifera)', strength: '5X HPUS' },
  { name: 'Clematis (Clematis vitalba)', strength: '5X HPUS' },
  { name: 'Impatiens (Impatiens glandulifera)', strength: '5X HPUS' },
  { name: 'Rock Rose (Helianthemum nummularium)', strength: '5X HPUS' },
  { name: 'Star of Bethlehem (Ornithogalum umbellatum)', strength: '5X HPUS' },
];

const CHESTNUT = { name: 'White Chestnut (Aesculus hippocastanum)', strength: '5X HPUS' };

const PSLEEP =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-sleep-dropper-20ml. RESCUE Sleep Dropper 20 mL. Inactive ingredients: Glycerin [vegetable], purified water. White Chestnut is an active. t97u brand-page single source.';
const PKIDS_SPRAY =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-sleep-kids-spray-20ml. RESCUE Sleep Kids Spray 20 mL. Inactive ingredients: Glycerin [vegetable], purified water. White Chestnut is an active. t97u brand-page single source.';
const PKIDS =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-kids-spray-20ml. RESCUE Kids Spray 20 mL. Inactive ingredients: Glycerin [vegetable], purified water. The five flowers are the actives. t97u brand-page single source.';
const PSPRAY =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-sleep-r-spray. RESCUE Sleep Spray 20 mL. Inactive ingredients: Alcohol. White Chestnut is an active. t97u brand-page single source.';
const P7 =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/us-rescue-remedy-spray-7ml. RESCUE Remedy Spray 7 mL. Inactive ingredient: Alcohol. The five flowers are the actives. t97u brand-page single source.';
const PVEG =
  'BiOptimizers brand page. https://bioptimizers.com/products/vegzymes. The ingredients image. Serving size 2 capsules. Servings per container 60. Other ingredients: Rice Extract, Capsule (Vegetable Cellulose and Water). The enzymes, AstraZyme, InnoSlim, and Betaine HCL are the actives. t97u brand-page single source.';
const PMAG =
  'BiOptimizers brand page. https://bioptimizers.com/products/magnesium-breakthrough-drink. Unflavored supplement-facts image. Serving size 1 scoop (2.13 g). Servings per container 30. Other ingredients: goMCT® (Medium Chain Triglycerides, Gum Acacia), Glucono Delta Lactone. Magnesium is the active. t97u brand-page single source.';

const NOTE_SLEEP =
  'The Sleep formula includes White Chestnut. White Chestnut is an active and is not graded. Glycerin [vegetable] and purified water are Cleared. Counted Limited tokens: none. This is the 20 mL Sleep dropper. It is not bach-b295-rescue-sleep-kids-dropper-10.';
const NOTE_KIDS_SPRAY =
  'The Sleep formula includes White Chestnut. White Chestnut is an active and is not graded. Glycerin [vegetable] and purified water are Cleared. Counted Limited tokens: none. This is the 20 mL Sleep Kids spray. It is not the 10 mL Sleep Kids dropper and it is not the non-sleep Kids spray.';
const NOTE_KIDS =
  'Glycerin [vegetable] and purified water are Cleared. Counted Limited tokens: none. The five flowers are the actives and are not graded. This spray does not include White Chestnut. It is not the Sleep Kids spray.';
const NOTE_SPRAY =
  'The Sleep formula includes White Chestnut. White Chestnut is an active and is not graded. Counted Limited token: Alcohol. That is one, so this is not a 3+ stack. This is the 20 mL alcohol Sleep spray. It is not a glycerin dropper. The 7 mL variant on this page is price $0 and is not this row.';
const NOTE_7 =
  'Counted Limited token: Alcohol. That is one, so this is not a 3+ stack. This is the 7 mL alcohol spray. It is not bach-b280-rescue-dropper-10. The 20 mL variant on this page is price $0 and is not this row.';
const NOTE_VEG =
  'Counted Limited token: Rice Extract. That is one, so this is not a 3+ stack. Capsule (Vegetable Cellulose and Water) is Cleared and does not stack. The facts image says 60 servings of 2 capsules, which is this 120-count. The image file name says 90caps. The facts image was graded.';
const NOTE_MAG =
  'Counted Limited token: goMCT®. That is one, so this is not a 3+ stack. Gum Acacia and Glucono Delta Lactone are Cleared and do not stack. The panel prints goMCT® (Medium Chain Triglycerides, Gum Acacia). The parenthesis medium chain triglycerides is the same goMCT® ingredient, not a second Limited token. Gum Acacia is named in that parenthesis and is stored on its own Cleared row.';

function glycerinWater(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Glycerin [vegetable]', 'cleared', 'glycerin'),
    flag(panel, 'Purified Water', 'cleared', 'water'),
  ];
}

export const BATCH296_KYR6D_T97U: RatingRecord[] = [
  row({
    id: 'bach-b296-rescue-sleep-dropper-20',
    productName: 'Bach RESCUE Sleep Dropper (20 mL)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b296-rescue-sleep-dropper-20',
    form: 'liquid drops',
    minAge: 2,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: [...FLOWERS, CHESTNUT],
    inactiveIngredients: glycerinWater(PSLEEP),
    verdict: 'clean',
    honestNote: NOTE_SLEEP,
    sourcesGeneral: [
      't97u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-sleep-dropper-20ml lists the 20 mL at $23.99 and in stock. SKU 3003216. The barcode field is empty. Ages 2 and up. Add 4 drops. About 130 doses. Children under 2: ask a doctor. Active ingredients include White Chestnut (Aesculus hippocastanum) 5X HPUS. The Sleep formula includes White Chestnut. It is an active and is not graded. Inactive ingredients: Glycerin [vegetable], purified water. Counted Limited tokens: none. Made in an FDA-registered facility. Missing UPC. No code was invented. Not bach-b295-rescue-sleep-kids-dropper-10.',
    ],
  }),
  row({
    id: 'bach-b296-rescue-sleep-kids-spray-20',
    productName: 'Bach RESCUE Sleep Kids Spray (20 mL)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b296-rescue-sleep-kids-spray-20',
    form: 'spray',
    audience: KIDS,
    minAge: 2,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: [...FLOWERS, CHESTNUT],
    inactiveIngredients: glycerinWater(PKIDS_SPRAY),
    verdict: 'clean',
    honestNote: NOTE_KIDS_SPRAY,
    sourcesGeneral: [
      't97u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-sleep-kids-spray-20ml lists the 20 mL at $19.99 and in stock. SKU 3005917. The barcode field is empty. Ages 2 and up. Apply 2 sprays on the tongue. Do not spray into the throat or eyes. Children under 2: ask a doctor. Active ingredients include White Chestnut (Aesculus hippocastanum) 5X HPUS. The Sleep formula includes White Chestnut. It is an active and is not graded. Inactive ingredients: Glycerin [vegetable], purified water. Counted Limited tokens: none. Missing UPC. No code was invented. Not the 10 mL Sleep Kids dropper. Not the non-sleep Kids spray.',
    ],
  }),
  row({
    id: 'bach-b296-rescue-kids-spray-20',
    productName: 'Bach RESCUE Kids Spray (20 mL)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b296-rescue-kids-spray-20',
    form: 'spray',
    audience: KIDS,
    minAge: 2,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: FLOWERS,
    inactiveIngredients: glycerinWater(PKIDS),
    verdict: 'clean',
    honestNote: NOTE_KIDS,
    sourcesGeneral: [
      't97u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-kids-spray-20ml lists the 20 mL at $19.99 and in stock. SKU 3005916. The barcode field is empty. Apply 2 sprays on the tongue. Do not spray into the throat or eyes. Inactive ingredients: Glycerin [vegetable], purified water. The five flowers are the actives, each 5X HPUS, and are not graded. This spray does not include White Chestnut. Counted Limited tokens: none. Missing UPC. No code was invented. Not the Sleep Kids spray.',
    ],
  }),
  row({
    id: 'bach-b296-rescue-sleep-spray-20',
    productName: 'Bach RESCUE Sleep Spray (20 mL)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b296-rescue-sleep-spray-20',
    form: 'spray',
    minAge: 12,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: [...FLOWERS, CHESTNUT],
    inactiveIngredients: [flag(PSPRAY, 'Alcohol', 'limited', 'alcohol')],
    verdict: 'caution',
    honestNote: NOTE_SPRAY,
    sourcesGeneral: [
      't97u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-sleep-r-spray lists the 20 mL at $23.99 and in stock. SKU BF01449. The barcode field prints the string 5.00E+12. That is not a 12-digit UPC and it was not attached. The 7 mL variant on the same page is price $0 and is not this row. Adults: apply 2 sprays onto the tongue. Children under 12: ask a doctor. About 190 doses in 20 mL. Active ingredients include White Chestnut (Aesculus hippocastanum) 5X HPUS. The Sleep formula includes White Chestnut. It is an active and is not graded. Inactive ingredients: Alcohol. Counted Limited token: Alcohol. That is one, so this is not a 3+ stack. Missing UPC. No code was invented. Not a glycerin dropper.',
    ],
  }),
  row({
    id: 'bach-b296-rescue-spray-7',
    productName: 'Bach RESCUE Remedy Spray (7 mL)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b296-rescue-spray-7',
    form: 'spray',
    minAge: 12,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: FLOWERS,
    inactiveIngredients: [flag(P7, 'Alcohol', 'limited', 'alcohol')],
    verdict: 'caution',
    honestNote: NOTE_7,
    sourcesGeneral: [
      't97u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/us-rescue-remedy-spray-7ml lists the 7 mL at $15.99 and in stock. SKU BF01397. The barcode field prints the string 5.00E+12. That is not a 12-digit UPC and it was not attached. The 20 mL variant on the same page is price $0 and is not this row. Adults: apply 2 sprays onto the tongue. Children under 12: ask a doctor. About 75 doses in 7 mL. Inactive ingredient: Alcohol. The five flowers are the actives, each 5X HPUS, and are not graded. Counted Limited token: Alcohol. That is one, so this is not a 3+ stack. Missing UPC. No code was invented. Not bach-b280-rescue-dropper-10.',
    ],
  }),
  row({
    id: 'bioptimizers-b296-vegzymes-120',
    productName: 'BiOptimizers VegZymes (120 capsules)',
    brand: 'BiOptimizers',
    category: 'Digestive',
    formulaId: 'bioptimizers-b296-vegzymes-120',
    form: 'capsule',
    productType: 'Supplement',
    barcode: '689176916614',
    activeIngredients: [
      { name: 'Enzyme Blend', strength: '68.58 mg' },
      { name: 'Protease Blend', strength: '33.56 mg' },
      { name: 'Lipase Blend', strength: '20 mg' },
      { name: 'AstraZyme®', strength: '35 mg' },
      { name: 'InnoSlim®', strength: '45 mg' },
      { name: 'Betaine HCL', strength: '10 mg' },
    ],
    inactiveIngredients: [
      flag(PVEG, 'Rice Extract', 'limited', 'rice'),
      flag(PVEG, 'Capsule (Vegetable Cellulose and Water)', 'cleared', 'capsule'),
    ],
    verdict: 'caution',
    honestNote: NOTE_VEG,
    sourcesGeneral: [
      't97u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/vegzymes lists 120 capsules at $37.99 and in stock. SKU 4266-VGZYM120. The variant barcode field prints 0689176916614. The last 12 digits pass the UPC-A check digit. UPC 689176916614. The carousel ingredients image is the panel. Serving size 2 capsules. Servings per container 60. That is 120 capsules. The image file name says 90caps. The facts image was graded. Other ingredients: Rice Extract, Capsule (Vegetable Cellulose and Water). The enzyme blends, AstraZyme, InnoSlim, and Betaine HCL are the actives and are not graded. Counted Limited token: Rice Extract. That is one, so this is not a 3+ stack. Capsule (Vegetable Cellulose and Water) is Cleared and does not stack.',
    ],
  }),
  row({
    id: 'bioptimizers-b296-mag-drink-unflavored-30',
    productName: 'BiOptimizers Magnesium Breakthrough Drink Unflavored (30 servings)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b296-mag-drink-unflavored-30',
    form: 'powder',
    productType: 'Supplement',
    barcode: '850018116565',
    activeIngredients: [
      {
        name: 'Magnesium (as magnesium chelate, magnesium carbonate, magnesium bisglycinate, magnesium taurate, Sucrosomial® magnesium (magnesium oxide), magnesium malate, magnesium orotate, magnesium citrate)',
        strength: '325 mg',
      },
    ],
    inactiveIngredients: [
      flag(PMAG, 'goMCT®', 'limited', 'gomct'),
      flag(PMAG, 'Gum Acacia', 'cleared', 'acacia'),
      flag(PMAG, 'Glucono Delta Lactone', 'cleared', 'lactone'),
    ],
    verdict: 'caution',
    honestNote: NOTE_MAG,
    sourcesGeneral: [
      't97u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/magnesium-breakthrough-drink lists 30 servings / Unflavored at $39.99 and in stock. SKU 1087-MGDRUNFLV. The variant barcode field prints 0850018116565. The last 12 digits pass the UPC-A check digit. UPC 850018116565. The Unflavored supplement-facts image is the panel. Serving size 1 scoop (2.13 g). Servings per container 30. Magnesium 325 mg is the active and is not graded. Other ingredients: goMCT® (Medium Chain Triglycerides, Gum Acacia), Glucono Delta Lactone. goMCT® is the t49u Limited lock. The parenthesis medium chain triglycerides is that same ingredient, not a second Limited token. Gum Acacia is Cleared. Glucono Delta Lactone is the t51u Cleared lock. Counted Limited token: goMCT®. That is one, so this is not a 3+ stack. Not the capsule. Not Tart Cherry, Raspberry Lemonade, or Fruit Punch. Those three flavors stay held.',
    ],
  }),
];

const ROWS = BATCH296_KYR6D_T97U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: string; barcode: string }> = {
  'bach-b296-rescue-sleep-dropper-20': { verdict: 'clean', cause: 'clean', counted: '', note: NOTE_SLEEP, barcode: '' },
  'bach-b296-rescue-sleep-kids-spray-20': { verdict: 'clean', cause: 'clean', counted: '', note: NOTE_KIDS_SPRAY, barcode: '' },
  'bach-b296-rescue-kids-spray-20': { verdict: 'clean', cause: 'clean', counted: '', note: NOTE_KIDS, barcode: '' },
  'bach-b296-rescue-sleep-spray-20': { verdict: 'caution', cause: 'limited_1_2', counted: 'Alcohol', note: NOTE_SPRAY, barcode: '' },
  'bach-b296-rescue-spray-7': { verdict: 'caution', cause: 'limited_1_2', counted: 'Alcohol', note: NOTE_7, barcode: '' },
  'bioptimizers-b296-vegzymes-120': { verdict: 'caution', cause: 'limited_1_2', counted: 'Rice Extract', note: NOTE_VEG, barcode: '689176916614' },
  'bioptimizers-b296-mag-drink-unflavored-30': { verdict: 'caution', cause: 'limited_1_2', counted: 'goMCT®', note: NOTE_MAG, barcode: '850018116565' },
};

if (ROWS.length !== 7) throw new Error(`batch296 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch296 unexpected id ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || mapped.verdict !== expected.verdict) {
    throw new Error(`batch296 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${mapped.verdict}`);
  }
  const counted = mapped.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch296 stack ${record.id} ${counted}`);
  if ((mapped.honestNote ?? '') !== expected.note) throw new Error(`batch296 note ${record.id} ${JSON.stringify(mapped.honestNote)}`);
  if ((mapped.barcode ?? '') !== expected.barcode) throw new Error(`batch296 upc ${record.id} ${mapped.barcode}`);
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  if (formNote && !expected.note.startsWith(formNote)) throw new Error(`batch296 form note ${record.id} ${formNote}`);
  if (stackNote && !expected.note.includes(stackNote)) throw new Error(`batch296 stack note ${record.id} ${stackNote}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch296 blank why ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list/i.test(why) || /is on the Limited list/i.test(why)) {
      throw new Error(`batch296 generic why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
