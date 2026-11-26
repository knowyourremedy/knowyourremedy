// DRAFT / not verified / batch 505 KYR6-e (t410u).
// The remaining fully locked Cymbiotika products.
// Activated Charcoal is not a row. Its blend names no parts.
// Bracketed whys stay unfilled.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t410uResolve } from '../scan-preview/t410uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(panel: string, name: string, grade: RiskLevel, counts: boolean, why?: string): IngredientFlag {
  const meth = grade === 'high'
    ? 'Methodology §5 Avoid.'
    : grade === 'limited' && counts
      ? 'Methodology §5 Limited. Counts toward the 3+ Limited stack.'
      : grade === 'limited'
        ? 'Methodology §5 Limited. Does not count toward the t137u stack.'
        : grade === 'moderate'
          ? 'Methodology §5 Caution. Does not count toward the t137u stack.'
          : 'Methodology §5 Cleared. Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `${panel}; ${meth}`, ...(why ? { why } : {}) };
}

function gtin12(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i += 1) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function resolveName(name: string, form: string) {
  if (name === 'Selenium (as Organically-Bound Selenium from Saccharomyces cerevisiae)') {
    const hit = t410uResolve('Selenium', form);
    if (!hit) throw new Error('t410u selenium');
    return hit;
  }
  const direct = t410uResolve(name, form);
  if (direct) return direct;
  const stripped = name.replace(/\b(?:certified\s+)?organic\b/ig, ' ').replace(/\s+/g, ' ').trim();
  if (stripped && stripped.toLowerCase() !== name.trim().toLowerCase()) {
    const hit = t410uResolve(stripped, form);
    if (hit) return hit;
  }
  throw new Error(`t410u unlocked ${name}`);
}

function makeRow(args: {
  id: string;
  productName: string;
  barcode: string;
  form: string;
  panel: string;
  names: string[];
  source: string;
}): RatingRecord {
  const inactiveIngredients = args.names.map((name) => {
    const hit = resolveName(name, args.form);
    return flag(args.panel, name, hit.lock.grade, hit.lock.counts, hit.lock.why || undefined);
  });
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients);
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const honestNote = rollup.cause === 'limited_stack' && !high
    ? 'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.'
    : undefined;
  return {
    id: args.id,
    productName: args.productName,
    brand: 'Cymbiotika',
    category: 'Vitamins',
    formulaId: args.id,
    form: args.form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Cymbiotika'],
    barcode: args.barcode,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    ...(honestNote ? { honestNote } : {}),
    sourcesGeneral: [args.source],
  };
}

function counted(record: RatingRecord): string[] {
  return record.inactiveIngredients
    .filter((ingredient) => ingredient.riskLevel === 'limited' && !ingredient.stackCountExempt)
    .map((ingredient) => ingredient.name);
}

const brainNames = [
  'Rhodiola rosea Extract (root)',
  'Phosphatidylcholine (from Sunflower Lecithin)',
  'Bacopa monnieri Extract (whole plant)',
  'Sceletium tortuosum (aerial parts) Extract (Zembrin)',
  'Huperzine A (from Huperzia serrata, whole plant)',
  'Glycerin',
  'Water',
  'Organic Almond Butter',
  'Organic Evaporated Coconut Nectar',
  'Organic Cassava Syrup',
  'Organic Cocoa Extract',
  'Sea Salt',
  'Organic Vanilla Powder',
  'Organic Vanilla Extract',
  'Pectin',
  'D-Alpha-Tocopherol',
  'Sodium Alginate',
  'Calcium Lactate',
  'Organic Cinnamon Powder',
  'Organic Ginger Root Extract',
  'Organic Clove Powder',
  'Organic Cardamom Powder',
];

function brain(count: string, barcode: string): RatingRecord {
  return makeRow({
    id: `cymbiotika-b505-brain-${count.split(' ')[0]}`,
    productName: `Brain Complex, ${count}`,
    barcode,
    form: 'liquid',
    panel: `Cymbiotika Brain Complex, ${count}. Brand site https://cymbiotika.com/en-us.`,
    names: brainNames,
    source: `t410u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Brain Complex. Serving size 5 mL. ${count}. iHerb barcode ${barcode}. The check digit passes. The same panel is used for the other count. Huperzine A is Cleared. Counted Limited tokens: Organic Evaporated Coconut Nectar and Organic Cassava Syrup. That is two, so no 3+ note is stored. Organic Cocoa Extract is Caution and does not count.`,
  });
}

const magNames = [
  'Magnesium',
  'Phosphatides (from Sunflower Lecithin)',
  'GIVOMAG Magnesium Glycerophosphate',
  'Magnesium Taurinate',
  'Magnesium Bisglycinate',
  'Glycerin',
  'Water',
  'Organic Almond Butter',
  'Organic Coconut Nectar',
  'Organic Cassava Syrup',
  'Organic Vanilla Powder',
  'Sea Salt',
  'Organic Vanilla Extract',
  'Pectin',
  'D-Alpha-Tocopherol',
  'Sodium Alginate',
  'Calcium Lactate',
];

function mag(count: string, barcode: string): RatingRecord {
  return makeRow({
    id: `cymbiotika-b505-magnesium-${count.split(' ')[0]}`,
    productName: `Magnesium Complex, ${count}`,
    barcode,
    form: 'liquid',
    panel: `Cymbiotika Magnesium Complex, ${count}. Brand site https://cymbiotika.com/en-us.`,
    names: magNames,
    source: `t410u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Magnesium Complex. Serving size 10 mL. ${count}. iHerb barcode ${barcode}. The check digit passes. The same panel is used for the other count. Phosphatides (from Sunflower Lecithin) is Cleared and does not take Phosphatidylcholine. Counted Limited tokens: Organic Coconut Nectar and Organic Cassava Syrup. That is two, so no 3+ note is stored.`,
  });
}

export const BATCH505_KYR6E_T410U: RatingRecord[] = [
  brain('26 Count', '850025187480'),
  brain('12 Count', '850025187367'),
  mag('28 Count', '850025187503'),
  mag('12 Count', '850025187336'),
  makeRow({
    id: 'cymbiotika-b505-parax',
    productName: 'ParaX, 21 Servings',
    barcode: '',
    form: 'capsule',
    panel: 'Cymbiotika ParaX, REV01. Brand site https://cymbiotika.com/en-us.',
    names: [
      'Vitamin A (as Retinyl Palmitate)',
      'Iodine (as Potassium Iodide)',
      'Zinc (as Zinc Bisglycinate)',
      'Selenium (as Organically-Bound Selenium from Saccharomyces cerevisiae)',
      'Copper (as Copper Bisglycinate)',
      'Olive (Whole Fruit) Fractionated Oil',
      'Thyme (Aerial) Essence Oil',
      'Clove (Flower Bud) Essence Oil',
      'Oregano (Leaf) Essence Oil',
      'Monolaurin (Coconut Fruit) Fatty Acid Glyceride',
      'Andrographolide',
      'Curcumin (as Curcuminoids)',
      'Ellagic Acid',
      'Baicalein',
      'Baicalin',
      'Luteolin',
      'Caffeic Acid Phenethyl Ester',
      'Barberry (Root) Conc. Ext. providing Berberine',
      'L-Lysine',
      'Cinnamon (Bark) Conc. Ext.',
      'Black Elderberry (Fruit) Conc. Ext.',
      'Ginger (Root) Conc. Ext.',
      'Boron (as Hydrogen Borate)',
      'Grapefruit (Seed) Conc. Ext.',
      'Black Walnut (Seed) Conc. Ext.',
      'Wormwood (Stem & Leaf) Conc. Ext.',
      'Cat\'s Claw (Bark) Conc. Ext.',
      'Plant Cellulose Capsule',
      'Phospholipids',
      'Cassava Root Starch',
      'Blue-Green Algae',
      'Berry Fruit Conc.',
      'Silicate Minerals',
    ],
    source: 't410u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. ParaX, REV01. 3 liqui-caps. 21 servings. No verified UPC is on record, so none is attached. Oregano (Leaf) Essence Oil is Cleared. The softgel oregano-oil lock does not apply to liqui-caps. Ellagic Acid, Baicalein, and Luteolin use the bracketed compound why. Monolaurin is Cleared. Counted Limited tokens: Phospholipids and Cassava Root Starch. That is two, so no 3+ note is stored.',
  }),
  makeRow({
    id: 'cymbiotika-b505-metabolic-84',
    productName: 'Metabolic Health, 84 Capsules',
    barcode: '850025187312',
    form: 'capsule',
    panel: 'Cymbiotika Metabolic Health. Brand site https://cymbiotika.com/en-us.',
    names: [
      'Thiamin (as Thiamine Hydrochloride)',
      'Niacin (as Nicotinamide)',
      'Chromium (as Chromium Polynicotinate)',
      'Oleoylethanolamide (OEA)',
      'Moringa oleifera Leaf Powder (Organic)',
      'Dihydroberberine (GlucoVantage)',
      'Green Tea (Camellia sinensis) Leaf Extract (EGCG)',
      'Theobromine',
      'Cinnamon (Cinnamomum verum) Bark Powder (Organic)',
      'Alpha Lipoic Acid',
      'Gymnema sylvestre Leaf Extract',
      'Asian Ginseng (Panax ginseng) Stems & Leaves Extract',
      'Ginger Root Extract',
      'Fenugreek Seed Extract',
      'Dandelion Root Extract',
      'Coffee (Coffea arabica) Bean Extract',
      'Vegetarian Capsule (Hypromellose)',
      'L-Leucine',
      'Bamboo Leaf Extract',
    ],
    source: 't410u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Metabolic Health. 3 veg caps. 84 capsules. iHerb barcode 850025187312. The check digit passes. Oleoylethanolamide (OEA) uses the bracketed lipid why. Niacin (as Nicotinamide) does not take Niacin. Counted Limited tokens: Alpha Lipoic Acid. That is one, so no 3+ note is stored.',
  }),
  makeRow({
    id: 'cymbiotika-b505-longevity-mushrooms',
    productName: 'Organic Longevity Mushrooms Chocolate Fudge Syrup',
    barcode: '',
    form: 'liquid',
    panel: 'Cymbiotika Organic Longevity Mushrooms Chocolate Fudge Syrup. NIH DSLD label 253134.',
    names: [
      'organic Sunflower Lecithin',
      'organic Coconut Glycerin',
      'organic sprouted Almond Butter',
      'Antrodia Mushroom powder',
      'King Trumpet Mushroom powder',
      'Maitake Mushroom powder',
      'Reishi Mushroom powder',
      'Turkey Tail Mushroom powder',
      'Himalayan Sea Salt',
      'organic Green Tea extract',
      'D-Alpha-Tocopherol',
      'organic Vanilla extract',
      'organic Cacao extract',
      'EGCG',
      'Green Tea extract',
    ],
    source: 't410u. NIH DSLD label 253134 is the on-market panel. Organic Longevity Mushrooms Chocolate Fudge Syrup. No brand-site panel. No verified UPC is on record, so none is attached. EGCG is Cleared and does not take Green Tea extract. organic Cacao extract does not take Cocoa Extract. Counted Limited tokens: organic Coconut Glycerin. That is one, so no 3+ note is stored.',
  }),
  makeRow({
    id: 'cymbiotika-b505-inflammatory-health',
    productName: 'Inflammatory Health',
    barcode: '',
    form: 'capsule',
    panel: 'Cymbiotika Inflammatory Health. NIH DSLD label 336104.',
    names: [
      'Pullulan',
      'Gum Arabic',
      'Vegetable Waxes',
      'Cassava Starch',
      'Orange Fruit Juice Concentrate, Powder',
      'Lime Fruit Juice Concentrate, Powder',
      'Vanilla Extract Concentrate',
      'organic Rice hull concentrate',
      'Vitamin D3',
      'Vitamin B3',
      'Zinc',
      'Selenium',
      'Palmitoylethanolamide',
      'Baicalin',
      'Curcumin',
      'Nobiletin',
      'Tangeretin',
      'Piperine',
      'Ginger Root Extract Concentrate',
      'Tart Cherry Fruit Extract Concentrate',
      'Frankincense Gum Extract Concentrate',
    ],
    source: 't410u. NIH DSLD label 336104 is the on-market panel. Inflammatory Health. No brand-site panel. No verified UPC is on record, so none is attached. Nobiletin, Tangeretin, and Piperine use the bracketed compound why. Palmitoylethanolamide uses the bracketed lipid why. Baicalin stays its own lock. Counted Limited tokens: Vegetable Waxes and Cassava Starch. That is two, so no 3+ note is stored.',
  }),
  makeRow({
    id: 'cymbiotika-b505-adrenal-super-tonic',
    productName: 'Adrenal Super Tonic',
    barcode: '850025187169',
    form: 'liquid',
    panel: 'Cymbiotika Adrenal Super Tonic. NIH DSLD label 253115.',
    names: [
      'organic Flax Seed Glycerin',
      'Biodynamic organic Ethanol',
      'organic Stevia extract',
      'Lavender',
      'Rose Geranium',
      'Rosemary',
      'organic Guava extract',
      'organic Moringa extract',
      'organic Ashwagandha extract',
      'organic Holy Basil extract',
      'organic Aloe Vera extract',
      'organic Berberis aristata extract',
      'organic Turmeric juice freeze dried powder',
      'organic Amla extract',
      'organic Lemon Myrtle oil',
      'organic Lavender oil',
    ],
    source: 't410u. NIH DSLD label 253115 is the on-market panel. Adrenal Super Tonic. The label UPC is 850025187169. The check digit passes. Lavender and Rose Geranium use the bracketed plant why. organic Lavender oil stays its own lock. organic Stevia extract is Limited. The standing stack rule does not count that name. Counted Limited tokens that stack: organic Flax Seed Glycerin and Biodynamic organic Ethanol. That is two, so no 3+ note is stored.',
  }),
];

if (BATCH505_KYR6E_T410U.length !== 9) throw new Error('t410u count');
const expect: Record<string, { barcode: string; verdict: RatingRecord['verdict']; limited: number }> = {
  'cymbiotika-b505-brain-26': { barcode: '850025187480', verdict: 'caution', limited: 2 },
  'cymbiotika-b505-brain-12': { barcode: '850025187367', verdict: 'caution', limited: 2 },
  'cymbiotika-b505-magnesium-28': { barcode: '850025187503', verdict: 'caution', limited: 2 },
  'cymbiotika-b505-magnesium-12': { barcode: '850025187336', verdict: 'caution', limited: 2 },
  'cymbiotika-b505-parax': { barcode: '', verdict: 'caution', limited: 2 },
  'cymbiotika-b505-metabolic-84': { barcode: '850025187312', verdict: 'caution', limited: 1 },
  'cymbiotika-b505-longevity-mushrooms': { barcode: '', verdict: 'caution', limited: 1 },
  'cymbiotika-b505-inflammatory-health': { barcode: '', verdict: 'caution', limited: 2 },
  'cymbiotika-b505-adrenal-super-tonic': { barcode: '850025187169', verdict: 'caution', limited: 3 },
};
for (const item of BATCH505_KYR6E_T410U) {
  const spec = expect[item.id];
  const rollup = computeVerdictFromInactiveIngredients(item.inactiveIngredients);
  if (!spec || item.verdict !== spec.verdict || item.verdict !== rollup.verdict || item.barcode !== spec.barcode) {
    throw new Error(`t410u row ${item.id} ${item.verdict} ${rollup.verdict}`);
  }
  if (item.barcode && !gtin12(item.barcode)) throw new Error(`t410u gtin ${item.id}`);
  if (item.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) throw new Error(`t410u avoid ${item.id}`);
  if (counted(item).length !== spec.limited) throw new Error(`t410u limited ${item.id} ${counted(item).join(',')}`);
  if (rollup.cause === 'limited_stack' || item.honestNote) throw new Error(`t410u stack ${item.id}`);
}
const parax = BATCH505_KYR6E_T410U.find((item) => item.id === 'cymbiotika-b505-parax');
const oregano = parax?.inactiveIngredients.find((ingredient) => ingredient.name === 'Oregano (Leaf) Essence Oil');
if (oregano?.riskLevel !== 'cleared' || !oregano.why?.startsWith('[Named plant extract')) throw new Error('t410u oregano');
const adrenal = BATCH505_KYR6E_T410U.find((item) => item.id === 'cymbiotika-b505-adrenal-super-tonic');
const stevia = adrenal?.inactiveIngredients.find((ingredient) => ingredient.name === 'organic Stevia extract');
if (stevia?.riskLevel !== 'limited') throw new Error('t410u stevia');
