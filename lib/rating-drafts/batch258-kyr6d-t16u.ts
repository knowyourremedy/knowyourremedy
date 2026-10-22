// DRAFT / not verified / batch 258 KYR6-d (t16u).
// Culturelle singles with a brand supplement-facts image and a Vitacost sale page.
// Does not repeat culturelle-digestive-daily (older maltodextrin formula) or any Florastor row.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — cellulose-family coating).',
  vegMag:
    'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  magStearate:
    'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  cellulose: 'Methodology §5 Cleared (cellulose — cellulose-family filler).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium — cellulose-family disintegrant).',
  dextrose: 'Methodology §5 Caution (bare dextrose — glucose-family sugar; does not count toward the t137u stack).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  sucrose: 'Methodology §5 Cleared (sucrose). Founder override Oct 17, 2026 t118u.',
  natFlavor:
    'Methodology §5 Caution (Natural flavor, singular — unnamed natural flavor; not the Limited natural flavors mixture).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — zero-point Caution cap; does not count toward the Limited stack).',
  yellow6:
    'Methodology §5 High-risk (FD&C Yellow No. 6 — synthetic dye; EU activity-and-attention warning).',
  riceMd:
    'Methodology §5 Limited (Rice maltodextrin — founder lock t16u Oct 22, 2026; counts toward the t137u stack). Not generic maltodextrin. Not tapioca maltodextrin.',
  natFlavors: 'Methodology §5 Limited (natural flavors — unnamed mixture; counts toward the t137u stack).',
  sunflowerDrop:
    'Methodology §5 Cleared (sunflower oil in an oral liquid drop — not the gummy seed-oil Avoid). The drop is not a gummy you chew.',
  riceBranDrop:
    'Methodology §5 Cleared (Rice bran oil in an oral liquid drop — founder lock t16u Oct 22, 2026). Gummy rice bran oil stays Avoid.',
  mctNamed:
    'Methodology §5 Cleared (medium-chain triglycerides from coconut and palm kernel oil — named plant source; not unlabeled MCT).',
  water: 'Methodology §5 Cleared (water / purified water).',
  tocopherol: 'Methodology §5 Cleared (mixed tocopherols — vitamin E antioxidant).',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_DD =
  'Culturelle brand supplement-facts image cul-dig-daily-caps-PDP-tiles-supplement-facts.webp (t16u). Vitacost sale page for the same count';
const PANEL_CHEW =
  'Culturelle brand supplement-facts image culturelle-digestive-daily-probiotic-chewables-supplement-facts.png (t16u). Vitacost sale page for the 24';
const PANEL_US =
  'Culturelle brand supplement-facts image culturelle-ultimate-strength-probiotic-capsules-supplement-facts.png (t16u). Vitacost sale page for the 30';
const PANEL_HW =
  'Culturelle brand supplement-facts image culturelle-health-and-wellness-capsules-supplement-facts.png (t16u). Vitacost sale page for the 30';
const PANEL_GAS =
  'Culturelle brand supplement-facts image Cult_Bloating-Gas_final_SuppFacts-2.png (t16u). Vitacost sale page for the 30';
const PANEL_CALM =
  'Culturelle brand supplement-facts image cul-baby-cc-drops-pdp-tiles-supplement-facts.webp (t16u). Vitacost sale page for the 0.29 fl oz';
const PANEL_IMMUNE =
  'Culturelle brand supplement-facts image cul-baby-ID-drops-tiles-supplement-facts.webp (t16u). Vitacost sale page for the 0.3 fl oz';
const PANEL_FIBER =
  'Culturelle brand supplement-facts image cul-kids-pro_fiber-packs-PDP-tiles-supplement-facts.webp (t16u). Vitacost sale page for this count';

const DD_FLAGS: IngredientFlag[] = [
  flag(PANEL_DD, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
  flag(PANEL_DD, 'Vegetable magnesium stearate', 'cleared', 'vegMag'),
  flag(PANEL_DD, 'Titanium dioxide (color)', 'high', 'tio2'),
];

const CHEW_FLAGS: IngredientFlag[] = [
  flag(PANEL_CHEW, 'Cellulose', 'cleared', 'cellulose'),
  flag(PANEL_CHEW, 'Croscarmellose sodium', 'cleared', 'croscarmellose'),
  flag(PANEL_CHEW, 'Dextrose', 'moderate', 'dextrose'),
  flag(PANEL_CHEW, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(PANEL_CHEW, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(PANEL_CHEW, 'Sucrose', 'cleared', 'sucrose'),
  flag(PANEL_CHEW, 'Vegetable magnesium stearate', 'cleared', 'vegMag'),
  flag(PANEL_CHEW, 'Natural flavor', 'moderate', 'natFlavor'),
  flag(PANEL_CHEW, 'Stearic acid', 'cleared', 'stearic'),
  flag(PANEL_CHEW, 'Silicon dioxide', 'moderate', 'silica'),
  flag(PANEL_CHEW, 'Titanium dioxide (color)', 'high', 'tio2'),
  flag(PANEL_CHEW, 'FD&C Yellow No. 6', 'high', 'yellow6'),
];

const US_FLAGS: IngredientFlag[] = [
  flag(PANEL_US, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
  flag(PANEL_US, 'Vegetable magnesium stearate', 'cleared', 'vegMag'),
  flag(PANEL_US, 'Titanium dioxide (color)', 'high', 'tio2'),
];

const HW_FLAGS: IngredientFlag[] = [
  flag(PANEL_HW, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(PANEL_HW, 'Hypromellose', 'cleared', 'hpmc'),
  flag(PANEL_HW, 'Sucrose', 'cleared', 'sucrose'),
  flag(PANEL_HW, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(PANEL_HW, 'Titanium dioxide (color)', 'high', 'tio2'),
];

const GAS_FLAGS: IngredientFlag[] = [
  flag(PANEL_GAS, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
  flag(PANEL_GAS, 'Rice maltodextrin', 'limited', 'riceMd'),
  flag(PANEL_GAS, 'Silicon dioxide', 'moderate', 'silica'),
];

const CALM_FLAGS: IngredientFlag[] = [
  flag(PANEL_CALM, 'Sunflower oil', 'cleared', 'sunflowerDrop'),
  flag(PANEL_CALM, 'Medium chain triglycerides (from coconut and palm kernel oil)', 'cleared', 'mctNamed'),
  flag(PANEL_CALM, 'Rice bran oil', 'cleared', 'riceBranDrop'),
];

const IMMUNE_FLAGS: IngredientFlag[] = [
  flag(PANEL_IMMUNE, 'Sunflower oil', 'cleared', 'sunflowerDrop'),
  flag(PANEL_IMMUNE, 'Medium chain triglycerides (from coconut and palm kernel oil)', 'cleared', 'mctNamed'),
  flag(PANEL_IMMUNE, 'Rice bran oil', 'cleared', 'riceBranDrop'),
  flag(PANEL_IMMUNE, 'Vitamin E (as d-alpha tocopherol)', 'cleared', 'tocopherol'),
  flag(PANEL_IMMUNE, 'Citric acid', 'cleared', 'citric'),
];

const FIBER_FLAGS: IngredientFlag[] = [
  flag(PANEL_FIBER, 'Sucrose', 'cleared', 'sucrose'),
  flag(PANEL_FIBER, 'Natural flavors', 'limited', 'natFlavors'),
];

function dropNote(flags: IngredientFlag[], productName: string): string | undefined {
  return (
    contradictionHonestNote({
      id: 'note',
      productName,
      brand: 'Culturelle',
      category: 'Digestive',
      form: 'drop',
      activeIngredients: [],
      inactiveIngredients: flags,
      verdict: 'clean',
      retailers: [],
    }) ?? undefined
  );
}

export const BATCH258_KYR6D_T16U: RatingRecord[] = [
  {
    id: 'culturelle-b258-digestive-daily-30',
    productName: 'Culturelle Digestive Daily Probiotic Capsules (30)',
    brand: 'Culturelle',
    category: 'Digestive',
    formulaId: 'culturelle-b258-digestive-daily',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '049100400099',
    activeIngredients: [{ name: 'Lactobacillus rhamnosus GG', strength: '10 billion CFU' }],
    inactiveIngredients: DD_FLAGS,
    verdict: 'avoid',
    retailers: ['Culturelle', 'Vitacost'],
    sourcesGeneral: [
      'Lactobacillus rhamnosus GG is the probiotic active and is not graded. Titanium dioxide (color) is Avoid (EU 2022 food ban). That high sets the row. Hydroxypropyl methylcellulose and vegetable magnesium stearate are Cleared. This is not a 3+ Limited stack. Brand supplement-facts image and culturelle.com Digestive Daily, 30 in stock at $17.99. Vitacost Digestive Daily 30 is in stock at $22.37 and prints SKU 049100400099. UPC check digit OK. This is the current panel. It is not the older maltodextrin row culturelle-digestive-daily.',
    ],
  },
  {
    id: 'culturelle-b258-digestive-daily-50',
    productName: 'Culturelle Digestive Daily Probiotic Capsules (50)',
    brand: 'Culturelle',
    category: 'Digestive',
    formulaId: 'culturelle-b258-digestive-daily',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '049100400211',
    activeIngredients: [{ name: 'Lactobacillus rhamnosus GG', strength: '10 billion CFU' }],
    inactiveIngredients: DD_FLAGS,
    verdict: 'avoid',
    retailers: ['Culturelle', 'Vitacost'],
    sourcesGeneral: [
      'Same current panel as the 30. Titanium dioxide (color) is Avoid (EU 2022 food ban). That high sets the row. This is not a 3+ Limited stack. Brand site 50 is in stock at $26.99. Vitacost Digestive Daily 50 is in stock at $34.86 and prints SKU 049100400211. UPC check digit OK. Not the older maltodextrin row.',
    ],
  },
  {
    id: 'culturelle-b258-digestive-chew-24',
    productName: 'Culturelle Digestive Daily Probiotic Chewables, Fresh Orange (24)',
    brand: 'Culturelle',
    category: 'Digestive',
    formulaId: 'culturelle-b258-digestive-chew',
    audience: ADULT,
    minAge: 18,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '049100400228',
    activeIngredients: [{ name: 'Lactobacillus rhamnosus GG', strength: '10 billion CFU' }],
    inactiveIngredients: CHEW_FLAGS,
    verdict: 'avoid',
    retailers: ['Culturelle', 'Vitacost'],
    sourcesGeneral: [
      'Lactobacillus rhamnosus GG is the probiotic active and is not graded. Titanium dioxide (color) and FD&C Yellow No. 6 are Avoid. Either high sets the row. Dextrose and Natural flavor (singular) are Caution and do not stack. Silicon dioxide is the zero-point Caution cap. This is not a 3+ Limited stack. Brand site 24 is in stock at $21.99. Vitacost 24 is in stock at $21.79 and prints SKU 049100400228. UPC check digit OK. The 48-count on the brand site is labeled 2 pk and is not a row.',
    ],
  },
  {
    id: 'culturelle-b258-ultimate-strength-30',
    productName: 'Culturelle Ultimate Strength Probiotic Capsules (30)',
    brand: 'Culturelle',
    category: 'Digestive',
    formulaId: 'culturelle-b258-ultimate-strength',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '049100400518',
    activeIngredients: [{ name: 'Lactobacillus rhamnosus GG', strength: '20 billion CFU' }],
    inactiveIngredients: US_FLAGS,
    verdict: 'avoid',
    retailers: ['Culturelle', 'Vitacost'],
    sourcesGeneral: [
      'Lactobacillus rhamnosus GG is the probiotic active and is not graded. Titanium dioxide (color) is Avoid (EU 2022 food ban). That high sets the row. This is not a 3+ Limited stack. Brand site 30 is in stock at $27.49. Vitacost 30 is in stock at $32.49 and prints SKU 049100400518. UPC check digit OK.',
    ],
  },
  {
    id: 'culturelle-b258-health-wellness-30',
    productName: 'Culturelle Health & Wellness Capsules (30)',
    brand: 'Culturelle',
    category: 'Digestive',
    formulaId: 'culturelle-b258-health-wellness',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '049100363745',
    activeIngredients: [
      { name: 'Probiotic blend (L. rhamnosus GG, L. rhamnosus, L. paracasei)', strength: '15 billion CFU' },
    ],
    inactiveIngredients: HW_FLAGS,
    verdict: 'avoid',
    retailers: ['Culturelle', 'Vitacost'],
    sourcesGeneral: [
      'The probiotic blend is the active and is not graded. Maltodextrin and sucrose inside that blend are the culture medium, not other-ingredient tokens. Titanium dioxide (color) is Avoid (EU 2022 food ban). That high sets the row. Microcrystalline cellulose, hypromellose, sucrose, and magnesium stearate are Cleared. This is not a 3+ Limited stack. Brand site 30 is in stock at $20.99. Vitacost 30 is in stock at $21.87 and prints SKU 049100363745. UPC check digit OK.',
    ],
  },
  {
    id: 'culturelle-b258-gas-30',
    productName: 'Culturelle Bloating & Gas Defense Capsules (30)',
    brand: 'Culturelle',
    category: 'Digestive',
    formulaId: 'culturelle-b258-gas',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '049100401829',
    activeIngredients: [{ name: 'Lactobacillus plantarum LP115', strength: '10 billion CFU' }],
    inactiveIngredients: GAS_FLAGS,
    verdict: 'caution',
    retailers: ['Culturelle', 'Vitacost'],
    sourcesGeneral: [
      'Lactobacillus plantarum LP115 is the probiotic active and is not graded. Rice maltodextrin is the one stack-eligible Limited token (t16u), so the row is Caution. Hydroxypropyl methylcellulose is Cleared. Silicon dioxide is the zero-point Caution cap and does not stack. This is not a 3+ Limited stack. Brand site 30 is in stock at $24.49. Vitacost 30 is in stock at $27.78 and prints SKU 049100401829. UPC check digit OK.',
    ],
  },
  {
    id: 'culturelle-b258-baby-calm-drops',
    productName: 'Culturelle Baby Digestive Calm + Comfort Probiotic Drops (0.29 fl oz)',
    brand: 'Culturelle',
    category: 'Digestive',
    formulaId: 'culturelle-b258-baby-calm-drops',
    audience: KIDS,
    minAge: 0,
    form: 'drop',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '049100400525',
    activeIngredients: [{ name: 'Lactobacillus rhamnosus GG', strength: '10 billion CFU per 6 drops' }],
    inactiveIngredients: CALM_FLAGS,
    verdict: 'clean',
    honestNote: dropNote(CALM_FLAGS, 'Culturelle Baby Digestive Calm + Comfort Probiotic Drops'),
    retailers: ['Culturelle', 'Vitacost'],
    sourcesGeneral: [
      'Lactobacillus rhamnosus GG is the probiotic active and is not graded. Sunflower oil, medium-chain triglycerides from coconut and palm kernel oil, and rice bran oil are the drop carriers. Rice bran oil in an oral liquid drop is Cleared (t16u). Sunflower oil in a drop is not the gummy Avoid print. Named MCT from coconut is Cleared. All other-ingredient tokens are Cleared, so the row is Clean. Brand site 0.29 fl oz is in stock at $19.99. Vitacost is in stock at $20.33 and prints SKU 049100400525. UPC check digit OK.',
    ],
  },
  {
    id: 'culturelle-b258-baby-immune-drops',
    productName: 'Culturelle Baby Immune + Digestive Support Probiotic & Vitamin D Drops (0.3 fl oz)',
    brand: 'Culturelle',
    category: 'Digestive',
    formulaId: 'culturelle-b258-baby-immune-drops',
    audience: KIDS,
    minAge: 0,
    form: 'drop',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '049100400532',
    activeIngredients: [
      { name: 'Vitamin D (as cholecalciferol)', strength: '10 mcg per 6 drops' },
      { name: 'Lactobacillus rhamnosus GG', strength: '10 billion CFU per 6 drops' },
    ],
    inactiveIngredients: IMMUNE_FLAGS,
    verdict: 'clean',
    honestNote: dropNote(IMMUNE_FLAGS, 'Culturelle Baby Immune + Digestive Support Probiotic & Vitamin D Drops'),
    retailers: ['Culturelle', 'Vitacost'],
    sourcesGeneral: [
      'Vitamin D and Lactobacillus rhamnosus GG are supplement-facts actives and are not graded. Sunflower oil in the drop is not the gummy Avoid print. Medium-chain triglycerides from coconut and palm kernel oil are the named Cleared MCT row. Rice bran oil in an oral liquid drop is Cleared (t16u). Vitamin E and citric acid are Cleared. All other-ingredient tokens are Cleared, so the row is Clean. Brand site 0.3 fl oz is in stock at $25.99. Vitacost is in stock at $26.25 and prints SKU 049100400532. UPC check digit OK.',
    ],
  },
  {
    id: 'culturelle-b258-kids-fiber-24',
    productName: 'Culturelle Kids Probiotic + Fiber Packets (24)',
    brand: 'Culturelle',
    category: 'Digestive',
    formulaId: 'culturelle-b258-kids-fiber',
    audience: KIDS,
    minAge: 1,
    form: 'packet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '049100400372',
    activeIngredients: [
      { name: 'Lactobacillus rhamnosus GG', strength: '5 billion CFU' },
      { name: 'Inulin (from chicory root)', strength: 'fiber' },
      { name: 'Wheat dextrin', strength: 'fiber' },
    ],
    inactiveIngredients: FIBER_FLAGS,
    verdict: 'caution',
    retailers: ['Culturelle', 'Vitacost'],
    sourcesGeneral: [
      'Lactobacillus rhamnosus GG is the probiotic active and is not graded. Inulin from chicory root and wheat dextrin are the fiber actives and are not graded. Natural flavors is the one stack-eligible Limited token, so the row is Caution. Sucrose is Cleared. This is not a 3+ Limited stack. Brand site 24 is in stock at $20.99. Vitacost 24 is in stock at $27.14 and prints SKU 049100400372. UPC check digit OK.',
    ],
  },
  {
    id: 'culturelle-b258-kids-fiber-60',
    productName: 'Culturelle Kids Probiotic + Fiber Packets (60)',
    brand: 'Culturelle',
    category: 'Digestive',
    formulaId: 'culturelle-b258-kids-fiber',
    audience: KIDS,
    minAge: 1,
    form: 'packet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '049100400938',
    activeIngredients: [
      { name: 'Lactobacillus rhamnosus GG', strength: '5 billion CFU' },
      { name: 'Inulin (from chicory root)', strength: 'fiber' },
      { name: 'Wheat dextrin', strength: 'fiber' },
    ],
    inactiveIngredients: FIBER_FLAGS,
    verdict: 'caution',
    retailers: ['Culturelle', 'Vitacost'],
    sourcesGeneral: [
      'Same panel as the 24. Natural flavors is the one stack-eligible Limited token, so the row is Caution. The fiber actives are not graded. This is not a 3+ Limited stack. Brand site 60 is in stock at $45.49. Vitacost 60 is in stock at $52.82 and prints SKU 049100400938. UPC check digit OK.',
    ],
  },
];

const ROWS = BATCH258_KYR6D_T16U;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 10) throw new Error(`batch258 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch258 duplicate id');
const barcodes = ROWS.map((record) => record.barcode).filter((code): code is string => Boolean(code));
if (new Set(barcodes).size !== barcodes.length) throw new Error('batch258 duplicate barcode');

for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch258 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.verdict !== rollup.verdict) {
    throw new Error(`batch258 verdict ${record.id}: wrote ${record.verdict}, expected ${rollup.verdict}`);
  }
  const drop = record.form === 'drop';
  const expectedNote = drop
    ? contradictionHonestNote(record)
    : null;
  if ((record.honestNote ?? null) !== (expectedNote ?? null)) {
    throw new Error(`batch258 note ${record.id}`);
  }
  if (!drop && rollup.cause === 'limited_stack') throw new Error(`batch258 unexpected stack ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch258 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why)) throw new Error(`batch258 pending ${ingredient.name}`);
  }
}
