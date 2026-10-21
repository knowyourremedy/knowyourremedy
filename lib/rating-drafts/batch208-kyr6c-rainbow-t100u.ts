// DRAFT / not verified / batch 208 KYR6-c (t100u WRITE).
// Rainbow Light three packs held from batch207 — brand Supplement Facts OI only; actives ungraded.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  computeVerdictFromInactiveIngredients,
  limitedStackHonestNoteIfAny,
  verdictFromFlagSpecs,
  verdictFromRiskLevels,
} from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  annatto:
    'Methodology §5 Caution (annatto / Annatto Extract Color — Sept 22, 2026 map).',
  citric: 'Methodology §5 Cleared (citric acid).',
  citrusFiber:
    'Methodology §5 Cleared (Citrus Fiber — inulin / food-fiber family; t90u Oct 17, 2026).',
  flavors: 'Methodology §5 Limited-risk (natural flavors opacity — Natural Flavor / Natural Flavors).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic vegetable glycerin).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — sweetener or color).',
  monkFruit:
    'Methodology §5 Cleared (monk fruit / mogrosides — Organic Monk Fruit Extract sibling row).',
  organicBeetColor:
    'Methodology §5 Cleared (organic beet root / beet root powder (for color) / named plant-color row).',
  organicFlavors:
    'Methodology §5 Caution (Organic Flavors — unnamed natural flavor family; t100u Oct 17, 2026; same row as Organic Natural Flavors, t90u).',
  organicTapiocaStarch:
    'Methodology §5 Limited (Organic Tapioca Starch — tapioca powder row; t100u Oct 17, 2026; same as Organic Tapioca Powder, t90u).',
  pectin: 'Methodology §5 Cleared (pectin).',
  steviaRebA:
    'Methodology §5 Cleared (stevia / steviol glycosides — Stevia Extract (Rebaudioside A) / Reb A).',
  sugar: 'Methodology §5 Cleared (sugar / cane sugar).',
  turmericExtractColor:
    'Methodology §5 Cleared (Turmeric Extract Color — Turmeric (Color) / turmeric-as-color only; t100u Oct 17, 2026; t75u Oct 16, 2026).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function rl(handle: string): string {
  return `https://www.rainbowlight.com/products/${handle}`;
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

type RowSpec = {
  id: string;
  handle: string;
  productName: string;
  category: string;
  form: RatingRecord['form'];
  barcode: string;
  active: string;
  oiLine: string;
  flags: FlagSpec[];
};

const SPECS: RowSpec[] = [
  {
    id: 'rainbow-b208-daily-fiber-probiotic-powder-11oz',
    handle: 'daily-fiber-probiotic-powder-delicious-raspberry-lemon-flavor-11-oz-312-g-powder-rl29532',
    productName:
      'Rainbow Light Daily Fiber + Probiotic Powder, Delicious Raspberry Lemon Flavor, 11 oz (312 g) Powder',
    category: DIGESTIVE,
    form: 'powder',
    barcode: '850068584994',
    active: 'Daily fiber + probiotic blend (10 g fiber, 25 probiotic strains per serving)',
    oiLine:
      'Citric Acid, Organic Flavors, Organic Stevia Extract (Rebaudioside A), Organic Beet Root (Color).',
    flags: [
      ['Citric Acid', 'cleared', 'citric'],
      ['Organic Flavors', 'moderate', 'organicFlavors'],
      ['Organic Stevia Extract (Rebaudioside A)', 'cleared', 'steviaRebA'],
      ['Organic Beet Root (Color)', 'cleared', 'organicBeetColor'],
    ],
  },
  {
    id: 'rainbow-b208-magnesium-glycinate-powder-5oz',
    handle: 'magnesium-glycinate-raspberry-lemonade-flavor-5-oz-142-g-powder-rl24492',
    productName:
      'Rainbow Light Magnesium Glycinate Powder, Raspberry Lemonade Flavor, 5 oz (142 g)',
    category: VITAMINS,
    form: 'powder',
    barcode: '850068584543',
    active: 'Magnesium glycinate (200 mg magnesium per serving)',
    oiLine:
      'Citric Acid, Organic Flavors, Cranberry Fruit Juice Powder (Color), Organic Stevia Extract (Rebaudioside A), Organic Monk Fruit Extract.',
    flags: [
      ['Citric Acid', 'cleared', 'citric'],
      ['Organic Flavors', 'moderate', 'organicFlavors'],
      ['Cranberry Fruit Juice Powder (Color)', 'cleared', 'juiceColor'],
      ['Organic Stevia Extract (Rebaudioside A)', 'cleared', 'steviaRebA'],
      ['Organic Monk Fruit Extract', 'cleared', 'monkFruit'],
    ],
  },
  {
    id: 'rainbow-b208-nad-advanced-gummies-60',
    handle: 'nad-advanced-gummies-delicious-peach-flavor-60-vegan-gummies-rl28941',
    productName: 'Rainbow Light NAD+ Advanced Gummies, Delicious Peach Flavor, 60 Vegan Gummies',
    category: VITAMINS,
    form: 'gummy',
    barcode: '850086437081',
    active: 'NAD+ (250 mg per serving)',
    oiLine:
      'Sugar, Glucose Syrup, Pectin, Vegetable Glycerin, Organic Tapioca Starch and/or Citrus Fiber, Natural Flavor, Turmeric Extract Color, Annatto Extract Color.',
    flags: [
      ['Sugar', 'cleared', 'sugar'],
      ['Glucose Syrup', 'cleared', 'glucose'],
      ['Pectin', 'cleared', 'pectin'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Organic Tapioca Starch', 'limited', 'organicTapiocaStarch'],
      ['Citrus Fiber', 'cleared', 'citrusFiber'],
      ['Natural Flavor', 'limited', 'flavors'],
      ['Turmeric Extract Color', 'cleared', 'turmericExtractColor'],
      ['Annatto Extract Color', 'moderate', 'annatto'],
    ],
  },
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

function toRecord(spec: RowSpec): RatingRecord {
  const panel = rl(spec.handle);
  const source = `Brand page ${panel} supplement-facts image (brand panel) was read; actives from brand product page (Shopify RL SKU). Other ingredients: ${spec.oiLine} Brand gtin12 ${spec.barcode}. Rainbow Light brand store in stock (t98u sale page). Amazon — founder-confirmed current US sale page (t98u). Row graded from the brand Supplement Facts label only; actives ungraded.`;
  const inactiveIngredients = buildOi(panel, spec.flags);
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients);
  return {
    id: spec.id,
    productName: spec.productName,
    brand: 'Rainbow Light',
    category: spec.category,
    formulaId: spec.id,
    audience: ADULT,
    minAge: 18,
    form: spec.form,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: spec.barcode,
    activeIngredients: [{ name: spec.active, strength: 'label serving' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    honestNote: limitedStackHonestNoteIfAny(inactiveIngredients),
    retailers: ['Rainbow Light', 'Amazon'],
    sourcesGeneral: [source],
  };
}

export const BATCH208_KYR6C_RAINBOW_T100U: RatingRecord[] = SPECS.map(toRecord);

const ROWS = BATCH208_KYR6C_RAINBOW_T100U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch208 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch208 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch208 upc ${record.id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch208 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch208 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch208 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch208 verdict ${record.id}`);
}
