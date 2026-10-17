// DRAFT / not verified / batch 188 KYR6-c.
// Held Nature's Bounty packs plus counts whose ladder finished with panel + sale.
// batch187 rows are not rewritten. Schiff (non–Move Free), Osteo Bi-Flex, and Citracal
// stay unwritten where the ladder did not pair panel and sale.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate antioxidant).',
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  caramel: 'Methodology §5 Avoid (caramel color — class not named as I or II).',
  cane: 'Methodology §5 Cleared (cane sugar).',
  carnauba: 'Methodology §5 Caution (carnauba wax).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  citric: 'Methodology §5 Cleared (citric acid).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dye: 'Methodology §5 Avoid (synthetic dye / FD&C lake).',
  flavors: 'Methodology §5 Limited (natural flavors).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  lecithin: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  modStarch: 'Methodology §5 Limited (modified corn starch).',
  palm: 'Methodology §5 Avoid (vegetable oil / palm oil in a gummy).',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  pectin: 'Methodology §5 Cleared (pectin).',
  phosphate: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate / tribasic calcium phosphate).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral coating).',
  riceBranGummy:
    'Methodology §5 Avoid (rice bran oil in a gummy base). Same call as sunflower oil in a gummy. Softgel or capsule fill stays Cleared. Locked Oct 15, 2026.',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not the gummy seed-oil rule).',
  sulfiting:
    'Methodology §5 Caution (sulfiting agents). FDA requires the label at 10 ppm. Sensitivity pattern. Locked Oct 15, 2026.',
  talc: 'Methodology §5 Avoid (talc). Magnesium silicate is that row in a swallowed product.',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  tocopherol: 'Methodology §5 Cleared (tocopherols).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const VITAL_PANEL = 'https://naturesbounty.com/products/advanced-vital-heart';
const BEETS_PANEL = 'https://naturesbounty.com/products/beets-coq10-gummies';
const CALTRATE_PANEL = 'https://dsld.od.nih.gov/label/202231';
const MF_PANEL = 'https://dsld.od.nih.gov/label/63734';
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

const VITAL_FLAGS: IngredientFlag[] = [
  flag(VITAL_PANEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(VITAL_PANEL, 'Vegetable glycerin', 'cleared', METH.glycerin),
  flag(VITAL_PANEL, 'Soybean oil', 'cleared', METH.soyFill),
  flag(VITAL_PANEL, 'Caramel color', 'high', METH.caramel),
  flag(VITAL_PANEL, 'Lecithin', 'cleared', METH.lecithin),
  flag(VITAL_PANEL, 'Sulfiting agents', 'limited', METH.sulfiting),
  flag(VITAL_PANEL, 'Yellow beeswax', 'cleared', METH.beeswax),
];

const BEETS_FLAGS: IngredientFlag[] = [
  flag(BEETS_PANEL, 'Glucose syrup', 'cleared', METH.glucose),
  flag(BEETS_PANEL, 'Cane sugar', 'cleared', METH.cane),
  flag(BEETS_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
  flag(BEETS_PANEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(BEETS_PANEL, 'Rice bran oil', 'high', METH.riceBranGummy),
  flag(BEETS_PANEL, 'Carnauba wax', 'limited', METH.carnauba),
  flag(BEETS_PANEL, 'Citric acid', 'cleared', METH.citric),
  flag(BEETS_PANEL, 'Natural flavor', 'limited', METH.flavors),
  flag(BEETS_PANEL, 'Pectin', 'cleared', METH.pectin),
  flag(BEETS_PANEL, 'Sunflower lecithin', 'cleared', METH.lecithin),
  flag(BEETS_PANEL, 'Vegetable oil (palm)', 'high', METH.palm),
];

const MF_FLAGS: IngredientFlag[] = [
  flag(MF_PANEL, 'Microcrystalline cellulose', 'cleared', METH.cellulose),
  flag(MF_PANEL, 'Hydroxypropyl methylcellulose', 'cleared', METH.hpmc),
  flag(MF_PANEL, 'Modified corn starch', 'limited', METH.modStarch),
  flag(MF_PANEL, 'Titanium dioxide', 'high', METH.tio2),
  flag(MF_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(MF_PANEL, 'Magnesium silicate', 'high', METH.talc),
  flag(MF_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(MF_PANEL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
  flag(MF_PANEL, 'Magnesium stearate', 'cleared', METH.magStearate),
  flag(MF_PANEL, 'Silicon dioxide', 'limited', METH.silica),
  flag(MF_PANEL, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
];

export const BATCH188_KYR6C_VITAMIN_HELD: RatingRecord[] = [
  {
    id: 'natures-bounty-b188-vital-heart-60',
    productName: "Nature's Bounty Advanced Vital Heart with CoQ10 + Magnesium (60 softgels)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: 'natures-bounty-b188-vital-heart',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Coenzyme Q-10', strength: '200 mg' },
      { name: 'Magnesium', strength: '85 mg' },
      { name: 'Phytosterols', strength: '400 mg' },
    ],
    inactiveIngredients: VITAL_FLAGS,
    verdict: 'avoid',
    retailers: ['Vitacost', 'Walgreens', 'Cub'],
    sourcesGeneral: [
      "Brand page advanced-vital-heart was read. Serving size 2 softgels. Servings per container 30, which is 60 softgels. Other ingredients: gelatin, vegetable glycerin, soybean oil. Contains <2% of: caramel color, lecithin, sulfiting agents, yellow beeswax. DailyMed carton bars: no Advanced Vital Heart SPL on DailyMed. Target search for this SKU did not open a product card. CVS returned 403. Walgreens search opened Nature's Bounty Advanced Vital Heart with CoQ10 + Magnesium, 60 ea, at $39.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Vitacost opened Nature's Bounty Advanced Vital Heart with CoQ10 + Magnesium, 60 rapid release softgels, at $26.99 with Add to cart. Vitacost printed SKU 074312016462 on that count. Google AI mode last cited Vitacost and Walgreens pages that were opened for this 60-count.",
    ],
  },
  {
    id: 'natures-bounty-b188-beets-coq10-60',
    productName: "Nature's Bounty Beets + CoQ10 Gummies (60 gummies)",
    brand: "Nature's Bounty",
    category: VITAMINS,
    barcode: '074312016431',
    formulaId: 'natures-bounty-b188-beets-coq10-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Coenzyme Q-10', strength: '100 mg' },
      { name: 'Beet root extract', strength: '300 mg' },
    ],
    inactiveIngredients: BEETS_FLAGS,
    verdict: 'avoid',
    retailers: ['Vitacost', 'Walgreens', 'Kroger'],
    sourcesGeneral: [
      "Brand page beets-coq10-gummies was read. Serving size 2 gummies. Servings per container 30, which is 60 gummies. Other ingredients: glucose syrup, cane sugar, maltodextrin, gelatin, rice bran oil. Contains <2% of: carnauba wax, citric acid, natural flavor, pectin, sunflower lecithin, vegetable oil (palm). DailyMed had no SPL for this gummy. Target search did not open a matching count. CVS product page returned 403. Walgreens opened Nature's Bounty Beets & Co Q-10 Gummies Raspberry, 60 ea, at $24.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Kroger opened Nature's Bounty Beets & Co Q-10 Gummies, 60 ct, at $24.99 with Sign In to Add. Vitacost opened Beets & CoQ-10 Gummies, 60 gummies, at $16.87 with Add to cart and printed barcode 074312016431 on that count. Google AI mode last cited Vitacost, Walgreens, and Kroger pages that were opened for this 60-count.",
    ],
  },
  {
    id: 'caltrate-b188-600-d3-120',
    productName: 'Caltrate 600+D3 (120 tablets)',
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
      'DSLD label 202231 is Caltrate 600+D3, 120 tablets. The inactive line matches the 60- and 200-tablet labels already on MAIN. DailyMed carton bars: Caltrate supplement labels are on DSLD, not DailyMed drug SPLs. Brand site did not list a single 120-count buy box separate from the 200-count line. Target search did not open a 120-count Caltrate 600+D3 card. CVS search returned 403. Walgreens opened Caltrate Calcium and Vitamin D Supplement Tablets, 120 ea, at $18.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Google AI mode last cited the Walgreens 120-count listing that was opened.',
    ],
  },
  {
    id: 'move-free-b188-advanced-80',
    productName: 'Move Free Advanced with Glucosamine + Chondroitin (80 coated tablets)',
    brand: 'Move Free',
    category: VITAMINS,
    formulaId: 'move-free-b188-advanced-80',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Glucosamine hydrochloride', strength: '1500 mg' },
      { name: 'Chondroitin sulfate', strength: '200 mg' },
      { name: 'Hyaluronic acid', strength: '3.3 mg' },
      { name: 'Calcium fructoborate', strength: '216 mg' },
    ],
    inactiveIngredients: MF_FLAGS,
    verdict: 'avoid',
    retailers: ['Walgreens', 'Carewell'],
    sourcesGeneral: [
      'DSLD label 63734 is Move Free Advanced with glucosamine and chondroitin, 80 coated tablets. Other ingredients: cellulose, coating (hydroxypropyl methylcellulose, modified corn starch, titanium dioxide, polyethylene glycol, magnesium trisilicate, glycerin), croscarmellose sodium, magnesium stearate, silicon dioxide, hydroxypropyl cellulose. Schiff brand site opened Move Free Advanced product pages; size tabs showed 80 count but did not print the full inactive line in page HTML. Target opened Schiff Move Free Joint Health Advanced Tablets, 80 count, and printed the same coating line with titanium dioxide. CVS search returned 403. Walgreens opened Schiff Move Free Advanced Joint Supplement, 80 ea, at $19.99 with Add to cart. Amazon search returned 503. Walmart returned a robot check. Carewell opened Schiff Move Free Advanced Joint Health Tablets, 80 tablets, at $31.99 with Add to cart and printed the same inactive line. Google AI mode last cited Walgreens and Carewell pages that were opened for this 80-count.',
    ],
  },
];

const ROWS = BATCH188_KYR6C_VITAMIN_HELD;

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

if (ROWS.length !== 4) throw new Error(`batch188 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch188 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch188 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch188 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch188 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch188 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch188 verdict ${record.id}`);
}
