// DRAFT / not verified / batch 287 KYR6-d (t57u).
// Brand page is the single source. A pack is here only when that page shows the
// 1-pack for sale and every other-ingredient token has a real why.
// Barcodes stay empty when the page showed no code.

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
  citric: 'Methodology §5 Caution (citric acid). Does not count toward the t137u stack.',
  sugar: 'Methodology §5 Caution (sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  corn: 'Methodology §5 Caution (organic corn syrup). Does not count toward the t137u stack.',
  cane: 'Methodology §5 Caution (organic cane syrup — founder lock t51u). Does not count toward the t137u stack.',
  ribose: 'Methodology §5 Caution (D-ribose — founder lock t51u). Does not count toward the t137u stack.',
  vanilla: 'Methodology §5 Caution (vanilla flavor). Does not count toward the t137u stack.',
  bamboo: 'Methodology §5 Caution (bamboo extract). The parenthetical silica is not a separate token. Does not count toward the t137u stack.',
  iso: 'Methodology §5 Limited (isomalto-oligosaccharides — founder lock t55u). Counts toward the t137u stack. Not Caution isomalt.',
  stevia:
    'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u Oct 21, 2026; same Limited row as Stevia and rebaudioside a extracted and purified; counts toward the t137u stack). Not Cleared organic Rebaudioside A. Not Cleared high-purity steviol glycosides. Not Cleared Rebaudioside M.',
  flavor: 'Methodology §5 Limited (natural flavor — t54u natural-flavor rule). Counts toward the t137u stack.',
  onf: 'Methodology §5 Limited (Organic Natural Flavor (Organic Dextrose and Natural Flavors) — founder lock t56u). Counts toward the t137u stack.',
  cashew:
    'Methodology §5 Limited (Organic Cashew Milk Powder (Organic Cashew Kernel, Organic Tapioca Maltodextrin) — founder lock t57u). Counts toward the t137u stack.',
  nut: 'Methodology §5 Limited (Organic Cashew Nut Milk Powder (Organic Cashew Kernel, Organic Tapioca Maltodextrin) — founder lock t57u). Counts toward the t137u stack.',
  mct: 'Methodology §5 Limited (unlabeled MCT / medium-chain triglycerides). Counts toward the t137u stack. Not Cleared named coconut or palm MCT.',
} as const;

type Tok = [string, RiskLevel, string];

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  brand: string,
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
  },
): RatingRecord {
  return finish({
    ...partial,
    brand,
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: [brand],
    barcode: partial.barcode ?? '',
  });
}

function flags(panel: string, toks: Tok[]): IngredientFlag[] {
  return toks.map(([name, riskLevel, source]) => ({ name, riskLevel, source: `${panel}; ${source}` }));
}

const C = (name: string): Tok => [name, 'cleared', S.cleared(name)];

const FISH_COMMA = 'Fish Oil, (Cod, Anchovy, Jack Pompano, Smelt, Salmon, Sardine, Mackerel)';
const FISH = 'Fish Oil (Cod, Anchovy, Jack Pompano, Smelt, Salmon, Sardine, Mackerel)';
const OIL = 'Vegetable Oil (Coconut, Canola) and Carnauba Leaf Wax (for anti-sticking)';
const COLOR = 'Natural color (Purple Carrot Extract, Blueberry Concentrate)';
const CASHEW = 'Organic Cashew Milk Powder (Organic Cashew Kernel, Organic Tapioca Maltodextrin)';
const NUT = 'Organic Cashew Nut Milk Powder (Organic Cashew Kernel, Organic Tapioca Maltodextrin)';
const ONF = 'Organic Natural Flavor (Organic Dextrose and Natural Flavors)';
const MCT_CHOC = 'MCT Oil (Medium Chain Triglyceride, Acacia Gum)';
const MCT_CAR = 'Medium Chain Triglycerides Powder (MCT Oil, Gum Acacia)';
const COCONUT = 'Coconut Oil Powder (Coconut Oil, Acacia Gum)';

const PMICRO =
  'BiOptimizers brand page. Creamy Chocolate. Serving one level scoop. Servings per container 30. The 150 g powder. IgYmax, the lactobacillus blend, bovine collagen, and bovine bone broth are the actives and are not graded. t57u brand-page single source.';
const PBLUE =
  'Quantum Health brand page. Serving 2 softgels. Servings per container 30. The 60-softgel bottle. Vitamin E, zinc, curcumin, lutein, zeaxanthin, and omega-3 are the actives and are not graded. t57u brand-page single source.';
const PMAC =
  'Quantum Health brand page. Serving 2 softgels. Servings per container 30. The 60-softgel bottle. Vitamin C, vitamin E, zinc, lutein, zeaxanthin, and omega-3 are the actives and are not graded. t57u brand-page single source.';
const PPLAY =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The 60-gummy bottle. S7, KSM-66 ashwagandha, maca root, and horny goat weed are the actives and are not graded. t57u brand-page single source.';
const PBAL =
  'Lemme brand page. Serving 3 capsules. Servings per container 30. Vitamin D, folate, chromium, myo-inositol, D-chiro-inositol, and spearmint leaf are the actives and are not graded. t57u brand-page single source.';
const PGUM =
  'Hyalogic brand page. Serving 1 gummy. Hyaluronic acid is the active and is not graded. The 30-count and the 60-count share this other-ingredient line. t57u brand-page single source.';
const POR =
  'Quantum Health brand page. 18-count bag. Serving 1 lozenge. Servings per container 18. Zinc and the marshmallow, slippery elm, and echinacea blend are the actives and are not graded. t57u brand-page single source.';
const PCHO =
  'BiOptimizers brand page. Chocolicious. The page says 30 servings. The directions say mix 2 scoops with 6 oz. The mushroom extracts and the collagens are the actives and are not graded. Amounts were not printed. t57u brand-page single source.';
const PCAR =
  'BiOptimizers brand page. Salted Caramel. The page says 30 servings. The directions say mix 2 scoops with 6 oz. The mushroom extracts and the collagens are the actives and are not graded. Amounts were not printed. t57u brand-page single source.';

const GUMMY: Tok[] = [
  ['Organic Corn Syrup', 'moderate', S.corn],
  C('Cane Sugar'),
  C('Water'),
  C(OIL),
  C('Gelatin'),
  ['Citric Acid', 'moderate', S.citric],
  C('Natural Flavor (Raspberry)'),
  C(COLOR),
  C('Pectin'),
];

export const BATCH287_KYR6D_T57U: RatingRecord[] = [
  row('BiOptimizers', {
    id: 'bioptimizers-b287-microbiome-choc-30',
    productName: 'BiOptimizers Microbiome Breakthrough Creamy Chocolate (30 servings)',
    category: 'Digestive',
    formulaId: 'bioptimizers-b287-microbiome-choc-30',
    form: 'powder',
    activeIngredients: [
      { name: 'IgYmax (Hyperimmunized Egg Powder)', strength: '200 mg' },
      { name: 'Lactobacillus Blend (L. rhamnosus, L. gasseri, L. helveticus)', strength: '65 mg' },
      { name: 'Bovine Collagen', strength: '500 mg' },
      { name: 'Bovine Bone Broth', strength: '500 mg' },
    ],
    inactiveIngredients: flags(PMICRO, [
      C('Organic inulin'),
      ['isomalto-oligosaccharides', 'limited', S.iso],
      ['D-ribose', 'moderate', S.ribose],
      ['stevia (leaf) extract', 'limited', S.stevia],
      ['vanilla flavor', 'moderate', S.vanilla],
      C('Peruvian cacao'),
      C('cocoa powder'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't57u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/microbiome-breakthrough lists Creamy Chocolate at $49.99 and for sale. 30 servings. 150 g. One level scoop in 8 oz of water. Counted Limited tokens: isomalto-oligosaccharides and stevia (leaf) extract. That is two, so this is not a 3+ stack. D-ribose and vanilla flavor are Caution and do not stack. No honest note. Missing UPC. No code was invented. The Vegetarian Vanilla variant on the same page has no vanilla other-ingredient line and is not this row.',
    ],
  }),
  row('BiOptimizers', {
    id: 'bioptimizers-b287-mushroom-choc-30',
    productName: 'BiOptimizers Mushroom Breakthrough Chocolicious (30 servings)',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b287-mushroom-choc-30',
    form: 'powder',
    activeIngredients: [
      { name: "Lion's Mane Extract (Hericium erinaceus) (fruiting body)" },
      { name: 'Chaga Extract (Inonotus obliquus) (fruiting body)' },
      { name: 'Marine Collagen' },
      { name: 'Bovine Collagen' },
      { name: 'Extract Reishi (fruiting body)' },
      { name: 'Cordyceps (mycelium)' },
    ],
    inactiveIngredients: flags(PCHO, [
      [CASHEW, 'limited', S.cashew],
      C(COCONUT),
      C('Organic Cacao Powder'),
      [MCT_CHOC, 'limited', S.mct],
      C('Himalayan Pink Salt'),
      C('Organic Monk Fruit Extract'),
      C('Thaumatin Powder'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't57u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/mushroom-breakthrough lists Chocolicious at $64.99 and for sale. The page says 30 servings. The directions say mix 2 scoops with 6 oz of water. Counted Limited tokens: Organic Cashew Milk Powder (Organic Cashew Kernel, Organic Tapioca Maltodextrin) and MCT Oil (Medium Chain Triglyceride, Acacia Gum). That is two, so this is not a 3+ stack. No honest note. The mushroom amounts were not printed. Missing UPC. No code was invented. Salted Caramel is a separate flavor and is not this row.',
    ],
  }),
  row('BiOptimizers', {
    id: 'bioptimizers-b287-mushroom-caramel-30',
    productName: 'BiOptimizers Mushroom Breakthrough Salted Caramel (30 servings)',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b287-mushroom-caramel-30',
    form: 'powder',
    activeIngredients: [
      { name: "Lion's Mane (Hericium erinaceus)" },
      { name: 'Chaga Extract (fruiting body)' },
      { name: 'Bovine Collagen' },
      { name: 'Marine Collagen' },
      { name: 'Cordyceps Extract (mycelium)' },
      { name: 'Reishi Extract (fruiting body)' },
    ],
    inactiveIngredients: flags(PCAR, [
      [NUT, 'limited', S.nut],
      C(COCONUT),
      [ONF, 'limited', S.onf],
      [MCT_CAR, 'limited', S.mct],
      C('Light Grey Celtic® Sea Salt'),
      C('Himalayan Salt'),
      C('Organic Monk Fruit Extract'),
      C('Thaumatin Powder'),
    ]),
    verdict: 'avoid',
    sourcesGeneral: [
      't57u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/mushroom-breakthrough lists Salted Caramel at $64.99 and for sale. The page says 30 servings. The directions say mix 2 scoops with 6 oz of water. Counted Limited tokens: Organic Cashew Nut Milk Powder (Organic Cashew Kernel, Organic Tapioca Maltodextrin), Organic Natural Flavor (Organic Dextrose and Natural Flavors), and Medium Chain Triglycerides Powder (MCT Oil, Gum Acacia). Three Limited tokens make Avoid, and the honest note names those three. The mushroom amounts were not printed. Missing UPC. No code was invented. Chocolicious is a separate flavor and is not this row.',
    ],
  }),
  row('Quantum Health', {
    id: 'quantum-b287-digital-blue-60',
    productName: 'Quantum Health Digital Blue (60 softgels)',
    category: 'Eye & Ear',
    formulaId: 'quantum-b287-digital-blue-60',
    form: 'softgel',
    activeIngredients: [
      { name: 'Vitamin E (d-alpha tocopherol)', strength: '67 mg' },
      { name: 'Zinc (from gluconate)', strength: '15 mg' },
      { name: 'Curcumin', strength: '100 mg' },
      { name: 'Lutein (free form) (Lutemax 2020)', strength: '20 mg' },
      { name: 'Zeaxanthin (Lutemax 2020)', strength: '4 mg' },
      { name: 'Omega-3 (DHA 50 mg and EPA 50 mg)', strength: '100 mg' },
    ],
    inactiveIngredients: flags(PBLUE, [
      C('Gelatin'),
      C(FISH_COMMA),
      C('Sunflower Oil'),
      C('Marigold (Tagetes erecta) Flower Extract'),
      C('Glycerin'),
      C('Yellow Bees Wax'),
      C('Water'),
      C('Carob (color)'),
    ]),
    verdict: 'clean',
    sourcesGeneral: [
      't57u. Quantum Health brand page is the single source. https://quantumhealth.com/products/digital-blue lists the 60 softgels at $20.69 and for sale. Serving 2 softgels. Servings per container 30. Take 2 softgels daily with food. Sunflower oil is the softgel fill, and the honest note says it did not pull the grade down. Counted Limited tokens: none. Missing UPC. No code was invented. Not quantum-b281-see-lutein-30.',
    ],
  }),
  row('Quantum Health', {
    id: 'quantum-b287-macula-30',
    productName: 'Quantum Health Macula 30+ (60 softgels)',
    category: 'Eye & Ear',
    formulaId: 'quantum-b287-macula-30',
    form: 'softgel',
    activeIngredients: [
      { name: 'Vitamin C (ascorbic acid)', strength: '250 mg' },
      { name: 'Vitamin E (d-alpha tocopherol)', strength: '168 mg' },
      { name: 'Zinc (from gluconate)', strength: '15 mg' },
      { name: 'Lutein (Lutemax 2020)', strength: '30 mg' },
      { name: 'Zeaxanthin (Lutemax 2020)', strength: '6 mg' },
      { name: 'Omega-3 (DHA 150 mg and EPA 150 mg)', strength: '300 mg' },
    ],
    inactiveIngredients: flags(PMAC, [
      C(FISH),
      C('Gelatin'),
      C('Glycerin'),
      C('Sunflower Oil'),
      C('Yellow Bees Wax'),
      C('Water'),
      C('Carob (color)'),
    ]),
    verdict: 'clean',
    sourcesGeneral: [
      't57u. Quantum Health brand page is the single source. https://quantumhealth.com/products/macula-30 lists the 60 softgels at $27.19 and for sale. Serving 2 softgels. Servings per container 30. Take 2 softgels daily with food. Sunflower oil is the softgel fill, and the honest note says it did not pull the grade down. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row('Quantum Health', {
    id: 'quantum-b287-therazinc-orange-18',
    productName: 'Quantum Health TheraZinc USDA Organic Blood Orange Lozenges (18 lozenges)',
    category: 'Cold & Flu',
    formulaId: 'quantum-b287-therazinc-orange-18',
    form: 'lozenge',
    activeIngredients: [
      { name: 'Zinc (from Zinc Gluconate)', strength: '7 mg' },
      { name: 'Proprietary Blend of Organic Marshmallow Root, Organic Slippery Elm, and Organic Echinacea', strength: '77 mg' },
    ],
    inactiveIngredients: flags(POR, [
      ['Organic Cane Syrup', 'moderate', S.cane],
      C('Organic Rice Syrup'),
      C('Organic Blood Orange and other Natural Flavors'),
      C('Organic Fruit and Vegetable Juice for color'),
      C('Organic Honey'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't57u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-usda-organic-blood-orange-lozenges lists the 18-count bag at $7.19 and for sale. Serving 1 lozenge. Servings per container 18. Organic cane syrup is Caution and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 25-count box on the same page prints 24 servings and is not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b287-play-gummy-60',
    productName: 'Lemme Play Gummies (60 gummies)',
    category: 'Herbs',
    formulaId: 'lemme-b287-play-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'S7 Nitric Oxide Complex', strength: '25 mg' },
      { name: 'KSM-66 Ashwagandha Root Extract', strength: '300 mg' },
      { name: 'Maca Root', strength: '100 mg' },
      { name: 'Horny Goat Weed', strength: '25 mg' },
    ],
    inactiveIngredients: flags(PPLAY, [
      C('Tapioca Syrup'),
      ['Sugar', 'moderate', S.sugar],
      C('Water'),
      C('Vitamin C (as ascorbic acid)'),
      C('Pectin'),
      ['Natural Flavor', 'limited', S.flavor],
      C('Black Carrot, Concentrate (Color)'),
      C('Trisodium Citrate'),
      C('Sodium Ascorbate'),
      C('Carnauba Wax'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't57u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-play-gummies lists the 1-pack at $30 and for sale. Serving 2 gummies. Servings per container 30. The bottle is 60 gummies. Counted Limited token: Natural Flavor. That is one, so this is not a 3+ stack. Sugar is Caution and does not stack. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b287-balance-30',
    productName: 'Lemme Balance Hormone Support Capsules (30 servings)',
    category: 'Herbs',
    formulaId: 'lemme-b287-balance-30',
    form: 'capsule',
    activeIngredients: [
      { name: 'Vitamin D (as vegan Cholecalciferol)', strength: '10 mcg' },
      { name: 'Folate (as 5-MTHF)', strength: '340 mcg DFE' },
      { name: 'Chromium (as Chromium Picolinate)', strength: '200 mcg' },
      { name: 'Myo-Inositol', strength: '2000 mg' },
      { name: 'D-Chiro-Inositol', strength: '50 mg' },
      { name: 'Spearmint Leaf (Mentha spicata)', strength: '200 mg' },
    ],
    inactiveIngredients: flags(PBAL, [
      C('Hypromellose Capsule'),
      ['Bamboo Leaf Extract (Silica)', 'moderate', S.bamboo],
      C('Vegetable Juice Powder (color)'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't57u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-balance-capsules-1 lists the 1-pack at $50 and for sale. Serving 3 capsules. Servings per container 30. Bamboo leaf extract is Caution and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Hyalogic', {
    id: 'hyalogic-b287-ha-gummy-30',
    productName: 'Hyalogic HA Gummy (30 gummies)',
    category: 'Vitamins',
    formulaId: 'hyalogic-b287-ha-gummy',
    form: 'gummy',
    activeIngredients: [{ name: 'Hyaluronic Acid', strength: '60 mg' }],
    inactiveIngredients: flags(PGUM, GUMMY),
    verdict: 'caution',
    sourcesGeneral: [
      't57u. Hyalogic brand page is the single source. https://www.hyalogic.com/products/ha-gummy lists the 30-count at $23.95 and for sale. Serving 1 gummy. Servings per container 30. Organic corn syrup and citric acid are Caution and do not stack. The vegetable-oil and carnauba print is the t56u Cleared string. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 60-count is a separate 1-pack and is not this row.',
    ],
  }),
  row('Hyalogic', {
    id: 'hyalogic-b287-ha-gummy-60',
    productName: 'Hyalogic HA Gummy (60 gummies)',
    category: 'Vitamins',
    formulaId: 'hyalogic-b287-ha-gummy',
    form: 'gummy',
    activeIngredients: [{ name: 'Hyaluronic Acid', strength: '60 mg' }],
    inactiveIngredients: flags(PGUM, GUMMY),
    verdict: 'caution',
    sourcesGeneral: [
      't57u. Hyalogic brand page is the single source. https://www.hyalogic.com/products/ha-gummy lists the 60-count at $39.95 and for sale. Serving 1 gummy. Servings per container 60. Same other-ingredient line as the 30-count. Organic corn syrup and citric acid are Caution and do not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 30-count is a separate 1-pack and is not this row.',
    ],
  }),
];

const ROWS = BATCH287_KYR6D_T57U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: boolean }> = {
  'bioptimizers-b287-microbiome-choc-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'isomalto-oligosaccharides|stevia (leaf) extract',
    note: false,
  },
  'bioptimizers-b287-mushroom-choc-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: `${CASHEW}|${MCT_CHOC}`,
    note: false,
  },
  'bioptimizers-b287-mushroom-caramel-30': {
    verdict: 'avoid',
    cause: 'limited_stack',
    counted: `${NUT}|${ONF}|${MCT_CAR}`,
    note: true,
  },
  'quantum-b287-digital-blue-60': { verdict: 'clean', cause: 'clean', counted: '', note: true },
  'quantum-b287-macula-30': { verdict: 'clean', cause: 'clean', counted: '', note: true },
  'quantum-b287-therazinc-orange-18': { verdict: 'caution', cause: 'moderate', counted: '', note: false },
  'lemme-b287-play-gummy-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Flavor', note: false },
  'lemme-b287-balance-30': { verdict: 'caution', cause: 'moderate', counted: '', note: false },
  'hyalogic-b287-ha-gummy-30': { verdict: 'caution', cause: 'moderate', counted: '', note: false },
  'hyalogic-b287-ha-gummy-60': { verdict: 'caution', cause: 'moderate', counted: '', note: false },
};

if (ROWS.length !== 10) throw new Error(`batch287 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch287 unexpected id ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || record.verdict !== expected.verdict) {
    throw new Error(`batch287 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch287 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch287 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (Boolean(record.honestNote) !== expected.note) throw new Error(`batch287 note presence ${record.id}`);
  if (record.barcode) throw new Error(`batch287 upc invented ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch287 blank why ${record.id} ${ingredient.name}`);
    if (/has its own line in the ingredient rules/i.test(why) || /is on the Cleared list/i.test(why)) {
      throw new Error(`batch287 generic why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
