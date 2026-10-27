// DRAFT / not verified / batch 290 KYR6-d (t83u).
// Brand page is the single source when that page shows the 1-pack and the panel.
// A retailer page is a second source when the brand page text has the line.
// Missing UPCs stay empty. No brand is closed.
// Not in this file: packs whose panel token is unlocked, or whose sources disagree.

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
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  cellulose: 'Methodology §5 Cleared (cellulose / cellulose family).',
  croscarm: 'Methodology §5 Cleared (croscarmellose sodium / cellulose family).',
  cmc: 'Methodology §5 Cleared (sodium carboxymethylcellulose / cellulose family).',
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate / mixed-tocopherols antioxidant).',
  tapiocaFiber: 'Methodology §5 Cleared (organic soluble tapioca fiber / tapioca fiber, inulin family).',
  cane: 'Methodology §5 Cleared (organic cane sugar).',
  flavors:
    'Methodology §5 Limited (t54u natural-flavor rule). A documented product that uses this exact wording contains a Limited carrier, solvent, or other docked component. Counts toward the t137u stack.',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers and buffers).',
  spirulina:
    'Methodology §5 Caution (organic spirulina extract (color)). A color listing is not an unnamed algae powder and is not a synthetic dye. Does not count toward the t137u stack.',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — Oct 15, 2026). Organic fruit and vegetable juice (color) is this lock.',
  water: 'Methodology §5 Cleared (water / purified water).',
  alcohol:
    'Methodology §5 Limited (alcohol / ethyl alcohol as an oral vehicle). The panel prints US Pharmacopoeial alcohol (57-67% by volume). The percent is the vehicle strength. Counts toward the t137u stack.',
  glycerine: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  saline:
    'Methodology §5 Cleared (Normal Saline — t83u). 0.9% sodium chloride aqueous vehicle. Same Cleared sodium-chloride family. Does not count toward the t137u stack.',
  dextrin: 'Methodology §5 Caution (dextrin). Not tapioca dextrin. Does not count toward the t137u stack.',
  dextrose: 'Methodology §5 Caution (dextrose). Bare dextrose stays Caution. Does not count toward the t137u stack.',
  mctVeg:
    'Methodology §5 Limited (medium-chain triglycerides when no plant source is named). The parenthesis says vegetable. It does not name coconut or palm. Counts toward the t137u stack.',
  citrate: 'Methodology §5 Caution (sodium citrate). Does not count toward the t137u stack.',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate lubricant).',
  silica:
    'Methodology §5 Caution (silicon dioxide — 0-pt Caution cap). Does not count toward the t137u stack.',
  wax: 'Methodology §5 Cleared (wax). Named carnauba wax and beeswax are Cleared, so bare wax is not docked.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate, vegetable source).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.',
  lecithin: 'Methodology §5 Cleared (sunflower lecithin / lecithin).',
  palm:
    'Methodology §5 Cleared in a tablet (palm oil). Palm oil is Not clean when it is the base of a gummy. This product is a tablet, so that flag did not pull the grade down.',
  guar: 'Methodology §5 Cleared (guar gum).',
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
  partial: Omit<RatingRecord, 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & { barcode?: string },
): RatingRecord {
  return finish({
    ...partial,
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: [partial.brand],
    barcode: partial.barcode ?? '',
  });
}

const PZINC =
  'BiOptimizers brand page. https://bioptimizers.com/products/zinc-breakthrough. The facts image 05_-_Zinc_Breakthrough.png is the 60-capsule panel. Serving 1 capsule. Servings per container 60. t83u brand-page single source.';
const PSTRESS =
  'BiOptimizers brand page https://bioptimizers.com/products/stress-guardian and Vitacost https://www.vitacost.com/products/bioptimizers-stress-guardian-45-veggie-caps-145510. The 45-capsule bottle is Version 1.0. Serving 3 capsules. Servings per container 15. t83u.';
const PPEACE =
  'Herbs Etc. brand page. https://herbsetc.com/products/daily-peace-infused-herbal-gummies-30-ct. The facts image Herbs_DailyPeaceGummies-PDP_02. Serving 1 gummy. Servings per container 30. t83u brand-page single source.';
const PSLEEP =
  'Herbs Etc. brand page. https://herbsetc.com/products/deep-sleep-infused-herbal-gummies-30-ct. The facts image Herbs_DeepSleepGummies-PDP_02. Serving 1 gummy. Servings per container 30. t83u brand-page single source.';
const PMENO =
  'Herbs Etc. brand page. https://herbsetc.com/products/menopautonic. The facts image Menopautonic_2_oz_PDP_03. Serving 30 drops. Servings per container about 79. The bottle is 2 oz. t83u brand-page single source.';
const PSYN =
  'Hyalogic brand page. https://hyalogic.com/products/synthovial-seven-joint-support. The facts image 7-_Supplement_facts_-_Synthovial_seven.jpg. Serving 1 mL (full dropper). Servings per container 30. t83u brand-page single source.';
const PCOL =
  'Hyalogic brand page https://hyalogic.com/products/collagen-peptides-powder and Natural Health Co. https://www.nhc.com/products/ha-collagen-peptides-by-hyalogic and PureFormulas https://www.pureformulas.com/product/ha-collagen-powder-hyaluronic-acid-with-collagen-peptides-by-hyalogic/1000046166. Serving 1 scoop (6 g). Servings per container 30. Other ingredients: none. t83u.';
const PSL =
  'Quantum Health brand page https://quantumhealth.com/products/superlysine-advanced-lysine-supplement and Vitacost https://www.vitacost.com/products/quantum-health-superlysine-immune-support-90-tablets-6689 and iHerb https://www.iherb.com/pr/quantum-health-superlysine-immune-support-90-tablets/6689. Serving 3 tablets. The coating parenthesis is the named coating ingredients. t83u.';
const PMIG =
  'Quantum Health brand page https://quantumhealth.com/products/migshield and Vitacost https://www.vitacost.com/products/quantum-health-migshield-60-tablets-84020. Serving 1 tablet. Servings per container 60. t83u.';

const NOTE_ZINC =
  'Every other ingredient is Cleared. Hypromellose (capsule), microcrystalline cellulose, and ascorbyl palmitate do not pull the grade down. Counted Limited tokens: none.';
const NOTE_STRESS =
  'Every other ingredient is Cleared. Hypromellose (capsule) does not pull the grade down. Counted Limited tokens: none.';
const NOTE_GUMMY =
  'Caution from one Limited token: Organic Flavors. That is one, so this is not a 3+ stack. Organic spirulina extract (color) is Caution and does not stack. Organic soluble tapioca fiber, organic cane sugar, citric acid, organic fruit and vegetable juice (color), and water are Cleared.';
const NOTE_MENO =
  'Caution from one Limited token: alcohol. That is one, so this is not a 3+ stack. The bottle prints US Pharmacopoeial alcohol (57-67% by volume). The percent is the vehicle strength. Purified water and vegetable glycerine are Cleared.';
const NOTE_SYN =
  'Every other ingredient is Cleared. Normal Saline is the t83u sodium-chloride vehicle. Counted Limited tokens: none.';
const NOTE_COL =
  'No other ingredients are printed. The facts panel is the whole formula. Counted Limited tokens: none.';
const NOTE_SL =
  'Caution from one Limited token: medium chain triglycerides (vegetable). That is one, so this is not a 3+ stack. The parenthesis says vegetable and does not name coconut or palm. Dextrin, dextrose, and sodium citrate are Caution and do not stack. Silicon dioxide is the 0-pt cap and does not stack. Cellulose, sodium carboxymethylcellulose, stearic acid, croscarmellose sodium, and wax are Cleared.';
const NOTE_MIG =
  'Palm oil is Not clean when it is the base of a gummy. That is the form this app flags. This product is a tablet. The oil is not the base of a gummy you chew, so it did not pull this grade down. Caution from one Limited token: maltodextrin. That is one, so this is not a 3+ stack. Silicon dioxide is the 0-pt cap and does not stack. Microcrystalline cellulose, croscarmellose sodium, stearic acid, magnesium stearate (vegetable source), sunflower lecithin, and guar gum are Cleared.';

const SL_FLAGS: IngredientFlag[] = [
  flag(PSL, 'Cellulose', 'cleared', 'cellulose'),
  flag(PSL, 'Sodium Carboxymethylcellulose', 'cleared', 'cmc'),
  flag(PSL, 'Dextrin', 'moderate', 'dextrin'),
  flag(PSL, 'Dextrose', 'moderate', 'dextrose'),
  flag(PSL, 'Medium Chain Triglycerides (vegetable)', 'limited', 'mctVeg'),
  flag(PSL, 'Sodium Citrate', 'moderate', 'citrate'),
  flag(PSL, 'Stearic Acid', 'cleared', 'stearic'),
  flag(PSL, 'Silicon Dioxide', 'limited', 'silica'),
  flag(PSL, 'Croscarmellose Sodium', 'cleared', 'croscarm'),
  flag(PSL, 'Wax', 'cleared', 'wax'),
];

const SL_ACTIVES = [
  { name: 'Vitamin C (as Ascorbic Acid)', strength: '100 mg' },
  { name: 'Calcium (from Dicalcium Phosphate, Calcium Stearate)', strength: '29 mg' },
  { name: 'L-Lysine (as L-Lysine Hydrochloride)', strength: '1500 mg' },
  { name: 'Garlic Bulb (deodorized)', strength: '200 mg' },
  { name: 'Echinacea Whole Plant (Echinacea purpurea) extract 4:1', strength: '100 mg' },
  { name: 'Propolis extract 2:1', strength: '25 mg' },
  { name: 'Licorice Root (Glycyrrhiza glabra) extract 4:1', strength: '15 mg' },
];

export const BATCH290_KYR6D_T83U: RatingRecord[] = [
  row({
    id: 'bioptimizers-b290-zinc-breakthrough-60',
    productName: 'BiOptimizers Zinc Breakthrough (60 capsules)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b290-zinc-breakthrough-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Vitamin C (as magnesium ascorbate and calcium ascorbate)', strength: '125 mg' },
      { name: 'Zinc (as zinc picolinate, zinc citrate, zinc gluconate, zinc aspartate, zinc oxide, zinc carnosine, zinc orotate)', strength: '15 mg' },
      { name: 'Copper (as copper bisglycinate chelate)', strength: '1.9 mg' },
    ],
    inactiveIngredients: [
      flag(PZINC, 'Hypromellose (capsule)', 'cleared', 'hpmc'),
      flag(PZINC, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PZINC, 'Ascorbyl Palmitate', 'cleared', 'ascorbyl'),
    ],
    verdict: 'clean',
    honestNote: NOTE_ZINC,
    sourcesGeneral: [
      't83u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/zinc-breakthrough lists the 60 capsules at $21.99 and in stock. The facts image is the 60-capsule panel. Serving 1 capsule. Servings per container 60. Other ingredients: Hypromellose (capsule), Microcrystalline Cellulose, Ascorbyl Palmitate. Counted Limited tokens: none. The variant barcode field is empty. Missing UPC. No code was invented. The 30-capsule variant is on the same page at $13.99. The only facts image prints 60 servings, so the 30-count is not this row.',
    ],
  }),
  row({
    id: 'bioptimizers-b290-stress-guardian-45',
    productName: 'BiOptimizers Stress Guardian (45 capsules)',
    brand: 'BiOptimizers',
    category: 'Sleep',
    formulaId: 'bioptimizers-b290-stress-guardian-45',
    form: 'capsule',
    barcode: '850018116633',
    activeIngredients: [
      {
        name: 'Proprietary Blend (Eleutherococcus root/stem, Astragalus root, Reishi fruiting bodies, Fo-Ti cured root tuber, Goji fruit, Licorice root/rhizome, Schisandra fruit, Asian Ginseng root, Tienchi Ginseng root, Chinese Sage root/rhizome, Kudzu root, Chinese Peony root, Cordyceps fruiting bodies, Rhodiola whole plant)',
        strength: '2 g',
      },
    ],
    inactiveIngredients: [flag(PSTRESS, 'Hypromellose (capsule)', 'cleared', 'hpmc')],
    verdict: 'clean',
    honestNote: NOTE_STRESS,
    sourcesGeneral: [
      't83u. BiOptimizers brand page https://bioptimizers.com/products/stress-guardian prints Other Ingredients: Hypromellose capsule. The in-stock V1 listing https://bioptimizers.com/products/stress-guardian-v1 is 45 capsules at $30. Vitacost https://www.vitacost.com/products/bioptimizers-stress-guardian-45-veggie-caps-145510 lists the 45 veggie caps at $27.99, Version 1.0, serving 3 capsules, 15 servings, proprietary blend 2 g, other ingredients Hypromellose (capsule), UPC 850018116633. Counted Limited tokens: none. Not bioptimizers-b281-stress-guardian-90.',
    ],
  }),
  row({
    id: 'herbs-b290-daily-peace-gummies-30',
    productName: 'Herbs Etc. Daily Peace Infused Herbal Gummies (30 gummies)',
    brand: 'Herbs Etc.',
    category: 'Sleep',
    formulaId: 'herbs-b290-daily-peace-gummies-30',
    form: 'gummy',
    activeIngredients: [
      { name: 'Sodium (as sodium citrate)', strength: '15 mg' },
      {
        name: 'Daily Peace Herbal Blend (Lion’s Mane 8:1, Cordyceps 8:1, fresh Milky Oats, Reishi 16:1, Maitake 8:1, Shiitake 8:1)',
        strength: '199 mg',
      },
    ],
    inactiveIngredients: [
      flag(PPEACE, 'Organic Soluble Tapioca Fiber', 'cleared', 'tapiocaFiber'),
      flag(PPEACE, 'Organic Cane Sugar', 'cleared', 'cane'),
      flag(PPEACE, 'Organic Flavors', 'limited', 'flavors'),
      flag(PPEACE, 'Citric Acid', 'cleared', 'citric'),
      flag(PPEACE, 'Organic Spirulina Extract (color)', 'moderate', 'spirulina'),
      flag(PPEACE, 'Organic Fruit & Vegetable Juice (color)', 'cleared', 'juice'),
      flag(PPEACE, 'Water', 'cleared', 'water'),
    ],
    verdict: 'caution',
    honestNote: NOTE_GUMMY,
    sourcesGeneral: [
      't83u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/daily-peace-infused-herbal-gummies-30-ct lists 30 ct at $29.99 and in stock. Serving 1 gummy. Servings per container 30. Other ingredients: Organic Soluble Tapioca Fiber, Organic Cane Sugar, Organic Flavors, Citric Acid, Organic Spirulina Extract (color), Organic Fruit & Vegetable Juice (color), Water. Counted Limited token: Organic Flavors. That is one, so this is not a 3+ stack. Organic spirulina extract (color) is Caution and does not stack. The variant barcode field is empty. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'herbs-b290-deep-sleep-gummies-30',
    productName: 'Herbs Etc. Deep Sleep Infused Herbal Gummies (30 gummies)',
    brand: 'Herbs Etc.',
    category: 'Sleep',
    formulaId: 'herbs-b290-deep-sleep-gummies-30',
    form: 'gummy',
    activeIngredients: [
      { name: 'Sodium (as sodium citrate)', strength: '15 mg' },
      { name: 'Reishi (fruiting body) 16:1 extract', strength: '63 mg' },
      {
        name: 'Deep Sleep Herbal Concentrate (fresh California poppy, fresh Valerian root, fresh Passionflower, fresh Chamomile, fresh Lemon balm, fresh Milky Oat seed, Orange peel)',
        strength: '41 mg',
      },
    ],
    inactiveIngredients: [
      flag(PSLEEP, 'Organic Soluble Tapioca Fiber', 'cleared', 'tapiocaFiber'),
      flag(PSLEEP, 'Organic Cane Sugar', 'cleared', 'cane'),
      flag(PSLEEP, 'Organic Flavors', 'limited', 'flavors'),
      flag(PSLEEP, 'Citric Acid', 'cleared', 'citric'),
      flag(PSLEEP, 'Organic Spirulina Extract (color)', 'moderate', 'spirulina'),
      flag(PSLEEP, 'Organic Fruit & Vegetable Juice (color)', 'cleared', 'juice'),
      flag(PSLEEP, 'Water', 'cleared', 'water'),
    ],
    verdict: 'caution',
    honestNote: NOTE_GUMMY,
    sourcesGeneral: [
      't83u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/deep-sleep-infused-herbal-gummies-30-ct lists 30 ct at $29.99 and in stock. Serving 1 gummy. Servings per container 30. Other ingredients match Daily Peace: Organic Soluble Tapioca Fiber, Organic Cane Sugar, Organic Flavors, Citric Acid, Organic Spirulina Extract (color), Organic Fruit & Vegetable Juice (color), Water. Counted Limited token: Organic Flavors. That is one, so this is not a 3+ stack. The variant barcode field is empty. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'herbs-b290-menopautonic-liquid-2',
    productName: 'Herbs Etc. Menopautonic Classic Liquid Extract (2 oz)',
    brand: 'Herbs Etc.',
    category: 'Vitamins',
    formulaId: 'herbs-b290-menopautonic-liquid-2',
    form: 'liquid',
    activeIngredients: [
      {
        name: 'Proprietary Extract Blend (Dong Quai cured root, Chastetree berry, fresh Hawthorn leaf and flower, fresh Motherwort, Licorice root, fresh Passionflower, Black Cohosh root, Siberian Eleuthero root, Pipsissewa, cultivated American Ginseng root)',
        strength: '1 mL',
      },
    ],
    inactiveIngredients: [
      flag(PMENO, 'Alcohol', 'limited', 'alcohol'),
      flag(PMENO, 'Purified Water', 'cleared', 'water'),
      flag(PMENO, 'Vegetable Glycerine', 'cleared', 'glycerine'),
    ],
    verdict: 'caution',
    honestNote: NOTE_MENO,
    sourcesGeneral: [
      't83u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/menopautonic lists the 2 oz liquid at $29.98 and in stock. SKU 765704120026 was not copied. The barcode field is empty. Serving 30 drops. Servings per container about 79. Other ingredients: US Pharmacopoeial alcohol (57-67% by volume), purified water, vegetable glycerine. The inactive is stored as Alcohol. The percent is the vehicle strength. Counted Limited token: alcohol. That is one, so this is not a 3+ stack. Missing UPC. No code was invented. Not herbs-b283-menopautonic-softgels-60ct or herbs-b283-menopautonic-softgels-120ct.',
    ],
  }),
  row({
    id: 'hyalogic-b290-synthovial-seven',
    productName: 'Hyalogic Synthovial Seven Joint Support (1 oz)',
    brand: 'Hyalogic',
    category: 'Vitamins',
    formulaId: 'hyalogic-b290-synthovial-seven',
    form: 'liquid',
    activeIngredients: [{ name: 'Hyaluronic Acid', strength: '10 mg' }],
    inactiveIngredients: [flag(PSYN, 'Normal Saline', 'cleared', 'saline')],
    verdict: 'clean',
    honestNote: NOTE_SYN,
    sourcesGeneral: [
      't83u. Hyalogic brand page is the single source. https://hyalogic.com/products/synthovial-seven-joint-support lists the 1 oz liquid at $39.95 and in stock. The facts image reads Serving Size 1 mL (full dropper), Servings per Container 30, Hyaluronic Acid 10 mg, Other Ingredients: Normal Saline. Normal Saline is the t83u Cleared lock. Counted Limited tokens: none. The variant barcode field is empty. Missing UPC. No code was invented. Not hyalogic-b282-joint-liquid. Synthovial Seven Plus is a kit and is not this row.',
    ],
  }),
  row({
    id: 'hyalogic-b290-collagen-peptides',
    productName: 'Hyalogic Collagen Peptides Powder (6.4 oz)',
    brand: 'Hyalogic',
    category: 'Vitamins',
    formulaId: 'hyalogic-b290-collagen-peptides',
    form: 'powder',
    activeIngredients: [
      { name: 'Hydrolyzed Collagen Powder Type 1 & 3', strength: '5 g' },
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '60 mg' },
      { name: 'Hyaluronic Acid (as Sodium Hyaluronate)', strength: '40 mg' },
      { name: 'Zinc (as Zinc Oxide)', strength: '5 mg' },
      { name: 'Vitamin B6 (as Pyridoxine)', strength: '2 mg' },
      { name: 'Copper (as Copper Chelate)', strength: '1.5 mg' },
      { name: 'Vitamin B12 (as Cyanocobalamin)', strength: '0.4 mcg' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: NOTE_COL,
    sourcesGeneral: [
      't83u. Hyalogic brand page https://hyalogic.com/products/collagen-peptides-powder lists the 6.4 oz powder at $29.95 and in stock. Serving 1 scoop (6 g). Servings per container 30. The facts list hydrolyzed collagen 5 g, vitamin C 60 mg, hyaluronic acid 40 mg, zinc 5 mg, vitamin B6 2 mg, copper 1.5 mg, and vitamin B12 0.4 mcg. The brand back image did not OCR. Natural Health Co. https://www.nhc.com/products/ha-collagen-peptides-by-hyalogic and PureFormulas https://www.pureformulas.com/product/ha-collagen-powder-hyaluronic-acid-with-collagen-peptides-by-hyalogic/1000046166 both print Other Ingredients: None for this 6.4 oz powder. Counted Limited tokens: none. The variant barcode field is empty. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'quantum-b290-superlysine-90',
    productName: 'Quantum Health SuperLysine+ (90 tablets)',
    brand: 'Quantum Health',
    category: 'Immune Support',
    formulaId: 'quantum-b290-superlysine',
    form: 'tablet',
    barcode: '046985001106',
    activeIngredients: SL_ACTIVES,
    inactiveIngredients: SL_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_SL,
    sourcesGeneral: [
      't83u. Quantum Health brand page https://quantumhealth.com/products/superlysine-advanced-lysine-supplement lists the 90 count at $11.69 and in stock. Serving 3 tablets. Servings per container 30. Other ingredients: Cellulose, Coating (Sodium Carboxymethylcellulose, Dextrin, Dextrose, Medium Chain Triglycerides (vegetable), Sodium Citrate), Stearic Acid, Silicon Dioxide, Croscarmellose Sodium, Wax. Vitacost https://www.vitacost.com/products/quantum-health-superlysine-immune-support-90-tablets-6689 lists the same line and UPC 046985001106. iHerb https://www.iherb.com/pr/quantum-health-superlysine-immune-support-90-tablets/6689 is in stock and prints the same line. Counted Limited token: medium chain triglycerides (vegetable). That is one, so this is not a 3+ stack. The 180-count is a separate row.',
    ],
  }),
  row({
    id: 'quantum-b290-superlysine-180',
    productName: 'Quantum Health SuperLysine+ (180 tablets)',
    brand: 'Quantum Health',
    category: 'Immune Support',
    formulaId: 'quantum-b290-superlysine',
    form: 'tablet',
    activeIngredients: SL_ACTIVES,
    inactiveIngredients: SL_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_SL,
    sourcesGeneral: [
      't83u. Quantum Health brand page https://quantumhealth.com/products/superlysine-advanced-lysine-supplement lists the 180 count at $19.19 and in stock. Serving 3 tablets. Servings per container 60. The other-ingredient line is the same line as the 90-count. Counted Limited token: medium chain triglycerides (vegetable). That is one, so this is not a 3+ stack. The variant barcode field is empty. Missing UPC. No code was invented. Not quantum-b290-superlysine-90.',
    ],
  }),
  row({
    id: 'quantum-b290-migshield-60',
    productName: 'Quantum Health MigShield (60 tablets)',
    brand: 'Quantum Health',
    category: 'Vitamins',
    formulaId: 'quantum-b290-migshield-60',
    form: 'tablet',
    barcode: '046985003216',
    activeIngredients: [
      { name: 'Riboflavin', strength: '200 mg' },
      { name: 'Magnesium (as magnesium oxide and citrate)', strength: '200 mg' },
      { name: 'Coenzyme Q10 (ubiquinone)', strength: '75 mg' },
    ],
    inactiveIngredients: [
      flag(PMIG, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PMIG, 'Croscarmellose Sodium', 'cleared', 'croscarm'),
      flag(PMIG, 'Stearic Acid', 'cleared', 'stearic'),
      flag(PMIG, 'Silicon Dioxide', 'limited', 'silica'),
      flag(PMIG, 'Magnesium Stearate (vegetable source)', 'cleared', 'magStearate'),
      flag(PMIG, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PMIG, 'Sunflower Lecithin', 'cleared', 'lecithin'),
      flag(PMIG, 'Palm Oil', 'cleared', 'palm'),
      flag(PMIG, 'Guar Gum', 'cleared', 'guar'),
    ],
    verdict: 'caution',
    honestNote: NOTE_MIG,
    sourcesGeneral: [
      't83u. Quantum Health brand page https://quantumhealth.com/products/migshield lists MigShield at $30.59 and in stock. SKU F-MIGSH60. Serving 1 tablet. Adults take 1 tablet twice daily. Other ingredients: Microcrystalline Cellulose, Croscarmellose Sodium, Stearic Acid, Silicon Dioxide, Magnesium Stearate (vegetable source), Maltodextrin, Sunflower Lecithin, Palm Oil, Guar Gum. Vitacost https://www.vitacost.com/products/quantum-health-migshield-60-tablets-84020 lists 60 tablets, the same line, and UPC 046985003216. Counted Limited token: maltodextrin. That is one, so this is not a 3+ stack. Palm oil is in a tablet, not a gummy base. Natural Health Co. https://www.nhc.com/products/migshield-by-quantum-health prints the same line and 60 servings.',
    ],
  }),
];

const ROWS = BATCH290_KYR6D_T83U;
const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: string; barcode: string }> = {
  'bioptimizers-b290-zinc-breakthrough-60': { verdict: 'clean', cause: 'clean', counted: '', note: NOTE_ZINC, barcode: '' },
  'bioptimizers-b290-stress-guardian-45': { verdict: 'clean', cause: 'clean', counted: '', note: NOTE_STRESS, barcode: '850018116633' },
  'herbs-b290-daily-peace-gummies-30': { verdict: 'caution', cause: 'limited_1_2', counted: 'Organic Flavors', note: NOTE_GUMMY, barcode: '' },
  'herbs-b290-deep-sleep-gummies-30': { verdict: 'caution', cause: 'limited_1_2', counted: 'Organic Flavors', note: NOTE_GUMMY, barcode: '' },
  'herbs-b290-menopautonic-liquid-2': { verdict: 'caution', cause: 'limited_1_2', counted: 'Alcohol', note: NOTE_MENO, barcode: '' },
  'hyalogic-b290-synthovial-seven': { verdict: 'clean', cause: 'clean', counted: '', note: NOTE_SYN, barcode: '' },
  'hyalogic-b290-collagen-peptides': { verdict: 'clean', cause: 'clean', counted: '', note: NOTE_COL, barcode: '' },
  'quantum-b290-superlysine-90': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Medium Chain Triglycerides (vegetable)',
    note: NOTE_SL,
    barcode: '046985001106',
  },
  'quantum-b290-superlysine-180': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Medium Chain Triglycerides (vegetable)',
    note: NOTE_SL,
    barcode: '',
  },
  'quantum-b290-migshield-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Maltodextrin', note: NOTE_MIG, barcode: '046985003216' },
};

if (ROWS.length !== 10) throw new Error(`batch290 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch290 unexpected id ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || mapped.verdict !== expected.verdict) {
    throw new Error(`batch290 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${mapped.verdict}`);
  }
  const counted = mapped.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch290 stack ${record.id} ${counted}`);
  if (mapped.honestNote !== expected.note) throw new Error(`batch290 note ${record.id} ${JSON.stringify(mapped.honestNote)}`);
  if ((mapped.barcode ?? '') !== expected.barcode) throw new Error(`batch290 upc ${record.id} ${mapped.barcode}`);
  if (record.id === 'quantum-b290-migshield-60') {
    const formNote = contradictionHonestNote(record);
    if (!formNote || !expected.note.startsWith(formNote)) throw new Error(`batch290 migshield form note ${formNote}`);
  } else if (contradictionHonestNote(record) || limitedStackHonestNoteIfAny(record.inactiveIngredients)) {
    throw new Error(`batch290 unexpected auto note ${record.id}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch290 blank why ${record.id} ${ingredient.name}`);
  }
}
