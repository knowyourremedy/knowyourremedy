// DRAFT / not verified / batch 332 KYR6-e (t138e).
// Brand facts images are the source. Larger Good Patch counts use that same line.
// Think and Dream stay held. The 10-sachet has no other-ingredients line.
// The Sprouts section is not edited. No brand is closed.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const T138 = 'Methodology §5 Cleared (founder lock t138e). Does not count toward the t137u stack.';
const ADHESIVE = 'Methodology §5 Cleared (Adhesive — t112u). Does not count toward the t137u stack.';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const JUICE = 'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder).';
const HONEY = 'Methodology §5 Cleared (honey).';
const WATER = 'Methodology §5 Cleared (purified water).';
const GLYC = 'Methodology §5 Cleared (Glycerin / vegetable glycerin / organic glycerin).';
const GUM = 'Methodology §5 Cleared (gum arabic).';
const MONK = 'Methodology §5 Cleared (monk-fruit sweetener). A European review set an acceptable daily intake.';
const CELL = 'Methodology §5 Cleared (vegetarian capsule shell — t130u). Does not count toward the t137u stack.';
const SILICA = 'Methodology §5 Caution (Silica / silicon dioxide — EFSA 2018). Does not count toward the t137u stack.';
const LEMON_FLAVOR = 'Methodology §5 Caution (Organic Lemon Flavor — founder lock t106u). Does not count toward the t137u stack.';
const AMAZON =
  'Amazon US was opened and blocked before a product page: Continued access by an unauthorized AI agent violates Amazon\'s Conditions of Use, to which our customers have agreed.';

type Ing = readonly [string, RiskLevel, string];

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

function flag(panel: string, name: string, riskLevel: RiskLevel, whySource: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${whySource}` };
}

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function ws(args: {
  id: string;
  productName: string;
  form: string;
  panel: string;
  ings: Ing[];
  actives: ActiveIngredient[];
  url: string;
  price: string;
  serving: string;
  honestNote?: string;
}): RatingRecord {
  const oi = args.ings.map(([name]) => name).join(', ');
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Wooden Spoon Herbs',
    category: 'Herbs',
    formulaId: args.id,
    form: args.form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Wooden Spoon Herbs'],
    barcode: '',
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, level, src]) => flag(args.panel, name, level, src)),
    verdict: 'clean',
    honestNote: args.honestNote ?? '',
    sourcesGeneral: [
      `t138e. Brand page ${args.url} is in stock at $${args.price}. The facts image other ingredients: ${oi}. Serving size on the image: ${args.serving}. The supplement-facts blend is the active and is not graded. No UPC was printed. Missing UPC. ${AMAZON} The brand facts image is the row. No code was invented.`,
    ],
  });
}

function patch(args: {
  id: string;
  productName: string;
  category: string;
  audience?: 'adult' | 'kids';
  minAge?: number;
  barcode?: string;
  actives: ActiveIngredient[];
  inactive: string;
  url: string;
  price: string;
  line: string;
}): RatingRecord {
  const phrase = args.inactive !== 'Adhesive';
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'The Good Patch',
    category: args.category,
    formulaId: args.id,
    form: 'patch',
    audience: args.audience ?? 'adult',
    minAge: args.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['The Good Patch'],
    barcode: args.barcode ?? '',
    activeIngredients: args.actives,
    inactiveIngredients: [
      flag(
        `The Good Patch brand back. ${args.productName}. Ingredients: ${args.line}`,
        args.inactive,
        'cleared',
        phrase ? T138 : ADHESIVE,
      ),
    ],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      `t138e. Brand page ${args.url} lists this count in stock at $${args.price}. The back image prints Ingredients: ${args.line}. The named ingredients are actives and are not graded. ${args.barcode ? `UPC ${args.barcode} is printed on that photographed pouch and the check digit passes.` : 'No UPC was printed for this count. Missing UPC.'} ${AMAZON} The brand back is the row. No code was invented.`,
    ],
  });
}

const TART: Ing[] = [
  ['Non-GMO Citric Acid', 'cleared', CITRIC],
  ['Organic Tart Cherry Flavor', 'cleared', T138],
  ['Organic Tart Cherry Powder', 'cleared', JUICE],
  ['Organic Vegetable Juice', 'cleared', JUICE],
  ['Organic Monk Fruit Extract', 'cleared', MONK],
];
const TODDY: Ing[] = [
  ['Organic Gum Arabic', 'cleared', GUM],
  ['Organic Lemon Powder', 'cleared', JUICE],
  ['Citric Acid', 'cleared', CITRIC],
  ['Silica', 'moderate', SILICA],
  ['Pink Salt', 'cleared', T138],
  ['Organic Monk Fruit Extract', 'cleared', MONK],
  ['Organic Lemon Flavor', 'moderate', LEMON_FLAVOR],
  ['Organic Stevia Extract', 'cleared', T138],
];
const JAR: Ing[] = [
  ['Organic Lemonade Flavor Powder', 'cleared', T138],
  ['Organic Lemon Flavor', 'moderate', LEMON_FLAVOR],
  ['Organic Lemon Powder', 'cleared', JUICE],
  ['Citric Acid', 'cleared', CITRIC],
  ['Organic Blue Spirulina', 'cleared', T138],
  ['Organic Monk Fruit Extract', 'cleared', MONK],
  ['Organic Stevia extract (REB A)', 'cleared', T138],
];

const ACTIVE_25 = 'Adhesive Crafted with 25 mg caffeine per patch';
const B12_PHRASE = 'Adhesive Crafted with 15 mg of Caffeine per patch';
const NITE_PHRASE = 'Adhesive Crafted with 3 mg melatonin per patch';

const slumber = [
  { name: 'L-Theanine' },
  { name: 'Magnesium Gluconate' },
  { name: 'Tart Cherry Extract (Prunus Cerasus)' },
  { name: 'Black Pepper Extract (Piper Nigrum)' },
];
const rescue = [
  { name: 'DHM (Dihydromyricetin from Ampelopsis grossedentata Extract)' },
  { name: 'Green Tea Extract (Camellia sinensis)' },
  { name: 'Vitamin B1 (Thiamine)' },
  { name: 'Black Pepper Extract (Piper nigrum)' },
];
const relax = [
  { name: 'Ashwagandha Root Powder' },
  { name: 'Rhodiola Extract (Rhodiola rosea)' },
  { name: 'Passionflower Powder' },
  { name: 'Menthyl Lactate' },
  { name: 'Ginger Root Extract' },
  { name: 'L-Theanine' },
  { name: 'GABA' },
  { name: 'Magnesium Beta Hydroxybutyrate' },
  { name: 'CoQ10' },
  { name: 'Black Pepper Extract (Piper nigrum)' },
  { name: 'D-Calcium Pantothenate' },
  { name: 'Vitamin B6 (Pyridoxine HCl)' },
  { name: 'Folic Acid' },
  { name: 'Vitamin B12 (Cyanocobalamin)' },
];
const desire = [
  { name: 'Vitamin B6 (Pyridoxine HCl)' },
  { name: 'Reishi Extract (Ganoderma lucidum)' },
  { name: 'Black Maca Root Powder' },
  { name: 'Panax Ginseng Extract' },
  { name: 'Black Pepper Extract (Piper nigrum)' },
];
const hot = [
  { name: 'Industrial Hemp Extract' },
  { name: 'Menthyl Lactate' },
  { name: 'Black Cohosh (Cimicifuga racemosa)' },
  { name: 'Black Pepper Extract (Piper nigrum)' },
];
const hemp = [
  { name: 'Industrial Hemp Extract' },
  { name: 'Black Pepper Extract (Piper nigrum)' },
];
const calm = [
  { name: 'Industrial Hemp Extract' },
  { name: 'Menthyl Lactate' },
  { name: 'Ashwagandha Root Powder' },
  { name: 'Passionflower Powder' },
  { name: 'Black Pepper Extract (Piper nigrum)' },
];
const owl = [
  { name: 'L-theanine (plant-derived)' },
  { name: 'Tart Cherry (Prunus cerasus)' },
  { name: 'Chamomile' },
  { name: 'Skullcap (Scutellaria lateriflora)' },
];
const active = [
  { name: 'Caffeine' },
  { name: 'Beta Alanine' },
  { name: 'L-Citrulline' },
  { name: 'Rhodiola Extract (Rhodiola Rosea)' },
];
const b12 = [
  { name: 'Caffeine' },
  { name: 'Green Tea Extract (Camellia sinensis)' },
  { name: 'Vitamin B12 (Cyanocobalamin)' },
];
const nite = [
  { name: 'Industrial Hemp Extract' },
  { name: 'Melatonin' },
  { name: 'Black Pepper Extract (Piper nigrum)' },
];

function counts(
  slug: string,
  title: string,
  category: string,
  actives: ActiveIngredient[],
  line: string,
  handle: string,
  sizes: ReadonlyArray<readonly [number, string]>,
  extra?: { audience?: 'adult' | 'kids'; minAge?: number; inactive?: string; barcodeFor?: number; barcode?: string },
): RatingRecord[] {
  return sizes.map(([count, price]) =>
    patch({
      id: `goodpatch-b332-${slug}-${count}`,
      productName: `The Good Patch ${title} (${count} patches)`,
      category,
      audience: extra?.audience,
      minAge: extra?.minAge,
      barcode: extra?.barcodeFor === count ? extra.barcode : undefined,
      actives,
      inactive: extra?.inactive ?? 'Adhesive',
      url: `https://thegoodpatch.com/products/${handle}`,
      price,
      line,
    }),
  );
}

export const BATCH332_KYR6E_T138E: RatingRecord[] = [
  ws({
    id: 'woodenspoon-b332-mag-tart-cherry',
    productName: 'Wooden Spoon Herbs Magic Magnesium Tart Cherry (about 20 servings)',
    form: 'powder',
    panel: 'Wooden Spoon Herbs brand facts image. Magic Magnesium Tart Cherry.',
    ings: TART,
    actives: [{ name: 'Magnesium Glycinate' }, { name: 'Plant-Based Melatonin' }],
    url: 'https://woodenspoonherbs.com/products/magic-magnesium-tart-cherry',
    price: '26',
    serving: '1 heaping tsp (7.6 g), about 20 servings',
  }),
  ws({
    id: 'woodenspoon-b332-fire-cider',
    productName: 'Wooden Spoon Herbs Fire Cider (about 15 servings)',
    form: 'liquid',
    panel: 'Wooden Spoon Herbs brand facts image. Fire Cider.',
    ings: [
      ['Organic Apple Cider', 'cleared', T138],
      ['Organic Honey', 'cleared', HONEY],
      ['Organic Lemon Juice', 'cleared', JUICE],
    ],
    actives: [{ name: 'Proprietary Herbal Blend' }],
    url: 'https://woodenspoonherbs.com/products/fire-cider',
    price: '34',
    serving: '15 mL (1 tablespoon), about 15 servings',
  }),
  ws({
    id: 'woodenspoon-b332-dandelion-bitters',
    productName: 'Wooden Spoon Herbs Dandelion Digestive Bitters (about 30 servings)',
    form: 'liquid',
    panel: 'Wooden Spoon Herbs brand facts image. Dandelion Digestive Bitters.',
    ings: [
      ['Purified Water', 'cleared', WATER],
      ['Organic Cane Alcohol', 'cleared', T138],
    ],
    actives: [{ name: 'Proprietary Blend' }],
    url: 'https://woodenspoonherbs.com/products/dandelion-digestive-bitters',
    price: '20',
    serving: '6 sprays (1 mL), about 30 servings',
  }),
  ws({
    id: 'woodenspoon-b332-tranquility',
    productName: 'Wooden Spoon Herbs Tranquility Tonic (about 33 servings)',
    form: 'liquid',
    panel: 'Wooden Spoon Herbs brand facts image. Tranquility Tonic.',
    ings: [
      ['Organic Vegetable Glycerin', 'cleared', GLYC],
      ['Organic Cane Alcohol (45-55% by volume)', 'cleared', T138],
    ],
    actives: [{ name: 'Proprietary Herbal Blend' }],
    url: 'https://woodenspoonherbs.com/products/tranquility-tonic',
    price: '29',
    serving: '1.75 mL, about 33 servings',
  }),
  ws({
    id: 'woodenspoon-b332-brain-bloom-60',
    productName: 'Wooden Spoon Herbs Brain Bloom (60 capsules)',
    form: 'capsule',
    panel: 'Wooden Spoon Herbs brand facts image. Brain Bloom.',
    ings: [
      ['Organic pullulan capsule (vegetarian capsule)', 'cleared', CELL],
      ['Organic Myceliated brown rice', 'cleared', T138],
    ],
    actives: [{ name: 'Proprietary Herbal Blend' }],
    url: 'https://woodenspoonherbs.com/products/brain-bloom',
    price: '34',
    serving: '1 capsule, 60 servings',
  }),
  ws({
    id: 'woodenspoon-b332-immune-toddy-10',
    productName: 'Wooden Spoon Herbs Lemon-Ginger Immune Toddy (10 sachets)',
    form: 'powder',
    panel: 'Wooden Spoon Herbs brand facts image. Lemon-Ginger Immune Toddy.',
    ings: TODDY,
    actives: [{ name: 'Proprietary Herbal Blend' }, { name: 'Vitamin C (from acerola juice)' }, { name: 'Zinc (from guava leaves)' }],
    url: 'https://woodenspoonherbs.com/products/lemon-ginger-immune-toddy',
    price: '20',
    serving: '1 sachet (3.3 g), 10 servings',
    honestNote:
      'Organic Lemon Powder is a fruit powder and is Cleared. Organic Lemon Flavor on the same panel is Caution under founder lock t106u. They are different tokens. Organic Lemon Flavor does not stack. Silica is the silicon dioxide Caution cap and does not stack. Counted Limited tokens: none.',
  }),
  ws({
    id: 'woodenspoon-b332-mag-jar-30',
    productName: 'Wooden Spoon Herbs Magic Magnesium Blue Lemonade (about 30 servings)',
    form: 'powder',
    panel: 'Wooden Spoon Herbs brand facts image. Magic Magnesium jar.',
    ings: JAR,
    actives: [{ name: 'Magnesium Citrate (from seawater)' }],
    url: 'https://woodenspoonherbs.com/products/magic-magnesium',
    price: '26',
    serving: '1 heaping tsp (3.5 g), about 30 servings',
    honestNote:
      'Organic Lemonade Flavor Powder is Cleared under founder lock t138e. Organic Lemon Flavor on the same panel is Caution under founder lock t106u. They are different tokens. Organic Lemon Flavor does not stack. Counted Limited tokens: none.',
  }),
  ...counts('active', 'Active', 'Herbs', active, `Caffeine, Beta Alanine, L-Citrulline, Rhodiola Extract (Rhodiola Rosea), ${ACTIVE_25}`, 'active', [[4, '12'], [16, '44'], [28, '84'], [40, '90']], { inactive: ACTIVE_25, barcodeFor: 4, barcode: '810109340422' }),
  ...counts('b12-awake', 'B12 Awake', 'Vitamins', b12, `Caffeine, Green Tea Extract (Camellia sinensis), Vitamin B12 (Cyanocobalamin), ${B12_PHRASE}`, 'b12-awake', [[4, '12'], [20, '60']], { inactive: B12_PHRASE, barcodeFor: 4, barcode: '860361001067' }),
  ...counts('nite-nite', 'Nite Nite', 'Sleep', nite, `15 mg Industrial Hemp Extract, Melatonin, Black Pepper Extract (Piper nigrum), ${NITE_PHRASE}`, 'nite-nite', [[4, '16'], [16, '56'], [28, '112'], [40, '120']], { inactive: NITE_PHRASE, barcodeFor: 4, barcode: '850014874643' }),
  ...counts('slumber', 'Slumber', 'Sleep', slumber, 'L-Theanine, Magnesium Gluconate, Tart Cherry Extract (Prunus Cerasus), Black Pepper Extract (Piper Nigrum), Adhesive', 'slumber', [[16, '44'], [28, '84'], [40, '90']]),
  ...counts('rescue', 'Rescue', 'Cold & Flu', rescue, '15 mg DHM (Dihydromyricetin from Ampelopsis grossedentata Extract), Green Tea Extract (Camellia sinensis), Vitamin B1 (Thiamine), Black Pepper Extract (Piper nigrum), Adhesive', 'rescue', [[8, '22'], [16, '44'], [28, '84'], [40, '90']]),
  ...counts('relax', 'Relax', 'Herbs', relax, 'Ashwagandha Root Powder, Rhodiola Extract (Rhodiola rosea), Passionflower Powder, Menthyl Lactate, Ginger Root Extract, L-Theanine, GABA, Magnesium Beta Hydroxybutyrate, CoQ10, Black Pepper Extract (Piper nigrum), D-Calcium Pantothenate, Vitamin B6 (Pyridoxine HCl), Folic Acid, Vitamin B12 (Cyanocobalamin), Adhesive', 'relax', [[16, '44'], [28, '84'], [40, '90']]),
  ...counts('desire', 'Desire', 'Herbs', desire, 'Vitamin B6 (Pyridoxine HCl), Reishi Extract (Ganoderma lucidum), Black Maca Root Powder, Panax Ginseng Extract, Black Pepper Extract (Piper nigrum), Adhesive', 'desire', [[16, '44'], [28, '84'], [40, '90']]),
  ...counts('hot-flash', 'Hot Flash', 'Herbs', hot, '15 mg Industrial Hemp Extract, Menthyl Lactate, Black Cohosh (Cimicifuga racemosa), Black Pepper Extract (Piper nigrum), Adhesive', 'hot-flash', [[16, '56'], [28, '112'], [40, '120']]),
  ...counts('hemp-queen', 'Hemp Queen', 'Herbs', hemp, '20 mg Industrial Hemp Extract, Black Pepper Extract (Piper nigrum), Adhesive', 'hemp-queen', [[16, '56'], [28, '112'], [40, '120']]),
  ...counts('be-calm', 'Be Calm', 'Herbs', calm, '15 mg Industrial Hemp Extract, Menthyl Lactate, Ashwagandha Root Powder, Passionflower Powder, Black Pepper Extract (Piper nigrum), Adhesive', 'be-calm', [[16, '56'], [28, '112'], [40, '120']]),
  ...counts('nite-owl', 'Nite Owl', 'Sleep', owl, 'L-theanine (plant-derived), Tart Cherry (Prunus cerasus), Chamomile, Skullcap (Scutellaria lateriflora), Adhesive', 'nite-owl', [[24, '44'], [42, '84'], [60, '90']], { audience: 'kids', minAge: 3 }),
];

const ROWS = BATCH332_KYR6E_T138E;
const NOTES = new Set(['woodenspoon-b332-immune-toddy-10', 'woodenspoon-b332-mag-jar-30']);
const CAUTION = new Set(NOTES);
const UPCS = new Set(['goodpatch-b332-active-4', 'goodpatch-b332-b12-awake-4', 'goodpatch-b332-nite-nite-4']);
if (ROWS.length !== 42) throw new Error(`batch332 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`batch332 dup ${record.id}`);
  ids.add(record.id);
  if (!record.id.includes('-b332-')) throw new Error(`batch332 id ${record.id}`);
  const expect = CAUTION.has(record.id) ? 'caution' : 'clean';
  if (record.verdict !== expect) throw new Error(`batch332 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) {
    if (!UPCS.has(record.id) || !upcCheck(record.barcode)) throw new Error(`batch332 upc ${record.id} ${record.barcode}`);
  } else if (UPCS.has(record.id)) {
    throw new Error(`batch332 missing upc ${record.id}`);
  }
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch332 stack ${record.id} ${counted.map((i) => i.name).join(',')}`);
  if (NOTES.has(record.id)) {
    if (!record.honestNote || !/Organic Lemon Flavor/.test(record.honestNote) || !/t106u/.test(record.honestNote)) {
      throw new Error(`batch332 note ${record.id}`);
    }
  } else if (record.honestNote) {
    throw new Error(`batch332 extra note ${record.id}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch332 blank ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch332 generic ${record.id} ${ingredient.name}: ${why}`);
    }
    if (!/t138e|t112u|t106u|t130u|citric acid|juice|Honey|water|Glycerin|gum|European review|2018 European review/i.test(why)) {
      throw new Error(`batch332 why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
