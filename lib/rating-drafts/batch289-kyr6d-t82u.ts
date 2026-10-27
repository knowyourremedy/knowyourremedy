// DRAFT / not verified / batch 289 KYR6-d (t82u).
// Brand page is the single source. A pack is here only when that page shows the
// 1-pack for sale and every other-ingredient token is already locked.
// Missing UPCs stay empty. No brand is closed. Pet packs stay parked.
// Not in this file: Bach (panel not read; Nelsons feed cutoff). Good Day Kids Sleep 8
// (brand page sold out). Kids Sleep with Valerian 50 (Color Added vs Colored with
// Red Cabbage Color). Herbs Etc. gummies, mint drops, and Menopautonic liquid
// (panel not read; barcodes empty). Hyalogic cosmetics, HylaMints, collagen powder,
// Synthovial Seven (Normal Saline unlocked), Synthovial Seven Plus (kit), Hyalun PRO
// (equine, parked). BiOptimizers packs whose facts image was not read. Quantum packs
// whose facts image was not read. Blood Pressure Formula 60 (only the 120 facts
// image was on the page). Hair ReVive 120 stays held.

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
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin). Non-GMO Glycerin is this token.',
  almond:
    'Methodology §5 Cleared (almond butter). Non-GMO Almond Butter maps here (t55u). Named food.',
  water: 'Methodology §5 Cleared (water / purified water).',
  vanilla:
    'Methodology §5 Cleared (pure vanilla extract — t50u). The panel prints Vanilla Extract alone. No optional ingredients are declared inside that token.',
  lecithin: 'Methodology §5 Cleared (sunflower lecithin / lecithin).',
  glucose: 'Methodology §5 Cleared (glucose syrup / cane sugar, glucose syrup, tapioca syrup).',
  sugar: 'Methodology §5 Caution (bare sugar). Bare Sugar stays Caution. Not Cleared cane sugar.',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers and buffers).',
  pectin: 'Methodology §5 Cleared (pectin).',
  mct:
    'Methodology §5 Limited (unlabeled MCT / MCT in a gummy with no plant source — t132u). Counts toward the t137u stack. Not Cleared MCT oil.',
  mctCap:
    'Methodology §5 Limited (Medium Chain Triglycerides when no plant source is named — t102u). Counts toward the t137u stack. Not Cleared named plant-source MCT.',
  phosphoric: 'Methodology §5 Caution (phosphoric acid). Does not count toward the t137u stack.',
  raspberry:
    'Methodology §5 Limited (t54u natural-flavor rule). natural raspberry flavor is a documented wording with a Limited carrier. Counts toward the t137u stack.',
  vegOil:
    'Methodology §5 Avoid (vegetable oil as the base of a gummy, lozenge, or chew). High. Not the capsule-fill form.',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — Oct 15, 2026).',
  carnauba: 'Methodology §5 Cleared (carnauba wax — t133u).',
  riceMalt:
    'Methodology §5 Limited (rice maltodextrin — t16u). Counts toward the t137u stack. Not generic maltodextrin.',
  vegCapNamed:
    'Methodology §5 Cleared (vegetable capsule (hypromellose, water) — t120u). Named hypromellose shell.',
  vegCap:
    'Methodology §5 Cleared (vegetable capsule — t130u unnamed rule). A named hypromellose shell is Cleared, so the unnamed shell is not docked.',
  maltodextrin:
    'Methodology §5 Limited (maltodextrin). The parenthesis names non-GMO corn. It is not tapioca maltodextrin. Counts toward the t137u stack.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  riceHull: 'Methodology §5 Cleared (rice hull extract — t120u rice-hull family).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap). Does not count toward the t137u stack.',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate / mixed-tocopherols antioxidant).',
  riceFiber:
    'Methodology §5 Cleared (rice fiber — t42u; same grade as Organic Rice Fiber; rice-hull family).',
  riceExtract:
    'Methodology §5 Limited (rice extract blend — unspecified rice extract). Counts toward the t137u stack. Not named rice hull, bran, or concentrate.',
} as const;

type MethKey = keyof typeof S;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${S[meth]}` };
}

function finish(record: RatingRecord): RatingRecord {
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

const PCOLO =
  'Lemme brand page. https://lemmelive.com/products/lemme-colostrum-liquid. The 1-pack is in stock at $25. Serving 1 tablespoon (15 mL). Servings per container 15. Vitamin E, MCT Oil, bovine colostrum, lactoferrin, and phosphatidylcholine are the actives and are not graded. The 2-pack and the 3-pack are multipacks and are not this row. t82u brand-page single source.';
const PSERG =
  'RidgeCrest Herbals brand page. https://rcherbals.com/products/serenizen-gummies. The facts image RCH-Products-SereniZen-Gummies-Sup-Facts-230920-White. 60 gummies. The 1-gummy column is 60 servings for adults and children 4 and older. The herbs, GABA, and L-theanine are the actives and are not graded. t82u brand-page single source.';
const PBELLY =
  'RidgeCrest Herbals brand page. https://rcherbals.com/products/belly-be-happy. The facts image. Serving 2 capsules. Servings per container 30. The herbal blend and the probiotic blend are the actives and are not graded. t82u brand-page single source.';
const PBSUG =
  'RidgeCrest Herbals brand page. https://rcherbals.com/products/blood-sugar-balance. The facts image. Serving 2 capsules. Servings per container 60. The bottle is 120 capsules. Calcium and the herbal blend are the actives and are not graded. t82u brand-page single source.';
const PBP =
  'RidgeCrest Herbals brand page. https://rcherbals.com/products/blood-pressure-formula. The facts image is the 120-count (60 servings). Serving 2 capsules. The herbal blend is the active and is not graded. The 60-count is not this row. t82u brand-page single source.';
const PKID =
  'RidgeCrest Herbals brand page. https://rcherbals.com/products/kidneyaid. The facts image. Serving 2 capsules. Servings per container 30. The bottle is 60 capsules. Magnesium, chloride, the herbal blend, and ConcenTrace are on the Supplement Facts and are not graded. t82u brand-page single source.';
const PSLEEP =
  'BiOptimizers brand page. https://bioptimizers.com/products/sleep-breakthrough. The 60-capsule facts image. Serving 2 capsules. Servings per container 30. The minerals, amino acids, magnolia bark, and apigenin are the actives and are not graded. t82u brand-page single source.';
const PBERB =
  'BiOptimizers brand page. https://bioptimizers.com/products/berberine-breakthrough. The 60-capsule facts image. Serving 2 capsules. Servings per container 30. Biotin, chromium, and the herbal blend are the actives and are not graded. t82u brand-page single source.';

export const BATCH289_KYR6D_T82U: RatingRecord[] = [
  row({
    id: 'lemme-b289-colostrum-liquid',
    productName: 'Lemme Colostrum Liquid',
    brand: 'Lemme',
    category: 'Immune Support',
    formulaId: 'lemme-b289-colostrum-liquid',
    form: 'liquid',
    activeIngredients: [
      { name: 'Vitamin E (as D-Alpha Tocopherol)', strength: '7.5 mg' },
      { name: 'Medium Chain Triglycerides (MCT Oil)', strength: '3 g' },
      { name: 'Bovine Colostrum', strength: '1 g' },
      { name: 'Lactoferrin', strength: '75 mg' },
      { name: 'Phosphatidylcholine', strength: '10 mg' },
    ],
    inactiveIngredients: [
      flag(PCOLO, 'Non-GMO Glycerin', 'cleared', 'glycerin'),
      flag(PCOLO, 'Non-GMO Almond Butter', 'cleared', 'almond'),
      flag(PCOLO, 'Water', 'cleared', 'water'),
      flag(PCOLO, 'Vanilla Extract', 'cleared', 'vanilla'),
      flag(PCOLO, 'Sunflower Lecithin', 'cleared', 'lecithin'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't82u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-colostrum-liquid lists the 1-pack in stock at $25. SKU LLCO108. Serving 1 tablespoon (15 mL). Servings per container 15. Adults, take 1 tablespoon daily. Other ingredients: Non-GMO Glycerin, Non-GMO Almond Butter, Water, Vanilla Extract, Sunflower Lecithin. Contains tree nuts (almonds) and dairy. Non-GMO Glycerin is glycerin, Cleared. Non-GMO Almond Butter is the t55u Cleared lock. Water is Cleared. Vanilla Extract is the t50u pure vanilla extract lock. The token does not declare glycerin, sugar, or propylene glycol inside it. Sunflower lecithin is Cleared. MCT Oil is a Supplement Facts active and is not graded. Counted Limited tokens: none. No honest note. The variant barcode field is empty. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row. This is the current in-stock 1-pack. The t58u Coming Soon close is not rewritten.',
    ],
  }),
  row({
    id: 'ridgecrest-b289-serenizen-gummies-60',
    productName: 'RidgeCrest Herbals SereniZen Gummies (60 gummies)',
    brand: 'RidgeCrest Herbals',
    category: 'Sleep',
    formulaId: 'ridgecrest-b289-serenizen-gummies-60',
    form: 'gummy',
    audience: 'kids',
    minAge: 4,
    activeIngredients: [
      {
        name: 'Adaptogenic Stress Relief Blend (Ashwagandha Root extract, Lemon Balm Leaf extract, Chamomile Flower extract)',
        strength: '475 mg',
      },
      { name: 'GABA (Gamma Aminobutyric Acid)', strength: '50 mg' },
      { name: 'L-Theanine', strength: '50 mg' },
    ],
    inactiveIngredients: [
      flag(PSERG, 'Glucose syrup', 'cleared', 'glucose'),
      flag(PSERG, 'Sugar', 'moderate', 'sugar'),
      flag(PSERG, 'Citric Acid', 'cleared', 'citric'),
      flag(PSERG, 'Pectin', 'cleared', 'pectin'),
      flag(PSERG, 'MCT', 'limited', 'mct'),
      flag(PSERG, 'Phosphoric Acid', 'moderate', 'phosphoric'),
      flag(PSERG, 'Natural Raspberry Flavor', 'limited', 'raspberry'),
      flag(PSERG, 'Vegetable Oil', 'high', 'vegOil'),
      flag(PSERG, 'Carrot Juice Concentrate', 'cleared', 'juice'),
      flag(PSERG, 'Blueberry Juice Concentrate', 'cleared', 'juice'),
      flag(PSERG, 'Carnauba Wax', 'cleared', 'carnauba'),
    ],
    verdict: 'avoid',
    honestNote:
      'Avoid from vegetable oil in the gummy. Counted Limited tokens: MCT and natural raspberry flavor. That is two, so this is not a 3+ stack. Sugar and phosphoric acid are Caution and do not stack. Glucose syrup, citric acid, pectin, carrot juice concentrate, blueberry juice concentrate, and carnauba wax are Cleared.',
    sourcesGeneral: [
      't82u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/serenizen-gummies lists 60 gummies / 60 servings at $29.99 and in stock. The facts image is the panel. Other ingredients: Glucose syrup, sugar, citric acid, pectin, MCT, phosphoric acid, natural raspberry flavor, vegetable oil, carrot juice concentrate, blueberry juice concentrate, carnauba wax. Vegetable oil in a gummy is Avoid. Counted Limited tokens: MCT and natural raspberry flavor. That is two, so this is not a 3+ stack. Sugar and phosphoric acid are Caution and do not stack. Glucose syrup, citric acid, pectin, the juice concentrates, and carnauba wax are Cleared. No honest note. The 1-gummy column is the 60-serving line for ages 4 and older. The 2-gummy column is ages 14 and older and is the same formula. Missing UPC. The variant barcode field is empty. Not ridgecrest-b282-serenizen-60.',
    ],
  }),
  row({
    id: 'ridgecrest-b289-belly-be-happy-60',
    productName: 'RidgeCrest Herbals Belly Be Happy (60 capsules)',
    brand: 'RidgeCrest Herbals',
    category: 'Digestive',
    formulaId: 'ridgecrest-b289-belly-be-happy-60',
    form: 'capsule',
    minAge: 18,
    activeIngredients: [
      {
        name: 'Belly Be Happy Digestive-soothing Herbal Blend (Marshmallow root, Slippery Elm bark, Ginger root, Peppermint leaf)',
        strength: '370 mg',
      },
      {
        name: 'Belly Be Happy Microbiome-Support Blend (Bacillus subtilis DE111, Bacillus coagulans)',
        strength: '50 mg',
      },
    ],
    inactiveIngredients: [
      flag(PBELLY, 'Rice Maltodextrin', 'limited', 'riceMalt'),
      flag(PBELLY, 'Vegetable Capsule (hypromellose, water)', 'cleared', 'vegCapNamed'),
      flag(PBELLY, 'Medium-chain triglycerides', 'limited', 'mctCap'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't82u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/belly-be-happy lists 60 capsules / 30 servings at $29.99 and in stock. Serving 2 capsules. Other ingredients: Rice Maltodextrin, Vegetable Capsule (hypromellose, water), Medium-chain triglycerides. Counted Limited tokens: rice maltodextrin and medium-chain triglycerides. That is two, so this is not a 3+ stack. The capsule names hypromellose and water and is Cleared. No honest note. Missing UPC. The variant barcode field is empty.',
    ],
  }),
  row({
    id: 'ridgecrest-b289-blood-sugar-120',
    productName: 'RidgeCrest Herbals Blood Sugar Balance (120 capsules)',
    brand: 'RidgeCrest Herbals',
    category: 'Vitamins',
    formulaId: 'ridgecrest-b289-blood-sugar-120',
    form: 'capsule',
    minAge: 18,
    activeIngredients: [
      { name: 'Calcium (from Calcium sulfate)', strength: '94 mg' },
      {
        name: 'Blood Sugar Balance Herbal Blend (Oryza/Non-glutinous Rice, Anemarrhena, Siberian Ginseng root, Chinese Licorice root)',
        strength: '574 mg',
      },
    ],
    inactiveIngredients: [
      flag(PBSUG, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PBSUG, 'Silica', 'limited', 'silica'),
      flag(PBSUG, 'Maltodextrin (from non-GMO corn)', 'limited', 'maltodextrin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't82u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/blood-sugar-balance lists 120 capsules / 60 servings at $29.99 and in stock. Serving 2 capsules. Other ingredients: vegetable capsule, silica, maltodextrin (from non-GMO corn). Counted Limited token: maltodextrin (from non-GMO corn). That is one, so this is not a 3+ stack. Silica is the 0-pt cap and does not stack. Vegetable capsule is Cleared under the t130u unnamed rule. No honest note. Missing UPC. The variant barcode field is empty.',
    ],
  }),
  row({
    id: 'ridgecrest-b289-blood-pressure-120',
    productName: 'RidgeCrest Herbals Blood Pressure Formula (120 capsules)',
    brand: 'RidgeCrest Herbals',
    category: 'Vitamins',
    formulaId: 'ridgecrest-b289-blood-pressure-120',
    form: 'capsule',
    minAge: 18,
    activeIngredients: [
      {
        name: 'Blood Pressure Herbal Blend (Gastrodia root, Eucommia bark, Achyranthes root, Chinese Skullcap root, Gardenia fruit, Fo-ti stem, Loranthus stem, Uncaria rhynchophylla stem, Chinese Motherwort herb, Siegesbeckia orientalis, Asian Water Plantain root, Poria)',
        strength: '965 mg',
      },
    ],
    inactiveIngredients: [
      flag(PBP, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PBP, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PBP, 'Rice Hull Extract', 'cleared', 'riceHull'),
      flag(PBP, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't82u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/blood-pressure-formula lists the 120 capsules / 60 servings at $44.99 and in stock. The facts image on that page is the 120-count. Serving 2 capsules. Other ingredients: Vegetable capsule, microcrystalline cellulose, rice hull extract, silica. Silica is the 0-pt cap. Counted Limited tokens: none. Rice hull extract is the named rice-hull form. The honest note is the named-rice note. Missing UPC. The 60-count is in stock at $24.99 and is not this row. Its facts image was not the image on the page.',
    ],
  }),
  row({
    id: 'ridgecrest-b289-kidneyaid-60',
    productName: 'RidgeCrest Herbals KidneyAid (60 capsules)',
    brand: 'RidgeCrest Herbals',
    category: 'Vitamins',
    formulaId: 'ridgecrest-b289-kidneyaid-60',
    form: 'capsule',
    minAge: 18,
    activeIngredients: [
      { name: 'Magnesium (from ConcenTrace Mineral Complex)', strength: '21 mg' },
      { name: 'Chloride (from ConcenTrace Mineral Complex)', strength: '51 mg' },
      {
        name: 'KidneyAid Herbal Blend (European Goldenrod flower, Fenugreek seed, Horsetail extract, Hydrangea root, Juniper berry, Plantain leaf)',
        strength: '1200 mg',
      },
      { name: 'ConcenTrace Mineral Complex', strength: '150 mg' },
    ],
    inactiveIngredients: [
      flag(PKID, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PKID, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PKID, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't82u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/kidneyaid lists 60 capsules / 30 servings at $24.99 and in stock. Serving 2 capsules. Other ingredients: Vegetable capsule, microcrystalline cellulose, silica. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Missing UPC. The variant barcode field is empty.',
    ],
  }),
  row({
    id: 'bioptimizers-b289-sleep-breakthrough-60',
    productName: 'BiOptimizers Sleep Breakthrough (60 capsules)',
    brand: 'BiOptimizers',
    category: 'Sleep',
    formulaId: 'bioptimizers-b289-sleep-breakthrough-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Vitamin B6 (as Pyridoxal-5-Phosphate)', strength: '2.4 mg' },
      { name: 'Magnesium (as Magnesium Glycinate)', strength: '35 mg' },
      { name: 'Zinc (as Zinc Picolinate)', strength: '1.5 mg' },
      { name: 'L-Glycine', strength: '588 mg' },
      { name: 'L-Taurine', strength: '200 mg' },
      { name: 'L-Theanine', strength: '200 mg' },
      { name: 'Magnolia Bark Extract (2% Honokiol + Magnolol)', strength: '75 mg' },
      { name: 'Apigenin', strength: '50 mg' },
    ],
    inactiveIngredients: [
      flag(PSLEEP, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(PSLEEP, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PSLEEP, 'Ascorbyl Palmitate', 'cleared', 'ascorbyl'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't82u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/sleep-breakthrough lists 60 capsules at $29.99 and in stock. The facts image is the panel. Serving 2 capsules. Servings per container 30. Other ingredients: Hypromellose (Capsule), Microcrystalline Cellulose, Ascorbyl Palmitate. Counted Limited tokens: none. No honest note. The variant barcode field is empty. Missing UPC. Not the Sleep Breakthrough Drink.',
    ],
  }),
  row({
    id: 'bioptimizers-b289-berberine-60',
    productName: 'BiOptimizers Berberine Breakthrough (60 capsules)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b289-berberine-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Biotin', strength: '2 mg' },
      { name: 'Chromium (as chromium picolinate)', strength: '400 mcg' },
      {
        name: 'Proprietary Blend (CyanthOx 30 sea buckthorn fruit extract, Irvingia gabonensis seed, Naringin, Benfotiamine, R-Alpha Lipoic Acid, Banaba leaf extract, Gymnema sylvestre leaf extract, Fucoxanthin 10%)',
        strength: '638 mg',
      },
      { name: 'Bitter Melon (fruit) Extract (10% charantin)', strength: '200 mg' },
      { name: 'GlucoVantage Dihydroberberine', strength: '100 mg' },
      { name: 'Cinnulin PF Cinnamon (bark) 20:1 Extract', strength: '100 mg' },
      { name: 'Innoslim (Panax notoginseng and Astragalus membranaceus)', strength: '75 mg' },
    ],
    inactiveIngredients: [
      flag(PBERB, 'Hypromellose (capsule)', 'cleared', 'hpmc'),
      flag(PBERB, 'Rice Fiber', 'cleared', 'riceFiber'),
      flag(PBERB, 'Rice Extract Blend', 'limited', 'riceExtract'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't82u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/berberine-breakthrough lists 60 capsules at $38.99 and in stock. The facts image is the panel. Serving 2 capsules. Servings per container 30. Other ingredients: Hypromellose (capsule), rice fiber, rice extract blend. Counted Limited token: rice extract blend. That is one, so this is not a 3+ stack. Rice fiber is the t42u Cleared rice-hull family. Hypromellose is Cleared. No honest note. The variant barcode field is empty. Missing UPC.',
    ],
  }),
];

const ROWS = BATCH289_KYR6D_T82U;
const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: boolean }> = {
  'lemme-b289-colostrum-liquid': { verdict: 'clean', cause: 'clean', counted: '', note: false },
  'ridgecrest-b289-serenizen-gummies-60': {
    verdict: 'avoid',
    cause: 'high',
    counted: 'MCT|Natural Raspberry Flavor',
    note: false,
  },
  'ridgecrest-b289-belly-be-happy-60': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Rice Maltodextrin|Medium-chain triglycerides',
    note: false,
  },
  'ridgecrest-b289-blood-sugar-120': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Maltodextrin (from non-GMO corn)',
    note: false,
  },
  'ridgecrest-b289-blood-pressure-120': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '', note: true },
  'ridgecrest-b289-kidneyaid-60': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '', note: false },
  'bioptimizers-b289-sleep-breakthrough-60': { verdict: 'clean', cause: 'clean', counted: '', note: false },
  'bioptimizers-b289-berberine-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Rice Extract Blend', note: false },
};

if (ROWS.length !== 8) throw new Error(`batch289 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch289 unexpected id ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || record.verdict !== expected.verdict) {
    throw new Error(`batch289 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch289 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  const serenizenNote =
    'Avoid from vegetable oil in the gummy. Counted Limited tokens: MCT and natural raspberry flavor. That is two, so this is not a 3+ stack. Sugar and phosphoric acid are Caution and do not stack. Glucose syrup, citric acid, pectin, carrot juice concentrate, blueberry juice concentrate, and carnauba wax are Cleared.';
  if (record.id === 'ridgecrest-b289-serenizen-gummies-60') {
    if (formNote || stackNote) throw new Error(`batch289 serenizen auto note ${formNote} ${stackNote}`);
    if (record.honestNote !== serenizenNote) throw new Error(`batch289 serenizen note ${JSON.stringify(record.honestNote)}`);
  } else if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch289 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  } else if (Boolean(record.honestNote) !== expected.note) {
    throw new Error(`batch289 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  if (record.id === 'ridgecrest-b289-blood-pressure-120' && !/rice hull/i.test(record.honestNote ?? '')) {
    throw new Error(`batch289 blood pressure note ${record.honestNote}`);
  }
  if (record.barcode) throw new Error(`batch289 upc invented ${record.id} ${record.barcode}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch289 blank why ${record.id} ${ingredient.name}`);
  }
}
