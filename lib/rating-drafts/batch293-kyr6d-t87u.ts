// DRAFT / not verified / batch 293 KYR6-d (t87u).
// Brand page is the single source when that page shows the 1-pack and the panel.
// Missing UPCs stay empty. No brand is closed. The Sprouts section is not edited.
// t87u requires a full honest note on every row.

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
  flavor:
    'Methodology §5 Limited (t54u natural-flavor rule). The panel prints Natural Flavors and does not name the flavor. Counts toward the t137u stack.',
  malic: 'Methodology §5 Cleared (malic acid).',
  gdl: 'Methodology §5 Cleared (Glucono delta lactone — t51u). Same substance as gluconolactone. Does not count toward the t137u stack.',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers and buffers).',
  glycine: 'Methodology §5 Cleared (L-Glycine — t84u). Amino acid. Does not count toward the t137u stack.',
  silica:
    'Methodology §5 Caution (organic bamboo extract — Sept 22, 2026). Silica (from Bamboo Shoot Extract) is the plant silica flow agent. It is not the exact silica cap. Does not count toward the t137u stack.',
  beet: 'Methodology §5 Cleared (beet root / beetroot powder, for color — Sept 22, 2026).',
  thaumatin:
    'Methodology §5 Cleared (Thaumatin (Katemfe Fruit Extract) — t87u). Named sweet protein from katemfe fruit. Does not count toward the t137u stack.',
  monk: 'Methodology §5 Cleared (monk fruit extract).',
  brazzein:
    'Methodology §5 Caution (Brazzein (Oubli Fruit Sweet Protein) — t84u). Sweet protein. Does not count toward the t137u stack.',
  seleno:
    'Methodology §5 Caution (L-Selenomethionine — t84u). Inactive on this panel. Does not count toward the t137u stack.',
  quercetin:
    'Methodology §5 Caution (Quercetin Dihydrate (from Sophora japonica Extract) — t84u). Inactive on this panel. Does not count toward the t137u stack.',
  licorice: 'Methodology §5 Cleared (licorice root / glycyrrhiza extract).',
  water: 'Methodology §5 Cleared (water / purified water).',
  glycerine: 'Methodology §5 Cleared (vegetable glycerine / glycerin).',
  mint:
    'Methodology §5 Caution (natural flavors (menthol¹, vanilla¹, peppermint¹, and spearmint¹ essential oils, and citral) — t87u). Essential-oil / scent-line rule. The superscript 1 means organic and does not change the grade. Does not count toward the t137u stack.',
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

const MINERALS = [
  { name: 'Niacin (as niacinamide)', strength: '9 mg NE' },
  { name: 'Vitamin B6 (as pyridoxal-5-phosphate)', strength: '0.68 mg' },
  { name: 'Vitamin B12 (as methylcobalamin)', strength: '0.95 mcg' },
  { name: 'Calcium (as calcium bisglycinate)', strength: '40 mg' },
  { name: 'Magnesium (as magnesium citrate, magnesium glycinate, magnesium malate, magnesium taurate)', strength: '50 mg' },
  { name: 'Zinc (as zinc picolinate)', strength: '2.2 mg' },
  { name: 'Copper (as copper bisglycinate chelate)', strength: '0.27 mg' },
  { name: 'Manganese (as manganese citrate)', strength: '0.06 mg' },
  { name: 'Chromium (as chromium picolinate)', strength: '36.5 mcg' },
  { name: 'Molybdenum (as molybdenum glycinate)', strength: '5 mcg' },
  { name: 'Chloride (from potassium chloride, sea salt)', strength: '690 mg' },
  { name: 'Sodium (from sea salt)', strength: '210 mg' },
  { name: 'Potassium (as potassium aspartate, potassium chloride, potassium gluconate)', strength: '610 mg' },
  { name: 'Ionic Trace Minerals', strength: '25 mg' },
  { name: 'OptiMSM (methylsulfonylmethane)', strength: '300 mcg' },
];

const CHLOR_ACTIVE = [
  { name: 'Sodium', strength: '4 mg' },
  { name: 'Copper', strength: '2 mcg' },
  {
    name: 'Chlorophyll (sodium copper chlorophyllins from European fescue leaf blade and/or alfalfa)',
    strength: '50 mg',
  },
];

const PTH =
  'BiOptimizers brand page. https://bioptimizers.com/products/electrolyte-breakthrough-packet. Thrive Lemonade facts image. Serving 1 stick packet (6.72 g). The 30-count image prints 30 servings. The minerals are actives and are not graded. t87u brand-page single source.';
const PTU =
  'BiOptimizers brand page. https://bioptimizers.com/products/electrolyte-breakthrough-30-servings-jar. Thrive Lemonade scoop facts image. Serving 1 scoop (6.72 g). Servings per container 30. Same other-ingredient line as the Thrive stick. The minerals are actives and are not graded. t87u brand-page single source.';
const PBE =
  'BiOptimizers brand page. https://bioptimizers.com/products/electrolyte-breakthrough-packet. Balanced Berry facts image. Serving 1 stick packet (6.72 g). The 30-count image prints 30 servings. The minerals are actives and are not graded. t87u brand-page single source.';
const PBT =
  'BiOptimizers brand page. https://bioptimizers.com/products/electrolyte-breakthrough-30-servings-jar. Balanced Berry facts image on the tub carousel. Serving on that image is 1 stick packet (6.72 g). The Thrive scoop panel on the same page is 1 scoop (6.72 g) and 30 servings. The minerals are actives and are not graded. t87u brand-page single source.';
const PTR =
  'BiOptimizers brand page. https://bioptimizers.com/products/electrolyte-breakthrough-packet. Tropical Bliss facts image. Serving 1 stick packet (6.72 g). The 30-count image prints 30 servings. The minerals are actives and are not graded. t87u brand-page single source.';
const PTT =
  'BiOptimizers brand page. https://bioptimizers.com/products/electrolyte-breakthrough-30-servings-jar. Tropical Bliss facts image on the tub carousel. Serving on that image is 1 stick packet (6.72 g). The Thrive scoop panel on the same page is 1 scoop (6.72 g) and 30 servings. The minerals are actives and are not graded. t87u brand-page single source.';
const PVA =
  'BiOptimizers brand page. https://bioptimizers.com/products/electrolyte-breakthrough-packet. Variety 12-count. One carton. Thrive Lemonade, Balanced Berry, and Tropical Bliss were each counted. Serving 1 stick packet (6.72 g). 12 servings. The stored inactive list is the Balanced Berry stick, which includes every token printed on any stick in the carton. t88u re-check of the t87u brand-page single source.';
const PCH =
  'Herbs Etc. brand page. https://herbsetc.com/products/chloroxygen-mint-alcohol-free. Supplement Facts. Serving 18 drops. Other ingredients: purified water, vegetable glycerine, and natural flavors (menthol¹, vanilla¹, peppermint¹, and spearmint¹ essential oils, and citral). The superscript 1 is the organic footnote. t87u brand-page single source.';

const NOTE_THRIVE =
  'Caution from one Limited token: natural flavors. That is one, so this is not a 3+ stack. Silica (from Bamboo Shoot Extract), brazzein (oubli fruit sweet protein), and L-selenomethionine are Caution and do not stack. Malic acid, glucono delta lactone, citric acid, L-glycine, beet root powder, thaumatin (katemfe fruit extract), and monk fruit extract are Cleared.';
const NOTE_BERRY =
  'Caution from one Limited token: natural flavors. That is one, so this is not a 3+ stack. Silica (from Bamboo Shoot Extract), brazzein (oubli fruit sweet protein), quercetin dihydrate (from Sophora japonica extract), and L-selenomethionine are Caution and do not stack. L-glycine, citric acid, malic acid, glucono delta lactone, beet root powder, licorice root powder, monk fruit extract, and thaumatin (katemfe fruit extract) are Cleared.';
const NOTE_TROPICAL =
  'Caution from one Limited token: natural flavors. That is one, so this is not a 3+ stack. Silica (from Bamboo Shoot Extract), brazzein (oubli fruit sweet protein), quercetin dihydrate (from Sophora japonica extract), and L-selenomethionine are Caution and do not stack. Citric acid, malic acid, glucono delta lactone, L-glycine, licorice root powder, monk fruit extract, and thaumatin (katemfe fruit extract) are Cleared. This flavor does not print beet root powder.';
const NOTE_VARIETY =
  'The carton holds three flavors. Each stick was counted on its own. Thrive Lemonade has one Limited token: natural flavors. Balanced Berry has one Limited token: natural flavors. Tropical Bliss has one Limited token: natural flavors. The only counting Limited token in the carton is natural flavors. That is one on every stick, so this is not a 3+ stack. The carton stays Caution. Balanced Berry and Tropical Bliss also print quercetin dihydrate (from Sophora japonica extract), which is Caution and does not stack. Thrive Lemonade does not print quercetin dihydrate or licorice root powder. Tropical Bliss does not print beet root powder. Silica (from Bamboo Shoot Extract), brazzein (oubli fruit sweet protein), and L-selenomethionine are on every flavor and are Caution and do not stack. L-glycine, citric acid, malic acid, glucono delta lactone, monk fruit extract, and thaumatin (katemfe fruit extract) are Cleared on every flavor. Beet root powder is Cleared on Thrive Lemonade and Balanced Berry. Licorice root powder is Cleared on Balanced Berry and Tropical Bliss.';
const NOTE_CHLOR =
  'natural flavors (menthol¹, vanilla¹, peppermint¹, and spearmint¹ essential oils, and citral) is Caution and does not stack. The superscript 1 means organic and does not change the grade. Purified water and vegetable glycerine are Cleared. Counted Limited tokens: none.';

function thriveFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Natural Flavors', 'limited', 'flavor'),
    flag(panel, 'Malic Acid', 'cleared', 'malic'),
    flag(panel, 'Glucono Delta Lactone', 'cleared', 'gdl'),
    flag(panel, 'Citric Acid', 'cleared', 'citric'),
    flag(panel, 'L-Glycine', 'cleared', 'glycine'),
    flag(panel, 'Silica (from Bamboo Shoot Extract)', 'moderate', 'silica'),
    flag(panel, 'Beet Root Powder', 'cleared', 'beet'),
    flag(panel, 'Thaumatin (Katemfe Fruit Extract)', 'cleared', 'thaumatin'),
    flag(panel, 'Monk Fruit Extract', 'cleared', 'monk'),
    flag(panel, 'Brazzein (Oubli Fruit Sweet Protein)', 'moderate', 'brazzein'),
    flag(panel, 'L-Selenomethionine', 'moderate', 'seleno'),
  ];
}

function berryFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'L-Glycine', 'cleared', 'glycine'),
    flag(panel, 'Citric Acid', 'cleared', 'citric'),
    flag(panel, 'Natural Flavors', 'limited', 'flavor'),
    flag(panel, 'Malic Acid', 'cleared', 'malic'),
    flag(panel, 'Glucono Delta Lactone', 'cleared', 'gdl'),
    flag(panel, 'Silica (from Bamboo Shoot Extract)', 'moderate', 'silica'),
    flag(panel, 'Beet Root Powder', 'cleared', 'beet'),
    flag(panel, 'Quercetin Dihydrate (from Sophora japonica Extract)', 'moderate', 'quercetin'),
    flag(panel, 'Licorice Root Powder', 'cleared', 'licorice'),
    flag(panel, 'Monk Fruit Extract', 'cleared', 'monk'),
    flag(panel, 'Thaumatin (Katemfe Fruit Extract)', 'cleared', 'thaumatin'),
    flag(panel, 'Brazzein (Oubli Fruit Sweet Protein)', 'moderate', 'brazzein'),
    flag(panel, 'L-Selenomethionine', 'moderate', 'seleno'),
  ];
}

function tropicalFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Citric Acid', 'cleared', 'citric'),
    flag(panel, 'Malic Acid', 'cleared', 'malic'),
    flag(panel, 'Natural Flavors', 'limited', 'flavor'),
    flag(panel, 'Glucono Delta Lactone', 'cleared', 'gdl'),
    flag(panel, 'Silica (from Bamboo Shoot Extract)', 'moderate', 'silica'),
    flag(panel, 'L-Glycine', 'cleared', 'glycine'),
    flag(panel, 'Quercetin Dihydrate (from Sophora japonica Extract)', 'moderate', 'quercetin'),
    flag(panel, 'Licorice Root Powder', 'cleared', 'licorice'),
    flag(panel, 'Monk Fruit Extract', 'cleared', 'monk'),
    flag(panel, 'Thaumatin (Katemfe Fruit Extract)', 'cleared', 'thaumatin'),
    flag(panel, 'Brazzein (Oubli Fruit Sweet Protein)', 'moderate', 'brazzein'),
    flag(panel, 'L-Selenomethionine', 'moderate', 'seleno'),
  ];
}

const CHLOR_FLAGS: IngredientFlag[] = [
  flag(PCH, 'Purified Water', 'cleared', 'water'),
  flag(PCH, 'Vegetable Glycerine', 'cleared', 'glycerine'),
  flag(
    PCH,
    'natural flavors (menthol¹, vanilla¹, peppermint¹, and spearmint¹ essential oils, and citral)',
    'moderate',
    'mint',
  ),
];

const MAG_NOTE =
  'The facts image prints magnesium 50 mg at 12% DV. Tesseract on the same line reads 90 mg. The 50 mg figure was graded. Zinc is 2.2 mg. Molybdenum is 5 mcg. Ionic trace minerals are 25 mg.';

export const BATCH293_KYR6D_T87U: RatingRecord[] = [
  row({
    id: 'bioptimizers-b293-electrolyte-thrive-packets-30',
    productName: 'BiOptimizers Electrolyte Breakthrough Thrive Lemonade Packets (30)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b293-electrolyte-thrive',
    form: 'packet',
    activeIngredients: MINERALS,
    inactiveIngredients: thriveFlags(PTH),
    verdict: 'caution',
    honestNote: NOTE_THRIVE,
    sourcesGeneral: [
      `t87u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/electrolyte-breakthrough-packet lists Thrive Lemonade 30-count at $55.00 and in stock. SKU 5130-EBLEMSTK30. The barcode field is empty. Serving 1 stick packet (6.72 g). Servings per container 30. Calories 10. Other ingredients: Natural Flavors, Malic Acid, Glucono Delta Lactone, Citric Acid, L-Glycine, Silica (from Bamboo Shoot Extract), Beet Root Powder, Thaumatin (Katemfe Fruit Extract), Monk Fruit Extract, Brazzein (Oubli Fruit Sweet Protein), L-Selenomethionine. ${MAG_NOTE} Counted Limited token: natural flavors. Missing UPC. No code was invented. Same formula as the Thrive tub.`,
    ],
  }),
  row({
    id: 'bioptimizers-b293-electrolyte-thrive-tub-30',
    productName: 'BiOptimizers Electrolyte Breakthrough Thrive Lemonade Tub (30 servings)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b293-electrolyte-thrive',
    form: 'powder',
    activeIngredients: MINERALS,
    inactiveIngredients: thriveFlags(PTU),
    verdict: 'caution',
    honestNote: NOTE_THRIVE,
    sourcesGeneral: [
      `t87u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/electrolyte-breakthrough-30-servings-jar lists the Thrive Lemonade tub at $41.99 and in stock. SKU 5137-EBLEM30S. The barcode field is empty. The scoop facts image prints Serving Size 1 Scoop (6.72 g) and Servings Per Container 30. Net wt 7.11 oz (201.6 g). The other-ingredient line matches the Thrive stick. The scoop panel says mix one scoop with 16 oz of water. ${MAG_NOTE} Counted Limited token: natural flavors. Missing UPC. No code was invented. Same formula as the Thrive 30-count packets.`,
    ],
  }),
  row({
    id: 'bioptimizers-b293-electrolyte-berry-packets-30',
    productName: 'BiOptimizers Electrolyte Breakthrough Balanced Berry Packets (30)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b293-electrolyte-berry',
    form: 'packet',
    activeIngredients: MINERALS,
    inactiveIngredients: berryFlags(PBE),
    verdict: 'caution',
    honestNote: NOTE_BERRY,
    sourcesGeneral: [
      `t87u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/electrolyte-breakthrough-packet lists Balanced Berry 30-count at $55.00 and in stock. SKU 5230-EBBRYSTK30. The barcode field is empty. Serving 1 stick packet (6.72 g). Servings per container 30. Calories 10. Other ingredients: L-Glycine, Citric Acid, Natural Flavors, Malic Acid, Glucono Delta Lactone, Silica (from Bamboo Shoot Extract), Beet Root Powder, Quercetin Dihydrate (from Sophora japonica Extract), Licorice Root Powder, Monk Fruit Extract, Thaumatin (Katemfe Fruit Extract), Brazzein (Oubli Fruit Sweet Protein), L-Selenomethionine. ${MAG_NOTE} Counted Limited token: natural flavors. Missing UPC. No code was invented. Same formula as the Balanced Berry tub.`,
    ],
  }),
  row({
    id: 'bioptimizers-b293-electrolyte-berry-tub-30',
    productName: 'BiOptimizers Electrolyte Breakthrough Balanced Berry Tub (30 servings)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b293-electrolyte-berry',
    form: 'powder',
    activeIngredients: MINERALS,
    inactiveIngredients: berryFlags(PBT),
    verdict: 'caution',
    honestNote: NOTE_BERRY,
    sourcesGeneral: [
      `t87u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/electrolyte-breakthrough-30-servings-jar lists the Balanced Berry tub at $41.99 and in stock. SKU 5244-EBBRY30S. The barcode field is empty. The tub carousel facts image for this flavor is the stick panel: Serving Size 1 Stick Packet (6.72 g), 30 servings, the same other-ingredient line as the Balanced Berry packets. The Thrive scoop panel on the same page prints 1 scoop (6.72 g) and 30 servings. The tub is 30 servings of that powder. ${MAG_NOTE} Counted Limited token: natural flavors. Missing UPC. No code was invented. Same formula as the Balanced Berry 30-count packets.`,
    ],
  }),
  row({
    id: 'bioptimizers-b293-electrolyte-tropical-packets-30',
    productName: 'BiOptimizers Electrolyte Breakthrough Tropical Bliss Packets (30)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b293-electrolyte-tropical',
    form: 'packet',
    activeIngredients: MINERALS,
    inactiveIngredients: tropicalFlags(PTR),
    verdict: 'caution',
    honestNote: NOTE_TROPICAL,
    sourcesGeneral: [
      `t87u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/electrolyte-breakthrough-packet lists Tropical Bliss 30-count at $55.00 and in stock. SKU 5330-EBPMANSTK30. The barcode field is empty. Serving 1 stick packet (6.72 g). Servings per container 30. Calories 5. Other ingredients: Citric Acid, Malic Acid, Natural Flavors, Glucono Delta Lactone, Silica (from Bamboo Shoot Extract), L-Glycine, Quercetin Dihydrate (from Sophora japonica Extract), Licorice Root Powder, Monk Fruit Extract, Thaumatin (Katemfe Fruit Extract), Brazzein (Oubli Fruit Sweet Protein), L-Selenomethionine. The full-image OCR skipped the zinc line. The mineral crop prints Zinc (as zinc picolinate) 2.2 mg. ${MAG_NOTE} Counted Limited token: natural flavors. Missing UPC. No code was invented. Same formula as the Tropical Bliss tub.`,
    ],
  }),
  row({
    id: 'bioptimizers-b293-electrolyte-tropical-tub-30',
    productName: 'BiOptimizers Electrolyte Breakthrough Tropical Bliss Tub (30 servings)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b293-electrolyte-tropical',
    form: 'powder',
    activeIngredients: MINERALS,
    inactiveIngredients: tropicalFlags(PTT),
    verdict: 'caution',
    honestNote: NOTE_TROPICAL,
    sourcesGeneral: [
      `t87u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/electrolyte-breakthrough-30-servings-jar lists the Tropical Bliss tub at $41.99 and in stock. SKU 5371-EBPMAN30S. The barcode field is empty. The tub carousel facts image for this flavor is the stick panel: Serving Size 1 Stick Packet (6.72 g), 30 servings, the same other-ingredient line as the Tropical Bliss packets. The Thrive scoop panel on the same page prints 1 scoop (6.72 g) and 30 servings. The tub is 30 servings of that powder. ${MAG_NOTE} Counted Limited token: natural flavors. Missing UPC. No code was invented. Same formula as the Tropical Bliss 30-count packets.`,
    ],
  }),
  row({
    id: 'bioptimizers-b293-electrolyte-variety-12',
    productName: 'BiOptimizers Electrolyte Breakthrough Variety Pack (12)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b293-electrolyte-variety-12',
    form: 'packet',
    activeIngredients: MINERALS,
    inactiveIngredients: berryFlags(PVA),
    verdict: 'caution',
    honestNote: NOTE_VARIETY,
    sourcesGeneral: [
      `t88u re-check. BiOptimizers brand page is the single source. https://bioptimizers.com/products/electrolyte-breakthrough-packet lists the Variety Pack 12-count at $24.99 and in stock. SKU 5999-EBVARIETYSTK12. The barcode field is empty. One carton, one row. Serving 1 stick packet (6.72 g). Servings per container 12. Thrive Lemonade, Balanced Berry, and Tropical Bliss were each counted. Each stick has one Limited token, natural flavors. That is one on every stick, so this is not a 3+ stack. The stored inactive list is the Balanced Berry stick. Tropical Bliss matches that severity and does not print beet root powder. Thrive Lemonade does not print quercetin dihydrate or licorice root powder. The 30-count facts images were not copied onto this 12-count as 30 servings. ${MAG_NOTE} Missing UPC. No code was invented.`,
    ],
  }),
  row({
    id: 'herbs-b293-chloroxygen-mint-1',
    productName: 'Herbs Etc. ChlorOxygen Chlorophyll Concentrate Mint Alcohol Free Drops (1 oz)',
    brand: 'Herbs Etc.',
    category: 'Vitamins',
    formulaId: 'herbs-b293-chloroxygen-mint',
    form: 'liquid',
    activeIngredients: CHLOR_ACTIVE,
    inactiveIngredients: CHLOR_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_CHLOR,
    sourcesGeneral: [
      't87u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/chloroxygen-mint-alcohol-free lists the 1 oz at $16.98 and in stock. SKU 765704319215 was not copied. The barcode field is empty. Serving 18 drops. Servings per container about 66. Other ingredients: purified water, vegetable glycerine, and natural flavors (menthol¹, vanilla¹, peppermint¹, and spearmint¹ essential oils, and citral). Alcohol free. The superscript 1 means organic and does not change the grade. Counted Limited tokens: none. Missing UPC. No code was invented. Not herbs-b283-chloroxygen-alcohol-free-1oz.',
    ],
  }),
  row({
    id: 'herbs-b293-chloroxygen-mint-2',
    productName: 'Herbs Etc. ChlorOxygen Chlorophyll Concentrate Mint Alcohol Free Drops (2 oz)',
    brand: 'Herbs Etc.',
    category: 'Vitamins',
    formulaId: 'herbs-b293-chloroxygen-mint',
    form: 'liquid',
    activeIngredients: CHLOR_ACTIVE,
    inactiveIngredients: CHLOR_FLAGS,
    verdict: 'caution',
    honestNote: NOTE_CHLOR,
    sourcesGeneral: [
      't87u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/chloroxygen-mint-alcohol-free lists the 2 oz at $29.98 and in stock. SKU 765704319222 was not copied. The barcode field is empty. Serving 18 drops. Servings per container about 132. Same other-ingredient line as the 1 oz. Tesseract reads vecetanle glycerine. The panel reads vegetable glycerine. Counted Limited tokens: none. Missing UPC. No code was invented. Not herbs-b283-chloroxygen-alcohol-free-2oz.',
    ],
  }),
];

const ROWS = BATCH293_KYR6D_T87U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: string; barcode: string }> = {
  'bioptimizers-b293-electrolyte-thrive-packets-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavors',
    note: NOTE_THRIVE,
    barcode: '',
  },
  'bioptimizers-b293-electrolyte-thrive-tub-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavors',
    note: NOTE_THRIVE,
    barcode: '',
  },
  'bioptimizers-b293-electrolyte-berry-packets-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavors',
    note: NOTE_BERRY,
    barcode: '',
  },
  'bioptimizers-b293-electrolyte-berry-tub-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavors',
    note: NOTE_BERRY,
    barcode: '',
  },
  'bioptimizers-b293-electrolyte-tropical-packets-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavors',
    note: NOTE_TROPICAL,
    barcode: '',
  },
  'bioptimizers-b293-electrolyte-tropical-tub-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavors',
    note: NOTE_TROPICAL,
    barcode: '',
  },
  'bioptimizers-b293-electrolyte-variety-12': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavors',
    note: NOTE_VARIETY,
    barcode: '',
  },
  'herbs-b293-chloroxygen-mint-1': {
    verdict: 'caution',
    cause: 'moderate',
    counted: '',
    note: NOTE_CHLOR,
    barcode: '',
  },
  'herbs-b293-chloroxygen-mint-2': {
    verdict: 'caution',
    cause: 'moderate',
    counted: '',
    note: NOTE_CHLOR,
    barcode: '',
  },
};

if (ROWS.length !== 9) throw new Error(`batch293 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch293 unexpected id ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || mapped.verdict !== expected.verdict) {
    throw new Error(`batch293 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${mapped.verdict}`);
  }
  const counted = mapped.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch293 stack ${record.id} ${counted}`);
  if ((mapped.honestNote ?? '') !== expected.note) throw new Error(`batch293 note ${record.id} ${JSON.stringify(mapped.honestNote)}`);
  if ((mapped.barcode ?? '') !== expected.barcode) throw new Error(`batch293 upc ${record.id} ${mapped.barcode}`);
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  if (formNote && !expected.note.startsWith(formNote)) throw new Error(`batch293 form note ${record.id} ${formNote}`);
  if (stackNote && !expected.note.includes(stackNote)) throw new Error(`batch293 stack note ${record.id} ${stackNote}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch293 blank why ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list/i.test(why) || /is on the Limited list/i.test(why)) {
      throw new Error(`batch293 generic why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
