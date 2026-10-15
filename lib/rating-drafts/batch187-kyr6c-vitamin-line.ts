// DRAFT / not verified / batch 187 KYR6-c.
// Nature's Bounty, Slow Fe, Caltrate, and Rainbow Light counts whose panel was read
// and whose same count was for sale. Schiff, Move Free, Osteo Bi-Flex, and Citracal
// stay unwritten. A brand page that did not print the inactive line is not a panel.
// Combination packs, kits, and 2-packs are not rows.
// A barcode is attached only when an opened page tied that code to that count.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate antioxidant).',
  ascorbic: 'Methodology §5 Cleared (ascorbic acid).',
  carbomer: 'Methodology §5 Cleared (carbomer homopolymer).',
  carnauba: 'Methodology §5 Caution (carnauba wax).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  citric: 'Methodology §5 Cleared (citric acid).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dye: 'Methodology §5 Avoid (synthetic dye / FD&C lake).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  cane: 'Methodology §5 Cleared (cane sugar).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  flavors: 'Methodology §5 Limited (natural flavors).',
  palm: 'Methodology §5 Avoid (vegetable oil / palm oil in a gummy).',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  pectin: 'Methodology §5 Cleared (pectin).',
  phosphate: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate / tribasic calcium phosphate).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral coating).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  citrate: 'Methodology §5 Cleared (sodium citrate, citrate salt).',
  talc: 'Methodology §5 Avoid (talc). Magnesium silicate is that row in a swallowed product.',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  tocopherol: 'Methodology §5 Cleared (tocopherols).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const GENTLE_PANEL = 'https://naturesbounty.com/products/gentle-iron-28-mg-90-capsules';
const MAG_PANEL = 'https://naturesbounty.com/products/magnesium-citrate';
const MUSH_PANEL = 'https://naturesbounty.com/products/mushroom-complex';
const THREONATE_PANEL = 'https://naturesbounty.com/products/magnesium-l-threonate';
const WOMEN_PANEL = 'https://naturesbounty.com/products/women-s-50-multivitamin-gummies';
const SLOW_PANEL = 'https://dsld.od.nih.gov/label/240265';
const CALTRATE_PANEL = 'https://dsld.od.nih.gov/label/202235';
const RAINBOW_PANEL = 'https://www.rainbowlight.com/products/womens-one-real-food-nutrients-30-vegetarian-caplets-rl20412';

const CELL_ASCORBYL = (panel: string): IngredientFlag[] => [
  flag(panel, 'Vegetable cellulose', 'cleared', METH.cellulose),
  flag(panel, 'Ascorbyl palmitate', 'cleared', METH.ascorbyl),
];

const CALTRATE_FLAGS: IngredientFlag[] = [
  flag(CALTRATE_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
  flag(CALTRATE_PANEL, 'Blue 2 Lake', 'high', METH.dye),
  flag(CALTRATE_PANEL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
  flag(CALTRATE_PANEL, 'Magnesium stearate', 'cleared', METH.magStearate),
  flag(CALTRATE_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(CALTRATE_PANEL, 'Polyvinyl alcohol', 'cleared', METH.pva),
  flag(CALTRATE_PANEL, 'Red 40 Lake', 'high', METH.dye),
  flag(CALTRATE_PANEL, 'Talc', 'high', METH.talc),
  flag(CALTRATE_PANEL, 'Titanium dioxide', 'high', METH.tio2),
  flag(CALTRATE_PANEL, 'Tocopherols', 'cleared', METH.tocopherol),
  flag(CALTRATE_PANEL, 'Yellow 6 Lake', 'high', METH.dye),
];

const RAINBOW_FLAGS: IngredientFlag[] = [
  flag(RAINBOW_PANEL, 'Microcrystalline cellulose', 'cleared', METH.cellulose),
  flag(RAINBOW_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
  flag(RAINBOW_PANEL, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
  flag(RAINBOW_PANEL, 'Hypromellose', 'cleared', METH.hpmc),
  flag(RAINBOW_PANEL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
];

const WOMEN_FLAGS: IngredientFlag[] = [
  flag(WOMEN_PANEL, 'Glucose syrup', 'cleared', METH.glucose),
  flag(WOMEN_PANEL, 'Cane sugar', 'cleared', METH.cane),
  flag(WOMEN_PANEL, 'Pectin', 'cleared', METH.pectin),
  flag(WOMEN_PANEL, 'Carnauba wax', 'limited', METH.carnauba),
  flag(WOMEN_PANEL, 'Citric acid', 'cleared', METH.citric),
  flag(WOMEN_PANEL, 'Natural flavors', 'limited', METH.flavors),
  flag(WOMEN_PANEL, 'Vegetable juice (color)', 'cleared', METH.juice),
  flag(WOMEN_PANEL, 'Vegetable oil (palm)', 'high', METH.palm),
];

export const BATCH187_KYR6C_VITAMIN_LINE: RatingRecord[] = [
  {
    id: 'natures-bounty-b187-gentle-iron-90',
    productName: "Nature's Bounty Gentle Iron (90 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    barcode: '074312016035',
    formulaId: 'natures-bounty-b187-gentle-iron',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Vitamin C', strength: '60 mg' },
      { name: 'Folic acid', strength: '400 mcg' },
      { name: 'Vitamin B-12', strength: '8 mcg' },
      { name: 'Iron', strength: '28 mg' },
    ],
    inactiveIngredients: [
      flag(GENTLE_PANEL, 'Vegetable cellulose', 'cleared', METH.cellulose),
      flag(GENTLE_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(GENTLE_PANEL, 'Silica', 'limited', METH.silica),
      flag(GENTLE_PANEL, 'Vegetable magnesium stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Walgreens', 'Walmart', 'iHerb', 'Fairway'],
    sourcesGeneral: [
      "Brand page gentle-iron-28-mg-90-capsules was read. Other ingredients: vegetable cellulose, gelatin. Contains <2% of: silica, vegetable magnesium stearate. Serving size 1 capsule. Servings per container 90. Directions: for adults, one capsule daily. iHerb opened the 90-count and printed UPC 074312016035 on that count. Phil's Famous opened the same 90-count and printed the same UPC. Walgreens listed the 90-count at $11.99 with Add to cart. Walmart listed the 90-count at $10.45.",
    ],
  },
  {
    id: 'natures-bounty-b187-mag-citrate-90',
    productName: "Nature's Bounty Magnesium Citrate (90 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b187-cellulose-ascorbyl',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Magnesium', strength: '150 mg' }],
    inactiveIngredients: CELL_ASCORBYL(MAG_PANEL),
    verdict: 'clean',
    retailers: ['Kroger'],
    sourcesGeneral: [
      "Brand page magnesium-citrate was read. Title is 150 mg, 90 capsules. Other ingredients: vegetable cellulose, ascorbyl palmitate. Directions: for adults, one capsule daily. Kroger opened Nature's Bounty High Absorption Magnesium Citrate 150 mg, 90 ct, at $29.99 with pickup available. That page did not print a barcode in the text that opened.",
    ],
  },
  {
    id: 'natures-bounty-b187-mushroom-60',
    productName: "Nature's Bounty Mushroom Complex (60 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b187-cellulose-ascorbyl',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Maitake mushroom', strength: '200 mg' },
      { name: 'Reishi mushroom', strength: '200 mg' },
      { name: 'Shiitake mushroom', strength: '200 mg' },
    ],
    inactiveIngredients: CELL_ASCORBYL(MUSH_PANEL),
    verdict: 'clean',
    retailers: ['Navy Exchange'],
    sourcesGeneral: [
      "Brand page mushroom-complex was read. The count on the page is 60 capsules. Other ingredients: vegetable cellulose, ascorbyl palmitate. Same inactive line as the magnesium citrate 90-count just read. Directions: for adults, one capsule daily. Navy Exchange opened Nature's Bounty Advanced Mushroom Complex Capsules, 60-count, at $28.99. That listing did not print a barcode.",
    ],
  },
  {
    id: 'natures-bounty-b187-mag-threonate-90',
    productName: "Nature's Bounty Magnesium L-Threonate (90 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b187-threonate',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Vitamin C', strength: '60 mg' },
      { name: 'Vitamin D', strength: '10 mcg (400 IU)' },
      { name: 'Vitamin B-6', strength: '6 mg' },
      { name: 'Magnesium', strength: '144 mg' },
    ],
    inactiveIngredients: [
      flag(THREONATE_PANEL, 'Vegetable cellulose', 'cleared', METH.cellulose),
      flag(THREONATE_PANEL, 'Vegetable magnesium stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'clean',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Brand page magnesium-l-threonate was read. Serving size 3 capsules. Servings per container 30. The count on the page is 90 capsules. Other ingredients: vegetable cellulose, vegetable magnesium stearate. Amazon opened the 90-capsule bottle at $32.89. The page did not print a barcode tied to that count.',
    ],
  },
  {
    id: 'natures-bounty-b187-women-50-180',
    productName: "Nature's Bounty Women's 50+ Multivitamin Gummies (180 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b187-women-50-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Multivitamin / multimineral', strength: '2 gummies' },
      { name: 'Vitamin D', strength: '25 mcg (1,000 IU)' },
      { name: 'Calcium', strength: '100 mg' },
    ],
    inactiveIngredients: WOMEN_FLAGS,
    verdict: 'avoid',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page women-s-50-multivitamin-gummies was read. Serving size 2 gummies. Servings per container 90, which is 180 gummies. Other ingredients: glucose syrup, cane sugar, pectin. Contains <2% of: carnauba wax, citric acid, natural flavors, vegetable juice (color), vegetable oil (palm). Amazon opened Nature's Bounty Optimal Solutions Women's Multivitamin 50 Plus, 180 gummies, at $17.49. The page did not print a barcode tied to that count.",
    ],
  },
  {
    id: 'slowfe-b187-iron-60',
    productName: 'Slow Fe Slow Release Iron (60 tablets)',
    brand: 'Slow Fe',
    category: VITAMINS,
    formulaId: 'slowfe-b187-iron',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Iron', strength: '45 mg' }],
    inactiveIngredients: [
      flag(SLOW_PANEL, 'Dibasic calcium phosphate', 'cleared', METH.phosphate),
      flag(SLOW_PANEL, 'Silicied microcrystalline cellulose', 'cleared', METH.cellulose),
      flag(SLOW_PANEL, 'Hypromellose', 'cleared', METH.hpmc),
      flag(SLOW_PANEL, 'Carbomer homopolymer', 'cleared', METH.carbomer),
      flag(SLOW_PANEL, 'Ascorbic acid', 'cleared', METH.ascorbic),
      flag(SLOW_PANEL, 'Magnesium stearate', 'cleared', METH.magStearate),
      flag(SLOW_PANEL, 'Tribasic calcium phosphate', 'cleared', METH.phosphate),
      flag(SLOW_PANEL, 'Polyvinyl alcohol', 'cleared', METH.pva),
      flag(SLOW_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
      flag(SLOW_PANEL, 'Talc', 'high', METH.talc),
      flag(SLOW_PANEL, 'Titanium dioxide', 'high', METH.tio2),
      flag(SLOW_PANEL, 'FD&C Red 40 Lake', 'high', METH.dye),
      flag(SLOW_PANEL, 'FD&C Yellow 6 Lake', 'high', METH.dye),
      flag(SLOW_PANEL, 'FD&C Blue 1 Lake', 'high', METH.dye),
    ],
    verdict: 'avoid',
    retailers: ['Walgreens', 'Walmart'],
    sourcesGeneral: [
      'DSLD label 240265 was read. Slow Fe slow release iron supplement, 60 tablets. Iron 45 mg. Other ingredients: ferrous sulfate (the iron source, not an inactive flag), dibasic calcium phosphate, silicied microcrystalline cellulose, hypromellose, carbomer homopolymer, ascorbic acid, magnesium stearate, tribasic calcium phosphate, polyvinyl alcohol, polyethylene glycol, talc, titanium dioxide, FD&C Red 40 Lake, FD&C Yellow 6 Lake, FD&C Blue 1 Lake. Directions: adults, 1 tablet daily. Not intended for use in children. The label has no UPC. Walgreens opened the 60-count at $18.99 with Add to cart. Walmart listed the 60-count at $19.00. The 30-count was for sale and was not written. Its panel was not the 60-tablet label.',
    ],
  },
  {
    id: 'caltrate-b187-600-d3-60',
    productName: 'Caltrate 600+D3 (60 tablets)',
    brand: 'Caltrate',
    category: VITAMINS,
    formulaId: 'caltrate-b187-600-d3',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Calcium', strength: '600 mg' },
      { name: 'Vitamin D3', strength: '800 IU' },
    ],
    inactiveIngredients: CALTRATE_FLAGS,
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      'DSLD label 202225 is Caltrate 600+D3, 60 tablets. DSLD label 202235 is the same inactive line on 200 tablets. Other ingredients besides the calcium carbonate and cholecalciferol sources: maltodextrin, Blue 2 Lake, croscarmellose sodium, magnesium stearate, polyethylene glycol, polyvinyl alcohol, Red 40 Lake, talc, titanium dioxide, tocopherols, Yellow 6 Lake. Not formulated for use in children. Walgreens opened Caltrate 600+D3, 60 tablets, at $9.99 with Add to cart. Neither opened page printed one barcode tied to the 60-count.',
    ],
  },
  {
    id: 'caltrate-b187-600-d3-200',
    productName: 'Caltrate 600+D3 (200 tablets)',
    brand: 'Caltrate',
    category: VITAMINS,
    formulaId: 'caltrate-b187-600-d3',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Calcium', strength: '600 mg' },
      { name: 'Vitamin D3', strength: '800 IU' },
    ],
    inactiveIngredients: CALTRATE_FLAGS,
    verdict: 'avoid',
    retailers: ['Walgreens', 'Rite Aid'],
    sourcesGeneral: [
      'DSLD label 202235 is Caltrate 600+D3, 200 tablets. The inactive line matches the 60-tablet label just read. Walgreens opened Caltrate 600+D3, 200 tablets, at $24.99 with Add to cart. Rite Aid opened the 200-count at $24.99 with Add to cart. The DSLD record for the 200-count has no UPC. The opened store pages did not print one barcode tied to that count.',
    ],
  },
  {
    id: 'rainbow-b187-womens-one-30',
    productName: "Rainbow Light Women's One (30 caplets)",
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b187-womens-one',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [{ name: 'Multivitamin / multimineral', strength: '1 caplet' }],
    inactiveIngredients: RAINBOW_FLAGS,
    verdict: 'caution',
    retailers: ['Rainbow Light'],
    sourcesGeneral: [
      "Brand shop opened Women's One + Real Food Nutrients, 30 vegetarian caplets, at $14.43, in stock. The supplement-facts image on that page was read. Other ingredients: microcrystalline cellulose, maltodextrin, hydroxypropyl cellulose, hypromellose, croscarmellose sodium. DSLD label 311392 is the same 30-count line and has no UPC. The shop variant did not print a barcode.",
    ],
  },
  {
    id: 'rainbow-b187-womens-one-150',
    productName: "Rainbow Light Women's One (150 caplets)",
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b187-womens-one',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [{ name: 'Multivitamin / multimineral', strength: '1 caplet' }],
    inactiveIngredients: RAINBOW_FLAGS,
    verdict: 'caution',
    retailers: ['Rainbow Light'],
    sourcesGeneral: [
      "DSLD label 311394 is Women's One, 150 vegetarian tablets. The inactive line matches the 30-count panel just read. The brand shop opened Women's One + Real Food Nutrients, 150 vegetarian caplets, at $45.32, in stock. The shop variant did not print a barcode. DSLD stores 021888108831 on that label. It is not attached here because the opened shop page did not print it.",
    ],
  },
];

const ROWS = BATCH187_KYR6C_VITAMIN_LINE;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 10) throw new Error(`batch187 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch187 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch187 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch187 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch187 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch187 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch187 verdict ${record.id}`);
}
