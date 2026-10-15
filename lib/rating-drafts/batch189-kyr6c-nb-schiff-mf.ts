// DRAFT / not verified / batch 189 KYR6-c.
// Nature's Bounty, Schiff, and Move Free qualifying counts whose panel was read
// and whose same count was for sale. batch187 and batch188 rows are not rewritten.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  agar: 'Methodology §5 Cleared (agar / agar-agar).',
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate antioxidant).',
  carrageenan: 'Methodology §5 Limited (carrageenan).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  chicory: 'Methodology §5 Cleared (fructooligosaccharides from chicory root / inulin family).',
  citric: 'Methodology §5 Cleared (citric acid).',
  citrate: 'Methodology §5 Cleared (sodium citrate, citrate salt).',
  flavors: 'Methodology §5 Limited (natural flavors).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  modStarch: 'Methodology §5 Limited (modified corn starch).',
  modTapioca: 'Methodology §5 Limited (modified tapioca starch).',
  paprika: 'Methodology §5 Cleared (paprika extract as color).',
  pectin: 'Methodology §5 Cleared (pectin).',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  riceBranOi: 'Methodology §5 Caution (organic rice bran, unspecified bran).',
  riceHulls: 'Methodology §5 Cleared (rice hulls / rice hull extract family).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  tapioca: 'Methodology §5 Cleared (tapioca starch).',
  talc: 'Methodology §5 Avoid (talc). Magnesium silicate is that row in a swallowed product.',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  tocopherol: 'Methodology §5 Cleared (tocopherols).',
  wax: 'Methodology §5 Caution (carnauba wax).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const MAG_GLY_PANEL = 'https://naturesbounty.com/products/magnesium-glycinate';
const SHARP_PANEL = 'https://naturesbounty.com/products/superfoods-sharp-mind';
const OMEGA_PANEL = 'https://naturesbounty.com/products/plant-based-omega-3';
const PREBIO_PANEL = 'https://naturesbounty.com/products/prebiotic-postbiotic-probiotic-gummies';
const NEURIVA_PANEL =
  'https://www.schiffvitamins.com/collections/neuriva/products/neuriva-original-brain-health-clinically-tested-brain-supporting-supplement-with-natural-ingredients/';
const MF120_PANEL = 'https://dsld.od.nih.gov/label/328316';
const CVS_NEURIVA_PANEL =
  'https://www.cvs.com/shop/ingredients/neuriva-original-brain-support-supplement-supports-focus-memory-learning-accuracy-concentration-30-ct-prodid-181022';

const CELL_ASCORBYL = (panel: string): IngredientFlag[] => [
  flag(panel, 'Vegetable cellulose', 'cleared', METH.cellulose),
  flag(panel, 'Ascorbyl palmitate', 'cleared', METH.ascorbyl),
];

const MF120_FLAGS: IngredientFlag[] = [
  flag(MF120_PANEL, 'Microcrystalline cellulose', 'cleared', METH.cellulose),
  flag(MF120_PANEL, 'Hydroxypropyl methylcellulose', 'cleared', METH.hpmc),
  flag(MF120_PANEL, 'Modified corn starch', 'limited', METH.modStarch),
  flag(MF120_PANEL, 'Titanium dioxide', 'high', METH.tio2),
  flag(MF120_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(MF120_PANEL, 'Magnesium silicate', 'high', METH.talc),
  flag(MF120_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(MF120_PANEL, 'Magnesium stearate', 'cleared', METH.magStearate),
];

const NEURIVA_FLAGS: IngredientFlag[] = [
  flag(NEURIVA_PANEL, 'Rice bran', 'limited', METH.riceBranOi),
  flag(NEURIVA_PANEL, 'Hypromellose', 'cleared', METH.hpmc),
  flag(NEURIVA_PANEL, 'Carrageenan', 'limited', METH.carrageenan),
  flag(NEURIVA_PANEL, 'Titanium dioxide', 'high', METH.tio2),
  flag(NEURIVA_PANEL, 'Pectin', 'cleared', METH.pectin),
  flag(NEURIVA_PANEL, 'Microcrystalline cellulose', 'cleared', METH.cellulose),
  flag(NEURIVA_PANEL, 'Silicon dioxide', 'limited', METH.silica),
  flag(CVS_NEURIVA_PANEL, 'Magnesium stearate', 'cleared', METH.magStearate),
];

export const BATCH189_KYR6C_NB_SCHIFF_MF: RatingRecord[] = [
  {
    id: 'natures-bounty-b189-mag-glycinate-90',
    productName: "Nature's Bounty Magnesium Glycinate (90 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b187-cellulose-ascorbyl',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Magnesium', strength: '240 mg' }],
    inactiveIngredients: CELL_ASCORBYL(MAG_GLY_PANEL),
    verdict: 'clean',
    retailers: ['Amazon', 'Walmart'],
    sourcesGeneral: [
      "Brand page magnesium-glycinate was read. Title is High Absorption Magnesium Glycinate, 90 capsules. Serving size 2 capsules. Servings per container 45. Other ingredients: vegetable cellulose, ascorbyl palmitate. Same inactive line as the magnesium citrate 90-count on MAIN. DailyMed had no Nature's Bounty magnesium glycinate SPL. Target search did not open a priced 90-count card. CVS returned 403. Walgreens search returned an empty shell without a product line. Amazon search opened Nature's Bounty Magnesium Glycinate 90 capsules with a buy box. Walmart search opened a 90-count listing with Add to cart. Google AI mode last cited Amazon and Walmart pages that were opened for this 90-count. Neither opened page printed a barcode tied to that count.",
    ],
  },
  {
    id: 'natures-bounty-b189-sharp-mind-30',
    productName: "Nature's Bounty Superfoods Sharp Mind (30 capsules)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b189-sharp-mind',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Superfoods blend', strength: '1 capsule' }],
    inactiveIngredients: [
      flag(SHARP_PANEL, 'Vegetable cellulose', 'cleared', METH.cellulose),
      flag(SHARP_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(SHARP_PANEL, 'Rice hulls', 'cleared', METH.riceHulls),
      flag(SHARP_PANEL, 'Vegetable magnesium stearate', 'cleared', METH.magStearate),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      "Brand page superfoods-sharp-mind was read. The count on the page is 30 capsules. Other ingredients: vegetable cellulose, maltodextrin. Contains <2% of: rice hulls, vegetable magnesium stearate. DailyMed had no SPL. Target search did not open this SKU. CVS returned 403. Walgreens search did not print this 30-count with a price. Amazon search opened Superfoods Sharp Mind, 30 capsules, with Add to cart. Walmart returned a robot check. Google AI mode last cited the Amazon listing that was opened for this 30-count.",
    ],
  },
  {
    id: 'natures-bounty-b189-plant-omega-3-60',
    productName: "Nature's Bounty Plant-Based Omega-3 (60 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b189-plant-omega-3',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Omega-3', strength: 'per serving' }],
    inactiveIngredients: [
      flag(OMEGA_PANEL, 'Modified tapioca starch', 'limited', METH.modTapioca),
      flag(OMEGA_PANEL, 'Glycerin', 'cleared', METH.glycerin),
      flag(OMEGA_PANEL, 'Tocopherols', 'cleared', METH.tocopherol),
    ],
    verdict: 'caution',
    retailers: ['Walgreens', 'Amazon'],
    sourcesGeneral: [
      "Brand page plant-based-omega-3 was read. The count on the page is 60 softgels. Other ingredients: modified tapioca starch, glycerin, tocopherols. DailyMed had no SPL. Target search did not open a 60-count card. CVS returned 403. Walgreens search opened Plant-Based Omega-3, 60 softgels, with Add to cart. Amazon search opened the 60-count softgel bottle with a buy box. Walmart returned a robot check. Google AI mode last cited Walgreens and Amazon pages that were opened for this 60-count.",
    ],
  },
  {
    id: 'natures-bounty-b189-prebiotic-gummies-60',
    productName: "Nature's Bounty Prebiotic Postbiotic Probiotic Gummies (60 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b189-prebiotic-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Probiotic blend', strength: '2 gummies' }],
    inactiveIngredients: [
      flag(PREBIO_PANEL, 'Fructooligosaccharides (from chicory root)', 'cleared', METH.chicory),
      flag(PREBIO_PANEL, 'Agar-agar', 'cleared', METH.agar),
      flag(PREBIO_PANEL, 'Carnauba wax', 'limited', METH.wax),
      flag(PREBIO_PANEL, 'Citric acid', 'cleared', METH.citric),
      flag(PREBIO_PANEL, 'Natural flavors', 'limited', METH.flavors),
      flag(PREBIO_PANEL, 'Paprika extract (color)', 'cleared', METH.paprika),
      flag(PREBIO_PANEL, 'Pectin', 'cleared', METH.pectin),
      flag(PREBIO_PANEL, 'Sodium citrate', 'cleared', METH.citrate),
      flag(PREBIO_PANEL, 'Tapioca starch', 'cleared', METH.tapioca),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      "Brand page prebiotic-postbiotic-probiotic-gummies was read. Serving size 2 gummies. Servings per container 30, which is 60 gummies. Other ingredients: fructooligosaccharides (from chicory root). Contains <2% of: agar-agar, carnauba wax, citric acid, natural flavors, paprika extract (color), pectin, sodium citrate, tapioca starch. DailyMed had no SPL. Target search did not open this gummy. CVS returned 403. Walgreens search opened Prebiotic Postbiotic Probiotic Gummies, 60 gummies, with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens listing that was opened for this 60-count.",
    ],
  },
  {
    id: 'schiff-b189-neuriva-original-30',
    productName: 'Schiff Neuriva Original (30 capsules)',
    brand: 'Schiff',
    category: VITAMINS,
    barcode: '647865995470',
    formulaId: 'schiff-b189-neuriva-original',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Coffee fruit extract', strength: '100 mg' },
      { name: 'Phosphatidylserine', strength: '100 mg' },
    ],
    inactiveIngredients: NEURIVA_FLAGS,
    verdict: 'avoid',
    retailers: ['Walgreens', 'CVS'],
    sourcesGeneral: [
      "Schiff brand page neuriva-original was read. Other ingredients: rice bran, capsule (hypromellose, carrageenan, titanium dioxide, pectin), microcrystalline cellulose, silicon dioxide. Contains soy. Serving size 1 capsule. Servings per container 30. DailyMed had no Neuriva drug SPL. Target search did not open a priced 30-count Neuriva Original card. CVS Product Specifications opened for Neuriva Original Brain Support, 30 ct, and printed the same inactive line with titanium dioxide in the capsule. Walgreens opened Neuriva Brain Health Supplement, Support for Memory, Focus, Concentration and Learning, 30 ea, at $37.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Reckitt brand UPC table lists 6-47865-99547-0 for the USA 30-count bottle. Google AI mode last cited Walgreens and CVS pages that were opened for this 30-count.",
    ],
  },
  {
    id: 'move-free-b189-advanced-msm-120',
    productName: 'Move Free Advanced + MSM with Glucosamine (120 coated tablets)',
    brand: 'Move Free',
    category: VITAMINS,
    formulaId: 'move-free-b189-advanced-msm-120',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Glucosamine hydrochloride', strength: '1500 mg' },
      { name: 'MSM', strength: '1500 mg' },
      { name: 'Chondroitin sulfate', strength: '200 mg' },
      { name: 'Hyaluronic acid', strength: '3.3 mg' },
      { name: 'Calcium fructoborate', strength: '216 mg' },
    ],
    inactiveIngredients: MF120_FLAGS,
    verdict: 'avoid',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      'DSLD label 328316 is Move Free Advanced MSM with glucosamine, 120 coated tablets. Other ingredients: microcrystalline cellulose, coating (hydroxypropyl methylcellulose, modified corn starch, titanium dioxide, polyethylene glycol, glycerin, magnesium silicate), magnesium stearate. Different inactive line from Move Free Advanced 80 on MAIN because this pack adds MSM and uses a three-tablet daily serving. Schiff Move Free brand site opened Advanced + MSM pages; size tabs included 120 count but did not print the full inactive line in HTML. Target search did not open a 120-count Advanced + MSM card. CVS returned 403. Walgreens opened Move Free Advanced + MSM with Glucosamine, Joint Support Coated Tablets, 120 ea, at $19.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 120-count listing that was opened.',
    ],
  },
];

const ROWS = BATCH189_KYR6C_NB_SCHIFF_MF;

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

if (ROWS.length !== 6) throw new Error(`batch189 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch189 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch189 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch189 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch189 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch189 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch189 verdict ${record.id}`);
}
