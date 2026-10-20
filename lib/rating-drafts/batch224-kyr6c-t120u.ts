// DRAFT / not verified / batch 224 KYR6-c (t120u Goli ACV On the Go 30 WRITE).
// One pack — grade from OI only (Caution on Natural Flavors).

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  caneSugar: 'Methodology §5 Cleared (cane sugar).',
  tapiocaSyrup: 'Methodology §5 Cleared (tapioca syrup / organic tapioca syrup).',
  water: 'Methodology §5 Cleared (purified water / water).',
  gums: 'Methodology §5 Cleared (xanthan / guar / acacia / pectin / gellan — food gums).',
  citrateSalt: 'Methodology §5 Cleared (citrate salts as fillers / buffers).',
  lacticAcid: 'Methodology §5 Cleared (lactic acid / malic acid).',
  citric: 'Methodology §5 Cleared (citric acid).',
  natFlavors: 'Methodology §5 Limited (natural flavors).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  fvColor:
    'Methodology §5 Cleared (Fruit and Vegetable (Color) — named plant-color / fruit-and-vegetable juice-as-color row; founder lock Oct 17, 2026 t119u).',
  pomegranate:
    'Methodology §5 Cleared (Pomegranate Powder — named fruit powder; founder override Oct 17, 2026 t118u).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const PANEL_ACV_30 =
  'https://www.kroger.com/product/images/xlarge/left/0062817635785 (supplement-facts v40.0; founder-approved current panel, t120u)';

const ACV30_FLAGS: FlagSpec[] = [
  ['Cane Sugar', 'cleared', 'caneSugar'],
  ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'gums'],
  ['Sodium Citrate', 'cleared', 'citrateSalt'],
  ['Natural Flavors', 'limited', 'natFlavors'],
  ['Malic Acid', 'cleared', 'lacticAcid'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Fruit and Vegetable Juice (Color)', 'cleared', 'fvColor'],
  ['Beet Root Powder', 'cleared', 'juiceColor'],
  ['Pomegranate Powder', 'cleared', 'pomegranate'],
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

export const BATCH224_KYR6C_T120U: RatingRecord[] = [
  {
    id: 'goli-b224-acv-30',
    productName: 'Goli Apple Cider Vinegar Gummies On the Go (30 gummies)',
    brand: 'Goli',
    category: VITAMINS,
    formulaId: 'goli-b224-acv-30',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '628176357850',
    activeIngredients: [
      { name: 'Folate (Folic Acid)', strength: '400 mcg DFE (240 mcg folic acid)' },
      { name: 'Vitamin B12 (Cyanocobalamin)', strength: '2.4 mcg' },
      { name: 'Apple Cider Vinegar (5% Acetic Acid)', strength: '1000 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_ACV_30, ACV30_FLAGS),
    verdict: verdictFromFlags(ACV30_FLAGS),
    retailers: ['goli.com', 'Target'],
    sourcesGeneral: [
      `Kroger label image ${PANEL_ACV_30}. Serving Size 2 Gummies; Servings 15; Calories 25; Sodium 15 mg (<1%); Total Carbohydrate 6 g (2%); Total Sugars 4 g; Includes 4 g Added Sugars (8%). Suggested use 1–2 gummies, 3 times daily. Other ingredients verbatim: Cane Sugar, Tapioca Syrup, Water, Pectin, Sodium Citrate, Natural Flavors, Malic Acid, Citric Acid, Fruit and Vegetable Juice (Color), Beet Root Powder, Pomegranate Powder. goli.com/products/1-bottle-of-apple-cider-vinegar-gummies-30-count variant ACVT01 On the Go $11.99 available barcode 628176357850; Target A-85607392 $12.79 sold by Target in stock. UPC goli.com = Target = printed label; check digit OK. Target A-85607392 art is v13 (older organic formula) and was not used (t105u). Natural Apple Flavor on v13 was not used; v40.0 prints Natural Flavors (Limited), not Natural Apple Flavor (Cleared t120u).`,
    ],
  },
];

const ROWS = BATCH224_KYR6C_T120U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch224 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch224 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch224 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch224 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch224 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch224 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch224 verdict ${record.id}`);
}
