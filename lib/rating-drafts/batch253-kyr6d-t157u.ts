// DRAFT / not verified / batch 253 KYR6-d. Does not repeat rows from 796, 805, 806, 811, 812, or 813.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

const JUICE =
  'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.';

const METH = {
  wheat: 'Methodology §5 Cleared (Wheat flour — founder lock t157u Oct 21, 2026; food flour; not rice flour).',
  sugar: 'Methodology §5 Caution (bare sugar — the label does not name cane sugar).',
  cornOil:
    'Methodology §5 Cleared (Corn oil in a wafer — founder lock t156u Oct 21, 2026; fiber wafer; not the gummy Avoid print).',
  fructose: 'Methodology §5 Limited (fructose as sweetener — Sept 14, 2026; t87u; not high fructose corn syrup).',
  oatHull: 'Methodology §5 Cleared (Oat hull fiber — founder lock t157u Oct 21, 2026; not Organic Oat Hull Fiber).',
  brown: 'Methodology §5 Caution (Brown sugar — founder lock t157u Oct 21, 2026; does not count toward the t137u stack).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named starch).',
  natArt:
    'Methodology §5 Limited (natural and artificial flavors — undisclosed mixture; a named taste does not clear the artificial half).',
  lecithin: 'Methodology §5 Cleared (soy lecithin — named lecithin).',
  molasses: 'Methodology §5 Caution (Molasses — Sept 28, 2026).',
  bicarb: 'Methodology §5 Cleared (sodium bicarbonate).',
  ascorbic: 'Methodology §5 Cleared (ascorbic acid — preservative).',
  water: 'Methodology §5 Cleared (purified water).',
  xylitol:
    'Methodology §5 Limited-risk (xylitol, oral — GI effects at volume; sugar-alcohol row; does not count toward the t137u stack).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  natFlavor:
    'Methodology §5 Caution (Natural Flavor, singular — unnamed natural flavor; not the Limited “natural flavors” mixture).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate — citrate-salt buffer).',
  juice: JUICE,
  coconut:
    'Methodology §5 Cleared (coconut oil, named, any form). Founder override Oct 17, 2026 t111u; the Sept 25, 2026 gummy-Avoid restamp is struck.',
  carnauba:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval).',
  mctGummy:
    'Methodology §5 Limited (MCT in a gummy — founder lock t132u Oct 20, 2026; no plant source named).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_APPLE =
  'Thrifty White in stock (471), UPC 037000740919. HerbsPro in stock, same UPC, full other-ingredient line. Hannaford and Kroger print the same line. This is a fiber wafer';
const PANEL_VIT =
  'Thrifty White in stock (11), UPC 030772089712. Vitacost prints the same UPC and the full line. The Metamucil fiber-plus-vitamins gummies page and the CVS ingredients page print the same line';

const WAFER_NOTE =
  'Corn oil is Not clean when it is the base of a gummy. That is the form this app flags. This product is not a gummy. The oil is not the base of a gummy you chew, so it did not pull this grade down.';

export const BATCH253_KYR6D_T157U: RatingRecord[] = [
  {
    id: 'metamucil-b253-fiber-thins-apple-12',
    productName: 'Metamucil Fiber Thins, Apple Crisp (12 count)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b253-fiber-thins-apple-12',
    audience: ADULT,
    minAge: 4,
    form: 'wafer',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '037000740919',
    activeIngredients: [{ name: 'Psyllium husk', strength: '4 g fiber per packet' }],
    inactiveIngredients: [
      flag(PANEL_APPLE, 'Wheat flour', 'cleared', 'wheat'),
      flag(PANEL_APPLE, 'Sugar', 'moderate', 'sugar'),
      flag(PANEL_APPLE, 'Corn oil', 'cleared', 'cornOil'),
      flag(PANEL_APPLE, 'Fructose', 'limited', 'fructose'),
      flag(PANEL_APPLE, 'Oat hull fiber', 'cleared', 'oatHull'),
      flag(PANEL_APPLE, 'Brown sugar', 'moderate', 'brown'),
      flag(PANEL_APPLE, 'Corn starch', 'cleared', 'cornStarch'),
      flag(PANEL_APPLE, 'Natural and artificial flavors', 'limited', 'natArt'),
      flag(PANEL_APPLE, 'Soy lecithin', 'cleared', 'lecithin'),
      flag(PANEL_APPLE, 'Molasses', 'moderate', 'molasses'),
      flag(PANEL_APPLE, 'Sodium bicarbonate', 'cleared', 'bicarb'),
      flag(PANEL_APPLE, 'Ascorbic acid', 'cleared', 'ascorbic'),
    ],
    verdict: 'caution',
    honestNote: WAFER_NOTE,
    retailers: ['Thrifty White', 'HerbsPro', 'Walmart'],
    sourcesGeneral: [
      'Psyllium husk is the fiber active and is not graded. Contains soy and wheat are disclosures, not tokens. Fructose and natural and artificial flavors are the two stack-eligible Limited tokens, so the row is Caution. This is not a 3+ Limited stack. Sugar, brown sugar, and molasses are Caution and do not stack. Corn oil in this fiber wafer is Cleared (t156u). Gummy corn oil stays Avoid. Wheat flour and oat hull fiber are Cleared (t157u). Thrifty White is in stock (471), UPC 037000740919. HerbsPro is in stock at $11.82 and prints the same UPC and the full line. Hannaford and Kroger print the same line. Walmart Apple Crisp, 12 count, is sold by Walmart.com. Ages 4 and up. UPC check digit OK.',
    ],
  },
  {
    id: 'metamucil-b253-fiber-vitamins-gummies-72',
    productName: 'Metamucil Fiber + Vitamins C, D, and B12 Gummies, Citrus Berry (72 gummies)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b253-fiber-vitamins-gummies-72',
    audience: ADULT,
    minAge: 12,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030772089712',
    activeIngredients: [
      { name: 'Inulin', strength: 'part of 5 g fiber per 3 gummies' },
      { name: 'Soluble corn fiber (Fibersol)', strength: 'part of 5 g fiber per 3 gummies' },
      { name: 'Vitamin C', strength: '90 mg' },
      { name: 'Vitamin D', strength: '5 mcg' },
      { name: 'Vitamin B12', strength: '2.4 mcg' },
    ],
    inactiveIngredients: [
      flag(PANEL_VIT, 'Water', 'cleared', 'water'),
      flag(PANEL_VIT, 'Xylitol', 'limited', 'xylitol'),
      flag(PANEL_VIT, 'Pectin', 'cleared', 'pectin'),
      flag(PANEL_VIT, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_VIT, 'Natural Flavor', 'moderate', 'natFlavor'),
      flag(PANEL_VIT, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
      flag(PANEL_VIT, 'Black carrot juice (color)', 'cleared', 'juice'),
      flag(PANEL_VIT, 'Coconut oil', 'cleared', 'coconut'),
      flag(PANEL_VIT, 'Carnauba wax', 'cleared', 'carnauba'),
      flag(PANEL_VIT, 'Medium-chain triglycerides', 'limited', 'mctGummy'),
      flag(PANEL_VIT, 'Purple carrot juice (color)', 'cleared', 'juice'),
    ],
    verdict: 'caution',
    retailers: ['Thrifty White', 'Vitacost', 'Metamucil', 'CVS'],
    sourcesGeneral: [
      'Inulin, soluble corn fiber (Fibersol), vitamin C, vitamin D, and vitamin B12 are supplement-facts ingredients and are not graded. The only stack-eligible Limited token is medium-chain triglycerides with no plant named (t132u). Xylitol does not count toward the t137u stack. Natural Flavor singular is Caution and does not stack. One stack-eligible Limited token makes the row Caution. This is not a 3+ Limited stack. Coconut oil and carnauba wax are the split of “Coconut Oil with Carnauba Wax.” Black carrot juice (color) and purple carrot juice (color) are named juice colors. Thrifty White is in stock (11), UPC 030772089712. Vitacost prints that UPC and the full line at $22.18. The brand page and the CVS ingredients page print the same line, including purple carrot juice (color). Ages 12 and up. UPC check digit OK.',
    ],
  },
];

const ROWS = BATCH253_KYR6D_T157U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch253 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch253 duplicate id');
for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch253 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (rollup.cause === 'limited_stack') throw new Error(`batch253 unexpected stack ${record.id}`);
  if (record.id === 'metamucil-b253-fiber-thins-apple-12') {
    if (record.honestNote !== WAFER_NOTE) throw new Error('batch253 wafer note text');
    if (contradictionHonestNote(record) !== WAFER_NOTE) throw new Error('batch253 wafer note mismatch');
  } else if (record.honestNote) {
    throw new Error(`batch253 unexpected honest note ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch253 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source)) {
      throw new Error(`batch253 pending ${ingredient.name}`);
    }
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch253 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
