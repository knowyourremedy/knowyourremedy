// DRAFT / not verified / batch 299 KYR6-d (t100u).
// Founder-verified panels. Amazon was not opened.
// Missing UPCs stay empty. No brand is closed. The Sprouts section is not edited.
// t100u requires a full honest note on every row and a specific why on every tab.

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
  alcohol27:
    'Methodology §5 Caution (27% alcohol — t100u, same lock as 27% grape alcohol solution, t98u). Does not count toward the t137u stack. Not the Limited Alcohol vehicle on the Rescue spray.',
  inulin: 'Methodology §5 Cleared (inulin / chicory root fiber).',
  iso:
    'Methodology §5 Limited (isomalto-oligosaccharides — t55u). Counts toward the t137u stack.',
  ribose:
    'Methodology §5 Caution (D-ribose — t51u). Does not count toward the t137u stack.',
  stevia: 'Methodology §5 Limited (stevia leaf extract — t159u). Counts toward the t137u stack.',
  vanilla:
    'Methodology §5 Caution (vanilla flavor — Sept 23, 2026). Does not count toward the t137u stack. Not natural vanilla flavor.',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate / mixed-tocopherols antioxidant).',
  gomct:
    'Methodology §5 Limited (goMCT® — branded medium-chain triglyceride, t49u). Counts toward the t137u stack. The parenthesis medium chain triglycerides is this same ingredient, not a second Limited token.',
  acacia: 'Methodology §5 Cleared (gum acacia / acacia gum).',
  sugar: 'Methodology §5 Caution (sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  cocoaButter: 'Methodology §5 Cleared (cocoa butter).',
  wholeMilk: 'Methodology §5 Cleared (whole milk powder — whole dry milk, Oct 15, 2026).',
  chocolate: 'Methodology §5 Cleared (unsweetened chocolate). Not cocoa powder and not cocoa extract.',
  nonfat:
    'Methodology §5 Limited (nonfat dry milk — Sept 21, 2026). Allergen disclosure, not High. Counts toward the t137u stack.',
  milkfat: 'Methodology §5 Cleared (milkfat — milk butterfat). Not a seed oil.',
  lecithin: 'Methodology §5 Cleared (soy lecithin).',
  vanillaEx: 'Methodology §5 Cleared (natural vanilla extract — t50u pure vanilla extract).',
  riceStarch:
    'Methodology §5 Cleared (rice starch — named simple starch). Not Organic Rice Starch.',
  dextrin: 'Methodology §5 Limited (tapioca dextrin — t141u). Counts toward the t137u stack.',
  wax: 'Methodology §5 Cleared (carnauba wax — t133u).',
  cocoaEx:
    'Methodology §5 Caution (cocoa extract — t100u). Not Cleared cocoa powder. Does not count toward the t137u stack.',
  juice: 'Methodology §5 Cleared (fruit and vegetable juice for color).',
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

const PMUST =
  't100u founder-verified panel. Bach Mustard 20 mL. Active: Mustard (Sinapis arvensis) 5X HPUS. Inactive: 27% alcohol.';
const PVAN =
  't100u founder-verified panel. BiOptimizers Microbiome Breakthrough Vegetarian Vanilla. Other ingredients: Organic Inulin, Isomalto-oligosaccharides, D-ribose, Stevia (leaf) Extract, Vanilla Flavor.';
const PMAG =
  't100u founder-verified panel. BiOptimizers Magnesium Breakthrough V4 30 capsules. Other ingredients match the written 60-count: Hypromellose (capsule), Ascorbyl Palmitate, Microcrystalline Cellulose, goMCT (medium chain triglycerides, gum acacia).';
const PCALM =
  't100u founder-verified panel. Good Day Chocolate Adult Calm 50 pieces. Other ingredients read from the founder panel.';

const NOTE_MUST =
  'The active is Mustard (Sinapis arvensis). It is not graded. 27% alcohol is Caution and does not stack. The founder graded that print with the existing t98u lock for 27% grape alcohol solution. Counted Limited tokens: none. This is not the Agrimony line that the US page text printed. It is not the Limited Alcohol on the Rescue spray.';
const NOTE_VAN =
  'Counted Limited tokens: Isomalto-oligosaccharides and Stevia (leaf) Extract. That is two, so this is not a 3+ stack. D-ribose and Vanilla Flavor are Caution and do not stack. Organic Inulin is Cleared. This is not the chocolate row. The chocolate other-ingredient line was not used.';
const NOTE_MAG =
  'Counted Limited token: goMCT®. That is one, so this is not a 3+ stack. The panel prints goMCT (medium chain triglycerides, gum acacia). The parenthesis medium chain triglycerides is the same goMCT® ingredient, not a second Limited token. Gum acacia is Cleared. Hypromellose (capsule), microcrystalline cellulose, and ascorbyl palmitate are Cleared. The founder confirmed this other-ingredient line matches the written 60-count. This is the 30-count. It is not bioptimizers-b288-mag-breakthrough-60.';
const NOTE_CALM =
  'Counted Limited tokens: Nonfat Dry Milk and Tapioca Dextrin. That is two, so this is not a 3+ stack. Sugar and Cocoa Extract are Caution and do not stack. Whole milk powder, unsweetened chocolate, milkfat, cocoa butter, soy lecithin, natural vanilla extract, rice starch, gum arabic, carnauba wax, and the fruit-juice color are Cleared. The milk-chocolate parenthesis is split and is not graded again as the wrapper name. Sugar inside that parenthesis and the separate Sugar are one token. Nonfat dry milk stays the Sept 21 Limited lock. Rice starch is not Organic Rice Starch.';

export const BATCH299_KYR6D_T100U: RatingRecord[] = [
  finish({
    id: 'bach-b299-mustard-20',
    productName: 'Bach Mustard (20 mL)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b299-mustard-20',
    form: 'liquid drops',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    retailers: ['Bach'],
    barcode: '',
    activeIngredients: [{ name: 'Mustard (Sinapis arvensis)', strength: '5X HPUS' }],
    inactiveIngredients: [flag(PMUST, '27% alcohol', 'moderate', 'alcohol27')],
    verdict: 'caution',
    honestNote: NOTE_MUST,
    sourcesGeneral: [
      't100u. Founder-verified panel and active. The US page title is Mustard and the bottle image says Mustard and contains 27% alcohol. The page text had printed Agrimony. The founder override uses Mustard (Sinapis arvensis) 5X HPUS and inactive 27% alcohol. https://www.nelsons.com/en-us/products/bach-r-mustard lists the 20 mL at $19.49 and in stock. SKU BF00611. The barcode field is empty. 27% alcohol is Caution under the existing t98u grape-alcohol-solution lock and does not stack. Counted Limited tokens: none. Missing UPC. No code was invented. Not bach-b297-agrimony-20.',
    ],
  }),
  finish({
    id: 'bioptimizers-b299-microbiome-vanilla-30',
    productName: 'BiOptimizers Microbiome Breakthrough Vegetarian Vanilla (30 servings)',
    brand: 'BiOptimizers',
    category: 'Digestive',
    formulaId: 'bioptimizers-b299-microbiome-vanilla-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['BiOptimizers'],
    barcode: '796029897409',
    activeIngredients: [
      { name: 'IgY Max (Hyperimmunized Egg Powder)' },
      { name: 'Lactobacillus Blend (L. rhamnosus, L. gasseri, L. helveticus)' },
    ],
    inactiveIngredients: [
      flag(PVAN, 'Organic Inulin', 'cleared', 'inulin'),
      flag(PVAN, 'Isomalto-oligosaccharides', 'limited', 'iso'),
      flag(PVAN, 'D-ribose', 'moderate', 'ribose'),
      flag(PVAN, 'Stevia (leaf) Extract', 'limited', 'stevia'),
      flag(PVAN, 'Vanilla Flavor', 'moderate', 'vanilla'),
    ],
    verdict: 'caution',
    honestNote: NOTE_VAN,
    sourcesGeneral: [
      't100u. Founder-verified other-ingredient line for Vegetarian Vanilla. Organic Inulin, Isomalto-oligosaccharides, D-ribose, Stevia (leaf) Extract, Vanilla Flavor. The chocolate line was not used. https://bioptimizers.com/products/microbiome-breakthrough lists 30 servings / Vegetarian Vanilla at $49.99 and in stock. SKU 2573-BBTNILLA. The variant barcode field prints 0796029897409. The last 12 digits pass the UPC-A check digit. UPC 796029897409. Counted Limited tokens: Isomalto-oligosaccharides and Stevia (leaf) Extract. That is two, so this is not a 3+ stack. D-ribose and Vanilla Flavor are Caution and do not stack. Not bioptimizers-b287-microbiome-choc-30.',
    ],
  }),
  finish({
    id: 'bioptimizers-b299-mag-breakthrough-30',
    productName: 'BiOptimizers Magnesium Breakthrough (30 capsules)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b288-mag-breakthrough-60',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['BiOptimizers'],
    barcode: '',
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
      flag(PMAG, 'Hypromellose (capsule)', 'cleared', 'hpmc'),
      flag(PMAG, 'Ascorbyl Palmitate', 'cleared', 'ascorbyl'),
      flag(PMAG, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PMAG, 'goMCT®', 'limited', 'gomct'),
      flag(PMAG, 'Gum Acacia', 'cleared', 'acacia'),
    ],
    verdict: 'caution',
    honestNote: NOTE_MAG,
    sourcesGeneral: [
      't100u. Founder-verified other-ingredient line for the V4 30-count. The founder confirms it matches the written 60-count. Hypromellose (capsule), Ascorbyl Palmitate, Microcrystalline Cellulose, goMCT (medium chain triglycerides, gum acacia). https://bioptimizers.com/products/magnesium-breakthrough-v4 lists 30 capsules at $22 and in stock. SKU 4283-MGBTV430. The barcode field is empty. The bottle front says 30 veggie caps and Version 4.2. Serving 2 capsules, so this bottle is 15 servings. Counted Limited token: goMCT®. That is one, so this is not a 3+ stack. The older cellulose, Nu-MAG, Nu-Flow, and silica panel was not used. The 60-count UPC was not copied. Missing UPC. No code was invented. Not bioptimizers-b288-mag-breakthrough-60.',
    ],
  }),
  finish({
    id: 'goodday-b299-calm-50',
    productName: 'Good Day Chocolate Adult Calm (50 pieces)',
    brand: 'Good Day Chocolate',
    category: 'Sleep',
    formulaId: 'goodday-b282-calm',
    form: 'chocolate',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Good Day Chocolate'],
    barcode: '858982004550',
    activeIngredients: [
      { name: 'Magnesium (as Magnesium Oxide)', strength: '40 mg' },
      { name: 'Proprietary Calm Blend (L-Theanine, Chamomile Flower Extract)', strength: '60 mg' },
    ],
    inactiveIngredients: [
      flag(PCALM, 'Sugar', 'moderate', 'sugar'),
      flag(PCALM, 'Cocoa Butter', 'cleared', 'cocoaButter'),
      flag(PCALM, 'Whole Milk Powder', 'cleared', 'wholeMilk'),
      flag(PCALM, 'Unsweetened Chocolate', 'cleared', 'chocolate'),
      flag(PCALM, 'Nonfat Dry Milk', 'limited', 'nonfat'),
      flag(PCALM, 'Milkfat', 'cleared', 'milkfat'),
      flag(PCALM, 'Soy Lecithin', 'cleared', 'lecithin'),
      flag(PCALM, 'Natural Vanilla Extract', 'cleared', 'vanillaEx'),
      flag(PCALM, 'Rice Starch', 'cleared', 'riceStarch'),
      flag(PCALM, 'Tapioca Dextrin', 'limited', 'dextrin'),
      flag(PCALM, 'Gum Arabic', 'cleared', 'acacia'),
      flag(PCALM, 'Carnauba Wax', 'cleared', 'wax'),
      flag(PCALM, 'Cocoa Extract', 'moderate', 'cocoaEx'),
      flag(PCALM, 'Colored with fruit juice and purple sweet potato juice color', 'cleared', 'juice'),
    ],
    verdict: 'caution',
    honestNote: NOTE_CALM,
    sourcesGeneral: [
      't100u. Founder-verified panel and UPC for the 50-piece Adult Calm. UPC 858982004550. The check digit passes. The brand page lists 50 pc at $19.95 and the product feed marks it available. Serving 4 pieces (14 g). Servings per container about 12. Other ingredients: Fair Trade Milk Chocolate (sugar, cocoa butter, whole milk powder, unsweetened chocolate, nonfat dry milk, milkfat, soy lecithin, natural vanilla extract), Sugar, Rice Starch, Tapioca Dextrin, Gum Arabic, Carnauba Wax, Cocoa Extract, Colored with fruit juice and purple sweet potato juice color. Counted Limited tokens: Nonfat Dry Milk and Tapioca Dextrin. That is two, so this is not a 3+ stack. The facts image that prints 20 servings and barcode 858982004116 is the written 80-count and was not used as this UPC. Not goodday-b282-calm-80. Not goodday-b282-calm-8.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: string; barcode: string }> = {
  'bach-b299-mustard-20': { verdict: 'caution', cause: 'moderate', counted: '', note: NOTE_MUST, barcode: '' },
  'bioptimizers-b299-microbiome-vanilla-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Isomalto-oligosaccharides|Stevia (leaf) Extract',
    note: NOTE_VAN,
    barcode: '796029897409',
  },
  'bioptimizers-b299-mag-breakthrough-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'goMCT®',
    note: NOTE_MAG,
    barcode: '',
  },
  'goodday-b299-calm-50': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Nonfat Dry Milk|Tapioca Dextrin',
    note: NOTE_CALM,
    barcode: '858982004550',
  },
};

const ROWS = BATCH299_KYR6D_T100U;
if (ROWS.length !== 4) throw new Error(`batch299 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch299 unexpected ${record.id}`);
  if (!record.honestNote || record.honestNote.trim().length < 40) throw new Error(`batch299 missing note ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || mapped.verdict !== expected.verdict) {
    throw new Error(`batch299 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${mapped.verdict}`);
  }
  const counted = mapped.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch299 stack ${record.id} ${counted}`);
  if ((mapped.honestNote ?? '') !== expected.note) throw new Error(`batch299 note ${record.id}`);
  if ((mapped.barcode ?? '') !== expected.barcode) throw new Error(`batch299 upc ${record.id}`);
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  if (formNote && !expected.note.startsWith(formNote)) throw new Error(`batch299 form ${record.id} ${formNote}`);
  if (stackNote && !expected.note.includes(stackNote)) throw new Error(`batch299 stack note ${record.id}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch299 blank why ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list/i.test(why) || /is on the Limited list/i.test(why)) {
      throw new Error(`batch299 generic why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
