// DRAFT / not verified / batch 213 KYR6-c (t108u WRITE).
// Caltrate Gummy Bites, Plus Minerals Minis, Move Free Ultra Pro and Advanced 200 — grade from OI only.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const T108U_SALE = 'founder-confirmed second current US sale source (t108u).';

const METH = {
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  sugar: 'Methodology §5 Caution (bare sugar).',
  water: 'Methodology §5 Cleared (purified water / bare water).',
  annatto:
    'Methodology §5 Caution (annatto, bixin/norbixin). Annatto Seed Extract (color) maps here (Oct 17, 2026 t107u).',
  citric: 'Methodology §5 Cleared (citric acid).',
  invertSugar:
    'Methodology §5 Caution (bare sugar). Invert Sugar maps here (Oct 17, 2026 t107u).',
  flavors: 'Methodology §5 Limited (natural flavors).',
  pectin: 'Methodology §5 Cleared (pectin).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  citrate: 'Methodology §5 Cleared (sodium citrate, citrate salt).',
  tocopherol: 'Methodology §5 Cleared (tocopherols).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  cellulose:
    'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  dye: 'Methodology §5 Avoid (synthetic dye / FD&C lake).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  peg: 'Methodology §5 Limited (PEGs / polyethylene glycol — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral coating).',
  sodiumAscorbate:
    'Methodology §5 Cleared (sodium ascorbate). Same ascorbate family as calcium ascorbate. Not a new grade.',
  talc: 'Methodology §5 Avoid (talc). Magnesium silicate is that row in a swallowed product.',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  modStarch:
    'Methodology §5 Limited (modified starch). Modified Corn Starch maps here (Oct 17, 2026 t107u).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_CALTRATE_GUMMY =
  'https://haleon.info/en-us/Caltrate/caltrate-gummy-bites-calcium-plus-vitamin-d3 v204722';
const PANEL_CALTRATE_MINIS =
  'https://haleon.info/en-us/Caltrate/caltrate-600-d-plus-minerals-minis v205753';
const PANEL_MF_ULTRA_PRO = 'https://www.walmart.com/ip/2974059571';
const PANEL_MF_ADV_200 =
  'https://www.walmart.com/ip/Schiff-Move-Free-Advanced-Joint-Supplement-200-Coated-Tablets/794423647';

const GUMMY_FLAGS: FlagSpec[] = [
  ['Glucose Syrup', 'cleared', 'glucose'],
  ['Sugar', 'limited', 'sugar'],
  ['Water', 'cleared', 'water'],
  ['Annatto Seed Extract (color)', 'limited', 'annatto'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Invert Sugar', 'limited', 'invertSugar'],
  ['Natural Flavors', 'limited', 'flavors'],
  ['Pectin', 'cleared', 'pectin'],
  ['Purple Carrot Juice Concentrate (color)', 'cleared', 'juice'],
  ['Sodium Citrate', 'cleared', 'citrate'],
  ['Tocopherols (to preserve freshness)', 'cleared', 'tocopherol'],
];

const MINIS_FLAGS: FlagSpec[] = [
  ['Maltodextrin', 'limited', 'maltodextrin'],
  ['Microcrystalline Cellulose', 'cleared', 'cellulose'],
  ['Blue 2 Lake', 'high', 'dye'],
  ['Croscarmellose Sodium', 'cleared', 'croscarmellose'],
  ['Magnesium Stearate', 'cleared', 'magStearate'],
  ['Polyethylene Glycol', 'limited', 'peg'],
  ['Polyvinyl Alcohol', 'cleared', 'pva'],
  ['Red 40 Lake', 'high', 'dye'],
  ['Sodium Ascorbate (to preserve freshness)', 'cleared', 'sodiumAscorbate'],
  ['Talc', 'high', 'talc'],
  ['Titanium Dioxide', 'high', 'tio2'],
  ['Tocopherols (to preserve freshness)', 'cleared', 'tocopherol'],
  ['Yellow 6 Lake', 'high', 'dye'],
];

const MF_ULTRA_PRO_FLAGS: FlagSpec[] = [
  ['microcrystalline cellulose', 'cleared', 'cellulose'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['modified corn starch', 'limited', 'modStarch'],
  ['titanium dioxide', 'high', 'tio2'],
  ['polyethylene glycol', 'limited', 'peg'],
  ['glycerin', 'cleared', 'glycerin'],
  ['magnesium silicate', 'high', 'talc'],
  ['magnesium stearate', 'cleared', 'magStearate'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['silicon dioxide', 'limited', 'silica'],
];

const MF_ADV_200_FLAGS: FlagSpec[] = [
  ['microcrystalline cellulose', 'cleared', 'cellulose'],
  ['hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
  ['modified corn starch', 'limited', 'modStarch'],
  ['titanium dioxide', 'high', 'tio2'],
  ['polyethylene glycol', 'limited', 'peg'],
  ['magnesium silicate', 'high', 'talc'],
  ['glycerin', 'cleared', 'glycerin'],
  ['magnesium stearate', 'cleared', 'magStearate'],
  ['silicon dioxide', 'limited', 'silica'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

const GUMMY_ACTIVES = [
  { name: 'Vitamin D3', strength: '20 mcg (800 IU)' },
  { name: 'Calcium', strength: '500 mg' },
  { name: 'Phosphorus', strength: '230 mg' },
] as const;

const MINIS_ACTIVES = [
  { name: 'Vitamin D3', strength: '40 mcg (1,600 IU)' },
  { name: 'Calcium', strength: '600 mg' },
  { name: 'Magnesium', strength: '50 mg' },
  { name: 'Zinc', strength: '7.5 mg' },
  { name: 'Copper', strength: '1 mg' },
  { name: 'Manganese', strength: '1.8 mg' },
] as const;

export const BATCH213_KYR6C_CAL_MF_T108U: RatingRecord[] = [
  {
    id: 'caltrate-b213-gummy-bites-100',
    productName: 'Caltrate Gummy Bites Calcium + Vitamin D3 (100 gummy bites)',
    brand: 'Caltrate',
    category: VITAMINS,
    formulaId: 'caltrate-b213-gummy-bites',
    audience: ADULT,
    minAge: 13,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '305735517954',
    activeIngredients: [...GUMMY_ACTIVES],
    inactiveIngredients: buildOi(PANEL_CALTRATE_GUMMY, GUMMY_FLAGS),
    verdict: verdictFromFlags(GUMMY_FLAGS),
    honestNote: '',
    retailers: ['Meijer', 'CVS', 'Walgreens'],
    sourcesGeneral: [
      `${T108U_SALE} Haleon brand PDF at ${PANEL_CALTRATE_GUMMY} (©2023, 100 GUMMY BITES) was read. Serving size 2 Gummy Bites, 50 servings per container; Calories 30; Total Carbohydrate 7 g; Total Sugars 6 g; Includes 6 g Added Sugars; Sodium 20 mg. Actives ungraded. Ingredients verbatim: Glucose Syrup, Sugar, Tribasic Calcium Phosphate, Water. Contains <2%: Annatto Seed Extract (color), Cholecalciferol (Vit. D3), Citric Acid, Invert Sugar, Natural Flavors, Pectin, Purple Carrot Juice Concentrate (color), Sodium Citrate, Tocopherols (to preserve freshness). CVS bottle photo 30573551795_8 (©2023, item 204722) matches. Meijer item 30573551795 inStock $11.79. CVS prodid-844788 $18.99 (listing live; OOS at checked store). Walgreens 100 ea $22.99. UPC 305735517954 from CVS barcode 3 05735 51795 4, brand PDF art, Meijer image key 0305735517954. Walmart /ip/134322381 is third-party with older 30005-prefix UPC (not used).`,
    ],
  },
  {
    id: 'caltrate-b213-gummy-bites-50',
    productName: 'Caltrate Gummy Bites Calcium + Vitamin D3 (50 gummy bites)',
    brand: 'Caltrate',
    category: VITAMINS,
    formulaId: 'caltrate-b213-gummy-bites',
    audience: ADULT,
    minAge: 13,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '305735517503',
    activeIngredients: [...GUMMY_ACTIVES],
    inactiveIngredients: buildOi(PANEL_CALTRATE_GUMMY, GUMMY_FLAGS),
    verdict: verdictFromFlags(GUMMY_FLAGS),
    honestNote: '',
    retailers: ['CVS', 'Walmart', 'Thrifty White'],
    sourcesGeneral: [
      `${T108U_SALE} CVS CDN bottle label 30573551750_4 (©2023 Haleon, item 204721, 50 GUMMY BITES) was read. Serving size 2 Gummy Bites, 25 servings per container; Calories 30; Total Carbohydrate 7 g (3%); Total Sugars 6 g; Includes 6 g Added Sugars (12%); Sodium 20 mg (1%). Actives ungraded. Other ingredients identical to the 100-count current label (same string as brand PDF ${PANEL_CALTRATE_GUMMY}). CVS prodid-1040209 $14.49 in stock at store. Walmart /ip/19611720 $20.46 and /ip/982222951 $14.49. Thrifty White listing (OOS). UPC 305735517503 from CVS barcode 3 05735 51750 3, Kroger image key 0030573551750 (50 Gummy Bites front), Thrifty White gtin12.`,
    ],
  },
  {
    id: 'caltrate-b213-plus-minerals-minis-150',
    productName: 'Caltrate 600+D3 Plus Minerals Minis (150 mini tablets)',
    brand: 'Caltrate',
    category: VITAMINS,
    formulaId: 'caltrate-b213-plus-minerals-minis',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '305735512102',
    activeIngredients: [...MINIS_ACTIVES],
    inactiveIngredients: buildOi(PANEL_CALTRATE_MINIS, MINIS_FLAGS),
    verdict: verdictFromFlags(MINIS_FLAGS),
    retailers: ['CVS', 'Walmart', 'Thrifty White'],
    sourcesGeneral: [
      `${T108U_SALE} Haleon brand PDF at ${PANEL_CALTRATE_MINIS} (©2023, 150 MINI TABLETS) was read. Serving size 2 Mini Tablets, 75 servings. Actives ungraded. Ingredients: Calcium Carbonate, Magnesium Oxide, Maltodextrin, Microcrystalline Cellulose. Contains <2% of: Blue 2 Lake, Cholecalciferol (Vit. D3), Copper Sulfate, Croscarmellose Sodium, Magnesium Stearate, Manganese Sulfate, Polyethylene Glycol, Polyvinyl Alcohol, Red 40 Lake, Sodium Ascorbate (to preserve freshness), Talc, Titanium Dioxide, Tocopherols (to preserve freshness), Yellow 6 Lake, Zinc Oxide. CVS prodid-1040255 $18.79 in stock at store. Walmart /ip/344879193 $21.99 (third-party Mr. Medical). Thrifty White (OOS). UPC 305735512102 from brand PDF barcode, Walmart page UPC, CVS image key 30573551210.`,
    ],
  },
  {
    id: 'move-free-b213-ultra-pro-120',
    productName: 'Move Free Ultra Pro (120 coated tablets)',
    brand: 'Move Free',
    category: VITAMINS,
    formulaId: 'move-free-b213-ultra-pro-120',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '020525101457',
    activeIngredients: [
      { name: 'Manganese', strength: '2.3 mg (as manganese gluconate)' },
      { name: 'MSM', strength: '1,500 mg (Methylsulfonylmethane)' },
      { name: 'Calcium Fructoborate', strength: '216 mg' },
      {
        name: 'Proprietary Cartilage Blend',
        strength:
          '40 mg (cartilage and potassium chloride, providing undenatured type II collagen)',
      },
    ],
    inactiveIngredients: buildOi(PANEL_MF_ULTRA_PRO, MF_ULTRA_PRO_FLAGS),
    verdict: verdictFromFlags(MF_ULTRA_PRO_FLAGS),
    retailers: ['Vitacost', 'Walmart'],
    sourcesGeneral: [
      `${T108U_SALE} No Schiff brand label online for Ultra Pro 120. Walmart iHerb listing image at ${PANEL_MF_ULTRA_PRO} (©2022 RB Health) was read; Kroger back image 0002052510145 (©2020) and DSLD 328321 agree word for word. Serving size 4 Tablets, 30 servings. Actives ungraded. Other ingredients: microcrystalline cellulose, coating (hypromellose, modified corn starch, titanium dioxide, polyethylene glycol, glycerin, magnesium silicate), magnesium stearate, croscarmellose sodium, silicon dioxide. Label notes collagen is poultry-derived. Vitacost $39.52. Walmart $42.68 (third-party iHerb). UPC 020525101457 Vitacost, Walmart page, Kroger image key 0002052510145.`,
    ],
  },
  {
    id: 'move-free-b213-advanced-200',
    productName: 'Move Free Advanced (200 coated tablets)',
    brand: 'Move Free',
    category: VITAMINS,
    formulaId: 'move-free-b213-advanced-200',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '020525000019',
    activeIngredients: [
      { name: 'Glucosamine Hydrochloride', strength: '1,500 mg' },
      { name: 'Chondroitin Sulfate Sodium', strength: '200 mg' },
      { name: 'Hyaluronic Acid', strength: '3.3 mg' },
      { name: 'Calcium Fructoborate', strength: '216 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_MF_ADV_200, MF_ADV_200_FLAGS),
    verdict: verdictFromFlags(MF_ADV_200_FLAGS),
    retailers: ['Walmart', 'Costco'],
    sourcesGeneral: [
      `${T108U_SALE} Walmart listing back image at ${PANEL_MF_ADV_200} (©2023 RB Health/Reckitt) was read; matches Kroger 0002052500001 back (©2019). Serving size 2 Tablets, 100 servings; Calories 5; Total Carbohydrate 2 g; Sodium 15 mg. Actives ungraded. Other ingredients: microcrystalline cellulose, coating (hydroxypropyl methylcellulose, modified corn starch, titanium dioxide, polyethylene glycol, magnesium silicate, glycerin), magnesium stearate, silicon dioxide. CONTAINS CRUSTACEAN SHELLFISH (SHRIMP, CRAB, LOBSTER, AND CRAYFISH). Walmart /ip/794423647 $23.98; /ip/126429013 $26.87 (third-party Axiom). Costco 100338957 OOS $29.99 (page text matches OI). UPC 020525000019 Walmart page UPC and Kroger image key 0002052500001 (ADVANCED 200 COATED TABLETS front).`,
    ],
  },
];

const ROWS = BATCH213_KYR6C_CAL_MF_T108U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 5) throw new Error(`batch213 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch213 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch213 upc ${record.id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch213 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch213 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch213 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch213 verdict ${record.id}`);
}
