// DRAFT / not verified / batch 254 KYR6-d. Does not repeat rows from 796, 805, 806, 811, 812, 813, or 814.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, limitedStackHonestNoteIfAny } from '../scan-preview/verdictFromFlags';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  wheat: 'Methodology §5 Cleared (Wheat flour — founder lock t157u Oct 21, 2026; food flour; not rice flour).',
  sugar: 'Methodology §5 Caution (bare sugar — the label does not name cane sugar).',
  cornOil:
    'Methodology §5 Cleared (Corn oil in a wafer — founder lock t156u Oct 21, 2026; fiber wafer; not the gummy Avoid print).',
  oats: 'Methodology §5 Cleared (Oats — founder lock t158u Oct 21, 2026; exact food oat; not Organic Oat Hull Fiber).',
  fructose: 'Methodology §5 Limited (fructose as sweetener — Sept 14, 2026; t87u; not high fructose corn syrup).',
  oatHull: 'Methodology §5 Cleared (Oat hull fiber — founder lock t157u Oct 21, 2026; not Organic Oat Hull Fiber).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named starch).',
  cinnamon: 'Methodology §5 Cleared (Cinnamon — founder lock t158u Oct 21, 2026; exact spice; not cinnamon bark oil).',
  lecithin: 'Methodology §5 Cleared (soy lecithin — named lecithin).',
  natArt:
    'Methodology §5 Limited (natural and artificial flavors — undisclosed mixture; a named taste does not clear the artificial half).',
  molasses: 'Methodology §5 Caution (Molasses — Sept 28, 2026).',
  nutmeg: 'Methodology §5 Cleared (Nutmeg — founder lock t158u Oct 21, 2026; exact spice).',
  bicarb: 'Methodology §5 Cleared (sodium bicarbonate).',
  ascorbic: 'Methodology §5 Cleared (ascorbic acid — preservative).',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin — generic starch sweetener; counts toward the t137u stack).',
  natFlavors: 'Methodology §5 Limited (natural flavors — unnamed mixture; counts toward the t137u stack).',
  stevia:
    'Methodology §5 Limited (Stevia — founder lock t158u Oct 21, 2026; exact token; counts toward the t137u stack; organic Rebaudioside A stays Cleared).',
  paprika:
    'Methodology §5 Cleared (Paprika extract (color) — founder lock t158u Oct 21, 2026; exact named plant color; paprika extract (natural color) stays Caution).',
  turmeric: 'Methodology §5 Cleared (turmeric (color) — named plant color).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  magStearate:
    'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_CINN =
  'Brookshire’s Add to Cart, product number 00037000740926. Fairway priced page prints UPC 00037000740926 and the same line. This is a fiber wafer';
const PANEL_SPARK =
  'Thrifty White UPC 030772095607 prints the line and is out of stock. Rite Aid search content prints the same line. Ralphs is Low Stock for UPC 0003077209560';
const PANEL_CAP = 'Target in stock and Cub Add to Cart, product number 00886790326519, print the same line';

const WAFER_NOTE =
  'Corn oil is Not clean when it is the base of a gummy. That is the form this app flags. This product is not a gummy. The oil is not the base of a gummy you chew, so it did not pull this grade down.';

const SPARK_INACTIVES: IngredientFlag[] = [
  flag(PANEL_SPARK, 'Citric acid', 'cleared', 'citric'),
  flag(PANEL_SPARK, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(PANEL_SPARK, 'Sodium bicarbonate', 'cleared', 'bicarb'),
  flag(PANEL_SPARK, 'Natural flavors', 'limited', 'natFlavors'),
  flag(PANEL_SPARK, 'Stevia', 'limited', 'stevia'),
  flag(PANEL_SPARK, 'Paprika extract (color)', 'cleared', 'paprika'),
  flag(PANEL_SPARK, 'Turmeric (color)', 'cleared', 'turmeric'),
];

const SPARK_NOTE = limitedStackHonestNoteIfAny(SPARK_INACTIVES);

export const BATCH254_KYR6D_T158U: RatingRecord[] = [
  {
    id: 'metamucil-b254-fiber-thins-cinnamon-12',
    productName: 'Metamucil Fiber Thins, Cinnamon Spice (12 count)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b254-fiber-thins-cinnamon-12',
    audience: ADULT,
    minAge: 4,
    form: 'wafer',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '037000740926',
    activeIngredients: [{ name: 'Psyllium husk', strength: '5 g fiber per packet' }],
    inactiveIngredients: [
      flag(PANEL_CINN, 'Wheat flour', 'cleared', 'wheat'),
      flag(PANEL_CINN, 'Sugar', 'moderate', 'sugar'),
      flag(PANEL_CINN, 'Corn oil', 'cleared', 'cornOil'),
      flag(PANEL_CINN, 'Oats', 'cleared', 'oats'),
      flag(PANEL_CINN, 'Fructose', 'limited', 'fructose'),
      flag(PANEL_CINN, 'Oat hull fiber', 'cleared', 'oatHull'),
      flag(PANEL_CINN, 'Corn starch', 'cleared', 'cornStarch'),
      flag(PANEL_CINN, 'Cinnamon', 'cleared', 'cinnamon'),
      flag(PANEL_CINN, 'Soy lecithin', 'cleared', 'lecithin'),
      flag(PANEL_CINN, 'Natural and artificial flavors', 'limited', 'natArt'),
      flag(PANEL_CINN, 'Molasses', 'moderate', 'molasses'),
      flag(PANEL_CINN, 'Nutmeg', 'cleared', 'nutmeg'),
      flag(PANEL_CINN, 'Sodium bicarbonate', 'cleared', 'bicarb'),
      flag(PANEL_CINN, 'Ascorbic acid', 'cleared', 'ascorbic'),
    ],
    verdict: 'caution',
    honestNote: WAFER_NOTE,
    retailers: ['Brookshire’s', 'Fairway', 'Rite Aid'],
    sourcesGeneral: [
      'Psyllium husk is the fiber active and is not graded. Contains soy and wheat are disclosures, not tokens. Fructose and natural and artificial flavors are the two stack-eligible Limited tokens, so the row is Caution. This is not a 3+ Limited stack. Sugar and molasses are Caution and do not stack. Oats, cinnamon, and nutmeg are Cleared (t158u). Corn oil in this fiber wafer is Cleared (t156u). There is no brown sugar on this line. Brookshire’s has Add to Cart at $10.99, product number 00037000740926, and the full line. Fairway’s priced page prints UPC 00037000740926 and the same line. Rite Aid SKU 0034554 prints the same line. Ages 4 and up. 5 g fiber per packet. UPC check digit OK.',
    ],
  },
  {
    id: 'metamucil-b254-sparkling-fiber-vitamins',
    productName: 'Metamucil Fiber + Vitamins C, D, and B12 Sparkling Powder, Citrus (24.9 oz)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b254-sparkling-fiber-vitamins',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030772095607',
    activeIngredients: [
      { name: 'Psyllium husk', strength: '3 g dietary fiber per serving' },
      { name: 'Vitamin C', strength: '90 mg' },
      { name: 'Vitamin D', strength: '5 mcg' },
      { name: 'Vitamin B12', strength: '2.4 mcg' },
    ],
    inactiveIngredients: SPARK_INACTIVES,
    verdict: 'avoid',
    honestNote: SPARK_NOTE,
    retailers: ['Ralphs', 'Thrifty White', 'Rite Aid'],
    sourcesGeneral: [
      'Psyllium husk, vitamin C, vitamin D, and vitamin B12 are supplement-facts ingredients and are not graded. Maltodextrin, natural flavors, and stevia are the three stack-eligible Limited tokens. That 3+ Limited stack is the Avoid. Paprika extract (color) is Cleared (t158u). Turmeric (color) is a named plant color. Organic Rebaudioside A stays Cleared and is not this stevia token. Ralphs is Low Stock at $40.99, aisle 18, UPC 0003077209560. Thrifty White prints UPC 030772095607 and the full line and is out of stock (stock 0). The Rite Aid search page prints the same line; its store template shows both in stock and out of stock, so that store’s stock is not the sale proof. Ages 12 and up. UPC check digit OK.',
    ],
  },
  {
    id: 'metamucil-b254-clear-fiber-11-6',
    productName: 'Metamucil Clear Fiber Blend, Unflavored (11.6 oz)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b254-clear-fiber-11-6',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030772146576',
    activeIngredients: [
      { name: 'Soluble corn fiber (Fibersol)', strength: 'part of 3 g fiber per rounded teaspoon' },
      { name: 'Inulin', strength: 'part of 3 g fiber per rounded teaspoon' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['Thrifty White', 'Fairway', 'Stop & Shop'],
    sourcesGeneral: [
      'Soluble corn fiber (Fibersol) and inulin are the labeled fiber actives and are not graded. The ingredient line has no other token, so the row is Clean. Thrifty White is in stock (5), UPC 030772146576, and prints that two-ingredient line. Fairway’s priced page prints UPC 00030772146576 and the same line. Stop & Shop prints the same line. Ages 12 and up. UPC check digit OK.',
    ],
  },
  {
    id: 'benefiber-b254-caplets-84',
    productName: 'Benefiber Prebiotic Fiber Caplets (84 count)',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b254-caplets-84',
    audience: ADULT,
    minAge: 6,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '886790326519',
    activeIngredients: [{ name: 'Wheat dextrin', strength: '3 g dietary fiber per 3 caplets' }],
    inactiveIngredients: [
      flag(PANEL_CAP, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_CAP, 'Magnesium stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'clean',
    retailers: ['Target', 'Cub'],
    sourcesGeneral: [
      'Wheat dextrin is the fiber active and is not graded. Microcrystalline cellulose and magnesium stearate are Cleared, so the row is Clean. Target is in stock at $18.99 and prints wheat dextrin, microcrystalline cellulose, and less than 2% magnesium stearate. Cub has Add to Cart at $18.99, product number 00886790326519, and the same line. The Haleon caplet artwork prints that same 12-digit code. Ages 6 and up. UPC check digit OK.',
    ],
  },
  {
    id: 'benefiber-b254-sticks-unflavored-28',
    productName: 'Benefiber Prebiotic Fiber Sticks, Unflavored (28 count)',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b254-sticks-unflavored-28',
    audience: ADULT,
    minAge: 6,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '886790162803',
    activeIngredients: [{ name: 'Wheat dextrin', strength: '3 g dietary fiber per stick' }],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['Target', 'Meijer', 'Drugs Depot'],
    sourcesGeneral: [
      'Wheat dextrin is the fiber active and is not graded. The ingredient line has no other token, so the row is Clean. Target is in stock at $13.79 and prints wheat dextrin. Meijer is in stock at Alpine and describes the same 28-count wheat-dextrin stick. Drugs Depot prints UPC 886790162803 on that 28-count. Ages 6 and up; a full stick is the 12-and-older serving. UPC check digit OK.',
    ],
  },
];

const ROWS = BATCH254_KYR6D_T158U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 5) throw new Error(`batch254 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch254 duplicate id');
for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch254 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.id === 'metamucil-b254-fiber-thins-cinnamon-12') {
    if (rollup.cause === 'limited_stack') throw new Error('batch254 cinnamon unexpected stack');
    if (record.honestNote !== WAFER_NOTE) throw new Error('batch254 wafer note text');
    if (contradictionHonestNote(record) !== WAFER_NOTE) throw new Error('batch254 wafer note mismatch');
  } else if (record.id === 'metamucil-b254-sparkling-fiber-vitamins') {
    if (rollup.cause !== 'limited_stack') throw new Error(`batch254 spark cause ${rollup.cause}`);
    const expected = limitedStackHonestNoteIfAny(record.inactiveIngredients);
    if (!expected || record.honestNote !== expected) throw new Error(`batch254 spark note ${record.honestNote} vs ${expected}`);
  } else if (record.honestNote) {
    throw new Error(`batch254 unexpected honest note ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch254 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source)) {
      throw new Error(`batch254 pending ${ingredient.name}`);
    }
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch254 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
