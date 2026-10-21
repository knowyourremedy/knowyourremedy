// DRAFT / not verified / batch 252 KYR6-d. Does not repeat rows from 796, 805, 806, 811, or 812.
// Fiber Thins are not in this file. Wheat flour, brown sugar, and oat hull fiber are not locked.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;
const OTC = 'OTC' as const;

const METH = {
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose). Founder override Oct 17, 2026 t118u.',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  natArt:
    'Methodology §5 Limited (natural and artificial flavors — undisclosed mixture; a named taste does not clear the artificial half).',
  yellow6:
    'Methodology §5 High-risk (FD&C Yellow No. 6 / sunset yellow — synthetic dye; EU activity-and-attention warning).',
  water: 'Methodology §5 Cleared (purified water).',
  xylitol:
    'Methodology §5 Limited-risk (xylitol, oral — GI effects at volume; sugar-alcohol row; does not count toward the t137u stack).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate — citrate-salt buffer).',
  natFlavor:
    'Methodology §5 Caution (Natural Flavor, singular — unnamed natural flavor; not the Limited “natural flavors” mixture).',
  violet:
    'Methodology §5 Cleared (Violet carrot extract (color) — founder lock t156u Oct 21, 2026; named plant color; not bare carrot).',
  blackCarrot:
    'Methodology §5 Cleared (Black carrot extract — t150u alias of Black Carrot Extract Color; named plant-color).',
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

const PANEL_ORANGE =
  'Thrifty White in stock (42), UPC 037000740797. Cub Add to Cart, product number 00037000740797, same inactive line. Randalls 72 count lists delivery and pickup with the same line';
const PANEL_KIDS =
  'Thrifty White in stock (7), UPC 030772094921. Brookshire’s and Cub Add to Cart, product number 00030772094921, same ingredient line. Metamucil kids gummies page prints the same line. Ages 4+';

export const BATCH252_KYR6D_T156U: RatingRecord[] = [
  {
    id: 'metamucil-b252-real-sugar-orange-72',
    productName: 'Metamucil 4-in-1 Psyllium Fiber Powder, Real Sugar Orange (72 count)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b252-real-sugar-orange-72',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '037000740797',
    activeIngredients: [{ name: 'Psyllium husk', strength: '3 g dietary fiber per rounded tablespoon' }],
    inactiveIngredients: [
      flag(PANEL_ORANGE, 'Sucrose', 'cleared', 'sucrose'),
      flag(PANEL_ORANGE, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_ORANGE, 'Natural and artificial orange flavor', 'limited', 'natArt'),
      flag(PANEL_ORANGE, 'FD&C Yellow No. 6', 'high', 'yellow6'),
    ],
    verdict: 'avoid',
    retailers: ['Thrifty White', 'Cub', 'Randalls'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. One rounded tablespoon has 3 g dietary fiber and 2.4 g soluble fiber from psyllium husk. FD&C Yellow No. 6 is Avoid (synthetic dye; EU activity-and-attention warning). That high sets the row. Natural and artificial orange flavor is one Limited token and does not change it. This is not a 3+ Limited stack. Sucrose is Cleared (t118u). This is not the sugar-free orange powder and not the real-sugar packet. Thrifty White is in stock (42), UPC 037000740797. Cub has Add to Cart on product number 00037000740797 with the same line. Randalls lists delivery and pickup for the 72 count with the same line. UPC check digit OK.',
    ],
  },
  {
    id: 'metamucil-b252-kids-fiber-gummies-72',
    productName: 'Metamucil Kids Fiber Gummies, Mixed Berry (72 gummies)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b252-kids-fiber-gummies-72',
    audience: KIDS,
    minAge: 4,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030772094921',
    activeIngredients: [
      { name: 'Inulin', strength: 'part of 5 g fiber per 3 gummies' },
      { name: 'Soluble corn fiber (Fibersol)', strength: 'part of 5 g fiber per 3 gummies' },
    ],
    inactiveIngredients: [
      flag(PANEL_KIDS, 'Water', 'cleared', 'water'),
      flag(PANEL_KIDS, 'Xylitol', 'limited', 'xylitol'),
      flag(PANEL_KIDS, 'Pectin', 'cleared', 'pectin'),
      flag(PANEL_KIDS, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_KIDS, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
      flag(PANEL_KIDS, 'Natural Flavor', 'moderate', 'natFlavor'),
      flag(PANEL_KIDS, 'Violet carrot extract (color)', 'cleared', 'violet'),
      flag(PANEL_KIDS, 'Black carrot extract (color)', 'cleared', 'blackCarrot'),
      flag(PANEL_KIDS, 'Coconut oil', 'cleared', 'coconut'),
      flag(PANEL_KIDS, 'Carnauba wax', 'cleared', 'carnauba'),
      flag(PANEL_KIDS, 'Medium-chain triglycerides', 'limited', 'mctGummy'),
    ],
    verdict: 'caution',
    retailers: ['Thrifty White', "Brookshire's", 'Cub', 'Metamucil'],
    sourcesGeneral: [
      'Inulin and soluble corn fiber (Fibersol) are the labeled fiber actives and are not graded. The only stack-eligible Limited token is medium-chain triglycerides with no plant source (t132u). Xylitol is a sugar alcohol and does not count toward the t137u stack. Natural Flavor singular is Caution and does not stack. Violet carrot extract (color) is Cleared (t156u). One stack-eligible Limited token makes the row Caution. This is not a 3+ Limited stack. Coconut oil and carnauba wax are the split of “Coconut Oil with Carnauba Wax.” For ages 4 and up. Thrifty White is in stock (7), UPC 030772094921. Brookshire’s and Cub have Add to Cart on product number 00030772094921 with the same line. The brand kids-gummies page prints the same line. UPC check digit OK.',
    ],
  },
];

const ROWS = BATCH252_KYR6D_T156U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch252 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch252 duplicate id');
for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch252 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (rollup.cause === 'limited_stack') throw new Error(`batch252 unexpected stack ${record.id}`);
  if (record.honestNote) throw new Error(`batch252 unexpected honest note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch252 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source)) {
      throw new Error(`batch252 pending ${ingredient.name}`);
    }
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch252 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
