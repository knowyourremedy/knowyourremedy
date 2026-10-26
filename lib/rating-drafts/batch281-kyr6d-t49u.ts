// DRAFT / not verified / batch 281 KYR6-d (t49u Sprouts stack, continued).
// Brand page is the single source. A pack is here only when that page shows it for sale
// and every other-ingredient token is already locked. Missing UPCs stay empty.
// Not in this file: BiOptimizers Magnesium Breakthrough 60. The founder kept that pack held.
// Not the Quercetin 750 variant. Not a ClearLungs multipack.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const METH = {
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate / mixed-tocopherols antioxidant).',
  gomct:
    'Methodology §5 Limited (goMCT® — branded medium-chain triglyceride, t49u). Same grade as unlabeled MCT / medium-chain triglycerides. Counts toward the t137u stack. Dock rule does not dock it.',
  acacia: 'Methodology §5 Cleared (gum acacia / acacia gum).',
  leucine: 'Methodology §5 Cleared (leucine / L-leucine).',
  riceExtract:
    'Methodology §5 Limited (unspecified rice extract — hull, bran, or concentrate not named). Counts toward the t137u stack.',
  cellulose: 'Methodology §5 Cleared (vegetable cellulose / cellulose family).',
  water: 'Methodology §5 Cleared (water / purified water).',
  vegCap:
    'Methodology §5 Cleared (vegetable capsule — t130u unnamed rule; a named hypromellose or cellulose shell is Cleared, so the unnamed shell is not docked).',
  riceFlour: 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.',
  gelatin: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  sunflower:
    'Methodology §5 Cleared (sunflower oil — softgel fill, not the gummy seed-oil rule).',
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  alcohol:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol as a VEHICLE — oral liquid). Alcohol is the vehicle, not the gummy seed-oil High rule. The percent on the bottle is the strength of this vehicle, not a new token.',
  riceBran: 'Methodology §5 Cleared (rice bran extract — named rice-bran extract).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  brand: string,
  retailers: string[],
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
  },
): RatingRecord {
  const audience = partial.audience ?? ADULT;
  const minAge = partial.minAge ?? (audience === 'kids' ? undefined : 18);
  const next: RatingRecord = {
    ...partial,
    brand,
    audience,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers,
    barcode: partial.barcode ?? '',
  };
  if (minAge === undefined) delete next.minAge;
  else next.minAge = minAge;
  return finish(next);
}

const PADV =
  'BiOptimizers brand page. Serving 2 capsules. The bottle is 60 capsules. Vitamin B6, the magnesium blend, manganese, and the trace-mineral complex are the actives and are not graded. goMCT® (medium chain triglycerides) is one token. The parenthesis is the same ingredient, not a second Limited token. t49u brand-page single source.';
const PCOG =
  'BiOptimizers brand page. The label says 2 capsules a day. The bottle is 60 capsules. The probiotic, prebiotic, and herbal blends are the actives and are not graded. t49u brand-page single source.';
const PSTRESS =
  'BiOptimizers brand page. The for-sale variant is 90 capsules. Directions say take 3 to 5 capsules. The herbs are the actives and are not graded. A FAQ on the same page says the bottle contains 120 capsules. The variant that is for sale says 90. t49u brand-page single source.';
const PFLUSH =
  'BiOptimizers brand page. Begin with 1 capsule at bedtime. The bottle is 90 capsules. The herbs and enzymes are the actives and are not graded. t49u brand-page single source.';
const PPARA =
  'BiOptimizers brand page. Begin with 1 capsule at bedtime. The bottle is 90 capsules. The herbs and enzymes are the actives and are not graded. t49u brand-page single source.';
const PGLUTEN =
  'BiOptimizers brand page. Take 3 capsules at the beginning of each meal. The bottle is 90 capsules. The enzymes are the actives and are not graded. t49u brand-page single source.';
const PHCL =
  'BiOptimizers brand page. 1 capsule with each meal. The bottle is 90 capsules. Betaine HCl, the enzyme blend, and the trace mineral are the actives and are not graded. t49u brand-page single source.';
const PIMM =
  'Quantum Health brand page. Serving 1 capsule. The bottle is 30 capsules. Vitamin C, echinacea, elderberry, and goldenseal are the actives and are not graded. t49u brand-page single source.';
const PLIQ =
  'Quantum Health brand page. Serving 1 dropper (0.7 mL). The bottle is 2 oz, about 80 servings. The extracts are the actives and are not graded. The 20–25% on the alcohol line is the strength of the vehicle, not a new token. The goldenseal line is printed as 17m and the unit is cut off. t49u brand-page single source.';
const PLUTEIN =
  'Quantum Health brand page. Serving 1 softgel. The bottle is 30 softgels. The vitamins, lutein, and zeaxanthin are the actives and are not graded. t49u brand-page single source.';
const PQUER =
  'Quantum Health brand page. The for-sale variant is Quercetin 500+. Serving 1 capsule. The bottle is 90 capsules. Vitamin C, zinc, and quercetin are the actives and are not graded. The 750 variant on the same page is not this row. t49u brand-page single source.';
const PSUPER =
  'Quantum Health brand page. The facts heading says serving size 3 tablets. Directions say take 3 capsules daily. The bottle is 90 count, 30 servings. Lysine, astragalus, and olive leaf are the actives and are not graded. t49u brand-page single source.';
const PAIR =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PCLASS =
  'RidgeCrest Herbals brand page. Serving 2 capsules. Adults and children 12 and older. The herbs are the actives and are not graded. The 60-capsule and 120-capsule bottles are the same formula. t49u brand-page single source.';
const PEXTRA =
  'RidgeCrest Herbals brand page. Serving 2 capsules. Adults and children 12 and older. The herbs and AvailaBlend are the actives and are not graded. The 60-capsule and 120-capsule bottles are the same formula. t49u brand-page single source.';
const PDREAM =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Adults and children 12 and older. The herbs and 5-HTP are the actives and are not graded. t49u brand-page single source.';
const PEPIC =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Adults and children 12 and older. Creatine and the herbs are the actives and are not graded. t49u brand-page single source.';
const PLIVER =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PSINUS =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Adults and children 12 and older. Vitamin C, zinc, bromelain, and the herbs are the actives and are not graded. t49u brand-page single source.';

const CLASSIC_ACTIVES = [
  { name: 'Dong Quai root', strength: 'amount not printed' },
  { name: 'Ophiopogon root', strength: 'amount not printed' },
  { name: 'Poria', strength: 'amount not printed' },
  { name: 'Chinese Asparagus root', strength: 'amount not printed' },
  { name: 'Chinese Skullcap root', strength: 'amount not printed' },
  { name: 'Gardenia fruit', strength: 'amount not printed' },
  { name: 'Luo Han Guo fruit', strength: 'amount not printed' },
  { name: 'Platycodon root', strength: 'amount not printed' },
  { name: 'Tangerine mature peel', strength: 'amount not printed' },
  { name: 'White Mulberry root bark', strength: 'amount not printed' },
  { name: 'Zhejiang Fritillary bulb', strength: 'amount not printed' },
  { name: 'Schisandra fruit', strength: 'amount not printed' },
  { name: 'Chinese Licorice root', strength: 'amount not printed' },
];

const CLASSIC_INACTIVES = [
  flag(PCLASS, 'Vegetable Cellulose (Capsule)', 'cleared', 'cellulose'),
  flag(PCLASS, 'Silica', 'limited', 'silica'),
  flag(PCLASS, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
];

const EXTRA_INACTIVES = [
  flag(PEXTRA, 'Vegetable Capsule', 'cleared', 'vegCap'),
  flag(PEXTRA, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
  flag(PEXTRA, 'Silica', 'limited', 'silica'),
];

export const BATCH281_KYR6D_T49U: RatingRecord[] = [
  row('BiOptimizers', ['BiOptimizers'], {
    id: 'bioptimizers-b281-mag-advanced-10',
    productName: 'BiOptimizers Magnesium Breakthrough Advanced 10 (60 capsules)',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b281-mag-advanced-10',
    form: 'capsule',
    activeIngredients: [
      { name: 'Vitamin B6 (as Pyridoxine-5-Phosphate)', strength: 'amount not printed' },
      { name: 'Magnesium Proprietary Blend', strength: '550 mg elemental magnesium per serving' },
      { name: 'Manganese (as Manganese Citrate)', strength: 'amount not printed' },
      { name: 'Ionic Trace Mineral Complex', strength: 'amount not printed' },
    ],
    inactiveIngredients: [
      flag(PADV, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(PADV, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PADV, 'Ascorbyl Palmitate', 'cleared', 'ascorbyl'),
      flag(PADV, 'goMCT®', 'limited', 'gomct'),
      flag(PADV, 'Gum Acacia', 'cleared', 'acacia'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/magnesium-breakthrough-advanced-10 lists 60 capsules at $44.99 and in stock. Take 2 capsules daily. Counted Limited token: goMCT®. That is one, so this is not a 3+ stack. No honest note. Missing UPC. No code was invented. Not the Magnesium Breakthrough 60, which stays held.',
    ],
  }),
  row('BiOptimizers', ['BiOptimizers'], {
    id: 'bioptimizers-b281-cognibiotics-60',
    productName: 'BiOptimizers Cognibiotics (60 capsules)',
    category: 'Digestive',
    formulaId: 'bioptimizers-b281-cognibiotics-60',
    form: 'capsule',
    barcode: '753068878684',
    activeIngredients: [
      { name: 'Proprietary Probiotic Blend', strength: 'amount not printed' },
      { name: 'Prebiotic Complex (Organic Inulin, Xylooligosaccharides)', strength: 'amount not printed' },
      { name: 'Chinese Herbal Blend', strength: 'amount not printed' },
    ],
    inactiveIngredients: [
      flag(PCOG, 'L-Leucine', 'cleared', 'leucine'),
      flag(PCOG, 'Silica', 'limited', 'silica'),
      flag(PCOG, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/cognibiotics lists 60 capsules at $68.99 and in stock. The page says 2 capsules a day. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. UPC 753068878684.',
    ],
  }),
  row('BiOptimizers', ['BiOptimizers'], {
    id: 'bioptimizers-b281-stress-guardian-90',
    productName: 'BiOptimizers Stress Guardian (90 capsules)',
    category: 'Sleep',
    formulaId: 'bioptimizers-b281-stress-guardian-90',
    form: 'capsule',
    barcode: '760851666212',
    activeIngredients: [
      { name: 'Eleutherococcus', strength: 'amount not printed' },
      { name: 'Astragalus', strength: 'amount not printed' },
      { name: 'Reishi', strength: 'amount not printed' },
      { name: 'Fo-Ti', strength: 'amount not printed' },
      { name: 'Goji', strength: 'amount not printed' },
      { name: 'Licorice', strength: 'amount not printed' },
      { name: 'Schisandra', strength: 'amount not printed' },
      { name: 'Asian Ginseng', strength: 'amount not printed' },
      { name: 'Tienchi Ginseng', strength: 'amount not printed' },
      { name: 'Chinese Sage', strength: 'amount not printed' },
      { name: 'Kudzu', strength: 'amount not printed' },
      { name: 'Chinese Peony', strength: 'amount not printed' },
      { name: 'Cordyceps', strength: 'amount not printed' },
      { name: 'Rhodiola', strength: 'amount not printed' },
    ],
    inactiveIngredients: [flag(PSTRESS, 'Hypromellose Capsule', 'cleared', 'hpmc')],
    verdict: 'clean',
    sourcesGeneral: [
      't49u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/stress-guardian lists 90 capsules at $49.99 and in stock. Directions say take 3 to 5 capsules. A FAQ on the same page says the bottle contains 120 capsules. The variant for sale says 90. Counted Limited tokens: none. No honest note. UPC 760851666212. Not Stress Guardian V1.',
    ],
  }),
  row('BiOptimizers', ['BiOptimizers'], {
    id: 'bioptimizers-b281-herbal-flush-90',
    productName: 'BiOptimizers Herbal Power Flush (90 capsules)',
    category: 'Digestive',
    formulaId: 'bioptimizers-b281-herbal-flush-90',
    form: 'capsule',
    barcode: '704817367386',
    activeIngredients: [
      { name: 'Psyllium seed husk', strength: 'amount not printed' },
      { name: 'Cascara Sagrada bark', strength: 'amount not printed' },
      { name: 'Red Clover flower', strength: 'amount not printed' },
      { name: 'Kelp', strength: 'amount not printed' },
      { name: 'Cellulase', strength: 'amount not printed' },
      { name: 'Amylase', strength: 'amount not printed' },
      { name: 'Phytase', strength: 'amount not printed' },
      { name: 'Protease', strength: 'amount not printed' },
      { name: 'Lipase', strength: 'amount not printed' },
    ],
    inactiveIngredients: [flag(PFLUSH, 'Vegetarian Capsule (Hypromellose, Water)', 'cleared', 'hpmc')],
    verdict: 'clean',
    sourcesGeneral: [
      't49u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/herbal-power-flush lists 90 capsules at $58.99 and in stock. Begin with 1 capsule at bedtime. Counted Limited tokens: none. No honest note. UPC 704817367386.',
    ],
  }),
  row('BiOptimizers', ['BiOptimizers'], {
    id: 'bioptimizers-b281-para-guardian-90',
    productName: 'BiOptimizers Para Guardian (90 capsules)',
    category: 'Digestive',
    formulaId: 'bioptimizers-b281-para-guardian-90',
    form: 'capsule',
    barcode: '785614536762',
    activeIngredients: [
      { name: 'Herbal and enzyme blend', strength: 'milligram amounts not printed' },
    ],
    inactiveIngredients: [flag(PPARA, 'Vegetarian Capsule (Hypromellose, Water)', 'cleared', 'hpmc')],
    verdict: 'clean',
    sourcesGeneral: [
      't49u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/para-guardian lists 90 capsules at $44.99 and in stock. Begin with 1 capsule at bedtime. The herb and enzyme amounts are printed as extract ratios and enzyme units, not as a single milligram serving, so they are not copied as a milligram strength. Counted Limited tokens: none. No honest note. UPC 785614536762.',
    ],
  }),
  row('BiOptimizers', ['BiOptimizers'], {
    id: 'bioptimizers-b281-gluten-guardian-90',
    productName: 'BiOptimizers Gluten Guardian (90 capsules)',
    category: 'Digestive',
    formulaId: 'bioptimizers-b281-gluten-guardian-90',
    form: 'capsule',
    barcode: '750363800723',
    activeIngredients: [
      { name: 'Enzyme blend', strength: 'milligram amounts not printed' },
    ],
    inactiveIngredients: [
      flag(PGLUTEN, 'Rice Extract', 'limited', 'riceExtract'),
      flag(PGLUTEN, 'Vegetable Cellulose', 'cleared', 'cellulose'),
      flag(PGLUTEN, 'Water', 'cleared', 'water'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/gluten-guardian lists 90 capsules at $68.99 and in stock. Take 3 capsules at the beginning of each meal. Counted Limited token: rice extract. That is one, so this is not a 3+ stack. No honest note. UPC 750363800723.',
    ],
  }),
  row('BiOptimizers', ['BiOptimizers'], {
    id: 'bioptimizers-b281-hcl-90',
    productName: 'BiOptimizers HCL Breakthrough (90 capsules)',
    category: 'Digestive',
    formulaId: 'bioptimizers-b281-hcl-90',
    form: 'capsule',
    barcode: '648620408426',
    activeIngredients: [
      { name: 'Betaine HCL', strength: 'amount not printed' },
      { name: 'Enzyme Blend', strength: 'amount not printed' },
      { name: 'Trace Mineral', strength: 'amount not printed' },
    ],
    inactiveIngredients: [
      flag(PHCL, 'Rice Extract', 'limited', 'riceExtract'),
      flag(PHCL, 'Vegetable Cellulose', 'cleared', 'cellulose'),
      flag(PHCL, 'Water', 'cleared', 'water'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/hcl-breakthrough lists 90 capsules at $29.99 and in stock. 1 capsule with each meal. Counted Limited token: rice extract. That is one, so this is not a 3+ stack. No honest note. UPC 648620408426.',
    ],
  }),
  row('Quantum Health', ['Quantum Health'], {
    id: 'quantum-b281-immune-cap-30',
    productName: 'Quantum Health Immune Support Capsules (30 capsules)',
    category: 'Immune Support',
    formulaId: 'quantum-b281-immune-cap-30',
    form: 'capsule',
    activeIngredients: [
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '250 mg' },
      { name: 'Echinacea purpurea Root Extract', strength: '100 mg' },
      { name: 'Elderberry Fruit', strength: '100 mg' },
      { name: 'Goldenseal Leaf', strength: '25 mg' },
    ],
    inactiveIngredients: [
      flag(PIMM, 'Rice Flour', 'moderate', 'riceFlour'),
      flag(PIMM, 'Silicon Dioxide', 'limited', 'silica'),
      flag(PIMM, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PIMM, 'Gelatin Capsule (Gelatin, Water)', 'cleared', 'gelatin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/immune-support-capsules is in stock. Serving 1 capsule. Servings per container 30. Take 1 capsule 3 times daily. Rice flour is Caution and does not stack. Silicon dioxide is the 0-pt cap and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row('Quantum Health', ['Quantum Health'], {
    id: 'quantum-b281-immune-liquid-2',
    productName: 'Quantum Health Immune Support Liquid Extract (2 oz)',
    category: 'Immune Support',
    formulaId: 'quantum-b281-immune-liquid-2',
    form: 'liquid',
    activeIngredients: [
      { name: 'Elderberry Fruit Extract', strength: '335 mg' },
      { name: 'Echinacea Purpurea (Whole Plant) Extract', strength: '261 mg' },
      { name: 'Echinacea Angustifolia Root Extract', strength: '87 mg' },
      { name: 'Goldenseal Leaf Extract', strength: 'printed as 17m; the unit is cut off on the page' },
    ],
    inactiveIngredients: [
      flag(PLIQ, 'Water', 'cleared', 'water'),
      flag(PLIQ, 'Alcohol', 'limited', 'alcohol'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/immune-support-liquid-extract is in stock. Serving 1 dropper (0.7 mL). About 80 servings. Net weight 2 oz. Counted Limited token: alcohol. That is one, so this is not a 3+ stack. The 20–25% is the vehicle strength. No honest note. The goldenseal line is printed as 17m. Missing UPC. No code was invented.',
    ],
  }),
  row('Quantum Health', ['Quantum Health'], {
    id: 'quantum-b281-see-lutein-30',
    productName: 'Quantum Health See Lutein+ (30 softgels)',
    category: 'Eye & Ear',
    formulaId: 'quantum-b281-see-lutein-30',
    form: 'softgel',
    activeIngredients: [
      { name: 'Vitamin C (ascorbic acid)', strength: '200 mg' },
      { name: 'Vitamin E (d-alpha tocopherol)', strength: '67 mg' },
      { name: 'Lutein (free form)', strength: '20 mg' },
      { name: 'Zeaxanthin', strength: '4 mg' },
    ],
    inactiveIngredients: [
      flag(PLUTEIN, 'Gelatin', 'cleared', 'gelatin'),
      flag(PLUTEIN, 'Glycerin', 'cleared', 'glycerin'),
      flag(PLUTEIN, 'Sunflower Oil', 'cleared', 'sunflower'),
      flag(PLUTEIN, 'Water', 'cleared', 'water'),
      flag(PLUTEIN, 'Yellow Bees Wax', 'cleared', 'beeswax'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/see-lutein is in stock. Serving 1 softgel. Servings per container 30. Take 1 softgel daily with food. Sunflower oil is the softgel fill. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row('Quantum Health', ['Quantum Health'], {
    id: 'quantum-b281-quercetin-500-90',
    productName: 'Quantum Health Quercetin 500+ (90 capsules)',
    category: 'Immune Support',
    formulaId: 'quantum-b281-quercetin-500-90',
    form: 'capsule',
    activeIngredients: [
      { name: 'Vitamin C (Ascorbic Acid)', strength: '100 mg' },
      { name: 'Zinc (as Zinc Oxide)', strength: '11 mg' },
      { name: 'Quercetin Dihydrate', strength: '500 mg' },
    ],
    inactiveIngredients: [
      flag(PQUER, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(PQUER, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PQUER, 'Silicon Dioxide', 'limited', 'silica'),
      flag(PQUER, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/quercetin lists Quercetin 500+ at $29.69 and in stock. Serving 1 capsule. Servings per container 90. Silicon dioxide is the 0-pt cap. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 750+ panel on the same page is a different formula and is not this row.',
    ],
  }),
  row('Quantum Health', ['Quantum Health'], {
    id: 'quantum-b281-superimmune-90',
    productName: 'Quantum Health SuperImmune+ (90 capsules)',
    category: 'Immune Support',
    formulaId: 'quantum-b281-superimmune-90',
    form: 'capsule',
    activeIngredients: [
      { name: 'Lysine (as L-Lysine Hydrochloride)', strength: '1500 mg' },
      { name: 'Astragalus Root Extract 4:1', strength: '200 mg' },
      { name: 'Olive Leaf Extract (18% Oleuropein)', strength: '100 mg' },
    ],
    inactiveIngredients: [
      flag(PSUPER, 'Vegetable Capsule (Hypromellose and Water)', 'cleared', 'hpmc'),
      flag(PSUPER, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PSUPER, 'Magnesium Stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/superimmune-vegetarian-capsules is in stock. 90 count. Servings per container 30. The facts heading says serving size 3 tablets. Directions say take 3 capsules daily. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row('RidgeCrest Herbals', ['RidgeCrest Herbals'], {
    id: 'ridgecrest-b281-airway-60',
    productName: 'RidgeCrest Herbals AirwayClear (60 capsules)',
    category: 'Cold & Flu',
    formulaId: 'ridgecrest-b281-airway-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724001209',
    activeIngredients: [
      { name: 'Herbal blend', strength: 'milligram amounts not printed' },
    ],
    inactiveIngredients: [
      flag(PAIR, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PAIR, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/airwayclear lists 60 capsules, 30 servings, at $27.99 and in stock. Serving 2 capsules. Adults and children 12 and older. Counted Limited tokens: none. No honest note. UPC 355724001209.',
    ],
  }),
  row('RidgeCrest Herbals', ['RidgeCrest Herbals'], {
    id: 'ridgecrest-b281-clearlungs-classic-60',
    productName: 'RidgeCrest Herbals ClearLungs Classic (60 capsules)',
    category: 'Cold & Flu',
    formulaId: 'ridgecrest-b281-clearlungs-classic',
    form: 'capsule',
    minAge: 12,
    activeIngredients: CLASSIC_ACTIVES,
    inactiveIngredients: CLASSIC_INACTIVES,
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/clearlungs-classic lists 60 capsules, 30 servings, at $24.99 and in stock. Serving 2 capsules. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Two passing UPC-A codes were on the page and were not tied to the 60 or the 120, so the barcode is empty. No code was invented.',
    ],
  }),
  row('RidgeCrest Herbals', ['RidgeCrest Herbals'], {
    id: 'ridgecrest-b281-clearlungs-classic-120',
    productName: 'RidgeCrest Herbals ClearLungs Classic (120 capsules)',
    category: 'Cold & Flu',
    formulaId: 'ridgecrest-b281-clearlungs-classic',
    form: 'capsule',
    minAge: 12,
    activeIngredients: CLASSIC_ACTIVES,
    inactiveIngredients: CLASSIC_INACTIVES,
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/clearlungs-classic lists 120 capsules, 60 servings, at $44.99 and in stock. Same other-ingredient line as the 60. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. The page barcodes were not tied to this count. Missing UPC. No code was invented.',
    ],
  }),
  row('RidgeCrest Herbals', ['RidgeCrest Herbals'], {
    id: 'ridgecrest-b281-clearlungs-extra-60',
    productName: 'RidgeCrest Herbals ClearLungs Extra Strength (60 capsules)',
    category: 'Cold & Flu',
    formulaId: 'ridgecrest-b281-clearlungs-extra',
    form: 'capsule',
    minAge: 12,
    activeIngredients: [
      ...CLASSIC_ACTIVES,
      { name: 'AvailaBlend (Sichuan pepper, Ginger root, Black pepper, Habanero pepper)', strength: 'amount not printed' },
    ],
    inactiveIngredients: EXTRA_INACTIVES,
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/clearlungs-extra-strength lists 60 capsules, 30 servings, at $29.99 and in stock. Serving 2 capsules. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Two passing UPC-A codes were on the page and were not tied to the 60 or the 120, so the barcode is empty. No code was invented.',
    ],
  }),
  row('RidgeCrest Herbals', ['RidgeCrest Herbals'], {
    id: 'ridgecrest-b281-clearlungs-extra-120',
    productName: 'RidgeCrest Herbals ClearLungs Extra Strength (120 capsules)',
    category: 'Cold & Flu',
    formulaId: 'ridgecrest-b281-clearlungs-extra',
    form: 'capsule',
    minAge: 12,
    activeIngredients: [
      ...CLASSIC_ACTIVES,
      { name: 'AvailaBlend (Sichuan pepper, Ginger root, Black pepper, Habanero pepper)', strength: 'amount not printed' },
    ],
    inactiveIngredients: EXTRA_INACTIVES,
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/clearlungs-extra-strength lists 120 capsules, 60 servings, at $49.99 and in stock. Same other-ingredient line as the 60. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. The page barcodes were not tied to this count. Missing UPC. No code was invented.',
    ],
  }),
  row('RidgeCrest Herbals', ['RidgeCrest Herbals'], {
    id: 'ridgecrest-b281-dreamon-60',
    productName: 'RidgeCrest Herbals DreamOn Zen (60 capsules)',
    category: 'Sleep',
    formulaId: 'ridgecrest-b281-dreamon-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724001629',
    activeIngredients: [
      { name: 'Herbal blend with 5-hydroxytryptophan', strength: 'milligram amounts not printed' },
    ],
    inactiveIngredients: [
      flag(PDREAM, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PDREAM, 'Rice Bran Extract', 'cleared', 'riceBran'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/dreamon-zen lists 60 capsules, 30 servings, at $29.99 and in stock. Take 2 capsules 30 minutes before bed. Adults and children 12 and older. Counted Limited tokens: none. UPC 355724001629.',
    ],
  }),
  row('RidgeCrest Herbals', ['RidgeCrest Herbals'], {
    id: 'ridgecrest-b281-epicbrain-60',
    productName: 'RidgeCrest Herbals EpicBrain (60 capsules)',
    category: 'Herbs',
    formulaId: 'ridgecrest-b281-epicbrain-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724002046',
    activeIngredients: [
      { name: 'Creatine Monohydrate', strength: 'amount not printed' },
      { name: "Lion's Mane Extract (10:1)", strength: 'amount not printed' },
      { name: 'Reishi Extract (10:1)', strength: 'amount not printed' },
      { name: 'Turkey Tail Extract (10:1)', strength: 'amount not printed' },
      { name: 'Butterfly pea', strength: 'amount not printed' },
      { name: 'Gotu Kola', strength: 'amount not printed' },
      { name: 'Rosemary Extract (10% Rosmarinic Acid)', strength: 'amount not printed' },
    ],
    inactiveIngredients: [
      flag(PEPIC, 'Hypromellose Vegetable Capsule', 'cleared', 'hpmc'),
      flag(PEPIC, 'Silicon Dioxide', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/epicbrain lists 60 capsules, 30 servings, at $29.99 and in stock. Take 2 capsules daily. Silicon dioxide is the 0-pt cap. Counted Limited tokens: none. No honest note. UPC 355724002046.',
    ],
  }),
  row('RidgeCrest Herbals', ['RidgeCrest Herbals'], {
    id: 'ridgecrest-b281-liverclean-60',
    productName: 'RidgeCrest Herbals LiverClean (60 capsules)',
    category: 'Digestive',
    formulaId: 'ridgecrest-b281-liverclean-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724001728',
    activeIngredients: [
      { name: 'Herbal blend', strength: 'milligram amounts not printed' },
    ],
    inactiveIngredients: [
      flag(PLIVER, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PLIVER, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/liverclean lists 60 capsules, 30 servings, at $24.99 and in stock. Take 2 capsules once daily before a meal. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. UPC 355724001728.',
    ],
  }),
  row('RidgeCrest Herbals', ['RidgeCrest Herbals'], {
    id: 'ridgecrest-b281-sinusclear-60',
    productName: 'RidgeCrest Herbals SinusClear (60 capsules)',
    category: 'Allergies',
    formulaId: 'ridgecrest-b281-sinusclear-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724005870',
    activeIngredients: [
      { name: 'Vitamin C (ascorbate)', strength: 'amount not printed' },
      { name: 'Zinc (ascorbate)', strength: 'amount not printed' },
      { name: 'Bromelain', strength: '20 GDU per serving' },
      { name: 'Herbal blend', strength: 'milligram amounts not printed' },
    ],
    inactiveIngredients: [
      flag(PSINUS, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PSINUS, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PSINUS, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/sinusclear lists 60 capsules, 30 servings, at $29.99 and in stock. Take 2 capsules daily. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. UPC 355724005870.',
    ],
  }),
];

const ROWS = BATCH281_KYR6D_T49U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string }> = {
  'bioptimizers-b281-mag-advanced-10': { verdict: 'caution', cause: 'limited_1_2', counted: 'goMCT®' },
  'bioptimizers-b281-cognibiotics-60': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'bioptimizers-b281-stress-guardian-90': { verdict: 'clean', cause: 'clean', counted: '' },
  'bioptimizers-b281-herbal-flush-90': { verdict: 'clean', cause: 'clean', counted: '' },
  'bioptimizers-b281-para-guardian-90': { verdict: 'clean', cause: 'clean', counted: '' },
  'bioptimizers-b281-gluten-guardian-90': { verdict: 'caution', cause: 'limited_1_2', counted: 'Rice Extract' },
  'bioptimizers-b281-hcl-90': { verdict: 'caution', cause: 'limited_1_2', counted: 'Rice Extract' },
  'quantum-b281-immune-cap-30': { verdict: 'caution', cause: 'moderate', counted: '' },
  'quantum-b281-immune-liquid-2': { verdict: 'caution', cause: 'limited_1_2', counted: 'Alcohol' },
  'quantum-b281-see-lutein-30': { verdict: 'clean', cause: 'clean', counted: '' },
  'quantum-b281-quercetin-500-90': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'quantum-b281-superimmune-90': { verdict: 'clean', cause: 'clean', counted: '' },
  'ridgecrest-b281-airway-60': { verdict: 'clean', cause: 'clean', counted: '' },
  'ridgecrest-b281-clearlungs-classic-60': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'ridgecrest-b281-clearlungs-classic-120': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'ridgecrest-b281-clearlungs-extra-60': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'ridgecrest-b281-clearlungs-extra-120': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'ridgecrest-b281-dreamon-60': { verdict: 'clean', cause: 'clean', counted: '' },
  'ridgecrest-b281-epicbrain-60': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'ridgecrest-b281-liverclean-60': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'ridgecrest-b281-sinusclear-60': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
};

const NOTE_IDS = new Set(['quantum-b281-see-lutein-30', 'ridgecrest-b281-dreamon-60']);

if (ROWS.length !== 21) throw new Error(`batch281 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch281 unexpected id ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || record.verdict !== expected.verdict) {
    throw new Error(`batch281 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch281 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch281 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch281 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch281 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch281 pending ${ingredient.name}`);
    }
  }
}
