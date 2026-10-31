// DRAFT / not verified / batch 327 KYR6-e (t130e).
// Natural Stacks brand supplement-facts images are the source.
// The Sprouts section is not edited. Natural Stacks is not closed.
// Ids: naturalstacks-b327-

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

const CITRIC = 'Methodology §5 Cleared (citric acid).';
const MALIC = 'Methodology §5 Cleared (malic acid).';
const NF = 'Methodology §5 Limited (natural flavors, t54u natural-flavor rule). Counts toward the t137u stack.';
const SIO2 = 'Methodology §5 Caution (silicon dioxide cap). Does not count toward the t137u stack.';
const HYPRO = 'Methodology §5 Cleared (hypromellose capsule).';
const MCC = 'Methodology §5 Cleared (microcrystalline cellulose).';
const MAGST = 'Methodology §5 Cleared (magnesium stearate).';
const ASC = 'Methodology §5 Cleared (ascorbyl palmitate).';
const MONK = 'Methodology §5 Cleared (monk fruit extract).';
const STEVIA = 'Methodology §5 Limited (stevia — founder lock t158u). Counts toward the t137u stack.';
const STEVIA_EX = 'Methodology §5 Limited (stevia leaf extract — founder lock t159u). Counts toward the t137u stack.';
const STEVIOL_1 = 'Methodology §5 Caution (steviol glycoside, singular — founder lock t106u). Does not count toward the t137u stack.';
const REBM = 'Methodology §5 Cleared (Rebaudioside M).';
const SPIR_FOR = 'Methodology §5 Cleared (Spirulina Extract (for color) — founder lock t130e). Does not count toward the t137u stack.';
const TURM = 'Methodology §5 Cleared (turmeric for color).';
const SPIR_COLOR = 'Methodology §5 Cleared (spirulina color).';
const CARROT = 'Methodology §5 Cleared (carrot color).';
const SUGAR = 'Methodology §5 Cleared (cane sugar).';
const TAP = 'Methodology §5 Cleared (tapioca syrup).';
const WATER = 'Methodology §5 Cleared (water).';
const PECTIN = 'Methodology §5 Cleared (pectin).';
const CITRATE = 'Methodology §5 Cleared (potassium citrate).';
const CARNAUBA = 'Methodology §5 Cleared (carnauba wax, t133u).';
const MANN = 'Methodology §5 Caution (mannitol, swallowed sugar alcohol). Does not count toward the t137u stack.';
const STEARIC = 'Methodology §5 Caution (stearic acid). Does not count toward the t137u stack.';
const CALSIL = 'Methodology §5 Caution (calcium silicate). Does not count toward the t137u stack.';
const VEGCAP = 'Methodology §5 Cleared (vegetable cellulose capsule, t130u unnamed rule).';
const VEGCAP_H = 'Methodology §5 Cleared (vegetable capsule, hypromellose).';
const RBW = 'Methodology §5 Cleared (rice bran wax).';

const COATING_NOTE =
  'The printed token Vegetable Oil & Carnauba Wax (coating) is graded by the existing carnauba why, so it is Cleared and is not split into a separate vegetable-oil grade.';
const REBM_NOTE =
  'Rebaudioside M (Stevia Leaf Extract) is the Cleared Rebaudioside M row. The ingredient tab sentence calls it a stevia extract that is not the high-purity steviol glycoside. That sentence is not Limited Stevia Leaf Extract, and this token does not count.';

type Ing = readonly [string, RiskLevel, string];

function pack(args: {
  id: string;
  productName: string;
  form: string;
  barcode: string;
  url: string;
  price: string;
  sku: string;
  serving: string;
  oi: string;
  ings: readonly Ing[];
  note?: string;
  extra?: string;
}): RatingRecord {
  const panel = `Natural Stacks facts image. ${args.productName}.`;
  const upc = args.barcode
    ? `UPC ${args.barcode}.`
    : 'No UPC was printed on the facts image. Missing UPC.';
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Natural Stacks',
    category: 'Vitamins',
    formulaId: args.id,
    form: args.form,
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Natural Stacks'],
    barcode: args.barcode,
    activeIngredients: [{ name: args.productName }],
    inactiveIngredients: args.ings.map(([name, level, src]) => flag(panel, name, level, src)),
    verdict: 'caution',
    honestNote: args.note ?? '',
    sourcesGeneral: [
      `t130e. Natural Stacks brand page ${args.url} lists this pack at $${args.price} and in stock. SKU ${args.sku}. The facts image other ingredients: ${args.oi}. Serving size on the image: ${args.serving}. ${upc} The supplement-facts actives are not graded. ${args.extra ?? ''}No code was invented.`,
    ],
  });
}

const CAP = (name: string): Ing => [name, 'cleared', HYPRO];
const SIO = (name: string): Ing => [name, 'moderate', SIO2];
const CELL = (name: string): Ing => [name, 'cleared', MCC];
const PALM = (name: string): Ing => [name, 'cleared', ASC];
const MST = (name: string): Ing => [name, 'cleared', MAGST];

export const BATCH327_KYR6E_T130E: RatingRecord[] = [
  pack({
    id: 'naturalstacks-b327-hydrate-creatine-lemonlime',
    productName: 'Natural Stacks MagTech Hydrate + Creatine, Lemon Lime (14 sticks)',
    form: 'powder',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/magtech-hydrate-creatine',
    price: '29.95',
    sku: 'MAGSP-HYDRCREA-14',
    serving: '1 Stick Pack (10.1 g). Servings per container 14.',
    oi: 'Citric Acid, Natural Flavors, Silica, Rebaudioside M (Stevia Leaf Extract), Organic Monk Fruit Extract, Spirulina Extract (for color), Turmeric Extract (for color)',
    ings: [
      ['Citric Acid', 'cleared', CITRIC],
      ['Natural Flavors', 'limited', NF],
      ['Silica', 'moderate', SIO2],
      ['Rebaudioside M (Stevia Leaf Extract)', 'cleared', REBM],
      ['Organic Monk Fruit Extract', 'cleared', MONK],
      ['Spirulina Extract (for color)', 'cleared', SPIR_FOR],
      ['Turmeric Extract (for color)', 'cleared', TURM],
    ],
    note: REBM_NOTE,
    extra: 'This is the Lemon Lime facts image on that page. It is not the Watermelon Lime stick. ',
  }),
  pack({
    id: 'naturalstacks-b327-sleep-drink',
    productName: 'Natural Stacks MagTech Sleep Drink (14 sticks)',
    form: 'powder',
    barcode: '850038130947',
    url: 'https://www.naturalstacks.com/products/magtech-sleep-drink',
    price: '29.95',
    sku: 'MAGSP-SLEEP-14',
    serving: '1 Stick Pack (7.8 g). Servings per container 14.',
    oi: 'Malic Acid, Natural Flavors, Spirulina Extract (for color), Citric Acid, Organic Monk Fruit Extract, Stevia, Silica',
    ings: [
      ['Malic Acid', 'cleared', MALIC],
      ['Natural Flavors', 'limited', NF],
      ['Spirulina Extract (for color)', 'cleared', SPIR_FOR],
      ['Citric Acid', 'cleared', CITRIC],
      ['Organic Monk Fruit Extract', 'cleared', MONK],
      ['Stevia', 'limited', STEVIA],
      ['Silica', 'moderate', SIO2],
    ],
    extra: 'UPC 850038130947 is the code on the pouch photo. ',
  }),
  pack({
    id: 'naturalstacks-b327-cognition-drink',
    productName: 'Natural Stacks MagTech Cognition Drink (14 sticks)',
    form: 'powder',
    barcode: '850038130930',
    url: 'https://www.naturalstacks.com/products/magtech-cognition-drink',
    price: '29.95',
    sku: 'MAGSP-COG-14',
    serving: '1 Stick Pack (5.3 g). Servings per container 14.',
    oi: 'Malic Acid, Citric Acid, Natural Flavors, Organic Monk Fruit Extract, Stevia, Silica',
    ings: [
      ['Malic Acid', 'cleared', MALIC],
      ['Citric Acid', 'cleared', CITRIC],
      ['Natural Flavors', 'limited', NF],
      ['Organic Monk Fruit Extract', 'cleared', MONK],
      ['Stevia', 'limited', STEVIA],
      ['Silica', 'moderate', SIO2],
    ],
    extra: 'UPC 850038130930 is the code on the pouch photo. ',
  }),
  pack({
    id: 'naturalstacks-b327-sleep-gummies-30',
    productName: 'Natural Stacks Sleep Magnesium Gummies (30 gummies)',
    form: 'gummy',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/sleep-magnesium-gummies-30ct',
    price: '16.95',
    sku: 'MAGSLEEP-30',
    serving: '2 Gummies. Servings per container 15.',
    oi: 'Organic Tapioca Syrup, Organic Cane Sugar, Water, Potassium Citrate, Pectin, Natural Flavors, Black Carrot (color), Citric Acid, Malic Acid, Vegetable Oil & Carnauba Wax (coating)',
    ings: [
      ['Organic Tapioca Syrup', 'cleared', TAP],
      ['Organic Cane Sugar', 'cleared', SUGAR],
      ['Water', 'cleared', WATER],
      ['Potassium Citrate', 'cleared', CITRATE],
      ['Pectin', 'cleared', PECTIN],
      ['Natural Flavors', 'limited', NF],
      ['Black Carrot (color)', 'cleared', CARROT],
      ['Citric Acid', 'cleared', CITRIC],
      ['Malic Acid', 'cleared', MALIC],
      ['Vegetable Oil & Carnauba Wax (coating)', 'cleared', CARNAUBA],
    ],
    note: COATING_NOTE,
    extra: 'This is the 30-gummy jar. It is not the 60-count page. ',
  }),
  pack({
    id: 'naturalstacks-b327-mood-gummies-30',
    productName: 'Natural Stacks Mood Magnesium Gummies (30 gummies)',
    form: 'gummy',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/zen-magnesium-gummies-30ct',
    price: '16.95',
    sku: 'MAGZEN-30',
    serving: '2 Gummies. Servings per container 15.',
    oi: 'Organic Tapioca Syrup, Organic Cane Sugar, Water, Potassium Citrate, Spirulina Extract (color) and Turmeric (color), Natural Flavors, Pectin, Citric Acid, Malic Acid, Vegetable Oil & Carnauba Wax (coating)',
    ings: [
      ['Organic Tapioca Syrup', 'cleared', TAP],
      ['Organic Cane Sugar', 'cleared', SUGAR],
      ['Water', 'cleared', WATER],
      ['Potassium Citrate', 'cleared', CITRATE],
      ['Spirulina Extract (color)', 'cleared', SPIR_COLOR],
      ['Turmeric (color)', 'cleared', TURM],
      ['Natural Flavors', 'limited', NF],
      ['Pectin', 'cleared', PECTIN],
      ['Citric Acid', 'cleared', CITRIC],
      ['Malic Acid', 'cleared', MALIC],
      ['Vegetable Oil & Carnauba Wax (coating)', 'cleared', CARNAUBA],
    ],
    note: COATING_NOTE,
    extra:
      'The facts image joins Spirulina Extract (color) and Turmeric (color) with the word and. Each color is its own token. This is the 30-gummy jar. It is not the 60-count page. ',
  }),
  pack({
    id: 'naturalstacks-b327-mood-bites-30',
    productName: 'Natural Stacks Mood Bites, Citrus Peach (30 pieces)',
    form: 'lozenge',
    barcode: '850038130749',
    url: 'https://www.naturalstacks.com/products/mood-bites',
    price: '19.95',
    sku: 'MOODBITES-30',
    serving: '1 Piece. Servings per container 30.',
    oi: 'Mannitol, Stearic Acid, Natural Flavors, Silicon Dioxide, Magnesium Stearate, Stevia Extract, Steviol Glycoside, Citric Acid, Malic Acid',
    ings: [
      ['Mannitol', 'moderate', MANN],
      ['Stearic Acid', 'moderate', STEARIC],
      ['Natural Flavors', 'limited', NF],
      ['Silicon Dioxide', 'moderate', SIO2],
      ['Magnesium Stearate', 'cleared', MAGST],
      ['Stevia Extract', 'limited', STEVIA_EX],
      ['Steviol Glycoside', 'moderate', STEVIOL_1],
      ['Citric Acid', 'cleared', CITRIC],
      ['Malic Acid', 'cleared', MALIC],
    ],
    extra: 'UPC 850038130749 is the code on the bottle photo. Steviol Glycoside is the singular token. ',
  }),
  pack({
    id: 'naturalstacks-b327-acetylcholine-60',
    productName: 'Natural Stacks Acetylcholine Brain Food (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/acetylcholine',
    price: '39.95',
    sku: 'ACBF-60',
    serving: '3 Capsules. Servings per container 20.',
    oi: 'Hypromellose (Capsule), Magnesium Stearate, Silicon Dioxide, Microcrystalline Cellulose',
    ings: [CAP('Hypromellose (Capsule)'), MST('Magnesium Stearate'), SIO('Silicon Dioxide'), CELL('Microcrystalline Cellulose')],
  }),
  pack({
    id: 'naturalstacks-b327-neuroalert-60',
    productName: 'Natural Stacks NeuroAlert (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/neuroalert',
    price: '34.95',
    sku: 'NALERT-60',
    serving: '2 Capsules. Servings per container 30.',
    oi: 'Hypromellose (Capsule), Ascorbyl Palmitate, Silicon Dioxide, Microcrystalline Cellulose',
    ings: [CAP('Hypromellose (Capsule)'), PALM('Ascorbyl Palmitate'), SIO('Silicon Dioxide'), CELL('Microcrystalline Cellulose')],
  }),
  pack({
    id: 'naturalstacks-b327-vitamind3-60',
    productName: 'Natural Stacks Smart Vitamin D3 (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/smart-vitamind3',
    price: '24.95',
    sku: 'SMVD3-60',
    serving: '1 Capsule. Servings per container 60.',
    oi: 'Hypromellose (Capsule), Microcrystalline Cellulose, Silicon Dioxide, Ascorbyl Palmitate',
    ings: [CAP('Hypromellose (Capsule)'), CELL('Microcrystalline Cellulose'), SIO('Silicon Dioxide'), PALM('Ascorbyl Palmitate')],
  }),
  pack({
    id: 'naturalstacks-b327-dopamine-60',
    productName: 'Natural Stacks Dopamine Brain Food (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/dopamine',
    price: '39.95',
    sku: 'DPBF-60',
    serving: '3 Capsules. Servings per container 20.',
    oi: 'Hypromellose (Capsule), Ascorbyl Palmitate, Silica',
    ings: [CAP('Hypromellose (Capsule)'), PALM('Ascorbyl Palmitate'), SIO('Silica')],
    extra:
      'The single product page is in stock and does not put a facts image in its gallery. The facts image Dopamine_Supfacts_61022_1.png is on https://www.naturalstacks.com/products/dopamine-brain-food-2-pack and on the Brain Food Box. The 2-pack is not a row. ',
  }),
  pack({
    id: 'naturalstacks-b327-neurofuel-60',
    productName: 'Natural Stacks NEUROFUEL Nootropic with Zembrin (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/neurofuel-nootropic-w-zembrin',
    price: '34.95',
    sku: 'NFUEL-60',
    serving: '2 Capsules. Servings per container 30.',
    oi: 'Hypromellose (Capsule), Rice Bran Wax, Microcrystalline Cellulose, Ascorbyl Palmitate, Silicon Dioxide',
    ings: [
      CAP('Hypromellose (Capsule)'),
      ['Rice Bran Wax', 'cleared', RBW],
      CELL('Microcrystalline Cellulose'),
      PALM('Ascorbyl Palmitate'),
      SIO('Silicon Dioxide'),
    ],
  }),
  pack({
    id: 'naturalstacks-b327-gaba-60',
    productName: 'Natural Stacks GABA Brain Food (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/gaba',
    price: '39.95',
    sku: 'GABF-60',
    serving: '3 Capsules. Servings per container 20.',
    oi: 'Hypromellose (Capsule), Silicon Dioxide, Ascorbyl Palmitate',
    ings: [CAP('Hypromellose (Capsule)'), SIO('Silicon Dioxide'), PALM('Ascorbyl Palmitate')],
    extra: 'This is the other-ingredients line on Gaba_Sups.png in the product gallery. ',
  }),
  pack({
    id: 'naturalstacks-b327-magtech-180',
    productName: 'Natural Stacks MagTech Magnesium (180 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/magtech-magnesium-180ct',
    price: '64.95',
    sku: 'MAGT-180',
    serving: '3 Capsules. Servings per container 60.',
    oi: 'Hypromellose (Capsule), Silica, Microcrystalline Cellulose, Ascorbyl Palmitate',
    ings: [CAP('Hypromellose (Capsule)'), SIO('Silica'), CELL('Microcrystalline Cellulose'), PALM('Ascorbyl Palmitate')],
  }),
  pack({
    id: 'naturalstacks-b327-magtech-90',
    productName: 'Natural Stacks MagTech Magnesium (90 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/magtech',
    price: '36.95',
    sku: 'MAGT-90',
    serving: '3 Capsules. Servings per container 30.',
    oi: 'Hypromellose (Capsule), Silica, Microcrystalline Cellulose, Ascorbyl Palmitate',
    ings: [CAP('Hypromellose (Capsule)'), SIO('Silica'), CELL('Microcrystalline Cellulose'), PALM('Ascorbyl Palmitate')],
    extra:
      'The bottle photo on this page is the panel. https://www.naturalstacks.com/products/magtech-magnesium-special-offer is the same SKU MAGT-90 and is not a second row. The 180-capsule bottle is naturalstacks-b327-magtech-180. ',
  }),
  pack({
    id: 'naturalstacks-b327-neuromulti-30',
    productName: 'Natural Stacks NeuroMulti (30 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/neuromulti',
    price: '34.95',
    sku: 'NMULTI-30',
    serving: '1 Capsule. Servings per container 30.',
    oi: 'Hypromellose (Capsule), Ascorbyl Palmitate, Silicon Dioxide',
    ings: [CAP('Hypromellose (Capsule)'), PALM('Ascorbyl Palmitate'), SIO('Silicon Dioxide')],
    extra: 'Contains: Soy is the allergen line after the other-ingredients period. It is not graded as an other ingredient. ',
  }),
  pack({
    id: 'naturalstacks-b327-smart-omegas-30',
    productName: 'Natural Stacks Smart Omegas (30 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/smart-omegas',
    price: '39.95',
    sku: 'SMARTOMEGAS-30',
    serving: '1 Capsule. Servings per container 30.',
    oi: 'Hypromellose (Capsule), Microcrystalline Cellulose, Silicon Dioxide, Ascorbyl Palmitate',
    ings: [CAP('Hypromellose (Capsule)'), CELL('Microcrystalline Cellulose'), SIO('Silicon Dioxide'), PALM('Ascorbyl Palmitate')],
  }),
  pack({
    id: 'naturalstacks-b327-resveratrol-60',
    productName: 'Natural Stacks Smart Resveratrol (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/resveratrol',
    price: '29.95',
    sku: 'RESVERA-60',
    serving: '1 Capsule. Servings per container 60.',
    oi: 'Vegetable Capsule (Hypromellose), Microcrystalline Cellulose, Silicon Dioxide, Magnesium Stearate, Stearic Acid',
    ings: [
      ['Vegetable Capsule (Hypromellose)', 'cleared', VEGCAP_H],
      CELL('Microcrystalline Cellulose'),
      SIO('Silicon Dioxide'),
      MST('Magnesium Stearate'),
      ['Stearic Acid', 'moderate', STEARIC],
    ],
  }),
  pack({
    id: 'naturalstacks-b327-serotonin-60',
    productName: 'Natural Stacks Serotonin Brain Food (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/serotonin',
    price: '39.95',
    sku: 'STBF-60',
    serving: '3 Capsules. Servings per container 20.',
    oi: 'Hypromellose (Capsule), Magnesium Stearate, Ascorbyl palmitate, Silica',
    ings: [CAP('Hypromellose (Capsule)'), MST('Magnesium Stearate'), PALM('Ascorbyl palmitate'), SIO('Silica')],
    extra:
      'This is SerotoninSups_824_1.png on the product page. The special-offer page is the same SKU STBF-60 and is not a second row. ',
  }),
  pack({
    id: 'naturalstacks-b327-cordyceps-60',
    productName: 'Natural Stacks Cordyceps+ (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/cordyceps',
    price: '24.95',
    sku: 'CORDYCEPS-60',
    serving: '2 Capsules. Servings per container 30.',
    oi: 'Hypromellose (Capsule), Silicon Dioxide, Ascorbyl Palmitate',
    ings: [CAP('Hypromellose (Capsule)'), SIO('Silicon Dioxide'), PALM('Ascorbyl Palmitate')],
  }),
  pack({
    id: 'naturalstacks-b327-nmn-60',
    productName: 'Natural Stacks Smart NMN (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/nmn',
    price: '29.95',
    sku: 'NMN-60',
    serving: '1 Capsule. Servings per container 60.',
    oi: 'Hypromellose (Capsule), Ascorbyl Palmitate, Silicon Dioxide',
    ings: [CAP('Hypromellose (Capsule)'), PALM('Ascorbyl Palmitate'), SIO('Silicon Dioxide')],
  }),
  pack({
    id: 'naturalstacks-b327-apigenin-120',
    productName: 'Natural Stacks Smart Apigenin (120 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/apigenin',
    price: '29.95',
    sku: 'APIGENIN-120',
    serving: '2 Capsules. Servings per container 60.',
    oi: 'Hypromellose (Capsule), Microcrystalline Cellulose, Magnesium Stearate, Silicon Dioxide',
    ings: [CAP('Hypromellose (Capsule)'), CELL('Microcrystalline Cellulose'), MST('Magnesium Stearate'), SIO('Silicon Dioxide')],
  }),
  pack({
    id: 'naturalstacks-b327-creatine-120',
    productName: 'Natural Stacks Smart Creatine (120 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/creatine',
    price: '29.95',
    sku: 'CREATINE-120',
    serving: '4 Capsules. Servings per container 30.',
    oi: 'Hypromellose (Capsule), Silicon Dioxide, Ascorbyl Palmitate',
    ings: [CAP('Hypromellose (Capsule)'), SIO('Silicon Dioxide'), PALM('Ascorbyl Palmitate')],
  }),
  pack({
    id: 'naturalstacks-b327-lions-mane-60',
    productName: "Natural Stacks Smart Lion's Mane (60 capsules)",
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/lions-mane',
    price: '24.95',
    sku: 'LIONMANE-60',
    serving: '2 Capsules. Servings per container 30.',
    oi: 'Hypromellose, silica, magnesium stearate, and microcrystalline cellulose',
    ings: [CAP('Hypromellose'), SIO('silica'), MST('magnesium stearate'), CELL('microcrystalline cellulose')],
  }),
  pack({
    id: 'naturalstacks-b327-ginkgo-60',
    productName: 'Natural Stacks Smart Ginkgo (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/ginkgo',
    price: '24.95',
    sku: 'GINKGO-60',
    serving: '1 Capsule. Servings per container 60.',
    oi: 'Hypromellose, calcium silicate, silica, magnesium stearate, and microcrystalline cellulose',
    ings: [
      CAP('Hypromellose'),
      ['calcium silicate', 'moderate', CALSIL],
      SIO('silica'),
      MST('magnesium stearate'),
      CELL('microcrystalline cellulose'),
    ],
  }),
  pack({
    id: 'naturalstacks-b327-smart-caffeine-60',
    productName: 'Natural Stacks Smart Caffeine with L-Theanine (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/smart-caffeine',
    price: '19.95',
    sku: 'SMCAF-60',
    serving: '1 Capsule. Servings per container 60.',
    oi: 'Hypromellose (Capsule), Silicon Dioxide, Ascorbyl Palmitate, Microcrystalline Cellulose',
    ings: [CAP('Hypromellose (Capsule)'), SIO('Silicon Dioxide'), PALM('Ascorbyl Palmitate'), CELL('Microcrystalline Cellulose')],
    extra:
      'This row is the brand facts image Smartcaf_sups_1124_1.png. An iHerb listing and a Target listing print different capsule lines. Those lines are not this row. ',
  }),
  pack({
    id: 'naturalstacks-b327-neurolife-60',
    productName: 'Natural Stacks NEUROLIFE (60 capsules)',
    form: 'capsule',
    barcode: '',
    url: 'https://www.naturalstacks.com/products/neurolife',
    price: '34.95',
    sku: 'NLIFE-60',
    serving: '2 Capsules. Servings per container 30.',
    oi: 'Microcrystalline cellulose, vegetable capsule, stearic acid, magnesium stearate, calcium silicate',
    ings: [
      ['Microcrystalline cellulose', 'cleared', MCC],
      ['vegetable capsule', 'cleared', VEGCAP],
      ['stearic acid', 'moderate', STEARIC],
      ['magnesium stearate', 'cleared', MAGST],
      ['calcium silicate', 'moderate', CALSIL],
    ],
  }),
];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const digits = code.split('').map((d) => Number(d));
  const sum = digits.slice(0, 11).reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === digits[11];
}

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: number; barcode: string }> = {
  'naturalstacks-b327-hydrate-creatine-lemonlime': { verdict: 'caution', counted: 1, barcode: '' },
  'naturalstacks-b327-sleep-drink': { verdict: 'caution', counted: 2, barcode: '850038130947' },
  'naturalstacks-b327-cognition-drink': { verdict: 'caution', counted: 2, barcode: '850038130930' },
  'naturalstacks-b327-sleep-gummies-30': { verdict: 'caution', counted: 1, barcode: '' },
  'naturalstacks-b327-mood-gummies-30': { verdict: 'caution', counted: 1, barcode: '' },
  'naturalstacks-b327-mood-bites-30': { verdict: 'caution', counted: 2, barcode: '850038130749' },
  'naturalstacks-b327-acetylcholine-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-neuroalert-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-vitamind3-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-dopamine-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-neurofuel-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-gaba-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-magtech-180': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-magtech-90': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-neuromulti-30': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-smart-omegas-30': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-resveratrol-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-serotonin-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-cordyceps-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-nmn-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-apigenin-120': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-creatine-120': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-lions-mane-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-ginkgo-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-smart-caffeine-60': { verdict: 'caution', counted: 0, barcode: '' },
  'naturalstacks-b327-neurolife-60': { verdict: 'caution', counted: 0, barcode: '' },
};

const ROWS = BATCH327_KYR6E_T130E;
if (ROWS.length !== 26) throw new Error(`batch327 count ${ROWS.length}`);
const seen = new Set<string>();
for (const record of ROWS) {
  if (seen.has(record.id)) throw new Error(`batch327 duplicate ${record.id}`);
  seen.add(record.id);
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch327 unexpected ${record.id}`);
  if (record.verdict !== expected.verdict) throw new Error(`batch327 verdict ${record.id} ${record.verdict}`);
  if ((record.barcode ?? '') !== expected.barcode) throw new Error(`batch327 barcode ${record.id}`);
  if (record.barcode && !upcCheck(record.barcode)) throw new Error(`batch327 upc ${record.id} ${record.barcode}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== expected.counted) {
    throw new Error(`batch327 stack ${record.id} ${counted.map((item) => item.name).join(',')}`);
  }
  if (expected.counted >= 3 && !record.honestNote?.includes('t137u')) {
    throw new Error(`batch327 stack note ${record.id}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch327 blank ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch327 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
